// ==UserScript==
// @name         War Session
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  War LOK
// @match        https://play.leagueofkingdoms.com/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako.min.js
// ==/UserScript==

(function () {
    'use strict';

    // 💡 Pastikan variabel bisa diakses oleh script eksternal
    window.tokenTelegram = 'abcd'; // ← ganti token

    const script = document.createElement("script");
    script.src = "https://yogahariman.github.io/lok/JoinWar.js?_=" + Date.now(); // cache buster
    script.async = false; // agar urutan eksekusi terjaga
    document.head.appendChild(script);

})();
