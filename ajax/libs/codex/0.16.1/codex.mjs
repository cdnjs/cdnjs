var It = Object.defineProperty, Ct = Object.defineProperties;
var kt = Object.getOwnPropertyDescriptors;
var ke = Object.getOwnPropertySymbols;
var Ge = Object.prototype.hasOwnProperty, Ze = Object.prototype.propertyIsEnumerable;
var Qe = (e, t, n) => t in e ? It(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Je = (e, t) => {
  for (var n in t || (t = {}))
    Ge.call(t, n) && Qe(e, n, t[n]);
  if (ke)
    for (var n of ke(t))
      Ze.call(t, n) && Qe(e, n, t[n]);
  return e;
}, Xe = (e, t) => Ct(e, kt(t));
var me = (e, t) => {
  var n = {};
  for (var a in e)
    Ge.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
  if (e != null && ke)
    for (var a of ke(e))
      t.indexOf(a) < 0 && Ze.call(e, a) && (n[a] = e[a]);
  return n;
};
var Le = (e, t, n) => new Promise((a, s) => {
  var d = (o) => {
    try {
      i(n.next(o));
    } catch (r) {
      s(r);
    }
  }, l = (o) => {
    try {
      i(n.throw(o));
    } catch (r) {
      s(r);
    }
  }, i = (o) => o.done ? a(o.value) : Promise.resolve(o.value).then(d, l);
  i((n = n.apply(e, t)).next());
});
import { ref as f, onMounted as fe, defineComponent as K, computed as c, openBlock as u, createElementBlock as m, normalizeClass as D, toDisplayString as N, createCommentVNode as $, Comment as St, warn as Fe, withKeys as ne, renderSlot as _, getCurrentInstance as wt, resolveComponent as k, createBlock as T, resolveDynamicComponent as Se, withCtx as x, createVNode as O, createElementVNode as h, withDirectives as ae, vShow as Ie, Fragment as ye, renderList as we, createTextVNode as le, Transition as Re, normalizeStyle as se, inject as pe, toRef as F, mergeProps as Z, withModifiers as te, vModelCheckbox as st, createSlots as xe, onUnmounted as ze, watch as oe, nextTick as _e, vModelDynamic as xt, useCssVars as Oe, toRefs as Mt, provide as ge, vModelRadio as Bt, vModelText as At } from "vue";
const Tt = '<path d="M11.53 2.3A1.85 1.85 0 0010 1.21 1.85 1.85 0 008.48 2.3L.36 16.36C-.48 17.81.21 19 1.88 19h16.24c1.67 0 2.36-1.19 1.52-2.64zM11 16H9v-2h2zm0-4H9V6h2z"/>', Lt = '<path d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"/><circle cx="10" cy="10" r="3"/>', Vt = '<path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"/>', Dt = '<path d="m4.34 2.93 12.73 12.73-1.41 1.41L2.93 4.35z"/><path d="M17.07 4.34 4.34 17.07l-1.41-1.41L15.66 2.93z"/>', Kt = '<path d="M13.728 1H6.272L1 6.272v7.456L6.272 19h7.456L19 13.728V6.272zM11 15H9v-2h2zm0-4H9V5h2z"/>', Et = '<path d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"/>', Ft = '<path d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"/><path d="M19 5H1V3h18zm0 12H1v-2h18z"/>', Rt = '<path d="M8 19a1 1 0 001 1h2a1 1 0 001-1v-1H8zm9-12a7 7 0 10-12 4.9S7 14 7 15v1a1 1 0 001 1h4a1 1 0 001-1v-1c0-1 2-3.1 2-3.1A7 7 0 0017 7z"/>', zt = '<path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM9 5h2v2H9zm0 4h2v6H9z"/>', Ot = '<path d="M7 1 5.6 2.5 13 10l-7.4 7.5L7 19l9-9z"/>', Nt = '<path d="m4 10 9 9 1.4-1.5L7 10l7.4-7.5L13 1z"/>', qt = '<path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"/>', Ht = '<path d="M10 20a10 10 0 010-20 10 10 0 110 20Zm-2-5 9-8.5L15.5 5 8 12 4.5 8.5 3 10l5 5Z"/>', at = Tt, jt = Lt, Ut = Vt, it = Dt, dt = Kt, Ne = Et, Wt = Ft, Pt = {
  langCodeMap: {
    ar: Rt
  },
  default: zt
}, Qt = {
  ltr: Ot,
  shouldFlip: !0
}, Gt = {
  ltr: Nt,
  shouldFlip: !0
}, Zt = qt, ut = Ht;
function Jt(e, t, n) {
  if (typeof e == "string" || "path" in e)
    return e;
  if ("shouldFlip" in e)
    return e.ltr;
  if ("rtl" in e)
    return n === "rtl" ? e.rtl : e.ltr;
  const a = t in e.langCodeMap ? e.langCodeMap[t] : e.default;
  return typeof a == "string" || "path" in a ? a : a.ltr;
}
function Xt(e, t) {
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
  return fe(() => {
    const n = window.getComputedStyle(e.value).direction;
    t.value = n === "ltr" || n === "rtl" ? n : null;
  }), t;
}
function Yt(e) {
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
const Ve = "cdx", en = [
  "default",
  "progressive",
  "destructive"
], tn = [
  "normal",
  "primary",
  "quiet"
], nn = [
  "medium",
  "large"
], on = [
  "x-small",
  "small",
  "medium"
], ln = [
  "notice",
  "warning",
  "error",
  "success"
], ct = ee(ln), sn = [
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
], an = 120, dn = 500, ve = "cdx-menu-footer-item", pt = Symbol("CdxTabs"), ft = Symbol("CdxActiveTab"), mt = Symbol("CdxId"), Me = Symbol("CdxDescriptionId"), ht = Symbol("CdxStatus"), bt = Symbol("CdxDisabled"), un = ee(on), rn = K({
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
      validator: un
    }
  },
  setup(e) {
    const t = f(), n = rt(t), a = Yt(t), s = c(() => e.dir || n.value), d = c(() => e.lang || a.value), l = c(() => ({
      "cdx-icon--flipped": s.value === "rtl" && d.value !== null && Xt(e.icon, d.value),
      [`cdx-icon--${e.size}`]: !0
    })), i = c(
      () => Jt(e.icon, d.value || "", s.value || "ltr")
    ), o = c(() => typeof i.value == "string" ? i.value : ""), r = c(() => typeof i.value != "string" ? i.value.path : "");
    return {
      rootElement: t,
      rootClasses: l,
      iconSvg: o,
      iconPath: r
    };
  }
});
const E = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, cn = ["aria-hidden"], pn = { key: 0 }, fn = ["innerHTML"], mn = ["d"];
function hn(e, t, n, a, s, d) {
  return u(), m("span", {
    ref: "rootElement",
    class: D(["cdx-icon", e.rootClasses])
  }, [
    (u(), m("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      "aria-hidden": e.iconLabel ? void 0 : !0
    }, [
      e.iconLabel ? (u(), m("title", pn, N(e.iconLabel), 1)) : $("", !0),
      e.iconSvg ? (u(), m("g", {
        key: 1,
        innerHTML: e.iconSvg
      }, null, 8, fn)) : (u(), m("path", {
        key: 2,
        d: e.iconPath
      }, null, 8, mn))
    ], 8, cn))
  ], 2);
}
const J = /* @__PURE__ */ E(rn, [["render", hn]]), bn = ee(en), vn = ee(tn), gn = ee(nn), yn = (e) => {
  !e["aria-label"] && !e["aria-hidden"] && Fe(`CdxButton: Icon-only buttons require one of the following attribute: aria-label or aria-hidden.
		See documentation on https://doc.wikimedia.org/codex/latest/components/demos/button.html#icon-only-button-1`);
};
function Ke(e) {
  const t = [];
  for (const n of e)
    typeof n == "string" && n.trim() !== "" ? t.push(n) : Array.isArray(n) ? t.push(...Ke(n)) : typeof n == "object" && n && (// HTML tag
    typeof n.type == "string" || // Component
    typeof n.type == "object" ? t.push(n) : n.type !== St && (typeof n.children == "string" && n.children.trim() !== "" ? t.push(n.children) : Array.isArray(n.children) && t.push(...Ke(n.children))));
  return t;
}
const $n = (e, t) => {
  if (!e)
    return !1;
  const n = Ke(e);
  if (n.length !== 1)
    return !1;
  const a = n[0], s = typeof a == "object" && typeof a.type == "object" && "name" in a.type && a.type.name === J.name, d = typeof a == "object" && a.type === "svg";
  return s || d ? (yn(t), !0) : !1;
}, _n = K({
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
      validator: bn
    },
    /**
     * Visual prominence of the button.
     *
     * @values 'normal', 'primary', 'quiet'
     */
    weight: {
      type: String,
      default: "normal",
      validator: vn
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
      validator: gn
    }
  },
  emits: ["click"],
  setup(e, { emit: t, slots: n, attrs: a }) {
    const s = f(!1);
    return {
      rootClasses: c(() => {
        var o;
        return {
          [`cdx-button--action-${e.action}`]: !0,
          [`cdx-button--weight-${e.weight}`]: !0,
          [`cdx-button--size-${e.size}`]: !0,
          "cdx-button--framed": e.weight !== "quiet",
          "cdx-button--icon-only": $n((o = n.default) == null ? void 0 : o.call(n), a),
          "cdx-button--is-active": s.value
        };
      }),
      onClick: (o) => {
        t("click", o);
      },
      setActive: (o) => {
        s.value = o;
      }
    };
  }
});
function In(e, t, n, a, s, d) {
  return u(), m("button", {
    class: D(["cdx-button", e.rootClasses]),
    onClick: t[0] || (t[0] = (...l) => e.onClick && e.onClick(...l)),
    onKeydown: t[1] || (t[1] = ne((l) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = ne((l) => e.setActive(!1), ["space", "enter"]))
  }, [
    _(e.$slots, "default")
  ], 34);
}
const be = /* @__PURE__ */ E(_n, [["render", In]]);
let De = 0;
function W(e) {
  const t = wt(), n = (t == null ? void 0 : t.props.id) || (t == null ? void 0 : t.attrs.id);
  return e ? `${Ve}-${e}-${De++}` : n ? `${Ve}-${n}-${De++}` : `${Ve}-${De++}`;
}
const Cn = K({
  name: "CdxAccordion",
  components: { CdxButton: be, CdxIcon: J },
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
    const n = f(!1), a = W("accordion"), s = W("accordion-panel"), d = () => {
      n.value = !n.value;
    }, l = () => {
      t("action-button-click");
    }, i = c(() => e.actionIcon && (n.value || e.actionAlwaysVisible)), o = c(() => ({
      "cdx-accordion--has-icon": i
    }));
    return {
      cdxIconExpand: Ne,
      emitActionButtonClick: l,
      isExpanded: n,
      rootClasses: o,
      shouldShowActionButton: i,
      toggle: d,
      accordionId: a,
      accordionPanelId: s
    };
  }
});
const kn = { class: "cdx-accordion__toggle__title" }, Sn = { class: "cdx-accordion__toggle__title-text" }, wn = { class: "cdx-accordion__toggle__description" }, xn = ["id", "aria-labelledby", "aria-hidden"];
function Mn(e, t, n, a, s, d) {
  const l = k("cdx-icon"), i = k("cdx-button");
  return u(), m("div", {
    class: D(["cdx-accordion", e.rootClasses])
  }, [
    (u(), T(Se(e.headingLevel), { class: "cdx-accordion__header" }, {
      default: x(() => [
        O(i, {
          id: e.accordionId,
          "aria-expanded": e.isExpanded,
          "aria-controls": e.accordionPanelId,
          class: "cdx-accordion__toggle",
          type: "button",
          weight: "quiet",
          onClick: e.toggle
        }, {
          default: x(() => [
            h("span", kn, [
              O(l, {
                class: "cdx-accordion__toggle__title-icon",
                icon: e.cdxIconExpand,
                size: "small"
              }, null, 8, ["icon"]),
              h("span", Sn, [
                _(e.$slots, "title")
              ])
            ]),
            h("span", wn, [
              _(e.$slots, "description")
            ])
          ]),
          _: 3
        }, 8, ["id", "aria-expanded", "aria-controls", "onClick"]),
        e.shouldShowActionButton ? (u(), T(i, {
          key: 0,
          class: "cdx-accordion__action",
          "aria-label": e.actionButtonLabel,
          type: "button",
          weight: "quiet",
          onClick: e.emitActionButtonClick
        }, {
          default: x(() => [
            O(l, {
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
    ae(h("div", {
      id: e.accordionPanelId,
      "aria-labelledby": e.accordionId,
      "aria-hidden": e.isExpanded ? void 0 : !0,
      class: "cdx-accordion__content",
      role: "region"
    }, [
      _(e.$slots, "default")
    ], 8, xn), [
      [Ie, e.isExpanded]
    ])
  ], 2);
}
const ls = /* @__PURE__ */ E(Cn, [["render", Mn]]);
function vt(e) {
  return e.label === void 0 ? e.value : e.label === null ? "" : e.label;
}
const Bn = K({
  name: "CdxButtonGroup",
  components: {
    CdxButton: be,
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
      getButtonLabel: vt
    };
  }
});
const An = { class: "cdx-button-group" };
function Tn(e, t, n, a, s, d) {
  const l = k("cdx-icon"), i = k("cdx-button");
  return u(), m("div", An, [
    (u(!0), m(ye, null, we(e.buttons, (o) => (u(), T(i, {
      key: o.value,
      disabled: o.disabled || e.disabled,
      "aria-label": o.ariaLabel,
      onClick: (r) => e.$emit("click", o.value)
    }, {
      default: x(() => [
        _(e.$slots, "default", { button: o }, () => [
          o.icon ? (u(), T(l, {
            key: 0,
            icon: o.icon
          }, null, 8, ["icon"])) : $("", !0),
          le(" " + N(e.getButtonLabel(o)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["disabled", "aria-label", "onClick"]))), 128))
  ]);
}
const ss = /* @__PURE__ */ E(Bn, [["render", Tn]]), Ln = K({
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
      default: Wt
    }
  },
  setup: (e) => {
    const t = f(!1), n = f({}), a = (s) => {
      const d = s.replace(/([\\"\n])/g, "\\$1"), l = new Image();
      l.onload = () => {
        n.value = { backgroundImage: `url("${d}")` }, t.value = !0;
      }, l.onerror = () => {
        t.value = !1;
      }, l.src = d;
    };
    return fe(() => {
      var s;
      (s = e.thumbnail) != null && s.url && a(e.thumbnail.url);
    }), {
      thumbnailStyle: n,
      thumbnailLoaded: t
    };
  }
});
const Vn = { class: "cdx-thumbnail" }, Dn = {
  key: 0,
  class: "cdx-thumbnail__placeholder"
};
function Kn(e, t, n, a, s, d) {
  const l = k("cdx-icon");
  return u(), m("span", Vn, [
    e.thumbnailLoaded ? $("", !0) : (u(), m("span", Dn, [
      O(l, {
        icon: e.placeholderIcon,
        class: "cdx-thumbnail__placeholder__icon--vue"
      }, null, 8, ["icon"])
    ])),
    O(Re, { name: "cdx-thumbnail__image" }, {
      default: x(() => [
        e.thumbnailLoaded ? (u(), m("span", {
          key: 0,
          style: se(e.thumbnailStyle),
          class: "cdx-thumbnail__image"
        }, null, 4)) : $("", !0)
      ]),
      _: 1
    })
  ]);
}
const gt = /* @__PURE__ */ E(Ln, [["render", Kn]]), En = K({
  name: "CdxCard",
  components: { CdxIcon: J, CdxThumbnail: gt },
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
    const t = c(() => !!e.url), n = c(() => t.value ? "a" : "span"), a = c(() => t.value ? e.url : void 0);
    return {
      isLink: t,
      contentTag: n,
      cardLink: a
    };
  }
});
const Fn = { class: "cdx-card__text" }, Rn = { class: "cdx-card__text__title" }, zn = {
  key: 0,
  class: "cdx-card__text__description"
}, On = {
  key: 1,
  class: "cdx-card__text__supporting-text"
};
function Nn(e, t, n, a, s, d) {
  const l = k("cdx-thumbnail"), i = k("cdx-icon");
  return u(), T(Se(e.contentTag), {
    href: e.cardLink,
    class: D(["cdx-card", {
      "cdx-card--is-link": e.isLink,
      // Include dynamic classes in the template so that $slots is reactive.
      "cdx-card--title-only": !e.$slots.description && !e.$slots["supporting-text"]
    }])
  }, {
    default: x(() => [
      e.thumbnail || e.forceThumbnail ? (u(), T(l, {
        key: 0,
        thumbnail: e.thumbnail,
        "placeholder-icon": e.customPlaceholderIcon,
        class: "cdx-card__thumbnail"
      }, null, 8, ["thumbnail", "placeholder-icon"])) : e.icon ? (u(), T(i, {
        key: 1,
        icon: e.icon,
        class: "cdx-card__icon"
      }, null, 8, ["icon"])) : $("", !0),
      h("span", Fn, [
        h("span", Rn, [
          _(e.$slots, "title")
        ]),
        e.$slots.description ? (u(), m("span", zn, [
          _(e.$slots, "description")
        ])) : $("", !0),
        e.$slots["supporting-text"] ? (u(), m("span", On, [
          _(e.$slots, "supporting-text")
        ])) : $("", !0)
      ])
    ]),
    _: 3
  }, 8, ["href", "class"]);
}
const as = /* @__PURE__ */ E(En, [["render", Nn]]);
function yt(e) {
  const t = pe(bt, f(!1));
  return c(() => t.value || e.value);
}
function ie(e, t, n) {
  const a = yt(e), s = pe(ht, f("default")), d = c(() => t != null && t.value && t.value !== "default" ? t.value : s.value), l = pe(mt, void 0), i = c(() => l || n);
  return {
    computedDisabled: a,
    computedStatus: d,
    computedInputId: i
  };
}
function de(e, t = c(() => ({}))) {
  const n = c(() => {
    const d = me(t.value, []);
    return e.class && e.class.split(" ").forEach((i) => {
      d[i] = !0;
    }), d;
  }), a = c(() => {
    if ("style" in e)
      return e.style;
  }), s = c(() => {
    const o = e, { class: d, style: l } = o;
    return me(o, ["class", "style"]);
  });
  return {
    rootClasses: n,
    rootStyle: a,
    otherAttrs: s
  };
}
const qn = K({
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
    const { computedDisabled: n } = ie(F(e, "disabled")), a = c(() => ({
      "cdx-label--visually-hidden": e.visuallyHidden,
      "cdx-label--disabled": n.value
    })), {
      rootClasses: s,
      rootStyle: d,
      otherAttrs: l
    } = de(t, a);
    return {
      rootClasses: s,
      rootStyle: d,
      otherAttrs: l
    };
  }
});
const Hn = ["for"], jn = { class: "cdx-label__label__text" }, Un = {
  key: 1,
  class: "cdx-label__label__optional-flag"
}, Wn = ["id"], Pn = { class: "cdx-label__label" }, Qn = { class: "cdx-label__label__text" }, Gn = {
  key: 1,
  class: "cdx-label__label__optional-flag"
}, Zn = {
  key: 0,
  class: "cdx-label__description"
};
function Jn(e, t, n, a, s, d) {
  const l = k("cdx-icon");
  return e.isLegend ? (u(), m("legend", Z({
    key: 1,
    class: ["cdx-label cdx-label--is-legend", e.rootClasses],
    style: e.rootStyle
  }, e.otherAttrs), [
    h("span", Pn, [
      e.icon ? (u(), T(l, {
        key: 0,
        icon: e.icon,
        class: "cdx-label__label__icon"
      }, null, 8, ["icon"])) : $("", !0),
      h("span", Qn, [
        _(e.$slots, "default")
      ]),
      e.optionalFlag ? (u(), m("span", Gn, N(" ") + " " + N(e.optionalFlag), 1)) : $("", !0)
    ]),
    e.$slots.description && e.$slots.description().length > 0 ? (u(), m("span", Zn, [
      _(e.$slots, "description")
    ])) : $("", !0)
  ], 16)) : (u(), m("div", {
    key: 0,
    class: D(["cdx-label", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    h("label", Z({
      class: "cdx-label__label",
      for: e.inputId ? e.inputId : void 0
    }, e.otherAttrs), [
      e.icon ? (u(), T(l, {
        key: 0,
        icon: e.icon,
        class: "cdx-label__label__icon"
      }, null, 8, ["icon"])) : $("", !0),
      h("span", jn, [
        _(e.$slots, "default")
      ]),
      e.optionalFlag ? (u(), m("span", Un, N(" ") + " " + N(e.optionalFlag), 1)) : $("", !0)
    ], 16, Hn),
    e.$slots.description && e.$slots.description().length > 0 ? (u(), m("span", {
      key: 0,
      id: e.descriptionId || void 0,
      class: "cdx-label__description"
    }, [
      _(e.$slots, "description")
    ], 8, Wn)) : $("", !0)
  ], 6));
}
const Be = /* @__PURE__ */ E(qn, [["render", Jn]]);
function qe(e, t, n) {
  e && e.length > 0 || (t == null ? void 0 : t["aria-label"]) || (t == null ? void 0 : t["aria-labelledby"]) || Fe(`${n}: Inputs must have an associated label. Provide one of the following:
 - A label via the appropriate slot
 - An \`aria-label\` attribute set to the label text
 - An \`aria-labelledby\` attribute set to the ID of the label element`);
}
function ue(e, t, n) {
  return c({
    get: () => e.value,
    set: (a) => (
      // If eventName is undefined, then 'update:modelValue' must be a valid EventName,
      // but TypeScript's type analysis isn't clever enough to realize that
      t(n || "update:modelValue", a)
    )
  });
}
const Xn = K({
  name: "CdxCheckbox",
  components: { CdxLabel: Be },
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
  setup(e, { emit: t, slots: n, attrs: a }) {
    var b;
    qe((b = n.default) == null ? void 0 : b.call(n), a, "CdxCheckbox");
    const s = c(() => ({
      "cdx-checkbox--inline": e.inline
    })), { computedDisabled: d } = ie(F(e, "disabled")), l = f(), i = W("checkbox"), o = W("description"), r = () => {
      l.value.click();
    }, p = ue(F(e, "modelValue"), t);
    return {
      rootClasses: s,
      computedDisabled: d,
      input: l,
      checkboxId: i,
      descriptionId: o,
      clickInput: r,
      wrappedModel: p
    };
  }
});
const Yn = ["id", "aria-describedby", "value", "disabled", ".indeterminate"], eo = /* @__PURE__ */ h("span", { class: "cdx-checkbox__icon" }, null, -1);
function to(e, t, n, a, s, d) {
  const l = k("cdx-label");
  return u(), m("span", {
    class: D(["cdx-checkbox", e.rootClasses])
  }, [
    ae(h("input", {
      id: e.checkboxId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wrappedModel = i),
      class: "cdx-checkbox__input",
      type: "checkbox",
      "aria-describedby": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      value: e.inputValue,
      disabled: e.computedDisabled,
      ".indeterminate": e.indeterminate,
      onKeydown: t[1] || (t[1] = ne(te((...i) => e.clickInput && e.clickInput(...i), ["prevent"]), ["enter"]))
    }, null, 40, Yn), [
      [st, e.wrappedModel]
    ]),
    eo,
    e.$slots.default && e.$slots.default().length ? (u(), T(l, {
      key: 0,
      class: "cdx-checkbox__label",
      "input-id": e.checkboxId,
      "description-id": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      disabled: e.computedDisabled
    }, xe({
      default: x(() => [
        _(e.$slots, "default")
      ]),
      _: 2
    }, [
      e.$slots.description && e.$slots.description().length > 0 ? {
        name: "description",
        fn: x(() => [
          _(e.$slots, "description")
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["input-id", "description-id", "disabled"])) : $("", !0)
  ], 2);
}
const is = /* @__PURE__ */ E(Xn, [["render", to]]), no = {
  error: dt,
  warning: at,
  success: ut
}, oo = K({
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
      validator: ct
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
      () => e.status === "notice" ? e.icon : no[e.status]
    );
    return {
      iconClass: t,
      computedIcon: n
    };
  }
});
const lo = { class: "cdx-info-chip" }, so = { class: "cdx-info-chip--text" };
function ao(e, t, n, a, s, d) {
  const l = k("cdx-icon");
  return u(), m("div", lo, [
    e.computedIcon ? (u(), T(l, {
      key: 0,
      class: D(["cdx-info-chip__icon", e.iconClass]),
      icon: e.computedIcon
    }, null, 8, ["class", "icon"])) : $("", !0),
    h("span", so, [
      _(e.$slots, "default")
    ])
  ]);
}
const ds = /* @__PURE__ */ E(oo, [["render", ao]]);
function $t(e) {
  return e.replace(/([\\{}()|.?*+\-^$[\]])/g, "\\$1");
}
const io = "[̀-ͯ҃-҉֑-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣঁ-ঃ়া-ৄেৈো-্ৗৢৣ৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑੰੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣஂா-ூெ-ைொ-்ௗఀ-ఄా-ౄె-ైొ-్ౕౖౢౣಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣංඃ්ා-ුූෘ-ෟෲෳัิ-ฺ็-๎ັິ-ູົຼ່-ໍ༹༘༙༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏႚ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝᠋-᠍ᢅᢆᢩᤠ-ᤫᤰ-᤻ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼᪰-᪾ᬀ-ᬄ᬴-᭄᭫-᭳ᮀ-ᮂᮡ-ᮭ᯦-᯳ᰤ-᰷᳐-᳔᳒-᳨᳭ᳲ-᳴᳷-᳹᷀-᷹᷻-᷿⃐-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯-꙲ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣠-꣱ꣿꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀ꧥꨩ-ꨶꩃꩌꩍꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭ﬞ︀-️︠-︯]";
function _t(e, t) {
  if (!e)
    return [t, "", ""];
  const n = $t(e), a = new RegExp(
    // Per https://www.regular-expressions.info/unicode.html, "any code point that is not a
    // combining mark can be followed by any number of combining marks." See also the
    // discussion in https://phabricator.wikimedia.org/T35242.
    n + io + "*",
    "i"
  ).exec(t);
  if (!a || a.index === void 0)
    return [t, "", ""];
  const s = a.index, d = s + a[0].length, l = t.slice(s, d), i = t.slice(0, s), o = t.slice(d, t.length);
  return [i, l, o];
}
const us = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  regExpEscape: $t,
  splitStringAtMatch: _t
}, Symbol.toStringTag, { value: "Module" })), uo = K({
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
    titleChunks: c(() => _t(e.searchQuery, String(e.title)))
  })
});
const ro = { class: "cdx-search-result-title" }, co = { class: "cdx-search-result-title__match" };
function po(e, t, n, a, s, d) {
  return u(), m("span", ro, [
    h("bdi", null, [
      le(N(e.titleChunks[0]), 1),
      h("span", co, N(e.titleChunks[1]), 1),
      le(N(e.titleChunks[2]), 1)
    ])
  ]);
}
const fo = /* @__PURE__ */ E(uo, [["render", po]]), mo = K({
  name: "CdxMenuItem",
  components: { CdxIcon: J, CdxThumbnail: gt, CdxSearchResultTitle: fo },
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
    }, a = () => {
      t("change", "highlighted", !1);
    }, s = (p) => {
      p.button === 0 && t("change", "active", !0);
    }, d = () => {
      t("change", "selected", !0);
    }, l = c(() => e.searchQuery.length > 0), i = c(() => ({
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
      "cdx-menu-item--highlight-query": l.value,
      "cdx-menu-item--bold-label": e.boldLabel,
      "cdx-menu-item--has-description": !!e.description,
      "cdx-menu-item--hide-description-overflow": e.hideDescriptionOverflow
    })), o = c(() => e.url ? "a" : "span"), r = c(() => e.label || String(e.value));
    return {
      onMouseMove: n,
      onMouseLeave: a,
      onMouseDown: s,
      onClick: d,
      highlightQuery: l,
      rootClasses: i,
      contentTag: o,
      title: r
    };
  }
});
const ho = ["id", "aria-disabled", "aria-selected"], bo = { class: "cdx-menu-item__text" }, vo = ["lang"], go = ["lang"], yo = ["lang"], $o = ["lang"];
function _o(e, t, n, a, s, d) {
  const l = k("cdx-thumbnail"), i = k("cdx-icon"), o = k("cdx-search-result-title");
  return u(), m("li", {
    id: e.id,
    role: "option",
    class: D(["cdx-menu-item", e.rootClasses]),
    "aria-disabled": e.disabled,
    "aria-selected": e.selected,
    onMousemove: t[0] || (t[0] = (...r) => e.onMouseMove && e.onMouseMove(...r)),
    onMouseleave: t[1] || (t[1] = (...r) => e.onMouseLeave && e.onMouseLeave(...r)),
    onMousedown: t[2] || (t[2] = te((...r) => e.onMouseDown && e.onMouseDown(...r), ["prevent"])),
    onClick: t[3] || (t[3] = (...r) => e.onClick && e.onClick(...r))
  }, [
    _(e.$slots, "default", {}, () => [
      (u(), T(Se(e.contentTag), {
        href: e.url ? e.url : void 0,
        class: "cdx-menu-item__content"
      }, {
        default: x(() => {
          var r, p, b, S, g, L;
          return [
            e.showThumbnail ? (u(), T(l, {
              key: 0,
              thumbnail: e.thumbnail,
              class: "cdx-menu-item__thumbnail"
            }, null, 8, ["thumbnail"])) : e.icon ? (u(), T(i, {
              key: 1,
              icon: e.icon,
              class: "cdx-menu-item__icon"
            }, null, 8, ["icon"])) : $("", !0),
            h("span", bo, [
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
                h("bdi", null, N(e.title), 1)
              ], 8, vo)),
              e.match ? (u(), m(ye, { key: 2 }, [
                le(N(" ") + " "),
                e.highlightQuery ? (u(), T(o, {
                  key: 0,
                  title: e.match,
                  "search-query": e.searchQuery,
                  lang: (b = e.language) == null ? void 0 : b.match
                }, null, 8, ["title", "search-query", "lang"])) : (u(), m("span", {
                  key: 1,
                  class: "cdx-menu-item__text__match",
                  lang: (S = e.language) == null ? void 0 : S.match
                }, [
                  h("bdi", null, N(e.match), 1)
                ], 8, go))
              ], 64)) : $("", !0),
              e.supportingText ? (u(), m(ye, { key: 3 }, [
                le(N(" ") + " "),
                h("span", {
                  class: "cdx-menu-item__text__supporting-text",
                  lang: (g = e.language) == null ? void 0 : g.supportingText
                }, [
                  h("bdi", null, N(e.supportingText), 1)
                ], 8, yo)
              ], 64)) : $("", !0),
              e.description ? (u(), m("span", {
                key: 4,
                class: "cdx-menu-item__text__description",
                lang: (L = e.language) == null ? void 0 : L.description
              }, [
                h("bdi", null, N(e.description), 1)
              ], 8, $o)) : $("", !0)
            ])
          ];
        }),
        _: 1
      }, 8, ["href"]))
    ])
  ], 42, ho);
}
const Io = /* @__PURE__ */ E(mo, [["render", _o]]), Co = K({
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
const ko = ["aria-disabled"], So = /* @__PURE__ */ h("div", { class: "cdx-progress-bar__bar" }, null, -1), wo = [
  So
];
function xo(e, t, n, a, s, d) {
  return u(), m("div", {
    class: D(["cdx-progress-bar", e.rootClasses]),
    role: "progressbar",
    "aria-disabled": e.disabled,
    "aria-valuemin": "0",
    "aria-valuemax": "100"
  }, wo, 10, ko);
}
const Mo = /* @__PURE__ */ E(Co, [["render", xo]]);
function Ee(e, t) {
  const n = f(!1);
  let a = !1;
  if (typeof window != "object" || !("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype))
    return n;
  const s = new window.IntersectionObserver(
    (d) => {
      const l = d[0];
      l && (n.value = l.isIntersecting);
    },
    t
  );
  return fe(() => {
    a = !0, e.value && s.observe(e.value);
  }), ze(() => {
    a = !1, s.disconnect();
  }), oe(e, (d) => {
    a && (s.disconnect(), n.value = !1, d && s.observe(d));
  }), n;
}
const Bo = K({
  name: "CdxMenu",
  components: {
    CdxMenuItem: Io,
    CdxProgressBar: Mo
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
  setup(e, { emit: t, slots: n, attrs: a }) {
    const s = c(() => (e.footer && e.menuItems ? [...e.menuItems, e.footer] : e.menuItems).map((V) => Xe(Je({}, V), {
      id: W("menu-item")
    }))), d = c(() => n["no-results"] ? e.showNoResultsSlot !== null ? e.showNoResultsSlot : s.value.length === 0 : !1), l = f(null), i = f(!1), o = f(null);
    function r() {
      return s.value.find(
        (I) => I.value === e.selected
      );
    }
    function p(I, V) {
      var U;
      if (!(V && V.disabled))
        switch (I) {
          case "selected":
            t("update:selected", (U = V == null ? void 0 : V.value) != null ? U : null), t("update:expanded", !1), o.value = null;
            break;
          case "highlighted":
            l.value = V || null, i.value = !1;
            break;
          case "highlightedViaKeyboard":
            l.value = V || null, i.value = !0;
            break;
          case "active":
            o.value = V || null;
            break;
        }
    }
    const b = c(() => {
      if (l.value !== null)
        return s.value.findIndex(
          (I) => (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            I.value === l.value.value
          )
        );
    });
    function S(I) {
      I && (p("highlightedViaKeyboard", I), t("menu-item-keyboard-navigation", I));
    }
    function g(I) {
      var X;
      const V = ($e) => {
        for (let C = $e - 1; C >= 0; C--)
          if (!s.value[C].disabled)
            return s.value[C];
      };
      I = I || s.value.length;
      const U = (X = V(I)) != null ? X : V(s.value.length);
      S(U);
    }
    function L(I) {
      const V = (X) => s.value.find(($e, C) => !$e.disabled && C > X);
      I = I != null ? I : -1;
      const U = V(I) || V(-1);
      S(U);
    }
    function R(I, V = !0) {
      function U() {
        t("update:expanded", !0), p("highlighted", r());
      }
      function X() {
        V && (I.preventDefault(), I.stopPropagation());
      }
      switch (I.key) {
        case "Enter":
        case " ":
          return X(), e.expanded ? (l.value && i.value && t("update:selected", l.value.value), t("update:expanded", !1)) : U(), !0;
        case "Tab":
          return e.expanded && (l.value && i.value && t("update:selected", l.value.value), t("update:expanded", !1)), !0;
        case "ArrowUp":
          return X(), e.expanded ? (l.value === null && p("highlightedViaKeyboard", r()), g(b.value)) : U(), H(), !0;
        case "ArrowDown":
          return X(), e.expanded ? (l.value === null && p("highlightedViaKeyboard", r()), L(b.value)) : U(), H(), !0;
        case "Home":
          return X(), e.expanded ? (l.value === null && p("highlightedViaKeyboard", r()), L()) : U(), H(), !0;
        case "End":
          return X(), e.expanded ? (l.value === null && p("highlightedViaKeyboard", r()), g()) : U(), H(), !0;
        case "Escape":
          return X(), t("update:expanded", !1), !0;
        default:
          return !1;
      }
    }
    function z() {
      p("active");
    }
    const q = [], P = f(void 0), j = Ee(
      P,
      { threshold: 0.8 }
    );
    oe(j, (I) => {
      I && t("load-more");
    });
    function Q(I, V) {
      if (I) {
        q[V] = I.$el;
        const U = e.visibleItemLimit;
        if (!U || e.menuItems.length < U)
          return;
        const X = Math.min(
          U,
          Math.max(2, Math.floor(0.2 * e.menuItems.length))
        );
        V === e.menuItems.length - X && (P.value = I.$el);
      }
    }
    function H() {
      if (!e.visibleItemLimit || e.visibleItemLimit > e.menuItems.length || b.value === void 0)
        return;
      const I = b.value >= 0 ? b.value : 0;
      q[I].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
    const B = f(null), A = f(null);
    function M() {
      if (A.value = null, !e.visibleItemLimit || q.length <= e.visibleItemLimit) {
        B.value = null;
        return;
      }
      const I = q[0], V = q[e.visibleItemLimit];
      if (B.value = v(
        I,
        V
      ), e.footer) {
        const U = q[q.length - 1];
        A.value = U.scrollHeight;
      }
    }
    function v(I, V) {
      const U = I.getBoundingClientRect().top;
      return V.getBoundingClientRect().top - U + 2;
    }
    fe(() => {
      document.addEventListener("mouseup", z);
    }), ze(() => {
      document.removeEventListener("mouseup", z);
    }), oe(F(e, "expanded"), (I) => Le(this, null, function* () {
      const V = r();
      !I && l.value && V === void 0 && p("highlighted"), I && V !== void 0 && p("highlighted", V), I && (yield _e(), M(), yield _e(), H());
    })), oe(F(e, "menuItems"), (I) => Le(this, null, function* () {
      I.length < q.length && (q.length = I.length), e.expanded && (yield _e(), M(), yield _e(), H());
    }), { deep: !0 });
    const y = c(() => ({
      "max-height": B.value ? `${B.value}px` : void 0,
      "overflow-y": B.value ? "scroll" : void 0,
      "margin-bottom": A.value ? `${A.value}px` : void 0
    })), w = c(() => ({
      "cdx-menu--has-footer": !!e.footer,
      "cdx-menu--has-sticky-footer": !!e.footer && !!B.value
    })), {
      rootClasses: G,
      rootStyle: re,
      otherAttrs: Ce
    } = de(a, w);
    return {
      listBoxStyle: y,
      rootClasses: G,
      rootStyle: re,
      otherAttrs: Ce,
      assignTemplateRef: Q,
      computedMenuItems: s,
      computedShowNoResultsSlot: d,
      highlightedMenuItem: l,
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
const Ao = {
  key: 0,
  class: "cdx-menu__pending cdx-menu-item"
}, To = {
  key: 1,
  class: "cdx-menu__no-results cdx-menu-item"
};
function Lo(e, t, n, a, s, d) {
  const l = k("cdx-menu-item"), i = k("cdx-progress-bar");
  return ae((u(), m("div", {
    class: D(["cdx-menu", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    h("ul", Z({
      class: "cdx-menu__listbox",
      role: "listbox",
      style: e.listBoxStyle
    }, e.otherAttrs), [
      e.showPending && e.computedMenuItems.length === 0 && e.$slots.pending ? (u(), m("li", Ao, [
        _(e.$slots, "pending")
      ])) : $("", !0),
      e.computedShowNoResultsSlot ? (u(), m("li", To, [
        _(e.$slots, "no-results")
      ])) : $("", !0),
      (u(!0), m(ye, null, we(e.computedMenuItems, (o, r) => {
        var p, b;
        return u(), T(l, Z({
          key: o.value,
          ref_for: !0,
          ref: (S) => e.assignTemplateRef(S, r)
        }, o, {
          selected: o.value === e.selected,
          active: o.value === ((p = e.activeMenuItem) == null ? void 0 : p.value),
          highlighted: o.value === ((b = e.highlightedMenuItem) == null ? void 0 : b.value),
          "show-thumbnail": e.showThumbnail,
          "bold-label": e.boldLabel,
          "hide-description-overflow": e.hideDescriptionOverflow,
          "search-query": e.searchQuery,
          onChange: (S, g) => e.handleMenuItemChange(S, g && o),
          onClick: (S) => e.$emit("menu-item-click", o)
        }), {
          default: x(() => {
            var S, g;
            return [
              _(e.$slots, "default", {
                menuItem: o,
                active: o.value === ((S = e.activeMenuItem) == null ? void 0 : S.value) && o.value === ((g = e.highlightedMenuItem) == null ? void 0 : g.value)
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
      })) : $("", !0)
    ], 16)
  ], 6)), [
    [Ie, e.expanded]
  ]);
}
const Ae = /* @__PURE__ */ E(Bo, [["render", Lo]]), Vo = ee(sn), Do = ee(he), Ko = K({
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
      validator: Vo
    },
    /**
     * `status` attribute of the input.
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: Do
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
    const a = n.id, {
      computedDisabled: s,
      computedStatus: d,
      computedInputId: l
    } = ie(
      F(e, "disabled"),
      F(e, "status"),
      a
    ), i = pe(Me, void 0), o = ue(F(e, "modelValue"), t), r = c(() => e.clearable && !!o.value && !s.value), p = c(() => ({
      "cdx-text-input--has-start-icon": !!e.startIcon,
      "cdx-text-input--has-end-icon": !!e.endIcon,
      "cdx-text-input--clearable": r.value,
      [`cdx-text-input--status-${d.value}`]: !0
    })), {
      rootClasses: b,
      rootStyle: S,
      otherAttrs: g
    } = de(n, p), L = c(() => {
      const M = g.value, { id: B } = M;
      return me(M, ["id"]);
    }), R = c(() => ({
      "cdx-text-input__input--has-value": !!o.value
    }));
    return {
      computedInputId: l,
      descriptionId: i,
      wrappedModel: o,
      isClearable: r,
      rootClasses: b,
      rootStyle: S,
      otherAttrsMinusId: L,
      inputClasses: R,
      computedDisabled: s,
      onClear: (B) => {
        o.value = "", t("clear", B);
      },
      onInput: (B) => {
        t("input", B);
      },
      onChange: (B) => {
        t("change", B);
      },
      onKeydown: (B) => {
        (B.key === "Home" || B.key === "End") && !B.ctrlKey && !B.metaKey || t("keydown", B);
      },
      onFocus: (B) => {
        t("focus", B);
      },
      onBlur: (B) => {
        t("blur", B);
      },
      cdxIconClear: Ut
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
const Eo = ["id", "type", "aria-describedby", "disabled"];
function Fo(e, t, n, a, s, d) {
  const l = k("cdx-icon");
  return u(), m("div", {
    class: D(["cdx-text-input", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    ae(h("input", Z({
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
    }), null, 16, Eo), [
      [xt, e.wrappedModel]
    ]),
    e.startIcon ? (u(), T(l, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__start-icon"
    }, null, 8, ["icon"])) : $("", !0),
    e.endIcon ? (u(), T(l, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__end-icon"
    }, null, 8, ["icon"])) : $("", !0),
    e.isClearable ? (u(), T(l, {
      key: 2,
      icon: e.cdxIconClear,
      class: "cdx-text-input__icon-vue cdx-text-input__clear-icon",
      onMousedown: t[6] || (t[6] = te(() => {
      }, ["prevent"])),
      onClick: e.onClear
    }, null, 8, ["icon", "onClick"])) : $("", !0)
  ], 6);
}
const He = /* @__PURE__ */ E(Ko, [["render", Fo]]);
function Te(e) {
  const t = f(
    { width: void 0, height: void 0 }
  );
  if (typeof window != "object" || !("ResizeObserver" in window) || !("ResizeObserverEntry" in window))
    return t;
  const n = new window.ResizeObserver(
    (s) => {
      const d = s[0];
      d && (t.value = {
        width: d.borderBoxSize[0].inlineSize,
        height: d.borderBoxSize[0].blockSize
      });
    }
  );
  let a = !1;
  return fe(() => {
    a = !0, e.value && n.observe(e.value);
  }), ze(() => {
    a = !1, n.disconnect();
  }), oe(e, (s) => {
    a && (n.disconnect(), t.value = {
      width: void 0,
      height: void 0
    }, s && n.observe(s));
  }), t;
}
const Ro = ee(he), je = K({
  name: "CdxCombobox",
  components: {
    CdxButton: be,
    CdxIcon: J,
    CdxMenu: Ae,
    CdxTextInput: He
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
      validator: Ro
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
  setup(e, { emit: t, attrs: n, slots: a }) {
    const s = f(), d = f(), l = f(), i = W("combobox"), o = F(e, "selected"), r = ue(o, t, "update:selected"), p = f(!1), b = f(!1), S = c(() => {
      var v, y;
      return (y = (v = l.value) == null ? void 0 : v.getHighlightedMenuItem()) == null ? void 0 : y.id;
    }), { computedDisabled: g } = ie(F(e, "disabled")), L = c(() => ({
      "cdx-combobox--expanded": p.value,
      "cdx-combobox--disabled": g.value
    })), R = Te(d), z = c(() => {
      var v;
      return `${(v = R.value.width) != null ? v : 0}px`;
    }), {
      rootClasses: q,
      rootStyle: P,
      otherAttrs: j
    } = de(n, L);
    function Q(v) {
      b.value && p.value ? p.value = !1 : (e.menuItems.length > 0 || a["no-results"]) && (p.value = !0), t("focus", v);
    }
    function H(v) {
      p.value = b.value && p.value, t("blur", v);
    }
    function B() {
      g.value || (b.value = !0);
    }
    function A() {
      var v;
      g.value || (v = s.value) == null || v.focus();
    }
    function M(v) {
      !l.value || g.value || e.menuItems.length === 0 || v.key === " " || l.value.delegateKeyNavigation(v);
    }
    return oe(p, () => {
      b.value = !1;
    }), {
      input: s,
      inputWrapper: d,
      currentWidthInPx: z,
      menu: l,
      menuId: i,
      modelWrapper: r,
      expanded: p,
      highlightedId: S,
      computedDisabled: g,
      onInputFocus: Q,
      onInputBlur: H,
      onKeydown: M,
      onButtonClick: A,
      onButtonMousedown: B,
      cdxIconExpand: Ne,
      rootClasses: q,
      rootStyle: P,
      otherAttrs: j
    };
  }
}), Ye = () => {
  Oe((e) => ({
    "49698e7b": e.currentWidthInPx
  }));
}, et = je.setup;
je.setup = et ? (e, t) => (Ye(), et(e, t)) : Ye;
const zo = {
  ref: "inputWrapper",
  class: "cdx-combobox__input-wrapper"
};
function Oo(e, t, n, a, s, d) {
  const l = k("cdx-text-input"), i = k("cdx-icon"), o = k("cdx-button"), r = k("cdx-menu");
  return u(), m("div", {
    class: D(["cdx-combobox", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    h("div", zo, [
      O(l, Z({
        ref: "input",
        modelValue: e.modelWrapper,
        "onUpdate:modelValue": t[0] || (t[0] = (p) => e.modelWrapper = p)
      }, e.otherAttrs, {
        class: "cdx-combobox__input",
        "aria-activedescendant": e.highlightedId,
        "aria-expanded": e.expanded,
        "aria-controls": e.menuId,
        disabled: e.computedDisabled,
        status: e.status,
        autocomplete: "off",
        role: "combobox",
        onKeydown: e.onKeydown,
        onInput: t[1] || (t[1] = (p) => e.$emit("input", p)),
        onChange: t[2] || (t[2] = (p) => e.$emit("change", p)),
        onFocus: e.onInputFocus,
        onBlur: e.onInputBlur
      }), null, 16, ["modelValue", "aria-activedescendant", "aria-expanded", "aria-controls", "disabled", "status", "onKeydown", "onFocus", "onBlur"]),
      O(o, {
        class: "cdx-combobox__expand-button",
        "aria-hidden": "true",
        disabled: e.computedDisabled,
        tabindex: "-1",
        type: "button",
        onMousedown: e.onButtonMousedown,
        onClick: e.onButtonClick
      }, {
        default: x(() => [
          O(i, {
            class: "cdx-combobox__expand-icon",
            icon: e.cdxIconExpand
          }, null, 8, ["icon"])
        ]),
        _: 1
      }, 8, ["disabled", "onMousedown", "onClick"])
    ], 512),
    O(r, Z({
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
      default: x(({ menuItem: p }) => [
        _(e.$slots, "menu-item", { menuItem: p })
      ]),
      "no-results": x(() => [
        _(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const rs = /* @__PURE__ */ E(je, [["render", Oo]]), No = K({
  name: "CdxDialog",
  components: {
    CdxButton: be,
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
    const n = W("dialog-label"), a = f(), s = f(), d = f(), l = f(), i = f(), o = c(() => !e.hideTitle || !!e.closeButtonLabel), r = c(() => !!e.primaryAction || !!e.defaultAction), p = Te(s), b = c(() => {
      var j;
      return (j = p.value.height) != null ? j : 0;
    }), S = f(!1), g = c(() => ({
      "cdx-dialog--vertical-actions": e.stackedActions,
      "cdx-dialog--horizontal-actions": !e.stackedActions,
      "cdx-dialog--dividers": S.value
    })), L = f(0);
    function R() {
      t("update:open", !1);
    }
    function z() {
      P(a.value);
    }
    function q() {
      P(a.value, !0);
    }
    function P(j, Q = !1) {
      let H = Array.from(
        j.querySelectorAll(`
					input, select, textarea, button, object, a, area,
					[contenteditable], [tabindex]:not([tabindex^="-"])
				`)
      );
      Q && (H = H.reverse());
      for (const B of H)
        if (B.focus(), document.activeElement === B)
          return !0;
      return !1;
    }
    return oe(F(e, "open"), (j) => {
      j ? (L.value = window.innerWidth - document.documentElement.clientWidth, document.documentElement.style.setProperty("margin-right", `${L.value}px`), document.body.classList.add("cdx-dialog-open"), _e(() => {
        var Q;
        P(s.value) || (Q = d.value) == null || Q.focus();
      })) : (document.body.classList.remove("cdx-dialog-open"), document.documentElement.style.removeProperty("margin-right"));
    }), oe(b, () => {
      s.value && (S.value = s.value.clientHeight < s.value.scrollHeight);
    }), {
      close: R,
      cdxIconClose: it,
      labelId: n,
      rootClasses: g,
      dialogElement: a,
      focusTrapStart: l,
      focusTrapEnd: i,
      focusFirst: z,
      focusLast: q,
      dialogBody: s,
      focusHolder: d,
      showHeader: o,
      showFooterActions: r
    };
  }
});
const qo = ["aria-label", "aria-labelledby"], Ho = {
  key: 0,
  class: "cdx-dialog__header__title-group"
}, jo = ["id"], Uo = {
  key: 0,
  class: "cdx-dialog__header__subtitle"
}, Wo = {
  ref: "focusHolder",
  class: "cdx-dialog-focus-trap",
  tabindex: "-1"
}, Po = {
  key: 0,
  class: "cdx-dialog__footer__text"
}, Qo = {
  key: 1,
  class: "cdx-dialog__footer__actions"
};
function Go(e, t, n, a, s, d) {
  const l = k("cdx-icon"), i = k("cdx-button");
  return u(), T(Re, {
    name: "cdx-dialog-fade",
    appear: ""
  }, {
    default: x(() => [
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
            class: D(["cdx-dialog__header", { "cdx-dialog__header--default": !e.$slots.header }])
          }, [
            _(e.$slots, "header", {}, () => [
              e.hideTitle ? $("", !0) : (u(), m("div", Ho, [
                h("h2", {
                  id: e.labelId,
                  class: "cdx-dialog__header__title"
                }, N(e.title), 9, jo),
                e.subtitle ? (u(), m("p", Uo, N(e.subtitle), 1)) : $("", !0)
              ])),
              e.closeButtonLabel ? (u(), T(i, {
                key: 1,
                class: "cdx-dialog__header__close-button",
                weight: "quiet",
                type: "button",
                "aria-label": e.closeButtonLabel,
                onClick: e.close
              }, {
                default: x(() => [
                  O(l, {
                    icon: e.cdxIconClose,
                    "icon-label": e.closeButtonLabel
                  }, null, 8, ["icon", "icon-label"])
                ]),
                _: 1
              }, 8, ["aria-label", "onClick"])) : $("", !0)
            ])
          ], 2)) : $("", !0),
          h("div", Wo, null, 512),
          h("div", {
            ref: "dialogBody",
            class: D(["cdx-dialog__body", {
              "cdx-dialog__body--no-header": !(e.showHeader || e.$slots.header),
              "cdx-dialog__body--no-footer": !(e.showFooterActions || e.$slots.footer || e.$slots["footer-text"])
            }])
          }, [
            _(e.$slots, "default")
          ], 2),
          e.showFooterActions || e.$slots.footer || e.$slots["footer-text"] ? (u(), m("footer", {
            key: 1,
            class: D(["cdx-dialog__footer", { "cdx-dialog__footer--default": !e.$slots.footer }])
          }, [
            _(e.$slots, "footer", {}, () => [
              e.$slots["footer-text"] ? (u(), m("p", Po, [
                _(e.$slots, "footer-text")
              ])) : $("", !0),
              e.showFooterActions ? (u(), m("div", Qo, [
                e.primaryAction ? (u(), T(i, {
                  key: 0,
                  class: "cdx-dialog__footer__primary-action",
                  weight: "primary",
                  action: e.primaryAction.actionType,
                  disabled: e.primaryAction.disabled,
                  onClick: t[1] || (t[1] = (o) => e.$emit("primary"))
                }, {
                  default: x(() => [
                    le(N(e.primaryAction.label), 1)
                  ]),
                  _: 1
                }, 8, ["action", "disabled"])) : $("", !0),
                e.defaultAction ? (u(), T(i, {
                  key: 1,
                  class: "cdx-dialog__footer__default-action",
                  disabled: e.defaultAction.disabled,
                  onClick: t[2] || (t[2] = (o) => e.$emit("default"))
                }, {
                  default: x(() => [
                    le(N(e.defaultAction.label), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])) : $("", !0)
              ])) : $("", !0)
            ])
          ], 2)) : $("", !0)
        ], 16, qo),
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
const cs = /* @__PURE__ */ E(No, [["render", Go]]), Zo = {
  notice: Pt,
  error: dt,
  warning: at,
  success: ut
}, Jo = K({
  name: "CdxMessage",
  components: { CdxButton: be, CdxIcon: J },
  props: {
    /**
     * Status type of Message.
     *
     * @values 'notice', 'warning', 'error', 'success'
     */
    type: {
      type: String,
      default: "notice",
      validator: ct
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
     * Error messages cannot be automatically dismissed. If the `type` prop is set to `error`,
     * this prop will be ignored.
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
    const n = f(!1), a = c(
      () => e.inline === !1 && e.dismissButtonLabel.length > 0
    ), s = c(() => e.autoDismiss === !1 || e.type === "error" ? !1 : e.autoDismiss === !0 ? 4e3 : e.autoDismiss), d = c(() => ({
      "cdx-message--inline": e.inline,
      "cdx-message--block": !e.inline,
      "cdx-message--user-dismissable": a.value,
      [`cdx-message--${e.type}`]: !0
    })), l = c(
      () => e.icon && e.type === "notice" ? e.icon : Zo[e.type]
    ), i = f("");
    function o(r) {
      n.value || (i.value = r === "user-dismissed" ? "cdx-message-leave-active-user" : "cdx-message-leave-active-system", n.value = !0, t(r));
    }
    return fe(() => {
      e.type === "error" && e.autoDismiss !== !1 ? Fe('CdxMessage: Message with type="error" cannot use auto-dismiss') : s.value && setTimeout(() => o("auto-dismissed"), s.value);
    }), {
      dismissed: n,
      userDismissable: a,
      rootClasses: d,
      leaveActiveClass: i,
      computedIcon: l,
      onDismiss: o,
      cdxIconClose: it
    };
  }
});
const Xo = ["aria-live", "role"], Yo = { class: "cdx-message__content" };
function el(e, t, n, a, s, d) {
  const l = k("cdx-icon"), i = k("cdx-button");
  return u(), T(Re, {
    name: "cdx-message",
    appear: e.fadeIn,
    "leave-active-class": e.leaveActiveClass
  }, {
    default: x(() => [
      e.dismissed ? $("", !0) : (u(), m("div", {
        key: 0,
        class: D(["cdx-message", e.rootClasses]),
        "aria-live": e.type !== "error" ? "polite" : void 0,
        role: e.type === "error" ? "alert" : void 0
      }, [
        O(l, {
          class: "cdx-message__icon--vue",
          icon: e.computedIcon
        }, null, 8, ["icon"]),
        h("div", Yo, [
          _(e.$slots, "default")
        ]),
        e.userDismissable ? (u(), T(i, {
          key: 0,
          class: "cdx-message__dismiss-button",
          weight: "quiet",
          type: "button",
          "aria-label": e.dismissButtonLabel,
          onClick: t[0] || (t[0] = (o) => e.onDismiss("user-dismissed"))
        }, {
          default: x(() => [
            O(l, {
              icon: e.cdxIconClose,
              "icon-label": e.dismissButtonLabel
            }, null, 8, ["icon", "icon-label"])
          ]),
          _: 1
        }, 8, ["aria-label"])) : $("", !0)
      ], 10, Xo))
    ]),
    _: 3
  }, 8, ["appear", "leave-active-class"]);
}
const tl = /* @__PURE__ */ E(Jo, [["render", el]]), nl = ee(he), ol = K({
  name: "CdxField",
  components: { CdxLabel: Be, CdxMessage: tl },
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
      validator: nl
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
    const { disabled: n, status: a, isFieldset: s } = Mt(e), d = yt(n), l = c(() => ({
      "cdx-field--disabled": d.value
    })), i = W("label"), o = W("description"), r = W("input");
    s.value || (ge(mt, r), t.description && ge(Me, o)), ge(bt, d), ge(ht, a);
    const p = c(
      () => e.status !== "default" && e.status in e.messages ? e.messages[e.status] : ""
    ), b = c(() => e.status === "default" ? "notice" : e.status);
    return {
      rootClasses: l,
      computedDisabled: d,
      labelId: i,
      descriptionId: o,
      inputId: r,
      validationMessage: p,
      validationMessageType: b
    };
  }
});
const ll = { class: "cdx-field__help-text" }, sl = {
  key: 0,
  class: "cdx-field__validation-message"
};
function al(e, t, n, a, s, d) {
  const l = k("cdx-label"), i = k("cdx-message");
  return u(), T(Se(e.isFieldset ? "fieldset" : "div"), {
    class: D(["cdx-field", e.rootClasses]),
    "aria-disabled": !e.isFieldset && e.computedDisabled ? !0 : void 0,
    disabled: e.isFieldset && e.computedDisabled ? !0 : void 0
  }, {
    default: x(() => [
      O(l, {
        id: e.labelId,
        icon: e.labelIcon,
        "visually-hidden": e.hideLabel,
        "optional-flag": e.optionalFlag,
        "input-id": e.inputId,
        "description-id": e.descriptionId,
        disabled: e.computedDisabled,
        "is-legend": e.isFieldset
      }, xe({
        default: x(() => [
          _(e.$slots, "label")
        ]),
        _: 2
      }, [
        e.$slots.description && e.$slots.description().length > 0 ? {
          name: "description",
          fn: x(() => [
            _(e.$slots, "description")
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["id", "icon", "visually-hidden", "optional-flag", "input-id", "description-id", "disabled", "is-legend"]),
      h("div", {
        class: D(["cdx-field__control", { "cdx-field__control--has-help-text": e.$slots["help-text"] && e.$slots["help-text"]().length > 0 || e.validationMessage }])
      }, [
        _(e.$slots, "default")
      ], 2),
      h("div", ll, [
        _(e.$slots, "help-text")
      ]),
      !e.computedDisabled && e.validationMessage ? (u(), m("div", sl, [
        O(i, {
          type: e.validationMessageType,
          inline: !0
        }, {
          default: x(() => [
            le(N(e.validationMessage), 1)
          ]),
          _: 1
        }, 8, ["type"])
      ])) : $("", !0)
    ]),
    _: 3
  }, 8, ["class", "aria-disabled", "disabled"]);
}
const ps = /* @__PURE__ */ E(ol, [["render", al]]), il = ee(he), Ue = K({
  name: "CdxLookup",
  components: {
    CdxMenu: Ae,
    CdxTextInput: He
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
      validator: il
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
  setup: (e, { emit: t, attrs: n, slots: a }) => {
    const s = f(), d = f(), l = W("lookup-menu"), i = f(!1), o = f(!1), r = f(!1), { computedDisabled: p } = ie(F(e, "disabled")), b = F(e, "selected"), S = ue(b, t, "update:selected"), g = c(
      () => e.menuItems.find((y) => y.value === e.selected)
    ), L = c(() => {
      var y, w;
      return (w = (y = d.value) == null ? void 0 : y.getHighlightedMenuItem()) == null ? void 0 : w.id;
    }), R = f(e.initialInputValue), z = Te(s), q = c(() => {
      var y;
      return `${(y = z.value.width) != null ? y : 0}px`;
    }), P = c(() => ({
      "cdx-lookup--disabled": p.value,
      "cdx-lookup--pending": i.value
    })), {
      rootClasses: j,
      rootStyle: Q,
      otherAttrs: H
    } = de(n, P);
    function B(y) {
      g.value && g.value.label !== y && g.value.value !== y && (S.value = null), y === "" ? (o.value = !1, i.value = !1) : i.value = !0, t("input", y);
    }
    function A(y) {
      r.value = !0, // Input value is not null or an empty string.
      R.value !== null && R.value !== "" && // There's either menu items to show or a no results message.
      (e.menuItems.length > 0 || a["no-results"]) && (o.value = !0), t("focus", y);
    }
    function M(y) {
      r.value = !1, o.value = !1, t("blur", y);
    }
    function v(y) {
      !d.value || p.value || e.menuItems.length === 0 && !a["no-results"] || y.key === " " || d.value.delegateKeyNavigation(y);
    }
    return oe(b, (y) => {
      if (y !== null) {
        const w = g.value ? g.value.label || g.value.value : "";
        R.value !== w && (R.value = w, t("input", R.value));
      }
    }), oe(F(e, "menuItems"), (y) => {
      // Only show the menu if we were in the pending state (meaning this menuItems change
      // was in response to user input) and the menu is still focused
      r.value && i.value && // Show the menu if there are either menu items or no-results content to show
      (y.length > 0 || a["no-results"]) && (o.value = !0), y.length === 0 && !a["no-results"] && (o.value = !1), i.value = !1;
    }), {
      rootElement: s,
      currentWidthInPx: q,
      menu: d,
      menuId: l,
      highlightedId: L,
      inputValue: R,
      modelWrapper: S,
      expanded: o,
      computedDisabled: p,
      onInputBlur: M,
      rootClasses: j,
      rootStyle: Q,
      otherAttrs: H,
      onUpdateInput: B,
      onInputFocus: A,
      onKeydown: v
    };
  }
}), tt = () => {
  Oe((e) => ({
    "49368ef8": e.currentWidthInPx
  }));
}, nt = Ue.setup;
Ue.setup = nt ? (e, t) => (tt(), nt(e, t)) : tt;
function dl(e, t, n, a, s, d) {
  const l = k("cdx-text-input"), i = k("cdx-menu");
  return u(), m("div", {
    ref: "rootElement",
    class: D(["cdx-lookup", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    O(l, Z({
      modelValue: e.inputValue,
      "onUpdate:modelValue": t[0] || (t[0] = (o) => e.inputValue = o)
    }, e.otherAttrs, {
      class: "cdx-lookup__input",
      role: "combobox",
      autocomplete: "off",
      "aria-autocomplete": "list",
      "aria-controls": e.menuId,
      "aria-expanded": e.expanded,
      "aria-activedescendant": e.highlightedId,
      disabled: e.computedDisabled,
      status: e.status,
      "onUpdate:modelValue": e.onUpdateInput,
      onChange: t[1] || (t[1] = (o) => e.$emit("change", o)),
      onFocus: e.onInputFocus,
      onBlur: e.onInputBlur,
      onKeydown: e.onKeydown
    }), null, 16, ["modelValue", "aria-controls", "aria-expanded", "aria-activedescendant", "disabled", "status", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
    O(i, Z({
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
      default: x(({ menuItem: o }) => [
        _(e.$slots, "menu-item", { menuItem: o })
      ]),
      "no-results": x(() => [
        _(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const fs = /* @__PURE__ */ E(Ue, [["render", dl]]), ul = K({
  name: "CdxRadio",
  components: { CdxLabel: Be },
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
  setup(e, { emit: t, slots: n, attrs: a }) {
    var b;
    qe((b = n.default) == null ? void 0 : b.call(n), a, "CdxRadio");
    const s = c(() => ({
      "cdx-radio--inline": e.inline
    })), { computedDisabled: d } = ie(F(e, "disabled")), l = f(), i = W("radio"), o = W("description"), r = () => {
      l.value.focus();
    }, p = ue(F(e, "modelValue"), t);
    return {
      rootClasses: s,
      computedDisabled: d,
      input: l,
      radioId: i,
      descriptionId: o,
      focusInput: r,
      wrappedModel: p
    };
  }
});
const rl = ["id", "aria-describedby", "name", "value", "disabled"], cl = /* @__PURE__ */ h("span", { class: "cdx-radio__icon" }, null, -1);
function pl(e, t, n, a, s, d) {
  const l = k("cdx-label");
  return u(), m("span", {
    class: D(["cdx-radio", e.rootClasses])
  }, [
    ae(h("input", {
      id: e.radioId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wrappedModel = i),
      class: "cdx-radio__input",
      type: "radio",
      "aria-describedby": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      name: e.name,
      value: e.inputValue,
      disabled: e.computedDisabled
    }, null, 8, rl), [
      [Bt, e.wrappedModel]
    ]),
    cl,
    e.$slots.default && e.$slots.default().length ? (u(), T(l, {
      key: 0,
      class: "cdx-radio__label",
      "input-id": e.radioId,
      "description-id": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      disabled: e.computedDisabled,
      onClick: e.focusInput
    }, xe({
      default: x(() => [
        _(e.$slots, "default")
      ]),
      _: 2
    }, [
      e.$slots.description && e.$slots.description().length > 0 ? {
        name: "description",
        fn: x(() => [
          _(e.$slots, "description")
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["input-id", "description-id", "disabled", "onClick"])) : $("", !0)
  ], 2);
}
const ms = /* @__PURE__ */ E(ul, [["render", pl]]), fl = ee(he), ml = K({
  name: "CdxSearchInput",
  components: {
    CdxButton: be,
    CdxTextInput: He
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
      validator: fl
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
    const a = ue(F(e, "modelValue"), t), { computedDisabled: s } = ie(F(e, "disabled")), d = c(() => ({
      "cdx-search-input--has-end-button": !!e.buttonLabel
    })), {
      rootClasses: l,
      rootStyle: i,
      otherAttrs: o
    } = de(n, d);
    return {
      wrappedModel: a,
      computedDisabled: s,
      rootClasses: l,
      rootStyle: i,
      otherAttrs: o,
      handleSubmit: () => {
        t("submit-click", a.value);
      },
      searchIcon: Zt
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
const hl = { class: "cdx-search-input__input-wrapper" };
function bl(e, t, n, a, s, d) {
  const l = k("cdx-text-input"), i = k("cdx-button");
  return u(), m("div", {
    class: D(["cdx-search-input", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    h("div", hl, [
      O(l, Z({
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
      _(e.$slots, "default")
    ]),
    e.buttonLabel ? (u(), T(i, {
      key: 0,
      class: "cdx-search-input__end-button",
      disabled: e.computedDisabled,
      onClick: e.handleSubmit
    }, {
      default: x(() => [
        le(N(e.buttonLabel), 1)
      ]),
      _: 1
    }, 8, ["disabled", "onClick"])) : $("", !0)
  ], 6);
}
const vl = /* @__PURE__ */ E(ml, [["render", bl]]), gl = ee(he), We = K({
  name: "CdxSelect",
  components: {
    CdxIcon: J,
    CdxMenu: Ae
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
      validator: gl
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
    const a = f(), s = f(), d = pe(Me, void 0), l = W("select-menu"), i = f(!1), o = n.id || W("select-handle"), {
      computedDisabled: r,
      computedStatus: p,
      computedInputId: b
    } = ie(
      F(e, "disabled"),
      F(e, "status"),
      o
    ), S = ue(F(e, "selected"), t, "update:selected"), g = c(
      () => e.menuItems.find((w) => w.value === e.selected)
    ), L = c(() => g.value ? g.value.label || g.value.value : e.defaultLabel), R = Te(a), z = c(() => {
      var w;
      return `${(w = R.value.width) != null ? w : 0}px`;
    }), q = c(() => {
      if (e.defaultIcon && !g.value)
        return e.defaultIcon;
      if (g.value && g.value.icon)
        return g.value.icon;
    }), P = c(() => ({
      "cdx-select-vue--enabled": !r.value,
      "cdx-select-vue--disabled": r.value,
      "cdx-select-vue--expanded": i.value,
      "cdx-select-vue--value-selected": !!g.value,
      "cdx-select-vue--no-selections": !g.value,
      "cdx-select-vue--has-start-icon": !!q.value,
      [`cdx-select-vue--status-${p.value}`]: !0
    })), {
      rootClasses: j,
      rootStyle: Q,
      otherAttrs: H
    } = de(n, P), B = c(() => {
      const re = H.value, { id: w } = re;
      return me(re, ["id"]);
    }), A = c(() => {
      var w, G;
      return (G = (w = s.value) == null ? void 0 : w.getHighlightedMenuItem()) == null ? void 0 : G.id;
    });
    function M() {
      i.value = !1;
    }
    function v() {
      var w;
      r.value || (i.value = !i.value, (w = a.value) == null || w.focus());
    }
    function y(w) {
      var G;
      r.value || (G = s.value) == null || G.delegateKeyNavigation(w);
    }
    return {
      handle: a,
      menu: s,
      computedHandleId: b,
      descriptionId: d,
      menuId: l,
      modelWrapper: S,
      selectedMenuItem: g,
      highlightedId: A,
      expanded: i,
      computedDisabled: r,
      onBlur: M,
      currentLabel: L,
      currentWidthInPx: z,
      rootClasses: j,
      rootStyle: Q,
      otherAttrsMinusId: B,
      onClick: v,
      onKeydown: y,
      startIcon: q,
      cdxIconExpand: Ne
    };
  }
}), ot = () => {
  Oe((e) => ({
    "7c542cd2": e.currentWidthInPx
  }));
}, lt = We.setup;
We.setup = lt ? (e, t) => (ot(), lt(e, t)) : ot;
const yl = ["aria-disabled"], $l = ["id", "aria-controls", "aria-activedescendant", "aria-expanded", "aria-describedby"];
function _l(e, t, n, a, s, d) {
  const l = k("cdx-icon"), i = k("cdx-menu");
  return u(), m("div", {
    class: D(["cdx-select-vue", e.rootClasses]),
    style: se(e.rootStyle),
    "aria-disabled": e.computedDisabled
  }, [
    h("div", Z({
      id: e.computedHandleId,
      ref: "handle",
      class: "cdx-select-vue__handle"
    }, e.otherAttrsMinusId, {
      tabindex: "0",
      role: "combobox",
      "aria-controls": e.menuId,
      "aria-activedescendant": e.highlightedId,
      "aria-expanded": e.expanded,
      "aria-describedby": e.descriptionId,
      onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o)),
      onBlur: t[1] || (t[1] = (...o) => e.onBlur && e.onBlur(...o)),
      onKeydown: t[2] || (t[2] = (...o) => e.onKeydown && e.onKeydown(...o))
    }), [
      _(e.$slots, "label", {
        selectedMenuItem: e.selectedMenuItem,
        defaultLabel: e.defaultLabel
      }, () => [
        le(N(e.currentLabel), 1)
      ]),
      e.startIcon ? (u(), T(l, {
        key: 0,
        icon: e.startIcon,
        class: "cdx-select-vue__start-icon"
      }, null, 8, ["icon"])) : $("", !0),
      O(l, {
        icon: e.cdxIconExpand,
        class: "cdx-select-vue__indicator"
      }, null, 8, ["icon"])
    ], 16, $l),
    O(i, Z({
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
      default: x(({ menuItem: o }) => [
        _(e.$slots, "menu-item", { menuItem: o })
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 14, yl);
}
const hs = /* @__PURE__ */ E(We, [["render", _l]]), Il = K({
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
    const t = pe(pt), n = pe(ft);
    if (!t || !n)
      throw new Error("Tab component must be used inside a Tabs component");
    const a = t.value.get(e.name) || {}, s = c(() => e.name === n.value);
    return {
      tab: a,
      isActive: s
    };
  }
});
const Cl = ["id", "aria-hidden", "aria-labelledby"];
function kl(e, t, n, a, s, d) {
  return ae((u(), m("section", {
    id: e.tab.id,
    "aria-hidden": e.isActive ? void 0 : !0,
    "aria-labelledby": `${e.tab.id}-label`,
    class: "cdx-tab",
    role: "tabpanel",
    tabindex: "-1"
  }, [
    _(e.$slots, "default")
  ], 8, Cl)), [
    [Ie, e.isActive]
  ]);
}
const bs = /* @__PURE__ */ E(Il, [["render", kl]]), Sl = K({
  name: "CdxTabs",
  components: {
    CdxButton: be,
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
    const a = f(), s = f(), d = f(), l = f(), i = rt(a), o = c(() => {
      var y;
      const A = [], M = (y = t.default) == null ? void 0 : y.call(t);
      M && M.forEach(v);
      function v(w) {
        w && typeof w == "object" && "type" in w && (typeof w.type == "object" && "name" in w.type && w.type.name === "CdxTab" ? A.push(w) : "children" in w && Array.isArray(w.children) && w.children.forEach(v));
      }
      return A;
    });
    if (!o.value || o.value.length === 0)
      throw new Error("Slot content cannot be empty");
    const r = c(() => o.value.reduce((A, M) => {
      var v;
      if ((v = M.props) != null && v.name && typeof M.props.name == "string") {
        if (A.get(M.props.name))
          throw new Error("Tab names must be unique");
        A.set(M.props.name, {
          name: M.props.name,
          id: W(M.props.name),
          label: M.props.label || M.props.name,
          disabled: M.props.disabled
        });
      }
      return A;
    }, /* @__PURE__ */ new Map())), p = ue(F(e, "active"), n, "update:active"), b = c(() => Array.from(r.value.keys())), S = c(() => b.value.indexOf(p.value)), g = c(() => {
      var A;
      return (A = r.value.get(p.value)) == null ? void 0 : A.id;
    });
    ge(ft, p), ge(pt, r);
    const L = f(/* @__PURE__ */ new Map()), R = f(), z = f(), q = Ee(R, { threshold: 0.95 }), P = Ee(z, { threshold: 0.95 });
    function j(A, M) {
      const v = A;
      v && (L.value.set(M, v), M === 0 ? R.value = v : M === b.value.length - 1 && (z.value = v));
    }
    const Q = c(() => ({
      "cdx-tabs--framed": e.framed,
      "cdx-tabs--quiet": !e.framed
    }));
    function H(A) {
      if (!s.value || !d.value || !l.value)
        return 0;
      const M = i.value === "rtl" ? l.value : d.value, v = i.value === "rtl" ? d.value : l.value, y = A.offsetLeft, w = y + A.clientWidth, G = s.value.scrollLeft + M.clientWidth, re = s.value.scrollLeft + s.value.clientWidth - v.clientWidth;
      return y < G ? y - G : w > re ? w - re : 0;
    }
    function B(A) {
      var w;
      if (!s.value || !d.value || !l.value)
        return;
      const M = A === "next" && i.value === "ltr" || A === "prev" && i.value === "rtl" ? 1 : -1;
      let v = 0, y = A === "next" ? s.value.firstElementChild : s.value.lastElementChild;
      for (; y; ) {
        const G = A === "next" ? y.nextElementSibling : y.previousElementSibling;
        if (v = H(y), Math.sign(v) === M) {
          G && Math.abs(v) < 0.25 * s.value.clientWidth && (v = H(G));
          break;
        }
        y = G;
      }
      s.value.scrollBy({
        left: v,
        behavior: "smooth"
      }), (w = L.value.get(S.value)) == null || w.focus();
    }
    return oe(p, () => {
      if (g.value === void 0 || !s.value || !d.value || !l.value)
        return;
      const A = document.getElementById(`${g.value}-label`);
      A && s.value.scrollBy({
        left: H(A),
        behavior: "smooth"
      });
    }), {
      activeTab: p,
      activeTabIndex: S,
      activeTabId: g,
      currentDirection: i,
      rootElement: a,
      tabListElement: s,
      prevScroller: d,
      nextScroller: l,
      rootClasses: Q,
      tabNames: b,
      tabsData: r,
      tabButtonRefs: L,
      firstLabelVisible: q,
      lastLabelVisible: P,
      assignTemplateRefForTabButton: j,
      scrollTabs: B,
      cdxIconPrevious: Gt,
      cdxIconNext: Qt
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
     * @param {boolean} setFocus Whether or not to also set focus to the new tab
     * @public
     */
    select(e, t) {
      const n = this.tabsData.get(e);
      n && !(n != null && n.disabled) && (this.activeTab = e, t && this.$nextTick().then(() => {
        var a;
        (a = this.tabButtonRefs.get(this.activeTabIndex)) == null || a.focus();
      }));
    },
    /**
     * Used to select next or previous tab in the sequence, skipping
     * over any tabs that are disabled. The provided increment should
     * be either 1 (to move forward) or -1 (to move backwards)
     *
     * @param index
     * @param increment
     * @param setFocus
     */
    selectNonDisabled(e, t, n) {
      const a = this.tabsData.get(this.tabNames[e + t]);
      a && (a.disabled ? this.selectNonDisabled(e + t, t, n) : this.select(a.name, n));
    },
    /**
     * Set the next tab to active, if one exists
     *
     * @param {boolean} setFocus
     * @public
     */
    next(e) {
      this.selectNonDisabled(this.activeTabIndex, 1, e);
    },
    /**
     * Set the previous tab to active, if one exists
     *
     * @param {boolean} setFocus
     * @public
     */
    prev(e) {
      this.selectNonDisabled(this.activeTabIndex, -1, e);
    },
    /**
     * Handle left arrow key navigation (based on LTR/RTL direction)
     */
    onLeftArrowKeypress() {
      this.currentDirection === "rtl" ? this.next(!0) : this.prev(!0);
    },
    /**
     * Handle right arrow key navigation (based on LTR/RTL direction)
     */
    onRightArrowKeypress() {
      this.currentDirection === "rtl" ? this.prev(!0) : this.next(!0);
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
const wl = { class: "cdx-tabs__header" }, xl = {
  ref: "prevScroller",
  class: "cdx-tabs__prev-scroller"
}, Ml = {
  ref: "tabListElement",
  class: "cdx-tabs__list",
  role: "tablist"
}, Bl = ["id", "disabled", "aria-controls", "aria-selected", "tabindex", "onClick", "onKeyup"], Al = {
  ref: "nextScroller",
  class: "cdx-tabs__next-scroller"
}, Tl = { class: "cdx-tabs__content" };
function Ll(e, t, n, a, s, d) {
  const l = k("cdx-icon"), i = k("cdx-button");
  return u(), m("div", {
    ref: "rootElement",
    class: D(["cdx-tabs", e.rootClasses])
  }, [
    h("div", wl, [
      ae(h("div", xl, [
        O(i, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[0] || (t[0] = te(() => {
          }, ["prevent"])),
          onClick: t[1] || (t[1] = (o) => e.scrollTabs("prev"))
        }, {
          default: x(() => [
            O(l, { icon: e.cdxIconPrevious }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [Ie, !e.firstLabelVisible]
      ]),
      h("div", Ml, [
        (u(!0), m(ye, null, we(e.tabsData.values(), (o, r) => (u(), m("button", {
          id: `${o.id}-label`,
          key: r,
          ref_for: !0,
          ref: (p) => e.assignTemplateRefForTabButton(p, r),
          disabled: o.disabled ? !0 : void 0,
          "aria-controls": o.id,
          "aria-selected": o.name === e.activeTab,
          tabindex: o.name === e.activeTab ? void 0 : -1,
          class: "cdx-tabs__list__item",
          role: "tab",
          onClick: te((p) => e.select(o.name), ["prevent"]),
          onKeyup: ne((p) => e.select(o.name), ["enter"]),
          onKeydown: [
            t[2] || (t[2] = ne(te((...p) => e.onRightArrowKeypress && e.onRightArrowKeypress(...p), ["prevent"]), ["right"])),
            t[3] || (t[3] = ne(te((...p) => e.onDownArrowKeypress && e.onDownArrowKeypress(...p), ["prevent"]), ["down"])),
            t[4] || (t[4] = ne(te((...p) => e.onLeftArrowKeypress && e.onLeftArrowKeypress(...p), ["prevent"]), ["left"]))
          ]
        }, [
          h("span", null, N(o.label), 1)
        ], 40, Bl))), 128))
      ], 512),
      ae(h("div", Al, [
        O(i, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[5] || (t[5] = te(() => {
          }, ["prevent"])),
          onClick: t[6] || (t[6] = (o) => e.scrollTabs("next"))
        }, {
          default: x(() => [
            O(l, { icon: e.cdxIconNext }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [Ie, !e.lastLabelVisible]
      ])
    ]),
    h("div", Tl, [
      _(e.$slots, "default")
    ])
  ], 2);
}
const vs = /* @__PURE__ */ E(Sl, [["render", Ll]]), Vl = ee(he), Dl = K({
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
      validator: Vl
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
    const a = ue(F(e, "modelValue"), n), s = t.id, {
      computedDisabled: d,
      computedStatus: l,
      computedInputId: i
    } = ie(
      F(e, "disabled"),
      F(e, "status"),
      s
    ), o = pe(Me, void 0), r = c(() => ({
      "cdx-text-area__textarea--has-value": !!a.value,
      "cdx-text-area__textarea--is-autosize": e.autosize
    })), p = c(() => ({
      "cdx-text-area--status-default": l.value === "default",
      "cdx-text-area--status-error": l.value === "error",
      "cdx-text-area--has-start-icon": !!e.startIcon,
      "cdx-text-area--has-end-icon": !!e.endIcon
    })), {
      rootClasses: b,
      rootStyle: S,
      otherAttrs: g
    } = de(t, p), L = c(() => {
      const j = g.value, { id: q } = j;
      return me(j, ["id"]);
    }), R = f();
    function z() {
      R.value && e.autosize && (R.value.style.height = "auto", R.value.style.height = `${R.value.scrollHeight}px`);
    }
    return {
      rootClasses: b,
      rootStyle: S,
      wrappedModel: a,
      computedDisabled: d,
      computedInputId: i,
      descriptionId: o,
      textareaClasses: r,
      otherAttrsMinusId: L,
      textarea: R,
      onInput: z
    };
  }
});
const Kl = ["id", "aria-describedby", "disabled"];
function El(e, t, n, a, s, d) {
  const l = k("cdx-icon");
  return u(), m("div", {
    class: D(["cdx-text-area", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    ae(h("textarea", Z({
      id: e.computedInputId,
      ref: "textarea"
    }, e.otherAttrsMinusId, {
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wrappedModel = i),
      class: [e.textareaClasses, "cdx-text-area__textarea"],
      "aria-describedby": e.descriptionId,
      disabled: e.computedDisabled,
      onInput: t[1] || (t[1] = (...i) => e.onInput && e.onInput(...i))
    }), null, 16, Kl), [
      [At, e.wrappedModel]
    ]),
    e.startIcon ? (u(), T(l, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-area__icon-vue cdx-text-area__start-icon"
    }, null, 8, ["icon"])) : $("", !0),
    e.endIcon ? (u(), T(l, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-area__icon-vue cdx-text-area__end-icon"
    }, null, 8, ["icon"])) : $("", !0)
  ], 6);
}
const gs = /* @__PURE__ */ E(Dl, [["render", El]]), Fl = K({
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
      setActive: (l) => {
        n.value = l;
      }
    };
  }
});
const Rl = ["aria-pressed", "disabled"];
function zl(e, t, n, a, s, d) {
  return u(), m("button", {
    class: D(["cdx-toggle-button", e.rootClasses]),
    "aria-pressed": e.modelValue,
    disabled: e.disabled,
    onClick: t[0] || (t[0] = (...l) => e.onClick && e.onClick(...l)),
    onKeydown: t[1] || (t[1] = ne((l) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = ne((l) => e.setActive(!1), ["space", "enter"]))
  }, [
    _(e.$slots, "default")
  ], 42, Rl);
}
const Ol = /* @__PURE__ */ E(Fl, [["render", zl]]), Nl = K({
  name: "CdxToggleButtonGroup",
  components: {
    CdxIcon: J,
    CdxToggleButton: Ol
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
    function n(s) {
      return Array.isArray(e.modelValue) ? e.modelValue.indexOf(s.value) !== -1 : e.modelValue !== null ? e.modelValue === s.value : !1;
    }
    function a(s, d) {
      if (Array.isArray(e.modelValue)) {
        const l = e.modelValue.indexOf(s.value) !== -1;
        d && !l ? t("update:modelValue", e.modelValue.concat(s.value)) : !d && l && t("update:modelValue", e.modelValue.filter((i) => i !== s.value));
      } else
        d && e.modelValue !== s.value && t("update:modelValue", s.value);
    }
    return {
      getButtonLabel: vt,
      isSelected: n,
      onUpdate: a
    };
  }
});
const ql = { class: "cdx-toggle-button-group" };
function Hl(e, t, n, a, s, d) {
  const l = k("cdx-icon"), i = k("cdx-toggle-button");
  return u(), m("div", ql, [
    (u(!0), m(ye, null, we(e.buttons, (o) => (u(), T(i, {
      key: o.value,
      "model-value": e.isSelected(o),
      disabled: o.disabled || e.disabled,
      "aria-label": o.ariaLabel,
      "onUpdate:modelValue": (r) => e.onUpdate(o, r)
    }, {
      default: x(() => [
        _(e.$slots, "default", {
          button: o,
          selected: e.isSelected(o)
        }, () => [
          o.icon ? (u(), T(l, {
            key: 0,
            icon: o.icon
          }, null, 8, ["icon"])) : $("", !0),
          le(" " + N(e.getButtonLabel(o)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["model-value", "disabled", "aria-label", "onUpdate:modelValue"]))), 128))
  ]);
}
const ys = /* @__PURE__ */ E(Nl, [["render", Hl]]), jl = K({
  name: "CdxToggleSwitch",
  components: { CdxLabel: Be },
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
     * Whether the label should be visually hidden.
     *
     * Note that this will also hide the description.
     */
    hideLabel: {
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
  setup(e, { emit: t, slots: n, attrs: a }) {
    var L;
    qe((L = n.default) == null ? void 0 : L.call(n), a, "CdxToggleSwitch");
    const s = f(), d = W("toggle-switch"), l = W("description"), i = c(() => ({
      "cdx-toggle-switch--align-switch": e.alignSwitch
    })), {
      rootClasses: o,
      rootStyle: r,
      otherAttrs: p
    } = de(a, i), { computedDisabled: b } = ie(F(e, "disabled")), S = ue(F(e, "modelValue"), t);
    return {
      input: s,
      inputId: d,
      descriptionId: l,
      rootClasses: o,
      rootStyle: r,
      otherAttrs: p,
      computedDisabled: b,
      wrappedModel: S,
      clickInput: () => {
        s.value.click();
      }
    };
  }
});
const Ul = ["id", "aria-describedby", "value", "disabled"], Wl = /* @__PURE__ */ h("span", { class: "cdx-toggle-switch__switch" }, [
  /* @__PURE__ */ h("span", { class: "cdx-toggle-switch__switch__grip" })
], -1);
function Pl(e, t, n, a, s, d) {
  const l = k("cdx-label");
  return u(), m("span", {
    class: D(["cdx-toggle-switch", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    ae(h("input", Z({
      id: e.inputId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wrappedModel = i),
      class: "cdx-toggle-switch__input",
      type: "checkbox",
      role: "switch",
      "aria-describedby": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      value: e.inputValue,
      disabled: e.computedDisabled
    }, e.otherAttrs, {
      onKeydown: t[1] || (t[1] = ne(te((...i) => e.clickInput && e.clickInput(...i), ["prevent"]), ["enter"]))
    }), null, 16, Ul), [
      [st, e.wrappedModel]
    ]),
    Wl,
    e.$slots.default && e.$slots.default().length ? (u(), T(l, {
      key: 0,
      class: "cdx-toggle-switch__label",
      "input-id": e.inputId,
      "description-id": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      "visually-hidden": e.hideLabel,
      disabled: e.computedDisabled
    }, xe({
      default: x(() => [
        _(e.$slots, "default")
      ]),
      _: 2
    }, [
      e.$slots.description && e.$slots.description().length > 0 ? {
        name: "description",
        fn: x(() => [
          _(e.$slots, "description")
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["input-id", "description-id", "visually-hidden", "disabled"])) : $("", !0)
  ], 6);
}
const $s = /* @__PURE__ */ E(jl, [["render", Pl]]), Ql = K({
  name: "CdxTypeaheadSearch",
  components: {
    CdxIcon: J,
    CdxMenu: Ae,
    CdxSearchInput: vl
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
      default: an
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
  setup(e, { attrs: t, emit: n, slots: a }) {
    const s = f(), d = f(), l = W("typeahead-search-menu"), i = f(!1), o = f(!1), r = f(!1), p = f(!1), b = f(e.initialInputValue), S = f(""), g = c(() => {
      var C, Y;
      return (Y = (C = d.value) == null ? void 0 : C.getHighlightedMenuItem()) == null ? void 0 : Y.id;
    }), L = f(null), R = c(() => ({
      "cdx-typeahead-search__menu-message--has-thumbnail": e.showThumbnail
    })), z = c(
      () => e.searchResults.find(
        (C) => C.value === L.value
      )
    ), q = c(
      () => e.searchFooterUrl ? { value: ve, url: e.searchFooterUrl } : void 0
    ), P = c(() => ({
      "cdx-typeahead-search--show-thumbnail": e.showThumbnail,
      "cdx-typeahead-search--expanded": i.value,
      "cdx-typeahead-search--auto-expand-width": e.showThumbnail && e.autoExpandWidth
    })), {
      rootClasses: j,
      rootStyle: Q,
      otherAttrs: H
    } = de(t, P);
    function B(C) {
      return C;
    }
    const A = c(() => ({
      visibleItemLimit: e.visibleItemLimit,
      showThumbnail: e.showThumbnail,
      // In case search queries aren't highlighted, default to a bold label.
      boldLabel: !0,
      hideDescriptionOverflow: !0
    }));
    let M, v;
    function y(C, Y = !1) {
      z.value && z.value.label !== C && z.value.value !== C && (L.value = null), v !== void 0 && (clearTimeout(v), v = void 0), C === "" ? i.value = !1 : (o.value = !0, a["search-results-pending"] && (v = setTimeout(() => {
        p.value && (i.value = !0), r.value = !0;
      }, dn))), M !== void 0 && (clearTimeout(M), M = void 0);
      const ce = () => {
        n("input", C);
      };
      Y ? ce() : M = setTimeout(() => {
        ce();
      }, e.debounceInterval);
    }
    function w(C) {
      if (C === ve) {
        L.value = null, b.value = S.value;
        return;
      }
      L.value = C, C !== null && (b.value = z.value ? z.value.label || String(z.value.value) : "");
    }
    function G() {
      p.value = !0, (S.value || r.value) && (i.value = !0);
    }
    function re() {
      p.value = !1, i.value = !1;
    }
    function Ce(C) {
      const Pe = C, { id: Y } = Pe, ce = me(Pe, ["id"]);
      if (ce.value === ve) {
        n("search-result-click", {
          searchResult: null,
          index: e.searchResults.length,
          numberOfResults: e.searchResults.length
        });
        return;
      }
      I(ce);
    }
    function I(C) {
      const Y = {
        searchResult: C,
        index: e.searchResults.findIndex(
          (ce) => ce.value === C.value
        ),
        numberOfResults: e.searchResults.length
      };
      n("search-result-click", Y);
    }
    function V(C) {
      if (C.value === ve) {
        b.value = S.value;
        return;
      }
      b.value = C.value ? C.label || String(C.value) : "";
    }
    function U(C) {
      var Y;
      i.value = !1, (Y = d.value) == null || Y.clearActive(), Ce(C);
    }
    function X(C) {
      if (z.value)
        I(z.value), C.stopPropagation(), window.location.assign(z.value.url), C.preventDefault();
      else {
        const Y = {
          searchResult: null,
          index: -1,
          numberOfResults: e.searchResults.length
        };
        n("submit", Y);
      }
    }
    function $e(C) {
      if (!d.value || !S.value || C.key === " ")
        return;
      const Y = d.value.getHighlightedMenuItem(), ce = d.value.getHighlightedViaKeyboard();
      switch (C.key) {
        case "Enter":
          Y && (Y.value === ve && ce ? window.location.assign(e.searchFooterUrl) : d.value.delegateKeyNavigation(C, !1)), i.value = !1;
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
      e.initialInputValue && y(e.initialInputValue, !0);
    }), oe(F(e, "searchResults"), () => {
      S.value = b.value.trim(), p.value && o.value && S.value.length > 0 && (i.value = !0), v !== void 0 && (clearTimeout(v), v = void 0), o.value = !1, r.value = !1;
    }), {
      form: s,
      menu: d,
      menuId: l,
      highlightedId: g,
      selection: L,
      menuMessageClass: R,
      footer: q,
      asSearchResult: B,
      inputValue: b,
      searchQuery: S,
      expanded: i,
      showPending: r,
      rootClasses: j,
      rootStyle: Q,
      otherAttrs: H,
      menuConfig: A,
      onUpdateInputValue: y,
      onUpdateMenuSelection: w,
      onFocus: G,
      onBlur: re,
      onSearchResultClick: Ce,
      onSearchResultKeyboardNavigation: V,
      onSearchFooterClick: U,
      onSubmit: X,
      onKeydown: $e,
      MenuFooterValue: ve,
      articleIcon: jt
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
const Gl = ["id", "action"], Zl = { class: "cdx-typeahead-search__menu-message__text" }, Jl = { class: "cdx-typeahead-search__menu-message__text" }, Xl = ["href", "onClickCapture"], Yl = { class: "cdx-menu-item__text cdx-typeahead-search__search-footer__text" }, es = { class: "cdx-typeahead-search__search-footer__query" };
function ts(e, t, n, a, s, d) {
  const l = k("cdx-icon"), i = k("cdx-menu"), o = k("cdx-search-input");
  return u(), m("div", {
    class: D(["cdx-typeahead-search", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    h("form", {
      id: e.id,
      ref: "form",
      class: "cdx-typeahead-search__form",
      action: e.formAction,
      onSubmit: t[4] || (t[4] = (...r) => e.onSubmit && e.onSubmit(...r))
    }, [
      O(o, Z({
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
        "aria-controls": e.menuId,
        "aria-expanded": e.expanded,
        "aria-activedescendant": e.highlightedId,
        "onUpdate:modelValue": e.onUpdateInputValue,
        onFocus: e.onFocus,
        onBlur: e.onBlur,
        onKeydown: e.onKeydown
      }), {
        default: x(() => [
          O(i, Z({
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
            pending: x(() => [
              h("div", {
                class: D(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                h("span", Zl, [
                  _(e.$slots, "search-results-pending")
                ])
              ], 2)
            ]),
            "no-results": x(() => [
              h("div", {
                class: D(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                h("span", Jl, [
                  _(e.$slots, "search-no-results-text")
                ])
              ], 2)
            ]),
            default: x(({ menuItem: r, active: p }) => [
              r.value === e.MenuFooterValue ? (u(), m("a", {
                key: 0,
                class: D(["cdx-menu-item__content cdx-typeahead-search__search-footer", {
                  "cdx-typeahead-search__search-footer__active": p
                }]),
                href: e.asSearchResult(r).url,
                onClickCapture: te((b) => e.onSearchFooterClick(e.asSearchResult(r)), ["stop"])
              }, [
                O(l, {
                  class: "cdx-menu-item__thumbnail cdx-typeahead-search__search-footer__icon",
                  icon: e.articleIcon
                }, null, 8, ["icon"]),
                h("span", Yl, [
                  _(e.$slots, "search-footer-text", { searchQuery: e.searchQuery }, () => [
                    h("strong", es, N(e.searchQuery), 1)
                  ])
                ])
              ], 42, Xl)) : $("", !0)
            ]),
            _: 3
          }, 16, ["id", "expanded", "show-pending", "selected", "menu-items", "footer", "search-query", "show-no-results-slot", "aria-label", "onUpdate:selected", "onMenuItemKeyboardNavigation"])
        ]),
        _: 3
      }, 16, ["modelValue", "button-label", "aria-controls", "aria-expanded", "aria-activedescendant", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
      _(e.$slots, "default")
    ], 40, Gl)
  ], 6);
}
const _s = /* @__PURE__ */ E(Ql, [["render", ts]]);
export {
  ls as CdxAccordion,
  be as CdxButton,
  ss as CdxButtonGroup,
  as as CdxCard,
  is as CdxCheckbox,
  rs as CdxCombobox,
  cs as CdxDialog,
  ps as CdxField,
  J as CdxIcon,
  ds as CdxInfoChip,
  Be as CdxLabel,
  fs as CdxLookup,
  Ae as CdxMenu,
  Io as CdxMenuItem,
  tl as CdxMessage,
  Mo as CdxProgressBar,
  ms as CdxRadio,
  vl as CdxSearchInput,
  fo as CdxSearchResultTitle,
  hs as CdxSelect,
  bs as CdxTab,
  vs as CdxTabs,
  gs as CdxTextArea,
  He as CdxTextInput,
  gt as CdxThumbnail,
  Ol as CdxToggleButton,
  ys as CdxToggleButtonGroup,
  $s as CdxToggleSwitch,
  _s as CdxTypeaheadSearch,
  us as stringHelpers,
  rt as useComputedDirection,
  yt as useComputedDisabled,
  Yt as useComputedLanguage,
  ie as useFieldData,
  W as useGeneratedId,
  Ee as useIntersectionObserver,
  ue as useModelWrapper,
  Te as useResizeObserver,
  de as useSplitAttributes
};
