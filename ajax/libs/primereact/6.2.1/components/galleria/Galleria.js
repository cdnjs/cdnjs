"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Galleria = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _GalleriaItem = require("./GalleriaItem");

var _GalleriaThumbnails = require("./GalleriaThumbnails");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _reactTransitionGroup = require("react-transition-group");

var _Ripple = require("../ripple/Ripple");

var _Portal = require("../portal/Portal");

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

var Galleria = /*#__PURE__*/function (_Component) {
  _inherits(Galleria, _Component);

  var _super = _createSuper(Galleria);

  function Galleria(props) {
    var _this;

    _classCallCheck(this, Galleria);

    _this = _super.call(this, props);
    _this.state = {
      visible: false,
      slideShowActive: false
    };

    if (!_this.props.onItemChange) {
      _this.state = _objectSpread(_objectSpread({}, _this.state), {}, {
        activeIndex: props.activeIndex
      });
    }

    _this.onActiveItemChange = _this.onActiveItemChange.bind(_assertThisInitialized(_this));
    _this.show = _this.show.bind(_assertThisInitialized(_this));
    _this.hide = _this.hide.bind(_assertThisInitialized(_this));
    _this.startSlideShow = _this.startSlideShow.bind(_assertThisInitialized(_this));
    _this.stopSlideShow = _this.stopSlideShow.bind(_assertThisInitialized(_this));
    _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
    _this.onEntering = _this.onEntering.bind(_assertThisInitialized(_this));
    _this.onExit = _this.onExit.bind(_assertThisInitialized(_this));
    _this.onExited = _this.onExited.bind(_assertThisInitialized(_this));
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    _this.galleriaRef = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  _createClass(Galleria, [{
    key: "activeItemIndex",
    get: function get() {
      return this.props.onItemChange ? this.props.activeIndex : this.state.activeIndex;
    }
  }, {
    key: "onActiveItemChange",
    value: function onActiveItemChange(event) {
      if (this.props.onItemChange) {
        this.props.onItemChange(event);
      } else {
        this.setState({
          activeIndex: event.index
        });
      }
    }
  }, {
    key: "show",
    value: function show() {
      this.setState({
        visible: true
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      this.setState({
        visible: false
      });
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      _DomHandler.default.addClass(document.body, 'p-overflow-hidden');
    }
  }, {
    key: "onEntering",
    value: function onEntering() {
      this.mask.style.zIndex = String(this.props.baseZIndex + _DomHandler.default.generateZIndex());

      _DomHandler.default.addClass(this.mask, 'p-component-overlay');
    }
  }, {
    key: "onExit",
    value: function onExit() {
      _DomHandler.default.removeClass(document.body, 'p-overflow-hidden');

      _DomHandler.default.addClass(this.mask, 'p-galleria-mask-leave');
    }
  }, {
    key: "onExited",
    value: function onExited() {
      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "isAutoPlayActive",
    value: function isAutoPlayActive() {
      return this.state.slideShowActive;
    }
  }, {
    key: "startSlideShow",
    value: function startSlideShow() {
      var _this2 = this;

      this.interval = setInterval(function () {
        var activeIndex = _this2.props.circular && _this2.props.value.length - 1 === _this2.activeItemIndex ? 0 : _this2.activeItemIndex + 1;

        _this2.onActiveItemChange({
          index: activeIndex
        });
      }, this.props.transitionInterval);
      this.setState({
        slideShowActive: true
      });
    }
  }, {
    key: "stopSlideShow",
    value: function stopSlideShow() {
      if (this.interval) {
        clearInterval(this.interval);
      }

      this.setState({
        slideShowActive: false
      });
    }
  }, {
    key: "getPositionClassName",
    value: function getPositionClassName(preClassName, position) {
      var positions = ['top', 'left', 'bottom', 'right'];
      var pos = positions.find(function (item) {
        return item === position;
      });
      return pos ? "".concat(preClassName, "-").concat(pos) : '';
    }
  }, {
    key: "isVertical",
    value: function isVertical() {
      return this.props.thumbnailsPosition === 'left' || this.props.thumbnailsPosition === 'right';
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.state.slideShowActive) {
        this.stopSlideShow();
      }

      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      if (this.props.header) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "p-galleria-header"
        }, this.props.header);
      }

      return null;
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      if (this.props.footer) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "p-galleria-footer"
        }, this.props.footer);
      }

      return null;
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var _this3 = this;

      var isVertical = this.isVertical();
      var thumbnailsPosClassName = this.props.showThumbnails && this.getPositionClassName('p-galleria-thumbnails', this.props.thumbnailsPosition);
      var indicatorPosClassName = this.props.showIndicators && this.getPositionClassName('p-galleria-indicators', this.props.indicatorsPosition);
      var galleriaClassName = (0, _ClassNames.classNames)('p-galleria p-component', this.props.className, {
        'p-galleria-fullscreen': this.props.fullScreen,
        'p-galleria-indicator-onitem': this.props.showIndicatorsOnItem,
        'p-galleria-item-nav-onhover': this.props.showItemNavigatorsOnHover && !this.props.fullScreen
      }, thumbnailsPosClassName, indicatorPosClassName);

      var closeIcon = this.props.fullScreen && /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: "p-galleria-close p-link",
        onClick: this.hide
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "p-galleria-close-icon pi pi-times"
      }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));

      var header = this.renderHeader();
      var footer = this.renderFooter();

      var element = /*#__PURE__*/_react.default.createElement("div", {
        ref: this.galleriaRef,
        id: this.id,
        className: galleriaClassName,
        style: this.props.style
      }, closeIcon, header, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-galleria-content"
      }, /*#__PURE__*/_react.default.createElement(_GalleriaItem.GalleriaItem, {
        ref: function ref(el) {
          return _this3.previewContent = el;
        },
        value: this.props.value,
        activeItemIndex: this.activeItemIndex,
        onActiveItemChange: this.onActiveItemChange,
        itemTemplate: this.props.item,
        circular: this.props.circular,
        caption: this.props.caption,
        showIndicators: this.props.showIndicators,
        changeItemOnIndicatorHover: this.props.changeItemOnIndicatorHover,
        indicator: this.props.indicator,
        showItemNavigators: this.props.showItemNavigators,
        autoPlay: this.props.autoPlay,
        slideShowActive: this.state.slideShowActive,
        startSlideShow: this.startSlideShow,
        stopSlideShow: this.stopSlideShow
      }), this.props.showThumbnails && /*#__PURE__*/_react.default.createElement(_GalleriaThumbnails.GalleriaThumbnails, {
        containerId: this.id,
        value: this.props.value,
        activeItemIndex: this.activeItemIndex,
        onActiveItemChange: this.onActiveItemChange,
        itemTemplate: this.props.thumbnail,
        numVisible: this.props.numVisible,
        responsiveOptions: this.props.responsiveOptions,
        circular: this.props.circular,
        isVertical: isVertical,
        contentHeight: this.props.verticalThumbnailViewPortHeight,
        showThumbnailNavigators: this.props.showThumbnailNavigators,
        autoPlay: this.props.autoPlay,
        slideShowActive: this.state.slideShowActive,
        stopSlideShow: this.stopSlideShow
      })), footer);

      return element;
    }
  }, {
    key: "renderGalleria",
    value: function renderGalleria() {
      var _this4 = this;

      var element = this.renderElement();

      if (this.props.fullScreen) {
        var maskClassName = (0, _ClassNames.classNames)('p-galleria-mask', {
          'p-galleria-visible': this.state.visible
        });

        var galleriaWrapper = /*#__PURE__*/_react.default.createElement("div", {
          ref: function ref(el) {
            return _this4.mask = el;
          },
          className: maskClassName
        }, /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.CSSTransition, {
          nodeRef: this.galleriaRef,
          classNames: "p-galleria",
          in: this.state.visible,
          timeout: {
            enter: 150,
            exit: 150
          },
          unmountOnExit: true,
          onEnter: this.onEnter,
          onEntering: this.onEntering,
          onExit: this.onExit,
          onExited: this.onExited
        }, element));

        return /*#__PURE__*/_react.default.createElement(_Portal.Portal, {
          element: galleriaWrapper
        });
      } else {
        return element;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.value && this.props.value.length > 0 && this.renderGalleria();
    }
  }]);

  return Galleria;
}(_react.Component);

exports.Galleria = Galleria;

_defineProperty(Galleria, "defaultProps", {
  id: null,
  value: null,
  activeIndex: 0,
  fullScreen: false,
  item: null,
  thumbnail: null,
  indicator: null,
  caption: null,
  className: null,
  style: null,
  header: null,
  footer: null,
  numVisible: 3,
  responsiveOptions: null,
  showItemNavigators: false,
  showThumbnailNavigators: true,
  showItemNavigatorsOnHover: false,
  changeItemOnIndicatorHover: false,
  circular: false,
  autoPlay: false,
  transitionInterval: 4000,
  showThumbnails: true,
  thumbnailsPosition: "bottom",
  verticalThumbnailViewPortHeight: "300px",
  showIndicators: false,
  showIndicatorsOnItem: false,
  indicatorsPosition: "bottom",
  baseZIndex: 0,
  onItemChange: null
});

_defineProperty(Galleria, "propTypes", {
  id: _propTypes.default.string,
  value: _propTypes.default.any,
  activeIndex: _propTypes.default.number,
  fullScreen: _propTypes.default.bool,
  item: _propTypes.default.any,
  thumbnail: _propTypes.default.any,
  indicator: _propTypes.default.any,
  caption: _propTypes.default.any,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  header: _propTypes.default.any,
  footer: _propTypes.default.any,
  numVisible: _propTypes.default.number,
  responsiveOptions: _propTypes.default.array,
  showItemNavigators: _propTypes.default.bool,
  showThumbnailNavigators: _propTypes.default.bool,
  showItemNavigatorsOnHover: _propTypes.default.bool,
  changeItemOnIndicatorHover: _propTypes.default.bool,
  circular: _propTypes.default.bool,
  autoPlay: _propTypes.default.bool,
  transitionInterval: _propTypes.default.number,
  showThumbnails: _propTypes.default.bool,
  thumbnailsPosition: _propTypes.default.string,
  showIndicators: _propTypes.default.bool,
  showIndicatorsOnItem: _propTypes.default.bool,
  indicatorsPosition: _propTypes.default.string,
  baseZIndex: _propTypes.default.number,
  onItemChange: _propTypes.default.func
});