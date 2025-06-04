
// Deklarasi awal variabel sebagai null
let token = null;
let regionHash = null;
let xor_password = null;
let kingdomData = null;
let marchLimit = null;
let marchQueueUsed = null;


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
        //console.log("✅ Decoded Payload JSON:", jsonData);
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

function payloadJoinRally(saveTroopsGroup, rallyMoId) {
    const marchTroops = saveTroopsGroup.map(({ code, amount }) => ({
        code,
        level: 0,
        select: 0,
        amount,
        dead: 0,
        wounded: 0,
        hp: 0,
        attack: 0,
        defense: 0,
        seq: 0
    }));

    return { marchTroops, rallyMoId };
}

function getTroopGroupByHP(monsterHP, marchInfo) {
    const troops = marchInfo?.saveTroops || kingdomData.saveTroops;

    if (monsterHP <= 1000000) return troops[0];
    if (monsterHP <= 2000000) return troops[1];
    return troops[2];
}


async function getMarchLimit() {
    if (!token || !xor_password) {
        console.warn("⏳ Token belum tersedia.");
        return null;
    }

    const response = await sendRequest({
        url: "https://api-lok-live.leagueofkingdoms.com/api/kingdom/profile/troops",
        token: token,
        body: "{}",
        returnResponse: true
    });

    // Pastikan response valid dan berisi properti yang diharapkan
    if (response && response.result && response.troops && response.troops.info) {
        const marchLimit = response.troops.info.marchLimit;
        console.log("✅ marchLimit:", marchLimit);
        return marchLimit;
    } else {
        console.warn("⚠️ Gagal mendapatkan marchLimit dari response:", response);
        return null;
    }
}

async function getMarchQueueUsed() {
    if (!token || !xor_password) {
        console.warn("⏳ Token belum tersedia.");
        return 0;
    }

    const response = await sendRequest({
        url: "https://api-lok-live.leagueofkingdoms.com/api/kingdom/profile/troops",
        token: token,
        body: "{}",
        returnResponse: true
    });

    if (response?.result && Array.isArray(response.troops?.field)) {
        const marchQueueUsed = response.troops.field.length;
        console.log("Jumlah march queue yang digunakan:", marchQueueUsed);
        return marchQueueUsed;
    } else {
        console.warn("⚠️ Field troops tidak ditemukan atau bukan array:", response);
        return 0;
    }
}


async function getItemList() {
    if (!token || !xor_password) {
        console.warn("⏳ Token belum tersedia.");
        return;
    }   
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
    if (!token || !xor_password) {
        console.warn("⏳ Token belum tersedia.");
        return;
    }   

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
    if (!token || !xor_password) {
        console.warn("⏳ Token belum tersedia.");
        return;
    }   

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
        if (getAmountItemList(itemList, 10101049) > 10) {
            codeAP = 10101049;
            nAp = 10;
        } else if (getAmountItemList(itemList, 10101050) > 5) {
            codeAP = 10101050;
            nAp = 5;
        } else if (getAmountItemList(itemList, 10101051) > 2) {
            codeAP = 10101051;
            nAp = 2;
        } else if (getAmountItemList(itemList, 10101052) > 1) {
            codeAP = 10101052;
            nAp = 1;
        }

        //open silver chest [10104024, 10104025, 10104142]
        getAmountItemList(itemList, 10104024) > 10 && await useItem(10104024, 10);
        await delay(5000);

        if (codeAP && nAp) {
            await useItem(codeAP, nAp);
        }
    }
}

/*
async function autoOpenFreeChest() {
    if (!token || !xor_password) {
        console.warn("⏳ Token belum tersedia.");
        return;
    }
    try {
        await sendRequest({
            url: "https://api-lok-live.leagueofkingdoms.com/api/item/freechest",
            token: token,
            body: b64xorEnc({ type: 0 }, xor_password),
            returnResponse: false
        });
        console.log(`[${new Date().toLocaleTimeString()}] ✅ Free chest dibuka.`);
    } catch (err) {
        console.error(`[${new Date().toLocaleTimeString()}] ❌ Error saat buka free chest:`, err);
    }
}

function scheduleAutoOpenFreeChest() {
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(now.getHours() + 1, 0, 0, 0); // HH:00:00 berikutnya
    const delay = nextHour - now;

    console.log(`Free chest akan dibuka pada: ${nextHour.toLocaleTimeString()} (dalam ${(delay / 60000).toFixed(1)} menit)`);

    setTimeout(() => {
        (async () => {
            try {
                await autoOpenFreeChest();
            } catch (e) {
                console.error("❌ Gagal saat buka chest:", e);
            } finally {
                scheduleAutoOpenFreeChest(); // tetap dijadwalkan ulang
            }
        })();
    }, delay);
    
}
*/
/*
async function scheduleAutoOpenFreeChest() {
    if (!token || !xor_password) {
        console.warn("⏳ Token belum tersedia.");
        return;
    }

    console.log("🚀 Auto open Silver Free Chest dimulai...");

    while (true) {
        try {
        // Tunggu 30 menit
        await delay(30 * 60 * 1000);
        const response = await sendRequest({
                url: "https://api-lok-live.leagueofkingdoms.com/api/item/freechest",
                token: token,
                body: b64xorEnc({ type: 0 }, xor_password),
                returnResponse: true
            });

            if (!response?.result) {
                console.warn("🛑 Tidak bisa membuka lagi. Loop dihentikan.");
                break;
            }

            console.log("✅ Berhasil membuka Silver Free Chest. Menunggu 10 menit untuk percobaan berikutnya...");
        } catch (err) {
            console.error("❌ Gagal membuka Silver Free Chest:", err);
        }

    }
}
*/

async function scheduleAutoOpenFreeChest() {
    if (!token || !xor_password) {
        console.warn("⏳ Token belum tersedia.");
        return;
    }

    // 1. Ambil level Treasure House dari position 4
    const treasureHouse = kingdomData.buildings.find(b => b.position === 4);
    const treasureHouseLevel = treasureHouse?.level ?? 0;

    // 2. Tentukan dailyfreechest berdasarkan level
    const dailyChestMap = {
        26: 10, 27: 10, 28: 10, 29: 10,
        30: 12, 31: 13, 32: 14, 33: 15,
        34: 16, 35: 20
    };
    const dailyFreeChestLimit = dailyChestMap[treasureHouseLevel] ?? 0;

    // 3. Cek jumlah chest yang sudah dibuka
    let currentChestNum = kingdomData.freeChest?.silver?.num ?? 0;

    console.log(`📦 Treasure House Level ${treasureHouseLevel} | Silver Free Chest: ${currentChestNum}/${dailyFreeChestLimit}`);

    if (currentChestNum >= dailyFreeChestLimit) {
        //console.log("🛑 Batas harian sudah tercapai. Tidak akan membuka chest.");
        return;
    }

    //console.log("🚀 Auto open Silver Free Chest dimulai...");

    // 4. Loop auto buka chest
    while (true) {
        try {
            // Tunggu 10 menit
            await delay(10 * 60 * 1000);

            const res = await sendRequest({
                url: "https://api-lok-live.leagueofkingdoms.com/api/item/freechest",
                token: token,
                body: b64xorEnc({ type: 0 }, xor_password),
                returnResponse: true
            });

            const response = b64xorDec(res, xor_password);

            if (!response?.result) {
                console.warn("🛑 Batas harian sudah tercapai. Tidak akan membuka chest.");
                break;
            }

            currentChestNum = response?.freechest?.silver?.num ?? currentChestNum + 1;

            if (currentChestNum >= dailyFreeChestLimit) {
                console.log("🛑 Batas harian sudah tercapai. Tidak akan membuka chest.");
                break;
            }

            console.log(`✅ Silver Free Chest dibuka. Total sekarang: ${currentChestNum}/${dailyFreeChestLimit}`);
        } catch (err) {
            console.error("❌ Gagal membuka Silver Free Chest:", err);
        }
    }
}


//0 is 5 minutes
//1 is 10 minutes
//2 is 30 minutes
async function startTower(level) {
    if (!token || !xor_password) {
        console.warn("⏳ Token belum tersedia.");
        return;
    }    

    try {
        const payload = JSON.stringify({ searchType: 0, level });

        await sendRequest({
            url: "https://api-lok-live.leagueofkingdoms.com/api/kingdom/watchtower/search",
            token,
            body: payload,
            returnResponse: false
        });

        console.log(`[${new Date().toLocaleTimeString()}] ✅ startTower (level ${level}) berhasil.`);
    } catch (err) {
        console.error(`[${new Date().toLocaleTimeString()}] ❌ startTower gagal (level ${level}):`, err);
    }
}

function scheduleStartTower(targetMinutes = [3, 10, 32], levels = [0, 1, 2]) {
    const now = new Date();
    const next = new Date();

    if (targetMinutes.length !== levels.length) {
        console.error("❌ Jumlah targetMinutes dan levels harus sama.");
        return;
    }

    // Cari target menit berikutnya dan indeksnya
    let nextIndex = targetMinutes.findIndex(m => now.getMinutes() < m);

    if (nextIndex === -1) {
        // Semua target menit sudah lewat, pakai yang pertama di jam berikutnya
        nextIndex = 0;
        next.setHours(now.getHours() + 1);
    }

    const nextMinute = targetMinutes[nextIndex];
    const nextLevel = levels[nextIndex];

    next.setMinutes(nextMinute, 20, 0); // menit + detik + ms
    const delay = next - now;

    console.log(`startTower(level ${nextLevel}) akan dijalankan pada: ${next.toLocaleTimeString()} (dalam ${(delay / 1000).toFixed(1)} detik)`);

    // Pertama kali jalan
    setTimeout(() => {
        startTower(nextLevel).catch(err => console.error("❌ Gagal saat setTimeout startTower:", err));
        console.log(`[${new Date().toLocaleTimeString()}] startTower(${nextLevel}) dijalankan`);

        // Setiap detik cek apakah waktunya menjalankan startTower
        setInterval(() => {
            const d = new Date();
            const m = d.getMinutes();
            const s = d.getSeconds();

            targetMinutes.forEach((minute, idx) => {
                if (m === minute && s === 20) {
                    const level = levels[idx];
                    startTower(level).catch(err => console.error("❌ Gagal saat interval startTower:", err));
                    console.log(`[${d.toLocaleTimeString()}] startTower(${level}) dijalankan`);
                }
            });
        }, 1000);
    }, delay);
}


// 10726001 (skin buff)
// 10729001 (skin ap)
async function changeSkin(skinCode = 10729001) {
    if (!token || !xor_password) {
        console.warn("⏳ Token belum tersedia.");
        return null;
    }

    // Step 1: Ambil daftar skin
    const response = await sendRequest({
        url: "https://api-lok-live.leagueofkingdoms.com/api/kingdom/skin/list",
        token: token,
        body: JSON.stringify({ type: 0 }),
        returnResponse: true
    });

    // Cari skin ID berdasarkan skinCode yang diberikan
    const skin = response?.skins?.find(s => s.code === skinCode);
    if (!skin) {
        console.warn(`❌ Skin dengan code ${skinCode} tidak ditemukan.`);
        return null;
    }

    // Delay sebelum mengganti skin
    await delay(2000);

    // Step 2: Equip skin
    const equipPayload = JSON.stringify({ itemId: skin._id });
    await sendRequest({
        url: "https://api-lok-live.leagueofkingdoms.com/api/kingdom/skin/equip",
        token: token,
        body: equipPayload,
        returnResponse: false
    });

    console.log(`✅ Skin dengan code ${skinCode} berhasil di-equip.`);
}

// page = 0 1 2 3
async function changeTreasure(page = 3) {
    if (!token || !xor_password) {
        console.warn("⏳ Token atau xor_password belum tersedia.");
        return null;
    }

    try {
        await sendRequest({
            url: "https://api-lok-live.leagueofkingdoms.com/api/kingdom/profile/my",
            token: token,
            body: b64xorEnc({}, xor_password),
            returnResponse: false
        });

        await delay(1000);

        const treasureList = await sendRequest({
            url: "https://api-lok-live.leagueofkingdoms.com/api/kingdom/treasure/list",
            token: token,
            body: "{}",
            returnResponse: true
        });

        const currentPage = treasureList.page;
        console.log(`📦 Treasure saat ini di page ${currentPage}`);

        if (currentPage === page) {
            console.log("🛑 Treasure sudah di page yang sama, tidak melakukan perubahan.");
            return;
        }

        await delay(1000);

        await sendRequest({
            url: "https://api-lok-live.leagueofkingdoms.com/api/kingdom/treasure/page",
            token: token,
            body: JSON.stringify({ page: currentPage }),
            returnResponse: false
        });

        await delay(2000);

        await sendRequest({
            url: "https://api-lok-live.leagueofkingdoms.com/api/kingdom/treasure/page",
            token: token,
            body: JSON.stringify({ page }),
            returnResponse: false
        });

        console.log(`✅ Treasure berhasil diubah ke page ${page}`);
    } catch (error) {
        console.error("❌ Gagal mengganti treasure:", error);
    }
}

async function instantHarvest() {
    try {
        if (!token || !xor_password) {
            console.warn("⏳ Token atau xor_password belum tersedia.");
            return;
        }

        await changeSkin(10726001); // Aktifkan skin produksi
        await delay(2000);

        await changeTreasure(2); // Aktifkan treasure produksi
        await delay(2000);

        // Gunakan skill 10018 (increase production)
        await sendRequest({
            url: "https://api-lok-live.leagueofkingdoms.com/api/skill/use",
            token,
            body: JSON.stringify({ code: 10018 }),
            returnResponse: false
        });
        await delay(2000);

        // Gunakan skill 10001 (instant harvest)
        await sendRequest({
            url: "https://api-lok-live.leagueofkingdoms.com/api/skill/use",
            token,
            body: JSON.stringify({ code: 10001 }),
            returnResponse: false
        });
        await delay(2000);

        await changeSkin(); // Kembali ke skin normal
        await delay(2000);

        await changeTreasure(); // Kembali ke treasure rally/monster
        console.log("✅ Instant Harvest selesai");
    } catch (err) {
        console.error("❌ Gagal saat proses instant harvest:", err);
    }
}

async function scheduleInstantHarvest() {
    try {
        const { skills } = await sendRequest({
            url: "https://api-lok-live.leagueofkingdoms.com/api/skill/list",
            token,
            body: "{}",
            returnResponse: true
        });

        const skill = skills.find(s => s.code === 10001);
        if (!skill) {
            console.warn("⚠️ Skill 10001 tidak ditemukan.");
            return;
        }

        const waitMs = Math.max(
            new Date(skill.nextSkillTime).getTime() + 10 * 60 * 1000 - Date.now(),
            0
        );

        const totalSeconds = Math.floor(waitMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        console.log(`🕒 Menunggu ${hours} jam ${minutes} menit ${seconds} detik untuk Instant Harvest`);


        setTimeout(async () => {
            await instantHarvest();
            scheduleInstantHarvest(); // 🔁 Loop
        }, waitMs);
    } catch (error) {
        console.error("❌ Error saat scheduling:", error);
        setTimeout(scheduleInstantHarvest, 5 * 60 * 1000); // Retry in 5 minutes
    }
}

async function resourceHarvest() {
    try {
        if (!token || !xor_password) {
            console.warn("⏳ Token atau xor_password belum tersedia.");
            return;
        }

        const desiredCodes = [
            40100202,
            40100203,
            40100204,
            40100205
        ];

        const buildingsToHarvest = kingdomData.buildings.filter(b => desiredCodes.includes(b.code));

        for (const building of buildingsToHarvest) {
            await sendRequest({
                url: "https://api-lok-live.leagueofkingdoms.com/api/kingdom/resource/harvest",
                token,
                body: b64xorEnc({
                    position: building.position
                }, xor_password),
                returnResponse: false
            });

            console.log(`✅ Memanen bangunan di posisi ${building.position} dengan code ${building.code}`);
        }
    } catch (err) {
        console.error("❌ Gagal menjalankan resourceHarvest:", err);
    }
}

async function scheduleResourceHarvest() {
    try {
        console.log("⏳ Menunggu 5 menit sebelum Resource Harvest pertama...");
        await delay(5 * 60 * 1000); // 5 menit
        await resourceHarvest();

        setInterval(async () => {
            try {
                console.log("⏰ Menjalankan ulang Resource Harvest setiap 2 jam...");
                await resourceHarvest();
            } catch (err) {
                console.error("❌ Error saat menjalankan ulang Resource Harvest:", err);
            }
        }, 2 * 60 * 60 * 1000); // 2 jam
    } catch (error) {
        console.error("❌ Error di Schedule Resource Harvest:", error);
    }
}


async function buyCaravan() {
    try {
        if (!token || !xor_password) {
            console.warn("⏳ Token atau xor_password belum tersedia.");
            return;
        }

        await delay(1000);

        const caravanList = await sendRequest({
            url: "https://api-lok-live.leagueofkingdoms.com/api/kingdom/caravan/list",
            token,
            body: "{}",
            returnResponse: true
        });

        const desiredCodes = [
            10101007, 10101008, 10101009, 10101010, // VIP
            10101049, 10101050, 10101051, 10101052, // AP
            10103001, 10103002, 10103003, 10103004, // Speeds minutes
            10103005, 10103006, 10103007, 10103008, // Speeds hours/days
            10103009, 10103010
        ];

        const availableItems = (caravanList?.caravan?.items || []).filter(item => {
            return desiredCodes.includes(item.code) && item.amount > 0;
        });

        for (const item of availableItems) {
            console.log(`🛒 Membeli item: code=${item.code}, id=${item._id}`);
            await delay(1000);
            await sendRequest({
                url: "https://api-lok-live.leagueofkingdoms.com/api/kingdom/caravan/buy",
                token,
                body: JSON.stringify({ caravanItemId: item._id }),
                returnResponse: false
            });
        }

        console.log(`✅ Selesai membeli ${availableItems.length} item.`);
    } catch (err) {
        console.error("❌ Gagal membeli caravan:", err);
    }
}

async function scheduleBuyCaravan() {
    try {
        // Jalankan pertama kali langsung
        await delay(5*60*1000);
        await buyCaravan();

        setInterval(async () => {
            try {
                console.log("⏰ Menjalankan ulang buyCaravan setiap 2 jam...");
                await buyCaravan();
            } catch (err) {
                console.error("❌ Error saat menjalankan ulang buyCaravan:", err);
            }
        }, 2 * 60 * 60 * 1000);
    } catch (error) {
        console.error("❌ Error di scheduleBuyCaravan:", error);
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

// Step 3: Function to fetch and join rally
async function autoJoinRally() {
    if (!token || !xor_password) {
        console.warn("⏳ Token belum tersedia.");
        return;
    }   

    try {
        
        await delay(1000);
        const rallyList = await sendRequest({
            url: "https://api-lok-live.leagueofkingdoms.com/api/alliance/battle/list/v2",
            token: token,
            body: "{}",
            returnResponse: true
        });

        //console.log("📥 Rally list response:", rallyList);
        const rallyListJson = decodePayloadArray(rallyList.payload);
        //console.log("📥 Rally list response:", rallyListJson);

        if (!rallyListJson.result || !Array.isArray(rallyListJson.battles) || rallyListJson.battles.length === 0) {
            console.log("⚠️ Rally list tidak valid atau kosong.");
            return;
        }

        const rallies = rallyListJson.battles;
        console.log("📥 Rally list:", rallies);

        const unjoinedRallies = rallies.filter(b => !b.isJoined);
        if (unjoinedRallies.length === 0) {
            console.log("✅ Semua rally sudah diikuti.");
            return;
        }

        if (rallies.length === unjoinedRallies.length) {
            // Semua rally belum diikuti
            changeTreasure(); // Jalankan pengecekan + ubah treasure jika perlu
        }
        for (const battle of unjoinedRallies) {
            //const battleId = battle._id;
            //const isJoined = battle.isJoined;
            //const monsterCode = battle.targetMonster?.code;
            //const monsterLevel = battle.targetMonster?.level;
            //const monsterHP = battle.targetMonster?.param?.value ?? 0; // default 0 kalau null
            const {
                _id: battleId,
                isJoined,
                endTime,
                targetMonster: {
                    code: monsterCode,
                    level: monsterLevel,
                    param: { value: monsterHP = 0 } = {}
                } = {}
            } = battle;

            const monsterInfo = allowedMonsters[monsterCode];
            const isAllowed = monsterInfo && monsterLevel >= monsterInfo.minLevel;

            if (!isAllowed) {
                console.log("❌ Tidak join rally:", monsterInfo?.name || "Unknown", "(Level:", monsterLevel, ")");
                continue;
            }
            
            // 🔁 Cek march queue sebelum lanjut
            marchQueueUsed = await getMarchQueueUsed();
            if (marchQueueUsed >= marchLimit) {
                console.log(`⏳ March queue penuh (${marchQueueUsed}/${marchLimit}), menunggu 30 detik...`);

                await delay(30000); // tunggu 20 detik

                // Cek ulang setelah delay
                marchQueueUsed = await getMarchQueueUsed();
                if (marchQueueUsed >= marchLimit) {
                    console.log(`⛔ Masih penuh (${marchQueueUsed}/${marchLimit}), batal join rally.`);
                    return;
                }

                console.log("✅ Slot march tersedia setelah menunggu, lanjut join rally...");
            }


            console.log("✅ Join rally:", monsterInfo.name, "(Level:", monsterLevel, ")");

            //const saveTroopsGroup = getTroopGroupByHP(monsterHP);
            //const payload = payloadJoinRally(saveTroopsGroup, battleId);
            //const payload_encrypted = b64xorEnc(payload, xor_password);


            // Gunakan AP jika < 50
            await delay(1000);
            await useActionPoint();

            await delay(1000);
            await sendRequest({
                url: "https://api-lok-live.leagueofkingdoms.com/api/alliance/info/my",
                token: token,
                body: "{}",
                returnResponse: false
            });

            await delay(1000);
            await sendRequest({
                url: "https://api-lok-live.leagueofkingdoms.com/api/alliance/battle/list/v2",
                token: token,
                body: "{}",
                returnResponse: false
            });

            await delay(1000);
            const battleInfo = await sendRequest({
                url: "https://api-lok-live.leagueofkingdoms.com/api/alliance/battle/info",
                token: token,
                body: JSON.stringify({ rallyMoId: battleId }),
                returnResponse: true
            });
            //console.log("📥 /alliance/battle/info", battleInfo);

            
            const payload_marchInfo = {
                fromId: kingdomData.fieldObjectId,
                toLoc: battleInfo.battle.fromLoc,
                rallyMoId: battleId
            };
            await delay(1000);
            const marchInfoResponse = await sendRequest({
                url: "https://api-lok-live.leagueofkingdoms.com/api/field/march/info",
                token: token,
                body: b64xorEnc(payload_marchInfo, xor_password),
                returnResponse: true
            });
            const marchInfo = b64xorDec(marchInfoResponse, xor_password);
            //console.log("📥 Save Troops Response : ", marchInfo);

            //Untuk menentukan apakah masih ada cukup waktu untuk ikut rally 
            const speed = 5; // km per detik
            const marchDurationSeconds = marchInfo.distance / speed;
            const now = new Date();
            const timeLeftSeconds = (endTime - now) / 1000;

            if (marchDurationSeconds > timeLeftSeconds) {
                console.log("❌ Tidak jadi ikut rally karena waktu untuk join kurang.");
            } else {
                //console.log("✅ Masih sempat untuk join rally.");
            }


            const saveTroopsGroup = getTroopGroupByHP(monsterHP, marchInfo);

            const canJoinRally = saveTroopsGroup.every(saveTroop => {
                const troopInMarch = marchInfo.troops.find(troop => troop.code === saveTroop.code);
                return troopInMarch && saveTroop.amount <= troopInMarch.amount;
            });

            if (!canJoinRally) {
                console.log("Tidak jadi ikut rally karena ada jumlah troops kurang.");
                return;
            } else {
                //console.log("Lanjut ikut rally.");
            }

            const payload_rally_encrypted = b64xorEnc(payloadJoinRally(saveTroopsGroup, battleId), xor_password);

            await delay(1000);
            await sendRequest({
                url: "https://api-lok-live.leagueofkingdoms.com/api/field/rally/join",
                token: token,
                body: payload_rally_encrypted,
                returnResponse: false
            });
        }
    } catch (err) {
        console.error("❌ Error saat auto join:", err);
    }
}

function monitorWebSocket() {
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
        if (rallyProcessing || !getAutoJoinStatus()) return; // Cek status tombol
        rallyProcessing = true;

        while (rallyQueue.length > 0) {
            rallyQueue.shift(); // Kita tidak perlu data, hanya trigger
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
                    console.warn('[🎯 RALLY DETECTED]', message);
                    rallyQueue.push(message);
                    processRallyQueue();
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
        }
        if (xhr._url.includes("/api/kingdom/enter")) {
            kingdomData = json.kingdom;
            console.log("Data kingdom:", kingdomData);

            //
            marchLimit = await getMarchLimit();
            //buy caravan
            scheduleBuyCaravan();
            //resource Harvest
            scheduleResourceHarvest()
            //Instant Harvest
            scheduleInstantHarvest();
            // Open Free Chest
            scheduleAutoOpenFreeChest();
            // jalankan tower tiap menit ke 2 detik ke 10
            scheduleStartTower();
            // jalankan auto join rally
            localStorage.setItem('autojoin_enabled', 'true');
            if (typeof updateAutoJoinButton === 'function') {
                updateAutoJoinButton();
                await delay(30*1000);
                autoJoinRally();
            }
            
        }

    } catch (err) {
        console.error("❌ Gagal parsing response:", err, xhr.response);
    }
}


monitorWebSocket(); // Aktifkan monitoring kalau belum

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
        //autoJoinRally(); // Jalankan pertama
        //autoJoinIntervalId = setInterval(autoJoinRally, delayCheckListRally);
        autoJoinRally();
        //monitorWebSocket(); // Aktifkan monitoring kalau belum
        
    } else {
        console.log("⛔ AutoJoin DISABLED");
        //if (autoJoinIntervalId !== null) {
        //    clearInterval(autoJoinIntervalId);
        //    autoJoinIntervalId = null;
        //}
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
    // Paksa autojoin OFF setiap refresh
    localStorage.setItem('autojoin_enabled', 'false');
    updateAutoJoinButton();

    // Pantau per 2 detik apakah tombol perlu di-render ulang
    setInterval(injectAutoJoinToggle, 2000);

    //if (getAutoJoinStatus()) {
    //    console.log("🔁 AutoJoin aktif saat load");
    //    //autoJoinRally();
    //    //autoJoinIntervalId = setInterval(autoJoinRally, delayCheckListRally);
    //    autoJoinRally();
    //    monitorWebSocket();
    //} else {
    //    console.log("⛔ AutoJoin OFF saat load");
    //}
});

//const loc = [11, 723, 1983];
//sendMarch(loc);
//sendMarch([11, 723, 1983]);
async function sendMarch(toLoc) {
    const payload = {
        fromId: kingdomData.fieldObjectId,
        marchType: 1,
        toLoc: toLoc,
        marchTroops: [
            {
                code: 50100307,
                level: 0,
                select: 0,
                amount: 500,
                dead: 0,
                wounded: 0,
                hp: 0,
                attack: 0,
                defense: 0,
                seq: 0
            }
        ]
    };

    await sendRequest({
        url: "https://api-lok-live.leagueofkingdoms.com/api/field/march/start",
        token: token,
        body: b64xorEnc(payload, xor_password),
        returnResponse: false
    });
}
