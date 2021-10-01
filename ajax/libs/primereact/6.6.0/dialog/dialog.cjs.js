'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var core = require('primereact/core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Dialog = /*#__PURE__*/function (_Component) {
  _inherits(Dialog, _Component);

  var _super = _createSuper(Dialog);

  function Dialog(props) {
    var _this;

    _classCallCheck(this, Dialog);

    _this = _super.call(this, props);
    _this.state = {
      id: props.id,
      maskVisible: props.visible,
      visible: false
    };

    if (!_this.props.onMaximize) {
      _this.state.maximized = props.maximized;
    }

    _this.onClose = _this.onClose.bind(_assertThisInitialized(_this));
    _this.toggleMaximize = _this.toggleMaximize.bind(_assertThisInitialized(_this));
    _this.onDragStart = _this.onDragStart.bind(_assertThisInitialized(_this));
    _this.onResizeStart = _this.onResizeStart.bind(_assertThisInitialized(_this));
    _this.onMaskClick = _this.onMaskClick.bind(_assertThisInitialized(_this));
    _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
    _this.onEntered = _this.onEntered.bind(_assertThisInitialized(_this));
    _this.onExited = _this.onExited.bind(_assertThisInitialized(_this));
    _this.attributeSelector = core.UniqueComponentId();
    _this.dialogRef = /*#__PURE__*/React__default['default'].createRef();
    return _this;
  }

  _createClass(Dialog, [{
    key: "onClose",
    value: function onClose(event) {
      this.props.onHide();
      event.preventDefault();
    }
  }, {
    key: "focus",
    value: function focus() {
      var activeElement = document.activeElement;
      var isActiveElementInDialog = activeElement && this.dialogRef && this.dialogRef.current.contains(activeElement);

      if (!isActiveElementInDialog && this.props.closable && this.props.showHeader) {
        this.closeElement.focus();
      }
    }
  }, {
    key: "onMaskClick",
    value: function onMaskClick(event) {
      if (this.props.dismissableMask && this.props.modal && this.mask === event.target) {
        this.onClose(event);
      }

      this.props.onMaskClick && this.props.onMaskClick(event);
    }
  }, {
    key: "toggleMaximize",
    value: function toggleMaximize(event) {
      var maximized = !this.maximized;

      if (this.props.onMaximize) {
        this.props.onMaximize({
          originalEvent: event,
          maximized: maximized
        });
      } else {
        this.setState({
          maximized: maximized
        }, this.changeScrollOnMaximizable);
      }

      event.preventDefault();
    }
  }, {
    key: "onDragStart",
    value: function onDragStart(event) {
      if (core.DomHandler.hasClass(event.target, 'p-dialog-header-icon') || core.DomHandler.hasClass(event.target.parentElement, 'p-dialog-header-icon')) {
        return;
      }

      if (this.props.draggable) {
        this.dragging = true;
        this.lastPageX = event.pageX;
        this.lastPageY = event.pageY;
        this.dialogEl.style.margin = '0';
        core.DomHandler.addClass(document.body, 'p-unselectable-text');

        if (this.props.onDragStart) {
          this.props.onDragStart(event);
        }
      }
    }
  }, {
    key: "onDrag",
    value: function onDrag(event) {
      if (this.dragging) {
        var width = core.DomHandler.getOuterWidth(this.dialogEl);
        var height = core.DomHandler.getOuterHeight(this.dialogEl);
        var deltaX = event.pageX - this.lastPageX;
        var deltaY = event.pageY - this.lastPageY;
        var offset = this.dialogEl.getBoundingClientRect();
        var leftPos = offset.left + deltaX;
        var topPos = offset.top + deltaY;
        var viewport = core.DomHandler.getViewport();
        this.dialogEl.style.position = 'fixed';

        if (this.props.keepInViewport) {
          if (leftPos >= this.props.minX && leftPos + width < viewport.width) {
            this.lastPageX = event.pageX;
            this.dialogEl.style.left = leftPos + 'px';
          }

          if (topPos >= this.props.minY && topPos + height < viewport.height) {
            this.lastPageY = event.pageY;
            this.dialogEl.style.top = topPos + 'px';
          }
        } else {
          this.lastPageX = event.pageX;
          this.dialogEl.style.left = leftPos + 'px';
          this.lastPageY = event.pageY;
          this.dialogEl.style.top = topPos + 'px';
        }

        if (this.props.onDrag) {
          this.props.onDrag(event);
        }
      }
    }
  }, {
    key: "onDragEnd",
    value: function onDragEnd(event) {
      if (this.dragging) {
        this.dragging = false;
        core.DomHandler.removeClass(document.body, 'p-unselectable-text');

        if (this.props.onDragEnd) {
          this.props.onDragEnd(event);
        }
      }
    }
  }, {
    key: "onResizeStart",
    value: function onResizeStart(event) {
      if (this.props.resizable) {
        this.resizing = true;
        this.lastPageX = event.pageX;
        this.lastPageY = event.pageY;
        core.DomHandler.addClass(document.body, 'p-unselectable-text');

        if (this.props.onResizeStart) {
          this.props.onResizeStart(event);
        }
      }
    }
  }, {
    key: "convertToPx",
    value: function convertToPx(value, property, viewport) {
      !viewport && (viewport = core.DomHandler.getViewport());
      var val = parseInt(value);

      if (/^(\d+|(\.\d+))(\.\d+)?%$/.test(value)) {
        return val * (viewport[property] / 100);
      }

      return val;
    }
  }, {
    key: "onResize",
    value: function onResize(event) {
      if (this.resizing) {
        var deltaX = event.pageX - this.lastPageX;
        var deltaY = event.pageY - this.lastPageY;
        var width = core.DomHandler.getOuterWidth(this.dialogEl);
        var height = core.DomHandler.getOuterHeight(this.dialogEl);
        var offset = this.dialogEl.getBoundingClientRect();
        var viewport = core.DomHandler.getViewport();
        var newWidth = width + deltaX;
        var newHeight = height + deltaY;
        var minWidth = this.convertToPx(this.dialogEl.style.minWidth, 'width', viewport);
        var minHeight = this.convertToPx(this.dialogEl.style.minHeight, 'height', viewport);
        var hasBeenDragged = !parseInt(this.dialogEl.style.top) || !parseInt(this.dialogEl.style.left);

        if (hasBeenDragged) {
          newWidth += deltaX;
          newHeight += deltaY;
        }

        if ((!minWidth || newWidth > minWidth) && offset.left + newWidth < viewport.width) {
          this.dialogEl.style.width = newWidth + 'px';
        }

        if ((!minHeight || newHeight > minHeight) && offset.top + newHeight < viewport.height) {
          this.dialogEl.style.height = newHeight + 'px';
        }

        this.lastPageX = event.pageX;
        this.lastPageY = event.pageY;

        if (this.props.onResize) {
          this.props.onResize(event);
        }
      }
    }
  }, {
    key: "onResizeEnd",
    value: function onResizeEnd(event) {
      if (this.resizing) {
        this.resizing = false;
        core.DomHandler.removeClass(document.body, 'p-unselectable-text');

        if (this.props.onResizeEnd) {
          this.props.onResizeEnd(event);
        }
      }
    }
  }, {
    key: "resetPosition",
    value: function resetPosition() {
      this.dialogEl.style.position = '';
      this.dialogEl.style.left = '';
      this.dialogEl.style.top = '';
      this.dialogEl.style.margin = '';
    }
  }, {
    key: "getPositionClass",
    value: function getPositionClass() {
      var _this2 = this;

      var positions = ['center', 'left', 'right', 'top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right'];
      var pos = positions.find(function (item) {
        return item === _this2.props.position || item.replace('-', '') === _this2.props.position;
      });
      return pos ? "p-dialog-".concat(pos) : '';
    }
  }, {
    key: "maximized",
    get: function get() {
      return this.props.onMaximize ? this.props.maximized : this.state.maximized;
    }
  }, {
    key: "dialogEl",
    get: function get() {
      return this.dialogRef.current;
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      this.dialogEl.setAttribute(this.attributeSelector, '');
    }
  }, {
    key: "onEntered",
    value: function onEntered() {
      if (this.props.onShow) {
        this.props.onShow();
      }

      if (this.props.focusOnShow) {
        this.focus();
      }

      this.enableDocumentSettings();
    }
  }, {
    key: "onExited",
    value: function onExited() {
      this.dragging = false;
      core.ZIndexUtils.clear(this.mask);
      this.setState({
        maskVisible: false
      });
      core.DomHandler.addClass(this.mask, 'p-component-overlay-leave');
      this.disableDocumentSettings();
    }
  }, {
    key: "enableDocumentSettings",
    value: function enableDocumentSettings() {
      this.bindGlobalListeners();

      if (this.props.blockScroll || this.props.maximizable && this.maximized) {
        core.DomHandler.addClass(document.body, 'p-overflow-hidden');
      }
    }
  }, {
    key: "disableDocumentSettings",
    value: function disableDocumentSettings() {
      this.unbindGlobalListeners();

      if (this.props.modal) {
        var hasBlockScroll = document.primeDialogParams && document.primeDialogParams.some(function (param) {
          return param.hasBlockScroll;
        });

        if (!hasBlockScroll) {
          core.DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }
      } else if (this.props.blockScroll || this.props.maximizable && this.maximized) {
        core.DomHandler.removeClass(document.body, 'p-overflow-hidden');
      }
    }
  }, {
    key: "bindGlobalListeners",
    value: function bindGlobalListeners() {
      if (this.props.draggable) {
        this.bindDocumentDragListener();
      }

      if (this.props.resizable) {
        this.bindDocumentResizeListeners();
      }

      if (this.props.closeOnEscape && this.props.closable) {
        this.bindDocumentKeyDownListener();
      }
    }
  }, {
    key: "unbindGlobalListeners",
    value: function unbindGlobalListeners() {
      this.unbindDocumentDragListener();
      this.unbindDocumentResizeListeners();
      this.unbindDocumentKeyDownListener();
    }
  }, {
    key: "bindDocumentDragListener",
    value: function bindDocumentDragListener() {
      this.documentDragListener = this.onDrag.bind(this);
      this.documentDragEndListener = this.onDragEnd.bind(this);
      window.document.addEventListener('mousemove', this.documentDragListener);
      window.document.addEventListener('mouseup', this.documentDragEndListener);
    }
  }, {
    key: "unbindDocumentDragListener",
    value: function unbindDocumentDragListener() {
      if (this.documentDragListener && this.documentDragEndListener) {
        window.document.removeEventListener('mousemove', this.documentDragListener);
        window.document.removeEventListener('mouseup', this.documentDragEndListener);
        this.documentDragListener = null;
        this.documentDragEndListener = null;
      }
    }
  }, {
    key: "bindDocumentResizeListeners",
    value: function bindDocumentResizeListeners() {
      this.documentResizeListener = this.onResize.bind(this);
      this.documentResizeEndListener = this.onResizeEnd.bind(this);
      window.document.addEventListener('mousemove', this.documentResizeListener);
      window.document.addEventListener('mouseup', this.documentResizeEndListener);
    }
  }, {
    key: "unbindDocumentResizeListeners",
    value: function unbindDocumentResizeListeners() {
      if (this.documentResizeListener && this.documentResizeEndListener) {
        window.document.removeEventListener('mousemove', this.documentResizeListener);
        window.document.removeEventListener('mouseup', this.documentResizeEndListener);
        this.documentResizeListener = null;
        this.documentResizeEndListener = null;
      }
    }
  }, {
    key: "bindDocumentKeyDownListener",
    value: function bindDocumentKeyDownListener() {
      var _this3 = this;

      this.documentKeyDownListener = function (event) {
        var currentTarget = event.currentTarget;

        if (currentTarget && currentTarget.primeDialogParams) {
          var params = currentTarget.primeDialogParams;
          var paramLength = params.length;
          var dialogId = params[paramLength - 1] ? params[paramLength - 1].id : undefined;

          if (dialogId === _this3.state.id) {
            var dialog = document.getElementById(dialogId);

            if (event.which === 27) {
              _this3.onClose(event);

              event.stopImmediatePropagation();
              params.splice(paramLength - 1, 1);
            } else if (event.which === 9) {
              event.preventDefault();
              var focusableElements = core.DomHandler.getFocusableElements(dialog);

              if (focusableElements && focusableElements.length > 0) {
                if (!document.activeElement) {
                  focusableElements[0].focus();
                } else {
                  var focusedIndex = focusableElements.indexOf(document.activeElement);

                  if (event.shiftKey) {
                    if (focusedIndex === -1 || focusedIndex === 0) focusableElements[focusableElements.length - 1].focus();else focusableElements[focusedIndex - 1].focus();
                  } else {
                    if (focusedIndex === -1 || focusedIndex === focusableElements.length - 1) focusableElements[0].focus();else focusableElements[focusedIndex + 1].focus();
                  }
                }
              }
            }
          }
        }
      };

      var newParam = {
        id: this.state.id,
        hasBlockScroll: this.props.blockScroll
      };
      document.primeDialogParams = document.primeDialogParams ? [].concat(_toConsumableArray(document.primeDialogParams), [newParam]) : [newParam];
      document.addEventListener('keydown', this.documentKeyDownListener);
    }
  }, {
    key: "unbindDocumentKeyDownListener",
    value: function unbindDocumentKeyDownListener() {
      var _this4 = this;

      if (this.documentKeyDownListener) {
        document.removeEventListener('keydown', this.documentKeyDownListener);
        document.primeDialogParams = document.primeDialogParams && document.primeDialogParams.filter(function (param) {
          return param.id !== _this4.state.id;
        });
        this.documentKeyDownListener = null;
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
          innerHTML += "\n                    @media screen and (max-width: ".concat(breakpoint, ") {\n                        .p-dialog[").concat(this.attributeSelector, "] {\n                            width: ").concat(this.props.breakpoints[breakpoint], " !important;\n                        }\n                    }\n                ");
        }

        this.styleElement.innerHTML = innerHTML;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this5 = this;

      if (!this.state.id) {
        this.setState({
          id: core.UniqueComponentId()
        });
      }

      if (this.props.visible) {
        this.setState({
          visible: true
        }, function () {
          core.ZIndexUtils.set('modal', _this5.mask, _this5.props.baseZIndex);
        });
      }

      if (this.props.breakpoints) {
        this.createStyle();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this6 = this;

      if (this.props.visible && !this.state.maskVisible) {
        this.setState({
          maskVisible: true
        }, function () {
          core.ZIndexUtils.set('modal', _this6.mask, _this6.props.baseZIndex);
        });
      }

      if (this.props.visible !== this.state.visible && this.state.maskVisible) {
        this.setState({
          visible: this.props.visible
        });
      }

      if (prevProps.maximized !== this.props.maximized && this.props.onMaximize) {
        this.changeScrollOnMaximizable();
      }
    }
  }, {
    key: "changeScrollOnMaximizable",
    value: function changeScrollOnMaximizable() {
      if (!this.props.blockScroll) {
        var funcName = this.maximized ? 'addClass' : 'removeClass';
        core.DomHandler[funcName](document.body, 'p-overflow-hidden');
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.disableDocumentSettings();

      if (this.styleElement) {
        document.head.removeChild(this.styleElement);
        this.styleElement = null;
      }

      core.ZIndexUtils.clear(this.mask);
    }
  }, {
    key: "renderCloseIcon",
    value: function renderCloseIcon() {
      var _this7 = this;

      if (this.props.closable) {
        return /*#__PURE__*/React__default['default'].createElement("button", {
          ref: function ref(el) {
            return _this7.closeElement = el;
          },
          type: "button",
          className: "p-dialog-header-icon p-dialog-header-close p-link",
          "aria-label": this.props.ariaCloseIconLabel,
          onClick: this.onClose
        }, /*#__PURE__*/React__default['default'].createElement("span", {
          className: "p-dialog-header-close-icon pi pi-times"
        }), /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderMaximizeIcon",
    value: function renderMaximizeIcon() {
      var iconClassName = core.classNames('p-dialog-header-maximize-icon pi', {
        'pi-window-maximize': !this.maximized,
        'pi-window-minimize': this.maximized
      });

      if (this.props.maximizable) {
        return /*#__PURE__*/React__default['default'].createElement("button", {
          type: "button",
          className: "p-dialog-header-icon p-dialog-header-maximize p-link",
          onClick: this.toggleMaximize
        }, /*#__PURE__*/React__default['default'].createElement("span", {
          className: iconClassName
        }), /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      var _this8 = this;

      if (this.props.showHeader) {
        var closeIcon = this.renderCloseIcon();
        var maximizeIcon = this.renderMaximizeIcon();
        var icons = core.ObjectUtils.getJSXElement(this.props.icons, this.props);
        var header = core.ObjectUtils.getJSXElement(this.props.header, this.props);
        return /*#__PURE__*/React__default['default'].createElement("div", {
          ref: function ref(el) {
            return _this8.headerEl = el;
          },
          className: "p-dialog-header",
          onMouseDown: this.onDragStart
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          id: this.state.id + '_header',
          className: "p-dialog-title"
        }, header), /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-dialog-header-icons"
        }, icons, maximizeIcon, closeIcon));
      }

      return null;
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this9 = this;

      var contentClassName = core.classNames('p-dialog-content', this.props.contentClassName);
      return /*#__PURE__*/React__default['default'].createElement("div", {
        id: this.state.id + '_content',
        ref: function ref(el) {
          return _this9.contentEl = el;
        },
        className: contentClassName,
        style: this.props.contentStyle
      }, this.props.children);
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var _this10 = this;

      var footer = core.ObjectUtils.getJSXElement(this.props.footer, this.props);
      return footer && /*#__PURE__*/React__default['default'].createElement("div", {
        ref: function ref(el) {
          return _this10.footerElement = el;
        },
        className: "p-dialog-footer"
      }, footer);
    }
  }, {
    key: "renderResizer",
    value: function renderResizer() {
      if (this.props.resizable) {
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-resizable-handle",
          style: {
            zIndex: 90
          },
          onMouseDown: this.onResizeStart
        });
      }

      return null;
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var _this11 = this;

      var className = core.classNames('p-dialog p-component', this.props.className, {
        'p-dialog-rtl': this.props.rtl,
        'p-dialog-maximized': this.maximized
      });
      var maskClassName = core.classNames('p-dialog-mask', {
        'p-component-overlay p-component-overlay-enter': this.props.modal,
        'p-dialog-visible': this.state.maskVisible,
        'p-dialog-draggable': this.props.draggable,
        'p-dialog-resizable': this.props.resizable
      }, this.props.maskClassName, this.getPositionClass());
      var header = this.renderHeader();
      var content = this.renderContent();
      var footer = this.renderFooter();
      var resizer = this.renderResizer();
      var transitionTimeout = {
        enter: this.props.position === 'center' ? 150 : 300,
        exit: this.props.position === 'center' ? 150 : 300
      };
      return /*#__PURE__*/React__default['default'].createElement("div", {
        ref: function ref(el) {
          return _this11.mask = el;
        },
        className: maskClassName,
        onClick: this.onMaskClick
      }, /*#__PURE__*/React__default['default'].createElement(core.CSSTransition, {
        nodeRef: this.dialogRef,
        classNames: "p-dialog",
        timeout: transitionTimeout,
        in: this.state.visible,
        options: this.props.transitionOptions,
        unmountOnExit: true,
        onEnter: this.onEnter,
        onEntered: this.onEntered,
        onExited: this.onExited
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        ref: this.dialogRef,
        id: this.state.id,
        className: className,
        style: this.props.style,
        onClick: this.props.onClick,
        role: "dialog",
        "aria-labelledby": this.state.id + '_header',
        "aria-describedby": this.state.id + '_content',
        "aria-modal": this.props.modal
      }, header, content, footer, resizer)));
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.maskVisible) {
        var element = this.renderElement();
        return /*#__PURE__*/React__default['default'].createElement(core.Portal, {
          element: element,
          appendTo: this.props.appendTo,
          visible: true
        });
      }

      return null;
    }
  }]);

  return Dialog;
}(React.Component);

_defineProperty(Dialog, "defaultProps", {
  id: null,
  header: null,
  footer: null,
  visible: false,
  position: 'center',
  draggable: true,
  resizable: true,
  modal: true,
  onHide: null,
  onShow: null,
  contentStyle: null,
  contentClassName: null,
  closeOnEscape: true,
  dismissableMask: false,
  rtl: false,
  closable: true,
  style: null,
  className: null,
  maskClassName: null,
  showHeader: true,
  appendTo: null,
  baseZIndex: 0,
  maximizable: false,
  blockScroll: false,
  icons: null,
  ariaCloseIconLabel: 'Close',
  focusOnShow: true,
  minX: 0,
  minY: 0,
  keepInViewport: true,
  maximized: false,
  breakpoints: null,
  transitionOptions: null,
  onMaximize: null,
  onDragStart: null,
  onDrag: null,
  onDragEnd: null,
  onResizeStart: null,
  onResize: null,
  onResizeEnd: null,
  onClick: null,
  onMaskClick: null
});

exports.Dialog = Dialog;
