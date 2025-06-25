// ==UserScript==
// @name         FieldMap
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Field Map
// @match        https://play.leagueofkingdoms.com/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako.min.js
// ==/UserScript==

(function () {
  'use strict';

  const allowedBookmark = {
    "20200201": { name: "DeathKar", minLevel: 4 },
    //"20200202": { name: "Green Dragon", minLevel: 99 },
    //"20200203": { name: "Red Dragon", minLevel: 1 },
    //"20200204": { name: "Yellow Dragon", minLevel: 99 },
    //"20200206": { name: "Panta", minLevel: 1 },
    //"20200207": { name: "Gargantua", minLevel: 1 },
    //"20700505": { name: "Magdar", minLevel: 1 },
    //"20700506": { name: "Spartoi", minLevel: 4 },
    "20100105": { name: "Crystal Mine", minLevel: 2 },
    "20100106": { name: "Dragon Soul Cavern", minLevel: 3 }
  };


  // Deklarasi awal variabel sebagai null
  let token = null;
  let regionHash = null;
  let xor_password = null;
  let kingdomData = null;
  window.bookmarkResults = [];

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

  function decodePayloadArray(payload) {
    if (!payload || !Array.isArray(payload)) {
      console.error("❌ Data payload bukan array.");
      return null;
    }

    try {
      const compressedPayload = new Uint8Array(payload);
      //console.log("📦 Compressed payload:", compressedPayload);

      const decompressedData = pako.inflate(compressedPayload, { to: 'string' });
      //console.log("📤 Decompressed string:", decompressedData);

      // Coba validasi apakah string ini JSON
      if (!decompressedData.trim().startsWith('{') && !decompressedData.trim().startsWith('[')) {
        //console.warn("⚠️ Decompressed string bukan JSON:", decompressedData);
        return decompressedData; // Kembalikan sebagai string biasa
      }

      const jsonData = JSON.parse(decompressedData);
      return jsonData;
    } catch (err) {
      console.error("❌ Gagal mendekode payload:", err);
      return null;
    }
  }


  function getZoneIds(minX, maxX, minY, maxY) {
    const zoneIds = new Set();

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const zoneId = Math.floor(x / 32) + Math.floor(64 * (y / 32));
        zoneIds.add(zoneId);
      }
    }

    return Array.from(zoneIds);
  }

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

  async function bookmarkFromFieldData(allowedBookmark, fieldData) {
    for (const obj of fieldData.objects) {
      // Lewati objek yang sudah occupied
      if (obj.occupied) continue;

      const codeStr = String(obj.code);
      const bookmarkData = allowedBookmark[codeStr];

      // Cek apakah objek diizinkan dan level cukup
      if (bookmarkData && obj.level >= bookmarkData.minLevel) {
        const result = {
          name: bookmarkData.name,
          level: obj.level,
          loc: obj.loc
        };
        bookmarkResults.push(result);

        //console.log(`📍 Bookmarked: ${bookmarkData.name} Lv.${obj.level} at ${obj.loc.join(",")}`);
      }
    }
  }

  window.bookmarkSave = async function bookmarkSave() {
    if (!Array.isArray(window.bookmarkResults)) {
      console.warn("❗ bookmarkResults tidak ditemukan.");
      return;
    }

    const seen = new Set();
    const uniqueResults = window.bookmarkResults.filter(item => {
      const key = item.loc.join(",");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    for (const item of uniqueResults) {
      const body = JSON.stringify({
        name: `${item.name} Lv.${item.level}`,
        loc: item.loc,
        mark: 1
      });

      await sendRequest({
        url: "https://api-lok-live.leagueofkingdoms.com/api/kingdom/bookmark/add",
        token: token,
        body: body,
        returnResponse: false
      });

      console.log(`✅ Saved bookmark: ${item.name} Lv.${item.level} at ${item.loc.join(",")}`);
    }

    // Kosongkan setelah disimpan
    window.bookmarkResults = [];
    console.log("🧹 bookmarkResults dikosongkan setelah disimpan.");
  }


  function getFieldObject() {
    if (window._originalWebSocket) {
      console.warn('[⚠️] WebSocket monitor sudah aktif.');
      return;
    }

    // Simpan WebSocket asli
    window._originalWebSocket = window.WebSocket;
    const OriginalWebSocket = window._originalWebSocket;

    // Array untuk menyimpan instance WebSocket
    window._webSocketInstances = [];

    // Override WebSocket
    window.WebSocket = function (url, protocols) {
      const ws = protocols ? new OriginalWebSocket(url, protocols) : new OriginalWebSocket(url);
      Object.setPrototypeOf(ws, OriginalWebSocket.prototype);

      window._webSocketInstances.push(ws);

      // ws.addEventListener("open", async () => {
      //   if (!ws.url.includes("socf-lok-live.leagueofkingdoms.com")) return;

      //   const payloadEncryptedArray = [];

      //   const stepX = 32;
      //   const stepY = 16;

      //   // for (let x = 4; x <= 2040; x += stepX) {
      //   //   for (let y = 4; y <= 2040; y += stepY) {
      //   for (let x = 900; x <= 1100; x += stepX) {
      //     for (let y = 1000; y <= 1200; y += stepY) {
      //       const minX = x;
      //       const minY = y;
      //       const maxX = minX + stepX;
      //       const maxY = minY + stepY;
      //       const zoneIds = getZoneIds(minX, maxX, minY, maxY);

      //       const encryptedPayload = b64xorEnc(zoneIds);
      //       payloadEncryptedArray.push(encryptedPayload);
      //     }
      //   }

      //   // Kirim dengan jeda 100ms antar pesan
      //   for (const payload of payloadEncryptedArray) {
      //     const message = `42["/zone/enter/list/v4", ${JSON.stringify(payload)}]`;
      //     ws.send(message);
      //     console.log("📨 Terkirim ke WebSocket:", message);
      //     await delay(3000);
      //   }
      // });

      ws.addEventListener('message', async (event) => {
        const data = event.data;
        if (typeof data !== 'string' || !data.startsWith('42')) return;

        try {
          const [path, message] = JSON.parse(data.slice(2));

          if (path === '/field/objects/v4') {
            const fieldData = b64xorDec(decodePayloadArray(message.packs), xor_password);
            await bookmarkFromFieldData(allowedBookmark, fieldData); // ✅ pakai await
            //console.log('Field Data:', fieldData);
          }

        } catch (err) {
          console.error('❌ Gagal parsing payload socket:', err);
        }
      });


      return ws;
    };

    window.WebSocket.prototype = OriginalWebSocket.prototype;
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
        if (!json.result) return;

        kingdomData = json.kingdom;
        console.log("Data kingdom:", kingdomData);

        if (window._kingdomEnterHandled) return;
        window._kingdomEnterHandled = true;

      }

    } catch (err) {
      console.error("❌ Gagal parsing response:", err, xhr.response);
    }
  }

  // note websocket harus jalan sebelum socket game start
  getFieldObject(); // Aktifkan monitoring kalau belum

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

})();
