function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "flatpickr", "../../globals/js/settings", "../../globals/js/misc/mixin", "../../globals/js/mixins/create-component", "../../globals/js/mixins/init-component-by-search", "../../globals/js/mixins/handles", "../../globals/js/misc/on"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("flatpickr"), require("../../globals/js/settings"), require("../../globals/js/misc/mixin"), require("../../globals/js/mixins/create-component"), require("../../globals/js/mixins/init-component-by-search"), require("../../globals/js/mixins/handles"), require("../../globals/js/misc/on"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.flatpickr, global.settings, global.mixin, global.createComponent, global.initComponentBySearch, global.handles, global.on);
    global.datePicker = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _flatpickr, _settings, _mixin2, _createComponent, _initComponentBySearch, _handles, _on) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _flatpickr = _interopRequireDefault(_flatpickr);
  _settings = _interopRequireDefault(_settings);
  _mixin2 = _interopRequireDefault(_mixin2);
  _createComponent = _interopRequireDefault(_createComponent);
  _initComponentBySearch = _interopRequireDefault(_initComponentBySearch);
  _handles = _interopRequireDefault(_handles);
  _on = _interopRequireDefault(_on);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
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

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
  /* eslint no-underscore-dangle: [2, { "allow": ["_input", "_updateClassNames", "_updateInputFields"], "allowAfterThis": true }] */
  // `this.options` create-component mix-in creates prototype chain
  // so that `options` given in constructor argument wins over the one defined in static `options` property
  // 'Flatpickr' wants flat structure of object instead


  function flattenOptions(options) {
    var o = {}; // eslint-disable-next-line guard-for-in, no-restricted-syntax

    for (var key in options) {
      o[key] = options[key];
    }

    return o;
  } // Weekdays shorthand for english locale


  _flatpickr.default.l10ns.en.weekdays.shorthand.forEach(function (day, index) {
    var currentDay = _flatpickr.default.l10ns.en.weekdays.shorthand;

    if (currentDay[index] === 'Thu' || currentDay[index] === 'Th') {
      currentDay[index] = 'Th';
    } else {
      currentDay[index] = currentDay[index].charAt(0);
    }
  });

  var toArray = function toArray(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
  };
  /**
   * @param {number} monthNumber The month number.
   * @param {boolean} shorthand `true` to use shorthand month.
   * @param {Locale} locale The Flatpickr locale data.
   * @returns {string} The month string.
   */


  var monthToStr = function monthToStr(monthNumber, shorthand, locale) {
    return locale.months[shorthand ? 'shorthand' : 'longhand'][monthNumber];
  };
  /**
   * @param {object} config Plugin configuration.
   * @param {boolean} [config.shorthand] `true` to use shorthand month.
   * @param {string} config.selectorFlatpickrMonthYearContainer The CSS selector for the container of month/year selection UI.
   * @param {string} config.selectorFlatpickrYearContainer The CSS selector for the container of year selection UI.
   * @param {string} config.selectorFlatpickrCurrentMonth The CSS selector for the text-based month selection UI.
   * @param {string} config.classFlatpickrCurrentMonth The CSS class for the text-based month selection UI.
   * @returns {Plugin} A Flatpickr plugin to use text instead of `<select>` for month picker.
   */


  var carbonFlatpickrMonthSelectPlugin = function carbonFlatpickrMonthSelectPlugin(config) {
    return function (fp) {
      var setupElements = function setupElements() {
        var _fp$monthElements;

        if (!fp.monthElements) {
          return;
        }

        fp.monthElements.forEach(function (elem) {
          if (!elem.parentNode) return;
          elem.parentNode.removeChild(elem);
        });

        (_fp$monthElements = fp.monthElements).splice.apply(_fp$monthElements, [0, fp.monthElements.length].concat(_toConsumableArray(fp.monthElements.map(function () {
          // eslint-disable-next-line no-underscore-dangle
          var monthElement = fp._createElement('span', config.classFlatpickrCurrentMonth);

          monthElement.textContent = monthToStr(fp.currentMonth, config.shorthand === true, fp.l10n);
          fp.yearElements[0].closest(config.selectorFlatpickrMonthYearContainer).insertBefore(monthElement, fp.yearElements[0].closest(config.selectorFlatpickrYearContainer));
          return monthElement;
        }))));
      };

      var updateCurrentMonth = function updateCurrentMonth() {
        var monthStr = monthToStr(fp.currentMonth, config.shorthand === true, fp.l10n);
        fp.yearElements.forEach(function (elem) {
          var currentMonthContainer = elem.closest(config.selectorFlatpickrMonthYearContainer);
          Array.prototype.forEach.call(currentMonthContainer.querySelectorAll('.cur-month'), function (monthElement) {
            monthElement.textContent = monthStr;
          });
        });
      };

      var register = function register() {
        fp.loadedPlugins.push('carbonFlatpickrMonthSelectPlugin');
      };

      return {
        onMonthChange: updateCurrentMonth,
        onValueUpdate: updateCurrentMonth,
        onOpen: updateCurrentMonth,
        onReady: [setupElements, updateCurrentMonth, register]
      };
    };
  };

  var DatePicker = /*#__PURE__*/function (_mixin) {
    _inherits(DatePicker, _mixin);

    var _super = _createSuper(DatePicker);
    /**
     * DatePicker.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as an date picker.
     */


    /**
     * DatePicker.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as an date picker.
     */
    function DatePicker(element, options) {
      var _this;

      _classCallCheck(this, DatePicker);

      _this = _super.call(this, element, options);

      _this._handleFocus = function () {
        if (_this.calendar) {
          _this.calendar.open();
        }
      };

      _this._handleBlur = function (event) {
        if (_this.calendar) {
          var focusTo = event.relatedTarget;

          if (!focusTo || !_this.element.contains(focusTo) && (!_this.calendar.calendarContainer || !_this.calendar.calendarContainer.contains(focusTo))) {
            _this.calendar.close();
          }
        }
      };

      _this._initDatePicker = function (type) {
        if (type === 'range') {
          // Given FlatPickr assumes one `<input>` even in range mode,
          // use a hidden `<input>` for such purpose, separate from our from/to `<input>`s
          var doc = _this.element.ownerDocument;
          var rangeInput = doc.createElement('input');
          rangeInput.className = _this.options.classVisuallyHidden;
          rangeInput.setAttribute('aria-hidden', 'true');

          _this.element.appendChild(rangeInput);

          _this._rangeInput = rangeInput; // An attempt to open the date picker dropdown when this component gets focus,
          // and close the date picker dropdown when this component loses focus

          // An attempt to open the date picker dropdown when this component gets focus,
          // and close the date picker dropdown when this component loses focus
          var w = doc.defaultView;
          var hasFocusin = ('onfocusin' in w);
          var hasFocusout = ('onfocusout' in w);
          var focusinEventName = hasFocusin ? 'focusin' : 'focus';
          var focusoutEventName = hasFocusout ? 'focusout' : 'blur';

          _this.manage((0, _on.default)(_this.element, focusinEventName, _this._handleFocus, !hasFocusin));

          _this.manage((0, _on.default)(_this.element, focusoutEventName, _this._handleBlur, !hasFocusout));

          _this.manage((0, _on.default)(_this.element.querySelector(_this.options.selectorDatePickerIcon), focusoutEventName, _this._handleBlur, !hasFocusout));
        }

        var self = _assertThisInitialized(_this);

        var date = type === 'range' ? _this._rangeInput : _this.element.querySelector(_this.options.selectorDatePickerInput);
        var _this$options = _this.options,
            _onClose = _this$options.onClose,
            _onChange = _this$options.onChange,
            _onMonthChange = _this$options.onMonthChange,
            _onYearChange = _this$options.onYearChange,
            _onOpen = _this$options.onOpen,
            _onValueUpdate = _this$options.onValueUpdate;
        var calendar = new _flatpickr.default(date, Object.assign(flattenOptions(_this.options), {
          allowInput: true,
          mode: type,
          disableMobile: true,
          positionElement: type === 'range' && _this.element.querySelector(_this.options.selectorDatePickerInputFrom),
          onClose: function onClose(selectedDates) {
            // An attempt to disable Flatpickr's focus tracking system,
            // which has adverse effect with our old set up with two `<input>`s or our latest setup with a hidden `<input>`
            if (self.shouldForceOpen) {
              if (self.calendar.calendarContainer) {
                self.calendar.calendarContainer.classList.add('open');
              }

              self.calendar.isOpen = true;
            }

            for (var _len = arguments.length, remainder = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              remainder[_key - 1] = arguments[_key];
            }

            if (!_onClose || _onClose.call.apply(_onClose, [this, selectedDates].concat(remainder)) !== false) {
              self._updateClassNames(calendar);

              self._updateInputFields(selectedDates, type);
            }
          },
          onChange: function onChange() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            if (!_onChange || _onChange.call.apply(_onChange, [this].concat(args)) !== false) {
              self._updateClassNames(calendar);

              if (type === 'range') {
                if (calendar.selectedDates.length === 1 && calendar.isOpen) {
                  self.element.querySelector(self.options.selectorDatePickerInputTo).classList.add(self.options.classFocused);
                } else {
                  self.element.querySelector(self.options.selectorDatePickerInputTo).classList.remove(self.options.classFocused);
                }
              }
            }
          },
          onMonthChange: function onMonthChange() {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            if (!_onMonthChange || _onMonthChange.call.apply(_onMonthChange, [this].concat(args)) !== false) {
              self._updateClassNames(calendar);
            }
          },
          onYearChange: function onYearChange() {
            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }

            if (!_onYearChange || _onYearChange.call.apply(_onYearChange, [this].concat(args)) !== false) {
              self._updateClassNames(calendar);
            }
          },
          onOpen: function onOpen() {
            // An attempt to disable Flatpickr's focus tracking system,
            // which has adverse effect with our old set up with two `<input>`s or our latest setup with a hidden `<input>`
            self.shouldForceOpen = true;
            setTimeout(function () {
              self.shouldForceOpen = false;
            }, 0);

            for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
              args[_key5] = arguments[_key5];
            }

            if (!_onOpen || _onOpen.call.apply(_onOpen, [this].concat(args)) !== false) {
              self._updateClassNames(calendar);
            }
          },
          onValueUpdate: function onValueUpdate() {
            for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
              args[_key6] = arguments[_key6];
            }

            if ((!_onValueUpdate || _onValueUpdate.call.apply(_onValueUpdate, [this].concat(args)) !== false) && type === 'range') {
              self._updateInputFields(self.calendar.selectedDates, type);
            }
          },
          nextArrow: _this._rightArrowHTML(),
          prevArrow: _this._leftArrowHTML(),
          plugins: [].concat(_toConsumableArray(_this.options.plugins || []), [carbonFlatpickrMonthSelectPlugin(_this.options)])
        }));

        if (type === 'range') {
          _this._addInputLogic(_this.element.querySelector(_this.options.selectorDatePickerInputFrom), 0);

          _this._addInputLogic(_this.element.querySelector(_this.options.selectorDatePickerInputTo), 1);
        }

        _this.manage((0, _on.default)(_this.element.querySelector(_this.options.selectorDatePickerIcon), 'click', function () {
          calendar.open();
        }));

        _this._updateClassNames(calendar);

        if (type !== 'range') {
          _this._addInputLogic(date);
        }

        return calendar;
      };

      _this._addInputLogic = function (input, index) {
        if (!isNaN(index) && (index < 0 || index > 1)) {
          throw new RangeError("The index of <input> (".concat(index, ") is out of range."));
        }

        var inputField = input;

        _this.manage((0, _on.default)(inputField, 'change', function (evt) {
          if (evt.isTrusted || evt.detail && evt.detail.isNotFromFlatpickr) {
            var inputDate = _this.calendar.parseDate(inputField.value);

            if (inputDate && !isNaN(inputDate.valueOf())) {
              if (isNaN(index)) {
                _this.calendar.setDate(inputDate);
              } else {
                var selectedDates = _this.calendar.selectedDates;
                selectedDates[index] = inputDate;

                _this.calendar.setDate(selectedDates);
              }
            }
          }

          _this._updateClassNames(_this.calendar);
        })); // An attempt to temporarily set the `<input>` being edited as the one FlatPicker manages,
        // as FlatPicker attempts to take over `keydown` event handler on `document` to run on the date picker dropdown.


        // An attempt to temporarily set the `<input>` being edited as the one FlatPicker manages,
        // as FlatPicker attempts to take over `keydown` event handler on `document` to run on the date picker dropdown.
        _this.manage((0, _on.default)(inputField, 'keydown', function (evt) {
          var origInput = _this.calendar._input;
          _this.calendar._input = evt.target;
          setTimeout(function () {
            _this.calendar._input = origInput;
          });
        }));
      };

      _this._updateClassNames = function (_ref) {
        var calendarContainer = _ref.calendarContainer,
            selectedDates = _ref.selectedDates;

        if (calendarContainer) {
          calendarContainer.classList.add(_this.options.classCalendarContainer);
          calendarContainer.querySelector('.flatpickr-month').classList.add(_this.options.classMonth);
          calendarContainer.querySelector('.flatpickr-weekdays').classList.add(_this.options.classWeekdays);
          calendarContainer.querySelector('.flatpickr-days').classList.add(_this.options.classDays);
          toArray(calendarContainer.querySelectorAll('.flatpickr-weekday')).forEach(function (item) {
            var currentItem = item;
            currentItem.innerHTML = currentItem.innerHTML.replace(/\s+/g, '');
            currentItem.classList.add(_this.options.classWeekday);
          });
          toArray(calendarContainer.querySelectorAll('.flatpickr-day')).forEach(function (item) {
            item.classList.add(_this.options.classDay);

            if (item.classList.contains('today') && selectedDates.length > 0) {
              item.classList.add('no-border');
            } else if (item.classList.contains('today') && selectedDates.length === 0) {
              item.classList.remove('no-border');
            }
          });
        }
      };

      _this._updateInputFields = function (selectedDates, type) {
        if (type === 'range') {
          if (selectedDates.length === 2) {
            _this.element.querySelector(_this.options.selectorDatePickerInputFrom).value = _this._formatDate(selectedDates[0]);
            _this.element.querySelector(_this.options.selectorDatePickerInputTo).value = _this._formatDate(selectedDates[1]);
          } else if (selectedDates.length === 1) {
            _this.element.querySelector(_this.options.selectorDatePickerInputFrom).value = _this._formatDate(selectedDates[0]);
          }
        } else if (selectedDates.length === 1) {
          _this.element.querySelector(_this.options.selectorDatePickerInput).value = _this._formatDate(selectedDates[0]);
        }

        _this._updateClassNames(_this.calendar);
      };

      _this._formatDate = function (date) {
        return _this.calendar.formatDate(date, _this.calendar.config.dateFormat);
      };

      var _type = _this.element.getAttribute(_this.options.attribType);

      _this.calendar = _this._initDatePicker(_type);

      if (_this.calendar.calendarContainer) {
        _this.manage((0, _on.default)(_this.element, 'keydown', function (e) {
          if (e.which === 40) {
            e.preventDefault();

            (_this.calendar.selectedDateElem || _this.calendar.todayDateElem || _this.calendar.calendarContainer).focus();
          }
        }));

        _this.manage((0, _on.default)(_this.calendar.calendarContainer, 'keydown', function (e) {
          if (e.which === 9 && _type === 'range') {
            _this._updateClassNames(_this.calendar);

            _this.element.querySelector(_this.options.selectorDatePickerInputFrom).focus();
          }
        }));
      }

      return _this;
    }
    /**
     * Opens the date picker dropdown when this component gets focus.
     * Used only for range mode for now.
     * @private
     */


    /**
     * Opens the date picker dropdown when this component gets focus.
     * Used only for range mode for now.
     * @private
     */
    _createClass(DatePicker, [{
      key: "_rightArrowHTML",
      value: function _rightArrowHTML() {
        return "\n      <svg\n        focusable=\"false\"\n        preserveAspectRatio=\"xMidYMid meet\"\n        style=\"will-change: transform;\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        width=\"16\"\n        height=\"16\"\n        viewBox=\"0 0 16 16\"\n        aria-hidden=\"true\">\n          <path d=\"M11 8l-5 5-.7-.7L9.6 8 5.3 3.7 6 3z\"></path>\n      </svg>";
      }
    }, {
      key: "_leftArrowHTML",
      value: function _leftArrowHTML() {
        return "\n      <svg\n        focusable=\"false\"\n        preserveAspectRatio=\"xMidYMid meet\"\n        style=\"will-change: transform;\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        width=\"16\"\n        height=\"16\"\n        viewBox=\"0 0 16 16\"\n        aria-hidden=\"true\"\n      >\n        <path d=\"M5 8l5-5 .7.7L6.4 8l4.3 4.3-.7.7z\"></path>\n      </svg>";
      }
    }, {
      key: "release",
      value: function release() {
        if (this._rangeInput && this._rangeInput.parentNode) {
          this._rangeInput.parentNode.removeChild(this._rangeInput);
        }

        if (this.calendar) {
          try {
            this.calendar.destroy();
          } catch (err) {} // eslint-disable-line no-empty


          // eslint-disable-line no-empty
          this.calendar = null;
        }

        return _get(_getPrototypeOf(DatePicker.prototype), "release", this).call(this);
      }
      /**
       * The component options.
       * If `options` is specified in the constructor,
       * {@linkcode DatePicker.create .create()}, or {@linkcode DatePicker.init .init()},
       * properties in this object are overriden for the instance being create and how {@linkcode DatePicker.init .init()} works.
       * @property {string} selectorInit The CSS selector to find date picker UIs.
       */

    }], [{
      key: "options",
      get: function get() {
        var prefix = _settings.default.prefix;
        return {
          selectorInit: '[data-date-picker]',
          selectorDatePickerInput: '[data-date-picker-input]',
          selectorDatePickerInputFrom: '[data-date-picker-input-from]',
          selectorDatePickerInputTo: '[data-date-picker-input-to]',
          selectorDatePickerIcon: '[data-date-picker-icon]',
          selectorFlatpickrMonthYearContainer: '.flatpickr-current-month',
          selectorFlatpickrYearContainer: '.numInputWrapper',
          selectorFlatpickrCurrentMonth: '.cur-month',
          classCalendarContainer: "".concat(prefix, "--date-picker__calendar"),
          classMonth: "".concat(prefix, "--date-picker__month"),
          classWeekdays: "".concat(prefix, "--date-picker__weekdays"),
          classDays: "".concat(prefix, "--date-picker__days"),
          classWeekday: "".concat(prefix, "--date-picker__weekday"),
          classDay: "".concat(prefix, "--date-picker__day"),
          classFocused: "".concat(prefix, "--focused"),
          classVisuallyHidden: "".concat(prefix, "--visually-hidden"),
          classFlatpickrCurrentMonth: 'cur-month',
          attribType: 'data-date-picker-type',
          dateFormat: 'm/d/Y'
        };
      }
      /**
       * The map associating DOM element and date picker UI instance.
       * @type {WeakMap}
       */

    }]);

    DatePicker.components = new WeakMap();
    return DatePicker;
  }((0, _mixin2.default)(_createComponent.default, _initComponentBySearch.default, _handles.default));

  var _default = DatePicker;
  _exports.default = _default;
});