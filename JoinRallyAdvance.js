// Note
// 1. cek marchInfo troops harus kuda
// 2. set rally dk
// 3. 

// (async () => {
//     for (let i = 0; i < 10; i++) {
//       await sendSupport(400, 1800);
//       await delay(5000);
//     }
//   })();

// use item
// Egg 10104105(green), 10104106(Red), 10104107(Yellow)
// (async () => { for (let i = 0; i < 16; i++) await useItem(10104106, 1), await delay(500); })();

// Deklarasi awal variabel sebagai null
// let lastRequestError = null;
let token = null;
let regionHash = null;
let xor_password = null;
let kingdomData = null;
let marchLimit = 10;
let marchQueueUsed = null;
let bookmarkResults = [];
//let bookmarkCM = [];
//let bookmarkMonsterNormal = [];
//let bookmarkMonsterRally = [];


const API_BASE_URL = 'https://api-lok-live.leagueofkingdoms.com/api/'

//Quest Status
const STATUS_PENDING = 1; // belum selesai
const STATUS_FINISHED = 2; // sudah selesai, BELUM di-claim
const STATUS_CLAIMED = 3; // sudah di-claim

// Chest type
const CHEST_TYPE_SILVER = 0
const CHEST_TYPE_GOLD = 1
const CHEST_TYPE_PLATINUM = 2

// Dragon's Nest Status
const DRAGO_LAIR_STATUS_STANDBY = 1; // On Standby
const DRAGO_LAIR_STATUS_DEFENDING = 2; // Defending
const DRAGO_LAIR_STATUS_ATTACKING = 3; // Attacking

// Chat: Channel Type
const CHAT_CHANNEL_WORLD = 1; // World Channel
const CHAT_CHANNEL_ALLIANCE = 2; // Alliance Channel

// Chat: Message Type
const CHAT_TYPE_TEXT = 1; // Text message 
const CHAT_TYPE_LOC = 2; // Location
const CHAT_TYPE_STICKER = 7; // Stickers

// March Types
const MARCH_TYPE_GATHER = 1;  // marchType 1 = gathering
const MARCH_TYPE_CASTLE = 2;  // marchType 2 = attack/rally castle
const MARCH_TYPE_MONSTER = 5; // marchType 5 = attack/rally monster
const MARCH_TYPE_SUPPORT = 7; // marchType 7 = support
const MARCH_TYPE_RALLY = 8;   // marchType 8 = Join rally

// Object Codes
const OBJECT_CODE_FARM = 20100101
const OBJECT_CODE_LUMBER_CAMP = 20100102
const OBJECT_CODE_QUARRY = 20100103
const OBJECT_CODE_GOLD_MINE = 20100104
const OBJECT_CODE_CRYSTAL_MINE = 20100105
const OBJECT_CODE_DRAGON_SOUL_CAVERN = 20100106
const OBJECT_CODE_ORC = 20200101
const OBJECT_CODE_SKELETON = 20200102
const OBJECT_CODE_GOLEM = 20200103
const OBJECT_CODE_GOBLIN = 20200104
const OBJECT_CODE_DEATHKAR = 20200201
const OBJECT_CODE_KINGDOM = 20300101
const OBJECT_CODE_CHARM = 20500101
const OBJECT_CODE_OGRE = 20700405
const OBJECT_CODE_HUNGRY_WOLF = 20700406
const OBJECT_CODE_CYCLOPS = 20700407
const OBJECT_CODE_SPARTOI = 20700506

// Error Codes
const ERROR_CODE_FULL_TASK = "full_task";
const ERROR_CODE_OCCUPIED = "occupied";
const ERROR_CODE_UNKNOWN = "unknown_error";
const ERROR_CODE_TROOP_NOT_ENOUGH = "troop_not_enough";
const ERROR_CODE_NO_FIELD_OBJECT = "no_fieldobject";

// Skin Codes
const SKIN_CODE_COOLDOWN_REDUCTION = 10726001;      // skin skill cooldown reduction
const SKIN_CODE_REDUCE_AP_DROP_RATE = 10728001;     // skin reduce AP consumption & Drop rate
const SKIN_CODE_REDUCE_AP = 10729001;               // skin reduce AP consumption
const SKIN_CODE_INCREASE_DROP_RATE = 10730001;      // skin drop rate


const ITEM_CODE_FOOD = 10100001
const ITEM_CODE_LUMBER = 10100002
const ITEM_CODE_STONE = 10100003
const ITEM_CODE_GOLD = 10100004
const ITEM_CODE_CRYSTAL = 10100005

const ITEM_CODE_VIP_10 = 10101007
const ITEM_CODE_VIP_100 = 10101008
const ITEM_CODE_VIP_500 = 10101009
const ITEM_CODE_VIP_1000 = 10101010
const ITEM_CODE_VIP_5000 = 10101011
const ITEM_CODE_VIP_10000 = 10101012

const ITEM_CODE_FOOD_1K = 10101013
const ITEM_CODE_FOOD_5K = 10101014
const ITEM_CODE_FOOD_10K = 10101015
const ITEM_CODE_FOOD_50K = 10101016
const ITEM_CODE_FOOD_100K = 10101017
const ITEM_CODE_FOOD_500K = 10101018
const ITEM_CODE_FOOD_1M = 10101019
const ITEM_CODE_FOOD_5M = 10101020
const ITEM_CODE_FOOD_10M = 10101021

const ITEM_CODE_LUMBER_1K = 10101022
const ITEM_CODE_LUMBER_5K = 10101023
const ITEM_CODE_LUMBER_10K = 10101024
const ITEM_CODE_LUMBER_50K = 10101025
const ITEM_CODE_LUMBER_100K = 10101026
const ITEM_CODE_LUMBER_500K = 10101027
const ITEM_CODE_LUMBER_1M = 10101028
const ITEM_CODE_LUMBER_5M = 10101029
const ITEM_CODE_LUMBER_10M = 10101030

const ITEM_CODE_STONE_1K = 10101031
const ITEM_CODE_STONE_5K = 10101032
const ITEM_CODE_STONE_10K = 10101033
const ITEM_CODE_STONE_50K = 10101034
const ITEM_CODE_STONE_100K = 10101035
const ITEM_CODE_STONE_500K = 10101036
const ITEM_CODE_STONE_1M = 10101037
const ITEM_CODE_STONE_5M = 10101038
const ITEM_CODE_STONE_10M = 10101039

const ITEM_CODE_GOLD_1K = 10101040
const ITEM_CODE_GOLD_5K = 10101041
const ITEM_CODE_GOLD_10K = 10101042
const ITEM_CODE_GOLD_50K = 10101043
const ITEM_CODE_GOLD_100K = 10101044
const ITEM_CODE_GOLD_500K = 10101045
const ITEM_CODE_GOLD_1M = 10101046
const ITEM_CODE_GOLD_5M = 10101047
const ITEM_CODE_GOLD_10M = 10101048

const ITEM_CODE_ACTION_POINTS_10 = 10101049
const ITEM_CODE_ACTION_POINTS_20 = 10101050
const ITEM_CODE_ACTION_POINTS_50 = 10101051
const ITEM_CODE_ACTION_POINTS_100 = 10101052

const ITEM_CODE_SPEEDUP_1M = 10103001
const ITEM_CODE_SPEEDUP_5M = 10103002
const ITEM_CODE_SPEEDUP_10M = 10103003
const ITEM_CODE_SPEEDUP_30M = 10103004
const ITEM_CODE_SPEEDUP_1H = 10103005
const ITEM_CODE_SPEEDUP_3H = 10103006
const ITEM_CODE_SPEEDUP_8H = 10103007
const ITEM_CODE_SPEEDUP_1D = 10103008
const ITEM_CODE_SPEEDUP_3D = 10103009
const ITEM_CODE_SPEEDUP_7D = 10103010
const ITEM_CODE_SPEEDUP_30D = 10103011

const ITEM_CODE_SPEEDUP_BUILDING_1M = 10103012
const ITEM_CODE_SPEEDUP_BUILDING_5M = 10103013
const ITEM_CODE_SPEEDUP_BUILDING_10M = 10103014
const ITEM_CODE_SPEEDUP_BUILDING_30M = 10103015
const ITEM_CODE_SPEEDUP_BUILDING_1H = 10103016
const ITEM_CODE_SPEEDUP_BUILDING_3H = 10103017
const ITEM_CODE_SPEEDUP_BUILDING_8H = 10103018
const ITEM_CODE_SPEEDUP_BUILDING_1D = 10103019
const ITEM_CODE_SPEEDUP_BUILDING_3D = 10103020
const ITEM_CODE_SPEEDUP_BUILDING_7D = 10103021

const ITEM_CODE_SPEEDUP_RESEARCH_1M = 10103022
const ITEM_CODE_SPEEDUP_RESEARCH_5M = 10103023
const ITEM_CODE_SPEEDUP_RESEARCH_10M = 10103024
const ITEM_CODE_SPEEDUP_RESEARCH_30M = 10103025
const ITEM_CODE_SPEEDUP_RESEARCH_1H = 10103026
const ITEM_CODE_SPEEDUP_RESEARCH_3H = 10103027
const ITEM_CODE_SPEEDUP_RESEARCH_8H = 10103028
const ITEM_CODE_SPEEDUP_RESEARCH_1D = 10103029
const ITEM_CODE_SPEEDUP_RESEARCH_3D = 10103030
const ITEM_CODE_SPEEDUP_RESEARCH_7D = 10103031

const ITEM_CODE_SPEEDUP_TRAIN_1M = 10103032
const ITEM_CODE_SPEEDUP_TRAIN_5M = 10103033
const ITEM_CODE_SPEEDUP_TRAIN_10M = 10103034
const ITEM_CODE_SPEEDUP_TRAIN_30M = 10103035
const ITEM_CODE_SPEEDUP_TRAIN_1H = 10103036
const ITEM_CODE_SPEEDUP_TRAIN_3H = 10103037
const ITEM_CODE_SPEEDUP_TRAIN_8H = 10103038
const ITEM_CODE_SPEEDUP_TRAIN_1D = 10103039
const ITEM_CODE_SPEEDUP_TRAIN_3D = 10103040
const ITEM_CODE_SPEEDUP_TRAIN_7D = 10103041

const ITEM_CODE_SPEEDUP_HEAL_1M = 10103042
const ITEM_CODE_SPEEDUP_HEAL_5M = 10103043
const ITEM_CODE_SPEEDUP_HEAL_10M = 10103044
const ITEM_CODE_SPEEDUP_HEAL_30M = 10103045
const ITEM_CODE_SPEEDUP_HEAL_1H = 10103046
const ITEM_CODE_SPEEDUP_HEAL_3H = 10103047
const ITEM_CODE_SPEEDUP_HEAL_8H = 10103048
const ITEM_CODE_SPEEDUP_HEAL_1D = 10103049
const ITEM_CODE_SPEEDUP_HEAL_3D = 10103050
const ITEM_CODE_SPEEDUP_HEAL_7D = 10103051

const ITEM_CODE_DRAGON_EGG_GREEN = 10104105
const ITEM_CODE_DRAGON_EGG_RED = 10104106
const ITEM_CODE_DRAGON_EGG_YELLOW = 10104107

const ITEM_CODE_CHEST_SILVER = 10104024
const ITEM_CODE_CHEST_GOLD = 10104025
const ITEM_CODE_CHEST_PLATINUM = 10104142

// Item Codes
const ITEM_CODE_FOOD_BOOST_8H = 10102001
const ITEM_CODE_FOOD_BOOST_1D = 10102002
const ITEM_CODE_LUMBER_BOOST_8H = 10102003
const ITEM_CODE_LUMBER_BOOST_1D = 10102004
const ITEM_CODE_STONE_BOOST_8H = 10102005
const ITEM_CODE_STONE_BOOST_1D = 10102006
const ITEM_CODE_GOLD_BOOST_8H = 10102007
const ITEM_CODE_GOLD_BOOST_1D = 10102008

const ITEM_CODE_GATHERING_BOOST_8H = 10102009
const ITEM_CODE_GATHERING_BOOST_1D = 10102010

// Tier 1
const TROOP_CODE_FIGHTER = 50100101
const TROOP_CODE_HUNTER = 50100201
const TROOP_CODE_STABLE_MAN = 50100301
// Tier 2
const TROOP_CODE_WARRIOR = 50100102
const TROOP_CODE_LONGBOW_MAN = 50100202
const TROOP_CODE_HORSEMAN = 50100302
// Tier 3
const TROOP_CODE_KNIGHT = 50100103
const TROOP_CODE_RANGER = 50100203
const TROOP_CODE_HEAVY_CAVALRY = 50100303
// Tier 4
const TROOP_CODE_GUARDIAN = 50100104
const TROOP_CODE_CROSSBOW_MAN = 50100204
const TROOP_CODE_IRON_CAVALRY = 50100304
// Tier 5
const TROOP_CODE_CRUSADER = 50100105
const TROOP_CODE_SNIPER = 50100205
const TROOP_CODE_DRAGON = 50100305

// Tier 6.1
const TROOP_CODE_PALADIN = 50100106
const TROOP_CODE_MARKSMAN = 50100206
const TROOP_CODE_MARAUDER = 50100306
// // Tier 6.2
const TROOP_CODE_DESTROYER = 50100107
const TROOP_CODE_MUSKETEER = 50100207
const TROOP_CODE_VALKYRIE = 50100307

const SPEEDUP_TYPE = {
    GENERIC: "generic",
    BUILDING: "building",
    RESEARCH: "research",
    TRAIN: "train",
    HEAL: "heal",
};
const SPEEDUP_DURATION = {
    "1m": 60,
    "5m": 5 * 60,
    "10m": 10 * 60,
    "30m": 30 * 60,
    "1h": 60 * 60,
    "3h": 3 * 60 * 60,
    "8h": 8 * 60 * 60,
    "1d": 24 * 60 * 60,
    "3d": 3 * 24 * 60 * 60,
    "7d": 7 * 24 * 60 * 60,
    "30d": 30 * 24 * 60 * 60,
};
const SPEEDUP_ITEM = {
    [SPEEDUP_TYPE.GENERIC]: {
        "1m": ITEM_CODE_SPEEDUP_1M,
        "5m": ITEM_CODE_SPEEDUP_5M,
        "10m": ITEM_CODE_SPEEDUP_10M,
        "30m": ITEM_CODE_SPEEDUP_30M,
        "1h": ITEM_CODE_SPEEDUP_1H,
        "3h": ITEM_CODE_SPEEDUP_3H,
        "8h": ITEM_CODE_SPEEDUP_8H,
        "1d": ITEM_CODE_SPEEDUP_1D,
        "3d": ITEM_CODE_SPEEDUP_3D,
        "7d": ITEM_CODE_SPEEDUP_7D,
        "30d": ITEM_CODE_SPEEDUP_30D,
    },

    [SPEEDUP_TYPE.BUILDING]: {
        "1m": ITEM_CODE_SPEEDUP_BUILDING_1M,
        "5m": ITEM_CODE_SPEEDUP_BUILDING_5M,
        "10m": ITEM_CODE_SPEEDUP_BUILDING_10M,
        "30m": ITEM_CODE_SPEEDUP_BUILDING_30M,
        "1h": ITEM_CODE_SPEEDUP_BUILDING_1H,
        "3h": ITEM_CODE_SPEEDUP_BUILDING_3H,
        "8h": ITEM_CODE_SPEEDUP_BUILDING_8H,
        "1d": ITEM_CODE_SPEEDUP_BUILDING_1D,
        "3d": ITEM_CODE_SPEEDUP_BUILDING_3D,
        "7d": ITEM_CODE_SPEEDUP_BUILDING_7D,
    },

    [SPEEDUP_TYPE.RESEARCH]: {
        "1m": ITEM_CODE_SPEEDUP_RESEARCH_1M,
        "5m": ITEM_CODE_SPEEDUP_RESEARCH_5M,
        "10m": ITEM_CODE_SPEEDUP_RESEARCH_10M,
        "30m": ITEM_CODE_SPEEDUP_RESEARCH_30M,
        "1h": ITEM_CODE_SPEEDUP_RESEARCH_1H,
        "3h": ITEM_CODE_SPEEDUP_RESEARCH_3H,
        "8h": ITEM_CODE_SPEEDUP_RESEARCH_8H,
        "1d": ITEM_CODE_SPEEDUP_RESEARCH_1D,
        "3d": ITEM_CODE_SPEEDUP_RESEARCH_3D,
        "7d": ITEM_CODE_SPEEDUP_RESEARCH_7D,
    },

    [SPEEDUP_TYPE.TRAIN]: {
        "1m": ITEM_CODE_SPEEDUP_TRAIN_1M,
        "5m": ITEM_CODE_SPEEDUP_TRAIN_5M,
        "10m": ITEM_CODE_SPEEDUP_TRAIN_10M,
        "30m": ITEM_CODE_SPEEDUP_TRAIN_30M,
        "1h": ITEM_CODE_SPEEDUP_TRAIN_1H,
        "3h": ITEM_CODE_SPEEDUP_TRAIN_3H,
        "8h": ITEM_CODE_SPEEDUP_TRAIN_8H,
        "1d": ITEM_CODE_SPEEDUP_TRAIN_1D,
        "3d": ITEM_CODE_SPEEDUP_TRAIN_3D,
        "7d": ITEM_CODE_SPEEDUP_TRAIN_7D,
    },

    [SPEEDUP_TYPE.HEAL]: {
        "1m": ITEM_CODE_SPEEDUP_HEAL_1M,
        "5m": ITEM_CODE_SPEEDUP_HEAL_5M,
        "10m": ITEM_CODE_SPEEDUP_HEAL_10M,
        "30m": ITEM_CODE_SPEEDUP_HEAL_30M,
        "1h": ITEM_CODE_SPEEDUP_HEAL_1H,
        "3h": ITEM_CODE_SPEEDUP_HEAL_3H,
        "8h": ITEM_CODE_SPEEDUP_HEAL_8H,
        "1d": ITEM_CODE_SPEEDUP_HEAL_1D,
        "3d": ITEM_CODE_SPEEDUP_HEAL_3D,
        "7d": ITEM_CODE_SPEEDUP_HEAL_7D,
    },
};
// cara pakai:
// const speedup = getSpeedupInfo(
//     SPEEDUP_TYPE.HEAL,
//     "3h"
// );

// if (speedup) {
//     await useItem(speedup.code);
//     console.log(`⏱️ ${speedup.seconds} detik`);
// }

function getSpeedupInfo(type, duration) {
    const code = SPEEDUP_ITEM[type]?.[duration];
    const seconds = SPEEDUP_DURATION[duration];

    if (!code || !seconds) {
        console.warn("❌ Speedup tidak valid", { type, duration });
        return null;
    }

    return {
        type,
        duration,
        code,
        seconds,
    };
}

const ITEM_NAME = {
    [ITEM_CODE_FOOD]: "Food",
    [ITEM_CODE_LUMBER]: "Lumber",
    [ITEM_CODE_STONE]: "Stone",
    [ITEM_CODE_GOLD]: "Gold",
    [ITEM_CODE_CRYSTAL]: "Crystal",
    // VIP
    [ITEM_CODE_VIP_10]: "VIP 10",
    [ITEM_CODE_VIP_100]: "VIP 100",
    [ITEM_CODE_VIP_500]: "VIP 500",
    [ITEM_CODE_VIP_1000]: "VIP 1,000",
    [ITEM_CODE_VIP_5000]: "VIP 5,000",
    [ITEM_CODE_VIP_10000]: "VIP 10,000",

    // Food
    [ITEM_CODE_FOOD_1K]: "Food 1K",
    [ITEM_CODE_FOOD_5K]: "Food 5K",
    [ITEM_CODE_FOOD_10K]: "Food 10K",
    [ITEM_CODE_FOOD_1M]: "Food 1M",
    [ITEM_CODE_FOOD_5M]: "Food 5M",
    [ITEM_CODE_FOOD_10M]: "Food 10M",

    // Lumber
    [ITEM_CODE_LUMBER_1K]: "Lumber 1K",
    [ITEM_CODE_LUMBER_5K]: "Lumber 5K",
    [ITEM_CODE_LUMBER_10K]: "Lumber 10K",
    [ITEM_CODE_LUMBER_50K]: "Lumber 50K",
    [ITEM_CODE_LUMBER_100K]: "Lumber 100K",
    [ITEM_CODE_LUMBER_500K]: "Lumber 500K",
    [ITEM_CODE_LUMBER_1M]: "Lumber 1M",
    [ITEM_CODE_LUMBER_5M]: "Lumber 5M",
    [ITEM_CODE_LUMBER_10M]: "Lumber 10M",

    // Stone
    [ITEM_CODE_STONE_1K]: "Stone 1K",
    [ITEM_CODE_STONE_5K]: "Stone 5K",
    [ITEM_CODE_STONE_10K]: "Stone 10K",
    [ITEM_CODE_STONE_50K]: "Stone 50K",
    [ITEM_CODE_STONE_100K]: "Stone 100K",
    [ITEM_CODE_STONE_500K]: "Stone 500K",
    [ITEM_CODE_STONE_1M]: "Stone 1M",
    [ITEM_CODE_STONE_5M]: "Stone 5M",
    [ITEM_CODE_STONE_10M]: "Stone 10M",

    // Gold
    [ITEM_CODE_GOLD_1K]: "Gold 1K",
    [ITEM_CODE_GOLD_5K]: "Gold 5K",
    [ITEM_CODE_GOLD_10K]: "Gold 10K",
    [ITEM_CODE_GOLD_50K]: "Gold 50K",
    [ITEM_CODE_GOLD_100K]: "Gold 100K",
    [ITEM_CODE_GOLD_500K]: "Gold 500K",
    [ITEM_CODE_GOLD_1M]: "Gold 1M",
    [ITEM_CODE_GOLD_5M]: "Gold 5M",
    [ITEM_CODE_GOLD_10M]: "Gold 10M",

    // AP
    [ITEM_CODE_ACTION_POINTS_10]: "Action Points 10",
    [ITEM_CODE_ACTION_POINTS_20]: "Action Points 20",
    [ITEM_CODE_ACTION_POINTS_50]: "Action Points 50",
    [ITEM_CODE_ACTION_POINTS_100]: "Action Points 100",

    // Boosts
    [ITEM_CODE_FOOD_BOOST_8H]: "Food Boost 8h",
    [ITEM_CODE_FOOD_BOOST_1D]: "Food Boost 1d",
    [ITEM_CODE_LUMBER_BOOST_8H]: "Lumber Boost 8h",
    [ITEM_CODE_LUMBER_BOOST_1D]: "Lumber Boost 1d",
    [ITEM_CODE_STONE_BOOST_8H]: "Stone Boost 8h",
    [ITEM_CODE_STONE_BOOST_1D]: "Stone Boost 1d",
    [ITEM_CODE_GOLD_BOOST_8H]: "Gold Boost 8h",
    [ITEM_CODE_GOLD_BOOST_1D]: "Gold Boost 1d",
    [ITEM_CODE_GATHERING_BOOST_8H]: "Gathering Boost 8h",
    [ITEM_CODE_GATHERING_BOOST_1D]: "Gathering Boost 1d",

    // Speedups
    [ITEM_CODE_SPEEDUP_1M]: "Speedup 1m",
    [ITEM_CODE_SPEEDUP_5M]: "Speedup 5m",
    [ITEM_CODE_SPEEDUP_10M]: "Speedup 10m",
    [ITEM_CODE_SPEEDUP_30M]: "Speedup 30m",
    [ITEM_CODE_SPEEDUP_1H]: "Speedup 1h",
    [ITEM_CODE_SPEEDUP_3H]: "Speedup 3h",
    [ITEM_CODE_SPEEDUP_8H]: "Speedup 8h",
    [ITEM_CODE_SPEEDUP_1D]: "Speedup 1d",
    [ITEM_CODE_SPEEDUP_3D]: "Speedup 3d",
    [ITEM_CODE_SPEEDUP_7D]: "Speedup 7d",
};
function getItemName(code) {
    return ITEM_NAME[code] ?? `Unknown Item (${code})`;
}

// const HEAL_SPEED = {
//     "1m": { code: ITEM_CODE_SPEEDUP_HEAL_1M, seconds: 60 },
//     "5m": { code: ITEM_CODE_SPEEDUP_HEAL_5M, seconds: 5 * 60 },
//     "10m": { code: ITEM_CODE_SPEEDUP_HEAL_10M, seconds: 10 * 60 },
//     "30m": { code: ITEM_CODE_SPEEDUP_HEAL_30M, seconds: 30 * 60 },
//     "1h": { code: ITEM_CODE_SPEEDUP_HEAL_1H, seconds: 60 * 60 },
//     "3h": { code: ITEM_CODE_SPEEDUP_HEAL_3H, seconds: 3 * 60 * 60 },
//     "8h": { code: ITEM_CODE_SPEEDUP_HEAL_8H, seconds: 8 * 60 * 60 },
//     "1d": { code: ITEM_CODE_SPEEDUP_HEAL_1D, seconds: 24 * 60 * 60 },
//     "3d": { code: ITEM_CODE_SPEEDUP_HEAL_3D, seconds: 3 * 24 * 60 * 60 },
//     "7d": { code: ITEM_CODE_SPEEDUP_HEAL_7D, seconds: 7 * 24 * 60 * 60 },
// };

function getMarchTypeName(marchType) {
    switch (marchType) {
        case MARCH_TYPE_GATHER: return 'Gathering';
        case MARCH_TYPE_CASTLE: return 'Attack/Rally Castle';
        case MARCH_TYPE_MONSTER: return 'Attack/Rally Monster';
        case MARCH_TYPE_SUPPORT: return 'Support';
        case MARCH_TYPE_RALLY: return 'Join Rally';
        default: return `Unknown Type (${marchType})`;
    }
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
xor_password = ".0d172qwfg634.";
const s= "VRICQ1h...";
console.log("Hasil decrypt:", b64xorDec(s, xor_password));
// ✅ Coba decode string s
try {
  const result = b64xorDec(s, xor_password);
  console.log("Hasil decrypt:", result);
 
  // ✅ Coba encode lagi
  const encrypted = b64xorEnc(result, xor_password);
  console.log("Hasil encrypt ulang:", encrypted);
 
  // Opsional: cek sama seperti input awal?
  console.log("Apakah hasil encode sama dengan input awal?", encrypted === s);
} catch (e) {
  console.error("Gagal decode atau encode:", e.message);
}
*/
/*
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
*/

async function decodePayloadArray(payload) {
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

async function decodeGzipPayload(payload) {
    if (!payload) return null;

    let bytes;

    // Jika payload string base64
    if (typeof payload === "string") {
        try {
            const bin = atob(payload);
            bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        } catch {
            // fallback: string biasa
            return payload;
        }
    }
    // Jika array / Uint8Array / ArrayBuffer
    else if (Array.isArray(payload) || ArrayBuffer.isView(payload)) {
        bytes = new Uint8Array(payload);
    }
    else if (payload instanceof ArrayBuffer) {
        bytes = new Uint8Array(payload);
    }
    else {
        console.error("❌ Unsupported payload type:", payload);
        return null;
    }

    // --- 1) Coba native GZIP decompress ---
    try {
        if (typeof DecompressionStream !== "undefined") {
            const ds = new DecompressionStream("gzip");
            const stream = new Response(new Blob([bytes]).stream().pipeThrough(ds));
            const text = await stream.text();

            try {
                return JSON.parse(text);
            } catch {
                return text;
            }
        }
    } catch (e) {
        console.log("Native gzip failed:", e);
    }


    // --- 2) Fallback ke fflate.gunzipSync() tanpa @require ---
    try {
        if (!window.fflate) {
            await new Promise((resolve, reject) => {
                const s = document.createElement("script");
                s.src = "https://cdn.jsdelivr.net/npm/fflate@0.7.5/umd/index.js";
                s.onload = resolve;
                s.onerror = reject;
                document.head.appendChild(s);
            });
        }

        const plain = window.fflate.gunzipSync(bytes);
        const text = new TextDecoder().decode(plain);

        try {
            return JSON.parse(text);
        } catch {
            return text;
        }

    } catch (e) {
        console.error("❌ Fflate gunzip failed:", e);
        return null;
    }
}

function hasToken() {
    if (!token) {
        console.log("⏳ Token belum tersedia.");
        return false;
    }
    return true;
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function delayRandom(min = 1000, max = 3000) {
    const ms = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getTodayKey() {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

function getCurrentHour() {
    return new Date().getHours();
}

function checkAndResetRallyCount() {
    const todayKey = getTodayKey();
    const lastResetDate = localStorage.getItem('rallyCountResetDate');
    const currentHour = getCurrentHour();

    // Hanya reset jika jam sudah lewat dari 7 pagi dan belum reset hari ini
    if (currentHour >= 7 && lastResetDate !== todayKey) {
        console.log('[🔄] Reset rallyCount karena hari baru dimulai.');
        localStorage.setItem('rallyCount', '0');
        localStorage.setItem('rallyCountResetDate', todayKey);
    }
}

function getRallyCount() {
    return parseInt(localStorage.getItem('rallyCount') || '0', 10);
}

function incrementRallyCount() {
    const count = getRallyCount() + 1;
    localStorage.setItem('rallyCount', count.toString());
    return count;
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

// function createJoinRallyPayload(codes, amounts, rallyMoId) {
//     if (!Array.isArray(codes) || !Array.isArray(amounts) || codes.length !== amounts.length) {
//         console.error("❌ Input 'codes' dan 'amounts' harus array dengan panjang yang sama.");
//         return null;
//     }

//     const marchTroops = codes.map((code, index) => ({
//         code: code,
//         level: 0,
//         select: 0,
//         amount: amounts[index],
//         dead: 0,
//         wounded: 0,
//         hp: 0,
//         attack: 0,
//         defense: 0,
//         seq: 0
//     }));

//     return {
//         marchTroops,
//         rallyMoId
//     };
// }

// function payloadAutoJoinRally(troops, rallyMoId) {
//     const marchTroops = troops.map(({ code, amount }) => ({
//         code,
//         level: 0,
//         select: 0,
//         amount,
//         dead: 0,
//         wounded: 0,
//         hp: 0,
//         attack: 0,
//         defense: 0,
//         seq: 0
//     }));

//     return { marchTroops, rallyMoId };
// }

function buildTroopsFromCodesAndAmounts(codes = [], amounts = []) {
    if (!Array.isArray(codes) || !Array.isArray(amounts) || codes.length !== amounts.length) {
        return [];
    }

    return codes.map((code, i) => ({
        code,
        level: 0,
        select: 0,
        amount: amounts[i] ?? 0,
        dead: 0,
        wounded: 0,
        hp: 0,
        attack: 0,
        defense: 0,
        seq: 0
    }));
}

function payloadAutoJoinRally(troops, rallyMoId) {
    const allowedCodes = new Set([
        TROOP_CODE_IRON_CAVALRY,
        TROOP_CODE_DRAGON,
        TROOP_CODE_MARAUDER,
        TROOP_CODE_VALKYRIE
    ]);

    const marchTroops = troops
        .filter(t => allowedCodes.has(t.code))
        .map(({ code, amount }) => ({
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

function payloadSendmarch(troops, loc, marchType, dragoId) {
    const toLoc = [kingdomData.loc[0], ...loc];
    const marchTroops = troops.map(({ code, amount }) => ({
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

    return {
        fromId: kingdomData.fieldObjectId,
        marchType,
        toLoc,
        marchTroops,
        ...(dragoId !== undefined ? { dragoId } : {})
    };
}

// Contoh penggunaan:
//const result = getZoneIds(1, 2000, 1, 2000);
//console.log(result);

// async function sendRequest({ url, token, body }) {
//     lastRequestError = null;
//     try {
//         const response = await fetch(url, {
//             method: "POST",
//             mode: "cors",
//             credentials: "omit",
//             referrer: "https://play.leagueofkingdoms.com/",
//             headers: {
//                 "User-Agent": navigator.userAgent,
//                 "Accept": "*/*",
//                 "Accept-Language": "en-US,en;q=0.5",
//                 "x-access-token": token,
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 "Sec-Fetch-Dest": "empty",
//                 "Sec-Fetch-Mode": "cors",
//                 "Sec-Fetch-Site": "same-site"
//             },
//             body: `json=${encodeURIComponent(JSON.stringify(body))}`
//         });

//         // ❌ HTTP error
//         if (!response.ok) {
//             lastRequestError = {
//                 type: "HTTP",
//                 code: response.status
//             };            
//             console.log(`⛔ HTTP ${response.status} → ${url}`);
//             return null;
//         }

//         const text = await response.text();

//         let res;
//         try {
//             res = JSON.parse(text);
//         } catch {
//             lastRequestError = {
//                 type: "PARSE",
//                 code: "INVALID_JSON"
//             };            
//             console.log(`❌ Response bukan JSON → ${url}`);
//             return null;
//         }

//         // ❌ API reject
//         if (res?.result !== true) {
//             const code = res?.err?.code ?? "UNKNOWN";
//             lastRequestError = {
//                 type: "API",
//                 code
//             };            
//             console.log(`❌ API reject (code: ${code}) → ${url}`);
//             return null;
//         }

//         // ✅ SUKSES
//         return res;

//     } catch (err) {
//         lastRequestError = {
//             type: "NETWORK",
//             code: err?.message ?? "NETWORK_ERROR"
//         };        
//         console.log(`❌ Network error → ${url}`, err);
//         return null;
//     }
// }

async function sendRequest({ url, token, body }) {
    const createErrorResponse = (type, code, message = null, extra = {}) => ({
        result: false,
        err: {
            type,
            code,
            ...(message ? { message } : {}),
            ...extra
        }
    });

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
            body: `json=${encodeURIComponent(JSON.stringify(body))}`
        });

        if (!response.ok) {
            console.log(`⛔ HTTP ${response.status} → ${url}`);
            return createErrorResponse("HTTP", response.status, `HTTP ${response.status}`);
        }

        const text = await response.text();

        let res;
        try {
            res = JSON.parse(text);
        } catch {
            console.log(`❌ Response bukan JSON → ${url}`);
            return createErrorResponse("PARSE", "INVALID_JSON", "Response bukan JSON");
        }

        if (res?.result !== true) {
            const code = res?.err?.code ?? "UNKNOWN";
            console.log(`❌ API reject (code: ${code}) → ${url}`);
            return {
                ...res,
                result: false,
                err: {
                    ...(res?.err || {}),
                    type: res?.err?.type ?? "API",
                    code
                }
            };
        }

        return res;
    } catch (err) {
        const code = err?.message ?? "NETWORK_ERROR";
        console.log(`❌ Network error → ${url}`, err);
        return createErrorResponse("NETWORK", code, code);
    }
}

async function getMyProfile() {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }
    return await sendRequest({
        url: API_BASE_URL + "kingdom/profile/my",
        token,
        //body: b64xorEnc({}, xor_password),
        body: {}
    });
}

async function updateKingdomLoc() {
    const infoProfile = await getMyProfile();

    if (!infoProfile?.result) {
        console.log(`⚠️ Gagal update kingdom loc: ${infoProfile?.err?.code ?? "UNKNOWN"}`);
        return false;
    }

    const loc = infoProfile?.profile?.loc;
    if (!Array.isArray(loc) || loc.length < 3 || !kingdomData) {
        return false;
    }

    kingdomData.loc = loc;
    return true;
}

async function getTroopsProfile() {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }
    return await sendRequest({
        url: API_BASE_URL + "kingdom/profile/troops",
        token,
        body: {}
    });
}

async function getMyAllianceInfo() {
        if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "alliance/info/my",
        token,
        body: {}
    });
}


async function getVipInfo() {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "kingdom/vip/info",
        token,
        body: {}
    });
}

async function getDsavipInfo() {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "kingdom/dsavip/info",
        token,
        body: {}
    });
}

async function getHospitalWounded() {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return sendRequest({
        url: API_BASE_URL + "kingdom/hospital/wounded",
        token,
        body: {}
    });
}

async function getItemList() {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "item/list",
        token,
        body: {}
    });
}
async function getTreasureList() {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "kingdom/treasure/list",
        token: token,
        body: {}
    });
}

async function getCaravanList() {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "kingdom/caravan/list",
        token,
        body: {}
    });
}

async function getEventList() {
        if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "event/list",
        token,
        body: {}
    });
}

async function getEventInfo(rootEventId) {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "event/info",
        token,
        body: { rootEventId }
    });
}

async function getDailyQuest() {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "quest/list/daily",
        token,
        body: {}
    });
}

async function getQuestList() {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "quest/list",
        token,
        body: {}
    });
}

async function getHelpList() {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "alliance/help/list",
        token,
        body: {}
    });
}

async function getAllianceResearchList() {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "alliance/research/list",
        token,
        body: {}
    });
}

async function getSkillList() {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "skill/list",
        token,
        body: {}
    });
}

async function getDragoLairList() {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "drago/lair/list",
        token: token,
        body: {}
    });
}

async function getRallyList() {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "alliance/battle/list/v2",
        token: token,
        body: {}
    });
}

async function getRallyInfo(battleId) {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "alliance/battle/info",
        token: token,
        body: { rallyMoId: battleId }
    });
}

async function getEventListCvC() {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "event/list/cvc",
        token: token,
        body: {}
    });
}

async function claimChestFree(type) {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "item/freechest",
        token: token,
        //body: b64xorEnc({ type: 0 }, xor_password),
        body: { type }
    });
}
// for (let i = 1; i <= 10 && await claimChestPlatinum() !== null; i++) await delay(5000);
async function claimChestPlatinum({
    delayMs = 5000,
    maxTry = Infinity
} = {}) {
    let i = 1;

    while (i <= maxTry) {
        const res = await claimChestFree(CHEST_TYPE_PLATINUM);

        if (!res?.result) {
            console.log(`⛔ Claim Platinum berhenti (code: ${res?.err?.code ?? "UNKNOWN"}).`);
            break;
        }

        console.log(`🎁 Chest ${i}:`, res);
        i++;
        await delay(delayMs);
    }

    console.log(`✅ Selesai claim Platinum. Total: ${i - 1} chest`);
    return i - 1;
}

async function helpAllMembers() {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "alliance/help/all",
        token,
        body: {}
    });
}

async function getAllianceResearchInfo(researchCode) {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "alliance/research/info",
        token,
        body: { researchCode }
    });

}

async function getAllianceResearchDonateAll(researchCode) {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "alliance/research/donateAll",
        token,
        body: { code: researchCode }
    });
}

async function setTreasurePage(currentPage) {
    if (!hasToken()) {
        return {
            result: false,
            err: { type: "AUTH", code: "NO_TOKEN" }
        };
    }

    return await sendRequest({
        url: API_BASE_URL + "kingdom/treasure/page",
        token: token,
        body: { page: currentPage }
    });
}

async function getMarchInfo(locOrToLoc, battleId = null) {
    const errorResponse = (code, message) => ({
        result: false,
        err: { type: "VALIDATION", code, ...(message ? { message } : {}) }
    });

    if (!Array.isArray(locOrToLoc)) {
        return errorResponse("INVALID_LOC_TYPE", "loc / toLoc wajib array");
    }

    if (!kingdomData?.fieldObjectId || !Array.isArray(kingdomData?.loc) || kingdomData.loc.length < 3) {
        return errorResponse("INVALID_KINGDOM_DATA", "Data kingdom (fieldObjectId/loc) belum valid");
    }

    let toLoc;
    if (locOrToLoc.length === 3) {
        toLoc = locOrToLoc;
    } else if (locOrToLoc.length === 2) {
        toLoc = [kingdomData.loc[0], ...locOrToLoc];
    } else {
        return errorResponse("INVALID_LOC_FORMAT", `Format loc / toLoc tidak valid: ${JSON.stringify(locOrToLoc)}`);
    }

    const payload = {
        fromId: kingdomData.fieldObjectId,
        toLoc,
        ...(battleId ? { rallyMoId: battleId } : {})
    };

    return await sendRequest({
        url: API_BASE_URL + "field/march/info",
        token,
        body: payload
    });
}

function getTroopGroupByHP(monsterHP, marchInfo) {
    const troops = marchInfo?.saveTroops || kingdomData.saveTroops;

    if (monsterHP < 2000000) return troops[0];
    if (monsterHP <= 20000000) return troops[1];
    return troops[2];
}


async function getMarchLimit() {
    if (!hasToken()) return null;

    const res = await getTroopsProfile();
    if (!res?.result) {
        console.log(`⚠️ Gagal getMarchLimit: ${res?.err?.code ?? "UNKNOWN"}`);
        return null;
    }

    const limit = Number(res?.troops?.info?.marchLimit);
    return Number.isFinite(limit) ? limit : null;
}

async function getMarchQueueUsed() {
    if (!hasToken()) return marchLimit;

    const res = await getTroopsProfile();
    if (!res?.result) {
        console.log(`⚠️ Gagal getMarchQueueUsed: ${res?.err?.code ?? "UNKNOWN"} -> anggap full queue.`);
        return marchLimit;
    }

    const field = res?.troops?.field;
    if (!Array.isArray(field)) {
        console.log("⚠️ troops.field tidak valid -> anggap full queue.");
        return marchLimit;
    }

    return field.length;
}

function getAmountItemList(data, targetCode) {
    const item = data.items.find(i => i.code === targetCode);
    return item ? item.amount : null;
}

async function useItem(code, amount) {
    if (!hasToken()) return;

    const itemPayload = { code, amount };
    const analyticsPayload = {
        url: "item/use",
        param: `${code}|${amount}`
    };

    // Kirim request penggunaan item
    await sendRequest({
        url: API_BASE_URL + "item/use",
        token,
        //body: b64xorEnc(itemPayload, xor_password),
        body: itemPayload
    });

    // Kirim data analitik
    await sendRequest({
        url: API_BASE_URL + "auth/analytics",
        token,
        body: analyticsPayload
    });
}

function isMessageAllowed(message) {
    const msg = (message || "").toLowerCase();
    const forbidden = ["bot", "archer", "infa", "don't", "test"];
    return !forbidden.some(word => msg.includes(word));
}


async function useActionPoint() {
    if (!hasToken()) return;

    //const infoProfileEnc = await sendRequest(inputRaw);
    //const infoProfile = b64xorDec(infoProfileEnc, xor_password);
    const infoProfile = await getMyProfile();
    if (!infoProfile?.result) {
        console.log(`⚠ Gagal mengambil info profile pada fungsi useActionPoint. code=${infoProfile?.err?.code ?? "UNKNOWN"}`);
        return false;
    }

    const actionPoint = Number(infoProfile?.profile?.actionPoint?.value ?? 0);

    if (actionPoint < 50) {
        const itemList = await getItemList();
        if (!itemList?.result) {
            console.log(`⚠ Gagal mengambil item list pada fungsi useActionPoint. code=${itemList?.err?.code ?? "UNKNOWN"}`);
            return false;
        }

        let codeAP = null;
        let nAp = null;

        const ap10 = Number(getAmountItemList(itemList, ITEM_CODE_ACTION_POINTS_10) ?? 0);
        const ap20 = Number(getAmountItemList(itemList, ITEM_CODE_ACTION_POINTS_20) ?? 0);
        const ap50 = Number(getAmountItemList(itemList, ITEM_CODE_ACTION_POINTS_50) ?? 0);
        const ap100 = Number(getAmountItemList(itemList, ITEM_CODE_ACTION_POINTS_100) ?? 0);
        
        if (ap10 > 10) {
            codeAP = ITEM_CODE_ACTION_POINTS_10;
            nAp = 10;
        } else if (ap20 > 5) {
            codeAP = ITEM_CODE_ACTION_POINTS_20;
            nAp = 5;
        } else if (ap50 > 2) {
            codeAP = ITEM_CODE_ACTION_POINTS_50;
            nAp = 2;
        } else if (ap100 > 1) {
            codeAP = ITEM_CODE_ACTION_POINTS_100;
            nAp = 1;
        }

        if (ap10 >= 20) {
            await useItem(ITEM_CODE_ACTION_POINTS_10, 20);
        } else if (ap20 >= 10) {
            await useItem(ITEM_CODE_ACTION_POINTS_20, 10);
        } else if (ap50 >= 5) {
            await useItem(ITEM_CODE_ACTION_POINTS_50, 5);
        } else if (ap100 >= 2) {
            await useItem(ITEM_CODE_ACTION_POINTS_100, 2);
        }

        const chestSilver = Number(getAmountItemList(itemList, ITEM_CODE_CHEST_SILVER) ?? 0);
        const chestGold = Number(getAmountItemList(itemList, ITEM_CODE_CHEST_GOLD) ?? 0);
        const chestPlatinum = Number(getAmountItemList(itemList, ITEM_CODE_CHEST_PLATINUM) ?? 0);

        if (chestSilver >= 20) {
            await useItem(ITEM_CODE_CHEST_SILVER, 20);
            await delay(3000);
            if (chestGold >= 20) {
                await useItem(ITEM_CODE_CHEST_GOLD, 20);
                await delay(3000);
            }
            if (chestPlatinum >= 1) {
                await useItem(ITEM_CODE_CHEST_PLATINUM, 1);
                await delay(1000);
            }
        }

        if (codeAP && nAp) {
            await useItem(codeAP, nAp);
        }
    }
}

async function heal(targetDuration = null, speedHeal = null) {
    if (!hasToken()) return;

    // Ambil stok item
    const itemList = await getItemList();
    if (!itemList?.result) {
        console.log(`⚠ Gagal mengambil item list pada fungsi heal. code=${itemList?.err?.code ?? "UNKNOWN"}`);
        return;
    }

    function getItemStock(code) {
        const found = itemList?.items?.find(i => i.code === code);
        return found ? found.amount : 0;
    }

    // Eksekusi semua item yang direncanakan
    await changeTreasure(1);
    await delay(5000);

    // Ambil data wounded
    const wounded = await getHospitalWounded();
    if (!wounded?.result) {
        console.log(`⚠ Gagal mengambil data wounded pada fungsi heal. code=${wounded?.err?.code ?? "UNKNOWN"}`);
        return;
    }

    let totalTime = 0;
    if (Array.isArray(wounded?.wounded)) {
        for (const g of wounded.wounded) {
            if (!Array.isArray(g)) continue;
            for (const w of g) if (w?.time) totalTime += w.time;
        }
    }

    if (totalTime <= 0) {
        console.log("📭 Tidak ada wounded.");
        return;
    }

    // Parser untuk string waktu "1h" "1d" dsb
    function parseDuration(str) {
        const num = parseInt(str, 10);
        if (str.endsWith("h")) return num * 3600;
        if (str.endsWith("d")) return num * 86400;
        return null;
    }

    // Tentukan target waktu heal
    let targetSeconds = totalTime;
    if (typeof targetDuration === "string") {
        const parsed = parseDuration(targetDuration);
        if (parsed !== null) targetSeconds = Math.min(parsed, totalTime);
    } else if (typeof targetDuration === "number") {
        targetSeconds = Math.min(targetDuration, totalTime);
    }

    console.log(`🎯 Target heal: ${targetSeconds}s`);

    // =====================================================
    //  FITUR 1 : Jika speedHeal dipilih → pakai itu saja
    // =====================================================
    if (speedHeal) {
        const speedup = getSpeedupInfo(SPEEDUP_TYPE.HEAL, speedHeal);

        if (!speedup) {
            console.log(`⚠ Speed heal '${speedHeal}' tidak dikenal`);
            return;
        }

        const stock = getItemStock(speedup.code);
        const need = Math.ceil(targetSeconds / speedup.seconds);

        if (stock < need) {
            console.log(
                `⚠ Stok speed heal '${speedHeal}' kurang! ` +
                `Punya ${stock}, butuh ${need}.`
            );
            return;
        }

        await useSpeedItem(speedup.code, need);

        console.log(
            `✔ Heal ${targetSeconds}s ` +
            `memakai ${speedHeal} ×${need}`
        );

        return;
    }

    // =====================================================
    //  FITUR 2 : AUTO CARI KOMBINASI TERBAIK
    // =====================================================

    // Ambil semua speed heal, urutkan dari durasi terbesar
    const speeds = Object.keys(SPEEDUP_DURATION)
        .map(d => getSpeedupInfo(SPEEDUP_TYPE.HEAL, d))
        .filter(Boolean)
        .sort((a, b) => b.seconds - a.seconds);

    let remaining = targetSeconds;
    const plan = [];

    for (const sp of speeds) {
        if (remaining <= 0) break;

        const stock = getItemStock(sp.code);
        if (stock <= 0) continue;

        const maxUse = Math.floor(remaining / sp.seconds);
        if (maxUse <= 0) continue;

        const use = Math.min(stock, maxUse);

        plan.push({
            code: sp.code,
            amount: use,
            seconds: sp.seconds,
            duration: sp.duration,
        });

        remaining -= use * sp.seconds;
    }

    if (plan.length === 0) {
        console.log("❌ Tidak ada kombinasi speed heal yang cukup.");
        return;
    }

    for (const p of plan) {
        try {
            await useSpeedItem(p.code, p.amount);
        } catch (err) {
            console.error("❌ Gagal memakai item:", p.code, err);
            break;
        }
    }

    await changeTreasure();

    const usedSeconds = targetSeconds - remaining;

    if (remaining > 0) {
        console.log("⚠ Heal belum sepenuhnya selesai");
    } else {
        console.log("✔ Heal selesai");
    }

    console.log("📦 Kombinasi item:");
    plan.forEach(p =>
        console.log(` - ${p.duration} ×${p.amount} (${p.seconds}s)`));

    console.log(`⏱ Total healed: ${usedSeconds}s`);


    // Helper → gunakan item
    async function useSpeedItem(code, amount) {
        if (!amount || amount <= 0) return;

        const itemPayload = { code, amount, isBuy: 0 };

        const res = await sendRequest({
            url: API_BASE_URL + "kingdom/heal/speedup",
            token,
            // body: b64xorEnc(itemPayload, xor_password),
            body: itemPayload
        });

        if (!res.result) {
            throw new Error(`Heal speedup gagal: ${res?.err?.code ?? "Unknown error"}`);
        }

        await sendRequest({
            url: API_BASE_URL + "auth/analytics",
            token,
            body: {
                url: "item/use",
                param: `${code}|${amount}`
            }
        });
    }

}

async function changeSkin(skinCode = SKIN_CODE_INCREASE_DROP_RATE) {
    if (!hasToken()) return;

    // Step 1: Ambil daftar skin
    const res = await sendRequest({
        url: API_BASE_URL + "kingdom/skin/list",
        token: token,
        body: { type: 0 }
    });

    if (!res.result) {
        console.log(`❌ Gagal mengambil daftar skin. code=${res?.err?.code ?? "UNKNOWN"}`);
        return;
    }

    // Cari skin ID berdasarkan skinCode yang diberikan
    let skin = res?.skins?.find(s => s.code === skinCode);
    // if (!skin) {
    //     console.warn(`❌ Skin dengan code ${skinCode} tidak ditemukan.`);
    //     return null;
    // }
    if (!skin) {
        // Jika skinCode = SKIN_CODE_REDUCE_AP dan tidak ditemukan, cek ulang pakai SKIN_CODE_REDUCE_AP_DROP_RATE
        if (skinCode === SKIN_CODE_REDUCE_AP) {
            const altSkin = res?.skins?.find(s => s.code === SKIN_CODE_REDUCE_AP_DROP_RATE);
            if (altSkin) {
                console.log(`🔁 Skin code ${skinCode} tidak ditemukan, pakai pengganti ${SKIN_CODE_REDUCE_AP_DROP_RATE}.`);
                skinCode = SKIN_CODE_REDUCE_AP_DROP_RATE; // replace nilai skinCode
                skin = altSkin;
            }
        }

        // Jika tetap tidak ada setelah pengecekan ulang
        if (!skin) {
            console.log(`❌ Skin dengan code ${skinCode} tidak ditemukan.`);
            return;
        }
    }

    // Delay sebelum mengganti skin
    await delay(1000);

    // Step 2: Equip skin
    const equipPayload = { itemId: skin._id };
    await sendRequest({
        url: API_BASE_URL + "kingdom/skin/equip",
        token: token,
        body: equipPayload
    });

    console.log(`✅ Skin dengan code ${skinCode} berhasil di-equip.`);
}

// page = 0 1 2 3
async function changeTreasure(page = 3) {
    if (!hasToken()) return;

    try {
        await getMyProfile();
        await delay(1000);

        const treasureList = await getTreasureList();
        if (!treasureList.result) {
            console.log(`❌ Gagal mengambil daftar treasure. code=${treasureList?.err?.code ?? "UNKNOWN"}`);
            return;
        }

        const currentPage = treasureList.page;
        console.log(`📦 Treasure saat ini di page ${currentPage + 1}`);

        if (currentPage === page) {
            console.log("🛑 Treasure sudah di page yang sama, tidak melakukan perubahan.");
            return;
        }

        await delay(1000);
        await setTreasurePage(currentPage);
        await delay(2000);
        await setTreasurePage(page);

        console.log(`✅ Treasure berhasil diubah ke page ${page + 1}`);
    } catch (error) {
        console.error("❌ Gagal mengganti treasure:", error);
    }
}

async function claimVIP() {
    if (!hasToken()) return false;

    const vipInfo = await getVipInfo();
    if (!vipInfo?.result) {
        console.log(`❌ Gagal mengambil VIP info. code=${vipInfo?.err?.code ?? "UNKNOWN"}`);
        return false;
    }

    if (vipInfo.vip?.isClaimed) {
        console.log("✅ VIP reward sudah diklaim.");
        return false;
    }

    const claimRes = await sendRequest({
        url: API_BASE_URL + "kingdom/vip/claim",
        token,
        body: {}
    });

    if (!claimRes?.result) {
        console.log(`❌ Gagal claim VIP. code=${claimRes?.err?.code ?? "UNKNOWN"}`);
        return false;
    }

    console.log("🎁 VIP reward berhasil di-claim.");
    return true;
}

async function claimDSAVIP() {
    if (!hasToken()) return false;

    const dsaVipInfo = await getDsavipInfo();
    if (!dsaVipInfo?.result) {
        console.log(`❌ Gagal mengambil DSA VIP info. code=${dsaVipInfo?.err?.code ?? "UNKNOWN"}`);
        return false;
    }
    if (dsaVipInfo.dsaVip?.isClaimed) {
        console.log("✅ DSA VIP reward sudah diklaim.");
        return;
    }

    const claimRes = await sendRequest({
        url: API_BASE_URL + "kingdom/dsavip/claim",
        token,
        body: {}
    });

    if (!claimRes?.result) {
        console.log(`❌ Gagal claim DSA VIP. code=${claimRes?.err?.code ?? "UNKNOWN"}`);
        return false;
    }

    console.log("🎁 DSA VIP reward berhasil di-claim.");
    return true;
}

async function claimQuestDaily() {
    if (!hasToken()) return;

    try {
        // Step 1: Ambil list quest awal
        let response = await getDailyQuest();
        if (!response?.result) {
            console.log(`❌ Gagal getDailyQuest. code=${response?.err?.code ?? "UNKNOWN"}`);
            return;
        }

        const quests = response.dailyQuest?.quests || [];

        // Step 2: Klaim semua quest dengan status ==2
        for (const quest of quests) {
            const { _id: questId, code, status } = quest;
            if (status === STATUS_FINISHED) {
                await sendRequest({
                    url: API_BASE_URL + "quest/claim/daily",
                    token,
                    body: { questId, code }
                });
                console.log(`✅ Claimed daily quest ${code}`);
                await delay(5000);
            }
        }

        // Step 3: Ambil ulang data untuk cek status reward level
        response = await getDailyQuest();
        if (!response?.result) {
            console.log(`❌ Gagal getDailyQuest ulang. code=${response?.err?.code ?? "UNKNOWN"}`);
            return;
        }

        const rewards = response.dailyQuest?.rewards || [];

        // Step 4: Klaim reward level dengan status == 2, 3->claimed
        for (const reward of rewards) {
            const { level, status } = reward;
            if (status === STATUS_FINISHED) {
                await sendRequest({
                    url: API_BASE_URL + "quest/claim/daily/level",
                    token,
                    body: { level }
                });
                console.log(`🎁 Claimed reward level ${level}`);
                await delay(5000);
            }
        }

    } catch (error) {
        console.error("❌ Gagal klaim daily quest atau reward:", error);
    }
}

async function claimQuestMain() {
    if (!hasToken()) return false;

    try {
        const response = await getQuestList();
        if (!response?.result) {
            console.log(`❌ Gagal getQuestList. code=${response?.err?.code ?? "UNKNOWN"}`);
            return false;
        }

        const quests = [
            ...(response.mainQuests || []),
            ...(response.sideQuests || [])
        ];

        // Ambil quest yang bisa diklaim
        const finishedQuests = quests.filter(
            q => q.status === STATUS_FINISHED
        );

        // ❌ Tidak ada quest selesai → berhenti
        if (finishedQuests.length === 0) {
            console.log("ℹ️ Tidak ada quest yang bisa diklaim");
            return false;
        }

        // Klaim satu per satu
        for (const { code } of finishedQuests) {
            await sendRequest({
                url: API_BASE_URL + "quest/claim",
                token,
                body: { code }
            });

            console.log(`✅ Claimed main quest ${code}`);
            await delay(5000);
        }

        // ✅ Masih ada klaim → lanjutkan loop
        return true;

    } catch (error) {
        console.error("❌ Gagal klaim main quest:", error);
        return false;
    }
}

async function claimQuestMainAll() {
    console.log("🚀 Mulai klaim main quest");

    while (true) {
        const hasClaimed = await claimQuestMain();

        if (!hasClaimed) {
            console.log("🛑 Semua main quest sudah diklaim");
            break;
        }

        // Delay antar refresh quest list
        await delay(3000);
    }
}

async function claimQuestEvent() {
    if (!hasToken()) return false;

    try {
        const eventList = await getEventList();
        if (!eventList?.result) {
            console.log(`❌ Gagal getEventList. code=${eventList?.err?.code ?? "UNKNOWN"}`);
            return false;
        }

        for (const event of eventList.events || []) {

            const eventInfo = await getEventInfo(event._id);
            if (!eventInfo?.result) {
                console.log(`⚠️ Gagal getEventInfo(${event._id}). code=${eventInfo?.err?.code ?? "UNKNOWN"}`);
                continue;
            }
            if (!eventInfo.eventKingdoms?.length) continue;

            for (const eventKingdom of eventInfo.eventKingdoms) {

                const rootEventId = eventKingdom.eventId;
                if (!rootEventId) continue;

                // const finishedQuests = (eventKingdom.events || []).filter(
                //     q => q.status === STATUS_FINISHED && q.todayClaimed === false
                // );
                const finishedQuests = (eventKingdom.events || []).filter(
                    q => q.status === STATUS_FINISHED
                );
                for (const { code, _id } of finishedQuests) {

                    const res = await sendRequest({
                        url: API_BASE_URL + "event/claim",
                        token,
                        body: { eventId: rootEventId, eventTargetId: _id, code }
                    });

                    if (!res?.result) {
                        console.log(`⚠️ Gagal klaim event quest ${code}. code=${res?.err?.code ?? "UNKNOWN"}`, res);
                    } else {
                        console.log(`✅ Claimed event quest ${code}`);
                    }


                    await delay(3000);
                }
            }
        }

        return true;

    } catch (err) {
        console.error("❌ Gagal klaim quest event:", err);
        return false;
    }
}

async function scheduleClaimQuestDaily() {
    const runAll = async () => {
        await claimQuestMain();
        await claimQuestDaily();
        await claimQuestEvent();
    };

    try {
        await runAll();

        setInterval(() => {
            runAll().catch(err =>
                console.error("❌ Gagal saat klaim ulang:", err)
            );
        }, 60 * 60 * 1000); // setiap 1 jam

    } catch (err) {
        console.error("❌ Gagal saat klaim pertama:", err);
    }
}


async function helpAll() {
    try {
        if (!hasToken()) return;

        await getMyAllianceInfo();

        const helpList = await getHelpList();
        if (!helpList?.result) {
            console.log(`❌ Gagal mengambil daftar bantuan alliance. code=${helpList?.err?.code ?? "UNKNOWN"}`);
            return;
        }

        if (!helpList.otherTasks || helpList.otherTasks.length === 0) {
            console.log("✅ Tidak ada bantuan yang perlu dilakukan.");
            return;
        }

        console.log(`🛠️ Menjalankan helpAll untuk ${helpList.otherTasks.length} task...`);

        await helpAllMembers();

        console.log("✅ Selesai membantu semua tugas.");

    } catch (err) {
        console.error("❌ Terjadi kesalahan di helpAll:", err);
    }
}

async function scheduleHelpAll() {
    try {

        await helpAll();

        // Jalankan helpAll setiap 30 menit
        setInterval(async () => {
            try {
                await helpAll();
            } catch (err) {
                console.error("❌ Gagal menjalankan helpAll dalam interval:", err);
            }
        }, 30 * 60 * 1000);

    } catch (error) {
        console.error("❌ Terjadi kesalahan di schedule Help All:", error);
    }
}

async function scheduleAutoDonate() {
    if (!hasToken()) return;

    while (true) {
        try {
            console.log("🔄 Mengecek status donasi...");

            // Trigger agar sistem memperbarui data alliance (kadang perlu)
            await getMyAllianceInfo();

            // Ambil status riset alliance
            const response = await getAllianceResearchList();
            if (!response?.result) {
                console.log(`⚠️ Gagal mengambil status riset alliance. code=${response?.err?.code ?? "UNKNOWN"}`);
                break;
            }


            if (response.todayRP >= 10000) {
                console.log("✅ Sudah mencapai batas harian RP: " + response.todayRP);
                break;
            }

            if (response.numDonation <= 0) {
                console.log("⚠️ Tidak ada sisa donasi.");
                await delay(3 * 60 * 60 * 1000);
                continue;
            }

            const researchCode = response.recommendResearch;
            console.log("📌 Mendonasikan ke riset code:", researchCode);

            // Info riset (kadang perlu sebelum donate)
            await getAllianceResearchInfo(researchCode);

            // Donasi ke riset
            const response_donate_all = await getAllianceResearchDonateAll(researchCode);
            if (!response_donate_all?.result) {
                console.log(`⚠️ Gagal melakukan donasi. code=${response_donate_all?.err?.code ?? "UNKNOWN"}`);
                await delay(3 * 60 * 60 * 1000);
                continue;
            }

            console.log("✅ Donasi berhasil dikirim!");
            // Tunggu 3 jam sebelum donasi berikutnya
            await delay(3 * 60 * 60 * 1000);

        } catch (err) {
            console.log("❌ Error saat proses donasi:", err);
            break;
        }
    }
}

async function resourceHarvest() {
    try {
        if (!hasToken()) return;

        const desiredCodes = [
            40100202,
            40100203,
            40100204,
            40100205
        ];

        const harvestedCodes = new Set();

        for (const building of kingdomData.buildings) {
            if (desiredCodes.includes(building.code) && !harvestedCodes.has(building.code)) {
                harvestedCodes.add(building.code);

                await delay(2000);
                await sendRequest({
                    url: API_BASE_URL + "kingdom/resource/harvest",
                    token,
                    // body: b64xorEnc({
                    //     position: building.position
                    // }, xor_password),
                    body: { position: building.position }
                });

                console.log(`✅ Memanen bangunan pertama dengan code ${building.code} di posisi ${building.position}`);
            }
        }
    } catch (err) {
        console.error("❌ Gagal menjalankan resourceHarvest:", err);
    }
}


async function scheduleResourceHarvest() {
    try {
        await resourceHarvest();

        setInterval(async () => {
            try {
                //console.log("⏰ Menjalankan ulang Resource Harvest setiap 1 jam...");
                await resourceHarvest();
            } catch (err) {
                console.error("❌ Error saat menjalankan ulang Resource Harvest:", err);
            }
        }, 1 * 60 * 60 * 1000); // 1 jam
    } catch (error) {
        console.error("❌ Error di Schedule Resource Harvest:", error);
    }
}

async function scheduleAutoOpenFreeChest() {
    if (!hasToken()) return;

    function getTodayKeyLocal() {
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }

    function getChestClaimStatus() {
        const today = getTodayKeyLocal();
        const raw = localStorage.getItem("lok_freechest_claim_daily");
        const data = raw ? JSON.parse(raw) : {};

        if (!data[today]) {
            data[today] = { gold: false, platinum: false };
        }

        return { today, data };
    }

    function setChestClaimedToday(typeKey) {
        const { today, data } = getChestClaimStatus();
        data[today][typeKey] = true;
        localStorage.setItem("lok_freechest_claim_daily", JSON.stringify(data));
    }

    // Ambil level Treasure House (untuk info log)
    const treasureHouse = kingdomData.buildings.find(b => b.position === 4);
    const treasureHouseLevel = treasureHouse?.level ?? 0;

    const dailyChestMap = {
        26: 10, 27: 10, 28: 10, 29: 10,
        30: 12, 31: 13, 32: 14, 33: 15,
        34: 16, 35: 20
    };
    const dailyFreeChestLimit = dailyChestMap[treasureHouseLevel] ?? 0;

    // const infoProfile = await getMyProfile();
    // if (!infoProfile) {
    //     console.log("❌ Gagal mengambil info profile untuk free chest.");
    //     return;
    // }
    // const currentSilver = infoProfile?.profile?.freeChest?.silver?.num ?? 0;

    // Silver progress
    let currentSilver = kingdomData.freeChest?.silver?.num ?? 0;

    // console.log(`📦 Treasure House L${treasureHouseLevel} | Silver: ${currentSilver}/${dailyFreeChestLimit}`);
    console.log(`📦 Silver Chest: ${currentSilver}/${dailyFreeChestLimit}`);

    if (currentSilver >= dailyFreeChestLimit) {
        console.log("🛑 Silver limit tercapai.");
        return;
    }

    console.log("🚀 Auto open Free Chest dimulai...");

    // reset tiap hari
    const { data, today } = getChestClaimStatus();

    const extraChests = [
        { type: CHEST_TYPE_GOLD, key: "gold", active: !data[today].gold },
        { type: CHEST_TYPE_PLATINUM, key: "platinum", active: !data[today].platinum }
    ];


    // MAIN LOOP (hanya berhenti karena silver)
    while (true) {
        try {

            // --------------------------------
            // SILVER — patokan utama
            // --------------------------------
            const resSilver = await claimChestFree(CHEST_TYPE_SILVER);

            if (!resSilver.result) {
                console.log(`🛑 Silver sudah tidak bisa dibuka lagi. code=${resSilver?.err?.code ?? "UNKNOWN"}`);
                break;
            }

            currentSilver = resSilver?.freechest?.silver?.num ?? (currentSilver + 1);
            console.log(`✨ Silver dibuka → ${currentSilver}/${dailyFreeChestLimit}`);

            if (currentSilver >= dailyFreeChestLimit) {
                console.log("🛑 Limit Silver tercapai. Stop loop.");
                break;
            }

            await delay(5 * 1000);

            // --------------------------------
            // GOLD & PLATINUM — ikut klaim
            // --------------------------------
            for (const chest of extraChests) {
                if (!chest.active) continue;

                const res = await claimChestFree(chest.type);

                if (!res?.result) {
                    console.log(`⚠️ ${chest.key} gagal/limit (code=${res?.err?.code ?? "UNKNOWN"}) -> nonaktif.`);
                    chest.active = false;
                } else {
                    console.log(`✨ ${chest.key} dibuka (1x harian).`);
                    setChestClaimedToday(chest.key); // tandai sudah claim hari ini
                    chest.active = false;            // stop claim lagi hari ini
                    await delay(5 * 1000);
                }
            }

            // (silver tetap lanjut walau gold/plat habis)

        } catch (err) {
            console.error("❌ Error membuka chest:", err);
            break;
        }
    }

    console.log("🎉 Auto Free Chest selesai.");
}


async function buyCaravan() {
    if (!hasToken()) return null;

    try {
        const caravanList = await getCaravanList();
        if (!caravanList?.result) {
            console.log(`❌ Gagal mengambil daftar caravan. code=${caravanList?.err?.code ?? "UNKNOWN"}`);
            return null;
        }

        // Semua item yang ingin dibeli
        const desiredCodes = [
            // VIP
            ITEM_CODE_VIP_10, ITEM_CODE_VIP_100, ITEM_CODE_VIP_500,
            ITEM_CODE_VIP_1000, ITEM_CODE_VIP_5000, ITEM_CODE_VIP_10000,

            // Food
            ITEM_CODE_FOOD_1K, ITEM_CODE_FOOD_5K, ITEM_CODE_FOOD_10K,
            ITEM_CODE_FOOD_50K, ITEM_CODE_FOOD_100K, ITEM_CODE_FOOD_500K,
            ITEM_CODE_FOOD_1M, ITEM_CODE_FOOD_5M, ITEM_CODE_FOOD_10M,

            // Lumber
            ITEM_CODE_LUMBER_1K, ITEM_CODE_LUMBER_5K, ITEM_CODE_LUMBER_10K,
            ITEM_CODE_LUMBER_50K, ITEM_CODE_LUMBER_100K, ITEM_CODE_LUMBER_500K,
            ITEM_CODE_LUMBER_1M, ITEM_CODE_LUMBER_5M, ITEM_CODE_LUMBER_10M,

            // Stone
            ITEM_CODE_STONE_1K, ITEM_CODE_STONE_5K, ITEM_CODE_STONE_10K,
            ITEM_CODE_STONE_50K, ITEM_CODE_STONE_100K, ITEM_CODE_STONE_500K,
            ITEM_CODE_STONE_1M, ITEM_CODE_STONE_5M, ITEM_CODE_STONE_10M,

            // Gold
            ITEM_CODE_GOLD_1K, ITEM_CODE_GOLD_5K, ITEM_CODE_GOLD_10K,
            ITEM_CODE_GOLD_50K, ITEM_CODE_GOLD_100K, ITEM_CODE_GOLD_500K,
            ITEM_CODE_GOLD_1M, ITEM_CODE_GOLD_5M, ITEM_CODE_GOLD_10M,

            // AP
            ITEM_CODE_ACTION_POINTS_10, ITEM_CODE_ACTION_POINTS_20,
            ITEM_CODE_ACTION_POINTS_50, ITEM_CODE_ACTION_POINTS_100,

            // Boosts
            ITEM_CODE_FOOD_BOOST_8H, ITEM_CODE_FOOD_BOOST_1D,
            ITEM_CODE_LUMBER_BOOST_8H, ITEM_CODE_LUMBER_BOOST_1D,
            ITEM_CODE_STONE_BOOST_8H, ITEM_CODE_STONE_BOOST_1D,
            ITEM_CODE_GOLD_BOOST_8H, ITEM_CODE_GOLD_BOOST_1D,
            ITEM_CODE_GATHERING_BOOST_8H, ITEM_CODE_GATHERING_BOOST_1D,

            // Speedups
            ITEM_CODE_SPEEDUP_1M, ITEM_CODE_SPEEDUP_5M, ITEM_CODE_SPEEDUP_10M, ITEM_CODE_SPEEDUP_30M,
            ITEM_CODE_SPEEDUP_1H, ITEM_CODE_SPEEDUP_3H, ITEM_CODE_SPEEDUP_8H,
            ITEM_CODE_SPEEDUP_1D, ITEM_CODE_SPEEDUP_3D, ITEM_CODE_SPEEDUP_7D
        ];

        // Kategori khusus jika pembelian menggunakan crystals
        const limitedCodes = [
            // VIP
            ITEM_CODE_VIP_10, ITEM_CODE_VIP_100, ITEM_CODE_VIP_500,
            ITEM_CODE_VIP_1000, ITEM_CODE_VIP_5000, ITEM_CODE_VIP_10000,

            // AP
            ITEM_CODE_ACTION_POINTS_10, ITEM_CODE_ACTION_POINTS_20,
            ITEM_CODE_ACTION_POINTS_50, ITEM_CODE_ACTION_POINTS_100,

            // Speedups
            ITEM_CODE_SPEEDUP_1M, ITEM_CODE_SPEEDUP_5M, ITEM_CODE_SPEEDUP_10M, ITEM_CODE_SPEEDUP_30M,
            ITEM_CODE_SPEEDUP_1H, ITEM_CODE_SPEEDUP_3H, ITEM_CODE_SPEEDUP_8H,
            ITEM_CODE_SPEEDUP_1D, ITEM_CODE_SPEEDUP_3D, ITEM_CODE_SPEEDUP_7D
        ];


        const availableItems = (caravanList?.caravan?.items || []).filter(item => {
            if (item.amount <= 0) return false;

            // Jika memakai item currency 10100005 → hanya beli item VIP, AP, Speedups
            if (item.costItemCode === ITEM_CODE_CRYSTAL) {
                return limitedCodes.includes(item.code);
            }

            // Selain itu → pakai desiredCodes penuh
            return desiredCodes.includes(item.code);
        });

        for (const item of availableItems) {
            // console.log(
            //     `🛒 Membeli item: ${getItemName(item.code)} ` +
            //     `(cost=${getItemName(item.costItemCode)}, id=${item._id})`
            // );
            console.log(`🛒 Membeli item: ${getItemName(item.code)}`);

            await delay(1000);
            await sendRequest({
                url: API_BASE_URL + "kingdom/caravan/buy",
                token,
                body: { caravanItemId: item._id }
            });
        }

        console.log(`✅ Selesai membeli ${availableItems.length} item.`);

        return caravanList.caravan?.expired ?? null;

    } catch (err) {
        console.error("❌ Gagal membeli caravan:", err);
        return null;
    }
}

async function scheduleBuyCaravan() {
    while (true) {
        const expired = await buyCaravan();

        let delayMs;

        if (expired) {
            const nextTime = new Date(expired).getTime() + 10 * 60 * 1000;
            const now = Date.now();
            delayMs = Math.max(nextTime - now, 60 * 1000);

            const delayMinutes = Math.round(delayMs / 60000);
            const hours = Math.floor(delayMinutes / 60);
            const minutes = delayMinutes % 60;
            const readableTime = `${hours > 0 ? `${hours} jam ` : ''}${minutes} menit`;

            console.log(`🕒 Menunggu ${readableTime} sebelum pembelian berikutnya...`);
        } else {
            delayMs = 10 * 60 * 1000;
            console.log(`⚠️ Tidak dapat mengambil expired time. Menunggu default 10 menit.`);
        }

        await delay(delayMs);
    }
}


//0 is 5 minutes
//1 is 10 minutes
//2 is 30 minutes
async function startTower(level) {
    if (!hasToken()) return;

    try {
        await sendRequest({
            url: API_BASE_URL + "kingdom/watchtower/search",
            token,
            body: { searchType: 0, level }
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


async function instantHarvest() {
    try {
        if (!hasToken()) return;

        await useItem(ITEM_CODE_FOOD_BOOST_8H, 1); await delay(1000);
        await useItem(ITEM_CODE_LUMBER_BOOST_8H, 1); await delay(1000);
        await useItem(ITEM_CODE_STONE_BOOST_8H, 1); await delay(1000);
        await useItem(ITEM_CODE_GOLD_BOOST_8H, 1); await delay(1000);
        await useItem(ITEM_CODE_GATHERING_BOOST_8H, 1); await delay(1000);

        await changeTreasure(2); // Aktifkan treasure produksi
        //await delay(1000);

        await changeSkin(SKIN_CODE_COOLDOWN_REDUCTION); // Aktifkan skin produksi
        await delay(1000);

        // Gunakan skill 10018 (increase production)
        await sendRequest({
            url: API_BASE_URL + "skill/use",
            token,
            body: { code: 10018 }
        });
        //await delay(1000);

        // Gunakan skill 10001 (instant harvest)
        await sendRequest({
            url: API_BASE_URL + "skill/use",
            token,
            body: { code: 10001 }
        });
        await delay(1000);

        //await changeSkin(); // Kembali ke skin normal
        //await delay(1000);

        await changeTreasure(); // Kembali ke treasure rally/monster
        //await delay(1000);

        console.log("✅ Instant Harvest selesai");
    } catch (err) {
        console.error("❌ Gagal saat proses instant harvest:", err);
    }
}

async function scheduleInstantHarvest() {
    try {
        const res = await getSkillList();
        if (!res?.result) {
            console.log(`❌ Gagal mengambil daftar skill untuk Instant Harvest. code=${res?.err?.code ?? "UNKNOWN"}`);
            return;
        }

        const skills = res.skills || [];

        const skill = skills.find(s => s.code === 10001);
        if (!skill) {
            console.log("⚠️ Skill 10001 tidak ditemukan.");
            return;
        }

        const waitMs = Math.max(
            new Date(skill.nextSkillTime).getTime() + 1 * 60 * 1000 - Date.now(),
            0
        );

        const totalSeconds = Math.floor(waitMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        console.log(`🕒 Menunggu ${hours} jam ${minutes} menit ${seconds} detik untuk Instant Harvest`);

        setTimeout(async () => {

            // ==============================
            // 🔻 Auto-disable AutoJoin
            // ==============================
            const prevAutoJoin = getAutoJoinStatus();  // simpan status sebelumnya
            localStorage.setItem('autojoin_enabled', 'false');
            updateAutoJoinButton();
            console.log("⛔ AutoJoin disabled sementara untuk InstantHarvest");

            // ==============================
            // Jalankan Instant Harvest
            // ==============================
            await delay(1 * 60 * 1000); // delay tambahan sebelum eksekusi
            await instantHarvest();

            // ==============================
            // 🔺 Aktifkan kembali AutoJoin jika sebelumnya ON
            // ==============================
            if (prevAutoJoin) {
                localStorage.setItem('autojoin_enabled', 'true');
                updateAutoJoinButton();
                console.log("▶️ AutoJoin diaktifkan kembali setelah InstantHarvest");
            } else {
                console.log("⛔ AutoJoin tetap OFF (karena sebelumnya OFF)");
            }

            scheduleInstantHarvest(); // 🔁 Loop
        }, waitMs);

    } catch (error) {
        console.error("❌ Error saat scheduling:", error);
        setTimeout(scheduleInstantHarvest, 1 * 60 * 1000); // Retry in 3 minutes
    }
}


async function summonMonster() {
    try {
        if (!hasToken()) return;

        console.log("🧙‍♂️ Memulai proses Summon Monster...");

        await changeSkin(SKIN_CODE_COOLDOWN_REDUCTION); // Aktifkan skin produksi       
        await delay(1000);

        await sendRequest({
            url: API_BASE_URL + "skill/use",
            token,
            body: { code: 10023 }
        });
        //await delay(2000);

        await changeSkin(); // Kembali ke skin default atau sebelumnya
        //await delay(2000);

        console.log("✅ Aktif skill Summon Monster selesai.");
    } catch (err) {
        console.error("❌ Gagal saat proses summon monster:", err);
    }
}

async function scheduleSummonMonster() {
    try {
        const res = await getSkillList();
        if (!res?.result) {
            console.log(`❌ Gagal mengambil daftar skill untuk Summon Monster. code=${res?.err?.code ?? "UNKNOWN"}`);
            return;
        }

        const skills = res.skills || [];

        const skill = skills.find(s => s.code === 10023);
        if (!skill) {
            console.log("⚠️ Skill summon monster tidak ditemukan.");
            return;
        }

        const nextSkillTimestamp = new Date(skill.nextSkillTime).getTime();
        const now = Date.now();
        if (!nextSkillTimestamp || isNaN(nextSkillTimestamp)) {
            console.log("⚠️ Tidak bisa membaca waktu cooldown skill.");
            return;
        }

        const waitMs = Math.max(nextSkillTimestamp + 3 * 60 * 1000 - now, 0);
        const totalSeconds = Math.floor(waitMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        console.log(`🕒 Menunggu ${hours} jam ${minutes} menit ${seconds} detik untuk Summon Monster`);

        setTimeout(async () => {
            await summonMonster();
            scheduleSummonMonster(); // 🔁 Loop
        }, waitMs);
    } catch (error) {
        console.error("❌ Error saat scheduling:", error);
        setTimeout(scheduleSummonMonster, 3 * 60 * 1000); // Retry in 3 minutes
    }
}

// 10001 instant harvest
// 10023 summon monster
async function scheduleSkillActivate(codes = [10001]) {
    try {
        const res = await getSkillList();
        if (!res?.result) {
            console.log(`❌ Gagal mengambil daftar skill untuk skill aktif. code=${res?.err?.code ?? "UNKNOWN"}`);
            return;
        }

        const skills = res.skills || [];

        if (!Array.isArray(codes)) codes = [codes];

        // Ambil skill yang sesuai dari daftar
        const targetSkills = skills.filter(skill => codes.includes(skill.code));

        if (targetSkills.length === 0) {
            console.log("⚠️ Tidak ada skill yang ditemukan dari kode:", codes);
            return;
        }

        // Hitung waktu tunggu untuk setiap skill
        const now = Date.now();
        const skillTimers = targetSkills.map(skill => {
            const nextSkillTime = new Date(skill.nextSkillTime).getTime();
            const waitMs = Math.max(nextSkillTime + 1 * 60 * 1000 - now, 0);
            return { code: skill.code, waitMs };
        });

        // Ambil skill dengan waktu tunggu paling kecil
        const nextSkill = skillTimers.reduce((min, curr) => curr.waitMs < min.waitMs ? curr : min);

        const totalSeconds = Math.floor(nextSkill.waitMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        console.log(`🕒 Menunggu ${hours} jam ${minutes} menit ${seconds} detik untuk skill ${nextSkill.code}`);

        // Set timer untuk skill tersebut
        setTimeout(async () => {
            try {
                if (nextSkill.code === 10001) {
                    // ==============================
                    // 🔻 Auto-disable AutoJoin
                    // ==============================
                    const prevAutoJoin = getAutoJoinStatus();  // simpan status sebelumnya
                    localStorage.setItem('autojoin_enabled', 'false');
                    updateAutoJoinButton();
                    console.log("⛔ AutoJoin disabled sementara untuk InstantHarvest");

                    // ==============================
                    // Jalankan Instant Harvest
                    // ==============================
                    await delay(1 * 60 * 1000); // delay tambahan sebelum eksekusi
                    await instantHarvest();

                    // ==============================
                    // 🔺 Aktifkan kembali AutoJoin jika sebelumnya ON
                    // ==============================
                    if (prevAutoJoin) {
                        localStorage.setItem('autojoin_enabled', 'true');
                        updateAutoJoinButton();
                        console.log("▶️ AutoJoin diaktifkan kembali setelah InstantHarvest");
                    } else {
                        console.log("⛔ AutoJoin tetap OFF (karena sebelumnya OFF)");
                    }
                } else if (nextSkill.code === 10023) {
                    await summonMonster();
                } else {
                    console.log(`⚠️ Tidak ada handler untuk skill ${nextSkill.code}`);
                }
            } catch (err) {
                console.error(`❌ Gagal mengeksekusi skill ${nextSkill.code}:`, err);
            }

            // Jalankan ulang untuk mencari skill selanjutnya
            scheduleSkillActivate(codes);
        }, nextSkill.waitMs);

    } catch (error) {
        console.error("❌ Error saat scheduling skill:", error);
        setTimeout(() => scheduleSkillActivate(codes), 3 * 60 * 1000); // Retry 3 menit
    }
}


async function getSortedUniqueBookmarks(bookmarks = bookmarkResults) {
    if (!kingdomData?.loc || kingdomData.loc.length !== 3) {
        console.log("❗ Lokasi kingdom tidak valid.");
        return [];
    }

    const distance = (loc1, loc2) => {
        const dx = loc1[1] - loc2[1];
        const dy = loc1[2] - loc2[2];
        return Math.sqrt(dx * dx + dy * dy);
    };

    const sorted = [...bookmarks].sort((a, b) => {
        const nameComp = a.name.localeCompare(b.name);
        if (nameComp !== 0) return nameComp;
        if (a.level !== b.level) return b.level - a.level;

        const distA = distance(kingdomData.loc, a.loc);
        const distB = distance(kingdomData.loc, b.loc);
        return distA - distB;
    });

    const seen = new Set();
    const unique = sorted.filter(item => {
        const key = item.loc.join(",");
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    return unique;
}
async function getSortedUniqueBookmarksRSS(bookmarks = bookmarkResults) {
    if (!kingdomData?.loc || kingdomData.loc.length !== 3) {
        console.log("❗ Lokasi kingdom tidak valid.");
        return [];
    }

    const distance = (loc1, loc2) => {
        const dx = loc1[1] - loc2[1];
        const dy = loc1[2] - loc2[2];
        return Math.sqrt(dx * dx + dy * dy);
    };

    // 1️⃣ Urutkan berdasarkan level (desc), jarak (asc)
    // const sorted = [...bookmarks].sort((a, b) => {
    //     if (a.level !== b.level) return b.level - a.level;
    //     const distA = distance(kingdomData.loc, a.loc);
    //     const distB = distance(kingdomData.loc, b.loc);
    //     return distA - distB;
    // });
    // 1️⃣ Urutkan berdasarkan jarak (asc)
    const sorted = [...bookmarks].sort((a, b) => {
        const distA = distance(kingdomData.loc, a.loc);
        const distB = distance(kingdomData.loc, b.loc);
        return distA - distB; // paling dekat dulu
    });


    // 2️⃣ Hapus duplikat lokasi
    const seen = new Set();
    const unique = sorted.filter(item => {
        const key = item.loc.join(",");
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    // 3️⃣ Distribusi deterministik agar tiap 4 item berturut-turut beda nama
    const grouped = {};
    for (const item of unique) {
        if (!grouped[item.name]) grouped[item.name] = [];
        grouped[item.name].push(item);
    }

    const nameKeys = Object.keys(grouped);
    const result = [];

    // Round-robin deterministik (berdasarkan urutan namaKeys)
    let hasItem = true;
    while (hasItem) {
        hasItem = false;
        for (const name of nameKeys) {
            const item = grouped[name].shift();
            if (item) {
                result.push(item);
                hasItem = true;
            }
        }
    }

    // 4️⃣ Jika jumlah nama unik < 4, pastikan tidak ada duplikat berurutan
    for (let i = 1; i < result.length; i++) {
        if (result[i].name === result[i - 1].name) {
            // cari item berikutnya dengan nama berbeda dan tukar
            for (let j = i + 1; j < result.length; j++) {
                if (result[j].name !== result[i].name) {
                    const temp = result[i];
                    result[i] = result[j];
                    result[j] = temp;
                    break;
                }
            }
        }
    }

    return result;
}
async function bookmarkFromFieldData(allowedBookmark, fieldData) {
    const existingLocs = new Set(bookmarkResults.map(b => b.loc.join(",")));
    let index = bookmarkResults.length + 1;

    for (const obj of fieldData.objects) {
        if (obj.occupied) continue;

        const codeStr = String(obj.code);
        const bookmarkData = allowedBookmark[codeStr];

        if (
            bookmarkData &&
            obj.level >= bookmarkData.minLevel &&
            (bookmarkData.maxLevel === undefined || obj.level <= bookmarkData.maxLevel)
        ) {
            const locKey = obj.loc.join(",");
            if (existingLocs.has(locKey)) {
                if (bookmarkData.display !== false) {
                    console.log(`⚠️ Already bookmarked: ${bookmarkData.name} Lv.${obj.level} at ${locKey}`);
                }
                continue;
            }

            existingLocs.add(locKey);

            const result = {
                name: bookmarkData.name,
                level: obj.level,
                loc: obj.loc
            };
            bookmarkResults.push(result);

            // default display = true jika tidak didefinisikan
            const shouldDisplay = bookmarkData.display !== false;
            if (shouldDisplay) {
                const coords = obj.loc.slice(1, 3)
                    .map(n => String(n).padStart(4, ' '))
                    .join(",");
                const color = bookmarkData.color || "orange";
                console.log(
                    `%c📍 ${String(index++).padStart(2)}. [${coords}] ${bookmarkData.name} Lv.${obj.level}`,
                    `color: ${color}; font-weight: bold;`
                );
            } else {
                index++;
            }
        }
    }
}

//async function BookmarkSave() {
async function save() {
    // Filter bookmark berdasarkan kategori
    const bookmarkRSS = bookmarkResults.filter(item =>
        ["rss"].some(kw => item.name.toLowerCase().includes(kw.toLowerCase()))
    );
    const bookmarkCM = bookmarkResults.filter(item =>
        ["crystal"].some(kw => item.name.toLowerCase().includes(kw.toLowerCase()))
    );
    const bookmarkDSC = bookmarkResults.filter(item =>
        ["cavern"].some(kw => item.name.toLowerCase().includes(kw.toLowerCase()))
    );
    const bookmarkMonsterNormal = bookmarkResults.filter(item =>
        ["goblin"].some(kw => item.name.toLowerCase().includes(kw.toLowerCase()))
    );

    const bookmarkMonsterRally = bookmarkResults.filter(item =>
        !["crystal", "cavern", "rss", "goblin"].some(kw => item.name.toLowerCase().includes(kw.toLowerCase()))
        //["DeathKar", "Dragon", "Panta","Gargantua","Magdar","Spartoi"].some(kw => item.name.toLowerCase().includes(kw.toLowerCase()))
        // !["crystal", "cavern", "rss", "goblin"].some(kw => item.name.toLowerCase().includes(kw))
    );

    // Kosongkan array utama setelah dipisah
    bookmarkResults = [];

    // Simpan ke localStorage (synchronous, tapi tetap bisa dibungkus async)
    localStorage.setItem('bookmarkRSS_bk', JSON.stringify(bookmarkRSS));
    localStorage.setItem('bookmarkCM_bk', JSON.stringify(bookmarkCM));
    localStorage.setItem('bookmarkDSC_bk', JSON.stringify(bookmarkDSC));
    localStorage.setItem('bookmarkMonsterNormal_bk', JSON.stringify(bookmarkMonsterNormal));
    localStorage.setItem('bookmarkMonsterRally_bk', JSON.stringify(bookmarkMonsterRally));
}
function load() {
    bookmarkResults = JSON.parse(localStorage.getItem('bookmarkMonsterRally_bk')) || [];
}

async function sendMarch(loc, marchType, troopIndex, dragoId) {
    try {
        const marchTypeName = getMarchTypeName(marchType);

        // Cek queue
        const marchQueueUsed = await getMarchQueueUsed();
        if (marchQueueUsed >= marchLimit) {
            return { success: false, errCode: ERROR_CODE_FULL_TASK };
        }

        // Ambil march info
        const marchInfo = await getMarchInfo(loc);
        if (!marchInfo?.result) {
            return {
                success: false,
                errCode: marchInfo?.err?.code || ERROR_CODE_NO_FIELD_OBJECT
            };
        }

        if (marchInfo?.fo?.occupied === true) {
            return { success: false, errCode: ERROR_CODE_OCCUPIED };
        }

        const troops = marchInfo?.saveTroops?.[troopIndex];
        if (!Array.isArray(troops) || troops.length === 0) {
            return { success: false, errCode: "troop_not_found" };
        }

        const canSendMarch = troops.every(saveTroop => {
            const troopInMarch = marchInfo?.troops?.find(t => t.code === saveTroop.code);
            return troopInMarch && saveTroop.amount <= troopInMarch.amount;
        });

        if (!canSendMarch) {
            return { success: false, errCode: "troop_not_enough" };
        }

        const marchStartResponse = await sendRequest({
            url: API_BASE_URL + "field/march/start",
            token,
            body: payloadSendmarch(troops, loc, marchType, dragoId)
        });

        if (!marchStartResponse?.result) {
            return {
                success: false,
                errCode: marchStartResponse?.err?.code || ERROR_CODE_UNKNOWN
            };
        }

        console.log(`✅ March dikirim: ${marchTypeName} ke (${loc[0]}, ${loc[1]})`);
        return { success: true, errCode: null };
    } catch (err) {
        console.error("❌ Error saat proses sendMarch:", err);
        return { success: false, errCode: "exception" };
    }
}

async function cm(x, y) {
    await changeTreasure(3);
    await sendMarch([x, y], MARCH_TYPE_GATHER, 3);
}
async function ce(x, y) {
    await sendMarch([x, y], MARCH_TYPE_CASTLE, 3);
}
async function rss(minLevel, maxLevel) {
    await updateKingdomLoc();
    const bookmarkRSSRaw = localStorage.getItem('bookmarkRSS_bk');
    let bookmarkRSS = [];

    try {
        bookmarkRSS = JSON.parse(bookmarkRSSRaw) || [];
    } catch (e) {
        console.error("❌ Gagal parse bookmarkRSS_bk dari localStorage:", e);
        return;
    }

    let filtered = bookmarkRSS;

    if (minLevel === undefined && maxLevel === undefined) {
        // Tidak ada argumen → semua level
        console.log("🔍 Gathering RSS untuk semua level");
    } else if (maxLevel === undefined) {
        // Hanya minLevel → level >= minLevel
        filtered = bookmarkRSS.filter(item => item.level >= minLevel);
        console.log(`🔍 Gathering RSS untuk level >= ${minLevel}`);
    } else {
        // minLevel dan maxLevel keduanya ada → filter di antara
        filtered = bookmarkRSS.filter(item =>
            item.level >= minLevel && item.level <= maxLevel
        );
        console.log(`🔍 Gathering RSS untuk level ${minLevel} - ${maxLevel}`);
    }

    if (filtered.length === 0) {
        console.log("⚠️ Tidak ada RSS yang cocok dengan filter.");
        return;
    }

    await startGatheringRSSFromBookmarks(filtered);
}
// async function SendSupport(x, y) {
async function support(x, y) {
    let dragoId = null;  // deklarasi di awal supaya bisa diakses di luar try-catch

    try {
        const dragoList = await getDragoLairList();
        if (!dragoList?.result) {
            console.error(`Gagal mendapatkan daftar drago. code=${dragoList?.err?.code ?? "UNKNOWN"}`);
            return;
        }

        const drago = dragoList.dragos
            .filter(drago => drago.lair?.status === DRAGO_LAIR_STATUS_STANDBY)
            .sort((a, b) => b.level - a.level)[0];  // Ambil yang level tertinggi

        dragoId = drago?._id || null;

        console.log("Drago ID terpilih:", dragoId);

    } catch (err) {
        console.log("Gagal mengambil daftar drago:", err);
    }

    if (dragoId) {
        const result = await sendMarch([x, y], MARCH_TYPE_SUPPORT, 3, dragoId);
        if (!result.success) {
            console.log(`❌ Gagal kirim march ke (${x}, ${y})`);
        }
    } else {
        const result = await sendMarch([x, y], MARCH_TYPE_SUPPORT, 3);
        if (!result.success) {
            console.log(`❌ Gagal kirim march ke (${x}, ${y})`);
        }
    }
}
//async function SendGatherDSC(x, y) {
async function dsc(x, y) {
    let dragoId = null;  // deklarasi di awal supaya bisa diakses di luar try-catch

    try {
        const dragoList = await getDragoLairList();
        if (!dragoList?.result) {
            console.error(`Gagal mendapatkan daftar drago. code=${dragoList?.err?.code ?? "UNKNOWN"}`);
            return;
        }

        // const drago = dragoList.dragos
        //     .filter(drago => drago.lair?.status === 1 && drago.level < 30)
        //     .sort((a, b) => b.level - a.level)[0];  // Ambil yang level tertinggi

        // Ambil drago pertama dengan status 1
        const drago = dragoList.dragos.find(d => d.lair?.status === DRAGO_LAIR_STATUS_STANDBY);

        dragoId = drago?._id || null;

        //console.log("Drago ID terpilih (lair.status === 1 dan level < 30):", dragoId);

    } catch (err) {
        console.error("Gagal mengambil daftar drago:", err);
    }

    if (dragoId) {
        await changeTreasure(3);

        const result = await sendMarch([x, y], MARCH_TYPE_GATHER, 3, dragoId);

        if (!result.success) {
            console.log(`❌ Gagal kirim march ke (${x}, ${y})`);
        }

    } else {
        console.log("Tidak ada Drago yang tersedia untuk dikirim.");
    }
}
async function dscAuto(level = 2) {
    if (!hasToken()) return;

    await updateKingdomLoc();

    const parsedLevel = Number(level);
    if (!Number.isFinite(parsedLevel) || parsedLevel <= 0) {
        console.log("⚠️ Level DSC tidak valid. Contoh: dscAuto(6)");
        return;
    }

    const raw = localStorage.getItem('bookmarkDSC_bk');
    let bookmarkDSC = [];

    try {
        bookmarkDSC = JSON.parse(raw) || [];
    } catch (e) {
        console.error("❌ Gagal parse bookmarkDSC_bk dari localStorage:", e);
        return;
    }

    if (!Array.isArray(bookmarkDSC) || bookmarkDSC.length === 0) {
        console.log("⚠️ bookmarkDSC_bk kosong.");
        return;
    }

    if (!kingdomData?.loc || kingdomData.loc.length < 3) {
        console.log("⚠️ Lokasi castle (kingdomData.loc) tidak valid.");
        return;
    }

    const distance = (loc1, loc2) => {
        const dx = (loc1[1] ?? 0) - (loc2[1] ?? 0);
        const dy = (loc1[2] ?? 0) - (loc2[2] ?? 0);
        return Math.sqrt(dx * dx + dy * dy);
    };

    const filtered = bookmarkDSC
        .filter(b => b?.level === parsedLevel && Array.isArray(b.loc) && b.loc.length >= 3)
        .sort((a, b) => distance(kingdomData.loc, a.loc) - distance(kingdomData.loc, b.loc));

    if (filtered.length === 0) {
        console.log(`⚠️ Tidak ada bookmark DSC level ${parsedLevel}.`);
        return;
    }

    const infoProfile = await getMyProfile();
    if (!infoProfile?.result) {
        console.log(`⚠️ Gagal mengambil profile untuk drago AP. code=${infoProfile?.err?.code ?? "UNKNOWN"}`);
        return;
    }

    const dragoAP = Number(infoProfile?.profile?.dragoActionPoint?.value ?? 0);


    if (!Number.isFinite(dragoAP) || dragoAP <= 0) {
        console.log("🛑 Drago Action Point habis.");
        return;
    }

    const maxLoop = Math.min(dragoAP, filtered.length);
    console.log(`🐉 DSC Lv.${parsedLevel} | Target: ${filtered.length} | Drago AP: ${dragoAP} | Eksekusi: ${maxLoop}`);

    for (let i = 0; i < maxLoop; i++) {
        const b = filtered[i];
        const [, x, y] = b.loc;
        const dist = Math.round(distance(kingdomData.loc, b.loc));

        console.log(`📍 [${i + 1}/${maxLoop}] DSC Lv.${parsedLevel} @ (${x}, ${y}) | Jarak ${dist}`);
        await dsc(x, y);
        await delay(1000);
    }

    console.log("✅ dscAuto selesai.");
}
async function startGatheringRSSFromBookmarks(bookmarks) {
    // Fungsi untuk menghitung jarak antar lokasi
    const distance = (loc1, loc2) => {
        if (!Array.isArray(loc1) || !Array.isArray(loc2)) return 0;
        const dx = (loc1[1] ?? 0) - (loc2[1] ?? 0);
        const dy = (loc1[2] ?? 0) - (loc2[2] ?? 0);
        return Math.sqrt(dx * dx + dy * dy);
    };

    // Pastikan hasil sudah unik dan tersortir
    const res = await getSortedUniqueBookmarksRSS(bookmarks) || [];

    if (!Array.isArray(res) || res.length === 0) {
        console.log("⚠️ Tidak ada RSS.");
        return;
    }

    // const limit = Math.min(marchLimit, res.length);
    // const finalResults = res.slice(0, limit);
    const finalResults = res;

    // Pastikan treasure diaktifkan hanya sekali
    await changeTreasure(2);

    // Loop untuk mengirim march
    for (let i = 0; i < finalResults.length; i++) {
        const marchQueueUsed = await getMarchQueueUsed();
        if (marchQueueUsed >= marchLimit) {
            console.log("🚫 March queue penuh, berhenti gather.");
            break;
        }

        const b = finalResults[i];
        if (!b?.loc || b.loc.length < 3) {
            console.log("⚠️ Bookmark tidak valid:", b);
            continue;
        }

        const [, x, y] = b.loc;
        const levelText = b.level ? `Lv.${b.level}` : "";
        const dist = Math.round(distance(kingdomData.loc, b.loc));

        const result = await sendMarch([x, y], MARCH_TYPE_GATHER, 1); // marchType 1 = gathering, preset index 1

        console.log("Result dari sendMarch:", result);

        if (!result.success) {
            console.log(`❌ Gagal kirim march ke (${x}, ${y})`);

            if (result.errCode === ERROR_CODE_FULL_TASK) {
                console.log("⛔ Task penuh, stop loop");
                break; // atau return;
            }

            if (result.errCode === ERROR_CODE_UNKNOWN) {
                console.log("⛔ Error tidak diketahui, stop loop");
                break; // atau return;
            }

            continue;
        }

        console.log(`🏕️ Gathering ${b.name}${levelText} di (${x}, ${y}) — jarak ${dist}`);

        // Delay antar pengiriman untuk menghindari spam request
        await delay(3000);
    }

    console.log("✅ Proses gather RSS selesai.");
}
async function startAttackMonsterFromBookmarks(bookmarks = bookmarkMonsterNormal) {
    const distance = (loc1, loc2) => {
        const dx = loc1[1] - loc2[1];
        const dy = loc1[2] - loc2[2];
        return Math.sqrt(dx * dx + dy * dy);
    };

    const finalResults = await getSortedUniqueBookmarks(bookmarks);

    if (finalResults.length === 0) {
        console.log("⚠️ Tidak ada monster yang bisa diserang.");
        return;
    }

    let rallyCount = 1;
    let i = 0;
    let isSkinMonsterApplied = false;

    checkAndResetRallyCount();

    while (i < finalResults.length) {
        let marchQueueUsed = await getMarchQueueUsed();

        if (marchQueueUsed >= marchLimit) {
            if (isSkinMonsterApplied) {
                await changeSkin();
                isSkinMonsterApplied = false;
            }

            console.log(`⏳ Queue penuh (${marchQueueUsed}/${marchLimit}), tunggu 15 detik...`);
            await delay(15000);
            continue;
        }

        if (!isSkinMonsterApplied) {
            await changeSkin(SKIN_CODE_REDUCE_AP);
            isSkinMonsterApplied = true;
            await delay(1000);
        }

        const b = finalResults[i];
        const [, x, y] = b.loc;
        const levelText = b.level ? ` Lv.${b.level}` : "";
        const dist = Math.round(distance(kingdomData.loc, b.loc));

        //console.log(`🎯[Attack Monster#${rallyCount} 📍 Sisa#${finalResults.length - i - 1}] ${b.name}${levelText} @ (${x}, ${y}) | 📏 Jarak: ${dist}`);
        console.log(`🎯[Attack Monster#${getRallyCount()} 📍 Sisa#${finalResults.length - i - 1}] ${b.name}${levelText} @ (${x}, ${y}) | 📏 Jarak: ${dist}`);

        const success = await attackMonster(x, y);
        if (success) {
            rallyCount++;
            incrementRallyCount();
        }

        i++;
        await delay(1000);
    }

    if (isSkinMonsterApplied) {
        await changeSkin(); // Kembali ke skin default di akhir
    }

    console.log("✅ Semua Monsters dari bookmark selesai.");
}

async function startRallyMonsterFromBookmarks(bookmarks = bookmarkMonsterRally) {
    const RALLY_TIME = 5;
    const TROOP_INDEX = 0;
    const MESSAGE = "";

    const MAX_RETRY_PER_TARGET = 3;
    const retryCountByLoc = new Map(); // key: "x,y"
    const RETRYABLE_CODES = new Set([
        ERROR_CODE_FULL_TASK,
        ERROR_CODE_TROOP_NOT_ENOUGH
    ]);

    const calcDistance = (loc1, loc2) => {
        const dx = loc1[1] - loc2[1];
        const dy = loc1[2] - loc2[2];
        return Math.sqrt(dx * dx + dy * dy);
    };

    const finalResults = await getSortedUniqueBookmarks(bookmarks);
    if (!finalResults.length) {
        console.log("⚠️ Tidak ada monster yang bisa dirally.");
        return;
    }

    let index = 0;
    let isSkinMonsterApplied = false;

    checkAndResetRallyCount();

    while (index < finalResults.length) {
        const marchQueueUsed = await getMarchQueueUsed();

        if (marchQueueUsed >= marchLimit) {
            if (isSkinMonsterApplied) {
                await changeSkin(); // kembali ke skin default
                isSkinMonsterApplied = false;
            }

            console.log(`⏳ Queue penuh (${marchQueueUsed}/${marchLimit}), tunggu 30 detik...`);
            await delay(30000);
            continue; // retry target yang sama
        }

        if (!isSkinMonsterApplied) {
            await changeSkin(SKIN_CODE_REDUCE_AP);
            isSkinMonsterApplied = true;
            await delay(2000);
        }

        const bookmark = finalResults[index];
        const [, x, y] = bookmark.loc;
        const levelText = bookmark.level ? ` Lv.${bookmark.level}` : "";
        const dist = Math.round(calcDistance(kingdomData.loc, bookmark.loc));

        const locKey = `${x},${y}`;

        const result = await rallyMonster([x, y], RALLY_TIME, TROOP_INDEX, MESSAGE);

        // retryable -> ulang target sama (tanpa index++)
        if (!result?.success && RETRYABLE_CODES.has(result?.errCode)) {
            const currentRetry = (retryCountByLoc.get(locKey) ?? 0) + 1;
            retryCountByLoc.set(locKey, currentRetry);

            if (currentRetry >= MAX_RETRY_PER_TARGET) {
                console.log(`❌ Retry ${currentRetry}x habis (${result.errCode}) @ (${x}, ${y}) -> skip`);
                retryCountByLoc.delete(locKey);
                index++; // skip target ini
                await delay(3000);
                continue;
            }

            console.log(`⏳ Retryable error (${result.errCode}) @ (${x}, ${y}) [${currentRetry}/${MAX_RETRY_PER_TARGET}]...`);
            await delay(20000);
            continue; // retry target yang sama (tanpa index++)
        }

        // non-retryable -> skip ke target berikutnya
        if (!result?.success) {
            console.log(`❌ Rally gagal @ (${x}, ${y}) code=${result?.errCode ?? "UNKNOWN"} -> skip`);
            retryCountByLoc.delete(locKey);
            index++;
            await delay(3000);
            continue;
        }

        // sukses
        retryCountByLoc.delete(locKey);
        incrementRallyCount();
        index++;

        console.log(
            `🎯 [Rally#${getRallyCount()} | Sisa ${finalResults.length - index}] ` +
            `${bookmark.name}${levelText} @ (${x}, ${y}) | 📏 ${dist}`
        );

        await delay(5000);
    }

    if (isSkinMonsterApplied) {
        await changeSkin();
    }

    console.log("✅ Semua rally dari bookmark selesai.");
}

async function rallyMonster(loc, rallyTime = 5, troopIndex = 0, message = "") {
    try {
        const marchQueueUsed = await getMarchQueueUsed();
        if (marchQueueUsed >= marchLimit) {
            return { success: false, errCode: ERROR_CODE_FULL_TASK };
        }

        const marchInfo = await getMarchInfo(loc);
        if (!marchInfo?.result) {
            return { success: false, errCode: marchInfo?.err?.code ?? ERROR_CODE_NO_FIELD_OBJECT };
        }

        if (marchInfo.marchType !== MARCH_TYPE_MONSTER) {
            const marchTypeName = getMarchTypeName(marchInfo.marchType);
            console.log(`⛔ MarchType bukan untuk rally/attack monster (${marchTypeName}).`);
            return { success: false, errCode: "INVALID_MARCH_TYPE" };
        }

        const troopsSelected = marchInfo?.saveTroops?.[troopIndex];
        if (!Array.isArray(troopsSelected) || troopsSelected.length === 0) {
            return { success: false, errCode: "TROOP_NOT_FOUND" };
        }

        const marchTroops = marchInfo?.troops || [];
        const canSendMarch = troopsSelected.every(preset => {
            const available = marchTroops.find(t => t.code === preset.code);
            return available && preset.amount <= available.amount;
        });

        if (!canSendMarch) {
            return { success: false, errCode: ERROR_CODE_TROOP_NOT_ENOUGH };
        }

        const toLoc = [kingdomData.loc[0], ...loc];
        const payload = {
            marchType: marchInfo.marchType,
            toLoc,
            marchTroops: troopsSelected,
            rallyTime,
            message
        };

        await useActionPoint();
        await delay(1000);
        
        const response = await sendRequest({
            url: API_BASE_URL + "field/rally/start",
            token,
            //body: b64xorEnc(payload, xor_password),
            body: payload
        });

        if (!response?.result) {
            return { success: false, errCode: response?.err?.code ?? ERROR_CODE_UNKNOWN };
        }

        return { success: true, errCode: null };
    } catch (err) {
        console.error("❌ Gagal set rally:", err);
        return { success: false, errCode: "EXCEPTION" };
    }
}

// ada kekurangan bila error fulltask dari sendMarch tidak ditangani
async function attackMonster(x, y) {

    const loc = [x, y];
    const marchInfo = await getMarchInfo(loc);
    if (!marchInfo?.result) {
        console.log(`❌ getMarchInfo gagal. code=${marchInfo?.err?.code ?? ERROR_CODE_NO_FIELD_OBJECT}`);
        return false;
    }
    // console.log("✅ March info:", marchInfo);

    if (marchInfo.marchType !== MARCH_TYPE_MONSTER) {
        const marchTypeName = getMarchTypeName(marchInfo.marchType);
        console.log(`⛔ MarchType bukan untuk rally/attack monster (marchType = ${marchTypeName}).`);
        return false;
    }

    const monsterLevel = marchInfo?.fo?.level;
    if (monsterLevel === undefined) {
        console.log("⚠️ Level monster tidak ditemukan.");
        return false;
    }

    let selectedTroop;

    if (monsterLevel <= 6) {
        selectedTroop = 0;
    } else if (monsterLevel === 7) {
        selectedTroop = 1;
    } else if (monsterLevel >= 8) {
        selectedTroop = 2;
    } else {
        console.log("⚠️ Level monster di luar jangkauan.");
        return false;
    }

    try {
        await useActionPoint();
        await delay(1000);

        const result = await sendMarch([x, y], MARCH_TYPE_MONSTER, selectedTroop);

        if (!result.success) {
            console.log(`⚠️ March ditolak (bukan error) ke (${x}, ${y})`);
            return false;
        }

        return true;

    } catch (err) {
        console.error(`❌ Error saat proses march monster ke (${x}, ${y}):`, err);
        return false;
    }
}
async function goblin() {
    await updateKingdomLoc();
    let bookmarkMonsterNormal = JSON.parse(localStorage.getItem('bookmarkMonsterNormal_bk')) || [];
    await startAttackMonsterFromBookmarks(bookmarkMonsterNormal);
}
// dk();       // semua level
// dk(5);      // level >= 5
// dk(4, 6);   // level 4 sampai 6
async function dk(minLevel, maxLevel) {

    await updateKingdomLoc();

    // Ambil data dari localStorage
    let bookmarkMonsterRally = JSON.parse(localStorage.getItem('bookmarkMonsterRally_bk')) || [];

    let filtered = bookmarkMonsterRally;

    if (typeof minLevel === 'undefined') {
        // Tidak ada argumen → semua level
        console.log(`🔍 Menjalankan rally untuk semua level`);
    } else if (typeof maxLevel === 'undefined') {
        // Hanya minLevel → level >= minLevel
        filtered = bookmarkMonsterRally.filter(item => item.level >= minLevel);
        console.log(`🔍 Menjalankan rally untuk monster level >= ${minLevel}`);
    } else {
        // min dan max keduanya ada → filter di antara
        filtered = bookmarkMonsterRally.filter(item =>
            item.level >= minLevel && item.level <= maxLevel
        );
        console.log(`🔍 Menjalankan rally untuk monster level ${minLevel} - ${maxLevel}`);
    }

    // console.log(filtered);

    // Jalankan hanya monster yang sudah difilter
    await startRallyMonsterFromBookmarks(filtered);
}

async function exportCvCRankToCSV(eventId, filename = `CvC_Rank_${getTodayKey()}.csv`) {
    if (!hasToken()) return;

    const worldId = kingdomData.worldId;

    // Fetch list of CvC events
    const eventListCvC = await getEventListCvC();
    if (!eventListCvC?.result || !Array.isArray(eventListCvC.events)) {
        console.error(`❌ Gagal mengambil daftar event CvC. code=${eventListCvC?.err?.code ?? "UNKNOWN"}`);
        return;
    }

    // Jika eventId tidak diberikan, ambil default dari indeks ke-4
    if (!eventId) {
        eventId = eventListCvC.events?.[3]?._id;
        if (!eventId) {
            console.error("❌ eventId tidak tersedia.");
            return;
        }
    }

    // Fetch ranking data
    const data = await sendRequest({
        url: API_BASE_URL + "event/cvc/ranking/continent",
        token: token,
        body: { eventId, worldId }
    });

    if (!data.result) {
        console.error(`❌ Gagal mengambil data ranking CvC. code=${data?.err?.code ?? "UNKNOWN"}`);
        return;
    }

    if (!Array.isArray(data.ranking)) {
        console.error("❌ Format data ranking tidak valid", data);
        return;
    }

    // Generate CSV
    const header = ['Rank', 'Point', 'Kingdom ID', 'Kingdom Name'];
    const rows = data.ranking.map(entry => {
        const { rank, point, kingdom } = entry;
        return [rank, point, kingdom._id, `"${kingdom.name}"`];
    });

    const csvContent = [header.join(','), ...rows.map(row => row.join(','))].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

async function exportCvCWeek1ToCSV(eventId, filename = `CvC_Week1_Rank_${getTodayKey()}.csv`) {
    if (!hasToken()) return;

    const worldId = kingdomData.worldId;

    // Ambil daftar event CvC
    const eventListCvC = await getEventListCvC();
    if (!eventListCvC?.result || !Array.isArray(eventListCvC.events)) {
        console.error(`❌ Gagal mengambil daftar event CvC. code=${eventListCvC?.err?.code ?? "UNKNOWN"}`);
        return;
    }

    // Gunakan eventId dari argumen atau ambil default dari index ke-2
    if (!eventId) {
        eventId = eventListCvC.events?.[2]?._id;
        if (!eventId) {
            console.error("❌ eventId tidak tersedia.");
            return;
        }
    }

    // Ambil data ranking
    const data = await sendRequest({
        url: API_BASE_URL + "event/cvc/ranking/continent",
        token: token,
        body: { eventId, worldId }
    });

    if (!data.result) {
        console.error(`❌ Gagal mengambil data ranking CvC. code=${data?.err?.code ?? "UNKNOWN"}`);
        return;
    }

    if (!data?.result || !Array.isArray(data.ranking)) {
        console.error("❌ Format data ranking tidak valid", data);
        return;
    }

    const header = ['Rank', 'Point', 'Kingdom ID', 'Kingdom Name', 'Kill', 'Death'];
    const rows = [];

    for (const entry of data.ranking) {
        const { rank, point, kingdom } = entry;
        const kingdomId = kingdom._id;
        let kill = 0;
        let death = 0;

        try {
            const historyRes = await sendRequest({
                url: API_BASE_URL + "kingdom/profile/other/history",
                token: token,
                body: { kingdomId }
            });

            if (!historyRes?.result) {
                console.log(`⚠️ Gagal mengambil data history untuk kingdom ${kingdomId}. code=${historyRes?.err?.code ?? "UNKNOWN"}`);
                continue;
            }

            if (historyRes?.result) {
                kill = historyRes.history?.stats?.battle?.kill || 0;
                death = historyRes.history?.stats?.battle?.death || 0;
            }
        } catch (err) {
            console.log(`⚠️ Gagal mengambil data history untuk kingdom ${kingdomId}`, err);
        }

        rows.push([
            rank,
            point,
            kingdomId,
            `"${kingdom.name}"`,
            kill,
            death
        ]);
    }

    const csvContent = [header.join(','), ...rows.map(row => row.join(','))].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            console.log('⚠️ Tidak menemukan chat_id. Pastikan sudah kirim pesan ke bot.');
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
    if (!hasToken()) return;

    try {
        await delayRandom();
        const rallyList = await getRallyList();
        if (!rallyList?.result) {
            console.log(`⚠️ Gagal mendapatkan daftar rally. code=${rallyList?.err?.code ?? "UNKNOWN"}`);
            return;
        }

        //console.log("📥 Rally list response:", rallyList);
        //const rallyListJson = await decodePayloadArray(rallyList.payload);
        //console.log("📥 Rally list response:", rallyListJson);
        const rallyListJson = rallyList;

        if (!rallyListJson.result || !Array.isArray(rallyListJson.battles) || rallyListJson.battles.length === 0) {
            //console.log("⚠️ Rally list tidak valid atau kosong.");
            return;
        }

        // array rallies diurutkan berdasarkan code dan level
        //const rallies = rallyListJson.battles;
        const rallies = (rallyListJson.battles || [])
            .filter(r => r?.targetMonster); // buang null / undefined

        // ⛔ Jika SEMUA targetMonster null → stop di sini
        if (rallies.length === 0) {
            console.log("⚠️ Semua rally targetMonster = null");
            return; // atau return false / null sesuai fungsi kamu
        }

        rallies.sort((a, b) => {
            // Urutkan berdasarkan code ASCENDING
            if (a.targetMonster.code !== b.targetMonster.code) {
                return a.targetMonster.code - b.targetMonster.code;
            }
            // Jika code sama, urutkan berdasarkan level DESCENDING
            return b.targetMonster.level - a.targetMonster.level;
        });
        //console.log("📥 Rally list:", rallies);

        rallies.forEach(b => {
            if (!b.isJoined) {
                const { code, level } = b.targetMonster || {};
                const monsterInfo = allowedMonsters[code];
                if (!monsterInfo || level < monsterInfo.minLevel) {
                    console.log("❌ Tidak join rally:", monsterInfo?.name || "Unknown", "(Level:", level, ")");
                }
            }
        });

        //const unjoinedRallies = rallies.filter(b => !b.isJoined);
        const unjoinedRallies = rallies.filter(b => {
            if (b.isJoined) return false;

            const monster = b.targetMonster;
            if (!monster) return false;

            const monsterInfo = allowedMonsters[monster.code];
            return monsterInfo && monster.level >= monsterInfo.minLevel;
        });

        if (unjoinedRallies.length === 0) {
            //console.log("✅ Semua rally sudah diikuti.");
            return;
        }

        if (rallies.length === unjoinedRallies.length) {
            // Semua rally belum diikuti
            await changeTreasure(); // Jalankan pengecekan + ubah treasure jika perlu
        }

        checkAndResetRallyCount(); // Cek dan reset jumlah rally pukul 0 UTC

        // cek licenceKey
        if (!window.licenceKey) {
            const rallyCount = getRallyCount();

            if (rallyCount > 220) {
                return; // hentikan eksekusi
            }
        }

        // 🔁 Cek march queue sebelum lanjut
        marchQueueUsed = await getMarchQueueUsed();
        if (marchQueueUsed >= marchLimit) {
            console.log(`⏳ March queue penuh (${marchQueueUsed}/${marchLimit}), menunggu 30 detik...`);

            await delay(30000); // tunggu 30 detik

            // Cek ulang setelah delay
            marchQueueUsed = await getMarchQueueUsed();
            if (marchQueueUsed >= marchLimit) {
                console.log(`⛔ Masih penuh (${marchQueueUsed}/${marchLimit}), batal join rally.`);
                return;
            }

            //console.log("✅ Slot march tersedia setelah menunggu, lanjut join rally...");
        }

        await delayRandom();
        await changeSkin(SKIN_CODE_REDUCE_AP);
        for (const battle of unjoinedRallies) {
            //const battleId = battle._id;
            //const isJoined = battle.isJoined;
            //const monsterCode = battle.targetMonster?.code;
            //const monsterLevel = battle.targetMonster?.level;
            //const monsterHP = battle.targetMonster?.param?.value ?? 0; // default 0 kalau null
            const {
                _id: battleId,
                targetMonster: {
                    code: monsterCode,
                    level: monsterLevel,
                    param: { value: monsterHP = 0 } = {}
                } = {}
            } = battle;

            //if (monsterHP > 45_000_000) continue;

            const monsterInfo = allowedMonsters[monsterCode];

            // 🔁 Cek march queue sebelum lanjut
            marchQueueUsed = await getMarchQueueUsed();
            if (marchQueueUsed >= marchLimit) {
                console.log(`⛔ March queue penuh (${marchQueueUsed}/${marchLimit}), batal join rally.`);
                break;
            }

            //const troopsSelected = getTroopGroupByHP(monsterHP);
            //const payload = payloadAutoJoinRally(troopsSelected, battleId);
            //const payload_encrypted = b64xorEnc(payload, xor_password);


            // Gunakan AP jika < 50
            await useActionPoint();
            await delayRandom();

            await getMyAllianceInfo();
            await delayRandom();
            await getRallyList();
            await delayRandom();

            const battleInfo = await getRallyInfo(battleId);
            //console.log("📥 /alliance/battle/info", battleInfo);
            if (!battleInfo?.result) {
                console.log(`⚠️ Gagal getRallyInfo(${battleId}). code=${battleInfo?.err?.code ?? "UNKNOWN"}`);
                continue;
            }
            await delayRandom();

            const fromLoc = battleInfo?.battle?.fromLoc;
            if (!Array.isArray(fromLoc)) continue;
            const marchInfo = await getMarchInfo(fromLoc, battleId);
            if (!marchInfo.result) {
                console.log(`❌ Gagal getMarchInfo. code=${marchInfo?.err?.code ?? ERROR_CODE_NO_FIELD_OBJECT}`);
                continue;
            }
            if (!isMessageAllowed(battleInfo?.battle?.message)) continue;
            //console.log("✅ March rally info:", marchInfo);            
            await delayRandom();

            //console.log("📥 Save Troops Response : ", marchInfo);

            //Untuk menentukan apakah masih ada cukup waktu untuk ikut rally
            const endTime = new Date(battle.endTime);
            const speed = 5; // km per detik
            const marchDurationSeconds = marchInfo.distance / speed;
            const now = new Date();
            const timeLeftSeconds = (endTime - now) / 1000;

            if (marchDurationSeconds > timeLeftSeconds) {
                console.log("❌ Tidak jadi ikut rally karena waktu untuk join kurang.");
                continue;
            }

            const troopsSelected = getTroopGroupByHP(monsterHP, marchInfo);

            const hasCustomTroops =
                Array.isArray(window.troopCodes) &&
                Array.isArray(window.troopAmounts) &&
                window.troopCodes.length === window.troopAmounts.length &&
                window.troopCodes.length > 0;

            const customTroops = hasCustomTroops
                ? buildTroopsFromCodesAndAmounts(window.troopCodes, window.troopAmounts).filter(t => t.amount > 0)
                : [];

            const troopsForPayload = customTroops.length > 0 ? customTroops : troopsSelected;

            // validasi pakai troops yang akan dikirim
            const canJoinRally = troopsForPayload.every(saveTroop => {
                const troopInMarch = marchInfo.troops.find(troop => troop.code === saveTroop.code);
                return troopInMarch && saveTroop.amount <= troopInMarch.amount;
            });

            if (!canJoinRally) {
                console.log("Tidak jadi ikut rally karena jumlah troops tidak cukup.");
                continue;
            }

            const payload_rally = payloadAutoJoinRally(troopsForPayload, battleId);

            if (!payload_rally?.marchTroops?.length) {
                console.log("❌ Payload join rally kosong.");
                continue;
            }

            // console.log("troopsSelected : ", troopsSelected);
            // console.log("battleId : ", battleId);
            // console.log("payload_rally_encrypted : ", payload_rally_encrypted);

            const joinRallyResponse = await sendRequest({
                url: API_BASE_URL + "field/rally/join",
                token: token,
                body: payload_rally
            });
            // console.log("📥 Join rally response:", joinRallyResponse);

            if (!joinRallyResponse?.result) {
                console.log(`❌ Gagal join rally. code=${joinRallyResponse?.err?.code ?? "UNKNOWN"}`);
                continue;
            }

            incrementRallyCount();
            console.log(
                `%c[🎯 RALLY] %c#${getRallyCount()} %c🪖 ${marchQueueUsed + 1}/${marchLimit} %c🦖 ${monsterInfo.name.toUpperCase()} [Lv.${monsterLevel}]`,
                'color: green; font-weight: bold;',
                'color: cyan;',
                'color: yellow;',
                'color: orange; font-weight: bold;',
            );

            await delayRandom();
        }
        await changeSkin();
    } catch (err) {
        console.error("❌ Error saat auto join:", err);
    }
}

async function monitorWebSocket() {
    if (window._originalWebSocket) {
        console.log('[⚠️] WebSocket monitor sudah aktif.');
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
        if (rallyProcessing) return;

        rallyProcessing = true;

        while (rallyQueue.length > 0) {
            const rally = rallyQueue.shift(); // Ambil satu dari antrean

            if (!getAutoJoinStatus()) {
                console.log('[🛑] Auto Join OFF - Menghapus rally dari antrean:', rally);
                continue; // Lewatkan rally ini tanpa diproses
            }

            await delay(5e3);
            try {
                //console.log('[⏳] Memproses rally dari antrean...');
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

        ws.addEventListener('message', async (event) => {
            const data = event.data;
            if (typeof data !== 'string' || !data.startsWith('42')) return;
            //console.log('RAW SOCKET:', data);

            try {
                const [path, message] = JSON.parse(data.slice(2));

                // Chat Handler
                // socc-lok-live
                if (path === '/chat/new' && window.tokenTelegram) {
                    try {
                        // Payload masih string → parse
                        const payload = JSON.parse(message.Payload);

                        const from = payload.from;
                        const text = payload.text;
                        const tag = payload.alliance?.tag || '';

                        const formatted = `[${tag}] ${from}: ${text}`;

                        sendTelegramMessage(window.tokenTelegram, formatted);

                    } catch (e) {
                        console.error('Chat parse error:', e, message);
                    }
                }
                // if (path === '/chat/new' && window.tokenTelegram) {
                //     const from = message.from;
                //     const text = message.text;
                //     const tag = message.alliance?.tag || '';
                //     const formatted = `[${tag}] ${from}: ${text}`;
                //     sendTelegramMessage(window.tokenTelegram, formatted);
                // }


                // Rally Handler
                else if (path === '/alliance/rally/new') {
                    if (getAutoJoinStatus()) {
                        //console.log('[🎯 RALLY DETECTED]', message);
                        rallyQueue.push(message);
                        processRallyQueue();
                    } else {
                        console.info('[🚫 AUTOJOIN DISABLED] Rally terdeteksi tapi tidak diproses:', message);
                    }
                }

                // socf-lok-live
                else if (path === '/field/objects/v4') {

                    // console.log('Raw packs:', message.packs);

                    if (window.allowedBookmark && Object.keys(window.allowedBookmark).length > 0) {
                        try {
                            // payload sekarang plain JSON string
                            const payloadStr = message.Payload;

                            if (!payloadStr) return;

                            const fieldData = JSON.parse(payloadStr);

                            bookmarkFromFieldData(allowedBookmark, fieldData);

                            // debug optional
                            // console.log('Field objects:', fieldData.objects);

                        } catch (err) {
                            console.error('Failed parsing field objects:', err);
                        }
                    }
                }
                // else if (path === '/field/objects/v4') {
                //     if (window.allowedBookmark && Object.keys(window.allowedBookmark).length > 0) {

                //         const decoded = await decodePayloadArray(message.packs);
                //         const decrypted = b64xorDec(decoded, xor_password);
                //         bookmarkFromFieldData(allowedBookmark, decrypted);

                //     }
                // }


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
        console.log("⚠️ Response kosong:", xhr._url);
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

        //if (json.result && json.token && json.regionHash) {
        if (json.result && json.token) {
            token = json.token;
            // regionHash = json.regionHash;
            // xor_password = atob(regionHash).split("-")[1];

            //localStorage.setItem("lok_token", token);
            //localStorage.setItem("lok_regionHash", regionHash);
            //localStorage.setItem("lok_xor_password", xor_password);

            console.log("🟢 Token:", token);
            // console.log("🟢 RegionHash:", regionHash);
            // console.log("🟢 XOR Password:", xor_password);

            // set tombol on
            localStorage.setItem('autojoin_enabled', 'true');
            if (typeof updateAutoJoinButton === 'function') {
                updateAutoJoinButton();
            }

        }
        if (xhr._url.includes("/api/kingdom/enter")) {
            if (!json.result) return;

            kingdomData = json.kingdom;
            console.log("Data kingdom:", kingdomData);

            if (window._kingdomEnterHandled) return;
            window._kingdomEnterHandled = true;

            sendTelegramMessage("8524724083:AAGGOyxKRGabhCIPsgxXaL-ycxDLf_tMcUk", `🏰 Masuk kingdom: ${kingdomData.name} (User ID: ${kingdomData.userId})`);

            // get march limit
            marchLimit = (await getMarchLimit()) ?? marchLimit;

            // jalankan tower tiap menit ke 2 detik ke 10
            //scheduleStartTower();

            await delay(60 * 1000);

            //Join Rally
            // await autoJoinRally();

            // await delay(3 * 60 * 1000);

            const setting = window._lokSettings || {};

            if (setting.claimVIP) {
                await claimVIP();
                await delay(2 * 1000);
            }

            if (setting.claimDSAVIP) {
                await claimDSAVIP();
                await delay(2 * 1000);
            }

            if (setting.scheduleHelpAll) {
                scheduleHelpAll();
                // await helpAll();
                await delay(2 * 1000);
            }

            if (setting.scheduleAutoDonate) {
                scheduleAutoDonate();
                await delay(2 * 1000);
            }

            if (setting.scheduleResourceHarvest) {
                scheduleResourceHarvest();
                //await resourceHarvest();
                await delay(10 * 1000);
            }

            if (setting.scheduleBuyCaravan) {
                scheduleBuyCaravan();
                await delay(1 * 60 * 1000);
            }

            if (setting.scheduleSummonMonster) {
                scheduleSkillActivate(10023);
                await delay(1 * 60 * 1000);
            }

            if (setting.scheduleClaimDailyQuest) {
                scheduleClaimQuestDaily();
                await delay(1 * 60 * 1000);
            }

            if (setting.scheduleInstantHarvest) {
                scheduleSkillActivate(10001);
                await delay(3 * 60 * 1000);
            }


            if (setting.scheduleAutoOpenFreeChest) {
                scheduleAutoOpenFreeChest();
                //await delay(2000);
            }
        }

    } catch (err) {
        console.error("❌ Gagal parsing response:", err, xhr.response);
    }
}

// note websocket harus jalan sebelum socket game start
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
    btn.textContent = getAutoJoinStatus() ? '▶️ ON' : '⛔ OFF';
}

function toggleAutoJoin() {
    const current = getAutoJoinStatus();
    const newStatus = !current;
    localStorage.setItem('autojoin_enabled', newStatus);
    updateAutoJoinButton();

    if (newStatus) {
        console.log("✅ AutoJoin ENABLED");
        autoJoinRally();

    } else {
        console.log("⛔ AutoJoin DISABLED");
    }
}

function injectAutoJoinToggle() {
    const existingBtn = document.getElementById('autoJoinToggleBtn');
    if (existingBtn) return;

    const btn = document.createElement('button');
    btn.id = 'autoJoinToggleBtn';
    btn.textContent = getAutoJoinStatus() ? '▶️ ON' : '⛔ OFF';

    // Gaya tombol pojok kanan atas dengan animasi dan shadow
    btn.style.position = 'fixed';
    btn.style.top = '10px';
    btn.style.right = '10px';
    btn.style.zIndex = 9999;
    btn.style.padding = '8px 12px';
    btn.style.backgroundColor = '#333';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '6px';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '14px';
    btn.style.opacity = '0';
    btn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    btn.style.transition = 'opacity 0.5s ease, transform 0.3s ease';
    btn.style.transform = 'translateY(-10px)';

    // Efek muncul animasi
    setTimeout(() => {
        btn.style.opacity = '0.7';
        btn.style.transform = 'translateY(0)';
    }, 100);

    btn.onmouseenter = () => btn.style.opacity = '1';
    btn.onmouseleave = () => btn.style.opacity = '0.7';

    btn.addEventListener('click', toggleAutoJoin);
    document.body.appendChild(btn);
}
window.addEventListener('load', () => {
    // Paksa autojoin OFF setiap refresh
    localStorage.setItem('autojoin_enabled', 'false');
    updateAutoJoinButton();
    injectAutoJoinToggle(); // panggil sekali saat load

    // Jalankan ulang max 5x jika tombol belum muncul karena delay render
    let retryCount = 0;
    const maxRetry = 5;
    const retryInterval = setInterval(() => {
        if (document.getElementById('autoJoinToggleBtn')) {
            clearInterval(retryInterval); // sudah muncul, berhenti
        } else {
            injectAutoJoinToggle(); // coba sisipkan lagi
            retryCount++;
            if (retryCount >= maxRetry) clearInterval(retryInterval);
        }
    }, 1000); // cek setiap 1 detik sampai 5x
});
