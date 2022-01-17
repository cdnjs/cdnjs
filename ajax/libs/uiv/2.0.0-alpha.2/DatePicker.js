var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { openBlock, createElementBlock, normalizeClass, renderSlot, computed, resolveComponent, unref, createBlock, withCtx, createElementVNode, withModifiers, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, reactive, onMounted, ref, watch, normalizeStyle, withDirectives, vShow } from "vue";
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
const _sfc_main$5 = {
  props: {
    size: { type: String, default: void 0 },
    vertical: { type: Boolean, default: false },
    justified: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({
          "btn-group": !__props.vertical,
          "btn-group-vertical": __props.vertical,
          "btn-group-justified": __props.justified,
          [`btn-group-${__props.size}`]: __props.size
        }),
        role: "group",
        "data-toggle": "buttons"
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
};
const linkProps = {
  href: { type: String, default: void 0 },
  target: { type: String, default: void 0 },
  to: { type: null, default: void 0 },
  replace: { type: Boolean, default: false },
  append: { type: Boolean, default: false },
  exact: { type: Boolean, default: false }
};
const _hoisted_1$4 = ["href", "target"];
const _hoisted_2$4 = ["type", "checked", "disabled"];
const _hoisted_3$2 = ["type", "disabled"];
const _hoisted_4$1 = ["type", "disabled"];
const _sfc_main$4 = {
  props: __spreadProps(__spreadValues({}, linkProps), {
    justified: { type: Boolean, default: false },
    type: { type: String, default: "default" },
    nativeType: { type: String, default: "button" },
    size: { type: String, default: void 0 },
    block: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    modelValue: { type: null, default: null },
    inputValue: { type: null, default: null },
    inputType: {
      type: String,
      validator(value) {
        return value === "checkbox" || value === "radio";
      },
      default: void 0
    }
  }),
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const isInputActive = computed(() => props.inputType === "checkbox" ? props.modelValue.indexOf(props.inputValue) >= 0 : props.modelValue === props.inputValue);
    const classes = computed(() => ({
      btn: true,
      active: props.inputType ? isInputActive.value : props.active,
      disabled: props.disabled,
      "btn-block": props.block,
      [`btn-${props.type}`]: !!props.type,
      [`btn-${props.size}`]: !!props.size
    }));
    function onClick(e) {
      if (props.disabled && e instanceof Event) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
    function onInputChange() {
      if (props.inputType === "checkbox") {
        const valueCopied = props.modelValue.slice();
        if (isInputActive.value) {
          valueCopied.splice(valueCopied.indexOf(props.inputValue), 1);
        } else {
          valueCopied.push(props.inputValue);
        }
        emit("update:modelValue", valueCopied);
      } else {
        emit("update:modelValue", props.inputValue);
      }
    }
    return (_ctx, _cache) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      return _ctx.href ? (openBlock(), createElementBlock("a", {
        key: 0,
        href: _ctx.href,
        target: _ctx.target,
        role: "button",
        class: normalizeClass(unref(classes)),
        onClick
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_1$4)) : _ctx.to ? (openBlock(), createBlock(_component_RouterLink, {
        key: 1,
        to: _ctx.to,
        class: normalizeClass(unref(classes)),
        event: __props.disabled ? "" : "click",
        replace: _ctx.replace,
        append: _ctx.append,
        exact: _ctx.exact,
        role: "button",
        onClick
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["to", "class", "event", "replace", "append", "exact"])) : __props.inputType ? (openBlock(), createElementBlock("label", {
        key: 2,
        class: normalizeClass(unref(classes)),
        onClick
      }, [
        createElementVNode("input", {
          autocomplete: "off",
          type: __props.inputType,
          checked: unref(isInputActive),
          disabled: __props.disabled,
          onInput: _cache[0] || (_cache[0] = withModifiers(() => {
          }, ["stop"])),
          onChange: onInputChange
        }, null, 40, _hoisted_2$4),
        renderSlot(_ctx.$slots, "default")
      ], 2)) : __props.justified ? (openBlock(), createBlock(_sfc_main$5, { key: 3 }, {
        default: withCtx(() => [
          createElementVNode("button", {
            class: normalizeClass(unref(classes)),
            type: __props.nativeType,
            disabled: __props.disabled,
            onClick
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 10, _hoisted_3$2)
        ]),
        _: 3
      })) : (openBlock(), createElementBlock("button", {
        key: 4,
        class: normalizeClass(unref(classes)),
        type: __props.nativeType,
        disabled: __props.disabled,
        onClick
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_4$1));
    };
  }
};
function pad(value, num) {
  let res = value.toString();
  for (let i = num - res.length; i > 0; i--) {
    res = "0" + res;
  }
  return res;
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
const _sfc_main$3 = {
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
  emits: [
    "date-change",
    "year-change",
    "month-change",
    "view-change"
  ],
  setup(__props, { emit }) {
    const props = __props;
    const weekDays = computed(() => {
      const days = [];
      let firstDay = props.weekStartsWith;
      while (days.length < 7) {
        days.push(firstDay++);
        if (firstDay > 6) {
          firstDay = 0;
        }
      }
      return days;
    });
    const yearMonthStr = computed(() => {
      if (props.yearMonthFormatter) {
        return props.yearMonthFormatter(props.year, props.month);
      } else {
        return isExist(props.month) ? `${props.year} ${t(`uiv.datePicker.month${props.month + 1}`)}` : props.year;
      }
    });
    const monthDayRows = computed(() => {
      var _a, _b;
      const rows = [];
      const firstDay = new Date(props.year, props.month, 1);
      const prevMonthLastDate = new Date(props.year, props.month, 0).getDate();
      const startIndex = firstDay.getDay();
      const daysNum = daysInMonth(props.month, props.year);
      let weekOffset = 0;
      if (props.weekStartsWith > startIndex) {
        weekOffset = 7 - props.weekStartsWith;
      } else {
        weekOffset = 0 - props.weekStartsWith;
      }
      for (let i = 0; i < 6; i++) {
        rows.push([]);
        for (let j = 0 - weekOffset; j < 7 - weekOffset; j++) {
          const currentIndex = i * 7 + j;
          const date = { year: props.year, disabled: false };
          if (currentIndex < startIndex) {
            date.date = prevMonthLastDate - startIndex + currentIndex + 1;
            if (props.month > 0) {
              date.month = props.month - 1;
            } else {
              date.month = 11;
              date.year--;
            }
          } else if (currentIndex < startIndex + daysNum) {
            date.date = currentIndex - startIndex + 1;
            date.month = props.month;
          } else {
            date.date = currentIndex - startIndex - daysNum + 1;
            if (props.month < 11) {
              date.month = props.month + 1;
            } else {
              date.month = 0;
              date.year++;
            }
          }
          const dateObj = new Date(date.year, date.month, date.date);
          let afterFrom = true;
          let beforeTo = true;
          if ((_a = props.limit) == null ? void 0 : _a.from) {
            afterFrom = dateObj >= props.limit.from;
          }
          if ((_b = props.limit) == null ? void 0 : _b.to) {
            beforeTo = dateObj < props.limit.to;
          }
          date.disabled = !afterFrom || !beforeTo;
          if (isFunction(props.dateClass)) {
            date.classes = props.dateClass(dateObj, {
              currentMonth: props.month,
              currentYear: props.year
            });
          } else {
            date.classes = "";
          }
          rows[i].push(date);
        }
      }
      return rows;
    });
    function tWeekName(index) {
      return t(`uiv.datePicker.week${index}`);
    }
    function getBtnType(date) {
      if (props.date && date.date === props.date.getDate() && date.month === props.date.getMonth() && date.year === props.date.getFullYear()) {
        return "primary";
      } else if (date.date === props.today.getDate() && date.month === props.today.getMonth() && date.year === props.today.getFullYear()) {
        return "info";
      } else {
        return "default";
      }
    }
    function select(date) {
      emit("date-change", date);
    }
    function goPrevMonth() {
      let month = props.month;
      let year = props.year;
      if (props.month > 0) {
        month--;
      } else {
        month = 11;
        year--;
        emit("year-change", year);
      }
      emit("month-change", month);
    }
    function goNextMonth() {
      let month = props.month;
      let year = props.year;
      if (props.month < 11) {
        month++;
      } else {
        month = 0;
        year++;
        emit("year-change", year);
      }
      emit("month-change", month);
    }
    function changeView() {
      emit("view-change", "m");
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("table", _hoisted_1$3, [
        createElementVNode("thead", null, [
          createElementVNode("tr", null, [
            createElementVNode("td", null, [
              createVNode(_sfc_main$4, {
                class: "uiv-datepicker-pager-prev",
                block: "",
                size: "sm",
                style: { "border": "none" },
                onClick: goPrevMonth
              }, {
                default: withCtx(() => [
                  createElementVNode("i", {
                    class: normalizeClass(__props.iconControlLeft)
                  }, null, 2)
                ]),
                _: 1
              })
            ]),
            createElementVNode("td", {
              colspan: __props.weekNumbers ? 6 : 5
            }, [
              createVNode(_sfc_main$4, {
                class: "uiv-datepicker-title",
                block: "",
                size: "sm",
                style: { "border": "none" },
                onClick: changeView
              }, {
                default: withCtx(() => [
                  createElementVNode("b", null, toDisplayString(unref(yearMonthStr)), 1)
                ]),
                _: 1
              })
            ], 8, _hoisted_2$3),
            createElementVNode("td", null, [
              createVNode(_sfc_main$4, {
                class: "uiv-datepicker-pager-next",
                block: "",
                size: "sm",
                style: { "border": "none" },
                onClick: goNextMonth
              }, {
                default: withCtx(() => [
                  createElementVNode("i", {
                    class: normalizeClass(__props.iconControlRight)
                  }, null, 2)
                ]),
                _: 1
              })
            ])
          ]),
          createElementVNode("tr", _hoisted_3$1, [
            __props.weekNumbers ? (openBlock(), createElementBlock("td", _hoisted_4)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(weekDays), (day, index) => {
              return openBlock(), createElementBlock("td", {
                key: index,
                width: "14.2857142857%"
              }, [
                createElementVNode("small", _hoisted_5, toDisplayString(tWeekName(day === 0 ? 7 : day)), 1)
              ]);
            }), 128))
          ])
        ]),
        createElementVNode("tbody", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(monthDayRows), (row, i) => {
            return openBlock(), createElementBlock("tr", { key: i }, [
              __props.weekNumbers ? (openBlock(), createElementBlock("td", _hoisted_6, [
                createElementVNode("small", _hoisted_7, toDisplayString(unref(getWeekNumber)(row[__props.weekStartsWith])), 1)
              ])) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(row, (d, j) => {
                return openBlock(), createElementBlock("td", {
                  key: `${i}_${j}`
                }, [
                  createVNode(_sfc_main$4, {
                    block: "",
                    size: "sm",
                    style: { "border": "none" },
                    "data-action": "select",
                    class: normalizeClass(d.classes),
                    type: getBtnType(d),
                    disabled: d.disabled,
                    onClick: ($event) => select(d)
                  }, {
                    default: withCtx(() => [
                      createElementVNode("span", {
                        "data-action": "select",
                        class: normalizeClass({ "text-muted": __props.month !== d.month })
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
    };
  }
};
const _hoisted_1$2 = {
  role: "grid",
  style: { "width": "100%" }
};
const _hoisted_2$2 = { colspan: "4" };
const _sfc_main$2 = {
  props: {
    month: { type: Number, default: void 0 },
    year: { type: Number, default: void 0 },
    iconControlLeft: { type: String, default: void 0 },
    iconControlRight: { type: String, default: void 0 }
  },
  emits: ["year-change", "month-change", "view-change"],
  setup(__props, { emit }) {
    const props = __props;
    const rows = reactive([]);
    onMounted(() => {
      for (let i = 0; i < 4; i++) {
        rows.push([]);
        for (let j = 0; j < 3; j++) {
          rows[i].push(i * 3 + j + 1);
        }
      }
    });
    function tCell(cell) {
      return t(`uiv.datePicker.month${cell}`);
    }
    function getBtnClass(month) {
      if (month === props.month) {
        return "primary";
      } else {
        return "default";
      }
    }
    function goPrevYear() {
      emit("year-change", props.year - 1);
    }
    function goNextYear() {
      emit("year-change", props.year + 1);
    }
    function changeView(monthIndex) {
      if (isExist(monthIndex)) {
        emit("month-change", monthIndex);
        emit("view-change", "d");
      } else {
        emit("view-change", "y");
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("table", _hoisted_1$2, [
        createElementVNode("thead", null, [
          createElementVNode("tr", null, [
            createElementVNode("td", null, [
              createVNode(_sfc_main$4, {
                class: "uiv-datepicker-pager-prev",
                block: "",
                size: "sm",
                style: { "border": "none" },
                onClick: goPrevYear
              }, {
                default: withCtx(() => [
                  createElementVNode("i", {
                    class: normalizeClass(__props.iconControlLeft)
                  }, null, 2)
                ]),
                _: 1
              })
            ]),
            createElementVNode("td", _hoisted_2$2, [
              createVNode(_sfc_main$4, {
                class: "uiv-datepicker-title",
                block: "",
                size: "sm",
                style: { "border": "none" },
                onClick: _cache[0] || (_cache[0] = ($event) => changeView())
              }, {
                default: withCtx(() => [
                  createElementVNode("b", null, toDisplayString(__props.year), 1)
                ]),
                _: 1
              })
            ]),
            createElementVNode("td", null, [
              createVNode(_sfc_main$4, {
                class: "uiv-datepicker-pager-next",
                block: "",
                size: "sm",
                style: { "border": "none" },
                onClick: goNextYear
              }, {
                default: withCtx(() => [
                  createElementVNode("i", {
                    class: normalizeClass(__props.iconControlRight)
                  }, null, 2)
                ]),
                _: 1
              })
            ])
          ])
        ]),
        createElementVNode("tbody", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(rows), (row, i) => {
            return openBlock(), createElementBlock("tr", { key: i }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(row, (m, j) => {
                return openBlock(), createElementBlock("td", {
                  key: `${i}_${j}`,
                  colspan: "2",
                  width: "33.333333%"
                }, [
                  createVNode(_sfc_main$4, {
                    block: "",
                    size: "sm",
                    style: { "border": "none" },
                    type: getBtnClass(i * 3 + j),
                    onClick: ($event) => changeView(i * 3 + j)
                  }, {
                    default: withCtx(() => [
                      createElementVNode("span", null, toDisplayString(tCell(m)), 1)
                    ]),
                    _: 2
                  }, 1032, ["type", "onClick"])
                ]);
              }), 128))
            ]);
          }), 128))
        ])
      ]);
    };
  }
};
const _hoisted_1$1 = {
  role: "grid",
  style: { "width": "100%" }
};
const _hoisted_2$1 = { colspan: "3" };
const _sfc_main$1 = {
  props: {
    year: { type: Number, default: void 0 },
    iconControlLeft: { type: String, default: void 0 },
    iconControlRight: { type: String, default: void 0 }
  },
  emits: ["year-change", "view-change"],
  setup(__props, { emit }) {
    const props = __props;
    function getBtnClass(year) {
      if (year === props.year) {
        return "primary";
      } else {
        return "default";
      }
    }
    function goPrevYear() {
      emit("year-change", props.year - 20);
    }
    function goNextYear() {
      emit("year-change", props.year + 20);
    }
    function changeView(year) {
      emit("year-change", year);
      emit("view-change", "m");
    }
    const rows = computed(() => {
      const rows2 = [];
      const yearGroupStart = props.year - props.year % 20;
      for (let i = 0; i < 4; i++) {
        rows2.push([]);
        for (let j = 0; j < 5; j++) {
          rows2[i].push(yearGroupStart + i * 5 + j);
        }
      }
      return rows2;
    });
    const yearStr = computed(() => {
      const start = props.year - props.year % 20;
      return `${start} ~ ${start + 19}`;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("table", _hoisted_1$1, [
        createElementVNode("thead", null, [
          createElementVNode("tr", null, [
            createElementVNode("td", null, [
              createVNode(_sfc_main$4, {
                class: "uiv-datepicker-pager-prev",
                block: "",
                size: "sm",
                style: { "border": "none" },
                onClick: goPrevYear
              }, {
                default: withCtx(() => [
                  createElementVNode("i", {
                    class: normalizeClass(__props.iconControlLeft)
                  }, null, 2)
                ]),
                _: 1
              })
            ]),
            createElementVNode("td", _hoisted_2$1, [
              createVNode(_sfc_main$4, {
                class: "uiv-datepicker-title",
                block: "",
                size: "sm",
                style: { "border": "none" }
              }, {
                default: withCtx(() => [
                  createElementVNode("b", null, toDisplayString(unref(yearStr)), 1)
                ]),
                _: 1
              })
            ]),
            createElementVNode("td", null, [
              createVNode(_sfc_main$4, {
                class: "uiv-datepicker-pager-next",
                block: "",
                size: "sm",
                style: { "border": "none" },
                onClick: goNextYear
              }, {
                default: withCtx(() => [
                  createElementVNode("i", {
                    class: normalizeClass(__props.iconControlRight)
                  }, null, 2)
                ]),
                _: 1
              })
            ])
          ])
        ]),
        createElementVNode("tbody", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(rows), (row, i) => {
            return openBlock(), createElementBlock("tr", { key: i }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(row, (y, j) => {
                return openBlock(), createElementBlock("td", {
                  key: `${i}_${j}`,
                  width: "20%"
                }, [
                  createVNode(_sfc_main$4, {
                    block: "",
                    size: "sm",
                    style: { "border": "none" },
                    type: getBtnClass(y),
                    onClick: ($event) => changeView(y)
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
    };
  }
};
const _hoisted_1 = { key: 0 };
const _hoisted_2 = /* @__PURE__ */ createElementVNode("br", null, null, -1);
const _hoisted_3 = { class: "text-center" };
const _sfc_main = {
  props: {
    modelValue: { type: null, required: true },
    width: { type: Number, default: 270 },
    todayBtn: { type: Boolean, default: true },
    clearBtn: { type: Boolean, default: true },
    closeOnSelected: { type: Boolean, default: true },
    limitFrom: { type: null, default: void 0 },
    limitTo: { type: null, default: void 0 },
    format: { type: String, default: "yyyy-MM-dd" },
    initialView: { type: String, default: "d" },
    dateParser: { type: Function, default: Date.parse },
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
  setup(__props, { emit }) {
    const props = __props;
    ref(false);
    const now = ref(new Date());
    const currentMonth = ref(0);
    const currentYear = ref(0);
    const view = ref("d");
    const valueDateObj = computed(() => {
      const ts = props.dateParser(props.modelValue);
      if (isNaN(ts)) {
        return null;
      } else {
        let date = new Date(ts);
        if (date.getHours() !== 0) {
          date = new Date(ts + date.getTimezoneOffset() * 60 * 1e3);
        }
        return date;
      }
    });
    const pickerStyle = computed(() => {
      return {
        width: props.width + "px"
      };
    });
    const pickerClass = computed(() => {
      return {
        "uiv-datepicker": true,
        "uiv-datepicker-date": view.value === "d",
        "uiv-datepicker-month": view.value === "m",
        "uiv-datepicker-year": view.value === "y"
      };
    });
    const limit = computed(() => {
      const limit2 = {};
      if (props.limitFrom) {
        let limitFrom = props.dateParser(props.limitFrom);
        if (!isNaN(limitFrom)) {
          limitFrom = convertDateToUTC(new Date(limitFrom));
          limitFrom.setHours(0, 0, 0, 0);
          limit2.from = limitFrom;
        }
      }
      if (props.limitTo) {
        let limitTo = props.dateParser(props.limitTo);
        if (!isNaN(limitTo)) {
          limitTo = convertDateToUTC(new Date(limitTo));
          limitTo.setHours(0, 0, 0, 0);
          limit2.to = limitTo;
        }
      }
      return limit2;
    });
    watch(() => props.modelValue, (val, oldVal) => {
      setMonthAndYearByValue(val, oldVal);
    });
    onMounted(() => {
      if (props.modelValue) {
        setMonthAndYearByValue(props.modelValue);
      } else {
        currentMonth.value = now.value.getMonth();
        currentYear.value = now.value.getFullYear();
        view.value = props.initialView;
      }
    });
    function setMonthAndYearByValue(val, oldVal) {
      const ts = props.dateParser(val);
      if (!isNaN(ts)) {
        let date = new Date(ts);
        if (date.getHours() !== 0) {
          date = new Date(ts + date.getTimezoneOffset() * 60 * 1e3);
        }
        if (limit.value && (limit.value.from && date < limit.value.from || limit.value.to && date >= limit.value.to)) {
          emit("update:modelValue", oldVal || "");
        } else {
          currentMonth.value = date.getMonth();
          currentYear.value = date.getFullYear();
        }
      }
    }
    function onMonthChange(month) {
      currentMonth.value = month;
    }
    function onYearChange(year) {
      currentYear.value = year;
      currentMonth.value = void 0;
    }
    function onDateChange(date) {
      if (date && isNumber(date.date) && isNumber(date.month) && isNumber(date.year)) {
        const _date = new Date(date.year, date.month, date.date);
        emit("update:modelValue", props.format ? stringify(_date, props.format) : _date);
        currentMonth.value = date.month;
        currentYear.value = date.year;
      } else {
        emit("update:modelValue", "");
      }
    }
    function onViewChange(v) {
      view.value = v;
    }
    function selectToday() {
      view.value = "d";
      onDateChange({
        date: now.value.getDate(),
        month: now.value.getMonth(),
        year: now.value.getFullYear()
      });
    }
    function clearSelect() {
      currentMonth.value = now.value.getMonth();
      currentYear.value = now.value.getFullYear();
      view.value = props.initialView;
      onDateChange();
    }
    function onPickerClick(event) {
      if (event.target.getAttribute("data-action") !== "select" || !props.closeOnSelected) {
        event.stopPropagation();
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(pickerClass)),
        style: normalizeStyle(unref(pickerStyle)),
        "data-role": "date-picker",
        onClick: onPickerClick
      }, [
        withDirectives(createVNode(_sfc_main$3, {
          month: currentMonth.value,
          year: currentYear.value,
          date: unref(valueDateObj),
          today: now.value,
          limit: unref(limit),
          "week-starts-with": __props.weekStartsWith,
          "icon-control-left": __props.iconControlLeft,
          "icon-control-right": __props.iconControlRight,
          "date-class": __props.dateClass,
          "year-month-formatter": __props.yearMonthFormatter,
          "week-numbers": __props.weekNumbers,
          onMonthChange,
          onYearChange,
          onDateChange,
          onViewChange
        }, null, 8, ["month", "year", "date", "today", "limit", "week-starts-with", "icon-control-left", "icon-control-right", "date-class", "year-month-formatter", "week-numbers"]), [
          [vShow, view.value === "d"]
        ]),
        withDirectives(createVNode(_sfc_main$2, {
          month: currentMonth.value,
          year: currentYear.value,
          "icon-control-left": __props.iconControlLeft,
          "icon-control-right": __props.iconControlRight,
          onMonthChange,
          onYearChange,
          onViewChange
        }, null, 8, ["month", "year", "icon-control-left", "icon-control-right"]), [
          [vShow, view.value === "m"]
        ]),
        withDirectives(createVNode(_sfc_main$1, {
          year: currentYear.value,
          "icon-control-left": __props.iconControlLeft,
          "icon-control-right": __props.iconControlRight,
          onYearChange,
          onViewChange
        }, null, 8, ["year", "icon-control-left", "icon-control-right"]), [
          [vShow, view.value === "y"]
        ]),
        __props.todayBtn || __props.clearBtn ? (openBlock(), createElementBlock("div", _hoisted_1, [
          _hoisted_2,
          createElementVNode("div", _hoisted_3, [
            __props.todayBtn ? (openBlock(), createBlock(_sfc_main$4, {
              key: 0,
              "data-action": "select",
              "data-type": "today",
              type: "info",
              size: "sm",
              onClick: selectToday,
              textContent: toDisplayString(unref(t)("uiv.datePicker.today"))
            }, null, 8, ["textContent"])) : createCommentVNode("", true),
            __props.clearBtn ? (openBlock(), createBlock(_sfc_main$4, {
              key: 1,
              "data-action": "select",
              "data-type": "clear",
              size: "sm",
              onClick: clearSelect,
              textContent: toDisplayString(unref(t)("uiv.datePicker.clear"))
            }, null, 8, ["textContent"])) : createCommentVNode("", true)
          ])
        ])) : createCommentVNode("", true)
      ], 6);
    };
  }
};
export { _sfc_main as default };
