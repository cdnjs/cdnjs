/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Tag = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    let config = {
      defaultIconPack: "mdi",
      defaultIconComponent: null};

    const mdiIcons = {
      sizes: {
        default: "mdi-24px",
        "is-small": null,
        "is-medium": "mdi-36px",
        "is-large": "mdi-48px"
      },
      iconPrefix: "mdi-"
    };
    const faIcons = () => {
      const faIconPrefix = "fa-";
      return {
        sizes: {
          default: null,
          "is-small": null,
          "is-medium": faIconPrefix + "lg",
          "is-large": faIconPrefix + "2x"
        },
        iconPrefix: faIconPrefix,
        internalIcons: {
          information: "info-circle",
          alert: "exclamation-triangle",
          "alert-circle": "exclamation-circle",
          "chevron-right": "angle-right",
          "chevron-left": "angle-left",
          "chevron-down": "angle-down",
          "eye-off": "eye-slash",
          "menu-down": "caret-down",
          "menu-up": "caret-up",
          "close-circle": "times-circle"
        }
      };
    };
    const getIcons = () => {
      let icons = {
        mdi: mdiIcons,
        fa: faIcons(),
        fas: faIcons(),
        far: faIcons(),
        fad: faIcons(),
        fab: faIcons(),
        fal: faIcons(),
        "fa-solid": faIcons(),
        "fa-regular": faIcons(),
        "fa-light": faIcons(),
        "fa-thin": faIcons(),
        "fa-duotone": faIcons(),
        "fa-brands": faIcons()
      };
      return icons;
    };

    var _sfc_main$2 = vue.defineComponent({
      name: "BIcon",
      props: {
        type: [String, Object],
        component: String,
        pack: String,
        icon: {
          type: String,
          required: true
        },
        size: String,
        customSize: String,
        customClass: String,
        both: Boolean
        // This is used internally to show both MDI and FA icon
      },
      computed: {
        iconConfig() {
          const allIcons = getIcons();
          return allIcons[this.newPack];
        },
        iconPrefix() {
          if (this.iconConfig && this.iconConfig.iconPrefix) {
            return this.iconConfig.iconPrefix;
          }
          return "";
        },
        /*
        * Internal icon name based on the pack.
        * If pack is 'fa', gets the equivalent FA icon name of the MDI,
        * internal icons are always MDI.
        */
        newIcon() {
          return `${this.iconPrefix}${this.getEquivalentIconOf(this.icon)}`;
        },
        newPack() {
          return this.pack || config.defaultIconPack;
        },
        newType() {
          if (!this.type) return;
          let splitType = [];
          if (typeof this.type === "string") {
            splitType = this.type.split("-");
          } else {
            for (const key in this.type) {
              if (this.type[key]) {
                splitType = key.split("-");
                break;
              }
            }
          }
          if (splitType.length <= 1) return;
          const [, ...type] = splitType;
          return `has-text-${type.join("-")}`;
        },
        newCustomSize() {
          return this.customSize || this.customSizeByPack;
        },
        customSizeByPack() {
          if (this.iconConfig && this.iconConfig.sizes) {
            if (this.size && this.iconConfig.sizes[this.size] !== void 0) {
              return this.iconConfig.sizes[this.size];
            } else if (this.iconConfig.sizes.default) {
              return this.iconConfig.sizes.default;
            }
          }
          return null;
        },
        useIconComponent() {
          return this.component || config.defaultIconComponent;
        }
      },
      methods: {
        /*
        * Equivalent icon name of the MDI.
        */
        getEquivalentIconOf(value) {
          if (!this.both) {
            return value;
          }
          if (this.iconConfig == null) {
            return value;
          }
          const maybeInternal = this.iconConfig;
          if (maybeInternal && maybeInternal.internalIcons && maybeInternal.internalIcons[value]) {
            return maybeInternal.internalIcons[value];
          }
          return value;
        }
      }
    });

    var _export_sfc = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key, val] of props) {
        target[key] = val;
      }
      return target;
    };

    function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock(
        "span",
        {
          class: vue.normalizeClass(["icon", [_ctx.newType, _ctx.size]])
        },
        [
          !_ctx.useIconComponent ? (vue.openBlock(), vue.createElementBlock(
            "i",
            {
              key: 0,
              class: vue.normalizeClass([_ctx.newPack, _ctx.newIcon, _ctx.newCustomSize, _ctx.customClass])
            },
            null,
            2
            /* CLASS */
          )) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.useIconComponent), {
            key: 1,
            icon: [_ctx.newPack, _ctx.newIcon],
            size: _ctx.newCustomSize,
            class: vue.normalizeClass([_ctx.customClass])
          }, null, 8, ["icon", "size", "class"]))
        ],
        2
        /* CLASS */
      );
    }
    var BIcon = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);

    var _sfc_main$1 = vue.defineComponent({
      name: "BTag",
      components: { BIcon },
      props: {
        attached: Boolean,
        closable: Boolean,
        type: [String, Object],
        size: String,
        rounded: Boolean,
        disabled: Boolean,
        ellipsis: Boolean,
        tabstop: {
          type: Boolean,
          default: true
        },
        ariaCloseLabel: String,
        icon: String,
        iconType: String,
        iconPack: String,
        closeType: String,
        closeIcon: String,
        closeIconPack: String,
        closeIconType: String
      },
      emits: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        click: (_) => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        close: (_) => true
      },
      computed: {
        // setting a boolean attribute `false` does not remove it on Vue 3.
        // `null` or `undefined` has to be given to remove it.
        disabledOrUndefined() {
          return this.disabled || void 0;
        }
      },
      methods: {
        /*
        * Emit close event when delete button is clicked
        * or delete key is pressed.
        */
        close(event) {
          if (this.disabled) return;
          this.$emit("close", event);
        },
        /*
        * Emit click event when tag is clicked.
        */
        click(event) {
          if (this.disabled) return;
          this.$emit("click", event);
        }
      }
    });

    const _hoisted_1 = {
      key: 0,
      class: "tags has-addons inline-tags"
    };
    const _hoisted_2 = ["aria-label", "tabindex", "disabled"];
    const _hoisted_3 = ["aria-label", "disabled", "tabindex"];
    function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");
      return _ctx.attached && _ctx.closable ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        vue.createElementVNode(
          "span",
          {
            class: vue.normalizeClass(["tag", [_ctx.type, _ctx.size, { "is-rounded": _ctx.rounded }]])
          },
          [
            _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
              key: 0,
              icon: _ctx.icon,
              size: _ctx.size,
              type: _ctx.iconType,
              pack: _ctx.iconPack
            }, null, 8, ["icon", "size", "type", "pack"])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "span",
              {
                class: vue.normalizeClass({ "has-ellipsis": _ctx.ellipsis }),
                onClick: _cache[0] || (_cache[0] = (...args) => _ctx.click && _ctx.click(...args))
              },
              [
                vue.renderSlot(_ctx.$slots, "default")
              ],
              2
              /* CLASS */
            )
          ],
          2
          /* CLASS */
        ),
        vue.createElementVNode("a", {
          class: vue.normalizeClass(["tag", [
            _ctx.size,
            _ctx.closeType,
            { "is-rounded": _ctx.rounded },
            _ctx.closeIcon ? "has-delete-icon" : "is-delete"
          ]]),
          role: "button",
          "aria-label": _ctx.ariaCloseLabel,
          tabindex: _ctx.tabstop ? 0 : void 0,
          disabled: _ctx.disabledOrUndefined,
          onClick: _cache[1] || (_cache[1] = (...args) => _ctx.close && _ctx.close(...args)),
          onKeyup: _cache[2] || (_cache[2] = vue.withKeys(vue.withModifiers((...args) => _ctx.close && _ctx.close(...args), ["prevent"]), ["delete"]))
        }, [
          _ctx.closeIcon ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 0,
            "custom-class": "",
            icon: _ctx.closeIcon,
            size: _ctx.size,
            type: _ctx.closeIconType,
            pack: _ctx.closeIconPack
          }, null, 8, ["icon", "size", "type", "pack"])) : vue.createCommentVNode("v-if", true)
        ], 42, _hoisted_2)
      ])) : (vue.openBlock(), vue.createElementBlock(
        "span",
        {
          key: 1,
          class: vue.normalizeClass(["tag", [_ctx.type, _ctx.size, { "is-rounded": _ctx.rounded }]])
        },
        [
          _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 0,
            icon: _ctx.icon,
            size: _ctx.size,
            type: _ctx.iconType,
            pack: _ctx.iconPack
          }, null, 8, ["icon", "size", "type", "pack"])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "span",
            {
              class: vue.normalizeClass({ "has-ellipsis": _ctx.ellipsis }),
              onClick: _cache[3] || (_cache[3] = (...args) => _ctx.click && _ctx.click(...args))
            },
            [
              vue.renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          ),
          _ctx.closable ? (vue.openBlock(), vue.createElementBlock("a", {
            key: 1,
            role: "button",
            "aria-label": _ctx.ariaCloseLabel,
            class: vue.normalizeClass(["delete is-small", _ctx.closeType]),
            disabled: _ctx.disabledOrUndefined,
            tabindex: _ctx.tabstop ? 0 : void 0,
            onClick: _cache[4] || (_cache[4] = (...args) => _ctx.close && _ctx.close(...args)),
            onKeyup: _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers((...args) => _ctx.close && _ctx.close(...args), ["prevent"]), ["delete"]))
          }, null, 42, _hoisted_3)) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      ));
    }
    var Tag = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

    var _sfc_main = vue.defineComponent({
      name: "BTaglist",
      props: {
        attached: Boolean
      }
    });

    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(["tags", { "has-addons": _ctx.attached }])
        },
        [
          vue.renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      );
    }
    var Taglist = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Tag);
        registerComponent(Vue, Taglist);
      }
    };

    exports.BTag = Tag;
    exports.BTaglist = Taglist;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
