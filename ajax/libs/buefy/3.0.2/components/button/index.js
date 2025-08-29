/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Button = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    let config = {
      defaultIconPack: "mdi",
      defaultIconComponent: null,
      defaultButtonRounded: false,
      defaultLinkTags: [
        "a",
        "button",
        "input",
        "router-link",
        "nuxt-link",
        "n-link",
        "RouterLink",
        "NuxtLink",
        "NLink"
      ]};

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

    var _sfc_main$1 = vue.defineComponent({
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

    function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
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
    var BIcon = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

    const NATIVE_TYPES = [
      "button",
      "submit",
      "reset"
    ];
    var _sfc_main = vue.defineComponent({
      name: "BButton",
      components: { BIcon },
      inheritAttrs: false,
      props: {
        type: [String, Object],
        size: String,
        label: String,
        iconPack: String,
        iconLeft: String,
        iconRight: String,
        rounded: {
          type: Boolean,
          default: () => {
            return config.defaultButtonRounded;
          }
        },
        loading: Boolean,
        outlined: Boolean,
        expanded: Boolean,
        inverted: Boolean,
        focused: Boolean,
        active: Boolean,
        hovered: Boolean,
        selected: Boolean,
        nativeType: {
          type: String,
          default: "button",
          validator: (value) => {
            return NATIVE_TYPES.indexOf(value) >= 0;
          }
        },
        tag: {
          type: [String, Object],
          default: "button",
          validator: (value) => {
            return typeof value === "object" || config.defaultLinkTags.indexOf(value) >= 0;
          }
        }
      },
      computed: {
        computedTag() {
          if (this.$attrs.disabled !== void 0 && this.$attrs.disabled !== false) {
            return "button";
          }
          return this.tag;
        },
        iconSize() {
          if (!this.size || this.size === "is-medium") {
            return "is-small";
          } else if (this.size === "is-large") {
            return "is-medium";
          }
          return this.size;
        }
      }
    });

    const _hoisted_1 = { key: 1 };
    const _hoisted_2 = { key: 2 };
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");
      return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.computedTag), vue.mergeProps({ class: "button" }, _ctx.$attrs, {
        type: typeof _ctx.computedTag === "string" && ["button", "input"].includes(_ctx.computedTag) ? _ctx.nativeType : void 0,
        class: [_ctx.size, _ctx.type, {
          "is-rounded": _ctx.rounded,
          "is-loading": _ctx.loading,
          "is-outlined": _ctx.outlined,
          "is-fullwidth": _ctx.expanded,
          "is-inverted": _ctx.inverted,
          "is-focused": _ctx.focused,
          "is-active": _ctx.active,
          "is-hovered": _ctx.hovered,
          "is-selected": _ctx.selected
        }]
      }), {
        default: vue.withCtx(() => [
          _ctx.iconLeft ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 0,
            pack: _ctx.iconPack,
            icon: _ctx.iconLeft,
            size: _ctx.iconSize
          }, null, 8, ["pack", "icon", "size"])) : vue.createCommentVNode("v-if", true),
          _ctx.label ? (vue.openBlock(), vue.createElementBlock(
            "span",
            _hoisted_1,
            vue.toDisplayString(_ctx.label),
            1
            /* TEXT */
          )) : _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2, [
            vue.renderSlot(_ctx.$slots, "default")
          ])) : vue.createCommentVNode("v-if", true),
          _ctx.iconRight ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 3,
            pack: _ctx.iconPack,
            icon: _ctx.iconRight,
            size: _ctx.iconSize
          }, null, 8, ["pack", "icon", "size"])) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["type", "class"]);
    }
    var Button = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Button);
      }
    };

    exports.BButton = Button;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
