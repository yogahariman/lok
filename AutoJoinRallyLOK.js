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
                        const token = json.token;
                        const regionHash = json.regionHash;
                        const xor_password = atob(regionHash).split("-")[1];

                        localStorage.setItem("lok_token", token);
                        localStorage.setItem("lok_regionHash", regionHash);
                        localStorage.setItem("lok_xor_password", xor_password);

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
})();
