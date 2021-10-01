import React, { Component, createRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { CSSTransition, Portal, mask, ZIndexUtils, tip, DomHandler, OverlayService, ConnectedOverlayScrollHandler, Ripple, ObjectUtils, classNames } from 'primereact/core';
import PrimeReact, { localeOption, localeOptions } from 'primereact/api';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

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

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
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

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
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

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CalendarPanelComponent = /*#__PURE__*/function (_Component) {
  _inherits(CalendarPanelComponent, _Component);

  var _super = _createSuper$1(CalendarPanelComponent);

  function CalendarPanelComponent() {
    _classCallCheck(this, CalendarPanelComponent);

    return _super.apply(this, arguments);
  }

  _createClass(CalendarPanelComponent, [{
    key: "renderElement",
    value: function renderElement() {
      return /*#__PURE__*/React.createElement(CSSTransition, {
        nodeRef: this.props.forwardRef,
        classNames: "p-connected-overlay",
        in: this.props.in,
        timeout: {
          enter: 120,
          exit: 100
        },
        options: this.props.transitionOptions,
        unmountOnExit: true,
        onEnter: this.props.onEnter,
        onEntered: this.props.onEntered,
        onExit: this.props.onExit,
        onExited: this.props.onExited
      }, /*#__PURE__*/React.createElement("div", {
        ref: this.props.forwardRef,
        className: this.props.className,
        style: this.props.style,
        onClick: this.props.onClick
      }, this.props.children));
    }
  }, {
    key: "render",
    value: function render() {
      var element = this.renderElement();
      return this.props.inline ? element : /*#__PURE__*/React.createElement(Portal, {
        element: element,
        appendTo: this.props.appendTo
      });
    }
  }]);

  return CalendarPanelComponent;
}(Component);

_defineProperty(CalendarPanelComponent, "defaultProps", {
  appendTo: null,
  style: null,
  className: null
});

var CalendarPanel = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(CalendarPanelComponent, _extends({
    forwardRef: ref
  }, props));
});

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Calendar = /*#__PURE__*/function (_Component) {
  _inherits(Calendar, _Component);

  var _super = _createSuper(Calendar);

  function Calendar(props) {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _super.call(this, props);
    _this.state = {
      focused: false,
      overlayVisible: false
    };

    if (!_this.props.onViewDateChange) {
      var propValue = _this.props.value;

      if (Array.isArray(propValue)) {
        propValue = propValue[0];
      }

      var viewDate = _this.props.viewDate && _this.isValidDate(_this.props.viewDate) ? _this.props.viewDate : propValue && _this.isValidDate(propValue) ? propValue : new Date();

      _this.validateDate(viewDate);

      _this.state = _objectSpread(_objectSpread({}, _this.state), {}, {
        viewDate: viewDate
      });
    }

    _this.navigation = null;
    _this.onUserInput = _this.onUserInput.bind(_assertThisInitialized(_this));
    _this.onInputFocus = _this.onInputFocus.bind(_assertThisInitialized(_this));
    _this.onInputBlur = _this.onInputBlur.bind(_assertThisInitialized(_this));
    _this.onInputKeyDown = _this.onInputKeyDown.bind(_assertThisInitialized(_this));
    _this.onButtonClick = _this.onButtonClick.bind(_assertThisInitialized(_this));
    _this.onPrevButtonClick = _this.onPrevButtonClick.bind(_assertThisInitialized(_this));
    _this.onNextButtonClick = _this.onNextButtonClick.bind(_assertThisInitialized(_this));
    _this.onMonthDropdownChange = _this.onMonthDropdownChange.bind(_assertThisInitialized(_this));
    _this.onYearDropdownChange = _this.onYearDropdownChange.bind(_assertThisInitialized(_this));
    _this.onTodayButtonClick = _this.onTodayButtonClick.bind(_assertThisInitialized(_this));
    _this.onClearButtonClick = _this.onClearButtonClick.bind(_assertThisInitialized(_this));
    _this.onPanelClick = _this.onPanelClick.bind(_assertThisInitialized(_this));
    _this.incrementHour = _this.incrementHour.bind(_assertThisInitialized(_this));
    _this.decrementHour = _this.decrementHour.bind(_assertThisInitialized(_this));
    _this.incrementMinute = _this.incrementMinute.bind(_assertThisInitialized(_this));
    _this.decrementMinute = _this.decrementMinute.bind(_assertThisInitialized(_this));
    _this.incrementSecond = _this.incrementSecond.bind(_assertThisInitialized(_this));
    _this.decrementSecond = _this.decrementSecond.bind(_assertThisInitialized(_this));
    _this.toggleAmPm = _this.toggleAmPm.bind(_assertThisInitialized(_this));
    _this.onTimePickerElementMouseDown = _this.onTimePickerElementMouseDown.bind(_assertThisInitialized(_this));
    _this.onTimePickerElementMouseUp = _this.onTimePickerElementMouseUp.bind(_assertThisInitialized(_this));
    _this.onTimePickerElementMouseLeave = _this.onTimePickerElementMouseLeave.bind(_assertThisInitialized(_this));
    _this.onOverlayEnter = _this.onOverlayEnter.bind(_assertThisInitialized(_this));
    _this.onOverlayEntered = _this.onOverlayEntered.bind(_assertThisInitialized(_this));
    _this.onOverlayExit = _this.onOverlayExit.bind(_assertThisInitialized(_this));
    _this.onOverlayExited = _this.onOverlayExited.bind(_assertThisInitialized(_this));
    _this.reFocusInputField = _this.reFocusInputField.bind(_assertThisInitialized(_this));
    _this.overlayRef = /*#__PURE__*/createRef();
    _this.inputRef = /*#__PURE__*/createRef(_this.props.inputRef);
    return _this;
  }

  _createClass(Calendar, [{
    key: "updateInputRef",
    value: function updateInputRef() {
      var ref = this.props.inputRef;

      if (ref) {
        if (typeof ref === 'function') {
          ref(this.inputRef.current);
        } else {
          ref.current = this.inputRef.current;
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.updateInputRef();

      if (this.props.tooltip) {
        this.renderTooltip();
      }

      if (this.props.inline) {
        this.initFocusableCell();
      } else if (this.props.mask) {
        mask(this.inputRef.current, {
          mask: this.props.mask,
          readOnly: this.props.readOnlyInput || this.props.disabled,
          onChange: function onChange(e) {
            return _this2.updateValueOnInput(e.originalEvent, e.value);
          }
        });
      }

      if (this.props.value) {
        this.updateInputfield(this.props.value);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      if (prevProps.tooltip !== this.props.tooltip || prevProps.tooltipOptions !== this.props.tooltipOptions) {
        if (this.tooltip) this.tooltip.update(_objectSpread({
          content: this.props.tooltip
        }, this.props.tooltipOptions || {}));else this.renderTooltip();
      }

      if (!this.props.onViewDateChange && !this.viewStateChanged) {
        var propValue = this.props.value;

        if (Array.isArray(propValue)) {
          propValue = propValue[0];
        }

        var prevPropValue = prevProps.value;

        if (Array.isArray(prevPropValue)) {
          prevPropValue = prevPropValue[0];
        }

        if (!prevPropValue && propValue || propValue && propValue instanceof Date && propValue.getTime() !== prevPropValue.getTime()) {
          var viewDate = this.props.viewDate && this.isValidDate(this.props.viewDate) ? this.props.viewDate : propValue && this.isValidDate(propValue) ? propValue : new Date();
          this.validateDate(viewDate);
          this.setState({
            viewDate: viewDate
          }, function () {
            _this3.viewStateChanged = true;
          });
        }
      }

      if (this.overlayRef && this.overlayRef.current) {
        this.updateFocus();
      }

      if (prevProps.value !== this.props.value && (!this.viewStateChanged || !this.isVisible()) || this.isOptionChanged(prevProps)) {
        this.updateInputfield(this.props.value);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
      }

      if (this.touchUIMask) {
        this.disableModality();
        this.touchUIMask = null;
      }

      if (this.tooltip) {
        this.tooltip.destroy();
        this.tooltip = null;
      }

      this.unbindDocumentClickListener();
      this.unbindDocumentResizeListener();

      if (this.scrollHandler) {
        this.scrollHandler.destroy();
        this.scrollHandler = null;
      }

      ZIndexUtils.clear(this.overlayRef.current);
    }
  }, {
    key: "renderTooltip",
    value: function renderTooltip() {
      this.tooltip = tip({
        target: this.inputRef.current,
        content: this.props.tooltip,
        options: this.props.tooltipOptions
      });
    }
  }, {
    key: "isVisible",
    value: function isVisible() {
      return this.props.onVisibleChange ? this.props.visible : this.state.overlayVisible;
    }
  }, {
    key: "isOptionChanged",
    value: function isOptionChanged(prevProps) {
      var _this4 = this;

      var optionProps = ['dateFormat', 'hourFormat', 'timeOnly', 'showSeconds', 'showMillisec'];
      return optionProps.some(function (option) {
        return prevProps[option] !== _this4.props[option];
      });
    }
  }, {
    key: "getDateFormat",
    value: function getDateFormat() {
      return this.props.dateFormat || localeOption('dateFormat', this.props.locale);
    }
  }, {
    key: "onInputFocus",
    value: function onInputFocus(event) {
      var _this5 = this;

      if (this.ignoreFocusFunctionality) {
        this.setState({
          focused: true
        }, function () {
          _this5.ignoreFocusFunctionality = false;
        });
      } else {
        event.persist();

        if (this.props.showOnFocus && !this.isVisible()) {
          this.showOverlay();
        }

        this.setState({
          focused: true
        }, function () {
          if (_this5.props.onFocus) {
            _this5.props.onFocus(event);
          }
        });
      }
    }
  }, {
    key: "onInputBlur",
    value: function onInputBlur(event) {
      var _this6 = this;

      event.persist();
      this.setState({
        focused: false
      }, function () {
        if (_this6.props.onBlur) {
          _this6.props.onBlur(event);
        }

        if (!_this6.props.keepInvalid) {
          _this6.updateInputfield(_this6.props.value);
        }
      });
    }
  }, {
    key: "onInputKeyDown",
    value: function onInputKeyDown(event) {
      this.isKeydown = true;

      switch (event.which) {
        //escape
        case 27:
          {
            this.hideOverlay();
            break;
          }
        //tab

        case 9:
          {
            if (this.isVisible()) {
              this.trapFocus(event);
            }

            if (this.props.touchUI) {
              this.disableModality();
            }

            break;
          }
      }
    }
  }, {
    key: "onUserInput",
    value: function onUserInput(event) {
      // IE 11 Workaround for input placeholder
      if (!this.isKeydown) {
        return;
      }

      this.isKeydown = false;
      this.updateValueOnInput(event, event.target.value);

      if (this.props.onInput) {
        this.props.onInput(event);
      }
    }
  }, {
    key: "updateValueOnInput",
    value: function updateValueOnInput(event, rawValue) {
      try {
        var value = this.parseValueFromString(rawValue);

        if (this.isValidSelection(value)) {
          this.updateModel(event, value);
          this.updateViewDate(event, value.length ? value[0] : value);
        }
      } catch (err) {
        //invalid date
        var _value = this.props.keepInvalid ? rawValue : null;

        this.updateModel(event, _value);
      }
    }
  }, {
    key: "reFocusInputField",
    value: function reFocusInputField() {
      if (!this.props.inline && this.inputRef.current) {
        this.ignoreFocusFunctionality = true;
        this.inputRef.current.focus();
      }
    }
  }, {
    key: "isValidSelection",
    value: function isValidSelection(value) {
      var _this7 = this;

      var isValid = true;

      if (this.isSingleSelection()) {
        if (!(this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false) && this.isSelectableTime(value))) {
          isValid = false;
        }
      } else if (value.every(function (v) {
        return _this7.isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false) && _this7.isSelectableTime(value);
      })) {
        if (this.isRangeSelection()) {
          isValid = value.length > 1 && value[1] > value[0] ? true : false;
        }
      }

      return isValid;
    }
  }, {
    key: "onButtonClick",
    value: function onButtonClick() {
      if (this.isVisible()) {
        this.hideOverlay();
      } else {
        this.showOverlay();
      }
    }
  }, {
    key: "onPrevButtonClick",
    value: function onPrevButtonClick(event) {
      this.navigation = {
        backward: true,
        button: true
      };
      this.navBackward(event);
    }
  }, {
    key: "onNextButtonClick",
    value: function onNextButtonClick(event) {
      this.navigation = {
        backward: false,
        button: true
      };
      this.navForward(event);
    }
  }, {
    key: "onContainerButtonKeydown",
    value: function onContainerButtonKeydown(event) {
      switch (event.which) {
        //tab
        case 9:
          this.trapFocus(event);
          break;
        //escape

        case 27:
          this.hideOverlay(null, this.reFocusInputField);
          event.preventDefault();
          break;
      }
    }
  }, {
    key: "trapFocus",
    value: function trapFocus(event) {
      event.preventDefault();
      var focusableElements = DomHandler.getFocusableElements(this.overlayRef.current);

      if (focusableElements && focusableElements.length > 0) {
        if (!document.activeElement) {
          focusableElements[0].focus();
        } else {
          var focusedIndex = focusableElements.indexOf(document.activeElement);

          if (event.shiftKey) {
            if (focusedIndex === -1 || focusedIndex === 0) focusableElements[focusableElements.length - 1].focus();else focusableElements[focusedIndex - 1].focus();
          } else {
            if (focusedIndex === -1 || focusedIndex === focusableElements.length - 1) focusableElements[0].focus();else focusableElements[focusedIndex + 1].focus();
          }
        }
      }
    }
  }, {
    key: "updateFocus",
    value: function updateFocus() {
      var cell;

      if (this.navigation) {
        if (this.navigation.button) {
          this.initFocusableCell();
          if (this.navigation.backward) DomHandler.findSingle(this.overlayRef.current, '.p-datepicker-prev').focus();else DomHandler.findSingle(this.overlayRef.current, '.p-datepicker-next').focus();
        } else {
          if (this.navigation.backward) {
            var cells = DomHandler.find(this.overlayRef.current, '.p-datepicker-calendar td span:not(.p-disabled)');
            cell = cells[cells.length - 1];
          } else {
            cell = DomHandler.findSingle(this.overlayRef.current, '.p-datepicker-calendar td span:not(.p-disabled)');
          }

          if (cell) {
            cell.tabIndex = '0';
            cell.focus();
          }
        }

        this.navigation = null;
      } else {
        this.initFocusableCell();
      }
    }
  }, {
    key: "initFocusableCell",
    value: function initFocusableCell() {
      var cell;

      if (this.view === 'month') {
        var cells = DomHandler.find(this.overlayRef.current, '.p-monthpicker .p-monthpicker-month');
        var selectedCell = DomHandler.findSingle(this.overlayRef.current, '.p-monthpicker .p-monthpicker-month.p-highlight');
        cells.forEach(function (cell) {
          return cell.tabIndex = -1;
        });
        cell = selectedCell || cells[0];
      } else {
        cell = DomHandler.findSingle(this.overlayRef.current, 'span.p-highlight');

        if (!cell) {
          var todayCell = DomHandler.findSingle(this.overlayRef.current, 'td.p-datepicker-today span:not(.p-disabled)');
          if (todayCell) cell = todayCell;else cell = DomHandler.findSingle(this.overlayRef.current, '.p-datepicker-calendar td span:not(.p-disabled)');
        }
      }

      if (cell) {
        cell.tabIndex = '0';
      }
    }
  }, {
    key: "navBackward",
    value: function navBackward(event) {
      if (this.props.disabled) {
        event.preventDefault();
        return;
      }

      var newViewDate = new Date(this.getViewDate().getTime());
      newViewDate.setDate(1);

      if (this.props.view === 'date') {
        if (newViewDate.getMonth() === 0) {
          newViewDate.setMonth(11);
          newViewDate.setFullYear(newViewDate.getFullYear() - 1);
        } else {
          newViewDate.setMonth(newViewDate.getMonth() - 1);
        }
      } else if (this.props.view === 'month') {
        var currentYear = newViewDate.getFullYear();
        var newYear = currentYear - 1;

        if (this.props.yearNavigator) {
          var minYear = parseInt(this.props.yearRange.split(':')[0], 10);

          if (newYear < minYear) {
            newYear = minYear;
          }
        }

        newViewDate.setFullYear(newYear);
      }

      this.updateViewDate(event, newViewDate);
      event.preventDefault();
    }
  }, {
    key: "navForward",
    value: function navForward(event) {
      if (this.props.disabled) {
        event.preventDefault();
        return;
      }

      var newViewDate = new Date(this.getViewDate().getTime());
      newViewDate.setDate(1);

      if (this.props.view === 'date') {
        if (newViewDate.getMonth() === 11) {
          newViewDate.setMonth(0);
          newViewDate.setFullYear(newViewDate.getFullYear() + 1);
        } else {
          newViewDate.setMonth(newViewDate.getMonth() + 1);
        }
      } else if (this.props.view === 'month') {
        var currentYear = newViewDate.getFullYear();
        var newYear = currentYear + 1;

        if (this.props.yearNavigator) {
          var maxYear = parseInt(this.props.yearRange.split(':')[1], 10);

          if (newYear > maxYear) {
            newYear = maxYear;
          }
        }

        newViewDate.setFullYear(newYear);
      }

      this.updateViewDate(event, newViewDate);
      event.preventDefault();
    }
  }, {
    key: "onMonthDropdownChange",
    value: function onMonthDropdownChange(event, value) {
      var currentViewDate = this.getViewDate();
      var newViewDate = new Date(currentViewDate.getTime());
      newViewDate.setMonth(parseInt(value, 10));
      this.updateViewDate(event, newViewDate);
    }
  }, {
    key: "onYearDropdownChange",
    value: function onYearDropdownChange(event, value) {
      var currentViewDate = this.getViewDate();
      var newViewDate = new Date(currentViewDate.getTime());
      newViewDate.setFullYear(parseInt(value, 10));
      this.updateViewDate(event, newViewDate);
    }
  }, {
    key: "onTodayButtonClick",
    value: function onTodayButtonClick(event) {
      var today = new Date();
      var dateMeta = {
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
        today: true,
        selectable: true
      };
      var timeMeta = {
        hours: today.getHours(),
        minutes: today.getMinutes(),
        seconds: today.getSeconds(),
        milliseconds: today.getMilliseconds()
      };
      this.updateViewDate(event, today);
      this.onDateSelect(event, dateMeta, timeMeta);

      if (this.props.onTodayButtonClick) {
        this.props.onTodayButtonClick(event);
      }
    }
  }, {
    key: "onClearButtonClick",
    value: function onClearButtonClick(event) {
      this.updateModel(event, null);
      this.updateInputfield(null);
      this.hideOverlay(null, this.reFocusInputField);

      if (this.props.onClearButtonClick) {
        this.props.onClearButtonClick(event);
      }
    }
  }, {
    key: "onPanelClick",
    value: function onPanelClick(event) {
      if (!this.props.inline) {
        OverlayService.emit('overlay-click', {
          originalEvent: event,
          target: this.container
        });
      }
    }
  }, {
    key: "onTimePickerElementMouseDown",
    value: function onTimePickerElementMouseDown(event, type, direction) {
      if (!this.props.disabled) {
        this.repeat(event, null, type, direction);
        event.preventDefault();
      }
    }
  }, {
    key: "onTimePickerElementMouseUp",
    value: function onTimePickerElementMouseUp() {
      if (!this.props.disabled) {
        this.clearTimePickerTimer();
      }
    }
  }, {
    key: "onTimePickerElementMouseLeave",
    value: function onTimePickerElementMouseLeave() {
      if (!this.props.disabled) {
        this.clearTimePickerTimer();
      }
    }
  }, {
    key: "repeat",
    value: function repeat(event, interval, type, direction) {
      var _this8 = this;

      event.persist();
      var i = interval || 500;
      this.clearTimePickerTimer();
      this.timePickerTimer = setTimeout(function () {
        _this8.repeat(event, 100, type, direction);
      }, i);

      switch (type) {
        case 0:
          if (direction === 1) this.incrementHour(event);else this.decrementHour(event);
          break;

        case 1:
          if (direction === 1) this.incrementMinute(event);else this.decrementMinute(event);
          break;

        case 2:
          if (direction === 1) this.incrementSecond(event);else this.decrementSecond(event);
          break;

        case 3:
          if (direction === 1) this.incrementMilliSecond(event);else this.decrementMilliSecond(event);
          break;
      }
    }
  }, {
    key: "clearTimePickerTimer",
    value: function clearTimePickerTimer() {
      if (this.timePickerTimer) {
        clearTimeout(this.timePickerTimer);
      }
    }
  }, {
    key: "incrementHour",
    value: function incrementHour(event) {
      var currentTime = this.getCurrentDateTime();
      var currentHour = currentTime.getHours();
      var newHour = currentHour + this.props.stepHour;
      newHour = newHour >= 24 ? newHour - 24 : newHour;

      if (this.validateHour(newHour, currentTime)) {
        if (this.props.maxDate && this.props.maxDate.toDateString() === currentTime.toDateString() && this.props.maxDate.getHours() === newHour) {
          if (this.props.maxDate.getMinutes() < currentTime.getMinutes()) {
            if (this.props.maxDate.getSeconds() < currentTime.getSeconds()) {
              if (this.props.maxDate.getMilliseconds() < currentTime.getMilliseconds()) {
                this.updateTime(event, newHour, this.props.maxDate.getMinutes(), this.props.maxDate.getSeconds(), this.props.maxDate.getMilliseconds());
              } else {
                this.updateTime(event, newHour, this.props.maxDate.getMinutes(), this.props.maxDate.getSeconds(), currentTime.getMilliseconds());
              }
            } else {
              this.updateTime(event, newHour, this.props.maxDate.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
            }
          } else if (this.props.maxDate.getMinutes() === currentTime.getMinutes()) {
            if (this.props.maxDate.getSeconds() < currentTime.getSeconds()) {
              if (this.props.maxDate.getMilliseconds() < currentTime.getMilliseconds()) {
                this.updateTime(event, newHour, this.props.maxDate.getMinutes(), this.props.maxDate.getSeconds(), this.props.maxDate.getMilliseconds());
              } else {
                this.updateTime(event, newHour, this.props.maxDate.getMinutes(), this.props.maxDate.getSeconds(), currentTime.getMilliseconds());
              }
            } else {
              this.updateTime(event, newHour, this.props.maxDate.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
            }
          } else {
            this.updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
          }
        } else {
          this.updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
        }
      }

      event.preventDefault();
    }
  }, {
    key: "decrementHour",
    value: function decrementHour(event) {
      var currentTime = this.getCurrentDateTime();
      var currentHour = currentTime.getHours();
      var newHour = currentHour - this.props.stepHour;
      newHour = newHour < 0 ? newHour + 24 : newHour;

      if (this.validateHour(newHour, currentTime)) {
        if (this.props.minDate && this.props.minDate.toDateString() === currentTime.toDateString() && this.props.minDate.getHours() === newHour) {
          if (this.props.minDate.getMinutes() > currentTime.getMinutes()) {
            if (this.props.minDate.getSeconds() > currentTime.getSeconds()) {
              if (this.props.minDate.getMilliseconds() > currentTime.getMilliseconds()) {
                this.updateTime(event, newHour, this.props.minDate.getMinutes(), this.props.minDate.getSeconds(), this.props.minDate.getMilliseconds());
              } else {
                this.updateTime(event, newHour, this.props.minDate.getMinutes(), this.props.minDate.getSeconds(), currentTime.getMilliseconds());
              }
            } else {
              this.updateTime(event, newHour, this.props.minDate.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
            }
          } else if (this.props.minDate.getMinutes() === currentTime.getMinutes()) {
            if (this.props.minDate.getSeconds() > currentTime.getSeconds()) {
              if (this.props.minDate.getMilliseconds() > currentTime.getMilliseconds()) {
                this.updateTime(event, newHour, this.props.minDate.getMinutes(), this.props.minDate.getSeconds(), this.props.minDate.getMilliseconds());
              } else {
                this.updateTime(event, newHour, this.props.minDate.getMinutes(), this.props.minDate.getSeconds(), currentTime.getMilliseconds());
              }
            } else {
              this.updateTime(event, newHour, this.props.minDate.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
            }
          } else {
            this.updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
          }
        } else {
          this.updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
        }
      }

      event.preventDefault();
    }
  }, {
    key: "incrementMinute",
    value: function incrementMinute(event) {
      var currentTime = this.getCurrentDateTime();
      var currentMinute = currentTime.getMinutes();
      var newMinute = currentMinute + this.props.stepMinute;
      newMinute = newMinute > 59 ? newMinute - 60 : newMinute;

      if (this.validateMinute(newMinute, currentTime)) {
        if (this.props.maxDate && this.props.maxDate.toDateString() === currentTime.toDateString() && this.props.maxDate.getMinutes() === newMinute) {
          if (this.props.maxDate.getSeconds() < currentTime.getSeconds()) {
            if (this.props.maxDate.getMilliseconds() < currentTime.getMilliseconds()) {
              this.updateTime(event, currentTime.getHours(), newMinute, this.props.maxDate.getSeconds(), this.props.maxDate.getMilliseconds());
            } else {
              this.updateTime(event, currentTime.getHours(), newMinute, this.props.maxDate.getSeconds(), currentTime.getMilliseconds());
            }
          } else {
            this.updateTime(event, currentTime.getHours(), newMinute, currentTime.getSeconds(), currentTime.getMilliseconds());
          }
        } else {
          this.updateTime(event, currentTime.getHours(), newMinute, currentTime.getSeconds(), currentTime.getMilliseconds());
        }
      }

      event.preventDefault();
    }
  }, {
    key: "decrementMinute",
    value: function decrementMinute(event) {
      var currentTime = this.getCurrentDateTime();
      var currentMinute = currentTime.getMinutes();
      var newMinute = currentMinute - this.props.stepMinute;
      newMinute = newMinute < 0 ? newMinute + 60 : newMinute;

      if (this.validateMinute(newMinute, currentTime)) {
        if (this.props.minDate && this.props.minDate.toDateString() === currentTime.toDateString() && this.props.minDate.getMinutes() === newMinute) {
          if (this.props.minDate.getSeconds() > currentTime.getSeconds()) {
            if (this.props.minDate.getMilliseconds() > currentTime.getMilliseconds()) {
              this.updateTime(event, currentTime.getHours(), newMinute, this.props.minDate.getSeconds(), this.props.minDate.getMilliseconds());
            } else {
              this.updateTime(event, currentTime.getHours(), newMinute, this.props.minDate.getSeconds(), currentTime.getMilliseconds());
            }
          } else {
            this.updateTime(event, currentTime.getHours(), newMinute, currentTime.getSeconds(), currentTime.getMilliseconds());
          }
        } else {
          this.updateTime(event, currentTime.getHours(), newMinute, currentTime.getSeconds(), currentTime.getMilliseconds());
        }
      }

      event.preventDefault();
    }
  }, {
    key: "incrementSecond",
    value: function incrementSecond(event) {
      var currentTime = this.getCurrentDateTime();
      var currentSecond = currentTime.getSeconds();
      var newSecond = currentSecond + this.props.stepSecond;
      newSecond = newSecond > 59 ? newSecond - 60 : newSecond;

      if (this.validateSecond(newSecond, currentTime)) {
        if (this.props.maxDate && this.props.maxDate.toDateString() === currentTime.toDateString() && this.props.maxDate.getSeconds() === newSecond) {
          if (this.props.maxDate.getMilliseconds() < currentTime.getMilliseconds()) {
            this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, this.props.maxDate.getMilliseconds());
          } else {
            this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, currentTime.getMilliseconds());
          }
        } else {
          this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, currentTime.getMilliseconds());
        }
      }

      event.preventDefault();
    }
  }, {
    key: "decrementSecond",
    value: function decrementSecond(event) {
      var currentTime = this.getCurrentDateTime();
      var currentSecond = currentTime.getSeconds();
      var newSecond = currentSecond - this.props.stepSecond;
      newSecond = newSecond < 0 ? newSecond + 60 : newSecond;

      if (this.validateSecond(newSecond, currentTime)) {
        if (this.props.minDate && this.props.minDate.toDateString() === currentTime.toDateString() && this.props.minDate.getSeconds() === newSecond) {
          if (this.props.minDate.getMilliseconds() > currentTime.getMilliseconds()) {
            this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, this.props.minDate.getMilliseconds());
          } else {
            this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, currentTime.getMilliseconds());
          }
        } else {
          this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond, currentTime.getMilliseconds());
        }
      }

      event.preventDefault();
    }
  }, {
    key: "incrementMilliSecond",
    value: function incrementMilliSecond(event) {
      var currentTime = this.getCurrentDateTime();
      var currentMillisecond = currentTime.getMilliseconds();
      var newMillisecond = currentMillisecond + this.props.stepMillisec;
      newMillisecond = newMillisecond > 999 ? newMillisecond - 1000 : newMillisecond;

      if (this.validateMillisecond(newMillisecond, currentTime)) {
        this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), newMillisecond);
      }

      event.preventDefault();
    }
  }, {
    key: "decrementMilliSecond",
    value: function decrementMilliSecond(event) {
      var currentTime = this.getCurrentDateTime();
      var currentMillisecond = currentTime.getMilliseconds();
      var newMillisecond = currentMillisecond - this.props.stepMillisec;
      newMillisecond = newMillisecond < 0 ? newMillisecond + 999 : newMillisecond;

      if (this.validateMillisecond(newMillisecond, currentTime)) {
        this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), newMillisecond);
      }

      event.preventDefault();
    }
  }, {
    key: "toggleAmPm",
    value: function toggleAmPm(event) {
      var currentTime = this.getCurrentDateTime();
      var currentHour = currentTime.getHours();
      var newHour = currentHour >= 12 ? currentHour - 12 : currentHour + 12;
      this.updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
      event.preventDefault();
    }
  }, {
    key: "getViewDate",
    value: function getViewDate() {
      return this.props.onViewDateChange ? this.props.viewDate : this.state.viewDate;
    }
  }, {
    key: "getCurrentDateTime",
    value: function getCurrentDateTime() {
      if (this.isSingleSelection()) {
        return this.props.value && this.props.value instanceof Date ? this.props.value : this.getViewDate();
      } else if (this.isMultipleSelection()) {
        if (this.props.value && this.props.value.length) {
          return this.props.value[this.props.value.length - 1];
        }
      } else if (this.isRangeSelection()) {
        if (this.props.value && this.props.value.length) {
          var startDate = this.props.value[0];
          var endDate = this.props.value[1];
          return endDate || startDate;
        }
      }

      return new Date();
    }
  }, {
    key: "isValidDate",
    value: function isValidDate(date) {
      return date instanceof Date && !isNaN(date);
    }
  }, {
    key: "validateHour",
    value: function validateHour(hour, value) {
      var valid = true;
      var valueDateString = value ? value.toDateString() : null;

      if (this.props.minDate && valueDateString && this.props.minDate.toDateString() === valueDateString) {
        if (this.props.minDate.getHours() > hour) {
          valid = false;
        }
      }

      if (this.props.maxDate && valueDateString && this.props.maxDate.toDateString() === valueDateString) {
        if (this.props.maxDate.getHours() < hour) {
          valid = false;
        }
      }

      return valid;
    }
  }, {
    key: "validateMinute",
    value: function validateMinute(minute, value) {
      var valid = true;
      var valueDateString = value ? value.toDateString() : null;

      if (this.props.minDate && valueDateString && this.props.minDate.toDateString() === valueDateString) {
        if (value.getHours() === this.props.minDate.getHours()) {
          if (this.props.minDate.getMinutes() > minute) {
            valid = false;
          }
        }
      }

      if (this.props.maxDate && valueDateString && this.props.maxDate.toDateString() === valueDateString) {
        if (value.getHours() === this.props.maxDate.getHours()) {
          if (this.props.maxDate.getMinutes() < minute) {
            valid = false;
          }
        }
      }

      return valid;
    }
  }, {
    key: "validateSecond",
    value: function validateSecond(second, value) {
      var valid = true;
      var valueDateString = value ? value.toDateString() : null;

      if (this.props.minDate && valueDateString && this.props.minDate.toDateString() === valueDateString) {
        if (value.getHours() === this.props.minDate.getHours() && value.getMinutes() === this.props.minDate.getMinutes()) {
          if (this.props.minDate.getSeconds() > second) {
            valid = false;
          }
        }
      }

      if (this.props.maxDate && valueDateString && this.props.maxDate.toDateString() === valueDateString) {
        if (value.getHours() === this.props.maxDate.getHours() && value.getMinutes() === this.props.maxDate.getMinutes()) {
          if (this.props.maxDate.getSeconds() < second) {
            valid = false;
          }
        }
      }

      return valid;
    }
  }, {
    key: "validateMillisecond",
    value: function validateMillisecond(millisecond, value) {
      var valid = true;
      var valueDateString = value ? value.toDateString() : null;

      if (this.props.minDate && valueDateString && this.props.minDate.toDateString() === valueDateString) {
        if (value.getHours() === this.props.minDate.getHours() && value.getSeconds() === this.props.minDate.getSeconds() && value.getMinutes() === this.props.minDate.getMinutes()) {
          if (this.props.minDate.getMilliseconds() > millisecond) {
            valid = false;
          }
        }
      }

      if (this.props.maxDate && valueDateString && this.props.maxDate.toDateString() === valueDateString) {
        if (value.getHours() === this.props.maxDate.getHours() && value.getSeconds() === this.props.maxDate.getSeconds() && value.getMinutes() === this.props.maxDate.getMinutes()) {
          if (this.props.maxDate.getMilliseconds() < millisecond) {
            valid = false;
          }
        }
      }

      return valid;
    }
  }, {
    key: "validateDate",
    value: function validateDate(value) {
      if (this.props.yearNavigator) {
        var viewYear = value.getFullYear();
        var minRangeYear = this.props.yearRange ? parseInt(this.props.yearRange.split(':')[0], 10) : null;
        var maxRangeYear = this.props.yearRange ? parseInt(this.props.yearRange.split(':')[1], 10) : null;
        var minYear = this.props.minDate && minRangeYear != null ? Math.max(this.props.minDate.getFullYear(), minRangeYear) : this.props.minDate || minRangeYear;
        var maxYear = this.props.maxDate && maxRangeYear != null ? Math.min(this.props.maxDate.getFullYear(), maxRangeYear) : this.props.maxDate || maxRangeYear;

        if (minYear && minYear > viewYear) {
          viewYear = minYear;
        }

        if (maxYear && maxYear < viewYear) {
          viewYear = maxYear;
        }

        value.setFullYear(viewYear);
      }

      if (this.props.monthNavigator && this.props.view !== 'month') {
        var viewMonth = value.getMonth();
        var viewMonthWithMinMax = parseInt(this.isInMinYear(value) && Math.max(this.props.minDate.getMonth(), viewMonth).toString() || this.isInMaxYear(value) && Math.min(this.props.maxDate.getMonth(), viewMonth).toString() || viewMonth);
        value.setMonth(viewMonthWithMinMax);
      }
    }
  }, {
    key: "updateTime",
    value: function updateTime(event, hour, minute, second, millisecond) {
      var newDateTime = this.getCurrentDateTime();
      newDateTime.setHours(hour);
      newDateTime.setMinutes(minute);
      newDateTime.setSeconds(second);
      newDateTime.setMilliseconds(millisecond);

      if (this.isMultipleSelection()) {
        if (this.props.value && this.props.value.length) {
          var value = _toConsumableArray(this.props.value);

          value[value.length - 1] = newDateTime;
          newDateTime = value;
        } else {
          newDateTime = [newDateTime];
        }
      } else if (this.isRangeSelection()) {
        if (this.props.value && this.props.value.length) {
          var startDate = this.props.value[0];
          var endDate = this.props.value[1];
          newDateTime = endDate ? [startDate, newDateTime] : [newDateTime, null];
        } else {
          newDateTime = [newDateTime, null];
        }
      }

      this.updateModel(event, newDateTime);

      if (this.props.onSelect) {
        this.props.onSelect({
          originalEvent: event,
          value: newDateTime
        });
      }

      this.updateInputfield(newDateTime);
    }
  }, {
    key: "updateViewDate",
    value: function updateViewDate(event, value) {
      this.validateDate(value);

      if (this.props.onViewDateChange) {
        this.props.onViewDateChange({
          originalEvent: event,
          value: value
        });
      } else {
        this.viewStateChanged = true;
        this.setState({
          viewDate: value
        });
      }
    }
  }, {
    key: "onDateCellKeydown",
    value: function onDateCellKeydown(event, date, groupIndex) {
      var cellContent = event.currentTarget;
      var cell = cellContent.parentElement;

      switch (event.which) {
        //down arrow
        case 40:
          {
            cellContent.tabIndex = '-1';
            var cellIndex = DomHandler.index(cell);
            var nextRow = cell.parentElement.nextElementSibling;

            if (nextRow) {
              var focusCell = nextRow.children[cellIndex].children[0];

              if (DomHandler.hasClass(focusCell, 'p-disabled')) {
                this.navigation = {
                  backward: false
                };
                this.navForward(event);
              } else {
                nextRow.children[cellIndex].children[0].tabIndex = '0';
                nextRow.children[cellIndex].children[0].focus();
              }
            } else {
              this.navigation = {
                backward: false
              };
              this.navForward(event);
            }

            event.preventDefault();
            break;
          }
        //up arrow

        case 38:
          {
            cellContent.tabIndex = '-1';

            var _cellIndex = DomHandler.index(cell);

            var prevRow = cell.parentElement.previousElementSibling;

            if (prevRow) {
              var _focusCell = prevRow.children[_cellIndex].children[0];

              if (DomHandler.hasClass(_focusCell, 'p-disabled')) {
                this.navigation = {
                  backward: true
                };
                this.navBackward(event);
              } else {
                _focusCell.tabIndex = '0';

                _focusCell.focus();
              }
            } else {
              this.navigation = {
                backward: true
              };
              this.navBackward(event);
            }

            event.preventDefault();
            break;
          }
        //left arrow

        case 37:
          {
            cellContent.tabIndex = '-1';
            var prevCell = cell.previousElementSibling;

            if (prevCell) {
              var _focusCell2 = prevCell.children[0];

              if (DomHandler.hasClass(_focusCell2, 'p-disabled')) {
                this.navigateToMonth(true, groupIndex, event);
              } else {
                _focusCell2.tabIndex = '0';

                _focusCell2.focus();
              }
            } else {
              this.navigateToMonth(true, groupIndex, event);
            }

            event.preventDefault();
            break;
          }
        //right arrow

        case 39:
          {
            cellContent.tabIndex = '-1';
            var nextCell = cell.nextElementSibling;

            if (nextCell) {
              var _focusCell3 = nextCell.children[0];

              if (DomHandler.hasClass(_focusCell3, 'p-disabled')) {
                this.navigateToMonth(false, groupIndex, event);
              } else {
                _focusCell3.tabIndex = '0';

                _focusCell3.focus();
              }
            } else {
              this.navigateToMonth(false, groupIndex, event);
            }

            event.preventDefault();
            break;
          }
        //enter

        case 13:
          {
            this.onDateSelect(event, date);
            event.preventDefault();
            break;
          }
        //escape

        case 27:
          {
            this.hideOverlay(null, this.reFocusInputField);
            event.preventDefault();
            break;
          }
        //tab

        case 9:
          {
            this.trapFocus(event);
            break;
          }
      }
    }
  }, {
    key: "navigateToMonth",
    value: function navigateToMonth(prev, groupIndex, event) {
      if (prev) {
        if (this.props.numberOfMonths === 1 || groupIndex === 0) {
          this.navigation = {
            backward: true
          };
          this.navBackward(event);
        } else {
          var prevMonthContainer = this.overlayRef.current.children[groupIndex - 1];
          var cells = DomHandler.find(prevMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled)');
          var focusCell = cells[cells.length - 1];
          focusCell.tabIndex = '0';
          focusCell.focus();
        }
      } else {
        if (this.props.numberOfMonths === 1 || groupIndex === this.props.numberOfMonths - 1) {
          this.navigation = {
            backward: false
          };
          this.navForward(event);
        } else {
          var nextMonthContainer = this.overlayRef.current.children[groupIndex + 1];

          var _focusCell4 = DomHandler.findSingle(nextMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled)');

          _focusCell4.tabIndex = '0';

          _focusCell4.focus();
        }
      }
    }
  }, {
    key: "onMonthCellKeydown",
    value: function onMonthCellKeydown(event, index) {
      var cell = event.currentTarget;

      switch (event.which) {
        //arrows
        case 38:
        case 40:
          {
            cell.tabIndex = '-1';
            var cells = cell.parentElement.children;
            var cellIndex = DomHandler.index(cell);
            var nextCell = cells[event.which === 40 ? cellIndex + 3 : cellIndex - 3];

            if (nextCell) {
              nextCell.tabIndex = '0';
              nextCell.focus();
            }

            event.preventDefault();
            break;
          }
        //left arrow

        case 37:
          {
            cell.tabIndex = '-1';
            var prevCell = cell.previousElementSibling;

            if (prevCell) {
              prevCell.tabIndex = '0';
              prevCell.focus();
            }

            event.preventDefault();
            break;
          }
        //right arrow

        case 39:
          {
            cell.tabIndex = '-1';
            var _nextCell = cell.nextElementSibling;

            if (_nextCell) {
              _nextCell.tabIndex = '0';

              _nextCell.focus();
            }

            event.preventDefault();
            break;
          }
        //enter

        case 13:
          {
            this.onMonthSelect(event, index);
            event.preventDefault();
            break;
          }
        //escape

        case 27:
          {
            this.hideOverlay(null, this.reFocusInputField);
            event.preventDefault();
            break;
          }
        //tab

        case 9:
          {
            this.trapFocus(event);
            break;
          }
      }
    }
  }, {
    key: "onDateSelect",
    value: function onDateSelect(event, dateMeta, timeMeta) {
      var _this9 = this;

      if (this.props.disabled || !dateMeta.selectable) {
        event.preventDefault();
        return;
      }

      DomHandler.find(this.overlayRef.current, '.p-datepicker-calendar td span:not(.p-disabled)').forEach(function (cell) {
        return cell.tabIndex = -1;
      });
      event.currentTarget.focus();

      if (this.isMultipleSelection()) {
        if (this.isSelected(dateMeta)) {
          var value = this.props.value.filter(function (date, i) {
            return !_this9.isDateEquals(date, dateMeta);
          });
          this.updateModel(event, value);
          this.updateInputfield(value);
        } else if (!this.props.maxDateCount || !this.props.value || this.props.maxDateCount > this.props.value.length) {
          this.selectDate(event, dateMeta, timeMeta);
        }
      } else {
        this.selectDate(event, dateMeta, timeMeta);
      }

      if (!this.props.inline && this.isSingleSelection() && (!this.props.showTime || this.props.hideOnDateTimeSelect)) {
        setTimeout(function () {
          _this9.hideOverlay('dateselect');
        }, 100);

        if (this.touchUIMask) {
          this.disableModality();
        }
      }

      event.preventDefault();
    }
  }, {
    key: "selectTime",
    value: function selectTime(date, timeMeta) {
      if (this.props.showTime) {
        var hours, minutes, seconds, milliseconds;

        if (timeMeta) {
          hours = timeMeta.hours;
          minutes = timeMeta.minutes;
          seconds = timeMeta.seconds;
          milliseconds = timeMeta.milliseconds;
        } else {
          var time = this.getCurrentDateTime();
          var _ref = [time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds()];
          hours = _ref[0];
          minutes = _ref[1];
          seconds = _ref[2];
          milliseconds = _ref[3];
        }

        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(seconds);
        date.setMilliseconds(milliseconds);
      }
    }
  }, {
    key: "selectDate",
    value: function selectDate(event, dateMeta, timeMeta) {
      var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
      this.selectTime(date, timeMeta);

      if (this.props.minDate && this.props.minDate > date) {
        date = this.props.minDate;
      }

      if (this.props.maxDate && this.props.maxDate < date) {
        date = this.props.maxDate;
      }

      var selectedValues = date;

      if (this.isSingleSelection()) {
        this.updateModel(event, date);
      } else if (this.isMultipleSelection()) {
        selectedValues = this.props.value ? [].concat(_toConsumableArray(this.props.value), [date]) : [date];
        this.updateModel(event, selectedValues);
      } else if (this.isRangeSelection()) {
        if (this.props.value && this.props.value.length) {
          var startDate = this.props.value[0];
          var endDate = this.props.value[1];

          if (!endDate && date.getTime() >= startDate.getTime()) {
            endDate = date;
          } else {
            startDate = date;
            endDate = null;
          }

          selectedValues = [startDate, endDate];
          this.updateModel(event, selectedValues);
        } else {
          selectedValues = [date, null];
          this.updateModel(event, selectedValues);
        }
      }

      if (this.props.onSelect) {
        this.props.onSelect({
          originalEvent: event,
          value: date
        });
      }

      this.updateInputfield(selectedValues);
    }
  }, {
    key: "onMonthSelect",
    value: function onMonthSelect(event, month) {
      this.onDateSelect(event, {
        year: this.getViewDate().getFullYear(),
        month: month,
        day: 1,
        selectable: true
      });
      event.preventDefault();
    }
  }, {
    key: "updateModel",
    value: function updateModel(event, value) {
      if (this.props.onChange) {
        var newValue = value && value instanceof Date ? new Date(value.getTime()) : value;
        this.viewStateChanged = true;
        this.props.onChange({
          originalEvent: event,
          value: newValue,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: this.props.name,
            id: this.props.id,
            value: newValue
          }
        });
      }
    }
  }, {
    key: "showOverlay",
    value: function showOverlay(type) {
      var _this10 = this;

      if (this.props.onVisibleChange) {
        this.props.onVisibleChange({
          visible: true,
          type: type
        });
      } else {
        this.setState({
          overlayVisible: true
        }, function () {
          _this10.overlayEventListener = function (e) {
            if (!_this10.isOutsideClicked(e.target)) {
              _this10.isOverlayClicked = true;
            }
          };

          OverlayService.on('overlay-click', _this10.overlayEventListener);
        });
      }
    }
  }, {
    key: "hideOverlay",
    value: function hideOverlay(type, callback) {
      var _this11 = this;

      var _hideCallback = function _hideCallback() {
        _this11.viewStateChanged = false;
        _this11.ignoreFocusFunctionality = false;
        _this11.isOverlayClicked = false;

        if (callback) {
          callback();
        }

        OverlayService.off('overlay-click', _this11.overlayEventListener);
        _this11.overlayEventListener = null;
      };

      if (this.props.onVisibleChange) this.props.onVisibleChange({
        visible: false,
        type: type,
        callback: _hideCallback
      });else this.setState({
        overlayVisible: false
      }, _hideCallback);
    }
  }, {
    key: "onOverlayEnter",
    value: function onOverlayEnter() {
      if (this.props.autoZIndex) {
        ZIndexUtils.set(this.props.touchUI ? 'modal' : 'overlay', this.overlayRef.current, this.props.baseZIndex);
      }

      this.alignOverlay();
    }
  }, {
    key: "onOverlayEntered",
    value: function onOverlayEntered() {
      this.bindDocumentClickListener();
      this.bindDocumentResizeListener();
      this.bindScrollListener();
      this.props.onShow && this.props.onShow();
    }
  }, {
    key: "onOverlayExit",
    value: function onOverlayExit() {
      this.unbindDocumentClickListener();
      this.unbindDocumentResizeListener();
      this.unbindScrollListener();
    }
  }, {
    key: "onOverlayExited",
    value: function onOverlayExited() {
      ZIndexUtils.clear(this.overlayRef.current);
      this.props.onHide && this.props.onHide();
    }
  }, {
    key: "bindDocumentClickListener",
    value: function bindDocumentClickListener() {
      var _this12 = this;

      if (!this.documentClickListener) {
        this.documentClickListener = function (event) {
          if (!_this12.isOverlayClicked && _this12.isVisible() && _this12.isOutsideClicked(event.target)) {
            _this12.hideOverlay('outside');
          }

          _this12.isOverlayClicked = false;
        };

        document.addEventListener('click', this.documentClickListener);
      }
    }
  }, {
    key: "unbindDocumentClickListener",
    value: function unbindDocumentClickListener() {
      if (this.documentClickListener) {
        document.removeEventListener('click', this.documentClickListener);
        this.documentClickListener = null;
      }
    }
  }, {
    key: "bindDocumentResizeListener",
    value: function bindDocumentResizeListener() {
      if (!this.documentResizeListener && !this.props.touchUI) {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
      }
    }
  }, {
    key: "unbindDocumentResizeListener",
    value: function unbindDocumentResizeListener() {
      if (this.documentResizeListener) {
        window.removeEventListener('resize', this.documentResizeListener);
        this.documentResizeListener = null;
      }
    }
  }, {
    key: "bindScrollListener",
    value: function bindScrollListener() {
      var _this13 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.container, function () {
          if (_this13.isVisible()) {
            _this13.hideOverlay();
          }
        });
      }

      this.scrollHandler.bindScrollListener();
    }
  }, {
    key: "unbindScrollListener",
    value: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    }
  }, {
    key: "isOutsideClicked",
    value: function isOutsideClicked(target) {
      return this.container && !(this.container.isSameNode(target) || this.isNavIconClicked(target) || this.container.contains(target) || this.overlayRef && this.overlayRef.current.contains(target));
    }
  }, {
    key: "isNavIconClicked",
    value: function isNavIconClicked(target) {
      return DomHandler.hasClass(target, 'p-datepicker-prev') || DomHandler.hasClass(target, 'p-datepicker-prev-icon') || DomHandler.hasClass(target, 'p-datepicker-next') || DomHandler.hasClass(target, 'p-datepicker-next-icon');
    }
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      if (this.isVisible() && !DomHandler.isAndroid()) {
        this.hideOverlay();
      }
    }
  }, {
    key: "alignOverlay",
    value: function alignOverlay() {
      if (this.props.touchUI) {
        this.enableModality();
      } else {
        DomHandler.alignOverlay(this.overlayRef.current, this.inputRef.current.parentElement, this.props.appendTo || PrimeReact.appendTo);
      }
    }
  }, {
    key: "enableModality",
    value: function enableModality() {
      var _this14 = this;

      if (!this.touchUIMask) {
        this.touchUIMask = document.createElement('div');
        this.touchUIMask.style.zIndex = String(ZIndexUtils.get(this.overlayRef.current) - 1);
        DomHandler.addMultipleClasses(this.touchUIMask, 'p-component-overlay p-datepicker-mask p-datepicker-mask-scrollblocker p-component-overlay-enter');

        this.touchUIMaskClickListener = function () {
          _this14.disableModality();
        };

        this.touchUIMask.addEventListener('click', this.touchUIMaskClickListener);
        document.body.appendChild(this.touchUIMask);
        DomHandler.addClass(document.body, 'p-overflow-hidden');
      }
    }
  }, {
    key: "disableModality",
    value: function disableModality() {
      var _this15 = this;

      if (this.touchUIMask) {
        DomHandler.addClass(this.touchUIMask, 'p-component-overlay-leave');
        this.touchUIMask.addEventListener('animationend', function () {
          _this15.destroyMask();
        });
      }
    }
  }, {
    key: "destroyMask",
    value: function destroyMask() {
      this.touchUIMask.removeEventListener('click', this.touchUIMaskClickListener);
      this.touchUIMaskClickListener = null;
      document.body.removeChild(this.touchUIMask);
      this.touchUIMask = null;
      var bodyChildren = document.body.children;
      var hasBlockerMasks;

      for (var i = 0; i < bodyChildren.length; i++) {
        var bodyChild = bodyChildren[i];

        if (DomHandler.hasClass(bodyChild, 'p-datepicker-mask-scrollblocker')) {
          hasBlockerMasks = true;
          break;
        }
      }

      if (!hasBlockerMasks) {
        DomHandler.removeClass(document.body, 'p-overflow-hidden');
      }
    }
  }, {
    key: "getFirstDayOfMonthIndex",
    value: function getFirstDayOfMonthIndex(month, year) {
      var day = new Date();
      day.setDate(1);
      day.setMonth(month);
      day.setFullYear(year);
      var dayIndex = day.getDay() + this.getSundayIndex();
      return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    }
  }, {
    key: "getDaysCountInMonth",
    value: function getDaysCountInMonth(month, year) {
      return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
    }
  }, {
    key: "getDaysCountInPrevMonth",
    value: function getDaysCountInPrevMonth(month, year) {
      var prev = this.getPreviousMonthAndYear(month, year);
      return this.getDaysCountInMonth(prev.month, prev.year);
    }
  }, {
    key: "daylightSavingAdjust",
    value: function daylightSavingAdjust(date) {
      if (!date) {
        return null;
      }

      date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
      return date;
    }
  }, {
    key: "getPreviousMonthAndYear",
    value: function getPreviousMonthAndYear(month, year) {
      var m, y;

      if (month === 0) {
        m = 11;
        y = year - 1;
      } else {
        m = month - 1;
        y = year;
      }

      return {
        'month': m,
        'year': y
      };
    }
  }, {
    key: "getNextMonthAndYear",
    value: function getNextMonthAndYear(month, year) {
      var m, y;

      if (month === 11) {
        m = 0;
        y = year + 1;
      } else {
        m = month + 1;
        y = year;
      }

      return {
        'month': m,
        'year': y
      };
    }
  }, {
    key: "getSundayIndex",
    value: function getSundayIndex() {
      var firstDayOfWeek = localeOption('firstDayOfWeek', this.props.locale);
      return firstDayOfWeek > 0 ? 7 - firstDayOfWeek : 0;
    }
  }, {
    key: "createWeekDays",
    value: function createWeekDays() {
      var weekDays = [];

      var _localeOptions = localeOptions(this.props.locale),
          dayIndex = _localeOptions.firstDayOfWeek,
          dayNamesMin = _localeOptions.dayNamesMin;

      for (var i = 0; i < 7; i++) {
        weekDays.push(dayNamesMin[dayIndex]);
        dayIndex = dayIndex === 6 ? 0 : ++dayIndex;
      }

      return weekDays;
    }
  }, {
    key: "createMonths",
    value: function createMonths(month, year) {
      var months = [];

      for (var i = 0; i < this.props.numberOfMonths; i++) {
        var m = month + i;
        var y = year;

        if (m > 11) {
          m = m % 11 - 1;
          y = year + 1;
        }

        months.push(this.createMonth(m, y));
      }

      return months;
    }
  }, {
    key: "createMonth",
    value: function createMonth(month, year) {
      var dates = [];
      var firstDay = this.getFirstDayOfMonthIndex(month, year);
      var daysLength = this.getDaysCountInMonth(month, year);
      var prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
      var dayNo = 1;
      var today = new Date();
      var weekNumbers = [];
      var monthRows = Math.ceil((daysLength + firstDay) / 7);

      for (var i = 0; i < monthRows; i++) {
        var week = [];

        if (i === 0) {
          for (var j = prevMonthDaysLength - firstDay + 1; j <= prevMonthDaysLength; j++) {
            var prev = this.getPreviousMonthAndYear(month, year);
            week.push({
              day: j,
              month: prev.month,
              year: prev.year,
              otherMonth: true,
              today: this.isToday(today, j, prev.month, prev.year),
              selectable: this.isSelectable(j, prev.month, prev.year, true)
            });
          }

          var remainingDaysLength = 7 - week.length;

          for (var _j = 0; _j < remainingDaysLength; _j++) {
            week.push({
              day: dayNo,
              month: month,
              year: year,
              today: this.isToday(today, dayNo, month, year),
              selectable: this.isSelectable(dayNo, month, year, false)
            });
            dayNo++;
          }
        } else {
          for (var _j2 = 0; _j2 < 7; _j2++) {
            if (dayNo > daysLength) {
              var next = this.getNextMonthAndYear(month, year);
              week.push({
                day: dayNo - daysLength,
                month: next.month,
                year: next.year,
                otherMonth: true,
                today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                selectable: this.isSelectable(dayNo - daysLength, next.month, next.year, true)
              });
            } else {
              week.push({
                day: dayNo,
                month: month,
                year: year,
                today: this.isToday(today, dayNo, month, year),
                selectable: this.isSelectable(dayNo, month, year, false)
              });
            }

            dayNo++;
          }
        }

        if (this.props.showWeek) {
          weekNumbers.push(this.getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
        }

        dates.push(week);
      }

      return {
        month: month,
        year: year,
        dates: dates,
        weekNumbers: weekNumbers
      };
    }
  }, {
    key: "getWeekNumber",
    value: function getWeekNumber(date) {
      var checkDate = new Date(date.getTime());
      checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
      var time = checkDate.getTime();
      checkDate.setMonth(0);
      checkDate.setDate(1);
      return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
    }
  }, {
    key: "isSelectable",
    value: function isSelectable(day, month, year, otherMonth) {
      var validMin = true;
      var validMax = true;
      var validDate = true;
      var validDay = true;
      var validMonth = true;

      if (this.props.minDate) {
        if (this.props.minDate.getFullYear() > year) {
          validMin = false;
        } else if (this.props.minDate.getFullYear() === year) {
          if (this.props.minDate.getMonth() > month) {
            validMin = false;
          } else if (this.props.minDate.getMonth() === month) {
            if (this.props.minDate.getDate() > day) {
              validMin = false;
            }
          }
        }
      }

      if (this.props.maxDate) {
        if (this.props.maxDate.getFullYear() < year) {
          validMax = false;
        } else if (this.props.maxDate.getFullYear() === year) {
          if (this.props.maxDate.getMonth() < month) {
            validMax = false;
          } else if (this.props.maxDate.getMonth() === month) {
            if (this.props.maxDate.getDate() < day) {
              validMax = false;
            }
          }
        }
      }

      if (this.props.disabledDates) {
        validDate = !this.isDateDisabled(day, month, year);
      }

      if (this.props.disabledDays) {
        validDay = !this.isDayDisabled(day, month, year);
      }

      if (this.props.selectOtherMonths === false && otherMonth) {
        validMonth = false;
      }

      return validMin && validMax && validDate && validDay && validMonth;
    }
  }, {
    key: "isSelectableTime",
    value: function isSelectableTime(value) {
      var validMin = true;
      var validMax = true;

      if (this.props.minDate && this.props.minDate.toDateString() === value.toDateString()) {
        if (this.props.minDate.getHours() > value.getHours()) {
          validMin = false;
        } else if (this.props.minDate.getHours() === value.getHours()) {
          if (this.props.minDate.getMinutes() > value.getMinutes()) {
            validMin = false;
          } else if (this.props.minDate.getMinutes() === value.getMinutes()) {
            if (this.props.minDate.getSeconds() > value.getSeconds()) {
              validMin = false;
            } else if (this.props.minDate.getSeconds() === value.getSeconds()) {
              if (this.props.minDate.getMilliseconds() > value.getMilliseconds()) {
                validMin = false;
              }
            }
          }
        }
      }

      if (this.props.maxDate && this.props.maxDate.toDateString() === value.toDateString()) {
        if (this.props.maxDate.getHours() < value.getHours()) {
          validMax = false;
        } else if (this.props.maxDate.getHours() === value.getHours()) {
          if (this.props.maxDate.getMinutes() < value.getMinutes()) {
            validMax = false;
          } else if (this.props.maxDate.getMinutes() === value.getMinutes()) {
            if (this.props.maxDate.getSeconds() < value.getSeconds()) {
              validMax = false;
            } else if (this.props.maxDate.getSeconds() === value.getSeconds()) {
              if (this.props.maxDate.getMilliseconds() < value.getMilliseconds()) {
                validMax = false;
              }
            }
          }
        }
      }

      return validMin && validMax;
    }
  }, {
    key: "isSelected",
    value: function isSelected(dateMeta) {
      if (this.props.value) {
        if (this.isSingleSelection()) {
          return this.isDateEquals(this.props.value, dateMeta);
        } else if (this.isMultipleSelection()) {
          var selected = false;

          var _iterator = _createForOfIteratorHelper(this.props.value),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var date = _step.value;
              selected = this.isDateEquals(date, dateMeta);

              if (selected) {
                break;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          return selected;
        } else if (this.isRangeSelection()) {
          if (this.props.value[1]) return this.isDateEquals(this.props.value[0], dateMeta) || this.isDateEquals(this.props.value[1], dateMeta) || this.isDateBetween(this.props.value[0], this.props.value[1], dateMeta);else {
            return this.isDateEquals(this.props.value[0], dateMeta);
          }
        }
      } else {
        return false;
      }
    }
  }, {
    key: "isMonthSelected",
    value: function isMonthSelected(month) {
      var viewDate = this.getViewDate();
      if (this.props.value && this.props.value instanceof Date) return this.props.value.getDate() === 1 && this.props.value.getMonth() === month && this.props.value.getFullYear() === viewDate.getFullYear();else return false;
    }
  }, {
    key: "isDateEquals",
    value: function isDateEquals(value, dateMeta) {
      if (value && value instanceof Date) return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;else return false;
    }
  }, {
    key: "isDateBetween",
    value: function isDateBetween(start, end, dateMeta) {
      var between = false;

      if (start && end) {
        var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
        return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
      }

      return between;
    }
  }, {
    key: "isSingleSelection",
    value: function isSingleSelection() {
      return this.props.selectionMode === 'single';
    }
  }, {
    key: "isRangeSelection",
    value: function isRangeSelection() {
      return this.props.selectionMode === 'range';
    }
  }, {
    key: "isMultipleSelection",
    value: function isMultipleSelection() {
      return this.props.selectionMode === 'multiple';
    }
  }, {
    key: "isToday",
    value: function isToday(today, day, month, year) {
      return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    }
  }, {
    key: "isDateDisabled",
    value: function isDateDisabled(day, month, year) {
      if (this.props.disabledDates) {
        for (var i = 0; i < this.props.disabledDates.length; i++) {
          var disabledDate = this.props.disabledDates[i];

          if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: "isDayDisabled",
    value: function isDayDisabled(day, month, year) {
      if (this.props.disabledDays) {
        var weekday = new Date(year, month, day);
        var weekdayNumber = weekday.getDay();
        return this.props.disabledDays.indexOf(weekdayNumber) !== -1;
      }

      return false;
    }
  }, {
    key: "updateInputfield",
    value: function updateInputfield(value) {
      if (!(this.inputRef && this.inputRef.current)) {
        return;
      }

      var formattedValue = '';

      if (value) {
        try {
          if (this.isSingleSelection()) {
            formattedValue = this.isValidDate(value) ? this.formatDateTime(value) : '';
          } else if (this.isMultipleSelection()) {
            for (var i = 0; i < value.length; i++) {
              var selectedValue = value[i];
              var dateAsString = this.isValidDate(selectedValue) ? this.formatDateTime(selectedValue) : '';
              formattedValue += dateAsString;

              if (i !== value.length - 1) {
                formattedValue += ', ';
              }
            }
          } else if (this.isRangeSelection()) {
            if (value && value.length) {
              var startDate = value[0];
              var endDate = value[1];
              formattedValue = this.isValidDate(startDate) ? this.formatDateTime(startDate) : '';

              if (endDate) {
                formattedValue += this.isValidDate(endDate) ? ' - ' + this.formatDateTime(endDate) : '';
              }
            }
          }
        } catch (err) {
          formattedValue = value;
        }
      }

      this.inputRef.current.value = formattedValue;
    }
  }, {
    key: "formatDateTime",
    value: function formatDateTime(date) {
      var formattedValue = null;

      if (date) {
        if (this.props.timeOnly) {
          formattedValue = this.formatTime(date);
        } else {
          formattedValue = this.formatDate(date, this.getDateFormat());

          if (this.props.showTime) {
            formattedValue += ' ' + this.formatTime(date);
          }
        }
      }

      return formattedValue;
    }
  }, {
    key: "formatDate",
    value: function formatDate(date, format) {
      if (!date) {
        return '';
      }

      var iFormat;

      var lookAhead = function lookAhead(match) {
        var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;

        if (matches) {
          iFormat++;
        }

        return matches;
      },
          formatNumber = function formatNumber(match, value, len) {
        var num = '' + value;

        if (lookAhead(match)) {
          while (num.length < len) {
            num = '0' + num;
          }
        }

        return num;
      },
          formatName = function formatName(match, value, shortNames, longNames) {
        return lookAhead(match) ? longNames[value] : shortNames[value];
      };

      var output = '';
      var literal = false;

      var _localeOptions2 = localeOptions(this.props.locale),
          dayNamesShort = _localeOptions2.dayNamesShort,
          dayNames = _localeOptions2.dayNames,
          monthNamesShort = _localeOptions2.monthNamesShort,
          monthNames = _localeOptions2.monthNames;

      if (date) {
        for (iFormat = 0; iFormat < format.length; iFormat++) {
          if (literal) {
            if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
              literal = false;
            } else {
              output += format.charAt(iFormat);
            }
          } else {
            switch (format.charAt(iFormat)) {
              case 'd':
                output += formatNumber('d', date.getDate(), 2);
                break;

              case 'D':
                output += formatName('D', date.getDay(), dayNamesShort, dayNames);
                break;

              case 'o':
                output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                break;

              case 'm':
                output += formatNumber('m', date.getMonth() + 1, 2);
                break;

              case 'M':
                output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
                break;

              case 'y':
                output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + date.getFullYear() % 100;
                break;

              case '@':
                output += date.getTime();
                break;

              case '!':
                output += date.getTime() * 10000 + this.ticksTo1970;
                break;

              case '\'':
                if (lookAhead('\'')) {
                  output += '\'';
                } else {
                  literal = true;
                }

                break;

              default:
                output += format.charAt(iFormat);
            }
          }
        }
      }

      return output;
    }
  }, {
    key: "formatTime",
    value: function formatTime(date) {
      if (!date) {
        return '';
      }

      var output = '';
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var milliseconds = date.getMilliseconds();

      if (this.props.hourFormat === '12' && hours > 11 && hours !== 12) {
        hours -= 12;
      }

      if (this.props.hourFormat === '12') {
        output += hours === 0 ? 12 : hours < 10 ? '0' + hours : hours;
      } else {
        output += hours < 10 ? '0' + hours : hours;
      }

      output += ':';
      output += minutes < 10 ? '0' + minutes : minutes;

      if (this.props.showSeconds) {
        output += ':';
        output += seconds < 10 ? '0' + seconds : seconds;
      }

      if (this.props.showMillisec) {
        output += '.';
        output += milliseconds < 100 ? (milliseconds < 10 ? '00' : '0') + milliseconds : milliseconds;
      }

      if (this.props.hourFormat === '12') {
        output += date.getHours() > 11 ? ' PM' : ' AM';
      }

      return output;
    }
  }, {
    key: "parseValueFromString",
    value: function parseValueFromString(text) {
      if (!text || text.trim().length === 0) {
        return null;
      }

      var value;

      if (this.isSingleSelection()) {
        value = this.parseDateTime(text);
      } else if (this.isMultipleSelection()) {
        var tokens = text.split(',');
        value = [];

        var _iterator2 = _createForOfIteratorHelper(tokens),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var token = _step2.value;
            value.push(this.parseDateTime(token.trim()));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } else if (this.isRangeSelection()) {
        var _tokens = text.split(' - ');

        value = [];

        for (var i = 0; i < _tokens.length; i++) {
          value[i] = this.parseDateTime(_tokens[i].trim());
        }
      }

      return value;
    }
  }, {
    key: "parseDateTime",
    value: function parseDateTime(text) {
      var date;
      var parts = text.split(' ');

      if (this.props.timeOnly) {
        date = new Date();
        this.populateTime(date, parts[0], parts[1]);
      } else {
        if (this.props.showTime) {
          date = this.parseDate(parts[0], this.getDateFormat());
          this.populateTime(date, parts[1], parts[2]);
        } else {
          date = this.parseDate(text, this.getDateFormat());
        }
      }

      return date;
    }
  }, {
    key: "populateTime",
    value: function populateTime(value, timeString, ampm) {
      if (this.props.hourFormat === '12' && ampm !== 'PM' && ampm !== 'AM') {
        throw new Error('Invalid Time');
      }

      var time = this.parseTime(timeString, ampm);
      value.setHours(time.hour);
      value.setMinutes(time.minute);
      value.setSeconds(time.second);
      value.setMilliseconds(time.millisecond);
    }
  }, {
    key: "parseTime",
    value: function parseTime(value, ampm) {
      value = this.props.showMillisec ? value.replace('.', ':') : value;
      var tokens = value.split(':');
      var validTokenLength = this.props.showSeconds ? 3 : 2;
      validTokenLength = this.props.showMillisec ? validTokenLength + 1 : validTokenLength;

      if (tokens.length !== validTokenLength || tokens[0].length !== 2 || tokens[1].length !== 2 || this.props.showSeconds && tokens[2].length !== 2 || this.props.showMillisec && tokens[3].length !== 3) {
        throw new Error('Invalid time');
      }

      var h = parseInt(tokens[0], 10);
      var m = parseInt(tokens[1], 10);
      var s = this.props.showSeconds ? parseInt(tokens[2], 10) : null;
      var ms = this.props.showMillisec ? parseInt(tokens[3], 10) : null;

      if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || this.props.hourFormat === '12' && h > 12 || this.props.showSeconds && (isNaN(s) || s > 59) || this.props.showMillisec && (isNaN(s) || s > 1000)) {
        throw new Error('Invalid time');
      } else {
        if (this.props.hourFormat === '12' && h !== 12 && ampm === 'PM') {
          h += 12;
        }

        return {
          hour: h,
          minute: m,
          second: s,
          millisecond: ms
        };
      }
    } // Ported from jquery-ui datepicker parseDate

  }, {
    key: "parseDate",
    value: function parseDate(value, format) {
      if (format == null || value == null) {
        throw new Error('Invalid arguments');
      }

      value = _typeof(value) === "object" ? value.toString() : value + "";

      if (value === "") {
        return null;
      }

      var iFormat,
          dim,
          extra,
          iValue = 0,
          shortYearCutoff = typeof this.props.shortYearCutoff !== "string" ? this.props.shortYearCutoff : new Date().getFullYear() % 100 + parseInt(this.props.shortYearCutoff, 10),
          year = -1,
          month = -1,
          day = -1,
          doy = -1,
          literal = false,
          date,
          lookAhead = function lookAhead(match) {
        var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;

        if (matches) {
          iFormat++;
        }

        return matches;
      },
          getNumber = function getNumber(match) {
        var isDoubled = lookAhead(match),
            size = match === "@" ? 14 : match === "!" ? 20 : match === "y" && isDoubled ? 4 : match === "o" ? 3 : 2,
            minSize = match === "y" ? size : 1,
            digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
            num = value.substring(iValue).match(digits);

        if (!num) {
          throw new Error('Missing number at position ' + iValue);
        }

        iValue += num[0].length;
        return parseInt(num[0], 10);
      },
          getName = function getName(match, shortNames, longNames) {
        var index = -1;
        var arr = lookAhead(match) ? longNames : shortNames;
        var names = [];

        for (var i = 0; i < arr.length; i++) {
          names.push([i, arr[i]]);
        }

        names.sort(function (a, b) {
          return -(a[1].length - b[1].length);
        });

        for (var _i = 0; _i < names.length; _i++) {
          var name = names[_i][1];

          if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
            index = names[_i][0];
            iValue += name.length;
            break;
          }
        }

        if (index !== -1) {
          return index + 1;
        } else {
          throw new Error('Unknown name at position ' + iValue);
        }
      },
          checkLiteral = function checkLiteral() {
        if (value.charAt(iValue) !== format.charAt(iFormat)) {
          throw new Error('Unexpected literal at position ' + iValue);
        }

        iValue++;
      };

      if (this.props.view === 'month') {
        day = 1;
      }

      var _localeOptions3 = localeOptions(this.props.locale),
          dayNamesShort = _localeOptions3.dayNamesShort,
          dayNames = _localeOptions3.dayNames,
          monthNamesShort = _localeOptions3.monthNamesShort,
          monthNames = _localeOptions3.monthNames;

      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
            literal = false;
          } else {
            checkLiteral();
          }
        } else {
          switch (format.charAt(iFormat)) {
            case "d":
              day = getNumber("d");
              break;

            case "D":
              getName("D", dayNamesShort, dayNames);
              break;

            case "o":
              doy = getNumber("o");
              break;

            case "m":
              month = getNumber("m");
              break;

            case "M":
              month = getName("M", monthNamesShort, monthNames);
              break;

            case "y":
              year = getNumber("y");
              break;

            case "@":
              date = new Date(getNumber("@"));
              year = date.getFullYear();
              month = date.getMonth() + 1;
              day = date.getDate();
              break;

            case "!":
              date = new Date((getNumber("!") - this.ticksTo1970) / 10000);
              year = date.getFullYear();
              month = date.getMonth() + 1;
              day = date.getDate();
              break;

            case "'":
              if (lookAhead("'")) {
                checkLiteral();
              } else {
                literal = true;
              }

              break;

            default:
              checkLiteral();
          }
        }
      }

      if (iValue < value.length) {
        extra = value.substr(iValue);

        if (!/^\s+/.test(extra)) {
          throw new Error('Extra/unparsed characters found in date: ' + extra);
        }
      }

      if (year === -1) {
        year = new Date().getFullYear();
      } else if (year < 100) {
        year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
      }

      if (doy > -1) {
        month = 1;
        day = doy;

        do {
          dim = this.getDaysCountInMonth(year, month - 1);

          if (day <= dim) {
            break;
          }

          month++;
          day -= dim;
        } while (true);
      }

      date = this.daylightSavingAdjust(new Date(year, month - 1, day));

      if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        throw new Error('Invalid date'); // E.g. 31/02/00
      }

      return date;
    }
  }, {
    key: "renderBackwardNavigator",
    value: function renderBackwardNavigator(isVisible) {
      var _this16 = this;

      var navigatorProps = isVisible ? {
        'onClick': this.onPrevButtonClick,
        'onKeyDown': function onKeyDown(e) {
          return _this16.onContainerButtonKeydown(e);
        }
      } : {
        'style': {
          visibility: 'hidden'
        }
      };
      return /*#__PURE__*/React.createElement("button", _extends({
        type: "button",
        className: "p-datepicker-prev p-link"
      }, navigatorProps), /*#__PURE__*/React.createElement("span", {
        className: "p-datepicker-prev-icon pi pi-chevron-left"
      }), /*#__PURE__*/React.createElement(Ripple, null));
    }
  }, {
    key: "renderForwardNavigator",
    value: function renderForwardNavigator(isVisible) {
      var _this17 = this;

      var navigatorProps = isVisible ? {
        'onClick': this.onNextButtonClick,
        'onKeyDown': function onKeyDown(e) {
          return _this17.onContainerButtonKeydown(e);
        }
      } : {
        'style': {
          visibility: 'hidden'
        }
      };
      return /*#__PURE__*/React.createElement("button", _extends({
        type: "button",
        className: "p-datepicker-next p-link"
      }, navigatorProps), /*#__PURE__*/React.createElement("span", {
        className: "p-datepicker-next-icon pi pi-chevron-right"
      }), /*#__PURE__*/React.createElement(Ripple, null));
    }
  }, {
    key: "isInMinYear",
    value: function isInMinYear(viewDate) {
      return this.props.minDate && this.props.minDate.getFullYear() === viewDate.getFullYear();
    }
  }, {
    key: "isInMaxYear",
    value: function isInMaxYear(viewDate) {
      return this.props.maxDate && this.props.maxDate.getFullYear() === viewDate.getFullYear();
    }
  }, {
    key: "renderTitleMonthElement",
    value: function renderTitleMonthElement(month) {
      var _this18 = this;

      var monthNames = localeOption('monthNames', this.props.locale);

      if (this.props.monthNavigator && this.props.view !== 'month') {
        var viewDate = this.getViewDate();
        var viewMonth = viewDate.getMonth();
        var displayedMonthOptions = monthNames.map(function (month, index) {
          return (!_this18.isInMinYear(viewDate) || index >= _this18.props.minDate.getMonth()) && (!_this18.isInMaxYear(viewDate) || index <= _this18.props.maxDate.getMonth()) ? {
            label: month,
            value: index,
            index: index
          } : null;
        }).filter(function (option) {
          return !!option;
        });
        var displayedMonthNames = displayedMonthOptions.map(function (option) {
          return option.label;
        });
        var content = /*#__PURE__*/React.createElement("select", {
          className: "p-datepicker-month",
          onChange: function onChange(e) {
            return _this18.onMonthDropdownChange(e, e.target.value);
          },
          value: viewMonth
        }, displayedMonthOptions.map(function (option) {
          return /*#__PURE__*/React.createElement("option", {
            key: option.label,
            value: option.value
          }, option.label);
        }));

        if (this.props.monthNavigatorTemplate) {
          var defaultContentOptions = {
            onChange: this.onMonthDropdownChange,
            className: 'p-datepicker-month',
            value: viewMonth,
            names: displayedMonthNames,
            options: displayedMonthOptions,
            element: content,
            props: this.props
          };
          return ObjectUtils.getJSXElement(this.props.monthNavigatorTemplate, defaultContentOptions);
        }

        return content;
      } else {
        return /*#__PURE__*/React.createElement("span", {
          className: "p-datepicker-month"
        }, monthNames[month]);
      }
    }
  }, {
    key: "renderTitleYearElement",
    value: function renderTitleYearElement(year) {
      var _this19 = this;

      if (this.props.yearNavigator) {
        var yearOptions = [];
        var years = this.props.yearRange.split(':');
        var yearStart = parseInt(years[0], 10);
        var yearEnd = parseInt(years[1], 10);

        for (var i = yearStart; i <= yearEnd; i++) {
          yearOptions.push(i);
        }

        var viewDate = this.getViewDate();
        var viewYear = viewDate.getFullYear();
        var displayedYearNames = yearOptions.filter(function (year) {
          return !(_this19.props.minDate && _this19.props.minDate.getFullYear() > year) && !(_this19.props.maxDate && _this19.props.maxDate.getFullYear() < year);
        });
        var content = /*#__PURE__*/React.createElement("select", {
          className: "p-datepicker-year",
          onChange: function onChange(e) {
            return _this19.onYearDropdownChange(e, e.target.value);
          },
          value: viewYear
        }, displayedYearNames.map(function (year) {
          return /*#__PURE__*/React.createElement("option", {
            key: year,
            value: year
          }, year);
        }));

        if (this.props.yearNavigatorTemplate) {
          var options = displayedYearNames.map(function (name, i) {
            return {
              label: name,
              value: name,
              index: i
            };
          });
          var defaultContentOptions = {
            onChange: this.onYearDropdownChange,
            className: 'p-datepicker-year',
            value: viewYear,
            names: displayedYearNames,
            options: options,
            element: content,
            props: this.props
          };
          return ObjectUtils.getJSXElement(this.props.yearNavigatorTemplate, defaultContentOptions);
        }

        return content;
      } else {
        return /*#__PURE__*/React.createElement("span", {
          className: "p-datepicker-year"
        }, year);
      }
    }
  }, {
    key: "renderTitle",
    value: function renderTitle(monthMetaData) {
      var month = this.renderTitleMonthElement(monthMetaData.month);
      var year = this.renderTitleYearElement(monthMetaData.year);
      return /*#__PURE__*/React.createElement("div", {
        className: "p-datepicker-title"
      }, month, year);
    }
  }, {
    key: "renderDayNames",
    value: function renderDayNames(weekDays) {
      var dayNames = weekDays.map(function (weekDay, index) {
        return /*#__PURE__*/React.createElement("th", {
          key: "".concat(weekDay, "-").concat(index),
          scope: "col"
        }, /*#__PURE__*/React.createElement("span", null, weekDay));
      });

      if (this.props.showWeek) {
        var weekHeader = /*#__PURE__*/React.createElement("th", {
          scope: "col",
          key: 'wn',
          className: "p-datepicker-weekheader p-disabled"
        }, /*#__PURE__*/React.createElement("span", null, localeOption('weekHeader', this.props.locale)));
        return [weekHeader].concat(_toConsumableArray(dayNames));
      } else {
        return dayNames;
      }
    }
  }, {
    key: "renderDateCellContent",
    value: function renderDateCellContent(date, className, groupIndex) {
      var _this20 = this;

      var content = this.props.dateTemplate ? this.props.dateTemplate(date) : date.day;
      return /*#__PURE__*/React.createElement("span", {
        className: className,
        onClick: function onClick(e) {
          return _this20.onDateSelect(e, date);
        },
        onKeyDown: function onKeyDown(e) {
          return _this20.onDateCellKeydown(e, date, groupIndex);
        }
      }, content, /*#__PURE__*/React.createElement(Ripple, null));
    }
  }, {
    key: "renderWeek",
    value: function renderWeek(weekDates, weekNumber, groupIndex) {
      var _this21 = this;

      var week = weekDates.map(function (date) {
        var selected = _this21.isSelected(date);

        var cellClassName = classNames({
          'p-datepicker-other-month': date.otherMonth,
          'p-datepicker-today': date.today
        });
        var dateClassName = classNames({
          'p-highlight': selected,
          'p-disabled': !date.selectable
        });
        var content = date.otherMonth && !_this21.props.showOtherMonths ? null : _this21.renderDateCellContent(date, dateClassName, groupIndex);
        return /*#__PURE__*/React.createElement("td", {
          key: date.day,
          className: cellClassName
        }, content);
      });

      if (this.props.showWeek) {
        var weekNumberCell = /*#__PURE__*/React.createElement("td", {
          key: 'wn' + weekNumber,
          className: "p-datepicker-weeknumber"
        }, /*#__PURE__*/React.createElement("span", {
          className: "p-disabled"
        }, weekNumber));
        return [weekNumberCell].concat(_toConsumableArray(week));
      } else {
        return week;
      }
    }
  }, {
    key: "renderDates",
    value: function renderDates(monthMetaData, groupIndex) {
      var _this22 = this;

      return monthMetaData.dates.map(function (weekDates, index) {
        return /*#__PURE__*/React.createElement("tr", {
          key: index
        }, _this22.renderWeek(weekDates, monthMetaData.weekNumbers[index], groupIndex));
      });
    }
  }, {
    key: "renderDateViewGrid",
    value: function renderDateViewGrid(monthMetaData, weekDays, groupIndex) {
      var dayNames = this.renderDayNames(weekDays);
      var dates = this.renderDates(monthMetaData, groupIndex);
      return /*#__PURE__*/React.createElement("div", {
        className: "p-datepicker-calendar-container"
      }, /*#__PURE__*/React.createElement("table", {
        className: "p-datepicker-calendar"
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, dayNames)), /*#__PURE__*/React.createElement("tbody", null, dates)));
    }
  }, {
    key: "renderMonth",
    value: function renderMonth(monthMetaData, index) {
      var weekDays = this.createWeekDays();
      var backwardNavigator = this.renderBackwardNavigator(index === 0);
      var forwardNavigator = this.renderForwardNavigator(this.props.numberOfMonths === 1 || index === this.props.numberOfMonths - 1);
      var title = this.renderTitle(monthMetaData);
      var dateViewGrid = this.renderDateViewGrid(monthMetaData, weekDays, index);
      var header = this.props.headerTemplate ? this.props.headerTemplate() : null;
      return /*#__PURE__*/React.createElement("div", {
        key: monthMetaData.month,
        className: "p-datepicker-group"
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-datepicker-header"
      }, header, backwardNavigator, title, forwardNavigator), dateViewGrid);
    }
  }, {
    key: "renderMonths",
    value: function renderMonths(monthsMetaData) {
      var _this23 = this;

      var groups = monthsMetaData.map(function (monthMetaData, index) {
        return _this23.renderMonth(monthMetaData, index);
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "p-datepicker-group-container"
      }, groups);
    }
  }, {
    key: "renderDateView",
    value: function renderDateView() {
      var viewDate = this.getViewDate();
      var monthsMetaData = this.createMonths(viewDate.getMonth(), viewDate.getFullYear());
      var months = this.renderMonths(monthsMetaData);
      return /*#__PURE__*/React.createElement(React.Fragment, null, months);
    }
  }, {
    key: "renderMonthViewMonth",
    value: function renderMonthViewMonth(index) {
      var _this24 = this;

      var className = classNames('p-monthpicker-month', {
        'p-highlight': this.isMonthSelected(index)
      });
      var monthNamesShort = localeOption('monthNamesShort', this.props.locale);
      var monthName = monthNamesShort[index];
      return /*#__PURE__*/React.createElement("span", {
        key: monthName,
        className: className,
        onClick: function onClick(event) {
          return _this24.onMonthSelect(event, index);
        },
        onKeyDown: function onKeyDown(event) {
          return _this24.onMonthCellKeydown(event, index);
        }
      }, monthName, /*#__PURE__*/React.createElement(Ripple, null));
    }
  }, {
    key: "renderMonthViewMonths",
    value: function renderMonthViewMonths() {
      var months = [];

      for (var i = 0; i <= 11; i++) {
        months.push(this.renderMonthViewMonth(i));
      }

      return months;
    }
  }, {
    key: "renderMonthView",
    value: function renderMonthView() {
      var backwardNavigator = this.renderBackwardNavigator(true);
      var forwardNavigator = this.renderForwardNavigator(true);
      var yearElement = this.renderTitleYearElement(this.getViewDate().getFullYear());
      var months = this.renderMonthViewMonths();
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "p-datepicker-group-container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-datepicker-group"
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-datepicker-header"
      }, backwardNavigator, /*#__PURE__*/React.createElement("div", {
        className: "p-datepicker-title"
      }, yearElement), forwardNavigator))), /*#__PURE__*/React.createElement("div", {
        className: "p-monthpicker"
      }, months));
    }
  }, {
    key: "renderDatePicker",
    value: function renderDatePicker() {
      if (!this.props.timeOnly) {
        if (this.props.view === 'date') {
          return this.renderDateView();
        } else if (this.props.view === 'month') {
          return this.renderMonthView();
        } else {
          return null;
        }
      }
    }
  }, {
    key: "renderHourPicker",
    value: function renderHourPicker() {
      var _this25 = this;

      var currentTime = this.getCurrentDateTime();
      var hour = currentTime.getHours();

      if (this.props.hourFormat === '12') {
        if (hour === 0) hour = 12;else if (hour > 11 && hour !== 12) hour = hour - 12;
      }

      var hourDisplay = hour < 10 ? '0' + hour : hour;
      return /*#__PURE__*/React.createElement("div", {
        className: "p-hour-picker"
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "p-link",
        onMouseDown: function onMouseDown(e) {
          return _this25.onTimePickerElementMouseDown(e, 0, 1);
        },
        onMouseUp: this.onTimePickerElementMouseUp,
        onMouseLeave: this.onTimePickerElementMouseLeave,
        onKeyDown: function onKeyDown(e) {
          return _this25.onContainerButtonKeydown(e);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "pi pi-chevron-up"
      }), /*#__PURE__*/React.createElement(Ripple, null)), /*#__PURE__*/React.createElement("span", null, hourDisplay), /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "p-link",
        onMouseDown: function onMouseDown(e) {
          return _this25.onTimePickerElementMouseDown(e, 0, -1);
        },
        onMouseUp: this.onTimePickerElementMouseUp,
        onMouseLeave: this.onTimePickerElementMouseLeave,
        onKeyDown: function onKeyDown(e) {
          return _this25.onContainerButtonKeydown(e);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "pi pi-chevron-down"
      }), /*#__PURE__*/React.createElement(Ripple, null)));
    }
  }, {
    key: "renderMinutePicker",
    value: function renderMinutePicker() {
      var _this26 = this;

      var currentTime = this.getCurrentDateTime();
      var minute = currentTime.getMinutes();
      var minuteDisplay = minute < 10 ? '0' + minute : minute;
      return /*#__PURE__*/React.createElement("div", {
        className: "p-minute-picker"
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "p-link",
        onMouseDown: function onMouseDown(e) {
          return _this26.onTimePickerElementMouseDown(e, 1, 1);
        },
        onMouseUp: this.onTimePickerElementMouseUp,
        onMouseLeave: this.onTimePickerElementMouseLeave,
        onKeyDown: function onKeyDown(e) {
          return _this26.onContainerButtonKeydown(e);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "pi pi-chevron-up"
      }), /*#__PURE__*/React.createElement(Ripple, null)), /*#__PURE__*/React.createElement("span", null, minuteDisplay), /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "p-link",
        onMouseDown: function onMouseDown(e) {
          return _this26.onTimePickerElementMouseDown(e, 1, -1);
        },
        onMouseUp: this.onTimePickerElementMouseUp,
        onMouseLeave: this.onTimePickerElementMouseLeave,
        onKeyDown: function onKeyDown(e) {
          return _this26.onContainerButtonKeydown(e);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "pi pi-chevron-down"
      }), /*#__PURE__*/React.createElement(Ripple, null)));
    }
  }, {
    key: "renderSecondPicker",
    value: function renderSecondPicker() {
      var _this27 = this;

      if (this.props.showSeconds) {
        var currentTime = this.getCurrentDateTime();
        var second = currentTime.getSeconds();
        var secondDisplay = second < 10 ? '0' + second : second;
        return /*#__PURE__*/React.createElement("div", {
          className: "p-second-picker"
        }, /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: "p-link",
          onMouseDown: function onMouseDown(e) {
            return _this27.onTimePickerElementMouseDown(e, 2, 1);
          },
          onMouseUp: this.onTimePickerElementMouseUp,
          onMouseLeave: this.onTimePickerElementMouseLeave,
          onKeyDown: function onKeyDown(e) {
            return _this27.onContainerButtonKeydown(e);
          }
        }, /*#__PURE__*/React.createElement("span", {
          className: "pi pi-chevron-up"
        }), /*#__PURE__*/React.createElement(Ripple, null)), /*#__PURE__*/React.createElement("span", null, secondDisplay), /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: "p-link",
          onMouseDown: function onMouseDown(e) {
            return _this27.onTimePickerElementMouseDown(e, 2, -1);
          },
          onMouseUp: this.onTimePickerElementMouseUp,
          onMouseLeave: this.onTimePickerElementMouseLeave,
          onKeyDown: function onKeyDown(e) {
            return _this27.onContainerButtonKeydown(e);
          }
        }, /*#__PURE__*/React.createElement("span", {
          className: "pi pi-chevron-down"
        }), /*#__PURE__*/React.createElement(Ripple, null)));
      }

      return null;
    }
  }, {
    key: "renderMiliSecondPicker",
    value: function renderMiliSecondPicker() {
      var _this28 = this;

      if (this.props.showMillisec) {
        var currentTime = this.getCurrentDateTime();
        var millisecond = currentTime.getMilliseconds();
        var millisecondDisplay = millisecond < 100 ? (millisecond < 10 ? '00' : '0') + millisecond : millisecond;
        return /*#__PURE__*/React.createElement("div", {
          className: "p-millisecond-picker"
        }, /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: "p-link",
          onMouseDown: function onMouseDown(e) {
            return _this28.onTimePickerElementMouseDown(e, 3, 1);
          },
          onMouseUp: this.onTimePickerElementMouseUp,
          onMouseLeave: this.onTimePickerElementMouseLeave,
          onKeyDown: function onKeyDown(e) {
            return _this28.onContainerButtonKeydown(e);
          }
        }, /*#__PURE__*/React.createElement("span", {
          className: "pi pi-chevron-up"
        }), /*#__PURE__*/React.createElement(Ripple, null)), /*#__PURE__*/React.createElement("span", null, millisecondDisplay), /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: "p-link",
          onMouseDown: function onMouseDown(e) {
            return _this28.onTimePickerElementMouseDown(e, 3, -1);
          },
          onMouseUp: this.onTimePickerElementMouseUp,
          onMouseLeave: this.onTimePickerElementMouseLeave,
          onKeyDown: function onKeyDown(e) {
            return _this28.onContainerButtonKeydown(e);
          }
        }, /*#__PURE__*/React.createElement("span", {
          className: "pi pi-chevron-down"
        }), /*#__PURE__*/React.createElement(Ripple, null)));
      }

      return null;
    }
  }, {
    key: "renderAmPmPicker",
    value: function renderAmPmPicker() {
      if (this.props.hourFormat === '12') {
        var currentTime = this.getCurrentDateTime();
        var hour = currentTime.getHours();
        var display = hour > 11 ? 'PM' : 'AM';
        return /*#__PURE__*/React.createElement("div", {
          className: "p-ampm-picker"
        }, /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: "p-link",
          onClick: this.toggleAmPm
        }, /*#__PURE__*/React.createElement("span", {
          className: "pi pi-chevron-up"
        }), /*#__PURE__*/React.createElement(Ripple, null)), /*#__PURE__*/React.createElement("span", null, display), /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: "p-link",
          onClick: this.toggleAmPm
        }, /*#__PURE__*/React.createElement("span", {
          className: "pi pi-chevron-down"
        }), /*#__PURE__*/React.createElement(Ripple, null)));
      }

      return null;
    }
  }, {
    key: "renderSeparator",
    value: function renderSeparator(separator) {
      return /*#__PURE__*/React.createElement("div", {
        className: "p-separator"
      }, /*#__PURE__*/React.createElement("span", null, separator));
    }
  }, {
    key: "renderTimePicker",
    value: function renderTimePicker() {
      if (this.props.showTime || this.props.timeOnly) {
        return /*#__PURE__*/React.createElement("div", {
          className: "p-timepicker"
        }, this.renderHourPicker(), this.renderSeparator(':'), this.renderMinutePicker(), this.props.showSeconds && this.renderSeparator(':'), this.renderSecondPicker(), this.props.showMillisec && this.renderSeparator('.'), this.renderMiliSecondPicker(), this.props.hourFormat === '12' && this.renderSeparator(':'), this.renderAmPmPicker());
      }

      return null;
    }
  }, {
    key: "renderInputElement",
    value: function renderInputElement() {
      if (!this.props.inline) {
        return /*#__PURE__*/React.createElement(InputText, {
          ref: this.inputRef,
          id: this.props.inputId,
          name: this.props.name,
          type: "text",
          className: this.props.inputClassName,
          style: this.props.inputStyle,
          readOnly: this.props.readOnlyInput,
          disabled: this.props.disabled,
          required: this.props.required,
          autoComplete: "off",
          placeholder: this.props.placeholder,
          onInput: this.onUserInput,
          onFocus: this.onInputFocus,
          onBlur: this.onInputBlur,
          onKeyDown: this.onInputKeyDown,
          "aria-labelledby": this.props.ariaLabelledBy,
          inputMode: this.props.inputMode
        });
      }

      return null;
    }
  }, {
    key: "renderButton",
    value: function renderButton() {
      if (this.props.showIcon) {
        return /*#__PURE__*/React.createElement(Button, {
          type: "button",
          icon: this.props.icon,
          onClick: this.onButtonClick,
          tabIndex: "-1",
          disabled: this.props.disabled,
          className: "p-datepicker-trigger"
        });
      }

      return null;
    }
  }, {
    key: "renderButtonBar",
    value: function renderButtonBar() {
      var _this29 = this;

      if (this.props.showButtonBar) {
        var todayClassName = classNames('p-button-text', this.props.todayButtonClassName);
        var clearClassName = classNames('p-button-text', this.props.clearButtonClassName);

        var _localeOptions4 = localeOptions(this.props.locale),
            today = _localeOptions4.today,
            clear = _localeOptions4.clear;

        return /*#__PURE__*/React.createElement("div", {
          className: "p-datepicker-buttonbar"
        }, /*#__PURE__*/React.createElement(Button, {
          type: "button",
          label: today,
          onClick: this.onTodayButtonClick,
          onKeyDown: function onKeyDown(e) {
            return _this29.onContainerButtonKeydown(e);
          },
          className: todayClassName
        }), /*#__PURE__*/React.createElement(Button, {
          type: "button",
          label: clear,
          onClick: this.onClearButtonClick,
          onKeyDown: function onKeyDown(e) {
            return _this29.onContainerButtonKeydown(e);
          },
          className: clearClassName
        }));
      }

      return null;
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      if (this.props.footerTemplate) {
        var content = this.props.footerTemplate();
        return /*#__PURE__*/React.createElement("div", {
          className: "p-datepicker-footer"
        }, content);
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this30 = this;

      var className = classNames('p-calendar p-component p-inputwrapper', this.props.className, {
        'p-calendar-w-btn': this.props.showIcon,
        'p-calendar-disabled': this.props.disabled,
        'p-calendar-timeonly': this.props.timeOnly,
        'p-inputwrapper-filled': this.props.value || DomHandler.hasClass(this.inputRef.current, 'p-filled') && this.inputRef.current.value !== '',
        'p-inputwrapper-focus': this.state.focused
      });
      var panelClassName = classNames('p-datepicker p-component', this.props.panelClassName, {
        'p-datepicker-inline': this.props.inline,
        'p-disabled': this.props.disabled,
        'p-datepicker-timeonly': this.props.timeOnly,
        'p-datepicker-multiple-month': this.props.numberOfMonths > 1,
        'p-datepicker-monthpicker': this.props.view === 'month',
        'p-datepicker-touch-ui': this.props.touchUI
      });
      var input = this.renderInputElement();
      var button = this.renderButton();
      var datePicker = this.renderDatePicker();
      var timePicker = this.renderTimePicker();
      var buttonBar = this.renderButtonBar();
      var footer = this.renderFooter();
      var isVisible = this.props.inline || this.isVisible();
      return /*#__PURE__*/React.createElement("span", {
        ref: function ref(el) {
          return _this30.container = el;
        },
        id: this.props.id,
        className: className,
        style: this.props.style
      }, input, button, /*#__PURE__*/React.createElement(CalendarPanel, {
        ref: this.overlayRef,
        className: panelClassName,
        style: this.props.panelStyle,
        appendTo: this.props.appendTo,
        inline: this.props.inline,
        onClick: this.onPanelClick,
        in: isVisible,
        onEnter: this.onOverlayEnter,
        onEntered: this.onOverlayEntered,
        onExit: this.onOverlayExit,
        onExited: this.onOverlayExited,
        transitionOptions: this.props.transitionOptions
      }, datePicker, timePicker, buttonBar, footer));
    }
  }]);

  return Calendar;
}(Component);

_defineProperty(Calendar, "defaultProps", {
  id: null,
  inputRef: null,
  name: null,
  value: null,
  visible: false,
  viewDate: null,
  style: null,
  className: null,
  inline: false,
  selectionMode: 'single',
  inputId: null,
  inputStyle: null,
  inputClassName: null,
  inputMode: 'none',
  required: false,
  readOnlyInput: false,
  keepInvalid: false,
  mask: null,
  disabled: false,
  tabIndex: null,
  placeholder: null,
  showIcon: false,
  icon: 'pi pi-calendar',
  showOnFocus: true,
  numberOfMonths: 1,
  view: 'date',
  touchUI: false,
  showTime: false,
  timeOnly: false,
  showSeconds: false,
  showMillisec: false,
  hourFormat: '24',
  stepHour: 1,
  stepMinute: 1,
  stepSecond: 1,
  stepMillisec: 1,
  shortYearCutoff: '+10',
  hideOnDateTimeSelect: false,
  showWeek: false,
  locale: null,
  dateFormat: null,
  panelStyle: null,
  panelClassName: null,
  monthNavigator: false,
  yearNavigator: false,
  yearRange: null,
  disabledDates: null,
  disabledDays: null,
  minDate: null,
  maxDate: null,
  maxDateCount: null,
  showOtherMonths: true,
  selectOtherMonths: false,
  showButtonBar: false,
  todayButtonClassName: 'p-button-secondary',
  clearButtonClassName: 'p-button-secondary',
  autoZIndex: true,
  baseZIndex: 0,
  appendTo: null,
  tooltip: null,
  tooltipOptions: null,
  ariaLabelledBy: null,
  dateTemplate: null,
  headerTemplate: null,
  footerTemplate: null,
  monthNavigatorTemplate: null,
  yearNavigatorTemplate: null,
  transitionOptions: null,
  onVisibleChange: null,
  onFocus: null,
  onBlur: null,
  onInput: null,
  onSelect: null,
  onChange: null,
  onViewDateChange: null,
  onTodayButtonClick: null,
  onClearButtonClick: null,
  onShow: null,
  onHide: null
});

export { Calendar };
