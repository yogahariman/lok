
// Deklarasi awal variabel sebagai null
let token = null;
let regionHash = null;
let xor_password = null;
const delayJoin = 5000; // 5 detik delay sebelum join rally
let autoJoinIntervalId = null;

const delayCheckListRally = typeof window.delayCheckListRally !== 'undefined'
    ? window.delayCheckListRally
    : 60000; // 60 detik delay untuk check list rally

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

// Step 1: Intercept login and capture token + regionHash
const originalOpen = XMLHttpRequest.prototype.open;
const originalSend = XMLHttpRequest.prototype.send;

XMLHttpRequest.prototype.open = function (method, url) {
    this._url = url; // Simpan URL ke instance XHR
    return originalOpen.apply(this, arguments);
};

XMLHttpRequest.prototype.send = function () {
    this.addEventListener('load', function () {
        try {
            const targetEndpoints = [
                "/api/auth/login",
                "/api/auth/connect"
            ];

            if (!targetEndpoints.some(endpoint => this._url.includes(endpoint))) return;

            // Cek apakah response berupa ArrayBuffer
            if (this.response instanceof ArrayBuffer) {
                const decoder = new TextDecoder("utf-8");
                const text = decoder.decode(this.response);
                const json = JSON.parse(text); // parse ke JSON

                console.log("✅ Parsed JSON from ArrayBuffer:", json);

                // Cek apakah itu endpoint login/connect dan mengandung token
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
                }
            } else {
                // Jika bukan ArrayBuffer, coba langsung parse
                const json = JSON.parse(this.response);
                console.log("✅ Parsed JSON (non-binary):", json);
            }
        } catch (err) {
            console.error("❌ Gagal parsing response:", err, this.response);
        }
    });

    return originalSend.apply(this, arguments);
};


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
                console.warn("⚠️ Response bukan JSON, mengembalikan sebagai teks.");
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
/*
  function decodePayloadArray(rallyData) {
    if (!rallyData || !rallyData.isPacked || !Array.isArray(rallyData.payload)) {
      console.error("❌ Data rally tidak valid.");
      return null;
    }
 
    try {
      const compressedPayload = new Uint8Array(rallyData.payload);
      const decompressedData = pako.inflate(compressedPayload, { to: 'string' });
      const jsonData = JSON.parse(decompressedData);
      console.log("✅ Decoded Payload JSON:", jsonData);
      return jsonData;
    } catch (err) {
      console.error("❌ Gagal mendekode payload:", err);
      return null;
    }
  }
*/
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
        console.log("✅ Decoded Payload JSON:", jsonData);
        return jsonData;
    } catch (err) {
        console.error("❌ Gagal mendekode payload:", err);
        return null;
    }
}

function createJoinRallyPayload(codes, amounts, rallyMoId) {
    if (!Array.isArray(codes) || !Array.isArray(amounts) || codes.length !== amounts.length) {
        console.error("❌ Input 'codes' dan 'amounts' harus array dengan panjang yang sama.");
        return null;
    }

    const marchTroops = codes.map((code, index) => ({
        code: code,
        level: 0,
        select: 0,
        amount: amounts[index],
        dead: 0,
        wounded: 0,
        hp: 0,
        attack: 0,
        defense: 0,
        seq: 0
    }));

    return {
        marchTroops,
        rallyMoId
    };
}


async function getItemList() {
    const inputRaw = {
        url: "https://api-lok-live.leagueofkingdoms.com/api/item/list",
        token: token,
        body: "{}",
        returnResponse: true
    };
    const itemList = await sendRequest(inputRaw);
    return itemList;
}

function getAmountItemList(data, targetCode) {
    const item = data.items.find(i => i.code === targetCode);
    return item ? item.amount : null;
}

async function useItem(code, amount) {
    const itemPayload = { code, amount };
    const analyticsPayload = {
      url: "item/use",
      param: `${code}|${amount}`
    };
  
    // Kirim request penggunaan item
    await sendRequest({
      url: "https://api-lok-live.leagueofkingdoms.com/api/item/use",
      token,
      body: b64xorEnc(itemPayload, xor_password),
      returnResponse: false
    });
  
    // Kirim data analitik
    await sendRequest({
      url: "https://api-lok-live.leagueofkingdoms.com/api/auth/analytics",
      token,
      body: JSON.stringify(analyticsPayload),
      returnResponse: false
    });
  }


async function useActionPoint() {
    let inputRaw = {
        url: "https://api-lok-live.leagueofkingdoms.com/api/kingdom/profile/my",
        token: token,
        body: b64xorEnc({}, xor_password),
        returnResponse: true
    };
    const infoProfileEnc = await sendRequest(inputRaw);
    const infoProfile = b64xorDec(infoProfileEnc, xor_password);
    const actionPoint = infoProfile?.profile?.actionPoint?.value;

    if (actionPoint < 50) {
        const itemList = await getItemList();

        let codeAP = null;
        let nAp = null;
        if (getAmountItemList(itemList, 10101049) > 20) {
            codeAP = 10101049;
            nAp = 20;
        } else if (getAmountItemList(itemList, 10101050) > 10) {
            codeAP = 10101050;
            nAp = 10;
        } else if (getAmountItemList(itemList, 10101051) > 4) {
            codeAP = 10101051;
            nAp = 4;
        } else if (getAmountItemList(itemList, 10101052) > 2) {
            codeAP = 10101052;
            nAp = 2;
        }

        if (codeAP && nAp) {
            await useItem(codeAP, nAp);

        }
    }
}

// Step 3: Function to fetch and join rally
async function autoJoinRally() {
    try {

        let inputRaw;

        inputRaw = {
            url: "https://api-lok-live.leagueofkingdoms.com/api/alliance/battle/list/v2",
            token: token,
            body: "{}",
            returnResponse: true
        };
        const rallyList = await sendRequest(inputRaw);
        console.log("📥 Rally list response:", rallyList);
        const rallyListJson = decodePayloadArray(rallyList.payload);

        if (!rallyListJson.result) {
            console.log("⚠️ Rally list payload tidak ada.");
            return;
        }

        if (!Array.isArray(rallyListJson.battles) || rallyListJson.battles.length === 0) {
            console.log("⚠️ Rally list kosong atau tidak valid.");
            return;
        }

        const rallies = rallyListJson.battles;

        if (rallies.every(battle => battle.isJoined)) {
            console.log("Sudah Join semua rally")
            return;
        }

        //Use Action Point if less than 50
        await useActionPoint();


        for (const battle of rallies) {
            const battleId = battle._id;
            const isJoined = battle.isJoined;
            const monsterCode = battle.targetMonster?.code;
            const monsterLevel = battle.targetMonster?.level;
            const monsterHP = battle.targetMonster?.param?.value ?? 0; // default 0 kalau null

            const monsterInfo = allowedMonsters[monsterCode];
            const isAllowed = monsterInfo && monsterLevel >= monsterInfo.minLevel;
            if (!isAllowed) {
                console.log("❌ Tidak join rally:", monsterInfo?.name || "Unknown", "(Level:", monsterLevel, ")");
                continue; // atau continue; jika di dalam loop
            } else {
                console.log("✅ Join rally:", monsterInfo.name, "(Level:", monsterLevel, ")");
                // lanjut join rally
            }

            //console.log(`🔍 Memeriksa rally: ${battleId}, isJoined: ${isJoined}, monster: ${monsterCode}, HP: ${monsterHP}`);

            if (!isJoined) {
                //console.log(`🚀 Bergabung ke rally: ${battleId} (Monster: ${monsterCode}, HP: ${monsterHP})`);

                const rallyId = battleId;
                const payload = createJoinRallyPayload(troopCodes, troopAmounts, rallyId);
                //console.log(JSON.stringify(payload, null, 2));

                const payload_encrypted = b64xorEnc(payload, xor_password);

                await delay(5000);

                inputRaw = {
                    url: "https://api-lok-live.leagueofkingdoms.com/api/field/rally/join",
                    token: token,
                    body: payload_encrypted,
                    returnResponse: false
                };
                await sendRequest(inputRaw);
            }

        }
    } catch (err) {
        console.error("❌ Error saat auto join:", err);
    }
}


// // Jalankan autoJoinRally pertama kali setelah delayJoin (3 detik)
// setTimeout(() => {
//   autoJoinRally();
//   // Lalu jalankan tiap 60 detik
//   setInterval(autoJoinRally, delayCheckListRally);
// }, delayJoin);

// Fungsi menyimpan status ON/OFF
function getAutoJoinStatus() {
    return localStorage.getItem('autojoin_enabled') === 'true';
}

function updateAutoJoinButton() {
    const btn = document.getElementById('autoJoinToggleBtn');
    if (!btn) return;
    btn.textContent = getAutoJoinStatus() ? '⛔ AutoJoin: ON (Click to OFF)' : '▶️ AutoJoin: OFF (Click to ON)';
}

function toggleAutoJoin() {
    const current = getAutoJoinStatus();
    const newStatus = !current;
    localStorage.setItem('autojoin_enabled', newStatus);
    updateAutoJoinButton();

    if (newStatus) {
        console.log("✅ AutoJoin ENABLED");
        autoJoinRally(); // Jalankan pertama
        autoJoinIntervalId = setInterval(autoJoinRally, delayCheckListRally);
    } else {
        console.log("⛔ AutoJoin DISABLED");
        if (autoJoinIntervalId !== null) {
            clearInterval(autoJoinIntervalId);
            autoJoinIntervalId = null;
        }
    }
}

function injectAutoJoinToggle() {
    const existingBtn = document.getElementById('autoJoinToggleBtn');
    if (existingBtn) return; // tombol sudah ada

    const btn = document.createElement('button');
    btn.id = 'autoJoinToggleBtn';
    btn.textContent = getAutoJoinStatus() ? '⛔ AutoJoin: ON (Click to OFF)' : '▶️ AutoJoin: OFF (Click to ON)';
    btn.style.position = 'fixed';
    btn.style.bottom = '10px';
    btn.style.right = '10px';
    btn.style.zIndex = 9999;
    btn.style.padding = '8px 12px';
    btn.style.backgroundColor = '#333';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '5px';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '14px';
    btn.addEventListener('click', toggleAutoJoin);
    document.body.appendChild(btn);
}


window.addEventListener('load', () => {
    // Pantau per 2 detik apakah tombol perlu di-render ulang
    setInterval(injectAutoJoinToggle, 2000);

    if (getAutoJoinStatus()) {
        console.log("🔁 AutoJoin aktif saat load");
        autoJoinRally();
        autoJoinIntervalId = setInterval(autoJoinRally, delayCheckListRally);
    } else {
        console.log("⛔ AutoJoin OFF saat load");
    }
});