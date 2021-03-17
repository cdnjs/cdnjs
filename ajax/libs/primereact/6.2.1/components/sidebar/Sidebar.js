"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _reactTransitionGroup = require("react-transition-group");

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

var Sidebar = /*#__PURE__*/function (_Component) {
  _inherits(Sidebar, _Component);

  var _super = _createSuper(Sidebar);

  function Sidebar(props) {
    var _this;

    _classCallCheck(this, Sidebar);

    _this = _super.call(this, props);
    _this.onCloseClick = _this.onCloseClick.bind(_assertThisInitialized(_this));
    _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
    _this.onEntered = _this.onEntered.bind(_assertThisInitialized(_this));
    _this.onExit = _this.onExit.bind(_assertThisInitialized(_this));
    _this.onExited = _this.onExited.bind(_assertThisInitialized(_this));
    _this.sidebarRef = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  _createClass(Sidebar, [{
    key: "onCloseClick",
    value: function onCloseClick(event) {
      this.props.onHide();
      event.preventDefault();
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      this.sidebarRef.current.style.zIndex = String(this.props.baseZIndex + _DomHandler.default.generateZIndex());

      if (this.props.modal) {
        this.enableModality();
      }
    }
  }, {
    key: "onEntered",
    value: function onEntered() {
      if (this.props.closeOnEscape) {
        this.bindDocumentEscapeListener();
      }

      if (this.closeIcon) {
        this.closeIcon.focus();
      }

      if (this.props.onShow) {
        this.props.onShow();
      }
    }
  }, {
    key: "onExit",
    value: function onExit() {
      this.unbindMaskClickListener();
      this.unbindDocumentEscapeListener();

      if (this.props.modal) {
        this.disableModality();
      }
    }
  }, {
    key: "onExited",
    value: function onExited() {
      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "enableModality",
    value: function enableModality() {
      if (!this.mask) {
        this.mask = document.createElement('div');
        this.mask.style.zIndex = String(parseInt(this.sidebarRef.current.style.zIndex, 10) - 1);
        var maskClassName = 'p-component-overlay p-sidebar-mask';

        if (this.props.blockScroll) {
          maskClassName += ' p-sidebar-mask-scrollblocker';
        }

        _DomHandler.default.addMultipleClasses(this.mask, maskClassName);

        if (this.props.dismissable) {
          this.bindMaskClickListener();
        }

        document.body.appendChild(this.mask);

        if (this.props.blockScroll) {
          _DomHandler.default.addClass(document.body, 'p-overflow-hidden');
        }
      }
    }
  }, {
    key: "disableModality",
    value: function disableModality() {
      if (this.mask) {
        this.unbindMaskClickListener();
        document.body.removeChild(this.mask);

        if (this.props.blockScroll) {
          var bodyChildren = document.body.children;
          var hasBlockerMasks;

          for (var i = 0; i < bodyChildren.length; i++) {
            var bodyChild = bodyChildren[i];

            if (_DomHandler.default.hasClass(bodyChild, 'p-sidebar-mask-scrollblocker')) {
              hasBlockerMasks = true;
              break;
            }
          }

          if (!hasBlockerMasks) {
            _DomHandler.default.removeClass(document.body, 'p-overflow-hidden');
          }
        }

        this.mask = null;
      }
    }
  }, {
    key: "bindDocumentEscapeListener",
    value: function bindDocumentEscapeListener() {
      var _this2 = this;

      this.documentEscapeListener = function (event) {
        if (event.which === 27) {
          if (parseInt(_this2.sidebarRef.current.style.zIndex, 10) === _DomHandler.default.getCurrentZIndex() + _this2.props.baseZIndex) {
            _this2.onCloseClick(event);
          }
        }
      };

      document.addEventListener('keydown', this.documentEscapeListener);
    }
  }, {
    key: "unbindDocumentEscapeListener",
    value: function unbindDocumentEscapeListener() {
      if (this.documentEscapeListener) {
        document.removeEventListener('keydown', this.documentEscapeListener);
        this.documentEscapeListener = null;
      }
    }
  }, {
    key: "bindMaskClickListener",
    value: function bindMaskClickListener() {
      var _this3 = this;

      if (!this.maskClickListener) {
        this.maskClickListener = function (event) {
          _this3.onCloseClick(event);
        };

        this.mask.addEventListener('click', this.maskClickListener);
      }
    }
  }, {
    key: "unbindMaskClickListener",
    value: function unbindMaskClickListener() {
      if (this.maskClickListener) {
        this.mask.removeEventListener('click', this.maskClickListener);
        this.maskClickListener = null;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.mask && prevProps.dismissable !== this.props.dismissable) {
        if (this.props.dismissable) {
          this.bindMaskClickListener();
        } else {
          this.unbindMaskClickListener();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindMaskClickListener();
      this.disableModality();

      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "renderCloseIcon",
    value: function renderCloseIcon() {
      var _this4 = this;

      if (this.props.showCloseIcon) {
        return /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          ref: function ref(el) {
            return _this4.closeIcon = el;
          },
          className: "p-sidebar-close p-sidebar-icon p-link",
          onClick: this.onCloseClick,
          "aria-label": this.props.ariaCloseLabel
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "p-sidebar-close-icon pi pi-times"
        }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderIcons",
    value: function renderIcons() {
      if (this.props.icons) {
        return _ObjectUtils.default.getJSXElement(this.props.icons, this.props);
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var className = (0, _ClassNames.classNames)('p-sidebar p-component', this.props.className, 'p-sidebar-' + this.props.position, {
        'p-sidebar-active': this.props.visible,
        'p-sidebar-full': this.props.fullScreen
      });
      var closeIcon = this.renderCloseIcon();
      var icons = this.renderIcons();
      var transitionTimeout = {
        enter: this.props.fullScreen ? 400 : 300,
        exit: this.props.fullScreen ? 400 : 300
      };
      return /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.CSSTransition, {
        nodeRef: this.sidebarRef,
        classNames: "p-sidebar",
        in: this.props.visible,
        timeout: transitionTimeout,
        unmountOnExit: true,
        onEnter: this.onEnter,
        onEntered: this.onEntered,
        onExit: this.onExit,
        onExited: this.onExited
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: this.sidebarRef,
        id: this.props.id,
        className: className,
        style: this.props.style,
        role: "complementary"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-sidebar-icons"
      }, icons, closeIcon), /*#__PURE__*/_react.default.createElement("div", {
        className: "p-sidebar-content"
      }, this.props.children)));
    }
  }]);

  return Sidebar;
}(_react.Component);

exports.Sidebar = Sidebar;

_defineProperty(Sidebar, "defaultProps", {
  id: null,
  style: null,
  className: null,
  visible: false,
  position: 'left',
  fullScreen: false,
  blockScroll: false,
  baseZIndex: 0,
  dismissable: true,
  showCloseIcon: true,
  ariaCloseLabel: 'close',
  closeOnEscape: true,
  icons: null,
  modal: true,
  onShow: null,
  onHide: null
});

_defineProperty(Sidebar, "propTypes", {
  id: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  visible: _propTypes.default.bool,
  position: _propTypes.default.string,
  fullScreen: _propTypes.default.bool,
  blockScroll: _propTypes.default.bool,
  baseZIndex: _propTypes.default.number,
  dismissable: _propTypes.default.bool,
  showCloseIcon: _propTypes.default.bool,
  ariaCloseLabel: _propTypes.default.string,
  closeOnEscape: _propTypes.default.bool,
  icons: _propTypes.default.any,
  modal: _propTypes.default.bool,
  onShow: _propTypes.default.func,
  onHide: _propTypes.default.func.isRequired
});