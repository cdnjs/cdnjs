var Mt = Object.defineProperty, Tt = Object.defineProperties;
var Vt = Object.getOwnPropertyDescriptors;
var we = Object.getOwnPropertySymbols;
var nt = Object.prototype.hasOwnProperty, ot = Object.prototype.propertyIsEnumerable;
var tt = (e, t, n) => t in e ? Mt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, lt = (e, t) => {
  for (var n in t || (t = {}))
    nt.call(t, n) && tt(e, n, t[n]);
  if (we)
    for (var n of we(t))
      ot.call(t, n) && tt(e, n, t[n]);
  return e;
}, at = (e, t) => Tt(e, Vt(t));
var be = (e, t) => {
  var n = {};
  for (var d in e)
    nt.call(e, d) && t.indexOf(d) < 0 && (n[d] = e[d]);
  if (e != null && we)
    for (var d of we(e))
      t.indexOf(d) < 0 && ot.call(e, d) && (n[d] = e[d]);
  return n;
};
var Fe = (e, t, n) => new Promise((d, s) => {
  var i = (l) => {
    try {
      o(n.next(l));
    } catch (r) {
      s(r);
    }
  }, a = (l) => {
    try {
      o(n.throw(l));
    } catch (r) {
      s(r);
    }
  }, o = (l) => l.done ? d(l.value) : Promise.resolve(l.value).then(i, a);
  o((n = n.apply(e, t)).next());
});
import { ref as f, onMounted as fe, defineComponent as z, computed as c, openBlock as u, createElementBlock as m, normalizeClass as R, toDisplayString as H, createCommentVNode as _, Comment as Lt, warn as ze, watch as te, withKeys as de, renderSlot as w, getCurrentInstance as Dt, resolveComponent as S, createBlock as L, resolveDynamicComponent as Se, withCtx as M, createVNode as N, createElementVNode as g, withDirectives as ae, vShow as Ie, Fragment as ge, renderList as ke, createTextVNode as se, Transition as He, normalizeStyle as ie, inject as pe, toRef as O, mergeProps as J, vModelCheckbox as pt, createSlots as xe, withModifiers as le, vModelDynamic as qe, onUnmounted as Ae, nextTick as Ce, useCssVars as Pe, Teleport as Kt, toRefs as Et, provide as _e, vModelRadio as Ft, vModelText as Rt } from "vue";
const Ot = '<path d="M11.53 2.3A1.85 1.85 0 0010 1.21 1.85 1.85 0 008.48 2.3L.36 16.36C-.48 17.81.21 19 1.88 19h16.24c1.67 0 2.36-1.19 1.52-2.64zM11 16H9v-2h2zm0-4H9V6h2z"/>', zt = '<path d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"/><circle cx="10" cy="10" r="3"/>', qt = '<path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"/>', Nt = '<path d="m4.34 2.93 12.73 12.73-1.41 1.41L2.93 4.35z"/><path d="M17.07 4.34 4.34 17.07l-1.41-1.41L15.66 2.93z"/>', Ht = '<path d="M13.728 1H6.272L1 6.272v7.456L6.272 19h7.456L19 13.728V6.272zM11 15H9v-2h2zm0-4H9V5h2z"/>', Pt = '<path d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"/>', jt = '<path d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"/><path d="M19 5H1V3h18zm0 12H1v-2h18z"/>', Ut = '<path d="M8 19a1 1 0 001 1h2a1 1 0 001-1v-1H8zm9-12a7 7 0 10-12 4.9S7 14 7 15v1a1 1 0 001 1h4a1 1 0 001-1v-1c0-1 2-3.1 2-3.1A7 7 0 0017 7z"/>', Wt = '<path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM9 5h2v2H9zm0 4h2v6H9z"/>', Qt = '<path d="M7 1 5.6 2.5 13 10l-7.4 7.5L7 19l9-9z"/>', Gt = '<path d="m4 10 9 9 1.4-1.5L7 10l7.4-7.5L13 1z"/>', Zt = '<path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"/>', Jt = '<path d="M10 20a10 10 0 010-20 10 10 0 110 20Zm-2-5 9-8.5L15.5 5 8 12 4.5 8.5 3 10l5 5Z"/>', ft = Ot, Yt = zt, Xt = qt, je = Nt, ht = Ht, Ue = Pt, en = jt, tn = {
  langCodeMap: {
    ar: Ut
  },
  default: Wt
}, nn = {
  ltr: Qt,
  shouldFlip: !0
}, on = {
  ltr: Gt,
  shouldFlip: !0
}, ln = Zt, mt = Jt;
function an(e, t, n) {
  if (typeof e == "string" || "path" in e)
    return e;
  if ("shouldFlip" in e)
    return e.ltr;
  if ("rtl" in e)
    return n === "rtl" ? e.rtl : e.ltr;
  const d = t in e.langCodeMap ? e.langCodeMap[t] : e.default;
  return typeof d == "string" || "path" in d ? d : d.ltr;
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
function We(e) {
  const t = f(null);
  return fe(() => {
    const n = window.getComputedStyle(e.value).direction;
    t.value = n === "ltr" || n === "rtl" ? n : null;
  }), t;
}
function dn(e) {
  const t = f("");
  return fe(() => {
    let n = e.value;
    for (; n && n.lang === ""; )
      n = n.parentElement;
    t.value = n ? n.lang : null;
  }), t;
}
function ne(e) {
  return (t) => typeof t == "string" && e.indexOf(t) !== -1;
}
const Re = "cdx", un = [
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
], vt = ne(fn), hn = [
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
], mn = 120, vn = 500, $e = "cdx-menu-footer-item", bt = Symbol("CdxTabs"), gt = Symbol("CdxActiveTab"), yt = Symbol("CdxFieldInputId"), Be = Symbol("CdxFieldDescriptionId"), $t = Symbol("CdxFieldStatus"), _t = Symbol("CdxDisabled"), bn = ne(pn), gn = z({
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
    const t = f(), n = We(t), d = dn(t), s = c(() => e.dir || n.value), i = c(() => e.lang || d.value), a = c(() => ({
      "cdx-icon--flipped": s.value === "rtl" && i.value !== null && sn(e.icon, i.value),
      [`cdx-icon--${e.size}`]: !0
    })), o = c(
      () => an(e.icon, i.value || "", s.value || "ltr")
    ), l = c(() => typeof o.value == "string" ? o.value : ""), r = c(() => typeof o.value != "string" ? o.value.path : "");
    return {
      rootElement: t,
      rootClasses: a,
      iconSvg: l,
      iconPath: r
    };
  }
});
const q = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [d, s] of t)
    n[d] = s;
  return n;
}, yn = ["aria-hidden"], $n = { key: 0 }, _n = ["innerHTML"], Cn = ["d"];
function In(e, t, n, d, s, i) {
  return u(), m("span", {
    ref: "rootElement",
    class: R(["cdx-icon", e.rootClasses])
  }, [
    (u(), m("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      "aria-hidden": e.iconLabel ? void 0 : !0
    }, [
      e.iconLabel ? (u(), m("title", $n, H(e.iconLabel), 1)) : _("", !0),
      e.iconSvg ? (u(), m("g", {
        key: 1,
        innerHTML: e.iconSvg
      }, null, 8, _n)) : (u(), m("path", {
        key: 2,
        d: e.iconPath
      }, null, 8, Cn))
    ], 8, yn))
  ], 2);
}
const ee = /* @__PURE__ */ q(gn, [["render", In]]);
function Ct(e) {
  const t = [];
  for (const n of e)
    // HTML tag
    typeof n.type == "string" || // Component
    typeof n.type == "object" ? t.push(n) : n.type !== Lt && (typeof n.children == "string" && n.children.trim() !== "" ? t.push(n.children) : Array.isArray(n.children) && t.push(...Ct(n.children)));
  return t;
}
function It(e, t) {
  return typeof e.type == "object" && "name" in e.type ? t !== void 0 ? e.type.name === t : !0 : !1;
}
function kn(e, t) {
  return typeof e.type == "string" ? t !== void 0 ? e.type === t.toLowerCase() : !0 : !1;
}
function Qe(e) {
  const t = typeof e == "function" ? e() : e;
  return t ? Ct(t) : [];
}
function Ge(e, t) {
  if (e()) {
    ze(t);
    return;
  }
  const n = te(e, (d) => {
    d && (ze(t), n());
  });
}
function kt(e, t, n) {
  const d = c(() => {
    const s = Qe(e);
    if (s.length !== 1)
      return !1;
    const i = s[0];
    return !!(typeof i == "object" && (It(i, "CdxIcon") || kn(i, "svg")));
  });
  return Ge(
    () => d.value && !t["aria-label"] && !t["aria-hidden"],
    `${n}: Icon-only buttons require one of the following attributes: aria-label or aria-hidden. See documentation at https://doc.wikimedia.org/codex/latest/components/demos/button.html#icon-only-button`
  ), d;
}
const wn = ne(un), Sn = ne(rn), xn = ne(cn), An = z({
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
      validator: wn
    },
    /**
     * Visual prominence of the button.
     *
     * @values 'normal', 'primary', 'quiet'
     */
    weight: {
      type: String,
      default: "normal",
      validator: Sn
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
  setup(e, { emit: t, slots: n, attrs: d }) {
    const s = kt(n.default, d, "CdxButton"), i = f(!1);
    return {
      rootClasses: c(() => ({
        [`cdx-button--action-${e.action}`]: !0,
        [`cdx-button--weight-${e.weight}`]: !0,
        [`cdx-button--size-${e.size}`]: !0,
        "cdx-button--framed": e.weight !== "quiet",
        "cdx-button--icon-only": s.value,
        "cdx-button--is-active": i.value
      })),
      onClick: (r) => {
        t("click", r);
      },
      setActive: (r) => {
        i.value = r;
      }
    };
  }
});
function Bn(e, t, n, d, s, i) {
  return u(), m("button", {
    class: R(["cdx-button", e.rootClasses]),
    onClick: t[0] || (t[0] = (...a) => e.onClick && e.onClick(...a)),
    onKeydown: t[1] || (t[1] = de((a) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = de((a) => e.setActive(!1), ["space", "enter"]))
  }, [
    w(e.$slots, "default")
  ], 34);
}
const me = /* @__PURE__ */ q(An, [["render", Bn]]);
let Oe = 0;
function Z(e) {
  const t = Dt(), n = (t == null ? void 0 : t.props.id) || (t == null ? void 0 : t.attrs.id);
  return e ? `${Re}-${e}-${Oe++}` : n ? `${Re}-${n}-${Oe++}` : `${Re}-${Oe++}`;
}
const Mn = z({
  name: "CdxAccordion",
  components: { CdxButton: me, CdxIcon: ee },
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
    const n = f(!1), d = Z("accordion"), s = Z("accordion-panel"), i = () => {
      n.value = !n.value;
    }, a = () => {
      t("action-button-click");
    }, o = c(() => e.actionIcon && (n.value || e.actionAlwaysVisible)), l = c(() => ({
      "cdx-accordion--has-icon": o
    }));
    return {
      cdxIconExpand: Ue,
      emitActionButtonClick: a,
      isExpanded: n,
      rootClasses: l,
      shouldShowActionButton: o,
      toggle: i,
      accordionId: d,
      accordionPanelId: s
    };
  }
});
const Tn = { class: "cdx-accordion__toggle__title" }, Vn = { class: "cdx-accordion__toggle__title-text" }, Ln = { class: "cdx-accordion__toggle__description" }, Dn = ["id", "aria-labelledby", "aria-hidden"];
function Kn(e, t, n, d, s, i) {
  const a = S("cdx-icon"), o = S("cdx-button");
  return u(), m("div", {
    class: R(["cdx-accordion", e.rootClasses])
  }, [
    (u(), L(Se(e.headingLevel), { class: "cdx-accordion__header" }, {
      default: M(() => [
        N(o, {
          id: e.accordionId,
          "aria-expanded": e.isExpanded,
          "aria-controls": e.accordionPanelId,
          class: "cdx-accordion__toggle",
          type: "button",
          weight: "quiet",
          onClick: e.toggle
        }, {
          default: M(() => [
            g("span", Tn, [
              N(a, {
                class: "cdx-accordion__toggle__title-icon",
                icon: e.cdxIconExpand,
                size: "small"
              }, null, 8, ["icon"]),
              g("span", Vn, [
                w(e.$slots, "title")
              ])
            ]),
            g("span", Ln, [
              w(e.$slots, "description")
            ])
          ]),
          _: 3
        }, 8, ["id", "aria-expanded", "aria-controls", "onClick"]),
        e.shouldShowActionButton ? (u(), L(o, {
          key: 0,
          class: "cdx-accordion__action",
          "aria-label": e.actionButtonLabel,
          type: "button",
          weight: "quiet",
          onClick: e.emitActionButtonClick
        }, {
          default: M(() => [
            N(a, {
              icon: e.actionIcon,
              "icon-label": e.actionButtonLabel,
              size: "medium"
            }, null, 8, ["icon", "icon-label"])
          ]),
          _: 1
        }, 8, ["aria-label", "onClick"])) : _("", !0)
      ]),
      _: 3
    })),
    ae(g("div", {
      id: e.accordionPanelId,
      "aria-labelledby": e.accordionId,
      "aria-hidden": e.isExpanded ? void 0 : !0,
      class: "cdx-accordion__content",
      role: "region"
    }, [
      w(e.$slots, "default")
    ], 8, Dn), [
      [Ie, e.isExpanded]
    ])
  ], 2);
}
const Sa = /* @__PURE__ */ q(Mn, [["render", Kn]]);
function wt(e) {
  return e.label === void 0 ? e.value : e.label === null ? "" : e.label;
}
const En = z({
  name: "CdxButtonGroup",
  components: {
    CdxButton: me,
    CdxIcon: ee
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
      getButtonLabel: wt
    };
  }
});
const Fn = { class: "cdx-button-group" };
function Rn(e, t, n, d, s, i) {
  const a = S("cdx-icon"), o = S("cdx-button");
  return u(), m("div", Fn, [
    (u(!0), m(ge, null, ke(e.buttons, (l) => (u(), L(o, {
      key: l.value,
      disabled: l.disabled || e.disabled,
      "aria-label": l.ariaLabel,
      onClick: (r) => e.$emit("click", l.value)
    }, {
      default: M(() => [
        w(e.$slots, "default", { button: l }, () => [
          l.icon ? (u(), L(a, {
            key: 0,
            icon: l.icon
          }, null, 8, ["icon"])) : _("", !0),
          se(" " + H(e.getButtonLabel(l)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["disabled", "aria-label", "onClick"]))), 128))
  ]);
}
const xa = /* @__PURE__ */ q(En, [["render", Rn]]), On = z({
  name: "CdxThumbnail",
  components: { CdxIcon: ee },
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
    const t = f(!1), n = f({}), d = (s) => {
      const i = s.replace(/([\\"\n])/g, "\\$1"), a = new Image();
      a.onload = () => {
        n.value = { backgroundImage: `url("${i}")` }, t.value = !0;
      }, a.onerror = () => {
        t.value = !1;
      }, a.src = i;
    };
    return fe(() => {
      var s;
      (s = e.thumbnail) != null && s.url && d(e.thumbnail.url);
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
function Nn(e, t, n, d, s, i) {
  const a = S("cdx-icon");
  return u(), m("span", zn, [
    e.thumbnailLoaded ? _("", !0) : (u(), m("span", qn, [
      N(a, {
        icon: e.placeholderIcon,
        class: "cdx-thumbnail__placeholder__icon--vue"
      }, null, 8, ["icon"])
    ])),
    N(He, { name: "cdx-thumbnail__image" }, {
      default: M(() => [
        e.thumbnailLoaded ? (u(), m("span", {
          key: 0,
          style: ie(e.thumbnailStyle),
          class: "cdx-thumbnail__image"
        }, null, 4)) : _("", !0)
      ]),
      _: 1
    })
  ]);
}
const St = /* @__PURE__ */ q(On, [["render", Nn]]), Hn = z({
  name: "CdxCard",
  components: { CdxIcon: ee, CdxThumbnail: St },
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
    const t = c(() => !!e.url), n = c(() => t.value ? "a" : "span"), d = c(() => t.value ? e.url : void 0);
    return {
      isLink: t,
      contentTag: n,
      cardLink: d
    };
  }
});
const Pn = { class: "cdx-card__text" }, jn = { class: "cdx-card__text__title" }, Un = {
  key: 0,
  class: "cdx-card__text__description"
}, Wn = {
  key: 1,
  class: "cdx-card__text__supporting-text"
};
function Qn(e, t, n, d, s, i) {
  const a = S("cdx-thumbnail"), o = S("cdx-icon");
  return u(), L(Se(e.contentTag), {
    href: e.cardLink,
    class: R(["cdx-card", {
      "cdx-card--is-link": e.isLink,
      // Include dynamic classes in the template so that $slots is reactive.
      "cdx-card--title-only": !e.$slots.description && !e.$slots["supporting-text"]
    }])
  }, {
    default: M(() => [
      e.thumbnail || e.forceThumbnail ? (u(), L(a, {
        key: 0,
        thumbnail: e.thumbnail,
        "placeholder-icon": e.customPlaceholderIcon,
        class: "cdx-card__thumbnail"
      }, null, 8, ["thumbnail", "placeholder-icon"])) : e.icon ? (u(), L(o, {
        key: 1,
        icon: e.icon,
        class: "cdx-card__icon"
      }, null, 8, ["icon"])) : _("", !0),
      g("span", Pn, [
        g("span", jn, [
          w(e.$slots, "title")
        ]),
        e.$slots.description ? (u(), m("span", Un, [
          w(e.$slots, "description")
        ])) : _("", !0),
        e.$slots["supporting-text"] ? (u(), m("span", Wn, [
          w(e.$slots, "supporting-text")
        ])) : _("", !0)
      ])
    ]),
    _: 3
  }, 8, ["href", "class"]);
}
const Aa = /* @__PURE__ */ q(Hn, [["render", Qn]]);
function xt(e) {
  const t = pe(_t, f(!1));
  return c(() => t.value || e.value);
}
function ue(e, t, n) {
  const d = xt(e), s = pe($t, f("default")), i = c(() => t != null && t.value && t.value !== "default" ? t.value : s.value), a = pe(yt, void 0), o = c(
    () => a && a.value ? a.value : n
  );
  return {
    computedDisabled: d,
    computedStatus: i,
    computedInputId: o
  };
}
function re(e, t = c(() => ({}))) {
  const n = c(() => {
    const i = be(t.value, []);
    return e.class && e.class.split(" ").forEach((o) => {
      i[o] = !0;
    }), i;
  }), d = c(() => {
    if ("style" in e)
      return e.style;
  }), s = c(() => {
    const l = e, { class: i, style: a } = l;
    return be(l, ["class", "style"]);
  });
  return {
    rootClasses: n,
    rootStyle: d,
    otherAttrs: s
  };
}
const Gn = z({
  name: "CdxLabel",
  components: { CdxIcon: ee },
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
    const { computedDisabled: n } = ue(O(e, "disabled")), d = c(() => ({
      "cdx-label--visually-hidden": e.visuallyHidden,
      "cdx-label--disabled": n.value
    })), {
      rootClasses: s,
      rootStyle: i,
      otherAttrs: a
    } = re(t, d);
    return {
      rootClasses: s,
      rootStyle: i,
      otherAttrs: a
    };
  }
});
const Zn = ["for"], Jn = { class: "cdx-label__label__text" }, Yn = {
  key: 1,
  class: "cdx-label__label__optional-flag"
}, Xn = ["id"], eo = { class: "cdx-label__label" }, to = { class: "cdx-label__label__text" }, no = {
  key: 1,
  class: "cdx-label__label__optional-flag"
}, oo = {
  key: 0,
  class: "cdx-label__description"
};
function lo(e, t, n, d, s, i) {
  const a = S("cdx-icon");
  return e.isLegend ? (u(), m("legend", J({
    key: 1,
    class: ["cdx-label", e.rootClasses],
    style: e.rootStyle
  }, e.otherAttrs), [
    g("span", eo, [
      e.icon ? (u(), L(a, {
        key: 0,
        icon: e.icon,
        class: "cdx-label__label__icon"
      }, null, 8, ["icon"])) : _("", !0),
      g("span", to, [
        w(e.$slots, "default")
      ]),
      e.optionalFlag ? (u(), m("span", no, H(" ") + " " + H(e.optionalFlag), 1)) : _("", !0)
    ]),
    e.$slots.description && e.$slots.description().length > 0 ? (u(), m("span", oo, [
      w(e.$slots, "description")
    ])) : _("", !0)
  ], 16)) : (u(), m("div", {
    key: 0,
    class: R(["cdx-label", e.rootClasses]),
    style: ie(e.rootStyle)
  }, [
    g("label", J({
      class: "cdx-label__label",
      for: e.inputId ? e.inputId : void 0
    }, e.otherAttrs), [
      e.icon ? (u(), L(a, {
        key: 0,
        icon: e.icon,
        class: "cdx-label__label__icon"
      }, null, 8, ["icon"])) : _("", !0),
      g("span", Jn, [
        w(e.$slots, "default")
      ]),
      e.optionalFlag ? (u(), m("span", Yn, H(" ") + " " + H(e.optionalFlag), 1)) : _("", !0)
    ], 16, Zn),
    e.$slots.description && e.$slots.description().length > 0 ? (u(), m("span", {
      key: 0,
      id: e.descriptionId || void 0,
      class: "cdx-label__description"
    }, [
      w(e.$slots, "description")
    ], 8, Xn)) : _("", !0)
  ], 6));
}
const Me = /* @__PURE__ */ q(Gn, [["render", lo]]);
function Ze(e, t, n) {
  Ge(
    () => Qe(e).length === 0 && !(t != null && t["aria-label"]) && !(t != null && t["aria-labelledby"]),
    `${n}: Inputs must have an associated label. Provide one of the following:
 - A label via the appropriate slot
 - An \`aria-label\` attribute set to the label text
 - An \`aria-labelledby\` attribute set to the ID of the label element`
  );
}
function ce(e, t, n) {
  return c({
    get: () => e.value,
    set: (d) => (
      // If eventName is undefined, then 'update:modelValue' must be a valid EventName,
      // but TypeScript's type analysis isn't clever enough to realize that
      t(n || "update:modelValue", d)
    )
  });
}
const ao = ne(he), so = z({
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
    },
    /**
     * `status` attribute of the checkbox.
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: ao
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
  setup(e, { emit: t, slots: n, attrs: d }) {
    var y;
    Ze((y = n.default) == null ? void 0 : y.call(n), d, "CdxCheckbox");
    const {
      computedDisabled: s,
      computedStatus: i
    } = ue(
      O(e, "disabled"),
      O(e, "status")
    ), a = c(() => ({
      "cdx-checkbox--inline": e.inline,
      [`cdx-checkbox--status-${i.value}`]: !0
    })), o = f(), l = Z("checkbox"), r = Z("description"), p = ce(O(e, "modelValue"), t);
    return {
      rootClasses: a,
      computedDisabled: s,
      input: o,
      checkboxId: l,
      descriptionId: r,
      wrappedModel: p
    };
  }
});
const io = ["id", "aria-describedby", "value", "disabled", ".indeterminate"], uo = /* @__PURE__ */ g("span", { class: "cdx-checkbox__icon" }, null, -1);
function ro(e, t, n, d, s, i) {
  const a = S("cdx-label");
  return u(), m("span", {
    class: R(["cdx-checkbox", e.rootClasses])
  }, [
    ae(g("input", {
      id: e.checkboxId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (o) => e.wrappedModel = o),
      class: "cdx-checkbox__input",
      type: "checkbox",
      "aria-describedby": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      value: e.inputValue,
      disabled: e.computedDisabled,
      ".indeterminate": e.indeterminate
    }, null, 8, io), [
      [pt, e.wrappedModel]
    ]),
    uo,
    e.$slots.default && e.$slots.default().length ? (u(), L(a, {
      key: 0,
      class: "cdx-checkbox__label",
      "input-id": e.checkboxId,
      "description-id": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      disabled: e.computedDisabled
    }, xe({
      default: M(() => [
        w(e.$slots, "default")
      ]),
      _: 2
    }, [
      e.$slots.description && e.$slots.description().length > 0 ? {
        name: "description",
        fn: M(() => [
          w(e.$slots, "description")
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["input-id", "description-id", "disabled"])) : _("", !0)
  ], 2);
}
const Ba = /* @__PURE__ */ q(so, [["render", ro]]), co = z({
  name: "CdxInputChip",
  components: {
    CdxButton: me,
    CdxIcon: ee
  },
  props: {
    /**
     * `aria-description` for the chip.
     *
     * Text must be provided for accessibility purposes. This prop is temporary and will be
     * removed once T345386 is resolved.
     */
    chipAriaDescription: {
      type: String,
      required: !0
    },
    /**
     * Custom icon.
     */
    icon: {
      type: [String, Object],
      default: null
    },
    /**
     * Whether the input chip can be removed.
     */
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  expose: [
    "focus"
  ],
  emits: [
    /**
     * Emitted when a chip is removed by the user.
     *
     * @property {'button'|'Backspace'|'Delete'} method How the chip was removed
     */
    "remove-chip",
    /**
     * Emitted when a chip is clicked by the user.
     */
    "click-chip",
    /**
     * Emitted when the user presses the left arrow key.
     */
    "arrow-left",
    /**
     * Emitted when the user presses the right arrow key.
     */
    "arrow-right"
  ],
  setup(e, { emit: t }) {
    const n = f(), d = c(() => ({
      "cdx-input-chip--disabled": e.disabled
    }));
    function s(i) {
      var a;
      switch (i.key) {
        case "Enter":
          t("click-chip"), i.preventDefault(), i.stopPropagation();
          break;
        case "Escape":
          (a = n.value) == null || a.blur(), i.preventDefault(), i.stopPropagation();
          break;
        case "Backspace":
        case "Delete":
          t("remove-chip", i.key), i.preventDefault(), i.stopPropagation();
          break;
        case "ArrowLeft":
          t("arrow-left"), i.preventDefault(), i.stopPropagation();
          break;
        case "ArrowRight":
          t("arrow-right"), i.preventDefault(), i.stopPropagation();
          break;
      }
    }
    return {
      rootElement: n,
      rootClasses: d,
      onKeydown: s,
      cdxIconClose: je
    };
  },
  methods: {
    /**
     * Focus the chip.
     *
     * @public
     */
    focus() {
      this.$refs.rootElement.focus();
    }
  }
});
const po = ["aria-description"], fo = { class: "cdx-input-chip__text" };
function ho(e, t, n, d, s, i) {
  const a = S("cdx-icon"), o = S("cdx-button");
  return u(), m("div", {
    ref: "rootElement",
    class: R(["cdx-input-chip", e.rootClasses]),
    tabindex: "0",
    role: "option",
    "aria-description": e.chipAriaDescription,
    onKeydown: t[1] || (t[1] = (...l) => e.onKeydown && e.onKeydown(...l)),
    onClick: t[2] || (t[2] = (l) => e.$emit("click-chip"))
  }, [
    e.icon ? (u(), L(a, {
      key: 0,
      icon: e.icon,
      size: "small"
    }, null, 8, ["icon"])) : _("", !0),
    g("span", fo, [
      w(e.$slots, "default")
    ]),
    N(o, {
      class: "cdx-input-chip__button",
      weight: "quiet",
      tabindex: "-1",
      "aria-hidden": "true",
      disabled: e.disabled,
      onClick: t[0] || (t[0] = le((l) => e.$emit("remove-chip", "button"), ["stop"]))
    }, {
      default: M(() => [
        N(a, {
          icon: e.cdxIconClose,
          size: "x-small"
        }, null, 8, ["icon"])
      ]),
      _: 1
    }, 8, ["disabled"])
  ], 42, po);
}
const mo = /* @__PURE__ */ q(co, [["render", ho]]), vo = ne(he), bo = z({
  name: "CdxChipInput",
  components: {
    CdxInputChip: mo
  },
  /**
   * We want the input to inherit attributes, not the root element.
   */
  inheritAttrs: !1,
  props: {
    /**
     * `aria-description` of each input chip.
     *
     * Text must be provided for accessibility purposes. This prop is temporary and will be
     * removed once T345386 is resolved.
     */
    chipAriaDescription: {
      type: String,
      required: !0
    },
    /**
     * Current chips present in the input.
     *
     * Provided by `v-model` binding in the parent component.
     */
    inputChips: {
      type: Array,
      required: !0
    },
    /**
     * Whether the text input should appear below the set of input chips.
     *
     * By default, the input chips are inline with the input.
     */
    separateInput: {
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
      validator: vo
    },
    /**
     * Whether the input is disabled.
     */
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    /**
     * When the input chips change.
     *
     * @property {ChipInputItem[]} inputChips The new set of inputChips
     */
    "update:input-chips"
  ],
  setup(e, { emit: t, attrs: n }) {
    const d = f(), s = We(d), i = f(), a = f(""), o = f("default"), l = c(() => o.value === "error" || e.status === "error" ? "error" : "default"), { computedDisabled: r, computedStatus: p } = ue(O(e, "disabled"), l), y = f(!1), x = c(() => ({
      "cdx-chip-input--has-separate-input": e.separateInput,
      [`cdx-chip-input--status-${p.value}`]: !0,
      // We need focused and disabled classes on the root element, which contains the
      // chips and the input, since it is styled to look like the input.
      "cdx-chip-input--focused": y.value,
      "cdx-chip-input--disabled": r.value
    })), {
      rootClasses: $,
      rootStyle: E,
      otherAttrs: T
    } = re(n, x), V = [];
    function Q(v, b) {
      v !== null && (V[b] = v);
    }
    const j = () => {
      i.value.focus();
    };
    function W() {
      e.inputChips.find((v) => v.value === a.value) ? o.value = "error" : a.value.length > 0 && (t("update:input-chips", e.inputChips.concat({ value: a.value })), a.value = "");
    }
    function Y(v) {
      t("update:input-chips", e.inputChips.filter(
        (b) => b.value !== v.value
      ));
    }
    function G(v, b) {
      const D = (
        // -1 for prev (left in LTR, right in RTL), +1 for next (right in LTR, left in RTL)
        s.value === "ltr" && v === "left" || s.value === "rtl" && v === "right" ? -1 : 1
      ), U = b + D;
      if (!(U < 0)) {
        if (U >= e.inputChips.length) {
          j();
          return;
        }
        V[U].focus();
      }
    }
    function F(v) {
      Y(v), a.value = v.value, j();
    }
    function k(v, b, D) {
      if (D === "button")
        j();
      else if (D === "Backspace") {
        const U = b === 0 ? 1 : b - 1;
        U < e.inputChips.length ? V[U].focus() : j();
      } else if (D === "Delete") {
        const U = b + 1;
        U < e.inputChips.length ? V[U].focus() : j();
      }
      Y(v);
    }
    function A(v) {
      var D, U;
      const b = s.value === "rtl" ? "ArrowRight" : "ArrowLeft";
      switch (v.key) {
        case "Enter":
          if (a.value.length > 0) {
            W(), v.preventDefault(), v.stopPropagation();
            return;
          }
          break;
        case "Escape":
          (D = i.value) == null || D.blur(), v.preventDefault(), v.stopPropagation();
          return;
        case "Backspace":
        case b:
          if (((U = i.value) == null ? void 0 : U.selectionStart) === 0 && i.value.selectionEnd === 0 && e.inputChips.length > 0) {
            V[e.inputChips.length - 1].focus(), v.preventDefault(), v.stopPropagation();
            return;
          }
          break;
      }
    }
    function C() {
      y.value = !0;
    }
    function I() {
      y.value = !1, W();
    }
    return te(O(e, "inputChips"), (v) => {
      const b = v.find((D) => D.value === a.value);
      o.value = b ? "error" : "default";
    }), te(a, () => {
      o.value === "error" && (o.value = "default");
    }), {
      rootElement: d,
      input: i,
      inputValue: a,
      rootClasses: $,
      rootStyle: E,
      otherAttrs: T,
      assignChipTemplateRef: Q,
      handleChipClick: F,
      handleChipRemove: k,
      moveChipFocus: G,
      onInputKeydown: A,
      focusInput: j,
      onFocus: C,
      onBlur: I,
      computedDisabled: r
    };
  }
});
const go = {
  class: "cdx-chip-input__chips",
  role: "listbox",
  "aria-orientation": "horizontal"
}, yo = ["disabled"], $o = {
  key: 0,
  class: "cdx-chip-input__separate-input"
}, _o = ["disabled"];
function Co(e, t, n, d, s, i) {
  const a = S("cdx-input-chip");
  return u(), m("div", {
    ref: "rootElement",
    class: R(["cdx-chip-input", e.rootClasses]),
    style: ie(e.rootStyle),
    onClick: t[8] || (t[8] = (...o) => e.focusInput && e.focusInput(...o))
  }, [
    g("div", go, [
      (u(!0), m(ge, null, ke(e.inputChips, (o, l) => (u(), L(a, {
        key: o.value,
        ref_for: !0,
        ref: (r) => e.assignChipTemplateRef(r, l),
        class: "cdx-chip-input__item",
        "chip-aria-description": e.chipAriaDescription,
        icon: o.icon,
        disabled: e.computedDisabled,
        onClickChip: (r) => e.handleChipClick(o),
        onRemoveChip: (r) => e.handleChipRemove(o, l, r),
        onArrowLeft: (r) => e.moveChipFocus("left", l),
        onArrowRight: (r) => e.moveChipFocus("right", l)
      }, {
        default: M(() => [
          se(H(o.value), 1)
        ]),
        _: 2
      }, 1032, ["chip-aria-description", "icon", "disabled", "onClickChip", "onRemoveChip", "onArrowLeft", "onArrowRight"]))), 128)),
      e.separateInput ? _("", !0) : ae((u(), m("input", J({
        key: 0,
        ref: "input",
        "onUpdate:modelValue": t[0] || (t[0] = (o) => e.inputValue = o),
        class: "cdx-chip-input__input",
        disabled: e.computedDisabled
      }, e.otherAttrs, {
        onBlur: t[1] || (t[1] = (...o) => e.onBlur && e.onBlur(...o)),
        onFocus: t[2] || (t[2] = (...o) => e.onFocus && e.onFocus(...o)),
        onKeydown: t[3] || (t[3] = (...o) => e.onInputKeydown && e.onInputKeydown(...o))
      }), null, 16, yo)), [
        [qe, e.inputValue]
      ])
    ]),
    e.separateInput ? (u(), m("div", $o, [
      ae(g("input", J({
        ref: "input",
        "onUpdate:modelValue": t[4] || (t[4] = (o) => e.inputValue = o),
        class: "cdx-chip-input__input",
        disabled: e.computedDisabled
      }, e.otherAttrs, {
        onBlur: t[5] || (t[5] = (...o) => e.onBlur && e.onBlur(...o)),
        onFocus: t[6] || (t[6] = (...o) => e.onFocus && e.onFocus(...o)),
        onKeydown: t[7] || (t[7] = (...o) => e.onInputKeydown && e.onInputKeydown(...o))
      }), null, 16, _o), [
        [qe, e.inputValue]
      ])
    ])) : _("", !0)
  ], 6);
}
const Ma = /* @__PURE__ */ q(bo, [["render", Co]]);
function At(e) {
  return e.replace(/([\\{}()|.?*+\-^$[\]])/g, "\\$1");
}
const Io = "[̀-ͯ҃-҉֑-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣঁ-ঃ়া-ৄেৈো-্ৗৢৣ৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑੰੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣஂா-ூெ-ைொ-்ௗఀ-ఄా-ౄె-ైొ-్ౕౖౢౣಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣංඃ්ා-ුූෘ-ෟෲෳัิ-ฺ็-๎ັິ-ູົຼ່-ໍ༹༘༙༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏႚ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝᠋-᠍ᢅᢆᢩᤠ-ᤫᤰ-᤻ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼᪰-᪾ᬀ-ᬄ᬴-᭄᭫-᭳ᮀ-ᮂᮡ-ᮭ᯦-᯳ᰤ-᰷᳐-᳔᳒-᳨᳭ᳲ-᳴᳷-᳹᷀-᷹᷻-᷿⃐-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯-꙲ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣠-꣱ꣿꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀ꧥꨩ-ꨶꩃꩌꩍꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭ﬞ︀-️︠-︯]";
function Bt(e, t) {
  if (!e)
    return [t, "", ""];
  const n = At(e), d = new RegExp(
    // Per https://www.regular-expressions.info/unicode.html, "any code point that is not a
    // combining mark can be followed by any number of combining marks." See also the
    // discussion in https://phabricator.wikimedia.org/T35242.
    n + Io + "*",
    "i"
  ).exec(t);
  if (!d || d.index === void 0)
    return [t, "", ""];
  const s = d.index, i = s + d[0].length, a = t.slice(s, i), o = t.slice(0, s), l = t.slice(i, t.length);
  return [o, a, l];
}
const Ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  regExpEscape: At,
  splitStringAtMatch: Bt
}, Symbol.toStringTag, { value: "Module" })), ko = z({
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
const wo = { class: "cdx-search-result-title" }, So = { class: "cdx-search-result-title__match" };
function xo(e, t, n, d, s, i) {
  return u(), m("span", wo, [
    g("bdi", null, [
      se(H(e.titleChunks[0]), 1),
      g("span", So, H(e.titleChunks[1]), 1),
      se(H(e.titleChunks[2]), 1)
    ])
  ]);
}
const Ao = /* @__PURE__ */ q(ko, [["render", xo]]), Bo = z({
  name: "CdxMenuItem",
  components: { CdxIcon: ee, CdxThumbnail: St, CdxSearchResultTitle: Ao },
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
    }, d = () => {
      t("change", "highlighted", !1);
    }, s = (p) => {
      p.button === 0 && t("change", "active", !0);
    }, i = () => {
      t("change", "selected", !0);
    }, a = c(() => e.searchQuery.length > 0), o = c(() => ({
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
    })), l = c(() => e.url ? "a" : "span"), r = c(() => e.label || String(e.value));
    return {
      onMouseMove: n,
      onMouseLeave: d,
      onMouseDown: s,
      onClick: i,
      highlightQuery: a,
      rootClasses: o,
      contentTag: l,
      title: r
    };
  }
});
const Mo = ["id", "aria-disabled", "aria-selected"], To = { class: "cdx-menu-item__text" }, Vo = ["lang"], Lo = ["lang"], Do = ["lang"], Ko = ["lang"];
function Eo(e, t, n, d, s, i) {
  const a = S("cdx-thumbnail"), o = S("cdx-icon"), l = S("cdx-search-result-title");
  return u(), m("li", {
    id: e.id,
    role: "option",
    class: R(["cdx-menu-item", e.rootClasses]),
    "aria-disabled": e.disabled,
    "aria-selected": e.selected,
    onMousemove: t[0] || (t[0] = (...r) => e.onMouseMove && e.onMouseMove(...r)),
    onMouseleave: t[1] || (t[1] = (...r) => e.onMouseLeave && e.onMouseLeave(...r)),
    onMousedown: t[2] || (t[2] = le((...r) => e.onMouseDown && e.onMouseDown(...r), ["prevent"])),
    onClick: t[3] || (t[3] = (...r) => e.onClick && e.onClick(...r))
  }, [
    w(e.$slots, "default", {}, () => [
      (u(), L(Se(e.contentTag), {
        href: e.url ? e.url : void 0,
        class: "cdx-menu-item__content"
      }, {
        default: M(() => {
          var r, p, y, x, $, E;
          return [
            e.showThumbnail ? (u(), L(a, {
              key: 0,
              thumbnail: e.thumbnail,
              class: "cdx-menu-item__thumbnail"
            }, null, 8, ["thumbnail"])) : e.icon ? (u(), L(o, {
              key: 1,
              icon: e.icon,
              class: "cdx-menu-item__icon"
            }, null, 8, ["icon"])) : _("", !0),
            g("span", To, [
              e.highlightQuery ? (u(), L(l, {
                key: 0,
                title: e.title,
                "search-query": e.searchQuery,
                lang: (r = e.language) == null ? void 0 : r.label
              }, null, 8, ["title", "search-query", "lang"])) : (u(), m("span", {
                key: 1,
                class: "cdx-menu-item__text__label",
                lang: (p = e.language) == null ? void 0 : p.label
              }, [
                g("bdi", null, H(e.title), 1)
              ], 8, Vo)),
              e.match ? (u(), m(ge, { key: 2 }, [
                se(H(" ") + " "),
                e.highlightQuery ? (u(), L(l, {
                  key: 0,
                  title: e.match,
                  "search-query": e.searchQuery,
                  lang: (y = e.language) == null ? void 0 : y.match
                }, null, 8, ["title", "search-query", "lang"])) : (u(), m("span", {
                  key: 1,
                  class: "cdx-menu-item__text__match",
                  lang: (x = e.language) == null ? void 0 : x.match
                }, [
                  g("bdi", null, H(e.match), 1)
                ], 8, Lo))
              ], 64)) : _("", !0),
              e.supportingText ? (u(), m(ge, { key: 3 }, [
                se(H(" ") + " "),
                g("span", {
                  class: "cdx-menu-item__text__supporting-text",
                  lang: ($ = e.language) == null ? void 0 : $.supportingText
                }, [
                  g("bdi", null, H(e.supportingText), 1)
                ], 8, Do)
              ], 64)) : _("", !0),
              e.description ? (u(), m("span", {
                key: 4,
                class: "cdx-menu-item__text__description",
                lang: (E = e.language) == null ? void 0 : E.description
              }, [
                g("bdi", null, H(e.description), 1)
              ], 8, Ko)) : _("", !0)
            ])
          ];
        }),
        _: 1
      }, 8, ["href"]))
    ])
  ], 42, Mo);
}
const Fo = /* @__PURE__ */ q(Bo, [["render", Eo]]), Ro = z({
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
    Ge(
      () => !e.inline && !t["aria-label"] && !t["aria-hidden"],
      "CdxProgressBar: Progress bars require one of the following attribute, aria-label or aria-hidden. See documentation on https://doc.wikimedia.org/codex/latest/components/demos/progressbar.html"
    );
    const n = c(() => ({
      "cdx-progress-bar--block": !e.inline,
      "cdx-progress-bar--inline": e.inline,
      "cdx-progress-bar--enabled": !e.disabled,
      "cdx-progress-bar--disabled": e.disabled
    })), d = c(() => e.inline ? "true" : void 0);
    return {
      rootClasses: n,
      computedAriaHidden: d
    };
  }
});
const Oo = ["aria-hidden", "aria-disabled"], zo = /* @__PURE__ */ g("div", { class: "cdx-progress-bar__bar" }, null, -1), qo = [
  zo
];
function No(e, t, n, d, s, i) {
  return u(), m("div", {
    class: R(["cdx-progress-bar", e.rootClasses]),
    role: "progressbar",
    "aria-hidden": e.computedAriaHidden,
    "aria-disabled": e.disabled
  }, qo, 10, Oo);
}
const Ho = /* @__PURE__ */ q(Ro, [["render", No]]);
function Ne(e, t) {
  const n = f(!1);
  let d = !1;
  if (typeof window != "object" || !("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype))
    return n;
  const s = new window.IntersectionObserver(
    (i) => {
      const a = i[0];
      a && (n.value = a.isIntersecting);
    },
    t
  );
  return fe(() => {
    d = !0, e.value && s.observe(e.value);
  }), Ae(() => {
    d = !1, s.disconnect();
  }), te(e, (i) => {
    d && (s.disconnect(), n.value = !1, i && s.observe(i));
  }), n;
}
const Po = z({
  name: "CdxMenu",
  components: {
    CdxMenuItem: Fo,
    CdxProgressBar: Ho
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
  setup(e, { emit: t, slots: n, attrs: d }) {
    const s = c(() => (e.footer && e.menuItems ? [...e.menuItems, e.footer] : e.menuItems).map((B) => at(lt({}, B), {
      id: Z("menu-item")
    }))), i = c(() => n["no-results"] ? e.showNoResultsSlot !== null ? e.showNoResultsSlot : s.value.length === 0 : !1), a = f(null), o = f(!1), l = f(null), r = "additions removals";
    let p = "", y = null;
    function x() {
      p = "", y !== null && (clearTimeout(y), y = null);
    }
    function $() {
      y !== null && clearTimeout(y), y = setTimeout(x, 1500);
    }
    function E() {
      return s.value.find(
        (h) => h.value === e.selected
      ) || null;
    }
    function T(h, B) {
      var P;
      if (!(B && B.disabled))
        switch (h) {
          case "selected":
            t("update:selected", (P = B == null ? void 0 : B.value) != null ? P : null), t("update:expanded", !1), l.value = null;
            break;
          case "highlighted":
            a.value = B || null, o.value = !1;
            break;
          case "highlightedViaKeyboard":
            a.value = B || null, o.value = !0;
            break;
          case "active":
            l.value = B || null;
            break;
        }
    }
    const V = c(() => {
      if (a.value !== null)
        return s.value.findIndex(
          (h) => (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            h.value === a.value.value
          )
        );
    });
    function Q(h) {
      h && (T("highlightedViaKeyboard", h), t("menu-item-keyboard-navigation", h));
    }
    function j(h) {
      var X;
      const B = (ye) => {
        for (let oe = ye - 1; oe >= 0; oe--)
          if (!s.value[oe].disabled)
            return s.value[oe];
      };
      h = h || s.value.length;
      const P = (X = B(h)) != null ? X : B(s.value.length);
      Q(P);
    }
    function W(h) {
      const B = (X) => s.value.find((ye, oe) => !ye.disabled && oe > X);
      h = h != null ? h : -1;
      const P = B(h) || B(-1);
      Q(P);
    }
    function Y(h) {
      if (h.key === "Clear")
        return x(), !0;
      if (h.key === "Backspace")
        return p = p.slice(0, -1), $(), !0;
      if (h.key.length === 1 && !h.metaKey && !h.ctrlKey && !h.altKey) {
        e.expanded || t("update:expanded", !0), p += h.key.toLowerCase();
        const B = p.length > 1 && p.split("").every((oe) => oe === p[0]);
        let P = s.value, X = p;
        B && V.value !== void 0 && (P = P.slice(V.value + 1).concat(P.slice(0, V.value)), X = p[0]);
        const ye = P.find(
          (oe) => !oe.disabled && String(oe.label || oe.value).toLowerCase().indexOf(X) === 0
        );
        return ye && (T("highlightedViaKeyboard", ye), v()), $(), !0;
      }
      return !1;
    }
    function G(h, { prevent: B = !0, characterNavigation: P = !1 } = {}) {
      if (P) {
        if (Y(h))
          return !0;
        x();
      }
      function X() {
        B && (h.preventDefault(), h.stopPropagation());
      }
      switch (h.key) {
        case "Enter":
        case " ":
          return X(), e.expanded ? (a.value && o.value && t("update:selected", a.value.value), t("update:expanded", !1)) : t("update:expanded", !0), !0;
        case "Tab":
          return e.expanded && (a.value && o.value && t("update:selected", a.value.value), t("update:expanded", !1)), !0;
        case "ArrowUp":
          return X(), e.expanded ? (a.value === null && T("highlightedViaKeyboard", E()), j(V.value)) : t("update:expanded", !0), v(), !0;
        case "ArrowDown":
          return X(), e.expanded ? (a.value === null && T("highlightedViaKeyboard", E()), W(V.value)) : t("update:expanded", !0), v(), !0;
        case "Home":
          return X(), e.expanded ? (a.value === null && T("highlightedViaKeyboard", E()), W()) : t("update:expanded", !0), v(), !0;
        case "End":
          return X(), e.expanded ? (a.value === null && T("highlightedViaKeyboard", E()), j()) : t("update:expanded", !0), v(), !0;
        case "Escape":
          return X(), t("update:expanded", !1), !0;
        default:
          return !1;
      }
    }
    function F() {
      T("active", null);
    }
    const k = [], A = f(void 0), C = Ne(
      A,
      { threshold: 0.8 }
    );
    te(C, (h) => {
      h && t("load-more");
    });
    function I(h, B) {
      if (h) {
        k[B] = h.$el;
        const P = e.visibleItemLimit;
        if (!P || e.menuItems.length < P)
          return;
        const X = Math.min(
          P,
          Math.max(2, Math.floor(0.2 * e.menuItems.length))
        );
        B === e.menuItems.length - X && (A.value = h.$el);
      }
    }
    function v() {
      if (!e.visibleItemLimit || e.visibleItemLimit > e.menuItems.length || V.value === void 0)
        return;
      const h = V.value >= 0 ? V.value : 0;
      k[h].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
    const b = f(null), D = f(null);
    function U() {
      if (D.value = null, !e.visibleItemLimit || k.length <= e.visibleItemLimit) {
        b.value = null;
        return;
      }
      const h = k[0], B = k[e.visibleItemLimit];
      if (b.value = ve(
        h,
        B
      ), e.footer) {
        const P = k[k.length - 1];
        D.value = P.scrollHeight;
      }
    }
    function ve(h, B) {
      const P = h.getBoundingClientRect().top;
      return B.getBoundingClientRect().top - P + 2;
    }
    fe(() => {
      document.addEventListener("mouseup", F);
    }), Ae(() => {
      document.removeEventListener("mouseup", F);
    }), te(O(e, "expanded"), (h) => Fe(this, null, function* () {
      if (h) {
        const B = E();
        B && !a.value && T("highlighted", B), yield Ce(), U(), yield Ce(), v();
      } else
        T("highlighted", null);
    })), te(O(e, "menuItems"), (h) => Fe(this, null, function* () {
      h.length < k.length && (k.length = h.length), e.expanded && (yield Ce(), U(), yield Ce(), v());
    }), { deep: !0 });
    const Le = c(() => ({
      "max-height": b.value ? `${b.value}px` : void 0,
      "overflow-y": b.value ? "scroll" : void 0,
      "margin-bottom": D.value ? `${D.value}px` : void 0
    })), De = c(() => ({
      "cdx-menu--has-footer": !!e.footer,
      "cdx-menu--has-sticky-footer": !!e.footer && !!b.value
    })), {
      rootClasses: Ke,
      rootStyle: Ee,
      otherAttrs: K
    } = re(d, De);
    return {
      listBoxStyle: Le,
      rootClasses: Ke,
      rootStyle: Ee,
      otherAttrs: K,
      assignTemplateRef: I,
      computedMenuItems: s,
      computedShowNoResultsSlot: i,
      highlightedMenuItem: a,
      highlightedViaKeyboard: o,
      activeMenuItem: l,
      handleMenuItemChange: T,
      handleKeyNavigation: G,
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
const jo = ["aria-live", "aria-relevant"], Uo = {
  key: 0,
  class: "cdx-menu__pending cdx-menu-item"
}, Wo = {
  key: 1,
  class: "cdx-menu__no-results cdx-menu-item"
};
function Qo(e, t, n, d, s, i) {
  const a = S("cdx-menu-item"), o = S("cdx-progress-bar");
  return ae((u(), m("div", {
    class: R(["cdx-menu", e.rootClasses]),
    style: ie(e.rootStyle)
  }, [
    g("ul", J({
      class: "cdx-menu__listbox",
      role: "listbox",
      style: e.listBoxStyle,
      "aria-live": e.showPending ? "polite" : void 0,
      "aria-relevant": e.showPending ? e.ariaRelevant : void 0
    }, e.otherAttrs), [
      e.showPending && e.computedMenuItems.length === 0 && e.$slots.pending ? (u(), m("li", Uo, [
        w(e.$slots, "pending")
      ])) : _("", !0),
      e.computedShowNoResultsSlot ? (u(), m("li", Wo, [
        w(e.$slots, "no-results")
      ])) : _("", !0),
      (u(!0), m(ge, null, ke(e.computedMenuItems, (l, r) => {
        var p, y;
        return u(), L(a, J({
          key: l.value,
          ref_for: !0,
          ref: (x) => e.assignTemplateRef(x, r)
        }, l, {
          selected: l.value === e.selected,
          active: l.value === ((p = e.activeMenuItem) == null ? void 0 : p.value),
          highlighted: l.value === ((y = e.highlightedMenuItem) == null ? void 0 : y.value),
          "show-thumbnail": e.showThumbnail,
          "bold-label": e.boldLabel,
          "hide-description-overflow": e.hideDescriptionOverflow,
          "search-query": e.searchQuery,
          onChange: (x, $) => e.handleMenuItemChange(x, $ ? l : null),
          onClick: (x) => e.$emit("menu-item-click", l)
        }), {
          default: M(() => {
            var x, $;
            return [
              w(e.$slots, "default", {
                menuItem: l,
                active: l.value === ((x = e.activeMenuItem) == null ? void 0 : x.value) && l.value === (($ = e.highlightedMenuItem) == null ? void 0 : $.value)
              })
            ];
          }),
          _: 2
        }, 1040, ["selected", "active", "highlighted", "show-thumbnail", "bold-label", "hide-description-overflow", "search-query", "onChange", "onClick"]);
      }), 128)),
      e.showPending ? (u(), L(o, {
        key: 2,
        class: "cdx-menu__progress-bar",
        inline: !0
      })) : _("", !0)
    ], 16, jo)
  ], 6)), [
    [Ie, e.expanded]
  ]);
}
const Te = /* @__PURE__ */ q(Po, [["render", Qo]]), Go = ne(hn), Zo = ne(he), Jo = z({
  name: "CdxTextInput",
  components: { CdxIcon: ee },
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
      validator: Go
    },
    /**
     * `status` attribute of the input.
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: Zo
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
    const d = n.id, {
      computedDisabled: s,
      computedStatus: i,
      computedInputId: a
    } = ue(
      O(e, "disabled"),
      O(e, "status"),
      d
    ), o = pe(Be, void 0), l = ce(O(e, "modelValue"), t), r = c(() => e.clearable && !!l.value && !s.value), p = c(() => ({
      "cdx-text-input--has-start-icon": !!e.startIcon,
      "cdx-text-input--has-end-icon": !!e.endIcon,
      "cdx-text-input--clearable": r.value,
      [`cdx-text-input--status-${i.value}`]: !0
    })), {
      rootClasses: y,
      rootStyle: x,
      otherAttrs: $
    } = re(n, p), E = c(() => {
      const A = $.value, { id: F } = A;
      return be(A, ["id"]);
    }), T = c(() => ({
      "cdx-text-input__input--has-value": !!l.value
    }));
    return {
      computedInputId: a,
      descriptionId: o,
      wrappedModel: l,
      isClearable: r,
      rootClasses: y,
      rootStyle: x,
      otherAttrsMinusId: E,
      inputClasses: T,
      computedDisabled: s,
      onClear: (F) => {
        l.value = "", t("clear", F);
      },
      onInput: (F) => {
        t("input", F);
      },
      onChange: (F) => {
        t("change", F);
      },
      onKeydown: (F) => {
        (F.key === "Home" || F.key === "End") && !F.ctrlKey && !F.metaKey || t("keydown", F);
      },
      onFocus: (F) => {
        t("focus", F);
      },
      onBlur: (F) => {
        t("blur", F);
      },
      cdxIconClear: Xt
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
const Yo = ["id", "type", "aria-describedby", "disabled"];
function Xo(e, t, n, d, s, i) {
  const a = S("cdx-icon");
  return u(), m("div", {
    class: R(["cdx-text-input", e.rootClasses]),
    style: ie(e.rootStyle)
  }, [
    ae(g("input", J({
      id: e.computedInputId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (o) => e.wrappedModel = o),
      class: ["cdx-text-input__input", e.inputClasses]
    }, e.otherAttrsMinusId, {
      type: e.inputType,
      "aria-describedby": e.descriptionId,
      disabled: e.computedDisabled,
      size: "1",
      onInput: t[1] || (t[1] = (...o) => e.onInput && e.onInput(...o)),
      onChange: t[2] || (t[2] = (...o) => e.onChange && e.onChange(...o)),
      onFocus: t[3] || (t[3] = (...o) => e.onFocus && e.onFocus(...o)),
      onBlur: t[4] || (t[4] = (...o) => e.onBlur && e.onBlur(...o)),
      onKeydown: t[5] || (t[5] = (...o) => e.onKeydown && e.onKeydown(...o))
    }), null, 16, Yo), [
      [qe, e.wrappedModel]
    ]),
    e.startIcon ? (u(), L(a, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__start-icon"
    }, null, 8, ["icon"])) : _("", !0),
    e.endIcon ? (u(), L(a, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__end-icon"
    }, null, 8, ["icon"])) : _("", !0),
    e.isClearable ? (u(), L(a, {
      key: 2,
      icon: e.cdxIconClear,
      class: "cdx-text-input__icon-vue cdx-text-input__clear-icon",
      onMousedown: t[6] || (t[6] = le(() => {
      }, ["prevent"])),
      onClick: e.onClear
    }, null, 8, ["icon", "onClick"])) : _("", !0)
  ], 6);
}
const Je = /* @__PURE__ */ q(Jo, [["render", Xo]]);
function Ve(e) {
  const t = f(
    { width: void 0, height: void 0 }
  );
  if (typeof window != "object" || !("ResizeObserver" in window) || !("ResizeObserverEntry" in window))
    return t;
  const n = new window.ResizeObserver(
    (s) => {
      const i = s[0];
      i && (t.value = {
        width: i.borderBoxSize[0].inlineSize,
        height: i.borderBoxSize[0].blockSize
      });
    }
  );
  let d = !1;
  return fe(() => {
    d = !0, e.value && n.observe(e.value);
  }), Ae(() => {
    d = !1, n.disconnect();
  }), te(e, (s) => {
    d && (n.disconnect(), t.value = {
      width: void 0,
      height: void 0
    }, s && n.observe(s));
  }), t;
}
const el = ne(he), Ye = z({
  name: "CdxCombobox",
  components: {
    CdxButton: me,
    CdxIcon: ee,
    CdxMenu: Te,
    CdxTextInput: Je
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
      validator: el
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
  setup(e, { emit: t, attrs: n, slots: d }) {
    const s = f(), i = f(), a = f(), o = Z("combobox"), l = O(e, "selected"), r = ce(l, t, "update:selected"), p = f(!1), y = f(!1), x = c(() => {
      var C, I;
      return (I = (C = a.value) == null ? void 0 : C.getHighlightedMenuItem()) == null ? void 0 : I.id;
    }), { computedDisabled: $ } = ue(O(e, "disabled")), E = c(() => ({
      "cdx-combobox--expanded": p.value,
      "cdx-combobox--disabled": $.value
    })), T = Ve(i), V = c(() => {
      var C;
      return `${(C = T.value.width) != null ? C : 0}px`;
    }), {
      rootClasses: Q,
      rootStyle: j,
      otherAttrs: W
    } = re(n, E);
    function Y(C) {
      y.value && p.value ? p.value = !1 : (e.menuItems.length > 0 || d["no-results"]) && (p.value = !0), t("focus", C);
    }
    function G(C) {
      p.value = y.value && p.value, t("blur", C);
    }
    function F() {
      $.value || (y.value = !0);
    }
    function k() {
      var C;
      $.value || (C = s.value) == null || C.focus();
    }
    function A(C) {
      !a.value || $.value || e.menuItems.length === 0 || C.key === " " || a.value.delegateKeyNavigation(C);
    }
    return te(p, () => {
      y.value = !1;
    }), {
      input: s,
      inputWrapper: i,
      currentWidthInPx: V,
      menu: a,
      menuId: o,
      modelWrapper: r,
      expanded: p,
      highlightedId: x,
      computedDisabled: $,
      onInputFocus: Y,
      onInputBlur: G,
      onKeydown: A,
      onButtonClick: k,
      onButtonMousedown: F,
      cdxIconExpand: Ue,
      rootClasses: Q,
      rootStyle: j,
      otherAttrs: W
    };
  }
}), st = () => {
  Pe((e) => ({
    "79c5968f": e.currentWidthInPx
  }));
}, it = Ye.setup;
Ye.setup = it ? (e, t) => (st(), it(e, t)) : st;
const tl = {
  ref: "inputWrapper",
  class: "cdx-combobox__input-wrapper"
};
function nl(e, t, n, d, s, i) {
  const a = S("cdx-text-input"), o = S("cdx-icon"), l = S("cdx-button"), r = S("cdx-menu");
  return u(), m("div", {
    class: R(["cdx-combobox", e.rootClasses]),
    style: ie(e.rootStyle)
  }, [
    g("div", tl, [
      N(a, J({
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
      N(l, {
        class: "cdx-combobox__expand-button",
        "aria-hidden": "true",
        disabled: e.computedDisabled,
        tabindex: "-1",
        type: "button",
        onMousedown: e.onButtonMousedown,
        onClick: e.onButtonClick
      }, {
        default: M(() => [
          N(o, {
            class: "cdx-combobox__expand-icon",
            icon: e.cdxIconExpand
          }, null, 8, ["icon"])
        ]),
        _: 1
      }, 8, ["disabled", "onMousedown", "onClick"])
    ], 512),
    N(r, J({
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
      default: M(({ menuItem: p }) => [
        w(e.$slots, "menu-item", { menuItem: p })
      ]),
      "no-results": M(() => [
        w(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const Va = /* @__PURE__ */ q(Ye, [["render", nl]]), ol = z({
  name: "CdxDialog",
  components: {
    CdxButton: me,
    CdxIcon: ee
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
    const n = Z("dialog-label"), d = f(), s = f(), i = f(), a = f(), o = f(), l = f(), r = c(() => !e.hideTitle || !!e.closeButtonLabel), p = c(() => !!e.primaryAction || !!e.defaultAction), y = Ve(i), x = c(() => {
      var b;
      return (b = y.value.height) != null ? b : 0;
    }), $ = f(!1), E = c(() => ({
      "cdx-dialog--vertical-actions": e.stackedActions,
      "cdx-dialog--horizontal-actions": !e.stackedActions,
      "cdx-dialog--dividers": $.value
    })), T = pe("CdxTeleportTarget", void 0), V = c(() => {
      var b, D;
      return (D = (b = e.target) != null ? b : T) != null ? D : "body";
    }), Q = f(0);
    function j() {
      t("update:open", !1);
    }
    function W() {
      G(s.value);
    }
    function Y() {
      G(s.value, !0);
    }
    function G(b, D = !1) {
      let U = Array.from(
        b.querySelectorAll(`
					input, select, textarea, button, object, a, area,
					[contenteditable], [tabindex]:not([tabindex^="-"])
				`)
      );
      D && (U = U.reverse());
      for (const ve of U)
        if (ve.focus(), document.activeElement === ve)
          return !0;
      return !1;
    }
    let F = [], k = [];
    function A() {
      let b = d.value;
      for (; b.parentElement && b.nodeName !== "BODY"; ) {
        for (const D of Array.from(b.parentElement.children))
          D === b || D.nodeName === "SCRIPT" || (D.hasAttribute("aria-hidden") || (D.setAttribute("aria-hidden", "true"), F.push(D)), D.hasAttribute("inert") || (D.setAttribute("inert", ""), k.push(D)));
        b = b.parentElement;
      }
    }
    function C() {
      for (const b of F)
        b.removeAttribute("aria-hidden");
      for (const b of k)
        b.removeAttribute("inert");
      F = [], k = [];
    }
    function I() {
      Ce(() => {
        var b;
        Q.value = window.innerWidth - document.documentElement.clientWidth, document.documentElement.style.setProperty("margin-right", `${Q.value}px`), document.body.classList.add("cdx-dialog-open"), A(), G(i.value) || (b = a.value) == null || b.focus();
      });
    }
    function v() {
      document.body.classList.remove("cdx-dialog-open"), document.documentElement.style.removeProperty("margin-right"), C();
    }
    return fe(() => {
      e.open && I();
    }), Ae(() => {
      e.open && v();
    }), te(O(e, "open"), (b) => {
      b ? I() : v();
    }), te(x, () => {
      i.value && ($.value = i.value.clientHeight < i.value.scrollHeight);
    }), {
      close: j,
      cdxIconClose: je,
      labelId: n,
      rootClasses: E,
      backdrop: d,
      dialogElement: s,
      focusTrapStart: o,
      focusTrapEnd: l,
      focusFirst: W,
      focusLast: Y,
      dialogBody: i,
      focusHolder: a,
      showHeader: r,
      showFooterActions: p,
      computedTarget: V
    };
  }
});
const ll = ["aria-label", "aria-labelledby"], al = {
  key: 0,
  class: "cdx-dialog__header__title-group"
}, sl = ["id"], il = {
  key: 0,
  class: "cdx-dialog__header__subtitle"
}, dl = {
  ref: "focusHolder",
  class: "cdx-dialog-focus-trap",
  tabindex: "-1"
}, ul = {
  key: 0,
  class: "cdx-dialog__footer__text"
}, rl = {
  key: 1,
  class: "cdx-dialog__footer__actions"
};
function cl(e, t, n, d, s, i) {
  const a = S("cdx-icon"), o = S("cdx-button");
  return u(), L(Kt, {
    to: e.computedTarget,
    disabled: e.renderInPlace
  }, [
    N(He, {
      name: "cdx-dialog-fade",
      appear: ""
    }, {
      default: M(() => [
        e.open ? (u(), m("div", {
          key: 0,
          ref: "backdrop",
          class: "cdx-dialog-backdrop",
          onClick: t[5] || (t[5] = (...l) => e.close && e.close(...l)),
          onKeyup: t[6] || (t[6] = de((...l) => e.close && e.close(...l), ["escape"]))
        }, [
          g("div", {
            ref: "focusTrapStart",
            tabindex: "0",
            onFocus: t[0] || (t[0] = (...l) => e.focusLast && e.focusLast(...l))
          }, null, 544),
          g("div", J({
            ref: "dialogElement",
            class: ["cdx-dialog", e.rootClasses],
            role: "dialog"
          }, e.$attrs, {
            "aria-label": e.$slots.header || e.hideTitle ? e.title : void 0,
            "aria-labelledby": !e.$slots.header && !e.hideTitle ? e.labelId : void 0,
            "aria-modal": "true",
            onClick: t[3] || (t[3] = le(() => {
            }, ["stop"]))
          }), [
            e.showHeader || e.$slots.header ? (u(), m("header", {
              key: 0,
              class: R(["cdx-dialog__header", { "cdx-dialog__header--default": !e.$slots.header }])
            }, [
              w(e.$slots, "header", {}, () => [
                e.hideTitle ? _("", !0) : (u(), m("div", al, [
                  g("h2", {
                    id: e.labelId,
                    class: "cdx-dialog__header__title"
                  }, H(e.title), 9, sl),
                  e.subtitle ? (u(), m("p", il, H(e.subtitle), 1)) : _("", !0)
                ])),
                e.closeButtonLabel ? (u(), L(o, {
                  key: 1,
                  class: "cdx-dialog__header__close-button",
                  weight: "quiet",
                  type: "button",
                  "aria-label": e.closeButtonLabel,
                  onClick: e.close
                }, {
                  default: M(() => [
                    N(a, {
                      icon: e.cdxIconClose,
                      "icon-label": e.closeButtonLabel
                    }, null, 8, ["icon", "icon-label"])
                  ]),
                  _: 1
                }, 8, ["aria-label", "onClick"])) : _("", !0)
              ])
            ], 2)) : _("", !0),
            g("div", dl, null, 512),
            g("div", {
              ref: "dialogBody",
              class: R(["cdx-dialog__body", {
                "cdx-dialog__body--no-header": !(e.showHeader || e.$slots.header),
                "cdx-dialog__body--no-footer": !(e.showFooterActions || e.$slots.footer || e.$slots["footer-text"])
              }])
            }, [
              w(e.$slots, "default")
            ], 2),
            e.showFooterActions || e.$slots.footer || e.$slots["footer-text"] ? (u(), m("footer", {
              key: 1,
              class: R(["cdx-dialog__footer", { "cdx-dialog__footer--default": !e.$slots.footer }])
            }, [
              w(e.$slots, "footer", {}, () => [
                e.$slots["footer-text"] ? (u(), m("p", ul, [
                  w(e.$slots, "footer-text")
                ])) : _("", !0),
                e.showFooterActions ? (u(), m("div", rl, [
                  e.primaryAction ? (u(), L(o, {
                    key: 0,
                    class: "cdx-dialog__footer__primary-action",
                    weight: "primary",
                    action: e.primaryAction.actionType,
                    disabled: e.primaryAction.disabled,
                    onClick: t[1] || (t[1] = (l) => e.$emit("primary"))
                  }, {
                    default: M(() => [
                      se(H(e.primaryAction.label), 1)
                    ]),
                    _: 1
                  }, 8, ["action", "disabled"])) : _("", !0),
                  e.defaultAction ? (u(), L(o, {
                    key: 1,
                    class: "cdx-dialog__footer__default-action",
                    disabled: e.defaultAction.disabled,
                    onClick: t[2] || (t[2] = (l) => e.$emit("default"))
                  }, {
                    default: M(() => [
                      se(H(e.defaultAction.label), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"])) : _("", !0)
                ])) : _("", !0)
              ])
            ], 2)) : _("", !0)
          ], 16, ll),
          g("div", {
            ref: "focusTrapEnd",
            tabindex: "0",
            onFocus: t[4] || (t[4] = (...l) => e.focusFirst && e.focusFirst(...l))
          }, null, 544)
        ], 544)) : _("", !0)
      ]),
      _: 3
    })
  ], 8, ["to", "disabled"]);
}
const La = /* @__PURE__ */ q(ol, [["render", cl]]), pl = {
  notice: tn,
  error: ht,
  warning: ft,
  success: mt
}, fl = z({
  name: "CdxMessage",
  components: { CdxButton: me, CdxIcon: ee },
  props: {
    /**
     * Status type of Message.
     *
     * @values 'notice', 'warning', 'error', 'success'
     */
    type: {
      type: String,
      default: "notice",
      validator: vt
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
     * for the hidden button label required for accessibility purposes and tooltip text.
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
    const n = f(!1), d = c(
      () => e.inline === !1 && e.dismissButtonLabel.length > 0
    ), s = c(() => e.autoDismiss === !1 || e.type === "error" ? !1 : e.autoDismiss === !0 ? 4e3 : e.autoDismiss), i = c(() => ({
      "cdx-message--inline": e.inline,
      "cdx-message--block": !e.inline,
      "cdx-message--user-dismissable": d.value,
      [`cdx-message--${e.type}`]: !0
    })), a = c(
      () => e.icon && e.type === "notice" ? e.icon : pl[e.type]
    ), o = f("");
    function l(r) {
      n.value || (o.value = r === "user-dismissed" ? "cdx-message-leave-active-user" : "cdx-message-leave-active-system", n.value = !0, t(r));
    }
    return fe(() => {
      e.type === "error" && e.autoDismiss !== !1 ? ze('CdxMessage: Message with type="error" cannot use auto-dismiss') : s.value && setTimeout(() => l("auto-dismissed"), s.value);
    }), {
      dismissed: n,
      userDismissable: d,
      rootClasses: i,
      leaveActiveClass: o,
      computedIcon: a,
      onDismiss: l,
      cdxIconClose: je
    };
  }
});
const hl = ["aria-live", "role"], ml = { class: "cdx-message__content" };
function vl(e, t, n, d, s, i) {
  const a = S("cdx-icon"), o = S("cdx-button");
  return u(), L(He, {
    name: "cdx-message",
    appear: e.fadeIn,
    "leave-active-class": e.leaveActiveClass
  }, {
    default: M(() => [
      e.dismissed ? _("", !0) : (u(), m("div", {
        key: 0,
        class: R(["cdx-message", e.rootClasses]),
        "aria-live": e.type !== "error" ? "polite" : void 0,
        role: e.type === "error" ? "alert" : void 0
      }, [
        N(a, {
          class: "cdx-message__icon--vue",
          icon: e.computedIcon
        }, null, 8, ["icon"]),
        g("div", ml, [
          w(e.$slots, "default")
        ]),
        e.userDismissable ? (u(), L(o, {
          key: 0,
          class: "cdx-message__dismiss-button",
          weight: "quiet",
          type: "button",
          "aria-label": e.dismissButtonLabel,
          onClick: t[0] || (t[0] = (l) => e.onDismiss("user-dismissed"))
        }, {
          default: M(() => [
            N(a, {
              icon: e.cdxIconClose,
              "icon-label": e.dismissButtonLabel
            }, null, 8, ["icon", "icon-label"])
          ]),
          _: 1
        }, 8, ["aria-label"])) : _("", !0)
      ], 10, hl))
    ]),
    _: 3
  }, 8, ["appear", "leave-active-class"]);
}
const bl = /* @__PURE__ */ q(fl, [["render", vl]]), gl = ne(he), yl = z({
  name: "CdxField",
  components: { CdxLabel: Me, CdxMessage: bl },
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
      validator: gl
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
    const { disabled: n, status: d, isFieldset: s } = Et(e), i = xt(n), a = c(() => ({
      "cdx-field--disabled": i.value
    })), o = Z("label"), l = Z("description"), r = Z("input"), p = c(() => s.value ? void 0 : r);
    _e(yt, p);
    const y = c(
      () => !s.value && t.description ? l : void 0
    );
    _e(Be, y), _e(_t, i), _e($t, d);
    const x = c(
      () => e.status !== "default" && e.status in e.messages ? e.messages[e.status] : ""
    ), $ = c(() => e.status === "default" ? "notice" : e.status);
    return {
      rootClasses: a,
      computedDisabled: i,
      labelId: o,
      descriptionId: l,
      inputId: r,
      validationMessage: x,
      validationMessageType: $
    };
  }
});
const $l = { class: "cdx-field__help-text" }, _l = {
  key: 0,
  class: "cdx-field__validation-message"
};
function Cl(e, t, n, d, s, i) {
  const a = S("cdx-label"), o = S("cdx-message");
  return u(), L(Se(e.isFieldset ? "fieldset" : "div"), {
    class: R(["cdx-field", e.rootClasses]),
    "aria-disabled": !e.isFieldset && e.computedDisabled ? !0 : void 0,
    disabled: e.isFieldset && e.computedDisabled ? !0 : void 0
  }, {
    default: M(() => [
      N(a, {
        id: e.labelId,
        icon: e.labelIcon,
        "visually-hidden": e.hideLabel,
        "optional-flag": e.optionalFlag,
        "input-id": e.inputId,
        "description-id": e.descriptionId,
        disabled: e.computedDisabled,
        "is-legend": e.isFieldset
      }, xe({
        default: M(() => [
          w(e.$slots, "label")
        ]),
        _: 2
      }, [
        e.$slots.description && e.$slots.description().length > 0 ? {
          name: "description",
          fn: M(() => [
            w(e.$slots, "description")
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["id", "icon", "visually-hidden", "optional-flag", "input-id", "description-id", "disabled", "is-legend"]),
      g("div", {
        class: R(["cdx-field__control", { "cdx-field__control--has-help-text": e.$slots["help-text"] && e.$slots["help-text"]().length > 0 || e.validationMessage }])
      }, [
        w(e.$slots, "default")
      ], 2),
      g("div", $l, [
        w(e.$slots, "help-text")
      ]),
      !e.computedDisabled && e.validationMessage ? (u(), m("div", _l, [
        N(o, {
          type: e.validationMessageType,
          inline: !0
        }, {
          default: M(() => [
            se(H(e.validationMessage), 1)
          ]),
          _: 1
        }, 8, ["type"])
      ])) : _("", !0)
    ]),
    _: 3
  }, 8, ["class", "aria-disabled", "disabled"]);
}
const Da = /* @__PURE__ */ q(yl, [["render", Cl]]), Il = {
  error: ht,
  warning: ft,
  success: mt
}, kl = z({
  name: "CdxInfoChip",
  components: { CdxIcon: ee },
  props: {
    /**
     * Status type.
     *
     * @values 'notice', 'warning', 'error', 'success'
     */
    status: {
      type: String,
      default: "notice",
      validator: vt
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
      () => e.status === "notice" ? e.icon : Il[e.status]
    );
    return {
      iconClass: t,
      computedIcon: n
    };
  }
});
const wl = { class: "cdx-info-chip" }, Sl = { class: "cdx-info-chip--text" };
function xl(e, t, n, d, s, i) {
  const a = S("cdx-icon");
  return u(), m("div", wl, [
    e.computedIcon ? (u(), L(a, {
      key: 0,
      class: R(["cdx-info-chip__icon", e.iconClass]),
      icon: e.computedIcon
    }, null, 8, ["class", "icon"])) : _("", !0),
    g("span", Sl, [
      w(e.$slots, "default")
    ])
  ]);
}
const Ka = /* @__PURE__ */ q(kl, [["render", xl]]), Al = ne(he), Xe = z({
  name: "CdxLookup",
  components: {
    CdxMenu: Te,
    CdxTextInput: Je
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
      validator: Al
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
  setup: (e, { emit: t, attrs: n, slots: d }) => {
    const s = f(), i = f(), a = Z("lookup-menu"), o = f(!1), l = f(!1), r = f(!1), { computedDisabled: p } = ue(O(e, "disabled")), y = O(e, "selected"), x = ce(y, t, "update:selected"), $ = c(
      () => e.menuItems.find((I) => I.value === e.selected)
    ), E = c(() => {
      var I, v;
      return (v = (I = i.value) == null ? void 0 : I.getHighlightedMenuItem()) == null ? void 0 : v.id;
    }), T = f(e.initialInputValue), V = Ve(s), Q = c(() => {
      var I;
      return `${(I = V.value.width) != null ? I : 0}px`;
    }), j = c(() => ({
      "cdx-lookup--disabled": p.value,
      "cdx-lookup--pending": o.value
    })), {
      rootClasses: W,
      rootStyle: Y,
      otherAttrs: G
    } = re(n, j);
    function F(I) {
      $.value && $.value.label !== I && $.value.value !== I && (x.value = null), I === "" ? (l.value = !1, o.value = !1) : o.value = !0, t("input", I);
    }
    function k(I) {
      r.value = !0, // Input value is not null or an empty string.
      T.value !== null && T.value !== "" && // There's either menu items to show or a no results message.
      (e.menuItems.length > 0 || d["no-results"]) && (l.value = !0), t("focus", I);
    }
    function A(I) {
      r.value = !1, l.value = !1, t("blur", I);
    }
    function C(I) {
      !i.value || p.value || e.menuItems.length === 0 && !d["no-results"] || I.key === " " || i.value.delegateKeyNavigation(I);
    }
    return te(y, (I) => {
      if (I !== null) {
        const v = $.value ? $.value.label || $.value.value : "";
        T.value !== v && (T.value = v, t("input", T.value));
      }
    }), te(O(e, "menuItems"), (I) => {
      // Only show the menu if we were in the pending state (meaning this menuItems change
      // was in response to user input) and the menu is still focused
      r.value && o.value && // Show the menu if there are either menu items or no-results content to show
      (I.length > 0 || d["no-results"]) && (l.value = !0), I.length === 0 && !d["no-results"] && (l.value = !1), o.value = !1;
    }), {
      rootElement: s,
      currentWidthInPx: Q,
      menu: i,
      menuId: a,
      highlightedId: E,
      inputValue: T,
      modelWrapper: x,
      expanded: l,
      computedDisabled: p,
      onInputBlur: A,
      rootClasses: W,
      rootStyle: Y,
      otherAttrs: G,
      onUpdateInput: F,
      onInputFocus: k,
      onKeydown: C
    };
  }
}), dt = () => {
  Pe((e) => ({
    "49368ef8": e.currentWidthInPx
  }));
}, ut = Xe.setup;
Xe.setup = ut ? (e, t) => (dt(), ut(e, t)) : dt;
function Bl(e, t, n, d, s, i) {
  const a = S("cdx-text-input"), o = S("cdx-menu");
  return u(), m("div", {
    ref: "rootElement",
    class: R(["cdx-lookup", e.rootClasses]),
    style: ie(e.rootStyle)
  }, [
    N(a, J({
      modelValue: e.inputValue,
      "onUpdate:modelValue": t[0] || (t[0] = (l) => e.inputValue = l)
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
      onChange: t[1] || (t[1] = (l) => e.$emit("change", l)),
      onFocus: e.onInputFocus,
      onBlur: e.onInputBlur,
      onKeydown: e.onKeydown
    }), null, 16, ["modelValue", "aria-controls", "aria-expanded", "aria-activedescendant", "disabled", "status", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
    N(o, J({
      id: e.menuId,
      ref: "menu",
      selected: e.modelWrapper,
      "onUpdate:selected": t[2] || (t[2] = (l) => e.modelWrapper = l),
      expanded: e.expanded,
      "onUpdate:expanded": t[3] || (t[3] = (l) => e.expanded = l),
      "menu-items": e.menuItems
    }, e.menuConfig, {
      onLoadMore: t[4] || (t[4] = (l) => e.$emit("load-more"))
    }), {
      default: M(({ menuItem: l }) => [
        w(e.$slots, "menu-item", { menuItem: l })
      ]),
      "no-results": M(() => [
        w(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const Ea = /* @__PURE__ */ q(Xe, [["render", Bl]]), Ml = z({
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
  setup(e, { emit: t, slots: n, attrs: d }) {
    var y;
    Ze((y = n.default) == null ? void 0 : y.call(n), d, "CdxRadio");
    const s = c(() => ({
      "cdx-radio--inline": e.inline
    })), { computedDisabled: i } = ue(O(e, "disabled")), a = f(), o = Z("radio"), l = Z("description"), r = () => {
      a.value.focus();
    }, p = ce(O(e, "modelValue"), t);
    return {
      rootClasses: s,
      computedDisabled: i,
      input: a,
      radioId: o,
      descriptionId: l,
      focusInput: r,
      wrappedModel: p
    };
  }
});
const Tl = ["id", "aria-describedby", "name", "value", "disabled"], Vl = /* @__PURE__ */ g("span", { class: "cdx-radio__icon" }, null, -1);
function Ll(e, t, n, d, s, i) {
  const a = S("cdx-label");
  return u(), m("span", {
    class: R(["cdx-radio", e.rootClasses])
  }, [
    ae(g("input", {
      id: e.radioId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (o) => e.wrappedModel = o),
      class: "cdx-radio__input",
      type: "radio",
      "aria-describedby": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      name: e.name,
      value: e.inputValue,
      disabled: e.computedDisabled
    }, null, 8, Tl), [
      [Ft, e.wrappedModel]
    ]),
    Vl,
    e.$slots.default && e.$slots.default().length ? (u(), L(a, {
      key: 0,
      class: "cdx-radio__label",
      "input-id": e.radioId,
      "description-id": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      disabled: e.computedDisabled,
      onClick: e.focusInput
    }, xe({
      default: M(() => [
        w(e.$slots, "default")
      ]),
      _: 2
    }, [
      e.$slots.description && e.$slots.description().length > 0 ? {
        name: "description",
        fn: M(() => [
          w(e.$slots, "description")
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["input-id", "description-id", "disabled", "onClick"])) : _("", !0)
  ], 2);
}
const Fa = /* @__PURE__ */ q(Ml, [["render", Ll]]), Dl = ne(he), Kl = z({
  name: "CdxSearchInput",
  components: {
    CdxButton: me,
    CdxTextInput: Je
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
      validator: Dl
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
    const d = ce(O(e, "modelValue"), t), { computedDisabled: s } = ue(O(e, "disabled")), i = c(() => ({
      "cdx-search-input--has-end-button": !!e.buttonLabel
    })), {
      rootClasses: a,
      rootStyle: o,
      otherAttrs: l
    } = re(n, i);
    return {
      wrappedModel: d,
      computedDisabled: s,
      rootClasses: a,
      rootStyle: o,
      otherAttrs: l,
      handleSubmit: () => {
        t("submit-click", d.value);
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
const El = { class: "cdx-search-input__input-wrapper" };
function Fl(e, t, n, d, s, i) {
  const a = S("cdx-text-input"), o = S("cdx-button");
  return u(), m("div", {
    class: R(["cdx-search-input", e.rootClasses]),
    style: ie(e.rootStyle)
  }, [
    g("div", El, [
      N(a, J({
        ref: "textInput",
        modelValue: e.wrappedModel,
        "onUpdate:modelValue": t[0] || (t[0] = (l) => e.wrappedModel = l),
        class: "cdx-search-input__text-input",
        "input-type": "search",
        "start-icon": e.searchIcon,
        disabled: e.computedDisabled,
        status: e.status
      }, e.otherAttrs, {
        onKeydown: de(e.handleSubmit, ["enter"]),
        onInput: t[1] || (t[1] = (l) => e.$emit("input", l)),
        onChange: t[2] || (t[2] = (l) => e.$emit("change", l)),
        onFocus: t[3] || (t[3] = (l) => e.$emit("focus", l)),
        onBlur: t[4] || (t[4] = (l) => e.$emit("blur", l))
      }), null, 16, ["modelValue", "start-icon", "disabled", "status", "onKeydown"]),
      w(e.$slots, "default")
    ]),
    e.buttonLabel ? (u(), L(o, {
      key: 0,
      class: "cdx-search-input__end-button",
      disabled: e.computedDisabled,
      onClick: e.handleSubmit
    }, {
      default: M(() => [
        se(H(e.buttonLabel), 1)
      ]),
      _: 1
    }, 8, ["disabled", "onClick"])) : _("", !0)
  ], 6);
}
const Rl = /* @__PURE__ */ q(Kl, [["render", Fl]]), Ol = ne(he), et = z({
  name: "CdxSelect",
  components: {
    CdxIcon: ee,
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
      validator: Ol
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
    const d = f(), s = f(), i = pe(Be, void 0), a = Z("select-menu"), o = f(!1), l = n.id || Z("select-handle"), {
      computedDisabled: r,
      computedStatus: p,
      computedInputId: y
    } = ue(
      O(e, "disabled"),
      O(e, "status"),
      l
    ), x = ce(O(e, "selected"), t, "update:selected"), $ = c(
      () => e.menuItems.find((v) => v.value === e.selected)
    ), E = c(() => $.value ? $.value.label || $.value.value : e.defaultLabel), T = Ve(d), V = c(() => {
      var v;
      return `${(v = T.value.width) != null ? v : 0}px`;
    }), Q = c(() => {
      if (e.defaultIcon && !$.value)
        return e.defaultIcon;
      if ($.value && $.value.icon)
        return $.value.icon;
    }), j = c(() => ({
      "cdx-select-vue--enabled": !r.value,
      "cdx-select-vue--disabled": r.value,
      "cdx-select-vue--expanded": o.value,
      "cdx-select-vue--value-selected": !!$.value,
      "cdx-select-vue--no-selections": !$.value,
      "cdx-select-vue--has-start-icon": !!Q.value,
      [`cdx-select-vue--status-${p.value}`]: !0
    })), {
      rootClasses: W,
      rootStyle: Y,
      otherAttrs: G
    } = re(n, j), F = c(() => {
      const D = G.value, { id: v } = D;
      return be(D, ["id"]);
    }), k = c(() => {
      var v, b;
      return (b = (v = s.value) == null ? void 0 : v.getHighlightedMenuItem()) == null ? void 0 : b.id;
    });
    function A() {
      o.value = !1;
    }
    function C() {
      var v;
      r.value || (o.value = !o.value, (v = d.value) == null || v.focus());
    }
    function I(v) {
      var b;
      r.value || (b = s.value) == null || b.delegateKeyNavigation(v, { characterNavigation: !0 });
    }
    return {
      handle: d,
      menu: s,
      computedHandleId: y,
      descriptionId: i,
      menuId: a,
      modelWrapper: x,
      selectedMenuItem: $,
      highlightedId: k,
      expanded: o,
      computedDisabled: r,
      onBlur: A,
      currentLabel: E,
      currentWidthInPx: V,
      rootClasses: W,
      rootStyle: Y,
      otherAttrsMinusId: F,
      onClick: C,
      onKeydown: I,
      startIcon: Q,
      cdxIconExpand: Ue
    };
  }
}), rt = () => {
  Pe((e) => ({
    "3b410536": e.currentWidthInPx
  }));
}, ct = et.setup;
et.setup = ct ? (e, t) => (rt(), ct(e, t)) : rt;
const zl = ["aria-disabled"], ql = ["id", "aria-controls", "aria-activedescendant", "aria-expanded", "aria-describedby"];
function Nl(e, t, n, d, s, i) {
  const a = S("cdx-icon"), o = S("cdx-menu");
  return u(), m("div", {
    class: R(["cdx-select-vue", e.rootClasses]),
    style: ie(e.rootStyle),
    "aria-disabled": e.computedDisabled
  }, [
    g("div", J({
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
      onClick: t[0] || (t[0] = (...l) => e.onClick && e.onClick(...l)),
      onBlur: t[1] || (t[1] = (...l) => e.onBlur && e.onBlur(...l)),
      onKeydown: t[2] || (t[2] = (...l) => e.onKeydown && e.onKeydown(...l))
    }), [
      w(e.$slots, "label", {
        selectedMenuItem: e.selectedMenuItem,
        defaultLabel: e.defaultLabel
      }, () => [
        se(H(e.currentLabel), 1)
      ]),
      e.startIcon ? (u(), L(a, {
        key: 0,
        icon: e.startIcon,
        class: "cdx-select-vue__start-icon"
      }, null, 8, ["icon"])) : _("", !0),
      N(a, {
        icon: e.cdxIconExpand,
        class: "cdx-select-vue__indicator"
      }, null, 8, ["icon"])
    ], 16, ql),
    N(o, J({
      id: e.menuId,
      ref: "menu",
      selected: e.modelWrapper,
      "onUpdate:selected": t[3] || (t[3] = (l) => e.modelWrapper = l),
      expanded: e.expanded,
      "onUpdate:expanded": t[4] || (t[4] = (l) => e.expanded = l),
      "menu-items": e.menuItems
    }, e.menuConfig, {
      onLoadMore: t[5] || (t[5] = (l) => e.$emit("load-more"))
    }), {
      default: M(({ menuItem: l }) => [
        w(e.$slots, "menu-item", { menuItem: l })
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 14, zl);
}
const Ra = /* @__PURE__ */ q(et, [["render", Nl]]), Hl = z({
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
    const t = pe(bt), n = pe(gt);
    if (!t || !n)
      throw new Error("Tab component must be used inside a Tabs component");
    const d = t.value.get(e.name) || {}, s = c(() => e.name === n.value);
    return {
      tab: d,
      isActive: s
    };
  }
});
const Pl = ["id", "aria-hidden", "aria-labelledby"];
function jl(e, t, n, d, s, i) {
  return ae((u(), m("section", {
    id: e.tab.id,
    "aria-hidden": e.isActive ? void 0 : !0,
    "aria-labelledby": `${e.tab.id}-label`,
    class: "cdx-tab",
    role: "tabpanel",
    tabindex: "-1"
  }, [
    w(e.$slots, "default")
  ], 8, Pl)), [
    [Ie, e.isActive]
  ]);
}
const Ul = /* @__PURE__ */ q(Hl, [["render", jl]]), Wl = z({
  name: "CdxTabs",
  components: {
    CdxButton: me,
    CdxIcon: ee
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
    const d = f(), s = f(), i = f(), a = f(), o = We(d), l = c(() => {
      const k = Qe(t.default);
      if (!k.every(
        (A) => typeof A == "object" && It(A, Ul.name)
      ))
        throw new Error("Slot content may only contain CdxTab components");
      if (k.length === 0)
        throw new Error("Slot content cannot be empty");
      return k;
    }), r = c(() => l.value.reduce((k, A) => {
      var C;
      if ((C = A.props) != null && C.name && typeof A.props.name == "string") {
        if (k.get(A.props.name))
          throw new Error("Tab names must be unique");
        k.set(A.props.name, {
          name: A.props.name,
          id: Z(A.props.name),
          label: A.props.label || A.props.name,
          disabled: A.props.disabled
        });
      }
      return k;
    }, /* @__PURE__ */ new Map())), p = ce(O(e, "active"), n, "update:active"), y = c(() => Array.from(r.value.keys())), x = c(() => y.value.indexOf(p.value)), $ = c(() => {
      var k;
      return (k = r.value.get(p.value)) == null ? void 0 : k.id;
    });
    _e(gt, p), _e(bt, r);
    const E = f(/* @__PURE__ */ new Map()), T = f(), V = f(), Q = Ne(T, { threshold: 0.95 }), j = Ne(V, { threshold: 0.95 });
    function W(k, A) {
      const C = k;
      C && (E.value.set(A, C), A === 0 ? T.value = C : A === y.value.length - 1 && (V.value = C));
    }
    const Y = c(() => ({
      "cdx-tabs--framed": e.framed,
      "cdx-tabs--quiet": !e.framed
    }));
    function G(k) {
      if (!s.value || !i.value || !a.value)
        return 0;
      const A = o.value === "rtl" ? a.value : i.value, C = o.value === "rtl" ? i.value : a.value, I = k.offsetLeft, v = I + k.clientWidth, b = s.value.scrollLeft + A.clientWidth, D = s.value.scrollLeft + s.value.clientWidth - C.clientWidth;
      return I < b ? I - b : v > D ? v - D : 0;
    }
    function F(k) {
      var v;
      if (!s.value || !i.value || !a.value)
        return;
      const A = k === "next" && o.value === "ltr" || k === "prev" && o.value === "rtl" ? 1 : -1;
      let C = 0, I = k === "next" ? s.value.firstElementChild : s.value.lastElementChild;
      for (; I; ) {
        const b = k === "next" ? I.nextElementSibling : I.previousElementSibling;
        if (C = G(I), Math.sign(C) === A) {
          b && Math.abs(C) < 0.25 * s.value.clientWidth && (C = G(b));
          break;
        }
        I = b;
      }
      s.value.scrollBy({
        left: C,
        behavior: "smooth"
      }), (v = E.value.get(x.value)) == null || v.focus();
    }
    return te(p, () => {
      if ($.value === void 0 || !s.value || !i.value || !a.value)
        return;
      const k = document.getElementById(`${$.value}-label`);
      k && s.value.scrollBy({
        left: G(k),
        behavior: "smooth"
      });
    }), {
      activeTab: p,
      activeTabIndex: x,
      activeTabId: $,
      currentDirection: o,
      rootElement: d,
      tabListElement: s,
      prevScroller: i,
      nextScroller: a,
      rootClasses: Y,
      tabNames: y,
      tabsData: r,
      tabButtonRefs: E,
      firstLabelVisible: Q,
      lastLabelVisible: j,
      assignTemplateRefForTabButton: W,
      scrollTabs: F,
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
        var d;
        (d = this.tabButtonRefs.get(this.activeTabIndex)) == null || d.focus();
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
      const d = this.tabsData.get(this.tabNames[e + t]);
      d && (d.disabled ? this.selectNonDisabled(e + t, t, n) : this.select(d.name, n));
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
const Ql = { class: "cdx-tabs__header" }, Gl = {
  ref: "prevScroller",
  class: "cdx-tabs__prev-scroller"
}, Zl = {
  ref: "tabListElement",
  class: "cdx-tabs__list",
  role: "tablist"
}, Jl = ["id", "disabled", "aria-controls", "aria-selected", "tabindex", "onClick", "onKeyup"], Yl = {
  ref: "nextScroller",
  class: "cdx-tabs__next-scroller"
}, Xl = { class: "cdx-tabs__content" };
function ea(e, t, n, d, s, i) {
  const a = S("cdx-icon"), o = S("cdx-button");
  return u(), m("div", {
    ref: "rootElement",
    class: R(["cdx-tabs", e.rootClasses])
  }, [
    g("div", Ql, [
      ae(g("div", Gl, [
        N(o, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[0] || (t[0] = le(() => {
          }, ["prevent"])),
          onClick: t[1] || (t[1] = (l) => e.scrollTabs("prev"))
        }, {
          default: M(() => [
            N(a, { icon: e.cdxIconPrevious }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [Ie, !e.firstLabelVisible]
      ]),
      g("div", Zl, [
        (u(!0), m(ge, null, ke(e.tabsData.values(), (l, r) => (u(), m("button", {
          id: `${l.id}-label`,
          key: r,
          ref_for: !0,
          ref: (p) => e.assignTemplateRefForTabButton(p, r),
          disabled: l.disabled ? !0 : void 0,
          "aria-controls": l.id,
          "aria-selected": l.name === e.activeTab,
          tabindex: l.name === e.activeTab ? void 0 : -1,
          class: "cdx-tabs__list__item",
          role: "tab",
          onClick: le((p) => e.select(l.name), ["prevent"]),
          onKeyup: de((p) => e.select(l.name), ["enter"]),
          onKeydown: [
            t[2] || (t[2] = de(le((...p) => e.onRightArrowKeypress && e.onRightArrowKeypress(...p), ["prevent"]), ["right"])),
            t[3] || (t[3] = de(le((...p) => e.onDownArrowKeypress && e.onDownArrowKeypress(...p), ["prevent"]), ["down"])),
            t[4] || (t[4] = de(le((...p) => e.onLeftArrowKeypress && e.onLeftArrowKeypress(...p), ["prevent"]), ["left"]))
          ]
        }, [
          g("span", null, H(l.label), 1)
        ], 40, Jl))), 128))
      ], 512),
      ae(g("div", Yl, [
        N(o, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[5] || (t[5] = le(() => {
          }, ["prevent"])),
          onClick: t[6] || (t[6] = (l) => e.scrollTabs("next"))
        }, {
          default: M(() => [
            N(a, { icon: e.cdxIconNext }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [Ie, !e.lastLabelVisible]
      ])
    ]),
    g("div", Xl, [
      w(e.$slots, "default")
    ])
  ], 2);
}
const Oa = /* @__PURE__ */ q(Wl, [["render", ea]]), ta = ne(he), na = z({
  name: "CdxTextArea",
  components: { CdxIcon: ee },
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
      validator: ta
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
    const d = ce(O(e, "modelValue"), n), s = t.id, {
      computedDisabled: i,
      computedStatus: a,
      computedInputId: o
    } = ue(
      O(e, "disabled"),
      O(e, "status"),
      s
    ), l = pe(Be, void 0), r = c(() => ({
      "cdx-text-area__textarea--has-value": !!d.value,
      "cdx-text-area__textarea--is-autosize": e.autosize
    })), p = c(() => ({
      "cdx-text-area--status-default": a.value === "default",
      "cdx-text-area--status-error": a.value === "error",
      "cdx-text-area--has-start-icon": !!e.startIcon,
      "cdx-text-area--has-end-icon": !!e.endIcon
    })), {
      rootClasses: y,
      rootStyle: x,
      otherAttrs: $
    } = re(t, p), E = c(() => {
      const W = $.value, { id: Q } = W;
      return be(W, ["id"]);
    }), T = f();
    function V() {
      T.value && e.autosize && (T.value.style.height = "auto", T.value.style.height = `${T.value.scrollHeight}px`);
    }
    return {
      rootClasses: y,
      rootStyle: x,
      wrappedModel: d,
      computedDisabled: i,
      computedInputId: o,
      descriptionId: l,
      textareaClasses: r,
      otherAttrsMinusId: E,
      textarea: T,
      onInput: V
    };
  }
});
const oa = ["id", "aria-describedby", "disabled"];
function la(e, t, n, d, s, i) {
  const a = S("cdx-icon");
  return u(), m("div", {
    class: R(["cdx-text-area", e.rootClasses]),
    style: ie(e.rootStyle)
  }, [
    ae(g("textarea", J({
      id: e.computedInputId,
      ref: "textarea"
    }, e.otherAttrsMinusId, {
      "onUpdate:modelValue": t[0] || (t[0] = (o) => e.wrappedModel = o),
      class: [e.textareaClasses, "cdx-text-area__textarea"],
      "aria-describedby": e.descriptionId,
      disabled: e.computedDisabled,
      onInput: t[1] || (t[1] = (...o) => e.onInput && e.onInput(...o))
    }), null, 16, oa), [
      [Rt, e.wrappedModel]
    ]),
    e.startIcon ? (u(), L(a, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-area__icon-vue cdx-text-area__start-icon"
    }, null, 8, ["icon"])) : _("", !0),
    e.endIcon ? (u(), L(a, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-area__icon-vue cdx-text-area__end-icon"
    }, null, 8, ["icon"])) : _("", !0)
  ], 6);
}
const za = /* @__PURE__ */ q(na, [["render", la]]), aa = z({
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
  setup(e, { emit: t, slots: n, attrs: d }) {
    const s = kt(n.default, d, "CdxButton"), i = f(!1);
    return {
      rootClasses: c(() => ({
        // Quiet means frameless among other things
        "cdx-toggle-button--quiet": e.quiet,
        "cdx-toggle-button--framed": !e.quiet,
        // Provide --toggled-off too so that we can simplify selectors
        "cdx-toggle-button--toggled-on": e.modelValue,
        "cdx-toggle-button--toggled-off": !e.modelValue,
        "cdx-toggle-button--icon-only": s.value,
        "cdx-toggle-button--is-active": i.value
      })),
      onClick: () => {
        t("update:modelValue", !e.modelValue);
      },
      setActive: (r) => {
        i.value = r;
      }
    };
  }
});
const sa = ["aria-pressed", "disabled"];
function ia(e, t, n, d, s, i) {
  return u(), m("button", {
    class: R(["cdx-toggle-button", e.rootClasses]),
    "aria-pressed": e.modelValue,
    disabled: e.disabled,
    onClick: t[0] || (t[0] = (...a) => e.onClick && e.onClick(...a)),
    onKeydown: t[1] || (t[1] = de((a) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = de((a) => e.setActive(!1), ["space", "enter"]))
  }, [
    w(e.$slots, "default")
  ], 42, sa);
}
const da = /* @__PURE__ */ q(aa, [["render", ia]]), ua = z({
  name: "CdxToggleButtonGroup",
  components: {
    CdxIcon: ee,
    CdxToggleButton: da
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
    function d(s, i) {
      if (Array.isArray(e.modelValue)) {
        const a = e.modelValue.indexOf(s.value) !== -1;
        i && !a ? t("update:modelValue", e.modelValue.concat(s.value)) : !i && a && t("update:modelValue", e.modelValue.filter((o) => o !== s.value));
      } else
        i && e.modelValue !== s.value && t("update:modelValue", s.value);
    }
    return {
      getButtonLabel: wt,
      isSelected: n,
      onUpdate: d
    };
  }
});
const ra = { class: "cdx-toggle-button-group" };
function ca(e, t, n, d, s, i) {
  const a = S("cdx-icon"), o = S("cdx-toggle-button");
  return u(), m("div", ra, [
    (u(!0), m(ge, null, ke(e.buttons, (l) => (u(), L(o, {
      key: l.value,
      "model-value": e.isSelected(l),
      disabled: l.disabled || e.disabled,
      "aria-label": l.ariaLabel,
      "onUpdate:modelValue": (r) => e.onUpdate(l, r)
    }, {
      default: M(() => [
        w(e.$slots, "default", {
          button: l,
          selected: e.isSelected(l)
        }, () => [
          l.icon ? (u(), L(a, {
            key: 0,
            icon: l.icon
          }, null, 8, ["icon"])) : _("", !0),
          se(" " + H(e.getButtonLabel(l)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["model-value", "disabled", "aria-label", "onUpdate:modelValue"]))), 128))
  ]);
}
const qa = /* @__PURE__ */ q(ua, [["render", ca]]), pa = z({
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
  setup(e, { emit: t, slots: n, attrs: d }) {
    var E;
    Ze((E = n.default) == null ? void 0 : E.call(n), d, "CdxToggleSwitch");
    const s = f(), i = Z("toggle-switch"), a = Z("description"), o = c(() => ({
      "cdx-toggle-switch--align-switch": e.alignSwitch
    })), {
      rootClasses: l,
      rootStyle: r,
      otherAttrs: p
    } = re(d, o), { computedDisabled: y } = ue(O(e, "disabled")), x = ce(O(e, "modelValue"), t);
    return {
      input: s,
      inputId: i,
      descriptionId: a,
      rootClasses: l,
      rootStyle: r,
      otherAttrs: p,
      computedDisabled: y,
      wrappedModel: x,
      clickInput: () => {
        s.value.click();
      }
    };
  }
});
const fa = ["id", "aria-describedby", "value", "disabled"], ha = /* @__PURE__ */ g("span", { class: "cdx-toggle-switch__switch" }, [
  /* @__PURE__ */ g("span", { class: "cdx-toggle-switch__switch__grip" })
], -1);
function ma(e, t, n, d, s, i) {
  const a = S("cdx-label");
  return u(), m("span", {
    class: R(["cdx-toggle-switch", e.rootClasses]),
    style: ie(e.rootStyle)
  }, [
    ae(g("input", J({
      id: e.inputId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (o) => e.wrappedModel = o),
      class: "cdx-toggle-switch__input",
      type: "checkbox",
      role: "switch",
      "aria-describedby": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      value: e.inputValue,
      disabled: e.computedDisabled
    }, e.otherAttrs, {
      onKeydown: t[1] || (t[1] = de(le((...o) => e.clickInput && e.clickInput(...o), ["prevent"]), ["enter"]))
    }), null, 16, fa), [
      [pt, e.wrappedModel]
    ]),
    ha,
    e.$slots.default && e.$slots.default().length ? (u(), L(a, {
      key: 0,
      class: "cdx-toggle-switch__label",
      "input-id": e.inputId,
      "description-id": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      "visually-hidden": e.hideLabel,
      disabled: e.computedDisabled
    }, xe({
      default: M(() => [
        w(e.$slots, "default")
      ]),
      _: 2
    }, [
      e.$slots.description && e.$slots.description().length > 0 ? {
        name: "description",
        fn: M(() => [
          w(e.$slots, "description")
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["input-id", "description-id", "visually-hidden", "disabled"])) : _("", !0)
  ], 6);
}
const Na = /* @__PURE__ */ q(pa, [["render", ma]]), va = z({
  name: "CdxTypeaheadSearch",
  components: {
    CdxIcon: ee,
    CdxMenu: Te,
    CdxSearchInput: Rl
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
      default: mn
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
  setup(e, { attrs: t, emit: n, slots: d }) {
    const s = f(), i = f(), a = Z("typeahead-search-menu"), o = f(!1), l = f(!1), r = f(!1), p = f(!1), y = f(e.initialInputValue), x = f(""), $ = c(() => {
      var K, h;
      return (h = (K = i.value) == null ? void 0 : K.getHighlightedMenuItem()) == null ? void 0 : h.id;
    }), E = f(null), T = c(() => ({
      "cdx-typeahead-search__menu-message--has-thumbnail": e.showThumbnail
    })), V = c(
      () => e.searchResults.find(
        (K) => K.value === E.value
      )
    ), Q = c(
      () => e.searchFooterUrl ? { value: $e, url: e.searchFooterUrl } : void 0
    ), j = c(() => ({
      "cdx-typeahead-search--show-thumbnail": e.showThumbnail,
      "cdx-typeahead-search--expanded": o.value,
      "cdx-typeahead-search--auto-expand-width": e.showThumbnail && e.autoExpandWidth
    })), {
      rootClasses: W,
      rootStyle: Y,
      otherAttrs: G
    } = re(t, j);
    function F(K) {
      return K;
    }
    const k = c(() => ({
      visibleItemLimit: e.visibleItemLimit,
      showThumbnail: e.showThumbnail,
      // In case search queries aren't highlighted, default to a bold label.
      boldLabel: !0,
      hideDescriptionOverflow: !0
    }));
    let A, C;
    function I(K, h = !1) {
      V.value && V.value.label !== K && V.value.value !== K && (E.value = null), C !== void 0 && (clearTimeout(C), C = void 0), K === "" ? o.value = !1 : (l.value = !0, d["search-results-pending"] && (C = setTimeout(() => {
        p.value && (o.value = !0), r.value = !0;
      }, vn))), A !== void 0 && (clearTimeout(A), A = void 0);
      const B = () => {
        n("input", K);
      };
      h ? B() : A = setTimeout(() => {
        B();
      }, e.debounceInterval);
    }
    function v(K) {
      if (K === $e) {
        E.value = null, y.value = x.value;
        return;
      }
      E.value = K, K !== null && (y.value = V.value ? V.value.label || String(V.value.value) : "");
    }
    function b() {
      p.value = !0, (x.value || r.value) && (o.value = !0);
    }
    function D() {
      p.value = !1, o.value = !1;
    }
    function U(K) {
      const P = K, { id: h } = P, B = be(P, ["id"]);
      if (B.value === $e) {
        n("search-result-click", {
          searchResult: null,
          index: e.searchResults.length,
          numberOfResults: e.searchResults.length
        });
        return;
      }
      ve(B);
    }
    function ve(K) {
      const h = {
        searchResult: K,
        index: e.searchResults.findIndex(
          (B) => B.value === K.value
        ),
        numberOfResults: e.searchResults.length
      };
      n("search-result-click", h);
    }
    function Le(K) {
      if (K.value === $e) {
        y.value = x.value;
        return;
      }
      y.value = K.value ? K.label || String(K.value) : "";
    }
    function De(K) {
      var h;
      o.value = !1, (h = i.value) == null || h.clearActive(), U(K);
    }
    function Ke(K) {
      if (V.value)
        ve(V.value), K.stopPropagation(), window.location.assign(V.value.url), K.preventDefault();
      else {
        const h = {
          searchResult: null,
          index: -1,
          numberOfResults: e.searchResults.length
        };
        n("submit", h);
      }
    }
    function Ee(K) {
      if (!i.value || !x.value || K.key === " ")
        return;
      const h = i.value.getHighlightedMenuItem(), B = i.value.getHighlightedViaKeyboard();
      switch (K.key) {
        case "Enter":
          h && (h.value === $e && B ? window.location.assign(e.searchFooterUrl) : i.value.delegateKeyNavigation(K, { prevent: !1 })), o.value = !1;
          break;
        case "Tab":
          o.value = !1;
          break;
        default:
          i.value.delegateKeyNavigation(K);
          break;
      }
    }
    return fe(() => {
      e.initialInputValue && I(e.initialInputValue, !0);
    }), te(O(e, "searchResults"), () => {
      x.value = y.value.trim(), p.value && l.value && x.value.length > 0 && (o.value = !0), C !== void 0 && (clearTimeout(C), C = void 0), l.value = !1, r.value = !1;
    }), {
      form: s,
      menu: i,
      menuId: a,
      highlightedId: $,
      selection: E,
      menuMessageClass: T,
      footer: Q,
      asSearchResult: F,
      inputValue: y,
      searchQuery: x,
      expanded: o,
      showPending: r,
      rootClasses: W,
      rootStyle: Y,
      otherAttrs: G,
      menuConfig: k,
      onUpdateInputValue: I,
      onUpdateMenuSelection: v,
      onFocus: b,
      onBlur: D,
      onSearchResultClick: U,
      onSearchResultKeyboardNavigation: Le,
      onSearchFooterClick: De,
      onSubmit: Ke,
      onKeydown: Ee,
      MenuFooterValue: $e,
      articleIcon: Yt
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
const ba = ["id", "action"], ga = { class: "cdx-typeahead-search__menu-message__text" }, ya = { class: "cdx-typeahead-search__menu-message__text" }, $a = ["href", "onClickCapture"], _a = { class: "cdx-menu-item__text cdx-typeahead-search__search-footer__text" }, Ca = { class: "cdx-typeahead-search__search-footer__query" };
function Ia(e, t, n, d, s, i) {
  const a = S("cdx-icon"), o = S("cdx-menu"), l = S("cdx-search-input");
  return u(), m("div", {
    class: R(["cdx-typeahead-search", e.rootClasses]),
    style: ie(e.rootStyle)
  }, [
    g("form", {
      id: e.id,
      ref: "form",
      class: "cdx-typeahead-search__form",
      action: e.formAction,
      onSubmit: t[4] || (t[4] = (...r) => e.onSubmit && e.onSubmit(...r))
    }, [
      N(l, J({
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
        default: M(() => [
          N(o, J({
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
            pending: M(() => [
              g("div", {
                class: R(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                g("span", ga, [
                  w(e.$slots, "search-results-pending")
                ])
              ], 2)
            ]),
            "no-results": M(() => [
              g("div", {
                class: R(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                g("span", ya, [
                  w(e.$slots, "search-no-results-text")
                ])
              ], 2)
            ]),
            default: M(({ menuItem: r, active: p }) => [
              r.value === e.MenuFooterValue ? (u(), m("a", {
                key: 0,
                class: R(["cdx-menu-item__content cdx-typeahead-search__search-footer", {
                  "cdx-typeahead-search__search-footer__active": p
                }]),
                href: e.asSearchResult(r).url,
                onClickCapture: le((y) => e.onSearchFooterClick(e.asSearchResult(r)), ["stop"])
              }, [
                N(a, {
                  class: "cdx-menu-item__thumbnail cdx-typeahead-search__search-footer__icon",
                  icon: e.articleIcon
                }, null, 8, ["icon"]),
                g("span", _a, [
                  w(e.$slots, "search-footer-text", { searchQuery: e.searchQuery }, () => [
                    g("strong", Ca, H(e.searchQuery), 1)
                  ])
                ])
              ], 42, $a)) : _("", !0)
            ]),
            _: 3
          }, 16, ["id", "expanded", "show-pending", "selected", "menu-items", "footer", "search-query", "show-no-results-slot", "aria-label", "onUpdate:selected", "onMenuItemKeyboardNavigation"])
        ]),
        _: 3
      }, 16, ["modelValue", "button-label", "aria-controls", "aria-expanded", "aria-activedescendant", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
      w(e.$slots, "default")
    ], 40, ba)
  ], 6);
}
const Ha = /* @__PURE__ */ q(va, [["render", Ia]]);
export {
  Sa as CdxAccordion,
  me as CdxButton,
  xa as CdxButtonGroup,
  Aa as CdxCard,
  Ba as CdxCheckbox,
  Ma as CdxChipInput,
  Va as CdxCombobox,
  La as CdxDialog,
  Da as CdxField,
  ee as CdxIcon,
  Ka as CdxInfoChip,
  Me as CdxLabel,
  Ea as CdxLookup,
  Te as CdxMenu,
  Fo as CdxMenuItem,
  bl as CdxMessage,
  Ho as CdxProgressBar,
  Fa as CdxRadio,
  Rl as CdxSearchInput,
  Ao as CdxSearchResultTitle,
  Ra as CdxSelect,
  Ul as CdxTab,
  Oa as CdxTabs,
  za as CdxTextArea,
  Je as CdxTextInput,
  St as CdxThumbnail,
  da as CdxToggleButton,
  qa as CdxToggleButtonGroup,
  Na as CdxToggleSwitch,
  Ha as CdxTypeaheadSearch,
  Ta as stringHelpers,
  We as useComputedDirection,
  xt as useComputedDisabled,
  dn as useComputedLanguage,
  ue as useFieldData,
  Z as useGeneratedId,
  Ne as useIntersectionObserver,
  ce as useModelWrapper,
  Ve as useResizeObserver,
  Qe as useSlotContents,
  re as useSplitAttributes,
  Ge as useWarnOnce
};
