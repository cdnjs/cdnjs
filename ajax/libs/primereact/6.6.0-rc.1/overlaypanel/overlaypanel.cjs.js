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
    _this.attributeSelector = core.UniqueComponentId();
    _this.overlayRef = /*#__PURE__*/React__default['default'].createRef();
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
        this.scrollHandler = new core.ConnectedOverlayScrollHandler(this.target, function () {
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
          if (_this4.state.visible && !core.DomHandler.isAndroid()) {
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
      core.OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: this.target
      });
    }
  }, {
    key: "onContentClick",
    value: function onContentClick() {
      this.isPanelClicked = true;
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
          _this6.overlayEventListener = function (e) {
            if (!_this6.isOutsideClicked(e.target)) {
              _this6.isPanelClicked = true;
            }
          };

          core.OverlayService.on('overlay-click', _this6.overlayEventListener);
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
        core.OverlayService.off('overlay-click', _this7.overlayEventListener);
        _this7.overlayEventListener = null;
      });
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      core.ZIndexUtils.set('overlay', this.overlayRef.current);
      this.overlayRef.current.setAttribute(this.attributeSelector, '');
      this.align();
    }
  }, {
    key: "onEntered",
    value: function onEntered() {
      this.bindDocumentClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.props.onShow && this.props.onShow();
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
      core.ZIndexUtils.clear(this.overlayRef.current);
      this.props.onHide && this.props.onHide();
    }
  }, {
    key: "align",
    value: function align() {
      if (this.target) {
        core.DomHandler.absolutePosition(this.overlayRef.current, this.target);
        var containerOffset = core.DomHandler.getOffset(this.overlayRef.current);
        var targetOffset = core.DomHandler.getOffset(this.target);
        var arrowLeft = 0;

        if (containerOffset.left < targetOffset.left) {
          arrowLeft = targetOffset.left - containerOffset.left;
        }

        this.overlayRef.current.style.setProperty('--overlayArrowLeft', "".concat(arrowLeft, "px"));

        if (containerOffset.top < targetOffset.top) {
          core.DomHandler.addClass(this.overlayRef.current, 'p-overlaypanel-flipped');
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

      if (this.overlayEventListener) {
        core.OverlayService.off('overlay-click', this.overlayEventListener);
        this.overlayEventListener = null;
      }

      core.ZIndexUtils.clear(this.overlayRef.current);
    }
  }, {
    key: "renderCloseIcon",
    value: function renderCloseIcon() {
      if (this.props.showCloseIcon) {
        return /*#__PURE__*/React__default['default'].createElement("button", {
          type: "button",
          className: "p-overlaypanel-close p-link",
          onClick: this.onCloseClick,
          "aria-label": this.props.ariaCloseLabel
        }, /*#__PURE__*/React__default['default'].createElement("span", {
          className: "p-overlaypanel-close-icon pi pi-times"
        }), /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var className = core.classNames('p-overlaypanel p-component', this.props.className);
      var closeIcon = this.renderCloseIcon();
      return /*#__PURE__*/React__default['default'].createElement(core.CSSTransition, {
        nodeRef: this.overlayRef,
        classNames: "p-overlaypanel",
        in: this.state.visible,
        timeout: {
          enter: 120,
          exit: 100
        },
        options: this.props.transitionOptions,
        unmountOnExit: true,
        onEnter: this.onEnter,
        onEntered: this.onEntered,
        onExit: this.onExit,
        onExited: this.onExited
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        ref: this.overlayRef,
        id: this.props.id,
        className: className,
        style: this.props.style,
        onClick: this.onPanelClick
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "p-overlaypanel-content",
        onClick: this.onContentClick,
        onMouseDown: this.onContentClick
      }, this.props.children), closeIcon));
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

  return OverlayPanel;
}(React.Component);

_defineProperty(OverlayPanel, "defaultProps", {
  id: null,
  dismissable: true,
  showCloseIcon: false,
  style: null,
  className: null,
  appendTo: null,
  breakpoints: null,
  ariaCloseLabel: 'close',
  transitionOptions: null,
  onShow: null,
  onHide: null
});

exports.OverlayPanel = OverlayPanel;
