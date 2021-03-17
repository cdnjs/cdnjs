"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var Slider = /*#__PURE__*/function (_Component) {
  _inherits(Slider, _Component);

  var _super = _createSuper(Slider);

  function Slider(props) {
    var _this;

    _classCallCheck(this, Slider);

    _this = _super.call(this, props);
    _this.onBarClick = _this.onBarClick.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.handleIndex = 0;
    return _this;
  }

  _createClass(Slider, [{
    key: "spin",
    value: function spin(event, dir) {
      var value = (this.props.range ? this.props.value[this.handleIndex] : this.props.value) || 0;
      var step = (this.props.step || 1) * dir;
      this.updateValue(event, value + step);
      event.preventDefault();
    }
  }, {
    key: "onDragStart",
    value: function onDragStart(event, index) {
      if (this.props.disabled) {
        return;
      }

      this.dragging = true;
      this.updateDomData();
      this.sliderHandleClick = true;
      this.handleIndex = index; //event.preventDefault();
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event, index) {
      this.bindDragListeners();
      this.onDragStart(event, index);
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(event, index) {
      this.bindTouchListeners();
      this.onDragStart(event, index);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event, index) {
      if (this.props.disabled) {
        return;
      }

      this.handleIndex = index;
      var key = event.key;

      if (key === 'ArrowRight' || key === 'ArrowUp') {
        this.spin(event, 1);
      } else if (key === 'ArrowLeft' || key === 'ArrowDown') {
        this.spin(event, -1);
      }
    }
  }, {
    key: "onBarClick",
    value: function onBarClick(event) {
      if (this.props.disabled) {
        return;
      }

      if (!this.sliderHandleClick) {
        this.updateDomData();
        this.setValue(event);
      }

      this.sliderHandleClick = false;
    }
  }, {
    key: "onDrag",
    value: function onDrag(event) {
      if (this.dragging) {
        this.setValue(event);
        event.preventDefault();
      }
    }
  }, {
    key: "onDragEnd",
    value: function onDragEnd(event) {
      if (this.dragging) {
        this.dragging = false;

        if (this.props.onSlideEnd) {
          this.props.onSlideEnd({
            originalEvent: event,
            value: this.props.value
          });
        }

        this.unbindDragListeners();
        this.unbindTouchListeners();
      }
    }
  }, {
    key: "bindDragListeners",
    value: function bindDragListeners() {
      if (!this.dragListener) {
        this.dragListener = this.onDrag.bind(this);
        document.addEventListener('mousemove', this.dragListener);
      }

      if (!this.dragEndListener) {
        this.dragEndListener = this.onDragEnd.bind(this);
        document.addEventListener('mouseup', this.dragEndListener);
      }
    }
  }, {
    key: "unbindDragListeners",
    value: function unbindDragListeners() {
      if (this.dragListener) {
        document.removeEventListener('mousemove', this.dragListener);
        this.dragListener = null;
      }

      if (this.dragEndListener) {
        document.removeEventListener('mouseup', this.dragEndListener);
        this.dragEndListener = null;
      }
    }
  }, {
    key: "bindTouchListeners",
    value: function bindTouchListeners() {
      if (!this.dragListener) {
        this.dragListener = this.onDrag.bind(this);
        document.addEventListener('touchmove', this.dragListener);
      }

      if (!this.dragEndListener) {
        this.dragEndListener = this.onDragEnd.bind(this);
        document.addEventListener('touchend', this.dragEndListener);
      }
    }
  }, {
    key: "unbindTouchListeners",
    value: function unbindTouchListeners() {
      if (this.dragListener) {
        document.removeEventListener('touchmove', this.dragListener);
        this.dragListener = null;
      }

      if (this.dragEndListener) {
        document.removeEventListener('touchend', this.dragEndListener);
        this.dragEndListener = null;
      }
    }
  }, {
    key: "updateDomData",
    value: function updateDomData() {
      var rect = this.el.getBoundingClientRect();
      this.initX = rect.left + _DomHandler.default.getWindowScrollLeft();
      this.initY = rect.top + _DomHandler.default.getWindowScrollTop();
      this.barWidth = this.el.offsetWidth;
      this.barHeight = this.el.offsetHeight;
    }
  }, {
    key: "setValue",
    value: function setValue(event) {
      var handleValue;
      var pageX = event.touches ? event.touches[0].pageX : event.pageX;
      if (this.props.orientation === 'horizontal') handleValue = (pageX - this.initX) * 100 / this.barWidth;else handleValue = (this.initY + this.barHeight - event.pageY) * 100 / this.barHeight;
      var newValue = (this.props.max - this.props.min) * (handleValue / 100) + this.props.min;

      if (this.props.step) {
        var oldValue = this.props.range ? this.props.value[this.handleIndex] : this.props.value;
        var diff = newValue - oldValue;
        if (diff < 0) newValue = oldValue + Math.ceil(newValue / this.props.step - oldValue / this.props.step) * this.props.step;else if (diff > 0) newValue = oldValue + Math.floor(newValue / this.props.step - oldValue / this.props.step) * this.props.step;
      }

      this.updateValue(event, newValue);
    }
  }, {
    key: "updateValue",
    value: function updateValue(event, value) {
      if (this.props.range) {
        var newValue = value;

        if (this.handleIndex === 0) {
          if (newValue < this.props.min) newValue = this.props.min;else if (newValue > this.props.value[1]) newValue = this.props.value[1];
        } else {
          if (newValue > this.props.max) newValue = this.props.max;else if (newValue < this.props.value[0]) newValue = this.props.value[0];
        }

        var newValues = _toConsumableArray(this.props.value);

        newValues[this.handleIndex] = Math.floor(newValue);

        if (this.props.onChange) {
          this.props.onChange({
            originalEvent: event,
            value: newValues
          });
        }
      } else {
        var _newValue = value;
        if (_newValue < this.props.min) _newValue = this.props.min;else if (_newValue > this.props.max) _newValue = this.props.max;

        if (this.props.onChange) {
          this.props.onChange({
            originalEvent: event,
            value: Math.floor(_newValue)
          });
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindDragListeners();
      this.unbindTouchListeners();
    }
  }, {
    key: "renderHandle",
    value: function renderHandle(leftValue, bottomValue, index) {
      var _this2 = this;

      var handleClassName = (0, _classnames.default)('p-slider-handle', {
        'p-slider-handle-start': index === 0,
        'p-slider-handle-end': index === 1,
        'p-slider-handle-active': this.handleIndex === index
      });
      return /*#__PURE__*/_react.default.createElement("span", {
        onMouseDown: function onMouseDown(event) {
          return _this2.onMouseDown(event, index);
        },
        onTouchStart: function onTouchStart(event) {
          return _this2.onTouchStart(event, index);
        },
        onKeyDown: function onKeyDown(event) {
          return _this2.onKeyDown(event, index);
        },
        tabIndex: this.props.tabIndex,
        className: handleClassName,
        style: {
          transition: this.dragging ? 'none' : null,
          left: leftValue !== null && leftValue + '%',
          bottom: bottomValue && bottomValue + '%'
        },
        role: "slider",
        "aria-valuemin": this.props.min,
        "aria-valuemax": this.props.max,
        "aria-valuenow": leftValue || bottomValue,
        "aria-labelledby": this.props.ariaLabelledBy
      });
    }
  }, {
    key: "renderRangeSlider",
    value: function renderRangeSlider() {
      var values = this.props.value || [0, 0];
      var horizontal = this.props.orientation === 'horizontal';
      var handleValueStart = (values[0] < this.props.min ? 0 : values[0] - this.props.min) * 100 / (this.props.max - this.props.min);
      var handleValueEnd = (values[1] > this.props.max ? 100 : values[1] - this.props.min) * 100 / (this.props.max - this.props.min);
      var rangeStartHandle = horizontal ? this.renderHandle(handleValueStart, null, 0) : this.renderHandle(null, handleValueStart, 0);
      var rangeEndHandle = horizontal ? this.renderHandle(handleValueEnd, null, 1) : this.renderHandle(null, handleValueEnd, 1);
      var rangeStyle = horizontal ? {
        left: handleValueStart + '%',
        width: handleValueEnd - handleValueStart + '%'
      } : {
        bottom: handleValueStart + '%',
        height: handleValueEnd - handleValueStart + '%'
      };
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
        className: "p-slider-range",
        style: rangeStyle
      }), rangeStartHandle, rangeEndHandle);
    }
  }, {
    key: "renderSingleSlider",
    value: function renderSingleSlider() {
      var value = this.props.value || 0;
      var handleValue;
      if (value < this.props.min) handleValue = 0;else if (value > this.props.max) handleValue = 100;else handleValue = (value - this.props.min) * 100 / (this.props.max - this.props.min);
      var rangeStyle = this.props.orientation === 'horizontal' ? {
        width: handleValue + '%'
      } : {
        height: handleValue + '%'
      };
      var handle = this.props.orientation === 'horizontal' ? this.renderHandle(handleValue, null, null) : this.renderHandle(null, handleValue, null);
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
        className: "p-slider-range",
        style: rangeStyle
      }), handle);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var className = (0, _classnames.default)('p-slider p-component', this.props.className, {
        'p-disabled': this.props.disabled,
        'p-slider-horizontal': this.props.orientation === 'horizontal',
        'p-slider-vertical': this.props.orientation === 'vertical'
      });
      var content = this.props.range ? this.renderRangeSlider() : this.renderSingleSlider();
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.props.id,
        ref: function ref(el) {
          return _this3.el = el;
        },
        style: this.props.style,
        className: className,
        onClick: this.onBarClick
      }, content);
    }
  }]);

  return Slider;
}(_react.Component);

exports.Slider = Slider;

_defineProperty(Slider, "defaultProps", {
  id: null,
  value: null,
  min: 0,
  max: 100,
  orientation: 'horizontal',
  step: null,
  range: false,
  style: null,
  className: null,
  disabled: false,
  tabIndex: 0,
  ariaLabelledBy: null,
  onChange: null,
  onSlideEnd: null
});

_defineProperty(Slider, "propTypes", {
  id: _propTypes.default.string,
  value: _propTypes.default.any,
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  orientation: _propTypes.default.string,
  step: _propTypes.default.number,
  range: _propTypes.default.bool,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  tabIndex: _propTypes.default.number,
  ariaLabelledBy: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onSlideEnd: _propTypes.default.func
});