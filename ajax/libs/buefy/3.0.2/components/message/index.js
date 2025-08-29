/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Message = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    var MessageMixin = vue.defineComponent({
      props: {
        modelValue: {
          type: Boolean,
          default: true
        },
        title: String,
        closable: {
          type: Boolean,
          default: true
        },
        message: String,
        type: String,
        hasIcon: Boolean,
        size: String,
        icon: String,
        iconPack: String,
        iconSize: String,
        autoClose: {
          type: Boolean,
          default: false
        },
        duration: {
          type: Number,
          default: 2e3
        },
        progressBar: {
          type: Boolean,
          default: false
        }
      },
      emits: {
        click: () => true,
        close: () => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        "update:modelValue": (value) => true
      },
      data() {
        return {
          isActive: this.modelValue,
          remainingTime: this.duration / 1e3,
          // in seconds
          newIconSize: this.iconSize || this.size || "is-large",
          timer: void 0
        };
      },
      computed: {
        /*
         * Icon name (MDI) based on type.
         */
        computedIcon() {
          if (this.icon) {
            return this.icon;
          }
          switch (this.type) {
            case "is-info":
              return "information";
            case "is-success":
              return "check-circle";
            case "is-warning":
              return "alert";
            case "is-danger":
              return "alert-circle";
            default:
              return null;
          }
        }
      },
      watch: {
        modelValue(value) {
          this.isActive = value;
        },
        isActive(value) {
          if (value) {
            this.setAutoClose();
            this.setDurationProgress();
          } else {
            if (this.timer) {
              clearTimeout(this.timer);
            }
          }
        }
      },
      methods: {
        /*
         * Close the Message and emit events.
         */
        close() {
          this.isActive = false;
          this.resetDurationProgress();
          this.$emit("close");
          this.$emit("update:modelValue", false);
        },
        click() {
          this.$emit("click");
        },
        /*
         * Set timer to auto close message
         */
        setAutoClose() {
          if (this.autoClose) {
            this.timer = setTimeout(() => {
              if (this.isActive) {
                this.close();
              }
            }, this.duration);
          }
        },
        setDurationProgress() {
          if (this.progressBar || this.autoClose) {
            this.$buefy.globalNoticeInterval = setInterval(() => {
              if (this.remainingTime !== 0) {
                this.remainingTime -= 1;
              } else {
                this.resetDurationProgress();
              }
            }, 1e3);
          }
        },
        resetDurationProgress() {
          setTimeout(() => {
            this.remainingTime = this.duration / 1e3;
            clearInterval(this.$buefy.globalNoticeInterval);
          }, 100);
        }
      },
      mounted() {
        this.setAutoClose();
      }
    });

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
    var BIcon = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render$2]]);

    const PROGRESS_INJECTION_KEY = Symbol("bprogress");
    const Progress = vue.defineComponent({
      name: "BProgress",
      provide() {
        return {
          [PROGRESS_INJECTION_KEY]: this
        };
      },
      props: {
        type: {
          type: [String, Object],
          default: "is-darkgrey"
        },
        size: {
          type: String
        },
        rounded: {
          type: Boolean,
          default: true
        },
        value: {
          type: Number,
          default: void 0
        },
        max: {
          type: Number,
          default: 100
        },
        showValue: {
          type: Boolean,
          default: false
        },
        format: {
          type: String,
          default: "raw",
          validator: (value) => {
            return [
              "raw",
              "percent"
            ].indexOf(value) >= 0;
          }
        },
        precision: {
          type: Number,
          default: 2
        },
        keepTrailingZeroes: {
          type: Boolean,
          default: false
        },
        locale: {
          type: [String, Array],
          default: () => {
            return config.defaultLocale;
          },
          validator: (value) => {
            if (Array.isArray(value)) {
              return value.every((item) => typeof item === "string");
            }
            return typeof value === "string";
          }
        }
      },
      computed: {
        isIndeterminate() {
          return this.value === void 0 || this.value === null;
        },
        newType() {
          return [
            this.size,
            this.type,
            {
              "is-more-than-half": this.value && this.value > this.max / 2
            }
          ];
        },
        newValue() {
          return this.calculateValue(this.value);
        },
        isNative() {
          return this.$slots.bar === void 0;
        },
        wrapperClasses() {
          return {
            "is-not-native": !this.isNative,
            [this.size === void 0 ? "" : this.size]: typeof this.size === "string" && !this.isNative
          };
        }
      },
      watch: {
        /*
         * When value is changed back to undefined, value of native progress get reset to 0.
         * Need to add and remove the value attribute to have the indeterminate or not.
         */
        isIndeterminate(indeterminate) {
          this.$nextTick(() => {
            if (this.$refs.progress) {
              if (indeterminate) {
                this.$refs.progress.removeAttribute("value");
              } else {
                this.$refs.progress.setAttribute("value", this.value.toString());
              }
            }
          });
        }
      },
      methods: {
        calculateValue(value) {
          if (value === void 0 || value === null || isNaN(value)) {
            return void 0;
          }
          const minimumFractionDigits = this.keepTrailingZeroes ? this.precision : 0;
          const maximumFractionDigits = this.precision;
          if (this.format === "percent") {
            return new Intl.NumberFormat(
              this.locale,
              {
                style: "percent",
                minimumFractionDigits,
                maximumFractionDigits
              }
            ).format(value / this.max);
          }
          return new Intl.NumberFormat(
            this.locale,
            {
              minimumFractionDigits,
              maximumFractionDigits
            }
          ).format(value);
        }
      }
    });

    const _hoisted_1$1 = ["max", "value"];
    const _hoisted_2$1 = {
      key: 2,
      class: "progress-value"
    };
    function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(["progress-wrapper", [_ctx.wrapperClasses, { "is-squared": !_ctx.rounded }]])
        },
        [
          _ctx.isNative ? (vue.openBlock(), vue.createElementBlock("progress", {
            key: 0,
            ref: "progress",
            class: vue.normalizeClass(["progress", [_ctx.newType, { "is-squared": !_ctx.rounded }]]),
            max: _ctx.max,
            value: _ctx.value
          }, vue.toDisplayString(_ctx.newValue), 11, _hoisted_1$1)) : vue.renderSlot(_ctx.$slots, "bar", { key: 1 }),
          _ctx.isNative && _ctx.showValue ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_2$1, [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              vue.createTextVNode(
                vue.toDisplayString(_ctx.newValue),
                1
                /* TEXT */
              )
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    }
    var BProgress = /* @__PURE__ */ _export_sfc(Progress, [["render", _sfc_render$1]]);

    const Message$1 = vue.defineComponent({
      name: "BMessage",
      components: {
        BIcon,
        BProgress
      },
      mixins: [MessageMixin],
      props: {
        ariaCloseLabel: String
      }
    });

    const _hoisted_1 = {
      key: 0,
      class: "message-header"
    };
    const _hoisted_2 = { key: 0 };
    const _hoisted_3 = { key: 1 };
    const _hoisted_4 = ["aria-label"];
    const _hoisted_5 = {
      key: 1,
      class: "message-body"
    };
    const _hoisted_6 = { class: "media" };
    const _hoisted_7 = {
      key: 0,
      class: "media-left"
    };
    const _hoisted_8 = { class: "media-content" };
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");
      const _component_b_progress = vue.resolveComponent("b-progress");
      return vue.openBlock(), vue.createBlock(vue.Transition, {
        name: "fade",
        persisted: ""
      }, {
        default: vue.withCtx(() => [
          vue.withDirectives(vue.createElementVNode(
            "article",
            {
              class: vue.normalizeClass(["message", [_ctx.type, _ctx.size]])
            },
            [
              _ctx.$slots.header || _ctx.title ? (vue.openBlock(), vue.createElementBlock("header", _hoisted_1, [
                _ctx.$slots.header ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
                  vue.renderSlot(_ctx.$slots, "header")
                ])) : _ctx.title ? (vue.openBlock(), vue.createElementBlock(
                  "p",
                  _hoisted_3,
                  vue.toDisplayString(_ctx.title),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true),
                _ctx.closable ? (vue.openBlock(), vue.createElementBlock("button", {
                  key: 2,
                  type: "button",
                  class: "delete",
                  onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args)),
                  "aria-label": _ctx.ariaCloseLabel
                }, null, 8, _hoisted_4)) : vue.createCommentVNode("v-if", true)
              ])) : vue.createCommentVNode("v-if", true),
              _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock("section", _hoisted_5, [
                vue.createElementVNode("div", _hoisted_6, [
                  _ctx.computedIcon && _ctx.hasIcon ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [
                    vue.createVNode(_component_b_icon, {
                      icon: _ctx.computedIcon,
                      pack: _ctx.iconPack,
                      class: vue.normalizeClass(_ctx.type),
                      both: "",
                      size: _ctx.newIconSize
                    }, null, 8, ["icon", "pack", "class", "size"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("div", _hoisted_8, [
                    vue.renderSlot(_ctx.$slots, "default")
                  ])
                ])
              ])) : vue.createCommentVNode("v-if", true),
              _ctx.progressBar ? (vue.openBlock(), vue.createBlock(_component_b_progress, {
                key: 2,
                class: "auto-close-progress",
                value: _ctx.remainingTime - 1,
                max: _ctx.duration / 1e3 - 1,
                type: _ctx.type,
                rounded: false
              }, null, 8, ["value", "max", "type"])) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          ), [
            [vue.vShow, _ctx.isActive]
          ])
        ]),
        _: 3
        /* FORWARDED */
      });
    }
    var Message = /* @__PURE__ */ _export_sfc(Message$1, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Message);
      }
    };

    exports.BMessage = Message;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
