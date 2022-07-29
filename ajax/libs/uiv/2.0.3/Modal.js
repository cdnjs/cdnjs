import { openBlock as u, createElementBlock as f, normalizeClass as c, renderSlot as r, computed as I, resolveComponent as P, unref as p, createBlock as V, withCtx as k, createElementVNode as d, withModifiers as L, createCommentVNode as S, createTextVNode as D, toDisplayString as v, createVNode as N } from "vue";
function R(e) {
  return typeof e < "u" && e !== null;
}
function A(e) {
  return typeof e == "function";
}
const H = {
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
let K = H, F = function() {
  return "$t" in this ? this.$t.apply(this, arguments) : null;
};
const W = function(e, o) {
  o = o || {};
  let t;
  try {
    if (t = F.apply(this, arguments), R(t) && !o.$$locale)
      return t;
  } catch {
  }
  const n = e.split(".");
  let i = o.$$locale || K;
  for (let l = 0, a = n.length; l < a; l++) {
    const s = n[l];
    if (t = i[s], l === a - 1)
      return t;
    if (!t)
      return "";
    i = t;
  }
  return "";
}, Y = {
  __name: "BtnGroup",
  props: {
    size: { type: String, default: void 0 },
    vertical: { type: Boolean, default: !1 },
    justified: { type: Boolean, default: !1 }
  },
  setup(e) {
    return (o, t) => (u(), f("div", {
      class: c({
        "btn-group": !e.vertical,
        "btn-group-vertical": e.vertical,
        "btn-group-justified": e.justified,
        [`btn-group-${e.size}`]: e.size
      }),
      role: "group",
      "data-toggle": "buttons"
    }, [
      r(o.$slots, "default")
    ], 2));
  }
}, j = {
  href: { type: String, default: void 0 },
  target: { type: String, default: void 0 },
  to: { type: null, default: void 0 },
  replace: { type: Boolean, default: !1 },
  append: { type: Boolean, default: !1 },
  exact: { type: Boolean, default: !1 }
}, q = ["href", "target"], Z = ["type", "checked", "disabled"], J = ["type", "disabled"], G = ["type", "disabled"], X = {
  __name: "Btn",
  props: {
    ...j,
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
  setup(e, { emit: o }) {
    const t = e, n = I(
      () => t.inputType === "checkbox" ? t.modelValue.indexOf(t.inputValue) >= 0 : t.modelValue === t.inputValue
    ), i = I(() => ({
      btn: !0,
      active: t.inputType ? n.value : t.active,
      disabled: t.disabled,
      "btn-block": t.block,
      [`btn-${t.type}`]: !!t.type,
      [`btn-${t.size}`]: !!t.size
    }));
    function l(s) {
      t.disabled && s instanceof Event && (s.preventDefault(), s.stopPropagation());
    }
    function a() {
      if (t.inputType === "checkbox") {
        const s = t.modelValue.slice();
        n.value ? s.splice(s.indexOf(t.inputValue), 1) : s.push(t.inputValue), o("update:modelValue", s);
      } else
        o("update:modelValue", t.inputValue);
    }
    return (s, z) => {
      const _ = P("RouterLink");
      return s.href ? (u(), f("a", {
        key: 0,
        href: s.href,
        target: s.target,
        role: "button",
        class: c(p(i)),
        onClick: l
      }, [
        r(s.$slots, "default")
      ], 10, q)) : s.to ? (u(), V(_, {
        key: 1,
        to: s.to,
        class: c(p(i)),
        event: e.disabled ? "" : "click",
        replace: s.replace,
        append: s.append,
        exact: s.exact,
        role: "button",
        onClick: l
      }, {
        default: k(() => [
          r(s.$slots, "default")
        ]),
        _: 3
      }, 8, ["to", "class", "event", "replace", "append", "exact"])) : e.inputType ? (u(), f("label", {
        key: 2,
        class: c(p(i)),
        onClick: l
      }, [
        d("input", {
          autocomplete: "off",
          type: e.inputType,
          checked: p(n),
          disabled: e.disabled,
          onInput: z[0] || (z[0] = L(() => {
          }, ["stop"])),
          onChange: a
        }, null, 40, Z),
        r(s.$slots, "default")
      ], 2)) : e.justified ? (u(), V(Y, { key: 3 }, {
        default: k(() => [
          d("button", {
            class: c(p(i)),
            type: e.nativeType,
            disabled: e.disabled,
            onClick: l
          }, [
            r(s.$slots, "default")
          ], 10, J)
        ]),
        _: 3
      })) : (u(), f("button", {
        key: 4,
        class: c(p(i)),
        type: e.nativeType,
        disabled: e.disabled,
        onClick: l
      }, [
        r(s.$slots, "default")
      ], 10, G));
    };
  }
}, h = {
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
function $(e) {
  return window.getComputedStyle(e);
}
function Q() {
  const e = window.innerWidth || 0, o = window.innerHeight || 0;
  return { width: e, height: o };
}
let m = null, w = null;
function ee(e = !1) {
  const o = Q();
  if (m !== null && !e && o.height === w.height && o.width === w.width)
    return m;
  if (document.readyState === "loading")
    return null;
  const t = document.createElement("div"), n = document.createElement("div");
  return t.style.width = n.style.width = t.style.height = n.style.height = "100px", t.style.overflow = "scroll", n.style.overflow = "hidden", document.body.appendChild(t), document.body.appendChild(n), m = Math.abs(t.scrollHeight - n.scrollHeight), document.body.removeChild(t), document.body.removeChild(n), w = o, m;
}
function T(e, o, t) {
  e.addEventListener(o, t);
}
function b(e, o, t) {
  e.removeEventListener(o, t);
}
function C(e) {
  return e && e.nodeType === Node.ELEMENT_NODE;
}
function y(e) {
  C(e) && C(e.parentNode) && e.parentNode.removeChild(e);
}
function O(e, o) {
  !C(e) || e.classList.add(o);
}
function M(e, o) {
  !C(e) || e.classList.remove(o);
}
function x(e) {
  const o = "scroll", t = e.scrollHeight > e.clientHeight, n = $(e);
  return t || n.overflow === o || n.overflowY === o;
}
function E(e) {
  const o = "modal-open", t = ".navbar-fixed-top, .navbar-fixed-bottom", n = document.body;
  if (e)
    M(n, o), n.style.paddingRight = null, [...document.querySelectorAll(t)].forEach((i) => {
      i.style.paddingRight = null;
    });
  else {
    if (x(document.documentElement) || x(document.body)) {
      const l = ee();
      n.style.paddingRight = `${l}px`, [...document.querySelectorAll(t)].forEach((a) => {
        a.style.paddingRight = `${l}px`;
      });
    }
    O(n, o);
  }
}
const te = "modal-backdrop";
function U() {
  return document.querySelectorAll(`.${te}`);
}
function B() {
  return U().length;
}
const oe = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [n, i] of o)
    t[n] = i;
  return t;
}, g = "in", ne = {
  components: { Btn: X },
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
    y(this.$refs.backdrop), T(window, h.MOUSE_DOWN, this.suppressBackgroundClose), T(window, h.KEY_UP, this.onKeyPress), this.modelValue && this.$toggle(!0);
  },
  beforeUnmount() {
    clearTimeout(this.timeoutId), y(this.$refs.backdrop), y(this.$el), B() === 0 && E(!0), b(window, h.MOUSE_DOWN, this.suppressBackgroundClose), b(window, h.MOUSE_UP, this.unsuppressBackgroundClose), b(window, h.KEY_UP, this.onKeyPress);
  },
  methods: {
    t: W,
    onKeyPress(e) {
      if (this.keyboard && this.modelValue && e.keyCode === 27) {
        const o = this.$refs.backdrop;
        let t = o.style.zIndex;
        t = t && t !== "auto" ? parseInt(t) : 0;
        const n = U(), i = n.length;
        for (let l = 0; l < i; l++)
          if (n[l] !== o) {
            let a = n[l].style.zIndex;
            if (a = a && a !== "auto" ? parseInt(a) : 0, a > t)
              return;
          }
        this.hideModal();
      }
    },
    hideModal(e) {
      const o = A(this.beforeClose) ? this.beforeClose(e) : !0;
      Promise.resolve(o).then((t) => {
        !t || (this.msg = e, this.$emit("update:modelValue", !1));
      });
    },
    $toggle(e) {
      const o = this.$el, t = this.$refs.backdrop;
      clearTimeout(this.timeoutId), e ? this.$nextTick(() => {
        const n = B();
        if (document.body.appendChild(t), this.appendToBody && document.body.appendChild(o), o.style.display = this.displayStyle, o.scrollTop = 0, t.offsetHeight, E(!1), O(t, g), O(o, g), n > 0) {
          const i = parseInt($(o).zIndex) || 1050, l = parseInt($(t).zIndex) || 1040, a = n * this.zOffset;
          o.style.zIndex = `${i + a}`, t.style.zIndex = `${l + a}`;
        }
        this.timeoutId = setTimeout(() => {
          if (this.autoFocus) {
            const i = this.$el.querySelector('[data-action="auto-focus"]');
            i && (i.focus(), i.setAttribute("data-focused", "true"));
          }
          this.$emit("show"), this.timeoutId = 0;
        }, this.transition);
      }) : (M(t, g), M(o, g), this.timeoutId = setTimeout(() => {
        o.style.display = "none", y(t), this.appendToBody && y(o), B() === 0 && E(!0), this.$emit("hide", this.msg || "dismiss"), this.msg = "", this.timeoutId = 0, o.style.zIndex = "", t.style.zIndex = "";
      }, this.transition));
    },
    suppressBackgroundClose(e) {
      e && e.target === this.$el || (this.isCloseSuppressed = !0, T(window, "mouseup", this.unsuppressBackgroundClose));
    },
    unsuppressBackgroundClose() {
      this.isCloseSuppressed && (b(window, "mouseup", this.unsuppressBackgroundClose), setTimeout(() => {
        this.isCloseSuppressed = !1;
      }, 1));
    },
    backdropClicked() {
      this.backdrop && !this.isCloseSuppressed && this.hideModal();
    }
  }
}, le = { class: "modal-content" }, se = {
  key: 0,
  class: "modal-header"
}, ie = /* @__PURE__ */ d("span", { "aria-hidden": "true" }, "\xD7", -1), ae = [
  ie
], de = { class: "modal-title" }, ue = { class: "modal-body" }, re = {
  key: 1,
  class: "modal-footer"
};
function ce(e, o, t, n, i, l) {
  const a = P("btn");
  return u(), f("div", {
    tabindex: "-1",
    role: "dialog",
    class: c(["modal", { fade: t.transition > 0 }]),
    onClick: o[3] || (o[3] = L((...s) => l.backdropClicked && l.backdropClicked(...s), ["self"]))
  }, [
    d("div", {
      ref: "dialog",
      class: c(["modal-dialog", l.modalSizeClass]),
      role: "document"
    }, [
      d("div", le, [
        t.header ? (u(), f("div", se, [
          r(e.$slots, "header", {}, () => [
            t.dismissBtn ? (u(), f("button", {
              key: 0,
              type: "button",
              class: "close",
              "aria-label": "Close",
              style: { position: "relative", "z-index": "1060" },
              onClick: o[0] || (o[0] = (s) => l.hideModal())
            }, ae)) : S("", !0),
            d("h4", de, [
              r(e.$slots, "title", {}, () => [
                D(v(t.title), 1)
              ])
            ])
          ])
        ])) : S("", !0),
        d("div", ue, [
          r(e.$slots, "default")
        ]),
        t.footer ? (u(), f("div", re, [
          r(e.$slots, "footer", {}, () => [
            N(a, {
              type: t.cancelType,
              onClick: o[1] || (o[1] = (s) => l.hideModal("cancel"))
            }, {
              default: k(() => [
                d("span", null, v(t.cancelText || l.t("uiv.modal.cancel")), 1)
              ]),
              _: 1
            }, 8, ["type"]),
            N(a, {
              type: t.okType,
              "data-action": "auto-focus",
              onClick: o[2] || (o[2] = (s) => l.hideModal("ok"))
            }, {
              default: k(() => [
                d("span", null, v(t.okText || l.t("uiv.modal.ok")), 1)
              ]),
              _: 1
            }, 8, ["type"])
          ])
        ])) : S("", !0)
      ])
    ], 2),
    d("div", {
      ref: "backdrop",
      class: c(["modal-backdrop", { fade: t.transition > 0 }])
    }, null, 2)
  ], 2);
}
const pe = /* @__PURE__ */ oe(ne, [["render", ce]]);
export {
  pe as default
};
