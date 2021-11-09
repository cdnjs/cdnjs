this.primereact = this.primereact || {};
this.primereact.sidebar = (function (exports, React, utils, csstransition, ripple, portal, PrimeReact) {
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
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
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

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Sidebar = /*#__PURE__*/function (_Component) {
    _inherits(Sidebar, _Component);

    var _super = _createSuper(Sidebar);

    function Sidebar(props) {
      var _this;

      _classCallCheck(this, Sidebar);

      _this = _super.call(this, props);
      _this.state = {
        maskVisible: props.visible,
        visible: false
      };
      _this.onMaskClick = _this.onMaskClick.bind(_assertThisInitialized(_this));
      _this.onClose = _this.onClose.bind(_assertThisInitialized(_this));
      _this.onEntered = _this.onEntered.bind(_assertThisInitialized(_this));
      _this.onExiting = _this.onExiting.bind(_assertThisInitialized(_this));
      _this.onExited = _this.onExited.bind(_assertThisInitialized(_this));
      _this.sidebarRef = /*#__PURE__*/React__default["default"].createRef();
      return _this;
    }

    _createClass(Sidebar, [{
      key: "getPositionClass",
      value: function getPositionClass() {
        var _this2 = this;

        var positions = ['left', 'right', 'top', 'bottom'];
        var pos = positions.find(function (item) {
          return item === _this2.props.position;
        });
        return pos ? "p-sidebar-".concat(pos) : '';
      }
    }, {
      key: "focus",
      value: function focus() {
        var activeElement = document.activeElement;
        var isActiveElementInDialog = activeElement && this.sidebarRef && this.sidebarRef.current.contains(activeElement);

        if (!isActiveElementInDialog && this.props.showCloseIcon) {
          this.closeIcon.focus();
        }
      }
    }, {
      key: "onMaskClick",
      value: function onMaskClick(event) {
        if (this.props.dismissable && this.props.modal && this.mask === event.target) {
          this.onClose(event);
        }
      }
    }, {
      key: "onClose",
      value: function onClose(event) {
        this.props.onHide();
        event.preventDefault();
      }
    }, {
      key: "onEntered",
      value: function onEntered() {
        if (this.props.onShow) {
          this.props.onShow();
        }

        this.focus();
        this.enableDocumentSettings();
      }
    }, {
      key: "onExiting",
      value: function onExiting() {
        if (this.props.modal) {
          utils.DomHandler.addClass(this.mask, 'p-component-overlay-leave');
        }
      }
    }, {
      key: "onExited",
      value: function onExited() {
        utils.ZIndexUtils.clear(this.mask);
        this.setState({
          maskVisible: false
        });
        this.disableDocumentSettings();
      }
    }, {
      key: "enableDocumentSettings",
      value: function enableDocumentSettings() {
        this.bindGlobalListeners();

        if (this.props.blockScroll) {
          utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
        }
      }
    }, {
      key: "disableDocumentSettings",
      value: function disableDocumentSettings() {
        this.unbindGlobalListeners();

        if (this.props.blockScroll) {
          utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }
      }
    }, {
      key: "bindGlobalListeners",
      value: function bindGlobalListeners() {
        if (this.props.closeOnEscape) {
          this.bindDocumentEscapeListener();
        }
      }
    }, {
      key: "unbindGlobalListeners",
      value: function unbindGlobalListeners() {
        this.unbindDocumentEscapeListener();
      }
    }, {
      key: "bindDocumentEscapeListener",
      value: function bindDocumentEscapeListener() {
        var _this3 = this;

        this.documentEscapeListener = function (event) {
          if (event.which === 27) {
            if (utils.ZIndexUtils.get(_this3.mask) === utils.ZIndexUtils.getCurrent('modal', PrimeReact__default["default"].autoZIndex)) {
              _this3.onClose(event);
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
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this4 = this;

        if (this.props.visible) {
          this.setState({
            visible: true
          }, function () {
            utils.ZIndexUtils.set('modal', _this4.mask, PrimeReact__default["default"].autoZIndex, _this4.props.baseZIndex || PrimeReact__default["default"].zIndex['modal']);
          });
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this5 = this;

        if (this.props.visible && !this.state.maskVisible) {
          this.setState({
            maskVisible: true
          }, function () {
            utils.ZIndexUtils.set('modal', _this5.mask, PrimeReact__default["default"].autoZIndex, _this5.props.baseZIndex || PrimeReact__default["default"].zIndex['modal']);
          });
        }

        if (this.props.visible !== this.state.visible && this.state.maskVisible) {
          this.setState({
            visible: this.props.visible
          });
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.disableDocumentSettings();
        utils.ZIndexUtils.clear(this.mask);
      }
    }, {
      key: "renderCloseIcon",
      value: function renderCloseIcon() {
        var _this6 = this;

        if (this.props.showCloseIcon) {
          return /*#__PURE__*/React__default["default"].createElement("button", {
            type: "button",
            ref: function ref(el) {
              return _this6.closeIcon = el;
            },
            className: "p-sidebar-close p-sidebar-icon p-link",
            onClick: this.onClose,
            "aria-label": this.props.ariaCloseLabel
          }, /*#__PURE__*/React__default["default"].createElement("span", {
            className: "p-sidebar-close-icon pi pi-times"
          }), /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));
        }

        return null;
      }
    }, {
      key: "renderIcons",
      value: function renderIcons() {
        if (this.props.icons) {
          return utils.ObjectUtils.getJSXElement(this.props.icons, this.props);
        }

        return null;
      }
    }, {
      key: "renderElement",
      value: function renderElement() {
        var _this7 = this;

        var className = utils.classNames('p-sidebar p-component', this.props.className);
        var maskClassName = utils.classNames('p-sidebar-mask', {
          'p-component-overlay p-component-overlay-enter': this.props.modal,
          'p-sidebar-mask-scrollblocker': this.props.blockScroll,
          'p-sidebar-visible': this.state.maskVisible,
          'p-sidebar-full': this.props.fullScreen
        }, this.props.maskClassName, this.getPositionClass());
        var closeIcon = this.renderCloseIcon();
        var icons = this.renderIcons();
        var transitionTimeout = {
          enter: this.props.fullScreen ? 150 : 300,
          exit: this.props.fullScreen ? 150 : 300
        };
        return /*#__PURE__*/React__default["default"].createElement("div", {
          ref: function ref(el) {
            return _this7.mask = el;
          },
          style: this.props.maskStyle,
          className: maskClassName,
          onClick: this.onMaskClick
        }, /*#__PURE__*/React__default["default"].createElement(csstransition.CSSTransition, {
          nodeRef: this.sidebarRef,
          classNames: "p-sidebar",
          in: this.state.visible,
          timeout: transitionTimeout,
          options: this.props.transitionOptions,
          unmountOnExit: true,
          onEntered: this.onEntered,
          onExiting: this.onExiting,
          onExited: this.onExited
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          ref: this.sidebarRef,
          id: this.props.id,
          className: className,
          style: this.props.style,
          role: "complementary"
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-sidebar-header"
        }, icons, closeIcon), /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-sidebar-content"
        }, this.props.children))));
      }
    }, {
      key: "render",
      value: function render() {
        if (this.state.maskVisible) {
          var element = this.renderElement();
          return /*#__PURE__*/React__default["default"].createElement(portal.Portal, {
            element: element,
            appendTo: this.props.appendTo,
            visible: true
          });
        }

        return null;
      }
    }]);

    return Sidebar;
  }(React.Component);

  _defineProperty(Sidebar, "defaultProps", {
    id: null,
    style: null,
    className: null,
    maskStyle: null,
    maskClassName: null,
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
    appendTo: null,
    transitionOptions: null,
    onShow: null,
    onHide: null
  });

  exports.Sidebar = Sidebar;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils, primereact.csstransition, primereact.ripple, primereact.portal, primereact.api);
