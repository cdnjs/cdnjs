import { openBlock as s, createElementBlock as y, normalizeClass as m, renderSlot as k, computed as S, resolveComponent as Q, unref as u, createBlock as T, withCtx as c, createElementVNode as f, withModifiers as _, createCommentVNode as z, createTextVNode as v, toDisplayString as h, createVNode as O, ref as $, createSlots as oe, withDirectives as J, withKeys as le, vModelDynamic as ae, vShow as ie, Fragment as G, h as de, render as ee } from "vue";
const p = {
  ALERT: 0,
  CONFIRM: 1,
  PROMPT: 2
};
function P(e) {
  return typeof e < "u" && e !== null;
}
function te(e) {
  return typeof e == "function";
}
function ue(e) {
  return typeof e == "string";
}
const se = {
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
let re = se, ce = function() {
  return "$t" in this ? this.$t.apply(this, arguments) : null;
};
const H = function(e, n) {
  n = n || {};
  let t;
  try {
    if (t = ce.apply(this, arguments), P(t) && !n.$$locale)
      return t;
  } catch {
  }
  const l = e.split(".");
  let i = n.$$locale || re;
  for (let a = 0, d = l.length; a < d; a++) {
    const o = l[a];
    if (t = i[o], a === d - 1)
      return t;
    if (!t)
      return "";
    i = t;
  }
  return "";
}, fe = {
  __name: "BtnGroup",
  props: {
    size: { type: String, default: void 0 },
    vertical: { type: Boolean, default: !1 },
    justified: { type: Boolean, default: !1 }
  },
  setup(e) {
    return (n, t) => (s(), y("div", {
      class: m({
        "btn-group": !e.vertical,
        "btn-group-vertical": e.vertical,
        "btn-group-justified": e.justified,
        [`btn-group-${e.size}`]: e.size
      }),
      role: "group",
      "data-toggle": "buttons"
    }, [
      k(n.$slots, "default")
    ], 2));
  }
}, ye = {
  href: { type: String, default: void 0 },
  target: { type: String, default: void 0 },
  to: { type: null, default: void 0 },
  replace: { type: Boolean, default: !1 },
  append: { type: Boolean, default: !1 },
  exact: { type: Boolean, default: !1 }
}, pe = ["href", "target"], he = ["type", "checked", "disabled"], me = ["type", "disabled"], ke = ["type", "disabled"], g = {
  __name: "Btn",
  props: {
    ...ye,
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
  setup(e, { emit: n }) {
    const t = e, l = S(
      () => t.inputType === "checkbox" ? t.modelValue.indexOf(t.inputValue) >= 0 : t.modelValue === t.inputValue
    ), i = S(() => ({
      btn: !0,
      active: t.inputType ? l.value : t.active,
      disabled: t.disabled,
      "btn-block": t.block,
      [`btn-${t.type}`]: !!t.type,
      [`btn-${t.size}`]: !!t.size
    }));
    function a(o) {
      t.disabled && o instanceof Event && (o.preventDefault(), o.stopPropagation());
    }
    function d() {
      if (t.inputType === "checkbox") {
        const o = t.modelValue.slice();
        l.value ? o.splice(o.indexOf(t.inputValue), 1) : o.push(t.inputValue), n("update:modelValue", o);
      } else
        n("update:modelValue", t.inputValue);
    }
    return (o, B) => {
      const C = Q("RouterLink");
      return o.href ? (s(), y("a", {
        key: 0,
        href: o.href,
        target: o.target,
        role: "button",
        class: m(u(i)),
        onClick: a
      }, [
        k(o.$slots, "default")
      ], 10, pe)) : o.to ? (s(), T(C, {
        key: 1,
        to: o.to,
        class: m(u(i)),
        event: e.disabled ? "" : "click",
        replace: o.replace,
        append: o.append,
        exact: o.exact,
        role: "button",
        onClick: a
      }, {
        default: c(() => [
          k(o.$slots, "default")
        ]),
        _: 3
      }, 8, ["to", "class", "event", "replace", "append", "exact"])) : e.inputType ? (s(), y("label", {
        key: 2,
        class: m(u(i)),
        onClick: a
      }, [
        f("input", {
          autocomplete: "off",
          type: e.inputType,
          checked: u(l),
          disabled: e.disabled,
          onInput: B[0] || (B[0] = _(() => {
          }, ["stop"])),
          onChange: d
        }, null, 40, he),
        k(o.$slots, "default")
      ], 2)) : e.justified ? (s(), T(fe, { key: 3 }, {
        default: c(() => [
          f("button", {
            class: m(u(i)),
            type: e.nativeType,
            disabled: e.disabled,
            onClick: a
          }, [
            k(o.$slots, "default")
          ], 10, me)
        ]),
        _: 3
      })) : (s(), y("button", {
        key: 4,
        class: m(u(i)),
        type: e.nativeType,
        disabled: e.disabled,
        onClick: a
      }, [
        k(o.$slots, "default")
      ], 10, ke));
    };
  }
}, E = {
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
function K(e) {
  return window.getComputedStyle(e);
}
function be() {
  const e = window.innerWidth || 0, n = window.innerHeight || 0;
  return { width: e, height: n };
}
let x = null, L = null;
function ve(e = !1) {
  const n = be();
  if (x !== null && !e && n.height === L.height && n.width === L.width)
    return x;
  if (document.readyState === "loading")
    return null;
  const t = document.createElement("div"), l = document.createElement("div");
  return t.style.width = l.style.width = t.style.height = l.style.height = "100px", t.style.overflow = "scroll", l.style.overflow = "hidden", document.body.appendChild(t), document.body.appendChild(l), x = Math.abs(t.scrollHeight - l.scrollHeight), document.body.removeChild(t), document.body.removeChild(l), L = n, x;
}
function U(e, n, t) {
  e.addEventListener(n, t);
}
function N(e, n, t) {
  e.removeEventListener(n, t);
}
function R(e) {
  return e && e.nodeType === Node.ELEMENT_NODE;
}
function M(e) {
  R(e) && R(e.parentNode) && e.parentNode.removeChild(e);
}
function W(e, n) {
  !R(e) || e.classList.add(n);
}
function Y(e, n) {
  !R(e) || e.classList.remove(n);
}
function X(e) {
  const n = "scroll", t = e.scrollHeight > e.clientHeight, l = K(e);
  return t || l.overflow === n || l.overflowY === n;
}
function A(e) {
  const n = "modal-open", t = ".navbar-fixed-top, .navbar-fixed-bottom", l = document.body;
  if (e)
    Y(l, n), l.style.paddingRight = null, [...document.querySelectorAll(t)].forEach((i) => {
      i.style.paddingRight = null;
    });
  else {
    if (X(document.documentElement) || X(document.body)) {
      const a = ve();
      l.style.paddingRight = `${a}px`, [...document.querySelectorAll(t)].forEach((d) => {
        d.style.paddingRight = `${a}px`;
      });
    }
    W(l, n);
  }
}
const ge = "modal-backdrop";
function ne() {
  return document.querySelectorAll(`.${ge}`);
}
function D() {
  return ne().length;
}
const Ce = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [l, i] of n)
    t[l] = i;
  return t;
}, I = "in", Se = {
  components: { Btn: g },
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
    M(this.$refs.backdrop), U(window, E.MOUSE_DOWN, this.suppressBackgroundClose), U(window, E.KEY_UP, this.onKeyPress), this.modelValue && this.$toggle(!0);
  },
  beforeUnmount() {
    clearTimeout(this.timeoutId), M(this.$refs.backdrop), M(this.$el), D() === 0 && A(!0), N(window, E.MOUSE_DOWN, this.suppressBackgroundClose), N(window, E.MOUSE_UP, this.unsuppressBackgroundClose), N(window, E.KEY_UP, this.onKeyPress);
  },
  methods: {
    t: H,
    onKeyPress(e) {
      if (this.keyboard && this.modelValue && e.keyCode === 27) {
        const n = this.$refs.backdrop;
        let t = n.style.zIndex;
        t = t && t !== "auto" ? parseInt(t) : 0;
        const l = ne(), i = l.length;
        for (let a = 0; a < i; a++)
          if (l[a] !== n) {
            let d = l[a].style.zIndex;
            if (d = d && d !== "auto" ? parseInt(d) : 0, d > t)
              return;
          }
        this.hideModal();
      }
    },
    hideModal(e) {
      const n = te(this.beforeClose) ? this.beforeClose(e) : !0;
      Promise.resolve(n).then((t) => {
        !t || (this.msg = e, this.$emit("update:modelValue", !1));
      });
    },
    $toggle(e) {
      const n = this.$el, t = this.$refs.backdrop;
      clearTimeout(this.timeoutId), e ? this.$nextTick(() => {
        const l = D();
        if (document.body.appendChild(t), this.appendToBody && document.body.appendChild(n), n.style.display = this.displayStyle, n.scrollTop = 0, t.offsetHeight, A(!1), W(t, I), W(n, I), l > 0) {
          const i = parseInt(K(n).zIndex) || 1050, a = parseInt(K(t).zIndex) || 1040, d = l * this.zOffset;
          n.style.zIndex = `${i + d}`, t.style.zIndex = `${a + d}`;
        }
        this.timeoutId = setTimeout(() => {
          if (this.autoFocus) {
            const i = this.$el.querySelector('[data-action="auto-focus"]');
            i && (i.focus(), i.setAttribute("data-focused", "true"));
          }
          this.$emit("show"), this.timeoutId = 0;
        }, this.transition);
      }) : (Y(t, I), Y(n, I), this.timeoutId = setTimeout(() => {
        n.style.display = "none", M(t), this.appendToBody && M(n), D() === 0 && A(!0), this.$emit("hide", this.msg || "dismiss"), this.msg = "", this.timeoutId = 0, n.style.zIndex = "", t.style.zIndex = "";
      }, this.transition));
    },
    suppressBackgroundClose(e) {
      e && e.target === this.$el || (this.isCloseSuppressed = !0, U(window, "mouseup", this.unsuppressBackgroundClose));
    },
    unsuppressBackgroundClose() {
      this.isCloseSuppressed && (N(window, "mouseup", this.unsuppressBackgroundClose), setTimeout(() => {
        this.isCloseSuppressed = !1;
      }, 1));
    },
    backdropClicked() {
      this.backdrop && !this.isCloseSuppressed && this.hideModal();
    }
  }
}, Te = { class: "modal-content" }, we = {
  key: 0,
  class: "modal-header"
}, Be = /* @__PURE__ */ f("span", { "aria-hidden": "true" }, "×", -1), Ee = [
  Be
], Me = { class: "modal-title" }, Oe = { class: "modal-body" }, $e = {
  key: 1,
  class: "modal-footer"
};
function xe(e, n, t, l, i, a) {
  const d = Q("btn");
  return s(), y("div", {
    tabindex: "-1",
    role: "dialog",
    class: m(["modal", { fade: t.transition > 0 }]),
    onClick: n[3] || (n[3] = _((...o) => a.backdropClicked && a.backdropClicked(...o), ["self"]))
  }, [
    f("div", {
      ref: "dialog",
      class: m(["modal-dialog", a.modalSizeClass]),
      role: "document"
    }, [
      f("div", Te, [
        t.header ? (s(), y("div", we, [
          k(e.$slots, "header", {}, () => [
            t.dismissBtn ? (s(), y("button", {
              key: 0,
              type: "button",
              class: "close",
              "aria-label": "Close",
              style: { position: "relative", "z-index": "1060" },
              onClick: n[0] || (n[0] = (o) => a.hideModal())
            }, Ee)) : z("", !0),
            f("h4", Me, [
              k(e.$slots, "title", {}, () => [
                v(h(t.title), 1)
              ])
            ])
          ])
        ])) : z("", !0),
        f("div", Oe, [
          k(e.$slots, "default")
        ]),
        t.footer ? (s(), y("div", $e, [
          k(e.$slots, "footer", {}, () => [
            O(d, {
              type: t.cancelType,
              onClick: n[1] || (n[1] = (o) => a.hideModal("cancel"))
            }, {
              default: c(() => [
                f("span", null, h(t.cancelText || a.t("uiv.modal.cancel")), 1)
              ]),
              _: 1
            }, 8, ["type"]),
            O(d, {
              type: t.okType,
              "data-action": "auto-focus",
              onClick: n[2] || (n[2] = (o) => a.hideModal("ok"))
            }, {
              default: c(() => [
                f("span", null, h(t.okText || a.t("uiv.modal.ok")), 1)
              ]),
              _: 1
            }, 8, ["type"])
          ])
        ])) : z("", !0)
      ])
    ], 2),
    f("div", {
      ref: "backdrop",
      class: m(["modal-backdrop", { fade: t.transition > 0 }])
    }, null, 2)
  ], 2);
}
const Ne = /* @__PURE__ */ Ce(Se, [["render", xe]]), Ie = ["innerHTML"], Ve = { key: 1 }, ze = { key: 2 }, Pe = ["type", "onKeyup"], Re = {
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
    const n = e, t = $(!0), l = $(n.defaultValue ?? ""), i = $(!1), a = $(null), d = S(
      () => P(n.backdrop) ? !!n.backdrop : n.type !== p.ALERT
    ), o = S(() => n.validator(l.value)), B = S(() => i.value && o.value), C = S(() => n.okText || H("uiv.modal.ok")), Z = S(() => n.cancelText || H("uiv.modal.cancel"));
    function w(j) {
      var r;
      (r = a.value) == null || r.hideModal(j);
    }
    function F() {
      i.value = !0, P(o.value) || w({ value: l.value });
    }
    return (j, r) => (s(), T(Ne, {
      ref_key: "modal",
      ref: a,
      modelValue: t.value,
      "onUpdate:modelValue": r[7] || (r[7] = (b) => t.value = b),
      "auto-focus": "",
      size: e.size,
      title: e.title,
      header: !!e.title,
      backdrop: u(d),
      "cancel-text": e.cancelText,
      "ok-text": e.okText,
      class: m(e.customClass),
      onHide: e.cb
    }, oe({
      default: c(() => [
        e.html ? (s(), y("div", {
          key: 0,
          innerHTML: e.content
        }, null, 8, Ie)) : (s(), y("p", Ve, h(e.content), 1)),
        e.type === u(p).PROMPT ? (s(), y("div", ze, [
          f("div", {
            class: m(["form-group", { "has-error": u(B) }])
          }, [
            J(f("input", {
              "onUpdate:modelValue": r[0] || (r[0] = (b) => l.value = b),
              type: e.inputType,
              class: "form-control",
              required: "",
              "data-action": "auto-focus",
              onChange: r[1] || (r[1] = (b) => i.value = !0),
              onKeyup: le(F, ["enter"])
            }, null, 40, Pe), [
              [ae, l.value]
            ]),
            J(f("span", { class: "help-block" }, h(u(o)), 513), [
              [ie, u(B)]
            ])
          ], 2)
        ])) : z("", !0)
      ]),
      _: 2
    }, [
      e.type === u(p).ALERT ? {
        name: "footer",
        fn: c(() => [
          O(g, {
            type: e.okType,
            "data-action": e.autoFocus === "ok" ? "auto-focus" : "",
            onClick: r[2] || (r[2] = (b) => w("ok"))
          }, {
            default: c(() => [
              v(h(u(C)), 1)
            ]),
            _: 1
          }, 8, ["type", "data-action"])
        ]),
        key: "0"
      } : {
        name: "footer",
        fn: c(() => [
          e.reverseButtons ? (s(), y(G, { key: 0 }, [
            e.type === u(p).CONFIRM ? (s(), T(g, {
              key: 0,
              type: e.okType,
              "data-action": e.autoFocus === "ok" ? "auto-focus" : "",
              onClick: r[3] || (r[3] = (b) => w("ok"))
            }, {
              default: c(() => [
                v(h(u(C)), 1)
              ]),
              _: 1
            }, 8, ["type", "data-action"])) : (s(), T(g, {
              key: 1,
              type: e.okType,
              onClick: F
            }, {
              default: c(() => [
                v(h(u(C)), 1)
              ]),
              _: 1
            }, 8, ["type"])),
            O(g, {
              type: e.cancelType,
              "data-action": e.autoFocus === "cancel" ? "auto-focus" : "",
              onClick: r[4] || (r[4] = (b) => w("cancel"))
            }, {
              default: c(() => [
                v(h(u(Z)), 1)
              ]),
              _: 1
            }, 8, ["type", "data-action"])
          ], 64)) : (s(), y(G, { key: 1 }, [
            O(g, {
              type: e.cancelType,
              "data-action": e.autoFocus === "cancel" ? "auto-focus" : "",
              onClick: r[5] || (r[5] = (b) => w("cancel"))
            }, {
              default: c(() => [
                v(h(u(Z)), 1)
              ]),
              _: 1
            }, 8, ["type", "data-action"]),
            e.type === u(p).CONFIRM ? (s(), T(g, {
              key: 0,
              type: e.okType,
              "data-action": e.autoFocus === "ok" ? "auto-focus" : "",
              onClick: r[6] || (r[6] = (b) => w("ok"))
            }, {
              default: c(() => [
                v(h(u(C)), 1)
              ]),
              _: 1
            }, 8, ["type", "data-action"])) : (s(), T(g, {
              key: 1,
              type: e.okType,
              onClick: F
            }, {
              default: c(() => [
                v(h(u(C)), 1)
              ]),
              _: 1
            }, 8, ["type"]))
          ], 64))
        ]),
        key: "1"
      }
    ]), 1032, ["modelValue", "size", "title", "header", "backdrop", "cancel-text", "ok-text", "class", "onHide"]));
  }
}, Fe = (e) => {
  ee(null, e);
}, V = (e, n) => e === p.CONFIRM ? n === "ok" : P(n) && ue(n.value), Le = function(e, n, t, l = null, i = null) {
  const a = document.createElement("div"), d = de(Re, {
    type: e,
    ...n,
    cb(o) {
      Fe(a), te(t) ? e === p.CONFIRM ? V(e, o) ? t(null, o) : t(o) : e === p.PROMPT && V(e, o) ? t(null, o.value) : t(o) : l && i && (e === p.CONFIRM ? V(e, o) ? l(o) : i(o) : e === p.PROMPT ? V(e, o) ? l(o.value) : i(o) : l(o));
    }
  });
  ee(d, a), document.body.appendChild(a.firstElementChild);
}, q = function(e, n = {}, t) {
  return new Promise((l, i) => {
    Le.apply(this, [e, n, t, l, i]);
  });
}, Ue = function(e, n) {
  return q.apply(this, [p.ALERT, e, n]);
}, Ae = function(e, n) {
  return q.apply(this, [p.CONFIRM, e, n]);
}, De = function(e, n) {
  return q.apply(this, [p.PROMPT, e, n]);
}, Ke = { alert: Ue, confirm: Ae, prompt: De };
export {
  Ke as default
};
