"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GalleriaItem = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ClassNames = require("../utils/ClassNames");

var _Ripple = require("../ripple/Ripple");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var GalleriaItemComponent = /*#__PURE__*/function (_Component) {
  _inherits(GalleriaItemComponent, _Component);

  var _super = _createSuper(GalleriaItemComponent);

  function GalleriaItemComponent(props) {
    var _this;

    _classCallCheck(this, GalleriaItemComponent);

    _this = _super.call(this, props);
    _this.navForward = _this.navForward.bind(_assertThisInitialized(_this));
    _this.navBackward = _this.navBackward.bind(_assertThisInitialized(_this));
    _this.next = _this.next.bind(_assertThisInitialized(_this));
    _this.prev = _this.prev.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(GalleriaItemComponent, [{
    key: "step",
    value: function step(index) {
      if (this.itemsContainer) {
        this.itemsContainer.style.transform = this.isVertical() ? "translate3d(0, ".concat(index * 100, "%, 0)") : "translate3d(".concat(index * 100, "%, 0, 0)");
        this.itemsContainer.style.transition = 'transform 500ms ease 0s';
      }
    }
  }, {
    key: "next",
    value: function next() {
      var nextItemIndex = this.props.activeItemIndex + 1;
      this.props.onActiveItemChange({
        index: this.props.circular && this.props.value.length - 1 === this.props.activeItemIndex ? 0 : nextItemIndex
      });
    }
  }, {
    key: "prev",
    value: function prev() {
      var prevItemIndex = this.props.activeItemIndex !== 0 ? this.props.activeItemIndex - 1 : 0;
      this.props.onActiveItemChange({
        index: this.props.circular && this.props.activeItemIndex === 0 ? this.props.value.length - 1 : prevItemIndex
      });
    }
  }, {
    key: "stopSlideShow",
    value: function stopSlideShow() {
      if (this.props.slideShowActive && this.props.stopSlideShow) {
        this.props.stopSlideShow();
      }
    }
  }, {
    key: "navBackward",
    value: function navBackward(e) {
      this.stopSlideShow();
      this.prev();

      if (e && e.cancelable) {
        e.preventDefault();
      }
    }
  }, {
    key: "navForward",
    value: function navForward(e) {
      this.stopSlideShow();
      this.next();

      if (e && e.cancelable) {
        e.preventDefault();
      }
    }
  }, {
    key: "onIndicatorClick",
    value: function onIndicatorClick(index) {
      this.stopSlideShow();
      this.props.onActiveItemChange({
        index: index
      });
    }
  }, {
    key: "onIndicatorMouseEnter",
    value: function onIndicatorMouseEnter(index) {
      if (this.props.changeItemOnIndicatorHover) {
        this.stopSlideShow();
        this.props.onActiveItemChange({
          index: index
        });
      }
    }
  }, {
    key: "onIndicatorKeyDown",
    value: function onIndicatorKeyDown(event, index) {
      if (event.which === 13) {
        this.stopSlideShow();
        this.props.onActiveItemChange({
          index: index
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.autoPlay) {
        this.props.startSlideShow();
      }
    }
  }, {
    key: "renderBackwardNavigator",
    value: function renderBackwardNavigator() {
      if (this.props.showItemNavigators) {
        var isDisabled = !this.props.circular && this.props.activeItemIndex === 0;
        var buttonClassName = (0, _ClassNames.classNames)('p-galleria-item-prev p-galleria-item-nav p-link', {
          'p-disabled': isDisabled
        });
        return /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          className: buttonClassName,
          onClick: this.navBackward,
          disabled: isDisabled
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "p-galleria-item-prev-icon pi pi-chevron-left"
        }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderForwardNavigator",
    value: function renderForwardNavigator() {
      if (this.props.showItemNavigators) {
        var isDisabled = !this.props.circular && this.props.activeItemIndex === this.props.value.length - 1;
        var buttonClassName = (0, _ClassNames.classNames)('p-galleria-item-next p-galleria-item-nav p-link', {
          'p-disabled': isDisabled
        });
        return /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          className: buttonClassName,
          onClick: this.navForward,
          disabled: isDisabled
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "p-galleria-item-next-icon pi pi-chevron-right"
        }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderCaption",
    value: function renderCaption() {
      if (this.props.caption) {
        var content = this.props.caption(this.props.value[this.props.activeItemIndex]);
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "p-galleria-caption"
        }, content);
      }

      return null;
    }
  }, {
    key: "renderIndicator",
    value: function renderIndicator(index) {
      var _this2 = this;

      var indicator = this.props.indicator && this.props.indicator(index);
      var isActive = this.props.activeItemIndex === index;
      var indicatorItemClassName = (0, _ClassNames.classNames)('p-galleria-indicator', {
        'p-highlight': isActive
      });

      if (!indicator) {
        indicator = /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          tabIndex: -1,
          className: "p-link"
        }, /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
      }

      return /*#__PURE__*/_react.default.createElement("li", {
        className: indicatorItemClassName,
        key: 'p-galleria-indicator-' + index,
        tabIndex: 0,
        onClick: function onClick() {
          return _this2.onIndicatorClick(index);
        },
        onMouseEnter: function onMouseEnter() {
          return _this2.onIndicatorMouseEnter(index);
        },
        onKeyDown: function onKeyDown(e) {
          return _this2.onIndicatorKeyDown(e, index);
        }
      }, indicator);
    }
  }, {
    key: "renderIndicators",
    value: function renderIndicators() {
      if (this.props.showIndicators) {
        var indicatorsContentClassName = (0, _ClassNames.classNames)('p-galleria-indicators p-reset', this.props.indicatorsContentClassName);
        var indicators = [];

        for (var i = 0; i < this.props.value.length; i++) {
          indicators.push(this.renderIndicator(i));
        }

        return /*#__PURE__*/_react.default.createElement("ul", {
          className: indicatorsContentClassName
        }, indicators);
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var content = this.props.itemTemplate && this.props.itemTemplate(this.props.value[this.props.activeItemIndex]);
      var backwardNavigator = this.renderBackwardNavigator();
      var forwardNavigator = this.renderForwardNavigator();
      var caption = this.renderCaption();
      var indicators = this.renderIndicators();
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this3.props.forwardRef(el);
        },
        className: "p-galleria-item-wrapper"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-galleria-item-container"
      }, backwardNavigator, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-galleria-item"
      }, content), forwardNavigator, caption), indicators);
    }
  }]);

  return GalleriaItemComponent;
}(_react.Component);

var GalleriaItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(GalleriaItemComponent, _extends({
    forwardRef: ref
  }, props));
});

exports.GalleriaItem = GalleriaItem;