import { r as c, I as M, S as ht, _ as E, R as k, a as St, O as pt, i as Ht, b as fa, g as X, c as Cr, d as Or, P as va, e as ma, f as br, D as F, h as ha, j as ga, k as Gn, m as Mt, s as sn, l as Ea, n as Rr, o as ya, p as Sr, q as B, t as Ca, u as Oa, v as xr, w as ba, x as Ra, y as Sa, z as xa, A as Nr, B as Ke, C as Ye, E as Qt, F as Ee, T as Na, G as Ta, H as Pa, J as Lt, K as ln, L as wa, M as Aa, N as Wn, Q as Gt, U as un, V as cn, W as rt, X as zn, Y as gn, Z as en, $ as _a, a0 as La, a1 as Ia, a2 as Da, a3 as ka, a4 as Ma, a5 as Va, a6 as $n, a7 as ja, a8 as En, a9 as Ba, aa as Fa, ab as Ua, ac as Ha, ad as Ga, ae as Wa, af as za, ag as $a, ah as Ka, ai as Ya, aj as qa, ak as Xa, al as Wt, am as Ja, an as Tr, ao as Pr, ap as Za, aq as Qa, ar as eo, as as to, at as no, au as ro, av as Kn, aw as ao, ax as _e, ay as oo, az as io, aA as so, aB as lo, aC as uo, aD as co, aE as po, aF as fo, aG as Yn, aH as qn, aI as vo, aJ as mo, aK as ho, aL as go, aM as Eo, aN as Xn, aO as yo, aP as Co, aQ as Oo, aR as bo, aS as Ro, aT as So, aU as xo, aV as No, aW as To, aX as Po, aY as wo, aZ as wr, a_ as Ao, a$ as _o, b0 as Lo, b1 as Io, b2 as yn, b3 as Do, b4 as ko, b5 as Mo, b6 as Vo, b7 as jo, b8 as O, b9 as Jn, ba as Bo, bb as Ar, e } from "https://lok-autorally.fly.dev//client-B3Es0ZnZ.js";
const Fo = (e, n) => {
  const t = {};
  t.send = e.send, setTimeout(() => {
    t.onmessage = e.onmessage, e.onmessage = (a) => {
      const o = n(a, "receive", t.onmessage);
      if (o)
        if (Object.defineProperty(a, "data", { writable: !0 }), Array.isArray(o))
          for (let i = 0; i < o.length; i++) {
            const s = o[i];
            setTimeout(() => {
              a.data = s, t.onmessage.apply(e, [a]);
            }, 2e3 * i);
          }
        else
          a.data = o, t.onmessage.apply(e, [a]);
      else
        t.onmessage.apply(e, [a]);
    };
  }, 1), e.send = function(...a) {
    n(
      { origin: new URL(e.url).origin, data: a[0] },
      "send"
    ), t.send.apply(e, a);
  };
  function r(...a) {
    e.readyState === WebSocket.OPEN && t.send.apply(e, a);
  }
  return {
    send: r
  };
}, Uo = function(e, n) {
  const t = {}, r = (l) => {
    const u = l.currentTarget, d = new URL(u.url).origin;
    delete t[d], u.removeEventListener("close", r);
  }, a = (l) => {
    const u = new URL(l.url).origin;
    t[u] || (l.addEventListener("close", r), t[u] = { instance: l }, t[u].wrapped = Fo(l, n));
  }, o = Object.getOwnPropertyDescriptor(
    e.prototype,
    "onmessage"
  ).get, i = Object.getOwnPropertyDescriptor(
    e.prototype,
    "onmessage"
  ).set;
  Object.defineProperty(e.prototype, "onmessage", {
    get(...l) {
      return o.apply(this, l);
    },
    set(...l) {
      return a(this), i.apply(this, l);
    }
  });
  function s(l, ...u) {
    t[l] && t[l].wrapped.send(...u);
  }
  return {
    send: s
  };
};
var Cn = c.forwardRef(function(e, n) {
  var t = e.size >= M.LARGE, r = t ? M.LARGE : M.STANDARD, a = "".concat(-1 * r / 0.05 / 2), o = { transformOrigin: "center" };
  return c.createElement(
    ht,
    E({ iconName: "caret-down", ref: n }, e),
    c.createElement("path", { d: t ? "M320 260C320 271 311 280 300 280H100C89 280 80 271 80 260C80 255.2 82 250.8 84.8 247.4L84.6 247.2L184.6 127.2L184.8 127.4C188.6 123 193.8 120 200 120S211.4 123 215.2 127.4L215.4 127.2L315.4 247.2L315.2 247.4C318 250.8 320 255.2 320 260z" : "M240 190C240 195.6 235.6 200 230 200H90C84.4 200 80 195.6 80 190C80 187.4 81 185.2 82.6 183.4C82.6 183.4 82.6 183.4 82.6 183.4L152.6 103.4L152.6 103.4C154.4 101.4 157 100 160 100S165.6 101.4 167.4 103.4L167.4 103.4L237.4 183.4L237.4 183.4C239 185.2 240 187.4 240 190z", fillRule: "evenodd", transform: "scale(0.05, -0.05) translate(".concat(a, ", ").concat(a, ")"), style: o })
  );
});
Cn.defaultProps = {
  size: M.STANDARD
};
Cn.displayName = "Blueprint5.Icon.CaretDown";
var On = c.forwardRef(function(e, n) {
  var t = e.size >= M.LARGE, r = t ? M.LARGE : M.STANDARD, a = "".concat(-1 * r / 0.05 / 2), o = { transformOrigin: "center" };
  return c.createElement(
    ht,
    E({ iconName: "chevron-down", ref: n }, e),
    c.createElement("path", { d: t ? "M320 280C314.4000000000001 280 309.4000000000001 277.8 305.8 274.2L200 168.2L94.2 274.2C90.6 277.8 85.6 280 80 280C69 280 60 271 60 260C60 254.4 62.2 249.4 65.8 245.8L185.8 125.8C189.4 122.2 194.4 120 200 120S210.6 122.2 214.2 125.8L334.2000000000001 245.8C337.8 249.4 340 254.4 340 260C340 271 331 280 320 280z" : "M240 220C234.4 220 229.4 217.8 225.8 214.2L160 148.2L94.2 214.2C90.6 217.8 85.6 220 80 220C69 220 60 211 60 200C60 194.4 62.2 189.4 65.8 185.8L145.8 105.8C149.4 102.2 154.4 100 160 100S170.6 102.2 174.2 105.8L254.2 185.8C257.8 189.4 260 194.4 260 200C260 211 251 220 240 220z", fillRule: "evenodd", transform: "scale(0.05, -0.05) translate(".concat(a, ", ").concat(a, ")"), style: o })
  );
});
On.defaultProps = {
  size: M.STANDARD
};
On.displayName = "Blueprint5.Icon.ChevronDown";
var bn = c.forwardRef(function(e, n) {
  var t = e.size >= M.LARGE, r = t ? M.LARGE : M.STANDARD, a = "".concat(-1 * r / 0.05 / 2), o = { transformOrigin: "center" };
  return c.createElement(
    ht,
    E({ iconName: "chevron-up", ref: n }, e),
    c.createElement("path", { d: t ? "M334.2000000000001 154.2L214.2 274.2000000000001C210.6 277.8 205.6 280 200 280S189.4 277.8 185.8 274.2L65.8 154.2C62.2 150.6 60 145.6 60 140C60 129 69 120 80 120C85.6 120 90.6 122.2 94.2 125.8L200 231.8L305.8 126C309.4000000000001 122.2 314.4000000000001 120 320 120C331 120 340 129 340 140C340 145.6 337.8 150.6 334.2000000000001 154.2z" : "M254.2 134.2L174.2 214.2C170.6 217.8 165.6 220 160 220S149.4 217.8 145.8 214.2L65.8 134.2C62.2 130.6 60 125.6 60 120C60 109 69 100 80 100C85.6 100 90.6 102.2 94.2 105.8L160 171.8L225.8 106C229.4 102.2 234.4 100 240 100C251 100 260 109 260 120C260 125.6 257.8 130.6 254.2 134.2z", fillRule: "evenodd", transform: "scale(0.05, -0.05) translate(".concat(a, ", ").concat(a, ")"), style: o })
  );
});
bn.defaultProps = {
  size: M.STANDARD
};
bn.displayName = "Blueprint5.Icon.ChevronUp";
var Rn = c.forwardRef(function(e, n) {
  var t = e.size >= M.LARGE, r = t ? M.LARGE : M.STANDARD, a = "".concat(-1 * r / 0.05 / 2), o = { transformOrigin: "center" };
  return c.createElement(
    ht,
    E({ iconName: "double-caret-vertical", ref: n }, e),
    c.createElement("path", { d: t ? "M100 220H300C311 220 320 229 320 240C320 244.8 318 249.2 315.2 252.6L315.4 252.8L215.4 372.8L215.2 372.6C211.4 377 206.2 380 200 380S188.6 377 184.8 372.6L184.6 372.8L84.6 252.8L84.8 252.6C82 249.2 80 244.8 80 240C80 229 89 220 100 220zM300 180H100C89 180 80 171 80 160C80 155.2 82 150.8 84.8 147.4L84.6 147.2L184.6 27.2L184.8 27.4C188.6 23 193.8 20 200 20S211.4 23 215.2 27.4L215.4 27.2L315.4 147.2L315.2 147.4C318 150.8 320 155.2 320 160C320 171 311 180 300 180z" : "M100 180H220C231 180 240 189 240 200C240 205.6 237.8 210.6 234.2 214.2L174.2 274.2C170.6 277.8 165.6 280 160 280S149.4 277.8 145.8 274.2L85.8 214.2C82.2 210.6 80 205.6 80 200C80 189 89 180 100 180zM220 140H100C89 140 80 131 80 120C80 114.4 82.2 109.4 85.8 105.8L145.8 45.8C149.4 42.2 154.4 40 160 40S170.6 42.2 174.2 45.8L234.2 105.8C237.8 109.4 240 114.4 240 120C240 131 231 140 220 140z", fillRule: "evenodd", transform: "scale(0.05, -0.05) translate(".concat(a, ", ").concat(a, ")"), style: o })
  );
});
Rn.defaultProps = {
  size: M.STANDARD
};
Rn.displayName = "Blueprint5.Icon.DoubleCaretVertical";
var Sn = c.forwardRef(function(e, n) {
  var t = e.size >= M.LARGE, r = t ? M.LARGE : M.STANDARD, a = "".concat(-1 * r / 0.05 / 2), o = { transformOrigin: "center" };
  return c.createElement(
    ht,
    E({ iconName: "small-cross", ref: n }, e),
    c.createElement("path", { d: t ? "M228.2 200L294 265.8C297.8 269.4 300 274.4 300 280C300 291 291 300 280 300C274.4000000000001 300 269.4000000000001 297.8 265.8 294.2L200 228.2L134.2 294.2C130.6 297.8 125.6 300 120 300C109 300 100 291 100 280C100 274.4 102.2 269.4 105.8 265.8L171.8 200L106 134.2000000000001C102.2 130.6 100 125.6 100 120C100 109 109 100 120 100C125.6 100 130.6 102.2 134.2 105.8L200 171.8L265.8 106C269.4000000000001 102.2 274.4000000000001 100 280 100C291 100 300 109 300 120C300 125.6 297.8 130.6 294.2000000000001 134.2000000000001L228.2 200z" : "M188.2 160L234 205.8C237.8 209.4 240 214.4 240 220C240 231 231 240 220 240C214.4 240 209.4 237.8 205.8 234.2L160 188.2L114.2 234.2C110.6 237.8 105.6 240 100 240C89 240 80 231 80 220C80 214.4 82.2 209.4 85.8 205.8L131.8 160L86 114.2C82.2 110.6 80 105.6 80 100C80 89 89 80 100 80C105.6 80 110.6 82.2 114.2 85.8L160 131.8L205.8 86C209.4 82.2 214.4 80 220 80C231 80 240 89 240 100C240 105.6 237.8 110.6 234.2 114.2L188.2 160z", fillRule: "evenodd", transform: "scale(0.05, -0.05) translate(".concat(a, ", ").concat(a, ")"), style: o })
  );
});
Sn.defaultProps = {
  size: M.STANDARD
};
Sn.displayName = "Blueprint5.Icon.SmallCross";
function Vt() {
  return Vt = Object.assign ? Object.assign.bind() : function(e) {
    for (var n = 1; n < arguments.length; n++) {
      var t = arguments[n];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
    }
    return e;
  }, Vt.apply(null, arguments);
}
function xn(e, n) {
  if (e == null) return {};
  var t = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (n.includes(r)) continue;
    t[r] = e[r];
  }
  return t;
}
function dn(e, n) {
  return dn = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, r) {
    return t.__proto__ = r, t;
  }, dn(e, n);
}
function Nn(e, n) {
  e.prototype = Object.create(n.prototype), e.prototype.constructor = e, dn(e, n);
}
function Ho(e, n) {
  return e.classList ? !!n && e.classList.contains(n) : (" " + (e.className.baseVal || e.className) + " ").indexOf(" " + n + " ") !== -1;
}
function Go(e, n) {
  e.classList ? e.classList.add(n) : Ho(e, n) || (typeof e.className == "string" ? e.className = e.className + " " + n : e.setAttribute("class", (e.className && e.className.baseVal || "") + " " + n));
}
function Zn(e, n) {
  return e.replace(new RegExp("(^|\\s)" + n + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
function Wo(e, n) {
  e.classList ? e.classList.remove(n) : typeof e.className == "string" ? e.className = Zn(e.className, n) : e.setAttribute("class", Zn(e.className && e.className.baseVal || "", n));
}
const Qn = {
  disabled: !1
}, jt = k.createContext(null);
var _r = function(n) {
  return n.scrollTop;
}, it = "unmounted", Te = "exited", Pe = "entering", Fe = "entered", pn = "exiting", ye = /* @__PURE__ */ function(e) {
  Nn(n, e);
  function n(r, a) {
    var o;
    o = e.call(this, r, a) || this;
    var i = a, s = i && !i.isMounting ? r.enter : r.appear, l;
    return o.appearStatus = null, r.in ? s ? (l = Te, o.appearStatus = Pe) : l = Fe : r.unmountOnExit || r.mountOnEnter ? l = it : l = Te, o.state = {
      status: l
    }, o.nextCallback = null, o;
  }
  n.getDerivedStateFromProps = function(a, o) {
    var i = a.in;
    return i && o.status === it ? {
      status: Te
    } : null;
  };
  var t = n.prototype;
  return t.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, t.componentDidUpdate = function(a) {
    var o = null;
    if (a !== this.props) {
      var i = this.state.status;
      this.props.in ? i !== Pe && i !== Fe && (o = Pe) : (i === Pe || i === Fe) && (o = pn);
    }
    this.updateStatus(!1, o);
  }, t.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, t.getTimeouts = function() {
    var a = this.props.timeout, o, i, s;
    return o = i = s = a, a != null && typeof a != "number" && (o = a.exit, i = a.enter, s = a.appear !== void 0 ? a.appear : i), {
      exit: o,
      enter: i,
      appear: s
    };
  }, t.updateStatus = function(a, o) {
    if (a === void 0 && (a = !1), o !== null)
      if (this.cancelNextCallback(), o === Pe) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var i = this.props.nodeRef ? this.props.nodeRef.current : St.findDOMNode(this);
          i && _r(i);
        }
        this.performEnter(a);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === Te && this.setState({
      status: it
    });
  }, t.performEnter = function(a) {
    var o = this, i = this.props.enter, s = this.context ? this.context.isMounting : a, l = this.props.nodeRef ? [s] : [St.findDOMNode(this), s], u = l[0], d = l[1], p = this.getTimeouts(), f = s ? p.appear : p.enter;
    if (!a && !i || Qn.disabled) {
      this.safeSetState({
        status: Fe
      }, function() {
        o.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, d), this.safeSetState({
      status: Pe
    }, function() {
      o.props.onEntering(u, d), o.onTransitionEnd(f, function() {
        o.safeSetState({
          status: Fe
        }, function() {
          o.props.onEntered(u, d);
        });
      });
    });
  }, t.performExit = function() {
    var a = this, o = this.props.exit, i = this.getTimeouts(), s = this.props.nodeRef ? void 0 : St.findDOMNode(this);
    if (!o || Qn.disabled) {
      this.safeSetState({
        status: Te
      }, function() {
        a.props.onExited(s);
      });
      return;
    }
    this.props.onExit(s), this.safeSetState({
      status: pn
    }, function() {
      a.props.onExiting(s), a.onTransitionEnd(i.exit, function() {
        a.safeSetState({
          status: Te
        }, function() {
          a.props.onExited(s);
        });
      });
    });
  }, t.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, t.safeSetState = function(a, o) {
    o = this.setNextCallback(o), this.setState(a, o);
  }, t.setNextCallback = function(a) {
    var o = this, i = !0;
    return this.nextCallback = function(s) {
      i && (i = !1, o.nextCallback = null, a(s));
    }, this.nextCallback.cancel = function() {
      i = !1;
    }, this.nextCallback;
  }, t.onTransitionEnd = function(a, o) {
    this.setNextCallback(o);
    var i = this.props.nodeRef ? this.props.nodeRef.current : St.findDOMNode(this), s = a == null && !this.props.addEndListener;
    if (!i || s) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var l = this.props.nodeRef ? [this.nextCallback] : [i, this.nextCallback], u = l[0], d = l[1];
      this.props.addEndListener(u, d);
    }
    a != null && setTimeout(this.nextCallback, a);
  }, t.render = function() {
    var a = this.state.status;
    if (a === it)
      return null;
    var o = this.props, i = o.children;
    o.in, o.mountOnEnter, o.unmountOnExit, o.appear, o.enter, o.exit, o.timeout, o.addEndListener, o.onEnter, o.onEntering, o.onEntered, o.onExit, o.onExiting, o.onExited, o.nodeRef;
    var s = xn(o, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ k.createElement(jt.Provider, {
        value: null
      }, typeof i == "function" ? i(a, s) : k.cloneElement(k.Children.only(i), s))
    );
  }, n;
}(k.Component);
ye.contextType = jt;
ye.propTypes = {};
function Be() {
}
ye.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Be,
  onEntering: Be,
  onEntered: Be,
  onExit: Be,
  onExiting: Be,
  onExited: Be
};
ye.UNMOUNTED = it;
ye.EXITED = Te;
ye.ENTERING = Pe;
ye.ENTERED = Fe;
ye.EXITING = pn;
var zo = function(n, t) {
  return n && t && t.split(" ").forEach(function(r) {
    return Go(n, r);
  });
}, tn = function(n, t) {
  return n && t && t.split(" ").forEach(function(r) {
    return Wo(n, r);
  });
}, st = /* @__PURE__ */ function(e) {
  Nn(n, e);
  function n() {
    for (var r, a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return r = e.call.apply(e, [this].concat(o)) || this, r.appliedClasses = {
      appear: {},
      enter: {},
      exit: {}
    }, r.onEnter = function(s, l) {
      var u = r.resolveArguments(s, l), d = u[0], p = u[1];
      r.removeClasses(d, "exit"), r.addClass(d, p ? "appear" : "enter", "base"), r.props.onEnter && r.props.onEnter(s, l);
    }, r.onEntering = function(s, l) {
      var u = r.resolveArguments(s, l), d = u[0], p = u[1], f = p ? "appear" : "enter";
      r.addClass(d, f, "active"), r.props.onEntering && r.props.onEntering(s, l);
    }, r.onEntered = function(s, l) {
      var u = r.resolveArguments(s, l), d = u[0], p = u[1], f = p ? "appear" : "enter";
      r.removeClasses(d, f), r.addClass(d, f, "done"), r.props.onEntered && r.props.onEntered(s, l);
    }, r.onExit = function(s) {
      var l = r.resolveArguments(s), u = l[0];
      r.removeClasses(u, "appear"), r.removeClasses(u, "enter"), r.addClass(u, "exit", "base"), r.props.onExit && r.props.onExit(s);
    }, r.onExiting = function(s) {
      var l = r.resolveArguments(s), u = l[0];
      r.addClass(u, "exit", "active"), r.props.onExiting && r.props.onExiting(s);
    }, r.onExited = function(s) {
      var l = r.resolveArguments(s), u = l[0];
      r.removeClasses(u, "exit"), r.addClass(u, "exit", "done"), r.props.onExited && r.props.onExited(s);
    }, r.resolveArguments = function(s, l) {
      return r.props.nodeRef ? [r.props.nodeRef.current, s] : [s, l];
    }, r.getClassNames = function(s) {
      var l = r.props.classNames, u = typeof l == "string", d = u && l ? l + "-" : "", p = u ? "" + d + s : l[s], f = u ? p + "-active" : l[s + "Active"], v = u ? p + "-done" : l[s + "Done"];
      return {
        baseClassName: p,
        activeClassName: f,
        doneClassName: v
      };
    }, r;
  }
  var t = n.prototype;
  return t.addClass = function(a, o, i) {
    var s = this.getClassNames(o)[i + "ClassName"], l = this.getClassNames("enter"), u = l.doneClassName;
    o === "appear" && i === "done" && u && (s += " " + u), i === "active" && a && _r(a), s && (this.appliedClasses[o][i] = s, zo(a, s));
  }, t.removeClasses = function(a, o) {
    var i = this.appliedClasses[o], s = i.base, l = i.active, u = i.done;
    this.appliedClasses[o] = {}, s && tn(a, s), l && tn(a, l), u && tn(a, u);
  }, t.render = function() {
    var a = this.props;
    a.classNames;
    var o = xn(a, ["classNames"]);
    return /* @__PURE__ */ k.createElement(ye, Vt({}, o, {
      onEnter: this.onEnter,
      onEntered: this.onEntered,
      onEntering: this.onEntering,
      onExit: this.onExit,
      onExiting: this.onExiting,
      onExited: this.onExited
    }));
  }, n;
}(k.Component);
st.defaultProps = {
  classNames: ""
};
st.propTypes = {};
function $o(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Tn(e, n) {
  var t = function(o) {
    return n && c.isValidElement(o) ? n(o) : o;
  }, r = /* @__PURE__ */ Object.create(null);
  return e && c.Children.map(e, function(a) {
    return a;
  }).forEach(function(a) {
    r[a.key] = t(a);
  }), r;
}
function Ko(e, n) {
  e = e || {}, n = n || {};
  function t(d) {
    return d in n ? n[d] : e[d];
  }
  var r = /* @__PURE__ */ Object.create(null), a = [];
  for (var o in e)
    o in n ? a.length && (r[o] = a, a = []) : a.push(o);
  var i, s = {};
  for (var l in n) {
    if (r[l])
      for (i = 0; i < r[l].length; i++) {
        var u = r[l][i];
        s[r[l][i]] = t(u);
      }
    s[l] = t(l);
  }
  for (i = 0; i < a.length; i++)
    s[a[i]] = t(a[i]);
  return s;
}
function we(e, n, t) {
  return t[n] != null ? t[n] : e.props[n];
}
function Yo(e, n) {
  return Tn(e.children, function(t) {
    return c.cloneElement(t, {
      onExited: n.bind(null, t),
      in: !0,
      appear: we(t, "appear", e),
      enter: we(t, "enter", e),
      exit: we(t, "exit", e)
    });
  });
}
function qo(e, n, t) {
  var r = Tn(e.children), a = Ko(n, r);
  return Object.keys(a).forEach(function(o) {
    var i = a[o];
    if (c.isValidElement(i)) {
      var s = o in n, l = o in r, u = n[o], d = c.isValidElement(u) && !u.props.in;
      l && (!s || d) ? a[o] = c.cloneElement(i, {
        onExited: t.bind(null, i),
        in: !0,
        exit: we(i, "exit", e),
        enter: we(i, "enter", e)
      }) : !l && s && !d ? a[o] = c.cloneElement(i, {
        in: !1
      }) : l && s && c.isValidElement(u) && (a[o] = c.cloneElement(i, {
        onExited: t.bind(null, i),
        in: u.props.in,
        exit: we(i, "exit", e),
        enter: we(i, "enter", e)
      }));
    }
  }), a;
}
var Xo = Object.values || function(e) {
  return Object.keys(e).map(function(n) {
    return e[n];
  });
}, Jo = {
  component: "div",
  childFactory: function(n) {
    return n;
  }
}, Pn = /* @__PURE__ */ function(e) {
  Nn(n, e);
  function n(r, a) {
    var o;
    o = e.call(this, r, a) || this;
    var i = o.handleExited.bind($o(o));
    return o.state = {
      contextValue: {
        isMounting: !0
      },
      handleExited: i,
      firstRender: !0
    }, o;
  }
  var t = n.prototype;
  return t.componentDidMount = function() {
    this.mounted = !0, this.setState({
      contextValue: {
        isMounting: !1
      }
    });
  }, t.componentWillUnmount = function() {
    this.mounted = !1;
  }, n.getDerivedStateFromProps = function(a, o) {
    var i = o.children, s = o.handleExited, l = o.firstRender;
    return {
      children: l ? Yo(a, s) : qo(a, i, s),
      firstRender: !1
    };
  }, t.handleExited = function(a, o) {
    var i = Tn(this.props.children);
    a.key in i || (a.props.onExited && a.props.onExited(o), this.mounted && this.setState(function(s) {
      var l = Vt({}, s.children);
      return delete l[a.key], {
        children: l
      };
    }));
  }, t.render = function() {
    var a = this.props, o = a.component, i = a.childFactory, s = xn(a, ["component", "childFactory"]), l = this.state.contextValue, u = Xo(this.state.children).map(i);
    return delete s.appear, delete s.enter, delete s.exit, o === null ? /* @__PURE__ */ k.createElement(jt.Provider, {
      value: l
    }, u) : /* @__PURE__ */ k.createElement(jt.Provider, {
      value: l
    }, /* @__PURE__ */ k.createElement(o, s, u));
  }, n;
}(k.Component);
Pn.propTypes = {};
Pn.defaultProps = Jo;
var Zo = function() {
  var e = 1, n = /* @__PURE__ */ new WeakMap(), t = function(r, a) {
    return typeof r == "number" || typeof r == "string" ? a ? "idx-".concat(a) : "val-".concat(r) : n.has(r) ? "uid" + n.get(r) : (n.set(r, e++), t(r));
  };
  return t;
}, Lr = function(e) {
  return e === void 0 && (e = ""), {
    value: 1,
    prefix: e,
    uid: Zo()
  };
}, Qo = Lr(), ei = c.createContext(Lr()), ti = function(e) {
  return e.value++;
}, ni = function(e) {
  return e ? e.prefix : "";
}, ri = function(e) {
  var n = e || Qo, t = ni(n), r = ti(n), a = t + r, o = function(i) {
    return a + n.uid(i);
  };
  return { uid: a, gen: o };
}, ai = function() {
  var e = c.useContext(ei), n = c.useState(function() {
    return ri(e);
  })[0];
  return n;
}, oi = function() {
  var e = ai().uid;
  return e;
}, ii = c.createContext({
  hasProvider: !1,
  stack: { current: [] }
}), Ir = { exports: {} }, Dr = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var He = c;
function si(e, n) {
  return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
}
var li = typeof Object.is == "function" ? Object.is : si, ui = He.useState, ci = He.useEffect, di = He.useLayoutEffect, pi = He.useDebugValue;
function fi(e, n) {
  var t = n(), r = ui({ inst: { value: t, getSnapshot: n } }), a = r[0].inst, o = r[1];
  return di(function() {
    a.value = t, a.getSnapshot = n, nn(a) && o({ inst: a });
  }, [e, t, n]), ci(function() {
    return nn(a) && o({ inst: a }), e(function() {
      nn(a) && o({ inst: a });
    });
  }, [e]), pi(t), t;
}
function nn(e) {
  var n = e.getSnapshot;
  e = e.value;
  try {
    var t = n();
    return !li(e, t);
  } catch {
    return !0;
  }
}
function vi(e, n) {
  return n();
}
var mi = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? vi : fi;
Dr.useSyncExternalStore = He.useSyncExternalStore !== void 0 ? He.useSyncExternalStore : mi;
Ir.exports = Dr;
var hi = Ir.exports, lt = [], It = [], gi = function(e) {
  e(lt), It.forEach(function(n) {
    return n();
  });
}, rn = {
  getSnapshot: function() {
    return lt;
  },
  subscribe: function(e) {
    return It.push(e), function() {
      var n = It.indexOf(e);
      It.splice(n, 1);
    };
  }
};
function Ei() {
  var e = hi.useSyncExternalStore(
    rn.subscribe,
    rn.getSnapshot,
    // server snapshot is the same as client snapshot
    rn.getSnapshot
  ), n = k.useCallback(function() {
    return e[e.length - 1];
  }, [e]), t = k.useCallback(function(i) {
    var s = e.findIndex(function(l) {
      return l.id === i;
    });
    return e.slice(s);
  }, [e]), r = k.useCallback(function() {
    gi(function(i) {
      return i.splice(0, i.length);
    });
  }, []), a = k.useCallback(function(i) {
    lt.push(i), i.props.usePortal && i.props.hasBackdrop && document.body.classList.add(pt);
  }, []), o = k.useCallback(function(i) {
    var s = e.filter(function(u) {
      return u.props.usePortal && u.props.hasBackdrop && u.id !== i;
    }), l = lt.findIndex(function(u) {
      return u.id === i;
    });
    l > -1 && lt.splice(l, 1), s.length === 0 && document.body.classList.remove(pt);
  }, [e]);
  return {
    closeOverlay: o,
    getLastOpened: n,
    getThisOverlayAndDescendants: t,
    openOverlay: a,
    resetStack: r
  };
}
function yi() {
  var e = k.useContext(ii), n = e.stack, t = e.hasProvider, r = Ei(), a = k.useCallback(function() {
    return n.current[n.current.length - 1];
  }, [n]), o = k.useCallback(function(u) {
    var d = n.current.findIndex(function(p) {
      return p.id === u;
    });
    return d === -1 ? [] : n.current.slice(d);
  }, [n]), i = k.useCallback(function() {
    n.current = [];
  }, [n]), s = k.useCallback(function(u) {
    n.current.push(u), u.props.usePortal && u.props.hasBackdrop && document.body.classList.add(pt);
  }, [n]), l = k.useCallback(function(u) {
    var d = n.current.filter(function(f) {
      return f.props.usePortal && f.props.hasBackdrop && f.id !== u;
    }), p = n.current.findIndex(function(f) {
      return f.id === u;
    });
    p > -1 && n.current.splice(p, 1), d.length === 0 && document.body.classList.remove(pt);
  }, [n]);
  return t ? {
    closeOverlay: l,
    getLastOpened: a,
    getThisOverlayAndDescendants: o,
    openOverlay: s,
    resetStack: i
  } : (Ht("development") && console.error(fa), r);
}
function Ci(e) {
  var n = c.useRef();
  return c.useEffect(function() {
    n.current = e;
  }, [e]), n.current;
}
function an(e) {
  var n = X(e), t = n != null ? Array.from(
    // Order may not be correct if children elements use tabindex values > 0.
    // Selectors derived from this SO question:
    // https://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus
    n.querySelectorAll([
      'a[href]:not([tabindex="-1"])',
      'button:not([disabled]):not([tabindex="-1"])',
      'details:not([tabindex="-1"])',
      'input:not([disabled]):not([tabindex="-1"])',
      'select:not([disabled]):not([tabindex="-1"])',
      'textarea:not([disabled]):not([tabindex="-1"])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(","))
  ) : [];
  return t.filter(function(r) {
    return !r.classList.contains(Cr) && !r.classList.contains(Or);
  });
}
var Oi = c.createContext({}), bi = {
  blueprintPortalClassName: function(e, n) {
    if (e[n] != null && typeof e[n] != "string")
      return new Error(ga);
  }
};
function wn(e, n) {
  var t, r = e.className, a = e.stopPropagationEvents, o = e.container, i = e.onChildrenMount, s = e.children;
  n === void 0 && (n = {});
  var l = c.useContext(Oi), u = (t = o ?? l.portalContainer) !== null && t !== void 0 ? t : typeof document < "u" ? document.body : void 0, d = c.useState(), p = d[0], f = d[1], v = c.useCallback(function() {
    var m = document.createElement("div");
    m.classList.add(va), xt(m.classList, r), xt(m.classList, l.portalClassName), er(m, a);
    var g = n.blueprintPortalClassName;
    return g != null && g !== "" && (console.error(ma), xt(m.classList, g)), m;
  }, [r, l.portalClassName, n.blueprintPortalClassName, a]);
  return c.useEffect(function() {
    if (u != null) {
      var m = v();
      return u.appendChild(m), f(m), function() {
        tr(m, a), m.remove(), f(void 0);
      };
    }
  }, [u, v, a]), c.useEffect(function() {
    p != null && i?.();
  }, [p, i]), c.useEffect(function() {
    if (p != null)
      return xt(p.classList, r), function() {
        return Ri(p.classList, r);
      };
  }, [r, p]), c.useEffect(function() {
    if (p != null)
      return er(p, a), function() {
        return tr(p, a);
      };
  }, [p, a]), typeof document > "u" || p == null ? null : br.createPortal(s, p);
}
wn.displayName = "".concat(F, ".Portal");
ha() || (wn.contextTypes = bi);
function Ri(e, n) {
  n != null && n !== "" && e.remove.apply(e, n.split(" "));
}
function xt(e, n) {
  n != null && n !== "" && e.add.apply(e, n.split(" "));
}
function er(e, n) {
  n?.forEach(function(t) {
    return e.addEventListener(t, kr);
  });
}
function tr(e, n) {
  n?.forEach(function(t) {
    return e.removeEventListener(t, kr);
  });
}
function kr(e) {
  e.stopPropagation();
}
var gt = c.forwardRef(function(e, n) {
  var t, r, a, o = e.autoFocus, i = e.backdropClassName, s = e.backdropProps, l = e.canEscapeKeyClose, u = e.canOutsideClickClose, d = e.childRef, p = e.childRefs, f = e.children, v = e.className, m = e.enforceFocus, g = e.hasBackdrop, h = e.isOpen, R = e.lazy, b = e.onClose, N = e.onClosed, y = e.onClosing, x = e.onOpened, T = e.onOpening, P = e.portalClassName, L = e.portalContainer, I = e.shouldReturnFocusOnClose, w = e.transitionDuration, A = e.transitionName, j = e.usePortal;
  Si(e);
  var D = yi(), ne = D.closeOverlay, K = D.getLastOpened, U = D.getThisOverlayAndDescendants, H = D.openOverlay, Re = c.useState(!1), Y = Re[0], Se = Re[1], ke = c.useState(!1), xe = ke[0], Me = ke[1], ce = c.useRef(null), V = c.useRef(null), Ce = c.useRef(null), Oe = c.useRef(null), ee = c.useRef(null), Ve = c.useRef(null), re = c.useCallback(function() {
    return requestAnimationFrame(function() {
      var C, S = X(V), _ = Gn(S);
      if (!(S == null || _ == null)) {
        var fe = !S.contains(_);
        fe && ((C = X(Oe)) === null || C === void 0 || C.focus({ preventScroll: !0 }), Se(!1));
      }
    });
  }, []), ae = xi(), qe = c.useRef(null), oe = c.useCallback(function(C) {
    var S = C.composed ? C.composedPath()[0] : C.target, _ = X(V);
    _ != null && S instanceof Node && !_.contains(S) && (C.preventDefault(), C.stopImmediatePropagation(), re());
  }, [re]), de = c.useCallback(function(C) {
    var S = C.composed ? C.composedPath()[0] : C.target, _ = U(ae), fe = _.some(function(se) {
      var pa = se.containerElement, Rt = X(pa);
      return Rt?.contains(S) && !Rt.isSameNode(S);
    });
    fe || b?.(C);
  }, [U, ae, b]), Zt = c.useMemo(function() {
    return Mt(n, qe);
  }, [n]);
  c.useImperativeHandle(Zt, function() {
    return {
      bringFocusInsideOverlay: re,
      containerElement: V,
      handleDocumentFocus: oe,
      handleDocumentMousedown: de,
      id: ae,
      props: {
        autoFocus: o,
        enforceFocus: m,
        hasBackdrop: g,
        usePortal: j
      }
    };
  }, [
    o,
    re,
    m,
    oe,
    de,
    g,
    ae,
    j
  ]);
  var Ct = c.useCallback(function(C) {
    C.key === "Escape" && l && (b?.(C), C.stopPropagation(), C.preventDefault());
  }, [l, b]), Xe = c.useCallback(function() {
    if (qe.current != null) {
      var C = K();
      C?.handleDocumentFocus !== void 0 && document.removeEventListener(
        "focus",
        C.handleDocumentFocus,
        /* useCapture */
        !0
      ), H(qe.current), o && (Se(!0), re()), sn(ce, Gn(X(V)));
    }
  }, [o, re, K, H]), je = c.useCallback(function() {
    var C;
    document.removeEventListener(
      "focus",
      oe,
      /* useCapture */
      !0
    ), document.removeEventListener("mousedown", de), ne(ae);
    var S = K();
    S !== void 0 && S.props.autoFocus && S.props.enforceFocus && ((C = S.bringFocusInsideOverlay) === null || C === void 0 || C.call(S), S.handleDocumentFocus !== void 0 && document.addEventListener(
      "focus",
      S.handleDocumentFocus,
      /* useCapture */
      !0
    ));
  }, [ne, K, oe, de, ae]), Je = (r = Ci(h)) !== null && r !== void 0 ? r : !1;
  c.useEffect(function() {
    h && Me(!0), !Je && h && Xe(), Je && !h && je();
  }, [h, Xe, je, Je]), c.useEffect(function() {
    if (!(!h || !(u && !g)))
      return document.addEventListener("mousedown", de), function() {
        document.removeEventListener("mousedown", de);
      };
  }, [de, h, u, g]), c.useEffect(function() {
    if (!(!h || !m))
      return document.addEventListener(
        "focus",
        oe,
        /* useCapture */
        !0
      ), function() {
        document.removeEventListener(
          "focus",
          oe,
          /* useCapture */
          !0
        );
      };
  }, [oe, m, h]);
  var ie = c.useRef(je);
  ie.current = je, c.useEffect(function() {
    return function() {
      ie.current();
    };
  }, []);
  var Ne = c.useCallback(function(C) {
    var S = X(ce);
    I && S instanceof HTMLElement && S.focus(), N?.(C);
  }, [N, I]), pe = c.useCallback(function() {
  }, []), Ze = c.useCallback(function(C) {
    if (d != null)
      return d;
    if (p != null) {
      var S = C.key;
      if (S == null) {
        Ht("production") || console.error(Ea);
        return;
      }
      return p[S];
    }
  }, [d, p]), Qe = c.useCallback(function(C) {
    if (C == null || Rr(C))
      return null;
    var S = Ze(C), _ = ya(C) ? C.props : {}, fe = Sr(C, "span", {
      className: B(_.className, Ca),
      // IMPORTANT: only inject our ref if the user didn't specify childRef or childRefs already. Otherwise,
      // we risk clobbering the user's ref (which we cannot inspect here while cloning/decorating the child).
      ref: S === void 0 ? Ve : void 0,
      tabIndex: m || o ? 0 : void 0
    }), se = S ?? Ve;
    return c.createElement(st, {
      addEndListener: pe,
      classNames: A,
      // HACKHACK: CSSTransition types are slightly incompatible with React types here.
      // React prefers `| null` but not `| undefined` for the ref value, while
      // CSSTransition _demands_ that `| undefined` be part of the element type.
      nodeRef: se,
      onEntered: Nt(x, se),
      onEntering: Nt(T, se),
      onExited: Nt(Ne, se),
      onExiting: Nt(y, se),
      timeout: w
    }, fe);
  }, [
    o,
    m,
    Ze,
    pe,
    Ne,
    y,
    x,
    T,
    w,
    A
  ]), et = c.useCallback(function(C) {
    var S;
    u && b?.(C), m && re(), (S = s?.onMouseDown) === null || S === void 0 || S.call(s, C);
  }, [s, re, u, m, b]), tt = c.useCallback(function(C, S) {
    return c.createElement(
      st,
      { addEndListener: pe, classNames: A, key: C, nodeRef: S.ref, timeout: w, unmountOnExit: !0 },
      c.createElement("div", E({ tabIndex: 0 }, S))
    );
  }, [pe, w, A]), Ot = c.useCallback(function(C) {
    if (!(!m || Y)) {
      var S = X(V), _ = X(ee);
      C.relatedTarget != null && S?.contains(C.relatedTarget) && C.relatedTarget !== _ && _?.focus({ preventScroll: !0 });
    }
  }, [m, Y]), bt = c.useCallback(function(C) {
    var S;
    if (m && C.shiftKey && C.key === "Tab") {
      var _ = an(V).pop();
      _ != null ? _.focus() : (S = X(ee)) === null || S === void 0 || S.focus({ preventScroll: !0 });
    }
  }, [m]), da = c.useCallback(function(C) {
    var S, _ = X(Oe);
    if (C.relatedTarget != null && (!((S = X(V)) === null || S === void 0) && S.contains(C.relatedTarget)) && C.relatedTarget !== _) {
      var fe = an(V).shift();
      !Y && fe != null && fe !== C.relatedTarget ? fe.focus() : _?.focus({ preventScroll: !0 });
    } else {
      var se = an(V).pop();
      se != null ? se.focus() : _?.focus({ preventScroll: !0 });
    }
  }, [Y]), Un = c.useMemo(function() {
    return g && h ? c.createElement(
      st,
      { classNames: A, key: "__backdrop", nodeRef: Ce, timeout: w, addEndListener: pe },
      c.createElement("div", E({}, s, { className: B(Oa, i, s?.className), onMouseDown: et, ref: Ce }))
    ) : null;
  }, [
    i,
    s,
    et,
    pe,
    g,
    h,
    w,
    A
  ]);
  if (R && !xe)
    return null;
  var nt = h ? (a = c.Children.map(f, Qe)) !== null && a !== void 0 ? a : [] : [];
  Un !== null && nt.unshift(Un), h && (o || m) && nt.length > 0 && (nt.unshift(tt("__start", {
    className: Cr,
    onFocus: Ot,
    onKeyDown: bt,
    ref: Oe
  })), m && nt.push(tt("__end", {
    className: Or,
    onFocus: da,
    ref: ee
  })));
  var Hn = c.createElement(
    "div",
    { "aria-live": "polite", className: B(xr, (t = {}, t[pt] = h, t[ba] = !j, t), v), onKeyDown: Ct, ref: V },
    c.createElement(Pn, { appear: !0, component: null }, nt)
  );
  return j ? c.createElement(wn, { className: P, container: L }, Hn) : Hn;
});
gt.defaultProps = {
  autoFocus: !0,
  backdropProps: {},
  canEscapeKeyClose: !0,
  canOutsideClickClose: !0,
  enforceFocus: !0,
  hasBackdrop: !0,
  isOpen: !1,
  lazy: Ra(),
  shouldReturnFocusOnClose: !0,
  transitionDuration: 300,
  transitionName: xr,
  usePortal: !0
};
gt.displayName = "".concat(F, ".Overlay2");
function Si(e) {
  var n = e.childRef, t = e.childRefs, r = e.children, a = c.Children.count(r);
  c.useEffect(function() {
    Ht("production") || (n != null && t != null && console.error(Sa), a > 1 && t == null && console.error(xa));
  }, [n, t, a]);
}
function xi() {
  var e = oi();
  return "".concat(gt.displayName, "-").concat(e);
}
function Nt(e, n) {
  return function() {
    n?.current != null && e?.(n.current);
  };
}
var Mr = c.createContext(), Vr = c.createContext();
function Ni(e) {
  var n = e.children, t = c.useState(null), r = t[0], a = t[1], o = c.useRef(!1);
  c.useEffect(function() {
    return function() {
      o.current = !0;
    };
  }, []);
  var i = c.useCallback(function(s) {
    o.current || a(s);
  }, []);
  return /* @__PURE__ */ c.createElement(Mr.Provider, {
    value: r
  }, /* @__PURE__ */ c.createElement(Vr.Provider, {
    value: i
  }, n));
}
var jr = function(n) {
  return Array.isArray(n) ? n[0] : n;
}, Br = function(n) {
  if (typeof n == "function") {
    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
      r[a - 1] = arguments[a];
    return n.apply(void 0, r);
  }
}, fn = function(n, t) {
  if (typeof n == "function")
    return Br(n, t);
  n != null && (n.current = t);
}, nr = function(n) {
  return n.reduce(function(t, r) {
    var a = r[0], o = r[1];
    return t[a] = o, t;
  }, {});
}, rr = typeof window < "u" && window.document && window.document.createElement ? c.useLayoutEffect : c.useEffect, W = "top", Z = "bottom", Q = "right", z = "left", An = "auto", Et = [W, Z, Q, z], Ge = "start", ft = "end", Ti = "clippingParents", Fr = "viewport", at = "popper", Pi = "reference", ar = /* @__PURE__ */ Et.reduce(function(e, n) {
  return e.concat([n + "-" + Ge, n + "-" + ft]);
}, []), Ur = /* @__PURE__ */ [].concat(Et, [An]).reduce(function(e, n) {
  return e.concat([n, n + "-" + Ge, n + "-" + ft]);
}, []), wi = "beforeRead", Ai = "read", _i = "afterRead", Li = "beforeMain", Ii = "main", Di = "afterMain", ki = "beforeWrite", Mi = "write", Vi = "afterWrite", ji = [wi, Ai, _i, Li, Ii, Di, ki, Mi, Vi];
function ue(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function $(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var n = e.ownerDocument;
    return n && n.defaultView || window;
  }
  return e;
}
function Le(e) {
  var n = $(e).Element;
  return e instanceof n || e instanceof Element;
}
function J(e) {
  var n = $(e).HTMLElement;
  return e instanceof n || e instanceof HTMLElement;
}
function _n(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var n = $(e).ShadowRoot;
  return e instanceof n || e instanceof ShadowRoot;
}
function Bi(e) {
  var n = e.state;
  Object.keys(n.elements).forEach(function(t) {
    var r = n.styles[t] || {}, a = n.attributes[t] || {}, o = n.elements[t];
    !J(o) || !ue(o) || (Object.assign(o.style, r), Object.keys(a).forEach(function(i) {
      var s = a[i];
      s === !1 ? o.removeAttribute(i) : o.setAttribute(i, s === !0 ? "" : s);
    }));
  });
}
function Fi(e) {
  var n = e.state, t = {
    popper: {
      position: n.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(n.elements.popper.style, t.popper), n.styles = t, n.elements.arrow && Object.assign(n.elements.arrow.style, t.arrow), function() {
    Object.keys(n.elements).forEach(function(r) {
      var a = n.elements[r], o = n.attributes[r] || {}, i = Object.keys(n.styles.hasOwnProperty(r) ? n.styles[r] : t[r]), s = i.reduce(function(l, u) {
        return l[u] = "", l;
      }, {});
      !J(a) || !ue(a) || (Object.assign(a.style, s), Object.keys(o).forEach(function(l) {
        a.removeAttribute(l);
      }));
    });
  };
}
const Ui = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Bi,
  effect: Fi,
  requires: ["computeStyles"]
};
function le(e) {
  return e.split("-")[0];
}
var Ae = Math.max, Bt = Math.min, We = Math.round;
function vn() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(n) {
    return n.brand + "/" + n.version;
  }).join(" ") : navigator.userAgent;
}
function Hr() {
  return !/^((?!chrome|android).)*safari/i.test(vn());
}
function ze(e, n, t) {
  n === void 0 && (n = !1), t === void 0 && (t = !1);
  var r = e.getBoundingClientRect(), a = 1, o = 1;
  n && J(e) && (a = e.offsetWidth > 0 && We(r.width) / e.offsetWidth || 1, o = e.offsetHeight > 0 && We(r.height) / e.offsetHeight || 1);
  var i = Le(e) ? $(e) : window, s = i.visualViewport, l = !Hr() && t, u = (r.left + (l && s ? s.offsetLeft : 0)) / a, d = (r.top + (l && s ? s.offsetTop : 0)) / o, p = r.width / a, f = r.height / o;
  return {
    width: p,
    height: f,
    top: d,
    right: u + p,
    bottom: d + f,
    left: u,
    x: u,
    y: d
  };
}
function Ln(e) {
  var n = ze(e), t = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(n.width - t) <= 1 && (t = n.width), Math.abs(n.height - r) <= 1 && (r = n.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: t,
    height: r
  };
}
function Gr(e, n) {
  var t = n.getRootNode && n.getRootNode();
  if (e.contains(n))
    return !0;
  if (t && _n(t)) {
    var r = n;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function ge(e) {
  return $(e).getComputedStyle(e);
}
function Hi(e) {
  return ["table", "td", "th"].indexOf(ue(e)) >= 0;
}
function be(e) {
  return ((Le(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function zt(e) {
  return ue(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (_n(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    be(e)
  );
}
function or(e) {
  return !J(e) || // https://github.com/popperjs/popper-core/issues/837
  ge(e).position === "fixed" ? null : e.offsetParent;
}
function Gi(e) {
  var n = /firefox/i.test(vn()), t = /Trident/i.test(vn());
  if (t && J(e)) {
    var r = ge(e);
    if (r.position === "fixed")
      return null;
  }
  var a = zt(e);
  for (_n(a) && (a = a.host); J(a) && ["html", "body"].indexOf(ue(a)) < 0; ) {
    var o = ge(a);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || n && o.willChange === "filter" || n && o.filter && o.filter !== "none")
      return a;
    a = a.parentNode;
  }
  return null;
}
function yt(e) {
  for (var n = $(e), t = or(e); t && Hi(t) && ge(t).position === "static"; )
    t = or(t);
  return t && (ue(t) === "html" || ue(t) === "body" && ge(t).position === "static") ? n : t || Gi(e) || n;
}
function In(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function ut(e, n, t) {
  return Ae(e, Bt(n, t));
}
function Wi(e, n, t) {
  var r = ut(e, n, t);
  return r > t ? t : r;
}
function Wr() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function zr(e) {
  return Object.assign({}, Wr(), e);
}
function $r(e, n) {
  return n.reduce(function(t, r) {
    return t[r] = e, t;
  }, {});
}
var zi = function(n, t) {
  return n = typeof n == "function" ? n(Object.assign({}, t.rects, {
    placement: t.placement
  })) : n, zr(typeof n != "number" ? n : $r(n, Et));
};
function $i(e) {
  var n, t = e.state, r = e.name, a = e.options, o = t.elements.arrow, i = t.modifiersData.popperOffsets, s = le(t.placement), l = In(s), u = [z, Q].indexOf(s) >= 0, d = u ? "height" : "width";
  if (!(!o || !i)) {
    var p = zi(a.padding, t), f = Ln(o), v = l === "y" ? W : z, m = l === "y" ? Z : Q, g = t.rects.reference[d] + t.rects.reference[l] - i[l] - t.rects.popper[d], h = i[l] - t.rects.reference[l], R = yt(o), b = R ? l === "y" ? R.clientHeight || 0 : R.clientWidth || 0 : 0, N = g / 2 - h / 2, y = p[v], x = b - f[d] - p[m], T = b / 2 - f[d] / 2 + N, P = ut(y, T, x), L = l;
    t.modifiersData[r] = (n = {}, n[L] = P, n.centerOffset = P - T, n);
  }
}
function Ki(e) {
  var n = e.state, t = e.options, r = t.element, a = r === void 0 ? "[data-popper-arrow]" : r;
  a != null && (typeof a == "string" && (a = n.elements.popper.querySelector(a), !a) || Gr(n.elements.popper, a) && (n.elements.arrow = a));
}
const Yi = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: $i,
  effect: Ki,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function $e(e) {
  return e.split("-")[1];
}
var qi = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Xi(e, n) {
  var t = e.x, r = e.y, a = n.devicePixelRatio || 1;
  return {
    x: We(t * a) / a || 0,
    y: We(r * a) / a || 0
  };
}
function ir(e) {
  var n, t = e.popper, r = e.popperRect, a = e.placement, o = e.variation, i = e.offsets, s = e.position, l = e.gpuAcceleration, u = e.adaptive, d = e.roundOffsets, p = e.isFixed, f = i.x, v = f === void 0 ? 0 : f, m = i.y, g = m === void 0 ? 0 : m, h = typeof d == "function" ? d({
    x: v,
    y: g
  }) : {
    x: v,
    y: g
  };
  v = h.x, g = h.y;
  var R = i.hasOwnProperty("x"), b = i.hasOwnProperty("y"), N = z, y = W, x = window;
  if (u) {
    var T = yt(t), P = "clientHeight", L = "clientWidth";
    if (T === $(t) && (T = be(t), ge(T).position !== "static" && s === "absolute" && (P = "scrollHeight", L = "scrollWidth")), T = T, a === W || (a === z || a === Q) && o === ft) {
      y = Z;
      var I = p && T === x && x.visualViewport ? x.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        T[P]
      );
      g -= I - r.height, g *= l ? 1 : -1;
    }
    if (a === z || (a === W || a === Z) && o === ft) {
      N = Q;
      var w = p && T === x && x.visualViewport ? x.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        T[L]
      );
      v -= w - r.width, v *= l ? 1 : -1;
    }
  }
  var A = Object.assign({
    position: s
  }, u && qi), j = d === !0 ? Xi({
    x: v,
    y: g
  }, $(t)) : {
    x: v,
    y: g
  };
  if (v = j.x, g = j.y, l) {
    var D;
    return Object.assign({}, A, (D = {}, D[y] = b ? "0" : "", D[N] = R ? "0" : "", D.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + v + "px, " + g + "px)" : "translate3d(" + v + "px, " + g + "px, 0)", D));
  }
  return Object.assign({}, A, (n = {}, n[y] = b ? g + "px" : "", n[N] = R ? v + "px" : "", n.transform = "", n));
}
function Ji(e) {
  var n = e.state, t = e.options, r = t.gpuAcceleration, a = r === void 0 ? !0 : r, o = t.adaptive, i = o === void 0 ? !0 : o, s = t.roundOffsets, l = s === void 0 ? !0 : s, u = {
    placement: le(n.placement),
    variation: $e(n.placement),
    popper: n.elements.popper,
    popperRect: n.rects.popper,
    gpuAcceleration: a,
    isFixed: n.options.strategy === "fixed"
  };
  n.modifiersData.popperOffsets != null && (n.styles.popper = Object.assign({}, n.styles.popper, ir(Object.assign({}, u, {
    offsets: n.modifiersData.popperOffsets,
    position: n.options.strategy,
    adaptive: i,
    roundOffsets: l
  })))), n.modifiersData.arrow != null && (n.styles.arrow = Object.assign({}, n.styles.arrow, ir(Object.assign({}, u, {
    offsets: n.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), n.attributes.popper = Object.assign({}, n.attributes.popper, {
    "data-popper-placement": n.placement
  });
}
const Zi = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Ji,
  data: {}
};
var Tt = {
  passive: !0
};
function Qi(e) {
  var n = e.state, t = e.instance, r = e.options, a = r.scroll, o = a === void 0 ? !0 : a, i = r.resize, s = i === void 0 ? !0 : i, l = $(n.elements.popper), u = [].concat(n.scrollParents.reference, n.scrollParents.popper);
  return o && u.forEach(function(d) {
    d.addEventListener("scroll", t.update, Tt);
  }), s && l.addEventListener("resize", t.update, Tt), function() {
    o && u.forEach(function(d) {
      d.removeEventListener("scroll", t.update, Tt);
    }), s && l.removeEventListener("resize", t.update, Tt);
  };
}
const es = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Qi,
  data: {}
};
var ts = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Dt(e) {
  return e.replace(/left|right|bottom|top/g, function(n) {
    return ts[n];
  });
}
var ns = {
  start: "end",
  end: "start"
};
function sr(e) {
  return e.replace(/start|end/g, function(n) {
    return ns[n];
  });
}
function Dn(e) {
  var n = $(e), t = n.pageXOffset, r = n.pageYOffset;
  return {
    scrollLeft: t,
    scrollTop: r
  };
}
function kn(e) {
  return ze(be(e)).left + Dn(e).scrollLeft;
}
function rs(e, n) {
  var t = $(e), r = be(e), a = t.visualViewport, o = r.clientWidth, i = r.clientHeight, s = 0, l = 0;
  if (a) {
    o = a.width, i = a.height;
    var u = Hr();
    (u || !u && n === "fixed") && (s = a.offsetLeft, l = a.offsetTop);
  }
  return {
    width: o,
    height: i,
    x: s + kn(e),
    y: l
  };
}
function as(e) {
  var n, t = be(e), r = Dn(e), a = (n = e.ownerDocument) == null ? void 0 : n.body, o = Ae(t.scrollWidth, t.clientWidth, a ? a.scrollWidth : 0, a ? a.clientWidth : 0), i = Ae(t.scrollHeight, t.clientHeight, a ? a.scrollHeight : 0, a ? a.clientHeight : 0), s = -r.scrollLeft + kn(e), l = -r.scrollTop;
  return ge(a || t).direction === "rtl" && (s += Ae(t.clientWidth, a ? a.clientWidth : 0) - o), {
    width: o,
    height: i,
    x: s,
    y: l
  };
}
function Mn(e) {
  var n = ge(e), t = n.overflow, r = n.overflowX, a = n.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + a + r);
}
function Kr(e) {
  return ["html", "body", "#document"].indexOf(ue(e)) >= 0 ? e.ownerDocument.body : J(e) && Mn(e) ? e : Kr(zt(e));
}
function ct(e, n) {
  var t;
  n === void 0 && (n = []);
  var r = Kr(e), a = r === ((t = e.ownerDocument) == null ? void 0 : t.body), o = $(r), i = a ? [o].concat(o.visualViewport || [], Mn(r) ? r : []) : r, s = n.concat(i);
  return a ? s : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    s.concat(ct(zt(i)))
  );
}
function mn(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function os(e, n) {
  var t = ze(e, !1, n === "fixed");
  return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t;
}
function lr(e, n, t) {
  return n === Fr ? mn(rs(e, t)) : Le(n) ? os(n, t) : mn(as(be(e)));
}
function is(e) {
  var n = ct(zt(e)), t = ["absolute", "fixed"].indexOf(ge(e).position) >= 0, r = t && J(e) ? yt(e) : e;
  return Le(r) ? n.filter(function(a) {
    return Le(a) && Gr(a, r) && ue(a) !== "body";
  }) : [];
}
function ss(e, n, t, r) {
  var a = n === "clippingParents" ? is(e) : [].concat(n), o = [].concat(a, [t]), i = o[0], s = o.reduce(function(l, u) {
    var d = lr(e, u, r);
    return l.top = Ae(d.top, l.top), l.right = Bt(d.right, l.right), l.bottom = Bt(d.bottom, l.bottom), l.left = Ae(d.left, l.left), l;
  }, lr(e, i, r));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function Yr(e) {
  var n = e.reference, t = e.element, r = e.placement, a = r ? le(r) : null, o = r ? $e(r) : null, i = n.x + n.width / 2 - t.width / 2, s = n.y + n.height / 2 - t.height / 2, l;
  switch (a) {
    case W:
      l = {
        x: i,
        y: n.y - t.height
      };
      break;
    case Z:
      l = {
        x: i,
        y: n.y + n.height
      };
      break;
    case Q:
      l = {
        x: n.x + n.width,
        y: s
      };
      break;
    case z:
      l = {
        x: n.x - t.width,
        y: s
      };
      break;
    default:
      l = {
        x: n.x,
        y: n.y
      };
  }
  var u = a ? In(a) : null;
  if (u != null) {
    var d = u === "y" ? "height" : "width";
    switch (o) {
      case Ge:
        l[u] = l[u] - (n[d] / 2 - t[d] / 2);
        break;
      case ft:
        l[u] = l[u] + (n[d] / 2 - t[d] / 2);
        break;
    }
  }
  return l;
}
function vt(e, n) {
  n === void 0 && (n = {});
  var t = n, r = t.placement, a = r === void 0 ? e.placement : r, o = t.strategy, i = o === void 0 ? e.strategy : o, s = t.boundary, l = s === void 0 ? Ti : s, u = t.rootBoundary, d = u === void 0 ? Fr : u, p = t.elementContext, f = p === void 0 ? at : p, v = t.altBoundary, m = v === void 0 ? !1 : v, g = t.padding, h = g === void 0 ? 0 : g, R = zr(typeof h != "number" ? h : $r(h, Et)), b = f === at ? Pi : at, N = e.rects.popper, y = e.elements[m ? b : f], x = ss(Le(y) ? y : y.contextElement || be(e.elements.popper), l, d, i), T = ze(e.elements.reference), P = Yr({
    reference: T,
    element: N,
    strategy: "absolute",
    placement: a
  }), L = mn(Object.assign({}, N, P)), I = f === at ? L : T, w = {
    top: x.top - I.top + R.top,
    bottom: I.bottom - x.bottom + R.bottom,
    left: x.left - I.left + R.left,
    right: I.right - x.right + R.right
  }, A = e.modifiersData.offset;
  if (f === at && A) {
    var j = A[a];
    Object.keys(w).forEach(function(D) {
      var ne = [Q, Z].indexOf(D) >= 0 ? 1 : -1, K = [W, Z].indexOf(D) >= 0 ? "y" : "x";
      w[D] += j[K] * ne;
    });
  }
  return w;
}
function ls(e, n) {
  n === void 0 && (n = {});
  var t = n, r = t.placement, a = t.boundary, o = t.rootBoundary, i = t.padding, s = t.flipVariations, l = t.allowedAutoPlacements, u = l === void 0 ? Ur : l, d = $e(r), p = d ? s ? ar : ar.filter(function(m) {
    return $e(m) === d;
  }) : Et, f = p.filter(function(m) {
    return u.indexOf(m) >= 0;
  });
  f.length === 0 && (f = p);
  var v = f.reduce(function(m, g) {
    return m[g] = vt(e, {
      placement: g,
      boundary: a,
      rootBoundary: o,
      padding: i
    })[le(g)], m;
  }, {});
  return Object.keys(v).sort(function(m, g) {
    return v[m] - v[g];
  });
}
function us(e) {
  if (le(e) === An)
    return [];
  var n = Dt(e);
  return [sr(e), n, sr(n)];
}
function cs(e) {
  var n = e.state, t = e.options, r = e.name;
  if (!n.modifiersData[r]._skip) {
    for (var a = t.mainAxis, o = a === void 0 ? !0 : a, i = t.altAxis, s = i === void 0 ? !0 : i, l = t.fallbackPlacements, u = t.padding, d = t.boundary, p = t.rootBoundary, f = t.altBoundary, v = t.flipVariations, m = v === void 0 ? !0 : v, g = t.allowedAutoPlacements, h = n.options.placement, R = le(h), b = R === h, N = l || (b || !m ? [Dt(h)] : us(h)), y = [h].concat(N).reduce(function(ce, V) {
      return ce.concat(le(V) === An ? ls(n, {
        placement: V,
        boundary: d,
        rootBoundary: p,
        padding: u,
        flipVariations: m,
        allowedAutoPlacements: g
      }) : V);
    }, []), x = n.rects.reference, T = n.rects.popper, P = /* @__PURE__ */ new Map(), L = !0, I = y[0], w = 0; w < y.length; w++) {
      var A = y[w], j = le(A), D = $e(A) === Ge, ne = [W, Z].indexOf(j) >= 0, K = ne ? "width" : "height", U = vt(n, {
        placement: A,
        boundary: d,
        rootBoundary: p,
        altBoundary: f,
        padding: u
      }), H = ne ? D ? Q : z : D ? Z : W;
      x[K] > T[K] && (H = Dt(H));
      var Re = Dt(H), Y = [];
      if (o && Y.push(U[j] <= 0), s && Y.push(U[H] <= 0, U[Re] <= 0), Y.every(function(ce) {
        return ce;
      })) {
        I = A, L = !1;
        break;
      }
      P.set(A, Y);
    }
    if (L)
      for (var Se = m ? 3 : 1, ke = function(V) {
        var Ce = y.find(function(Oe) {
          var ee = P.get(Oe);
          if (ee)
            return ee.slice(0, V).every(function(Ve) {
              return Ve;
            });
        });
        if (Ce)
          return I = Ce, "break";
      }, xe = Se; xe > 0; xe--) {
        var Me = ke(xe);
        if (Me === "break") break;
      }
    n.placement !== I && (n.modifiersData[r]._skip = !0, n.placement = I, n.reset = !0);
  }
}
const ds = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: cs,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function ur(e, n, t) {
  return t === void 0 && (t = {
    x: 0,
    y: 0
  }), {
    top: e.top - n.height - t.y,
    right: e.right - n.width + t.x,
    bottom: e.bottom - n.height + t.y,
    left: e.left - n.width - t.x
  };
}
function cr(e) {
  return [W, Q, Z, z].some(function(n) {
    return e[n] >= 0;
  });
}
function ps(e) {
  var n = e.state, t = e.name, r = n.rects.reference, a = n.rects.popper, o = n.modifiersData.preventOverflow, i = vt(n, {
    elementContext: "reference"
  }), s = vt(n, {
    altBoundary: !0
  }), l = ur(i, r), u = ur(s, a, o), d = cr(l), p = cr(u);
  n.modifiersData[t] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: u,
    isReferenceHidden: d,
    hasPopperEscaped: p
  }, n.attributes.popper = Object.assign({}, n.attributes.popper, {
    "data-popper-reference-hidden": d,
    "data-popper-escaped": p
  });
}
const fs = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: ps
};
function vs(e, n, t) {
  var r = le(e), a = [z, W].indexOf(r) >= 0 ? -1 : 1, o = typeof t == "function" ? t(Object.assign({}, n, {
    placement: e
  })) : t, i = o[0], s = o[1];
  return i = i || 0, s = (s || 0) * a, [z, Q].indexOf(r) >= 0 ? {
    x: s,
    y: i
  } : {
    x: i,
    y: s
  };
}
function ms(e) {
  var n = e.state, t = e.options, r = e.name, a = t.offset, o = a === void 0 ? [0, 0] : a, i = Ur.reduce(function(d, p) {
    return d[p] = vs(p, n.rects, o), d;
  }, {}), s = i[n.placement], l = s.x, u = s.y;
  n.modifiersData.popperOffsets != null && (n.modifiersData.popperOffsets.x += l, n.modifiersData.popperOffsets.y += u), n.modifiersData[r] = i;
}
const hs = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: ms
};
function gs(e) {
  var n = e.state, t = e.name;
  n.modifiersData[t] = Yr({
    reference: n.rects.reference,
    element: n.rects.popper,
    strategy: "absolute",
    placement: n.placement
  });
}
const Es = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: gs,
  data: {}
};
function ys(e) {
  return e === "x" ? "y" : "x";
}
function Cs(e) {
  var n = e.state, t = e.options, r = e.name, a = t.mainAxis, o = a === void 0 ? !0 : a, i = t.altAxis, s = i === void 0 ? !1 : i, l = t.boundary, u = t.rootBoundary, d = t.altBoundary, p = t.padding, f = t.tether, v = f === void 0 ? !0 : f, m = t.tetherOffset, g = m === void 0 ? 0 : m, h = vt(n, {
    boundary: l,
    rootBoundary: u,
    padding: p,
    altBoundary: d
  }), R = le(n.placement), b = $e(n.placement), N = !b, y = In(R), x = ys(y), T = n.modifiersData.popperOffsets, P = n.rects.reference, L = n.rects.popper, I = typeof g == "function" ? g(Object.assign({}, n.rects, {
    placement: n.placement
  })) : g, w = typeof I == "number" ? {
    mainAxis: I,
    altAxis: I
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, I), A = n.modifiersData.offset ? n.modifiersData.offset[n.placement] : null, j = {
    x: 0,
    y: 0
  };
  if (T) {
    if (o) {
      var D, ne = y === "y" ? W : z, K = y === "y" ? Z : Q, U = y === "y" ? "height" : "width", H = T[y], Re = H + h[ne], Y = H - h[K], Se = v ? -L[U] / 2 : 0, ke = b === Ge ? P[U] : L[U], xe = b === Ge ? -L[U] : -P[U], Me = n.elements.arrow, ce = v && Me ? Ln(Me) : {
        width: 0,
        height: 0
      }, V = n.modifiersData["arrow#persistent"] ? n.modifiersData["arrow#persistent"].padding : Wr(), Ce = V[ne], Oe = V[K], ee = ut(0, P[U], ce[U]), Ve = N ? P[U] / 2 - Se - ee - Ce - w.mainAxis : ke - ee - Ce - w.mainAxis, re = N ? -P[U] / 2 + Se + ee + Oe + w.mainAxis : xe + ee + Oe + w.mainAxis, ae = n.elements.arrow && yt(n.elements.arrow), qe = ae ? y === "y" ? ae.clientTop || 0 : ae.clientLeft || 0 : 0, oe = (D = A?.[y]) != null ? D : 0, de = H + Ve - oe - qe, Zt = H + re - oe, Ct = ut(v ? Bt(Re, de) : Re, H, v ? Ae(Y, Zt) : Y);
      T[y] = Ct, j[y] = Ct - H;
    }
    if (s) {
      var Xe, je = y === "x" ? W : z, Je = y === "x" ? Z : Q, ie = T[x], Ne = x === "y" ? "height" : "width", pe = ie + h[je], Ze = ie - h[Je], Qe = [W, z].indexOf(R) !== -1, et = (Xe = A?.[x]) != null ? Xe : 0, tt = Qe ? pe : ie - P[Ne] - L[Ne] - et + w.altAxis, Ot = Qe ? ie + P[Ne] + L[Ne] - et - w.altAxis : Ze, bt = v && Qe ? Wi(tt, ie, Ot) : ut(v ? tt : pe, ie, v ? Ot : Ze);
      T[x] = bt, j[x] = bt - ie;
    }
    n.modifiersData[r] = j;
  }
}
const Os = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Cs,
  requiresIfExists: ["offset"]
};
function bs(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Rs(e) {
  return e === $(e) || !J(e) ? Dn(e) : bs(e);
}
function Ss(e) {
  var n = e.getBoundingClientRect(), t = We(n.width) / e.offsetWidth || 1, r = We(n.height) / e.offsetHeight || 1;
  return t !== 1 || r !== 1;
}
function xs(e, n, t) {
  t === void 0 && (t = !1);
  var r = J(n), a = J(n) && Ss(n), o = be(n), i = ze(e, a, t), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (r || !r && !t) && ((ue(n) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Mn(o)) && (s = Rs(n)), J(n) ? (l = ze(n, !0), l.x += n.clientLeft, l.y += n.clientTop) : o && (l.x = kn(o))), {
    x: i.left + s.scrollLeft - l.x,
    y: i.top + s.scrollTop - l.y,
    width: i.width,
    height: i.height
  };
}
function Ns(e) {
  var n = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(o) {
    n.set(o.name, o);
  });
  function a(o) {
    t.add(o.name);
    var i = [].concat(o.requires || [], o.requiresIfExists || []);
    i.forEach(function(s) {
      if (!t.has(s)) {
        var l = n.get(s);
        l && a(l);
      }
    }), r.push(o);
  }
  return e.forEach(function(o) {
    t.has(o.name) || a(o);
  }), r;
}
function Ts(e) {
  var n = Ns(e);
  return ji.reduce(function(t, r) {
    return t.concat(n.filter(function(a) {
      return a.phase === r;
    }));
  }, []);
}
function Ps(e) {
  var n;
  return function() {
    return n || (n = new Promise(function(t) {
      Promise.resolve().then(function() {
        n = void 0, t(e());
      });
    })), n;
  };
}
function ws(e) {
  var n = e.reduce(function(t, r) {
    var a = t[r.name];
    return t[r.name] = a ? Object.assign({}, a, r, {
      options: Object.assign({}, a.options, r.options),
      data: Object.assign({}, a.data, r.data)
    }) : r, t;
  }, {});
  return Object.keys(n).map(function(t) {
    return n[t];
  });
}
var dr = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function pr() {
  for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++)
    n[t] = arguments[t];
  return !n.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function As(e) {
  e === void 0 && (e = {});
  var n = e, t = n.defaultModifiers, r = t === void 0 ? [] : t, a = n.defaultOptions, o = a === void 0 ? dr : a;
  return function(s, l, u) {
    u === void 0 && (u = o);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, dr, o),
      modifiersData: {},
      elements: {
        reference: s,
        popper: l
      },
      attributes: {},
      styles: {}
    }, p = [], f = !1, v = {
      state: d,
      setOptions: function(R) {
        var b = typeof R == "function" ? R(d.options) : R;
        g(), d.options = Object.assign({}, o, d.options, b), d.scrollParents = {
          reference: Le(s) ? ct(s) : s.contextElement ? ct(s.contextElement) : [],
          popper: ct(l)
        };
        var N = Ts(ws([].concat(r, d.options.modifiers)));
        return d.orderedModifiers = N.filter(function(y) {
          return y.enabled;
        }), m(), v.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var R = d.elements, b = R.reference, N = R.popper;
          if (pr(b, N)) {
            d.rects = {
              reference: xs(b, yt(N), d.options.strategy === "fixed"),
              popper: Ln(N)
            }, d.reset = !1, d.placement = d.options.placement, d.orderedModifiers.forEach(function(w) {
              return d.modifiersData[w.name] = Object.assign({}, w.data);
            });
            for (var y = 0; y < d.orderedModifiers.length; y++) {
              if (d.reset === !0) {
                d.reset = !1, y = -1;
                continue;
              }
              var x = d.orderedModifiers[y], T = x.fn, P = x.options, L = P === void 0 ? {} : P, I = x.name;
              typeof T == "function" && (d = T({
                state: d,
                options: L,
                name: I,
                instance: v
              }) || d);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Ps(function() {
        return new Promise(function(h) {
          v.forceUpdate(), h(d);
        });
      }),
      destroy: function() {
        g(), f = !0;
      }
    };
    if (!pr(s, l))
      return v;
    v.setOptions(u).then(function(h) {
      !f && u.onFirstUpdate && u.onFirstUpdate(h);
    });
    function m() {
      d.orderedModifiers.forEach(function(h) {
        var R = h.name, b = h.options, N = b === void 0 ? {} : b, y = h.effect;
        if (typeof y == "function") {
          var x = y({
            state: d,
            name: R,
            instance: v,
            options: N
          }), T = function() {
          };
          p.push(x || T);
        }
      });
    }
    function g() {
      p.forEach(function(h) {
        return h();
      }), p = [];
    }
    return v;
  };
}
var _s = [es, Es, Zi, Ui, hs, ds, Os, Yi, fs], Ls = /* @__PURE__ */ As({
  defaultModifiers: _s
}), Is = typeof Element < "u", Ds = typeof Map == "function", ks = typeof Set == "function", Ms = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function kt(e, n) {
  if (e === n) return !0;
  if (e && n && typeof e == "object" && typeof n == "object") {
    if (e.constructor !== n.constructor) return !1;
    var t, r, a;
    if (Array.isArray(e)) {
      if (t = e.length, t != n.length) return !1;
      for (r = t; r-- !== 0; )
        if (!kt(e[r], n[r])) return !1;
      return !0;
    }
    var o;
    if (Ds && e instanceof Map && n instanceof Map) {
      if (e.size !== n.size) return !1;
      for (o = e.entries(); !(r = o.next()).done; )
        if (!n.has(r.value[0])) return !1;
      for (o = e.entries(); !(r = o.next()).done; )
        if (!kt(r.value[1], n.get(r.value[0]))) return !1;
      return !0;
    }
    if (ks && e instanceof Set && n instanceof Set) {
      if (e.size !== n.size) return !1;
      for (o = e.entries(); !(r = o.next()).done; )
        if (!n.has(r.value[0])) return !1;
      return !0;
    }
    if (Ms && ArrayBuffer.isView(e) && ArrayBuffer.isView(n)) {
      if (t = e.length, t != n.length) return !1;
      for (r = t; r-- !== 0; )
        if (e[r] !== n[r]) return !1;
      return !0;
    }
    if (e.constructor === RegExp) return e.source === n.source && e.flags === n.flags;
    if (e.valueOf !== Object.prototype.valueOf && typeof e.valueOf == "function" && typeof n.valueOf == "function") return e.valueOf() === n.valueOf();
    if (e.toString !== Object.prototype.toString && typeof e.toString == "function" && typeof n.toString == "function") return e.toString() === n.toString();
    if (a = Object.keys(e), t = a.length, t !== Object.keys(n).length) return !1;
    for (r = t; r-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(n, a[r])) return !1;
    if (Is && e instanceof Element) return !1;
    for (r = t; r-- !== 0; )
      if (!((a[r] === "_owner" || a[r] === "__v" || a[r] === "__o") && e.$$typeof) && !kt(e[a[r]], n[a[r]]))
        return !1;
    return !0;
  }
  return e !== e && n !== n;
}
var Vs = function(n, t) {
  try {
    return kt(n, t);
  } catch (r) {
    if ((r.message || "").match(/stack|recursion/i))
      return console.warn("react-fast-compare cannot handle circular refs"), !1;
    throw r;
  }
};
const js = /* @__PURE__ */ Nr(Vs);
var Bs = [], Fs = function(n, t, r) {
  r === void 0 && (r = {});
  var a = c.useRef(null), o = {
    onFirstUpdate: r.onFirstUpdate,
    placement: r.placement || "bottom",
    strategy: r.strategy || "absolute",
    modifiers: r.modifiers || Bs
  }, i = c.useState({
    styles: {
      popper: {
        position: o.strategy,
        left: "0",
        top: "0"
      },
      arrow: {
        position: "absolute"
      }
    },
    attributes: {}
  }), s = i[0], l = i[1], u = c.useMemo(function() {
    return {
      name: "updateState",
      enabled: !0,
      phase: "write",
      fn: function(v) {
        var m = v.state, g = Object.keys(m.elements);
        br.flushSync(function() {
          l({
            styles: nr(g.map(function(h) {
              return [h, m.styles[h] || {}];
            })),
            attributes: nr(g.map(function(h) {
              return [h, m.attributes[h]];
            }))
          });
        });
      },
      requires: ["computeStyles"]
    };
  }, []), d = c.useMemo(function() {
    var f = {
      onFirstUpdate: o.onFirstUpdate,
      placement: o.placement,
      strategy: o.strategy,
      modifiers: [].concat(o.modifiers, [u, {
        name: "applyStyles",
        enabled: !1
      }])
    };
    return js(a.current, f) ? a.current || f : (a.current = f, f);
  }, [o.onFirstUpdate, o.placement, o.strategy, o.modifiers, u]), p = c.useRef();
  return rr(function() {
    p.current && p.current.setOptions(d);
  }, [d]), rr(function() {
    if (!(n == null || t == null)) {
      var f = r.createPopper || Ls, v = f(n, t, d);
      return p.current = v, function() {
        v.destroy(), p.current = null;
      };
    }
  }, [n, t, r.createPopper]), {
    state: p.current ? p.current.state : null,
    styles: s.styles,
    attributes: s.attributes,
    update: p.current ? p.current.update : null,
    forceUpdate: p.current ? p.current.forceUpdate : null
  };
}, Us = function() {
}, Hs = function() {
  return Promise.resolve(null);
}, Gs = [];
function Ws(e) {
  var n = e.placement, t = n === void 0 ? "bottom" : n, r = e.strategy, a = r === void 0 ? "absolute" : r, o = e.modifiers, i = o === void 0 ? Gs : o, s = e.referenceElement, l = e.onFirstUpdate, u = e.innerRef, d = e.children, p = c.useContext(Mr), f = c.useState(null), v = f[0], m = f[1], g = c.useState(null), h = g[0], R = g[1];
  c.useEffect(function() {
    fn(u, v);
  }, [u, v]);
  var b = c.useMemo(function() {
    return {
      placement: t,
      strategy: a,
      onFirstUpdate: l,
      modifiers: [].concat(i, [{
        name: "arrow",
        enabled: h != null,
        options: {
          element: h
        }
      }])
    };
  }, [t, a, l, i, h]), N = Fs(s || p, v, b), y = N.state, x = N.styles, T = N.forceUpdate, P = N.update, L = c.useMemo(function() {
    return {
      ref: m,
      style: x.popper,
      placement: y ? y.placement : t,
      hasPopperEscaped: y && y.modifiersData.hide ? y.modifiersData.hide.hasPopperEscaped : null,
      isReferenceHidden: y && y.modifiersData.hide ? y.modifiersData.hide.isReferenceHidden : null,
      arrowProps: {
        style: x.arrow,
        ref: R
      },
      forceUpdate: T || Us,
      update: P || Hs
    };
  }, [m, R, t, y, x, P, T]);
  return jr(d)(L);
}
var zs = function() {
}, $s = zs;
const Ks = /* @__PURE__ */ Nr($s);
function Ys(e) {
  var n = e.children, t = e.innerRef, r = c.useContext(Vr), a = c.useCallback(function(o) {
    fn(t, o), Br(r, o);
  }, [t, r]);
  return c.useEffect(function() {
    return function() {
      return fn(t, null);
    };
  }, []), c.useEffect(function() {
    Ks(!!r, "`Reference` should not be used outside of a `Manager` component.");
  }, [r]), jr(n)({
    ref: a
  });
}
var fr = (
  /** @class */
  function(e) {
    Ke(n, e);
    function n() {
      var t, r = e.apply(this, arguments) || this;
      return r.targetRef = (t = r.props.targetRef) !== null && t !== void 0 ? t : c.createRef(), r.prevElement = void 0, r;
    }
    return n.prototype.render = function() {
      var t = c.Children.only(this.props.children);
      return this.props.targetRef !== void 0 ? t : c.cloneElement(t, { ref: this.targetRef });
    }, n.prototype.componentDidMount = function() {
      var t = this;
      this.observer = globalThis.ResizeObserver != null ? new ResizeObserver(function(r) {
        var a, o;
        return (o = (a = t.props).onResize) === null || o === void 0 ? void 0 : o.call(a, r);
      }) : void 0, this.observeElement();
    }, n.prototype.componentDidUpdate = function(t) {
      this.observeElement(this.props.observeParents !== t.observeParents);
    }, n.prototype.componentWillUnmount = function() {
      var t;
      (t = this.observer) === null || t === void 0 || t.disconnect(), this.prevElement = void 0;
    }, n.prototype.observeElement = function(t) {
      if (t === void 0 && (t = !1), this.observer !== void 0) {
        if (!(this.targetRef.current instanceof Element)) {
          this.observer.disconnect();
          return;
        }
        if (!(this.targetRef.current === this.prevElement && !t) && (this.observer.disconnect(), this.prevElement = this.targetRef.current, this.observer.observe(this.targetRef.current), this.props.observeParents))
          for (var r = this.targetRef.current.parentElement; r != null; )
            this.observer.observe(r), r = r.parentElement;
      }
    }, n.displayName = "".concat(F, ".ResizeSensor"), n;
  }(Ye)
);
function $t(e) {
  return e.split("-")[0];
}
function vr(e) {
  return ["left", "right"].indexOf(e) !== -1;
}
function Pt(e) {
  switch (e) {
    case "top":
      return "bottom";
    case "left":
      return "right";
    case "bottom":
      return "top";
    default:
      return "left";
  }
}
function mr(e) {
  var n = e.split("-")[1];
  switch (n) {
    case "start":
      return "left";
    case "end":
      return "right";
    default:
      return "center";
  }
}
function qs(e, n) {
  var t = $t(e);
  if (n === void 0)
    return vr(t) ? "".concat(Pt(t), " ").concat(mr(t)) : "".concat(mr(t), " ").concat(Pt(t));
  var r = 15;
  return vr(t) ? "".concat(Pt(t), " ").concat(parseInt(n.top, 10) + r, "px") : "".concat(parseInt(n.left, 10) + r, "px ").concat(Pt(t));
}
var Xs = "M8.11 6.302c1.015-.936 1.887-2.922 1.887-4.297v26c0-1.378-.868-3.357-1.888-4.297L.925 17.09c-1.237-1.14-1.233-3.034 0-4.17L8.11 6.302z", Js = "M8.787 7.036c1.22-1.125 2.21-3.376 2.21-5.03V0v30-2.005c0-1.654-.983-3.9-2.21-5.03l-7.183-6.616c-.81-.746-.802-1.96 0-2.7l7.183-6.614z", Zs = 4, Ft = 30, Qs = 22;
function el(e) {
  if (e == null)
    return 0;
  switch ($t(e)) {
    case "top":
      return -90;
    case "left":
      return 180;
    case "bottom":
      return 90;
    default:
      return 0;
  }
}
function tl(e) {
  var n = Ft / 2 - Zs;
  switch ($t(e)) {
    case "top":
      return { bottom: -n };
    case "left":
      return { right: -n };
    case "bottom":
      return { top: -n };
    default:
      return { left: -n };
  }
}
var qr = function(e) {
  var n = e.arrowProps, t = n.ref, r = n.style, a = e.placement;
  return (
    // data attribute allows popper.js to position the arrow
    c.createElement(
      "div",
      { "aria-hidden": !0, className: Qt, "data-popper-arrow": !0, ref: t, style: E(E({}, r), tl(a)) },
      c.createElement(
        "svg",
        { viewBox: "0 0 ".concat(Ft, " ").concat(Ft), style: { transform: "rotate(".concat(el(a), "deg)") } },
        c.createElement("path", { className: Qt + "-border", d: Xs }),
        c.createElement("path", { className: Qt + "-fill", d: Js })
      )
    )
  );
};
qr.displayName = "".concat(F, ".PopoverArrow");
var nl = function() {
  return null;
}, Xr = c.createContext([
  {},
  nl
]), rl = function(e, n) {
  switch (n.type) {
    case "FORCE_DISABLED_STATE":
      return { forceDisabled: !0 };
    case "RESET_DISABLED_STATE":
      return {};
    default:
      return e;
  }
}, al = function(e) {
  var n = e.children, t = e.forceDisable, r = c.useReducer(rl, {}), a = r[0], o = r[1], i = c.useMemo(function() {
    return [a, o];
  }, [a, o]);
  return c.useEffect(function() {
    o(t ? { type: "FORCE_DISABLED_STATE" } : { type: "RESET_DISABLED_STATE" });
  }, [t]), c.createElement(Xr.Provider, { value: i }, typeof n == "function" ? n(a) : n);
}, Jr = (
  /** @class */
  function(e) {
    Ke(n, e);
    function n() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.popoverRef = c.createRef(), t.renderPopover = function(r) {
        var a, o, i = t.props, s = i.children, l = i.compact, u = i.disabled, d = i.intent, p = i.popoverClassName, f = Ee(i, ["children", "compact", "disabled", "intent", "popoverClassName"]), v = B(Na, Ta(d), p, (a = {}, a[Pa] = l, a));
        return c.createElement(ll, E({ modifiers: {
          arrow: {
            enabled: !t.props.minimal
          },
          offset: {
            options: {
              offset: [0, Qs / 2]
            }
          }
        } }, f, { autoFocus: !1, canEscapeKeyClose: !1, disabled: (o = r.forceDisabled) !== null && o !== void 0 ? o : u, enforceFocus: !1, lazy: !0, popoverClassName: v, portalContainer: t.props.portalContainer, ref: t.popoverRef }), s);
      }, t;
    }
    return n.prototype.render = function() {
      var t = this;
      return c.createElement(Xr.Consumer, null, function(r) {
        var a = r[0];
        return c.createElement(al, E({}, a), t.renderPopover);
      });
    }, n.prototype.reposition = function() {
      var t;
      (t = this.popoverRef.current) === null || t === void 0 || t.reposition();
    }, n.displayName = "".concat(F, ".Tooltip"), n.defaultProps = {
      compact: !1,
      hoverCloseDelay: 0,
      hoverOpenDelay: 100,
      interactionKind: "hover-target",
      minimal: !1,
      transitionDuration: 100
    }, n;
  }(Ye)
), ol = {
  enabled: !0,
  name: "matchReferenceWidth",
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: function(e) {
    var n = e.state;
    n.styles.popper.width = "".concat(n.rects.reference.width, "px");
  },
  effect: function(e) {
    var n = e.state, t = n.elements.reference.getBoundingClientRect().width;
    n.elements.popper.style.width = "".concat(t, "px");
  }
}, q = E(E({}, Lt), { AUTO: "auto", AUTO_END: "auto-end", AUTO_START: "auto-start" });
function il(e) {
  switch (e) {
    case q.TOP_LEFT:
      return "top-start";
    case q.TOP:
      return "top";
    case q.TOP_RIGHT:
      return "top-end";
    case q.RIGHT_TOP:
      return "right-start";
    case q.RIGHT:
      return "right";
    case q.RIGHT_BOTTOM:
      return "right-end";
    case q.BOTTOM_RIGHT:
      return "bottom-end";
    case q.BOTTOM:
      return "bottom";
    case q.BOTTOM_LEFT:
      return "bottom-start";
    case q.LEFT_BOTTOM:
      return "left-end";
    case q.LEFT:
      return "left";
    case q.LEFT_TOP:
      return "left-start";
    case "auto":
    case "auto-start":
    case "auto-end":
      return e;
    default:
      return sl(e);
  }
}
function sl(e) {
  throw new Error("Unexpected position: " + e);
}
var ve = {
  CLICK: "click",
  CLICK_TARGET_ONLY: "click-target",
  HOVER: "hover",
  HOVER_TARGET_ONLY: "hover-target"
}, ll = (
  /** @class */
  function(e) {
    Ke(n, e);
    function n() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.state = {
        hasDarkParent: !1,
        isClosingViaEscapeKeypress: !1,
        isOpen: t.getIsOpen(t.props)
      }, t.popoverElement = null, t.popoverRef = ln(t, "popoverElement", t.props.popoverRef), t.targetRef = c.createRef(), t.transitionContainerElement = c.createRef(), t.isMouseInTargetOrPopover = !1, t.lostFocusOnSamePage = !0, t.isControlled = function() {
        return t.props.isOpen !== void 0;
      }, t.isArrowEnabled = function() {
        var r, a;
        return !t.props.minimal && ((a = (r = t.props.modifiers) === null || r === void 0 ? void 0 : r.arrow) === null || a === void 0 ? void 0 : a.enabled) !== !1;
      }, t.isHoverInteractionKind = function() {
        return t.props.interactionKind === ve.HOVER || t.props.interactionKind === ve.HOVER_TARGET_ONLY;
      }, t.reposition = function() {
        var r;
        return (r = t.popperScheduleUpdate) === null || r === void 0 ? void 0 : r.call(t);
      }, t.renderTarget = function(r) {
        var a, o, i, s, l = r.ref, u = t.props, d = u.children, p = u.className, f = u.disabled, v = u.fill, m = u.openOnTargetFocus, g = u.renderTarget, h = t.state.isOpen, R = t.isControlled(), b = t.isHoverInteractionKind(), N = t.props.targetTagName;
        v && (N = "div");
        var y = Mt(l, t.targetRef), x = b ? {
          // HOVER handlers
          onBlur: t.handleTargetBlur,
          onContextMenu: t.handleTargetContextMenu,
          onFocus: t.handleTargetFocus,
          onMouseEnter: t.handleMouseEnter,
          onMouseLeave: t.handleMouseLeave
        } : {
          // CLICK needs only one handler
          onClick: t.handleTargetClick,
          // For keyboard accessibility, trigger the same behavior as a click event upon pressing ENTER/SPACE
          onKeyDown: t.handleKeyDown
        }, T = !t.getIsContentEmpty() && !f && m && b ? 0 : void 0, P = E({
          // N.B. this.props.className is passed along to renderTarget even though the user would have access to it.
          // If, instead, renderTarget is undefined and the target is provided as a child, this.props.className is
          // applied to the generated target wrapper element.
          className: B(p, wa, (a = {}, a[Aa] = h, // this class is mainly useful for button targets
          a[Wn] = h && !R && !b, a)),
          ref: y
        }, x), L = {
          "aria-expanded": b ? void 0 : h,
          "aria-haspopup": t.props.interactionKind === ve.HOVER_TARGET_ONLY ? void 0 : (i = t.props.popupKind) !== null && i !== void 0 ? i : "menu"
        }, I = (o = {}, // this class is mainly useful for Blueprint <Button> targets; we should only apply it for
        // uncontrolled popovers when they are opened by a user interaction
        o[Wn] = h && !R && !b, // similarly, this class is mainly useful for targets like <Button>, <InputGroup>, etc.
        o[Gt] = v, o), w;
        if (g !== void 0)
          w = g(E(E(E({}, P), L), {
            className: B(P.className, I),
            // if the consumer renders a tooltip target, it's their responsibility to disable that tooltip
            // when *this* popover is open
            isOpen: h,
            tabIndex: T
          }));
        else {
          var A = Sr(c.Children.toArray(d)[0]);
          if (A === void 0)
            return null;
          var j = c.cloneElement(A, E(E({}, L), {
            className: B(A.props.className, I),
            // force disable single Tooltip child when popover is open
            disabled: h && un(A, Jr) ? !0 : A.props.disabled,
            tabIndex: (s = A.props.tabIndex) !== null && s !== void 0 ? s : T
          })), D = c.createElement(N, E(E({}, P), t.props.targetProps), j);
          w = D;
        }
        return c.createElement(fr, { targetRef: t.targetRef, onResize: t.reposition }, w);
      }, t.renderPopover = function(r) {
        var a, o = t.props, i = o.autoFocus, s = o.enforceFocus, l = o.backdropProps, u = o.canEscapeKeyClose, d = o.hasBackdrop, p = o.interactionKind, f = o.usePortal, v = t.state, m = v.isClosingViaEscapeKeypress, g = v.isOpen, h = qs(r.placement, t.isArrowEnabled() ? r.arrowProps.style : void 0);
        t.popperScheduleUpdate = r.update;
        var R = {
          // always check popover clicks for dismiss class
          onClick: t.handlePopoverClick,
          // treat ENTER/SPACE keys the same as a click for accessibility
          onKeyDown: function(T) {
            return cn(T) && t.handlePopoverClick(T);
          }
        };
        (p === ve.HOVER || !f && p === ve.HOVER_TARGET_ONLY) && (R.onMouseEnter = t.handleMouseEnter, R.onMouseLeave = t.handleMouseLeave);
        var b = $t(r.placement), N = B(rt, (a = {}, a[zn] = t.props.inheritDarkTheme && t.state.hasDarkParent, a[gn] = t.props.minimal, a[en] = t.props.captureDismiss, a[_a] = t.props.matchTargetWidth, a[La] = r.isReferenceHidden === !0, a[Ia] = r.hasPopperEscaped === !0, a), "".concat(Da, "-").concat(b), t.props.popoverClassName), y = t.isHoverInteractionKind() ? !1 : void 0, x = t.isHoverInteractionKind() ? !1 : m ? !0 : t.props.shouldReturnFocusOnClose;
        return c.createElement(
          gt,
          {
            autoFocus: i ?? y,
            backdropClassName: ka,
            backdropProps: l,
            canEscapeKeyClose: u,
            canOutsideClickClose: p === ve.CLICK,
            childRef: t.transitionContainerElement,
            enforceFocus: s,
            hasBackdrop: d,
            isOpen: g,
            lazy: t.props.lazy,
            onClose: t.handleOverlayClose,
            onClosed: t.props.onClosed,
            onClosing: t.props.onClosing,
            onOpened: t.props.onOpened,
            onOpening: t.props.onOpening,
            transitionDuration: t.props.transitionDuration,
            transitionName: rt,
            usePortal: f,
            portalClassName: t.props.portalClassName,
            portalContainer: t.props.portalContainer,
            // eslint-disable-next-line deprecation/deprecation
            portalStopPropagationEvents: t.props.portalStopPropagationEvents,
            shouldReturnFocusOnClose: x
          },
          c.createElement(
            "div",
            {
              className: Ma,
              // We need to attach a ref that notifies both react-popper and our Popover component about the DOM
              // element inside the Overlay2. We cannot re-use `PopperChildrenProps.ref` because Overlay2 only
              // accepts a ref object (not a callback) due to a CSSTransition API limitation.
              // N.B. react-popper has a wide type for this ref, but we can narrow it based on the source,
              // see https://github.com/floating-ui/react-popper/blob/beac280d61082852c4efc302be902911ce2d424c/src/Popper.js#L94
              ref: Mt(r.ref, t.transitionContainerElement),
              style: r.style
            },
            c.createElement(
              fr,
              { onResize: t.reposition },
              c.createElement(
                "div",
                E({ className: N, style: { transformOrigin: h }, ref: t.popoverRef }, R),
                t.isArrowEnabled() && c.createElement(qr, { arrowProps: r.arrowProps, placement: r.placement }),
                c.createElement("div", { className: Va }, t.props.content)
              )
            )
          )
        );
      }, t.handleTargetFocus = function(r) {
        if (t.props.openOnTargetFocus && t.isHoverInteractionKind()) {
          if (r.relatedTarget == null && !t.lostFocusOnSamePage)
            return;
          t.handleMouseEnter(r);
        }
      }, t.handleTargetBlur = function(r) {
        t.props.openOnTargetFocus && t.isHoverInteractionKind() && (r.relatedTarget != null ? r.relatedTarget !== t.popoverElement && !t.isElementInPopover(r.relatedTarget) && t.handleMouseLeave(r) : t.handleMouseLeave(r)), t.lostFocusOnSamePage = r.relatedTarget != null;
      }, t.handleTargetContextMenu = function(r) {
        r.defaultPrevented && t.setOpenState(!1, r);
      }, t.handleMouseEnter = function(r) {
        t.isMouseInTargetOrPopover = !0, !t.props.usePortal && t.isElementInPopover(r.target) && t.props.interactionKind === ve.HOVER_TARGET_ONLY && !t.props.openOnTargetFocus ? t.handleMouseLeave(r) : t.props.disabled || t.setOpenState(!0, r, t.props.hoverOpenDelay);
      }, t.handleMouseLeave = function(r) {
        t.isMouseInTargetOrPopover = !1, r.persist(), t.setTimeout(function() {
          t.isMouseInTargetOrPopover || t.setOpenState(!1, r, t.props.hoverCloseDelay);
        });
      }, t.handlePopoverClick = function(r) {
        var a, o, i, s = r.target, l = s.closest(".".concat(rt)), u = s.closest(".".concat(rt)), d = (l ?? u) === t.getPopoverElement(), p = (o = (a = l?.classList.contains(en)) !== null && a !== void 0 ? a : u?.classList.contains(en)) !== null && o !== void 0 ? o : !1, f = s.closest(".".concat($n, ", .").concat(ja)), v = (i = f?.classList.contains($n)) !== null && i !== void 0 ? i : !1, m = s.closest(":disabled, .".concat(En)) != null;
        v && !m && (!p || d) && t.setOpenState(!1, r);
      }, t.handleOverlayClose = function(r) {
        var a;
        if (!(t.targetRef.current == null || r === void 0)) {
          var o = (a = r.nativeEvent) !== null && a !== void 0 ? a : r, i = o.composed ? o.composedPath()[0] : o.target;
          (!Ba(t.targetRef.current, i) || r.nativeEvent instanceof KeyboardEvent) && t.setOpenState(!1, r);
        }
      }, t.handleKeyDown = function(r) {
        var a = cn(r);
        a && t.handleTargetClick(r);
      }, t.handleTargetClick = function(r) {
        var a = t.state.isOpen && t.isSimulatedButtonClick(r);
        a || !t.props.disabled && !t.isElementInPopover(r.target) && (t.props.isOpen == null ? t.setState(function(o) {
          return { isOpen: !o.isOpen };
        }) : t.setOpenState(!t.props.isOpen, r));
      }, t.isSimulatedButtonClick = function(r) {
        return !r.isTrusted && r.target.matches(".".concat(Fa));
      }, t;
    }
    return n.prototype.getPopoverElement = function() {
      var t;
      return (t = this.popoverElement) === null || t === void 0 ? void 0 : t.querySelector(".".concat(rt));
    }, n.prototype.getIsOpen = function(t) {
      var r;
      return t.disabled ? !1 : (r = t.isOpen) !== null && r !== void 0 ? r : t.defaultIsOpen;
    }, n.prototype.render = function() {
      var t = this.props, r = t.disabled, a = t.placement, o = t.position, i = o === void 0 ? "auto" : o, s = t.positioningStrategy, l = this.state.isOpen;
      return this.getIsContentEmpty() ? (!r && l !== !1 && !Ht("production") && console.warn(Ua), this.renderTarget({ ref: cl })) : c.createElement(
        Ni,
        null,
        c.createElement(Ys, null, this.renderTarget),
        c.createElement(Ws, { innerRef: this.popoverRef, placement: a ?? il(i), strategy: s, modifiers: this.getPopperModifiers() }, this.renderPopover)
      );
    }, n.prototype.componentDidMount = function() {
      this.updateDarkParent();
    }, n.prototype.componentDidUpdate = function(t, r) {
      e.prototype.componentDidUpdate.call(this, t, r), this.updateDarkParent();
      var a = this.getIsOpen(this.props);
      this.props.isOpen != null && a !== this.state.isOpen ? (this.setOpenState(a), this.setState({ isOpen: a })) : this.props.disabled && this.state.isOpen && this.props.isOpen == null && this.setOpenState(!1);
    }, n.prototype.validateProps = function(t) {
      t.isOpen == null && t.onInteraction != null && console.warn(Ha), t.hasBackdrop && !t.usePortal && console.warn(Ga), t.hasBackdrop && t.interactionKind !== ve.CLICK && console.warn(Wa), t.placement !== void 0 && t.position !== void 0 && console.warn(za);
      var r = c.Children.count(t.children), a = t.renderTarget !== void 0, o = t.targetProps !== void 0;
      r === 0 && !a && console.warn($a), r > 1 && console.warn(Ka), r > 0 && a && console.warn(Ya), a && o && console.warn(qa);
    }, n.prototype.getPopperModifiers = function() {
      var t, r, a, o, i = this.props, s = i.matchTargetWidth, l = i.modifiers, u = i.modifiersCustom, d = [
        E({ enabled: this.isArrowEnabled(), name: "arrow" }, l?.arrow),
        E(E({ name: "computeStyles" }, l?.computeStyles), { options: E({
          adaptive: !0,
          // We disable the built-in gpuAcceleration so that
          // Popper.js will return us easy to interpolate values
          // (top, left instead of transform: translate3d)
          // We'll then use these values to generate the needed
          // css transform values blended with the react-spring values
          gpuAcceleration: !1
        }, (t = l?.computeStyles) === null || t === void 0 ? void 0 : t.options) }),
        E(E({ enabled: this.isArrowEnabled(), name: "offset" }, l?.offset), { options: E({ offset: [0, Ft / 2] }, (r = l?.offset) === null || r === void 0 ? void 0 : r.options) }),
        E(E({ name: "flip" }, l?.flip), { options: E({ boundary: this.props.boundary, rootBoundary: this.props.rootBoundary }, (a = l?.flip) === null || a === void 0 ? void 0 : a.options) }),
        E(E({ name: "preventOverflow" }, l?.preventOverflow), { options: E({ boundary: this.props.boundary, rootBoundary: this.props.rootBoundary }, (o = l?.preventOverflow) === null || o === void 0 ? void 0 : o.options) })
      ];
      return s && d.push(ol), u !== void 0 && d.push.apply(d, u), d;
    }, n.prototype.setOpenState = function(t, r, a) {
      var o = this, i, s, l, u, d;
      (i = this.cancelOpenTimeout) === null || i === void 0 || i.call(this), a !== void 0 && a > 0 ? (r?.persist(), this.cancelOpenTimeout = this.setTimeout(function() {
        o.setOpenState(t, r);
      }, a)) : (this.props.isOpen == null ? this.setState({ isOpen: t }) : (l = (s = this.props).onInteraction) === null || l === void 0 || l.call(s, t, r), t || ((d = (u = this.props).onClose) === null || d === void 0 || d.call(u, r), this.setState({ isClosingViaEscapeKeypress: ul(r?.nativeEvent) })));
    }, n.prototype.updateDarkParent = function() {
      var t;
      if (this.props.usePortal && this.state.isOpen) {
        var r = ((t = this.targetRef.current) === null || t === void 0 ? void 0 : t.closest(".".concat(zn))) != null;
        this.setState({ hasDarkParent: r });
      }
    }, n.prototype.isElementInPopover = function(t) {
      var r, a;
      return (a = (r = this.getPopoverElement()) === null || r === void 0 ? void 0 : r.contains(t)) !== null && a !== void 0 ? a : !1;
    }, n.prototype.getIsContentEmpty = function() {
      var t = this.props.content;
      return t == null || Rr(t);
    }, n.displayName = "".concat(F, ".Popover"), n.defaultProps = {
      boundary: "clippingParents",
      captureDismiss: !1,
      defaultIsOpen: !1,
      disabled: !1,
      fill: !1,
      hasBackdrop: !1,
      hoverCloseDelay: 300,
      hoverOpenDelay: 150,
      inheritDarkTheme: !0,
      interactionKind: ve.CLICK,
      matchTargetWidth: !1,
      minimal: !1,
      openOnTargetFocus: !0,
      // N.B. we don't set a default for `placement` or `position` here because that would trigger
      // a warning in validateProps if the other prop is specified by a user of this component
      positioningStrategy: "absolute",
      renderTarget: void 0,
      shouldReturnFocusOnClose: !1,
      targetTagName: "span",
      transitionDuration: 300,
      usePortal: !0
    }, n;
  }(Ye)
);
function ul(e) {
  return e instanceof KeyboardEvent && e.key === "Escape";
}
function cl() {
}
var Kt = c.forwardRef(function(e, n) {
  var t, r = e.alignText, a = e.className, o = e.fill, i = e.minimal, s = e.outlined, l = e.large, u = e.vertical, d = Ee(e, ["alignText", "className", "fill", "minimal", "outlined", "large", "vertical"]), p = B(Xa, (t = {}, t[Gt] = o, t[Wt] = l, t[gn] = i, t[Ja] = s, t[Tr] = u, t), Pr(r), a);
  return c.createElement("div", E({}, d, { ref: n, className: p }), e.children);
});
Kt.displayName = "".concat(F, ".ButtonGroup");
var hr;
(function(e) {
  e.SMALL = "360px", e.STANDARD = "50%", e.LARGE = "90%";
})(hr || (hr = {}));
var dl = (
  /** @class */
  function(e) {
    Ke(n, e);
    function n() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return n.prototype.render = function() {
      var t, r, a, o, i = this.props, s = i.hasBackdrop, l = i.size, u = i.style, d = i.position, p = this.props, f = p.className, v = p.children, m = Ee(p, ["className", "children"]), g = Kn(d), h = B(Za, (t = {}, t[(o = Qa(g)) !== null && o !== void 0 ? o : ""] = !0, t), f), R = l == null ? u : E(E({}, u), (r = {}, r[eo(g) ? "height" : "width"] = l, r));
      return (
        // N.B. the `OVERLAY_CONTAINER` class is a bit of a misnomer since it is only being used by the Drawer
        // component, but we keep it for backwards compatibility.
        c.createElement(
          gt,
          E({}, m, { className: B((a = {}, a[to] = s, a)) }),
          c.createElement(
            "div",
            { className: h, style: R },
            this.maybeRenderHeader(),
            v
          )
        )
      );
    }, n.prototype.validateProps = function(t) {
      t.title == null && (t.icon != null && console.warn(no), t.isCloseButtonShown != null && console.warn(ro)), t.position != null && t.position !== Kn(t.position) && console.warn(ao);
    }, n.prototype.maybeRenderCloseButton = function() {
      return this.props.isCloseButtonShown !== !1 ? c.createElement(_e, { "aria-label": "Close", className: oo, icon: c.createElement(Sn, { size: M.LARGE }), minimal: !0, onClick: this.props.onClose }) : null;
    }, n.prototype.maybeRenderHeader = function() {
      var t = this.props, r = t.icon, a = t.title;
      return a == null ? null : c.createElement(
        "div",
        { className: io },
        c.createElement(so, { icon: r, size: M.LARGE }),
        c.createElement(lo, null, a),
        this.maybeRenderCloseButton()
      );
    }, n.displayName = "".concat(F, ".Drawer"), n.defaultProps = {
      canOutsideClickClose: !0,
      isOpen: !1,
      position: "right",
      style: {}
    }, n;
  }(Ye)
), Zr = c.forwardRef(function(e, n) {
  var t, r = e.children, a = e.className, o = e.fill, i = e.vertical, s = Ee(e, ["children", "className", "fill", "vertical"]), l = B(uo, (t = {}, t[Gt] = o, t[Tr] = i, t), a);
  return c.createElement("div", E({ role: "group" }, s, { ref: n, className: l }), r);
});
Zr.displayName = "".concat(F, ".ControlGroup");
var Yt = c.forwardRef(function(e, n) {
  var t, r = e.alignIndicator, a = e.children, o = e.className, i = e.indicatorChildren, s = e.inline, l = e.inputRef, u = e.label, d = e.labelElement, p = e.large, f = e.style, v = e.type, m = e.typeClassName, g = e.tagName, h = g === void 0 ? "label" : g, R = Ee(e, ["alignIndicator", "children", "className", "indicatorChildren", "inline", "inputRef", "label", "labelElement", "large", "style", "type", "typeClassName", "tagName"]), b = B(co, m, (t = {}, t[En] = R.disabled, t[po] = s, t[Wt] = p, t), Pr(r), o);
  return c.createElement(h, { className: b, style: f, ref: n }, c.createElement("input", E({}, R, { ref: l, type: v })), c.createElement("span", { className: fo }, i), u, d, a);
});
Yt.displayName = "".concat(F, ".Control");
var Vn = c.forwardRef(function(e, n) {
  var t = e.innerLabelChecked, r = e.innerLabel, a = Ee(e, ["innerLabelChecked", "innerLabel"]), o = r || t ? [
    c.createElement(
      "div",
      { key: "checked", className: Yn },
      c.createElement("div", { className: qn }, t || r)
    ),
    c.createElement(
      "div",
      { key: "unchecked", className: Yn },
      c.createElement("div", { className: qn }, r)
    )
  ] : null;
  return c.createElement(Yt, E({}, a, { indicatorChildren: o, ref: n, type: "checkbox", typeClassName: vo }));
});
Vn.displayName = "".concat(F, ".Switch");
var mt = c.forwardRef(function(e, n) {
  return c.createElement(Yt, E({}, e, { ref: n, type: "radio", typeClassName: mo }));
});
mt.displayName = "".concat(F, ".Radio");
var G = c.forwardRef(function(e, n) {
  var t = e.defaultIndeterminate, r = e.indeterminate, a = e.onChange, o = Ee(e, ["defaultIndeterminate", "indeterminate", "onChange"]), i = c.useState(r || t || !1), s = i[0], l = i[1], u = c.useRef(null), d = e.inputRef === void 0 ? u : Mt(e.inputRef, u), p = c.useCallback(function(f) {
    r === void 0 && l(f.target.indeterminate), a?.(f);
  }, [r, a]);
  return c.useEffect(function() {
    r !== void 0 && l(r);
  }, [r]), c.useEffect(function() {
    u.current != null && (u.current.indeterminate = s);
  }, [u, s]), c.createElement(Yt, E({}, o, { inputRef: d, onChange: p, ref: n, type: "checkbox", typeClassName: ho }));
});
G.displayName = "".concat(F, ".Checkbox");
function Qr(e) {
  var n = 1.9, t = n.toLocaleString(e), r = 1 .toLocaleString(e), a = 9 .toLocaleString(e), o = "".concat(r, "(.+)").concat(a), i = new RegExp(o).exec(t);
  return i && i[1] || ".";
}
function on(e, n) {
  return n === void 0 && (n = "en-US"), dt(e.toLocaleString(n, { roundingPriority: "morePrecision" }), n);
}
function pl(e, n, t) {
  var r = n ?? -1 / 0, a = t ?? 1 / 0;
  return go(e, r, a);
}
function fl(e) {
  return e === void 0 && (e = ""), e.toString();
}
function vl(e, n) {
  var t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function(a) {
    return a.toLocaleString(n);
  }), r = t.indexOf(e);
  return r !== -1 ? r : e;
}
function me(e, n) {
  var t = "" + e;
  if (parseFloat(t).toString() === e.toString())
    return e.toString();
  if (n !== void 0) {
    var r = Qr(n), a = dt(t, n);
    return a.split("").map(function(o) {
      return vl(o, n);
    }).join("").replace(r, ".");
  }
  return e.toString();
}
function ml(e, n) {
  var t = me(e, n);
  return e != null && t - parseFloat(t) + 1 >= 0;
}
function hl(e, n) {
  if (e.key == null || e.ctrlKey || e.altKey || e.metaKey)
    return !0;
  var t = e.key.length === 1;
  return t ? ea(e.key, n) : !0;
}
function ea(e, n) {
  if (n !== void 0) {
    var t = Qr(n).replace(".", "\\."), r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function(i) {
      return i.toLocaleString(n);
    }).join(""), a = new RegExp("^[Ee" + r + "\\+\\-" + t + "]$");
    return a.test(e);
  } else {
    var o = /^[Ee0-9\+\-\.]$/;
    return o.test(e);
  }
}
function gl(e, n) {
  var t = Math.pow(10, n);
  return Math.round(e * t) / t;
}
function El(e) {
  return e.replace(/[\uFF10-\uFF19]/g, function(n) {
    return String.fromCharCode(n.charCodeAt(0) - 65248);
  });
}
function dt(e, n) {
  var t = El(e).split(""), r = t.filter(function(a) {
    return ea(a, n);
  });
  return r.join("");
}
var Ue;
(function(e) {
  e[e.DOWN = -1] = "DOWN", e[e.UP = 1] = "UP";
})(Ue || (Ue = {}));
var yl = [
  "allowNumericCharactersOnly",
  "buttonPosition",
  "clampValueOnBlur",
  "className",
  "defaultValue",
  "majorStepSize",
  "minorStepSize",
  "onButtonClick",
  "onValueChange",
  "selectAllOnFocus",
  "selectAllOnIncrement",
  "stepSize"
], Cl = (
  /** @class */
  function(e) {
    Ke(n, e);
    function n() {
      var t, r = e.apply(this, arguments) || this;
      return r.numericInputId = Eo("numericInput"), r.state = {
        currentImeInputInvalid: !1,
        shouldSelectAfterUpdate: !1,
        stepMaxPrecision: n.getStepMaxPrecision(r.props),
        value: fl((t = r.props.value) !== null && t !== void 0 ? t : r.props.defaultValue)
      }, r.didPasteEventJustOccur = !1, r.delta = 0, r.inputElement = null, r.inputRef = ln(r, "inputElement", r.props.inputRef), r.incrementButtonHandlers = r.getButtonEventHandlers(Ue.UP), r.decrementButtonHandlers = r.getButtonEventHandlers(Ue.DOWN), r.getCurrentValueAsNumber = function() {
        return Number(me(r.state.value, r.props.locale));
      }, r.handleButtonClick = function(a, o) {
        var i, s, l = r.updateDelta(o, a), u = r.incrementValue(l);
        (s = (i = r.props).onButtonClick) === null || s === void 0 || s.call(i, Number(me(u, r.props.locale)), u);
      }, r.stopContinuousChange = function() {
        r.delta = 0, r.clearTimeouts(), clearInterval(r.intervalId), document.removeEventListener("mouseup", r.stopContinuousChange);
      }, r.handleContinuousChange = function() {
        var a, o, i, s;
        if (r.props.min !== void 0 || r.props.max !== void 0) {
          var l = (a = r.props.min) !== null && a !== void 0 ? a : -1 / 0, u = (o = r.props.max) !== null && o !== void 0 ? o : 1 / 0, d = r.getCurrentValueAsNumber();
          if (d <= l || d >= u) {
            r.stopContinuousChange();
            return;
          }
        }
        var p = r.incrementValue(r.delta);
        (s = (i = r.props).onButtonClick) === null || s === void 0 || s.call(i, Number(me(p, r.props.locale)), p);
      }, r.handleInputFocus = function(a) {
        var o, i;
        r.setState({ shouldSelectAfterUpdate: r.props.selectAllOnFocus }), (i = (o = r.props).onFocus) === null || i === void 0 || i.call(o, a);
      }, r.handleInputBlur = function(a) {
        var o, i;
        if (r.setState({ shouldSelectAfterUpdate: !1 }), r.props.clampValueOnBlur) {
          var s = a.target.value;
          r.handleNextValue(r.roundAndClampValue(s));
        }
        (i = (o = r.props).onBlur) === null || i === void 0 || i.call(o, a);
      }, r.handleInputKeyDown = function(a) {
        var o, i;
        if (!(r.props.disabled || r.props.readOnly)) {
          var s;
          if (a.key === "ArrowUp" ? s = Ue.UP : a.key === "ArrowDown" && (s = Ue.DOWN), s !== void 0) {
            a.preventDefault();
            var l = r.updateDelta(s, a);
            r.incrementValue(l);
          }
          (i = (o = r.props).onKeyDown) === null || i === void 0 || i.call(o, a);
        }
      }, r.handleCompositionEnd = function(a) {
        r.props.allowNumericCharactersOnly && (r.handleNextValue(dt(a.data, r.props.locale)), r.setState({ currentImeInputInvalid: !1 }));
      }, r.handleCompositionUpdate = function(a) {
        if (r.props.allowNumericCharactersOnly) {
          var o = a.data, i = dt(o, r.props.locale);
          i.length === 0 && o.length > 0 ? r.setState({ currentImeInputInvalid: !0 }) : r.setState({ currentImeInputInvalid: !1 });
        }
      }, r.handleInputKeyPress = function(a) {
        var o, i;
        r.props.allowNumericCharactersOnly && !hl(a, r.props.locale) && a.preventDefault(), (i = (o = r.props).onKeyPress) === null || i === void 0 || i.call(o, a);
      }, r.handleInputPaste = function(a) {
        var o, i;
        r.didPasteEventJustOccur = !0, (i = (o = r.props).onPaste) === null || i === void 0 || i.call(o, a);
      }, r.handleInputChange = function(a) {
        var o = a;
        r.props.allowNumericCharactersOnly && r.didPasteEventJustOccur && (r.didPasteEventJustOccur = !1, o = dt(a, r.props.locale)), r.handleNextValue(o), r.setState({ shouldSelectAfterUpdate: !1 });
      }, r;
    }
    return n.getDerivedStateFromProps = function(t, r) {
      var a, o, i = {
        prevMaxProp: t.max,
        prevMinProp: t.min
      }, s = t.min !== r.prevMinProp, l = t.max !== r.prevMaxProp, u = s || l, d = (o = (a = t.value) === null || a === void 0 ? void 0 : a.toString()) !== null && o !== void 0 ? o : r.value, p = n.getStepMaxPrecision(t), f = d !== n.VALUE_EMPTY ? n.roundAndClampValue(d, p, t.min, t.max, 0, t.locale) : n.VALUE_EMPTY;
      return u && f !== r.value ? E(E({}, i), { stepMaxPrecision: p, value: f }) : E(E({}, i), { stepMaxPrecision: p, value: d });
    }, n.getStepMaxPrecision = function(t) {
      return t.minorStepSize != null ? Xn(t.minorStepSize) : Xn(t.stepSize);
    }, n.roundAndClampValue = function(t, r, a, o, i, s) {
      if (i === void 0 && (i = 0), !ml(t, s))
        return n.VALUE_EMPTY;
      var l = me(t, s), u = gl(Number(l) + i, r), d = pl(u, a, o);
      return on(d, s);
    }, n.prototype.render = function() {
      var t, r = this.props, a = r.buttonPosition, o = r.className, i = r.fill, s = r.large, l = r.small, u = B(yo, (t = {}, t[Wt] = s, t[Co] = l, t), o), d = this.renderButtons();
      return c.createElement(
        Zr,
        { className: u, fill: i },
        a === Lt.LEFT && d,
        this.renderInput(),
        a === Lt.RIGHT && d
      );
    }, n.prototype.componentDidUpdate = function(t, r) {
      var a, o, i;
      e.prototype.componentDidUpdate.call(this, t, r), t.inputRef !== this.props.inputRef && (sn(t.inputRef, null), this.inputRef = ln(this, "inputElement", this.props.inputRef), sn(this.props.inputRef, this.inputElement)), this.state.shouldSelectAfterUpdate && ((a = this.inputElement) === null || a === void 0 || a.setSelectionRange(0, this.state.value.length));
      var s = this.props.min !== t.min, l = this.props.max !== t.max, u = s || l, d = this.props.locale !== t.locale, p = this.state.value !== r.value;
      if (u && p || d && r.value !== n.VALUE_EMPTY) {
        var f = d ? r.value : this.state.value, v = me(f, t.locale), m = on(+v, this.props.locale);
        (i = (o = this.props).onValueChange) === null || i === void 0 || i.call(o, +v, m, this.inputElement);
      }
    }, n.prototype.validateProps = function(t) {
      var r = t.majorStepSize, a = t.max, o = t.min, i = t.minorStepSize, s = t.stepSize, l = t.value;
      if (o != null && a != null && o > a && console.error(Oo), s <= 0 && console.error(bo), i && i <= 0 && console.error(Ro), r && r <= 0 && console.error(So), i && i > s && console.error(xo), r && r < s && console.error(No), l != null) {
        var u = n.getStepMaxPrecision(t), d = n.roundAndClampValue(l.toString(), u, o, a, 0, this.props.locale), p = d !== l.toString(), f = on(Number(me(l, this.props.locale)), this.props.locale), v = d !== f;
        p && v && console.warn(To);
      }
    }, n.prototype.renderButtons = function() {
      var t = this.props, r = t.intent, a = t.max, o = t.min, i = t.locale, s = me(this.state.value, i), l = this.props.disabled || this.props.readOnly, u = a !== void 0 && s !== "" && +s >= a, d = o !== void 0 && s !== "" && +s <= o;
      return c.createElement(
        Kt,
        { className: Po, key: "button-group", vertical: !0 },
        c.createElement(_e, E({ "aria-label": "increment", "aria-controls": this.numericInputId, disabled: l || u, icon: c.createElement(bn, null), intent: r }, this.incrementButtonHandlers)),
        c.createElement(_e, E({ "aria-label": "decrement", "aria-controls": this.numericInputId, disabled: l || d, icon: c.createElement(On, null), intent: r }, this.decrementButtonHandlers))
      );
    }, n.prototype.renderInput = function() {
      var t = wo(this.props, yl, !0), r = this.getCurrentValueAsNumber();
      return c.createElement(wr, E({ asyncControl: this.props.asyncControl, autoComplete: "off", id: this.numericInputId, role: this.props.allowNumericCharactersOnly ? "spinbutton" : void 0 }, t, { "aria-valuemax": this.props.max, "aria-valuemin": this.props.min, "aria-valuenow": r, intent: this.state.currentImeInputInvalid ? Ao.DANGER : this.props.intent, inputClassName: this.props.inputClassName, inputRef: this.inputRef, large: this.props.large, leftElement: this.props.leftElement, leftIcon: this.props.leftIcon, onFocus: this.handleInputFocus, onBlur: this.handleInputBlur, onCompositionEnd: this.handleCompositionEnd, onCompositionUpdate: this.handleCompositionUpdate, onKeyDown: this.handleInputKeyDown, onKeyPress: this.handleInputKeyPress, onPaste: this.handleInputPaste, onValueChange: this.handleInputChange, rightElement: this.props.rightElement, small: this.props.small, value: this.state.value }));
    }, n.prototype.getButtonEventHandlers = function(t) {
      var r = this;
      return {
        // keydown is fired repeatedly when held so it's implicitly continuous
        onKeyDown: function(a) {
          !r.props.disabled && cn(a) && r.handleButtonClick(a, t);
        },
        onMouseDown: function(a) {
          r.props.disabled || (r.handleButtonClick(a, t), r.startContinuousChange());
        }
      };
    }, n.prototype.startContinuousChange = function() {
      var t = this;
      document.addEventListener("mouseup", this.stopContinuousChange), this.setTimeout(function() {
        t.intervalId = window.setInterval(t.handleContinuousChange, n.CONTINUOUS_CHANGE_INTERVAL);
      }, n.CONTINUOUS_CHANGE_DELAY);
    }, n.prototype.handleNextValue = function(t) {
      var r, a;
      this.props.value == null && this.setState({ value: t }), (a = (r = this.props).onValueChange) === null || a === void 0 || a.call(r, Number(me(t, this.props.locale)), t, this.inputElement);
    }, n.prototype.incrementValue = function(t) {
      var r = this.state.value === n.VALUE_EMPTY ? n.VALUE_ZERO : this.state.value, a = this.roundAndClampValue(r, t);
      return a !== this.state.value && (this.handleNextValue(a), this.setState({ shouldSelectAfterUpdate: this.props.selectAllOnIncrement })), a;
    }, n.prototype.getIncrementDelta = function(t, r, a) {
      var o = this.props, i = o.majorStepSize, s = o.minorStepSize, l = o.stepSize;
      return r && i != null ? t * i : a && s != null ? t * s : t * l;
    }, n.prototype.roundAndClampValue = function(t, r) {
      return r === void 0 && (r = 0), n.roundAndClampValue(t, this.state.stepMaxPrecision, this.props.min, this.props.max, r, this.props.locale);
    }, n.prototype.updateDelta = function(t, r) {
      return this.delta = this.getIncrementDelta(t, r.shiftKey, r.altKey), this.delta;
    }, n.displayName = "".concat(F, ".NumericInput"), n.VALUE_EMPTY = "", n.VALUE_ZERO = "0", n.defaultProps = {
      allowNumericCharactersOnly: !0,
      buttonPosition: Lt.RIGHT,
      clampValueOnBlur: !1,
      defaultValue: n.VALUE_EMPTY,
      large: !1,
      majorStepSize: 10,
      minorStepSize: 0.1,
      selectAllOnFocus: !1,
      selectAllOnIncrement: !1,
      small: !1,
      stepSize: 1
    }, n.CONTINUOUS_CHANGE_DELAY = 300, n.CONTINUOUS_CHANGE_INTERVAL = 100, n;
  }(Ye)
);
function Ol(e) {
  var n, t = c.useState(function() {
    var s;
    return (s = e.defaultChecked) !== null && s !== void 0 ? s : !1;
  }), r = t[0], a = t[1], o = (n = e.checked) !== null && n !== void 0 ? n : r, i = c.useCallback(
    function(s) {
      var l;
      a(function(u) {
        return !u;
      }), (l = e.onChange) === null || l === void 0 || l.call(e, s);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [e.onChange]
  );
  return { checked: o, onChange: i };
}
var jn = c.forwardRef(function(e, n) {
  var t, r = e.alignIndicator;
  e.checked;
  var a = e.children, o = e.className, i = e.controlKind;
  e.defaultChecked;
  var s = e.disabled, l = e.inputProps, u = e.inputRef, d = e.label;
  e.onChange;
  var p = e.showAsSelectedWhenChecked, f = e.value, v = Ee(e, ["alignIndicator", "checked", "children", "className", "controlKind", "defaultChecked", "disabled", "inputProps", "inputRef", "label", "onChange", "showAsSelectedWhenChecked", "value"]), m = Ol(e), g = m.checked, h = m.onChange, R = c.createElement("div", { className: _o }, a ?? d), b = E({ alignIndicator: r, checked: g, disabled: s, inline: !0, inputRef: u, labelElement: R, onChange: h, value: f }, l), N = B(Lo, o, (t = {}, t[Io] = p && g, t));
  return c.createElement(yn, E({ interactive: !s, className: N, ref: n }, v), i === "switch" ? c.createElement(Vn, E({}, b)) : i === "checkbox" ? c.createElement(G, E({}, b)) : i === "radio" ? c.createElement(mt, E({}, b)) : R);
});
jn.defaultProps = {
  alignIndicator: "right",
  showAsSelectedWhenChecked: !0
};
jn.displayName = "".concat(F, ".ControlCard");
var ta = c.forwardRef(function(e, n) {
  var t = B(e.className, Do);
  return c.createElement(jn, E({}, e, { className: t, controlKind: "radio", ref: n }));
});
ta.displayName = "".concat(F, ".RadioCard");
var bl = 0;
function Rl() {
  return "".concat(na.displayName, "-").concat(bl++);
}
var na = (
  /** @class */
  function(e) {
    Ke(n, e);
    function n() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.autoGroupName = Rl(), t;
    }
    return n.prototype.render = function() {
      var t = this.props.label;
      return c.createElement(
        "div",
        { className: B(ko, this.props.className) },
        t == null ? null : c.createElement("label", { className: Mo }, t),
        Array.isArray(this.props.options) ? this.renderOptions() : this.renderChildren()
      );
    }, n.prototype.validateProps = function() {
      this.props.children != null && this.props.options != null && console.warn(Vo);
    }, n.prototype.renderChildren = function() {
      var t = this;
      return c.Children.map(this.props.children, function(r) {
        return un(r, mt) || un(r, ta) ? c.cloneElement(
          // Need this cast here to suppress a TS error caused by differing `ref` types for the Radio and
          // RadioCard components. We aren't injecting a ref, so we don't need to be strict about that
          // incompatibility.
          r,
          t.getRadioProps(r.props)
        ) : r;
      });
    }, n.prototype.renderOptions = function() {
      var t = this, r;
      return (r = this.props.options) === null || r === void 0 ? void 0 : r.map(function(a) {
        return c.createElement(mt, E({}, t.getRadioProps(a), { key: a.value, labelElement: a.label || a.value }));
      });
    }, n.prototype.getRadioProps = function(t) {
      var r = this.props.name, a = t.className, o = t.disabled, i = t.value;
      return {
        checked: i === this.props.selectedValue,
        className: a,
        disabled: o || this.props.disabled,
        inline: this.props.inline,
        name: r ?? this.autoGroupName,
        onChange: this.props.onChange,
        value: i
      };
    }, n.displayName = "".concat(F, ".RadioGroup"), n;
  }(Ye)
), hn = c.forwardRef(function(e, n) {
  var t, r = e.className, a = e.children, o = e.disabled, i = e.fill, s = e.iconName, l = s === void 0 ? "double-caret-vertical" : s, u = e.iconProps, d = e.large, p = e.minimal, f = e.options, v = f === void 0 ? [] : f, m = e.value, g = Ee(e, ["className", "children", "disabled", "fill", "iconName", "iconProps", "large", "minimal", "options", "value"]), h = B(jo, (t = {}, t[En] = o, t[Gt] = i, t[Wt] = d, t[gn] = p, t), r), R = "Open dropdown", b = l === "double-caret-vertical" ? c.createElement(Rn, E({ title: R }, u)) : c.createElement(Cn, E({ title: R }, u)), N = v.map(function(y) {
    var x = typeof y == "object" ? y : { value: y };
    return c.createElement("option", E({}, x, { key: x.value, children: x.label || x.value }));
  });
  return c.createElement(
    "div",
    { className: h },
    c.createElement(
      "select",
      E({ disabled: o, ref: n, value: m }, g, { multiple: !1 }),
      N,
      a
    ),
    b
  );
});
hn.displayName = "".concat(F, ".HTMLSelect");
const Sl = ({ children: e }) => /* @__PURE__ */ O.jsx("div", { className: "ui-root", children: e }), wt = {
  20200201: 4,
  20200202: 1,
  20200203: 1,
  20200204: 1,
  20700505: 1,
  20700506: 4,
  20200206: 1,
  20200207: 1,
  autoRun: !0,
  gameState: "loaded",
  fillAp: !0,
  autoRally: "20200201,20200202,20200203,20200204,20700506,20700505,20200206,20200207",
  shown: !0,
  inCastle: !0,
  actions: {
    collectResources: !0,
    collectVip: !0,
    collectdsaVip: !0,
    useCaravan: !0,
    useHelp: !0,
    useInstantHarvest: !0,
    donateTech: !0,
    useAllianceShop: !1,
    collectGift: !0,
    joinRallies: !0,
    collectFreeChest: !0
  },
  lowRallyTroops: 1e4,
  highRallyTroops: 5e4,
  participants: 3,
  version: 5
}, Ie = document.createElement("div"), ra = () => {
  const e = localStorage.getItem("settings-state");
  try {
    const n = e && JSON.parse(localStorage.getItem("settings-state"));
    return n.version !== wt.version ? wt : n ?? wt;
  } catch {
    return wt;
  }
}, he = ra();
window.addEventListener("storage", () => {
  const e = ra();
  Object.assign(he, e), Ie.dispatchEvent(
    new CustomEvent("settings.changed", {
      detail: he
    })
  );
});
const De = async (e, n = !1) => {
  Object.assign(he, e), localStorage.setItem(
    "settings-state",
    JSON.stringify(n ? e : he)
  ), Ie.dispatchEvent(
    new CustomEvent("settings.changed", {
      detail: he
    })
  );
}, qt = () => {
  const [e, n] = c.useState(he);
  return c.useEffect(() => {
    const t = (r) => {
      n({ ...r.detail });
    };
    return Ie.addEventListener("settings.changed", t), () => {
      Ie.removeEventListener("settings.changed", t);
    };
  }, []), {
    settings: e,
    setSettings: De
  };
}, gr = {
  text: {
    property: "value",
    comp: ({ onChange: e, ...n }) => /* @__PURE__ */ O.jsx(
      wr,
      {
        placeholder: n.label,
        onChange: (t) => {
          e(t.target.value);
        },
        ...n
      }
    )
  },
  checkbox: {
    comp: ({ onChange: e, ...n }) => /* @__PURE__ */ O.jsx(
      G,
      {
        onChange: (t) => e(t.target.checked),
        ...n
      }
    ),
    property: "checked"
  },
  radio: {
    property: "value",
    comp: ({ value: e, onChange: n, label: t, options: r }) => /* @__PURE__ */ O.jsx(
      na,
      {
        onChange: n,
        label: t,
        selectedValue: `${e}`,
        children: r.map((a) => /* @__PURE__ */ O.jsx(mt, { value: `${a}`, label: a }, a))
      }
    )
  },
  number: {
    property: "value",
    comp: ({ value: e, onChange: n, label: t, ...r }) => /* @__PURE__ */ O.jsx(Jn, { label: t, inline: !0, children: /* @__PURE__ */ O.jsx(
      Cl,
      {
        allowNumericCharactersOnly: !0,
        small: !0,
        onValueChange: n,
        value: e,
        defaultValue: r.defaultValue
      }
    ) })
  },
  select: {
    property: "value",
    comp: ({ value: e, label: n, onChange: t, options: r }) => {
      const a = (o) => {
        t(o.target.value);
      };
      return /* @__PURE__ */ O.jsx(Jn, { label: n, inline: !0, children: /* @__PURE__ */ O.jsx(hn, { onChange: a, value: `${e}`, children: r && r.map((o) => {
        const i = typeof o != "object" ? o : o.value, s = typeof o != "object" ? o : o.label;
        return /* @__PURE__ */ O.jsx("option", { value: i, label: s }, i);
      }) }) });
    }
  },
  "select-checkbox": {
    property: "value",
    comp: ({
      name: e,
      value: n,
      label: t,
      settings: r,
      onChange: a,
      checkBoxValue: o,
      handleChange: i,
      options: s
    }) => {
      const l = Array.isArray(r[o]) ? r[o] : r[o]?.split(",");
      return /* @__PURE__ */ O.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
        /* @__PURE__ */ O.jsx(
          G,
          {
            label: t,
            checked: r[o].includes(e),
            onChange: (u) => i(
              o,
              u.target.checked ? [...l, e].toString() : l.filter((d) => d !== e).toString()
            )
          }
        ),
        /* @__PURE__ */ O.jsx(
          hn,
          {
            onChange: (u) => {
              a(u.target.value);
            },
            value: `${n}`,
            children: s && s.map((u) => {
              const d = typeof u != "object" ? u : u.value, p = typeof u != "object" ? u : u.label;
              return /* @__PURE__ */ O.jsx("option", { value: d, label: p }, d);
            })
          }
        )
      ] });
    }
  },
  button: {
    comp: (e) => /* @__PURE__ */ O.jsx(_e, { small: !0, ...e, children: e.label })
  },
  buttons: {
    comp: ({ options: e }) => /* @__PURE__ */ O.jsx(Kt, { style: { display: "block" }, children: e && e.map((n, t) => /* @__PURE__ */ c.createElement(_e, { small: !0, ...n, key: "button" + t }, n.label)) })
  },
  switch: {
    property: "checked",
    comp: ({ onChange: e, label: n, checked: t }) => /* @__PURE__ */ O.jsx(
      Vn,
      {
        checked: t,
        labelElement: n,
        onChange: (r) => e(r.target.checked)
      }
    )
  },
  custom: {
    comp: ({ comp: e }) => /* @__PURE__ */ O.jsx(e, {})
  }
}, aa = ({ settingControls: e, style: n, onChange: t }) => {
  const { settings: r, setSettings: a } = qt(), o = (i, s) => {
    a({
      [i]: s
    }), t?.({
      [i]: s
    });
  };
  return /* @__PURE__ */ O.jsx("div", { className: "controls", style: n, children: e.map((i) => {
    if (!gr[i.type]) return null;
    const { type: s, tooltip: l, ...u } = i, { comp: d, property: p } = gr[s], f = /* @__PURE__ */ O.jsx(
      d,
      {
        [p]: r[i.name],
        ...u,
        settings: r,
        onChange: (v) => o(i.name, v),
        handleChange: o
      },
      i.name
    );
    return l ? /* @__PURE__ */ O.jsx(
      Jr,
      {
        content: /* @__PURE__ */ O.jsx("div", { className: "tooltip-content", children: l }),
        children: f
      },
      i.name
    ) : f;
  }) });
}, xl = {
  showToggle: !0,
  style: void 0
}, Nl = ({
  settingControls: e,
  options: n = xl,
  onChange: t
}) => {
  const r = e, { settings: a, setSettings: o } = qt(), [i, s] = c.useState(!n.showToggle || a.shown);
  c.useEffect(() => {
    a?.shown !== void 0 && s(!n.showToggle || a?.shown);
  }, [a?.shown]);
  const l = () => {
    s(!i), o({
      shown: !i
    });
  };
  return /* @__PURE__ */ O.jsxs("div", { className: "bp5-dark settings-root", style: n.style, children: [
    n.showToggle && /* @__PURE__ */ O.jsx(_e, { small: !0, onClick: () => l(), style: { width: 50 }, children: i ? "Hide" : "Show" }),
    i && /* @__PURE__ */ O.jsx(aa, { settingControls: r, onChange: t })
  ] });
};
function Tl(e, n = void 0, t = void 0) {
  const r = document.createElement("div");
  r.id = "settings-root";
  const a = e.reduce((o, i) => (o[i.name] = i.default, o), {});
  try {
    De({ ...a, ...he }), (document.getElementById("game") ?? document.body).appendChild(r), Bo(r).render(
      /* @__PURE__ */ O.jsx(c.StrictMode, { children: /* @__PURE__ */ O.jsx(Sl, { children: /* @__PURE__ */ O.jsx(
        Nl,
        {
          settingControls: e,
          options: n,
          onChange: t
        }
      ) }) })
    );
  } catch (o) {
    console.warn("Error adding root", o);
  }
}
const Pl = ({ children: e, style: n }) => /* @__PURE__ */ O.jsx(
  "div",
  {
    style: {
      padding: 15,
      overflowY: "auto",
      ...n
    },
    children: e
  }
), wl = [
  {
    name: "fillAp",
    type: "checkbox",
    label: "Auto Fill Ap",
    default: !1
  },
  {
    name: "s1",
    type: "custom",
    comp: () => /* @__PURE__ */ O.jsx("div", { style: { display: "block", width: "100%" } })
  },
  {
    name: "lowRallyTroops",
    type: "number",
    label: "Min rally troops",
    default: 1e4
  },
  {
    name: "highRallyTroops",
    type: "number",
    label: "Max rally troops",
    default: 5e4
  },
  {
    name: "autoRally",
    label: "Rally types",
    type: "select",
    options: [
      "none",
      {
        value: [
          20200201,
          20200202,
          20200203,
          20200204,
          20700506,
          20700505,
          20200206,
          20200207
        ],
        label: "all rally types"
      },
      {
        value: [20200202, 20200203, 20200204, 20700505],
        label: "all dragons"
      }
    ],
    default: [
      20200201,
      20200202,
      20200203,
      20200204,
      20700506,
      20700505,
      20200206,
      20200207
    ]
  },
  {
    name: "participants",
    label: "Min Participants",
    tooltip: "Minimum rally participants before joining",
    type: "select",
    options: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    default: 3
  },
  {
    name: "20200201",
    label: "Min DK Lvl",
    type: "select-checkbox",
    checkBoxValue: "autoRally",
    options: [1, 2, 3, 4, 5, 6, 7, 8],
    default: 4
  },
  {
    name: "20200202",
    label: "Min Green Dragon Lvl",
    type: "select-checkbox",
    checkBoxValue: "autoRally",
    options: [1, 2, 3],
    default: 2
  },
  {
    name: "20200203",
    label: "Min Red Dragon Lvl",
    type: "select-checkbox",
    checkBoxValue: "autoRally",
    options: [1, 2, 3],
    default: 2
  },
  {
    name: "20200204",
    label: "Min Gold Dragon Lvl",
    type: "select-checkbox",
    checkBoxValue: "autoRally",
    options: [1, 2, 3],
    default: 2
  },
  {
    name: "20700506",
    label: "Min Spartoi lvl",
    type: "select-checkbox",
    checkBoxValue: "autoRally",
    options: [4, 5, 6, 7, 8, 9, 10],
    default: 4
  },
  {
    name: "20700505",
    label: "Min Magdar lvl",
    type: "select-checkbox",
    checkBoxValue: "autoRally",
    options: [1, 2, 3],
    default: 1
  },
  {
    name: "20200206",
    label: "Min Panta lvl",
    type: "select-checkbox",
    checkBoxValue: "autoRally",
    options: [1, 2, 3],
    default: 1
  },
  {
    name: "20200207",
    label: "Min Garga lvl",
    type: "select-checkbox",
    checkBoxValue: "autoRally",
    options: [1, 2, 3],
    default: 1
  }
], Al = () => /* @__PURE__ */ O.jsxs(yn, { className: "RallyControls", children: [
  /* @__PURE__ */ O.jsx(Ar, { children: "Rally controls" }),
  /* @__PURE__ */ O.jsx(
    aa,
    {
      settingControls: wl,
      style: {
        flexDirection: "column",
        alignItems: "flex-start",
        display: "grid"
      }
    }
  )
] }), _l = () => {
  const { settings: e, setSettings: n } = qt(), t = (r) => {
    n({
      actions: { ...e.actions, [r.target.name]: r.target.checked }
    });
  };
  return /* @__PURE__ */ O.jsxs(
    Pl,
    {
      style: {
        height: "100%"
      },
      children: [
        /* @__PURE__ */ O.jsxs(yn, { style: { marginBottom: 10 }, children: [
          /* @__PURE__ */ O.jsx(Ar, { children: "Actions to perform" }),
          /* @__PURE__ */ O.jsx("div", {}),
          /* @__PURE__ */ O.jsx(
            G,
            {
              label: "Collect Resources",
              name: "collectResources",
              checked: e.actions?.collectResources,
              onChange: t
            }
          ),
          /* @__PURE__ */ O.jsx(
            G,
            {
              label: "Claim VIP",
              name: "collectVip",
              checked: e.actions?.collectVip,
              onChange: t
            }
          ),
          /* @__PURE__ */ O.jsx(
            G,
            {
              label: "Claim DSA VIP",
              name: "collectdsaVip",
              checked: e.actions?.collectdsaVip,
              onChange: t
            }
          ),
          /* @__PURE__ */ O.jsx(
            G,
            {
              label: "Buy from Caravan",
              name: "useCaravan",
              checked: e.actions?.useCaravan,
              onChange: t
            }
          ),
          /* @__PURE__ */ O.jsx(
            G,
            {
              label: "Help",
              name: "useHelp",
              checked: e.actions?.useHelp,
              onChange: t
            }
          ),
          /* @__PURE__ */ O.jsx(
            G,
            {
              label: "Instant Harvest",
              name: "useInstantHarvest",
              checked: e.actions?.useInstantHarvest,
              onChange: t
            }
          ),
          /* @__PURE__ */ O.jsx(
            G,
            {
              label: "Donate Tech",
              name: "donateTech",
              checked: e.actions?.donateTech,
              onChange: t
            }
          ),
          /* @__PURE__ */ O.jsx(
            G,
            {
              label: "Join Rallies",
              name: "joinRallies",
              checked: e.actions?.joinRallies,
              onChange: t
            }
          ),
          /* @__PURE__ */ O.jsx(
            G,
            {
              label: "Collect Gift",
              name: "collectGift",
              checked: e.actions?.collectGift,
              onChange: t
            }
          ),
          /* @__PURE__ */ O.jsx(
            G,
            {
              label: "Collect Free Chests",
              name: "collectFreeChest",
              checked: e.actions?.collectFreeChest,
              onChange: t
            }
          )
        ] }),
        /* @__PURE__ */ O.jsx(Al, {})
      ]
    }
  );
}, Ll = () => {
  const [e, n] = c.useState(!1), { setSettings: t } = qt();
  return c.useEffect(() => {
    t({ shown: e });
  }, [e]), /* @__PURE__ */ O.jsxs(O.Fragment, { children: [
    /* @__PURE__ */ O.jsx(Kt, { children: /* @__PURE__ */ O.jsx(
      _e,
      {
        icon: "settings",
        onClick: () => n(!0)
      },
      "settings"
    ) }),
    e && /* @__PURE__ */ O.jsx(
      dl,
      {
        className: "bp5-dark",
        size: "small",
        icon: "settings",
        onClose: () => n(!1),
        isOpen: !0,
        title: "LOK Tools Settings",
        children: /* @__PURE__ */ O.jsx(_l, {})
      }
    )
  ] });
};
function Il({ sendCommand: e }) {
  Tl([
    {
      type: "custom",
      name: "menu",
      comp: Ll
    },
    {
      name: "autoRun",
      type: "switch",
      label: "Enabled",
      default: !1
    }
  ], {
    showToggle: !1
  });
}
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
const jl = 10, Bl = "ws://localhost:3000";
function ia(e, n = Bl) {
  te = new WebSocket(n), te.addEventListener("open", () => {
    console.log("Connected to server");
  }), te.addEventListener("open", () => {
    console.log("Connected to server"), At = 0;
    const t = {
      type: "identity",
      payload: {
        clientId: e
      }
    };
    te.send(JSON.stringify(t));
  }), te.addEventListener("message", async (t) => {
    const r = JSON.parse(t.data);
    if (r.type === "task") {
      if (r.payload.clientId !== e) {
        console.warn(
          `Received task intended for client ${r.payload.clientId}`
        );
        return;
      }
      const { id: a, url: o, headers: i, body: s, method: l } = r.payload;
      console.warn("DATA RECEIVED", o, s);
      const u = {
        type: "ack",
        payload: {
          id: a,
          clientId: e,
          status: "received"
        }
      };
      te.send(JSON.stringify(u));
      try {
        const d = await fetch(o, {
          method: l,
          headers: i,
          body: s,
          mode: "cors"
        }), p = await d.text(), f = {
          type: "response",
          payload: {
            id: a,
            clientId: e,
            status: d.status,
            headers: Object.fromEntries(d.headers.entries()),
            body: p
          }
        };
        te.send(JSON.stringify(f));
      } catch (d) {
        const p = {
          type: "response",
          payload: {
            id: a,
            clientId: e,
            status: 0,
            headers: {},
            body: "",
            error: d.message
          }
        };
        te.send(JSON.stringify(p));
      }
    }
  }), te.addEventListener("close", () => {
    if (console.log("Disconnected from server"), At < jl) {
      const t = Math.pow(2, At) * 1e3;
      console.log(`Attempting to reconnect in ${t / 1e3} seconds...`), setTimeout(() => {
        At++, ia(e, n);
      }, t);
    } else
      console.error(
        "Max reconnection attempts reached. Could not reconnect to server."
      );
  }), te.addEventListener("error", (t) => {
    console.error("WebSocket error:", t), te.close();
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
console.warn("serverURL", Bn);
/* async function Fn(e, n) {
  const t = `${Bn}/run_command`;
  (await (await fetch(t, {
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
  })).json()).message.includes("Subscription is not valid") && clearInterval($l);
} */
  async function Fn(e, n) {
    const t = `${Bn}/run_command`;
    const res = await fetch(t, {
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
    const json = await res.json();
  
    // Optional: log untuk debugging
    console.warn("Server response:", json.message);
  
    // DIBUANG: logika clearInterval
    // json.message.includes("Subscription is not valid") && clearInterval($l);
  }
  
Ie.addEventListener("settings.changed", (e) => {
  Jt?.result && Fn("syncSettings", [e.detail]);
});
const $l = setInterval(() => {
  Jt?.result && Fn("syncSettings", [he]);
}, 5 * Vl);
setTimeout(() => Il({ sendCommand: Fn }), 2e3);
const la = new TextDecoder("utf-8"), Kl = new TextEncoder();
let _t;
const Er = (e) => (console.warn("login response", e), Jt = e, Xt = oa(), null), yr = {
  "/api/alliance/battle/list/v2": (e) => null,
  "/api/auth/connect": Er,
  "/api/auth/login": Er,
  "/api/field/march/save": (e) => null,
  "/api/kingdom/enter": (e) => (sa = e, ia(e.kingdom._id, `${Bn}`), setTimeout(async () => {
    De({
      inCastle: !0,
      gameState: "loaded"
    });
  }, 2e3), null),
  "/api/item/list": (e) => null,
  "/api/kingdom/profile/my": (e) => null,
  "/api/item/use": (e, n) => {
  },
  "/api/field/rally/join": (e) => null
}, Yl = "loading";
De({
  gameState: Yl
});
const ql = [
  "/march/object/update",
  // '/march/objects',
  "/chat/new"
], Xl = [
  // '/field/object/remove',
  // '/field/object/update',
  // '/field/objects/v3',
  "/buff/list",
  "/zone/enter/list/v4",
  "/zone/leave/list/v2"
], Jl = (e, n) => {
  try {
    const r = e.data.slice(0, 2), a = e.data.slice(2);
    if (!Ut && n === "send")
      return;
    let [o, i] = a && JSON.parse(a);
    if (!o || !i || !Xl.includes(o) || ql.includes(o))
      return;
    switch (i = Xt.decode(i), e.origin) {
      case "wss://sock-lok-live.leagueofkingdoms.com":
        switch (o) {
          case "/task/new":
          case "/task/update":
            return;
          case "/buff/list":
            zl = i;
            return;
          case "/actionPoint/update":
            return;
          case "/kingdom/enter":
            return;
          case "/alliance/rally/new":
        }
        return;
      case "wss://socc-lok-live.leagueofkingdoms.com":
        return;
      case "wss://socf-lok-live.leagueofkingdoms.com":
        switch (o) {
          case "/field/enter":
            return;
          case "/field/objects":
          case "/field/objects/v3":
          case "/field/objects/v4": {
            De({
              inCastle: !1
            });
            return;
          }
        }
    }
  } catch {
    console.info("FAILED TO PARSE SOCKET DATA", e);
  }
};
setTimeout(() => {
});
Uo(window.WebSocket, Jl);
function Zl(e) {
  XMLHttpRequest.prototype.setRequestHeader = function(n, t) {
    e.apply(this, arguments), this.headers || (this.headers = {}), this.headers[n] || (this.headers[n] = []), this.headers[n].push(t);
  };
}
Zl(XMLHttpRequest.prototype.setRequestHeader);
const ua = ["dragothumb", "nft/avatar"], ca = ["api-lok-live", "lok-api-live"];
function Ql(e) {
  XMLHttpRequest.prototype.open = function() {
    const [n, t] = arguments, r = this;
    if (r.url = t, ua.some((a) => t.includes(a)) || ca.every((a) => !t.includes(a)))
      return e.apply(this, arguments);
    setTimeout(() => {
      const a = r.onload;
      this.onload = function(...o) {
        let i, s;
        const l = new URL(r.responseURL || window.location).pathname;
        r.getResponseHeader("content-type");
        let u;
        try {
          i = r.response && la.decode(r.response), i = Xt.decode(i), i && !i.result && (i.err?.code === "exceed_limit_packet" || i.err?.code === "not_online") && (De({
            autoRun: !1
          }), setTimeout(
            () => {
              De({
                autoRun: !0
              }), window.location.reload();
            },
            1e3 * 60 * 10
          ));
        } catch (d) {
          console.error("failed to parse response", l, i, d);
        }
        if (yr[l]) {
          try {
            s = yr[l](
              i || r.response,
              this.payload
            );
          } catch (d) {
            console.error("failed to transform response", l, d);
          }
          s && (Object.defineProperty(r, "response", { writable: !0 }), r.response = Kl.encode(JSON.stringify(s)).buffer);
        }
        Ie.dispatchEvent(
          new CustomEvent("xhr.load", {
            detail: {
              url: l,
              response: s || i
            }
          })
        ), a && a.apply(r, arguments);
      };
    }, 0), e.apply(this, arguments);
  };
}
Ql(XMLHttpRequest.prototype.open);
function eu(e) {
  XMLHttpRequest.prototype.send = function() {
    try {
      if (ua.some((r) => !this.url || this.url.includes(r)) || ca.every((r) => this.url && !this.url.includes(r)))
        return e.apply(this, arguments);
      !ot && this.headers?.["x-access-token"] && (ot = this.headers);
      const n = decodeURIComponent(
        // eslint-disable-next-line prefer-rest-params
        la.decode(arguments[0]).split("json=")[1]
      );
      if ((ot && (ot["content-Type"] || ot["Content-Type"])) !== "application/json" && (this.payload = Xt.decode(n)), Ie.dispatchEvent(
        new CustomEvent("xhr.send", {
          detail: {
            url: this.url,
            data: n
          }
        })
      ), _t && this.url.includes(_t)) {
        Ut && console.warn(
          "sent event returned due to blocked url",
          _t,
          this.url
        ), _t = void 0;
        return;
      }
    } catch {
    }
    e.apply(this, arguments);
  };
}
eu(XMLHttpRequest.prototype.send);
