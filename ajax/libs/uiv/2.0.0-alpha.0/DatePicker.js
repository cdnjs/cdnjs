import { openBlock, createElementBlock, normalizeClass, renderSlot, resolveComponent, createBlock, withCtx, createElementVNode, withModifiers, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, normalizeStyle, withDirectives, vShow } from 'vue';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
function assign(target, varArgs) {
  var arguments$1 = arguments;

  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  var to = Object(target);
  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments$1[index];
    if (nextSource !== null && nextSource !== undefined) {
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        /* istanbul ignore else */
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to
}

function isExist(obj) {
  return typeof obj !== 'undefined' && obj !== null
}

function isFunction(obj) {
  return typeof obj === 'function'
}

function isNumber(obj) {
  return typeof obj === 'number'
}

var defaultLang = {
  uiv: {
    datePicker: {
      clear: 'Clear',
      today: 'Today',
      month: 'Month',
      month1: 'January',
      month2: 'February',
      month3: 'March',
      month4: 'April',
      month5: 'May',
      month6: 'June',
      month7: 'July',
      month8: 'August',
      month9: 'September',
      month10: 'October',
      month11: 'November',
      month12: 'December',
      year: 'Year',
      week1: 'Mon',
      week2: 'Tue',
      week3: 'Wed',
      week4: 'Thu',
      week5: 'Fri',
      week6: 'Sat',
      week7: 'Sun',
    },
    timePicker: {
      am: 'AM',
      pm: 'PM',
    },
    modal: {
      cancel: 'Cancel',
      ok: 'OK',
    },
    multiSelect: {
      placeholder: 'Select...',
      filterPlaceholder: 'Search...',
    },
  },
};

var lang = defaultLang;

var i18nHandler = function () {
  if ('$t' in this) {
    return this.$t.apply(this, arguments)
  }
  return null
};

var t = function (path, options) {
  options = options || {};
  var value;
  try {
    value = i18nHandler.apply(this, arguments);
    /* istanbul ignore next */
    if (isExist(value) && !options.$$locale) {
      return value
    }
  } catch (e) {
    // ignore
  }
  var array = path.split('.');
  var current = options.$$locale || lang;

  for (var i = 0, j = array.length; i < j; i++) {
    var property = array[i];
    value = current[property];
    if (i === j - 1) { return value }
    if (!value) { return '' }
    current = value;
  }
  /* istanbul ignore next */
  return ''
};

var Locale = {
  methods: {
    t: function t$1() {
      var arguments$1 = arguments;

      var args = [];
      for (var i = 0; i < arguments.length; ++i) {
        args.push(arguments$1[i]);
      }
      args[1] = assign({}, { $$locale: this.locale }, args[1]);
      return t.apply(this, args)
    },
  },
  props: {
    locale: Object,
  },
};

var linkMixin = {
  props: {
    // <a> props
    href: String,
    target: String,
    // <router-link> props
    to: null,
    replace: {
      type: Boolean,
      default: false,
    },
    append: {
      type: Boolean,
      default: false,
    },
    exact: {
      type: Boolean,
      default: false,
    },
  },
};

var script$5 = {
  props: {
    size: { type: String, default: undefined },
    vertical: {
      type: Boolean,
      default: false,
    },
    justified: {
      type: Boolean,
      default: false,
    },
  },
};

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  var obj;

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(( obj = {
      'btn-group': !$props.vertical,
      'btn-group-vertical': $props.vertical,
      'btn-group-justified': $props.justified
    }, obj[("btn-group-" + ($props.size))] = $props.size, obj )),
    role: "group",
    "data-toggle": "buttons"
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script$5.render = render$5;
script$5.__file = "src/components/button/BtnGroup.vue";

var INPUT_TYPE_CHECKBOX = 'checkbox';
var INPUT_TYPE_RADIO = 'radio';

var script$4 = {
  components: { BtnGroup: script$5 },
  mixins: [linkMixin],
  props: {
    justified: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'default',
    },
    nativeType: {
      type: String,
      default: 'button',
    },
    size: {
      type: String,
      default: undefined,
    },
    block: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // <input> props
    modelValue: {
      type: null,
      default: null,
    },
    inputValue: {
      type: null,
      default: null,
    },
    inputType: {
      type: String,
      validator: function validator(value) {
        return value === INPUT_TYPE_CHECKBOX || value === INPUT_TYPE_RADIO
      },
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    isInputActive: function isInputActive() {
      return this.inputType === INPUT_TYPE_CHECKBOX
        ? this.modelValue.indexOf(this.inputValue) >= 0
        : this.modelValue === this.inputValue
    },
    classes: function classes() {
      var obj;

      return ( obj = {
        btn: true,
        active: this.inputType ? this.isInputActive : this.active,
        disabled: this.disabled,
        'btn-block': this.block
      }, obj[("btn-" + (this.type))] = Boolean(this.type), obj[("btn-" + (this.size))] = Boolean(this.size), obj )
    },
  },
  methods: {
    onClick: function onClick(e) {
      if (this.disabled && e instanceof Event) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    onInputChange: function onInputChange() {
      if (this.inputType === INPUT_TYPE_CHECKBOX) {
        var valueCopied = this.modelValue.slice();
        if (this.isInputActive) {
          valueCopied.splice(valueCopied.indexOf(this.inputValue), 1);
        } else {
          valueCopied.push(this.inputValue);
        }
        this.$emit('update:modelValue', valueCopied);
      } else {
        this.$emit('update:modelValue', this.inputValue);
      }
    },
  },
};

var _hoisted_1$4 = ["href", "target"];
var _hoisted_2$4 = ["type", "checked", "disabled"];
var _hoisted_3$2 = ["type", "disabled"];
var _hoisted_4$1 = ["type", "disabled"];

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = resolveComponent("router-link");
  var _component_BtnGroup = resolveComponent("BtnGroup");

  return (_ctx.href)
    ? (openBlock(), createElementBlock("a", {
        key: 0,
        href: _ctx.href,
        target: _ctx.target,
        role: "button",
        class: normalizeClass($options.classes),
        onClick: _cache[0] || (_cache[0] = function () {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          return ($options.onClick && $options.onClick.apply($options, args));
  })
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10 /* CLASS, PROPS */, _hoisted_1$4))
    : (_ctx.to)
      ? (openBlock(), createBlock(_component_router_link, {
          key: 1,
          to: _ctx.to,
          class: normalizeClass($options.classes),
          event: $props.disabled ? '' : 'click',
          replace: _ctx.replace,
          append: _ctx.append,
          exact: _ctx.exact,
          role: "button",
          onClick: $options.onClick
        }, {
          default: withCtx(function () { return [
            renderSlot(_ctx.$slots, "default")
          ]; }),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["to", "class", "event", "replace", "append", "exact", "onClick"]))
      : ($props.inputType)
        ? (openBlock(), createElementBlock("label", {
            key: 2,
            class: normalizeClass($options.classes),
            onClick: _cache[3] || (_cache[3] = function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return ($options.onClick && $options.onClick.apply($options, args));
  })
          }, [
            createElementVNode("input", {
              autocomplete: "off",
              type: $props.inputType,
              checked: $options.isInputActive,
              disabled: $props.disabled,
              onInput: _cache[1] || (_cache[1] = withModifiers(function () {}, ["stop"])),
              onChange: _cache[2] || (_cache[2] = function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                return ($options.onInputChange && $options.onInputChange.apply($options, args));
  })
            }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_2$4),
            renderSlot(_ctx.$slots, "default")
          ], 2 /* CLASS */))
        : ($props.justified)
          ? (openBlock(), createBlock(_component_BtnGroup, { key: 3 }, {
              default: withCtx(function () { return [
                createElementVNode("button", {
                  class: normalizeClass($options.classes),
                  type: $props.nativeType,
                  disabled: $props.disabled,
                  onClick: _cache[4] || (_cache[4] = function () {
                    var args = [], len = arguments.length;
                    while ( len-- ) args[ len ] = arguments[ len ];

                    return ($options.onClick && $options.onClick.apply($options, args));
                })
                }, [
                  renderSlot(_ctx.$slots, "default")
                ], 10 /* CLASS, PROPS */, _hoisted_3$2)
              ]; }),
              _: 3 /* FORWARDED */
            }))
          : (openBlock(), createElementBlock("button", {
              key: 4,
              class: normalizeClass($options.classes),
              type: $props.nativeType,
              disabled: $props.disabled,
              onClick: _cache[5] || (_cache[5] = function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                return ($options.onClick && $options.onClick.apply($options, args));
  })
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 10 /* CLASS, PROPS */, _hoisted_4$1))
}

script$4.render = render$4;
script$4.__file = "src/components/button/Btn.vue";

function pad(value, num) {
  value = value + '';
  for (var i = num - value.length; i > 0; i--) {
    value = '0' + value;
  }
  return value
}

var monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December' ];

/**
 * Get total days number in a month.
 * because we're using 0 as the day so that it returns the last day
 * of the last month, so you have to add 1 to the month number
 * so it returns the correct amount of days.
 * https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
 * @param month 0-based
 * @param year
 * @returns {number}
 */
function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate()
}

function stringify(date, format) {
  try {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var monthName = monthNames[month - 1];
    return format
      .replace(/yyyy/g, year)
      .replace(/MMMM/g, monthName)
      .replace(/MMM/g, monthName.substring(0, 3))
      .replace(/MM/g, pad(month, 2))
      .replace(/dd/g, pad(day, 2))
      .replace(/yy/g, year)
      .replace(/M(?!a)/g, month)
      .replace(/d/g, day)
  } catch (e) {
    return ''
  }
}

function convertDateToUTC(date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )
}

/**
 * https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
 * For a given date, get the ISO week number
 * Based on information at:
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 *
 * @param {number} d.year year of date
 * @param {number} d.month month of date
 * @param {number} d.date date of date
 * @returns {number}
 */
function getWeekNumber(d) {
  // Copy date so don't modify original
  var _d = new Date(Date.UTC(d.year, d.month, d.date));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  _d.setUTCDate(_d.getUTCDate() + 4 - (_d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(_d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  return Math.ceil(((_d - yearStart) / 86400000 + 1) / 7)
}

var script$3 = {
  components: { Btn: script$4 },
  mixins: [Locale],
  props: {
    month: { type: Number, default: undefined },
    year: { type: Number, default: undefined },
    date: { type: Date, default: undefined },
    today: { type: Date, default: undefined },
    limit: { type: Object, default: undefined },
    weekStartsWith: { type: Number, default: undefined },
    iconControlLeft: { type: String, default: undefined },
    iconControlRight: { type: String, default: undefined },
    dateClass: { type: Function, default: undefined },
    yearMonthFormatter: { type: Function, default: undefined },
    weekNumbers: Boolean,
  },
  emits: ['date-change', 'year-change', 'month-change', 'view-change'],
  computed: {
    weekDays: function weekDays() {
      var days = [];
      var firstDay = this.weekStartsWith;
      while (days.length < 7) {
        days.push(firstDay++);
        if (firstDay > 6) {
          firstDay = 0;
        }
      }
      return days
    },
    yearMonthStr: function yearMonthStr() {
      if (this.yearMonthFormatter) {
        return this.yearMonthFormatter(this.year, this.month)
      } else {
        return isExist(this.month)
          ? ((this.year) + " " + (this.t(("uiv.datePicker.month" + (this.month + 1)))))
          : this.year
      }
    },
    monthDayRows: function monthDayRows() {
      var rows = [];
      var firstDay = new Date(this.year, this.month, 1);
      var prevMonthLastDate = new Date(this.year, this.month, 0).getDate();
      var startIndex = firstDay.getDay();
      // console.log(startIndex)
      var daysNum = daysInMonth(this.month, this.year);
      var weekOffset = 0;
      if (this.weekStartsWith > startIndex) {
        weekOffset = 7 - this.weekStartsWith;
      } else {
        weekOffset = 0 - this.weekStartsWith;
      }
      // console.log(prevMonthLastDate, startIndex, daysNum)
      for (var i = 0; i < 6; i++) {
        rows.push([]);
        for (var j = 0 - weekOffset; j < 7 - weekOffset; j++) {
          var currentIndex = i * 7 + j;
          var date = { year: this.year, disabled: false };
          // date in and not in current month
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
          // process limit dates
          var dateObj = new Date(date.year, date.month, date.date);
          var afterFrom = true;
          var beforeTo = true;
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
              currentYear: this.year,
            });
          } else {
            date.classes = '';
          }
          rows[i].push(date);
        }
      }
      return rows
    },
  },
  methods: {
    getWeekNumber: getWeekNumber,
    tWeekName: function tWeekName(index) {
      return this.t(("uiv.datePicker.week" + index))
    },
    getBtnType: function getBtnType(date) {
      if (
        this.date &&
        date.date === this.date.getDate() &&
        date.month === this.date.getMonth() &&
        date.year === this.date.getFullYear()
      ) {
        return 'primary'
      } else if (
        date.date === this.today.getDate() &&
        date.month === this.today.getMonth() &&
        date.year === this.today.getFullYear()
      ) {
        return 'info'
      } else {
        return 'default'
      }
    },
    select: function select(date) {
      this.$emit('date-change', date);
    },
    goPrevMonth: function goPrevMonth() {
      var month = this.month;
      var year = this.year;
      if (this.month > 0) {
        month--;
      } else {
        month = 11;
        year--;
        this.$emit('year-change', year);
      }
      this.$emit('month-change', month);
    },
    goNextMonth: function goNextMonth() {
      var month = this.month;
      var year = this.year;
      if (this.month < 11) {
        month++;
      } else {
        month = 0;
        year++;
        this.$emit('year-change', year);
      }
      this.$emit('month-change', month);
    },
    changeView: function changeView() {
      this.$emit('view-change', 'm');
    },
  },
};

var _hoisted_1$3 = {
  role: "grid",
  style: {"width":"100%"}
};
var _hoisted_2$3 = ["colspan"];
var _hoisted_3$1 = { align: "center" };
var _hoisted_4 = { key: 0 };
var _hoisted_5 = { class: "uiv-datepicker-week" };
var _hoisted_6 = {
  key: 0,
  class: "text-center",
  style: {"border-right":"1px solid #eee"}
};
var _hoisted_7 = { class: "text-muted" };

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_btn = resolveComponent("btn");

  return (openBlock(), createElementBlock("table", _hoisted_1$3, [
    createElementVNode("thead", null, [
      createElementVNode("tr", null, [
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-prev",
            block: "",
            size: "sm",
            style: {"border":"none"},
            onClick: $options.goPrevMonth
          }, {
            default: withCtx(function () { return [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlLeft)
              }, null, 2 /* CLASS */)
            ]; }),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["onClick"])
        ]),
        createElementVNode("td", {
          colspan: $props.weekNumbers ? 6 : 5
        }, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-title",
            block: "",
            size: "sm",
            style: {"border":"none"},
            onClick: $options.changeView
          }, {
            default: withCtx(function () { return [
              createElementVNode("b", null, toDisplayString($options.yearMonthStr), 1 /* TEXT */)
            ]; }),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["onClick"])
        ], 8 /* PROPS */, _hoisted_2$3),
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-next",
            block: "",
            size: "sm",
            style: {"border":"none"},
            onClick: $options.goNextMonth
          }, {
            default: withCtx(function () { return [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlRight)
              }, null, 2 /* CLASS */)
            ]; }),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["onClick"])
        ])
      ]),
      createElementVNode("tr", _hoisted_3$1, [
        ($props.weekNumbers)
          ? (openBlock(), createElementBlock("td", _hoisted_4))
          : createCommentVNode("v-if", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.weekDays, function (day, index) {
          return (openBlock(), createElementBlock("td", {
            key: index,
            width: "14.2857142857%"
          }, [
            createElementVNode("small", _hoisted_5, toDisplayString($options.tWeekName(day === 0 ? 7 : day)), 1 /* TEXT */)
          ]))
        }), 128 /* KEYED_FRAGMENT */))
      ])
    ]),
    createElementVNode("tbody", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.monthDayRows, function (row, i) {
        return (openBlock(), createElementBlock("tr", { key: i }, [
          ($props.weekNumbers)
            ? (openBlock(), createElementBlock("td", _hoisted_6, [
                createElementVNode("small", _hoisted_7, toDisplayString($options.getWeekNumber(row[$props.weekStartsWith])), 1 /* TEXT */)
              ]))
            : createCommentVNode("v-if", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(row, function (d, j) {
            return (openBlock(), createElementBlock("td", {
              key: (i + "_" + j)
            }, [
              createVNode(_component_btn, {
                block: "",
                size: "sm",
                style: {"border":"none"},
                "data-action": "select",
                class: normalizeClass(d.classes),
                type: $options.getBtnType(d),
                disabled: d.disabled,
                onClick: function ($event) { return ($options.select(d)); }
              }, {
                default: withCtx(function () { return [
                  createElementVNode("span", {
                    "data-action": "select",
                    class: normalizeClass({ 'text-muted': $props.month !== d.month })
                  }, toDisplayString(d.date), 3 /* TEXT, CLASS */)
                ]; }),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "type", "disabled", "onClick"])
            ]))
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

script$3.render = render$3;
script$3.__file = "src/components/datepicker/DateView.vue";

var script$2 = {
  components: { Btn: script$4 },
  mixins: [Locale],
  props: {
    month: { type: Number, default: undefined },
    year: { type: Number, default: undefined },
    iconControlLeft: { type: String, default: undefined },
    iconControlRight: { type: String, default: undefined },
  },
  emits: ['year-change', 'month-change', 'view-change'],
  data: function data() {
    return {
      rows: [],
    }
  },
  mounted: function mounted() {
    for (var i = 0; i < 4; i++) {
      this.rows.push([]);
      for (var j = 0; j < 3; j++) {
        this.rows[i].push(i * 3 + j + 1);
      }
    }
  },
  methods: {
    tCell: function tCell(cell) {
      return this.t(("uiv.datePicker.month" + cell))
    },
    getBtnClass: function getBtnClass(month) {
      if (month === this.month) {
        return 'primary'
      } else {
        return 'default'
      }
    },
    goPrevYear: function goPrevYear() {
      this.$emit('year-change', this.year - 1);
    },
    goNextYear: function goNextYear() {
      this.$emit('year-change', this.year + 1);
    },
    changeView: function changeView(monthIndex) {
      if (isExist(monthIndex)) {
        this.$emit('month-change', monthIndex);
        this.$emit('view-change', 'd');
      } else {
        this.$emit('view-change', 'y');
      }
    },
  },
};

var _hoisted_1$2 = {
  role: "grid",
  style: {"width":"100%"}
};
var _hoisted_2$2 = { colspan: "4" };

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_btn = resolveComponent("btn");

  return (openBlock(), createElementBlock("table", _hoisted_1$2, [
    createElementVNode("thead", null, [
      createElementVNode("tr", null, [
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-prev",
            block: "",
            size: "sm",
            style: {"border":"none"},
            onClick: $options.goPrevYear
          }, {
            default: withCtx(function () { return [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlLeft)
              }, null, 2 /* CLASS */)
            ]; }),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["onClick"])
        ]),
        createElementVNode("td", _hoisted_2$2, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-title",
            block: "",
            size: "sm",
            style: {"border":"none"},
            onClick: _cache[0] || (_cache[0] = function ($event) { return ($options.changeView()); })
          }, {
            default: withCtx(function () { return [
              createElementVNode("b", null, toDisplayString($props.year), 1 /* TEXT */)
            ]; }),
            _: 1 /* STABLE */
          })
        ]),
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-next",
            block: "",
            size: "sm",
            style: {"border":"none"},
            onClick: $options.goNextYear
          }, {
            default: withCtx(function () { return [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlRight)
              }, null, 2 /* CLASS */)
            ]; }),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["onClick"])
        ])
      ])
    ]),
    createElementVNode("tbody", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.rows, function (row, i) {
        return (openBlock(), createElementBlock("tr", { key: i }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(row, function (m, j) {
            return (openBlock(), createElementBlock("td", {
              key: (i + "_" + j),
              colspan: "2",
              width: "33.333333%"
            }, [
              createVNode(_component_btn, {
                block: "",
                size: "sm",
                style: {"border":"none"},
                type: $options.getBtnClass(i * 3 + j),
                onClick: function ($event) { return ($options.changeView(i * 3 + j)); }
              }, {
                default: withCtx(function () { return [
                  createElementVNode("span", null, toDisplayString($options.tCell(m)), 1 /* TEXT */)
                ]; }),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "onClick"])
            ]))
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

script$2.render = render$2;
script$2.__file = "src/components/datepicker/MonthView.vue";

var script$1 = {
  components: { Btn: script$4 },
  props: {
    year: { type: Number, default: undefined },
    iconControlLeft: { type: String, default: undefined },
    iconControlRight: { type: String, default: undefined },
  },
  emits: ['year-change', 'view-change'],
  computed: {
    rows: function rows() {
      var rows = [];
      var yearGroupStart = this.year - (this.year % 20);
      for (var i = 0; i < 4; i++) {
        rows.push([]);
        for (var j = 0; j < 5; j++) {
          rows[i].push(yearGroupStart + i * 5 + j);
        }
      }
      return rows
    },
    yearStr: function yearStr() {
      var start = this.year - (this.year % 20);
      return (start + " ~ " + (start + 19))
    },
  },
  methods: {
    getBtnClass: function getBtnClass(year) {
      if (year === this.year) {
        return 'primary'
      } else {
        return 'default'
      }
    },
    goPrevYear: function goPrevYear() {
      this.$emit('year-change', this.year - 20);
    },
    goNextYear: function goNextYear() {
      this.$emit('year-change', this.year + 20);
    },
    changeView: function changeView(year) {
      this.$emit('year-change', year);
      this.$emit('view-change', 'm');
    },
  },
};

var _hoisted_1$1 = {
  role: "grid",
  style: {"width":"100%"}
};
var _hoisted_2$1 = { colspan: "3" };

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_btn = resolveComponent("btn");

  return (openBlock(), createElementBlock("table", _hoisted_1$1, [
    createElementVNode("thead", null, [
      createElementVNode("tr", null, [
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-prev",
            block: "",
            size: "sm",
            style: {"border":"none"},
            onClick: $options.goPrevYear
          }, {
            default: withCtx(function () { return [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlLeft)
              }, null, 2 /* CLASS */)
            ]; }),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["onClick"])
        ]),
        createElementVNode("td", _hoisted_2$1, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-title",
            block: "",
            size: "sm",
            style: {"border":"none"}
          }, {
            default: withCtx(function () { return [
              createElementVNode("b", null, toDisplayString($options.yearStr), 1 /* TEXT */)
            ]; }),
            _: 1 /* STABLE */
          })
        ]),
        createElementVNode("td", null, [
          createVNode(_component_btn, {
            class: "uiv-datepicker-pager-next",
            block: "",
            size: "sm",
            style: {"border":"none"},
            onClick: $options.goNextYear
          }, {
            default: withCtx(function () { return [
              createElementVNode("i", {
                class: normalizeClass($props.iconControlRight)
              }, null, 2 /* CLASS */)
            ]; }),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["onClick"])
        ])
      ])
    ]),
    createElementVNode("tbody", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.rows, function (row, i) {
        return (openBlock(), createElementBlock("tr", { key: i }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(row, function (y, j) {
            return (openBlock(), createElementBlock("td", {
              key: (i + "_" + j),
              width: "20%"
            }, [
              createVNode(_component_btn, {
                block: "",
                size: "sm",
                style: {"border":"none"},
                type: $options.getBtnClass(y),
                onClick: function ($event) { return ($options.changeView(y)); }
              }, {
                default: withCtx(function () { return [
                  createElementVNode("span", null, toDisplayString(y), 1 /* TEXT */)
                ]; }),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "onClick"])
            ]))
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

script$1.render = render$1;
script$1.__file = "src/components/datepicker/YearView.vue";

var script = {
  components: { DateView: script$3, MonthView: script$2, YearView: script$1, Btn: script$4 },
  mixins: [Locale],
  props: {
    modelValue: { type: null, required: true },
    width: {
      type: Number,
      default: 270,
    },
    todayBtn: {
      type: Boolean,
      default: true,
    },
    clearBtn: {
      type: Boolean,
      default: true,
    },
    closeOnSelected: {
      type: Boolean,
      default: true,
    },
    limitFrom: { type: null, default: undefined },
    limitTo: { type: null, default: undefined },
    format: {
      type: String,
      default: 'yyyy-MM-dd',
    },
    initialView: {
      type: String,
      default: 'd',
    },
    dateParser: {
      type: Function,
      default: Date.parse,
    },
    dateClass: { type: Function, default: undefined },
    yearMonthFormatter: { type: Function, default: undefined },
    weekStartsWith: {
      type: Number,
      default: 0,
      validator: function validator(value) {
        return value >= 0 && value <= 6
      },
    },
    weekNumbers: Boolean,
    iconControlLeft: {
      type: String,
      default: 'glyphicon glyphicon-chevron-left',
    },
    iconControlRight: {
      type: String,
      default: 'glyphicon glyphicon-chevron-right',
    },
  },
  emits: ['update:modelValue'],
  data: function data() {
    return {
      show: false,
      now: new Date(),
      currentMonth: 0,
      currentYear: 0,
      view: 'd',
    }
  },
  computed: {
    valueDateObj: function valueDateObj() {
      var ts = this.dateParser(this.modelValue);
      if (isNaN(ts)) {
        return null
      } else {
        var date = new Date(ts);
        if (date.getHours() !== 0) {
          date = new Date(ts + date.getTimezoneOffset() * 60 * 1000);
        }
        return date
      }
    },
    pickerStyle: function pickerStyle() {
      return {
        width: this.width + 'px',
      }
    },
    pickerClass: function pickerClass() {
      return {
        'uiv-datepicker': true,
        'uiv-datepicker-date': this.view === 'd',
        'uiv-datepicker-month': this.view === 'm',
        'uiv-datepicker-year': this.view === 'y',
      }
    },
    limit: function limit() {
      var limit = {};
      if (this.limitFrom) {
        var limitFrom = this.dateParser(this.limitFrom);
        if (!isNaN(limitFrom)) {
          limitFrom = convertDateToUTC(new Date(limitFrom));
          limitFrom.setHours(0, 0, 0, 0);
          limit.from = limitFrom;
        }
      }
      if (this.limitTo) {
        var limitTo = this.dateParser(this.limitTo);
        if (!isNaN(limitTo)) {
          limitTo = convertDateToUTC(new Date(limitTo));
          limitTo.setHours(0, 0, 0, 0);
          limit.to = limitTo;
        }
      }
      return limit
    },
  },
  watch: {
    modelValue: function modelValue(val, oldVal) {
      this.setMonthAndYearByValue(val, oldVal);
    },
  },
  mounted: function mounted() {
    if (this.modelValue) {
      this.setMonthAndYearByValue(this.modelValue);
    } else {
      this.currentMonth = this.now.getMonth();
      this.currentYear = this.now.getFullYear();
      this.view = this.initialView;
    }
  },
  methods: {
    setMonthAndYearByValue: function setMonthAndYearByValue(val, oldVal) {
      var ts = this.dateParser(val);
      if (!isNaN(ts)) {
        var date = new Date(ts);
        if (date.getHours() !== 0) {
          date = new Date(ts + date.getTimezoneOffset() * 60 * 1000);
        }
        if (
          this.limit &&
          ((this.limit.from && date < this.limit.from) ||
            (this.limit.to && date >= this.limit.to))
        ) {
          this.$emit('update:modelValue', oldVal || '');
        } else {
          this.currentMonth = date.getMonth();
          this.currentYear = date.getFullYear();
        }
      }
    },
    onMonthChange: function onMonthChange(month) {
      this.currentMonth = month;
    },
    onYearChange: function onYearChange(year) {
      this.currentYear = year;
      this.currentMonth = undefined;
    },
    onDateChange: function onDateChange(date) {
      if (
        date &&
        isNumber(date.date) &&
        isNumber(date.month) &&
        isNumber(date.year)
      ) {
        var _date = new Date(date.year, date.month, date.date);
        this.$emit(
          'update:modelValue',
          this.format ? stringify(_date, this.format) : _date
        );
        // if the input event trigger nothing (same value)
        // manually correct
        this.currentMonth = date.month;
        this.currentYear = date.year;
      } else {
        this.$emit('update:modelValue', '');
      }
    },
    onViewChange: function onViewChange(view) {
      this.view = view;
    },
    selectToday: function selectToday() {
      this.view = 'd';
      this.onDateChange({
        date: this.now.getDate(),
        month: this.now.getMonth(),
        year: this.now.getFullYear(),
      });
    },
    clearSelect: function clearSelect() {
      this.currentMonth = this.now.getMonth();
      this.currentYear = this.now.getFullYear();
      this.view = this.initialView;
      this.onDateChange();
    },
    onPickerClick: function onPickerClick(event) {
      if (
        event.target.getAttribute('data-action') !== 'select' ||
        !this.closeOnSelected
      ) {
        event.stopPropagation();
      }
    },
  },
};

var _hoisted_1 = { key: 0 };
var _hoisted_2 = /*#__PURE__*/createElementVNode("br", null, null, -1 /* HOISTED */);
var _hoisted_3 = { class: "text-center" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_date_view = resolveComponent("date-view");
  var _component_month_view = resolveComponent("month-view");
  var _component_year_view = resolveComponent("year-view");
  var _component_btn = resolveComponent("btn");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass($options.pickerClass),
    style: normalizeStyle($options.pickerStyle),
    "data-role": "date-picker",
    onClick: _cache[0] || (_cache[0] = function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      return ($options.onPickerClick && $options.onPickerClick.apply($options, args));
  })
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
    }, null, 8 /* PROPS */, ["month", "year", "date", "today", "limit", "week-starts-with", "icon-control-left", "icon-control-right", "date-class", "year-month-formatter", "week-numbers", "locale", "onMonthChange", "onYearChange", "onDateChange", "onViewChange"]), [
      [vShow, $data.view === 'd']
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
    }, null, 8 /* PROPS */, ["month", "year", "icon-control-left", "icon-control-right", "locale", "onMonthChange", "onYearChange", "onViewChange"]), [
      [vShow, $data.view === 'm']
    ]),
    withDirectives(createVNode(_component_year_view, {
      year: $data.currentYear,
      "icon-control-left": $props.iconControlLeft,
      "icon-control-right": $props.iconControlRight,
      onYearChange: $options.onYearChange,
      onViewChange: $options.onViewChange
    }, null, 8 /* PROPS */, ["year", "icon-control-left", "icon-control-right", "onYearChange", "onViewChange"]), [
      [vShow, $data.view === 'y']
    ]),
    ($props.todayBtn || $props.clearBtn)
      ? (openBlock(), createElementBlock("div", _hoisted_1, [
          _hoisted_2,
          createElementVNode("div", _hoisted_3, [
            ($props.todayBtn)
              ? (openBlock(), createBlock(_component_btn, {
                  key: 0,
                  "data-action": "select",
                  "data-type": "today",
                  type: "info",
                  size: "sm",
                  onClick: $options.selectToday,
                  textContent: toDisplayString(_ctx.t('uiv.datePicker.today'))
                }, null, 8 /* PROPS */, ["onClick", "textContent"]))
              : createCommentVNode("v-if", true),
            ($props.clearBtn)
              ? (openBlock(), createBlock(_component_btn, {
                  key: 1,
                  "data-action": "select",
                  "data-type": "clear",
                  size: "sm",
                  onClick: $options.clearSelect,
                  textContent: toDisplayString(_ctx.t('uiv.datePicker.clear'))
                }, null, 8 /* PROPS */, ["onClick", "textContent"]))
              : createCommentVNode("v-if", true)
          ])
        ]))
      : createCommentVNode("v-if", true)
  ], 6 /* CLASS, STYLE */))
}

script.render = render;
script.__file = "src/components/datepicker/DatePicker.vue";

export { script as default };
//# sourceMappingURL=DatePicker.js.map
