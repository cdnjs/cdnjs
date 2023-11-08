var Ne = Object.defineProperty, Oe = Object.defineProperties;
var qe = Object.getOwnPropertyDescriptors;
var de = Object.getOwnPropertySymbols;
var ke = Object.prototype.hasOwnProperty, xe = Object.prototype.propertyIsEnumerable;
var Ie = (e, t, n) => t in e ? Ne(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Me = (e, t) => {
  for (var n in t || (t = {}))
    ke.call(t, n) && Ie(e, n, t[n]);
  if (de)
    for (var n of de(t))
      xe.call(t, n) && Ie(e, n, t[n]);
  return e;
}, Te = (e, t) => Oe(e, qe(t));
var ne = (e, t) => {
  var n = {};
  for (var l in e)
    ke.call(e, l) && t.indexOf(l) < 0 && (n[l] = e[l]);
  if (e != null && de)
    for (var l of de(e))
      t.indexOf(l) < 0 && xe.call(e, l) && (n[l] = e[l]);
  return n;
};
var Ce = (e, t, n) => new Promise((l, i) => {
  var r = (s) => {
    try {
      u(n.next(s));
    } catch (d) {
      i(d);
    }
  }, o = (s) => {
    try {
      u(n.throw(s));
    } catch (d) {
      i(d);
    }
  }, u = (s) => s.done ? l(s.value) : Promise.resolve(s.value).then(r, o);
  u((n = n.apply(e, t)).next());
});
import { ref as C, onMounted as X, defineComponent as E, computed as h, openBlock as p, createElementBlock as g, normalizeClass as L, toDisplayString as B, createCommentVNode as k, resolveComponent as K, createVNode as W, Transition as He, withCtx as H, normalizeStyle as le, createElementVNode as _, createTextVNode as ae, withModifiers as we, renderSlot as D, createBlock as A, resolveDynamicComponent as ze, Fragment as Se, warn as Ve, watch as G, getCurrentInstance as Ue, onUnmounted as Be, toRef as z, nextTick as ce, withDirectives as Le, mergeProps as J, renderList as Qe, vShow as Pe, Comment as je, withKeys as _e, inject as fe, vModelDynamic as We } from "vue";
const Ge = '<path d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"/><circle cx="10" cy="10" r="3"/>', Je = '<path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"/>', Xe = '<path d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"/><path d="M19 5H1V3h18zm0 12H1v-2h18z"/>', Ye = '<path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"/>', Ze = Ge, et = Je, tt = Xe, nt = Ye;
function at(e, t, n) {
  if (typeof e == "string" || "path" in e)
    return e;
  if ("shouldFlip" in e)
    return e.ltr;
  if ("rtl" in e)
    return n === "rtl" ? e.rtl : e.ltr;
  const l = t in e.langCodeMap ? e.langCodeMap[t] : e.default;
  return typeof l == "string" || "path" in l ? l : l.ltr;
}
function lt(e, t) {
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
function ot(e) {
  const t = C(null);
  return X(() => {
    const n = window.getComputedStyle(e.value).direction;
    t.value = n === "ltr" || n === "rtl" ? n : null;
  }), t;
}
function st(e) {
  const t = C("");
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
const he = "cdx", it = [
  "default",
  "progressive",
  "destructive"
], ut = [
  "normal",
  "primary",
  "quiet"
], rt = [
  "medium",
  "large"
], dt = [
  "x-small",
  "small",
  "medium"
], ct = [
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
], Ke = [
  "default",
  "error"
], ht = 120, ft = 500, j = "cdx-menu-footer-item", pt = Symbol("CdxFieldInputId"), vt = Symbol("CdxFieldDescriptionId"), mt = Symbol("CdxFieldStatus"), gt = Symbol("CdxDisabled"), yt = "".concat(he, "-no-invert"), bt = U(dt), Ct = E({
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
      validator: bt
    }
  },
  setup(e) {
    const t = C(), n = ot(t), l = st(t), i = h(() => {
      var v;
      return (v = e.dir) != null ? v : n.value;
    }), r = h(() => {
      var v;
      return (v = e.lang) != null ? v : l.value;
    }), o = h(() => ({
      "cdx-icon--flipped": i.value === "rtl" && r.value !== null && lt(e.icon, r.value),
      ["cdx-icon--".concat(e.size)]: !0
    })), u = h(
      () => {
        var v, m;
        return at(e.icon, (v = r.value) != null ? v : "", (m = i.value) != null ? m : "ltr");
      }
    ), s = h(() => typeof u.value == "string" ? u.value : ""), d = h(() => typeof u.value != "string" ? u.value.path : "");
    return {
      rootElement: t,
      rootClasses: o,
      iconSvg: s,
      iconPath: d
    };
  }
});
const F = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [l, i] of t)
    n[l] = i;
  return n;
}, $t = ["aria-hidden"], St = { key: 0 }, _t = ["innerHTML"], wt = ["d"];
function It(e, t, n, l, i, r) {
  return p(), g("span", {
    ref: "rootElement",
    class: L(["cdx-icon", e.rootClasses])
  }, [
    (p(), g("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      "aria-hidden": e.iconLabel ? void 0 : !0
    }, [
      e.iconLabel ? (p(), g("title", St, B(e.iconLabel), 1)) : k("", !0),
      e.iconSvg ? (p(), g("g", {
        key: 1,
        innerHTML: e.iconSvg
      }, null, 8, _t)) : (p(), g("path", {
        key: 2,
        d: e.iconPath
      }, null, 8, wt))
    ], 8, $t))
  ], 2);
}
const pe = /* @__PURE__ */ F(Ct, [["render", It]]), kt = E({
  name: "CdxThumbnail",
  components: { CdxIcon: pe },
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
      default: tt
    }
  },
  setup: (e) => {
    const t = C(!1), n = C({}), l = (i) => {
      const r = i.replace(/([\\"\n])/g, "\\$1"), o = new Image();
      o.onload = () => {
        n.value = { backgroundImage: 'url("'.concat(r, '")') }, t.value = !0;
      }, o.onerror = () => {
        t.value = !1;
      }, o.src = r;
    };
    return X(() => {
      var i;
      (i = e.thumbnail) != null && i.url && l(e.thumbnail.url);
    }), {
      thumbnailStyle: n,
      thumbnailLoaded: t,
      NoInvertClass: yt
    };
  }
});
const xt = { class: "cdx-thumbnail" }, Mt = {
  key: 0,
  class: "cdx-thumbnail__placeholder"
};
function Tt(e, t, n, l, i, r) {
  const o = K("cdx-icon");
  return p(), g("span", xt, [
    e.thumbnailLoaded ? k("", !0) : (p(), g("span", Mt, [
      W(o, {
        icon: e.placeholderIcon,
        class: "cdx-thumbnail__placeholder__icon--vue"
      }, null, 8, ["icon"])
    ])),
    W(He, { name: "cdx-thumbnail__image" }, {
      default: H(() => [
        e.thumbnailLoaded ? (p(), g("span", {
          key: 0,
          style: le(e.thumbnailStyle),
          class: L([e.NoInvertClass, "cdx-thumbnail__image"])
        }, null, 6)) : k("", !0)
      ]),
      _: 1
    })
  ]);
}
const Vt = /* @__PURE__ */ F(kt, [["render", Tt]]);
function Bt(e) {
  return e.replace(/([\\{}()|.?*+\-^$[\]])/g, "\\$1");
}
const Lt = "[̀-ͯ҃-҉֑-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣঁ-ঃ়া-ৄেৈো-্ৗৢৣ৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑੰੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣஂா-ூெ-ைொ-்ௗఀ-ఄా-ౄె-ైొ-్ౕౖౢౣಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣංඃ්ා-ුූෘ-ෟෲෳัิ-ฺ็-๎ັິ-ູົຼ່-ໍ༹༘༙༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏႚ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝᠋-᠍ᢅᢆᢩᤠ-ᤫᤰ-᤻ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼᪰-᪾ᬀ-ᬄ᬴-᭄᭫-᭳ᮀ-ᮂᮡ-ᮭ᯦-᯳ᰤ-᰷᳐-᳔᳒-᳨᳭ᳲ-᳴᳷-᳹᷀-᷹᷻-᷿⃐-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯-꙲ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣠-꣱ꣿꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀ꧥꨩ-ꨶꩃꩌꩍꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭ﬞ︀-️︠-︯]";
function Kt(e, t) {
  if (!e)
    return [t, "", ""];
  const n = Bt(e), l = new RegExp(
    // Per https://www.regular-expressions.info/unicode.html, "any code point that is not a
    // combining mark can be followed by any number of combining marks." See also the
    // discussion in https://phabricator.wikimedia.org/T35242.
    n + Lt + "*",
    "i"
  ).exec(t);
  if (!l || l.index === void 0)
    return [t, "", ""];
  const i = l.index, r = i + l[0].length, o = t.slice(i, r), u = t.slice(0, i), s = t.slice(r, t.length);
  return [u, o, s];
}
const At = E({
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
    titleChunks: h(() => Kt(e.searchQuery, String(e.title)))
  })
});
const Rt = { class: "cdx-search-result-title" }, Dt = { class: "cdx-search-result-title__match" };
function Et(e, t, n, l, i, r) {
  return p(), g("span", Rt, [
    _("bdi", null, [
      ae(B(e.titleChunks[0]), 1),
      _("span", Dt, B(e.titleChunks[1]), 1),
      ae(B(e.titleChunks[2]), 1)
    ])
  ]);
}
const Ft = /* @__PURE__ */ F(At, [["render", Et]]), Nt = E({
  name: "CdxMenuItem",
  components: { CdxIcon: pe, CdxThumbnail: Vt, CdxSearchResultTitle: Ft },
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
    }, l = () => {
      t("change", "highlighted", !1);
    }, i = (v) => {
      v.button === 0 && t("change", "active", !0);
    }, r = () => {
      t("change", "selected", !0);
    }, o = h(() => e.searchQuery.length > 0), u = h(() => ({
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
    })), s = h(() => e.url ? "a" : "span"), d = h(() => e.label || String(e.value));
    return {
      onMouseMove: n,
      onMouseLeave: l,
      onMouseDown: i,
      onClick: r,
      highlightQuery: o,
      rootClasses: u,
      contentTag: s,
      title: d
    };
  }
});
const Ot = ["id", "aria-disabled", "aria-selected"], qt = { class: "cdx-menu-item__text" }, Ht = ["lang"], zt = ["lang"], Ut = ["lang"], Qt = ["lang"];
function Pt(e, t, n, l, i, r) {
  const o = K("cdx-thumbnail"), u = K("cdx-icon"), s = K("cdx-search-result-title");
  return p(), g("li", {
    id: e.id,
    role: "option",
    class: L(["cdx-menu-item", e.rootClasses]),
    "aria-disabled": e.disabled,
    "aria-selected": e.selected,
    onMousemove: t[0] || (t[0] = (...d) => e.onMouseMove && e.onMouseMove(...d)),
    onMouseleave: t[1] || (t[1] = (...d) => e.onMouseLeave && e.onMouseLeave(...d)),
    onMousedown: t[2] || (t[2] = we((...d) => e.onMouseDown && e.onMouseDown(...d), ["prevent"])),
    onClick: t[3] || (t[3] = (...d) => e.onClick && e.onClick(...d))
  }, [
    D(e.$slots, "default", {}, () => [
      (p(), A(ze(e.contentTag), {
        href: e.url ? e.url : void 0,
        class: "cdx-menu-item__content"
      }, {
        default: H(() => {
          var d, v, m, y, x, I;
          return [
            e.showThumbnail ? (p(), A(o, {
              key: 0,
              thumbnail: e.thumbnail,
              class: "cdx-menu-item__thumbnail"
            }, null, 8, ["thumbnail"])) : e.icon ? (p(), A(u, {
              key: 1,
              icon: e.icon,
              class: "cdx-menu-item__icon"
            }, null, 8, ["icon"])) : k("", !0),
            _("span", qt, [
              e.highlightQuery ? (p(), A(s, {
                key: 0,
                title: e.title,
                "search-query": e.searchQuery,
                lang: (d = e.language) == null ? void 0 : d.label
              }, null, 8, ["title", "search-query", "lang"])) : (p(), g("span", {
                key: 1,
                class: "cdx-menu-item__text__label",
                lang: (v = e.language) == null ? void 0 : v.label
              }, [
                _("bdi", null, B(e.title), 1)
              ], 8, Ht)),
              e.match ? (p(), g(Se, { key: 2 }, [
                ae(B(" ") + " "),
                e.highlightQuery ? (p(), A(s, {
                  key: 0,
                  title: e.match,
                  "search-query": e.searchQuery,
                  lang: (m = e.language) == null ? void 0 : m.match
                }, null, 8, ["title", "search-query", "lang"])) : (p(), g("span", {
                  key: 1,
                  class: "cdx-menu-item__text__match",
                  lang: (y = e.language) == null ? void 0 : y.match
                }, [
                  _("bdi", null, B(e.match), 1)
                ], 8, zt))
              ], 64)) : k("", !0),
              e.supportingText ? (p(), g(Se, { key: 3 }, [
                ae(B(" ") + " "),
                _("span", {
                  class: "cdx-menu-item__text__supporting-text",
                  lang: (x = e.language) == null ? void 0 : x.supportingText
                }, [
                  _("bdi", null, B(e.supportingText), 1)
                ], 8, Ut)
              ], 64)) : k("", !0),
              e.description ? (p(), g("span", {
                key: 4,
                class: "cdx-menu-item__text__description",
                lang: (I = e.language) == null ? void 0 : I.description
              }, [
                _("bdi", null, B(e.description), 1)
              ], 8, Qt)) : k("", !0)
            ])
          ];
        }),
        _: 1
      }, 8, ["href"]))
    ])
  ], 42, Ot);
}
const jt = /* @__PURE__ */ F(Nt, [["render", Pt]]);
function Ae(e, t) {
  if (e()) {
    Ve(t);
    return;
  }
  const n = G(e, (l) => {
    l && (Ve(t), n());
  });
}
const Wt = E({
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
    Ae(
      () => !e.inline && !t["aria-label"] && !t["aria-hidden"],
      "CdxProgressBar: Progress bars require one of the following attribute, aria-label or aria-hidden. See documentation on https://doc.wikimedia.org/codex/latest/components/demos/progressbar.html"
    );
    const n = h(() => ({
      "cdx-progress-bar--block": !e.inline,
      "cdx-progress-bar--inline": e.inline,
      "cdx-progress-bar--enabled": !e.disabled,
      "cdx-progress-bar--disabled": e.disabled
    })), l = h(() => e.inline ? "true" : void 0);
    return {
      rootClasses: n,
      computedAriaHidden: l
    };
  }
});
const Gt = ["aria-hidden", "aria-disabled"], Jt = /* @__PURE__ */ _("div", { class: "cdx-progress-bar__bar" }, null, -1), Xt = [
  Jt
];
function Yt(e, t, n, l, i, r) {
  return p(), g("div", {
    class: L(["cdx-progress-bar", e.rootClasses]),
    role: "progressbar",
    "aria-hidden": e.computedAriaHidden,
    "aria-disabled": e.disabled
  }, Xt, 10, Gt);
}
const Zt = /* @__PURE__ */ F(Wt, [["render", Yt]]);
let $e = 0;
function Re(e) {
  var l;
  const t = Ue(), n = (l = t == null ? void 0 : t.props.id) != null ? l : t == null ? void 0 : t.attrs.id;
  return e ? "".concat(he, "-").concat(e, "-").concat($e++) : n ? "".concat(he, "-").concat(n, "-").concat($e++) : "".concat(he, "-").concat($e++);
}
function en(e, t) {
  const n = C(!1);
  let l = !1;
  if (typeof window != "object" || !("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype))
    return n;
  const i = new window.IntersectionObserver(
    (r) => {
      const o = r[0];
      o && (n.value = o.isIntersecting);
    },
    t
  );
  return X(() => {
    l = !0, e.value && i.observe(e.value);
  }), Be(() => {
    l = !1, i.disconnect();
  }), G(e, (r) => {
    l && (i.disconnect(), n.value = !1, r && i.observe(r));
  }), n;
}
function ve(e, t = h(() => ({}))) {
  const n = h(() => {
    const r = ne(t.value, []);
    return e.class && e.class.split(" ").forEach((u) => {
      r[u] = !0;
    }), r;
  }), l = h(() => {
    if ("style" in e)
      return e.style;
  }), i = h(() => {
    const s = e, { class: r, style: o } = s;
    return ne(s, ["class", "style"]);
  });
  return {
    rootClasses: n,
    rootStyle: l,
    otherAttrs: i
  };
}
const tn = E({
  name: "CdxMenu",
  components: {
    CdxMenuItem: jt,
    CdxProgressBar: Zt
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
  setup(e, { emit: t, slots: n, attrs: l }) {
    const i = h(() => (e.footer && e.menuItems ? [...e.menuItems, e.footer] : e.menuItems).map((c) => Te(Me({}, c), {
      id: Re("menu-item")
    }))), r = h(() => n["no-results"] ? e.showNoResultsSlot !== null ? e.showNoResultsSlot : i.value.length === 0 : !1), o = C(null), u = C(!1), s = C(null), d = "additions removals";
    let v = "", m = null;
    function y() {
      v = "", m !== null && (clearTimeout(m), m = null);
    }
    function x() {
      m !== null && clearTimeout(m), m = setTimeout(y, 1500);
    }
    function I() {
      var a;
      return (a = i.value.find(
        (c) => c.value === e.selected
      )) != null ? a : null;
    }
    function M(a, c) {
      var b;
      if (!(c && c.disabled))
        switch (a) {
          case "selected":
            t("update:selected", (b = c == null ? void 0 : c.value) != null ? b : null), t("update:expanded", !1), s.value = null;
            break;
          case "highlighted":
            o.value = c != null ? c : null, u.value = !1;
            break;
          case "highlightedViaKeyboard":
            o.value = c != null ? c : null, u.value = !0;
            break;
          case "active":
            s.value = c != null ? c : null;
            break;
        }
    }
    const S = h(() => {
      if (o.value !== null)
        return i.value.findIndex(
          (a) => (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            a.value === o.value.value
          )
        );
    });
    function Y(a) {
      a && (M("highlightedViaKeyboard", a), t("menu-item-keyboard-navigation", a));
    }
    function Z(a) {
      var w;
      const c = (P) => {
        for (let V = P - 1; V >= 0; V--)
          if (!i.value[V].disabled)
            return i.value[V];
      };
      a = a != null ? a : i.value.length;
      const b = (w = c(a)) != null ? w : c(i.value.length);
      Y(b);
    }
    function ee(a) {
      var w;
      const c = (P) => i.value.find((V, re) => !V.disabled && re > P);
      a = a != null ? a : -1;
      const b = (w = c(a)) != null ? w : c(-1);
      Y(b);
    }
    function oe(a) {
      if (a.key === "Clear")
        return y(), !0;
      if (a.key === "Backspace")
        return v = v.slice(0, -1), x(), !0;
      if (a.key.length === 1 && !a.metaKey && !a.ctrlKey && !a.altKey) {
        e.expanded || t("update:expanded", !0), v += a.key.toLowerCase();
        const c = v.length > 1 && v.split("").every((V) => V === v[0]);
        let b = i.value, w = v;
        c && S.value !== void 0 && (b = b.slice(S.value + 1).concat(b.slice(0, S.value)), w = v[0]);
        const P = b.find(
          (V) => {
            var re;
            return !V.disabled && String((re = V.label) != null ? re : V.value).toLowerCase().startsWith(w);
          }
        );
        return P && (M("highlightedViaKeyboard", P), O()), x(), !0;
      }
      return !1;
    }
    function se(a, { prevent: c = !0, characterNavigation: b = !1 } = {}) {
      if (b) {
        if (oe(a))
          return !0;
        y();
      }
      function w() {
        c && (a.preventDefault(), a.stopPropagation());
      }
      switch (a.key) {
        case "Enter":
        case " ":
          return w(), e.expanded ? (o.value && u.value && t("update:selected", o.value.value), t("update:expanded", !1)) : t("update:expanded", !0), !0;
        case "Tab":
          return e.expanded && (o.value && u.value && t("update:selected", o.value.value), t("update:expanded", !1)), !0;
        case "ArrowUp":
          return w(), e.expanded ? (o.value === null && M("highlightedViaKeyboard", I()), Z(S.value)) : t("update:expanded", !0), O(), !0;
        case "ArrowDown":
          return w(), e.expanded ? (o.value === null && M("highlightedViaKeyboard", I()), ee(S.value)) : t("update:expanded", !0), O(), !0;
        case "Home":
          return w(), e.expanded ? (o.value === null && M("highlightedViaKeyboard", I()), ee()) : t("update:expanded", !0), O(), !0;
        case "End":
          return w(), e.expanded ? (o.value === null && M("highlightedViaKeyboard", I()), Z()) : t("update:expanded", !0), O(), !0;
        case "Escape":
          return w(), t("update:expanded", !1), !0;
        default:
          return !1;
      }
    }
    function $() {
      M("active", null);
    }
    const T = [], R = C(void 0), N = en(
      R,
      { threshold: 0.8 }
    );
    G(N, (a) => {
      a && t("load-more");
    });
    function ie(a, c) {
      if (a) {
        T[c] = a.$el;
        const b = e.visibleItemLimit;
        if (!b || e.menuItems.length < b)
          return;
        const w = Math.min(
          b,
          Math.max(2, Math.floor(0.2 * e.menuItems.length))
        );
        c === e.menuItems.length - w && (R.value = a.$el);
      }
    }
    function O() {
      if (!e.visibleItemLimit || e.visibleItemLimit > e.menuItems.length || S.value === void 0)
        return;
      const a = S.value >= 0 ? S.value : 0;
      T[a].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
    const q = C(null), Q = C(null);
    function te() {
      if (Q.value = null, !e.visibleItemLimit || T.length <= e.visibleItemLimit) {
        q.value = null;
        return;
      }
      const a = T[0], c = T[e.visibleItemLimit];
      if (q.value = ue(
        a,
        c
      ), e.footer) {
        const b = T[T.length - 1];
        Q.value = b.scrollHeight;
      }
    }
    function ue(a, c) {
      const b = a.getBoundingClientRect().top;
      return c.getBoundingClientRect().top - b + 2;
    }
    X(() => {
      document.addEventListener("mouseup", $);
    }), Be(() => {
      document.removeEventListener("mouseup", $);
    }), G(z(e, "expanded"), (a) => Ce(this, null, function* () {
      if (a) {
        const c = I();
        c && !o.value && M("highlighted", c), yield ce(), te(), yield ce(), O();
      } else
        M("highlighted", null);
    })), G(z(e, "menuItems"), (a) => Ce(this, null, function* () {
      a.length < T.length && (T.length = a.length), e.expanded && (yield ce(), te(), yield ce(), O());
    }), { deep: !0 });
    const me = h(() => ({
      "max-height": q.value ? "".concat(q.value, "px") : void 0,
      "overflow-y": q.value ? "scroll" : void 0,
      "margin-bottom": Q.value ? "".concat(Q.value, "px") : void 0
    })), ge = h(() => ({
      "cdx-menu--has-footer": !!e.footer,
      "cdx-menu--has-sticky-footer": !!e.footer && !!q.value
    })), {
      rootClasses: ye,
      rootStyle: be,
      otherAttrs: f
    } = ve(l, ge);
    return {
      listBoxStyle: me,
      rootClasses: ye,
      rootStyle: be,
      otherAttrs: f,
      assignTemplateRef: ie,
      computedMenuItems: i,
      computedShowNoResultsSlot: r,
      highlightedMenuItem: o,
      highlightedViaKeyboard: u,
      activeMenuItem: s,
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
const nn = ["aria-live", "aria-relevant"], an = {
  key: 0,
  class: "cdx-menu__pending cdx-menu-item"
}, ln = {
  key: 1,
  class: "cdx-menu__no-results cdx-menu-item"
};
function on(e, t, n, l, i, r) {
  const o = K("cdx-menu-item"), u = K("cdx-progress-bar");
  return Le((p(), g("div", {
    class: L(["cdx-menu", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    _("ul", J({
      class: "cdx-menu__listbox",
      role: "listbox",
      style: e.listBoxStyle,
      "aria-live": e.showPending ? "polite" : void 0,
      "aria-relevant": e.showPending ? e.ariaRelevant : void 0
    }, e.otherAttrs), [
      e.showPending && e.computedMenuItems.length === 0 && e.$slots.pending ? (p(), g("li", an, [
        D(e.$slots, "pending")
      ])) : k("", !0),
      e.computedShowNoResultsSlot ? (p(), g("li", ln, [
        D(e.$slots, "no-results")
      ])) : k("", !0),
      (p(!0), g(Se, null, Qe(e.computedMenuItems, (s, d) => {
        var v, m;
        return p(), A(o, J({
          key: s.value,
          ref_for: !0,
          ref: (y) => e.assignTemplateRef(y, d)
        }, s, {
          selected: s.value === e.selected,
          active: s.value === ((v = e.activeMenuItem) == null ? void 0 : v.value),
          highlighted: s.value === ((m = e.highlightedMenuItem) == null ? void 0 : m.value),
          "show-thumbnail": e.showThumbnail,
          "bold-label": e.boldLabel,
          "hide-description-overflow": e.hideDescriptionOverflow,
          "search-query": e.searchQuery,
          onChange: (y, x) => e.handleMenuItemChange(y, x ? s : null),
          onClick: (y) => e.$emit("menu-item-click", s)
        }), {
          default: H(() => {
            var y, x;
            return [
              D(e.$slots, "default", {
                menuItem: s,
                active: s.value === ((y = e.activeMenuItem) == null ? void 0 : y.value) && s.value === ((x = e.highlightedMenuItem) == null ? void 0 : x.value)
              })
            ];
          }),
          _: 2
        }, 1040, ["selected", "active", "highlighted", "show-thumbnail", "bold-label", "hide-description-overflow", "search-query", "onChange", "onClick"]);
      }), 128)),
      e.showPending ? (p(), A(u, {
        key: 2,
        class: "cdx-menu__progress-bar",
        inline: !0
      })) : k("", !0)
    ], 16, nn)
  ], 6)), [
    [Pe, e.expanded]
  ]);
}
const sn = /* @__PURE__ */ F(tn, [["render", on]]);
function De(e) {
  const t = [];
  for (const n of e)
    // HTML tag
    typeof n.type == "string" || // Component
    typeof n.type == "object" ? t.push(n) : n.type !== je && (typeof n.children == "string" && n.children.trim() !== "" ? t.push(n.children) : Array.isArray(n.children) && t.push(...De(n.children)));
  return t;
}
function un(e, t) {
  return typeof e.type == "object" && "name" in e.type ? t !== void 0 ? e.type.name === t : !0 : !1;
}
function rn(e, t) {
  return typeof e.type == "string" ? t !== void 0 ? e.type === t.toLowerCase() : !0 : !1;
}
function dn(e) {
  const t = typeof e == "function" ? e() : e;
  return t ? De(t) : [];
}
function cn(e, t, n) {
  const l = h(() => {
    const i = dn(e);
    if (i.length !== 1)
      return !1;
    const r = i[0];
    return !!(typeof r == "object" && (un(r, "CdxIcon") || rn(r, "svg")));
  });
  return Ae(
    () => l.value && !t["aria-label"] && !t["aria-hidden"],
    "".concat(n, ": Icon-only buttons require one of the following attributes: aria-label or aria-hidden. See documentation at https://doc.wikimedia.org/codex/latest/components/demos/button.html#icon-only-button")
  ), l;
}
const hn = U(it), fn = U(ut), pn = U(rt), vn = E({
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
      validator: hn
    },
    /**
     * Visual prominence of the button.
     *
     * @values 'normal', 'primary', 'quiet'
     */
    weight: {
      type: String,
      default: "normal",
      validator: fn
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
      validator: pn
    }
  },
  emits: ["click"],
  setup(e, { emit: t, slots: n, attrs: l }) {
    const i = cn(n.default, l, "CdxButton"), r = C(!1);
    return {
      rootClasses: h(() => ({
        ["cdx-button--action-".concat(e.action)]: !0,
        ["cdx-button--weight-".concat(e.weight)]: !0,
        ["cdx-button--size-".concat(e.size)]: !0,
        "cdx-button--framed": e.weight !== "quiet",
        "cdx-button--icon-only": i.value,
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
function mn(e, t, n, l, i, r) {
  return p(), g("button", {
    class: L(["cdx-button", e.rootClasses]),
    onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o)),
    onKeydown: t[1] || (t[1] = _e((o) => e.setActive(!0), ["space", "enter"])),
    onKeyup: t[2] || (t[2] = _e((o) => e.setActive(!1), ["space", "enter"]))
  }, [
    D(e.$slots, "default")
  ], 34);
}
const gn = /* @__PURE__ */ F(vn, [["render", mn]]);
function Ee(e, t, n) {
  return h({
    get: () => e.value,
    set: (l) => (
      // If eventName is undefined, then 'update:modelValue' must be a valid EventName,
      // but TypeScript's type analysis isn't clever enough to realize that
      t(n || "update:modelValue", l)
    )
  });
}
function yn(e) {
  const t = fe(gt, C(!1));
  return h(() => t.value || e.value);
}
function Fe(e, t, n) {
  const l = yn(e), i = fe(mt, C("default")), r = h(() => t != null && t.value && t.value !== "default" ? t.value : i.value), o = fe(pt, void 0), u = h(() => {
    var s;
    return (s = o == null ? void 0 : o.value) != null ? s : n;
  });
  return {
    computedDisabled: l,
    computedStatus: r,
    computedInputId: u
  };
}
const bn = U(ct), Cn = U(Ke), $n = E({
  name: "CdxTextInput",
  components: { CdxIcon: pe },
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
      validator: bn
    },
    /**
     * `status` attribute of the input.
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: Cn
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
    const l = n.id, {
      computedDisabled: i,
      computedStatus: r,
      computedInputId: o
    } = Fe(
      z(e, "disabled"),
      z(e, "status"),
      l
    ), u = fe(vt, void 0), s = Ee(z(e, "modelValue"), t), d = h(() => e.clearable && !!s.value && !i.value), v = h(() => ({
      "cdx-text-input--has-start-icon": !!e.startIcon,
      "cdx-text-input--has-end-icon": !!e.endIcon,
      "cdx-text-input--clearable": d.value,
      ["cdx-text-input--status-".concat(r.value)]: !0
    })), {
      rootClasses: m,
      rootStyle: y,
      otherAttrs: x
    } = ve(n, v), I = h(() => {
      const R = x.value, { id: $ } = R;
      return ne(R, ["id"]);
    }), M = h(() => ({
      "cdx-text-input__input--has-value": !!s.value
    }));
    return {
      computedInputId: o,
      descriptionId: u,
      wrappedModel: s,
      isClearable: d,
      rootClasses: m,
      rootStyle: y,
      otherAttrsMinusId: I,
      inputClasses: M,
      computedDisabled: i,
      onClear: ($) => {
        s.value = "", t("clear", $);
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
      cdxIconClear: et
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
const Sn = ["id", "type", "aria-describedby", "disabled"];
function _n(e, t, n, l, i, r) {
  const o = K("cdx-icon");
  return p(), g("div", {
    class: L(["cdx-text-input", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    Le(_("input", J({
      id: e.computedInputId,
      ref: "input",
      "onUpdate:modelValue": t[0] || (t[0] = (u) => e.wrappedModel = u),
      class: ["cdx-text-input__input", e.inputClasses]
    }, e.otherAttrsMinusId, {
      type: e.inputType,
      "aria-describedby": e.descriptionId,
      disabled: e.computedDisabled,
      size: "1",
      onInput: t[1] || (t[1] = (...u) => e.onInput && e.onInput(...u)),
      onChange: t[2] || (t[2] = (...u) => e.onChange && e.onChange(...u)),
      onFocus: t[3] || (t[3] = (...u) => e.onFocus && e.onFocus(...u)),
      onBlur: t[4] || (t[4] = (...u) => e.onBlur && e.onBlur(...u)),
      onKeydown: t[5] || (t[5] = (...u) => e.onKeydown && e.onKeydown(...u))
    }), null, 16, Sn), [
      [We, e.wrappedModel]
    ]),
    e.startIcon ? (p(), A(o, {
      key: 0,
      icon: e.startIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__start-icon"
    }, null, 8, ["icon"])) : k("", !0),
    e.endIcon ? (p(), A(o, {
      key: 1,
      icon: e.endIcon,
      class: "cdx-text-input__icon-vue cdx-text-input__end-icon"
    }, null, 8, ["icon"])) : k("", !0),
    e.isClearable ? (p(), A(o, {
      key: 2,
      icon: e.cdxIconClear,
      class: "cdx-text-input__icon-vue cdx-text-input__clear-icon",
      onMousedown: t[6] || (t[6] = we(() => {
      }, ["prevent"])),
      onClick: e.onClear
    }, null, 8, ["icon", "onClick"])) : k("", !0)
  ], 6);
}
const wn = /* @__PURE__ */ F($n, [["render", _n]]), In = U(Ke), kn = E({
  name: "CdxSearchInput",
  components: {
    CdxButton: gn,
    CdxTextInput: wn
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
      validator: In
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
    const l = Ee(z(e, "modelValue"), t), { computedDisabled: i } = Fe(z(e, "disabled")), r = h(() => ({
      "cdx-search-input--has-end-button": !!e.buttonLabel
    })), {
      rootClasses: o,
      rootStyle: u,
      otherAttrs: s
    } = ve(n, r);
    return {
      wrappedModel: l,
      computedDisabled: i,
      rootClasses: o,
      rootStyle: u,
      otherAttrs: s,
      handleSubmit: () => {
        t("submit-click", l.value);
      },
      searchIcon: nt
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
function Mn(e, t, n, l, i, r) {
  const o = K("cdx-text-input"), u = K("cdx-button");
  return p(), g("div", {
    class: L(["cdx-search-input", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    _("div", xn, [
      W(o, J({
        ref: "textInput",
        modelValue: e.wrappedModel,
        "onUpdate:modelValue": t[0] || (t[0] = (s) => e.wrappedModel = s),
        class: "cdx-search-input__text-input",
        "input-type": "search",
        "start-icon": e.searchIcon,
        disabled: e.computedDisabled,
        status: e.status
      }, e.otherAttrs, {
        onKeydown: _e(e.handleSubmit, ["enter"]),
        onInput: t[1] || (t[1] = (s) => e.$emit("input", s)),
        onChange: t[2] || (t[2] = (s) => e.$emit("change", s)),
        onFocus: t[3] || (t[3] = (s) => e.$emit("focus", s)),
        onBlur: t[4] || (t[4] = (s) => e.$emit("blur", s))
      }), null, 16, ["modelValue", "start-icon", "disabled", "status", "onKeydown"]),
      D(e.$slots, "default")
    ]),
    e.buttonLabel ? (p(), A(u, {
      key: 0,
      class: "cdx-search-input__end-button",
      disabled: e.computedDisabled,
      onClick: e.handleSubmit
    }, {
      default: H(() => [
        ae(B(e.buttonLabel), 1)
      ]),
      _: 1
    }, 8, ["disabled", "onClick"])) : k("", !0)
  ], 6);
}
const Tn = /* @__PURE__ */ F(kn, [["render", Mn]]), Vn = E({
  name: "CdxTypeaheadSearch",
  components: {
    CdxIcon: pe,
    CdxMenu: sn,
    CdxSearchInput: Tn
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
      default: ht
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
  setup(e, { attrs: t, emit: n, slots: l }) {
    const i = C(), r = C(), o = Re("typeahead-search-menu"), u = C(!1), s = C(!1), d = C(!1), v = C(!1), m = C(e.initialInputValue), y = C(""), x = h(() => {
      var f, a;
      return (a = (f = r.value) == null ? void 0 : f.getHighlightedMenuItem()) == null ? void 0 : a.id;
    }), I = C(null), M = h(() => ({
      "cdx-typeahead-search__menu-message--has-thumbnail": e.showThumbnail
    })), S = h(
      () => e.searchResults.find(
        (f) => f.value === I.value
      )
    ), Y = h(
      () => e.searchFooterUrl ? { value: j, url: e.searchFooterUrl } : void 0
    ), Z = h(() => ({
      "cdx-typeahead-search--show-thumbnail": e.showThumbnail,
      "cdx-typeahead-search--expanded": u.value,
      "cdx-typeahead-search--auto-expand-width": e.showThumbnail && e.autoExpandWidth
    })), {
      rootClasses: ee,
      rootStyle: oe,
      otherAttrs: se
    } = ve(t, Z);
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
    function ie(f, a = !1) {
      S.value && S.value.label !== f && S.value.value !== f && (I.value = null), N !== void 0 && (clearTimeout(N), N = void 0), f === "" ? u.value = !1 : (s.value = !0, l["search-results-pending"] && (N = setTimeout(() => {
        v.value && (u.value = !0), d.value = !0;
      }, ft))), R !== void 0 && (clearTimeout(R), R = void 0);
      const c = () => {
        n("input", f);
      };
      a ? c() : R = setTimeout(() => {
        c();
      }, e.debounceInterval);
    }
    function O(f) {
      var a;
      if (f === j) {
        I.value = null, m.value = y.value;
        return;
      }
      I.value = f, f !== null && (m.value = S.value ? (a = S.value.label) != null ? a : String(S.value.value) : "");
    }
    function q() {
      v.value = !0, (y.value || d.value) && (u.value = !0);
    }
    function Q() {
      v.value = !1, u.value = !1;
    }
    function te(f) {
      const b = f, { id: a } = b, c = ne(b, ["id"]);
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
      const a = {
        searchResult: f,
        index: e.searchResults.findIndex(
          (c) => c.value === f.value
        ),
        numberOfResults: e.searchResults.length
      };
      n("search-result-click", a);
    }
    function me(f) {
      var a;
      if (f.value === j) {
        m.value = y.value;
        return;
      }
      m.value = f.value ? (a = f.label) != null ? a : String(f.value) : "";
    }
    function ge(f) {
      var a;
      u.value = !1, (a = r.value) == null || a.clearActive(), te(f);
    }
    function ye(f) {
      if (S.value)
        ue(S.value), f.stopPropagation(), window.location.assign(S.value.url), f.preventDefault();
      else {
        const a = {
          searchResult: null,
          index: -1,
          numberOfResults: e.searchResults.length
        };
        n("submit", a);
      }
    }
    function be(f) {
      if (!r.value || !y.value || f.key === " ")
        return;
      const a = r.value.getHighlightedMenuItem(), c = r.value.getHighlightedViaKeyboard();
      switch (f.key) {
        case "Enter":
          a && (a.value === j && c ? window.location.assign(e.searchFooterUrl) : r.value.delegateKeyNavigation(f, { prevent: !1 })), u.value = !1;
          break;
        case "Tab":
          u.value = !1;
          break;
        default:
          r.value.delegateKeyNavigation(f);
          break;
      }
    }
    return X(() => {
      e.initialInputValue && ie(e.initialInputValue, !0);
    }), G(z(e, "searchResults"), () => {
      y.value = m.value.trim(), v.value && s.value && y.value.length > 0 && (u.value = !0), N !== void 0 && (clearTimeout(N), N = void 0), s.value = !1, d.value = !1;
    }), {
      form: i,
      menu: r,
      menuId: o,
      highlightedId: x,
      selection: I,
      menuMessageClass: M,
      footer: Y,
      asSearchResult: $,
      inputValue: m,
      searchQuery: y,
      expanded: u,
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
      onSearchFooterClick: ge,
      onSubmit: ye,
      onKeydown: be,
      MenuFooterValue: j,
      articleIcon: Ze
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
const Bn = ["id", "action"], Ln = { class: "cdx-typeahead-search__menu-message__text" }, Kn = { class: "cdx-typeahead-search__menu-message__text" }, An = ["href", "onClickCapture"], Rn = { class: "cdx-menu-item__text cdx-typeahead-search__search-footer__text" }, Dn = { class: "cdx-typeahead-search__search-footer__query" };
function En(e, t, n, l, i, r) {
  const o = K("cdx-icon"), u = K("cdx-menu"), s = K("cdx-search-input");
  return p(), g("div", {
    class: L(["cdx-typeahead-search", e.rootClasses]),
    style: le(e.rootStyle)
  }, [
    _("form", {
      id: e.id,
      ref: "form",
      class: "cdx-typeahead-search__form",
      action: e.formAction,
      onSubmit: t[4] || (t[4] = (...d) => e.onSubmit && e.onSubmit(...d))
    }, [
      W(s, J({
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
          W(u, J({
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
              _("div", {
                class: L(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                _("span", Ln, [
                  D(e.$slots, "search-results-pending")
                ])
              ], 2)
            ]),
            "no-results": H(() => [
              _("div", {
                class: L(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
              }, [
                _("span", Kn, [
                  D(e.$slots, "search-no-results-text")
                ])
              ], 2)
            ]),
            default: H(({ menuItem: d, active: v }) => [
              d.value === e.MenuFooterValue ? (p(), g("a", {
                key: 0,
                class: L(["cdx-menu-item__content cdx-typeahead-search__search-footer", {
                  "cdx-typeahead-search__search-footer__active": v
                }]),
                href: e.asSearchResult(d).url,
                onClickCapture: we((m) => e.onSearchFooterClick(e.asSearchResult(d)), ["stop"])
              }, [
                W(o, {
                  class: "cdx-menu-item__thumbnail cdx-typeahead-search__search-footer__icon",
                  icon: e.articleIcon
                }, null, 8, ["icon"]),
                _("span", Rn, [
                  D(e.$slots, "search-footer-text", { searchQuery: e.searchQuery }, () => [
                    _("strong", Dn, B(e.searchQuery), 1)
                  ])
                ])
              ], 42, An)) : k("", !0)
            ]),
            _: 3
          }, 16, ["id", "expanded", "show-pending", "selected", "menu-items", "footer", "search-query", "show-no-results-slot", "aria-label", "onUpdate:selected", "onMenuItemKeyboardNavigation"])
        ]),
        _: 3
      }, 16, ["modelValue", "button-label", "aria-controls", "aria-expanded", "aria-activedescendant", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
      D(e.$slots, "default")
    ], 40, Bn)
  ], 6);
}
const On = /* @__PURE__ */ F(Vn, [["render", En]]);
export {
  On as CdxTypeaheadSearch
};
