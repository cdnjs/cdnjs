import BaseComponent from 'primevue/basecomponent';
import FocusTrap from 'primevue/focustrap';
import EyeIcon from 'primevue/icons/eye';
import RefreshIcon from 'primevue/icons/refresh';
import SearchMinusIcon from 'primevue/icons/searchminus';
import SearchPlusIcon from 'primevue/icons/searchplus';
import TimesIcon from 'primevue/icons/times';
import UndoIcon from 'primevue/icons/undo';
import Portal from 'primevue/portal';
import { ZIndexUtils, DomHandler } from 'primevue/utils';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, mergeProps, renderSlot, normalizeClass, normalizeStyle, createElementVNode, createBlock, resolveDynamicComponent, createCommentVNode, createVNode, withCtx, withDirectives, normalizeProps, guardReactiveProps, Transition } from 'vue';

var script = {
    name: 'Image',
    extends: BaseComponent,
    inheritAttrs: false,
    emits: ['show', 'hide', 'error'],
    props: {
        preview: {
            type: Boolean,
            default: false
        },
        class: {
            type: null,
            default: null
        },
        style: {
            type: null,
            default: null
        },
        imageStyle: {
            type: null,
            default: null
        },
        imageClass: {
            type: null,
            default: null
        },
        previewButtonProps: {
            type: null,
            default: null
        },
        indicatorIcon: {
            type: String,
            default: undefined
        },
        zoomInDisabled: {
            type: Boolean,
            default: false
        },
        zoomOutDisabled: {
            type: Boolean,
            default: false
        }
    },
    mask: null,
    data() {
        return {
            maskVisible: false,
            previewVisible: false,
            rotate: 0,
            scale: 1
        };
    },
    beforeUnmount() {
        if (this.mask) {
            ZIndexUtils.clear(this.container);
        }
    },
    methods: {
        maskRef(el) {
            this.mask = el;
        },
        toolbarRef(el) {
            this.toolbarRef = el;
        },
        onImageClick() {
            if (this.preview) {
                this.maskVisible = true;
                setTimeout(() => {
                    this.previewVisible = true;
                }, 25);
            }
        },
        onPreviewImageClick() {
            this.previewClick = true;
        },
        onMaskClick(event) {
            const isActionbarTarget = [event.target.classList].includes('p-image-action') || event.target.closest('.p-image-action');

            if (isActionbarTarget) {
                return;
            }

            if (!this.previewClick) {
                this.previewVisible = false;
                this.rotate = 0;
                this.scale = 1;
            }

            this.previewClick = false;
        },
        onMaskKeydown(event) {
            switch (event.code) {
                case 'Escape':
                    this.onMaskClick();
                    setTimeout(() => {
                        DomHandler.focus(this.$refs.previewButton);
                    }, 25);
                    event.preventDefault();

                    break;
            }
        },
        onError() {
            this.$emit('error');
        },
        rotateRight() {
            this.rotate += 90;
            this.previewClick = true;
        },
        rotateLeft() {
            this.rotate -= 90;
            this.previewClick = true;
        },
        zoomIn() {
            this.scale = this.scale + 0.1;
            this.previewClick = true;
        },
        zoomOut() {
            this.scale = this.scale - 0.1;
            this.previewClick = true;
        },
        onBeforeEnter() {
            ZIndexUtils.set('modal', this.mask, this.$primevue.config.zIndex.modal);
        },
        onEnter() {
            this.focus();
            this.$emit('show');
        },
        onBeforeLeave() {
            DomHandler.addClass(this.mask, 'p-component-overlay-leave');
        },
        onLeave() {
            this.$emit('hide');
        },
        onAfterLeave(el) {
            ZIndexUtils.clear(el);
            this.maskVisible = false;
        },
        focus() {
            let focusTarget = this.mask.querySelector('[autofocus]');

            if (focusTarget) {
                focusTarget.focus();
            }
        },
        hidePreview() {
            this.previewVisible = false;
            this.rotate = 0;
            this.scale = 1;
        }
    },
    computed: {
        containerClass() {
            return [
                'p-image p-component',
                this.class,
                {
                    'p-image-preview-container': this.preview
                }
            ];
        },
        maskClass() {
            return ['p-image-mask p-component-overlay p-component-overlay-enter'];
        },
        rotateClass() {
            return 'p-image-preview-rotate-' + this.rotate;
        },
        imagePreviewStyle() {
            return { transform: 'rotate(' + this.rotate + 'deg) scale(' + this.scale + ')' };
        },
        isZoomInDisabled() {
            return this.zoomInDisabled || this.scale >= 1.5;
        },
        isZoomOutDisabled() {
            return this.zoomOutDisabled || this.scale <= 0.5;
        },
        rightAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.rotateRight : undefined;
        },
        leftAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.rotateLeft : undefined;
        },
        zoomInAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.zoomIn : undefined;
        },
        zoomOutAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.zoomOut : undefined;
        },
        closeAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
        }
    },
    components: {
        Portal: Portal,
        EyeIcon: EyeIcon,
        RefreshIcon: RefreshIcon,
        UndoIcon: UndoIcon,
        SearchMinusIcon: SearchMinusIcon,
        SearchPlusIcon: SearchPlusIcon,
        TimesIcon: TimesIcon
    },
    directives: {
        focustrap: FocusTrap
    }
};

const _hoisted_1 = ["aria-modal"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["aria-label"];
const _hoisted_4 = ["disabled", "aria-label"];
const _hoisted_5 = ["disabled", "aria-label"];
const _hoisted_6 = ["aria-label"];
const _hoisted_7 = ["src"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_RefreshIcon = resolveComponent("RefreshIcon");
  const _component_UndoIcon = resolveComponent("UndoIcon");
  const _component_SearchMinusIcon = resolveComponent("SearchMinusIcon");
  const _component_SearchPlusIcon = resolveComponent("SearchPlusIcon");
  const _component_TimesIcon = resolveComponent("TimesIcon");
  const _component_Portal = resolveComponent("Portal");
  const _directive_focustrap = resolveDirective("focustrap");

  return (openBlock(), createElementBlock("span", mergeProps({
    class: $options.containerClass,
    style: $props.style
  }, _ctx.ptm('root')), [
    renderSlot(_ctx.$slots, "image", {
      class: normalizeClass($props.imageClass),
      style: normalizeStyle($props.imageStyle),
      onError: $options.onError
    }, () => [
      createElementVNode("img", mergeProps({
        style: $props.imageStyle,
        class: $props.imageClass,
        onError: _cache[0] || (_cache[0] = (...args) => ($options.onError && $options.onError(...args)))
      }, { ..._ctx.$attrs, ..._ctx.ptm('image') }), null, 16)
    ]),
    ($props.preview)
      ? (openBlock(), createElementBlock("button", mergeProps({
          key: 0,
          ref: "previewButton",
          class: "p-image-preview-indicator",
          onClick: _cache[1] || (_cache[1] = (...args) => ($options.onImageClick && $options.onImageClick(...args)))
        }, { ...$props.previewButtonProps, ..._ctx.ptm('button') }), [
          renderSlot(_ctx.$slots, "indicatoricon", {}, () => [
            (openBlock(), createBlock(resolveDynamicComponent($props.indicatorIcon ? 'i' : 'EyeIcon'), mergeProps({ class: "p-image-preview-icon" }, _ctx.ptm('icon')), null, 16))
          ])
        ], 16))
      : createCommentVNode("", true),
    createVNode(_component_Portal, null, {
      default: withCtx(() => [
        ($data.maskVisible)
          ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              ref: $options.maskRef,
              role: "dialog",
              class: $options.maskClass,
              "aria-modal": $data.maskVisible,
              onClick: _cache[8] || (_cache[8] = (...args) => ($options.onMaskClick && $options.onMaskClick(...args))),
              onKeydown: _cache[9] || (_cache[9] = (...args) => ($options.onMaskKeydown && $options.onMaskKeydown(...args)))
            }, _ctx.ptm('mask')), [
              createElementVNode("div", mergeProps({ class: "p-image-toolbar" }, _ctx.ptm('toolbar')), [
                createElementVNode("button", mergeProps({
                  class: "p-image-action p-link",
                  onClick: _cache[2] || (_cache[2] = (...args) => ($options.rotateRight && $options.rotateRight(...args))),
                  type: "button",
                  "aria-label": $options.rightAriaLabel
                }, _ctx.ptm('rotateRightButton')), [
                  renderSlot(_ctx.$slots, "refresh", {}, () => [
                    createVNode(_component_RefreshIcon, normalizeProps(guardReactiveProps(_ctx.ptm('rotateRightIcon'))), null, 16)
                  ])
                ], 16, _hoisted_2),
                createElementVNode("button", mergeProps({
                  class: "p-image-action p-link",
                  onClick: _cache[3] || (_cache[3] = (...args) => ($options.rotateLeft && $options.rotateLeft(...args))),
                  type: "button",
                  "aria-label": $options.leftAriaLabel
                }, _ctx.ptm('rotateLeftButton')), [
                  renderSlot(_ctx.$slots, "undo", {}, () => [
                    createVNode(_component_UndoIcon, normalizeProps(guardReactiveProps(_ctx.ptm('rotateLeftIcon'))), null, 16)
                  ])
                ], 16, _hoisted_3),
                createElementVNode("button", mergeProps({
                  class: ['p-image-action p-link', { 'p-disabled': $options.isZoomOutDisabled }],
                  onClick: _cache[4] || (_cache[4] = (...args) => ($options.zoomOut && $options.zoomOut(...args))),
                  type: "button",
                  disabled: $options.isZoomOutDisabled,
                  "aria-label": $options.zoomOutAriaLabel
                }, _ctx.ptm('zoomOutButton')), [
                  renderSlot(_ctx.$slots, "zoomout", {}, () => [
                    createVNode(_component_SearchMinusIcon, normalizeProps(guardReactiveProps(_ctx.ptm('zoomOutIcon'))), null, 16)
                  ])
                ], 16, _hoisted_4),
                createElementVNode("button", mergeProps({
                  class: ['p-image-action p-link', { 'p-disabled': $options.isZoomInDisabled }],
                  onClick: _cache[5] || (_cache[5] = (...args) => ($options.zoomIn && $options.zoomIn(...args))),
                  type: "button",
                  disabled: $options.isZoomInDisabled,
                  "aria-label": $options.zoomInAriaLabel
                }, _ctx.ptm('zoomInButton')), [
                  renderSlot(_ctx.$slots, "zoomin", {}, () => [
                    createVNode(_component_SearchPlusIcon, normalizeProps(guardReactiveProps(_ctx.ptm('zoomInIcon'))), null, 16)
                  ])
                ], 16, _hoisted_5),
                createElementVNode("button", mergeProps({
                  class: "p-image-action p-link",
                  type: "button",
                  onClick: _cache[6] || (_cache[6] = (...args) => ($options.hidePreview && $options.hidePreview(...args))),
                  "aria-label": $options.closeAriaLabel,
                  autofocus: ""
                }, _ctx.ptm('closeButton')), [
                  renderSlot(_ctx.$slots, "close", {}, () => [
                    createVNode(_component_TimesIcon, normalizeProps(guardReactiveProps(_ctx.ptm('closeIcon'))), null, 16)
                  ])
                ], 16, _hoisted_6)
              ], 16),
              createVNode(Transition, {
                name: "p-image-preview",
                onBeforeEnter: $options.onBeforeEnter,
                onEnter: $options.onEnter,
                onLeave: $options.onLeave,
                onBeforeLeave: $options.onBeforeLeave,
                onAfterLeave: $options.onAfterLeave
              }, {
                default: withCtx(() => [
                  ($data.previewVisible)
                    ? (openBlock(), createElementBlock("div", normalizeProps(mergeProps({ key: 0 }, _ctx.ptm('previewContainer'))), [
                        renderSlot(_ctx.$slots, "preview", {
                          class: "p-image-preview",
                          style: normalizeStyle($options.imagePreviewStyle),
                          onClick: $options.onPreviewImageClick
                        }, () => [
                          createElementVNode("img", mergeProps({
                            src: _ctx.$attrs.src,
                            class: "p-image-preview",
                            style: $options.imagePreviewStyle,
                            onClick: _cache[7] || (_cache[7] = (...args) => ($options.onPreviewImageClick && $options.onPreviewImageClick(...args)))
                          }, _ctx.ptm('preview')), null, 16, _hoisted_7)
                        ])
                      ], 16))
                    : createCommentVNode("", true)
                ]),
                _: 3
              }, 8, ["onBeforeEnter", "onEnter", "onLeave", "onBeforeLeave", "onAfterLeave"])
            ], 16, _hoisted_1)), [
              [_directive_focustrap]
            ])
          : createCommentVNode("", true)
      ]),
      _: 3
    })
  ], 16))
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

var css_248z = "\n.p-image-mask {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.p-image-preview-container {\n    position: relative;\n    display: inline-block;\n}\n.p-image-preview-indicator {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    opacity: 0;\n    transition: opacity 0.3s;\n}\n.p-image-preview-container:hover > .p-image-preview-indicator {\n    opacity: 1;\n    cursor: pointer;\n}\n.p-image-preview-container > img {\n    cursor: pointer;\n}\n.p-image-toolbar {\n    position: absolute;\n    top: 0;\n    right: 0;\n    display: flex;\n}\n.p-image-action.p-link {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n.p-image-preview {\n    transition: transform 0.15s;\n    max-width: 100vw;\n    max-height: 100vh;\n}\n.p-image-preview-enter-active {\n    transition: all 150ms cubic-bezier(0, 0, 0.2, 1);\n}\n.p-image-preview-leave-active {\n    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.p-image-preview-enter-from,\n.p-image-preview-leave-to {\n    opacity: 0;\n    transform: scale(0.7);\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
