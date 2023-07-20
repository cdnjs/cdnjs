this.primevue = this.primevue || {};
this.primevue.dialog = (function (FocusTrap, TimesIcon, WindowMaximizeIcon, WindowMinimizeIcon, Portal, Ripple, utils, vue, BaseComponent, usestyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);
    var TimesIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesIcon);
    var WindowMaximizeIcon__default = /*#__PURE__*/_interopDefaultLegacy(WindowMaximizeIcon);
    var WindowMinimizeIcon__default = /*#__PURE__*/_interopDefaultLegacy(WindowMinimizeIcon);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var styles = "\n.p-dialog-mask {\n    pointer-events: none;\n}\n\n.p-dialog-mask.p-component-overlay {\n    pointer-events: auto;\n}\n\n.p-dialog {\n    pointer-events: auto;\n    max-height: 90%;\n    transform: scale(1);\n}\n\n.p-dialog-content {\n    overflow-y: auto;\n}\n\n.p-dialog-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex-shrink: 0;\n}\n\n.p-dialog-footer {\n    flex-shrink: 0;\n}\n\n.p-dialog .p-dialog-header-icons {\n    display: flex;\n    align-items: center;\n}\n\n.p-dialog .p-dialog-header-icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n/* Fluid */\n.p-fluid .p-dialog-footer .p-button {\n    width: auto;\n}\n\n/* Animation */\n/* Center */\n.p-dialog-enter-active {\n    transition: all 150ms cubic-bezier(0, 0, 0.2, 1);\n}\n.p-dialog-leave-active {\n    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.p-dialog-enter-from,\n.p-dialog-leave-to {\n    opacity: 0;\n    transform: scale(0.7);\n}\n\n/* Top, Bottom, Left, Right, Top* and Bottom* */\n.p-dialog-top .p-dialog,\n.p-dialog-bottom .p-dialog,\n.p-dialog-left .p-dialog,\n.p-dialog-right .p-dialog,\n.p-dialog-topleft .p-dialog,\n.p-dialog-topright .p-dialog,\n.p-dialog-bottomleft .p-dialog,\n.p-dialog-bottomright .p-dialog {\n    margin: 0.75rem;\n    transform: translate3d(0px, 0px, 0px);\n}\n.p-dialog-top .p-dialog-enter-active,\n.p-dialog-top .p-dialog-leave-active,\n.p-dialog-bottom .p-dialog-enter-active,\n.p-dialog-bottom .p-dialog-leave-active,\n.p-dialog-left .p-dialog-enter-active,\n.p-dialog-left .p-dialog-leave-active,\n.p-dialog-right .p-dialog-enter-active,\n.p-dialog-right .p-dialog-leave-active,\n.p-dialog-topleft .p-dialog-enter-active,\n.p-dialog-topleft .p-dialog-leave-active,\n.p-dialog-topright .p-dialog-enter-active,\n.p-dialog-topright .p-dialog-leave-active,\n.p-dialog-bottomleft .p-dialog-enter-active,\n.p-dialog-bottomleft .p-dialog-leave-active,\n.p-dialog-bottomright .p-dialog-enter-active,\n.p-dialog-bottomright .p-dialog-leave-active {\n    transition: all 0.3s ease-out;\n}\n.p-dialog-top .p-dialog-enter-from,\n.p-dialog-top .p-dialog-leave-to {\n    transform: translate3d(0px, -100%, 0px);\n}\n.p-dialog-bottom .p-dialog-enter-from,\n.p-dialog-bottom .p-dialog-leave-to {\n    transform: translate3d(0px, 100%, 0px);\n}\n.p-dialog-left .p-dialog-enter-from,\n.p-dialog-left .p-dialog-leave-to,\n.p-dialog-topleft .p-dialog-enter-from,\n.p-dialog-topleft .p-dialog-leave-to,\n.p-dialog-bottomleft .p-dialog-enter-from,\n.p-dialog-bottomleft .p-dialog-leave-to {\n    transform: translate3d(-100%, 0px, 0px);\n}\n.p-dialog-right .p-dialog-enter-from,\n.p-dialog-right .p-dialog-leave-to,\n.p-dialog-topright .p-dialog-enter-from,\n.p-dialog-topright .p-dialog-leave-to,\n.p-dialog-bottomright .p-dialog-enter-from,\n.p-dialog-bottomright .p-dialog-leave-to {\n    transform: translate3d(100%, 0px, 0px);\n}\n\n/* Maximize */\n.p-dialog-maximized {\n    -webkit-transition: none;\n    transition: none;\n    transform: none;\n    width: 100vw !important;\n    height: 100vh !important;\n    top: 0px !important;\n    left: 0px !important;\n    max-height: 100%;\n    height: 100%;\n}\n.p-dialog-maximized .p-dialog-content {\n    flex-grow: 1;\n}\n\n.p-confirm-dialog .p-dialog-content {\n    display: flex;\n    align-items: center;\n}\n";

    /* Position */
    var inlineStyles = {
      mask: function mask(_ref) {
        var position = _ref.position,
          modal = _ref.modal;
        return {
          position: 'fixed',
          height: '100%',
          width: '100%',
          left: 0,
          top: 0,
          display: 'flex',
          justifyContent: position === 'left' || position === 'topleft' || position === 'bottomleft' ? 'flex-start' : position === 'right' || position === 'topright' || position === 'bottomright' ? 'flex-end' : 'center',
          alignItems: position === 'top' || position === 'topleft' || position === 'topright' ? 'flex-start' : position === 'bottom' || position === 'bottomleft' || position === 'bottomright' ? 'flex-end' : 'center',
          pointerEvents: !modal && 'none'
        };
      },
      root: {
        display: 'flex',
        flexDirection: 'column'
      }
    };
    var classes = {
      mask: function mask(_ref2) {
        var props = _ref2.props;
        var positions = ['left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'];
        var pos = positions.find(function (item) {
          return item === props.position;
        });
        return ['p-dialog-mask', {
          'p-component-overlay p-component-overlay-enter': props.modal
        }, pos ? "p-dialog-".concat(pos) : ''];
      },
      root: function root(_ref3) {
        var props = _ref3.props,
          instance = _ref3.instance;
        return ['p-dialog p-component', {
          'p-dialog-rtl': props.rtl,
          'p-dialog-maximized': props.maximizable && instance.maximized,
          'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      header: 'p-dialog-header',
      headerTitle: 'p-dialog-title',
      headerIcons: 'p-dialog-header-icons',
      maximizableButton: 'p-dialog-header-icon p-dialog-header-maximize p-link',
      maximizableIcon: 'p-dialog-header-maximize-icon',
      closeButton: 'p-dialog-header-icon p-dialog-header-close p-link',
      closeButtonIcon: 'p-dialog-header-close-icon',
      content: 'p-dialog-content',
      footer: 'p-dialog-footer'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'dialog',
        manual: true
      }),
      loadStyle = _useStyle.load;
    var script$1 = {
      name: 'BaseDialog',
      "extends": BaseComponent__default["default"],
      props: {
        header: {
          type: null,
          "default": null
        },
        footer: {
          type: null,
          "default": null
        },
        visible: {
          type: Boolean,
          "default": false
        },
        modal: {
          type: Boolean,
          "default": null
        },
        contentStyle: {
          type: null,
          "default": null
        },
        contentClass: {
          type: String,
          "default": null
        },
        contentProps: {
          type: null,
          "default": null
        },
        rtl: {
          type: Boolean,
          "default": null
        },
        maximizable: {
          type: Boolean,
          "default": false
        },
        dismissableMask: {
          type: Boolean,
          "default": false
        },
        closable: {
          type: Boolean,
          "default": true
        },
        closeOnEscape: {
          type: Boolean,
          "default": true
        },
        showHeader: {
          type: Boolean,
          "default": true
        },
        baseZIndex: {
          type: Number,
          "default": 0
        },
        autoZIndex: {
          type: Boolean,
          "default": true
        },
        position: {
          type: String,
          "default": 'center'
        },
        breakpoints: {
          type: Object,
          "default": null
        },
        draggable: {
          type: Boolean,
          "default": true
        },
        keepInViewport: {
          type: Boolean,
          "default": true
        },
        minX: {
          type: Number,
          "default": 0
        },
        minY: {
          type: Number,
          "default": 0
        },
        appendTo: {
          type: String,
          "default": 'body'
        },
        closeIcon: {
          type: String,
          "default": undefined
        },
        maximizeIcon: {
          type: String,
          "default": undefined
        },
        minimizeIcon: {
          type: String,
          "default": undefined
        },
        closeButtonProps: {
          type: null,
          "default": null
        },
        _instance: null
      },
      css: {
        classes: classes,
        inlineStyles: inlineStyles,
        loadStyle: loadStyle
      },
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'Dialog',
      "extends": script$1,
      inheritAttrs: false,
      emits: ['update:visible', 'show', 'hide', 'after-hide', 'maximize', 'unmaximize', 'dragend'],
      provide: function provide() {
        var _this = this;
        return {
          dialogRef: vue.computed(function () {
            return _this._instance;
          })
        };
      },
      data: function data() {
        return {
          containerVisible: this.visible,
          maximized: false,
          focusableMax: null,
          focusableClose: null
        };
      },
      documentKeydownListener: null,
      container: null,
      mask: null,
      content: null,
      headerContainer: null,
      footerContainer: null,
      maximizableButton: null,
      closeButton: null,
      styleElement: null,
      dragging: null,
      documentDragListener: null,
      documentDragEndListener: null,
      lastPageX: null,
      lastPageY: null,
      updated: function updated() {
        if (this.visible) {
          this.containerVisible = this.visible;
        }
      },
      beforeUnmount: function beforeUnmount() {
        this.unbindDocumentState();
        this.unbindGlobalListeners();
        this.destroyStyle();
        if (this.mask && this.autoZIndex) {
          utils.ZIndexUtils.clear(this.mask);
        }
        this.container = null;
        this.mask = null;
      },
      mounted: function mounted() {
        if (this.breakpoints) {
          this.createStyle();
        }
      },
      methods: {
        close: function close() {
          this.$emit('update:visible', false);
        },
        onBeforeEnter: function onBeforeEnter(el) {
          el.setAttribute(this.attributeSelector, '');
        },
        onEnter: function onEnter() {
          this.$emit('show');
          this.focus();
          this.enableDocumentSettings();
          this.bindGlobalListeners();
          if (this.autoZIndex) {
            utils.ZIndexUtils.set('modal', this.mask, this.baseZIndex + this.$primevue.config.zIndex.modal);
          }
        },
        onBeforeLeave: function onBeforeLeave() {
          if (this.modal) {
            !this.isUnstyled && utils.DomHandler.addClass(this.mask, 'p-component-overlay-leave');
          }
        },
        onLeave: function onLeave() {
          this.$emit('hide');
          this.focusableClose = null;
          this.focusableMax = null;
        },
        onAfterLeave: function onAfterLeave() {
          if (this.autoZIndex) {
            utils.ZIndexUtils.clear(this.mask);
          }
          this.containerVisible = false;
          this.unbindDocumentState();
          this.unbindGlobalListeners();
          this.$emit('after-hide');
        },
        onMaskClick: function onMaskClick(event) {
          if (this.dismissableMask && this.modal && this.mask === event.target) {
            this.close();
          }
        },
        focus: function focus() {
          var findFocusableElement = function findFocusableElement(container) {
            return container.querySelector('[autofocus]');
          };
          var focusTarget = this.$slots.footer && findFocusableElement(this.footerContainer);
          if (!focusTarget) {
            focusTarget = this.$slots.header && findFocusableElement(this.headerContainer);
            if (!focusTarget) {
              focusTarget = this.$slots["default"] && findFocusableElement(this.content);
              if (!focusTarget) {
                if (this.maximizable) {
                  this.focusableMax = true;
                  focusTarget = this.maximizableButton;
                } else {
                  this.focusableClose = true;
                  focusTarget = this.closeButton;
                }
              }
            }
          }
          if (focusTarget) {
            utils.DomHandler.focus(focusTarget);
          }
        },
        maximize: function maximize(event) {
          if (this.maximized) {
            this.maximized = false;
            this.$emit('unmaximize', event);
          } else {
            this.maximized = true;
            this.$emit('maximize', event);
          }
          if (!this.modal) {
            if (this.maximized) {
              utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
            } else {
              utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }
          }
        },
        enableDocumentSettings: function enableDocumentSettings() {
          if (this.modal || this.maximizable && this.maximized) {
            utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
          }
        },
        unbindDocumentState: function unbindDocumentState() {
          if (this.modal || this.maximizable && this.maximized) {
            utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
          }
        },
        onKeyDown: function onKeyDown(event) {
          if (event.code === 'Escape' && this.closeOnEscape) {
            this.close();
          }
        },
        bindDocumentKeyDownListener: function bindDocumentKeyDownListener() {
          if (!this.documentKeydownListener) {
            this.documentKeydownListener = this.onKeyDown.bind(this);
            window.document.addEventListener('keydown', this.documentKeydownListener);
          }
        },
        unbindDocumentKeyDownListener: function unbindDocumentKeyDownListener() {
          if (this.documentKeydownListener) {
            window.document.removeEventListener('keydown', this.documentKeydownListener);
            this.documentKeydownListener = null;
          }
        },
        containerRef: function containerRef(el) {
          this.container = el;
        },
        maskRef: function maskRef(el) {
          this.mask = el;
        },
        contentRef: function contentRef(el) {
          this.content = el;
        },
        headerContainerRef: function headerContainerRef(el) {
          this.headerContainer = el;
        },
        footerContainerRef: function footerContainerRef(el) {
          this.footerContainer = el;
        },
        maximizableRef: function maximizableRef(el) {
          this.maximizableButton = el;
        },
        closeButtonRef: function closeButtonRef(el) {
          this.closeButton = el;
        },
        createStyle: function createStyle() {
          if (!this.styleElement && !this.isUnstyled) {
            this.styleElement = document.createElement('style');
            this.styleElement.type = 'text/css';
            document.head.appendChild(this.styleElement);
            var innerHTML = '';
            for (var breakpoint in this.breakpoints) {
              innerHTML += "\n                        @media screen and (max-width: ".concat(breakpoint, ") {\n                            .p-dialog[").concat(this.attributeSelector, "] {\n                                width: ").concat(this.breakpoints[breakpoint], " !important;\n                            }\n                        }\n                    ");
            }
            this.styleElement.innerHTML = innerHTML;
          }
        },
        destroyStyle: function destroyStyle() {
          if (this.styleElement) {
            document.head.removeChild(this.styleElement);
            this.styleElement = null;
          }
        },
        initDrag: function initDrag(event) {
          if (utils.DomHandler.findSingle(event.target, '[data-pc-section="headeraction"]') || utils.DomHandler.findSingle(event.target.parentElement, '[data-pc-section="headeraction"]')) {
            return;
          }
          if (this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            this.container.style.margin = '0';
            !this.isUnstyled && utils.DomHandler.addClass(document.body, 'p-unselectable-text');
          }
        },
        bindGlobalListeners: function bindGlobalListeners() {
          if (this.draggable) {
            this.bindDocumentDragListener();
            this.bindDocumentDragEndListener();
          }
          if (this.closeOnEscape && this.closable) {
            this.bindDocumentKeyDownListener();
          }
        },
        unbindGlobalListeners: function unbindGlobalListeners() {
          this.unbindDocumentDragListener();
          this.unbindDocumentDragEndListener();
          this.unbindDocumentKeyDownListener();
        },
        bindDocumentDragListener: function bindDocumentDragListener() {
          var _this2 = this;
          this.documentDragListener = function (event) {
            if (_this2.dragging) {
              var width = utils.DomHandler.getOuterWidth(_this2.container);
              var height = utils.DomHandler.getOuterHeight(_this2.container);
              var deltaX = event.pageX - _this2.lastPageX;
              var deltaY = event.pageY - _this2.lastPageY;
              var offset = _this2.container.getBoundingClientRect();
              var leftPos = offset.left + deltaX;
              var topPos = offset.top + deltaY;
              var viewport = utils.DomHandler.getViewport();
              _this2.container.style.position = 'fixed';
              if (_this2.keepInViewport) {
                if (leftPos >= _this2.minX && leftPos + width < viewport.width) {
                  _this2.lastPageX = event.pageX;
                  _this2.container.style.left = leftPos + 'px';
                }
                if (topPos >= _this2.minY && topPos + height < viewport.height) {
                  _this2.lastPageY = event.pageY;
                  _this2.container.style.top = topPos + 'px';
                }
              } else {
                _this2.lastPageX = event.pageX;
                _this2.container.style.left = leftPos + 'px';
                _this2.lastPageY = event.pageY;
                _this2.container.style.top = topPos + 'px';
              }
            }
          };
          window.document.addEventListener('mousemove', this.documentDragListener);
        },
        unbindDocumentDragListener: function unbindDocumentDragListener() {
          if (this.documentDragListener) {
            window.document.removeEventListener('mousemove', this.documentDragListener);
            this.documentDragListener = null;
          }
        },
        bindDocumentDragEndListener: function bindDocumentDragEndListener() {
          var _this3 = this;
          this.documentDragEndListener = function (event) {
            if (_this3.dragging) {
              _this3.dragging = false;
              !_this3.isUnstyled && utils.DomHandler.removeClass(document.body, 'p-unselectable-text');
              _this3.$emit('dragend', event);
            }
          };
          window.document.addEventListener('mouseup', this.documentDragEndListener);
        },
        unbindDocumentDragEndListener: function unbindDocumentDragEndListener() {
          if (this.documentDragEndListener) {
            window.document.removeEventListener('mouseup', this.documentDragEndListener);
            this.documentDragEndListener = null;
          }
        }
      },
      computed: {
        maximizeIconComponent: function maximizeIconComponent() {
          return this.maximized ? this.minimizeIcon ? 'span' : 'WindowMinimizeIcon' : this.maximizeIcon ? 'span' : 'WindowMaximizeIcon';
        },
        ariaId: function ariaId() {
          return utils.UniqueComponentId();
        },
        ariaLabelledById: function ariaLabelledById() {
          return this.header != null || this.$attrs['aria-labelledby'] !== null ? this.ariaId + '_header' : null;
        },
        closeAriaLabel: function closeAriaLabel() {
          return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
        },
        attributeSelector: function attributeSelector() {
          return utils.UniqueComponentId();
        },
        contentStyleClass: function contentStyleClass() {
          return ['p-dialog-content', this.contentClass];
        }
      },
      directives: {
        ripple: Ripple__default["default"],
        focustrap: FocusTrap__default["default"]
      },
      components: {
        Portal: Portal__default["default"],
        WindowMinimizeIcon: WindowMinimizeIcon__default["default"],
        WindowMaximizeIcon: WindowMaximizeIcon__default["default"],
        TimesIcon: TimesIcon__default["default"]
      }
    };

    function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
    function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    var _hoisted_1 = ["aria-labelledby", "aria-modal"];
    var _hoisted_2 = ["id"];
    var _hoisted_3 = ["autofocus", "tabindex"];
    var _hoisted_4 = ["autofocus", "aria-label"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_Portal = vue.resolveComponent("Portal");
      var _directive_ripple = vue.resolveDirective("ripple");
      var _directive_focustrap = vue.resolveDirective("focustrap");
      return vue.openBlock(), vue.createBlock(_component_Portal, {
        appendTo: _ctx.appendTo
      }, {
        "default": vue.withCtx(function () {
          return [$data.containerVisible ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            ref: $options.maskRef,
            "class": _ctx.cx('mask'),
            style: _ctx.sx('mask', true, {
              position: _ctx.position,
              modal: _ctx.modal
            }),
            onClick: _cache[3] || (_cache[3] = function () {
              return $options.onMaskClick && $options.onMaskClick.apply($options, arguments);
            })
          }, _ctx.ptm('mask')), [vue.createVNode(vue.Transition, {
            name: "p-dialog",
            onBeforeEnter: $options.onBeforeEnter,
            onEnter: $options.onEnter,
            onBeforeLeave: $options.onBeforeLeave,
            onLeave: $options.onLeave,
            onAfterLeave: $options.onAfterLeave,
            appear: ""
          }, {
            "default": vue.withCtx(function () {
              return [_ctx.visible ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                ref: $options.containerRef,
                "class": _ctx.cx('root'),
                style: _ctx.sx('root'),
                role: "dialog",
                "aria-labelledby": $options.ariaLabelledById,
                "aria-modal": _ctx.modal
              }, _objectSpread(_objectSpread({}, _ctx.$attrs), _ctx.ptm('root'))), [_ctx.showHeader ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                ref: $options.headerContainerRef,
                "class": _ctx.cx('header'),
                onMousedown: _cache[2] || (_cache[2] = function () {
                  return $options.initDrag && $options.initDrag.apply($options, arguments);
                })
              }, _ctx.ptm('header')), [vue.renderSlot(_ctx.$slots, "header", {}, function () {
                return [_ctx.header ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
                  key: 0,
                  id: $options.ariaLabelledById,
                  "class": _ctx.cx('headerTitle')
                }, _ctx.ptm('headerTitle')), vue.toDisplayString(_ctx.header), 17, _hoisted_2)) : vue.createCommentVNode("", true)];
              }), vue.createElementVNode("div", vue.mergeProps({
                "class": _ctx.cx('headerIcons')
              }, _ctx.ptm('headerIcons')), [_ctx.maximizable ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
                key: 0,
                ref: $options.maximizableRef,
                autofocus: $data.focusableMax,
                "class": _ctx.cx('maximizableButton'),
                onClick: _cache[0] || (_cache[0] = function () {
                  return $options.maximize && $options.maximize.apply($options, arguments);
                }),
                type: "button",
                tabindex: _ctx.maximizable ? '0' : '-1'
              }, _ctx.ptm('maximizableButton'), {
                "data-pc-group-section": "headericon"
              }), [vue.renderSlot(_ctx.$slots, "maximizeicon", {
                maximized: $data.maximized
              }, function () {
                return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.maximizeIconComponent), vue.mergeProps({
                  "class": [_ctx.cx('maximizableIcon'), $data.maximized ? _ctx.minimizeIcon : _ctx.maximizeIcon]
                }, _ctx.ptm('maximizableIcon')), null, 16, ["class"]))];
              })], 16, _hoisted_3)), [[_directive_ripple]]) : vue.createCommentVNode("", true), _ctx.closable ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
                key: 1,
                ref: $options.closeButtonRef,
                autofocus: $data.focusableClose,
                "class": _ctx.cx('closeButton'),
                onClick: _cache[1] || (_cache[1] = function () {
                  return $options.close && $options.close.apply($options, arguments);
                }),
                "aria-label": $options.closeAriaLabel,
                type: "button"
              }, _objectSpread(_objectSpread({}, _ctx.closeButtonProps), _ctx.ptm('closeButton')), {
                "data-pc-group-section": "headericon"
              }), [vue.renderSlot(_ctx.$slots, "closeicon", {}, function () {
                return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.closeIcon ? 'span' : 'TimesIcon'), vue.mergeProps({
                  "class": [_ctx.cx('closeButtonIcon'), _ctx.closeIcon]
                }, _ctx.ptm('closeButtonIcon')), null, 16, ["class"]))];
              })], 16, _hoisted_4)), [[_directive_ripple]]) : vue.createCommentVNode("", true)], 16)], 16)) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
                ref: $options.contentRef,
                "class": [_ctx.cx('content'), _ctx.contentClass],
                style: _ctx.contentStyle
              }, _objectSpread(_objectSpread({}, _ctx.contentProps), _ctx.ptm('content'))), [vue.renderSlot(_ctx.$slots, "default")], 16), _ctx.footer || _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 1,
                ref: $options.footerContainerRef,
                "class": _ctx.cx('footer')
              }, _ctx.ptm('footer')), [vue.renderSlot(_ctx.$slots, "footer", {}, function () {
                return [vue.createTextVNode(vue.toDisplayString(_ctx.footer), 1)];
              })], 16)) : vue.createCommentVNode("", true)], 16, _hoisted_1)), [[_directive_focustrap, {
                disabled: !_ctx.modal
              }]]) : vue.createCommentVNode("", true)];
            }),
            _: 3
          }, 8, ["onBeforeEnter", "onEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])], 16)) : vue.createCommentVNode("", true)];
        }),
        _: 3
      }, 8, ["appendTo"]);
    }

    script.render = render;

    return script;

})(primevue.focustrap, primevue.icons.times, primevue.icons.windowmaximize, primevue.icons.windowminimize, primevue.portal, primevue.ripple, primevue.utils, Vue, primevue.basecomponent, primevue.usestyle);
