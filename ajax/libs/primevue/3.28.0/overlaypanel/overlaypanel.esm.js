import BaseComponent from 'primevue/basecomponent';
import FocusTrap from 'primevue/focustrap';
import TimesIcon from 'primevue/icons/times';
import OverlayEventBus from 'primevue/overlayeventbus';
import Portal from 'primevue/portal';
import Ripple from 'primevue/ripple';
import { ZIndexUtils, DomHandler, ConnectedOverlayScrollHandler, UniqueComponentId } from 'primevue/utils';
import { resolveComponent, resolveDirective, openBlock, createBlock, withCtx, createVNode, Transition, withDirectives, createElementBlock, mergeProps, createElementVNode, renderSlot, resolveDynamicComponent, createCommentVNode } from 'vue';

var script = {
    name: 'OverlayPanel',
    extends: BaseComponent,
    inheritAttrs: false,
    emits: ['show', 'hide'],
    props: {
        dismissable: {
            type: Boolean,
            default: true
        },
        showCloseIcon: {
            type: Boolean,
            default: false
        },
        appendTo: {
            type: String,
            default: 'body'
        },
        baseZIndex: {
            type: Number,
            default: 0
        },
        autoZIndex: {
            type: Boolean,
            default: true
        },
        breakpoints: {
            type: Object,
            default: null
        },
        closeIcon: {
            type: String,
            default: undefined
        }
    },
    data() {
        return {
            visible: false
        };
    },
    watch: {
        dismissable: {
            immediate: true,
            handler(newValue) {
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
    beforeUnmount() {
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
    mounted() {
        if (this.breakpoints) {
            this.createStyle();
        }
    },
    methods: {
        toggle(event, target) {
            if (this.visible) this.hide();
            else this.show(event, target);
        },
        show(event, target) {
            this.visible = true;
            this.eventTarget = event.currentTarget;
            this.target = target || event.currentTarget;
        },
        hide() {
            this.visible = false;
            DomHandler.focus(this.target);
        },
        onContentClick() {
            this.selfClick = true;
        },
        onEnter(el) {
            this.container.setAttribute(this.attributeSelector, '');
            this.alignOverlay();

            if (this.dismissable) {
                this.bindOutsideClickListener();
            }

            this.bindScrollListener();
            this.bindResizeListener();

            if (this.autoZIndex) {
                ZIndexUtils.set('overlay', el, this.baseZIndex + this.$primevue.config.zIndex.overlay);
            }

            this.overlayEventListener = (e) => {
                if (this.container.contains(e.target)) {
                    this.selfClick = true;
                }
            };

            this.focus();
            OverlayEventBus.on('overlay-click', this.overlayEventListener);
            this.$emit('show');
        },
        onLeave() {
            this.unbindOutsideClickListener();
            this.unbindScrollListener();
            this.unbindResizeListener();
            OverlayEventBus.off('overlay-click', this.overlayEventListener);
            this.overlayEventListener = null;
            this.$emit('hide');
        },
        onAfterLeave(el) {
            if (this.autoZIndex) {
                ZIndexUtils.clear(el);
            }
        },
        alignOverlay() {
            DomHandler.absolutePosition(this.container, this.target);

            const containerOffset = DomHandler.getOffset(this.container);
            const targetOffset = DomHandler.getOffset(this.target);
            let arrowLeft = 0;

            if (containerOffset.left < targetOffset.left) {
                arrowLeft = targetOffset.left - containerOffset.left;
            }

            this.container.style.setProperty('--overlayArrowLeft', `${arrowLeft}px`);

            if (containerOffset.top < targetOffset.top) {
                DomHandler.addClass(this.container, 'p-overlaypanel-flipped');
            }
        },
        onContentKeydown(event) {
            event.code === 'Escape' && this.hide();
        },
        onButtonKeydown(event) {
            switch (event.code) {
                case 'ArrowDown':
                case 'ArrowUp':
                case 'ArrowLeft':
                case 'ArrowRight':
                    event.preventDefault();
            }
        },
        focus() {
            let focusTarget = this.container.querySelector('[autofocus]');

            if (focusTarget) {
                focusTarget.focus();
            }
        },
        bindOutsideClickListener() {
            if (!this.outsideClickListener && DomHandler.isClient()) {
                this.outsideClickListener = (event) => {
                    if (this.visible && !this.selfClick && !this.isTargetClicked(event)) {
                        this.visible = false;
                    }

                    this.selfClick = false;
                };

                document.addEventListener('click', this.outsideClickListener);
            }
        },
        unbindOutsideClickListener() {
            if (this.outsideClickListener) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener = null;
                this.selfClick = false;
            }
        },
        bindScrollListener() {
            if (!this.scrollHandler) {
                this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, () => {
                    if (this.visible) {
                        this.visible = false;
                    }
                });
            }

            this.scrollHandler.bindScrollListener();
        },
        unbindScrollListener() {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        },
        bindResizeListener() {
            if (!this.resizeListener) {
                this.resizeListener = () => {
                    if (this.visible && !DomHandler.isTouchDevice()) {
                        this.visible = false;
                    }
                };

                window.addEventListener('resize', this.resizeListener);
            }
        },
        unbindResizeListener() {
            if (this.resizeListener) {
                window.removeEventListener('resize', this.resizeListener);
                this.resizeListener = null;
            }
        },
        isTargetClicked(event) {
            return this.eventTarget && (this.eventTarget === event.target || this.eventTarget.contains(event.target));
        },
        containerRef(el) {
            this.container = el;
        },
        createStyle() {
            if (!this.styleElement) {
                this.styleElement = document.createElement('style');
                this.styleElement.type = 'text/css';
                document.head.appendChild(this.styleElement);

                let innerHTML = '';

                for (let breakpoint in this.breakpoints) {
                    innerHTML += `
                        @media screen and (max-width: ${breakpoint}) {
                            .p-overlaypanel[${this.attributeSelector}] {
                                width: ${this.breakpoints[breakpoint]} !important;
                            }
                        }
                    `;
                }

                this.styleElement.innerHTML = innerHTML;
            }
        },
        destroyStyle() {
            if (this.styleElement) {
                document.head.removeChild(this.styleElement);
                this.styleElement = null;
            }
        },
        onOverlayClick(event) {
            OverlayEventBus.emit('overlay-click', {
                originalEvent: event,
                target: this.target
            });
        }
    },
    computed: {
        containerClass() {
            return [
                'p-overlaypanel p-component',
                {
                    'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                    'p-ripple-disabled': this.$primevue.config.ripple === false
                }
            ];
        },
        attributeSelector() {
            return UniqueComponentId();
        },
        closeAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
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

  return (openBlock(), createBlock(_component_Portal, { appendTo: $props.appendTo }, {
    default: withCtx(() => [
      createVNode(Transition, {
        name: "p-overlaypanel",
        onEnter: $options.onEnter,
        onLeave: $options.onLeave,
        onAfterLeave: $options.onAfterLeave
      }, {
        default: withCtx(() => [
          ($data.visible)
            ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref: $options.containerRef,
                role: "dialog",
                class: $options.containerClass,
                "aria-modal": $data.visible,
                onClick: _cache[5] || (_cache[5] = (...args) => ($options.onOverlayClick && $options.onOverlayClick(...args)))
              }, { ..._ctx.$attrs, ..._ctx.ptm('root') }), [
                createElementVNode("div", mergeProps({
                  class: "p-overlaypanel-content",
                  onClick: _cache[0] || (_cache[0] = (...args) => ($options.onContentClick && $options.onContentClick(...args))),
                  onMousedown: _cache[1] || (_cache[1] = (...args) => ($options.onContentClick && $options.onContentClick(...args))),
                  onKeydown: _cache[2] || (_cache[2] = (...args) => ($options.onContentKeydown && $options.onContentKeydown(...args)))
                }, _ctx.ptm('content')), [
                  renderSlot(_ctx.$slots, "default")
                ], 16),
                ($props.showCloseIcon)
                  ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
                      key: 0,
                      class: "p-overlaypanel-close p-link",
                      "aria-label": $options.closeAriaLabel,
                      type: "button",
                      autofocus: "",
                      onClick: _cache[3] || (_cache[3] = (...args) => ($options.hide && $options.hide(...args))),
                      onKeydown: _cache[4] || (_cache[4] = (...args) => ($options.onButtonKeydown && $options.onButtonKeydown(...args)))
                    }, _ctx.ptm('closeButton')), [
                      renderSlot(_ctx.$slots, "closeicon", {}, () => [
                        (openBlock(), createBlock(resolveDynamicComponent($props.closeIcon ? 'span' : 'TimesIcon'), mergeProps({
                          class: ['p-overlaypanel-close-icon ', $props.closeIcon]
                        }, _ctx.ptm('closeIcon')), null, 16, ["class"]))
                      ])
                    ], 16, _hoisted_2)), [
                      [_directive_ripple]
                    ])
                  : createCommentVNode("", true)
              ], 16, _hoisted_1)), [
                [_directive_focustrap]
              ])
            : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["onEnter", "onLeave", "onAfterLeave"])
    ]),
    _: 3
  }, 8, ["appendTo"]))
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

var css_248z = "\n.p-overlaypanel {\n    position: absolute;\n    margin-top: 10px;\n    top: 0;\n    left: 0;\n}\n.p-overlaypanel-flipped {\n    margin-top: 0;\n    margin-bottom: 10px;\n}\n.p-overlaypanel-close {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n    position: relative;\n}\n\n/* Animation */\n.p-overlaypanel-enter-from {\n    opacity: 0;\n    transform: scaleY(0.8);\n}\n.p-overlaypanel-leave-to {\n    opacity: 0;\n}\n.p-overlaypanel-enter-active {\n    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1), opacity 0.12s cubic-bezier(0, 0, 0.2, 1);\n}\n.p-overlaypanel-leave-active {\n    transition: opacity 0.1s linear;\n}\n.p-overlaypanel:after,\n.p-overlaypanel:before {\n    bottom: 100%;\n    left: calc(var(--overlayArrowLeft, 0) + 1.25rem);\n    content: ' ';\n    height: 0;\n    width: 0;\n    position: absolute;\n    pointer-events: none;\n}\n.p-overlaypanel:after {\n    border-width: 8px;\n    margin-left: -8px;\n}\n.p-overlaypanel:before {\n    border-width: 10px;\n    margin-left: -10px;\n}\n.p-overlaypanel-flipped:after,\n.p-overlaypanel-flipped:before {\n    bottom: auto;\n    top: 100%;\n}\n.p-overlaypanel.p-overlaypanel-flipped:after {\n    border-bottom-color: transparent;\n}\n.p-overlaypanel.p-overlaypanel-flipped:before {\n    border-bottom-color: transparent;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
