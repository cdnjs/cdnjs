import FocusTrap from 'primevue/focustrap';
import TimesIcon from 'primevue/icons/times';
import OverlayEventBus from 'primevue/overlayeventbus';
import Portal from 'primevue/portal';
import Ripple from 'primevue/ripple';
import { ZIndexUtils, DomHandler, ConnectedOverlayScrollHandler, UniqueComponentId } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import OverlayPanelStyle from 'primevue/overlaypanel/style';
import { resolveComponent, resolveDirective, openBlock, createBlock, withCtx, createVNode, Transition, mergeProps, withDirectives, createElementBlock, renderSlot, Fragment, createElementVNode, resolveDynamicComponent, createCommentVNode } from 'vue';

var script$1 = {
  name: 'BaseOverlayPanel',
  "extends": BaseComponent,
  props: {
    dismissable: {
      type: Boolean,
      "default": true
    },
    showCloseIcon: {
      type: Boolean,
      "default": false
    },
    appendTo: {
      type: [String, Object],
      "default": 'body'
    },
    baseZIndex: {
      type: Number,
      "default": 0
    },
    autoZIndex: {
      type: Boolean,
      "default": true
    },
    breakpoints: {
      type: Object,
      "default": null
    },
    closeIcon: {
      type: String,
      "default": undefined
    },
    closeOnEscape: {
      type: Boolean,
      "default": true
    }
  },
  style: OverlayPanelStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'OverlayPanel',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['show', 'hide'],
  data: function data() {
    return {
      visible: false
    };
  },
  watch: {
    dismissable: {
      immediate: true,
      handler: function handler(newValue) {
        if (newValue) {
          this.bindOutsideClickListener();
        } else {
          this.unbindOutsideClickListener();
        }
      }
    }
  },
  selfClick: false,
  target: null,
  eventTarget: null,
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  container: null,
  styleElement: null,
  overlayEventListener: null,
  documentKeydownListener: null,
  beforeUnmount: function beforeUnmount() {
    if (this.dismissable) {
      this.unbindOutsideClickListener();
    }
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    this.destroyStyle();
    this.unbindResizeListener();
    this.target = null;
    if (this.container && this.autoZIndex) {
      ZIndexUtils.clear(this.container);
    }
    if (this.overlayEventListener) {
      OverlayEventBus.off('overlay-click', this.overlayEventListener);
      this.overlayEventListener = null;
    }
    this.container = null;
  },
  mounted: function mounted() {
    if (this.breakpoints) {
      this.createStyle();
    }
  },
  methods: {
    toggle: function toggle(event, target) {
      if (this.visible) this.hide();else this.show(event, target);
    },
    show: function show(event, target) {
      this.visible = true;
      this.eventTarget = event.currentTarget;
      this.target = target || event.currentTarget;
    },
    hide: function hide() {
      this.visible = false;
    },
    onContentClick: function onContentClick() {
      this.selfClick = true;
    },
    onEnter: function onEnter(el) {
      var _this = this;
      this.container.setAttribute(this.attributeSelector, '');
      DomHandler.addStyles(el, {
        position: 'absolute',
        top: '0',
        left: '0'
      });
      this.alignOverlay();
      if (this.dismissable) {
        this.bindOutsideClickListener();
      }
      this.bindScrollListener();
      this.bindResizeListener();
      if (this.autoZIndex) {
        ZIndexUtils.set('overlay', el, this.baseZIndex + this.$primevue.config.zIndex.overlay);
      }
      this.overlayEventListener = function (e) {
        if (_this.container.contains(e.target)) {
          _this.selfClick = true;
        }
      };
      this.focus();
      OverlayEventBus.on('overlay-click', this.overlayEventListener);
      this.$emit('show');
      if (this.closeOnEscape) {
        this.bindDocumentKeyDownListener();
      }
    },
    onLeave: function onLeave() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.unbindDocumentKeyDownListener();
      OverlayEventBus.off('overlay-click', this.overlayEventListener);
      this.overlayEventListener = null;
      this.$emit('hide');
    },
    onAfterLeave: function onAfterLeave(el) {
      if (this.autoZIndex) {
        ZIndexUtils.clear(el);
      }
    },
    alignOverlay: function alignOverlay() {
      DomHandler.absolutePosition(this.container, this.target, false);
      var containerOffset = DomHandler.getOffset(this.container);
      var targetOffset = DomHandler.getOffset(this.target);
      var arrowLeft = 0;
      if (containerOffset.left < targetOffset.left) {
        arrowLeft = targetOffset.left - containerOffset.left;
      }
      this.container.style.setProperty('--overlayArrowLeft', "".concat(arrowLeft, "px"));
      if (containerOffset.top < targetOffset.top) {
        this.container.setAttribute('data-p-overlaypanel-flipped', 'true');
        !this.isUnstyled && DomHandler.addClass(this.container, 'p-overlaypanel-flipped');
      }
    },
    onContentKeydown: function onContentKeydown(event) {
      if (event.code === 'Escape' && this.closeOnEscape) {
        this.hide();
        DomHandler.focus(this.target);
      }
    },
    onButtonKeydown: function onButtonKeydown(event) {
      switch (event.code) {
        case 'ArrowDown':
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowRight':
          event.preventDefault();
      }
    },
    focus: function focus() {
      var focusTarget = this.container.querySelector('[autofocus]');
      if (focusTarget) {
        focusTarget.focus();
      }
    },
    onKeyDown: function onKeyDown(event) {
      if (event.code === 'Escape' && this.closeOnEscape) {
        this.visible = false;
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
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this2 = this;
      if (!this.outsideClickListener && DomHandler.isClient()) {
        this.outsideClickListener = function (event) {
          if (_this2.visible && !_this2.selfClick && !_this2.isTargetClicked(event)) {
            _this2.visible = false;
          }
          _this2.selfClick = false;
        };
        document.addEventListener('click', this.outsideClickListener);
      }
    },
    unbindOutsideClickListener: function unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener('click', this.outsideClickListener);
        this.outsideClickListener = null;
        this.selfClick = false;
      }
    },
    bindScrollListener: function bindScrollListener() {
      var _this3 = this;
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, function () {
          if (_this3.visible) {
            _this3.visible = false;
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener: function bindResizeListener() {
      var _this4 = this;
      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this4.visible && !DomHandler.isTouchDevice()) {
            _this4.visible = false;
          }
        };
        window.addEventListener('resize', this.resizeListener);
      }
    },
    unbindResizeListener: function unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
        this.resizeListener = null;
      }
    },
    isTargetClicked: function isTargetClicked(event) {
      return this.eventTarget && (this.eventTarget === event.target || this.eventTarget.contains(event.target));
    },
    containerRef: function containerRef(el) {
      this.container = el;
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
          innerHTML += "\n                        @media screen and (max-width: ".concat(breakpoint, ") {\n                            .p-overlaypanel[").concat(this.attributeSelector, "] {\n                                width: ").concat(this.breakpoints[breakpoint], " !important;\n                            }\n                        }\n                    ");
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
    onOverlayClick: function onOverlayClick(event) {
      OverlayEventBus.emit('overlay-click', {
        originalEvent: event,
        target: this.target
      });
    }
  },
  computed: {
    attributeSelector: function attributeSelector() {
      return UniqueComponentId();
    },
    closeAriaLabel: function closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
    }
  },
  directives: {
    focustrap: FocusTrap,
    ripple: Ripple
  },
  components: {
    Portal: Portal,
    TimesIcon: TimesIcon
  }
};

var _hoisted_1 = ["aria-modal"];
var _hoisted_2 = ["aria-label"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Portal = resolveComponent("Portal");
  var _directive_ripple = resolveDirective("ripple");
  var _directive_focustrap = resolveDirective("focustrap");
  return openBlock(), createBlock(_component_Portal, {
    appendTo: _ctx.appendTo
  }, {
    "default": withCtx(function () {
      return [createVNode(Transition, mergeProps({
        name: "p-overlaypanel",
        onEnter: $options.onEnter,
        onLeave: $options.onLeave,
        onAfterLeave: $options.onAfterLeave
      }, _ctx.ptm('transition')), {
        "default": withCtx(function () {
          return [$data.visible ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.containerRef,
            role: "dialog",
            "aria-modal": $data.visible,
            onClick: _cache[5] || (_cache[5] = function () {
              return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
            }),
            "class": _ctx.cx('root')
          }, _ctx.ptmi('root')), [_ctx.$slots.container ? renderSlot(_ctx.$slots, "container", {
            key: 0,
            onClose: $options.hide,
            onKeydown: function onKeydown(event) {
              return $options.onButtonKeydown(event);
            },
            closeCallback: $options.hide,
            keydownCallback: function keydownCallback(event) {
              return $options.onButtonKeydown(event);
            }
          }) : (openBlock(), createElementBlock(Fragment, {
            key: 1
          }, [createElementVNode("div", mergeProps({
            "class": _ctx.cx('content'),
            onClick: _cache[0] || (_cache[0] = function () {
              return $options.onContentClick && $options.onContentClick.apply($options, arguments);
            }),
            onMousedown: _cache[1] || (_cache[1] = function () {
              return $options.onContentClick && $options.onContentClick.apply($options, arguments);
            }),
            onKeydown: _cache[2] || (_cache[2] = function () {
              return $options.onContentKeydown && $options.onContentKeydown.apply($options, arguments);
            })
          }, _ctx.ptm('content')), [renderSlot(_ctx.$slots, "default")], 16), _ctx.showCloseIcon ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
            key: 0,
            "class": _ctx.cx('closeButton'),
            "aria-label": $options.closeAriaLabel,
            type: "button",
            autofocus: "",
            onClick: _cache[3] || (_cache[3] = function () {
              return $options.hide && $options.hide.apply($options, arguments);
            }),
            onKeydown: _cache[4] || (_cache[4] = function () {
              return $options.onButtonKeydown && $options.onButtonKeydown.apply($options, arguments);
            })
          }, _ctx.ptm('closeButton')), [renderSlot(_ctx.$slots, "closeicon", {}, function () {
            return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.closeIcon ? 'span' : 'TimesIcon'), mergeProps({
              "class": [_ctx.cx('closeIcon'), _ctx.closeIcon]
            }, _ctx.ptm('closeIcon')), null, 16, ["class"]))];
          })], 16, _hoisted_2)), [[_directive_ripple]]) : createCommentVNode("", true)], 64))], 16, _hoisted_1)), [[_directive_focustrap]]) : createCommentVNode("", true)];
        }),
        _: 3
      }, 16, ["onEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 3
  }, 8, ["appendTo"]);
}

script.render = render;

export { script as default };
