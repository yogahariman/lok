// ==UserScript==
// @name         AutoJoinRallyLOK
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Intercept login and capture token + regionHash
// @match        https://play.leagueofkingdoms.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    
    // Deklarasi awal variabel sebagai null
    let token = null;
    let regionHash = null;
    let xor_password = null;
    const delayJoin = 3000; // 3 detik delay sebelum join rally

    // Step 1: Intercept login and capture token + regionHash
    // Step 1: Hook WebSocket to capture token
    /*const OriginalWebSocket = window.WebSocket;
    window.WebSocket = function (url, protocols) {
      if (typeof url === 'string' && url.includes('token=')) {
        const parsed = new URL(url);
        const token = parsed.searchParams.get("token");
        console.log("[WS Token Hooked]", token);
        localStorage.setItem("lok_ws_token", token);
      }
      return protocols ? new OriginalWebSocket(url, protocols) : new OriginalWebSocket(url);
    };
    window.WebSocket.prototype = OriginalWebSocket.prototype;
    */
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
    const wsSend = WebSocket.prototype.send;
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
 
    async function fetchRallyList(token) {
        try {
            const response = await fetch("https://api-lok-live.leagueofkingdoms.com/api/alliance/battle/list/v2", {
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
                body: "json={}"
            });

            const result = await response.json();
            console.log("📥 Rally list response:", result);

            return result;
        } catch (err) {
            console.error("❌ Gagal mengambil data rally:", err);
            return null;
        }
    }

    // Step 3: Function to fetch and join rally
    async function autoJoinRally() {
      try {
        const rallyData = await fetchRallyList(token);
        //const rally = rallyData?.result?.rallies?.[0];
        //if (!rally) return console.warn("❌ Tidak ada rally yang tersedia.");

        /*
        const rallyList = await fetch("https://api-lok-live.leagueofkingdoms.com/api/alliance/battle/list/v2", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": token,
          },
          body: "json={}"
        });
        const rallyData = await rallyList.json();
        const rally = rallyData?.result?.rallies?.[0];
        if (!rally) return console.warn("❌ Tidak ada rally yang tersedia.");
  
        const rallyMoId = rally.rallyMoId;
        console.log("[✅ Ready to Join Rally]", rallyMoId);
        
        const joinRes = await fetch("https://api-lok-live.leagueofkingdoms.com/api/field/rally/join", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": token,
          },
          body: `json=${encodeURIComponent(JSON.stringify({ rallyMoId }))}`
        });
  
        const joinResult = await joinRes.json();
        console.log("[🚀 JOIN RESULT]", joinResult);
        */
      } catch (err) {
        console.error("❌ Error saat auto join:", err);
      }
    }    

})();
