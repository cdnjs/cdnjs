import { defineComponent as z, ref as V, onMounted as G, onBeforeUnmount as H, watch as J, createVNode as B, Teleport as j, resolveComponent as X, openBlock as f, createBlock as Z, normalizeStyle as Q, withKeys as p, withCtx as M, createElementBlock as h, withDirectives as $, createElementVNode as S, withModifiers as y, vModelText as ee, createCommentVNode as K, Fragment as N, renderList as F, toDisplayString as D, normalizeClass as k, renderSlot as te } from "vue";
function le(e) {
  return typeof e < "u" && e !== null;
}
const ne = {
  uiv: {
    datePicker: {
      clear: "Clear",
      today: "Today",
      month: "Month",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      year: "Year",
      week1: "Mon",
      week2: "Tue",
      week3: "Wed",
      week4: "Thu",
      week5: "Fri",
      week6: "Sat",
      week7: "Sun"
    },
    timePicker: {
      am: "AM",
      pm: "PM"
    },
    modal: {
      cancel: "Cancel",
      ok: "OK"
    },
    multiSelect: {
      placeholder: "Select...",
      filterPlaceholder: "Search..."
    }
  }
};
let oe = ne, ie = function() {
  return "$t" in this ? this.$t.apply(this, arguments) : null;
};
const se = function(e, t) {
  t = t || {};
  let n;
  try {
    if (n = ie.apply(this, arguments), le(n) && !t.$$locale)
      return n;
  } catch {
  }
  const i = e.split(".");
  let s = t.$$locale || oe;
  for (let l = 0, u = i.length; l < u; l++) {
    const o = i[l];
    if (n = s[o], l === u - 1)
      return n;
    if (!n)
      return "";
    s = n;
  }
  return "";
}, v = {
  MOUSE_ENTER: "mouseenter",
  MOUSE_LEAVE: "mouseleave",
  MOUSE_DOWN: "mousedown",
  MOUSE_UP: "mouseup",
  FOCUS: "focus",
  BLUR: "blur",
  CLICK: "click",
  INPUT: "input",
  KEY_DOWN: "keydown",
  KEY_UP: "keyup",
  KEY_PRESS: "keypress",
  RESIZE: "resize",
  SCROLL: "scroll",
  TOUCH_START: "touchstart",
  TOUCH_END: "touchend"
};
function I(e, t, n) {
  e.addEventListener(t, n);
}
function T(e, t, n) {
  e.removeEventListener(t, n);
}
function re(e) {
  return e && e.nodeType === Node.ELEMENT_NODE;
}
function ue(e, t, n = {}) {
  const i = document.documentElement, s = (window.pageXOffset || i.scrollLeft) - (i.clientLeft || 0), l = (window.pageYOffset || i.scrollTop) - (i.clientTop || 0), u = t.getBoundingClientRect(), o = e.getBoundingClientRect();
  if (e.style.right = "auto", e.style.bottom = "auto", n.menuRight) {
    const m = s + u.left + u.width - o.width;
    e.style.left = m < 0 ? 0 : m + "px";
  } else
    e.style.left = s + u.left + "px";
  n.dropup ? e.style.top = l + u.top - o.height - 4 + "px" : e.style.top = l + u.top + u.height + "px";
}
function L(e) {
  !re(e) || (e.getAttribute("tabindex") || e.setAttribute("tabindex", "-1"), e.focus());
}
const R = "div", ae = z({
  props: {
    tag: {
      type: String,
      default: R
    },
    appendToBody: {
      type: Boolean,
      default: !1
    },
    modelValue: Boolean,
    dropup: {
      type: Boolean,
      default: !1
    },
    menuRight: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    notCloseElements: {
      type: Array,
      default: () => []
    },
    positionElement: {
      type: null,
      default: void 0
    }
  },
  emits: ["update:modelValue"],
  setup(e, {
    emit: t,
    slots: n
  }) {
    const i = V(!1), s = V(void 0), l = V(null), u = V(null);
    function o() {
      var r;
      return (r = l.value) == null ? void 0 : r.querySelector("li > a:focus");
    }
    function m(r) {
      var a, c;
      if (i.value) {
        const E = l.value, O = r.keyCode;
        if (O === 27)
          C(!1), (a = s.value) == null || a.focus();
        else if (O === 13)
          (c = o()) == null || c.click();
        else if (O === 38 || O === 40) {
          r.preventDefault(), r.stopPropagation();
          const x = o(), g = E.querySelectorAll("li:not(.disabled) > a");
          if (!x)
            L(g[0]);
          else
            for (let b = 0; b < g.length; b++)
              if (x === g[b]) {
                O === 38 && b < g.length > 0 ? L(g[b - 1]) : O === 40 && b < g.length - 1 && L(g[b + 1]);
                break;
              }
        }
      }
    }
    function w() {
      var a, c, E;
      const r = ((a = u.value) == null ? void 0 : a.querySelector('[data-role="trigger"]')) || ((c = u.value) == null ? void 0 : c.querySelector(".dropdown-toggle")) || ((E = u.value) == null ? void 0 : E.firstChild);
      s.value = r && r !== l.value ? r : null;
    }
    function C(r) {
      var a;
      if (!e.disabled) {
        if (typeof r == "boolean" ? i.value = r : i.value = !i.value, e.appendToBody)
          if (i.value) {
            l.value.style.display = "block";
            const c = e.positionElement || u.value;
            ue(l.value, c, e);
          } else
            (a = l.value) == null || a.removeAttribute("style");
        t("update:modelValue", i.value);
      }
    }
    function d(r) {
      var c, E, O;
      const a = r.target;
      if (i.value && a) {
        let x = !1;
        if (e.notCloseElements)
          for (let A = 0, Y = e.notCloseElements.length; A < Y; A++) {
            const P = e.notCloseElements[A].contains(a);
            let U = P;
            if (e.appendToBody) {
              const q = (c = l.value) == null ? void 0 : c.contains(a), W = e.notCloseElements.indexOf(u.value) >= 0;
              U = P || q && W;
            }
            if (U) {
              x = !0;
              break;
            }
          }
        const g = (E = l.value) == null ? void 0 : E.contains(a), b = ((O = u.value) == null ? void 0 : O.contains(a)) && !g, _ = g && r.type === "touchend";
        !b && !x && !_ && C(!1);
      }
    }
    return G(() => {
      w(), s.value && (I(s.value, v.CLICK, C), I(s.value, v.KEY_DOWN, m)), I(l.value, v.KEY_DOWN, m), I(window, v.CLICK, d), I(window, v.TOUCH_END, d), e.modelValue && C(!0);
    }), H(() => {
      s.value && (T(s.value, v.CLICK, C), T(s.value, v.KEY_DOWN, m)), T(l.value, v.KEY_DOWN, m), T(window, v.CLICK, d), T(window, v.TOUCH_END, d);
    }), J(() => e.modelValue, (r) => {
      C(r);
    }), () => {
      const r = e.tag;
      return B(r, {
        ref: u,
        class: {
          "btn-group": e.tag === R,
          dropdown: !e.dropup,
          dropup: e.dropup,
          open: i.value
        }
      }, {
        default: () => {
          var a;
          return [(a = n.default) == null ? void 0 : a.call(n), B(j, {
            to: "body",
            disabled: !e.appendToBody || !i.value
          }, {
            default: () => {
              var c;
              return [B("ul", {
                ref: l,
                class: {
                  "dropdown-menu": !0,
                  "dropdown-menu-right": e.menuRight
                }
              }, [(c = n.dropdown) == null ? void 0 : c.call(n)])];
            }
          })];
        }
      });
    };
  }
});
function de(e, t, n) {
  return n.indexOf(e) === t;
}
const ce = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, s] of t)
    n[i] = s;
  return n;
}, fe = {
  components: { Dropdown: ae },
  props: {
    modelValue: { type: Array, required: !0 },
    options: { type: Array, required: !0 },
    labelKey: { type: String, default: "label" },
    valueKey: { type: String, default: "value" },
    limit: { type: Number, default: 0 },
    size: { type: String, default: void 0 },
    placeholder: { type: String, default: void 0 },
    split: { type: String, default: ", " },
    disabled: { type: Boolean, default: !1 },
    appendToBody: { type: Boolean, default: !1 },
    block: { type: Boolean, default: !1 },
    collapseSelected: { type: Boolean, default: !1 },
    filterable: { type: Boolean, default: !1 },
    filterAutoFocus: { type: Boolean, default: !0 },
    filterFunction: { type: Function, default: void 0 },
    filterPlaceholder: { type: String, default: void 0 },
    selectedIcon: { type: String, default: "glyphicon glyphicon-ok" },
    itemSelectedClass: { type: String, default: void 0 }
  },
  emits: [
    "focus",
    "blur",
    "visible-change",
    "update:modelValue",
    "change",
    "limit-exceed",
    "search"
  ],
  data() {
    return {
      showDropdown: !1,
      els: [],
      filterInput: "",
      currentActive: -1
    };
  },
  computed: {
    containerStyles() {
      return {
        width: this.block ? "100%" : ""
      };
    },
    filteredOptions() {
      if (this.filterable && this.filterInput) {
        if (this.filterFunction)
          return this.filterFunction(this.filterInput);
        {
          const e = this.filterInput.toLowerCase();
          return this.options.filter(
            (t) => t[this.valueKey].toString().toLowerCase().indexOf(e) >= 0 || t[this.labelKey].toString().toLowerCase().indexOf(e) >= 0
          );
        }
      } else
        return this.options;
    },
    groupedOptions() {
      return this.filteredOptions.map((e) => e.group).filter(de).map((e) => ({
        options: this.filteredOptions.filter((t) => t.group === e),
        $group: e
      }));
    },
    flattenGroupedOptions() {
      return [].concat(...this.groupedOptions.map((e) => e.options));
    },
    selectClasses() {
      return {
        [`input-${this.size}`]: this.size
      };
    },
    selectedIconClasses() {
      return {
        [this.selectedIcon]: !0,
        "pull-right": !0
      };
    },
    selectTextClasses() {
      return {
        "text-muted": this.modelValue.length === 0
      };
    },
    labelValue() {
      const e = this.options.map((t) => t[this.valueKey]);
      return this.modelValue.map((t) => {
        const n = e.indexOf(t);
        return n >= 0 ? this.options[n][this.labelKey] : t;
      });
    },
    selectedText() {
      if (this.modelValue.length) {
        const e = this.labelValue;
        if (this.collapseSelected) {
          let t = e[0];
          return t += e.length > 1 ? `${this.split}+${e.length - 1}` : "", t;
        } else
          return e.join(this.split);
      } else
        return this.placeholder || this.t("uiv.multiSelect.placeholder");
    },
    customOptionsVisible() {
      return !!this.$slots.option || !!this.$slots.option;
    }
  },
  watch: {
    showDropdown(e) {
      this.filterInput = "", this.currentActive = -1, this.$emit("visible-change", e), e && this.filterable && this.filterAutoFocus && this.$nextTick(() => {
        this.$refs.filterInput.focus();
      });
    }
  },
  mounted() {
    this.els = [this.$el];
  },
  methods: {
    t: se,
    goPrevOption() {
      !this.showDropdown || (this.currentActive > 0 ? this.currentActive-- : this.currentActive = this.flattenGroupedOptions.length - 1);
    },
    goNextOption() {
      !this.showDropdown || (this.currentActive < this.flattenGroupedOptions.length - 1 ? this.currentActive++ : this.currentActive = 0);
    },
    selectOption() {
      const e = this.currentActive, t = this.flattenGroupedOptions;
      this.showDropdown ? e >= 0 && e < t.length && this.toggle(t[e]) : this.showDropdown = !0;
    },
    itemClasses(e) {
      const t = {
        disabled: e.disabled,
        active: this.currentActive === this.flattenGroupedOptions.indexOf(e)
      };
      return this.itemSelectedClass && (t[this.itemSelectedClass] = this.isItemSelected(e)), t;
    },
    isItemSelected(e) {
      return this.modelValue.indexOf(e[this.valueKey]) >= 0;
    },
    toggle(e) {
      if (e.disabled)
        return;
      const t = e[this.valueKey], n = this.modelValue.indexOf(t);
      if (this.limit === 1) {
        const i = n >= 0 ? [] : [t];
        this.$emit("update:modelValue", i), this.$emit("change", i);
      } else if (n >= 0) {
        const i = this.modelValue.slice();
        i.splice(n, 1), this.$emit("update:modelValue", i), this.$emit("change", i);
      } else if (this.limit === 0 || this.modelValue.length < this.limit) {
        const i = this.modelValue.slice();
        i.push(t), this.$emit("update:modelValue", i), this.$emit("change", i);
      } else
        this.$emit("limit-exceed");
    },
    searchClicked() {
      this.$emit("search", this.filterInput);
    }
  }
}, pe = ["disabled"], he = /* @__PURE__ */ S("div", {
  class: "pull-right",
  style: { display: "inline-block", "vertical-align": "middle" }
}, [
  /* @__PURE__ */ S("span", null, "\xA0"),
  /* @__PURE__ */ S("span", { class: "caret" })
], -1), me = ["textContent"], ge = {
  key: 0,
  style: { padding: "4px 8px" }
}, ye = ["placeholder"], ve = ["textContent"], we = ["onClick"], Oe = {
  key: 0,
  role: "button",
  style: { outline: "0" }
}, be = {
  key: 1,
  role: "button",
  style: { outline: "0" }
}, Ce = {
  key: 2,
  role: "button",
  style: { outline: "0" }
};
function Se(e, t, n, i, s, l) {
  const u = X("dropdown");
  return f(), Z(u, {
    ref: "dropdown",
    modelValue: s.showDropdown,
    "onUpdate:modelValue": t[14] || (t[14] = (o) => s.showDropdown = o),
    "not-close-elements": s.els,
    "append-to-body": n.appendToBody,
    disabled: n.disabled,
    style: Q(l.containerStyles),
    onKeydown: t[15] || (t[15] = p((o) => s.showDropdown = !1, ["esc"]))
  }, {
    dropdown: M(() => [
      n.filterable ? (f(), h("li", ge, [
        $(S("input", {
          ref: "filterInput",
          "onUpdate:modelValue": t[5] || (t[5] = (o) => s.filterInput = o),
          "aria-label": "Filter...",
          class: "form-control input-sm",
          type: "text",
          placeholder: n.filterPlaceholder || l.t("uiv.multiSelect.filterPlaceholder"),
          onKeyup: t[6] || (t[6] = p((...o) => l.searchClicked && l.searchClicked(...o), ["enter"])),
          onKeydown: [
            t[7] || (t[7] = p(y((...o) => l.goNextOption && l.goNextOption(...o), ["prevent", "stop"]), ["down"])),
            t[8] || (t[8] = p(y((...o) => l.goPrevOption && l.goPrevOption(...o), ["prevent", "stop"]), ["up"])),
            t[9] || (t[9] = p(y((...o) => l.selectOption && l.selectOption(...o), ["prevent", "stop"]), ["enter"]))
          ]
        }, null, 40, ye), [
          [ee, s.filterInput]
        ])
      ])) : K("", !0),
      (f(!0), h(N, null, F(l.groupedOptions, (o, m) => (f(), h(N, null, [
        o.$group ? (f(), h("li", {
          key: m,
          class: "dropdown-header",
          textContent: D(o.$group)
        }, null, 8, ve)) : K("", !0),
        (f(!0), h(N, null, F(o.options, (w, C) => (f(), h("li", {
          key: `${m}_${C}`,
          class: k(l.itemClasses(w)),
          style: { outline: "0" },
          onKeydown: [
            t[10] || (t[10] = p(y((...d) => l.goNextOption && l.goNextOption(...d), ["prevent", "stop"]), ["down"])),
            t[11] || (t[11] = p(y((...d) => l.goPrevOption && l.goPrevOption(...d), ["prevent", "stop"]), ["up"])),
            t[12] || (t[12] = p(y((...d) => l.selectOption && l.selectOption(...d), ["prevent", "stop"]), ["enter"]))
          ],
          onClick: y((d) => l.toggle(w, d), ["stop"]),
          onMouseenter: t[13] || (t[13] = (d) => s.currentActive = -1)
        }, [
          l.customOptionsVisible ? (f(), h("a", Oe, [
            te(e.$slots, "option", { item: w }),
            n.selectedIcon && l.isItemSelected(w) ? (f(), h("span", {
              key: 0,
              class: k(l.selectedIconClasses)
            }, null, 2)) : K("", !0)
          ])) : l.isItemSelected(w) ? (f(), h("a", be, [
            S("b", null, D(w[n.labelKey]), 1),
            n.selectedIcon ? (f(), h("span", {
              key: 0,
              class: k(l.selectedIconClasses)
            }, null, 2)) : K("", !0)
          ])) : (f(), h("a", Ce, [
            S("span", null, D(w[n.labelKey]), 1)
          ]))
        ], 42, we))), 128))
      ], 64))), 256))
    ]),
    default: M(() => [
      S("div", {
        class: k(["form-control dropdown-toggle clearfix", l.selectClasses]),
        disabled: n.disabled ? !0 : void 0,
        tabindex: "0",
        "data-role": "trigger",
        onFocus: t[0] || (t[0] = (o) => e.$emit("focus", o)),
        onBlur: t[1] || (t[1] = (o) => e.$emit("blur", o)),
        onKeydown: [
          t[2] || (t[2] = p(y((...o) => l.goNextOption && l.goNextOption(...o), ["prevent", "stop"]), ["down"])),
          t[3] || (t[3] = p(y((...o) => l.goPrevOption && l.goPrevOption(...o), ["prevent", "stop"]), ["up"])),
          t[4] || (t[4] = p(y((...o) => l.selectOption && l.selectOption(...o), ["prevent", "stop"]), ["enter"]))
        ]
      }, [
        he,
        S("div", {
          class: k(l.selectTextClasses),
          style: { "overflow-x": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" },
          textContent: D(l.selectedText)
        }, null, 10, me)
      ], 42, pe)
    ]),
    _: 3
  }, 8, ["modelValue", "not-close-elements", "append-to-body", "disabled", "style"]);
}
const xe = /* @__PURE__ */ ce(fe, [["render", Se]]);
export {
  xe as default
};
