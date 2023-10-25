var Fe = Object.defineProperty, Ne = Object.defineProperties;
var Oe = Object.getOwnPropertyDescriptors;
var re = Object.getOwnPropertySymbols;
var we = Object.prototype.hasOwnProperty, xe = Object.prototype.propertyIsEnumerable;
var _e = (e, t, n) => t in e ? Fe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, ke = (e, t) => {
  for (var n in t || (t = {}))
    we.call(t, n) && _e(e, n, t[n]);
  if (re)
    for (var n of re(t))
      xe.call(t, n) && _e(e, n, t[n]);
  return e;
}, Me = (e, t) => Ne(e, Oe(t));
var ne = (e, t) => {
  var n = {};
  for (var a in e)
    we.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
  if (e != null && re)
    for (var a of re(e))
      t.indexOf(a) < 0 && xe.call(e, a) && (n[a] = e[a]);
  return n;
};
var be = (e, t, n) => new Promise((a, s) => {
  var r = (u) => {
    try {
      i(n.next(u));
    } catch (d) {
      s(d);
    }
  }, o = (u) => {
    try {
      i(n.throw(u));
    } catch (d) {
      s(d);
    }
  }, i = (u) => u.done ? a(u.value) : Promise.resolve(u.value).then(r, o);
  i((n = n.apply(e, t)).next());
});
import { ref as b, onMounted as X, defineComponent as E, computed as h, openBlock as p, createElementBlock as v, normalizeClass as L, toDisplayString as B, createCommentVNode as x, resolveComponent as K, createVNode as W, Transition as qe, withCtx as H, normalizeStyle as le, createElementVNode as S, createTextVNode as ae, withModifiers as Se, renderSlot as D, createBlock as A, resolveDynamicComponent as He, Fragment as $e, warn as Te, watch as G, getCurrentInstance as ze, onUnmounted as Ve, toRef as z, nextTick as de, withDirectives as Be, mergeProps as J, renderList as Ue, vShow as Qe, Comment as Pe, withKeys as Ie, inject as he, vModelDynamic as je } from "vue";
const We = '<path d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"/><circle cx="10" cy="10" r="3"/>', Ge = '<path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"/>', Je = '<path d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"/><path d="M19 5H1V3h18zm0 12H1v-2h18z"/>', Xe = '<path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"/>', Ye = We, Ze = Ge, et = Je, tt = Xe;
function nt(e, t, n) {
  if (typeof e == "string" || "path" in e)
    return e;
  if ("shouldFlip" in e)
    return e.ltr;
  if ("rtl" in e)
    return n === "rtl" ? e.rtl : e.ltr;
  const a = t in e.langCodeMap ? e.langCodeMap[t] : e.default;
  return typeof a == "string" || "path" in a ? a : a.ltr;
}
function at(e, t) {
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
function lt(e) {
  const t = b(null);
  return X(() => {
    const n = window.getComputedStyle(e.value).direction;
    t.value = n === "ltr" || n === "rtl" ? n : null;
  }), t;
}
function ot(e) {
  const t = b("");
  return X(() => {
    let n = e.value;
    for (; n && n.lang === ""; )
      n = n.parentElement;
    t.value = n ? n.lang : null;
  }), t;
}
function U(e) {
  return (t) => typeof t == "string" && e.indexOf(t) !== -1;
}
const ce = "cdx", st = [
  "default",
  "progressive",
  "destructive"
], it = [
  "normal",
  "primary",
  "quiet"
], ut = [
  "medium",
  "large"
], rt = [
  "x-small",
  "small",
  "medium"
], dt = [
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
], Le = [
  "default",
  "error"
], ct = 120, ht = 500, j = "cdx-menu-footer-item", ft = Symbol("CdxFieldInputId"), pt = Symbol("CdxFieldDescriptionId"), mt = Symbol("CdxFieldStatus"), vt = Symbol("CdxDisabled"), gt = "".concat(ce, "-no-invert"), yt = U(rt), bt = E({
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
      validator: yt
    }
  },
  setup(e) {
    const t = b(), n = lt(t), a = ot(t), s = h(() => e.dir || n.value), r = h(() => e.lang || a.value), o = h(() => ({
      "cdx-icon--flipped": s.value === "rtl" && r.value !== null && at(e.icon, r.value),
      ["cdx-icon--".concat(e.size)]: !0
    })), i = h(
      () => nt(e.icon, r.value || "", s.value || "ltr")
    ), u = h(() => typeof i.value == "string" ? i.value : ""), d = h(() => typeof i.value != "string" ? i.value.path : "");
    return {
      rootElement: t,
      rootClasses: o,
      iconSvg: u,
      iconPath: d
    };
  }
});
const F = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Ct = ["aria-hidden"], $t = { key: 0 }, It = ["innerHTML"], St = ["d"];
function _t(e, t, n, a, s, r) {
  return p(), v("span", {
    ref: "rootElement",
    class: L(["cdx-icon", e.rootClasses])
  }, [
    (p(), v("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      "aria-hidden": e.iconLabel ? void 0 : !0
    }, [
      e.iconLabel ? (p(), v("title", $t, B(e.iconLabel), 1)) : x("", !0),
      e.iconSvg ? (p(), v("g", {
        key: 1,
        innerHTML: e.iconSvg
      }, null, 8, It)) : (p(), v("path", {
        key: 2,
        d: e.iconPath
      }, null, 8, St))
    ], 8, Ct))
  ], 2);
}
const fe = /* @__PURE__ */ F(bt, [["render", _t]]), wt = E({
  name: "CdxThumbnail",
  components: { CdxIcon: fe },
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
      default: et
    }
  },
  setup: (e) => {
    const t = b(!1), n = b({}), a = (s) => {
      const r = s.replace(/([\\"\n])/g, "\\$1"), o = new Image();
      o.onload = () => {
        n.value = { backgroundImage: 'url("'.concat(r, '")') }, t.value = !0;
      }, o.onerror = () => {
        t.value = !1;
      }, o.src = r;
    };
    return X(() => {
      var s;
      (s = e.thumbnail) != null && s.url && a(e.thumbnail.url);
    }), {
      thumbnailStyle: n,
      thumbnailLoaded: t,
      NoInvertClass: gt
    };
  }
});
const xt = { class: "cdx-thumbnail" }, kt = {
  key: 0,
  class: "cdx-thumbnail__placeholder"
};
function Mt(e, t, n, a, s, r) {
  const o = K("cdx-icon");
  return p(), v("span", xt, [
    e.thumbnailLoaded ? x("", !0) : (p(), v("span", kt, [
      W(o, {
        icon: e.placeholderIcon,
        class: "cdx-thumbnail__placeholder__icon--vue"
      }, null, 8, ["icon"])
    ])),
    W(qe, { name: "cdx-thumbnail__image" }, {
      default: H(() => [
        e.thumbnailLoaded ? (p(), v("span", {
          key: 0,
          style: le(e.thumbnailStyle),
          class: L([e.NoInvertClass, "cdx-thumbnail__image"])
        }, null, 6)) : x("", !0)
      ]),
      _: 1
    })
  ]);
}
const Tt = /* @__PURE__ */ F(wt, [["render", Mt]]);
function Vt(e) {
  return e.replace(/([\\{}()|.?*+\-^$[\]])/g, "\\$1");
}
const Bt = "[̀-ͯ҃-҉֑-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣঁ-ঃ়া-ৄেৈো-্ৗৢৣ৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑੰੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣஂா-ூெ-ைொ-்ௗఀ-ఄా-ౄె-ైొ-్ౕౖౢౣಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣංඃ්ා-ුූෘ-ෟෲෳัิ-ฺ็-๎ັິ-ູົຼ່-ໍ༹༘༙༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏႚ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝᠋-᠍ᢅᢆᢩᤠ-ᤫᤰ-᤻ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼᪰-᪾ᬀ-ᬄ᬴-᭄᭫-᭳ᮀ-ᮂᮡ-ᮭ᯦-᯳ᰤ-᰷᳐-᳔᳒-᳨᳭ᳲ-᳴᳷-᳹᷀-᷹᷻-᷿⃐-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯-꙲ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣠-꣱ꣿꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀ꧥꨩ-ꨶꩃꩌꩍꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭ﬞ︀-️︠-︯]";
function Lt(e, t) {
  if (!e)
    return [t, "", ""];
  const n = Vt(e), a = new RegExp(
    // Per https://www.regular-expressions.info/unicode.html, "any code point that is not a
    // combining mark can be followed by any number of combining marks." See also the
    // discussion in https://phabricator.wikimedia.org/T35242.
    n + Bt + "*",
    "i"
  ).exec(t);
  if (!a || a.index === void 0)
    return [t, "", ""];
  const s = a.index, r = s + a[0].length, o = t.slice(s, r), i = t.slice(0, s), u = t.slice(r, t.length);
  return [i, o, u];
}
const Kt = E({
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
    titleChunks: h(() => Lt(e.searchQuery, String(e.title)))
  })
});
const At = { class: "cdx-search-result-title" }, Rt = { class: "cdx-search-result-title__match" };
function Dt(e, t, n, a, s, r) {
  return p(), v("span", At, [
    S("bdi", null, [
      ae(B(e.titleChunks[0]), 1),
      S("span", Rt, B(e.titleChunks[1]), 1),
      ae(B(e.titleChunks[2]), 1)
    ])
  ]);
}
const Et = /* @__PURE__ */ F(Kt, [["render", Dt]]), Ft = E({
  name: "CdxMenuItem",
  components: { CdxIcon: fe, CdxThumbnail: Tt, CdxSearchResultTitle: Et },
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
    }, s = (m) => {
      m.button === 0 && t("change", "active", !0);
    }, r = () => {
      t("change", "selected", !0);
    }, o = h(() => e.searchQuery.length > 0), i = h(() => ({
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
      "cdx-menu-item--highlight-query": o.value,
      "cdx-menu-item--bold-label": e.boldLabel,
      "cdx-menu-item--has-description": !!e.description,
      "cdx-menu-item--hide-description-overflow": e.hideDescriptionOverflow
    })), u = h(() => e.url ? "a" : "span"), d = h(() => e.label || String(e.value));
    return {
      onMouseMove: n,
      onMouseLeave: a,
      onMouseDown: s,
      onClick: r,
      highlightQuery: o,
      rootClasses: i,
      contentTag: u,
      title: d
    };
  }
});
const Nt = ["id", "aria-disabled", "aria-selected"], Ot = { class: "cdx-menu-item__text" }, qt = ["lang"], Ht = ["lang"], zt = ["lang"], Ut = ["lang"];
function Qt(e, t, n, a, s, r) {
  const o = K("cdx-thumbnail"), i = K("cdx-icon"), u = K("cdx-search-result-title");
  return p(), v("li", {
    id: e.id,
    role: "option",
    class: L(["cdx-menu-item", e.rootClasses]),
    "aria-disabled": e.disabled,
    "aria-selected": e.selected,
    onMousemove: t[0] || (t[0] = (...d) => e.onMouseMove && e.onMouseMove(...d)),
    onMouseleave: t[1] || (t[1] = (...d) => e.onMouseLeave && e.onMouseLeave(...d)),
    onMousedown: t[2] || (t[2] = Se((...d) => e.onMouseDown && e.onMouseDown(...d), ["prevent"])),
    onClick: t[3] || (t[3] = (...d) => e.onClick && e.onClick(...d))
  }, [
    D(e.$slots, "default", {}, () => [
      (p(), A(He(e.contentTag), {
        href: e.url ? e.url : void 0,
        class: "cdx-menu-item__content"
      }, {
        default: H(() => {
          var d, m, C, g, k, w;
          return [
            e.showThumbnail ? (p(), A(o, {
              key: 0,
              thumbnail: e.thumbnail,
              class: "cdx-menu-item__thumbnail"
            }, null, 8, ["thumbnail"])) : e.icon ? (p(), A(i, {
              key: 1,
              icon: e.icon,
              class: "cdx-menu-item__icon"
            }, null, 8, ["icon"])) : x("", !0),
            S("span", Ot, [
              e.highlightQuery ? (p(), A(u, {
                key: 0,
                title: e.title,
                "search-query": e.searchQuery,
                lang: (d = e.language) == null ? void 0 : d.label
              }, null, 8, ["title", "search-query", "lang"])) : (p(), v("span", {
                key: 1,
                class: "cdx-menu-item__text__label",
                lang: (m = e.language) == null ? void 0 : m.label
              }, [
                S("bdi", null, B(e.title), 1)
              ], 8, qt)),
              e.match ? (p(), v($e, { key: 2 }, [
                ae(B(" ") + " "),
                e.highlightQuery ? (p(), A(u, {
                  key: 0,
                  title: e.match,
                  "search-query": e.searchQuery,
                  lang: (C = e.language) == null ? void 0 : C.match
                }, null, 8, ["title", "search-query", "lang"])) : (p(), v("span", {
                  key: 1,
                  class: "cdx-menu-item__text__match",
                  lang: (g = e.language) == null ? void 0 : g.match
                }, [
                  S("bdi", null, B(e.match), 1)
                ], 8, Ht))
              ], 64)) : x("", !0),
              e.supportingText ? (p(), v($e, { key: 3 }, [
                ae(B(" ") + " "),
                S("span", {
                  class: "cdx-menu-item__text__supporting-text",
                  lang: (k = e.language) == null ? void 0 : k.supportingText
                }, [
                  S("bdi", null, B(e.supportingText), 1)
                ], 8, zt)
              ], 64)) : x("", !0),
              e.description ? (p(), v("span", {
                key: 4,
                class: "cdx-menu-item__text__description",
                lang: (w = e.language) == null ? void 0 : w.description
              }, [
                S("bdi", null, B(e.description), 1)
              ], 8, Ut)) : x("", !0)
            ])
          ];
        }),
        _: 1
      }, 8, ["href"]))
    ])
  ], 42, Nt);
}
const Pt = /* @__PURE__ */ F(Ft, [["render", Qt]]);
function Ke(e, t) {
  if (e()) {
    Te(t);
    return;
  }
  const n = G(e, (a) => {
    a && (Te(t), n());
  });
}
const jt = E({
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
    Ke(
      () => !e.inline && !t["aria-label"] && !t["aria-hidden"],
      "CdxProgressBar: Progress bars require one of the following attribute, aria-label or aria-hidden. See documentation on https://doc.wikimedia.org/codex/latest/components/demos/progressbar.html"
    );
    const n = h(() => ({
      "cdx-progress-bar--block": !e.inline,
      "cdx-progress-bar--inline": e.inline,
      "cdx-progress-bar--enabled": !e.disabled,
      "cdx-progress-bar--disabled": e.disabled
    })), a = h(() => e.inline ? "true" : void 0);
    return {
      rootClasses: n,
      computedAriaHidden: a
    };
  }
});
const Wt = ["aria-hidden", "aria-disabled"], Gt = /* @__PURE__ */ S("div", { class: "cdx-progress-bar__bar" }, null, -1), Jt = [
  Gt
];
function Xt(e, t, n, a, s, r) {
  return p(), v("div", {
    class: L(["cdx-progress-bar", e.rootClasses]),
    role: "progressbar",
    "aria-hidden": e.computedAriaHidden,
    "aria-disabled": e.disabled
  }, Jt, 10, Wt);
}
const Yt = /* @__PURE__ */ F(jt, [["render", Xt]]);
let Ce = 0;
function Ae(e) {
  const t = ze(), n = (t == null ? void 0 : t.props.id) || (t == null ? void 0 : t.attrs.id);
  return e ? "".concat(ce, "-").concat(e, "-").concat(Ce++) : n ? "".concat(ce, "-").concat(n, "-").concat(Ce++) : "".concat(ce, "-").concat(Ce++);
}
function Zt(e, t) {
  const n = b(!1);
  let a = !1;
  if (typeof window != "object" || !("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype))
    return n;
  const s = new window.IntersectionObserver(
    (r) => {
      const o = r[0];
      o && (n.value = o.isIntersecting);
    },
    t
  );
  return X(() => {
    a = !0, e.value && s.observe(e.value);
  }), Ve(() => {
    a = !1, s.disconnect();
  }), G(e, (r) => {
    a && (s.disconnect(), n.value = !1, r && s.observe(r));
  }), n;
}
function pe(e, t = h(() => ({}))) {
  const n = h(() => {
    const r = ne(t.value, []);
    return e.class && e.class.split(" ").forEach((i) => {
      r[i] = !0;
    }), r;
  }), a = h(() => {
    if ("style" in e)
      return e.style;
  }), s = h(() => {
    const u = e, { class: r, style: o } = u;
    return ne(u, ["class", "style"]);
  });
  return {
    rootClasses: n,
    rootStyle: a,
    otherAttrs: s
  };
}
const en = E({
  name: "CdxMenu",
  components: {
    CdxMenuItem: Pt,
    CdxProgressBar: Yt
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
  setup(e, { emit: t, slots: n, attrs: a }) {
    const s = h(() => (e.footer && e.menuItems ? [...e.menuItems, e.footer] : e.menuItems).map((c) => Me(ke({}, c), {
      id: Ae("menu-item")
    }))), r = h(() => n["no-results"] ? e.showNoResultsSlot !== null ? e.showNoResultsSlot : s.value.length === 0 : !1), o = b(null), i = b(!1), u = b(null), d = "additions removals";
    let m = "", C = null;
    function g() {
      m = "", C !== null && (clearTimeout(C), C = null);
    }
    function k() {
      C !== null && clearTimeout(C), C = setTimeout(g, 1500);
    }
    function w() {
      return s.value.find(
        (l) => l.value === e.selected
      ) || null;
    }
    function M(l, c) {
      var y;
      if (!(c && c.disabled))
        switch (l) {
          case "selected":
            t("update:selected", (y = c == null ? void 0 : c.value) != null ? y : null), t("update:expanded", !1), u.value = null;
            break;
          case "highlighted":
            o.value = c || null, i.value = !1;
            break;
          case "highlightedViaKeyboard":
            o.value = c || null, i.value = !0;
            break;
          case "active":
            u.value = c || null;
            break;
        }
    }
    const I = h(() => {
      if (o.value !== null)
        return s.value.findIndex(
          (l) => (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            l.value === o.value.value
          )
        );
    });
    function Y(l) {
      l && (M("highlightedViaKeyboard", l), t("menu-item-keyboard-navigation", l));
    }
    function Z(l) {
      var _;
      const c = (P) => {
        for (let V = P - 1; V >= 0; V--)
          if (!s.value[V].disabled)
            return s.value[V];
      };
      l = l || s.value.length;
      const y = (_ = c(l)) != null ? _ : c(s.value.length);
      Y(y);
    }
    function ee(l) {
      const c = (_) => s.value.find((P, V) => !P.disabled && V > _);
      l = l != null ? l : -1;
      const y = c(l) || c(-1);
      Y(y);
    }
    function oe(l) {
      if (l.key === "Clear")
        return g(), !0;
      if (l.key === "Backspace")
        return m = m.slice(0, -1), k(), !0;
      if (l.key.length === 1 && !l.metaKey && !l.ctrlKey && !l.altKey) {
        e.expanded || t("update:expanded", !0), m += l.key.toLowerCase();
        const c = m.length > 1 && m.split("").every((V) => V === m[0]);
        let y = s.value, _ = m;
        c && I.value !== void 0 && (y = y.slice(I.value + 1).concat(y.slice(0, I.value)), _ = m[0]);
        const P = y.find(
          (V) => !V.disabled && String(V.label || V.value).toLowerCase().indexOf(_) === 0
        );
        return P && (M("highlightedViaKeyboard", P), O()), k(), !0;
      }
      return !1;
    }
    function se(l, { prevent: c = !0, characterNavigation: y = !1 } = {}) {
      if (y) {
        if (oe(l))
          return !0;
        g();
      }
      function _() {
        c && (l.preventDefault(), l.stopPropagation());
      }
      switch (l.key) {
        case "Enter":
        case " ":
          return _(), e.expanded ? (o.value && i.value && t("update:selected", o.value.value), t("update:expanded", !1)) : t("update:expanded", !0), !0;
        case "Tab":
          return e.expanded && (o.value && i.value && t("update:selected", o.value.value), t("update:expanded", !1)), !0;
        case "ArrowUp":
          return _(), e.expanded ? (o.value === null && M("highlightedViaKeyboard", w()), Z(I.value)) : t("update:expanded", !0), O(), !0;
        case "ArrowDown":
          return _(), e.expanded ? (o.value === null && M("highlightedViaKeyboard", w()), ee(I.value)) : t("update:expanded", !0), O(), !0;
        case "Home":
          return _(), e.expanded ? (o.value === null && M("highlightedViaKeyboard", w()), ee()) : t("update:expanded", !0), O(), !0;
        case "End":
          return _(), e.expanded ? (o.value === null && M("highlightedViaKeyboard", w()), Z()) : t("update:expanded", !0), O(), !0;
        case "Escape":
          return _(), t("update:expanded", !1), !0;
        default:
          return !1;
      }
    }
    function $() {
      M("active", null);
    }
    const T = [], R = b(void 0), N = Zt(
      R,
      { threshold: 0.8 }
    );
    G(N, (l) => {
      l && t("load-more");
    });
    function ie(l, c) {
      if (l) {
        T[c] = l.$el;
        const y = e.visibleItemLimit;
        if (!y || e.menuItems.length < y)
          return;
        const _ = Math.min(
          y,
          Math.max(2, Math.floor(0.2 * e.menuItems.length))
        );
        c === e.menuItems.length - _ && (R.value = l.$el);
      }
    }
    function O() {
      if (!e.visibleItemLimit || e.visibleItemLimit > e.menuItems.length || I.value === void 0)
        return;
      const l = I.value >= 0 ? I.value : 0;
      T[l].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
    const q = b(null), Q = b(null);
    function te() {
      if (Q.value = null, !e.visibleItemLimit || T.length <= e.visibleItemLimit) {
        q.value = null;
        return;
      }
      const l = T[0], c = T[e.visibleItemLimit];
      if (q.value = ue(
        l,
        c
      ), e.footer) {
        const y = T[T.length - 1];
        Q.value = y.scrollHeight;
      }
    }
    function ue(l, c) {
      const y = l.getBoundingClientRect().top;
      return c.getBoundingClientRect().top - y + 2;
    }
    X(() => {
      document.addEventListener("mouseup", $);
    }), Ve(() => {
      document.removeEventListener("mouseup", $);
    }), G(z(e, "expanded"), (l) => be(this, null, function* () {
      if (l) {
        const c = w();
        c && !o.value && M("highlighted", c), yield de(), te(), yield de(), O();
      } else
        M("highlighted", null);
    })), G(z(e, "menuItems"), (l) => be(this, null, function* () {
      l.length < T.length && (T.length = l.length), e.expanded && (yield de(), te(), yield de(), O());
    }), { deep: !0 });
    const me = h(() => ({
      "max-height": q.value ? "".concat(q.value, "px") : void 0,
      "overflow-y": q.value ? "scroll" : void 0,
      "margin-bottom": Q.value ? "".concat(Q.value, "px") : void 0
    })), ve = h(() => ({
      "cdx-menu--has-footer": !!e.footer,
      "cdx-menu--has-sticky-footer": !!e.footer && !!q.value
    })), {
      rootClasses: ge,
      rootStyle: ye,
      otherAttrs: f
    } = pe(a, ve);
    return {
      listBoxStyle: me,
      rootClasses: ge,
      rootStyle: ye,
      otherAttrs: f,
      assignTemplateRef: ie,
      computedMenuItems: s,
      computedShowNoResultsSlot: r,
      highlightedMenuItem: o,
      highlightedViaKeyboard: i,
      activeMenuItem: u,
      handleMenuItemChange: M,
      handleKeyNavigation: se,
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
const tn = ["aria-live", "aria-relevant"], nn = {
  key: 0,
  class: "cdx-menu__pending cdx-menu-item"
}, an = {
  key: 1,
  class: "cdx-menu__no-results cdx-menu-item"
};
function ln(e, t, n, a, s, r) {
  const o = K("cdx-menu-item"), i = K("cdx-progress-bar");
  return Be((p(), v("div", {
    class: L(["cdx-menu", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    S("ul", J({
      class: "cdx-menu__listbox",
      role: "listbox",
      style: e.listBoxStyle,
      "aria-live": e.showPending ? "polite" : void 0,
      "aria-relevant": e.showPending ? e.ariaRelevant : void 0
    }, e.otherAttrs), [
      e.showPending && e.computedMenuItems.length === 0 && e.$slots.pending ? (p(), v("li", nn, [
        D(e.$slots, "pending")
      ])) : x("", !0),
      e.computedShowNoResultsSlot ? (p(), v("li", an, [
        D(e.$slots, "no-results")
      ])) : x("", !0),
      (p(!0), v($e, null, Ue(e.computedMenuItems, (u, d) => {
        var m, C;
        return p(), A(o, J({
          key: u.value,
          ref_for: !0,
          ref: (g) => e.assignTemplateRef(g, d)
        }, u, {
          selected: u.value === e.selected,
          active: u.value === ((m = e.activeMenuItem) == null ? void 0 : m.value),
          highlighted: u.value === ((C = e.highlightedMenuItem) == null ? void 0 : C.value),
          "show-thumbnail": e.showThumbnail,
          "bold-label": e.boldLabel,
          "hide-description-overflow": e.hideDescriptionOverflow,
          "search-query": e.searchQuery,
          onChange: (g, k) => e.handleMenuItemChange(g, k ? u : null),
          onClick: (g) => e.$emit("menu-item-click", u)
        }), {
          default: H(() => {
            var g, k;
            return [
              D(e.$slots, "default", {
                menuItem: u,
                active: u.value === ((g = e.activeMenuItem) == null ? void 0 : g.value) && u.value === ((k = e.highlightedMenuItem) == null ? void 0 : k.value)
              })
            ];
          }),
          _: 2
        }, 1040, ["selected", "active", "highlighted", "show-thumbnail", "bold-label", "hide-description-overflow", "search-query", "onChange", "onClick"]);
      }), 128)),
      e.showPending ? (p(), A(i, {
        key: 2,
        class: "cdx-menu__progress-bar",
        inline: !0
      })) : x("", !0)
    ], 16, tn)
  ], 6)), [
    [Qe, e.expanded]
  ]);
}
const on = /* @__PURE__ */ F(en, [["render", ln]]);
function Re(e) {
  const t = [];
  for (const n of e)
    // HTML tag
    typeof n.type == "string" || // Component
    typeof n.type == "object" ? t.push(n) : n.type !== Pe && (typeof n.children == "string" && n.children.trim() !== "" ? t.push(n.children) : Array.isArray(n.children) && t.push(...Re(n.children)));
  return t;
}
function sn(e, t) {
  return typeof e.type == "object" && "name" in e.type ? t !== void 0 ? e.type.name === t : !0 : !1;
}
function un(e, t) {
  return typeof e.type == "string" ? t !== void 0 ? e.type === t.toLowerCase() : !0 : !1;
}
function rn(e) {
  const t = typeof e == "function" ? e() : e;
  return t ? Re(t) : [];
}
function dn(e, t, n) {
  const a = h(() => {
    const s = rn(e);
    if (s.length !== 1)
      return !1;
    const r = s[0];
    return !!(typeof r == "object" && (sn(r, "CdxIcon") || un(r, "svg")));
  });
  return Ke(
    () => a.value && !t["aria-label"] && !t["aria-hidden"],
    "".concat(n, ": Icon-only buttons require one of the following attributes: aria-label or aria-hidden. See documentation at https://doc.wikimedia.org/codex/latest/components/demos/button.html#icon-only-button")
  ), a;
}
const cn = U(st), hn = U(it), fn = U(ut), pn = E({
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
      validator: cn
    },
    /**
     * Visual prominence of the button.
     *
     * @values 'normal', 'primary', 'quiet'
     */
    weight: {
      type: String,
      default: "normal",
      validator: hn
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
      validator: fn
    }
  },
  emits: ["click"],
  setup(e, { emit: t, slots: n, attrs: a }) {
    const s = dn(n.default, a, "CdxButton"), r = b(!1);
    return {
      rootClasses: h(() => ({
        ["cdx-button--action-".concat(e.action)]: !0,
        ["cdx-button--weight-".concat(e.weight)]: !0,
        ["cdx-button--size-".concat(e.size)]: !0,
        "cdx-button--framed": e.weight !== "quiet",
        "cdx-button--icon-only": s.value,
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
function mn(e, t, n, a, s, r) {
  return p(), v("button", {
    class: L(["cdx-button", e.rootClasses]),
    onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o)),
    onKeydown: t[1] || (t[1] = Ie((o) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = Ie((o) => e.setActive(!1), ["space", "enter"]))
  }, [
    D(e.$slots, "default")
  ], 34);
}
const vn = /* @__PURE__ */ F(pn, [["render", mn]]);
function De(e, t, n) {
  return h({
    get: () => e.value,
    set: (a) => (
      // If eventName is undefined, then 'update:modelValue' must be a valid EventName,
      // but TypeScript's type analysis isn't clever enough to realize that
      t(n || "update:modelValue", a)
    )
  });
}
function gn(e) {
  const t = he(vt, b(!1));
  return h(() => t.value || e.value);
}
function Ee(e, t, n) {
  const a = gn(e), s = he(mt, b("default")), r = h(() => t != null && t.value && t.value !== "default" ? t.value : s.value), o = he(ft, void 0), i = h(
    () => o && o.value ? o.value : n
  );
  return {
    computedDisabled: a,
    computedStatus: r,
    computedInputId: i
  };
}
const yn = U(dt), bn = U(Le), Cn = E({
  name: "CdxTextInput",
  components: { CdxIcon: fe },
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
      validator: yn
    },
    /**
     * `status` attribute of the input.
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: bn
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
      computedStatus: r,
      computedInputId: o
    } = Ee(
      z(e, "disabled"),
      z(e, "status"),
      a
    ), i = he(pt, void 0), u = De(z(e, "modelValue"), t), d = h(() => e.clearable && !!u.value && !s.value), m = h(() => ({
      "cdx-text-input--has-start-icon": !!e.startIcon,
      "cdx-text-input--has-end-icon": !!e.endIcon,
      "cdx-text-input--clearable": d.value,
      ["cdx-text-input--status-".concat(r.value)]: !0
    })), {
      rootClasses: C,
      rootStyle: g,
      otherAttrs: k
    } = pe(n, m), w = h(() => {
      const R = k.value, { id: $ } = R;
      return ne(R, ["id"]);
    }), M = h(() => ({
      "cdx-text-input__input--has-value": !!u.value
    }));
    return {
      computedInputId: o,
      descriptionId: i,
      wrappedModel: u,
      isClearable: d,
      rootClasses: C,
      rootStyle: g,
      otherAttrsMinusId: w,
      inputClasses: M,
      computedDisabled: s,
      onClear: ($) => {
        u.value = "", t("clear", $);
      },
      onInput: ($) => {
        t("input", $);
      },
      onChange: ($) => {
        t("change", $);
      },
      onKeydown: ($) => {
        ($.key === "Home" || $.key === "End") && !$.ctrlKey && !$.metaKey || t("keydown", $);
      },
      onFocus: ($) => {
        t("focus", $);
      },
      onBlur: ($) => {
        t("blur", $);
      },
      cdxIconClear: Ze
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
const $n = ["id", "type", "aria-describedby", "disabled"];
function In(e, t, n, a, s, r) {
  const o = K("cdx-icon");
  return p(), v("div", {
    class: L(["cdx-text-input", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    Be(S("input", J({
      id: e.computedInputId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wrappedModel = i),
      class: ["cdx-text-input__input", e.inputClasses]
    }, e.otherAttrsMinusId, {
      type: e.inputType,
      "aria-describedby": e.descriptionId,
      disabled: e.computedDisabled,
      size: "1",
      onInput: t[1] || (t[1] = (...i) => e.onInput && e.onInput(...i)),
      onChange: t[2] || (t[2] = (...i) => e.onChange && e.onChange(...i)),
      onFocus: t[3] || (t[3] = (...i) => e.onFocus && e.onFocus(...i)),
      onBlur: t[4] || (t[4] = (...i) => e.onBlur && e.onBlur(...i)),
      onKeydown: t[5] || (t[5] = (...i) => e.onKeydown && e.onKeydown(...i))
    }), null, 16, $n), [
      [je, e.wrappedModel]
    ]),
    e.startIcon ? (p(), A(o, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__start-icon"
    }, null, 8, ["icon"])) : x("", !0),
    e.endIcon ? (p(), A(o, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__end-icon"
    }, null, 8, ["icon"])) : x("", !0),
    e.isClearable ? (p(), A(o, {
      key: 2,
      icon: e.cdxIconClear,
      class: "cdx-text-input__icon-vue cdx-text-input__clear-icon",
      onMousedown: t[6] || (t[6] = Se(() => {
      }, ["prevent"])),
      onClick: e.onClear
    }, null, 8, ["icon", "onClick"])) : x("", !0)
  ], 6);
}
const Sn = /* @__PURE__ */ F(Cn, [["render", In]]), _n = U(Le), wn = E({
  name: "CdxSearchInput",
  components: {
    CdxButton: vn,
    CdxTextInput: Sn
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
      validator: _n
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
    const a = De(z(e, "modelValue"), t), { computedDisabled: s } = Ee(z(e, "disabled")), r = h(() => ({
      "cdx-search-input--has-end-button": !!e.buttonLabel
    })), {
      rootClasses: o,
      rootStyle: i,
      otherAttrs: u
    } = pe(n, r);
    return {
      wrappedModel: a,
      computedDisabled: s,
      rootClasses: o,
      rootStyle: i,
      otherAttrs: u,
      handleSubmit: () => {
        t("submit-click", a.value);
      },
      searchIcon: tt
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
const xn = { class: "cdx-search-input__input-wrapper" };
function kn(e, t, n, a, s, r) {
  const o = K("cdx-text-input"), i = K("cdx-button");
  return p(), v("div", {
    class: L(["cdx-search-input", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    S("div", xn, [
      W(o, J({
        ref: "textInput",
        modelValue: e.wrappedModel,
        "onUpdate:modelValue": t[0] || (t[0] = (u) => e.wrappedModel = u),
        class: "cdx-search-input__text-input",
        "input-type": "search",
        "start-icon": e.searchIcon,
        disabled: e.computedDisabled,
        status: e.status
      }, e.otherAttrs, {
        onKeydown: Ie(e.handleSubmit, ["enter"]),
        onInput: t[1] || (t[1] = (u) => e.$emit("input", u)),
        onChange: t[2] || (t[2] = (u) => e.$emit("change", u)),
        onFocus: t[3] || (t[3] = (u) => e.$emit("focus", u)),
        onBlur: t[4] || (t[4] = (u) => e.$emit("blur", u))
      }), null, 16, ["modelValue", "start-icon", "disabled", "status", "onKeydown"]),
      D(e.$slots, "default")
    ]),
    e.buttonLabel ? (p(), A(i, {
      key: 0,
      class: "cdx-search-input__end-button",
      disabled: e.computedDisabled,
      onClick: e.handleSubmit
    }, {
      default: H(() => [
        ae(B(e.buttonLabel), 1)
      ]),
      _: 1
    }, 8, ["disabled", "onClick"])) : x("", !0)
  ], 6);
}
const Mn = /* @__PURE__ */ F(wn, [["render", kn]]), Tn = E({
  name: "CdxTypeaheadSearch",
  components: {
    CdxIcon: fe,
    CdxMenu: on,
    CdxSearchInput: Mn
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
      default: ct
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
    const s = b(), r = b(), o = Ae("typeahead-search-menu"), i = b(!1), u = b(!1), d = b(!1), m = b(!1), C = b(e.initialInputValue), g = b(""), k = h(() => {
      var f, l;
      return (l = (f = r.value) == null ? void 0 : f.getHighlightedMenuItem()) == null ? void 0 : l.id;
    }), w = b(null), M = h(() => ({
      "cdx-typeahead-search__menu-message--has-thumbnail": e.showThumbnail
    })), I = h(
      () => e.searchResults.find(
        (f) => f.value === w.value
      )
    ), Y = h(
      () => e.searchFooterUrl ? { value: j, url: e.searchFooterUrl } : void 0
    ), Z = h(() => ({
      "cdx-typeahead-search--show-thumbnail": e.showThumbnail,
      "cdx-typeahead-search--expanded": i.value,
      "cdx-typeahead-search--auto-expand-width": e.showThumbnail && e.autoExpandWidth
    })), {
      rootClasses: ee,
      rootStyle: oe,
      otherAttrs: se
    } = pe(t, Z);
    function $(f) {
      return f;
    }
    const T = h(() => ({
      visibleItemLimit: e.visibleItemLimit,
      showThumbnail: e.showThumbnail,
      // In case search queries aren't highlighted, default to a bold label.
      boldLabel: !0,
      hideDescriptionOverflow: !0
    }));
    let R, N;
    function ie(f, l = !1) {
      I.value && I.value.label !== f && I.value.value !== f && (w.value = null), N !== void 0 && (clearTimeout(N), N = void 0), f === "" ? i.value = !1 : (u.value = !0, a["search-results-pending"] && (N = setTimeout(() => {
        m.value && (i.value = !0), d.value = !0;
      }, ht))), R !== void 0 && (clearTimeout(R), R = void 0);
      const c = () => {
        n("input", f);
      };
      l ? c() : R = setTimeout(() => {
        c();
      }, e.debounceInterval);
    }
    function O(f) {
      if (f === j) {
        w.value = null, C.value = g.value;
        return;
      }
      w.value = f, f !== null && (C.value = I.value ? I.value.label || String(I.value.value) : "");
    }
    function q() {
      m.value = !0, (g.value || d.value) && (i.value = !0);
    }
    function Q() {
      m.value = !1, i.value = !1;
    }
    function te(f) {
      const y = f, { id: l } = y, c = ne(y, ["id"]);
      if (c.value === j) {
        n("search-result-click", {
          searchResult: null,
          index: e.searchResults.length,
          numberOfResults: e.searchResults.length
        });
        return;
      }
      ue(c);
    }
    function ue(f) {
      const l = {
        searchResult: f,
        index: e.searchResults.findIndex(
          (c) => c.value === f.value
        ),
        numberOfResults: e.searchResults.length
      };
      n("search-result-click", l);
    }
    function me(f) {
      if (f.value === j) {
        C.value = g.value;
        return;
      }
      C.value = f.value ? f.label || String(f.value) : "";
    }
    function ve(f) {
      var l;
      i.value = !1, (l = r.value) == null || l.clearActive(), te(f);
    }
    function ge(f) {
      if (I.value)
        ue(I.value), f.stopPropagation(), window.location.assign(I.value.url), f.preventDefault();
      else {
        const l = {
          searchResult: null,
          index: -1,
          numberOfResults: e.searchResults.length
        };
        n("submit", l);
      }
    }
    function ye(f) {
      if (!r.value || !g.value || f.key === " ")
        return;
      const l = r.value.getHighlightedMenuItem(), c = r.value.getHighlightedViaKeyboard();
      switch (f.key) {
        case "Enter":
          l && (l.value === j && c ? window.location.assign(e.searchFooterUrl) : r.value.delegateKeyNavigation(f, { prevent: !1 })), i.value = !1;
          break;
        case "Tab":
          i.value = !1;
          break;
        default:
          r.value.delegateKeyNavigation(f);
          break;
      }
    }
    return X(() => {
      e.initialInputValue && ie(e.initialInputValue, !0);
    }), G(z(e, "searchResults"), () => {
      g.value = C.value.trim(), m.value && u.value && g.value.length > 0 && (i.value = !0), N !== void 0 && (clearTimeout(N), N = void 0), u.value = !1, d.value = !1;
    }), {
      form: s,
      menu: r,
      menuId: o,
      highlightedId: k,
      selection: w,
      menuMessageClass: M,
      footer: Y,
      asSearchResult: $,
      inputValue: C,
      searchQuery: g,
      expanded: i,
      showPending: d,
      rootClasses: ee,
      rootStyle: oe,
      otherAttrs: se,
      menuConfig: T,
      onUpdateInputValue: ie,
      onUpdateMenuSelection: O,
      onFocus: q,
      onBlur: Q,
      onSearchResultClick: te,
      onSearchResultKeyboardNavigation: me,
      onSearchFooterClick: ve,
      onSubmit: ge,
      onKeydown: ye,
      MenuFooterValue: j,
      articleIcon: Ye
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
const Vn = ["id", "action"], Bn = { class: "cdx-typeahead-search__menu-message__text" }, Ln = { class: "cdx-typeahead-search__menu-message__text" }, Kn = ["href", "onClickCapture"], An = { class: "cdx-menu-item__text cdx-typeahead-search__search-footer__text" }, Rn = { class: "cdx-typeahead-search__search-footer__query" };
function Dn(e, t, n, a, s, r) {
  const o = K("cdx-icon"), i = K("cdx-menu"), u = K("cdx-search-input");
  return p(), v("div", {
    class: L(["cdx-typeahead-search", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    S("form", {
      id: e.id,
      ref: "form",
      class: "cdx-typeahead-search__form",
      action: e.formAction,
      onSubmit: t[4] || (t[4] = (...d) => e.onSubmit && e.onSubmit(...d))
    }, [
      W(u, J({
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
        default: H(() => [
          W(i, J({
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
            pending: H(() => [
              S("div", {
                class: L(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                S("span", Bn, [
                  D(e.$slots, "search-results-pending")
                ])
              ], 2)
            ]),
            "no-results": H(() => [
              S("div", {
                class: L(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                S("span", Ln, [
                  D(e.$slots, "search-no-results-text")
                ])
              ], 2)
            ]),
            default: H(({ menuItem: d, active: m }) => [
              d.value === e.MenuFooterValue ? (p(), v("a", {
                key: 0,
                class: L(["cdx-menu-item__content cdx-typeahead-search__search-footer", {
                  "cdx-typeahead-search__search-footer__active": m
                }]),
                href: e.asSearchResult(d).url,
                onClickCapture: Se((C) => e.onSearchFooterClick(e.asSearchResult(d)), ["stop"])
              }, [
                W(o, {
                  class: "cdx-menu-item__thumbnail cdx-typeahead-search__search-footer__icon",
                  icon: e.articleIcon
                }, null, 8, ["icon"]),
                S("span", An, [
                  D(e.$slots, "search-footer-text", { searchQuery: e.searchQuery }, () => [
                    S("strong", Rn, B(e.searchQuery), 1)
                  ])
                ])
              ], 42, Kn)) : x("", !0)
            ]),
            _: 3
          }, 16, ["id", "expanded", "show-pending", "selected", "menu-items", "footer", "search-query", "show-no-results-slot", "aria-label", "onUpdate:selected", "onMenuItemKeyboardNavigation"])
        ]),
        _: 3
      }, 16, ["modelValue", "button-label", "aria-controls", "aria-expanded", "aria-activedescendant", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
      D(e.$slots, "default")
    ], 40, Vn)
  ], 6);
}
const Nn = /* @__PURE__ */ F(Tn, [["render", Dn]]);
export {
  Nn as CdxTypeaheadSearch
};
