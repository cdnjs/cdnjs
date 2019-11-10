/*!
 * Datepicker v0.6.4
 * https://github.com/fengyuanchen/datepicker
 *
 * Copyright (c) 2014-2017 Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2017-11-24T14:38:23.820Z
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

var DEFAULTS = {
  // Show the datepicker automatically when initialized
  autoShow: false,

  // Hide the datepicker automatically when picked
  autoHide: false,

  // Pick the initial date automatically when initialized
  autoPick: false,

  // Enable inline mode
  inline: false,

  // A element (or selector) for putting the datepicker
  container: null,

  // A element (or selector) for triggering the datepicker
  trigger: null,

  // The ISO language code (built-in: en-US)
  language: '',

  // The date string format
  format: 'mm/dd/yyyy',

  // The initial date
  date: null,

  // The start view date
  startDate: null,

  // The end view date
  endDate: null,

  // The start view when initialized
  startView: 0, // 0 for days, 1 for months, 2 for years

  // The start day of the week
  // 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday,
  // 4 for Thursday, 5 for Friday, 6 for Saturday
  weekStart: 0,

  // Show year before month on the datepicker header
  yearFirst: false,

  // A string suffix to the year number.
  yearSuffix: '',

  // Days' name of the week.
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  // Shorter days' name
  daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

  // Shortest days' name
  daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],

  // Months' name
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  // Shorter months' name
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  // A element tag for each item of years, months and days
  itemTag: 'li',

  // A class (CSS) for muted date item
  mutedClass: 'muted',

  // A class (CSS) for picked date item
  pickedClass: 'picked',

  // A class (CSS) for disabled date item
  disabledClass: 'disabled',

  // A class (CSS) for highlight date item
  highlightedClass: 'highlighted',

  // The template of the datepicker
  template: '<div class="datepicker-container">' + '<div class="datepicker-panel" data-view="years picker">' + '<ul>' + '<li data-view="years prev">&lsaquo;</li>' + '<li data-view="years current"></li>' + '<li data-view="years next">&rsaquo;</li>' + '</ul>' + '<ul data-view="years"></ul>' + '</div>' + '<div class="datepicker-panel" data-view="months picker">' + '<ul>' + '<li data-view="year prev">&lsaquo;</li>' + '<li data-view="year current"></li>' + '<li data-view="year next">&rsaquo;</li>' + '</ul>' + '<ul data-view="months"></ul>' + '</div>' + '<div class="datepicker-panel" data-view="days picker">' + '<ul>' + '<li data-view="month prev">&lsaquo;</li>' + '<li data-view="month current"></li>' + '<li data-view="month next">&rsaquo;</li>' + '</ul>' + '<ul data-view="week"></ul>' + '<ul data-view="days"></ul>' + '</div>' + '</div>',

  // The offset top or bottom of the datepicker from the element
  offset: 10,

  // The `z-index` of the datepicker
  zIndex: 1000,

  // Filter each date item (return `false` to disable a date item)
  filter: null,

  // Event shortcuts
  show: null,
  hide: null,
  pick: null
};

var WINDOW = typeof window !== 'undefined' ? window : {};
var NAMESPACE = 'datepicker';
var EVENT_CLICK = 'click.' + NAMESPACE;
var EVENT_FOCUS = 'focus.' + NAMESPACE;
var EVENT_HIDE = 'hide.' + NAMESPACE;
var EVENT_KEYUP = 'keyup.' + NAMESPACE;
var EVENT_PICK = 'pick.' + NAMESPACE;
var EVENT_RESIZE = 'resize.' + NAMESPACE;
var EVENT_SHOW = 'show.' + NAMESPACE;
var CLASS_HIDE = NAMESPACE + '-hide';
var LANGUAGES = {};
var VIEWS = {
  DAYS: 0,
  MONTHS: 1,
  YEARS: 2
};

var toString = Object.prototype.toString;


function typeOf(obj) {
  return toString.call(obj).slice(8, -1).toLowerCase();
}

function isString(value) {
  return typeof value === 'string';
}

var isNaN = Number.isNaN || WINDOW.isNaN;

function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

function isUndefined(value) {
  return typeof value === 'undefined';
}

function isDate(value) {
  return typeOf(value) === 'date';
}

function proxy(fn, context) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args2 = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args2[_key2] = arguments[_key2];
    }

    return fn.apply(context, args.concat(args2));
  };
}

function selectorOf(view) {
  return '[data-view="' + view + '"]';
}

function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

function getDaysInMonth(year, month) {
  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

function getMinDay(year, month, day) {
  return Math.min(day, getDaysInMonth(year, month));
}

var formatParts = /(y|m|d)+/g;

function parseFormat(format) {
  var source = String(format).toLowerCase();
  var parts = source.match(formatParts);

  if (!parts || parts.length === 0) {
    throw new Error('Invalid date format.');
  }

  format = {
    source: source,
    parts: parts
  };

  $.each(parts, function (i, part) {
    switch (part) {
      case 'dd':
      case 'd':
        format.hasDay = true;
        break;

      case 'mm':
      case 'm':
        format.hasMonth = true;
        break;

      case 'yyyy':
      case 'yy':
        format.hasYear = true;
        break;

      default:
    }
  });

  return format;
}

var REGEXP_DIGITS = /\d+/g;

var methods = {
  // Show the datepicker
  show: function show() {
    if (!this.built) {
      this.build();
    }

    if (this.shown) {
      return;
    }

    if (this.trigger(EVENT_SHOW).isDefaultPrevented()) {
      return;
    }

    this.shown = true;
    this.$picker.removeClass(CLASS_HIDE).on(EVENT_CLICK, $.proxy(this.click, this));
    this.showView(this.options.startView);

    if (!this.inline) {
      $(window).on(EVENT_RESIZE, this.onResize = proxy(this.place, this));
      $(document).on(EVENT_CLICK, this.onGlobalClick = proxy(this.globalClick, this));
      $(document).on(EVENT_KEYUP, this.onGlobalKeyup = proxy(this.globalKeyup, this));
      this.place();
    }
  },


  // Hide the datepicker
  hide: function hide() {
    if (!this.shown) {
      return;
    }

    if (this.trigger(EVENT_HIDE).isDefaultPrevented()) {
      return;
    }

    this.shown = false;
    this.$picker.addClass(CLASS_HIDE).off(EVENT_CLICK, this.click);

    if (!this.inline) {
      $(window).off(EVENT_RESIZE, this.onResize);
      $(document).off(EVENT_CLICK, this.onGlobalClick);
      $(document).off(EVENT_KEYUP, this.onGlobalKeyup);
    }
  },
  toggle: function toggle() {
    if (this.shown) {
      this.hide();
    } else {
      this.show();
    }
  },


  // Update the datepicker with the current input value
  update: function update() {
    var value = this.getValue();

    if (value === this.oldValue) {
      return;
    }

    this.setDate(value, true);
    this.oldValue = value;
  },


  /**
   * Pick the current date to the element
   *
   * @param {String} _view (private)
   */
  pick: function pick(_view) {
    var $this = this.$element;
    var date = this.date;


    if (this.trigger(EVENT_PICK, {
      view: _view || '',
      date: date
    }).isDefaultPrevented()) {
      return;
    }

    date = this.formatDate(this.date);
    this.setValue(date);

    if (this.isInput) {
      $this.trigger('input');
      $this.trigger('change');
    }
  },


  // Reset the datepicker
  reset: function reset() {
    this.setDate(this.initialDate, true);
    this.setValue(this.initialValue);

    if (this.shown) {
      this.showView(this.options.startView);
    }
  },


  /**
   * Get the month name with given argument or the current date
   *
   * @param {Number} month (optional)
   * @param {Boolean} short (optional)
   * @return {String} (month name)
   */
  getMonthName: function getMonthName(month, short) {
    var options = this.options;
    var monthsShort = options.monthsShort;
    var months = options.months;


    if ($.isNumeric(month)) {
      month = Number(month);
    } else if (isUndefined(short)) {
      short = month;
    }

    if (short === true) {
      months = monthsShort;
    }

    return months[isNumber(month) ? month : this.date.getMonth()];
  },


  /**
   * Get the day name with given argument or the current date
   *
   * @param {Number} day (optional)
   * @param {Boolean} short (optional)
   * @param {Boolean} min (optional)
   * @return {String} (day name)
   */
  getDayName: function getDayName(day, short, min) {
    var options = this.options;
    var days = options.days;


    if ($.isNumeric(day)) {
      day = Number(day);
    } else {
      if (isUndefined(min)) {
        min = short;
      }

      if (isUndefined(short)) {
        short = day;
      }
    }

    if (min) {
      days = options.daysMin;
    } else if (short) {
      days = options.daysShort;
    }

    return days[isNumber(day) ? day : this.date.getDay()];
  },


  /**
   * Get the current date
   *
   * @param {Boolean} formatted (optional)
   * @return {Date|String} (date)
   */
  getDate: function getDate(formatted) {
    var date = this.date;


    return formatted ? this.formatDate(date) : new Date(date);
  },


  /**
   * Set the current date with a new date
   *
   * @param {Date} date
   * @param {Boolean} _updated (private)
   */
  setDate: function setDate(date, _updated) {
    var filter = this.options.filter;


    if (isDate(date) || isString(date)) {
      date = this.parseDate(date);

      if ($.isFunction(filter) && filter.call(this.$element, date) === false) {
        return;
      }

      this.date = date;
      this.viewDate = new Date(date);

      if (!_updated) {
        this.pick();
      }

      if (this.built) {
        this.render();
      }
    }
  },


  /**
   * Set the start view date with a new date
   *
   * @param {Date} date
   */
  setStartDate: function setStartDate(date) {
    if (isDate(date) || isString(date)) {
      this.startDate = this.parseDate(date);

      if (this.built) {
        this.render();
      }
    }
  },


  /**
   * Set the end view date with a new date
   *
   * @param {Date} date
   */
  setEndDate: function setEndDate(date) {
    if (isDate(date) || isString(date)) {
      this.endDate = this.parseDate(date);

      if (this.built) {
        this.render();
      }
    }
  },


  /**
   * Parse a date string with the set date format
   *
   * @param {String} date
   * @return {Date} (parsed date)
   */
  parseDate: function parseDate(date) {
    var format = this.format;

    var parts = [];

    if (isDate(date)) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    } else if (isString(date)) {
      parts = date.match(REGEXP_DIGITS) || [];
    }

    date = new Date();

    var length = format.parts.length;

    var year = date.getFullYear();
    var day = date.getDate();
    var month = date.getMonth();

    if (parts.length === length) {
      $.each(parts, function (i, part) {
        var value = parseInt(part, 10) || 1;

        switch (format.parts[i]) {
          case 'dd':
          case 'd':
            day = value;
            break;

          case 'mm':
          case 'm':
            month = value - 1;
            break;

          case 'yy':
            year = 2000 + value;
            break;

          case 'yyyy':
            year = value;
            break;

          default:
        }
      });
    }

    return new Date(year, month, day);
  },


  /**
   * Format a date object to a string with the set date format
   *
   * @param {Date} date
   * @return {String} (formatted date)
   */
  formatDate: function formatDate(date) {
    var format = this.format;

    var formatted = '';

    if (isDate(date)) {
      var year = date.getFullYear();
      var values = {
        d: date.getDate(),
        m: date.getMonth() + 1,
        yy: year.toString().substring(2),
        yyyy: year
      };

      values.dd = (values.d < 10 ? '0' : '') + values.d;
      values.mm = (values.m < 10 ? '0' : '') + values.m;
      formatted = format.source;
      $.each(format.parts, function (i, part) {
        formatted = formatted.replace(part, values[part]);
      });
    }

    return formatted;
  },


  // Destroy the datepicker and remove the instance from the target element
  destroy: function destroy() {
    this.unbind();
    this.unbuild();
    this.$element.removeData(NAMESPACE);
  }
};

var handlers = {
  click: function click(e) {
    var $target = $(e.target);
    var options = this.options,
        viewDate = this.viewDate,
        format = this.format;


    e.stopPropagation();
    e.preventDefault();

    if ($target.hasClass('disabled')) {
      return;
    }

    var view = $target.data('view');
    var viewYear = viewDate.getFullYear();
    var viewMonth = viewDate.getMonth();
    var viewDay = viewDate.getDate();

    switch (view) {
      case 'years prev':
      case 'years next':
        {
          viewYear = view === 'years prev' ? viewYear - 10 : viewYear + 10;
          this.viewDate = new Date(viewYear, viewMonth, getMinDay(viewYear, viewMonth, viewDay));
          this.renderYears();
          break;
        }

      case 'year prev':
      case 'year next':
        viewYear = view === 'year prev' ? viewYear - 1 : viewYear + 1;
        this.viewDate = new Date(viewYear, viewMonth, getMinDay(viewYear, viewMonth, viewDay));
        this.renderMonths();
        break;

      case 'year current':
        if (format.hasYear) {
          this.showView(VIEWS.YEARS);
        }

        break;

      case 'year picked':
        if (format.hasMonth) {
          this.showView(VIEWS.MONTHS);
        } else {
          $target.addClass(options.pickedClass).siblings().removeClass(options.pickedClass);
          this.hideView();
        }

        this.pick('year');
        break;

      case 'year':
        viewYear = parseInt($target.text(), 10);
        this.date = new Date(viewYear, viewMonth, getMinDay(viewYear, viewMonth, viewDay));

        if (format.hasMonth) {
          this.viewDate = new Date(this.date);
          this.showView(VIEWS.MONTHS);
        } else {
          $target.addClass(options.pickedClass).siblings().removeClass(options.pickedClass);
          this.hideView();
        }

        this.pick('year');
        break;

      case 'month prev':
      case 'month next':
        viewMonth = view === 'month prev' ? viewMonth - 1 : viewMonth + 1;

        if (viewMonth < 0) {
          viewYear -= 1;
          viewMonth += 12;
        } else if (viewMonth > 11) {
          viewYear += 1;
          viewMonth -= 12;
        }

        this.viewDate = new Date(viewYear, viewMonth, getMinDay(viewYear, viewMonth, viewDay));
        this.renderDays();
        break;

      case 'month current':
        if (format.hasMonth) {
          this.showView(VIEWS.MONTHS);
        }

        break;

      case 'month picked':
        if (format.hasDay) {
          this.showView(VIEWS.DAYS);
        } else {
          $target.addClass(options.pickedClass).siblings().removeClass(options.pickedClass);
          this.hideView();
        }

        this.pick('month');
        break;

      case 'month':
        viewMonth = $.inArray($target.text(), options.monthsShort);
        this.date = new Date(viewYear, viewMonth, getMinDay(viewYear, viewMonth, viewDay));

        if (format.hasDay) {
          this.viewDate = new Date(viewYear, viewMonth, getMinDay(viewYear, viewMonth, viewDay));
          this.showView(VIEWS.DAYS);
        } else {
          $target.addClass(options.pickedClass).siblings().removeClass(options.pickedClass);
          this.hideView();
        }

        this.pick('month');
        break;

      case 'day prev':
      case 'day next':
      case 'day':
        if (view === 'day prev') {
          viewMonth -= 1;
        } else if (view === 'day next') {
          viewMonth += 1;
        }

        viewDay = parseInt($target.text(), 10);
        this.date = new Date(viewYear, viewMonth, viewDay);
        this.viewDate = new Date(viewYear, viewMonth, viewDay);
        this.renderDays();

        if (view === 'day') {
          this.hideView();
        }

        this.pick('day');
        break;

      case 'day picked':
        this.hideView();
        this.pick('day');
        break;

      default:
    }
  },
  globalClick: function globalClick(_ref) {
    var target = _ref.target;
    var element = this.element,
        $trigger = this.$trigger;

    var trigger = $trigger[0];
    var hidden = true;

    while (target !== document) {
      if (target === trigger || target === element) {
        hidden = false;
        break;
      }

      target = target.parentNode;
    }

    if (hidden) {
      this.hide();
    }
  },
  keyup: function keyup() {
    this.update();
  },
  globalKeyup: function globalKeyup(_ref2) {
    var target = _ref2.target,
        key = _ref2.key,
        keyCode = _ref2.keyCode;

    if (this.isInput && target !== this.element && this.shown && (key === 'Tab' || keyCode === 9)) {
      this.hide();
    }
  }
};

var render = {
  render: function render() {
    this.renderYears();
    this.renderMonths();
    this.renderDays();
  },
  renderWeek: function renderWeek() {
    var _this = this;

    var items = [];
    var _options = this.options,
        weekStart = _options.weekStart,
        daysMin = _options.daysMin;


    weekStart = parseInt(weekStart, 10) % 7;
    daysMin = daysMin.slice(weekStart).concat(daysMin.slice(0, weekStart));
    $.each(daysMin, function (i, day) {
      items.push(_this.createItem({
        text: day
      }));
    });

    this.$week.html(items.join(''));
  },
  renderYears: function renderYears() {
    var options = this.options,
        startDate = this.startDate,
        endDate = this.endDate;
    var disabledClass = options.disabledClass,
        filter = options.filter,
        yearSuffix = options.yearSuffix;

    var viewYear = this.viewDate.getFullYear();
    var now = new Date();
    var thisYear = now.getFullYear();
    var year = this.date.getFullYear();
    var start = -5;
    var end = 6;
    var items = [];
    var prevDisabled = false;
    var nextDisabled = false;
    var i = void 0;

    for (i = start; i <= end; i += 1) {
      var date = new Date(viewYear + i, 1, 1);
      var disabled = false;

      if (startDate) {
        disabled = date.getFullYear() < startDate.getFullYear();

        if (i === start) {
          prevDisabled = disabled;
        }
      }

      if (!disabled && endDate) {
        disabled = date.getFullYear() > endDate.getFullYear();

        if (i === end) {
          nextDisabled = disabled;
        }
      }

      if (!disabled && filter) {
        disabled = filter.call(this.$element, date) === false;
      }

      var picked = viewYear + i === year;
      var view = picked ? 'year picked' : 'year';

      items.push(this.createItem({
        picked: picked,
        disabled: disabled,
        muted: i === start || i === end,
        text: viewYear + i,
        view: disabled ? 'year disabled' : view,
        highlighted: date.getFullYear() === thisYear
      }));
    }

    this.$yearsPrev.toggleClass(disabledClass, prevDisabled);
    this.$yearsNext.toggleClass(disabledClass, nextDisabled);
    this.$yearsCurrent.toggleClass(disabledClass, true).html(viewYear + start + yearSuffix + ' - ' + (viewYear + end) + yearSuffix);
    this.$years.html(items.join(''));
  },
  renderMonths: function renderMonths() {
    var options = this.options,
        startDate = this.startDate,
        endDate = this.endDate,
        viewDate = this.viewDate;

    var disabledClass = options.disabledClass || '';
    var months = options.monthsShort;
    var filter = $.isFunction(options.filter) && options.filter;
    var viewYear = viewDate.getFullYear();
    var now = new Date();
    var thisYear = now.getFullYear();
    var thisMonth = now.getMonth();
    var year = this.date.getFullYear();
    var month = this.date.getMonth();
    var items = [];
    var prevDisabled = false;
    var nextDisabled = false;
    var i = void 0;

    for (i = 0; i <= 11; i += 1) {
      var date = new Date(viewYear, i, 1);
      var disabled = false;

      if (startDate) {
        prevDisabled = date.getFullYear() === startDate.getFullYear();
        disabled = prevDisabled && date.getMonth() < startDate.getMonth();
      }

      if (!disabled && endDate) {
        nextDisabled = date.getFullYear() === endDate.getFullYear();
        disabled = nextDisabled && date.getMonth() > endDate.getMonth();
      }

      if (!disabled && filter) {
        disabled = filter.call(this.$element, date) === false;
      }

      var picked = viewYear === year && i === month;
      var view = picked ? 'month picked' : 'month';

      items.push(this.createItem({
        disabled: disabled,
        picked: picked,
        highlighted: viewYear === thisYear && date.getMonth() === thisMonth,
        index: i,
        text: months[i],
        view: disabled ? 'month disabled' : view
      }));
    }

    this.$yearPrev.toggleClass(disabledClass, prevDisabled);
    this.$yearNext.toggleClass(disabledClass, nextDisabled);
    this.$yearCurrent.toggleClass(disabledClass, prevDisabled && nextDisabled).html(viewYear + options.yearSuffix || '');
    this.$months.html(items.join(''));
  },
  renderDays: function renderDays() {
    var $element = this.$element,
        options = this.options,
        startDate = this.startDate,
        endDate = this.endDate,
        viewDate = this.viewDate,
        currentDate = this.date;
    var disabledClass = options.disabledClass,
        filter = options.filter,
        monthsShort = options.monthsShort,
        weekStart = options.weekStart,
        yearSuffix = options.yearSuffix;

    var viewYear = viewDate.getFullYear();
    var viewMonth = viewDate.getMonth();
    var now = new Date();
    var thisYear = now.getFullYear();
    var thisMonth = now.getMonth();
    var thisDay = now.getDate();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var day = currentDate.getDate();
    var length = void 0;
    var i = void 0;
    var n = void 0;

    // Days of prev month
    // -----------------------------------------------------------------------

    var prevItems = [];
    var prevViewYear = viewYear;
    var prevViewMonth = viewMonth;
    var prevDisabled = false;

    if (viewMonth === 0) {
      prevViewYear -= 1;
      prevViewMonth = 11;
    } else {
      prevViewMonth -= 1;
    }

    // The length of the days of prev month
    length = getDaysInMonth(prevViewYear, prevViewMonth);

    // The first day of current month
    var firstDay = new Date(viewYear, viewMonth, 1);

    // The visible length of the days of prev month
    // [0,1,2,3,4,5,6] - [0,1,2,3,4,5,6] => [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6]
    n = firstDay.getDay() - parseInt(weekStart, 10) % 7;

    // [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6] => [1,2,3,4,5,6,7]
    if (n <= 0) {
      n += 7;
    }

    if (startDate) {
      prevDisabled = firstDay.getTime() <= startDate.getTime();
    }

    for (i = length - (n - 1); i <= length; i += 1) {
      var prevViewDate = new Date(prevViewYear, prevViewMonth, i);
      var disabled = false;

      if (startDate) {
        disabled = prevViewDate.getTime() < startDate.getTime();
      }

      if (!disabled && filter) {
        disabled = filter.call($element, prevViewDate) === false;
      }

      prevItems.push(this.createItem({
        disabled: disabled,
        highlighted: prevViewYear === thisYear && prevViewMonth === thisMonth && prevViewDate.getDate() === thisDay,
        muted: true,
        picked: prevViewYear === year && prevViewMonth === month && i === day,
        text: i,
        view: 'day prev'
      }));
    }

    // Days of next month
    // -----------------------------------------------------------------------

    var nextItems = [];
    var nextViewYear = viewYear;
    var nextViewMonth = viewMonth;
    var nextDisabled = false;

    if (viewMonth === 11) {
      nextViewYear += 1;
      nextViewMonth = 0;
    } else {
      nextViewMonth += 1;
    }

    // The length of the days of current month
    length = getDaysInMonth(viewYear, viewMonth);

    // The visible length of next month (42 means 6 rows and 7 columns)
    n = 42 - (prevItems.length + length);

    // The last day of current month
    var lastDate = new Date(viewYear, viewMonth, length);

    if (endDate) {
      nextDisabled = lastDate.getTime() >= endDate.getTime();
    }

    for (i = 1; i <= n; i += 1) {
      var date = new Date(nextViewYear, nextViewMonth, i);
      var picked = nextViewYear === year && nextViewMonth === month && i === day;
      var _disabled = false;

      if (endDate) {
        _disabled = date.getTime() > endDate.getTime();
      }

      if (!_disabled && filter) {
        _disabled = filter.call($element, date) === false;
      }

      nextItems.push(this.createItem({
        disabled: _disabled,
        picked: picked,
        highlighted: nextViewYear === thisYear && nextViewMonth === thisMonth && date.getDate() === thisDay,
        muted: true,
        text: i,
        view: 'day next'
      }));
    }

    // Days of current month
    // -----------------------------------------------------------------------

    var items = [];

    for (i = 1; i <= length; i += 1) {
      var _date = new Date(viewYear, viewMonth, i);
      var _disabled2 = false;

      if (startDate) {
        _disabled2 = _date.getTime() < startDate.getTime();
      }

      if (!_disabled2 && endDate) {
        _disabled2 = _date.getTime() > endDate.getTime();
      }

      if (!_disabled2 && filter) {
        _disabled2 = filter.call($element, _date) === false;
      }

      var _picked = viewYear === year && viewMonth === month && i === day;
      var view = _picked ? 'day picked' : 'day';

      items.push(this.createItem({
        disabled: _disabled2,
        picked: _picked,
        highlighted: viewYear === thisYear && viewMonth === thisMonth && _date.getDate() === thisDay,
        text: i,
        view: _disabled2 ? 'day disabled' : view
      }));
    }

    // Render days picker
    // -----------------------------------------------------------------------

    this.$monthPrev.toggleClass(disabledClass, prevDisabled);
    this.$monthNext.toggleClass(disabledClass, nextDisabled);
    this.$monthCurrent.toggleClass(disabledClass, prevDisabled && nextDisabled).html(options.yearFirst ? viewYear + yearSuffix + ' ' + monthsShort[viewMonth] : monthsShort[viewMonth] + ' ' + viewYear + yearSuffix);
    this.$days.html(prevItems.join('') + items.join('') + nextItems.join(''));
  }
};

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Classes
var CLASS_TOP_LEFT = NAMESPACE + '-top-left';
var CLASS_TOP_RIGHT = NAMESPACE + '-top-right';
var CLASS_BOTTOM_LEFT = NAMESPACE + '-bottom-left';
var CLASS_BOTTOM_RIGHT = NAMESPACE + '-bottom-right';
var CLASS_PLACEMENTS = [CLASS_TOP_LEFT, CLASS_TOP_RIGHT, CLASS_BOTTOM_LEFT, CLASS_BOTTOM_RIGHT].join(' ');

var Datepicker = function () {
  function Datepicker(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Datepicker);

    this.$element = $(element);
    this.element = element;
    this.options = $.extend({}, DEFAULTS, LANGUAGES[options.language], options);
    this.built = false;
    this.shown = false;
    this.isInput = false;
    this.inline = false;
    this.initialValue = '';
    this.initialDate = null;
    this.startDate = null;
    this.endDate = null;
    this.init();
  }

  _createClass(Datepicker, [{
    key: 'init',
    value: function init() {
      var $this = this.$element,
          options = this.options;
      var startDate = options.startDate,
          endDate = options.endDate,
          date = options.date;


      this.$trigger = $(options.trigger);
      this.isInput = $this.is('input') || $this.is('textarea');
      this.inline = options.inline && (options.container || !this.isInput);
      this.format = parseFormat(options.format);

      var initialValue = this.getValue();

      this.initialValue = initialValue;
      this.oldValue = initialValue;
      date = this.parseDate(date || initialValue);

      if (startDate) {
        startDate = this.parseDate(startDate);

        if (date.getTime() < startDate.getTime()) {
          date = new Date(startDate);
        }

        this.startDate = startDate;
      }

      if (endDate) {
        endDate = this.parseDate(endDate);

        if (startDate && endDate.getTime() < startDate.getTime()) {
          endDate = new Date(startDate);
        }

        if (date.getTime() > endDate.getTime()) {
          date = new Date(endDate);
        }

        this.endDate = endDate;
      }

      this.date = date;
      this.viewDate = new Date(date);
      this.initialDate = new Date(this.date);
      this.bind();

      if (options.autoShow || this.inline) {
        this.show();
      }

      if (options.autoPick) {
        this.pick();
      }
    }
  }, {
    key: 'build',
    value: function build() {
      if (this.built) {
        return;
      }

      this.built = true;

      var $this = this.$element,
          options = this.options;

      var $picker = $(options.template);

      this.$picker = $picker;
      this.$week = $picker.find(selectorOf('week'));

      // Years view
      this.$yearsPicker = $picker.find(selectorOf('years picker'));
      this.$yearsPrev = $picker.find(selectorOf('years prev'));
      this.$yearsNext = $picker.find(selectorOf('years next'));
      this.$yearsCurrent = $picker.find(selectorOf('years current'));
      this.$years = $picker.find(selectorOf('years'));

      // Months view
      this.$monthsPicker = $picker.find(selectorOf('months picker'));
      this.$yearPrev = $picker.find(selectorOf('year prev'));
      this.$yearNext = $picker.find(selectorOf('year next'));
      this.$yearCurrent = $picker.find(selectorOf('year current'));
      this.$months = $picker.find(selectorOf('months'));

      // Days view
      this.$daysPicker = $picker.find(selectorOf('days picker'));
      this.$monthPrev = $picker.find(selectorOf('month prev'));
      this.$monthNext = $picker.find(selectorOf('month next'));
      this.$monthCurrent = $picker.find(selectorOf('month current'));
      this.$days = $picker.find(selectorOf('days'));

      if (this.inline) {
        $(options.container || $this).append($picker.addClass(NAMESPACE + '-inline'));
      } else {
        $(document.body).append($picker.addClass(NAMESPACE + '-dropdown'));
        $picker.addClass(CLASS_HIDE);
      }

      this.renderWeek();
    }
  }, {
    key: 'unbuild',
    value: function unbuild() {
      if (!this.built) {
        return;
      }

      this.built = false;
      this.$picker.remove();
    }
  }, {
    key: 'bind',
    value: function bind() {
      var options = this.options,
          $this = this.$element;


      if ($.isFunction(options.show)) {
        $this.on(EVENT_SHOW, options.show);
      }

      if ($.isFunction(options.hide)) {
        $this.on(EVENT_HIDE, options.hide);
      }

      if ($.isFunction(options.pick)) {
        $this.on(EVENT_PICK, options.pick);
      }

      if (this.isInput) {
        $this.on(EVENT_KEYUP, $.proxy(this.keyup, this));
      }

      if (!this.inline) {
        if (options.trigger) {
          this.$trigger.on(EVENT_CLICK, $.proxy(this.toggle, this));
        } else if (this.isInput) {
          $this.on(EVENT_FOCUS, $.proxy(this.show, this));
        } else {
          $this.on(EVENT_CLICK, $.proxy(this.show, this));
        }
      }
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      var $this = this.$element,
          options = this.options;


      if ($.isFunction(options.show)) {
        $this.off(EVENT_SHOW, options.show);
      }

      if ($.isFunction(options.hide)) {
        $this.off(EVENT_HIDE, options.hide);
      }

      if ($.isFunction(options.pick)) {
        $this.off(EVENT_PICK, options.pick);
      }

      if (this.isInput) {
        $this.off(EVENT_KEYUP, this.keyup);
      }

      if (!this.inline) {
        if (options.trigger) {
          this.$trigger.off(EVENT_CLICK, this.toggle);
        } else if (this.isInput) {
          $this.off(EVENT_FOCUS, this.show);
        } else {
          $this.off(EVENT_CLICK, this.show);
        }
      }
    }
  }, {
    key: 'showView',
    value: function showView(view) {
      var $yearsPicker = this.$yearsPicker,
          $monthsPicker = this.$monthsPicker,
          $daysPicker = this.$daysPicker,
          format = this.format;


      if (format.hasYear || format.hasMonth || format.hasDay) {
        switch (Number(view)) {
          case VIEWS.YEARS:
            $monthsPicker.addClass(CLASS_HIDE);
            $daysPicker.addClass(CLASS_HIDE);

            if (format.hasYear) {
              this.renderYears();
              $yearsPicker.removeClass(CLASS_HIDE);
              this.place();
            } else {
              this.showView(VIEWS.DAYS);
            }

            break;

          case VIEWS.MONTHS:
            $yearsPicker.addClass(CLASS_HIDE);
            $daysPicker.addClass(CLASS_HIDE);

            if (format.hasMonth) {
              this.renderMonths();
              $monthsPicker.removeClass(CLASS_HIDE);
              this.place();
            } else {
              this.showView(VIEWS.YEARS);
            }

            break;

          // case VIEWS.DAYS:
          default:
            $yearsPicker.addClass(CLASS_HIDE);
            $monthsPicker.addClass(CLASS_HIDE);

            if (format.hasDay) {
              this.renderDays();
              $daysPicker.removeClass(CLASS_HIDE);
              this.place();
            } else {
              this.showView(VIEWS.MONTHS);
            }
        }
      }
    }
  }, {
    key: 'hideView',
    value: function hideView() {
      if (!this.inline && this.options.autoHide) {
        this.hide();
      }
    }
  }, {
    key: 'place',
    value: function place() {
      if (this.inline) {
        return;
      }

      var $this = this.$element,
          options = this.options,
          $picker = this.$picker;

      var containerWidth = $(document).outerWidth();
      var containerHeight = $(document).outerHeight();
      var elementWidth = $this.outerWidth();
      var elementHeight = $this.outerHeight();
      var width = $picker.width();
      var height = $picker.height();

      var _$this$offset = $this.offset(),
          left = _$this$offset.left,
          top = _$this$offset.top;

      var offset = parseFloat(options.offset);
      var placement = CLASS_TOP_LEFT;

      if (isNaN(offset)) {
        offset = 10;
      }

      if (top > height && top + elementHeight + height > containerHeight) {
        top -= height + offset;
        placement = CLASS_BOTTOM_LEFT;
      } else {
        top += elementHeight + offset;
      }

      if (left + width > containerWidth) {
        left += elementWidth - width;
        placement = placement.replace('left', 'right');
      }

      $picker.removeClass(CLASS_PLACEMENTS).addClass(placement).css({
        top: top,
        left: left,
        zIndex: parseInt(options.zIndex, 10)
      });
    }

    // A shortcut for triggering custom events

  }, {
    key: 'trigger',
    value: function trigger(type, data) {
      var e = $.Event(type, data);

      this.$element.trigger(e);

      return e;
    }
  }, {
    key: 'createItem',
    value: function createItem(data) {
      var options = this.options;
      var itemTag = options.itemTag;

      var item = {
        text: '',
        view: '',
        muted: false,
        picked: false,
        disabled: false,
        highlighted: false
      };
      var classes = [];

      $.extend(item, data);

      if (item.muted) {
        classes.push(options.mutedClass);
      }

      if (item.highlighted) {
        classes.push(options.highlightedClass);
      }

      if (item.picked) {
        classes.push(options.pickedClass);
      }

      if (item.disabled) {
        classes.push(options.disabledClass);
      }

      return '<' + itemTag + ' class="' + classes.join(' ') + '" data-view="' + item.view + '">' + item.text + '</' + itemTag + '>';
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var $this = this.$element;

      return this.isInput ? $this.val() : $this.text();
    }
  }, {
    key: 'setValue',
    value: function setValue() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var $this = this.$element;

      if (this.isInput) {
        $this.val(value);
      } else {
        $this.text(value);
      }
    }
  }], [{
    key: 'setDefaults',
    value: function setDefaults() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      $.extend(DEFAULTS, LANGUAGES[options.language], options);
    }
  }]);

  return Datepicker;
}();

if ($.extend) {
  $.extend(Datepicker.prototype, render, handlers, methods);
}

if ($.fn) {
  var AnotherDatepicker = $.fn.datepicker;

  $.fn.datepicker = function jQueryDatepicker(option) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var result = void 0;

    this.each(function (i, element) {
      var $element = $(element);
      var data = $element.data(NAMESPACE);

      if (!data) {
        if (/destroy/.test(option)) {
          return;
        }

        var options = $.extend({}, $element.data(), $.isPlainObject(option) && option);

        data = new Datepicker(element, options);
        $element.data(NAMESPACE, data);
      }

      if (isString(option)) {
        var fn = data[option];

        if ($.isFunction(fn)) {
          result = fn.apply(data, args);
        }
      }
    });

    return isUndefined(result) ? this : result;
  };

  $.fn.datepicker.Constructor = Datepicker;
  $.fn.datepicker.languages = LANGUAGES;
  $.fn.datepicker.setDefaults = Datepicker.setDefaults;
  $.fn.datepicker.noConflict = function noConflict() {
    $.fn.datepicker = AnotherDatepicker;
    return this;
  };
}

})));
