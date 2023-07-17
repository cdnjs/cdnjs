var bt = Object.defineProperty, gt = Object.defineProperties;
var yt = Object.getOwnPropertyDescriptors;
var Ce = Object.getOwnPropertySymbols;
var qe = Object.prototype.hasOwnProperty, ze = Object.prototype.propertyIsEnumerable;
var Oe = (e, t, n) => t in e ? bt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, He = (e, t) => {
  for (var n in t || (t = {}))
    qe.call(t, n) && Oe(e, n, t[n]);
  if (Ce)
    for (var n of Ce(t))
      ze.call(t, n) && Oe(e, n, t[n]);
  return e;
}, je = (e, t) => gt(e, yt(t));
var _e = (e, t) => {
  var n = {};
  for (var s in e)
    qe.call(e, s) && t.indexOf(s) < 0 && (n[s] = e[s]);
  if (e != null && Ce)
    for (var s of Ce(e))
      t.indexOf(s) < 0 && ze.call(e, s) && (n[s] = e[s]);
  return n;
};
var Be = (e, t, n) => new Promise((s, a) => {
  var u = (o) => {
    try {
      i(n.next(o));
    } catch (c) {
      a(c);
    }
  }, l = (o) => {
    try {
      i(n.throw(o));
    } catch (c) {
      a(c);
    }
  }, i = (o) => o.done ? s(o.value) : Promise.resolve(o.value).then(u, l);
  i((n = n.apply(e, t)).next());
});
import { ref as f, onMounted as re, defineComponent as V, computed as p, openBlock as r, createElementBlock as v, normalizeClass as K, toDisplayString as H, createCommentVNode as x, Comment as Ct, warn as _t, withKeys as X, renderSlot as w, resolveComponent as $, Fragment as he, renderList as $e, createBlock as E, withCtx as L, createTextVNode as oe, createVNode as z, Transition as De, normalizeStyle as ce, resolveDynamicComponent as Ye, createElementVNode as h, getCurrentInstance as $t, toRef as Q, withDirectives as ue, withModifiers as J, vModelCheckbox as et, onUnmounted as Te, watch as te, nextTick as ge, mergeProps as Y, vShow as ye, vModelDynamic as At, useCssVars as Ee, vModelRadio as It, inject as Ue, provide as We, toRefs as Bt } from "vue";
function le(e) {
  return (t) => typeof t == "string" && e.indexOf(t) !== -1;
}
const xe = "cdx", xt = [
  "default",
  "progressive",
  "destructive"
], tt = [
  "normal",
  "primary",
  "quiet"
], kt = [
  "button",
  "submit",
  "reset"
], wt = [
  "x-small",
  "small",
  "medium"
], St = [
  "notice",
  "warning",
  "error",
  "success"
], nt = le(St), Mt = [
  "text",
  "search"
], Ae = [
  "default",
  "error"
], Dt = 120, Tt = 500, me = "cdx-menu-footer-item", ot = Symbol("CdxTabs"), lt = Symbol("CdxActiveTab"), Et = '<path d="M11.53 2.3A1.85 1.85 0 0010 1.21 1.85 1.85 0 008.48 2.3L.36 16.36C-.48 17.81.21 19 1.88 19h16.24c1.67 0 2.36-1.19 1.52-2.64zM11 16H9v-2h2zm0-4H9V6h2z"/>', Lt = '<path d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"/><circle cx="10" cy="10" r="3"/>', Vt = '<path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"/>', Ft = '<path d="m4.34 2.93 12.73 12.73-1.41 1.41L2.93 4.35z"/><path d="M17.07 4.34 4.34 17.07l-1.41-1.41L15.66 2.93z"/>', Kt = '<path d="M13.728 1H6.272L1 6.272v7.456L6.272 19h7.456L19 13.728V6.272zM11 15H9v-2h2zm0-4H9V5h2z"/>', Nt = '<path d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"/>', Rt = '<path d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"/><path d="M19 5H1V3h18zm0 12H1v-2h18z"/>', Ot = '<path d="M8 19a1 1 0 001 1h2a1 1 0 001-1v-1H8zm9-12a7 7 0 10-12 4.9S7 14 7 15v1a1 1 0 001 1h4a1 1 0 001-1v-1c0-1 2-3.1 2-3.1A7 7 0 0017 7z"/>', qt = '<path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM9 5h2v2H9zm0 4h2v6H9z"/>', zt = '<path d="M7 1 5.6 2.5 13 10l-7.4 7.5L7 19l9-9z"/>', Ht = '<path d="m4 10 9 9 1.4-1.5L7 10l7.4-7.5L13 1z"/>', jt = '<path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"/>', Ut = '<path fill-rule="evenodd" d="M10 20a10 10 0 100-20 10 10 0 000 20Zm-2-5 9-8.5L15.5 5 8 12 4.5 8.5 3 10l5 5Z" clip-rule="evenodd"/>', at = Et, Wt = Lt, Pt = Vt, st = Ft, ut = Kt, it = Nt, Qt = Rt, Gt = {
  langCodeMap: {
    ar: Ot
  },
  default: qt
}, Zt = {
  ltr: zt,
  shouldFlip: !0
}, Jt = {
  ltr: Ht,
  shouldFlip: !0
}, Xt = jt, dt = Ut;
function Yt(e, t, n) {
  if (typeof e == "string" || "path" in e)
    return e;
  if ("shouldFlip" in e)
    return e.ltr;
  if ("rtl" in e)
    return n === "rtl" ? e.rtl : e.ltr;
  const s = t in e.langCodeMap ? e.langCodeMap[t] : e.default;
  return typeof s == "string" || "path" in s ? s : s.ltr;
}
function en(e, t) {
  if (typeof e == "string")
    return !1;
  if ("langCodeMap" in e) {
    const n = t in e.langCodeMap ? e.langCodeMap[t] : e.default;
    if (typeof n == "string")
      return !1;
    e = n;
  }
  if ("shouldFlipExceptions" in e && Array.isArray(e.shouldFlipExceptions)) {
    const n = e.shouldFlipExceptions.indexOf(t);
    return n === void 0 || n === -1;
  }
  return "shouldFlip" in e ? e.shouldFlip : !1;
}
function rt(e) {
  const t = f(null);
  return re(() => {
    const n = window.getComputedStyle(e.value).direction;
    t.value = n === "ltr" || n === "rtl" ? n : null;
  }), t;
}
function tn(e) {
  const t = f("");
  return re(() => {
    let n = e.value;
    for (; n && n.lang === ""; )
      n = n.parentElement;
    t.value = n ? n.lang : null;
  }), t;
}
const nn = le(wt), on = V({
  name: "CdxIcon",
  props: {
    icon: {
      type: [String, Object],
      required: !0
    },
    iconLabel: {
      type: String,
      default: ""
    },
    lang: {
      type: String,
      default: null
    },
    dir: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: "medium",
      validator: nn
    }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = f(), s = rt(n), a = tn(n), u = p(() => e.dir || s.value), l = p(() => e.lang || a.value), i = p(() => ({
      "cdx-icon--flipped": u.value === "rtl" && l.value !== null && en(e.icon, l.value),
      [`cdx-icon--${e.size}`]: !0
    })), o = p(
      () => Yt(e.icon, l.value || "", u.value || "ltr")
    ), c = p(() => typeof o.value == "string" ? o.value : ""), d = p(() => typeof o.value != "string" ? o.value.path : "");
    return {
      rootElement: n,
      rootClasses: i,
      iconSvg: c,
      iconPath: d,
      onClick: (y) => {
        t("click", y);
      }
    };
  }
});
const F = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, ln = ["aria-hidden"], an = { key: 0 }, sn = ["innerHTML"], un = ["d"];
function dn(e, t, n, s, a, u) {
  return r(), v("span", {
    ref: "rootElement",
    class: K(["cdx-icon", e.rootClasses]),
    onClick: t[0] || (t[0] = (...l) => e.onClick && e.onClick(...l))
  }, [
    (r(), v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      "aria-hidden": e.iconLabel ? void 0 : !0
    }, [
      e.iconLabel ? (r(), v("title", an, H(e.iconLabel), 1)) : x("", !0),
      e.iconSvg ? (r(), v("g", {
        key: 1,
        innerHTML: e.iconSvg
      }, null, 8, sn)) : (r(), v("path", {
        key: 2,
        d: e.iconPath
      }, null, 8, un))
    ], 8, ln))
  ], 2);
}
const G = /* @__PURE__ */ F(on, [["render", dn]]), rn = le(xt), cn = le([...tt, ...kt]), ke = le(tt), pn = (e) => {
  !e["aria-label"] && !e["aria-hidden"] && _t(`icon-only buttons require one of the following attribute: aria-label or aria-hidden.
		See documentation on https://doc.wikimedia.org/codex/latest/components/button.html#default-icon-only`);
};
function Se(e) {
  const t = [];
  for (const n of e)
    typeof n == "string" && n.trim() !== "" ? t.push(n) : Array.isArray(n) ? t.push(...Se(n)) : typeof n == "object" && n && (typeof n.type == "string" || typeof n.type == "object" ? t.push(n) : n.type !== Ct && (typeof n.children == "string" && n.children.trim() !== "" ? t.push(n.children) : Array.isArray(n.children) && t.push(...Se(n.children))));
  return t;
}
const fn = (e, t) => {
  if (!e)
    return !1;
  const n = Se(e);
  if (n.length !== 1)
    return !1;
  const s = n[0], a = typeof s == "object" && typeof s.type == "object" && "name" in s.type && s.type.name === G.name, u = typeof s == "object" && s.type === "svg";
  return a || u ? (pn(t), !0) : !1;
}, mn = V({
  name: "CdxButton",
  props: {
    action: {
      type: String,
      default: "default",
      validator: rn
    },
    weight: {
      type: String,
      default: "normal",
      validator: ke
    },
    type: {
      type: String,
      default: void 0,
      validator: cn
    }
  },
  emits: ["click"],
  setup(e, { emit: t, slots: n, attrs: s }) {
    const a = f(!1), u = p(
      () => ke(e.type) ? void 0 : e.type
    ), l = p(
      () => ke(e.type) ? e.type : e.weight
    );
    return {
      rootClasses: p(() => {
        var d;
        return {
          [`cdx-button--action-${e.action}`]: !0,
          [`cdx-button--weight-${l.value}`]: !0,
          "cdx-button--framed": l.value !== "quiet",
          "cdx-button--icon-only": fn((d = n.default) == null ? void 0 : d.call(n), s),
          "cdx-button--is-active": a.value
        };
      }),
      onClick: (d) => {
        t("click", d);
      },
      setActive: (d) => {
        a.value = d;
      },
      computedType: u
    };
  }
});
const hn = ["type"];
function vn(e, t, n, s, a, u) {
  return r(), v("button", {
    class: K(["cdx-button", e.rootClasses]),
    type: e.computedType,
    onClick: t[0] || (t[0] = (...l) => e.onClick && e.onClick(...l)),
    onKeydown: t[1] || (t[1] = X((l) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = X((l) => e.setActive(!1), ["space", "enter"]))
  }, [
    w(e.$slots, "default")
  ], 42, hn);
}
const ve = /* @__PURE__ */ F(mn, [["render", vn]]);
function ct(e) {
  return e.label === void 0 ? e.value : e.label === null ? "" : e.label;
}
const bn = V({
  name: "CdxButtonGroup",
  components: {
    CdxButton: ve,
    CdxIcon: G
  },
  props: {
    buttons: {
      type: Array,
      required: !0,
      validator: (e) => Array.isArray(e) && e.length >= 1
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "click"
  ],
  setup() {
    return {
      getButtonLabel: ct
    };
  }
});
const gn = { class: "cdx-button-group" };
function yn(e, t, n, s, a, u) {
  const l = $("cdx-icon"), i = $("cdx-button");
  return r(), v("div", gn, [
    (r(!0), v(he, null, $e(e.buttons, (o) => (r(), E(i, {
      key: o.value,
      disabled: o.disabled || e.disabled,
      "aria-label": o.ariaLabel,
      onClick: (c) => e.$emit("click", o.value)
    }, {
      default: L(() => [
        w(e.$slots, "default", { button: o }, () => [
          o.icon ? (r(), E(l, {
            key: 0,
            icon: o.icon
          }, null, 8, ["icon"])) : x("", !0),
          oe(" " + H(e.getButtonLabel(o)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["disabled", "aria-label", "onClick"]))), 128))
  ]);
}
const Ml = /* @__PURE__ */ F(bn, [["render", yn]]), Cn = V({
  name: "CdxThumbnail",
  components: { CdxIcon: G },
  props: {
    thumbnail: {
      type: [Object, null],
      default: null
    },
    placeholderIcon: {
      type: [String, Object],
      default: Qt
    }
  },
  setup: (e) => {
    const t = f(!1), n = f({}), s = (a) => {
      const u = a.replace(/([\\"\n])/g, "\\$1"), l = new Image();
      l.onload = () => {
        n.value = { backgroundImage: `url("${u}")` }, t.value = !0;
      }, l.onerror = () => {
        t.value = !1;
      }, l.src = u;
    };
    return re(() => {
      var a;
      (a = e.thumbnail) != null && a.url && s(e.thumbnail.url);
    }), {
      thumbnailStyle: n,
      thumbnailLoaded: t
    };
  }
});
const _n = { class: "cdx-thumbnail" }, $n = {
  key: 0,
  class: "cdx-thumbnail__placeholder"
};
function An(e, t, n, s, a, u) {
  const l = $("cdx-icon");
  return r(), v("span", _n, [
    e.thumbnailLoaded ? x("", !0) : (r(), v("span", $n, [
      z(l, {
        icon: e.placeholderIcon,
        class: "cdx-thumbnail__placeholder__icon"
      }, null, 8, ["icon"])
    ])),
    z(De, { name: "cdx-thumbnail__image" }, {
      default: L(() => [
        e.thumbnailLoaded ? (r(), v("span", {
          key: 0,
          style: ce(e.thumbnailStyle),
          class: "cdx-thumbnail__image"
        }, null, 4)) : x("", !0)
      ]),
      _: 1
    })
  ]);
}
const pt = /* @__PURE__ */ F(Cn, [["render", An]]), In = V({
  name: "CdxCard",
  components: { CdxIcon: G, CdxThumbnail: pt },
  props: {
    url: {
      type: String,
      default: ""
    },
    icon: {
      type: [String, Object],
      default: ""
    },
    thumbnail: {
      type: [Object, null],
      default: null
    },
    forceThumbnail: {
      type: Boolean,
      default: !1
    },
    customPlaceholderIcon: {
      type: [String, Object],
      default: void 0
    }
  },
  setup(e) {
    const t = p(() => !!e.url), n = p(() => t.value ? "a" : "span"), s = p(() => t.value ? e.url : void 0);
    return {
      isLink: t,
      contentTag: n,
      cardLink: s
    };
  }
});
const Bn = { class: "cdx-card__text" }, xn = { class: "cdx-card__text__title" }, kn = {
  key: 0,
  class: "cdx-card__text__description"
}, wn = {
  key: 1,
  class: "cdx-card__text__supporting-text"
};
function Sn(e, t, n, s, a, u) {
  const l = $("cdx-thumbnail"), i = $("cdx-icon");
  return r(), E(Ye(e.contentTag), {
    href: e.cardLink,
    class: K(["cdx-card", {
      "cdx-card--is-link": e.isLink,
      "cdx-card--title-only": !e.$slots.description && !e.$slots["supporting-text"]
    }])
  }, {
    default: L(() => [
      e.thumbnail || e.forceThumbnail ? (r(), E(l, {
        key: 0,
        thumbnail: e.thumbnail,
        "placeholder-icon": e.customPlaceholderIcon,
        class: "cdx-card__thumbnail"
      }, null, 8, ["thumbnail", "placeholder-icon"])) : e.icon ? (r(), E(i, {
        key: 1,
        icon: e.icon,
        class: "cdx-card__icon"
      }, null, 8, ["icon"])) : x("", !0),
      h("span", Bn, [
        h("span", xn, [
          w(e.$slots, "title")
        ]),
        e.$slots.description ? (r(), v("span", kn, [
          w(e.$slots, "description")
        ])) : x("", !0),
        e.$slots["supporting-text"] ? (r(), v("span", wn, [
          w(e.$slots, "supporting-text")
        ])) : x("", !0)
      ])
    ]),
    _: 3
  }, 8, ["href", "class"]);
}
const Dl = /* @__PURE__ */ F(In, [["render", Sn]]);
function ie(e, t, n) {
  return p({
    get: () => e.value,
    set: (s) => t(n || "update:modelValue", s)
  });
}
let we = 0;
function ne(e) {
  const t = $t(), n = (t == null ? void 0 : t.props.id) || (t == null ? void 0 : t.attrs.id);
  return e ? `${xe}-${e}-${we++}` : n ? `${xe}-${n}-${we++}` : `${xe}-${we++}`;
}
const Mn = V({
  name: "CdxCheckbox",
  props: {
    modelValue: {
      type: [Boolean, Array],
      default: !1
    },
    inputValue: {
      type: [String, Number, Boolean],
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    indeterminate: {
      type: Boolean,
      default: !1
    },
    inline: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:modelValue"
  ],
  setup(e, { emit: t }) {
    const n = p(() => ({
      "cdx-checkbox--inline": e.inline
    })), s = f(), a = ne("checkbox"), u = () => {
      s.value.click();
    }, l = ie(Q(e, "modelValue"), t);
    return {
      rootClasses: n,
      input: s,
      checkboxId: a,
      clickInput: u,
      wrappedModel: l
    };
  }
});
const Dn = ["id", "value", "disabled", ".indeterminate"], Tn = /* @__PURE__ */ h("span", { class: "cdx-checkbox__icon" }, null, -1), En = ["for"];
function Ln(e, t, n, s, a, u) {
  return r(), v("span", {
    class: K(["cdx-checkbox", e.rootClasses])
  }, [
    ue(h("input", {
      id: e.checkboxId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (l) => e.wrappedModel = l),
      class: "cdx-checkbox__input",
      type: "checkbox",
      value: e.inputValue,
      disabled: e.disabled,
      ".indeterminate": e.indeterminate,
      onKeydown: t[1] || (t[1] = X(J((...l) => e.clickInput && e.clickInput(...l), ["prevent"]), ["enter"]))
    }, null, 40, Dn), [
      [et, e.wrappedModel]
    ]),
    Tn,
    h("label", {
      class: "cdx-checkbox__label",
      for: e.checkboxId
    }, [
      w(e.$slots, "default")
    ], 8, En)
  ], 2);
}
const Tl = /* @__PURE__ */ F(Mn, [["render", Ln]]), Vn = {
  error: ut,
  warning: at,
  success: dt
}, Fn = V({
  name: "CdxInfoChip",
  components: { CdxIcon: G },
  props: {
    status: {
      type: String,
      default: "notice",
      validator: nt
    },
    icon: {
      type: [String, Object],
      default: null
    }
  },
  setup(e) {
    const t = p(() => ({
      [`cdx-info-chip__icon--${e.status}`]: !0
    })), n = p(
      () => e.status === "notice" ? e.icon : Vn[e.status]
    );
    return {
      iconClass: t,
      computedIcon: n
    };
  }
});
const Kn = { class: "cdx-info-chip" }, Nn = { class: "cdx-info-chip--text" };
function Rn(e, t, n, s, a, u) {
  const l = $("cdx-icon");
  return r(), v("div", Kn, [
    e.computedIcon ? (r(), E(l, {
      key: 0,
      class: K(["cdx-info-chip__icon", e.iconClass]),
      icon: e.computedIcon
    }, null, 8, ["class", "icon"])) : x("", !0),
    h("span", Nn, [
      w(e.$slots, "default")
    ])
  ]);
}
const El = /* @__PURE__ */ F(Fn, [["render", Rn]]);
function ft(e) {
  return e.replace(/([\\{}()|.?*+\-^$[\]])/g, "\\$1");
}
const On = "[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]";
function mt(e, t) {
  if (!e)
    return [t, "", ""];
  const n = ft(e), s = new RegExp(
    n + On + "*",
    "i"
  ).exec(t);
  if (!s || s.index === void 0)
    return [t, "", ""];
  const a = s.index, u = a + s[0].length, l = t.slice(a, u), i = t.slice(0, a), o = t.slice(u, t.length);
  return [i, l, o];
}
const Ll = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  regExpEscape: ft,
  splitStringAtMatch: mt
}, Symbol.toStringTag, { value: "Module" })), qn = V({
  name: "CdxSearchResultTitle",
  props: {
    title: {
      type: String,
      required: !0
    },
    searchQuery: {
      type: String,
      default: ""
    }
  },
  setup: (e) => ({
    titleChunks: p(() => mt(e.searchQuery, String(e.title)))
  })
});
const zn = { class: "cdx-search-result-title" }, Hn = { class: "cdx-search-result-title__match" };
function jn(e, t, n, s, a, u) {
  return r(), v("span", zn, [
    h("bdi", null, [
      oe(H(e.titleChunks[0]), 1),
      h("span", Hn, H(e.titleChunks[1]), 1),
      oe(H(e.titleChunks[2]), 1)
    ])
  ]);
}
const Un = /* @__PURE__ */ F(qn, [["render", jn]]), Wn = V({
  name: "CdxMenuItem",
  components: { CdxIcon: G, CdxThumbnail: pt, CdxSearchResultTitle: Un },
  props: {
    id: {
      type: String,
      required: !0
    },
    value: {
      type: [String, Number],
      required: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    selected: {
      type: Boolean,
      default: !1
    },
    active: {
      type: Boolean,
      default: !1
    },
    highlighted: {
      type: Boolean,
      default: !1
    },
    label: {
      type: String,
      default: ""
    },
    match: {
      type: String,
      default: ""
    },
    supportingText: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    },
    icon: {
      type: [String, Object],
      default: ""
    },
    showThumbnail: {
      type: Boolean,
      default: !1
    },
    thumbnail: {
      type: [Object, null],
      default: null
    },
    description: {
      type: [String, null],
      default: ""
    },
    searchQuery: {
      type: String,
      default: ""
    },
    boldLabel: {
      type: Boolean,
      default: !1
    },
    hideDescriptionOverflow: {
      type: Boolean,
      default: !1
    },
    language: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    "change"
  ],
  setup: (e, { emit: t }) => {
    const n = () => {
      e.highlighted || t("change", "highlighted", !0);
    }, s = () => {
      t("change", "highlighted", !1);
    }, a = (d) => {
      d.button === 0 && t("change", "active", !0);
    }, u = () => {
      t("change", "selected", !0);
    }, l = p(() => e.searchQuery.length > 0), i = p(() => ({
      "cdx-menu-item--selected": e.selected,
      "cdx-menu-item--active": e.active && e.highlighted,
      "cdx-menu-item--highlighted": e.highlighted,
      "cdx-menu-item--enabled": !e.disabled,
      "cdx-menu-item--disabled": e.disabled,
      "cdx-menu-item--highlight-query": l.value,
      "cdx-menu-item--bold-label": e.boldLabel,
      "cdx-menu-item--has-description": !!e.description,
      "cdx-menu-item--hide-description-overflow": e.hideDescriptionOverflow
    })), o = p(() => e.url ? "a" : "span"), c = p(() => e.label || String(e.value));
    return {
      onMouseMove: n,
      onMouseLeave: s,
      onMouseDown: a,
      onClick: u,
      highlightQuery: l,
      rootClasses: i,
      contentTag: o,
      title: c
    };
  }
});
const Pn = ["id", "aria-disabled", "aria-selected"], Qn = { class: "cdx-menu-item__text" }, Gn = ["lang"], Zn = ["lang"], Jn = ["lang"], Xn = ["lang"];
function Yn(e, t, n, s, a, u) {
  const l = $("cdx-thumbnail"), i = $("cdx-icon"), o = $("cdx-search-result-title");
  return r(), v("li", {
    id: e.id,
    role: "option",
    class: K(["cdx-menu-item", e.rootClasses]),
    "aria-disabled": e.disabled,
    "aria-selected": e.selected,
    onMousemove: t[0] || (t[0] = (...c) => e.onMouseMove && e.onMouseMove(...c)),
    onMouseleave: t[1] || (t[1] = (...c) => e.onMouseLeave && e.onMouseLeave(...c)),
    onMousedown: t[2] || (t[2] = J((...c) => e.onMouseDown && e.onMouseDown(...c), ["prevent"])),
    onClick: t[3] || (t[3] = (...c) => e.onClick && e.onClick(...c))
  }, [
    w(e.$slots, "default", {}, () => [
      (r(), E(Ye(e.contentTag), {
        href: e.url ? e.url : void 0,
        class: "cdx-menu-item__content"
      }, {
        default: L(() => {
          var c, d, C, y, M, A;
          return [
            e.showThumbnail ? (r(), E(l, {
              key: 0,
              thumbnail: e.thumbnail,
              class: "cdx-menu-item__thumbnail"
            }, null, 8, ["thumbnail"])) : e.icon ? (r(), E(i, {
              key: 1,
              icon: e.icon,
              class: "cdx-menu-item__icon"
            }, null, 8, ["icon"])) : x("", !0),
            h("span", Qn, [
              e.highlightQuery ? (r(), E(o, {
                key: 0,
                title: e.title,
                "search-query": e.searchQuery,
                lang: (c = e.language) == null ? void 0 : c.label
              }, null, 8, ["title", "search-query", "lang"])) : (r(), v("span", {
                key: 1,
                class: "cdx-menu-item__text__label",
                lang: (d = e.language) == null ? void 0 : d.label
              }, [
                h("bdi", null, H(e.title), 1)
              ], 8, Gn)),
              e.match ? (r(), v(he, { key: 2 }, [
                oe(H(" ") + " "),
                e.highlightQuery ? (r(), E(o, {
                  key: 0,
                  title: e.match,
                  "search-query": e.searchQuery,
                  lang: (C = e.language) == null ? void 0 : C.match
                }, null, 8, ["title", "search-query", "lang"])) : (r(), v("span", {
                  key: 1,
                  class: "cdx-menu-item__text__match",
                  lang: (y = e.language) == null ? void 0 : y.match
                }, [
                  h("bdi", null, H(e.match), 1)
                ], 8, Zn))
              ], 64)) : x("", !0),
              e.supportingText ? (r(), v(he, { key: 3 }, [
                oe(H(" ") + " "),
                h("span", {
                  class: "cdx-menu-item__text__supporting-text",
                  lang: (M = e.language) == null ? void 0 : M.supportingText
                }, [
                  h("bdi", null, H(e.supportingText), 1)
                ], 8, Jn)
              ], 64)) : x("", !0),
              e.description ? (r(), v("span", {
                key: 4,
                class: "cdx-menu-item__text__description",
                lang: (A = e.language) == null ? void 0 : A.description
              }, [
                h("bdi", null, H(e.description), 1)
              ], 8, Xn)) : x("", !0)
            ])
          ];
        }),
        _: 1
      }, 8, ["href"]))
    ])
  ], 42, Pn);
}
const eo = /* @__PURE__ */ F(Wn, [["render", Yn]]), to = V({
  name: "CdxProgressBar",
  props: {
    inline: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return {
      rootClasses: p(() => ({
        "cdx-progress-bar--block": !e.inline,
        "cdx-progress-bar--inline": e.inline,
        "cdx-progress-bar--enabled": !e.disabled,
        "cdx-progress-bar--disabled": e.disabled
      }))
    };
  }
});
const no = ["aria-disabled"], oo = /* @__PURE__ */ h("div", { class: "cdx-progress-bar__bar" }, null, -1), lo = [
  oo
];
function ao(e, t, n, s, a, u) {
  return r(), v("div", {
    class: K(["cdx-progress-bar", e.rootClasses]),
    role: "progressbar",
    "aria-disabled": e.disabled,
    "aria-valuemin": "0",
    "aria-valuemax": "100"
  }, lo, 10, no);
}
const so = /* @__PURE__ */ F(to, [["render", ao]]);
function Me(e, t) {
  const n = f(!1);
  let s = !1;
  if (typeof window != "object" || !("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype))
    return n;
  const a = new window.IntersectionObserver(
    (u) => {
      const l = u[0];
      l && (n.value = l.isIntersecting);
    },
    t
  );
  return re(() => {
    s = !0, e.value && a.observe(e.value);
  }), Te(() => {
    s = !1, a.disconnect();
  }), te(e, (u) => {
    !s || (a.disconnect(), n.value = !1, u && a.observe(u));
  }), n;
}
function pe(e, t = p(() => ({}))) {
  const n = p(() => {
    const u = _e(t.value, []);
    return e.class && e.class.split(" ").forEach((i) => {
      u[i] = !0;
    }), u;
  }), s = p(() => {
    if ("style" in e)
      return e.style;
  }), a = p(() => {
    const o = e, { class: u, style: l } = o;
    return _e(o, ["class", "style"]);
  });
  return {
    rootClasses: n,
    rootStyle: s,
    otherAttrs: a
  };
}
const uo = V({
  name: "CdxMenu",
  components: {
    CdxMenuItem: eo,
    CdxProgressBar: so
  },
  inheritAttrs: !1,
  props: {
    menuItems: {
      type: Array,
      required: !0
    },
    footer: {
      type: Object,
      default: null
    },
    selected: {
      type: [String, Number, null],
      required: !0
    },
    expanded: {
      type: Boolean,
      required: !0
    },
    showPending: {
      type: Boolean,
      default: !1
    },
    visibleItemLimit: {
      type: Number,
      default: null
    },
    showThumbnail: {
      type: Boolean,
      default: !1
    },
    boldLabel: {
      type: Boolean,
      default: !1
    },
    hideDescriptionOverflow: {
      type: Boolean,
      default: !1
    },
    searchQuery: {
      type: String,
      default: ""
    },
    showNoResultsSlot: {
      type: Boolean,
      default: null
    }
  },
  emits: [
    "update:selected",
    "update:expanded",
    "menu-item-click",
    "menu-item-keyboard-navigation",
    "load-more"
  ],
  expose: [
    "clearActive",
    "getHighlightedMenuItem",
    "getHighlightedViaKeyboard",
    "delegateKeyNavigation"
  ],
  setup(e, { emit: t, slots: n, attrs: s }) {
    const a = p(() => (e.footer && e.menuItems ? [...e.menuItems, e.footer] : e.menuItems).map((B) => je(He({}, B), {
      id: ne("menu-item")
    }))), u = p(() => n["no-results"] ? e.showNoResultsSlot !== null ? e.showNoResultsSlot : a.value.length === 0 : !1), l = f(null), i = f(!1), o = f(null);
    function c() {
      return a.value.find(
        (b) => b.value === e.selected
      );
    }
    function d(b, B) {
      var O;
      if (!(B && B.disabled))
        switch (b) {
          case "selected":
            t("update:selected", (O = B == null ? void 0 : B.value) != null ? O : null), t("update:expanded", !1), o.value = null;
            break;
          case "highlighted":
            l.value = B || null, i.value = !1;
            break;
          case "highlightedViaKeyboard":
            l.value = B || null, i.value = !0;
            break;
          case "active":
            o.value = B || null;
            break;
        }
    }
    const C = p(() => {
      if (l.value !== null)
        return a.value.findIndex(
          (b) => b.value === l.value.value
        );
    });
    function y(b) {
      !b || (d("highlightedViaKeyboard", b), t("menu-item-keyboard-navigation", b));
    }
    function M(b) {
      var j;
      const B = (be) => {
        for (let de = be - 1; de >= 0; de--)
          if (!a.value[de].disabled)
            return a.value[de];
      };
      b = b || a.value.length;
      const O = (j = B(b)) != null ? j : B(a.value.length);
      y(O);
    }
    function A(b) {
      const B = (j) => a.value.find((be, de) => !be.disabled && de > j);
      b = b != null ? b : -1;
      const O = B(b) || B(-1);
      y(O);
    }
    function N(b, B = !0) {
      function O() {
        t("update:expanded", !0), d("highlighted", c());
      }
      function j() {
        B && (b.preventDefault(), b.stopPropagation());
      }
      switch (b.key) {
        case "Enter":
        case " ":
          return j(), e.expanded ? (l.value && i.value && t("update:selected", l.value.value), t("update:expanded", !1)) : O(), !0;
        case "Tab":
          return e.expanded && (l.value && i.value && t("update:selected", l.value.value), t("update:expanded", !1)), !0;
        case "ArrowUp":
          return j(), e.expanded ? (l.value === null && d("highlightedViaKeyboard", c()), M(C.value)) : O(), P(), !0;
        case "ArrowDown":
          return j(), e.expanded ? (l.value === null && d("highlightedViaKeyboard", c()), A(C.value)) : O(), P(), !0;
        case "Home":
          return j(), e.expanded ? (l.value === null && d("highlightedViaKeyboard", c()), A()) : O(), P(), !0;
        case "End":
          return j(), e.expanded ? (l.value === null && d("highlightedViaKeyboard", c()), M()) : O(), P(), !0;
        case "Escape":
          return j(), t("update:expanded", !1), !0;
        default:
          return !1;
      }
    }
    function I() {
      d("active");
    }
    const S = [], D = f(void 0), R = Me(
      D,
      { threshold: 0.8 }
    );
    te(R, (b) => {
      b && t("load-more");
    });
    function ae(b, B) {
      if (b) {
        S[B] = b.$el;
        const O = e.visibleItemLimit;
        if (!O || e.menuItems.length < O)
          return;
        const j = Math.min(
          O,
          Math.max(2, Math.floor(0.2 * e.menuItems.length))
        );
        B === e.menuItems.length - j && (D.value = b.$el);
      }
    }
    function P() {
      if (!e.visibleItemLimit || e.visibleItemLimit > e.menuItems.length || C.value === void 0)
        return;
      const b = C.value >= 0 ? C.value : 0;
      S[b].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
    const U = f(null), Z = f(null);
    function g() {
      if (Z.value = null, !e.visibleItemLimit || S.length <= e.visibleItemLimit) {
        U.value = null;
        return;
      }
      const b = S[0], B = S[e.visibleItemLimit];
      if (U.value = m(
        b,
        B
      ), e.footer) {
        const O = S[S.length - 1];
        Z.value = O.scrollHeight;
      }
    }
    function m(b, B) {
      const O = b.getBoundingClientRect().top;
      return B.getBoundingClientRect().top - O + 2;
    }
    re(() => {
      document.addEventListener("mouseup", I);
    }), Te(() => {
      document.removeEventListener("mouseup", I);
    }), te(Q(e, "expanded"), (b) => Be(this, null, function* () {
      const B = c();
      !b && l.value && B === void 0 && d("highlighted"), b && B !== void 0 && d("highlighted", B), b && (yield ge(), g(), yield ge(), P());
    })), te(Q(e, "menuItems"), (b) => Be(this, null, function* () {
      b.length < S.length && (S.length = b.length), e.expanded && (yield ge(), g(), yield ge(), P());
    }), { deep: !0 });
    const k = p(() => ({
      "max-height": U.value ? `${U.value}px` : void 0,
      "overflow-y": U.value ? "scroll" : void 0,
      "margin-bottom": Z.value ? `${Z.value}px` : void 0
    })), q = p(() => ({
      "cdx-menu--has-footer": !!e.footer,
      "cdx-menu--has-sticky-footer": !!e.footer && !!U.value
    })), {
      rootClasses: T,
      rootStyle: ee,
      otherAttrs: fe
    } = pe(s, q);
    return {
      listBoxStyle: k,
      rootClasses: T,
      rootStyle: ee,
      otherAttrs: fe,
      assignTemplateRef: ae,
      computedMenuItems: a,
      computedShowNoResultsSlot: u,
      highlightedMenuItem: l,
      highlightedViaKeyboard: i,
      activeMenuItem: o,
      handleMenuItemChange: d,
      handleKeyNavigation: N
    };
  },
  methods: {
    getHighlightedMenuItem() {
      return this.highlightedMenuItem;
    },
    getHighlightedViaKeyboard() {
      return this.highlightedViaKeyboard;
    },
    clearActive() {
      this.handleMenuItemChange("active");
    },
    delegateKeyNavigation(e, t = !0) {
      return this.handleKeyNavigation(e, t);
    }
  }
});
const io = {
  key: 0,
  class: "cdx-menu__pending cdx-menu-item"
}, ro = {
  key: 1,
  class: "cdx-menu__no-results cdx-menu-item"
};
function co(e, t, n, s, a, u) {
  const l = $("cdx-menu-item"), i = $("cdx-progress-bar");
  return ue((r(), v("div", {
    class: K(["cdx-menu", e.rootClasses]),
    style: ce(e.rootStyle)
  }, [
    h("ul", Y({
      class: "cdx-menu__listbox",
      role: "listbox",
      "aria-multiselectable": "false",
      style: e.listBoxStyle
    }, e.otherAttrs), [
      e.showPending && e.computedMenuItems.length === 0 && e.$slots.pending ? (r(), v("li", io, [
        w(e.$slots, "pending")
      ])) : x("", !0),
      e.computedShowNoResultsSlot ? (r(), v("li", ro, [
        w(e.$slots, "no-results")
      ])) : x("", !0),
      (r(!0), v(he, null, $e(e.computedMenuItems, (o, c) => {
        var d, C;
        return r(), E(l, Y({
          key: o.value,
          ref_for: !0,
          ref: (y) => e.assignTemplateRef(y, c)
        }, o, {
          selected: o.value === e.selected,
          active: o.value === ((d = e.activeMenuItem) == null ? void 0 : d.value),
          highlighted: o.value === ((C = e.highlightedMenuItem) == null ? void 0 : C.value),
          "show-thumbnail": e.showThumbnail,
          "bold-label": e.boldLabel,
          "hide-description-overflow": e.hideDescriptionOverflow,
          "search-query": e.searchQuery,
          onChange: (y, M) => e.handleMenuItemChange(y, M && o),
          onClick: (y) => e.$emit("menu-item-click", o)
        }), {
          default: L(() => {
            var y, M;
            return [
              w(e.$slots, "default", {
                menuItem: o,
                active: o.value === ((y = e.activeMenuItem) == null ? void 0 : y.value) && o.value === ((M = e.highlightedMenuItem) == null ? void 0 : M.value)
              })
            ];
          }),
          _: 2
        }, 1040, ["selected", "active", "highlighted", "show-thumbnail", "bold-label", "hide-description-overflow", "search-query", "onChange", "onClick"]);
      }), 128)),
      e.showPending ? (r(), E(i, {
        key: 2,
        class: "cdx-menu__progress-bar",
        inline: !0
      })) : x("", !0)
    ], 16)
  ], 6)), [
    [ye, e.expanded]
  ]);
}
const Ie = /* @__PURE__ */ F(uo, [["render", co]]), po = le(Mt), fo = le(Ae), mo = V({
  name: "CdxTextInput",
  components: { CdxIcon: G },
  inheritAttrs: !1,
  expose: ["focus"],
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    inputType: {
      type: String,
      default: "text",
      validator: po
    },
    status: {
      type: String,
      default: "default",
      validator: fo
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    startIcon: {
      type: [String, Object],
      default: void 0
    },
    endIcon: {
      type: [String, Object],
      default: void 0
    },
    clearable: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:modelValue",
    "keydown",
    "input",
    "change",
    "focus",
    "blur"
  ],
  setup(e, { emit: t, attrs: n }) {
    const s = ie(Q(e, "modelValue"), t), a = p(() => e.clearable && !!s.value && !e.disabled), u = p(() => ({
      "cdx-text-input--has-start-icon": !!e.startIcon,
      "cdx-text-input--has-end-icon": !!e.endIcon,
      "cdx-text-input--clearable": a.value,
      [`cdx-text-input--status-${e.status}`]: !0
    })), {
      rootClasses: l,
      rootStyle: i,
      otherAttrs: o
    } = pe(n, u), c = p(() => ({
      "cdx-text-input__input--has-value": !!s.value
    }));
    return {
      wrappedModel: s,
      isClearable: a,
      rootClasses: l,
      rootStyle: i,
      otherAttrs: o,
      inputClasses: c,
      onClear: () => {
        s.value = "";
      },
      onInput: (I) => {
        t("input", I);
      },
      onChange: (I) => {
        t("change", I);
      },
      onKeydown: (I) => {
        (I.key === "Home" || I.key === "End") && !I.ctrlKey && !I.metaKey || t("keydown", I);
      },
      onFocus: (I) => {
        t("focus", I);
      },
      onBlur: (I) => {
        t("blur", I);
      },
      cdxIconClear: Pt
    };
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    }
  }
});
const ho = ["type", "disabled"];
function vo(e, t, n, s, a, u) {
  const l = $("cdx-icon");
  return r(), v("div", {
    class: K(["cdx-text-input", e.rootClasses]),
    style: ce(e.rootStyle)
  }, [
    ue(h("input", Y({
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wrappedModel = i),
      class: ["cdx-text-input__input", e.inputClasses]
    }, e.otherAttrs, {
      type: e.inputType,
      disabled: e.disabled,
      onInput: t[1] || (t[1] = (...i) => e.onInput && e.onInput(...i)),
      onChange: t[2] || (t[2] = (...i) => e.onChange && e.onChange(...i)),
      onFocus: t[3] || (t[3] = (...i) => e.onFocus && e.onFocus(...i)),
      onBlur: t[4] || (t[4] = (...i) => e.onBlur && e.onBlur(...i)),
      onKeydown: t[5] || (t[5] = (...i) => e.onKeydown && e.onKeydown(...i))
    }), null, 16, ho), [
      [At, e.wrappedModel]
    ]),
    e.startIcon ? (r(), E(l, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__start-icon"
    }, null, 8, ["icon"])) : x("", !0),
    e.endIcon ? (r(), E(l, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__end-icon"
    }, null, 8, ["icon"])) : x("", !0),
    e.isClearable ? (r(), E(l, {
      key: 2,
      icon: e.cdxIconClear,
      class: "cdx-text-input__icon-vue cdx-text-input__clear-icon",
      onMousedown: t[6] || (t[6] = J(() => {
      }, ["prevent"])),
      onClick: e.onClear
    }, null, 8, ["icon", "onClick"])) : x("", !0)
  ], 6);
}
const Le = /* @__PURE__ */ F(mo, [["render", vo]]);
function Ve(e) {
  const t = f(
    { width: void 0, height: void 0 }
  );
  if (typeof window != "object" || !("ResizeObserver" in window) || !("ResizeObserverEntry" in window))
    return t;
  const n = new window.ResizeObserver(
    (a) => {
      const u = a[0];
      u && (t.value = {
        width: u.borderBoxSize[0].inlineSize,
        height: u.borderBoxSize[0].blockSize
      });
    }
  );
  let s = !1;
  return re(() => {
    s = !0, e.value && n.observe(e.value);
  }), Te(() => {
    s = !1, n.disconnect();
  }), te(e, (a) => {
    !s || (n.disconnect(), t.value = {
      width: void 0,
      height: void 0
    }, a && n.observe(a));
  }), t;
}
const bo = le(Ae), Fe = V({
  name: "CdxCombobox",
  components: {
    CdxButton: ve,
    CdxIcon: G,
    CdxMenu: Ie,
    CdxTextInput: Le
  },
  inheritAttrs: !1,
  props: {
    menuItems: {
      type: Array,
      required: !0
    },
    selected: {
      type: [String, Number],
      required: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    status: {
      type: String,
      default: "default",
      validator: bo
    }
  },
  emits: [
    "update:selected",
    "load-more"
  ],
  setup(e, { emit: t, attrs: n, slots: s }) {
    const a = f(), u = f(), l = f(), i = ne("combobox"), o = Q(e, "selected"), c = ie(o, t, "update:selected"), d = f(!1), C = f(!1), y = p(() => {
      var g, m;
      return (m = (g = l.value) == null ? void 0 : g.getHighlightedMenuItem()) == null ? void 0 : m.id;
    }), M = p(() => ({
      "cdx-combobox--expanded": d.value,
      "cdx-combobox--disabled": e.disabled
    })), A = Ve(u), N = p(() => {
      var g;
      return `${(g = A.value.width) != null ? g : 0}px`;
    }), {
      rootClasses: I,
      rootStyle: S,
      otherAttrs: D
    } = pe(n, M);
    function R() {
      C.value && d.value ? d.value = !1 : (e.menuItems.length > 0 || s["no-results"]) && (d.value = !0);
    }
    function ae() {
      d.value = C.value && d.value;
    }
    function P() {
      e.disabled || (C.value = !0);
    }
    function U() {
      var g;
      e.disabled || (g = a.value) == null || g.focus();
    }
    function Z(g) {
      !l.value || e.disabled || e.menuItems.length === 0 || g.key === " " || l.value.delegateKeyNavigation(g);
    }
    return te(d, () => {
      C.value = !1;
    }), {
      input: a,
      inputWrapper: u,
      currentWidthInPx: N,
      menu: l,
      menuId: i,
      modelWrapper: c,
      expanded: d,
      highlightedId: y,
      onInputFocus: R,
      onInputBlur: ae,
      onKeydown: Z,
      onButtonClick: U,
      onButtonMousedown: P,
      cdxIconExpand: it,
      rootClasses: I,
      rootStyle: S,
      otherAttrs: D
    };
  }
}), Pe = () => {
  Ee((e) => ({
    "0c4f4b7d": e.currentWidthInPx
  }));
}, Qe = Fe.setup;
Fe.setup = Qe ? (e, t) => (Pe(), Qe(e, t)) : Pe;
const go = {
  ref: "inputWrapper",
  class: "cdx-combobox__input-wrapper"
};
function yo(e, t, n, s, a, u) {
  const l = $("cdx-text-input"), i = $("cdx-icon"), o = $("cdx-button"), c = $("cdx-menu");
  return r(), v("div", {
    class: K(["cdx-combobox", e.rootClasses]),
    style: ce(e.rootStyle)
  }, [
    h("div", go, [
      z(l, Y({
        ref: "input",
        modelValue: e.modelWrapper,
        "onUpdate:modelValue": t[0] || (t[0] = (d) => e.modelWrapper = d)
      }, e.otherAttrs, {
        class: "cdx-combobox__input",
        "aria-activedescendant": e.highlightedId,
        "aria-expanded": e.expanded,
        "aria-controls": e.menuId,
        "aria-owns": e.menuId,
        disabled: e.disabled,
        status: e.status,
        "aria-autocomplete": "list",
        autocomplete: "off",
        role: "combobox",
        onKeydown: e.onKeydown,
        onFocus: e.onInputFocus,
        onBlur: e.onInputBlur
      }), null, 16, ["modelValue", "aria-activedescendant", "aria-expanded", "aria-controls", "aria-owns", "disabled", "status", "onKeydown", "onFocus", "onBlur"]),
      z(o, {
        class: "cdx-combobox__expand-button",
        "aria-hidden": "true",
        disabled: e.disabled,
        tabindex: "-1",
        onMousedown: e.onButtonMousedown,
        onClick: e.onButtonClick
      }, {
        default: L(() => [
          z(i, {
            class: "cdx-combobox__expand-icon",
            icon: e.cdxIconExpand
          }, null, 8, ["icon"])
        ]),
        _: 1
      }, 8, ["disabled", "onMousedown", "onClick"])
    ], 512),
    z(c, Y({
      id: e.menuId,
      ref: "menu",
      selected: e.modelWrapper,
      "onUpdate:selected": t[1] || (t[1] = (d) => e.modelWrapper = d),
      expanded: e.expanded,
      "onUpdate:expanded": t[2] || (t[2] = (d) => e.expanded = d),
      "menu-items": e.menuItems
    }, e.menuConfig, {
      onLoadMore: t[3] || (t[3] = (d) => e.$emit("load-more"))
    }), {
      default: L(({ menuItem: d }) => [
        w(e.$slots, "menu-item", { menuItem: d })
      ]),
      "no-results": L(() => [
        w(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const Vl = /* @__PURE__ */ F(Fe, [["render", yo]]), Co = V({
  name: "CdxDialog",
  components: {
    CdxButton: ve,
    CdxIcon: G
  },
  props: {
    open: {
      type: Boolean,
      default: !1
    },
    title: {
      type: String,
      required: !0
    },
    hideTitle: {
      type: Boolean,
      default: !1
    },
    closeButtonLabel: {
      type: String,
      default: ""
    },
    primaryAction: {
      type: Object,
      default: null
    },
    defaultAction: {
      type: Object,
      default: null
    },
    stackedActions: {
      type: Boolean,
      default: !1
    },
    showDividers: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:open",
    "primary",
    "default"
  ],
  setup(e, { emit: t }) {
    const n = ne("dialog-label"), s = f(), a = f(), u = f(), l = f(), i = f(), o = p(() => !e.hideTitle || !!e.closeButtonLabel), c = p(() => ({
      "cdx-dialog--vertical-actions": e.stackedActions,
      "cdx-dialog--horizontal-actions": !e.stackedActions,
      "cdx-dialog--dividers": e.showDividers
    })), d = f(0);
    function C() {
      t("update:open", !1);
    }
    function y() {
      A(s.value);
    }
    function M() {
      A(s.value, !0);
    }
    function A(N, I = !1) {
      let S = Array.from(
        N.querySelectorAll(`
					input, select, textarea, button, object, a, area,
					[contenteditable], [tabindex]:not([tabindex^="-"])
				`)
      );
      I && (S = S.reverse());
      for (const D of S)
        if (D.focus(), document.activeElement === D)
          return !0;
      return !1;
    }
    return te(Q(e, "open"), (N) => {
      N ? (d.value = window.innerWidth - document.documentElement.clientWidth, document.documentElement.style.setProperty("margin-right", `${d.value}px`), document.body.classList.add("cdx-dialog-open"), ge(() => {
        var I;
        A(a.value) || (I = u.value) == null || I.focus();
      })) : (document.body.classList.remove("cdx-dialog-open"), document.documentElement.style.removeProperty("margin-right"));
    }), {
      close: C,
      cdxIconClose: st,
      labelId: n,
      rootClasses: c,
      dialogElement: s,
      focusTrapStart: l,
      focusTrapEnd: i,
      focusFirst: y,
      focusLast: M,
      dialogBody: a,
      focusHolder: u,
      showHeader: o
    };
  }
});
const _o = ["aria-labelledby"], $o = {
  key: 0,
  class: "cdx-dialog__header"
}, Ao = ["id"], Io = {
  ref: "focusHolder",
  class: "cdx-dialog-focus-trap",
  tabindex: "-1"
}, Bo = {
  ref: "dialogBody",
  class: "cdx-dialog__body"
}, xo = {
  key: 1,
  class: "cdx-dialog__footer"
};
function ko(e, t, n, s, a, u) {
  const l = $("cdx-icon"), i = $("cdx-button");
  return r(), E(De, {
    name: "cdx-dialog-fade",
    appear: ""
  }, {
    default: L(() => [
      e.open ? (r(), v("div", {
        key: 0,
        class: "cdx-dialog-backdrop",
        onClick: t[5] || (t[5] = (...o) => e.close && e.close(...o)),
        onKeyup: t[6] || (t[6] = X((...o) => e.close && e.close(...o), ["escape"]))
      }, [
        h("div", {
          ref: "focusTrapStart",
          tabindex: "0",
          onFocus: t[0] || (t[0] = (...o) => e.focusLast && e.focusLast(...o))
        }, null, 544),
        h("div", {
          ref: "dialogElement",
          class: K(["cdx-dialog", e.rootClasses]),
          role: "dialog",
          "aria-labelledby": e.labelId,
          onClick: t[3] || (t[3] = J(() => {
          }, ["stop"]))
        }, [
          e.showHeader ? (r(), v("div", $o, [
            ue(h("h2", {
              id: e.labelId,
              class: "cdx-dialog__header__title"
            }, H(e.title), 9, Ao), [
              [ye, !e.hideTitle]
            ]),
            e.closeButtonLabel ? (r(), E(i, {
              key: 0,
              class: "cdx-dialog__header__close-button",
              type: "quiet",
              "aria-label": e.closeButtonLabel,
              onClick: e.close
            }, {
              default: L(() => [
                z(l, {
                  icon: e.cdxIconClose,
                  "icon-label": e.closeButtonLabel
                }, null, 8, ["icon", "icon-label"])
              ]),
              _: 1
            }, 8, ["aria-label", "onClick"])) : x("", !0)
          ])) : x("", !0),
          h("div", Io, null, 512),
          h("div", Bo, [
            w(e.$slots, "default")
          ], 512),
          e.primaryAction || e.defaultAction ? (r(), v("div", xo, [
            e.primaryAction ? (r(), E(i, {
              key: 0,
              class: "cdx-dialog__footer__primary-action",
              type: "primary",
              action: e.primaryAction.actionType,
              disabled: e.primaryAction.disabled,
              onClick: t[1] || (t[1] = (o) => e.$emit("primary"))
            }, {
              default: L(() => [
                oe(H(e.primaryAction.label), 1)
              ]),
              _: 1
            }, 8, ["action", "disabled"])) : x("", !0),
            e.defaultAction ? (r(), E(i, {
              key: 1,
              class: "cdx-dialog__footer__default-action",
              disabled: e.defaultAction.disabled,
              onClick: t[2] || (t[2] = (o) => e.$emit("default"))
            }, {
              default: L(() => [
                oe(H(e.defaultAction.label), 1)
              ]),
              _: 1
            }, 8, ["disabled"])) : x("", !0)
          ])) : x("", !0)
        ], 10, _o),
        h("div", {
          ref: "focusTrapEnd",
          tabindex: "0",
          onFocus: t[4] || (t[4] = (...o) => e.focusFirst && e.focusFirst(...o))
        }, null, 544)
      ], 32)) : x("", !0)
    ]),
    _: 3
  });
}
const Fl = /* @__PURE__ */ F(Co, [["render", ko]]), wo = le(Ae), Ke = V({
  name: "CdxLookup",
  components: {
    CdxMenu: Ie,
    CdxTextInput: Le
  },
  inheritAttrs: !1,
  props: {
    selected: {
      type: [String, Number, null],
      required: !0
    },
    menuItems: {
      type: Array,
      required: !0
    },
    initialInputValue: {
      type: [String, Number],
      default: ""
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    status: {
      type: String,
      default: "default",
      validator: wo
    }
  },
  emits: [
    "update:selected",
    "input",
    "load-more"
  ],
  setup: (e, { emit: t, attrs: n, slots: s }) => {
    const a = f(), u = f(), l = ne("lookup-menu"), i = f(!1), o = f(!1), c = f(!1), d = Q(e, "selected"), C = ie(d, t, "update:selected"), y = p(
      () => e.menuItems.find((m) => m.value === e.selected)
    ), M = p(() => {
      var m, k;
      return (k = (m = u.value) == null ? void 0 : m.getHighlightedMenuItem()) == null ? void 0 : k.id;
    }), A = f(e.initialInputValue), N = Ve(a), I = p(() => {
      var m;
      return `${(m = N.value.width) != null ? m : 0}px`;
    }), S = p(() => ({
      "cdx-lookup--disabled": e.disabled,
      "cdx-lookup--pending": i.value
    })), {
      rootClasses: D,
      rootStyle: R,
      otherAttrs: ae
    } = pe(n, S);
    function P(m) {
      y.value && y.value.label !== m && y.value.value !== m && (C.value = null), m === "" ? (o.value = !1, i.value = !1) : i.value = !0, t("input", m);
    }
    function U() {
      c.value = !0, A.value !== null && A.value !== "" && (e.menuItems.length > 0 || s["no-results"]) && (o.value = !0);
    }
    function Z() {
      c.value = !1, o.value = !1;
    }
    function g(m) {
      !u.value || e.disabled || e.menuItems.length === 0 && !s["no-results"] || m.key === " " || u.value.delegateKeyNavigation(m);
    }
    return te(d, (m) => {
      if (m !== null) {
        const k = y.value ? y.value.label || y.value.value : "";
        A.value !== k && (A.value = k, t("input", A.value));
      }
    }), te(Q(e, "menuItems"), (m) => {
      c.value && i.value && (m.length > 0 || s["no-results"]) && (o.value = !0), m.length === 0 && !s["no-results"] && (o.value = !1), i.value = !1;
    }), {
      rootElement: a,
      currentWidthInPx: I,
      menu: u,
      menuId: l,
      highlightedId: M,
      inputValue: A,
      modelWrapper: C,
      expanded: o,
      onInputBlur: Z,
      rootClasses: D,
      rootStyle: R,
      otherAttrs: ae,
      onUpdateInput: P,
      onInputFocus: U,
      onKeydown: g
    };
  }
}), Ge = () => {
  Ee((e) => ({
    "51c485f8": e.currentWidthInPx
  }));
}, Ze = Ke.setup;
Ke.setup = Ze ? (e, t) => (Ge(), Ze(e, t)) : Ge;
function So(e, t, n, s, a, u) {
  const l = $("cdx-text-input"), i = $("cdx-menu");
  return r(), v("div", {
    ref: "rootElement",
    class: K(["cdx-lookup", e.rootClasses]),
    style: ce(e.rootStyle)
  }, [
    z(l, Y({
      modelValue: e.inputValue,
      "onUpdate:modelValue": t[0] || (t[0] = (o) => e.inputValue = o)
    }, e.otherAttrs, {
      class: "cdx-lookup__input",
      role: "combobox",
      autocomplete: "off",
      "aria-autocomplete": "list",
      "aria-controls": e.menuId,
      "aria-owns": e.menuId,
      "aria-expanded": e.expanded,
      "aria-activedescendant": e.highlightedId,
      disabled: e.disabled,
      status: e.status,
      "onUpdate:modelValue": e.onUpdateInput,
      onFocus: e.onInputFocus,
      onBlur: e.onInputBlur,
      onKeydown: e.onKeydown
    }), null, 16, ["modelValue", "aria-controls", "aria-owns", "aria-expanded", "aria-activedescendant", "disabled", "status", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
    z(i, Y({
      id: e.menuId,
      ref: "menu",
      selected: e.modelWrapper,
      "onUpdate:selected": t[1] || (t[1] = (o) => e.modelWrapper = o),
      expanded: e.expanded,
      "onUpdate:expanded": t[2] || (t[2] = (o) => e.expanded = o),
      "menu-items": e.menuItems
    }, e.menuConfig, {
      onLoadMore: t[3] || (t[3] = (o) => e.$emit("load-more"))
    }), {
      default: L(({ menuItem: o }) => [
        w(e.$slots, "menu-item", { menuItem: o })
      ]),
      "no-results": L(() => [
        w(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const Kl = /* @__PURE__ */ F(Ke, [["render", So]]), Mo = {
  notice: Gt,
  error: ut,
  warning: at,
  success: dt
}, Do = V({
  name: "CdxMessage",
  components: { CdxButton: ve, CdxIcon: G },
  props: {
    type: {
      type: String,
      default: "notice",
      validator: nt
    },
    inline: {
      type: Boolean,
      default: !1
    },
    icon: {
      type: [String, Object],
      default: null
    },
    fadeIn: {
      type: Boolean,
      default: !1
    },
    dismissButtonLabel: {
      type: String,
      default: ""
    },
    autoDismiss: {
      type: [Boolean, Number],
      default: !1,
      validator: (e) => typeof e == "boolean" || typeof e == "number" && e > 0
    }
  },
  emits: [
    "user-dismissed",
    "auto-dismissed"
  ],
  setup(e, { emit: t }) {
    const n = f(!1), s = p(
      () => e.inline === !1 && e.dismissButtonLabel.length > 0
    ), a = p(() => e.autoDismiss === !1 ? !1 : e.autoDismiss === !0 ? 4e3 : e.autoDismiss), u = p(() => ({
      "cdx-message--inline": e.inline,
      "cdx-message--block": !e.inline,
      "cdx-message--user-dismissable": s.value,
      [`cdx-message--${e.type}`]: !0
    })), l = p(
      () => e.icon && e.type === "notice" ? e.icon : Mo[e.type]
    ), i = f("");
    function o(c) {
      n.value || (i.value = c === "user-dismissed" ? "cdx-message-leave-active-user" : "cdx-message-leave-active-system", n.value = !0, t(c));
    }
    return re(() => {
      a.value && setTimeout(() => o("auto-dismissed"), a.value);
    }), {
      dismissed: n,
      userDismissable: s,
      rootClasses: u,
      leaveActiveClass: i,
      computedIcon: l,
      onDismiss: o,
      cdxIconClose: st
    };
  }
});
const To = ["aria-live", "role"], Eo = { class: "cdx-message__content" };
function Lo(e, t, n, s, a, u) {
  const l = $("cdx-icon"), i = $("cdx-button");
  return r(), E(De, {
    name: "cdx-message",
    appear: e.fadeIn,
    "leave-active-class": e.leaveActiveClass
  }, {
    default: L(() => [
      e.dismissed ? x("", !0) : (r(), v("div", {
        key: 0,
        class: K(["cdx-message", e.rootClasses]),
        "aria-live": e.type !== "error" ? "polite" : void 0,
        role: e.type === "error" ? "alert" : void 0
      }, [
        z(l, {
          class: "cdx-message__icon--vue",
          icon: e.computedIcon
        }, null, 8, ["icon"]),
        h("div", Eo, [
          w(e.$slots, "default")
        ]),
        e.userDismissable ? (r(), E(i, {
          key: 0,
          class: "cdx-message__dismiss-button",
          type: "quiet",
          "aria-label": e.dismissButtonLabel,
          onClick: t[0] || (t[0] = (o) => e.onDismiss("user-dismissed"))
        }, {
          default: L(() => [
            z(l, {
              icon: e.cdxIconClose,
              "icon-label": e.dismissButtonLabel
            }, null, 8, ["icon", "icon-label"])
          ]),
          _: 1
        }, 8, ["aria-label"])) : x("", !0)
      ], 10, To))
    ]),
    _: 3
  }, 8, ["appear", "leave-active-class"]);
}
const Nl = /* @__PURE__ */ F(Do, [["render", Lo]]), Vo = V({
  name: "CdxRadio",
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ""
    },
    inputValue: {
      type: [String, Number, Boolean],
      default: !1
    },
    name: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    inline: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:modelValue"
  ],
  setup(e, { emit: t }) {
    const n = p(() => ({
      "cdx-radio--inline": e.inline
    })), s = f(), a = ne("radio"), u = () => {
      s.value.focus();
    }, l = ie(Q(e, "modelValue"), t);
    return {
      rootClasses: n,
      input: s,
      radioId: a,
      focusInput: u,
      wrappedModel: l
    };
  }
});
const Fo = ["id", "name", "value", "disabled"], Ko = /* @__PURE__ */ h("span", { class: "cdx-radio__icon" }, null, -1), No = ["for"];
function Ro(e, t, n, s, a, u) {
  return r(), v("span", {
    class: K(["cdx-radio", e.rootClasses])
  }, [
    ue(h("input", {
      id: e.radioId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (l) => e.wrappedModel = l),
      class: "cdx-radio__input",
      type: "radio",
      name: e.name,
      value: e.inputValue,
      disabled: e.disabled
    }, null, 8, Fo), [
      [It, e.wrappedModel]
    ]),
    Ko,
    h("label", {
      class: "cdx-radio__label",
      for: e.radioId,
      onClick: t[1] || (t[1] = (...l) => e.focusInput && e.focusInput(...l))
    }, [
      w(e.$slots, "default")
    ], 8, No)
  ], 2);
}
const Rl = /* @__PURE__ */ F(Vo, [["render", Ro]]), Oo = le(Ae), qo = V({
  name: "CdxSearchInput",
  components: {
    CdxButton: ve,
    CdxTextInput: Le
  },
  inheritAttrs: !1,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    buttonLabel: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: "default",
      validator: Oo
    }
  },
  emits: [
    "update:modelValue",
    "submit-click"
  ],
  setup(e, { emit: t, attrs: n }) {
    const s = ie(Q(e, "modelValue"), t), a = p(() => ({
      "cdx-search-input--has-end-button": !!e.buttonLabel
    })), {
      rootClasses: u,
      rootStyle: l,
      otherAttrs: i
    } = pe(n, a);
    return {
      wrappedModel: s,
      rootClasses: u,
      rootStyle: l,
      otherAttrs: i,
      handleSubmit: () => {
        t("submit-click", s.value);
      },
      searchIcon: Xt
    };
  },
  methods: {
    focus() {
      this.$refs.textInput.focus();
    }
  }
});
const zo = { class: "cdx-search-input__input-wrapper" };
function Ho(e, t, n, s, a, u) {
  const l = $("cdx-text-input"), i = $("cdx-button");
  return r(), v("div", {
    class: K(["cdx-search-input", e.rootClasses]),
    style: ce(e.rootStyle)
  }, [
    h("div", zo, [
      z(l, Y({
        ref: "textInput",
        modelValue: e.wrappedModel,
        "onUpdate:modelValue": t[0] || (t[0] = (o) => e.wrappedModel = o),
        class: "cdx-search-input__text-input",
        "input-type": "search",
        "start-icon": e.searchIcon,
        status: e.status
      }, e.otherAttrs, {
        onKeydown: X(e.handleSubmit, ["enter"])
      }), null, 16, ["modelValue", "start-icon", "status", "onKeydown"]),
      w(e.$slots, "default")
    ]),
    e.buttonLabel ? (r(), E(i, {
      key: 0,
      class: "cdx-search-input__end-button",
      onClick: e.handleSubmit
    }, {
      default: L(() => [
        oe(H(e.buttonLabel), 1)
      ]),
      _: 1
    }, 8, ["onClick"])) : x("", !0)
  ], 6);
}
const jo = /* @__PURE__ */ F(qo, [["render", Ho]]), Ne = V({
  name: "CdxSelect",
  components: {
    CdxIcon: G,
    CdxMenu: Ie
  },
  props: {
    menuItems: {
      type: Array,
      required: !0
    },
    selected: {
      type: [String, Number, null],
      required: !0
    },
    defaultLabel: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    defaultIcon: {
      type: [String, Object],
      default: void 0
    }
  },
  emits: [
    "update:selected",
    "load-more"
  ],
  setup(e, { emit: t }) {
    const n = f(), s = f(), a = ne("select-handle"), u = ne("select-menu"), l = f(!1), i = ie(Q(e, "selected"), t, "update:selected"), o = p(
      () => e.menuItems.find((D) => D.value === e.selected)
    ), c = p(() => o.value ? o.value.label || o.value.value : e.defaultLabel), d = Ve(n), C = p(() => {
      var D;
      return `${(D = d.value.width) != null ? D : 0}px`;
    }), y = p(() => {
      if (e.defaultIcon && !o.value)
        return e.defaultIcon;
      if (o.value && o.value.icon)
        return o.value.icon;
    }), M = p(() => ({
      "cdx-select-vue--enabled": !e.disabled,
      "cdx-select-vue--disabled": e.disabled,
      "cdx-select-vue--expanded": l.value,
      "cdx-select-vue--value-selected": !!o.value,
      "cdx-select-vue--no-selections": !o.value,
      "cdx-select-vue--has-start-icon": !!y.value
    })), A = p(() => {
      var D, R;
      return (R = (D = s.value) == null ? void 0 : D.getHighlightedMenuItem()) == null ? void 0 : R.id;
    });
    function N() {
      l.value = !1;
    }
    function I() {
      var D;
      e.disabled || (l.value = !l.value, (D = n.value) == null || D.focus());
    }
    function S(D) {
      var R;
      e.disabled || (R = s.value) == null || R.delegateKeyNavigation(D);
    }
    return {
      handle: n,
      handleId: a,
      menu: s,
      menuId: u,
      modelWrapper: i,
      selectedMenuItem: o,
      highlightedId: A,
      expanded: l,
      onBlur: N,
      currentLabel: c,
      currentWidthInPx: C,
      rootClasses: M,
      onClick: I,
      onKeydown: S,
      startIcon: y,
      cdxIconExpand: it
    };
  }
}), Je = () => {
  Ee((e) => ({
    46589886: e.currentWidthInPx
  }));
}, Xe = Ne.setup;
Ne.setup = Xe ? (e, t) => (Je(), Xe(e, t)) : Je;
const Uo = ["aria-disabled"], Wo = ["aria-owns", "aria-labelledby", "aria-activedescendant", "aria-expanded"], Po = ["id"];
function Qo(e, t, n, s, a, u) {
  const l = $("cdx-icon"), i = $("cdx-menu");
  return r(), v("div", {
    class: K(["cdx-select-vue", e.rootClasses]),
    "aria-disabled": e.disabled
  }, [
    h("div", {
      ref: "handle",
      class: "cdx-select-vue__handle",
      tabindex: "0",
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-owns": e.menuId,
      "aria-labelledby": e.handleId,
      "aria-activedescendant": e.highlightedId,
      "aria-haspopup": "listbox",
      "aria-expanded": e.expanded,
      onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o)),
      onBlur: t[1] || (t[1] = (...o) => e.onBlur && e.onBlur(...o)),
      onKeydown: t[2] || (t[2] = (...o) => e.onKeydown && e.onKeydown(...o))
    }, [
      h("span", {
        id: e.handleId,
        role: "textbox",
        "aria-readonly": "true"
      }, [
        w(e.$slots, "label", {
          selectedMenuItem: e.selectedMenuItem,
          defaultLabel: e.defaultLabel
        }, () => [
          oe(H(e.currentLabel), 1)
        ])
      ], 8, Po),
      e.startIcon ? (r(), E(l, {
        key: 0,
        icon: e.startIcon,
        class: "cdx-select-vue__start-icon"
      }, null, 8, ["icon"])) : x("", !0),
      z(l, {
        icon: e.cdxIconExpand,
        class: "cdx-select-vue__indicator"
      }, null, 8, ["icon"])
    ], 40, Wo),
    z(i, Y({
      id: e.menuId,
      ref: "menu",
      selected: e.modelWrapper,
      "onUpdate:selected": t[3] || (t[3] = (o) => e.modelWrapper = o),
      expanded: e.expanded,
      "onUpdate:expanded": t[4] || (t[4] = (o) => e.expanded = o),
      "menu-items": e.menuItems
    }, e.menuConfig, {
      onLoadMore: t[5] || (t[5] = (o) => e.$emit("load-more"))
    }), {
      default: L(({ menuItem: o }) => [
        w(e.$slots, "menu-item", { menuItem: o })
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 10, Uo);
}
const Ol = /* @__PURE__ */ F(Ne, [["render", Qo]]), Go = V({
  name: "CdxTab",
  props: {
    name: {
      type: String,
      required: !0
    },
    label: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = Ue(ot), n = Ue(lt);
    if (!t || !n)
      throw new Error("Tab component must be used inside a Tabs component");
    const s = t.value.get(e.name) || {}, a = p(() => e.name === n.value);
    return {
      tab: s,
      isActive: a
    };
  }
});
const Zo = ["id", "aria-hidden", "aria-labelledby"];
function Jo(e, t, n, s, a, u) {
  return ue((r(), v("section", {
    id: e.tab.id,
    "aria-hidden": !e.isActive,
    "aria-labelledby": `${e.tab.id}-label`,
    class: "cdx-tab",
    role: "tabpanel",
    tabindex: "-1"
  }, [
    w(e.$slots, "default")
  ], 8, Zo)), [
    [ye, e.isActive]
  ]);
}
const ql = /* @__PURE__ */ F(Go, [["render", Jo]]), Xo = V({
  name: "CdxTabs",
  components: {
    CdxButton: ve,
    CdxIcon: G
  },
  props: {
    active: {
      type: String,
      required: !0
    },
    framed: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:active"
  ],
  expose: [
    "select",
    "next",
    "prev"
  ],
  setup(e, { slots: t, emit: n }) {
    const s = f(), a = f(), u = f(), l = f(), i = f(), o = rt(s), c = p(() => {
      var q;
      const g = [], m = (q = t.default) == null ? void 0 : q.call(t);
      m && m.forEach(k);
      function k(T) {
        T && typeof T == "object" && "type" in T && (typeof T.type == "object" && "name" in T.type && T.type.name === "CdxTab" ? g.push(T) : "children" in T && Array.isArray(T.children) && T.children.forEach(k));
      }
      return g;
    });
    if (!c.value || c.value.length === 0)
      throw new Error("Slot content cannot be empty");
    const d = p(() => c.value.reduce((g, m) => {
      var k;
      if (((k = m.props) == null ? void 0 : k.name) && typeof m.props.name == "string") {
        if (g.get(m.props.name))
          throw new Error("Tab names must be unique");
        g.set(m.props.name, {
          name: m.props.name,
          id: ne(m.props.name),
          label: m.props.label || m.props.name,
          disabled: m.props.disabled
        });
      }
      return g;
    }, /* @__PURE__ */ new Map())), C = ie(Q(e, "active"), n, "update:active"), y = p(() => Array.from(d.value.keys())), M = p(() => y.value.indexOf(C.value)), A = p(() => {
      var g;
      return (g = d.value.get(C.value)) == null ? void 0 : g.id;
    });
    We(lt, C), We(ot, d);
    const N = f(), I = f(), S = Me(N, { threshold: 0.95 }), D = Me(I, { threshold: 0.95 });
    function R(g, m) {
      const k = g;
      k && (m === 0 ? N.value = k : m === y.value.length - 1 && (I.value = k));
    }
    function ae(g) {
      var q;
      const m = g === C.value, k = !!((q = d.value.get(g)) != null && q.disabled);
      return {
        "cdx-tabs__list__item--selected": m,
        "cdx-tabs__list__item--enabled": !k,
        "cdx-tabs__list__item--disabled": k
      };
    }
    const P = p(() => ({
      "cdx-tabs--framed": e.framed,
      "cdx-tabs--quiet": !e.framed
    }));
    function U(g) {
      if (!a.value || !l.value || !i.value)
        return 0;
      const m = o.value === "rtl" ? i.value : l.value, k = o.value === "rtl" ? l.value : i.value, q = g.offsetLeft, T = q + g.clientWidth, ee = a.value.scrollLeft + m.clientWidth, fe = a.value.scrollLeft + a.value.clientWidth - k.clientWidth;
      return q < ee ? q - ee : T > fe ? T - fe : 0;
    }
    function Z(g) {
      var T;
      if (!a.value || !l.value || !i.value)
        return;
      const m = g === "next" && o.value === "ltr" || g === "prev" && o.value === "rtl" ? 1 : -1;
      let k = 0, q = g === "next" ? a.value.firstElementChild : a.value.lastElementChild;
      for (; q; ) {
        const ee = g === "next" ? q.nextElementSibling : q.previousElementSibling;
        if (k = U(q), Math.sign(k) === m) {
          ee && Math.abs(k) < 0.25 * a.value.clientWidth && (k = U(ee));
          break;
        }
        q = ee;
      }
      a.value.scrollBy({
        left: k,
        behavior: "smooth"
      }), (T = u.value) == null || T.focus();
    }
    return te(C, () => {
      if (A.value === void 0 || !a.value || !l.value || !i.value)
        return;
      const g = document.getElementById(`${A.value}-label`);
      !g || a.value.scrollBy({
        left: U(g),
        behavior: "smooth"
      });
    }), {
      activeTab: C,
      activeTabIndex: M,
      activeTabId: A,
      currentDirection: o,
      rootElement: s,
      listElement: a,
      focusHolder: u,
      prevScroller: l,
      nextScroller: i,
      rootClasses: P,
      tabNames: y,
      tabsData: d,
      firstLabelVisible: S,
      lastLabelVisible: D,
      getLabelClasses: ae,
      assignTemplateRefIfNecessary: R,
      scrollTabs: Z,
      cdxIconPrevious: Jt,
      cdxIconNext: Zt
    };
  },
  methods: {
    select(e) {
      const t = this.tabsData.get(e);
      t && !(t != null && t.disabled) && (this.activeTab = e);
    },
    selectNonDisabled(e, t) {
      const n = this.tabsData.get(this.tabNames[e + t]);
      n && (n.disabled ? this.selectNonDisabled(e + t, t) : this.select(n.name));
    },
    next() {
      this.selectNonDisabled(this.activeTabIndex, 1);
    },
    prev() {
      this.selectNonDisabled(this.activeTabIndex, -1);
    },
    onLeftArrowKeypress() {
      this.currentDirection === "rtl" ? this.next() : this.prev();
    },
    onRightArrowKeypress() {
      this.currentDirection === "rtl" ? this.prev() : this.next();
    },
    onDownArrowKeypress() {
      var e;
      this.activeTabId && ((e = document.getElementById(this.activeTabId)) == null || e.focus());
    }
  }
});
const Yo = {
  ref: "focusHolder",
  tabindex: "-1"
}, el = {
  ref: "prevScroller",
  class: "cdx-tabs__prev-scroller"
}, tl = ["aria-activedescendant"], nl = ["id"], ol = ["href", "aria-disabled", "aria-selected", "onClick", "onKeyup"], ll = {
  ref: "nextScroller",
  class: "cdx-tabs__next-scroller"
}, al = { class: "cdx-tabs__content" };
function sl(e, t, n, s, a, u) {
  const l = $("cdx-icon"), i = $("cdx-button");
  return r(), v("div", {
    ref: "rootElement",
    class: K(["cdx-tabs", e.rootClasses])
  }, [
    h("div", {
      class: "cdx-tabs__header",
      tabindex: "0",
      onKeydown: [
        t[4] || (t[4] = X(J((...o) => e.onRightArrowKeypress && e.onRightArrowKeypress(...o), ["prevent"]), ["right"])),
        t[5] || (t[5] = X(J((...o) => e.onDownArrowKeypress && e.onDownArrowKeypress(...o), ["prevent"]), ["down"])),
        t[6] || (t[6] = X(J((...o) => e.onLeftArrowKeypress && e.onLeftArrowKeypress(...o), ["prevent"]), ["left"]))
      ]
    }, [
      h("div", Yo, null, 512),
      ue(h("div", el, [
        z(i, {
          class: "cdx-tabs__scroll-button",
          type: "quiet",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[0] || (t[0] = J(() => {
          }, ["prevent"])),
          onClick: t[1] || (t[1] = (o) => e.scrollTabs("prev"))
        }, {
          default: L(() => [
            z(l, { icon: e.cdxIconPrevious }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [ye, !e.firstLabelVisible]
      ]),
      h("ul", {
        ref: "listElement",
        class: "cdx-tabs__list",
        role: "tablist",
        "aria-activedescendant": e.activeTabId
      }, [
        (r(!0), v(he, null, $e(e.tabsData.values(), (o, c) => (r(), v("li", {
          id: `${o.id}-label`,
          key: c,
          ref_for: !0,
          ref: (d) => e.assignTemplateRefIfNecessary(d, c),
          class: K([e.getLabelClasses(o.name), "cdx-tabs__list__item"]),
          role: "presentation"
        }, [
          h("a", {
            href: `#${o.id}`,
            role: "tab",
            tabIndex: "-1",
            "aria-disabled": o.disabled,
            "aria-selected": o.name === e.activeTab,
            onClick: J((d) => e.select(o.name), ["prevent"]),
            onKeyup: X((d) => e.select(o.name), ["enter"])
          }, H(o.label), 41, ol)
        ], 10, nl))), 128))
      ], 8, tl),
      ue(h("div", ll, [
        z(i, {
          class: "cdx-tabs__scroll-button",
          type: "quiet",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[2] || (t[2] = J(() => {
          }, ["prevent"])),
          onClick: t[3] || (t[3] = (o) => e.scrollTabs("next"))
        }, {
          default: L(() => [
            z(l, { icon: e.cdxIconNext }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [ye, !e.lastLabelVisible]
      ])
    ], 32),
    h("div", al, [
      w(e.$slots, "default")
    ])
  ], 2);
}
const zl = /* @__PURE__ */ F(Xo, [["render", sl]]), ul = V({
  name: "CdxToggleButton",
  props: {
    modelValue: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    quiet: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:modelValue"
  ],
  setup(e, { emit: t }) {
    const n = f(!1);
    return {
      rootClasses: p(() => ({
        "cdx-toggle-button--quiet": e.quiet,
        "cdx-toggle-button--framed": !e.quiet,
        "cdx-toggle-button--toggled-on": e.modelValue,
        "cdx-toggle-button--toggled-off": !e.modelValue,
        "cdx-toggle-button--is-active": n.value
      })),
      onClick: () => {
        t("update:modelValue", !e.modelValue);
      },
      setActive: (l) => {
        n.value = l;
      }
    };
  }
});
const il = ["aria-pressed", "disabled"];
function dl(e, t, n, s, a, u) {
  return r(), v("button", {
    class: K(["cdx-toggle-button", e.rootClasses]),
    "aria-pressed": e.modelValue,
    disabled: e.disabled,
    onClick: t[0] || (t[0] = (...l) => e.onClick && e.onClick(...l)),
    onKeydown: t[1] || (t[1] = X((l) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = X((l) => e.setActive(!1), ["space", "enter"]))
  }, [
    w(e.$slots, "default")
  ], 42, il);
}
const rl = /* @__PURE__ */ F(ul, [["render", dl]]), cl = V({
  name: "CdxToggleButtonGroup",
  components: {
    CdxIcon: G,
    CdxToggleButton: rl
  },
  props: {
    buttons: {
      type: Array,
      required: !0,
      validator: (e) => Array.isArray(e) && e.length >= 1
    },
    modelValue: {
      type: [String, Number, null, Array],
      required: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:modelValue"
  ],
  setup(e, { emit: t }) {
    function n(a) {
      return Array.isArray(e.modelValue) ? e.modelValue.indexOf(a.value) !== -1 : e.modelValue !== null ? e.modelValue === a.value : !1;
    }
    function s(a, u) {
      if (Array.isArray(e.modelValue)) {
        const l = e.modelValue.indexOf(a.value) !== -1;
        u && !l ? t("update:modelValue", e.modelValue.concat(a.value)) : !u && l && t("update:modelValue", e.modelValue.filter((i) => i !== a.value));
      } else
        u && e.modelValue !== a.value && t("update:modelValue", a.value);
    }
    return {
      getButtonLabel: ct,
      isSelected: n,
      onUpdate: s
    };
  }
});
const pl = { class: "cdx-toggle-button-group" };
function fl(e, t, n, s, a, u) {
  const l = $("cdx-icon"), i = $("cdx-toggle-button");
  return r(), v("div", pl, [
    (r(!0), v(he, null, $e(e.buttons, (o) => (r(), E(i, {
      key: o.value,
      "model-value": e.isSelected(o),
      disabled: o.disabled || e.disabled,
      "aria-label": o.ariaLabel,
      "onUpdate:modelValue": (c) => e.onUpdate(o, c)
    }, {
      default: L(() => [
        w(e.$slots, "default", {
          button: o,
          selected: e.isSelected(o)
        }, () => [
          o.icon ? (r(), E(l, {
            key: 0,
            icon: o.icon
          }, null, 8, ["icon"])) : x("", !0),
          oe(" " + H(e.getButtonLabel(o)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["model-value", "disabled", "aria-label", "onUpdate:modelValue"]))), 128))
  ]);
}
const Hl = /* @__PURE__ */ F(cl, [["render", fl]]), ml = V({
  name: "CdxToggleSwitch",
  inheritAttrs: !1,
  props: {
    modelValue: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:modelValue"
  ],
  setup(e, { attrs: t, emit: n }) {
    const s = f(), a = ne("toggle-switch"), {
      rootClasses: u,
      rootStyle: l,
      otherAttrs: i
    } = pe(t), o = ie(Q(e, "modelValue"), n);
    return {
      input: s,
      inputId: a,
      rootClasses: u,
      rootStyle: l,
      otherAttrs: i,
      wrappedModel: o,
      clickInput: () => {
        s.value.click();
      }
    };
  }
});
const hl = ["for"], vl = ["id", "disabled"], bl = {
  key: 0,
  class: "cdx-toggle-switch__label-content"
}, gl = /* @__PURE__ */ h("span", { class: "cdx-toggle-switch__switch" }, [
  /* @__PURE__ */ h("span", { class: "cdx-toggle-switch__switch__grip" })
], -1);
function yl(e, t, n, s, a, u) {
  return r(), v("span", {
    class: K(["cdx-toggle-switch", e.rootClasses]),
    style: ce(e.rootStyle)
  }, [
    h("label", {
      for: e.inputId,
      class: "cdx-toggle-switch__label"
    }, [
      ue(h("input", Y({
        id: e.inputId,
        ref: "input",
        "onUpdate:modelValue": t[0] || (t[0] = (l) => e.wrappedModel = l),
        class: "cdx-toggle-switch__input",
        type: "checkbox",
        disabled: e.disabled
      }, e.otherAttrs, {
        onKeydown: t[1] || (t[1] = X(J((...l) => e.clickInput && e.clickInput(...l), ["prevent"]), ["enter"]))
      }), null, 16, vl), [
        [et, e.wrappedModel]
      ]),
      e.$slots.default ? (r(), v("span", bl, [
        w(e.$slots, "default")
      ])) : x("", !0),
      gl
    ], 8, hl)
  ], 6);
}
const jl = /* @__PURE__ */ F(ml, [["render", yl]]), Cl = V({
  name: "CdxTypeaheadSearch",
  components: {
    CdxIcon: G,
    CdxMenu: Ie,
    CdxSearchInput: jo
  },
  inheritAttrs: !1,
  props: {
    id: {
      type: String,
      required: !0
    },
    formAction: {
      type: String,
      required: !0
    },
    searchResultsLabel: {
      type: String,
      required: !0
    },
    searchResults: {
      type: Array,
      required: !0
    },
    buttonLabel: {
      type: String,
      default: ""
    },
    initialInputValue: {
      type: String,
      default: ""
    },
    searchFooterUrl: {
      type: String,
      default: ""
    },
    debounceInterval: {
      type: Number,
      default: Dt
    },
    highlightQuery: {
      type: Boolean,
      default: !1
    },
    showThumbnail: {
      type: Boolean,
      default: !1
    },
    autoExpandWidth: {
      type: Boolean,
      default: !1
    },
    visibleItemLimit: {
      type: Number,
      default: null
    }
  },
  emits: [
    "input",
    "search-result-click",
    "submit",
    "load-more"
  ],
  setup(e, { attrs: t, emit: n, slots: s }) {
    const { searchResults: a, searchFooterUrl: u, debounceInterval: l } = Bt(e), i = f(), o = f(), c = ne("typeahead-search-menu"), d = f(!1), C = f(!1), y = f(!1), M = f(!1), A = f(e.initialInputValue), N = f(""), I = p(() => {
      var _, W;
      return (W = (_ = o.value) == null ? void 0 : _.getHighlightedMenuItem()) == null ? void 0 : W.id;
    }), S = f(null), D = p(() => ({
      "cdx-typeahead-search__menu-message--has-thumbnail": e.showThumbnail
    })), R = p(
      () => e.searchResults.find(
        (_) => _.value === S.value
      )
    ), ae = p(
      () => u.value ? { value: me, url: u.value } : void 0
    ), P = p(() => ({
      "cdx-typeahead-search--show-thumbnail": e.showThumbnail,
      "cdx-typeahead-search--expanded": d.value,
      "cdx-typeahead-search--auto-expand-width": e.showThumbnail && e.autoExpandWidth
    })), {
      rootClasses: U,
      rootStyle: Z,
      otherAttrs: g
    } = pe(t, P);
    function m(_) {
      return _;
    }
    const k = p(() => ({
      visibleItemLimit: e.visibleItemLimit,
      showThumbnail: e.showThumbnail,
      boldLabel: !0,
      hideDescriptionOverflow: !0
    }));
    let q, T;
    function ee(_, W = !1) {
      R.value && R.value.label !== _ && R.value.value !== _ && (S.value = null), T !== void 0 && (clearTimeout(T), T = void 0), _ === "" ? d.value = !1 : (C.value = !0, s["search-results-pending"] && (T = setTimeout(() => {
        M.value && (d.value = !0), y.value = !0;
      }, Tt))), q !== void 0 && (clearTimeout(q), q = void 0);
      const se = () => {
        n("input", _);
      };
      W ? se() : q = setTimeout(() => {
        se();
      }, l.value);
    }
    function fe(_) {
      if (_ === me) {
        S.value = null, A.value = N.value;
        return;
      }
      S.value = _, _ !== null && (A.value = R.value ? R.value.label || String(R.value.value) : "");
    }
    function b() {
      M.value = !0, (N.value || y.value) && (d.value = !0);
    }
    function B() {
      M.value = !1, d.value = !1;
    }
    function O(_) {
      const Re = _, { id: W } = Re, se = _e(Re, ["id"]);
      if (se.value === me) {
        n("search-result-click", {
          searchResult: null,
          index: a.value.length,
          numberOfResults: a.value.length
        });
        return;
      }
      j(se);
    }
    function j(_) {
      const W = {
        searchResult: _,
        index: a.value.findIndex(
          (se) => se.value === _.value
        ),
        numberOfResults: a.value.length
      };
      n("search-result-click", W);
    }
    function be(_) {
      if (_.value === me) {
        A.value = N.value;
        return;
      }
      A.value = _.value ? _.label || String(_.value) : "";
    }
    function de(_) {
      var W;
      d.value = !1, (W = o.value) == null || W.clearActive(), O(_);
    }
    function ht(_) {
      if (R.value)
        j(R.value), _.stopPropagation(), window.location.assign(R.value.url), _.preventDefault();
      else {
        const W = {
          searchResult: null,
          index: -1,
          numberOfResults: a.value.length
        };
        n("submit", W);
      }
    }
    function vt(_) {
      if (!o.value || !N.value || _.key === " ")
        return;
      const W = o.value.getHighlightedMenuItem(), se = o.value.getHighlightedViaKeyboard();
      switch (_.key) {
        case "Enter":
          W && (W.value === me && se ? window.location.assign(u.value) : o.value.delegateKeyNavigation(_, !1)), d.value = !1;
          break;
        case "Tab":
          d.value = !1;
          break;
        default:
          o.value.delegateKeyNavigation(_);
          break;
      }
    }
    return re(() => {
      e.initialInputValue && ee(e.initialInputValue, !0);
    }), te(Q(e, "searchResults"), () => {
      N.value = A.value.trim(), M.value && C.value && N.value.length > 0 && (d.value = !0), T !== void 0 && (clearTimeout(T), T = void 0), C.value = !1, y.value = !1;
    }), {
      form: i,
      menu: o,
      menuId: c,
      highlightedId: I,
      selection: S,
      menuMessageClass: D,
      footer: ae,
      asSearchResult: m,
      inputValue: A,
      searchQuery: N,
      expanded: d,
      showPending: y,
      rootClasses: U,
      rootStyle: Z,
      otherAttrs: g,
      menuConfig: k,
      onUpdateInputValue: ee,
      onUpdateMenuSelection: fe,
      onFocus: b,
      onBlur: B,
      onSearchResultClick: O,
      onSearchResultKeyboardNavigation: be,
      onSearchFooterClick: de,
      onSubmit: ht,
      onKeydown: vt,
      MenuFooterValue: me,
      articleIcon: Wt
    };
  },
  methods: {
    focus() {
      this.$refs.searchInput.focus();
    }
  }
});
const _l = ["id", "action"], $l = { class: "cdx-typeahead-search__menu-message__text" }, Al = { class: "cdx-typeahead-search__menu-message__text" }, Il = ["href", "onClickCapture"], Bl = { class: "cdx-typeahead-search__search-footer__text" }, xl = { class: "cdx-typeahead-search__search-footer__query" };
function kl(e, t, n, s, a, u) {
  const l = $("cdx-icon"), i = $("cdx-menu"), o = $("cdx-search-input");
  return r(), v("div", {
    class: K(["cdx-typeahead-search", e.rootClasses]),
    style: ce(e.rootStyle)
  }, [
    h("form", {
      id: e.id,
      ref: "form",
      class: "cdx-typeahead-search__form",
      action: e.formAction,
      onSubmit: t[4] || (t[4] = (...c) => e.onSubmit && e.onSubmit(...c))
    }, [
      z(o, Y({
        ref: "searchInput",
        modelValue: e.inputValue,
        "onUpdate:modelValue": t[3] || (t[3] = (c) => e.inputValue = c),
        "button-label": e.buttonLabel
      }, e.otherAttrs, {
        class: "cdx-typeahead-search__input",
        name: "search",
        role: "combobox",
        autocomplete: "off",
        "aria-autocomplete": "list",
        "aria-owns": e.menuId,
        "aria-expanded": e.expanded,
        "aria-activedescendant": e.highlightedId,
        "onUpdate:modelValue": e.onUpdateInputValue,
        onFocus: e.onFocus,
        onBlur: e.onBlur,
        onKeydown: e.onKeydown
      }), {
        default: L(() => [
          z(i, Y({
            id: e.menuId,
            ref: "menu",
            expanded: e.expanded,
            "onUpdate:expanded": t[0] || (t[0] = (c) => e.expanded = c),
            "show-pending": e.showPending,
            selected: e.selection,
            "menu-items": e.searchResults,
            footer: e.footer,
            "search-query": e.highlightQuery ? e.searchQuery : "",
            "show-no-results-slot": e.searchQuery.length > 0 && e.searchResults.length === 0 && e.$slots["search-no-results-text"] && e.$slots["search-no-results-text"]().length > 0
          }, e.menuConfig, {
            "aria-label": e.searchResultsLabel,
            "onUpdate:selected": e.onUpdateMenuSelection,
            onMenuItemClick: t[1] || (t[1] = (c) => e.onSearchResultClick(e.asSearchResult(c))),
            onMenuItemKeyboardNavigation: e.onSearchResultKeyboardNavigation,
            onLoadMore: t[2] || (t[2] = (c) => e.$emit("load-more"))
          }), {
            pending: L(() => [
              h("div", {
                class: K(["cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                h("span", $l, [
                  w(e.$slots, "search-results-pending")
                ])
              ], 2)
            ]),
            "no-results": L(() => [
              h("div", {
                class: K(["cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                h("span", Al, [
                  w(e.$slots, "search-no-results-text")
                ])
              ], 2)
            ]),
            default: L(({ menuItem: c, active: d }) => [
              c.value === e.MenuFooterValue ? (r(), v("a", {
                key: 0,
                class: K(["cdx-typeahead-search__search-footer", {
                  "cdx-typeahead-search__search-footer__active": d
                }]),
                href: e.asSearchResult(c).url,
                onClickCapture: J((C) => e.onSearchFooterClick(e.asSearchResult(c)), ["stop"])
              }, [
                z(l, {
                  class: "cdx-typeahead-search__search-footer__icon",
                  icon: e.articleIcon
                }, null, 8, ["icon"]),
                h("span", Bl, [
                  w(e.$slots, "search-footer-text", { searchQuery: e.searchQuery }, () => [
                    h("strong", xl, H(e.searchQuery), 1)
                  ])
                ])
              ], 42, Il)) : x("", !0)
            ]),
            _: 3
          }, 16, ["id", "expanded", "show-pending", "selected", "menu-items", "footer", "search-query", "show-no-results-slot", "aria-label", "onUpdate:selected", "onMenuItemKeyboardNavigation"])
        ]),
        _: 3
      }, 16, ["modelValue", "button-label", "aria-owns", "aria-expanded", "aria-activedescendant", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
      w(e.$slots, "default")
    ], 40, _l)
  ], 6);
}
const Ul = /* @__PURE__ */ F(Cl, [["render", kl]]);
export {
  ve as CdxButton,
  Ml as CdxButtonGroup,
  Dl as CdxCard,
  Tl as CdxCheckbox,
  Vl as CdxCombobox,
  Fl as CdxDialog,
  G as CdxIcon,
  El as CdxInfoChip,
  Kl as CdxLookup,
  Ie as CdxMenu,
  eo as CdxMenuItem,
  Nl as CdxMessage,
  so as CdxProgressBar,
  Rl as CdxRadio,
  jo as CdxSearchInput,
  Un as CdxSearchResultTitle,
  Ol as CdxSelect,
  ql as CdxTab,
  zl as CdxTabs,
  Le as CdxTextInput,
  pt as CdxThumbnail,
  rl as CdxToggleButton,
  Hl as CdxToggleButtonGroup,
  jl as CdxToggleSwitch,
  Ul as CdxTypeaheadSearch,
  Ll as stringHelpers,
  rt as useComputedDirection,
  tn as useComputedLanguage,
  ne as useGeneratedId,
  Me as useIntersectionObserver,
  ie as useModelWrapper,
  Ve as useResizeObserver,
  pe as useSplitAttributes
};
