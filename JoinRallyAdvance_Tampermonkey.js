// ==UserScript==
// @name         Hariman
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Auto Join Rally LOK
// @match        https://play.leagueofkingdoms.com/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako.min.js
// ==/UserScript==

(function () {
    'use strict';

    // 💡 Pastikan variabel bisa diakses oleh script eksternal
    window.tokenTelegram = 'abcd'; // ← ganti token
    //window.shouldOpenFreeChest = true;
    //window.shouldSearchTower = true;

    window.allowedMonsters = {
        "20200201": { name: "DeathKar", minLevel: 4 },
        "20200202": { name: "Green Dragon", minLevel: 99 },
        "20200203": { name: "Red Dragon", minLevel: 1 },
        "20200204": { name: "Yellow Dragon", minLevel: 99 },
        "20200206": { name: "Panta", minLevel: 1 },
        "20200207": { name: "Gargantua", minLevel: 1 },
        "20700505": { name: "Magdar", minLevel: 1 },
        "20700506": { name: "Spartoi", minLevel: 4 }
    };

    window.allowedBookmark = {
        "20200201": { name: "DeathKar", minLevel: 4 },
        //"20200202": { name: "Green Dragon", minLevel: 99 },
        //"20200203": { name: "Red Dragon", minLevel: 1 },
        //"20200204": { name: "Yellow Dragon", minLevel: 99 },
        //"20200206": { name: "Panta", minLevel: 1 },
        //"20200207": { name: "Gargantua", minLevel: 1 },
        //"20700505": { name: "Magdar", minLevel: 1 },
        //"20700506": { name: "Spartoi", minLevel: 4 },
        "20100105": { name: "Crystal Mine", minLevel: 2 },
        //"20100106": { name: "Dragon Soul Cavern", minLevel: 3 }
      };

    const script = document.createElement("script");
    script.src = "https://yogahariman.github.io/lok/JoinRallyAdvance.js?_=" + Date.now(); // cache buster
    script.async = false; // agar urutan eksekusi terjaga
    document.head.appendChild(script);

    // window.addEventListener('load', () => {
    //     // Open Free Chest
    //     scheduleAutoOpenFreeChest();
    //     // jalankan tower tiap menit ke 2 detik ke 10
    //     scheduleStartTower();
    // });
})();
