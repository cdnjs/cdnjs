import BaseComponent from 'primevue/basecomponent';
import Button from 'primevue/button';
import ConfirmationEventBus from 'primevue/confirmationeventbus';
import FocusTrap from 'primevue/focustrap';
import OverlayEventBus from 'primevue/overlayeventbus';
import Portal from 'primevue/portal';
import { ZIndexUtils, DomHandler, ConnectedOverlayScrollHandler } from 'primevue/utils';
import { resolveComponent, resolveDirective, openBlock, createBlock, withCtx, createVNode, Transition, withDirectives, createElementBlock, mergeProps, renderSlot, resolveDynamicComponent, createCommentVNode, createElementVNode, toDisplayString, normalizeClass } from 'vue';

var script = {
    name: 'ConfirmPopup',
    extends: BaseComponent,
    inheritAttrs: false,
    props: {
        group: String
    },
    data() {
        return {
            visible: false,
            confirmation: null,
            autoFocusAccept: null,
            autoFocusReject: null
        };
    },
    target: null,
    outsideClickListener: null,
    scrollHandler: null,
    resizeListener: null,
    container: null,
    confirmListener: null,
    closeListener: null,
    mounted() {
        this.confirmListener = (options) => {
            if (!options) {
                return;
            }

            if (options.group === this.group) {
                this.confirmation = options;
                this.target = options.target;

                if (this.confirmation.onShow) {
                    this.confirmation.onShow();
                }

                this.visible = true;
            }
        };

        this.closeListener = () => {
            this.visible = false;
            this.confirmation = null;
        };

        ConfirmationEventBus.on('confirm', this.confirmListener);
        ConfirmationEventBus.on('close', this.closeListener);
    },
    beforeUnmount() {
        ConfirmationEventBus.off('confirm', this.confirmListener);
        ConfirmationEventBus.off('close', this.closeListener);

        this.unbindOutsideClickListener();

        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        this.unbindResizeListener();

        if (this.container) {
            ZIndexUtils.clear(this.container);
            this.container = null;
        }

        this.target = null;
        this.confirmation = null;
    },
    methods: {
        accept() {
            if (this.confirmation.accept) {
                this.confirmation.accept();
            }

            this.visible = false;
        },
        reject() {
            if (this.confirmation.reject) {
                this.confirmation.reject();
            }

            this.visible = false;
        },
        onHide() {
            if (this.confirmation.onHide) {
                this.confirmation.onHide();
            }

            this.visible = false;
        },
        onAcceptKeydown(event) {
            if (event.code === 'Space' || event.code === 'Enter') {
                this.accept();
                DomHandler.focus(this.target);
                event.preventDefault();
            }
        },
        onRejectKeydown(event) {
            if (event.code === 'Space' || event.code === 'Enter') {
                this.reject();
                DomHandler.focus(this.target);
                event.preventDefault();
            }
        },
        onEnter(el) {
            this.autoFocusAccept = this.confirmation.defaultFocus === undefined || this.confirmation.defaultFocus === 'accept' ? true : false;
            this.autoFocusReject = this.confirmation.defaultFocus === 'reject' ? true : false;

            this.bindOutsideClickListener();
            this.bindScrollListener();
            this.bindResizeListener();

            ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
        },
        onAfterEnter() {
            this.focus();
        },
        onLeave() {
            this.autoFocusAccept = null;
            this.autoFocusReject = null;

            this.unbindOutsideClickListener();
            this.unbindScrollListener();
            this.unbindResizeListener();
        },
        onAfterLeave(el) {
            ZIndexUtils.clear(el);
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
                DomHandler.addClass(this.container, 'p-confirm-popup-flipped');
            }
        },
        bindOutsideClickListener() {
            if (!this.outsideClickListener) {
                this.outsideClickListener = (event) => {
                    if (this.visible && this.container && !this.container.contains(event.target) && !this.isTargetClicked(event)) {
                        if (this.confirmation.onHide) {
                            this.confirmation.onHide();
                        }

                        this.visible = false;
                    } else {
                        this.alignOverlay();
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
        focus() {
            let focusTarget = this.container.querySelector('[autofocus]');

            if (focusTarget) {
                focusTarget.focus({ preventScroll: true }); // Firefox requires preventScroll
            }
        },
        isTargetClicked(event) {
            return this.target && (this.target === event.target || this.target.contains(event.target));
        },
        containerRef(el) {
            this.container = el;
        },
        onOverlayClick(event) {
            OverlayEventBus.emit('overlay-click', {
                originalEvent: event,
                target: this.target
            });
        },
        onOverlayKeydown(event) {
            if (event.code === 'Escape') {
                ConfirmationEventBus.emit('close', this.closeListener);
                DomHandler.focus(this.target);
            }
        }
    },
    computed: {
        containerClass() {
            return [
                'p-confirm-popup p-component',
                {
                    'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                    'p-ripple-disabled': this.$primevue.config.ripple === false
                }
            ];
        },
        message() {
            return this.confirmation ? this.confirmation.message : null;
        },
        iconClass() {
            return ['p-confirm-popup-icon', this.confirmation ? this.confirmation.icon : null];
        },
        acceptLabel() {
            return this.confirmation ? this.confirmation.acceptLabel || this.$primevue.config.locale.accept : null;
        },
        rejectLabel() {
            return this.confirmation ? this.confirmation.rejectLabel || this.$primevue.config.locale.reject : null;
        },
        acceptIcon() {
            return this.confirmation ? this.confirmation.acceptIcon : null;
        },
        rejectIcon() {
            return this.confirmation ? this.confirmation.rejectIcon : null;
        },
        acceptClass() {
            return ['p-confirm-popup-accept p-button-sm', this.confirmation ? this.confirmation.acceptClass : null];
        },
        rejectClass() {
            return ['p-confirm-popup-reject p-button-sm', this.confirmation ? this.confirmation.rejectClass || 'p-button-text' : null];
        }
    },
    components: {
        CPButton: Button,
        Portal: Portal
    },
    directives: {
        focustrap: FocusTrap
    }
};

const _hoisted_1 = ["aria-modal"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CPButton = resolveComponent("CPButton");
  const _component_Portal = resolveComponent("Portal");
  const _directive_focustrap = resolveDirective("focustrap");

  return (openBlock(), createBlock(_component_Portal, null, {
    default: withCtx(() => [
      createVNode(Transition, {
        name: "p-confirm-popup",
        onEnter: $options.onEnter,
        onAfterEnter: $options.onAfterEnter,
        onLeave: $options.onLeave,
        onAfterLeave: $options.onAfterLeave
      }, {
        default: withCtx(() => [
          ($data.visible)
            ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref: $options.containerRef,
                role: "alertdialog",
                class: $options.containerClass,
                "aria-modal": $data.visible,
                onClick: _cache[2] || (_cache[2] = (...args) => ($options.onOverlayClick && $options.onOverlayClick(...args))),
                onKeydown: _cache[3] || (_cache[3] = (...args) => ($options.onOverlayKeydown && $options.onOverlayKeydown(...args)))
              }, { ..._ctx.$attrs, ..._ctx.ptm('root') }), [
                (!_ctx.$slots.message)
                  ? (openBlock(), createElementBlock("div", mergeProps({
                      key: 0,
                      class: "p-confirm-popup-content"
                    }, _ctx.ptm('content')), [
                      renderSlot(_ctx.$slots, "icon", { class: "p-confirm-popup-icon" }, () => [
                        (_ctx.$slots.icon)
                          ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.icon), {
                              key: 0,
                              class: "p-confirm-popup-icon"
                            }))
                          : ($data.confirmation.icon)
                            ? (openBlock(), createElementBlock("span", mergeProps({
                                key: 1,
                                class: $options.iconClass
                              }, _ctx.ptm('icon')), null, 16))
                            : createCommentVNode("", true)
                      ]),
                      createElementVNode("span", mergeProps({ class: "p-confirm-popup-message" }, _ctx.ptm('message')), toDisplayString($data.confirmation.message), 17)
                    ], 16))
                  : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.message), {
                      key: 1,
                      message: $data.confirmation
                    }, null, 8, ["message"])),
                createElementVNode("div", mergeProps({ class: "p-confirm-popup-footer" }, _ctx.ptm('footer')), [
                  createVNode(_component_CPButton, {
                    label: $options.rejectLabel,
                    class: normalizeClass($options.rejectClass),
                    onClick: _cache[0] || (_cache[0] = $event => ($options.reject())),
                    onKeydown: $options.onRejectKeydown,
                    autofocus: $data.autoFocusReject,
                    pt: _ctx.ptm('rejectButton')
                  }, {
                    icon: withCtx((iconProps) => [
                      renderSlot(_ctx.$slots, "rejecticon", {}, () => [
                        createElementVNode("span", mergeProps({
                          class: [$options.rejectIcon, iconProps.class]
                        }, _ctx.ptm('rejectButton')['icon']), null, 16)
                      ])
                    ]),
                    _: 3
                  }, 8, ["label", "class", "onKeydown", "autofocus", "pt"]),
                  createVNode(_component_CPButton, {
                    label: $options.acceptLabel,
                    class: normalizeClass($options.acceptClass),
                    onClick: _cache[1] || (_cache[1] = $event => ($options.accept())),
                    onKeydown: $options.onAcceptKeydown,
                    autofocus: $data.autoFocusAccept,
                    pt: _ctx.ptm('acceptButton')
                  }, {
                    icon: withCtx((iconProps) => [
                      renderSlot(_ctx.$slots, "accepticon", {}, () => [
                        createElementVNode("span", mergeProps({
                          class: [$options.acceptIcon, iconProps.class]
                        }, _ctx.ptm('acceptButton')['icon']), null, 16)
                      ])
                    ]),
                    _: 3
                  }, 8, ["label", "class", "onKeydown", "autofocus", "pt"])
                ], 16)
              ], 16, _hoisted_1)), [
                [_directive_focustrap]
              ])
            : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])
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

var css_248z = "\n.p-confirm-popup {\n    position: absolute;\n    margin-top: 10px;\n    top: 0;\n    left: 0;\n}\n.p-confirm-popup-flipped {\n    margin-top: 0;\n    margin-bottom: 10px;\n}\n\n/* Animation */\n.p-confirm-popup-enter-from {\n    opacity: 0;\n    transform: scaleY(0.8);\n}\n.p-confirm-popup-leave-to {\n    opacity: 0;\n}\n.p-confirm-popup-enter-active {\n    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1), opacity 0.12s cubic-bezier(0, 0, 0.2, 1);\n}\n.p-confirm-popup-leave-active {\n    transition: opacity 0.1s linear;\n}\n.p-confirm-popup:after,\n.p-confirm-popup:before {\n    bottom: 100%;\n    left: calc(var(--overlayArrowLeft, 0) + 1.25rem);\n    content: ' ';\n    height: 0;\n    width: 0;\n    position: absolute;\n    pointer-events: none;\n}\n.p-confirm-popup:after {\n    border-width: 8px;\n    margin-left: -8px;\n}\n.p-confirm-popup:before {\n    border-width: 10px;\n    margin-left: -10px;\n}\n.p-confirm-popup-flipped:after,\n.p-confirm-popup-flipped:before {\n    bottom: auto;\n    top: 100%;\n}\n.p-confirm-popup.p-confirm-popup-flipped:after {\n    border-bottom-color: transparent;\n}\n.p-confirm-popup.p-confirm-popup-flipped:before {\n    border-bottom-color: transparent;\n}\n.p-confirm-popup .p-confirm-popup-content {\n    display: flex;\n    align-items: center;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
