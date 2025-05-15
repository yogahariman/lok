// ==UserScript==
// @name         AutoJoinRallyLOK
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Intercept login and capture token + regionHash
// @match        https://play.leagueofkingdoms.com/*
// @grant        none
// @require https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako.min.js
// ==/UserScript==

(function () {
  'use strict';

  // Deklarasi awal variabel sebagai null
  let token = null;
  let regionHash = null;
  let xor_password = null;
  const delayJoin = 5000; // 3 detik delay sebelum join rally

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


  // Step 2: Intercept WebSocket message to detect rally
  /*const wsSend = WebSocket.prototype.send;
  WebSocket.prototype.send = function (...args) {
    this.addEventListener("message", (event) => {
      const data = event.data;
      if (typeof data === "string" && data.includes("/alliance/rally/new")) {
        console.warn("[🎯 RALLY DETECTED]", data);
        setTimeout(autoJoinRally, delayJoin); // add delay before joining
      }
    });
    return wsSend.apply(this, args);
  };
*/
  // Jalankan autoJoinRally pertama kali setelah delayJoin (3 detik)
  setTimeout(() => {
    autoJoinRally();
    // Lalu jalankan tiap 60 detik
    setInterval(autoJoinRally, 60000*2);
  }, delayJoin);

  async function fetchRallyList(token, url, body) {
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        referrer: "https://play.leagueofkingdoms.com/",
        headers: {
          "User-Agent": navigator.userAgent,
          "Accept": "*/*",
          "Accept-Language": "en-US,en;q=0.9",
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": token,
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          "Priority": "u=4"
        },
        body: `json=${encodeURIComponent(JSON.stringify(body))}`
      });

      const result = await response.json();
      //console.log("📥 Rally list response:", result);

      return result;
    } catch (err) {
      console.error("❌ Gagal mengambil data rally:", err);
      return null;
    }
  }

  async function sendJoinRallyRequest(url, token, body) {
    try {
      // Tambahkan delay 5 detik (5000 ms)
      await new Promise(resolve => setTimeout(resolve, delayJoin));
      await fetch(url, {
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
        body: `json=${encodeURIComponent(JSON.stringify(body))}`
      });
    } catch (err) {
      console.error("❌ Gagal mengirim join rally:", err);
    }
  }


  /*
  function decodePayload(rallyData) {
    if (!rallyData || !rallyData.isPacked || !Array.isArray(rallyData.payload)) {
      console.error("❌ Data rally tidak valid.");
      return null;
    }

    const compressedPayload = Buffer.from(rallyData.payload);

    const zlib = require('zlib');
    try {
      const decompressedData = zlib.gunzipSync(compressedPayload);
      const jsonData = JSON.parse(decompressedData.toString());
      console.log("✅ Decoded Rally JSON:", jsonData);
      return jsonData;
    } catch (err) {
      console.error("❌ Gagal mendekode payload:", err);
      return null;
    }
  }
  */

  function decodePayload(rallyData) {
    if (!rallyData || !rallyData.isPacked || !Array.isArray(rallyData.payload)) {
      console.error("❌ Data rally tidak valid.");
      return null;
    }

    try {
      const compressedPayload = new Uint8Array(rallyData.payload);
      const decompressedData = pako.inflate(compressedPayload, { to: 'string' });
      const jsonData = JSON.parse(decompressedData);
      console.log("✅ Decoded Rally JSON:", jsonData);
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

  // Step 3: Function to fetch and join rally
  async function autoJoinRally() {
    try {
      const url = "https://api-lok-live.leagueofkingdoms.com/api/alliance/battle/list/v2";
      const body = {};
      const rallyList = await fetchRallyList(token, url, body);
      console.log("📥 Rally list response:", rallyList);
      const rallyJson = decodePayload(rallyList);

      if (!rallyJson || !Array.isArray(rallyJson.battles)) {
        console.warn("❌ rallyJson.battles tidak tersedia atau bukan array.");
        return;
      }

      const rallies = rallyJson.battles;

      for (const battle of rallies) {
        const battleId = battle._id;
        const isJoined = battle.isJoined;
        const monsterCode = battle.targetMonster?.code || "UNKNOWN";
        const monsterHP = battle.targetMonster?.param?.value || "UNKNOWN";

        //console.log(`🔍 Memeriksa rally: ${battleId}, isJoined: ${isJoined}, monster: ${monsterCode}, HP: ${monsterHP}`);

        if (!isJoined) {
          //console.log(`🚀 Bergabung ke rally: ${battleId} (Monster: ${monsterCode}, HP: ${monsterHP})`);

          const troopCodes = [50100306, 50100305, 50100204];
          const troopAmounts = [0, 100000, 0];
          const rallyId = battleId;

          const payload = createJoinRallyPayload(troopCodes, troopAmounts, rallyId);
          //console.log(JSON.stringify(payload, null, 2));

          const payload_encrypted = b64xorEnc(payload, xor_password);

          //await delay(5000);
          await sendJoinRallyRequest("https://api-lok-live.leagueofkingdoms.com/api/field/rally/join", token, payload_encrypted);
          //const responseJoinRally = await fetchRallyList(token, "https://api-lok-live.leagueofkingdoms.com/api/field/rally/join", payload_encrypted);
          //console.log('🚀 Bergabung ke rally: ', responseJoinRally);


          /*
          const joinResponse = await fetch("https://api-lok-live.leagueofkingdoms.com/api/field/rally/join", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "x-access-token": token,
            },
            body: `json=${encodeURIComponent(JSON.stringify({ rallyMoId: battleId }))}`
          });
          
          const joinResult = await joinResponse.json();
          console.log("✅ Hasil Join:", joinResult);

          // Delay antar join untuk menghindari spam
          await new Promise(resolve => setTimeout(resolve, 1500));
          */
        }

      }
    } catch (err) {
      console.error("❌ Error saat auto join:", err);
    }
  }


})();
