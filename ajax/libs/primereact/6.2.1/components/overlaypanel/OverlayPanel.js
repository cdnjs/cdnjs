"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverlayPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _reactTransitionGroup = require("react-transition-group");

var _Ripple = require("../ripple/Ripple");

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _ConnectedOverlayScrollHandler = _interopRequireDefault(require("../utils/ConnectedOverlayScrollHandler"));

var _OverlayEventBus = _interopRequireDefault(require("../overlayeventbus/OverlayEventBus"));

var _Portal = require("../portal/Portal");

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

var OverlayPanel = /*#__PURE__*/function (_Component) {
  _inherits(OverlayPanel, _Component);

  var _super = _createSuper(OverlayPanel);

  function OverlayPanel(props) {
    var _this;

    _classCallCheck(this, OverlayPanel);

    _this = _super.call(this, props);
    _this.state = {
      visible: false
    };
    _this.onCloseClick = _this.onCloseClick.bind(_assertThisInitialized(_this));
    _this.onPanelClick = _this.onPanelClick.bind(_assertThisInitialized(_this));
    _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
    _this.onEntered = _this.onEntered.bind(_assertThisInitialized(_this));
    _this.onExit = _this.onExit.bind(_assertThisInitialized(_this));
    _this.onExited = _this.onExited.bind(_assertThisInitialized(_this));
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    _this.attributeSelector = (0, _UniqueComponentId.default)();
    _this.overlayRef = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  _createClass(OverlayPanel, [{
    key: "bindDocumentClickListener",
    value: function bindDocumentClickListener() {
      var _this2 = this;

      if (!this.documentClickListener && this.props.dismissable) {
        this.documentClickListener = function (event) {
          if (!_this2.isPanelClicked && _this2.isOutsideClicked(event.target)) {
            _this2.hide();
          }

          _this2.isPanelClicked = false;
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
    key: "bindScrollListener",
    value: function bindScrollListener() {
      var _this3 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new _ConnectedOverlayScrollHandler.default(this.target, function () {
          if (_this3.state.visible) {
            _this3.hide();
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
    key: "bindResizeListener",
    value: function bindResizeListener() {
      var _this4 = this;

      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this4.state.visible) {
            _this4.hide();
          }
        };

        window.addEventListener('resize', this.resizeListener);
      }
    }
  }, {
    key: "unbindResizeListener",
    value: function unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
        this.resizeListener = null;
      }
    }
  }, {
    key: "isOutsideClicked",
    value: function isOutsideClicked(target) {
      return this.overlayRef && this.overlayRef.current && !(this.overlayRef.current.isSameNode(target) || this.overlayRef.current.contains(target));
    }
  }, {
    key: "hasTargetChanged",
    value: function hasTargetChanged(event, target) {
      return this.target != null && this.target !== (target || event.currentTarget || event.target);
    }
  }, {
    key: "onCloseClick",
    value: function onCloseClick(event) {
      this.hide();
      event.preventDefault();
    }
  }, {
    key: "onPanelClick",
    value: function onPanelClick(event) {
      this.isPanelClicked = true;

      _OverlayEventBus.default.emit('overlay-click', {
        originalEvent: event,
        target: this.target
      });
    }
  }, {
    key: "toggle",
    value: function toggle(event, target) {
      var _this5 = this;

      if (this.state.visible) {
        this.hide();

        if (this.hasTargetChanged(event, target)) {
          this.target = target || event.currentTarget || event.target;
          setTimeout(function () {
            _this5.show(event, _this5.target);
          }, 200);
        }
      } else {
        this.show(event, target);
      }
    }
  }, {
    key: "show",
    value: function show(event, target) {
      var _this6 = this;

      this.target = target || event.currentTarget || event.target;

      if (this.state.visible) {
        this.align();
      } else {
        this.setState({
          visible: true
        }, function () {
          _OverlayEventBus.default.on('overlay-click', function (e) {
            if (!_this6.isOutsideClicked(e.target)) {
              _this6.isPanelClicked = true;
            }
          });
        });
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this7 = this;

      this.setState({
        visible: false
      }, function () {
        _OverlayEventBus.default.off('overlay-click');

        if (_this7.props.onHide) {
          _this7.props.onHide();
        }
      });
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      this.overlayRef.current.style.zIndex = String(_DomHandler.default.generateZIndex());
      this.overlayRef.current.setAttribute(this.attributeSelector, '');
      this.align();
    }
  }, {
    key: "onEntered",
    value: function onEntered() {
      this.bindDocumentClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
    }
  }, {
    key: "onExit",
    value: function onExit() {
      this.unbindDocumentClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
    }
  }, {
    key: "onExited",
    value: function onExited() {
      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "align",
    value: function align() {
      if (this.target) {
        _DomHandler.default.absolutePosition(this.overlayRef.current, this.target);

        var containerOffset = _DomHandler.default.getOffset(this.overlayRef.current);

        var targetOffset = _DomHandler.default.getOffset(this.target);

        var arrowLeft = 0;

        if (containerOffset.left < targetOffset.left) {
          arrowLeft = targetOffset.left - containerOffset.left;
        }

        this.overlayRef.current.style.setProperty('--overlayArrowLeft', "".concat(arrowLeft, "px"));

        if (containerOffset.top < targetOffset.top) {
          _DomHandler.default.addClass(this.overlayRef.current, 'p-overlaypanel-flipped');
        }
      }
    }
  }, {
    key: "createStyle",
    value: function createStyle() {
      if (!this.styleElement) {
        this.styleElement = document.createElement('style');
        document.head.appendChild(this.styleElement);
        var innerHTML = '';

        for (var breakpoint in this.props.breakpoints) {
          innerHTML += "\n                    @media screen and (max-width: ".concat(breakpoint, ") {\n                        .p-overlaypanel[").concat(this.attributeSelector, "] {\n                            width: ").concat(this.props.breakpoints[breakpoint], " !important;\n                        }\n                    }\n                ");
        }

        this.styleElement.innerHTML = innerHTML;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.breakpoints) {
        this.createStyle();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindDocumentClickListener();
      this.unbindResizeListener();

      if (this.scrollHandler) {
        this.scrollHandler.destroy();
        this.scrollHandler = null;
      }

      if (this.styleElement) {
        document.head.removeChild(this.styleElement);
        this.styleElement = null;
      }

      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "renderCloseIcon",
    value: function renderCloseIcon() {
      if (this.props.showCloseIcon) {
        return /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          className: "p-overlaypanel-close p-link",
          onClick: this.onCloseClick,
          "aria-label": this.props.ariaCloseLabel
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "p-overlaypanel-close-icon pi pi-times"
        }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var className = (0, _ClassNames.classNames)('p-overlaypanel p-component', this.props.className);
      var closeIcon = this.renderCloseIcon();
      return /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.CSSTransition, {
        nodeRef: this.overlayRef,
        classNames: "p-overlaypanel",
        in: this.state.visible,
        timeout: {
          enter: 120,
          exit: 100
        },
        unmountOnExit: true,
        onEnter: this.onEnter,
        onEntered: this.onEntered,
        onExit: this.onExit,
        onExited: this.onExited
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: this.overlayRef,
        id: this.id,
        className: className,
        style: this.props.style,
        onClick: this.onPanelClick
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-overlaypanel-content"
      }, this.props.children), closeIcon));
    }
  }, {
    key: "render",
    value: function render() {
      var element = this.renderElement();
      return /*#__PURE__*/_react.default.createElement(_Portal.Portal, {
        element: element,
        appendTo: this.props.appendTo
      });
    }
  }]);

  return OverlayPanel;
}(_react.Component);

exports.OverlayPanel = OverlayPanel;

_defineProperty(OverlayPanel, "defaultProps", {
  id: null,
  dismissable: true,
  showCloseIcon: false,
  style: null,
  className: null,
  appendTo: null,
  breakpoints: null,
  ariaCloseLabel: 'close',
  onHide: null
});

_defineProperty(OverlayPanel, "propTypes", {
  id: _propTypes.default.string,
  dismissable: _propTypes.default.bool,
  showCloseIcon: _propTypes.default.bool,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  appendTo: _propTypes.default.any,
  breakpoints: _propTypes.default.object,
  ariaCloseLabel: _propTypes.default.string,
  onHide: _propTypes.default.func
});