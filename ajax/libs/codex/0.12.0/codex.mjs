var pt = Object.defineProperty, ft = Object.defineProperties;
var mt = Object.getOwnPropertyDescriptors;
var ye = Object.getOwnPropertySymbols;
var qe = Object.prototype.hasOwnProperty, Oe = Object.prototype.propertyIsEnumerable;
var Fe = (e, t, o) => t in e ? pt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o, ke = (e, t) => {
  for (var o in t || (t = {}))
    qe.call(t, o) && Fe(e, o, t[o]);
  if (ye)
    for (var o of ye(t))
      Oe.call(t, o) && Fe(e, o, t[o]);
  return e;
}, xe = (e, t) => ft(e, mt(t));
var $e = (e, t) => {
  var o = {};
  for (var s in e)
    qe.call(e, s) && t.indexOf(s) < 0 && (o[s] = e[s]);
  if (e != null && ye)
    for (var s of ye(e))
      t.indexOf(s) < 0 && Oe.call(e, s) && (o[s] = e[s]);
  return o;
};
var Se = (e, t, o) => new Promise((s, a) => {
  var u = (n) => {
    try {
      i(o.next(n));
    } catch (r) {
      a(r);
    }
  }, l = (n) => {
    try {
      i(o.throw(n));
    } catch (r) {
      a(r);
    }
  }, i = (n) => n.done ? s(n.value) : Promise.resolve(n.value).then(u, l);
  i((o = o.apply(e, t)).next());
});
import { ref as f, onMounted as ue, defineComponent as L, computed as c, openBlock as d, createElementBlock as h, normalizeClass as V, toDisplayString as H, createCommentVNode as I, Comment as ht, warn as vt, withKeys as Y, renderSlot as k, resolveComponent as x, Fragment as fe, renderList as Ce, createBlock as T, withCtx as A, createTextVNode as le, createVNode as F, Transition as Ae, normalizeStyle as de, resolveDynamicComponent as Je, createElementVNode as v, getCurrentInstance as bt, toRef as G, withDirectives as ie, withModifiers as X, vModelCheckbox as Xe, onUnmounted as Le, watch as ee, nextTick as ve, mergeProps as J, vShow as _e, vModelDynamic as gt, useCssVars as Ke, vModelRadio as yt, inject as He, provide as Ue } from "vue";
function ne(e) {
  return (t) => typeof t == "string" && e.indexOf(t) !== -1;
}
const Me = "cdx", $t = [
  "default",
  "progressive",
  "destructive"
], _t = [
  "normal",
  "primary",
  "quiet"
], Ct = [
  "medium",
  "large"
], It = [
  "x-small",
  "small",
  "medium"
], wt = [
  "notice",
  "warning",
  "error",
  "success"
], Ye = ne(wt), kt = [
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
], be = [
  "default",
  "error"
], xt = 120, St = 500, pe = "cdx-menu-footer-item", et = Symbol("CdxTabs"), tt = Symbol("CdxActiveTab"), Mt = '<path d="M11.53 2.3A1.85 1.85 0 0010 1.21 1.85 1.85 0 008.48 2.3L.36 16.36C-.48 17.81.21 19 1.88 19h16.24c1.67 0 2.36-1.19 1.52-2.64zM11 16H9v-2h2zm0-4H9V6h2z"/>', Bt = '<path d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"/><circle cx="10" cy="10" r="3"/>', Tt = '<path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"/>', Vt = '<path d="m4.34 2.93 12.73 12.73-1.41 1.41L2.93 4.35z"/><path d="M17.07 4.34 4.34 17.07l-1.41-1.41L15.66 2.93z"/>', At = '<path d="M13.728 1H6.272L1 6.272v7.456L6.272 19h7.456L19 13.728V6.272zM11 15H9v-2h2zm0-4H9V5h2z"/>', Lt = '<path d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"/>', Kt = '<path d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"/><path d="M19 5H1V3h18zm0 12H1v-2h18z"/>', Et = '<path d="M8 19a1 1 0 001 1h2a1 1 0 001-1v-1H8zm9-12a7 7 0 10-12 4.9S7 14 7 15v1a1 1 0 001 1h4a1 1 0 001-1v-1c0-1 2-3.1 2-3.1A7 7 0 0017 7z"/>', Dt = '<path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM9 5h2v2H9zm0 4h2v6H9z"/>', Nt = '<path d="M7 1 5.6 2.5 13 10l-7.4 7.5L7 19l9-9z"/>', Rt = '<path d="m4 10 9 9 1.4-1.5L7 10l7.4-7.5L13 1z"/>', zt = '<path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"/>', Ft = '<path d="M10 20a10 10 0 010-20 10 10 0 110 20Zm-2-5 9-8.5L15.5 5 8 12 4.5 8.5 3 10l5 5Z"/>', nt = Mt, qt = Bt, Ot = Tt, ot = Vt, lt = At, at = Lt, Ht = Kt, Ut = {
  langCodeMap: {
    ar: Et
  },
  default: Dt
}, jt = {
  ltr: Nt,
  shouldFlip: !0
}, Wt = {
  ltr: Rt,
  shouldFlip: !0
}, Pt = zt, st = Ft;
function Qt(e, t, o) {
  if (typeof e == "string" || "path" in e)
    return e;
  if ("shouldFlip" in e)
    return e.ltr;
  if ("rtl" in e)
    return o === "rtl" ? e.rtl : e.ltr;
  const s = t in e.langCodeMap ? e.langCodeMap[t] : e.default;
  return typeof s == "string" || "path" in s ? s : s.ltr;
}
function Gt(e, t) {
  if (typeof e == "string")
    return !1;
  if ("langCodeMap" in e) {
    const o = t in e.langCodeMap ? e.langCodeMap[t] : e.default;
    if (typeof o == "string")
      return !1;
    e = o;
  }
  if ("shouldFlipExceptions" in e && Array.isArray(e.shouldFlipExceptions)) {
    const o = e.shouldFlipExceptions.indexOf(t);
    return o === void 0 || o === -1;
  }
  return "shouldFlip" in e ? e.shouldFlip : !1;
}
function it(e) {
  const t = f(null);
  return ue(() => {
    const o = window.getComputedStyle(e.value).direction;
    t.value = o === "ltr" || o === "rtl" ? o : null;
  }), t;
}
function Zt(e) {
  const t = f("");
  return ue(() => {
    let o = e.value;
    for (; o && o.lang === ""; )
      o = o.parentElement;
    t.value = o ? o.lang : null;
  }), t;
}
const Jt = ne(It), Xt = L({
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
      validator: Jt
    }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const o = f(), s = it(o), a = Zt(o), u = c(() => e.dir || s.value), l = c(() => e.lang || a.value), i = c(() => ({
      "cdx-icon--flipped": u.value === "rtl" && l.value !== null && Gt(e.icon, l.value),
      [`cdx-icon--${e.size}`]: !0
    })), n = c(
      () => Qt(e.icon, l.value || "", u.value || "ltr")
    ), r = c(() => typeof n.value == "string" ? n.value : ""), p = c(() => typeof n.value != "string" ? n.value.path : "");
    return {
      rootElement: o,
      rootClasses: i,
      iconSvg: r,
      iconPath: p,
      onClick: (y) => {
        t("click", y);
      }
    };
  }
});
const K = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [s, a] of t)
    o[s] = a;
  return o;
}, Yt = ["aria-hidden"], en = { key: 0 }, tn = ["innerHTML"], nn = ["d"];
function on(e, t, o, s, a, u) {
  return d(), h("span", {
    ref: "rootElement",
    class: V(["cdx-icon", e.rootClasses]),
    onClick: t[0] || (t[0] = (...l) => e.onClick && e.onClick(...l))
  }, [
    (d(), h("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      "aria-hidden": e.iconLabel ? void 0 : !0
    }, [
      e.iconLabel ? (d(), h("title", en, H(e.iconLabel), 1)) : I("", !0),
      e.iconSvg ? (d(), h("g", {
        key: 1,
        innerHTML: e.iconSvg
      }, null, 8, tn)) : (d(), h("path", {
        key: 2,
        d: e.iconPath
      }, null, 8, nn))
    ], 8, Yt))
  ], 2);
}
const Z = /* @__PURE__ */ K(Xt, [["render", on]]), ln = ne($t), an = ne(_t), sn = ne(Ct), un = (e) => {
  !e["aria-label"] && !e["aria-hidden"] && vt(`icon-only buttons require one of the following attribute: aria-label or aria-hidden.
		See documentation on https://doc.wikimedia.org/codex/latest/components/demos/button.html#icon-only-button-1`);
};
function Te(e) {
  const t = [];
  for (const o of e)
    typeof o == "string" && o.trim() !== "" ? t.push(o) : Array.isArray(o) ? t.push(...Te(o)) : typeof o == "object" && o && (// HTML tag
    typeof o.type == "string" || // Component
    typeof o.type == "object" ? t.push(o) : o.type !== ht && (typeof o.children == "string" && o.children.trim() !== "" ? t.push(o.children) : Array.isArray(o.children) && t.push(...Te(o.children))));
  return t;
}
const dn = (e, t) => {
  if (!e)
    return !1;
  const o = Te(e);
  if (o.length !== 1)
    return !1;
  const s = o[0], a = typeof s == "object" && typeof s.type == "object" && "name" in s.type && s.type.name === Z.name, u = typeof s == "object" && s.type === "svg";
  return a || u ? (un(t), !0) : !1;
}, rn = L({
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
      validator: ln
    },
    /**
     * Visual prominence of the button.
     *
     * @values 'normal', 'primary', 'quiet'
     */
    weight: {
      type: String,
      default: "normal",
      validator: an
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
      validator: sn
    }
  },
  emits: ["click"],
  setup(e, { emit: t, slots: o, attrs: s }) {
    const a = f(!1);
    return {
      rootClasses: c(() => {
        var n;
        return {
          [`cdx-button--action-${e.action}`]: !0,
          [`cdx-button--weight-${e.weight}`]: !0,
          [`cdx-button--size-${e.size}`]: !0,
          "cdx-button--framed": e.weight !== "quiet",
          "cdx-button--icon-only": dn((n = o.default) == null ? void 0 : n.call(o), s),
          "cdx-button--is-active": a.value
        };
      }),
      onClick: (n) => {
        t("click", n);
      },
      setActive: (n) => {
        a.value = n;
      }
    };
  }
});
function cn(e, t, o, s, a, u) {
  return d(), h("button", {
    class: V(["cdx-button", e.rootClasses]),
    onClick: t[0] || (t[0] = (...l) => e.onClick && e.onClick(...l)),
    onKeydown: t[1] || (t[1] = Y((l) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = Y((l) => e.setActive(!1), ["space", "enter"]))
  }, [
    k(e.$slots, "default")
  ], 34);
}
const me = /* @__PURE__ */ K(rn, [["render", cn]]);
function ut(e) {
  return e.label === void 0 ? e.value : e.label === null ? "" : e.label;
}
const pn = L({
  name: "CdxButtonGroup",
  components: {
    CdxButton: me,
    CdxIcon: Z
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
      getButtonLabel: ut
    };
  }
});
const fn = { class: "cdx-button-group" };
function mn(e, t, o, s, a, u) {
  const l = x("cdx-icon"), i = x("cdx-button");
  return d(), h("div", fn, [
    (d(!0), h(fe, null, Ce(e.buttons, (n) => (d(), T(i, {
      key: n.value,
      disabled: n.disabled || e.disabled,
      "aria-label": n.ariaLabel,
      onClick: (r) => e.$emit("click", n.value)
    }, {
      default: A(() => [
        k(e.$slots, "default", { button: n }, () => [
          n.icon ? (d(), T(l, {
            key: 0,
            icon: n.icon
          }, null, 8, ["icon"])) : I("", !0),
          le(" " + H(e.getButtonLabel(n)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["disabled", "aria-label", "onClick"]))), 128))
  ]);
}
const Sl = /* @__PURE__ */ K(pn, [["render", mn]]), hn = L({
  name: "CdxThumbnail",
  components: { CdxIcon: Z },
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
    const t = f(!1), o = f({}), s = (a) => {
      const u = a.replace(/([\\"\n])/g, "\\$1"), l = new Image();
      l.onload = () => {
        o.value = { backgroundImage: `url("${u}")` }, t.value = !0;
      }, l.onerror = () => {
        t.value = !1;
      }, l.src = u;
    };
    return ue(() => {
      var a;
      (a = e.thumbnail) != null && a.url && s(e.thumbnail.url);
    }), {
      thumbnailStyle: o,
      thumbnailLoaded: t
    };
  }
});
const vn = { class: "cdx-thumbnail" }, bn = {
  key: 0,
  class: "cdx-thumbnail__placeholder"
};
function gn(e, t, o, s, a, u) {
  const l = x("cdx-icon");
  return d(), h("span", vn, [
    e.thumbnailLoaded ? I("", !0) : (d(), h("span", bn, [
      F(l, {
        icon: e.placeholderIcon,
        class: "cdx-thumbnail__placeholder__icon--vue"
      }, null, 8, ["icon"])
    ])),
    F(Ae, { name: "cdx-thumbnail__image" }, {
      default: A(() => [
        e.thumbnailLoaded ? (d(), h("span", {
          key: 0,
          style: de(e.thumbnailStyle),
          class: "cdx-thumbnail__image"
        }, null, 4)) : I("", !0)
      ]),
      _: 1
    })
  ]);
}
const dt = /* @__PURE__ */ K(hn, [["render", gn]]), yn = L({
  name: "CdxCard",
  components: { CdxIcon: Z, CdxThumbnail: dt },
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
    const t = c(() => !!e.url), o = c(() => t.value ? "a" : "span"), s = c(() => t.value ? e.url : void 0);
    return {
      isLink: t,
      contentTag: o,
      cardLink: s
    };
  }
});
const $n = { class: "cdx-card__text" }, _n = { class: "cdx-card__text__title" }, Cn = {
  key: 0,
  class: "cdx-card__text__description"
}, In = {
  key: 1,
  class: "cdx-card__text__supporting-text"
};
function wn(e, t, o, s, a, u) {
  const l = x("cdx-thumbnail"), i = x("cdx-icon");
  return d(), T(Je(e.contentTag), {
    href: e.cardLink,
    class: V(["cdx-card", {
      "cdx-card--is-link": e.isLink,
      // Include dynamic classes in the template so that $slots is reactive.
      "cdx-card--title-only": !e.$slots.description && !e.$slots["supporting-text"]
    }])
  }, {
    default: A(() => [
      e.thumbnail || e.forceThumbnail ? (d(), T(l, {
        key: 0,
        thumbnail: e.thumbnail,
        "placeholder-icon": e.customPlaceholderIcon,
        class: "cdx-card__thumbnail"
      }, null, 8, ["thumbnail", "placeholder-icon"])) : e.icon ? (d(), T(i, {
        key: 1,
        icon: e.icon,
        class: "cdx-card__icon"
      }, null, 8, ["icon"])) : I("", !0),
      v("span", $n, [
        v("span", _n, [
          k(e.$slots, "title")
        ]),
        e.$slots.description ? (d(), h("span", Cn, [
          k(e.$slots, "description")
        ])) : I("", !0),
        e.$slots["supporting-text"] ? (d(), h("span", In, [
          k(e.$slots, "supporting-text")
        ])) : I("", !0)
      ])
    ]),
    _: 3
  }, 8, ["href", "class"]);
}
const Ml = /* @__PURE__ */ K(yn, [["render", wn]]);
function se(e, t, o) {
  return c({
    get: () => e.value,
    set: (s) => (
      // If eventName is undefined, then 'update:modelValue' must be a valid EventName,
      // but TypeScript's type analysis isn't clever enough to realize that
      t(o || "update:modelValue", s)
    )
  });
}
let Be = 0;
function te(e) {
  const t = bt(), o = (t == null ? void 0 : t.props.id) || (t == null ? void 0 : t.attrs.id);
  return e ? `${Me}-${e}-${Be++}` : o ? `${Me}-${o}-${Be++}` : `${Me}-${Be++}`;
}
const kn = L({
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
    const o = c(() => ({
      "cdx-checkbox--inline": e.inline
    })), s = f(), a = te("checkbox"), u = () => {
      s.value.click();
    }, l = se(G(e, "modelValue"), t);
    return {
      rootClasses: o,
      input: s,
      checkboxId: a,
      clickInput: u,
      wrappedModel: l
    };
  }
});
const xn = ["id", "value", "disabled", ".indeterminate"], Sn = /* @__PURE__ */ v("span", { class: "cdx-checkbox__icon" }, null, -1), Mn = ["for"];
function Bn(e, t, o, s, a, u) {
  return d(), h("span", {
    class: V(["cdx-checkbox", e.rootClasses])
  }, [
    ie(v("input", {
      id: e.checkboxId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (l) => e.wrappedModel = l),
      class: "cdx-checkbox__input",
      type: "checkbox",
      value: e.inputValue,
      disabled: e.disabled,
      ".indeterminate": e.indeterminate,
      onKeydown: t[1] || (t[1] = Y(X((...l) => e.clickInput && e.clickInput(...l), ["prevent"]), ["enter"]))
    }, null, 40, xn), [
      [Xe, e.wrappedModel]
    ]),
    Sn,
    v("label", {
      class: "cdx-checkbox__label",
      for: e.checkboxId
    }, [
      k(e.$slots, "default")
    ], 8, Mn)
  ], 2);
}
const Bl = /* @__PURE__ */ K(kn, [["render", Bn]]), Tn = {
  error: lt,
  warning: nt,
  success: st
}, Vn = L({
  name: "CdxInfoChip",
  components: { CdxIcon: Z },
  props: {
    /**
     * Status type.
     *
     * @values 'notice', 'warning', 'error', 'success'
     */
    status: {
      type: String,
      default: "notice",
      validator: Ye
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
    })), o = c(
      () => e.status === "notice" ? e.icon : Tn[e.status]
    );
    return {
      iconClass: t,
      computedIcon: o
    };
  }
});
const An = { class: "cdx-info-chip" }, Ln = { class: "cdx-info-chip--text" };
function Kn(e, t, o, s, a, u) {
  const l = x("cdx-icon");
  return d(), h("div", An, [
    e.computedIcon ? (d(), T(l, {
      key: 0,
      class: V(["cdx-info-chip__icon", e.iconClass]),
      icon: e.computedIcon
    }, null, 8, ["class", "icon"])) : I("", !0),
    v("span", Ln, [
      k(e.$slots, "default")
    ])
  ]);
}
const Tl = /* @__PURE__ */ K(Vn, [["render", Kn]]);
function rt(e) {
  return e.replace(/([\\{}()|.?*+\-^$[\]])/g, "\\$1");
}
const En = "[̀-ͯ҃-҉֑-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣঁ-ঃ়া-ৄেৈো-্ৗৢৣ৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑੰੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣஂா-ூெ-ைொ-்ௗఀ-ఄా-ౄె-ైొ-్ౕౖౢౣಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣංඃ්ා-ුූෘ-ෟෲෳัิ-ฺ็-๎ັິ-ູົຼ່-ໍ༹༘༙༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏႚ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝᠋-᠍ᢅᢆᢩᤠ-ᤫᤰ-᤻ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼᪰-᪾ᬀ-ᬄ᬴-᭄᭫-᭳ᮀ-ᮂᮡ-ᮭ᯦-᯳ᰤ-᰷᳐-᳔᳒-᳨᳭ᳲ-᳴᳷-᳹᷀-᷹᷻-᷿⃐-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯-꙲ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣠-꣱ꣿꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀ꧥꨩ-ꨶꩃꩌꩍꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭ﬞ︀-️︠-︯]";
function ct(e, t) {
  if (!e)
    return [t, "", ""];
  const o = rt(e), s = new RegExp(
    // Per https://www.regular-expressions.info/unicode.html, "any code point that is not a
    // combining mark can be followed by any number of combining marks." See also the
    // discussion in https://phabricator.wikimedia.org/T35242.
    o + En + "*",
    "i"
  ).exec(t);
  if (!s || s.index === void 0)
    return [t, "", ""];
  const a = s.index, u = a + s[0].length, l = t.slice(a, u), i = t.slice(0, a), n = t.slice(u, t.length);
  return [i, l, n];
}
const Vl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  regExpEscape: rt,
  splitStringAtMatch: ct
}, Symbol.toStringTag, { value: "Module" })), Dn = L({
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
    titleChunks: c(() => ct(e.searchQuery, String(e.title)))
  })
});
const Nn = { class: "cdx-search-result-title" }, Rn = { class: "cdx-search-result-title__match" };
function zn(e, t, o, s, a, u) {
  return d(), h("span", Nn, [
    v("bdi", null, [
      le(H(e.titleChunks[0]), 1),
      v("span", Rn, H(e.titleChunks[1]), 1),
      le(H(e.titleChunks[2]), 1)
    ])
  ]);
}
const Fn = /* @__PURE__ */ K(Dn, [["render", zn]]), qn = L({
  name: "CdxMenuItem",
  components: { CdxIcon: Z, CdxThumbnail: dt, CdxSearchResultTitle: Fn },
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
    const o = () => {
      e.highlighted || t("change", "highlighted", !0);
    }, s = () => {
      t("change", "highlighted", !1);
    }, a = (p) => {
      p.button === 0 && t("change", "active", !0);
    }, u = () => {
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
    })), n = c(() => e.url ? "a" : "span"), r = c(() => e.label || String(e.value));
    return {
      onMouseMove: o,
      onMouseLeave: s,
      onMouseDown: a,
      onClick: u,
      highlightQuery: l,
      rootClasses: i,
      contentTag: n,
      title: r
    };
  }
});
const On = ["id", "aria-disabled", "aria-selected"], Hn = { class: "cdx-menu-item__text" }, Un = ["lang"], jn = ["lang"], Wn = ["lang"], Pn = ["lang"];
function Qn(e, t, o, s, a, u) {
  const l = x("cdx-thumbnail"), i = x("cdx-icon"), n = x("cdx-search-result-title");
  return d(), h("li", {
    id: e.id,
    role: "option",
    class: V(["cdx-menu-item", e.rootClasses]),
    "aria-disabled": e.disabled,
    "aria-selected": e.selected,
    onMousemove: t[0] || (t[0] = (...r) => e.onMouseMove && e.onMouseMove(...r)),
    onMouseleave: t[1] || (t[1] = (...r) => e.onMouseLeave && e.onMouseLeave(...r)),
    onMousedown: t[2] || (t[2] = X((...r) => e.onMouseDown && e.onMouseDown(...r), ["prevent"])),
    onClick: t[3] || (t[3] = (...r) => e.onClick && e.onClick(...r))
  }, [
    k(e.$slots, "default", {}, () => [
      (d(), T(Je(e.contentTag), {
        href: e.url ? e.url : void 0,
        class: "cdx-menu-item__content"
      }, {
        default: A(() => {
          var r, p, _, y, E, M;
          return [
            e.showThumbnail ? (d(), T(l, {
              key: 0,
              thumbnail: e.thumbnail,
              class: "cdx-menu-item__thumbnail"
            }, null, 8, ["thumbnail"])) : e.icon ? (d(), T(i, {
              key: 1,
              icon: e.icon,
              class: "cdx-menu-item__icon"
            }, null, 8, ["icon"])) : I("", !0),
            v("span", Hn, [
              e.highlightQuery ? (d(), T(n, {
                key: 0,
                title: e.title,
                "search-query": e.searchQuery,
                lang: (r = e.language) == null ? void 0 : r.label
              }, null, 8, ["title", "search-query", "lang"])) : (d(), h("span", {
                key: 1,
                class: "cdx-menu-item__text__label",
                lang: (p = e.language) == null ? void 0 : p.label
              }, [
                v("bdi", null, H(e.title), 1)
              ], 8, Un)),
              e.match ? (d(), h(fe, { key: 2 }, [
                le(H(" ") + " "),
                e.highlightQuery ? (d(), T(n, {
                  key: 0,
                  title: e.match,
                  "search-query": e.searchQuery,
                  lang: (_ = e.language) == null ? void 0 : _.match
                }, null, 8, ["title", "search-query", "lang"])) : (d(), h("span", {
                  key: 1,
                  class: "cdx-menu-item__text__match",
                  lang: (y = e.language) == null ? void 0 : y.match
                }, [
                  v("bdi", null, H(e.match), 1)
                ], 8, jn))
              ], 64)) : I("", !0),
              e.supportingText ? (d(), h(fe, { key: 3 }, [
                le(H(" ") + " "),
                v("span", {
                  class: "cdx-menu-item__text__supporting-text",
                  lang: (E = e.language) == null ? void 0 : E.supportingText
                }, [
                  v("bdi", null, H(e.supportingText), 1)
                ], 8, Wn)
              ], 64)) : I("", !0),
              e.description ? (d(), h("span", {
                key: 4,
                class: "cdx-menu-item__text__description",
                lang: (M = e.language) == null ? void 0 : M.description
              }, [
                v("bdi", null, H(e.description), 1)
              ], 8, Pn)) : I("", !0)
            ])
          ];
        }),
        _: 1
      }, 8, ["href"]))
    ])
  ], 42, On);
}
const Gn = /* @__PURE__ */ K(qn, [["render", Qn]]), Zn = L({
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
const Jn = ["aria-disabled"], Xn = /* @__PURE__ */ v("div", { class: "cdx-progress-bar__bar" }, null, -1), Yn = [
  Xn
];
function eo(e, t, o, s, a, u) {
  return d(), h("div", {
    class: V(["cdx-progress-bar", e.rootClasses]),
    role: "progressbar",
    "aria-disabled": e.disabled,
    "aria-valuemin": "0",
    "aria-valuemax": "100"
  }, Yn, 10, Jn);
}
const to = /* @__PURE__ */ K(Zn, [["render", eo]]);
function Ve(e, t) {
  const o = f(!1);
  let s = !1;
  if (typeof window != "object" || !("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype))
    return o;
  const a = new window.IntersectionObserver(
    (u) => {
      const l = u[0];
      l && (o.value = l.isIntersecting);
    },
    t
  );
  return ue(() => {
    s = !0, e.value && a.observe(e.value);
  }), Le(() => {
    s = !1, a.disconnect();
  }), ee(e, (u) => {
    s && (a.disconnect(), o.value = !1, u && a.observe(u));
  }), o;
}
function re(e, t = c(() => ({}))) {
  const o = c(() => {
    const u = $e(t.value, []);
    return e.class && e.class.split(" ").forEach((i) => {
      u[i] = !0;
    }), u;
  }), s = c(() => {
    if ("style" in e)
      return e.style;
  }), a = c(() => {
    const n = e, { class: u, style: l } = n;
    return $e(n, ["class", "style"]);
  });
  return {
    rootClasses: o,
    rootStyle: s,
    otherAttrs: a
  };
}
const no = L({
  name: "CdxMenu",
  components: {
    CdxMenuItem: Gn,
    CdxProgressBar: to
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
  setup(e, { emit: t, slots: o, attrs: s }) {
    const a = c(() => (e.footer && e.menuItems ? [...e.menuItems, e.footer] : e.menuItems).map((S) => xe(ke({}, S), {
      id: te("menu-item")
    }))), u = c(() => o["no-results"] ? e.showNoResultsSlot !== null ? e.showNoResultsSlot : a.value.length === 0 : !1), l = f(null), i = f(!1), n = f(null);
    function r() {
      return a.value.find(
        (b) => b.value === e.selected
      );
    }
    function p(b, S) {
      var R;
      if (!(S && S.disabled))
        switch (b) {
          case "selected":
            t("update:selected", (R = S == null ? void 0 : S.value) != null ? R : null), t("update:expanded", !1), n.value = null;
            break;
          case "highlighted":
            l.value = S || null, i.value = !1;
            break;
          case "highlightedViaKeyboard":
            l.value = S || null, i.value = !0;
            break;
          case "active":
            n.value = S || null;
            break;
        }
    }
    const _ = c(() => {
      if (l.value !== null)
        return a.value.findIndex(
          (b) => (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            b.value === l.value.value
          )
        );
    });
    function y(b) {
      b && (p("highlightedViaKeyboard", b), t("menu-item-keyboard-navigation", b));
    }
    function E(b) {
      var j;
      const S = (he) => {
        for (let $ = he - 1; $ >= 0; $--)
          if (!a.value[$].disabled)
            return a.value[$];
      };
      b = b || a.value.length;
      const R = (j = S(b)) != null ? j : S(a.value.length);
      y(R);
    }
    function M(b) {
      const S = (j) => a.value.find((he, $) => !he.disabled && $ > j);
      b = b != null ? b : -1;
      const R = S(b) || S(-1);
      y(R);
    }
    function W(b, S = !0) {
      function R() {
        t("update:expanded", !0), p("highlighted", r());
      }
      function j() {
        S && (b.preventDefault(), b.stopPropagation());
      }
      switch (b.key) {
        case "Enter":
        case " ":
          return j(), e.expanded ? (l.value && i.value && t("update:selected", l.value.value), t("update:expanded", !1)) : R(), !0;
        case "Tab":
          return e.expanded && (l.value && i.value && t("update:selected", l.value.value), t("update:expanded", !1)), !0;
        case "ArrowUp":
          return j(), e.expanded ? (l.value === null && p("highlightedViaKeyboard", r()), E(_.value)) : R(), q(), !0;
        case "ArrowDown":
          return j(), e.expanded ? (l.value === null && p("highlightedViaKeyboard", r()), M(_.value)) : R(), q(), !0;
        case "Home":
          return j(), e.expanded ? (l.value === null && p("highlightedViaKeyboard", r()), M()) : R(), q(), !0;
        case "End":
          return j(), e.expanded ? (l.value === null && p("highlightedViaKeyboard", r()), E()) : R(), q(), !0;
        case "Escape":
          return j(), t("update:expanded", !1), !0;
        default:
          return !1;
      }
    }
    function C() {
      p("active");
    }
    const z = [], B = f(void 0), N = Ve(
      B,
      { threshold: 0.8 }
    );
    ee(N, (b) => {
      b && t("load-more");
    });
    function Q(b, S) {
      if (b) {
        z[S] = b.$el;
        const R = e.visibleItemLimit;
        if (!R || e.menuItems.length < R)
          return;
        const j = Math.min(
          R,
          Math.max(2, Math.floor(0.2 * e.menuItems.length))
        );
        S === e.menuItems.length - j && (B.value = b.$el);
      }
    }
    function q() {
      if (!e.visibleItemLimit || e.visibleItemLimit > e.menuItems.length || _.value === void 0)
        return;
      const b = _.value >= 0 ? _.value : 0;
      z[b].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
    const U = f(null), w = f(null);
    function g() {
      if (w.value = null, !e.visibleItemLimit || z.length <= e.visibleItemLimit) {
        U.value = null;
        return;
      }
      const b = z[0], S = z[e.visibleItemLimit];
      if (U.value = m(
        b,
        S
      ), e.footer) {
        const R = z[z.length - 1];
        w.value = R.scrollHeight;
      }
    }
    function m(b, S) {
      const R = b.getBoundingClientRect().top;
      return S.getBoundingClientRect().top - R + 2;
    }
    ue(() => {
      document.addEventListener("mouseup", C);
    }), Le(() => {
      document.removeEventListener("mouseup", C);
    }), ee(G(e, "expanded"), (b) => Se(this, null, function* () {
      const S = r();
      !b && l.value && S === void 0 && p("highlighted"), b && S !== void 0 && p("highlighted", S), b && (yield ve(), g(), yield ve(), q());
    })), ee(G(e, "menuItems"), (b) => Se(this, null, function* () {
      b.length < z.length && (z.length = b.length), e.expanded && (yield ve(), g(), yield ve(), q());
    }), { deep: !0 });
    const D = c(() => ({
      "max-height": U.value ? `${U.value}px` : void 0,
      "overflow-y": U.value ? "scroll" : void 0,
      "margin-bottom": w.value ? `${w.value}px` : void 0
    })), O = c(() => ({
      "cdx-menu--has-footer": !!e.footer,
      "cdx-menu--has-sticky-footer": !!e.footer && !!U.value
    })), {
      rootClasses: oe,
      rootStyle: ce,
      otherAttrs: ge
    } = re(s, O);
    return {
      listBoxStyle: D,
      rootClasses: oe,
      rootStyle: ce,
      otherAttrs: ge,
      assignTemplateRef: Q,
      computedMenuItems: a,
      computedShowNoResultsSlot: u,
      highlightedMenuItem: l,
      highlightedViaKeyboard: i,
      activeMenuItem: n,
      handleMenuItemChange: p,
      handleKeyNavigation: W
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
const oo = {
  key: 0,
  class: "cdx-menu__pending cdx-menu-item"
}, lo = {
  key: 1,
  class: "cdx-menu__no-results cdx-menu-item"
};
function ao(e, t, o, s, a, u) {
  const l = x("cdx-menu-item"), i = x("cdx-progress-bar");
  return ie((d(), h("div", {
    class: V(["cdx-menu", e.rootClasses]),
    style: de(e.rootStyle)
  }, [
    v("ul", J({
      class: "cdx-menu__listbox",
      role: "listbox",
      "aria-multiselectable": "false",
      style: e.listBoxStyle
    }, e.otherAttrs), [
      e.showPending && e.computedMenuItems.length === 0 && e.$slots.pending ? (d(), h("li", oo, [
        k(e.$slots, "pending")
      ])) : I("", !0),
      e.computedShowNoResultsSlot ? (d(), h("li", lo, [
        k(e.$slots, "no-results")
      ])) : I("", !0),
      (d(!0), h(fe, null, Ce(e.computedMenuItems, (n, r) => {
        var p, _;
        return d(), T(l, J({
          key: n.value,
          ref_for: !0,
          ref: (y) => e.assignTemplateRef(y, r)
        }, n, {
          selected: n.value === e.selected,
          active: n.value === ((p = e.activeMenuItem) == null ? void 0 : p.value),
          highlighted: n.value === ((_ = e.highlightedMenuItem) == null ? void 0 : _.value),
          "show-thumbnail": e.showThumbnail,
          "bold-label": e.boldLabel,
          "hide-description-overflow": e.hideDescriptionOverflow,
          "search-query": e.searchQuery,
          onChange: (y, E) => e.handleMenuItemChange(y, E && n),
          onClick: (y) => e.$emit("menu-item-click", n)
        }), {
          default: A(() => {
            var y, E;
            return [
              k(e.$slots, "default", {
                menuItem: n,
                active: n.value === ((y = e.activeMenuItem) == null ? void 0 : y.value) && n.value === ((E = e.highlightedMenuItem) == null ? void 0 : E.value)
              })
            ];
          }),
          _: 2
        }, 1040, ["selected", "active", "highlighted", "show-thumbnail", "bold-label", "hide-description-overflow", "search-query", "onChange", "onClick"]);
      }), 128)),
      e.showPending ? (d(), T(i, {
        key: 2,
        class: "cdx-menu__progress-bar",
        inline: !0
      })) : I("", !0)
    ], 16)
  ], 6)), [
    [_e, e.expanded]
  ]);
}
const Ie = /* @__PURE__ */ K(no, [["render", ao]]), so = ne(kt), io = ne(be), uo = L({
  name: "CdxTextInput",
  components: { CdxIcon: Z },
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
      validator: so
    },
    /**
     * `status` attribute of the input.
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: io
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
  setup(e, { emit: t, attrs: o }) {
    const s = se(G(e, "modelValue"), t), a = c(() => e.clearable && !!s.value && !e.disabled), u = c(() => ({
      "cdx-text-input--has-start-icon": !!e.startIcon,
      "cdx-text-input--has-end-icon": !!e.endIcon,
      "cdx-text-input--clearable": a.value,
      [`cdx-text-input--status-${e.status}`]: !0
    })), {
      rootClasses: l,
      rootStyle: i,
      otherAttrs: n
    } = re(o, u), r = c(() => ({
      "cdx-text-input__input--has-value": !!s.value
    }));
    return {
      wrappedModel: s,
      isClearable: a,
      rootClasses: l,
      rootStyle: i,
      otherAttrs: n,
      inputClasses: r,
      onClear: (C) => {
        s.value = "", t("clear", C);
      },
      onInput: (C) => {
        t("input", C);
      },
      onChange: (C) => {
        t("change", C);
      },
      onKeydown: (C) => {
        (C.key === "Home" || C.key === "End") && !C.ctrlKey && !C.metaKey || t("keydown", C);
      },
      onFocus: (C) => {
        t("focus", C);
      },
      onBlur: (C) => {
        t("blur", C);
      },
      cdxIconClear: Ot
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
const ro = ["type", "disabled"];
function co(e, t, o, s, a, u) {
  const l = x("cdx-icon");
  return d(), h("div", {
    class: V(["cdx-text-input", e.rootClasses]),
    style: de(e.rootStyle)
  }, [
    ie(v("input", J({
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
    }), null, 16, ro), [
      [gt, e.wrappedModel]
    ]),
    e.startIcon ? (d(), T(l, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__start-icon"
    }, null, 8, ["icon"])) : I("", !0),
    e.endIcon ? (d(), T(l, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__end-icon"
    }, null, 8, ["icon"])) : I("", !0),
    e.isClearable ? (d(), T(l, {
      key: 2,
      icon: e.cdxIconClear,
      class: "cdx-text-input__icon-vue cdx-text-input__clear-icon",
      onMousedown: t[6] || (t[6] = X(() => {
      }, ["prevent"])),
      onClick: e.onClear
    }, null, 8, ["icon", "onClick"])) : I("", !0)
  ], 6);
}
const Ee = /* @__PURE__ */ K(uo, [["render", co]]);
function we(e) {
  const t = f(
    { width: void 0, height: void 0 }
  );
  if (typeof window != "object" || !("ResizeObserver" in window) || !("ResizeObserverEntry" in window))
    return t;
  const o = new window.ResizeObserver(
    (a) => {
      const u = a[0];
      u && (t.value = {
        width: u.borderBoxSize[0].inlineSize,
        height: u.borderBoxSize[0].blockSize
      });
    }
  );
  let s = !1;
  return ue(() => {
    s = !0, e.value && o.observe(e.value);
  }), Le(() => {
    s = !1, o.disconnect();
  }), ee(e, (a) => {
    s && (o.disconnect(), t.value = {
      width: void 0,
      height: void 0
    }, a && o.observe(a));
  }), t;
}
const po = ne(be), De = L({
  name: "CdxCombobox",
  components: {
    CdxButton: me,
    CdxIcon: Z,
    CdxMenu: Ie,
    CdxTextInput: Ee
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
      validator: po
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
  setup(e, { emit: t, attrs: o, slots: s }) {
    const a = f(), u = f(), l = f(), i = te("combobox"), n = G(e, "selected"), r = se(n, t, "update:selected"), p = f(!1), _ = f(!1), y = c(() => {
      var g, m;
      return (m = (g = l.value) == null ? void 0 : g.getHighlightedMenuItem()) == null ? void 0 : m.id;
    }), E = c(() => ({
      "cdx-combobox--expanded": p.value,
      "cdx-combobox--disabled": e.disabled
    })), M = we(u), W = c(() => {
      var g;
      return `${(g = M.value.width) != null ? g : 0}px`;
    }), {
      rootClasses: C,
      rootStyle: z,
      otherAttrs: B
    } = re(o, E);
    function N(g) {
      _.value && p.value ? p.value = !1 : (e.menuItems.length > 0 || s["no-results"]) && (p.value = !0), t("focus", g);
    }
    function Q(g) {
      p.value = _.value && p.value, t("blur", g);
    }
    function q() {
      e.disabled || (_.value = !0);
    }
    function U() {
      var g;
      e.disabled || (g = a.value) == null || g.focus();
    }
    function w(g) {
      !l.value || e.disabled || e.menuItems.length === 0 || g.key === " " || l.value.delegateKeyNavigation(g);
    }
    return ee(p, () => {
      _.value = !1;
    }), {
      input: a,
      inputWrapper: u,
      currentWidthInPx: W,
      menu: l,
      menuId: i,
      modelWrapper: r,
      expanded: p,
      highlightedId: y,
      onInputFocus: N,
      onInputBlur: Q,
      onKeydown: w,
      onButtonClick: U,
      onButtonMousedown: q,
      cdxIconExpand: at,
      rootClasses: C,
      rootStyle: z,
      otherAttrs: B
    };
  }
}), je = () => {
  Ke((e) => ({
    "549e358a": e.currentWidthInPx
  }));
}, We = De.setup;
De.setup = We ? (e, t) => (je(), We(e, t)) : je;
const fo = {
  ref: "inputWrapper",
  class: "cdx-combobox__input-wrapper"
};
function mo(e, t, o, s, a, u) {
  const l = x("cdx-text-input"), i = x("cdx-icon"), n = x("cdx-button"), r = x("cdx-menu");
  return d(), h("div", {
    class: V(["cdx-combobox", e.rootClasses]),
    style: de(e.rootStyle)
  }, [
    v("div", fo, [
      F(l, J({
        ref: "input",
        modelValue: e.modelWrapper,
        "onUpdate:modelValue": t[0] || (t[0] = (p) => e.modelWrapper = p)
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
        onInput: t[1] || (t[1] = (p) => e.$emit("input", p)),
        onChange: t[2] || (t[2] = (p) => e.$emit("change", p)),
        onFocus: e.onInputFocus,
        onBlur: e.onInputBlur
      }), null, 16, ["modelValue", "aria-activedescendant", "aria-expanded", "aria-controls", "aria-owns", "disabled", "status", "onKeydown", "onFocus", "onBlur"]),
      F(n, {
        class: "cdx-combobox__expand-button",
        "aria-hidden": "true",
        disabled: e.disabled,
        tabindex: "-1",
        type: "button",
        onMousedown: e.onButtonMousedown,
        onClick: e.onButtonClick
      }, {
        default: A(() => [
          F(i, {
            class: "cdx-combobox__expand-icon",
            icon: e.cdxIconExpand
          }, null, 8, ["icon"])
        ]),
        _: 1
      }, 8, ["disabled", "onMousedown", "onClick"])
    ], 512),
    F(r, J({
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
      default: A(({ menuItem: p }) => [
        k(e.$slots, "menu-item", { menuItem: p })
      ]),
      "no-results": A(() => [
        k(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const Al = /* @__PURE__ */ K(De, [["render", mo]]), ho = L({
  name: "CdxDialog",
  components: {
    CdxButton: me,
    CdxIcon: Z
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
    const o = te("dialog-label"), s = f(), a = f(), u = f(), l = f(), i = f(), n = c(() => !e.hideTitle || !!e.closeButtonLabel), r = c(() => !!e.primaryAction || !!e.defaultAction), p = we(a), _ = c(() => {
      var N;
      return (N = p.value.height) != null ? N : 0;
    }), y = f(!1), E = c(() => ({
      "cdx-dialog--vertical-actions": e.stackedActions,
      "cdx-dialog--horizontal-actions": !e.stackedActions,
      "cdx-dialog--dividers": y.value
    })), M = f(0);
    function W() {
      t("update:open", !1);
    }
    function C() {
      B(s.value);
    }
    function z() {
      B(s.value, !0);
    }
    function B(N, Q = !1) {
      let q = Array.from(
        N.querySelectorAll(`
					input, select, textarea, button, object, a, area,
					[contenteditable], [tabindex]:not([tabindex^="-"])
				`)
      );
      Q && (q = q.reverse());
      for (const U of q)
        if (U.focus(), document.activeElement === U)
          return !0;
      return !1;
    }
    return ee(G(e, "open"), (N) => {
      N ? (M.value = window.innerWidth - document.documentElement.clientWidth, document.documentElement.style.setProperty("margin-right", `${M.value}px`), document.body.classList.add("cdx-dialog-open"), ve(() => {
        var Q;
        B(a.value) || (Q = u.value) == null || Q.focus();
      })) : (document.body.classList.remove("cdx-dialog-open"), document.documentElement.style.removeProperty("margin-right"));
    }), ee(_, () => {
      a.value && (y.value = a.value.clientHeight < a.value.scrollHeight);
    }), {
      close: W,
      cdxIconClose: ot,
      labelId: o,
      rootClasses: E,
      dialogElement: s,
      focusTrapStart: l,
      focusTrapEnd: i,
      focusFirst: C,
      focusLast: z,
      dialogBody: a,
      focusHolder: u,
      showHeader: n,
      showFooterActions: r
    };
  }
});
const vo = ["aria-label", "aria-labelledby"], bo = {
  key: 0,
  class: "cdx-dialog__header__title-group"
}, go = ["id"], yo = {
  key: 0,
  class: "cdx-dialog__header__subtitle"
}, $o = {
  ref: "focusHolder",
  class: "cdx-dialog-focus-trap",
  tabindex: "-1"
}, _o = {
  key: 0,
  class: "cdx-dialog__footer__text"
}, Co = {
  key: 1,
  class: "cdx-dialog__footer__actions"
};
function Io(e, t, o, s, a, u) {
  const l = x("cdx-icon"), i = x("cdx-button");
  return d(), T(Ae, {
    name: "cdx-dialog-fade",
    appear: ""
  }, {
    default: A(() => [
      e.open ? (d(), h("div", {
        key: 0,
        class: "cdx-dialog-backdrop",
        onClick: t[5] || (t[5] = (...n) => e.close && e.close(...n)),
        onKeyup: t[6] || (t[6] = Y((...n) => e.close && e.close(...n), ["escape"]))
      }, [
        v("div", {
          ref: "focusTrapStart",
          tabindex: "0",
          onFocus: t[0] || (t[0] = (...n) => e.focusLast && e.focusLast(...n))
        }, null, 544),
        v("div", J({
          ref: "dialogElement",
          class: ["cdx-dialog", xe(ke({}, e.rootClasses), {
            "cdx-dialog--has-custom-header": e.$slots.header,
            "cdx-dialog--has-custom-footer": e.$slots.footer
          })],
          role: "dialog"
        }, e.$attrs, {
          "aria-label": e.$slots.header || e.hideTitle ? e.title : void 0,
          "aria-labelledby": !e.$slots.header && !e.hideTitle ? e.labelId : void 0,
          onClick: t[3] || (t[3] = X(() => {
          }, ["stop"]))
        }), [
          e.showHeader || e.$slots.header ? (d(), h("header", {
            key: 0,
            class: V(["cdx-dialog__header", { "cdx-dialog__header--default": !e.$slots.header }])
          }, [
            k(e.$slots, "header", {}, () => [
              e.hideTitle ? I("", !0) : (d(), h("div", bo, [
                v("h2", {
                  id: e.labelId,
                  class: "cdx-dialog__header__title"
                }, H(e.title), 9, go),
                e.subtitle ? (d(), h("p", yo, H(e.subtitle), 1)) : I("", !0)
              ])),
              e.closeButtonLabel ? (d(), T(i, {
                key: 1,
                class: "cdx-dialog__header__close-button",
                weight: "quiet",
                type: "button",
                "aria-label": e.closeButtonLabel,
                onClick: e.close
              }, {
                default: A(() => [
                  F(l, {
                    icon: e.cdxIconClose,
                    "icon-label": e.closeButtonLabel
                  }, null, 8, ["icon", "icon-label"])
                ]),
                _: 1
              }, 8, ["aria-label", "onClick"])) : I("", !0)
            ])
          ], 2)) : I("", !0),
          v("div", $o, null, 512),
          v("div", {
            ref: "dialogBody",
            class: V(["cdx-dialog__body", {
              "cdx-dialog__body--no-header": !(e.showHeader || e.$slots.header),
              "cdx-dialog__body--no-footer": !(e.showFooterActions || e.$slots.footer || e.$slots["footer-text"])
            }])
          }, [
            k(e.$slots, "default")
          ], 2),
          e.showFooterActions || e.$slots.footer || e.$slots["footer-text"] ? (d(), h("footer", {
            key: 1,
            class: V(["cdx-dialog__footer", { "cdx-dialog__footer--default": !e.$slots.footer }])
          }, [
            k(e.$slots, "footer", {}, () => [
              e.$slots["footer-text"] ? (d(), h("p", _o, [
                k(e.$slots, "footer-text")
              ])) : I("", !0),
              e.showFooterActions ? (d(), h("div", Co, [
                e.primaryAction ? (d(), T(i, {
                  key: 0,
                  class: "cdx-dialog__footer__primary-action",
                  weight: "primary",
                  action: e.primaryAction.actionType,
                  disabled: e.primaryAction.disabled,
                  onClick: t[1] || (t[1] = (n) => e.$emit("primary"))
                }, {
                  default: A(() => [
                    le(H(e.primaryAction.label), 1)
                  ]),
                  _: 1
                }, 8, ["action", "disabled"])) : I("", !0),
                e.defaultAction ? (d(), T(i, {
                  key: 1,
                  class: "cdx-dialog__footer__default-action",
                  disabled: e.defaultAction.disabled,
                  onClick: t[2] || (t[2] = (n) => e.$emit("default"))
                }, {
                  default: A(() => [
                    le(H(e.defaultAction.label), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])) : I("", !0)
              ])) : I("", !0)
            ])
          ], 2)) : I("", !0)
        ], 16, vo),
        v("div", {
          ref: "focusTrapEnd",
          tabindex: "0",
          onFocus: t[4] || (t[4] = (...n) => e.focusFirst && e.focusFirst(...n))
        }, null, 544)
      ], 32)) : I("", !0)
    ]),
    _: 3
  });
}
const Ll = /* @__PURE__ */ K(ho, [["render", Io]]), wo = ne(be), Ne = L({
  name: "CdxLookup",
  components: {
    CdxMenu: Ie,
    CdxTextInput: Ee
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
      validator: wo
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
  setup: (e, { emit: t, attrs: o, slots: s }) => {
    const a = f(), u = f(), l = te("lookup-menu"), i = f(!1), n = f(!1), r = f(!1), p = G(e, "selected"), _ = se(p, t, "update:selected"), y = c(
      () => e.menuItems.find((m) => m.value === e.selected)
    ), E = c(() => {
      var m, D;
      return (D = (m = u.value) == null ? void 0 : m.getHighlightedMenuItem()) == null ? void 0 : D.id;
    }), M = f(e.initialInputValue), W = we(a), C = c(() => {
      var m;
      return `${(m = W.value.width) != null ? m : 0}px`;
    }), z = c(() => ({
      "cdx-lookup--disabled": e.disabled,
      "cdx-lookup--pending": i.value
    })), {
      rootClasses: B,
      rootStyle: N,
      otherAttrs: Q
    } = re(o, z);
    function q(m) {
      y.value && y.value.label !== m && y.value.value !== m && (_.value = null), m === "" ? (n.value = !1, i.value = !1) : i.value = !0, t("input", m);
    }
    function U(m) {
      r.value = !0, // Input value is not null or an empty string.
      M.value !== null && M.value !== "" && // There's either menu items to show or a no results message.
      (e.menuItems.length > 0 || s["no-results"]) && (n.value = !0), t("focus", m);
    }
    function w(m) {
      r.value = !1, n.value = !1, t("blur", m);
    }
    function g(m) {
      !u.value || e.disabled || e.menuItems.length === 0 && !s["no-results"] || m.key === " " || u.value.delegateKeyNavigation(m);
    }
    return ee(p, (m) => {
      if (m !== null) {
        const D = y.value ? y.value.label || y.value.value : "";
        M.value !== D && (M.value = D, t("input", M.value));
      }
    }), ee(G(e, "menuItems"), (m) => {
      // Only show the menu if we were in the pending state (meaning this menuItems change
      // was in response to user input) and the menu is still focused
      r.value && i.value && // Show the menu if there are either menu items or no-results content to show
      (m.length > 0 || s["no-results"]) && (n.value = !0), m.length === 0 && !s["no-results"] && (n.value = !1), i.value = !1;
    }), {
      rootElement: a,
      currentWidthInPx: C,
      menu: u,
      menuId: l,
      highlightedId: E,
      inputValue: M,
      modelWrapper: _,
      expanded: n,
      onInputBlur: w,
      rootClasses: B,
      rootStyle: N,
      otherAttrs: Q,
      onUpdateInput: q,
      onInputFocus: U,
      onKeydown: g
    };
  }
}), Pe = () => {
  Ke((e) => ({
    "72cb5723": e.currentWidthInPx
  }));
}, Qe = Ne.setup;
Ne.setup = Qe ? (e, t) => (Pe(), Qe(e, t)) : Pe;
function ko(e, t, o, s, a, u) {
  const l = x("cdx-text-input"), i = x("cdx-menu");
  return d(), h("div", {
    ref: "rootElement",
    class: V(["cdx-lookup", e.rootClasses]),
    style: de(e.rootStyle)
  }, [
    F(l, J({
      modelValue: e.inputValue,
      "onUpdate:modelValue": t[0] || (t[0] = (n) => e.inputValue = n)
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
      onChange: t[1] || (t[1] = (n) => e.$emit("change", n)),
      onFocus: e.onInputFocus,
      onBlur: e.onInputBlur,
      onKeydown: e.onKeydown
    }), null, 16, ["modelValue", "aria-controls", "aria-owns", "aria-expanded", "aria-activedescendant", "disabled", "status", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
    F(i, J({
      id: e.menuId,
      ref: "menu",
      selected: e.modelWrapper,
      "onUpdate:selected": t[2] || (t[2] = (n) => e.modelWrapper = n),
      expanded: e.expanded,
      "onUpdate:expanded": t[3] || (t[3] = (n) => e.expanded = n),
      "menu-items": e.menuItems
    }, e.menuConfig, {
      onLoadMore: t[4] || (t[4] = (n) => e.$emit("load-more"))
    }), {
      default: A(({ menuItem: n }) => [
        k(e.$slots, "menu-item", { menuItem: n })
      ]),
      "no-results": A(() => [
        k(e.$slots, "no-results")
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 6);
}
const Kl = /* @__PURE__ */ K(Ne, [["render", ko]]), xo = {
  notice: Ut,
  error: lt,
  warning: nt,
  success: st
}, So = L({
  name: "CdxMessage",
  components: { CdxButton: me, CdxIcon: Z },
  props: {
    /**
     * Status type of Message.
     *
     * @values 'notice', 'warning', 'error', 'success'
     */
    type: {
      type: String,
      default: "notice",
      validator: Ye
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
    const o = f(!1), s = c(
      () => e.inline === !1 && e.dismissButtonLabel.length > 0
    ), a = c(() => e.autoDismiss === !1 ? !1 : e.autoDismiss === !0 ? 4e3 : e.autoDismiss), u = c(() => ({
      "cdx-message--inline": e.inline,
      "cdx-message--block": !e.inline,
      "cdx-message--user-dismissable": s.value,
      [`cdx-message--${e.type}`]: !0
    })), l = c(
      () => e.icon && e.type === "notice" ? e.icon : xo[e.type]
    ), i = f("");
    function n(r) {
      o.value || (i.value = r === "user-dismissed" ? "cdx-message-leave-active-user" : "cdx-message-leave-active-system", o.value = !0, t(r));
    }
    return ue(() => {
      a.value && setTimeout(() => n("auto-dismissed"), a.value);
    }), {
      dismissed: o,
      userDismissable: s,
      rootClasses: u,
      leaveActiveClass: i,
      computedIcon: l,
      onDismiss: n,
      cdxIconClose: ot
    };
  }
});
const Mo = ["aria-live", "role"], Bo = { class: "cdx-message__content" };
function To(e, t, o, s, a, u) {
  const l = x("cdx-icon"), i = x("cdx-button");
  return d(), T(Ae, {
    name: "cdx-message",
    appear: e.fadeIn,
    "leave-active-class": e.leaveActiveClass
  }, {
    default: A(() => [
      e.dismissed ? I("", !0) : (d(), h("div", {
        key: 0,
        class: V(["cdx-message", e.rootClasses]),
        "aria-live": e.type !== "error" ? "polite" : void 0,
        role: e.type === "error" ? "alert" : void 0
      }, [
        F(l, {
          class: "cdx-message__icon--vue",
          icon: e.computedIcon
        }, null, 8, ["icon"]),
        v("div", Bo, [
          k(e.$slots, "default")
        ]),
        e.userDismissable ? (d(), T(i, {
          key: 0,
          class: "cdx-message__dismiss-button",
          weight: "quiet",
          type: "button",
          "aria-label": e.dismissButtonLabel,
          onClick: t[0] || (t[0] = (n) => e.onDismiss("user-dismissed"))
        }, {
          default: A(() => [
            F(l, {
              icon: e.cdxIconClose,
              "icon-label": e.dismissButtonLabel
            }, null, 8, ["icon", "icon-label"])
          ]),
          _: 1
        }, 8, ["aria-label"])) : I("", !0)
      ], 10, Mo))
    ]),
    _: 3
  }, 8, ["appear", "leave-active-class"]);
}
const El = /* @__PURE__ */ K(So, [["render", To]]), Vo = L({
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
    const o = c(() => ({
      "cdx-radio--inline": e.inline
    })), s = f(), a = te("radio"), u = () => {
      s.value.focus();
    }, l = se(G(e, "modelValue"), t);
    return {
      rootClasses: o,
      input: s,
      radioId: a,
      focusInput: u,
      wrappedModel: l
    };
  }
});
const Ao = ["id", "name", "value", "disabled"], Lo = /* @__PURE__ */ v("span", { class: "cdx-radio__icon" }, null, -1), Ko = ["for"];
function Eo(e, t, o, s, a, u) {
  return d(), h("span", {
    class: V(["cdx-radio", e.rootClasses])
  }, [
    ie(v("input", {
      id: e.radioId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (l) => e.wrappedModel = l),
      class: "cdx-radio__input",
      type: "radio",
      name: e.name,
      value: e.inputValue,
      disabled: e.disabled
    }, null, 8, Ao), [
      [yt, e.wrappedModel]
    ]),
    Lo,
    v("label", {
      class: "cdx-radio__label",
      for: e.radioId,
      onClick: t[1] || (t[1] = (...l) => e.focusInput && e.focusInput(...l))
    }, [
      k(e.$slots, "default")
    ], 8, Ko)
  ], 2);
}
const Dl = /* @__PURE__ */ K(Vo, [["render", Eo]]), Do = ne(be), No = L({
  name: "CdxSearchInput",
  components: {
    CdxButton: me,
    CdxTextInput: Ee
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
     * `status` property of the TextInput component
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: Do
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
  setup(e, { emit: t, attrs: o }) {
    const s = se(G(e, "modelValue"), t), a = c(() => ({
      "cdx-search-input--has-end-button": !!e.buttonLabel
    })), {
      rootClasses: u,
      rootStyle: l,
      otherAttrs: i
    } = re(o, a);
    return {
      wrappedModel: s,
      rootClasses: u,
      rootStyle: l,
      otherAttrs: i,
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
const Ro = { class: "cdx-search-input__input-wrapper" };
function zo(e, t, o, s, a, u) {
  const l = x("cdx-text-input"), i = x("cdx-button");
  return d(), h("div", {
    class: V(["cdx-search-input", e.rootClasses]),
    style: de(e.rootStyle)
  }, [
    v("div", Ro, [
      F(l, J({
        ref: "textInput",
        modelValue: e.wrappedModel,
        "onUpdate:modelValue": t[0] || (t[0] = (n) => e.wrappedModel = n),
        class: "cdx-search-input__text-input",
        "input-type": "search",
        "start-icon": e.searchIcon,
        status: e.status
      }, e.otherAttrs, {
        onKeydown: Y(e.handleSubmit, ["enter"]),
        onInput: t[1] || (t[1] = (n) => e.$emit("input", n)),
        onChange: t[2] || (t[2] = (n) => e.$emit("change", n)),
        onFocus: t[3] || (t[3] = (n) => e.$emit("focus", n)),
        onBlur: t[4] || (t[4] = (n) => e.$emit("blur", n))
      }), null, 16, ["modelValue", "start-icon", "status", "onKeydown"]),
      k(e.$slots, "default")
    ]),
    e.buttonLabel ? (d(), T(i, {
      key: 0,
      class: "cdx-search-input__end-button",
      onClick: e.handleSubmit
    }, {
      default: A(() => [
        le(H(e.buttonLabel), 1)
      ]),
      _: 1
    }, 8, ["onClick"])) : I("", !0)
  ], 6);
}
const Fo = /* @__PURE__ */ K(No, [["render", zo]]), qo = ne(be), Re = L({
  name: "CdxSelect",
  components: {
    CdxIcon: Z,
    CdxMenu: Ie
  },
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
      validator: qo
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
  setup(e, { emit: t }) {
    const o = f(), s = f(), a = te("select-handle"), u = te("select-menu"), l = f(!1), i = se(G(e, "selected"), t, "update:selected"), n = c(
      () => e.menuItems.find((B) => B.value === e.selected)
    ), r = c(() => n.value ? n.value.label || n.value.value : e.defaultLabel), p = we(o), _ = c(() => {
      var B;
      return `${(B = p.value.width) != null ? B : 0}px`;
    }), y = c(() => {
      if (e.defaultIcon && !n.value)
        return e.defaultIcon;
      if (n.value && n.value.icon)
        return n.value.icon;
    }), E = c(() => ({
      "cdx-select-vue--enabled": !e.disabled,
      "cdx-select-vue--disabled": e.disabled,
      "cdx-select-vue--expanded": l.value,
      "cdx-select-vue--value-selected": !!n.value,
      "cdx-select-vue--no-selections": !n.value,
      "cdx-select-vue--has-start-icon": !!y.value,
      [`cdx-select-vue--status-${e.status}`]: !0
    })), M = c(() => {
      var B, N;
      return (N = (B = s.value) == null ? void 0 : B.getHighlightedMenuItem()) == null ? void 0 : N.id;
    });
    function W() {
      l.value = !1;
    }
    function C() {
      var B;
      e.disabled || (l.value = !l.value, (B = o.value) == null || B.focus());
    }
    function z(B) {
      var N;
      e.disabled || (N = s.value) == null || N.delegateKeyNavigation(B);
    }
    return {
      handle: o,
      handleId: a,
      menu: s,
      menuId: u,
      modelWrapper: i,
      selectedMenuItem: n,
      highlightedId: M,
      expanded: l,
      onBlur: W,
      currentLabel: r,
      currentWidthInPx: _,
      rootClasses: E,
      onClick: C,
      onKeydown: z,
      startIcon: y,
      cdxIconExpand: at
    };
  }
}), Ge = () => {
  Ke((e) => ({
    "241028b2": e.currentWidthInPx
  }));
}, Ze = Re.setup;
Re.setup = Ze ? (e, t) => (Ge(), Ze(e, t)) : Ge;
const Oo = ["aria-disabled"], Ho = ["aria-owns", "aria-labelledby", "aria-activedescendant", "aria-expanded"], Uo = ["id"];
function jo(e, t, o, s, a, u) {
  const l = x("cdx-icon"), i = x("cdx-menu");
  return d(), h("div", {
    class: V(["cdx-select-vue", e.rootClasses]),
    "aria-disabled": e.disabled
  }, [
    v("div", {
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
      onClick: t[0] || (t[0] = (...n) => e.onClick && e.onClick(...n)),
      onBlur: t[1] || (t[1] = (...n) => e.onBlur && e.onBlur(...n)),
      onKeydown: t[2] || (t[2] = (...n) => e.onKeydown && e.onKeydown(...n))
    }, [
      v("span", {
        id: e.handleId,
        role: "textbox",
        "aria-readonly": "true"
      }, [
        k(e.$slots, "label", {
          selectedMenuItem: e.selectedMenuItem,
          defaultLabel: e.defaultLabel
        }, () => [
          le(H(e.currentLabel), 1)
        ])
      ], 8, Uo),
      e.startIcon ? (d(), T(l, {
        key: 0,
        icon: e.startIcon,
        class: "cdx-select-vue__start-icon"
      }, null, 8, ["icon"])) : I("", !0),
      F(l, {
        icon: e.cdxIconExpand,
        class: "cdx-select-vue__indicator"
      }, null, 8, ["icon"])
    ], 40, Ho),
    F(i, J({
      id: e.menuId,
      ref: "menu",
      selected: e.modelWrapper,
      "onUpdate:selected": t[3] || (t[3] = (n) => e.modelWrapper = n),
      expanded: e.expanded,
      "onUpdate:expanded": t[4] || (t[4] = (n) => e.expanded = n),
      "menu-items": e.menuItems
    }, e.menuConfig, {
      onLoadMore: t[5] || (t[5] = (n) => e.$emit("load-more"))
    }), {
      default: A(({ menuItem: n }) => [
        k(e.$slots, "menu-item", { menuItem: n })
      ]),
      _: 3
    }, 16, ["id", "selected", "expanded", "menu-items"])
  ], 10, Oo);
}
const Nl = /* @__PURE__ */ K(Re, [["render", jo]]), Wo = L({
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
    const t = He(et), o = He(tt);
    if (!t || !o)
      throw new Error("Tab component must be used inside a Tabs component");
    const s = t.value.get(e.name) || {}, a = c(() => e.name === o.value);
    return {
      tab: s,
      isActive: a
    };
  }
});
const Po = ["id", "aria-hidden", "aria-labelledby"];
function Qo(e, t, o, s, a, u) {
  return ie((d(), h("section", {
    id: e.tab.id,
    "aria-hidden": e.isActive ? void 0 : !0,
    "aria-labelledby": `${e.tab.id}-label`,
    class: "cdx-tab",
    role: "tabpanel",
    tabindex: "-1"
  }, [
    k(e.$slots, "default")
  ], 8, Po)), [
    [_e, e.isActive]
  ]);
}
const Rl = /* @__PURE__ */ K(Wo, [["render", Qo]]), Go = L({
  name: "CdxTabs",
  components: {
    CdxButton: me,
    CdxIcon: Z
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
  setup(e, { slots: t, emit: o }) {
    const s = f(), a = f(), u = f(), l = f(), i = f(), n = it(s), r = c(() => {
      var D;
      const w = [], g = (D = t.default) == null ? void 0 : D.call(t);
      g && g.forEach(m);
      function m(O) {
        O && typeof O == "object" && "type" in O && (typeof O.type == "object" && "name" in O.type && O.type.name === "CdxTab" ? w.push(O) : "children" in O && Array.isArray(O.children) && O.children.forEach(m));
      }
      return w;
    });
    if (!r.value || r.value.length === 0)
      throw new Error("Slot content cannot be empty");
    const p = c(() => r.value.reduce((w, g) => {
      var m;
      if ((m = g.props) != null && m.name && typeof g.props.name == "string") {
        if (w.get(g.props.name))
          throw new Error("Tab names must be unique");
        w.set(g.props.name, {
          name: g.props.name,
          id: te(g.props.name),
          label: g.props.label || g.props.name,
          disabled: g.props.disabled
        });
      }
      return w;
    }, /* @__PURE__ */ new Map())), _ = se(G(e, "active"), o, "update:active"), y = c(() => Array.from(p.value.keys())), E = c(() => y.value.indexOf(_.value)), M = c(() => {
      var w;
      return (w = p.value.get(_.value)) == null ? void 0 : w.id;
    });
    Ue(tt, _), Ue(et, p);
    const W = f(), C = f(), z = Ve(W, { threshold: 0.95 }), B = Ve(C, { threshold: 0.95 });
    function N(w, g) {
      const m = w;
      m && (g === 0 ? W.value = m : g === y.value.length - 1 && (C.value = m));
    }
    const Q = c(() => ({
      "cdx-tabs--framed": e.framed,
      "cdx-tabs--quiet": !e.framed
    }));
    function q(w) {
      if (!a.value || !l.value || !i.value)
        return 0;
      const g = n.value === "rtl" ? i.value : l.value, m = n.value === "rtl" ? l.value : i.value, D = w.offsetLeft, O = D + w.clientWidth, oe = a.value.scrollLeft + g.clientWidth, ce = a.value.scrollLeft + a.value.clientWidth - m.clientWidth;
      return D < oe ? D - oe : O > ce ? O - ce : 0;
    }
    function U(w) {
      var O;
      if (!a.value || !l.value || !i.value)
        return;
      const g = w === "next" && n.value === "ltr" || w === "prev" && n.value === "rtl" ? 1 : -1;
      let m = 0, D = w === "next" ? a.value.firstElementChild : a.value.lastElementChild;
      for (; D; ) {
        const oe = w === "next" ? D.nextElementSibling : D.previousElementSibling;
        if (m = q(D), Math.sign(m) === g) {
          oe && Math.abs(m) < 0.25 * a.value.clientWidth && (m = q(oe));
          break;
        }
        D = oe;
      }
      a.value.scrollBy({
        left: m,
        behavior: "smooth"
      }), (O = u.value) == null || O.focus();
    }
    return ee(_, () => {
      if (M.value === void 0 || !a.value || !l.value || !i.value)
        return;
      const w = document.getElementById(`${M.value}-label`);
      w && a.value.scrollBy({
        left: q(w),
        behavior: "smooth"
      });
    }), {
      activeTab: _,
      activeTabIndex: E,
      activeTabId: M,
      currentDirection: n,
      rootElement: s,
      listElement: a,
      focusHolder: u,
      prevScroller: l,
      nextScroller: i,
      rootClasses: Q,
      tabNames: y,
      tabsData: p,
      firstLabelVisible: z,
      lastLabelVisible: B,
      assignTemplateRefIfNecessary: N,
      scrollTabs: U,
      cdxIconPrevious: Wt,
      cdxIconNext: jt
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
      const o = this.tabsData.get(this.tabNames[e + t]);
      o && (o.disabled ? this.selectNonDisabled(e + t, t) : this.select(o.name));
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
const Zo = {
  ref: "focusHolder",
  tabindex: "-1"
}, Jo = {
  ref: "prevScroller",
  class: "cdx-tabs__prev-scroller"
}, Xo = ["aria-activedescendant"], Yo = ["id"], el = ["href", "aria-disabled", "aria-selected", "onClick", "onKeyup"], tl = {
  ref: "nextScroller",
  class: "cdx-tabs__next-scroller"
}, nl = { class: "cdx-tabs__content" };
function ol(e, t, o, s, a, u) {
  const l = x("cdx-icon"), i = x("cdx-button");
  return d(), h("div", {
    ref: "rootElement",
    class: V(["cdx-tabs", e.rootClasses])
  }, [
    v("div", {
      class: "cdx-tabs__header",
      tabindex: "0",
      onKeydown: [
        t[4] || (t[4] = Y(X((...n) => e.onRightArrowKeypress && e.onRightArrowKeypress(...n), ["prevent"]), ["right"])),
        t[5] || (t[5] = Y(X((...n) => e.onDownArrowKeypress && e.onDownArrowKeypress(...n), ["prevent"]), ["down"])),
        t[6] || (t[6] = Y(X((...n) => e.onLeftArrowKeypress && e.onLeftArrowKeypress(...n), ["prevent"]), ["left"]))
      ]
    }, [
      v("div", Zo, null, 512),
      ie(v("div", Jo, [
        F(i, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[0] || (t[0] = X(() => {
          }, ["prevent"])),
          onClick: t[1] || (t[1] = (n) => e.scrollTabs("prev"))
        }, {
          default: A(() => [
            F(l, { icon: e.cdxIconPrevious }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [_e, !e.firstLabelVisible]
      ]),
      v("ul", {
        ref: "listElement",
        class: "cdx-tabs__list",
        role: "tablist",
        "aria-activedescendant": e.activeTabId
      }, [
        (d(!0), h(fe, null, Ce(e.tabsData.values(), (n, r) => (d(), h("li", {
          id: `${n.id}-label`,
          key: r,
          ref_for: !0,
          ref: (p) => e.assignTemplateRefIfNecessary(p, r),
          class: "cdx-tabs__list__item",
          role: "presentation"
        }, [
          v("a", {
            href: `#${n.id}`,
            role: "tab",
            tabIndex: "-1",
            "aria-disabled": n.disabled,
            "aria-selected": n.name === e.activeTab,
            onClick: X((p) => e.select(n.name), ["prevent"]),
            onKeyup: Y((p) => e.select(n.name), ["enter"])
          }, H(n.label), 41, el)
        ], 8, Yo))), 128))
      ], 8, Xo),
      ie(v("div", tl, [
        F(i, {
          class: "cdx-tabs__scroll-button",
          weight: "quiet",
          type: "button",
          tabindex: "-1",
          "aria-hidden": !0,
          onMousedown: t[2] || (t[2] = X(() => {
          }, ["prevent"])),
          onClick: t[3] || (t[3] = (n) => e.scrollTabs("next"))
        }, {
          default: A(() => [
            F(l, { icon: e.cdxIconNext }, null, 8, ["icon"])
          ]),
          _: 1
        })
      ], 512), [
        [_e, !e.lastLabelVisible]
      ])
    ], 32),
    v("div", nl, [
      k(e.$slots, "default")
    ])
  ], 2);
}
const zl = /* @__PURE__ */ K(Go, [["render", ol]]), ll = L({
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
    const o = f(!1);
    return {
      rootClasses: c(() => ({
        // Quiet means frameless among other things
        "cdx-toggle-button--quiet": e.quiet,
        "cdx-toggle-button--framed": !e.quiet,
        // Provide --toggled-off too so that we can simplify selectors
        "cdx-toggle-button--toggled-on": e.modelValue,
        "cdx-toggle-button--toggled-off": !e.modelValue,
        "cdx-toggle-button--is-active": o.value
      })),
      onClick: () => {
        t("update:modelValue", !e.modelValue);
      },
      setActive: (l) => {
        o.value = l;
      }
    };
  }
});
const al = ["aria-pressed", "disabled"];
function sl(e, t, o, s, a, u) {
  return d(), h("button", {
    class: V(["cdx-toggle-button", e.rootClasses]),
    "aria-pressed": e.modelValue,
    disabled: e.disabled,
    onClick: t[0] || (t[0] = (...l) => e.onClick && e.onClick(...l)),
    onKeydown: t[1] || (t[1] = Y((l) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = Y((l) => e.setActive(!1), ["space", "enter"]))
  }, [
    k(e.$slots, "default")
  ], 42, al);
}
const il = /* @__PURE__ */ K(ll, [["render", sl]]), ul = L({
  name: "CdxToggleButtonGroup",
  components: {
    CdxIcon: Z,
    CdxToggleButton: il
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
    function o(a) {
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
      getButtonLabel: ut,
      isSelected: o,
      onUpdate: s
    };
  }
});
const dl = { class: "cdx-toggle-button-group" };
function rl(e, t, o, s, a, u) {
  const l = x("cdx-icon"), i = x("cdx-toggle-button");
  return d(), h("div", dl, [
    (d(!0), h(fe, null, Ce(e.buttons, (n) => (d(), T(i, {
      key: n.value,
      "model-value": e.isSelected(n),
      disabled: n.disabled || e.disabled,
      "aria-label": n.ariaLabel,
      "onUpdate:modelValue": (r) => e.onUpdate(n, r)
    }, {
      default: A(() => [
        k(e.$slots, "default", {
          button: n,
          selected: e.isSelected(n)
        }, () => [
          n.icon ? (d(), T(l, {
            key: 0,
            icon: n.icon
          }, null, 8, ["icon"])) : I("", !0),
          le(" " + H(e.getButtonLabel(n)), 1)
        ])
      ]),
      _: 2
    }, 1032, ["model-value", "disabled", "aria-label", "onUpdate:modelValue"]))), 128))
  ]);
}
const Fl = /* @__PURE__ */ K(ul, [["render", rl]]), cl = L({
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
  setup(e, { attrs: t, emit: o }) {
    const s = f(), a = te("toggle-switch"), u = c(() => ({
      "cdx-toggle-switch--align-switch": e.alignSwitch
    })), {
      rootClasses: l,
      rootStyle: i,
      otherAttrs: n
    } = re(t, u), r = se(G(e, "modelValue"), o);
    return {
      input: s,
      inputId: a,
      rootClasses: l,
      rootStyle: i,
      otherAttrs: n,
      wrappedModel: r,
      clickInput: () => {
        s.value.click();
      }
    };
  }
});
const pl = ["for"], fl = { class: "cdx-toggle-switch__input-wrapper" }, ml = ["id", "value", "disabled"], hl = /* @__PURE__ */ v("span", { class: "cdx-toggle-switch__switch" }, [
  /* @__PURE__ */ v("span", { class: "cdx-toggle-switch__switch__grip" })
], -1);
function vl(e, t, o, s, a, u) {
  return d(), h("span", {
    class: V(["cdx-toggle-switch", e.rootClasses]),
    style: de(e.rootStyle)
  }, [
    e.$slots.default ? (d(), h("label", {
      key: 0,
      for: e.inputId,
      class: "cdx-toggle-switch__label"
    }, [
      k(e.$slots, "default")
    ], 8, pl)) : I("", !0),
    v("span", fl, [
      ie(v("input", J({
        id: e.inputId,
        ref: "input",
        "onUpdate:modelValue": t[0] || (t[0] = (l) => e.wrappedModel = l),
        class: "cdx-toggle-switch__input",
        type: "checkbox",
        value: e.inputValue,
        disabled: e.disabled
      }, e.otherAttrs, {
        onKeydown: t[1] || (t[1] = Y(X((...l) => e.clickInput && e.clickInput(...l), ["prevent"]), ["enter"]))
      }), null, 16, ml), [
        [Xe, e.wrappedModel]
      ]),
      hl
    ])
  ], 6);
}
const ql = /* @__PURE__ */ K(cl, [["render", vl]]), bl = L({
  name: "CdxTypeaheadSearch",
  components: {
    CdxIcon: Z,
    CdxMenu: Ie,
    CdxSearchInput: Fo
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
      default: xt
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
  setup(e, { attrs: t, emit: o, slots: s }) {
    const a = f(), u = f(), l = te("typeahead-search-menu"), i = f(!1), n = f(!1), r = f(!1), p = f(!1), _ = f(e.initialInputValue), y = f(""), E = c(() => {
      var $, P;
      return (P = ($ = u.value) == null ? void 0 : $.getHighlightedMenuItem()) == null ? void 0 : P.id;
    }), M = f(null), W = c(() => ({
      "cdx-typeahead-search__menu-message--has-thumbnail": e.showThumbnail
    })), C = c(
      () => e.searchResults.find(
        ($) => $.value === M.value
      )
    ), z = c(
      () => e.searchFooterUrl ? { value: pe, url: e.searchFooterUrl } : void 0
    ), B = c(() => ({
      "cdx-typeahead-search--show-thumbnail": e.showThumbnail,
      "cdx-typeahead-search--expanded": i.value,
      "cdx-typeahead-search--auto-expand-width": e.showThumbnail && e.autoExpandWidth
    })), {
      rootClasses: N,
      rootStyle: Q,
      otherAttrs: q
    } = re(t, B);
    function U($) {
      return $;
    }
    const w = c(() => ({
      visibleItemLimit: e.visibleItemLimit,
      showThumbnail: e.showThumbnail,
      // In case search queries aren't highlighted, default to a bold label.
      boldLabel: !0,
      hideDescriptionOverflow: !0
    }));
    let g, m;
    function D($, P = !1) {
      C.value && C.value.label !== $ && C.value.value !== $ && (M.value = null), m !== void 0 && (clearTimeout(m), m = void 0), $ === "" ? i.value = !1 : (n.value = !0, s["search-results-pending"] && (m = setTimeout(() => {
        p.value && (i.value = !0), r.value = !0;
      }, St))), g !== void 0 && (clearTimeout(g), g = void 0);
      const ae = () => {
        o("input", $);
      };
      P ? ae() : g = setTimeout(() => {
        ae();
      }, e.debounceInterval);
    }
    function O($) {
      if ($ === pe) {
        M.value = null, _.value = y.value;
        return;
      }
      M.value = $, $ !== null && (_.value = C.value ? C.value.label || String(C.value.value) : "");
    }
    function oe() {
      p.value = !0, (y.value || r.value) && (i.value = !0);
    }
    function ce() {
      p.value = !1, i.value = !1;
    }
    function ge($) {
      const ze = $, { id: P } = ze, ae = $e(ze, ["id"]);
      if (ae.value === pe) {
        o("search-result-click", {
          searchResult: null,
          index: e.searchResults.length,
          numberOfResults: e.searchResults.length
        });
        return;
      }
      b(ae);
    }
    function b($) {
      const P = {
        searchResult: $,
        index: e.searchResults.findIndex(
          (ae) => ae.value === $.value
        ),
        numberOfResults: e.searchResults.length
      };
      o("search-result-click", P);
    }
    function S($) {
      if ($.value === pe) {
        _.value = y.value;
        return;
      }
      _.value = $.value ? $.label || String($.value) : "";
    }
    function R($) {
      var P;
      i.value = !1, (P = u.value) == null || P.clearActive(), ge($);
    }
    function j($) {
      if (C.value)
        b(C.value), $.stopPropagation(), window.location.assign(C.value.url), $.preventDefault();
      else {
        const P = {
          searchResult: null,
          index: -1,
          numberOfResults: e.searchResults.length
        };
        o("submit", P);
      }
    }
    function he($) {
      if (!u.value || !y.value || $.key === " ")
        return;
      const P = u.value.getHighlightedMenuItem(), ae = u.value.getHighlightedViaKeyboard();
      switch ($.key) {
        case "Enter":
          P && (P.value === pe && ae ? window.location.assign(e.searchFooterUrl) : u.value.delegateKeyNavigation($, !1)), i.value = !1;
          break;
        case "Tab":
          i.value = !1;
          break;
        default:
          u.value.delegateKeyNavigation($);
          break;
      }
    }
    return ue(() => {
      e.initialInputValue && D(e.initialInputValue, !0);
    }), ee(G(e, "searchResults"), () => {
      y.value = _.value.trim(), p.value && n.value && y.value.length > 0 && (i.value = !0), m !== void 0 && (clearTimeout(m), m = void 0), n.value = !1, r.value = !1;
    }), {
      form: a,
      menu: u,
      menuId: l,
      highlightedId: E,
      selection: M,
      menuMessageClass: W,
      footer: z,
      asSearchResult: U,
      inputValue: _,
      searchQuery: y,
      expanded: i,
      showPending: r,
      rootClasses: N,
      rootStyle: Q,
      otherAttrs: q,
      menuConfig: w,
      onUpdateInputValue: D,
      onUpdateMenuSelection: O,
      onFocus: oe,
      onBlur: ce,
      onSearchResultClick: ge,
      onSearchResultKeyboardNavigation: S,
      onSearchFooterClick: R,
      onSubmit: j,
      onKeydown: he,
      MenuFooterValue: pe,
      articleIcon: qt
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
const gl = ["id", "action"], yl = { class: "cdx-typeahead-search__menu-message__text" }, $l = { class: "cdx-typeahead-search__menu-message__text" }, _l = ["href", "onClickCapture"], Cl = { class: "cdx-menu-item__text cdx-typeahead-search__search-footer__text" }, Il = { class: "cdx-typeahead-search__search-footer__query" };
function wl(e, t, o, s, a, u) {
  const l = x("cdx-icon"), i = x("cdx-menu"), n = x("cdx-search-input");
  return d(), h("div", {
    class: V(["cdx-typeahead-search", e.rootClasses]),
    style: de(e.rootStyle)
  }, [
    v("form", {
      id: e.id,
      ref: "form",
      class: "cdx-typeahead-search__form",
      action: e.formAction,
      onSubmit: t[4] || (t[4] = (...r) => e.onSubmit && e.onSubmit(...r))
    }, [
      F(n, J({
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
        default: A(() => [
          F(i, J({
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
            pending: A(() => [
              v("div", {
                class: V(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                v("span", yl, [
                  k(e.$slots, "search-results-pending")
                ])
              ], 2)
            ]),
            "no-results": A(() => [
              v("div", {
                class: V(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                v("span", $l, [
                  k(e.$slots, "search-no-results-text")
                ])
              ], 2)
            ]),
            default: A(({ menuItem: r, active: p }) => [
              r.value === e.MenuFooterValue ? (d(), h("a", {
                key: 0,
                class: V(["cdx-menu-item__content cdx-typeahead-search__search-footer", {
                  "cdx-typeahead-search__search-footer__active": p
                }]),
                href: e.asSearchResult(r).url,
                onClickCapture: X((_) => e.onSearchFooterClick(e.asSearchResult(r)), ["stop"])
              }, [
                F(l, {
                  class: "cdx-menu-item__thumbnail cdx-typeahead-search__search-footer__icon",
                  icon: e.articleIcon
                }, null, 8, ["icon"]),
                v("span", Cl, [
                  k(e.$slots, "search-footer-text", { searchQuery: e.searchQuery }, () => [
                    v("strong", Il, H(e.searchQuery), 1)
                  ])
                ])
              ], 42, _l)) : I("", !0)
            ]),
            _: 3
          }, 16, ["id", "expanded", "show-pending", "selected", "menu-items", "footer", "search-query", "show-no-results-slot", "aria-label", "onUpdate:selected", "onMenuItemKeyboardNavigation"])
        ]),
        _: 3
      }, 16, ["modelValue", "button-label", "aria-owns", "aria-expanded", "aria-activedescendant", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
      k(e.$slots, "default")
    ], 40, gl)
  ], 6);
}
const Ol = /* @__PURE__ */ K(bl, [["render", wl]]);
export {
  me as CdxButton,
  Sl as CdxButtonGroup,
  Ml as CdxCard,
  Bl as CdxCheckbox,
  Al as CdxCombobox,
  Ll as CdxDialog,
  Z as CdxIcon,
  Tl as CdxInfoChip,
  Kl as CdxLookup,
  Ie as CdxMenu,
  Gn as CdxMenuItem,
  El as CdxMessage,
  to as CdxProgressBar,
  Dl as CdxRadio,
  Fo as CdxSearchInput,
  Fn as CdxSearchResultTitle,
  Nl as CdxSelect,
  Rl as CdxTab,
  zl as CdxTabs,
  Ee as CdxTextInput,
  dt as CdxThumbnail,
  il as CdxToggleButton,
  Fl as CdxToggleButtonGroup,
  ql as CdxToggleSwitch,
  Ol as CdxTypeaheadSearch,
  Vl as stringHelpers,
  it as useComputedDirection,
  Zt as useComputedLanguage,
  te as useGeneratedId,
  Ve as useIntersectionObserver,
  se as useModelWrapper,
  we as useResizeObserver,
  re as useSplitAttributes
};
