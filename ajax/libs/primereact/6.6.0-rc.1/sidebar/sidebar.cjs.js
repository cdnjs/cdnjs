'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var core = require('primereact/core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
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
    _this.sidebarRef = /*#__PURE__*/React__default['default'].createRef();
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
      core.ZIndexUtils.set('modal', this.sidebarRef.current, this.props.baseZIndex);

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

      this.props.onShow && this.props.onShow();
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
      core.ZIndexUtils.clear(this.sidebarRef.current);
    }
  }, {
    key: "enableModality",
    value: function enableModality() {
      if (!this.mask) {
        this.mask = document.createElement('div');
        this.mask.style.zIndex = String(core.ZIndexUtils.get(this.sidebarRef.current) - 1);
        var maskClassName = 'p-component-overlay p-component-overlay p-component-overlay-enter';

        if (this.props.blockScroll) {
          maskClassName += ' p-sidebar-mask-scrollblocker';
        }

        core.DomHandler.addMultipleClasses(this.mask, maskClassName);

        if (this.props.dismissable) {
          this.bindMaskClickListener();
        }

        document.body.appendChild(this.mask);

        if (this.props.blockScroll) {
          core.DomHandler.addClass(document.body, 'p-overflow-hidden');
        }
      }
    }
  }, {
    key: "disableModality",
    value: function disableModality() {
      var _this2 = this;

      if (this.mask) {
        core.DomHandler.addClass(this.mask, 'p-component-overlay-leave');
        this.mask.addEventListener('animationend', function () {
          _this2.destroyModal();
        });
      }
    }
  }, {
    key: "destroyModal",
    value: function destroyModal() {
      if (this.mask) {
        this.unbindMaskClickListener();
        document.body.removeChild(this.mask);
        core.DomHandler.removeClass(document.body, 'p-overflow-hidden');
        this.mask = null;
      }
    }
  }, {
    key: "bindDocumentEscapeListener",
    value: function bindDocumentEscapeListener() {
      var _this3 = this;

      this.documentEscapeListener = function (event) {
        if (event.which === 27) {
          if (core.ZIndexUtils.get(_this3.sidebarRef.current) === core.ZIndexUtils.getCurrent('modal')) {
            _this3.onCloseClick(event);
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
      var _this4 = this;

      if (!this.maskClickListener) {
        this.maskClickListener = function (event) {
          _this4.onCloseClick(event);
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
      core.ZIndexUtils.clear(this.sidebarRef.current);
    }
  }, {
    key: "renderCloseIcon",
    value: function renderCloseIcon() {
      var _this5 = this;

      if (this.props.showCloseIcon) {
        return /*#__PURE__*/React__default['default'].createElement("button", {
          type: "button",
          ref: function ref(el) {
            return _this5.closeIcon = el;
          },
          className: "p-sidebar-close p-sidebar-icon p-link",
          onClick: this.onCloseClick,
          "aria-label": this.props.ariaCloseLabel
        }, /*#__PURE__*/React__default['default'].createElement("span", {
          className: "p-sidebar-close-icon pi pi-times"
        }), /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderIcons",
    value: function renderIcons() {
      if (this.props.icons) {
        return core.ObjectUtils.getJSXElement(this.props.icons, this.props);
      }

      return null;
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var className = core.classNames('p-sidebar p-component', this.props.className, 'p-sidebar-' + this.props.position, {
        'p-sidebar-active': this.props.visible,
        'p-sidebar-full': this.props.fullScreen
      });
      var closeIcon = this.renderCloseIcon();
      var icons = this.renderIcons();
      var transitionTimeout = {
        enter: this.props.fullScreen ? 400 : 300,
        exit: this.props.fullScreen ? 400 : 300
      };
      return /*#__PURE__*/React__default['default'].createElement(core.CSSTransition, {
        nodeRef: this.sidebarRef,
        classNames: "p-sidebar",
        in: this.props.visible,
        timeout: transitionTimeout,
        options: this.props.transitionOptions,
        unmountOnExit: true,
        onEnter: this.onEnter,
        onEntered: this.onEntered,
        onExit: this.onExit,
        onExited: this.onExited
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        ref: this.sidebarRef,
        id: this.props.id,
        className: className,
        style: this.props.style,
        role: "complementary"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "p-sidebar-header"
      }, icons, closeIcon), /*#__PURE__*/React__default['default'].createElement("div", {
        className: "p-sidebar-content"
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

  return Sidebar;
}(React.Component);

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
  appendTo: null,
  transitionOptions: null,
  onShow: null,
  onHide: null
});

exports.Sidebar = Sidebar;
