'use strict';

var BaseComponent = require('primevue/basecomponent');
var Button = require('primevue/button');
var ConfirmationEventBus = require('primevue/confirmationeventbus');
var FocusTrap = require('primevue/focustrap');
var OverlayEventBus = require('primevue/overlayeventbus');
var Portal = require('primevue/portal');
var utils = require('primevue/utils');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var ConfirmationEventBus__default = /*#__PURE__*/_interopDefaultLegacy(ConfirmationEventBus);
var FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);
var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);

var script = {
    name: 'ConfirmPopup',
    extends: BaseComponent__default["default"],
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

        ConfirmationEventBus__default["default"].on('confirm', this.confirmListener);
        ConfirmationEventBus__default["default"].on('close', this.closeListener);
    },
    beforeUnmount() {
        ConfirmationEventBus__default["default"].off('confirm', this.confirmListener);
        ConfirmationEventBus__default["default"].off('close', this.closeListener);

        this.unbindOutsideClickListener();

        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        this.unbindResizeListener();

        if (this.container) {
            utils.ZIndexUtils.clear(this.container);
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
                utils.DomHandler.focus(this.target);
                event.preventDefault();
            }
        },
        onRejectKeydown(event) {
            if (event.code === 'Space' || event.code === 'Enter') {
                this.reject();
                utils.DomHandler.focus(this.target);
                event.preventDefault();
            }
        },
        onEnter(el) {
            this.autoFocusAccept = this.confirmation.defaultFocus === undefined || this.confirmation.defaultFocus === 'accept' ? true : false;
            this.autoFocusReject = this.confirmation.defaultFocus === 'reject' ? true : false;

            this.bindOutsideClickListener();
            this.bindScrollListener();
            this.bindResizeListener();

            utils.ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
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
            utils.ZIndexUtils.clear(el);
        },
        alignOverlay() {
            utils.DomHandler.absolutePosition(this.container, this.target);

            const containerOffset = utils.DomHandler.getOffset(this.container);
            const targetOffset = utils.DomHandler.getOffset(this.target);
            let arrowLeft = 0;

            if (containerOffset.left < targetOffset.left) {
                arrowLeft = targetOffset.left - containerOffset.left;
            }

            this.container.style.setProperty('--overlayArrowLeft', `${arrowLeft}px`);

            if (containerOffset.top < targetOffset.top) {
                utils.DomHandler.addClass(this.container, 'p-confirm-popup-flipped');
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
                this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.target, () => {
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
                    if (this.visible && !utils.DomHandler.isTouchDevice()) {
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
            OverlayEventBus__default["default"].emit('overlay-click', {
                originalEvent: event,
                target: this.target
            });
        },
        onOverlayKeydown(event) {
            if (event.code === 'Escape') {
                ConfirmationEventBus__default["default"].emit('close', this.closeListener);
                utils.DomHandler.focus(this.target);
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
        CPButton: Button__default["default"],
        Portal: Portal__default["default"]
    },
    directives: {
        focustrap: FocusTrap__default["default"]
    }
};

const _hoisted_1 = ["aria-modal"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CPButton = vue.resolveComponent("CPButton");
  const _component_Portal = vue.resolveComponent("Portal");
  const _directive_focustrap = vue.resolveDirective("focustrap");

  return (vue.openBlock(), vue.createBlock(_component_Portal, null, {
    default: vue.withCtx(() => [
      vue.createVNode(vue.Transition, {
        name: "p-confirm-popup",
        onEnter: $options.onEnter,
        onAfterEnter: $options.onAfterEnter,
        onLeave: $options.onLeave,
        onAfterLeave: $options.onAfterLeave
      }, {
        default: vue.withCtx(() => [
          ($data.visible)
            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                ref: $options.containerRef,
                role: "alertdialog",
                class: $options.containerClass,
                "aria-modal": $data.visible,
                onClick: _cache[2] || (_cache[2] = (...args) => ($options.onOverlayClick && $options.onOverlayClick(...args))),
                onKeydown: _cache[3] || (_cache[3] = (...args) => ($options.onOverlayKeydown && $options.onOverlayKeydown(...args)))
              }, { ..._ctx.$attrs, ..._ctx.ptm('root') }), [
                (!_ctx.$slots.message)
                  ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                      key: 0,
                      class: "p-confirm-popup-content"
                    }, _ctx.ptm('content')), [
                      vue.renderSlot(_ctx.$slots, "icon", { class: "p-confirm-popup-icon" }, () => [
                        (_ctx.$slots.icon)
                          ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.icon), {
                              key: 0,
                              class: "p-confirm-popup-icon"
                            }))
                          : ($data.confirmation.icon)
                            ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
                                key: 1,
                                class: $options.iconClass
                              }, _ctx.ptm('icon')), null, 16))
                            : vue.createCommentVNode("", true)
                      ]),
                      vue.createElementVNode("span", vue.mergeProps({ class: "p-confirm-popup-message" }, _ctx.ptm('message')), vue.toDisplayString($data.confirmation.message), 17)
                    ], 16))
                  : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.message), {
                      key: 1,
                      message: $data.confirmation
                    }, null, 8, ["message"])),
                vue.createElementVNode("div", vue.mergeProps({ class: "p-confirm-popup-footer" }, _ctx.ptm('footer')), [
                  vue.createVNode(_component_CPButton, {
                    label: $options.rejectLabel,
                    class: vue.normalizeClass($options.rejectClass),
                    onClick: _cache[0] || (_cache[0] = $event => ($options.reject())),
                    onKeydown: $options.onRejectKeydown,
                    autofocus: $data.autoFocusReject,
                    pt: _ctx.ptm('rejectButton')
                  }, {
                    icon: vue.withCtx((iconProps) => [
                      vue.renderSlot(_ctx.$slots, "rejecticon", {}, () => [
                        vue.createElementVNode("span", vue.mergeProps({
                          class: [$options.rejectIcon, iconProps.class]
                        }, _ctx.ptm('rejectButton')['icon']), null, 16)
                      ])
                    ]),
                    _: 3
                  }, 8, ["label", "class", "onKeydown", "autofocus", "pt"]),
                  vue.createVNode(_component_CPButton, {
                    label: $options.acceptLabel,
                    class: vue.normalizeClass($options.acceptClass),
                    onClick: _cache[1] || (_cache[1] = $event => ($options.accept())),
                    onKeydown: $options.onAcceptKeydown,
                    autofocus: $data.autoFocusAccept,
                    pt: _ctx.ptm('acceptButton')
                  }, {
                    icon: vue.withCtx((iconProps) => [
                      vue.renderSlot(_ctx.$slots, "accepticon", {}, () => [
                        vue.createElementVNode("span", vue.mergeProps({
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
            : vue.createCommentVNode("", true)
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

module.exports = script;
