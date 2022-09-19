import { computed as I, onMounted as w, onUnmounted as A, openBlock as r, createElementBlock as u, normalizeClass as p, unref as H, createCommentVNode as _, renderSlot as L, createElementVNode as f, resolveComponent as P, createBlock as k, normalizeStyle as R, withCtx as B, toDisplayString as O, reactive as D, h as F, render as S } from "vue";
function $(e, n) {
  if (Array.isArray(e)) {
    const t = e.indexOf(n);
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
function M(e, n) {
  return Object.prototype.hasOwnProperty.call(e, n);
}
function x(e) {
  return e && e.nodeType === Node.ELEMENT_NODE;
}
function q(e, n) {
  !x(e) || e.classList.add(n);
}
function z(e, n) {
  !x(e) || e.classList.remove(n);
}
const U = /* @__PURE__ */ f("span", { "aria-hidden": "true" }, "\xD7", -1), Q = [
  U
], W = {
  __name: "Alert",
  props: {
    dismissible: { type: Boolean, default: !1 },
    duration: { type: Number, default: 0 },
    type: { type: String, default: "info" }
  },
  emits: ["dismissed"],
  setup(e, { emit: n }) {
    const t = e;
    let i = 0;
    const l = I(() => ({
      alert: !0,
      [`alert-${t.type}`]: !!t.type,
      "alert-dismissible": t.dismissible
    }));
    function s() {
      clearTimeout(i), n("dismissed");
    }
    return w(() => {
      t.duration > 0 && (i = setTimeout(s, t.duration));
    }), A(() => {
      clearTimeout(i);
    }), (a, m) => (r(), u("div", {
      role: "alert",
      class: p(H(l))
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
}, Y = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [i, l] of n)
    t[i] = l;
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
    styles() {
      const e = this.queue, n = e.findIndex((t) => t._.uid === this._.uid);
      return {
        position: "fixed",
        [this.vertical]: `${this.getTotalHeightOfQueue(e, n)}px`,
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
    getTotalHeightOfQueue(e, n = e.length) {
      let t = this.offsetY;
      for (let i = 0; i < n; i++)
        t += e[i].height + this.offset;
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
function te(e, n, t, i, l, s) {
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
const ne = /* @__PURE__ */ Y(V, [["render", te]]), y = D({
  [o.TOP_LEFT]: [],
  [o.TOP_RIGHT]: [],
  [o.BOTTOM_LEFT]: [],
  [o.BOTTOM_RIGHT]: []
}), ie = (e, { vNode: n, container: t }) => {
  S(null, t), $(e, n.component.ctx);
}, se = (e, n, t = null, i = null) => {
  const l = document.createElement("div"), s = e.placement, a = y[s];
  if (!C(a))
    return;
  e.type === "error" && (e.type = "danger");
  const m = F(ne, {
    queue: a,
    placement: s,
    ...e,
    cb(b) {
      ie(a, { vNode: m, container: l }), G(n) ? n(b) : t && i && t(b);
    }
  });
  S(m, l), document.body.appendChild(l.firstElementChild), a.push(m.component.ctx);
}, T = (e = {}, n) => (g(e) && (e = {
  content: e
}), C(e.placement) || (e.placement = o.TOP_RIGHT), new Promise((t, i) => {
  se(e, n, t, i);
}));
function d(e, n) {
  g(n) ? T({
    content: n,
    type: e
  }) : T({ ...n, type: e });
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
        M(y, e) && y[e].forEach((n) => {
          n.onDismissed();
        });
    }
  }
}), ae = { notify: oe };
export {
  ae as default
};
