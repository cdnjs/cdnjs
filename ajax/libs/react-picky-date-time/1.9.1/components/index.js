"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils.js");

var _index = _interopRequireDefault(require("./Calendar/index.js"));

var _index2 = _interopRequireDefault(require("./Clock/index.js"));

var _constValue = require("./constValue.js");

var _locale = require("./locale.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var STYLES = {};

try {
  STYLES = {
    "picky-date-time": "index__picky-date-time",
    "visible": "index__visible",
    "picky-date-time__calendar": "index__picky-date-time__calendar",
    "picky-date-time__clock": "index__picky-date-time__clock",
    "picky-date-time__close": "index__picky-date-time__close",
    "picky-date-time__breaker": "index__picky-date-time__breaker",
    "l": "index__l",
    "m": "index__m",
    "s": "index__s",
    "xs": "index__xs"
  };

  if (!STYLES) {
    console.log('');
  }
} catch (ex) {}

var Index = /*#__PURE__*/function (_React$Component) {
  _inherits(Index, _React$Component);

  var _super = _createSuper(Index);

  function Index(props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, props);
    _this.onYearPicked = _this.onYearPicked.bind(_assertThisInitialized(_this));
    _this.onMonthPicked = _this.onMonthPicked.bind(_assertThisInitialized(_this));
    _this.onDatePicked = _this.onDatePicked.bind(_assertThisInitialized(_this));
    _this.onResetDate = _this.onResetDate.bind(_assertThisInitialized(_this));
    _this.onResetDefaultDate = _this.onResetDefaultDate.bind(_assertThisInitialized(_this));
    _this.onSecondChange = _this.onSecondChange.bind(_assertThisInitialized(_this));
    _this.onMinuteChange = _this.onMinuteChange.bind(_assertThisInitialized(_this));
    _this.onHourChange = _this.onHourChange.bind(_assertThisInitialized(_this));
    _this.onMeridiemChange = _this.onMeridiemChange.bind(_assertThisInitialized(_this));
    _this.onResetTime = _this.onResetTime.bind(_assertThisInitialized(_this));
    _this.onClearTime = _this.onClearTime.bind(_assertThisInitialized(_this));
    _this.onResetDefaultTime = _this.onResetDefaultTime.bind(_assertThisInitialized(_this));
    _this.onClose = _this.onClose.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Index, [{
    key: "onClose",
    value: function onClose() {
      var onClose = this.props.onClose;
      onClose && onClose();
    } // CALENDAR

  }, {
    key: "onYearPicked",
    value: function onYearPicked(yearInfo) {
      this.props.onYearPicked(yearInfo);
    }
  }, {
    key: "onMonthPicked",
    value: function onMonthPicked(monthInfo) {
      this.props.onMonthPicked(monthInfo);
    }
  }, {
    key: "onDatePicked",
    value: function onDatePicked(dateInfo) {
      this.props.onDatePicked(dateInfo);
    }
  }, {
    key: "onResetDate",
    value: function onResetDate(dateInfo) {
      this.props.onResetDate(dateInfo);
    }
  }, {
    key: "onResetDefaultDate",
    value: function onResetDefaultDate(dateInfo) {
      this.props.onResetDefaultDate(dateInfo);
    } // CLOCK

  }, {
    key: "onSecondChange",
    value: function onSecondChange(secondInfo) {
      this.props.onSecondChange(secondInfo);
    }
  }, {
    key: "onMinuteChange",
    value: function onMinuteChange(minuteInfo) {
      this.props.onMinuteChange(minuteInfo);
    }
  }, {
    key: "onHourChange",
    value: function onHourChange(hourInfo) {
      this.props.onHourChange(hourInfo);
    }
  }, {
    key: "onMeridiemChange",
    value: function onMeridiemChange(meridiemInfo) {
      this.props.onMeridiemChange(meridiemInfo);
    }
  }, {
    key: "onResetTime",
    value: function onResetTime(Info) {
      this.props.onResetTime(Info);
    }
  }, {
    key: "onClearTime",
    value: function onClearTime(Info) {
      this.props.onClearTime(Info);
    }
  }, {
    key: "onResetDefaultTime",
    value: function onResetDefaultTime(Info) {
      this.props.onResetDefaultTime(Info);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          size = _this$props.size,
          defaultDate = _this$props.defaultDate,
          defaultTime = _this$props.defaultTime,
          show = _this$props.show,
          locale = _this$props.locale,
          mode = _this$props.mode,
          markedDates = _this$props.markedDates,
          supportDateRange = _this$props.supportDateRange;
      var componentClass = (0, _utils.cx)('picky-date-time', show && 'visible');
      var calendarHtml;
      var breakerHtml;
      var clockHtml;
      size = size.toLowerCase();

      if (_constValue.SIZE_RANGE.indexOf(size) == -1) {
        size = _constValue.DEFAULT_SIZE;
      }

      locale = locale.toLowerCase();

      if (typeof _locale.LOCALE[locale] === 'undefined') {
        locale = _locale.DEFAULT_LACALE;
      }

      if (mode == 0) {
        calendarHtml = /*#__PURE__*/_react["default"].createElement("div", {
          className: "picky-date-time__calendar"
        }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
          size: size,
          defaultDate: defaultDate,
          markedDates: markedDates,
          supportDateRange: supportDateRange,
          locale: locale,
          onYearPicked: this.onYearPicked,
          onMonthPicked: this.onMonthPicked,
          onDatePicked: this.onDatePicked,
          onResetDate: this.onResetDate,
          onResetDefaultDate: this.onResetDefaultDate
        }));
      }

      if (mode == 1) {
        calendarHtml = /*#__PURE__*/_react["default"].createElement("div", {
          className: "picky-date-time__calendar"
        }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
          size: size,
          defaultDate: defaultDate,
          locale: locale,
          markedDates: markedDates,
          supportDateRange: supportDateRange,
          onYearPicked: this.onYearPicked,
          onMonthPicked: this.onMonthPicked,
          onDatePicked: this.onDatePicked,
          onResetDate: this.onResetDate,
          onResetDefaultDate: this.onResetDefaultDate
        }));
        breakerHtml = /*#__PURE__*/_react["default"].createElement("span", {
          className: "picky-date-time__breaker ".concat([size])
        }, "\xA0\xA0");
        clockHtml = /*#__PURE__*/_react["default"].createElement("div", {
          className: "picky-date-time__clock ".concat([size])
        }, /*#__PURE__*/_react["default"].createElement(_index2["default"], {
          size: size,
          locale: locale,
          defaultTime: defaultTime,
          onSecondChange: this.onSecondChange,
          onMinuteChange: this.onMinuteChange,
          onHourChange: this.onHourChange,
          onMeridiemChange: this.onMeridiemChange,
          onResetTime: this.onResetTime,
          onClearTime: this.onClearTime,
          onResetDefaultTime: this.onResetDefaultTime
        }));
      }

      if (mode == 2) {
        clockHtml = /*#__PURE__*/_react["default"].createElement("div", {
          className: "picky-date-time__clock ".concat([size])
        }, /*#__PURE__*/_react["default"].createElement(_index2["default"], {
          size: size,
          locale: locale,
          defaultTime: defaultTime,
          onSecondChange: this.onSecondChange,
          onMinuteChange: this.onMinuteChange,
          onHourChange: this.onHourChange,
          onMeridiemChange: this.onMeridiemChange,
          onResetTime: this.onResetTime,
          onClearTime: this.onClearTime,
          onResetDefaultTime: this.onResetDefaultTime
        }));
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(componentClass)
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        className: "picky-date-time__close",
        viewBox: "0 0 20 20",
        width: "15",
        height: "15",
        onClick: this.onClose
      }, /*#__PURE__*/_react["default"].createElement("path", {
        fill: "#868e96",
        d: "M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"
      })), calendarHtml, breakerHtml, clockHtml);
    }
  }]);

  return Index;
}(_react["default"].Component);

Index.propTypes = {
  mode: _propTypes["default"].number,
  size: _propTypes["default"].string,
  locale: _propTypes["default"].string,
  markedDates: _propTypes["default"].array,
  supportDateRange: _propTypes["default"].array,
  defaultDate: _propTypes["default"].string,
  defaultTime: _propTypes["default"].string,
  show: _propTypes["default"].bool,
  onClose: _propTypes["default"].func,
  onYearPicked: _propTypes["default"].func,
  onMonthPicked: _propTypes["default"].func,
  onDatePicked: _propTypes["default"].func,
  onResetDate: _propTypes["default"].func,
  onSecondChange: _propTypes["default"].func,
  onMinuteChange: _propTypes["default"].func,
  onHourChange: _propTypes["default"].func,
  onMeridiemChange: _propTypes["default"].func,
  onResetTime: _propTypes["default"].func,
  onClearTime: _propTypes["default"].func,
  onResetDefaultDate: _propTypes["default"].func,
  onResetDefaultTime: _propTypes["default"].func
};
Index.defaultProps = {
  locale: _locale.DEFAULT_LACALE,
  size: _constValue.DEFAULT_SIZE,
  markedDates: [],
  supportDateRange: [],
  show: false,
  mode: 0,
  // GENERAL
  onClose: function onClose() {},
  // CALENDAR
  defaultDate: '',
  onYearPicked: function onYearPicked() {},
  onMonthPicked: function onMonthPicked() {},
  onDatePicked: function onDatePicked() {},
  onResetDate: function onResetDate() {},
  onResetDefaultDate: function onResetDefaultDate() {},
  // CLOCK
  defaultTime: '',
  onSecondChange: function onSecondChange() {},
  onMinuteChange: function onMinuteChange() {},
  onHourChange: function onHourChange() {},
  onMeridiemChange: function onMeridiemChange() {},
  onResetTime: function onResetTime() {},
  onClearTime: function onClearTime() {},
  onResetDefaultTime: function onResetDefaultTime() {}
};
var _default = Index;
exports["default"] = _default;