"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialog = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _ClassNames = require("../utils/ClassNames");

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _reactTransitionGroup = require("react-transition-group");

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _Ripple = require("../ripple/Ripple");

var _Portal = require("../portal/Portal");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var Dialog = /*#__PURE__*/function (_Component) {
  _inherits(Dialog, _Component);

  var _super = _createSuper(Dialog);

  function Dialog(props) {
    var _this;

    _classCallCheck(this, Dialog);

    _this = _super.call(this, props);
    _this.state = {
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
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    _this.attributeSelector = (0, _UniqueComponentId.default)();
    _this.dialogRef = /*#__PURE__*/_react.default.createRef();
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

      if (!isActiveElementInDialog && this.props.closable) {
        this.closeElement.focus();
      }
    }
  }, {
    key: "onMaskClick",
    value: function onMaskClick(event) {
      if (this.props.dismissableMask && this.props.modal && this.mask === event.target) {
        this.onClose(event);
      }
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
      if (_DomHandler.default.hasClass(event.target, 'p-dialog-header-icon') || _DomHandler.default.hasClass(event.target.parentElement, 'p-dialog-header-icon')) {
        return;
      }

      if (this.props.draggable) {
        this.dragging = true;
        this.lastPageX = event.pageX;
        this.lastPageY = event.pageY;
        this.dialogEl.style.margin = '0';

        _DomHandler.default.addClass(document.body, 'p-unselectable-text');

        if (this.props.onDragStart) {
          this.props.onDragStart(event);
        }
      }
    }
  }, {
    key: "onDrag",
    value: function onDrag(event) {
      if (this.dragging) {
        var width = _DomHandler.default.getOuterWidth(this.dialogEl);

        var height = _DomHandler.default.getOuterHeight(this.dialogEl);

        var deltaX = event.pageX - this.lastPageX;
        var deltaY = event.pageY - this.lastPageY;

        var offset = _DomHandler.default.getOffset(this.dialogEl);

        var leftPos = offset.left - _DomHandler.default.getWindowScrollLeft() + deltaX;
        var topPos = offset.top - _DomHandler.default.getWindowScrollTop() + deltaY;

        var viewport = _DomHandler.default.getViewport();

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

        _DomHandler.default.removeClass(document.body, 'p-unselectable-text');

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

        _DomHandler.default.addClass(document.body, 'p-unselectable-text');

        if (this.props.onResizeStart) {
          this.props.onResizeStart(event);
        }
      }
    }
  }, {
    key: "onResize",
    value: function onResize(event) {
      if (this.resizing) {
        var deltaX = event.pageX - this.lastPageX;
        var deltaY = event.pageY - this.lastPageY;

        var width = _DomHandler.default.getOuterWidth(this.dialogEl);

        var height = _DomHandler.default.getOuterHeight(this.dialogEl);

        var contentHeight = _DomHandler.default.getOuterHeight(this.contentEl);

        var newWidth = width + deltaX;
        var newHeight = height + deltaY;
        var minWidth = this.dialogEl.style.minWidth;
        var minHeight = this.dialogEl.style.minHeight;

        var offset = _DomHandler.default.getOffset(this.dialogEl);

        var viewport = _DomHandler.default.getViewport();

        var hasBeenDragged = !parseInt(this.dialogEl.style.top) || !parseInt(this.dialogEl.style.left);

        if (hasBeenDragged) {
          newWidth += deltaX;
          newHeight += deltaY;
        }

        if ((!minWidth || newWidth > parseInt(minWidth)) && offset.left + newWidth < viewport.width) {
          this.dialogEl.style.width = newWidth + 'px';
        }

        if ((!minHeight || newHeight > parseInt(minHeight)) && offset.top + newHeight < viewport.height) {
          this.contentEl.style.height = contentHeight + newHeight - height + 'px';
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

        _DomHandler.default.removeClass(document.body, 'p-unselectable-text');

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
    key: "zIndex",
    get: function get() {
      return this.props.baseZIndex + _DomHandler.default.generateZIndex();
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
      this.setState({
        maskVisible: false
      }, function () {
        _DomHandler.default.revertZIndex();
      });
      this.disableDocumentSettings();
    }
  }, {
    key: "enableDocumentSettings",
    value: function enableDocumentSettings() {
      this.bindGlobalListeners();

      if (this.props.blockScroll || this.props.maximizable && this.maximized) {
        _DomHandler.default.addClass(document.body, 'p-overflow-hidden');
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
          _DomHandler.default.removeClass(document.body, 'p-overflow-hidden');
        }
      } else if (this.props.blockScroll || this.props.maximizable && this.maximized) {
        _DomHandler.default.removeClass(document.body, 'p-overflow-hidden');
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
          var dialogId = params[paramLength - 1].id;

          if (dialogId === _this3.id) {
            var dialog = document.getElementById(dialogId);

            if (event.which === 27) {
              _this3.onClose(event);

              event.stopImmediatePropagation();
              params.splice(paramLength - 1, 1);
            } else if (event.which === 9) {
              event.preventDefault();

              var focusableElements = _DomHandler.default.getFocusableElements(dialog);

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
        id: this.id,
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
          return param.id !== _this4.id;
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

      if (this.props.visible) {
        this.setState({
          visible: true
        }, function () {
          _this5.mask.style.zIndex = String(_this5.zIndex);
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
          _this6.mask.style.zIndex = String(_this6.zIndex);
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

        _DomHandler.default[funcName](document.body, 'p-overflow-hidden');
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

      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "renderCloseIcon",
    value: function renderCloseIcon() {
      var _this7 = this;

      if (this.props.closable) {
        return /*#__PURE__*/_react.default.createElement("button", {
          ref: function ref(el) {
            return _this7.closeElement = el;
          },
          type: "button",
          className: "p-dialog-header-icon p-dialog-header-close p-link",
          "aria-label": this.props.ariaCloseIconLabel,
          onClick: this.onClose
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "p-dialog-header-close-icon pi pi-times"
        }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderMaximizeIcon",
    value: function renderMaximizeIcon() {
      var iconClassName = (0, _ClassNames.classNames)('p-dialog-header-maximize-icon pi', {
        'pi-window-maximize': !this.maximized,
        'pi-window-minimize': this.maximized
      });

      if (this.props.maximizable) {
        return /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          className: "p-dialog-header-icon p-dialog-header-maximize p-link",
          onClick: this.toggleMaximize
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: iconClassName
        }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
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

        var icons = _ObjectUtils.default.getJSXElement(this.props.icons, this.props);

        var header = _ObjectUtils.default.getJSXElement(this.props.header, this.props);

        return /*#__PURE__*/_react.default.createElement("div", {
          ref: function ref(el) {
            return _this8.headerEl = el;
          },
          className: "p-dialog-header",
          onMouseDown: this.onDragStart
        }, /*#__PURE__*/_react.default.createElement("span", {
          id: this.id + '_header',
          className: "p-dialog-title"
        }, header), /*#__PURE__*/_react.default.createElement("div", {
          className: "p-dialog-header-icons"
        }, icons, maximizeIcon, closeIcon));
      }

      return null;
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this9 = this;

      var contentClassName = (0, _ClassNames.classNames)('p-dialog-content', this.props.contentClassName);
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.id + '_content',
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

      var footer = _ObjectUtils.default.getJSXElement(this.props.footer, this.props);

      return footer && /*#__PURE__*/_react.default.createElement("div", {
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
        return /*#__PURE__*/_react.default.createElement("div", {
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

      var className = (0, _ClassNames.classNames)('p-dialog p-component', this.props.className, {
        'p-dialog-rtl': this.props.rtl,
        'p-dialog-maximized': this.maximized
      });
      var maskClassName = (0, _ClassNames.classNames)('p-dialog-mask', {
        'p-component-overlay': this.props.modal,
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
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this11.mask = el;
        },
        className: maskClassName,
        onClick: this.onMaskClick
      }, /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.CSSTransition, {
        nodeRef: this.dialogRef,
        classNames: "p-dialog",
        timeout: transitionTimeout,
        in: this.state.visible,
        unmountOnExit: true,
        onEnter: this.onEnter,
        onEntered: this.onEntered,
        onExited: this.onExited
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: this.dialogRef,
        id: this.id,
        className: className,
        style: this.props.style,
        role: "dialog",
        "aria-labelledby": this.id + '_header',
        "aria-describedby": this.id + '_content',
        "aria-modal": this.props.modal
      }, header, content, footer, resizer)));
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.maskVisible) {
        var element = this.renderElement();
        return /*#__PURE__*/_react.default.createElement(_Portal.Portal, {
          element: element,
          appendTo: this.props.appendTo,
          visible: true
        });
      }

      return null;
    }
  }]);

  return Dialog;
}(_react.Component);

exports.Dialog = Dialog;

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
  onMaximize: null,
  onDragStart: null,
  onDrag: null,
  onDragEnd: null,
  onResizeStart: null,
  onResize: null,
  onResizeEnd: null
});

_defineProperty(Dialog, "propTypes", {
  id: _propTypes.default.string,
  header: _propTypes.default.any,
  footer: _propTypes.default.any,
  visible: _propTypes.default.bool,
  position: _propTypes.default.string,
  draggable: _propTypes.default.bool,
  resizable: _propTypes.default.bool,
  modal: _propTypes.default.bool,
  onHide: _propTypes.default.func.isRequired,
  onShow: _propTypes.default.func,
  contentStyle: _propTypes.default.object,
  contentClassName: _propTypes.default.string,
  closeOnEscape: _propTypes.default.bool,
  dismissableMask: _propTypes.default.bool,
  rtl: _propTypes.default.bool,
  closable: _propTypes.default.bool,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  maskClassName: _propTypes.default.string,
  showHeader: _propTypes.default.bool,
  appendTo: _propTypes.default.object,
  baseZIndex: _propTypes.default.number,
  maximizable: _propTypes.default.bool,
  blockScroll: _propTypes.default.bool,
  icons: _propTypes.default.any,
  ariaCloseIconLabel: _propTypes.default.string,
  focusOnShow: _propTypes.default.bool,
  minX: _propTypes.default.number,
  minY: _propTypes.default.number,
  keepInViewport: _propTypes.default.bool,
  maximized: _propTypes.default.bool,
  breakpoints: _propTypes.default.object,
  onMaximize: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onDrag: _propTypes.default.func,
  onDragEnd: _propTypes.default.func,
  onResizeStart: _propTypes.default.func,
  onResize: _propTypes.default.func,
  onResizeEnd: _propTypes.default.func
});