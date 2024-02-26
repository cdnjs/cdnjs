import FocusTrap from 'primevue/focustrap';
import TimesIcon from 'primevue/icons/times';
import WindowMaximizeIcon from 'primevue/icons/windowmaximize';
import WindowMinimizeIcon from 'primevue/icons/windowminimize';
import Portal from 'primevue/portal';
import Ripple from 'primevue/ripple';
import { UniqueComponentId, ZIndexUtils, DomHandler } from 'primevue/utils';
import { computed, resolveComponent, resolveDirective, openBlock, createBlock, withCtx, createElementBlock, mergeProps, createVNode, Transition, withDirectives, renderSlot, Fragment, normalizeClass, toDisplayString, createCommentVNode, createElementVNode, resolveDynamicComponent, createTextVNode } from 'vue';
import BaseComponent from 'primevue/basecomponent';
import DialogStyle from 'primevue/dialog/style';

var script$1 = {
  name: 'BaseDialog',
  "extends": BaseComponent,
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
    blockScroll: {
      type: Boolean,
      "default": false
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
      type: [String, Object],
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
  style: DialogStyle,
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
      dialogRef: computed(function () {
        return _this._instance;
      })
    };
  },
  data: function data() {
    return {
      id: this.$attrs.id,
      containerVisible: this.visible,
      maximized: false,
      focusableMax: null,
      focusableClose: null
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    }
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
      ZIndexUtils.clear(this.mask);
    }
    this.container = null;
    this.mask = null;
  },
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
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
        ZIndexUtils.set('modal', this.mask, this.baseZIndex + this.$primevue.config.zIndex.modal);
      }
    },
    onBeforeLeave: function onBeforeLeave() {
      if (this.modal) {
        !this.isUnstyled && DomHandler.addClass(this.mask, 'p-component-overlay-leave');
      }
    },
    onLeave: function onLeave() {
      this.$emit('hide');
      this.focusableClose = null;
      this.focusableMax = null;
    },
    onAfterLeave: function onAfterLeave() {
      if (this.autoZIndex) {
        ZIndexUtils.clear(this.mask);
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
        return container && container.querySelector('[autofocus]');
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
        DomHandler.focus(focusTarget, {
          focusVisible: true
        });
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
        this.maximized ? DomHandler.blockBodyScroll() : DomHandler.unblockBodyScroll();
      }
    },
    enableDocumentSettings: function enableDocumentSettings() {
      if (this.modal || !this.modal && this.blockScroll || this.maximizable && this.maximized) {
        DomHandler.blockBodyScroll();
      }
    },
    unbindDocumentState: function unbindDocumentState() {
      if (this.modal || !this.modal && this.blockScroll || this.maximizable && this.maximized) {
        DomHandler.unblockBodyScroll();
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
        var _this$$primevue;
        this.styleElement = document.createElement('style');
        this.styleElement.type = 'text/css';
        DomHandler.setAttribute(this.styleElement, 'nonce', (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.config) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.csp) === null || _this$$primevue === void 0 ? void 0 : _this$$primevue.nonce);
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
      if (event.target.closest('div').getAttribute('data-pc-section') === 'icons') {
        return;
      }
      if (this.draggable) {
        this.dragging = true;
        this.lastPageX = event.pageX;
        this.lastPageY = event.pageY;
        this.container.style.margin = '0';
        document.body.setAttribute('data-p-unselectable-text', 'true');
        !this.isUnstyled && DomHandler.addClass(document.body, 'p-unselectable-text');
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
          var width = DomHandler.getOuterWidth(_this2.container);
          var height = DomHandler.getOuterHeight(_this2.container);
          var deltaX = event.pageX - _this2.lastPageX;
          var deltaY = event.pageY - _this2.lastPageY;
          var offset = _this2.container.getBoundingClientRect();
          var leftPos = offset.left + deltaX;
          var topPos = offset.top + deltaY;
          var viewport = DomHandler.getViewport();
          var containerComputedStyle = getComputedStyle(_this2.container);
          var marginLeft = parseFloat(containerComputedStyle.marginLeft);
          var marginTop = parseFloat(containerComputedStyle.marginTop);
          _this2.container.style.position = 'fixed';
          if (_this2.keepInViewport) {
            if (leftPos >= _this2.minX && leftPos + width < viewport.width) {
              _this2.lastPageX = event.pageX;
              _this2.container.style.left = leftPos - marginLeft + 'px';
            }
            if (topPos >= _this2.minY && topPos + height < viewport.height) {
              _this2.lastPageY = event.pageY;
              _this2.container.style.top = topPos - marginTop + 'px';
            }
          } else {
            _this2.lastPageX = event.pageX;
            _this2.container.style.left = leftPos - marginLeft + 'px';
            _this2.lastPageY = event.pageY;
            _this2.container.style.top = topPos - marginTop + 'px';
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
          document.body.removeAttribute('data-p-unselectable-text');
          !_this3.isUnstyled && DomHandler.removeClass(document.body, 'p-unselectable-text');
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
    ariaLabelledById: function ariaLabelledById() {
      return this.header != null || this.$attrs['aria-labelledby'] !== null ? this.id + '_header' : null;
    },
    closeAriaLabel: function closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
    },
    attributeSelector: function attributeSelector() {
      return UniqueComponentId();
    }
  },
  directives: {
    ripple: Ripple,
    focustrap: FocusTrap
  },
  components: {
    Portal: Portal,
    WindowMinimizeIcon: WindowMinimizeIcon,
    WindowMaximizeIcon: WindowMaximizeIcon,
    TimesIcon: TimesIcon
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1 = ["aria-labelledby", "aria-modal"];
var _hoisted_2 = ["id"];
var _hoisted_3 = ["autofocus", "tabindex"];
var _hoisted_4 = ["autofocus", "aria-label"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Portal = resolveComponent("Portal");
  var _directive_ripple = resolveDirective("ripple");
  var _directive_focustrap = resolveDirective("focustrap");
  return openBlock(), createBlock(_component_Portal, {
    appendTo: _ctx.appendTo
  }, {
    "default": withCtx(function () {
      return [$data.containerVisible ? (openBlock(), createElementBlock("div", mergeProps({
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
      }, _ctx.ptm('mask')), [createVNode(Transition, mergeProps({
        name: "p-dialog",
        onBeforeEnter: $options.onBeforeEnter,
        onEnter: $options.onEnter,
        onBeforeLeave: $options.onBeforeLeave,
        onLeave: $options.onLeave,
        onAfterLeave: $options.onAfterLeave,
        appear: ""
      }, _ctx.ptm('transition')), {
        "default": withCtx(function () {
          return [_ctx.visible ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.containerRef,
            "class": _ctx.cx('root'),
            style: _ctx.sx('root'),
            role: "dialog",
            "aria-labelledby": $options.ariaLabelledById,
            "aria-modal": _ctx.modal
          }, _ctx.ptmi('root')), [_ctx.$slots.container ? renderSlot(_ctx.$slots, "container", {
            key: 0,
            onClose: $options.close,
            onMaximize: function onMaximize(event) {
              return $options.maximize(event);
            },
            closeCallback: $options.close,
            maximizeCallback: function maximizeCallback(event) {
              return $options.maximize(event);
            }
          }) : (openBlock(), createElementBlock(Fragment, {
            key: 1
          }, [_ctx.showHeader ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.headerContainerRef,
            "class": _ctx.cx('header'),
            onMousedown: _cache[2] || (_cache[2] = function () {
              return $options.initDrag && $options.initDrag.apply($options, arguments);
            })
          }, _ctx.ptm('header')), [renderSlot(_ctx.$slots, "header", {
            "class": normalizeClass(_ctx.cx('title'))
          }, function () {
            return [_ctx.header ? (openBlock(), createElementBlock("span", mergeProps({
              key: 0,
              id: $options.ariaLabelledById,
              "class": _ctx.cx('title')
            }, _ctx.ptm('title')), toDisplayString(_ctx.header), 17, _hoisted_2)) : createCommentVNode("", true)];
          }), createElementVNode("div", mergeProps({
            "class": _ctx.cx('icons')
          }, _ctx.ptm('icons')), [_ctx.maximizable ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
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
          }), [renderSlot(_ctx.$slots, "maximizeicon", {
            maximized: $data.maximized,
            "class": normalizeClass(_ctx.cx('maximizableIcon'))
          }, function () {
            return [(openBlock(), createBlock(resolveDynamicComponent($options.maximizeIconComponent), mergeProps({
              "class": [_ctx.cx('maximizableIcon'), $data.maximized ? _ctx.minimizeIcon : _ctx.maximizeIcon]
            }, _ctx.ptm('maximizableIcon')), null, 16, ["class"]))];
          })], 16, _hoisted_3)), [[_directive_ripple]]) : createCommentVNode("", true), _ctx.closable ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
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
          }), [renderSlot(_ctx.$slots, "closeicon", {
            "class": normalizeClass(_ctx.cx('closeButtonIcon'))
          }, function () {
            return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.closeIcon ? 'span' : 'TimesIcon'), mergeProps({
              "class": [_ctx.cx('closeButtonIcon'), _ctx.closeIcon]
            }, _ctx.ptm('closeButtonIcon')), null, 16, ["class"]))];
          })], 16, _hoisted_4)), [[_directive_ripple]]) : createCommentVNode("", true)], 16)], 16)) : createCommentVNode("", true), createElementVNode("div", mergeProps({
            ref: $options.contentRef,
            "class": [_ctx.cx('content'), _ctx.contentClass],
            style: _ctx.contentStyle
          }, _objectSpread(_objectSpread({}, _ctx.contentProps), _ctx.ptm('content'))), [renderSlot(_ctx.$slots, "default")], 16), _ctx.footer || _ctx.$slots.footer ? (openBlock(), createElementBlock("div", mergeProps({
            key: 1,
            ref: $options.footerContainerRef,
            "class": _ctx.cx('footer')
          }, _ctx.ptm('footer')), [renderSlot(_ctx.$slots, "footer", {}, function () {
            return [createTextVNode(toDisplayString(_ctx.footer), 1)];
          })], 16)) : createCommentVNode("", true)], 64))], 16, _hoisted_1)), [[_directive_focustrap, {
            disabled: !_ctx.modal
          }]]) : createCommentVNode("", true)];
        }),
        _: 3
      }, 16, ["onBeforeEnter", "onEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])], 16)) : createCommentVNode("", true)];
    }),
    _: 3
  }, 8, ["appendTo"]);
}

script.render = render;

export { script as default };
