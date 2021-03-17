"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Knob = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Knob = /*#__PURE__*/function (_Component) {
  _inherits(Knob, _Component);

  var _super = _createSuper(Knob);

  function Knob(props) {
    var _this;

    _classCallCheck(this, Knob);

    _this = _super.call(this, props);
    _this.state = {};
    _this.radius = 40;
    _this.midX = 50;
    _this.midY = 50;
    _this.minRadians = 4 * Math.PI / 3;
    _this.maxRadians = -Math.PI / 3;
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
    _this.onMouseUp = _this.onMouseUp.bind(_assertThisInitialized(_this));
    _this.onTouchStart = _this.onTouchStart.bind(_assertThisInitialized(_this));
    _this.onTouchEnd = _this.onTouchEnd.bind(_assertThisInitialized(_this));
    _this.onMouseMove = _this.onMouseMove.bind(_assertThisInitialized(_this));
    _this.onTouchMove = _this.onTouchMove.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Knob, [{
    key: "updateValue",
    value: function updateValue(offsetX, offsetY) {
      var dx = offsetX - this.props.size / 2;
      var dy = this.props.size / 2 - offsetY;
      var angle = Math.atan2(dy, dx);
      var start = -Math.PI / 2 - Math.PI / 6;
      this.updateModel(angle, start);
    }
  }, {
    key: "updateModel",
    value: function updateModel(angle, start) {
      var mappedValue;
      if (angle > this.maxRadians) mappedValue = this.mapRange(angle, this.minRadians, this.maxRadians, this.props.min, this.props.max);else if (angle < start) mappedValue = this.mapRange(angle + 2 * Math.PI, this.minRadians, this.maxRadians, this.props.min, this.props.max);else return;

      if (this.props.onChange) {
        var newValue = Math.round((mappedValue - this.props.min) / this.props.step) * this.props.step + this.props.min;
        this.props.onChange({
          value: newValue
        });
      }
    }
  }, {
    key: "mapRange",
    value: function mapRange(x, inMin, inMax, outMin, outMax) {
      return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      if (!this.props.disabled && !this.props.readOnly) {
        this.updateValue(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      }
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      if (!this.props.disabled && !this.props.readOnly) {
        this.windowMouseMoveListener = this.onMouseMove;
        this.windowMouseUpListener = this.onMouseUp;
        window.addEventListener('mousemove', this.windowMouseMoveListener);
        window.addEventListener('mouseup', this.windowMouseUpListener);
        event.preventDefault();
      }
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(event) {
      if (!this.props.disabled && !this.props.readOnly) {
        window.removeEventListener('mousemove', this.windowMouseMoveListener);
        window.removeEventListener('mouseup', this.windowMouseUpListener);
        this.windowMouseMoveListener = null;
        this.windowMouseUpListener = null;
        event.preventDefault();
      }
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(event) {
      if (!this.props.disabled && !this.props.readOnly) {
        this.windowTouchMoveListener = this.onTouchMove;
        this.windowTouchEndListener = this.onTouchEnd;
        window.addEventListener('touchmove', this.windowTouchMoveListener, {
          passive: false,
          cancelable: false
        });
        window.addEventListener('touchend', this.windowTouchEndListener);
      }
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(event) {
      if (!this.props.disabled && !this.props.readOnly) {
        window.removeEventListener('touchmove', this.windowTouchMoveListener);
        window.removeEventListener('touchend', this.windowTouchEndListener);
        this.windowTouchMoveListener = null;
        this.windowTouchEndListener = null;
      }
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      if (!this.props.disabled && !this.props.readOnly) {
        this.updateValue(event.offsetX, event.offsetY);
        event.preventDefault();
      }
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(event) {
      if (!this.props.disabled && !this.props.readOnly && event.touches.length === 1) {
        var rect = this.element.getBoundingClientRect();
        var touch = event.targetTouches.item(0);
        var offsetX = touch.clientX - rect.left;
        var offsetY = touch.clientY - rect.top;
        this.updateValue(offsetX, offsetY);
        event.preventDefault();
      }
    }
  }, {
    key: "rangePath",
    value: function rangePath() {
      return "M ".concat(this.minX(), " ").concat(this.minY(), " A ").concat(this.radius, " ").concat(this.radius, " 0 1 1 ").concat(this.maxX(), " ").concat(this.maxY());
    }
  }, {
    key: "valuePath",
    value: function valuePath() {
      return "M ".concat(this.zeroX(), " ").concat(this.zeroY(), " A ").concat(this.radius, " ").concat(this.radius, " 0 ").concat(this.largeArc(), " ").concat(this.sweep(), " ").concat(this.valueX(), " ").concat(this.valueY());
    }
  }, {
    key: "zeroRadians",
    value: function zeroRadians() {
      if (this.props.min > 0 && this.props.max > 0) return this.mapRange(this.props.min, this.props.min, this.props.max, this.minRadians, this.maxRadians);else return this.mapRange(0, this.props.min, this.props.max, this.minRadians, this.maxRadians);
    }
  }, {
    key: "valueRadians",
    value: function valueRadians() {
      return this.mapRange(this.props.value, this.props.min, this.props.max, this.minRadians, this.maxRadians);
    }
  }, {
    key: "minX",
    value: function minX() {
      return this.midX + Math.cos(this.minRadians) * this.radius;
    }
  }, {
    key: "minY",
    value: function minY() {
      return this.midY - Math.sin(this.minRadians) * this.radius;
    }
  }, {
    key: "maxX",
    value: function maxX() {
      return this.midX + Math.cos(this.maxRadians) * this.radius;
    }
  }, {
    key: "maxY",
    value: function maxY() {
      return this.midY - Math.sin(this.maxRadians) * this.radius;
    }
  }, {
    key: "zeroX",
    value: function zeroX() {
      return this.midX + Math.cos(this.zeroRadians()) * this.radius;
    }
  }, {
    key: "zeroY",
    value: function zeroY() {
      return this.midY - Math.sin(this.zeroRadians()) * this.radius;
    }
  }, {
    key: "valueX",
    value: function valueX() {
      return this.midX + Math.cos(this.valueRadians()) * this.radius;
    }
  }, {
    key: "valueY",
    value: function valueY() {
      return this.midY - Math.sin(this.valueRadians()) * this.radius;
    }
  }, {
    key: "largeArc",
    value: function largeArc() {
      return Math.abs(this.zeroRadians() - this.valueRadians()) < Math.PI ? 0 : 1;
    }
  }, {
    key: "sweep",
    value: function sweep() {
      return this.valueRadians() > this.zeroRadians() ? 0 : 1;
    }
  }, {
    key: "valueToDisplay",
    value: function valueToDisplay() {
      return this.props.valueTemplate.replace("{value}", this.props.value.toString());
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var containerClassName = (0, _ClassNames.classNames)('p-knob p-component', {
        'p-disabled': this.props.disabled
      }, this.props.className);

      var text = this.props.showValue && /*#__PURE__*/_react.default.createElement("text", {
        x: 50,
        y: 57,
        textAnchor: 'middle',
        fill: this.props.textColor,
        className: 'p-knob-text',
        name: this.props.name
      }, this.valueToDisplay());

      return /*#__PURE__*/_react.default.createElement("div", {
        className: containerClassName,
        style: this.props.style,
        ref: function ref(el) {
          return _this2.element = el;
        }
      }, /*#__PURE__*/_react.default.createElement("svg", {
        viewBox: "0 0 100 100",
        width: this.props.size,
        height: this.props.size,
        onClick: this.onClick,
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp,
        onTouchStart: this.onTouchStart,
        onTouchEnd: this.onTouchEnd
      }, /*#__PURE__*/_react.default.createElement("path", {
        d: this.rangePath(),
        strokeWidth: this.props.strokeWidth,
        stroke: this.props.rangeColor,
        className: 'p-knob-range'
      }), /*#__PURE__*/_react.default.createElement("path", {
        d: this.valuePath(),
        strokeWidth: this.props.strokeWidth,
        stroke: this.props.valueColor,
        className: 'p-knob-value'
      }), text));
    }
  }]);

  return Knob;
}(_react.Component);

exports.Knob = Knob;

_defineProperty(Knob, "defaultProps", {
  id: null,
  style: null,
  className: null,
  value: null,
  size: 100,
  disabled: false,
  readOnly: false,
  showValue: true,
  step: 1,
  min: 0,
  max: 100,
  strokeWidth: 14,
  name: '',
  valueColor: 'var(--primary-color, Black)',
  rangeColor: 'var(--surface-d, LightGray)',
  textColor: 'var(--text-color-secondary, Black)',
  valueTemplate: '{value}',
  onChange: null
});

_defineProperty(Knob, "propTypes", {
  id: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  value: _propTypes.default.any,
  size: _propTypes.default.number,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  showValue: _propTypes.default.bool,
  step: _propTypes.default.number,
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  strokeWidth: _propTypes.default.number,
  name: _propTypes.default.string,
  valueColor: _propTypes.default.string,
  rangeColor: _propTypes.default.string,
  textColor: _propTypes.default.string,
  valueTemplate: _propTypes.default.string,
  onChange: _propTypes.default.func
});