var fn = Object.defineProperty, hn = Object.defineProperties;
var mn = Object.getOwnPropertyDescriptors;
var qe = Object.getOwnPropertySymbols;
var At = Object.prototype.hasOwnProperty, Bt = Object.prototype.propertyIsEnumerable;
var St = (e, t, n) => t in e ? fn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, J = (e, t) => {
  for (var n in t || (t = {}))
    At.call(t, n) && St(e, n, t[n]);
  if (qe)
    for (var n of qe(t))
      Bt.call(t, n) && St(e, n, t[n]);
  return e;
}, se = (e, t) => hn(e, mn(t));
var $e = (e, t) => {
  var n = {};
  for (var o in e)
    At.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && qe)
    for (var o of qe(e))
      t.indexOf(o) < 0 && Bt.call(e, o) && (n[o] = e[o]);
  return n;
};
var ge = (e, t, n) => new Promise((o, a) => {
  var r = (i) => {
    try {
      s(n.next(i));
    } catch (d) {
      a(d);
    }
  }, l = (i) => {
    try {
      s(n.throw(i));
    } catch (d) {
      a(d);
    }
  }, s = (i) => i.done ? o(i.value) : Promise.resolve(i.value).then(r, l);
  s((n = n.apply(e, t)).next());
});
import { ref as m, onMounted as Ie, defineComponent as P, computed as f, openBlock as c, createElementBlock as w, normalizeClass as z, toDisplayString as Q, createCommentVNode as S, Comment as vn, warn as rt, watch as Z, withKeys as he, renderSlot as B, getCurrentInstance as gn, resolveComponent as L, createBlock as F, resolveDynamicComponent as Ge, withCtx as O, createVNode as U, createElementVNode as k, withDirectives as ue, vShow as Ke, Fragment as Te, renderList as He, createTextVNode as ce, Transition as pt, normalizeStyle as fe, inject as Ce, toRef as q, mergeProps as te, vModelCheckbox as Kt, createSlots as Ye, withModifiers as re, nextTick as Be, vModelDynamic as dt, onUnmounted as Xe, unref as Fe, shallowRef as bn, getCurrentScope as yn, onScopeDispose as $n, shallowReadonly as Ve, Teleport as Cn, toRefs as wn, provide as Ee, vModelRadio as In, vModelText as _n } from "vue";
const xn = '<path d="M11.53 2.3A1.85 1.85 0 0010 1.21 1.85 1.85 0 008.48 2.3L.36 16.36C-.48 17.81.21 19 1.88 19h16.24c1.67 0 2.36-1.19 1.52-2.64zM11 16H9v-2h2zm0-4H9V6h2z"/>', kn = '<path d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"/><circle cx="10" cy="10" r="3"/>', Sn = '<path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"/>', An = '<path d="m4.34 2.93 12.73 12.73-1.41 1.41L2.93 4.35z"/><path d="M17.07 4.34 4.34 17.07l-1.41-1.41L15.66 2.93z"/>', Bn = '<path d="M13.728 1H6.272L1 6.272v7.456L6.272 19h7.456L19 13.728V6.272zM11 15H9v-2h2zm0-4H9V5h2z"/>', Tn = '<path d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"/>', Mn = '<path d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"/><path d="M19 5H1V3h18zm0 12H1v-2h18z"/>', Ln = '<path d="M8 19a1 1 0 001 1h2a1 1 0 001-1v-1H8zm9-12a7 7 0 10-12 4.9S7 14 7 15v1a1 1 0 001 1h4a1 1 0 001-1v-1c0-1 2-3.1 2-3.1A7 7 0 0017 7z"/>', Vn = '<path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM9 5h2v2H9zm0 4h2v6H9z"/>', Dn = '<path d="M7 1 5.6 2.5 13 10l-7.4 7.5L7 19l9-9z"/>', En = '<path d="m4 10 9 9 1.4-1.5L7 10l7.4-7.5L13 1z"/>', Rn = '<path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"/>', On = '<path d="M10 20a10 10 0 010-20 10 10 0 110 20Zm-2-5 9-8.5L15.5 5 8 12 4.5 8.5 3 10l5 5Z"/>', Nt = xn, Fn = kn, Kn = Sn, ft = An, Ht = Bn, ht = Tn, Nn = Mn, Hn = {
  langCodeMap: {
    ar: Ln
  },
  default: Vn
}, zn = {
  ltr: Dn,
  shouldFlip: !0
}, qn = {
  ltr: En,
  shouldFlip: !0
}, Pn = Rn, zt = On;
function Wn(e, t, n) {
  if (typeof e == "string" || "path" in e)
    return e;
  if ("shouldFlip" in e)
    return e.ltr;
  if ("rtl" in e)
    return n === "rtl" ? e.rtl : e.ltr;
  const o = t in e.langCodeMap ? e.langCodeMap[t] : e.default;
  return typeof o == "string" || "path" in o ? o : o.ltr;
}
function jn(e, t) {
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
  return Ie(() => {
    const n = window.getComputedStyle(e.value).direction;
    t.value = n === "ltr" || n === "rtl" ? n : null;
  }), t;
}
function Un(e) {
  const t = m("");
  return Ie(() => {
    let n = e.value;
    for (; n && n.lang === ""; )
      n = n.parentElement;
    t.value = n ? n.lang : null;
  }), t;
}
function le(e) {
  return (t) => typeof t == "string" && e.indexOf(t) !== -1;
}
const We = "cdx", Qn = [
  "default",
  "progressive",
  "destructive"
], Gn = [
  "normal",
  "primary",
  "quiet"
], Yn = [
  "medium",
  "large"
], Xn = [
  "x-small",
  "small",
  "medium"
], Zn = [
  "notice",
  "warning",
  "error",
  "success"
], qt = le(Zn), Jn = [
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
], _e = [
  "default",
  "error"
], eo = 120, to = 500, De = "cdx-menu-footer-item", Pt = Symbol("CdxTabs"), Wt = Symbol("CdxActiveTab"), jt = Symbol("CdxFieldInputId"), Ze = Symbol("CdxFieldDescriptionId"), Ut = Symbol("CdxFieldStatus"), Qt = Symbol("CdxDisabled"), no = "".concat(We, "-no-invert"), oo = le(Xn), lo = P({
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
      validator: oo
    }
  },
  setup(e) {
    const t = m(), n = mt(t), o = Un(t), a = f(() => e.dir || n.value), r = f(() => e.lang || o.value), l = f(() => ({
      "cdx-icon--flipped": a.value === "rtl" && r.value !== null && jn(e.icon, r.value),
      ["cdx-icon--".concat(e.size)]: !0
    })), s = f(
      () => Wn(e.icon, r.value || "", a.value || "ltr")
    ), i = f(() => typeof s.value == "string" ? s.value : ""), d = f(() => typeof s.value != "string" ? s.value.path : "");
    return {
      rootElement: t,
      rootClasses: l,
      iconSvg: i,
      iconPath: d
    };
  }
});
const W = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, a] of t)
    n[o] = a;
  return n;
}, so = ["aria-hidden"], io = { key: 0 }, ao = ["innerHTML"], ro = ["d"];
function uo(e, t, n, o, a, r) {
  return c(), w("span", {
    ref: "rootElement",
    class: z(["cdx-icon", e.rootClasses])
  }, [
    (c(), w("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      "aria-hidden": e.iconLabel ? void 0 : !0
    }, [
      e.iconLabel ? (c(), w("title", io, Q(e.iconLabel), 1)) : S("", !0),
      e.iconSvg ? (c(), w("g", {
        key: 1,
        innerHTML: e.iconSvg
      }, null, 8, ao)) : (c(), w("path", {
        key: 2,
        d: e.iconPath
      }, null, 8, ro))
    ], 8, so))
  ], 2);
}
const oe = /* @__PURE__ */ W(lo, [["render", uo]]);
function Gt(e) {
  const t = [];
  for (const n of e)
    // HTML tag
    typeof n.type == "string" || // Component
    typeof n.type == "object" ? t.push(n) : n.type !== vn && (typeof n.children == "string" && n.children.trim() !== "" ? t.push(n.children) : Array.isArray(n.children) && t.push(...Gt(n.children)));
  return t;
}
function Yt(e, t) {
  return typeof e.type == "object" && "name" in e.type ? t !== void 0 ? e.type.name === t : !0 : !1;
}
function co(e, t) {
  return typeof e.type == "string" ? t !== void 0 ? e.type === t.toLowerCase() : !0 : !1;
}
function vt(e) {
  const t = typeof e == "function" ? e() : e;
  return t ? Gt(t) : [];
}
function gt(e, t) {
  if (e()) {
    rt(t);
    return;
  }
  const n = Z(e, (o) => {
    o && (rt(t), n());
  });
}
function Xt(e, t, n) {
  const o = f(() => {
    const a = vt(e);
    if (a.length !== 1)
      return !1;
    const r = a[0];
    return !!(typeof r == "object" && (Yt(r, "CdxIcon") || co(r, "svg")));
  });
  return gt(
    () => o.value && !t["aria-label"] && !t["aria-hidden"],
    "".concat(n, ": Icon-only buttons require one of the following attributes: aria-label or aria-hidden. See documentation at https://doc.wikimedia.org/codex/latest/components/demos/button.html#icon-only-button")
  ), o;
}
const po = le(Qn), fo = le(Gn), ho = le(Yn), mo = P({
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
      validator: po
    },
    /**
     * Visual prominence of the button.
     *
     * @values 'normal', 'primary', 'quiet'
     */
    weight: {
      type: String,
      default: "normal",
      validator: fo
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
      validator: ho
    }
  },
  emits: ["click"],
  setup(e, { emit: t, slots: n, attrs: o }) {
    const a = Xt(n.default, o, "CdxButton"), r = m(!1);
    return {
      rootClasses: f(() => ({
        ["cdx-button--action-".concat(e.action)]: !0,
        ["cdx-button--weight-".concat(e.weight)]: !0,
        ["cdx-button--size-".concat(e.size)]: !0,
        "cdx-button--framed": e.weight !== "quiet",
        "cdx-button--icon-only": a.value,
        "cdx-button--is-active": r.value
      })),
      onClick: (d) => {
        t("click", d);
      },
      setActive: (d) => {
        r.value = d;
      }
    };
  }
});
function vo(e, t, n, o, a, r) {
  return c(), w("button", {
    class: z(["cdx-button", e.rootClasses]),
    onClick: t[0] || (t[0] = (...l) => e.onClick && e.onClick(...l)),
    onKeydown: t[1] || (t[1] = he((l) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = he((l) => e.setActive(!1), ["space", "enter"]))
  }, [
    B(e.$slots, "default")
  ], 34);
}
const Ae = /* @__PURE__ */ W(mo, [["render", vo]]);
let at = 0;
function ee(e) {
  const t = gn(), n = (t == null ? void 0 : t.props.id) || (t == null ? void 0 : t.attrs.id);
  return e ? "".concat(We, "-").concat(e, "-").concat(at++) : n ? "".concat(We, "-").concat(n, "-").concat(at++) : "".concat(We, "-").concat(at++);
}
const go = P({
  name: "CdxAccordion",
  components: { CdxButton: Ae, CdxIcon: oe },
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
    const n = m(!1), o = ee("accordion"), a = ee("accordion-panel"), r = () => {
      n.value = !n.value;
    }, l = () => {
      t("action-button-click");
    }, s = f(() => e.actionIcon && (n.value || e.actionAlwaysVisible)), i = f(() => ({
      "cdx-accordion--has-icon": s
    }));
    return {
      cdxIconExpand: ht,
      emitActionButtonClick: l,
      isExpanded: n,
      rootClasses: i,
      shouldShowActionButton: s,
      toggle: r,
      accordionId: o,
      accordionPanelId: a
    };
  }
});
const bo = { class: "cdx-accordion__toggle__title" }, yo = { class: "cdx-accordion__toggle__title-text" }, $o = { class: "cdx-accordion__toggle__description" }, Co = ["id", "aria-labelledby", "aria-hidden"];
function wo(e, t, n, o, a, r) {
  const l = L("cdx-icon"), s = L("cdx-button");
  return c(), w("div", {
    class: z(["cdx-accordion", e.rootClasses])
  }, [
    (c(), F(Ge(e.headingLevel), { class: "cdx-accordion__header" }, {
      default: O(() => [
        U(s, {
          id: e.accordionId,
          "aria-expanded": e.isExpanded,
          "aria-controls": e.accordionPanelId,
          class: "cdx-accordion__toggle",
          type: "button",
          weight: "quiet",
          onClick: e.toggle
        }, {
          default: O(() => [
            k("span", bo, [
              U(l, {
                class: "cdx-accordion__toggle__title-icon",
                icon: e.cdxIconExpand,
                size: "small"
              }, null, 8, ["icon"]),
              k("span", yo, [
                B(e.$slots, "title")
              ])
            ]),
            k("span", $o, [
              B(e.$slots, "description")
            ])
          ]),
          _: 3
        }, 8, ["id", "aria-expanded", "aria-controls", "onClick"]),
        e.shouldShowActionButton ? (c(), F(s, {
          key: 0,
          class: "cdx-accordion__action",
          "aria-label": e.actionButtonLabel,
          type: "button",
          weight: "quiet",
          onClick: e.emitActionButtonClick
        }, {
          default: O(() => [
            U(l, {
              icon: e.actionIcon,
              "icon-label": e.actionButtonLabel,
              size: "medium"
            }, null, 8, ["icon", "icon-label"])
          ]),
          _: 1
        }, 8, ["aria-label", "onClick"])) : S("", !0)
      ]),
      _: 3
    })),
    ue(k("div", {
      id: e.accordionPanelId,
      "aria-labelledby": e.accordionId,
      "aria-hidden": e.isExpanded ? void 0 : !0,
      class: "cdx-accordion__content",
      role: "region"
    }, [
      B(e.$slots, "default")
    ], 8, Co), [
      [Ke, e.isExpanded]
    ])
  ], 2);
}
const Pi = /* @__PURE__ */ W(go, [["render", wo]]);
function Zt(e) {
  return e.label === void 0 ? e.value : e.label === null ? "" : e.label;
}
const Io = P({
  name: "CdxButtonGroup",
  components: {
    CdxButton: Ae,
    CdxIcon: oe
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
      getButtonLabel: Zt
    };
  }
});
const _o = { class: "cdx-button-group" };
function xo(e, t, n, o, a, r) {
  const l = L("cdx-icon"), s = L("cdx-button");
  return c(), w("div", _o, [
    (c(!0), w(Te, null, He(e.buttons, (i) => (c(), F(s, {
      key: i.value,
      disabled: i.disabled || e.disabled,
      "aria-label": i.ariaLabel,
      onClick: (d) => e.$emit("click", i.value)
    }, {
      default: O(() => [
        B(e.$slots, "default", { button: i }, () => [
          i.icon ? (c(), F(l, {
            key: 0,
            icon: i.icon
          }, null, 8, ["icon"])) : S("", !0),
          ce(" " + Q(e.getButtonLabel(i)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["disabled", "aria-label", "onClick"]))), 128))
  ]);
}
const Wi = /* @__PURE__ */ W(Io, [["render", xo]]), ko = P({
  name: "CdxThumbnail",
  components: { CdxIcon: oe },
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
      default: Nn
    }
  },
  setup: (e) => {
    const t = m(!1), n = m({}), o = (a) => {
      const r = a.replace(/([\\"\n])/g, "\\$1"), l = new Image();
      l.onload = () => {
        n.value = { backgroundImage: 'url("'.concat(r, '")') }, t.value = !0;
      }, l.onerror = () => {
        t.value = !1;
      }, l.src = r;
    };
    return Ie(() => {
      var a;
      (a = e.thumbnail) != null && a.url && o(e.thumbnail.url);
    }), {
      thumbnailStyle: n,
      thumbnailLoaded: t,
      NoInvertClass: no
    };
  }
});
const So = { class: "cdx-thumbnail" }, Ao = {
  key: 0,
  class: "cdx-thumbnail__placeholder"
};
function Bo(e, t, n, o, a, r) {
  const l = L("cdx-icon");
  return c(), w("span", So, [
    e.thumbnailLoaded ? S("", !0) : (c(), w("span", Ao, [
      U(l, {
        icon: e.placeholderIcon,
        class: "cdx-thumbnail__placeholder__icon--vue"
      }, null, 8, ["icon"])
    ])),
    U(pt, { name: "cdx-thumbnail__image" }, {
      default: O(() => [
        e.thumbnailLoaded ? (c(), w("span", {
          key: 0,
          style: fe(e.thumbnailStyle),
          class: z([e.NoInvertClass, "cdx-thumbnail__image"])
        }, null, 6)) : S("", !0)
      ]),
      _: 1
    })
  ]);
}
const Jt = /* @__PURE__ */ W(ko, [["render", Bo]]), To = P({
  name: "CdxCard",
  components: { CdxIcon: oe, CdxThumbnail: Jt },
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
    const t = f(() => !!e.url), n = f(() => t.value ? "a" : "span"), o = f(() => t.value ? e.url : void 0);
    return {
      isLink: t,
      contentTag: n,
      cardLink: o
    };
  }
});
const Mo = { class: "cdx-card__text" }, Lo = { class: "cdx-card__text__title" }, Vo = {
  key: 0,
  class: "cdx-card__text__description"
}, Do = {
  key: 1,
  class: "cdx-card__text__supporting-text"
};
function Eo(e, t, n, o, a, r) {
  const l = L("cdx-thumbnail"), s = L("cdx-icon");
  return c(), F(Ge(e.contentTag), {
    href: e.cardLink,
    class: z(["cdx-card", {
      "cdx-card--is-link": e.isLink,
      // Include dynamic classes in the template so that $slots is reactive.
      "cdx-card--title-only": !e.$slots.description && !e.$slots["supporting-text"]
    }])
  }, {
    default: O(() => [
      e.thumbnail || e.forceThumbnail ? (c(), F(l, {
        key: 0,
        thumbnail: e.thumbnail,
        "placeholder-icon": e.customPlaceholderIcon,
        class: "cdx-card__thumbnail"
      }, null, 8, ["thumbnail", "placeholder-icon"])) : e.icon ? (c(), F(s, {
        key: 1,
        icon: e.icon,
        class: "cdx-card__icon"
      }, null, 8, ["icon"])) : S("", !0),
      k("span", Mo, [
        k("span", Lo, [
          B(e.$slots, "title")
        ]),
        e.$slots.description ? (c(), w("span", Vo, [
          B(e.$slots, "description")
        ])) : S("", !0),
        e.$slots["supporting-text"] ? (c(), w("span", Do, [
          B(e.$slots, "supporting-text")
        ])) : S("", !0)
      ])
    ]),
    _: 3
  }, 8, ["href", "class"]);
}
const ji = /* @__PURE__ */ W(To, [["render", Eo]]);
function en(e) {
  const t = Ce(Qt, m(!1));
  return f(() => t.value || e.value);
}
function me(e, t, n) {
  const o = en(e), a = Ce(Ut, m("default")), r = f(() => t != null && t.value && t.value !== "default" ? t.value : a.value), l = Ce(jt, void 0), s = f(
    () => l && l.value ? l.value : n
  );
  return {
    computedDisabled: o,
    computedStatus: r,
    computedInputId: s
  };
}
function ve(e, t = f(() => ({}))) {
  const n = f(() => {
    const r = $e(t.value, []);
    return e.class && e.class.split(" ").forEach((s) => {
      r[s] = !0;
    }), r;
  }), o = f(() => {
    if ("style" in e)
      return e.style;
  }), a = f(() => {
    const i = e, { class: r, style: l } = i;
    return $e(i, ["class", "style"]);
  });
  return {
    rootClasses: n,
    rootStyle: o,
    otherAttrs: a
  };
}
const Ro = P({
  name: "CdxLabel",
  components: { CdxIcon: oe },
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
    const { computedDisabled: n } = me(q(e, "disabled")), o = f(() => ({
      "cdx-label--visually-hidden": e.visuallyHidden,
      "cdx-label--disabled": n.value
    })), {
      rootClasses: a,
      rootStyle: r,
      otherAttrs: l
    } = ve(t, o);
    return {
      rootClasses: a,
      rootStyle: r,
      otherAttrs: l
    };
  }
});
const Oo = ["for"], Fo = { class: "cdx-label__label__text" }, Ko = {
  key: 1,
  class: "cdx-label__label__optional-flag"
}, No = ["id"], Ho = { class: "cdx-label__label" }, zo = { class: "cdx-label__label__text" }, qo = {
  key: 1,
  class: "cdx-label__label__optional-flag"
}, Po = {
  key: 0,
  class: "cdx-label__description"
};
function Wo(e, t, n, o, a, r) {
  const l = L("cdx-icon");
  return e.isLegend ? (c(), w("legend", te({
    key: 1,
    class: ["cdx-label", e.rootClasses],
    style: e.rootStyle
  }, e.otherAttrs), [
    k("span", Ho, [
      e.icon ? (c(), F(l, {
        key: 0,
        icon: e.icon,
        class: "cdx-label__label__icon"
      }, null, 8, ["icon"])) : S("", !0),
      k("span", zo, [
        B(e.$slots, "default")
      ]),
      e.optionalFlag ? (c(), w("span", qo, Q(" ") + " " + Q(e.optionalFlag), 1)) : S("", !0)
    ]),
    e.$slots.description && e.$slots.description().length > 0 ? (c(), w("span", Po, [
      B(e.$slots, "description")
    ])) : S("", !0)
  ], 16)) : (c(), w("div", {
    key: 0,
    class: z(["cdx-label", e.rootClasses]),
    style: fe(e.rootStyle)
  }, [
    k("label", te({
      class: "cdx-label__label",
      for: e.inputId ? e.inputId : void 0
    }, e.otherAttrs), [
      e.icon ? (c(), F(l, {
        key: 0,
        icon: e.icon,
        class: "cdx-label__label__icon"
      }, null, 8, ["icon"])) : S("", !0),
      k("span", Fo, [
        B(e.$slots, "default")
      ]),
      e.optionalFlag ? (c(), w("span", Ko, Q(" ") + " " + Q(e.optionalFlag), 1)) : S("", !0)
    ], 16, Oo),
    e.$slots.description && e.$slots.description().length > 0 ? (c(), w("span", {
      key: 0,
      id: e.descriptionId || void 0,
      class: "cdx-label__description"
    }, [
      B(e.$slots, "description")
    ], 8, No)) : S("", !0)
  ], 6));
}
const Je = /* @__PURE__ */ W(Ro, [["render", Wo]]);
function bt(e, t, n) {
  gt(
    () => vt(e).length === 0 && !(t != null && t["aria-label"]) && !(t != null && t["aria-labelledby"]),
    "".concat(n, ": Inputs must have an associated label. Provide one of the following:\n - A label via the appropriate slot\n - An `aria-label` attribute set to the label text\n - An `aria-labelledby` attribute set to the ID of the label element")
  );
}
function ye(e, t, n) {
  return f({
    get: () => e.value,
    set: (o) => (
      // If eventName is undefined, then 'update:modelValue' must be a valid EventName,
      // but TypeScript's type analysis isn't clever enough to realize that
      t(n || "update:modelValue", o)
    )
  });
}
const jo = le(_e), Uo = P({
  name: "CdxCheckbox",
  components: { CdxLabel: Je },
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
      validator: jo
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
  setup(e, { emit: t, slots: n, attrs: o }) {
    var p;
    bt((p = n.default) == null ? void 0 : p.call(n), o, "CdxCheckbox");
    const {
      computedDisabled: a,
      computedStatus: r
    } = me(
      q(e, "disabled"),
      q(e, "status")
    ), l = f(() => ({
      "cdx-checkbox--inline": e.inline,
      ["cdx-checkbox--status-".concat(r.value)]: !0
    })), s = m(), i = ee("checkbox"), d = ee("description"), u = ye(q(e, "modelValue"), t);
    return {
      rootClasses: l,
      computedDisabled: a,
      input: s,
      checkboxId: i,
      descriptionId: d,
      wrappedModel: u
    };
  }
});
const Qo = ["id", "aria-describedby", "value", "disabled", ".indeterminate"], Go = /* @__PURE__ */ k("span", { class: "cdx-checkbox__icon" }, null, -1);
function Yo(e, t, n, o, a, r) {
  const l = L("cdx-label");
  return c(), w("span", {
    class: z(["cdx-checkbox", e.rootClasses])
  }, [
    ue(k("input", {
      id: e.checkboxId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (s) => e.wrappedModel = s),
      class: "cdx-checkbox__input",
      type: "checkbox",
      "aria-describedby": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      value: e.inputValue,
      disabled: e.computedDisabled,
      ".indeterminate": e.indeterminate
    }, null, 8, Qo), [
      [Kt, e.wrappedModel]
    ]),
    Go,
    e.$slots.default && e.$slots.default().length ? (c(), F(l, {
      key: 0,
      class: "cdx-checkbox__label",
      "input-id": e.checkboxId,
      "description-id": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      disabled: e.computedDisabled
    }, Ye({
      default: O(() => [
        B(e.$slots, "default")
      ]),
      _: 2
    }, [
      e.$slots.description && e.$slots.description().length > 0 ? {
        name: "description",
        fn: O(() => [
          B(e.$slots, "description")
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["input-id", "description-id", "disabled"])) : S("", !0)
  ], 2);
}
const Ui = /* @__PURE__ */ W(Uo, [["render", Yo]]), Xo = P({
  name: "CdxInputChip",
  components: {
    CdxButton: Ae,
    CdxIcon: oe
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
    const n = m(), o = f(() => ({
      "cdx-input-chip--disabled": e.disabled
    }));
    function a(r) {
      var l;
      switch (r.key) {
        case "Enter":
          t("click-chip"), r.preventDefault(), r.stopPropagation();
          break;
        case "Escape":
          (l = n.value) == null || l.blur(), r.preventDefault(), r.stopPropagation();
          break;
        case "Backspace":
        case "Delete":
          t("remove-chip", r.key), r.preventDefault(), r.stopPropagation();
          break;
        case "ArrowLeft":
          t("arrow-left"), r.preventDefault(), r.stopPropagation();
          break;
        case "ArrowRight":
          t("arrow-right"), r.preventDefault(), r.stopPropagation();
          break;
      }
    }
    return {
      rootElement: n,
      rootClasses: o,
      onKeydown: a,
      cdxIconClose: ft
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
const Zo = ["aria-description"], Jo = { class: "cdx-input-chip__text" };
function el(e, t, n, o, a, r) {
  const l = L("cdx-icon"), s = L("cdx-button");
  return c(), w("div", {
    ref: "rootElement",
    class: z(["cdx-input-chip", e.rootClasses]),
    tabindex: "0",
    role: "option",
    "aria-description": e.chipAriaDescription,
    onKeydown: t[1] || (t[1] = (...i) => e.onKeydown && e.onKeydown(...i)),
    onClick: t[2] || (t[2] = (i) => e.$emit("click-chip"))
  }, [
    e.icon ? (c(), F(l, {
      key: 0,
      icon: e.icon,
      size: "small"
    }, null, 8, ["icon"])) : S("", !0),
    k("span", Jo, [
      B(e.$slots, "default")
    ]),
    U(s, {
      class: "cdx-input-chip__button",
      weight: "quiet",
      tabindex: "-1",
      "aria-hidden": "true",
      disabled: e.disabled,
      onClick: t[0] || (t[0] = re((i) => e.$emit("remove-chip", "button"), ["stop"]))
    }, {
      default: O(() => [
        U(l, {
          icon: e.cdxIconClose,
          size: "x-small"
        }, null, 8, ["icon"])
      ]),
      _: 1
    }, 8, ["disabled"])
  ], 42, Zo);
}
const tl = /* @__PURE__ */ W(Xo, [["render", el]]), nl = le(_e), ol = P({
  name: "CdxChipInput",
  components: {
    CdxInputChip: tl
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
      validator: nl
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
    const o = m(), a = mt(o), r = m(), l = m(""), s = m("default"), i = f(() => s.value === "error" || e.status === "error" ? "error" : "default"), { computedDisabled: d, computedStatus: u } = me(q(e, "disabled"), i), p = m(!1), g = f(() => ({
      "cdx-chip-input--has-separate-input": e.separateInput,
      ["cdx-chip-input--status-".concat(u.value)]: !0,
      // We need focused and disabled classes on the root element, which contains the
      // chips and the input, since it is styled to look like the input.
      "cdx-chip-input--focused": p.value,
      "cdx-chip-input--disabled": d.value
    })), {
      rootClasses: h,
      rootStyle: b,
      otherAttrs: I
    } = ve(n, g), y = [];
    function A($, K) {
      $ !== null && (y[K] = $);
    }
    const M = () => {
      r.value.focus();
    };
    function V() {
      e.inputChips.find(($) => $.value === l.value) ? s.value = "error" : l.value.length > 0 && (t("update:input-chips", e.inputChips.concat({ value: l.value })), l.value = "");
    }
    function H($) {
      t("update:input-chips", e.inputChips.filter(
        (K) => K.value !== $.value
      ));
    }
    function D($, K) {
      const Y = (
        // -1 for prev (left in LTR, right in RTL), +1 for next (right in LTR, left in RTL)
        a.value === "ltr" && $ === "left" || a.value === "rtl" && $ === "right" ? -1 : 1
      ), X = K + Y;
      if (!(X < 0)) {
        if (X >= e.inputChips.length) {
          M();
          return;
        }
        y[X].focus();
      }
    }
    function T($) {
      return ge(this, null, function* () {
        V(), yield Be(), H($), l.value = $.value, M();
      });
    }
    function _($, K, Y) {
      if (Y === "button")
        M();
      else if (Y === "Backspace") {
        const X = K === 0 ? 1 : K - 1;
        X < e.inputChips.length ? y[X].focus() : M();
      } else if (Y === "Delete") {
        const X = K + 1;
        X < e.inputChips.length ? y[X].focus() : M();
      }
      H($);
    }
    function x($) {
      var Y, X;
      const K = a.value === "rtl" ? "ArrowRight" : "ArrowLeft";
      switch ($.key) {
        case "Enter":
          if (l.value.length > 0) {
            V(), $.preventDefault(), $.stopPropagation();
            return;
          }
          break;
        case "Escape":
          (Y = r.value) == null || Y.blur(), $.preventDefault(), $.stopPropagation();
          return;
        case "Backspace":
        case K:
          if (((X = r.value) == null ? void 0 : X.selectionStart) === 0 && r.value.selectionEnd === 0 && e.inputChips.length > 0) {
            y[e.inputChips.length - 1].focus(), $.preventDefault(), $.stopPropagation();
            return;
          }
          break;
      }
    }
    function v() {
      p.value = !0;
    }
    function E() {
      p.value = !1;
    }
    function j($) {
      o.value.contains($.relatedTarget) || V();
    }
    return Z(q(e, "inputChips"), ($) => {
      const K = $.find((Y) => Y.value === l.value);
      s.value = K ? "error" : "default";
    }), Z(l, () => {
      s.value === "error" && (s.value = "default");
    }), {
      rootElement: o,
      input: r,
      inputValue: l,
      rootClasses: h,
      rootStyle: b,
      otherAttrs: I,
      assignChipTemplateRef: A,
      handleChipClick: T,
      handleChipRemove: _,
      moveChipFocus: D,
      onInputKeydown: x,
      focusInput: M,
      onInputFocus: v,
      onInputBlur: E,
      onFocusOut: j,
      computedDisabled: d
    };
  }
});
const ll = {
  class: "cdx-chip-input__chips",
  role: "listbox",
  "aria-orientation": "horizontal"
}, sl = ["disabled"], il = {
  key: 0,
  class: "cdx-chip-input__separate-input"
}, al = ["disabled"];
function rl(e, t, n, o, a, r) {
  const l = L("cdx-input-chip");
  return c(), w("div", {
    ref: "rootElement",
    class: z(["cdx-chip-input", e.rootClasses]),
    style: fe(e.rootStyle),
    onClick: t[8] || (t[8] = (...s) => e.focusInput && e.focusInput(...s)),
    onFocusout: t[9] || (t[9] = (...s) => e.onFocusOut && e.onFocusOut(...s))
  }, [
    k("div", ll, [
      (c(!0), w(Te, null, He(e.inputChips, (s, i) => (c(), F(l, {
        key: s.value,
        ref_for: !0,
        ref: (d) => e.assignChipTemplateRef(d, i),
        class: "cdx-chip-input__item",
        "chip-aria-description": e.chipAriaDescription,
        icon: s.icon,
        disabled: e.computedDisabled,
        onClickChip: (d) => e.handleChipClick(s),
        onRemoveChip: (d) => e.handleChipRemove(s, i, d),
        onArrowLeft: (d) => e.moveChipFocus("left", i),
        onArrowRight: (d) => e.moveChipFocus("right", i)
      }, {
        default: O(() => [
          ce(Q(s.value), 1)
        ]),
        _: 2
      }, 1032, ["chip-aria-description", "icon", "disabled", "onClickChip", "onRemoveChip", "onArrowLeft", "onArrowRight"]))), 128)),
      e.separateInput ? S("", !0) : ue((c(), w("input", te({
        key: 0,
        ref: "input",
        "onUpdate:modelValue": t[0] || (t[0] = (s) => e.inputValue = s),
        class: "cdx-chip-input__input",
        disabled: e.computedDisabled
      }, e.otherAttrs, {
        onBlur: t[1] || (t[1] = (...s) => e.onInputBlur && e.onInputBlur(...s)),
        onFocus: t[2] || (t[2] = (...s) => e.onInputFocus && e.onInputFocus(...s)),
        onKeydown: t[3] || (t[3] = (...s) => e.onInputKeydown && e.onInputKeydown(...s))
      }), null, 16, sl)), [
        [dt, e.inputValue]
      ])
    ]),
    e.separateInput ? (c(), w("div", il, [
      ue(k("input", te({
        ref: "input",
        "onUpdate:modelValue": t[4] || (t[4] = (s) => e.inputValue = s),
        class: "cdx-chip-input__input",
        disabled: e.computedDisabled
      }, e.otherAttrs, {
        onBlur: t[5] || (t[5] = (...s) => e.onInputBlur && e.onInputBlur(...s)),
        onFocus: t[6] || (t[6] = (...s) => e.onInputFocus && e.onInputFocus(...s)),
        onKeydown: t[7] || (t[7] = (...s) => e.onInputKeydown && e.onInputKeydown(...s))
      }), null, 16, al), [
        [dt, e.inputValue]
      ])
    ])) : S("", !0)
  ], 38);
}
const Qi = /* @__PURE__ */ W(ol, [["render", rl]]);
function tn(e) {
  return e.replace(/([\\{}()|.?*+\-^$[\]])/g, "\\$1");
}
const dl = "[̀-ͯ҃-҉֑-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣঁ-ঃ়া-ৄেৈো-্ৗৢৣ৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑੰੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣஂா-ூெ-ைொ-்ௗఀ-ఄా-ౄె-ైొ-్ౕౖౢౣಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣංඃ්ා-ුූෘ-ෟෲෳัิ-ฺ็-๎ັິ-ູົຼ່-ໍ༹༘༙༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏႚ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝᠋-᠍ᢅᢆᢩᤠ-ᤫᤰ-᤻ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼᪰-᪾ᬀ-ᬄ᬴-᭄᭫-᭳ᮀ-ᮂᮡ-ᮭ᯦-᯳ᰤ-᰷᳐-᳔᳒-᳨᳭ᳲ-᳴᳷-᳹᷀-᷹᷻-᷿⃐-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯-꙲ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣠-꣱ꣿꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀ꧥꨩ-ꨶꩃꩌꩍꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭ﬞ︀-️︠-︯]";
function nn(e, t) {
  if (!e)
    return [t, "", ""];
  const n = tn(e), o = new RegExp(
    // Per https://www.regular-expressions.info/unicode.html, "any code point that is not a
    // combining mark can be followed by any number of combining marks." See also the
    // discussion in https://phabricator.wikimedia.org/T35242.
    n + dl + "*",
    "i"
  ).exec(t);
  if (!o || o.index === void 0)
    return [t, "", ""];
  const a = o.index, r = a + o[0].length, l = t.slice(a, r), s = t.slice(0, a), i = t.slice(r, t.length);
  return [s, l, i];
}
const Gi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  regExpEscape: tn,
  splitStringAtMatch: nn
}, Symbol.toStringTag, { value: "Module" })), ul = P({
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
    titleChunks: f(() => nn(e.searchQuery, String(e.title)))
  })
});
const cl = { class: "cdx-search-result-title" }, pl = { class: "cdx-search-result-title__match" };
function fl(e, t, n, o, a, r) {
  return c(), w("span", cl, [
    k("bdi", null, [
      ce(Q(e.titleChunks[0]), 1),
      k("span", pl, Q(e.titleChunks[1]), 1),
      ce(Q(e.titleChunks[2]), 1)
    ])
  ]);
}
const hl = /* @__PURE__ */ W(ul, [["render", fl]]), ml = P({
  name: "CdxMenuItem",
  components: { CdxIcon: oe, CdxThumbnail: Jt, CdxSearchResultTitle: hl },
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
    }, o = () => {
      t("change", "highlighted", !1);
    }, a = (u) => {
      u.button === 0 && t("change", "active", !0);
    }, r = () => {
      t("change", "selected", !0);
    }, l = f(() => e.searchQuery.length > 0), s = f(() => ({
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
    })), i = f(() => e.url ? "a" : "span"), d = f(() => e.label || String(e.value));
    return {
      onMouseMove: n,
      onMouseLeave: o,
      onMouseDown: a,
      onClick: r,
      highlightQuery: l,
      rootClasses: s,
      contentTag: i,
      title: d
    };
  }
});
const vl = ["id", "aria-disabled", "aria-selected"], gl = { class: "cdx-menu-item__text" }, bl = ["lang"], yl = ["lang"], $l = ["lang"], Cl = ["lang"];
function wl(e, t, n, o, a, r) {
  const l = L("cdx-thumbnail"), s = L("cdx-icon"), i = L("cdx-search-result-title");
  return c(), w("li", {
    id: e.id,
    role: "option",
    class: z(["cdx-menu-item", e.rootClasses]),
    "aria-disabled": e.disabled,
    "aria-selected": e.selected,
    onMousemove: t[0] || (t[0] = (...d) => e.onMouseMove && e.onMouseMove(...d)),
    onMouseleave: t[1] || (t[1] = (...d) => e.onMouseLeave && e.onMouseLeave(...d)),
    onMousedown: t[2] || (t[2] = re((...d) => e.onMouseDown && e.onMouseDown(...d), ["prevent"])),
    onClick: t[3] || (t[3] = (...d) => e.onClick && e.onClick(...d))
  }, [
    B(e.$slots, "default", {}, () => [
      (c(), F(Ge(e.contentTag), {
        href: e.url ? e.url : void 0,
        class: "cdx-menu-item__content"
      }, {
        default: O(() => {
          var d, u, p, g, h, b;
          return [
            e.showThumbnail ? (c(), F(l, {
              key: 0,
              thumbnail: e.thumbnail,
              class: "cdx-menu-item__thumbnail"
            }, null, 8, ["thumbnail"])) : e.icon ? (c(), F(s, {
              key: 1,
              icon: e.icon,
              class: "cdx-menu-item__icon"
            }, null, 8, ["icon"])) : S("", !0),
            k("span", gl, [
              e.highlightQuery ? (c(), F(i, {
                key: 0,
                title: e.title,
                "search-query": e.searchQuery,
                lang: (d = e.language) == null ? void 0 : d.label
              }, null, 8, ["title", "search-query", "lang"])) : (c(), w("span", {
                key: 1,
                class: "cdx-menu-item__text__label",
                lang: (u = e.language) == null ? void 0 : u.label
              }, [
                k("bdi", null, Q(e.title), 1)
              ], 8, bl)),
              e.match ? (c(), w(Te, { key: 2 }, [
                ce(Q(" ") + " "),
                e.highlightQuery ? (c(), F(i, {
                  key: 0,
                  title: e.match,
                  "search-query": e.searchQuery,
                  lang: (p = e.language) == null ? void 0 : p.match
                }, null, 8, ["title", "search-query", "lang"])) : (c(), w("span", {
                  key: 1,
                  class: "cdx-menu-item__text__match",
                  lang: (g = e.language) == null ? void 0 : g.match
                }, [
                  k("bdi", null, Q(e.match), 1)
                ], 8, yl))
              ], 64)) : S("", !0),
              e.supportingText ? (c(), w(Te, { key: 3 }, [
                ce(Q(" ") + " "),
                k("span", {
                  class: "cdx-menu-item__text__supporting-text",
                  lang: (h = e.language) == null ? void 0 : h.supportingText
                }, [
                  k("bdi", null, Q(e.supportingText), 1)
                ], 8, $l)
              ], 64)) : S("", !0),
              e.description ? (c(), w("span", {
                key: 4,
                class: "cdx-menu-item__text__description",
                lang: (b = e.language) == null ? void 0 : b.description
              }, [
                k("bdi", null, Q(e.description), 1)
              ], 8, Cl)) : S("", !0)
            ])
          ];
        }),
        _: 1
      }, 8, ["href"]))
    ])
  ], 42, vl);
}
const Il = /* @__PURE__ */ W(ml, [["render", wl]]), _l = P({
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
    gt(
      () => !e.inline && !t["aria-label"] && !t["aria-hidden"],
      "CdxProgressBar: Progress bars require one of the following attribute, aria-label or aria-hidden. See documentation on https://doc.wikimedia.org/codex/latest/components/demos/progressbar.html"
    );
    const n = f(() => ({
      "cdx-progress-bar--block": !e.inline,
      "cdx-progress-bar--inline": e.inline,
      "cdx-progress-bar--enabled": !e.disabled,
      "cdx-progress-bar--disabled": e.disabled
    })), o = f(() => e.inline ? "true" : void 0);
    return {
      rootClasses: n,
      computedAriaHidden: o
    };
  }
});
const xl = ["aria-hidden", "aria-disabled"], kl = /* @__PURE__ */ k("div", { class: "cdx-progress-bar__bar" }, null, -1), Sl = [
  kl
];
function Al(e, t, n, o, a, r) {
  return c(), w("div", {
    class: z(["cdx-progress-bar", e.rootClasses]),
    role: "progressbar",
    "aria-hidden": e.computedAriaHidden,
    "aria-disabled": e.disabled
  }, Sl, 10, xl);
}
const Bl = /* @__PURE__ */ W(_l, [["render", Al]]);
function ut(e, t) {
  const n = m(!1);
  let o = !1;
  if (typeof window != "object" || !("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype))
    return n;
  const a = new window.IntersectionObserver(
    (r) => {
      const l = r[0];
      l && (n.value = l.isIntersecting);
    },
    t
  );
  return Ie(() => {
    o = !0, e.value && a.observe(e.value);
  }), Xe(() => {
    o = !1, a.disconnect();
  }), Z(e, (r) => {
    o && (a.disconnect(), n.value = !1, r && a.observe(r));
  }), n;
}
const Tl = P({
  name: "CdxMenu",
  components: {
    CdxMenuItem: Il,
    CdxProgressBar: Bl
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
    "isExpanded",
    "clearActive",
    "getHighlightedMenuItem",
    "getHighlightedViaKeyboard",
    "delegateKeyNavigation"
  ],
  setup(e, { emit: t, slots: n, attrs: o }) {
    const a = f(() => (e.footer && e.menuItems ? [...e.menuItems, e.footer] : e.menuItems).map((R) => se(J({}, R), {
      id: ee("menu-item")
    }))), r = f(() => n["no-results"] ? e.showNoResultsSlot !== null ? e.showNoResultsSlot : a.value.length === 0 : !1), l = m(null), s = m(!1), i = m(null), d = "additions removals";
    let u = "", p = null;
    function g() {
      u = "", p !== null && (clearTimeout(p), p = null);
    }
    function h() {
      p !== null && clearTimeout(p), p = setTimeout(g, 1500);
    }
    function b() {
      return a.value.find(
        (C) => C.value === e.selected
      ) || null;
    }
    function I(C, R) {
      var G;
      if (!(R && R.disabled))
        switch (C) {
          case "selected":
            t("update:selected", (G = R == null ? void 0 : R.value) != null ? G : null), t("update:expanded", !1), i.value = null;
            break;
          case "highlighted":
            l.value = R || null, s.value = !1;
            break;
          case "highlightedViaKeyboard":
            l.value = R || null, s.value = !0;
            break;
          case "active":
            i.value = R || null;
            break;
        }
    }
    const y = f(() => {
      if (l.value !== null)
        return a.value.findIndex(
          (C) => (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            C.value === l.value.value
          )
        );
    });
    function A(C) {
      C && (I("highlightedViaKeyboard", C), t("menu-item-keyboard-navigation", C));
    }
    function M(C) {
      var ne;
      const R = (Le) => {
        for (let ae = Le - 1; ae >= 0; ae--)
          if (!a.value[ae].disabled)
            return a.value[ae];
      };
      C = C || a.value.length;
      const G = (ne = R(C)) != null ? ne : R(a.value.length);
      A(G);
    }
    function V(C) {
      const R = (ne) => a.value.find((Le, ae) => !Le.disabled && ae > ne);
      C = C != null ? C : -1;
      const G = R(C) || R(-1);
      A(G);
    }
    function H(C) {
      if (C.key === "Clear")
        return g(), !0;
      if (C.key === "Backspace")
        return u = u.slice(0, -1), h(), !0;
      if (C.key.length === 1 && !C.metaKey && !C.ctrlKey && !C.altKey) {
        e.expanded || t("update:expanded", !0), u += C.key.toLowerCase();
        const R = u.length > 1 && u.split("").every((ae) => ae === u[0]);
        let G = a.value, ne = u;
        R && y.value !== void 0 && (G = G.slice(y.value + 1).concat(G.slice(0, y.value)), ne = u[0]);
        const Le = G.find(
          (ae) => !ae.disabled && String(ae.label || ae.value).toLowerCase().indexOf(ne) === 0
        );
        return Le && (I("highlightedViaKeyboard", Le), j()), h(), !0;
      }
      return !1;
    }
    function D(C, { prevent: R = !0, characterNavigation: G = !1 } = {}) {
      if (G) {
        if (H(C))
          return !0;
        g();
      }
      function ne() {
        R && (C.preventDefault(), C.stopPropagation());
      }
      switch (C.key) {
        case "Enter":
        case " ":
          return ne(), e.expanded ? (l.value && s.value && t("update:selected", l.value.value), t("update:expanded", !1)) : t("update:expanded", !0), !0;
        case "Tab":
          return e.expanded && (l.value && s.value && t("update:selected", l.value.value), t("update:expanded", !1)), !0;
        case "ArrowUp":
          return ne(), e.expanded ? (l.value === null && I("highlightedViaKeyboard", b()), M(y.value)) : t("update:expanded", !0), j(), !0;
        case "ArrowDown":
          return ne(), e.expanded ? (l.value === null && I("highlightedViaKeyboard", b()), V(y.value)) : t("update:expanded", !0), j(), !0;
        case "Home":
          return ne(), e.expanded ? (l.value === null && I("highlightedViaKeyboard", b()), V()) : t("update:expanded", !0), j(), !0;
        case "End":
          return ne(), e.expanded ? (l.value === null && I("highlightedViaKeyboard", b()), M()) : t("update:expanded", !0), j(), !0;
        case "Escape":
          return ne(), t("update:expanded", !1), !0;
        default:
          return !1;
      }
    }
    function T() {
      I("active", null);
    }
    const _ = [], x = m(void 0), v = ut(
      x,
      { threshold: 0.8 }
    );
    Z(v, (C) => {
      C && t("load-more");
    });
    function E(C, R) {
      if (C) {
        _[R] = C.$el;
        const G = e.visibleItemLimit;
        if (!G || e.menuItems.length < G)
          return;
        const ne = Math.min(
          G,
          Math.max(2, Math.floor(0.2 * e.menuItems.length))
        );
        R === e.menuItems.length - ne && (x.value = C.$el);
      }
    }
    function j() {
      if (!e.visibleItemLimit || e.visibleItemLimit > e.menuItems.length || y.value === void 0)
        return;
      const C = y.value >= 0 ? y.value : 0;
      _[C].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
    const $ = m(null), K = m(null);
    function Y() {
      if (K.value = null, !e.visibleItemLimit || _.length <= e.visibleItemLimit) {
        $.value = null;
        return;
      }
      const C = _[0], R = _[e.visibleItemLimit];
      if ($.value = X(
        C,
        R
      ), e.footer) {
        const G = _[_.length - 1];
        K.value = G.scrollHeight;
      }
    }
    function X(C, R) {
      const G = C.getBoundingClientRect().top;
      return R.getBoundingClientRect().top - G + 2;
    }
    Ie(() => {
      document.addEventListener("mouseup", T);
    }), Xe(() => {
      document.removeEventListener("mouseup", T);
    }), Z(q(e, "expanded"), (C) => ge(this, null, function* () {
      if (C) {
        const R = b();
        R && !l.value && I("highlighted", R), yield Be(), Y(), yield Be(), j();
      } else
        I("highlighted", null);
    })), Z(q(e, "menuItems"), (C) => ge(this, null, function* () {
      C.length < _.length && (_.length = C.length), e.expanded && (yield Be(), Y(), yield Be(), j());
    }), { deep: !0 });
    const ot = f(() => ({
      "max-height": $.value ? "".concat($.value, "px") : void 0,
      "overflow-y": $.value ? "scroll" : void 0,
      "margin-bottom": K.value ? "".concat(K.value, "px") : void 0
    })), lt = f(() => ({
      "cdx-menu--has-footer": !!e.footer,
      "cdx-menu--has-sticky-footer": !!e.footer && !!$.value
    })), {
      rootClasses: st,
      rootStyle: it,
      otherAttrs: N
    } = ve(o, lt);
    return {
      listBoxStyle: ot,
      rootClasses: st,
      rootStyle: it,
      otherAttrs: N,
      assignTemplateRef: E,
      computedMenuItems: a,
      computedShowNoResultsSlot: r,
      highlightedMenuItem: l,
      highlightedViaKeyboard: s,
      activeMenuItem: i,
      handleMenuItemChange: I,
      handleKeyNavigation: D,
      ariaRelevant: d
    };
  },
  // Public methods
  // These must be in the methods block, not in the setup function, otherwise their documentation
  // won't be picked up by vue-docgen
  methods: {
    /**
     * Returns whether the menu is expanded.
     *
     * @return {boolean}
     */
    isExpanded() {
      return this.expanded;
    },
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
const Ml = ["aria-live", "aria-relevant"], Ll = {
  key: 0,
  class: "cdx-menu__pending cdx-menu-item"
}, Vl = {
  key: 1,
  class: "cdx-menu__no-results cdx-menu-item"
};
function Dl(e, t, n, o, a, r) {
  const l = L("cdx-menu-item"), s = L("cdx-progress-bar");
  return ue((c(), w("div", {
    class: z(["cdx-menu", e.rootClasses]),
    style: fe(e.rootStyle)
  }, [
    k("ul", te({
      class: "cdx-menu__listbox",
      role: "listbox",
      style: e.listBoxStyle,
      "aria-live": e.showPending ? "polite" : void 0,
      "aria-relevant": e.showPending ? e.ariaRelevant : void 0
    }, e.otherAttrs), [
      e.showPending && e.computedMenuItems.length === 0 && e.$slots.pending ? (c(), w("li", Ll, [
        B(e.$slots, "pending")
      ])) : S("", !0),
      e.computedShowNoResultsSlot ? (c(), w("li", Vl, [
        B(e.$slots, "no-results")
      ])) : S("", !0),
      (c(!0), w(Te, null, He(e.computedMenuItems, (i, d) => {
        var u, p;
        return c(), F(l, te({
          key: i.value,
          ref_for: !0,
          ref: (g) => e.assignTemplateRef(g, d)
        }, i, {
          selected: i.value === e.selected,
          active: i.value === ((u = e.activeMenuItem) == null ? void 0 : u.value),
          highlighted: i.value === ((p = e.highlightedMenuItem) == null ? void 0 : p.value),
          "show-thumbnail": e.showThumbnail,
          "bold-label": e.boldLabel,
          "hide-description-overflow": e.hideDescriptionOverflow,
          "search-query": e.searchQuery,
          onChange: (g, h) => e.handleMenuItemChange(g, h ? i : null),
          onClick: (g) => e.$emit("menu-item-click", i)
        }), {
          default: O(() => {
            var g, h;
            return [
              B(e.$slots, "default", {
                menuItem: i,
                active: i.value === ((g = e.activeMenuItem) == null ? void 0 : g.value) && i.value === ((h = e.highlightedMenuItem) == null ? void 0 : h.value)
              })
            ];
          }),
          _: 2
        }, 1040, ["selected", "active", "highlighted", "show-thumbnail", "bold-label", "hide-description-overflow", "search-query", "onChange", "onClick"]);
      }), 128)),
      e.showPending ? (c(), F(s, {
        key: 2,
        class: "cdx-menu__progress-bar",
        inline: !0
      })) : S("", !0)
    ], 16, Ml)
  ], 6)), [
    [Ke, e.expanded]
  ]);
}
const et = /* @__PURE__ */ W(Tl, [["render", Dl]]), El = le(Jn), Rl = le(_e), Ol = P({
  name: "CdxTextInput",
  components: { CdxIcon: oe },
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
      validator: El
    },
    /**
     * `status` attribute of the input.
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: Rl
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
    const o = n.id, {
      computedDisabled: a,
      computedStatus: r,
      computedInputId: l
    } = me(
      q(e, "disabled"),
      q(e, "status"),
      o
    ), s = Ce(Ze, void 0), i = ye(q(e, "modelValue"), t), d = f(() => e.clearable && !!i.value && !a.value), u = f(() => ({
      "cdx-text-input--has-start-icon": !!e.startIcon,
      "cdx-text-input--has-end-icon": !!e.endIcon,
      "cdx-text-input--clearable": d.value,
      ["cdx-text-input--status-".concat(r.value)]: !0
    })), {
      rootClasses: p,
      rootStyle: g,
      otherAttrs: h
    } = ve(n, u), b = f(() => {
      const x = h.value, { id: T } = x;
      return $e(x, ["id"]);
    }), I = f(() => ({
      "cdx-text-input__input--has-value": !!i.value
    }));
    return {
      computedInputId: l,
      descriptionId: s,
      wrappedModel: i,
      isClearable: d,
      rootClasses: p,
      rootStyle: g,
      otherAttrsMinusId: b,
      inputClasses: I,
      computedDisabled: a,
      onClear: (T) => {
        i.value = "", t("clear", T);
      },
      onInput: (T) => {
        t("input", T);
      },
      onChange: (T) => {
        t("change", T);
      },
      onKeydown: (T) => {
        (T.key === "Home" || T.key === "End") && !T.ctrlKey && !T.metaKey || t("keydown", T);
      },
      onFocus: (T) => {
        t("focus", T);
      },
      onBlur: (T) => {
        t("blur", T);
      },
      cdxIconClear: Kn
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
const Fl = ["id", "type", "aria-describedby", "disabled"];
function Kl(e, t, n, o, a, r) {
  const l = L("cdx-icon");
  return c(), w("div", {
    class: z(["cdx-text-input", e.rootClasses]),
    style: fe(e.rootStyle)
  }, [
    ue(k("input", te({
      id: e.computedInputId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (s) => e.wrappedModel = s),
      class: ["cdx-text-input__input", e.inputClasses]
    }, e.otherAttrsMinusId, {
      type: e.inputType,
      "aria-describedby": e.descriptionId,
      disabled: e.computedDisabled,
      size: "1",
      onInput: t[1] || (t[1] = (...s) => e.onInput && e.onInput(...s)),
      onChange: t[2] || (t[2] = (...s) => e.onChange && e.onChange(...s)),
      onFocus: t[3] || (t[3] = (...s) => e.onFocus && e.onFocus(...s)),
      onBlur: t[4] || (t[4] = (...s) => e.onBlur && e.onBlur(...s)),
      onKeydown: t[5] || (t[5] = (...s) => e.onKeydown && e.onKeydown(...s))
    }), null, 16, Fl), [
      [dt, e.wrappedModel]
    ]),
    e.startIcon ? (c(), F(l, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__start-icon"
    }, null, 8, ["icon"])) : S("", !0),
    e.endIcon ? (c(), F(l, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__end-icon"
    }, null, 8, ["icon"])) : S("", !0),
    e.isClearable ? (c(), F(l, {
      key: 2,
      icon: e.cdxIconClear,
      class: "cdx-text-input__icon-vue cdx-text-input__clear-icon",
      onMousedown: t[6] || (t[6] = re(() => {
      }, ["prevent"])),
      onClick: e.onClear
    }, null, 8, ["icon", "onClick"])) : S("", !0)
  ], 6);
}
const yt = /* @__PURE__ */ W(Ol, [["render", Kl]]), Nl = ["top", "right", "bottom", "left"], Ne = Math.min, de = Math.max, je = Math.round, Pe = Math.floor, ke = (e) => ({
  x: e,
  y: e
});
function $t(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ct(e) {
  return e.split("-")[0];
}
function on(e) {
  return e.split("-")[1];
}
function Hl(e) {
  return e === "x" ? "y" : "x";
}
function zl(e) {
  return e === "y" ? "height" : "width";
}
function wt(e) {
  return ["top", "bottom"].includes(Ct(e)) ? "y" : "x";
}
function ql(e) {
  return Hl(wt(e));
}
function Pl(e) {
  return J({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, e);
}
function Wl(e) {
  return typeof e != "number" ? Pl(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Ue(e) {
  return se(J({}, e), {
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Tt(e, t, n) {
  let {
    reference: o,
    floating: a
  } = e;
  const r = wt(t), l = ql(t), s = zl(l), i = Ct(t), d = r === "y", u = o.x + o.width / 2 - a.width / 2, p = o.y + o.height / 2 - a.height / 2, g = o[s] / 2 - a[s] / 2;
  let h;
  switch (i) {
    case "top":
      h = {
        x: u,
        y: o.y - a.height
      };
      break;
    case "bottom":
      h = {
        x: u,
        y: o.y + o.height
      };
      break;
    case "right":
      h = {
        x: o.x + o.width,
        y: p
      };
      break;
    case "left":
      h = {
        x: o.x - a.width,
        y: p
      };
      break;
    default:
      h = {
        x: o.x,
        y: o.y
      };
  }
  switch (on(t)) {
    case "start":
      h[l] -= g * (n && d ? -1 : 1);
      break;
    case "end":
      h[l] += g * (n && d ? -1 : 1);
      break;
  }
  return h;
}
const jl = (e, t, n) => ge(void 0, null, function* () {
  const {
    placement: o = "bottom",
    strategy: a = "absolute",
    middleware: r = [],
    platform: l
  } = n, s = r.filter(Boolean), i = yield l.isRTL == null ? void 0 : l.isRTL(t);
  let d = yield l.getElementRects({
    reference: e,
    floating: t,
    strategy: a
  }), {
    x: u,
    y: p
  } = Tt(d, o, i), g = o, h = {}, b = 0;
  for (let I = 0; I < s.length; I++) {
    const {
      name: y,
      fn: A
    } = s[I], {
      x: M,
      y: V,
      data: H,
      reset: D
    } = yield A({
      x: u,
      y: p,
      initialPlacement: o,
      placement: g,
      strategy: a,
      middlewareData: h,
      rects: d,
      platform: l,
      elements: {
        reference: e,
        floating: t
      }
    });
    if (u = M != null ? M : u, p = V != null ? V : p, h = se(J({}, h), {
      [y]: J(J({}, h[y]), H)
    }), D && b <= 50) {
      b++, typeof D == "object" && (D.placement && (g = D.placement), D.rects && (d = D.rects === !0 ? yield l.getElementRects({
        reference: e,
        floating: t,
        strategy: a
      }) : D.rects), {
        x: u,
        y: p
      } = Tt(d, g, i)), I = -1;
      continue;
    }
  }
  return {
    x: u,
    y: p,
    placement: g,
    strategy: a,
    middlewareData: h
  };
});
function ct(e, t) {
  return ge(this, null, function* () {
    var n;
    t === void 0 && (t = {});
    const {
      x: o,
      y: a,
      platform: r,
      rects: l,
      elements: s,
      strategy: i
    } = e, {
      boundary: d = "clippingAncestors",
      rootBoundary: u = "viewport",
      elementContext: p = "floating",
      altBoundary: g = !1,
      padding: h = 0
    } = $t(t, e), b = Wl(h), y = s[g ? p === "floating" ? "reference" : "floating" : p], A = Ue(yield r.getClippingRect({
      element: (n = yield r.isElement == null ? void 0 : r.isElement(y)) == null || n ? y : y.contextElement || (yield r.getDocumentElement == null ? void 0 : r.getDocumentElement(s.floating)),
      boundary: d,
      rootBoundary: u,
      strategy: i
    })), M = p === "floating" ? se(J({}, l.floating), {
      x: o,
      y: a
    }) : l.reference, V = yield r.getOffsetParent == null ? void 0 : r.getOffsetParent(s.floating), H = (yield r.isElement == null ? void 0 : r.isElement(V)) ? (yield r.getScale == null ? void 0 : r.getScale(V)) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    }, D = Ue(r.convertOffsetParentRelativeRectToViewportRelativeRect ? yield r.convertOffsetParentRelativeRectToViewportRelativeRect({
      rect: M,
      offsetParent: V,
      strategy: i
    }) : M);
    return {
      top: (A.top - D.top + b.top) / H.y,
      bottom: (D.bottom - A.bottom + b.bottom) / H.y,
      left: (A.left - D.left + b.left) / H.x,
      right: (D.right - A.right + b.right) / H.x
    };
  });
}
function Mt(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Lt(e) {
  return Nl.some((t) => e[t] >= 0);
}
const Vt = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    fn(n) {
      return ge(this, null, function* () {
        const {
          rects: o
        } = n, l = $t(e, n), {
          strategy: a = "referenceHidden"
        } = l, r = $e(l, [
          "strategy"
        ]);
        switch (a) {
          case "referenceHidden": {
            const s = yield ct(n, se(J({}, r), {
              elementContext: "reference"
            })), i = Mt(s, o.reference);
            return {
              data: {
                referenceHiddenOffsets: i,
                referenceHidden: Lt(i)
              }
            };
          }
          case "escaped": {
            const s = yield ct(n, se(J({}, r), {
              altBoundary: !0
            })), i = Mt(s, o.floating);
            return {
              data: {
                escapedOffsets: i,
                escaped: Lt(i)
              }
            };
          }
          default:
            return {};
        }
      });
    }
  };
}, Ul = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    fn(n) {
      return ge(this, null, function* () {
        const {
          placement: o,
          rects: a,
          platform: r,
          elements: l
        } = n, _ = $t(e, n), {
          apply: s = () => {
          }
        } = _, i = $e(_, [
          "apply"
        ]), d = yield ct(n, i), u = Ct(o), p = on(o), g = wt(o) === "y", {
          width: h,
          height: b
        } = a.floating;
        let I, y;
        u === "top" || u === "bottom" ? (I = u, y = p === ((yield r.isRTL == null ? void 0 : r.isRTL(l.floating)) ? "start" : "end") ? "left" : "right") : (y = u, I = p === "end" ? "top" : "bottom");
        const A = b - d[I], M = h - d[y], V = !n.middlewareData.shift;
        let H = A, D = M;
        if (g) {
          const x = h - d.left - d.right;
          D = p || V ? Ne(M, x) : x;
        } else {
          const x = b - d.top - d.bottom;
          H = p || V ? Ne(A, x) : x;
        }
        if (V && !p) {
          const x = de(d.left, 0), v = de(d.right, 0), E = de(d.top, 0), j = de(d.bottom, 0);
          g ? D = h - 2 * (x !== 0 || v !== 0 ? x + v : de(d.left, d.right)) : H = b - 2 * (E !== 0 || j !== 0 ? E + j : de(d.top, d.bottom));
        }
        yield s(se(J({}, n), {
          availableWidth: D,
          availableHeight: H
        }));
        const T = yield r.getDimensions(l.floating);
        return h !== T.width || b !== T.height ? {
          reset: {
            rects: !0
          }
        } : {};
      });
    }
  };
};
function Se(e) {
  return ln(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ie(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function xe(e) {
  var t;
  return (t = (ln(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function ln(e) {
  return e instanceof Node || e instanceof ie(e).Node;
}
function we(e) {
  return e instanceof Element || e instanceof ie(e).Element;
}
function be(e) {
  return e instanceof HTMLElement || e instanceof ie(e).HTMLElement;
}
function Dt(e) {
  return typeof ShadowRoot == "undefined" ? !1 : e instanceof ShadowRoot || e instanceof ie(e).ShadowRoot;
}
function ze(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: a
  } = pe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !["inline", "contents"].includes(a);
}
function Ql(e) {
  return ["table", "td", "th"].includes(Se(e));
}
function It(e) {
  const t = _t(), n = pe(e);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((o) => (n.willChange || "").includes(o)) || ["paint", "layout", "strict", "content"].some((o) => (n.contain || "").includes(o));
}
function Gl(e) {
  let t = Oe(e);
  for (; be(t) && !tt(t); ) {
    if (It(t))
      return t;
    t = Oe(t);
  }
  return null;
}
function _t() {
  return typeof CSS == "undefined" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function tt(e) {
  return ["html", "body", "#document"].includes(Se(e));
}
function pe(e) {
  return ie(e).getComputedStyle(e);
}
function nt(e) {
  return we(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function Oe(e) {
  if (Se(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Dt(e) && e.host || // Fallback.
    xe(e)
  );
  return Dt(t) ? t.host : t;
}
function sn(e) {
  const t = Oe(e);
  return tt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : be(t) && ze(t) ? t : sn(t);
}
function Qe(e, t) {
  var n;
  t === void 0 && (t = []);
  const o = sn(e), a = o === ((n = e.ownerDocument) == null ? void 0 : n.body), r = ie(o);
  return a ? t.concat(r, r.visualViewport || [], ze(o) ? o : []) : t.concat(o, Qe(o));
}
function an(e) {
  const t = pe(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const a = be(e), r = a ? e.offsetWidth : n, l = a ? e.offsetHeight : o, s = je(n) !== r || je(o) !== l;
  return s && (n = r, o = l), {
    width: n,
    height: o,
    $: s
  };
}
function xt(e) {
  return we(e) ? e : e.contextElement;
}
function Re(e) {
  const t = xt(e);
  if (!be(t))
    return ke(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: a,
    $: r
  } = an(t);
  let l = (r ? je(n.width) : n.width) / o, s = (r ? je(n.height) : n.height) / a;
  return (!l || !Number.isFinite(l)) && (l = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: l,
    y: s
  };
}
const Yl = /* @__PURE__ */ ke(0);
function rn(e) {
  const t = ie(e);
  return !_t() || !t.visualViewport ? Yl : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Xl(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== ie(e) ? !1 : t;
}
function Me(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const a = e.getBoundingClientRect(), r = xt(e);
  let l = ke(1);
  t && (o ? we(o) && (l = Re(o)) : l = Re(e));
  const s = Xl(r, n, o) ? rn(r) : ke(0);
  let i = (a.left + s.x) / l.x, d = (a.top + s.y) / l.y, u = a.width / l.x, p = a.height / l.y;
  if (r) {
    const g = ie(r), h = o && we(o) ? ie(o) : o;
    let b = g.frameElement;
    for (; b && o && h !== g; ) {
      const I = Re(b), y = b.getBoundingClientRect(), A = pe(b), M = y.left + (b.clientLeft + parseFloat(A.paddingLeft)) * I.x, V = y.top + (b.clientTop + parseFloat(A.paddingTop)) * I.y;
      i *= I.x, d *= I.y, u *= I.x, p *= I.y, i += M, d += V, b = ie(b).frameElement;
    }
  }
  return Ue({
    width: u,
    height: p,
    x: i,
    y: d
  });
}
function Zl(e) {
  let {
    rect: t,
    offsetParent: n,
    strategy: o
  } = e;
  const a = be(n), r = xe(n);
  if (n === r)
    return t;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = ke(1);
  const i = ke(0);
  if ((a || !a && o !== "fixed") && ((Se(n) !== "body" || ze(r)) && (l = nt(n)), be(n))) {
    const d = Me(n);
    s = Re(n), i.x = d.x + n.clientLeft, i.y = d.y + n.clientTop;
  }
  return {
    width: t.width * s.x,
    height: t.height * s.y,
    x: t.x * s.x - l.scrollLeft * s.x + i.x,
    y: t.y * s.y - l.scrollTop * s.y + i.y
  };
}
function Jl(e) {
  return Array.from(e.getClientRects());
}
function dn(e) {
  return Me(xe(e)).left + nt(e).scrollLeft;
}
function es(e) {
  const t = xe(e), n = nt(e), o = e.ownerDocument.body, a = de(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), r = de(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let l = -n.scrollLeft + dn(e);
  const s = -n.scrollTop;
  return pe(o).direction === "rtl" && (l += de(t.clientWidth, o.clientWidth) - a), {
    width: a,
    height: r,
    x: l,
    y: s
  };
}
function ts(e, t) {
  const n = ie(e), o = xe(e), a = n.visualViewport;
  let r = o.clientWidth, l = o.clientHeight, s = 0, i = 0;
  if (a) {
    r = a.width, l = a.height;
    const d = _t();
    (!d || d && t === "fixed") && (s = a.offsetLeft, i = a.offsetTop);
  }
  return {
    width: r,
    height: l,
    x: s,
    y: i
  };
}
function ns(e, t) {
  const n = Me(e, !0, t === "fixed"), o = n.top + e.clientTop, a = n.left + e.clientLeft, r = be(e) ? Re(e) : ke(1), l = e.clientWidth * r.x, s = e.clientHeight * r.y, i = a * r.x, d = o * r.y;
  return {
    width: l,
    height: s,
    x: i,
    y: d
  };
}
function Et(e, t, n) {
  let o;
  if (t === "viewport")
    o = ts(e, n);
  else if (t === "document")
    o = es(xe(e));
  else if (we(t))
    o = ns(t, n);
  else {
    const a = rn(e);
    o = se(J({}, t), {
      x: t.x - a.x,
      y: t.y - a.y
    });
  }
  return Ue(o);
}
function un(e, t) {
  const n = Oe(e);
  return n === t || !we(n) || tt(n) ? !1 : pe(n).position === "fixed" || un(n, t);
}
function os(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = Qe(e).filter((s) => we(s) && Se(s) !== "body"), a = null;
  const r = pe(e).position === "fixed";
  let l = r ? Oe(e) : e;
  for (; we(l) && !tt(l); ) {
    const s = pe(l), i = It(l);
    !i && s.position === "fixed" && (a = null), (r ? !i && !a : !i && s.position === "static" && !!a && ["absolute", "fixed"].includes(a.position) || ze(l) && !i && un(e, l)) ? o = o.filter((u) => u !== l) : a = s, l = Oe(l);
  }
  return t.set(e, o), o;
}
function ls(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: a
  } = e;
  const l = [...n === "clippingAncestors" ? os(t, this._c) : [].concat(n), o], s = l[0], i = l.reduce((d, u) => {
    const p = Et(t, u, a);
    return d.top = de(p.top, d.top), d.right = Ne(p.right, d.right), d.bottom = Ne(p.bottom, d.bottom), d.left = de(p.left, d.left), d;
  }, Et(t, s, a));
  return {
    width: i.right - i.left,
    height: i.bottom - i.top,
    x: i.left,
    y: i.top
  };
}
function ss(e) {
  return an(e);
}
function is(e, t, n) {
  const o = be(t), a = xe(t), r = n === "fixed", l = Me(e, !0, r, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const i = ke(0);
  if (o || !o && !r)
    if ((Se(t) !== "body" || ze(a)) && (s = nt(t)), o) {
      const d = Me(t, !0, r, t);
      i.x = d.x + t.clientLeft, i.y = d.y + t.clientTop;
    } else
      a && (i.x = dn(a));
  return {
    x: l.left + s.scrollLeft - i.x,
    y: l.top + s.scrollTop - i.y,
    width: l.width,
    height: l.height
  };
}
function Rt(e, t) {
  return !be(e) || pe(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function cn(e, t) {
  const n = ie(e);
  if (!be(e))
    return n;
  let o = Rt(e, t);
  for (; o && Ql(o) && pe(o).position === "static"; )
    o = Rt(o, t);
  return o && (Se(o) === "html" || Se(o) === "body" && pe(o).position === "static" && !It(o)) ? n : o || Gl(e) || n;
}
const as = function(e) {
  return ge(this, null, function* () {
    let {
      reference: t,
      floating: n,
      strategy: o
    } = e;
    const a = this.getOffsetParent || cn, r = this.getDimensions;
    return {
      reference: is(t, yield a(n), o),
      floating: J({
        x: 0,
        y: 0
      }, yield r(n))
    };
  });
};
function rs(e) {
  return pe(e).direction === "rtl";
}
const ds = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Zl,
  getDocumentElement: xe,
  getClippingRect: ls,
  getOffsetParent: cn,
  getElementRects: as,
  getClientRects: Jl,
  getDimensions: ss,
  getScale: Re,
  isElement: we,
  isRTL: rs
};
function us(e, t) {
  let n = null, o;
  const a = xe(e);
  function r() {
    clearTimeout(o), n && n.disconnect(), n = null;
  }
  function l(s, i) {
    s === void 0 && (s = !1), i === void 0 && (i = 1), r();
    const {
      left: d,
      top: u,
      width: p,
      height: g
    } = e.getBoundingClientRect();
    if (s || t(), !p || !g)
      return;
    const h = Pe(u), b = Pe(a.clientWidth - (d + p)), I = Pe(a.clientHeight - (u + g)), y = Pe(d), M = {
      rootMargin: -h + "px " + -b + "px " + -I + "px " + -y + "px",
      threshold: de(0, Ne(1, i)) || 1
    };
    let V = !0;
    function H(D) {
      const T = D[0].intersectionRatio;
      if (T !== i) {
        if (!V)
          return l();
        T ? l(!1, T) : o = setTimeout(() => {
          l(!1, 1e-7);
        }, 100);
      }
      V = !1;
    }
    try {
      n = new IntersectionObserver(H, se(J({}, M), {
        // Handle <iframe>s
        root: a.ownerDocument
      }));
    } catch (D) {
      n = new IntersectionObserver(H, M);
    }
    n.observe(e);
  }
  return l(!0), r;
}
function cs(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: a = !0,
    ancestorResize: r = !0,
    elementResize: l = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: i = !1
  } = o, d = xt(e), u = a || r ? [...d ? Qe(d) : [], ...Qe(t)] : [];
  u.forEach((A) => {
    a && A.addEventListener("scroll", n, {
      passive: !0
    }), r && A.addEventListener("resize", n);
  });
  const p = d && s ? us(d, n) : null;
  let g = -1, h = null;
  l && (h = new ResizeObserver((A) => {
    let [M] = A;
    M && M.target === d && h && (h.unobserve(t), cancelAnimationFrame(g), g = requestAnimationFrame(() => {
      h && h.observe(t);
    })), n();
  }), d && !i && h.observe(d), h.observe(t));
  let b, I = i ? Me(e) : null;
  i && y();
  function y() {
    const A = Me(e);
    I && (A.x !== I.x || A.y !== I.y || A.width !== I.width || A.height !== I.height) && n(), I = A, b = requestAnimationFrame(y);
  }
  return n(), () => {
    u.forEach((A) => {
      a && A.removeEventListener("scroll", n), r && A.removeEventListener("resize", n);
    }), p && p(), h && h.disconnect(), h = null, i && cancelAnimationFrame(b);
  };
}
const ps = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), a = J({
    platform: ds
  }, n), r = se(J({}, a.platform), {
    _c: o
  });
  return jl(e, t, se(J({}, a), {
    platform: r
  }));
};
function Ot(e) {
  var t;
  return (t = e == null ? void 0 : e.$el) != null ? t : e;
}
function pn(e) {
  return typeof window == "undefined" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Ft(e, t) {
  const n = pn(e);
  return Math.round(t * n) / n;
}
function fs(e, t, n) {
  n === void 0 && (n = {});
  const o = n.whileElementsMounted, a = f(() => {
    var _;
    return (_ = Fe(n.open)) != null ? _ : !0;
  }), r = f(() => Fe(n.middleware)), l = f(() => {
    var _;
    return (_ = Fe(n.placement)) != null ? _ : "bottom";
  }), s = f(() => {
    var _;
    return (_ = Fe(n.strategy)) != null ? _ : "absolute";
  }), i = f(() => {
    var _;
    return (_ = Fe(n.transform)) != null ? _ : !0;
  }), d = f(() => Ot(e.value)), u = f(() => Ot(t.value)), p = m(0), g = m(0), h = m(s.value), b = m(l.value), I = bn({}), y = m(!1), A = f(() => {
    const _ = {
      position: h.value,
      left: "0",
      top: "0"
    };
    if (!u.value)
      return _;
    const x = Ft(u.value, p.value), v = Ft(u.value, g.value);
    return i.value ? J(se(J({}, _), {
      transform: "translate(" + x + "px, " + v + "px)"
    }), pn(u.value) >= 1.5 && {
      willChange: "transform"
    }) : {
      position: h.value,
      left: x + "px",
      top: v + "px"
    };
  });
  let M;
  function V() {
    d.value == null || u.value == null || ps(d.value, u.value, {
      middleware: r.value,
      placement: l.value,
      strategy: s.value
    }).then((_) => {
      p.value = _.x, g.value = _.y, h.value = _.strategy, b.value = _.placement, I.value = _.middlewareData, y.value = !0;
    });
  }
  function H() {
    typeof M == "function" && (M(), M = void 0);
  }
  function D() {
    if (H(), o === void 0) {
      V();
      return;
    }
    if (d.value != null && u.value != null) {
      M = o(d.value, u.value, V);
      return;
    }
  }
  function T() {
    a.value || (y.value = !1);
  }
  return Z([r, l, s], V, {
    flush: "sync"
  }), Z([d, u], D, {
    flush: "sync"
  }), Z(a, T, {
    flush: "sync"
  }), yn() && $n(H), {
    x: Ve(p),
    y: Ve(g),
    strategy: Ve(h),
    placement: Ve(b),
    middlewareData: Ve(I),
    isPositioned: Ve(y),
    floatingStyles: A,
    update: V
  };
}
function kt(e, t) {
  const n = () => {
    var d;
    return (d = t.value) == null ? void 0 : d.isExpanded();
  }, o = [
    Ul({
      apply({ rects: d, elements: u }) {
        Object.assign(u.floating.style, {
          width: "".concat(d.reference.width, "px")
        });
      }
    }),
    // Hide the menu when it has escaped the reference element's clipping context (e.g. the menu
    // is opened down and you scroll up until the reference element just starts to leave the
    // container).
    Vt({
      strategy: "escaped"
    }),
    // Hide the menu when the reference element is fully hidden (e.g. the menu is opened down
    // and you scroll down until the whole reference element is gone).
    Vt()
  ], { floatingStyles: a, middlewareData: r, update: l } = fs(
    e,
    t,
    { middleware: o }
  ), s = f(() => {
    var u, p;
    return !n() || ((u = r.value.hide) == null ? void 0 : u.escaped) || ((p = r.value.hide) == null ? void 0 : p.referenceHidden) ? "hidden" : "visible";
  });
  Z([a, s], ([d, u]) => {
    var p;
    Object.assign((p = t.value) == null ? void 0 : p.$el.style, {
      visibility: u,
      position: d.position,
      top: "".concat(d.top, "px"),
      // `left: 0` is set in the Menu component, which gets transformed to `right: 0` for
      // RTL. For this component, we must unset `right: 0`, because the transform value
      // is relative to the left side of the screen regardless of reading direction.
      right: "unset",
      // Set `left` value to ensure the menu is translated relative to the left side of
      // the screen, which is what FloatingUI expects when it calculates the translate-x
      // value for both LTR and RTL.
      left: "".concat(d.left, "px"),
      transform: d.transform || "none"
    });
  });
  let i = null;
  Z(n, (d) => {
    var u;
    d ? i = cs(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      e.value && "$el" in e.value ? e.value.$el : e,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      (u = t.value) == null ? void 0 : u.$el,
      l
    ) : i && (i(), i = null);
  });
}
const hs = le(_e), ms = P({
  name: "CdxCombobox",
  components: {
    CdxButton: Ae,
    CdxIcon: oe,
    CdxMenu: et,
    CdxTextInput: yt
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
      validator: hs
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
  setup(e, { emit: t, attrs: n, slots: o }) {
    const a = m(), r = m(), l = m(), s = ee("combobox"), i = q(e, "selected"), d = ye(i, t, "update:selected"), u = m(!1), p = m(!1), g = f(() => {
      var _, x;
      return (x = (_ = l.value) == null ? void 0 : _.getHighlightedMenuItem()) == null ? void 0 : x.id;
    }), { computedDisabled: h } = me(q(e, "disabled")), b = f(() => ({
      "cdx-combobox--expanded": u.value,
      "cdx-combobox--disabled": h.value
    })), {
      rootClasses: I,
      rootStyle: y,
      otherAttrs: A
    } = ve(n, b);
    function M(_) {
      p.value && u.value ? u.value = !1 : (e.menuItems.length > 0 || o["no-results"]) && (u.value = !0), t("focus", _);
    }
    function V(_) {
      u.value = p.value && u.value, t("blur", _);
    }
    function H() {
      h.value || (p.value = !0);
    }
    function D() {
      var _;
      h.value || (_ = a.value) == null || _.focus();
    }
    function T(_) {
      !l.value || h.value || e.menuItems.length === 0 || _.key === " " || l.value.delegateKeyNavigation(_);
    }
    return kt(a, l), Z(u, () => {
      p.value = !1;
    }), {
      input: a,
      inputWrapper: r,
      menu: l,
      menuId: s,
      modelWrapper: d,
      expanded: u,
      highlightedId: g,
      computedDisabled: h,
      onInputFocus: M,
      onInputBlur: V,
      onKeydown: T,
      onButtonClick: D,
      onButtonMousedown: H,
      cdxIconExpand: ht,
      rootClasses: I,
      rootStyle: y,
      otherAttrs: A
    };
  }
});
const vs = {
  ref: "inputWrapper",
  class: "cdx-combobox__input-wrapper"
};
function gs(e, t, n, o, a, r) {
  const l = L("cdx-text-input"), s = L("cdx-icon"), i = L("cdx-button"), d = L("cdx-menu");
  return c(), w("div", {
    class: z(["cdx-combobox", e.rootClasses]),
    style: fe(e.rootStyle)
  }, [
    k("div", vs, [
      U(l, te({
        ref: "input",
        modelValue: e.modelWrapper,
        "onUpdate:modelValue": t[0] || (t[0] = (u) => e.modelWrapper = u)
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
        onInput: t[1] || (t[1] = (u) => e.$emit("input", u)),
        onChange: t[2] || (t[2] = (u) => e.$emit("change", u)),
        onFocus: e.onInputFocus,
        onBlur: e.onInputBlur
      }), null, 16, ["modelValue", "aria-activedescendant", "aria-expanded", "aria-controls", "disabled", "status", "onKeydown", "onFocus", "onBlur"]),
      U(i, {
        class: "cdx-combobox__expand-button",
        "aria-hidden": "true",
        disabled: e.computedDisabled,
        tabindex: "-1",
        type: "button",
        onMousedown: e.onButtonMousedown,
        onClick: e.onButtonClick
      }, {
        default: O(() => [
          U(s, {
            class: "cdx-combobox__expand-icon",
            icon: e.cdxIconExpand
          }, null, 8, ["icon"])
        ]),
        _: 1
      }, 8, ["disabled", "onMousedown", "onClick"])
    ], 512),
    U(d, te({
      id: e.menuId,
      ref: "menu",
      selected: e.modelWrapper,
      "onUpdate:selected": t[3] || (t[3] = (u) => e.modelWrapper = u),
      expanded: e.expanded,
      "onUpdate:expanded": t[4] || (t[4] = (u) => e.expanded = u),
      "menu-items": e.menuItems
    }, e.menuConfig, {
      onLoadMore: t[5] || (t[5] = (u) => e.$emit("load-more"))
    }), {
      default: O(({ menuItem: u }) => [
        B(e.$slots, "menu-item", { menuItem: u })
      ]),
      "no-results": O(() => [
        B(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const Yi = /* @__PURE__ */ W(ms, [["render", gs]]);
function bs(e) {
  const t = m(
    { width: void 0, height: void 0 }
  );
  if (typeof window != "object" || !("ResizeObserver" in window) || !("ResizeObserverEntry" in window))
    return t;
  const n = new window.ResizeObserver(
    (a) => {
      const r = a[0];
      r && (t.value = {
        width: r.borderBoxSize[0].inlineSize,
        height: r.borderBoxSize[0].blockSize
      });
    }
  );
  let o = !1;
  return Ie(() => {
    o = !0, e.value && n.observe(e.value);
  }), Xe(() => {
    o = !1, n.disconnect();
  }), Z(e, (a) => {
    o && (n.disconnect(), t.value = {
      width: void 0,
      height: void 0
    }, a && n.observe(a));
  }), t;
}
const ys = P({
  name: "CdxDialog",
  components: {
    CdxButton: Ae,
    CdxIcon: oe
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
    const n = ee("dialog-label"), o = m(), a = m(), r = m(), l = m(), s = m(), i = m(), d = f(() => !e.hideTitle || !!e.closeButtonLabel), u = f(() => !!e.primaryAction || !!e.defaultAction), p = bs(r), g = f(() => {
      var $;
      return ($ = p.value.height) != null ? $ : 0;
    }), h = m(!1), b = f(() => ({
      "cdx-dialog--vertical-actions": e.stackedActions,
      "cdx-dialog--horizontal-actions": !e.stackedActions,
      "cdx-dialog--dividers": h.value
    })), I = Ce("CdxTeleportTarget", void 0), y = f(() => {
      var $, K;
      return (K = ($ = e.target) != null ? $ : I) != null ? K : "body";
    }), A = m(0);
    function M() {
      t("update:open", !1);
    }
    function V() {
      D(a.value);
    }
    function H() {
      D(a.value, !0);
    }
    function D($, K = !1) {
      let Y = Array.from(
        $.querySelectorAll('\n					input, select, textarea, button, object, a, area,\n					[contenteditable], [tabindex]:not([tabindex^="-"])\n				')
      );
      K && (Y = Y.reverse());
      for (const X of Y)
        if (X.focus(), document.activeElement === X)
          return !0;
      return !1;
    }
    let T = [], _ = [];
    function x() {
      let $ = o.value;
      for (; $.parentElement && $.nodeName !== "BODY"; ) {
        for (const K of Array.from($.parentElement.children))
          K === $ || K.nodeName === "SCRIPT" || (K.hasAttribute("aria-hidden") || (K.setAttribute("aria-hidden", "true"), T.push(K)), K.hasAttribute("inert") || (K.setAttribute("inert", ""), _.push(K)));
        $ = $.parentElement;
      }
    }
    function v() {
      for (const $ of T)
        $.removeAttribute("aria-hidden");
      for (const $ of _)
        $.removeAttribute("inert");
      T = [], _ = [];
    }
    function E() {
      return ge(this, null, function* () {
        var $;
        yield Be(), A.value = window.innerWidth - document.documentElement.clientWidth, document.documentElement.style.setProperty("margin-right", "".concat(A.value, "px")), document.body.classList.add("cdx-dialog-open"), x(), D(r.value) || ($ = l.value) == null || $.focus();
      });
    }
    function j() {
      document.body.classList.remove("cdx-dialog-open"), document.documentElement.style.removeProperty("margin-right"), v();
    }
    return Ie(() => {
      e.open && E();
    }), Xe(() => {
      e.open && j();
    }), Z(q(e, "open"), ($) => {
      $ ? E() : j();
    }), Z(g, () => {
      r.value && (h.value = r.value.clientHeight < r.value.scrollHeight);
    }), {
      close: M,
      cdxIconClose: ft,
      labelId: n,
      rootClasses: b,
      backdrop: o,
      dialogElement: a,
      focusTrapStart: s,
      focusTrapEnd: i,
      focusFirst: V,
      focusLast: H,
      dialogBody: r,
      focusHolder: l,
      showHeader: d,
      showFooterActions: u,
      computedTarget: y
    };
  }
});
const $s = ["aria-label", "aria-labelledby"], Cs = {
  key: 0,
  class: "cdx-dialog__header__title-group"
}, ws = ["id"], Is = {
  key: 0,
  class: "cdx-dialog__header__subtitle"
}, _s = {
  ref: "focusHolder",
  class: "cdx-dialog-focus-trap",
  tabindex: "-1"
}, xs = {
  key: 0,
  class: "cdx-dialog__footer__text"
}, ks = {
  key: 1,
  class: "cdx-dialog__footer__actions"
};
function Ss(e, t, n, o, a, r) {
  const l = L("cdx-icon"), s = L("cdx-button");
  return c(), F(Cn, {
    to: e.computedTarget,
    disabled: e.renderInPlace
  }, [
    U(pt, {
      name: "cdx-dialog-fade",
      appear: ""
    }, {
      default: O(() => [
        e.open ? (c(), w("div", {
          key: 0,
          ref: "backdrop",
          class: "cdx-dialog-backdrop",
          onClick: t[5] || (t[5] = (...i) => e.close && e.close(...i)),
          onKeyup: t[6] || (t[6] = he((...i) => e.close && e.close(...i), ["escape"]))
        }, [
          k("div", {
            ref: "focusTrapStart",
            tabindex: "0",
            onFocus: t[0] || (t[0] = (...i) => e.focusLast && e.focusLast(...i))
          }, null, 544),
          k("div", te({
            ref: "dialogElement",
            class: ["cdx-dialog", e.rootClasses],
            role: "dialog"
          }, e.$attrs, {
            "aria-label": e.$slots.header || e.hideTitle ? e.title : void 0,
            "aria-labelledby": !e.$slots.header && !e.hideTitle ? e.labelId : void 0,
            "aria-modal": "true",
            onClick: t[3] || (t[3] = re(() => {
            }, ["stop"]))
          }), [
            e.showHeader || e.$slots.header ? (c(), w("header", {
              key: 0,
              class: z(["cdx-dialog__header", { "cdx-dialog__header--default": !e.$slots.header }])
            }, [
              B(e.$slots, "header", {}, () => [
                e.hideTitle ? S("", !0) : (c(), w("div", Cs, [
                  k("h2", {
                    id: e.labelId,
                    class: "cdx-dialog__header__title"
                  }, Q(e.title), 9, ws),
                  e.subtitle ? (c(), w("p", Is, Q(e.subtitle), 1)) : S("", !0)
                ])),
                e.closeButtonLabel ? (c(), F(s, {
                  key: 1,
                  class: "cdx-dialog__header__close-button",
                  weight: "quiet",
                  type: "button",
                  "aria-label": e.closeButtonLabel,
                  onClick: e.close
                }, {
                  default: O(() => [
                    U(l, {
                      icon: e.cdxIconClose,
                      "icon-label": e.closeButtonLabel
                    }, null, 8, ["icon", "icon-label"])
                  ]),
                  _: 1
                }, 8, ["aria-label", "onClick"])) : S("", !0)
              ])
            ], 2)) : S("", !0),
            k("div", _s, null, 512),
            k("div", {
              ref: "dialogBody",
              class: z(["cdx-dialog__body", {
                "cdx-dialog__body--no-header": !(e.showHeader || e.$slots.header),
                "cdx-dialog__body--no-footer": !(e.showFooterActions || e.$slots.footer || e.$slots["footer-text"])
              }])
            }, [
              B(e.$slots, "default")
            ], 2),
            e.showFooterActions || e.$slots.footer || e.$slots["footer-text"] ? (c(), w("footer", {
              key: 1,
              class: z(["cdx-dialog__footer", { "cdx-dialog__footer--default": !e.$slots.footer }])
            }, [
              B(e.$slots, "footer", {}, () => [
                e.$slots["footer-text"] ? (c(), w("p", xs, [
                  B(e.$slots, "footer-text")
                ])) : S("", !0),
                e.showFooterActions ? (c(), w("div", ks, [
                  e.primaryAction ? (c(), F(s, {
                    key: 0,
                    class: "cdx-dialog__footer__primary-action",
                    weight: "primary",
                    action: e.primaryAction.actionType,
                    disabled: e.primaryAction.disabled,
                    onClick: t[1] || (t[1] = (i) => e.$emit("primary"))
                  }, {
                    default: O(() => [
                      ce(Q(e.primaryAction.label), 1)
                    ]),
                    _: 1
                  }, 8, ["action", "disabled"])) : S("", !0),
                  e.defaultAction ? (c(), F(s, {
                    key: 1,
                    class: "cdx-dialog__footer__default-action",
                    disabled: e.defaultAction.disabled,
                    onClick: t[2] || (t[2] = (i) => e.$emit("default"))
                  }, {
                    default: O(() => [
                      ce(Q(e.defaultAction.label), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"])) : S("", !0)
                ])) : S("", !0)
              ])
            ], 2)) : S("", !0)
          ], 16, $s),
          k("div", {
            ref: "focusTrapEnd",
            tabindex: "0",
            onFocus: t[4] || (t[4] = (...i) => e.focusFirst && e.focusFirst(...i))
          }, null, 544)
        ], 544)) : S("", !0)
      ]),
      _: 3
    })
  ], 8, ["to", "disabled"]);
}
const Xi = /* @__PURE__ */ W(ys, [["render", Ss]]), As = {
  notice: Hn,
  error: Ht,
  warning: Nt,
  success: zt
}, Bs = P({
  name: "CdxMessage",
  components: { CdxButton: Ae, CdxIcon: oe },
  props: {
    /**
     * Status type of Message.
     *
     * @values 'notice', 'warning', 'error', 'success'
     */
    type: {
      type: String,
      default: "notice",
      validator: qt
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
    const n = m(!1), o = f(
      () => e.inline === !1 && e.dismissButtonLabel.length > 0
    ), a = f(() => e.autoDismiss === !1 || e.type === "error" ? !1 : e.autoDismiss === !0 ? 4e3 : e.autoDismiss), r = f(() => ({
      "cdx-message--inline": e.inline,
      "cdx-message--block": !e.inline,
      "cdx-message--user-dismissable": o.value,
      ["cdx-message--".concat(e.type)]: !0
    })), l = f(
      () => e.icon && e.type === "notice" ? e.icon : As[e.type]
    ), s = m("");
    function i(d) {
      n.value || (s.value = d === "user-dismissed" ? "cdx-message-leave-active-user" : "cdx-message-leave-active-system", n.value = !0, t(d));
    }
    return Ie(() => {
      e.type === "error" && e.autoDismiss !== !1 ? rt('CdxMessage: Message with type="error" cannot use auto-dismiss') : a.value && setTimeout(() => i("auto-dismissed"), a.value);
    }), {
      dismissed: n,
      userDismissable: o,
      rootClasses: r,
      leaveActiveClass: s,
      computedIcon: l,
      onDismiss: i,
      cdxIconClose: ft
    };
  }
});
const Ts = ["aria-live", "role"], Ms = { class: "cdx-message__content" };
function Ls(e, t, n, o, a, r) {
  const l = L("cdx-icon"), s = L("cdx-button");
  return c(), F(pt, {
    name: "cdx-message",
    appear: e.fadeIn,
    "leave-active-class": e.leaveActiveClass
  }, {
    default: O(() => [
      e.dismissed ? S("", !0) : (c(), w("div", {
        key: 0,
        class: z(["cdx-message", e.rootClasses]),
        "aria-live": e.type !== "error" ? "polite" : void 0,
        role: e.type === "error" ? "alert" : void 0
      }, [
        U(l, {
          class: "cdx-message__icon--vue",
          icon: e.computedIcon
        }, null, 8, ["icon"]),
        k("div", Ms, [
          B(e.$slots, "default")
        ]),
        e.userDismissable ? (c(), F(s, {
          key: 0,
          class: "cdx-message__dismiss-button",
          weight: "quiet",
          type: "button",
          "aria-label": e.dismissButtonLabel,
          onClick: t[0] || (t[0] = (i) => e.onDismiss("user-dismissed"))
        }, {
          default: O(() => [
            U(l, {
              icon: e.cdxIconClose,
              "icon-label": e.dismissButtonLabel
            }, null, 8, ["icon", "icon-label"])
          ]),
          _: 1
        }, 8, ["aria-label"])) : S("", !0)
      ], 10, Ts))
    ]),
    _: 3
  }, 8, ["appear", "leave-active-class"]);
}
const Vs = /* @__PURE__ */ W(Bs, [["render", Ls]]), Ds = le(_e), Es = P({
  name: "CdxField",
  components: { CdxLabel: Je, CdxMessage: Vs },
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
      validator: Ds
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
    const { disabled: n, status: o, isFieldset: a } = wn(e), r = en(n), l = f(() => ({
      "cdx-field--disabled": r.value
    })), s = ee("label"), i = ee("description"), d = ee("input"), u = f(() => a.value ? void 0 : d);
    Ee(jt, u);
    const p = f(
      () => !a.value && t.description ? i : void 0
    );
    Ee(Ze, p), Ee(Qt, r), Ee(Ut, o);
    const g = f(
      () => e.status !== "default" && e.status in e.messages ? e.messages[e.status] : ""
    ), h = f(() => e.status === "default" ? "notice" : e.status);
    return {
      rootClasses: l,
      computedDisabled: r,
      labelId: s,
      descriptionId: i,
      inputId: d,
      validationMessage: g,
      validationMessageType: h
    };
  }
});
const Rs = { class: "cdx-field__help-text" }, Os = {
  key: 0,
  class: "cdx-field__validation-message"
};
function Fs(e, t, n, o, a, r) {
  const l = L("cdx-label"), s = L("cdx-message");
  return c(), F(Ge(e.isFieldset ? "fieldset" : "div"), {
    class: z(["cdx-field", e.rootClasses]),
    "aria-disabled": !e.isFieldset && e.computedDisabled ? !0 : void 0,
    disabled: e.isFieldset && e.computedDisabled ? !0 : void 0
  }, {
    default: O(() => [
      U(l, {
        id: e.labelId,
        icon: e.labelIcon,
        "visually-hidden": e.hideLabel,
        "optional-flag": e.optionalFlag,
        "input-id": e.inputId,
        "description-id": e.descriptionId,
        disabled: e.computedDisabled,
        "is-legend": e.isFieldset
      }, Ye({
        default: O(() => [
          B(e.$slots, "label")
        ]),
        _: 2
      }, [
        e.$slots.description && e.$slots.description().length > 0 ? {
          name: "description",
          fn: O(() => [
            B(e.$slots, "description")
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["id", "icon", "visually-hidden", "optional-flag", "input-id", "description-id", "disabled", "is-legend"]),
      k("div", {
        class: z(["cdx-field__control", { "cdx-field__control--has-help-text": e.$slots["help-text"] && e.$slots["help-text"]().length > 0 || e.validationMessage }])
      }, [
        B(e.$slots, "default")
      ], 2),
      k("div", Rs, [
        B(e.$slots, "help-text")
      ]),
      !e.computedDisabled && e.validationMessage ? (c(), w("div", Os, [
        U(s, {
          type: e.validationMessageType,
          inline: !0
        }, {
          default: O(() => [
            ce(Q(e.validationMessage), 1)
          ]),
          _: 1
        }, 8, ["type"])
      ])) : S("", !0)
    ]),
    _: 3
  }, 8, ["class", "aria-disabled", "disabled"]);
}
const Zi = /* @__PURE__ */ W(Es, [["render", Fs]]), Ks = {
  error: Ht,
  warning: Nt,
  success: zt
}, Ns = P({
  name: "CdxInfoChip",
  components: { CdxIcon: oe },
  props: {
    /**
     * Status type.
     *
     * @values 'notice', 'warning', 'error', 'success'
     */
    status: {
      type: String,
      default: "notice",
      validator: qt
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
    const t = f(() => ({
      ["cdx-info-chip__icon--".concat(e.status)]: !0
    })), n = f(
      () => e.status === "notice" ? e.icon : Ks[e.status]
    );
    return {
      iconClass: t,
      computedIcon: n
    };
  }
});
const Hs = { class: "cdx-info-chip" }, zs = { class: "cdx-info-chip--text" };
function qs(e, t, n, o, a, r) {
  const l = L("cdx-icon");
  return c(), w("div", Hs, [
    e.computedIcon ? (c(), F(l, {
      key: 0,
      class: z(["cdx-info-chip__icon", e.iconClass]),
      icon: e.computedIcon
    }, null, 8, ["class", "icon"])) : S("", !0),
    k("span", zs, [
      B(e.$slots, "default")
    ])
  ]);
}
const Ji = /* @__PURE__ */ W(Ns, [["render", qs]]), Ps = le(_e), Ws = P({
  name: "CdxLookup",
  components: {
    CdxMenu: et,
    CdxTextInput: yt
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
      validator: Ps
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
  setup: (e, { emit: t, attrs: n, slots: o }) => {
    const a = m(), r = m(), l = m(), s = ee("lookup-menu"), i = m(!1), d = m(!1), u = m(!1), { computedDisabled: p } = me(q(e, "disabled")), g = q(e, "selected"), h = ye(g, t, "update:selected"), b = f(
      () => e.menuItems.find((v) => v.value === e.selected)
    ), I = f(() => {
      var v, E;
      return (E = (v = l.value) == null ? void 0 : v.getHighlightedMenuItem()) == null ? void 0 : E.id;
    }), y = m(e.initialInputValue), A = f(() => ({
      "cdx-lookup--disabled": p.value,
      "cdx-lookup--pending": i.value
    })), {
      rootClasses: M,
      rootStyle: V,
      otherAttrs: H
    } = ve(n, A);
    function D(v) {
      b.value && b.value.label !== v && b.value.value !== v && (h.value = null), v === "" ? (d.value = !1, i.value = !1) : i.value = !0, t("input", v);
    }
    function T(v) {
      u.value = !0, // Input value is not null or an empty string.
      y.value !== null && y.value !== "" && // There's either menu items to show or a no results message.
      (e.menuItems.length > 0 || o["no-results"]) && (d.value = !0), t("focus", v);
    }
    function _(v) {
      u.value = !1, d.value = !1, t("blur", v);
    }
    function x(v) {
      !l.value || p.value || e.menuItems.length === 0 && !o["no-results"] || v.key === " " || l.value.delegateKeyNavigation(v);
    }
    return kt(r, l), Z(g, (v) => {
      if (v !== null) {
        const E = b.value ? b.value.label || b.value.value : "";
        y.value !== E && (y.value = E, t("input", y.value));
      }
    }), Z(q(e, "menuItems"), (v) => {
      // Only show the menu if we were in the pending state (meaning this menuItems change
      // was in response to user input) and the menu is still focused
      u.value && i.value && // Show the menu if there are either menu items or no-results content to show
      (v.length > 0 || o["no-results"]) && (d.value = !0), v.length === 0 && !o["no-results"] && (d.value = !1), i.value = !1;
    }), {
      rootElement: a,
      textInput: r,
      menu: l,
      menuId: s,
      highlightedId: I,
      inputValue: y,
      modelWrapper: h,
      expanded: d,
      computedDisabled: p,
      onInputBlur: _,
      rootClasses: M,
      rootStyle: V,
      otherAttrs: H,
      onUpdateInput: D,
      onInputFocus: T,
      onKeydown: x
    };
  }
});
function js(e, t, n, o, a, r) {
  const l = L("cdx-text-input"), s = L("cdx-menu");
  return c(), w("div", {
    ref: "rootElement",
    class: z(["cdx-lookup", e.rootClasses]),
    style: fe(e.rootStyle)
  }, [
    U(l, te({
      ref: "textInput",
      modelValue: e.inputValue,
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.inputValue = i)
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
      onChange: t[1] || (t[1] = (i) => e.$emit("change", i)),
      onFocus: e.onInputFocus,
      onBlur: e.onInputBlur,
      onKeydown: e.onKeydown
    }), null, 16, ["modelValue", "aria-controls", "aria-expanded", "aria-activedescendant", "disabled", "status", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
    U(s, te({
      id: e.menuId,
      ref: "menu",
      selected: e.modelWrapper,
      "onUpdate:selected": t[2] || (t[2] = (i) => e.modelWrapper = i),
      expanded: e.expanded,
      "onUpdate:expanded": t[3] || (t[3] = (i) => e.expanded = i),
      "menu-items": e.menuItems
    }, e.menuConfig, {
      onLoadMore: t[4] || (t[4] = (i) => e.$emit("load-more"))
    }), {
      default: O(({ menuItem: i }) => [
        B(e.$slots, "menu-item", { menuItem: i })
      ]),
      "no-results": O(() => [
        B(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const ea = /* @__PURE__ */ W(Ws, [["render", js]]), Us = P({
  name: "CdxRadio",
  components: { CdxLabel: Je },
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
  setup(e, { emit: t, slots: n, attrs: o }) {
    var p;
    bt((p = n.default) == null ? void 0 : p.call(n), o, "CdxRadio");
    const a = f(() => ({
      "cdx-radio--inline": e.inline
    })), { computedDisabled: r } = me(q(e, "disabled")), l = m(), s = ee("radio"), i = ee("description"), d = () => {
      l.value.focus();
    }, u = ye(q(e, "modelValue"), t);
    return {
      rootClasses: a,
      computedDisabled: r,
      input: l,
      radioId: s,
      descriptionId: i,
      focusInput: d,
      wrappedModel: u
    };
  }
});
const Qs = ["id", "aria-describedby", "name", "value", "disabled"], Gs = /* @__PURE__ */ k("span", { class: "cdx-radio__icon" }, null, -1);
function Ys(e, t, n, o, a, r) {
  const l = L("cdx-label");
  return c(), w("span", {
    class: z(["cdx-radio", e.rootClasses])
  }, [
    ue(k("input", {
      id: e.radioId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (s) => e.wrappedModel = s),
      class: "cdx-radio__input",
      type: "radio",
      "aria-describedby": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      name: e.name,
      value: e.inputValue,
      disabled: e.computedDisabled
    }, null, 8, Qs), [
      [In, e.wrappedModel]
    ]),
    Gs,
    e.$slots.default && e.$slots.default().length ? (c(), F(l, {
      key: 0,
      class: "cdx-radio__label",
      "input-id": e.radioId,
      "description-id": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      disabled: e.computedDisabled,
      onClick: e.focusInput
    }, Ye({
      default: O(() => [
        B(e.$slots, "default")
      ]),
      _: 2
    }, [
      e.$slots.description && e.$slots.description().length > 0 ? {
        name: "description",
        fn: O(() => [
          B(e.$slots, "description")
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["input-id", "description-id", "disabled", "onClick"])) : S("", !0)
  ], 2);
}
const ta = /* @__PURE__ */ W(Us, [["render", Ys]]), Xs = le(_e), Zs = P({
  name: "CdxSearchInput",
  components: {
    CdxButton: Ae,
    CdxTextInput: yt
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
      validator: Xs
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
    const o = ye(q(e, "modelValue"), t), { computedDisabled: a } = me(q(e, "disabled")), r = f(() => ({
      "cdx-search-input--has-end-button": !!e.buttonLabel
    })), {
      rootClasses: l,
      rootStyle: s,
      otherAttrs: i
    } = ve(n, r);
    return {
      wrappedModel: o,
      computedDisabled: a,
      rootClasses: l,
      rootStyle: s,
      otherAttrs: i,
      handleSubmit: () => {
        t("submit-click", o.value);
      },
      searchIcon: Pn
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
const Js = { class: "cdx-search-input__input-wrapper" };
function ei(e, t, n, o, a, r) {
  const l = L("cdx-text-input"), s = L("cdx-button");
  return c(), w("div", {
    class: z(["cdx-search-input", e.rootClasses]),
    style: fe(e.rootStyle)
  }, [
    k("div", Js, [
      U(l, te({
        ref: "textInput",
        modelValue: e.wrappedModel,
        "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wrappedModel = i),
        class: "cdx-search-input__text-input",
        "input-type": "search",
        "start-icon": e.searchIcon,
        disabled: e.computedDisabled,
        status: e.status
      }, e.otherAttrs, {
        onKeydown: he(e.handleSubmit, ["enter"]),
        onInput: t[1] || (t[1] = (i) => e.$emit("input", i)),
        onChange: t[2] || (t[2] = (i) => e.$emit("change", i)),
        onFocus: t[3] || (t[3] = (i) => e.$emit("focus", i)),
        onBlur: t[4] || (t[4] = (i) => e.$emit("blur", i))
      }), null, 16, ["modelValue", "start-icon", "disabled", "status", "onKeydown"]),
      B(e.$slots, "default")
    ]),
    e.buttonLabel ? (c(), F(s, {
      key: 0,
      class: "cdx-search-input__end-button",
      disabled: e.computedDisabled,
      onClick: e.handleSubmit
    }, {
      default: O(() => [
        ce(Q(e.buttonLabel), 1)
      ]),
      _: 1
    }, 8, ["disabled", "onClick"])) : S("", !0)
  ], 6);
}
const ti = /* @__PURE__ */ W(Zs, [["render", ei]]), ni = le(_e), oi = P({
  name: "CdxSelect",
  components: {
    CdxIcon: oe,
    CdxMenu: et
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
      validator: ni
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
    const o = m(), a = m(), r = Ce(Ze, void 0), l = ee("select-menu"), s = m(!1), i = n.id || ee("select-handle"), {
      computedDisabled: d,
      computedStatus: u,
      computedInputId: p
    } = me(
      q(e, "disabled"),
      q(e, "status"),
      i
    ), g = ye(q(e, "selected"), t, "update:selected"), h = f(
      () => e.menuItems.find((v) => v.value === e.selected)
    ), b = f(() => h.value ? h.value.label || h.value.value : e.defaultLabel), I = f(() => {
      if (e.defaultIcon && !h.value)
        return e.defaultIcon;
      if (h.value && h.value.icon)
        return h.value.icon;
    }), y = f(() => ({
      "cdx-select-vue--enabled": !d.value,
      "cdx-select-vue--disabled": d.value,
      "cdx-select-vue--expanded": s.value,
      "cdx-select-vue--value-selected": !!h.value,
      "cdx-select-vue--no-selections": !h.value,
      "cdx-select-vue--has-start-icon": !!I.value,
      ["cdx-select-vue--status-".concat(u.value)]: !0
    })), {
      rootClasses: A,
      rootStyle: M,
      otherAttrs: V
    } = ve(n, y), H = f(() => {
      const j = V.value, { id: v } = j;
      return $e(j, ["id"]);
    }), D = f(() => {
      var v, E;
      return (E = (v = a.value) == null ? void 0 : v.getHighlightedMenuItem()) == null ? void 0 : E.id;
    });
    function T() {
      s.value = !1;
    }
    function _() {
      var v;
      d.value || (s.value = !s.value, (v = o.value) == null || v.focus());
    }
    function x(v) {
      var E;
      d.value || (E = a.value) == null || E.delegateKeyNavigation(v, { characterNavigation: !0 });
    }
    return kt(o, a), {
      handle: o,
      menu: a,
      computedHandleId: p,
      descriptionId: r,
      menuId: l,
      modelWrapper: g,
      selectedMenuItem: h,
      highlightedId: D,
      expanded: s,
      computedDisabled: d,
      onBlur: T,
      currentLabel: b,
      rootClasses: A,
      rootStyle: M,
      otherAttrsMinusId: H,
      onClick: _,
      onKeydown: x,
      startIcon: I,
      cdxIconExpand: ht
    };
  }
});
const li = ["aria-disabled"], si = ["id", "aria-controls", "aria-activedescendant", "aria-expanded", "aria-describedby"];
function ii(e, t, n, o, a, r) {
  const l = L("cdx-icon"), s = L("cdx-menu");
  return c(), w("div", {
    class: z(["cdx-select-vue", e.rootClasses]),
    style: fe(e.rootStyle),
    "aria-disabled": e.computedDisabled
  }, [
    k("div", te({
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
      onClick: t[0] || (t[0] = (...i) => e.onClick && e.onClick(...i)),
      onBlur: t[1] || (t[1] = (...i) => e.onBlur && e.onBlur(...i)),
      onKeydown: t[2] || (t[2] = (...i) => e.onKeydown && e.onKeydown(...i))
    }), [
      B(e.$slots, "label", {
        selectedMenuItem: e.selectedMenuItem,
        defaultLabel: e.defaultLabel
      }, () => [
        ce(Q(e.currentLabel), 1)
      ]),
      e.startIcon ? (c(), F(l, {
        key: 0,
        icon: e.startIcon,
        class: "cdx-select-vue__start-icon"
      }, null, 8, ["icon"])) : S("", !0),
      U(l, {
        icon: e.cdxIconExpand,
        class: "cdx-select-vue__indicator"
      }, null, 8, ["icon"])
    ], 16, si),
    U(s, te({
      id: e.menuId,
      ref: "menu",
      selected: e.modelWrapper,
      "onUpdate:selected": t[3] || (t[3] = (i) => e.modelWrapper = i),
      expanded: e.expanded,
      "onUpdate:expanded": t[4] || (t[4] = (i) => e.expanded = i),
      "menu-items": e.menuItems
    }, e.menuConfig, {
      onLoadMore: t[5] || (t[5] = (i) => e.$emit("load-more"))
    }), {
      default: O(({ menuItem: i }) => [
        B(e.$slots, "menu-item", { menuItem: i })
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 14, li);
}
const na = /* @__PURE__ */ W(oi, [["render", ii]]), ai = P({
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
    const t = Ce(Pt), n = Ce(Wt);
    if (!t || !n)
      throw new Error("Tab component must be used inside a Tabs component");
    const o = t.value.get(e.name) || {}, a = f(() => e.name === n.value);
    return {
      tab: o,
      isActive: a
    };
  }
});
const ri = ["id", "aria-hidden", "aria-labelledby"];
function di(e, t, n, o, a, r) {
  return ue((c(), w("section", {
    id: e.tab.id,
    "aria-hidden": e.isActive ? void 0 : !0,
    "aria-labelledby": "".concat(e.tab.id, "-label"),
    class: "cdx-tab",
    role: "tabpanel",
    tabindex: "-1"
  }, [
    B(e.$slots, "default")
  ], 8, ri)), [
    [Ke, e.isActive]
  ]);
}
const ui = /* @__PURE__ */ W(ai, [["render", di]]), ci = P({
  name: "CdxTabs",
  components: {
    CdxButton: Ae,
    CdxIcon: oe
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
    const o = m(), a = m(), r = m(), l = m(), s = mt(o), i = f(() => {
      const x = vt(t.default);
      if (!x.every(
        (v) => typeof v == "object" && Yt(v, ui.name)
      ))
        throw new Error("Slot content may only contain CdxTab components");
      if (x.length === 0)
        throw new Error("Slot content cannot be empty");
      return x;
    }), d = f(() => i.value.reduce((x, v) => {
      var E;
      if ((E = v.props) != null && E.name && typeof v.props.name == "string") {
        if (x.get(v.props.name))
          throw new Error("Tab names must be unique");
        x.set(v.props.name, {
          name: v.props.name,
          id: ee(v.props.name),
          label: v.props.label || v.props.name,
          disabled: v.props.disabled
        });
      }
      return x;
    }, /* @__PURE__ */ new Map())), u = ye(q(e, "active"), n, "update:active"), p = f(() => Array.from(d.value.keys())), g = f(() => p.value.indexOf(u.value)), h = f(() => {
      var x;
      return (x = d.value.get(u.value)) == null ? void 0 : x.id;
    });
    Ee(Wt, u), Ee(Pt, d);
    const b = m(/* @__PURE__ */ new Map()), I = m(), y = m(), A = ut(I, { threshold: 0.95 }), M = ut(y, { threshold: 0.95 });
    function V(x, v) {
      const E = x;
      E && (b.value.set(v, E), v === 0 ? I.value = E : v === p.value.length - 1 && (y.value = E));
    }
    const H = f(() => ({
      "cdx-tabs--framed": e.framed,
      "cdx-tabs--quiet": !e.framed
    }));
    function D() {
      var x;
      (x = b.value.get(g.value)) == null || x.focus();
    }
    function T(x) {
      if (!a.value || !r.value || !l.value)
        return 0;
      const v = s.value === "rtl" ? l.value : r.value, E = s.value === "rtl" ? r.value : l.value, j = x.offsetLeft, $ = j + x.clientWidth, K = a.value.scrollLeft + v.clientWidth, Y = a.value.scrollLeft + a.value.clientWidth - E.clientWidth;
      return j < K ? j - K : $ > Y ? $ - Y : 0;
    }
    function _(x) {
      if (!a.value || !r.value || !l.value)
        return;
      const v = x === "next" && s.value === "ltr" || x === "prev" && s.value === "rtl" ? 1 : -1;
      let E = 0, j = x === "next" ? a.value.firstElementChild : a.value.lastElementChild;
      for (; j; ) {
        const $ = x === "next" ? j.nextElementSibling : j.previousElementSibling;
        if (E = T(j), Math.sign(E) === v) {
          $ && Math.abs(E) < 0.25 * a.value.clientWidth && (E = T($));
          break;
        }
        j = $;
      }
      a.value.scrollBy({
        left: E,
        behavior: "smooth"
      }), D();
    }
    return Z(u, () => {
      if (h.value === void 0 || !a.value || !r.value || !l.value)
        return;
      const x = document.getElementById("".concat(h.value, "-label"));
      x && a.value.scrollBy({
        left: T(x),
        behavior: "smooth"
      });
    }), {
      activeTab: u,
      activeTabIndex: g,
      activeTabId: h,
      currentDirection: s,
      rootElement: o,
      tabListElement: a,
      prevScroller: r,
      nextScroller: l,
      rootClasses: H,
      tabNames: p,
      tabsData: d,
      firstLabelVisible: A,
      lastLabelVisible: M,
      assignTemplateRefForTabButton: V,
      scrollTabs: _,
      focusActiveTab: D,
      cdxIconPrevious: qn,
      cdxIconNext: zn
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
      n && !(n != null && n.disabled) && (this.activeTab = e, t && Be(() => {
        this.focusActiveTab();
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
      const o = this.tabsData.get(this.tabNames[e + t]);
      o && (o.disabled ? this.selectNonDisabled(e + t, t, n) : this.select(o.name, n));
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
const pi = { class: "cdx-tabs__header" }, fi = {
  ref: "prevScroller",
  class: "cdx-tabs__prev-scroller"
}, hi = {
  ref: "tabListElement",
  class: "cdx-tabs__list",
  role: "tablist"
}, mi = ["id", "disabled", "aria-controls", "aria-selected", "tabindex", "onClick", "onKeyup"], vi = {
  ref: "nextScroller",
  class: "cdx-tabs__next-scroller"
}, gi = { class: "cdx-tabs__content" };
function bi(e, t, n, o, a, r) {
  const l = L("cdx-icon"), s = L("cdx-button");
  return c(), w("div", {
    ref: "rootElement",
    class: z(["cdx-tabs", e.rootClasses])
  }, [
    k("div", pi, [
      ue(k("div", fi, [
        U(s, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[0] || (t[0] = re(() => {
          }, ["prevent"])),
          onClick: t[1] || (t[1] = (i) => e.scrollTabs("prev"))
        }, {
          default: O(() => [
            U(l, { icon: e.cdxIconPrevious }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [Ke, !e.firstLabelVisible]
      ]),
      k("div", hi, [
        (c(!0), w(Te, null, He(e.tabsData.values(), (i, d) => (c(), w("button", {
          id: "".concat(i.id, "-label"),
          key: d,
          ref_for: !0,
          ref: (u) => e.assignTemplateRefForTabButton(u, d),
          disabled: i.disabled ? !0 : void 0,
          "aria-controls": i.id,
          "aria-selected": i.name === e.activeTab,
          tabindex: i.name === e.activeTab ? void 0 : -1,
          class: "cdx-tabs__list__item",
          role: "tab",
          onClick: re((u) => e.select(i.name), ["prevent"]),
          onKeyup: he((u) => e.select(i.name), ["enter"]),
          onKeydown: [
            t[2] || (t[2] = he(re((...u) => e.onRightArrowKeypress && e.onRightArrowKeypress(...u), ["prevent"]), ["right"])),
            t[3] || (t[3] = he(re((...u) => e.onDownArrowKeypress && e.onDownArrowKeypress(...u), ["prevent"]), ["down"])),
            t[4] || (t[4] = he(re((...u) => e.onLeftArrowKeypress && e.onLeftArrowKeypress(...u), ["prevent"]), ["left"]))
          ]
        }, [
          k("span", null, Q(i.label), 1)
        ], 40, mi))), 128))
      ], 512),
      ue(k("div", vi, [
        U(s, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[5] || (t[5] = re(() => {
          }, ["prevent"])),
          onClick: t[6] || (t[6] = (i) => e.scrollTabs("next"))
        }, {
          default: O(() => [
            U(l, { icon: e.cdxIconNext }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [Ke, !e.lastLabelVisible]
      ])
    ]),
    k("div", gi, [
      B(e.$slots, "default")
    ])
  ], 2);
}
const oa = /* @__PURE__ */ W(ci, [["render", bi]]), yi = le(_e), $i = P({
  name: "CdxTextArea",
  components: { CdxIcon: oe },
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
      validator: yi
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
    const o = ye(q(e, "modelValue"), n), a = t.id, {
      computedDisabled: r,
      computedStatus: l,
      computedInputId: s
    } = me(
      q(e, "disabled"),
      q(e, "status"),
      a
    ), i = Ce(Ze, void 0), d = f(() => ({
      "cdx-text-area__textarea--has-value": !!o.value,
      "cdx-text-area__textarea--is-autosize": e.autosize
    })), u = f(() => ({
      "cdx-text-area--status-default": l.value === "default",
      "cdx-text-area--status-error": l.value === "error",
      "cdx-text-area--has-start-icon": !!e.startIcon,
      "cdx-text-area--has-end-icon": !!e.endIcon
    })), {
      rootClasses: p,
      rootStyle: g,
      otherAttrs: h
    } = ve(t, u), b = f(() => {
      const V = h.value, { id: A } = V;
      return $e(V, ["id"]);
    }), I = m();
    function y() {
      I.value && e.autosize && (I.value.style.height = "auto", I.value.style.height = "".concat(I.value.scrollHeight, "px"));
    }
    return {
      rootClasses: p,
      rootStyle: g,
      wrappedModel: o,
      computedDisabled: r,
      computedInputId: s,
      descriptionId: i,
      textareaClasses: d,
      otherAttrsMinusId: b,
      textarea: I,
      onInput: y
    };
  }
});
const Ci = ["id", "aria-describedby", "disabled"];
function wi(e, t, n, o, a, r) {
  const l = L("cdx-icon");
  return c(), w("div", {
    class: z(["cdx-text-area", e.rootClasses]),
    style: fe(e.rootStyle)
  }, [
    ue(k("textarea", te({
      id: e.computedInputId,
      ref: "textarea"
    }, e.otherAttrsMinusId, {
      "onUpdate:modelValue": t[0] || (t[0] = (s) => e.wrappedModel = s),
      class: [e.textareaClasses, "cdx-text-area__textarea"],
      "aria-describedby": e.descriptionId,
      disabled: e.computedDisabled,
      onInput: t[1] || (t[1] = (...s) => e.onInput && e.onInput(...s))
    }), null, 16, Ci), [
      [_n, e.wrappedModel]
    ]),
    e.startIcon ? (c(), F(l, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-area__icon-vue cdx-text-area__start-icon"
    }, null, 8, ["icon"])) : S("", !0),
    e.endIcon ? (c(), F(l, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-area__icon-vue cdx-text-area__end-icon"
    }, null, 8, ["icon"])) : S("", !0)
  ], 6);
}
const la = /* @__PURE__ */ W($i, [["render", wi]]), Ii = P({
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
  setup(e, { emit: t, slots: n, attrs: o }) {
    const a = Xt(n.default, o, "CdxButton"), r = m(!1);
    return {
      rootClasses: f(() => ({
        // Quiet means frameless among other things
        "cdx-toggle-button--quiet": e.quiet,
        "cdx-toggle-button--framed": !e.quiet,
        // Provide --toggled-off too so that we can simplify selectors
        "cdx-toggle-button--toggled-on": e.modelValue,
        "cdx-toggle-button--toggled-off": !e.modelValue,
        "cdx-toggle-button--icon-only": a.value,
        "cdx-toggle-button--is-active": r.value
      })),
      onClick: () => {
        t("update:modelValue", !e.modelValue);
      },
      setActive: (d) => {
        r.value = d;
      }
    };
  }
});
const _i = ["aria-pressed", "disabled"];
function xi(e, t, n, o, a, r) {
  return c(), w("button", {
    class: z(["cdx-toggle-button", e.rootClasses]),
    "aria-pressed": e.modelValue,
    disabled: e.disabled,
    onClick: t[0] || (t[0] = (...l) => e.onClick && e.onClick(...l)),
    onKeydown: t[1] || (t[1] = he((l) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = he((l) => e.setActive(!1), ["space", "enter"]))
  }, [
    B(e.$slots, "default")
  ], 42, _i);
}
const ki = /* @__PURE__ */ W(Ii, [["render", xi]]), Si = P({
  name: "CdxToggleButtonGroup",
  components: {
    CdxIcon: oe,
    CdxToggleButton: ki
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
    function o(a, r) {
      if (Array.isArray(e.modelValue)) {
        const l = e.modelValue.indexOf(a.value) !== -1;
        r && !l ? t("update:modelValue", e.modelValue.concat(a.value)) : !r && l && t("update:modelValue", e.modelValue.filter((s) => s !== a.value));
      } else
        r && e.modelValue !== a.value && t("update:modelValue", a.value);
    }
    return {
      getButtonLabel: Zt,
      isSelected: n,
      onUpdate: o
    };
  }
});
const Ai = { class: "cdx-toggle-button-group" };
function Bi(e, t, n, o, a, r) {
  const l = L("cdx-icon"), s = L("cdx-toggle-button");
  return c(), w("div", Ai, [
    (c(!0), w(Te, null, He(e.buttons, (i) => (c(), F(s, {
      key: i.value,
      "model-value": e.isSelected(i),
      disabled: i.disabled || e.disabled,
      "aria-label": i.ariaLabel,
      "onUpdate:modelValue": (d) => e.onUpdate(i, d)
    }, {
      default: O(() => [
        B(e.$slots, "default", {
          button: i,
          selected: e.isSelected(i)
        }, () => [
          i.icon ? (c(), F(l, {
            key: 0,
            icon: i.icon
          }, null, 8, ["icon"])) : S("", !0),
          ce(" " + Q(e.getButtonLabel(i)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["model-value", "disabled", "aria-label", "onUpdate:modelValue"]))), 128))
  ]);
}
const sa = /* @__PURE__ */ W(Si, [["render", Bi]]), Ti = P({
  name: "CdxToggleSwitch",
  components: { CdxLabel: Je },
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
  setup(e, { emit: t, slots: n, attrs: o }) {
    var b;
    bt((b = n.default) == null ? void 0 : b.call(n), o, "CdxToggleSwitch");
    const a = m(), r = ee("toggle-switch"), l = ee("description"), s = f(() => ({
      "cdx-toggle-switch--align-switch": e.alignSwitch
    })), {
      rootClasses: i,
      rootStyle: d,
      otherAttrs: u
    } = ve(o, s), { computedDisabled: p } = me(q(e, "disabled")), g = ye(q(e, "modelValue"), t);
    return {
      input: a,
      inputId: r,
      descriptionId: l,
      rootClasses: i,
      rootStyle: d,
      otherAttrs: u,
      computedDisabled: p,
      wrappedModel: g,
      clickInput: () => {
        a.value.click();
      }
    };
  }
});
const Mi = ["id", "aria-describedby", "value", "disabled"], Li = /* @__PURE__ */ k("span", { class: "cdx-toggle-switch__switch" }, [
  /* @__PURE__ */ k("span", { class: "cdx-toggle-switch__switch__grip" })
], -1);
function Vi(e, t, n, o, a, r) {
  const l = L("cdx-label");
  return c(), w("span", {
    class: z(["cdx-toggle-switch", e.rootClasses]),
    style: fe(e.rootStyle)
  }, [
    ue(k("input", te({
      id: e.inputId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (s) => e.wrappedModel = s),
      class: "cdx-toggle-switch__input",
      type: "checkbox",
      role: "switch",
      "aria-describedby": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      value: e.inputValue,
      disabled: e.computedDisabled
    }, e.otherAttrs, {
      onKeydown: t[1] || (t[1] = he(re((...s) => e.clickInput && e.clickInput(...s), ["prevent"]), ["enter"]))
    }), null, 16, Mi), [
      [Kt, e.wrappedModel]
    ]),
    Li,
    e.$slots.default && e.$slots.default().length ? (c(), F(l, {
      key: 0,
      class: "cdx-toggle-switch__label",
      "input-id": e.inputId,
      "description-id": e.$slots.description && e.$slots.description().length > 0 ? e.descriptionId : void 0,
      "visually-hidden": e.hideLabel,
      disabled: e.computedDisabled
    }, Ye({
      default: O(() => [
        B(e.$slots, "default")
      ]),
      _: 2
    }, [
      e.$slots.description && e.$slots.description().length > 0 ? {
        name: "description",
        fn: O(() => [
          B(e.$slots, "description")
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["input-id", "description-id", "visually-hidden", "disabled"])) : S("", !0)
  ], 6);
}
const ia = /* @__PURE__ */ W(Ti, [["render", Vi]]), Di = P({
  name: "CdxTypeaheadSearch",
  components: {
    CdxIcon: oe,
    CdxMenu: et,
    CdxSearchInput: ti
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
      default: eo
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
  setup(e, { attrs: t, emit: n, slots: o }) {
    const a = m(), r = m(), l = ee("typeahead-search-menu"), s = m(!1), i = m(!1), d = m(!1), u = m(!1), p = m(e.initialInputValue), g = m(""), h = f(() => {
      var N, C;
      return (C = (N = r.value) == null ? void 0 : N.getHighlightedMenuItem()) == null ? void 0 : C.id;
    }), b = m(null), I = f(() => ({
      "cdx-typeahead-search__menu-message--has-thumbnail": e.showThumbnail
    })), y = f(
      () => e.searchResults.find(
        (N) => N.value === b.value
      )
    ), A = f(
      () => e.searchFooterUrl ? { value: De, url: e.searchFooterUrl } : void 0
    ), M = f(() => ({
      "cdx-typeahead-search--show-thumbnail": e.showThumbnail,
      "cdx-typeahead-search--expanded": s.value,
      "cdx-typeahead-search--auto-expand-width": e.showThumbnail && e.autoExpandWidth
    })), {
      rootClasses: V,
      rootStyle: H,
      otherAttrs: D
    } = ve(t, M);
    function T(N) {
      return N;
    }
    const _ = f(() => ({
      visibleItemLimit: e.visibleItemLimit,
      showThumbnail: e.showThumbnail,
      // In case search queries aren't highlighted, default to a bold label.
      boldLabel: !0,
      hideDescriptionOverflow: !0
    }));
    let x, v;
    function E(N, C = !1) {
      y.value && y.value.label !== N && y.value.value !== N && (b.value = null), v !== void 0 && (clearTimeout(v), v = void 0), N === "" ? s.value = !1 : (i.value = !0, o["search-results-pending"] && (v = setTimeout(() => {
        u.value && (s.value = !0), d.value = !0;
      }, to))), x !== void 0 && (clearTimeout(x), x = void 0);
      const R = () => {
        n("input", N);
      };
      C ? R() : x = setTimeout(() => {
        R();
      }, e.debounceInterval);
    }
    function j(N) {
      if (N === De) {
        b.value = null, p.value = g.value;
        return;
      }
      b.value = N, N !== null && (p.value = y.value ? y.value.label || String(y.value.value) : "");
    }
    function $() {
      u.value = !0, (g.value || d.value) && (s.value = !0);
    }
    function K() {
      u.value = !1, s.value = !1;
    }
    function Y(N) {
      const G = N, { id: C } = G, R = $e(G, ["id"]);
      if (R.value === De) {
        n("search-result-click", {
          searchResult: null,
          index: e.searchResults.length,
          numberOfResults: e.searchResults.length
        });
        return;
      }
      X(R);
    }
    function X(N) {
      const C = {
        searchResult: N,
        index: e.searchResults.findIndex(
          (R) => R.value === N.value
        ),
        numberOfResults: e.searchResults.length
      };
      n("search-result-click", C);
    }
    function ot(N) {
      if (N.value === De) {
        p.value = g.value;
        return;
      }
      p.value = N.value ? N.label || String(N.value) : "";
    }
    function lt(N) {
      var C;
      s.value = !1, (C = r.value) == null || C.clearActive(), Y(N);
    }
    function st(N) {
      if (y.value)
        X(y.value), N.stopPropagation(), window.location.assign(y.value.url), N.preventDefault();
      else {
        const C = {
          searchResult: null,
          index: -1,
          numberOfResults: e.searchResults.length
        };
        n("submit", C);
      }
    }
    function it(N) {
      if (!r.value || !g.value || N.key === " ")
        return;
      const C = r.value.getHighlightedMenuItem(), R = r.value.getHighlightedViaKeyboard();
      switch (N.key) {
        case "Enter":
          C && (C.value === De && R ? window.location.assign(e.searchFooterUrl) : r.value.delegateKeyNavigation(N, { prevent: !1 })), s.value = !1;
          break;
        case "Tab":
          s.value = !1;
          break;
        default:
          r.value.delegateKeyNavigation(N);
          break;
      }
    }
    return Ie(() => {
      e.initialInputValue && E(e.initialInputValue, !0);
    }), Z(q(e, "searchResults"), () => {
      g.value = p.value.trim(), u.value && i.value && g.value.length > 0 && (s.value = !0), v !== void 0 && (clearTimeout(v), v = void 0), i.value = !1, d.value = !1;
    }), {
      form: a,
      menu: r,
      menuId: l,
      highlightedId: h,
      selection: b,
      menuMessageClass: I,
      footer: A,
      asSearchResult: T,
      inputValue: p,
      searchQuery: g,
      expanded: s,
      showPending: d,
      rootClasses: V,
      rootStyle: H,
      otherAttrs: D,
      menuConfig: _,
      onUpdateInputValue: E,
      onUpdateMenuSelection: j,
      onFocus: $,
      onBlur: K,
      onSearchResultClick: Y,
      onSearchResultKeyboardNavigation: ot,
      onSearchFooterClick: lt,
      onSubmit: st,
      onKeydown: it,
      MenuFooterValue: De,
      articleIcon: Fn
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
const Ei = ["id", "action"], Ri = { class: "cdx-typeahead-search__menu-message__text" }, Oi = { class: "cdx-typeahead-search__menu-message__text" }, Fi = ["href", "onClickCapture"], Ki = { class: "cdx-menu-item__text cdx-typeahead-search__search-footer__text" }, Ni = { class: "cdx-typeahead-search__search-footer__query" };
function Hi(e, t, n, o, a, r) {
  const l = L("cdx-icon"), s = L("cdx-menu"), i = L("cdx-search-input");
  return c(), w("div", {
    class: z(["cdx-typeahead-search", e.rootClasses]),
    style: fe(e.rootStyle)
  }, [
    k("form", {
      id: e.id,
      ref: "form",
      class: "cdx-typeahead-search__form",
      action: e.formAction,
      onSubmit: t[4] || (t[4] = (...d) => e.onSubmit && e.onSubmit(...d))
    }, [
      U(i, te({
        ref: "searchInput",
        modelValue: e.inputValue,
        "onUpdate:modelValue": t[3] || (t[3] = (d) => e.inputValue = d),
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
        default: O(() => [
          U(s, te({
            id: e.menuId,
            ref: "menu",
            expanded: e.expanded,
            "onUpdate:expanded": t[0] || (t[0] = (d) => e.expanded = d),
            "show-pending": e.showPending,
            selected: e.selection,
            "menu-items": e.searchResults,
            footer: e.footer,
            "search-query": e.highlightQuery ? e.searchQuery : "",
            "show-no-results-slot": e.searchQuery.length > 0 && e.searchResults.length === 0 && e.$slots["search-no-results-text"] && e.$slots["search-no-results-text"]().length > 0
          }, e.menuConfig, {
            "aria-label": e.searchResultsLabel,
            "onUpdate:selected": e.onUpdateMenuSelection,
            onMenuItemClick: t[1] || (t[1] = (d) => e.onSearchResultClick(e.asSearchResult(d))),
            onMenuItemKeyboardNavigation: e.onSearchResultKeyboardNavigation,
            onLoadMore: t[2] || (t[2] = (d) => e.$emit("load-more"))
          }), {
            pending: O(() => [
              k("div", {
                class: z(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                k("span", Ri, [
                  B(e.$slots, "search-results-pending")
                ])
              ], 2)
            ]),
            "no-results": O(() => [
              k("div", {
                class: z(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                k("span", Oi, [
                  B(e.$slots, "search-no-results-text")
                ])
              ], 2)
            ]),
            default: O(({ menuItem: d, active: u }) => [
              d.value === e.MenuFooterValue ? (c(), w("a", {
                key: 0,
                class: z(["cdx-menu-item__content cdx-typeahead-search__search-footer", {
                  "cdx-typeahead-search__search-footer__active": u
                }]),
                href: e.asSearchResult(d).url,
                onClickCapture: re((p) => e.onSearchFooterClick(e.asSearchResult(d)), ["stop"])
              }, [
                U(l, {
                  class: "cdx-menu-item__thumbnail cdx-typeahead-search__search-footer__icon",
                  icon: e.articleIcon
                }, null, 8, ["icon"]),
                k("span", Ki, [
                  B(e.$slots, "search-footer-text", { searchQuery: e.searchQuery }, () => [
                    k("strong", Ni, Q(e.searchQuery), 1)
                  ])
                ])
              ], 42, Fi)) : S("", !0)
            ]),
            _: 3
          }, 16, ["id", "expanded", "show-pending", "selected", "menu-items", "footer", "search-query", "show-no-results-slot", "aria-label", "onUpdate:selected", "onMenuItemKeyboardNavigation"])
        ]),
        _: 3
      }, 16, ["modelValue", "button-label", "aria-controls", "aria-expanded", "aria-activedescendant", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
      B(e.$slots, "default")
    ], 40, Ei)
  ], 6);
}
const aa = /* @__PURE__ */ W(Di, [["render", Hi]]);
export {
  Pi as CdxAccordion,
  Ae as CdxButton,
  Wi as CdxButtonGroup,
  ji as CdxCard,
  Ui as CdxCheckbox,
  Qi as CdxChipInput,
  Yi as CdxCombobox,
  Xi as CdxDialog,
  Zi as CdxField,
  oe as CdxIcon,
  Ji as CdxInfoChip,
  Je as CdxLabel,
  ea as CdxLookup,
  et as CdxMenu,
  Il as CdxMenuItem,
  Vs as CdxMessage,
  Bl as CdxProgressBar,
  ta as CdxRadio,
  ti as CdxSearchInput,
  hl as CdxSearchResultTitle,
  na as CdxSelect,
  ui as CdxTab,
  oa as CdxTabs,
  la as CdxTextArea,
  yt as CdxTextInput,
  Jt as CdxThumbnail,
  ki as CdxToggleButton,
  sa as CdxToggleButtonGroup,
  ia as CdxToggleSwitch,
  aa as CdxTypeaheadSearch,
  Gi as stringHelpers,
  mt as useComputedDirection,
  en as useComputedDisabled,
  Un as useComputedLanguage,
  me as useFieldData,
  ee as useGeneratedId,
  ut as useIntersectionObserver,
  ye as useModelWrapper,
  bs as useResizeObserver,
  vt as useSlotContents,
  ve as useSplitAttributes,
  gt as useWarnOnce
};
