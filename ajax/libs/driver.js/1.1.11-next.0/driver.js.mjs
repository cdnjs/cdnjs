let I = {};
function F(e = {}) {
  I = {
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
function l(e) {
  return e ? I[e] : I;
}
function W(e, t, o, n) {
  return (e /= n / 2) < 1 ? o / 2 * e * e + t : -o / 2 * (--e * (e - 2) - 1) + t;
}
function K(e) {
  if (!e || ne(e))
    return;
  const t = l("smoothScroll");
  e.scrollIntoView({
    // Removing the smooth scrolling for elements which exist inside the scrollable parent
    // This was causing the highlight to not properly render
    behavior: !t || oe(e) ? "auto" : "smooth",
    inline: "center",
    block: "center"
  });
}
function oe(e) {
  if (!e || !e.parentElement)
    return;
  const t = e.parentElement;
  return t.scrollHeight > t.clientHeight;
}
function ne(e) {
  const t = e.getBoundingClientRect();
  return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth);
}
let N = {};
function b(e, t) {
  N[e] = t;
}
function d(e) {
  return e ? N[e] : N;
}
function ie() {
  N = {};
}
let R = {};
function _(e, t) {
  R[e] = t;
}
function S(e) {
  var t;
  (t = R[e]) == null || t.call(R);
}
function re() {
  R = {};
}
function se(e, t, o, n) {
  let p = d("__activeStagePosition");
  const r = p || o.getBoundingClientRect(), v = n.getBoundingClientRect(), f = W(e, r.x, v.x - r.x, t), i = W(e, r.y, v.y - r.y, t), c = W(e, r.width, v.width - r.width, t), a = W(e, r.height, v.height - r.height, t);
  p = {
    x: f,
    y: i,
    width: c,
    height: a
  }, Q(p), b("__activeStagePosition", p);
}
function j(e) {
  if (!e)
    return;
  const t = e.getBoundingClientRect(), o = {
    x: t.x,
    y: t.y,
    width: t.width,
    height: t.height
  };
  b("__activeStagePosition", o), Q(o);
}
function ae() {
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
function le(e) {
  const t = ce(e);
  document.body.appendChild(t), J(t, (o) => {
    o.target.tagName === "path" && S("overlayClick");
  }), b("__overlaySvg", t);
}
function Q(e) {
  const t = d("__overlaySvg");
  if (!t) {
    le(e);
    return;
  }
  const o = t.firstElementChild;
  if ((o == null ? void 0 : o.tagName) !== "path")
    throw new Error("no path element found in stage svg");
  o.setAttribute("d", Z(e));
}
function ce(e) {
  const t = window.innerWidth, o = window.innerHeight, n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  n.classList.add("driver-overlay", "driver-overlay-animated"), n.setAttribute("viewBox", `0 0 ${t} ${o}`), n.setAttribute("xmlSpace", "preserve"), n.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink"), n.setAttribute("version", "1.1"), n.setAttribute("preserveAspectRatio", "xMinYMin slice"), n.style.fillRule = "evenodd", n.style.clipRule = "evenodd", n.style.strokeLinejoin = "round", n.style.strokeMiterlimit = "2", n.style.zIndex = "10000", n.style.position = "fixed", n.style.top = "0", n.style.left = "0", n.style.width = "100%", n.style.height = "100%";
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return p.setAttribute("d", Z(e)), p.style.fill = l("overlayColor") || "rgb(0,0,0)", p.style.opacity = `${l("overlayOpacity")}`, p.style.pointerEvents = "auto", p.style.cursor = "auto", n.appendChild(p), n;
}
function Z(e) {
  const t = window.innerWidth, o = window.innerHeight, n = l("stagePadding") || 0, p = l("stageRadius") || 0, r = e.width + n * 2, v = e.height + n * 2, f = Math.min(p, r / 2, v / 2), i = Math.floor(Math.max(f, 0)), c = e.x - n + i, a = e.y - n, s = r - i * 2, g = v - i * 2;
  return `M${t},0L0,0L0,${o}L${t},${o}L${t},0Z
    M${c},${a} h${s} a${i},${i} 0 0 1 ${i},${i} v${g} a${i},${i} 0 0 1 -${i},${i} h-${s} a${i},${i} 0 0 1 -${i},-${i} v-${g} a${i},${i} 0 0 1 ${i},-${i} z`;
}
function de() {
  const e = d("__overlaySvg");
  e && e.remove();
}
function pe() {
  const e = document.getElementById("driver-dummy-element");
  if (e)
    return e;
  let t = document.createElement("div");
  return t.id = "driver-dummy-element", t.style.width = "0", t.style.height = "0", t.style.pointerEvents = "none", t.style.opacity = "0", t.style.position = "fixed", t.style.top = "50%", t.style.left = "50%", document.body.appendChild(t), t;
}
function q(e) {
  const { element: t } = e;
  let o = typeof t == "string" ? document.querySelector(t) : t;
  o || (o = pe()), ve(o, e);
}
function ue() {
  const e = d("activeElement"), t = d("activeStep");
  e && (j(e), ae(), ee(e, t));
}
function ve(e, t) {
  const n = Date.now(), p = d("activeStep"), r = d("activeElement") || e, v = !r || r === e, f = e.id === "driver-dummy-element", i = r.id === "driver-dummy-element", c = l("animate"), a = t.onHighlightStarted || l("onHighlightStarted"), s = (t == null ? void 0 : t.onHighlighted) || l("onHighlighted"), g = (p == null ? void 0 : p.onDeselected) || l("onDeselected"), m = l(), h = d();
  !v && g && g(i ? void 0 : r, p, {
    config: m,
    state: h
  }), a && a(f ? void 0 : e, t, {
    config: m,
    state: h
  });
  const u = !v && c;
  let w = !1;
  ge();
  const L = () => {
    if (d("__transitionCallback") !== L)
      return;
    const C = Date.now() - n, y = 400 - C <= 400 / 2;
    t.popover && y && !w && u && (V(e, t), w = !0), l("animate") && C < 400 ? se(C, 400, r, e) : (j(e), s && s(f ? void 0 : e, t, {
      config: l(),
      state: d()
    }), b("__transitionCallback", void 0), b("previousStep", p), b("previousElement", r), b("activeStep", t), b("activeElement", e)), window.requestAnimationFrame(L);
  };
  b("__transitionCallback", L), window.requestAnimationFrame(L), K(e), !u && t.popover && V(e, t), r.classList.remove("driver-active-element"), e.classList.add("driver-active-element");
}
function he() {
  var e;
  (e = document.getElementById("driver-dummy-element")) == null || e.remove(), document.querySelectorAll(".driver-active-element").forEach((t) => {
    t.classList.remove("driver-active-element");
  });
}
function M() {
  const e = d("__resizeTimeout");
  e && window.cancelAnimationFrame(e), b("__resizeTimeout", window.requestAnimationFrame(ue));
}
function G(e) {
  l("allowKeyboardControl");
  e.key === "Escape" ? S("escapePress") : e.key === "ArrowRight" ? S("arrowRightPress") : e.key === "ArrowLeft" && S("arrowLeftPress");
}
function J(e, t, o) {
  const n = (r, v) => {
    const f = r.target;
    e.contains(f) && ((!o || o(f)) && (r.preventDefault(), r.stopPropagation(), r.stopImmediatePropagation()), v == null || v(r));
  };
  document.addEventListener("pointerdown", n, !0), document.addEventListener("mousedown", n, !0), document.addEventListener("pointerup", n, !0), document.addEventListener("mouseup", n, !0), document.addEventListener(
    "click",
    (r) => {
      n(r, t);
    },
    !0
  );
}
function fe() {
  window.addEventListener("keyup", G, !1), window.addEventListener("resize", M), window.addEventListener("scroll", M);
}
function we() {
  window.removeEventListener("keyup", G), window.removeEventListener("resize", M), window.removeEventListener("scroll", M);
}
function ge() {
  const e = d("popover");
  e && (e.wrapper.style.display = "none");
}
function V(e, t) {
  var C, k;
  let o = d("popover");
  o && document.body.removeChild(o.wrapper), o = ye(), document.body.appendChild(o.wrapper);
  const {
    title: n,
    description: p,
    showButtons: r,
    disableButtons: v,
    showProgress: f,
    nextBtnText: i = l("nextBtnText") || "Next &rarr;",
    prevBtnText: c = l("prevBtnText") || "&larr; Previous",
    progressText: a = l("progressText") || "{current} of {total}"
  } = t.popover || {};
  o.nextButton.innerHTML = i, o.previousButton.innerHTML = c, o.progress.innerHTML = a, n ? (o.title.innerText = n, o.title.style.display = "block") : o.title.style.display = "none", p ? (o.description.innerHTML = p, o.description.style.display = "block") : o.description.style.display = "none";
  const s = r || l("showButtons"), g = f || l("showProgress") || !1, m = (s == null ? void 0 : s.includes("next")) || (s == null ? void 0 : s.includes("previous")) || g;
  o.closeButton.style.display = s.includes("close") ? "block" : "none", m ? (o.footer.style.display = "flex", o.progress.style.display = g ? "block" : "none", o.nextButton.style.display = s.includes("next") ? "block" : "none", o.previousButton.style.display = s.includes("previous") ? "block" : "none") : o.footer.style.display = "none";
  const h = v || l("disableButtons") || [];
  h != null && h.includes("next") && o.nextButton.classList.add("driver-popover-btn-disabled"), h != null && h.includes("previous") && o.previousButton.classList.add("driver-popover-btn-disabled"), h != null && h.includes("close") && o.closeButton.classList.add("driver-popover-btn-disabled");
  const u = o.wrapper;
  u.style.display = "block", u.style.left = "", u.style.top = "", u.style.bottom = "", u.style.right = "";
  const w = o.arrow;
  w.className = "driver-popover-arrow";
  const L = ((C = t.popover) == null ? void 0 : C.popoverClass) || l("popoverClass") || "";
  u.className = `driver-popover ${L}`.trim(), J(
    o.wrapper,
    (y) => {
      var E, B, A;
      const x = y.target, T = ((E = t.popover) == null ? void 0 : E.onNextClick) || l("onNextClick"), $ = ((B = t.popover) == null ? void 0 : B.onPrevClick) || l("onPrevClick"), H = ((A = t.popover) == null ? void 0 : A.onCloseClick) || l("onCloseClick");
      if (x.classList.contains("driver-popover-next-btn"))
        return T ? T(e, t, {
          config: l(),
          state: d()
        }) : S("nextClick");
      if (x.classList.contains("driver-popover-prev-btn"))
        return $ ? $(e, t, {
          config: l(),
          state: d()
        }) : S("prevClick");
      if (x.classList.contains("driver-popover-close-btn"))
        return H ? H(e, t, {
          config: l(),
          state: d()
        }) : S("closeClick");
    },
    (y) => !(o != null && o.description.contains(y)) && !(o != null && o.title.contains(y)) && y.className.includes("driver-popover")
  ), b("popover", o), ee(e, t), K(u);
  const P = ((k = t.popover) == null ? void 0 : k.onPopoverRendered) || l("onPopoverRendered");
  P && P(o);
}
function U() {
  const e = d("popover");
  if (!(e != null && e.wrapper))
    return;
  const t = e.wrapper.getBoundingClientRect(), o = l("stagePadding") || 0, n = l("popoverOffset") || 0;
  return {
    width: t.width + o + n,
    height: t.height + o + n,
    realWidth: t.width,
    realHeight: t.height
  };
}
function X(e, t) {
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
function Y(e, t) {
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
function ee(e, t) {
  const o = d("popover");
  if (!o)
    return;
  const { align: n = "start", side: p = "left" } = (t == null ? void 0 : t.popover) || {}, r = n, v = e.id === "driver-dummy-element" ? "over" : p, f = l("stagePadding") || 0, i = U(), c = o.arrow.getBoundingClientRect(), a = e.getBoundingClientRect(), s = a.top - i.height;
  let g = s >= 0;
  const m = window.innerHeight - (a.bottom + i.height);
  let h = m >= 0;
  const u = a.left - i.width;
  let w = u >= 0;
  const L = window.innerWidth - (a.right + i.width);
  let P = L >= 0;
  const C = !g && !h && !w && !P;
  let k = v;
  if (v === "top" && g ? P = w = h = !1 : v === "bottom" && h ? P = w = g = !1 : v === "left" && w ? P = g = h = !1 : v === "right" && P && (w = g = h = !1), v === "over") {
    const y = window.innerWidth / 2 - i.realWidth / 2, x = window.innerHeight / 2 - i.realHeight / 2;
    o.wrapper.style.left = `${y}px`, o.wrapper.style.right = "auto", o.wrapper.style.top = `${x}px`, o.wrapper.style.bottom = "auto";
  } else if (C) {
    const y = window.innerWidth / 2 - (i == null ? void 0 : i.realWidth) / 2, x = 10;
    o.wrapper.style.left = `${y}px`, o.wrapper.style.right = "auto", o.wrapper.style.bottom = `${x}px`, o.wrapper.style.top = "auto";
  } else if (w) {
    const y = Math.min(
      u,
      window.innerWidth - (i == null ? void 0 : i.realWidth) - c.width
    ), x = X(r, {
      elementDimensions: a,
      popoverDimensions: i,
      popoverPadding: f,
      popoverArrowDimensions: c
    });
    o.wrapper.style.left = `${y}px`, o.wrapper.style.top = `${x}px`, o.wrapper.style.bottom = "auto", o.wrapper.style.right = "auto", k = "left";
  } else if (P) {
    const y = Math.min(
      L,
      window.innerWidth - (i == null ? void 0 : i.realWidth) - c.width
    ), x = X(r, {
      elementDimensions: a,
      popoverDimensions: i,
      popoverPadding: f,
      popoverArrowDimensions: c
    });
    o.wrapper.style.right = `${y}px`, o.wrapper.style.top = `${x}px`, o.wrapper.style.bottom = "auto", o.wrapper.style.left = "auto", k = "right";
  } else if (g) {
    const y = Math.min(
      s,
      window.innerHeight - i.realHeight - c.width
    );
    let x = Y(r, {
      elementDimensions: a,
      popoverDimensions: i,
      popoverPadding: f,
      popoverArrowDimensions: c
    });
    o.wrapper.style.top = `${y}px`, o.wrapper.style.left = `${x}px`, o.wrapper.style.bottom = "auto", o.wrapper.style.right = "auto", k = "top";
  } else if (h) {
    const y = Math.min(
      m,
      window.innerHeight - (i == null ? void 0 : i.realHeight) - c.width
    );
    let x = Y(r, {
      elementDimensions: a,
      popoverDimensions: i,
      popoverPadding: f,
      popoverArrowDimensions: c
    });
    o.wrapper.style.left = `${x}px`, o.wrapper.style.bottom = `${y}px`, o.wrapper.style.top = "auto", o.wrapper.style.right = "auto", k = "bottom";
  }
  C ? o.arrow.classList.add("driver-popover-arrow-none") : me(r, k, e);
}
function me(e, t, o) {
  const n = d("popover");
  if (!n)
    return;
  const p = o.getBoundingClientRect(), r = U(), v = n.arrow, f = r.width, i = window.innerWidth, c = p.width, a = p.left, s = r.height, g = window.innerHeight, m = p.top, h = p.height;
  v.className = "driver-popover-arrow";
  let u = t, w = e;
  t === "top" ? (a + c <= 0 ? (u = "right", w = "end") : a + c - f <= 0 && (u = "top", w = "start"), a >= i ? (u = "left", w = "end") : a + f >= i && (u = "top", w = "end")) : t === "bottom" ? (a + c <= 0 ? (u = "right", w = "start") : a + c - f <= 0 && (u = "bottom", w = "start"), a >= i ? (u = "left", w = "start") : a + f >= i && (u = "bottom", w = "end")) : t === "left" ? (m + h <= 0 ? (u = "bottom", w = "end") : m + h - s <= 0 && (u = "left", w = "start"), m >= g ? (u = "top", w = "end") : m + s >= g && (u = "left", w = "end")) : t === "right" && (m + h <= 0 ? (u = "bottom", w = "start") : m + h - s <= 0 && (u = "right", w = "start"), m >= g ? (u = "top", w = "start") : m + s >= g && (u = "right", w = "end")), u ? (v.classList.add(`driver-popover-arrow-side-${u}`), v.classList.add(`driver-popover-arrow-align-${w}`)) : v.classList.add("driver-popover-arrow-none");
}
function ye() {
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
  const v = document.createElement("span");
  v.classList.add("driver-popover-progress-text"), v.innerText = "";
  const f = document.createElement("span");
  f.classList.add("driver-popover-navigation-btns");
  const i = document.createElement("button");
  i.classList.add("driver-popover-prev-btn"), i.innerHTML = "&larr; Previous";
  const c = document.createElement("button");
  return c.classList.add("driver-popover-next-btn"), c.innerHTML = "Next &rarr;", f.appendChild(i), f.appendChild(c), r.appendChild(v), r.appendChild(f), e.appendChild(p), e.appendChild(t), e.appendChild(o), e.appendChild(n), e.appendChild(r), {
    wrapper: e,
    arrow: t,
    title: o,
    description: n,
    footer: r,
    previousButton: i,
    nextButton: c,
    closeButton: p,
    footerButtons: f,
    progress: v
  };
}
function xe() {
  var t;
  const e = d("popover");
  e && ((t = e.wrapper.parentElement) == null || t.removeChild(e.wrapper));
}
function Ce(e = {}) {
  F(e);
  function t() {
    l("allowClose") && i();
  }
  function o() {
    const c = d("activeIndex"), a = l("steps") || [];
    if (typeof c > "u")
      return;
    const s = c + 1;
    a[s] ? f(s) : i();
  }
  function n() {
    const c = d("activeIndex"), a = l("steps") || [];
    if (typeof c > "u")
      return;
    const s = c - 1;
    a[s] ? f(s) : i();
  }
  function p() {
    var u;
    if (d("__transitionCallback"))
      return;
    const a = d("activeIndex"), s = d("activeStep"), g = d("activeElement");
    if (typeof a > "u" || typeof s > "u" || typeof d("activeIndex") > "u")
      return;
    const h = ((u = s.popover) == null ? void 0 : u.onPrevClick) || l("onPrevClick");
    if (h)
      return h(g, s, {
        config: l(),
        state: d()
      });
    n();
  }
  function r() {
    var h;
    if (d("__transitionCallback"))
      return;
    const a = d("activeIndex"), s = d("activeStep"), g = d("activeElement");
    if (typeof a > "u" || typeof s > "u")
      return;
    const m = ((h = s.popover) == null ? void 0 : h.onNextClick) || l("onNextClick");
    if (m)
      return m(g, s, {
        config: l(),
        state: d()
      });
    o();
  }
  function v() {
    d("isInitialized") || (b("isInitialized", !0), document.body.classList.add("driver-active", l("animate") ? "driver-fade" : "driver-simple"), fe(), _("overlayClick", t), _("escapePress", t), _("arrowLeftPress", p), _("arrowRightPress", r));
  }
  function f(c = 0) {
    var $, H, E, B, A, O, z, D;
    const a = l("steps");
    if (!a) {
      console.error("No steps to drive through"), i();
      return;
    }
    if (!a[c]) {
      i();
      return;
    }
    b("activeIndex", c);
    const s = a[c], g = a[c + 1], m = a[c - 1], h = (($ = s.popover) == null ? void 0 : $.doneBtnText) || l("doneBtnText") || "Done", u = l("allowClose"), w = typeof ((H = s.popover) == null ? void 0 : H.showProgress) < "u" ? (E = s.popover) == null ? void 0 : E.showProgress : l("showProgress"), P = (((B = s.popover) == null ? void 0 : B.progressText) || l("progressText") || "{{current}} of {{total}}").replace("{{current}}", `${c + 1}`).replace("{{total}}", `${a.length}`), C = ((A = s.popover) == null ? void 0 : A.showButtons) || l("showButtons"), k = [
      "next",
      "previous",
      ...u ? ["close"] : []
    ].filter((te) => !(C != null && C.length) || C.includes(te)), y = ((O = s.popover) == null ? void 0 : O.onNextClick) || l("onNextClick"), x = ((z = s.popover) == null ? void 0 : z.onPrevClick) || l("onPrevClick"), T = ((D = s.popover) == null ? void 0 : D.onCloseClick) || l("onCloseClick");
    q({
      ...s,
      popover: {
        showButtons: k,
        nextBtnText: g ? void 0 : h,
        disableButtons: [...m ? [] : ["previous"]],
        showProgress: w,
        progressText: P,
        onNextClick: y || (() => {
          g ? f(c + 1) : i();
        }),
        onPrevClick: x || (() => {
          f(c - 1);
        }),
        onCloseClick: T || (() => {
          i();
        }),
        ...(s == null ? void 0 : s.popover) || {}
      }
    });
  }
  function i(c = !0) {
    const a = d("activeElement"), s = d("activeStep"), g = l("onDestroyStarted");
    if (c && g) {
      const u = !a || (a == null ? void 0 : a.id) === "driver-dummy-element";
      g(u ? void 0 : a, s, {
        config: l(),
        state: d()
      });
      return;
    }
    const m = (s == null ? void 0 : s.onDeselected) || l("onDeselected"), h = l("onDestroyed");
    if (document.body.classList.remove("driver-active", "driver-fade", "driver-simple"), we(), xe(), he(), de(), re(), ie(), a && s) {
      const u = a.id === "driver-dummy-element";
      m && m(u ? void 0 : a, s, {
        config: l(),
        state: d()
      }), h && h(u ? void 0 : a, s, {
        config: l(),
        state: d()
      });
    }
  }
  return {
    isActive: () => d("isInitialized") || !1,
    refresh: M,
    drive: (c = 0) => {
      v(), f(c);
    },
    setConfig: F,
    getConfig: l,
    getState: d,
    moveNext: o,
    movePrevious: n,
    hasNextStep: () => {
      const c = l("steps") || [], a = d("activeIndex");
      return a !== void 0 && c[a + 1];
    },
    hasPreviousStep: () => {
      const c = l("steps") || [], a = d("activeIndex");
      return a !== void 0 && c[a - 1];
    },
    highlight: (c) => {
      v(), q({
        ...c,
        popover: c.popover ? {
          showButtons: [],
          showProgress: !1,
          progressText: "",
          ...c.popover
        } : void 0
      });
    },
    destroy: () => {
      i(!1);
    }
  };
}
export {
  Ce as driver
};
