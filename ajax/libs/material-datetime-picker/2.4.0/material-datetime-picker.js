(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('rome'), require('moment')) :
	typeof define === 'function' && define.amd ? define(['rome', 'moment'], factory) :
	(global.MaterialDatetimePicker = factory(global.rome,global.moment));
}(this, (function (rome,moment) { 'use strict';

rome = 'default' in rome ? rome['default'] : rome;
moment = 'default' in moment ? moment['default'] : moment;

var popupTemplate = (function () {
  return "\n<div class=\"c-datepicker\">\n  <a class=\"c-datepicker__toggle c-datepicker__toggle--right c-datepicker--show-time js-show-clock\" title=\"show time picker\">\n  </a>\n\n  <a class=\"c-datepicker__toggle c-datepicker__toggle--left c-datepicker--show-calendar is-selected js-show-calendar\" title=\"show date picker\">\n  </a>\n\n  <div class=\"c-datepicker__header\">\n    <div class=\"c-datepicker__header-day\">\n      <span class=\"js-day\">Monday</span>\n    </div>\n    <div class=\"c-datepicker__header-date\">\n      <span class=\"c-datepicker__header-date__month js-date-month\"></span>\n      <span class=\"c-datepicker__header-date__day js-date-day\"></span>\n      <span class=\"c-datepicker__header-date__time js-date-time\">\n        <span class=\"c-datepicker__header-date__hours js-date-hours active\">09</span>:<span class=\"c-datepicker__header-date__minutes js-date-minutes\">00</span>\n      </span>\n    </div>\n  </div>\n\n  <div class=\"c-datepicker__calendar\"></div>\n  <div class=\"c-datepicker__clock\">\n    <div class=\"c-datepicker__clock__am-pm-toggle\">\n      <label class=\"c-datepicker__toggle--checked\">\n        <input checked=\"checked\" class=\"c-datepicker__toggle c-datepicker__toggle--right c-datepicker__clock--am\" type=\"radio\" name=\"time-date-toggle\" value=\"AM\" />\n        AM\n      </label>\n\n      <label>\n        <input class=\"c-datepicker__toggle c-datepicker__toggle--right c-datepicker__clock--pm\" type=\"radio\" name=\"time-date-toggle\" value=\"PM\" />\n        PM\n      </label>\n    </div>\n    <div class=\"c-datepicker__mask\"></div>\n    <div class=\"c-datepicker__clock__hours js-clock-hours active\">\n      <div class=\"c-datepicker__clock__num\" data-number=\"3\">3</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"4\">4</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"5\">5</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"6\">6</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"7\">7</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"8\">8</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"9\">9</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"10\">10</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"11\">11</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"0\">12</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"1\">1</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"2\">2</div>\n      <div class=\"c-datepicker__clock-hands\">\n        <div class=\"c-datepicker__hour-hand\"></div>\n      </div>\n    </div>\n    <div class=\"c-datepicker__clock__minutes js-clock-minutes\">\n      <div class=\"c-datepicker__clock__num\" data-number=\"15\">15</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"20\">20</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"25\">25</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"30\">30</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"35\">35</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"40\">40</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"45\">45</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"50\">50</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"55\">55</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"0\">0</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"5\">5</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"10\">10</div>\n      <div class=\"c-datepicker__clock-hands\">\n        <div class=\"c-datepicker__hour-hand\"></div>\n      </div>\n    </div>\n  </div>\n  <div class=\"modal-btns\">\n    <a class=\"c-btn c-btn--flat js-cancel\">Cancel</a>\n    <a class=\"c-btn c-btn--flat js-ok\">OK</a>\n  </div>\n</div>\n";
});

var scrimTemplate = (function (_ref) {
  var styles = _ref.styles;
  return "\n<div class=\"" + styles.scrim + "\"></div>\n";
});

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

//
// basic event triggering and listening
//
var Events = function () {
  function Events() {
    classCallCheck(this, Events);

    this._events = {
      '*': []
    };
  }

  createClass(Events, [{
    key: 'trigger',
    value: function trigger(eventName, evtData) {
      var _this = this;

      eventName.split(' ').forEach(function (evtName) {
        // trigger a global event event
        _this._events['*'].forEach(function (evt) {
          return evt.fn.call(evt.scope, evtName, evtData);
        });
        // if there are any listeners to this event
        // then fire their handlers
        if (_this._events[evtName]) {
          _this._events[evtName].forEach(function (evt) {
            evt.fn.call(evt.scope, evtData);
          });
        }
      });
      return this;
    }
  }, {
    key: 'on',
    value: function on(eventName, fn, scope) {
      if (!this._events[eventName]) this._events[eventName] = [];
      this._events[eventName].push({
        eventName: eventName,
        fn: fn,
        scope: scope || this
      });
      return this;
    }
  }, {
    key: 'off',
    value: function off(eventName, fn) {
      if (!this._events[eventName]) return this;
      if (!fn) {
        this._events[eventName] = [];
      }
      this._events[eventName] = this._events[eventName].filter(function (evt) {
        return evt.fn !== fn;
      });
      return this;
    }
  }, {
    key: 'once',
    value: function once(eventName, fn, scope) {
      var _this2 = this;

      var func = function func() {
        fn.call(scope, eventName, fn, scope);
        _this2.off(eventName, func);
      };
      return this.on(eventName, func, scope);
    }
  }]);
  return Events;
}();

var ESC_KEY = 27;

var prefix = 'c-datepicker';
var defaults$$1 = function defaults$$1() {
  return {
    default: moment().startOf('hour'),
    // allow the user to override all the classes
    // used for styling the calendar
    styles: {
      scrim: 'c-scrim',
      back: prefix + '__back',
      container: prefix + '__calendar',
      date: prefix + '__date',
      dayBody: prefix + '__days-body',
      dayBodyElem: prefix + '__day-body',
      dayConcealed: prefix + '__day--concealed',
      dayDisabled: prefix + '__day--disabled',
      dayHead: prefix + '__days-head',
      dayHeadElem: prefix + '__day-head',
      dayRow: prefix + '__days-row',
      dayTable: prefix + '__days',
      month: prefix + '__month',
      next: prefix + '__next',
      positioned: prefix + '--fixed',
      selectedDay: prefix + '__day--selected',
      selectedTime: prefix + '__time--selected',
      time: prefix + '__time',
      timeList: prefix + '__time-list',
      timeOption: prefix + '__time-option',
      clockNum: prefix + '__clock__num'
    },
    // format to display in the input, or set on the element
    format: 'DD/MM/YY',
    // the container to append the picker
    container: document.body,
    // allow any dates
    dateValidator: undefined
  };
};

var DateTimePicker = function (_Events) {
  inherits(DateTimePicker, _Events);

  function DateTimePicker() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, DateTimePicker);

    var _this = possibleConstructorReturn(this, (DateTimePicker.__proto__ || Object.getPrototypeOf(DateTimePicker)).call(this));

    var styles = Object.assign(defaults$$1().styles, options.styles);
    _this.options = Object.assign(defaults$$1(), options);
    _this.options.styles = styles;

    // listen to any event
    _this.on('*', function (evtName, evtData) {
      if (_this.options.el) {
        // if there is a custom element, fire a real dom
        // event on that now
        var event = new CustomEvent(evtName, _this, evtData);
        _this.options.el.dispatchEvent(event);
      }
    });
    return _this;
  }

  // intialize the rom calendar with our default date and
  // style options


  createClass(DateTimePicker, [{
    key: 'initializeRome',
    value: function initializeRome(container, validator) {
      var onData = this.onChangeDate.bind(this);

      return rome(container, {
        styles: this.options.styles,
        time: false,
        dateValidator: validator,
        initialValue: this.value
      }).on('data', onData);
    }

    // called to open the picker

  }, {
    key: 'open',
    value: function open() {
      var scrimEl = scrimTemplate(this.options);
      _appendTemplate(document.body, scrimEl);
      _appendTemplate(this.options.container, popupTemplate());
      this.pickerEl = this.options.container.querySelector('.' + prefix);
      this.scrimEl = document.body.querySelector('.' + this.options.styles.scrim);
      this.amToggleEl = this.$('.c-datepicker__clock--am');
      this.pmToggleEl = this.$('.c-datepicker__clock--pm');

      if (!this.value) {
        // TODO hack
        // set/setDate/setTime need refactoring to have single concerns
        // (set: set the value; setDate/setTime rename to renderDate/renderTime
        //  and deal with updating the view only).
        // For now this allows us to set the default time using the same quantize
        // rules as setting the date explicitly. Setting this.value meets setTime|Date's
        // expectation that we have a value, and `0` guarantees that we will detect
        this.value = moment(0);
        this.setDate(this.options.default);
        this.setTime(this.options.default);
      } else {
        this.setDate(this.value);
        this.setTime(this.value);
      }

      this.initializeRome(this.$('.' + this.options.styles.container), this.options.dateValidator);
      this._listenForCloseEvents();

      this._show();
    }
  }, {
    key: 'close',
    value: function close() {
      this._stopListeningForCloseEvents();
      this._hide();
    }
  }, {
    key: '_hide',
    value: function _hide() {
      var _this2 = this;

      this.pickerEl.classList.remove('open');
      window.setTimeout(function () {
        _this2.options.container.removeChild(_this2.pickerEl);
        document.body.removeChild(_this2.scrimEl);
        _this2.trigger('close');
      }, 200);
      return this;
    }
  }, {
    key: '_show',
    value: function _show() {
      var _this3 = this;

      this.delegateEvents();
      // add the animation classes on the next animation tick
      // so that they actually work
      window.requestAnimationFrame(function () {
        _this3.scrimEl.classList.add(_this3.options.styles.scrim + '--shown');
        _this3.pickerEl.classList.add(prefix + '--open');
        _this3.trigger('open');
      });
      return this;
    }
  }, {
    key: '_listenForCloseEvents',
    value: function _listenForCloseEvents() {
      var _this4 = this;

      this._onWindowKeypress = function (e) {
        if (e.which === ESC_KEY) {
          _this4.close();
        }
      };

      window.addEventListener("keydown", this._onWindowKeypress);
    }
  }, {
    key: '_stopListeningForCloseEvents',
    value: function _stopListeningForCloseEvents() {
      window.removeEventListener("keydown", this._onWindowKeypress);
      this._closeHandler = null;
    }
  }, {
    key: 'delegateEvents',
    value: function delegateEvents() {
      var _this5 = this;

      this.$('.js-cancel').addEventListener('click', function () {
        return _this5.clickCancel();
      }, false);
      this.$('.js-ok').addEventListener('click', function () {
        return _this5.clickSubmit();
      }, false);

      this.$('.js-date-hours').addEventListener('click', function (e) {
        return _this5.showHourClock(e);
      }, false);
      this.$('.js-date-minutes').addEventListener('click', function (e) {
        return _this5.showMinuteClock(e);
      }, false);

      this.$('.js-clock-hours').addEventListener('mouseleave', function (e) {
        return _this5.mouseOutHourClock(e);
      }, false);
      this.$('.js-clock-hours .' + this.options.styles.clockNum).forEach(function (el) {
        el.addEventListener('click', function (e) {
          return _this5.clickClickHour(e).showMinuteClock();
        }, false);
        el.addEventListener('mouseenter', function (e) {
          return _this5.mouseInHourClock(e);
        }, false);
      });

      this.$('.js-clock-minutes').addEventListener('mouseleave', function (e) {
        return _this5.mouseOutMinuteClock(e);
      }, false);
      this.$('.js-clock-minutes .' + this.options.styles.clockNum).forEach(function (el) {
        el.addEventListener('click', function (e) {
          return _this5.clickClockMinute(e);
        }, false);
        el.addEventListener('mouseenter', function (e) {
          return _this5.mouseInMinuteClock(e);
        }, false);
      });

      this.$('.c-datepicker__clock--am').addEventListener('click', function (e) {
        return _this5.clickAm(e);
      }, false);
      this.$('.c-datepicker__clock--pm').addEventListener('click', function (e) {
        return _this5.clickPm(e);
      }, false);

      this.$('.js-show-calendar').addEventListener('click', function (e) {
        return _this5.clickShowCalendar(e);
      }, false);
      this.$('.js-date-day').addEventListener('click', function (e) {
        return _this5.clickShowCalendar(e);
      }, false);
      this.$('.js-date-month').addEventListener('click', function (e) {
        return _this5.clickShowCalendar(e);
      }, false);

      this.$('.js-show-clock').addEventListener('click', function (e) {
        return _this5.clickShowClock(e);
      }, false);

      this.scrimEl.addEventListener('click', function () {
        return _this5.close();
      }, false);

      return this;
    }
  }, {
    key: 'clickSubmit',
    value: function clickSubmit() {
      this.close();
      this.trigger('submit', this.value, this);
      return this;
    }
  }, {
    key: 'clickCancel',
    value: function clickCancel() {
      this.close();
      this.trigger('cancel', this.value, this);
      return this;
    }
  }, {
    key: 'clickClickHour',
    value: function clickClickHour(e) {
      var newValue = moment(this.value);
      var number = parseInt(e.currentTarget.getAttribute('data-number'), 10);
      if (number === 0 && this.meridiem === 'pm') {
        number = 12;
      } else if (this.meridiem === 'pm') {
        number += 12;
      }

      newValue.hour(number);
      this.set(newValue);
      return this;
    }
  }, {
    key: 'clickClockMinute',
    value: function clickClockMinute(e) {
      var newValue = moment(this.value);
      var number = parseInt(e.currentTarget.getAttribute('data-number'), 10);

      newValue.minute(number);
      this.set(newValue);
      return this;
    }
  }, {
    key: 'onChangeDate',
    value: function onChangeDate(dateString) {
      var newValue = moment(this.value);

      var _dateString$split = dateString.split('-'),
          _dateString$split2 = slicedToArray(_dateString$split, 3),
          year = _dateString$split2[0],
          month = _dateString$split2[1],
          date = _dateString$split2[2];

      newValue.set({ year: year, month: month - 1, date: date });

      this.set(newValue);
      return this;
    }
  }, {
    key: 'mouseInHourClock',
    value: function mouseInHourClock() {
      var active = this.$('.js-clock-hours .' + this.options.styles.clockNum + '--active');

      if (active) {
        active.classList.add('hide-hand');
      }
    }
  }, {
    key: 'mouseInMinuteClock',
    value: function mouseInMinuteClock() {
      var active = this.$('.js-clock-minutes .' + this.options.styles.clockNum + '--active');

      if (active) {
        active.classList.add('hide-hand');
      }
    }
  }, {
    key: 'mouseOutHourClock',
    value: function mouseOutHourClock() {
      var hideHand = this.$('.js-clock-hours .' + this.options.styles.clockNum + '--active.hide-hand');

      if (hideHand) {
        hideHand.classList.remove('hide-hand');
      }
    }
  }, {
    key: 'mouseOutMinuteClock',
    value: function mouseOutMinuteClock() {
      var hideHand = this.$('.js-clock-minutes .' + this.options.styles.clockNum + '--active.hide-hand');

      if (hideHand) {
        hideHand.classList.remove('hide-hand');
      }
    }
  }, {
    key: 'clickAm',
    value: function clickAm() {
      var newValue = moment(this.value);
      if (this.meridiem === 'pm') {
        this.meridiem = 'am';
        newValue.hour(newValue.hour() - 12);
      }
      this.set(newValue);
      return this;
    }
  }, {
    key: 'clickPm',
    value: function clickPm() {
      var newValue = moment(this.value);
      if (this.meridiem === 'am') {
        this.meridiem = 'pm';
        newValue.hour(newValue.hour() + 12);
      }
      this.set(newValue);
      return this;
    }
  }, {
    key: 'showHourClock',
    value: function showHourClock() {
      this.clickShowClock();
      this.$('.js-clock-hours').classList.add('active');
      this.$('.js-clock-minutes').classList.remove('active');
      this.$('.js-date-hours').classList.add('active');
      this.$('.js-date-minutes').classList.remove('active');
    }
  }, {
    key: 'showMinuteClock',
    value: function showMinuteClock() {
      this.clickShowClock();
      this.$('.js-clock-hours').classList.remove('active');
      this.$('.js-clock-minutes').classList.add('active');
      this.$('.js-date-hours').classList.remove('active');
      this.$('.js-date-minutes').classList.add('active');
    }
  }, {
    key: 'clickShowCalendar',
    value: function clickShowCalendar() {
      this.$('.js-show-calendar').classList.add('is-selected');
      this.$('.js-show-clock').classList.remove('is-selected');
    }
  }, {
    key: 'clickShowClock',
    value: function clickShowClock() {
      this.$('.js-show-clock').classList.add('is-selected');
      this.$('.js-show-calendar').classList.remove('is-selected');
    }
  }, {
    key: 'data',
    value: function data(val) {
      console.warn('MaterialDatetimePicker#data is deprecated and will be removed in a future release. Please use get or set.');
      return val ? this.set(val) : this.value;
    }
  }, {
    key: 'get',
    value: function get$$1() {
      return moment(this.value);
    }

    // update the picker's date/time value
    // value: moment
    // silent: if true, do not fire any events on change

  }, {
    key: 'set',
    value: function set$$1(value) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$silent = _ref.silent,
          silent = _ref$silent === undefined ? false : _ref$silent;

      var m = moment(value);

      // maintain a list of change events to fire all at once later
      var evts = [];
      if (m.date() !== this.value.date() || m.month() !== this.value.month() || m.year() !== this.value.year()) {
        this.setDate(m);
        evts.push('change:date');
      }

      if (m.hour() !== this.value.hour() || m.minutes() !== this.value.minutes()) {
        this.setTime(m);
        evts.push('change:time');
      }

      if (this.options.el) {
        // if there is an element to fire events on
        if (this.options.el.tagName === 'INPUT') {
          // and it is an input element then set the value
          this.options.el.value = m.format(this.options.format);
        } else {
          // or any other element set a data-value attribute
          this.options.el.setAttribute('data-value', m.format(this.options.format));
        }
      }
      if (evts.length > 0 && !silent) {
        // fire all the events we've collected
        this.trigger(['change'].concat(evts).join(' '), this.value, this);
      }
    }

    // set the value and header elements to `date`
    // the calendar will be updated automatically
    // by rome when clicked

  }, {
    key: 'setDate',
    value: function setDate(date) {
      var m = moment(date);
      var month = m.format('MMM');
      var day = m.format('Do');
      var dayOfWeek = m.format('dddd');
      var year = m.format('YYYY');

      this.$('.js-day').innerText = dayOfWeek;
      this.$('.js-date-month').innerText = month + ' ' + year;
      this.$('.js-date-day').innerText = day;
      this.value.year(m.year());
      this.value.month(m.month());
      this.value.date(m.date());
      return this;
    }

    // set the value and header elements to `time`
    // also update the hands of the clock

  }, {
    key: 'setTime',
    value: function setTime(time) {
      var m = moment(time);
      var minuteAsInt = Math.round(parseInt(m.format('mm'), 10) / 5) * 5;
      m.minutes(minuteAsInt);

      var hour = m.format('HH');
      var minutes = m.format('mm');
      var hourAsInt = parseInt(hour, 10) % 12;

      var oldActiveHours = this.$('.js-clock-hours .' + this.options.styles.clockNum + '--active');
      var oldActiveMinutes = this.$('.js-clock-minutes .' + this.options.styles.clockNum + '--active');

      this.$('.js-date-hours').innerText = hour;
      this.$('.js-date-minutes').innerText = minutes;

      if (oldActiveHours) {
        oldActiveHours.classList.remove(this.options.styles.clockNum + '--active');
      }

      if (oldActiveMinutes) {
        oldActiveMinutes.classList.remove(this.options.styles.clockNum + '--active');
      }

      this.$('.js-clock-hours .' + this.options.styles.clockNum + '[data-number="' + hourAsInt + '"]').classList.add(this.options.styles.clockNum + '--active');
      this.$('.js-clock-minutes .' + this.options.styles.clockNum + '[data-number="' + minuteAsInt + '"]').classList.add(this.options.styles.clockNum + '--active');

      this.value.hours(m.hours());
      this.value.minutes(m.minutes());
      this.meridiem = this.value.format('a');

      if (this.meridiem === 'pm') {
        this.amToggleEl.removeAttribute('checked');
        this.pmToggleEl.setAttribute('checked', 'checked');
        this.amToggleEl.parentElement.classList.remove('c-datepicker__toggle--checked');
        this.pmToggleEl.parentElement.classList.add('c-datepicker__toggle--checked');
      } else {
        this.pmToggleEl.removeAttribute('checked');
        this.amToggleEl.setAttribute('checked', 'checked');
        this.pmToggleEl.parentElement.classList.remove('c-datepicker__toggle--checked');
        this.amToggleEl.parentElement.classList.add('c-datepicker__toggle--checked');
      }
      return this;
    }
  }, {
    key: '$',
    value: function $(selector) {
      var els = this.pickerEl.querySelectorAll(selector);
      return els.length > 1 ? [].concat(toConsumableArray(els)) : els[0];
    }
  }]);
  return DateTimePicker;
}(Events);

function _appendTemplate(parent, template) {
  var tempEl = document.createElement('div');
  tempEl.innerHTML = template.trim();
  parent.appendChild(tempEl.firstChild);
  return this;
}

return DateTimePicker;

})));
//# sourceMappingURL=material-datetime-picker.js.map
