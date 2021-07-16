this.primereact = this.primereact || {};
this.primereact.password = (function (exports, React, core, inputtext, PrimeReact) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
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
      _this.overlayRef = /*#__PURE__*/React.createRef();
      _this.inputRef = /*#__PURE__*/React.createRef(_this.props.inputRef);
      _this.mediumCheckRegExp = new RegExp(_this.props.mediumRegex);
      _this.strongCheckRegExp = new RegExp(_this.props.strongRegex);
      return _this;
    }

    _createClass(Password, [{
      key: "promptLabel",
      value: function promptLabel() {
        return this.props.promptLabel || PrimeReact.localeOption('passwordPrompt');
      }
    }, {
      key: "weakLabel",
      value: function weakLabel() {
        return this.props.weakLabel || PrimeReact.localeOption('weak');
      }
    }, {
      key: "mediumLabel",
      value: function mediumLabel() {
        return this.props.mediumLabel || PrimeReact.localeOption('medium');
      }
    }, {
      key: "strongLabel",
      value: function strongLabel() {
        return this.props.strongLabel || PrimeReact.localeOption('strong');
      }
    }, {
      key: "isFilled",
      value: function isFilled() {
        return this.props.value != null && this.props.value.toString().length > 0 || this.props.defaultValue != null && this.props.defaultValue.toString().length > 0 || this.inputRef && this.inputRef.current && core.DomHandler.hasClass(this.inputRef.current, 'p-filled');
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
          core.OverlayService.emit('overlay-click', {
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
        if (this.inputRef && this.inputRef.current) {
          core.DomHandler.alignOverlay(this.overlayRef.current, this.inputRef.current.parentElement, this.props.appendTo || PrimeReact__default['default'].appendTo);
        }
      }
    }, {
      key: "onOverlayEnter",
      value: function onOverlayEnter() {
        core.ZIndexUtils.set('overlay', this.overlayRef.current);
        this.alignOverlay();
      }
    }, {
      key: "onOverlayEntered",
      value: function onOverlayEntered() {
        this.bindScrollListener();
        this.bindResizeListener();
        this.props.onShow && this.props.onShow();
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
        core.ZIndexUtils.clear(this.overlayRef.current);
        this.props.onHide && this.props.onHide();
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

        var keyCode = e.keyCode || e.which;

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
            if (!!keyCode && !_this4.state.overlayVisible) {
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
          if (event.target.value.length > 0) core.DomHandler.addClass(this.container, 'p-inputwrapper-filled');else core.DomHandler.removeClass(this.container, 'p-inputwrapper-filled');
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
          this.scrollHandler = new core.ConnectedOverlayScrollHandler(this.inputEl, function () {
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
            if (_this6.state.overlayVisible && !core.DomHandler.isAndroid()) {
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
      key: "updateInputRef",
      value: function updateInputRef() {
        var ref = this.props.inputRef;

        if (ref) {
          if (typeof ref === 'function') {
            ref(this.inputRef.current);
          } else {
            ref.current = this.inputRef.current;
          }
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.updateInputRef();

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

        if (!this.isFilled() && core.DomHandler.hasClass(this.container, 'p-inputwrapper-filled')) {
          core.DomHandler.removeClass(this.container, 'p-inputwrapper-filled');
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

        core.ZIndexUtils.clear(this.overlayRef.current);
      }
    }, {
      key: "renderTooltip",
      value: function renderTooltip() {
        this.tooltip = core.tip({
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
          var content = /*#__PURE__*/React__default['default'].createElement("i", {
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
            content = core.ObjectUtils.getJSXElement(this.props.icon, defaultIconOptions);
          }

          return content;
        }

        return null;
      }
    }, {
      key: "renderPanel",
      value: function renderPanel() {
        var panelClassName = core.classNames('p-password-panel p-component', this.props.panelClassName);

        var _ref = this.state.meter || {
          strength: '',
          width: '0%'
        },
            strength = _ref.strength,
            width = _ref.width;

        var header = core.ObjectUtils.getJSXElement(this.props.header, this.props);
        var footer = core.ObjectUtils.getJSXElement(this.props.footer, this.props);
        var content = this.props.content ? core.ObjectUtils.getJSXElement(this.props.content, this.props) : /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-password-meter"
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-password-strength ".concat(strength),
          style: {
            width: width
          }
        })), /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-password-info"
        }, this.state.infoText));
        var panel = /*#__PURE__*/React__default['default'].createElement(core.CSSTransition, {
          nodeRef: this.overlayRef,
          classNames: "p-connected-overlay",
          in: this.state.overlayVisible,
          timeout: {
            enter: 120,
            exit: 100
          },
          options: this.props.transitionOptions,
          unmountOnExit: true,
          onEnter: this.onOverlayEnter,
          onEntered: this.onOverlayEntered,
          onExit: this.onOverlayExit,
          onExited: this.onOverlayExited
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          ref: this.overlayRef,
          className: panelClassName,
          style: this.props.panelStyle,
          onClick: this.onPanelClick
        }, header, content, footer));
        return /*#__PURE__*/React__default['default'].createElement(core.Portal, {
          element: panel,
          appendTo: this.props.appendTo
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this7 = this;

        var containerClassName = core.classNames('p-password p-component p-inputwrapper', {
          'p-inputwrapper-filled': this.isFilled(),
          'p-inputwrapper-focus': this.state.focused,
          'p-input-icon-right': this.props.toggleMask
        }, this.props.className);
        var inputClassName = core.classNames('p-password-input', this.props.inputClassName);
        var type = this.getInputType();
        var inputProps = core.ObjectUtils.findDiffKeys(this.props, Password.defaultProps);
        var icon = this.renderIcon();
        var panel = this.renderPanel();
        return /*#__PURE__*/React__default['default'].createElement("div", {
          ref: function ref(el) {
            return _this7.container = el;
          },
          id: this.props.id,
          className: containerClassName,
          style: this.props.style
        }, /*#__PURE__*/React__default['default'].createElement(inputtext.InputText, _extends({
          ref: this.inputRef,
          id: this.props.inputId
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
  }(React.Component);

  _defineProperty(Password, "defaultProps", {
    id: null,
    inputId: null,
    inputRef: null,
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
    transitionOptions: null,
    onInput: null,
    onShow: null,
    onHide: null
  });

  exports.Password = Password;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.core, primereact.inputtext, primereact.api));
