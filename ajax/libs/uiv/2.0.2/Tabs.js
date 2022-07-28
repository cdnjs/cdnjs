import { defineComponent as G, ref as I, onMounted as X, onBeforeUnmount as Z, watch as J, createVNode as b, Teleport as Q, resolveComponent as ee, openBlock as h, createElementBlock as m, createElementVNode as N, normalizeClass as k, Fragment as D, renderList as P, withDirectives as x, createBlock as te, withCtx as Y, withModifiers as S, toDisplayString as V, vShow as L, createTextVNode as ne, renderSlot as F, createCommentVNode as le } from "vue";
function R(e) {
  return typeof e < "u" && e !== null;
}
function se(e) {
  return typeof e == "function";
}
function M(e) {
  return typeof e == "number";
}
function W(e) {
  return typeof e == "string";
}
function oe(e, n) {
  return Object.prototype.hasOwnProperty.call(e, n);
}
const p = {
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
function T(e, n, t) {
  e.addEventListener(n, t);
}
function O(e, n, t) {
  e.removeEventListener(n, t);
}
function ie(e) {
  return e && e.nodeType === Node.ELEMENT_NODE;
}
function ae(e, n, t = {}) {
  const o = document.documentElement, a = (window.pageXOffset || o.scrollLeft) - (o.clientLeft || 0), l = (window.pageYOffset || o.scrollTop) - (o.clientTop || 0), r = n.getBoundingClientRect(), i = e.getBoundingClientRect();
  if (e.style.right = "auto", e.style.bottom = "auto", t.menuRight) {
    const d = a + r.left + r.width - i.width;
    e.style.left = d < 0 ? 0 : d + "px";
  } else
    e.style.left = a + r.left + "px";
  t.dropup ? e.style.top = l + r.top - i.height - 4 + "px" : e.style.top = l + r.top + r.height + "px";
}
function U(e) {
  !ie(e) || (e.getAttribute("tabindex") || e.setAttribute("tabindex", "-1"), e.focus());
}
const $ = "div", ue = G({
  props: {
    tag: {
      type: String,
      default: $
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
    emit: n,
    slots: t
  }) {
    const o = I(!1), a = I(void 0), l = I(null), r = I(null);
    function i() {
      var s;
      return (s = l.value) == null ? void 0 : s.querySelector("li > a:focus");
    }
    function d(s) {
      var u, c;
      if (o.value) {
        const E = l.value, g = s.keyCode;
        if (g === 27)
          y(!1), (u = a.value) == null || u.focus();
        else if (g === 13)
          (c = i()) == null || c.click();
        else if (g === 38 || g === 40) {
          s.preventDefault(), s.stopPropagation();
          const _ = i(), f = E.querySelectorAll("li:not(.disabled) > a");
          if (!_)
            U(f[0]);
          else
            for (let v = 0; v < f.length; v++)
              if (_ === f[v]) {
                g === 38 && v < f.length > 0 ? U(f[v - 1]) : g === 40 && v < f.length - 1 && U(f[v + 1]);
                break;
              }
        }
      }
    }
    function C() {
      var u, c, E;
      const s = ((u = r.value) == null ? void 0 : u.querySelector('[data-role="trigger"]')) || ((c = r.value) == null ? void 0 : c.querySelector(".dropdown-toggle")) || ((E = r.value) == null ? void 0 : E.firstChild);
      a.value = s && s !== l.value ? s : null;
    }
    function y(s) {
      var u;
      if (!e.disabled) {
        if (typeof s == "boolean" ? o.value = s : o.value = !o.value, e.appendToBody)
          if (o.value) {
            l.value.style.display = "block";
            const c = e.positionElement || r.value;
            ae(l.value, c, e);
          } else
            (u = l.value) == null || u.removeAttribute("style");
        n("update:modelValue", o.value);
      }
    }
    function w(s) {
      var c, E, g;
      const u = s.target;
      if (o.value && u) {
        let _ = !1;
        if (e.notCloseElements)
          for (let B = 0, q = e.notCloseElements.length; B < q; B++) {
            const K = e.notCloseElements[B].contains(u);
            let A = K;
            if (e.appendToBody) {
              const H = (c = l.value) == null ? void 0 : c.contains(u), z = e.notCloseElements.indexOf(r.value) >= 0;
              A = K || H && z;
            }
            if (A) {
              _ = !0;
              break;
            }
          }
        const f = (E = l.value) == null ? void 0 : E.contains(u), v = ((g = r.value) == null ? void 0 : g.contains(u)) && !f, j = f && s.type === "touchend";
        !v && !_ && !j && y(!1);
      }
    }
    return X(() => {
      C(), a.value && (T(a.value, p.CLICK, y), T(a.value, p.KEY_DOWN, d)), T(l.value, p.KEY_DOWN, d), T(window, p.CLICK, w), T(window, p.TOUCH_END, w), e.modelValue && y(!0);
    }), Z(() => {
      a.value && (O(a.value, p.CLICK, y), O(a.value, p.KEY_DOWN, d)), O(l.value, p.KEY_DOWN, d), O(window, p.CLICK, w), O(window, p.TOUCH_END, w);
    }), J(() => e.modelValue, (s) => {
      y(s);
    }), () => {
      const s = e.tag;
      return b(s, {
        ref: r,
        class: {
          "btn-group": e.tag === $,
          dropdown: !e.dropup,
          dropup: e.dropup,
          open: o.value
        }
      }, {
        default: () => {
          var u;
          return [(u = t.default) == null ? void 0 : u.call(t), b(Q, {
            to: "body",
            disabled: !e.appendToBody || !o.value
          }, {
            default: () => {
              var c;
              return [b("ul", {
                ref: l,
                class: {
                  "dropdown-menu": !0,
                  "dropdown-menu-right": e.menuRight
                }
              }, [(c = t.dropdown) == null ? void 0 : c.call(t)])];
            }
          })];
        }
      });
    };
  }
}), re = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [o, a] of n)
    t[o] = a;
  return t;
}, ce = {
  components: { Dropdown: ue },
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
      }, n = this.customNavClass;
      return R(n) ? W(n) ? {
        ...e,
        [n]: !0
      } : {
        ...e,
        ...n
      } : e;
    },
    contentClasses() {
      const e = {
        "tab-content": !0
      }, n = this.customContentClass;
      return R(n) ? W(n) ? { ...e, [n]: !0 } : { ...e, ...n } : e;
    },
    groupedTabs() {
      let e = [];
      const n = {};
      return this.tabs.forEach((t) => {
        t.group ? (oe(n, t.group) ? e[n[t.group]].tabs.push(t) : (e.push({
          tabs: [t],
          group: t.group
        }), n[t.group] = e.length - 1), t.active && (e[n[t.group]].active = !0), t.pullRight && (e[n[t.group]].pullRight = !0)) : e.push(t);
      }), e = e.map((t) => (Array.isArray(t.tabs) && (t.hidden = t.tabs.filter((o) => o.hidden).length === t.tabs.length), t)), e;
    }
  },
  watch: {
    modelValue(e) {
      M(e) && (this.activeIndex = e, this.selectCurrent());
    },
    tabs(e) {
      e.forEach((n, t) => {
        n.transition = this.transition, t === this.activeIndex && n.show();
      }), this.selectCurrent();
    }
  },
  mounted() {
    this.selectCurrent();
  },
  methods: {
    getTabClasses(e, n = !1) {
      return { ...{
        active: e.active,
        disabled: e.disabled,
        "pull-right": e.pullRight && !n
      }, ...e.tabClasses };
    },
    selectCurrent() {
      let e = !1;
      this.tabs.forEach((n, t) => {
        t === this.activeIndex ? (e = !n.active, n.active = !0) : n.active = !1;
      }), e && this.$emit("change", this.activeIndex);
    },
    selectValidate(e) {
      se(this.beforeChange) ? this.beforeChange(this.activeIndex, e, (n) => {
        R(n) || this.$select(e);
      }) : this.$select(e);
    },
    select(e) {
      !this.tabs[e].disabled && e !== this.activeIndex && this.selectValidate(e);
    },
    $select(e) {
      M(this.modelValue) ? this.$emit("update:modelValue", e) : (this.activeIndex = e, this.selectCurrent());
    }
  }
}, de = /* @__PURE__ */ N("span", { class: "caret" }, null, -1), fe = ["onClick"], he = ["id", "onClick"], pe = ["onClick", "textContent"], ge = {
  key: 0,
  class: "pull-right"
};
function ve(e, n, t, o, a, l) {
  const r = ee("dropdown");
  return h(), m("section", null, [
    N("ul", {
      class: k(l.navClasses),
      role: "tablist"
    }, [
      (h(!0), m(D, null, P(l.groupedTabs, (i, d) => (h(), m(D, { key: d }, [
        i.tabs ? x((h(), te(r, {
          key: 0,
          role: "presentation",
          tag: "li",
          class: k(l.getTabClasses(i))
        }, {
          dropdown: Y(() => [
            (h(!0), m(D, null, P(i.tabs, (C, y) => x((h(), m("li", {
              key: `${d}_${y}`,
              class: k(l.getTabClasses(C, !0))
            }, [
              N("a", {
                href: "#",
                onClick: S((w) => l.select(a.tabs.indexOf(C)), ["prevent"])
              }, V(C.title), 9, fe)
            ], 2)), [
              [L, !C.hidden]
            ])), 128))
          ]),
          default: Y(() => [
            N("a", {
              class: "dropdown-toggle",
              role: "tab",
              href: "#",
              onClick: n[0] || (n[0] = S(() => {
              }, ["prevent"]))
            }, [
              ne(V(i.group) + " ", 1),
              de
            ])
          ]),
          _: 2
        }, 1032, ["class"])), [
          [L, !i.hidden]
        ]) : x((h(), m("li", {
          key: 1,
          role: "presentation",
          class: k(l.getTabClasses(i))
        }, [
          i.$slots.title ? (h(), m("a", {
            key: 0,
            id: i.uid,
            role: "tab",
            href: "#",
            onClick: S((C) => l.select(a.tabs.indexOf(i)), ["prevent"])
          }, null, 8, he)) : (h(), m("a", {
            key: 1,
            role: "tab",
            href: "#",
            onClick: S((C) => l.select(a.tabs.indexOf(i)), ["prevent"]),
            textContent: V(i.title)
          }, null, 8, pe))
        ], 2)), [
          [L, !i.hidden]
        ])
      ], 64))), 128)),
      !t.justified && e.$slots["nav-right"] ? (h(), m("li", ge, [
        F(e.$slots, "nav-right")
      ])) : le("", !0)
    ], 2),
    N("div", {
      class: k(l.contentClasses)
    }, [
      F(e.$slots, "default")
    ], 2)
  ]);
}
const Ce = /* @__PURE__ */ re(ce, [["render", ve]]);
export {
  Ce as default
};
