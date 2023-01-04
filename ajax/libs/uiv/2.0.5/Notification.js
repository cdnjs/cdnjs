import { computed as I, onMounted as H, onUnmounted as w, openBlock as r, createElementBlock as u, normalizeClass as p, unref as A, createCommentVNode as _, renderSlot as L, createElementVNode as f, resolveComponent as P, createBlock as k, normalizeStyle as R, withCtx as B, toDisplayString as O, reactive as D, h as F, render as S } from "vue";
function $(e, i) {
  if (Array.isArray(e)) {
    const t = e.indexOf(i);
    t >= 0 && e.splice(t, 1);
  }
}
function C(e) {
  return typeof e < "u" && e !== null;
}
function G(e) {
  return typeof e == "function";
}
function g(e) {
  return typeof e == "string";
}
function M(e, i) {
  return Object.prototype.hasOwnProperty.call(e, i);
}
function x(e) {
  return e && e.nodeType === Node.ELEMENT_NODE;
}
function q(e, i) {
  !x(e) || e.classList.add(i);
}
function z(e, i) {
  !x(e) || e.classList.remove(i);
}
const U = /* @__PURE__ */ f("span", { "aria-hidden": "true" }, "×", -1), Q = [
  U
], W = {
  __name: "Alert",
  props: {
    dismissible: { type: Boolean, default: !1 },
    duration: { type: Number, default: 0 },
    type: { type: String, default: "info" }
  },
  emits: ["dismissed"],
  setup(e, { emit: i }) {
    const t = e;
    let n = 0;
    const l = I(() => ({
      alert: !0,
      [`alert-${t.type}`]: !!t.type,
      "alert-dismissible": t.dismissible
    }));
    function s() {
      clearTimeout(n), i("dismissed");
    }
    return H(() => {
      t.duration > 0 && (n = setTimeout(s, t.duration));
    }), w(() => {
      clearTimeout(n);
    }), (a, m) => (r(), u("div", {
      role: "alert",
      class: p(A(l))
    }, [
      e.dismissible ? (r(), u("button", {
        key: 0,
        type: "button",
        class: "close",
        "aria-label": "Close",
        onClick: s
      }, Q)) : _("", !0),
      L(a.$slots, "default")
    ], 2));
  }
}, h = {
  SUCCESS: "success",
  INFO: "info",
  DANGER: "danger",
  WARNING: "warning"
}, o = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right"
}, Y = (e, i) => {
  const t = e.__vccOpts || e;
  for (const [n, l] of i)
    t[n] = l;
  return t;
}, N = "in", c = "glyphicon", E = 300, v = 300, V = {
  components: { Alert: W },
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
      horizontal: this.placement === o.TOP_LEFT || this.placement === o.BOTTOM_LEFT ? "left" : "right",
      vertical: this.placement === o.TOP_LEFT || this.placement === o.TOP_RIGHT ? "top" : "bottom"
    };
  },
  computed: {
    publicHeight() {
      return this.height;
    },
    styles() {
      const e = this.queue, i = e.findIndex((t) => t._.uid === this._.uid);
      return {
        position: "fixed",
        [this.vertical]: `${this.getTotalHeightOfQueue(e, i)}px`,
        width: `${E}px`,
        transition: `all ${v / 1e3}s ease-in-out`
      };
    },
    icons() {
      if (g(this.icon))
        return this.icon;
      switch (this.type) {
        case h.INFO:
        case h.WARNING:
          return `${c} ${c}-info-sign`;
        case h.SUCCESS:
          return `${c} ${c}-ok-sign`;
        case h.DANGER:
          return `${c} ${c}-remove-sign`;
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
      e.style[this.horizontal] = `-${E}px`, this.height = e.offsetHeight, e.style[this.horizontal] = `${this.offsetX}px`, q(e, N);
    });
  },
  methods: {
    getTotalHeightOfQueue(e, i = e.length) {
      let t = this.offsetY;
      for (let n = 0; n < i; n++)
        t += e[n].publicHeight + this.offset;
      return t;
    },
    onDismissed() {
      z(this.$el, N), setTimeout(this.cb, v);
    }
  }
}, X = {
  class: "media",
  style: { margin: "0" }
}, j = {
  key: 0,
  class: "media-left"
}, J = { class: "media-body" }, K = {
  key: 0,
  class: "media-heading"
}, Z = ["innerHTML"], ee = { key: 2 };
function te(e, i, t, n, l, s) {
  const a = P("alert");
  return r(), k(a, {
    class: p(["fade", t.customClass]),
    style: R(s.styles),
    type: t.type,
    duration: t.duration,
    dismissible: t.dismissible,
    onDismissed: s.onDismissed
  }, {
    default: B(() => [
      f("div", X, [
        s.icons ? (r(), u("div", j, [
          f("span", {
            class: p(s.icons),
            style: { "font-size": "1.5em" }
          }, null, 2)
        ])) : _("", !0),
        f("div", J, [
          t.title ? (r(), u("div", K, [
            f("b", null, O(t.title), 1)
          ])) : _("", !0),
          t.html ? (r(), u("div", {
            key: 1,
            innerHTML: t.content
          }, null, 8, Z)) : (r(), u("div", ee, O(t.content), 1))
        ])
      ])
    ]),
    _: 1
  }, 8, ["class", "style", "type", "duration", "dismissible", "onDismissed"]);
}
const ie = /* @__PURE__ */ Y(V, [["render", te]]), y = D({
  [o.TOP_LEFT]: [],
  [o.TOP_RIGHT]: [],
  [o.BOTTOM_LEFT]: [],
  [o.BOTTOM_RIGHT]: []
}), ne = (e, { vNode: i, container: t }) => {
  S(null, t), $(e, i.component.ctx);
}, se = (e, i, t = null, n = null) => {
  const l = document.createElement("div"), s = e.placement, a = y[s];
  if (!C(a))
    return;
  e.type === "error" && (e.type = "danger");
  const m = F(ie, {
    queue: a,
    placement: s,
    ...e,
    cb(b) {
      ne(a, { vNode: m, container: l }), G(i) ? i(b) : t && n && t(b);
    }
  });
  S(m, l), document.body.appendChild(l.firstElementChild), a.push(m.component.ctx);
}, T = (e = {}, i) => (g(e) && (e = {
  content: e
}), C(e.placement) || (e.placement = o.TOP_RIGHT), new Promise((t, n) => {
  se(e, i, t, n);
}));
function d(e, i) {
  g(i) ? T({
    content: i,
    type: e
  }) : T({ ...i, type: e });
}
const oe = Object.defineProperties(T, {
  success: {
    configurable: !1,
    writable: !1,
    value(e) {
      d("success", e);
    }
  },
  info: {
    configurable: !1,
    writable: !1,
    value(e) {
      d("info", e);
    }
  },
  warning: {
    configurable: !1,
    writable: !1,
    value(e) {
      d("warning", e);
    }
  },
  danger: {
    configurable: !1,
    writable: !1,
    value(e) {
      d("danger", e);
    }
  },
  error: {
    configurable: !1,
    writable: !1,
    value(e) {
      d("danger", e);
    }
  },
  dismissAll: {
    configurable: !1,
    writable: !1,
    value() {
      for (const e in y)
        M(y, e) && y[e].forEach((i) => {
          i.onDismissed();
        });
    }
  }
}), ae = { notify: oe };
export {
  ae as default
};
