import BaseComponent from 'primevue/basecomponent';
import FocusTrap from 'primevue/focustrap';
import TimesIcon from 'primevue/icons/times';
import Portal from 'primevue/portal';
import Ripple from 'primevue/ripple';
import { ZIndexUtils, DomHandler } from 'primevue/utils';
import { resolveComponent, resolveDirective, openBlock, createBlock, withCtx, createElementBlock, mergeProps, createVNode, Transition, withDirectives, createElementVNode, renderSlot, createCommentVNode, resolveDynamicComponent } from 'vue';

var script = {
    name: 'Sidebar',
    extends: BaseComponent,
    inheritAttrs: false,
    emits: ['update:visible', 'show', 'hide', 'after-hide'],
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            default: 'left'
        },
        baseZIndex: {
            type: Number,
            default: 0
        },
        autoZIndex: {
            type: Boolean,
            default: true
        },
        dismissable: {
            type: Boolean,
            default: true
        },
        showCloseIcon: {
            type: Boolean,
            default: true
        },
        closeIcon: {
            type: String,
            default: undefined
        },
        modal: {
            type: Boolean,
            default: true
        },
        blockScroll: {
            type: Boolean,
            default: false
        }
    },
    data() {
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
    updated() {
        if (this.visible) {
            this.containerVisible = this.visible;
        }
    },
    beforeUnmount() {
        this.disableDocumentSettings();

        if (this.mask && this.autoZIndex) {
            ZIndexUtils.clear(this.mask);
        }

        this.container = null;
        this.mask = null;
    },
    methods: {
        hide() {
            this.$emit('update:visible', false);
        },
        onEnter() {
            this.$emit('show');
            this.focus();

            if (this.autoZIndex) {
                ZIndexUtils.set('modal', this.mask, this.baseZIndex || this.$primevue.config.zIndex.modal);
            }
        },
        onAfterEnter() {
            this.enableDocumentSettings();
        },
        onBeforeLeave() {
            if (this.modal) {
                DomHandler.addClass(this.mask, 'p-component-overlay-leave');
            }
        },
        onLeave() {
            this.$emit('hide');
        },
        onAfterLeave() {
            if (this.autoZIndex) {
                ZIndexUtils.clear(this.mask);
            }

            this.containerVisible = false;
            this.disableDocumentSettings();
            this.$emit('after-hide');
        },
        onMaskClick(event) {
            if (this.dismissable && this.modal && this.mask === event.target) {
                this.hide();
            }
        },
        focus() {
            const findFocusableElement = (container) => {
                return container.querySelector('[autofocus]');
            };

            let focusTarget = this.$slots.default && findFocusableElement(this.content);

            if (!focusTarget) {
                focusTarget = this.$slots.header && findFocusableElement(this.headerContainer);

                if (!focusTarget) {
                    focusTarget = findFocusableElement(this.container);
                }
            }

            focusTarget && focusTarget.focus();
        },
        enableDocumentSettings() {
            if (this.dismissable && !this.modal) {
                this.bindOutsideClickListener();
            }

            if (this.blockScroll) {
                DomHandler.addClass(document.body, 'p-overflow-hidden');
            }
        },
        disableDocumentSettings() {
            this.unbindOutsideClickListener();

            if (this.blockScroll) {
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }
        },
        onKeydown(event) {
            if (event.code === 'Escape') {
                this.hide();
            }
        },
        containerRef(el) {
            this.container = el;
        },
        maskRef(el) {
            this.mask = el;
        },
        contentRef(el) {
            this.content = el;
        },
        headerContainerRef(el) {
            this.headerContainer = el;
        },
        closeButtonRef(el) {
            this.closeButton = el;
        },
        getPositionClass() {
            const positions = ['left', 'right', 'top', 'bottom'];
            const pos = positions.find((item) => item === this.position);

            return pos ? `p-sidebar-${pos}` : '';
        },
        bindOutsideClickListener() {
            if (!this.outsideClickListener) {
                this.outsideClickListener = (event) => {
                    if (this.isOutsideClicked(event)) {
                        this.hide();
                    }
                };

                document.addEventListener('click', this.outsideClickListener);
            }
        },
        unbindOutsideClickListener() {
            if (this.outsideClickListener) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener = null;
            }
        },
        isOutsideClicked(event) {
            return this.container && !this.container.contains(event.target);
        }
    },
    computed: {
        containerClass() {
            return [
                'p-sidebar p-component',
                {
                    'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                    'p-ripple-disabled': this.$primevue.config.ripple === false,
                    'p-sidebar-full': this.fullScreen
                }
            ];
        },
        fullScreen() {
            return this.position === 'full';
        },
        closeAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
        },
        maskClass() {
            return [
                'p-sidebar-mask',
                this.getPositionClass(),
                {
                    'p-component-overlay p-component-overlay-enter': this.modal,
                    'p-sidebar-mask-scrollblocker': this.blockScroll,
                    'p-sidebar-visible': this.containerVisible,
                    'p-sidebar-full': this.fullScreen
                }
            ];
        }
    },
    directives: {
        focustrap: FocusTrap,
        ripple: Ripple
    },
    components: {
        Portal: Portal,
        TimesIcon
    }
};

const _hoisted_1 = ["aria-modal"];
const _hoisted_2 = ["aria-label"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Portal = resolveComponent("Portal");
  const _directive_ripple = resolveDirective("ripple");
  const _directive_focustrap = resolveDirective("focustrap");

  return (openBlock(), createBlock(_component_Portal, null, {
    default: withCtx(() => [
      ($data.containerVisible)
        ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.maskRef,
            class: $options.maskClass,
            onMousedown: _cache[2] || (_cache[2] = (...args) => ($options.onMaskClick && $options.onMaskClick(...args)))
          }, _ctx.ptm('mask')), [
            createVNode(Transition, {
              name: "p-sidebar",
              onEnter: $options.onEnter,
              onAfterEnter: $options.onAfterEnter,
              onBeforeLeave: $options.onBeforeLeave,
              onLeave: $options.onLeave,
              onAfterLeave: $options.onAfterLeave,
              appear: ""
            }, {
              default: withCtx(() => [
                ($props.visible)
                  ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
                      key: 0,
                      ref: $options.containerRef,
                      class: $options.containerClass,
                      role: "complementary",
                      "aria-modal": $props.modal,
                      onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.onKeydown && $options.onKeydown(...args)))
                    }, { ..._ctx.$attrs, ..._ctx.ptm('root') }), [
                      createElementVNode("div", mergeProps({
                        ref: $options.headerContainerRef,
                        class: "p-sidebar-header"
                      }, _ctx.ptm('header')), [
                        (_ctx.$slots.header)
                          ? (openBlock(), createElementBlock("div", mergeProps({
                              key: 0,
                              class: "p-sidebar-header-content"
                            }, _ctx.ptm('headerContent')), [
                              renderSlot(_ctx.$slots, "header")
                            ], 16))
                          : createCommentVNode("", true),
                        ($props.showCloseIcon)
                          ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
                              key: 1,
                              ref: $options.closeButtonRef,
                              autofocus: "",
                              type: "button",
                              class: "p-sidebar-close p-sidebar-icon p-link",
                              "aria-label": $options.closeAriaLabel,
                              onClick: _cache[0] || (_cache[0] = (...args) => ($options.hide && $options.hide(...args)))
                            }, _ctx.ptm('closeButton')), [
                              renderSlot(_ctx.$slots, "closeicon", {}, () => [
                                (openBlock(), createBlock(resolveDynamicComponent($props.closeIcon ? 'span' : 'TimesIcon'), mergeProps({
                                  class: ['p-sidebar-close-icon ', $props.closeIcon]
                                }, _ctx.ptm('closeIcon')), null, 16, ["class"]))
                              ])
                            ], 16, _hoisted_2)), [
                              [_directive_ripple]
                            ])
                          : createCommentVNode("", true)
                      ], 16),
                      createElementVNode("div", mergeProps({
                        ref: $options.contentRef,
                        class: "p-sidebar-content"
                      }, _ctx.ptm('content')), [
                        renderSlot(_ctx.$slots, "default")
                      ], 16)
                    ], 16, _hoisted_1)), [
                      [_directive_focustrap]
                    ])
                  : createCommentVNode("", true)
              ]),
              _: 3
            }, 8, ["onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
          ], 16))
        : createCommentVNode("", true)
    ]),
    _: 3
  }))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.p-sidebar-mask {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    display: none;\n    justify-content: center;\n    align-items: center;\n    pointer-events: none;\n    background-color: transparent;\n    transition-property: background-color;\n}\n.p-sidebar-mask.p-component-overlay {\n    pointer-events: auto;\n}\n.p-sidebar-visible {\n    display: flex;\n}\n.p-sidebar {\n    display: flex;\n    flex-direction: column;\n    pointer-events: auto;\n    transform: translate3d(0px, 0px, 0px);\n    position: relative;\n    transition: transform 0.3s;\n}\n.p-sidebar-content {\n    overflow-y: auto;\n    flex-grow: 1;\n}\n.p-sidebar-header {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    flex-shrink: 0;\n}\n.p-sidebar-icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n.p-sidebar-full .p-sidebar {\n    transition: none;\n    transform: none;\n    width: 100vw !important;\n    height: 100vh !important;\n    max-height: 100%;\n    top: 0px !important;\n    left: 0px !important;\n}\n\n/* Animation */\n/* Center */\n.p-sidebar-left .p-sidebar-enter-from,\n.p-sidebar-left .p-sidebar-leave-to {\n    transform: translateX(-100%);\n}\n.p-sidebar-right .p-sidebar-enter-from,\n.p-sidebar-right .p-sidebar-leave-to {\n    transform: translateX(100%);\n}\n.p-sidebar-top .p-sidebar-enter-from,\n.p-sidebar-top .p-sidebar-leave-to {\n    transform: translateY(-100%);\n}\n.p-sidebar-bottom .p-sidebar-enter-from,\n.p-sidebar-bottom .p-sidebar-leave-to {\n    transform: translateY(100%);\n}\n.p-sidebar-full .p-sidebar-enter-from,\n.p-sidebar-full .p-sidebar-leave-to {\n    opacity: 0;\n}\n.p-sidebar-full .p-sidebar-enter-active,\n.p-sidebar-full .p-sidebar-leave-active {\n    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n\n/* Position */\n.p-sidebar-left {\n    justify-content: flex-start;\n}\n.p-sidebar-right {\n    justify-content: flex-end;\n}\n.p-sidebar-top {\n    align-items: flex-start;\n}\n.p-sidebar-bottom {\n    align-items: flex-end;\n}\n\n/* Size */\n.p-sidebar-left .p-sidebar {\n    width: 20rem;\n    height: 100%;\n}\n.p-sidebar-right .p-sidebar {\n    width: 20rem;\n    height: 100%;\n}\n.p-sidebar-top .p-sidebar {\n    height: 10rem;\n    width: 100%;\n}\n.p-sidebar-bottom .p-sidebar {\n    height: 10rem;\n    width: 100%;\n}\n.p-sidebar-left .p-sidebar-sm,\n.p-sidebar-right .p-sidebar-sm {\n    width: 20rem;\n}\n.p-sidebar-left .p-sidebar-md,\n.p-sidebar-right .p-sidebar-md {\n    width: 40rem;\n}\n.p-sidebar-left .p-sidebar-lg,\n.p-sidebar-right .p-sidebar-lg {\n    width: 60rem;\n}\n.p-sidebar-top .p-sidebar-sm,\n.p-sidebar-bottom .p-sidebar-sm {\n    height: 10rem;\n}\n.p-sidebar-top .p-sidebar-md,\n.p-sidebar-bottom .p-sidebar-md {\n    height: 20rem;\n}\n.p-sidebar-top .p-sidebar-lg,\n.p-sidebar-bottom .p-sidebar-lg {\n    height: 30rem;\n}\n.p-sidebar-left .p-sidebar-content,\n.p-sidebar-right .p-sidebar-content,\n.p-sidebar-top .p-sidebar-content,\n.p-sidebar-bottom .p-sidebar-content {\n    width: 100%;\n    height: 100%;\n}\n@media screen and (max-width: 64em) {\n.p-sidebar-left .p-sidebar-lg,\n    .p-sidebar-left .p-sidebar-md,\n    .p-sidebar-right .p-sidebar-lg,\n    .p-sidebar-right .p-sidebar-md {\n        width: 20rem;\n}\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
