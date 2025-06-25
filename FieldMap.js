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

      // ws.addEventListener("open", () => {
      //   const payloadEncryptedArray = [];

      //   const stepX = 32;
      //   const stepY = 16;

      //   for (let x = 4; x <= 2040; x += stepX) {
      //     for (let y = 4; y <= 2040; y += stepY) {
      //       const minX = x;
      //       const minY = y;
      //       const maxX = minX + stepX;
      //       const maxY = minY + stepY;
      //       const zoneIds = getZoneIds(minX, maxX, minY, maxY);

      //       const encryptedPayload = b64xorEnc(zoneIds);
      //       payloadEncryptedArray.push(encryptedPayload);
      //     }
      //   }

      //   for (const payload of payloadEncryptedArray) {
      //     const message = `42["/zone/enter/list/v4", ${JSON.stringify(payload)}]`;
      //     ws.send(message);
      //     console.log("Terkirim:", message);
      //   }
      // });

      ws.addEventListener('message', (event) => {
        const data = event.data;
        if (typeof data !== 'string' || !data.startsWith('42')) return;

        try {
          const [path, message] = JSON.parse(data.slice(2));

          if (path === '/field/objects/v4') {
            //const fieldData = message.packs;
            // Tambahkan logika pemrosesan fieldData di sini jika dibutuhkan            
            const fieldData = decodePayloadArray(message.packs);
            console.log('Field Data:', fieldData);
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
