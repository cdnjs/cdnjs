"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Password = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _Tooltip = require("../tooltip/Tooltip");

var _InputText = require("../inputtext/InputText");

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _reactTransitionGroup = require("react-transition-group");

var _ClassNames = require("../utils/ClassNames");

var _ConnectedOverlayScrollHandler = _interopRequireDefault(require("../utils/ConnectedOverlayScrollHandler"));

var _Locale = require("../api/Locale");

var _OverlayEventBus = _interopRequireDefault(require("../overlayeventbus/OverlayEventBus"));

var _Portal = require("../portal/Portal");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var Password = /*#__PURE__*/function (_Component) {
  _inherits(Password, _Component);

  var _super = _createSuper(Password);

  function Password(props) {
    var _this;

    _classCallCheck(this, Password);

    _this = _super.call(this, props);
    _this.state = {
      overlayVisible: false,
      meter: null,
      infoText: _this.promptLabel(),
      focused: false,
      unmasked: false
    };
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.onKeyup = _this.onKeyup.bind(_assertThisInitialized(_this));
    _this.onInput = _this.onInput.bind(_assertThisInitialized(_this));
    _this.onMaskToggle = _this.onMaskToggle.bind(_assertThisInitialized(_this));
    _this.onOverlayEnter = _this.onOverlayEnter.bind(_assertThisInitialized(_this));
    _this.onOverlayEntered = _this.onOverlayEntered.bind(_assertThisInitialized(_this));
    _this.onOverlayExit = _this.onOverlayExit.bind(_assertThisInitialized(_this));
    _this.onOverlayExited = _this.onOverlayExited.bind(_assertThisInitialized(_this));
    _this.onPanelClick = _this.onPanelClick.bind(_assertThisInitialized(_this));
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    _this.overlayRef = /*#__PURE__*/_react.default.createRef();
    _this.mediumCheckRegExp = new RegExp(_this.props.mediumRegex);
    _this.strongCheckRegExp = new RegExp(_this.props.strongRegex);
    return _this;
  }

  _createClass(Password, [{
    key: "promptLabel",
    value: function promptLabel() {
      return this.props.promptLabel || (0, _Locale.localeOption)('passwordPrompt');
    }
  }, {
    key: "weakLabel",
    value: function weakLabel() {
      return this.props.weakLabel || (0, _Locale.localeOption)('weak');
    }
  }, {
    key: "mediumLabel",
    value: function mediumLabel() {
      return this.props.mediumLabel || (0, _Locale.localeOption)('medium');
    }
  }, {
    key: "strongLabel",
    value: function strongLabel() {
      return this.props.strongLabel || (0, _Locale.localeOption)('strong');
    }
  }, {
    key: "isFilled",
    value: function isFilled() {
      return this.props.value != null && this.props.value.toString().length > 0 || this.props.defaultValue != null && this.props.defaultValue.toString().length > 0;
    }
  }, {
    key: "getInputType",
    value: function getInputType() {
      return this.state.unmasked ? 'text' : 'password';
    }
  }, {
    key: "updateLabels",
    value: function updateLabels() {
      if (this.state.meter) {
        var label = null;

        switch (this.state.meter.strength) {
          case 'weak':
            label = this.weakLabel();
            break;

          case 'medium':
            label = this.mediumLabel();
            break;

          case 'strong':
            label = this.strongLabel();
            break;

          default:
            break;
        }

        if (label && this.state.infoText !== label) {
          this.setState({
            infoText: label
          });
        }
      } else {
        var promptLabel = this.promptLabel();

        if (this.state.infoText !== promptLabel) {
          this.setState({
            infoText: promptLabel
          });
        }
      }
    }
  }, {
    key: "onPanelClick",
    value: function onPanelClick(event) {
      if (this.props.feedback) {
        _OverlayEventBus.default.emit('overlay-click', {
          originalEvent: event,
          target: this.container
        });
      }
    }
  }, {
    key: "onMaskToggle",
    value: function onMaskToggle() {
      this.setState(function (prevState) {
        return {
          unmasked: !prevState.unmasked
        };
      });
    }
  }, {
    key: "showOverlay",
    value: function showOverlay() {
      this.updateLabels();
      this.setState({
        overlayVisible: true
      });
    }
  }, {
    key: "hideOverlay",
    value: function hideOverlay() {
      this.setState({
        overlayVisible: false
      });
    }
  }, {
    key: "alignOverlay",
    value: function alignOverlay() {
      var container = this.inputEl.parentElement;
      this.overlayRef.current.style.minWidth = _DomHandler.default.getOuterWidth(container) + 'px';

      _DomHandler.default.absolutePosition(this.overlayRef.current, container);
    }
  }, {
    key: "onOverlayEnter",
    value: function onOverlayEnter() {
      this.overlayRef.current.style.zIndex = String(_DomHandler.default.generateZIndex());
      this.alignOverlay();
    }
  }, {
    key: "onOverlayEntered",
    value: function onOverlayEntered() {
      this.bindScrollListener();
      this.bindResizeListener();
    }
  }, {
    key: "onOverlayExit",
    value: function onOverlayExit() {
      this.unbindScrollListener();
      this.unbindResizeListener();
    }
  }, {
    key: "onOverlayExited",
    value: function onOverlayExited() {
      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "onFocus",
    value: function onFocus(event) {
      var _this2 = this;

      event.persist();
      this.setState({
        focused: true
      }, function () {
        if (_this2.props.feedback) {
          _this2.showOverlay();
        }

        if (_this2.props.onFocus) {
          _this2.props.onFocus(event);
        }
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur(event) {
      var _this3 = this;

      event.persist();
      this.setState({
        focused: false
      }, function () {
        if (_this3.props.feedback) {
          _this3.hideOverlay();
        }

        if (_this3.props.onBlur) {
          _this3.props.onBlur(event);
        }
      });
    }
  }, {
    key: "onKeyup",
    value: function onKeyup(e) {
      var _this4 = this;

      if (this.props.feedback) {
        var value = e.target.value;
        var label = null;
        var meter = null;

        switch (this.testStrength(value)) {
          case 1:
            label = this.weakLabel();
            meter = {
              strength: 'weak',
              width: '33.33%'
            };
            break;

          case 2:
            label = this.mediumLabel();
            meter = {
              strength: 'medium',
              width: '66.66%'
            };
            break;

          case 3:
            label = this.strongLabel();
            meter = {
              strength: 'strong',
              width: '100%'
            };
            break;

          default:
            label = this.promptLabel();
            meter = null;
            break;
        }

        this.setState({
          meter: meter,
          infoText: label
        }, function () {
          if (!_this4.state.overlayVisible) {
            _this4.showOverlay();
          }
        });
      }

      if (this.props.onKeyUp) {
        this.props.onKeyUp(e);
      }
    }
  }, {
    key: "onInput",
    value: function onInput(event, validatePattern) {
      if (this.props.onInput) {
        this.props.onInput(event, validatePattern);
      }

      if (!this.props.onChange) {
        if (event.target.value.length > 0) _DomHandler.default.addClass(this.container, 'p-inputwrapper-filled');else _DomHandler.default.removeClass(this.container, 'p-inputwrapper-filled');
      }
    }
  }, {
    key: "testStrength",
    value: function testStrength(str) {
      var level = 0;
      if (this.strongCheckRegExp.test(str)) level = 3;else if (this.mediumCheckRegExp.test(str)) level = 2;else if (str.length) level = 1;
      return level;
    }
  }, {
    key: "bindScrollListener",
    value: function bindScrollListener() {
      var _this5 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new _ConnectedOverlayScrollHandler.default(this.inputEl, function () {
          if (_this5.state.overlayVisible) {
            _this5.hideOverlay();
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
      var _this6 = this;

      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this6.state.overlayVisible) {
            _this6.hideOverlay();
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

      if (prevProps.mediumRegex !== this.props.mediumRegex) {
        this.mediumCheckRegExp = new RegExp(this.props.mediumRegex);
      }

      if (prevProps.strongRegex !== this.props.strongRegex) {
        this.strongCheckRegExp = new RegExp(this.props.strongRegex);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindResizeListener();

      if (this.scrollHandler) {
        this.scrollHandler.destroy();
        this.scrollHandler = null;
      }

      if (this.tooltip) {
        this.tooltip.destroy();
        this.tooltip = null;
      }

      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "renderTooltip",
    value: function renderTooltip() {
      this.tooltip = (0, _Tooltip.tip)({
        target: this.inputEl,
        content: this.props.tooltip,
        options: this.props.tooltipOptions
      });
    }
  }, {
    key: "renderIcon",
    value: function renderIcon() {
      if (this.props.toggleMask) {
        var iconClassName = this.state.unmasked ? 'pi pi-eye-slash' : 'pi pi-eye';

        var content = /*#__PURE__*/_react.default.createElement("i", {
          className: iconClassName,
          onClick: this.onMaskToggle
        });

        if (this.props.icon) {
          var defaultIconOptions = {
            onClick: this.onMaskToggle,
            className: iconClassName,
            element: content,
            props: this.props
          };
          content = _ObjectUtils.default.getJSXElement(this.props.icon, defaultIconOptions);
        }

        return content;
      }

      return null;
    }
  }, {
    key: "renderPanel",
    value: function renderPanel() {
      var panelClassName = (0, _ClassNames.classNames)('p-password-panel p-component', this.props.panelClassName);

      var _ref = this.state.meter || {
        strength: '',
        width: '0%'
      },
          strength = _ref.strength,
          width = _ref.width;

      var header = _ObjectUtils.default.getJSXElement(this.props.header, this.props);

      var footer = _ObjectUtils.default.getJSXElement(this.props.footer, this.props);

      var content = this.props.content ? _ObjectUtils.default.getJSXElement(this.props.content, this.props) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-password-meter"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-password-strength ".concat(strength),
        style: {
          width: width
        }
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "p-password-info"
      }, this.state.infoText));

      var panel = /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.CSSTransition, {
        nodeRef: this.overlayRef,
        classNames: "p-connected-overlay",
        in: this.state.overlayVisible,
        timeout: {
          enter: 120,
          exit: 100
        },
        unmountOnExit: true,
        onEnter: this.onOverlayEnter,
        onEntered: this.onOverlayEntered,
        onExit: this.onOverlayExit,
        onExited: this.onOverlayExited
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: this.overlayRef,
        className: panelClassName,
        style: this.props.panelStyle,
        onClick: this.onPanelClick
      }, header, content, footer));

      return /*#__PURE__*/_react.default.createElement(_Portal.Portal, {
        element: panel,
        appendTo: this.props.appendTo
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var containerClassName = (0, _ClassNames.classNames)('p-password p-component p-inputwrapper', {
        'p-inputwrapper-filled': this.isFilled(),
        'p-inputwrapper-focus': this.state.focused,
        'p-input-icon-right': this.props.toggleMask
      }, this.props.className);
      var inputClassName = (0, _ClassNames.classNames)('p-password-input', this.props.inputClassName);
      var type = this.getInputType();

      var inputProps = _ObjectUtils.default.findDiffKeys(this.props, Password.defaultProps);

      var icon = this.renderIcon();
      var panel = this.renderPanel();
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this7.container = el;
        },
        className: containerClassName,
        style: this.props.style
      }, /*#__PURE__*/_react.default.createElement(_InputText.InputText, _extends({
        id: this.id,
        ref: function ref(el) {
          return _this7.inputEl = el;
        },
        defaultValue: this.props.value
      }, inputProps, {
        type: type,
        className: inputClassName,
        style: this.props.inputStyle,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onKeyUp: this.onKeyup,
        onInput: this.onInput
      })), icon, panel);
    }
  }]);

  return Password;
}(_react.Component);

exports.Password = Password;

_defineProperty(Password, "defaultProps", {
  id: null,
  value: null,
  promptLabel: null,
  weakLabel: null,
  mediumLabel: null,
  strongLabel: null,
  mediumRegex: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
  strongRegex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
  feedback: true,
  toggleMask: false,
  appendTo: null,
  header: null,
  content: null,
  footer: null,
  icon: null,
  tooltip: null,
  tooltipOptions: null,
  style: null,
  className: null,
  inputStyle: null,
  inputClassName: null,
  panelStyle: null,
  panelClassName: null,
  onInput: null
});

_defineProperty(Password, "propTypes", {
  id: _propTypes.default.string,
  value: _propTypes.default.string,
  promptLabel: _propTypes.default.string,
  weakLabel: _propTypes.default.string,
  mediumLabel: _propTypes.default.string,
  strongLabel: _propTypes.default.string,
  mediumRegex: _propTypes.default.string,
  strongRegex: _propTypes.default.string,
  feedback: _propTypes.default.bool,
  toggleMask: _propTypes.default.bool,
  appendTo: _propTypes.default.any,
  header: _propTypes.default.any,
  content: _propTypes.default.any,
  footer: _propTypes.default.any,
  icon: _propTypes.default.any,
  tooltip: _propTypes.default.string,
  tooltipOptions: _propTypes.default.object,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  inputStyle: _propTypes.default.object,
  inputClassName: _propTypes.default.string,
  panelStyle: _propTypes.default.object,
  panelClassName: _propTypes.default.string,
  onInput: _propTypes.default.func
});