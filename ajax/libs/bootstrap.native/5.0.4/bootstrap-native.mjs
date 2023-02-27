var xa = Object.defineProperty;
var er = (t, s, n) => s in t ? xa(t, s, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[s] = n;
var v = (t, s, n) => (er(t, typeof s != "symbol" ? s + "" : s, n), n);
var y = {};
(function(t) {
  Object.defineProperty(t, Symbol.toStringTag, { value: "Module" });
  const s = {}, n = (d) => {
    const { type: u, currentTarget: h } = d;
    [...s[u]].forEach(([p, f]) => {
      h === p && [...f].forEach(([b, A]) => {
        b.apply(p, [d]), typeof A == "object" && A.once && a(p, u, b, A);
      });
    });
  }, o = (d, u, h, p) => {
    s[u] || (s[u] = /* @__PURE__ */ new Map());
    const f = s[u];
    f.has(d) || f.set(d, /* @__PURE__ */ new Map());
    const b = f.get(d), { size: A } = b;
    b.set(h, p), A || d.addEventListener(u, n, p);
  }, a = (d, u, h, p) => {
    const f = s[u], b = f && f.get(d), A = b && b.get(h), R = A !== void 0 ? A : p;
    b && b.has(h) && b.delete(h), f && (!b || !b.size) && f.delete(d), (!f || !f.size) && delete s[u], (!b || !b.size) && d.removeEventListener(u, n, R);
  }, r = o, l = a;
  t.addListener = o, t.globalListener = n, t.off = l, t.on = r, t.registry = s, t.removeListener = a;
})(y);
var e = {};
(function(t) {
  Object.defineProperty(t, Symbol.toStringTag, { value: "Module" });
  const s = "aria-checked", n = "aria-description", o = "aria-describedby", a = "aria-expanded", r = "aria-haspopup", l = "aria-hidden", d = "aria-label", u = "aria-labelledby", h = "aria-modal", p = "aria-pressed", f = "aria-selected", b = "aria-valuemin", A = "aria-valuemax", R = "aria-valuenow", T = "aria-valuetext", M = "abort", z = "beforeunload", re = "blur", K = "change", $ = "contextmenu", Q = "DOMContentLoaded", j = "DOMMouseScroll", k = "error", P = "focus", S = "focusin", ce = "focusout", _ = "gesturechange", D = "gestureend", J = "gesturestart", oe = "keydown", he = "keypress", Z = "keyup", Be = "load", le = "click", Ae = "dblclick", Re = "mousedown", ie = "mouseup", x = "hover", ze = "mouseenter", ge = "mouseleave", fe = "mousein", ve = "mouseout", pe = "mouseover", $e = "mousemove", We = "mousewheel", pt = "move", mn = "orientationchange", hn = "pointercancel", gn = "pointerdown", fn = "pointerleave", vn = "pointermove", pn = "pointerup", En = "readystatechange", bn = "reset", Cn = "resize", yn = "select", Tn = "selectend", wn = "selectstart", Sn = "scroll", An = "submit", $n = "touchstart", Dn = "touchmove", Hn = "touchcancel", Ln = "touchend", kn = "unload", Jo = { DOMContentLoaded: Q, DOMMouseScroll: j, abort: M, beforeunload: z, blur: re, change: K, click: le, contextmenu: $, dblclick: Ae, error: k, focus: P, focusin: S, focusout: ce, gesturechange: _, gestureend: D, gesturestart: J, hover: x, keydown: oe, keypress: he, keyup: Z, load: Be, mousedown: Re, mousemove: $e, mousein: fe, mouseout: ve, mouseenter: ze, mouseleave: ge, mouseover: pe, mouseup: ie, mousewheel: We, move: pt, orientationchange: mn, pointercancel: hn, pointerdown: gn, pointerleave: fn, pointermove: vn, pointerup: pn, readystatechange: En, reset: bn, resize: Cn, scroll: Sn, select: yn, selectend: Tn, selectstart: wn, submit: An, touchcancel: Hn, touchend: Ln, touchmove: Dn, touchstart: $n, unload: kn }, Zo = "drag", xo = "dragstart", ei = "dragenter", ti = "dragleave", ni = "dragover", si = "dragend", oi = "loadstart", ii = { start: "mousedown", end: "mouseup", move: "mousemove", cancel: "mouseleave" }, ai = { down: "mousedown", up: "mouseup" }, ri = "onmouseleave" in document ? ["mouseenter", "mouseleave"] : ["mouseover", "mouseout"], ci = { start: "touchstart", end: "touchend", move: "touchmove", cancel: "touchcancel" }, li = { in: "focusin", out: "focusout" }, di = { Backspace: "Backspace", Tab: "Tab", Enter: "Enter", Shift: "Shift", Control: "Control", Alt: "Alt", Pause: "Pause", CapsLock: "CapsLock", Escape: "Escape", Scape: "Space", ArrowLeft: "ArrowLeft", ArrowUp: "ArrowUp", ArrowRight: "ArrowRight", ArrowDown: "ArrowDown", Insert: "Insert", Delete: "Delete", Meta: "Meta", ContextMenu: "ContextMenu", ScrollLock: "ScrollLock" }, ui = "Alt", mi = "ArrowDown", hi = "ArrowUp", gi = "ArrowLeft", fi = "ArrowRight", vi = "Backspace", pi = "CapsLock", Ei = "Control", bi = "Delete", Ci = "Enter", yi = "Escape", Ti = "Insert", wi = "Meta", Si = "Pause", Ai = "ScrollLock", $i = "Shift", Di = "Space", Hi = "Tab", In = "animationDuration", Nn = "animationDelay", Ot = "animationName", Et = "animationend", Mn = "transitionDuration", Pn = "transitionDelay", bt = "transitionend", Bt = "transitionProperty", Li = "addEventListener", ki = "removeEventListener", Ii = { linear: "linear", easingSinusoidalIn: "cubic-bezier(0.47,0,0.745,0.715)", easingSinusoidalOut: "cubic-bezier(0.39,0.575,0.565,1)", easingSinusoidalInOut: "cubic-bezier(0.445,0.05,0.55,0.95)", easingQuadraticIn: "cubic-bezier(0.550,0.085,0.680,0.530)", easingQuadraticOut: "cubic-bezier(0.250,0.460,0.450,0.940)", easingQuadraticInOut: "cubic-bezier(0.455,0.030,0.515,0.955)", easingCubicIn: "cubic-bezier(0.55,0.055,0.675,0.19)", easingCubicOut: "cubic-bezier(0.215,0.61,0.355,1)", easingCubicInOut: "cubic-bezier(0.645,0.045,0.355,1)", easingQuarticIn: "cubic-bezier(0.895,0.03,0.685,0.22)", easingQuarticOut: "cubic-bezier(0.165,0.84,0.44,1)", easingQuarticInOut: "cubic-bezier(0.77,0,0.175,1)", easingQuinticIn: "cubic-bezier(0.755,0.05,0.855,0.06)", easingQuinticOut: "cubic-bezier(0.23,1,0.32,1)", easingQuinticInOut: "cubic-bezier(0.86,0,0.07,1)", easingExponentialIn: "cubic-bezier(0.95,0.05,0.795,0.035)", easingExponentialOut: "cubic-bezier(0.19,1,0.22,1)", easingExponentialInOut: "cubic-bezier(1,0,0,1)", easingCircularIn: "cubic-bezier(0.6,0.04,0.98,0.335)", easingCircularOut: "cubic-bezier(0.075,0.82,0.165,1)", easingCircularInOut: "cubic-bezier(0.785,0.135,0.15,0.86)", easingBackIn: "cubic-bezier(0.6,-0.28,0.735,0.045)", easingBackOut: "cubic-bezier(0.175,0.885,0.32,1.275)", easingBackInOut: "cubic-bezier(0.68,-0.55,0.265,1.55)" }, Ni = "offsetHeight", Mi = "offsetWidth", Pi = "scrollHeight", Oi = "scrollWidth", Bi = "tabindex", Ri = navigator.userAgentData, Qe = Ri, { userAgent: zi } = navigator, Xe = zi, On = /iPhone|iPad|iPod|Android/i;
  let Rt = !1;
  Qe ? Rt = Qe.brands.some((i) => On.test(i.brand)) : Rt = On.test(Xe);
  const Wi = Rt, Bn = /(iPhone|iPod|iPad)/, qi = Qe ? Qe.brands.some((i) => Bn.test(i.brand)) : Bn.test(Xe), Fi = Xe ? Xe.includes("Firefox") : !1, { head: Ye } = document, ji = ["webkitPerspective", "perspective"].some((i) => i in Ye.style), Rn = (i, c, m, g) => {
    const E = g || !1;
    i.addEventListener(c, m, E);
  }, zn = (i, c, m, g) => {
    const E = g || !1;
    i.removeEventListener(c, m, E);
  }, Wn = (i, c, m, g) => {
    const E = (N) => {
      (N.target === i || N.currentTarget === i) && (m.apply(i, [N]), zn(i, c, E, g));
    };
    Rn(i, c, E, g);
  }, qn = () => {
  }, Vi = (() => {
    let i = !1;
    try {
      const c = Object.defineProperty({}, "passive", { get: () => (i = !0, i) });
      Wn(document, Q, qn, c);
    } catch {
    }
    return i;
  })(), Ui = ["webkitTransform", "transform"].some((i) => i in Ye.style), Ki = "ontouchstart" in window || "msMaxTouchPoints" in navigator, Qi = ["webkitAnimation", "animation"].some((i) => i in Ye.style), Xi = ["webkitTransition", "transition"].some((i) => i in Ye.style), Fn = (i, c) => i.getAttribute(c), Yi = (i, c, m) => c.getAttributeNS(i, m), Gi = (i, c) => i.hasAttribute(c), _i = (i, c, m) => c.hasAttributeNS(i, m), Ji = (i, c, m) => i.setAttribute(c, m), Zi = (i, c, m, g) => c.setAttributeNS(i, m, g), xi = (i, c) => i.removeAttribute(c), ea = (i, c, m) => c.removeAttributeNS(i, m), ta = (i, ...c) => {
    i.classList.add(...c);
  }, na = (i, ...c) => {
    i.classList.remove(...c);
  }, sa = (i, c) => i.classList.contains(c), { body: oa } = document, { documentElement: ia } = document, aa = (i) => Array.from(i), de = (i) => i != null && typeof i == "object" || !1, I = (i) => de(i) && typeof i.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((c) => i.nodeType === c) || !1, W = (i) => I(i) && i.nodeType === 1 || !1, Ge = /* @__PURE__ */ new Map(), Ct = { set: (i, c, m) => {
    W(i) && (Ge.has(c) || Ge.set(c, /* @__PURE__ */ new Map()), Ge.get(c).set(i, m));
  }, getAllFor: (i) => Ge.get(i) || null, get: (i, c) => {
    if (!W(i) || !c)
      return null;
    const m = Ct.getAllFor(c);
    return i && m && m.get(i) || null;
  }, remove: (i, c) => {
    const m = Ct.getAllFor(c);
    !m || !W(i) || (m.delete(i), m.size === 0 && Ge.delete(c));
  } }, ra = (i, c) => Ct.get(i, c), _e = (i) => typeof i == "string" || !1, zt = (i) => de(i) && i.constructor.name === "Window" || !1, Wt = (i) => I(i) && i.nodeType === 9 || !1, ee = (i) => zt(i) ? i.document : Wt(i) ? i : I(i) ? i.ownerDocument : window.document, Je = (i, ...c) => Object.assign(i, ...c), jn = (i) => {
    if (!i)
      return;
    if (_e(i))
      return ee().createElement(i);
    const { tagName: c } = i, m = jn(c);
    if (!m)
      return;
    const g = { ...i };
    return delete g.tagName, Je(m, g);
  }, Vn = (i, c) => {
    if (!i || !c)
      return;
    if (_e(c))
      return ee().createElementNS(i, c);
    const { tagName: m } = c, g = Vn(i, m);
    if (!g)
      return;
    const E = { ...c };
    return delete E.tagName, Je(g, E);
  }, qt = (i, c) => i.dispatchEvent(c), ca = (i, c, m) => m.indexOf(i) === c, ue = (i, c) => {
    const m = getComputedStyle(i), g = c.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
    return m.getPropertyValue(g);
  }, Un = (i) => {
    const c = ue(i, Ot), m = ue(i, Nn), g = m.includes("ms") ? 1 : 1e3, E = c && c !== "none" ? parseFloat(m) * g : 0;
    return Number.isNaN(E) ? 0 : E;
  }, Kn = (i) => {
    const c = ue(i, Ot), m = ue(i, In), g = m.includes("ms") ? 1 : 1e3, E = c && c !== "none" ? parseFloat(m) * g : 0;
    return Number.isNaN(E) ? 0 : E;
  }, la = (i, c) => {
    let m = 0;
    const g = new Event(Et), E = Kn(i), N = Un(i);
    if (E) {
      const O = (X) => {
        X.target === i && (c.apply(i, [X]), i.removeEventListener(Et, O), m = 1);
      };
      i.addEventListener(Et, O), setTimeout(() => {
        m || qt(i, g);
      }, E + N + 17);
    } else
      c.apply(i, [g]);
  }, Qn = (i) => {
    const c = ue(i, Bt), m = ue(i, Pn), g = m.includes("ms") ? 1 : 1e3, E = c && c !== "none" ? parseFloat(m) * g : 0;
    return Number.isNaN(E) ? 0 : E;
  }, Xn = (i) => {
    const c = ue(i, Bt), m = ue(i, Mn), g = m.includes("ms") ? 1 : 1e3, E = c && c !== "none" ? parseFloat(m) * g : 0;
    return Number.isNaN(E) ? 0 : E;
  }, da = (i, c) => {
    let m = 0;
    const g = new Event(bt), E = Xn(i), N = Qn(i);
    if (E) {
      const O = (X) => {
        X.target === i && (c.apply(i, [X]), i.removeEventListener(bt, O), m = 1);
      };
      i.addEventListener(bt, O), setTimeout(() => {
        m || qt(i, g);
      }, E + N + 17);
    } else
      c.apply(i, [g]);
  }, ua = (i) => Float32Array.from(Array.from(i)), ma = (i) => Float64Array.from(Array.from(i)), ha = (i, c) => i.focus(c), Ft = (i) => ["true", !0].includes(i) ? !0 : ["false", !1].includes(i) ? !1 : ["null", "", null, void 0].includes(i) ? null : i !== "" && !Number.isNaN(+i) ? +i : i, Ze = (i) => Object.entries(i), Yn = (i) => i.toLowerCase(), ga = (i, c, m, g) => {
    const E = { ...m }, N = { ...i.dataset }, O = { ...c }, X = {}, be = "title";
    return Ze(N).forEach(([H, Ce]) => {
      const Tt = g && typeof H == "string" && H.includes(g) ? H.replace(g, "").replace(/[A-Z]/g, (Za) => Yn(Za)) : H;
      X[Tt] = Ft(Ce);
    }), Ze(E).forEach(([H, Ce]) => {
      E[H] = Ft(Ce);
    }), Ze(c).forEach(([H, Ce]) => {
      H in E ? O[H] = E[H] : H in X ? O[H] = X[H] : O[H] = H === be ? Fn(i, be) : Ce;
    }), O;
  }, fa = (i, c) => de(i) && (Object.hasOwn(i, c) || c in i), va = (i) => Object.keys(i), pa = (i) => Object.values(i), Ea = (i, c) => {
    const m = new CustomEvent(i, { cancelable: !0, bubbles: !0 });
    return de(c) && Je(m, c), m;
  }, ba = { passive: !0 }, Ca = (i) => i.offsetHeight, ya = (i, c) => {
    Ze(c).forEach(([m, g]) => {
      if (g && _e(m) && m.includes("--"))
        i.style.setProperty(m, g);
      else {
        const E = {};
        E[m] = g, Je(i.style, E);
      }
    });
  }, yt = (i) => de(i) && i.constructor.name === "Map" || !1, Gn = (i) => typeof i == "number" || !1, Ee = /* @__PURE__ */ new Map(), Ta = { set: (i, c, m, g) => {
    W(i) && (g && g.length ? (Ee.has(i) || Ee.set(i, /* @__PURE__ */ new Map()), Ee.get(i).set(g, setTimeout(c, m))) : Ee.set(i, setTimeout(c, m)));
  }, get: (i, c) => {
    if (!W(i))
      return null;
    const m = Ee.get(i);
    return c && m && yt(m) ? m.get(c) || null : Gn(m) ? m : null;
  }, clear: (i, c) => {
    if (!W(i))
      return;
    const m = Ee.get(i);
    c && c.length && yt(m) ? (clearTimeout(m.get(c)), m.delete(c), m.size === 0 && Ee.delete(i)) : (clearTimeout(m), Ee.delete(i));
  } }, wa = (i) => i.toUpperCase(), qe = (i, c) => {
    const { width: m, height: g, top: E, right: N, bottom: O, left: X } = i.getBoundingClientRect();
    let be = 1, H = 1;
    if (c && W(i)) {
      const { offsetWidth: Ce, offsetHeight: Tt } = i;
      be = Ce > 0 ? Math.round(m) / Ce : 1, H = Tt > 0 ? Math.round(g) / Tt : 1;
    }
    return { width: m / be, height: g / H, top: E / H, right: N / be, bottom: O / H, left: X / be, x: X / be, y: E / H };
  }, Sa = (i) => ee(i).body, xe = (i) => ee(i).documentElement, Aa = (i) => ee(i).head, $a = (i) => {
    const c = zt(i), m = c ? i.scrollX : i.scrollLeft, g = c ? i.scrollY : i.scrollTop;
    return { x: m, y: g };
  }, _n = (i) => I(i) && i.constructor.name === "ShadowRoot" || !1, Da = (i) => i.nodeName === "HTML" ? i : W(i) && i.assignedSlot || I(i) && i.parentNode || _n(i) && i.host || xe(i), Jn = (i) => {
    if (!W(i))
      return !1;
    const { width: c, height: m } = qe(i), { offsetWidth: g, offsetHeight: E } = i;
    return Math.round(c) !== g || Math.round(m) !== E;
  }, Ha = (i, c, m) => {
    const g = W(c), E = qe(i, g && Jn(c)), N = { x: 0, y: 0 };
    if (g) {
      const O = qe(c, !0);
      N.x = O.x + c.clientLeft, N.y = O.y + c.clientTop;
    }
    return { x: E.left + m.x - N.x, y: E.top + m.y - N.y, width: E.width, height: E.height };
  };
  let Zn = 0, xn = 0;
  const Fe = /* @__PURE__ */ new Map(), es = (i, c) => {
    let m = c ? Zn : xn;
    if (c) {
      const g = es(i), E = Fe.get(g) || /* @__PURE__ */ new Map();
      Fe.has(g) || Fe.set(g, E), yt(E) && !E.has(c) ? (E.set(c, m), Zn += 1) : m = E.get(c);
    } else {
      const g = i.id || i;
      Fe.has(g) ? m = Fe.get(g) : (Fe.set(g, m), xn += 1);
    }
    return m;
  }, La = (i) => {
    var c;
    return i ? Wt(i) ? i.defaultView : I(i) ? (c = i == null ? void 0 : i.ownerDocument) == null ? void 0 : c.defaultView : i : window;
  }, ts = (i) => Array.isArray(i) || !1, ka = (i) => I(i) && i.nodeName === "CANVAS" || !1, ns = (i) => W(i) && !!i.shadowRoot || !1, Ia = (i) => I(i) && [1, 2, 3, 4, 5, 6, 7, 8].some((c) => i.nodeType === c) || !1, Na = (i) => {
    if (!I(i))
      return !1;
    const { top: c, bottom: m } = qe(i), { clientHeight: g } = xe(i);
    return c <= g && m >= 0;
  }, Ma = (i) => {
    if (!I(i))
      return !1;
    const { clientWidth: c, clientHeight: m } = xe(i), { top: g, left: E, bottom: N, right: O } = qe(i, !0);
    return g >= 0 && E >= 0 && N <= m && O <= c;
  }, Pa = (i) => ts(i) && i.every(W) || !1, Oa = (i) => typeof i == "function" || !1, Ba = (i) => de(i) && i.constructor.name === "HTMLCollection" || !1, Ra = (i) => W(i) && i.tagName === "IMG" || !1, za = (i) => {
    if (!_e(i))
      return !1;
    try {
      JSON.parse(i);
    } catch {
      return !1;
    }
    return !0;
  }, Wa = (i) => de(i) && i.constructor.name === "WeakMap" || !1, qa = (i) => I(i) && ["SVG", "Image", "Video", "Canvas"].some((c) => i.constructor.name.includes(c)) || !1, Fa = (i) => de(i) && i.constructor.name === "NodeList" || !1, ja = (i) => xe(i).dir === "rtl", Va = (i) => I(i) && i.constructor.name.includes("SVG") || !1, Ua = (i) => I(i) && ["TABLE", "TD", "TH"].includes(i.nodeName) || !1, ss = (i, c) => i ? i.closest(c) || ss(i.getRootNode().host, c) : null, Ka = (i, c) => W(i) ? i : (I(c) ? c : ee()).querySelector(i), os = (i, c) => (I(c) ? c : ee()).getElementsByTagName(i), Qa = (i) => [...os("*", i)].filter(ns), Xa = (i, c) => ee(c).getElementById(i) || null, Ya = (i, c) => (I(c) ? c : ee()).querySelectorAll(i), Ga = (i, c) => (c && I(c) ? c : ee()).getElementsByClassName(i), _a = (i, c) => i.matches(c), Ja = "2.0.0alpha12";
  t.ArrayFrom = aa, t.DOMContentLoadedEvent = Q, t.DOMMouseScrollEvent = j, t.Data = Ct, t.Float32ArrayFrom = ua, t.Float64ArrayFrom = ma, t.ObjectAssign = Je, t.ObjectEntries = Ze, t.ObjectHasOwn = fa, t.ObjectKeys = va, t.ObjectValues = pa, t.Timer = Ta, t.abortEvent = M, t.addClass = ta, t.addEventListener = Li, t.animationDelay = Nn, t.animationDuration = In, t.animationEndEvent = Et, t.animationName = Ot, t.ariaChecked = s, t.ariaDescribedBy = o, t.ariaDescription = n, t.ariaExpanded = a, t.ariaHasPopup = r, t.ariaHidden = l, t.ariaLabel = d, t.ariaLabelledBy = u, t.ariaModal = h, t.ariaPressed = p, t.ariaSelected = f, t.ariaValueMax = A, t.ariaValueMin = b, t.ariaValueNow = R, t.ariaValueText = T, t.beforeunloadEvent = z, t.bezierEasings = Ii, t.blurEvent = re, t.changeEvent = K, t.closest = ss, t.contextmenuEvent = $, t.createCustomEvent = Ea, t.createElement = jn, t.createElementNS = Vn, t.dispatchEvent = qt, t.distinct = ca, t.documentBody = oa, t.documentElement = ia, t.documentHead = Ye, t.dragEvent = Zo, t.dragendEvent = si, t.dragenterEvent = ei, t.dragleaveEvent = ti, t.dragoverEvent = ni, t.dragstartEvent = xo, t.emulateAnimationEnd = la, t.emulateTransitionEnd = da, t.errorEvent = k, t.focus = ha, t.focusEvent = P, t.focusEvents = li, t.focusinEvent = S, t.focusoutEvent = ce, t.gesturechangeEvent = _, t.gestureendEvent = D, t.gesturestartEvent = J, t.getAttribute = Fn, t.getAttributeNS = Yi, t.getBoundingClientRect = qe, t.getCustomElements = Qa, t.getDocument = ee, t.getDocumentBody = Sa, t.getDocumentElement = xe, t.getDocumentHead = Aa, t.getElementAnimationDelay = Un, t.getElementAnimationDuration = Kn, t.getElementById = Xa, t.getElementStyle = ue, t.getElementTransitionDelay = Qn, t.getElementTransitionDuration = Xn, t.getElementsByClassName = Ga, t.getElementsByTagName = os, t.getInstance = ra, t.getNodeScroll = $a, t.getParentNode = Da, t.getRectRelativeToOffsetParent = Ha, t.getUID = es, t.getWindow = La, t.hasAttribute = Gi, t.hasAttributeNS = _i, t.hasClass = sa, t.isApple = qi, t.isArray = ts, t.isCanvas = ka, t.isCustomElement = ns, t.isDocument = Wt, t.isElement = Ia, t.isElementInScrollRange = Na, t.isElementInViewport = Ma, t.isElementsArray = Pa, t.isFirefox = Fi, t.isFunction = Oa, t.isHTMLCollection = Ba, t.isHTMLElement = W, t.isHTMLImageElement = Ra, t.isJSON = za, t.isMap = yt, t.isMedia = qa, t.isMobile = Wi, t.isNode = I, t.isNodeList = Fa, t.isNumber = Gn, t.isObject = de, t.isRTL = ja, t.isSVGElement = Va, t.isScaledElement = Jn, t.isShadowRoot = _n, t.isString = _e, t.isTableElement = Ua, t.isWeakMap = Wa, t.isWindow = zt, t.keyAlt = ui, t.keyArrowDown = mi, t.keyArrowLeft = gi, t.keyArrowRight = fi, t.keyArrowUp = hi, t.keyBackspace = vi, t.keyCapsLock = pi, t.keyControl = Ei, t.keyDelete = bi, t.keyEnter = Ci, t.keyEscape = yi, t.keyInsert = Ti, t.keyMeta = wi, t.keyPause = Si, t.keyScrollLock = Ai, t.keyShift = $i, t.keySpace = Di, t.keyTab = Hi, t.keyboardEventKeys = di, t.keydownEvent = oe, t.keypressEvent = he, t.keyupEvent = Z, t.loadEvent = Be, t.loadstartEvent = oi, t.matches = _a, t.mouseClickEvents = ai, t.mouseHoverEvents = ri, t.mouseSwipeEvents = ii, t.mouseclickEvent = le, t.mousedblclickEvent = Ae, t.mousedownEvent = Re, t.mouseenterEvent = ze, t.mousehoverEvent = x, t.mouseinEvent = fe, t.mouseleaveEvent = ge, t.mousemoveEvent = $e, t.mouseoutEvent = ve, t.mouseoverEvent = pe, t.mouseupEvent = ie, t.mousewheelEvent = We, t.moveEvent = pt, t.nativeEvents = Jo, t.noop = qn, t.normalizeOptions = ga, t.normalizeValue = Ft, t.off = zn, t.offsetHeight = Ni, t.offsetWidth = Mi, t.on = Rn, t.one = Wn, t.orientationchangeEvent = mn, t.passiveHandler = ba, t.pointercancelEvent = hn, t.pointerdownEvent = gn, t.pointerleaveEvent = fn, t.pointermoveEvent = vn, t.pointerupEvent = pn, t.querySelector = Ka, t.querySelectorAll = Ya, t.readystatechangeEvent = En, t.reflow = Ca, t.removeAttribute = xi, t.removeAttributeNS = ea, t.removeClass = na, t.removeEventListener = ki, t.resetEvent = bn, t.resizeEvent = Cn, t.scrollEvent = Sn, t.scrollHeight = Pi, t.scrollWidth = Oi, t.selectEvent = yn, t.selectendEvent = Tn, t.selectstartEvent = wn, t.setAttribute = Ji, t.setAttributeNS = Zi, t.setElementStyle = ya, t.submitEvent = An, t.support3DTransform = ji, t.supportAnimation = Qi, t.supportPassive = Vi, t.supportTouch = Ki, t.supportTransform = Ui, t.supportTransition = Xi, t.tabindex = Bi, t.toLowerCase = Yn, t.toUpperCase = wa, t.touchEvents = ci, t.touchcancelEvent = Hn, t.touchendEvent = Ln, t.touchmoveEvent = Dn, t.touchstartEvent = $n, t.transitionDelay = Pn, t.transitionDuration = Mn, t.transitionEndEvent = bt, t.transitionProperty = Bt, t.unloadEvent = kn, t.userAgent = Xe, t.userAgentData = Qe, t.version = Ja;
})(e);
const B = "fade", C = "show", Lt = "data-bs-dismiss", kt = "alert", oo = "Alert", tr = "5.0.4", nr = tr;
class se {
  /**
   * @param target `HTMLElement` or selector string
   * @param config component instance options
   */
  constructor(s, n) {
    v(this, "element");
    v(this, "options");
    const o = e.querySelector(s);
    if (!o)
      throw e.isString(s) ? Error(`${this.name} Error: "${s}" is not a valid selector.`) : Error(`${this.name} Error: your target is not an instance of HTMLElement.`);
    const a = e.Data.get(o, this.name);
    a && a.dispose(), this.element = o, this.defaults && e.ObjectKeys(this.defaults).length && (this.options = e.normalizeOptions(o, this.defaults, n || {}, "bs")), e.Data.set(o, this.name, this);
  }
  /* istanbul ignore next */
  get version() {
    return nr;
  }
  /* istanbul ignore next */
  get name() {
    return "BaseComponent";
  }
  /* istanbul ignore next */
  get defaults() {
    return {};
  }
  /**
   * Removes component from target element;
   */
  dispose() {
    e.Data.remove(this.element, this.name), e.ObjectKeys(this).forEach((s) => {
      delete this[s];
    });
  }
}
const sr = `.${kt}`, or = `[${Lt}="${kt}"]`, ir = (t) => e.getInstance(t, oo), ar = (t) => new nt(t), is = e.createCustomEvent(`close.bs.${kt}`), rr = e.createCustomEvent(`closed.bs.${kt}`), as = (t) => {
  const { element: s } = t;
  _t(t), e.dispatchEvent(s, rr), t.dispose(), s.remove();
}, _t = (t, s) => {
  const n = s ? y.addListener : y.removeListener, { dismiss: o, close: a } = t;
  o && n(o, e.mouseclickEvent, a);
};
class nt extends se {
  constructor(n) {
    super(n);
    v(this, "dismiss");
    // ALERT PUBLIC METHODS
    // ====================
    /**
     * Public method that hides the `.alert` element from the user,
     * disposes the instance once animation is complete, then
     * removes the element from the DOM.
     */
    v(this, "close", () => {
      const { element: n } = this;
      if (n && e.hasClass(n, C)) {
        if (e.dispatchEvent(n, is), is.defaultPrevented)
          return;
        e.removeClass(n, C), e.hasClass(n, B) ? e.emulateTransitionEnd(n, () => as(this)) : as(this);
      }
    });
    this.dismiss = e.querySelector(or, this.element), _t(this, !0);
  }
  /** Returns component name string. */
  get name() {
    return oo;
  }
  /** Remove the component from target element. */
  dispose() {
    _t(this), super.dispose();
  }
}
v(nt, "selector", sr), v(nt, "init", ar), v(nt, "getInstance", ir);
const w = "active", V = "data-bs-toggle", cr = "button", io = "Button", lr = `[${V}="${cr}"]`, dr = (t) => e.getInstance(t, io), ur = (t) => new st(t), rs = (t, s) => {
  (s ? y.addListener : y.removeListener)(t.element, e.mouseclickEvent, t.toggle);
};
class st extends se {
  /**
   * @param target usually a `.btn` element
   */
  constructor(n) {
    super(n);
    v(this, "isActive", !1);
    // BUTTON PUBLIC METHODS
    // =====================
    /**
     * Toggles the state of the target button.
     *
     * @param e usually `click` Event object
     */
    v(this, "toggle", (n) => {
      n && n.preventDefault();
      const { element: o, isActive: a } = this;
      if (e.hasClass(o, "disabled"))
        return;
      (a ? e.removeClass : e.addClass)(o, w), e.setAttribute(o, e.ariaPressed, a ? "false" : "true"), this.isActive = e.hasClass(o, w);
    });
    const { element: o } = this;
    this.isActive = e.hasClass(o, w), e.setAttribute(o, e.ariaPressed, String(!!this.isActive)), rs(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return io;
  }
  /** Removes the `Button` component from the target element. */
  dispose() {
    rs(this), super.dispose();
  }
}
v(st, "selector", lr), v(st, "init", ur), v(st, "getInstance", dr);
const Jt = "data-bs-target", ke = "carousel", ao = "Carousel", cs = "data-bs-parent", mr = "data-bs-container", F = (t) => {
  const s = [Jt, cs, mr, "href"], n = e.getDocument(t);
  return s.map((o) => {
    const a = e.getAttribute(t, o);
    return a ? o === cs ? e.closest(t, a) : e.querySelector(a, n) : null;
  }).filter((o) => o)[0];
}, ft = `[data-bs-ride="${ke}"]`, te = `${ke}-item`, Zt = "data-bs-slide-to", Te = "data-bs-slide", we = "paused", ls = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, ae = (t) => e.getInstance(t, ao), hr = (t) => new ot(t);
let De = 0, je = 0, et = 0;
const jt = e.createCustomEvent(`slide.bs.${ke}`), xt = e.createCustomEvent(`slid.bs.${ke}`), gr = (t) => {
  const { index: s, direction: n, element: o, slides: a, options: r } = t;
  if (t.isAnimating && ae(o)) {
    const l = en(t), d = n === "left" ? "next" : "prev", u = n === "left" ? "start" : "end";
    e.addClass(a[s], w), e.removeClass(a[s], `${te}-${d}`), e.removeClass(a[s], `${te}-${u}`), e.removeClass(a[l], w), e.removeClass(a[l], `${te}-${u}`), e.dispatchEvent(o, xt), e.Timer.clear(o, Te), !e.getDocument(o).hidden && r.interval && !t.isPaused && t.cycle();
  }
};
function fr() {
  const t = ae(this);
  t && !t.isPaused && !e.Timer.get(this, we) && e.addClass(this, we);
}
function vr() {
  const t = ae(this);
  t && t.isPaused && !e.Timer.get(this, we) && t.cycle();
}
function pr(t) {
  t.preventDefault();
  const s = e.closest(this, ft) || F(this), n = ae(s);
  if (!n || n.isAnimating)
    return;
  const o = +(e.getAttribute(this, Zt) || /* istanbul ignore next */
  0);
  this && !e.hasClass(this, w) && // event target is not active
  !Number.isNaN(o) && n.to(o);
}
function Er(t) {
  t.preventDefault();
  const s = e.closest(this, ft) || F(this), n = ae(s);
  if (!n || n.isAnimating)
    return;
  const o = e.getAttribute(this, Te);
  o === "next" ? n.next() : o === "prev" && n.prev();
}
const br = ({ code: t, target: s }) => {
  const n = e.getDocument(s), [o] = [...e.querySelectorAll(ft, n)].filter((u) => e.isElementInScrollRange(u)), a = ae(o);
  if (!a || a.isAnimating || /textarea|input/i.test(s.nodeName))
    return;
  const r = e.isRTL(o), l = r ? e.keyArrowLeft : e.keyArrowRight, d = r ? e.keyArrowRight : e.keyArrowLeft;
  t === d ? a.prev() : t === l && a.next();
};
function ds(t) {
  const { target: s } = t, n = ae(this);
  n && n.isTouch && (n.indicator && !n.indicator.contains(s) || !n.controls.includes(s)) && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
}
function Cr(t) {
  const { target: s } = t, n = ae(this);
  if (!n || n.isAnimating || n.isTouch)
    return;
  const { controls: o, indicators: a } = n;
  [...o, ...a].some((r) => r === s || r.contains(s)) || (De = t.pageX, this.contains(s) && (n.isTouch = !0, ro(n, !0)));
}
const yr = (t) => {
  je = t.pageX;
}, Tr = (t) => {
  var d;
  const { target: s } = t, n = e.getDocument(s), o = [...e.querySelectorAll(ft, n)].map((u) => ae(u)).find((u) => u.isTouch);
  if (!o)
    return;
  const { element: a, index: r } = o, l = e.isRTL(a);
  if (o.isTouch = !1, ro(o), (d = n.getSelection()) != null && d.toString().length) {
    De = 0, je = 0, et = 0;
    return;
  }
  if (et = t.pageX, !a.contains(s) || Math.abs(De - et) < 120) {
    De = 0, je = 0, et = 0;
    return;
  }
  je < De ? o.to(r + (l ? -1 : 1)) : je > De && o.to(r + (l ? 1 : -1)), De = 0, je = 0, et = 0;
}, Vt = (t, s) => {
  const { indicators: n } = t;
  [...n].forEach((o) => e.removeClass(o, w)), t.indicators[s] && e.addClass(n[s], w);
}, ro = (t, s) => {
  const { element: n } = t, o = s ? y.addListener : y.removeListener;
  o(e.getDocument(n), e.pointermoveEvent, yr, e.passiveHandler), o(e.getDocument(n), e.pointerupEvent, Tr, e.passiveHandler);
}, us = (t, s) => {
  const { element: n, options: o, slides: a, controls: r, indicators: l } = t, { touch: d, pause: u, interval: h, keyboard: p } = o, f = s ? y.addListener : y.removeListener;
  u && h && (f(n, e.mouseenterEvent, fr), f(n, e.mouseleaveEvent, vr)), d && a.length > 2 && (f(n, e.pointerdownEvent, Cr, e.passiveHandler), f(n, e.touchstartEvent, ds, { passive: !1 }), f(n, e.dragstartEvent, ds, { passive: !1 })), r.length && r.forEach((b) => {
    b && f(b, e.mouseclickEvent, Er);
  }), l.length && l.forEach((b) => {
    f(b, e.mouseclickEvent, pr);
  }), p && f(e.getDocument(n), e.keydownEvent, br);
}, en = (t) => {
  const { slides: s, element: n } = t, o = e.querySelector(`.${te}.${w}`, n);
  return e.isHTMLElement(o) ? [...s].indexOf(o) : -1;
};
class ot extends se {
  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(s, n) {
    super(s, n);
    const { element: o } = this;
    this.direction = e.isRTL(o) ? "right" : "left", this.index = 0, this.isTouch = !1, this.slides = e.getElementsByClassName(te, o);
    const { slides: a } = this;
    if (a.length < 2)
      return;
    const r = e.getDocument(o);
    this.controls = [
      ...e.querySelectorAll(`[${Te}]`, o),
      ...e.querySelectorAll(`[${Te}][${Jt}="#${o.id}"]`, r)
    ], this.indicator = e.querySelector(`.${ke}-indicators`, o), this.indicators = [
      ...this.indicator ? e.querySelectorAll(`[${Zt}]`, this.indicator) : [],
      ...e.querySelectorAll(`[${Zt}][${Jt}="#${o.id}"]`, r)
    ];
    const { options: l } = this;
    this.options.interval = l.interval === !0 ? ls.interval : l.interval, en(this) < 0 && (e.addClass(a[0], w), this.indicators.length && Vt(this, 0)), us(this, !0), l.interval && this.cycle();
  }
  /**
   * Returns component name string.
   */
  get name() {
    return ao;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return ls;
  }
  /**
   * Check if instance is paused.
   */
  get isPaused() {
    return e.hasClass(this.element, we);
  }
  /**
   * Check if instance is animating.
   */
  get isAnimating() {
    return e.querySelector(`.${te}-next,.${te}-prev`, this.element) !== null;
  }
  // CAROUSEL PUBLIC METHODS
  // =======================
  /** Slide automatically through items. */
  cycle() {
    const { element: s, options: n, isPaused: o, index: a } = this;
    e.Timer.clear(s, ke), o && (e.Timer.clear(s, we), e.removeClass(s, we)), e.Timer.set(
      s,
      () => {
        this.element && !this.isPaused && !this.isTouch && e.isElementInScrollRange(s) && this.to(a + 1);
      },
      n.interval,
      ke
    );
  }
  /** Pause the automatic cycle. */
  pause() {
    const { element: s, options: n } = this;
    !this.isPaused && n.interval && (e.addClass(s, we), e.Timer.set(
      s,
      () => {
      },
      1,
      we
    ));
  }
  /** Slide to the next item. */
  next() {
    this.isAnimating || this.to(this.index + 1);
  }
  /** Slide to the previous item. */
  prev() {
    this.isAnimating || this.to(this.index - 1);
  }
  /**
   * Jump to the item with the `idx` index.
   *
   * @param idx the index of the item to jump to
   */
  to(s) {
    const { element: n, slides: o, options: a } = this, r = en(this), l = e.isRTL(n);
    let d = s;
    if (this.isAnimating || r === d || e.Timer.get(n, Te))
      return;
    r < d || r === 0 && d === o.length - 1 ? this.direction = l ? "right" : "left" : (r > d || r === o.length - 1 && d === 0) && (this.direction = l ? "left" : "right");
    const { direction: u } = this;
    d < 0 ? d = o.length - 1 : d >= o.length && (d = 0);
    const h = u === "left" ? "next" : "prev", p = u === "left" ? "start" : "end", f = {
      relatedTarget: o[d],
      from: r,
      to: d,
      direction: u
    };
    e.ObjectAssign(jt, f), e.ObjectAssign(xt, f), e.dispatchEvent(n, jt), !jt.defaultPrevented && (this.index = d, Vt(this, d), e.getElementTransitionDuration(o[d]) && e.hasClass(n, "slide") ? e.Timer.set(
      n,
      () => {
        e.addClass(o[d], `${te}-${h}`), e.reflow(o[d]), e.addClass(o[d], `${te}-${p}`), e.addClass(o[r], `${te}-${p}`), e.emulateTransitionEnd(o[d], () => gr(this));
      },
      0,
      Te
    ) : (e.addClass(o[d], w), e.removeClass(o[r], w), e.Timer.set(
      n,
      () => {
        e.Timer.clear(n, Te), n && a.interval && !this.isPaused && this.cycle(), e.dispatchEvent(n, xt);
      },
      0,
      Te
    )));
  }
  /** Remove `Carousel` component from target. */
  dispose() {
    const { slides: s } = this, n = ["start", "end", "prev", "next"];
    [...s].forEach((o, a) => {
      e.hasClass(o, w) && Vt(this, a), n.forEach((r) => e.removeClass(o, `${te}-${r}`));
    }), us(this), super.dispose();
  }
}
v(ot, "selector", ft), v(ot, "init", hr), v(ot, "getInstance", ae);
const Me = "collapsing", q = "collapse", co = "Collapse", wr = `.${q}`, lo = `[${V}="${q}"]`, Sr = { parent: null }, wt = (t) => e.getInstance(t, co), Ar = (t) => new it(t), ms = e.createCustomEvent(`show.bs.${q}`), $r = e.createCustomEvent(`shown.bs.${q}`), hs = e.createCustomEvent(`hide.bs.${q}`), Dr = e.createCustomEvent(`hidden.bs.${q}`), Hr = (t) => {
  const { element: s, parent: n, triggers: o } = t;
  e.dispatchEvent(s, ms), !ms.defaultPrevented && (e.Timer.set(s, e.noop, 17), n && e.Timer.set(n, e.noop, 17), e.addClass(s, Me), e.removeClass(s, q), e.setElementStyle(s, { height: `${s.scrollHeight}px` }), e.emulateTransitionEnd(s, () => {
    e.Timer.clear(s), n && e.Timer.clear(n), o.forEach((a) => e.setAttribute(a, e.ariaExpanded, "true")), e.removeClass(s, Me), e.addClass(s, q), e.addClass(s, C), e.setElementStyle(s, { height: "" }), e.dispatchEvent(s, $r);
  }));
}, gs = (t) => {
  const { element: s, parent: n, triggers: o } = t;
  e.dispatchEvent(s, hs), !hs.defaultPrevented && (e.Timer.set(s, e.noop, 17), n && e.Timer.set(n, e.noop, 17), e.setElementStyle(s, { height: `${s.scrollHeight}px` }), e.removeClass(s, q), e.removeClass(s, C), e.addClass(s, Me), e.reflow(s), e.setElementStyle(s, { height: "0px" }), e.emulateTransitionEnd(s, () => {
    e.Timer.clear(s), n && e.Timer.clear(n), o.forEach((a) => e.setAttribute(a, e.ariaExpanded, "false")), e.removeClass(s, Me), e.addClass(s, q), e.setElementStyle(s, { height: "" }), e.dispatchEvent(s, Dr);
  }));
}, fs = (t, s) => {
  const n = s ? y.addListener : y.removeListener, { triggers: o } = t;
  o.length && o.forEach((a) => n(a, e.mouseclickEvent, Lr));
}, Lr = (t) => {
  const { target: s } = t, n = s && e.closest(s, lo), o = n && F(n), a = o && wt(o);
  a && a.toggle(), n && n.tagName === "A" && t.preventDefault();
};
class it extends se {
  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(s, n) {
    super(s, n);
    const { element: o, options: a } = this, r = e.getDocument(o);
    this.triggers = [...e.querySelectorAll(lo, r)].filter((l) => F(l) === o), this.parent = e.isHTMLElement(a.parent) ? a.parent : e.isString(a.parent) ? F(o) || e.querySelector(a.parent, r) : null, fs(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return co;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Sr;
  }
  // COLLAPSE PUBLIC METHODS
  // =======================
  /** Toggles the visibility of the collapse. */
  toggle() {
    e.hasClass(this.element, C) ? this.hide() : this.show();
  }
  /** Hides the collapse. */
  hide() {
    const { triggers: s, element: n } = this;
    e.Timer.get(n) || (gs(this), s.length && s.forEach((o) => e.addClass(o, `${q}d`)));
  }
  /** Shows the collapse. */
  show() {
    const { element: s, parent: n, triggers: o } = this;
    let a, r;
    n && (a = [...e.querySelectorAll(`.${q}.${C}`, n)].find(
      (l) => wt(l)
    ), r = a && wt(a)), (!n || !e.Timer.get(n)) && !e.Timer.get(s) && (r && a !== s && (gs(r), r.triggers.forEach((l) => {
      e.addClass(l, `${q}d`);
    })), Hr(this), o.length && o.forEach((l) => e.removeClass(l, `${q}d`)));
  }
  /** Remove the `Collapse` component from the target `Element`. */
  dispose() {
    fs(this), super.dispose();
  }
}
v(it, "selector", wr), v(it, "init", Ar), v(it, "getInstance", wt);
const Pe = ["dropdown", "dropup", "dropstart", "dropend"], uo = "Dropdown", mo = "dropdown-menu", ho = (t) => {
  const s = e.closest(t, "A");
  return t.tagName === "A" && // anchor href starts with #
  e.hasAttribute(t, "href") && t.href.slice(-1) === "#" || // OR a child of an anchor with href starts with #
  s && e.hasAttribute(s, "href") && s.href.slice(-1) === "#";
}, [ne, $t, Dt, Ht] = Pe, sn = `[${V}="${ne}"],[${V}="${$t}"],[${V}="${Ht}"],[${V}="${Dt}"]`, Ue = (t) => e.getInstance(t, uo), kr = (t) => new at(t), Ir = `${mo}-end`, vs = [ne, $t], ps = [Dt, Ht], Es = ["A", "BUTTON"], Nr = {
  offset: 5,
  // [number] 5(px)
  display: "dynamic"
  // [dynamic|static]
}, Ut = e.createCustomEvent(`show.bs.${ne}`), bs = e.createCustomEvent(`shown.bs.${ne}`), Kt = e.createCustomEvent(`hide.bs.${ne}`), Cs = e.createCustomEvent(`hidden.bs.${ne}`), go = e.createCustomEvent(`updated.bs.${ne}`), fo = (t) => {
  const { element: s, menu: n, parentElement: o, options: a } = t, { offset: r } = a;
  if (e.getElementStyle(n, "position") === "static")
    return;
  const l = e.isRTL(s), d = e.hasClass(n, Ir);
  ["margin", "top", "bottom", "left", "right"].forEach((D) => {
    const J = {};
    J[D] = "", e.setElementStyle(n, J);
  });
  let h = Pe.find((D) => e.hasClass(o, D)) || /* istanbul ignore next: fallback position */
  ne;
  const p = {
    dropdown: [r, 0, 0],
    dropup: [0, 0, r],
    dropstart: l ? [-1, 0, 0, r] : [-1, r, 0],
    dropend: l ? [-1, r, 0] : [-1, 0, 0, r]
  }, f = {
    dropdown: { top: "100%" },
    dropup: { top: "auto", bottom: "100%" },
    dropstart: l ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
    dropend: l ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
    menuStart: l ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
    menuEnd: l ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
  }, { offsetWidth: b, offsetHeight: A } = n, { clientWidth: R, clientHeight: T } = e.getDocumentElement(s), { left: M, top: z, width: re, height: K } = e.getBoundingClientRect(s), $ = M - b - r < 0, Q = M + b + re + r >= R, j = z + A + r >= T, k = z + A + K + r >= T, P = z - A - r < 0, S = (!l && d || l && !d) && M + re - b < 0, ce = (l && d || !l && !d) && M + b >= R;
  if (ps.includes(h) && $ && Q && (h = ne), h === Dt && (l ? Q : $) && (h = Ht), h === Ht && (l ? $ : Q) && (h = Dt), h === $t && P && !k && (h = ne), h === ne && k && !P && (h = $t), ps.includes(h) && j && e.ObjectAssign(f[h], {
    top: "auto",
    bottom: 0
  }), vs.includes(h) && (S || ce)) {
    let D = { left: "auto", right: "auto" };
    !S && ce && !l && (D = { left: "auto", right: 0 }), S && !ce && l && (D = { left: 0, right: "auto" }), D && e.ObjectAssign(f[h], D);
  }
  const _ = p[h];
  if (e.setElementStyle(n, {
    ...f[h],
    margin: `${_.map((D) => D && `${D}px`).join(" ")}`
  }), vs.includes(h) && d && d) {
    const D = !l && S || l && ce ? "menuStart" : (
      /* istanbul ignore next */
      "menuEnd"
    );
    e.setElementStyle(n, f[D]);
  }
  e.dispatchEvent(o, go);
}, Mr = (t) => [...t.children].map((s) => {
  if (s && Es.includes(s.tagName))
    return s;
  const { firstElementChild: n } = s;
  return n && Es.includes(n.tagName) ? n : null;
}).filter((s) => s), ys = (t) => {
  const { element: s, options: n } = t, o = t.open ? y.addListener : y.removeListener, a = e.getDocument(s);
  o(a, e.mouseclickEvent, ws), o(a, e.focusEvent, ws), o(a, e.keydownEvent, Or), o(a, e.keyupEvent, Br), n.display === "dynamic" && [e.scrollEvent, e.resizeEvent].forEach((r) => {
    o(e.getWindow(s), r, Rr, e.passiveHandler);
  });
}, Ts = (t, s) => {
  (s ? y.addListener : y.removeListener)(t.element, e.mouseclickEvent, Pr);
}, It = (t) => {
  const s = [...Pe, "btn-group", "input-group"].map((n) => e.getElementsByClassName(`${n} ${C}`, e.getDocument(t))).find((n) => n.length);
  if (s && s.length)
    return [...s[0].children].find(
      (n) => Pe.some((o) => o === e.getAttribute(n, V))
    );
}, ws = (t) => {
  const { target: s, type: n } = t;
  if (!s || !s.closest)
    return;
  const o = It(s), a = o && Ue(o);
  if (!a)
    return;
  const { parentElement: r, menu: l } = a, d = e.closest(s, sn) !== null, u = r && r.contains(s) && (s.tagName === "form" || e.closest(s, "form") !== null);
  n === e.mouseclickEvent && ho(s) && t.preventDefault(), !(n === e.focusEvent && (s === o || s === l || l.contains(s))) && (u || d || a && a.hide());
}, Pr = (t) => {
  const { target: s } = t, n = s && e.closest(s, sn), o = n && Ue(n);
  o && (t.stopImmediatePropagation(), o.toggle(), n && ho(n) && t.preventDefault());
}, Or = (t) => {
  [e.keyArrowDown, e.keyArrowUp].includes(t.code) && t.preventDefault();
};
function Br(t) {
  const { code: s } = t, n = It(this), o = n && Ue(n), { activeElement: a } = n && e.getDocument(n);
  if (!o || !a)
    return;
  const { menu: r, open: l } = o, d = Mr(r);
  if (d && d.length && [e.keyArrowDown, e.keyArrowUp].includes(s)) {
    let u = d.indexOf(a);
    a === n ? u = 0 : s === e.keyArrowUp ? u = u > 1 ? u - 1 : 0 : s === e.keyArrowDown && (u = u < d.length - 1 ? u + 1 : u), d[u] && e.focus(d[u]);
  }
  e.keyEscape === s && l && (o.toggle(), e.focus(n));
}
function Rr() {
  const t = It(this), s = t && Ue(t);
  s && s.open && fo(s);
}
class at extends se {
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(s, n) {
    super(s, n);
    const { parentElement: o } = this.element, a = e.querySelector(`.${mo}`, o);
    a && (this.parentElement = o, this.menu = a, Ts(this, !0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return uo;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Nr;
  }
  // DROPDOWN PUBLIC METHODS
  // =======================
  /** Shows/hides the dropdown menu to the user. */
  toggle() {
    this.open ? this.hide() : this.show();
  }
  /** Shows the dropdown menu to the user. */
  show() {
    const { element: s, open: n, menu: o, parentElement: a } = this;
    if (n)
      return;
    const r = It(s), l = r && Ue(r);
    l && l.hide(), [Ut, bs, go].forEach((d) => {
      d.relatedTarget = s;
    }), e.dispatchEvent(a, Ut), !Ut.defaultPrevented && (e.addClass(o, C), e.addClass(a, C), e.setAttribute(s, e.ariaExpanded, "true"), fo(this), this.open = !n, e.focus(s), ys(this), e.dispatchEvent(a, bs));
  }
  /** Hides the dropdown menu from the user. */
  hide() {
    const { element: s, open: n, menu: o, parentElement: a } = this;
    n && ([Kt, Cs].forEach((r) => {
      r.relatedTarget = s;
    }), e.dispatchEvent(a, Kt), !Kt.defaultPrevented && (e.removeClass(o, C), e.removeClass(a, C), e.setAttribute(s, e.ariaExpanded, "false"), this.open = !n, ys(this), e.dispatchEvent(a, Cs)));
  }
  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    this.open && this.hide(), Ts(this), super.dispose();
  }
}
v(at, "selector", sn), v(at, "init", kr), v(at, "getInstance", Ue);
const U = "modal", on = "Modal", an = "Offcanvas", zr = "fixed-top", Wr = "fixed-bottom", vo = "sticky-top", po = "position-sticky", Eo = (t) => [
  ...e.getElementsByClassName(zr, t),
  ...e.getElementsByClassName(Wr, t),
  ...e.getElementsByClassName(vo, t),
  ...e.getElementsByClassName(po, t),
  ...e.getElementsByClassName("is-fixed", t)
], qr = (t) => {
  const s = e.getDocumentBody(t);
  e.setElementStyle(s, {
    paddingRight: "",
    overflow: ""
  });
  const n = Eo(s);
  n.length && n.forEach((o) => {
    e.setElementStyle(o, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, bo = (t) => {
  const { clientWidth: s } = e.getDocumentElement(t), { innerWidth: n } = e.getWindow(t);
  return Math.abs(n - s);
}, Co = (t, s) => {
  const n = e.getDocumentBody(t), o = parseInt(e.getElementStyle(n, "paddingRight"), 10), r = e.getElementStyle(n, "overflow") === "hidden" && o ? 0 : bo(t), l = Eo(n);
  s && (e.setElementStyle(n, {
    overflow: "hidden",
    paddingRight: `${o + r}px`
  }), l.length && l.forEach((d) => {
    const u = e.getElementStyle(d, "paddingRight");
    if (d.style.paddingRight = `${parseInt(u, 10) + r}px`, [vo, po].some((h) => e.hasClass(d, h))) {
      const h = e.getElementStyle(d, "marginRight");
      d.style.marginRight = `${parseInt(h, 10) - r}px`;
    }
  }));
}, Y = "offcanvas", Se = e.createElement({ tagName: "div", className: "popup-container" }), yo = (t, s) => {
  const n = e.isNode(s) && s.nodeName === "BODY", o = e.isNode(s) && !n ? s : Se, a = n ? s : e.getDocumentBody(t);
  e.isNode(t) && (o === Se && a.append(Se), o.append(t));
}, To = (t, s) => {
  const n = e.isNode(s) && s.nodeName === "BODY", o = e.isNode(s) && !n ? s : Se;
  e.isNode(t) && (t.remove(), o === Se && !Se.children.length && Se.remove());
}, He = (t, s) => {
  const n = e.isNode(s) && s.nodeName !== "BODY" ? s : Se;
  return e.isNode(t) && n.contains(t);
}, wo = "backdrop", Ss = `${U}-${wo}`, As = `${Y}-${wo}`, So = `.${U}.${C}`, rn = `.${Y}.${C}`, L = e.createElement("div"), Oe = (t) => e.querySelector(`${So},${rn}`, e.getDocument(t)), cn = (t) => {
  const s = t ? Ss : As;
  [Ss, As].forEach((n) => {
    e.removeClass(L, n);
  }), e.addClass(L, s);
}, Ao = (t, s, n) => {
  cn(n), yo(L, e.getDocumentBody(t)), s && e.addClass(L, B);
}, $o = () => {
  e.hasClass(L, C) || (e.addClass(L, C), e.reflow(L));
}, Nt = () => {
  e.removeClass(L, C);
}, Do = (t) => {
  Oe(t) || (e.removeClass(L, B), To(L, e.getDocumentBody(t)), qr(t));
}, Ho = (t) => e.isHTMLElement(t) && e.getElementStyle(t, "visibility") !== "hidden" && t.offsetParent !== null, Fr = `.${U}`, Lo = `[${V}="${U}"]`, jr = `[${Lt}="${U}"]`, ko = `${U}-static`, Vr = {
  backdrop: !0,
  keyboard: !0
}, mt = (t) => e.getInstance(t, on), Ur = (t) => new rt(t), St = e.createCustomEvent(`show.bs.${U}`), $s = e.createCustomEvent(`shown.bs.${U}`), Qt = e.createCustomEvent(`hide.bs.${U}`), Ds = e.createCustomEvent(`hidden.bs.${U}`), Io = (t) => {
  const { element: s } = t, n = bo(s), { clientHeight: o, scrollHeight: a } = e.getDocumentElement(s), { clientHeight: r, scrollHeight: l } = s, d = r !== l;
  if (!d && n) {
    const u = e.isRTL(s) ? (
      /* istanbul ignore next */
      "paddingLeft"
    ) : "paddingRight", h = {};
    h[u] = `${n}px`, e.setElementStyle(s, h);
  }
  Co(s, d || o !== a);
}, No = (t, s) => {
  const n = s ? y.addListener : y.removeListener, { element: o, update: a } = t;
  n(o, e.mouseclickEvent, Xr), n(e.getWindow(o), e.resizeEvent, a, e.passiveHandler), n(e.getDocument(o), e.keydownEvent, Qr);
}, Hs = (t, s) => {
  const n = s ? y.addListener : y.removeListener, { triggers: o } = t;
  o.length && o.forEach((a) => n(a, e.mouseclickEvent, Kr));
}, Ls = (t, s) => {
  const { triggers: n, element: o, relatedTarget: a } = t;
  Do(o), e.setElementStyle(o, { paddingRight: "", display: "" }), No(t);
  const r = St.relatedTarget || n.find(Ho);
  r && e.focus(r), e.isFunction(s) && s(), Ds.relatedTarget = a, e.dispatchEvent(o, Ds);
}, ks = (t) => {
  const { element: s, relatedTarget: n } = t;
  e.focus(s), No(t, !0), $s.relatedTarget = n, e.dispatchEvent(s, $s);
}, Is = (t) => {
  const { element: s, hasFade: n } = t;
  e.setElementStyle(s, { display: "block" }), Io(t), Oe(s) || e.setElementStyle(e.getDocumentBody(s), { overflow: "hidden" }), e.addClass(s, C), e.removeAttribute(s, e.ariaHidden), e.setAttribute(s, e.ariaModal, "true"), n ? e.emulateTransitionEnd(s, () => ks(t)) : ks(t);
}, Ns = (t, s) => {
  const { element: n, options: o, hasFade: a } = t;
  o.backdrop && !s && a && e.hasClass(L, C) && !Oe(n) ? (Nt(), e.emulateTransitionEnd(L, () => Ls(t))) : Ls(t, s);
}, Kr = (t) => {
  const { target: s } = t, n = s && e.closest(s, Lo), o = n && F(n), a = o && mt(o);
  a && (n && n.tagName === "A" && t.preventDefault(), a.relatedTarget = n, a.toggle());
}, Qr = ({ code: t, target: s }) => {
  const n = e.querySelector(So, e.getDocument(s)), o = n && mt(n);
  if (!o)
    return;
  const { options: a } = o;
  a.keyboard && t === e.keyEscape && // the keyboard option is enabled and the key is 27
  e.hasClass(n, C) && (o.relatedTarget = null, o.hide());
};
function Xr(t) {
  var p, f;
  const s = mt(this);
  if (!s || e.Timer.get(this))
    return;
  const { options: n, isStatic: o, modalDialog: a } = s, { backdrop: r } = n, { target: l } = t, d = (f = (p = e.getDocument(this)) == null ? void 0 : p.getSelection()) == null ? void 0 : f.toString().length, u = a == null ? void 0 : a.contains(l), h = l && e.closest(l, jr);
  o && !u ? e.Timer.set(
    this,
    () => {
      e.addClass(this, ko), e.emulateTransitionEnd(a, () => Yr(s));
    },
    17
  ) : (h || !d && !o && !u && r) && (s.relatedTarget = h || null, s.hide(), t.preventDefault());
}
const Yr = (t) => {
  const { element: s, modalDialog: n } = t, o = (e.isHTMLElement(n) ? e.getElementTransitionDuration(n) : (
    /* istanbul ignore next */
    0
  )) + 17;
  e.removeClass(s, ko), e.Timer.set(s, () => e.Timer.clear(s), o);
};
class rt extends se {
  /**
   * @param target usually the `.modal` element
   * @param config instance options
   */
  constructor(n, o) {
    super(n, o);
    /**
     * Updates the modal layout.
     */
    v(this, "update", () => {
      e.hasClass(this.element, C) && Io(this);
    });
    const { element: a } = this;
    this.modalDialog = e.querySelector(`.${U}-dialog`, a), this.triggers = [...e.querySelectorAll(Lo, e.getDocument(a))].filter(
      (r) => F(r) === a
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = e.hasClass(a, B), this.relatedTarget = null, Hs(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return on;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Vr;
  }
  // MODAL PUBLIC METHODS
  // ====================
  /** Toggles the visibility of the modal. */
  toggle() {
    e.hasClass(this.element, C) ? this.hide() : this.show();
  }
  /** Shows the modal to the user. */
  show() {
    const { element: n, options: o, hasFade: a, relatedTarget: r } = this, { backdrop: l } = o;
    let d = 0;
    if (e.hasClass(n, C) || (St.relatedTarget = r || void 0, e.dispatchEvent(n, St), St.defaultPrevented))
      return;
    const u = Oe(n);
    if (u && u !== n) {
      const h = mt(u) || /* istanbul ignore next */
      e.getInstance(u, an);
      h && h.hide();
    }
    l ? (He(L) ? cn(!0) : Ao(n, a, !0), d = e.getElementTransitionDuration(L), $o(), setTimeout(() => Is(this), d)) : (Is(this), u && e.hasClass(L, C) && Nt());
  }
  /**
   * Hide the modal from the user.
   *
   * @param callback when defined it will skip animation
   */
  hide(n) {
    const { element: o, hasFade: a, relatedTarget: r } = this;
    e.hasClass(o, C) && (Qt.relatedTarget = r || void 0, e.dispatchEvent(o, Qt), !Qt.defaultPrevented && (e.removeClass(o, C), e.setAttribute(o, e.ariaHidden, "true"), e.removeAttribute(o, e.ariaModal), a ? e.emulateTransitionEnd(o, () => Ns(this, n)) : Ns(this, n)));
  }
  /** Removes the `Modal` component from target element. */
  dispose() {
    Hs(this), this.hide(() => super.dispose());
  }
}
v(rt, "selector", Fr), v(rt, "init", Ur), v(rt, "getInstance", mt);
const Gr = `.${Y}`, ln = `[${V}="${Y}"]`, _r = `[${Lt}="${Y}"]`, Mt = `${Y}-toggling`, Jr = {
  backdrop: !0,
  // boolean
  keyboard: !0,
  // boolean
  scroll: !1
  // boolean
}, ht = (t) => e.getInstance(t, an), Zr = (t) => new ct(t), At = e.createCustomEvent(`show.bs.${Y}`), Mo = e.createCustomEvent(`shown.bs.${Y}`), Xt = e.createCustomEvent(`hide.bs.${Y}`), Po = e.createCustomEvent(`hidden.bs.${Y}`), xr = (t) => {
  const { element: s } = t, { clientHeight: n, scrollHeight: o } = e.getDocumentElement(s);
  Co(s, n !== o);
}, Ms = (t, s) => {
  const n = s ? y.addListener : y.removeListener;
  t.triggers.forEach((o) => n(o, e.mouseclickEvent, ec));
}, Oo = (t, s) => {
  const n = s ? y.addListener : y.removeListener, o = e.getDocument(t.element);
  n(o, e.keydownEvent, nc), n(o, e.mouseclickEvent, tc);
}, Ps = (t) => {
  const { element: s, options: n } = t;
  n.scroll || (xr(t), e.setElementStyle(e.getDocumentBody(s), { overflow: "hidden" })), e.addClass(s, Mt), e.addClass(s, C), e.setElementStyle(s, { visibility: "visible" }), e.emulateTransitionEnd(s, () => sc(t));
}, Os = (t, s) => {
  const { element: n, options: o } = t, a = Oe(n);
  n.blur(), !a && o.backdrop && e.hasClass(L, C) ? (Nt(), e.emulateTransitionEnd(L, () => Bs(t, s))) : Bs(t, s);
}, ec = (t) => {
  const s = e.closest(t.target, ln), n = s && F(s), o = n && ht(n);
  o && (o.relatedTarget = s, o.toggle(), s && s.tagName === "A" && t.preventDefault());
}, tc = (t) => {
  const { target: s } = t, n = e.querySelector(rn, e.getDocument(s)), o = e.querySelector(_r, n), a = n && ht(n);
  if (!a)
    return;
  const { options: r, triggers: l } = a, { backdrop: d } = r, u = e.closest(s, ln), h = e.getDocument(n).getSelection();
  L.contains(s) && d === "static" || (!(h && h.toString().length) && (!n.contains(s) && d && /* istanbul ignore next */
  (!u || l.includes(s)) || o && o.contains(s)) && (a.relatedTarget = o && o.contains(s) ? o : null, a.hide()), u && u.tagName === "A" && t.preventDefault());
}, nc = ({ code: t, target: s }) => {
  const n = e.querySelector(rn, e.getDocument(s)), o = n && ht(n);
  o && o.options.keyboard && t === e.keyEscape && (o.relatedTarget = null, o.hide());
}, sc = (t) => {
  const { element: s } = t;
  e.removeClass(s, Mt), e.removeAttribute(s, e.ariaHidden), e.setAttribute(s, e.ariaModal, "true"), e.setAttribute(s, "role", "dialog"), e.dispatchEvent(s, Mo), Oo(t, !0), e.focus(s);
}, Bs = (t, s) => {
  const { element: n, triggers: o } = t;
  e.setAttribute(n, e.ariaHidden, "true"), e.removeAttribute(n, e.ariaModal), e.removeAttribute(n, "role"), e.setElementStyle(n, { visibility: "" });
  const a = At.relatedTarget || o.find(Ho);
  a && e.focus(a), Do(n), e.dispatchEvent(n, Po), e.removeClass(n, Mt), Oe(n) || Oo(t), e.isFunction(s) && s();
};
class ct extends se {
  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(s, n) {
    super(s, n);
    const { element: o } = this;
    this.triggers = [...e.querySelectorAll(ln, e.getDocument(o))].filter(
      (a) => F(a) === o
    ), this.relatedTarget = null, Ms(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return an;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Jr;
  }
  // OFFCANVAS PUBLIC METHODS
  // ========================
  /** Shows or hides the offcanvas from the user. */
  toggle() {
    e.hasClass(this.element, C) ? this.hide() : this.show();
  }
  /** Shows the offcanvas to the user. */
  show() {
    const { element: s, options: n, relatedTarget: o } = this;
    let a = 0;
    if (e.hasClass(s, C) || (At.relatedTarget = o || void 0, Mo.relatedTarget = o || void 0, e.dispatchEvent(s, At), At.defaultPrevented))
      return;
    const r = Oe(s);
    if (r && r !== s) {
      const l = ht(r) || /* istanbul ignore next */
      e.getInstance(r, on);
      l && l.hide();
    }
    n.backdrop ? (He(L) ? cn() : Ao(s, !0), a = e.getElementTransitionDuration(L), $o(), setTimeout(() => Ps(this), a)) : (Ps(this), r && e.hasClass(L, C) && Nt());
  }
  /**
   * Hides the offcanvas from the user.
   *
   * @param callback when `true` it will skip animation
   */
  hide(s) {
    const { element: n, relatedTarget: o } = this;
    e.hasClass(n, C) && (Xt.relatedTarget = o || void 0, Po.relatedTarget = o || void 0, e.dispatchEvent(n, Xt), !Xt.defaultPrevented && (e.addClass(n, Mt), e.removeClass(n, C), s ? Os(this, s) : e.emulateTransitionEnd(n, () => Os(this, s))));
  }
  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    Ms(this), this.hide(() => super.dispose());
  }
}
v(ct, "selector", Gr), v(ct, "init", Zr), v(ct, "getInstance", ht);
const Ie = "popover", Pt = "Popover", me = "tooltip", Bo = (t) => {
  const s = t === me, n = s ? `${t}-inner` : `${t}-body`, o = s ? "" : `<h3 class="${t}-header"></h3>`, a = `<div class="${t}-arrow"></div>`, r = `<div class="${n}"></div>`;
  return `<div class="${t}" role="${me}">${o + a + r}</div>`;
}, Ro = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, tn = (t) => {
  const s = /\b(top|bottom|start|end)+/, { element: n, tooltip: o, container: a, options: r, arrow: l } = t;
  if (!o)
    return;
  const d = { ...Ro }, u = e.isRTL(n);
  e.setElementStyle(o, {
    // top: '0px', left: '0px', right: '', bottom: '',
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  const h = t.name === Pt, { offsetWidth: p, offsetHeight: f } = o, { clientWidth: b, clientHeight: A, offsetWidth: R } = e.getDocumentElement(n);
  let { placement: T } = r;
  const { clientWidth: M, offsetWidth: z } = a, K = e.getElementStyle(a, "position") === "fixed", $ = Math.abs(K ? M - z : b - R), Q = u && K ? (
    /* istanbul ignore next */
    $
  ) : 0, j = b - (u ? 0 : $) - 1, {
    width: k,
    height: P,
    left: S,
    right: ce,
    top: _
  } = e.getBoundingClientRect(n, !0), { x: D, y: J } = {
    x: S,
    y: _
  };
  e.setElementStyle(l, {
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  let oe = 0, he = "", Z = 0, Be = "", le = "", Ae = "", Re = "";
  const ie = l.offsetWidth || 0, x = l.offsetHeight || 0, ze = ie / 2;
  let ge = _ - f - x < 0, fe = _ + f + P + x >= A, ve = S - p - ie < Q, pe = S + p + k + ie >= j;
  const $e = ["left", "right"], We = ["top", "bottom"];
  ge = $e.includes(T) ? _ + P / 2 - f / 2 - x < 0 : ge, fe = $e.includes(T) ? _ + f / 2 + P / 2 + x >= A : fe, ve = We.includes(T) ? S + k / 2 - p / 2 < Q : ve, pe = We.includes(T) ? S + p / 2 + k / 2 >= j : pe, T = $e.includes(T) && ve && pe ? "top" : T, T = T === "top" && ge ? "bottom" : T, T = T === "bottom" && fe ? "top" : T, T = T === "left" && ve ? "right" : T, T = T === "right" && pe ? "left" : T, o.className.includes(T) || (o.className = o.className.replace(s, d[T])), $e.includes(T) ? (T === "left" ? Z = D - p - (h ? ie : 0) : Z = D + k + (h ? ie : 0), ge && fe ? (oe = 0, he = 0, le = _ + P / 2 - x / 2) : ge ? (oe = J, he = "", le = P / 2 - ie) : fe ? (oe = J - f + P, he = "", le = f - P / 2 - ie) : (oe = J - f / 2 + P / 2, le = f / 2 - x / 2)) : We.includes(T) && (T === "top" ? oe = J - f - (h ? x : 0) : oe = J + P + (h ? x : 0), ve ? (Z = 0, Ae = D + k / 2 - ze) : pe ? (Z = "auto", Be = 0, Re = k / 2 + j - ce - ze) : (Z = D - p / 2 + k / 2, Ae = p / 2 - ze)), e.setElementStyle(o, {
    top: `${oe}px`,
    bottom: he === "" ? "" : `${he}px`,
    left: Z === "auto" ? Z : `${Z}px`,
    right: Be !== "" ? `${Be}px` : ""
  }), e.isHTMLElement(l) && (le !== "" && (l.style.top = `${le}px`), Ae !== "" ? l.style.left = `${Ae}px` : Re !== "" && (l.style.right = `${Re}px`));
  const pt = e.createCustomEvent(`updated.bs.${e.toLowerCase(t.name)}`);
  e.dispatchEvent(n, pt);
}, nn = {
  template: Bo(me),
  title: "",
  customClass: "",
  trigger: "hover focus",
  placement: "top",
  sanitizeFn: void 0,
  animation: !0,
  delay: 200,
  container: document.body,
  content: "",
  dismissible: !1,
  btnClose: ""
}, zo = "data-original-title", Ne = "Tooltip", ye = (t, s, n) => {
  if (!(!e.isHTMLElement(t) || e.isString(s) && !s.length))
    if (e.isString(s)) {
      let o = s.trim();
      e.isFunction(n) && (o = n(o));
      const r = new DOMParser().parseFromString(o, "text/html");
      t.append(...r.body.childNodes);
    } else
      e.isHTMLElement(s) ? t.append(s) : (e.isNodeList(s) || e.isArray(s) && s.every(e.isNode)) && t.append(...s);
}, oc = (t) => {
  const s = t.name === Ne, { id: n, element: o, options: a } = t, { title: r, placement: l, template: d, animation: u, customClass: h, sanitizeFn: p, dismissible: f, content: b, btnClose: A } = a, R = s ? me : Ie, T = { ...Ro };
  let M = [], z = [];
  e.isRTL(o) && (T.left = "end", T.right = "start");
  const re = `bs-${R}-${T[l]}`;
  let K;
  if (e.isHTMLElement(d))
    K = d;
  else {
    const S = e.createElement("div");
    ye(S, d, p), K = S.firstChild;
  }
  t.tooltip = e.isHTMLElement(K) ? K.cloneNode(!0) : (
    /* istanbul ignore next */
    void 0
  );
  const { tooltip: $ } = t;
  if (!$)
    return;
  e.setAttribute($, "id", n), e.setAttribute($, "role", me);
  const Q = s ? `${me}-inner` : `${Ie}-body`, j = s ? null : e.querySelector(`.${Ie}-header`, $), k = e.querySelector(`.${Q}`, $);
  t.arrow = e.querySelector(`.${R}-arrow`, $);
  const { arrow: P } = t;
  if (e.isHTMLElement(r))
    M = [r.cloneNode(!0)];
  else {
    const S = e.createElement("div");
    ye(S, r, p), M = [...S.childNodes];
  }
  if (e.isHTMLElement(b))
    z = [b.cloneNode(!0)];
  else {
    const S = e.createElement("div");
    ye(S, b, p), z = [...S.childNodes];
  }
  if (f)
    if (r)
      if (e.isHTMLElement(A))
        M = [...M, A.cloneNode(!0)];
      else {
        const S = e.createElement("div");
        ye(S, A, p), M = [...M, S.firstChild];
      }
    else if (j && j.remove(), e.isHTMLElement(A))
      z = [...z, A.cloneNode(!0)];
    else {
      const S = e.createElement("div");
      ye(S, A, p), z = [...z, S.firstChild];
    }
  s ? r && k && ye(k, r, p) : (r && j && ye(j, M, p), b && k && ye(k, z, p), t.btn = e.querySelector(".btn-close", $) || void 0), e.addClass($, "position-fixed"), e.addClass(P, "position-absolute"), e.hasClass($, R) || e.addClass($, R), u && !e.hasClass($, B) && e.addClass($, B), h && !e.hasClass($, h) && e.addClass($, h), e.hasClass($, re) || e.addClass($, re);
}, ic = (t) => {
  const s = ["HTML", "BODY"], n = [];
  let { parentNode: o } = t;
  for (; o && !s.includes(o.nodeName); )
    o = e.getParentNode(o), e.isShadowRoot(o) || e.isTableElement(o) || n.push(o);
  return n.find((a, r) => e.getElementStyle(a, "position") !== "relative" && n.slice(r + 1).every((l) => e.getElementStyle(l, "position") === "static") ? a : null) || /* istanbul ignore next: optional guard */
  e.getDocument(t).body;
}, ac = `[${V}="${me}"],[data-tip="${me}"]`, Wo = "title";
let Rs = (t) => e.getInstance(t, Ne);
const rc = (t) => new Le(t), cc = (t) => {
  const { element: s, tooltip: n, container: o, offsetParent: a } = t;
  e.removeAttribute(s, e.ariaDescribedBy), To(n, o === a ? o : a);
}, lc = (t, s) => {
  const { element: n } = t;
  tt(t), e.hasAttribute(n, zo) && t.name === Ne && Fo(t), s && s();
}, qo = (t, s) => {
  const n = s ? y.addListener : y.removeListener, { element: o } = t;
  n(e.getDocument(o), e.touchstartEvent, t.handleTouch, e.passiveHandler), [e.scrollEvent, e.resizeEvent].forEach((a) => {
    n(e.getWindow(o), a, t.update, e.passiveHandler);
  });
}, zs = (t) => {
  const { element: s } = t, n = e.createCustomEvent(`shown.bs.${e.toLowerCase(t.name)}`);
  qo(t, !0), e.dispatchEvent(s, n), e.Timer.clear(s, "in");
}, Ws = (t) => {
  const { element: s, onHideComplete: n } = t, o = e.createCustomEvent(`hidden.bs.${e.toLowerCase(t.name)}`);
  qo(t), cc(t), e.dispatchEvent(s, o), e.isFunction(n) && (n(), t.onHideComplete = void 0), e.Timer.clear(s, "out");
}, tt = (t, s) => {
  const n = s ? y.addListener : y.removeListener, { element: o, options: a, btn: r } = t, { trigger: l } = a, u = !!(t.name !== Ne && a.dismissible);
  if (l.includes("manual"))
    return;
  t.enabled = !!s, l.split(" ").forEach((p) => {
    p === e.mousehoverEvent ? (n(o, e.mousedownEvent, t.show), n(o, e.mouseenterEvent, t.show), u && r ? n(r, e.mouseclickEvent, t.hide) : (n(o, e.mouseleaveEvent, t.hide), n(e.getDocument(o), e.touchstartEvent, t.handleTouch, e.passiveHandler))) : p === e.mouseclickEvent ? n(o, p, u ? t.show : t.toggle) : p === e.focusEvent && (n(o, e.focusinEvent, t.show), u || n(o, e.focusoutEvent, t.hide), e.isApple && n(o, e.mouseclickEvent, () => e.focus(o)));
  });
}, qs = (t, s) => {
  const n = s ? y.addListener : y.removeListener, { element: o, container: a, offsetParent: r } = t, { offsetHeight: l, scrollHeight: d } = a, u = e.closest(o, `.${U}`), h = e.closest(o, `.${Y}`), p = e.getWindow(o), b = a === r && l !== d ? a : p;
  n(b, e.resizeEvent, t.update, e.passiveHandler), n(b, e.scrollEvent, t.update, e.passiveHandler), u && n(u, `hide.bs.${U}`, t.hide), h && n(h, `hide.bs.${Y}`, t.hide);
}, Fo = (t, s) => {
  const n = [zo, Wo], { element: o } = t;
  e.setAttribute(
    o,
    n[s ? 0 : 1],
    s || e.getAttribute(o, n[0]) || /* istanbul ignore next */
    ""
  ), e.removeAttribute(o, n[s ? 1 : 0]);
};
class Le extends se {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(n, o) {
    super(n, o);
    // TOOLTIP PUBLIC METHODS
    // ======================
    /** Shows the tooltip. */
    v(this, "show", () => this._show());
    /** Hides the tooltip. */
    v(this, "hide", () => {
      const { options: n, tooltip: o, element: a, container: r, offsetParent: l } = this, { animation: d, delay: u } = n;
      e.Timer.clear(a, "in"), o && He(o, r === l ? r : l) && e.Timer.set(
        a,
        () => {
          const h = e.createCustomEvent(`hide.bs.${e.toLowerCase(this.name)}`);
          e.dispatchEvent(a, h), !h.defaultPrevented && (this.update(), e.removeClass(o, C), qs(this), d ? e.emulateTransitionEnd(o, () => Ws(this)) : Ws(this));
        },
        u + 17,
        "out"
      );
    });
    /** Updates the tooltip position. */
    v(this, "update", () => {
      tn(this);
    });
    /** Toggles the tooltip visibility. */
    v(this, "toggle", () => {
      const { tooltip: n, container: o, offsetParent: a } = this;
      n && !He(n, o === a ? o : a) ? this.show() : this.hide();
    });
    /**
     * Handles the `touchstart` event listener for `Tooltip`
     *
     * @this {Tooltip}
     * @param {TouchEvent} e the `Event` object
     */
    v(this, "handleTouch", ({ target: n }) => {
      const { tooltip: o, element: a } = this;
      o && o.contains(n) || n === a || n && a.contains(n) || this.hide();
    });
    const { element: a } = this, r = this.name === Ne, l = r ? me : Ie, d = r ? Ne : Pt;
    Rs = (h) => e.getInstance(h, d), this.enabled = !0, this.id = `${l}-${e.getUID(a, l)}`;
    const { options: u } = this;
    !u.title && r || !r && !u.content || (e.ObjectAssign(nn, { titleAttr: "" }), e.hasAttribute(a, Wo) && r && typeof u.title == "string" && Fo(this, u.title), this.container = ic(a), this.offsetParent = ["sticky", "fixed"].some(
      (h) => e.getElementStyle(this.container, "position") === h
    ) ? this.container : e.getDocument(this.element).body, oc(this), tt(this, !0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ne;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return nn;
  }
  _show() {
    const { options: n, tooltip: o, element: a, container: r, offsetParent: l, id: d } = this, { animation: u } = n, h = e.Timer.get(a, "out"), p = r === l ? r : l;
    e.Timer.clear(a, "out"), o && !h && !He(o, p) && e.Timer.set(
      a,
      () => {
        const f = e.createCustomEvent(`show.bs.${e.toLowerCase(this.name)}`);
        e.dispatchEvent(a, f), !f.defaultPrevented && (yo(o, p), e.setAttribute(a, e.ariaDescribedBy, `#${d}`), this.update(), qs(this, !0), e.hasClass(o, C) || e.addClass(o, C), u ? e.emulateTransitionEnd(o, () => zs(this)) : zs(this));
      },
      17,
      "in"
    );
  }
  /** Enables the tooltip. */
  enable() {
    const { enabled: n } = this;
    n || (tt(this, !0), this.enabled = !n);
  }
  /** Disables the tooltip. */
  disable() {
    const { tooltip: n, container: o, offsetParent: a, options: r, enabled: l } = this, { animation: d } = r;
    l && (n && He(n, o === a ? o : a) && d ? (this.onHideComplete = () => tt(this), this.hide()) : tt(this), this.enabled = !l);
  }
  /** Toggles the `disabled` property. */
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const { tooltip: n, container: o, offsetParent: a, options: r } = this, l = () => lc(this, () => super.dispose());
    r.animation && n && He(n, o === a ? o : a) ? (this.options.delay = 0, this.onHideComplete = l, this.hide()) : l();
  }
}
v(Le, "selector", ac), v(Le, "init", rc), v(Le, "getInstance", Rs), v(Le, "styleTip", tn);
const dc = `[${V}="${Ie}"],[data-tip="${Ie}"]`, uc = e.ObjectAssign({}, nn, {
  template: Bo(Ie),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), mc = (t) => e.getInstance(t, Pt), hc = (t) => new Ve(t);
class Ve extends Le {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(n, o) {
    super(n, o);
    /* extend original `show()` */
    v(this, "show", () => {
      super._show();
      const { options: n, btn: o } = this;
      n.dismissible && o && setTimeout(() => e.focus(o), 17);
    });
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Pt;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return uc;
  }
}
v(Ve, "selector", dc), v(Ve, "init", hc), v(Ve, "getInstance", mc), v(Ve, "styleTip", tn);
const gc = "scrollspy", jo = "ScrollSpy", fc = '[data-bs-spy="scroll"]', vc = {
  offset: 10,
  target: null
}, pc = (t) => e.getInstance(t, jo), Ec = (t) => new lt(t), Fs = e.createCustomEvent(`activate.bs.${gc}`), bc = (t) => {
  const { target: s, scrollTarget: n, options: o, itemsLength: a, scrollHeight: r, element: l } = t, { offset: d } = o, u = e.isWindow(n), h = s && e.getElementsByTagName("A", s), p = n ? Vo(n) : (
    /* istanbul ignore next */
    r
  );
  if (t.scrollTop = u ? n.scrollY : n.scrollTop, h && (p !== r || a !== h.length)) {
    let f, b, A;
    t.items = [], t.offsets = [], t.scrollHeight = p, t.maxScroll = t.scrollHeight - Cc(t), [...h].forEach((R) => {
      f = e.getAttribute(R, "href"), b = f && f.charAt(0) === "#" && f.slice(-1) !== "#" && e.querySelector(f, e.getDocument(l)), b && (t.items.push(R), A = e.getBoundingClientRect(b), t.offsets.push((u ? A.top + t.scrollTop : b.offsetTop) - d));
    }), t.itemsLength = t.items.length;
  }
}, Vo = (t) => e.isHTMLElement(t) ? t.scrollHeight : e.getDocumentElement(t).scrollHeight, Cc = ({ element: t, scrollTarget: s }) => e.isWindow(s) ? s.innerHeight : e.getBoundingClientRect(t).height, Uo = (t) => {
  [...e.getElementsByTagName("A", t)].forEach((s) => {
    e.hasClass(s, w) && e.removeClass(s, w);
  });
}, js = (t, s) => {
  const { target: n, element: o } = t;
  e.isHTMLElement(n) && Uo(n), t.activeItem = s, e.addClass(s, w);
  const a = [];
  let r = s;
  for (; r !== e.getDocumentBody(o); )
    r = r.parentElement, (e.hasClass(r, "nav") || e.hasClass(r, "dropdown-menu")) && a.push(r);
  a.forEach((l) => {
    const d = l.previousElementSibling;
    d && !e.hasClass(d, w) && e.addClass(d, w);
  }), Fs.relatedTarget = s, e.dispatchEvent(o, Fs);
}, Vs = (t, s) => {
  (s ? y.addListener : y.removeListener)(t.scrollTarget, e.scrollEvent, t.refresh, e.passiveHandler);
};
class lt extends se {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(n, o) {
    super(n, o);
    /* eslint-enable */
    // SCROLLSPY PUBLIC METHODS
    // ========================
    /** Updates all items. */
    v(this, "refresh", () => {
      const { target: n } = this;
      if ((n == null ? void 0 : n.offsetHeight) === 0)
        return;
      bc(this);
      const { scrollTop: o, maxScroll: a, itemsLength: r, items: l, activeItem: d } = this;
      if (o >= a) {
        const h = l[r - 1];
        d !== h && js(this, h);
        return;
      }
      const { offsets: u } = this;
      if (d && o < u[0] && u[0] > 0) {
        this.activeItem = null, n && Uo(n);
        return;
      }
      l.forEach((h, p) => {
        d !== h && o >= u[p] && (typeof u[p + 1] > "u" || o < u[p + 1]) && js(this, h);
      });
    });
    const { element: a, options: r } = this;
    this.target = e.querySelector(r.target, e.getDocument(a)), this.target && (this.scrollTarget = a.clientHeight < a.scrollHeight ? a : e.getWindow(a), this.scrollHeight = Vo(this.scrollTarget), Vs(this, !0), this.refresh());
  }
  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() {
    return jo;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return vc;
  }
  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    Vs(this), super.dispose();
  }
}
v(lt, "selector", fc), v(lt, "init", Ec), v(lt, "getInstance", pc);
const vt = "tab", Ko = "Tab", Us = `[${V}="${vt}"]`, Qo = (t) => e.getInstance(t, Ko), yc = (t) => new dt(t), Yt = e.createCustomEvent(`show.bs.${vt}`), Ks = e.createCustomEvent(`shown.bs.${vt}`), Gt = e.createCustomEvent(`hide.bs.${vt}`), Qs = e.createCustomEvent(`hidden.bs.${vt}`), gt = /* @__PURE__ */ new Map(), Xs = (t) => {
  const { tabContent: s, nav: n } = t;
  s && e.hasClass(s, Me) && (s.style.height = "", e.removeClass(s, Me)), n && e.Timer.clear(n);
}, Ys = (t) => {
  const { element: s, tabContent: n, content: o, nav: a } = t, { tab: r } = e.isHTMLElement(a) && gt.get(a) || /* istanbul ignore next */
  { tab: null };
  if (n && o && e.hasClass(o, B)) {
    const { currentHeight: l, nextHeight: d } = gt.get(s) || /* istanbul ignore next */
    {
      currentHeight: 0,
      nextHeight: 0
    };
    l === d ? Xs(t) : setTimeout(() => {
      n.style.height = `${d}px`, e.reflow(n), e.emulateTransitionEnd(n, () => Xs(t));
    }, 50);
  } else
    a && e.Timer.clear(a);
  Ks.relatedTarget = r, e.dispatchEvent(s, Ks);
}, Gs = (t) => {
  const { element: s, content: n, tabContent: o, nav: a } = t, { tab: r, content: l } = a && gt.get(a) || /* istanbul ignore next */
  { tab: null, content: null };
  let d = 0;
  if (o && n && e.hasClass(n, B) && ([l, n].forEach((u) => {
    e.isHTMLElement(u) && e.addClass(u, "overflow-hidden");
  }), d = e.isHTMLElement(l) ? l.scrollHeight : (
    /* istanbul ignore next */
    0
  )), Yt.relatedTarget = r, Qs.relatedTarget = s, e.dispatchEvent(s, Yt), !Yt.defaultPrevented) {
    if (n && e.addClass(n, w), l && e.removeClass(l, w), o && n && e.hasClass(n, B)) {
      const u = n.scrollHeight;
      gt.set(s, { currentHeight: d, nextHeight: u, tab: null, content: null }), e.addClass(o, Me), o.style.height = `${d}px`, e.reflow(o), [l, n].forEach((h) => {
        h && e.removeClass(h, "overflow-hidden");
      });
    }
    n && n && e.hasClass(n, B) ? setTimeout(() => {
      e.addClass(n, C), e.emulateTransitionEnd(n, () => {
        Ys(t);
      });
    }, 1) : (n && e.addClass(n, C), Ys(t)), r && e.dispatchEvent(r, Qs);
  }
}, _s = (t) => {
  const { nav: s } = t;
  if (!e.isHTMLElement(s))
    return { tab: null, content: null };
  const n = e.getElementsByClassName(w, s);
  let o = null;
  n.length === 1 && !Pe.some((r) => e.hasClass(n[0].parentElement, r)) ? [o] = n : n.length > 1 && (o = n[n.length - 1]);
  const a = e.isHTMLElement(o) ? F(o) : null;
  return { tab: o, content: a };
}, Js = (t) => {
  if (!e.isHTMLElement(t))
    return null;
  const s = e.closest(t, `.${Pe.join(",.")}`);
  return s ? e.querySelector(`.${Pe[0]}-toggle`, s) : null;
}, Zs = (t, s) => {
  (s ? y.addListener : y.removeListener)(t.element, e.mouseclickEvent, Tc);
}, Tc = (t) => {
  const s = Qo(t.target);
  s && (t.preventDefault(), s.show());
};
class dt extends se {
  /** @param target the target element */
  constructor(s) {
    super(s);
    const { element: n } = this, o = F(n);
    if (!o)
      return;
    const a = e.closest(n, ".nav"), r = e.closest(o, ".tab-content");
    this.nav = a, this.content = o, this.tabContent = r, this.dropdown = Js(n);
    const { tab: l } = _s(this);
    if (a && !l) {
      const d = e.querySelector(Us, a), u = d && F(d);
      u && (e.addClass(d, w), e.addClass(u, C), e.addClass(u, w), e.setAttribute(n, e.ariaSelected, "true"));
    }
    Zs(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ko;
  }
  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() {
    const { element: s, content: n, nav: o, dropdown: a } = this;
    if (!(o && e.Timer.get(o)) && !e.hasClass(s, w)) {
      const { tab: r, content: l } = _s(this);
      if (o && gt.set(o, { tab: r, content: l, currentHeight: 0, nextHeight: 0 }), Gt.relatedTarget = s, e.isHTMLElement(r) && e.dispatchEvent(r, Gt), Gt.defaultPrevented)
        return;
      e.addClass(s, w), e.setAttribute(s, e.ariaSelected, "true");
      const d = e.isHTMLElement(r) && Js(r);
      if (d && e.hasClass(d, w) && e.removeClass(d, w), o) {
        const u = () => {
          r && (e.removeClass(r, w), e.setAttribute(r, e.ariaSelected, "false")), a && !e.hasClass(a, w) && e.addClass(a, w);
        };
        l && (e.hasClass(l, B) || n && e.hasClass(n, B)) ? e.Timer.set(o, u, 1) : u();
      }
      l && (e.removeClass(l, C), e.hasClass(l, B) ? e.emulateTransitionEnd(l, () => Gs(this)) : Gs(this));
    }
  }
  /** Removes the `Tab` component from the target element. */
  dispose() {
    Zs(this), super.dispose();
  }
}
v(dt, "selector", Us), v(dt, "init", yc), v(dt, "getInstance", Qo);
const G = "toast", Xo = "Toast", wc = `.${G}`, Sc = `[${Lt}="${G}"]`, Yo = `[${V}="${G}"]`, Ke = "showing", Go = "hide", Ac = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, dn = (t) => e.getInstance(t, Xo), $c = (t) => new ut(t), xs = e.createCustomEvent(`show.bs.${G}`), Dc = e.createCustomEvent(`shown.bs.${G}`), eo = e.createCustomEvent(`hide.bs.${G}`), Hc = e.createCustomEvent(`hidden.bs.${G}`), to = (t) => {
  const { element: s, options: n } = t;
  e.removeClass(s, Ke), e.Timer.clear(s, Ke), e.dispatchEvent(s, Dc), n.autohide && e.Timer.set(s, () => t.hide(), n.delay, G);
}, no = (t) => {
  const { element: s } = t;
  e.removeClass(s, Ke), e.removeClass(s, C), e.addClass(s, Go), e.Timer.clear(s, G), e.dispatchEvent(s, Hc);
}, Lc = (t) => {
  const { element: s, options: n } = t;
  e.addClass(s, Ke), n.animation ? (e.reflow(s), e.emulateTransitionEnd(s, () => no(t))) : no(t);
}, kc = (t) => {
  const { element: s, options: n } = t;
  e.Timer.set(
    s,
    () => {
      e.removeClass(s, Go), e.reflow(s), e.addClass(s, C), e.addClass(s, Ke), n.animation ? e.emulateTransitionEnd(s, () => to(t)) : to(t);
    },
    17,
    Ke
  );
}, _o = (t, s) => {
  const n = s ? y.addListener : y.removeListener, { element: o, triggers: a, dismiss: r, options: l, hide: d } = t;
  r && n(r, e.mouseclickEvent, d), l.autohide && [e.focusinEvent, e.focusoutEvent, e.mouseenterEvent, e.mouseleaveEvent].forEach(
    (u) => n(o, u, Mc)
  ), a.length && a.forEach((u) => n(u, e.mouseclickEvent, Nc));
}, Ic = (t) => {
  e.Timer.clear(t.element, G), _o(t);
}, Nc = (t) => {
  const { target: s } = t, n = s && e.closest(s, Yo), o = n && F(n), a = o && dn(o);
  a && (n && n.tagName === "A" && t.preventDefault(), a.relatedTarget = n, a.show());
}, Mc = (t) => {
  const s = t.target, n = dn(s), { type: o, relatedTarget: a } = t;
  !n || s === a || s.contains(a) || ([e.mouseenterEvent, e.focusinEvent].includes(o) ? e.Timer.clear(s, G) : e.Timer.set(s, () => n.hide(), n.options.delay, G));
};
class ut extends se {
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(n, o) {
    super(n, o);
    // TOAST PUBLIC METHODS
    // ====================
    /** Shows the toast. */
    v(this, "show", () => {
      const { element: n, isShown: o } = this;
      if (n && !o) {
        if (e.dispatchEvent(n, xs), xs.defaultPrevented)
          return;
        kc(this);
      }
    });
    /** Hides the toast. */
    v(this, "hide", () => {
      const { element: n, isShown: o } = this;
      if (n && o) {
        if (e.dispatchEvent(n, eo), eo.defaultPrevented)
          return;
        Lc(this);
      }
    });
    const { element: a, options: r } = this;
    r.animation && !e.hasClass(a, B) ? e.addClass(a, B) : !r.animation && e.hasClass(a, B) && e.removeClass(a, B), this.dismiss = e.querySelector(Sc, a), this.triggers = [...e.querySelectorAll(Yo, e.getDocument(a))].filter(
      (l) => F(l) === a
    ), _o(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Xo;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Ac;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return e.hasClass(this.element, C);
  }
  /** Removes the `Toast` component from the target element. */
  dispose() {
    const { element: n, isShown: o } = this;
    o && e.removeClass(n, C), Ic(this), super.dispose();
  }
}
v(ut, "selector", wc), v(ut, "init", $c), v(ut, "getInstance", dn);
const un = /* @__PURE__ */ new Map();
[nt, st, ot, it, at, rt, ct, Ve, lt, dt, ut, Le].forEach(
  (t) => un.set(t.prototype.name, t)
);
const Pc = (t, s) => {
  [...s].forEach((n) => t(n));
}, Oc = (t, s) => {
  const n = e.Data.getAllFor(t);
  n && [...n].forEach(([o, a]) => {
    s.contains(o) && a.dispose();
  });
}, so = (t) => {
  const s = t && t.nodeName ? t : document, n = [...e.getElementsByTagName("*", s)];
  un.forEach((o) => {
    const { init: a, selector: r } = o;
    Pc(
      a,
      n.filter((l) => e.matches(l, r))
    );
  });
}, Rc = (t) => {
  const s = t && t.nodeName ? t : document;
  un.forEach((n) => {
    Oc(n.prototype.name, s);
  });
};
document.body ? so() : y.addListener(document, "DOMContentLoaded", () => so(), { once: !0 });
export {
  nt as Alert,
  st as Button,
  ot as Carousel,
  it as Collapse,
  at as Dropdown,
  y as Listener,
  rt as Modal,
  ct as Offcanvas,
  Ve as Popover,
  lt as ScrollSpy,
  dt as Tab,
  ut as Toast,
  Le as Tooltip,
  so as initCallback,
  Rc as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
