"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollTop = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _reactTransitionGroup = require("react-transition-group");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _Ripple = require("../ripple/Ripple");

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

var ScrollTop = /*#__PURE__*/function (_Component) {
  _inherits(ScrollTop, _Component);

  var _super = _createSuper(ScrollTop);

  function ScrollTop(props) {
    var _this;

    _classCallCheck(this, ScrollTop);

    _this = _super.call(this, props);
    _this.state = {
      visible: false
    };
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
    _this.onExited = _this.onExited.bind(_assertThisInitialized(_this));
    _this.scrollElementRef = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  _createClass(ScrollTop, [{
    key: "onClick",
    value: function onClick() {
      var scrollElement = this.props.target === 'window' ? window : this.helper.parentElement;
      scrollElement.scroll({
        top: 0,
        behavior: this.props.behavior
      });
    }
  }, {
    key: "checkVisibility",
    value: function checkVisibility(scrollY) {
      this.setState({
        visible: scrollY > this.props.threshold
      });
    }
  }, {
    key: "bindParentScrollListener",
    value: function bindParentScrollListener() {
      var _this2 = this;

      this.scrollListener = function () {
        _this2.checkVisibility(_this2.helper.parentElement.scrollTop);
      };

      this.helper.parentElement.addEventListener('scroll', this.scrollListener);
    }
  }, {
    key: "bindDocumentScrollListener",
    value: function bindDocumentScrollListener() {
      var _this3 = this;

      this.scrollListener = function () {
        _this3.checkVisibility(_DomHandler.default.getWindowScrollTop());
      };

      window.addEventListener('scroll', this.scrollListener);
    }
  }, {
    key: "unbindParentScrollListener",
    value: function unbindParentScrollListener() {
      if (this.scrollListener) {
        this.helper.parentElement.removeEventListener('scroll', this.scrollListener);
        this.scrollListener = null;
      }
    }
  }, {
    key: "unbindDocumentScrollListener",
    value: function unbindDocumentScrollListener() {
      if (this.scrollListener) {
        window.removeEventListener('scroll', this.scrollListener);
        this.scrollListener = null;
      }
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      this.scrollElementRef.current.style.zIndex = String(_DomHandler.default.generateZIndex());
    }
  }, {
    key: "onExited",
    value: function onExited() {
      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.target === 'window') this.bindDocumentScrollListener();else if (this.props.target === 'parent') this.bindParentScrollListener();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.target === 'window') this.unbindDocumentScrollListener();else if (this.props.target === 'parent') this.unbindParentScrollListener();

      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var className = (0, _ClassNames.classNames)('p-scrolltop p-link p-component', {
        'p-scrolltop-sticky': this.props.target !== 'window'
      }, this.props.className);
      var iconClassName = (0, _ClassNames.classNames)('p-scrolltop-icon', this.props.icon);
      var isTargetParent = this.props.target === 'parent';
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.CSSTransition, {
        nodeRef: this.scrollElementRef,
        classNames: "p-scrolltop",
        in: this.state.visible,
        timeout: {
          enter: 150,
          exit: 150
        },
        unmountOnExit: true,
        onEnter: this.onEnter,
        onExited: this.onExited
      }, /*#__PURE__*/_react.default.createElement("button", {
        ref: this.scrollElementRef,
        type: "button",
        className: className,
        style: this.props.style,
        onClick: this.onClick
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null))), isTargetParent && /*#__PURE__*/_react.default.createElement("span", {
        ref: function ref(el) {
          return _this4.helper = el;
        },
        className: "p-scrolltop-helper"
      }));
    }
  }]);

  return ScrollTop;
}(_react.Component);

exports.ScrollTop = ScrollTop;

_defineProperty(ScrollTop, "defaultProps", {
  target: 'window',
  threshold: 400,
  icon: 'pi pi-chevron-up',
  behavior: 'smooth',
  className: null,
  style: null
});

_defineProperty(ScrollTop, "propTypes", {
  target: _propTypes.default.string,
  threshold: _propTypes.default.number,
  icon: _propTypes.default.string,
  behavior: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object
});