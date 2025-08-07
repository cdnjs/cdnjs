'use strict';

var vue = require('vue');
var CompatFallthroughMixin = require('./CompatFallthroughMixin-hhK0Gkhr.js');
var FormElementMixin = require('./FormElementMixin-DavX4iOv.js');
var helpers = require('./helpers.js');
var config = require('./config-DR826Ki2.js');
var Dropdown = require('./Dropdown-DtpKU9qf.js');
var DropdownItem = require('./DropdownItem-IMOKyRGV.js');
var Input = require('./Input-BcloGeZ3.js');
var Field = require('./Field-19ZCJFF8.js');
var Select = require('./Select-DayPKwCY.js');
var Icon = require('./Icon-lsDKE2wQ.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');

var _sfc_main$3 = vue.defineComponent({
  name: "BDatepickerTableRow",
  inject: {
    $datepicker: { name: "$datepicker", default: false }
  },
  props: {
    selectedDate: {
      type: [Date, Array]
    },
    hoveredDateRange: Array,
    day: {
      type: Number
    },
    week: {
      type: Array,
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    minDate: [Date, null],
    maxDate: [Date, null],
    disabled: Boolean,
    unselectableDates: [Array, Function, null],
    unselectableDaysOfWeek: [Array, null],
    selectableDates: [Array, Function, null],
    events: Array,
    indicators: String,
    dateCreator: Function,
    nearbyMonthDays: Boolean,
    nearbySelectableMonthDays: Boolean,
    showWeekNumber: Boolean,
    weekNumberClickable: Boolean,
    range: Boolean,
    multiple: Boolean,
    rulesForFirstWeek: Number,
    firstDayOfWeek: [Number, null]
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "change-focus": (_day) => true,
    rangeHoverEndDate: (_day) => true,
    select: (_day) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  watch: {
    day(day) {
      const refName = `day-${this.month}-${day}`;
      this.$nextTick(() => {
        let cell;
        if (Array.isArray(this.$refs[refName])) {
          cell = this.$refs[refName][0];
        } else {
          cell = this.$refs[refName];
        }
        if (cell) {
          cell.focus();
        }
      });
    }
  },
  methods: {
    firstWeekOffset(year, dow, doy) {
      const fwd = 7 + dow - doy;
      const firstJanuary = new Date(year, 0, fwd);
      const fwdlw = (7 + firstJanuary.getDay() - dow) % 7;
      return -fwdlw + fwd - 1;
    },
    daysInYear(year) {
      return this.isLeapYear(year) ? 366 : 365;
    },
    isLeapYear(year) {
      return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    },
    getSetDayOfYear(input) {
      return Math.round((+input - +new Date(input.getFullYear(), 0, 1)) / 864e5) + 1;
    },
    weeksInYear(year, dow, doy) {
      const weekOffset = this.firstWeekOffset(year, dow, doy);
      const weekOffsetNext = this.firstWeekOffset(year + 1, dow, doy);
      return (this.daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    },
    getWeekNumber(mom) {
      const dow = this.firstDayOfWeek;
      const doy = this.rulesForFirstWeek;
      const weekOffset = this.firstWeekOffset(mom.getFullYear(), dow, doy);
      const week = Math.floor((this.getSetDayOfYear(mom) - weekOffset - 1) / 7) + 1;
      let resWeek;
      let resYear;
      if (week < 1) {
        resYear = mom.getFullYear() - 1;
        resWeek = week + this.weeksInYear(resYear, dow, doy);
      } else if (week > this.weeksInYear(mom.getFullYear(), dow, doy)) {
        resWeek = week - this.weeksInYear(mom.getFullYear(), dow, doy);
        resYear = mom.getFullYear() + 1;
      } else {
        resYear = mom.getFullYear();
        resWeek = week;
      }
      return { week: resWeek, year: resYear };
    },
    clickWeekNumber(weekData) {
      if (this.weekNumberClickable) {
        this.$datepicker.$emit("week-number-click", weekData.week, weekData.year);
      }
    },
    /*
     * Check that selected day is within earliest/latest params and
     * is within this month
     */
    selectableDate(day) {
      const validity = [];
      if (this.minDate) {
        validity.push(day >= this.minDate);
      }
      if (this.maxDate) {
        validity.push(day <= this.maxDate);
      }
      if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
        validity.push(day.getMonth() === this.month);
      }
      if (this.selectableDates) {
        if (typeof this.selectableDates === "function") {
          if (this.selectableDates(day)) {
            return true;
          } else {
            validity.push(false);
          }
        } else {
          for (let i = 0; i < this.selectableDates.length; i++) {
            const enabledDate = this.selectableDates[i];
            if (day.getDate() === enabledDate.getDate() && day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
              return true;
            } else {
              validity.push(false);
            }
          }
        }
      }
      if (this.unselectableDates) {
        if (typeof this.unselectableDates === "function") {
          validity.push(!this.unselectableDates(day));
        } else {
          for (let i = 0; i < this.unselectableDates.length; i++) {
            const disabledDate = this.unselectableDates[i];
            validity.push(
              day.getDate() !== disabledDate.getDate() || day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth()
            );
          }
        }
      }
      if (this.unselectableDaysOfWeek) {
        for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
          const dayOfWeek = this.unselectableDaysOfWeek[i];
          validity.push(day.getDay() !== dayOfWeek);
        }
      }
      return validity.indexOf(false) < 0;
    },
    /*
    * Emit select event with chosen date as payload
    */
    emitChosenDate(day) {
      if (this.disabled) return;
      if (this.selectableDate(day)) {
        this.$emit("select", day);
      }
    },
    // TODO: return undefined instead of boolean if no events
    eventsDateMatch(day) {
      if (!this.events || !this.events.length) return false;
      const dayEvents = [];
      for (let i = 0; i < this.events.length; i++) {
        if (this.events[i].date.getDay() === day.getDay()) {
          dayEvents.push(this.events[i]);
        }
      }
      if (!dayEvents.length) {
        return false;
      }
      return dayEvents;
    },
    /*
    * Build classObject for cell using validations
    */
    classObject(day) {
      function dateMatch(dateOne, dateTwo, multiple) {
        if (!dateOne || !dateTwo || multiple) {
          return false;
        }
        if (Array.isArray(dateTwo)) {
          return dateTwo.some((date) => dateOne.getDate() === date.getDate() && dateOne.getFullYear() === date.getFullYear() && dateOne.getMonth() === date.getMonth());
        }
        return dateOne.getDate() === dateTwo.getDate() && dateOne.getFullYear() === dateTwo.getFullYear() && dateOne.getMonth() === dateTwo.getMonth();
      }
      function dateWithin(dateOne, dates, multiple) {
        if (!Array.isArray(dates) || multiple) {
          return false;
        }
        return dateOne > dates[0] && dateOne < dates[1];
      }
      return {
        "is-selected": dateMatch(day, this.selectedDate) || dateWithin(day, this.selectedDate, this.multiple),
        "is-first-selected": dateMatch(
          day,
          Array.isArray(this.selectedDate) ? this.selectedDate[0] : void 0,
          this.multiple
        ),
        "is-within-selected": dateWithin(day, this.selectedDate, this.multiple),
        "is-last-selected": dateMatch(
          day,
          Array.isArray(this.selectedDate) ? this.selectedDate[1] : void 0,
          this.multiple
        ),
        "is-within-hovered-range": this.hoveredDateRange && this.hoveredDateRange.length === 2 && (dateMatch(day, this.hoveredDateRange) || dateWithin(day, this.hoveredDateRange)),
        "is-first-hovered": dateMatch(
          day,
          Array.isArray(this.hoveredDateRange) ? this.hoveredDateRange[0] : void 0
        ),
        "is-within-hovered": dateWithin(day, this.hoveredDateRange),
        "is-last-hovered": dateMatch(
          day,
          Array.isArray(this.hoveredDateRange) ? this.hoveredDateRange[1] : void 0
        ),
        "is-today": dateMatch(day, this.dateCreator()),
        "is-selectable": this.selectableDate(day) && !this.disabled,
        "is-unselectable": !this.selectableDate(day) || this.disabled,
        "is-invisible": !this.nearbyMonthDays && day.getMonth() !== this.month,
        "is-nearby": this.nearbySelectableMonthDays && day.getMonth() !== this.month,
        "has-event": this.eventsDateMatch(day),
        [this.indicators]: this.eventsDateMatch(day)
      };
    },
    setRangeHoverEndDate(day) {
      if (this.range) {
        this.$emit("rangeHoverEndDate", day);
      }
    },
    manageKeydown(event, weekDay) {
      const { key } = event;
      let preventDefault = true;
      switch (key) {
        case "Tab": {
          preventDefault = false;
          break;
        }
        case " ":
        case "Space":
        case "Spacebar":
        case "Enter": {
          this.emitChosenDate(weekDay);
          break;
        }
        case "ArrowLeft":
        case "Left": {
          this.changeFocus(weekDay, -1);
          break;
        }
        case "ArrowRight":
        case "Right": {
          this.changeFocus(weekDay, 1);
          break;
        }
        case "ArrowUp":
        case "Up": {
          this.changeFocus(weekDay, -7);
          break;
        }
        case "ArrowDown":
        case "Down": {
          this.changeFocus(weekDay, 7);
          break;
        }
      }
      if (preventDefault) {
        event.preventDefault();
      }
    },
    changeFocus(day, inc) {
      const nextDay = new Date(day.getTime());
      nextDay.setDate(day.getDate() + inc);
      while ((!this.minDate || nextDay > this.minDate) && (!this.maxDate || nextDay < this.maxDate) && !this.selectableDate(nextDay)) {
        nextDay.setDate(nextDay.getDate() + Math.sign(inc));
      }
      this.setRangeHoverEndDate(nextDay);
      this.$emit("change-focus", nextDay);
    }
  }
});

const _hoisted_1$3 = { class: "datepicker-row" };
const _hoisted_2$3 = ["disabled", "onClick", "onMouseenter", "onKeydown", "tabindex"];
const _hoisted_3$2 = {
  key: 0,
  class: "events"
};
const _hoisted_4$2 = {
  key: 0,
  class: "events"
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock(
    vue.Fragment,
    null,
    [
      vue.createCommentVNode(" eslint-disable max-len "),
      vue.createElementVNode("div", _hoisted_1$3, [
        _ctx.showWeekNumber ? (vue.openBlock(), vue.createElementBlock(
          "a",
          {
            key: 0,
            class: vue.normalizeClass(["datepicker-cell is-week-number", { "is-clickable": _ctx.weekNumberClickable }]),
            onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => _ctx.clickWeekNumber(_ctx.getWeekNumber(_ctx.week[6])), ["prevent"]))
          },
          [
            vue.createElementVNode(
              "span",
              null,
              vue.toDisplayString(_ctx.getWeekNumber(_ctx.week[6]).week),
              1
              /* TEXT */
            )
          ],
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(_ctx.week, (weekDay, index) => {
            return vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: index },
              [
                _ctx.selectableDate(weekDay) && !_ctx.disabled ? (vue.openBlock(), vue.createElementBlock("a", {
                  key: 0,
                  ref_for: true,
                  ref: `day-${weekDay.getMonth()}-${weekDay.getDate()}`,
                  class: vue.normalizeClass([_ctx.classObject(weekDay), "datepicker-cell"]),
                  role: "button",
                  href: "#",
                  disabled: _ctx.disabled || void 0,
                  onClick: vue.withModifiers(($event) => _ctx.emitChosenDate(weekDay), ["prevent"]),
                  onMouseenter: ($event) => _ctx.setRangeHoverEndDate(weekDay),
                  onKeydown: ($event) => _ctx.manageKeydown($event, weekDay),
                  tabindex: _ctx.day === weekDay.getDate() && _ctx.month === weekDay.getMonth() ? void 0 : -1
                }, [
                  vue.createElementVNode(
                    "span",
                    null,
                    vue.toDisplayString(weekDay.getDate()),
                    1
                    /* TEXT */
                  ),
                  _ctx.eventsDateMatch(weekDay) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$2, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(_ctx.eventsDateMatch(weekDay), (event, evIdx) => {
                        return vue.openBlock(), vue.createElementBlock(
                          "div",
                          {
                            class: vue.normalizeClass(["event", event.type]),
                            key: evIdx
                          },
                          null,
                          2
                          /* CLASS */
                        );
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])) : vue.createCommentVNode("v-if", true)
                ], 42, _hoisted_2$3)) : (vue.openBlock(), vue.createElementBlock(
                  "div",
                  {
                    key: 1,
                    class: vue.normalizeClass([_ctx.classObject(weekDay), "datepicker-cell"])
                  },
                  [
                    vue.createElementVNode(
                      "span",
                      null,
                      vue.toDisplayString(weekDay.getDate()),
                      1
                      /* TEXT */
                    ),
                    _ctx.eventsDateMatch(weekDay) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$2, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(_ctx.eventsDateMatch(weekDay), (event, evIdx) => {
                          return vue.openBlock(), vue.createElementBlock(
                            "div",
                            {
                              class: vue.normalizeClass(["event", event.type]),
                              key: evIdx
                            },
                            null,
                            2
                            /* CLASS */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])) : vue.createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                ))
              ],
              64
              /* STABLE_FRAGMENT */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" eslint-enable max-len ")
    ],
    2112
    /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
  );
}
var BDatepickerTableRow = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);

var _sfc_main$2 = vue.defineComponent({
  name: "BDatepickerTable",
  components: {
    BDatepickerTableRow
  },
  props: {
    modelValue: {
      type: [Date, Array, null]
    },
    dayNames: [Array, null],
    monthNames: [Array, null],
    firstDayOfWeek: [Number, null],
    events: Array,
    indicators: String,
    minDate: [Date, null],
    maxDate: [Date, null],
    focused: Object,
    disabled: Boolean,
    dateCreator: Function,
    unselectableDates: [Array, Function, null],
    unselectableDaysOfWeek: [Array, null],
    selectableDates: [Array, Function, null],
    nearbyMonthDays: Boolean,
    nearbySelectableMonthDays: Boolean,
    showWeekNumber: Boolean,
    weekNumberClickable: Boolean,
    rulesForFirstWeek: Number,
    range: Boolean,
    multiple: Boolean
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "range-end": (_date) => true,
    "range-start": (_date) => true,
    "update:focused": (_focused) => true,
    "update:modelValue": (_value) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      selectedBeginDate: void 0,
      selectedEndDate: void 0,
      hoveredEndDate: void 0
    };
  },
  computed: {
    multipleSelectedDates: {
      get() {
        return this.multiple && this.modelValue ? this.modelValue : [];
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    },
    visibleDayNames() {
      const visibleDayNames = [];
      let index = this.firstDayOfWeek;
      while (visibleDayNames.length < this.dayNames.length) {
        const currentDayName = this.dayNames[index % this.dayNames.length];
        visibleDayNames.push(currentDayName);
        index++;
      }
      if (this.showWeekNumber) visibleDayNames.unshift("");
      return visibleDayNames;
    },
    hasEvents() {
      return this.events && this.events.length;
    },
    /*
    * Return array of all events in the specified month
    */
    eventsInThisMonth() {
      if (!this.events) return [];
      const monthEvents = [];
      for (let i = 0; i < this.events.length; i++) {
        let event = this.events[i];
        if (!Object.prototype.hasOwnProperty.call(event, "date")) {
          event = { date: event, type: "is-primary" };
        }
        if (!Object.prototype.hasOwnProperty.call(event, "type")) {
          event.type = "is-primary";
        }
        if (event.date.getMonth() === this.focused.month && event.date.getFullYear() === this.focused.year) {
          monthEvents.push(event);
        }
      }
      return monthEvents;
    },
    /*
    * Return array of all weeks in the specified month
    */
    weeksInThisMonth() {
      this.validateFocusedDay();
      const month = this.focused.month;
      const year = this.focused.year;
      const weeksInThisMonth = [];
      let startingDay = 1;
      while (weeksInThisMonth.length < 6) {
        const newWeek = this.weekBuilder(startingDay, month, year);
        weeksInThisMonth.push(newWeek);
        startingDay += 7;
      }
      return weeksInThisMonth;
    },
    hoveredDateRange() {
      var _a, _b;
      if (!this.range) {
        return [];
      }
      if (!isNaN((_b = (_a = this.selectedEndDate) == null ? void 0 : _a.valueOf()) != null ? _b : NaN)) {
        return [];
      }
      if (this.hoveredEndDate < this.selectedBeginDate) {
        return [this.hoveredEndDate, this.selectedBeginDate].filter(helpers.isDefined);
      }
      return [this.selectedBeginDate, this.hoveredEndDate].filter(helpers.isDefined);
    },
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  methods: {
    /*
    * Emit input event with selected date as payload for v-model in parent
    */
    updateSelectedDate(date) {
      if (!this.range && !this.multiple) {
        this.$emit("update:modelValue", date);
      } else if (this.range) {
        this.handleSelectRangeDate(date);
      } else if (this.multiple) {
        this.handleSelectMultipleDates(date);
      }
    },
    /*
    * If both begin and end dates are set, reset the end date and set the begin date.
    * If only begin date is selected, emit an array of the begin date and the new date.
    * If not set, only set the begin date.
    */
    handleSelectRangeDate(date) {
      if (this.selectedBeginDate && this.selectedEndDate) {
        this.selectedBeginDate = date;
        this.selectedEndDate = void 0;
        this.$emit("range-start", date);
      } else if (this.selectedBeginDate && !this.selectedEndDate) {
        if (this.selectedBeginDate > date) {
          this.selectedEndDate = this.selectedBeginDate;
          this.selectedBeginDate = date;
        } else {
          this.selectedEndDate = date;
        }
        this.$emit("range-end", date);
        this.$emit("update:modelValue", [this.selectedBeginDate, this.selectedEndDate]);
      } else {
        this.selectedBeginDate = date;
        this.$emit("range-start", date);
      }
    },
    /*
    * If selected date already exists list of selected dates, remove it from the list
    * Otherwise, add date to list of selected dates
    */
    handleSelectMultipleDates(date) {
      const multipleSelect = this.multipleSelectedDates.filter(
        (selectedDate) => selectedDate.getDate() === date.getDate() && selectedDate.getFullYear() === date.getFullYear() && selectedDate.getMonth() === date.getMonth()
      );
      if (multipleSelect.length) {
        this.multipleSelectedDates = this.multipleSelectedDates.filter(
          (selectedDate) => selectedDate.getDate() !== date.getDate() || selectedDate.getFullYear() !== date.getFullYear() || selectedDate.getMonth() !== date.getMonth()
        );
      } else {
        this.multipleSelectedDates = [...this.multipleSelectedDates, date];
      }
    },
    /*
     * Return array of all days in the week that the startingDate is within
     */
    weekBuilder(startingDate, month, year) {
      const thisMonth = new Date(year, month);
      const thisWeek = [];
      const dayOfWeek = new Date(year, month, startingDate).getDay();
      const end = dayOfWeek >= this.firstDayOfWeek ? dayOfWeek - this.firstDayOfWeek : 7 - this.firstDayOfWeek + dayOfWeek;
      let daysAgo = 1;
      for (let i = 0; i < end; i++) {
        thisWeek.unshift(
          new Date(
            thisMonth.getFullYear(),
            thisMonth.getMonth(),
            startingDate - daysAgo
          )
        );
        daysAgo++;
      }
      thisWeek.push(new Date(year, month, startingDate));
      let daysForward = 1;
      while (thisWeek.length < 7) {
        thisWeek.push(new Date(year, month, startingDate + daysForward));
        daysForward++;
      }
      return thisWeek;
    },
    validateFocusedDay() {
      const focusedDate = new Date(this.focused.year, this.focused.month, this.focused.day);
      if (this.selectableDate(focusedDate)) return;
      let day = 0;
      const monthDays = new Date(this.focused.year, this.focused.month + 1, 0).getDate();
      let firstFocusable = null;
      while (!firstFocusable && ++day < monthDays) {
        const date = new Date(this.focused.year, this.focused.month, day);
        if (this.selectableDate(date)) {
          firstFocusable = focusedDate;
          const focused = {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
          };
          this.$emit("update:focused", focused);
        }
      }
    },
    /*
     * Check that selected day is within earliest/latest params and
     * is within this month
     */
    selectableDate(day) {
      const validity = [];
      if (this.minDate) {
        validity.push(day >= this.minDate);
      }
      if (this.maxDate) {
        validity.push(day <= this.maxDate);
      }
      if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
        validity.push(day.getMonth() === this.focused.month);
      }
      if (this.selectableDates) {
        if (typeof this.selectableDates === "function") {
          if (this.selectableDates(day)) {
            return true;
          } else {
            validity.push(false);
          }
        } else {
          for (let i = 0; i < this.selectableDates.length; i++) {
            const enabledDate = this.selectableDates[i];
            if (day.getDate() === enabledDate.getDate() && day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
              return true;
            } else {
              validity.push(false);
            }
          }
        }
      }
      if (this.unselectableDates) {
        if (typeof this.unselectableDates === "function") {
          validity.push(!this.unselectableDates(day));
        } else {
          for (let i = 0; i < this.unselectableDates.length; i++) {
            const disabledDate = this.unselectableDates[i];
            validity.push(
              day.getDate() !== disabledDate.getDate() || day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth()
            );
          }
        }
      }
      if (this.unselectableDaysOfWeek) {
        for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
          const dayOfWeek = this.unselectableDaysOfWeek[i];
          validity.push(day.getDay() !== dayOfWeek);
        }
      }
      return validity.indexOf(false) < 0;
    },
    eventsInThisWeek(week) {
      return this.eventsInThisMonth.filter((event) => {
        const stripped = new Date(Date.parse(event.date + ""));
        stripped.setHours(0, 0, 0, 0);
        const timed = stripped.getTime();
        return week.some((weekDate) => weekDate.getTime() === timed);
      });
    },
    setRangeHoverEndDate(day) {
      this.hoveredEndDate = day;
    },
    changeFocus(day) {
      const focused = {
        day: day.getDate(),
        month: day.getMonth(),
        year: day.getFullYear()
      };
      this.$emit("update:focused", focused);
    }
  }
});

const _hoisted_1$2 = { class: "datepicker-table" };
const _hoisted_2$2 = { class: "datepicker-header" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_datepicker_table_row = vue.resolveComponent("b-datepicker-table-row");
  return vue.openBlock(), vue.createElementBlock("section", _hoisted_1$2, [
    vue.createElementVNode("header", _hoisted_2$2, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList(_ctx.visibleDayNames, (day, index) => {
          return vue.openBlock(), vue.createElementBlock("div", {
            key: index,
            class: "datepicker-cell"
          }, [
            vue.createElementVNode(
              "span",
              null,
              vue.toDisplayString(day),
              1
              /* TEXT */
            )
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]),
    vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(["datepicker-body", { "has-events": _ctx.hasEvents }])
      },
      [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(_ctx.weeksInThisMonth, (week, index) => {
            return vue.openBlock(), vue.createBlock(_component_b_datepicker_table_row, {
              key: index,
              "selected-date": _ctx.modelValue ?? void 0,
              day: _ctx.focused.day,
              week,
              month: _ctx.focused.month,
              "min-date": _ctx.minDate,
              "max-date": _ctx.maxDate,
              disabled: _ctx.disabledOrUndefined,
              "unselectable-dates": _ctx.unselectableDates,
              "unselectable-days-of-week": _ctx.unselectableDaysOfWeek,
              "selectable-dates": _ctx.selectableDates,
              events: _ctx.eventsInThisWeek(week),
              indicators: _ctx.indicators,
              "date-creator": _ctx.dateCreator,
              "nearby-month-days": _ctx.nearbyMonthDays,
              "nearby-selectable-month-days": _ctx.nearbySelectableMonthDays,
              "show-week-number": _ctx.showWeekNumber,
              "week-number-clickable": _ctx.weekNumberClickable,
              "first-day-of-week": _ctx.firstDayOfWeek,
              "rules-for-first-week": _ctx.rulesForFirstWeek,
              range: _ctx.range,
              "hovered-date-range": _ctx.hoveredDateRange,
              onSelect: _ctx.updateSelectedDate,
              onRangeHoverEndDate: _ctx.setRangeHoverEndDate,
              multiple: _ctx.multiple,
              onChangeFocus: _ctx.changeFocus
            }, null, 8, ["selected-date", "day", "week", "month", "min-date", "max-date", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "nearby-month-days", "nearby-selectable-month-days", "show-week-number", "week-number-clickable", "first-day-of-week", "rules-for-first-week", "range", "hovered-date-range", "onSelect", "onRangeHoverEndDate", "multiple", "onChangeFocus"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      2
      /* CLASS */
    )
  ]);
}
var BDatepickerTable = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);

var _sfc_main$1 = vue.defineComponent({
  name: "BDatepickerMonth",
  props: {
    modelValue: {
      type: [Date, Array, null]
    },
    monthNames: [Array, null],
    events: Array,
    indicators: String,
    minDate: [Date, null],
    maxDate: [Date, null],
    focused: Object,
    disabled: Boolean,
    dateCreator: Function,
    unselectableDates: [Array, Function, null],
    unselectableDaysOfWeek: [Array, null],
    selectableDates: [Array, Function, null],
    range: Boolean,
    multiple: Boolean
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "change-focus": (_date) => true,
    "range-end": (_date) => true,
    "range-start": (_date) => true,
    "update:modelValue": (_date) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      selectedBeginDate: void 0,
      selectedEndDate: void 0,
      hoveredEndDate: void 0,
      multipleSelectedDates: this.multiple && this.modelValue ? this.modelValue : []
    };
  },
  computed: {
    hasEvents() {
      return this.events && this.events.length;
    },
    /*
    * Return array of all events in the specified month
    */
    eventsInThisYear() {
      if (!this.events) return [];
      const yearEvents = [];
      for (let i = 0; i < this.events.length; i++) {
        let event = this.events[i];
        if (!Object.prototype.hasOwnProperty.call(event, "date")) {
          event = { date: event, type: "is-primary" };
        }
        if (!Object.prototype.hasOwnProperty.call(event, "type")) {
          event.type = "is-primary";
        }
        if (event.date.getFullYear() === this.focused.year) {
          yearEvents.push(event);
        }
      }
      return yearEvents;
    },
    monthDates() {
      const year = this.focused.year;
      const months = [];
      for (let i = 0; i < 12; i++) {
        const d = new Date(year, i, 1);
        d.setHours(0, 0, 0, 0);
        months.push(d);
      }
      return months;
    },
    focusedMonth() {
      return this.focused.month;
    },
    hoveredDateRange() {
      var _a, _b;
      if (!this.range) {
        return [];
      }
      if (!isNaN((_b = (_a = this.selectedEndDate) == null ? void 0 : _a.valueOf()) != null ? _b : NaN)) {
        return [];
      }
      if (this.hoveredEndDate < this.selectedBeginDate) {
        return [this.hoveredEndDate, this.selectedBeginDate].filter(helpers.isDefined);
      }
      return [this.selectedBeginDate, this.hoveredEndDate].filter(helpers.isDefined);
    },
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  watch: {
    focusedMonth(month) {
      const refName = `month-${month}`;
      this.$nextTick(() => {
        let cell;
        if (Array.isArray(this.$refs[refName])) {
          cell = this.$refs[refName][0];
        } else {
          cell = this.$refs[refName];
        }
        if (cell) {
          cell.focus();
        }
      });
    }
  },
  methods: {
    selectMultipleDates(date) {
      const multipleSelect = this.multipleSelectedDates.filter(
        (selectedDate) => selectedDate.getDate() === date.getDate() && selectedDate.getFullYear() === date.getFullYear() && selectedDate.getMonth() === date.getMonth()
      );
      if (multipleSelect.length) {
        this.multipleSelectedDates = this.multipleSelectedDates.filter(
          (selectedDate) => selectedDate.getDate() !== date.getDate() || selectedDate.getFullYear() !== date.getFullYear() || selectedDate.getMonth() !== date.getMonth()
        );
      } else {
        this.multipleSelectedDates.push(date);
      }
      this.$emit("update:modelValue", this.multipleSelectedDates);
    },
    selectableDate(day) {
      const validity = [];
      if (this.minDate) {
        validity.push(day >= this.minDate);
      }
      if (this.maxDate) {
        validity.push(day <= this.maxDate);
      }
      validity.push(day.getFullYear() === this.focused.year);
      if (this.selectableDates) {
        if (typeof this.selectableDates === "function") {
          if (this.selectableDates(day)) {
            return true;
          } else {
            validity.push(false);
          }
        } else {
          for (let i = 0; i < this.selectableDates.length; i++) {
            const enabledDate = this.selectableDates[i];
            if (day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
              return true;
            } else {
              validity.push(false);
            }
          }
        }
      }
      if (this.unselectableDates) {
        if (typeof this.unselectableDates === "function") {
          validity.push(!this.unselectableDates(day));
        } else {
          for (let i = 0; i < this.unselectableDates.length; i++) {
            const disabledDate = this.unselectableDates[i];
            validity.push(
              day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth()
            );
          }
        }
      }
      if (this.unselectableDaysOfWeek) {
        for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
          const dayOfWeek = this.unselectableDaysOfWeek[i];
          validity.push(day.getDay() !== dayOfWeek);
        }
      }
      return validity.indexOf(false) < 0;
    },
    // TODO: return undefined instead of false if no events
    eventsDateMatch(day) {
      if (!this.eventsInThisYear.length) return false;
      const monthEvents = [];
      for (let i = 0; i < this.eventsInThisYear.length; i++) {
        if (this.eventsInThisYear[i].date.getMonth() === day.getMonth()) {
          monthEvents.push(this.events[i]);
        }
      }
      if (!monthEvents.length) {
        return false;
      }
      return monthEvents;
    },
    /*
    * Build classObject for cell using validations
    */
    classObject(day) {
      function dateMatch(dateOne, dateTwo, multiple) {
        if (!dateOne || !dateTwo || multiple) {
          return false;
        }
        if (Array.isArray(dateTwo)) {
          return dateTwo.some((date) => dateOne.getFullYear() === date.getFullYear() && dateOne.getMonth() === date.getMonth());
        }
        return dateOne.getFullYear() === dateTwo.getFullYear() && dateOne.getMonth() === dateTwo.getMonth();
      }
      function dateWithin(dateOne, dates, multiple) {
        if (!Array.isArray(dates) || multiple) {
          return false;
        }
        return dateOne > dates[0] && dateOne < dates[1];
      }
      function dateMultipleSelected(dateOne, dates, multiple) {
        if (!Array.isArray(dates) || !multiple) {
          return false;
        }
        return dates.some((date) => dateOne.getDate() === date.getDate() && dateOne.getFullYear() === date.getFullYear() && dateOne.getMonth() === date.getMonth());
      }
      return {
        "is-selected": dateMatch(day, this.modelValue, this.multiple) || dateWithin(day, this.modelValue, this.multiple) || dateMultipleSelected(day, this.multipleSelectedDates, this.multiple),
        "is-first-selected": dateMatch(
          day,
          Array.isArray(this.modelValue) ? this.modelValue[0] : void 0,
          this.multiple
        ),
        "is-within-selected": dateWithin(day, this.modelValue, this.multiple),
        "is-last-selected": dateMatch(
          day,
          Array.isArray(this.modelValue) ? this.modelValue[1] : void 0,
          this.multiple
        ),
        "is-within-hovered-range": this.hoveredDateRange && this.hoveredDateRange.length === 2 && (dateMatch(day, this.hoveredDateRange) || dateWithin(day, this.hoveredDateRange)),
        "is-first-hovered": dateMatch(
          day,
          Array.isArray(this.hoveredDateRange) ? this.hoveredDateRange[0] : void 0
        ),
        "is-within-hovered": dateWithin(day, this.hoveredDateRange),
        "is-last-hovered": dateMatch(
          day,
          Array.isArray(this.hoveredDateRange) ? this.hoveredDateRange[1] : void 0
        ),
        "is-today": dateMatch(day, this.dateCreator()),
        "is-selectable": this.selectableDate(day) && !this.disabled,
        "is-unselectable": !this.selectableDate(day) || this.disabled
      };
    },
    manageKeydown({ key }, date) {
      switch (key) {
        case " ":
        case "Space":
        case "Spacebar":
        case "Enter": {
          this.updateSelectedDate(date);
          break;
        }
        case "ArrowLeft":
        case "Left": {
          this.changeFocus(date, -1);
          break;
        }
        case "ArrowRight":
        case "Right": {
          this.changeFocus(date, 1);
          break;
        }
        case "ArrowUp":
        case "Up": {
          this.changeFocus(date, -3);
          break;
        }
        case "ArrowDown":
        case "Down": {
          this.changeFocus(date, 3);
          break;
        }
      }
    },
    /*
    * Emit input event with selected date as payload for v-model in parent
    */
    updateSelectedDate(date) {
      if (!this.range && !this.multiple) {
        this.emitChosenDate(date);
      } else if (this.range) {
        this.handleSelectRangeDate(date);
      } else if (this.multiple) {
        this.selectMultipleDates(date);
      }
    },
    /*
     * Emit select event with chosen date as payload
     */
    emitChosenDate(day) {
      if (this.disabled) return;
      if (!this.multiple) {
        if (this.selectableDate(day)) {
          this.$emit("update:modelValue", day);
        }
      } else {
        this.selectMultipleDates(day);
      }
    },
    /*
    * If both begin and end dates are set, reset the end date and set the begin date.
    * If only begin date is selected, emit an array of the begin date and the new date.
    * If not set, only set the begin date.
    */
    handleSelectRangeDate(date) {
      if (this.disabled) return;
      if (this.selectedBeginDate && this.selectedEndDate) {
        this.selectedBeginDate = date;
        this.selectedEndDate = void 0;
        this.$emit("range-start", date);
      } else if (this.selectedBeginDate && !this.selectedEndDate) {
        if (this.selectedBeginDate > date) {
          this.selectedEndDate = this.selectedBeginDate;
          this.selectedBeginDate = date;
        } else {
          this.selectedEndDate = date;
        }
        this.$emit("range-end", date);
        this.$emit("update:modelValue", [this.selectedBeginDate, this.selectedEndDate]);
      } else {
        this.selectedBeginDate = date;
        this.$emit("range-start", date);
      }
    },
    setRangeHoverEndDate(day) {
      if (this.range) {
        this.hoveredEndDate = day;
      }
    },
    changeFocus(month, inc) {
      const nextMonth = month;
      nextMonth.setMonth(month.getMonth() + inc);
      this.$emit("change-focus", nextMonth);
    }
  }
});

const _hoisted_1$1 = { class: "datepicker-table" };
const _hoisted_2$1 = { class: "datepicker-months" };
const _hoisted_3$1 = ["disabled", "onClick", "onMouseenter", "onKeydown", "tabindex"];
const _hoisted_4$1 = {
  key: 0,
  class: "events"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("section", _hoisted_1$1, [
    vue.createElementVNode(
      "div",
      {
        class: vue.normalizeClass(["datepicker-body", { "has-events": _ctx.hasEvents }])
      },
      [
        vue.createElementVNode("div", _hoisted_2$1, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.monthDates, (date, index) => {
              return vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: index },
                [
                  _ctx.selectableDate(date) && !_ctx.disabled ? (vue.openBlock(), vue.createElementBlock("a", {
                    key: 0,
                    ref_for: true,
                    ref: `month-${date.getMonth()}`,
                    class: vue.normalizeClass([[
                      _ctx.classObject(date),
                      { "has-event": _ctx.eventsDateMatch(date) },
                      _ctx.indicators
                    ], "datepicker-cell"]),
                    role: "button",
                    href: "#",
                    disabled: _ctx.disabledOrUndefined,
                    onClick: vue.withModifiers(($event) => _ctx.updateSelectedDate(date), ["prevent"]),
                    onMouseenter: ($event) => _ctx.setRangeHoverEndDate(date),
                    onKeydown: vue.withModifiers(($event) => _ctx.manageKeydown($event, date), ["prevent"]),
                    tabindex: _ctx.focused.month === date.getMonth() ? void 0 : -1
                  }, [
                    vue.createTextVNode(
                      vue.toDisplayString(_ctx.monthNames[date.getMonth()]) + " ",
                      1
                      /* TEXT */
                    ),
                    _ctx.eventsDateMatch(date) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$1, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(_ctx.eventsDateMatch(date), (event, evIdx) => {
                          return vue.openBlock(), vue.createElementBlock(
                            "div",
                            {
                              class: vue.normalizeClass(["event", event.type]),
                              key: evIdx
                            },
                            null,
                            2
                            /* CLASS */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])) : vue.createCommentVNode("v-if", true)
                  ], 42, _hoisted_3$1)) : (vue.openBlock(), vue.createElementBlock(
                    "div",
                    {
                      key: 1,
                      class: vue.normalizeClass([_ctx.classObject(date), "datepicker-cell"])
                    },
                    vue.toDisplayString(_ctx.monthNames[date.getMonth()]),
                    3
                    /* TEXT, CLASS */
                  ))
                ],
                64
                /* STABLE_FRAGMENT */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ],
      2
      /* CLASS */
    )
  ]);
}
var BDatepickerMonth = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

const defaultDateFormatter = (date, vm) => {
  const targetDates = Array.isArray(date) ? date : [date];
  const dates = targetDates.map((date2) => {
    const d = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), 12);
    return !vm.isTypeMonth ? vm.dtf.format(d) : vm.dtfMonth.format(d);
  });
  return !vm.multiple ? dates.join(" - ") : dates.join(", ");
};
const defaultDateParser = (date, vm) => {
  if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === "function") {
    const formatRegex = (vm.isTypeMonth ? vm.dtfMonth : vm.dtf).formatToParts(new Date(2e3, 11, 25)).map((part) => {
      if (part.type === "literal") {
        return part.value;
      }
      return `((?!=<${part.type}>)\\d+)`;
    }).join("");
    const dateGroups = helpers.matchWithGroups(formatRegex, date);
    if (dateGroups.year && dateGroups.year.length === 4 && dateGroups.month && +dateGroups.month <= 12) {
      if (vm.isTypeMonth) return new Date(+dateGroups.year, +dateGroups.month - 1);
      else if (dateGroups.day && +dateGroups.day <= 31) {
        return new Date(+dateGroups.year, +dateGroups.month - 1, +dateGroups.day, 12);
      }
    }
  }
  if (!vm.isTypeMonth) return new Date(Date.parse(date));
  if (date) {
    const s = date.split("/");
    const year = s[0].length === 4 ? s[0] : s[1];
    const month = s[0].length === 2 ? s[0] : s[1];
    if (year && month) {
      return new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1, 0, 0, 0, 0);
    }
  }
  return null;
};
var _sfc_main = vue.defineComponent({
  name: "BDatepicker",
  components: {
    BDatepickerTable,
    BDatepickerMonth,
    BInput: Input.BInput,
    BField: Field.Field,
    BSelect: Select.BSelect,
    BIcon: Icon.BIcon,
    BDropdown: Dropdown.BDropdown,
    BDropdownItem: DropdownItem.BDropdownItem
  },
  mixins: [CompatFallthroughMixin.CompatFallthroughMixin, FormElementMixin.FormElementMixin],
  provide() {
    return {
      $datepicker: this
    };
  },
  props: {
    modelValue: {
      type: [Date, Array, null]
    },
    dayNames: {
      type: [Array, null],
      default: () => {
        if (!Array.isArray(config.config.defaultDayNames)) {
          return void 0;
        }
        return config.config.defaultDayNames;
      }
    },
    monthNames: {
      type: [Array, null],
      default: () => {
        if (!Array.isArray(config.config.defaultMonthNames)) {
          return void 0;
        }
        return config.config.defaultMonthNames;
      }
    },
    firstDayOfWeek: {
      type: Number,
      default: () => {
        if (typeof config.config.defaultFirstDayOfWeek === "number") {
          return config.config.defaultFirstDayOfWeek;
        } else {
          return 0;
        }
      }
    },
    inline: Boolean,
    minDate: [Date, null],
    maxDate: [Date, null],
    focusedDate: Date,
    placeholder: String,
    editable: Boolean,
    disabled: Boolean,
    horizontalTimePicker: Boolean,
    unselectableDates: [Array, Function],
    unselectableDaysOfWeek: {
      type: [Array, null],
      default: () => config.config.defaultUnselectableDaysOfWeek
    },
    selectableDates: [Array, Function],
    dateFormatter: {
      type: Function,
      default: (date, vm) => {
        if (typeof config.config.defaultDateFormatter === "function") {
          return config.config.defaultDateFormatter(date);
        } else {
          return defaultDateFormatter(date, vm);
        }
      }
    },
    dateParser: {
      type: Function,
      default: (date, vm) => {
        if (typeof config.config.defaultDateParser === "function") {
          return config.config.defaultDateParser(date);
        } else {
          return defaultDateParser(date, vm);
        }
      }
    },
    dateCreator: {
      type: Function,
      default: () => {
        if (typeof config.config.defaultDateCreator === "function") {
          return config.config.defaultDateCreator();
        } else {
          return /* @__PURE__ */ new Date();
        }
      }
    },
    mobileNative: {
      type: Boolean,
      default: () => config.config.defaultDatepickerMobileNative
    },
    position: String,
    iconRight: String,
    iconRightClickable: Boolean,
    events: Array,
    indicators: {
      type: String,
      default: "dots"
    },
    openOnFocus: Boolean,
    iconPrev: {
      type: String,
      default: () => config.config.defaultIconPrev
    },
    iconNext: {
      type: String,
      default: () => config.config.defaultIconNext
    },
    yearsRange: {
      type: Array,
      default: () => config.config.defaultDatepickerYearsRange
    },
    type: {
      type: String,
      validator: (value) => {
        return [
          "month"
        ].indexOf(value) >= 0;
      }
    },
    nearbyMonthDays: {
      type: Boolean,
      default: () => config.config.defaultDatepickerNearbyMonthDays
    },
    nearbySelectableMonthDays: {
      type: Boolean,
      default: () => config.config.defaultDatepickerNearbySelectableMonthDays
    },
    showWeekNumber: {
      type: Boolean,
      default: () => config.config.defaultDatepickerShowWeekNumber
    },
    weekNumberClickable: {
      type: Boolean,
      default: () => config.config.defaultDatepickerWeekNumberClickable
    },
    rulesForFirstWeek: {
      type: Number,
      default: () => 4
    },
    range: {
      type: Boolean,
      default: false
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    mobileModal: {
      type: Boolean,
      default: () => config.config.defaultDatepickerMobileModal
    },
    focusable: {
      type: Boolean,
      default: true
    },
    trapFocus: {
      type: Boolean,
      default: () => config.config.defaultTrapFocus
    },
    appendToBody: Boolean,
    ariaNextLabel: String,
    ariaPreviousLabel: String
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "active-change": (_active) => true,
    "change-month": (_month) => true,
    "change-year": (_year) => true,
    "icon-right-click": (_event) => true,
    "range-end": (_date) => true,
    "range-start": (_date) => true,
    "update:modelValue": (_value) => true,
    "week-number-click": (_week, _year) => true
    // emitted by `DatepickerTableRow`
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    const focusedDate = (Array.isArray(this.modelValue) ? this.modelValue[0] : this.modelValue) || this.focusedDate || this.dateCreator();
    if (!this.modelValue && this.maxDate && this.maxDate.getFullYear() < focusedDate.getFullYear()) {
      focusedDate.setFullYear(this.maxDate.getFullYear());
    }
    return {
      dateSelected: this.modelValue,
      focusedDateData: {
        day: focusedDate.getDate(),
        month: focusedDate.getMonth(),
        year: focusedDate.getFullYear()
      },
      _elementRef: "input",
      _isDatepicker: true
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.dateSelected;
      },
      set(value) {
        this.updateInternalState(value);
        if (!this.multiple) this.togglePicker(false);
        this.$emit("update:modelValue", value);
        if (this.useHtml5Validation) {
          this.$nextTick(() => {
            this.checkHtml5Validity();
          });
        }
      }
    },
    formattedValue() {
      return this.formatValue(this.computedValue);
    },
    localeOptions() {
      return new Intl.DateTimeFormat(this.locale, {
        year: "numeric",
        month: "numeric"
      }).resolvedOptions();
    },
    dtf() {
      return new Intl.DateTimeFormat(this.locale);
    },
    dtfMonth() {
      return new Intl.DateTimeFormat(this.locale, {
        year: this.localeOptions.year || "numeric",
        month: this.localeOptions.month || "2-digit"
      });
    },
    newMonthNames() {
      if (Array.isArray(this.monthNames)) {
        return this.monthNames;
      }
      return helpers.getMonthNames(this.locale);
    },
    newDayNames() {
      if (Array.isArray(this.dayNames)) {
        return this.dayNames;
      }
      return helpers.getWeekdayNames(this.locale);
    },
    listOfMonths() {
      let minMonth = 0;
      let maxMonth = 12;
      if (this.minDate && this.focusedDateData.year === this.minDate.getFullYear()) {
        minMonth = this.minDate.getMonth();
      }
      if (this.maxDate && this.focusedDateData.year === this.maxDate.getFullYear()) {
        maxMonth = this.maxDate.getMonth();
      }
      return this.newMonthNames.map((name, index) => {
        return {
          name,
          index,
          disabled: index < minMonth || index > maxMonth
        };
      });
    },
    /*
     * Returns an array of years for the year dropdown. If earliest/latest
     * dates are set by props, range of years will fall within those dates.
     */
    listOfYears() {
      let latestYear = this.focusedDateData.year + this.yearsRange[1];
      if (this.maxDate && this.maxDate.getFullYear() < latestYear) {
        latestYear = Math.max(this.maxDate.getFullYear(), this.focusedDateData.year);
      }
      let earliestYear = this.focusedDateData.year + this.yearsRange[0];
      if (this.minDate && this.minDate.getFullYear() > earliestYear) {
        earliestYear = Math.min(this.minDate.getFullYear(), this.focusedDateData.year);
      }
      const arrayOfYears = [];
      for (let i = earliestYear; i <= latestYear; i++) {
        arrayOfYears.push(i);
      }
      return arrayOfYears.reverse();
    },
    showPrev() {
      if (!this.minDate) return false;
      if (this.isTypeMonth) {
        return this.focusedDateData.year <= this.minDate.getFullYear();
      }
      const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
      const date = new Date(this.minDate.getFullYear(), this.minDate.getMonth());
      return dateToCheck <= date;
    },
    showNext() {
      if (!this.maxDate) return false;
      if (this.isTypeMonth) {
        return this.focusedDateData.year >= this.maxDate.getFullYear();
      }
      const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
      const date = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth());
      return dateToCheck >= date;
    },
    isMobile() {
      return this.mobileNative && helpers.isMobile.any();
    },
    isTypeMonth() {
      return this.type === "month";
    },
    ariaRole() {
      if (!this.inline) {
        return "dialog";
      } else {
        return void 0;
      }
    },
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  watch: {
    /*
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    modelValue(value) {
      this.updateInternalState(value);
      if (!this.multiple) this.togglePicker(false);
    },
    focusedDate(value) {
      if (value) {
        this.focusedDateData = {
          day: value.getDate(),
          month: value.getMonth(),
          year: value.getFullYear()
        };
      }
    },
    /*
     * Emit input event on month and/or year change
     */
    "focusedDateData.month"(value) {
      this.$emit("change-month", value);
    },
    "focusedDateData.year"(value) {
      this.$emit("change-year", value);
    }
  },
  methods: {
    /*
     * Parse string into date
     */
    onChange(value) {
      const date = this.dateParser(value, this);
      if (date && (!isNaN(date.valueOf()) || Array.isArray(date) && date.length === 2 && !isNaN(date[0]) && !isNaN(date[1]))) {
        this.computedValue = date;
      } else {
        this.computedValue = null;
        if (this.$refs.input) {
          this.$refs.input.newValue = this.computedValue;
        }
      }
    },
    /*
     * Format date into string
     */
    formatValue(value) {
      if (Array.isArray(value)) {
        const isArrayWithValidDates = Array.isArray(value) && value.every((v) => {
          var _a;
          return !isNaN((_a = v == null ? void 0 : v.valueOf()) != null ? _a : NaN);
        });
        return isArrayWithValidDates ? this.dateFormatter([...value], this) : null;
      }
      return value && !isNaN(value.valueOf()) ? this.dateFormatter(value, this) : null;
    },
    /*
     * Either decrement month by 1 if not January or decrement year by 1
     * and set month to 11 (December) or decrement year when 'month'
     */
    prev() {
      if (this.disabled) return;
      if (this.isTypeMonth) {
        this.focusedDateData.year -= 1;
      } else {
        if (this.focusedDateData.month > 0) {
          this.focusedDateData.month -= 1;
        } else {
          this.focusedDateData.month = 11;
          this.focusedDateData.year -= 1;
        }
      }
    },
    /*
     * Either increment month by 1 if not December or increment year by 1
     * and set month to 0 (January) or increment year when 'month'
     */
    next() {
      if (this.disabled) return;
      if (this.isTypeMonth) {
        this.focusedDateData.year += 1;
      } else {
        if (this.focusedDateData.month < 11) {
          this.focusedDateData.month += 1;
        } else {
          this.focusedDateData.month = 0;
          this.focusedDateData.year += 1;
        }
      }
    },
    formatNative(value) {
      return this.isTypeMonth ? this.formatYYYYMM(value) : this.formatYYYYMMDD(value);
    },
    /*
     * Format date into string 'YYYY-MM-DD'
     */
    formatYYYYMMDD(value) {
      const date = new Date(value);
      if (value && !isNaN(date.valueOf())) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return year + "-" + ((month < 10 ? "0" : "") + month) + "-" + ((day < 10 ? "0" : "") + day);
      }
      return "";
    },
    /*
     * Format date into string 'YYYY-MM'
     */
    formatYYYYMM(value) {
      const date = new Date(value);
      if (value && !isNaN(date.valueOf())) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        return year + "-" + ((month < 10 ? "0" : "") + month);
      }
      return "";
    },
    /*
     * Parse date from string
     */
    onChangeNativePicker(event) {
      const date = event.target.value;
      const s = date ? date.split("-") : [];
      if (s.length === 3) {
        const year = parseInt(s[0], 10);
        const month = parseInt(s[1]) - 1;
        const day = parseInt(s[2]);
        this.computedValue = new Date(year, month, day);
      } else {
        this.computedValue = null;
      }
    },
    updateInternalState(value) {
      if (this.dateSelected === value) return;
      const isArray = Array.isArray(value);
      const currentDate = isArray ? !value.length ? this.dateCreator() : value[value.length - 1] : !value ? this.dateCreator() : value;
      if (!isArray || this.dateSelected && value.length > this.dateSelected.length) {
        this.focusedDateData = {
          day: currentDate.getDate(),
          month: currentDate.getMonth(),
          year: currentDate.getFullYear()
        };
      }
      this.dateSelected = value;
    },
    /*
     * Toggle datepicker
     */
    togglePicker(active) {
      if (this.$refs.dropdown) {
        const isActive = typeof active === "boolean" ? active : !this.$refs.dropdown.isActive;
        if (isActive) {
          this.$refs.dropdown.isActive = isActive;
        } else if (this.closeOnClick) {
          this.$refs.dropdown.isActive = isActive;
        }
      }
    },
    /*
     * Call default onFocus method and show datepicker
     */
    handleOnFocus(event) {
      this.onFocus(event);
      if (this.openOnFocus) {
        this.togglePicker(true);
      }
    },
    /*
     * Toggle dropdown
     */
    toggle() {
      if (this.mobileNative && this.isMobile) {
        const input = this.$refs.input.$refs.input;
        input.focus();
        input.click();
        return;
      }
      this.$refs.dropdown.toggle();
    },
    /*
     * Avoid dropdown toggle when is already visible
     */
    onInputClick(event) {
      if (this.$refs.dropdown.isActive) {
        event.stopPropagation();
      }
    },
    /*
     * Keypress event that is bound to the document.
     */
    keyPress({ key }) {
      if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === "Escape" || key === "Esc")) {
        this.togglePicker(false);
      }
    },
    /*
     * Emit 'blur' event on dropdown is not active (closed)
     */
    onActiveChange(value) {
      if (!value) {
        this.onBlur();
      }
      this.$emit("active-change", value);
    },
    changeFocus(day) {
      this.focusedDateData = {
        day: day.getDate(),
        month: day.getMonth(),
        year: day.getFullYear()
      };
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("keyup", this.keyPress);
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keyup", this.keyPress);
    }
  }
});

const _hoisted_1 = { class: "datepicker-header" };
const _hoisted_2 = ["disabled", "aria-label"];
const _hoisted_3 = ["disabled", "aria-label"];
const _hoisted_4 = { class: "pagination-list" };
const _hoisted_5 = ["value", "disabled"];
const _hoisted_6 = ["value"];
const _hoisted_7 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_input = vue.resolveComponent("b-input");
  const _component_b_icon = vue.resolveComponent("b-icon");
  const _component_b_select = vue.resolveComponent("b-select");
  const _component_b_field = vue.resolveComponent("b-field");
  const _component_b_datepicker_table = vue.resolveComponent("b-datepicker-table");
  const _component_b_datepicker_month = vue.resolveComponent("b-datepicker-month");
  const _component_b_dropdown_item = vue.resolveComponent("b-dropdown-item");
  const _component_b_dropdown = vue.resolveComponent("b-dropdown");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    vue.mergeProps({
      class: ["datepicker control", [_ctx.size, { "is-expanded": _ctx.expanded }]]
    }, _ctx.rootAttrs),
    [
      !_ctx.isMobile || _ctx.inline ? (vue.openBlock(), vue.createBlock(_component_b_dropdown, {
        key: 0,
        ref: "dropdown",
        position: _ctx.position,
        disabled: _ctx.disabledOrUndefined,
        inline: _ctx.inline,
        "mobile-modal": _ctx.mobileModal,
        "trap-focus": _ctx.trapFocus,
        "aria-role": _ctx.ariaRole,
        "append-to-body": _ctx.appendToBody,
        "append-to-body-copy-parent": "",
        onActiveChange: _ctx.onActiveChange,
        "trigger-tabindex": -1
      }, vue.createSlots({
        default: vue.withCtx(() => [
          vue.createVNode(_component_b_dropdown_item, {
            disabled: _ctx.disabledOrUndefined,
            focusable: _ctx.focusable,
            custom: "",
            class: vue.normalizeClass({ "dropdown-horizontal-timepicker": _ctx.horizontalTimePicker })
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("div", null, [
                vue.createElementVNode("header", _hoisted_1, [
                  _ctx.$slots.header !== void 0 && _ctx.$slots.header([]).length ? vue.renderSlot(_ctx.$slots, "header", { key: 0 }) : (vue.openBlock(), vue.createElementBlock(
                    "div",
                    {
                      key: 1,
                      class: vue.normalizeClass(["pagination field is-centered", _ctx.size])
                    },
                    [
                      vue.withDirectives(vue.createElementVNode("a", {
                        class: "pagination-previous",
                        role: "button",
                        href: "#",
                        disabled: _ctx.disabledOrUndefined,
                        "aria-label": _ctx.ariaPreviousLabel,
                        onClick: _cache[3] || (_cache[3] = vue.withModifiers((...args) => _ctx.prev && _ctx.prev(...args), ["prevent"])),
                        onKeydown: [
                          _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers((...args) => _ctx.prev && _ctx.prev(...args), ["prevent"]), ["enter"])),
                          _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers((...args) => _ctx.prev && _ctx.prev(...args), ["prevent"]), ["space"]))
                        ]
                      }, [
                        vue.createVNode(_component_b_icon, {
                          icon: _ctx.iconPrev,
                          pack: _ctx.iconPack,
                          both: "",
                          type: "is-primary is-clickable"
                        }, null, 8, ["icon", "pack"])
                      ], 40, _hoisted_2), [
                        [vue.vShow, !_ctx.showPrev && !_ctx.disabled]
                      ]),
                      vue.withDirectives(vue.createElementVNode("a", {
                        class: "pagination-next",
                        role: "button",
                        href: "#",
                        disabled: _ctx.disabledOrUndefined,
                        "aria-label": _ctx.ariaNextLabel,
                        onClick: _cache[6] || (_cache[6] = vue.withModifiers((...args) => _ctx.next && _ctx.next(...args), ["prevent"])),
                        onKeydown: [
                          _cache[7] || (_cache[7] = vue.withKeys(vue.withModifiers((...args) => _ctx.next && _ctx.next(...args), ["prevent"]), ["enter"])),
                          _cache[8] || (_cache[8] = vue.withKeys(vue.withModifiers((...args) => _ctx.next && _ctx.next(...args), ["prevent"]), ["space"]))
                        ]
                      }, [
                        vue.createVNode(_component_b_icon, {
                          icon: _ctx.iconNext,
                          pack: _ctx.iconPack,
                          both: "",
                          type: "is-primary is-clickable"
                        }, null, 8, ["icon", "pack"])
                      ], 40, _hoisted_3), [
                        [vue.vShow, !_ctx.showNext && !_ctx.disabled]
                      ]),
                      vue.createElementVNode("div", _hoisted_4, [
                        vue.createVNode(_component_b_field, null, {
                          default: vue.withCtx(() => [
                            !_ctx.isTypeMonth ? (vue.openBlock(), vue.createBlock(_component_b_select, {
                              key: 0,
                              modelValue: _ctx.focusedDateData.month,
                              "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.focusedDateData.month = $event),
                              disabled: _ctx.disabledOrUndefined,
                              size: _ctx.size
                            }, {
                              default: vue.withCtx(() => [
                                (vue.openBlock(true), vue.createElementBlock(
                                  vue.Fragment,
                                  null,
                                  vue.renderList(_ctx.listOfMonths, (month) => {
                                    return vue.openBlock(), vue.createElementBlock("option", {
                                      value: month.index,
                                      key: month.name,
                                      disabled: month.disabled || void 0
                                    }, vue.toDisplayString(month.name), 9, _hoisted_5);
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ]),
                              _: 1
                              /* STABLE */
                            }, 8, ["modelValue", "disabled", "size"])) : vue.createCommentVNode("v-if", true),
                            vue.createVNode(_component_b_select, {
                              modelValue: _ctx.focusedDateData.year,
                              "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.focusedDateData.year = $event),
                              disabled: _ctx.disabledOrUndefined,
                              size: _ctx.size
                            }, {
                              default: vue.withCtx(() => [
                                (vue.openBlock(true), vue.createElementBlock(
                                  vue.Fragment,
                                  null,
                                  vue.renderList(_ctx.listOfYears, (year) => {
                                    return vue.openBlock(), vue.createElementBlock("option", {
                                      value: year,
                                      key: year
                                    }, vue.toDisplayString(year), 9, _hoisted_6);
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ]),
                              _: 1
                              /* STABLE */
                            }, 8, ["modelValue", "disabled", "size"])
                          ]),
                          _: 1
                          /* STABLE */
                        })
                      ])
                    ],
                    2
                    /* CLASS */
                  ))
                ]),
                !_ctx.isTypeMonth ? (vue.openBlock(), vue.createElementBlock(
                  "div",
                  {
                    key: 0,
                    class: vue.normalizeClass(["datepicker-content", { "content-horizontal-timepicker": _ctx.horizontalTimePicker }])
                  },
                  [
                    vue.createVNode(_component_b_datepicker_table, {
                      modelValue: _ctx.computedValue,
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => _ctx.computedValue = $event),
                      "day-names": _ctx.newDayNames,
                      "month-names": _ctx.newMonthNames,
                      "first-day-of-week": _ctx.firstDayOfWeek,
                      "rules-for-first-week": _ctx.rulesForFirstWeek,
                      "min-date": _ctx.minDate,
                      "max-date": _ctx.maxDate,
                      focused: _ctx.focusedDateData,
                      disabled: _ctx.disabledOrUndefined,
                      "unselectable-dates": _ctx.unselectableDates,
                      "unselectable-days-of-week": _ctx.unselectableDaysOfWeek,
                      "selectable-dates": _ctx.selectableDates,
                      events: _ctx.events,
                      indicators: _ctx.indicators,
                      "date-creator": _ctx.dateCreator,
                      "type-month": _ctx.isTypeMonth,
                      "nearby-month-days": _ctx.nearbyMonthDays,
                      "nearby-selectable-month-days": _ctx.nearbySelectableMonthDays,
                      "show-week-number": _ctx.showWeekNumber,
                      "week-number-clickable": _ctx.weekNumberClickable,
                      range: _ctx.range,
                      multiple: _ctx.multiple,
                      onRangeStart: _cache[12] || (_cache[12] = (date) => _ctx.$emit("range-start", date)),
                      onRangeEnd: _cache[13] || (_cache[13] = (date) => _ctx.$emit("range-end", date)),
                      onClose: _cache[14] || (_cache[14] = ($event) => _ctx.togglePicker(false)),
                      "onUpdate:focused": _cache[15] || (_cache[15] = ($event) => _ctx.focusedDateData = $event)
                    }, null, 8, ["modelValue", "day-names", "month-names", "first-day-of-week", "rules-for-first-week", "min-date", "max-date", "focused", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "type-month", "nearby-month-days", "nearby-selectable-month-days", "show-week-number", "week-number-clickable", "range", "multiple"])
                  ],
                  2
                  /* CLASS */
                )) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [
                  vue.createVNode(_component_b_datepicker_month, {
                    modelValue: _ctx.computedValue,
                    "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => _ctx.computedValue = $event),
                    "month-names": _ctx.newMonthNames,
                    "min-date": _ctx.minDate,
                    "max-date": _ctx.maxDate,
                    focused: _ctx.focusedDateData,
                    disabled: _ctx.disabledOrUndefined,
                    "unselectable-dates": _ctx.unselectableDates,
                    "unselectable-days-of-week": _ctx.unselectableDaysOfWeek,
                    "selectable-dates": _ctx.selectableDates,
                    events: _ctx.events,
                    indicators: _ctx.indicators,
                    "date-creator": _ctx.dateCreator,
                    range: _ctx.range,
                    multiple: _ctx.multiple,
                    onRangeStart: _cache[17] || (_cache[17] = (date) => _ctx.$emit("range-start", date)),
                    onRangeEnd: _cache[18] || (_cache[18] = (date) => _ctx.$emit("range-end", date)),
                    onClose: _cache[19] || (_cache[19] = ($event) => _ctx.togglePicker(false)),
                    onChangeFocus: _ctx.changeFocus,
                    "onUpdate:focused": _cache[20] || (_cache[20] = ($event) => _ctx.focusedDateData = $event)
                  }, null, 8, ["modelValue", "month-names", "min-date", "max-date", "focused", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "range", "multiple", "onChangeFocus"])
                ]))
              ]),
              _ctx.$slots.default !== void 0 && _ctx.$slots.default([]).length ? (vue.openBlock(), vue.createElementBlock(
                "footer",
                {
                  key: 0,
                  class: vue.normalizeClass(["datepicker-footer", { "footer-horizontal-timepicker": _ctx.horizontalTimePicker }])
                },
                [
                  vue.renderSlot(_ctx.$slots, "default")
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["disabled", "focusable", "class"])
        ]),
        _: 2
        /* DYNAMIC */
      }, [
        !_ctx.inline ? {
          name: "trigger",
          fn: vue.withCtx((props) => [
            vue.renderSlot(_ctx.$slots, "trigger", vue.normalizeProps(vue.guardReactiveProps(props)), () => [
              vue.createVNode(_component_b_input, vue.mergeProps({
                ref: "input",
                autocomplete: "off",
                "model-value": _ctx.formattedValue,
                placeholder: _ctx.placeholder,
                size: _ctx.size,
                icon: _ctx.icon,
                "icon-right": _ctx.iconRight,
                "icon-right-clickable": _ctx.iconRightClickable,
                "icon-pack": _ctx.iconPack,
                rounded: _ctx.rounded,
                loading: _ctx.loading,
                disabled: _ctx.disabledOrUndefined,
                readonly: !_ctx.editable
              }, _ctx.fallthroughAttrs, {
                "use-html5-validation": false,
                onClick: _ctx.onInputClick,
                onIconRightClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("icon-right-click", $event)),
                onKeyup: _cache[1] || (_cache[1] = vue.withKeys(($event) => _ctx.togglePicker(true), ["enter"])),
                onChange: _cache[2] || (_cache[2] = ($event) => _ctx.onChange($event.target.value)),
                onFocus: _ctx.handleOnFocus
              }), null, 16, ["model-value", "placeholder", "size", "icon", "icon-right", "icon-right-clickable", "icon-pack", "rounded", "loading", "disabled", "readonly", "onClick", "onFocus"])
            ])
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["position", "disabled", "inline", "mobile-modal", "trap-focus", "aria-role", "append-to-body", "onActiveChange"])) : (vue.openBlock(), vue.createBlock(_component_b_input, vue.mergeProps({
        key: 1,
        ref: "input",
        type: !_ctx.isTypeMonth ? "date" : "month",
        autocomplete: "off",
        "model-value": _ctx.formatNative(_ctx.computedValue),
        placeholder: _ctx.placeholder,
        size: _ctx.size,
        icon: _ctx.icon,
        "icon-pack": _ctx.iconPack,
        rounded: _ctx.rounded,
        loading: _ctx.loading,
        max: _ctx.formatNative(_ctx.maxDate),
        min: _ctx.formatNative(_ctx.minDate),
        disabled: _ctx.disabledOrUndefined,
        readonly: false
      }, _ctx.fallthroughAttrs, {
        "use-html5-validation": false,
        onChange: _ctx.onChangeNativePicker,
        onFocus: _ctx.onFocus,
        onBlur: _ctx.onBlur
      }), null, 16, ["type", "model-value", "placeholder", "size", "icon", "icon-pack", "rounded", "loading", "max", "min", "disabled", "onChange", "onFocus", "onBlur"]))
    ],
    16
    /* FULL_PROPS */
  );
}
var BDatepicker = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);

exports.BDatepicker = BDatepicker;
