(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('rome'), require('moment')) :
	typeof define === 'function' && define.amd ? define(['rome', 'moment'], factory) :
	(global.MaterialDatetimePicker = factory(global.rome,global.moment));
}(this, (function (rome,moment) { 'use strict';

rome = 'default' in rome ? rome['default'] : rome;
moment = 'default' in moment ? moment['default'] : moment;

var popupTemplate = (function () {
  return "\n<div class=\"c-datepicker\">\n  <input class=\"c-datepicker__toggle c-datepicker__toggle--right c-datepicker--show-time\" type=\"radio\" name=\"date-toggle\" value=\"time\" >\n\n  <input class=\"c-datepicker__toggle c-datepicker__toggle--left  c-datepicker--show-calendar\" type=\"radio\" name=\"date-toggle\" value=\"calendar\" checked>\n\n  <div class=\"c-datepicker__header\">\n    <div class=\"c-datepicker__header-day\">\n      <span class=\"js-day\">Monday</span>\n    </div>\n    <div class=\"c-datepicker__header-date\">\n      <span class=\"c-datepicker__header-date__month js-date-month\"></span>\n      <span class=\"c-datepicker__header-date__day js-date-day\"></span>\n      <span class=\"c-datepicker__header-date__time js-date-time\">\n        <span class=\"c-datepicker__header-date__hours js-date-hours\">09</span>:<span class=\"c-datepicker__header-date__minutes js-date-minutes\">00</span>\n      </span>\n    </div>\n  </div>\n\n  <div class=\"c-datepicker__calendar\"></div>\n  <div class=\"c-datepicker__clock\">\n    <div class=\"c-datepicker__clock__am-pm-toggle\">\n      <label class=\"c-datepicker__toggle--checked\">\n        <input checked=\"checked\" class=\"c-datepicker__toggle c-datepicker__toggle--right c-datepicker__clock--am\" type=\"radio\" name=\"time-date-toggle\" value=\"AM\" />\n        AM\n      </label>\n\n      <label>\n        <input class=\"c-datepicker__toggle c-datepicker__toggle--right c-datepicker__clock--pm\" type=\"radio\" name=\"time-date-toggle\" value=\"PM\" />\n        PM\n      </label>\n    </div>\n\n    <div class=\"c-datepicker__clock__hours\">\n      <div class=\"c-datepicker__clock__num\" data-number=\"3\">3</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"4\">4</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"5\">5</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"6\">6</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"7\">7</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"8\">8</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"9\">9</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"10\">10</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"11\">11</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"0\">12</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"1\">1</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"2\">2</div>\n      <div class=\"c-datepicker__clock-hands\">\n        <div class=\"c-datepicker__hour-hand\"></div>\n      </div>\n    </div>\n    <div class=\"c-datepicker__clock__minutes\">\n      <div class=\"c-datepicker__clock__num\" data-number=\"15\">15</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"20\">20</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"25\">25</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"30\">30</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"35\">35</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"40\">40</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"45\">45</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"50\">50</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"55\">55</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"0\">0</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"5\">5</div>\n      <div class=\"c-datepicker__clock__num\" data-number=\"10\">10</div>\n      <div class=\"c-datepicker__clock-hands\">\n        <div class=\"c-datepicker__hour-hand\"></div>\n      </div>\n    </div>\n  </div>\n  <div class=\"modal-btns\">\n    <a class=\"c-btn c-btn--flat js-cancel\">Cancel</a>\n    <a class=\"c-btn c-btn--flat js-ok\">OK</a>\n  </div>\n</div>\n";
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
      var _this2 = this;

      return rome(container, {
        styles: this.options.styles,
        time: false,
        dateValidator: validator,
        initialValue: this.value
      }).on('data', function (value) {
        return _this2.set(value);
      });
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
        this.value = moment(this.options.default);
      }

      this.setDate(this.value);
      this.initializeRome(this.$('.' + this.options.styles.container), this.options.dateValidator);
      this._show();
    }
  }, {
    key: 'close',
    value: function close() {
      this._hide();
    }
  }, {
    key: '_hide',
    value: function _hide() {
      var _this3 = this;

      this.pickerEl.classList.remove('open');
      window.setTimeout(function () {
        _this3.options.container.removeChild(_this3.pickerEl);
        document.body.removeChild(_this3.scrimEl);
        _this3.trigger('close');
      }, 200);
      return this;
    }
  }, {
    key: '_show',
    value: function _show() {
      var _this4 = this;

      this.delegateEvents();
      // add the animation classes on the next animation tick
      // so that they actually work
      window.requestAnimationFrame(function () {
        _this4.scrimEl.classList.add(_this4.options.styles.scrim + '--shown');
        _this4.pickerEl.classList.add(prefix + '--open');
        _this4.trigger('open');
      });
      return this;
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

      this.$('.' + this.options.styles.clockNum).forEach(function (el) {
        el.addEventListener('click', function (e) {
          return _this5.clickClock(e);
        }, false);
      });

      this.$('.c-datepicker__clock--am').addEventListener('click', function (e) {
        return _this5.clickAm(e);
      }, false);
      this.$('.c-datepicker__clock--pm').addEventListener('click', function (e) {
        return _this5.clickPm(e);
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
    key: 'clickClock',
    value: function clickClock(e) {
      var number = parseInt(e.currentTarget.getAttribute('data-number'), 10);
      if (number === 0 && this.meridiem === 'pm') {
        number = 12;
      } else if (this.meridiem === 'pm') {
        number += 12;
      }

      this.value.hour(number);
      this.setTime(this.value);
      return this;
    }
  }, {
    key: 'clickAm',
    value: function clickAm() {
      if (this.meridiem === 'pm') {
        this.meridiem = 'am';
        this.value.hour(this.value.hour() - 12);
      }
      this.setTime(this.value);
      return this;
    }
  }, {
    key: 'clickPm',
    value: function clickPm() {
      if (this.meridiem === 'am') {
        this.meridiem = 'pm';
        this.value.hour(this.value.hour() + 12);
      }
      this.setTime(this.value);
      return this;
    }
  }, {
    key: 'data',
    value: function data(val) {
      return val ? this.set(val) : this.value;
    }
  }, {
    key: 'set',
    value: function set$$1(value, opts) {
      var m = moment(value);

      // maintain a list of change events to fire all at once later
      var evts = [];
      if (m.date() !== this.value.date() || m.month() !== this.value.month() || m.year() !== this.value.year()) {
        this.setDate(m);
        evts.push('change:date');
      } else {
        // otherwise just the time is being set
        // so fire a change:time event
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
      if (!opts || !opts.silent) {
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
      var hour = m.format('HH');
      var hourAsInt = parseInt(hour, 10) % 12;

      this.$('.js-date-hours').innerText = hour;

      this.$('.c-datepicker__clock__hours .' + this.options.styles.clockNum + '[data-number="' + hourAsInt + '"]').classList.add('.' + this.options.styles.clockNum + '--active');
      this.value.hours(m.hours());
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
