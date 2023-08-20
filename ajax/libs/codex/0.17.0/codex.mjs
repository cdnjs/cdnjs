var kt = Object.defineProperty, St = Object.defineProperties;
var wt = Object.getOwnPropertyDescriptors;
var Ce = Object.getOwnPropertySymbols;
var Je = Object.prototype.hasOwnProperty, Xe = Object.prototype.propertyIsEnumerable;
var Ze = (e, t, n) => t in e ? kt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Ye = (e, t) => {
  for (var n in t || (t = {}))
    Je.call(t, n) && Ze(e, n, t[n]);
  if (Ce)
    for (var n of Ce(t))
      Xe.call(t, n) && Ze(e, n, t[n]);
  return e;
}, et = (e, t) => St(e, wt(t));
var pe = (e, t) => {
  var n = {};
  for (var s in e)
    Je.call(e, s) && t.indexOf(s) < 0 && (n[s] = e[s]);
  if (e != null && Ce)
    for (var s of Ce(e))
      t.indexOf(s) < 0 && Xe.call(e, s) && (n[s] = e[s]);
  return n;
};
var Ke = (e, t, n) => new Promise((s, a) => {
  var d = (o) => {
    try {
      i(n.next(o));
    } catch (r) {
      a(r);
    }
  }, l = (o) => {
    try {
      i(n.throw(o));
    } catch (r) {
      a(r);
    }
  }, i = (o) => o.done ? s(o.value) : Promise.resolve(o.value).then(d, l);
  i((n = n.apply(e, t)).next());
});
import { ref as m, onMounted as ce, defineComponent as E, computed as p, openBlock as u, createElementBlock as h, normalizeClass as K, toDisplayString as N, createCommentVNode as _, Comment as xt, warn as Oe, withKeys as te, renderSlot as I, getCurrentInstance as Mt, resolveComponent as S, createBlock as T, resolveDynamicComponent as ke, withCtx as B, createVNode as O, createElementVNode as v, withDirectives as se, vShow as $e, Fragment as ge, renderList as Se, createTextVNode as oe, Transition as Ne, normalizeStyle as le, inject as re, toRef as R, mergeProps as Z, withModifiers as ee, vModelCheckbox as it, createSlots as we, onUnmounted as qe, watch as ne, nextTick as ye, vModelDynamic as Bt, useCssVars as He, toRefs as At, provide as be, vModelRadio as Tt, vModelText as Lt } from "vue";
const Vt = '<path d="M11.53 2.3A1.85 1.85 0 0010 1.21 1.85 1.85 0 008.48 2.3L.36 16.36C-.48 17.81.21 19 1.88 19h16.24c1.67 0 2.36-1.19 1.52-2.64zM11 16H9v-2h2zm0-4H9V6h2z"/>', Dt = '<path d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"/><circle cx="10" cy="10" r="3"/>', Kt = '<path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"/>', Et = '<path d="m4.34 2.93 12.73 12.73-1.41 1.41L2.93 4.35z"/><path d="M17.07 4.34 4.34 17.07l-1.41-1.41L15.66 2.93z"/>', Ft = '<path d="M13.728 1H6.272L1 6.272v7.456L6.272 19h7.456L19 13.728V6.272zM11 15H9v-2h2zm0-4H9V5h2z"/>', Rt = '<path d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"/>', zt = '<path d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"/><path d="M19 5H1V3h18zm0 12H1v-2h18z"/>', Ot = '<path d="M8 19a1 1 0 001 1h2a1 1 0 001-1v-1H8zm9-12a7 7 0 10-12 4.9S7 14 7 15v1a1 1 0 001 1h4a1 1 0 001-1v-1c0-1 2-3.1 2-3.1A7 7 0 0017 7z"/>', Nt = '<path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM9 5h2v2H9zm0 4h2v6H9z"/>', qt = '<path d="M7 1 5.6 2.5 13 10l-7.4 7.5L7 19l9-9z"/>', Ht = '<path d="m4 10 9 9 1.4-1.5L7 10l7.4-7.5L13 1z"/>', jt = '<path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"/>', Ut = '<path d="M10 20a10 10 0 010-20 10 10 0 110 20Zm-2-5 9-8.5L15.5 5 8 12 4.5 8.5 3 10l5 5Z"/>', dt = Vt, Wt = Dt, Pt = Kt, ut = Et, rt = Ft, je = Rt, Qt = zt, Gt = {
  langCodeMap: {
    ar: Ot
  },
  default: Nt
}, Zt = {
  ltr: qt,
  shouldFlip: !0
}, Jt = {
  ltr: Ht,
  shouldFlip: !0
}, Xt = jt, ct = Ut;
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
function pt(e) {
  const t = m(null);
  return ce(() => {
    const n = window.getComputedStyle(e.value).direction;
    t.value = n === "ltr" || n === "rtl" ? n : null;
  }), t;
}
function tn(e) {
  const t = m("");
  return ce(() => {
    let n = e.value;
    for (; n && n.lang === ""; )
      n = n.parentElement;
    t.value = n ? n.lang : null;
  }), t;
}
function X(e) {
  return (t) => typeof t == "string" && e.indexOf(t) !== -1;
}
const Ee = "cdx", nn = [
  "default",
  "progressive",
  "destructive"
], on = [
  "normal",
  "primary",
  "quiet"
], ln = [
  "medium",
  "large"
], an = [
  "x-small",
  "small",
  "medium"
], sn = [
  "notice",
  "warning",
  "error",
  "success"
], ft = X(sn), dn = [
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
], fe = [
  "default",
  "error"
], un = 120, rn = 500, ve = "cdx-menu-footer-item", mt = Symbol("CdxTabs"), ht = Symbol("CdxActiveTab"), vt = Symbol("CdxId"), xe = Symbol("CdxDescriptionId"), bt = Symbol("CdxStatus"), gt = Symbol("CdxDisabled"), cn = X(an), pn = E({
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
      validator: cn
    }
  },
  setup(e) {
    const t = m(), n = pt(t), s = tn(t), a = p(() => e.dir || n.value), d = p(() => e.lang || s.value), l = p(() => ({
      "cdx-icon--flipped": a.value === "rtl" && d.value !== null && en(e.icon, d.value),
      [`cdx-icon--${e.size}`]: !0
    })), i = p(
      () => Yt(e.icon, d.value || "", a.value || "ltr")
    ), o = p(() => typeof i.value == "string" ? i.value : ""), r = p(() => typeof i.value != "string" ? i.value.path : "");
    return {
      rootElement: t,
      rootClasses: l,
      iconSvg: o,
      iconPath: r
    };
  }
});
const F = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, fn = ["aria-hidden"], mn = { key: 0 }, hn = ["innerHTML"], vn = ["d"];
function bn(e, t, n, s, a, d) {
  return u(), h("span", {
    ref: "rootElement",
    class: K(["cdx-icon", e.rootClasses])
  }, [
    (u(), h("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      "aria-hidden": e.iconLabel ? void 0 : !0
    }, [
      e.iconLabel ? (u(), h("title", mn, N(e.iconLabel), 1)) : _("", !0),
      e.iconSvg ? (u(), h("g", {
        key: 1,
        innerHTML: e.iconSvg
      }, null, 8, hn)) : (u(), h("path", {
        key: 2,
        d: e.iconPath
      }, null, 8, vn))
    ], 8, fn))
  ], 2);
}
const J = /* @__PURE__ */ F(pn, [["render", bn]]), gn = X(nn), yn = X(on), $n = X(ln), _n = (e) => {
  !e["aria-label"] && !e["aria-hidden"] && Oe(`CdxButton: Icon-only buttons require one of the following attribute: aria-label or aria-hidden.
		See documentation on https://doc.wikimedia.org/codex/latest/components/demos/button.html#icon-only-button-1`);
};
function Re(e) {
  const t = [];
  for (const n of e)
    typeof n == "string" && n.trim() !== "" ? t.push(n) : Array.isArray(n) ? t.push(...Re(n)) : typeof n == "object" && n && (// HTML tag
    typeof n.type == "string" || // Component
    typeof n.type == "object" ? t.push(n) : n.type !== xt && (typeof n.children == "string" && n.children.trim() !== "" ? t.push(n.children) : Array.isArray(n.children) && t.push(...Re(n.children))));
  return t;
}
const In = (e, t) => {
  if (!e)
    return !1;
  const n = Re(e);
  if (n.length !== 1)
    return !1;
  const s = n[0], a = typeof s == "object" && typeof s.type == "object" && "name" in s.type && s.type.name === J.name, d = typeof s == "object" && s.type === "svg";
  return a || d ? (_n(t), !0) : !1;
}, Cn = E({
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
      validator: gn
    },
    /**
     * Visual prominence of the button.
     *
     * @values 'normal', 'primary', 'quiet'
     */
    weight: {
      type: String,
      default: "normal",
      validator: yn
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
      validator: $n
    }
  },
  emits: ["click"],
  setup(e, { emit: t, slots: n, attrs: s }) {
    const a = m(!1);
    return {
      rootClasses: p(() => {
        var o;
        return {
          [`cdx-button--action-${e.action}`]: !0,
          [`cdx-button--weight-${e.weight}`]: !0,
          [`cdx-button--size-${e.size}`]: !0,
          "cdx-button--framed": e.weight !== "quiet",
          "cdx-button--icon-only": In((o = n.default) == null ? void 0 : o.call(n), s),
          "cdx-button--is-active": a.value
        };
      }),
      onClick: (o) => {
        t("click", o);
      },
      setActive: (o) => {
        a.value = o;
      }
    };
  }
});
function kn(e, t, n, s, a, d) {
  return u(), h("button", {
    class: K(["cdx-button", e.rootClasses]),
    onClick: t[0] || (t[0] = (...l) => e.onClick && e.onClick(...l)),
    onKeydown: t[1] || (t[1] = te((l) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = te((l) => e.setActive(!1), ["space", "enter"]))
  }, [
    I(e.$slots, "default")
  ], 34);
}
const me = /* @__PURE__ */ F(Cn, [["render", kn]]);
let Fe = 0;
function W(e) {
  const t = Mt(), n = (t == null ? void 0 : t.props.id) || (t == null ? void 0 : t.attrs.id);
  return e ? `${Ee}-${e}-${Fe++}` : n ? `${Ee}-${n}-${Fe++}` : `${Ee}-${Fe++}`;
}
const Sn = E({
  name: "CdxAccordion",
  components: { CdxButton: me, CdxIcon: J },
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
    const n = m(!1), s = W("accordion"), a = W("accordion-panel"), d = () => {
      n.value = !n.value;
    }, l = () => {
      t("action-button-click");
    }, i = p(() => e.actionIcon && (n.value || e.actionAlwaysVisible)), o = p(() => ({
      "cdx-accordion--has-icon": i
    }));
    return {
      cdxIconExpand: je,
      emitActionButtonClick: l,
      isExpanded: n,
      rootClasses: o,
      shouldShowActionButton: i,
      toggle: d,
      accordionId: s,
      accordionPanelId: a
    };
  }
});
const wn = { class: "cdx-accordion__toggle__title" }, xn = { class: "cdx-accordion__toggle__title-text" }, Mn = { class: "cdx-accordion__toggle__description" }, Bn = ["id", "aria-labelledby", "aria-hidden"];
function An(e, t, n, s, a, d) {
  const l = S("cdx-icon"), i = S("cdx-button");
  return u(), h("div", {
    class: K(["cdx-accordion", e.rootClasses])
  }, [
    (u(), T(ke(e.headingLevel), { class: "cdx-accordion__header" }, {
      default: B(() => [
        O(i, {
          id: e.accordionId,
          "aria-expanded": e.isExpanded,
          "aria-controls": e.accordionPanelId,
          class: "cdx-accordion__toggle",
          type: "button",
          weight: "quiet",
          onClick: e.toggle
        }, {
          default: B(() => [
            v("span", wn, [
              O(l, {
                class: "cdx-accordion__toggle__title-icon",
                icon: e.cdxIconExpand,
                size: "small"
              }, null, 8, ["icon"]),
              v("span", xn, [
                I(e.$slots, "title")
              ])
            ]),
            v("span", Mn, [
              I(e.$slots, "description")
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
          default: B(() => [
            O(l, {
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
    se(v("div", {
      id: e.accordionPanelId,
      "aria-labelledby": e.accordionId,
      "aria-hidden": e.isExpanded ? void 0 : !0,
      class: "cdx-accordion__content",
      role: "region"
    }, [
      I(e.$slots, "default")
    ], 8, Bn), [
      [$e, e.isExpanded]
    ])
  ], 2);
}
const sa = /* @__PURE__ */ F(Sn, [["render", An]]);
function yt(e) {
  return e.label === void 0 ? e.value : e.label === null ? "" : e.label;
}
const Tn = E({
  name: "CdxButtonGroup",
  components: {
    CdxButton: me,
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
      getButtonLabel: yt
    };
  }
});
const Ln = { class: "cdx-button-group" };
function Vn(e, t, n, s, a, d) {
  const l = S("cdx-icon"), i = S("cdx-button");
  return u(), h("div", Ln, [
    (u(!0), h(ge, null, Se(e.buttons, (o) => (u(), T(i, {
      key: o.value,
      disabled: o.disabled || e.disabled,
      "aria-label": o.ariaLabel,
      onClick: (r) => e.$emit("click", o.value)
    }, {
      default: B(() => [
        I(e.$slots, "default", { button: o }, () => [
          o.icon ? (u(), T(l, {
            key: 0,
            icon: o.icon
          }, null, 8, ["icon"])) : _("", !0),
          oe(" " + N(e.getButtonLabel(o)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["disabled", "aria-label", "onClick"]))), 128))
  ]);
}
const ia = /* @__PURE__ */ F(Tn, [["render", Vn]]), Dn = E({
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
      default: Qt
    }
  },
  setup: (e) => {
    const t = m(!1), n = m({}), s = (a) => {
      const d = a.replace(/([\\"\n])/g, "\\$1"), l = new Image();
      l.onload = () => {
        n.value = { backgroundImage: `url("${d}")` }, t.value = !0;
      }, l.onerror = () => {
        t.value = !1;
      }, l.src = d;
    };
    return ce(() => {
      var a;
      (a = e.thumbnail) != null && a.url && s(e.thumbnail.url);
    }), {
      thumbnailStyle: n,
      thumbnailLoaded: t
    };
  }
});
const Kn = { class: "cdx-thumbnail" }, En = {
  key: 0,
  class: "cdx-thumbnail__placeholder"
};
function Fn(e, t, n, s, a, d) {
  const l = S("cdx-icon");
  return u(), h("span", Kn, [
    e.thumbnailLoaded ? _("", !0) : (u(), h("span", En, [
      O(l, {
        icon: e.placeholderIcon,
        class: "cdx-thumbnail__placeholder__icon--vue"
      }, null, 8, ["icon"])
    ])),
    O(Ne, { name: "cdx-thumbnail__image" }, {
      default: B(() => [
        e.thumbnailLoaded ? (u(), h("span", {
          key: 0,
          style: le(e.thumbnailStyle),
          class: "cdx-thumbnail__image"
        }, null, 4)) : _("", !0)
      ]),
      _: 1
    })
  ]);
}
const $t = /* @__PURE__ */ F(Dn, [["render", Fn]]), Rn = E({
  name: "CdxCard",
  components: { CdxIcon: J, CdxThumbnail: $t },
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
    const t = p(() => !!e.url), n = p(() => t.value ? "a" : "span"), s = p(() => t.value ? e.url : void 0);
    return {
      isLink: t,
      contentTag: n,
      cardLink: s
    };
  }
});
const zn = { class: "cdx-card__text" }, On = { class: "cdx-card__text__title" }, Nn = {
  key: 0,
  class: "cdx-card__text__description"
}, qn = {
  key: 1,
  class: "cdx-card__text__supporting-text"
};
function Hn(e, t, n, s, a, d) {
  const l = S("cdx-thumbnail"), i = S("cdx-icon");
  return u(), T(ke(e.contentTag), {
    href: e.cardLink,
    class: K(["cdx-card", {
      "cdx-card--is-link": e.isLink,
      // Include dynamic classes in the template so that $slots is reactive.
      "cdx-card--title-only": !e.$slots.description && !e.$slots["supporting-text"]
    }])
  }, {
    default: B(() => [
      e.thumbnail || e.forceThumbnail ? (u(), T(l, {
        key: 0,
        thumbnail: e.thumbnail,
        "placeholder-icon": e.customPlaceholderIcon,
        class: "cdx-card__thumbnail"
      }, null, 8, ["thumbnail", "placeholder-icon"])) : e.icon ? (u(), T(i, {
        key: 1,
        icon: e.icon,
        class: "cdx-card__icon"
      }, null, 8, ["icon"])) : _("", !0),
      v("span", zn, [
        v("span", On, [
          I(e.$slots, "title")
        ]),
        e.$slots.description ? (u(), h("span", Nn, [
          I(e.$slots, "description")
        ])) : _("", !0),
        e.$slots["supporting-text"] ? (u(), h("span", qn, [
          I(e.$slots, "supporting-text")
        ])) : _("", !0)
      ])
    ]),
    _: 3
  }, 8, ["href", "class"]);
}
const da = /* @__PURE__ */ F(Rn, [["render", Hn]]);
function _t(e) {
  const t = re(gt, m(!1));
  return p(() => t.value || e.value);
}
function ie(e, t, n) {
  const s = _t(e), a = re(bt, m("default")), d = p(() => t != null && t.value && t.value !== "default" ? t.value : a.value), l = re(vt, void 0), i = p(() => l || n);
  return {
    computedDisabled: s,
    computedStatus: d,
    computedInputId: i
  };
}
function de(e, t = p(() => ({}))) {
  const n = p(() => {
    const d = pe(t.value, []);
    return e.class && e.class.split(" ").forEach((i) => {
      d[i] = !0;
    }), d;
  }), s = p(() => {
    if ("style" in e)
      return e.style;
  }), a = p(() => {
    const o = e, { class: d, style: l } = o;
    return pe(o, ["class", "style"]);
  });
  return {
    rootClasses: n,
    rootStyle: s,
    otherAttrs: a
  };
}
const jn = E({
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
    const { computedDisabled: n } = ie(R(e, "disabled")), s = p(() => ({
      "cdx-label--visually-hidden": e.visuallyHidden,
      "cdx-label--disabled": n.value
    })), {
      rootClasses: a,
      rootStyle: d,
      otherAttrs: l
    } = de(t, s);
    return {
      rootClasses: a,
      rootStyle: d,
      otherAttrs: l
    };
  }
});
const Un = ["for"], Wn = { class: "cdx-label__label__text" }, Pn = {
  key: 1,
  class: "cdx-label__label__optional-flag"
}, Qn = ["id"], Gn = { class: "cdx-label__label" }, Zn = { class: "cdx-label__label__text" }, Jn = {
  key: 1,
  class: "cdx-label__label__optional-flag"
}, Xn = {
  key: 0,
  class: "cdx-label__description"
};
function Yn(e, t, n, s, a, d) {
  const l = S("cdx-icon");
  return e.isLegend ? (u(), h("legend", Z({
    key: 1,
    class: ["cdx-label cdx-label--is-legend", e.rootClasses],
    style: e.rootStyle
  }, e.otherAttrs), [
    v("span", Gn, [
      e.icon ? (u(), T(l, {
        key: 0,
        icon: e.icon,
        class: "cdx-label__label__icon"
      }, null, 8, ["icon"])) : _("", !0),
      v("span", Zn, [
        I(e.$slots, "default")
      ]),
      e.optionalFlag ? (u(), h("span", Jn, N(" ") + " " + N(e.optionalFlag), 1)) : _("", !0)
    ]),
    e.$slots.description && e.$slots.description().length > 0 ? (u(), h("span", Xn, [
      I(e.$slots, "description")
    ])) : _("", !0)
  ], 16)) : (u(), h("div", {
    key: 0,
    class: K(["cdx-label", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    v("label", Z({
      class: "cdx-label__label",
      for: e.inputId ? e.inputId : void 0
    }, e.otherAttrs), [
      e.icon ? (u(), T(l, {
        key: 0,
        icon: e.icon,
        class: "cdx-label__label__icon"
      }, null, 8, ["icon"])) : _("", !0),
      v("span", Wn, [
        I(e.$slots, "default")
      ]),
      e.optionalFlag ? (u(), h("span", Pn, N(" ") + " " + N(e.optionalFlag), 1)) : _("", !0)
    ], 16, Un),
    e.$slots.description && e.$slots.description().length > 0 ? (u(), h("span", {
      key: 0,
      id: e.descriptionId || void 0,
      class: "cdx-label__description"
    }, [
      I(e.$slots, "description")
    ], 8, Qn)) : _("", !0)
  ], 6));
}
const Me = /* @__PURE__ */ F(jn, [["render", Yn]]);
function Ue(e, t, n) {
  e && e.length > 0 || (t == null ? void 0 : t["aria-label"]) || (t == null ? void 0 : t["aria-labelledby"]) || Oe(`${n}: Inputs must have an associated label. Provide one of the following:
 - A label via the appropriate slot
 - An \`aria-label\` attribute set to the label text
 - An \`aria-labelledby\` attribute set to the ID of the label element`);
}
function ue(e, t, n) {
  return p({
    get: () => e.value,
    set: (s) => (
      // If eventName is undefined, then 'update:modelValue' must be a valid EventName,
      // but TypeScript's type analysis isn't clever enough to realize that
      t(n || "update:modelValue", s)
    )
  });
}
const eo = E({
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
    var $;
    Ue(($ = n.default) == null ? void 0 : $.call(n), s, "CdxCheckbox");
    const a = p(() => ({
      "cdx-checkbox--inline": e.inline
    })), { computedDisabled: d } = ie(R(e, "disabled")), l = m(), i = W("checkbox"), o = W("description"), r = () => {
      l.value.click();
    }, f = ue(R(e, "modelValue"), t);
    return {
      rootClasses: a,
      computedDisabled: d,
      input: l,
      checkboxId: i,
      descriptionId: o,
      clickInput: r,
      wrappedModel: f
    };
  }
});
const to = ["id", "aria-describedby", "value", "disabled", ".indeterminate"], no = /* @__PURE__ */ v("span", { class: "cdx-checkbox__icon" }, null, -1);
function oo(e, t, n, s, a, d) {
  const l = S("cdx-label");
  return u(), h("span", {
    class: K(["cdx-checkbox", e.rootClasses])
  }, [
    se(v("input", {
      id: e.checkboxId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wrappedModel = i),
      class: "cdx-checkbox__input",
      type: "checkbox",
      "aria-describedby": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      value: e.inputValue,
      disabled: e.computedDisabled,
      ".indeterminate": e.indeterminate,
      onKeydown: t[1] || (t[1] = te(ee((...i) => e.clickInput && e.clickInput(...i), ["prevent"]), ["enter"]))
    }, null, 40, to), [
      [it, e.wrappedModel]
    ]),
    no,
    e.$slots.default && e.$slots.default().length ? (u(), T(l, {
      key: 0,
      class: "cdx-checkbox__label",
      "input-id": e.checkboxId,
      "description-id": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      disabled: e.computedDisabled
    }, we({
      default: B(() => [
        I(e.$slots, "default")
      ]),
      _: 2
    }, [
      e.$slots.description && e.$slots.description().length > 0 ? {
        name: "description",
        fn: B(() => [
          I(e.$slots, "description")
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["input-id", "description-id", "disabled"])) : _("", !0)
  ], 2);
}
const ua = /* @__PURE__ */ F(eo, [["render", oo]]), lo = {
  error: rt,
  warning: dt,
  success: ct
}, ao = E({
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
      validator: ft
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
    const t = p(() => ({
      [`cdx-info-chip__icon--${e.status}`]: !0
    })), n = p(
      () => e.status === "notice" ? e.icon : lo[e.status]
    );
    return {
      iconClass: t,
      computedIcon: n
    };
  }
});
const so = { class: "cdx-info-chip" }, io = { class: "cdx-info-chip--text" };
function uo(e, t, n, s, a, d) {
  const l = S("cdx-icon");
  return u(), h("div", so, [
    e.computedIcon ? (u(), T(l, {
      key: 0,
      class: K(["cdx-info-chip__icon", e.iconClass]),
      icon: e.computedIcon
    }, null, 8, ["class", "icon"])) : _("", !0),
    v("span", io, [
      I(e.$slots, "default")
    ])
  ]);
}
const ra = /* @__PURE__ */ F(ao, [["render", uo]]);
function It(e) {
  return e.replace(/([\\{}()|.?*+\-^$[\]])/g, "\\$1");
}
const ro = "[̀-ͯ҃-҉֑-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣঁ-ঃ়া-ৄেৈো-্ৗৢৣ৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑੰੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣஂா-ூெ-ைொ-்ௗఀ-ఄా-ౄె-ైొ-్ౕౖౢౣಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣංඃ්ා-ුූෘ-ෟෲෳัิ-ฺ็-๎ັິ-ູົຼ່-ໍ༹༘༙༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏႚ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝᠋-᠍ᢅᢆᢩᤠ-ᤫᤰ-᤻ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼᪰-᪾ᬀ-ᬄ᬴-᭄᭫-᭳ᮀ-ᮂᮡ-ᮭ᯦-᯳ᰤ-᰷᳐-᳔᳒-᳨᳭ᳲ-᳴᳷-᳹᷀-᷹᷻-᷿⃐-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯-꙲ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣠-꣱ꣿꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀ꧥꨩ-ꨶꩃꩌꩍꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭ﬞ︀-️︠-︯]";
function Ct(e, t) {
  if (!e)
    return [t, "", ""];
  const n = It(e), s = new RegExp(
    // Per https://www.regular-expressions.info/unicode.html, "any code point that is not a
    // combining mark can be followed by any number of combining marks." See also the
    // discussion in https://phabricator.wikimedia.org/T35242.
    n + ro + "*",
    "i"
  ).exec(t);
  if (!s || s.index === void 0)
    return [t, "", ""];
  const a = s.index, d = a + s[0].length, l = t.slice(a, d), i = t.slice(0, a), o = t.slice(d, t.length);
  return [i, l, o];
}
const ca = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  regExpEscape: It,
  splitStringAtMatch: Ct
}, Symbol.toStringTag, { value: "Module" })), co = E({
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
    titleChunks: p(() => Ct(e.searchQuery, String(e.title)))
  })
});
const po = { class: "cdx-search-result-title" }, fo = { class: "cdx-search-result-title__match" };
function mo(e, t, n, s, a, d) {
  return u(), h("span", po, [
    v("bdi", null, [
      oe(N(e.titleChunks[0]), 1),
      v("span", fo, N(e.titleChunks[1]), 1),
      oe(N(e.titleChunks[2]), 1)
    ])
  ]);
}
const ho = /* @__PURE__ */ F(co, [["render", mo]]), vo = E({
  name: "CdxMenuItem",
  components: { CdxIcon: J, CdxThumbnail: $t, CdxSearchResultTitle: ho },
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
    }, a = (f) => {
      f.button === 0 && t("change", "active", !0);
    }, d = () => {
      t("change", "selected", !0);
    }, l = p(() => e.searchQuery.length > 0), i = p(() => ({
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
    })), o = p(() => e.url ? "a" : "span"), r = p(() => e.label || String(e.value));
    return {
      onMouseMove: n,
      onMouseLeave: s,
      onMouseDown: a,
      onClick: d,
      highlightQuery: l,
      rootClasses: i,
      contentTag: o,
      title: r
    };
  }
});
const bo = ["id", "aria-disabled", "aria-selected"], go = { class: "cdx-menu-item__text" }, yo = ["lang"], $o = ["lang"], _o = ["lang"], Io = ["lang"];
function Co(e, t, n, s, a, d) {
  const l = S("cdx-thumbnail"), i = S("cdx-icon"), o = S("cdx-search-result-title");
  return u(), h("li", {
    id: e.id,
    role: "option",
    class: K(["cdx-menu-item", e.rootClasses]),
    "aria-disabled": e.disabled,
    "aria-selected": e.selected,
    onMousemove: t[0] || (t[0] = (...r) => e.onMouseMove && e.onMouseMove(...r)),
    onMouseleave: t[1] || (t[1] = (...r) => e.onMouseLeave && e.onMouseLeave(...r)),
    onMousedown: t[2] || (t[2] = ee((...r) => e.onMouseDown && e.onMouseDown(...r), ["prevent"])),
    onClick: t[3] || (t[3] = (...r) => e.onClick && e.onClick(...r))
  }, [
    I(e.$slots, "default", {}, () => [
      (u(), T(ke(e.contentTag), {
        href: e.url ? e.url : void 0,
        class: "cdx-menu-item__content"
      }, {
        default: B(() => {
          var r, f, $, w, g, x;
          return [
            e.showThumbnail ? (u(), T(l, {
              key: 0,
              thumbnail: e.thumbnail,
              class: "cdx-menu-item__thumbnail"
            }, null, 8, ["thumbnail"])) : e.icon ? (u(), T(i, {
              key: 1,
              icon: e.icon,
              class: "cdx-menu-item__icon"
            }, null, 8, ["icon"])) : _("", !0),
            v("span", go, [
              e.highlightQuery ? (u(), T(o, {
                key: 0,
                title: e.title,
                "search-query": e.searchQuery,
                lang: (r = e.language) == null ? void 0 : r.label
              }, null, 8, ["title", "search-query", "lang"])) : (u(), h("span", {
                key: 1,
                class: "cdx-menu-item__text__label",
                lang: (f = e.language) == null ? void 0 : f.label
              }, [
                v("bdi", null, N(e.title), 1)
              ], 8, yo)),
              e.match ? (u(), h(ge, { key: 2 }, [
                oe(N(" ") + " "),
                e.highlightQuery ? (u(), T(o, {
                  key: 0,
                  title: e.match,
                  "search-query": e.searchQuery,
                  lang: ($ = e.language) == null ? void 0 : $.match
                }, null, 8, ["title", "search-query", "lang"])) : (u(), h("span", {
                  key: 1,
                  class: "cdx-menu-item__text__match",
                  lang: (w = e.language) == null ? void 0 : w.match
                }, [
                  v("bdi", null, N(e.match), 1)
                ], 8, $o))
              ], 64)) : _("", !0),
              e.supportingText ? (u(), h(ge, { key: 3 }, [
                oe(N(" ") + " "),
                v("span", {
                  class: "cdx-menu-item__text__supporting-text",
                  lang: (g = e.language) == null ? void 0 : g.supportingText
                }, [
                  v("bdi", null, N(e.supportingText), 1)
                ], 8, _o)
              ], 64)) : _("", !0),
              e.description ? (u(), h("span", {
                key: 4,
                class: "cdx-menu-item__text__description",
                lang: (x = e.language) == null ? void 0 : x.description
              }, [
                v("bdi", null, N(e.description), 1)
              ], 8, Io)) : _("", !0)
            ])
          ];
        }),
        _: 1
      }, 8, ["href"]))
    ])
  ], 42, bo);
}
const ko = /* @__PURE__ */ F(vo, [["render", Co]]), So = E({
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
      rootClasses: p(() => ({
        "cdx-progress-bar--block": !e.inline,
        "cdx-progress-bar--inline": e.inline,
        "cdx-progress-bar--enabled": !e.disabled,
        "cdx-progress-bar--disabled": e.disabled
      }))
    };
  }
});
const wo = ["aria-disabled"], xo = /* @__PURE__ */ v("div", { class: "cdx-progress-bar__bar" }, null, -1), Mo = [
  xo
];
function Bo(e, t, n, s, a, d) {
  return u(), h("div", {
    class: K(["cdx-progress-bar", e.rootClasses]),
    role: "progressbar",
    "aria-disabled": e.disabled,
    "aria-valuemin": "0",
    "aria-valuemax": "100"
  }, Mo, 10, wo);
}
const Ao = /* @__PURE__ */ F(So, [["render", Bo]]);
function ze(e, t) {
  const n = m(!1);
  let s = !1;
  if (typeof window != "object" || !("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype))
    return n;
  const a = new window.IntersectionObserver(
    (d) => {
      const l = d[0];
      l && (n.value = l.isIntersecting);
    },
    t
  );
  return ce(() => {
    s = !0, e.value && a.observe(e.value);
  }), qe(() => {
    s = !1, a.disconnect();
  }), ne(e, (d) => {
    s && (a.disconnect(), n.value = !1, d && a.observe(d));
  }), n;
}
const To = E({
  name: "CdxMenu",
  components: {
    CdxMenuItem: ko,
    CdxProgressBar: Ao
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
    const a = p(() => (e.footer && e.menuItems ? [...e.menuItems, e.footer] : e.menuItems).map((C) => et(Ye({}, C), {
      id: W("menu-item")
    }))), d = p(() => n["no-results"] ? e.showNoResultsSlot !== null ? e.showNoResultsSlot : a.value.length === 0 : !1), l = m(null), i = m(!1), o = m(null);
    let r = "", f = null;
    function $() {
      r = "", f !== null && (clearTimeout(f), f = null);
    }
    function w() {
      f !== null && clearTimeout(f), f = setTimeout($, 1500);
    }
    function g() {
      return a.value.find(
        (c) => c.value === e.selected
      ) || null;
    }
    function x(c, C) {
      var D;
      if (!(C && C.disabled))
        switch (c) {
          case "selected":
            t("update:selected", (D = C == null ? void 0 : C.value) != null ? D : null), t("update:expanded", !1), o.value = null;
            break;
          case "highlighted":
            l.value = C || null, i.value = !1;
            break;
          case "highlightedViaKeyboard":
            l.value = C || null, i.value = !0;
            break;
          case "active":
            o.value = C || null;
            break;
        }
    }
    const L = p(() => {
      if (l.value !== null)
        return a.value.findIndex(
          (c) => (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            c.value === l.value.value
          )
        );
    });
    function z(c) {
      c && (x("highlightedViaKeyboard", c), t("menu-item-keyboard-navigation", c));
    }
    function Q(c) {
      var j;
      const C = (he) => {
        for (let Y = he - 1; Y >= 0; Y--)
          if (!a.value[Y].disabled)
            return a.value[Y];
      };
      c = c || a.value.length;
      const D = (j = C(c)) != null ? j : C(a.value.length);
      z(D);
    }
    function P(c) {
      const C = (j) => a.value.find((he, Y) => !he.disabled && Y > j);
      c = c != null ? c : -1;
      const D = C(c) || C(-1);
      z(D);
    }
    function q(c) {
      if (c.key === "Clear")
        return $(), !0;
      if (c.key === "Backspace")
        return r = r.slice(0, -1), w(), !0;
      if (c.key.length === 1 && !c.metaKey && !c.ctrlKey && !c.altKey) {
        e.expanded || t("update:expanded", !0), r += c.key.toLowerCase();
        const C = r.length > 1 && r.split("").every((Y) => Y === r[0]);
        let D = a.value, j = r;
        C && L.value !== void 0 && (D = D.slice(L.value + 1).concat(D.slice(0, L.value)), j = r[0]);
        const he = D.find(
          (Y) => !Y.disabled && String(Y.label || Y.value).toLowerCase().indexOf(j) === 0
        );
        return he && (x("highlightedViaKeyboard", he), b()), w(), !0;
      }
      return !1;
    }
    function G(c, { prevent: C = !0, characterNavigation: D = !1 } = {}) {
      if (D) {
        if (q(c))
          return !0;
        $();
      }
      function j() {
        C && (c.preventDefault(), c.stopPropagation());
      }
      switch (c.key) {
        case "Enter":
        case " ":
          return j(), e.expanded ? (l.value && i.value && t("update:selected", l.value.value), t("update:expanded", !1)) : t("update:expanded", !0), !0;
        case "Tab":
          return e.expanded && (l.value && i.value && t("update:selected", l.value.value), t("update:expanded", !1)), !0;
        case "ArrowUp":
          return j(), e.expanded ? (l.value === null && x("highlightedViaKeyboard", g()), Q(L.value)) : t("update:expanded", !0), b(), !0;
        case "ArrowDown":
          return j(), e.expanded ? (l.value === null && x("highlightedViaKeyboard", g()), P(L.value)) : t("update:expanded", !0), b(), !0;
        case "Home":
          return j(), e.expanded ? (l.value === null && x("highlightedViaKeyboard", g()), P()) : t("update:expanded", !0), b(), !0;
        case "End":
          return j(), e.expanded ? (l.value === null && x("highlightedViaKeyboard", g()), Q()) : t("update:expanded", !0), b(), !0;
        case "Escape":
          return j(), t("update:expanded", !1), !0;
        default:
          return !1;
      }
    }
    function U() {
      x("active", null);
    }
    const M = [], V = m(void 0), A = ze(
      V,
      { threshold: 0.8 }
    );
    ne(A, (c) => {
      c && t("load-more");
    });
    function y(c, C) {
      if (c) {
        M[C] = c.$el;
        const D = e.visibleItemLimit;
        if (!D || e.menuItems.length < D)
          return;
        const j = Math.min(
          D,
          Math.max(2, Math.floor(0.2 * e.menuItems.length))
        );
        C === e.menuItems.length - j && (V.value = c.$el);
      }
    }
    function b() {
      if (!e.visibleItemLimit || e.visibleItemLimit > e.menuItems.length || L.value === void 0)
        return;
      const c = L.value >= 0 ? L.value : 0;
      M[c].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
    const k = m(null), H = m(null);
    function ae() {
      if (H.value = null, !e.visibleItemLimit || M.length <= e.visibleItemLimit) {
        k.value = null;
        return;
      }
      const c = M[0], C = M[e.visibleItemLimit];
      if (k.value = _e(
        c,
        C
      ), e.footer) {
        const D = M[M.length - 1];
        H.value = D.scrollHeight;
      }
    }
    function _e(c, C) {
      const D = c.getBoundingClientRect().top;
      return C.getBoundingClientRect().top - D + 2;
    }
    ce(() => {
      document.addEventListener("mouseup", U);
    }), qe(() => {
      document.removeEventListener("mouseup", U);
    }), ne(R(e, "expanded"), (c) => Ke(this, null, function* () {
      if (c) {
        const C = g();
        C && !l.value && x("highlighted", C), yield ye(), ae(), yield ye(), b();
      } else
        x("highlighted", null);
    })), ne(R(e, "menuItems"), (c) => Ke(this, null, function* () {
      c.length < M.length && (M.length = c.length), e.expanded && (yield ye(), ae(), yield ye(), b());
    }), { deep: !0 });
    const Ie = p(() => ({
      "max-height": k.value ? `${k.value}px` : void 0,
      "overflow-y": k.value ? "scroll" : void 0,
      "margin-bottom": H.value ? `${H.value}px` : void 0
    })), Te = p(() => ({
      "cdx-menu--has-footer": !!e.footer,
      "cdx-menu--has-sticky-footer": !!e.footer && !!k.value
    })), {
      rootClasses: Le,
      rootStyle: Ve,
      otherAttrs: De
    } = de(s, Te);
    return {
      listBoxStyle: Ie,
      rootClasses: Le,
      rootStyle: Ve,
      otherAttrs: De,
      assignTemplateRef: y,
      computedMenuItems: a,
      computedShowNoResultsSlot: d,
      highlightedMenuItem: l,
      highlightedViaKeyboard: i,
      activeMenuItem: o,
      handleMenuItemChange: x,
      handleKeyNavigation: G
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
const Lo = {
  key: 0,
  class: "cdx-menu__pending cdx-menu-item"
}, Vo = {
  key: 1,
  class: "cdx-menu__no-results cdx-menu-item"
};
function Do(e, t, n, s, a, d) {
  const l = S("cdx-menu-item"), i = S("cdx-progress-bar");
  return se((u(), h("div", {
    class: K(["cdx-menu", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    v("ul", Z({
      class: "cdx-menu__listbox",
      role: "listbox",
      style: e.listBoxStyle
    }, e.otherAttrs), [
      e.showPending && e.computedMenuItems.length === 0 && e.$slots.pending ? (u(), h("li", Lo, [
        I(e.$slots, "pending")
      ])) : _("", !0),
      e.computedShowNoResultsSlot ? (u(), h("li", Vo, [
        I(e.$slots, "no-results")
      ])) : _("", !0),
      (u(!0), h(ge, null, Se(e.computedMenuItems, (o, r) => {
        var f, $;
        return u(), T(l, Z({
          key: o.value,
          ref_for: !0,
          ref: (w) => e.assignTemplateRef(w, r)
        }, o, {
          selected: o.value === e.selected,
          active: o.value === ((f = e.activeMenuItem) == null ? void 0 : f.value),
          highlighted: o.value === (($ = e.highlightedMenuItem) == null ? void 0 : $.value),
          "show-thumbnail": e.showThumbnail,
          "bold-label": e.boldLabel,
          "hide-description-overflow": e.hideDescriptionOverflow,
          "search-query": e.searchQuery,
          onChange: (w, g) => e.handleMenuItemChange(w, g ? o : null),
          onClick: (w) => e.$emit("menu-item-click", o)
        }), {
          default: B(() => {
            var w, g;
            return [
              I(e.$slots, "default", {
                menuItem: o,
                active: o.value === ((w = e.activeMenuItem) == null ? void 0 : w.value) && o.value === ((g = e.highlightedMenuItem) == null ? void 0 : g.value)
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
      })) : _("", !0)
    ], 16)
  ], 6)), [
    [$e, e.expanded]
  ]);
}
const Be = /* @__PURE__ */ F(To, [["render", Do]]), Ko = X(dn), Eo = X(fe), Fo = E({
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
      validator: Ko
    },
    /**
     * `status` attribute of the input.
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: Eo
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
      computedDisabled: a,
      computedStatus: d,
      computedInputId: l
    } = ie(
      R(e, "disabled"),
      R(e, "status"),
      s
    ), i = re(xe, void 0), o = ue(R(e, "modelValue"), t), r = p(() => e.clearable && !!o.value && !a.value), f = p(() => ({
      "cdx-text-input--has-start-icon": !!e.startIcon,
      "cdx-text-input--has-end-icon": !!e.endIcon,
      "cdx-text-input--clearable": r.value,
      [`cdx-text-input--status-${d.value}`]: !0
    })), {
      rootClasses: $,
      rootStyle: w,
      otherAttrs: g
    } = de(n, f), x = p(() => {
      const A = g.value, { id: M } = A;
      return pe(A, ["id"]);
    }), L = p(() => ({
      "cdx-text-input__input--has-value": !!o.value
    }));
    return {
      computedInputId: l,
      descriptionId: i,
      wrappedModel: o,
      isClearable: r,
      rootClasses: $,
      rootStyle: w,
      otherAttrsMinusId: x,
      inputClasses: L,
      computedDisabled: a,
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
      cdxIconClear: Pt
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
const Ro = ["id", "type", "aria-describedby", "disabled"];
function zo(e, t, n, s, a, d) {
  const l = S("cdx-icon");
  return u(), h("div", {
    class: K(["cdx-text-input", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    se(v("input", Z({
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
    }), null, 16, Ro), [
      [Bt, e.wrappedModel]
    ]),
    e.startIcon ? (u(), T(l, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__start-icon"
    }, null, 8, ["icon"])) : _("", !0),
    e.endIcon ? (u(), T(l, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__end-icon"
    }, null, 8, ["icon"])) : _("", !0),
    e.isClearable ? (u(), T(l, {
      key: 2,
      icon: e.cdxIconClear,
      class: "cdx-text-input__icon-vue cdx-text-input__clear-icon",
      onMousedown: t[6] || (t[6] = ee(() => {
      }, ["prevent"])),
      onClick: e.onClear
    }, null, 8, ["icon", "onClick"])) : _("", !0)
  ], 6);
}
const We = /* @__PURE__ */ F(Fo, [["render", zo]]);
function Ae(e) {
  const t = m(
    { width: void 0, height: void 0 }
  );
  if (typeof window != "object" || !("ResizeObserver" in window) || !("ResizeObserverEntry" in window))
    return t;
  const n = new window.ResizeObserver(
    (a) => {
      const d = a[0];
      d && (t.value = {
        width: d.borderBoxSize[0].inlineSize,
        height: d.borderBoxSize[0].blockSize
      });
    }
  );
  let s = !1;
  return ce(() => {
    s = !0, e.value && n.observe(e.value);
  }), qe(() => {
    s = !1, n.disconnect();
  }), ne(e, (a) => {
    s && (n.disconnect(), t.value = {
      width: void 0,
      height: void 0
    }, a && n.observe(a));
  }), t;
}
const Oo = X(fe), Pe = E({
  name: "CdxCombobox",
  components: {
    CdxButton: me,
    CdxIcon: J,
    CdxMenu: Be,
    CdxTextInput: We
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
      validator: Oo
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
    const a = m(), d = m(), l = m(), i = W("combobox"), o = R(e, "selected"), r = ue(o, t, "update:selected"), f = m(!1), $ = m(!1), w = p(() => {
      var y, b;
      return (b = (y = l.value) == null ? void 0 : y.getHighlightedMenuItem()) == null ? void 0 : b.id;
    }), { computedDisabled: g } = ie(R(e, "disabled")), x = p(() => ({
      "cdx-combobox--expanded": f.value,
      "cdx-combobox--disabled": g.value
    })), L = Ae(d), z = p(() => {
      var y;
      return `${(y = L.value.width) != null ? y : 0}px`;
    }), {
      rootClasses: Q,
      rootStyle: P,
      otherAttrs: q
    } = de(n, x);
    function G(y) {
      $.value && f.value ? f.value = !1 : (e.menuItems.length > 0 || s["no-results"]) && (f.value = !0), t("focus", y);
    }
    function U(y) {
      f.value = $.value && f.value, t("blur", y);
    }
    function M() {
      g.value || ($.value = !0);
    }
    function V() {
      var y;
      g.value || (y = a.value) == null || y.focus();
    }
    function A(y) {
      !l.value || g.value || e.menuItems.length === 0 || y.key === " " || l.value.delegateKeyNavigation(y);
    }
    return ne(f, () => {
      $.value = !1;
    }), {
      input: a,
      inputWrapper: d,
      currentWidthInPx: z,
      menu: l,
      menuId: i,
      modelWrapper: r,
      expanded: f,
      highlightedId: w,
      computedDisabled: g,
      onInputFocus: G,
      onInputBlur: U,
      onKeydown: A,
      onButtonClick: V,
      onButtonMousedown: M,
      cdxIconExpand: je,
      rootClasses: Q,
      rootStyle: P,
      otherAttrs: q
    };
  }
}), tt = () => {
  He((e) => ({
    "49698e7b": e.currentWidthInPx
  }));
}, nt = Pe.setup;
Pe.setup = nt ? (e, t) => (tt(), nt(e, t)) : tt;
const No = {
  ref: "inputWrapper",
  class: "cdx-combobox__input-wrapper"
};
function qo(e, t, n, s, a, d) {
  const l = S("cdx-text-input"), i = S("cdx-icon"), o = S("cdx-button"), r = S("cdx-menu");
  return u(), h("div", {
    class: K(["cdx-combobox", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    v("div", No, [
      O(l, Z({
        ref: "input",
        modelValue: e.modelWrapper,
        "onUpdate:modelValue": t[0] || (t[0] = (f) => e.modelWrapper = f)
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
        onInput: t[1] || (t[1] = (f) => e.$emit("input", f)),
        onChange: t[2] || (t[2] = (f) => e.$emit("change", f)),
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
        default: B(() => [
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
      "onUpdate:selected": t[3] || (t[3] = (f) => e.modelWrapper = f),
      expanded: e.expanded,
      "onUpdate:expanded": t[4] || (t[4] = (f) => e.expanded = f),
      "menu-items": e.menuItems
    }, e.menuConfig, {
      onLoadMore: t[5] || (t[5] = (f) => e.$emit("load-more"))
    }), {
      default: B(({ menuItem: f }) => [
        I(e.$slots, "menu-item", { menuItem: f })
      ]),
      "no-results": B(() => [
        I(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const pa = /* @__PURE__ */ F(Pe, [["render", qo]]), Ho = E({
  name: "CdxDialog",
  components: {
    CdxButton: me,
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
    const n = W("dialog-label"), s = m(), a = m(), d = m(), l = m(), i = m(), o = p(() => !e.hideTitle || !!e.closeButtonLabel), r = p(() => !!e.primaryAction || !!e.defaultAction), f = Ae(a), $ = p(() => {
      var q;
      return (q = f.value.height) != null ? q : 0;
    }), w = m(!1), g = p(() => ({
      "cdx-dialog--vertical-actions": e.stackedActions,
      "cdx-dialog--horizontal-actions": !e.stackedActions,
      "cdx-dialog--dividers": w.value
    })), x = m(0);
    function L() {
      t("update:open", !1);
    }
    function z() {
      P(s.value);
    }
    function Q() {
      P(s.value, !0);
    }
    function P(q, G = !1) {
      let U = Array.from(
        q.querySelectorAll(`
					input, select, textarea, button, object, a, area,
					[contenteditable], [tabindex]:not([tabindex^="-"])
				`)
      );
      G && (U = U.reverse());
      for (const M of U)
        if (M.focus(), document.activeElement === M)
          return !0;
      return !1;
    }
    return ne(R(e, "open"), (q) => {
      q ? (x.value = window.innerWidth - document.documentElement.clientWidth, document.documentElement.style.setProperty("margin-right", `${x.value}px`), document.body.classList.add("cdx-dialog-open"), ye(() => {
        var G;
        P(a.value) || (G = d.value) == null || G.focus();
      })) : (document.body.classList.remove("cdx-dialog-open"), document.documentElement.style.removeProperty("margin-right"));
    }), ne($, () => {
      a.value && (w.value = a.value.clientHeight < a.value.scrollHeight);
    }), {
      close: L,
      cdxIconClose: ut,
      labelId: n,
      rootClasses: g,
      dialogElement: s,
      focusTrapStart: l,
      focusTrapEnd: i,
      focusFirst: z,
      focusLast: Q,
      dialogBody: a,
      focusHolder: d,
      showHeader: o,
      showFooterActions: r
    };
  }
});
const jo = ["aria-label", "aria-labelledby"], Uo = {
  key: 0,
  class: "cdx-dialog__header__title-group"
}, Wo = ["id"], Po = {
  key: 0,
  class: "cdx-dialog__header__subtitle"
}, Qo = {
  ref: "focusHolder",
  class: "cdx-dialog-focus-trap",
  tabindex: "-1"
}, Go = {
  key: 0,
  class: "cdx-dialog__footer__text"
}, Zo = {
  key: 1,
  class: "cdx-dialog__footer__actions"
};
function Jo(e, t, n, s, a, d) {
  const l = S("cdx-icon"), i = S("cdx-button");
  return u(), T(Ne, {
    name: "cdx-dialog-fade",
    appear: ""
  }, {
    default: B(() => [
      e.open ? (u(), h("div", {
        key: 0,
        class: "cdx-dialog-backdrop",
        onClick: t[5] || (t[5] = (...o) => e.close && e.close(...o)),
        onKeyup: t[6] || (t[6] = te((...o) => e.close && e.close(...o), ["escape"]))
      }, [
        v("div", {
          ref: "focusTrapStart",
          tabindex: "0",
          onFocus: t[0] || (t[0] = (...o) => e.focusLast && e.focusLast(...o))
        }, null, 544),
        v("div", Z({
          ref: "dialogElement",
          class: ["cdx-dialog", e.rootClasses],
          role: "dialog"
        }, e.$attrs, {
          "aria-label": e.$slots.header || e.hideTitle ? e.title : void 0,
          "aria-labelledby": !e.$slots.header && !e.hideTitle ? e.labelId : void 0,
          "aria-modal": "true",
          onClick: t[3] || (t[3] = ee(() => {
          }, ["stop"]))
        }), [
          e.showHeader || e.$slots.header ? (u(), h("header", {
            key: 0,
            class: K(["cdx-dialog__header", { "cdx-dialog__header--default": !e.$slots.header }])
          }, [
            I(e.$slots, "header", {}, () => [
              e.hideTitle ? _("", !0) : (u(), h("div", Uo, [
                v("h2", {
                  id: e.labelId,
                  class: "cdx-dialog__header__title"
                }, N(e.title), 9, Wo),
                e.subtitle ? (u(), h("p", Po, N(e.subtitle), 1)) : _("", !0)
              ])),
              e.closeButtonLabel ? (u(), T(i, {
                key: 1,
                class: "cdx-dialog__header__close-button",
                weight: "quiet",
                type: "button",
                "aria-label": e.closeButtonLabel,
                onClick: e.close
              }, {
                default: B(() => [
                  O(l, {
                    icon: e.cdxIconClose,
                    "icon-label": e.closeButtonLabel
                  }, null, 8, ["icon", "icon-label"])
                ]),
                _: 1
              }, 8, ["aria-label", "onClick"])) : _("", !0)
            ])
          ], 2)) : _("", !0),
          v("div", Qo, null, 512),
          v("div", {
            ref: "dialogBody",
            class: K(["cdx-dialog__body", {
              "cdx-dialog__body--no-header": !(e.showHeader || e.$slots.header),
              "cdx-dialog__body--no-footer": !(e.showFooterActions || e.$slots.footer || e.$slots["footer-text"])
            }])
          }, [
            I(e.$slots, "default")
          ], 2),
          e.showFooterActions || e.$slots.footer || e.$slots["footer-text"] ? (u(), h("footer", {
            key: 1,
            class: K(["cdx-dialog__footer", { "cdx-dialog__footer--default": !e.$slots.footer }])
          }, [
            I(e.$slots, "footer", {}, () => [
              e.$slots["footer-text"] ? (u(), h("p", Go, [
                I(e.$slots, "footer-text")
              ])) : _("", !0),
              e.showFooterActions ? (u(), h("div", Zo, [
                e.primaryAction ? (u(), T(i, {
                  key: 0,
                  class: "cdx-dialog__footer__primary-action",
                  weight: "primary",
                  action: e.primaryAction.actionType,
                  disabled: e.primaryAction.disabled,
                  onClick: t[1] || (t[1] = (o) => e.$emit("primary"))
                }, {
                  default: B(() => [
                    oe(N(e.primaryAction.label), 1)
                  ]),
                  _: 1
                }, 8, ["action", "disabled"])) : _("", !0),
                e.defaultAction ? (u(), T(i, {
                  key: 1,
                  class: "cdx-dialog__footer__default-action",
                  disabled: e.defaultAction.disabled,
                  onClick: t[2] || (t[2] = (o) => e.$emit("default"))
                }, {
                  default: B(() => [
                    oe(N(e.defaultAction.label), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])) : _("", !0)
              ])) : _("", !0)
            ])
          ], 2)) : _("", !0)
        ], 16, jo),
        v("div", {
          ref: "focusTrapEnd",
          tabindex: "0",
          onFocus: t[4] || (t[4] = (...o) => e.focusFirst && e.focusFirst(...o))
        }, null, 544)
      ], 32)) : _("", !0)
    ]),
    _: 3
  });
}
const fa = /* @__PURE__ */ F(Ho, [["render", Jo]]), Xo = {
  notice: Gt,
  error: rt,
  warning: dt,
  success: ct
}, Yo = E({
  name: "CdxMessage",
  components: { CdxButton: me, CdxIcon: J },
  props: {
    /**
     * Status type of Message.
     *
     * @values 'notice', 'warning', 'error', 'success'
     */
    type: {
      type: String,
      default: "notice",
      validator: ft
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
    const n = m(!1), s = p(
      () => e.inline === !1 && e.dismissButtonLabel.length > 0
    ), a = p(() => e.autoDismiss === !1 || e.type === "error" ? !1 : e.autoDismiss === !0 ? 4e3 : e.autoDismiss), d = p(() => ({
      "cdx-message--inline": e.inline,
      "cdx-message--block": !e.inline,
      "cdx-message--user-dismissable": s.value,
      [`cdx-message--${e.type}`]: !0
    })), l = p(
      () => e.icon && e.type === "notice" ? e.icon : Xo[e.type]
    ), i = m("");
    function o(r) {
      n.value || (i.value = r === "user-dismissed" ? "cdx-message-leave-active-user" : "cdx-message-leave-active-system", n.value = !0, t(r));
    }
    return ce(() => {
      e.type === "error" && e.autoDismiss !== !1 ? Oe('CdxMessage: Message with type="error" cannot use auto-dismiss') : a.value && setTimeout(() => o("auto-dismissed"), a.value);
    }), {
      dismissed: n,
      userDismissable: s,
      rootClasses: d,
      leaveActiveClass: i,
      computedIcon: l,
      onDismiss: o,
      cdxIconClose: ut
    };
  }
});
const el = ["aria-live", "role"], tl = { class: "cdx-message__content" };
function nl(e, t, n, s, a, d) {
  const l = S("cdx-icon"), i = S("cdx-button");
  return u(), T(Ne, {
    name: "cdx-message",
    appear: e.fadeIn,
    "leave-active-class": e.leaveActiveClass
  }, {
    default: B(() => [
      e.dismissed ? _("", !0) : (u(), h("div", {
        key: 0,
        class: K(["cdx-message", e.rootClasses]),
        "aria-live": e.type !== "error" ? "polite" : void 0,
        role: e.type === "error" ? "alert" : void 0
      }, [
        O(l, {
          class: "cdx-message__icon--vue",
          icon: e.computedIcon
        }, null, 8, ["icon"]),
        v("div", tl, [
          I(e.$slots, "default")
        ]),
        e.userDismissable ? (u(), T(i, {
          key: 0,
          class: "cdx-message__dismiss-button",
          weight: "quiet",
          type: "button",
          "aria-label": e.dismissButtonLabel,
          onClick: t[0] || (t[0] = (o) => e.onDismiss("user-dismissed"))
        }, {
          default: B(() => [
            O(l, {
              icon: e.cdxIconClose,
              "icon-label": e.dismissButtonLabel
            }, null, 8, ["icon", "icon-label"])
          ]),
          _: 1
        }, 8, ["aria-label"])) : _("", !0)
      ], 10, el))
    ]),
    _: 3
  }, 8, ["appear", "leave-active-class"]);
}
const ol = /* @__PURE__ */ F(Yo, [["render", nl]]), ll = X(fe), al = E({
  name: "CdxField",
  components: { CdxLabel: Me, CdxMessage: ol },
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
      validator: ll
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
    const { disabled: n, status: s, isFieldset: a } = At(e), d = _t(n), l = p(() => ({
      "cdx-field--disabled": d.value
    })), i = W("label"), o = W("description"), r = W("input");
    a.value || (be(vt, r), t.description && be(xe, o)), be(gt, d), be(bt, s);
    const f = p(
      () => e.status !== "default" && e.status in e.messages ? e.messages[e.status] : ""
    ), $ = p(() => e.status === "default" ? "notice" : e.status);
    return {
      rootClasses: l,
      computedDisabled: d,
      labelId: i,
      descriptionId: o,
      inputId: r,
      validationMessage: f,
      validationMessageType: $
    };
  }
});
const sl = { class: "cdx-field__help-text" }, il = {
  key: 0,
  class: "cdx-field__validation-message"
};
function dl(e, t, n, s, a, d) {
  const l = S("cdx-label"), i = S("cdx-message");
  return u(), T(ke(e.isFieldset ? "fieldset" : "div"), {
    class: K(["cdx-field", e.rootClasses]),
    "aria-disabled": !e.isFieldset && e.computedDisabled ? !0 : void 0,
    disabled: e.isFieldset && e.computedDisabled ? !0 : void 0
  }, {
    default: B(() => [
      O(l, {
        id: e.labelId,
        icon: e.labelIcon,
        "visually-hidden": e.hideLabel,
        "optional-flag": e.optionalFlag,
        "input-id": e.inputId,
        "description-id": e.descriptionId,
        disabled: e.computedDisabled,
        "is-legend": e.isFieldset
      }, we({
        default: B(() => [
          I(e.$slots, "label")
        ]),
        _: 2
      }, [
        e.$slots.description && e.$slots.description().length > 0 ? {
          name: "description",
          fn: B(() => [
            I(e.$slots, "description")
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["id", "icon", "visually-hidden", "optional-flag", "input-id", "description-id", "disabled", "is-legend"]),
      v("div", {
        class: K(["cdx-field__control", { "cdx-field__control--has-help-text": e.$slots["help-text"] && e.$slots["help-text"]().length > 0 || e.validationMessage }])
      }, [
        I(e.$slots, "default")
      ], 2),
      v("div", sl, [
        I(e.$slots, "help-text")
      ]),
      !e.computedDisabled && e.validationMessage ? (u(), h("div", il, [
        O(i, {
          type: e.validationMessageType,
          inline: !0
        }, {
          default: B(() => [
            oe(N(e.validationMessage), 1)
          ]),
          _: 1
        }, 8, ["type"])
      ])) : _("", !0)
    ]),
    _: 3
  }, 8, ["class", "aria-disabled", "disabled"]);
}
const ma = /* @__PURE__ */ F(al, [["render", dl]]), ul = X(fe), Qe = E({
  name: "CdxLookup",
  components: {
    CdxMenu: Be,
    CdxTextInput: We
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
      validator: ul
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
    const a = m(), d = m(), l = W("lookup-menu"), i = m(!1), o = m(!1), r = m(!1), { computedDisabled: f } = ie(R(e, "disabled")), $ = R(e, "selected"), w = ue($, t, "update:selected"), g = p(
      () => e.menuItems.find((b) => b.value === e.selected)
    ), x = p(() => {
      var b, k;
      return (k = (b = d.value) == null ? void 0 : b.getHighlightedMenuItem()) == null ? void 0 : k.id;
    }), L = m(e.initialInputValue), z = Ae(a), Q = p(() => {
      var b;
      return `${(b = z.value.width) != null ? b : 0}px`;
    }), P = p(() => ({
      "cdx-lookup--disabled": f.value,
      "cdx-lookup--pending": i.value
    })), {
      rootClasses: q,
      rootStyle: G,
      otherAttrs: U
    } = de(n, P);
    function M(b) {
      g.value && g.value.label !== b && g.value.value !== b && (w.value = null), b === "" ? (o.value = !1, i.value = !1) : i.value = !0, t("input", b);
    }
    function V(b) {
      r.value = !0, // Input value is not null or an empty string.
      L.value !== null && L.value !== "" && // There's either menu items to show or a no results message.
      (e.menuItems.length > 0 || s["no-results"]) && (o.value = !0), t("focus", b);
    }
    function A(b) {
      r.value = !1, o.value = !1, t("blur", b);
    }
    function y(b) {
      !d.value || f.value || e.menuItems.length === 0 && !s["no-results"] || b.key === " " || d.value.delegateKeyNavigation(b);
    }
    return ne($, (b) => {
      if (b !== null) {
        const k = g.value ? g.value.label || g.value.value : "";
        L.value !== k && (L.value = k, t("input", L.value));
      }
    }), ne(R(e, "menuItems"), (b) => {
      // Only show the menu if we were in the pending state (meaning this menuItems change
      // was in response to user input) and the menu is still focused
      r.value && i.value && // Show the menu if there are either menu items or no-results content to show
      (b.length > 0 || s["no-results"]) && (o.value = !0), b.length === 0 && !s["no-results"] && (o.value = !1), i.value = !1;
    }), {
      rootElement: a,
      currentWidthInPx: Q,
      menu: d,
      menuId: l,
      highlightedId: x,
      inputValue: L,
      modelWrapper: w,
      expanded: o,
      computedDisabled: f,
      onInputBlur: A,
      rootClasses: q,
      rootStyle: G,
      otherAttrs: U,
      onUpdateInput: M,
      onInputFocus: V,
      onKeydown: y
    };
  }
}), ot = () => {
  He((e) => ({
    "49368ef8": e.currentWidthInPx
  }));
}, lt = Qe.setup;
Qe.setup = lt ? (e, t) => (ot(), lt(e, t)) : ot;
function rl(e, t, n, s, a, d) {
  const l = S("cdx-text-input"), i = S("cdx-menu");
  return u(), h("div", {
    ref: "rootElement",
    class: K(["cdx-lookup", e.rootClasses]),
    style: le(e.rootStyle)
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
      default: B(({ menuItem: o }) => [
        I(e.$slots, "menu-item", { menuItem: o })
      ]),
      "no-results": B(() => [
        I(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const ha = /* @__PURE__ */ F(Qe, [["render", rl]]), cl = E({
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
  setup(e, { emit: t, slots: n, attrs: s }) {
    var $;
    Ue(($ = n.default) == null ? void 0 : $.call(n), s, "CdxRadio");
    const a = p(() => ({
      "cdx-radio--inline": e.inline
    })), { computedDisabled: d } = ie(R(e, "disabled")), l = m(), i = W("radio"), o = W("description"), r = () => {
      l.value.focus();
    }, f = ue(R(e, "modelValue"), t);
    return {
      rootClasses: a,
      computedDisabled: d,
      input: l,
      radioId: i,
      descriptionId: o,
      focusInput: r,
      wrappedModel: f
    };
  }
});
const pl = ["id", "aria-describedby", "name", "value", "disabled"], fl = /* @__PURE__ */ v("span", { class: "cdx-radio__icon" }, null, -1);
function ml(e, t, n, s, a, d) {
  const l = S("cdx-label");
  return u(), h("span", {
    class: K(["cdx-radio", e.rootClasses])
  }, [
    se(v("input", {
      id: e.radioId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wrappedModel = i),
      class: "cdx-radio__input",
      type: "radio",
      "aria-describedby": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      name: e.name,
      value: e.inputValue,
      disabled: e.computedDisabled
    }, null, 8, pl), [
      [Tt, e.wrappedModel]
    ]),
    fl,
    e.$slots.default && e.$slots.default().length ? (u(), T(l, {
      key: 0,
      class: "cdx-radio__label",
      "input-id": e.radioId,
      "description-id": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      disabled: e.computedDisabled,
      onClick: e.focusInput
    }, we({
      default: B(() => [
        I(e.$slots, "default")
      ]),
      _: 2
    }, [
      e.$slots.description && e.$slots.description().length > 0 ? {
        name: "description",
        fn: B(() => [
          I(e.$slots, "description")
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["input-id", "description-id", "disabled", "onClick"])) : _("", !0)
  ], 2);
}
const va = /* @__PURE__ */ F(cl, [["render", ml]]), hl = X(fe), vl = E({
  name: "CdxSearchInput",
  components: {
    CdxButton: me,
    CdxTextInput: We
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
      validator: hl
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
    const s = ue(R(e, "modelValue"), t), { computedDisabled: a } = ie(R(e, "disabled")), d = p(() => ({
      "cdx-search-input--has-end-button": !!e.buttonLabel
    })), {
      rootClasses: l,
      rootStyle: i,
      otherAttrs: o
    } = de(n, d);
    return {
      wrappedModel: s,
      computedDisabled: a,
      rootClasses: l,
      rootStyle: i,
      otherAttrs: o,
      handleSubmit: () => {
        t("submit-click", s.value);
      },
      searchIcon: Xt
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
const bl = { class: "cdx-search-input__input-wrapper" };
function gl(e, t, n, s, a, d) {
  const l = S("cdx-text-input"), i = S("cdx-button");
  return u(), h("div", {
    class: K(["cdx-search-input", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    v("div", bl, [
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
        onKeydown: te(e.handleSubmit, ["enter"]),
        onInput: t[1] || (t[1] = (o) => e.$emit("input", o)),
        onChange: t[2] || (t[2] = (o) => e.$emit("change", o)),
        onFocus: t[3] || (t[3] = (o) => e.$emit("focus", o)),
        onBlur: t[4] || (t[4] = (o) => e.$emit("blur", o))
      }), null, 16, ["modelValue", "start-icon", "disabled", "status", "onKeydown"]),
      I(e.$slots, "default")
    ]),
    e.buttonLabel ? (u(), T(i, {
      key: 0,
      class: "cdx-search-input__end-button",
      disabled: e.computedDisabled,
      onClick: e.handleSubmit
    }, {
      default: B(() => [
        oe(N(e.buttonLabel), 1)
      ]),
      _: 1
    }, 8, ["disabled", "onClick"])) : _("", !0)
  ], 6);
}
const yl = /* @__PURE__ */ F(vl, [["render", gl]]), $l = X(fe), Ge = E({
  name: "CdxSelect",
  components: {
    CdxIcon: J,
    CdxMenu: Be
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
      validator: $l
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
    const s = m(), a = m(), d = re(xe, void 0), l = W("select-menu"), i = m(!1), o = n.id || W("select-handle"), {
      computedDisabled: r,
      computedStatus: f,
      computedInputId: $
    } = ie(
      R(e, "disabled"),
      R(e, "status"),
      o
    ), w = ue(R(e, "selected"), t, "update:selected"), g = p(
      () => e.menuItems.find((k) => k.value === e.selected)
    ), x = p(() => g.value ? g.value.label || g.value.value : e.defaultLabel), L = Ae(s), z = p(() => {
      var k;
      return `${(k = L.value.width) != null ? k : 0}px`;
    }), Q = p(() => {
      if (e.defaultIcon && !g.value)
        return e.defaultIcon;
      if (g.value && g.value.icon)
        return g.value.icon;
    }), P = p(() => ({
      "cdx-select-vue--enabled": !r.value,
      "cdx-select-vue--disabled": r.value,
      "cdx-select-vue--expanded": i.value,
      "cdx-select-vue--value-selected": !!g.value,
      "cdx-select-vue--no-selections": !g.value,
      "cdx-select-vue--has-start-icon": !!Q.value,
      [`cdx-select-vue--status-${f.value}`]: !0
    })), {
      rootClasses: q,
      rootStyle: G,
      otherAttrs: U
    } = de(n, P), M = p(() => {
      const ae = U.value, { id: k } = ae;
      return pe(ae, ["id"]);
    }), V = p(() => {
      var k, H;
      return (H = (k = a.value) == null ? void 0 : k.getHighlightedMenuItem()) == null ? void 0 : H.id;
    });
    function A() {
      i.value = !1;
    }
    function y() {
      var k;
      r.value || (i.value = !i.value, (k = s.value) == null || k.focus());
    }
    function b(k) {
      var H;
      r.value || (H = a.value) == null || H.delegateKeyNavigation(k, { characterNavigation: !0 });
    }
    return {
      handle: s,
      menu: a,
      computedHandleId: $,
      descriptionId: d,
      menuId: l,
      modelWrapper: w,
      selectedMenuItem: g,
      highlightedId: V,
      expanded: i,
      computedDisabled: r,
      onBlur: A,
      currentLabel: x,
      currentWidthInPx: z,
      rootClasses: q,
      rootStyle: G,
      otherAttrsMinusId: M,
      onClick: y,
      onKeydown: b,
      startIcon: Q,
      cdxIconExpand: je
    };
  }
}), at = () => {
  He((e) => ({
    "3b410536": e.currentWidthInPx
  }));
}, st = Ge.setup;
Ge.setup = st ? (e, t) => (at(), st(e, t)) : at;
const _l = ["aria-disabled"], Il = ["id", "aria-controls", "aria-activedescendant", "aria-expanded", "aria-describedby"];
function Cl(e, t, n, s, a, d) {
  const l = S("cdx-icon"), i = S("cdx-menu");
  return u(), h("div", {
    class: K(["cdx-select-vue", e.rootClasses]),
    style: le(e.rootStyle),
    "aria-disabled": e.computedDisabled
  }, [
    v("div", Z({
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
      I(e.$slots, "label", {
        selectedMenuItem: e.selectedMenuItem,
        defaultLabel: e.defaultLabel
      }, () => [
        oe(N(e.currentLabel), 1)
      ]),
      e.startIcon ? (u(), T(l, {
        key: 0,
        icon: e.startIcon,
        class: "cdx-select-vue__start-icon"
      }, null, 8, ["icon"])) : _("", !0),
      O(l, {
        icon: e.cdxIconExpand,
        class: "cdx-select-vue__indicator"
      }, null, 8, ["icon"])
    ], 16, Il),
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
      default: B(({ menuItem: o }) => [
        I(e.$slots, "menu-item", { menuItem: o })
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 14, _l);
}
const ba = /* @__PURE__ */ F(Ge, [["render", Cl]]), kl = E({
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
    const t = re(mt), n = re(ht);
    if (!t || !n)
      throw new Error("Tab component must be used inside a Tabs component");
    const s = t.value.get(e.name) || {}, a = p(() => e.name === n.value);
    return {
      tab: s,
      isActive: a
    };
  }
});
const Sl = ["id", "aria-hidden", "aria-labelledby"];
function wl(e, t, n, s, a, d) {
  return se((u(), h("section", {
    id: e.tab.id,
    "aria-hidden": e.isActive ? void 0 : !0,
    "aria-labelledby": `${e.tab.id}-label`,
    class: "cdx-tab",
    role: "tabpanel",
    tabindex: "-1"
  }, [
    I(e.$slots, "default")
  ], 8, Sl)), [
    [$e, e.isActive]
  ]);
}
const ga = /* @__PURE__ */ F(kl, [["render", wl]]), xl = E({
  name: "CdxTabs",
  components: {
    CdxButton: me,
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
    const s = m(), a = m(), d = m(), l = m(), i = pt(s), o = p(() => {
      var b;
      const V = [], A = (b = t.default) == null ? void 0 : b.call(t);
      A && A.forEach(y);
      function y(k) {
        k && typeof k == "object" && "type" in k && (typeof k.type == "object" && "name" in k.type && k.type.name === "CdxTab" ? V.push(k) : "children" in k && Array.isArray(k.children) && k.children.forEach(y));
      }
      return V;
    });
    if (!o.value || o.value.length === 0)
      throw new Error("Slot content cannot be empty");
    const r = p(() => o.value.reduce((V, A) => {
      var y;
      if ((y = A.props) != null && y.name && typeof A.props.name == "string") {
        if (V.get(A.props.name))
          throw new Error("Tab names must be unique");
        V.set(A.props.name, {
          name: A.props.name,
          id: W(A.props.name),
          label: A.props.label || A.props.name,
          disabled: A.props.disabled
        });
      }
      return V;
    }, /* @__PURE__ */ new Map())), f = ue(R(e, "active"), n, "update:active"), $ = p(() => Array.from(r.value.keys())), w = p(() => $.value.indexOf(f.value)), g = p(() => {
      var V;
      return (V = r.value.get(f.value)) == null ? void 0 : V.id;
    });
    be(ht, f), be(mt, r);
    const x = m(/* @__PURE__ */ new Map()), L = m(), z = m(), Q = ze(L, { threshold: 0.95 }), P = ze(z, { threshold: 0.95 });
    function q(V, A) {
      const y = V;
      y && (x.value.set(A, y), A === 0 ? L.value = y : A === $.value.length - 1 && (z.value = y));
    }
    const G = p(() => ({
      "cdx-tabs--framed": e.framed,
      "cdx-tabs--quiet": !e.framed
    }));
    function U(V) {
      if (!a.value || !d.value || !l.value)
        return 0;
      const A = i.value === "rtl" ? l.value : d.value, y = i.value === "rtl" ? d.value : l.value, b = V.offsetLeft, k = b + V.clientWidth, H = a.value.scrollLeft + A.clientWidth, ae = a.value.scrollLeft + a.value.clientWidth - y.clientWidth;
      return b < H ? b - H : k > ae ? k - ae : 0;
    }
    function M(V) {
      var k;
      if (!a.value || !d.value || !l.value)
        return;
      const A = V === "next" && i.value === "ltr" || V === "prev" && i.value === "rtl" ? 1 : -1;
      let y = 0, b = V === "next" ? a.value.firstElementChild : a.value.lastElementChild;
      for (; b; ) {
        const H = V === "next" ? b.nextElementSibling : b.previousElementSibling;
        if (y = U(b), Math.sign(y) === A) {
          H && Math.abs(y) < 0.25 * a.value.clientWidth && (y = U(H));
          break;
        }
        b = H;
      }
      a.value.scrollBy({
        left: y,
        behavior: "smooth"
      }), (k = x.value.get(w.value)) == null || k.focus();
    }
    return ne(f, () => {
      if (g.value === void 0 || !a.value || !d.value || !l.value)
        return;
      const V = document.getElementById(`${g.value}-label`);
      V && a.value.scrollBy({
        left: U(V),
        behavior: "smooth"
      });
    }), {
      activeTab: f,
      activeTabIndex: w,
      activeTabId: g,
      currentDirection: i,
      rootElement: s,
      tabListElement: a,
      prevScroller: d,
      nextScroller: l,
      rootClasses: G,
      tabNames: $,
      tabsData: r,
      tabButtonRefs: x,
      firstLabelVisible: Q,
      lastLabelVisible: P,
      assignTemplateRefForTabButton: q,
      scrollTabs: M,
      cdxIconPrevious: Jt,
      cdxIconNext: Zt
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
const Ml = { class: "cdx-tabs__header" }, Bl = {
  ref: "prevScroller",
  class: "cdx-tabs__prev-scroller"
}, Al = {
  ref: "tabListElement",
  class: "cdx-tabs__list",
  role: "tablist"
}, Tl = ["id", "disabled", "aria-controls", "aria-selected", "tabindex", "onClick", "onKeyup"], Ll = {
  ref: "nextScroller",
  class: "cdx-tabs__next-scroller"
}, Vl = { class: "cdx-tabs__content" };
function Dl(e, t, n, s, a, d) {
  const l = S("cdx-icon"), i = S("cdx-button");
  return u(), h("div", {
    ref: "rootElement",
    class: K(["cdx-tabs", e.rootClasses])
  }, [
    v("div", Ml, [
      se(v("div", Bl, [
        O(i, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[0] || (t[0] = ee(() => {
          }, ["prevent"])),
          onClick: t[1] || (t[1] = (o) => e.scrollTabs("prev"))
        }, {
          default: B(() => [
            O(l, { icon: e.cdxIconPrevious }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [$e, !e.firstLabelVisible]
      ]),
      v("div", Al, [
        (u(!0), h(ge, null, Se(e.tabsData.values(), (o, r) => (u(), h("button", {
          id: `${o.id}-label`,
          key: r,
          ref_for: !0,
          ref: (f) => e.assignTemplateRefForTabButton(f, r),
          disabled: o.disabled ? !0 : void 0,
          "aria-controls": o.id,
          "aria-selected": o.name === e.activeTab,
          tabindex: o.name === e.activeTab ? void 0 : -1,
          class: "cdx-tabs__list__item",
          role: "tab",
          onClick: ee((f) => e.select(o.name), ["prevent"]),
          onKeyup: te((f) => e.select(o.name), ["enter"]),
          onKeydown: [
            t[2] || (t[2] = te(ee((...f) => e.onRightArrowKeypress && e.onRightArrowKeypress(...f), ["prevent"]), ["right"])),
            t[3] || (t[3] = te(ee((...f) => e.onDownArrowKeypress && e.onDownArrowKeypress(...f), ["prevent"]), ["down"])),
            t[4] || (t[4] = te(ee((...f) => e.onLeftArrowKeypress && e.onLeftArrowKeypress(...f), ["prevent"]), ["left"]))
          ]
        }, [
          v("span", null, N(o.label), 1)
        ], 40, Tl))), 128))
      ], 512),
      se(v("div", Ll, [
        O(i, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[5] || (t[5] = ee(() => {
          }, ["prevent"])),
          onClick: t[6] || (t[6] = (o) => e.scrollTabs("next"))
        }, {
          default: B(() => [
            O(l, { icon: e.cdxIconNext }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [$e, !e.lastLabelVisible]
      ])
    ]),
    v("div", Vl, [
      I(e.$slots, "default")
    ])
  ], 2);
}
const ya = /* @__PURE__ */ F(xl, [["render", Dl]]), Kl = X(fe), El = E({
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
      validator: Kl
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
    const s = ue(R(e, "modelValue"), n), a = t.id, {
      computedDisabled: d,
      computedStatus: l,
      computedInputId: i
    } = ie(
      R(e, "disabled"),
      R(e, "status"),
      a
    ), o = re(xe, void 0), r = p(() => ({
      "cdx-text-area__textarea--has-value": !!s.value,
      "cdx-text-area__textarea--is-autosize": e.autosize
    })), f = p(() => ({
      "cdx-text-area--status-default": l.value === "default",
      "cdx-text-area--status-error": l.value === "error",
      "cdx-text-area--has-start-icon": !!e.startIcon,
      "cdx-text-area--has-end-icon": !!e.endIcon
    })), {
      rootClasses: $,
      rootStyle: w,
      otherAttrs: g
    } = de(t, f), x = p(() => {
      const q = g.value, { id: Q } = q;
      return pe(q, ["id"]);
    }), L = m();
    function z() {
      L.value && e.autosize && (L.value.style.height = "auto", L.value.style.height = `${L.value.scrollHeight}px`);
    }
    return {
      rootClasses: $,
      rootStyle: w,
      wrappedModel: s,
      computedDisabled: d,
      computedInputId: i,
      descriptionId: o,
      textareaClasses: r,
      otherAttrsMinusId: x,
      textarea: L,
      onInput: z
    };
  }
});
const Fl = ["id", "aria-describedby", "disabled"];
function Rl(e, t, n, s, a, d) {
  const l = S("cdx-icon");
  return u(), h("div", {
    class: K(["cdx-text-area", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    se(v("textarea", Z({
      id: e.computedInputId,
      ref: "textarea"
    }, e.otherAttrsMinusId, {
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wrappedModel = i),
      class: [e.textareaClasses, "cdx-text-area__textarea"],
      "aria-describedby": e.descriptionId,
      disabled: e.computedDisabled,
      onInput: t[1] || (t[1] = (...i) => e.onInput && e.onInput(...i))
    }), null, 16, Fl), [
      [Lt, e.wrappedModel]
    ]),
    e.startIcon ? (u(), T(l, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-area__icon-vue cdx-text-area__start-icon"
    }, null, 8, ["icon"])) : _("", !0),
    e.endIcon ? (u(), T(l, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-area__icon-vue cdx-text-area__end-icon"
    }, null, 8, ["icon"])) : _("", !0)
  ], 6);
}
const $a = /* @__PURE__ */ F(El, [["render", Rl]]), zl = E({
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
    const n = m(!1);
    return {
      rootClasses: p(() => ({
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
const Ol = ["aria-pressed", "disabled"];
function Nl(e, t, n, s, a, d) {
  return u(), h("button", {
    class: K(["cdx-toggle-button", e.rootClasses]),
    "aria-pressed": e.modelValue,
    disabled: e.disabled,
    onClick: t[0] || (t[0] = (...l) => e.onClick && e.onClick(...l)),
    onKeydown: t[1] || (t[1] = te((l) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = te((l) => e.setActive(!1), ["space", "enter"]))
  }, [
    I(e.$slots, "default")
  ], 42, Ol);
}
const ql = /* @__PURE__ */ F(zl, [["render", Nl]]), Hl = E({
  name: "CdxToggleButtonGroup",
  components: {
    CdxIcon: J,
    CdxToggleButton: ql
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
    function n(a) {
      return Array.isArray(e.modelValue) ? e.modelValue.indexOf(a.value) !== -1 : e.modelValue !== null ? e.modelValue === a.value : !1;
    }
    function s(a, d) {
      if (Array.isArray(e.modelValue)) {
        const l = e.modelValue.indexOf(a.value) !== -1;
        d && !l ? t("update:modelValue", e.modelValue.concat(a.value)) : !d && l && t("update:modelValue", e.modelValue.filter((i) => i !== a.value));
      } else
        d && e.modelValue !== a.value && t("update:modelValue", a.value);
    }
    return {
      getButtonLabel: yt,
      isSelected: n,
      onUpdate: s
    };
  }
});
const jl = { class: "cdx-toggle-button-group" };
function Ul(e, t, n, s, a, d) {
  const l = S("cdx-icon"), i = S("cdx-toggle-button");
  return u(), h("div", jl, [
    (u(!0), h(ge, null, Se(e.buttons, (o) => (u(), T(i, {
      key: o.value,
      "model-value": e.isSelected(o),
      disabled: o.disabled || e.disabled,
      "aria-label": o.ariaLabel,
      "onUpdate:modelValue": (r) => e.onUpdate(o, r)
    }, {
      default: B(() => [
        I(e.$slots, "default", {
          button: o,
          selected: e.isSelected(o)
        }, () => [
          o.icon ? (u(), T(l, {
            key: 0,
            icon: o.icon
          }, null, 8, ["icon"])) : _("", !0),
          oe(" " + N(e.getButtonLabel(o)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["model-value", "disabled", "aria-label", "onUpdate:modelValue"]))), 128))
  ]);
}
const _a = /* @__PURE__ */ F(Hl, [["render", Ul]]), Wl = E({
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
    var x;
    Ue((x = n.default) == null ? void 0 : x.call(n), s, "CdxToggleSwitch");
    const a = m(), d = W("toggle-switch"), l = W("description"), i = p(() => ({
      "cdx-toggle-switch--align-switch": e.alignSwitch
    })), {
      rootClasses: o,
      rootStyle: r,
      otherAttrs: f
    } = de(s, i), { computedDisabled: $ } = ie(R(e, "disabled")), w = ue(R(e, "modelValue"), t);
    return {
      input: a,
      inputId: d,
      descriptionId: l,
      rootClasses: o,
      rootStyle: r,
      otherAttrs: f,
      computedDisabled: $,
      wrappedModel: w,
      clickInput: () => {
        a.value.click();
      }
    };
  }
});
const Pl = ["id", "aria-describedby", "value", "disabled"], Ql = /* @__PURE__ */ v("span", { class: "cdx-toggle-switch__switch" }, [
  /* @__PURE__ */ v("span", { class: "cdx-toggle-switch__switch__grip" })
], -1);
function Gl(e, t, n, s, a, d) {
  const l = S("cdx-label");
  return u(), h("span", {
    class: K(["cdx-toggle-switch", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    se(v("input", Z({
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
      onKeydown: t[1] || (t[1] = te(ee((...i) => e.clickInput && e.clickInput(...i), ["prevent"]), ["enter"]))
    }), null, 16, Pl), [
      [it, e.wrappedModel]
    ]),
    Ql,
    e.$slots.default && e.$slots.default().length ? (u(), T(l, {
      key: 0,
      class: "cdx-toggle-switch__label",
      "input-id": e.inputId,
      "description-id": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      "visually-hidden": e.hideLabel,
      disabled: e.computedDisabled
    }, we({
      default: B(() => [
        I(e.$slots, "default")
      ]),
      _: 2
    }, [
      e.$slots.description && e.$slots.description().length > 0 ? {
        name: "description",
        fn: B(() => [
          I(e.$slots, "description")
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["input-id", "description-id", "visually-hidden", "disabled"])) : _("", !0)
  ], 6);
}
const Ia = /* @__PURE__ */ F(Wl, [["render", Gl]]), Zl = E({
  name: "CdxTypeaheadSearch",
  components: {
    CdxIcon: J,
    CdxMenu: Be,
    CdxSearchInput: yl
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
      default: un
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
    const a = m(), d = m(), l = W("typeahead-search-menu"), i = m(!1), o = m(!1), r = m(!1), f = m(!1), $ = m(e.initialInputValue), w = m(""), g = p(() => {
      var c, C;
      return (C = (c = d.value) == null ? void 0 : c.getHighlightedMenuItem()) == null ? void 0 : C.id;
    }), x = m(null), L = p(() => ({
      "cdx-typeahead-search__menu-message--has-thumbnail": e.showThumbnail
    })), z = p(
      () => e.searchResults.find(
        (c) => c.value === x.value
      )
    ), Q = p(
      () => e.searchFooterUrl ? { value: ve, url: e.searchFooterUrl } : void 0
    ), P = p(() => ({
      "cdx-typeahead-search--show-thumbnail": e.showThumbnail,
      "cdx-typeahead-search--expanded": i.value,
      "cdx-typeahead-search--auto-expand-width": e.showThumbnail && e.autoExpandWidth
    })), {
      rootClasses: q,
      rootStyle: G,
      otherAttrs: U
    } = de(t, P);
    function M(c) {
      return c;
    }
    const V = p(() => ({
      visibleItemLimit: e.visibleItemLimit,
      showThumbnail: e.showThumbnail,
      // In case search queries aren't highlighted, default to a bold label.
      boldLabel: !0,
      hideDescriptionOverflow: !0
    }));
    let A, y;
    function b(c, C = !1) {
      z.value && z.value.label !== c && z.value.value !== c && (x.value = null), y !== void 0 && (clearTimeout(y), y = void 0), c === "" ? i.value = !1 : (o.value = !0, s["search-results-pending"] && (y = setTimeout(() => {
        f.value && (i.value = !0), r.value = !0;
      }, rn))), A !== void 0 && (clearTimeout(A), A = void 0);
      const D = () => {
        n("input", c);
      };
      C ? D() : A = setTimeout(() => {
        D();
      }, e.debounceInterval);
    }
    function k(c) {
      if (c === ve) {
        x.value = null, $.value = w.value;
        return;
      }
      x.value = c, c !== null && ($.value = z.value ? z.value.label || String(z.value.value) : "");
    }
    function H() {
      f.value = !0, (w.value || r.value) && (i.value = !0);
    }
    function ae() {
      f.value = !1, i.value = !1;
    }
    function _e(c) {
      const j = c, { id: C } = j, D = pe(j, ["id"]);
      if (D.value === ve) {
        n("search-result-click", {
          searchResult: null,
          index: e.searchResults.length,
          numberOfResults: e.searchResults.length
        });
        return;
      }
      Ie(D);
    }
    function Ie(c) {
      const C = {
        searchResult: c,
        index: e.searchResults.findIndex(
          (D) => D.value === c.value
        ),
        numberOfResults: e.searchResults.length
      };
      n("search-result-click", C);
    }
    function Te(c) {
      if (c.value === ve) {
        $.value = w.value;
        return;
      }
      $.value = c.value ? c.label || String(c.value) : "";
    }
    function Le(c) {
      var C;
      i.value = !1, (C = d.value) == null || C.clearActive(), _e(c);
    }
    function Ve(c) {
      if (z.value)
        Ie(z.value), c.stopPropagation(), window.location.assign(z.value.url), c.preventDefault();
      else {
        const C = {
          searchResult: null,
          index: -1,
          numberOfResults: e.searchResults.length
        };
        n("submit", C);
      }
    }
    function De(c) {
      if (!d.value || !w.value || c.key === " ")
        return;
      const C = d.value.getHighlightedMenuItem(), D = d.value.getHighlightedViaKeyboard();
      switch (c.key) {
        case "Enter":
          C && (C.value === ve && D ? window.location.assign(e.searchFooterUrl) : d.value.delegateKeyNavigation(c, { prevent: !1 })), i.value = !1;
          break;
        case "Tab":
          i.value = !1;
          break;
        default:
          d.value.delegateKeyNavigation(c);
          break;
      }
    }
    return ce(() => {
      e.initialInputValue && b(e.initialInputValue, !0);
    }), ne(R(e, "searchResults"), () => {
      w.value = $.value.trim(), f.value && o.value && w.value.length > 0 && (i.value = !0), y !== void 0 && (clearTimeout(y), y = void 0), o.value = !1, r.value = !1;
    }), {
      form: a,
      menu: d,
      menuId: l,
      highlightedId: g,
      selection: x,
      menuMessageClass: L,
      footer: Q,
      asSearchResult: M,
      inputValue: $,
      searchQuery: w,
      expanded: i,
      showPending: r,
      rootClasses: q,
      rootStyle: G,
      otherAttrs: U,
      menuConfig: V,
      onUpdateInputValue: b,
      onUpdateMenuSelection: k,
      onFocus: H,
      onBlur: ae,
      onSearchResultClick: _e,
      onSearchResultKeyboardNavigation: Te,
      onSearchFooterClick: Le,
      onSubmit: Ve,
      onKeydown: De,
      MenuFooterValue: ve,
      articleIcon: Wt
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
const Jl = ["id", "action"], Xl = { class: "cdx-typeahead-search__menu-message__text" }, Yl = { class: "cdx-typeahead-search__menu-message__text" }, ea = ["href", "onClickCapture"], ta = { class: "cdx-menu-item__text cdx-typeahead-search__search-footer__text" }, na = { class: "cdx-typeahead-search__search-footer__query" };
function oa(e, t, n, s, a, d) {
  const l = S("cdx-icon"), i = S("cdx-menu"), o = S("cdx-search-input");
  return u(), h("div", {
    class: K(["cdx-typeahead-search", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    v("form", {
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
        default: B(() => [
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
            pending: B(() => [
              v("div", {
                class: K(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                v("span", Xl, [
                  I(e.$slots, "search-results-pending")
                ])
              ], 2)
            ]),
            "no-results": B(() => [
              v("div", {
                class: K(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                v("span", Yl, [
                  I(e.$slots, "search-no-results-text")
                ])
              ], 2)
            ]),
            default: B(({ menuItem: r, active: f }) => [
              r.value === e.MenuFooterValue ? (u(), h("a", {
                key: 0,
                class: K(["cdx-menu-item__content cdx-typeahead-search__search-footer", {
                  "cdx-typeahead-search__search-footer__active": f
                }]),
                href: e.asSearchResult(r).url,
                onClickCapture: ee(($) => e.onSearchFooterClick(e.asSearchResult(r)), ["stop"])
              }, [
                O(l, {
                  class: "cdx-menu-item__thumbnail cdx-typeahead-search__search-footer__icon",
                  icon: e.articleIcon
                }, null, 8, ["icon"]),
                v("span", ta, [
                  I(e.$slots, "search-footer-text", { searchQuery: e.searchQuery }, () => [
                    v("strong", na, N(e.searchQuery), 1)
                  ])
                ])
              ], 42, ea)) : _("", !0)
            ]),
            _: 3
          }, 16, ["id", "expanded", "show-pending", "selected", "menu-items", "footer", "search-query", "show-no-results-slot", "aria-label", "onUpdate:selected", "onMenuItemKeyboardNavigation"])
        ]),
        _: 3
      }, 16, ["modelValue", "button-label", "aria-controls", "aria-expanded", "aria-activedescendant", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
      I(e.$slots, "default")
    ], 40, Jl)
  ], 6);
}
const Ca = /* @__PURE__ */ F(Zl, [["render", oa]]);
export {
  sa as CdxAccordion,
  me as CdxButton,
  ia as CdxButtonGroup,
  da as CdxCard,
  ua as CdxCheckbox,
  pa as CdxCombobox,
  fa as CdxDialog,
  ma as CdxField,
  J as CdxIcon,
  ra as CdxInfoChip,
  Me as CdxLabel,
  ha as CdxLookup,
  Be as CdxMenu,
  ko as CdxMenuItem,
  ol as CdxMessage,
  Ao as CdxProgressBar,
  va as CdxRadio,
  yl as CdxSearchInput,
  ho as CdxSearchResultTitle,
  ba as CdxSelect,
  ga as CdxTab,
  ya as CdxTabs,
  $a as CdxTextArea,
  We as CdxTextInput,
  $t as CdxThumbnail,
  ql as CdxToggleButton,
  _a as CdxToggleButtonGroup,
  Ia as CdxToggleSwitch,
  Ca as CdxTypeaheadSearch,
  ca as stringHelpers,
  pt as useComputedDirection,
  _t as useComputedDisabled,
  tn as useComputedLanguage,
  ie as useFieldData,
  W as useGeneratedId,
  ze as useIntersectionObserver,
  ue as useModelWrapper,
  Ae as useResizeObserver,
  de as useSplitAttributes
};
