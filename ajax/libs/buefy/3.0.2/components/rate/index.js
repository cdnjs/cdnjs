/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Rate = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    let config = {
      defaultIconPack: "mdi",
      defaultIconComponent: null,
      defaultLocale: void 0};

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

    var _sfc_main = vue.defineComponent({
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
    var BIcon = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render$1]]);

    const Rate$1 = vue.defineComponent({
      name: "BRate",
      components: {
        BIcon
      },
      props: {
        modelValue: {
          type: Number,
          default: 0
        },
        max: {
          type: Number,
          default: 5
        },
        icon: {
          type: String,
          default: "star"
        },
        iconPack: String,
        size: String,
        spaced: Boolean,
        rtl: Boolean,
        disabled: Boolean,
        showScore: Boolean,
        showText: Boolean,
        customText: String,
        texts: Array,
        locale: {
          type: [String, Array],
          default: () => {
            return config.defaultLocale;
          }
        }
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        change: (newValue) => true,
        "update:modelValue": (newValue) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          newValue: this.modelValue,
          hoverValue: 0
        };
      },
      computed: {
        halfStyle() {
          return `width:${this.valueDecimal}%`;
        },
        showMe() {
          let result = "";
          if (this.showScore) {
            result = this.disabled ? this.modelValue.toString() : this.newValue.toString();
            if (Number(result) === 0) {
              result = "";
            } else {
              result = new Intl.NumberFormat(this.locale).format(this.modelValue);
            }
          } else if (this.showText && this.texts) {
            result = this.texts[Math.ceil(this.newValue) - 1];
          }
          return result;
        },
        valueDecimal() {
          return this.modelValue * 100 - Math.floor(this.modelValue) * 100;
        }
      },
      watch: {
        // When v-model is changed set the new value.
        modelValue(value) {
          this.newValue = value;
        }
      },
      methods: {
        resetNewValue() {
          if (this.disabled) return;
          this.hoverValue = 0;
        },
        previewRate(index, event) {
          if (this.disabled) return;
          this.hoverValue = index;
          event.stopPropagation();
        },
        confirmValue(index) {
          if (this.disabled) return;
          this.newValue = index;
          this.$emit("change", this.newValue);
          this.$emit("update:modelValue", this.newValue);
        },
        checkHalf(index) {
          const showWhenDisabled = this.disabled && this.valueDecimal > 0 && index - 1 < this.modelValue && index > this.modelValue;
          return showWhenDisabled;
        },
        rateClass(index) {
          let output = "";
          const currentValue = this.hoverValue !== 0 ? this.hoverValue : this.newValue;
          if (index <= currentValue) {
            output = "set-on";
          } else if (this.disabled && Math.ceil(this.modelValue) === index) {
            output = "set-half";
          }
          return output;
        }
      }
    });

    const _hoisted_1 = ["onMousemove", "onClick"];
    const _hoisted_2 = { key: 0 };
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(["rate", { "is-disabled": _ctx.disabled, "is-spaced": _ctx.spaced, "is-rtl": _ctx.rtl }])
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.max, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("div", {
                class: vue.normalizeClass(["rate-item", _ctx.rateClass(item)]),
                key: index,
                onMousemove: ($event) => _ctx.previewRate(item, $event),
                onMouseleave: _cache[0] || (_cache[0] = (...args) => _ctx.resetNewValue && _ctx.resetNewValue(...args)),
                onClick: vue.withModifiers(($event) => _ctx.confirmValue(item), ["prevent"])
              }, [
                vue.createVNode(_component_b_icon, {
                  pack: _ctx.iconPack,
                  icon: _ctx.icon,
                  size: _ctx.size
                }, null, 8, ["pack", "icon", "size"]),
                _ctx.checkHalf(item) ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
                  key: 0,
                  class: "is-half",
                  pack: _ctx.iconPack,
                  icon: _ctx.icon,
                  size: _ctx.size,
                  style: vue.normalizeStyle(_ctx.halfStyle)
                }, null, 8, ["pack", "icon", "size", "style"])) : vue.createCommentVNode("v-if", true)
              ], 42, _hoisted_1);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          _ctx.showText || _ctx.showScore || _ctx.customText ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(["rate-text", _ctx.size])
            },
            [
              vue.createElementVNode(
                "span",
                null,
                vue.toDisplayString(_ctx.showMe),
                1
                /* TEXT */
              ),
              _ctx.customText && !_ctx.showText ? (vue.openBlock(), vue.createElementBlock(
                "span",
                _hoisted_2,
                vue.toDisplayString(_ctx.customText),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    }
    var Rate = /* @__PURE__ */ _export_sfc(Rate$1, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Rate);
      }
    };

    exports.BRate = Rate;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
