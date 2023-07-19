var gt = Object.defineProperty, yt = Object.defineProperties;
var _t = Object.getOwnPropertyDescriptors;
var we = Object.getOwnPropertySymbols;
var Ue = Object.prototype.hasOwnProperty, We = Object.prototype.propertyIsEnumerable;
var je = (e, t, n) => t in e ? gt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Pe = (e, t) => {
  for (var n in t || (t = {}))
    Ue.call(t, n) && je(e, n, t[n]);
  if (we)
    for (var n of we(t))
      We.call(t, n) && je(e, n, t[n]);
  return e;
}, Qe = (e, t) => yt(e, _t(t));
var me = (e, t) => {
  var n = {};
  for (var s in e)
    Ue.call(e, s) && t.indexOf(s) < 0 && (n[s] = e[s]);
  if (e != null && we)
    for (var s of we(e))
      t.indexOf(s) < 0 && We.call(e, s) && (n[s] = e[s]);
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
import { ref as f, onMounted as fe, defineComponent as D, computed as c, openBlock as u, createElementBlock as m, normalizeClass as V, toDisplayString as H, createCommentVNode as $, Comment as $t, warn as It, withKeys as ne, renderSlot as I, getCurrentInstance as Ct, resolveComponent as S, createBlock as A, resolveDynamicComponent as Ce, withCtx as T, createVNode as N, createElementVNode as h, withDirectives as se, vShow as Ie, Fragment as ye, renderList as Se, createTextVNode as ae, Transition as Ke, normalizeStyle as le, inject as pe, toRef as F, withModifiers as te, vModelCheckbox as tt, onUnmounted as Ee, watch as oe, nextTick as $e, mergeProps as X, vModelDynamic as xt, useCssVars as Fe, toRefs as wt, provide as ge, vModelRadio as St, vModelText as kt } from "vue";
const Mt = '<path d="M11.53 2.3A1.85 1.85 0 0010 1.21 1.85 1.85 0 008.48 2.3L.36 16.36C-.48 17.81.21 19 1.88 19h16.24c1.67 0 2.36-1.19 1.52-2.64zM11 16H9v-2h2zm0-4H9V6h2z"/>', Bt = '<path d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"/><circle cx="10" cy="10" r="3"/>', At = '<path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"/>', Tt = '<path d="m4.34 2.93 12.73 12.73-1.41 1.41L2.93 4.35z"/><path d="M17.07 4.34 4.34 17.07l-1.41-1.41L15.66 2.93z"/>', Lt = '<path d="M13.728 1H6.272L1 6.272v7.456L6.272 19h7.456L19 13.728V6.272zM11 15H9v-2h2zm0-4H9V5h2z"/>', Vt = '<path d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"/>', Dt = '<path d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"/><path d="M19 5H1V3h18zm0 12H1v-2h18z"/>', Kt = '<path d="M8 19a1 1 0 001 1h2a1 1 0 001-1v-1H8zm9-12a7 7 0 10-12 4.9S7 14 7 15v1a1 1 0 001 1h4a1 1 0 001-1v-1c0-1 2-3.1 2-3.1A7 7 0 0017 7z"/>', Et = '<path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM9 5h2v2H9zm0 4h2v6H9z"/>', Ft = '<path d="M7 1 5.6 2.5 13 10l-7.4 7.5L7 19l9-9z"/>', zt = '<path d="m4 10 9 9 1.4-1.5L7 10l7.4-7.5L13 1z"/>', Rt = '<path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"/>', Nt = '<path d="M10 20a10 10 0 010-20 10 10 0 110 20Zm-2-5 9-8.5L15.5 5 8 12 4.5 8.5 3 10l5 5Z"/>', nt = Mt, Ot = Bt, qt = At, ot = Tt, at = Lt, ze = Vt, Ht = Dt, jt = {
  langCodeMap: {
    ar: Kt
  },
  default: Et
}, Ut = {
  ltr: Ft,
  shouldFlip: !0
}, Wt = {
  ltr: zt,
  shouldFlip: !0
}, Pt = Rt, lt = Nt;
function Qt(e, t, n) {
  if (typeof e == "string" || "path" in e)
    return e;
  if ("shouldFlip" in e)
    return e.ltr;
  if ("rtl" in e)
    return n === "rtl" ? e.rtl : e.ltr;
  const s = t in e.langCodeMap ? e.langCodeMap[t] : e.default;
  return typeof s == "string" || "path" in s ? s : s.ltr;
}
function Gt(e, t) {
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
function st(e) {
  const t = f(null);
  return fe(() => {
    const n = window.getComputedStyle(e.value).direction;
    t.value = n === "ltr" || n === "rtl" ? n : null;
  }), t;
}
function Zt(e) {
  const t = f("");
  return fe(() => {
    let n = e.value;
    for (; n && n.lang === ""; )
      n = n.parentElement;
    t.value = n ? n.lang : null;
  }), t;
}
function ee(e) {
  return (t) => typeof t == "string" && e.indexOf(t) !== -1;
}
const Te = "cdx", Jt = [
  "default",
  "progressive",
  "destructive"
], Xt = [
  "normal",
  "primary",
  "quiet"
], Yt = [
  "medium",
  "large"
], en = [
  "x-small",
  "small",
  "medium"
], tn = [
  "notice",
  "warning",
  "error",
  "success"
], it = ee(tn), nn = [
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
], on = 120, an = 500, be = "cdx-menu-footer-item", dt = Symbol("CdxTabs"), ut = Symbol("CdxActiveTab"), rt = Symbol("CdxId"), ke = Symbol("CdxDescriptionId"), ct = Symbol("CdxStatus"), pt = Symbol("CdxDisabled"), ln = ee(en), sn = D({
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
    const n = f(), s = st(n), l = Zt(n), d = c(() => e.dir || s.value), a = c(() => e.lang || l.value), i = c(() => ({
      "cdx-icon--flipped": d.value === "rtl" && a.value !== null && Gt(e.icon, a.value),
      [`cdx-icon--${e.size}`]: !0
    })), o = c(
      () => Qt(e.icon, a.value || "", d.value || "ltr")
    ), r = c(() => typeof o.value == "string" ? o.value : ""), p = c(() => typeof o.value != "string" ? o.value.path : "");
    return {
      rootElement: n,
      rootClasses: i,
      iconSvg: r,
      iconPath: p,
      onClick: (x) => {
        t("click", x);
      }
    };
  }
});
const K = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, l] of t)
    n[s] = l;
  return n;
}, dn = ["aria-hidden"], un = { key: 0 }, rn = ["innerHTML"], cn = ["d"];
function pn(e, t, n, s, l, d) {
  return u(), m("span", {
    ref: "rootElement",
    class: V(["cdx-icon", e.rootClasses]),
    onClick: t[0] || (t[0] = (...a) => e.onClick && e.onClick(...a))
  }, [
    (u(), m("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      "aria-hidden": e.iconLabel ? void 0 : !0
    }, [
      e.iconLabel ? (u(), m("title", un, H(e.iconLabel), 1)) : $("", !0),
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
const G = /* @__PURE__ */ K(sn, [["render", pn]]), fn = ee(Jt), mn = ee(Xt), hn = ee(Yt), vn = (e) => {
  !e["aria-label"] && !e["aria-hidden"] && It(`icon-only buttons require one of the following attribute: aria-label or aria-hidden.
		See documentation on https://doc.wikimedia.org/codex/latest/components/demos/button.html#icon-only-button-1`);
};
function Ve(e) {
  const t = [];
  for (const n of e)
    typeof n == "string" && n.trim() !== "" ? t.push(n) : Array.isArray(n) ? t.push(...Ve(n)) : typeof n == "object" && n && (// HTML tag
    typeof n.type == "string" || // Component
    typeof n.type == "object" ? t.push(n) : n.type !== $t && (typeof n.children == "string" && n.children.trim() !== "" ? t.push(n.children) : Array.isArray(n.children) && t.push(...Ve(n.children))));
  return t;
}
const bn = (e, t) => {
  if (!e)
    return !1;
  const n = Ve(e);
  if (n.length !== 1)
    return !1;
  const s = n[0], l = typeof s == "object" && typeof s.type == "object" && "name" in s.type && s.type.name === G.name, d = typeof s == "object" && s.type === "svg";
  return l || d ? (vn(t), !0) : !1;
}, gn = D({
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
    class: V(["cdx-button", e.rootClasses]),
    onClick: t[0] || (t[0] = (...a) => e.onClick && e.onClick(...a)),
    onKeydown: t[1] || (t[1] = ne((a) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = ne((a) => e.setActive(!1), ["space", "enter"]))
  }, [
    I(e.$slots, "default")
  ], 34);
}
const ve = /* @__PURE__ */ K(gn, [["render", yn]]);
let Le = 0;
function J(e) {
  const t = Ct(), n = (t == null ? void 0 : t.props.id) || (t == null ? void 0 : t.attrs.id);
  return e ? `${Te}-${e}-${Le++}` : n ? `${Te}-${n}-${Le++}` : `${Te}-${Le++}`;
}
const _n = D({
  name: "CdxAccordion",
  components: { CdxButton: ve, CdxIcon: G },
  props: {
    /**
     * Forces the accordion to show the action icon.
     *
     * @values 'true', 'false'
     */
    actionAlwaysVisible: {
      type: Boolean,
      default: !1
    },
    /**
     * The icon that will be displayed on the right side of the accordion header when expanded.
     *
     */
    actionIcon: {
      type: [String, Object],
      default: null
    },
    /**
     * Label for the action button. If an action icon is being used, then a label for that icon
     * should be provided for ARIA support.
     */
    actionButtonLabel: {
      type: String,
      default: ""
    },
    /**
     * The heading level of the accordion title.
     *
     * @values 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
     */
    headingLevel: {
      type: String,
      default: "h3"
    }
  },
  emits: [
    /**
     * When the action button is clicked.
     *
     */
    "action-button-click"
  ],
  setup(e, { emit: t }) {
    const n = f(!1), s = J("accordion"), l = J("accordion-panel"), d = () => {
      n.value = !n.value;
    }, a = () => {
      t("action-button-click");
    }, i = c(() => e.actionIcon && (n.value || e.actionAlwaysVisible)), o = c(() => ({
      "cdx-accordion--has-icon": i
    }));
    return {
      cdxIconExpand: ze,
      emitActionButtonClick: a,
      isExpanded: n,
      rootClasses: o,
      shouldShowActionButton: i,
      toggle: d,
      accordionId: s,
      accordionPanelId: l
    };
  }
});
const $n = { class: "cdx-accordion__toggle__title" }, In = { class: "cdx-accordion__toggle__title-text" }, Cn = { class: "cdx-accordion__toggle__description" }, xn = ["id", "aria-labelledby", "aria-hidden"];
function wn(e, t, n, s, l, d) {
  const a = S("cdx-icon"), i = S("cdx-button");
  return u(), m("div", {
    class: V(["cdx-accordion", e.rootClasses])
  }, [
    (u(), A(Ce(e.headingLevel), { class: "cdx-accordion__header" }, {
      default: T(() => [
        N(i, {
          id: e.accordionId,
          "aria-expanded": e.isExpanded,
          "aria-controls": e.accordionPanelId,
          class: "cdx-accordion__toggle",
          type: "button",
          weight: "quiet",
          onClick: e.toggle
        }, {
          default: T(() => [
            h("span", $n, [
              N(a, {
                class: "cdx-accordion__toggle__title-icon",
                icon: e.cdxIconExpand,
                size: "small"
              }, null, 8, ["icon"]),
              h("span", In, [
                I(e.$slots, "title")
              ])
            ]),
            h("span", Cn, [
              I(e.$slots, "description")
            ])
          ]),
          _: 3
        }, 8, ["id", "aria-expanded", "aria-controls", "onClick"]),
        e.shouldShowActionButton ? (u(), A(i, {
          key: 0,
          class: "cdx-accordion__action",
          "aria-label": e.actionButtonLabel,
          type: "button",
          weight: "quiet",
          onClick: e.emitActionButtonClick
        }, {
          default: T(() => [
            N(a, {
              icon: e.actionIcon,
              "icon-label": e.actionButtonLabel,
              size: "medium"
            }, null, 8, ["icon", "icon-label"])
          ]),
          _: 1
        }, 8, ["aria-label", "onClick"])) : $("", !0)
      ]),
      _: 3
    })),
    se(h("div", {
      id: e.accordionPanelId,
      "aria-labelledby": e.accordionId,
      "aria-hidden": e.isExpanded ? void 0 : !0,
      class: "cdx-accordion__content",
      role: "region"
    }, [
      I(e.$slots, "default")
    ], 8, xn), [
      [Ie, e.isExpanded]
    ])
  ], 2);
}
const ol = /* @__PURE__ */ K(_n, [["render", wn]]);
function ft(e) {
  return e.label === void 0 ? e.value : e.label === null ? "" : e.label;
}
const Sn = D({
  name: "CdxButtonGroup",
  components: {
    CdxButton: ve,
    CdxIcon: G
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
const kn = { class: "cdx-button-group" };
function Mn(e, t, n, s, l, d) {
  const a = S("cdx-icon"), i = S("cdx-button");
  return u(), m("div", kn, [
    (u(!0), m(ye, null, Se(e.buttons, (o) => (u(), A(i, {
      key: o.value,
      disabled: o.disabled || e.disabled,
      "aria-label": o.ariaLabel,
      onClick: (r) => e.$emit("click", o.value)
    }, {
      default: T(() => [
        I(e.$slots, "default", { button: o }, () => [
          o.icon ? (u(), A(a, {
            key: 0,
            icon: o.icon
          }, null, 8, ["icon"])) : $("", !0),
          ae(" " + H(e.getButtonLabel(o)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["disabled", "aria-label", "onClick"]))), 128))
  ]);
}
const al = /* @__PURE__ */ K(Sn, [["render", Mn]]), Bn = D({
  name: "CdxThumbnail",
  components: { CdxIcon: G },
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
      default: Ht
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
const An = { class: "cdx-thumbnail" }, Tn = {
  key: 0,
  class: "cdx-thumbnail__placeholder"
};
function Ln(e, t, n, s, l, d) {
  const a = S("cdx-icon");
  return u(), m("span", An, [
    e.thumbnailLoaded ? $("", !0) : (u(), m("span", Tn, [
      N(a, {
        icon: e.placeholderIcon,
        class: "cdx-thumbnail__placeholder__icon--vue"
      }, null, 8, ["icon"])
    ])),
    N(Ke, { name: "cdx-thumbnail__image" }, {
      default: T(() => [
        e.thumbnailLoaded ? (u(), m("span", {
          key: 0,
          style: le(e.thumbnailStyle),
          class: "cdx-thumbnail__image"
        }, null, 4)) : $("", !0)
      ]),
      _: 1
    })
  ]);
}
const mt = /* @__PURE__ */ K(Bn, [["render", Ln]]), Vn = D({
  name: "CdxCard",
  components: { CdxIcon: G, CdxThumbnail: mt },
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
const Dn = { class: "cdx-card__text" }, Kn = { class: "cdx-card__text__title" }, En = {
  key: 0,
  class: "cdx-card__text__description"
}, Fn = {
  key: 1,
  class: "cdx-card__text__supporting-text"
};
function zn(e, t, n, s, l, d) {
  const a = S("cdx-thumbnail"), i = S("cdx-icon");
  return u(), A(Ce(e.contentTag), {
    href: e.cardLink,
    class: V(["cdx-card", {
      "cdx-card--is-link": e.isLink,
      // Include dynamic classes in the template so that $slots is reactive.
      "cdx-card--title-only": !e.$slots.description && !e.$slots["supporting-text"]
    }])
  }, {
    default: T(() => [
      e.thumbnail || e.forceThumbnail ? (u(), A(a, {
        key: 0,
        thumbnail: e.thumbnail,
        "placeholder-icon": e.customPlaceholderIcon,
        class: "cdx-card__thumbnail"
      }, null, 8, ["thumbnail", "placeholder-icon"])) : e.icon ? (u(), A(i, {
        key: 1,
        icon: e.icon,
        class: "cdx-card__icon"
      }, null, 8, ["icon"])) : $("", !0),
      h("span", Dn, [
        h("span", Kn, [
          I(e.$slots, "title")
        ]),
        e.$slots.description ? (u(), m("span", En, [
          I(e.$slots, "description")
        ])) : $("", !0),
        e.$slots["supporting-text"] ? (u(), m("span", Fn, [
          I(e.$slots, "supporting-text")
        ])) : $("", !0)
      ])
    ]),
    _: 3
  }, 8, ["href", "class"]);
}
const ll = /* @__PURE__ */ K(Vn, [["render", zn]]);
function ie(e, t, n) {
  return c({
    get: () => e.value,
    set: (s) => (
      // If eventName is undefined, then 'update:modelValue' must be a valid EventName,
      // but TypeScript's type analysis isn't clever enough to realize that
      t(n || "update:modelValue", s)
    )
  });
}
function ht(e) {
  const t = pe(pt, f(!1));
  return c(() => t.value || e.value);
}
function de(e, t, n) {
  const s = ht(e), l = pe(ct, f("default")), d = c(() => t != null && t.value && t.value !== "default" ? t.value : l.value), a = pe(rt, void 0), i = c(() => a || n);
  return {
    computedDisabled: s,
    computedStatus: d,
    computedInputId: i
  };
}
const Rn = D({
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
    })), { computedDisabled: s } = de(F(e, "disabled")), l = f(), d = J("checkbox"), a = () => {
      l.value.click();
    }, i = ie(F(e, "modelValue"), t);
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
const Nn = ["id", "value", "disabled", ".indeterminate"], On = /* @__PURE__ */ h("span", { class: "cdx-checkbox__icon" }, null, -1), qn = ["for"];
function Hn(e, t, n, s, l, d) {
  return u(), m("span", {
    class: V(["cdx-checkbox", e.rootClasses])
  }, [
    se(h("input", {
      id: e.checkboxId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (a) => e.wrappedModel = a),
      class: "cdx-checkbox__input",
      type: "checkbox",
      value: e.inputValue,
      disabled: e.computedDisabled,
      ".indeterminate": e.indeterminate,
      onKeydown: t[1] || (t[1] = ne(te((...a) => e.clickInput && e.clickInput(...a), ["prevent"]), ["enter"]))
    }, null, 40, Nn), [
      [tt, e.wrappedModel]
    ]),
    On,
    h("label", {
      class: "cdx-checkbox__label",
      for: e.checkboxId
    }, [
      I(e.$slots, "default")
    ], 8, qn)
  ], 2);
}
const sl = /* @__PURE__ */ K(Rn, [["render", Hn]]), jn = {
  error: at,
  warning: nt,
  success: lt
}, Un = D({
  name: "CdxInfoChip",
  components: { CdxIcon: G },
  props: {
    /**
     * Status type.
     *
     * @values 'notice', 'warning', 'error', 'success'
     */
    status: {
      type: String,
      default: "notice",
      validator: it
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
      () => e.status === "notice" ? e.icon : jn[e.status]
    );
    return {
      iconClass: t,
      computedIcon: n
    };
  }
});
const Wn = { class: "cdx-info-chip" }, Pn = { class: "cdx-info-chip--text" };
function Qn(e, t, n, s, l, d) {
  const a = S("cdx-icon");
  return u(), m("div", Wn, [
    e.computedIcon ? (u(), A(a, {
      key: 0,
      class: V(["cdx-info-chip__icon", e.iconClass]),
      icon: e.computedIcon
    }, null, 8, ["class", "icon"])) : $("", !0),
    h("span", Pn, [
      I(e.$slots, "default")
    ])
  ]);
}
const il = /* @__PURE__ */ K(Un, [["render", Qn]]);
function vt(e) {
  return e.replace(/([\\{}()|.?*+\-^$[\]])/g, "\\$1");
}
const Gn = "[̀-ͯ҃-҉֑-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣঁ-ঃ়া-ৄেৈো-্ৗৢৣ৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑੰੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣஂா-ூெ-ைொ-்ௗఀ-ఄా-ౄె-ైొ-్ౕౖౢౣಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣංඃ්ා-ුූෘ-ෟෲෳัิ-ฺ็-๎ັິ-ູົຼ່-ໍ༹༘༙༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏႚ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝᠋-᠍ᢅᢆᢩᤠ-ᤫᤰ-᤻ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼᪰-᪾ᬀ-ᬄ᬴-᭄᭫-᭳ᮀ-ᮂᮡ-ᮭ᯦-᯳ᰤ-᰷᳐-᳔᳒-᳨᳭ᳲ-᳴᳷-᳹᷀-᷹᷻-᷿⃐-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯-꙲ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣠-꣱ꣿꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀ꧥꨩ-ꨶꩃꩌꩍꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭ﬞ︀-️︠-︯]";
function bt(e, t) {
  if (!e)
    return [t, "", ""];
  const n = vt(e), s = new RegExp(
    // Per https://www.regular-expressions.info/unicode.html, "any code point that is not a
    // combining mark can be followed by any number of combining marks." See also the
    // discussion in https://phabricator.wikimedia.org/T35242.
    n + Gn + "*",
    "i"
  ).exec(t);
  if (!s || s.index === void 0)
    return [t, "", ""];
  const l = s.index, d = l + s[0].length, a = t.slice(l, d), i = t.slice(0, l), o = t.slice(d, t.length);
  return [i, a, o];
}
const dl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  regExpEscape: vt,
  splitStringAtMatch: bt
}, Symbol.toStringTag, { value: "Module" })), Zn = D({
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
const Jn = { class: "cdx-search-result-title" }, Xn = { class: "cdx-search-result-title__match" };
function Yn(e, t, n, s, l, d) {
  return u(), m("span", Jn, [
    h("bdi", null, [
      ae(H(e.titleChunks[0]), 1),
      h("span", Xn, H(e.titleChunks[1]), 1),
      ae(H(e.titleChunks[2]), 1)
    ])
  ]);
}
const eo = /* @__PURE__ */ K(Zn, [["render", Yn]]), to = D({
  name: "CdxMenuItem",
  components: { CdxIcon: G, CdxThumbnail: mt, CdxSearchResultTitle: eo },
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
const no = ["id", "aria-disabled", "aria-selected"], oo = { class: "cdx-menu-item__text" }, ao = ["lang"], lo = ["lang"], so = ["lang"], io = ["lang"];
function uo(e, t, n, s, l, d) {
  const a = S("cdx-thumbnail"), i = S("cdx-icon"), o = S("cdx-search-result-title");
  return u(), m("li", {
    id: e.id,
    role: "option",
    class: V(["cdx-menu-item", e.rootClasses]),
    "aria-disabled": e.disabled,
    "aria-selected": e.selected,
    onMousemove: t[0] || (t[0] = (...r) => e.onMouseMove && e.onMouseMove(...r)),
    onMouseleave: t[1] || (t[1] = (...r) => e.onMouseLeave && e.onMouseLeave(...r)),
    onMousedown: t[2] || (t[2] = te((...r) => e.onMouseDown && e.onMouseDown(...r), ["prevent"])),
    onClick: t[3] || (t[3] = (...r) => e.onClick && e.onClick(...r))
  }, [
    I(e.$slots, "default", {}, () => [
      (u(), A(Ce(e.contentTag), {
        href: e.url ? e.url : void 0,
        class: "cdx-menu-item__content"
      }, {
        default: T(() => {
          var r, p, y, x, _, E;
          return [
            e.showThumbnail ? (u(), A(a, {
              key: 0,
              thumbnail: e.thumbnail,
              class: "cdx-menu-item__thumbnail"
            }, null, 8, ["thumbnail"])) : e.icon ? (u(), A(i, {
              key: 1,
              icon: e.icon,
              class: "cdx-menu-item__icon"
            }, null, 8, ["icon"])) : $("", !0),
            h("span", oo, [
              e.highlightQuery ? (u(), A(o, {
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
              ], 8, ao)),
              e.match ? (u(), m(ye, { key: 2 }, [
                ae(H(" ") + " "),
                e.highlightQuery ? (u(), A(o, {
                  key: 0,
                  title: e.match,
                  "search-query": e.searchQuery,
                  lang: (y = e.language) == null ? void 0 : y.match
                }, null, 8, ["title", "search-query", "lang"])) : (u(), m("span", {
                  key: 1,
                  class: "cdx-menu-item__text__match",
                  lang: (x = e.language) == null ? void 0 : x.match
                }, [
                  h("bdi", null, H(e.match), 1)
                ], 8, lo))
              ], 64)) : $("", !0),
              e.supportingText ? (u(), m(ye, { key: 3 }, [
                ae(H(" ") + " "),
                h("span", {
                  class: "cdx-menu-item__text__supporting-text",
                  lang: (_ = e.language) == null ? void 0 : _.supportingText
                }, [
                  h("bdi", null, H(e.supportingText), 1)
                ], 8, so)
              ], 64)) : $("", !0),
              e.description ? (u(), m("span", {
                key: 4,
                class: "cdx-menu-item__text__description",
                lang: (E = e.language) == null ? void 0 : E.description
              }, [
                h("bdi", null, H(e.description), 1)
              ], 8, io)) : $("", !0)
            ])
          ];
        }),
        _: 1
      }, 8, ["href"]))
    ])
  ], 42, no);
}
const ro = /* @__PURE__ */ K(to, [["render", uo]]), co = D({
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
const po = ["aria-disabled"], fo = /* @__PURE__ */ h("div", { class: "cdx-progress-bar__bar" }, null, -1), mo = [
  fo
];
function ho(e, t, n, s, l, d) {
  return u(), m("div", {
    class: V(["cdx-progress-bar", e.rootClasses]),
    role: "progressbar",
    "aria-disabled": e.disabled,
    "aria-valuemin": "0",
    "aria-valuemax": "100"
  }, mo, 10, po);
}
const vo = /* @__PURE__ */ K(co, [["render", ho]]);
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
function ue(e, t = c(() => ({}))) {
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
const bo = D({
  name: "CdxMenu",
  components: {
    CdxMenuItem: ro,
    CdxProgressBar: vo
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
    const l = c(() => (e.footer && e.menuItems ? [...e.menuItems, e.footer] : e.menuItems).map((L) => Qe(Pe({}, L), {
      id: J("menu-item")
    }))), d = c(() => n["no-results"] ? e.showNoResultsSlot !== null ? e.showNoResultsSlot : l.value.length === 0 : !1), a = f(null), i = f(!1), o = f(null);
    function r() {
      return l.value.find(
        (g) => g.value === e.selected
      );
    }
    function p(g, L) {
      var U;
      if (!(L && L.disabled))
        switch (g) {
          case "selected":
            t("update:selected", (U = L == null ? void 0 : L.value) != null ? U : null), t("update:expanded", !1), o.value = null;
            break;
          case "highlighted":
            a.value = L || null, i.value = !1;
            break;
          case "highlightedViaKeyboard":
            a.value = L || null, i.value = !0;
            break;
          case "active":
            o.value = L || null;
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
    function x(g) {
      g && (p("highlightedViaKeyboard", g), t("menu-item-keyboard-navigation", g));
    }
    function _(g) {
      var Z;
      const L = (_e) => {
        for (let C = _e - 1; C >= 0; C--)
          if (!l.value[C].disabled)
            return l.value[C];
      };
      g = g || l.value.length;
      const U = (Z = L(g)) != null ? Z : L(l.value.length);
      x(U);
    }
    function E(g) {
      const L = (Z) => l.value.find((_e, C) => !_e.disabled && C > Z);
      g = g != null ? g : -1;
      const U = L(g) || L(-1);
      x(U);
    }
    function z(g, L = !0) {
      function U() {
        t("update:expanded", !0), p("highlighted", r());
      }
      function Z() {
        L && (g.preventDefault(), g.stopPropagation());
      }
      switch (g.key) {
        case "Enter":
        case " ":
          return Z(), e.expanded ? (a.value && i.value && t("update:selected", a.value.value), t("update:expanded", !1)) : U(), !0;
        case "Tab":
          return e.expanded && (a.value && i.value && t("update:selected", a.value.value), t("update:expanded", !1)), !0;
        case "ArrowUp":
          return Z(), e.expanded ? (a.value === null && p("highlightedViaKeyboard", r()), _(y.value)) : U(), q(), !0;
        case "ArrowDown":
          return Z(), e.expanded ? (a.value === null && p("highlightedViaKeyboard", r()), E(y.value)) : U(), q(), !0;
        case "Home":
          return Z(), e.expanded ? (a.value === null && p("highlightedViaKeyboard", r()), E()) : U(), q(), !0;
        case "End":
          return Z(), e.expanded ? (a.value === null && p("highlightedViaKeyboard", r()), _()) : U(), q(), !0;
        case "Escape":
          return Z(), t("update:expanded", !1), !0;
        default:
          return !1;
      }
    }
    function R() {
      p("active");
    }
    const O = [], W = f(void 0), j = De(
      W,
      { threshold: 0.8 }
    );
    oe(j, (g) => {
      g && t("load-more");
    });
    function P(g, L) {
      if (g) {
        O[L] = g.$el;
        const U = e.visibleItemLimit;
        if (!U || e.menuItems.length < U)
          return;
        const Z = Math.min(
          U,
          Math.max(2, Math.floor(0.2 * e.menuItems.length))
        );
        L === e.menuItems.length - Z && (W.value = g.$el);
      }
    }
    function q() {
      if (!e.visibleItemLimit || e.visibleItemLimit > e.menuItems.length || y.value === void 0)
        return;
      const g = y.value >= 0 ? y.value : 0;
      O[g].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
    const k = f(null), M = f(null);
    function B() {
      if (M.value = null, !e.visibleItemLimit || O.length <= e.visibleItemLimit) {
        k.value = null;
        return;
      }
      const g = O[0], L = O[e.visibleItemLimit];
      if (k.value = v(
        g,
        L
      ), e.footer) {
        const U = O[O.length - 1];
        M.value = U.scrollHeight;
      }
    }
    function v(g, L) {
      const U = g.getBoundingClientRect().top;
      return L.getBoundingClientRect().top - U + 2;
    }
    fe(() => {
      document.addEventListener("mouseup", R);
    }), Ee(() => {
      document.removeEventListener("mouseup", R);
    }), oe(F(e, "expanded"), (g) => Ae(this, null, function* () {
      const L = r();
      !g && a.value && L === void 0 && p("highlighted"), g && L !== void 0 && p("highlighted", L), g && (yield $e(), B(), yield $e(), q());
    })), oe(F(e, "menuItems"), (g) => Ae(this, null, function* () {
      g.length < O.length && (O.length = g.length), e.expanded && (yield $e(), B(), yield $e(), q());
    }), { deep: !0 });
    const b = c(() => ({
      "max-height": k.value ? `${k.value}px` : void 0,
      "overflow-y": k.value ? "scroll" : void 0,
      "margin-bottom": M.value ? `${M.value}px` : void 0
    })), w = c(() => ({
      "cdx-menu--has-footer": !!e.footer,
      "cdx-menu--has-sticky-footer": !!e.footer && !!k.value
    })), {
      rootClasses: Q,
      rootStyle: re,
      otherAttrs: xe
    } = ue(s, w);
    return {
      listBoxStyle: b,
      rootClasses: Q,
      rootStyle: re,
      otherAttrs: xe,
      assignTemplateRef: P,
      computedMenuItems: l,
      computedShowNoResultsSlot: d,
      highlightedMenuItem: a,
      highlightedViaKeyboard: i,
      activeMenuItem: o,
      handleMenuItemChange: p,
      handleKeyNavigation: z
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
const go = {
  key: 0,
  class: "cdx-menu__pending cdx-menu-item"
}, yo = {
  key: 1,
  class: "cdx-menu__no-results cdx-menu-item"
};
function _o(e, t, n, s, l, d) {
  const a = S("cdx-menu-item"), i = S("cdx-progress-bar");
  return se((u(), m("div", {
    class: V(["cdx-menu", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    h("ul", X({
      class: "cdx-menu__listbox",
      role: "listbox",
      "aria-multiselectable": "false",
      style: e.listBoxStyle
    }, e.otherAttrs), [
      e.showPending && e.computedMenuItems.length === 0 && e.$slots.pending ? (u(), m("li", go, [
        I(e.$slots, "pending")
      ])) : $("", !0),
      e.computedShowNoResultsSlot ? (u(), m("li", yo, [
        I(e.$slots, "no-results")
      ])) : $("", !0),
      (u(!0), m(ye, null, Se(e.computedMenuItems, (o, r) => {
        var p, y;
        return u(), A(a, X({
          key: o.value,
          ref_for: !0,
          ref: (x) => e.assignTemplateRef(x, r)
        }, o, {
          selected: o.value === e.selected,
          active: o.value === ((p = e.activeMenuItem) == null ? void 0 : p.value),
          highlighted: o.value === ((y = e.highlightedMenuItem) == null ? void 0 : y.value),
          "show-thumbnail": e.showThumbnail,
          "bold-label": e.boldLabel,
          "hide-description-overflow": e.hideDescriptionOverflow,
          "search-query": e.searchQuery,
          onChange: (x, _) => e.handleMenuItemChange(x, _ && o),
          onClick: (x) => e.$emit("menu-item-click", o)
        }), {
          default: T(() => {
            var x, _;
            return [
              I(e.$slots, "default", {
                menuItem: o,
                active: o.value === ((x = e.activeMenuItem) == null ? void 0 : x.value) && o.value === ((_ = e.highlightedMenuItem) == null ? void 0 : _.value)
              })
            ];
          }),
          _: 2
        }, 1040, ["selected", "active", "highlighted", "show-thumbnail", "bold-label", "hide-description-overflow", "search-query", "onChange", "onClick"]);
      }), 128)),
      e.showPending ? (u(), A(i, {
        key: 2,
        class: "cdx-menu__progress-bar",
        inline: !0
      })) : $("", !0)
    ], 16)
  ], 6)), [
    [Ie, e.expanded]
  ]);
}
const Me = /* @__PURE__ */ K(bo, [["render", _o]]), $o = ee(nn), Io = ee(he), Co = D({
  name: "CdxTextInput",
  components: { CdxIcon: G },
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
      validator: $o
    },
    /**
     * `status` attribute of the input.
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: Io
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
    } = de(
      F(e, "disabled"),
      F(e, "status"),
      s
    ), i = pe(ke, void 0), o = ie(F(e, "modelValue"), t), r = c(() => e.clearable && !!o.value && !l.value), p = c(() => ({
      "cdx-text-input--has-start-icon": !!e.startIcon,
      "cdx-text-input--has-end-icon": !!e.endIcon,
      "cdx-text-input--clearable": r.value,
      [`cdx-text-input--status-${d.value}`]: !0
    })), {
      rootClasses: y,
      rootStyle: x,
      otherAttrs: _
    } = ue(n, p), E = c(() => {
      const B = _.value, { id: k } = B;
      return me(B, ["id"]);
    }), z = c(() => ({
      "cdx-text-input__input--has-value": !!o.value
    }));
    return {
      computedInputId: a,
      descriptionId: i,
      wrappedModel: o,
      isClearable: r,
      rootClasses: y,
      rootStyle: x,
      otherAttrsMinusId: E,
      inputClasses: z,
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
      cdxIconClear: qt
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
const xo = ["id", "type", "aria-describedby", "disabled"];
function wo(e, t, n, s, l, d) {
  const a = S("cdx-icon");
  return u(), m("div", {
    class: V(["cdx-text-input", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    se(h("input", X({
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
    }), null, 16, xo), [
      [xt, e.wrappedModel]
    ]),
    e.startIcon ? (u(), A(a, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__start-icon"
    }, null, 8, ["icon"])) : $("", !0),
    e.endIcon ? (u(), A(a, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__end-icon"
    }, null, 8, ["icon"])) : $("", !0),
    e.isClearable ? (u(), A(a, {
      key: 2,
      icon: e.cdxIconClear,
      class: "cdx-text-input__icon-vue cdx-text-input__clear-icon",
      onMousedown: t[6] || (t[6] = te(() => {
      }, ["prevent"])),
      onClick: e.onClear
    }, null, 8, ["icon", "onClick"])) : $("", !0)
  ], 6);
}
const Re = /* @__PURE__ */ K(Co, [["render", wo]]);
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
const So = ee(he), Ne = D({
  name: "CdxCombobox",
  components: {
    CdxButton: ve,
    CdxIcon: G,
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
      validator: So
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
    const l = f(), d = f(), a = f(), i = J("combobox"), o = F(e, "selected"), r = ie(o, t, "update:selected"), p = f(!1), y = f(!1), x = c(() => {
      var v, b;
      return (b = (v = a.value) == null ? void 0 : v.getHighlightedMenuItem()) == null ? void 0 : b.id;
    }), { computedDisabled: _ } = de(F(e, "disabled")), E = c(() => ({
      "cdx-combobox--expanded": p.value,
      "cdx-combobox--disabled": _.value
    })), z = Be(d), R = c(() => {
      var v;
      return `${(v = z.value.width) != null ? v : 0}px`;
    }), {
      rootClasses: O,
      rootStyle: W,
      otherAttrs: j
    } = ue(n, E);
    function P(v) {
      y.value && p.value ? p.value = !1 : (e.menuItems.length > 0 || s["no-results"]) && (p.value = !0), t("focus", v);
    }
    function q(v) {
      p.value = y.value && p.value, t("blur", v);
    }
    function k() {
      _.value || (y.value = !0);
    }
    function M() {
      var v;
      _.value || (v = l.value) == null || v.focus();
    }
    function B(v) {
      !a.value || _.value || e.menuItems.length === 0 || v.key === " " || a.value.delegateKeyNavigation(v);
    }
    return oe(p, () => {
      y.value = !1;
    }), {
      input: l,
      inputWrapper: d,
      currentWidthInPx: R,
      menu: a,
      menuId: i,
      modelWrapper: r,
      expanded: p,
      highlightedId: x,
      computedDisabled: _,
      onInputFocus: P,
      onInputBlur: q,
      onKeydown: B,
      onButtonClick: M,
      onButtonMousedown: k,
      cdxIconExpand: ze,
      rootClasses: O,
      rootStyle: W,
      otherAttrs: j
    };
  }
}), Ge = () => {
  Fe((e) => ({
    "1a5f8de7": e.currentWidthInPx
  }));
}, Ze = Ne.setup;
Ne.setup = Ze ? (e, t) => (Ge(), Ze(e, t)) : Ge;
const ko = {
  ref: "inputWrapper",
  class: "cdx-combobox__input-wrapper"
};
function Mo(e, t, n, s, l, d) {
  const a = S("cdx-text-input"), i = S("cdx-icon"), o = S("cdx-button"), r = S("cdx-menu");
  return u(), m("div", {
    class: V(["cdx-combobox", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    h("div", ko, [
      N(a, X({
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
      N(o, {
        class: "cdx-combobox__expand-button",
        "aria-hidden": "true",
        disabled: e.computedDisabled,
        tabindex: "-1",
        type: "button",
        onMousedown: e.onButtonMousedown,
        onClick: e.onButtonClick
      }, {
        default: T(() => [
          N(i, {
            class: "cdx-combobox__expand-icon",
            icon: e.cdxIconExpand
          }, null, 8, ["icon"])
        ]),
        _: 1
      }, 8, ["disabled", "onMousedown", "onClick"])
    ], 512),
    N(r, X({
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
      default: T(({ menuItem: p }) => [
        I(e.$slots, "menu-item", { menuItem: p })
      ]),
      "no-results": T(() => [
        I(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const ul = /* @__PURE__ */ K(Ne, [["render", Mo]]), Bo = D({
  name: "CdxDialog",
  components: {
    CdxButton: ve,
    CdxIcon: G
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
    const n = J("dialog-label"), s = f(), l = f(), d = f(), a = f(), i = f(), o = c(() => !e.hideTitle || !!e.closeButtonLabel), r = c(() => !!e.primaryAction || !!e.defaultAction), p = Be(l), y = c(() => {
      var j;
      return (j = p.value.height) != null ? j : 0;
    }), x = f(!1), _ = c(() => ({
      "cdx-dialog--vertical-actions": e.stackedActions,
      "cdx-dialog--horizontal-actions": !e.stackedActions,
      "cdx-dialog--dividers": x.value
    })), E = f(0);
    function z() {
      t("update:open", !1);
    }
    function R() {
      W(s.value);
    }
    function O() {
      W(s.value, !0);
    }
    function W(j, P = !1) {
      let q = Array.from(
        j.querySelectorAll(`
					input, select, textarea, button, object, a, area,
					[contenteditable], [tabindex]:not([tabindex^="-"])
				`)
      );
      P && (q = q.reverse());
      for (const k of q)
        if (k.focus(), document.activeElement === k)
          return !0;
      return !1;
    }
    return oe(F(e, "open"), (j) => {
      j ? (E.value = window.innerWidth - document.documentElement.clientWidth, document.documentElement.style.setProperty("margin-right", `${E.value}px`), document.body.classList.add("cdx-dialog-open"), $e(() => {
        var P;
        W(l.value) || (P = d.value) == null || P.focus();
      })) : (document.body.classList.remove("cdx-dialog-open"), document.documentElement.style.removeProperty("margin-right"));
    }), oe(y, () => {
      l.value && (x.value = l.value.clientHeight < l.value.scrollHeight);
    }), {
      close: z,
      cdxIconClose: ot,
      labelId: n,
      rootClasses: _,
      dialogElement: s,
      focusTrapStart: a,
      focusTrapEnd: i,
      focusFirst: R,
      focusLast: O,
      dialogBody: l,
      focusHolder: d,
      showHeader: o,
      showFooterActions: r
    };
  }
});
const Ao = ["aria-label", "aria-labelledby"], To = {
  key: 0,
  class: "cdx-dialog__header__title-group"
}, Lo = ["id"], Vo = {
  key: 0,
  class: "cdx-dialog__header__subtitle"
}, Do = {
  ref: "focusHolder",
  class: "cdx-dialog-focus-trap",
  tabindex: "-1"
}, Ko = {
  key: 0,
  class: "cdx-dialog__footer__text"
}, Eo = {
  key: 1,
  class: "cdx-dialog__footer__actions"
};
function Fo(e, t, n, s, l, d) {
  const a = S("cdx-icon"), i = S("cdx-button");
  return u(), A(Ke, {
    name: "cdx-dialog-fade",
    appear: ""
  }, {
    default: T(() => [
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
        h("div", X({
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
            class: V(["cdx-dialog__header", { "cdx-dialog__header--default": !e.$slots.header }])
          }, [
            I(e.$slots, "header", {}, () => [
              e.hideTitle ? $("", !0) : (u(), m("div", To, [
                h("h2", {
                  id: e.labelId,
                  class: "cdx-dialog__header__title"
                }, H(e.title), 9, Lo),
                e.subtitle ? (u(), m("p", Vo, H(e.subtitle), 1)) : $("", !0)
              ])),
              e.closeButtonLabel ? (u(), A(i, {
                key: 1,
                class: "cdx-dialog__header__close-button",
                weight: "quiet",
                type: "button",
                "aria-label": e.closeButtonLabel,
                onClick: e.close
              }, {
                default: T(() => [
                  N(a, {
                    icon: e.cdxIconClose,
                    "icon-label": e.closeButtonLabel
                  }, null, 8, ["icon", "icon-label"])
                ]),
                _: 1
              }, 8, ["aria-label", "onClick"])) : $("", !0)
            ])
          ], 2)) : $("", !0),
          h("div", Do, null, 512),
          h("div", {
            ref: "dialogBody",
            class: V(["cdx-dialog__body", {
              "cdx-dialog__body--no-header": !(e.showHeader || e.$slots.header),
              "cdx-dialog__body--no-footer": !(e.showFooterActions || e.$slots.footer || e.$slots["footer-text"])
            }])
          }, [
            I(e.$slots, "default")
          ], 2),
          e.showFooterActions || e.$slots.footer || e.$slots["footer-text"] ? (u(), m("footer", {
            key: 1,
            class: V(["cdx-dialog__footer", { "cdx-dialog__footer--default": !e.$slots.footer }])
          }, [
            I(e.$slots, "footer", {}, () => [
              e.$slots["footer-text"] ? (u(), m("p", Ko, [
                I(e.$slots, "footer-text")
              ])) : $("", !0),
              e.showFooterActions ? (u(), m("div", Eo, [
                e.primaryAction ? (u(), A(i, {
                  key: 0,
                  class: "cdx-dialog__footer__primary-action",
                  weight: "primary",
                  action: e.primaryAction.actionType,
                  disabled: e.primaryAction.disabled,
                  onClick: t[1] || (t[1] = (o) => e.$emit("primary"))
                }, {
                  default: T(() => [
                    ae(H(e.primaryAction.label), 1)
                  ]),
                  _: 1
                }, 8, ["action", "disabled"])) : $("", !0),
                e.defaultAction ? (u(), A(i, {
                  key: 1,
                  class: "cdx-dialog__footer__default-action",
                  disabled: e.defaultAction.disabled,
                  onClick: t[2] || (t[2] = (o) => e.$emit("default"))
                }, {
                  default: T(() => [
                    ae(H(e.defaultAction.label), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])) : $("", !0)
              ])) : $("", !0)
            ])
          ], 2)) : $("", !0)
        ], 16, Ao),
        h("div", {
          ref: "focusTrapEnd",
          tabindex: "0",
          onFocus: t[4] || (t[4] = (...o) => e.focusFirst && e.focusFirst(...o))
        }, null, 544)
      ], 32)) : $("", !0)
    ]),
    _: 3
  });
}
const rl = /* @__PURE__ */ K(Bo, [["render", Fo]]), zo = D({
  name: "CdxLabel",
  components: { CdxIcon: G },
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
    const { computedDisabled: n } = de(F(e, "disabled")), s = c(() => ({
      "cdx-label--visually-hidden": e.visuallyHidden,
      "cdx-label--disabled": n.value
    })), {
      rootClasses: l,
      rootStyle: d,
      otherAttrs: a
    } = ue(t, s);
    return {
      rootClasses: l,
      rootStyle: d,
      otherAttrs: a
    };
  }
});
const Ro = { class: "cdx-label__label__text" }, No = {
  key: 1,
  class: "cdx-label__label__optional-flag"
}, Oo = {
  key: 0,
  class: "cdx-label__description"
}, qo = ["id"];
function Ho(e, t, n, s, l, d) {
  const a = S("cdx-icon");
  return u(), m("div", {
    class: V(["cdx-label", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    (u(), A(Ce(e.isLegend ? "legend" : "label"), X({
      class: "cdx-label__label",
      for: !e.isLegend && e.inputId ? e.inputId : void 0
    }, e.otherAttrs), {
      default: T(() => [
        h("span", null, [
          e.icon ? (u(), A(a, {
            key: 0,
            icon: e.icon,
            class: "cdx-label__label__icon"
          }, null, 8, ["icon"])) : $("", !0),
          h("span", Ro, [
            I(e.$slots, "default")
          ]),
          e.optionalFlag ? (u(), m("span", No, H(" ") + " " + H(e.optionalFlag), 1)) : $("", !0)
        ]),
        e.isLegend ? (u(), m("span", Oo, [
          I(e.$slots, "description")
        ])) : $("", !0)
      ]),
      _: 3
    }, 16, ["for"])),
    e.isLegend ? $("", !0) : (u(), m("span", {
      key: 0,
      id: e.descriptionId || void 0,
      class: "cdx-label__description"
    }, [
      I(e.$slots, "description")
    ], 8, qo))
  ], 6);
}
const jo = /* @__PURE__ */ K(zo, [["render", Ho]]), Uo = {
  notice: jt,
  error: at,
  warning: nt,
  success: lt
}, Wo = D({
  name: "CdxMessage",
  components: { CdxButton: ve, CdxIcon: G },
  props: {
    /**
     * Status type of Message.
     *
     * @values 'notice', 'warning', 'error', 'success'
     */
    type: {
      type: String,
      default: "notice",
      validator: it
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
      () => e.icon && e.type === "notice" ? e.icon : Uo[e.type]
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
      cdxIconClose: ot
    };
  }
});
const Po = ["aria-live", "role"], Qo = { class: "cdx-message__content" };
function Go(e, t, n, s, l, d) {
  const a = S("cdx-icon"), i = S("cdx-button");
  return u(), A(Ke, {
    name: "cdx-message",
    appear: e.fadeIn,
    "leave-active-class": e.leaveActiveClass
  }, {
    default: T(() => [
      e.dismissed ? $("", !0) : (u(), m("div", {
        key: 0,
        class: V(["cdx-message", e.rootClasses]),
        "aria-live": e.type !== "error" ? "polite" : void 0,
        role: e.type === "error" ? "alert" : void 0
      }, [
        N(a, {
          class: "cdx-message__icon--vue",
          icon: e.computedIcon
        }, null, 8, ["icon"]),
        h("div", Qo, [
          I(e.$slots, "default")
        ]),
        e.userDismissable ? (u(), A(i, {
          key: 0,
          class: "cdx-message__dismiss-button",
          weight: "quiet",
          type: "button",
          "aria-label": e.dismissButtonLabel,
          onClick: t[0] || (t[0] = (o) => e.onDismiss("user-dismissed"))
        }, {
          default: T(() => [
            N(a, {
              icon: e.cdxIconClose,
              "icon-label": e.dismissButtonLabel
            }, null, 8, ["icon", "icon-label"])
          ]),
          _: 1
        }, 8, ["aria-label"])) : $("", !0)
      ], 10, Po))
    ]),
    _: 3
  }, 8, ["appear", "leave-active-class"]);
}
const Zo = /* @__PURE__ */ K(Wo, [["render", Go]]), Jo = ee(he), Xo = D({
  name: "CdxField",
  components: { CdxLabel: jo, CdxMessage: Zo },
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
      validator: Jo
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
    })), i = J("label"), o = J("description"), r = J("input");
    l.value || (ge(rt, r), t.description && ge(ke, o)), ge(pt, d), ge(ct, s);
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
const Yo = { class: "cdx-field__help-text" }, ea = {
  key: 0,
  class: "cdx-field__validation-message"
};
function ta(e, t, n, s, l, d) {
  const a = S("cdx-label"), i = S("cdx-message");
  return u(), A(Ce(e.isFieldset ? "fieldset" : "div"), {
    class: V(["cdx-field", e.rootClasses]),
    "aria-disabled": !e.isFieldset && e.computedDisabled ? !0 : void 0,
    disabled: e.isFieldset && e.computedDisabled ? !0 : void 0
  }, {
    default: T(() => [
      N(a, {
        id: e.labelId,
        icon: e.labelIcon,
        "visually-hidden": e.hideLabel,
        "optional-flag": e.optionalFlag,
        "input-id": e.inputId,
        "description-id": e.descriptionId,
        disabled: e.computedDisabled,
        "is-legend": e.isFieldset
      }, {
        default: T(() => [
          I(e.$slots, "label")
        ]),
        description: T(() => [
          I(e.$slots, "description")
        ]),
        _: 3
      }, 8, ["id", "icon", "visually-hidden", "optional-flag", "input-id", "description-id", "disabled", "is-legend"]),
      h("div", {
        class: V(["cdx-field__control", { "cdx-field__control--has-help-text": e.$slots["help-text"] && e.$slots["help-text"]().length > 0 || e.validationMessage }])
      }, [
        I(e.$slots, "default")
      ], 2),
      h("div", Yo, [
        I(e.$slots, "help-text")
      ]),
      !e.computedDisabled && e.validationMessage ? (u(), m("div", ea, [
        N(i, {
          type: e.validationMessageType,
          inline: !0
        }, {
          default: T(() => [
            ae(H(e.validationMessage), 1)
          ]),
          _: 1
        }, 8, ["type"])
      ])) : $("", !0)
    ]),
    _: 3
  }, 8, ["class", "aria-disabled", "disabled"]);
}
const cl = /* @__PURE__ */ K(Xo, [["render", ta]]), na = ee(he), Oe = D({
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
      validator: na
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
    const l = f(), d = f(), a = J("lookup-menu"), i = f(!1), o = f(!1), r = f(!1), { computedDisabled: p } = de(F(e, "disabled")), y = F(e, "selected"), x = ie(y, t, "update:selected"), _ = c(
      () => e.menuItems.find((b) => b.value === e.selected)
    ), E = c(() => {
      var b, w;
      return (w = (b = d.value) == null ? void 0 : b.getHighlightedMenuItem()) == null ? void 0 : w.id;
    }), z = f(e.initialInputValue), R = Be(l), O = c(() => {
      var b;
      return `${(b = R.value.width) != null ? b : 0}px`;
    }), W = c(() => ({
      "cdx-lookup--disabled": p.value,
      "cdx-lookup--pending": i.value
    })), {
      rootClasses: j,
      rootStyle: P,
      otherAttrs: q
    } = ue(n, W);
    function k(b) {
      _.value && _.value.label !== b && _.value.value !== b && (x.value = null), b === "" ? (o.value = !1, i.value = !1) : i.value = !0, t("input", b);
    }
    function M(b) {
      r.value = !0, // Input value is not null or an empty string.
      z.value !== null && z.value !== "" && // There's either menu items to show or a no results message.
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
        const w = _.value ? _.value.label || _.value.value : "";
        z.value !== w && (z.value = w, t("input", z.value));
      }
    }), oe(F(e, "menuItems"), (b) => {
      // Only show the menu if we were in the pending state (meaning this menuItems change
      // was in response to user input) and the menu is still focused
      r.value && i.value && // Show the menu if there are either menu items or no-results content to show
      (b.length > 0 || s["no-results"]) && (o.value = !0), b.length === 0 && !s["no-results"] && (o.value = !1), i.value = !1;
    }), {
      rootElement: l,
      currentWidthInPx: O,
      menu: d,
      menuId: a,
      highlightedId: E,
      inputValue: z,
      modelWrapper: x,
      expanded: o,
      computedDisabled: p,
      onInputBlur: B,
      rootClasses: j,
      rootStyle: P,
      otherAttrs: q,
      onUpdateInput: k,
      onInputFocus: M,
      onKeydown: v
    };
  }
}), Je = () => {
  Fe((e) => ({
    a2eaf872: e.currentWidthInPx
  }));
}, Xe = Oe.setup;
Oe.setup = Xe ? (e, t) => (Je(), Xe(e, t)) : Je;
function oa(e, t, n, s, l, d) {
  const a = S("cdx-text-input"), i = S("cdx-menu");
  return u(), m("div", {
    ref: "rootElement",
    class: V(["cdx-lookup", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    N(a, X({
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
    N(i, X({
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
      default: T(({ menuItem: o }) => [
        I(e.$slots, "menu-item", { menuItem: o })
      ]),
      "no-results": T(() => [
        I(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const pl = /* @__PURE__ */ K(Oe, [["render", oa]]), aa = D({
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
    })), { computedDisabled: s } = de(F(e, "disabled")), l = f(), d = J("radio"), a = () => {
      l.value.focus();
    }, i = ie(F(e, "modelValue"), t);
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
const la = ["id", "name", "value", "disabled"], sa = /* @__PURE__ */ h("span", { class: "cdx-radio__icon" }, null, -1), ia = ["for"];
function da(e, t, n, s, l, d) {
  return u(), m("span", {
    class: V(["cdx-radio", e.rootClasses])
  }, [
    se(h("input", {
      id: e.radioId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (a) => e.wrappedModel = a),
      class: "cdx-radio__input",
      type: "radio",
      name: e.name,
      value: e.inputValue,
      disabled: e.computedDisabled
    }, null, 8, la), [
      [St, e.wrappedModel]
    ]),
    sa,
    h("label", {
      class: "cdx-radio__label",
      for: e.radioId,
      onClick: t[1] || (t[1] = (...a) => e.focusInput && e.focusInput(...a))
    }, [
      I(e.$slots, "default")
    ], 8, ia)
  ], 2);
}
const fl = /* @__PURE__ */ K(aa, [["render", da]]), ua = ee(he), ra = D({
  name: "CdxSearchInput",
  components: {
    CdxButton: ve,
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
      validator: ua
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
    const s = ie(F(e, "modelValue"), t), { computedDisabled: l } = de(F(e, "disabled")), d = c(() => ({
      "cdx-search-input--has-end-button": !!e.buttonLabel
    })), {
      rootClasses: a,
      rootStyle: i,
      otherAttrs: o
    } = ue(n, d);
    return {
      wrappedModel: s,
      computedDisabled: l,
      rootClasses: a,
      rootStyle: i,
      otherAttrs: o,
      handleSubmit: () => {
        t("submit-click", s.value);
      },
      searchIcon: Pt
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
const ca = { class: "cdx-search-input__input-wrapper" };
function pa(e, t, n, s, l, d) {
  const a = S("cdx-text-input"), i = S("cdx-button");
  return u(), m("div", {
    class: V(["cdx-search-input", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    h("div", ca, [
      N(a, X({
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
      I(e.$slots, "default")
    ]),
    e.buttonLabel ? (u(), A(i, {
      key: 0,
      class: "cdx-search-input__end-button",
      disabled: e.computedDisabled,
      onClick: e.handleSubmit
    }, {
      default: T(() => [
        ae(H(e.buttonLabel), 1)
      ]),
      _: 1
    }, 8, ["disabled", "onClick"])) : $("", !0)
  ], 6);
}
const fa = /* @__PURE__ */ K(ra, [["render", pa]]), ma = ee(he), qe = D({
  name: "CdxSelect",
  components: {
    CdxIcon: G,
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
      validator: ma
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
    const s = f(), l = f(), d = pe(ke, void 0), a = J("select-menu"), i = f(!1), o = n.id || J("select-handle"), {
      computedDisabled: r,
      computedStatus: p,
      computedInputId: y
    } = de(
      F(e, "disabled"),
      F(e, "status"),
      o
    ), x = ie(F(e, "selected"), t, "update:selected"), _ = c(
      () => e.menuItems.find((w) => w.value === e.selected)
    ), E = c(() => _.value ? _.value.label || _.value.value : e.defaultLabel), z = Be(s), R = c(() => {
      var w;
      return `${(w = z.value.width) != null ? w : 0}px`;
    }), O = c(() => {
      if (e.defaultIcon && !_.value)
        return e.defaultIcon;
      if (_.value && _.value.icon)
        return _.value.icon;
    }), W = c(() => ({
      "cdx-select-vue--enabled": !r.value,
      "cdx-select-vue--disabled": r.value,
      "cdx-select-vue--expanded": i.value,
      "cdx-select-vue--value-selected": !!_.value,
      "cdx-select-vue--no-selections": !_.value,
      "cdx-select-vue--has-start-icon": !!O.value,
      [`cdx-select-vue--status-${p.value}`]: !0
    })), {
      rootClasses: j,
      rootStyle: P,
      otherAttrs: q
    } = ue(n, W), k = c(() => {
      const re = q.value, { id: w } = re;
      return me(re, ["id"]);
    }), M = c(() => {
      var w, Q;
      return (Q = (w = l.value) == null ? void 0 : w.getHighlightedMenuItem()) == null ? void 0 : Q.id;
    });
    function B() {
      i.value = !1;
    }
    function v() {
      var w;
      r.value || (i.value = !i.value, (w = s.value) == null || w.focus());
    }
    function b(w) {
      var Q;
      r.value || (Q = l.value) == null || Q.delegateKeyNavigation(w);
    }
    return {
      handle: s,
      menu: l,
      computedHandleId: y,
      descriptionId: d,
      menuId: a,
      modelWrapper: x,
      selectedMenuItem: _,
      highlightedId: M,
      expanded: i,
      computedDisabled: r,
      onBlur: B,
      currentLabel: E,
      currentWidthInPx: R,
      rootClasses: j,
      rootStyle: P,
      otherAttrsMinusId: k,
      onClick: v,
      onKeydown: b,
      startIcon: O,
      cdxIconExpand: ze
    };
  }
}), Ye = () => {
  Fe((e) => ({
    "3f2a5daa": e.currentWidthInPx
  }));
}, et = qe.setup;
qe.setup = et ? (e, t) => (Ye(), et(e, t)) : Ye;
const ha = ["aria-disabled"], va = ["id", "aria-owns", "aria-activedescendant", "aria-expanded", "aria-describedby"];
function ba(e, t, n, s, l, d) {
  const a = S("cdx-icon"), i = S("cdx-menu");
  return u(), m("div", {
    class: V(["cdx-select-vue", e.rootClasses]),
    style: le(e.rootStyle),
    "aria-disabled": e.computedDisabled
  }, [
    h("div", X({
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
      I(e.$slots, "label", {
        selectedMenuItem: e.selectedMenuItem,
        defaultLabel: e.defaultLabel
      }, () => [
        ae(H(e.currentLabel), 1)
      ]),
      e.startIcon ? (u(), A(a, {
        key: 0,
        icon: e.startIcon,
        class: "cdx-select-vue__start-icon"
      }, null, 8, ["icon"])) : $("", !0),
      N(a, {
        icon: e.cdxIconExpand,
        class: "cdx-select-vue__indicator"
      }, null, 8, ["icon"])
    ], 16, va),
    N(i, X({
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
      default: T(({ menuItem: o }) => [
        I(e.$slots, "menu-item", { menuItem: o })
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 14, ha);
}
const ml = /* @__PURE__ */ K(qe, [["render", ba]]), ga = D({
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
    const t = pe(dt), n = pe(ut);
    if (!t || !n)
      throw new Error("Tab component must be used inside a Tabs component");
    const s = t.value.get(e.name) || {}, l = c(() => e.name === n.value);
    return {
      tab: s,
      isActive: l
    };
  }
});
const ya = ["id", "aria-hidden", "aria-labelledby"];
function _a(e, t, n, s, l, d) {
  return se((u(), m("section", {
    id: e.tab.id,
    "aria-hidden": e.isActive ? void 0 : !0,
    "aria-labelledby": `${e.tab.id}-label`,
    class: "cdx-tab",
    role: "tabpanel",
    tabindex: "-1"
  }, [
    I(e.$slots, "default")
  ], 8, ya)), [
    [Ie, e.isActive]
  ]);
}
const hl = /* @__PURE__ */ K(ga, [["render", _a]]), $a = D({
  name: "CdxTabs",
  components: {
    CdxButton: ve,
    CdxIcon: G
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
    const s = f(), l = f(), d = f(), a = f(), i = f(), o = st(s), r = c(() => {
      var b;
      const M = [], B = (b = t.default) == null ? void 0 : b.call(t);
      B && B.forEach(v);
      function v(w) {
        w && typeof w == "object" && "type" in w && (typeof w.type == "object" && "name" in w.type && w.type.name === "CdxTab" ? M.push(w) : "children" in w && Array.isArray(w.children) && w.children.forEach(v));
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
          id: J(B.props.name),
          label: B.props.label || B.props.name,
          disabled: B.props.disabled
        });
      }
      return M;
    }, /* @__PURE__ */ new Map())), y = ie(F(e, "active"), n, "update:active"), x = c(() => Array.from(p.value.keys())), _ = c(() => x.value.indexOf(y.value)), E = c(() => {
      var M;
      return (M = p.value.get(y.value)) == null ? void 0 : M.id;
    });
    ge(ut, y), ge(dt, p);
    const z = f(), R = f(), O = De(z, { threshold: 0.95 }), W = De(R, { threshold: 0.95 });
    function j(M, B) {
      const v = M;
      v && (B === 0 ? z.value = v : B === x.value.length - 1 && (R.value = v));
    }
    const P = c(() => ({
      "cdx-tabs--framed": e.framed,
      "cdx-tabs--quiet": !e.framed
    }));
    function q(M) {
      if (!l.value || !a.value || !i.value)
        return 0;
      const B = o.value === "rtl" ? i.value : a.value, v = o.value === "rtl" ? a.value : i.value, b = M.offsetLeft, w = b + M.clientWidth, Q = l.value.scrollLeft + B.clientWidth, re = l.value.scrollLeft + l.value.clientWidth - v.clientWidth;
      return b < Q ? b - Q : w > re ? w - re : 0;
    }
    function k(M) {
      var w;
      if (!l.value || !a.value || !i.value)
        return;
      const B = M === "next" && o.value === "ltr" || M === "prev" && o.value === "rtl" ? 1 : -1;
      let v = 0, b = M === "next" ? l.value.firstElementChild : l.value.lastElementChild;
      for (; b; ) {
        const Q = M === "next" ? b.nextElementSibling : b.previousElementSibling;
        if (v = q(b), Math.sign(v) === B) {
          Q && Math.abs(v) < 0.25 * l.value.clientWidth && (v = q(Q));
          break;
        }
        b = Q;
      }
      l.value.scrollBy({
        left: v,
        behavior: "smooth"
      }), (w = d.value) == null || w.focus();
    }
    return oe(y, () => {
      if (E.value === void 0 || !l.value || !a.value || !i.value)
        return;
      const M = document.getElementById(`${E.value}-label`);
      M && l.value.scrollBy({
        left: q(M),
        behavior: "smooth"
      });
    }), {
      activeTab: y,
      activeTabIndex: _,
      activeTabId: E,
      currentDirection: o,
      rootElement: s,
      listElement: l,
      focusHolder: d,
      prevScroller: a,
      nextScroller: i,
      rootClasses: P,
      tabNames: x,
      tabsData: p,
      firstLabelVisible: O,
      lastLabelVisible: W,
      assignTemplateRefIfNecessary: j,
      scrollTabs: k,
      cdxIconPrevious: Wt,
      cdxIconNext: Ut
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
const Ia = {
  ref: "focusHolder",
  tabindex: "-1"
}, Ca = {
  ref: "prevScroller",
  class: "cdx-tabs__prev-scroller"
}, xa = ["aria-activedescendant"], wa = ["id"], Sa = ["href", "aria-disabled", "aria-selected", "onClick", "onKeyup"], ka = {
  ref: "nextScroller",
  class: "cdx-tabs__next-scroller"
}, Ma = { class: "cdx-tabs__content" };
function Ba(e, t, n, s, l, d) {
  const a = S("cdx-icon"), i = S("cdx-button");
  return u(), m("div", {
    ref: "rootElement",
    class: V(["cdx-tabs", e.rootClasses])
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
      h("div", Ia, null, 512),
      se(h("div", Ca, [
        N(i, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[0] || (t[0] = te(() => {
          }, ["prevent"])),
          onClick: t[1] || (t[1] = (o) => e.scrollTabs("prev"))
        }, {
          default: T(() => [
            N(a, { icon: e.cdxIconPrevious }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [Ie, !e.firstLabelVisible]
      ]),
      h("ul", {
        ref: "listElement",
        class: "cdx-tabs__list",
        role: "tablist",
        "aria-activedescendant": e.activeTabId
      }, [
        (u(!0), m(ye, null, Se(e.tabsData.values(), (o, r) => (u(), m("li", {
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
          }, H(o.label), 41, Sa)
        ], 8, wa))), 128))
      ], 8, xa),
      se(h("div", ka, [
        N(i, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[2] || (t[2] = te(() => {
          }, ["prevent"])),
          onClick: t[3] || (t[3] = (o) => e.scrollTabs("next"))
        }, {
          default: T(() => [
            N(a, { icon: e.cdxIconNext }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [Ie, !e.lastLabelVisible]
      ])
    ], 32),
    h("div", Ma, [
      I(e.$slots, "default")
    ])
  ], 2);
}
const vl = /* @__PURE__ */ K($a, [["render", Ba]]), Aa = ee(he), Ta = D({
  name: "CdxTextArea",
  components: { CdxIcon: G },
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
      validator: Aa
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
    const s = ie(F(e, "modelValue"), n), l = t.id, {
      computedDisabled: d,
      computedStatus: a,
      computedInputId: i
    } = de(
      F(e, "disabled"),
      F(e, "status"),
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
      rootStyle: x,
      otherAttrs: _
    } = ue(t, p), E = c(() => {
      const j = _.value, { id: O } = j;
      return me(j, ["id"]);
    }), z = f();
    function R() {
      z.value && e.autosize && (z.value.style.height = "auto", z.value.style.height = `${z.value.scrollHeight}px`);
    }
    return {
      rootClasses: y,
      rootStyle: x,
      wrappedModel: s,
      computedDisabled: d,
      computedInputId: i,
      descriptionId: o,
      textareaClasses: r,
      otherAttrsMinusId: E,
      textarea: z,
      onInput: R
    };
  }
});
const La = ["id", "aria-describedby", "disabled"];
function Va(e, t, n, s, l, d) {
  const a = S("cdx-icon");
  return u(), m("div", {
    class: V(["cdx-text-area", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    se(h("textarea", X({
      id: e.computedInputId,
      ref: "textarea"
    }, e.otherAttrsMinusId, {
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wrappedModel = i),
      class: [e.textareaClasses, "cdx-text-area__textarea"],
      "aria-describedby": e.descriptionId,
      disabled: e.computedDisabled,
      onInput: t[1] || (t[1] = (...i) => e.onInput && e.onInput(...i))
    }), null, 16, La), [
      [kt, e.wrappedModel]
    ]),
    e.startIcon ? (u(), A(a, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-area__icon-vue cdx-text-area__start-icon"
    }, null, 8, ["icon"])) : $("", !0),
    e.endIcon ? (u(), A(a, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-area__icon-vue cdx-text-area__end-icon"
    }, null, 8, ["icon"])) : $("", !0)
  ], 6);
}
const bl = /* @__PURE__ */ K(Ta, [["render", Va]]), Da = D({
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
const Ka = ["aria-pressed", "disabled"];
function Ea(e, t, n, s, l, d) {
  return u(), m("button", {
    class: V(["cdx-toggle-button", e.rootClasses]),
    "aria-pressed": e.modelValue,
    disabled: e.disabled,
    onClick: t[0] || (t[0] = (...a) => e.onClick && e.onClick(...a)),
    onKeydown: t[1] || (t[1] = ne((a) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = ne((a) => e.setActive(!1), ["space", "enter"]))
  }, [
    I(e.$slots, "default")
  ], 42, Ka);
}
const Fa = /* @__PURE__ */ K(Da, [["render", Ea]]), za = D({
  name: "CdxToggleButtonGroup",
  components: {
    CdxIcon: G,
    CdxToggleButton: Fa
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
const Ra = { class: "cdx-toggle-button-group" };
function Na(e, t, n, s, l, d) {
  const a = S("cdx-icon"), i = S("cdx-toggle-button");
  return u(), m("div", Ra, [
    (u(!0), m(ye, null, Se(e.buttons, (o) => (u(), A(i, {
      key: o.value,
      "model-value": e.isSelected(o),
      disabled: o.disabled || e.disabled,
      "aria-label": o.ariaLabel,
      "onUpdate:modelValue": (r) => e.onUpdate(o, r)
    }, {
      default: T(() => [
        I(e.$slots, "default", {
          button: o,
          selected: e.isSelected(o)
        }, () => [
          o.icon ? (u(), A(a, {
            key: 0,
            icon: o.icon
          }, null, 8, ["icon"])) : $("", !0),
          ae(" " + H(e.getButtonLabel(o)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["model-value", "disabled", "aria-label", "onUpdate:modelValue"]))), 128))
  ]);
}
const gl = /* @__PURE__ */ K(za, [["render", Na]]), Oa = D({
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
    const s = f(), l = J("toggle-switch"), d = c(() => ({
      "cdx-toggle-switch--align-switch": e.alignSwitch
    })), {
      rootClasses: a,
      rootStyle: i,
      otherAttrs: o
    } = ue(t, d), { computedDisabled: r } = de(F(e, "disabled")), p = ie(F(e, "modelValue"), n);
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
const qa = ["for"], Ha = { class: "cdx-toggle-switch__input-wrapper" }, ja = ["id", "value", "disabled"], Ua = /* @__PURE__ */ h("span", { class: "cdx-toggle-switch__switch" }, [
  /* @__PURE__ */ h("span", { class: "cdx-toggle-switch__switch__grip" })
], -1);
function Wa(e, t, n, s, l, d) {
  return u(), m("span", {
    class: V(["cdx-toggle-switch", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    e.$slots.default ? (u(), m("label", {
      key: 0,
      for: e.inputId,
      class: "cdx-toggle-switch__label"
    }, [
      I(e.$slots, "default")
    ], 8, qa)) : $("", !0),
    h("span", Ha, [
      se(h("input", X({
        id: e.inputId,
        ref: "input",
        "onUpdate:modelValue": t[0] || (t[0] = (a) => e.wrappedModel = a),
        class: "cdx-toggle-switch__input",
        type: "checkbox",
        value: e.inputValue,
        disabled: e.computedDisabled
      }, e.otherAttrs, {
        onKeydown: t[1] || (t[1] = ne(te((...a) => e.clickInput && e.clickInput(...a), ["prevent"]), ["enter"]))
      }), null, 16, ja), [
        [tt, e.wrappedModel]
      ]),
      Ua
    ])
  ], 6);
}
const yl = /* @__PURE__ */ K(Oa, [["render", Wa]]), Pa = D({
  name: "CdxTypeaheadSearch",
  components: {
    CdxIcon: G,
    CdxMenu: Me,
    CdxSearchInput: fa
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
      default: on
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
    const l = f(), d = f(), a = J("typeahead-search-menu"), i = f(!1), o = f(!1), r = f(!1), p = f(!1), y = f(e.initialInputValue), x = f(""), _ = c(() => {
      var C, Y;
      return (Y = (C = d.value) == null ? void 0 : C.getHighlightedMenuItem()) == null ? void 0 : Y.id;
    }), E = f(null), z = c(() => ({
      "cdx-typeahead-search__menu-message--has-thumbnail": e.showThumbnail
    })), R = c(
      () => e.searchResults.find(
        (C) => C.value === E.value
      )
    ), O = c(
      () => e.searchFooterUrl ? { value: be, url: e.searchFooterUrl } : void 0
    ), W = c(() => ({
      "cdx-typeahead-search--show-thumbnail": e.showThumbnail,
      "cdx-typeahead-search--expanded": i.value,
      "cdx-typeahead-search--auto-expand-width": e.showThumbnail && e.autoExpandWidth
    })), {
      rootClasses: j,
      rootStyle: P,
      otherAttrs: q
    } = ue(t, W);
    function k(C) {
      return C;
    }
    const M = c(() => ({
      visibleItemLimit: e.visibleItemLimit,
      showThumbnail: e.showThumbnail,
      // In case search queries aren't highlighted, default to a bold label.
      boldLabel: !0,
      hideDescriptionOverflow: !0
    }));
    let B, v;
    function b(C, Y = !1) {
      R.value && R.value.label !== C && R.value.value !== C && (E.value = null), v !== void 0 && (clearTimeout(v), v = void 0), C === "" ? i.value = !1 : (o.value = !0, s["search-results-pending"] && (v = setTimeout(() => {
        p.value && (i.value = !0), r.value = !0;
      }, an))), B !== void 0 && (clearTimeout(B), B = void 0);
      const ce = () => {
        n("input", C);
      };
      Y ? ce() : B = setTimeout(() => {
        ce();
      }, e.debounceInterval);
    }
    function w(C) {
      if (C === be) {
        E.value = null, y.value = x.value;
        return;
      }
      E.value = C, C !== null && (y.value = R.value ? R.value.label || String(R.value.value) : "");
    }
    function Q() {
      p.value = !0, (x.value || r.value) && (i.value = !0);
    }
    function re() {
      p.value = !1, i.value = !1;
    }
    function xe(C) {
      const He = C, { id: Y } = He, ce = me(He, ["id"]);
      if (ce.value === be) {
        n("search-result-click", {
          searchResult: null,
          index: e.searchResults.length,
          numberOfResults: e.searchResults.length
        });
        return;
      }
      g(ce);
    }
    function g(C) {
      const Y = {
        searchResult: C,
        index: e.searchResults.findIndex(
          (ce) => ce.value === C.value
        ),
        numberOfResults: e.searchResults.length
      };
      n("search-result-click", Y);
    }
    function L(C) {
      if (C.value === be) {
        y.value = x.value;
        return;
      }
      y.value = C.value ? C.label || String(C.value) : "";
    }
    function U(C) {
      var Y;
      i.value = !1, (Y = d.value) == null || Y.clearActive(), xe(C);
    }
    function Z(C) {
      if (R.value)
        g(R.value), C.stopPropagation(), window.location.assign(R.value.url), C.preventDefault();
      else {
        const Y = {
          searchResult: null,
          index: -1,
          numberOfResults: e.searchResults.length
        };
        n("submit", Y);
      }
    }
    function _e(C) {
      if (!d.value || !x.value || C.key === " ")
        return;
      const Y = d.value.getHighlightedMenuItem(), ce = d.value.getHighlightedViaKeyboard();
      switch (C.key) {
        case "Enter":
          Y && (Y.value === be && ce ? window.location.assign(e.searchFooterUrl) : d.value.delegateKeyNavigation(C, !1)), i.value = !1;
          break;
        case "Tab":
          i.value = !1;
          break;
        default:
          d.value.delegateKeyNavigation(C);
          break;
      }
    }
    return fe(() => {
      e.initialInputValue && b(e.initialInputValue, !0);
    }), oe(F(e, "searchResults"), () => {
      x.value = y.value.trim(), p.value && o.value && x.value.length > 0 && (i.value = !0), v !== void 0 && (clearTimeout(v), v = void 0), o.value = !1, r.value = !1;
    }), {
      form: l,
      menu: d,
      menuId: a,
      highlightedId: _,
      selection: E,
      menuMessageClass: z,
      footer: O,
      asSearchResult: k,
      inputValue: y,
      searchQuery: x,
      expanded: i,
      showPending: r,
      rootClasses: j,
      rootStyle: P,
      otherAttrs: q,
      menuConfig: M,
      onUpdateInputValue: b,
      onUpdateMenuSelection: w,
      onFocus: Q,
      onBlur: re,
      onSearchResultClick: xe,
      onSearchResultKeyboardNavigation: L,
      onSearchFooterClick: U,
      onSubmit: Z,
      onKeydown: _e,
      MenuFooterValue: be,
      articleIcon: Ot
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
const Qa = ["id", "action"], Ga = { class: "cdx-typeahead-search__menu-message__text" }, Za = { class: "cdx-typeahead-search__menu-message__text" }, Ja = ["href", "onClickCapture"], Xa = { class: "cdx-menu-item__text cdx-typeahead-search__search-footer__text" }, Ya = { class: "cdx-typeahead-search__search-footer__query" };
function el(e, t, n, s, l, d) {
  const a = S("cdx-icon"), i = S("cdx-menu"), o = S("cdx-search-input");
  return u(), m("div", {
    class: V(["cdx-typeahead-search", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    h("form", {
      id: e.id,
      ref: "form",
      class: "cdx-typeahead-search__form",
      action: e.formAction,
      onSubmit: t[4] || (t[4] = (...r) => e.onSubmit && e.onSubmit(...r))
    }, [
      N(o, X({
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
        default: T(() => [
          N(i, X({
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
            pending: T(() => [
              h("div", {
                class: V(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                h("span", Ga, [
                  I(e.$slots, "search-results-pending")
                ])
              ], 2)
            ]),
            "no-results": T(() => [
              h("div", {
                class: V(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                h("span", Za, [
                  I(e.$slots, "search-no-results-text")
                ])
              ], 2)
            ]),
            default: T(({ menuItem: r, active: p }) => [
              r.value === e.MenuFooterValue ? (u(), m("a", {
                key: 0,
                class: V(["cdx-menu-item__content cdx-typeahead-search__search-footer", {
                  "cdx-typeahead-search__search-footer__active": p
                }]),
                href: e.asSearchResult(r).url,
                onClickCapture: te((y) => e.onSearchFooterClick(e.asSearchResult(r)), ["stop"])
              }, [
                N(a, {
                  class: "cdx-menu-item__thumbnail cdx-typeahead-search__search-footer__icon",
                  icon: e.articleIcon
                }, null, 8, ["icon"]),
                h("span", Xa, [
                  I(e.$slots, "search-footer-text", { searchQuery: e.searchQuery }, () => [
                    h("strong", Ya, H(e.searchQuery), 1)
                  ])
                ])
              ], 42, Ja)) : $("", !0)
            ]),
            _: 3
          }, 16, ["id", "expanded", "show-pending", "selected", "menu-items", "footer", "search-query", "show-no-results-slot", "aria-label", "onUpdate:selected", "onMenuItemKeyboardNavigation"])
        ]),
        _: 3
      }, 16, ["modelValue", "button-label", "aria-owns", "aria-expanded", "aria-activedescendant", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
      I(e.$slots, "default")
    ], 40, Qa)
  ], 6);
}
const _l = /* @__PURE__ */ K(Pa, [["render", el]]);
export {
  ol as CdxAccordion,
  ve as CdxButton,
  al as CdxButtonGroup,
  ll as CdxCard,
  sl as CdxCheckbox,
  ul as CdxCombobox,
  rl as CdxDialog,
  cl as CdxField,
  G as CdxIcon,
  il as CdxInfoChip,
  jo as CdxLabel,
  pl as CdxLookup,
  Me as CdxMenu,
  ro as CdxMenuItem,
  Zo as CdxMessage,
  vo as CdxProgressBar,
  fl as CdxRadio,
  fa as CdxSearchInput,
  eo as CdxSearchResultTitle,
  ml as CdxSelect,
  hl as CdxTab,
  vl as CdxTabs,
  bl as CdxTextArea,
  Re as CdxTextInput,
  mt as CdxThumbnail,
  Fa as CdxToggleButton,
  gl as CdxToggleButtonGroup,
  yl as CdxToggleSwitch,
  _l as CdxTypeaheadSearch,
  dl as stringHelpers,
  st as useComputedDirection,
  ht as useComputedDisabled,
  Zt as useComputedLanguage,
  de as useFieldData,
  J as useGeneratedId,
  De as useIntersectionObserver,
  ie as useModelWrapper,
  Be as useResizeObserver,
  ue as useSplitAttributes
};
