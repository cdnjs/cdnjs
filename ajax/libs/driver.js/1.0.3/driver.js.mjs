let N = {};
function q(e = {}) {
  N = {
    animate: !0,
    allowClose: !0,
    overlayOpacity: 0.7,
    smoothScroll: !1,
    showProgress: !1,
    stagePadding: 10,
    stageRadius: 5,
    popoverOffset: 10,
    showButtons: ["next", "previous", "close"],
    disableButtons: [],
    overlayColor: "#000",
    ...e
  };
}
function a(e) {
  return e ? N[e] : N;
}
function W(e, t, o, n) {
  return (e /= n / 2) < 1 ? o / 2 * e * e + t : -o / 2 * (--e * (e - 2) - 1) + t;
}
function j(e) {
  if (!e || ie(e))
    return;
  const t = a("smoothScroll");
  e.scrollIntoView({
    // Removing the smooth scrolling for elements which exist inside the scrollable parent
    // This was causing the highlight to not properly render
    behavior: !t || ne(e) ? "auto" : "smooth",
    inline: "center",
    block: "center"
  });
}
function ne(e) {
  if (!e || !e.parentElement)
    return;
  const t = e.parentElement;
  return t.scrollHeight > t.clientHeight;
}
function ie(e) {
  const t = e.getBoundingClientRect();
  return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth);
}
let I = {};
function b(e, t) {
  I[e] = t;
}
function d(e) {
  return e ? I[e] : I;
}
function re() {
  I = {};
}
let R = {};
function _(e, t) {
  R[e] = t;
}
function L(e) {
  var t;
  (t = R[e]) == null || t.call(R);
}
function se() {
  R = {};
}
function ae(e, t, o, n) {
  let p = d("__activeStagePosition");
  const r = p || o.getBoundingClientRect(), f = n.getBoundingClientRect(), w = W(e, r.x, f.x - r.x, t), i = W(e, r.y, f.y - r.y, t), h = W(e, r.width, f.width - r.width, t), s = W(e, r.height, f.height - r.height, t);
  p = {
    x: w,
    y: i,
    width: h,
    height: s
  }, Z(p), b("__activeStagePosition", p);
}
function Q(e) {
  if (!e)
    return;
  const t = e.getBoundingClientRect(), o = {
    x: t.x,
    y: t.y,
    width: t.width,
    height: t.height
  };
  b("__activeStagePosition", o), Z(o);
}
function le() {
  const e = d("__activeStagePosition"), t = d("__overlaySvg");
  if (!e)
    return;
  if (!t) {
    console.warn("No stage svg found.");
    return;
  }
  const o = window.innerWidth, n = window.innerHeight;
  t.setAttribute("viewBox", `0 0 ${o} ${n}`);
}
function ce(e) {
  const t = de(e);
  document.body.appendChild(t), U(t, (o) => {
    o.target.tagName === "path" && L("overlayClick");
  }), b("__overlaySvg", t);
}
function Z(e) {
  const t = d("__overlaySvg");
  if (!t) {
    ce(e);
    return;
  }
  const o = t.firstElementChild;
  if ((o == null ? void 0 : o.tagName) !== "path")
    throw new Error("no path element found in stage svg");
  o.setAttribute("d", G(e));
}
function de(e) {
  const t = window.innerWidth, o = window.innerHeight, n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  n.classList.add("driver-overlay", "driver-overlay-animated"), n.setAttribute("viewBox", `0 0 ${t} ${o}`), n.setAttribute("xmlSpace", "preserve"), n.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink"), n.setAttribute("version", "1.1"), n.setAttribute("preserveAspectRatio", "xMinYMin slice"), n.style.fillRule = "evenodd", n.style.clipRule = "evenodd", n.style.strokeLinejoin = "round", n.style.strokeMiterlimit = "2", n.style.zIndex = "10000", n.style.position = "fixed", n.style.top = "0", n.style.left = "0", n.style.width = "100%", n.style.height = "100%";
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return p.setAttribute("d", G(e)), p.style.fill = a("overlayColor") || "rgb(0,0,0)", p.style.opacity = `${a("overlayOpacity")}`, p.style.pointerEvents = "auto", p.style.cursor = "auto", n.appendChild(p), n;
}
function G(e) {
  const t = window.innerWidth, o = window.innerHeight, n = a("stagePadding") || 0, p = a("stageRadius") || 0, r = e.width + n * 2, f = e.height + n * 2, w = Math.min(p, r / 2, f / 2), i = Math.floor(Math.max(w, 0)), h = e.x - n + i, s = e.y - n, l = r - i * 2, c = f - i * 2;
  return `M${t},0L0,0L0,${o}L${t},${o}L${t},0Z
    M${h},${s} h${l} a${i},${i} 0 0 1 ${i},${i} v${c} a${i},${i} 0 0 1 -${i},${i} h-${l} a${i},${i} 0 0 1 -${i},-${i} v-${c} a${i},${i} 0 0 1 ${i},-${i} z`;
}
function pe() {
  const e = d("__overlaySvg");
  e && e.remove();
}
function ue() {
  const e = document.getElementById("driver-dummy-element");
  if (e)
    return e;
  let t = document.createElement("div");
  return t.id = "driver-dummy-element", t.style.width = "0", t.style.height = "0", t.style.pointerEvents = "none", t.style.opacity = "0", t.style.position = "fixed", t.style.top = "50%", t.style.left = "50%", document.body.appendChild(t), t;
}
function V(e) {
  const { element: t } = e;
  let o = typeof t == "string" ? document.querySelector(t) : t;
  o || (o = ue()), he(o, e);
}
function ve() {
  const e = d("activeElement"), t = d("activeStep");
  e && (Q(e), le(), te(e, t));
}
function he(e, t) {
  const n = Date.now(), p = d("activeStep"), r = d("activeElement") || e, f = !r || r === e, w = e.id === "driver-dummy-element", i = r.id === "driver-dummy-element", h = a("animate"), s = t.onHighlightStarted || a("onHighlightStarted"), l = (t == null ? void 0 : t.onHighlighted) || a("onHighlighted"), c = (p == null ? void 0 : p.onDeselected) || a("onDeselected"), m = a(), g = d();
  !f && c && c(i ? void 0 : r, p, {
    config: m,
    state: g
  }), s && s(w ? void 0 : e, t, {
    config: m,
    state: g
  });
  const u = !f && h;
  let v = !1;
  me();
  const P = () => {
    if (d("__transitionCallback") !== P)
      return;
    const k = Date.now() - n, y = 400 - k <= 400 / 2;
    t.popover && y && !v && u && (X(e, t), v = !0), a("animate") && k < 400 ? ae(k, 400, r, e) : (Q(e), l && l(w ? void 0 : e, t, {
      config: a(),
      state: d()
    }), b("__transitionCallback", void 0), b("previousStep", p), b("previousElement", r), b("activeStep", t), b("activeElement", e)), window.requestAnimationFrame(P);
  };
  b("__transitionCallback", P), window.requestAnimationFrame(P), j(e), !u && t.popover && X(e, t), r.classList.remove("driver-active-element"), e.classList.add("driver-active-element");
}
function fe() {
  var e;
  (e = document.getElementById("driver-dummy-element")) == null || e.remove(), document.querySelectorAll(".driver-active-element").forEach((t) => {
    t.classList.remove("driver-active-element");
  });
}
function M() {
  const e = d("__resizeTimeout");
  e && window.cancelAnimationFrame(e), b("__resizeTimeout", window.requestAnimationFrame(ve));
}
function J(e) {
  a("allowKeyboardControl");
  e.key === "Escape" ? L("escapePress") : e.key === "ArrowRight" ? L("arrowRightPress") : e.key === "ArrowLeft" && L("arrowLeftPress");
}
function U(e, t, o) {
  const n = (r, f) => {
    const w = r.target;
    e.contains(w) && ((!o || o(w)) && (r.preventDefault(), r.stopPropagation(), r.stopImmediatePropagation()), f == null || f(r));
  };
  document.addEventListener("pointerdown", n, !0), document.addEventListener("mousedown", n, !0), document.addEventListener("pointerup", n, !0), document.addEventListener("mouseup", n, !0), document.addEventListener(
    "click",
    (r) => {
      n(r, t);
    },
    !0
  );
}
function ge() {
  window.addEventListener("keyup", J, !1), window.addEventListener("resize", M), window.addEventListener("scroll", M);
}
function we() {
  window.removeEventListener("keyup", J), window.removeEventListener("resize", M), window.removeEventListener("scroll", M);
}
function me() {
  const e = d("popover");
  e && (e.wrapper.style.display = "none");
}
function X(e, t) {
  var k, C;
  let o = d("popover");
  o && document.body.removeChild(o.wrapper), o = xe(), document.body.appendChild(o.wrapper);
  const {
    title: n,
    description: p,
    showButtons: r,
    disableButtons: f,
    showProgress: w,
    nextBtnText: i = a("nextBtnText") || "Next &rarr;",
    prevBtnText: h = a("prevBtnText") || "&larr; Previous",
    progressText: s = a("progressText") || "{current} of {total}"
  } = t.popover || {};
  o.nextButton.innerHTML = i, o.previousButton.innerHTML = h, o.progress.innerHTML = s, n ? (o.title.innerText = n, o.title.style.display = "block") : o.title.style.display = "none", p ? (o.description.innerHTML = p, o.description.style.display = "block") : o.description.style.display = "none";
  const l = r || a("showButtons"), c = w || a("showProgress") || !1, m = (l == null ? void 0 : l.includes("next")) || (l == null ? void 0 : l.includes("previous")) || c;
  o.closeButton.style.display = l.includes("close") ? "block" : "none", m ? (o.footer.style.display = "flex", o.progress.style.display = c ? "block" : "none", o.nextButton.style.display = l.includes("next") ? "block" : "none", o.previousButton.style.display = l.includes("previous") ? "block" : "none") : o.footer.style.display = "none";
  const g = f || a("disableButtons") || [];
  g != null && g.includes("next") && o.nextButton.classList.add("driver-popover-btn-disabled"), g != null && g.includes("previous") && o.previousButton.classList.add("driver-popover-btn-disabled"), g != null && g.includes("close") && o.closeButton.classList.add("driver-popover-btn-disabled");
  const u = o.wrapper;
  u.style.display = "block", u.style.left = "", u.style.top = "", u.style.bottom = "", u.style.right = "";
  const v = o.arrow;
  v.className = "driver-popover-arrow";
  const P = ((k = t.popover) == null ? void 0 : k.popoverClass) || a("popoverClass") || "";
  u.className = `driver-popover ${P}`.trim(), U(
    o.wrapper,
    (y) => {
      var E, B, A;
      const x = y.target, T = ((E = t.popover) == null ? void 0 : E.onNextClick) || a("onNextClick"), $ = ((B = t.popover) == null ? void 0 : B.onPrevClick) || a("onPrevClick"), H = ((A = t.popover) == null ? void 0 : A.onCloseClick) || a("onCloseClick");
      if (x.classList.contains("driver-popover-next-btn"))
        return T ? T(e, t, {
          config: a(),
          state: d()
        }) : L("nextClick");
      if (x.classList.contains("driver-popover-prev-btn"))
        return $ ? $(e, t, {
          config: a(),
          state: d()
        }) : L("prevClick");
      if (x.classList.contains("driver-popover-close-btn"))
        return H ? H(e, t, {
          config: a(),
          state: d()
        }) : L("closeClick");
    },
    (y) => !(o != null && o.description.contains(y)) && !(o != null && o.title.contains(y)) && y.className.includes("driver-popover")
  ), b("popover", o);
  const S = ((C = t.popover) == null ? void 0 : C.onPopoverRender) || a("onPopoverRender");
  S && S(o, {
    config: a(),
    state: d()
  }), te(e, t), j(u);
}
function ee() {
  const e = d("popover");
  if (!(e != null && e.wrapper))
    return;
  const t = e.wrapper.getBoundingClientRect(), o = a("stagePadding") || 0, n = a("popoverOffset") || 0;
  return {
    width: t.width + o + n,
    height: t.height + o + n,
    realWidth: t.width,
    realHeight: t.height
  };
}
function Y(e, t) {
  const { elementDimensions: o, popoverDimensions: n, popoverPadding: p, popoverArrowDimensions: r } = t;
  return e === "start" ? Math.max(
    Math.min(
      o.top - p,
      window.innerHeight - n.realHeight - r.width
    ),
    r.width
  ) : e === "end" ? Math.max(
    Math.min(
      o.top - (n == null ? void 0 : n.realHeight) + o.height + p,
      window.innerHeight - (n == null ? void 0 : n.realHeight) - r.width
    ),
    r.width
  ) : e === "center" ? Math.max(
    Math.min(
      o.top + o.height / 2 - (n == null ? void 0 : n.realHeight) / 2,
      window.innerHeight - (n == null ? void 0 : n.realHeight) - r.width
    ),
    r.width
  ) : 0;
}
function K(e, t) {
  const { elementDimensions: o, popoverDimensions: n, popoverPadding: p, popoverArrowDimensions: r } = t;
  return e === "start" ? Math.max(
    Math.min(
      o.left - p,
      window.innerWidth - n.realWidth - r.width
    ),
    r.width
  ) : e === "end" ? Math.max(
    Math.min(
      o.left - (n == null ? void 0 : n.realWidth) + o.width + p,
      window.innerWidth - (n == null ? void 0 : n.realWidth) - r.width
    ),
    r.width
  ) : e === "center" ? Math.max(
    Math.min(
      o.left + o.width / 2 - (n == null ? void 0 : n.realWidth) / 2,
      window.innerWidth - (n == null ? void 0 : n.realWidth) - r.width
    ),
    r.width
  ) : 0;
}
function te(e, t) {
  const o = d("popover");
  if (!o)
    return;
  const { align: n = "start", side: p = "left" } = (t == null ? void 0 : t.popover) || {}, r = n, f = e.id === "driver-dummy-element" ? "over" : p, w = a("stagePadding") || 0, i = ee(), h = o.arrow.getBoundingClientRect(), s = e.getBoundingClientRect(), l = s.top - i.height;
  let c = l >= 0;
  const m = window.innerHeight - (s.bottom + i.height);
  let g = m >= 0;
  const u = s.left - i.width;
  let v = u >= 0;
  const P = window.innerWidth - (s.right + i.width);
  let S = P >= 0;
  const k = !c && !g && !v && !S;
  let C = f;
  if (f === "top" && c ? S = v = g = !1 : f === "bottom" && g ? S = v = c = !1 : f === "left" && v ? S = c = g = !1 : f === "right" && S && (v = c = g = !1), f === "over") {
    const y = window.innerWidth / 2 - i.realWidth / 2, x = window.innerHeight / 2 - i.realHeight / 2;
    o.wrapper.style.left = `${y}px`, o.wrapper.style.right = "auto", o.wrapper.style.top = `${x}px`, o.wrapper.style.bottom = "auto";
  } else if (k) {
    const y = window.innerWidth / 2 - (i == null ? void 0 : i.realWidth) / 2, x = 10;
    o.wrapper.style.left = `${y}px`, o.wrapper.style.right = "auto", o.wrapper.style.bottom = `${x}px`, o.wrapper.style.top = "auto";
  } else if (v) {
    const y = Math.min(
      u,
      window.innerWidth - (i == null ? void 0 : i.realWidth) - h.width
    ), x = Y(r, {
      elementDimensions: s,
      popoverDimensions: i,
      popoverPadding: w,
      popoverArrowDimensions: h
    });
    o.wrapper.style.left = `${y}px`, o.wrapper.style.top = `${x}px`, o.wrapper.style.bottom = "auto", o.wrapper.style.right = "auto", C = "left";
  } else if (S) {
    const y = Math.min(
      P,
      window.innerWidth - (i == null ? void 0 : i.realWidth) - h.width
    ), x = Y(r, {
      elementDimensions: s,
      popoverDimensions: i,
      popoverPadding: w,
      popoverArrowDimensions: h
    });
    o.wrapper.style.right = `${y}px`, o.wrapper.style.top = `${x}px`, o.wrapper.style.bottom = "auto", o.wrapper.style.left = "auto", C = "right";
  } else if (c) {
    const y = Math.min(
      l,
      window.innerHeight - i.realHeight - h.width
    );
    let x = K(r, {
      elementDimensions: s,
      popoverDimensions: i,
      popoverPadding: w,
      popoverArrowDimensions: h
    });
    o.wrapper.style.top = `${y}px`, o.wrapper.style.left = `${x}px`, o.wrapper.style.bottom = "auto", o.wrapper.style.right = "auto", C = "top";
  } else if (g) {
    const y = Math.min(
      m,
      window.innerHeight - (i == null ? void 0 : i.realHeight) - h.width
    );
    let x = K(r, {
      elementDimensions: s,
      popoverDimensions: i,
      popoverPadding: w,
      popoverArrowDimensions: h
    });
    o.wrapper.style.left = `${x}px`, o.wrapper.style.bottom = `${y}px`, o.wrapper.style.top = "auto", o.wrapper.style.right = "auto", C = "bottom";
  }
  k ? o.arrow.classList.add("driver-popover-arrow-none") : ye(r, C, e);
}
function ye(e, t, o) {
  const n = d("popover");
  if (!n)
    return;
  const p = o.getBoundingClientRect(), r = ee(), f = n.arrow, w = r.width, i = window.innerWidth, h = p.width, s = p.left, l = r.height, c = window.innerHeight, m = p.top, g = p.height;
  f.className = "driver-popover-arrow";
  let u = t, v = e;
  t === "top" ? (s + h <= 0 ? (u = "right", v = "end") : s + h - w <= 0 && (u = "top", v = "start"), s >= i ? (u = "left", v = "end") : s + w >= i && (u = "top", v = "end")) : t === "bottom" ? (s + h <= 0 ? (u = "right", v = "start") : s + h - w <= 0 && (u = "bottom", v = "start"), s >= i ? (u = "left", v = "start") : s + w >= i && (u = "bottom", v = "end")) : t === "left" ? (m + g <= 0 ? (u = "bottom", v = "end") : m + g - l <= 0 && (u = "left", v = "start"), m >= c ? (u = "top", v = "end") : m + l >= c && (u = "left", v = "end")) : t === "right" && (m + g <= 0 ? (u = "bottom", v = "start") : m + g - l <= 0 && (u = "right", v = "start"), m >= c ? (u = "top", v = "start") : m + l >= c && (u = "right", v = "end")), u ? (f.classList.add(`driver-popover-arrow-side-${u}`), f.classList.add(`driver-popover-arrow-align-${v}`)) : f.classList.add("driver-popover-arrow-none");
}
function xe() {
  const e = document.createElement("div");
  e.classList.add("driver-popover");
  const t = document.createElement("div");
  t.classList.add("driver-popover-arrow");
  const o = document.createElement("div");
  o.classList.add("driver-popover-title"), o.style.display = "none", o.innerText = "Popover Title";
  const n = document.createElement("div");
  n.classList.add("driver-popover-description"), n.style.display = "none", n.innerText = "Popover description is here";
  const p = document.createElement("button");
  p.classList.add("driver-popover-close-btn"), p.innerHTML = "&times;";
  const r = document.createElement("div");
  r.classList.add("driver-popover-footer");
  const f = document.createElement("span");
  f.classList.add("driver-popover-progress-text"), f.innerText = "";
  const w = document.createElement("span");
  w.classList.add("driver-popover-navigation-btns");
  const i = document.createElement("button");
  i.classList.add("driver-popover-prev-btn"), i.innerHTML = "&larr; Previous";
  const h = document.createElement("button");
  return h.classList.add("driver-popover-next-btn"), h.innerHTML = "Next &rarr;", w.appendChild(i), w.appendChild(h), r.appendChild(f), r.appendChild(w), e.appendChild(p), e.appendChild(t), e.appendChild(o), e.appendChild(n), e.appendChild(r), {
    wrapper: e,
    arrow: t,
    title: o,
    description: n,
    footer: r,
    previousButton: i,
    nextButton: h,
    closeButton: p,
    footerButtons: w,
    progress: f
  };
}
function Ce() {
  var t;
  const e = d("popover");
  e && ((t = e.wrapper.parentElement) == null || t.removeChild(e.wrapper));
}
function be(e = {}) {
  q(e);
  function t() {
    a("allowClose") && h();
  }
  function o() {
    const s = d("activeIndex"), l = a("steps") || [];
    if (typeof s > "u")
      return;
    const c = s + 1;
    l[c] ? i(c) : h();
  }
  function n() {
    const s = d("activeIndex"), l = a("steps") || [];
    if (typeof s > "u")
      return;
    const c = s - 1;
    l[c] ? i(c) : h();
  }
  function p(s) {
    (a("steps") || [])[s] ? i(s) : h();
  }
  function r() {
    var v;
    if (d("__transitionCallback"))
      return;
    const l = d("activeIndex"), c = d("activeStep"), m = d("activeElement");
    if (typeof l > "u" || typeof c > "u" || typeof d("activeIndex") > "u")
      return;
    const u = ((v = c.popover) == null ? void 0 : v.onPrevClick) || a("onPrevClick");
    if (u)
      return u(m, c, {
        config: a(),
        state: d()
      });
    n();
  }
  function f() {
    var u;
    if (d("__transitionCallback"))
      return;
    const l = d("activeIndex"), c = d("activeStep"), m = d("activeElement");
    if (typeof l > "u" || typeof c > "u")
      return;
    const g = ((u = c.popover) == null ? void 0 : u.onNextClick) || a("onNextClick");
    if (g)
      return g(m, c, {
        config: a(),
        state: d()
      });
    o();
  }
  function w() {
    d("isInitialized") || (b("isInitialized", !0), document.body.classList.add("driver-active", a("animate") ? "driver-fade" : "driver-simple"), ge(), _("overlayClick", t), _("escapePress", t), _("arrowLeftPress", r), _("arrowRightPress", f));
  }
  function i(s = 0) {
    var H, E, B, A, O, z, D, F;
    const l = a("steps");
    if (!l) {
      console.error("No steps to drive through"), h();
      return;
    }
    if (!l[s]) {
      h();
      return;
    }
    b("activeIndex", s);
    const c = l[s], m = l[s + 1], g = l[s - 1], u = ((H = c.popover) == null ? void 0 : H.doneBtnText) || a("doneBtnText") || "Done", v = a("allowClose"), P = typeof ((E = c.popover) == null ? void 0 : E.showProgress) < "u" ? (B = c.popover) == null ? void 0 : B.showProgress : a("showProgress"), k = (((A = c.popover) == null ? void 0 : A.progressText) || a("progressText") || "{{current}} of {{total}}").replace("{{current}}", `${s + 1}`).replace("{{total}}", `${l.length}`), C = ((O = c.popover) == null ? void 0 : O.showButtons) || a("showButtons"), y = [
      "next",
      "previous",
      ...v ? ["close"] : []
    ].filter((oe) => !(C != null && C.length) || C.includes(oe)), x = ((z = c.popover) == null ? void 0 : z.onNextClick) || a("onNextClick"), T = ((D = c.popover) == null ? void 0 : D.onPrevClick) || a("onPrevClick"), $ = ((F = c.popover) == null ? void 0 : F.onCloseClick) || a("onCloseClick");
    V({
      ...c,
      popover: {
        showButtons: y,
        nextBtnText: m ? void 0 : u,
        disableButtons: [...g ? [] : ["previous"]],
        showProgress: P,
        progressText: k,
        onNextClick: x || (() => {
          m ? i(s + 1) : h();
        }),
        onPrevClick: T || (() => {
          i(s - 1);
        }),
        onCloseClick: $ || (() => {
          h();
        }),
        ...(c == null ? void 0 : c.popover) || {}
      }
    });
  }
  function h(s = !0) {
    const l = d("activeElement"), c = d("activeStep"), m = a("onDestroyStarted");
    if (s && m) {
      const v = !l || (l == null ? void 0 : l.id) === "driver-dummy-element";
      m(v ? void 0 : l, c, {
        config: a(),
        state: d()
      });
      return;
    }
    const g = (c == null ? void 0 : c.onDeselected) || a("onDeselected"), u = a("onDestroyed");
    if (document.body.classList.remove("driver-active", "driver-fade", "driver-simple"), we(), Ce(), fe(), pe(), se(), re(), l && c) {
      const v = l.id === "driver-dummy-element";
      g && g(v ? void 0 : l, c, {
        config: a(),
        state: d()
      }), u && u(v ? void 0 : l, c, {
        config: a(),
        state: d()
      });
    }
  }
  return {
    isActive: () => d("isInitialized") || !1,
    refresh: M,
    drive: (s = 0) => {
      w(), i(s);
    },
    setConfig: q,
    getConfig: a,
    getState: d,
    getActiveIndex: () => d("activeIndex"),
    isFirstStep: () => d("activeIndex") === 0,
    isLastStep: () => {
      const s = a("steps") || [], l = d("activeIndex");
      return l !== void 0 && l === s.length - 1;
    },
    getActiveStep: () => d("activeStep"),
    getActiveElement: () => d("activeElement"),
    getPreviousElement: () => d("previousElement"),
    getPreviousStep: () => d("previousStep"),
    moveNext: o,
    movePrevious: n,
    moveTo: p,
    hasNextStep: () => {
      const s = a("steps") || [], l = d("activeIndex");
      return l !== void 0 && s[l + 1];
    },
    hasPreviousStep: () => {
      const s = a("steps") || [], l = d("activeIndex");
      return l !== void 0 && s[l - 1];
    },
    highlight: (s) => {
      w(), V({
        ...s,
        popover: s.popover ? {
          showButtons: [],
          showProgress: !1,
          progressText: "",
          ...s.popover
        } : void 0
      });
    },
    destroy: () => {
      h(!1);
    }
  };
}
export {
  be as driver
};
