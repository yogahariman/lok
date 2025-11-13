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
        console.log("❌ Gagal mengirim request:", err);
        return null;
    }
}

async function acceptRequest() {
    const requestList = await sendRequest({
        url: "https://api-lok-live.leagueofkingdoms.com/api/alliance/request/list",
        token: token,
        body: "{}",
        returnResponse: true
    });

    // bila requestList = {"result":true,"requestList":[]} maka return;
    // {"result":true,"requestList":[{"_id":"65ebf9257b9d7faa12918d31","faceCode":3,"name":"Gulali","power":"227108217","kill":0}]}

    // https://api-lok-live.leagueofkingdoms.com/api/alliance/request/accept
    // json	'{"kingdomId":"65ebf9257b9d7faa12918d31"}'

    // https://api-lok-live.leagueofkingdoms.com/api/kingdom/treasure/list
    // json	'{"kingdomId":"65ebf9257b9d7faa12918d31"}'

    // {"result":true,"equipped":[{"slot":0,"item":{"_id":"67849abe518e45b494e926e6","code":10504013,"amount":1,"piece":27,"level":4,"skillLevel":[5,5,5,5,2],"equipped":true}},{"slot":1,"item":{"_id":"65ee61b603f728b153da78d5","code":10504005,"amount":1,"piece":5,"level":2,"skillLevel":[5,2,1,5,0],"equipped":true}},{"slot":2,"item":{"_id":"65ee5ec203f728b15370b790","code":10503013,"amount":1,"piece":698,"level":4,"skillLevel":[5,5,5,5,0],"equipped":true}},{"slot":3,"item":{"_id":"65ee5ec203f728b15370b6b1","code":10504002,"amount":1,"piece":33,"level":1,"skillLevel":[5,4,3,0,0],"equipped":true}},{"slot":4,"item":{"_id":"6680265680ddb6bf4804d586","code":10503025,"amount":1,"piece":25,"level":3,"skillLevel":[5,5,4,5,0],"equipped":true}},{"slot":5,"item":{"_id":"6662a31d80ddb6bf483daf5b","code":10504001,"amount":1,"piece":19027,"level":5,"skillLevel":[5,5,5,5,5],"equipped":true}}]}


}

async function scheduleAcceptRequest() {
    try {
        // Jalankan sekarang
        // await claimDailyQuest();

        // Jalankan setiap 1 menit
        setInterval(async () => {
            try {
                await claimDailyQuest();
            } catch (err) {
                console.error("❌ Gagal saat klaim ulang:", err);
            }
        }, 1 * 60 * 1000); // 1 menit = 60000 ms

    } catch (error) {
        console.error("❌ Gagal saat klaim pertama:", error);
    }
}