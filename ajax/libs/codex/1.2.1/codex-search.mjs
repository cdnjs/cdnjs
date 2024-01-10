var Oe = Object.defineProperty, He = Object.defineProperties;
var qe = Object.getOwnPropertyDescriptors;
var ce = Object.getOwnPropertySymbols;
var xe = Object.prototype.hasOwnProperty, ke = Object.prototype.propertyIsEnumerable;
var Ie = (e, t, n) => t in e ? Oe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Me = (e, t) => {
  for (var n in t || (t = {}))
    xe.call(t, n) && Ie(e, n, t[n]);
  if (ce)
    for (var n of ce(t))
      ke.call(t, n) && Ie(e, n, t[n]);
  return e;
}, Te = (e, t) => He(e, qe(t));
var ae = (e, t) => {
  var n = {};
  for (var a in e)
    xe.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
  if (e != null && ce)
    for (var a of ce(e))
      t.indexOf(a) < 0 && ke.call(e, a) && (n[a] = e[a]);
  return n;
};
var he = (e, t, n) => new Promise((a, i) => {
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
  }, u = (s) => s.done ? a(s.value) : Promise.resolve(s.value).then(r, o);
  u((n = n.apply(e, t)).next());
});
import { ref as b, onMounted as Y, defineComponent as F, computed as h, openBlock as v, createElementBlock as m, normalizeClass as K, toDisplayString as L, createCommentVNode as k, resolveComponent as A, createVNode as G, Transition as Ue, withCtx as q, normalizeStyle as oe, createElementVNode as _, createTextVNode as le, withModifiers as we, renderSlot as E, createBlock as R, resolveDynamicComponent as ze, Fragment as Se, warn as Be, watch as J, getCurrentInstance as Qe, onUnmounted as Le, toRef as U, nextTick as Ve, withDirectives as Ke, mergeProps as X, renderList as Pe, vShow as je, Comment as We, withKeys as _e, inject as pe, vModelDynamic as Ge } from "vue";
const Je = '<path d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"/><circle cx="10" cy="10" r="3"/>', Xe = '<path d="M10 0a10 10 0 1010 10A10 10 0 0010 0m5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"/>', Ye = '<path d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"/><path d="M19 5H1V3h18zm0 12H1v-2h18z"/>', Ze = '<path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8"/>', et = Je, tt = Xe, nt = Ye, at = Ze;
function lt(e, t, n) {
  if (typeof e == "string" || "path" in e)
    return e;
  if ("shouldFlip" in e)
    return e.ltr;
  if ("rtl" in e)
    return n === "rtl" ? e.rtl : e.ltr;
  const a = t in e.langCodeMap ? e.langCodeMap[t] : e.default;
  return typeof a == "string" || "path" in a ? a : a.ltr;
}
function ot(e, t) {
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
  const t = b(null);
  return Y(() => {
    const n = window.getComputedStyle(e.value).direction;
    t.value = n === "ltr" || n === "rtl" ? n : null;
  }), t;
}
function it(e) {
  const t = b("");
  return Y(() => {
    let n = e.value;
    for (; n && n.lang === ""; )
      n = n.parentElement;
    t.value = n ? n.lang : null;
  }), t;
}
function z(e) {
  return (t) => typeof t == "string" && e.indexOf(t) !== -1;
}
const fe = "cdx", ut = [
  "default",
  "progressive",
  "destructive"
], rt = [
  "normal",
  "primary",
  "quiet"
], dt = [
  "medium",
  "large"
], ct = [
  "x-small",
  "small",
  "medium"
], ht = [
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
], Ae = [
  "default",
  "error"
], ft = 120, pt = 500, W = "cdx-menu-footer-item", vt = Symbol("CdxFieldInputId"), gt = Symbol("CdxFieldDescriptionId"), mt = Symbol("CdxFieldStatus"), yt = Symbol("CdxDisabled"), bt = "".concat(fe, "-no-invert"), Ct = z(ct), $t = F({
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
      validator: Ct
    }
  },
  setup(e) {
    const t = b(), n = st(t), a = it(t), i = h(() => {
      var p;
      return (p = e.dir) != null ? p : n.value;
    }), r = h(() => {
      var p;
      return (p = e.lang) != null ? p : a.value;
    }), o = h(() => ({
      "cdx-icon--flipped": i.value === "rtl" && r.value !== null && ot(e.icon, r.value),
      ["cdx-icon--".concat(e.size)]: !0
    })), u = h(
      () => {
        var p, g;
        return lt(e.icon, (p = r.value) != null ? p : "", (g = i.value) != null ? g : "ltr");
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
const N = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, i] of t)
    n[a] = i;
  return n;
}, St = ["aria-hidden"], _t = { key: 0 }, wt = ["innerHTML"], It = ["d"];
function xt(e, t, n, a, i, r) {
  return v(), m(
    "span",
    {
      ref: "rootElement",
      class: K(["cdx-icon", e.rootClasses])
    },
    [
      (v(), m("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        width: "20",
        height: "20",
        viewBox: "0 0 20 20",
        "aria-hidden": e.iconLabel ? void 0 : !0
      }, [
        e.iconLabel ? (v(), m(
          "title",
          _t,
          L(e.iconLabel),
          1
          /* TEXT */
        )) : k("v-if", !0),
        e.iconSvg ? (v(), m("g", {
          key: 1,
          innerHTML: e.iconSvg
        }, null, 8, wt)) : (v(), m("path", {
          key: 2,
          d: e.iconPath
        }, null, 8, It))
      ], 8, St))
    ],
    2
    /* CLASS */
  );
}
const ve = /* @__PURE__ */ N($t, [["render", xt]]), kt = F({
  name: "CdxThumbnail",
  components: { CdxIcon: ve },
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
      default: nt
    }
  },
  setup: (e) => {
    const t = b(!1), n = b({}), a = (i) => {
      const r = i.replace(/([\\"\n])/g, "\\$1"), o = new Image();
      o.onload = () => {
        n.value = { backgroundImage: 'url("'.concat(r, '")') }, t.value = !0;
      }, o.onerror = () => {
        t.value = !1;
      }, o.src = r;
    };
    return Y(() => {
      var i;
      (i = e.thumbnail) != null && i.url && a(e.thumbnail.url);
    }), {
      thumbnailStyle: n,
      thumbnailLoaded: t,
      NoInvertClass: bt
    };
  }
});
const Mt = { class: "cdx-thumbnail" }, Tt = {
  key: 0,
  class: "cdx-thumbnail__placeholder"
};
function Bt(e, t, n, a, i, r) {
  const o = A("cdx-icon");
  return v(), m("span", Mt, [
    e.thumbnailLoaded ? k("v-if", !0) : (v(), m("span", Tt, [
      G(o, {
        icon: e.placeholderIcon,
        class: "cdx-thumbnail__placeholder__icon--vue"
      }, null, 8, ["icon"])
    ])),
    G(Ue, { name: "cdx-thumbnail__image" }, {
      default: q(() => [
        e.thumbnailLoaded ? (v(), m(
          "span",
          {
            key: 0,
            style: oe(e.thumbnailStyle),
            class: K([e.NoInvertClass, "cdx-thumbnail__image"])
          },
          null,
          6
          /* CLASS, STYLE */
        )) : k("v-if", !0)
      ]),
      _: 1
      /* STABLE */
    })
  ]);
}
const Vt = /* @__PURE__ */ N(kt, [["render", Bt]]);
function Lt(e) {
  return e.replace(/([\\{}()|.?*+\-^$[\]])/g, "\\$1");
}
const Kt = "[̀-ͯ҃-҉֑-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣঁ-ঃ়া-ৄেৈো-্ৗৢৣ৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑੰੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣஂா-ூெ-ைொ-்ௗఀ-ఄా-ౄె-ైొ-్ౕౖౢౣಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣංඃ්ා-ුූෘ-ෟෲෳัิ-ฺ็-๎ັິ-ູົຼ່-ໍ༹༘༙༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏႚ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝᠋-᠍ᢅᢆᢩᤠ-ᤫᤰ-᤻ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼᪰-᪾ᬀ-ᬄ᬴-᭄᭫-᭳ᮀ-ᮂᮡ-ᮭ᯦-᯳ᰤ-᰷᳐-᳔᳒-᳨᳭ᳲ-᳴᳷-᳹᷀-᷹᷻-᷿⃐-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯-꙲ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣠-꣱ꣿꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀ꧥꨩ-ꨶꩃꩌꩍꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭ﬞ︀-️︠-︯]";
function At(e, t) {
  if (!e)
    return [t, "", ""];
  const n = Lt(e), a = new RegExp(
    // Per https://www.regular-expressions.info/unicode.html, "any code point that is not a
    // combining mark can be followed by any number of combining marks." See also the
    // discussion in https://phabricator.wikimedia.org/T35242.
    n + Kt + "*",
    "i"
  ).exec(t);
  if (!a || a.index === void 0)
    return [t, "", ""];
  const i = a.index, r = i + a[0].length, o = t.slice(i, r), u = t.slice(0, i), s = t.slice(r, t.length);
  return [u, o, s];
}
const Rt = F({
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
    titleChunks: h(() => At(e.searchQuery, String(e.title)))
  })
});
const Dt = { class: "cdx-search-result-title" }, Et = { class: "cdx-search-result-title__match" };
function Ft(e, t, n, a, i, r) {
  return v(), m("span", Dt, [
    _("bdi", null, [
      le(
        L(e.titleChunks[0]),
        1
        /* TEXT */
      ),
      _(
        "span",
        Et,
        L(e.titleChunks[1]),
        1
        /* TEXT */
      ),
      le(
        L(e.titleChunks[2]),
        1
        /* TEXT */
      )
    ])
  ]);
}
const Nt = /* @__PURE__ */ N(Rt, [["render", Ft]]), Ot = F({
  name: "CdxMenuItem",
  components: { CdxIcon: ve, CdxThumbnail: Vt, CdxSearchResultTitle: Nt },
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
    }, i = (p) => {
      p.button === 0 && t("change", "active", !0);
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
      onMouseLeave: a,
      onMouseDown: i,
      onClick: r,
      highlightQuery: o,
      rootClasses: u,
      contentTag: s,
      title: d
    };
  }
});
const Ht = ["id", "aria-disabled", "aria-selected"], qt = { class: "cdx-menu-item__text" }, Ut = ["lang"], zt = ["lang"], Qt = ["lang"], Pt = ["lang"];
function jt(e, t, n, a, i, r) {
  const o = A("cdx-thumbnail"), u = A("cdx-icon"), s = A("cdx-search-result-title");
  return v(), m("li", {
    id: e.id,
    role: "option",
    class: K(["cdx-menu-item", e.rootClasses]),
    "aria-disabled": e.disabled,
    "aria-selected": e.selected,
    onMousemove: t[0] || (t[0] = (...d) => e.onMouseMove && e.onMouseMove(...d)),
    onMouseleave: t[1] || (t[1] = (...d) => e.onMouseLeave && e.onMouseLeave(...d)),
    onMousedown: t[2] || (t[2] = we((...d) => e.onMouseDown && e.onMouseDown(...d), ["prevent"])),
    onClick: t[3] || (t[3] = (...d) => e.onClick && e.onClick(...d))
  }, [
    E(e.$slots, "default", {}, () => [
      (v(), R(ze(e.contentTag), {
        href: e.url ? e.url : void 0,
        class: "cdx-menu-item__content"
      }, {
        default: q(() => {
          var d, p, g, y, M, x;
          return [
            e.showThumbnail ? (v(), R(o, {
              key: 0,
              thumbnail: e.thumbnail,
              class: "cdx-menu-item__thumbnail"
            }, null, 8, ["thumbnail"])) : e.icon ? (v(), R(u, {
              key: 1,
              icon: e.icon,
              class: "cdx-menu-item__icon"
            }, null, 8, ["icon"])) : k("v-if", !0),
            _("span", qt, [
              e.highlightQuery ? (v(), R(s, {
                key: 0,
                title: e.title,
                "search-query": e.searchQuery,
                lang: (d = e.language) == null ? void 0 : d.label
              }, null, 8, ["title", "search-query", "lang"])) : (v(), m("span", {
                key: 1,
                class: "cdx-menu-item__text__label",
                lang: (p = e.language) == null ? void 0 : p.label
              }, [
                _(
                  "bdi",
                  null,
                  L(e.title),
                  1
                  /* TEXT */
                )
              ], 8, Ut)),
              e.match ? (v(), m(
                Se,
                { key: 2 },
                [
                  le(L(" ") + " "),
                  e.highlightQuery ? (v(), R(s, {
                    key: 0,
                    title: e.match,
                    "search-query": e.searchQuery,
                    lang: (g = e.language) == null ? void 0 : g.match
                  }, null, 8, ["title", "search-query", "lang"])) : (v(), m("span", {
                    key: 1,
                    class: "cdx-menu-item__text__match",
                    lang: (y = e.language) == null ? void 0 : y.match
                  }, [
                    _(
                      "bdi",
                      null,
                      L(e.match),
                      1
                      /* TEXT */
                    )
                  ], 8, zt))
                ],
                64
                /* STABLE_FRAGMENT */
              )) : k("v-if", !0),
              e.supportingText ? (v(), m(
                Se,
                { key: 3 },
                [
                  le(L(" ") + " "),
                  _("span", {
                    class: "cdx-menu-item__text__supporting-text",
                    lang: (M = e.language) == null ? void 0 : M.supportingText
                  }, [
                    _(
                      "bdi",
                      null,
                      L(e.supportingText),
                      1
                      /* TEXT */
                    )
                  ], 8, Qt)
                ],
                64
                /* STABLE_FRAGMENT */
              )) : k("v-if", !0),
              e.description ? (v(), m("span", {
                key: 4,
                class: "cdx-menu-item__text__description",
                lang: (x = e.language) == null ? void 0 : x.description
              }, [
                _(
                  "bdi",
                  null,
                  L(e.description),
                  1
                  /* TEXT */
                )
              ], 8, Pt)) : k("v-if", !0)
            ])
          ];
        }),
        _: 1
        /* STABLE */
      }, 8, ["href"]))
    ])
  ], 42, Ht);
}
const Wt = /* @__PURE__ */ N(Ot, [["render", jt]]);
function Re(e, t) {
  if (e()) {
    Be(t);
    return;
  }
  const n = J(e, (a) => {
    a && (Be(t), n());
  });
}
const Gt = F({
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
    Re(
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
const Jt = ["aria-hidden", "aria-disabled"], Xt = /* @__PURE__ */ _(
  "div",
  { class: "cdx-progress-bar__bar" },
  null,
  -1
  /* HOISTED */
), Yt = [
  Xt
];
function Zt(e, t, n, a, i, r) {
  return v(), m("div", {
    class: K(["cdx-progress-bar", e.rootClasses]),
    role: "progressbar",
    "aria-hidden": e.computedAriaHidden,
    "aria-disabled": e.disabled
  }, Yt, 10, Jt);
}
const en = /* @__PURE__ */ N(Gt, [["render", Zt]]);
let $e = 0;
function De(e) {
  var a;
  const t = Qe(), n = (a = t == null ? void 0 : t.props.id) != null ? a : t == null ? void 0 : t.attrs.id;
  return e ? "".concat(fe, "-").concat(e, "-").concat($e++) : n ? "".concat(fe, "-").concat(n, "-").concat($e++) : "".concat(fe, "-").concat($e++);
}
function tn(e, t) {
  const n = b(!1);
  let a = !1;
  if (typeof window != "object" || !("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype))
    return n;
  const i = new window.IntersectionObserver(
    (r) => {
      const o = r[0];
      o && (n.value = o.isIntersecting);
    },
    t
  );
  return Y(() => {
    a = !0, e.value && i.observe(e.value);
  }), Le(() => {
    a = !1, i.disconnect();
  }), J(e, (r) => {
    a && (i.disconnect(), n.value = !1, r && i.observe(r));
  }), n;
}
function ge(e, t = h(() => ({}))) {
  const n = h(() => {
    const r = ae(t.value, []);
    return e.class && e.class.split(" ").forEach((u) => {
      r[u] = !0;
    }), r;
  }), a = h(() => {
    if ("style" in e)
      return e.style;
  }), i = h(() => {
    const s = e, { class: r, style: o } = s;
    return ae(s, ["class", "style"]);
  });
  return {
    rootClasses: n,
    rootStyle: a,
    otherAttrs: i
  };
}
const nn = F({
  name: "CdxMenu",
  components: {
    CdxMenuItem: Wt,
    CdxProgressBar: en
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
    const i = h(() => (e.footer && e.menuItems ? [...e.menuItems, e.footer] : e.menuItems).map((c) => Te(Me({}, c), {
      id: De("menu-item")
    }))), r = h(() => n["no-results"] ? e.showNoResultsSlot !== null ? e.showNoResultsSlot : i.value.length === 0 : !1), o = b(null), u = b(!1), s = b(null), d = "additions removals";
    let p = "", g = null;
    function y() {
      p = "", g !== null && (clearTimeout(g), g = null);
    }
    function M() {
      g !== null && clearTimeout(g), g = setTimeout(y, 1500);
    }
    function x() {
      var l;
      return (l = i.value.find(
        (c) => c.value === e.selected
      )) != null ? l : null;
    }
    function T(l, c) {
      var w;
      if (!(c && c.disabled))
        switch (l) {
          case "selected":
            t("update:selected", (w = c == null ? void 0 : c.value) != null ? w : null), t("update:expanded", !1), s.value = null;
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
          (l) => (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            l.value === o.value.value
          )
        );
    });
    function Z(l) {
      l && (T("highlightedViaKeyboard", l), t("menu-item-keyboard-navigation", l));
    }
    function ee(l) {
      var I;
      const c = (j) => {
        for (let V = j - 1; V >= 0; V--)
          if (!i.value[V].disabled)
            return i.value[V];
      };
      l = l != null ? l : i.value.length;
      const w = (I = c(l)) != null ? I : c(i.value.length);
      Z(w);
    }
    function te(l) {
      var I;
      const c = (j) => i.value.find((V, de) => !V.disabled && de > j);
      l = l != null ? l : -1;
      const w = (I = c(l)) != null ? I : c(-1);
      Z(w);
    }
    function se(l) {
      if (l.key === "Clear")
        return y(), !0;
      if (l.key === "Backspace")
        return p = p.slice(0, -1), M(), !0;
      if (l.key.length === 1 && !l.metaKey && !l.ctrlKey && !l.altKey) {
        if (e.expanded || t("update:expanded", !0), l.key === " " && p.length < 1)
          return !1;
        p += l.key.toLowerCase();
        const c = p.length > 1 && p.split("").every((V) => V === p[0]);
        let w = i.value, I = p;
        c && S.value !== void 0 && (w = w.slice(S.value + 1).concat(w.slice(0, S.value)), I = p[0]);
        const j = w.find(
          (V) => {
            var de;
            return !V.disabled && String((de = V.label) != null ? de : V.value).toLowerCase().startsWith(I);
          }
        );
        return j && (T("highlightedViaKeyboard", j), H()), M(), !0;
      }
      return !1;
    }
    function ie(l, { prevent: c = !0, characterNavigation: w = !1 } = {}) {
      if (w) {
        if (se(l))
          return l.preventDefault(), !0;
        y();
      }
      function I() {
        c && (l.preventDefault(), l.stopPropagation());
      }
      switch (l.key) {
        case "Enter":
        case " ":
          return I(), e.expanded ? (o.value && u.value && t("update:selected", o.value.value), t("update:expanded", !1)) : t("update:expanded", !0), !0;
        case "Tab":
          return e.expanded && (o.value && u.value && t("update:selected", o.value.value), t("update:expanded", !1)), !0;
        case "ArrowUp":
          return I(), e.expanded ? (o.value === null && T("highlightedViaKeyboard", x()), ee(S.value)) : t("update:expanded", !0), H(), !0;
        case "ArrowDown":
          return I(), e.expanded ? (o.value === null && T("highlightedViaKeyboard", x()), te(S.value)) : t("update:expanded", !0), H(), !0;
        case "Home":
          return I(), e.expanded ? (o.value === null && T("highlightedViaKeyboard", x()), te()) : t("update:expanded", !0), H(), !0;
        case "End":
          return I(), e.expanded ? (o.value === null && T("highlightedViaKeyboard", x()), ee()) : t("update:expanded", !0), H(), !0;
        case "Escape":
          return I(), t("update:expanded", !1), !0;
        default:
          return !1;
      }
    }
    function $() {
      T("active", null);
    }
    const B = [], D = b(void 0), O = tn(
      D,
      { threshold: 0.8 }
    );
    J(O, (l) => {
      l && t("load-more");
    });
    function ue(l, c) {
      if (l) {
        B[c] = l.$el;
        const w = e.visibleItemLimit;
        if (!w || e.menuItems.length < w)
          return;
        const I = Math.min(
          w,
          Math.max(2, Math.floor(0.2 * e.menuItems.length))
        );
        c === e.menuItems.length - I && (D.value = l.$el);
      }
    }
    function H() {
      if (!e.visibleItemLimit || e.visibleItemLimit > e.menuItems.length || S.value === void 0)
        return;
      const l = S.value >= 0 ? S.value : 0;
      B[l].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
    const Q = b(null), P = b(null);
    function ne() {
      return he(this, null, function* () {
        yield Ve(), re(), me(), yield Ve(), H();
      });
    }
    function re() {
      if (e.footer) {
        const l = B[B.length - 1];
        P.value = l.scrollHeight;
      } else
        P.value = null;
    }
    function me() {
      if (!e.visibleItemLimit || B.length <= e.visibleItemLimit) {
        Q.value = null;
        return;
      }
      const l = B[0].getBoundingClientRect().top, c = B[e.visibleItemLimit].getBoundingClientRect().top;
      Q.value = c - l + 2;
    }
    Y(() => {
      document.addEventListener("mouseup", $);
    }), Le(() => {
      document.removeEventListener("mouseup", $);
    }), J(U(e, "expanded"), (l) => he(this, null, function* () {
      if (l) {
        const c = x();
        c && !o.value && T("highlighted", c), yield ne();
      } else
        T("highlighted", null);
    })), J(U(e, "menuItems"), (l) => he(this, null, function* () {
      l.length < B.length && (B.length = l.length), e.expanded && (yield ne());
    }), { deep: !0 });
    const ye = h(() => ({
      "max-height": Q.value ? "".concat(Q.value, "px") : void 0,
      "margin-bottom": P.value ? "".concat(P.value, "px") : void 0
    })), be = h(() => ({
      "cdx-menu--has-footer": !!e.footer
    })), {
      rootClasses: Ce,
      rootStyle: f,
      otherAttrs: C
    } = ge(a, be);
    return {
      listBoxStyle: ye,
      rootClasses: Ce,
      rootStyle: f,
      otherAttrs: C,
      assignTemplateRef: ue,
      computedMenuItems: i,
      computedShowNoResultsSlot: r,
      highlightedMenuItem: o,
      highlightedViaKeyboard: u,
      activeMenuItem: s,
      handleMenuItemChange: T,
      handleKeyNavigation: ie,
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
const an = ["aria-live", "aria-relevant"], ln = {
  key: 0,
  class: "cdx-menu__pending cdx-menu-item"
}, on = {
  key: 1,
  class: "cdx-menu__no-results cdx-menu-item"
};
function sn(e, t, n, a, i, r) {
  const o = A("cdx-menu-item"), u = A("cdx-progress-bar");
  return Ke((v(), m(
    "div",
    {
      class: K(["cdx-menu", e.rootClasses]),
      style: oe(e.rootStyle)
    },
    [
      _("ul", X({
        class: "cdx-menu__listbox",
        role: "listbox",
        style: e.listBoxStyle,
        "aria-live": e.showPending ? "polite" : void 0,
        "aria-relevant": e.showPending ? e.ariaRelevant : void 0
      }, e.otherAttrs), [
        e.showPending && e.computedMenuItems.length === 0 && e.$slots.pending ? (v(), m("li", ln, [
          E(e.$slots, "pending")
        ])) : k("v-if", !0),
        e.computedShowNoResultsSlot ? (v(), m("li", on, [
          E(e.$slots, "no-results")
        ])) : k("v-if", !0),
        (v(!0), m(
          Se,
          null,
          Pe(e.computedMenuItems, (s, d) => {
            var p, g;
            return v(), R(o, X({
              key: s.value,
              ref_for: !0,
              ref: (y) => e.assignTemplateRef(y, d)
            }, s, {
              selected: s.value === e.selected,
              active: s.value === ((p = e.activeMenuItem) == null ? void 0 : p.value),
              highlighted: s.value === ((g = e.highlightedMenuItem) == null ? void 0 : g.value),
              "show-thumbnail": e.showThumbnail,
              "bold-label": e.boldLabel,
              "hide-description-overflow": e.hideDescriptionOverflow,
              "search-query": e.searchQuery,
              onChange: (y, M) => e.handleMenuItemChange(y, M ? s : null),
              onClick: (y) => e.$emit("menu-item-click", s)
            }), {
              default: q(() => {
                var y, M;
                return [
                  E(e.$slots, "default", {
                    menuItem: s,
                    active: s.value === ((y = e.activeMenuItem) == null ? void 0 : y.value) && s.value === ((M = e.highlightedMenuItem) == null ? void 0 : M.value)
                  })
                ];
              }),
              _: 2
              /* DYNAMIC */
            }, 1040, ["selected", "active", "highlighted", "show-thumbnail", "bold-label", "hide-description-overflow", "search-query", "onChange", "onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        e.showPending ? (v(), R(u, {
          key: 2,
          class: "cdx-menu__progress-bar",
          inline: !0
        })) : k("v-if", !0)
      ], 16, an)
    ],
    6
    /* CLASS, STYLE */
  )), [
    [je, e.expanded]
  ]);
}
const un = /* @__PURE__ */ N(nn, [["render", sn]]);
function Ee(e) {
  const t = [];
  for (const n of e)
    // HTML tag
    typeof n.type == "string" || // Component
    typeof n.type == "object" ? t.push(n) : n.type !== We && (typeof n.children == "string" && n.children.trim() !== "" ? t.push(n.children) : Array.isArray(n.children) && t.push(...Ee(n.children)));
  return t;
}
function rn(e, t) {
  return typeof e.type == "object" && "name" in e.type ? t !== void 0 ? e.type.name === t : !0 : !1;
}
function dn(e, t) {
  return typeof e.type == "string" ? t !== void 0 ? e.type === t.toLowerCase() : !0 : !1;
}
function cn(e) {
  const t = typeof e == "function" ? e() : e;
  return t ? Ee(t) : [];
}
function hn(e, t, n) {
  const a = h(() => {
    const i = cn(e);
    if (i.length !== 1)
      return !1;
    const r = i[0];
    return !!(typeof r == "object" && (rn(r, "CdxIcon") || dn(r, "svg")));
  });
  return Re(
    () => a.value && !t["aria-label"] && !t["aria-hidden"],
    "".concat(n, ": Icon-only buttons require one of the following attributes: aria-label or aria-hidden. See documentation at https://doc.wikimedia.org/codex/latest/components/demos/button.html#icon-only-button")
  ), a;
}
const fn = z(ut), pn = z(rt), vn = z(dt), gn = F({
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
      validator: pn
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
      validator: vn
    }
  },
  emits: ["click"],
  setup(e, { emit: t, slots: n, attrs: a }) {
    const i = hn(n.default, a, "CdxButton"), r = b(!1);
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
function mn(e, t, n, a, i, r) {
  return v(), m(
    "button",
    {
      class: K(["cdx-button", e.rootClasses]),
      onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o)),
      onKeydown: t[1] || (t[1] = _e((o) => e.setActive(!0), ["space", "enter"])),
      onKeyup: t[2] || (t[2] = _e((o) => e.setActive(!1), ["space", "enter"]))
    },
    [
      E(e.$slots, "default")
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
const yn = /* @__PURE__ */ N(gn, [["render", mn]]);
function Fe(e, t, n) {
  return h({
    get: () => e.value,
    set: (a) => (
      // If eventName is undefined, then 'update:modelValue' must be a valid EventName,
      // but TypeScript's type analysis isn't clever enough to realize that
      t(n || "update:modelValue", a)
    )
  });
}
function bn(e) {
  const t = pe(yt, b(!1));
  return h(() => t.value || e.value);
}
function Ne(e, t, n) {
  const a = bn(e), i = pe(mt, b("default")), r = h(() => t != null && t.value && t.value !== "default" ? t.value : i.value), o = pe(vt, void 0), u = h(() => {
    var s;
    return (s = o == null ? void 0 : o.value) != null ? s : n;
  });
  return {
    computedDisabled: a,
    computedStatus: r,
    computedInputId: u
  };
}
const Cn = z(ht), $n = z(Ae), Sn = F({
  name: "CdxTextInput",
  components: { CdxIcon: ve },
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
      validator: Cn
    },
    /**
     * `status` attribute of the input.
     *
     * @values 'default', 'error'
     */
    status: {
      type: String,
      default: "default",
      validator: $n
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
      computedDisabled: i,
      computedStatus: r,
      computedInputId: o
    } = Ne(
      U(e, "disabled"),
      U(e, "status"),
      a
    ), u = pe(gt, void 0), s = Fe(U(e, "modelValue"), t), d = h(() => e.clearable && !!s.value && !i.value), p = h(() => ({
      "cdx-text-input--has-start-icon": !!e.startIcon,
      "cdx-text-input--has-end-icon": !!e.endIcon,
      "cdx-text-input--clearable": d.value,
      ["cdx-text-input--status-".concat(r.value)]: !0
    })), {
      rootClasses: g,
      rootStyle: y,
      otherAttrs: M
    } = ge(n, p), x = h(() => {
      const D = M.value, { id: $ } = D;
      return ae(D, ["id"]);
    }), T = h(() => ({
      "cdx-text-input__input--has-value": !!s.value
    }));
    return {
      computedInputId: o,
      descriptionId: u,
      wrappedModel: s,
      isClearable: d,
      rootClasses: g,
      rootStyle: y,
      otherAttrsMinusId: x,
      inputClasses: T,
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
      cdxIconClear: tt
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
const _n = ["id", "type", "aria-describedby", "disabled"];
function wn(e, t, n, a, i, r) {
  const o = A("cdx-icon");
  return v(), m(
    "div",
    {
      class: K(["cdx-text-input", e.rootClasses]),
      style: oe(e.rootStyle)
    },
    [
      Ke(_("input", X({
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
      }), null, 16, _n), [
        [Ge, e.wrappedModel]
      ]),
      e.startIcon ? (v(), R(o, {
        key: 0,
        icon: e.startIcon,
        class: "cdx-text-input__icon-vue cdx-text-input__start-icon"
      }, null, 8, ["icon"])) : k("v-if", !0),
      e.endIcon ? (v(), R(o, {
        key: 1,
        icon: e.endIcon,
        class: "cdx-text-input__icon-vue cdx-text-input__end-icon"
      }, null, 8, ["icon"])) : k("v-if", !0),
      e.isClearable ? (v(), R(o, {
        key: 2,
        icon: e.cdxIconClear,
        class: "cdx-text-input__icon-vue cdx-text-input__clear-icon",
        onMousedown: t[6] || (t[6] = we(() => {
        }, ["prevent"])),
        onClick: e.onClear
      }, null, 8, ["icon", "onClick"])) : k("v-if", !0)
    ],
    6
    /* CLASS, STYLE */
  );
}
const In = /* @__PURE__ */ N(Sn, [["render", wn]]), xn = z(Ae), kn = F({
  name: "CdxSearchInput",
  components: {
    CdxButton: yn,
    CdxTextInput: In
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
      validator: xn
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
    const a = Fe(U(e, "modelValue"), t), { computedDisabled: i } = Ne(U(e, "disabled")), r = h(() => ({
      "cdx-search-input--has-end-button": !!e.buttonLabel
    })), {
      rootClasses: o,
      rootStyle: u,
      otherAttrs: s
    } = ge(n, r);
    return {
      wrappedModel: a,
      computedDisabled: i,
      rootClasses: o,
      rootStyle: u,
      otherAttrs: s,
      handleSubmit: () => {
        t("submit-click", a.value);
      },
      searchIcon: at
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
const Mn = { class: "cdx-search-input__input-wrapper" };
function Tn(e, t, n, a, i, r) {
  const o = A("cdx-text-input"), u = A("cdx-button");
  return v(), m(
    "div",
    {
      class: K(["cdx-search-input", e.rootClasses]),
      style: oe(e.rootStyle)
    },
    [
      _("div", Mn, [
        G(o, X({
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
        E(e.$slots, "default")
      ]),
      e.buttonLabel ? (v(), R(u, {
        key: 0,
        class: "cdx-search-input__end-button",
        disabled: e.computedDisabled,
        onClick: e.handleSubmit
      }, {
        default: q(() => [
          le(
            L(e.buttonLabel),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["disabled", "onClick"])) : k("v-if", !0)
    ],
    6
    /* CLASS, STYLE */
  );
}
const Bn = /* @__PURE__ */ N(kn, [["render", Tn]]), Vn = F({
  name: "CdxTypeaheadSearch",
  components: {
    CdxIcon: ve,
    CdxMenu: un,
    CdxSearchInput: Bn
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
      default: ft
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
    const i = b(), r = b(), o = De("typeahead-search-menu"), u = b(!1), s = b(!1), d = b(!1), p = b(!1), g = b(e.initialInputValue), y = b(""), M = h(() => {
      var f, C;
      return (C = (f = r.value) == null ? void 0 : f.getHighlightedMenuItem()) == null ? void 0 : C.id;
    }), x = b(null), T = h(() => ({
      "cdx-typeahead-search__menu-message--has-thumbnail": e.showThumbnail
    })), S = h(
      () => e.searchResults.find(
        (f) => f.value === x.value
      )
    ), Z = h(
      () => e.searchFooterUrl ? { value: W, url: e.searchFooterUrl } : void 0
    ), ee = h(() => ({
      "cdx-typeahead-search--show-thumbnail": e.showThumbnail,
      "cdx-typeahead-search--expanded": u.value,
      "cdx-typeahead-search--auto-expand-width": e.showThumbnail && e.autoExpandWidth
    })), {
      rootClasses: te,
      rootStyle: se,
      otherAttrs: ie
    } = ge(t, ee);
    function $(f) {
      return f;
    }
    const B = h(() => ({
      visibleItemLimit: e.visibleItemLimit,
      showThumbnail: e.showThumbnail,
      // In case search queries aren't highlighted, default to a bold label.
      boldLabel: !0,
      hideDescriptionOverflow: !0
    }));
    let D, O;
    function ue(f, C = !1) {
      S.value && S.value.label !== f && S.value.value !== f && (x.value = null), O !== void 0 && (clearTimeout(O), O = void 0), f === "" ? u.value = !1 : (s.value = !0, a["search-results-pending"] && (O = setTimeout(() => {
        p.value && (u.value = !0), d.value = !0;
      }, pt))), D !== void 0 && (clearTimeout(D), D = void 0);
      const l = () => {
        n("input", f);
      };
      C ? l() : D = setTimeout(() => {
        l();
      }, e.debounceInterval);
    }
    function H(f) {
      var C;
      if (f === W) {
        x.value = null, g.value = y.value;
        return;
      }
      x.value = f, f !== null && (g.value = S.value ? (C = S.value.label) != null ? C : String(S.value.value) : "");
    }
    function Q() {
      p.value = !0, (y.value || d.value) && (u.value = !0);
    }
    function P() {
      p.value = !1, u.value = !1;
    }
    function ne(f) {
      const c = f, { id: C } = c, l = ae(c, ["id"]);
      if (l.value === W) {
        n("search-result-click", {
          searchResult: null,
          index: e.searchResults.length,
          numberOfResults: e.searchResults.length
        });
        return;
      }
      re(l);
    }
    function re(f) {
      const C = {
        searchResult: f,
        index: e.searchResults.findIndex(
          (l) => l.value === f.value
        ),
        numberOfResults: e.searchResults.length
      };
      n("search-result-click", C);
    }
    function me(f) {
      var C;
      if (f.value === W) {
        g.value = y.value;
        return;
      }
      g.value = f.value ? (C = f.label) != null ? C : String(f.value) : "";
    }
    function ye(f) {
      var C;
      u.value = !1, (C = r.value) == null || C.clearActive(), ne(f);
    }
    function be(f) {
      if (S.value)
        re(S.value), f.stopPropagation(), window.location.assign(S.value.url), f.preventDefault();
      else {
        const C = {
          searchResult: null,
          index: -1,
          numberOfResults: e.searchResults.length
        };
        n("submit", C);
      }
    }
    function Ce(f) {
      if (!r.value || !y.value || f.key === " ")
        return;
      const C = r.value.getHighlightedMenuItem(), l = r.value.getHighlightedViaKeyboard();
      switch (f.key) {
        case "Enter":
          C && (C.value === W && l ? window.location.assign(e.searchFooterUrl) : r.value.delegateKeyNavigation(f, { prevent: !1 })), u.value = !1;
          break;
        case "Tab":
          u.value = !1;
          break;
        default:
          r.value.delegateKeyNavigation(f);
          break;
      }
    }
    return Y(() => {
      e.initialInputValue && ue(e.initialInputValue, !0);
    }), J(U(e, "searchResults"), () => {
      y.value = g.value.trim(), p.value && s.value && y.value.length > 0 && (u.value = !0), O !== void 0 && (clearTimeout(O), O = void 0), s.value = !1, d.value = !1;
    }), {
      form: i,
      menu: r,
      menuId: o,
      highlightedId: M,
      selection: x,
      menuMessageClass: T,
      footer: Z,
      asSearchResult: $,
      inputValue: g,
      searchQuery: y,
      expanded: u,
      showPending: d,
      rootClasses: te,
      rootStyle: se,
      otherAttrs: ie,
      menuConfig: B,
      onUpdateInputValue: ue,
      onUpdateMenuSelection: H,
      onFocus: Q,
      onBlur: P,
      onSearchResultClick: ne,
      onSearchResultKeyboardNavigation: me,
      onSearchFooterClick: ye,
      onSubmit: be,
      onKeydown: Ce,
      MenuFooterValue: W,
      articleIcon: et
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
const Ln = ["id", "action"], Kn = { class: "cdx-typeahead-search__menu-message__text" }, An = { class: "cdx-typeahead-search__menu-message__text" }, Rn = ["href", "onClickCapture"], Dn = { class: "cdx-menu-item__text cdx-typeahead-search__search-footer__text" }, En = { class: "cdx-typeahead-search__search-footer__query" };
function Fn(e, t, n, a, i, r) {
  const o = A("cdx-icon"), u = A("cdx-menu"), s = A("cdx-search-input");
  return v(), m(
    "div",
    {
      class: K(["cdx-typeahead-search", e.rootClasses]),
      style: oe(e.rootStyle)
    },
    [
      _("form", {
        id: e.id,
        ref: "form",
        class: "cdx-typeahead-search__form",
        action: e.formAction,
        onSubmit: t[4] || (t[4] = (...d) => e.onSubmit && e.onSubmit(...d))
      }, [
        G(s, X({
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
          default: q(() => [
            G(u, X({
              id: e.menuId,
              ref: "menu",
              expanded: e.expanded,
              "onUpdate:expanded": t[0] || (t[0] = (d) => e.expanded = d),
              class: "cdx-typeahead-search__menu",
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
              pending: q(() => [
                _(
                  "div",
                  {
                    class: K(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
                  },
                  [
                    _("span", Kn, [
                      E(e.$slots, "search-results-pending")
                    ])
                  ],
                  2
                  /* CLASS */
                )
              ]),
              "no-results": q(() => [
                _(
                  "div",
                  {
                    class: K(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
                  },
                  [
                    _("span", An, [
                      E(e.$slots, "search-no-results-text")
                    ])
                  ],
                  2
                  /* CLASS */
                )
              ]),
              default: q(({ menuItem: d, active: p }) => [
                d.value === e.MenuFooterValue ? (v(), m("a", {
                  key: 0,
                  class: K(["cdx-menu-item__content cdx-typeahead-search__search-footer", {
                    "cdx-typeahead-search__search-footer__active": p
                  }]),
                  href: e.asSearchResult(d).url,
                  onClickCapture: we((g) => e.onSearchFooterClick(e.asSearchResult(d)), ["stop"])
                }, [
                  G(o, {
                    class: "cdx-menu-item__thumbnail cdx-typeahead-search__search-footer__icon",
                    icon: e.articleIcon
                  }, null, 8, ["icon"]),
                  _("span", Dn, [
                    E(e.$slots, "search-footer-text", { searchQuery: e.searchQuery }, () => [
                      _(
                        "strong",
                        En,
                        L(e.searchQuery),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ], 42, Rn)) : k("v-if", !0)
              ]),
              _: 3
              /* FORWARDED */
            }, 16, ["id", "expanded", "show-pending", "selected", "menu-items", "footer", "search-query", "show-no-results-slot", "aria-label", "onUpdate:selected", "onMenuItemKeyboardNavigation"])
          ]),
          _: 3
          /* FORWARDED */
        }, 16, ["modelValue", "button-label", "aria-controls", "aria-expanded", "aria-activedescendant", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
        E(e.$slots, "default")
      ], 40, Ln)
    ],
    6
    /* CLASS, STYLE */
  );
}
const Hn = /* @__PURE__ */ N(Vn, [["render", Fn]]);
export {
  Hn as CdxTypeaheadSearch
};
