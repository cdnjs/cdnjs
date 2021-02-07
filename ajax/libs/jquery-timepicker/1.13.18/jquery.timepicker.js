/*!
 * jquery-timepicker v1.13.18 - A jQuery timepicker plugin inspired by Google Calendar. It supports both mouse and keyboard navigation.
 * Copyright (c) 2021 Jon Thornton - https://www.jonthornton.com/jquery-timepicker/
 * License: MIT
 */
(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var ONE_DAY = 86400;

  var roundingFunction = function roundingFunction(seconds, settings) {
    if (seconds === null) {
      return null;
    } else if (typeof settings.step !== "number") {
      // TODO: nearest fit irregular steps
      return seconds;
    } else {
      var _settings$minTime;

      var offset = seconds % (settings.step * 60); // step is in minutes

      var start = (_settings$minTime = settings.minTime()) !== null && _settings$minTime !== void 0 ? _settings$minTime : 0; // adjust offset by start mod step so that the offset is aligned not to 00:00 but to the start

      offset -= start % (settings.step * 60);

      if (offset >= settings.step * 30) {
        // if offset is larger than a half step, round up
        seconds += settings.step * 60 - offset;
      } else {
        // round down
        seconds -= offset;
      }

      return _moduloSeconds(seconds, settings);
    }
  };

  function _moduloSeconds(seconds, settings) {
    if (seconds == ONE_DAY && settings.show2400) {
      return seconds;
    }

    return seconds % ONE_DAY;
  }

  var DEFAULT_SETTINGS = {
    appendTo: "body",
    className: null,
    closeOnWindowScroll: false,
    disableTextInput: false,
    disableTimeRanges: [],
    disableTouchKeyboard: false,
    durationTime: null,
    forceRoundTime: false,
    lang: {},
    listWidth: null,
    maxTime: null,
    minTime: null,
    noneOption: false,
    orientation: "l",
    roundingFunction: roundingFunction,
    scrollDefault: null,
    selectOnBlur: false,
    show2400: false,
    showDuration: false,
    showOn: ["click", "focus"],
    showOnFocus: true,
    step: 30,
    stopScrollPropagation: false,
    timeFormat: "g:ia",
    typeaheadHighlight: true,
    useSelect: false,
    wrapHours: true
  };
  var DEFAULT_LANG = {
    am: "am",
    pm: "pm",
    AM: "AM",
    PM: "PM",
    decimal: ".",
    mins: "mins",
    hr: "hr",
    hrs: "hrs"
  };

  var EVENT_DEFAULTS = {
    bubbles: true,
    cancelable: false,
    detail: null
  };

  var Timepicker = /*#__PURE__*/function () {
    function Timepicker(targetEl) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Timepicker);

      this._handleFormatValue = this._handleFormatValue.bind(this);
      this._handleKeyUp = this._handleKeyUp.bind(this);
      this.targetEl = targetEl;
      var attrOptions = Timepicker.extractAttrOptions(targetEl, Object.keys(DEFAULT_SETTINGS));
      this.settings = this.parseSettings(_objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_SETTINGS), options), attrOptions));
    }

    _createClass(Timepicker, [{
      key: "hideMe",
      value: function hideMe() {
        if (this.settings.useSelect) {
          this.targetEl.blur();
          return;
        }

        if (!this.list || !Timepicker.isVisible(this.list)) {
          return;
        }

        if (this.settings.selectOnBlur) {
          this._selectValue();
        }

        this.list.hide();
        var hideTimepickerEvent = new CustomEvent('hideTimepicker', EVENT_DEFAULTS);
        this.targetEl.dispatchEvent(hideTimepickerEvent);
      }
    }, {
      key: "_findRow",
      value: function _findRow(value) {
        if (!value && value !== 0) {
          return false;
        }

        var out = false;
        var value = this.settings.roundingFunction(value, this.settings);

        if (!this.list) {
          return false;
        }

        this.list.find("li").each(function (i, obj) {
          var parsed = parseInt(obj.dataset.time);

          if (isNaN(parsed)) {
            return;
          }

          if (parsed == value) {
            out = obj;
            return false;
          }
        });
        return out;
      }
    }, {
      key: "_hideKeyboard",
      value: function _hideKeyboard() {
        return (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.settings.disableTouchKeyboard;
      }
    }, {
      key: "_setTimeValue",
      value: function _setTimeValue(value, source) {
        if (this.targetEl.nodeName === "INPUT") {
          if (value !== null || this.targetEl.value != "") {
            this.targetEl.value = value;
          }

          var tp = this;
          var settings = tp.settings;

          if (settings.useSelect && source != "select" && tp.list) {
            tp.list.val(tp._roundAndFormatTime(tp.anytime2int(value)));
          }
        }

        var selectTimeEvent = new CustomEvent('selectTime', EVENT_DEFAULTS);

        if (this.selectedValue != value) {
          this.selectedValue = value;
          var changeTimeEvent = new CustomEvent('changeTime', EVENT_DEFAULTS);
          var changeEvent = new CustomEvent('change', Object.assign(EVENT_DEFAULTS, {
            detail: 'timepicker'
          }));

          if (source == "select") {
            this.targetEl.dispatchEvent(selectTimeEvent);
            this.targetEl.dispatchEvent(changeTimeEvent);
            this.targetEl.dispatchEvent(changeEvent);
          } else if (["error", "initial"].indexOf(source) == -1) {
            this.targetEl.dispatchEvent(changeTimeEvent);
          }

          return true;
        } else {
          if (["error", "initial"].indexOf(source) == -1) {
            this.targetEl.dispatchEvent(selectTimeEvent);
          }

          return false;
        }
      }
    }, {
      key: "_getTimeValue",
      value: function _getTimeValue() {
        if (this.targetEl.nodeName === "INPUT") {
          return this.targetEl.value;
        } else {
          // use the element's data attributes to store values
          return this.selectedValue;
        }
      }
    }, {
      key: "_selectValue",
      value: function _selectValue() {
        var tp = this;
        tp.settings;
        var list = tp.list;
        var cursor = list.find(".ui-timepicker-selected");

        if (cursor.hasClass("ui-timepicker-disabled")) {
          return false;
        }

        if (!cursor.length) {
          return true;
        }

        var timeValue = cursor.get(0).dataset.time; // selected value found

        if (timeValue) {
          var parsedTimeValue = parseInt(timeValue);

          if (!isNaN(parsedTimeValue)) {
            timeValue = parsedTimeValue;
          }
        }

        if (timeValue !== null) {
          if (typeof timeValue != "string") {
            timeValue = tp._int2time(timeValue);
          }

          tp._setTimeValue(timeValue, "select");
        }

        return true;
      }
    }, {
      key: "anytime2int",
      value: function anytime2int(input) {
        if (typeof input === 'number') {
          return input;
        } else if (typeof input === 'string') {
          return this.time2int(input);
        } else if (_typeof(input) === 'object' && input instanceof Date) {
          return input.getHours() * 3600 + input.getMinutes() * 60 + input.getSeconds();
        } else if (typeof input == 'function') {
          return input();
        } else {
          return null;
        }
      }
    }, {
      key: "time2int",
      value: function time2int(timeString) {
        if (timeString === "" || timeString === null || timeString === undefined) {
          return null;
        }

        if (timeString === 'now') {
          return this.anytime2int(new Date());
        }

        if (typeof timeString != "string") {
          return timeString;
        }

        timeString = timeString.toLowerCase().replace(/[\s\.]/g, ""); // if the last character is an "a" or "p", add the "m"

        if (timeString.slice(-1) == "a" || timeString.slice(-1) == "p") {
          timeString += "m";
        }

        var pattern = /^(([^0-9]*))?([0-9]?[0-9])(([0-5][0-9]))?(([0-5][0-9]))?(([^0-9]*))$/;
        var hasDelimetersMatch = timeString.match(/\W/);

        if (hasDelimetersMatch) {
          pattern = /^(([^0-9]*))?([0-9]?[0-9])(\W+([0-5][0-9]?))?(\W+([0-5][0-9]))?(([^0-9]*))$/;
        }

        var time = timeString.match(pattern);

        if (!time) {
          return null;
        }

        var hour = parseInt(time[3] * 1, 10);
        var ampm = time[2] || time[9];
        var hours = hour;
        var minutes = time[5] * 1 || 0;
        var seconds = time[7] * 1 || 0;

        if (!ampm && time[3].length == 2 && time[3][0] == "0") {
          // preceding '0' implies AM
          ampm = "am";
        }

        if (hour <= 12 && ampm) {
          ampm = ampm.trim();
          var isPm = ampm == this.settings.lang.pm || ampm == this.settings.lang.PM;

          if (hour == 12) {
            hours = isPm ? 12 : 0;
          } else {
            hours = hour + (isPm ? 12 : 0);
          }
        } else {
          var t = hour * 3600 + minutes * 60 + seconds;

          if (t >= ONE_DAY + (this.settings.show2400 ? 1 : 0)) {
            if (this.settings.wrapHours === false) {
              return null;
            }

            hours = hour % 24;
          }
        }

        var timeInt = hours * 3600 + minutes * 60 + seconds; // if no am/pm provided, intelligently guess based on the scrollDefault

        if (hour < 12 && !ampm && this.settings._twelveHourTime && this.settings.scrollDefault()) {
          var delta = timeInt - this.settings.scrollDefault();

          if (delta < 0 && delta >= ONE_DAY / -2) {
            timeInt = (timeInt + ONE_DAY / 2) % ONE_DAY;
          }
        }

        return timeInt;
      }
    }, {
      key: "intStringDateOrFunc2func",
      value: function intStringDateOrFunc2func(input) {
        var _this = this;

        if (input === null || input === undefined) {
          return function () {
            return null;
          };
        } else if (typeof input === 'function') {
          return function () {
            return _this.anytime2int(input());
          };
        } else {
          return function () {
            return _this.anytime2int(input);
          };
        }
      }
    }, {
      key: "parseSettings",
      value: function parseSettings(settings) {
        settings.lang = _objectSpread2(_objectSpread2({}, DEFAULT_LANG), settings.lang); // lang is used by other functions the rest of this depends on
        // todo: unwind circular dependency on lang

        this.settings = settings;

        if (settings.listWidth) {
          settings.listWidth = this.anytime2int(settings.listWidth);
        }

        settings.minTime = this.intStringDateOrFunc2func(settings.minTime);
        settings.maxTime = this.intStringDateOrFunc2func(settings.maxTime);
        settings.durationTime = this.intStringDateOrFunc2func(settings.durationTime);

        if (settings.scrollDefault) {
          settings.scrollDefault = this.intStringDateOrFunc2func(settings.scrollDefault);
        } else {
          settings.scrollDefault = settings.minTime;
        }

        if (typeof settings.timeFormat === "string" && settings.timeFormat.match(/[gh]/)) {
          settings._twelveHourTime = true;
        }

        if (settings.showOnFocus === false && settings.showOn.indexOf("focus") != -1) {
          settings.showOn.splice(settings.showOn.indexOf("focus"), 1);
        }

        if (!settings.disableTimeRanges) {
          settings.disableTimeRanges = [];
        }

        if (settings.disableTimeRanges.length > 0) {
          // convert string times to integers
          for (var i in settings.disableTimeRanges) {
            settings.disableTimeRanges[i] = [this.anytime2int(settings.disableTimeRanges[i][0]), this.anytime2int(settings.disableTimeRanges[i][1])];
          } // sort by starting time


          settings.disableTimeRanges = settings.disableTimeRanges.sort(function (a, b) {
            return a[0] - b[0];
          }); // merge any overlapping ranges

          for (var i = settings.disableTimeRanges.length - 1; i > 0; i--) {
            if (settings.disableTimeRanges[i][0] <= settings.disableTimeRanges[i - 1][1]) {
              settings.disableTimeRanges[i - 1] = [Math.min(settings.disableTimeRanges[i][0], settings.disableTimeRanges[i - 1][0]), Math.max(settings.disableTimeRanges[i][1], settings.disableTimeRanges[i - 1][1])];
              settings.disableTimeRanges.splice(i, 1);
            }
          }
        }

        return settings;
      }
      /*
       *  Filter freeform input
       */

    }, {
      key: "_disableTextInputHandler",
      value: function _disableTextInputHandler(e) {
        switch (e.keyCode) {
          case 13: // return

          case 9:
            //tab
            return;

          default:
            e.preventDefault();
        }
      }
    }, {
      key: "_int2duration",
      value: function _int2duration(seconds, step) {
        seconds = Math.abs(seconds);
        var minutes = Math.round(seconds / 60),
            duration = [],
            hours,
            mins;

        if (minutes < 60) {
          // Only show (x mins) under 1 hour
          duration = [minutes, this.settings.lang.mins];
        } else {
          hours = Math.floor(minutes / 60);
          mins = minutes % 60; // Show decimal notation (eg: 1.5 hrs) for 30 minute steps

          if (step == 30 && mins == 30) {
            hours += this.settings.lang.decimal + 5;
          }

          duration.push(hours);
          duration.push(hours == 1 ? this.settings.lang.hr : this.settings.lang.hrs); // Show remainder minutes notation (eg: 1 hr 15 mins) for non-30 minute steps
          // and only if there are remainder minutes to show

          if (step != 30 && mins) {
            duration.push(mins);
            duration.push(this.settings.lang.mins);
          }
        }

        return duration.join(" ");
      }
    }, {
      key: "_roundAndFormatTime",
      value: function _roundAndFormatTime(seconds) {
        seconds = this.settings.roundingFunction(seconds, this.settings);

        if (seconds !== null) {
          return this._int2time(seconds);
        }
      }
    }, {
      key: "_int2time",
      value: function _int2time(timeInt) {
        if (typeof timeInt != "number") {
          return null;
        }

        var seconds = parseInt(timeInt % 60),
            minutes = parseInt(timeInt / 60 % 60),
            hours = parseInt(timeInt / (60 * 60) % 24);
        var time = new Date(1970, 0, 2, hours, minutes, seconds, 0);

        if (isNaN(time.getTime())) {
          return null;
        }

        if (typeof this.settings.timeFormat === "function") {
          return this.settings.timeFormat(time);
        }

        var output = "";
        var hour, code;

        for (var i = 0; i < this.settings.timeFormat.length; i++) {
          code = this.settings.timeFormat.charAt(i);

          switch (code) {
            case "a":
              output += time.getHours() > 11 ? this.settings.lang.pm : this.settings.lang.am;
              break;

            case "A":
              output += time.getHours() > 11 ? this.settings.lang.PM : this.settings.lang.AM;
              break;

            case "g":
              hour = time.getHours() % 12;
              output += hour === 0 ? "12" : hour;
              break;

            case "G":
              hour = time.getHours();
              if (timeInt === ONE_DAY) hour = this.settings.show2400 ? 24 : 0;
              output += hour;
              break;

            case "h":
              hour = time.getHours() % 12;

              if (hour !== 0 && hour < 10) {
                hour = "0" + hour;
              }

              output += hour === 0 ? "12" : hour;
              break;

            case "H":
              hour = time.getHours();
              if (timeInt === ONE_DAY) hour = this.settings.show2400 ? 24 : 0;
              output += hour > 9 ? hour : "0" + hour;
              break;

            case "i":
              var minutes = time.getMinutes();
              output += minutes > 9 ? minutes : "0" + minutes;
              break;

            case "s":
              seconds = time.getSeconds();
              output += seconds > 9 ? seconds : "0" + seconds;
              break;

            case "\\":
              // escape character; add the next character and skip ahead
              i++;
              output += this.settings.timeFormat.charAt(i);
              break;

            default:
              output += code;
          }
        }

        return output;
      }
    }, {
      key: "_setSelected",
      value: function _setSelected() {
        var list = this.list;
        list.find("li").removeClass("ui-timepicker-selected");
        var timeValue = this.anytime2int(this._getTimeValue());

        if (timeValue === null) {
          return;
        }

        var selected = this._findRow(timeValue);

        if (selected) {
          var selectedRect = selected.getBoundingClientRect();
          var listRect = list.get(0).getBoundingClientRect();
          var topDelta = selectedRect.top - listRect.top;

          if (topDelta + selectedRect.height > listRect.height || topDelta < 0) {
            var newScroll = list.scrollTop() + (selectedRect.top - listRect.top) - selectedRect.height;
            list.scrollTop(newScroll);
          }

          var parsed = parseInt(selected.dataset.time);

          if (this.settings.forceRoundTime || parsed === timeValue) {
            selected.classList.add('ui-timepicker-selected');
          }
        }
      }
    }, {
      key: "_isFocused",
      value: function _isFocused(el) {
        return el === document.activeElement;
      }
    }, {
      key: "_handleFormatValue",
      value: function _handleFormatValue(e) {
        if (e && e.detail == "timepicker") {
          return;
        }

        this._formatValue(e);
      }
    }, {
      key: "_formatValue",
      value: function _formatValue(e, origin) {
        if (this.targetEl.value === "") {
          this._setTimeValue(null, origin);

          return;
        } // IE fires change event before blur


        if (this._isFocused(this.targetEl) && (!e || e.type != "change")) {
          return;
        }

        var settings = this.settings;
        var seconds = this.anytime2int(this.targetEl.value);

        if (seconds === null) {
          var timeFormatErrorEvent = new CustomEvent('timeFormatError', EVENT_DEFAULTS);
          this.targetEl.dispatchEvent(timeFormatErrorEvent);
          return;
        }

        var rangeError = false; // check that the time in within bounds

        if (settings.minTime !== null && settings.maxTime !== null && (seconds < settings.minTime() || seconds > settings.maxTime())) {
          rangeError = true;
        } // check that time isn't within disabled time ranges


        var _iterator = _createForOfIteratorHelper(settings.disableTimeRanges),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var range = _step.value;

            if (seconds >= range[0] && seconds < range[1]) {
              rangeError = true;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (settings.forceRoundTime) {
          var roundSeconds = settings.roundingFunction(seconds, settings);

          if (roundSeconds != seconds) {
            seconds = roundSeconds;
            origin = null;
          }
        }

        var prettyTime = this._int2time(seconds);

        if (rangeError) {
          this._setTimeValue(prettyTime);

          var timeRangeErrorEvent = new CustomEvent('timeRangeError', EVENT_DEFAULTS);
          this.targetEl.dispatchEvent(timeRangeErrorEvent);
        } else {
          this._setTimeValue(prettyTime, origin);
        }
      }
    }, {
      key: "_generateNoneElement",
      value: function _generateNoneElement(optionValue, useSelect) {
        var label, className, value;

        if (_typeof(optionValue) == "object") {
          label = optionValue.label;
          className = optionValue.className;
          value = optionValue.value;
        } else if (typeof optionValue == "string") {
          label = optionValue;
          value = "";
        } else {
          $.error("Invalid noneOption value");
        }

        var el;

        if (useSelect) {
          el = document.createElement("option");
          el.value = value;
        } else {
          el = document.createElement("li");
          el.dataset.time = String(value);
        }

        el.innerText = label;
        el.classList.add(className);
        return el;
      }
      /*
       *  Time typeahead
       */

    }, {
      key: "_handleKeyUp",
      value: function _handleKeyUp(e) {
        var _this2 = this;

        if (!this.list || !Timepicker.isVisible(this.list) || this.settings.disableTextInput) {
          return true;
        }

        if (e.type === "paste" || e.type === "cut") {
          var handler = function handler() {
            if (_this2.settings.typeaheadHighlight) {
              _this2._setSelected();
            } else {
              _this2.list.hide();
            }
          };

          setTimeout(handler, 0);
          return;
        }

        switch (e.keyCode) {
          case 96: // numpad numerals

          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 48: // numerals

          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
          case 65: // a

          case 77: // m

          case 80: // p

          case 186: // colon

          case 8: // backspace

          case 46:
            // delete
            if (this.settings.typeaheadHighlight) {
              this._setSelected();
            } else {
              this.list.hide();
            }

            break;
        }
      }
    }], [{
      key: "extractAttrOptions",
      value: function extractAttrOptions(element, keys) {
        var output = {};

        var _iterator2 = _createForOfIteratorHelper(keys),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var key = _step2.value;

            if (key in element.dataset) {
              output[key] = element.dataset[key];
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return output;
      }
    }, {
      key: "isVisible",
      value: function isVisible(elem) {
        var el = elem[0];
        return el.offsetWidth > 0 && el.offsetHeight > 0;
      }
    }, {
      key: "hideAll",
      value: function hideAll() {
        var _iterator3 = _createForOfIteratorHelper(document.getElementsByClassName('ui-timepicker-input')),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var el = _step3.value;
            var tp = el.timepickerObj;

            if (tp) {
              tp.hideMe();
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }]);

    return Timepicker;
  }(); // IE9-11 polyfill for CustomEvent


  (function () {
    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
      if (!params) {
        params = {};
      }

      params = Object.assign(EVENT_DEFAULTS, params);
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }

    window.CustomEvent = CustomEvent;
  })();

  (function (factory) {
    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && exports && (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module && module.exports === exports) {
      // Browserify. Attach to jQuery module.
      factory(require("jquery"));
    } else if (typeof define === "function" && define.amd) {
      // AMD. Register as an anonymous module.
      define(["jquery"], factory);
    } else {
      // Browser globals
      factory(jQuery);
    }
  })(function ($) {
    var methods = {
      init: function init(options) {
        return this.each(function () {
          var self = $(this);
          var tp = new Timepicker(this, options);
          var settings = tp.settings;
          settings.lang;
          this.timepickerObj = tp;
          self.addClass("ui-timepicker-input");

          if (settings.useSelect) {
            _render(self);
          } else {
            self.prop("autocomplete", "off");

            if (settings.showOn) {
              for (var i in settings.showOn) {
                self.on(settings.showOn[i] + ".timepicker", methods.show);
              }
            }

            self.on("change.timepicker", tp._handleFormatValue);
            self.on("keydown.timepicker", _keydownhandler);
            self.on("keyup.timepicker", tp._handleKeyUp);

            if (settings.disableTextInput) {
              self.on("keydown.timepicker", tp._disableTextInputHandler);
            }

            self.on("cut.timepicker", tp._handleKeyUp);
            self.on("paste.timepicker", tp._handleKeyUp);

            tp._formatValue(null, "initial");
          }
        });
      },
      show: function show(e) {
        var self = $(this);
        var tp = self[0].timepickerObj;
        var settings = tp.settings;

        if (e) {
          e.preventDefault();
        }

        if (settings.useSelect) {
          tp.list.trigger('focus');
          return;
        }

        if (tp._hideKeyboard()) {
          // block the keyboard on mobile devices
          self.trigger('blur');
        }

        var list = tp.list; // check if input is readonly

        if (self.prop("readonly")) {
          return;
        } // check if list needs to be rendered


        _render(self);

        list = tp.list;

        if (Timepicker.isVisible(list)) {
          return;
        }

        if (self.is('input')) {
          tp.selectedValue = self.val();
        }

        tp._setSelected(); // make sure other pickers are hidden


        Timepicker.hideAll();

        if (typeof settings.listWidth == "number") {
          list.width(self.outerWidth() * settings.listWidth);
        } // position the dropdown relative to the input


        list.show();
        var listOffset = {};

        if (settings.orientation.match(/r/)) {
          // right-align the dropdown
          listOffset.left = self.offset().left + self.outerWidth() - list.outerWidth() + parseInt(list.css("marginLeft").replace("px", ""), 10);
        } else if (settings.orientation.match(/l/)) {
          // left-align the dropdown
          listOffset.left = self.offset().left + parseInt(list.css("marginLeft").replace("px", ""), 10);
        } else if (settings.orientation.match(/c/)) {
          // center-align the dropdown
          listOffset.left = self.offset().left + (self.outerWidth() - list.outerWidth()) / 2 + parseInt(list.css("marginLeft").replace("px", ""), 10);
        }

        var verticalOrientation;

        if (settings.orientation.match(/t/)) {
          verticalOrientation = "t";
        } else if (settings.orientation.match(/b/)) {
          verticalOrientation = "b";
        } else if (self.offset().top + self.outerHeight(true) + list.outerHeight() > $(window).height() + $(window).scrollTop()) {
          verticalOrientation = "t";
        } else {
          verticalOrientation = "b";
        }

        if (verticalOrientation == "t") {
          // position the dropdown on top
          list.addClass("ui-timepicker-positioned-top");
          listOffset.top = self.offset().top - list.outerHeight() + parseInt(list.css("marginTop").replace("px", ""), 10);
        } else {
          // put it under the input
          list.removeClass("ui-timepicker-positioned-top");
          listOffset.top = self.offset().top + self.outerHeight() + parseInt(list.css("marginTop").replace("px", ""), 10);
        }

        list.offset(listOffset); // position scrolling

        var selected = list.find(".ui-timepicker-selected");

        if (!selected.length) {
          var timeInt = tp.anytime2int(tp._getTimeValue());

          if (timeInt !== null) {
            selected = $(tp._findRow(timeInt));
          } else if (settings.scrollDefault()) {
            selected = $(tp._findRow(settings.scrollDefault()));
          }
        } // if not found or disabled, intelligently find first selectable element


        if (!selected.length || selected.hasClass("ui-timepicker-disabled")) {
          selected = list.find("li:not(.ui-timepicker-disabled):first");
        }

        if (selected && selected.length) {
          var topOffset = list.scrollTop() + selected.position().top - selected.outerHeight();
          list.scrollTop(topOffset);
        } else {
          list.scrollTop(0);
        } // prevent scroll propagation


        if (settings.stopScrollPropagation) {
          $(document).on("wheel.ui-timepicker", ".ui-timepicker-wrapper", function (e) {
            e.preventDefault();
            var currentScroll = $(this).scrollTop();
            $(this).scrollTop(currentScroll + e.originalEvent.deltaY);
          });
        } // attach close handlers


        $(document).on("mousedown.ui-timepicker", _closeHandler);
        window.addEventListener('resize', _closeHandler);

        if (settings.closeOnWindowScroll) {
          $(document).on("scroll.ui-timepicker", _closeHandler);
        }

        self.trigger("showTimepicker");
        return this;
      },
      hide: function hide(e) {
        var tp = this[0].timepickerObj;

        if (tp) {
          tp.hideMe();
        }

        Timepicker.hideAll();
        return this;
      },
      option: function option(key, value) {
        if (typeof key == "string" && typeof value == "undefined") {
          var tp = this[0].timepickerObj;
          return tp.settings[key];
        }

        return this.each(function () {
          var self = $(this);
          var tp = self[0].timepickerObj;
          var settings = tp.settings;
          var list = tp.list;

          if (_typeof(key) == "object") {
            settings = $.extend(settings, key);
          } else if (typeof key == "string") {
            settings[key] = value;
          }

          settings = tp.parseSettings(settings);
          tp.settings = settings;

          tp._formatValue({
            type: "change"
          }, "initial");

          if (list) {
            list.remove();
            tp.list = null;
          }

          if (settings.useSelect) {
            _render(self);
          }
        });
      },
      getSecondsFromMidnight: function getSecondsFromMidnight() {
        var tp = this[0].timepickerObj;
        return tp.anytime2int(tp._getTimeValue());
      },
      getTime: function getTime(relative_date) {
        var tp = this[0].timepickerObj;

        var time_string = tp._getTimeValue();

        if (!time_string) {
          return null;
        }

        var offset = tp.anytime2int(time_string);

        if (offset === null) {
          return null;
        }

        if (!relative_date) {
          relative_date = new Date();
        } // construct a Date from relative date, and offset's time


        var time = new Date(relative_date);
        time.setHours(offset / 3600);
        time.setMinutes(offset % 3600 / 60);
        time.setSeconds(offset % 60);
        time.setMilliseconds(0);
        return time;
      },
      isVisible: function isVisible() {
        var tp = this[0].timepickerObj;
        return !!(tp && tp.list && Timepicker.isVisible(tp.list));
      },
      setTime: function setTime(value) {
        var tp = this[0].timepickerObj;
        var settings = tp.settings;

        if (settings.forceRoundTime) {
          var prettyTime = tp._roundAndFormatTime(tp.anytime2int(value));
        } else {
          var prettyTime = tp._int2time(tp.anytime2int(value));
        }

        if (value && prettyTime === null && settings.noneOption) {
          prettyTime = value;
        }

        tp._setTimeValue(prettyTime, "initial");

        tp._formatValue({
          type: "change"
        }, "initial");

        if (tp && tp.list) {
          tp._setSelected();
        }

        return this;
      },
      remove: function remove() {
        var self = this; // check if this element is a timepicker

        if (!self.hasClass("ui-timepicker-input")) {
          return;
        }

        var tp = self[0].timepickerObj;
        var settings = tp.settings;
        self.removeAttr("autocomplete", "off");
        self.removeClass("ui-timepicker-input");
        self.removeData("timepicker-obj");
        self.off(".timepicker"); // timepicker-list won't be present unless the user has interacted with this timepicker

        if (tp.list) {
          tp.list.remove();
        }

        if (settings.useSelect) {
          self.show();
        }

        tp.list = null;
        return this;
      }
    }; // private methods

    function _render(self) {
      var _settings$durationTim, _settings$minTime, _settings$maxTime;

      var tp = self[0].timepickerObj;
      var list = tp.list;
      var settings = tp.settings;

      if (list && list.length) {
        list.remove();
        tp.list = null;
      }

      if (settings.useSelect) {
        list = $("<select></select>", {
          "class": "ui-timepicker-select"
        });

        if (self.attr("name")) {
          list.attr("name", "ui-timepicker-" + self.attr("name"));
        }

        var wrapped_list = list;
      } else {
        list = $("<ul></ul>", {
          "class": "ui-timepicker-list"
        });
        var wrapped_list = $("<div></div>", {
          "class": "ui-timepicker-wrapper",
          tabindex: -1
        });
        wrapped_list.css({
          display: "none",
          position: "absolute"
        }).append(list);
      }

      if (settings.noneOption) {
        if (settings.noneOption === true) {
          settings.noneOption = settings.useSelect ? "Time..." : "None";
        }

        if ($.isArray(settings.noneOption)) {
          for (var i in settings.noneOption) {
            if (parseInt(i, 10) == i) {
              var noneElement = tp._generateNoneElement(settings.noneOption[i], settings.useSelect);

              list.append(noneElement);
            }
          }
        } else {
          var noneElement = tp._generateNoneElement(settings.noneOption, settings.useSelect);

          list.append(noneElement);
        }
      }

      if (settings.className) {
        wrapped_list.addClass(settings.className);
      }

      if ((settings.minTime !== null || settings.durationTime !== null) && settings.showDuration) {
        typeof settings.step == "function" ? "function" : settings.step;
        wrapped_list.addClass("ui-timepicker-with-duration");
        wrapped_list.addClass("ui-timepicker-step-" + settings.step);
      }

      var durStart = (_settings$durationTim = settings.durationTime()) !== null && _settings$durationTim !== void 0 ? _settings$durationTim : settings.minTime();
      var start = (_settings$minTime = settings.minTime()) !== null && _settings$minTime !== void 0 ? _settings$minTime : 0;
      var end = (_settings$maxTime = settings.maxTime()) !== null && _settings$maxTime !== void 0 ? _settings$maxTime : start + ONE_DAY - 1;

      if (end < start) {
        // make sure the end time is greater than start time, otherwise there will be no list to show
        end += ONE_DAY;
      }

      if (end === ONE_DAY - 1 && $.type(settings.timeFormat) === "string" && settings.show2400) {
        // show a 24:00 option when using military time
        end = ONE_DAY;
      }

      var dr = settings.disableTimeRanges;
      var drCur = 0;
      var drLen = dr.length;
      var stepFunc = settings.step;

      if (typeof stepFunc != "function") {
        stepFunc = function stepFunc() {
          return settings.step;
        };
      }

      for (var i = start, j = 0; i <= end; j++, i += stepFunc(j) * 60) {
        var timeInt = i;

        var timeString = tp._int2time(timeInt);

        if (settings.useSelect) {
          var row = $("<option></option>", {
            value: timeString
          });
          row.text(timeString);
        } else {
          var row = $("<li></li>");
          row.addClass(timeInt % ONE_DAY < ONE_DAY / 2 ? "ui-timepicker-am" : "ui-timepicker-pm");
          row.attr("data-time", roundingFunction(timeInt, settings));
          row.text(timeString);
        }

        if ((settings.minTime() !== null || settings.durationTime() !== null) && settings.showDuration) {
          var durationString = tp._int2duration(i - durStart, settings.step);

          if (settings.useSelect) {
            row.text(row.text() + " (" + durationString + ")");
          } else {
            var duration = $("<span></span>", {
              "class": "ui-timepicker-duration"
            });
            duration.text(" (" + durationString + ")");
            row.append(duration);
          }
        }

        if (drCur < drLen) {
          if (timeInt >= dr[drCur][1]) {
            drCur += 1;
          }

          if (dr[drCur] && timeInt >= dr[drCur][0] && timeInt < dr[drCur][1]) {
            if (settings.useSelect) {
              row.prop("disabled", true);
            } else {
              row.addClass("ui-timepicker-disabled");
            }
          }
        }

        list.append(row);
      }

      wrapped_list.data("timepicker-input", self);
      tp.list = wrapped_list;

      if (settings.useSelect) {
        if (self.val()) {
          list.val(tp._roundAndFormatTime(tp.anytime2int(self.val())));
        }

        list.on("focus", function () {
          $(this).data("timepicker-input").trigger("showTimepicker");
        });
        list.on("blur", function () {
          $(this).data("timepicker-input").trigger("hideTimepicker");
        });
        list.on("change", function () {
          tp._setTimeValue($(this).val(), "select");
        });

        tp._setTimeValue(list.val(), "initial");

        self.hide().after(list);
      } else {
        var appendTo = settings.appendTo;

        if (typeof appendTo === "string") {
          appendTo = $(appendTo);
        } else if (typeof appendTo === "function") {
          appendTo = appendTo(self);
        }

        appendTo.append(wrapped_list);

        tp._setSelected();

        list.on("mousedown click", "li", function (e) {
          // hack: temporarily disable the focus handler
          // to deal with the fact that IE fires 'focus'
          // events asynchronously
          self.off("focus.timepicker");
          self.on("focus.timepicker-ie-hack", function () {
            self.off("focus.timepicker-ie-hack");
            self.on("focus.timepicker", methods.show);
          });

          if (!tp._hideKeyboard()) {
            self[0].focus();
          } // make sure only the clicked row is selected


          list.find("li").removeClass("ui-timepicker-selected");
          $(this).addClass("ui-timepicker-selected");

          if (tp._selectValue()) {
            self.trigger("hideTimepicker");
            list.on("mouseup.timepicker click.timepicker", "li", function (e) {
              list.off("mouseup.timepicker click.timepicker");
              wrapped_list.hide();
            });
          }
        });
      }
    } // event handler to decide whether to close timepicker


    function _closeHandler(e) {
      if (e.type == 'focus' && e.target == window) {
        // mobile Chrome fires focus events against window for some reason
        return;
      }

      var target = $(e.target);

      if (target.closest(".ui-timepicker-input").length || target.closest(".ui-timepicker-wrapper").length) {
        // active timepicker was focused. ignore
        return;
      }

      Timepicker.hideAll();
      $(document).unbind(".ui-timepicker");
      $(window).unbind(".ui-timepicker");
    }
    /*
     *  Keyboard navigation via arrow keys
     */


    function _keydownhandler(e) {
      var self = $(this);
      var tp = self[0].timepickerObj;
      var list = tp.list;

      if (!list || !Timepicker.isVisible(list)) {
        if (e.keyCode == 40) {
          // show the list!
          methods.show.call(self.get(0));
          list = tp.list;

          if (!tp._hideKeyboard()) {
            self.trigger('focus');
          }
        } else {
          return true;
        }
      }

      switch (e.keyCode) {
        case 13:
          // return
          if (tp._selectValue()) {
            tp._formatValue({
              type: "change"
            });

            tp.hideMe();
          }

          e.preventDefault();
          return false;

        case 38:
          // up
          var selected = list.find(".ui-timepicker-selected");

          if (!selected.length) {
            list.find("li").each(function (i, obj) {
              if ($(obj).position().top > 0) {
                selected = $(obj);
                return false;
              }
            });
            selected.addClass("ui-timepicker-selected");
          } else if (!selected.is(":first-child")) {
            selected.removeClass("ui-timepicker-selected");
            selected.prev().addClass("ui-timepicker-selected");

            if (selected.prev().position().top < selected.outerHeight()) {
              list.scrollTop(list.scrollTop() - selected.outerHeight());
            }
          }

          return false;

        case 40:
          // down
          selected = list.find(".ui-timepicker-selected");

          if (selected.length === 0) {
            list.find("li").each(function (i, obj) {
              if ($(obj).position().top > 0) {
                selected = $(obj);
                return false;
              }
            });
            selected.addClass("ui-timepicker-selected");
          } else if (!selected.is(":last-child")) {
            selected.removeClass("ui-timepicker-selected");
            selected.next().addClass("ui-timepicker-selected");

            if (selected.next().position().top + 2 * selected.outerHeight() > list.outerHeight()) {
              list.scrollTop(list.scrollTop() + selected.outerHeight());
            }
          }

          return false;

        case 27:
          // escape
          list.find("li").removeClass("ui-timepicker-selected");
          tp.hideMe();
          break;

        case 9:
          //tab
          tp.hideMe();
          break;

        default:
          return true;
      }
    } // Plugin entry


    $.fn.timepicker = function (method) {
      if (!this.length) return this;

      if (methods[method]) {
        // check if this element is a timepicker
        if (!this.hasClass("ui-timepicker-input")) {
          return this;
        }

        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (_typeof(method) === "object" || !method) {
        return methods.init.apply(this, arguments);
      } else {
        $.error("Method " + method + " does not exist on jQuery.timepicker");
      }
    }; // Default plugin options.


    $.fn.timepicker.defaults = DEFAULT_SETTINGS;
  });

}());
