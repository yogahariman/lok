// ==UserScript==
// @name         Hariman
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Intercept login and capture token + regionHash
// @match        https://play.leagueofkingdoms.com/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako.min.js
// ==/UserScript==

(function() {
    'use strict';


    // Setting Troops
    // 50100306=T6, 50100305=T5, 50100304=T4
    window.troopCodes = [50100306, 50100305, 50100304];
    window.troopAmounts = [0, 100000, 0];
    window.allowedMonsters = {
        "20200201": { name: "DeathKar", minLevel: 1 },
        "20200202": { name: "Green Dragon", minLevel: 1 },
        "20200203": { name: "Red Dragon", minLevel: 1 },
        "20200204": { name: "Yellow Dragon", minLevel: 1 },
        "20200206": { name: "Panta", minLevel: 1 },
        "20200207": { name: "Gargantua", minLevel: 1 },
        "20700505": { name: "Magdar", minLevel: 1 },
        "20700506": { name: "Spartoi", minLevel: 4 }
    };

    const script = document.createElement("script");
    script.src = "https://yogahariman.github.io/lok/JoinRally.js?_=" + Date.now(); // cache buster
    script.async = false; // agar urutan eksekusi terjaga
    document.head.appendChild(script);
})();
