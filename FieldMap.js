// await fetch("wss://socf-lok-live.leagueofkingdoms.com/socket.io/?EIO=4&transport=websocket&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY3YzdlZjVmMDAwYjc0MmJkMjMxNzQiLCJraW5nZG9tSWQiOiI2MGY3YzdlZjVmMDAwYjc0MmJkMjMxNzUiLCJ3b3JsZElkIjoxMSwidmVyc2lvbiI6MTc5NCwiYXV0aFR5cGUiOiJnb29nbGUiLCJwbGF0Zm9ybSI6IndlYiIsInRpbWUiOjE3NDg0MTM3MTQ2NTQsImNsaWVudFhvciI6IjAiLCJpcCI6IjIwMi41OS4xOTcuMjIiLCJpYXQiOjE3NDg0MTM3MTQsImV4cCI6MTc0OTAxODUxNCwiaXNzIjoibm9kZ2FtZXMuY29tIiwic3ViIjoidXNlckluZm8ifQ.kuHFrhAcRUKP-rNGHRdBePGAM9HLOR5UqUIiXa8-rJ4", {
//     "credentials": "include",
//     "headers": {
//         "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0",
//         "Accept": "*/*",
//         "Accept-Language": "en-US,en;q=0.5",
//         "Sec-WebSocket-Version": "13",
//         "Sec-WebSocket-Extensions": "permessage-deflate",
//         "Sec-WebSocket-Key": "T8OpL2/NAFPPKBdpcSxjgg==",
//         "Sec-Fetch-Dest": "empty",
//         "Sec-Fetch-Mode": "websocket",
//         "Sec-Fetch-Site": "same-site",
//         "Pragma": "no-cache",
//         "Cache-Control": "no-cache"
//     },
//     "method": "GET",
//     "mode": "cors"
// });

//wss://socf-lok-live.leagueofkingdoms.com/socket.io/?EIO=4&transport=websocket&token=eyJhbGc....UIiXa8-rJ4
//42["/zone/enter/list/v4", "VRITXkVeFVVcVgcfFlRBXgFCFQhTLFRVBgcYHBwGXB0FAUJFSlUEAwECHAJSCBsAQkRVSwQBBBgCAlYGBx5DRFVTaxEYDE1fCUFjSwESRF0FTg=="]


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

        ws.addEventListener("open", () => {
            const payloadEncryptedArray = [];

            const stepX = 32;
            const stepY = 16;

            for (let x = 4; x <= 2040; x += stepX) {
                for (let y = 4; y <= 2040; y += stepY) {
                    const minX = x;
                    const minY = y;
                    const maxX = minX + stepX;
                    const maxY = minY + stepY;
                    const zoneIds = getZoneIds(minX, maxX, minY, maxY);

                    // Anda harus pastikan fungsi b64xorEnc() tersedia
                    const encryptedPayload = b64xorEnc(zoneIds);
                    payloadEncryptedArray.push(encryptedPayload);
                }
            }

            for (const payload of payloadEncryptedArray) {
                const message = `42["/zone/enter/list/v4", ${JSON.stringify(payload)}]`;
                ws.send(message);
                console.log("Terkirim:", message);
            }
        });

        ws.addEventListener('message', (event) => {
            const data = event.data;
            if (typeof data !== 'string' || !data.startsWith('42')) return;

            try {
                const [path, message] = JSON.parse(data.slice(2));

                if (path === '/field/objects/v4') {
                    const fieldData = message.packs;
                    // Tambahkan logika pemrosesan fieldData di sini jika dibutuhkan
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


//42["/field/objects/v4",{"isPackCompressed":true,"packs":[31,139,8,0,..,160,220,124,2,0]}]