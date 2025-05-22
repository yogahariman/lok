const zlib = require('zlib');

// 1. Salin array payload
const payload = [31,139,8,0,0,0,0,0,0,3,173,83,219,106]; // potong di sini untuk ringkas

// 2. Ubah jadi Buffer
const buffer = Buffer.from(payload);

// 3. Gunakan zlib.gunzip untuk dekompresi
zlib.gunzip(buffer, (err, decoded) => {
    if (err) {
        console.error("Gagal unzip:", err);
        return;
    }
    // 4. Tampilkan hasil decoding
    console.log("Decoded payload:", decoded.toString());
});


const json = {
    result: true,
    battles: [
      {
        _id: "6822e4e1ce2789121ababb2e",
        isRally: true,
        fromLoc: [11, 1030, 1034],
        toLoc: [11, 1030, 1033],
        isBF: false,
        marchType: 5,
        kingdomId: "621374af9aa3f033d7bc6b41",
        allianceId: "60f53dea84d14075416cb5e7",
        distance: 1,
        time: 300,
        startTime: "2025-05-13T06:21:21.999Z",
        endTime: "2025-05-13T06:26:21.999Z",
        param: {},
        state: 4,
        targetMonsterId: "6822e4d8bab477ccaf159dea",
        message: "",
        fromAlliance: {
          _id: "60f53dea84d14075416cb5e7",
          name: "LIBERATORS2",
          tag: "LWA2",
          flag: { backShape: 16, patternShape: 0 }
        },
        leaderKingdom: {
          _id: "621374af9aa3f033d7bc6b41",
          worldId: 11,
          name: "SaMaN☆",
          power: 214693852,
          faceCode: 0
        },
        targetMonster: {
          _id: "6822e4d8bab477ccaf159dea",
          loc: [11, 1030, 1033],
          level: 9,
          code: 20200201,
          param: {
            value: 4000000,
            caller: {
              kingdomId: "621374af9aa3f033d7bc6b41",
              allianceId: "60f53dea84d14075416cb5e7"
            }
          },
          state: 1,
          expired: "2025-05-14T10:23:12.338Z"
        },
        maxTroops: 4200000,
        isJoined: false,
        numTroops: 773700
      }
    ]
  };
  
  const base64 = btoa(unescape(encodeURIComponent(JSON.stringify(json))));
  console.log(base64);
  