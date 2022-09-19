import { openBlock as a, createElementBlock as h, normalizeClass as m, renderSlot as y, computed as S, resolveComponent as H, unref as p, createBlock as C, withCtx as c, createElementVNode as s, withModifiers as g, createVNode as b, createCommentVNode as k, withDirectives as B, normalizeStyle as z, withKeys as T, vModelText as D, createTextVNode as x, toDisplayString as N } from "vue";
function P(e) {
  return typeof e < "u" && e !== null;
}
const W = {
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
let A = W, U = function() {
  return "$t" in this ? this.$t.apply(this, arguments) : null;
};
const j = function(e, t) {
  t = t || {};
  let n;
  try {
    if (n = U.apply(this, arguments), P(n) && !t.$$locale)
      return n;
  } catch {
  }
  const o = e.split(".");
  let u = t.$$locale || A;
  for (let l = 0, d = o.length; l < d; l++) {
    const i = o[l];
    if (n = u[i], l === d - 1)
      return n;
    if (!n)
      return "";
    u = n;
  }
  return "";
}, O = {
  __name: "BtnGroup",
  props: {
    size: { type: String, default: void 0 },
    vertical: { type: Boolean, default: !1 },
    justified: { type: Boolean, default: !1 }
  },
  setup(e) {
    return (t, n) => (a(), h("div", {
      class: m({
        "btn-group": !e.vertical,
        "btn-group-vertical": e.vertical,
        "btn-group-justified": e.justified,
        [`btn-group-${e.size}`]: e.size
      }),
      role: "group",
      "data-toggle": "buttons"
    }, [
      y(t.$slots, "default")
    ], 2));
  }
}, E = {
  href: { type: String, default: void 0 },
  target: { type: String, default: void 0 },
  to: { type: null, default: void 0 },
  replace: { type: Boolean, default: !1 },
  append: { type: Boolean, default: !1 },
  exact: { type: Boolean, default: !1 }
}, K = ["href", "target"], J = ["type", "checked", "disabled"], L = ["type", "disabled"], R = ["type", "disabled"], F = {
  __name: "Btn",
  props: {
    ...E,
    justified: { type: Boolean, default: !1 },
    type: { type: String, default: "default" },
    nativeType: { type: String, default: "button" },
    size: { type: String, default: void 0 },
    block: { type: Boolean, default: !1 },
    active: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    modelValue: { type: null, default: null },
    inputValue: { type: null, default: null },
    inputType: {
      type: String,
      validator(e) {
        return e === "checkbox" || e === "radio";
      },
      default: void 0
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, o = S(
      () => n.inputType === "checkbox" ? n.modelValue.indexOf(n.inputValue) >= 0 : n.modelValue === n.inputValue
    ), u = S(() => ({
      btn: !0,
      active: n.inputType ? o.value : n.active,
      disabled: n.disabled,
      "btn-block": n.block,
      [`btn-${n.type}`]: !!n.type,
      [`btn-${n.size}`]: !!n.size
    }));
    function l(i) {
      n.disabled && i instanceof Event && (i.preventDefault(), i.stopPropagation());
    }
    function d() {
      if (n.inputType === "checkbox") {
        const i = n.modelValue.slice();
        o.value ? i.splice(i.indexOf(n.inputValue), 1) : i.push(n.inputValue), t("update:modelValue", i);
      } else
        t("update:modelValue", n.inputValue);
    }
    return (i, w) => {
      const I = H("RouterLink");
      return i.href ? (a(), h("a", {
        key: 0,
        href: i.href,
        target: i.target,
        role: "button",
        class: m(p(u)),
        onClick: l
      }, [
        y(i.$slots, "default")
      ], 10, K)) : i.to ? (a(), C(I, {
        key: 1,
        to: i.to,
        class: m(p(u)),
        event: e.disabled ? "" : "click",
        replace: i.replace,
        append: i.append,
        exact: i.exact,
        role: "button",
        onClick: l
      }, {
        default: c(() => [
          y(i.$slots, "default")
        ]),
        _: 3
      }, 8, ["to", "class", "event", "replace", "append", "exact"])) : e.inputType ? (a(), h("label", {
        key: 2,
        class: m(p(u)),
        onClick: l
      }, [
        s("input", {
          autocomplete: "off",
          type: e.inputType,
          checked: p(o),
          disabled: e.disabled,
          onInput: w[0] || (w[0] = g(() => {
          }, ["stop"])),
          onChange: d
        }, null, 40, J),
        y(i.$slots, "default")
      ], 2)) : e.justified ? (a(), C(O, { key: 3 }, {
        default: c(() => [
          s("button", {
            class: m(p(u)),
            type: e.nativeType,
            disabled: e.disabled,
            onClick: l
          }, [
            y(i.$slots, "default")
          ], 10, L)
        ]),
        _: 3
      })) : (a(), h("button", {
        key: 4,
        class: m(p(u)),
        type: e.nativeType,
        disabled: e.disabled,
        onClick: l
      }, [
        y(i.$slots, "default")
      ], 10, R));
    };
  }
};
function v(e, t) {
  let n = e.toString();
  for (let o = t - n.length; o > 0; o--)
    n = "0" + n;
  return n;
}
const Y = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, u] of t)
    n[o] = u;
  return n;
}, M = 23, f = 0, V = 59, r = 12, q = {
  components: { Btn: F },
  props: {
    modelValue: { type: Date, required: !0 },
    showMeridian: { type: Boolean, default: !0 },
    min: { type: null, default: void 0 },
    max: { type: null, default: void 0 },
    hourStep: { type: Number, default: 1 },
    minStep: { type: Number, default: 1 },
    readonly: { type: Boolean, default: !1 },
    controls: { type: Boolean, default: !0 },
    iconControlUp: { type: String, default: "glyphicon glyphicon-chevron-up" },
    iconControlDown: {
      type: String,
      default: "glyphicon glyphicon-chevron-down"
    },
    inputWidth: { type: Number, default: 50 }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      hours: 0,
      minutes: 0,
      meridian: !0,
      hoursText: "",
      minutesText: ""
    };
  },
  computed: {
    inputStyles() {
      return {
        width: `${this.inputWidth}px`
      };
    }
  },
  watch: {
    modelValue(e) {
      this.updateByValue(e);
    },
    showMeridian(e) {
      this.setTime();
    },
    hoursText(e) {
      if (this.hours === 0 && e === "")
        return;
      const t = parseInt(e);
      this.showMeridian ? t >= 1 && t <= r && (this.meridian ? this.hours = t === r ? 0 : t : this.hours = t === r ? r : t + r) : t >= f && t <= M && (this.hours = t), this.setTime();
    },
    minutesText(e) {
      if (this.minutes === 0 && e === "")
        return;
      const t = parseInt(e);
      t >= f && t <= V && (this.minutes = t), this.setTime();
    }
  },
  mounted() {
    this.updateByValue(this.modelValue);
  },
  methods: {
    t: j,
    updateByValue(e) {
      if (isNaN(e.getTime())) {
        this.hours = 0, this.minutes = 0, this.hoursText = "", this.minutesText = "", this.meridian = !0;
        return;
      }
      this.hours = e.getHours(), this.minutes = e.getMinutes(), this.showMeridian ? this.hours >= r ? (this.hours === r ? this.hoursText = this.hours + "" : this.hoursText = v(this.hours - r, 2), this.meridian = !1) : (this.hours === f ? this.hoursText = r.toString() : this.hoursText = v(this.hours, 2), this.meridian = !0) : this.hoursText = v(this.hours, 2), this.minutesText = v(this.minutes, 2), this.$refs.hoursInput.value = this.hoursText, this.$refs.minutesInput.value = this.minutesText;
    },
    addHour(e) {
      e = e || this.hourStep, this.hours = this.hours >= M ? f : this.hours + e;
    },
    reduceHour(e) {
      e = e || this.hourStep, this.hours = this.hours <= f ? M : this.hours - e;
    },
    addMinute() {
      this.minutes >= V ? (this.minutes = f, this.addHour(1)) : this.minutes += this.minStep;
    },
    reduceMinute() {
      this.minutes <= f ? (this.minutes = V + 1 - this.minStep, this.reduceHour(1)) : this.minutes -= this.minStep;
    },
    changeTime(e, t) {
      this.readonly || (e && t ? this.addHour() : e && !t ? this.reduceHour() : !e && t ? this.addMinute() : this.reduceMinute(), this.setTime());
    },
    toggleMeridian() {
      this.meridian = !this.meridian, this.meridian ? this.hours -= r : this.hours += r, this.setTime();
    },
    onWheel(e, t) {
      this.readonly || (e.preventDefault(), this.changeTime(t, e.deltaY < 0));
    },
    setTime() {
      let e = this.modelValue;
      if (isNaN(e.getTime()) && (e = new Date(), e.setHours(0), e.setMinutes(0)), e.setHours(this.hours), e.setMinutes(this.minutes), this.max instanceof Date) {
        const t = new Date(e);
        t.setHours(this.max.getHours()), t.setMinutes(this.max.getMinutes()), e = e > t ? t : e;
      }
      if (this.min instanceof Date) {
        const t = new Date(e);
        t.setHours(this.min.getHours()), t.setMinutes(this.min.getMinutes()), e = e < t ? t : e;
      }
      this.$emit("update:modelValue", new Date(e));
    },
    selectInputValue(e) {
      e.target.setSelectionRange(0, 2);
    }
  }
}, G = {
  key: 0,
  class: "text-center"
}, Q = /* @__PURE__ */ s("td", null, "\xA0", -1), X = { key: 0 }, Z = { class: "form-group" }, $ = ["readonly"], _ = /* @__PURE__ */ s("td", null, [
  /* @__PURE__ */ x("\xA0"),
  /* @__PURE__ */ s("b", null, ":"),
  /* @__PURE__ */ x("\xA0")
], -1), ee = { class: "form-group" }, te = ["readonly"], ne = { key: 0 }, ie = /* @__PURE__ */ x(" \xA0 "), le = {
  key: 1,
  class: "text-center"
}, se = /* @__PURE__ */ s("td", null, "\xA0", -1), ue = { key: 0 };
function oe(e, t, n, o, u, l) {
  const d = H("btn");
  return a(), h("section", {
    onClick: t[14] || (t[14] = g(() => {
    }, ["stop"]))
  }, [
    s("table", null, [
      s("tbody", null, [
        n.controls ? (a(), h("tr", G, [
          s("td", null, [
            b(d, {
              type: "link",
              size: "sm",
              disabled: n.readonly,
              onClick: t[0] || (t[0] = (i) => l.changeTime(1, 1))
            }, {
              default: c(() => [
                s("i", {
                  class: m(n.iconControlUp)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          Q,
          s("td", null, [
            b(d, {
              type: "link",
              size: "sm",
              disabled: n.readonly,
              onClick: t[1] || (t[1] = (i) => l.changeTime(0, 1))
            }, {
              default: c(() => [
                s("i", {
                  class: m(n.iconControlUp)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          n.showMeridian ? (a(), h("td", X)) : k("", !0)
        ])) : k("", !0),
        s("tr", null, [
          s("td", Z, [
            B(s("input", {
              ref: "hoursInput",
              "onUpdate:modelValue": t[2] || (t[2] = (i) => u.hoursText = i),
              type: "tel",
              pattern: "\\d*",
              class: "form-control text-center",
              style: z(l.inputStyles),
              placeholder: "HH",
              readonly: n.readonly,
              maxlength: "2",
              size: "2",
              onMouseup: t[3] || (t[3] = (...i) => l.selectInputValue && l.selectInputValue(...i)),
              onKeydown: [
                t[4] || (t[4] = T(g((i) => l.changeTime(1, 1), ["prevent"]), ["up"])),
                t[5] || (t[5] = T(g((i) => l.changeTime(1, 0), ["prevent"]), ["down"]))
              ],
              onWheel: t[6] || (t[6] = (i) => l.onWheel(i, !0))
            }, null, 44, $), [
              [
                D,
                u.hoursText,
                void 0,
                { lazy: !0 }
              ]
            ])
          ]),
          _,
          s("td", ee, [
            B(s("input", {
              ref: "minutesInput",
              "onUpdate:modelValue": t[7] || (t[7] = (i) => u.minutesText = i),
              type: "tel",
              pattern: "\\d*",
              class: "form-control text-center",
              style: z(l.inputStyles),
              placeholder: "MM",
              readonly: n.readonly,
              maxlength: "2",
              size: "2",
              onMouseup: t[8] || (t[8] = (...i) => l.selectInputValue && l.selectInputValue(...i)),
              onKeydown: [
                t[9] || (t[9] = T(g((i) => l.changeTime(0, 1), ["prevent"]), ["up"])),
                t[10] || (t[10] = T(g((i) => l.changeTime(0, 0), ["prevent"]), ["down"]))
              ],
              onWheel: t[11] || (t[11] = (i) => l.onWheel(i, !1))
            }, null, 44, te), [
              [
                D,
                u.minutesText,
                void 0,
                { lazy: !0 }
              ]
            ])
          ]),
          n.showMeridian ? (a(), h("td", ne, [
            ie,
            b(d, {
              "data-action": "toggleMeridian",
              disabled: n.readonly,
              onClick: l.toggleMeridian
            }, {
              default: c(() => [
                x(N(u.meridian ? l.t("uiv.timePicker.am") : l.t("uiv.timePicker.pm")), 1)
              ]),
              _: 1
            }, 8, ["disabled", "onClick"])
          ])) : k("", !0)
        ]),
        n.controls ? (a(), h("tr", le, [
          s("td", null, [
            b(d, {
              type: "link",
              size: "sm",
              disabled: n.readonly,
              onClick: t[12] || (t[12] = (i) => l.changeTime(1, 0))
            }, {
              default: c(() => [
                s("i", {
                  class: m(n.iconControlDown)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          se,
          s("td", null, [
            b(d, {
              type: "link",
              size: "sm",
              disabled: n.readonly,
              onClick: t[13] || (t[13] = (i) => l.changeTime(0, 0))
            }, {
              default: c(() => [
                s("i", {
                  class: m(n.iconControlDown)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          n.showMeridian ? (a(), h("td", ue)) : k("", !0)
        ])) : k("", !0)
      ])
    ])
  ]);
}
const re = /* @__PURE__ */ Y(q, [["render", oe]]);
export {
  re as default
};
