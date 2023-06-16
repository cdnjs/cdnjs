"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _makeEventProps = _interopRequireDefault(require("make-event-props"));
var _clsx = _interopRequireDefault(require("clsx"));
var _reactCalendar = _interopRequireDefault(require("react-calendar"));
var _reactFit = _interopRequireDefault(require("react-fit"));
var _DateInput = _interopRequireDefault(require("./DateInput"));
var _propTypes2 = require("./shared/propTypes");
var _excluded = ["calendarClassName", "className", "onChange", "portalContainer", "value"],
  _excluded2 = ["onChange"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var baseClassName = 'react-date-picker';
var outsideActionEvents = ['mousedown', 'focusin', 'touchstart'];
var allViews = ['century', 'decade', 'year', 'month'];
var DatePicker = /*#__PURE__*/function (_PureComponent) {
  _inherits(DatePicker, _PureComponent);
  var _super = _createSuper(DatePicker);
  function DatePicker() {
    var _this;
    _classCallCheck(this, DatePicker);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {});
    _defineProperty(_assertThisInitialized(_this), "wrapper", /*#__PURE__*/(0, _react.createRef)());
    _defineProperty(_assertThisInitialized(_this), "calendarWrapper", /*#__PURE__*/(0, _react.createRef)());
    _defineProperty(_assertThisInitialized(_this), "onOutsideAction", function (event) {
      var _assertThisInitialize = _assertThisInitialized(_this),
        wrapper = _assertThisInitialize.wrapper,
        calendarWrapper = _assertThisInitialize.calendarWrapper;

      // Try event.composedPath first to handle clicks inside a Shadow DOM.
      var target = 'composedPath' in event ? event.composedPath()[0] : event.target;
      if (wrapper.current && !wrapper.current.contains(target) && (!calendarWrapper.current || !calendarWrapper.current.contains(target))) {
        _this.closeCalendar();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onChange", function (value) {
      var closeCalendar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.closeCalendar;
      var onChange = _this.props.onChange;
      if (closeCalendar) {
        _this.closeCalendar();
      }
      if (onChange) {
        onChange(value);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onFocus", function (event) {
      var _this$props = _this.props,
        disabled = _this$props.disabled,
        onFocus = _this$props.onFocus,
        openCalendarOnFocus = _this$props.openCalendarOnFocus;
      if (onFocus) {
        onFocus(event);
      }

      // Internet Explorer still fires onFocus on disabled elements
      if (disabled) {
        return;
      }
      if (openCalendarOnFocus) {
        if (event.target.dataset.select === 'true') {
          return;
        }
        _this.openCalendar();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      if (event.key === 'Escape') {
        _this.closeCalendar();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "openCalendar", function () {
      _this.setState({
        isOpen: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "closeCalendar", function () {
      _this.setState(function (prevState) {
        if (!prevState.isOpen) {
          return null;
        }
        return {
          isOpen: false
        };
      });
    });
    _defineProperty(_assertThisInitialized(_this), "toggleCalendar", function () {
      _this.setState(function (prevState) {
        return {
          isOpen: !prevState.isOpen
        };
      });
    });
    _defineProperty(_assertThisInitialized(_this), "stopPropagation", function (event) {
      return event.stopPropagation();
    });
    _defineProperty(_assertThisInitialized(_this), "clear", function () {
      return _this.onChange(null);
    });
    return _this;
  }
  _createClass(DatePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.handleOutsideActionListeners();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var isOpen = this.state.isOpen;
      var _this$props2 = this.props,
        onCalendarClose = _this$props2.onCalendarClose,
        onCalendarOpen = _this$props2.onCalendarOpen;
      if (isOpen !== prevState.isOpen) {
        this.handleOutsideActionListeners();
        var callback = isOpen ? onCalendarOpen : onCalendarClose;
        if (callback) callback();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.handleOutsideActionListeners(false);
    }
  }, {
    key: "eventProps",
    get: function get() {
      return (0, _makeEventProps["default"])(this.props);
    }
  }, {
    key: "handleOutsideActionListeners",
    value: function handleOutsideActionListeners(shouldListen) {
      var _this2 = this;
      var isOpen = this.state.isOpen;
      var shouldListenWithFallback = typeof shouldListen !== 'undefined' ? shouldListen : isOpen;
      var fnName = shouldListenWithFallback ? 'addEventListener' : 'removeEventListener';
      outsideActionEvents.forEach(function (eventName) {
        return document[fnName](eventName, _this2.onOutsideAction);
      });
      document[fnName]('keydown', this.onKeyDown);
    }
  }, {
    key: "renderInputs",
    value: function renderInputs() {
      var _this$props3 = this.props,
        autoFocus = _this$props3.autoFocus,
        calendarAriaLabel = _this$props3.calendarAriaLabel,
        calendarIcon = _this$props3.calendarIcon,
        clearAriaLabel = _this$props3.clearAriaLabel,
        clearIcon = _this$props3.clearIcon,
        dayAriaLabel = _this$props3.dayAriaLabel,
        dayPlaceholder = _this$props3.dayPlaceholder,
        disableCalendar = _this$props3.disableCalendar,
        disabled = _this$props3.disabled,
        format = _this$props3.format,
        locale = _this$props3.locale,
        maxDate = _this$props3.maxDate,
        maxDetail = _this$props3.maxDetail,
        minDate = _this$props3.minDate,
        monthAriaLabel = _this$props3.monthAriaLabel,
        monthPlaceholder = _this$props3.monthPlaceholder,
        name = _this$props3.name,
        nativeInputAriaLabel = _this$props3.nativeInputAriaLabel,
        required = _this$props3.required,
        returnValue = _this$props3.returnValue,
        showLeadingZeros = _this$props3.showLeadingZeros,
        value = _this$props3.value,
        yearAriaLabel = _this$props3.yearAriaLabel,
        yearPlaceholder = _this$props3.yearPlaceholder;
      var isOpen = this.state.isOpen;
      var _concat = [].concat(value),
        _concat2 = _slicedToArray(_concat, 1),
        valueFrom = _concat2[0];
      var ariaLabelProps = {
        dayAriaLabel: dayAriaLabel,
        monthAriaLabel: monthAriaLabel,
        nativeInputAriaLabel: nativeInputAriaLabel,
        yearAriaLabel: yearAriaLabel
      };
      var placeholderProps = {
        dayPlaceholder: dayPlaceholder,
        monthPlaceholder: monthPlaceholder,
        yearPlaceholder: yearPlaceholder
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClassName, "__wrapper")
      }, /*#__PURE__*/_react["default"].createElement(_DateInput["default"], _extends({}, ariaLabelProps, placeholderProps, {
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus: autoFocus,
        className: "".concat(baseClassName, "__inputGroup"),
        disabled: disabled,
        format: format,
        isCalendarOpen: isOpen,
        locale: locale,
        maxDate: maxDate,
        maxDetail: maxDetail,
        minDate: minDate,
        name: name,
        onChange: this.onChange,
        required: required,
        returnValue: returnValue,
        showLeadingZeros: showLeadingZeros,
        value: valueFrom
      })), clearIcon !== null && /*#__PURE__*/_react["default"].createElement("button", {
        "aria-label": clearAriaLabel,
        className: "".concat(baseClassName, "__clear-button ").concat(baseClassName, "__button"),
        disabled: disabled,
        onClick: this.clear,
        onFocus: this.stopPropagation,
        type: "button"
      }, clearIcon), calendarIcon !== null && !disableCalendar && /*#__PURE__*/_react["default"].createElement("button", {
        "aria-label": calendarAriaLabel,
        className: "".concat(baseClassName, "__calendar-button ").concat(baseClassName, "__button"),
        disabled: disabled,
        onBlur: this.resetValue,
        onClick: this.toggleCalendar,
        onFocus: this.stopPropagation,
        type: "button"
      }, calendarIcon));
    }
  }, {
    key: "renderCalendar",
    value: function renderCalendar() {
      var _this3 = this;
      var disableCalendar = this.props.disableCalendar;
      var isOpen = this.state.isOpen;
      if (isOpen === null || disableCalendar) {
        return null;
      }
      var _this$props4 = this.props,
        calendarClassName = _this$props4.calendarClassName,
        datePickerClassName = _this$props4.className,
        onChange = _this$props4.onChange,
        portalContainer = _this$props4.portalContainer,
        value = _this$props4.value,
        calendarProps = _objectWithoutProperties(_this$props4, _excluded);
      var className = "".concat(baseClassName, "__calendar");
      var classNames = (0, _clsx["default"])(className, "".concat(className, "--").concat(isOpen ? 'open' : 'closed'));
      var calendar = /*#__PURE__*/_react["default"].createElement(_reactCalendar["default"], _extends({
        className: calendarClassName,
        onChange: function onChange(value) {
          return _this3.onChange(value);
        },
        value: value || null
      }, calendarProps));
      return portalContainer ? /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.calendarWrapper,
        className: classNames
      }, calendar), portalContainer) : /*#__PURE__*/_react["default"].createElement(_reactFit["default"], null, /*#__PURE__*/_react["default"].createElement("div", {
        ref: function ref(_ref) {
          if (_ref && !isOpen) {
            _ref.removeAttribute('style');
          }
        },
        className: classNames
      }, calendar));
    }
  }, {
    key: "render",
    value: function render() {
      var eventProps = this.eventProps;
      var _this$props5 = this.props,
        className = _this$props5.className,
        dataTestid = _this$props5['data-testid'],
        disabled = _this$props5.disabled;
      var isOpen = this.state.isOpen;
      var onChange = eventProps.onChange,
        eventPropsWithoutOnChange = _objectWithoutProperties(eventProps, _excluded2);
      return /*#__PURE__*/_react["default"].createElement("div", _extends({
        className: (0, _clsx["default"])(baseClassName, "".concat(baseClassName, "--").concat(isOpen ? 'open' : 'closed'), "".concat(baseClassName, "--").concat(disabled ? 'disabled' : 'enabled'), className),
        "data-testid": dataTestid
      }, eventPropsWithoutOnChange, {
        onFocus: this.onFocus,
        ref: this.wrapper
      }), this.renderInputs(), this.renderCalendar());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.isOpen !== prevState.isOpenProps) {
        return {
          isOpen: nextProps.isOpen,
          isOpenProps: nextProps.isOpen
        };
      }
      return null;
    }
  }]);
  return DatePicker;
}(_react.PureComponent);
exports["default"] = DatePicker;
var iconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 19,
  height: 19,
  viewBox: '0 0 19 19',
  stroke: 'black',
  strokeWidth: 2
};
var CalendarIcon = /*#__PURE__*/_react["default"].createElement("svg", _extends({}, iconProps, {
  className: "".concat(baseClassName, "__calendar-button__icon ").concat(baseClassName, "__button__icon")
}), /*#__PURE__*/_react["default"].createElement("rect", {
  fill: "none",
  height: "15",
  width: "15",
  x: "2",
  y: "2"
}), /*#__PURE__*/_react["default"].createElement("line", {
  x1: "6",
  x2: "6",
  y1: "0",
  y2: "4"
}), /*#__PURE__*/_react["default"].createElement("line", {
  x1: "13",
  x2: "13",
  y1: "0",
  y2: "4"
}));
var ClearIcon = /*#__PURE__*/_react["default"].createElement("svg", _extends({}, iconProps, {
  className: "".concat(baseClassName, "__clear-button__icon ").concat(baseClassName, "__button__icon")
}), /*#__PURE__*/_react["default"].createElement("line", {
  x1: "4",
  x2: "15",
  y1: "4",
  y2: "15"
}), /*#__PURE__*/_react["default"].createElement("line", {
  x1: "15",
  x2: "4",
  y1: "4",
  y2: "15"
}));
DatePicker.defaultProps = {
  calendarIcon: CalendarIcon,
  clearIcon: ClearIcon,
  closeCalendar: true,
  isOpen: null,
  openCalendarOnFocus: true,
  returnValue: 'start'
};
var isValue = _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].instanceOf(Date)]);
DatePicker.propTypes = {
  autoFocus: _propTypes["default"].bool,
  calendarAriaLabel: _propTypes["default"].string,
  calendarClassName: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
  calendarIcon: _propTypes["default"].node,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
  clearAriaLabel: _propTypes["default"].string,
  clearIcon: _propTypes["default"].node,
  closeCalendar: _propTypes["default"].bool,
  'data-testid': _propTypes["default"].string,
  dayAriaLabel: _propTypes["default"].string,
  dayPlaceholder: _propTypes["default"].string,
  disableCalendar: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  format: _propTypes["default"].string,
  isOpen: _propTypes["default"].bool,
  locale: _propTypes["default"].string,
  maxDate: _propTypes2.isMaxDate,
  maxDetail: _propTypes["default"].oneOf(allViews),
  minDate: _propTypes2.isMinDate,
  monthAriaLabel: _propTypes["default"].string,
  monthPlaceholder: _propTypes["default"].string,
  name: _propTypes["default"].string,
  nativeInputAriaLabel: _propTypes["default"].string,
  onCalendarClose: _propTypes["default"].func,
  onCalendarOpen: _propTypes["default"].func,
  onChange: _propTypes["default"].func,
  onFocus: _propTypes["default"].func,
  openCalendarOnFocus: _propTypes["default"].bool,
  portalContainer: _propTypes["default"].object,
  required: _propTypes["default"].bool,
  returnValue: _propTypes["default"].oneOf(['start', 'end', 'range']),
  showLeadingZeros: _propTypes["default"].bool,
  value: _propTypes["default"].oneOfType([isValue, _propTypes["default"].arrayOf(isValue)]),
  yearAriaLabel: _propTypes["default"].string,
  yearPlaceholder: _propTypes["default"].string
};