import { ref as P, reactive as Re, watch as ie, onMounted as de, onBeforeUnmount as Ae, openBlock as u, createElementBlock as h, renderSlot as V, unref as $, createElementVNode as r, Fragment as F, renderList as j, normalizeClass as k, createCommentVNode as N, withModifiers as M, nextTick as Pe, getCurrentInstance as Yt, onBeforeMount as Wt, defineComponent as bt, h as Se, createVNode as B, Teleport as Ct, computed as R, createBlock as Y, resolveDynamicComponent as kt, withCtx as O, resolveComponent as $e, createTextVNode as q, toDisplayString as I, withDirectives as te, vShow as ye, normalizeStyle as ge, onUnmounted as qt, withKeys as W, vModelText as Ze, useSlots as Gt, normalizeProps as jt, mergeProps as Zt, render as ce, createSlots as Jt, vModelDynamic as Xt } from "vue";
function J(e) {
  return typeof e < "u" && e !== null;
}
function he(e) {
  return typeof e == "function";
}
function we(e) {
  return typeof e == "number";
}
function ue(e) {
  return typeof e == "string";
}
function Fe(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
const Qt = { class: "carousel-indicators" }, el = ["onClick"], tl = {
  class: "carousel-inner",
  role: "listbox"
}, ll = /* @__PURE__ */ r("span", { class: "sr-only" }, "Previous", -1), nl = /* @__PURE__ */ r("span", { class: "sr-only" }, "Next", -1), sl = {
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
  setup(e, { expose: t, emit: l }) {
    const n = e;
    let o = P(0), s = 0, a = 0;
    const i = Re([]);
    function d(b, S) {
      const x = S || 0;
      let C;
      b > x ? C = ["next", "left"] : C = ["prev", "right"], i[b].exposed.slideClass[C[0]] = !0, Pe(() => {
        i[b].vnode.el.offsetHeight, i.forEach((E, z) => {
          z === x ? (E.exposed.slideClass.active = !0, E.exposed.slideClass[C[1]] = !0) : z === b && (E.exposed.slideClass[C[1]] = !0);
        }), s = setTimeout(() => {
          c(b), l("change", b), s = 0;
        }, 600);
      });
    }
    function p() {
      f(), n.interval > 0 && (a = setInterval(() => {
        v();
      }, n.interval));
    }
    function f() {
      clearInterval(a), a = 0;
    }
    function m() {
      i.forEach((b) => {
        b.exposed.slideClass.active = !1, b.exposed.slideClass.left = !1, b.exposed.slideClass.right = !1, b.exposed.slideClass.next = !1, b.exposed.slideClass.prev = !1;
      });
    }
    function c(b) {
      m(), i[b].exposed.slideClass.active = !0;
    }
    function y(b) {
      s !== 0 || b === o.value || (J(n.modelValue) ? l("update:modelValue", b) : (d(b, o.value), o.value = b));
    }
    function g() {
      y(o.value === 0 ? i.length - 1 : o.value - 1);
    }
    function v() {
      y(o.value === i.length - 1 ? 0 : o.value + 1);
    }
    return ie(
      () => n.interval,
      () => {
        p();
      }
    ), ie(
      () => n.modelValue,
      (b, S) => {
        d(b, S), o.value = b;
      }
    ), de(() => {
      J(n.modelValue) && (o.value = n.modelValue), i.length > 0 && c(o.value), p();
    }), Ae(() => {
      f();
    }), t({
      slides: i
    }), (b, S) => (u(), h("div", {
      class: "carousel slide",
      "data-ride": "carousel",
      onMouseenter: f,
      onMouseleave: p
    }, [
      e.indicators ? V(b.$slots, "indicators", {
        key: 0,
        select: y,
        activeIndex: $(o)
      }, () => [
        r("ol", Qt, [
          (u(!0), h(F, null, j(i, (x, C) => (u(), h("li", {
            key: C,
            class: k({ active: C === $(o) }),
            onClick: (E) => y(C)
          }, null, 10, el))), 128))
        ])
      ]) : N("", !0),
      r("div", tl, [
        V(b.$slots, "default")
      ]),
      e.controls ? (u(), h("a", {
        key: 1,
        class: "left carousel-control",
        href: "#",
        role: "button",
        onClick: S[0] || (S[0] = M((x) => g(), ["prevent"]))
      }, [
        r("span", {
          class: k(e.iconControlLeft),
          "aria-hidden": "true"
        }, null, 2),
        ll
      ])) : N("", !0),
      e.controls ? (u(), h("a", {
        key: 2,
        class: "right carousel-control",
        href: "#",
        role: "button",
        onClick: S[1] || (S[1] = M((x) => v(), ["prevent"]))
      }, [
        r("span", {
          class: k(e.iconControlRight),
          "aria-hidden": "true"
        }, null, 2),
        nl
      ])) : N("", !0)
    ], 32));
  }
};
function ot(e, t) {
  if (Array.isArray(e)) {
    const l = e.indexOf(t);
    l >= 0 && e.splice(l, 1);
  }
}
function ol(e, t = 0, l = 1) {
  const n = [];
  for (let o = t; o < e; o += l)
    n.push(o);
  return n;
}
function il(e, t, l) {
  return l.indexOf(e) === t;
}
const al = {
  __name: "Slide",
  setup(e, { expose: t }) {
    const l = Yt(), n = Re({
      active: !1,
      prev: !1,
      next: !1,
      left: !1,
      right: !1
    });
    return Wt(() => {
      var o, s, a;
      (a = (s = (o = l.parent) == null ? void 0 : o.exposed) == null ? void 0 : s.slides) == null || a.push(l);
    }), Ae(() => {
      var o, s;
      ot((s = (o = l.parent) == null ? void 0 : o.exposed) == null ? void 0 : s.slides, l);
    }), t({
      slideClass: n
    }), (o, s) => (u(), h("div", {
      class: k(["item", n])
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
function rl(e = !1) {
  const t = it();
  if (Be !== null && !e && t.height === He.height && t.width === He.width)
    return Be;
  if (document.readyState === "loading")
    return null;
  const l = document.createElement("div"), n = document.createElement("div");
  return l.style.width = n.style.width = l.style.height = n.style.height = "100px", l.style.overflow = "scroll", n.style.overflow = "hidden", document.body.appendChild(l), document.body.appendChild(n), Be = Math.abs(l.scrollHeight - n.scrollHeight), document.body.removeChild(l), document.body.removeChild(n), He = t, Be;
}
function L(e, t, l) {
  e.addEventListener(t, l);
}
function _(e, t, l) {
  e.removeEventListener(t, l);
}
function le(e) {
  return e && e.nodeType === Node.ELEMENT_NODE;
}
function ae(e) {
  le(e) && le(e.parentNode) && e.parentNode.removeChild(e);
}
function H(e, t) {
  le(e) && e.classList.add(t);
}
function Z(e, t) {
  le(e) && e.classList.remove(t);
}
function ul(e, t) {
  return le(e) ? e.classList.contains(t) : !1;
}
function dl(e, t, l = {}) {
  const n = document.documentElement, o = (window.pageXOffset || n.scrollLeft) - (n.clientLeft || 0), s = (window.pageYOffset || n.scrollTop) - (n.clientTop || 0), a = t.getBoundingClientRect(), i = e.getBoundingClientRect();
  if (e.style.right = "auto", e.style.bottom = "auto", l.menuRight) {
    const d = o + a.left + a.width - i.width;
    e.style.left = d < 0 ? 0 : d + "px";
  } else
    e.style.left = o + a.left + "px";
  l.dropup ? e.style.top = s + a.top - i.height - 4 + "px" : e.style.top = s + a.top + a.height + "px";
}
function rt(e, t, l) {
  const n = e.getBoundingClientRect(), o = t.getBoundingClientRect(), s = it();
  let a = !0, i = !0, d = !0, p = !0;
  switch (l) {
    case G.TOP:
      a = n.top >= o.height, p = n.left + n.width / 2 >= o.width / 2, i = n.right - n.width / 2 + o.width / 2 <= s.width;
      break;
    case G.BOTTOM:
      d = n.bottom + o.height <= s.height, p = n.left + n.width / 2 >= o.width / 2, i = n.right - n.width / 2 + o.width / 2 <= s.width;
      break;
    case G.RIGHT:
      i = n.right + o.width <= s.width, a = n.top + n.height / 2 >= o.height / 2, d = n.bottom - n.height / 2 + o.height / 2 <= s.height;
      break;
    case G.LEFT:
      p = n.left >= o.width, a = n.top + n.height / 2 >= o.height / 2, d = n.bottom - n.height / 2 + o.height / 2 <= s.height;
      break;
  }
  return a && i && d && p;
}
function cl(e, t, l, n, o, s, a) {
  if (!le(e) || !le(t))
    return;
  const i = e && e.className && e.className.indexOf("popover") >= 0;
  let d, p;
  if (!J(o) || o === "body" || s === "body") {
    const v = document.documentElement;
    p = (window.pageXOffset || v.scrollLeft) - (v.clientLeft || 0), d = (window.pageYOffset || v.scrollTop) - (v.clientTop || 0);
  } else {
    const v = Le(s || o);
    p = v.scrollLeft, d = v.scrollTop;
  }
  if (n) {
    const v = [
      G.RIGHT,
      G.BOTTOM,
      G.LEFT,
      G.TOP
    ], b = (S) => {
      v.forEach((x) => {
        Z(e, x);
      }), H(e, S);
    };
    if (!rt(t, e, l)) {
      for (let S = 0, x = v.length; S < x; S++)
        if (b(v[S]), rt(t, e, v[S])) {
          l = v[S];
          break;
        }
      b(l);
    }
  }
  const f = t.getBoundingClientRect(), m = e.getBoundingClientRect();
  let c, y;
  l === G.BOTTOM ? (c = d + f.top + f.height, y = p + f.left + f.width / 2 - m.width / 2) : l === G.LEFT ? (c = d + f.top + f.height / 2 - m.height / 2, y = p + f.left - m.width) : l === G.RIGHT ? (c = d + f.top + f.height / 2 - m.height / 2, y = p + f.left + f.width + 1) : (c = d + f.top - m.height, y = p + f.left + f.width / 2 - m.width / 2);
  let g;
  if (ue(a) ? g = document.querySelector(a) : he(a) && (g = a(t)), le(g)) {
    const v = i ? 11 : 0, b = g.getBoundingClientRect(), S = d + b.top, x = p + b.left, C = S + b.height, E = x + b.width;
    c < S ? c = S : c + m.height > C && (c = C - m.height), y < x ? y = x : y + m.width > E && (y = E - m.width), l === G.BOTTOM ? c -= v : l === G.LEFT ? y += v : l === G.RIGHT ? y -= v : c += v;
  }
  e.style.top = `${c}px`, e.style.left = `${y}px`;
}
function ut(e) {
  const t = "scroll", l = e.scrollHeight > e.clientHeight, n = Je(e);
  return l || n.overflow === t || n.overflowY === t;
}
function ze(e) {
  const t = "modal-open", l = ".navbar-fixed-top, .navbar-fixed-bottom", n = document.body;
  if (e)
    Z(n, t), n.style.paddingRight = null, [...document.querySelectorAll(l)].forEach((o) => {
      o.style.paddingRight = null;
    });
  else {
    if (ut(document.documentElement) || ut(document.body)) {
      const s = rl();
      n.style.paddingRight = `${s}px`, [...document.querySelectorAll(l)].forEach((a) => {
        a.style.paddingRight = `${s}px`;
      });
    }
    H(n, t);
  }
}
function hl(e, t) {
  return le(e) ? e.closest(t) : null;
}
function Xe(e, t, l = null) {
  const n = [];
  let o = e.parentElement;
  for (; o; ) {
    if (o.matches(t))
      n.push(o);
    else if (l && (l === o || o.matches(l)))
      break;
    o = o.parentElement;
  }
  return n;
}
function Ke(e) {
  le(e) && (e.getAttribute("tabindex") || e.setAttribute("tabindex", "-1"), e.focus());
}
const fl = "modal-backdrop";
function Tt() {
  return document.querySelectorAll(`.${fl}`);
}
function Me() {
  return Tt().length;
}
function Le(e) {
  return ue(e) ? document.querySelector(e) : le(e) ? e : le(e.$el) ? e.$el : null;
}
const wt = bt({
  props: {
    tag: { type: String, default: "div" },
    modelValue: { type: Boolean, default: !1 },
    transition: { type: Number, default: 350 }
  },
  emits: ["show", "shown", "hide", "hidden"],
  setup(e, { emit: t, slots: l }) {
    const n = "collapse", o = "in", s = "collapsing";
    let a = 0;
    const i = P(null);
    function d() {
      const p = e.modelValue, f = i.value;
      if (clearTimeout(a), !!f)
        if (p) {
          t("show"), Z(f, n), f.style.height = "auto";
          const m = window.getComputedStyle(f).height;
          f.style.height = null, H(f, s), f.offsetHeight, f.style.height = m, a = setTimeout(() => {
            Z(f, s), H(f, n), H(f, o), f.style.height = null, a = 0, t("shown");
          }, e.transition);
        } else
          t("hide"), f.style.height = window.getComputedStyle(f).height, Z(f, o), Z(f, n), f.offsetHeight, f.style.height = null, H(f, s), a = setTimeout(() => {
            H(f, n), Z(f, s), f.style.height = null, a = 0, t("hidden");
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
      return Se(e.tag, { ref: i, class: n }, (p = l.default) == null ? void 0 : p.call(l));
    };
  }
}), dt = "div", Ue = /* @__PURE__ */ bt({
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
    slots: l
  }) {
    const n = P(!1), o = P(void 0), s = P(null), a = P(null);
    function i() {
      var c;
      return (c = s.value) == null ? void 0 : c.querySelector("li > a:focus");
    }
    function d(c) {
      var y, g;
      if (n.value) {
        const v = s.value, b = c.keyCode;
        if (b === 27)
          f(!1), (y = o.value) == null || y.focus();
        else if (b === 13)
          (g = i()) == null || g.click();
        else if (b === 38 || b === 40) {
          c.preventDefault(), c.stopPropagation();
          const S = i(), x = v.querySelectorAll("li:not(.disabled) > a");
          if (!S)
            Ke(x[0]);
          else
            for (let C = 0; C < x.length; C++)
              if (S === x[C]) {
                b === 38 && C < x.length > 0 ? Ke(x[C - 1]) : b === 40 && C < x.length - 1 && Ke(x[C + 1]);
                break;
              }
        }
      }
    }
    function p() {
      var y, g, v;
      const c = ((y = a.value) == null ? void 0 : y.querySelector('[data-role="trigger"]')) || ((g = a.value) == null ? void 0 : g.querySelector(".dropdown-toggle")) || ((v = a.value) == null ? void 0 : v.firstChild);
      o.value = c && c !== s.value ? c : null;
    }
    function f(c) {
      var y;
      if (!e.disabled) {
        if (typeof c == "boolean" ? n.value = c : n.value = !n.value, e.appendToBody)
          if (n.value) {
            s.value.style.display = "block";
            const g = e.positionElement || a.value;
            dl(s.value, g, e);
          } else
            (y = s.value) == null || y.removeAttribute("style");
        t("update:modelValue", n.value);
      }
    }
    function m(c) {
      var g, v, b;
      const y = c.target;
      if (n.value && y) {
        let S = !1;
        if (e.notCloseElements)
          for (let z = 0, U = e.notCloseElements.length; z < U; z++) {
            const A = e.notCloseElements[z].contains(y);
            let oe = A;
            if (e.appendToBody) {
              const pe = (g = s.value) == null ? void 0 : g.contains(y), T = e.notCloseElements.indexOf(a.value) >= 0;
              oe = A || pe && T;
            }
            if (oe) {
              S = !0;
              break;
            }
          }
        const x = (v = s.value) == null ? void 0 : v.contains(y), C = ((b = a.value) == null ? void 0 : b.contains(y)) && !x, E = x && c.type === "touchend";
        !C && !S && !E && f(!1);
      }
    }
    return de(() => {
      p(), o.value && (L(o.value, w.CLICK, f), L(o.value, w.KEY_DOWN, d)), L(s.value, w.KEY_DOWN, d), L(window, w.CLICK, m), L(window, w.TOUCH_END, m), e.modelValue && f(!0);
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
          open: n.value
        }
      }, {
        default: () => {
          var y;
          return [(y = l.default) == null ? void 0 : y.call(l), B(Ct, {
            to: "body",
            disabled: !e.appendToBody || !n.value
          }, {
            default: () => {
              var g;
              return [B("ul", {
                ref: s,
                class: {
                  "dropdown-menu": !0,
                  "dropdown-menu-right": e.menuRight
                }
              }, [(g = l.dropdown) == null ? void 0 : g.call(l)])];
            }
          })];
        }
      });
    };
  }
}), pl = {
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
let Qe = pl, et = function() {
  return "$t" in this ? this.$t.apply(this, arguments) : null;
};
const se = function(e, t) {
  t = t || {};
  let l;
  try {
    if (l = et.apply(this, arguments), J(l) && !t.$$locale)
      return l;
  } catch {
  }
  const n = e.split(".");
  let o = t.$$locale || Qe;
  for (let s = 0, a = n.length; s < a; s++) {
    const i = n[s];
    if (l = o[i], s === a - 1)
      return l;
    if (!l)
      return "";
    o = l;
  }
  return "";
}, ml = function(e) {
  Qe = e || Qe;
}, yl = function(e) {
  et = e || et;
}, ct = { use: ml, t: se, i18n: yl }, St = {
  __name: "BtnGroup",
  props: {
    size: { type: String, default: void 0 },
    vertical: { type: Boolean, default: !1 },
    justified: { type: Boolean, default: !1 }
  },
  setup(e) {
    return (t, l) => (u(), h("div", {
      class: k({
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
}, $t = {
  // <a> props
  href: { type: String, default: void 0 },
  target: { type: String, default: void 0 },
  // <router-link> props
  to: { type: null, default: void 0 },
  replace: { type: Boolean, default: !1 },
  append: { type: Boolean, default: !1 },
  exact: { type: Boolean, default: !1 }
}, gl = ["href", "target"], vl = ["type", "checked", "disabled"], bl = ["type", "disabled"], Cl = ["type", "disabled"], D = {
  __name: "Btn",
  props: {
    ...$t,
    justified: { type: Boolean, default: !1 },
    type: { type: String, default: "default" },
    nativeType: { type: String, default: "button" },
    size: { type: String, default: void 0 },
    block: { type: Boolean, default: !1 },
    active: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    // <input> props
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
    const l = e, n = R(
      () => l.inputType === "checkbox" ? l.modelValue.indexOf(l.inputValue) >= 0 : l.modelValue === l.inputValue
    ), o = R(() => ({
      btn: !0,
      active: l.inputType ? n.value : l.active,
      disabled: l.disabled,
      "btn-block": l.block,
      [`btn-${l.type}`]: !!l.type,
      [`btn-${l.size}`]: !!l.size
    }));
    function s(i) {
      l.disabled && i instanceof Event && (i.preventDefault(), i.stopPropagation());
    }
    function a() {
      if (l.inputType === "checkbox") {
        const i = l.modelValue.slice();
        n.value ? i.splice(i.indexOf(l.inputValue), 1) : i.push(l.inputValue), t("update:modelValue", i);
      } else
        t("update:modelValue", l.inputValue);
    }
    return (i, d) => i.href ? (u(), h("a", {
      key: 0,
      href: i.href,
      target: i.target,
      role: "button",
      class: k($(o)),
      onClick: s
    }, [
      V(i.$slots, "default")
    ], 10, gl)) : i.to ? (u(), Y(kt("RouterLink"), {
      key: 1,
      to: i.to,
      class: k($(o)),
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
      class: k($(o)),
      onClick: s
    }, [
      r("input", {
        autocomplete: "off",
        type: e.inputType,
        checked: $(n),
        disabled: e.disabled,
        onInput: d[0] || (d[0] = M(() => {
        }, ["stop"])),
        onChange: a
      }, null, 40, vl),
      V(i.$slots, "default")
    ], 2)) : e.justified ? (u(), Y(St, { key: 3 }, {
      default: O(() => [
        r("button", {
          class: k($(o)),
          type: e.nativeType,
          disabled: e.disabled,
          onClick: s
        }, [
          V(i.$slots, "default")
        ], 10, bl)
      ]),
      _: 3
    })) : (u(), h("button", {
      key: 4,
      class: k($(o)),
      type: e.nativeType,
      disabled: e.disabled,
      onClick: s
    }, [
      V(i.$slots, "default")
    ], 10, Cl));
  }
}, ke = (e, t) => {
  const l = e.__vccOpts || e;
  for (const [n, o] of t)
    l[n] = o;
  return l;
}, Ie = "in", kl = {
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
    ae(this.$refs.backdrop), L(window, w.MOUSE_DOWN, this.suppressBackgroundClose), L(window, w.KEY_UP, this.onKeyPress), this.modelValue && this.$toggle(!0);
  },
  beforeUnmount() {
    clearTimeout(this.timeoutId), ae(this.$refs.backdrop), ae(this.$el), Me() === 0 && ze(!0), _(window, w.MOUSE_DOWN, this.suppressBackgroundClose), _(window, w.MOUSE_UP, this.unsuppressBackgroundClose), _(window, w.KEY_UP, this.onKeyPress);
  },
  methods: {
    t: se,
    onKeyPress(e) {
      if (this.keyboard && this.modelValue && e.keyCode === 27) {
        const t = this.$refs.backdrop;
        let l = t.style.zIndex;
        l = l && l !== "auto" ? parseInt(l) : 0;
        const n = Tt(), o = n.length;
        for (let s = 0; s < o; s++)
          if (n[s] !== t) {
            let a = n[s].style.zIndex;
            if (a = a && a !== "auto" ? parseInt(a) : 0, a > l)
              return;
          }
        this.hideModal();
      }
    },
    hideModal(e) {
      const t = he(this.beforeClose) ? this.beforeClose(e) : !0;
      Promise.resolve(t).then((l) => {
        l && (this.msg = e, this.$emit("update:modelValue", !1));
      });
    },
    $toggle(e) {
      const t = this.$el, l = this.$refs.backdrop;
      clearTimeout(this.timeoutId), e ? this.$nextTick(() => {
        const n = Me();
        if (document.body.appendChild(l), this.appendToBody && document.body.appendChild(t), t.style.display = this.displayStyle, t.scrollTop = 0, l.offsetHeight, ze(!1), H(l, Ie), H(t, Ie), n > 0) {
          const o = parseInt(Je(t).zIndex) || 1050, s = parseInt(Je(l).zIndex) || 1040, a = n * this.zOffset;
          t.style.zIndex = `${o + a}`, l.style.zIndex = `${s + a}`;
        }
        this.timeoutId = setTimeout(() => {
          if (this.autoFocus) {
            const o = this.$el.querySelector('[data-action="auto-focus"]');
            o && (o.focus(), o.setAttribute("data-focused", "true"));
          }
          this.$emit("show"), this.timeoutId = 0;
        }, this.transition);
      }) : (Z(l, Ie), Z(t, Ie), this.timeoutId = setTimeout(() => {
        t.style.display = "none", ae(l), this.appendToBody && ae(t), Me() === 0 && ze(!0), this.$emit("hide", this.msg || "dismiss"), this.msg = "", this.timeoutId = 0, t.style.zIndex = "", l.style.zIndex = "";
      }, this.transition));
    },
    suppressBackgroundClose(e) {
      e && e.target === this.$el || (this.isCloseSuppressed = !0, L(window, "mouseup", this.unsuppressBackgroundClose));
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
}, Tl = { class: "modal-content" }, wl = {
  key: 0,
  class: "modal-header"
}, Sl = /* @__PURE__ */ r("span", { "aria-hidden": "true" }, "×", -1), $l = [
  Sl
], El = { class: "modal-title" }, Ol = { class: "modal-body" }, xl = {
  key: 1,
  class: "modal-footer"
};
function Bl(e, t, l, n, o, s) {
  const a = $e("btn");
  return u(), h("div", {
    tabindex: "-1",
    role: "dialog",
    class: k(["modal", { fade: l.transition > 0 }]),
    onClick: t[3] || (t[3] = M((...i) => s.backdropClicked && s.backdropClicked(...i), ["self"]))
  }, [
    r("div", {
      ref: "dialog",
      class: k(["modal-dialog", s.modalSizeClass]),
      role: "document"
    }, [
      r("div", Tl, [
        l.header ? (u(), h("div", wl, [
          V(e.$slots, "header", {}, () => [
            l.dismissBtn ? (u(), h("button", {
              key: 0,
              type: "button",
              class: "close",
              "aria-label": "Close",
              style: { position: "relative", "z-index": "1060" },
              onClick: t[0] || (t[0] = (i) => s.hideModal())
            }, $l)) : N("", !0),
            r("h4", El, [
              V(e.$slots, "title", {}, () => [
                q(I(l.title), 1)
              ])
            ])
          ])
        ])) : N("", !0),
        r("div", Ol, [
          V(e.$slots, "default")
        ]),
        l.footer ? (u(), h("div", xl, [
          V(e.$slots, "footer", {}, () => [
            B(a, {
              type: l.cancelType,
              onClick: t[1] || (t[1] = (i) => s.hideModal("cancel"))
            }, {
              default: O(() => [
                r("span", null, I(l.cancelText || s.t("uiv.modal.cancel")), 1)
              ]),
              _: 1
            }, 8, ["type"]),
            B(a, {
              type: l.okType,
              "data-action": "auto-focus",
              onClick: t[2] || (t[2] = (i) => s.hideModal("ok"))
            }, {
              default: O(() => [
                r("span", null, I(l.okText || s.t("uiv.modal.ok")), 1)
              ]),
              _: 1
            }, 8, ["type"])
          ])
        ])) : N("", !0)
      ])
    ], 2),
    r("div", {
      ref: "backdrop",
      class: k(["modal-backdrop", { fade: l.transition > 0 }])
    }, null, 2)
  ], 2);
}
const Et = /* @__PURE__ */ ke(kl, [["render", Bl]]), Ye = "active", We = "in";
let Il = 0;
const Vl = {
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
      uid: `tab_${++Il}`,
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
function Nl(e, t, l, n, o, s) {
  return u(), h("div", {
    class: k(["tab-pane", { fade: o.transition > 0 }]),
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
const Ml = /* @__PURE__ */ ke(Vl, [["render", Nl]]), _l = {
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
      // Make v-model not required
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
      return this.tabs.forEach((l) => {
        l.group ? (Fe(t, l.group) ? e[t[l.group]].tabs.push(l) : (e.push({
          tabs: [l],
          group: l.group
        }), t[l.group] = e.length - 1), l.active && (e[t[l.group]].active = !0), l.pullRight && (e[t[l.group]].pullRight = !0)) : e.push(l);
      }), e = e.map((l) => (Array.isArray(l.tabs) && (l.hidden = l.tabs.filter((n) => n.hidden).length === l.tabs.length), l)), e;
    }
  },
  watch: {
    modelValue: {
      handler(e) {
        we(e) && (this.activeIndex = e, this.selectCurrent());
      },
      immediate: !0
    },
    tabs(e) {
      e.forEach((t, l) => {
        t.transition = this.transition, l === this.activeIndex && t.show();
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
      this.tabs.forEach((t, l) => {
        l === this.activeIndex ? (e = !t.active, t.active = !0) : t.active = !1;
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
      we(this.modelValue) ? this.$emit("update:modelValue", e) : (this.activeIndex = e, this.selectCurrent());
    }
  }
}, Pl = /* @__PURE__ */ r("span", { class: "caret" }, null, -1), Ll = ["onClick"], Dl = ["id", "onClick"], Rl = ["onClick", "textContent"], Al = {
  key: 0,
  class: "pull-right"
};
function Fl(e, t, l, n, o, s) {
  const a = $e("dropdown");
  return u(), h("section", null, [
    r("ul", {
      class: k(s.navClasses),
      role: "tablist"
    }, [
      (u(!0), h(F, null, j(s.groupedTabs, (i, d) => (u(), h(F, { key: d }, [
        i.tabs ? te((u(), Y(a, {
          key: 0,
          role: "presentation",
          tag: "li",
          class: k(s.getTabClasses(i))
        }, {
          dropdown: O(() => [
            (u(!0), h(F, null, j(i.tabs, (p, f) => te((u(), h("li", {
              key: `${d}_${f}`,
              class: k(s.getTabClasses(p, !0))
            }, [
              r("a", {
                href: "#",
                onClick: M((m) => s.select(o.tabs.indexOf(p)), ["prevent"])
              }, I(p.title), 9, Ll)
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
              Pl
            ])
          ]),
          _: 2
        }, 1032, ["class"])), [
          [ye, !i.hidden]
        ]) : te((u(), h("li", {
          key: 1,
          role: "presentation",
          class: k(s.getTabClasses(i))
        }, [
          i.$slots.title ? (u(), h("a", {
            key: 0,
            id: i.uid,
            role: "tab",
            href: "#",
            onClick: M((p) => s.select(o.tabs.indexOf(i)), ["prevent"])
          }, null, 8, Dl)) : (u(), h("a", {
            key: 1,
            role: "tab",
            href: "#",
            onClick: M((p) => s.select(o.tabs.indexOf(i)), ["prevent"]),
            textContent: I(i.title)
          }, null, 8, Rl))
        ], 2)), [
          [ye, !i.hidden]
        ])
      ], 64))), 128)),
      !l.justified && e.$slots["nav-right"] ? (u(), h("li", Al, [
        V(e.$slots, "nav-right")
      ])) : N("", !0)
    ], 2),
    r("div", {
      class: k(s.contentClasses)
    }, [
      V(e.$slots, "default")
    ], 2)
  ]);
}
const Ul = /* @__PURE__ */ ke(_l, [["render", Fl]]);
function Ce(e, t) {
  let l = e.toString();
  for (let n = t - l.length; n > 0; n--)
    l = "0" + l;
  return l;
}
const Hl = [
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
function zl(e, t) {
  return new Date(t, e + 1, 0).getDate();
}
function Kl(e, t) {
  try {
    const l = e.getFullYear(), n = e.getMonth() + 1, o = e.getDate(), s = Hl[n - 1];
    return t.replace(/yyyy/g, l).replace(/MMMM/g, s).replace(/MMM/g, s.substring(0, 3)).replace(/MM/g, Ce(n, 2)).replace(/dd/g, Ce(o, 2)).replace(/yy/g, l).replace(/M(?!a)/g, n).replace(/d/g, o);
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
function Yl(e) {
  const t = new Date(Date.UTC(e.year, e.month, e.date));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  const l = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil(((t - l) / 864e5 + 1) / 7);
}
const Wl = {
  role: "grid",
  style: { width: "100%" }
}, ql = ["colspan"], Gl = { align: "center" }, jl = { key: 0 }, Zl = { class: "uiv-datepicker-week" }, Jl = {
  key: 0,
  class: "text-center",
  style: { "border-right": "1px solid #eee" }
}, Xl = { class: "text-muted" }, Ql = {
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
    const l = e, n = R(() => {
      const c = [];
      let y = l.weekStartsWith;
      for (; c.length < 7; )
        c.push(y++), y > 6 && (y = 0);
      return c;
    }), o = R(() => l.yearMonthFormatter ? l.yearMonthFormatter(l.year, l.month) : J(l.month) ? `${l.year} ${se(`uiv.datePicker.month${l.month + 1}`)}` : l.year), s = R(() => {
      var x, C;
      const c = [], y = new Date(l.year, l.month, 1), g = new Date(l.year, l.month, 0).getDate(), v = y.getDay(), b = zl(l.month, l.year);
      let S = 0;
      l.weekStartsWith > v ? S = 7 - l.weekStartsWith : S = 0 - l.weekStartsWith;
      for (let E = 0; E < 6; E++) {
        c.push([]);
        for (let z = 0 - S; z < 7 - S; z++) {
          const U = E * 7 + z, A = { year: l.year, disabled: !1 };
          U < v ? (A.date = g - v + U + 1, l.month > 0 ? A.month = l.month - 1 : (A.month = 11, A.year--)) : U < v + b ? (A.date = U - v + 1, A.month = l.month) : (A.date = U - v - b + 1, l.month < 11 ? A.month = l.month + 1 : (A.month = 0, A.year++));
          const oe = new Date(A.year, A.month, A.date);
          let pe = !0, T = !0;
          (x = l.limit) != null && x.from && (pe = oe >= l.limit.from), (C = l.limit) != null && C.to && (T = oe < l.limit.to), A.disabled = !pe || !T, he(l.dateClass) ? A.classes = l.dateClass(oe, {
            currentMonth: l.month,
            currentYear: l.year
          }) : A.classes = "", c[E].push(A);
        }
      }
      return c;
    });
    function a(c) {
      return se(`uiv.datePicker.week${c}`);
    }
    function i(c) {
      return l.date && c.date === l.date.getDate() && c.month === l.date.getMonth() && c.year === l.date.getFullYear() ? "primary" : c.date === l.today.getDate() && c.month === l.today.getMonth() && c.year === l.today.getFullYear() ? "info" : "default";
    }
    function d(c) {
      t("date-change", c);
    }
    function p() {
      let c = l.month, y = l.year;
      l.month > 0 ? c-- : (c = 11, y--, t("year-change", y)), t("month-change", c);
    }
    function f() {
      let c = l.month, y = l.year;
      l.month < 11 ? c++ : (c = 0, y++, t("year-change", y)), t("month-change", c);
    }
    function m() {
      t("view-change", "m");
    }
    return (c, y) => (u(), h("table", Wl, [
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
                  class: k(e.iconControlLeft)
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
          ], 8, ql),
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
                  class: k(e.iconControlRight)
                }, null, 2)
              ]),
              _: 1
            })
          ])
        ]),
        r("tr", Gl, [
          e.weekNumbers ? (u(), h("td", jl)) : N("", !0),
          (u(!0), h(F, null, j($(n), (g, v) => (u(), h("td", {
            key: v,
            width: "14.2857142857%"
          }, [
            r("small", Zl, I(a(g === 0 ? 7 : g)), 1)
          ]))), 128))
        ])
      ]),
      r("tbody", null, [
        (u(!0), h(F, null, j($(s), (g, v) => (u(), h("tr", { key: v }, [
          e.weekNumbers ? (u(), h("td", Jl, [
            r("small", Xl, I($(Yl)(g[e.weekStartsWith])), 1)
          ])) : N("", !0),
          (u(!0), h(F, null, j(g, (b, S) => (u(), h("td", {
            key: `${v}_${S}`
          }, [
            B(D, {
              block: "",
              size: "sm",
              style: { border: "none" },
              "data-action": "select",
              class: k(b.classes),
              type: i(b),
              disabled: b.disabled,
              onClick: (x) => d(b)
            }, {
              default: O(() => [
                r("span", {
                  "data-action": "select",
                  class: k({ "text-muted": e.month !== b.month })
                }, I(b.date), 3)
              ]),
              _: 2
            }, 1032, ["class", "type", "disabled", "onClick"])
          ]))), 128))
        ]))), 128))
      ])
    ]));
  }
}, en = {
  role: "grid",
  style: { width: "100%" }
}, tn = { colspan: "4" }, ln = {
  __name: "MonthView",
  props: {
    month: { type: Number, default: void 0 },
    year: { type: Number, default: void 0 },
    iconControlLeft: { type: String, default: void 0 },
    iconControlRight: { type: String, default: void 0 }
  },
  emits: ["year-change", "month-change", "view-change"],
  setup(e, { emit: t }) {
    const l = e, n = Re([]);
    de(() => {
      for (let p = 0; p < 4; p++) {
        n.push([]);
        for (let f = 0; f < 3; f++)
          n[p].push(p * 3 + f + 1);
      }
    });
    function o(p) {
      return se(`uiv.datePicker.month${p}`);
    }
    function s(p) {
      return p === l.month ? "primary" : "default";
    }
    function a() {
      t("year-change", l.year - 1);
    }
    function i() {
      t("year-change", l.year + 1);
    }
    function d(p) {
      J(p) ? (t("month-change", p), t("view-change", "d")) : t("view-change", "y");
    }
    return (p, f) => (u(), h("table", en, [
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
                  class: k(e.iconControlLeft)
                }, null, 2)
              ]),
              _: 1
            })
          ]),
          r("td", tn, [
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
                  class: k(e.iconControlRight)
                }, null, 2)
              ]),
              _: 1
            })
          ])
        ])
      ]),
      r("tbody", null, [
        (u(!0), h(F, null, j(n, (m, c) => (u(), h("tr", { key: c }, [
          (u(!0), h(F, null, j(m, (y, g) => (u(), h("td", {
            key: `${c}_${g}`,
            colspan: "2",
            width: "33.333333%"
          }, [
            B(D, {
              block: "",
              size: "sm",
              style: { border: "none" },
              type: s(c * 3 + g),
              onClick: (v) => d(c * 3 + g)
            }, {
              default: O(() => [
                r("span", null, I(o(y)), 1)
              ]),
              _: 2
            }, 1032, ["type", "onClick"])
          ]))), 128))
        ]))), 128))
      ])
    ]));
  }
}, nn = {
  role: "grid",
  style: { width: "100%" }
}, sn = { colspan: "3" }, on = {
  __name: "YearView",
  props: {
    year: { type: Number, default: void 0 },
    iconControlLeft: { type: String, default: void 0 },
    iconControlRight: { type: String, default: void 0 }
  },
  emits: ["year-change", "view-change"],
  setup(e, { emit: t }) {
    const l = e;
    function n(p) {
      return p === l.year ? "primary" : "default";
    }
    function o() {
      t("year-change", l.year - 20);
    }
    function s() {
      t("year-change", l.year + 20);
    }
    function a(p) {
      t("year-change", p), t("view-change", "m");
    }
    const i = R(() => {
      const p = [], f = l.year - l.year % 20;
      for (let m = 0; m < 4; m++) {
        p.push([]);
        for (let c = 0; c < 5; c++)
          p[m].push(f + m * 5 + c);
      }
      return p;
    }), d = R(() => {
      const p = l.year - l.year % 20;
      return `${p} ~ ${p + 19}`;
    });
    return (p, f) => (u(), h("table", nn, [
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
                  class: k(e.iconControlLeft)
                }, null, 2)
              ]),
              _: 1
            })
          ]),
          r("td", sn, [
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
                  class: k(e.iconControlRight)
                }, null, 2)
              ]),
              _: 1
            })
          ])
        ])
      ]),
      r("tbody", null, [
        (u(!0), h(F, null, j($(i), (m, c) => (u(), h("tr", { key: c }, [
          (u(!0), h(F, null, j(m, (y, g) => (u(), h("td", {
            key: `${c}_${g}`,
            width: "20%"
          }, [
            B(D, {
              block: "",
              size: "sm",
              style: { border: "none" },
              type: n(y),
              onClick: (v) => a(y)
            }, {
              default: O(() => [
                r("span", null, I(y), 1)
              ]),
              _: 2
            }, 1032, ["type", "onClick"])
          ]))), 128))
        ]))), 128))
      ])
    ]));
  }
}, an = { key: 0 }, rn = /* @__PURE__ */ r("br", null, null, -1), un = { class: "text-center" }, dn = {
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
    const l = e;
    P(!1);
    const n = P(/* @__PURE__ */ new Date()), o = P(0), s = P(0), a = P("d"), i = R(() => {
      const C = l.dateParser(l.modelValue);
      if (isNaN(C))
        return null;
      {
        let E = new Date(C);
        return E.getHours() !== 0 && (E = new Date(C + E.getTimezoneOffset() * 60 * 1e3)), E;
      }
    }), d = R(() => ({
      width: l.width + "px"
    })), p = R(() => ({
      "uiv-datepicker": !0,
      "uiv-datepicker-date": a.value === "d",
      "uiv-datepicker-month": a.value === "m",
      "uiv-datepicker-year": a.value === "y"
    })), f = R(() => {
      const C = {};
      if (l.limitFrom) {
        let E = l.dateParser(l.limitFrom);
        isNaN(E) || (E = ht(new Date(E)), E.setHours(0, 0, 0, 0), C.from = E);
      }
      if (l.limitTo) {
        let E = l.dateParser(l.limitTo);
        isNaN(E) || (E = ht(new Date(E)), E.setHours(0, 0, 0, 0), C.to = E);
      }
      return C;
    });
    ie(
      () => l.modelValue,
      (C, E) => {
        m(C, E);
      }
    ), de(() => {
      l.modelValue ? m(l.modelValue) : (o.value = n.value.getMonth(), s.value = n.value.getFullYear(), a.value = l.initialView);
    });
    function m(C, E) {
      const z = l.dateParser(C);
      if (!isNaN(z)) {
        let U = new Date(z);
        U.getHours() !== 0 && (U = new Date(z + U.getTimezoneOffset() * 60 * 1e3)), f.value && (f.value.from && U < f.value.from || f.value.to && U >= f.value.to) ? t("update:modelValue", E || "") : (o.value = U.getMonth(), s.value = U.getFullYear());
      }
    }
    function c(C) {
      o.value = C;
    }
    function y(C) {
      s.value = C, o.value = void 0;
    }
    function g(C) {
      if (C && we(C.date) && we(C.month) && we(C.year)) {
        const E = new Date(C.year, C.month, C.date);
        t(
          "update:modelValue",
          l.format ? Kl(E, l.format) : E
        ), o.value = C.month, s.value = C.year;
      } else
        t("update:modelValue", "");
    }
    function v(C) {
      a.value = C;
    }
    function b() {
      a.value = "d", g({
        date: n.value.getDate(),
        month: n.value.getMonth(),
        year: n.value.getFullYear()
      });
    }
    function S() {
      o.value = n.value.getMonth(), s.value = n.value.getFullYear(), a.value = l.initialView, g();
    }
    function x(C) {
      (C.target.getAttribute("data-action") !== "select" || !l.closeOnSelected) && C.stopPropagation();
    }
    return (C, E) => (u(), h("div", {
      class: k($(p)),
      style: ge($(d)),
      "data-role": "date-picker",
      onClick: x
    }, [
      te(B(Ql, {
        month: o.value,
        year: s.value,
        date: $(i),
        today: n.value,
        limit: $(f),
        "week-starts-with": e.weekStartsWith,
        "icon-control-left": e.iconControlLeft,
        "icon-control-right": e.iconControlRight,
        "date-class": e.dateClass,
        "year-month-formatter": e.yearMonthFormatter,
        "week-numbers": e.weekNumbers,
        onMonthChange: c,
        onYearChange: y,
        onDateChange: g,
        onViewChange: v
      }, null, 8, ["month", "year", "date", "today", "limit", "week-starts-with", "icon-control-left", "icon-control-right", "date-class", "year-month-formatter", "week-numbers"]), [
        [ye, a.value === "d"]
      ]),
      te(B(ln, {
        month: o.value,
        year: s.value,
        "icon-control-left": e.iconControlLeft,
        "icon-control-right": e.iconControlRight,
        onMonthChange: c,
        onYearChange: y,
        onViewChange: v
      }, null, 8, ["month", "year", "icon-control-left", "icon-control-right"]), [
        [ye, a.value === "m"]
      ]),
      te(B(on, {
        year: s.value,
        "icon-control-left": e.iconControlLeft,
        "icon-control-right": e.iconControlRight,
        onYearChange: y,
        onViewChange: v
      }, null, 8, ["year", "icon-control-left", "icon-control-right"]), [
        [ye, a.value === "y"]
      ]),
      e.todayBtn || e.clearBtn ? (u(), h("div", an, [
        rn,
        r("div", un, [
          e.todayBtn ? (u(), Y(D, {
            key: 0,
            "data-action": "select",
            "data-type": "today",
            type: "info",
            size: "sm",
            onClick: b
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
}, De = "_uiv_scroll_handler", Ot = [w.RESIZE, w.SCROLL], xt = (e, t) => {
  const l = t.value;
  he(l) && (Bt(e), e[De] = l, Ot.forEach((n) => {
    L(window, n, e[De]);
  }));
}, Bt = (e) => {
  Ot.forEach((t) => {
    _(window, t, e[De]);
  }), delete e[De];
}, cn = (e, t) => {
  t.value !== t.oldValue && xt(e, t);
}, hn = { mounted: xt, unmounted: Bt, updated: cn }, fn = {
  __name: "Affix",
  props: {
    offset: { type: Number, default: 0 }
  },
  emits: ["affix", "affixed", "unfix", "unfixed"],
  setup(e, { emit: t }) {
    const l = e, n = P(null), o = P(!1), s = R(() => ({ affix: o.value })), a = R(() => ({
      top: o.value ? l.offset + "px" : null
    }));
    function i() {
      var g, v, b;
      if (!((g = n.value) != null && g.offsetWidth || (v = n.value) != null && v.offsetHeight || (b = n.value) != null && b.getClientRects().length))
        return;
      const d = {}, p = {}, f = n.value.getBoundingClientRect(), m = document.body;
      ["Top", "Left"].forEach((S) => {
        const x = S.toLowerCase();
        d[x] = window["page" + (S === "Top" ? "Y" : "X") + "Offset"], p[x] = d[x] + f[x] - (n.value["client" + S] || m["client" + S] || 0);
      });
      const y = d.top > p.top - l.offset;
      o.value !== y && (o.value = y, t(o.value ? "affix" : "unfix"), Pe(() => {
        t(o.value ? "affixed" : "unfixed");
      }));
    }
    return (d, p) => (u(), h("div", {
      ref_key: "el",
      ref: n,
      class: "hidden-print"
    }, [
      te((u(), h("div", {
        class: k($(s)),
        style: ge($(a))
      }, [
        V(d.$slots, "default")
      ], 6)), [
        [$(hn), i]
      ])
    ], 512));
  }
}, pn = /* @__PURE__ */ r("span", { "aria-hidden": "true" }, "×", -1), mn = [
  pn
], It = {
  __name: "Alert",
  props: {
    dismissible: { type: Boolean, default: !1 },
    duration: { type: Number, default: 0 },
    type: { type: String, default: "info" }
  },
  emits: ["dismissed"],
  setup(e, { emit: t }) {
    const l = e;
    let n = 0;
    const o = R(() => ({
      alert: !0,
      [`alert-${l.type}`]: !!l.type,
      "alert-dismissible": l.dismissible
    }));
    function s() {
      clearTimeout(n), t("dismissed");
    }
    return de(() => {
      l.duration > 0 && (n = setTimeout(s, l.duration));
    }), qt(() => {
      clearTimeout(n);
    }), (a, i) => (u(), h("div", {
      role: "alert",
      class: k($(o))
    }, [
      e.dismissible ? (u(), h("button", {
        key: 0,
        type: "button",
        class: "close",
        "aria-label": "Close",
        onClick: s
      }, mn)) : N("", !0),
      V(a.$slots, "default")
    ], 2));
  }
}, yn = /* @__PURE__ */ r("span", { "aria-hidden": "true" }, "«", -1), gn = [
  yn
], vn = /* @__PURE__ */ r("span", { "aria-hidden": "true" }, "‹", -1), bn = [
  vn
], Cn = /* @__PURE__ */ r("span", { "aria-hidden": "true" }, "…", -1), kn = [
  Cn
], Tn = ["onClick"], wn = /* @__PURE__ */ r("span", { "aria-hidden": "true" }, "…", -1), Sn = [
  wn
], $n = /* @__PURE__ */ r("span", { "aria-hidden": "true" }, "›", -1), En = [
  $n
], On = /* @__PURE__ */ r("span", { "aria-hidden": "true" }, "»", -1), xn = [
  On
], Bn = {
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
    const l = e, n = P(0), o = R(() => ({
      [`text-${l.align}`]: !!l.align
    })), s = R(() => ({
      [`pagination-${l.size}`]: !!l.size
    })), a = R(
      () => ol(l.totalPage).slice(
        n.value,
        n.value + l.maxSize
      )
    );
    ie(
      () => [l.modelValue, l.maxSize, l.totalPage],
      () => {
        i();
      },
      {
        immediate: !0
      }
    );
    function i() {
      const f = l.modelValue, m = l.maxSize, c = n.value, y = c + m;
      if (f > y) {
        const g = l.totalPage - m;
        f > g ? n.value = g : n.value = f - 1;
      } else
        f < c + 1 && (f > m ? n.value = f - m : n.value = 0);
    }
    function d(f) {
      !l.disabled && f > 0 && f <= l.totalPage && f !== l.modelValue && (t("update:modelValue", f), t("change", f));
    }
    function p(f) {
      if (l.disabled)
        return;
      const m = l.maxSize, c = n.value, y = l.totalPage - m, g = f ? c - m : c + m;
      g < 0 ? n.value = 0 : g > y ? n.value = y : n.value = g;
    }
    return (f, m) => (u(), h("nav", {
      "aria-label": "Page navigation",
      class: k($(o))
    }, [
      r("ul", {
        class: k(["pagination", $(s)])
      }, [
        e.boundaryLinks ? (u(), h("li", {
          key: 0,
          class: k({ disabled: e.modelValue <= 1 || e.disabled })
        }, [
          r("a", {
            href: "#",
            role: "button",
            "aria-label": "First",
            onClick: m[0] || (m[0] = M((c) => d(1), ["prevent"]))
          }, gn)
        ], 2)) : N("", !0),
        e.directionLinks ? (u(), h("li", {
          key: 1,
          class: k({ disabled: e.modelValue <= 1 || e.disabled })
        }, [
          r("a", {
            href: "#",
            role: "button",
            "aria-label": "Previous",
            onClick: m[1] || (m[1] = M((c) => d(e.modelValue - 1), ["prevent"]))
          }, bn)
        ], 2)) : N("", !0),
        n.value > 0 ? (u(), h("li", {
          key: 2,
          class: k({ disabled: e.disabled })
        }, [
          r("a", {
            href: "#",
            role: "button",
            "aria-label": "Previous group",
            onClick: m[2] || (m[2] = M((c) => p(1), ["prevent"]))
          }, kn)
        ], 2)) : N("", !0),
        (u(!0), h(F, null, j($(a), (c) => (u(), h("li", {
          key: c,
          class: k({ active: e.modelValue === c + 1, disabled: e.disabled })
        }, [
          r("a", {
            href: "#",
            role: "button",
            onClick: M((y) => d(c + 1), ["prevent"])
          }, I(c + 1), 9, Tn)
        ], 2))), 128)),
        n.value < e.totalPage - e.maxSize ? (u(), h("li", {
          key: 3,
          class: k({ disabled: e.disabled })
        }, [
          r("a", {
            href: "#",
            role: "button",
            "aria-label": "Next group",
            onClick: m[3] || (m[3] = M((c) => p(0), ["prevent"]))
          }, Sn)
        ], 2)) : N("", !0),
        e.directionLinks ? (u(), h("li", {
          key: 4,
          class: k({ disabled: e.modelValue >= e.totalPage || e.disabled })
        }, [
          r("a", {
            href: "#",
            role: "button",
            "aria-label": "Next",
            onClick: m[4] || (m[4] = M((c) => d(e.modelValue + 1), ["prevent"]))
          }, En)
        ], 2)) : N("", !0),
        e.boundaryLinks ? (u(), h("li", {
          key: 5,
          class: k({ disabled: e.modelValue >= e.totalPage || e.disabled })
        }, [
          r("a", {
            href: "#",
            role: "button",
            "aria-label": "Last",
            onClick: m[5] || (m[5] = M((c) => d(e.totalPage), ["prevent"]))
          }, xn)
        ], 2)) : N("", !0)
      ], 2)
    ], 2));
  }
}, qe = "in", Vt = {
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
        this.triggerEl = Le(e);
      else {
        const t = this.$el.querySelector('[data-role="trigger"]');
        if (t)
          this.triggerEl = t;
        else {
          const l = this.$el.querySelector("*");
          this.triggerEl = l === this.$refs.popup ? null : l;
        }
      }
    },
    initListeners() {
      this.triggerEl && (this.trigger === ee.HOVER ? (L(this.triggerEl, w.MOUSE_ENTER, this.show), L(this.triggerEl, w.MOUSE_LEAVE, this.hide)) : this.trigger === ee.FOCUS ? (L(this.triggerEl, w.FOCUS, this.show), L(this.triggerEl, w.BLUR, this.hide)) : this.trigger === ee.HOVER_FOCUS ? (L(this.triggerEl, w.MOUSE_ENTER, this.handleAuto), L(this.triggerEl, w.MOUSE_LEAVE, this.handleAuto), L(this.triggerEl, w.FOCUS, this.handleAuto), L(this.triggerEl, w.BLUR, this.handleAuto)) : (this.trigger === ee.CLICK || this.trigger === ee.OUTSIDE_CLICK) && L(this.triggerEl, w.CLICK, this.toggle)), L(window, w.CLICK, this.windowClicked);
    },
    clearListeners() {
      this.triggerEl && (_(this.triggerEl, w.FOCUS, this.show), _(this.triggerEl, w.BLUR, this.hide), _(this.triggerEl, w.MOUSE_ENTER, this.show), _(this.triggerEl, w.MOUSE_LEAVE, this.hide), _(this.triggerEl, w.CLICK, this.toggle), _(this.triggerEl, w.MOUSE_ENTER, this.handleAuto), _(this.triggerEl, w.MOUSE_LEAVE, this.handleAuto), _(this.triggerEl, w.FOCUS, this.handleAuto), _(this.triggerEl, w.BLUR, this.handleAuto)), _(window, w.CLICK, this.windowClicked), this.clearTimeouts();
    },
    clearTimeouts() {
      this.hideTimeoutId && (clearTimeout(this.hideTimeoutId), this.hideTimeoutId = 0), this.showTimeoutId && (clearTimeout(this.showTimeoutId), this.showTimeoutId = 0), this.transitionTimeoutId && (clearTimeout(this.transitionTimeoutId), this.transitionTimeoutId = 0), this.autoTimeoutId && (clearTimeout(this.autoTimeoutId), this.autoTimeoutId = 0);
    },
    resetPosition() {
      const e = this.$refs.popup;
      e && (cl(
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
            const l = Me();
            if (l > 1) {
              const n = this.name === "popover" ? 1060 : 1070, o = (l - 1) * 20;
              t.style.zIndex = `${n + o}`;
            }
            e || (t.className = `${this.name} ${this.placement} ${this.customClass ? this.customClass : ""} fade`, Le(this.appendTo).appendChild(t), this.resetPosition()), H(t, qe), this.$emit("update:modelValue", !0), this.$emit("show");
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
      return ul(this.$refs.popup, qe);
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
}, Nt = {
  mixins: [Vt],
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
  // beforeUnmount() {
  //   console.log('unmount')
  // },
  methods: {
    isNotEmpty() {
      return this.text;
    }
  },
  render() {
    const e = this.tag;
    return B(e, null, {
      default: () => {
        var t, l;
        return [(l = (t = this.$slots).default) == null ? void 0 : l.call(t), B("div", {
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
}, Mt = {
  mixins: [Vt],
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
  // beforeUnmount() {
  //   console.log('unmount')
  // },
  methods: {
    isNotEmpty() {
      return this.title || this.content || this.$slots.popover;
    }
  },
  render() {
    const e = this.tag;
    return B(e, null, {
      default: () => {
        var t, l, n, o;
        return [(l = (t = this.$slots).default) == null ? void 0 : l.call(t), B("div", {
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
        }, [this.content || ((o = (n = this.$slots).popover) == null ? void 0 : o.call(n))])])];
      }
    });
  }
}, Ge = 23, me = 0, je = 59, ne = 12, In = {
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
      this.showMeridian ? t >= 1 && t <= ne && (this.meridian ? this.hours = t === ne ? 0 : t : this.hours = t === ne ? ne : t + ne) : t >= me && t <= Ge && (this.hours = t), this.setTime();
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
      this.hours = e.getHours(), this.minutes = e.getMinutes(), this.showMeridian ? this.hours >= ne ? (this.hours === ne ? this.hoursText = this.hours + "" : this.hoursText = Ce(this.hours - ne, 2), this.meridian = !1) : (this.hours === me ? this.hoursText = ne.toString() : this.hoursText = Ce(this.hours, 2), this.meridian = !0) : this.hoursText = Ce(this.hours, 2), this.minutesText = Ce(this.minutes, 2), this.$refs.hoursInput.value = this.hoursText, this.$refs.minutesInput.value = this.minutesText;
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
      this.meridian = !this.meridian, this.meridian ? this.hours -= ne : this.hours += ne, this.setTime();
    },
    onWheel(e, t) {
      this.readonly || (e.preventDefault(), this.changeTime(t, e.deltaY < 0));
    },
    setTime() {
      let e = this.modelValue;
      if (isNaN(e.getTime()) && (e = /* @__PURE__ */ new Date(), e.setHours(0), e.setMinutes(0)), e.setHours(this.hours), e.setMinutes(this.minutes), this.max instanceof Date) {
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
}, Vn = {
  key: 0,
  class: "text-center"
}, Nn = /* @__PURE__ */ r("td", null, " ", -1), Mn = { key: 0 }, _n = { class: "form-group" }, Pn = ["readonly"], Ln = /* @__PURE__ */ r("td", null, [
  /* @__PURE__ */ q(" "),
  /* @__PURE__ */ r("b", null, ":"),
  /* @__PURE__ */ q(" ")
], -1), Dn = { class: "form-group" }, Rn = ["readonly"], An = { key: 0 }, Fn = {
  key: 1,
  class: "text-center"
}, Un = /* @__PURE__ */ r("td", null, " ", -1), Hn = { key: 0 };
function zn(e, t, l, n, o, s) {
  const a = $e("btn");
  return u(), h("section", {
    onClick: t[14] || (t[14] = M(() => {
    }, ["stop"]))
  }, [
    r("table", null, [
      r("tbody", null, [
        l.controls ? (u(), h("tr", Vn, [
          r("td", null, [
            B(a, {
              type: "link",
              size: "sm",
              disabled: l.readonly,
              onClick: t[0] || (t[0] = (i) => s.changeTime(1, 1))
            }, {
              default: O(() => [
                r("i", {
                  class: k(l.iconControlUp)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          Nn,
          r("td", null, [
            B(a, {
              type: "link",
              size: "sm",
              disabled: l.readonly,
              onClick: t[1] || (t[1] = (i) => s.changeTime(0, 1))
            }, {
              default: O(() => [
                r("i", {
                  class: k(l.iconControlUp)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          l.showMeridian ? (u(), h("td", Mn)) : N("", !0)
        ])) : N("", !0),
        r("tr", null, [
          r("td", _n, [
            te(r("input", {
              ref: "hoursInput",
              "onUpdate:modelValue": t[2] || (t[2] = (i) => o.hoursText = i),
              type: "tel",
              pattern: "\\d*",
              class: "form-control text-center",
              style: ge(s.inputStyles),
              placeholder: "HH",
              readonly: l.readonly,
              maxlength: "2",
              size: "2",
              onMouseup: t[3] || (t[3] = (...i) => s.selectInputValue && s.selectInputValue(...i)),
              onKeydown: [
                t[4] || (t[4] = W(M((i) => s.changeTime(1, 1), ["prevent"]), ["up"])),
                t[5] || (t[5] = W(M((i) => s.changeTime(1, 0), ["prevent"]), ["down"]))
              ],
              onWheel: t[6] || (t[6] = (i) => s.onWheel(i, !0))
            }, null, 44, Pn), [
              [
                Ze,
                o.hoursText,
                void 0,
                { lazy: !0 }
              ]
            ])
          ]),
          Ln,
          r("td", Dn, [
            te(r("input", {
              ref: "minutesInput",
              "onUpdate:modelValue": t[7] || (t[7] = (i) => o.minutesText = i),
              type: "tel",
              pattern: "\\d*",
              class: "form-control text-center",
              style: ge(s.inputStyles),
              placeholder: "MM",
              readonly: l.readonly,
              maxlength: "2",
              size: "2",
              onMouseup: t[8] || (t[8] = (...i) => s.selectInputValue && s.selectInputValue(...i)),
              onKeydown: [
                t[9] || (t[9] = W(M((i) => s.changeTime(0, 1), ["prevent"]), ["up"])),
                t[10] || (t[10] = W(M((i) => s.changeTime(0, 0), ["prevent"]), ["down"]))
              ],
              onWheel: t[11] || (t[11] = (i) => s.onWheel(i, !1))
            }, null, 44, Rn), [
              [
                Ze,
                o.minutesText,
                void 0,
                { lazy: !0 }
              ]
            ])
          ]),
          l.showMeridian ? (u(), h("td", An, [
            q("   "),
            B(a, {
              "data-action": "toggleMeridian",
              disabled: l.readonly,
              onClick: s.toggleMeridian
            }, {
              default: O(() => [
                q(I(o.meridian ? s.t("uiv.timePicker.am") : s.t("uiv.timePicker.pm")), 1)
              ]),
              _: 1
            }, 8, ["disabled", "onClick"])
          ])) : N("", !0)
        ]),
        l.controls ? (u(), h("tr", Fn, [
          r("td", null, [
            B(a, {
              type: "link",
              size: "sm",
              disabled: l.readonly,
              onClick: t[12] || (t[12] = (i) => s.changeTime(1, 0))
            }, {
              default: O(() => [
                r("i", {
                  class: k(l.iconControlDown)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          Un,
          r("td", null, [
            B(a, {
              type: "link",
              size: "sm",
              disabled: l.readonly,
              onClick: t[13] || (t[13] = (i) => s.changeTime(0, 0))
            }, {
              default: O(() => [
                r("i", {
                  class: k(l.iconControlDown)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          l.showMeridian ? (u(), h("td", Hn)) : N("", !0)
        ])) : N("", !0)
      ])
    ])
  ]);
}
const Kn = /* @__PURE__ */ ke(In, [["render", zn]]);
function Yn(e, t = "GET") {
  return fetch(e, { method: t }).then((l) => l.json());
}
const Wn = ["onClick"], qn = ["innerHTML"], Gn = {
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
    const l = e, n = Gt(), o = P(null), s = P([]), a = P(0), i = P([]), d = P(!1), p = P(null);
    let f = null, m = 0;
    const c = R(() => {
      let T = "";
      return l.ignoreCase && (T += "i"), l.matchStart || (T += "g"), T;
    });
    ie(
      () => l.target,
      (T) => {
        S(), v(T), b();
      }
    ), ie(
      () => l.modelValue,
      (T) => {
        y(T);
      }
    ), ie(
      () => a.value,
      (T) => {
        T >= 0 && t("selected-item-changed", T);
      }
    ), de(async () => {
      await Pe(), v(l.target), b(), f = p.value.$el.querySelector(".dropdown-menu"), l.modelValue && y(l.modelValue);
    }), Ae(() => {
      S();
    });
    function y(T) {
      ue(T) ? o.value.value = T : T ? o.value.value = l.itemKey ? T[l.itemKey] : T : T === null && (o.value.value = "");
    }
    function g() {
      return !!n.empty;
    }
    function v(T) {
      T && (o.value = Le(T));
    }
    function b() {
      o.value && (i.value = [o.value], L(o.value, w.FOCUS, z), L(o.value, w.BLUR, U), L(o.value, w.INPUT, E), L(o.value, w.KEY_DOWN, A));
    }
    function S() {
      i.value = [], o.value && (_(o.value, w.FOCUS, z), _(o.value, w.BLUR, U), _(o.value, w.INPUT, E), _(o.value, w.KEY_DOWN, A));
    }
    function x(T, Q = !1) {
      if (Q) {
        s.value = T.slice(0, l.limit);
        return;
      }
      s.value = [], a.value = l.preselect ? 0 : -1;
      for (let K = 0, ve = T.length; K < ve; K++) {
        const Ee = T[K];
        let Oe = l.itemKey ? Ee[l.itemKey] : Ee;
        Oe = Oe.toString();
        let xe = -1;
        if (l.ignoreCase ? xe = Oe.toLowerCase().indexOf(o.value.value.toLowerCase()) : xe = Oe.indexOf(o.value.value), (l.matchStart ? xe === 0 : xe >= 0) && s.value.push(Ee), s.value.length >= l.limit)
          break;
      }
    }
    function C(T, Q) {
      if (clearTimeout(m), T === "" && !l.openOnEmpty)
        d.value = !1;
      else if (l.data)
        x(l.data), d.value = g() || !!s.value.length;
      else if (l.asyncSrc)
        m = setTimeout(() => {
          t("loading"), Yn(l.asyncSrc + encodeURIComponent(T)).then((K) => {
            o.value.matches(":focus") && (x(l.asyncKey ? K[l.asyncKey] : K, !0), d.value = g() || !!s.value.length), t("loaded");
          }).catch((K) => {
            console.error(K), t("loaded-error");
          });
        }, Q);
      else if (l.asyncFunction) {
        const K = (ve) => {
          o.value.matches(":focus") && (x(ve, !0), d.value = g() || !!s.value.length), t("loaded");
        };
        m = setTimeout(() => {
          t("loading"), l.asyncFunction(T, K);
        }, Q);
      }
    }
    function E() {
      const T = o.value.value;
      C(T, l.debounce), t("update:modelValue", l.forceSelect ? void 0 : T);
    }
    function z() {
      if (l.openOnFocus) {
        const T = o.value.value;
        C(T, 0);
      }
    }
    async function U() {
      f.matches(":hover") || (d.value = !1), o.value && l.forceClear && (await Pe(), typeof l.modelValue > "u" && (o.value.value = ""));
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
      const Q = l.itemKey ? T[l.itemKey] : T, K = o.value.value.replace(
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
          (u(!0), h(F, null, j(s.value, (K, ve) => (u(), h("li", {
            key: ve,
            class: k({ active: a.value === ve })
          }, [
            r("a", {
              href: "#",
              onClick: M((Ee) => oe(K), ["prevent"])
            }, [
              r("span", {
                innerHTML: pe(K)
              }, null, 8, qn)
            ], 8, Wn)
          ], 2))), 128))
        ]),
        !s.value || s.value.length === 0 ? V(T.$slots, "empty", { key: 0 }) : N("", !0)
      ]),
      _: 3
    }, 8, ["modelValue", "append-to-body", "not-close-elements", "position-element"]));
  }
}, _t = {
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
}, jn = ["aria-valuenow"], Pt = {
  __name: "ProgressBarStack",
  props: {
    ..._t
  },
  setup(e) {
    return (t, l) => (u(), h("div", {
      class: k({
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
    }, I(t.label ? t.labelText ? t.labelText : `${t.modelValue}%` : null), 15, jn));
  }
}, Zn = { class: "progress" }, Jn = {
  __name: "ProgressBar",
  props: {
    ..._t
  },
  setup(e) {
    return (t, l) => (u(), h("div", Zn, [
      t.$slots.default ? V(t.$slots, "default", { key: 0 }) : (u(), Y(Pt, jt(Zt({ key: 1 }, t.$props)), null, 16))
    ]));
  }
}, Xn = ["href", "target"], Lt = {
  __name: "BreadcrumbItem",
  props: {
    ...$t,
    active: { type: Boolean, default: !1 }
  },
  setup(e) {
    return (t, l) => (u(), h("li", {
      class: k({ active: e.active })
    }, [
      e.active ? V(t.$slots, "default", { key: 0 }) : t.to ? (u(), Y(kt("RouterLink"), {
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
      ], 8, Xn))
    ], 2));
  }
}, Qn = { class: "breadcrumb" }, es = {
  __name: "Breadcrumbs",
  props: {
    items: { type: Array, default: () => [] }
  },
  setup(e) {
    return (t, l) => (u(), h("ol", Qn, [
      V(t.$slots, "default"),
      (u(!0), h(F, null, j(e.items, (n, o) => (u(), Y(Lt, {
        key: n.key ?? o,
        active: n.active ?? o === e.items.length - 1,
        href: n.href,
        to: n.to,
        replace: n.replace,
        append: n.append,
        exact: n.exact
      }, {
        default: O(() => [
          q(I(n.text), 1)
        ]),
        _: 2
      }, 1032, ["active", "href", "to", "replace", "append", "exact"]))), 128))
    ]));
  }
}, ts = {
  class: "btn-toolbar",
  role: "toolbar"
}, ls = {
  __name: "BtnToolbar",
  setup(e) {
    return (t, l) => (u(), h("div", ts, [
      V(t.$slots, "default")
    ]));
  }
}, ns = {
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
      return this.filteredOptions.map((e) => e.group).filter(il).map((e) => ({
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
        const l = e.indexOf(t);
        return l >= 0 ? this.options[l][this.labelKey] : t;
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
      this.showDropdown && (this.currentActive > 0 ? this.currentActive-- : this.currentActive = this.flattenGroupedOptions.length - 1);
    },
    goNextOption() {
      this.showDropdown && (this.currentActive < this.flattenGroupedOptions.length - 1 ? this.currentActive++ : this.currentActive = 0);
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
      const t = e[this.valueKey], l = this.modelValue.indexOf(t);
      if (this.limit === 1) {
        const n = l >= 0 ? [] : [t];
        this.$emit("update:modelValue", n), this.$emit("change", n);
      } else if (l >= 0) {
        const n = this.modelValue.slice();
        n.splice(l, 1), this.$emit("update:modelValue", n), this.$emit("change", n);
      } else if (this.limit === 0 || this.modelValue.length < this.limit) {
        const n = this.modelValue.slice();
        n.push(t), this.$emit("update:modelValue", n), this.$emit("change", n);
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
  /* @__PURE__ */ r("span", null, " "),
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
function ps(e, t, l, n, o, s) {
  const a = $e("dropdown");
  return u(), Y(a, {
    ref: "dropdown",
    modelValue: o.showDropdown,
    "onUpdate:modelValue": t[14] || (t[14] = (i) => o.showDropdown = i),
    "not-close-elements": o.els,
    "append-to-body": l.appendToBody,
    disabled: l.disabled,
    style: ge(s.containerStyles),
    onKeydown: t[15] || (t[15] = W((i) => o.showDropdown = !1, ["esc"]))
  }, {
    dropdown: O(() => [
      l.filterable ? (u(), h("li", as, [
        te(r("input", {
          ref: "filterInput",
          "onUpdate:modelValue": t[5] || (t[5] = (i) => o.filterInput = i),
          "aria-label": "Filter...",
          class: "form-control input-sm",
          type: "text",
          placeholder: l.filterPlaceholder || s.t("uiv.multiSelect.filterPlaceholder"),
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
          class: k(s.itemClasses(p)),
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
            l.selectedIcon && s.isItemSelected(p) ? (u(), h("span", {
              key: 0,
              class: k(s.selectedIconClasses)
            }, null, 2)) : N("", !0)
          ])) : s.isItemSelected(p) ? (u(), h("a", hs, [
            r("b", null, I(p[l.labelKey]), 1),
            l.selectedIcon ? (u(), h("span", {
              key: 0,
              class: k(s.selectedIconClasses)
            }, null, 2)) : N("", !0)
          ])) : (u(), h("a", fs, [
            r("span", null, I(p[l.labelKey]), 1)
          ]))
        ], 42, ds))), 128))
      ], 64))), 256))
    ]),
    default: O(() => [
      r("div", {
        class: k(["form-control dropdown-toggle clearfix", s.selectClasses]),
        disabled: l.disabled ? !0 : void 0,
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
          class: k(s.selectTextClasses),
          style: { "overflow-x": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" },
          textContent: I(s.selectedText)
        }, null, 10, is)
      ], 42, ss)
    ]),
    _: 3
  }, 8, ["modelValue", "not-close-elements", "append-to-body", "disabled", "style"]);
}
const ms = /* @__PURE__ */ ke(ns, [["render", ps]]), ys = { class: "navbar-header" }, gs = /* @__PURE__ */ r("span", { class: "sr-only" }, "Toggle navigation", -1), vs = /* @__PURE__ */ r("span", { class: "icon-bar" }, null, -1), bs = /* @__PURE__ */ r("span", { class: "icon-bar" }, null, -1), Cs = /* @__PURE__ */ r("span", { class: "icon-bar" }, null, -1), ks = [
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
    const l = e, n = P(!1), o = R(() => ({
      navbar: !0,
      "navbar-default": !l.inverse,
      "navbar-inverse": l.inverse,
      "navbar-static-top": l.staticTop,
      "navbar-fixed-bottom": l.fixedBottom,
      "navbar-fixed-top": l.fixedTop
    }));
    ie(
      () => l.modelValue,
      (a) => {
        n.value = a;
      }
    ), de(() => {
      n.value = !!l.modelValue;
    });
    function s() {
      n.value = !n.value, t("update:modalValue", n.value);
    }
    return (a, i) => (u(), h("nav", {
      class: k($(o))
    }, [
      r("div", {
        class: k(e.fluid ? "container-fluid" : "container")
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
        B(wt, {
          modelValue: n.value,
          "onUpdate:modelValue": i[0] || (i[0] = (d) => n.value = d),
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
    return (t, l) => (u(), h("ul", {
      class: k({
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
    return (t, l) => (u(), h("form", {
      class: k({
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
    return (t, l) => (u(), h("p", {
      class: k({
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
  Affix: fn,
  Alert: It,
  BreadcrumbItem: Lt,
  Breadcrumbs: es,
  Btn: D,
  BtnGroup: St,
  BtnToolbar: ls,
  Carousel: sl,
  Collapse: wt,
  DatePicker: dn,
  Dropdown: Ue,
  Modal: Et,
  MultiSelect: ms,
  Navbar: Ts,
  NavbarForm: Ss,
  NavbarNav: ws,
  NavbarText: $s,
  Pagination: Bn,
  Popover: Mt,
  ProgressBar: Jn,
  ProgressBarStack: Pt,
  Slide: al,
  Tab: Ml,
  Tabs: Ul,
  TimePicker: Kn,
  Tooltip: Nt,
  Typeahead: Gn
}, Symbol.toStringTag, { value: "Module" })), tt = "_uiv_tooltip_instance", Dt = (e, t) => {
  Rt(e);
  const l = [];
  for (const d in t.modifiers)
    Fe(t.modifiers, d) && t.modifiers[d] && l.push(d);
  let n, o, s;
  l.forEach((d) => {
    /(top)|(left)|(right)|(bottom)/.test(d) ? n = d : /(hover)|(focus)|(click)/.test(d) ? o = d : /unenterable/.test(d) && (s = !1);
  });
  const a = Se(Nt, {
    target: e,
    appendTo: t.arg && "#" + t.arg,
    text: typeof t.value == "string" ? t.value && t.value.toString() : t.value && t.value.text && t.value.text.toString(),
    positionBy: t.value && t.value.positionBy && t.value.positionBy.toString(),
    viewport: t.value && t.value.viewport && t.value.viewport.toString(),
    customClass: t.value && t.value.customClass && t.value.customClass.toString(),
    showDelay: t.value && t.value.showDelay,
    hideDelay: t.value && t.value.hideDelay,
    enterable: s,
    placement: n,
    trigger: o
  }), i = document.createElement("div");
  ce(a, i), e[tt] = { container: i, vNode: a };
}, Rt = (e) => {
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
  t.value !== t.oldValue && Dt(e, t);
}, Os = { mounted: Dt, unmounted: Rt, updated: Es }, lt = "_uiv_popover_instance", At = (e, t) => {
  Ft(e);
  const l = [];
  for (const d in t.modifiers)
    Fe(t.modifiers, d) && t.modifiers[d] && l.push(d);
  let n, o, s;
  l.forEach((d) => {
    /(top)|(left)|(right)|(bottom)/.test(d) ? n = d : /(hover)|(focus)|(click)/.test(d) ? o = d : /unenterable/.test(d) && (s = !1);
  });
  const a = Se(Mt, {
    target: e,
    appendTo: t.arg && "#" + t.arg,
    title: t.value && t.value.title && t.value.title.toString(),
    positionBy: t.value && t.value.positionBy && t.value.positionBy.toString(),
    content: t.value && t.value.content && t.value.content.toString(),
    viewport: t.value && t.value.viewport && t.value.viewport.toString(),
    customClass: t.value && t.value.customClass && t.value.customClass.toString(),
    enterable: s,
    placement: n,
    trigger: o
  }), i = document.createElement("div");
  ce(a, i), e[lt] = i;
}, Ft = (e) => {
  const t = e[lt];
  t && ce(null, t), delete e[lt];
}, xs = (e, t) => {
  t.value !== t.oldValue && At(e, t);
}, Bs = { mounted: At, unmounted: Ft, updated: xs };
function fe(e, t = "body", l = {}) {
  this.el = e, this.opts = { ...fe.DEFAULTS, ...l }, this.opts.target = t, t === "body" ? this.scrollElement = window : this.scrollElement = document.querySelector(`[id=${t}]`), this.selector = "li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.scrollElement && (this.refresh(), this.process());
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
  e.map((l) => {
    const n = l.getAttribute("href");
    if (/^#./.test(n)) {
      const s = (t ? document : this.scrollElement).querySelector(`[id='${n.slice(1)}']`);
      return [t ? s.getBoundingClientRect().top : s.offsetTop, n];
    } else
      return null;
  }).filter((l) => l).sort((l, n) => l[0] - n[0]).forEach((l) => {
    this.offsets.push(l[0]), this.targets.push(l[1]);
  });
};
fe.prototype.process = function() {
  const e = this.scrollElement === window, t = (e ? window.pageYOffset : this.scrollElement.scrollTop) + this.opts.offset, l = this.getScrollHeight(), n = e ? it().height : this.scrollElement.getBoundingClientRect().height, o = this.opts.offset + l - n, s = this.offsets, a = this.targets, i = this.activeTarget;
  let d;
  if (this.scrollHeight !== l && this.refresh(), t >= o)
    return i !== (d = a[a.length - 1]) && this.activate(d);
  if (i && t < s[0])
    return this.activeTarget = null, this.clear();
  for (d = s.length; d--; )
    i !== a[d] && t >= s[d] && (s[d + 1] === void 0 || t < s[d + 1]) && this.activate(a[d]);
};
fe.prototype.activate = function(e) {
  this.activeTarget = e, this.clear();
  const t = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', l = this.opts.callback;
  [...this.el.querySelectorAll(t)].forEach((o) => {
    Xe(o, "li").forEach((s) => {
      H(s, "active"), l(s);
    }), Xe(o, ".dropdown-menu").length && H(hl(o, "li.dropdown"), "active");
  });
};
fe.prototype.clear = function() {
  [...this.el.querySelectorAll(this.selector)].forEach((t) => {
    Xe(t, ".active", this.opts.target).forEach((l) => {
      Z(l, "active");
    });
  });
};
const nt = "_uiv_scrollspy_instance", Ut = [w.RESIZE, w.SCROLL], Ht = (e, t) => {
  Kt(e);
}, zt = (e, t) => {
  const l = new fe(e, t.arg, t.value);
  l.scrollElement && (l.handler = () => {
    l.process();
  }, Ut.forEach((n) => {
    L(l.scrollElement, n, l.handler);
  })), e[nt] = l;
}, Kt = (e) => {
  const t = e[nt];
  t && t.scrollElement && (Ut.forEach((l) => {
    _(t.scrollElement, l, t.handler);
  }), delete e[nt]);
}, Is = (e, t) => {
  const l = t.arg !== t.oldArg, n = t.value !== t.oldValue;
  (l || n) && (Ht(e), zt(e, t));
}, Vs = {
  beforeMount: Ht,
  mounted: zt,
  updated: Is,
  unmounted: Kt
}, pt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  popover: Bs,
  scrollspy: Vs,
  tooltip: Os
}, Symbol.toStringTag, { value: "Module" })), X = {
  ALERT: 0,
  CONFIRM: 1,
  PROMPT: 2
}, Ns = ["innerHTML"], Ms = { key: 1 }, _s = { key: 2 }, Ps = ["type", "onKeyup"], Ls = {
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
    const t = e, l = P(!0), n = P(t.defaultValue ?? ""), o = P(!1), s = P(null), a = R(
      () => J(t.backdrop) ? !!t.backdrop : t.type !== X.ALERT
    ), i = R(() => t.validator(n.value)), d = R(() => o.value && i.value), p = R(() => t.okText || se("uiv.modal.ok")), f = R(() => t.cancelText || se("uiv.modal.cancel"));
    function m(y) {
      var g;
      (g = s.value) == null || g.hideModal(y);
    }
    function c() {
      o.value = !0, J(i.value) || m({ value: n.value });
    }
    return (y, g) => (u(), Y(Et, {
      ref_key: "modal",
      ref: s,
      modelValue: l.value,
      "onUpdate:modelValue": g[7] || (g[7] = (v) => l.value = v),
      "auto-focus": "",
      size: e.size,
      title: e.title,
      header: !!e.title,
      backdrop: $(a),
      "cancel-text": e.cancelText,
      "ok-text": e.okText,
      class: k(e.customClass),
      onHide: e.cb
    }, Jt({
      default: O(() => [
        e.html ? (u(), h("div", {
          key: 0,
          innerHTML: e.content
        }, null, 8, Ns)) : (u(), h("p", Ms, I(e.content), 1)),
        e.type === $(X).PROMPT ? (u(), h("div", _s, [
          r("div", {
            class: k(["form-group", { "has-error": $(d) }])
          }, [
            te(r("input", {
              "onUpdate:modelValue": g[0] || (g[0] = (v) => n.value = v),
              type: e.inputType,
              class: "form-control",
              required: "",
              "data-action": "auto-focus",
              onChange: g[1] || (g[1] = (v) => o.value = !0),
              onKeyup: W(c, ["enter"])
            }, null, 40, Ps), [
              [Xt, n.value]
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
            onClick: g[2] || (g[2] = (v) => m("ok"))
          }, {
            default: O(() => [
              q(I($(p)), 1)
            ]),
            _: 1
          }, 8, ["type", "data-action"])
        ]),
        key: "0"
      } : {
        name: "footer",
        fn: O(() => [
          e.reverseButtons ? (u(), h(F, { key: 0 }, [
            e.type === $(X).CONFIRM ? (u(), Y(D, {
              key: 0,
              type: e.okType,
              "data-action": e.autoFocus === "ok" ? "auto-focus" : "",
              onClick: g[3] || (g[3] = (v) => m("ok"))
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
              onClick: g[4] || (g[4] = (v) => m("cancel"))
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
              onClick: g[5] || (g[5] = (v) => m("cancel"))
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
              onClick: g[6] || (g[6] = (v) => m("ok"))
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
        ]),
        key: "1"
      }
    ]), 1032, ["modelValue", "size", "title", "header", "backdrop", "cancel-text", "ok-text", "class", "onHide"]));
  }
}, Ds = (e) => {
  ce(null, e);
}, Ve = (e, t) => e === X.CONFIRM ? t === "ok" : J(t) && ue(t.value), Rs = function(e, t, l, n = null, o = null) {
  const s = document.createElement("div"), a = Se(Ls, {
    type: e,
    ...t,
    cb(i) {
      Ds(s), he(l) ? e === X.CONFIRM ? Ve(e, i) ? l(null, i) : l(i) : e === X.PROMPT && Ve(e, i) ? l(null, i.value) : l(i) : n && o && (e === X.CONFIRM ? Ve(e, i) ? n(i) : o(i) : e === X.PROMPT ? Ve(e, i) ? n(i.value) : o(i) : n(i));
    }
  });
  ce(a, s), document.body.appendChild(s.firstElementChild);
}, at = function(e, t = {}, l) {
  return new Promise((n, o) => {
    Rs.apply(this, [e, t, l, n, o]);
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
}, mt = "in", be = "glyphicon", yt = 300, gt = 300, zs = {
  components: { Alert: It },
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
    publicHeight() {
      return this.height;
    },
    styles() {
      const e = this.queue, t = e.findIndex((l) => l._.uid === this._.uid);
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
          return `${be} ${be}-info-sign`;
        case Ne.SUCCESS:
          return `${be} ${be}-ok-sign`;
        case Ne.DANGER:
          return `${be} ${be}-remove-sign`;
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
  // unmounted() {
  //   console.log('unmounted')
  // },
  methods: {
    getTotalHeightOfQueue(e, t = e.length) {
      let l = this.offsetY;
      for (let n = 0; n < t; n++)
        l += e[n].publicHeight + this.offset;
      return l;
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
function Zs(e, t, l, n, o, s) {
  const a = $e("alert");
  return u(), Y(a, {
    class: k(["fade", l.customClass]),
    style: ge(s.styles),
    type: l.type,
    duration: l.duration,
    dismissible: l.dismissible,
    onDismissed: s.onDismissed
  }, {
    default: O(() => [
      r("div", Ks, [
        s.icons ? (u(), h("div", Ys, [
          r("span", {
            class: k(s.icons),
            style: { "font-size": "1.5em" }
          }, null, 2)
        ])) : N("", !0),
        r("div", Ws, [
          l.title ? (u(), h("div", qs, [
            r("b", null, I(l.title), 1)
          ])) : N("", !0),
          l.html ? (u(), h("div", {
            key: 1,
            innerHTML: l.content
          }, null, 8, Gs)) : (u(), h("div", js, I(l.content), 1))
        ])
      ])
    ]),
    _: 1
  }, 8, ["class", "style", "type", "duration", "dismissible", "onDismissed"]);
}
const Js = /* @__PURE__ */ ke(zs, [["render", Zs]]), _e = Re({
  [re.TOP_LEFT]: [],
  [re.TOP_RIGHT]: [],
  [re.BOTTOM_LEFT]: [],
  [re.BOTTOM_RIGHT]: []
}), Xs = (e, { vNode: t, container: l }) => {
  ce(null, l), ot(e, t.component.ctx);
}, Qs = (e, t, l = null, n = null) => {
  const o = document.createElement("div"), s = e.placement, a = _e[s];
  if (!J(a))
    return;
  e.type === "error" && (e.type = "danger");
  const i = Se(Js, {
    queue: a,
    placement: s,
    ...e,
    cb(d) {
      Xs(a, { vNode: i, container: o }), he(t) ? t(d) : l && n && l(d);
    }
  });
  ce(i, o), document.body.appendChild(o.firstElementChild), a.push(i.component.ctx);
}, st = (e = {}, t) => (ue(e) && (e = {
  content: e
}), J(e.placement) || (e.placement = re.TOP_RIGHT), new Promise((l, n) => {
  Qs(e, t, l, n);
}));
function Te(e, t) {
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
      Te("success", e);
    }
  },
  info: {
    configurable: !1,
    writable: !1,
    value(e) {
      Te("info", e);
    }
  },
  warning: {
    configurable: !1,
    writable: !1,
    value(e) {
      Te("warning", e);
    }
  },
  danger: {
    configurable: !1,
    writable: !1,
    value(e) {
      Te("danger", e);
    }
  },
  error: {
    configurable: !1,
    writable: !1,
    value(e) {
      Te("danger", e);
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
}, Symbol.toStringTag, { value: "Module" })), no = (e, t = {}) => {
  ct.use(t.locale), ct.i18n(t.i18n), Object.keys(ft).forEach((l) => {
    const n = t.prefix ? t.prefix + l : l;
    e.component(n, ft[l]);
  }), Object.keys(pt).forEach((l) => {
    const n = t.prefix ? t.prefix + "-" + l : l;
    e.directive(n, pt[l]);
  }), Object.keys(vt).forEach((l) => {
    const n = vt[l];
    Object.keys(n).forEach((o) => {
      const s = t.prefix ? t.prefix + "_" + o : o;
      e.config.globalProperties["$" + s] = n[o];
    });
  });
};
export {
  fn as Affix,
  It as Alert,
  Lt as BreadcrumbItem,
  es as Breadcrumbs,
  D as Btn,
  St as BtnGroup,
  ls as BtnToolbar,
  sl as Carousel,
  wt as Collapse,
  dn as DatePicker,
  Ue as Dropdown,
  Hs as MessageBox,
  Et as Modal,
  ms as MultiSelect,
  Ts as Navbar,
  Ss as NavbarForm,
  ws as NavbarNav,
  $s as NavbarText,
  to as Notification,
  Bn as Pagination,
  Mt as Popover,
  Jn as ProgressBar,
  Pt as ProgressBarStack,
  al as Slide,
  Ml as Tab,
  Ul as Tabs,
  Kn as TimePicker,
  Nt as Tooltip,
  Gn as Typeahead,
  no as install,
  Bs as popover,
  Vs as scrollspy,
  Os as tooltip
};
