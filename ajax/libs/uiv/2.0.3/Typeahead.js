import { defineComponent as X, ref as h, onMounted as z, onBeforeUnmount as G, watch as R, createVNode as F, Teleport as Z, useSlots as J, computed as Q, nextTick as M, openBlock as A, createBlock as ee, withCtx as te, renderSlot as Y, createElementBlock as W, Fragment as le, renderList as ne, normalizeClass as oe, createElementVNode as H, withModifiers as ae, createCommentVNode as ue } from "vue";
function ie(e, s = "GET") {
  return fetch(e, { method: s }).then((t) => t.json());
}
function j(e) {
  return typeof e == "string";
}
const c = {
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
};
function w(e, s, t) {
  e.addEventListener(s, t);
}
function S(e, s, t) {
  e.removeEventListener(s, t);
}
function $(e) {
  return e && e.nodeType === Node.ELEMENT_NODE;
}
function re(e, s, t = {}) {
  const v = document.documentElement, n = (window.pageXOffset || v.scrollLeft) - (v.clientLeft || 0), o = (window.pageYOffset || v.scrollTop) - (v.clientTop || 0), a = s.getBoundingClientRect(), C = e.getBoundingClientRect();
  if (e.style.right = "auto", e.style.bottom = "auto", t.menuRight) {
    const r = n + a.left + a.width - C.width;
    e.style.left = r < 0 ? 0 : r + "px";
  } else
    e.style.left = n + a.left + "px";
  t.dropup ? e.style.top = o + a.top - C.height - 4 + "px" : e.style.top = o + a.top + a.height + "px";
}
function P(e) {
  !$(e) || (e.getAttribute("tabindex") || e.setAttribute("tabindex", "-1"), e.focus());
}
function se(e) {
  return j(e) ? document.querySelector(e) : $(e) ? e : $(e.$el) ? e.$el : null;
}
const q = "div", ce = X({
  props: {
    tag: {
      type: String,
      default: q
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
    emit: s,
    slots: t
  }) {
    const v = h(!1), n = h(void 0), o = h(null), a = h(null);
    function C() {
      var u;
      return (u = o.value) == null ? void 0 : u.querySelector("li > a:focus");
    }
    function r(u) {
      var i, d;
      if (v.value) {
        const E = o.value, m = u.keyCode;
        if (m === 27)
          T(!1), (i = n.value) == null || i.focus();
        else if (m === 13)
          (d = C()) == null || d.click();
        else if (m === 38 || m === 40) {
          u.preventDefault(), u.stopPropagation();
          const O = C(), p = E.querySelectorAll("li:not(.disabled) > a");
          if (!O)
            P(p[0]);
          else
            for (let y = 0; y < p.length; y++)
              if (O === p[y]) {
                m === 38 && y < p.length > 0 ? P(p[y - 1]) : m === 40 && y < p.length - 1 && P(p[y + 1]);
                break;
              }
        }
      }
    }
    function K() {
      var i, d, E;
      const u = ((i = a.value) == null ? void 0 : i.querySelector('[data-role="trigger"]')) || ((d = a.value) == null ? void 0 : d.querySelector(".dropdown-toggle")) || ((E = a.value) == null ? void 0 : E.firstChild);
      n.value = u && u !== o.value ? u : null;
    }
    function T(u) {
      var i;
      if (!e.disabled) {
        if (typeof u == "boolean" ? v.value = u : v.value = !v.value, e.appendToBody)
          if (v.value) {
            o.value.style.display = "block";
            const d = e.positionElement || a.value;
            re(o.value, d, e);
          } else
            (i = o.value) == null || i.removeAttribute("style");
        s("update:modelValue", v.value);
      }
    }
    function B(u) {
      var d, E, m;
      const i = u.target;
      if (v.value && i) {
        let O = !1;
        if (e.notCloseElements)
          for (let b = 0, N = e.notCloseElements.length; b < N; b++) {
            const _ = e.notCloseElements[b].contains(i);
            let k = _;
            if (e.appendToBody) {
              const U = (d = o.value) == null ? void 0 : d.contains(i), l = e.notCloseElements.indexOf(a.value) >= 0;
              k = _ || U && l;
            }
            if (k) {
              O = !0;
              break;
            }
          }
        const p = (E = o.value) == null ? void 0 : E.contains(i), y = ((m = a.value) == null ? void 0 : m.contains(i)) && !p, L = p && u.type === "touchend";
        !y && !O && !L && T(!1);
      }
    }
    return z(() => {
      K(), n.value && (w(n.value, c.CLICK, T), w(n.value, c.KEY_DOWN, r)), w(o.value, c.KEY_DOWN, r), w(window, c.CLICK, B), w(window, c.TOUCH_END, B), e.modelValue && T(!0);
    }), G(() => {
      n.value && (S(n.value, c.CLICK, T), S(n.value, c.KEY_DOWN, r)), S(o.value, c.KEY_DOWN, r), S(window, c.CLICK, B), S(window, c.TOUCH_END, B);
    }), R(() => e.modelValue, (u) => {
      T(u);
    }), () => {
      const u = e.tag;
      return F(u, {
        ref: a,
        class: {
          "btn-group": e.tag === q,
          dropdown: !e.dropup,
          dropup: e.dropup,
          open: v.value
        }
      }, {
        default: () => {
          var i;
          return [(i = t.default) == null ? void 0 : i.call(t), F(Z, {
            to: "body",
            disabled: !e.appendToBody || !v.value
          }, {
            default: () => {
              var d;
              return [F("ul", {
                ref: o,
                class: {
                  "dropdown-menu": !0,
                  "dropdown-menu-right": e.menuRight
                }
              }, [(d = t.dropdown) == null ? void 0 : d.call(t)])];
            }
          })];
        }
      });
    };
  }
}), de = ["onClick"], fe = ["innerHTML"], pe = {
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
  setup(e, { emit: s }) {
    const t = e, v = J(), n = h(null), o = h([]), a = h(0), C = h([]), r = h(!1), K = h(null);
    let T = null, B = 0;
    const u = Q(() => {
      let l = "";
      return t.ignoreCase && (l += "i"), t.matchStart || (l += "g"), l;
    });
    R(
      () => t.target,
      (l) => {
        O(), E(l), m();
      }
    ), R(
      () => t.modelValue,
      (l) => {
        i(l);
      }
    ), R(
      () => a.value,
      (l) => {
        l >= 0 && s("selected-item-changed", l);
      }
    ), z(async () => {
      await M(), E(t.target), m(), T = K.value.$el.querySelector(".dropdown-menu"), t.modelValue && i(t.modelValue);
    }), G(() => {
      O();
    });
    function i(l) {
      j(l) ? n.value.value = l : l ? n.value.value = t.itemKey ? l[t.itemKey] : l : l === null && (n.value.value = "");
    }
    function d() {
      return !!v.empty;
    }
    function E(l) {
      !l || (n.value = se(l));
    }
    function m() {
      n.value && (C.value = [n.value], w(n.value, c.FOCUS, b), w(n.value, c.BLUR, N), w(n.value, c.INPUT, L), w(n.value, c.KEY_DOWN, _));
    }
    function O() {
      C.value = [], n.value && (S(n.value, c.FOCUS, b), S(n.value, c.BLUR, N), S(n.value, c.INPUT, L), S(n.value, c.KEY_DOWN, _));
    }
    function p(l, g = !1) {
      if (g) {
        o.value = l.slice(0, t.limit);
        return;
      }
      o.value = [], a.value = t.preselect ? 0 : -1;
      for (let f = 0, I = l.length; f < I; f++) {
        const V = l[f];
        let D = t.itemKey ? V[t.itemKey] : V;
        D = D.toString();
        let x = -1;
        if (t.ignoreCase ? x = D.toLowerCase().indexOf(n.value.value.toLowerCase()) : x = D.indexOf(n.value.value), (t.matchStart ? x === 0 : x >= 0) && o.value.push(V), o.value.length >= t.limit)
          break;
      }
    }
    function y(l, g) {
      if (clearTimeout(B), l === "" && !t.openOnEmpty)
        r.value = !1;
      else if (t.data)
        p(t.data), r.value = d() || !!o.value.length;
      else if (t.asyncSrc)
        B = setTimeout(() => {
          s("loading"), ie(t.asyncSrc + encodeURIComponent(l)).then((f) => {
            n.value.matches(":focus") && (p(t.asyncKey ? f[t.asyncKey] : f, !0), r.value = d() || !!o.value.length), s("loaded");
          }).catch((f) => {
            console.error(f), s("loaded-error");
          });
        }, g);
      else if (t.asyncFunction) {
        const f = (I) => {
          n.value.matches(":focus") && (p(I, !0), r.value = d() || !!o.value.length), s("loaded");
        };
        B = setTimeout(() => {
          s("loading"), t.asyncFunction(l, f);
        }, g);
      }
    }
    function L() {
      const l = n.value.value;
      y(l, t.debounce), s("update:modelValue", t.forceSelect ? void 0 : l);
    }
    function b() {
      if (t.openOnFocus) {
        const l = n.value.value;
        y(l, 0);
      }
    }
    async function N() {
      T.matches(":hover") || (r.value = !1), n.value && t.forceClear && (await M(), typeof t.modelValue > "u" && (n.value.value = ""));
    }
    function _(l) {
      if (l.stopPropagation(), r.value)
        switch (l.keyCode) {
          case 13:
            a.value >= 0 ? k(o.value[a.value]) : r.value = !1, l.preventDefault();
            break;
          case 27:
            r.value = !1;
            break;
          case 38:
            a.value = a.value > 0 ? a.value - 1 : 0;
            break;
          case 40: {
            const g = o.value.length - 1;
            a.value = a.value < g ? a.value + 1 : g;
            break;
          }
        }
    }
    function k(l) {
      s("update:modelValue", l), r.value = !1;
    }
    function U(l) {
      const g = t.itemKey ? l[t.itemKey] : l, f = n.value.value.replace(
        /[-[\]{}()*+?.,\\^$|#\s]/g,
        "\\$&"
      );
      return g.replace(
        new RegExp(`${f}`, u.value),
        "<b>$&</b>"
      );
    }
    return (l, g) => (A(), ee(ce, {
      ref_key: "dropdown",
      ref: K,
      modelValue: r.value,
      "onUpdate:modelValue": g[0] || (g[0] = (f) => r.value = f),
      tag: "section",
      "append-to-body": e.appendToBody,
      "not-close-elements": C.value,
      "position-element": n.value
    }, {
      dropdown: te(() => [
        Y(l.$slots, "item", {
          items: o.value,
          activeIndex: a.value,
          select: k,
          highlight: U
        }, () => [
          (A(!0), W(le, null, ne(o.value, (f, I) => (A(), W("li", {
            key: I,
            class: oe({ active: a.value === I })
          }, [
            H("a", {
              href: "#",
              onClick: ae((V) => k(f), ["prevent"])
            }, [
              H("span", {
                innerHTML: U(f)
              }, null, 8, fe)
            ], 8, de)
          ], 2))), 128))
        ]),
        !o.value || o.value.length === 0 ? Y(l.$slots, "empty", { key: 0 }) : ue("", !0)
      ]),
      _: 3
    }, 8, ["modelValue", "append-to-body", "not-close-elements", "position-element"]));
  }
};
export {
  pe as default
};
