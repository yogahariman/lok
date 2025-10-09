# crypto_hybrid_bot.py
# Hybrid Smart Mode: scalping (BB+StochRSI+EMA) & swing (scoring style)
# Install: pip install python-binance pandas ta requests

import time
from datetime import datetime
import requests
import pandas as pd
from binance.client import Client
from ta.volatility import BollingerBands
from ta.momentum import StochasticOscillator, RSIIndicator
from ta.trend import EMAIndicator, ADXIndicator, MACD
import warnings
warnings.filterwarnings("ignore")

# === SETUP API ===
api_key = "46d23DC3FC9248B814E4CAd626d38F39cWDnci9IGpAt030sIgCn8f5lB0BIN6Hp"
api_secret = "52A05b1e44E6034a39D4934d562fcBb5tYrseyYmZXeNIRwSF889JuDV3KYjeSTo"
client = Client(api_key, api_secret)

# === TELEGRAM BOT ===
TELEGRAM_TOKEN = "8383407093:AAFGHJ6oBVHtvRsJel2NQUOklbeOwtxtdVk"
CHAT_ID = "1448627275"

# mode: "scalping" or "swing"
mode = "scalping"

# symbols to monitor
symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "POLUSDT", "LINKUSDT", "ATOMUSDT"]

timeframes = {
    "scalping": ["5m", "15m", "30m"],
    "swing": ["1h", "4h"]
}

# ========== CLIENT ==========
client = Client(api_key, api_secret)

# ========== HELPERS ==========
def send_telegram(msg):
    if not TELEGRAM_TOKEN or not CHAT_ID:
        return
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    data = {"chat_id": CHAT_ID, "text": msg, "parse_mode": "HTML"}
    try:
        requests.post(url, data=data, timeout=10)
    except Exception as e:
        print("❌ Telegram error:", e)

def tf_to_seconds(tf):
    mapping = {"1m":60, "3m":180, "5m":300, "15m":900, "30m":1800,
               "1h":3600, "2h":7200, "4h":14400, "1d":86400}
    return mapping.get(tf, 300)

def get_df(symbol, interval="15m", limit=200):
    klines = client.get_klines(symbol=symbol, interval=interval, limit=limit)
    if not klines:
        raise ValueError("empty klines")
    df = pd.DataFrame(klines, columns=[
        "time","open","high","low","close","volume",
        "close_time","qav","trades","tb_base","tb_quote","ignore"
    ])
    # convert numeric columns
    for col in ["open","high","low","close","volume","qav","tb_base","tb_quote"]:
        df[col] = pd.to_numeric(df[col], errors="coerce")
    return df

# ========== INDICATORS & SIGNALS ==========
def add_base_indicators(df):
    # Bollinger
    bb = BollingerBands(df["close"], window=20, window_dev=2)
    df["bb_low"] = bb.bollinger_lband()
    df["bb_high"] = bb.bollinger_hband()

    # StochRSI (use StochasticOscillator on close/high/low as approximation for Stoch)
    stoch = StochasticOscillator(df["high"], df["low"], df["close"], window=14, smooth_window=3)
    df["stoch"] = stoch.stoch()

    # RSI
    rsi = RSIIndicator(df["close"], window=14)
    df["rsi"] = rsi.rsi()

    # EMAs
    df["ema9"] = EMAIndicator(df["close"], window=9).ema_indicator()
    df["ema21"] = EMAIndicator(df["close"], window=21).ema_indicator()
    df["ema50"] = EMAIndicator(df["close"], window=50).ema_indicator()
    df["ema200"] = EMAIndicator(df["close"], window=200).ema_indicator()

    # ADX
    df["adx"] = ADXIndicator(df["high"], df["low"], df["close"], window=14).adx()

    # MACD diff
    macd = MACD(df["close"], window_slow=26, window_fast=12, window_sign=9)
    df["macd_diff"] = macd.macd_diff()

    return df

# Scalping: simple rule set (BB + Stoch + EMA9/21)
def signal_scalping_from_df(df):
    last = df.iloc[-1]
    price = float(last["close"])
    bb_low = float(last["bb_low"])
    bb_high = float(last["bb_high"])
    stoch = float(last["stoch"])
    ema9 = float(last["ema9"])
    ema21 = float(last["ema21"])

    # Buy condition
    if price < bb_low and stoch < 20 and ema9 > ema21:
        return "BUY"
    # Sell condition
    if price > bb_high and stoch > 80 and ema9 < ema21:
        return "SELL"
    return None

# Swing: scoring (hybrid, TradingView-like simplified)
def score_swing_from_df(df):
    last = df.iloc[-1]
    price = float(last["close"])
    score = 0
    reasons = {}

    # Bollinger
    if price < last["bb_low"]:
        score += 1; reasons['bb'] = 1
    elif price > last["bb_high"]:
        score -= 1; reasons['bb'] = -1
    else:
        reasons['bb'] = 0

    # EMA trend: use EMA50 vs EMA200
    if last["ema50"] > last["ema200"]:
        score += 1; reasons['ema_trend'] = 1
    elif last["ema50"] < last["ema200"]:
        score -= 1; reasons['ema_trend'] = -1
    else:
        reasons['ema_trend'] = 0

    # MACD diff
    if last["macd_diff"] > 0:
        score += 1; reasons['macd'] = 1
    elif last["macd_diff"] < 0:
        score -= 1; reasons['macd'] = -1
    else:
        reasons['macd'] = 0

    # RSI extremes
    if last["rsi"] < 35:
        score += 1; reasons['rsi'] = 1
    elif last["rsi"] > 65:
        score -= 1; reasons['rsi'] = -1
    else:
        reasons['rsi'] = 0

    # ADX trend strength: if ADX strong and agrees with EMA trend, add extra
    if last["adx"] > 25:
        if reasons['ema_trend'] == 1:
            score += 1; reasons['adx'] = 1
        elif reasons['ema_trend'] == -1:
            score -= 1; reasons['adx'] = -1
        else:
            reasons['adx'] = 0
    else:
        reasons['adx'] = 0

    # Stoch extremes
    if last["stoch"] < 20:
        score += 1; reasons['stoch'] = 1
    elif last["stoch"] > 80:
        score -= 1; reasons['stoch'] = -1
    else:
        reasons['stoch'] = 0

    return int(score), reasons

def map_score_to_label(score):
    # thresholds can be tuned
    if score >= 3:
        return "Strong Buy"
    elif score == 1 or score == 2:
        return "Buy"
    elif score == 0:
        return "Neutral"
    elif score == -1 or score == -2:
        return "Sell"
    else:  # <= -3
        return "Strong Sell"

# ========== MAIN LOOP ==========
def main():
    if mode not in timeframes:
        print("Invalid mode. Choose 'scalping' or 'swing'.")
        return

    smallest_tf = timeframes[mode][0]
    interval_seconds = tf_to_seconds(smallest_tf)

    last_signal = {s: None for s in symbols}

    print(f"🚀 Hybrid Bot started in [{mode.upper()}] mode. Checking every {interval_seconds//60} minute(s).")
    while True:
        now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"\n⏰ {now_str} — Checking ({mode}) ...")

        for s in symbols:
            try:
                # collect per-timeframe signals or scores
                tf_results = []
                # We'll request df per tf and evaluate; for scalping we still use same logic but per tf
                for tf in timeframes[mode]:
                    df = get_df(s, interval=tf, limit=200)
                    df = add_base_indicators(df)

                    if mode == "scalping":
                        sig = signal_scalping_from_df(df)
                        tf_results.append(sig if sig else "NORMAL")
                    else:  # swing
                        score, reasons = score_swing_from_df(df)
                        label = map_score_to_label(score)
                        tf_results.append((label, score))  # keep both for aggregation

                # determine final decision
                if mode == "scalping":
                    # collect only non-NORMAL items
                    votes = [v for v in tf_results if v != "NORMAL"]
                    if not votes:
                        print(f"{s} → NORMAL (no signal)")
                        continue
                    # majority vote on BUY/SELL
                    final = max(set(votes), key=votes.count)
                    # require at least 2 of timeframes same (if more than 1 tf exist)
                    if votes.count(final) < 2 and len(timeframes[mode]) > 1:
                        # ambiguous
                        price = float(df.iloc[-1]["close"])
                        print(f"{s} → NORMAL @ {price:.4f} | TFs: {tf_results}")
                        continue
                    price = float(df.iloc[-1]["close"])
                    # Print short log
                    print(f"{s} → {final} @ {price:.4f} | TFs: {tf_results}")
                    # Telegram only if final differs from last
                    if final != last_signal[s]:
                        if final in ("BUY", "SELL"):
                            msg = f"📊 <b>{mode.upper()} SIGNAL</b>\n💰 Pair: <b>{s}</b>\n📈 Action: {'🟢 <b>BUY</b>' if final=='BUY' else '🔴 <b>SELL</b>'}\n💵 Price: <b>{price:.4f} USDT</b>\n🕒 TFs: {', '.join(timeframes[mode])}"
                            send_telegram(msg)
                        last_signal[s] = final

                else:  # swing
                    # tf_results is list of tuples (label, score)
                    labels = [t[0] for t in tf_results]
                    scores = [t[1] for t in tf_results]
                    # aggregate by majority label
                    # prefer highest magnitude label if tie (e.g., two 'Buy' one 'Neutral' -> Buy)
                    # Simple approach: convert labels to numeric weight for tie-break
                    label_weights = {"Strong Buy": 2, "Buy": 1, "Neutral": 0, "Sell": -1, "Strong Sell": -2}
                    # Count votes by label
                    vote_counts = {}
                    for lab in labels:
                        vote_counts[lab] = vote_counts.get(lab, 0) + 1
                    # pick label with highest count, tiebreaker by weight sum
                    max_count = max(vote_counts.values())
                    candidates = [lab for lab, cnt in vote_counts.items() if cnt == max_count]
                    if len(candidates) == 1:
                        final_label = candidates[0]
                    else:
                        # tie: pick candidate with highest sum of weights among timeframes that voted it
                        best = None
                        best_sum = -999
                        for c in candidates:
                            ssum = sum(label_weights.get(l, 0) for l in labels if l == c)
                            if ssum > best_sum:
                                best_sum = ssum
                                best = c
                        final_label = best

                    price = float(df.iloc[-1]["close"])
                    # print simple log as requested
                    print(f"{s} → {final_label} @ {price:.4f}")
                    # Telegram only for non-neutral (Buy/Sell/Strong)
                    if final_label != "Neutral" and final_label != last_signal[s]:
                        nice = final_label
                        msg = f"📊 <b>{mode.upper()} SIGNAL</b>\n💰 Pair: <b>{s}</b>\n📈 Action: <b>{nice}</b>\n💵 Price: <b>{price:.4f} USDT</b>\n🕒 TFs: {', '.join(timeframes[mode])}"
                        send_telegram(msg)
                        last_signal[s] = final_label

            except Exception as e:
                print(f"⚠️ Error {s}: {e}")

        print(f"💤 Sleeping {interval_seconds//60} minute(s)...")
        print("-"*60)
        time.sleep(interval_seconds)

if __name__ == "__main__":
    main()
