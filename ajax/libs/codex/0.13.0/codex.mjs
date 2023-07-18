var gt = Object.defineProperty, yt = Object.defineProperties;
var $t = Object.getOwnPropertyDescriptors;
var Ce = Object.getOwnPropertySymbols;
var je = Object.prototype.hasOwnProperty, Ue = Object.prototype.propertyIsEnumerable;
var qe = (e, t, n) => t in e ? gt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, We = (e, t) => {
  for (var n in t || (t = {}))
    je.call(t, n) && qe(e, n, t[n]);
  if (Ce)
    for (var n of Ce(t))
      Ue.call(t, n) && qe(e, n, t[n]);
  return e;
}, Pe = (e, t) => yt(e, $t(t));
var me = (e, t) => {
  var n = {};
  for (var s in e)
    je.call(e, s) && t.indexOf(s) < 0 && (n[s] = e[s]);
  if (e != null && Ce)
    for (var s of Ce(e))
      t.indexOf(s) < 0 && Ue.call(e, s) && (n[s] = e[s]);
  return n;
};
var Ae = (e, t, n) => new Promise((s, l) => {
  var d = (o) => {
    try {
      i(n.next(o));
    } catch (r) {
      l(r);
    }
  }, a = (o) => {
    try {
      i(n.throw(o));
    } catch (r) {
      l(r);
    }
  }, i = (o) => o.done ? s(o.value) : Promise.resolve(o.value).then(d, a);
  i((n = n.apply(e, t)).next());
});
import { ref as f, onMounted as fe, defineComponent as E, computed as c, openBlock as u, createElementBlock as m, normalizeClass as L, toDisplayString as H, createCommentVNode as I, Comment as _t, warn as It, withKeys as ne, renderSlot as w, resolveComponent as x, Fragment as ge, renderList as we, createBlock as T, withCtx as V, createTextVNode as ae, createVNode as q, Transition as Ke, normalizeStyle as le, resolveDynamicComponent as xe, createElementVNode as h, getCurrentInstance as Ct, inject as pe, toRef as K, withDirectives as ce, withModifiers as te, vModelCheckbox as et, onUnmounted as Ee, watch as oe, nextTick as _e, mergeProps as Z, vShow as Se, vModelDynamic as St, useCssVars as Fe, toRefs as wt, provide as be, vModelRadio as xt, vModelText as kt } from "vue";
function ee(e) {
  return (t) => typeof t == "string" && e.indexOf(t) !== -1;
}
const Te = "cdx", Mt = [
  "default",
  "progressive",
  "destructive"
], Bt = [
  "normal",
  "primary",
  "quiet"
], At = [
  "medium",
  "large"
], Tt = [
  "x-small",
  "small",
  "medium"
], Vt = [
  "notice",
  "warning",
  "error",
  "success"
], tt = ee(Vt), Lt = [
  "text",
  "search",
  "number",
  "email",
  "month",
  "password",
  "tel",
  "url",
  "week",
  "date",
  "datetime-local",
  "time"
], he = [
  "default",
  "error"
], Dt = 120, Kt = 500, ve = "cdx-menu-footer-item", nt = Symbol("CdxTabs"), ot = Symbol("CdxActiveTab"), at = Symbol("CdxId"), ke = Symbol("CdxDescriptionId"), lt = Symbol("CdxStatus"), st = Symbol("CdxDisabled"), Et = '<path d="M11.53 2.3A1.85 1.85 0 0010 1.21 1.85 1.85 0 008.48 2.3L.36 16.36C-.48 17.81.21 19 1.88 19h16.24c1.67 0 2.36-1.19 1.52-2.64zM11 16H9v-2h2zm0-4H9V6h2z"/>', Ft = '<path d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"/><circle cx="10" cy="10" r="3"/>', Rt = '<path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"/>', zt = '<path d="m4.34 2.93 12.73 12.73-1.41 1.41L2.93 4.35z"/><path d="M17.07 4.34 4.34 17.07l-1.41-1.41L15.66 2.93z"/>', Nt = '<path d="M13.728 1H6.272L1 6.272v7.456L6.272 19h7.456L19 13.728V6.272zM11 15H9v-2h2zm0-4H9V5h2z"/>', Ot = '<path d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"/>', Ht = '<path d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"/><path d="M19 5H1V3h18zm0 12H1v-2h18z"/>', qt = '<path d="M8 19a1 1 0 001 1h2a1 1 0 001-1v-1H8zm9-12a7 7 0 10-12 4.9S7 14 7 15v1a1 1 0 001 1h4a1 1 0 001-1v-1c0-1 2-3.1 2-3.1A7 7 0 0017 7z"/>', jt = '<path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM9 5h2v2H9zm0 4h2v6H9z"/>', Ut = '<path d="M7 1 5.6 2.5 13 10l-7.4 7.5L7 19l9-9z"/>', Wt = '<path d="m4 10 9 9 1.4-1.5L7 10l7.4-7.5L13 1z"/>', Pt = '<path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"/>', Qt = '<path d="M10 20a10 10 0 010-20 10 10 0 110 20Zm-2-5 9-8.5L15.5 5 8 12 4.5 8.5 3 10l5 5Z"/>', it = Et, Gt = Ft, Zt = Rt, dt = zt, ut = Nt, rt = Ot, Jt = Ht, Xt = {
  langCodeMap: {
    ar: qt
  },
  default: jt
}, Yt = {
  ltr: Ut,
  shouldFlip: !0
}, en = {
  ltr: Wt,
  shouldFlip: !0
}, tn = Pt, ct = Qt;
function nn(e, t, n) {
  if (typeof e == "string" || "path" in e)
    return e;
  if ("shouldFlip" in e)
    return e.ltr;
  if ("rtl" in e)
    return n === "rtl" ? e.rtl : e.ltr;
  const s = t in e.langCodeMap ? e.langCodeMap[t] : e.default;
  return typeof s == "string" || "path" in s ? s : s.ltr;
}
function on(e, t) {
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
function pt(e) {
  const t = f(null);
  return fe(() => {
    const n = window.getComputedStyle(e.value).direction;
    t.value = n === "ltr" || n === "rtl" ? n : null;
  }), t;
}
function an(e) {
  const t = f("");
  return fe(() => {
    let n = e.value;
    for (; n && n.lang === ""; )
      n = n.parentElement;
    t.value = n ? n.lang : null;
  }), t;
}
const ln = ee(Tt), sn = E({
  name: "CdxIcon",
  props: {
    /** The SVG path or an object containing that path plus other data. */
    icon: {
      type: [String, Object],
      required: !0
    },
    /**
     * Accessible label for the icon. If not included, the icon will be hidden from screen
     * readers via `aria-hidden="true"`. Browsers also display this label as a tooltip when the
     * user hovers over the icon. Note that this label is not rendered as visible text next
     * to the icon.
     */
    iconLabel: {
      type: String,
      default: ""
    },
    /**
     * Explicitly set the language code to use for the icon. See
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/lang.
     * Defaults to the lang attribute of the nearest ancestor at mount time.
     */
    lang: {
      type: String,
      default: null
    },
    /**
     * Explicitly set the direction to use for the icon. See
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dir.
     * Defaults to the computed direction at mount time.
     */
    dir: {
      type: String,
      default: null
    },
    /**
     * Specify icon size by choosing one of several pre-defined size
     * options. See the type documentation for supported size options.
     * The `medium` size is used by default if no size prop is provided.
     */
    size: {
      type: String,
      default: "medium",
      validator: ln
    }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = f(), s = pt(n), l = an(n), d = c(() => e.dir || s.value), a = c(() => e.lang || l.value), i = c(() => ({
      "cdx-icon--flipped": d.value === "rtl" && a.value !== null && on(e.icon, a.value),
      [`cdx-icon--${e.size}`]: !0
    })), o = c(
      () => nn(e.icon, a.value || "", d.value || "ltr")
    ), r = c(() => typeof o.value == "string" ? o.value : ""), p = c(() => typeof o.value != "string" ? o.value.path : "");
    return {
      rootElement: n,
      rootClasses: i,
      iconSvg: r,
      iconPath: p,
      onClick: (C) => {
        t("click", C);
      }
    };
  }
});
const F = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, l] of t)
    n[s] = l;
  return n;
}, dn = ["aria-hidden"], un = { key: 0 }, rn = ["innerHTML"], cn = ["d"];
function pn(e, t, n, s, l, d) {
  return u(), m("span", {
    ref: "rootElement",
    class: L(["cdx-icon", e.rootClasses]),
    onClick: t[0] || (t[0] = (...a) => e.onClick && e.onClick(...a))
  }, [
    (u(), m("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      "aria-hidden": e.iconLabel ? void 0 : !0
    }, [
      e.iconLabel ? (u(), m("title", un, H(e.iconLabel), 1)) : I("", !0),
      e.iconSvg ? (u(), m("g", {
        key: 1,
        innerHTML: e.iconSvg
      }, null, 8, rn)) : (u(), m("path", {
        key: 2,
        d: e.iconPath
      }, null, 8, cn))
    ], 8, dn))
  ], 2);
}
const J = /* @__PURE__ */ F(sn, [["render", pn]]), fn = ee(Mt), mn = ee(Bt), hn = ee(At), vn = (e) => {
  !e["aria-label"] && !e["aria-hidden"] && It(`icon-only buttons require one of the following attribute: aria-label or aria-hidden.
		See documentation on https://doc.wikimedia.org/codex/latest/components/demos/button.html#icon-only-button-1`);
};
function Le(e) {
  const t = [];
  for (const n of e)
    typeof n == "string" && n.trim() !== "" ? t.push(n) : Array.isArray(n) ? t.push(...Le(n)) : typeof n == "object" && n && (// HTML tag
    typeof n.type == "string" || // Component
    typeof n.type == "object" ? t.push(n) : n.type !== _t && (typeof n.children == "string" && n.children.trim() !== "" ? t.push(n.children) : Array.isArray(n.children) && t.push(...Le(n.children))));
  return t;
}
const bn = (e, t) => {
  if (!e)
    return !1;
  const n = Le(e);
  if (n.length !== 1)
    return !1;
  const s = n[0], l = typeof s == "object" && typeof s.type == "object" && "name" in s.type && s.type.name === J.name, d = typeof s == "object" && s.type === "svg";
  return l || d ? (vn(t), !0) : !1;
}, gn = E({
  name: "CdxButton",
  props: {
    /**
     * The kind of action that will be taken on click.
     *
     * @values 'default', 'progressive', 'destructive'
     */
    action: {
      type: String,
      default: "default",
      validator: fn
    },
    /**
     * Visual prominence of the button.
     *
     * @values 'normal', 'primary', 'quiet'
     */
    weight: {
      type: String,
      default: "normal",
      validator: mn
    },
    /**
     * Button size.
     *
     * Most buttons should use the default medium size. In rare cases the large size should
     * be used, for example to make icon-only buttons larger on touchscreens.
     *
     * @values 'medium', 'large'
     */
    size: {
      type: String,
      default: "medium",
      validator: hn
    }
  },
  emits: ["click"],
  setup(e, { emit: t, slots: n, attrs: s }) {
    const l = f(!1);
    return {
      rootClasses: c(() => {
        var o;
        return {
          [`cdx-button--action-${e.action}`]: !0,
          [`cdx-button--weight-${e.weight}`]: !0,
          [`cdx-button--size-${e.size}`]: !0,
          "cdx-button--framed": e.weight !== "quiet",
          "cdx-button--icon-only": bn((o = n.default) == null ? void 0 : o.call(n), s),
          "cdx-button--is-active": l.value
        };
      }),
      onClick: (o) => {
        t("click", o);
      },
      setActive: (o) => {
        l.value = o;
      }
    };
  }
});
function yn(e, t, n, s, l, d) {
  return u(), m("button", {
    class: L(["cdx-button", e.rootClasses]),
    onClick: t[0] || (t[0] = (...a) => e.onClick && e.onClick(...a)),
    onKeydown: t[1] || (t[1] = ne((a) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = ne((a) => e.setActive(!1), ["space", "enter"]))
  }, [
    w(e.$slots, "default")
  ], 34);
}
const ye = /* @__PURE__ */ F(gn, [["render", yn]]);
function ft(e) {
  return e.label === void 0 ? e.value : e.label === null ? "" : e.label;
}
const $n = E({
  name: "CdxButtonGroup",
  components: {
    CdxButton: ye,
    CdxIcon: J
  },
  props: {
    /**
     * Objects describing the buttons in the group. See the ButtonGroupItem type.
     */
    buttons: {
      type: Array,
      required: !0,
      validator: (e) => Array.isArray(e) && e.length >= 1
    },
    /**
     * Whether the entire group is disabled.
     *
     * If this is set to true, all buttons in the group are disabled. Buttons can also be
     * disabled individually by setting their `disabled` property to true.
     */
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    /**
     * Emitted when a button is clicked
     *
     * @property {string | number} value The `value` property of the button that was clicked
     */
    "click"
  ],
  setup() {
    return {
      getButtonLabel: ft
    };
  }
});
const _n = { class: "cdx-button-group" };
function In(e, t, n, s, l, d) {
  const a = x("cdx-icon"), i = x("cdx-button");
  return u(), m("div", _n, [
    (u(!0), m(ge, null, we(e.buttons, (o) => (u(), T(i, {
      key: o.value,
      disabled: o.disabled || e.disabled,
      "aria-label": o.ariaLabel,
      onClick: (r) => e.$emit("click", o.value)
    }, {
      default: V(() => [
        w(e.$slots, "default", { button: o }, () => [
          o.icon ? (u(), T(a, {
            key: 0,
            icon: o.icon
          }, null, 8, ["icon"])) : I("", !0),
          ae(" " + H(e.getButtonLabel(o)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["disabled", "aria-label", "onClick"]))), 128))
  ]);
}
const Ja = /* @__PURE__ */ F($n, [["render", In]]), Cn = E({
  name: "CdxThumbnail",
  components: { CdxIcon: J },
  props: {
    /**
     * Thumbnail data.
     */
    thumbnail: {
      type: [Object, null],
      default: null
    },
    /**
     * Thumbnail placeholder icon.
     */
    placeholderIcon: {
      type: [String, Object],
      default: Jt
    }
  },
  setup: (e) => {
    const t = f(!1), n = f({}), s = (l) => {
      const d = l.replace(/([\\"\n])/g, "\\$1"), a = new Image();
      a.onload = () => {
        n.value = { backgroundImage: `url("${d}")` }, t.value = !0;
      }, a.onerror = () => {
        t.value = !1;
      }, a.src = d;
    };
    return fe(() => {
      var l;
      (l = e.thumbnail) != null && l.url && s(e.thumbnail.url);
    }), {
      thumbnailStyle: n,
      thumbnailLoaded: t
    };
  }
});
const Sn = { class: "cdx-thumbnail" }, wn = {
  key: 0,
  class: "cdx-thumbnail__placeholder"
};
function xn(e, t, n, s, l, d) {
  const a = x("cdx-icon");
  return u(), m("span", Sn, [
    e.thumbnailLoaded ? I("", !0) : (u(), m("span", wn, [
      q(a, {
        icon: e.placeholderIcon,
        class: "cdx-thumbnail__placeholder__icon--vue"
      }, null, 8, ["icon"])
    ])),
    q(Ke, { name: "cdx-thumbnail__image" }, {
      default: V(() => [
        e.thumbnailLoaded ? (u(), m("span", {
          key: 0,
          style: le(e.thumbnailStyle),
          class: "cdx-thumbnail__image"
        }, null, 4)) : I("", !0)
      ]),
      _: 1
    })
  ]);
}
const mt = /* @__PURE__ */ F(Cn, [["render", xn]]), kn = E({
  name: "CdxCard",
  components: { CdxIcon: J, CdxThumbnail: mt },
  props: {
    /**
     * If provided, the Card will be a link to this URL.
     */
    url: {
      type: String,
      default: ""
    },
    /**
     * Icon displayed at the start of the Card.
     */
    icon: {
      type: [String, Object],
      default: ""
    },
    /**
     * Thumbnail image data for the Card.
     */
    thumbnail: {
      type: [Object, null],
      default: null
    },
    /**
     * Option to force a thumbnail layout.
     *
     * When set to `true`, the Card will display a Thumbnail. If a `thumbnail` prop was also
     * provided, the thumbnail image will display. Otherwise, a placeholder icon will display.
     *
     * This is useful when displaying groups of Cards when some of the cards have thumbnail
     * images but some do not. `forceThumbnail` will provide a consistent layout for that group.
     *
     * Note that this prop is not needed to display a thumbnail image: if the `thumbnail` prop
     * is provided, it will display. This prop is only needed to enable the display of the
     * thumbnail placeholder icon when the `thumbnail` prop is not provided.
     */
    forceThumbnail: {
      type: Boolean,
      default: !1
    },
    /**
     * Optional custom icon for the placeholder shown when `forceThumbnail` is true but no
     * thumbnail is provided.
     *
     * Defaults to the default placeholder icon set in the Thumbnail component.
     */
    customPlaceholderIcon: {
      type: [String, Object],
      default: void 0
    }
  },
  setup(e) {
    const t = c(() => !!e.url), n = c(() => t.value ? "a" : "span"), s = c(() => t.value ? e.url : void 0);
    return {
      isLink: t,
      contentTag: n,
      cardLink: s
    };
  }
});
const Mn = { class: "cdx-card__text" }, Bn = { class: "cdx-card__text__title" }, An = {
  key: 0,
  class: "cdx-card__text__description"
}, Tn = {
  key: 1,
  class: "cdx-card__text__supporting-text"
};
function Vn(e, t, n, s, l, d) {
  const a = x("cdx-thumbnail"), i = x("cdx-icon");
  return u(), T(xe(e.contentTag), {
    href: e.cardLink,
    class: L(["cdx-card", {
      "cdx-card--is-link": e.isLink,
      // Include dynamic classes in the template so that $slots is reactive.
      "cdx-card--title-only": !e.$slots.description && !e.$slots["supporting-text"]
    }])
  }, {
    default: V(() => [
      e.thumbnail || e.forceThumbnail ? (u(), T(a, {
        key: 0,
        thumbnail: e.thumbnail,
        "placeholder-icon": e.customPlaceholderIcon,
        class: "cdx-card__thumbnail"
      }, null, 8, ["thumbnail", "placeholder-icon"])) : e.icon ? (u(), T(i, {
        key: 1,
        icon: e.icon,
        class: "cdx-card__icon"
      }, null, 8, ["icon"])) : I("", !0),
      h("span", Mn, [
        h("span", Bn, [
          w(e.$slots, "title")
        ]),
        e.$slots.description ? (u(), m("span", An, [
          w(e.$slots, "description")
        ])) : I("", !0),
        e.$slots["supporting-text"] ? (u(), m("span", Tn, [
          w(e.$slots, "supporting-text")
        ])) : I("", !0)
      ])
    ]),
    _: 3
  }, 8, ["href", "class"]);
}
const Xa = /* @__PURE__ */ F(kn, [["render", Vn]]);
function se(e, t, n) {
  return c({
    get: () => e.value,
    set: (s) => (
      // If eventName is undefined, then 'update:modelValue' must be a valid EventName,
      // but TypeScript's type analysis isn't clever enough to realize that
      t(n || "update:modelValue", s)
    )
  });
}
let Ve = 0;
function Y(e) {
  const t = Ct(), n = (t == null ? void 0 : t.props.id) || (t == null ? void 0 : t.attrs.id);
  return e ? `${Te}-${e}-${Ve++}` : n ? `${Te}-${n}-${Ve++}` : `${Te}-${Ve++}`;
}
function ht(e) {
  const t = pe(st, f(!1));
  return c(() => t.value || e.value);
}
function ie(e, t, n) {
  const s = ht(e), l = pe(lt, f("default")), d = c(() => t != null && t.value && t.value !== "default" ? t.value : l.value), a = pe(at, void 0), i = c(() => a || n);
  return {
    computedDisabled: s,
    computedStatus: d,
    computedInputId: i
  };
}
const Ln = E({
  name: "CdxCheckbox",
  props: {
    /**
     * Value of the checkbox or checkbox group.
     *
     * Provided by `v-model` binding in the parent component.
     */
    modelValue: {
      type: [Boolean, Array],
      default: !1
    },
    /**
     * HTML "value" attribute to assign to the input.
     *
     * Required for input groups.
     */
    inputValue: {
      type: [String, Number, Boolean],
      default: !1
    },
    /**
     * Whether the disabled attribute should be added to the input.
     */
    disabled: {
      type: Boolean,
      default: !1
    },
    /**
     * Whether the indeterminate visual state should be displayed.
     *
     * This is unrelated to the value provided by `v-model`, and the indeterminate visual state
     * will override the checked or unchecked visual state.
     */
    indeterminate: {
      type: Boolean,
      default: !1
    },
    /**
     * Whether the component should display inline.
     *
     * By default, `display: block` is set and a margin exists between
     * sibling components, for a stacked layout.
     */
    inline: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    /**
     * Emitted when modelValue changes.
     *
     * @property {boolean | string[] | number[]} modelValue The new model value
     */
    "update:modelValue"
  ],
  setup(e, { emit: t }) {
    const n = c(() => ({
      "cdx-checkbox--inline": e.inline
    })), { computedDisabled: s } = ie(K(e, "disabled")), l = f(), d = Y("checkbox"), a = () => {
      l.value.click();
    }, i = se(K(e, "modelValue"), t);
    return {
      rootClasses: n,
      computedDisabled: s,
      input: l,
      checkboxId: d,
      clickInput: a,
      wrappedModel: i
    };
  }
});
const Dn = ["id", "value", "disabled", ".indeterminate"], Kn = /* @__PURE__ */ h("span", { class: "cdx-checkbox__icon" }, null, -1), En = ["for"];
function Fn(e, t, n, s, l, d) {
  return u(), m("span", {
    class: L(["cdx-checkbox", e.rootClasses])
  }, [
    ce(h("input", {
      id: e.checkboxId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (a) => e.wrappedModel = a),
      class: "cdx-checkbox__input",
      type: "checkbox",
      value: e.inputValue,
      disabled: e.computedDisabled,
      ".indeterminate": e.indeterminate,
      onKeydown: t[1] || (t[1] = ne(te((...a) => e.clickInput && e.clickInput(...a), ["prevent"]), ["enter"]))
    }, null, 40, Dn), [
      [et, e.wrappedModel]
    ]),
    Kn,
    h("label", {
      class: "cdx-checkbox__label",
      for: e.checkboxId
    }, [
      w(e.$slots, "default")
    ], 8, En)
  ], 2);
}
const Ya = /* @__PURE__ */ F(Ln, [["render", Fn]]), Rn = {
  error: ut,
  warning: it,
  success: ct
}, zn = E({
  name: "CdxInfoChip",
  components: { CdxIcon: J },
  props: {
    /**
     * Status type.
     *
     * @values 'notice', 'warning', 'error', 'success'
     */
    status: {
      type: String,
      default: "notice",
      validator: tt
    },
    /**
     * Custom icon to use for "notice" chips. Chips with other status types
     * (warning, etc) do not allow custom icons and will ignore this option.
     */
    icon: {
      type: [String, Object],
      default: null
    }
  },
  setup(e) {
    const t = c(() => ({
      [`cdx-info-chip__icon--${e.status}`]: !0
    })), n = c(
      () => e.status === "notice" ? e.icon : Rn[e.status]
    );
    return {
      iconClass: t,
      computedIcon: n
    };
  }
});
const Nn = { class: "cdx-info-chip" }, On = { class: "cdx-info-chip--text" };
function Hn(e, t, n, s, l, d) {
  const a = x("cdx-icon");
  return u(), m("div", Nn, [
    e.computedIcon ? (u(), T(a, {
      key: 0,
      class: L(["cdx-info-chip__icon", e.iconClass]),
      icon: e.computedIcon
    }, null, 8, ["class", "icon"])) : I("", !0),
    h("span", On, [
      w(e.$slots, "default")
    ])
  ]);
}
const el = /* @__PURE__ */ F(zn, [["render", Hn]]);
function vt(e) {
  return e.replace(/([\\{}()|.?*+\-^$[\]])/g, "\\$1");
}
const qn = "[̀-ͯ҃-҉֑-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣঁ-ঃ়া-ৄেৈো-্ৗৢৣ৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑੰੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣஂா-ூெ-ைொ-்ௗఀ-ఄా-ౄె-ైొ-్ౕౖౢౣಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣංඃ්ා-ුූෘ-ෟෲෳัิ-ฺ็-๎ັິ-ູົຼ່-ໍ༹༘༙༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏႚ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝᠋-᠍ᢅᢆᢩᤠ-ᤫᤰ-᤻ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼᪰-᪾ᬀ-ᬄ᬴-᭄᭫-᭳ᮀ-ᮂᮡ-ᮭ᯦-᯳ᰤ-᰷᳐-᳔᳒-᳨᳭ᳲ-᳴᳷-᳹᷀-᷹᷻-᷿⃐-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯-꙲ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣠-꣱ꣿꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀ꧥꨩ-ꨶꩃꩌꩍꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭ﬞ︀-️︠-︯]";
function bt(e, t) {
  if (!e)
    return [t, "", ""];
  const n = vt(e), s = new RegExp(
    // Per https://www.regular-expressions.info/unicode.html, "any code point that is not a
    // combining mark can be followed by any number of combining marks." See also the
    // discussion in https://phabricator.wikimedia.org/T35242.
    n + qn + "*",
    "i"
  ).exec(t);
  if (!s || s.index === void 0)
    return [t, "", ""];
  const l = s.index, d = l + s[0].length, a = t.slice(l, d), i = t.slice(0, l), o = t.slice(d, t.length);
  return [i, a, o];
}
const tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  regExpEscape: vt,
  splitStringAtMatch: bt
}, Symbol.toStringTag, { value: "Module" })), jn = E({
  name: "CdxSearchResultTitle",
  props: {
    /**
     * Title text.
     */
    title: {
      type: String,
      required: !0
    },
    /**
     * The current search query.
     */
    searchQuery: {
      type: String,
      default: ""
    }
  },
  setup: (e) => ({
    titleChunks: c(() => bt(e.searchQuery, String(e.title)))
  })
});
const Un = { class: "cdx-search-result-title" }, Wn = { class: "cdx-search-result-title__match" };
function Pn(e, t, n, s, l, d) {
  return u(), m("span", Un, [
    h("bdi", null, [
      ae(H(e.titleChunks[0]), 1),
      h("span", Wn, H(e.titleChunks[1]), 1),
      ae(H(e.titleChunks[2]), 1)
    ])
  ]);
}
const Qn = /* @__PURE__ */ F(jn, [["render", Pn]]), Gn = E({
  name: "CdxMenuItem",
  components: { CdxIcon: J, CdxThumbnail: mt, CdxSearchResultTitle: Qn },
  props: {
    /**
     * ID for HTML `id` attribute.
     */
    id: {
      type: String,
      required: !0
    },
    /**
     * The value provided to the parent menu component when this menu item is selected.
     */
    value: {
      type: [String, Number],
      required: !0
    },
    /**
     * Whether the menu item is disabled.
     */
    disabled: {
      type: Boolean,
      default: !1
    },
    /**
     * Whether this menu item is selected.
     */
    selected: {
      type: Boolean,
      default: !1
    },
    /**
     * Whether this menu item is being pressed.
     */
    active: {
      type: Boolean,
      default: !1
    },
    /**
     * Whether this menu item is visually highlighted due to hover or keyboard navigation.
     */
    highlighted: {
      type: Boolean,
      default: !1
    },
    /**
     * Label for the menu item. If this isn't provided, the value will be displayed instead.
     */
    label: {
      type: String,
      default: ""
    },
    /**
     * Text that matches current search query. Only used for search results and will be
     * displayed after the label.
     */
    match: {
      type: String,
      default: ""
    },
    /**
     * Text that supports the label. Supporting text will appear next to the label in a more
     * subtle color.
     */
    supportingText: {
      type: String,
      default: ""
    },
    /**
     * URL for the menu item. If provided, the content of the menu item will be wrapped in an
     * anchor tag.
     */
    url: {
      type: String,
      default: ""
    },
    /**
     * Icon for the menu item.
     */
    icon: {
      type: [String, Object],
      default: ""
    },
    /**
     * Whether a thumbnail (or a placeholder icon) should be displayed.
     */
    showThumbnail: {
      type: Boolean,
      default: !1
    },
    /**
     * Thumbnail for the menu item.
     */
    thumbnail: {
      type: [Object, null],
      default: null
    },
    /**
     * Description of the menu item.
     */
    description: {
      type: [String, null],
      default: ""
    },
    /**
     * The search query to be highlighted within the menu item's title.
     */
    searchQuery: {
      type: String,
      default: ""
    },
    /**
     * Whether to bold menu item labels.
     */
    boldLabel: {
      type: Boolean,
      default: !1
    },
    /**
     * Whether to hide description text overflow via an ellipsis.
     */
    hideDescriptionOverflow: {
      type: Boolean,
      default: !1
    },
    /**
     * Optional language codes for label, match, supporting text, and description.
     *
     * If included, that language code will be added as a `lang` attribute to the element
     * wrapping that text node.
     */
    language: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    /**
     * Emitted when the menu item becomes selected, active or highlighted in response to
     * user interaction. Handled in the Menu component.
     *
     * @property {MenuState} menuState State to change
     * @property {boolean} setState Whether to set that state to this menu item
     */
    "change"
  ],
  setup: (e, { emit: t }) => {
    const n = () => {
      e.highlighted || t("change", "highlighted", !0);
    }, s = () => {
      t("change", "highlighted", !1);
    }, l = (p) => {
      p.button === 0 && t("change", "active", !0);
    }, d = () => {
      t("change", "selected", !0);
    }, a = c(() => e.searchQuery.length > 0), i = c(() => ({
      "cdx-menu-item--selected": e.selected,
      // Only show the active visual state when the menu item is both active and
      // highlighted. This means, on mousedown -> mouseleave, the menu item is still
      // technically tracked by the menu as active, but will not appear active to the
      // user. This also means in the case of mousedown -> mouseleave -> mouseenter, the
      // menu item will appear active again, and on click (releasing the mouse button),
      // the item will be selected.
      "cdx-menu-item--active": e.active && e.highlighted,
      "cdx-menu-item--highlighted": e.highlighted,
      "cdx-menu-item--enabled": !e.disabled,
      "cdx-menu-item--disabled": e.disabled,
      "cdx-menu-item--highlight-query": a.value,
      "cdx-menu-item--bold-label": e.boldLabel,
      "cdx-menu-item--has-description": !!e.description,
      "cdx-menu-item--hide-description-overflow": e.hideDescriptionOverflow
    })), o = c(() => e.url ? "a" : "span"), r = c(() => e.label || String(e.value));
    return {
      onMouseMove: n,
      onMouseLeave: s,
      onMouseDown: l,
      onClick: d,
      highlightQuery: a,
      rootClasses: i,
      contentTag: o,
      title: r
    };
  }
});
const Zn = ["id", "aria-disabled", "aria-selected"], Jn = { class: "cdx-menu-item__text" }, Xn = ["lang"], Yn = ["lang"], eo = ["lang"], to = ["lang"];
function no(e, t, n, s, l, d) {
  const a = x("cdx-thumbnail"), i = x("cdx-icon"), o = x("cdx-search-result-title");
  return u(), m("li", {
    id: e.id,
    role: "option",
    class: L(["cdx-menu-item", e.rootClasses]),
    "aria-disabled": e.disabled,
    "aria-selected": e.selected,
    onMousemove: t[0] || (t[0] = (...r) => e.onMouseMove && e.onMouseMove(...r)),
    onMouseleave: t[1] || (t[1] = (...r) => e.onMouseLeave && e.onMouseLeave(...r)),
    onMousedown: t[2] || (t[2] = te((...r) => e.onMouseDown && e.onMouseDown(...r), ["prevent"])),
    onClick: t[3] || (t[3] = (...r) => e.onClick && e.onClick(...r))
  }, [
    w(e.$slots, "default", {}, () => [
      (u(), T(xe(e.contentTag), {
        href: e.url ? e.url : void 0,
        class: "cdx-menu-item__content"
      }, {
        default: V(() => {
          var r, p, y, C, $, D;
          return [
            e.showThumbnail ? (u(), T(a, {
              key: 0,
              thumbnail: e.thumbnail,
              class: "cdx-menu-item__thumbnail"
            }, null, 8, ["thumbnail"])) : e.icon ? (u(), T(i, {
              key: 1,
              icon: e.icon,
              class: "cdx-menu-item__icon"
            }, null, 8, ["icon"])) : I("", !0),
            h("span", Jn, [
              e.highlightQuery ? (u(), T(o, {
                key: 0,
                title: e.title,
                "search-query": e.searchQuery,
                lang: (r = e.language) == null ? void 0 : r.label
              }, null, 8, ["title", "search-query", "lang"])) : (u(), m("span", {
                key: 1,
                class: "cdx-menu-item__text__label",
                lang: (p = e.language) == null ? void 0 : p.label
              }, [
                h("bdi", null, H(e.title), 1)
              ], 8, Xn)),
              e.match ? (u(), m(ge, { key: 2 }, [
                ae(H(" ") + " "),
                e.highlightQuery ? (u(), T(o, {
                  key: 0,
                  title: e.match,
                  "search-query": e.searchQuery,
                  lang: (y = e.language) == null ? void 0 : y.match
                }, null, 8, ["title", "search-query", "lang"])) : (u(), m("span", {
                  key: 1,
                  class: "cdx-menu-item__text__match",
                  lang: (C = e.language) == null ? void 0 : C.match
                }, [
                  h("bdi", null, H(e.match), 1)
                ], 8, Yn))
              ], 64)) : I("", !0),
              e.supportingText ? (u(), m(ge, { key: 3 }, [
                ae(H(" ") + " "),
                h("span", {
                  class: "cdx-menu-item__text__supporting-text",
                  lang: ($ = e.language) == null ? void 0 : $.supportingText
                }, [
                  h("bdi", null, H(e.supportingText), 1)
                ], 8, eo)
              ], 64)) : I("", !0),
              e.description ? (u(), m("span", {
                key: 4,
                class: "cdx-menu-item__text__description",
                lang: (D = e.language) == null ? void 0 : D.description
              }, [
                h("bdi", null, H(e.description), 1)
              ], 8, to)) : I("", !0)
            ])
          ];
        }),
        _: 1
      }, 8, ["href"]))
    ])
  ], 42, Zn);
}
const oo = /* @__PURE__ */ F(Gn, [["render", no]]), ao = E({
  name: "CdxProgressBar",
  props: {
    /**
     * Whether this is the smaller, inline variant.
     */
    inline: {
      type: Boolean,
      default: !1
    },
    /**
     * Whether the progress bar is disabled.
     */
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return {
      rootClasses: c(() => ({
        "cdx-progress-bar--block": !e.inline,
        "cdx-progress-bar--inline": e.inline,
        "cdx-progress-bar--enabled": !e.disabled,
        "cdx-progress-bar--disabled": e.disabled
      }))
    };
  }
});
const lo = ["aria-disabled"], so = /* @__PURE__ */ h("div", { class: "cdx-progress-bar__bar" }, null, -1), io = [
  so
];
function uo(e, t, n, s, l, d) {
  return u(), m("div", {
    class: L(["cdx-progress-bar", e.rootClasses]),
    role: "progressbar",
    "aria-disabled": e.disabled,
    "aria-valuemin": "0",
    "aria-valuemax": "100"
  }, io, 10, lo);
}
const ro = /* @__PURE__ */ F(ao, [["render", uo]]);
function De(e, t) {
  const n = f(!1);
  let s = !1;
  if (typeof window != "object" || !("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype))
    return n;
  const l = new window.IntersectionObserver(
    (d) => {
      const a = d[0];
      a && (n.value = a.isIntersecting);
    },
    t
  );
  return fe(() => {
    s = !0, e.value && l.observe(e.value);
  }), Ee(() => {
    s = !1, l.disconnect();
  }), oe(e, (d) => {
    s && (l.disconnect(), n.value = !1, d && l.observe(d));
  }), n;
}
function de(e, t = c(() => ({}))) {
  const n = c(() => {
    const d = me(t.value, []);
    return e.class && e.class.split(" ").forEach((i) => {
      d[i] = !0;
    }), d;
  }), s = c(() => {
    if ("style" in e)
      return e.style;
  }), l = c(() => {
    const o = e, { class: d, style: a } = o;
    return me(o, ["class", "style"]);
  });
  return {
    rootClasses: n,
    rootStyle: s,
    otherAttrs: l
  };
}
const co = E({
  name: "CdxMenu",
  components: {
    CdxMenuItem: oo,
    CdxProgressBar: ro
  },
  /**
   * Attributes, besides class and style, will be passed to the <ul> element.
   */
  inheritAttrs: !1,
  props: {
    /** Menu items. See the MenuItemData type. */
    menuItems: {
      type: Array,
      required: !0
    },
    /**
     * Interactive footer item.
     *
     * This is a special menu item which is pinned to the bottom of the menu. When scrolling is
     * enabled within the menu, the footer item will always be visible at the bottom of the
     * menu. When scrolling is not enabled, the footer item will simply appear as the last menu
     * item.
     *
     * The footer item is selectable, like other menu items.
     */
    footer: {
      type: Object,
      default: null
    },
    /**
     * Value of the selected menu item, or undefined if no item is selected.
     *
     * Must be bound with `v-model:selected`.
     *
     * The property should be initialized to `null` rather than using a falsy value.
     */
    selected: {
      type: [String, Number, null],
      required: !0
    },
    /**
     * Whether the menu is expanded. Must be bound with `v-model:expanded`.
     */
    expanded: {
      type: Boolean,
      required: !0
    },
    /**
     * Whether to display pending state indicators. Meant to indicate that new menu items are
     * being fetched or computed.
     *
     * When true, the menu will expand if not already expanded, and an inline progress bar will
     * display. If there are no menu items yet, a message can be displayed in the `pending`
     * slot, e.g. "Loading results".
     */
    showPending: {
      type: Boolean,
      default: !1
    },
    /**
     * Limit the number of menu items to display before scrolling.
     *
     * Setting this prop to anything falsy will show all menu items.
     *
     * By default, all menu items are shown.
     */
    visibleItemLimit: {
      type: Number,
      default: null
    },
    /**
     * Whether menu item thumbnails (or a placeholder icon) should be displayed.
     */
    showThumbnail: {
      type: Boolean,
      default: !1
    },
    /**
     * Whether to bold menu item labels.
     */
    boldLabel: {
      type: Boolean,
      default: !1
    },
    /**
     * Whether to hide description text overflow via an ellipsis.
     */
    hideDescriptionOverflow: {
      type: Boolean,
      default: !1
    },
    /**
     * The search query to be highlighted within the menu items' titles.
     */
    searchQuery: {
      type: String,
      default: ""
    },
    /**
     * Whether to show the `no-results` slot content.
     *
     * The Menu component automatically shows this slot when there is content in the
     * `no-results` slot and there are zero menu items. However, some components may need to
     * customize this behavior, e.g. to show the slot even when there is at least one menu item.
     * This prop can be used to override the default Menu behavior.
     *
     * Possible values:
     * `null` (default): the `no-results` slot will display only if there are zero menu items.
     * `true`: the `no-results` slot will display, regardless of number of menu items.
     * `false`: the `no-results` slot will not display, regardless of number of menu items.
     */
    showNoResultsSlot: {
      type: Boolean,
      default: null
    }
  },
  emits: [
    // Don't remove the spaces in the "string | number | null" type below; removing these
    // spaces causes the documentation to render the type as "union" instead.
    /**
     * When the selected menu item changes.
     *
     * @property {string | number | null} selectedValue The `.value` property of the
     * selected menu item, or null if no item is selected.
     */
    "update:selected",
    /**
     * When the menu opens or closes.
     *
     * @property {boolean} newValue The new expanded state (true for open, false for closed)
     */
    "update:expanded",
    /**
     * When a menu item is clicked.
     *
     * Typically, components with menus will respond to the selected value change, but
     * occasionally, a component might want to react specifically when a menu item is clicked.
     *
     * @property {MenuItemDataWithId} menuItem The menu item that was clicked
     */
    "menu-item-click",
    /**
     * When a menu item is highlighted via keyboard navigation.
     *
     * @property {MenuItemDataWithId} highlightedMenuItem The menu item
     * was highlighted
     */
    "menu-item-keyboard-navigation",
    /**
     * When the user scrolls towards the bottom of the menu.
     *
     * If it is possible to add or load more menu items, then now would be a good moment
     * so that the user can experience infinite scrolling.
     */
    "load-more"
  ],
  expose: [
    "clearActive",
    "getHighlightedMenuItem",
    "getHighlightedViaKeyboard",
    "delegateKeyNavigation"
  ],
  setup(e, { emit: t, slots: n, attrs: s }) {
    const l = c(() => (e.footer && e.menuItems ? [...e.menuItems, e.footer] : e.menuItems).map((A) => Pe(We({}, A), {
      id: Y("menu-item")
    }))), d = c(() => n["no-results"] ? e.showNoResultsSlot !== null ? e.showNoResultsSlot : l.value.length === 0 : !1), a = f(null), i = f(!1), o = f(null);
    function r() {
      return l.value.find(
        (g) => g.value === e.selected
      );
    }
    function p(g, A) {
      var U;
      if (!(A && A.disabled))
        switch (g) {
          case "selected":
            t("update:selected", (U = A == null ? void 0 : A.value) != null ? U : null), t("update:expanded", !1), o.value = null;
            break;
          case "highlighted":
            a.value = A || null, i.value = !1;
            break;
          case "highlightedViaKeyboard":
            a.value = A || null, i.value = !0;
            break;
          case "active":
            o.value = A || null;
            break;
        }
    }
    const y = c(() => {
      if (a.value !== null)
        return l.value.findIndex(
          (g) => (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            g.value === a.value.value
          )
        );
    });
    function C(g) {
      g && (p("highlightedViaKeyboard", g), t("menu-item-keyboard-navigation", g));
    }
    function $(g) {
      var G;
      const A = ($e) => {
        for (let _ = $e - 1; _ >= 0; _--)
          if (!l.value[_].disabled)
            return l.value[_];
      };
      g = g || l.value.length;
      const U = (G = A(g)) != null ? G : A(l.value.length);
      C(U);
    }
    function D(g) {
      const A = (G) => l.value.find(($e, _) => !$e.disabled && _ > G);
      g = g != null ? g : -1;
      const U = A(g) || A(-1);
      C(U);
    }
    function R(g, A = !0) {
      function U() {
        t("update:expanded", !0), p("highlighted", r());
      }
      function G() {
        A && (g.preventDefault(), g.stopPropagation());
      }
      switch (g.key) {
        case "Enter":
        case " ":
          return G(), e.expanded ? (a.value && i.value && t("update:selected", a.value.value), t("update:expanded", !1)) : U(), !0;
        case "Tab":
          return e.expanded && (a.value && i.value && t("update:selected", a.value.value), t("update:expanded", !1)), !0;
        case "ArrowUp":
          return G(), e.expanded ? (a.value === null && p("highlightedViaKeyboard", r()), $(y.value)) : U(), O(), !0;
        case "ArrowDown":
          return G(), e.expanded ? (a.value === null && p("highlightedViaKeyboard", r()), D(y.value)) : U(), O(), !0;
        case "Home":
          return G(), e.expanded ? (a.value === null && p("highlightedViaKeyboard", r()), D()) : U(), O(), !0;
        case "End":
          return G(), e.expanded ? (a.value === null && p("highlightedViaKeyboard", r()), $()) : U(), O(), !0;
        case "Escape":
          return G(), t("update:expanded", !1), !0;
        default:
          return !1;
      }
    }
    function z() {
      p("active");
    }
    const N = [], W = f(void 0), j = De(
      W,
      { threshold: 0.8 }
    );
    oe(j, (g) => {
      g && t("load-more");
    });
    function P(g, A) {
      if (g) {
        N[A] = g.$el;
        const U = e.visibleItemLimit;
        if (!U || e.menuItems.length < U)
          return;
        const G = Math.min(
          U,
          Math.max(2, Math.floor(0.2 * e.menuItems.length))
        );
        A === e.menuItems.length - G && (W.value = g.$el);
      }
    }
    function O() {
      if (!e.visibleItemLimit || e.visibleItemLimit > e.menuItems.length || y.value === void 0)
        return;
      const g = y.value >= 0 ? y.value : 0;
      N[g].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
    const k = f(null), M = f(null);
    function B() {
      if (M.value = null, !e.visibleItemLimit || N.length <= e.visibleItemLimit) {
        k.value = null;
        return;
      }
      const g = N[0], A = N[e.visibleItemLimit];
      if (k.value = v(
        g,
        A
      ), e.footer) {
        const U = N[N.length - 1];
        M.value = U.scrollHeight;
      }
    }
    function v(g, A) {
      const U = g.getBoundingClientRect().top;
      return A.getBoundingClientRect().top - U + 2;
    }
    fe(() => {
      document.addEventListener("mouseup", z);
    }), Ee(() => {
      document.removeEventListener("mouseup", z);
    }), oe(K(e, "expanded"), (g) => Ae(this, null, function* () {
      const A = r();
      !g && a.value && A === void 0 && p("highlighted"), g && A !== void 0 && p("highlighted", A), g && (yield _e(), B(), yield _e(), O());
    })), oe(K(e, "menuItems"), (g) => Ae(this, null, function* () {
      g.length < N.length && (N.length = g.length), e.expanded && (yield _e(), B(), yield _e(), O());
    }), { deep: !0 });
    const b = c(() => ({
      "max-height": k.value ? `${k.value}px` : void 0,
      "overflow-y": k.value ? "scroll" : void 0,
      "margin-bottom": M.value ? `${M.value}px` : void 0
    })), S = c(() => ({
      "cdx-menu--has-footer": !!e.footer,
      "cdx-menu--has-sticky-footer": !!e.footer && !!k.value
    })), {
      rootClasses: Q,
      rootStyle: ue,
      otherAttrs: Ie
    } = de(s, S);
    return {
      listBoxStyle: b,
      rootClasses: Q,
      rootStyle: ue,
      otherAttrs: Ie,
      assignTemplateRef: P,
      computedMenuItems: l,
      computedShowNoResultsSlot: d,
      highlightedMenuItem: a,
      highlightedViaKeyboard: i,
      activeMenuItem: o,
      handleMenuItemChange: p,
      handleKeyNavigation: R
    };
  },
  // Public methods
  // These must be in the methods block, not in the setup function, otherwise their documentation
  // won't be picked up by vue-docgen
  methods: {
    /**
     * Get the highlighted menu item, if any.
     *
     * @public
     * @return {MenuItemDataWithId|null} The highlighted menu item,
     *   or null if no item is highlighted.
     */
    getHighlightedMenuItem() {
      return this.highlightedMenuItem;
    },
    /**
     * Get whether the last highlighted item was highlighted via the keyboard.
     *
     * @public
     * @return {boolean} Whether the last highlighted menu item was highlighted via keyboard.
     */
    getHighlightedViaKeyboard() {
      return this.highlightedViaKeyboard;
    },
    /**
     * Ensure no menu item is active. This unsets the active item if there is one.
     *
     * @public
     */
    clearActive() {
      this.handleMenuItemChange("active");
    },
    /**
     * Handles all necessary keyboard navigation.
     *
     * The parent component should listen for keydown events on its focusable element,
     * and pass those events to this method. Events for arrow keys, tab and enter are handled
     * by this method. If a different key was pressed, this method will return false to indicate
     * that it didn't handle the event.
     *
     * @public
     * @param event {KeyboardEvent} Keydown event object
     * @param prevent {boolean} If false, do not call e.preventDefault() or e.stopPropagation()
     * @return Whether the event was handled
     */
    delegateKeyNavigation(e, t = !0) {
      return this.handleKeyNavigation(e, t);
    }
  }
});
const po = {
  key: 0,
  class: "cdx-menu__pending cdx-menu-item"
}, fo = {
  key: 1,
  class: "cdx-menu__no-results cdx-menu-item"
};
function mo(e, t, n, s, l, d) {
  const a = x("cdx-menu-item"), i = x("cdx-progress-bar");
  return ce((u(), m("div", {
    class: L(["cdx-menu", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    h("ul", Z({
      class: "cdx-menu__listbox",
      role: "listbox",
      "aria-multiselectable": "false",
      style: e.listBoxStyle
    }, e.otherAttrs), [
      e.showPending && e.computedMenuItems.length === 0 && e.$slots.pending ? (u(), m("li", po, [
        w(e.$slots, "pending")
      ])) : I("", !0),
      e.computedShowNoResultsSlot ? (u(), m("li", fo, [
        w(e.$slots, "no-results")
      ])) : I("", !0),
      (u(!0), m(ge, null, we(e.computedMenuItems, (o, r) => {
        var p, y;
        return u(), T(a, Z({
          key: o.value,
          ref_for: !0,
          ref: (C) => e.assignTemplateRef(C, r)
        }, o, {
          selected: o.value === e.selected,
          active: o.value === ((p = e.activeMenuItem) == null ? void 0 : p.value),
          highlighted: o.value === ((y = e.highlightedMenuItem) == null ? void 0 : y.value),
          "show-thumbnail": e.showThumbnail,
          "bold-label": e.boldLabel,
          "hide-description-overflow": e.hideDescriptionOverflow,
          "search-query": e.searchQuery,
          onChange: (C, $) => e.handleMenuItemChange(C, $ && o),
          onClick: (C) => e.$emit("menu-item-click", o)
        }), {
          default: V(() => {
            var C, $;
            return [
              w(e.$slots, "default", {
                menuItem: o,
                active: o.value === ((C = e.activeMenuItem) == null ? void 0 : C.value) && o.value === (($ = e.highlightedMenuItem) == null ? void 0 : $.value)
              })
            ];
          }),
          _: 2
        }, 1040, ["selected", "active", "highlighted", "show-thumbnail", "bold-label", "hide-description-overflow", "search-query", "onChange", "onClick"]);
      }), 128)),
      e.showPending ? (u(), T(i, {
        key: 2,
        class: "cdx-menu__progress-bar",
        inline: !0
      })) : I("", !0)
    ], 16)
  ], 6)), [
    [Se, e.expanded]
  ]);
}
const Me = /* @__PURE__ */ F(co, [["render", mo]]), ho = ee(Lt), vo = ee(he), bo = E({
  name: "CdxTextInput",
  components: { CdxIcon: J },
  /**
   * We want the input to inherit attributes, not the root element.
   */
  inheritAttrs: !1,
  expose: [
    "focus",
    "blur"
  ],
  props: {
    /**
     * Current value of the input.
     *
     * Provided by `v-model` binding in the parent component.
     */
    modelValue: {
      type: [String, Number],
      default: ""
    },
    /**
     * `type` attribute of the input.
     *
     * @values 'text', 'search', 'number', 'email', 'password', 'tel', 'url',
     * 'week', 'month', 'date', 'datetime-local', 'time'
     */
    inputType: {
      type: String,
      default: "text",
      validator: ho
    },
    /**
     * `status` attribute of the input.
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: vo
    },
    /**
     * Whether the input is disabled.
     */
    disabled: {
      type: Boolean,
      default: !1
    },
    /**
     * An icon at the start of the input element. Similar to a `::before` pseudo-element.
     */
    startIcon: {
      type: [String, Object],
      default: void 0
    },
    /**
     * An icon at the end of the input element. Similar to an `::after` pseudo-element.
     */
    endIcon: {
      type: [String, Object],
      default: void 0
    },
    /**
     * Add a clear button at the end of the input element.
     *
     * When the clear button is pressed, the input's value is set to an empty string.
     * The clear button is displayed when input text is present.
     */
    clearable: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    /**
     * When the input value changes
     *
     * @property {string | number} modelValue The new model value
     */
    "update:modelValue",
    /**
     * When the user presses a key.
     *
     * This event is not emitted when the user presses the Home or End key (T314728),
     * but is emitted for Ctrl/Cmd+Home and Ctrl/Cmd+End.
     *
     * @property {KeyboardEvent}
     */
    "keydown",
    /**
     * When the input value changes via direct use of the input
     *
     * @property {InputEvent} event
     */
    "input",
    /**
     * When an input value change is committed by the user (e.g. on blur)
     *
     * @property {Event} event
     */
    "change",
    /**
     * When the input comes into focus
     *
     * @property {FocusEvent} event
     */
    "focus",
    /**
     * When the input loses focus
     *
     * @property {FocusEvent} event
     */
    "blur",
    /**
     * When the input value is cleared through the use of the clear button
     *
     * @property {MouseEvent} event
     */
    "clear"
  ],
  setup(e, { emit: t, attrs: n }) {
    const s = n.id, {
      computedDisabled: l,
      computedStatus: d,
      computedInputId: a
    } = ie(
      K(e, "disabled"),
      K(e, "status"),
      s
    ), i = pe(ke, void 0), o = se(K(e, "modelValue"), t), r = c(() => e.clearable && !!o.value && !l.value), p = c(() => ({
      "cdx-text-input--has-start-icon": !!e.startIcon,
      "cdx-text-input--has-end-icon": !!e.endIcon,
      "cdx-text-input--clearable": r.value,
      [`cdx-text-input--status-${d.value}`]: !0
    })), {
      rootClasses: y,
      rootStyle: C,
      otherAttrs: $
    } = de(n, p), D = c(() => {
      const B = $.value, { id: k } = B;
      return me(B, ["id"]);
    }), R = c(() => ({
      "cdx-text-input__input--has-value": !!o.value
    }));
    return {
      computedInputId: a,
      descriptionId: i,
      wrappedModel: o,
      isClearable: r,
      rootClasses: y,
      rootStyle: C,
      otherAttrsMinusId: D,
      inputClasses: R,
      computedDisabled: l,
      onClear: (k) => {
        o.value = "", t("clear", k);
      },
      onInput: (k) => {
        t("input", k);
      },
      onChange: (k) => {
        t("change", k);
      },
      onKeydown: (k) => {
        (k.key === "Home" || k.key === "End") && !k.ctrlKey && !k.metaKey || t("keydown", k);
      },
      onFocus: (k) => {
        t("focus", k);
      },
      onBlur: (k) => {
        t("blur", k);
      },
      cdxIconClear: Zt
    };
  },
  // Public methods
  // These must be in the methods block, not in the setup function, otherwise their documentation
  // won't be picked up by vue-docgen
  methods: {
    /**
     * Focus the component's input element.
     *
     * @public
     */
    focus() {
      this.$refs.input.focus();
    },
    /**
     * Blur the component's input element.
     *
     * @public
     */
    blur() {
      this.$refs.input.blur();
    }
  }
});
const go = ["id", "type", "aria-describedby", "disabled"];
function yo(e, t, n, s, l, d) {
  const a = x("cdx-icon");
  return u(), m("div", {
    class: L(["cdx-text-input", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    ce(h("input", Z({
      id: e.computedInputId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wrappedModel = i),
      class: ["cdx-text-input__input", e.inputClasses]
    }, e.otherAttrsMinusId, {
      type: e.inputType,
      "aria-describedby": e.descriptionId,
      disabled: e.computedDisabled,
      onInput: t[1] || (t[1] = (...i) => e.onInput && e.onInput(...i)),
      onChange: t[2] || (t[2] = (...i) => e.onChange && e.onChange(...i)),
      onFocus: t[3] || (t[3] = (...i) => e.onFocus && e.onFocus(...i)),
      onBlur: t[4] || (t[4] = (...i) => e.onBlur && e.onBlur(...i)),
      onKeydown: t[5] || (t[5] = (...i) => e.onKeydown && e.onKeydown(...i))
    }), null, 16, go), [
      [St, e.wrappedModel]
    ]),
    e.startIcon ? (u(), T(a, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__start-icon"
    }, null, 8, ["icon"])) : I("", !0),
    e.endIcon ? (u(), T(a, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__end-icon"
    }, null, 8, ["icon"])) : I("", !0),
    e.isClearable ? (u(), T(a, {
      key: 2,
      icon: e.cdxIconClear,
      class: "cdx-text-input__icon-vue cdx-text-input__clear-icon",
      onMousedown: t[6] || (t[6] = te(() => {
      }, ["prevent"])),
      onClick: e.onClear
    }, null, 8, ["icon", "onClick"])) : I("", !0)
  ], 6);
}
const Re = /* @__PURE__ */ F(bo, [["render", yo]]);
function Be(e) {
  const t = f(
    { width: void 0, height: void 0 }
  );
  if (typeof window != "object" || !("ResizeObserver" in window) || !("ResizeObserverEntry" in window))
    return t;
  const n = new window.ResizeObserver(
    (l) => {
      const d = l[0];
      d && (t.value = {
        width: d.borderBoxSize[0].inlineSize,
        height: d.borderBoxSize[0].blockSize
      });
    }
  );
  let s = !1;
  return fe(() => {
    s = !0, e.value && n.observe(e.value);
  }), Ee(() => {
    s = !1, n.disconnect();
  }), oe(e, (l) => {
    s && (n.disconnect(), t.value = {
      width: void 0,
      height: void 0
    }, l && n.observe(l));
  }), t;
}
const $o = ee(he), ze = E({
  name: "CdxCombobox",
  components: {
    CdxButton: ye,
    CdxIcon: J,
    CdxMenu: Me,
    CdxTextInput: Re
  },
  /**
   * Attributes applied to this component by a parent will be applied
   * to the TextInput child component rather than the root element.
   */
  inheritAttrs: !1,
  props: {
    /**
     * Menu items. See the MenuItemData type.
     */
    menuItems: {
      type: Array,
      required: !0
    },
    /**
     * Value of the current selection.
     *
     * Must be bound with `v-model:selected`.
     */
    selected: {
      type: [String, Number],
      required: !0
    },
    /**
     * Whether the dropdown is disabled.
     */
    disabled: {
      type: Boolean,
      default: !1
    },
    /**
     * Configuration for various menu features. All properties default to false.
     *
     * See the MenuConfig type.
     */
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    /**
     * `status` property of the TextInput component
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: $o
    }
  },
  emits: [
    /**
     * When the selected value changes.
     *
     * @property {string | number} selected The new selected value
     */
    "update:selected",
    /**
     * When the user scrolls towards the bottom of the menu.
     *
     * If it is possible to add or load more menu items, then now would be a good moment
     * so that the user can experience infinite scrolling.
     */
    "load-more",
    /**
     * When the input value changes via direct use of the input
     *
     * @property {InputEvent} event
     */
    "input",
    /**
     * When an input value change is committed by the user (e.g. on blur)
     *
     * @property {Event} event
     */
    "change",
    /**
     * When the input comes into focus
     *
     * @property {FocusEvent} event
     */
    "focus",
    /**
     * When the input loses focus
     *
     * @property {FocusEvent} event
     */
    "blur"
  ],
  setup(e, { emit: t, attrs: n, slots: s }) {
    const l = f(), d = f(), a = f(), i = Y("combobox"), o = K(e, "selected"), r = se(o, t, "update:selected"), p = f(!1), y = f(!1), C = c(() => {
      var v, b;
      return (b = (v = a.value) == null ? void 0 : v.getHighlightedMenuItem()) == null ? void 0 : b.id;
    }), { computedDisabled: $ } = ie(K(e, "disabled")), D = c(() => ({
      "cdx-combobox--expanded": p.value,
      "cdx-combobox--disabled": $.value
    })), R = Be(d), z = c(() => {
      var v;
      return `${(v = R.value.width) != null ? v : 0}px`;
    }), {
      rootClasses: N,
      rootStyle: W,
      otherAttrs: j
    } = de(n, D);
    function P(v) {
      y.value && p.value ? p.value = !1 : (e.menuItems.length > 0 || s["no-results"]) && (p.value = !0), t("focus", v);
    }
    function O(v) {
      p.value = y.value && p.value, t("blur", v);
    }
    function k() {
      $.value || (y.value = !0);
    }
    function M() {
      var v;
      $.value || (v = l.value) == null || v.focus();
    }
    function B(v) {
      !a.value || $.value || e.menuItems.length === 0 || v.key === " " || a.value.delegateKeyNavigation(v);
    }
    return oe(p, () => {
      y.value = !1;
    }), {
      input: l,
      inputWrapper: d,
      currentWidthInPx: z,
      menu: a,
      menuId: i,
      modelWrapper: r,
      expanded: p,
      highlightedId: C,
      computedDisabled: $,
      onInputFocus: P,
      onInputBlur: O,
      onKeydown: B,
      onButtonClick: M,
      onButtonMousedown: k,
      cdxIconExpand: rt,
      rootClasses: N,
      rootStyle: W,
      otherAttrs: j
    };
  }
}), Qe = () => {
  Fe((e) => ({
    "1a5f8de7": e.currentWidthInPx
  }));
}, Ge = ze.setup;
ze.setup = Ge ? (e, t) => (Qe(), Ge(e, t)) : Qe;
const _o = {
  ref: "inputWrapper",
  class: "cdx-combobox__input-wrapper"
};
function Io(e, t, n, s, l, d) {
  const a = x("cdx-text-input"), i = x("cdx-icon"), o = x("cdx-button"), r = x("cdx-menu");
  return u(), m("div", {
    class: L(["cdx-combobox", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    h("div", _o, [
      q(a, Z({
        ref: "input",
        modelValue: e.modelWrapper,
        "onUpdate:modelValue": t[0] || (t[0] = (p) => e.modelWrapper = p)
      }, e.otherAttrs, {
        class: "cdx-combobox__input",
        "aria-activedescendant": e.highlightedId,
        "aria-expanded": e.expanded,
        "aria-controls": e.menuId,
        "aria-owns": e.menuId,
        disabled: e.computedDisabled,
        status: e.status,
        "aria-autocomplete": "list",
        autocomplete: "off",
        role: "combobox",
        onKeydown: e.onKeydown,
        onInput: t[1] || (t[1] = (p) => e.$emit("input", p)),
        onChange: t[2] || (t[2] = (p) => e.$emit("change", p)),
        onFocus: e.onInputFocus,
        onBlur: e.onInputBlur
      }), null, 16, ["modelValue", "aria-activedescendant", "aria-expanded", "aria-controls", "aria-owns", "disabled", "status", "onKeydown", "onFocus", "onBlur"]),
      q(o, {
        class: "cdx-combobox__expand-button",
        "aria-hidden": "true",
        disabled: e.computedDisabled,
        tabindex: "-1",
        type: "button",
        onMousedown: e.onButtonMousedown,
        onClick: e.onButtonClick
      }, {
        default: V(() => [
          q(i, {
            class: "cdx-combobox__expand-icon",
            icon: e.cdxIconExpand
          }, null, 8, ["icon"])
        ]),
        _: 1
      }, 8, ["disabled", "onMousedown", "onClick"])
    ], 512),
    q(r, Z({
      id: e.menuId,
      ref: "menu",
      selected: e.modelWrapper,
      "onUpdate:selected": t[3] || (t[3] = (p) => e.modelWrapper = p),
      expanded: e.expanded,
      "onUpdate:expanded": t[4] || (t[4] = (p) => e.expanded = p),
      "menu-items": e.menuItems
    }, e.menuConfig, {
      onLoadMore: t[5] || (t[5] = (p) => e.$emit("load-more"))
    }), {
      default: V(({ menuItem: p }) => [
        w(e.$slots, "menu-item", { menuItem: p })
      ]),
      "no-results": V(() => [
        w(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const nl = /* @__PURE__ */ F(ze, [["render", Io]]), Co = E({
  name: "CdxDialog",
  components: {
    CdxButton: ye,
    CdxIcon: J
  },
  inheritAttrs: !1,
  props: {
    /**
     * Whether the dialog is visible. Should be provided via a v-model:open
     * binding in the parent scope.
     */
    open: {
      type: Boolean,
      default: !1
    },
    /**
     * Title for the dialog header. Used for ARIA purposes even if no
     * visible header element is displayed.
     */
    title: {
      type: String,
      required: !0
    },
    /**
     * Optional subtitle for the dialog.
     */
    subtitle: {
      type: String,
      required: !1,
      default: null
    },
    /**
     * Whether the dialog header should hide the title & subtitle
     */
    hideTitle: {
      type: Boolean,
      default: !1
    },
    /**
     * Label for the icon-only close button in the header.
     *
     * Including this prop adds the close button.
     */
    closeButtonLabel: {
      type: String,
      default: ""
    },
    /**
     * Primary user action. This will display a primary button with the specified action
     * (progressive or destructive).
     */
    primaryAction: {
      type: Object,
      default: null
    },
    /**
     * Default user action. This will display a normal button.
     */
    defaultAction: {
      type: Object,
      default: null
    },
    /**
     * Whether action buttons should be vertically stacked and 100% width.
     */
    stackedActions: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    /**
     * When the open/close state changes, e.g. when the close button is clicked.
     *
     * @property {boolean} newValue The new open/close state (true for open, false for closed)
     */
    "update:open",
    /**
     * When the primary action button is clicked.
     */
    "primary",
    /**
     * When the default action button is clicked.
     */
    "default"
  ],
  setup(e, { emit: t }) {
    const n = Y("dialog-label"), s = f(), l = f(), d = f(), a = f(), i = f(), o = c(() => !e.hideTitle || !!e.closeButtonLabel), r = c(() => !!e.primaryAction || !!e.defaultAction), p = Be(l), y = c(() => {
      var j;
      return (j = p.value.height) != null ? j : 0;
    }), C = f(!1), $ = c(() => ({
      "cdx-dialog--vertical-actions": e.stackedActions,
      "cdx-dialog--horizontal-actions": !e.stackedActions,
      "cdx-dialog--dividers": C.value
    })), D = f(0);
    function R() {
      t("update:open", !1);
    }
    function z() {
      W(s.value);
    }
    function N() {
      W(s.value, !0);
    }
    function W(j, P = !1) {
      let O = Array.from(
        j.querySelectorAll(`
					input, select, textarea, button, object, a, area,
					[contenteditable], [tabindex]:not([tabindex^="-"])
				`)
      );
      P && (O = O.reverse());
      for (const k of O)
        if (k.focus(), document.activeElement === k)
          return !0;
      return !1;
    }
    return oe(K(e, "open"), (j) => {
      j ? (D.value = window.innerWidth - document.documentElement.clientWidth, document.documentElement.style.setProperty("margin-right", `${D.value}px`), document.body.classList.add("cdx-dialog-open"), _e(() => {
        var P;
        W(l.value) || (P = d.value) == null || P.focus();
      })) : (document.body.classList.remove("cdx-dialog-open"), document.documentElement.style.removeProperty("margin-right"));
    }), oe(y, () => {
      l.value && (C.value = l.value.clientHeight < l.value.scrollHeight);
    }), {
      close: R,
      cdxIconClose: dt,
      labelId: n,
      rootClasses: $,
      dialogElement: s,
      focusTrapStart: a,
      focusTrapEnd: i,
      focusFirst: z,
      focusLast: N,
      dialogBody: l,
      focusHolder: d,
      showHeader: o,
      showFooterActions: r
    };
  }
});
const So = ["aria-label", "aria-labelledby"], wo = {
  key: 0,
  class: "cdx-dialog__header__title-group"
}, xo = ["id"], ko = {
  key: 0,
  class: "cdx-dialog__header__subtitle"
}, Mo = {
  ref: "focusHolder",
  class: "cdx-dialog-focus-trap",
  tabindex: "-1"
}, Bo = {
  key: 0,
  class: "cdx-dialog__footer__text"
}, Ao = {
  key: 1,
  class: "cdx-dialog__footer__actions"
};
function To(e, t, n, s, l, d) {
  const a = x("cdx-icon"), i = x("cdx-button");
  return u(), T(Ke, {
    name: "cdx-dialog-fade",
    appear: ""
  }, {
    default: V(() => [
      e.open ? (u(), m("div", {
        key: 0,
        class: "cdx-dialog-backdrop",
        onClick: t[5] || (t[5] = (...o) => e.close && e.close(...o)),
        onKeyup: t[6] || (t[6] = ne((...o) => e.close && e.close(...o), ["escape"]))
      }, [
        h("div", {
          ref: "focusTrapStart",
          tabindex: "0",
          onFocus: t[0] || (t[0] = (...o) => e.focusLast && e.focusLast(...o))
        }, null, 544),
        h("div", Z({
          ref: "dialogElement",
          class: ["cdx-dialog", e.rootClasses],
          role: "dialog"
        }, e.$attrs, {
          "aria-label": e.$slots.header || e.hideTitle ? e.title : void 0,
          "aria-labelledby": !e.$slots.header && !e.hideTitle ? e.labelId : void 0,
          onClick: t[3] || (t[3] = te(() => {
          }, ["stop"]))
        }), [
          e.showHeader || e.$slots.header ? (u(), m("header", {
            key: 0,
            class: L(["cdx-dialog__header", { "cdx-dialog__header--default": !e.$slots.header }])
          }, [
            w(e.$slots, "header", {}, () => [
              e.hideTitle ? I("", !0) : (u(), m("div", wo, [
                h("h2", {
                  id: e.labelId,
                  class: "cdx-dialog__header__title"
                }, H(e.title), 9, xo),
                e.subtitle ? (u(), m("p", ko, H(e.subtitle), 1)) : I("", !0)
              ])),
              e.closeButtonLabel ? (u(), T(i, {
                key: 1,
                class: "cdx-dialog__header__close-button",
                weight: "quiet",
                type: "button",
                "aria-label": e.closeButtonLabel,
                onClick: e.close
              }, {
                default: V(() => [
                  q(a, {
                    icon: e.cdxIconClose,
                    "icon-label": e.closeButtonLabel
                  }, null, 8, ["icon", "icon-label"])
                ]),
                _: 1
              }, 8, ["aria-label", "onClick"])) : I("", !0)
            ])
          ], 2)) : I("", !0),
          h("div", Mo, null, 512),
          h("div", {
            ref: "dialogBody",
            class: L(["cdx-dialog__body", {
              "cdx-dialog__body--no-header": !(e.showHeader || e.$slots.header),
              "cdx-dialog__body--no-footer": !(e.showFooterActions || e.$slots.footer || e.$slots["footer-text"])
            }])
          }, [
            w(e.$slots, "default")
          ], 2),
          e.showFooterActions || e.$slots.footer || e.$slots["footer-text"] ? (u(), m("footer", {
            key: 1,
            class: L(["cdx-dialog__footer", { "cdx-dialog__footer--default": !e.$slots.footer }])
          }, [
            w(e.$slots, "footer", {}, () => [
              e.$slots["footer-text"] ? (u(), m("p", Bo, [
                w(e.$slots, "footer-text")
              ])) : I("", !0),
              e.showFooterActions ? (u(), m("div", Ao, [
                e.primaryAction ? (u(), T(i, {
                  key: 0,
                  class: "cdx-dialog__footer__primary-action",
                  weight: "primary",
                  action: e.primaryAction.actionType,
                  disabled: e.primaryAction.disabled,
                  onClick: t[1] || (t[1] = (o) => e.$emit("primary"))
                }, {
                  default: V(() => [
                    ae(H(e.primaryAction.label), 1)
                  ]),
                  _: 1
                }, 8, ["action", "disabled"])) : I("", !0),
                e.defaultAction ? (u(), T(i, {
                  key: 1,
                  class: "cdx-dialog__footer__default-action",
                  disabled: e.defaultAction.disabled,
                  onClick: t[2] || (t[2] = (o) => e.$emit("default"))
                }, {
                  default: V(() => [
                    ae(H(e.defaultAction.label), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])) : I("", !0)
              ])) : I("", !0)
            ])
          ], 2)) : I("", !0)
        ], 16, So),
        h("div", {
          ref: "focusTrapEnd",
          tabindex: "0",
          onFocus: t[4] || (t[4] = (...o) => e.focusFirst && e.focusFirst(...o))
        }, null, 544)
      ], 32)) : I("", !0)
    ]),
    _: 3
  });
}
const ol = /* @__PURE__ */ F(Co, [["render", To]]), Vo = E({
  name: "CdxLabel",
  components: { CdxIcon: J },
  /**
   * We want the label or legend to inherit attributes, not the root element.
   */
  inheritAttrs: !1,
  props: {
    /**
     * Icon before the label text.
     *
     * Do not use this if including a start icon within the input component.
     */
    icon: {
      type: [String, Object],
      default: null
    },
    /**
     * Text to indicate that the field is optional.
     *
     * For example, this might be '(optional)' in English. This text will be placed next to
     * the label text.
     */
    optionalFlag: {
      type: String,
      default: ""
    },
    /**
     * Whether the label should be visually hidden.
     */
    visuallyHidden: {
      type: Boolean,
      default: !1
    },
    /**
     * Whether this component should output a `<legend>` element.
     *
     * Always set this to true when this component is used inside a `<fieldset>` element. Do not
     * set it to true otherwise.
     */
    isLegend: {
      type: Boolean,
      default: !1
    },
    /**
     * The ID of the input/control this label is for.
     *
     * Will be added as the `for` attribute of the `<label>`. Not needed for `<legend>`.
     */
    inputId: {
      type: String,
      default: ""
    },
    /**
     * The ID of the description element.
     *
     * This ID can be used for the `aria-describedby` attribute of the input.
     */
    descriptionId: {
      type: String,
      default: ""
    },
    /**
     * Whether this label is for a disabled field or input.
     */
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, { attrs: t }) {
    const { computedDisabled: n } = ie(K(e, "disabled")), s = c(() => ({
      "cdx-label--visually-hidden": e.visuallyHidden,
      "cdx-label--disabled": n.value
    })), {
      rootClasses: l,
      rootStyle: d,
      otherAttrs: a
    } = de(t, s);
    return {
      rootClasses: l,
      rootStyle: d,
      otherAttrs: a
    };
  }
});
const Lo = { class: "cdx-label__label__text" }, Do = {
  key: 1,
  class: "cdx-label__label__optional-flag"
}, Ko = {
  key: 0,
  class: "cdx-label__description"
}, Eo = ["id"];
function Fo(e, t, n, s, l, d) {
  const a = x("cdx-icon");
  return u(), m("div", {
    class: L(["cdx-label", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    (u(), T(xe(e.isLegend ? "legend" : "label"), Z({
      class: "cdx-label__label",
      for: !e.isLegend && e.inputId ? e.inputId : void 0
    }, e.otherAttrs), {
      default: V(() => [
        h("span", null, [
          e.icon ? (u(), T(a, {
            key: 0,
            icon: e.icon,
            class: "cdx-label__label__icon"
          }, null, 8, ["icon"])) : I("", !0),
          h("span", Lo, [
            w(e.$slots, "default")
          ]),
          e.optionalFlag ? (u(), m("span", Do, H(" ") + " " + H(e.optionalFlag), 1)) : I("", !0)
        ]),
        e.isLegend ? (u(), m("span", Ko, [
          w(e.$slots, "description")
        ])) : I("", !0)
      ]),
      _: 3
    }, 16, ["for"])),
    e.isLegend ? I("", !0) : (u(), m("span", {
      key: 0,
      id: e.descriptionId || void 0,
      class: "cdx-label__description"
    }, [
      w(e.$slots, "description")
    ], 8, Eo))
  ], 6);
}
const Ro = /* @__PURE__ */ F(Vo, [["render", Fo]]), zo = {
  notice: Xt,
  error: ut,
  warning: it,
  success: ct
}, No = E({
  name: "CdxMessage",
  components: { CdxButton: ye, CdxIcon: J },
  props: {
    /**
     * Status type of Message.
     *
     * @values 'notice', 'warning', 'error', 'success'
     */
    type: {
      type: String,
      default: "notice",
      validator: tt
    },
    /**
     * Whether this message follows the inline design (no padding, background color, or border).
     */
    inline: {
      type: Boolean,
      default: !1
    },
    /**
     * Custom message icon. Only allowed for notice messages.
     */
    icon: {
      type: [String, Object],
      default: null
    },
    /**
     * Whether the message should fade in. Should be used for messages that are dynamically
     * displayed, not present on page load.
     */
    fadeIn: {
      type: Boolean,
      default: !1
    },
    /**
     * Label text for the dismiss button for user-dismissable messages.
     *
     * An icon-only button will be displayed that will hide the message on click. This prop is
     * for the hidden button label required for screen reader accessibility and tooltip text.
     */
    dismissButtonLabel: {
      type: String,
      default: ""
    },
    /**
     * Enable automatic dismissal of message after a period of time.
     *
     * This prop can be set to `true` to use the default display time of 4000 milliseconds. To
     * customize the display time, set this prop to a number of milliseconds.
     *
     * TODO: consider adding a stricter validator to set limits on this. If the time is too
     * short, the message may not be readable. If the time is too long, the message probably
     * shouldn't be auto-dismissed.
     */
    autoDismiss: {
      type: [Boolean, Number],
      default: !1,
      validator: (e) => typeof e == "boolean" || typeof e == "number" && e > 0
    }
  },
  emits: [
    /**
     * Emitted when the message is dismissed by the user via the dismiss button.
     */
    "user-dismissed",
    /**
     * Emitted when the message is automatically dismissed after the display time.
     */
    "auto-dismissed"
  ],
  setup(e, { emit: t }) {
    const n = f(!1), s = c(
      () => e.inline === !1 && e.dismissButtonLabel.length > 0
    ), l = c(() => e.autoDismiss === !1 ? !1 : e.autoDismiss === !0 ? 4e3 : e.autoDismiss), d = c(() => ({
      "cdx-message--inline": e.inline,
      "cdx-message--block": !e.inline,
      "cdx-message--user-dismissable": s.value,
      [`cdx-message--${e.type}`]: !0
    })), a = c(
      () => e.icon && e.type === "notice" ? e.icon : zo[e.type]
    ), i = f("");
    function o(r) {
      n.value || (i.value = r === "user-dismissed" ? "cdx-message-leave-active-user" : "cdx-message-leave-active-system", n.value = !0, t(r));
    }
    return fe(() => {
      l.value && setTimeout(() => o("auto-dismissed"), l.value);
    }), {
      dismissed: n,
      userDismissable: s,
      rootClasses: d,
      leaveActiveClass: i,
      computedIcon: a,
      onDismiss: o,
      cdxIconClose: dt
    };
  }
});
const Oo = ["aria-live", "role"], Ho = { class: "cdx-message__content" };
function qo(e, t, n, s, l, d) {
  const a = x("cdx-icon"), i = x("cdx-button");
  return u(), T(Ke, {
    name: "cdx-message",
    appear: e.fadeIn,
    "leave-active-class": e.leaveActiveClass
  }, {
    default: V(() => [
      e.dismissed ? I("", !0) : (u(), m("div", {
        key: 0,
        class: L(["cdx-message", e.rootClasses]),
        "aria-live": e.type !== "error" ? "polite" : void 0,
        role: e.type === "error" ? "alert" : void 0
      }, [
        q(a, {
          class: "cdx-message__icon--vue",
          icon: e.computedIcon
        }, null, 8, ["icon"]),
        h("div", Ho, [
          w(e.$slots, "default")
        ]),
        e.userDismissable ? (u(), T(i, {
          key: 0,
          class: "cdx-message__dismiss-button",
          weight: "quiet",
          type: "button",
          "aria-label": e.dismissButtonLabel,
          onClick: t[0] || (t[0] = (o) => e.onDismiss("user-dismissed"))
        }, {
          default: V(() => [
            q(a, {
              icon: e.cdxIconClose,
              "icon-label": e.dismissButtonLabel
            }, null, 8, ["icon", "icon-label"])
          ]),
          _: 1
        }, 8, ["aria-label"])) : I("", !0)
      ], 10, Oo))
    ]),
    _: 3
  }, 8, ["appear", "leave-active-class"]);
}
const jo = /* @__PURE__ */ F(No, [["render", qo]]), Uo = ee(he), Wo = E({
  name: "CdxField",
  components: { CdxLabel: Ro, CdxMessage: jo },
  props: {
    /**
     * Icon before the label text.
     *
     * Do not use this if including a start icon within the input component.
     */
    labelIcon: {
      type: [String, Object],
      default: ""
    },
    /**
     * Text to indicate that the field is optional.
     *
     * For example, this might be '(optional)' in English. This text will be placed next to
     * the label text.
     */
    optionalFlag: {
      type: String,
      default: ""
    },
    /**
     * Whether the label should be visually hidden.
     *
     * Note that this will also hide the description.
     */
    hideLabel: {
      type: Boolean,
      default: !1
    },
    /**
     * Whether this field contains a group of inputs.
     *
     * When true, this outputs a `<fieldset>` element with a semantic `<legend>`. When false,
     * it outputs a `<div>` with a semantic `<label>`.
     */
    isFieldset: {
      type: Boolean,
      default: !1
    },
    /**
     * Whether the entire field is disabled.
     */
    disabled: {
      type: Boolean,
      default: !1
    },
    /**
     * `status` attribute of the input.
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: Uo
    },
    /**
     * Message text keyed on validation status type.
     */
    messages: {
      type: Object,
      default: () => ({})
    }
  },
  setup(e, { slots: t }) {
    const { disabled: n, status: s, isFieldset: l } = wt(e), d = ht(n), a = c(() => ({
      "cdx-field--disabled": d.value
    })), i = Y("label"), o = Y("description"), r = Y("input");
    l.value || (be(at, r), t.description && be(ke, o)), be(st, d), be(lt, s);
    const p = c(
      () => e.status !== "default" && e.status in e.messages ? e.messages[e.status] : ""
    ), y = c(() => e.status === "default" ? "notice" : e.status);
    return {
      rootClasses: a,
      computedDisabled: d,
      labelId: i,
      descriptionId: o,
      inputId: r,
      validationMessage: p,
      validationMessageType: y
    };
  }
});
const Po = { class: "cdx-field__help-text" }, Qo = {
  key: 0,
  class: "cdx-field__validation-message"
};
function Go(e, t, n, s, l, d) {
  const a = x("cdx-label"), i = x("cdx-message");
  return u(), T(xe(e.isFieldset ? "fieldset" : "div"), {
    class: L(["cdx-field", e.rootClasses]),
    "aria-disabled": !e.isFieldset && e.computedDisabled ? !0 : void 0,
    disabled: e.isFieldset && e.computedDisabled ? !0 : void 0
  }, {
    default: V(() => [
      q(a, {
        id: e.labelId,
        icon: e.labelIcon,
        "visually-hidden": e.hideLabel,
        "optional-flag": e.optionalFlag,
        "input-id": e.inputId,
        "description-id": e.descriptionId,
        disabled: e.computedDisabled,
        "is-legend": e.isFieldset
      }, {
        default: V(() => [
          w(e.$slots, "label")
        ]),
        description: V(() => [
          w(e.$slots, "description")
        ]),
        _: 3
      }, 8, ["id", "icon", "visually-hidden", "optional-flag", "input-id", "description-id", "disabled", "is-legend"]),
      h("div", {
        class: L(["cdx-field__control", { "cdx-field__control--has-help-text": e.$slots["help-text"] && e.$slots["help-text"]().length > 0 || e.validationMessage }])
      }, [
        w(e.$slots, "default")
      ], 2),
      h("div", Po, [
        w(e.$slots, "help-text")
      ]),
      !e.computedDisabled && e.validationMessage ? (u(), m("div", Qo, [
        q(i, {
          type: e.validationMessageType,
          inline: !0
        }, {
          default: V(() => [
            ae(H(e.validationMessage), 1)
          ]),
          _: 1
        }, 8, ["type"])
      ])) : I("", !0)
    ]),
    _: 3
  }, 8, ["class", "aria-disabled", "disabled"]);
}
const al = /* @__PURE__ */ F(Wo, [["render", Go]]), Zo = ee(he), Ne = E({
  name: "CdxLookup",
  components: {
    CdxMenu: Me,
    CdxTextInput: Re
  },
  /**
   * We want the input to inherit attributes, not the root element.
   */
  inheritAttrs: !1,
  props: {
    /**
     * Value of the current selection.
     *
     * Must be bound with `v-model:selected`.
     *
     * The property should be initialized to `null` rather than using a falsy value.
     */
    selected: {
      type: [String, Number, null],
      required: !0
    },
    /**
     * Menu items.
     */
    menuItems: {
      type: Array,
      required: !0
    },
    /**
     * Initial value of the text input.
     */
    initialInputValue: {
      type: [String, Number],
      default: ""
    },
    /**
     * Whether the entire component is disabled.
     */
    disabled: {
      type: Boolean,
      default: !1
    },
    /**
     * Configuration for various menu features. All properties default to false.
     *
     * See the MenuConfig type.
     */
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    /**
     * `status` property of the TextInput component
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: Zo
    }
  },
  emits: [
    /**
     * When the selected value changes.
     *
     * @property {string | number | null} selected The new selected value
     */
    "update:selected",
    /**
     * When the user scrolls towards the bottom of the menu.
     *
     * If it is possible to add or load more menu items, then now would be a good moment
     * so that the user can experience infinite scrolling.
     */
    "load-more",
    /**
     * When the text input value changes.
     *
     * @property {string | number} value The new value
     */
    "input",
    /**
     * When an input value change is committed by the user (e.g. on blur)
     *
     * @property {Event} event
     */
    "change",
    /**
     * When the input comes into focus
     *
     * @property {FocusEvent} event
     */
    "focus",
    /**
     * When the input loses focus
     *
     * @property {FocusEvent} event
     */
    "blur"
  ],
  setup: (e, { emit: t, attrs: n, slots: s }) => {
    const l = f(), d = f(), a = Y("lookup-menu"), i = f(!1), o = f(!1), r = f(!1), { computedDisabled: p } = ie(K(e, "disabled")), y = K(e, "selected"), C = se(y, t, "update:selected"), $ = c(
      () => e.menuItems.find((b) => b.value === e.selected)
    ), D = c(() => {
      var b, S;
      return (S = (b = d.value) == null ? void 0 : b.getHighlightedMenuItem()) == null ? void 0 : S.id;
    }), R = f(e.initialInputValue), z = Be(l), N = c(() => {
      var b;
      return `${(b = z.value.width) != null ? b : 0}px`;
    }), W = c(() => ({
      "cdx-lookup--disabled": p.value,
      "cdx-lookup--pending": i.value
    })), {
      rootClasses: j,
      rootStyle: P,
      otherAttrs: O
    } = de(n, W);
    function k(b) {
      $.value && $.value.label !== b && $.value.value !== b && (C.value = null), b === "" ? (o.value = !1, i.value = !1) : i.value = !0, t("input", b);
    }
    function M(b) {
      r.value = !0, // Input value is not null or an empty string.
      R.value !== null && R.value !== "" && // There's either menu items to show or a no results message.
      (e.menuItems.length > 0 || s["no-results"]) && (o.value = !0), t("focus", b);
    }
    function B(b) {
      r.value = !1, o.value = !1, t("blur", b);
    }
    function v(b) {
      !d.value || p.value || e.menuItems.length === 0 && !s["no-results"] || b.key === " " || d.value.delegateKeyNavigation(b);
    }
    return oe(y, (b) => {
      if (b !== null) {
        const S = $.value ? $.value.label || $.value.value : "";
        R.value !== S && (R.value = S, t("input", R.value));
      }
    }), oe(K(e, "menuItems"), (b) => {
      // Only show the menu if we were in the pending state (meaning this menuItems change
      // was in response to user input) and the menu is still focused
      r.value && i.value && // Show the menu if there are either menu items or no-results content to show
      (b.length > 0 || s["no-results"]) && (o.value = !0), b.length === 0 && !s["no-results"] && (o.value = !1), i.value = !1;
    }), {
      rootElement: l,
      currentWidthInPx: N,
      menu: d,
      menuId: a,
      highlightedId: D,
      inputValue: R,
      modelWrapper: C,
      expanded: o,
      computedDisabled: p,
      onInputBlur: B,
      rootClasses: j,
      rootStyle: P,
      otherAttrs: O,
      onUpdateInput: k,
      onInputFocus: M,
      onKeydown: v
    };
  }
}), Ze = () => {
  Fe((e) => ({
    a2eaf872: e.currentWidthInPx
  }));
}, Je = Ne.setup;
Ne.setup = Je ? (e, t) => (Ze(), Je(e, t)) : Ze;
function Jo(e, t, n, s, l, d) {
  const a = x("cdx-text-input"), i = x("cdx-menu");
  return u(), m("div", {
    ref: "rootElement",
    class: L(["cdx-lookup", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    q(a, Z({
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
      disabled: e.computedDisabled,
      status: e.status,
      "onUpdate:modelValue": e.onUpdateInput,
      onChange: t[1] || (t[1] = (o) => e.$emit("change", o)),
      onFocus: e.onInputFocus,
      onBlur: e.onInputBlur,
      onKeydown: e.onKeydown
    }), null, 16, ["modelValue", "aria-controls", "aria-owns", "aria-expanded", "aria-activedescendant", "disabled", "status", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
    q(i, Z({
      id: e.menuId,
      ref: "menu",
      selected: e.modelWrapper,
      "onUpdate:selected": t[2] || (t[2] = (o) => e.modelWrapper = o),
      expanded: e.expanded,
      "onUpdate:expanded": t[3] || (t[3] = (o) => e.expanded = o),
      "menu-items": e.menuItems
    }, e.menuConfig, {
      onLoadMore: t[4] || (t[4] = (o) => e.$emit("load-more"))
    }), {
      default: V(({ menuItem: o }) => [
        w(e.$slots, "menu-item", { menuItem: o })
      ]),
      "no-results": V(() => [
        w(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const ll = /* @__PURE__ */ F(Ne, [["render", Jo]]), Xo = E({
  name: "CdxRadio",
  props: {
    /**
     * Value of the currently selected radio.
     *
     * Provided by `v-model` binding in the parent component.
     */
    modelValue: {
      type: [String, Number, Boolean],
      default: ""
    },
    /**
     * HTML "value" attribute to assign to the input.
     *
     * Required for input groups.
     */
    inputValue: {
      type: [String, Number, Boolean],
      default: !1
    },
    /**
     * HTML "name" attribute to assign to the input.
     *
     * Required for input groups
     */
    name: {
      type: String,
      default: ""
    },
    /**
     * Whether the disabled attribute should be added to the input.
     */
    disabled: {
      type: Boolean,
      default: !1
    },
    /**
     * Whether the component should display inline.
     *
     * By default, `display: block` is set and a margin exists between
     * sibling components, for a stacked layout.
     */
    inline: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    /**
     * Emitted when modelValue changes.
     *
     * @property {string | number | boolean} modelValue The new model value
     */
    "update:modelValue"
  ],
  setup(e, { emit: t }) {
    const n = c(() => ({
      "cdx-radio--inline": e.inline
    })), { computedDisabled: s } = ie(K(e, "disabled")), l = f(), d = Y("radio"), a = () => {
      l.value.focus();
    }, i = se(K(e, "modelValue"), t);
    return {
      rootClasses: n,
      computedDisabled: s,
      input: l,
      radioId: d,
      focusInput: a,
      wrappedModel: i
    };
  }
});
const Yo = ["id", "name", "value", "disabled"], ea = /* @__PURE__ */ h("span", { class: "cdx-radio__icon" }, null, -1), ta = ["for"];
function na(e, t, n, s, l, d) {
  return u(), m("span", {
    class: L(["cdx-radio", e.rootClasses])
  }, [
    ce(h("input", {
      id: e.radioId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (a) => e.wrappedModel = a),
      class: "cdx-radio__input",
      type: "radio",
      name: e.name,
      value: e.inputValue,
      disabled: e.computedDisabled
    }, null, 8, Yo), [
      [xt, e.wrappedModel]
    ]),
    ea,
    h("label", {
      class: "cdx-radio__label",
      for: e.radioId,
      onClick: t[1] || (t[1] = (...a) => e.focusInput && e.focusInput(...a))
    }, [
      w(e.$slots, "default")
    ], 8, ta)
  ], 2);
}
const sl = /* @__PURE__ */ F(Xo, [["render", na]]), oa = ee(he), aa = E({
  name: "CdxSearchInput",
  components: {
    CdxButton: ye,
    CdxTextInput: Re
  },
  /**
   * Attributes, besides class, will be passed to the TextInput's input element.
   */
  inheritAttrs: !1,
  props: {
    /**
     * Value of the search input, provided by `v-model` binding in the parent component.
     */
    modelValue: {
      type: [String, Number],
      default: ""
    },
    /**
     * Submit button text.
     *
     * If this is provided, a submit button with this label will be added.
     */
    buttonLabel: {
      type: String,
      default: ""
    },
    /**
     * Whether the search input is disabled.
     */
    disabled: {
      type: Boolean,
      default: !1
    },
    /**
     * `status` property of the TextInput component
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: oa
    }
  },
  emits: [
    /**
     * When the input value changes
     *
     * @property {string | number} value The new value
     */
    "update:modelValue",
    /**
     * When the submit button is clicked.
     *
     * @property {string | number} value The current input
     */
    "submit-click",
    /**
     * When the input value changes via direct use of the input
     *
     * @property {InputEvent} event
     */
    "input",
    /**
     * When an input value change is committed by the user (e.g. on blur)
     *
     * @property {Event} event
     */
    "change",
    /**
     * When the input comes into focus
     *
     * @property {FocusEvent} event
     */
    "focus",
    /**
     * When the input loses focus
     *
     * @property {FocusEvent} event
     */
    "blur"
  ],
  setup(e, { emit: t, attrs: n }) {
    const s = se(K(e, "modelValue"), t), { computedDisabled: l } = ie(K(e, "disabled")), d = c(() => ({
      "cdx-search-input--has-end-button": !!e.buttonLabel
    })), {
      rootClasses: a,
      rootStyle: i,
      otherAttrs: o
    } = de(n, d);
    return {
      wrappedModel: s,
      computedDisabled: l,
      rootClasses: a,
      rootStyle: i,
      otherAttrs: o,
      handleSubmit: () => {
        t("submit-click", s.value);
      },
      searchIcon: tn
    };
  },
  methods: {
    /**
     * Focus the component's input element.
     *
     * @public
     */
    focus() {
      this.$refs.textInput.focus();
    }
  }
});
const la = { class: "cdx-search-input__input-wrapper" };
function sa(e, t, n, s, l, d) {
  const a = x("cdx-text-input"), i = x("cdx-button");
  return u(), m("div", {
    class: L(["cdx-search-input", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    h("div", la, [
      q(a, Z({
        ref: "textInput",
        modelValue: e.wrappedModel,
        "onUpdate:modelValue": t[0] || (t[0] = (o) => e.wrappedModel = o),
        class: "cdx-search-input__text-input",
        "input-type": "search",
        "start-icon": e.searchIcon,
        disabled: e.computedDisabled,
        status: e.status
      }, e.otherAttrs, {
        onKeydown: ne(e.handleSubmit, ["enter"]),
        onInput: t[1] || (t[1] = (o) => e.$emit("input", o)),
        onChange: t[2] || (t[2] = (o) => e.$emit("change", o)),
        onFocus: t[3] || (t[3] = (o) => e.$emit("focus", o)),
        onBlur: t[4] || (t[4] = (o) => e.$emit("blur", o))
      }), null, 16, ["modelValue", "start-icon", "disabled", "status", "onKeydown"]),
      w(e.$slots, "default")
    ]),
    e.buttonLabel ? (u(), T(i, {
      key: 0,
      class: "cdx-search-input__end-button",
      disabled: e.computedDisabled,
      onClick: e.handleSubmit
    }, {
      default: V(() => [
        ae(H(e.buttonLabel), 1)
      ]),
      _: 1
    }, 8, ["disabled", "onClick"])) : I("", !0)
  ], 6);
}
const ia = /* @__PURE__ */ F(aa, [["render", sa]]), da = ee(he), Oe = E({
  name: "CdxSelect",
  components: {
    CdxIcon: J,
    CdxMenu: Me
  },
  /**
   * We want the select handle to inherit attributes, not the root element.
   */
  inheritAttrs: !1,
  props: {
    /**
     * Menu items. See the MenuItemData type.
     */
    menuItems: {
      type: Array,
      required: !0
    },
    /**
     * Value of the current selection.
     *
     * Must be bound with `v-model:selected`.
     *
     * The property should be initialized to `null` rather than using a falsy value.
     */
    selected: {
      type: [String, Number, null],
      required: !0
    },
    /**
     * Label to display when no selection has been made.
     */
    defaultLabel: {
      type: String,
      default: ""
    },
    /**
     * Whether the dropdown is disabled.
     */
    disabled: {
      type: Boolean,
      default: !1
    },
    /**
     * Configuration for various menu features. All properties default to false.
     *
     * See the MenuConfig type.
     */
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    /**
     * An icon at the start of the select element
     * displayed when no selection has been made.
     */
    defaultIcon: {
      type: [String, Object],
      default: void 0
    },
    /**
     * `status` attribute of the input.
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: da
    }
  },
  emits: [
    /**
     * When the selection value changes.
     *
     * @property {string | number | null} modelValue The new model value
     */
    "update:selected",
    /**
     * When the user scrolls towards the bottom of the menu.
     *
     * If it is possible to add or load more menu items, then now would be a good moment
     * so that the user can experience infinite scrolling.
     */
    "load-more"
  ],
  setup(e, { emit: t, attrs: n }) {
    const s = f(), l = f(), d = pe(ke, void 0), a = Y("select-menu"), i = f(!1), o = n.id || Y("select-handle"), {
      computedDisabled: r,
      computedStatus: p,
      computedInputId: y
    } = ie(
      K(e, "disabled"),
      K(e, "status"),
      o
    ), C = se(K(e, "selected"), t, "update:selected"), $ = c(
      () => e.menuItems.find((S) => S.value === e.selected)
    ), D = c(() => $.value ? $.value.label || $.value.value : e.defaultLabel), R = Be(s), z = c(() => {
      var S;
      return `${(S = R.value.width) != null ? S : 0}px`;
    }), N = c(() => {
      if (e.defaultIcon && !$.value)
        return e.defaultIcon;
      if ($.value && $.value.icon)
        return $.value.icon;
    }), W = c(() => ({
      "cdx-select-vue--enabled": !r.value,
      "cdx-select-vue--disabled": r.value,
      "cdx-select-vue--expanded": i.value,
      "cdx-select-vue--value-selected": !!$.value,
      "cdx-select-vue--no-selections": !$.value,
      "cdx-select-vue--has-start-icon": !!N.value,
      [`cdx-select-vue--status-${p.value}`]: !0
    })), {
      rootClasses: j,
      rootStyle: P,
      otherAttrs: O
    } = de(n, W), k = c(() => {
      const ue = O.value, { id: S } = ue;
      return me(ue, ["id"]);
    }), M = c(() => {
      var S, Q;
      return (Q = (S = l.value) == null ? void 0 : S.getHighlightedMenuItem()) == null ? void 0 : Q.id;
    });
    function B() {
      i.value = !1;
    }
    function v() {
      var S;
      r.value || (i.value = !i.value, (S = s.value) == null || S.focus());
    }
    function b(S) {
      var Q;
      r.value || (Q = l.value) == null || Q.delegateKeyNavigation(S);
    }
    return {
      handle: s,
      menu: l,
      computedHandleId: y,
      descriptionId: d,
      menuId: a,
      modelWrapper: C,
      selectedMenuItem: $,
      highlightedId: M,
      expanded: i,
      computedDisabled: r,
      onBlur: B,
      currentLabel: D,
      currentWidthInPx: z,
      rootClasses: j,
      rootStyle: P,
      otherAttrsMinusId: k,
      onClick: v,
      onKeydown: b,
      startIcon: N,
      cdxIconExpand: rt
    };
  }
}), Xe = () => {
  Fe((e) => ({
    "3f2a5daa": e.currentWidthInPx
  }));
}, Ye = Oe.setup;
Oe.setup = Ye ? (e, t) => (Xe(), Ye(e, t)) : Xe;
const ua = ["aria-disabled"], ra = ["id", "aria-owns", "aria-activedescendant", "aria-expanded", "aria-describedby"];
function ca(e, t, n, s, l, d) {
  const a = x("cdx-icon"), i = x("cdx-menu");
  return u(), m("div", {
    class: L(["cdx-select-vue", e.rootClasses]),
    style: le(e.rootStyle),
    "aria-disabled": e.computedDisabled
  }, [
    h("div", Z({
      id: e.computedHandleId,
      ref: "handle",
      class: "cdx-select-vue__handle"
    }, e.otherAttrsMinusId, {
      tabindex: "0",
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-owns": e.menuId,
      "aria-activedescendant": e.highlightedId,
      "aria-haspopup": "listbox",
      "aria-expanded": e.expanded,
      "aria-describedby": e.descriptionId,
      onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o)),
      onBlur: t[1] || (t[1] = (...o) => e.onBlur && e.onBlur(...o)),
      onKeydown: t[2] || (t[2] = (...o) => e.onKeydown && e.onKeydown(...o))
    }), [
      w(e.$slots, "label", {
        selectedMenuItem: e.selectedMenuItem,
        defaultLabel: e.defaultLabel
      }, () => [
        ae(H(e.currentLabel), 1)
      ]),
      e.startIcon ? (u(), T(a, {
        key: 0,
        icon: e.startIcon,
        class: "cdx-select-vue__start-icon"
      }, null, 8, ["icon"])) : I("", !0),
      q(a, {
        icon: e.cdxIconExpand,
        class: "cdx-select-vue__indicator"
      }, null, 8, ["icon"])
    ], 16, ra),
    q(i, Z({
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
      default: V(({ menuItem: o }) => [
        w(e.$slots, "menu-item", { menuItem: o })
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 14, ua);
}
const il = /* @__PURE__ */ F(Oe, [["render", ca]]), pa = E({
  name: "CdxTab",
  /**
   * The "label" and "disabled" props are referenced by the parent Tabs
   * component during the generation of a list of labels.
   */
  props: {
    /**
     * String name of the tab, used for programmatic selection. Each Tab
     * inside a layout must have a unique name. This prop will also be
     * used as the tab label if no "label" prop is provided.
     */
    name: {
      type: String,
      required: !0
    },
    /**
     * Label that corresponds to this Tab in the Tabs component's header.
     * Lengthy labels will be truncated.
     */
    // eslint-disable-next-line vue/no-unused-properties
    label: {
      type: String,
      default: ""
    },
    /**
     * Whether or not the tab is disabled. Disabled tabs cannot be accessed
     * via label clicks or keyboard navigation.
     */
    // eslint-disable-next-line vue/no-unused-properties
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = pe(nt), n = pe(ot);
    if (!t || !n)
      throw new Error("Tab component must be used inside a Tabs component");
    const s = t.value.get(e.name) || {}, l = c(() => e.name === n.value);
    return {
      tab: s,
      isActive: l
    };
  }
});
const fa = ["id", "aria-hidden", "aria-labelledby"];
function ma(e, t, n, s, l, d) {
  return ce((u(), m("section", {
    id: e.tab.id,
    "aria-hidden": e.isActive ? void 0 : !0,
    "aria-labelledby": `${e.tab.id}-label`,
    class: "cdx-tab",
    role: "tabpanel",
    tabindex: "-1"
  }, [
    w(e.$slots, "default")
  ], 8, fa)), [
    [Se, e.isActive]
  ]);
}
const dl = /* @__PURE__ */ F(pa, [["render", ma]]), ha = E({
  name: "CdxTabs",
  components: {
    CdxButton: ye,
    CdxIcon: J
  },
  props: {
    /**
     * The `name` of the currently active Tab in the layout.
     *
     * Provided by `v-model:active` binding in the parent component.
     */
    active: {
      type: String,
      required: !0
    },
    /**
     * Whether or not the component should be displayed in a framed
     * visual style.
     */
    framed: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    /**
     * Emitted whenever the active tab changes
     *
     * @property {string} active The `name` of the current active tab
     */
    "update:active"
  ],
  /**
   * Some methods are exposed to allow for programmatic selection of
   * the active tab from outside of the component.
   */
  expose: [
    "select",
    "next",
    "prev"
  ],
  setup(e, { slots: t, emit: n }) {
    const s = f(), l = f(), d = f(), a = f(), i = f(), o = pt(s), r = c(() => {
      var b;
      const M = [], B = (b = t.default) == null ? void 0 : b.call(t);
      B && B.forEach(v);
      function v(S) {
        S && typeof S == "object" && "type" in S && (typeof S.type == "object" && "name" in S.type && S.type.name === "CdxTab" ? M.push(S) : "children" in S && Array.isArray(S.children) && S.children.forEach(v));
      }
      return M;
    });
    if (!r.value || r.value.length === 0)
      throw new Error("Slot content cannot be empty");
    const p = c(() => r.value.reduce((M, B) => {
      var v;
      if ((v = B.props) != null && v.name && typeof B.props.name == "string") {
        if (M.get(B.props.name))
          throw new Error("Tab names must be unique");
        M.set(B.props.name, {
          name: B.props.name,
          id: Y(B.props.name),
          label: B.props.label || B.props.name,
          disabled: B.props.disabled
        });
      }
      return M;
    }, /* @__PURE__ */ new Map())), y = se(K(e, "active"), n, "update:active"), C = c(() => Array.from(p.value.keys())), $ = c(() => C.value.indexOf(y.value)), D = c(() => {
      var M;
      return (M = p.value.get(y.value)) == null ? void 0 : M.id;
    });
    be(ot, y), be(nt, p);
    const R = f(), z = f(), N = De(R, { threshold: 0.95 }), W = De(z, { threshold: 0.95 });
    function j(M, B) {
      const v = M;
      v && (B === 0 ? R.value = v : B === C.value.length - 1 && (z.value = v));
    }
    const P = c(() => ({
      "cdx-tabs--framed": e.framed,
      "cdx-tabs--quiet": !e.framed
    }));
    function O(M) {
      if (!l.value || !a.value || !i.value)
        return 0;
      const B = o.value === "rtl" ? i.value : a.value, v = o.value === "rtl" ? a.value : i.value, b = M.offsetLeft, S = b + M.clientWidth, Q = l.value.scrollLeft + B.clientWidth, ue = l.value.scrollLeft + l.value.clientWidth - v.clientWidth;
      return b < Q ? b - Q : S > ue ? S - ue : 0;
    }
    function k(M) {
      var S;
      if (!l.value || !a.value || !i.value)
        return;
      const B = M === "next" && o.value === "ltr" || M === "prev" && o.value === "rtl" ? 1 : -1;
      let v = 0, b = M === "next" ? l.value.firstElementChild : l.value.lastElementChild;
      for (; b; ) {
        const Q = M === "next" ? b.nextElementSibling : b.previousElementSibling;
        if (v = O(b), Math.sign(v) === B) {
          Q && Math.abs(v) < 0.25 * l.value.clientWidth && (v = O(Q));
          break;
        }
        b = Q;
      }
      l.value.scrollBy({
        left: v,
        behavior: "smooth"
      }), (S = d.value) == null || S.focus();
    }
    return oe(y, () => {
      if (D.value === void 0 || !l.value || !a.value || !i.value)
        return;
      const M = document.getElementById(`${D.value}-label`);
      M && l.value.scrollBy({
        left: O(M),
        behavior: "smooth"
      });
    }), {
      activeTab: y,
      activeTabIndex: $,
      activeTabId: D,
      currentDirection: o,
      rootElement: s,
      listElement: l,
      focusHolder: d,
      prevScroller: a,
      nextScroller: i,
      rootClasses: P,
      tabNames: C,
      tabsData: p,
      firstLabelVisible: N,
      lastLabelVisible: W,
      assignTemplateRefIfNecessary: j,
      scrollTabs: k,
      cdxIconPrevious: en,
      cdxIconNext: Yt
    };
  },
  /**
   * Some non-public methods are defined here rather than in setup because
   * they support public methods (which *must* be defined using the Options
   * API in order to show up in documentation), or are thematically related
   * (such as key handlers).
   */
  methods: {
    /**
     * Programmatically select a tab based on its "name" prop
     *
     * @param {string} tabName The name of the tab to select
     * @public
     */
    select(e) {
      const t = this.tabsData.get(e);
      t && !(t != null && t.disabled) && (this.activeTab = e);
    },
    /**
     * Used to select next or previous tab in the sequence, skipping
     * over any tabs that are disabled. The provided increment should
     * be either 1 (to move forward) or -1 (to move backwards)
     *
     * @param index
     * @param increment
     */
    selectNonDisabled(e, t) {
      const n = this.tabsData.get(this.tabNames[e + t]);
      n && (n.disabled ? this.selectNonDisabled(e + t, t) : this.select(n.name));
    },
    /**
     * Set the next tab to active, if one exists
     *
     * @public
     */
    next() {
      this.selectNonDisabled(this.activeTabIndex, 1);
    },
    /**
     * Set the previous tab to active, if one exists
     *
     * @public
     */
    prev() {
      this.selectNonDisabled(this.activeTabIndex, -1);
    },
    /**
     * Handle left arrow key navigation (based on LTR/RTL direction)
     */
    onLeftArrowKeypress() {
      this.currentDirection === "rtl" ? this.next() : this.prev();
    },
    /**
     * Handle right arrow key navigation (based on LTR/RTL direction)
     */
    onRightArrowKeypress() {
      this.currentDirection === "rtl" ? this.prev() : this.next();
    },
    /**
     * Handle down arrow key navigation by moving focus to the contents
     * of the currently active tab
     */
    onDownArrowKeypress() {
      var e;
      this.activeTabId && ((e = document.getElementById(this.activeTabId)) == null || e.focus());
    }
  }
});
const va = {
  ref: "focusHolder",
  tabindex: "-1"
}, ba = {
  ref: "prevScroller",
  class: "cdx-tabs__prev-scroller"
}, ga = ["aria-activedescendant"], ya = ["id"], $a = ["href", "aria-disabled", "aria-selected", "onClick", "onKeyup"], _a = {
  ref: "nextScroller",
  class: "cdx-tabs__next-scroller"
}, Ia = { class: "cdx-tabs__content" };
function Ca(e, t, n, s, l, d) {
  const a = x("cdx-icon"), i = x("cdx-button");
  return u(), m("div", {
    ref: "rootElement",
    class: L(["cdx-tabs", e.rootClasses])
  }, [
    h("div", {
      class: "cdx-tabs__header",
      tabindex: "0",
      onKeydown: [
        t[4] || (t[4] = ne(te((...o) => e.onRightArrowKeypress && e.onRightArrowKeypress(...o), ["prevent"]), ["right"])),
        t[5] || (t[5] = ne(te((...o) => e.onDownArrowKeypress && e.onDownArrowKeypress(...o), ["prevent"]), ["down"])),
        t[6] || (t[6] = ne(te((...o) => e.onLeftArrowKeypress && e.onLeftArrowKeypress(...o), ["prevent"]), ["left"]))
      ]
    }, [
      h("div", va, null, 512),
      ce(h("div", ba, [
        q(i, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[0] || (t[0] = te(() => {
          }, ["prevent"])),
          onClick: t[1] || (t[1] = (o) => e.scrollTabs("prev"))
        }, {
          default: V(() => [
            q(a, { icon: e.cdxIconPrevious }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [Se, !e.firstLabelVisible]
      ]),
      h("ul", {
        ref: "listElement",
        class: "cdx-tabs__list",
        role: "tablist",
        "aria-activedescendant": e.activeTabId
      }, [
        (u(!0), m(ge, null, we(e.tabsData.values(), (o, r) => (u(), m("li", {
          id: `${o.id}-label`,
          key: r,
          ref_for: !0,
          ref: (p) => e.assignTemplateRefIfNecessary(p, r),
          class: "cdx-tabs__list__item",
          role: "presentation"
        }, [
          h("a", {
            href: `#${o.id}`,
            role: "tab",
            tabIndex: "-1",
            "aria-disabled": o.disabled,
            "aria-selected": o.name === e.activeTab,
            onClick: te((p) => e.select(o.name), ["prevent"]),
            onKeyup: ne((p) => e.select(o.name), ["enter"])
          }, H(o.label), 41, $a)
        ], 8, ya))), 128))
      ], 8, ga),
      ce(h("div", _a, [
        q(i, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[2] || (t[2] = te(() => {
          }, ["prevent"])),
          onClick: t[3] || (t[3] = (o) => e.scrollTabs("next"))
        }, {
          default: V(() => [
            q(a, { icon: e.cdxIconNext }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [Se, !e.lastLabelVisible]
      ])
    ], 32),
    h("div", Ia, [
      w(e.$slots, "default")
    ])
  ], 2);
}
const ul = /* @__PURE__ */ F(ha, [["render", Ca]]), Sa = ee(he), wa = E({
  name: "CdxTextArea",
  components: { CdxIcon: J },
  inheritAttrs: !1,
  props: {
    /**
     * Current value of the textarea.
     *
     * Provided by `v-model` binding in the parent component.
     */
    modelValue: {
      type: String,
      default: ""
    },
    /**
     * `status` attribute of the textarea.
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: Sa
    },
    /**
     * Whether the textarea is disabled.
     */
    disabled: {
      type: Boolean,
      default: !1
    },
    /**
     * Describes whether the textarea grows vertically to show all text.
     *
     * When autosize is true, the textarea automatically grows in height (vertically).
     * The height of the textarea expands while the user types in the textarea.
     * The content inside the textarea is visible and there's no scroll.
     *
     * @values true, false
     */
    autosize: {
      type: Boolean,
      default: !1
    },
    /**
     * An icon at the start of the textarea element. Similar to a `::before` pseudo-element.
     */
    startIcon: {
      type: [String, Object],
      default: void 0
    },
    /**
     * An icon at the end of the textarea element. Similar to an `::after` pseudo-element.
     */
    endIcon: {
      type: [String, Object],
      default: void 0
    }
  },
  emits: [
    /**
     * When the textarea value changes.
     *
     * @property {string} modelValue The new model value
     */
    "update:modelValue"
  ],
  setup(e, { attrs: t, emit: n }) {
    const s = se(K(e, "modelValue"), n), l = t.id, {
      computedDisabled: d,
      computedStatus: a,
      computedInputId: i
    } = ie(
      K(e, "disabled"),
      K(e, "status"),
      l
    ), o = pe(ke, void 0), r = c(() => ({
      "cdx-text-area__textarea--has-value": !!s.value,
      "cdx-text-area__textarea--is-autosize": e.autosize
    })), p = c(() => ({
      "cdx-text-area--status-default": a.value === "default",
      "cdx-text-area--status-error": a.value === "error",
      "cdx-text-area--has-start-icon": !!e.startIcon,
      "cdx-text-area--has-end-icon": !!e.endIcon
    })), {
      rootClasses: y,
      rootStyle: C,
      otherAttrs: $
    } = de(t, p), D = c(() => {
      const j = $.value, { id: N } = j;
      return me(j, ["id"]);
    }), R = f();
    function z() {
      R.value && e.autosize && (R.value.style.height = "auto", R.value.style.height = `${R.value.scrollHeight}px`);
    }
    return {
      rootClasses: y,
      rootStyle: C,
      wrappedModel: s,
      computedDisabled: d,
      computedInputId: i,
      descriptionId: o,
      textareaClasses: r,
      otherAttrsMinusId: D,
      textarea: R,
      onInput: z
    };
  }
});
const xa = ["id", "aria-describedby", "disabled"];
function ka(e, t, n, s, l, d) {
  const a = x("cdx-icon");
  return u(), m("div", {
    class: L(["cdx-text-area", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    ce(h("textarea", Z({
      id: e.computedInputId,
      ref: "textarea"
    }, e.otherAttrsMinusId, {
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wrappedModel = i),
      class: [e.textareaClasses, "cdx-text-area__textarea"],
      "aria-describedby": e.descriptionId,
      disabled: e.computedDisabled,
      onInput: t[1] || (t[1] = (...i) => e.onInput && e.onInput(...i))
    }), null, 16, xa), [
      [kt, e.wrappedModel]
    ]),
    e.startIcon ? (u(), T(a, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-area__icon-vue cdx-text-area__start-icon"
    }, null, 8, ["icon"])) : I("", !0),
    e.endIcon ? (u(), T(a, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-area__icon-vue cdx-text-area__end-icon"
    }, null, 8, ["icon"])) : I("", !0)
  ], 6);
}
const rl = /* @__PURE__ */ F(wa, [["render", ka]]), Ma = E({
  name: "CdxToggleButton",
  props: {
    /**
     * Whether the button should be set to "on" (true) or "off" (false).
     *
     * Provided by `v-model` binding in the parent component.
     */
    modelValue: {
      type: Boolean,
      default: !1
    },
    /**
     * Whether the disabled attribute should be added to the button, which prevents
     * it from being clicked.
     */
    disabled: {
      type: Boolean,
      default: !1
    },
    /**
     * Whether the toggle button should be "quiet", which renders more minimally.
     */
    quiet: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    /**
     * Emitted when modelValue changes (i.e. when the state is toggled)
     *
     * @property {boolean} modelValue The new model value
     */
    "update:modelValue"
  ],
  setup(e, { emit: t }) {
    const n = f(!1);
    return {
      rootClasses: c(() => ({
        // Quiet means frameless among other things
        "cdx-toggle-button--quiet": e.quiet,
        "cdx-toggle-button--framed": !e.quiet,
        // Provide --toggled-off too so that we can simplify selectors
        "cdx-toggle-button--toggled-on": e.modelValue,
        "cdx-toggle-button--toggled-off": !e.modelValue,
        "cdx-toggle-button--is-active": n.value
      })),
      onClick: () => {
        t("update:modelValue", !e.modelValue);
      },
      setActive: (a) => {
        n.value = a;
      }
    };
  }
});
const Ba = ["aria-pressed", "disabled"];
function Aa(e, t, n, s, l, d) {
  return u(), m("button", {
    class: L(["cdx-toggle-button", e.rootClasses]),
    "aria-pressed": e.modelValue,
    disabled: e.disabled,
    onClick: t[0] || (t[0] = (...a) => e.onClick && e.onClick(...a)),
    onKeydown: t[1] || (t[1] = ne((a) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = ne((a) => e.setActive(!1), ["space", "enter"]))
  }, [
    w(e.$slots, "default")
  ], 42, Ba);
}
const Ta = /* @__PURE__ */ F(Ma, [["render", Aa]]), Va = E({
  name: "CdxToggleButtonGroup",
  components: {
    CdxIcon: J,
    CdxToggleButton: Ta
  },
  props: {
    /**
     * Buttons to display. See the ButtonGroupItem type.
     */
    buttons: {
      type: Array,
      required: !0,
      validator: (e) => Array.isArray(e) && e.length >= 1
    },
    /**
     * Selected value, or array of selected values.
     *
     * If this is a string or number, the button whose value equals that string or number is
     * selected, and only a single selection is allowed. If this is an array, the buttons whose
     * values equal any of the values in the array are selected, and multiple selections are
     * allowed. To select none of the buttons initially, set this to `null`
     * (for single-selection groups) or to `[]` (for multi-selection groups).
     *
     * Must be bound with `v-model`.
     */
    modelValue: {
      type: [String, Number, null, Array],
      required: !0
    },
    /**
     * Whether the entire group is disabled.
     *
     * If this is set to true, all buttons in the group are disabled. Buttons can also be
     * disabled individually by setting their `disabled` property to true.
     */
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    /**
     * Emitted when modelValue changes.
     *
     * @property {string | number | ( string | number )[]} modelValue The new model value
     */
    "update:modelValue"
  ],
  setup(e, { emit: t }) {
    function n(l) {
      return Array.isArray(e.modelValue) ? e.modelValue.indexOf(l.value) !== -1 : e.modelValue !== null ? e.modelValue === l.value : !1;
    }
    function s(l, d) {
      if (Array.isArray(e.modelValue)) {
        const a = e.modelValue.indexOf(l.value) !== -1;
        d && !a ? t("update:modelValue", e.modelValue.concat(l.value)) : !d && a && t("update:modelValue", e.modelValue.filter((i) => i !== l.value));
      } else
        d && e.modelValue !== l.value && t("update:modelValue", l.value);
    }
    return {
      getButtonLabel: ft,
      isSelected: n,
      onUpdate: s
    };
  }
});
const La = { class: "cdx-toggle-button-group" };
function Da(e, t, n, s, l, d) {
  const a = x("cdx-icon"), i = x("cdx-toggle-button");
  return u(), m("div", La, [
    (u(!0), m(ge, null, we(e.buttons, (o) => (u(), T(i, {
      key: o.value,
      "model-value": e.isSelected(o),
      disabled: o.disabled || e.disabled,
      "aria-label": o.ariaLabel,
      "onUpdate:modelValue": (r) => e.onUpdate(o, r)
    }, {
      default: V(() => [
        w(e.$slots, "default", {
          button: o,
          selected: e.isSelected(o)
        }, () => [
          o.icon ? (u(), T(a, {
            key: 0,
            icon: o.icon
          }, null, 8, ["icon"])) : I("", !0),
          ae(" " + H(e.getButtonLabel(o)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["model-value", "disabled", "aria-label", "onUpdate:modelValue"]))), 128))
  ]);
}
const cl = /* @__PURE__ */ F(Va, [["render", Da]]), Ka = E({
  name: "CdxToggleSwitch",
  /**
   * The input element will inherit attributes, not the root element.
   */
  inheritAttrs: !1,
  props: {
    /**
     * Current value of the toggle switch or toggle switch group.
     *
     * Provided by `v-model` binding in the parent component.
     */
    modelValue: {
      type: [Boolean, Array],
      default: !1
    },
    /**
     * HTML "value" attribute to assign to the input element.
     *
     * Required for groups of ToggleSwitches. Can be omitted for single true/false switches.
     */
    inputValue: {
      type: [String, Number, Boolean],
      default: !1
    },
    /**
     * Whether to align the switch to the end of the container.
     *
     * Useful for ToggleSwitch groups, where each switch should be aligned regardless of
     * label length.
     */
    alignSwitch: {
      type: Boolean,
      default: !1
    },
    /**
     * Whether the disabled attribute should be added to the input.
     */
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    /**
     * Emitted when modelValue changes.
     *
     * @property {boolean} modelValue The new model value
     */
    "update:modelValue"
  ],
  setup(e, { attrs: t, emit: n }) {
    const s = f(), l = Y("toggle-switch"), d = c(() => ({
      "cdx-toggle-switch--align-switch": e.alignSwitch
    })), {
      rootClasses: a,
      rootStyle: i,
      otherAttrs: o
    } = de(t, d), { computedDisabled: r } = ie(K(e, "disabled")), p = se(K(e, "modelValue"), n);
    return {
      input: s,
      inputId: l,
      rootClasses: a,
      rootStyle: i,
      otherAttrs: o,
      computedDisabled: r,
      wrappedModel: p,
      clickInput: () => {
        s.value.click();
      }
    };
  }
});
const Ea = ["for"], Fa = { class: "cdx-toggle-switch__input-wrapper" }, Ra = ["id", "value", "disabled"], za = /* @__PURE__ */ h("span", { class: "cdx-toggle-switch__switch" }, [
  /* @__PURE__ */ h("span", { class: "cdx-toggle-switch__switch__grip" })
], -1);
function Na(e, t, n, s, l, d) {
  return u(), m("span", {
    class: L(["cdx-toggle-switch", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    e.$slots.default ? (u(), m("label", {
      key: 0,
      for: e.inputId,
      class: "cdx-toggle-switch__label"
    }, [
      w(e.$slots, "default")
    ], 8, Ea)) : I("", !0),
    h("span", Fa, [
      ce(h("input", Z({
        id: e.inputId,
        ref: "input",
        "onUpdate:modelValue": t[0] || (t[0] = (a) => e.wrappedModel = a),
        class: "cdx-toggle-switch__input",
        type: "checkbox",
        value: e.inputValue,
        disabled: e.computedDisabled
      }, e.otherAttrs, {
        onKeydown: t[1] || (t[1] = ne(te((...a) => e.clickInput && e.clickInput(...a), ["prevent"]), ["enter"]))
      }), null, 16, Ra), [
        [et, e.wrappedModel]
      ]),
      za
    ])
  ], 6);
}
const pl = /* @__PURE__ */ F(Ka, [["render", Na]]), Oa = E({
  name: "CdxTypeaheadSearch",
  components: {
    CdxIcon: J,
    CdxMenu: Me,
    CdxSearchInput: ia
  },
  /**
   * Attributes, besides class, will be passed to the TextInput's input element.
   */
  inheritAttrs: !1,
  props: {
    /**
     * ID attribute for the form.
     */
    id: {
      type: String,
      required: !0
    },
    /**
     * Action attribute for form.
     */
    formAction: {
      type: String,
      required: !0
    },
    /**
     * Label attribute for the list of search results.
     */
    searchResultsLabel: {
      type: String,
      required: !0
    },
    /**
     * List of search results. See the SearchResult type.
     */
    searchResults: {
      type: Array,
      required: !0
    },
    /**
     * Label for the submit button.
     *
     * If no label is provided, the submit button will not be displayed.
     */
    buttonLabel: {
      type: String,
      default: ""
    },
    /**
     * Initial value for the text input.
     *
     * Triggers an initial `input` event on mount.
     */
    initialInputValue: {
      type: String,
      default: ""
    },
    /**
     * Link for the final menu item.
     *
     * This will typically be a link to the search page for the current search query.
     */
    searchFooterUrl: {
      type: String,
      default: ""
    },
    /**
     * Time interval for debouncing input events, in ms.
     */
    debounceInterval: {
      type: Number,
      default: Dt
    },
    /**
     * Whether the search query should be highlighted within a search result's title.
     */
    highlightQuery: {
      type: Boolean,
      default: !1
    },
    /**
     * Whether to show search results' thumbnails (or a placeholder icon).
     */
    showThumbnail: {
      type: Boolean,
      default: !1
    },
    /**
     * Contract the width of the input when unfocused and expand the width of
     * the input when focused to accommodate the extra width of the thumbnails.
     *
     * This prop is ignored if showThumbnail is false.
     */
    autoExpandWidth: {
      type: Boolean,
      default: !1
    },
    /**
     * Limit the number of menu items to display before scrolling.
     *
     * Setting this prop to anything falsy will show all menu items.
     *
     * By default, all menu items are shown.
     */
    visibleItemLimit: {
      type: Number,
      default: null
    }
  },
  emits: [
    /**
     * When the text input value changes. Debounced by default.
     *
     * @property {string} value The new input value
     */
    "input",
    /**
     * When a search result is selected.
     *
     * @property {SearchResultClickEvent} event Data for the selected result
     */
    "search-result-click",
    /**
     * When the form is submitted.
     *
     * @property {SearchResultClickEvent} event Data for the selected result
     */
    "submit",
    /**
     * When the user scrolls towards the bottom of the menu.
     *
     * If it is possible to add or load more menu items, then now would be a good moment
     * so that the user can experience infinite scrolling.
     */
    "load-more"
  ],
  setup(e, { attrs: t, emit: n, slots: s }) {
    const l = f(), d = f(), a = Y("typeahead-search-menu"), i = f(!1), o = f(!1), r = f(!1), p = f(!1), y = f(e.initialInputValue), C = f(""), $ = c(() => {
      var _, X;
      return (X = (_ = d.value) == null ? void 0 : _.getHighlightedMenuItem()) == null ? void 0 : X.id;
    }), D = f(null), R = c(() => ({
      "cdx-typeahead-search__menu-message--has-thumbnail": e.showThumbnail
    })), z = c(
      () => e.searchResults.find(
        (_) => _.value === D.value
      )
    ), N = c(
      () => e.searchFooterUrl ? { value: ve, url: e.searchFooterUrl } : void 0
    ), W = c(() => ({
      "cdx-typeahead-search--show-thumbnail": e.showThumbnail,
      "cdx-typeahead-search--expanded": i.value,
      "cdx-typeahead-search--auto-expand-width": e.showThumbnail && e.autoExpandWidth
    })), {
      rootClasses: j,
      rootStyle: P,
      otherAttrs: O
    } = de(t, W);
    function k(_) {
      return _;
    }
    const M = c(() => ({
      visibleItemLimit: e.visibleItemLimit,
      showThumbnail: e.showThumbnail,
      // In case search queries aren't highlighted, default to a bold label.
      boldLabel: !0,
      hideDescriptionOverflow: !0
    }));
    let B, v;
    function b(_, X = !1) {
      z.value && z.value.label !== _ && z.value.value !== _ && (D.value = null), v !== void 0 && (clearTimeout(v), v = void 0), _ === "" ? i.value = !1 : (o.value = !0, s["search-results-pending"] && (v = setTimeout(() => {
        p.value && (i.value = !0), r.value = !0;
      }, Kt))), B !== void 0 && (clearTimeout(B), B = void 0);
      const re = () => {
        n("input", _);
      };
      X ? re() : B = setTimeout(() => {
        re();
      }, e.debounceInterval);
    }
    function S(_) {
      if (_ === ve) {
        D.value = null, y.value = C.value;
        return;
      }
      D.value = _, _ !== null && (y.value = z.value ? z.value.label || String(z.value.value) : "");
    }
    function Q() {
      p.value = !0, (C.value || r.value) && (i.value = !0);
    }
    function ue() {
      p.value = !1, i.value = !1;
    }
    function Ie(_) {
      const He = _, { id: X } = He, re = me(He, ["id"]);
      if (re.value === ve) {
        n("search-result-click", {
          searchResult: null,
          index: e.searchResults.length,
          numberOfResults: e.searchResults.length
        });
        return;
      }
      g(re);
    }
    function g(_) {
      const X = {
        searchResult: _,
        index: e.searchResults.findIndex(
          (re) => re.value === _.value
        ),
        numberOfResults: e.searchResults.length
      };
      n("search-result-click", X);
    }
    function A(_) {
      if (_.value === ve) {
        y.value = C.value;
        return;
      }
      y.value = _.value ? _.label || String(_.value) : "";
    }
    function U(_) {
      var X;
      i.value = !1, (X = d.value) == null || X.clearActive(), Ie(_);
    }
    function G(_) {
      if (z.value)
        g(z.value), _.stopPropagation(), window.location.assign(z.value.url), _.preventDefault();
      else {
        const X = {
          searchResult: null,
          index: -1,
          numberOfResults: e.searchResults.length
        };
        n("submit", X);
      }
    }
    function $e(_) {
      if (!d.value || !C.value || _.key === " ")
        return;
      const X = d.value.getHighlightedMenuItem(), re = d.value.getHighlightedViaKeyboard();
      switch (_.key) {
        case "Enter":
          X && (X.value === ve && re ? window.location.assign(e.searchFooterUrl) : d.value.delegateKeyNavigation(_, !1)), i.value = !1;
          break;
        case "Tab":
          i.value = !1;
          break;
        default:
          d.value.delegateKeyNavigation(_);
          break;
      }
    }
    return fe(() => {
      e.initialInputValue && b(e.initialInputValue, !0);
    }), oe(K(e, "searchResults"), () => {
      C.value = y.value.trim(), p.value && o.value && C.value.length > 0 && (i.value = !0), v !== void 0 && (clearTimeout(v), v = void 0), o.value = !1, r.value = !1;
    }), {
      form: l,
      menu: d,
      menuId: a,
      highlightedId: $,
      selection: D,
      menuMessageClass: R,
      footer: N,
      asSearchResult: k,
      inputValue: y,
      searchQuery: C,
      expanded: i,
      showPending: r,
      rootClasses: j,
      rootStyle: P,
      otherAttrs: O,
      menuConfig: M,
      onUpdateInputValue: b,
      onUpdateMenuSelection: S,
      onFocus: Q,
      onBlur: ue,
      onSearchResultClick: Ie,
      onSearchResultKeyboardNavigation: A,
      onSearchFooterClick: U,
      onSubmit: G,
      onKeydown: $e,
      MenuFooterValue: ve,
      articleIcon: Gt
    };
  },
  methods: {
    /**
     * Focus the component's input element.
     *
     * @public
     */
    focus() {
      this.$refs.searchInput.focus();
    }
  }
});
const Ha = ["id", "action"], qa = { class: "cdx-typeahead-search__menu-message__text" }, ja = { class: "cdx-typeahead-search__menu-message__text" }, Ua = ["href", "onClickCapture"], Wa = { class: "cdx-menu-item__text cdx-typeahead-search__search-footer__text" }, Pa = { class: "cdx-typeahead-search__search-footer__query" };
function Qa(e, t, n, s, l, d) {
  const a = x("cdx-icon"), i = x("cdx-menu"), o = x("cdx-search-input");
  return u(), m("div", {
    class: L(["cdx-typeahead-search", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    h("form", {
      id: e.id,
      ref: "form",
      class: "cdx-typeahead-search__form",
      action: e.formAction,
      onSubmit: t[4] || (t[4] = (...r) => e.onSubmit && e.onSubmit(...r))
    }, [
      q(o, Z({
        ref: "searchInput",
        modelValue: e.inputValue,
        "onUpdate:modelValue": t[3] || (t[3] = (r) => e.inputValue = r),
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
        default: V(() => [
          q(i, Z({
            id: e.menuId,
            ref: "menu",
            expanded: e.expanded,
            "onUpdate:expanded": t[0] || (t[0] = (r) => e.expanded = r),
            "show-pending": e.showPending,
            selected: e.selection,
            "menu-items": e.searchResults,
            footer: e.footer,
            "search-query": e.highlightQuery ? e.searchQuery : "",
            "show-no-results-slot": e.searchQuery.length > 0 && e.searchResults.length === 0 && e.$slots["search-no-results-text"] && e.$slots["search-no-results-text"]().length > 0
          }, e.menuConfig, {
            "aria-label": e.searchResultsLabel,
            "onUpdate:selected": e.onUpdateMenuSelection,
            onMenuItemClick: t[1] || (t[1] = (r) => e.onSearchResultClick(e.asSearchResult(r))),
            onMenuItemKeyboardNavigation: e.onSearchResultKeyboardNavigation,
            onLoadMore: t[2] || (t[2] = (r) => e.$emit("load-more"))
          }), {
            pending: V(() => [
              h("div", {
                class: L(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                h("span", qa, [
                  w(e.$slots, "search-results-pending")
                ])
              ], 2)
            ]),
            "no-results": V(() => [
              h("div", {
                class: L(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                h("span", ja, [
                  w(e.$slots, "search-no-results-text")
                ])
              ], 2)
            ]),
            default: V(({ menuItem: r, active: p }) => [
              r.value === e.MenuFooterValue ? (u(), m("a", {
                key: 0,
                class: L(["cdx-menu-item__content cdx-typeahead-search__search-footer", {
                  "cdx-typeahead-search__search-footer__active": p
                }]),
                href: e.asSearchResult(r).url,
                onClickCapture: te((y) => e.onSearchFooterClick(e.asSearchResult(r)), ["stop"])
              }, [
                q(a, {
                  class: "cdx-menu-item__thumbnail cdx-typeahead-search__search-footer__icon",
                  icon: e.articleIcon
                }, null, 8, ["icon"]),
                h("span", Wa, [
                  w(e.$slots, "search-footer-text", { searchQuery: e.searchQuery }, () => [
                    h("strong", Pa, H(e.searchQuery), 1)
                  ])
                ])
              ], 42, Ua)) : I("", !0)
            ]),
            _: 3
          }, 16, ["id", "expanded", "show-pending", "selected", "menu-items", "footer", "search-query", "show-no-results-slot", "aria-label", "onUpdate:selected", "onMenuItemKeyboardNavigation"])
        ]),
        _: 3
      }, 16, ["modelValue", "button-label", "aria-owns", "aria-expanded", "aria-activedescendant", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
      w(e.$slots, "default")
    ], 40, Ha)
  ], 6);
}
const fl = /* @__PURE__ */ F(Oa, [["render", Qa]]);
export {
  ye as CdxButton,
  Ja as CdxButtonGroup,
  Xa as CdxCard,
  Ya as CdxCheckbox,
  nl as CdxCombobox,
  ol as CdxDialog,
  al as CdxField,
  J as CdxIcon,
  el as CdxInfoChip,
  Ro as CdxLabel,
  ll as CdxLookup,
  Me as CdxMenu,
  oo as CdxMenuItem,
  jo as CdxMessage,
  ro as CdxProgressBar,
  sl as CdxRadio,
  ia as CdxSearchInput,
  Qn as CdxSearchResultTitle,
  il as CdxSelect,
  dl as CdxTab,
  ul as CdxTabs,
  rl as CdxTextArea,
  Re as CdxTextInput,
  mt as CdxThumbnail,
  Ta as CdxToggleButton,
  cl as CdxToggleButtonGroup,
  pl as CdxToggleSwitch,
  fl as CdxTypeaheadSearch,
  tl as stringHelpers,
  pt as useComputedDirection,
  ht as useComputedDisabled,
  an as useComputedLanguage,
  ie as useFieldData,
  Y as useGeneratedId,
  De as useIntersectionObserver,
  se as useModelWrapper,
  Be as useResizeObserver,
  de as useSplitAttributes
};
