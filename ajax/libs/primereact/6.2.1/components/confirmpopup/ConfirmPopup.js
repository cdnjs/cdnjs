"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmPopup = confirmPopup;
exports.ConfirmPopup = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _Button = require("../button/Button");

var _reactTransitionGroup = require("react-transition-group");

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _ConnectedOverlayScrollHandler = _interopRequireDefault(require("../utils/ConnectedOverlayScrollHandler"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _Locale = require("../api/Locale");

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function confirmPopup(props) {
  var appendTo = props.appendTo || document.body;
  var confirmPopupWrapper = document.createDocumentFragment();

  _DomHandler.default.appendChild(confirmPopupWrapper, appendTo);

  props = _objectSpread(_objectSpread({}, props), {
    visible: props.visible === undefined ? true : props.visible
  });

  var confirmPopupEl = /*#__PURE__*/_react.default.createElement(ConfirmPopup, props);

  _reactDom.default.render(confirmPopupEl, confirmPopupWrapper);

  var updateConfirmPopup = function updateConfirmPopup(newProps) {
    props = _objectSpread(_objectSpread({}, props), newProps);

    _reactDom.default.render( /*#__PURE__*/_react.default.cloneElement(confirmPopupEl, props), confirmPopupWrapper);
  };

  return {
    _destroy: function _destroy() {
      _reactDom.default.unmountComponentAtNode(confirmPopupWrapper);
    },
    show: function show() {
      updateConfirmPopup({
        visible: true,
        onHide: function onHide() {
          updateConfirmPopup({
            visible: false
          }); // reset
        }
      });
    },
    hide: function hide() {
      updateConfirmPopup({
        visible: false
      });
    },
    update: function update(newProps) {
      updateConfirmPopup(newProps);
    }
  };
}

var ConfirmPopup = /*#__PURE__*/function (_Component) {
  _inherits(ConfirmPopup, _Component);

  var _super = _createSuper(ConfirmPopup);

  function ConfirmPopup(props) {
    var _this;

    _classCallCheck(this, ConfirmPopup);

    _this = _super.call(this, props);
    _this.state = {
      visible: false
    };
    _this.reject = _this.reject.bind(_assertThisInitialized(_this));
    _this.accept = _this.accept.bind(_assertThisInitialized(_this));
    _this.hide = _this.hide.bind(_assertThisInitialized(_this));
    _this.onCloseClick = _this.onCloseClick.bind(_assertThisInitialized(_this));
    _this.onPanelClick = _this.onPanelClick.bind(_assertThisInitialized(_this));
    _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
    _this.onEntered = _this.onEntered.bind(_assertThisInitialized(_this));
    _this.onExit = _this.onExit.bind(_assertThisInitialized(_this));
    _this.onExited = _this.onExited.bind(_assertThisInitialized(_this));
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    _this.overlayRef = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  _createClass(ConfirmPopup, [{
    key: "acceptLabel",
    value: function acceptLabel() {
      return this.props.acceptLabel || (0, _Locale.localeOption)('accept');
    }
  }, {
    key: "rejectLabel",
    value: function rejectLabel() {
      return this.props.rejectLabel || (0, _Locale.localeOption)('reject');
    }
  }, {
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
        this.scrollHandler = new _ConnectedOverlayScrollHandler.default(this.props.target, function () {
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
        target: this.props.target
      });
    }
  }, {
    key: "accept",
    value: function accept() {
      if (this.props.accept) {
        this.props.accept();
      }

      this.hide('accept');
    }
  }, {
    key: "reject",
    value: function reject() {
      if (this.props.reject) {
        this.props.reject();
      }

      this.hide('reject');
    }
  }, {
    key: "show",
    value: function show() {
      var _this5 = this;

      this.setState({
        visible: true
      }, function () {
        _OverlayEventBus.default.on('overlay-click', function (e) {
          if (!_this5.isOutsideClicked(e.target)) {
            _this5.isPanelClicked = true;
          }
        });
      });
    }
  }, {
    key: "hide",
    value: function hide(result) {
      var _this6 = this;

      this.setState({
        visible: false
      }, function () {
        _OverlayEventBus.default.off('overlay-click');

        if (_this6.props.onHide) {
          _this6.props.onHide(result);
        }
      });
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      this.overlayRef.current.style.zIndex = String(_DomHandler.default.generateZIndex());
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
      if (this.props.target) {
        _DomHandler.default.absolutePosition(this.overlayRef.current, this.props.target);

        var containerOffset = _DomHandler.default.getOffset(this.overlayRef.current);

        var targetOffset = _DomHandler.default.getOffset(this.props.target);

        var arrowLeft = 0;

        if (containerOffset.left < targetOffset.left) {
          arrowLeft = targetOffset.left - containerOffset.left;
        }

        this.overlayRef.current.style.setProperty('--overlayArrowLeft', "".concat(arrowLeft, "px"));

        if (containerOffset.top < targetOffset.top) {
          _DomHandler.default.addClass(this.overlayRef.current, 'p-confirm-popup-flipped');
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.visible) {
        this.setState({
          visible: true
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.visible !== this.props.visible) {
        this.setState({
          visible: this.props.visible
        });
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

      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var iconClassName = (0, _ClassNames.classNames)('p-confirm-popup-icon', this.props.icon);

      var message = _ObjectUtils.default.getJSXElement(this.props.message, this.props);

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "p-confirm-popup-content"
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: iconClassName
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "p-confirm-popup-message"
      }, message));
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var acceptClassName = (0, _ClassNames.classNames)('p-confirm-popup-accept p-button-sm', this.props.acceptClassName);
      var rejectClassName = (0, _ClassNames.classNames)('p-confirm-popup-reject p-button-sm', {
        'p-button-text': !this.props.rejectClassName
      }, this.props.rejectClassName);
      var content = this.props.footer ? _ObjectUtils.default.getJSXElement(this.props.footer, this.props) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.Button, {
        label: this.rejectLabel(),
        icon: this.props.rejectIcon,
        className: rejectClassName,
        onClick: this.reject
      }), /*#__PURE__*/_react.default.createElement(_Button.Button, {
        label: this.acceptLabel(),
        icon: this.props.acceptIcon,
        className: acceptClassName,
        onClick: this.accept,
        autoFocus: true
      }));
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "p-confirm-popup-footer"
      }, content);
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var className = (0, _ClassNames.classNames)('p-confirm-popup p-component', this.props.className);
      var content = this.renderContent();
      var footer = this.renderFooter();
      return /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.CSSTransition, {
        nodeRef: this.overlayRef,
        classNames: "p-connected-overlay",
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
      }, content, footer));
    }
  }, {
    key: "render",
    value: function render() {
      var element = this.renderElement();
      return /*#__PURE__*/_react.default.createElement(_Portal.Portal, {
        element: element,
        appendTo: this.props.appendTo,
        visible: true
      });
    }
  }]);

  return ConfirmPopup;
}(_react.Component);

exports.ConfirmPopup = ConfirmPopup;

_defineProperty(ConfirmPopup, "defaultProps", {
  target: null,
  visible: false,
  message: null,
  rejectLabel: null,
  acceptLabel: null,
  icon: null,
  rejectIcon: null,
  acceptIcon: null,
  rejectClassName: null,
  acceptClassName: null,
  className: null,
  style: null,
  appendTo: null,
  dismissable: true,
  footer: null,
  onHide: null,
  accept: null,
  reject: null
});

_defineProperty(ConfirmPopup, "propTypes", {
  target: _propTypes.default.any,
  visible: _propTypes.default.bool,
  message: _propTypes.default.any,
  rejectLabel: _propTypes.default.string,
  acceptLabel: _propTypes.default.string,
  icon: _propTypes.default.string,
  rejectIcon: _propTypes.default.string,
  acceptIcon: _propTypes.default.string,
  rejectClassName: _propTypes.default.string,
  acceptClassName: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  appendTo: _propTypes.default.any,
  dismissable: _propTypes.default.bool,
  footer: _propTypes.default.any,
  onHide: _propTypes.default.func,
  accept: _propTypes.default.func,
  reject: _propTypes.default.func
});