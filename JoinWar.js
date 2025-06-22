// Deklarasi awal variabel sebagai null
let token = null;
let regionHash = null;
let xor_password = null;
let kingdomData = null;
let marchLimit = null;
//let marchQueueUsed = null;


//const delayJoin = 5000; // 5 detik delay sebelum join rally
//let autoOpen = false;
//const delayCheckListRally = 60000; // 60 detik delay untuk check list rally
//let autoJoinIntervalId = null;

//const delayCheckListRally = typeof window.delayCheckListRally !== 'undefined'
//    ? window.delayCheckListRally
//    : 60000; // 60 detik delay untuk check list rally

// Decode base64 to bytes
function base64ToBytes(b64) {
    const binaryStr = atob(b64);
    return Uint8Array.from([...binaryStr].map(c => c.charCodeAt(0)));
}

// Encode bytes to base64
function bytesToBase64(bytes) {
    const binaryStr = String.fromCharCode(...bytes);
    return btoa(binaryStr);
}

// XOR decrypt/encrypt using the same method
function xorBytes(bytes, password) {
    return bytes.map((byte, index) => byte ^ password.charCodeAt(index % password.length));
}

// Convert byte array to string
function bytesToString(bytes) {
    return String.fromCharCode(...bytes);
}

// Convert string to byte array
function stringToBytes(str) {
    return Uint8Array.from([...str].map(c => c.charCodeAt(0)));
}

// 🔓 Decrypt function (like b64xor_dec)
function b64xorDec(s, password) {
    const base64Bytes = base64ToBytes(s);
    const decryptedBytes = xorBytes(base64Bytes, password);
    const decryptedStr = bytesToString(decryptedBytes);
    return JSON.parse(decryptedStr);
}

// 🔒 Encrypt function (like b64xor_enc)
function b64xorEnc(obj, password) {
    const jsonStr = JSON.stringify(obj); // no space formatting like separators=(',', ':')
    const plainBytes = stringToBytes(jsonStr);
    const xoredBytes = xorBytes(plainBytes, password);
    return bytesToBase64(xoredBytes);
}

/*
xorPassword = ".0d172qwfg634.";
const s= "VRICQ1h...";
console.log("Hasil decrypt:", b64xorDec(s, xorPassword));
// ✅ Coba decode string s
try {
  const result = b64xorDec(s, xorPassword);
  console.log("Hasil decrypt:", result);
 
  // ✅ Coba encode lagi
  const encrypted = b64xorEnc(result, xorPassword);
  console.log("Hasil encrypt ulang:", encrypted);
 
  // Opsional: cek sama seperti input awal?
  console.log("Apakah hasil encode sama dengan input awal?", encrypted === s);
} catch (e) {
  console.error("Gagal decode atau encode:", e.message);
}
*/

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getZoneIds(minX, maxX, minY, maxY) {
    const zoneIds = new Set();

    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            const zoneId = Math.floor((x / 32) + 64 * (y / 32));
            zoneIds.add(zoneId);
        }
    }

    return Array.from(zoneIds);
}

// Contoh penggunaan:
//const result = getZoneIds(1, 2000, 1, 2000);
//console.log(result);

async function sendRequest({
    url,
    token,
    body,
    returnResponse = false
}) {
    try {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "omit",
            referrer: "https://play.leagueofkingdoms.com/",
            headers: {
                "User-Agent": navigator.userAgent,
                "Accept": "*/*",
                "Accept-Language": "en-US,en;q=0.5",
                "x-access-token": token,
                "Content-Type": "application/x-www-form-urlencoded",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-site"
            },
            body: `json=${encodeURIComponent(body)}`
            //body: `json=${encodeURIComponent(JSON.stringify(body))}`
        });

        if (returnResponse) {
            const text = await response.text();

            try {
                const json = JSON.parse(text);
                return json;
            } catch (parseErr) {
                //console.warn("⚠️ Response bukan JSON, mengembalikan sebagai teks.");
                return text;
            }
        } else {
            // Jika tidak perlu response, cukup kirim request
            //console.log("✅ Request sent (no response returned)");
        }
    } catch (err) {
        console.error("❌ Gagal mengirim request:", err);
        return null;
    }
}

function decodePayloadArray(payload) {
    if (!payload || !Array.isArray(payload)) {
        console.error("❌ Data payload bukan array.");
        return null;
    }

    try {
        const compressedPayload = new Uint8Array(payload);
        const decompressedData = pako.inflate(compressedPayload, {
            to: 'string'
        });
        const jsonData = JSON.parse(decompressedData);
        //console.log("✅ Decoded Payload JSON:", jsonData);
        return jsonData;
    } catch (err) {
        console.error("❌ Gagal mendekode payload:", err);
        return null;
    }
}

//const loc = [723, 1983];
//sendGatherCM(loc);
//sendGatherCM([723, 1983]);
async function sendGatherCM(loc) {
    await sendMarch(loc, 1, 3); // marchType 1 = gathering, preset index 3
}

async function sendSupport(loc) {
    await sendMarch(loc, 7, 2); // marchType 7 = support, preset index 2
}

async function sendMarch(loc, marchType, troopIndex) {
    const toLoc = [kingdomData.loc[0], ...loc];

    const payload_marchInfo = {
        fromId: kingdomData.fieldObjectId,
        toLoc: toLoc
    };

    let marchInfoResponse, marchInfo;
    try {
        marchInfoResponse = await sendRequest({
            url: "https://api-lok-live.leagueofkingdoms.com/api/field/march/info",
            token: token,
            body: b64xorEnc(payload_marchInfo, xor_password),
            returnResponse: true
        });
        marchInfo = b64xorDec(marchInfoResponse, xor_password);
    } catch (err) {
        console.error("❌ Gagal ambil march info:", err);
        return;
    }

    const troops = marchInfo?.saveTroops?.[troopIndex];
    if (!troops) {
        console.warn(`⚠️ Troops preset ke-${troopIndex} tidak ditemukan.`);
        return;
    }

    const payload = {
        fromId: kingdomData.fieldObjectId,
        marchType,
        toLoc,
        marchTroops: troops
    };

    try {
        await sendRequest({
            url: "https://api-lok-live.leagueofkingdoms.com/api/field/march/start",
            token: token,
            body: b64xorEnc(payload, xor_password),
            returnResponse: false
        });
        console.log(`✅ March dikirim: ${marchType === 1 ? 'Gathering' : 'Support'} ke (${loc[0]}, ${loc[1]})`);
    } catch (err) {
        console.error("❌ Gagal kirim march:", err);
    }
}

async function sendTelegramMessage(token, message) {
    const localKey = `telegram_chat_id_${token.slice(0, 10)}`;

    async function send(chatId) {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        });

        const data = await res.json();
        //console.log('📨 Telegram response:', data);
    }

    async function getChatId() {
        const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
        const data = await res.json();
        const last = data.result?.slice(-1)[0];
        const chatId = last?.message?.chat?.id;

        if (chatId) {
            localStorage.setItem(localKey, chatId);
            //console.log('✅ chat_id ditemukan:', chatId);
            await send(chatId);
        } else {
            console.warn('⚠️ Tidak menemukan chat_id. Pastikan sudah kirim pesan ke bot.');
        }
    }

    const stored = localStorage.getItem(localKey);
    if (stored) {
        //console.log('ℹ️ chat_id ditemukan di localStorage:', stored);
        await send(stored);
    } else {
        console.log('ℹ️ Mencoba ambil chat_id dari getUpdates...');
        await getChatId();
    }
}

async function monitorWebSocket() {
    if (window._originalWebSocket) {
        console.warn('[⚠️] WebSocket monitor sudah aktif.');
        return;
    }

    // Simpan WebSocket asli
    window._originalWebSocket = window.WebSocket;
    const OriginalWebSocket = window._originalWebSocket;

    // Pastikan array untuk menyimpan instance ada
    window._webSocketInstances = [];

    // Antrean untuk autoJoinRally
    const rallyQueue = [];
    let rallyProcessing = false;

    async function processRallyQueue() {
        if (rallyProcessing) return;
        rallyProcessing = true;

        while (rallyQueue.length > 0) {
            const rally = rallyQueue.shift(); // Ambil satu dari antrean

            if (!getAutoJoinStatus()) {
                console.warn('[🛑] Auto Join OFF - Menghapus rally dari antrean:', rally);
                continue; // Lewatkan rally ini tanpa diproses
            }

            await delay(30000);
            try {
                console.log('[⏳] Memproses rally dari antrean...');
                await autoJoinRally(); // Fungsi utama join rally
            } catch (err) {
                console.error('❌ Gagal auto join rally:', err);
            }
        }

        rallyProcessing = false;
    }


    // Override WebSocket
    window.WebSocket = function (url, protocols) {
        const ws = protocols ? new OriginalWebSocket(url, protocols) : new OriginalWebSocket(url);
        Object.setPrototypeOf(ws, OriginalWebSocket.prototype);

        // Simpan instance
        window._webSocketInstances.push(ws);

        ws.addEventListener('message', (event) => {
            const data = event.data;
            if (typeof data !== 'string' || !data.startsWith('42')) return;

            try {
                const [path, message] = JSON.parse(data.slice(2));

                // Chat Handler
                if (path === '/chat/new' && window.tokenTelegram) {
                    const from = message.from;
                    const text = message.text;
                    const tag = message.alliance?.tag || '';
                    const formatted = `[${tag}] ${from}: ${text}`;
                    sendTelegramMessage(window.tokenTelegram, formatted);
                }

                // Rally Handler
                else if (path === '/alliance/rally/new') {
                    sendTelegramMessage(window.tokenTelegram, "Ada Rally Baru!");
                }

            } catch (err) {
                console.error('❌ Gagal parsing payload socket:', err);
            }
        });

        return ws;
    };

    window.WebSocket.prototype = OriginalWebSocket.prototype;

    console.log('[✅] WebSocket monitoring aktif.');
}

async function handleAuthResponse(xhr) {
    const targetEndpoints = [
        "/api/auth/login",
        "/api/auth/connect",
        "/api/kingdom/enter"
    ];


    //if (!targetEndpoints.some(endpoint => xhr._url.includes(endpoint))) return;
    if (!xhr._url || !targetEndpoints.some(endpoint => xhr._url.includes(endpoint))) return;

    if (!xhr.response) {
        console.warn("⚠️ Response kosong:", xhr._url);
        return;
    }

    try {
        let json;

        if (xhr.response instanceof ArrayBuffer) {
            const decoder = new TextDecoder("utf-8");
            const text = decoder.decode(xhr.response);
            json = JSON.parse(text);
            console.log("✅ Parsed JSON from ArrayBuffer:", json);
        } else {
            json = JSON.parse(xhr.response);
            console.log("✅ Parsed JSON (non-binary):", json);
        }

        if (json.result && json.token && json.regionHash) {
            token = json.token;
            regionHash = json.regionHash;
            xor_password = atob(regionHash).split("-")[1];

            //localStorage.setItem("lok_token", token);
            //localStorage.setItem("lok_regionHash", regionHash);
            //localStorage.setItem("lok_xor_password", xor_password);

            console.log("🟢 Token:", token);
            console.log("🟢 RegionHash:", regionHash);
            console.log("🟢 XOR Password:", xor_password);

            // set tombol on
            localStorage.setItem('autojoin_enabled', 'true');
            if (typeof updateAutoJoinButton === 'function') {
                updateAutoJoinButton();
            }

        }
        if (xhr._url.includes("/api/kingdom/enter")) {
            if (!json.result) return;

            kingdomData = json.kingdom;
            console.log("Data kingdom:", kingdomData);

            if (window._kingdomEnterHandled) return;
            window._kingdomEnterHandled = true;

            // get march limit
            marchLimit = await getMarchLimit();

        }

    } catch (err) {
        console.error("❌ Gagal parsing response:", err, xhr.response);
    }
}

monitorWebSocket()

const originalOpen = XMLHttpRequest.prototype.open;
const originalSend = XMLHttpRequest.prototype.send;

XMLHttpRequest.prototype.open = function (method, url) {
    this._url = url;
    return originalOpen.apply(this, arguments);
};

XMLHttpRequest.prototype.send = function () {
    this.addEventListener('load', async function () {
        await handleAuthResponse(this);
    });
    return originalSend.apply(this, arguments);
};