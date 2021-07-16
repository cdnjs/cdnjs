this.primereact = this.primereact || {};
this.primereact.splitbutton = (function (exports, React, button, core, PrimeReact) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

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

  function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var SplitButtonItem = /*#__PURE__*/function (_Component) {
    _inherits(SplitButtonItem, _Component);

    var _super = _createSuper$2(SplitButtonItem);

    function SplitButtonItem(props) {
      var _this;

      _classCallCheck(this, SplitButtonItem);

      _this = _super.call(this, props);
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(SplitButtonItem, [{
      key: "onClick",
      value: function onClick(e) {
        if (this.props.menuitem.command) {
          this.props.menuitem.command({
            originalEvent: e,
            item: this.props.menuitem
          });
        }

        if (this.props.onItemClick) {
          this.props.onItemClick(e);
        }

        e.preventDefault();
      }
    }, {
      key: "renderSeparator",
      value: function renderSeparator() {
        return /*#__PURE__*/React__default['default'].createElement("li", {
          className: "p-menu-separator",
          role: "separator"
        });
      }
    }, {
      key: "renderMenuitem",
      value: function renderMenuitem() {
        var _this2 = this;

        var _this$props$menuitem = this.props.menuitem,
            disabled = _this$props$menuitem.disabled,
            icon = _this$props$menuitem.icon,
            label = _this$props$menuitem.label,
            template = _this$props$menuitem.template,
            url = _this$props$menuitem.url,
            target = _this$props$menuitem.target;
        var className = core.classNames('p-menuitem-link', {
          'p-disabled': disabled
        });
        var iconClassName = core.classNames('p-menuitem-icon', icon);
        icon = icon && /*#__PURE__*/React__default['default'].createElement("span", {
          className: iconClassName
        });
        label = label && /*#__PURE__*/React__default['default'].createElement("span", {
          className: "p-menuitem-text"
        }, label);
        var content = /*#__PURE__*/React__default['default'].createElement("a", {
          href: url || '#',
          role: "menuitem",
          className: className,
          target: target,
          onClick: this.onClick
        }, icon, label);

        if (template) {
          var defaultContentOptions = {
            onClick: function onClick(event) {
              return _this2.onClick(event);
            },
            className: className,
            labelClassName: 'p-menuitem-text',
            iconClassName: iconClassName,
            element: content,
            props: this.props
          };
          content = core.ObjectUtils.getJSXElement(template, this.props.menuitem, defaultContentOptions);
        }

        return /*#__PURE__*/React__default['default'].createElement("li", {
          className: "p-menuitem",
          role: "none"
        }, content);
      }
    }, {
      key: "renderItem",
      value: function renderItem() {
        if (this.props.menuitem.separator) {
          return this.renderSeparator();
        }

        return this.renderMenuitem();
      }
    }, {
      key: "render",
      value: function render() {
        var item = this.renderItem();
        return item;
      }
    }]);

    return SplitButtonItem;
  }(React.Component);

  _defineProperty(SplitButtonItem, "defaultProps", {
    menuitem: null,
    onItemClick: null
  });

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

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var SplitButtonPanelComponent = /*#__PURE__*/function (_Component) {
    _inherits(SplitButtonPanelComponent, _Component);

    var _super = _createSuper$1(SplitButtonPanelComponent);

    function SplitButtonPanelComponent() {
      _classCallCheck(this, SplitButtonPanelComponent);

      return _super.apply(this, arguments);
    }

    _createClass(SplitButtonPanelComponent, [{
      key: "renderElement",
      value: function renderElement() {
        var className = core.classNames('p-menu p-menu-overlay p-component', this.props.menuClassName);
        return /*#__PURE__*/React__default['default'].createElement(core.CSSTransition, {
          nodeRef: this.props.forwardRef,
          classNames: "p-connected-overlay",
          in: this.props.in,
          timeout: {
            enter: 120,
            exit: 100
          },
          options: this.props.transitionOptions,
          unmountOnExit: true,
          onEnter: this.props.onEnter,
          onEntered: this.props.onEntered,
          onExit: this.props.onExit,
          onExited: this.props.onExited
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          ref: this.props.forwardRef,
          className: className,
          style: this.props.menuStyle,
          id: this.props.id,
          onClick: this.onClick
        }, /*#__PURE__*/React__default['default'].createElement("ul", {
          className: "p-menu-list p-reset",
          role: "menu"
        }, this.props.children)));
      }
    }, {
      key: "render",
      value: function render() {
        var element = this.renderElement();
        return /*#__PURE__*/React__default['default'].createElement(core.Portal, {
          element: element,
          appendTo: this.props.appendTo
        });
      }
    }]);

    return SplitButtonPanelComponent;
  }(React.Component);

  _defineProperty(SplitButtonPanelComponent, "defaultProps", {
    appendTo: null,
    menuStyle: null,
    menuClassName: null,
    id: null,
    onClick: null
  });

  var SplitButtonPanel = /*#__PURE__*/React__default['default'].forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default['default'].createElement(SplitButtonPanelComponent, _extends({
      forwardRef: ref
    }, props));
  });

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var SplitButton = /*#__PURE__*/function (_Component) {
    _inherits(SplitButton, _Component);

    var _super = _createSuper(SplitButton);

    function SplitButton(props) {
      var _this;

      _classCallCheck(this, SplitButton);

      _this = _super.call(this, props);
      _this.state = {
        id: props.id,
        overlayVisible: false
      };
      _this.onDropdownButtonClick = _this.onDropdownButtonClick.bind(_assertThisInitialized(_this));
      _this.onItemClick = _this.onItemClick.bind(_assertThisInitialized(_this));
      _this.onOverlayEnter = _this.onOverlayEnter.bind(_assertThisInitialized(_this));
      _this.onOverlayEntered = _this.onOverlayEntered.bind(_assertThisInitialized(_this));
      _this.onOverlayExit = _this.onOverlayExit.bind(_assertThisInitialized(_this));
      _this.onOverlayExited = _this.onOverlayExited.bind(_assertThisInitialized(_this));
      _this.onPanelClick = _this.onPanelClick.bind(_assertThisInitialized(_this));
      _this.overlayRef = /*#__PURE__*/React__default['default'].createRef();
      return _this;
    }

    _createClass(SplitButton, [{
      key: "onPanelClick",
      value: function onPanelClick(event) {
        core.OverlayService.emit('overlay-click', {
          originalEvent: event,
          target: this.container
        });
      }
    }, {
      key: "onDropdownButtonClick",
      value: function onDropdownButtonClick() {
        if (this.state.overlayVisible) this.hide();else this.show();
      }
    }, {
      key: "onItemClick",
      value: function onItemClick() {
        this.hide();
      }
    }, {
      key: "show",
      value: function show() {
        this.setState({
          overlayVisible: true
        });
      }
    }, {
      key: "hide",
      value: function hide() {
        this.setState({
          overlayVisible: false
        });
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
        this.bindDocumentClickListener();
        this.bindScrollListener();
        this.bindResizeListener();
        this.props.onShow && this.props.onShow();
      }
    }, {
      key: "onOverlayExit",
      value: function onOverlayExit() {
        this.unbindDocumentClickListener();
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
      key: "alignOverlay",
      value: function alignOverlay() {
        core.DomHandler.alignOverlay(this.overlayRef.current, this.defaultButton.parentElement, this.props.appendTo || PrimeReact__default['default'].appendTo);
      }
    }, {
      key: "bindDocumentClickListener",
      value: function bindDocumentClickListener() {
        var _this2 = this;

        if (!this.documentClickListener) {
          this.documentClickListener = function (event) {
            if (_this2.state.overlayVisible && _this2.isOutsideClicked(event)) {
              _this2.hide();
            }
          };

          document.addEventListener('click', this.documentClickListener);
        }
      }
    }, {
      key: "bindScrollListener",
      value: function bindScrollListener() {
        var _this3 = this;

        if (!this.scrollHandler) {
          this.scrollHandler = new core.ConnectedOverlayScrollHandler(this.container, function () {
            if (_this3.state.overlayVisible) {
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
            if (_this4.state.overlayVisible && !core.DomHandler.isAndroid()) {
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
      value: function isOutsideClicked(event) {
        return this.container && this.overlayRef && this.overlayRef.current && !this.overlayRef.current.contains(event.target);
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
      key: "componentDidMount",
      value: function componentDidMount() {
        if (!this.state.id) {
          this.setState({
            id: core.UniqueComponentId()
          });
        }

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
        this.unbindDocumentClickListener();
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
          target: this.container,
          content: this.props.tooltip,
          options: this.props.tooltipOptions
        });
      }
    }, {
      key: "renderItems",
      value: function renderItems() {
        var _this5 = this;

        if (this.props.model) {
          return this.props.model.map(function (menuitem, index) {
            return /*#__PURE__*/React__default['default'].createElement(SplitButtonItem, {
              menuitem: menuitem,
              key: index,
              onItemClick: _this5.onItemClick
            });
          });
        }

        return null;
      }
    }, {
      key: "render",
      value: function render() {
        var _this6 = this;

        var className = core.classNames('p-splitbutton p-component', this.props.className, {
          'p-disabled': this.props.disabled
        });
        var items = this.renderItems();
        var buttonContent = this.props.buttonTemplate ? core.ObjectUtils.getJSXElement(this.props.buttonTemplate, this.props) : null;
        return /*#__PURE__*/React__default['default'].createElement("div", {
          id: this.state.id,
          className: className,
          style: this.props.style,
          ref: function ref(el) {
            return _this6.container = el;
          }
        }, /*#__PURE__*/React__default['default'].createElement(button.Button, {
          ref: function ref(el) {
            return _this6.defaultButton = el;
          },
          type: "button",
          className: "p-splitbutton-defaultbutton",
          icon: this.props.icon,
          label: this.props.label,
          onClick: this.props.onClick,
          disabled: this.props.disabled,
          tabIndex: this.props.tabIndex
        }, buttonContent), /*#__PURE__*/React__default['default'].createElement(button.Button, {
          type: "button",
          className: "p-splitbutton-menubutton",
          icon: this.props.dropdownIcon,
          onClick: this.onDropdownButtonClick,
          disabled: this.props.disabled,
          "aria-expanded": this.state.overlayVisible,
          "aria-haspopup": true,
          "aria-owns": this.state.id + '_overlay'
        }), /*#__PURE__*/React__default['default'].createElement(SplitButtonPanel, {
          ref: this.overlayRef,
          appendTo: this.props.appendTo,
          id: this.state.id + '_overlay',
          menuStyle: this.props.menuStyle,
          menuClassName: this.props.menuClassName,
          onClick: this.onPanelClick,
          in: this.state.overlayVisible,
          onEnter: this.onOverlayEnter,
          onEntered: this.onOverlayEntered,
          onExit: this.onOverlayExit,
          onExited: this.onOverlayExited,
          transitionOptions: this.props.transitionOptions
        }, items));
      }
    }]);

    return SplitButton;
  }(React.Component);

  _defineProperty(SplitButton, "defaultProps", {
    id: null,
    label: null,
    icon: null,
    model: null,
    disabled: null,
    style: null,
    className: null,
    menuStyle: null,
    menuClassName: null,
    tabIndex: null,
    appendTo: null,
    tooltip: null,
    tooltipOptions: null,
    buttonTemplate: null,
    transitionOptions: null,
    dropdownIcon: 'pi pi-chevron-down',
    onClick: null,
    onShow: null,
    onHide: null
  });

  exports.SplitButton = SplitButton;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.button, primereact.core, primereact.api));
