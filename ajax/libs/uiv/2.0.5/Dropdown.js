import { defineComponent as k, ref as h, onMounted as R, onBeforeUnmount as A, watch as x, createVNode as _, Teleport as V } from "vue";
const s = {
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
function C(e, g, a) {
  e.addEventListener(g, a);
}
function T(e, g, a) {
  e.removeEventListener(g, a);
}
function Y(e) {
  return e && e.nodeType === Node.ELEMENT_NODE;
}
function P(e, g, a = {}) {
  const o = document.documentElement, d = (window.pageXOffset || o.scrollLeft) - (o.clientLeft || 0), l = (window.pageYOffset || o.scrollTop) - (o.clientTop || 0), u = g.getBoundingClientRect(), p = e.getBoundingClientRect();
  if (e.style.right = "auto", e.style.bottom = "auto", a.menuRight) {
    const E = d + u.left + u.width - p.width;
    e.style.left = E < 0 ? 0 : E + "px";
  } else
    e.style.left = d + u.left + "px";
  a.dropup ? e.style.top = l + u.top - p.height - 4 + "px" : e.style.top = l + u.top + u.height + "px";
}
function S(e) {
  !Y(e) || (e.getAttribute("tabindex") || e.setAttribute("tabindex", "-1"), e.focus());
}
const D = "div", W = /* @__PURE__ */ k({
  props: {
    tag: {
      type: String,
      default: D
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
    emit: g,
    slots: a
  }) {
    const o = h(!1), d = h(void 0), l = h(null), u = h(null);
    function p() {
      var t;
      return (t = l.value) == null ? void 0 : t.querySelector("li > a:focus");
    }
    function E(t) {
      var n, i;
      if (o.value) {
        const m = l.value, c = t.keyCode;
        if (c === 27)
          v(!1), (n = d.value) == null || n.focus();
        else if (c === 13)
          (i = p()) == null || i.click();
        else if (c === 38 || c === 40) {
          t.preventDefault(), t.stopPropagation();
          const y = p(), f = m.querySelectorAll("li:not(.disabled) > a");
          if (!y)
            S(f[0]);
          else
            for (let r = 0; r < f.length; r++)
              if (y === f[r]) {
                c === 38 && r < f.length > 0 ? S(f[r - 1]) : c === 40 && r < f.length - 1 && S(f[r + 1]);
                break;
              }
        }
      }
    }
    function I() {
      var n, i, m;
      const t = ((n = u.value) == null ? void 0 : n.querySelector('[data-role="trigger"]')) || ((i = u.value) == null ? void 0 : i.querySelector(".dropdown-toggle")) || ((m = u.value) == null ? void 0 : m.firstChild);
      d.value = t && t !== l.value ? t : null;
    }
    function v(t) {
      var n;
      if (!e.disabled) {
        if (typeof t == "boolean" ? o.value = t : o.value = !o.value, e.appendToBody)
          if (o.value) {
            l.value.style.display = "block";
            const i = e.positionElement || u.value;
            P(l.value, i, e);
          } else
            (n = l.value) == null || n.removeAttribute("style");
        g("update:modelValue", o.value);
      }
    }
    function w(t) {
      var i, m, c;
      const n = t.target;
      if (o.value && n) {
        let y = !1;
        if (e.notCloseElements)
          for (let O = 0, B = e.notCloseElements.length; O < B; O++) {
            const b = e.notCloseElements[O].contains(n);
            let N = b;
            if (e.appendToBody) {
              const U = (i = l.value) == null ? void 0 : i.contains(n), K = e.notCloseElements.indexOf(u.value) >= 0;
              N = b || U && K;
            }
            if (N) {
              y = !0;
              break;
            }
          }
        const f = (m = l.value) == null ? void 0 : m.contains(n), r = ((c = u.value) == null ? void 0 : c.contains(n)) && !f, L = f && t.type === "touchend";
        !r && !y && !L && v(!1);
      }
    }
    return R(() => {
      I(), d.value && (C(d.value, s.CLICK, v), C(d.value, s.KEY_DOWN, E)), C(l.value, s.KEY_DOWN, E), C(window, s.CLICK, w), C(window, s.TOUCH_END, w), e.modelValue && v(!0);
    }), A(() => {
      d.value && (T(d.value, s.CLICK, v), T(d.value, s.KEY_DOWN, E)), T(l.value, s.KEY_DOWN, E), T(window, s.CLICK, w), T(window, s.TOUCH_END, w);
    }), x(() => e.modelValue, (t) => {
      v(t);
    }), () => {
      const t = e.tag;
      return _(t, {
        ref: u,
        class: {
          "btn-group": e.tag === D,
          dropdown: !e.dropup,
          dropup: e.dropup,
          open: o.value
        }
      }, {
        default: () => {
          var n;
          return [(n = a.default) == null ? void 0 : n.call(a), _(V, {
            to: "body",
            disabled: !e.appendToBody || !o.value
          }, {
            default: () => {
              var i;
              return [_("ul", {
                ref: l,
                class: {
                  "dropdown-menu": !0,
                  "dropdown-menu-right": e.menuRight
                }
              }, [(i = a.dropdown) == null ? void 0 : i.call(a)])];
            }
          })];
        }
      });
    };
  }
});
export {
  W as default
};
