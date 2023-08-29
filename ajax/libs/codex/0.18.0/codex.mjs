var Mt = Object.defineProperty, Tt = Object.defineProperties;
var At = Object.getOwnPropertyDescriptors;
var ke = Object.getOwnPropertySymbols;
var Ye = Object.prototype.hasOwnProperty, et = Object.prototype.propertyIsEnumerable;
var Xe = (e, t, n) => t in e ? Mt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, tt = (e, t) => {
  for (var n in t || (t = {}))
    Ye.call(t, n) && Xe(e, n, t[n]);
  if (ke)
    for (var n of ke(t))
      et.call(t, n) && Xe(e, n, t[n]);
  return e;
}, nt = (e, t) => Tt(e, At(t));
var fe = (e, t) => {
  var n = {};
  for (var s in e)
    Ye.call(e, s) && t.indexOf(s) < 0 && (n[s] = e[s]);
  if (e != null && ke)
    for (var s of ke(e))
      t.indexOf(s) < 0 && et.call(e, s) && (n[s] = e[s]);
  return n;
};
var Ee = (e, t, n) => new Promise((s, l) => {
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
import { ref as m, onMounted as pe, defineComponent as F, computed as c, openBlock as u, createElementBlock as h, normalizeClass as E, toDisplayString as q, createCommentVNode as y, Comment as Lt, warn as Oe, watch as Y, withKeys as le, renderSlot as $, getCurrentInstance as Vt, resolveComponent as S, createBlock as L, resolveDynamicComponent as Se, withCtx as B, createVNode as z, createElementVNode as v, withDirectives as ie, vShow as Ie, Fragment as ye, renderList as we, createTextVNode as ae, Transition as qe, normalizeStyle as se, inject as ce, toRef as O, mergeProps as G, vModelCheckbox as ut, createSlots as xe, withModifiers as oe, onUnmounted as Ne, nextTick as _e, vModelDynamic as Dt, useCssVars as He, Teleport as Kt, toRefs as Et, provide as ge, vModelRadio as Ft, vModelText as Rt } from "vue";
const Ot = '<path d="M11.53 2.3A1.85 1.85 0 0010 1.21 1.85 1.85 0 008.48 2.3L.36 16.36C-.48 17.81.21 19 1.88 19h16.24c1.67 0 2.36-1.19 1.52-2.64zM11 16H9v-2h2zm0-4H9V6h2z"/>', zt = '<path d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"/><circle cx="10" cy="10" r="3"/>', qt = '<path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"/>', Nt = '<path d="m4.34 2.93 12.73 12.73-1.41 1.41L2.93 4.35z"/><path d="M17.07 4.34 4.34 17.07l-1.41-1.41L15.66 2.93z"/>', Ht = '<path d="M13.728 1H6.272L1 6.272v7.456L6.272 19h7.456L19 13.728V6.272zM11 15H9v-2h2zm0-4H9V5h2z"/>', jt = '<path d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"/>', Ut = '<path d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"/><path d="M19 5H1V3h18zm0 12H1v-2h18z"/>', Pt = '<path d="M8 19a1 1 0 001 1h2a1 1 0 001-1v-1H8zm9-12a7 7 0 10-12 4.9S7 14 7 15v1a1 1 0 001 1h4a1 1 0 001-1v-1c0-1 2-3.1 2-3.1A7 7 0 0017 7z"/>', Wt = '<path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM9 5h2v2H9zm0 4h2v6H9z"/>', Qt = '<path d="M7 1 5.6 2.5 13 10l-7.4 7.5L7 19l9-9z"/>', Gt = '<path d="m4 10 9 9 1.4-1.5L7 10l7.4-7.5L13 1z"/>', Zt = '<path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"/>', Jt = '<path d="M10 20a10 10 0 010-20 10 10 0 110 20Zm-2-5 9-8.5L15.5 5 8 12 4.5 8.5 3 10l5 5Z"/>', rt = Ot, Xt = zt, Yt = qt, ct = Nt, pt = Ht, je = jt, en = Ut, tn = {
  langCodeMap: {
    ar: Pt
  },
  default: Wt
}, nn = {
  ltr: Qt,
  shouldFlip: !0
}, on = {
  ltr: Gt,
  shouldFlip: !0
}, ln = Zt, ft = Jt;
function an(e, t, n) {
  if (typeof e == "string" || "path" in e)
    return e;
  if ("shouldFlip" in e)
    return e.ltr;
  if ("rtl" in e)
    return n === "rtl" ? e.rtl : e.ltr;
  const s = t in e.langCodeMap ? e.langCodeMap[t] : e.default;
  return typeof s == "string" || "path" in s ? s : s.ltr;
}
function sn(e, t) {
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
function mt(e) {
  const t = m(null);
  return pe(() => {
    const n = window.getComputedStyle(e.value).direction;
    t.value = n === "ltr" || n === "rtl" ? n : null;
  }), t;
}
function dn(e) {
  const t = m("");
  return pe(() => {
    let n = e.value;
    for (; n && n.lang === ""; )
      n = n.parentElement;
    t.value = n ? n.lang : null;
  }), t;
}
function ee(e) {
  return (t) => typeof t == "string" && e.indexOf(t) !== -1;
}
const Fe = "cdx", un = [
  "default",
  "progressive",
  "destructive"
], rn = [
  "normal",
  "primary",
  "quiet"
], cn = [
  "medium",
  "large"
], pn = [
  "x-small",
  "small",
  "medium"
], fn = [
  "notice",
  "warning",
  "error",
  "success"
], ht = ee(fn), mn = [
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
], me = [
  "default",
  "error"
], hn = 120, vn = 500, be = "cdx-menu-footer-item", vt = Symbol("CdxTabs"), bt = Symbol("CdxActiveTab"), gt = Symbol("CdxFieldInputId"), Be = Symbol("CdxFieldDescriptionId"), yt = Symbol("CdxFieldStatus"), $t = Symbol("CdxDisabled"), bn = ee(pn), gn = F({
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
      validator: bn
    }
  },
  setup(e) {
    const t = m(), n = mt(t), s = dn(t), l = c(() => e.dir || n.value), d = c(() => e.lang || s.value), a = c(() => ({
      "cdx-icon--flipped": l.value === "rtl" && d.value !== null && sn(e.icon, d.value),
      [`cdx-icon--${e.size}`]: !0
    })), i = c(
      () => an(e.icon, d.value || "", l.value || "ltr")
    ), o = c(() => typeof i.value == "string" ? i.value : ""), r = c(() => typeof i.value != "string" ? i.value.path : "");
    return {
      rootElement: t,
      rootClasses: a,
      iconSvg: o,
      iconPath: r
    };
  }
});
const R = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, l] of t)
    n[s] = l;
  return n;
}, yn = ["aria-hidden"], $n = { key: 0 }, _n = ["innerHTML"], In = ["d"];
function Cn(e, t, n, s, l, d) {
  return u(), h("span", {
    ref: "rootElement",
    class: E(["cdx-icon", e.rootClasses])
  }, [
    (u(), h("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      "aria-hidden": e.iconLabel ? void 0 : !0
    }, [
      e.iconLabel ? (u(), h("title", $n, q(e.iconLabel), 1)) : y("", !0),
      e.iconSvg ? (u(), h("g", {
        key: 1,
        innerHTML: e.iconSvg
      }, null, 8, _n)) : (u(), h("path", {
        key: 2,
        d: e.iconPath
      }, null, 8, In))
    ], 8, yn))
  ], 2);
}
const X = /* @__PURE__ */ R(gn, [["render", Cn]]);
function _t(e) {
  const t = [];
  for (const n of e)
    // HTML tag
    typeof n.type == "string" || // Component
    typeof n.type == "object" ? t.push(n) : n.type !== Lt && (typeof n.children == "string" && n.children.trim() !== "" ? t.push(n.children) : Array.isArray(n.children) && t.push(..._t(n.children)));
  return t;
}
function It(e, t) {
  return typeof e.type == "object" && "name" in e.type ? t !== void 0 ? e.type.name === t : !0 : !1;
}
function kn(e, t) {
  return typeof e.type == "string" ? t !== void 0 ? e.type === t.toLowerCase() : !0 : !1;
}
function Ue(e) {
  const t = typeof e == "function" ? e() : e;
  return t ? _t(t) : [];
}
function Pe(e, t) {
  if (e()) {
    Oe(t);
    return;
  }
  const n = Y(e, (s) => {
    s && (Oe(t), n());
  });
}
function Ct(e, t, n) {
  const s = c(() => {
    const l = Ue(e);
    if (l.length !== 1)
      return !1;
    const d = l[0];
    return !!(typeof d == "object" && (It(d, "CdxIcon") || kn(d, "svg")));
  });
  return Pe(
    () => s.value && !t["aria-label"] && !t["aria-hidden"],
    `${n}: Icon-only buttons require one of the following attributes: aria-label or aria-hidden. See documentation at https://doc.wikimedia.org/codex/latest/components/demos/button.html#icon-only-button`
  ), s;
}
const Sn = ee(un), wn = ee(rn), xn = ee(cn), Bn = F({
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
      validator: Sn
    },
    /**
     * Visual prominence of the button.
     *
     * @values 'normal', 'primary', 'quiet'
     */
    weight: {
      type: String,
      default: "normal",
      validator: wn
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
      validator: xn
    }
  },
  emits: ["click"],
  setup(e, { emit: t, slots: n, attrs: s }) {
    const l = Ct(n.default, s, "CdxButton"), d = m(!1);
    return {
      rootClasses: c(() => ({
        [`cdx-button--action-${e.action}`]: !0,
        [`cdx-button--weight-${e.weight}`]: !0,
        [`cdx-button--size-${e.size}`]: !0,
        "cdx-button--framed": e.weight !== "quiet",
        "cdx-button--icon-only": l.value,
        "cdx-button--is-active": d.value
      })),
      onClick: (r) => {
        t("click", r);
      },
      setActive: (r) => {
        d.value = r;
      }
    };
  }
});
function Mn(e, t, n, s, l, d) {
  return u(), h("button", {
    class: E(["cdx-button", e.rootClasses]),
    onClick: t[0] || (t[0] = (...a) => e.onClick && e.onClick(...a)),
    onKeydown: t[1] || (t[1] = le((a) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = le((a) => e.setActive(!1), ["space", "enter"]))
  }, [
    $(e.$slots, "default")
  ], 34);
}
const he = /* @__PURE__ */ R(Bn, [["render", Mn]]);
let Re = 0;
function U(e) {
  const t = Vt(), n = (t == null ? void 0 : t.props.id) || (t == null ? void 0 : t.attrs.id);
  return e ? `${Fe}-${e}-${Re++}` : n ? `${Fe}-${n}-${Re++}` : `${Fe}-${Re++}`;
}
const Tn = F({
  name: "CdxAccordion",
  components: { CdxButton: he, CdxIcon: X },
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
    const n = m(!1), s = U("accordion"), l = U("accordion-panel"), d = () => {
      n.value = !n.value;
    }, a = () => {
      t("action-button-click");
    }, i = c(() => e.actionIcon && (n.value || e.actionAlwaysVisible)), o = c(() => ({
      "cdx-accordion--has-icon": i
    }));
    return {
      cdxIconExpand: je,
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
const An = { class: "cdx-accordion__toggle__title" }, Ln = { class: "cdx-accordion__toggle__title-text" }, Vn = { class: "cdx-accordion__toggle__description" }, Dn = ["id", "aria-labelledby", "aria-hidden"];
function Kn(e, t, n, s, l, d) {
  const a = S("cdx-icon"), i = S("cdx-button");
  return u(), h("div", {
    class: E(["cdx-accordion", e.rootClasses])
  }, [
    (u(), L(Se(e.headingLevel), { class: "cdx-accordion__header" }, {
      default: B(() => [
        z(i, {
          id: e.accordionId,
          "aria-expanded": e.isExpanded,
          "aria-controls": e.accordionPanelId,
          class: "cdx-accordion__toggle",
          type: "button",
          weight: "quiet",
          onClick: e.toggle
        }, {
          default: B(() => [
            v("span", An, [
              z(a, {
                class: "cdx-accordion__toggle__title-icon",
                icon: e.cdxIconExpand,
                size: "small"
              }, null, 8, ["icon"]),
              v("span", Ln, [
                $(e.$slots, "title")
              ])
            ]),
            v("span", Vn, [
              $(e.$slots, "description")
            ])
          ]),
          _: 3
        }, 8, ["id", "aria-expanded", "aria-controls", "onClick"]),
        e.shouldShowActionButton ? (u(), L(i, {
          key: 0,
          class: "cdx-accordion__action",
          "aria-label": e.actionButtonLabel,
          type: "button",
          weight: "quiet",
          onClick: e.emitActionButtonClick
        }, {
          default: B(() => [
            z(a, {
              icon: e.actionIcon,
              "icon-label": e.actionButtonLabel,
              size: "medium"
            }, null, 8, ["icon", "icon-label"])
          ]),
          _: 1
        }, 8, ["aria-label", "onClick"])) : y("", !0)
      ]),
      _: 3
    })),
    ie(v("div", {
      id: e.accordionPanelId,
      "aria-labelledby": e.accordionId,
      "aria-hidden": e.isExpanded ? void 0 : !0,
      class: "cdx-accordion__content",
      role: "region"
    }, [
      $(e.$slots, "default")
    ], 8, Dn), [
      [Ie, e.isExpanded]
    ])
  ], 2);
}
const fa = /* @__PURE__ */ R(Tn, [["render", Kn]]);
function kt(e) {
  return e.label === void 0 ? e.value : e.label === null ? "" : e.label;
}
const En = F({
  name: "CdxButtonGroup",
  components: {
    CdxButton: he,
    CdxIcon: X
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
      getButtonLabel: kt
    };
  }
});
const Fn = { class: "cdx-button-group" };
function Rn(e, t, n, s, l, d) {
  const a = S("cdx-icon"), i = S("cdx-button");
  return u(), h("div", Fn, [
    (u(!0), h(ye, null, we(e.buttons, (o) => (u(), L(i, {
      key: o.value,
      disabled: o.disabled || e.disabled,
      "aria-label": o.ariaLabel,
      onClick: (r) => e.$emit("click", o.value)
    }, {
      default: B(() => [
        $(e.$slots, "default", { button: o }, () => [
          o.icon ? (u(), L(a, {
            key: 0,
            icon: o.icon
          }, null, 8, ["icon"])) : y("", !0),
          ae(" " + q(e.getButtonLabel(o)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["disabled", "aria-label", "onClick"]))), 128))
  ]);
}
const ma = /* @__PURE__ */ R(En, [["render", Rn]]), On = F({
  name: "CdxThumbnail",
  components: { CdxIcon: X },
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
      default: en
    }
  },
  setup: (e) => {
    const t = m(!1), n = m({}), s = (l) => {
      const d = l.replace(/([\\"\n])/g, "\\$1"), a = new Image();
      a.onload = () => {
        n.value = { backgroundImage: `url("${d}")` }, t.value = !0;
      }, a.onerror = () => {
        t.value = !1;
      }, a.src = d;
    };
    return pe(() => {
      var l;
      (l = e.thumbnail) != null && l.url && s(e.thumbnail.url);
    }), {
      thumbnailStyle: n,
      thumbnailLoaded: t
    };
  }
});
const zn = { class: "cdx-thumbnail" }, qn = {
  key: 0,
  class: "cdx-thumbnail__placeholder"
};
function Nn(e, t, n, s, l, d) {
  const a = S("cdx-icon");
  return u(), h("span", zn, [
    e.thumbnailLoaded ? y("", !0) : (u(), h("span", qn, [
      z(a, {
        icon: e.placeholderIcon,
        class: "cdx-thumbnail__placeholder__icon--vue"
      }, null, 8, ["icon"])
    ])),
    z(qe, { name: "cdx-thumbnail__image" }, {
      default: B(() => [
        e.thumbnailLoaded ? (u(), h("span", {
          key: 0,
          style: se(e.thumbnailStyle),
          class: "cdx-thumbnail__image"
        }, null, 4)) : y("", !0)
      ]),
      _: 1
    })
  ]);
}
const St = /* @__PURE__ */ R(On, [["render", Nn]]), Hn = F({
  name: "CdxCard",
  components: { CdxIcon: X, CdxThumbnail: St },
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
const jn = { class: "cdx-card__text" }, Un = { class: "cdx-card__text__title" }, Pn = {
  key: 0,
  class: "cdx-card__text__description"
}, Wn = {
  key: 1,
  class: "cdx-card__text__supporting-text"
};
function Qn(e, t, n, s, l, d) {
  const a = S("cdx-thumbnail"), i = S("cdx-icon");
  return u(), L(Se(e.contentTag), {
    href: e.cardLink,
    class: E(["cdx-card", {
      "cdx-card--is-link": e.isLink,
      // Include dynamic classes in the template so that $slots is reactive.
      "cdx-card--title-only": !e.$slots.description && !e.$slots["supporting-text"]
    }])
  }, {
    default: B(() => [
      e.thumbnail || e.forceThumbnail ? (u(), L(a, {
        key: 0,
        thumbnail: e.thumbnail,
        "placeholder-icon": e.customPlaceholderIcon,
        class: "cdx-card__thumbnail"
      }, null, 8, ["thumbnail", "placeholder-icon"])) : e.icon ? (u(), L(i, {
        key: 1,
        icon: e.icon,
        class: "cdx-card__icon"
      }, null, 8, ["icon"])) : y("", !0),
      v("span", jn, [
        v("span", Un, [
          $(e.$slots, "title")
        ]),
        e.$slots.description ? (u(), h("span", Pn, [
          $(e.$slots, "description")
        ])) : y("", !0),
        e.$slots["supporting-text"] ? (u(), h("span", Wn, [
          $(e.$slots, "supporting-text")
        ])) : y("", !0)
      ])
    ]),
    _: 3
  }, 8, ["href", "class"]);
}
const ha = /* @__PURE__ */ R(Hn, [["render", Qn]]);
function wt(e) {
  const t = ce($t, m(!1));
  return c(() => t.value || e.value);
}
function de(e, t, n) {
  const s = wt(e), l = ce(yt, m("default")), d = c(() => t != null && t.value && t.value !== "default" ? t.value : l.value), a = ce(gt, void 0), i = c(
    () => a && a.value ? a.value : n
  );
  return {
    computedDisabled: s,
    computedStatus: d,
    computedInputId: i
  };
}
function ue(e, t = c(() => ({}))) {
  const n = c(() => {
    const d = fe(t.value, []);
    return e.class && e.class.split(" ").forEach((i) => {
      d[i] = !0;
    }), d;
  }), s = c(() => {
    if ("style" in e)
      return e.style;
  }), l = c(() => {
    const o = e, { class: d, style: a } = o;
    return fe(o, ["class", "style"]);
  });
  return {
    rootClasses: n,
    rootStyle: s,
    otherAttrs: l
  };
}
const Gn = F({
  name: "CdxLabel",
  components: { CdxIcon: X },
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
    const { computedDisabled: n } = de(O(e, "disabled")), s = c(() => ({
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
const Zn = ["for"], Jn = { class: "cdx-label__label__text" }, Xn = {
  key: 1,
  class: "cdx-label__label__optional-flag"
}, Yn = ["id"], eo = { class: "cdx-label__label" }, to = { class: "cdx-label__label__text" }, no = {
  key: 1,
  class: "cdx-label__label__optional-flag"
}, oo = {
  key: 0,
  class: "cdx-label__description"
};
function lo(e, t, n, s, l, d) {
  const a = S("cdx-icon");
  return e.isLegend ? (u(), h("legend", G({
    key: 1,
    class: ["cdx-label cdx-label--is-legend", e.rootClasses],
    style: e.rootStyle
  }, e.otherAttrs), [
    v("span", eo, [
      e.icon ? (u(), L(a, {
        key: 0,
        icon: e.icon,
        class: "cdx-label__label__icon"
      }, null, 8, ["icon"])) : y("", !0),
      v("span", to, [
        $(e.$slots, "default")
      ]),
      e.optionalFlag ? (u(), h("span", no, q(" ") + " " + q(e.optionalFlag), 1)) : y("", !0)
    ]),
    e.$slots.description && e.$slots.description().length > 0 ? (u(), h("span", oo, [
      $(e.$slots, "description")
    ])) : y("", !0)
  ], 16)) : (u(), h("div", {
    key: 0,
    class: E(["cdx-label", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    v("label", G({
      class: "cdx-label__label",
      for: e.inputId ? e.inputId : void 0
    }, e.otherAttrs), [
      e.icon ? (u(), L(a, {
        key: 0,
        icon: e.icon,
        class: "cdx-label__label__icon"
      }, null, 8, ["icon"])) : y("", !0),
      v("span", Jn, [
        $(e.$slots, "default")
      ]),
      e.optionalFlag ? (u(), h("span", Xn, q(" ") + " " + q(e.optionalFlag), 1)) : y("", !0)
    ], 16, Zn),
    e.$slots.description && e.$slots.description().length > 0 ? (u(), h("span", {
      key: 0,
      id: e.descriptionId || void 0,
      class: "cdx-label__description"
    }, [
      $(e.$slots, "description")
    ], 8, Yn)) : y("", !0)
  ], 6));
}
const Me = /* @__PURE__ */ R(Gn, [["render", lo]]);
function We(e, t, n) {
  Pe(
    () => Ue(e).length === 0 && !(t != null && t["aria-label"]) && !(t != null && t["aria-labelledby"]),
    `${n}: Inputs must have an associated label. Provide one of the following:
 - A label via the appropriate slot
 - An \`aria-label\` attribute set to the label text
 - An \`aria-labelledby\` attribute set to the ID of the label element`
  );
}
function re(e, t, n) {
  return c({
    get: () => e.value,
    set: (s) => (
      // If eventName is undefined, then 'update:modelValue' must be a valid EventName,
      // but TypeScript's type analysis isn't clever enough to realize that
      t(n || "update:modelValue", s)
    )
  });
}
const ao = F({
  name: "CdxCheckbox",
  components: { CdxLabel: Me },
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
  setup(e, { emit: t, slots: n, attrs: s }) {
    var p;
    We((p = n.default) == null ? void 0 : p.call(n), s, "CdxCheckbox");
    const l = c(() => ({
      "cdx-checkbox--inline": e.inline
    })), { computedDisabled: d } = de(O(e, "disabled")), a = m(), i = U("checkbox"), o = U("description"), r = re(O(e, "modelValue"), t);
    return {
      rootClasses: l,
      computedDisabled: d,
      input: a,
      checkboxId: i,
      descriptionId: o,
      wrappedModel: r
    };
  }
});
const so = ["id", "aria-describedby", "value", "disabled", ".indeterminate"], io = /* @__PURE__ */ v("span", { class: "cdx-checkbox__icon" }, null, -1);
function uo(e, t, n, s, l, d) {
  const a = S("cdx-label");
  return u(), h("span", {
    class: E(["cdx-checkbox", e.rootClasses])
  }, [
    ie(v("input", {
      id: e.checkboxId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wrappedModel = i),
      class: "cdx-checkbox__input",
      type: "checkbox",
      "aria-describedby": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      value: e.inputValue,
      disabled: e.computedDisabled,
      ".indeterminate": e.indeterminate
    }, null, 8, so), [
      [ut, e.wrappedModel]
    ]),
    io,
    e.$slots.default && e.$slots.default().length ? (u(), L(a, {
      key: 0,
      class: "cdx-checkbox__label",
      "input-id": e.checkboxId,
      "description-id": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      disabled: e.computedDisabled
    }, xe({
      default: B(() => [
        $(e.$slots, "default")
      ]),
      _: 2
    }, [
      e.$slots.description && e.$slots.description().length > 0 ? {
        name: "description",
        fn: B(() => [
          $(e.$slots, "description")
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["input-id", "description-id", "disabled"])) : y("", !0)
  ], 2);
}
const va = /* @__PURE__ */ R(ao, [["render", uo]]), ro = {
  error: pt,
  warning: rt,
  success: ft
}, co = F({
  name: "CdxInfoChip",
  components: { CdxIcon: X },
  props: {
    /**
     * Status type.
     *
     * @values 'notice', 'warning', 'error', 'success'
     */
    status: {
      type: String,
      default: "notice",
      validator: ht
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
      () => e.status === "notice" ? e.icon : ro[e.status]
    );
    return {
      iconClass: t,
      computedIcon: n
    };
  }
});
const po = { class: "cdx-info-chip" }, fo = { class: "cdx-info-chip--text" };
function mo(e, t, n, s, l, d) {
  const a = S("cdx-icon");
  return u(), h("div", po, [
    e.computedIcon ? (u(), L(a, {
      key: 0,
      class: E(["cdx-info-chip__icon", e.iconClass]),
      icon: e.computedIcon
    }, null, 8, ["class", "icon"])) : y("", !0),
    v("span", fo, [
      $(e.$slots, "default")
    ])
  ]);
}
const ba = /* @__PURE__ */ R(co, [["render", mo]]);
function xt(e) {
  return e.replace(/([\\{}()|.?*+\-^$[\]])/g, "\\$1");
}
const ho = "[̀-ͯ҃-҉֑-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣঁ-ঃ়া-ৄেৈো-্ৗৢৣ৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑੰੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣஂா-ூெ-ைொ-்ௗఀ-ఄా-ౄె-ైొ-్ౕౖౢౣಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣංඃ්ා-ුූෘ-ෟෲෳัิ-ฺ็-๎ັິ-ູົຼ່-ໍ༹༘༙༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏႚ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝᠋-᠍ᢅᢆᢩᤠ-ᤫᤰ-᤻ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼᪰-᪾ᬀ-ᬄ᬴-᭄᭫-᭳ᮀ-ᮂᮡ-ᮭ᯦-᯳ᰤ-᰷᳐-᳔᳒-᳨᳭ᳲ-᳴᳷-᳹᷀-᷹᷻-᷿⃐-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯-꙲ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣠-꣱ꣿꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀ꧥꨩ-ꨶꩃꩌꩍꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭ﬞ︀-️︠-︯]";
function Bt(e, t) {
  if (!e)
    return [t, "", ""];
  const n = xt(e), s = new RegExp(
    // Per https://www.regular-expressions.info/unicode.html, "any code point that is not a
    // combining mark can be followed by any number of combining marks." See also the
    // discussion in https://phabricator.wikimedia.org/T35242.
    n + ho + "*",
    "i"
  ).exec(t);
  if (!s || s.index === void 0)
    return [t, "", ""];
  const l = s.index, d = l + s[0].length, a = t.slice(l, d), i = t.slice(0, l), o = t.slice(d, t.length);
  return [i, a, o];
}
const ga = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  regExpEscape: xt,
  splitStringAtMatch: Bt
}, Symbol.toStringTag, { value: "Module" })), vo = F({
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
    titleChunks: c(() => Bt(e.searchQuery, String(e.title)))
  })
});
const bo = { class: "cdx-search-result-title" }, go = { class: "cdx-search-result-title__match" };
function yo(e, t, n, s, l, d) {
  return u(), h("span", bo, [
    v("bdi", null, [
      ae(q(e.titleChunks[0]), 1),
      v("span", go, q(e.titleChunks[1]), 1),
      ae(q(e.titleChunks[2]), 1)
    ])
  ]);
}
const $o = /* @__PURE__ */ R(vo, [["render", yo]]), _o = F({
  name: "CdxMenuItem",
  components: { CdxIcon: X, CdxThumbnail: St, CdxSearchResultTitle: $o },
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
const Io = ["id", "aria-disabled", "aria-selected"], Co = { class: "cdx-menu-item__text" }, ko = ["lang"], So = ["lang"], wo = ["lang"], xo = ["lang"];
function Bo(e, t, n, s, l, d) {
  const a = S("cdx-thumbnail"), i = S("cdx-icon"), o = S("cdx-search-result-title");
  return u(), h("li", {
    id: e.id,
    role: "option",
    class: E(["cdx-menu-item", e.rootClasses]),
    "aria-disabled": e.disabled,
    "aria-selected": e.selected,
    onMousemove: t[0] || (t[0] = (...r) => e.onMouseMove && e.onMouseMove(...r)),
    onMouseleave: t[1] || (t[1] = (...r) => e.onMouseLeave && e.onMouseLeave(...r)),
    onMousedown: t[2] || (t[2] = oe((...r) => e.onMouseDown && e.onMouseDown(...r), ["prevent"])),
    onClick: t[3] || (t[3] = (...r) => e.onClick && e.onClick(...r))
  }, [
    $(e.$slots, "default", {}, () => [
      (u(), L(Se(e.contentTag), {
        href: e.url ? e.url : void 0,
        class: "cdx-menu-item__content"
      }, {
        default: B(() => {
          var r, p, g, k, b, D;
          return [
            e.showThumbnail ? (u(), L(a, {
              key: 0,
              thumbnail: e.thumbnail,
              class: "cdx-menu-item__thumbnail"
            }, null, 8, ["thumbnail"])) : e.icon ? (u(), L(i, {
              key: 1,
              icon: e.icon,
              class: "cdx-menu-item__icon"
            }, null, 8, ["icon"])) : y("", !0),
            v("span", Co, [
              e.highlightQuery ? (u(), L(o, {
                key: 0,
                title: e.title,
                "search-query": e.searchQuery,
                lang: (r = e.language) == null ? void 0 : r.label
              }, null, 8, ["title", "search-query", "lang"])) : (u(), h("span", {
                key: 1,
                class: "cdx-menu-item__text__label",
                lang: (p = e.language) == null ? void 0 : p.label
              }, [
                v("bdi", null, q(e.title), 1)
              ], 8, ko)),
              e.match ? (u(), h(ye, { key: 2 }, [
                ae(q(" ") + " "),
                e.highlightQuery ? (u(), L(o, {
                  key: 0,
                  title: e.match,
                  "search-query": e.searchQuery,
                  lang: (g = e.language) == null ? void 0 : g.match
                }, null, 8, ["title", "search-query", "lang"])) : (u(), h("span", {
                  key: 1,
                  class: "cdx-menu-item__text__match",
                  lang: (k = e.language) == null ? void 0 : k.match
                }, [
                  v("bdi", null, q(e.match), 1)
                ], 8, So))
              ], 64)) : y("", !0),
              e.supportingText ? (u(), h(ye, { key: 3 }, [
                ae(q(" ") + " "),
                v("span", {
                  class: "cdx-menu-item__text__supporting-text",
                  lang: (b = e.language) == null ? void 0 : b.supportingText
                }, [
                  v("bdi", null, q(e.supportingText), 1)
                ], 8, wo)
              ], 64)) : y("", !0),
              e.description ? (u(), h("span", {
                key: 4,
                class: "cdx-menu-item__text__description",
                lang: (D = e.language) == null ? void 0 : D.description
              }, [
                v("bdi", null, q(e.description), 1)
              ], 8, xo)) : y("", !0)
            ])
          ];
        }),
        _: 1
      }, 8, ["href"]))
    ])
  ], 42, Io);
}
const Mo = /* @__PURE__ */ R(_o, [["render", Bo]]), To = F({
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
  setup(e, { attrs: t }) {
    Pe(
      () => !e.inline && !t["aria-label"] && !t["aria-hidden"],
      "CdxProgressBar: Progress bars require one of the following attribute, aria-label or aria-hidden. See documentation on https://doc.wikimedia.org/codex/latest/components/demos/progressbar.html"
    );
    const n = c(() => ({
      "cdx-progress-bar--block": !e.inline,
      "cdx-progress-bar--inline": e.inline,
      "cdx-progress-bar--enabled": !e.disabled,
      "cdx-progress-bar--disabled": e.disabled
    })), s = c(() => e.inline ? "true" : void 0);
    return {
      rootClasses: n,
      computedAriaHidden: s
    };
  }
});
const Ao = ["aria-hidden", "aria-disabled"], Lo = /* @__PURE__ */ v("div", { class: "cdx-progress-bar__bar" }, null, -1), Vo = [
  Lo
];
function Do(e, t, n, s, l, d) {
  return u(), h("div", {
    class: E(["cdx-progress-bar", e.rootClasses]),
    role: "progressbar",
    "aria-hidden": e.computedAriaHidden,
    "aria-disabled": e.disabled
  }, Vo, 10, Ao);
}
const Ko = /* @__PURE__ */ R(To, [["render", Do]]);
function ze(e, t) {
  const n = m(!1);
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
  return pe(() => {
    s = !0, e.value && l.observe(e.value);
  }), Ne(() => {
    s = !1, l.disconnect();
  }), Y(e, (d) => {
    s && (l.disconnect(), n.value = !1, d && l.observe(d));
  }), n;
}
const Eo = F({
  name: "CdxMenu",
  components: {
    CdxMenuItem: Mo,
    CdxProgressBar: Ko
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
    const l = c(() => (e.footer && e.menuItems ? [...e.menuItems, e.footer] : e.menuItems).map((x) => nt(tt({}, x), {
      id: U("menu-item")
    }))), d = c(() => n["no-results"] ? e.showNoResultsSlot !== null ? e.showNoResultsSlot : l.value.length === 0 : !1), a = m(null), i = m(!1), o = m(null), r = "additions removals";
    let p = "", g = null;
    function k() {
      p = "", g !== null && (clearTimeout(g), g = null);
    }
    function b() {
      g !== null && clearTimeout(g), g = setTimeout(k, 1500);
    }
    function D() {
      return l.value.find(
        (f) => f.value === e.selected
      ) || null;
    }
    function A(f, x) {
      var H;
      if (!(x && x.disabled))
        switch (f) {
          case "selected":
            t("update:selected", (H = x == null ? void 0 : x.value) != null ? H : null), t("update:expanded", !1), o.value = null;
            break;
          case "highlighted":
            a.value = x || null, i.value = !1;
            break;
          case "highlightedViaKeyboard":
            a.value = x || null, i.value = !0;
            break;
          case "active":
            o.value = x || null;
            break;
        }
    }
    const K = c(() => {
      if (a.value !== null)
        return l.value.findIndex(
          (f) => (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            f.value === a.value.value
          )
        );
    });
    function W(f) {
      f && (A("highlightedViaKeyboard", f), t("menu-item-keyboard-navigation", f));
    }
    function Z(f) {
      var Q;
      const x = (ve) => {
        for (let ne = ve - 1; ne >= 0; ne--)
          if (!l.value[ne].disabled)
            return l.value[ne];
      };
      f = f || l.value.length;
      const H = (Q = x(f)) != null ? Q : x(l.value.length);
      W(H);
    }
    function P(f) {
      const x = (Q) => l.value.find((ve, ne) => !ve.disabled && ne > Q);
      f = f != null ? f : -1;
      const H = x(f) || x(-1);
      W(H);
    }
    function J(f) {
      if (f.key === "Clear")
        return k(), !0;
      if (f.key === "Backspace")
        return p = p.slice(0, -1), b(), !0;
      if (f.key.length === 1 && !f.metaKey && !f.ctrlKey && !f.altKey) {
        e.expanded || t("update:expanded", !0), p += f.key.toLowerCase();
        const x = p.length > 1 && p.split("").every((ne) => ne === p[0]);
        let H = l.value, Q = p;
        x && K.value !== void 0 && (H = H.slice(K.value + 1).concat(H.slice(0, K.value)), Q = p[0]);
        const ve = H.find(
          (ne) => !ne.disabled && String(ne.label || ne.value).toLowerCase().indexOf(Q) === 0
        );
        return ve && (A("highlightedViaKeyboard", ve), V()), b(), !0;
      }
      return !1;
    }
    function N(f, { prevent: x = !0, characterNavigation: H = !1 } = {}) {
      if (H) {
        if (J(f))
          return !0;
        k();
      }
      function Q() {
        x && (f.preventDefault(), f.stopPropagation());
      }
      switch (f.key) {
        case "Enter":
        case " ":
          return Q(), e.expanded ? (a.value && i.value && t("update:selected", a.value.value), t("update:expanded", !1)) : t("update:expanded", !0), !0;
        case "Tab":
          return e.expanded && (a.value && i.value && t("update:selected", a.value.value), t("update:expanded", !1)), !0;
        case "ArrowUp":
          return Q(), e.expanded ? (a.value === null && A("highlightedViaKeyboard", D()), Z(K.value)) : t("update:expanded", !0), V(), !0;
        case "ArrowDown":
          return Q(), e.expanded ? (a.value === null && A("highlightedViaKeyboard", D()), P(K.value)) : t("update:expanded", !0), V(), !0;
        case "Home":
          return Q(), e.expanded ? (a.value === null && A("highlightedViaKeyboard", D()), P()) : t("update:expanded", !0), V(), !0;
        case "End":
          return Q(), e.expanded ? (a.value === null && A("highlightedViaKeyboard", D()), Z()) : t("update:expanded", !0), V(), !0;
        case "Escape":
          return Q(), t("update:expanded", !1), !0;
        default:
          return !1;
      }
    }
    function M() {
      A("active", null);
    }
    const _ = [], w = m(void 0), I = ze(
      w,
      { threshold: 0.8 }
    );
    Y(I, (f) => {
      f && t("load-more");
    });
    function C(f, x) {
      if (f) {
        _[x] = f.$el;
        const H = e.visibleItemLimit;
        if (!H || e.menuItems.length < H)
          return;
        const Q = Math.min(
          H,
          Math.max(2, Math.floor(0.2 * e.menuItems.length))
        );
        x === e.menuItems.length - Q && (w.value = f.$el);
      }
    }
    function V() {
      if (!e.visibleItemLimit || e.visibleItemLimit > e.menuItems.length || K.value === void 0)
        return;
      const f = K.value >= 0 ? K.value : 0;
      _[f].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
    const j = m(null), te = m(null);
    function $e() {
      if (te.value = null, !e.visibleItemLimit || _.length <= e.visibleItemLimit) {
        j.value = null;
        return;
      }
      const f = _[0], x = _[e.visibleItemLimit];
      if (j.value = Ce(
        f,
        x
      ), e.footer) {
        const H = _[_.length - 1];
        te.value = H.scrollHeight;
      }
    }
    function Ce(f, x) {
      const H = f.getBoundingClientRect().top;
      return x.getBoundingClientRect().top - H + 2;
    }
    pe(() => {
      document.addEventListener("mouseup", M);
    }), Ne(() => {
      document.removeEventListener("mouseup", M);
    }), Y(O(e, "expanded"), (f) => Ee(this, null, function* () {
      if (f) {
        const x = D();
        x && !a.value && A("highlighted", x), yield _e(), $e(), yield _e(), V();
      } else
        A("highlighted", null);
    })), Y(O(e, "menuItems"), (f) => Ee(this, null, function* () {
      f.length < _.length && (_.length = f.length), e.expanded && (yield _e(), $e(), yield _e(), V());
    }), { deep: !0 });
    const Le = c(() => ({
      "max-height": j.value ? `${j.value}px` : void 0,
      "overflow-y": j.value ? "scroll" : void 0,
      "margin-bottom": te.value ? `${te.value}px` : void 0
    })), Ve = c(() => ({
      "cdx-menu--has-footer": !!e.footer,
      "cdx-menu--has-sticky-footer": !!e.footer && !!j.value
    })), {
      rootClasses: De,
      rootStyle: Ke,
      otherAttrs: T
    } = ue(s, Ve);
    return {
      listBoxStyle: Le,
      rootClasses: De,
      rootStyle: Ke,
      otherAttrs: T,
      assignTemplateRef: C,
      computedMenuItems: l,
      computedShowNoResultsSlot: d,
      highlightedMenuItem: a,
      highlightedViaKeyboard: i,
      activeMenuItem: o,
      handleMenuItemChange: A,
      handleKeyNavigation: N,
      ariaRelevant: r
    };
  },
  // Public methods
  // These must be in the methods block, not in the setup function, otherwise their documentation
  // won't be picked up by vue-docgen
  methods: {
    /**
     * Get the highlighted menu item, if any.
     *
     * The parent component should set `aria-activedescendant` to the `.id` property of the
     * object returned by this method. If this method returns null, `aria-activedescendant`
     * should not be set.
     *
     * @public
     * @return {MenuItemDataWithId|null} The highlighted menu item,
     *   or null if no item is highlighted or if the menu is closed.
     */
    getHighlightedMenuItem() {
      return this.expanded ? this.highlightedMenuItem : null;
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
      this.handleMenuItemChange("active", null);
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
     * @param options
     * @param options.prevent {boolean} If false, do not call e.preventDefault() or
     *   e.stopPropagation()
     * @param options.characterNavigation {boolean}
     * @return Whether the event was handled
     */
    delegateKeyNavigation(e, { prevent: t = !0, characterNavigation: n = !1 } = {}) {
      return this.handleKeyNavigation(e, { prevent: t, characterNavigation: n });
    }
  }
});
const Fo = ["aria-live", "aria-relevant"], Ro = {
  key: 0,
  class: "cdx-menu__pending cdx-menu-item"
}, Oo = {
  key: 1,
  class: "cdx-menu__no-results cdx-menu-item"
};
function zo(e, t, n, s, l, d) {
  const a = S("cdx-menu-item"), i = S("cdx-progress-bar");
  return ie((u(), h("div", {
    class: E(["cdx-menu", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    v("ul", G({
      class: "cdx-menu__listbox",
      role: "listbox",
      style: e.listBoxStyle,
      "aria-live": e.showPending ? "polite" : void 0,
      "aria-relevant": e.showPending ? e.ariaRelevant : void 0
    }, e.otherAttrs), [
      e.showPending && e.computedMenuItems.length === 0 && e.$slots.pending ? (u(), h("li", Ro, [
        $(e.$slots, "pending")
      ])) : y("", !0),
      e.computedShowNoResultsSlot ? (u(), h("li", Oo, [
        $(e.$slots, "no-results")
      ])) : y("", !0),
      (u(!0), h(ye, null, we(e.computedMenuItems, (o, r) => {
        var p, g;
        return u(), L(a, G({
          key: o.value,
          ref_for: !0,
          ref: (k) => e.assignTemplateRef(k, r)
        }, o, {
          selected: o.value === e.selected,
          active: o.value === ((p = e.activeMenuItem) == null ? void 0 : p.value),
          highlighted: o.value === ((g = e.highlightedMenuItem) == null ? void 0 : g.value),
          "show-thumbnail": e.showThumbnail,
          "bold-label": e.boldLabel,
          "hide-description-overflow": e.hideDescriptionOverflow,
          "search-query": e.searchQuery,
          onChange: (k, b) => e.handleMenuItemChange(k, b ? o : null),
          onClick: (k) => e.$emit("menu-item-click", o)
        }), {
          default: B(() => {
            var k, b;
            return [
              $(e.$slots, "default", {
                menuItem: o,
                active: o.value === ((k = e.activeMenuItem) == null ? void 0 : k.value) && o.value === ((b = e.highlightedMenuItem) == null ? void 0 : b.value)
              })
            ];
          }),
          _: 2
        }, 1040, ["selected", "active", "highlighted", "show-thumbnail", "bold-label", "hide-description-overflow", "search-query", "onChange", "onClick"]);
      }), 128)),
      e.showPending ? (u(), L(i, {
        key: 2,
        class: "cdx-menu__progress-bar",
        inline: !0
      })) : y("", !0)
    ], 16, Fo)
  ], 6)), [
    [Ie, e.expanded]
  ]);
}
const Te = /* @__PURE__ */ R(Eo, [["render", zo]]), qo = ee(mn), No = ee(me), Ho = F({
  name: "CdxTextInput",
  components: { CdxIcon: X },
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
      validator: qo
    },
    /**
     * `status` attribute of the input.
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: No
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
      O(e, "disabled"),
      O(e, "status"),
      s
    ), i = ce(Be, void 0), o = re(O(e, "modelValue"), t), r = c(() => e.clearable && !!o.value && !l.value), p = c(() => ({
      "cdx-text-input--has-start-icon": !!e.startIcon,
      "cdx-text-input--has-end-icon": !!e.endIcon,
      "cdx-text-input--clearable": r.value,
      [`cdx-text-input--status-${d.value}`]: !0
    })), {
      rootClasses: g,
      rootStyle: k,
      otherAttrs: b
    } = ue(n, p), D = c(() => {
      const w = b.value, { id: M } = w;
      return fe(w, ["id"]);
    }), A = c(() => ({
      "cdx-text-input__input--has-value": !!o.value
    }));
    return {
      computedInputId: a,
      descriptionId: i,
      wrappedModel: o,
      isClearable: r,
      rootClasses: g,
      rootStyle: k,
      otherAttrsMinusId: D,
      inputClasses: A,
      computedDisabled: l,
      onClear: (M) => {
        o.value = "", t("clear", M);
      },
      onInput: (M) => {
        t("input", M);
      },
      onChange: (M) => {
        t("change", M);
      },
      onKeydown: (M) => {
        (M.key === "Home" || M.key === "End") && !M.ctrlKey && !M.metaKey || t("keydown", M);
      },
      onFocus: (M) => {
        t("focus", M);
      },
      onBlur: (M) => {
        t("blur", M);
      },
      cdxIconClear: Yt
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
const jo = ["id", "type", "aria-describedby", "disabled"];
function Uo(e, t, n, s, l, d) {
  const a = S("cdx-icon");
  return u(), h("div", {
    class: E(["cdx-text-input", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    ie(v("input", G({
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
    }), null, 16, jo), [
      [Dt, e.wrappedModel]
    ]),
    e.startIcon ? (u(), L(a, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__start-icon"
    }, null, 8, ["icon"])) : y("", !0),
    e.endIcon ? (u(), L(a, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__end-icon"
    }, null, 8, ["icon"])) : y("", !0),
    e.isClearable ? (u(), L(a, {
      key: 2,
      icon: e.cdxIconClear,
      class: "cdx-text-input__icon-vue cdx-text-input__clear-icon",
      onMousedown: t[6] || (t[6] = oe(() => {
      }, ["prevent"])),
      onClick: e.onClear
    }, null, 8, ["icon", "onClick"])) : y("", !0)
  ], 6);
}
const Qe = /* @__PURE__ */ R(Ho, [["render", Uo]]);
function Ae(e) {
  const t = m(
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
  return pe(() => {
    s = !0, e.value && n.observe(e.value);
  }), Ne(() => {
    s = !1, n.disconnect();
  }), Y(e, (l) => {
    s && (n.disconnect(), t.value = {
      width: void 0,
      height: void 0
    }, l && n.observe(l));
  }), t;
}
const Po = ee(me), Ge = F({
  name: "CdxCombobox",
  components: {
    CdxButton: he,
    CdxIcon: X,
    CdxMenu: Te,
    CdxTextInput: Qe
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
      validator: Po
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
    const l = m(), d = m(), a = m(), i = U("combobox"), o = O(e, "selected"), r = re(o, t, "update:selected"), p = m(!1), g = m(!1), k = c(() => {
      var I, C;
      return (C = (I = a.value) == null ? void 0 : I.getHighlightedMenuItem()) == null ? void 0 : C.id;
    }), { computedDisabled: b } = de(O(e, "disabled")), D = c(() => ({
      "cdx-combobox--expanded": p.value,
      "cdx-combobox--disabled": b.value
    })), A = Ae(d), K = c(() => {
      var I;
      return `${(I = A.value.width) != null ? I : 0}px`;
    }), {
      rootClasses: W,
      rootStyle: Z,
      otherAttrs: P
    } = ue(n, D);
    function J(I) {
      g.value && p.value ? p.value = !1 : (e.menuItems.length > 0 || s["no-results"]) && (p.value = !0), t("focus", I);
    }
    function N(I) {
      p.value = g.value && p.value, t("blur", I);
    }
    function M() {
      b.value || (g.value = !0);
    }
    function _() {
      var I;
      b.value || (I = l.value) == null || I.focus();
    }
    function w(I) {
      !a.value || b.value || e.menuItems.length === 0 || I.key === " " || a.value.delegateKeyNavigation(I);
    }
    return Y(p, () => {
      g.value = !1;
    }), {
      input: l,
      inputWrapper: d,
      currentWidthInPx: K,
      menu: a,
      menuId: i,
      modelWrapper: r,
      expanded: p,
      highlightedId: k,
      computedDisabled: b,
      onInputFocus: J,
      onInputBlur: N,
      onKeydown: w,
      onButtonClick: _,
      onButtonMousedown: M,
      cdxIconExpand: je,
      rootClasses: W,
      rootStyle: Z,
      otherAttrs: P
    };
  }
}), ot = () => {
  He((e) => ({
    "177e3fc4": e.currentWidthInPx
  }));
}, lt = Ge.setup;
Ge.setup = lt ? (e, t) => (ot(), lt(e, t)) : ot;
const Wo = {
  ref: "inputWrapper",
  class: "cdx-combobox__input-wrapper"
};
function Qo(e, t, n, s, l, d) {
  const a = S("cdx-text-input"), i = S("cdx-icon"), o = S("cdx-button"), r = S("cdx-menu");
  return u(), h("div", {
    class: E(["cdx-combobox", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    v("div", Wo, [
      z(a, G({
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
      z(o, {
        class: "cdx-combobox__expand-button",
        "aria-hidden": "true",
        disabled: e.computedDisabled,
        tabindex: "-1",
        type: "button",
        onMousedown: e.onButtonMousedown,
        onClick: e.onButtonClick
      }, {
        default: B(() => [
          z(i, {
            class: "cdx-combobox__expand-icon",
            icon: e.cdxIconExpand
          }, null, 8, ["icon"])
        ]),
        _: 1
      }, 8, ["disabled", "onMousedown", "onClick"])
    ], 512),
    z(r, G({
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
      default: B(({ menuItem: p }) => [
        $(e.$slots, "menu-item", { menuItem: p })
      ]),
      "no-results": B(() => [
        $(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const ya = /* @__PURE__ */ R(Ge, [["render", Qo]]), Go = F({
  name: "CdxDialog",
  components: {
    CdxButton: he,
    CdxIcon: X
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
    },
    /**
     * Selector or DOM element identifying the container the dialog should
     * be rendered in. The dialog will be `<teleport>`ed to this element.
     * An ID selector is recommended, e.g. `#foo-bar`, but providing an
     * actual element is also supported.
     *
     * If this prop is not set, and the parent or one of its ancestors
     * provides a teleport target using `provide( 'CdxTeleportTarget',
     * '#foo-bar' )`, the provided target will be used. If there is no
     * provided target, the dialog will be teleported to the end of the
     * `<body>` element.
     */
    target: {
      type: String,
      default: null
    },
    /**
     * Whether to disable the use of teleport and render the Dialog in its
     * original location in the document. If this is true, the `target` prop
     * is ignored.
     */
    renderInPlace: {
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
    const n = U("dialog-label"), s = m(), l = m(), d = m(), a = m(), i = m(), o = c(() => !e.hideTitle || !!e.closeButtonLabel), r = c(() => !!e.primaryAction || !!e.defaultAction), p = Ae(l), g = c(() => {
      var N;
      return (N = p.value.height) != null ? N : 0;
    }), k = m(!1), b = c(() => ({
      "cdx-dialog--vertical-actions": e.stackedActions,
      "cdx-dialog--horizontal-actions": !e.stackedActions,
      "cdx-dialog--dividers": k.value
    })), D = ce("CdxTeleportTarget", void 0), A = c(() => {
      var N, M;
      return (M = (N = e.target) != null ? N : D) != null ? M : "body";
    }), K = m(0);
    function W() {
      t("update:open", !1);
    }
    function Z() {
      J(s.value);
    }
    function P() {
      J(s.value, !0);
    }
    function J(N, M = !1) {
      let _ = Array.from(
        N.querySelectorAll(`
					input, select, textarea, button, object, a, area,
					[contenteditable], [tabindex]:not([tabindex^="-"])
				`)
      );
      M && (_ = _.reverse());
      for (const w of _)
        if (w.focus(), document.activeElement === w)
          return !0;
      return !1;
    }
    return Y(O(e, "open"), (N) => {
      N ? (K.value = window.innerWidth - document.documentElement.clientWidth, document.documentElement.style.setProperty("margin-right", `${K.value}px`), document.body.classList.add("cdx-dialog-open"), _e(() => {
        var M;
        J(l.value) || (M = d.value) == null || M.focus();
      })) : (document.body.classList.remove("cdx-dialog-open"), document.documentElement.style.removeProperty("margin-right"));
    }), Y(g, () => {
      l.value && (k.value = l.value.clientHeight < l.value.scrollHeight);
    }), {
      close: W,
      cdxIconClose: ct,
      labelId: n,
      rootClasses: b,
      dialogElement: s,
      focusTrapStart: a,
      focusTrapEnd: i,
      focusFirst: Z,
      focusLast: P,
      dialogBody: l,
      focusHolder: d,
      showHeader: o,
      showFooterActions: r,
      computedTarget: A
    };
  }
});
const Zo = ["aria-label", "aria-labelledby"], Jo = {
  key: 0,
  class: "cdx-dialog__header__title-group"
}, Xo = ["id"], Yo = {
  key: 0,
  class: "cdx-dialog__header__subtitle"
}, el = {
  ref: "focusHolder",
  class: "cdx-dialog-focus-trap",
  tabindex: "-1"
}, tl = {
  key: 0,
  class: "cdx-dialog__footer__text"
}, nl = {
  key: 1,
  class: "cdx-dialog__footer__actions"
};
function ol(e, t, n, s, l, d) {
  const a = S("cdx-icon"), i = S("cdx-button");
  return u(), L(Kt, {
    to: e.computedTarget,
    disabled: e.renderInPlace
  }, [
    z(qe, {
      name: "cdx-dialog-fade",
      appear: ""
    }, {
      default: B(() => [
        e.open ? (u(), h("div", {
          key: 0,
          class: "cdx-dialog-backdrop",
          onClick: t[5] || (t[5] = (...o) => e.close && e.close(...o)),
          onKeyup: t[6] || (t[6] = le((...o) => e.close && e.close(...o), ["escape"]))
        }, [
          v("div", {
            ref: "focusTrapStart",
            tabindex: "0",
            onFocus: t[0] || (t[0] = (...o) => e.focusLast && e.focusLast(...o))
          }, null, 544),
          v("div", G({
            ref: "dialogElement",
            class: ["cdx-dialog", e.rootClasses],
            role: "dialog"
          }, e.$attrs, {
            "aria-label": e.$slots.header || e.hideTitle ? e.title : void 0,
            "aria-labelledby": !e.$slots.header && !e.hideTitle ? e.labelId : void 0,
            "aria-modal": "true",
            onClick: t[3] || (t[3] = oe(() => {
            }, ["stop"]))
          }), [
            e.showHeader || e.$slots.header ? (u(), h("header", {
              key: 0,
              class: E(["cdx-dialog__header", { "cdx-dialog__header--default": !e.$slots.header }])
            }, [
              $(e.$slots, "header", {}, () => [
                e.hideTitle ? y("", !0) : (u(), h("div", Jo, [
                  v("h2", {
                    id: e.labelId,
                    class: "cdx-dialog__header__title"
                  }, q(e.title), 9, Xo),
                  e.subtitle ? (u(), h("p", Yo, q(e.subtitle), 1)) : y("", !0)
                ])),
                e.closeButtonLabel ? (u(), L(i, {
                  key: 1,
                  class: "cdx-dialog__header__close-button",
                  weight: "quiet",
                  type: "button",
                  "aria-label": e.closeButtonLabel,
                  onClick: e.close
                }, {
                  default: B(() => [
                    z(a, {
                      icon: e.cdxIconClose,
                      "icon-label": e.closeButtonLabel
                    }, null, 8, ["icon", "icon-label"])
                  ]),
                  _: 1
                }, 8, ["aria-label", "onClick"])) : y("", !0)
              ])
            ], 2)) : y("", !0),
            v("div", el, null, 512),
            v("div", {
              ref: "dialogBody",
              class: E(["cdx-dialog__body", {
                "cdx-dialog__body--no-header": !(e.showHeader || e.$slots.header),
                "cdx-dialog__body--no-footer": !(e.showFooterActions || e.$slots.footer || e.$slots["footer-text"])
              }])
            }, [
              $(e.$slots, "default")
            ], 2),
            e.showFooterActions || e.$slots.footer || e.$slots["footer-text"] ? (u(), h("footer", {
              key: 1,
              class: E(["cdx-dialog__footer", { "cdx-dialog__footer--default": !e.$slots.footer }])
            }, [
              $(e.$slots, "footer", {}, () => [
                e.$slots["footer-text"] ? (u(), h("p", tl, [
                  $(e.$slots, "footer-text")
                ])) : y("", !0),
                e.showFooterActions ? (u(), h("div", nl, [
                  e.primaryAction ? (u(), L(i, {
                    key: 0,
                    class: "cdx-dialog__footer__primary-action",
                    weight: "primary",
                    action: e.primaryAction.actionType,
                    disabled: e.primaryAction.disabled,
                    onClick: t[1] || (t[1] = (o) => e.$emit("primary"))
                  }, {
                    default: B(() => [
                      ae(q(e.primaryAction.label), 1)
                    ]),
                    _: 1
                  }, 8, ["action", "disabled"])) : y("", !0),
                  e.defaultAction ? (u(), L(i, {
                    key: 1,
                    class: "cdx-dialog__footer__default-action",
                    disabled: e.defaultAction.disabled,
                    onClick: t[2] || (t[2] = (o) => e.$emit("default"))
                  }, {
                    default: B(() => [
                      ae(q(e.defaultAction.label), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"])) : y("", !0)
                ])) : y("", !0)
              ])
            ], 2)) : y("", !0)
          ], 16, Zo),
          v("div", {
            ref: "focusTrapEnd",
            tabindex: "0",
            onFocus: t[4] || (t[4] = (...o) => e.focusFirst && e.focusFirst(...o))
          }, null, 544)
        ], 32)) : y("", !0)
      ]),
      _: 3
    })
  ], 8, ["to", "disabled"]);
}
const $a = /* @__PURE__ */ R(Go, [["render", ol]]), ll = {
  notice: tn,
  error: pt,
  warning: rt,
  success: ft
}, al = F({
  name: "CdxMessage",
  components: { CdxButton: he, CdxIcon: X },
  props: {
    /**
     * Status type of Message.
     *
     * @values 'notice', 'warning', 'error', 'success'
     */
    type: {
      type: String,
      default: "notice",
      validator: ht
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
    const n = m(!1), s = c(
      () => e.inline === !1 && e.dismissButtonLabel.length > 0
    ), l = c(() => e.autoDismiss === !1 || e.type === "error" ? !1 : e.autoDismiss === !0 ? 4e3 : e.autoDismiss), d = c(() => ({
      "cdx-message--inline": e.inline,
      "cdx-message--block": !e.inline,
      "cdx-message--user-dismissable": s.value,
      [`cdx-message--${e.type}`]: !0
    })), a = c(
      () => e.icon && e.type === "notice" ? e.icon : ll[e.type]
    ), i = m("");
    function o(r) {
      n.value || (i.value = r === "user-dismissed" ? "cdx-message-leave-active-user" : "cdx-message-leave-active-system", n.value = !0, t(r));
    }
    return pe(() => {
      e.type === "error" && e.autoDismiss !== !1 ? Oe('CdxMessage: Message with type="error" cannot use auto-dismiss') : l.value && setTimeout(() => o("auto-dismissed"), l.value);
    }), {
      dismissed: n,
      userDismissable: s,
      rootClasses: d,
      leaveActiveClass: i,
      computedIcon: a,
      onDismiss: o,
      cdxIconClose: ct
    };
  }
});
const sl = ["aria-live", "role"], il = { class: "cdx-message__content" };
function dl(e, t, n, s, l, d) {
  const a = S("cdx-icon"), i = S("cdx-button");
  return u(), L(qe, {
    name: "cdx-message",
    appear: e.fadeIn,
    "leave-active-class": e.leaveActiveClass
  }, {
    default: B(() => [
      e.dismissed ? y("", !0) : (u(), h("div", {
        key: 0,
        class: E(["cdx-message", e.rootClasses]),
        "aria-live": e.type !== "error" ? "polite" : void 0,
        role: e.type === "error" ? "alert" : void 0
      }, [
        z(a, {
          class: "cdx-message__icon--vue",
          icon: e.computedIcon
        }, null, 8, ["icon"]),
        v("div", il, [
          $(e.$slots, "default")
        ]),
        e.userDismissable ? (u(), L(i, {
          key: 0,
          class: "cdx-message__dismiss-button",
          weight: "quiet",
          type: "button",
          "aria-label": e.dismissButtonLabel,
          onClick: t[0] || (t[0] = (o) => e.onDismiss("user-dismissed"))
        }, {
          default: B(() => [
            z(a, {
              icon: e.cdxIconClose,
              "icon-label": e.dismissButtonLabel
            }, null, 8, ["icon", "icon-label"])
          ]),
          _: 1
        }, 8, ["aria-label"])) : y("", !0)
      ], 10, sl))
    ]),
    _: 3
  }, 8, ["appear", "leave-active-class"]);
}
const ul = /* @__PURE__ */ R(al, [["render", dl]]), rl = ee(me), cl = F({
  name: "CdxField",
  components: { CdxLabel: Me, CdxMessage: ul },
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
      validator: rl
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
    const { disabled: n, status: s, isFieldset: l } = Et(e), d = wt(n), a = c(() => ({
      "cdx-field--disabled": d.value
    })), i = U("label"), o = U("description"), r = U("input"), p = c(() => l.value ? void 0 : r);
    ge(gt, p);
    const g = c(
      () => !l.value && t.description ? o : void 0
    );
    ge(Be, g), ge($t, d), ge(yt, s);
    const k = c(
      () => e.status !== "default" && e.status in e.messages ? e.messages[e.status] : ""
    ), b = c(() => e.status === "default" ? "notice" : e.status);
    return {
      rootClasses: a,
      computedDisabled: d,
      labelId: i,
      descriptionId: o,
      inputId: r,
      validationMessage: k,
      validationMessageType: b
    };
  }
});
const pl = { class: "cdx-field__help-text" }, fl = {
  key: 0,
  class: "cdx-field__validation-message"
};
function ml(e, t, n, s, l, d) {
  const a = S("cdx-label"), i = S("cdx-message");
  return u(), L(Se(e.isFieldset ? "fieldset" : "div"), {
    class: E(["cdx-field", e.rootClasses]),
    "aria-disabled": !e.isFieldset && e.computedDisabled ? !0 : void 0,
    disabled: e.isFieldset && e.computedDisabled ? !0 : void 0
  }, {
    default: B(() => [
      z(a, {
        id: e.labelId,
        icon: e.labelIcon,
        "visually-hidden": e.hideLabel,
        "optional-flag": e.optionalFlag,
        "input-id": e.inputId,
        "description-id": e.descriptionId,
        disabled: e.computedDisabled,
        "is-legend": e.isFieldset
      }, xe({
        default: B(() => [
          $(e.$slots, "label")
        ]),
        _: 2
      }, [
        e.$slots.description && e.$slots.description().length > 0 ? {
          name: "description",
          fn: B(() => [
            $(e.$slots, "description")
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["id", "icon", "visually-hidden", "optional-flag", "input-id", "description-id", "disabled", "is-legend"]),
      v("div", {
        class: E(["cdx-field__control", { "cdx-field__control--has-help-text": e.$slots["help-text"] && e.$slots["help-text"]().length > 0 || e.validationMessage }])
      }, [
        $(e.$slots, "default")
      ], 2),
      v("div", pl, [
        $(e.$slots, "help-text")
      ]),
      !e.computedDisabled && e.validationMessage ? (u(), h("div", fl, [
        z(i, {
          type: e.validationMessageType,
          inline: !0
        }, {
          default: B(() => [
            ae(q(e.validationMessage), 1)
          ]),
          _: 1
        }, 8, ["type"])
      ])) : y("", !0)
    ]),
    _: 3
  }, 8, ["class", "aria-disabled", "disabled"]);
}
const _a = /* @__PURE__ */ R(cl, [["render", ml]]), hl = ee(me), Ze = F({
  name: "CdxLookup",
  components: {
    CdxMenu: Te,
    CdxTextInput: Qe
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
      validator: hl
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
    const l = m(), d = m(), a = U("lookup-menu"), i = m(!1), o = m(!1), r = m(!1), { computedDisabled: p } = de(O(e, "disabled")), g = O(e, "selected"), k = re(g, t, "update:selected"), b = c(
      () => e.menuItems.find((C) => C.value === e.selected)
    ), D = c(() => {
      var C, V;
      return (V = (C = d.value) == null ? void 0 : C.getHighlightedMenuItem()) == null ? void 0 : V.id;
    }), A = m(e.initialInputValue), K = Ae(l), W = c(() => {
      var C;
      return `${(C = K.value.width) != null ? C : 0}px`;
    }), Z = c(() => ({
      "cdx-lookup--disabled": p.value,
      "cdx-lookup--pending": i.value
    })), {
      rootClasses: P,
      rootStyle: J,
      otherAttrs: N
    } = ue(n, Z);
    function M(C) {
      b.value && b.value.label !== C && b.value.value !== C && (k.value = null), C === "" ? (o.value = !1, i.value = !1) : i.value = !0, t("input", C);
    }
    function _(C) {
      r.value = !0, // Input value is not null or an empty string.
      A.value !== null && A.value !== "" && // There's either menu items to show or a no results message.
      (e.menuItems.length > 0 || s["no-results"]) && (o.value = !0), t("focus", C);
    }
    function w(C) {
      r.value = !1, o.value = !1, t("blur", C);
    }
    function I(C) {
      !d.value || p.value || e.menuItems.length === 0 && !s["no-results"] || C.key === " " || d.value.delegateKeyNavigation(C);
    }
    return Y(g, (C) => {
      if (C !== null) {
        const V = b.value ? b.value.label || b.value.value : "";
        A.value !== V && (A.value = V, t("input", A.value));
      }
    }), Y(O(e, "menuItems"), (C) => {
      // Only show the menu if we were in the pending state (meaning this menuItems change
      // was in response to user input) and the menu is still focused
      r.value && i.value && // Show the menu if there are either menu items or no-results content to show
      (C.length > 0 || s["no-results"]) && (o.value = !0), C.length === 0 && !s["no-results"] && (o.value = !1), i.value = !1;
    }), {
      rootElement: l,
      currentWidthInPx: W,
      menu: d,
      menuId: a,
      highlightedId: D,
      inputValue: A,
      modelWrapper: k,
      expanded: o,
      computedDisabled: p,
      onInputBlur: w,
      rootClasses: P,
      rootStyle: J,
      otherAttrs: N,
      onUpdateInput: M,
      onInputFocus: _,
      onKeydown: I
    };
  }
}), at = () => {
  He((e) => ({
    "49368ef8": e.currentWidthInPx
  }));
}, st = Ze.setup;
Ze.setup = st ? (e, t) => (at(), st(e, t)) : at;
function vl(e, t, n, s, l, d) {
  const a = S("cdx-text-input"), i = S("cdx-menu");
  return u(), h("div", {
    ref: "rootElement",
    class: E(["cdx-lookup", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    z(a, G({
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
    z(i, G({
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
      default: B(({ menuItem: o }) => [
        $(e.$slots, "menu-item", { menuItem: o })
      ]),
      "no-results": B(() => [
        $(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const Ia = /* @__PURE__ */ R(Ze, [["render", vl]]), bl = F({
  name: "CdxRadio",
  components: { CdxLabel: Me },
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
     */
    name: {
      type: String,
      required: !0
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
  setup(e, { emit: t, slots: n, attrs: s }) {
    var g;
    We((g = n.default) == null ? void 0 : g.call(n), s, "CdxRadio");
    const l = c(() => ({
      "cdx-radio--inline": e.inline
    })), { computedDisabled: d } = de(O(e, "disabled")), a = m(), i = U("radio"), o = U("description"), r = () => {
      a.value.focus();
    }, p = re(O(e, "modelValue"), t);
    return {
      rootClasses: l,
      computedDisabled: d,
      input: a,
      radioId: i,
      descriptionId: o,
      focusInput: r,
      wrappedModel: p
    };
  }
});
const gl = ["id", "aria-describedby", "name", "value", "disabled"], yl = /* @__PURE__ */ v("span", { class: "cdx-radio__icon" }, null, -1);
function $l(e, t, n, s, l, d) {
  const a = S("cdx-label");
  return u(), h("span", {
    class: E(["cdx-radio", e.rootClasses])
  }, [
    ie(v("input", {
      id: e.radioId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wrappedModel = i),
      class: "cdx-radio__input",
      type: "radio",
      "aria-describedby": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      name: e.name,
      value: e.inputValue,
      disabled: e.computedDisabled
    }, null, 8, gl), [
      [Ft, e.wrappedModel]
    ]),
    yl,
    e.$slots.default && e.$slots.default().length ? (u(), L(a, {
      key: 0,
      class: "cdx-radio__label",
      "input-id": e.radioId,
      "description-id": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      disabled: e.computedDisabled,
      onClick: e.focusInput
    }, xe({
      default: B(() => [
        $(e.$slots, "default")
      ]),
      _: 2
    }, [
      e.$slots.description && e.$slots.description().length > 0 ? {
        name: "description",
        fn: B(() => [
          $(e.$slots, "description")
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["input-id", "description-id", "disabled", "onClick"])) : y("", !0)
  ], 2);
}
const Ca = /* @__PURE__ */ R(bl, [["render", $l]]), _l = ee(me), Il = F({
  name: "CdxSearchInput",
  components: {
    CdxButton: he,
    CdxTextInput: Qe
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
      validator: _l
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
    const s = re(O(e, "modelValue"), t), { computedDisabled: l } = de(O(e, "disabled")), d = c(() => ({
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
      searchIcon: ln
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
const Cl = { class: "cdx-search-input__input-wrapper" };
function kl(e, t, n, s, l, d) {
  const a = S("cdx-text-input"), i = S("cdx-button");
  return u(), h("div", {
    class: E(["cdx-search-input", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    v("div", Cl, [
      z(a, G({
        ref: "textInput",
        modelValue: e.wrappedModel,
        "onUpdate:modelValue": t[0] || (t[0] = (o) => e.wrappedModel = o),
        class: "cdx-search-input__text-input",
        "input-type": "search",
        "start-icon": e.searchIcon,
        disabled: e.computedDisabled,
        status: e.status
      }, e.otherAttrs, {
        onKeydown: le(e.handleSubmit, ["enter"]),
        onInput: t[1] || (t[1] = (o) => e.$emit("input", o)),
        onChange: t[2] || (t[2] = (o) => e.$emit("change", o)),
        onFocus: t[3] || (t[3] = (o) => e.$emit("focus", o)),
        onBlur: t[4] || (t[4] = (o) => e.$emit("blur", o))
      }), null, 16, ["modelValue", "start-icon", "disabled", "status", "onKeydown"]),
      $(e.$slots, "default")
    ]),
    e.buttonLabel ? (u(), L(i, {
      key: 0,
      class: "cdx-search-input__end-button",
      disabled: e.computedDisabled,
      onClick: e.handleSubmit
    }, {
      default: B(() => [
        ae(q(e.buttonLabel), 1)
      ]),
      _: 1
    }, 8, ["disabled", "onClick"])) : y("", !0)
  ], 6);
}
const Sl = /* @__PURE__ */ R(Il, [["render", kl]]), wl = ee(me), Je = F({
  name: "CdxSelect",
  components: {
    CdxIcon: X,
    CdxMenu: Te
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
      validator: wl
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
    const s = m(), l = m(), d = ce(Be, void 0), a = U("select-menu"), i = m(!1), o = n.id || U("select-handle"), {
      computedDisabled: r,
      computedStatus: p,
      computedInputId: g
    } = de(
      O(e, "disabled"),
      O(e, "status"),
      o
    ), k = re(O(e, "selected"), t, "update:selected"), b = c(
      () => e.menuItems.find((V) => V.value === e.selected)
    ), D = c(() => b.value ? b.value.label || b.value.value : e.defaultLabel), A = Ae(s), K = c(() => {
      var V;
      return `${(V = A.value.width) != null ? V : 0}px`;
    }), W = c(() => {
      if (e.defaultIcon && !b.value)
        return e.defaultIcon;
      if (b.value && b.value.icon)
        return b.value.icon;
    }), Z = c(() => ({
      "cdx-select-vue--enabled": !r.value,
      "cdx-select-vue--disabled": r.value,
      "cdx-select-vue--expanded": i.value,
      "cdx-select-vue--value-selected": !!b.value,
      "cdx-select-vue--no-selections": !b.value,
      "cdx-select-vue--has-start-icon": !!W.value,
      [`cdx-select-vue--status-${p.value}`]: !0
    })), {
      rootClasses: P,
      rootStyle: J,
      otherAttrs: N
    } = ue(n, Z), M = c(() => {
      const te = N.value, { id: V } = te;
      return fe(te, ["id"]);
    }), _ = c(() => {
      var V, j;
      return (j = (V = l.value) == null ? void 0 : V.getHighlightedMenuItem()) == null ? void 0 : j.id;
    });
    function w() {
      i.value = !1;
    }
    function I() {
      var V;
      r.value || (i.value = !i.value, (V = s.value) == null || V.focus());
    }
    function C(V) {
      var j;
      r.value || (j = l.value) == null || j.delegateKeyNavigation(V, { characterNavigation: !0 });
    }
    return {
      handle: s,
      menu: l,
      computedHandleId: g,
      descriptionId: d,
      menuId: a,
      modelWrapper: k,
      selectedMenuItem: b,
      highlightedId: _,
      expanded: i,
      computedDisabled: r,
      onBlur: w,
      currentLabel: D,
      currentWidthInPx: K,
      rootClasses: P,
      rootStyle: J,
      otherAttrsMinusId: M,
      onClick: I,
      onKeydown: C,
      startIcon: W,
      cdxIconExpand: je
    };
  }
}), it = () => {
  He((e) => ({
    "3b410536": e.currentWidthInPx
  }));
}, dt = Je.setup;
Je.setup = dt ? (e, t) => (it(), dt(e, t)) : it;
const xl = ["aria-disabled"], Bl = ["id", "aria-controls", "aria-activedescendant", "aria-expanded", "aria-describedby"];
function Ml(e, t, n, s, l, d) {
  const a = S("cdx-icon"), i = S("cdx-menu");
  return u(), h("div", {
    class: E(["cdx-select-vue", e.rootClasses]),
    style: se(e.rootStyle),
    "aria-disabled": e.computedDisabled
  }, [
    v("div", G({
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
      $(e.$slots, "label", {
        selectedMenuItem: e.selectedMenuItem,
        defaultLabel: e.defaultLabel
      }, () => [
        ae(q(e.currentLabel), 1)
      ]),
      e.startIcon ? (u(), L(a, {
        key: 0,
        icon: e.startIcon,
        class: "cdx-select-vue__start-icon"
      }, null, 8, ["icon"])) : y("", !0),
      z(a, {
        icon: e.cdxIconExpand,
        class: "cdx-select-vue__indicator"
      }, null, 8, ["icon"])
    ], 16, Bl),
    z(i, G({
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
      default: B(({ menuItem: o }) => [
        $(e.$slots, "menu-item", { menuItem: o })
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 14, xl);
}
const ka = /* @__PURE__ */ R(Je, [["render", Ml]]), Tl = F({
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
    const t = ce(vt), n = ce(bt);
    if (!t || !n)
      throw new Error("Tab component must be used inside a Tabs component");
    const s = t.value.get(e.name) || {}, l = c(() => e.name === n.value);
    return {
      tab: s,
      isActive: l
    };
  }
});
const Al = ["id", "aria-hidden", "aria-labelledby"];
function Ll(e, t, n, s, l, d) {
  return ie((u(), h("section", {
    id: e.tab.id,
    "aria-hidden": e.isActive ? void 0 : !0,
    "aria-labelledby": `${e.tab.id}-label`,
    class: "cdx-tab",
    role: "tabpanel",
    tabindex: "-1"
  }, [
    $(e.$slots, "default")
  ], 8, Al)), [
    [Ie, e.isActive]
  ]);
}
const Vl = /* @__PURE__ */ R(Tl, [["render", Ll]]), Dl = F({
  name: "CdxTabs",
  components: {
    CdxButton: he,
    CdxIcon: X
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
    const s = m(), l = m(), d = m(), a = m(), i = mt(s), o = c(() => {
      const _ = Ue(t.default);
      if (!_.every(
        (w) => typeof w == "object" && It(w, Vl.name)
      ))
        throw new Error("Slot content may only contain CdxTab components");
      if (_.length === 0)
        throw new Error("Slot content cannot be empty");
      return _;
    }), r = c(() => o.value.reduce((_, w) => {
      var I;
      if ((I = w.props) != null && I.name && typeof w.props.name == "string") {
        if (_.get(w.props.name))
          throw new Error("Tab names must be unique");
        _.set(w.props.name, {
          name: w.props.name,
          id: U(w.props.name),
          label: w.props.label || w.props.name,
          disabled: w.props.disabled
        });
      }
      return _;
    }, /* @__PURE__ */ new Map())), p = re(O(e, "active"), n, "update:active"), g = c(() => Array.from(r.value.keys())), k = c(() => g.value.indexOf(p.value)), b = c(() => {
      var _;
      return (_ = r.value.get(p.value)) == null ? void 0 : _.id;
    });
    ge(bt, p), ge(vt, r);
    const D = m(/* @__PURE__ */ new Map()), A = m(), K = m(), W = ze(A, { threshold: 0.95 }), Z = ze(K, { threshold: 0.95 });
    function P(_, w) {
      const I = _;
      I && (D.value.set(w, I), w === 0 ? A.value = I : w === g.value.length - 1 && (K.value = I));
    }
    const J = c(() => ({
      "cdx-tabs--framed": e.framed,
      "cdx-tabs--quiet": !e.framed
    }));
    function N(_) {
      if (!l.value || !d.value || !a.value)
        return 0;
      const w = i.value === "rtl" ? a.value : d.value, I = i.value === "rtl" ? d.value : a.value, C = _.offsetLeft, V = C + _.clientWidth, j = l.value.scrollLeft + w.clientWidth, te = l.value.scrollLeft + l.value.clientWidth - I.clientWidth;
      return C < j ? C - j : V > te ? V - te : 0;
    }
    function M(_) {
      var V;
      if (!l.value || !d.value || !a.value)
        return;
      const w = _ === "next" && i.value === "ltr" || _ === "prev" && i.value === "rtl" ? 1 : -1;
      let I = 0, C = _ === "next" ? l.value.firstElementChild : l.value.lastElementChild;
      for (; C; ) {
        const j = _ === "next" ? C.nextElementSibling : C.previousElementSibling;
        if (I = N(C), Math.sign(I) === w) {
          j && Math.abs(I) < 0.25 * l.value.clientWidth && (I = N(j));
          break;
        }
        C = j;
      }
      l.value.scrollBy({
        left: I,
        behavior: "smooth"
      }), (V = D.value.get(k.value)) == null || V.focus();
    }
    return Y(p, () => {
      if (b.value === void 0 || !l.value || !d.value || !a.value)
        return;
      const _ = document.getElementById(`${b.value}-label`);
      _ && l.value.scrollBy({
        left: N(_),
        behavior: "smooth"
      });
    }), {
      activeTab: p,
      activeTabIndex: k,
      activeTabId: b,
      currentDirection: i,
      rootElement: s,
      tabListElement: l,
      prevScroller: d,
      nextScroller: a,
      rootClasses: J,
      tabNames: g,
      tabsData: r,
      tabButtonRefs: D,
      firstLabelVisible: W,
      lastLabelVisible: Z,
      assignTemplateRefForTabButton: P,
      scrollTabs: M,
      cdxIconPrevious: on,
      cdxIconNext: nn
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
        var s;
        (s = this.tabButtonRefs.get(this.activeTabIndex)) == null || s.focus();
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
      const s = this.tabsData.get(this.tabNames[e + t]);
      s && (s.disabled ? this.selectNonDisabled(e + t, t, n) : this.select(s.name, n));
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
const Kl = { class: "cdx-tabs__header" }, El = {
  ref: "prevScroller",
  class: "cdx-tabs__prev-scroller"
}, Fl = {
  ref: "tabListElement",
  class: "cdx-tabs__list",
  role: "tablist"
}, Rl = ["id", "disabled", "aria-controls", "aria-selected", "tabindex", "onClick", "onKeyup"], Ol = {
  ref: "nextScroller",
  class: "cdx-tabs__next-scroller"
}, zl = { class: "cdx-tabs__content" };
function ql(e, t, n, s, l, d) {
  const a = S("cdx-icon"), i = S("cdx-button");
  return u(), h("div", {
    ref: "rootElement",
    class: E(["cdx-tabs", e.rootClasses])
  }, [
    v("div", Kl, [
      ie(v("div", El, [
        z(i, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[0] || (t[0] = oe(() => {
          }, ["prevent"])),
          onClick: t[1] || (t[1] = (o) => e.scrollTabs("prev"))
        }, {
          default: B(() => [
            z(a, { icon: e.cdxIconPrevious }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [Ie, !e.firstLabelVisible]
      ]),
      v("div", Fl, [
        (u(!0), h(ye, null, we(e.tabsData.values(), (o, r) => (u(), h("button", {
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
          onClick: oe((p) => e.select(o.name), ["prevent"]),
          onKeyup: le((p) => e.select(o.name), ["enter"]),
          onKeydown: [
            t[2] || (t[2] = le(oe((...p) => e.onRightArrowKeypress && e.onRightArrowKeypress(...p), ["prevent"]), ["right"])),
            t[3] || (t[3] = le(oe((...p) => e.onDownArrowKeypress && e.onDownArrowKeypress(...p), ["prevent"]), ["down"])),
            t[4] || (t[4] = le(oe((...p) => e.onLeftArrowKeypress && e.onLeftArrowKeypress(...p), ["prevent"]), ["left"]))
          ]
        }, [
          v("span", null, q(o.label), 1)
        ], 40, Rl))), 128))
      ], 512),
      ie(v("div", Ol, [
        z(i, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[5] || (t[5] = oe(() => {
          }, ["prevent"])),
          onClick: t[6] || (t[6] = (o) => e.scrollTabs("next"))
        }, {
          default: B(() => [
            z(a, { icon: e.cdxIconNext }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [Ie, !e.lastLabelVisible]
      ])
    ]),
    v("div", zl, [
      $(e.$slots, "default")
    ])
  ], 2);
}
const Sa = /* @__PURE__ */ R(Dl, [["render", ql]]), Nl = ee(me), Hl = F({
  name: "CdxTextArea",
  components: { CdxIcon: X },
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
      validator: Nl
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
    const s = re(O(e, "modelValue"), n), l = t.id, {
      computedDisabled: d,
      computedStatus: a,
      computedInputId: i
    } = de(
      O(e, "disabled"),
      O(e, "status"),
      l
    ), o = ce(Be, void 0), r = c(() => ({
      "cdx-text-area__textarea--has-value": !!s.value,
      "cdx-text-area__textarea--is-autosize": e.autosize
    })), p = c(() => ({
      "cdx-text-area--status-default": a.value === "default",
      "cdx-text-area--status-error": a.value === "error",
      "cdx-text-area--has-start-icon": !!e.startIcon,
      "cdx-text-area--has-end-icon": !!e.endIcon
    })), {
      rootClasses: g,
      rootStyle: k,
      otherAttrs: b
    } = ue(t, p), D = c(() => {
      const P = b.value, { id: W } = P;
      return fe(P, ["id"]);
    }), A = m();
    function K() {
      A.value && e.autosize && (A.value.style.height = "auto", A.value.style.height = `${A.value.scrollHeight}px`);
    }
    return {
      rootClasses: g,
      rootStyle: k,
      wrappedModel: s,
      computedDisabled: d,
      computedInputId: i,
      descriptionId: o,
      textareaClasses: r,
      otherAttrsMinusId: D,
      textarea: A,
      onInput: K
    };
  }
});
const jl = ["id", "aria-describedby", "disabled"];
function Ul(e, t, n, s, l, d) {
  const a = S("cdx-icon");
  return u(), h("div", {
    class: E(["cdx-text-area", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    ie(v("textarea", G({
      id: e.computedInputId,
      ref: "textarea"
    }, e.otherAttrsMinusId, {
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wrappedModel = i),
      class: [e.textareaClasses, "cdx-text-area__textarea"],
      "aria-describedby": e.descriptionId,
      disabled: e.computedDisabled,
      onInput: t[1] || (t[1] = (...i) => e.onInput && e.onInput(...i))
    }), null, 16, jl), [
      [Rt, e.wrappedModel]
    ]),
    e.startIcon ? (u(), L(a, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-area__icon-vue cdx-text-area__start-icon"
    }, null, 8, ["icon"])) : y("", !0),
    e.endIcon ? (u(), L(a, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-area__icon-vue cdx-text-area__end-icon"
    }, null, 8, ["icon"])) : y("", !0)
  ], 6);
}
const wa = /* @__PURE__ */ R(Hl, [["render", Ul]]), Pl = F({
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
  setup(e, { emit: t, slots: n, attrs: s }) {
    const l = Ct(n.default, s, "CdxButton"), d = m(!1);
    return {
      rootClasses: c(() => ({
        // Quiet means frameless among other things
        "cdx-toggle-button--quiet": e.quiet,
        "cdx-toggle-button--framed": !e.quiet,
        // Provide --toggled-off too so that we can simplify selectors
        "cdx-toggle-button--toggled-on": e.modelValue,
        "cdx-toggle-button--toggled-off": !e.modelValue,
        "cdx-toggle-button--icon-only": l.value,
        "cdx-toggle-button--is-active": d.value
      })),
      onClick: () => {
        t("update:modelValue", !e.modelValue);
      },
      setActive: (r) => {
        d.value = r;
      }
    };
  }
});
const Wl = ["aria-pressed", "disabled"];
function Ql(e, t, n, s, l, d) {
  return u(), h("button", {
    class: E(["cdx-toggle-button", e.rootClasses]),
    "aria-pressed": e.modelValue,
    disabled: e.disabled,
    onClick: t[0] || (t[0] = (...a) => e.onClick && e.onClick(...a)),
    onKeydown: t[1] || (t[1] = le((a) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = le((a) => e.setActive(!1), ["space", "enter"]))
  }, [
    $(e.$slots, "default")
  ], 42, Wl);
}
const Gl = /* @__PURE__ */ R(Pl, [["render", Ql]]), Zl = F({
  name: "CdxToggleButtonGroup",
  components: {
    CdxIcon: X,
    CdxToggleButton: Gl
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
      getButtonLabel: kt,
      isSelected: n,
      onUpdate: s
    };
  }
});
const Jl = { class: "cdx-toggle-button-group" };
function Xl(e, t, n, s, l, d) {
  const a = S("cdx-icon"), i = S("cdx-toggle-button");
  return u(), h("div", Jl, [
    (u(!0), h(ye, null, we(e.buttons, (o) => (u(), L(i, {
      key: o.value,
      "model-value": e.isSelected(o),
      disabled: o.disabled || e.disabled,
      "aria-label": o.ariaLabel,
      "onUpdate:modelValue": (r) => e.onUpdate(o, r)
    }, {
      default: B(() => [
        $(e.$slots, "default", {
          button: o,
          selected: e.isSelected(o)
        }, () => [
          o.icon ? (u(), L(a, {
            key: 0,
            icon: o.icon
          }, null, 8, ["icon"])) : y("", !0),
          ae(" " + q(e.getButtonLabel(o)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["model-value", "disabled", "aria-label", "onUpdate:modelValue"]))), 128))
  ]);
}
const xa = /* @__PURE__ */ R(Zl, [["render", Xl]]), Yl = F({
  name: "CdxToggleSwitch",
  components: { CdxLabel: Me },
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
  setup(e, { emit: t, slots: n, attrs: s }) {
    var D;
    We((D = n.default) == null ? void 0 : D.call(n), s, "CdxToggleSwitch");
    const l = m(), d = U("toggle-switch"), a = U("description"), i = c(() => ({
      "cdx-toggle-switch--align-switch": e.alignSwitch
    })), {
      rootClasses: o,
      rootStyle: r,
      otherAttrs: p
    } = ue(s, i), { computedDisabled: g } = de(O(e, "disabled")), k = re(O(e, "modelValue"), t);
    return {
      input: l,
      inputId: d,
      descriptionId: a,
      rootClasses: o,
      rootStyle: r,
      otherAttrs: p,
      computedDisabled: g,
      wrappedModel: k,
      clickInput: () => {
        l.value.click();
      }
    };
  }
});
const ea = ["id", "aria-describedby", "value", "disabled"], ta = /* @__PURE__ */ v("span", { class: "cdx-toggle-switch__switch" }, [
  /* @__PURE__ */ v("span", { class: "cdx-toggle-switch__switch__grip" })
], -1);
function na(e, t, n, s, l, d) {
  const a = S("cdx-label");
  return u(), h("span", {
    class: E(["cdx-toggle-switch", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    ie(v("input", G({
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
      onKeydown: t[1] || (t[1] = le(oe((...i) => e.clickInput && e.clickInput(...i), ["prevent"]), ["enter"]))
    }), null, 16, ea), [
      [ut, e.wrappedModel]
    ]),
    ta,
    e.$slots.default && e.$slots.default().length ? (u(), L(a, {
      key: 0,
      class: "cdx-toggle-switch__label",
      "input-id": e.inputId,
      "description-id": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      "visually-hidden": e.hideLabel,
      disabled: e.computedDisabled
    }, xe({
      default: B(() => [
        $(e.$slots, "default")
      ]),
      _: 2
    }, [
      e.$slots.description && e.$slots.description().length > 0 ? {
        name: "description",
        fn: B(() => [
          $(e.$slots, "description")
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["input-id", "description-id", "visually-hidden", "disabled"])) : y("", !0)
  ], 6);
}
const Ba = /* @__PURE__ */ R(Yl, [["render", na]]), oa = F({
  name: "CdxTypeaheadSearch",
  components: {
    CdxIcon: X,
    CdxMenu: Te,
    CdxSearchInput: Sl
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
      default: hn
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
    const l = m(), d = m(), a = U("typeahead-search-menu"), i = m(!1), o = m(!1), r = m(!1), p = m(!1), g = m(e.initialInputValue), k = m(""), b = c(() => {
      var T, f;
      return (f = (T = d.value) == null ? void 0 : T.getHighlightedMenuItem()) == null ? void 0 : f.id;
    }), D = m(null), A = c(() => ({
      "cdx-typeahead-search__menu-message--has-thumbnail": e.showThumbnail
    })), K = c(
      () => e.searchResults.find(
        (T) => T.value === D.value
      )
    ), W = c(
      () => e.searchFooterUrl ? { value: be, url: e.searchFooterUrl } : void 0
    ), Z = c(() => ({
      "cdx-typeahead-search--show-thumbnail": e.showThumbnail,
      "cdx-typeahead-search--expanded": i.value,
      "cdx-typeahead-search--auto-expand-width": e.showThumbnail && e.autoExpandWidth
    })), {
      rootClasses: P,
      rootStyle: J,
      otherAttrs: N
    } = ue(t, Z);
    function M(T) {
      return T;
    }
    const _ = c(() => ({
      visibleItemLimit: e.visibleItemLimit,
      showThumbnail: e.showThumbnail,
      // In case search queries aren't highlighted, default to a bold label.
      boldLabel: !0,
      hideDescriptionOverflow: !0
    }));
    let w, I;
    function C(T, f = !1) {
      K.value && K.value.label !== T && K.value.value !== T && (D.value = null), I !== void 0 && (clearTimeout(I), I = void 0), T === "" ? i.value = !1 : (o.value = !0, s["search-results-pending"] && (I = setTimeout(() => {
        p.value && (i.value = !0), r.value = !0;
      }, vn))), w !== void 0 && (clearTimeout(w), w = void 0);
      const x = () => {
        n("input", T);
      };
      f ? x() : w = setTimeout(() => {
        x();
      }, e.debounceInterval);
    }
    function V(T) {
      if (T === be) {
        D.value = null, g.value = k.value;
        return;
      }
      D.value = T, T !== null && (g.value = K.value ? K.value.label || String(K.value.value) : "");
    }
    function j() {
      p.value = !0, (k.value || r.value) && (i.value = !0);
    }
    function te() {
      p.value = !1, i.value = !1;
    }
    function $e(T) {
      const H = T, { id: f } = H, x = fe(H, ["id"]);
      if (x.value === be) {
        n("search-result-click", {
          searchResult: null,
          index: e.searchResults.length,
          numberOfResults: e.searchResults.length
        });
        return;
      }
      Ce(x);
    }
    function Ce(T) {
      const f = {
        searchResult: T,
        index: e.searchResults.findIndex(
          (x) => x.value === T.value
        ),
        numberOfResults: e.searchResults.length
      };
      n("search-result-click", f);
    }
    function Le(T) {
      if (T.value === be) {
        g.value = k.value;
        return;
      }
      g.value = T.value ? T.label || String(T.value) : "";
    }
    function Ve(T) {
      var f;
      i.value = !1, (f = d.value) == null || f.clearActive(), $e(T);
    }
    function De(T) {
      if (K.value)
        Ce(K.value), T.stopPropagation(), window.location.assign(K.value.url), T.preventDefault();
      else {
        const f = {
          searchResult: null,
          index: -1,
          numberOfResults: e.searchResults.length
        };
        n("submit", f);
      }
    }
    function Ke(T) {
      if (!d.value || !k.value || T.key === " ")
        return;
      const f = d.value.getHighlightedMenuItem(), x = d.value.getHighlightedViaKeyboard();
      switch (T.key) {
        case "Enter":
          f && (f.value === be && x ? window.location.assign(e.searchFooterUrl) : d.value.delegateKeyNavigation(T, { prevent: !1 })), i.value = !1;
          break;
        case "Tab":
          i.value = !1;
          break;
        default:
          d.value.delegateKeyNavigation(T);
          break;
      }
    }
    return pe(() => {
      e.initialInputValue && C(e.initialInputValue, !0);
    }), Y(O(e, "searchResults"), () => {
      k.value = g.value.trim(), p.value && o.value && k.value.length > 0 && (i.value = !0), I !== void 0 && (clearTimeout(I), I = void 0), o.value = !1, r.value = !1;
    }), {
      form: l,
      menu: d,
      menuId: a,
      highlightedId: b,
      selection: D,
      menuMessageClass: A,
      footer: W,
      asSearchResult: M,
      inputValue: g,
      searchQuery: k,
      expanded: i,
      showPending: r,
      rootClasses: P,
      rootStyle: J,
      otherAttrs: N,
      menuConfig: _,
      onUpdateInputValue: C,
      onUpdateMenuSelection: V,
      onFocus: j,
      onBlur: te,
      onSearchResultClick: $e,
      onSearchResultKeyboardNavigation: Le,
      onSearchFooterClick: Ve,
      onSubmit: De,
      onKeydown: Ke,
      MenuFooterValue: be,
      articleIcon: Xt
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
const la = ["id", "action"], aa = { class: "cdx-typeahead-search__menu-message__text" }, sa = { class: "cdx-typeahead-search__menu-message__text" }, ia = ["href", "onClickCapture"], da = { class: "cdx-menu-item__text cdx-typeahead-search__search-footer__text" }, ua = { class: "cdx-typeahead-search__search-footer__query" };
function ra(e, t, n, s, l, d) {
  const a = S("cdx-icon"), i = S("cdx-menu"), o = S("cdx-search-input");
  return u(), h("div", {
    class: E(["cdx-typeahead-search", e.rootClasses]),
    style: se(e.rootStyle)
  }, [
    v("form", {
      id: e.id,
      ref: "form",
      class: "cdx-typeahead-search__form",
      action: e.formAction,
      onSubmit: t[4] || (t[4] = (...r) => e.onSubmit && e.onSubmit(...r))
    }, [
      z(o, G({
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
        default: B(() => [
          z(i, G({
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
            pending: B(() => [
              v("div", {
                class: E(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                v("span", aa, [
                  $(e.$slots, "search-results-pending")
                ])
              ], 2)
            ]),
            "no-results": B(() => [
              v("div", {
                class: E(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                v("span", sa, [
                  $(e.$slots, "search-no-results-text")
                ])
              ], 2)
            ]),
            default: B(({ menuItem: r, active: p }) => [
              r.value === e.MenuFooterValue ? (u(), h("a", {
                key: 0,
                class: E(["cdx-menu-item__content cdx-typeahead-search__search-footer", {
                  "cdx-typeahead-search__search-footer__active": p
                }]),
                href: e.asSearchResult(r).url,
                onClickCapture: oe((g) => e.onSearchFooterClick(e.asSearchResult(r)), ["stop"])
              }, [
                z(a, {
                  class: "cdx-menu-item__thumbnail cdx-typeahead-search__search-footer__icon",
                  icon: e.articleIcon
                }, null, 8, ["icon"]),
                v("span", da, [
                  $(e.$slots, "search-footer-text", { searchQuery: e.searchQuery }, () => [
                    v("strong", ua, q(e.searchQuery), 1)
                  ])
                ])
              ], 42, ia)) : y("", !0)
            ]),
            _: 3
          }, 16, ["id", "expanded", "show-pending", "selected", "menu-items", "footer", "search-query", "show-no-results-slot", "aria-label", "onUpdate:selected", "onMenuItemKeyboardNavigation"])
        ]),
        _: 3
      }, 16, ["modelValue", "button-label", "aria-controls", "aria-expanded", "aria-activedescendant", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
      $(e.$slots, "default")
    ], 40, la)
  ], 6);
}
const Ma = /* @__PURE__ */ R(oa, [["render", ra]]);
export {
  fa as CdxAccordion,
  he as CdxButton,
  ma as CdxButtonGroup,
  ha as CdxCard,
  va as CdxCheckbox,
  ya as CdxCombobox,
  $a as CdxDialog,
  _a as CdxField,
  X as CdxIcon,
  ba as CdxInfoChip,
  Me as CdxLabel,
  Ia as CdxLookup,
  Te as CdxMenu,
  Mo as CdxMenuItem,
  ul as CdxMessage,
  Ko as CdxProgressBar,
  Ca as CdxRadio,
  Sl as CdxSearchInput,
  $o as CdxSearchResultTitle,
  ka as CdxSelect,
  Vl as CdxTab,
  Sa as CdxTabs,
  wa as CdxTextArea,
  Qe as CdxTextInput,
  St as CdxThumbnail,
  Gl as CdxToggleButton,
  xa as CdxToggleButtonGroup,
  Ba as CdxToggleSwitch,
  Ma as CdxTypeaheadSearch,
  ga as stringHelpers,
  mt as useComputedDirection,
  wt as useComputedDisabled,
  dn as useComputedLanguage,
  de as useFieldData,
  U as useGeneratedId,
  ze as useIntersectionObserver,
  re as useModelWrapper,
  Ae as useResizeObserver,
  Ue as useSlotContents,
  ue as useSplitAttributes,
  Pe as useWarnOnce
};
