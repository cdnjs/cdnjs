var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { openBlock, createElementBlock, normalizeClass, renderSlot, resolveComponent, createBlock, withCtx, createElementVNode, withModifiers, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, normalizeStyle, withDirectives, vShow } from "vue";
function isExist(obj) {
  return typeof obj !== "undefined" && obj !== null;
}
function isFunction(obj) {
  return typeof obj === "function";
}
function isNumber(obj) {
  return typeof obj === "number";
}
var defaultLang = {
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
let lang = defaultLang;
let i18nHandler = function() {
  if ("$t" in this) {
    return this.$t.apply(this, arguments);
  }
  return null;
};
const t = function(path, options) {
  options = options || {};
  let value;
  try {
    value = i18nHandler.apply(this, arguments);
    if (isExist(value) && !options.$$locale) {
      return value;
    }
  } catch (e) {
  }
  const array = path.split(".");
  let current = options.$$locale || lang;
  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];
    if (i === j - 1)
      return value;
    if (!value)
      return "";
    current = value;
  }
  return "";
};
var Locale = {
  methods: {
    t() {
      const args = [];
      for (let i = 0; i < arguments.length; ++i) {
        args.push(arguments[i]);
      }
      args[1] = __spreadValues({ $$locale: this.locale }, args[1]);
      return t.apply(this, args);
    }
  },
  props: {
    locale: Object
  }
};
var linkMixin = {
  props: {
    href: String,
    target: String,
    to: null,
    replace: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    }
  }
};
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$5 = {
  props: {
    size: { type: String, default: void 0 },
    vertical: {
      type: Boolean,
      default: false
    },
    justified: {
      type: Boolean,
      default: false
    }
  }
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass({
      "btn-group": !$props.vertical,
      "btn-group-vertical": $props.vertical,
      "btn-group-justified": $props.justified,
      [`btn-group-${$props.size}`]: $props.size
    }),
    role: "group",
    "data-toggle": "buttons"
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var BtnGroup = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
const INPUT_TYPE_CHECKBOX = "checkbox";
const INPUT_TYPE_RADIO = "radio";
const _sfc_main$4 = {
  components: { BtnGroup },
  mixins: [linkMixin],
  props: {
    justified: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "default"
    },
    nativeType: {
      type: String,
      default: "button"
    },
    size: {
      type: String,
      default: void 0
    },
    block: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: null,
      default: null
    },
    inputValue: {
      type: null,
      default: null
    },
    inputType: {
      type: String,
      validator(value) {
        return value === INPUT_TYPE_CHECKBOX || value === INPUT_TYPE_RADIO;
      },
      default: void 0
    }
  },
  emits: ["update:modelValue"],
  computed: {
    isInputActive() {
      return this.inputType === INPUT_TYPE_CHECKBOX ? this.modelValue.indexOf(this.inputValue) >= 0 : this.modelValue === this.inputValue;
    },
    classes() {
      return {
        btn: true,
        active: this.inputType ? this.isInputActive : this.active,
        disabled: this.disabled,
        "btn-block": this.block,
        [`btn-${this.type}`]: Boolean(this.type),
        [`btn-${this.size}`]: Boolean(this.size)
      };
    }
  },
  methods: {
    onClick(e) {
      if (this.disabled && e instanceof Event) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    onInputChange() {
      if (this.inputType === INPUT_TYPE_CHECKBOX) {
        const valueCopied = this.modelValue.slice();
        if (this.isInputActive) {
          valueCopied.splice(valueCopied.indexOf(this.inputValue), 1);
        } else {
          valueCopied.push(this.inputValue);
        }
        this.$emit("update:modelValue", valueCopied);
      } else {
        this.$emit("update:modelValue", this.inputValue);
      }
    }
  }
};
const _hoisted_1$4 = ["href", "target"];
const _hoisted_2$4 = ["type", "checked", "disabled"];
const _hoisted_3$2 = ["type", "disabled"];
const _hoisted_4$1 = ["type", "disabled"];
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_BtnGroup = resolveComponent("BtnGroup");
  return _ctx.href ? (openBlock(), createElementBlock("a", {
    key: 0,
    href: _ctx.href,
    target: _ctx.target,
    role: "button",
    class: normalizeClass($options.classes),
    onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_1$4)) : _ctx.to ? (openBlock(), createBlock(_component_router_link, {
    key: 1,
    to: _ctx.to,
    class: normalizeClass($options.classes),
    event: $props.disabled ? "" : "click",
    replace: _ctx.replace,
    append: _ctx.append,
    exact: _ctx.exact,
    role: "button",
    onClick: $options.onClick
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["to", "class", "event", "replace", "append", "exact", "onClick"])) : $props.inputType ? (openBlock(), createElementBlock("label", {
    key: 2,
    class: normalizeClass($options.classes),
    onClick: _cache[3] || (_cache[3] = (...args) => $options.onClick && $options.onClick(...args))
  }, [
    createElementVNode("input", {
      autocomplete: "off",
      type: $props.inputType,
      checked: $options.isInputActive,
      disabled: $props.disabled,
      onInput: _cache[1] || (_cache[1] = withModifiers(() => {
      }, ["stop"])),
      onChange: _cache[2] || (_cache[2] = (...args) => $options.onInputChange && $options.onInputChange(...args))
    }, null, 40, _hoisted_2$4),
    renderSlot(_ctx.$slots, "default")
  ], 2)) : $props.justified ? (openBlock(), createBlock(_component_BtnGroup, { key: 3 }, {
    default: withCtx(() => [
      createElementVNode("button", {
        class: normalizeClass($options.classes),
        type: $props.nativeType,
        disabled: $props.disabled,
        onClick: _cache[4] || (_cache[4] = (...args) => $options.onClick && $options.onClick(...args))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_3$2)
    ]),
    _: 3
  })) : (openBlock(), createElementBlock("button", {
    key: 4,
    class: normalizeClass($options.classes),
    type: $props.nativeType,
    disabled: $props.disabled,
    onClick: _cache[5] || (_cache[5] = (...args) => $options.onClick && $options.onClick(...args))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_4$1));
}
var Btn = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
function pad(value, num) {
  value = value + "";
  for (let i = num - value.length; i > 0; i--) {
    value = "0" + value;
  }
  return value;
}
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}
function stringify(date, format) {
  try {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const monthName = monthNames[month - 1];
    return format.replace(/yyyy/g, year).replace(/MMMM/g, monthName).replace(/MMM/g, monthName.substring(0, 3)).replace(/MM/g, pad(month, 2)).replace(/dd/g, pad(day, 2)).replace(/yy/g, year).replace(/M(?!a)/g, month).replace(/d/g, day);
  } catch (e) {
    return "";
  }
}
function convertDateToUTC(date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}
function getWeekNumber(d) {
  const _d = new Date(Date.UTC(d.year, d.month, d.date));
  _d.setUTCDate(_d.getUTCDate() + 4 - (_d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(_d.getUTCFullYear(), 0, 1));
  return Math.ceil(((_d - yearStart) / 864e5 + 1) / 7);
}
const _sfc_main$3 = {
  components: { Btn },
  mixins: [Locale],
  props: {
    month: { type: Number, default: void 0 },
    year: { type: Number, default: void 0 },
    date: { type: Date, default: void 0 },
    today: { type: Date, default: void 0 },
    limit: { type: Object, default: void 0 },
    weekStartsWith: { type: Number, default: void 0 },
    iconControlLeft: { type: String, default: void 0 },
    iconControlRight: { type: String, default: void 0 },
    dateClass: { type: Function, default: void 0 },
    yearMonthFormatter: { type: Function, default: void 0 },
    weekNumbers: Boolean
  },
  emits: ["date-change", "year-change", "month-change", "view-change"],
  computed: {
    weekDays() {
      const days = [];
      let firstDay = this.weekStartsWith;
      while (days.length < 7) {
        days.push(firstDay++);
        if (firstDay > 6) {
          firstDay = 0;
        }
      }
      return days;
    },
    yearMonthStr() {
      if (this.yearMonthFormatter) {
        return this.yearMonthFormatter(this.year, this.month);
      } else {
        return isExist(this.month) ? `${this.year} ${this.t(`uiv.datePicker.month${this.month + 1}`)}` : this.year;
      }
    },
    monthDayRows() {
      const rows = [];
      const firstDay = new Date(this.year, this.month, 1);
      const prevMonthLastDate = new Date(this.year, this.month, 0).getDate();
      const startIndex = firstDay.getDay();
      const daysNum = daysInMonth(this.month, this.year);
      let weekOffset = 0;
      if (this.weekStartsWith > startIndex) {
        weekOffset = 7 - this.weekStartsWith;
      } else {
        weekOffset = 0 - this.weekStartsWith;
      }
      for (let i = 0; i < 6; i++) {
        rows.push([]);
        for (let j = 0 - weekOffset; j < 7 - weekOffset; j++) {
          const currentIndex = i * 7 + j;
          const date = { year: this.year, disabled: false };
          if (currentIndex < startIndex) {
            date.date = prevMonthLastDate - startIndex + currentIndex + 1;
            if (this.month > 0) {
              date.month = this.month - 1;
            } else {
              date.month = 11;
              date.year--;
            }
          } else if (currentIndex < startIndex + daysNum) {
            date.date = currentIndex - startIndex + 1;
            date.month = this.month;
          } else {
            date.date = currentIndex - startIndex - daysNum + 1;
            if (this.month < 11) {
              date.month = this.month + 1;
            } else {
              date.month = 0;
              date.year++;
            }
          }
          const dateObj = new Date(date.year, date.month, date.date);
          let afterFrom = true;
          let beforeTo = true;
          if (this.limit && this.limit.from) {
            afterFrom = dateObj >= this.limit.from;
          }
          if (this.limit && this.limit.to) {
            beforeTo = dateObj < this.limit.to;
          }
          date.disabled = !afterFrom || !beforeTo;
          if (isFunction(this.dateClass)) {
            date.classes = this.dateClass(dateObj, {
              currentMonth: this.month,
              currentYear: this.year
            });
          } else {
            date.classes = "";
          }
          rows[i].push(date);
        }
      }
      return rows;
    }
  },
  methods: {
    getWeekNumber,
    tWeekName(index) {
      return this.t(`uiv.datePicker.week${index}`);
    },
    getBtnType(date) {
      if (this.date && date.date === this.date.getDate() && date.month === this.date.getMonth() && date.year === this.date.getFullYear()) {
        return "primary";
      } else if (date.date === this.today.getDate() && date.month === this.today.getMonth() && date.year === this.today.getFullYear()) {
        return "info";
      } else {
        return "default";
      }
    },
    select(date) {
      this.$emit("date-change", date);
    },
    goPrevMonth() {
      let month = this.month;
      let year = this.year;
      if (this.month > 0) {
        month--;
      } else {
        month = 11;
        year--;
        this.$emit("year-change", year);
      }
      this.$emit("month-change", month);
    },
    goNextMonth() {
      let month = this.month;
      let year = this.year;
      if (this.month < 11) {
        month++;
      } else {
        month = 0;
        year++;
        this.$emit("year-change", year);
      }
      this.$emit("month-change", month);
    },
    changeView() {
      this.$emit("view-change", "m");
    }
  }
};
const _hoisted_1$3 = {
  role: "grid",
  style: { "width": "100%" }
};
const _hoisted_2$3 = ["colspan"];
const _hoisted_3$1 = { align: "center" };
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { class: "uiv-datepicker-week" };
const _hoisted_6 = {
  key: 0,
  class: "text-center",
  style: { "border-right": "1px solid #eee" }
};
const _hoisted_7 = { class: "text-muted" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_btn = resolveComponent("btn");
  return openBlock(), createElementBlock("table", _hoisted_1$3, [
    createElementVNode("thead", null, [
      createElementVNode("tr", null, [
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-prev",
            block: "",
            size: "sm",
            style: { "border": "none" },
            onClick: $options.goPrevMonth
          }, {
            default: withCtx(() => [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlLeft)
              }, null, 2)
            ]),
            _: 1
          }, 8, ["onClick"])
        ]),
        createElementVNode("td", {
          colspan: $props.weekNumbers ? 6 : 5
        }, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-title",
            block: "",
            size: "sm",
            style: { "border": "none" },
            onClick: $options.changeView
          }, {
            default: withCtx(() => [
              createElementVNode("b", null, toDisplayString($options.yearMonthStr), 1)
            ]),
            _: 1
          }, 8, ["onClick"])
        ], 8, _hoisted_2$3),
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-next",
            block: "",
            size: "sm",
            style: { "border": "none" },
            onClick: $options.goNextMonth
          }, {
            default: withCtx(() => [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlRight)
              }, null, 2)
            ]),
            _: 1
          }, 8, ["onClick"])
        ])
      ]),
      createElementVNode("tr", _hoisted_3$1, [
        $props.weekNumbers ? (openBlock(), createElementBlock("td", _hoisted_4)) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.weekDays, (day, index) => {
          return openBlock(), createElementBlock("td", {
            key: index,
            width: "14.2857142857%"
          }, [
            createElementVNode("small", _hoisted_5, toDisplayString($options.tWeekName(day === 0 ? 7 : day)), 1)
          ]);
        }), 128))
      ])
    ]),
    createElementVNode("tbody", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.monthDayRows, (row, i) => {
        return openBlock(), createElementBlock("tr", { key: i }, [
          $props.weekNumbers ? (openBlock(), createElementBlock("td", _hoisted_6, [
            createElementVNode("small", _hoisted_7, toDisplayString($options.getWeekNumber(row[$props.weekStartsWith])), 1)
          ])) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(row, (d, j) => {
            return openBlock(), createElementBlock("td", {
              key: `${i}_${j}`
            }, [
              createVNode(_component_btn, {
                block: "",
                size: "sm",
                style: { "border": "none" },
                "data-action": "select",
                class: normalizeClass(d.classes),
                type: $options.getBtnType(d),
                disabled: d.disabled,
                onClick: ($event) => $options.select(d)
              }, {
                default: withCtx(() => [
                  createElementVNode("span", {
                    "data-action": "select",
                    class: normalizeClass({ "text-muted": $props.month !== d.month })
                  }, toDisplayString(d.date), 3)
                ]),
                _: 2
              }, 1032, ["class", "type", "disabled", "onClick"])
            ]);
          }), 128))
        ]);
      }), 128))
    ])
  ]);
}
var DateView = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = {
  components: { Btn },
  mixins: [Locale],
  props: {
    month: { type: Number, default: void 0 },
    year: { type: Number, default: void 0 },
    iconControlLeft: { type: String, default: void 0 },
    iconControlRight: { type: String, default: void 0 }
  },
  emits: ["year-change", "month-change", "view-change"],
  data() {
    return {
      rows: []
    };
  },
  mounted() {
    for (let i = 0; i < 4; i++) {
      this.rows.push([]);
      for (let j = 0; j < 3; j++) {
        this.rows[i].push(i * 3 + j + 1);
      }
    }
  },
  methods: {
    tCell(cell) {
      return this.t(`uiv.datePicker.month${cell}`);
    },
    getBtnClass(month) {
      if (month === this.month) {
        return "primary";
      } else {
        return "default";
      }
    },
    goPrevYear() {
      this.$emit("year-change", this.year - 1);
    },
    goNextYear() {
      this.$emit("year-change", this.year + 1);
    },
    changeView(monthIndex) {
      if (isExist(monthIndex)) {
        this.$emit("month-change", monthIndex);
        this.$emit("view-change", "d");
      } else {
        this.$emit("view-change", "y");
      }
    }
  }
};
const _hoisted_1$2 = {
  role: "grid",
  style: { "width": "100%" }
};
const _hoisted_2$2 = { colspan: "4" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_btn = resolveComponent("btn");
  return openBlock(), createElementBlock("table", _hoisted_1$2, [
    createElementVNode("thead", null, [
      createElementVNode("tr", null, [
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-prev",
            block: "",
            size: "sm",
            style: { "border": "none" },
            onClick: $options.goPrevYear
          }, {
            default: withCtx(() => [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlLeft)
              }, null, 2)
            ]),
            _: 1
          }, 8, ["onClick"])
        ]),
        createElementVNode("td", _hoisted_2$2, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-title",
            block: "",
            size: "sm",
            style: { "border": "none" },
            onClick: _cache[0] || (_cache[0] = ($event) => $options.changeView())
          }, {
            default: withCtx(() => [
              createElementVNode("b", null, toDisplayString($props.year), 1)
            ]),
            _: 1
          })
        ]),
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-next",
            block: "",
            size: "sm",
            style: { "border": "none" },
            onClick: $options.goNextYear
          }, {
            default: withCtx(() => [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlRight)
              }, null, 2)
            ]),
            _: 1
          }, 8, ["onClick"])
        ])
      ])
    ]),
    createElementVNode("tbody", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.rows, (row, i) => {
        return openBlock(), createElementBlock("tr", { key: i }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(row, (m, j) => {
            return openBlock(), createElementBlock("td", {
              key: `${i}_${j}`,
              colspan: "2",
              width: "33.333333%"
            }, [
              createVNode(_component_btn, {
                block: "",
                size: "sm",
                style: { "border": "none" },
                type: $options.getBtnClass(i * 3 + j),
                onClick: ($event) => $options.changeView(i * 3 + j)
              }, {
                default: withCtx(() => [
                  createElementVNode("span", null, toDisplayString($options.tCell(m)), 1)
                ]),
                _: 2
              }, 1032, ["type", "onClick"])
            ]);
          }), 128))
        ]);
      }), 128))
    ])
  ]);
}
var MonthView = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const _sfc_main$1 = {
  components: { Btn },
  props: {
    year: { type: Number, default: void 0 },
    iconControlLeft: { type: String, default: void 0 },
    iconControlRight: { type: String, default: void 0 }
  },
  emits: ["year-change", "view-change"],
  computed: {
    rows() {
      const rows = [];
      const yearGroupStart = this.year - this.year % 20;
      for (let i = 0; i < 4; i++) {
        rows.push([]);
        for (let j = 0; j < 5; j++) {
          rows[i].push(yearGroupStart + i * 5 + j);
        }
      }
      return rows;
    },
    yearStr() {
      const start = this.year - this.year % 20;
      return `${start} ~ ${start + 19}`;
    }
  },
  methods: {
    getBtnClass(year) {
      if (year === this.year) {
        return "primary";
      } else {
        return "default";
      }
    },
    goPrevYear() {
      this.$emit("year-change", this.year - 20);
    },
    goNextYear() {
      this.$emit("year-change", this.year + 20);
    },
    changeView(year) {
      this.$emit("year-change", year);
      this.$emit("view-change", "m");
    }
  }
};
const _hoisted_1$1 = {
  role: "grid",
  style: { "width": "100%" }
};
const _hoisted_2$1 = { colspan: "3" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_btn = resolveComponent("btn");
  return openBlock(), createElementBlock("table", _hoisted_1$1, [
    createElementVNode("thead", null, [
      createElementVNode("tr", null, [
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-prev",
            block: "",
            size: "sm",
            style: { "border": "none" },
            onClick: $options.goPrevYear
          }, {
            default: withCtx(() => [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlLeft)
              }, null, 2)
            ]),
            _: 1
          }, 8, ["onClick"])
        ]),
        createElementVNode("td", _hoisted_2$1, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-title",
            block: "",
            size: "sm",
            style: { "border": "none" }
          }, {
            default: withCtx(() => [
              createElementVNode("b", null, toDisplayString($options.yearStr), 1)
            ]),
            _: 1
          })
        ]),
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-next",
            block: "",
            size: "sm",
            style: { "border": "none" },
            onClick: $options.goNextYear
          }, {
            default: withCtx(() => [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlRight)
              }, null, 2)
            ]),
            _: 1
          }, 8, ["onClick"])
        ])
      ])
    ]),
    createElementVNode("tbody", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.rows, (row, i) => {
        return openBlock(), createElementBlock("tr", { key: i }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(row, (y, j) => {
            return openBlock(), createElementBlock("td", {
              key: `${i}_${j}`,
              width: "20%"
            }, [
              createVNode(_component_btn, {
                block: "",
                size: "sm",
                style: { "border": "none" },
                type: $options.getBtnClass(y),
                onClick: ($event) => $options.changeView(y)
              }, {
                default: withCtx(() => [
                  createElementVNode("span", null, toDisplayString(y), 1)
                ]),
                _: 2
              }, 1032, ["type", "onClick"])
            ]);
          }), 128))
        ]);
      }), 128))
    ])
  ]);
}
var YearView = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = {
  components: { DateView, MonthView, YearView, Btn },
  mixins: [Locale],
  props: {
    modelValue: { type: null, required: true },
    width: {
      type: Number,
      default: 270
    },
    todayBtn: {
      type: Boolean,
      default: true
    },
    clearBtn: {
      type: Boolean,
      default: true
    },
    closeOnSelected: {
      type: Boolean,
      default: true
    },
    limitFrom: { type: null, default: void 0 },
    limitTo: { type: null, default: void 0 },
    format: {
      type: String,
      default: "yyyy-MM-dd"
    },
    initialView: {
      type: String,
      default: "d"
    },
    dateParser: {
      type: Function,
      default: Date.parse
    },
    dateClass: { type: Function, default: void 0 },
    yearMonthFormatter: { type: Function, default: void 0 },
    weekStartsWith: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0 && value <= 6;
      }
    },
    weekNumbers: Boolean,
    iconControlLeft: {
      type: String,
      default: "glyphicon glyphicon-chevron-left"
    },
    iconControlRight: {
      type: String,
      default: "glyphicon glyphicon-chevron-right"
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      show: false,
      now: new Date(),
      currentMonth: 0,
      currentYear: 0,
      view: "d"
    };
  },
  computed: {
    valueDateObj() {
      const ts = this.dateParser(this.modelValue);
      if (isNaN(ts)) {
        return null;
      } else {
        let date = new Date(ts);
        if (date.getHours() !== 0) {
          date = new Date(ts + date.getTimezoneOffset() * 60 * 1e3);
        }
        return date;
      }
    },
    pickerStyle() {
      return {
        width: this.width + "px"
      };
    },
    pickerClass() {
      return {
        "uiv-datepicker": true,
        "uiv-datepicker-date": this.view === "d",
        "uiv-datepicker-month": this.view === "m",
        "uiv-datepicker-year": this.view === "y"
      };
    },
    limit() {
      const limit = {};
      if (this.limitFrom) {
        let limitFrom = this.dateParser(this.limitFrom);
        if (!isNaN(limitFrom)) {
          limitFrom = convertDateToUTC(new Date(limitFrom));
          limitFrom.setHours(0, 0, 0, 0);
          limit.from = limitFrom;
        }
      }
      if (this.limitTo) {
        let limitTo = this.dateParser(this.limitTo);
        if (!isNaN(limitTo)) {
          limitTo = convertDateToUTC(new Date(limitTo));
          limitTo.setHours(0, 0, 0, 0);
          limit.to = limitTo;
        }
      }
      return limit;
    }
  },
  watch: {
    modelValue(val, oldVal) {
      this.setMonthAndYearByValue(val, oldVal);
    }
  },
  mounted() {
    if (this.modelValue) {
      this.setMonthAndYearByValue(this.modelValue);
    } else {
      this.currentMonth = this.now.getMonth();
      this.currentYear = this.now.getFullYear();
      this.view = this.initialView;
    }
  },
  methods: {
    setMonthAndYearByValue(val, oldVal) {
      const ts = this.dateParser(val);
      if (!isNaN(ts)) {
        let date = new Date(ts);
        if (date.getHours() !== 0) {
          date = new Date(ts + date.getTimezoneOffset() * 60 * 1e3);
        }
        if (this.limit && (this.limit.from && date < this.limit.from || this.limit.to && date >= this.limit.to)) {
          this.$emit("update:modelValue", oldVal || "");
        } else {
          this.currentMonth = date.getMonth();
          this.currentYear = date.getFullYear();
        }
      }
    },
    onMonthChange(month) {
      this.currentMonth = month;
    },
    onYearChange(year) {
      this.currentYear = year;
      this.currentMonth = void 0;
    },
    onDateChange(date) {
      if (date && isNumber(date.date) && isNumber(date.month) && isNumber(date.year)) {
        const _date = new Date(date.year, date.month, date.date);
        this.$emit("update:modelValue", this.format ? stringify(_date, this.format) : _date);
        this.currentMonth = date.month;
        this.currentYear = date.year;
      } else {
        this.$emit("update:modelValue", "");
      }
    },
    onViewChange(view) {
      this.view = view;
    },
    selectToday() {
      this.view = "d";
      this.onDateChange({
        date: this.now.getDate(),
        month: this.now.getMonth(),
        year: this.now.getFullYear()
      });
    },
    clearSelect() {
      this.currentMonth = this.now.getMonth();
      this.currentYear = this.now.getFullYear();
      this.view = this.initialView;
      this.onDateChange();
    },
    onPickerClick(event) {
      if (event.target.getAttribute("data-action") !== "select" || !this.closeOnSelected) {
        event.stopPropagation();
      }
    }
  }
};
const _hoisted_1 = { key: 0 };
const _hoisted_2 = /* @__PURE__ */ createElementVNode("br", null, null, -1);
const _hoisted_3 = { class: "text-center" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_date_view = resolveComponent("date-view");
  const _component_month_view = resolveComponent("month-view");
  const _component_year_view = resolveComponent("year-view");
  const _component_btn = resolveComponent("btn");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.pickerClass),
    style: normalizeStyle($options.pickerStyle),
    "data-role": "date-picker",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.onPickerClick && $options.onPickerClick(...args))
  }, [
    withDirectives(createVNode(_component_date_view, {
      month: $data.currentMonth,
      year: $data.currentYear,
      date: $options.valueDateObj,
      today: $data.now,
      limit: $options.limit,
      "week-starts-with": $props.weekStartsWith,
      "icon-control-left": $props.iconControlLeft,
      "icon-control-right": $props.iconControlRight,
      "date-class": $props.dateClass,
      "year-month-formatter": $props.yearMonthFormatter,
      "week-numbers": $props.weekNumbers,
      locale: _ctx.locale,
      onMonthChange: $options.onMonthChange,
      onYearChange: $options.onYearChange,
      onDateChange: $options.onDateChange,
      onViewChange: $options.onViewChange
    }, null, 8, ["month", "year", "date", "today", "limit", "week-starts-with", "icon-control-left", "icon-control-right", "date-class", "year-month-formatter", "week-numbers", "locale", "onMonthChange", "onYearChange", "onDateChange", "onViewChange"]), [
      [vShow, $data.view === "d"]
    ]),
    withDirectives(createVNode(_component_month_view, {
      month: $data.currentMonth,
      year: $data.currentYear,
      "icon-control-left": $props.iconControlLeft,
      "icon-control-right": $props.iconControlRight,
      locale: _ctx.locale,
      onMonthChange: $options.onMonthChange,
      onYearChange: $options.onYearChange,
      onViewChange: $options.onViewChange
    }, null, 8, ["month", "year", "icon-control-left", "icon-control-right", "locale", "onMonthChange", "onYearChange", "onViewChange"]), [
      [vShow, $data.view === "m"]
    ]),
    withDirectives(createVNode(_component_year_view, {
      year: $data.currentYear,
      "icon-control-left": $props.iconControlLeft,
      "icon-control-right": $props.iconControlRight,
      onYearChange: $options.onYearChange,
      onViewChange: $options.onViewChange
    }, null, 8, ["year", "icon-control-left", "icon-control-right", "onYearChange", "onViewChange"]), [
      [vShow, $data.view === "y"]
    ]),
    $props.todayBtn || $props.clearBtn ? (openBlock(), createElementBlock("div", _hoisted_1, [
      _hoisted_2,
      createElementVNode("div", _hoisted_3, [
        $props.todayBtn ? (openBlock(), createBlock(_component_btn, {
          key: 0,
          "data-action": "select",
          "data-type": "today",
          type: "info",
          size: "sm",
          onClick: $options.selectToday,
          textContent: toDisplayString(_ctx.t("uiv.datePicker.today"))
        }, null, 8, ["onClick", "textContent"])) : createCommentVNode("", true),
        $props.clearBtn ? (openBlock(), createBlock(_component_btn, {
          key: 1,
          "data-action": "select",
          "data-type": "clear",
          size: "sm",
          onClick: $options.clearSelect,
          textContent: toDisplayString(_ctx.t("uiv.datePicker.clear"))
        }, null, 8, ["onClick", "textContent"])) : createCommentVNode("", true)
      ])
    ])) : createCommentVNode("", true)
  ], 6);
}
var DatePicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { DatePicker as default };
