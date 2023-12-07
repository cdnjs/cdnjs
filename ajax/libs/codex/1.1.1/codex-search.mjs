var Oe = Object.defineProperty, qe = Object.defineProperties;
var He = Object.getOwnPropertyDescriptors;
var he = Object.getOwnPropertySymbols;
var xe = Object.prototype.hasOwnProperty, ke = Object.prototype.propertyIsEnumerable;
var Ie = (e, t, n) => t in e ? Oe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Me = (e, t) => {
  for (var n in t || (t = {}))
    xe.call(t, n) && Ie(e, n, t[n]);
  if (he)
    for (var n of he(t))
      ke.call(t, n) && Ie(e, n, t[n]);
  return e;
}, Te = (e, t) => qe(e, He(t));
var ae = (e, t) => {
  var n = {};
  for (var a in e)
    xe.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
  if (e != null && he)
    for (var a of he(e))
      t.indexOf(a) < 0 && ke.call(e, a) && (n[a] = e[a]);
  return n;
};
var fe = (e, t, n) => new Promise((a, i) => {
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
import { ref as C, onMounted as Y, defineComponent as E, computed as f, openBlock as v, createElementBlock as y, normalizeClass as A, toDisplayString as L, createCommentVNode as c, Fragment as le, createElementVNode as w, resolveComponent as K, createVNode as G, Transition as ze, withCtx as H, normalizeStyle as se, createTextVNode as oe, withModifiers as _e, renderSlot as F, createBlock as R, resolveDynamicComponent as Ue, warn as Be, watch as J, getCurrentInstance as Qe, onUnmounted as Le, toRef as z, nextTick as Ve, withDirectives as Ae, mergeProps as X, renderList as Pe, vShow as je, Comment as We, withKeys as we, inject as me, vModelDynamic as Ge } from "vue";
const Je = '<path d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"/><circle cx="10" cy="10" r="3"/>', Xe = '<path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"/>', Ye = '<path d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"/><path d="M19 5H1V3h18zm0 12H1v-2h18z"/>', Ze = '<path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"/>', et = Je, tt = Xe, nt = Ye, at = Ze;
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
  const t = C(null);
  return Y(() => {
    const n = window.getComputedStyle(e.value).direction;
    t.value = n === "ltr" || n === "rtl" ? n : null;
  }), t;
}
function it(e) {
  const t = C("");
  return Y(() => {
    let n = e.value;
    for (; n && n.lang === ""; )
      n = n.parentElement;
    t.value = n ? n.lang : null;
  }), t;
}
function U(e) {
  return (t) => typeof t == "string" && e.indexOf(t) !== -1;
}
const pe = "cdx", ut = [
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
], Ke = [
  "default",
  "error"
], ft = 120, pt = 500, W = "cdx-menu-footer-item", mt = Symbol("CdxFieldInputId"), vt = Symbol("CdxFieldDescriptionId"), gt = Symbol("CdxFieldStatus"), yt = Symbol("CdxDisabled"), bt = "".concat(pe, "-no-invert"), Ct = U(ct), $t = E({
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
    const t = C(), n = st(t), a = it(t), i = f(() => {
      var m;
      return (m = e.dir) != null ? m : n.value;
    }), r = f(() => {
      var m;
      return (m = e.lang) != null ? m : a.value;
    }), o = f(() => ({
      "cdx-icon--flipped": i.value === "rtl" && r.value !== null && ot(e.icon, r.value),
      ["cdx-icon--".concat(e.size)]: !0
    })), u = f(
      () => {
        var m, g;
        return lt(e.icon, (m = r.value) != null ? m : "", (g = i.value) != null ? g : "ltr");
      }
    ), s = f(() => typeof u.value == "string" ? u.value : ""), d = f(() => typeof u.value != "string" ? u.value.path : "");
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
}, St = ["aria-hidden"], wt = { key: 0 }, _t = ["innerHTML"], It = ["d"];
function xt(e, t, n, a, i, r) {
  return v(), y(
    "span",
    {
      ref: "rootElement",
      class: A(["cdx-icon", e.rootClasses])
    },
    [
      (v(), y("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        width: "20",
        height: "20",
        viewBox: "0 0 20 20",
        "aria-hidden": e.iconLabel ? void 0 : !0
      }, [
        e.iconLabel ? (v(), y(
          "title",
          wt,
          L(e.iconLabel),
          1
          /* TEXT */
        )) : c("v-if", !0),
        c(" eslint-disable vue/no-v-html "),
        e.iconSvg ? (v(), y("g", {
          key: 1,
          innerHTML: e.iconSvg
        }, null, 8, _t)) : (v(), y(
          le,
          { key: 2 },
          [
            c(" eslint-enable vue/no-v-html "),
            w("path", { d: e.iconPath }, null, 8, It)
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        ))
      ], 8, St))
    ],
    2
    /* CLASS */
  );
}
const ve = /* @__PURE__ */ N($t, [["render", xt]]), kt = E({
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
    const t = C(!1), n = C({}), a = (i) => {
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
  const o = K("cdx-icon");
  return v(), y("span", Mt, [
    e.thumbnailLoaded ? c("v-if", !0) : (v(), y("span", Tt, [
      G(o, {
        icon: e.placeholderIcon,
        class: "cdx-thumbnail__placeholder__icon--vue"
      }, null, 8, ["icon"])
    ])),
    G(ze, { name: "cdx-thumbnail__image" }, {
      default: H(() => [
        e.thumbnailLoaded ? (v(), y(
          "span",
          {
            key: 0,
            style: se(e.thumbnailStyle),
            class: A([e.NoInvertClass, "cdx-thumbnail__image"])
          },
          null,
          6
          /* CLASS, STYLE */
        )) : c("v-if", !0)
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
const At = "[̀-ͯ҃-҉֑-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣঁ-ঃ়া-ৄেৈো-্ৗৢৣ৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑੰੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣஂா-ூெ-ைொ-்ௗఀ-ఄా-ౄె-ైొ-్ౕౖౢౣಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣංඃ්ා-ුූෘ-ෟෲෳัิ-ฺ็-๎ັິ-ູົຼ່-ໍ༹༘༙༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏႚ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝᠋-᠍ᢅᢆᢩᤠ-ᤫᤰ-᤻ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼᪰-᪾ᬀ-ᬄ᬴-᭄᭫-᭳ᮀ-ᮂᮡ-ᮭ᯦-᯳ᰤ-᰷᳐-᳔᳒-᳨᳭ᳲ-᳴᳷-᳹᷀-᷹᷻-᷿⃐-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯-꙲ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣠-꣱ꣿꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀ꧥꨩ-ꨶꩃꩌꩍꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭ﬞ︀-️︠-︯]";
function Kt(e, t) {
  if (!e)
    return [t, "", ""];
  const n = Lt(e), a = new RegExp(
    // Per https://www.regular-expressions.info/unicode.html, "any code point that is not a
    // combining mark can be followed by any number of combining marks." See also the
    // discussion in https://phabricator.wikimedia.org/T35242.
    n + At + "*",
    "i"
  ).exec(t);
  if (!a || a.index === void 0)
    return [t, "", ""];
  const i = a.index, r = i + a[0].length, o = t.slice(i, r), u = t.slice(0, i), s = t.slice(r, t.length);
  return [u, o, s];
}
const Rt = E({
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
    titleChunks: f(() => Kt(e.searchQuery, String(e.title)))
  })
});
const Dt = { class: "cdx-search-result-title" }, Ft = { class: "cdx-search-result-title__match" };
function Et(e, t, n, a, i, r) {
  return v(), y("span", Dt, [
    c(" All on one line to avoid introducing unwanted whitespace into the UI. "),
    c("eslint-disable-next-line max-len"),
    w("bdi", null, [
      oe(
        L(e.titleChunks[0]),
        1
        /* TEXT */
      ),
      w(
        "span",
        Ft,
        L(e.titleChunks[1]),
        1
        /* TEXT */
      ),
      oe(
        L(e.titleChunks[2]),
        1
        /* TEXT */
      )
    ])
  ]);
}
const Nt = /* @__PURE__ */ N(Rt, [["render", Et]]), Ot = E({
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
    }, i = (m) => {
      m.button === 0 && t("change", "active", !0);
    }, r = () => {
      t("change", "selected", !0);
    }, o = f(() => e.searchQuery.length > 0), u = f(() => ({
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
    })), s = f(() => e.url ? "a" : "span"), d = f(() => e.label || String(e.value));
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
const qt = ["id", "aria-disabled", "aria-selected"], Ht = { class: "cdx-menu-item__text" }, zt = ["lang"], Ut = ["lang"], Qt = ["lang"], Pt = ["lang"];
function jt(e, t, n, a, i, r) {
  const o = K("cdx-thumbnail"), u = K("cdx-icon"), s = K("cdx-search-result-title");
  return v(), y("li", {
    id: e.id,
    role: "option",
    class: A(["cdx-menu-item", e.rootClasses]),
    "aria-disabled": e.disabled,
    "aria-selected": e.selected,
    onMousemove: t[0] || (t[0] = (...d) => e.onMouseMove && e.onMouseMove(...d)),
    onMouseleave: t[1] || (t[1] = (...d) => e.onMouseLeave && e.onMouseLeave(...d)),
    onMousedown: t[2] || (t[2] = _e((...d) => e.onMouseDown && e.onMouseDown(...d), ["prevent"])),
    onClick: t[3] || (t[3] = (...d) => e.onClick && e.onClick(...d))
  }, [
    c(" @slot Custom menu item content. "),
    F(e.$slots, "default", {}, () => [
      (v(), R(Ue(e.contentTag), {
        href: e.url ? e.url : void 0,
        class: "cdx-menu-item__content"
      }, {
        default: H(() => {
          var d, m, g, b, M, k;
          return [
            c(" Thumbnail, thumbnail placeholder, or icon. "),
            e.showThumbnail ? (v(), R(o, {
              key: 0,
              thumbnail: e.thumbnail,
              class: "cdx-menu-item__thumbnail"
            }, null, 8, ["thumbnail"])) : e.icon ? (v(), R(u, {
              key: 1,
              icon: e.icon,
              class: "cdx-menu-item__icon"
            }, null, 8, ["icon"])) : c("v-if", !0),
            c(" Item text. "),
            w("span", Ht, [
              c(" Item label. "),
              e.highlightQuery ? (v(), R(s, {
                key: 0,
                title: e.title,
                "search-query": e.searchQuery,
                lang: (d = e.language) == null ? void 0 : d.label
              }, null, 8, ["title", "search-query", "lang"])) : (v(), y("span", {
                key: 1,
                class: "cdx-menu-item__text__label",
                lang: (m = e.language) == null ? void 0 : m.label
              }, [
                w(
                  "bdi",
                  null,
                  L(e.title),
                  1
                  /* TEXT */
                )
              ], 8, zt)),
              c(" Item search query match (e.g. alias). "),
              e.match ? (v(), y(
                le,
                { key: 2 },
                [
                  c(" Add a space before the match. Vue strips whitespace between everything\n						except plain text, so we can't rely on a newline to add a natural space\n						here. "),
                  c(" eslint-disable-next-line vue/no-useless-mustaches "),
                  oe(" " + L(" ") + " "),
                  e.highlightQuery ? (v(), R(s, {
                    key: 0,
                    title: e.match,
                    "search-query": e.searchQuery,
                    lang: (g = e.language) == null ? void 0 : g.match
                  }, null, 8, ["title", "search-query", "lang"])) : (v(), y("span", {
                    key: 1,
                    class: "cdx-menu-item__text__match",
                    lang: (b = e.language) == null ? void 0 : b.match
                  }, [
                    w(
                      "bdi",
                      null,
                      L(e.match),
                      1
                      /* TEXT */
                    )
                  ], 8, Ut))
                ],
                64
                /* STABLE_FRAGMENT */
              )) : c("v-if", !0),
              c(" Item label supporting text. "),
              e.supportingText ? (v(), y(
                le,
                { key: 3 },
                [
                  c(" eslint-disable-next-line vue/no-useless-mustaches "),
                  oe(" " + L(" ") + " "),
                  w("span", {
                    class: "cdx-menu-item__text__supporting-text",
                    lang: (M = e.language) == null ? void 0 : M.supportingText
                  }, [
                    w(
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
              )) : c("v-if", !0),
              c(" Item description. "),
              e.description ? (v(), y("span", {
                key: 4,
                class: "cdx-menu-item__text__description",
                lang: (k = e.language) == null ? void 0 : k.description
              }, [
                w(
                  "bdi",
                  null,
                  L(e.description),
                  1
                  /* TEXT */
                )
              ], 8, Pt)) : c("v-if", !0)
            ])
          ];
        }),
        _: 1
        /* STABLE */
      }, 8, ["href"]))
    ])
  ], 42, qt);
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
const Gt = E({
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
    const n = f(() => ({
      "cdx-progress-bar--block": !e.inline,
      "cdx-progress-bar--inline": e.inline,
      "cdx-progress-bar--enabled": !e.disabled,
      "cdx-progress-bar--disabled": e.disabled
    })), a = f(() => e.inline ? "true" : void 0);
    return {
      rootClasses: n,
      computedAriaHidden: a
    };
  }
});
const Jt = ["aria-hidden", "aria-disabled"], Xt = /* @__PURE__ */ w(
  "div",
  { class: "cdx-progress-bar__bar" },
  null,
  -1
  /* HOISTED */
), Yt = [
  Xt
];
function Zt(e, t, n, a, i, r) {
  return v(), y(
    le,
    null,
    [
      c(' ARIA progressbar default values are `aria-valuemin="0"` and `aria-valuemax="100"`,\n	hence omitting them here. '),
      w("div", {
        class: A(["cdx-progress-bar", e.rootClasses]),
        role: "progressbar",
        "aria-hidden": e.computedAriaHidden,
        "aria-disabled": e.disabled
      }, Yt, 10, Jt)
    ],
    2112
    /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
  );
}
const en = /* @__PURE__ */ N(Gt, [["render", Zt]]);
let Se = 0;
function De(e) {
  var a;
  const t = Qe(), n = (a = t == null ? void 0 : t.props.id) != null ? a : t == null ? void 0 : t.attrs.id;
  return e ? "".concat(pe, "-").concat(e, "-").concat(Se++) : n ? "".concat(pe, "-").concat(n, "-").concat(Se++) : "".concat(pe, "-").concat(Se++);
}
function tn(e, t) {
  const n = C(!1);
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
function ge(e, t = f(() => ({}))) {
  const n = f(() => {
    const r = ae(t.value, []);
    return e.class && e.class.split(" ").forEach((u) => {
      r[u] = !0;
    }), r;
  }), a = f(() => {
    if ("style" in e)
      return e.style;
  }), i = f(() => {
    const s = e, { class: r, style: o } = s;
    return ae(s, ["class", "style"]);
  });
  return {
    rootClasses: n,
    rootStyle: a,
    otherAttrs: i
  };
}
const nn = E({
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
    const i = f(() => (e.footer && e.menuItems ? [...e.menuItems, e.footer] : e.menuItems).map((h) => Te(Me({}, h), {
      id: De("menu-item")
    }))), r = f(() => n["no-results"] ? e.showNoResultsSlot !== null ? e.showNoResultsSlot : i.value.length === 0 : !1), o = C(null), u = C(!1), s = C(null), d = "additions removals";
    let m = "", g = null;
    function b() {
      m = "", g !== null && (clearTimeout(g), g = null);
    }
    function M() {
      g !== null && clearTimeout(g), g = setTimeout(b, 1500);
    }
    function k() {
      var l;
      return (l = i.value.find(
        (h) => h.value === e.selected
      )) != null ? l : null;
    }
    function T(l, h) {
      var I;
      if (!(h && h.disabled))
        switch (l) {
          case "selected":
            t("update:selected", (I = h == null ? void 0 : h.value) != null ? I : null), t("update:expanded", !1), s.value = null;
            break;
          case "highlighted":
            o.value = h != null ? h : null, u.value = !1;
            break;
          case "highlightedViaKeyboard":
            o.value = h != null ? h : null, u.value = !0;
            break;
          case "active":
            s.value = h != null ? h : null;
            break;
        }
    }
    const _ = f(() => {
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
      var x;
      const h = (j) => {
        for (let V = j - 1; V >= 0; V--)
          if (!i.value[V].disabled)
            return i.value[V];
      };
      l = l != null ? l : i.value.length;
      const I = (x = h(l)) != null ? x : h(i.value.length);
      Z(I);
    }
    function te(l) {
      var x;
      const h = (j) => i.value.find((V, ce) => !V.disabled && ce > j);
      l = l != null ? l : -1;
      const I = (x = h(l)) != null ? x : h(-1);
      Z(I);
    }
    function ie(l) {
      if (l.key === "Clear")
        return b(), !0;
      if (l.key === "Backspace")
        return m = m.slice(0, -1), M(), !0;
      if (l.key.length === 1 && !l.metaKey && !l.ctrlKey && !l.altKey) {
        if (e.expanded || t("update:expanded", !0), l.key === " " && m.length < 1)
          return !1;
        m += l.key.toLowerCase();
        const h = m.length > 1 && m.split("").every((V) => V === m[0]);
        let I = i.value, x = m;
        h && _.value !== void 0 && (I = I.slice(_.value + 1).concat(I.slice(0, _.value)), x = m[0]);
        const j = I.find(
          (V) => {
            var ce;
            return !V.disabled && String((ce = V.label) != null ? ce : V.value).toLowerCase().startsWith(x);
          }
        );
        return j && (T("highlightedViaKeyboard", j), q()), M(), !0;
      }
      return !1;
    }
    function ue(l, { prevent: h = !0, characterNavigation: I = !1 } = {}) {
      if (I) {
        if (ie(l))
          return l.preventDefault(), !0;
        b();
      }
      function x() {
        h && (l.preventDefault(), l.stopPropagation());
      }
      switch (l.key) {
        case "Enter":
        case " ":
          return x(), e.expanded ? (o.value && u.value && t("update:selected", o.value.value), t("update:expanded", !1)) : t("update:expanded", !0), !0;
        case "Tab":
          return e.expanded && (o.value && u.value && t("update:selected", o.value.value), t("update:expanded", !1)), !0;
        case "ArrowUp":
          return x(), e.expanded ? (o.value === null && T("highlightedViaKeyboard", k()), ee(_.value)) : t("update:expanded", !0), q(), !0;
        case "ArrowDown":
          return x(), e.expanded ? (o.value === null && T("highlightedViaKeyboard", k()), te(_.value)) : t("update:expanded", !0), q(), !0;
        case "Home":
          return x(), e.expanded ? (o.value === null && T("highlightedViaKeyboard", k()), te()) : t("update:expanded", !0), q(), !0;
        case "End":
          return x(), e.expanded ? (o.value === null && T("highlightedViaKeyboard", k()), ee()) : t("update:expanded", !0), q(), !0;
        case "Escape":
          return x(), t("update:expanded", !1), !0;
        default:
          return !1;
      }
    }
    function S() {
      T("active", null);
    }
    const B = [], D = C(void 0), O = tn(
      D,
      { threshold: 0.8 }
    );
    J(O, (l) => {
      l && t("load-more");
    });
    function re(l, h) {
      if (l) {
        B[h] = l.$el;
        const I = e.visibleItemLimit;
        if (!I || e.menuItems.length < I)
          return;
        const x = Math.min(
          I,
          Math.max(2, Math.floor(0.2 * e.menuItems.length))
        );
        h === e.menuItems.length - x && (D.value = l.$el);
      }
    }
    function q() {
      if (!e.visibleItemLimit || e.visibleItemLimit > e.menuItems.length || _.value === void 0)
        return;
      const l = _.value >= 0 ? _.value : 0;
      B[l].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
    const Q = C(null), P = C(null);
    function ne() {
      return fe(this, null, function* () {
        yield Ve(), de(), ye(), yield Ve(), q();
      });
    }
    function de() {
      if (e.footer) {
        const l = B[B.length - 1];
        P.value = l.scrollHeight;
      } else
        P.value = null;
    }
    function ye() {
      if (!e.visibleItemLimit || B.length <= e.visibleItemLimit) {
        Q.value = null;
        return;
      }
      const l = B[0].getBoundingClientRect().top, h = B[e.visibleItemLimit].getBoundingClientRect().top;
      Q.value = h - l + 2;
    }
    Y(() => {
      document.addEventListener("mouseup", S);
    }), Le(() => {
      document.removeEventListener("mouseup", S);
    }), J(z(e, "expanded"), (l) => fe(this, null, function* () {
      if (l) {
        const h = k();
        h && !o.value && T("highlighted", h), yield ne();
      } else
        T("highlighted", null);
    })), J(z(e, "menuItems"), (l) => fe(this, null, function* () {
      l.length < B.length && (B.length = l.length), e.expanded && (yield ne());
    }), { deep: !0 });
    const be = f(() => ({
      "max-height": Q.value ? "".concat(Q.value, "px") : void 0,
      "margin-bottom": P.value ? "".concat(P.value, "px") : void 0
    })), Ce = f(() => ({
      "cdx-menu--has-footer": !!e.footer
    })), {
      rootClasses: $e,
      rootStyle: p,
      otherAttrs: $
    } = ge(a, Ce);
    return {
      listBoxStyle: be,
      rootClasses: $e,
      rootStyle: p,
      otherAttrs: $,
      assignTemplateRef: re,
      computedMenuItems: i,
      computedShowNoResultsSlot: r,
      highlightedMenuItem: o,
      highlightedViaKeyboard: u,
      activeMenuItem: s,
      handleMenuItemChange: T,
      handleKeyNavigation: ue,
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
  const o = K("cdx-menu-item"), u = K("cdx-progress-bar");
  return Ae((v(), y(
    "div",
    {
      class: A(["cdx-menu", e.rootClasses]),
      style: se(e.rootStyle)
    },
    [
      w("ul", X({
        class: "cdx-menu__listbox",
        role: "listbox",
        style: e.listBoxStyle,
        "aria-live": e.showPending ? "polite" : void 0,
        "aria-relevant": e.showPending ? e.ariaRelevant : void 0
      }, e.otherAttrs), [
        e.showPending && e.computedMenuItems.length === 0 && e.$slots.pending ? (v(), y("li", ln, [
          c("\n					@slot Message to indicate pending state.\n				"),
          F(e.$slots, "pending")
        ])) : c("v-if", !0),
        e.computedShowNoResultsSlot ? (v(), y("li", on, [
          c("\n					@slot Message to show if there are no menu items to display.\n				"),
          F(e.$slots, "no-results")
        ])) : c("v-if", !0),
        (v(!0), y(
          le,
          null,
          Pe(e.computedMenuItems, (s, d) => {
            var m, g;
            return v(), R(o, X({
              key: s.value,
              ref_for: !0,
              ref: (b) => e.assignTemplateRef(b, d)
            }, s, {
              selected: s.value === e.selected,
              active: s.value === ((m = e.activeMenuItem) == null ? void 0 : m.value),
              highlighted: s.value === ((g = e.highlightedMenuItem) == null ? void 0 : g.value),
              "show-thumbnail": e.showThumbnail,
              "bold-label": e.boldLabel,
              "hide-description-overflow": e.hideDescriptionOverflow,
              "search-query": e.searchQuery,
              onChange: (b, M) => e.handleMenuItemChange(b, M ? s : null),
              onClick: (b) => e.$emit("menu-item-click", s)
            }), {
              default: H(() => {
                var b, M;
                return [
                  c("\n					@slot Display of an individual item in the menu\n					@binding {MenuItem} menuItem The current menu item\n					@binding {boolean} active Whether the current item is visually active\n				"),
                  F(e.$slots, "default", {
                    menuItem: s,
                    active: s.value === ((b = e.activeMenuItem) == null ? void 0 : b.value) && s.value === ((M = e.highlightedMenuItem) == null ? void 0 : M.value)
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
        })) : c("v-if", !0)
      ], 16, an)
    ],
    6
    /* CLASS, STYLE */
  )), [
    [je, e.expanded]
  ]);
}
const un = /* @__PURE__ */ N(nn, [["render", sn]]);
function Fe(e) {
  const t = [];
  for (const n of e)
    // HTML tag
    typeof n.type == "string" || // Component
    typeof n.type == "object" ? t.push(n) : n.type !== We && (typeof n.children == "string" && n.children.trim() !== "" ? t.push(n.children) : Array.isArray(n.children) && t.push(...Fe(n.children)));
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
  return t ? Fe(t) : [];
}
function hn(e, t, n) {
  const a = f(() => {
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
const fn = U(ut), pn = U(rt), mn = U(dt), vn = E({
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
      validator: mn
    }
  },
  emits: ["click"],
  setup(e, { emit: t, slots: n, attrs: a }) {
    const i = hn(n.default, a, "CdxButton"), r = C(!1);
    return {
      rootClasses: f(() => ({
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
function gn(e, t, n, a, i, r) {
  return v(), y(
    "button",
    {
      class: A(["cdx-button", e.rootClasses]),
      onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o)),
      onKeydown: t[1] || (t[1] = we((o) => e.setActive(!0), ["space", "enter"])),
      onKeyup: t[2] || (t[2] = we((o) => e.setActive(!1), ["space", "enter"]))
    },
    [
      c(" @slot Button content "),
      F(e.$slots, "default")
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
const yn = /* @__PURE__ */ N(vn, [["render", gn]]);
function Ee(e, t, n) {
  return f({
    get: () => e.value,
    set: (a) => (
      // If eventName is undefined, then 'update:modelValue' must be a valid EventName,
      // but TypeScript's type analysis isn't clever enough to realize that
      t(n || "update:modelValue", a)
    )
  });
}
function bn(e) {
  const t = me(yt, C(!1));
  return f(() => t.value || e.value);
}
function Ne(e, t, n) {
  const a = bn(e), i = me(gt, C("default")), r = f(() => t != null && t.value && t.value !== "default" ? t.value : i.value), o = me(mt, void 0), u = f(() => {
    var s;
    return (s = o == null ? void 0 : o.value) != null ? s : n;
  });
  return {
    computedDisabled: a,
    computedStatus: r,
    computedInputId: u
  };
}
const Cn = U(ht), $n = U(Ke), Sn = E({
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
      z(e, "disabled"),
      z(e, "status"),
      a
    ), u = me(vt, void 0), s = Ee(z(e, "modelValue"), t), d = f(() => e.clearable && !!s.value && !i.value), m = f(() => ({
      "cdx-text-input--has-start-icon": !!e.startIcon,
      "cdx-text-input--has-end-icon": !!e.endIcon,
      "cdx-text-input--clearable": d.value,
      ["cdx-text-input--status-".concat(r.value)]: !0
    })), {
      rootClasses: g,
      rootStyle: b,
      otherAttrs: M
    } = ge(n, m), k = f(() => {
      const D = M.value, { id: S } = D;
      return ae(D, ["id"]);
    }), T = f(() => ({
      "cdx-text-input__input--has-value": !!s.value
    }));
    return {
      computedInputId: o,
      descriptionId: u,
      wrappedModel: s,
      isClearable: d,
      rootClasses: g,
      rootStyle: b,
      otherAttrsMinusId: k,
      inputClasses: T,
      computedDisabled: i,
      onClear: (S) => {
        s.value = "", t("clear", S);
      },
      onInput: (S) => {
        t("input", S);
      },
      onChange: (S) => {
        t("change", S);
      },
      onKeydown: (S) => {
        (S.key === "Home" || S.key === "End") && !S.ctrlKey && !S.metaKey || t("keydown", S);
      },
      onFocus: (S) => {
        t("focus", S);
      },
      onBlur: (S) => {
        t("blur", S);
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
const wn = ["id", "type", "aria-describedby", "disabled"];
function _n(e, t, n, a, i, r) {
  const o = K("cdx-icon");
  return v(), y(
    "div",
    {
      class: A(["cdx-text-input", e.rootClasses]),
      style: se(e.rootStyle)
    },
    [
      c(' size="1" is to prevent the browser from setting an implicit min-width '),
      Ae(w("input", X({
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
      }), null, 16, wn), [
        [Ge, e.wrappedModel]
      ]),
      e.startIcon ? (v(), R(o, {
        key: 0,
        icon: e.startIcon,
        class: "cdx-text-input__icon-vue cdx-text-input__start-icon"
      }, null, 8, ["icon"])) : c("v-if", !0),
      e.endIcon ? (v(), R(o, {
        key: 1,
        icon: e.endIcon,
        class: "cdx-text-input__icon-vue cdx-text-input__end-icon"
      }, null, 8, ["icon"])) : c("v-if", !0),
      e.isClearable ? (v(), R(o, {
        key: 2,
        icon: e.cdxIconClear,
        class: "cdx-text-input__icon-vue cdx-text-input__clear-icon",
        onMousedown: t[6] || (t[6] = _e(() => {
        }, ["prevent"])),
        onClick: e.onClear
      }, null, 8, ["icon", "onClick"])) : c("v-if", !0)
    ],
    6
    /* CLASS, STYLE */
  );
}
const In = /* @__PURE__ */ N(Sn, [["render", _n]]), xn = U(Ke), kn = E({
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
    const a = Ee(z(e, "modelValue"), t), { computedDisabled: i } = Ne(z(e, "disabled")), r = f(() => ({
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
  const o = K("cdx-text-input"), u = K("cdx-button");
  return v(), y(
    "div",
    {
      class: A(["cdx-search-input", e.rootClasses]),
      style: se(e.rootStyle)
    },
    [
      w("div", Mn, [
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
          onKeydown: we(e.handleSubmit, ["enter"]),
          onInput: t[1] || (t[1] = (s) => e.$emit("input", s)),
          onChange: t[2] || (t[2] = (s) => e.$emit("change", s)),
          onFocus: t[3] || (t[3] = (s) => e.$emit("focus", s)),
          onBlur: t[4] || (t[4] = (s) => e.$emit("blur", s))
        }), null, 16, ["modelValue", "start-icon", "disabled", "status", "onKeydown"]),
        c("\n				@slot A slot for passing in an options menu that needs to be positioned\n				relatively to the text input. See TypeaheadSearch for sample usage.\n			"),
        F(e.$slots, "default")
      ]),
      e.buttonLabel ? (v(), R(u, {
        key: 0,
        class: "cdx-search-input__end-button",
        disabled: e.computedDisabled,
        onClick: e.handleSubmit
      }, {
        default: H(() => [
          oe(
            L(e.buttonLabel),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["disabled", "onClick"])) : c("v-if", !0)
    ],
    6
    /* CLASS, STYLE */
  );
}
const Bn = /* @__PURE__ */ N(kn, [["render", Tn]]), Vn = E({
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
    const i = C(), r = C(), o = De("typeahead-search-menu"), u = C(!1), s = C(!1), d = C(!1), m = C(!1), g = C(e.initialInputValue), b = C(""), M = f(() => {
      var p, $;
      return ($ = (p = r.value) == null ? void 0 : p.getHighlightedMenuItem()) == null ? void 0 : $.id;
    }), k = C(null), T = f(() => ({
      "cdx-typeahead-search__menu-message--has-thumbnail": e.showThumbnail
    })), _ = f(
      () => e.searchResults.find(
        (p) => p.value === k.value
      )
    ), Z = f(
      () => e.searchFooterUrl ? { value: W, url: e.searchFooterUrl } : void 0
    ), ee = f(() => ({
      "cdx-typeahead-search--show-thumbnail": e.showThumbnail,
      "cdx-typeahead-search--expanded": u.value,
      "cdx-typeahead-search--auto-expand-width": e.showThumbnail && e.autoExpandWidth
    })), {
      rootClasses: te,
      rootStyle: ie,
      otherAttrs: ue
    } = ge(t, ee);
    function S(p) {
      return p;
    }
    const B = f(() => ({
      visibleItemLimit: e.visibleItemLimit,
      showThumbnail: e.showThumbnail,
      // In case search queries aren't highlighted, default to a bold label.
      boldLabel: !0,
      hideDescriptionOverflow: !0
    }));
    let D, O;
    function re(p, $ = !1) {
      _.value && _.value.label !== p && _.value.value !== p && (k.value = null), O !== void 0 && (clearTimeout(O), O = void 0), p === "" ? u.value = !1 : (s.value = !0, a["search-results-pending"] && (O = setTimeout(() => {
        m.value && (u.value = !0), d.value = !0;
      }, pt))), D !== void 0 && (clearTimeout(D), D = void 0);
      const l = () => {
        n("input", p);
      };
      $ ? l() : D = setTimeout(() => {
        l();
      }, e.debounceInterval);
    }
    function q(p) {
      var $;
      if (p === W) {
        k.value = null, g.value = b.value;
        return;
      }
      k.value = p, p !== null && (g.value = _.value ? ($ = _.value.label) != null ? $ : String(_.value.value) : "");
    }
    function Q() {
      m.value = !0, (b.value || d.value) && (u.value = !0);
    }
    function P() {
      m.value = !1, u.value = !1;
    }
    function ne(p) {
      const h = p, { id: $ } = h, l = ae(h, ["id"]);
      if (l.value === W) {
        n("search-result-click", {
          searchResult: null,
          index: e.searchResults.length,
          numberOfResults: e.searchResults.length
        });
        return;
      }
      de(l);
    }
    function de(p) {
      const $ = {
        searchResult: p,
        index: e.searchResults.findIndex(
          (l) => l.value === p.value
        ),
        numberOfResults: e.searchResults.length
      };
      n("search-result-click", $);
    }
    function ye(p) {
      var $;
      if (p.value === W) {
        g.value = b.value;
        return;
      }
      g.value = p.value ? ($ = p.label) != null ? $ : String(p.value) : "";
    }
    function be(p) {
      var $;
      u.value = !1, ($ = r.value) == null || $.clearActive(), ne(p);
    }
    function Ce(p) {
      if (_.value)
        de(_.value), p.stopPropagation(), window.location.assign(_.value.url), p.preventDefault();
      else {
        const $ = {
          searchResult: null,
          index: -1,
          numberOfResults: e.searchResults.length
        };
        n("submit", $);
      }
    }
    function $e(p) {
      if (!r.value || !b.value || p.key === " ")
        return;
      const $ = r.value.getHighlightedMenuItem(), l = r.value.getHighlightedViaKeyboard();
      switch (p.key) {
        case "Enter":
          $ && ($.value === W && l ? window.location.assign(e.searchFooterUrl) : r.value.delegateKeyNavigation(p, { prevent: !1 })), u.value = !1;
          break;
        case "Tab":
          u.value = !1;
          break;
        default:
          r.value.delegateKeyNavigation(p);
          break;
      }
    }
    return Y(() => {
      e.initialInputValue && re(e.initialInputValue, !0);
    }), J(z(e, "searchResults"), () => {
      b.value = g.value.trim(), m.value && s.value && b.value.length > 0 && (u.value = !0), O !== void 0 && (clearTimeout(O), O = void 0), s.value = !1, d.value = !1;
    }), {
      form: i,
      menu: r,
      menuId: o,
      highlightedId: M,
      selection: k,
      menuMessageClass: T,
      footer: Z,
      asSearchResult: S,
      inputValue: g,
      searchQuery: b,
      expanded: u,
      showPending: d,
      rootClasses: te,
      rootStyle: ie,
      otherAttrs: ue,
      menuConfig: B,
      onUpdateInputValue: re,
      onUpdateMenuSelection: q,
      onFocus: Q,
      onBlur: P,
      onSearchResultClick: ne,
      onSearchResultKeyboardNavigation: ye,
      onSearchFooterClick: be,
      onSubmit: Ce,
      onKeydown: $e,
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
const Ln = ["id", "action"], An = { class: "cdx-typeahead-search__menu-message__text" }, Kn = { class: "cdx-typeahead-search__menu-message__text" }, Rn = ["href", "onClickCapture"], Dn = { class: "cdx-menu-item__text cdx-typeahead-search__search-footer__text" }, Fn = { class: "cdx-typeahead-search__search-footer__query" };
function En(e, t, n, a, i, r) {
  const o = K("cdx-icon"), u = K("cdx-menu"), s = K("cdx-search-input");
  return v(), y(
    "div",
    {
      class: A(["cdx-typeahead-search", e.rootClasses]),
      style: se(e.rootStyle)
    },
    [
      w("form", {
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
          default: H(() => [
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
              pending: H(() => [
                w(
                  "div",
                  {
                    class: A(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
                  },
                  [
                    w("span", An, [
                      c('\n									@slot A slot for a translated "Loading search results" message.\n								'),
                      F(e.$slots, "search-results-pending")
                    ])
                  ],
                  2
                  /* CLASS */
                )
              ]),
              "no-results": H(() => [
                w(
                  "div",
                  {
                    class: A(["cdx-menu-item__content cdx-typeahead-search__menu-message", e.menuMessageClass])
                  },
                  [
                    w("span", Kn, [
                      c('\n									@slot A slot for passing in a translated "no results" message.\n								'),
                      F(e.$slots, "search-no-results-text")
                    ])
                  ],
                  2
                  /* CLASS */
                )
              ]),
              default: H(({ menuItem: d, active: m }) => [
                d.value === e.MenuFooterValue ? (v(), y("a", {
                  key: 0,
                  class: A(["cdx-menu-item__content cdx-typeahead-search__search-footer", {
                    "cdx-typeahead-search__search-footer__active": m
                  }]),
                  href: e.asSearchResult(d).url,
                  onClickCapture: _e((g) => e.onSearchFooterClick(e.asSearchResult(d)), ["stop"])
                }, [
                  c(" eslint-disable max-len "),
                  G(o, {
                    class: "cdx-menu-item__thumbnail cdx-typeahead-search__search-footer__icon",
                    icon: e.articleIcon
                  }, null, 8, ["icon"]),
                  w("span", Dn, [
                    c(" eslint-enable max-len "),
                    c("\n									@slot A slot for passing in translated search footer text.\n									@binding {string} search-query Input text entered by the user\n								"),
                    F(e.$slots, "search-footer-text", { searchQuery: e.searchQuery }, () => [
                      w(
                        "strong",
                        Fn,
                        L(e.searchQuery),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ], 42, Rn)) : c("v-if", !0)
              ]),
              _: 3
              /* FORWARDED */
            }, 16, ["id", "expanded", "show-pending", "selected", "menu-items", "footer", "search-query", "show-no-results-slot", "aria-label", "onUpdate:selected", "onMenuItemKeyboardNavigation"])
          ]),
          _: 3
          /* FORWARDED */
        }, 16, ["modelValue", "button-label", "aria-controls", "aria-expanded", "aria-activedescendant", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
        c('\n				@slot A slot for passing hidden inputs, i.e.\n				`<input type="hidden" name="language" value="en">`\n			'),
        F(e.$slots, "default")
      ], 40, Ln)
    ],
    6
    /* CLASS, STYLE */
  );
}
const qn = /* @__PURE__ */ N(Vn, [["render", En]]);
export {
  qn as CdxTypeaheadSearch
};
