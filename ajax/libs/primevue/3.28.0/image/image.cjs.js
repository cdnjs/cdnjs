'use strict';

var FocusTrap = require('primevue/focustrap');
var EyeIcon = require('primevue/icons/eye');
var RefreshIcon = require('primevue/icons/refresh');
var SearchMinusIcon = require('primevue/icons/searchminus');
var SearchPlusIcon = require('primevue/icons/searchplus');
var TimesIcon = require('primevue/icons/times');
var UndoIcon = require('primevue/icons/undo');
var Portal = require('primevue/portal');
var utils = require('primevue/utils');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);
var EyeIcon__default = /*#__PURE__*/_interopDefaultLegacy(EyeIcon);
var RefreshIcon__default = /*#__PURE__*/_interopDefaultLegacy(RefreshIcon);
var SearchMinusIcon__default = /*#__PURE__*/_interopDefaultLegacy(SearchMinusIcon);
var SearchPlusIcon__default = /*#__PURE__*/_interopDefaultLegacy(SearchPlusIcon);
var TimesIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesIcon);
var UndoIcon__default = /*#__PURE__*/_interopDefaultLegacy(UndoIcon);
var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);

var script = {
    name: 'Image',
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
            utils.ZIndexUtils.clear(this.container);
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
        onMaskClick() {
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
                        utils.DomHandler.focus(this.$refs.previewButton);
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
            utils.ZIndexUtils.set('modal', this.mask, this.$primevue.config.zIndex.modal);
        },
        onEnter() {
            this.focus();
            this.$emit('show');
        },
        onBeforeLeave() {
            utils.DomHandler.addClass(this.mask, 'p-component-overlay-leave');
        },
        onLeave() {
            this.$emit('hide');
        },
        onAfterLeave(el) {
            utils.ZIndexUtils.clear(el);
            this.maskVisible = false;
        },
        focus() {
            let focusTarget = this.mask.querySelector('[autofocus]');

            if (focusTarget) {
                focusTarget.focus();
            }
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
        zoomDisabled() {
            return this.scale <= 0.5 || this.scale >= 1.5;
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
        Portal: Portal__default["default"],
        EyeIcon: EyeIcon__default["default"],
        RefreshIcon: RefreshIcon__default["default"],
        UndoIcon: UndoIcon__default["default"],
        SearchMinusIcon: SearchMinusIcon__default["default"],
        SearchPlusIcon: SearchPlusIcon__default["default"],
        TimesIcon: TimesIcon__default["default"]
    },
    directives: {
        focustrap: FocusTrap__default["default"]
    }
};

const _hoisted_1 = ["aria-modal"];
const _hoisted_2 = { class: "p-image-toolbar" };
const _hoisted_3 = ["aria-label"];
const _hoisted_4 = ["aria-label"];
const _hoisted_5 = ["disabled", "aria-label"];
const _hoisted_6 = ["disabled", "aria-label"];
const _hoisted_7 = ["aria-label"];
const _hoisted_8 = { key: 0 };
const _hoisted_9 = ["src"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_RefreshIcon = vue.resolveComponent("RefreshIcon");
  const _component_UndoIcon = vue.resolveComponent("UndoIcon");
  const _component_SearchMinusIcon = vue.resolveComponent("SearchMinusIcon");
  const _component_SearchPlusIcon = vue.resolveComponent("SearchPlusIcon");
  const _component_TimesIcon = vue.resolveComponent("TimesIcon");
  const _component_Portal = vue.resolveComponent("Portal");
  const _directive_focustrap = vue.resolveDirective("focustrap");

  return (vue.openBlock(), vue.createElementBlock("span", {
    class: vue.normalizeClass($options.containerClass),
    style: vue.normalizeStyle($props.style)
  }, [
    vue.createElementVNode("img", vue.mergeProps(_ctx.$attrs, {
      style: $props.imageStyle,
      class: $props.imageClass,
      onError: _cache[0] || (_cache[0] = (...args) => ($options.onError && $options.onError(...args)))
    }), null, 16),
    ($props.preview)
      ? (vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
          key: 0,
          ref: "previewButton",
          class: "p-image-preview-indicator",
          onClick: _cache[1] || (_cache[1] = (...args) => ($options.onImageClick && $options.onImageClick(...args)))
        }, $props.previewButtonProps), [
          vue.renderSlot(_ctx.$slots, "indicatoricon", {}, () => [
            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.indicatorIcon ? 'i' : 'EyeIcon'), { class: "p-image-preview-icon" }))
          ])
        ], 16))
      : vue.createCommentVNode("", true),
    vue.createVNode(_component_Portal, null, {
      default: vue.withCtx(() => [
        ($data.maskVisible)
          ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              ref: $options.maskRef,
              role: "dialog",
              class: vue.normalizeClass($options.maskClass),
              "aria-modal": $data.maskVisible,
              onClick: _cache[8] || (_cache[8] = (...args) => ($options.onMaskClick && $options.onMaskClick(...args))),
              onKeydown: _cache[9] || (_cache[9] = (...args) => ($options.onMaskKeydown && $options.onMaskKeydown(...args)))
            }, [
              vue.createElementVNode("div", _hoisted_2, [
                vue.createElementVNode("button", {
                  class: "p-image-action p-link",
                  onClick: _cache[2] || (_cache[2] = (...args) => ($options.rotateRight && $options.rotateRight(...args))),
                  type: "button",
                  "aria-label": $options.rightAriaLabel
                }, [
                  vue.renderSlot(_ctx.$slots, "refresh", {}, () => [
                    vue.createVNode(_component_RefreshIcon)
                  ])
                ], 8, _hoisted_3),
                vue.createElementVNode("button", {
                  class: "p-image-action p-link",
                  onClick: _cache[3] || (_cache[3] = (...args) => ($options.rotateLeft && $options.rotateLeft(...args))),
                  type: "button",
                  "aria-label": $options.leftAriaLabel
                }, [
                  vue.renderSlot(_ctx.$slots, "undo", {}, () => [
                    vue.createVNode(_component_UndoIcon)
                  ])
                ], 8, _hoisted_4),
                vue.createElementVNode("button", {
                  class: "p-image-action p-link",
                  onClick: _cache[4] || (_cache[4] = (...args) => ($options.zoomOut && $options.zoomOut(...args))),
                  type: "button",
                  disabled: $options.zoomDisabled,
                  "aria-label": $options.zoomOutAriaLabel
                }, [
                  vue.renderSlot(_ctx.$slots, "zoomout", {}, () => [
                    vue.createVNode(_component_SearchMinusIcon)
                  ])
                ], 8, _hoisted_5),
                vue.createElementVNode("button", {
                  class: "p-image-action p-link",
                  onClick: _cache[5] || (_cache[5] = (...args) => ($options.zoomIn && $options.zoomIn(...args))),
                  type: "button",
                  disabled: $options.zoomDisabled,
                  "aria-label": $options.zoomInAriaLabel
                }, [
                  vue.renderSlot(_ctx.$slots, "zoomin", {}, () => [
                    vue.createVNode(_component_SearchPlusIcon)
                  ])
                ], 8, _hoisted_6),
                vue.createElementVNode("button", {
                  class: "p-image-action p-link",
                  type: "button",
                  onClick: _cache[6] || (_cache[6] = (...args) => (_ctx.hidePreview && _ctx.hidePreview(...args))),
                  "aria-label": $options.closeAriaLabel,
                  autofocus: ""
                }, [
                  vue.renderSlot(_ctx.$slots, "close", {}, () => [
                    vue.createVNode(_component_TimesIcon)
                  ])
                ], 8, _hoisted_7)
              ]),
              vue.createVNode(vue.Transition, {
                name: "p-image-preview",
                onBeforeEnter: $options.onBeforeEnter,
                onEnter: $options.onEnter,
                onLeave: $options.onLeave,
                onBeforeLeave: $options.onBeforeLeave,
                onAfterLeave: $options.onAfterLeave
              }, {
                default: vue.withCtx(() => [
                  ($data.previewVisible)
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8, [
                        vue.createElementVNode("img", {
                          src: _ctx.$attrs.src,
                          class: "p-image-preview",
                          style: vue.normalizeStyle($options.imagePreviewStyle),
                          onClick: _cache[7] || (_cache[7] = (...args) => ($options.onPreviewImageClick && $options.onPreviewImageClick(...args)))
                        }, null, 12, _hoisted_9)
                      ]))
                    : vue.createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["onBeforeEnter", "onEnter", "onLeave", "onBeforeLeave", "onAfterLeave"])
            ], 42, _hoisted_1)), [
              [_directive_focustrap]
            ])
          : vue.createCommentVNode("", true)
      ]),
      _: 3
    })
  ], 6))
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

module.exports = script;
