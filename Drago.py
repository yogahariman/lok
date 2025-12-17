import requests
import pandas as pd
import time

START_ID = 45000
RETRY_DELAY = 2
REQUEST_DELAY = 0.3

data = []
drago_id = START_ID

session = requests.Session()

while True:
    url = f"https://lok-nft.leagueofkingdoms.com/api/drago/{drago_id}"

    try:
        r = session.get(url, timeout=5)
        j = r.json()

        # === STOP KONDISI ===
        if j.get("error") == "Not found":
            print(f"🛑 {drago_id} Not found → STOP")
            break

        # === PROSES DATA ===
        attrs = {a["trait_type"]: a["value"] for a in j["attributes"]}

        data.append({
            "dragoId": drago_id,
            "name": j["name"],
            "image": j["image"],
            "Horn": attrs.get("Horn"),
            "Eye": attrs.get("Eye"),
            "Head": attrs.get("Head"),
            "Body": attrs.get("Body"),
            "Wing": attrs.get("Wing"),
            "Leg": attrs.get("Leg"),
            "Tail": attrs.get("Tail"),
            "Fusion": attrs.get("Fusion"),
            "Breed Counts": attrs.get("Breed Counts"),
            "Genesis": attrs.get("Genesis"),
            "Legendary": attrs.get("Legendary"),
        })

        print(f"✅ {drago_id} OK")
        drago_id += 1
        time.sleep(REQUEST_DELAY)

    except (KeyError, ValueError) as e:
        # === SKIP TANPA RETRY ===
        print(f"⚠️ {drago_id} value error ({e}) → skip")
        drago_id += 1
        continue

    except Exception as e:
        # === RETRY ID YANG SAMA ===
        print(f"🔁 {drago_id} error ({e}) → retry")
        time.sleep(RETRY_DELAY)
        continue


# === SIMPAN KE EXCEL ===
df = pd.DataFrame(data)
df.to_excel("/Drive/D/LOK/drago.xlsx", index=False)

print("📁 Data tersimpan: drago.xlsx")
