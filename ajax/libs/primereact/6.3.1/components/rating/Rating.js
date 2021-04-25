"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rating = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _Tooltip = require("../tooltip/Tooltip");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var Rating = /*#__PURE__*/function (_Component) {
  _inherits(Rating, _Component);

  var _super = _createSuper(Rating);

  function Rating(props) {
    var _this;

    _classCallCheck(this, Rating);

    _this = _super.call(this, props);
    _this.clear = _this.clear.bind(_assertThisInitialized(_this));
    _this.onStarKeyDown = _this.onStarKeyDown.bind(_assertThisInitialized(_this));
    _this.onCancelKeyDown = _this.onCancelKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Rating, [{
    key: "rate",
    value: function rate(event, i) {
      if (!this.props.readOnly && !this.props.disabled && this.props.onChange) {
        this.props.onChange({
          originalEvent: event,
          value: i,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: this.props.name,
            id: this.props.id,
            value: i
          }
        });
      }

      event.preventDefault();
    }
  }, {
    key: "clear",
    value: function clear(event) {
      if (!this.props.readOnly && !this.props.disabled && this.props.onChange) {
        this.props.onChange({
          originalEvent: event,
          value: null,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: this.props.name,
            id: this.props.id,
            value: null
          }
        });
      }

      event.preventDefault();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.value === this.props.value && nextProps.disabled === this.props.disabled) {
        return false;
      }

      return true;
    }
  }, {
    key: "onStarKeyDown",
    value: function onStarKeyDown(event, value) {
      if (event.key === 'Enter') {
        this.rate(event, value);
      }
    }
  }, {
    key: "onCancelKeyDown",
    value: function onCancelKeyDown(event) {
      if (event.key === 'Enter') {
        this.clear(event);
      }
    }
  }, {
    key: "getFocusIndex",
    value: function getFocusIndex() {
      return this.props.disabled || this.props.readOnly ? null : 0;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.tooltip) {
        this.renderTooltip();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.tooltip !== this.props.tooltip || prevProps.tooltipOptions !== this.props.tooltipOptions) {
        if (this.tooltip) this.tooltip.update(_objectSpread({
          content: this.props.tooltip
        }, this.props.tooltipOptions || {}));else this.renderTooltip();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.tooltip) {
        this.tooltip.destroy();
        this.tooltip = null;
      }
    }
  }, {
    key: "renderTooltip",
    value: function renderTooltip() {
      this.tooltip = (0, _Tooltip.tip)({
        target: this.element,
        content: this.props.tooltip,
        options: this.props.tooltipOptions
      });
    }
  }, {
    key: "renderStars",
    value: function renderStars() {
      var _this2 = this;

      var starsArray = [];

      for (var i = 0; i < this.props.stars; i++) {
        starsArray[i] = i + 1;
      }

      var stars = starsArray.map(function (value) {
        var iconClass = (0, _ClassNames.classNames)('p-rating-icon', {
          'pi pi-star-o': !_this2.props.value || value > _this2.props.value,
          'pi pi-star': value <= _this2.props.value
        });
        return /*#__PURE__*/_react.default.createElement("span", {
          className: iconClass,
          onClick: function onClick(e) {
            return _this2.rate(e, value);
          },
          key: value,
          tabIndex: _this2.getFocusIndex(),
          onKeyDown: function onKeyDown(e) {
            return _this2.onStarKeyDown(e, value);
          }
        });
      });
      return stars;
    }
  }, {
    key: "renderCancelIcon",
    value: function renderCancelIcon() {
      if (this.props.cancel) {
        return /*#__PURE__*/_react.default.createElement("span", {
          className: "p-rating-icon p-rating-cancel pi pi-ban",
          onClick: this.clear,
          tabIndex: this.getFocusIndex(),
          onKeyDown: this.onCancelKeyDown
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var className = (0, _ClassNames.classNames)('p-rating', {
        'p-disabled': this.props.disabled,
        'p-rating-readonly': this.props.readOnly
      }, this.props.className);
      var cancelIcon = this.renderCancelIcon();
      var stars = this.renderStars();
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this3.element = el;
        },
        id: this.props.id,
        className: className,
        style: this.props.style
      }, cancelIcon, stars);
    }
  }]);

  return Rating;
}(_react.Component);

exports.Rating = Rating;

_defineProperty(Rating, "defaultProps", {
  id: null,
  value: null,
  disabled: false,
  readOnly: false,
  stars: 5,
  cancel: true,
  style: null,
  className: null,
  tooltip: null,
  tooltipOptions: null,
  onChange: null
});

_defineProperty(Rating, "propTypes", {
  id: _propTypes.default.string,
  value: _propTypes.default.number,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  stars: _propTypes.default.number,
  cancel: _propTypes.default.bool,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  tooltip: _propTypes.default.string,
  tooltipOptions: _propTypes.default.object,
  onChange: _propTypes.default.func
});