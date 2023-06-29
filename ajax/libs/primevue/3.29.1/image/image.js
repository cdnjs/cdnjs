this.primevue = this.primevue || {};
this.primevue.image = (function (BaseComponent, FocusTrap, EyeIcon, RefreshIcon, SearchMinusIcon, SearchPlusIcon, TimesIcon, UndoIcon, Portal, utils, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
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
        extends: BaseComponent__default["default"],
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
    const _hoisted_2 = ["aria-label"];
    const _hoisted_3 = ["aria-label"];
    const _hoisted_4 = ["disabled", "aria-label"];
    const _hoisted_5 = ["disabled", "aria-label"];
    const _hoisted_6 = ["aria-label"];
    const _hoisted_7 = ["src"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_RefreshIcon = vue.resolveComponent("RefreshIcon");
      const _component_UndoIcon = vue.resolveComponent("UndoIcon");
      const _component_SearchMinusIcon = vue.resolveComponent("SearchMinusIcon");
      const _component_SearchPlusIcon = vue.resolveComponent("SearchPlusIcon");
      const _component_TimesIcon = vue.resolveComponent("TimesIcon");
      const _component_Portal = vue.resolveComponent("Portal");
      const _directive_focustrap = vue.resolveDirective("focustrap");

      return (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
        class: $options.containerClass,
        style: $props.style
      }, _ctx.ptm('root')), [
        vue.renderSlot(_ctx.$slots, "image", {
          class: vue.normalizeClass($props.imageClass),
          style: vue.normalizeStyle($props.imageStyle),
          onError: $options.onError
        }, () => [
          vue.createElementVNode("img", vue.mergeProps({
            style: $props.imageStyle,
            class: $props.imageClass,
            onError: _cache[0] || (_cache[0] = (...args) => ($options.onError && $options.onError(...args)))
          }, { ..._ctx.$attrs, ..._ctx.ptm('image') }), null, 16)
        ]),
        ($props.preview)
          ? (vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
              key: 0,
              ref: "previewButton",
              class: "p-image-preview-indicator",
              onClick: _cache[1] || (_cache[1] = (...args) => ($options.onImageClick && $options.onImageClick(...args)))
            }, { ...$props.previewButtonProps, ..._ctx.ptm('button') }), [
              vue.renderSlot(_ctx.$slots, "indicatoricon", {}, () => [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.indicatorIcon ? 'i' : 'EyeIcon'), vue.mergeProps({ class: "p-image-preview-icon" }, _ctx.ptm('icon')), null, 16))
              ])
            ], 16))
          : vue.createCommentVNode("", true),
        vue.createVNode(_component_Portal, null, {
          default: vue.withCtx(() => [
            ($data.maskVisible)
              ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                  key: 0,
                  ref: $options.maskRef,
                  role: "dialog",
                  class: $options.maskClass,
                  "aria-modal": $data.maskVisible,
                  onClick: _cache[8] || (_cache[8] = (...args) => ($options.onMaskClick && $options.onMaskClick(...args))),
                  onKeydown: _cache[9] || (_cache[9] = (...args) => ($options.onMaskKeydown && $options.onMaskKeydown(...args)))
                }, _ctx.ptm('mask')), [
                  vue.createElementVNode("div", vue.mergeProps({ class: "p-image-toolbar" }, _ctx.ptm('toolbar')), [
                    vue.createElementVNode("button", vue.mergeProps({
                      class: "p-image-action p-link",
                      onClick: _cache[2] || (_cache[2] = (...args) => ($options.rotateRight && $options.rotateRight(...args))),
                      type: "button",
                      "aria-label": $options.rightAriaLabel
                    }, _ctx.ptm('rotateRightButton')), [
                      vue.renderSlot(_ctx.$slots, "refresh", {}, () => [
                        vue.createVNode(_component_RefreshIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('rotateRightIcon'))), null, 16)
                      ])
                    ], 16, _hoisted_2),
                    vue.createElementVNode("button", vue.mergeProps({
                      class: "p-image-action p-link",
                      onClick: _cache[3] || (_cache[3] = (...args) => ($options.rotateLeft && $options.rotateLeft(...args))),
                      type: "button",
                      "aria-label": $options.leftAriaLabel
                    }, _ctx.ptm('rotateLeftButton')), [
                      vue.renderSlot(_ctx.$slots, "undo", {}, () => [
                        vue.createVNode(_component_UndoIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('rotateLeftIcon'))), null, 16)
                      ])
                    ], 16, _hoisted_3),
                    vue.createElementVNode("button", vue.mergeProps({
                      class: ['p-image-action p-link', { 'p-disabled': $options.isZoomOutDisabled }],
                      onClick: _cache[4] || (_cache[4] = (...args) => ($options.zoomOut && $options.zoomOut(...args))),
                      type: "button",
                      disabled: $options.isZoomOutDisabled,
                      "aria-label": $options.zoomOutAriaLabel
                    }, _ctx.ptm('zoomOutButton')), [
                      vue.renderSlot(_ctx.$slots, "zoomout", {}, () => [
                        vue.createVNode(_component_SearchMinusIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('zoomOutIcon'))), null, 16)
                      ])
                    ], 16, _hoisted_4),
                    vue.createElementVNode("button", vue.mergeProps({
                      class: ['p-image-action p-link', { 'p-disabled': $options.isZoomInDisabled }],
                      onClick: _cache[5] || (_cache[5] = (...args) => ($options.zoomIn && $options.zoomIn(...args))),
                      type: "button",
                      disabled: $options.isZoomInDisabled,
                      "aria-label": $options.zoomInAriaLabel
                    }, _ctx.ptm('zoomInButton')), [
                      vue.renderSlot(_ctx.$slots, "zoomin", {}, () => [
                        vue.createVNode(_component_SearchPlusIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('zoomInIcon'))), null, 16)
                      ])
                    ], 16, _hoisted_5),
                    vue.createElementVNode("button", vue.mergeProps({
                      class: "p-image-action p-link",
                      type: "button",
                      onClick: _cache[6] || (_cache[6] = (...args) => ($options.hidePreview && $options.hidePreview(...args))),
                      "aria-label": $options.closeAriaLabel,
                      autofocus: ""
                    }, _ctx.ptm('closeButton')), [
                      vue.renderSlot(_ctx.$slots, "close", {}, () => [
                        vue.createVNode(_component_TimesIcon, vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('closeIcon'))), null, 16)
                      ])
                    ], 16, _hoisted_6)
                  ], 16),
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
                        ? (vue.openBlock(), vue.createElementBlock("div", vue.normalizeProps(vue.mergeProps({ key: 0 }, _ctx.ptm('previewContainer'))), [
                            vue.renderSlot(_ctx.$slots, "preview", {
                              class: "p-image-preview",
                              style: vue.normalizeStyle($options.imagePreviewStyle),
                              onClick: $options.onPreviewImageClick
                            }, () => [
                              vue.createElementVNode("img", vue.mergeProps({
                                src: _ctx.$attrs.src,
                                class: "p-image-preview",
                                style: $options.imagePreviewStyle,
                                onClick: _cache[7] || (_cache[7] = (...args) => ($options.onPreviewImageClick && $options.onPreviewImageClick(...args)))
                              }, _ctx.ptm('preview')), null, 16, _hoisted_7)
                            ])
                          ], 16))
                        : vue.createCommentVNode("", true)
                    ]),
                    _: 3
                  }, 8, ["onBeforeEnter", "onEnter", "onLeave", "onBeforeLeave", "onAfterLeave"])
                ], 16, _hoisted_1)), [
                  [_directive_focustrap]
                ])
              : vue.createCommentVNode("", true)
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

    return script;

})(primevue.basecomponent, primevue.focustrap, primevue.icons.eye, primevue.icons.refresh, primevue.icons.searchminus, primevue.icons.searchplus, primevue.icons.times, primevue.icons.undo, primevue.portal, primevue.utils, Vue);
