import { ref as L, reactive as Re, watch as ie, onMounted as de, onBeforeUnmount as Ae, openBlock as u, createElementBlock as h, renderSlot as V, unref as $, createElementVNode as r, Fragment as F, renderList as j, normalizeClass as C, createCommentVNode as N, withModifiers as M, nextTick as Le, getCurrentInstance as Kt, onBeforeMount as Yt, defineComponent as bt, h as $e, createVNode as B, Teleport as Ct, computed as R, resolveComponent as ve, createBlock as Y, withCtx as O, createTextVNode as q, toDisplayString as I, withDirectives as te, vShow as ye, normalizeStyle as ge, onUnmounted as Wt, withKeys as W, vModelText as Ze, useSlots as qt, normalizeProps as Gt, mergeProps as jt, render as ce, createSlots as Zt, vModelDynamic as Jt } from "vue";
function J(e) {
  return typeof e < "u" && e !== null;
}
function he(e) {
  return typeof e == "function";
}
function Se(e) {
  return typeof e == "number";
}
function ue(e) {
  return typeof e == "string";
}
function Fe(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
const Xt = { class: "carousel-indicators" }, Qt = ["onClick"], en = {
  class: "carousel-inner",
  role: "listbox"
}, tn = /* @__PURE__ */ r("span", { class: "sr-only" }, "Previous", -1), nn = /* @__PURE__ */ r("span", { class: "sr-only" }, "Next", -1), ln = {
  __name: "Carousel",
  props: {
    modelValue: { type: Number, default: void 0 },
    indicators: { type: Boolean, default: !0 },
    controls: { type: Boolean, default: !0 },
    interval: { type: Number, default: 5e3 },
    iconControlLeft: {
      type: String,
      default: "glyphicon glyphicon-chevron-left"
    },
    iconControlRight: {
      type: String,
      default: "glyphicon glyphicon-chevron-right"
    }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { expose: t, emit: n }) {
    const l = e;
    let o = L(0), s = 0, a = 0;
    const i = Re([]);
    function d(v, S) {
      const x = S || 0;
      let b;
      v > x ? b = ["next", "left"] : b = ["prev", "right"], i[v].exposed.slideClass[b[0]] = !0, Le(() => {
        i[v].vnode.el.offsetHeight, i.forEach((E, z) => {
          z === x ? (E.exposed.slideClass.active = !0, E.exposed.slideClass[b[1]] = !0) : z === v && (E.exposed.slideClass[b[1]] = !0);
        }), s = setTimeout(() => {
          c(v), n("change", v), s = 0;
        }, 600);
      });
    }
    function p() {
      f(), l.interval > 0 && (a = setInterval(() => {
        y();
      }, l.interval));
    }
    function f() {
      clearInterval(a), a = 0;
    }
    function m() {
      i.forEach((v) => {
        v.exposed.slideClass.active = !1, v.exposed.slideClass.left = !1, v.exposed.slideClass.right = !1, v.exposed.slideClass.next = !1, v.exposed.slideClass.prev = !1;
      });
    }
    function c(v) {
      m(), i[v].exposed.slideClass.active = !0;
    }
    function g(v) {
      s !== 0 || v === o.value || (J(l.modelValue) ? n("update:modelValue", v) : (d(v, o.value), o.value = v));
    }
    function k() {
      g(o.value === 0 ? i.length - 1 : o.value - 1);
    }
    function y() {
      g(o.value === i.length - 1 ? 0 : o.value + 1);
    }
    return ie(
      () => l.interval,
      () => {
        p();
      }
    ), ie(
      () => l.modelValue,
      (v, S) => {
        d(v, S), o.value = v;
      }
    ), de(() => {
      J(l.modelValue) && (o.value = l.modelValue), i.length > 0 && c(o.value), p();
    }), Ae(() => {
      f();
    }), t({
      slides: i
    }), (v, S) => (u(), h("div", {
      class: "carousel slide",
      "data-ride": "carousel",
      onMouseenter: f,
      onMouseleave: p
    }, [
      e.indicators ? V(v.$slots, "indicators", {
        key: 0,
        select: g,
        activeIndex: $(o)
      }, () => [
        r("ol", Xt, [
          (u(!0), h(F, null, j(i, (x, b) => (u(), h("li", {
            key: b,
            class: C({ active: b === $(o) }),
            onClick: (E) => g(b)
          }, null, 10, Qt))), 128))
        ])
      ]) : N("", !0),
      r("div", en, [
        V(v.$slots, "default")
      ]),
      e.controls ? (u(), h("a", {
        key: 1,
        class: "left carousel-control",
        href: "#",
        role: "button",
        onClick: S[0] || (S[0] = M((x) => k(), ["prevent"]))
      }, [
        r("span", {
          class: C(e.iconControlLeft),
          "aria-hidden": "true"
        }, null, 2),
        tn
      ])) : N("", !0),
      e.controls ? (u(), h("a", {
        key: 2,
        class: "right carousel-control",
        href: "#",
        role: "button",
        onClick: S[1] || (S[1] = M((x) => y(), ["prevent"]))
      }, [
        r("span", {
          class: C(e.iconControlRight),
          "aria-hidden": "true"
        }, null, 2),
        nn
      ])) : N("", !0)
    ], 32));
  }
};
function ot(e, t) {
  if (Array.isArray(e)) {
    const n = e.indexOf(t);
    n >= 0 && e.splice(n, 1);
  }
}
function sn(e, t = 0, n = 1) {
  const l = [];
  for (let o = t; o < e; o += n)
    l.push(o);
  return l;
}
function on(e, t, n) {
  return n.indexOf(e) === t;
}
const an = {
  __name: "Slide",
  setup(e, { expose: t }) {
    const n = Kt(), l = Re({
      active: !1,
      prev: !1,
      next: !1,
      left: !1,
      right: !1
    });
    return Yt(() => {
      var o, s, a;
      (a = (s = (o = n.parent) == null ? void 0 : o.exposed) == null ? void 0 : s.slides) == null || a.push(n);
    }), Ae(() => {
      var o, s;
      ot((s = (o = n.parent) == null ? void 0 : o.exposed) == null ? void 0 : s.slides, n);
    }), t({
      slideClass: l
    }), (o, s) => (u(), h("div", {
      class: C(["item", l])
    }, [
      V(o.$slots, "default")
    ], 2));
  }
}, w = {
  MOUSE_ENTER: "mouseenter",
  MOUSE_LEAVE: "mouseleave",
  MOUSE_DOWN: "mousedown",
  MOUSE_UP: "mouseup",
  FOCUS: "focus",
  BLUR: "blur",
  CLICK: "click",
  INPUT: "input",
  KEY_DOWN: "keydown",
  KEY_UP: "keyup",
  KEY_PRESS: "keypress",
  RESIZE: "resize",
  SCROLL: "scroll",
  TOUCH_START: "touchstart",
  TOUCH_END: "touchend"
}, ee = {
  CLICK: "click",
  HOVER: "hover",
  FOCUS: "focus",
  HOVER_FOCUS: "hover-focus",
  OUTSIDE_CLICK: "outside-click",
  MANUAL: "manual"
}, G = {
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left"
};
function Je(e) {
  return window.getComputedStyle(e);
}
function it() {
  const e = window.innerWidth || 0, t = window.innerHeight || 0;
  return { width: e, height: t };
}
let Be = null, He = null;
function rn(e = !1) {
  const t = it();
  if (Be !== null && !e && t.height === He.height && t.width === He.width)
    return Be;
  if (document.readyState === "loading")
    return null;
  const n = document.createElement("div"), l = document.createElement("div");
  return n.style.width = l.style.width = n.style.height = l.style.height = "100px", n.style.overflow = "scroll", l.style.overflow = "hidden", document.body.appendChild(n), document.body.appendChild(l), Be = Math.abs(n.scrollHeight - l.scrollHeight), document.body.removeChild(n), document.body.removeChild(l), He = t, Be;
}
function P(e, t, n) {
  e.addEventListener(t, n);
}
function _(e, t, n) {
  e.removeEventListener(t, n);
}
function ne(e) {
  return e && e.nodeType === Node.ELEMENT_NODE;
}
function ae(e) {
  ne(e) && ne(e.parentNode) && e.parentNode.removeChild(e);
}
function H(e, t) {
  !ne(e) || e.classList.add(t);
}
function Z(e, t) {
  !ne(e) || e.classList.remove(t);
}
function un(e, t) {
  return ne(e) ? e.classList.contains(t) : !1;
}
function dn(e, t, n = {}) {
  const l = document.documentElement, o = (window.pageXOffset || l.scrollLeft) - (l.clientLeft || 0), s = (window.pageYOffset || l.scrollTop) - (l.clientTop || 0), a = t.getBoundingClientRect(), i = e.getBoundingClientRect();
  if (e.style.right = "auto", e.style.bottom = "auto", n.menuRight) {
    const d = o + a.left + a.width - i.width;
    e.style.left = d < 0 ? 0 : d + "px";
  } else
    e.style.left = o + a.left + "px";
  n.dropup ? e.style.top = s + a.top - i.height - 4 + "px" : e.style.top = s + a.top + a.height + "px";
}
function rt(e, t, n) {
  const l = e.getBoundingClientRect(), o = t.getBoundingClientRect(), s = it();
  let a = !0, i = !0, d = !0, p = !0;
  switch (n) {
    case G.TOP:
      a = l.top >= o.height, p = l.left + l.width / 2 >= o.width / 2, i = l.right - l.width / 2 + o.width / 2 <= s.width;
      break;
    case G.BOTTOM:
      d = l.bottom + o.height <= s.height, p = l.left + l.width / 2 >= o.width / 2, i = l.right - l.width / 2 + o.width / 2 <= s.width;
      break;
    case G.RIGHT:
      i = l.right + o.width <= s.width, a = l.top + l.height / 2 >= o.height / 2, d = l.bottom - l.height / 2 + o.height / 2 <= s.height;
      break;
    case G.LEFT:
      p = l.left >= o.width, a = l.top + l.height / 2 >= o.height / 2, d = l.bottom - l.height / 2 + o.height / 2 <= s.height;
      break;
  }
  return a && i && d && p;
}
function cn(e, t, n, l, o, s, a) {
  if (!ne(e) || !ne(t))
    return;
  const i = e && e.className && e.className.indexOf("popover") >= 0;
  let d, p;
  if (!J(o) || o === "body" || s === "body") {
    const y = document.documentElement;
    p = (window.pageXOffset || y.scrollLeft) - (y.clientLeft || 0), d = (window.pageYOffset || y.scrollTop) - (y.clientTop || 0);
  } else {
    const y = Pe(s || o);
    p = y.scrollLeft, d = y.scrollTop;
  }
  if (l) {
    const y = [
      G.RIGHT,
      G.BOTTOM,
      G.LEFT,
      G.TOP
    ], v = (S) => {
      y.forEach((x) => {
        Z(e, x);
      }), H(e, S);
    };
    if (!rt(t, e, n)) {
      for (let S = 0, x = y.length; S < x; S++)
        if (v(y[S]), rt(t, e, y[S])) {
          n = y[S];
          break;
        }
      v(n);
    }
  }
  const f = t.getBoundingClientRect(), m = e.getBoundingClientRect();
  let c, g;
  n === G.BOTTOM ? (c = d + f.top + f.height, g = p + f.left + f.width / 2 - m.width / 2) : n === G.LEFT ? (c = d + f.top + f.height / 2 - m.height / 2, g = p + f.left - m.width) : n === G.RIGHT ? (c = d + f.top + f.height / 2 - m.height / 2, g = p + f.left + f.width + 1) : (c = d + f.top - m.height, g = p + f.left + f.width / 2 - m.width / 2);
  let k;
  if (ue(a) ? k = document.querySelector(a) : he(a) && (k = a(t)), ne(k)) {
    const y = i ? 11 : 0, v = k.getBoundingClientRect(), S = d + v.top, x = p + v.left, b = S + v.height, E = x + v.width;
    c < S ? c = S : c + m.height > b && (c = b - m.height), g < x ? g = x : g + m.width > E && (g = E - m.width), n === G.BOTTOM ? c -= y : n === G.LEFT ? g += y : n === G.RIGHT ? g -= y : c += y;
  }
  e.style.top = `${c}px`, e.style.left = `${g}px`;
}
function ut(e) {
  const t = "scroll", n = e.scrollHeight > e.clientHeight, l = Je(e);
  return n || l.overflow === t || l.overflowY === t;
}
function ze(e) {
  const t = "modal-open", n = ".navbar-fixed-top, .navbar-fixed-bottom", l = document.body;
  if (e)
    Z(l, t), l.style.paddingRight = null, [...document.querySelectorAll(n)].forEach((o) => {
      o.style.paddingRight = null;
    });
  else {
    if (ut(document.documentElement) || ut(document.body)) {
      const s = rn();
      l.style.paddingRight = `${s}px`, [...document.querySelectorAll(n)].forEach((a) => {
        a.style.paddingRight = `${s}px`;
      });
    }
    H(l, t);
  }
}
function hn(e, t) {
  return ne(e) ? e.closest(t) : null;
}
function Xe(e, t, n = null) {
  const l = [];
  let o = e.parentElement;
  for (; o; ) {
    if (o.matches(t))
      l.push(o);
    else if (n && (n === o || o.matches(n)))
      break;
    o = o.parentElement;
  }
  return l;
}
function Ke(e) {
  !ne(e) || (e.getAttribute("tabindex") || e.setAttribute("tabindex", "-1"), e.focus());
}
const fn = "modal-backdrop";
function kt() {
  return document.querySelectorAll(`.${fn}`);
}
function Me() {
  return kt().length;
}
function Pe(e) {
  return ue(e) ? document.querySelector(e) : ne(e) ? e : ne(e.$el) ? e.$el : null;
}
const Tt = bt({
  props: {
    tag: { type: String, default: "div" },
    modelValue: { type: Boolean, default: !1 },
    transition: { type: Number, default: 350 }
  },
  emits: ["show", "shown", "hide", "hidden"],
  setup(e, { emit: t, slots: n }) {
    const l = "collapse", o = "in", s = "collapsing";
    let a = 0;
    const i = L(null);
    function d() {
      const p = e.modelValue, f = i.value;
      if (clearTimeout(a), !!f)
        if (p) {
          t("show"), Z(f, l), f.style.height = "auto";
          const m = window.getComputedStyle(f).height;
          f.style.height = null, H(f, s), f.offsetHeight, f.style.height = m, a = setTimeout(() => {
            Z(f, s), H(f, l), H(f, o), f.style.height = null, a = 0, t("shown");
          }, e.transition);
        } else
          t("hide"), f.style.height = window.getComputedStyle(f).height, Z(f, o), Z(f, l), f.offsetHeight, f.style.height = null, H(f, s), a = setTimeout(() => {
            H(f, l), Z(f, s), f.style.height = null, a = 0, t("hidden");
          }, e.transition);
    }
    return ie(
      () => e.modelValue,
      () => {
        d();
      }
    ), de(() => {
      e.modelValue && H(i.value, o);
    }), () => {
      var p;
      return $e(e.tag, { ref: i, class: l }, (p = n.default) == null ? void 0 : p.call(n));
    };
  }
}), dt = "div", Ue = bt({
  props: {
    tag: {
      type: String,
      default: dt
    },
    appendToBody: {
      type: Boolean,
      default: !1
    },
    modelValue: Boolean,
    dropup: {
      type: Boolean,
      default: !1
    },
    menuRight: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    notCloseElements: {
      type: Array,
      default: () => []
    },
    positionElement: {
      type: null,
      default: void 0
    }
  },
  emits: ["update:modelValue"],
  setup(e, {
    emit: t,
    slots: n
  }) {
    const l = L(!1), o = L(void 0), s = L(null), a = L(null);
    function i() {
      var c;
      return (c = s.value) == null ? void 0 : c.querySelector("li > a:focus");
    }
    function d(c) {
      var g, k;
      if (l.value) {
        const y = s.value, v = c.keyCode;
        if (v === 27)
          f(!1), (g = o.value) == null || g.focus();
        else if (v === 13)
          (k = i()) == null || k.click();
        else if (v === 38 || v === 40) {
          c.preventDefault(), c.stopPropagation();
          const S = i(), x = y.querySelectorAll("li:not(.disabled) > a");
          if (!S)
            Ke(x[0]);
          else
            for (let b = 0; b < x.length; b++)
              if (S === x[b]) {
                v === 38 && b < x.length > 0 ? Ke(x[b - 1]) : v === 40 && b < x.length - 1 && Ke(x[b + 1]);
                break;
              }
        }
      }
    }
    function p() {
      var g, k, y;
      const c = ((g = a.value) == null ? void 0 : g.querySelector('[data-role="trigger"]')) || ((k = a.value) == null ? void 0 : k.querySelector(".dropdown-toggle")) || ((y = a.value) == null ? void 0 : y.firstChild);
      o.value = c && c !== s.value ? c : null;
    }
    function f(c) {
      var g;
      if (!e.disabled) {
        if (typeof c == "boolean" ? l.value = c : l.value = !l.value, e.appendToBody)
          if (l.value) {
            s.value.style.display = "block";
            const k = e.positionElement || a.value;
            dn(s.value, k, e);
          } else
            (g = s.value) == null || g.removeAttribute("style");
        t("update:modelValue", l.value);
      }
    }
    function m(c) {
      var k, y, v;
      const g = c.target;
      if (l.value && g) {
        let S = !1;
        if (e.notCloseElements)
          for (let z = 0, U = e.notCloseElements.length; z < U; z++) {
            const A = e.notCloseElements[z].contains(g);
            let oe = A;
            if (e.appendToBody) {
              const pe = (k = s.value) == null ? void 0 : k.contains(g), T = e.notCloseElements.indexOf(a.value) >= 0;
              oe = A || pe && T;
            }
            if (oe) {
              S = !0;
              break;
            }
          }
        const x = (y = s.value) == null ? void 0 : y.contains(g), b = ((v = a.value) == null ? void 0 : v.contains(g)) && !x, E = x && c.type === "touchend";
        !b && !S && !E && f(!1);
      }
    }
    return de(() => {
      p(), o.value && (P(o.value, w.CLICK, f), P(o.value, w.KEY_DOWN, d)), P(s.value, w.KEY_DOWN, d), P(window, w.CLICK, m), P(window, w.TOUCH_END, m), e.modelValue && f(!0);
    }), Ae(() => {
      o.value && (_(o.value, w.CLICK, f), _(o.value, w.KEY_DOWN, d)), _(s.value, w.KEY_DOWN, d), _(window, w.CLICK, m), _(window, w.TOUCH_END, m);
    }), ie(() => e.modelValue, (c) => {
      f(c);
    }), () => {
      const c = e.tag;
      return B(c, {
        ref: a,
        class: {
          "btn-group": e.tag === dt,
          dropdown: !e.dropup,
          dropup: e.dropup,
          open: l.value
        }
      }, {
        default: () => {
          var g;
          return [(g = n.default) == null ? void 0 : g.call(n), B(Ct, {
            to: "body",
            disabled: !e.appendToBody || !l.value
          }, {
            default: () => {
              var k;
              return [B("ul", {
                ref: s,
                class: {
                  "dropdown-menu": !0,
                  "dropdown-menu-right": e.menuRight
                }
              }, [(k = n.dropdown) == null ? void 0 : k.call(n)])];
            }
          })];
        }
      });
    };
  }
}), pn = {
  uiv: {
    datePicker: {
      clear: "Clear",
      today: "Today",
      month: "Month",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      year: "Year",
      week1: "Mon",
      week2: "Tue",
      week3: "Wed",
      week4: "Thu",
      week5: "Fri",
      week6: "Sat",
      week7: "Sun"
    },
    timePicker: {
      am: "AM",
      pm: "PM"
    },
    modal: {
      cancel: "Cancel",
      ok: "OK"
    },
    multiSelect: {
      placeholder: "Select...",
      filterPlaceholder: "Search..."
    }
  }
};
let Qe = pn, et = function() {
  return "$t" in this ? this.$t.apply(this, arguments) : null;
};
const se = function(e, t) {
  t = t || {};
  let n;
  try {
    if (n = et.apply(this, arguments), J(n) && !t.$$locale)
      return n;
  } catch {
  }
  const l = e.split(".");
  let o = t.$$locale || Qe;
  for (let s = 0, a = l.length; s < a; s++) {
    const i = l[s];
    if (n = o[i], s === a - 1)
      return n;
    if (!n)
      return "";
    o = n;
  }
  return "";
}, mn = function(e) {
  Qe = e || Qe;
}, yn = function(e) {
  et = e || et;
}, ct = { use: mn, t: se, i18n: yn }, wt = {
  __name: "BtnGroup",
  props: {
    size: { type: String, default: void 0 },
    vertical: { type: Boolean, default: !1 },
    justified: { type: Boolean, default: !1 }
  },
  setup(e) {
    return (t, n) => (u(), h("div", {
      class: C({
        "btn-group": !e.vertical,
        "btn-group-vertical": e.vertical,
        "btn-group-justified": e.justified,
        [`btn-group-${e.size}`]: e.size
      }),
      role: "group",
      "data-toggle": "buttons"
    }, [
      V(t.$slots, "default")
    ], 2));
  }
}, St = {
  href: { type: String, default: void 0 },
  target: { type: String, default: void 0 },
  to: { type: null, default: void 0 },
  replace: { type: Boolean, default: !1 },
  append: { type: Boolean, default: !1 },
  exact: { type: Boolean, default: !1 }
}, gn = ["href", "target"], vn = ["type", "checked", "disabled"], bn = ["type", "disabled"], Cn = ["type", "disabled"], D = {
  __name: "Btn",
  props: {
    ...St,
    justified: { type: Boolean, default: !1 },
    type: { type: String, default: "default" },
    nativeType: { type: String, default: "button" },
    size: { type: String, default: void 0 },
    block: { type: Boolean, default: !1 },
    active: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    modelValue: { type: null, default: null },
    inputValue: { type: null, default: null },
    inputType: {
      type: String,
      validator(e) {
        return e === "checkbox" || e === "radio";
      },
      default: void 0
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, l = R(
      () => n.inputType === "checkbox" ? n.modelValue.indexOf(n.inputValue) >= 0 : n.modelValue === n.inputValue
    ), o = R(() => ({
      btn: !0,
      active: n.inputType ? l.value : n.active,
      disabled: n.disabled,
      "btn-block": n.block,
      [`btn-${n.type}`]: !!n.type,
      [`btn-${n.size}`]: !!n.size
    }));
    function s(i) {
      n.disabled && i instanceof Event && (i.preventDefault(), i.stopPropagation());
    }
    function a() {
      if (n.inputType === "checkbox") {
        const i = n.modelValue.slice();
        l.value ? i.splice(i.indexOf(n.inputValue), 1) : i.push(n.inputValue), t("update:modelValue", i);
      } else
        t("update:modelValue", n.inputValue);
    }
    return (i, d) => {
      const p = ve("RouterLink");
      return i.href ? (u(), h("a", {
        key: 0,
        href: i.href,
        target: i.target,
        role: "button",
        class: C($(o)),
        onClick: s
      }, [
        V(i.$slots, "default")
      ], 10, gn)) : i.to ? (u(), Y(p, {
        key: 1,
        to: i.to,
        class: C($(o)),
        event: e.disabled ? "" : "click",
        replace: i.replace,
        append: i.append,
        exact: i.exact,
        role: "button",
        onClick: s
      }, {
        default: O(() => [
          V(i.$slots, "default")
        ]),
        _: 3
      }, 8, ["to", "class", "event", "replace", "append", "exact"])) : e.inputType ? (u(), h("label", {
        key: 2,
        class: C($(o)),
        onClick: s
      }, [
        r("input", {
          autocomplete: "off",
          type: e.inputType,
          checked: $(l),
          disabled: e.disabled,
          onInput: d[0] || (d[0] = M(() => {
          }, ["stop"])),
          onChange: a
        }, null, 40, vn),
        V(i.$slots, "default")
      ], 2)) : e.justified ? (u(), Y(wt, { key: 3 }, {
        default: O(() => [
          r("button", {
            class: C($(o)),
            type: e.nativeType,
            disabled: e.disabled,
            onClick: s
          }, [
            V(i.$slots, "default")
          ], 10, bn)
        ]),
        _: 3
      })) : (u(), h("button", {
        key: 4,
        class: C($(o)),
        type: e.nativeType,
        disabled: e.disabled,
        onClick: s
      }, [
        V(i.$slots, "default")
      ], 10, Cn));
    };
  }
}, Te = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [l, o] of t)
    n[l] = o;
  return n;
}, Ie = "in", kn = {
  components: { Btn: D },
  props: {
    modelValue: { type: Boolean, default: !1 },
    title: { type: String, default: void 0 },
    size: { type: String, default: void 0 },
    backdrop: { type: Boolean, default: !0 },
    footer: { type: Boolean, default: !0 },
    header: { type: Boolean, default: !0 },
    cancelText: { type: String, default: void 0 },
    cancelType: { type: String, default: "default" },
    okText: { type: String, default: void 0 },
    okType: { type: String, default: "primary" },
    dismissBtn: { type: Boolean, default: !0 },
    transition: { type: Number, default: 150 },
    autoFocus: { type: Boolean, default: !1 },
    keyboard: { type: Boolean, default: !0 },
    beforeClose: { type: Function, default: void 0 },
    zOffset: { type: Number, default: 20 },
    appendToBody: { type: Boolean, default: !1 },
    displayStyle: { type: String, default: "block" }
  },
  emits: ["update:modelValue", "show", "hide"],
  data() {
    return {
      msg: ""
    };
  },
  computed: {
    modalSizeClass() {
      return {
        [`modal-${this.size}`]: !!this.size
      };
    }
  },
  watch: {
    modelValue(e) {
      this.$toggle(e);
    }
  },
  mounted() {
    ae(this.$refs.backdrop), P(window, w.MOUSE_DOWN, this.suppressBackgroundClose), P(window, w.KEY_UP, this.onKeyPress), this.modelValue && this.$toggle(!0);
  },
  beforeUnmount() {
    clearTimeout(this.timeoutId), ae(this.$refs.backdrop), ae(this.$el), Me() === 0 && ze(!0), _(window, w.MOUSE_DOWN, this.suppressBackgroundClose), _(window, w.MOUSE_UP, this.unsuppressBackgroundClose), _(window, w.KEY_UP, this.onKeyPress);
  },
  methods: {
    t: se,
    onKeyPress(e) {
      if (this.keyboard && this.modelValue && e.keyCode === 27) {
        const t = this.$refs.backdrop;
        let n = t.style.zIndex;
        n = n && n !== "auto" ? parseInt(n) : 0;
        const l = kt(), o = l.length;
        for (let s = 0; s < o; s++)
          if (l[s] !== t) {
            let a = l[s].style.zIndex;
            if (a = a && a !== "auto" ? parseInt(a) : 0, a > n)
              return;
          }
        this.hideModal();
      }
    },
    hideModal(e) {
      const t = he(this.beforeClose) ? this.beforeClose(e) : !0;
      Promise.resolve(t).then((n) => {
        !n || (this.msg = e, this.$emit("update:modelValue", !1));
      });
    },
    $toggle(e) {
      const t = this.$el, n = this.$refs.backdrop;
      clearTimeout(this.timeoutId), e ? this.$nextTick(() => {
        const l = Me();
        if (document.body.appendChild(n), this.appendToBody && document.body.appendChild(t), t.style.display = this.displayStyle, t.scrollTop = 0, n.offsetHeight, ze(!1), H(n, Ie), H(t, Ie), l > 0) {
          const o = parseInt(Je(t).zIndex) || 1050, s = parseInt(Je(n).zIndex) || 1040, a = l * this.zOffset;
          t.style.zIndex = `${o + a}`, n.style.zIndex = `${s + a}`;
        }
        this.timeoutId = setTimeout(() => {
          if (this.autoFocus) {
            const o = this.$el.querySelector('[data-action="auto-focus"]');
            o && (o.focus(), o.setAttribute("data-focused", "true"));
          }
          this.$emit("show"), this.timeoutId = 0;
        }, this.transition);
      }) : (Z(n, Ie), Z(t, Ie), this.timeoutId = setTimeout(() => {
        t.style.display = "none", ae(n), this.appendToBody && ae(t), Me() === 0 && ze(!0), this.$emit("hide", this.msg || "dismiss"), this.msg = "", this.timeoutId = 0, t.style.zIndex = "", n.style.zIndex = "";
      }, this.transition));
    },
    suppressBackgroundClose(e) {
      e && e.target === this.$el || (this.isCloseSuppressed = !0, P(window, "mouseup", this.unsuppressBackgroundClose));
    },
    unsuppressBackgroundClose() {
      this.isCloseSuppressed && (_(window, "mouseup", this.unsuppressBackgroundClose), setTimeout(() => {
        this.isCloseSuppressed = !1;
      }, 1));
    },
    backdropClicked() {
      this.backdrop && !this.isCloseSuppressed && this.hideModal();
    }
  }
}, Tn = { class: "modal-content" }, wn = {
  key: 0,
  class: "modal-header"
}, Sn = /* @__PURE__ */ r("span", { "aria-hidden": "true" }, "\xD7", -1), $n = [
  Sn
], En = { class: "modal-title" }, On = { class: "modal-body" }, xn = {
  key: 1,
  class: "modal-footer"
};
function Bn(e, t, n, l, o, s) {
  const a = ve("btn");
  return u(), h("div", {
    tabindex: "-1",
    role: "dialog",
    class: C(["modal", { fade: n.transition > 0 }]),
    onClick: t[3] || (t[3] = M((...i) => s.backdropClicked && s.backdropClicked(...i), ["self"]))
  }, [
    r("div", {
      ref: "dialog",
      class: C(["modal-dialog", s.modalSizeClass]),
      role: "document"
    }, [
      r("div", Tn, [
        n.header ? (u(), h("div", wn, [
          V(e.$slots, "header", {}, () => [
            n.dismissBtn ? (u(), h("button", {
              key: 0,
              type: "button",
              class: "close",
              "aria-label": "Close",
              style: { position: "relative", "z-index": "1060" },
              onClick: t[0] || (t[0] = (i) => s.hideModal())
            }, $n)) : N("", !0),
            r("h4", En, [
              V(e.$slots, "title", {}, () => [
                q(I(n.title), 1)
              ])
            ])
          ])
        ])) : N("", !0),
        r("div", On, [
          V(e.$slots, "default")
        ]),
        n.footer ? (u(), h("div", xn, [
          V(e.$slots, "footer", {}, () => [
            B(a, {
              type: n.cancelType,
              onClick: t[1] || (t[1] = (i) => s.hideModal("cancel"))
            }, {
              default: O(() => [
                r("span", null, I(n.cancelText || s.t("uiv.modal.cancel")), 1)
              ]),
              _: 1
            }, 8, ["type"]),
            B(a, {
              type: n.okType,
              "data-action": "auto-focus",
              onClick: t[2] || (t[2] = (i) => s.hideModal("ok"))
            }, {
              default: O(() => [
                r("span", null, I(n.okText || s.t("uiv.modal.ok")), 1)
              ]),
              _: 1
            }, 8, ["type"])
          ])
        ])) : N("", !0)
      ])
    ], 2),
    r("div", {
      ref: "backdrop",
      class: C(["modal-backdrop", { fade: n.transition > 0 }])
    }, null, 2)
  ], 2);
}
const $t = /* @__PURE__ */ Te(kn, [["render", Bn]]), Ye = "active", We = "in";
let In = 0;
const Vn = {
  props: {
    title: {
      type: String,
      default: "Tab Title"
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    tabClasses: {
      type: Object,
      default: () => ({})
    },
    group: { type: String, default: void 0 },
    pullRight: {
      type: Boolean,
      default: !1
    },
    hidden: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      active: null,
      transition: 150,
      uid: `tab_${++In}`,
      isMounted: !1
    };
  },
  watch: {
    active(e) {
      e ? setTimeout(() => {
        H(this.$el, Ye), this.$el.offsetHeight, H(this.$el, We);
        try {
          this.$parent.$emit("changed", this.$parent.activeIndex);
        } catch {
          throw new Error("<tab> parent must be <tabs>.");
        }
      }, this.transition) : (Z(this.$el, We), setTimeout(() => {
        Z(this.$el, Ye);
      }, this.transition));
    }
  },
  created() {
    try {
      this.$parent.tabs.push(this);
    } catch {
      throw new Error("<tab> parent must be <tabs>.");
    }
  },
  mounted() {
    this.isMounted = !0;
  },
  beforeUnmount() {
    const e = this.$parent && this.$parent.tabs;
    ot(e, this);
  },
  methods: {
    show() {
      this.$nextTick(() => {
        H(this.$el, Ye), H(this.$el, We);
      });
    }
  }
};
function Nn(e, t, n, l, o, s) {
  return u(), h("div", {
    class: C(["tab-pane", { fade: o.transition > 0 }]),
    role: "tabpanel"
  }, [
    V(e.$slots, "default"),
    o.isMounted && e.$slots.title ? (u(), Y(Ct, {
      key: 0,
      to: "#" + o.uid.toString()
    }, [
      V(e.$slots, "title")
    ], 8, ["to"])) : N("", !0)
  ], 2);
}
const Mn = /* @__PURE__ */ Te(Vn, [["render", Nn]]), _n = {
  components: { Dropdown: Ue },
  props: {
    modelValue: {
      type: Number,
      validator: (e) => e >= 0,
      default: void 0
    },
    transition: {
      type: Number,
      default: 150
    },
    justified: Boolean,
    pills: Boolean,
    stacked: Boolean,
    customNavClass: { type: null, default: void 0 },
    customContentClass: { type: null, default: void 0 },
    beforeChange: { type: Function, default: void 0 }
  },
  emits: ["update:modelValue", "change", "changed"],
  data() {
    return {
      tabs: [],
      activeIndex: 0
    };
  },
  computed: {
    navClasses() {
      const e = {
        nav: !0,
        "nav-justified": this.justified,
        "nav-tabs": !this.pills,
        "nav-pills": this.pills,
        "nav-stacked": this.stacked && this.pills
      }, t = this.customNavClass;
      return J(t) ? ue(t) ? {
        ...e,
        [t]: !0
      } : {
        ...e,
        ...t
      } : e;
    },
    contentClasses() {
      const e = {
        "tab-content": !0
      }, t = this.customContentClass;
      return J(t) ? ue(t) ? { ...e, [t]: !0 } : { ...e, ...t } : e;
    },
    groupedTabs() {
      let e = [];
      const t = {};
      return this.tabs.forEach((n) => {
        n.group ? (Fe(t, n.group) ? e[t[n.group]].tabs.push(n) : (e.push({
          tabs: [n],
          group: n.group
        }), t[n.group] = e.length - 1), n.active && (e[t[n.group]].active = !0), n.pullRight && (e[t[n.group]].pullRight = !0)) : e.push(n);
      }), e = e.map((n) => (Array.isArray(n.tabs) && (n.hidden = n.tabs.filter((l) => l.hidden).length === n.tabs.length), n)), e;
    }
  },
  watch: {
    modelValue(e) {
      Se(e) && (this.activeIndex = e, this.selectCurrent());
    },
    tabs(e) {
      e.forEach((t, n) => {
        t.transition = this.transition, n === this.activeIndex && t.show();
      }), this.selectCurrent();
    }
  },
  mounted() {
    this.selectCurrent();
  },
  methods: {
    getTabClasses(e, t = !1) {
      return { ...{
        active: e.active,
        disabled: e.disabled,
        "pull-right": e.pullRight && !t
      }, ...e.tabClasses };
    },
    selectCurrent() {
      let e = !1;
      this.tabs.forEach((t, n) => {
        n === this.activeIndex ? (e = !t.active, t.active = !0) : t.active = !1;
      }), e && this.$emit("change", this.activeIndex);
    },
    selectValidate(e) {
      he(this.beforeChange) ? this.beforeChange(this.activeIndex, e, (t) => {
        J(t) || this.$select(e);
      }) : this.$select(e);
    },
    select(e) {
      !this.tabs[e].disabled && e !== this.activeIndex && this.selectValidate(e);
    },
    $select(e) {
      Se(this.modelValue) ? this.$emit("update:modelValue", e) : (this.activeIndex = e, this.selectCurrent());
    }
  }
}, Ln = /* @__PURE__ */ r("span", { class: "caret" }, null, -1), Pn = ["onClick"], Dn = ["id", "onClick"], Rn = ["onClick", "textContent"], An = {
  key: 0,
  class: "pull-right"
};
function Fn(e, t, n, l, o, s) {
  const a = ve("dropdown");
  return u(), h("section", null, [
    r("ul", {
      class: C(s.navClasses),
      role: "tablist"
    }, [
      (u(!0), h(F, null, j(s.groupedTabs, (i, d) => (u(), h(F, { key: d }, [
        i.tabs ? te((u(), Y(a, {
          key: 0,
          role: "presentation",
          tag: "li",
          class: C(s.getTabClasses(i))
        }, {
          dropdown: O(() => [
            (u(!0), h(F, null, j(i.tabs, (p, f) => te((u(), h("li", {
              key: `${d}_${f}`,
              class: C(s.getTabClasses(p, !0))
            }, [
              r("a", {
                href: "#",
                onClick: M((m) => s.select(o.tabs.indexOf(p)), ["prevent"])
              }, I(p.title), 9, Pn)
            ], 2)), [
              [ye, !p.hidden]
            ])), 128))
          ]),
          default: O(() => [
            r("a", {
              class: "dropdown-toggle",
              role: "tab",
              href: "#",
              onClick: t[0] || (t[0] = M(() => {
              }, ["prevent"]))
            }, [
              q(I(i.group) + " ", 1),
              Ln
            ])
          ]),
          _: 2
        }, 1032, ["class"])), [
          [ye, !i.hidden]
        ]) : te((u(), h("li", {
          key: 1,
          role: "presentation",
          class: C(s.getTabClasses(i))
        }, [
          i.$slots.title ? (u(), h("a", {
            key: 0,
            id: i.uid,
            role: "tab",
            href: "#",
            onClick: M((p) => s.select(o.tabs.indexOf(i)), ["prevent"])
          }, null, 8, Dn)) : (u(), h("a", {
            key: 1,
            role: "tab",
            href: "#",
            onClick: M((p) => s.select(o.tabs.indexOf(i)), ["prevent"]),
            textContent: I(i.title)
          }, null, 8, Rn))
        ], 2)), [
          [ye, !i.hidden]
        ])
      ], 64))), 128)),
      !n.justified && e.$slots["nav-right"] ? (u(), h("li", An, [
        V(e.$slots, "nav-right")
      ])) : N("", !0)
    ], 2),
    r("div", {
      class: C(s.contentClasses)
    }, [
      V(e.$slots, "default")
    ], 2)
  ]);
}
const Un = /* @__PURE__ */ Te(_n, [["render", Fn]]);
function ke(e, t) {
  let n = e.toString();
  for (let l = t - n.length; l > 0; l--)
    n = "0" + n;
  return n;
}
const Hn = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function zn(e, t) {
  return new Date(t, e + 1, 0).getDate();
}
function Kn(e, t) {
  try {
    const n = e.getFullYear(), l = e.getMonth() + 1, o = e.getDate(), s = Hn[l - 1];
    return t.replace(/yyyy/g, n).replace(/MMMM/g, s).replace(/MMM/g, s.substring(0, 3)).replace(/MM/g, ke(l, 2)).replace(/dd/g, ke(o, 2)).replace(/yy/g, n).replace(/M(?!a)/g, l).replace(/d/g, o);
  } catch {
    return "";
  }
}
function ht(e) {
  return new Date(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    e.getUTCDate(),
    e.getUTCHours(),
    e.getUTCMinutes(),
    e.getUTCSeconds()
  );
}
function Yn(e) {
  const t = new Date(Date.UTC(e.year, e.month, e.date));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  const n = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil(((t - n) / 864e5 + 1) / 7);
}
const Wn = {
  role: "grid",
  style: { width: "100%" }
}, qn = ["colspan"], Gn = { align: "center" }, jn = { key: 0 }, Zn = { class: "uiv-datepicker-week" }, Jn = {
  key: 0,
  class: "text-center",
  style: { "border-right": "1px solid #eee" }
}, Xn = { class: "text-muted" }, Qn = {
  __name: "DateView",
  props: {
    month: { type: Number, default: void 0 },
    year: { type: Number, default: void 0 },
    date: { type: Date, default: void 0 },
    today: { type: Date, default: void 0 },
    limit: { type: Object, default: void 0 },
    weekStartsWith: { type: Number, default: void 0 },
    iconControlLeft: { type: String, default: void 0 },
    iconControlRight: { type: String, default: void 0 },
    dateClass: { type: Function, default: void 0 },
    yearMonthFormatter: { type: Function, default: void 0 },
    weekNumbers: Boolean
  },
  emits: [
    "date-change",
    "year-change",
    "month-change",
    "view-change"
  ],
  setup(e, { emit: t }) {
    const n = e, l = R(() => {
      const c = [];
      let g = n.weekStartsWith;
      for (; c.length < 7; )
        c.push(g++), g > 6 && (g = 0);
      return c;
    }), o = R(() => n.yearMonthFormatter ? n.yearMonthFormatter(n.year, n.month) : J(n.month) ? `${n.year} ${se(`uiv.datePicker.month${n.month + 1}`)}` : n.year), s = R(() => {
      var x, b;
      const c = [], g = new Date(n.year, n.month, 1), k = new Date(n.year, n.month, 0).getDate(), y = g.getDay(), v = zn(n.month, n.year);
      let S = 0;
      n.weekStartsWith > y ? S = 7 - n.weekStartsWith : S = 0 - n.weekStartsWith;
      for (let E = 0; E < 6; E++) {
        c.push([]);
        for (let z = 0 - S; z < 7 - S; z++) {
          const U = E * 7 + z, A = { year: n.year, disabled: !1 };
          U < y ? (A.date = k - y + U + 1, n.month > 0 ? A.month = n.month - 1 : (A.month = 11, A.year--)) : U < y + v ? (A.date = U - y + 1, A.month = n.month) : (A.date = U - y - v + 1, n.month < 11 ? A.month = n.month + 1 : (A.month = 0, A.year++));
          const oe = new Date(A.year, A.month, A.date);
          let pe = !0, T = !0;
          (x = n.limit) != null && x.from && (pe = oe >= n.limit.from), (b = n.limit) != null && b.to && (T = oe < n.limit.to), A.disabled = !pe || !T, he(n.dateClass) ? A.classes = n.dateClass(oe, {
            currentMonth: n.month,
            currentYear: n.year
          }) : A.classes = "", c[E].push(A);
        }
      }
      return c;
    });
    function a(c) {
      return se(`uiv.datePicker.week${c}`);
    }
    function i(c) {
      return n.date && c.date === n.date.getDate() && c.month === n.date.getMonth() && c.year === n.date.getFullYear() ? "primary" : c.date === n.today.getDate() && c.month === n.today.getMonth() && c.year === n.today.getFullYear() ? "info" : "default";
    }
    function d(c) {
      t("date-change", c);
    }
    function p() {
      let c = n.month, g = n.year;
      n.month > 0 ? c-- : (c = 11, g--, t("year-change", g)), t("month-change", c);
    }
    function f() {
      let c = n.month, g = n.year;
      n.month < 11 ? c++ : (c = 0, g++, t("year-change", g)), t("month-change", c);
    }
    function m() {
      t("view-change", "m");
    }
    return (c, g) => (u(), h("table", Wn, [
      r("thead", null, [
        r("tr", null, [
          r("td", null, [
            B(D, {
              class: "uiv-datepicker-pager-prev",
              block: "",
              size: "sm",
              style: { border: "none" },
              onClick: p
            }, {
              default: O(() => [
                r("i", {
                  class: C(e.iconControlLeft)
                }, null, 2)
              ]),
              _: 1
            })
          ]),
          r("td", {
            colspan: e.weekNumbers ? 6 : 5
          }, [
            B(D, {
              class: "uiv-datepicker-title",
              block: "",
              size: "sm",
              style: { border: "none" },
              onClick: m
            }, {
              default: O(() => [
                r("b", null, I($(o)), 1)
              ]),
              _: 1
            })
          ], 8, qn),
          r("td", null, [
            B(D, {
              class: "uiv-datepicker-pager-next",
              block: "",
              size: "sm",
              style: { border: "none" },
              onClick: f
            }, {
              default: O(() => [
                r("i", {
                  class: C(e.iconControlRight)
                }, null, 2)
              ]),
              _: 1
            })
          ])
        ]),
        r("tr", Gn, [
          e.weekNumbers ? (u(), h("td", jn)) : N("", !0),
          (u(!0), h(F, null, j($(l), (k, y) => (u(), h("td", {
            key: y,
            width: "14.2857142857%"
          }, [
            r("small", Zn, I(a(k === 0 ? 7 : k)), 1)
          ]))), 128))
        ])
      ]),
      r("tbody", null, [
        (u(!0), h(F, null, j($(s), (k, y) => (u(), h("tr", { key: y }, [
          e.weekNumbers ? (u(), h("td", Jn, [
            r("small", Xn, I($(Yn)(k[e.weekStartsWith])), 1)
          ])) : N("", !0),
          (u(!0), h(F, null, j(k, (v, S) => (u(), h("td", {
            key: `${y}_${S}`
          }, [
            B(D, {
              block: "",
              size: "sm",
              style: { border: "none" },
              "data-action": "select",
              class: C(v.classes),
              type: i(v),
              disabled: v.disabled,
              onClick: (x) => d(v)
            }, {
              default: O(() => [
                r("span", {
                  "data-action": "select",
                  class: C({ "text-muted": e.month !== v.month })
                }, I(v.date), 3)
              ]),
              _: 2
            }, 1032, ["class", "type", "disabled", "onClick"])
          ]))), 128))
        ]))), 128))
      ])
    ]));
  }
}, el = {
  role: "grid",
  style: { width: "100%" }
}, tl = { colspan: "4" }, nl = {
  __name: "MonthView",
  props: {
    month: { type: Number, default: void 0 },
    year: { type: Number, default: void 0 },
    iconControlLeft: { type: String, default: void 0 },
    iconControlRight: { type: String, default: void 0 }
  },
  emits: ["year-change", "month-change", "view-change"],
  setup(e, { emit: t }) {
    const n = e, l = Re([]);
    de(() => {
      for (let p = 0; p < 4; p++) {
        l.push([]);
        for (let f = 0; f < 3; f++)
          l[p].push(p * 3 + f + 1);
      }
    });
    function o(p) {
      return se(`uiv.datePicker.month${p}`);
    }
    function s(p) {
      return p === n.month ? "primary" : "default";
    }
    function a() {
      t("year-change", n.year - 1);
    }
    function i() {
      t("year-change", n.year + 1);
    }
    function d(p) {
      J(p) ? (t("month-change", p), t("view-change", "d")) : t("view-change", "y");
    }
    return (p, f) => (u(), h("table", el, [
      r("thead", null, [
        r("tr", null, [
          r("td", null, [
            B(D, {
              class: "uiv-datepicker-pager-prev",
              block: "",
              size: "sm",
              style: { border: "none" },
              onClick: a
            }, {
              default: O(() => [
                r("i", {
                  class: C(e.iconControlLeft)
                }, null, 2)
              ]),
              _: 1
            })
          ]),
          r("td", tl, [
            B(D, {
              class: "uiv-datepicker-title",
              block: "",
              size: "sm",
              style: { border: "none" },
              onClick: f[0] || (f[0] = (m) => d())
            }, {
              default: O(() => [
                r("b", null, I(e.year), 1)
              ]),
              _: 1
            })
          ]),
          r("td", null, [
            B(D, {
              class: "uiv-datepicker-pager-next",
              block: "",
              size: "sm",
              style: { border: "none" },
              onClick: i
            }, {
              default: O(() => [
                r("i", {
                  class: C(e.iconControlRight)
                }, null, 2)
              ]),
              _: 1
            })
          ])
        ])
      ]),
      r("tbody", null, [
        (u(!0), h(F, null, j(l, (m, c) => (u(), h("tr", { key: c }, [
          (u(!0), h(F, null, j(m, (g, k) => (u(), h("td", {
            key: `${c}_${k}`,
            colspan: "2",
            width: "33.333333%"
          }, [
            B(D, {
              block: "",
              size: "sm",
              style: { border: "none" },
              type: s(c * 3 + k),
              onClick: (y) => d(c * 3 + k)
            }, {
              default: O(() => [
                r("span", null, I(o(g)), 1)
              ]),
              _: 2
            }, 1032, ["type", "onClick"])
          ]))), 128))
        ]))), 128))
      ])
    ]));
  }
}, ll = {
  role: "grid",
  style: { width: "100%" }
}, sl = { colspan: "3" }, ol = {
  __name: "YearView",
  props: {
    year: { type: Number, default: void 0 },
    iconControlLeft: { type: String, default: void 0 },
    iconControlRight: { type: String, default: void 0 }
  },
  emits: ["year-change", "view-change"],
  setup(e, { emit: t }) {
    const n = e;
    function l(p) {
      return p === n.year ? "primary" : "default";
    }
    function o() {
      t("year-change", n.year - 20);
    }
    function s() {
      t("year-change", n.year + 20);
    }
    function a(p) {
      t("year-change", p), t("view-change", "m");
    }
    const i = R(() => {
      const p = [], f = n.year - n.year % 20;
      for (let m = 0; m < 4; m++) {
        p.push([]);
        for (let c = 0; c < 5; c++)
          p[m].push(f + m * 5 + c);
      }
      return p;
    }), d = R(() => {
      const p = n.year - n.year % 20;
      return `${p} ~ ${p + 19}`;
    });
    return (p, f) => (u(), h("table", ll, [
      r("thead", null, [
        r("tr", null, [
          r("td", null, [
            B(D, {
              class: "uiv-datepicker-pager-prev",
              block: "",
              size: "sm",
              style: { border: "none" },
              onClick: o
            }, {
              default: O(() => [
                r("i", {
                  class: C(e.iconControlLeft)
                }, null, 2)
              ]),
              _: 1
            })
          ]),
          r("td", sl, [
            B(D, {
              class: "uiv-datepicker-title",
              block: "",
              size: "sm",
              style: { border: "none" }
            }, {
              default: O(() => [
                r("b", null, I($(d)), 1)
              ]),
              _: 1
            })
          ]),
          r("td", null, [
            B(D, {
              class: "uiv-datepicker-pager-next",
              block: "",
              size: "sm",
              style: { border: "none" },
              onClick: s
            }, {
              default: O(() => [
                r("i", {
                  class: C(e.iconControlRight)
                }, null, 2)
              ]),
              _: 1
            })
          ])
        ])
      ]),
      r("tbody", null, [
        (u(!0), h(F, null, j($(i), (m, c) => (u(), h("tr", { key: c }, [
          (u(!0), h(F, null, j(m, (g, k) => (u(), h("td", {
            key: `${c}_${k}`,
            width: "20%"
          }, [
            B(D, {
              block: "",
              size: "sm",
              style: { border: "none" },
              type: l(g),
              onClick: (y) => a(g)
            }, {
              default: O(() => [
                r("span", null, I(g), 1)
              ]),
              _: 2
            }, 1032, ["type", "onClick"])
          ]))), 128))
        ]))), 128))
      ])
    ]));
  }
}, il = { key: 0 }, al = /* @__PURE__ */ r("br", null, null, -1), rl = { class: "text-center" }, ul = {
  __name: "DatePicker",
  props: {
    modelValue: { type: null, required: !0 },
    width: { type: Number, default: 270 },
    todayBtn: { type: Boolean, default: !0 },
    clearBtn: { type: Boolean, default: !0 },
    closeOnSelected: { type: Boolean, default: !0 },
    limitFrom: { type: null, default: void 0 },
    limitTo: { type: null, default: void 0 },
    format: { type: String, default: "yyyy-MM-dd" },
    initialView: { type: String, default: "d" },
    dateParser: { type: Function, default: Date.parse },
    dateClass: { type: Function, default: void 0 },
    yearMonthFormatter: { type: Function, default: void 0 },
    weekStartsWith: {
      type: Number,
      default: 0,
      validator(e) {
        return e >= 0 && e <= 6;
      }
    },
    weekNumbers: Boolean,
    iconControlLeft: {
      type: String,
      default: "glyphicon glyphicon-chevron-left"
    },
    iconControlRight: {
      type: String,
      default: "glyphicon glyphicon-chevron-right"
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e;
    L(!1);
    const l = L(new Date()), o = L(0), s = L(0), a = L("d"), i = R(() => {
      const b = n.dateParser(n.modelValue);
      if (isNaN(b))
        return null;
      {
        let E = new Date(b);
        return E.getHours() !== 0 && (E = new Date(b + E.getTimezoneOffset() * 60 * 1e3)), E;
      }
    }), d = R(() => ({
      width: n.width + "px"
    })), p = R(() => ({
      "uiv-datepicker": !0,
      "uiv-datepicker-date": a.value === "d",
      "uiv-datepicker-month": a.value === "m",
      "uiv-datepicker-year": a.value === "y"
    })), f = R(() => {
      const b = {};
      if (n.limitFrom) {
        let E = n.dateParser(n.limitFrom);
        isNaN(E) || (E = ht(new Date(E)), E.setHours(0, 0, 0, 0), b.from = E);
      }
      if (n.limitTo) {
        let E = n.dateParser(n.limitTo);
        isNaN(E) || (E = ht(new Date(E)), E.setHours(0, 0, 0, 0), b.to = E);
      }
      return b;
    });
    ie(
      () => n.modelValue,
      (b, E) => {
        m(b, E);
      }
    ), de(() => {
      n.modelValue ? m(n.modelValue) : (o.value = l.value.getMonth(), s.value = l.value.getFullYear(), a.value = n.initialView);
    });
    function m(b, E) {
      const z = n.dateParser(b);
      if (!isNaN(z)) {
        let U = new Date(z);
        U.getHours() !== 0 && (U = new Date(z + U.getTimezoneOffset() * 60 * 1e3)), f.value && (f.value.from && U < f.value.from || f.value.to && U >= f.value.to) ? t("update:modelValue", E || "") : (o.value = U.getMonth(), s.value = U.getFullYear());
      }
    }
    function c(b) {
      o.value = b;
    }
    function g(b) {
      s.value = b, o.value = void 0;
    }
    function k(b) {
      if (b && Se(b.date) && Se(b.month) && Se(b.year)) {
        const E = new Date(b.year, b.month, b.date);
        t(
          "update:modelValue",
          n.format ? Kn(E, n.format) : E
        ), o.value = b.month, s.value = b.year;
      } else
        t("update:modelValue", "");
    }
    function y(b) {
      a.value = b;
    }
    function v() {
      a.value = "d", k({
        date: l.value.getDate(),
        month: l.value.getMonth(),
        year: l.value.getFullYear()
      });
    }
    function S() {
      o.value = l.value.getMonth(), s.value = l.value.getFullYear(), a.value = n.initialView, k();
    }
    function x(b) {
      (b.target.getAttribute("data-action") !== "select" || !n.closeOnSelected) && b.stopPropagation();
    }
    return (b, E) => (u(), h("div", {
      class: C($(p)),
      style: ge($(d)),
      "data-role": "date-picker",
      onClick: x
    }, [
      te(B(Qn, {
        month: o.value,
        year: s.value,
        date: $(i),
        today: l.value,
        limit: $(f),
        "week-starts-with": e.weekStartsWith,
        "icon-control-left": e.iconControlLeft,
        "icon-control-right": e.iconControlRight,
        "date-class": e.dateClass,
        "year-month-formatter": e.yearMonthFormatter,
        "week-numbers": e.weekNumbers,
        onMonthChange: c,
        onYearChange: g,
        onDateChange: k,
        onViewChange: y
      }, null, 8, ["month", "year", "date", "today", "limit", "week-starts-with", "icon-control-left", "icon-control-right", "date-class", "year-month-formatter", "week-numbers"]), [
        [ye, a.value === "d"]
      ]),
      te(B(nl, {
        month: o.value,
        year: s.value,
        "icon-control-left": e.iconControlLeft,
        "icon-control-right": e.iconControlRight,
        onMonthChange: c,
        onYearChange: g,
        onViewChange: y
      }, null, 8, ["month", "year", "icon-control-left", "icon-control-right"]), [
        [ye, a.value === "m"]
      ]),
      te(B(ol, {
        year: s.value,
        "icon-control-left": e.iconControlLeft,
        "icon-control-right": e.iconControlRight,
        onYearChange: g,
        onViewChange: y
      }, null, 8, ["year", "icon-control-left", "icon-control-right"]), [
        [ye, a.value === "y"]
      ]),
      e.todayBtn || e.clearBtn ? (u(), h("div", il, [
        al,
        r("div", rl, [
          e.todayBtn ? (u(), Y(D, {
            key: 0,
            "data-action": "select",
            "data-type": "today",
            type: "info",
            size: "sm",
            onClick: v
          }, {
            default: O(() => [
              q(I($(se)("uiv.datePicker.today")), 1)
            ]),
            _: 1
          })) : N("", !0),
          e.clearBtn ? (u(), Y(D, {
            key: 1,
            "data-action": "select",
            "data-type": "clear",
            size: "sm",
            onClick: S
          }, {
            default: O(() => [
              q(I($(se)("uiv.datePicker.clear")), 1)
            ]),
            _: 1
          })) : N("", !0)
        ])
      ])) : N("", !0)
    ], 6));
  }
}, De = "_uiv_scroll_handler", Et = [w.RESIZE, w.SCROLL], Ot = (e, t) => {
  const n = t.value;
  !he(n) || (xt(e), e[De] = n, Et.forEach((l) => {
    P(window, l, e[De]);
  }));
}, xt = (e) => {
  Et.forEach((t) => {
    _(window, t, e[De]);
  }), delete e[De];
}, dl = (e, t) => {
  t.value !== t.oldValue && Ot(e, t);
}, cl = { mounted: Ot, unmounted: xt, updated: dl }, hl = {
  __name: "Affix",
  props: {
    offset: { type: Number, default: 0 }
  },
  emits: ["affix", "affixed", "unfix", "unfixed"],
  setup(e, { emit: t }) {
    const n = e, l = L(null), o = L(!1), s = R(() => ({ affix: o.value })), a = R(() => ({
      top: o.value ? n.offset + "px" : null
    }));
    function i() {
      var k, y, v;
      if (!(((k = l.value) == null ? void 0 : k.offsetWidth) || ((y = l.value) == null ? void 0 : y.offsetHeight) || ((v = l.value) == null ? void 0 : v.getClientRects().length)))
        return;
      const d = {}, p = {}, f = l.value.getBoundingClientRect(), m = document.body;
      ["Top", "Left"].forEach((S) => {
        const x = S.toLowerCase();
        d[x] = window["page" + (S === "Top" ? "Y" : "X") + "Offset"], p[x] = d[x] + f[x] - (l.value["client" + S] || m["client" + S] || 0);
      });
      const g = d.top > p.top - n.offset;
      o.value !== g && (o.value = g, t(o.value ? "affix" : "unfix"), Le(() => {
        t(o.value ? "affixed" : "unfixed");
      }));
    }
    return (d, p) => (u(), h("div", {
      ref_key: "el",
      ref: l,
      class: "hidden-print"
    }, [
      te((u(), h("div", {
        class: C($(s)),
        style: ge($(a))
      }, [
        V(d.$slots, "default")
      ], 6)), [
        [$(cl), i]
      ])
    ], 512));
  }
}, fl = /* @__PURE__ */ r("span", { "aria-hidden": "true" }, "\xD7", -1), pl = [
  fl
], Bt = {
  __name: "Alert",
  props: {
    dismissible: { type: Boolean, default: !1 },
    duration: { type: Number, default: 0 },
    type: { type: String, default: "info" }
  },
  emits: ["dismissed"],
  setup(e, { emit: t }) {
    const n = e;
    let l = 0;
    const o = R(() => ({
      alert: !0,
      [`alert-${n.type}`]: !!n.type,
      "alert-dismissible": n.dismissible
    }));
    function s() {
      clearTimeout(l), t("dismissed");
    }
    return de(() => {
      n.duration > 0 && (l = setTimeout(s, n.duration));
    }), Wt(() => {
      clearTimeout(l);
    }), (a, i) => (u(), h("div", {
      role: "alert",
      class: C($(o))
    }, [
      e.dismissible ? (u(), h("button", {
        key: 0,
        type: "button",
        class: "close",
        "aria-label": "Close",
        onClick: s
      }, pl)) : N("", !0),
      V(a.$slots, "default")
    ], 2));
  }
}, ml = /* @__PURE__ */ r("span", { "aria-hidden": "true" }, "\xAB", -1), yl = [
  ml
], gl = /* @__PURE__ */ r("span", { "aria-hidden": "true" }, "\u2039", -1), vl = [
  gl
], bl = /* @__PURE__ */ r("span", { "aria-hidden": "true" }, "\u2026", -1), Cl = [
  bl
], kl = ["onClick"], Tl = /* @__PURE__ */ r("span", { "aria-hidden": "true" }, "\u2026", -1), wl = [
  Tl
], Sl = /* @__PURE__ */ r("span", { "aria-hidden": "true" }, "\u203A", -1), $l = [
  Sl
], El = /* @__PURE__ */ r("span", { "aria-hidden": "true" }, "\xBB", -1), Ol = [
  El
], xl = {
  __name: "Pagination",
  props: {
    modelValue: { type: Number, required: !0, validator: (e) => e >= 1 },
    boundaryLinks: { type: Boolean, default: !1 },
    directionLinks: { type: Boolean, default: !0 },
    size: { type: String, default: void 0 },
    align: { type: String, default: void 0 },
    totalPage: { type: Number, required: !0, validator: (e) => e >= 0 },
    maxSize: { type: Number, default: 5, validator: (e) => e >= 0 },
    disabled: Boolean
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: t }) {
    const n = e, l = L(0), o = R(() => ({
      [`text-${n.align}`]: !!n.align
    })), s = R(() => ({
      [`pagination-${n.size}`]: !!n.size
    })), a = R(
      () => sn(n.totalPage).slice(
        l.value,
        l.value + n.maxSize
      )
    );
    ie(
      () => [n.modelValue, n.maxSize, n.totalPage],
      () => {
        i();
      },
      {
        immediate: !0
      }
    );
    function i() {
      const f = n.modelValue, m = n.maxSize, c = l.value, g = c + m;
      if (f > g) {
        const k = n.totalPage - m;
        f > k ? l.value = k : l.value = f - 1;
      } else
        f < c + 1 && (f > m ? l.value = f - m : l.value = 0);
    }
    function d(f) {
      !n.disabled && f > 0 && f <= n.totalPage && f !== n.modelValue && (t("update:modelValue", f), t("change", f));
    }
    function p(f) {
      if (n.disabled)
        return;
      const m = n.maxSize, c = l.value, g = n.totalPage - m, k = f ? c - m : c + m;
      k < 0 ? l.value = 0 : k > g ? l.value = g : l.value = k;
    }
    return (f, m) => (u(), h("nav", {
      "aria-label": "Page navigation",
      class: C($(o))
    }, [
      r("ul", {
        class: C(["pagination", $(s)])
      }, [
        e.boundaryLinks ? (u(), h("li", {
          key: 0,
          class: C({ disabled: e.modelValue <= 1 || e.disabled })
        }, [
          r("a", {
            href: "#",
            role: "button",
            "aria-label": "First",
            onClick: m[0] || (m[0] = M((c) => d(1), ["prevent"]))
          }, yl)
        ], 2)) : N("", !0),
        e.directionLinks ? (u(), h("li", {
          key: 1,
          class: C({ disabled: e.modelValue <= 1 || e.disabled })
        }, [
          r("a", {
            href: "#",
            role: "button",
            "aria-label": "Previous",
            onClick: m[1] || (m[1] = M((c) => d(e.modelValue - 1), ["prevent"]))
          }, vl)
        ], 2)) : N("", !0),
        l.value > 0 ? (u(), h("li", {
          key: 2,
          class: C({ disabled: e.disabled })
        }, [
          r("a", {
            href: "#",
            role: "button",
            "aria-label": "Previous group",
            onClick: m[2] || (m[2] = M((c) => p(1), ["prevent"]))
          }, Cl)
        ], 2)) : N("", !0),
        (u(!0), h(F, null, j($(a), (c) => (u(), h("li", {
          key: c,
          class: C({ active: e.modelValue === c + 1, disabled: e.disabled })
        }, [
          r("a", {
            href: "#",
            role: "button",
            onClick: M((g) => d(c + 1), ["prevent"])
          }, I(c + 1), 9, kl)
        ], 2))), 128)),
        l.value < e.totalPage - e.maxSize ? (u(), h("li", {
          key: 3,
          class: C({ disabled: e.disabled })
        }, [
          r("a", {
            href: "#",
            role: "button",
            "aria-label": "Next group",
            onClick: m[3] || (m[3] = M((c) => p(0), ["prevent"]))
          }, wl)
        ], 2)) : N("", !0),
        e.directionLinks ? (u(), h("li", {
          key: 4,
          class: C({ disabled: e.modelValue >= e.totalPage || e.disabled })
        }, [
          r("a", {
            href: "#",
            role: "button",
            "aria-label": "Next",
            onClick: m[4] || (m[4] = M((c) => d(e.modelValue + 1), ["prevent"]))
          }, $l)
        ], 2)) : N("", !0),
        e.boundaryLinks ? (u(), h("li", {
          key: 5,
          class: C({ disabled: e.modelValue >= e.totalPage || e.disabled })
        }, [
          r("a", {
            href: "#",
            role: "button",
            "aria-label": "Last",
            onClick: m[5] || (m[5] = M((c) => d(e.totalPage), ["prevent"]))
          }, Ol)
        ], 2)) : N("", !0)
      ], 2)
    ], 2));
  }
}, qe = "in", It = {
  props: {
    modelValue: {
      type: Boolean,
      default: !1
    },
    tag: {
      type: String,
      default: "span"
    },
    placement: {
      type: String,
      default: G.TOP
    },
    autoPlacement: {
      type: Boolean,
      default: !0
    },
    appendTo: {
      type: null,
      default: "body"
    },
    positionBy: {
      type: null,
      default: null
    },
    transition: {
      type: Number,
      default: 150
    },
    hideDelay: {
      type: Number,
      default: 0
    },
    showDelay: {
      type: Number,
      default: 0
    },
    enable: {
      type: Boolean,
      default: !0
    },
    enterable: {
      type: Boolean,
      default: !0
    },
    target: null,
    viewport: null,
    customClass: String
  },
  data() {
    return {
      triggerEl: null,
      hideTimeoutId: 0,
      showTimeoutId: 0,
      transitionTimeoutId: 0,
      autoTimeoutId: 0
    };
  },
  watch: {
    modelValue(e) {
      e ? this.show() : this.hide();
    },
    trigger() {
      this.clearListeners(), this.initListeners();
    },
    target(e) {
      this.clearListeners(), this.initTriggerElByTarget(e), this.initListeners();
    },
    allContent(e) {
      this.isNotEmpty() ? this.$nextTick(() => {
        this.isShown() && this.resetPosition();
      }) : this.hide();
    },
    enable(e) {
      e || this.hide();
    }
  },
  mounted() {
    ae(this.$refs.popup), this.$nextTick(() => {
      this.initTriggerElByTarget(this.target), this.initListeners(), this.modelValue && this.show();
    });
  },
  beforeUnmount() {
    this.clearListeners(), ae(this.$refs.popup);
  },
  methods: {
    initTriggerElByTarget(e) {
      if (e)
        this.triggerEl = Pe(e);
      else {
        const t = this.$el.querySelector('[data-role="trigger"]');
        if (t)
          this.triggerEl = t;
        else {
          const n = this.$el.querySelector("*");
          this.triggerEl = n === this.$refs.popup ? null : n;
        }
      }
    },
    initListeners() {
      this.triggerEl && (this.trigger === ee.HOVER ? (P(this.triggerEl, w.MOUSE_ENTER, this.show), P(this.triggerEl, w.MOUSE_LEAVE, this.hide)) : this.trigger === ee.FOCUS ? (P(this.triggerEl, w.FOCUS, this.show), P(this.triggerEl, w.BLUR, this.hide)) : this.trigger === ee.HOVER_FOCUS ? (P(this.triggerEl, w.MOUSE_ENTER, this.handleAuto), P(this.triggerEl, w.MOUSE_LEAVE, this.handleAuto), P(this.triggerEl, w.FOCUS, this.handleAuto), P(this.triggerEl, w.BLUR, this.handleAuto)) : (this.trigger === ee.CLICK || this.trigger === ee.OUTSIDE_CLICK) && P(this.triggerEl, w.CLICK, this.toggle)), P(window, w.CLICK, this.windowClicked);
    },
    clearListeners() {
      this.triggerEl && (_(this.triggerEl, w.FOCUS, this.show), _(this.triggerEl, w.BLUR, this.hide), _(this.triggerEl, w.MOUSE_ENTER, this.show), _(this.triggerEl, w.MOUSE_LEAVE, this.hide), _(this.triggerEl, w.CLICK, this.toggle), _(this.triggerEl, w.MOUSE_ENTER, this.handleAuto), _(this.triggerEl, w.MOUSE_LEAVE, this.handleAuto), _(this.triggerEl, w.FOCUS, this.handleAuto), _(this.triggerEl, w.BLUR, this.handleAuto)), _(window, w.CLICK, this.windowClicked), this.clearTimeouts();
    },
    clearTimeouts() {
      this.hideTimeoutId && (clearTimeout(this.hideTimeoutId), this.hideTimeoutId = 0), this.showTimeoutId && (clearTimeout(this.showTimeoutId), this.showTimeoutId = 0), this.transitionTimeoutId && (clearTimeout(this.transitionTimeoutId), this.transitionTimeoutId = 0), this.autoTimeoutId && (clearTimeout(this.autoTimeoutId), this.autoTimeoutId = 0);
    },
    resetPosition() {
      const e = this.$refs.popup;
      e && (cn(
        e,
        this.triggerEl,
        this.placement,
        this.autoPlacement,
        this.appendTo,
        this.positionBy,
        this.viewport
      ), e.offsetHeight);
    },
    hideOnLeave() {
      (this.trigger === ee.HOVER || this.trigger === ee.HOVER_FOCUS && !this.triggerEl.matches(":focus")) && this.$hide();
    },
    toggle() {
      this.isShown() ? this.hide() : this.show();
    },
    show() {
      if (this.enable && this.triggerEl && this.isNotEmpty() && !this.isShown()) {
        const e = this.hideTimeoutId > 0;
        e && (clearTimeout(this.hideTimeoutId), this.hideTimeoutId = 0), this.transitionTimeoutId > 0 && (clearTimeout(this.transitionTimeoutId), this.transitionTimeoutId = 0), clearTimeout(this.showTimeoutId), this.showTimeoutId = setTimeout(() => {
          this.showTimeoutId = 0;
          const t = this.$refs.popup;
          if (t) {
            const n = Me();
            if (n > 1) {
              const l = this.name === "popover" ? 1060 : 1070, o = (n - 1) * 20;
              t.style.zIndex = `${l + o}`;
            }
            e || (t.className = `${this.name} ${this.placement} ${this.customClass ? this.customClass : ""} fade`, Pe(this.appendTo).appendChild(t), this.resetPosition()), H(t, qe), this.$emit("update:modelValue", !0), this.$emit("show");
          }
        }, this.showDelay);
      }
    },
    hide() {
      this.showTimeoutId > 0 && (clearTimeout(this.showTimeoutId), this.showTimeoutId = 0), this.isShown() && (this.enterable && (this.trigger === ee.HOVER || this.trigger === ee.HOVER_FOCUS) ? (clearTimeout(this.hideTimeoutId), this.hideTimeoutId = setTimeout(() => {
        this.hideTimeoutId = 0;
        const e = this.$refs.popup;
        e && !e.matches(":hover") && this.$hide();
      }, 100)) : this.$hide());
    },
    $hide() {
      this.isShown() && (clearTimeout(this.hideTimeoutId), this.hideTimeoutId = setTimeout(() => {
        this.hideTimeoutId = 0, Z(this.$refs.popup, qe), this.transitionTimeoutId = setTimeout(() => {
          this.transitionTimeoutId = 0, ae(this.$refs.popup), this.$emit("update:modelValue", !1), this.$emit("hide");
        }, this.transition);
      }, this.hideDelay));
    },
    isShown() {
      return un(this.$refs.popup, qe);
    },
    windowClicked(e) {
      this.triggerEl && he(this.triggerEl.contains) && !this.triggerEl.contains(e.target) && this.trigger === ee.OUTSIDE_CLICK && !(this.$refs.popup && this.$refs.popup.contains(e.target)) && this.isShown() && this.hide();
    },
    handleAuto() {
      clearTimeout(this.autoTimeoutId), this.autoTimeoutId = setTimeout(() => {
        this.autoTimeoutId = 0, this.triggerEl.matches(":hover, :focus") ? this.show() : this.hide();
      }, 20);
    }
  }
}, Vt = {
  mixins: [It],
  props: {
    text: {
      type: String,
      default: ""
    },
    trigger: {
      type: String,
      default: ee.HOVER_FOCUS
    }
  },
  data() {
    return {
      name: "tooltip"
    };
  },
  computed: {
    allContent() {
      return this.text;
    }
  },
  methods: {
    isNotEmpty() {
      return this.text;
    }
  },
  render() {
    const e = this.tag;
    return B(e, null, {
      default: () => {
        var t, n;
        return [(n = (t = this.$slots).default) == null ? void 0 : n.call(t), B("div", {
          ref: "popup",
          role: "tooltip",
          onMouseleave: this.hideOnLeave
        }, [B("div", {
          class: "tooltip-arrow"
        }, null), B("div", {
          class: "tooltip-inner"
        }, [this.text])])];
      }
    });
  }
}, Nt = {
  mixins: [It],
  props: {
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    trigger: {
      type: String,
      default: ee.OUTSIDE_CLICK
    }
  },
  data() {
    return {
      name: "popover"
    };
  },
  computed: {
    allContent() {
      return this.title + this.content;
    }
  },
  methods: {
    isNotEmpty() {
      return this.title || this.content || this.$slots.popover;
    }
  },
  render() {
    const e = this.tag;
    return B(e, null, {
      default: () => {
        var t, n, l, o;
        return [(n = (t = this.$slots).default) == null ? void 0 : n.call(t), B("div", {
          style: {
            display: "block"
          },
          ref: "popup",
          onMouseleave: this.hideOnLeave
        }, [B("div", {
          class: "arrow"
        }, null), this.title ? B("h3", {
          class: "popover-title"
        }, [this.title]) : null, B("div", {
          className: "popover-content"
        }, [this.content || ((o = (l = this.$slots).popover) == null ? void 0 : o.call(l))])])];
      }
    });
  }
}, Ge = 23, me = 0, je = 59, le = 12, Bl = {
  components: { Btn: D },
  props: {
    modelValue: { type: Date, required: !0 },
    showMeridian: { type: Boolean, default: !0 },
    min: { type: null, default: void 0 },
    max: { type: null, default: void 0 },
    hourStep: { type: Number, default: 1 },
    minStep: { type: Number, default: 1 },
    readonly: { type: Boolean, default: !1 },
    controls: { type: Boolean, default: !0 },
    iconControlUp: { type: String, default: "glyphicon glyphicon-chevron-up" },
    iconControlDown: {
      type: String,
      default: "glyphicon glyphicon-chevron-down"
    },
    inputWidth: { type: Number, default: 50 }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      hours: 0,
      minutes: 0,
      meridian: !0,
      hoursText: "",
      minutesText: ""
    };
  },
  computed: {
    inputStyles() {
      return {
        width: `${this.inputWidth}px`
      };
    }
  },
  watch: {
    modelValue(e) {
      this.updateByValue(e);
    },
    showMeridian(e) {
      this.setTime();
    },
    hoursText(e) {
      if (this.hours === 0 && e === "")
        return;
      const t = parseInt(e);
      this.showMeridian ? t >= 1 && t <= le && (this.meridian ? this.hours = t === le ? 0 : t : this.hours = t === le ? le : t + le) : t >= me && t <= Ge && (this.hours = t), this.setTime();
    },
    minutesText(e) {
      if (this.minutes === 0 && e === "")
        return;
      const t = parseInt(e);
      t >= me && t <= je && (this.minutes = t), this.setTime();
    }
  },
  mounted() {
    this.updateByValue(this.modelValue);
  },
  methods: {
    t: se,
    updateByValue(e) {
      if (isNaN(e.getTime())) {
        this.hours = 0, this.minutes = 0, this.hoursText = "", this.minutesText = "", this.meridian = !0;
        return;
      }
      this.hours = e.getHours(), this.minutes = e.getMinutes(), this.showMeridian ? this.hours >= le ? (this.hours === le ? this.hoursText = this.hours + "" : this.hoursText = ke(this.hours - le, 2), this.meridian = !1) : (this.hours === me ? this.hoursText = le.toString() : this.hoursText = ke(this.hours, 2), this.meridian = !0) : this.hoursText = ke(this.hours, 2), this.minutesText = ke(this.minutes, 2), this.$refs.hoursInput.value = this.hoursText, this.$refs.minutesInput.value = this.minutesText;
    },
    addHour(e) {
      e = e || this.hourStep, this.hours = this.hours >= Ge ? me : this.hours + e;
    },
    reduceHour(e) {
      e = e || this.hourStep, this.hours = this.hours <= me ? Ge : this.hours - e;
    },
    addMinute() {
      this.minutes >= je ? (this.minutes = me, this.addHour(1)) : this.minutes += this.minStep;
    },
    reduceMinute() {
      this.minutes <= me ? (this.minutes = je + 1 - this.minStep, this.reduceHour(1)) : this.minutes -= this.minStep;
    },
    changeTime(e, t) {
      this.readonly || (e && t ? this.addHour() : e && !t ? this.reduceHour() : !e && t ? this.addMinute() : this.reduceMinute(), this.setTime());
    },
    toggleMeridian() {
      this.meridian = !this.meridian, this.meridian ? this.hours -= le : this.hours += le, this.setTime();
    },
    onWheel(e, t) {
      this.readonly || (e.preventDefault(), this.changeTime(t, e.deltaY < 0));
    },
    setTime() {
      let e = this.modelValue;
      if (isNaN(e.getTime()) && (e = new Date(), e.setHours(0), e.setMinutes(0)), e.setHours(this.hours), e.setMinutes(this.minutes), this.max instanceof Date) {
        const t = new Date(e);
        t.setHours(this.max.getHours()), t.setMinutes(this.max.getMinutes()), e = e > t ? t : e;
      }
      if (this.min instanceof Date) {
        const t = new Date(e);
        t.setHours(this.min.getHours()), t.setMinutes(this.min.getMinutes()), e = e < t ? t : e;
      }
      this.$emit("update:modelValue", new Date(e));
    },
    selectInputValue(e) {
      e.target.setSelectionRange(0, 2);
    }
  }
}, Il = {
  key: 0,
  class: "text-center"
}, Vl = /* @__PURE__ */ r("td", null, "\xA0", -1), Nl = { key: 0 }, Ml = { class: "form-group" }, _l = ["readonly"], Ll = /* @__PURE__ */ r("td", null, [
  /* @__PURE__ */ q("\xA0"),
  /* @__PURE__ */ r("b", null, ":"),
  /* @__PURE__ */ q("\xA0")
], -1), Pl = { class: "form-group" }, Dl = ["readonly"], Rl = { key: 0 }, Al = /* @__PURE__ */ q(" \xA0 "), Fl = {
  key: 1,
  class: "text-center"
}, Ul = /* @__PURE__ */ r("td", null, "\xA0", -1), Hl = { key: 0 };
function zl(e, t, n, l, o, s) {
  const a = ve("btn");
  return u(), h("section", {
    onClick: t[14] || (t[14] = M(() => {
    }, ["stop"]))
  }, [
    r("table", null, [
      r("tbody", null, [
        n.controls ? (u(), h("tr", Il, [
          r("td", null, [
            B(a, {
              type: "link",
              size: "sm",
              disabled: n.readonly,
              onClick: t[0] || (t[0] = (i) => s.changeTime(1, 1))
            }, {
              default: O(() => [
                r("i", {
                  class: C(n.iconControlUp)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          Vl,
          r("td", null, [
            B(a, {
              type: "link",
              size: "sm",
              disabled: n.readonly,
              onClick: t[1] || (t[1] = (i) => s.changeTime(0, 1))
            }, {
              default: O(() => [
                r("i", {
                  class: C(n.iconControlUp)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          n.showMeridian ? (u(), h("td", Nl)) : N("", !0)
        ])) : N("", !0),
        r("tr", null, [
          r("td", Ml, [
            te(r("input", {
              ref: "hoursInput",
              "onUpdate:modelValue": t[2] || (t[2] = (i) => o.hoursText = i),
              type: "tel",
              pattern: "\\d*",
              class: "form-control text-center",
              style: ge(s.inputStyles),
              placeholder: "HH",
              readonly: n.readonly,
              maxlength: "2",
              size: "2",
              onMouseup: t[3] || (t[3] = (...i) => s.selectInputValue && s.selectInputValue(...i)),
              onKeydown: [
                t[4] || (t[4] = W(M((i) => s.changeTime(1, 1), ["prevent"]), ["up"])),
                t[5] || (t[5] = W(M((i) => s.changeTime(1, 0), ["prevent"]), ["down"]))
              ],
              onWheel: t[6] || (t[6] = (i) => s.onWheel(i, !0))
            }, null, 44, _l), [
              [
                Ze,
                o.hoursText,
                void 0,
                { lazy: !0 }
              ]
            ])
          ]),
          Ll,
          r("td", Pl, [
            te(r("input", {
              ref: "minutesInput",
              "onUpdate:modelValue": t[7] || (t[7] = (i) => o.minutesText = i),
              type: "tel",
              pattern: "\\d*",
              class: "form-control text-center",
              style: ge(s.inputStyles),
              placeholder: "MM",
              readonly: n.readonly,
              maxlength: "2",
              size: "2",
              onMouseup: t[8] || (t[8] = (...i) => s.selectInputValue && s.selectInputValue(...i)),
              onKeydown: [
                t[9] || (t[9] = W(M((i) => s.changeTime(0, 1), ["prevent"]), ["up"])),
                t[10] || (t[10] = W(M((i) => s.changeTime(0, 0), ["prevent"]), ["down"]))
              ],
              onWheel: t[11] || (t[11] = (i) => s.onWheel(i, !1))
            }, null, 44, Dl), [
              [
                Ze,
                o.minutesText,
                void 0,
                { lazy: !0 }
              ]
            ])
          ]),
          n.showMeridian ? (u(), h("td", Rl, [
            Al,
            B(a, {
              "data-action": "toggleMeridian",
              disabled: n.readonly,
              onClick: s.toggleMeridian
            }, {
              default: O(() => [
                q(I(o.meridian ? s.t("uiv.timePicker.am") : s.t("uiv.timePicker.pm")), 1)
              ]),
              _: 1
            }, 8, ["disabled", "onClick"])
          ])) : N("", !0)
        ]),
        n.controls ? (u(), h("tr", Fl, [
          r("td", null, [
            B(a, {
              type: "link",
              size: "sm",
              disabled: n.readonly,
              onClick: t[12] || (t[12] = (i) => s.changeTime(1, 0))
            }, {
              default: O(() => [
                r("i", {
                  class: C(n.iconControlDown)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          Ul,
          r("td", null, [
            B(a, {
              type: "link",
              size: "sm",
              disabled: n.readonly,
              onClick: t[13] || (t[13] = (i) => s.changeTime(0, 0))
            }, {
              default: O(() => [
                r("i", {
                  class: C(n.iconControlDown)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          n.showMeridian ? (u(), h("td", Hl)) : N("", !0)
        ])) : N("", !0)
      ])
    ])
  ]);
}
const Kl = /* @__PURE__ */ Te(Bl, [["render", zl]]);
function Yl(e, t = "GET") {
  return fetch(e, { method: t }).then((n) => n.json());
}
const Wl = ["onClick"], ql = ["innerHTML"], Gl = {
  __name: "Typeahead",
  props: {
    modelValue: { type: null, required: !0 },
    data: { type: Array, default: void 0 },
    itemKey: { type: String, default: void 0 },
    appendToBody: { type: Boolean, default: !1 },
    ignoreCase: { type: Boolean, default: !0 },
    matchStart: { type: Boolean, default: !1 },
    forceSelect: { type: Boolean, default: !1 },
    forceClear: { type: Boolean, default: !1 },
    limit: { type: Number, default: 10 },
    asyncSrc: { type: String, default: void 0 },
    asyncKey: { type: String, default: void 0 },
    asyncFunction: { type: Function, default: void 0 },
    debounce: { type: Number, default: 200 },
    openOnFocus: { type: Boolean, default: !0 },
    openOnEmpty: { type: Boolean, default: !1 },
    target: { required: !0, type: null },
    preselect: { type: Boolean, default: !0 }
  },
  emits: [
    "update:modelValue",
    "loading",
    "loaded",
    "loaded-error",
    "selected-item-changed"
  ],
  setup(e, { emit: t }) {
    const n = e, l = qt(), o = L(null), s = L([]), a = L(0), i = L([]), d = L(!1), p = L(null);
    let f = null, m = 0;
    const c = R(() => {
      let T = "";
      return n.ignoreCase && (T += "i"), n.matchStart || (T += "g"), T;
    });
    ie(
      () => n.target,
      (T) => {
        S(), y(T), v();
      }
    ), ie(
      () => n.modelValue,
      (T) => {
        g(T);
      }
    ), ie(
      () => a.value,
      (T) => {
        T >= 0 && t("selected-item-changed", T);
      }
    ), de(async () => {
      await Le(), y(n.target), v(), f = p.value.$el.querySelector(".dropdown-menu"), n.modelValue && g(n.modelValue);
    }), Ae(() => {
      S();
    });
    function g(T) {
      ue(T) ? o.value.value = T : T ? o.value.value = n.itemKey ? T[n.itemKey] : T : T === null && (o.value.value = "");
    }
    function k() {
      return !!l.empty;
    }
    function y(T) {
      !T || (o.value = Pe(T));
    }
    function v() {
      o.value && (i.value = [o.value], P(o.value, w.FOCUS, z), P(o.value, w.BLUR, U), P(o.value, w.INPUT, E), P(o.value, w.KEY_DOWN, A));
    }
    function S() {
      i.value = [], o.value && (_(o.value, w.FOCUS, z), _(o.value, w.BLUR, U), _(o.value, w.INPUT, E), _(o.value, w.KEY_DOWN, A));
    }
    function x(T, Q = !1) {
      if (Q) {
        s.value = T.slice(0, n.limit);
        return;
      }
      s.value = [], a.value = n.preselect ? 0 : -1;
      for (let K = 0, be = T.length; K < be; K++) {
        const Ee = T[K];
        let Oe = n.itemKey ? Ee[n.itemKey] : Ee;
        Oe = Oe.toString();
        let xe = -1;
        if (n.ignoreCase ? xe = Oe.toLowerCase().indexOf(o.value.value.toLowerCase()) : xe = Oe.indexOf(o.value.value), (n.matchStart ? xe === 0 : xe >= 0) && s.value.push(Ee), s.value.length >= n.limit)
          break;
      }
    }
    function b(T, Q) {
      if (clearTimeout(m), T === "" && !n.openOnEmpty)
        d.value = !1;
      else if (n.data)
        x(n.data), d.value = k() || !!s.value.length;
      else if (n.asyncSrc)
        m = setTimeout(() => {
          t("loading"), Yl(n.asyncSrc + encodeURIComponent(T)).then((K) => {
            o.value.matches(":focus") && (x(n.asyncKey ? K[n.asyncKey] : K, !0), d.value = k() || !!s.value.length), t("loaded");
          }).catch((K) => {
            console.error(K), t("loaded-error");
          });
        }, Q);
      else if (n.asyncFunction) {
        const K = (be) => {
          o.value.matches(":focus") && (x(be, !0), d.value = k() || !!s.value.length), t("loaded");
        };
        m = setTimeout(() => {
          t("loading"), n.asyncFunction(T, K);
        }, Q);
      }
    }
    function E() {
      const T = o.value.value;
      b(T, n.debounce), t("update:modelValue", n.forceSelect ? void 0 : T);
    }
    function z() {
      if (n.openOnFocus) {
        const T = o.value.value;
        b(T, 0);
      }
    }
    async function U() {
      f.matches(":hover") || (d.value = !1), o.value && n.forceClear && (await Le(), typeof n.modelValue > "u" && (o.value.value = ""));
    }
    function A(T) {
      if (T.stopPropagation(), d.value)
        switch (T.keyCode) {
          case 13:
            a.value >= 0 ? oe(s.value[a.value]) : d.value = !1, T.preventDefault();
            break;
          case 27:
            d.value = !1;
            break;
          case 38:
            a.value = a.value > 0 ? a.value - 1 : 0;
            break;
          case 40: {
            const Q = s.value.length - 1;
            a.value = a.value < Q ? a.value + 1 : Q;
            break;
          }
        }
    }
    function oe(T) {
      t("update:modelValue", T), d.value = !1;
    }
    function pe(T) {
      const Q = n.itemKey ? T[n.itemKey] : T, K = o.value.value.replace(
        /[-[\]{}()*+?.,\\^$|#\s]/g,
        "\\$&"
      );
      return Q.replace(
        new RegExp(`${K}`, c.value),
        "<b>$&</b>"
      );
    }
    return (T, Q) => (u(), Y(Ue, {
      ref_key: "dropdown",
      ref: p,
      modelValue: d.value,
      "onUpdate:modelValue": Q[0] || (Q[0] = (K) => d.value = K),
      tag: "section",
      "append-to-body": e.appendToBody,
      "not-close-elements": i.value,
      "position-element": o.value
    }, {
      dropdown: O(() => [
        V(T.$slots, "item", {
          items: s.value,
          activeIndex: a.value,
          select: oe,
          highlight: pe
        }, () => [
          (u(!0), h(F, null, j(s.value, (K, be) => (u(), h("li", {
            key: be,
            class: C({ active: a.value === be })
          }, [
            r("a", {
              href: "#",
              onClick: M((Ee) => oe(K), ["prevent"])
            }, [
              r("span", {
                innerHTML: pe(K)
              }, null, 8, ql)
            ], 8, Wl)
          ], 2))), 128))
        ]),
        !s.value || s.value.length === 0 ? V(T.$slots, "empty", { key: 0 }) : N("", !0)
      ]),
      _: 3
    }, 8, ["modelValue", "append-to-body", "not-close-elements", "position-element"]));
  }
}, Mt = {
  modelValue: {
    type: Number,
    required: !0,
    validator(e) {
      return e >= 0 && e <= 100;
    }
  },
  labelText: { type: String, default: void 0 },
  type: { type: String, default: void 0 },
  label: { type: Boolean, default: !1 },
  minWidth: { type: Boolean, default: !1 },
  striped: { type: Boolean, default: !1 },
  active: { type: Boolean, default: !1 }
}, jl = ["aria-valuenow"], _t = {
  __name: "ProgressBarStack",
  props: {
    ...Mt
  },
  setup(e) {
    return (t, n) => (u(), h("div", {
      class: C({
        "progress-bar": !0,
        "progress-bar-striped": t.striped,
        active: t.striped && t.active,
        [`progress-bar-${t.type}`]: !!t.type
      }),
      style: ge({
        minWidth: t.minWidth ? "2em" : null,
        width: `${t.modelValue}%`
      }),
      role: "progressbar",
      "aria-valuemin": "0",
      "aria-valuenow": t.modelValue,
      "aria-valuemax": "100"
    }, I(t.label ? t.labelText ? t.labelText : `${t.modelValue}%` : null), 15, jl));
  }
}, Zl = { class: "progress" }, Jl = {
  __name: "ProgressBar",
  props: {
    ...Mt
  },
  setup(e) {
    return (t, n) => (u(), h("div", Zl, [
      t.$slots.default ? V(t.$slots, "default", { key: 0 }) : (u(), Y(_t, Gt(jt({ key: 1 }, t.$props)), null, 16))
    ]));
  }
}, Xl = ["href", "target"], Lt = {
  __name: "BreadcrumbItem",
  props: {
    ...St,
    active: { type: Boolean, default: !1 }
  },
  setup(e) {
    return (t, n) => {
      const l = ve("RouterLink");
      return u(), h("li", {
        class: C({ active: e.active })
      }, [
        e.active ? V(t.$slots, "default", { key: 0 }) : t.to ? (u(), Y(l, {
          key: 1,
          to: t.to,
          replace: t.replace,
          append: t.append,
          exact: t.exact
        }, {
          default: O(() => [
            V(t.$slots, "default")
          ]),
          _: 3
        }, 8, ["to", "replace", "append", "exact"])) : (u(), h("a", {
          key: 2,
          href: t.href,
          target: t.target
        }, [
          V(t.$slots, "default")
        ], 8, Xl))
      ], 2);
    };
  }
}, Ql = { class: "breadcrumb" }, es = {
  __name: "Breadcrumbs",
  props: {
    items: { type: Array, default: () => [] }
  },
  setup(e) {
    return (t, n) => (u(), h("ol", Ql, [
      V(t.$slots, "default"),
      (u(!0), h(F, null, j(e.items, (l, o) => {
        var s, a;
        return u(), Y(Lt, {
          key: (s = l.key) != null ? s : o,
          active: (a = l.active) != null ? a : o === e.items.length - 1,
          href: l.href,
          to: l.to,
          replace: l.replace,
          append: l.append,
          exact: l.exact
        }, {
          default: O(() => [
            q(I(l.text), 1)
          ]),
          _: 2
        }, 1032, ["active", "href", "to", "replace", "append", "exact"]);
      }), 128))
    ]));
  }
}, ts = {
  class: "btn-toolbar",
  role: "toolbar"
}, ns = {
  __name: "BtnToolbar",
  setup(e) {
    return (t, n) => (u(), h("div", ts, [
      V(t.$slots, "default")
    ]));
  }
}, ls = {
  components: { Dropdown: Ue },
  props: {
    modelValue: { type: Array, required: !0 },
    options: { type: Array, required: !0 },
    labelKey: { type: String, default: "label" },
    valueKey: { type: String, default: "value" },
    limit: { type: Number, default: 0 },
    size: { type: String, default: void 0 },
    placeholder: { type: String, default: void 0 },
    split: { type: String, default: ", " },
    disabled: { type: Boolean, default: !1 },
    appendToBody: { type: Boolean, default: !1 },
    block: { type: Boolean, default: !1 },
    collapseSelected: { type: Boolean, default: !1 },
    filterable: { type: Boolean, default: !1 },
    filterAutoFocus: { type: Boolean, default: !0 },
    filterFunction: { type: Function, default: void 0 },
    filterPlaceholder: { type: String, default: void 0 },
    selectedIcon: { type: String, default: "glyphicon glyphicon-ok" },
    itemSelectedClass: { type: String, default: void 0 }
  },
  emits: [
    "focus",
    "blur",
    "visible-change",
    "update:modelValue",
    "change",
    "limit-exceed",
    "search"
  ],
  data() {
    return {
      showDropdown: !1,
      els: [],
      filterInput: "",
      currentActive: -1
    };
  },
  computed: {
    containerStyles() {
      return {
        width: this.block ? "100%" : ""
      };
    },
    filteredOptions() {
      if (this.filterable && this.filterInput) {
        if (this.filterFunction)
          return this.filterFunction(this.filterInput);
        {
          const e = this.filterInput.toLowerCase();
          return this.options.filter(
            (t) => t[this.valueKey].toString().toLowerCase().indexOf(e) >= 0 || t[this.labelKey].toString().toLowerCase().indexOf(e) >= 0
          );
        }
      } else
        return this.options;
    },
    groupedOptions() {
      return this.filteredOptions.map((e) => e.group).filter(on).map((e) => ({
        options: this.filteredOptions.filter((t) => t.group === e),
        $group: e
      }));
    },
    flattenGroupedOptions() {
      return [].concat(...this.groupedOptions.map((e) => e.options));
    },
    selectClasses() {
      return {
        [`input-${this.size}`]: this.size
      };
    },
    selectedIconClasses() {
      return {
        [this.selectedIcon]: !0,
        "pull-right": !0
      };
    },
    selectTextClasses() {
      return {
        "text-muted": this.modelValue.length === 0
      };
    },
    labelValue() {
      const e = this.options.map((t) => t[this.valueKey]);
      return this.modelValue.map((t) => {
        const n = e.indexOf(t);
        return n >= 0 ? this.options[n][this.labelKey] : t;
      });
    },
    selectedText() {
      if (this.modelValue.length) {
        const e = this.labelValue;
        if (this.collapseSelected) {
          let t = e[0];
          return t += e.length > 1 ? `${this.split}+${e.length - 1}` : "", t;
        } else
          return e.join(this.split);
      } else
        return this.placeholder || this.t("uiv.multiSelect.placeholder");
    },
    customOptionsVisible() {
      return !!this.$slots.option || !!this.$slots.option;
    }
  },
  watch: {
    showDropdown(e) {
      this.filterInput = "", this.currentActive = -1, this.$emit("visible-change", e), e && this.filterable && this.filterAutoFocus && this.$nextTick(() => {
        this.$refs.filterInput.focus();
      });
    }
  },
  mounted() {
    this.els = [this.$el];
  },
  methods: {
    t: se,
    goPrevOption() {
      !this.showDropdown || (this.currentActive > 0 ? this.currentActive-- : this.currentActive = this.flattenGroupedOptions.length - 1);
    },
    goNextOption() {
      !this.showDropdown || (this.currentActive < this.flattenGroupedOptions.length - 1 ? this.currentActive++ : this.currentActive = 0);
    },
    selectOption() {
      const e = this.currentActive, t = this.flattenGroupedOptions;
      this.showDropdown ? e >= 0 && e < t.length && this.toggle(t[e]) : this.showDropdown = !0;
    },
    itemClasses(e) {
      const t = {
        disabled: e.disabled,
        active: this.currentActive === this.flattenGroupedOptions.indexOf(e)
      };
      return this.itemSelectedClass && (t[this.itemSelectedClass] = this.isItemSelected(e)), t;
    },
    isItemSelected(e) {
      return this.modelValue.indexOf(e[this.valueKey]) >= 0;
    },
    toggle(e) {
      if (e.disabled)
        return;
      const t = e[this.valueKey], n = this.modelValue.indexOf(t);
      if (this.limit === 1) {
        const l = n >= 0 ? [] : [t];
        this.$emit("update:modelValue", l), this.$emit("change", l);
      } else if (n >= 0) {
        const l = this.modelValue.slice();
        l.splice(n, 1), this.$emit("update:modelValue", l), this.$emit("change", l);
      } else if (this.limit === 0 || this.modelValue.length < this.limit) {
        const l = this.modelValue.slice();
        l.push(t), this.$emit("update:modelValue", l), this.$emit("change", l);
      } else
        this.$emit("limit-exceed");
    },
    searchClicked() {
      this.$emit("search", this.filterInput);
    }
  }
}, ss = ["disabled"], os = /* @__PURE__ */ r("div", {
  class: "pull-right",
  style: { display: "inline-block", "vertical-align": "middle" }
}, [
  /* @__PURE__ */ r("span", null, "\xA0"),
  /* @__PURE__ */ r("span", { class: "caret" })
], -1), is = ["textContent"], as = {
  key: 0,
  style: { padding: "4px 8px" }
}, rs = ["placeholder"], us = ["textContent"], ds = ["onClick"], cs = {
  key: 0,
  role: "button",
  style: { outline: "0" }
}, hs = {
  key: 1,
  role: "button",
  style: { outline: "0" }
}, fs = {
  key: 2,
  role: "button",
  style: { outline: "0" }
};
function ps(e, t, n, l, o, s) {
  const a = ve("dropdown");
  return u(), Y(a, {
    ref: "dropdown",
    modelValue: o.showDropdown,
    "onUpdate:modelValue": t[14] || (t[14] = (i) => o.showDropdown = i),
    "not-close-elements": o.els,
    "append-to-body": n.appendToBody,
    disabled: n.disabled,
    style: ge(s.containerStyles),
    onKeydown: t[15] || (t[15] = W((i) => o.showDropdown = !1, ["esc"]))
  }, {
    dropdown: O(() => [
      n.filterable ? (u(), h("li", as, [
        te(r("input", {
          ref: "filterInput",
          "onUpdate:modelValue": t[5] || (t[5] = (i) => o.filterInput = i),
          "aria-label": "Filter...",
          class: "form-control input-sm",
          type: "text",
          placeholder: n.filterPlaceholder || s.t("uiv.multiSelect.filterPlaceholder"),
          onKeyup: t[6] || (t[6] = W((...i) => s.searchClicked && s.searchClicked(...i), ["enter"])),
          onKeydown: [
            t[7] || (t[7] = W(M((...i) => s.goNextOption && s.goNextOption(...i), ["prevent", "stop"]), ["down"])),
            t[8] || (t[8] = W(M((...i) => s.goPrevOption && s.goPrevOption(...i), ["prevent", "stop"]), ["up"])),
            t[9] || (t[9] = W(M((...i) => s.selectOption && s.selectOption(...i), ["prevent", "stop"]), ["enter"]))
          ]
        }, null, 40, rs), [
          [Ze, o.filterInput]
        ])
      ])) : N("", !0),
      (u(!0), h(F, null, j(s.groupedOptions, (i, d) => (u(), h(F, null, [
        i.$group ? (u(), h("li", {
          key: d,
          class: "dropdown-header",
          textContent: I(i.$group)
        }, null, 8, us)) : N("", !0),
        (u(!0), h(F, null, j(i.options, (p, f) => (u(), h("li", {
          key: `${d}_${f}`,
          class: C(s.itemClasses(p)),
          style: { outline: "0" },
          onKeydown: [
            t[10] || (t[10] = W(M((...m) => s.goNextOption && s.goNextOption(...m), ["prevent", "stop"]), ["down"])),
            t[11] || (t[11] = W(M((...m) => s.goPrevOption && s.goPrevOption(...m), ["prevent", "stop"]), ["up"])),
            t[12] || (t[12] = W(M((...m) => s.selectOption && s.selectOption(...m), ["prevent", "stop"]), ["enter"]))
          ],
          onClick: M((m) => s.toggle(p, m), ["stop"]),
          onMouseenter: t[13] || (t[13] = (m) => o.currentActive = -1)
        }, [
          s.customOptionsVisible ? (u(), h("a", cs, [
            V(e.$slots, "option", { item: p }),
            n.selectedIcon && s.isItemSelected(p) ? (u(), h("span", {
              key: 0,
              class: C(s.selectedIconClasses)
            }, null, 2)) : N("", !0)
          ])) : s.isItemSelected(p) ? (u(), h("a", hs, [
            r("b", null, I(p[n.labelKey]), 1),
            n.selectedIcon ? (u(), h("span", {
              key: 0,
              class: C(s.selectedIconClasses)
            }, null, 2)) : N("", !0)
          ])) : (u(), h("a", fs, [
            r("span", null, I(p[n.labelKey]), 1)
          ]))
        ], 42, ds))), 128))
      ], 64))), 256))
    ]),
    default: O(() => [
      r("div", {
        class: C(["form-control dropdown-toggle clearfix", s.selectClasses]),
        disabled: n.disabled ? !0 : void 0,
        tabindex: "0",
        "data-role": "trigger",
        onFocus: t[0] || (t[0] = (i) => e.$emit("focus", i)),
        onBlur: t[1] || (t[1] = (i) => e.$emit("blur", i)),
        onKeydown: [
          t[2] || (t[2] = W(M((...i) => s.goNextOption && s.goNextOption(...i), ["prevent", "stop"]), ["down"])),
          t[3] || (t[3] = W(M((...i) => s.goPrevOption && s.goPrevOption(...i), ["prevent", "stop"]), ["up"])),
          t[4] || (t[4] = W(M((...i) => s.selectOption && s.selectOption(...i), ["prevent", "stop"]), ["enter"]))
        ]
      }, [
        os,
        r("div", {
          class: C(s.selectTextClasses),
          style: { "overflow-x": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" },
          textContent: I(s.selectedText)
        }, null, 10, is)
      ], 42, ss)
    ]),
    _: 3
  }, 8, ["modelValue", "not-close-elements", "append-to-body", "disabled", "style"]);
}
const ms = /* @__PURE__ */ Te(ls, [["render", ps]]), ys = { class: "navbar-header" }, gs = /* @__PURE__ */ r("span", { class: "sr-only" }, "Toggle navigation", -1), vs = /* @__PURE__ */ r("span", { class: "icon-bar" }, null, -1), bs = /* @__PURE__ */ r("span", { class: "icon-bar" }, null, -1), Cs = /* @__PURE__ */ r("span", { class: "icon-bar" }, null, -1), ks = [
  gs,
  vs,
  bs,
  Cs
], Ts = {
  __name: "Navbar",
  props: {
    modelValue: Boolean,
    fluid: { type: Boolean, default: !0 },
    fixedTop: Boolean,
    fixedBottom: Boolean,
    staticTop: Boolean,
    inverse: Boolean
  },
  emits: ["update:modalValue"],
  setup(e, { emit: t }) {
    const n = e, l = L(!1), o = R(() => ({
      navbar: !0,
      "navbar-default": !n.inverse,
      "navbar-inverse": n.inverse,
      "navbar-static-top": n.staticTop,
      "navbar-fixed-bottom": n.fixedBottom,
      "navbar-fixed-top": n.fixedTop
    }));
    ie(
      () => n.modelValue,
      (a) => {
        l.value = a;
      }
    ), de(() => {
      l.value = !!n.modelValue;
    });
    function s() {
      l.value = !l.value, t("update:modalValue", l.value);
    }
    return (a, i) => (u(), h("nav", {
      class: C($(o))
    }, [
      r("div", {
        class: C(e.fluid ? "container-fluid" : "container")
      }, [
        r("div", ys, [
          V(a.$slots, "collapse-btn", {}, () => [
            r("button", {
              type: "button",
              class: "navbar-toggle collapsed",
              onClick: s
            }, ks)
          ]),
          V(a.$slots, "brand")
        ]),
        V(a.$slots, "default"),
        B(Tt, {
          modelValue: l.value,
          "onUpdate:modelValue": i[0] || (i[0] = (d) => l.value = d),
          class: "navbar-collapse"
        }, {
          default: O(() => [
            V(a.$slots, "collapse")
          ]),
          _: 3
        }, 8, ["modelValue"])
      ], 2)
    ], 2));
  }
}, ws = {
  __name: "NavbarNav",
  props: {
    left: Boolean,
    right: Boolean
  },
  setup(e) {
    return (t, n) => (u(), h("ul", {
      class: C({
        nav: !0,
        "navbar-nav": !0,
        "navbar-left": e.left,
        "navbar-right": e.right
      })
    }, [
      V(t.$slots, "default")
    ], 2));
  }
}, Ss = {
  __name: "NavbarForm",
  props: {
    left: Boolean,
    right: Boolean
  },
  setup(e) {
    return (t, n) => (u(), h("form", {
      class: C({
        "navbar-form": !0,
        "navbar-left": e.left,
        "navbar-right": e.right
      })
    }, [
      V(t.$slots, "default")
    ], 2));
  }
}, $s = {
  __name: "NavbarText",
  props: {
    left: Boolean,
    right: Boolean
  },
  setup(e) {
    return (t, n) => (u(), h("p", {
      class: C({
        "navbar-text": !0,
        "navbar-left": e.left,
        "navbar-right": e.right
      })
    }, [
      V(t.$slots, "default")
    ], 2));
  }
}, ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Carousel: ln,
  Slide: an,
  Collapse: Tt,
  Dropdown: Ue,
  Modal: $t,
  Tab: Mn,
  Tabs: Un,
  DatePicker: ul,
  Affix: hl,
  Alert: Bt,
  Pagination: xl,
  Tooltip: Vt,
  Popover: Nt,
  TimePicker: Kl,
  Typeahead: Gl,
  ProgressBar: Jl,
  ProgressBarStack: _t,
  Breadcrumbs: es,
  BreadcrumbItem: Lt,
  Btn: D,
  BtnGroup: wt,
  BtnToolbar: ns,
  MultiSelect: ms,
  Navbar: Ts,
  NavbarNav: ws,
  NavbarForm: Ss,
  NavbarText: $s
}, Symbol.toStringTag, { value: "Module" })), tt = "_uiv_tooltip_instance", Pt = (e, t) => {
  Dt(e);
  const n = [];
  for (const d in t.modifiers)
    Fe(t.modifiers, d) && t.modifiers[d] && n.push(d);
  let l, o, s;
  n.forEach((d) => {
    /(top)|(left)|(right)|(bottom)/.test(d) ? l = d : /(hover)|(focus)|(click)/.test(d) ? o = d : /unenterable/.test(d) && (s = !1);
  });
  const a = $e(Vt, {
    target: e,
    appendTo: t.arg && "#" + t.arg,
    text: typeof t.value == "string" ? t.value && t.value.toString() : t.value && t.value.text && t.value.text.toString(),
    positionBy: t.value && t.value.positionBy && t.value.positionBy.toString(),
    viewport: t.value && t.value.viewport && t.value.viewport.toString(),
    customClass: t.value && t.value.customClass && t.value.customClass.toString(),
    showDelay: t.value && t.value.showDelay,
    hideDelay: t.value && t.value.hideDelay,
    enterable: s,
    placement: l,
    trigger: o
  }), i = document.createElement("div");
  ce(a, i), e[tt] = { container: i, vNode: a };
}, Dt = (e) => {
  const t = e[tt];
  if (t) {
    try {
      ae(t.vNode.component.ctx.$refs.popup);
    } catch {
    }
    ce(null, t.container);
  }
  delete e[tt];
}, Es = (e, t) => {
  t.value !== t.oldValue && Pt(e, t);
}, Os = { mounted: Pt, unmounted: Dt, updated: Es }, nt = "_uiv_popover_instance", Rt = (e, t) => {
  At(e);
  const n = [];
  for (const d in t.modifiers)
    Fe(t.modifiers, d) && t.modifiers[d] && n.push(d);
  let l, o, s;
  n.forEach((d) => {
    /(top)|(left)|(right)|(bottom)/.test(d) ? l = d : /(hover)|(focus)|(click)/.test(d) ? o = d : /unenterable/.test(d) && (s = !1);
  });
  const a = $e(Nt, {
    target: e,
    appendTo: t.arg && "#" + t.arg,
    title: t.value && t.value.title && t.value.title.toString(),
    positionBy: t.value && t.value.positionBy && t.value.positionBy.toString(),
    content: t.value && t.value.content && t.value.content.toString(),
    viewport: t.value && t.value.viewport && t.value.viewport.toString(),
    customClass: t.value && t.value.customClass && t.value.customClass.toString(),
    enterable: s,
    placement: l,
    trigger: o
  }), i = document.createElement("div");
  ce(a, i), e[nt] = i;
}, At = (e) => {
  const t = e[nt];
  t && ce(null, t), delete e[nt];
}, xs = (e, t) => {
  t.value !== t.oldValue && Rt(e, t);
}, Bs = { mounted: Rt, unmounted: At, updated: xs };
function fe(e, t = "body", n = {}) {
  this.el = e, this.opts = { ...fe.DEFAULTS, ...n }, this.opts.target = t, t === "body" ? this.scrollElement = window : this.scrollElement = document.querySelector(`[id=${t}]`), this.selector = "li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.scrollElement && (this.refresh(), this.process());
}
fe.DEFAULTS = {
  offset: 10,
  callback: (e) => 0
};
fe.prototype.getScrollHeight = function() {
  return this.scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
};
fe.prototype.refresh = function() {
  this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
  const e = [...this.el.querySelectorAll(this.selector)], t = this.scrollElement === window;
  e.map((n) => {
    const l = n.getAttribute("href");
    if (/^#./.test(l)) {
      const s = (t ? document : this.scrollElement).querySelector(`[id='${l.slice(1)}']`);
      return [t ? s.getBoundingClientRect().top : s.offsetTop, l];
    } else
      return null;
  }).filter((n) => n).sort((n, l) => n[0] - l[0]).forEach((n) => {
    this.offsets.push(n[0]), this.targets.push(n[1]);
  });
};
fe.prototype.process = function() {
  const e = this.scrollElement === window, t = (e ? window.pageYOffset : this.scrollElement.scrollTop) + this.opts.offset, n = this.getScrollHeight(), l = e ? it().height : this.scrollElement.getBoundingClientRect().height, o = this.opts.offset + n - l, s = this.offsets, a = this.targets, i = this.activeTarget;
  let d;
  if (this.scrollHeight !== n && this.refresh(), t >= o)
    return i !== (d = a[a.length - 1]) && this.activate(d);
  if (i && t < s[0])
    return this.activeTarget = null, this.clear();
  for (d = s.length; d--; )
    i !== a[d] && t >= s[d] && (s[d + 1] === void 0 || t < s[d + 1]) && this.activate(a[d]);
};
fe.prototype.activate = function(e) {
  this.activeTarget = e, this.clear();
  const t = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', n = this.opts.callback;
  [...this.el.querySelectorAll(t)].forEach((o) => {
    Xe(o, "li").forEach((s) => {
      H(s, "active"), n(s);
    }), Xe(o, ".dropdown-menu").length && H(hn(o, "li.dropdown"), "active");
  });
};
fe.prototype.clear = function() {
  [...this.el.querySelectorAll(this.selector)].forEach((t) => {
    Xe(t, ".active", this.opts.target).forEach((n) => {
      Z(n, "active");
    });
  });
};
const lt = "_uiv_scrollspy_instance", Ft = [w.RESIZE, w.SCROLL], Ut = (e, t) => {
  zt(e);
}, Ht = (e, t) => {
  const n = new fe(e, t.arg, t.value);
  n.scrollElement && (n.handler = () => {
    n.process();
  }, Ft.forEach((l) => {
    P(n.scrollElement, l, n.handler);
  })), e[lt] = n;
}, zt = (e) => {
  const t = e[lt];
  t && t.scrollElement && (Ft.forEach((n) => {
    _(t.scrollElement, n, t.handler);
  }), delete e[lt]);
}, Is = (e, t) => {
  const n = t.arg !== t.oldArg, l = t.value !== t.oldValue;
  (n || l) && (Ut(e), Ht(e, t));
}, Vs = {
  beforeMount: Ut,
  mounted: Ht,
  updated: Is,
  unmounted: zt
}, pt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  tooltip: Os,
  popover: Bs,
  scrollspy: Vs
}, Symbol.toStringTag, { value: "Module" })), X = {
  ALERT: 0,
  CONFIRM: 1,
  PROMPT: 2
}, Ns = ["innerHTML"], Ms = { key: 1 }, _s = { key: 2 }, Ls = ["type", "onKeyup"], Ps = {
  __name: "MessageBox",
  props: {
    backdrop: { type: null, default: void 0 },
    title: { type: String, default: void 0 },
    content: { type: String, default: void 0 },
    html: { type: Boolean, default: !1 },
    okText: { type: String, default: void 0 },
    okType: { type: String, default: "primary" },
    cancelText: { type: String, default: void 0 },
    cancelType: { type: String, default: "default" },
    type: { type: Number, default: 0 },
    size: { type: String, default: "sm" },
    cb: { type: Function, required: !0 },
    validator: {
      type: Function,
      default: () => null
    },
    customClass: { type: null, default: void 0 },
    defaultValue: { type: String, default: void 0 },
    inputType: { type: String, default: "text" },
    autoFocus: { type: String, default: "ok" },
    reverseButtons: { type: Boolean, default: !1 }
  },
  setup(e) {
    var g;
    const t = e, n = L(!0), l = L((g = t.defaultValue) != null ? g : ""), o = L(!1), s = L(null), a = R(
      () => J(t.backdrop) ? !!t.backdrop : t.type !== X.ALERT
    ), i = R(() => t.validator(l.value)), d = R(() => o.value && i.value), p = R(() => t.okText || se("uiv.modal.ok")), f = R(() => t.cancelText || se("uiv.modal.cancel"));
    function m(k) {
      var y;
      (y = s.value) == null || y.hideModal(k);
    }
    function c() {
      o.value = !0, J(i.value) || m({ value: l.value });
    }
    return (k, y) => (u(), Y($t, {
      ref_key: "modal",
      ref: s,
      modelValue: n.value,
      "onUpdate:modelValue": y[7] || (y[7] = (v) => n.value = v),
      "auto-focus": "",
      size: e.size,
      title: e.title,
      header: !!e.title,
      backdrop: $(a),
      "cancel-text": e.cancelText,
      "ok-text": e.okText,
      class: C(e.customClass),
      onHide: e.cb
    }, Zt({
      default: O(() => [
        e.html ? (u(), h("div", {
          key: 0,
          innerHTML: e.content
        }, null, 8, Ns)) : (u(), h("p", Ms, I(e.content), 1)),
        e.type === $(X).PROMPT ? (u(), h("div", _s, [
          r("div", {
            class: C(["form-group", { "has-error": $(d) }])
          }, [
            te(r("input", {
              "onUpdate:modelValue": y[0] || (y[0] = (v) => l.value = v),
              type: e.inputType,
              class: "form-control",
              required: "",
              "data-action": "auto-focus",
              onChange: y[1] || (y[1] = (v) => o.value = !0),
              onKeyup: W(c, ["enter"])
            }, null, 40, Ls), [
              [Jt, l.value]
            ]),
            te(r("span", { class: "help-block" }, I($(i)), 513), [
              [ye, $(d)]
            ])
          ], 2)
        ])) : N("", !0)
      ]),
      _: 2
    }, [
      e.type === $(X).ALERT ? {
        name: "footer",
        fn: O(() => [
          B(D, {
            type: e.okType,
            "data-action": e.autoFocus === "ok" ? "auto-focus" : "",
            onClick: y[2] || (y[2] = (v) => m("ok"))
          }, {
            default: O(() => [
              q(I($(p)), 1)
            ]),
            _: 1
          }, 8, ["type", "data-action"])
        ])
      } : {
        name: "footer",
        fn: O(() => [
          e.reverseButtons ? (u(), h(F, { key: 0 }, [
            e.type === $(X).CONFIRM ? (u(), Y(D, {
              key: 0,
              type: e.okType,
              "data-action": e.autoFocus === "ok" ? "auto-focus" : "",
              onClick: y[3] || (y[3] = (v) => m("ok"))
            }, {
              default: O(() => [
                q(I($(p)), 1)
              ]),
              _: 1
            }, 8, ["type", "data-action"])) : (u(), Y(D, {
              key: 1,
              type: e.okType,
              onClick: c
            }, {
              default: O(() => [
                q(I($(p)), 1)
              ]),
              _: 1
            }, 8, ["type"])),
            B(D, {
              type: e.cancelType,
              "data-action": e.autoFocus === "cancel" ? "auto-focus" : "",
              onClick: y[4] || (y[4] = (v) => m("cancel"))
            }, {
              default: O(() => [
                q(I($(f)), 1)
              ]),
              _: 1
            }, 8, ["type", "data-action"])
          ], 64)) : (u(), h(F, { key: 1 }, [
            B(D, {
              type: e.cancelType,
              "data-action": e.autoFocus === "cancel" ? "auto-focus" : "",
              onClick: y[5] || (y[5] = (v) => m("cancel"))
            }, {
              default: O(() => [
                q(I($(f)), 1)
              ]),
              _: 1
            }, 8, ["type", "data-action"]),
            e.type === $(X).CONFIRM ? (u(), Y(D, {
              key: 0,
              type: e.okType,
              "data-action": e.autoFocus === "ok" ? "auto-focus" : "",
              onClick: y[6] || (y[6] = (v) => m("ok"))
            }, {
              default: O(() => [
                q(I($(p)), 1)
              ]),
              _: 1
            }, 8, ["type", "data-action"])) : (u(), Y(D, {
              key: 1,
              type: e.okType,
              onClick: c
            }, {
              default: O(() => [
                q(I($(p)), 1)
              ]),
              _: 1
            }, 8, ["type"]))
          ], 64))
        ])
      }
    ]), 1032, ["modelValue", "size", "title", "header", "backdrop", "cancel-text", "ok-text", "class", "onHide"]));
  }
}, Ds = (e) => {
  ce(null, e);
}, Ve = (e, t) => e === X.CONFIRM ? t === "ok" : J(t) && ue(t.value), Rs = function(e, t, n, l = null, o = null) {
  const s = document.createElement("div"), a = $e(Ps, {
    type: e,
    ...t,
    cb(i) {
      Ds(s), he(n) ? e === X.CONFIRM ? Ve(e, i) ? n(null, i) : n(i) : e === X.PROMPT && Ve(e, i) ? n(null, i.value) : n(i) : l && o && (e === X.CONFIRM ? Ve(e, i) ? l(i) : o(i) : e === X.PROMPT ? Ve(e, i) ? l(i.value) : o(i) : l(i));
    }
  });
  ce(a, s), document.body.appendChild(s.firstElementChild);
}, at = function(e, t = {}, n) {
  return new Promise((l, o) => {
    Rs.apply(this, [e, t, n, l, o]);
  });
}, As = function(e, t) {
  return at.apply(this, [X.ALERT, e, t]);
}, Fs = function(e, t) {
  return at.apply(this, [X.CONFIRM, e, t]);
}, Us = function(e, t) {
  return at.apply(this, [X.PROMPT, e, t]);
}, Hs = { alert: As, confirm: Fs, prompt: Us }, Ne = {
  SUCCESS: "success",
  INFO: "info",
  DANGER: "danger",
  WARNING: "warning"
}, re = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right"
}, mt = "in", Ce = "glyphicon", yt = 300, gt = 300, zs = {
  components: { Alert: Bt },
  props: {
    title: { type: String, default: void 0 },
    content: { type: String, default: void 0 },
    html: {
      type: Boolean,
      default: !1
    },
    duration: {
      type: Number,
      default: 5e3
    },
    dismissible: {
      type: Boolean,
      default: !0
    },
    type: { type: String, default: void 0 },
    placement: { type: String, default: void 0 },
    icon: { type: String, default: void 0 },
    customClass: { type: null, default: void 0 },
    cb: {
      type: Function,
      required: !0
    },
    queue: {
      type: Array,
      required: !0
    },
    offsetY: {
      type: Number,
      default: 15
    },
    offsetX: {
      type: Number,
      default: 15
    },
    offset: {
      type: Number,
      default: 15
    }
  },
  data() {
    return {
      height: 0,
      top: 0,
      horizontal: this.placement === re.TOP_LEFT || this.placement === re.BOTTOM_LEFT ? "left" : "right",
      vertical: this.placement === re.TOP_LEFT || this.placement === re.TOP_RIGHT ? "top" : "bottom"
    };
  },
  computed: {
    styles() {
      const e = this.queue, t = e.findIndex((n) => n._.uid === this._.uid);
      return {
        position: "fixed",
        [this.vertical]: `${this.getTotalHeightOfQueue(e, t)}px`,
        width: `${yt}px`,
        transition: `all ${gt / 1e3}s ease-in-out`
      };
    },
    icons() {
      if (ue(this.icon))
        return this.icon;
      switch (this.type) {
        case Ne.INFO:
        case Ne.WARNING:
          return `${Ce} ${Ce}-info-sign`;
        case Ne.SUCCESS:
          return `${Ce} ${Ce}-ok-sign`;
        case Ne.DANGER:
          return `${Ce} ${Ce}-remove-sign`;
        default:
          return null;
      }
    }
  },
  created() {
    this.top = this.getTotalHeightOfQueue(this.queue);
  },
  mounted() {
    const e = this.$el;
    e.style[this.vertical] = this.top + "px", this.$nextTick(() => {
      e.style[this.horizontal] = `-${yt}px`, this.height = e.offsetHeight, e.style[this.horizontal] = `${this.offsetX}px`, H(e, mt);
    });
  },
  methods: {
    getTotalHeightOfQueue(e, t = e.length) {
      let n = this.offsetY;
      for (let l = 0; l < t; l++)
        n += e[l].height + this.offset;
      return n;
    },
    onDismissed() {
      Z(this.$el, mt), setTimeout(this.cb, gt);
    }
  }
}, Ks = {
  class: "media",
  style: { margin: "0" }
}, Ys = {
  key: 0,
  class: "media-left"
}, Ws = { class: "media-body" }, qs = {
  key: 0,
  class: "media-heading"
}, Gs = ["innerHTML"], js = { key: 2 };
function Zs(e, t, n, l, o, s) {
  const a = ve("alert");
  return u(), Y(a, {
    class: C(["fade", n.customClass]),
    style: ge(s.styles),
    type: n.type,
    duration: n.duration,
    dismissible: n.dismissible,
    onDismissed: s.onDismissed
  }, {
    default: O(() => [
      r("div", Ks, [
        s.icons ? (u(), h("div", Ys, [
          r("span", {
            class: C(s.icons),
            style: { "font-size": "1.5em" }
          }, null, 2)
        ])) : N("", !0),
        r("div", Ws, [
          n.title ? (u(), h("div", qs, [
            r("b", null, I(n.title), 1)
          ])) : N("", !0),
          n.html ? (u(), h("div", {
            key: 1,
            innerHTML: n.content
          }, null, 8, Gs)) : (u(), h("div", js, I(n.content), 1))
        ])
      ])
    ]),
    _: 1
  }, 8, ["class", "style", "type", "duration", "dismissible", "onDismissed"]);
}
const Js = /* @__PURE__ */ Te(zs, [["render", Zs]]), _e = Re({
  [re.TOP_LEFT]: [],
  [re.TOP_RIGHT]: [],
  [re.BOTTOM_LEFT]: [],
  [re.BOTTOM_RIGHT]: []
}), Xs = (e, { vNode: t, container: n }) => {
  ce(null, n), ot(e, t.component.ctx);
}, Qs = (e, t, n = null, l = null) => {
  const o = document.createElement("div"), s = e.placement, a = _e[s];
  if (!J(a))
    return;
  e.type === "error" && (e.type = "danger");
  const i = $e(Js, {
    queue: a,
    placement: s,
    ...e,
    cb(d) {
      Xs(a, { vNode: i, container: o }), he(t) ? t(d) : n && l && n(d);
    }
  });
  ce(i, o), document.body.appendChild(o.firstElementChild), a.push(i.component.ctx);
}, st = (e = {}, t) => (ue(e) && (e = {
  content: e
}), J(e.placement) || (e.placement = re.TOP_RIGHT), new Promise((n, l) => {
  Qs(e, t, n, l);
}));
function we(e, t) {
  ue(t) ? st({
    content: t,
    type: e
  }) : st({ ...t, type: e });
}
const eo = Object.defineProperties(st, {
  success: {
    configurable: !1,
    writable: !1,
    value(e) {
      we("success", e);
    }
  },
  info: {
    configurable: !1,
    writable: !1,
    value(e) {
      we("info", e);
    }
  },
  warning: {
    configurable: !1,
    writable: !1,
    value(e) {
      we("warning", e);
    }
  },
  danger: {
    configurable: !1,
    writable: !1,
    value(e) {
      we("danger", e);
    }
  },
  error: {
    configurable: !1,
    writable: !1,
    value(e) {
      we("danger", e);
    }
  },
  dismissAll: {
    configurable: !1,
    writable: !1,
    value() {
      for (const e in _e)
        Fe(_e, e) && _e[e].forEach((t) => {
          t.onDismissed();
        });
    }
  }
}), to = { notify: eo }, vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MessageBox: Hs,
  Notification: to
}, Symbol.toStringTag, { value: "Module" })), lo = (e, t = {}) => {
  ct.use(t.locale), ct.i18n(t.i18n), Object.keys(ft).forEach((n) => {
    const l = t.prefix ? t.prefix + n : n;
    e.component(l, ft[n]);
  }), Object.keys(pt).forEach((n) => {
    const l = t.prefix ? t.prefix + "-" + n : n;
    e.directive(l, pt[n]);
  }), Object.keys(vt).forEach((n) => {
    const l = vt[n];
    Object.keys(l).forEach((o) => {
      const s = t.prefix ? t.prefix + "_" + o : o;
      e.config.globalProperties["$" + s] = l[o];
    });
  });
};
export {
  hl as Affix,
  Bt as Alert,
  Lt as BreadcrumbItem,
  es as Breadcrumbs,
  D as Btn,
  wt as BtnGroup,
  ns as BtnToolbar,
  ln as Carousel,
  Tt as Collapse,
  ul as DatePicker,
  Ue as Dropdown,
  Hs as MessageBox,
  $t as Modal,
  ms as MultiSelect,
  Ts as Navbar,
  Ss as NavbarForm,
  ws as NavbarNav,
  $s as NavbarText,
  to as Notification,
  xl as Pagination,
  Nt as Popover,
  Jl as ProgressBar,
  _t as ProgressBarStack,
  an as Slide,
  Mn as Tab,
  Un as Tabs,
  Kl as TimePicker,
  Vt as Tooltip,
  Gl as Typeahead,
  lo as install,
  Bs as popover,
  Vs as scrollspy,
  Os as tooltip
};
