import BaseComponent from 'primevue/basecomponent';
import FocusTrap from 'primevue/focustrap';
import TimesIcon from 'primevue/icons/times';
import WindowMaximizeIcon from 'primevue/icons/windowmaximize';
import WindowMinimizeIcon from 'primevue/icons/windowminimize';
import Portal from 'primevue/portal';
import Ripple from 'primevue/ripple';
import { ZIndexUtils, DomHandler, UniqueComponentId } from 'primevue/utils';
import { computed, resolveComponent, resolveDirective, openBlock, createBlock, withCtx, createElementBlock, mergeProps, createVNode, Transition, withDirectives, renderSlot, toDisplayString, createCommentVNode, createElementVNode, resolveDynamicComponent, createTextVNode } from 'vue';

var script = {
    name: 'Dialog',
    extends: BaseComponent,
    inheritAttrs: false,
    emits: ['update:visible', 'show', 'hide', 'after-hide', 'maximize', 'unmaximize', 'dragend'],
    props: {
        header: {
            type: null,
            default: null
        },
        footer: {
            type: null,
            default: null
        },
        visible: {
            type: Boolean,
            default: false
        },
        modal: {
            type: Boolean,
            default: null
        },
        contentStyle: {
            type: null,
            default: null
        },
        contentClass: {
            type: String,
            default: null
        },
        contentProps: {
            type: null,
            default: null
        },
        rtl: {
            type: Boolean,
            default: null
        },
        maximizable: {
            type: Boolean,
            default: false
        },
        dismissableMask: {
            type: Boolean,
            default: false
        },
        closable: {
            type: Boolean,
            default: true
        },
        closeOnEscape: {
            type: Boolean,
            default: true
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        baseZIndex: {
            type: Number,
            default: 0
        },
        autoZIndex: {
            type: Boolean,
            default: true
        },
        position: {
            type: String,
            default: 'center'
        },
        breakpoints: {
            type: Object,
            default: null
        },
        draggable: {
            type: Boolean,
            default: true
        },
        keepInViewport: {
            type: Boolean,
            default: true
        },
        minX: {
            type: Number,
            default: 0
        },
        minY: {
            type: Number,
            default: 0
        },
        appendTo: {
            type: String,
            default: 'body'
        },
        closeIcon: {
            type: String,
            default: undefined
        },
        maximizeIcon: {
            type: String,
            default: undefined
        },
        minimizeIcon: {
            type: String,
            default: undefined
        },
        closeButtonProps: {
            type: null,
            default: null
        },
        _instance: null
    },
    provide() {
        return {
            dialogRef: computed(() => this._instance)
        };
    },
    data() {
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
    updated() {
        if (this.visible) {
            this.containerVisible = this.visible;
        }
    },
    beforeUnmount() {
        this.unbindDocumentState();
        this.unbindGlobalListeners();
        this.destroyStyle();

        if (this.mask && this.autoZIndex) {
            ZIndexUtils.clear(this.mask);
        }

        this.container = null;
        this.mask = null;
    },
    mounted() {
        if (this.breakpoints) {
            this.createStyle();
        }
    },
    methods: {
        close() {
            this.$emit('update:visible', false);
        },
        onBeforeEnter(el) {
            el.setAttribute(this.attributeSelector, '');
        },
        onEnter() {
            this.$emit('show');
            this.focus();
            this.enableDocumentSettings();
            this.bindGlobalListeners();

            if (this.autoZIndex) {
                ZIndexUtils.set('modal', this.mask, this.baseZIndex + this.$primevue.config.zIndex.modal);
            }
        },
        onBeforeLeave() {
            if (this.modal) {
                DomHandler.addClass(this.mask, 'p-component-overlay-leave');
            }
        },
        onLeave() {
            this.$emit('hide');
            this.focusableClose = null;
            this.focusableMax = null;
        },
        onAfterLeave() {
            if (this.autoZIndex) {
                ZIndexUtils.clear(this.mask);
            }

            this.containerVisible = false;
            this.unbindDocumentState();
            this.unbindGlobalListeners();
            this.$emit('after-hide');
        },
        onMaskClick(event) {
            if (this.dismissableMask && this.modal && this.mask === event.target) {
                this.close();
            }
        },
        focus() {
            const findFocusableElement = (container) => {
                return container.querySelector('[autofocus]');
            };

            let focusTarget = this.$slots.footer && findFocusableElement(this.footerContainer);

            if (!focusTarget) {
                focusTarget = this.$slots.header && findFocusableElement(this.headerContainer);

                if (!focusTarget) {
                    focusTarget = this.$slots.default && findFocusableElement(this.content);

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
                DomHandler.focus(focusTarget);
            }
        },
        maximize(event) {
            if (this.maximized) {
                this.maximized = false;
                this.$emit('unmaximize', event);
            } else {
                this.maximized = true;
                this.$emit('maximize', event);
            }

            if (!this.modal) {
                if (this.maximized) DomHandler.addClass(document.body, 'p-overflow-hidden');
                else DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }
        },
        enableDocumentSettings() {
            if (this.modal || (this.maximizable && this.maximized)) {
                DomHandler.addClass(document.body, 'p-overflow-hidden');
            }
        },
        unbindDocumentState() {
            if (this.modal || (this.maximizable && this.maximized)) {
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }
        },
        onKeyDown(event) {
            if (event.code === 'Escape' && this.closeOnEscape) {
                this.close();
            }
        },
        bindDocumentKeyDownListener() {
            if (!this.documentKeydownListener) {
                this.documentKeydownListener = this.onKeyDown.bind(this);
                window.document.addEventListener('keydown', this.documentKeydownListener);
            }
        },
        unbindDocumentKeyDownListener() {
            if (this.documentKeydownListener) {
                window.document.removeEventListener('keydown', this.documentKeydownListener);
                this.documentKeydownListener = null;
            }
        },
        getPositionClass() {
            const positions = ['left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'];
            const pos = positions.find((item) => item === this.position);

            return pos ? `p-dialog-${pos}` : '';
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
        footerContainerRef(el) {
            this.footerContainer = el;
        },
        maximizableRef(el) {
            this.maximizableButton = el;
        },
        closeButtonRef(el) {
            this.closeButton = el;
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
                            .p-dialog[${this.attributeSelector}] {
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
        initDrag(event) {
            if (DomHandler.hasClass(event.target, 'p-dialog-header-icon') || DomHandler.hasClass(event.target.parentElement, 'p-dialog-header-icon')) {
                return;
            }

            if (this.draggable) {
                this.dragging = true;
                this.lastPageX = event.pageX;
                this.lastPageY = event.pageY;

                this.container.style.margin = '0';
                DomHandler.addClass(document.body, 'p-unselectable-text');
            }
        },
        bindGlobalListeners() {
            if (this.draggable) {
                this.bindDocumentDragListener();
                this.bindDocumentDragEndListener();
            }

            if (this.closeOnEscape && this.closable) {
                this.bindDocumentKeyDownListener();
            }
        },
        unbindGlobalListeners() {
            this.unbindDocumentDragListener();
            this.unbindDocumentDragEndListener();
            this.unbindDocumentKeyDownListener();
        },
        bindDocumentDragListener() {
            this.documentDragListener = (event) => {
                if (this.dragging) {
                    let width = DomHandler.getOuterWidth(this.container);
                    let height = DomHandler.getOuterHeight(this.container);
                    let deltaX = event.pageX - this.lastPageX;
                    let deltaY = event.pageY - this.lastPageY;
                    let offset = this.container.getBoundingClientRect();
                    let leftPos = offset.left + deltaX;
                    let topPos = offset.top + deltaY;
                    let viewport = DomHandler.getViewport();

                    this.container.style.position = 'fixed';

                    if (this.keepInViewport) {
                        if (leftPos >= this.minX && leftPos + width < viewport.width) {
                            this.lastPageX = event.pageX;
                            this.container.style.left = leftPos + 'px';
                        }

                        if (topPos >= this.minY && topPos + height < viewport.height) {
                            this.lastPageY = event.pageY;
                            this.container.style.top = topPos + 'px';
                        }
                    } else {
                        this.lastPageX = event.pageX;
                        this.container.style.left = leftPos + 'px';
                        this.lastPageY = event.pageY;
                        this.container.style.top = topPos + 'px';
                    }
                }
            };

            window.document.addEventListener('mousemove', this.documentDragListener);
        },
        unbindDocumentDragListener() {
            if (this.documentDragListener) {
                window.document.removeEventListener('mousemove', this.documentDragListener);
                this.documentDragListener = null;
            }
        },
        bindDocumentDragEndListener() {
            this.documentDragEndListener = (event) => {
                if (this.dragging) {
                    this.dragging = false;
                    DomHandler.removeClass(document.body, 'p-unselectable-text');

                    this.$emit('dragend', event);
                }
            };

            window.document.addEventListener('mouseup', this.documentDragEndListener);
        },
        unbindDocumentDragEndListener() {
            if (this.documentDragEndListener) {
                window.document.removeEventListener('mouseup', this.documentDragEndListener);
                this.documentDragEndListener = null;
            }
        }
    },
    computed: {
        maskClass() {
            return ['p-dialog-mask', { 'p-component-overlay p-component-overlay-enter': this.modal }, this.getPositionClass()];
        },
        dialogClass() {
            return [
                'p-dialog p-component',
                {
                    'p-dialog-rtl': this.rtl,
                    'p-dialog-maximized': this.maximizable && this.maximized,
                    'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                    'p-ripple-disabled': this.$primevue.config.ripple === false
                }
            ];
        },
        maximizeIconComponent() {
            return this.maximized ? (this.minimizeIcon ? 'span' : 'WindowMinimizeIcon') : this.maximizeIcon ? 'span' : 'WindowMaximizeIcon';
        },
        maximizeIconClass() {
            const maximizeClasses = this.maximized ? this.minimizeIcon : this.maximizeIcon;

            return `p-dialog-header-maximize-icon ${maximizeClasses}`;
        },
        ariaId() {
            return UniqueComponentId();
        },
        ariaLabelledById() {
            return this.header != null || this.$attrs['aria-labelledby'] !== null ? this.ariaId + '_header' : null;
        },
        closeAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
        },
        attributeSelector() {
            return UniqueComponentId();
        },
        contentStyleClass() {
            return ['p-dialog-content', this.contentClass];
        }
    },
    directives: {
        ripple: Ripple,
        focustrap: FocusTrap
    },
    components: {
        Portal: Portal,
        WindowMinimizeIcon,
        WindowMaximizeIcon,
        TimesIcon
    }
};

const _hoisted_1 = ["aria-labelledby", "aria-modal"];
const _hoisted_2 = ["id"];
const _hoisted_3 = ["autofocus", "tabindex"];
const _hoisted_4 = ["autofocus", "aria-label"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Portal = resolveComponent("Portal");
  const _directive_ripple = resolveDirective("ripple");
  const _directive_focustrap = resolveDirective("focustrap");

  return (openBlock(), createBlock(_component_Portal, { appendTo: $props.appendTo }, {
    default: withCtx(() => [
      ($data.containerVisible)
        ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.maskRef,
            class: $options.maskClass,
            onClick: _cache[3] || (_cache[3] = (...args) => ($options.onMaskClick && $options.onMaskClick(...args)))
          }, _ctx.ptm('mask')), [
            createVNode(Transition, {
              name: "p-dialog",
              onBeforeEnter: $options.onBeforeEnter,
              onEnter: $options.onEnter,
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
                      class: $options.dialogClass,
                      role: "dialog",
                      "aria-labelledby": $options.ariaLabelledById,
                      "aria-modal": $props.modal
                    }, { ..._ctx.$attrs, ..._ctx.ptm('root') }), [
                      ($props.showHeader)
                        ? (openBlock(), createElementBlock("div", mergeProps({
                            key: 0,
                            ref: $options.headerContainerRef,
                            class: "p-dialog-header",
                            onMousedown: _cache[2] || (_cache[2] = (...args) => ($options.initDrag && $options.initDrag(...args)))
                          }, _ctx.ptm('header')), [
                            renderSlot(_ctx.$slots, "header", {}, () => [
                              ($props.header)
                                ? (openBlock(), createElementBlock("span", mergeProps({
                                    key: 0,
                                    id: $options.ariaLabelledById,
                                    class: "p-dialog-title"
                                  }, _ctx.ptm('headerTitle')), toDisplayString($props.header), 17, _hoisted_2))
                                : createCommentVNode("", true)
                            ]),
                            createElementVNode("div", mergeProps({ class: "p-dialog-header-icons" }, _ctx.ptm('headerIcons')), [
                              ($props.maximizable)
                                ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
                                    key: 0,
                                    ref: $options.maximizableRef,
                                    autofocus: $data.focusableMax,
                                    class: "p-dialog-header-icon p-dialog-header-maximize p-link",
                                    onClick: _cache[0] || (_cache[0] = (...args) => ($options.maximize && $options.maximize(...args))),
                                    type: "button",
                                    tabindex: $props.maximizable ? '0' : '-1'
                                  }, _ctx.ptm('maximizableButton')), [
                                    renderSlot(_ctx.$slots, "maximizeicon", { maximized: $data.maximized }, () => [
                                      (openBlock(), createBlock(resolveDynamicComponent($options.maximizeIconComponent), mergeProps({ class: $options.maximizeIconClass }, _ctx.ptm('maximizableIcon')), null, 16, ["class"]))
                                    ])
                                  ], 16, _hoisted_3)), [
                                    [_directive_ripple]
                                  ])
                                : createCommentVNode("", true),
                              ($props.closable)
                                ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
                                    key: 1,
                                    ref: $options.closeButtonRef,
                                    autofocus: $data.focusableClose,
                                    class: "p-dialog-header-icon p-dialog-header-close p-link",
                                    onClick: _cache[1] || (_cache[1] = (...args) => ($options.close && $options.close(...args))),
                                    "aria-label": $options.closeAriaLabel,
                                    type: "button"
                                  }, { ...$props.closeButtonProps, ..._ctx.ptm('closeButton') }), [
                                    renderSlot(_ctx.$slots, "closeicon", {}, () => [
                                      (openBlock(), createBlock(resolveDynamicComponent($props.closeIcon ? 'span' : 'TimesIcon'), mergeProps({
                                        class: ['p-dialog-header-close-icon', $props.closeIcon]
                                      }, _ctx.ptm('closeButtonIcon')), null, 16, ["class"]))
                                    ])
                                  ], 16, _hoisted_4)), [
                                    [_directive_ripple]
                                  ])
                                : createCommentVNode("", true)
                            ], 16)
                          ], 16))
                        : createCommentVNode("", true),
                      createElementVNode("div", mergeProps({
                        ref: $options.contentRef,
                        class: $options.contentStyleClass,
                        style: $props.contentStyle
                      }, { ...$props.contentProps, ..._ctx.ptm('content') }), [
                        renderSlot(_ctx.$slots, "default")
                      ], 16),
                      ($props.footer || _ctx.$slots.footer)
                        ? (openBlock(), createElementBlock("div", mergeProps({
                            key: 1,
                            ref: $options.footerContainerRef,
                            class: "p-dialog-footer"
                          }, _ctx.ptm('footer')), [
                            renderSlot(_ctx.$slots, "footer", {}, () => [
                              createTextVNode(toDisplayString($props.footer), 1)
                            ])
                          ], 16))
                        : createCommentVNode("", true)
                    ], 16, _hoisted_1)), [
                      [_directive_focustrap, { disabled: !$props.modal }]
                    ])
                  : createCommentVNode("", true)
              ]),
              _: 3
            }, 8, ["onBeforeEnter", "onEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
          ], 16))
        : createCommentVNode("", true)
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

var css_248z = "\n.p-dialog-mask {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    pointer-events: none;\n}\n.p-dialog-mask.p-component-overlay {\n    pointer-events: auto;\n}\n.p-dialog {\n    display: flex;\n    flex-direction: column;\n    pointer-events: auto;\n    max-height: 90%;\n    transform: scale(1);\n}\n.p-dialog-content {\n    overflow-y: auto;\n}\n.p-dialog-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex-shrink: 0;\n}\n.p-dialog-footer {\n    flex-shrink: 0;\n}\n.p-dialog .p-dialog-header-icons {\n    display: flex;\n    align-items: center;\n}\n.p-dialog .p-dialog-header-icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n/* Fluid */\n.p-fluid .p-dialog-footer .p-button {\n    width: auto;\n}\n\n/* Animation */\n/* Center */\n.p-dialog-enter-active {\n    transition: all 150ms cubic-bezier(0, 0, 0.2, 1);\n}\n.p-dialog-leave-active {\n    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.p-dialog-enter-from,\n.p-dialog-leave-to {\n    opacity: 0;\n    transform: scale(0.7);\n}\n\n/* Top, Bottom, Left, Right, Top* and Bottom* */\n.p-dialog-top .p-dialog,\n.p-dialog-bottom .p-dialog,\n.p-dialog-left .p-dialog,\n.p-dialog-right .p-dialog,\n.p-dialog-topleft .p-dialog,\n.p-dialog-topright .p-dialog,\n.p-dialog-bottomleft .p-dialog,\n.p-dialog-bottomright .p-dialog {\n    margin: 0.75rem;\n    transform: translate3d(0px, 0px, 0px);\n}\n.p-dialog-top .p-dialog-enter-active,\n.p-dialog-top .p-dialog-leave-active,\n.p-dialog-bottom .p-dialog-enter-active,\n.p-dialog-bottom .p-dialog-leave-active,\n.p-dialog-left .p-dialog-enter-active,\n.p-dialog-left .p-dialog-leave-active,\n.p-dialog-right .p-dialog-enter-active,\n.p-dialog-right .p-dialog-leave-active,\n.p-dialog-topleft .p-dialog-enter-active,\n.p-dialog-topleft .p-dialog-leave-active,\n.p-dialog-topright .p-dialog-enter-active,\n.p-dialog-topright .p-dialog-leave-active,\n.p-dialog-bottomleft .p-dialog-enter-active,\n.p-dialog-bottomleft .p-dialog-leave-active,\n.p-dialog-bottomright .p-dialog-enter-active,\n.p-dialog-bottomright .p-dialog-leave-active {\n    transition: all 0.3s ease-out;\n}\n.p-dialog-top .p-dialog-enter-from,\n.p-dialog-top .p-dialog-leave-to {\n    transform: translate3d(0px, -100%, 0px);\n}\n.p-dialog-bottom .p-dialog-enter-from,\n.p-dialog-bottom .p-dialog-leave-to {\n    transform: translate3d(0px, 100%, 0px);\n}\n.p-dialog-left .p-dialog-enter-from,\n.p-dialog-left .p-dialog-leave-to,\n.p-dialog-topleft .p-dialog-enter-from,\n.p-dialog-topleft .p-dialog-leave-to,\n.p-dialog-bottomleft .p-dialog-enter-from,\n.p-dialog-bottomleft .p-dialog-leave-to {\n    transform: translate3d(-100%, 0px, 0px);\n}\n.p-dialog-right .p-dialog-enter-from,\n.p-dialog-right .p-dialog-leave-to,\n.p-dialog-topright .p-dialog-enter-from,\n.p-dialog-topright .p-dialog-leave-to,\n.p-dialog-bottomright .p-dialog-enter-from,\n.p-dialog-bottomright .p-dialog-leave-to {\n    transform: translate3d(100%, 0px, 0px);\n}\n\n/* Maximize */\n.p-dialog-maximized {\n    -webkit-transition: none;\n    transition: none;\n    transform: none;\n    width: 100vw !important;\n    height: 100vh !important;\n    top: 0px !important;\n    left: 0px !important;\n    max-height: 100%;\n    height: 100%;\n}\n.p-dialog-maximized .p-dialog-content {\n    flex-grow: 1;\n}\n\n/* Position */\n.p-dialog-left {\n    justify-content: flex-start;\n}\n.p-dialog-right {\n    justify-content: flex-end;\n}\n.p-dialog-top {\n    align-items: flex-start;\n}\n.p-dialog-topleft {\n    justify-content: flex-start;\n    align-items: flex-start;\n}\n.p-dialog-topright {\n    justify-content: flex-end;\n    align-items: flex-start;\n}\n.p-dialog-bottom {\n    align-items: flex-end;\n}\n.p-dialog-bottomleft {\n    justify-content: flex-start;\n    align-items: flex-end;\n}\n.p-dialog-bottomright {\n    justify-content: flex-end;\n    align-items: flex-end;\n}\n.p-confirm-dialog .p-dialog-content {\n    display: flex;\n    align-items: center;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
