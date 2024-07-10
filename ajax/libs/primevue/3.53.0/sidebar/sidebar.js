this.primevue = this.primevue || {};
this.primevue.sidebar = (function (FocusTrap, TimesIcon, Portal, Ripple, utils, BaseComponent, SidebarStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);
    var TimesIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesIcon);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var SidebarStyle__default = /*#__PURE__*/_interopDefaultLegacy(SidebarStyle);

    var script$1 = {
      name: 'BaseSidebar',
      "extends": BaseComponent__default["default"],
      props: {
        visible: {
          type: Boolean,
          "default": false
        },
        position: {
          type: String,
          "default": 'left'
        },
        header: {
          type: null,
          "default": null
        },
        baseZIndex: {
          type: Number,
          "default": 0
        },
        autoZIndex: {
          type: Boolean,
          "default": true
        },
        dismissable: {
          type: Boolean,
          "default": true
        },
        showCloseIcon: {
          type: Boolean,
          "default": true
        },
        closeIcon: {
          type: String,
          "default": undefined
        },
        modal: {
          type: Boolean,
          "default": true
        },
        blockScroll: {
          type: Boolean,
          "default": false
        }
      },
      style: SidebarStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      },
      watch: {
        dismissable: function dismissable(newValue) {
          if (newValue) {
            this.bindOutsideClickListener();
          } else {
            this.unbindOutsideClickListener();
          }
        }
      }
    };

    var script = {
      name: 'Sidebar',
      "extends": script$1,
      inheritAttrs: false,
      emits: ['update:visible', 'show', 'hide', 'after-hide'],
      data: function data() {
        return {
          containerVisible: this.visible
        };
      },
      container: null,
      mask: null,
      content: null,
      headerContainer: null,
      closeButton: null,
      outsideClickListener: null,
      documentKeydownListener: null,
      updated: function updated() {
        if (this.visible) {
          this.containerVisible = this.visible;
        }
      },
      beforeUnmount: function beforeUnmount() {
        this.disableDocumentSettings();
        if (this.mask && this.autoZIndex) {
          utils.ZIndexUtils.clear(this.mask);
        }
        this.container = null;
        this.mask = null;
      },
      methods: {
        hide: function hide() {
          this.$emit('update:visible', false);
        },
        onEnter: function onEnter() {
          this.$emit('show');
          this.focus();
          this.bindDocumentKeyDownListener();
          if (this.autoZIndex) {
            utils.ZIndexUtils.set('modal', this.mask, this.baseZIndex || this.$primevue.config.zIndex.modal);
          }
        },
        onAfterEnter: function onAfterEnter() {
          this.enableDocumentSettings();
        },
        onBeforeLeave: function onBeforeLeave() {
          if (this.modal) {
            !this.isUnstyled && utils.DomHandler.addClass(this.mask, 'p-component-overlay-leave');
          }
        },
        onLeave: function onLeave() {
          this.$emit('hide');
        },
        onAfterLeave: function onAfterLeave() {
          if (this.autoZIndex) {
            utils.ZIndexUtils.clear(this.mask);
          }
          this.unbindDocumentKeyDownListener();
          this.containerVisible = false;
          this.disableDocumentSettings();
          this.$emit('after-hide');
        },
        onMaskClick: function onMaskClick(event) {
          if (this.dismissable && this.modal && this.mask === event.target) {
            this.hide();
          }
        },
        focus: function focus() {
          var findFocusableElement = function findFocusableElement(container) {
            return container && container.querySelector('[autofocus]');
          };
          var focusTarget = this.$slots.header && findFocusableElement(this.headerContainer);
          if (!focusTarget) {
            focusTarget = this.$slots["default"] && findFocusableElement(this.container);
            if (!focusTarget) {
              focusTarget = this.closeButton;
            }
          }
          focusTarget && utils.DomHandler.focus(focusTarget);
        },
        enableDocumentSettings: function enableDocumentSettings() {
          if (this.dismissable && !this.modal) {
            this.bindOutsideClickListener();
          }
          if (this.blockScroll) {
            utils.DomHandler.blockBodyScroll();
          }
        },
        disableDocumentSettings: function disableDocumentSettings() {
          this.unbindOutsideClickListener();
          if (this.blockScroll) {
            utils.DomHandler.unblockBodyScroll();
          }
        },
        onKeydown: function onKeydown(event) {
          if (event.code === 'Escape') {
            this.hide();
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
        closeButtonRef: function closeButtonRef(el) {
          this.closeButton = el;
        },
        bindDocumentKeyDownListener: function bindDocumentKeyDownListener() {
          if (!this.documentKeydownListener) {
            this.documentKeydownListener = this.onKeydown;
            document.addEventListener('keydown', this.documentKeydownListener);
          }
        },
        unbindDocumentKeyDownListener: function unbindDocumentKeyDownListener() {
          if (this.documentKeydownListener) {
            document.removeEventListener('keydown', this.documentKeydownListener);
            this.documentKeydownListener = null;
          }
        },
        bindOutsideClickListener: function bindOutsideClickListener() {
          var _this = this;
          if (!this.outsideClickListener) {
            this.outsideClickListener = function (event) {
              if (_this.isOutsideClicked(event)) {
                _this.hide();
              }
            };
            document.addEventListener('click', this.outsideClickListener);
          }
        },
        unbindOutsideClickListener: function unbindOutsideClickListener() {
          if (this.outsideClickListener) {
            document.removeEventListener('click', this.outsideClickListener);
            this.outsideClickListener = null;
          }
        },
        isOutsideClicked: function isOutsideClicked(event) {
          return this.container && !this.container.contains(event.target);
        }
      },
      computed: {
        fullScreen: function fullScreen() {
          return this.position === 'full';
        },
        closeAriaLabel: function closeAriaLabel() {
          return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
        }
      },
      directives: {
        focustrap: FocusTrap__default["default"],
        ripple: Ripple__default["default"]
      },
      components: {
        Portal: Portal__default["default"],
        TimesIcon: TimesIcon__default["default"]
      }
    };

    var _hoisted_1 = ["aria-modal"];
    var _hoisted_2 = ["aria-label"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_Portal = vue.resolveComponent("Portal");
      var _directive_ripple = vue.resolveDirective("ripple");
      var _directive_focustrap = vue.resolveDirective("focustrap");
      return vue.openBlock(), vue.createBlock(_component_Portal, null, {
        "default": vue.withCtx(function () {
          return [$data.containerVisible ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            ref: $options.maskRef,
            onMousedown: _cache[1] || (_cache[1] = function () {
              return $options.onMaskClick && $options.onMaskClick.apply($options, arguments);
            }),
            "class": _ctx.cx('mask'),
            style: _ctx.sx('mask', true, {
              position: _ctx.position
            })
          }, _ctx.ptm('mask')), [vue.createVNode(vue.Transition, vue.mergeProps({
            name: "p-sidebar",
            onEnter: $options.onEnter,
            onAfterEnter: $options.onAfterEnter,
            onBeforeLeave: $options.onBeforeLeave,
            onLeave: $options.onLeave,
            onAfterLeave: $options.onAfterLeave,
            appear: ""
          }, _ctx.ptm('transition')), {
            "default": vue.withCtx(function () {
              return [_ctx.visible ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                ref: $options.containerRef,
                "class": _ctx.cx('root'),
                role: "complementary",
                "aria-modal": _ctx.modal
              }, _ctx.ptmi('root')), [_ctx.$slots.container ? vue.renderSlot(_ctx.$slots, "container", {
                key: 0,
                onClose: $options.hide,
                closeCallback: $options.hide
              }) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                key: 1
              }, [vue.createElementVNode("div", vue.mergeProps({
                ref: $options.headerContainerRef,
                "class": _ctx.cx('header')
              }, _ctx.ptm('header')), [vue.renderSlot(_ctx.$slots, "header", {
                "class": vue.normalizeClass(_ctx.cx('title'))
              }, function () {
                return [_ctx.header ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                  key: 0,
                  "class": _ctx.cx('title')
                }, _ctx.ptm('title')), vue.toDisplayString(_ctx.header), 17)) : vue.createCommentVNode("", true)];
              }), _ctx.showCloseIcon ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
                key: 0,
                ref: $options.closeButtonRef,
                type: "button",
                "class": _ctx.cx('closeButton'),
                "aria-label": $options.closeAriaLabel,
                onClick: _cache[0] || (_cache[0] = function () {
                  return $options.hide && $options.hide.apply($options, arguments);
                })
              }, _ctx.ptm('closeButton'), {
                "data-pc-group-section": "iconcontainer"
              }), [vue.renderSlot(_ctx.$slots, "closeicon", {
                "class": vue.normalizeClass(_ctx.cx('closeIcon'))
              }, function () {
                return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.closeIcon ? 'span' : 'TimesIcon'), vue.mergeProps({
                  "class": [_ctx.cx('closeIcon'), _ctx.closeIcon]
                }, _ctx.ptm('closeIcon')), null, 16, ["class"]))];
              })], 16, _hoisted_2)), [[_directive_ripple]]) : vue.createCommentVNode("", true)], 16), vue.createElementVNode("div", vue.mergeProps({
                ref: $options.contentRef,
                "class": _ctx.cx('content')
              }, _ctx.ptm('content')), [vue.renderSlot(_ctx.$slots, "default")], 16)], 64))], 16, _hoisted_1)), [[_directive_focustrap]]) : vue.createCommentVNode("", true)];
            }),
            _: 3
          }, 16, ["onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])], 16)) : vue.createCommentVNode("", true)];
        }),
        _: 3
      });
    }

    script.render = render;

    return script;

})(primevue.focustrap, primevue.icons.times, primevue.portal, primevue.ripple, primevue.utils, primevue.basecomponent, primevue.sidebar.style, Vue);
