/*!
 * vuejs-datepicker v1.5.4
 * (c) 2016-2018 Charlie Kassel
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.vuejsDatepicker = factory());
}(this, (function () { 'use strict';

  var Language = function Language (language, months, monthsAbbr, days) {
    this.language = language;
    this.months = months;
    this.monthsAbbr = monthsAbbr;
    this.days = days;
    this.rtl = false;
    this.ymd = false;
    this.yearSuffix = '';
  };

  var prototypeAccessors = { language: { configurable: true },months: { configurable: true },monthsAbbr: { configurable: true },days: { configurable: true } };

  prototypeAccessors.language.get = function () {
    return this._language
  };

  prototypeAccessors.language.set = function (language) {
    if (typeof language !== 'string') {
      throw new TypeError('Language must be a string')
    }
    this._language = language;
  };

  prototypeAccessors.months.get = function () {
    return this._months
  };

  prototypeAccessors.months.set = function (months) {
    if (months.length !== 12) {
      throw new RangeError(("There must be 12 months for " + (this.language) + " language"))
    }
    this._months = months;
  };

  prototypeAccessors.monthsAbbr.get = function () {
    return this._monthsAbbr
  };

  prototypeAccessors.monthsAbbr.set = function (monthsAbbr) {
    if (monthsAbbr.length !== 12) {
      throw new RangeError(("There must be 12 abbreviated months for " + (this.language) + " language"))
    }
    this._monthsAbbr = monthsAbbr;
  };

  prototypeAccessors.days.get = function () {
    return this._days
  };

  prototypeAccessors.days.set = function (days) {
    if (days.length !== 7) {
      throw new RangeError(("There must be 7 days for " + (this.language) + " language"))
    }
    this._days = days;
  };

  Object.defineProperties( Language.prototype, prototypeAccessors );

  var en = new Language(
    'English',
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  )
  // eslint-disable-next-line
  ;

  var utils = {
    /**
     * @type {Boolean}
     */
    useUtc: false,
    /**
     * Returns the full year, using UTC or not
     * @param {Date} date
     */
    getFullYear: function getFullYear (date) {
      return this.useUtc ? date.getUTCFullYear() : date.getFullYear()
    },

    /**
     * Returns the month, using UTC or not
     * @param {Date} date
     */
    getMonth: function getMonth (date) {
      return this.useUtc ? date.getUTCMonth() : date.getMonth()
    },

    /**
     * Returns the date, using UTC or not
     * @param {Date} date
     */
    getDate: function getDate (date) {
      return this.useUtc ? date.getUTCDate() : date.getDate()
    },

    /**
     * Returns the day, using UTC or not
     * @param {Date} date
     */
    getDay: function getDay (date) {
      return this.useUtc ? date.getUTCDay() : date.getDay()
    },

    /**
     * Returns the hours, using UTC or not
     * @param {Date} date
     */
    getHours: function getHours (date) {
      return this.useUtc ? date.getUTCHours() : date.getHours()
    },

    /**
     * Returns the minutes, using UTC or not
     * @param {Date} date
     */
    getMinutes: function getMinutes (date) {
      return this.useUtc ? date.getUTCMinutes() : date.getMinutes()
    },

    /**
     * Sets the full year, using UTC or not
     * @param {Date} date
     */
    setFullYear: function setFullYear (date, value, useUtc) {
      return this.useUtc ? date.setUTCFullYear(value) : date.setFullYear(value)
    },

    /**
     * Sets the month, using UTC or not
     * @param {Date} date
     */
    setMonth: function setMonth (date, value, useUtc) {
      return this.useUtc ? date.setUTCMonth(value) : date.setMonth(value)
    },

    /**
     * Sets the date, using UTC or not
     * @param {Date} date
     * @param {Number} value
     */
    setDate: function setDate (date, value, useUtc) {
      return this.useUtc ? date.setUTCDate(value) : date.setDate(value)
    },

    /**
     * Check if date1 is equivalent to date2, without comparing the time
     * @see https://stackoverflow.com/a/6202196/4455925
     * @param {Date} date1
     * @param {Date} date2
     */
    compareDates: function compareDates (date1, date2) {
      var d1 = new Date(date1.getTime());
      var d2 = new Date(date2.getTime());

      if (this.useUtc) {
        d1.setUTCHours(0, 0, 0, 0);
        d2.setUTCHours(0, 0, 0, 0);
      } else {
        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);
      }
      return d1.getTime() === d2.getTime()
    },

    /**
     * Validates a date object
     * @param {Date} date - an object instantiated with the new Date constructor
     * @return {Boolean}
     */
    isValidDate: function isValidDate (date) {
      if (Object.prototype.toString.call(date) !== '[object Date]') {
        return false
      }
      return !isNaN(date.getTime())
    },

    /**
     * Return abbreviated week day name
     * @param {Date}
     * @param {Array}
     * @return {String}
     */
    getDayNameAbbr: function getDayNameAbbr (date, days) {
      if (typeof date !== 'object') {
        throw TypeError('Invalid Type')
      }
      return days[this.getDay(date)]
    },

    /**
     * Return name of the month
     * @param {Number|Date}
     * @param {Array}
     * @return {String}
     */
    getMonthName: function getMonthName (month, months) {
      if (!months) {
        throw Error('missing 2nd parameter Months array')
      }
      if (typeof month === 'object') {
        return months[this.getMonth(month)]
      }
      if (typeof month === 'number') {
        return months[month]
      }
      throw TypeError('Invalid type')
    },

    /**
     * Return an abbreviated version of the month
     * @param {Number|Date}
     * @return {String}
     */
    getMonthNameAbbr: function getMonthNameAbbr (month, monthsAbbr) {
      if (!monthsAbbr) {
        throw Error('missing 2nd paramter Months array')
      }
      if (typeof month === 'object') {
        return monthsAbbr[this.getMonth(month)]
      }
      if (typeof month === 'number') {
        return monthsAbbr[month]
      }
      throw TypeError('Invalid type')
    },

    /**
     * Alternative get total number of days in month
     * @param {Number} year
     * @param {Number} m
     * @return {Number}
     */
    daysInMonth: function daysInMonth (year, month) {
      return /8|3|5|10/.test(month) ? 30 : month === 1 ? (!(year % 4) && year % 100) || !(year % 400) ? 29 : 28 : 31
    },

    /**
     * Get nth suffix for date
     * @param {Number} day
     * @return {String}
     */
    getNthSuffix: function getNthSuffix (day) {
      switch (day) {
        case 1:
        case 21:
        case 31:
          return 'st'
        case 2:
        case 22:
          return 'nd'
        case 3:
        case 23:
          return 'rd'
        default:
          return 'th'
      }
    },

    /**
     * Formats date object
     * @param {Date}
     * @param {String}
     * @param {Object}
     * @return {String}
     */
    formatDate: function formatDate (date, format, translation) {
      translation = (!translation) ? en : translation;
      var year = this.getFullYear(date);
      var month = this.getMonth(date) + 1;
      var day = this.getDate(date);
      var str = format
        .replace(/dd/, ('0' + day).slice(-2))
        .replace(/d/, day)
        .replace(/yyyy/, year)
        .replace(/yy/, String(year).slice(2))
        .replace(/MMMM/, this.getMonthName(this.getMonth(date), translation.months))
        .replace(/MMM/, this.getMonthNameAbbr(this.getMonth(date), translation.monthsAbbr))
        .replace(/MM/, ('0' + month).slice(-2))
        .replace(/M(?!a|ä|e)/, month)
        .replace(/su/, this.getNthSuffix(this.getDate(date)))
        .replace(/D(?!e|é|i)/, this.getDayNameAbbr(date, translation.days));
      return str
    },

    /**
     * Creates an array of dates for each day in between two dates.
     * @param {Date} start
     * @param {Date} end
     * @return {Array}
     */
    createDateArray: function createDateArray (start, end) {
      var this$1 = this;

      var dates = [];
      while (start <= end) {
        dates.push(new Date(start));
        start = this$1.setDate(new Date(start), this$1.getDate(new Date(start)) + 1);
      }
      return dates
    },

    /**
     * method used as a prop validator for input values
     * @param {*} val
     * @return {Boolean}
     */
    validateDateInput: function validateDateInput (val) {
      return val === null || val instanceof Date || typeof val === 'string' || typeof val === 'number'
    }
  };

  var makeDateUtils = function (useUtc) { return (Object.assign({}, utils, {useUtc: useUtc})); };

  var utils$1 = Object.assign({}, utils)
  // eslint-disable-next-line
  ;

  (function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
  var DateInput = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{'input-group' : _vm.bootstrapStyling}},[(_vm.calendarButton)?_c('span',{staticClass:"vdp-datepicker__calendar-button",class:{'input-group-prepend' : _vm.bootstrapStyling},style:({'cursor:not-allowed;' : _vm.disabled}),on:{"click":_vm.showCalendar}},[_c('span',{class:{'input-group-text' : _vm.bootstrapStyling}},[_c('i',{class:_vm.calendarButtonIcon},[_vm._v(" "+_vm._s(_vm.calendarButtonIconContent)+" "),(!_vm.calendarButtonIcon)?_c('span',[_vm._v("…")]):_vm._e()])])]):_vm._e(),_vm._v(" "),_c('input',{ref:_vm.refName,class:_vm.computedInputClass,attrs:{"type":_vm.inline ? 'hidden' : 'text',"name":_vm.name,"id":_vm.id,"open-date":_vm.openDate,"placeholder":_vm.placeholder,"clear-button":_vm.clearButton,"disabled":_vm.disabled,"required":_vm.required,"readonly":!_vm.typeable,"autocomplete":"off"},domProps:{"value":_vm.formattedValue},on:{"click":_vm.showCalendar,"keyup":_vm.parseTypedDate,"blur":_vm.inputBlurred}}),_vm._v(" "),(_vm.clearButton && _vm.selectedDate)?_c('span',{staticClass:"vdp-datepicker__clear-button",class:{'input-group-append' : _vm.bootstrapStyling},on:{"click":function($event){_vm.clearDate();}}},[_c('span',{class:{'input-group-text' : _vm.bootstrapStyling}},[_c('i',{class:_vm.clearButtonIcon},[(!_vm.clearButtonIcon)?_c('span',[_vm._v("×")]):_vm._e()])])]):_vm._e(),_vm._v(" "),_vm._t("afterDateInput")],2)},staticRenderFns: [],
    props: {
      selectedDate: Date,
      resetTypedDate: [Date],
      format: [String, Function],
      translation: Object,
      inline: Boolean,
      id: String,
      name: String,
      refName: String,
      openDate: Date,
      placeholder: String,
      inputClass: [String, Object, Array],
      clearButton: Boolean,
      clearButtonIcon: String,
      calendarButton: Boolean,
      calendarButtonIcon: String,
      calendarButtonIconContent: String,
      disabled: Boolean,
      required: Boolean,
      typeable: Boolean,
      bootstrapStyling: Boolean,
      useUtc: Boolean
    },
    data: function data () {
      var constructedDateUtils = makeDateUtils(this.useUtc);
      return {
        input: null,
        typedDate: false,
        utils: constructedDateUtils
      }
    },
    computed: {
      formattedValue: function formattedValue () {
        if (!this.selectedDate) {
          return null
        }
        if (this.typedDate) {
          return this.typedDate
        }
        return typeof this.format === 'function'
          ? this.format(this.selectedDate)
          : this.utils.formatDate(new Date(this.selectedDate), this.format, this.translation)
      },

      computedInputClass: function computedInputClass () {
        if (this.bootstrapStyling) {
          if (typeof this.inputClass === 'string') {
            return [this.inputClass, 'form-control'].join(' ')
          }
          return Object.assign({}, {'form-control': true}, this.inputClass)
        }
        return this.inputClass
      }
    },
    watch: {
      resetTypedDate: function resetTypedDate () {
        this.typedDate = false;
      }
    },
    methods: {
      showCalendar: function showCalendar () {
        this.$emit('showCalendar');
      },
      /**
       * Attempt to parse a typed date
       * @param {Event} event
       */
      parseTypedDate: function parseTypedDate (event) {
        // close calendar if escape or enter are pressed
        if ([
          27, // escape
          13 // enter
        ].includes(event.keyCode)) {
          this.input.blur();
        }

        if (this.typeable) {
          var typedDate = Date.parse(this.input.value);
          if (!isNaN(typedDate)) {
            this.typedDate = this.input.value;
            this.$emit('typedDate', new Date(this.typedDate));
          }
        }
      },
      /**
       * nullify the typed date to defer to regular formatting
       * called once the input is blurred
       */
      inputBlurred: function inputBlurred () {
        if (this.typeable && isNaN(Date.parse(this.input.value))) {
          this.clearDate();
          this.input.value = null;
          this.typedDate = null;
        }

        this.$emit('closeCalendar');
      },
      /**
       * emit a clearDate event
       */
      clearDate: function clearDate () {
        this.$emit('clearDate');
      }
    },
    mounted: function mounted () {
      this.input = this.$el.querySelector('input');
    }
  }
  // eslint-disable-next-line
  ;

  (function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
  var PickerDay = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showDayView),expression:"showDayView"}],class:[_vm.calendarClass, 'vdp-datepicker__calendar'],style:(_vm.calendarStyle),on:{"mousedown":function($event){$event.preventDefault();}}},[_vm._t("beforeCalendarHeader"),_vm._v(" "),_c('header',[_c('span',{staticClass:"prev",class:{'disabled': _vm.isLeftNavDisabled},on:{"click":function($event){_vm.isRtl ? _vm.nextMonth() : _vm.previousMonth();}}},[_vm._v("<")]),_vm._v(" "),_c('span',{staticClass:"day__month_btn",class:_vm.allowedToShowView('month') ? 'up' : '',on:{"click":_vm.showMonthCalendar}},[_vm._v(_vm._s(_vm.isYmd ? _vm.currYearName : _vm.currMonthName)+" "+_vm._s(_vm.isYmd ? _vm.currMonthName : _vm.currYearName))]),_vm._v(" "),_c('span',{staticClass:"next",class:{'disabled': _vm.isRightNavDisabled},on:{"click":function($event){_vm.isRtl ? _vm.previousMonth() : _vm.nextMonth();}}},[_vm._v(">")])]),_vm._v(" "),_c('div',{class:_vm.isRtl ? 'flex-rtl' : ''},[_vm._l((_vm.daysOfWeek),function(d){return _c('span',{key:d.timestamp,staticClass:"cell day-header"},[_vm._v(_vm._s(d))])}),_vm._v(" "),(_vm.blankDays > 0)?_vm._l((_vm.blankDays),function(d){return _c('span',{key:d.timestamp,staticClass:"cell day blank"})}):_vm._e(),_vm._l((_vm.days),function(day){return _c('span',{key:day.timestamp,staticClass:"cell day",class:_vm.dayClasses(day),domProps:{"innerHTML":_vm._s(_vm.dayCellContent(day))},on:{"click":function($event){_vm.selectDate(day);}}})})],2)],2)},staticRenderFns: [],
    props: {
      showDayView: Boolean,
      selectedDate: Date,
      pageDate: Date,
      pageTimestamp: Number,
      fullMonthName: Boolean,
      allowedToShowView: Function,
      dayCellContent: {
        type: Function,
        default: function (day) { return day.date; }
      },
      disabledDates: Object,
      highlighted: Object,
      calendarClass: [String, Object, Array],
      calendarStyle: Object,
      translation: Object,
      isRtl: Boolean,
      mondayFirst: Boolean,
      useUtc: Boolean
    },
    data: function data () {
      var constructedDateUtils = makeDateUtils(this.useUtc);
      return {
        utils: constructedDateUtils
      }
    },
    computed: {
      /**
       * Returns an array of day names
       * @return {String[]}
       */
      daysOfWeek: function daysOfWeek () {
        if (this.mondayFirst) {
          var tempDays = this.translation.days.slice();
          tempDays.push(tempDays.shift());
          return tempDays
        }
        return this.translation.days
      },
      /**
       * Returns the day number of the week less one for the first of the current month
       * Used to show amount of empty cells before the first in the day calendar layout
       * @return {Number}
       */
      blankDays: function blankDays () {
        var d = this.pageDate;
        var dObj = this.useUtc
          ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1))
          : new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
        if (this.mondayFirst) {
          return this.utils.getDay(dObj) > 0 ? this.utils.getDay(dObj) - 1 : 6
        }
        return this.utils.getDay(dObj)
      },
      /**
       * @return {Object[]}
       */
      days: function days () {
        var this$1 = this;

        var d = this.pageDate;
        var days = [];
        // set up a new date object to the beginning of the current 'page'
        var dObj = this.useUtc
          ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1))
          : new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
        var daysInMonth = this.utils.daysInMonth(this.utils.getFullYear(dObj), this.utils.getMonth(dObj));
        for (var i = 0; i < daysInMonth; i++) {
          days.push({
            date: this$1.utils.getDate(dObj),
            timestamp: dObj.getTime(),
            isSelected: this$1.isSelectedDate(dObj),
            isDisabled: this$1.isDisabledDate(dObj),
            isHighlighted: this$1.isHighlightedDate(dObj),
            isHighlightStart: this$1.isHighlightStart(dObj),
            isHighlightEnd: this$1.isHighlightEnd(dObj),
            isToday: this$1.utils.compareDates(dObj, new Date()),
            isWeekend: this$1.utils.getDay(dObj) === 0 || this$1.utils.getDay(dObj) === 6,
            isSaturday: this$1.utils.getDay(dObj) === 6,
            isSunday: this$1.utils.getDay(dObj) === 0
          });
          this$1.utils.setDate(dObj, this$1.utils.getDate(dObj) + 1);
        }
        return days
      },
      /**
       * Gets the name of the month the current page is on
       * @return {String}
       */
      currMonthName: function currMonthName () {
        var monthName = this.fullMonthName ? this.translation.months : this.translation.monthsAbbr;
        return this.utils.getMonthNameAbbr(this.utils.getMonth(this.pageDate), monthName)
      },
      /**
       * Gets the name of the year that current page is on
       * @return {Number}
       */
      currYearName: function currYearName () {
        var yearSuffix = this.translation.yearSuffix;
        return ("" + (this.utils.getFullYear(this.pageDate)) + yearSuffix)
      },
      /**
       * Is this translation using year/month/day format?
       * @return {Boolean}
       */
      isYmd: function isYmd () {
        return this.translation.ymd && this.translation.ymd === true
      },
      /**
       * Is the left hand navigation button disabled?
       * @return {Boolean}
       */
      isLeftNavDisabled: function isLeftNavDisabled () {
        return this.isRtl
          ? this.isNextMonthDisabled(this.pageTimestamp)
          : this.isPreviousMonthDisabled(this.pageTimestamp)
      },
      /**
       * Is the right hand navigation button disabled?
       * @return {Boolean}
       */
      isRightNavDisabled: function isRightNavDisabled () {
        return this.isRtl
          ? this.isPreviousMonthDisabled(this.pageTimestamp)
          : this.isNextMonthDisabled(this.pageTimestamp)
      }
    },
    methods: {
      selectDate: function selectDate (date) {
        if (date.isDisabled) {
          this.$emit('selectedDisabled', date);
          return false
        }
        this.$emit('selectDate', date);
      },
      /**
       * @return {Number}
       */
      getPageMonth: function getPageMonth () {
        return this.utils.getMonth(this.pageDate)
      },
      /**
       * Emit an event to show the month picker
       */
      showMonthCalendar: function showMonthCalendar () {
        this.$emit('showMonthCalendar');
      },
      /**
       * Change the page month
       * @param {Number} incrementBy
       */
      changeMonth: function changeMonth (incrementBy) {
        var date = this.pageDate;
        this.utils.setMonth(date, this.utils.getMonth(date) + incrementBy);
        this.$emit('changedMonth', date);
      },
      /**
       * Decrement the page month
       */
      previousMonth: function previousMonth () {
        if (!this.isPreviousMonthDisabled()) {
          this.changeMonth(-1);
        }
      },
      /**
       * Is the previous month disabled?
       * @return {Boolean}
       */
      isPreviousMonthDisabled: function isPreviousMonthDisabled () {
        if (!this.disabledDates || !this.disabledDates.to) {
          return false
        }
        var d = this.pageDate;
        return this.utils.getMonth(this.disabledDates.to) >= this.utils.getMonth(d) &&
          this.utils.getFullYear(this.disabledDates.to) >= this.utils.getFullYear(d)
      },
      /**
       * Increment the current page month
       */
      nextMonth: function nextMonth () {
        if (!this.isNextMonthDisabled()) {
          this.changeMonth(+1);
        }
      },
      /**
       * Is the next month disabled?
       * @return {Boolean}
       */
      isNextMonthDisabled: function isNextMonthDisabled () {
        if (!this.disabledDates || !this.disabledDates.from) {
          return false
        }
        var d = this.pageDate;
        return this.utils.getMonth(this.disabledDates.from) <= this.utils.getMonth(d) &&
          this.utils.getFullYear(this.disabledDates.from) <= this.utils.getFullYear(d)
      },
      /**
       * Whether a day is selected
       * @param {Date}
       * @return {Boolean}
       */
      isSelectedDate: function isSelectedDate (dObj) {
        return this.selectedDate && this.utils.compareDates(this.selectedDate, dObj)
      },
      /**
       * Whether a day is disabled
       * @param {Date}
       * @return {Boolean}
       */
      isDisabledDate: function isDisabledDate (date) {
        var this$1 = this;

        var disabledDates = false;

        if (typeof this.disabledDates === 'undefined') {
          return false
        }

        if (typeof this.disabledDates.dates !== 'undefined') {
          this.disabledDates.dates.forEach(function (d) {
            if (this$1.utils.compareDates(date, d)) {
              disabledDates = true;
              return true
            }
          });
        }
        if (typeof this.disabledDates.to !== 'undefined' && this.disabledDates.to && date < this.disabledDates.to) {
          disabledDates = true;
        }
        if (typeof this.disabledDates.from !== 'undefined' && this.disabledDates.from && date > this.disabledDates.from) {
          disabledDates = true;
        }
        if (typeof this.disabledDates.ranges !== 'undefined') {
          this.disabledDates.ranges.forEach(function (range) {
            if (typeof range.from !== 'undefined' && range.from && typeof range.to !== 'undefined' && range.to) {
              if (date < range.to && date > range.from) {
                disabledDates = true;
                return true
              }
            }
          });
        }
        if (typeof this.disabledDates.days !== 'undefined' && this.disabledDates.days.indexOf(this.utils.getDay(date)) !== -1) {
          disabledDates = true;
        }
        if (typeof this.disabledDates.daysOfMonth !== 'undefined' && this.disabledDates.daysOfMonth.indexOf(this.utils.getDate(date)) !== -1) {
          disabledDates = true;
        }
        if (typeof this.disabledDates.customPredictor === 'function' && this.disabledDates.customPredictor(date)) {
          disabledDates = true;
        }
        return disabledDates
      },
      /**
       * Whether a day is highlighted (only if it is not disabled already except when highlighted.includeDisabled is true)
       * @param {Date}
       * @return {Boolean}
       */
      isHighlightedDate: function isHighlightedDate (date) {
        var this$1 = this;

        if (!(this.highlighted && this.highlighted.includeDisabled) && this.isDisabledDate(date)) {
          return false
        }

        var highlighted = false;

        if (typeof this.highlighted === 'undefined') {
          return false
        }

        if (typeof this.highlighted.dates !== 'undefined') {
          this.highlighted.dates.forEach(function (d) {
            if (this$1.utils.compareDates(date, d)) {
              highlighted = true;
              return true
            }
          });
        }

        if (this.isDefined(this.highlighted.from) && this.isDefined(this.highlighted.to)) {
          highlighted = date >= this.highlighted.from && date <= this.highlighted.to;
        }

        if (typeof this.highlighted.days !== 'undefined' && this.highlighted.days.indexOf(this.utils.getDay(date)) !== -1) {
          highlighted = true;
        }

        if (typeof this.highlighted.daysOfMonth !== 'undefined' && this.highlighted.daysOfMonth.indexOf(this.utils.getDate(date)) !== -1) {
          highlighted = true;
        }

        if (typeof this.highlighted.customPredictor === 'function' && this.highlighted.customPredictor(date)) {
          highlighted = true;
        }

        return highlighted
      },
      dayClasses: function dayClasses (day) {
        return {
          'selected': day.isSelected,
          'disabled': day.isDisabled,
          'highlighted': day.isHighlighted,
          'today': day.isToday,
          'weekend': day.isWeekend,
          'sat': day.isSaturday,
          'sun': day.isSunday,
          'highlight-start': day.isHighlightStart,
          'highlight-end': day.isHighlightEnd
        }
      },
      /**
       * Whether a day is highlighted and it is the first date
       * in the highlighted range of dates
       * @param {Date}
       * @return {Boolean}
       */
      isHighlightStart: function isHighlightStart (date) {
        return this.isHighlightedDate(date) &&
          (this.highlighted.from instanceof Date) &&
          (this.utils.getFullYear(this.highlighted.from) === this.utils.getFullYear(date)) &&
          (this.utils.getMonth(this.highlighted.from) === this.utils.getMonth(date)) &&
          (this.utils.getDate(this.highlighted.from) === this.utils.getDate(date))
      },
      /**
       * Whether a day is highlighted and it is the first date
       * in the highlighted range of dates
       * @param {Date}
       * @return {Boolean}
       */
      isHighlightEnd: function isHighlightEnd (date) {
        return this.isHighlightedDate(date) &&
          (this.highlighted.to instanceof Date) &&
          (this.utils.getFullYear(this.highlighted.to) === this.utils.getFullYear(date)) &&
          (this.utils.getMonth(this.highlighted.to) === this.utils.getMonth(date)) &&
          (this.utils.getDate(this.highlighted.to) === this.utils.getDate(date))
      },
      /**
       * Helper
       * @param  {mixed}  prop
       * @return {Boolean}
       */
      isDefined: function isDefined (prop) {
        return typeof prop !== 'undefined' && prop
      }
    }
  }
  // eslint-disable-next-line
  ;

  (function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
  var PickerMonth = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showMonthView),expression:"showMonthView"}],class:[_vm.calendarClass, 'vdp-datepicker__calendar'],style:(_vm.calendarStyle),on:{"mousedown":function($event){$event.preventDefault();}}},[_vm._t("beforeCalendarHeader"),_vm._v(" "),_c('header',[_c('span',{staticClass:"prev",class:{'disabled': _vm.isLeftNavDisabled},on:{"click":function($event){_vm.isRtl ? _vm.nextYear() : _vm.previousYear();}}},[_vm._v("<")]),_vm._v(" "),_c('span',{staticClass:"month__year_btn",class:_vm.allowedToShowView('year') ? 'up' : '',on:{"click":_vm.showYearCalendar}},[_vm._v(_vm._s(_vm.pageYearName))]),_vm._v(" "),_c('span',{staticClass:"next",class:{'disabled': _vm.isRightNavDisabled},on:{"click":function($event){_vm.isRtl ? _vm.previousYear() : _vm.nextYear();}}},[_vm._v(">")])]),_vm._v(" "),_vm._l((_vm.months),function(month){return _c('span',{key:month.timestamp,staticClass:"cell month",class:{'selected': month.isSelected, 'disabled': month.isDisabled},on:{"click":function($event){$event.stopPropagation();_vm.selectMonth(month);}}},[_vm._v(_vm._s(month.month))])})],2)},staticRenderFns: [],
    props: {
      showMonthView: Boolean,
      selectedDate: Date,
      pageDate: Date,
      pageTimestamp: Number,
      disabledDates: Object,
      calendarClass: [String, Object, Array],
      calendarStyle: Object,
      translation: Object,
      isRtl: Boolean,
      allowedToShowView: Function,
      useUtc: Boolean
    },
    data: function data () {
      var constructedDateUtils = makeDateUtils(this.useUtc);
      return {
        utils: constructedDateUtils
      }
    },
    computed: {
      months: function months () {
        var this$1 = this;

        var d = this.pageDate;
        var months = [];
        // set up a new date object to the beginning of the current 'page'
        var dObj = this.useUtc
          ? new Date(Date.UTC(d.getUTCFullYear(), 0, d.getUTCDate()))
          : new Date(d.getFullYear(), 0, d.getDate(), d.getHours(), d.getMinutes());
        for (var i = 0; i < 12; i++) {
          months.push({
            month: this$1.utils.getMonthName(i, this$1.translation.months),
            timestamp: dObj.getTime(),
            isSelected: this$1.isSelectedMonth(dObj),
            isDisabled: this$1.isDisabledMonth(dObj)
          });
          this$1.utils.setMonth(dObj, this$1.utils.getMonth(dObj) + 1);
        }
        return months
      },
      /**
       * Get year name on current page.
       * @return {String}
       */
      pageYearName: function pageYearName () {
        var yearSuffix = this.translation.yearSuffix;
        return ("" + (this.utils.getFullYear(this.pageDate)) + yearSuffix)
      },
      /**
       * Is the left hand navigation disabled
       * @return {Boolean}
       */
      isLeftNavDisabled: function isLeftNavDisabled () {
        return this.isRtl
          ? this.isNextYearDisabled(this.pageTimestamp)
          : this.isPreviousYearDisabled(this.pageTimestamp)
      },
      /**
       * Is the right hand navigation disabled
       * @return {Boolean}
       */
      isRightNavDisabled: function isRightNavDisabled () {
        return this.isRtl
          ? this.isPreviousYearDisabled(this.pageTimestamp)
          : this.isNextYearDisabled(this.pageTimestamp)
      }
    },
    methods: {
      /**
       * Emits a selectMonth event
       * @param {Object} month
       */
      selectMonth: function selectMonth (month) {
        if (month.isDisabled) {
          return false
        }
        this.$emit('selectMonth', month);
      },
      /**
       * Changes the year up or down
       * @param {Number} incrementBy
       */
      changeYear: function changeYear (incrementBy) {
        var date = this.pageDate;
        this.utils.setFullYear(date, this.utils.getFullYear(date) + incrementBy);
        this.$emit('changedYear', date);
      },
      /**
       * Decrements the year
       */
      previousYear: function previousYear () {
        if (!this.isPreviousYearDisabled()) {
          this.changeYear(-1);
        }
      },
      /**
       * Checks if the previous year is disabled or not
       * @return {Boolean}
       */
      isPreviousYearDisabled: function isPreviousYearDisabled () {
        if (!this.disabledDates || !this.disabledDates.to) {
          return false
        }
        return this.utils.getFullYear(this.disabledDates.to) >= this.utils.getFullYear(this.pageDate)
      },
      /**
       * Increments the year
       */
      nextYear: function nextYear () {
        if (!this.isNextYearDisabled()) {
          this.changeYear(1);
        }
      },
      /**
       * Checks if the next year is disabled or not
       * @return {Boolean}
       */
      isNextYearDisabled: function isNextYearDisabled () {
        if (!this.disabledDates || !this.disabledDates.from) {
          return false
        }
        return this.utils.getFullYear(this.disabledDates.from) <= this.utils.getFullYear(this.pageDate)
      },
      /**
       * Emits an event that shows the year calendar
       */
      showYearCalendar: function showYearCalendar () {
        this.$emit('showYearCalendar');
      },
      /**
       * Whether the selected date is in this month
       * @param {Date}
       * @return {Boolean}
       */
      isSelectedMonth: function isSelectedMonth (date) {
        return (this.selectedDate &&
          this.utils.getFullYear(this.selectedDate) === this.utils.getFullYear(date) &&
          this.utils.getMonth(this.selectedDate) === this.utils.getMonth(date))
      },
      /**
       * Whether a month is disabled
       * @param {Date}
       * @return {Boolean}
       */
      isDisabledMonth: function isDisabledMonth (date) {
        var disabledDates = false;

        if (typeof this.disabledDates === 'undefined') {
          return false
        }

        if (typeof this.disabledDates.to !== 'undefined' && this.disabledDates.to) {
          if (
            (this.utils.getMonth(date) < this.utils.getMonth(this.disabledDates.to) && this.utils.getFullYear(date) <= this.utils.getFullYear(this.disabledDates.to)) ||
            this.utils.getFullYear(date) < this.utils.getFullYear(this.disabledDates.to)
          ) {
            disabledDates = true;
          }
        }
        if (typeof this.disabledDates.from !== 'undefined' && this.disabledDates.from) {
          if (
            (this.utils.getMonth(date) > this.utils.getMonth(this.disabledDates.from) && this.utils.getFullYear(date) >= this.utils.getFullYear(this.disabledDates.from)) ||
            this.utils.getFullYear(date) > this.utils.getFullYear(this.disabledDates.from)
          ) {
            disabledDates = true;
          }
        }

        if (typeof this.disabledDates.customPredictor === 'function' && this.disabledDates.customPredictor(date)) {
          disabledDates = true;
        }
        return disabledDates
      }
    }
  }
  // eslint-disable-next-line
  ;

  (function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
  var PickerYear = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showYearView),expression:"showYearView"}],class:[_vm.calendarClass, 'vdp-datepicker__calendar'],style:(_vm.calendarStyle),on:{"mousedown":function($event){$event.preventDefault();}}},[_vm._t("beforeCalendarHeader"),_vm._v(" "),_c('header',[_c('span',{staticClass:"prev",class:{'disabled': _vm.isLeftNavDisabled},on:{"click":function($event){_vm.isRtl ? _vm.nextDecade() : _vm.previousDecade();}}},[_vm._v("<")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.getPageDecade))]),_vm._v(" "),_c('span',{staticClass:"next",class:{'disabled': _vm.isRightNavDisabled},on:{"click":function($event){_vm.isRtl ? _vm.previousDecade() : _vm.nextDecade();}}},[_vm._v(">")])]),_vm._v(" "),_vm._l((_vm.years),function(year){return _c('span',{key:year.timestamp,staticClass:"cell year",class:{ 'selected': year.isSelected, 'disabled': year.isDisabled },on:{"click":function($event){$event.stopPropagation();_vm.selectYear(year);}}},[_vm._v(_vm._s(year.year))])})],2)},staticRenderFns: [],
    props: {
      showYearView: Boolean,
      selectedDate: Date,
      pageDate: Date,
      pageTimestamp: Number,
      disabledDates: Object,
      highlighted: Object,
      calendarClass: [String, Object, Array],
      calendarStyle: Object,
      translation: Object,
      isRtl: Boolean,
      allowedToShowView: Function,
      useUtc: Boolean
    },
    computed: {
      years: function years () {
        var this$1 = this;

        var d = this.pageDate;
        var years = [];
        // set up a new date object to the beginning of the current 'page'7
        var dObj = this.useUtc
          ? new Date(Date.UTC(Math.floor(d.getUTCFullYear() / 10) * 10, d.getUTCMonth(), d.getUTCDate()))
          : new Date(Math.floor(d.getFullYear() / 10) * 10, d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());
        for (var i = 0; i < 10; i++) {
          years.push({
            year: this$1.utils.getFullYear(dObj),
            timestamp: dObj.getTime(),
            isSelected: this$1.isSelectedYear(dObj),
            isDisabled: this$1.isDisabledYear(dObj)
          });
          this$1.utils.setFullYear(dObj, this$1.utils.getFullYear(dObj) + 1);
        }
        return years
      },
      /**
       * @return {String}
       */
      getPageDecade: function getPageDecade () {
        var decadeStart = Math.floor(this.utils.getFullYear(this.pageDate) / 10) * 10;
        var decadeEnd = decadeStart + 9;
        var yearSuffix = this.translation.yearSuffix;
        return (decadeStart + " - " + decadeEnd + yearSuffix)
      },
      /**
       * Is the left hand navigation button disabled?
       * @return {Boolean}
       */
      isLeftNavDisabled: function isLeftNavDisabled () {
        return this.isRtl
          ? this.isNextDecadeDisabled(this.pageTimestamp)
          : this.isPreviousDecadeDisabled(this.pageTimestamp)
      },
      /**
       * Is the right hand navigation button disabled?
       * @return {Boolean}
       */
      isRightNavDisabled: function isRightNavDisabled () {
        return this.isRtl
          ? this.isPreviousDecadeDisabled(this.pageTimestamp)
          : this.isNextDecadeDisabled(this.pageTimestamp)
      }
    },
    data: function data () {
      var constructedDateUtils = makeDateUtils(this.useUtc);
      return {
        utils: constructedDateUtils
      }
    },
    methods: {
      selectYear: function selectYear (year) {
        if (year.isDisabled) {
          return false
        }
        this.$emit('selectYear', year);
      },
      changeYear: function changeYear (incrementBy) {
        var date = this.pageDate;
        this.utils.setFullYear(date, this.utils.getFullYear(date) + incrementBy);
        this.$emit('changedDecade', date);
      },
      previousDecade: function previousDecade () {
        if (this.isPreviousDecadeDisabled()) {
          return false
        }
        this.changeYear(-10);
      },
      isPreviousDecadeDisabled: function isPreviousDecadeDisabled () {
        if (!this.disabledDates || !this.disabledDates.to) {
          return false
        }
        var disabledYear = this.utils.getFullYear(this.disabledDates.to);
        var lastYearInPreviousPage = Math.floor(this.utils.getFullYear(this.pageDate) / 10) * 10 - 1;
        return disabledYear > lastYearInPreviousPage
      },
      nextDecade: function nextDecade () {
        if (this.isNextDecadeDisabled()) {
          return false
        }
        this.changeYear(10);
      },
      isNextDecadeDisabled: function isNextDecadeDisabled () {
        if (!this.disabledDates || !this.disabledDates.from) {
          return false
        }
        var disabledYear = this.utils.getFullYear(this.disabledDates.from);
        var firstYearInNextPage = Math.ceil(this.utils.getFullYear(this.pageDate) / 10) * 10;
        return disabledYear < firstYearInNextPage
      },

      /**
       * Whether the selected date is in this year
       * @param {Date}
       * @return {Boolean}
       */
      isSelectedYear: function isSelectedYear (date) {
        return this.selectedDate && this.utils.getFullYear(this.selectedDate) === this.utils.getFullYear(date)
      },
      /**
       * Whether a year is disabled
       * @param {Date}
       * @return {Boolean}
       */
      isDisabledYear: function isDisabledYear (date) {
        var disabledDates = false;
        if (typeof this.disabledDates === 'undefined' || !this.disabledDates) {
          return false
        }

        if (typeof this.disabledDates.to !== 'undefined' && this.disabledDates.to) {
          if (this.utils.getFullYear(date) < this.utils.getFullYear(this.disabledDates.to)) {
            disabledDates = true;
          }
        }
        if (typeof this.disabledDates.from !== 'undefined' && this.disabledDates.from) {
          if (this.utils.getFullYear(date) > this.utils.getFullYear(this.disabledDates.from)) {
            disabledDates = true;
          }
        }

        if (typeof this.disabledDates.customPredictor === 'function' && this.disabledDates.customPredictor(date)) {
          disabledDates = true;
        }

        return disabledDates
      }
    }
  }
  // eslint-disable-next-line
  ;

  (function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=".rtl { direction: rtl; } .vdp-datepicker { position: relative; text-align: left; } .vdp-datepicker * { box-sizing: border-box; } .vdp-datepicker__calendar { position: absolute; z-index: 100; background: #fff; width: 300px; border: 1px solid #ccc; } .vdp-datepicker__calendar header { display: block; line-height: 40px; } .vdp-datepicker__calendar header span { display: inline-block; text-align: center; width: 71.42857142857143%; float: left; } .vdp-datepicker__calendar header .prev, .vdp-datepicker__calendar header .next { width: 14.285714285714286%; float: left; text-indent: -10000px; position: relative; } .vdp-datepicker__calendar header .prev:after, .vdp-datepicker__calendar header .next:after { content: ''; position: absolute; left: 50%; top: 50%; -webkit-transform: translateX(-50%) translateY(-50%); transform: translateX(-50%) translateY(-50%); border: 6px solid transparent; } .vdp-datepicker__calendar header .prev:after { border-right: 10px solid #000; margin-left: -5px; } .vdp-datepicker__calendar header .prev.disabled:after { border-right: 10px solid #ddd; } .vdp-datepicker__calendar header .next:after { border-left: 10px solid #000; margin-left: 5px; } .vdp-datepicker__calendar header .next.disabled:after { border-left: 10px solid #ddd; } .vdp-datepicker__calendar header .prev:not(.disabled), .vdp-datepicker__calendar header .next:not(.disabled), .vdp-datepicker__calendar header .up:not(.disabled) { cursor: pointer; } .vdp-datepicker__calendar header .prev:not(.disabled):hover, .vdp-datepicker__calendar header .next:not(.disabled):hover, .vdp-datepicker__calendar header .up:not(.disabled):hover { background: #eee; } .vdp-datepicker__calendar .disabled { color: #ddd; cursor: default; } .vdp-datepicker__calendar .flex-rtl { display: flex; width: inherit; flex-wrap: wrap; } .vdp-datepicker__calendar .cell { display: inline-block; padding: 0 5px; width: 14.285714285714286%; height: 40px; line-height: 40px; text-align: center; vertical-align: middle; border: 1px solid transparent; } .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year { cursor: pointer; } .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover { border: 1px solid #4bd; } .vdp-datepicker__calendar .cell.selected { background: #4bd; } .vdp-datepicker__calendar .cell.selected:hover { background: #4bd; } .vdp-datepicker__calendar .cell.selected.highlighted { background: #4bd; } .vdp-datepicker__calendar .cell.highlighted { background: #cae5ed; } .vdp-datepicker__calendar .cell.highlighted.disabled { color: #a3a3a3; } .vdp-datepicker__calendar .cell.grey { color: #888; } .vdp-datepicker__calendar .cell.grey:hover { background: inherit; } .vdp-datepicker__calendar .cell.day-header { font-size: 75%; white-space: nowrap; cursor: inherit; } .vdp-datepicker__calendar .cell.day-header:hover { background: inherit; } .vdp-datepicker__calendar .month, .vdp-datepicker__calendar .year { width: 33.333%; } .vdp-datepicker__clear-button, .vdp-datepicker__calendar-button { cursor: pointer; font-style: normal; } .vdp-datepicker__clear-button.disabled, .vdp-datepicker__calendar-button.disabled { color: #999; cursor: default; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
  var Datepicker = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vdp-datepicker",class:[_vm.wrapperClass, _vm.isRtl ? 'rtl' : '']},[_c('date-input',{attrs:{"selectedDate":_vm.selectedDate,"resetTypedDate":_vm.resetTypedDate,"format":_vm.format,"translation":_vm.translation,"inline":_vm.inline,"id":_vm.id,"name":_vm.name,"refName":_vm.refName,"openDate":_vm.openDate,"placeholder":_vm.placeholder,"inputClass":_vm.inputClass,"typeable":_vm.typeable,"clearButton":_vm.clearButton,"clearButtonIcon":_vm.clearButtonIcon,"calendarButton":_vm.calendarButton,"calendarButtonIcon":_vm.calendarButtonIcon,"calendarButtonIconContent":_vm.calendarButtonIconContent,"disabled":_vm.disabled,"required":_vm.required,"bootstrapStyling":_vm.bootstrapStyling,"use-utc":_vm.useUtc},on:{"showCalendar":_vm.showCalendar,"closeCalendar":_vm.close,"typedDate":_vm.setTypedDate,"clearDate":_vm.clearDate}},[_vm._t("afterDateInput",null,{slot:"afterDateInput"})],2),_vm._v(" "),(_vm.allowedToShowView('day'))?_c('picker-day',{attrs:{"pageDate":_vm.pageDate,"selectedDate":_vm.selectedDate,"showDayView":_vm.showDayView,"fullMonthName":_vm.fullMonthName,"allowedToShowView":_vm.allowedToShowView,"disabledDates":_vm.disabledDates,"highlighted":_vm.highlighted,"calendarClass":_vm.calendarClass,"calendarStyle":_vm.calendarStyle,"translation":_vm.translation,"pageTimestamp":_vm.pageTimestamp,"isRtl":_vm.isRtl,"mondayFirst":_vm.mondayFirst,"dayCellContent":_vm.dayCellContent,"use-utc":_vm.useUtc},on:{"changedMonth":_vm.handleChangedMonthFromDayPicker,"selectDate":_vm.selectDate,"showMonthCalendar":_vm.showMonthCalendar,"selectedDisabled":_vm.selectDisabledDate}},[_vm._t("beforeCalendarHeader",null,{slot:"beforeCalendarHeader"})],2):_vm._e(),_vm._v(" "),(_vm.allowedToShowView('month'))?_c('picker-month',{attrs:{"pageDate":_vm.pageDate,"selectedDate":_vm.selectedDate,"showMonthView":_vm.showMonthView,"allowedToShowView":_vm.allowedToShowView,"disabledDates":_vm.disabledDates,"calendarClass":_vm.calendarClass,"calendarStyle":_vm.calendarStyle,"translation":_vm.translation,"isRtl":_vm.isRtl,"use-utc":_vm.useUtc},on:{"selectMonth":_vm.selectMonth,"showYearCalendar":_vm.showYearCalendar,"changedYear":_vm.setPageDate}},[_vm._t("beforeCalendarHeader",null,{slot:"beforeCalendarHeader"})],2):_vm._e(),_vm._v(" "),(_vm.allowedToShowView('year'))?_c('picker-year',{attrs:{"pageDate":_vm.pageDate,"selectedDate":_vm.selectedDate,"showYearView":_vm.showYearView,"allowedToShowView":_vm.allowedToShowView,"disabledDates":_vm.disabledDates,"calendarClass":_vm.calendarClass,"calendarStyle":_vm.calendarStyle,"translation":_vm.translation,"isRtl":_vm.isRtl,"use-utc":_vm.useUtc},on:{"selectYear":_vm.selectYear,"changedDecade":_vm.setPageDate}},[_vm._t("beforeCalendarHeader",null,{slot:"beforeCalendarHeader"})],2):_vm._e()],1)},staticRenderFns: [],
    components: {
      DateInput: DateInput,
      PickerDay: PickerDay,
      PickerMonth: PickerMonth,
      PickerYear: PickerYear
    },
    props: {
      value: {
        validator: function (val) { return utils$1.validateDateInput(val); }
      },
      name: String,
      refName: String,
      id: String,
      format: {
        type: [String, Function],
        default: 'dd MMM yyyy'
      },
      language: {
        type: Object,
        default: function () { return en; }
      },
      openDate: {
        validator: function (val) { return utils$1.validateDateInput(val); }
      },
      dayCellContent: Function,
      fullMonthName: Boolean,
      disabledDates: Object,
      highlighted: Object,
      placeholder: String,
      inline: Boolean,
      calendarClass: [String, Object, Array],
      inputClass: [String, Object, Array],
      wrapperClass: [String, Object, Array],
      mondayFirst: Boolean,
      clearButton: Boolean,
      clearButtonIcon: String,
      calendarButton: Boolean,
      calendarButtonIcon: String,
      calendarButtonIconContent: String,
      bootstrapStyling: Boolean,
      initialView: String,
      disabled: Boolean,
      required: Boolean,
      typeable: Boolean,
      useUtc: Boolean,
      minimumView: {
        type: String,
        default: 'day'
      },
      maximumView: {
        type: String,
        default: 'year'
      }
    },
    data: function data () {
      var startDate = this.openDate ? new Date(this.openDate) : new Date();
      var constructedDateUtils = makeDateUtils(this.useUtc);
      var pageTimestamp = constructedDateUtils.setDate(startDate, 1);
      return {
        /*
         * Vue cannot observe changes to a Date Object so date must be stored as a timestamp
         * This represents the first day of the current viewing month
         * {Number}
         */
        pageTimestamp: pageTimestamp,
        /*
         * Selected Date
         * {Date}
         */
        selectedDate: null,
        /*
         * Flags to show calendar views
         * {Boolean}
         */
        showDayView: false,
        showMonthView: false,
        showYearView: false,
        /*
         * Positioning
         */
        calendarHeight: 0,
        resetTypedDate: new Date(),
        utils: constructedDateUtils
      }
    },
    watch: {
      value: function value (value$1) {
        this.setValue(value$1);
      },
      openDate: function openDate () {
        this.setPageDate();
      },
      initialView: function initialView () {
        this.setInitialView();
      }
    },
    computed: {
      computedInitialView: function computedInitialView () {
        if (!this.initialView) {
          return this.minimumView
        }

        return this.initialView
      },
      pageDate: function pageDate () {
        return new Date(this.pageTimestamp)
      },

      translation: function translation () {
        return this.language
      },

      calendarStyle: function calendarStyle () {
        return {
          position: this.isInline ? 'static' : undefined
        }
      },
      isOpen: function isOpen () {
        return this.showDayView || this.showMonthView || this.showYearView
      },
      isInline: function isInline () {
        return !!this.inline
      },
      isRtl: function isRtl () {
        return this.translation.rtl === true
      }
    },
    methods: {
      /**
       * Called in the event that the user navigates to date pages and
       * closes the picker without selecting a date.
       */
      resetDefaultPageDate: function resetDefaultPageDate () {
        if (this.selectedDate === null) {
          this.setPageDate();
          return
        }
        this.setPageDate(this.selectedDate);
      },
      /**
       * Effectively a toggle to show/hide the calendar
       * @return {mixed}
       */
      showCalendar: function showCalendar () {
        if (this.disabled || this.isInline) {
          return false
        }
        if (this.isOpen) {
          return this.close(true)
        }
        this.setInitialView();
      },
      /**
       * Sets the initial picker page view: day, month or year
       */
      setInitialView: function setInitialView () {
        var initialView = this.computedInitialView;
        if (!this.allowedToShowView(initialView)) {
          throw new Error(("initialView '" + (this.initialView) + "' cannot be rendered based on minimum '" + (this.minimumView) + "' and maximum '" + (this.maximumView) + "'"))
        }
        switch (initialView) {
          case 'year':
            this.showYearCalendar();
            break
          case 'month':
            this.showMonthCalendar();
            break
          default:
            this.showDayCalendar();
            break
        }
      },
      /**
       * Are we allowed to show a specific picker view?
       * @param {String} view
       * @return {Boolean}
       */
      allowedToShowView: function allowedToShowView (view) {
        var views = ['day', 'month', 'year'];
        var minimumViewIndex = views.indexOf(this.minimumView);
        var maximumViewIndex = views.indexOf(this.maximumView);
        var viewIndex = views.indexOf(view);

        return viewIndex >= minimumViewIndex && viewIndex <= maximumViewIndex
      },
      /**
       * Show the day picker
       * @return {Boolean}
       */
      showDayCalendar: function showDayCalendar () {
        if (!this.allowedToShowView('day')) {
          return false
        }
        this.close();
        this.showDayView = true;
        return true
      },
      /**
       * Show the month picker
       * @return {Boolean}
       */
      showMonthCalendar: function showMonthCalendar () {
        if (!this.allowedToShowView('month')) {
          return false
        }
        this.close();
        this.showMonthView = true;
        return true
      },
      /**
       * Show the year picker
       * @return {Boolean}
       */
      showYearCalendar: function showYearCalendar () {
        if (!this.allowedToShowView('year')) {
          return false
        }
        this.close();
        this.showYearView = true;
        return true
      },
      /**
       * Set the selected date
       * @param {Number} timestamp
       */
      setDate: function setDate (timestamp) {
        var date = new Date(timestamp);
        this.selectedDate = date;
        this.setPageDate(date);
        this.$emit('selected', date);
        this.$emit('input', date);
      },
      /**
       * Clear the selected date
       */
      clearDate: function clearDate () {
        this.selectedDate = null;
        this.setPageDate();
        this.$emit('selected', null);
        this.$emit('input', null);
        this.$emit('cleared');
      },
      /**
       * @param {Object} date
       */
      selectDate: function selectDate (date) {
        this.setDate(date.timestamp);
        if (!this.isInline) {
          this.close(true);
        }
        this.resetTypedDate = new Date();
      },
      /**
       * @param {Object} date
       */
      selectDisabledDate: function selectDisabledDate (date) {
        this.$emit('selectedDisabled', date);
      },
      /**
       * @param {Object} month
       */
      selectMonth: function selectMonth (month) {
        var date = new Date(month.timestamp);
        if (this.allowedToShowView('day')) {
          this.setPageDate(date);
          this.$emit('changedMonth', month);
          this.showDayCalendar();
        } else {
          this.selectDate(month);
        }
      },
      /**
       * @param {Object} year
       */
      selectYear: function selectYear (year) {
        var date = new Date(year.timestamp);
        if (this.allowedToShowView('month')) {
          this.setPageDate(date);
          this.$emit('changedYear', year);
          this.showMonthCalendar();
        } else {
          this.selectDate(year);
        }
      },
      /**
       * Set the datepicker value
       * @param {Date|String|Number|null} date
       */
      setValue: function setValue (date) {
        if (typeof date === 'string' || typeof date === 'number') {
          var parsed = new Date(date);
          date = isNaN(parsed.valueOf()) ? null : parsed;
        }
        if (!date) {
          this.setPageDate();
          this.selectedDate = null;
          return
        }
        this.selectedDate = date;
        this.setPageDate(date);
      },
      /**
       * Sets the date that the calendar should open on
       */
      setPageDate: function setPageDate (date) {
        if (!date) {
          if (this.openDate) {
            date = new Date(this.openDate);
          } else {
            date = new Date();
          }
        }
        this.pageTimestamp = this.utils.setDate(new Date(date), 1);
      },
      /**
       * Handles a month change from the day picker
       */
      handleChangedMonthFromDayPicker: function handleChangedMonthFromDayPicker (date) {
        this.setPageDate(date);
        this.$emit('changedMonth', date);
      },
      /**
       * Set the date from a typedDate event
       */
      setTypedDate: function setTypedDate (date) {
        this.setDate(date.getTime());
      },
      /**
       * Close all calendar layers
       * @param {Boolean} emitEvent - emit close event
       */
      close: function close (emitEvent) {
        this.showDayView = this.showMonthView = this.showYearView = false;
        if (!this.isInline) {
          if (emitEvent) {
            this.$emit('closed');
          }
          document.removeEventListener('click', this.clickOutside, false);
        }
      },
      /**
       * Initiate the component
       */
      init: function init () {
        if (this.value) {
          this.setValue(this.value);
        }
        if (this.isInline) {
          this.setInitialView();
        }
      }
    },
    mounted: function mounted () {
      this.init();
    }
  }
  // eslint-disable-next-line
  ;

  return Datepicker;

})));
