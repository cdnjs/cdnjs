/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Notification = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    const NOTICE_POSITIONS = [
      "is-top-right",
      "is-top",
      "is-top-left",
      "is-bottom-right",
      "is-bottom",
      "is-bottom-left"
    ];
    let config = {
      defaultContainerElement: null,
      defaultIconPack: "mdi",
      defaultIconComponent: null,
      defaultLocale: void 0,
      defaultNotificationDuration: 2e3,
      defaultNoticeQueue: true};

    function removeElement(el) {
      if (typeof el.remove !== "undefined") {
        el.remove();
      } else if (typeof el.parentNode !== "undefined" && el.parentNode !== null) {
        el.parentNode.removeChild(el);
      }
    }
    function getComponentFromVNode(vnode) {
      if (!vnode) {
        return void 0;
      }
      const { component } = vnode;
      if (!component) {
        return void 0;
      }
      return component.exposed && component.exposeProxy || component.proxy;
    }
    function copyAppContext(src, dest) {
      const { _context: srcContext } = src;
      const { _context: destContext } = dest;
      destContext.config = srcContext.config;
      destContext.mixins = srcContext.mixins;
      destContext.components = srcContext.components;
      destContext.directives = srcContext.directives;
      destContext.provides = srcContext.provides;
      destContext.optionsCache = srcContext.optionsCache;
      destContext.propsCache = srcContext.propsCache;
      destContext.emitsCache = srcContext.emitsCache;
      if ("__VUE_I18N_SYMBOL__" in src) {
        dest.__VUE_I18N_SYMBOL__ = src.__VUE_I18N_SYMBOL__;
      }
    }

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

    function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
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
    var BIcon = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render$3]]);

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
    function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
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
    var BProgress = /* @__PURE__ */ _export_sfc(Progress, [["render", _sfc_render$2]]);

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

    const Notification$1 = vue.defineComponent({
      name: "BNotification",
      components: {
        BIcon,
        // directly registers Progress
        // in case Notification is programmatically opened
        BProgress
      },
      mixins: [MessageMixin],
      props: {
        position: String,
        ariaCloseLabel: String,
        animation: {
          type: String,
          default: "fade"
        }
      }
    });

    const _hoisted_1 = ["aria-label"];
    const _hoisted_2 = {
      key: 1,
      class: "media"
    };
    const _hoisted_3 = {
      key: 0,
      class: "media-left"
    };
    const _hoisted_4 = { class: "media-content" };
    const _hoisted_5 = ["innerHTML"];
    function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");
      const _component_b_progress = vue.resolveComponent("b-progress");
      return vue.openBlock(), vue.createBlock(vue.Transition, {
        name: _ctx.animation,
        persisted: ""
      }, {
        default: vue.withCtx(() => [
          vue.withDirectives(vue.createElementVNode(
            "article",
            {
              class: vue.normalizeClass(["notification", [_ctx.type, _ctx.position]]),
              onClick: _cache[1] || (_cache[1] = (...args) => _ctx.click && _ctx.click(...args))
            },
            [
              _ctx.closable ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 0,
                class: "delete",
                type: "button",
                onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args)),
                "aria-label": _ctx.ariaCloseLabel
              }, null, 8, _hoisted_1)) : vue.createCommentVNode("v-if", true),
              _ctx.$slots.default || _ctx.message ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
                _ctx.computedIcon && _ctx.hasIcon ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, [
                  vue.createVNode(_component_b_icon, {
                    icon: _ctx.computedIcon,
                    pack: _ctx.iconPack,
                    size: _ctx.newIconSize,
                    both: "",
                    "aria-hidden": ""
                  }, null, 8, ["icon", "pack", "size"])
                ])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("div", _hoisted_4, [
                  _ctx.$slots.default ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    { key: 1 },
                    [
                      vue.createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
                      vue.createElementVNode("p", {
                        class: "text",
                        innerHTML: _ctx.message
                      }, null, 8, _hoisted_5)
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  ))
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
      }, 8, ["name"]);
    }
    var Notification = /* @__PURE__ */ _export_sfc(Notification$1, [["render", _sfc_render$1]]);

    var NoticeMixin = vue.defineComponent({
      props: {
        type: {
          type: String,
          default: "is-dark"
        },
        message: [String, Array],
        duration: Number,
        queue: {
          type: Boolean,
          default: void 0
        },
        indefinite: {
          type: Boolean,
          default: false
        },
        pauseOnHover: {
          type: Boolean,
          default: false
        },
        position: {
          type: String,
          default: "is-top",
          validator(value) {
            return NOTICE_POSITIONS.indexOf(value) > -1;
          }
        },
        container: String
      },
      emits: {
        click: () => true,
        close: () => true
      },
      data() {
        return {
          isActive: false,
          isPaused: false,
          parentTop: null,
          parentBottom: null,
          newContainer: this.container || config.defaultContainerElement,
          timer: void 0,
          // host container should override `newDuration`
          newDuration: this.duration || 0
        };
      },
      computed: {
        correctParent() {
          switch (this.position) {
            case "is-top-right":
            case "is-top":
            case "is-top-left":
              return this.parentTop;
            case "is-bottom-right":
            case "is-bottom":
            case "is-bottom-left":
              return this.parentBottom;
            default: {
              const exhaustiveCheck = this.position;
              throw new RangeError(`invalid position: ${exhaustiveCheck}`);
            }
          }
        },
        transition() {
          switch (this.position) {
            case "is-top-right":
            case "is-top":
            case "is-top-left":
              return {
                enter: "fadeInDown",
                leave: "fadeOut"
              };
            case "is-bottom-right":
            case "is-bottom":
            case "is-bottom-left":
              return {
                enter: "fadeInUp",
                leave: "fadeOut"
              };
            default: {
              const exhaustiveCheck = this.position;
              throw new RangeError(`invalid position: ${exhaustiveCheck}`);
            }
          }
        }
      },
      methods: {
        pause() {
          if (this.pauseOnHover && !this.indefinite) {
            this.isPaused = true;
            clearInterval(this.$buefy.globalNoticeInterval);
          }
        },
        removePause() {
          if (this.pauseOnHover && !this.indefinite) {
            this.isPaused = false;
            this.close();
          }
        },
        shouldQueue() {
          const queue = this.queue !== void 0 ? this.queue : config.defaultNoticeQueue;
          if (!queue) return false;
          return this.parentTop.childElementCount > 0 || this.parentBottom.childElementCount > 0;
        },
        click() {
          this.$emit("click");
        },
        close() {
          if (!this.isPaused) {
            clearTimeout(this.timer);
            this.isActive = false;
            this.$emit("close");
            setTimeout(() => {
              removeElement(this.$el);
            }, 150);
          }
        },
        timeoutCallback() {
          return this.close();
        },
        showNotice() {
          if (this.shouldQueue()) this.correctParent.innerHTML = "";
          this.correctParent.insertAdjacentElement("afterbegin", this.$el);
          this.isActive = true;
          if (!this.indefinite) {
            this.timer = setTimeout(() => this.timeoutCallback(), this.newDuration);
          }
        },
        setupContainer() {
          this.parentTop = document.querySelector((this.newContainer ? this.newContainer : "body") + ">.notices.is-top");
          this.parentBottom = document.querySelector((this.newContainer ? this.newContainer : "body") + ">.notices.is-bottom");
          if (this.parentTop && this.parentBottom) return;
          if (!this.parentTop) {
            this.parentTop = document.createElement("div");
            this.parentTop.className = "notices is-top";
          }
          if (!this.parentBottom) {
            this.parentBottom = document.createElement("div");
            this.parentBottom.className = "notices is-bottom";
          }
          const container = document.querySelector(this.newContainer) || document.body;
          container.appendChild(this.parentTop);
          container.appendChild(this.parentBottom);
          if (this.newContainer) {
            this.parentTop.classList.add("has-custom-container");
            this.parentBottom.classList.add("has-custom-container");
          }
        }
      },
      beforeMount() {
        this.setupContainer();
      },
      mounted() {
        this.showNotice();
      }
    });

    const NotificationNotice$1 = vue.defineComponent({
      name: "BNotificationNotice",
      components: { BNotification: Notification },
      mixins: [NoticeMixin],
      data() {
        return {
          newDuration: this.duration || config.defaultNotificationDuration
        };
      },
      emits: {
        close: () => true
      },
      methods: {
        close() {
          if (!this.isPaused) {
            clearTimeout(this.timer);
            this.$refs.notification.isActive = false;
            this.$emit("close");
            setTimeout(() => {
              removeElement(this.$el);
            }, 150);
          }
        }
      }
    });

    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_notification = vue.resolveComponent("b-notification");
      return _ctx.$slots.default != null ? (vue.openBlock(), vue.createBlock(_component_b_notification, vue.mergeProps({
        key: 0,
        ref: "notification",
        position: _ctx.position,
        "model-value": _ctx.isActive,
        type: _ctx.type,
        message: _ctx.message,
        duration: _ctx.duration
      }, _ctx.$attrs, {
        onClick: _ctx.click,
        onClose: _ctx.close,
        onMouseenter: _ctx.pause,
        onMouseleave: _ctx.removePause
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["position", "model-value", "type", "message", "duration", "onClick", "onClose", "onMouseenter", "onMouseleave"])) : (vue.openBlock(), vue.createBlock(_component_b_notification, vue.mergeProps({
        key: 1,
        ref: "notification",
        position: _ctx.position,
        "model-value": _ctx.isActive,
        type: _ctx.type,
        message: _ctx.message,
        duration: _ctx.duration
      }, _ctx.$attrs, {
        onClick: _ctx.click,
        onClose: _ctx.close,
        onMouseenter: _ctx.pause,
        onMouseleave: _ctx.removePause
      }), null, 16, ["position", "model-value", "type", "message", "duration", "onClick", "onClose", "onMouseenter", "onMouseleave"]));
    }
    var NotificationNotice = /* @__PURE__ */ _export_sfc(NotificationNotice$1, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };
    const registerComponentProgrammatic = (Vue, property, component) => {
      if (!Vue.config.globalProperties.$buefy) Vue.config.globalProperties.$buefy = {};
      Vue.config.globalProperties.$buefy[property] = component;
    };

    var __defProp = Object.defineProperty;
    var __defProps = Object.defineProperties;
    var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
    var __getOwnPropSymbols = Object.getOwnPropertySymbols;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __propIsEnum = Object.prototype.propertyIsEnumerable;
    var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __spreadValues = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      if (__getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(b)) {
          if (__propIsEnum.call(b, prop))
            __defNormalProp(a, prop, b[prop]);
        }
      return a;
    };
    var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
    var __objRest = (source, exclude) => {
      var target = {};
      for (var prop in source)
        if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
          target[prop] = source[prop];
      if (source != null && __getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(source)) {
          if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
            target[prop] = source[prop];
        }
      return target;
    };
    var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
    class NotificationProgrammatic {
      constructor(app) {
        __publicField(this, "app");
        this.app = app;
      }
      open(params) {
        if (typeof params === "string") {
          params = {
            message: params
          };
        }
        let slot;
        let _a = params, { message } = _a, restParams = __objRest(_a, ["message"]);
        if (typeof message !== "string") {
          slot = message;
          message = void 0;
        }
        const propsData = __spreadValues({
          position: "is-top-right",
          message
        }, restParams);
        const container = document.createElement("div");
        const vueInstance = vue.createApp({
          data() {
            return {
              noticeVNode: null
            };
          },
          methods: {
            close() {
              const notice = getComponentFromVNode(this.noticeVNode);
              if (notice) {
                notice.close();
              }
            }
          },
          render() {
            this.noticeVNode = vue.h(
              NotificationNotice,
              __spreadProps(__spreadValues({}, propsData), {
                onClose: () => {
                  if (propsData.onClose != null) {
                    propsData.onClose();
                  }
                  setTimeout(() => {
                    vueInstance.unmount();
                  }, 150);
                }
              }),
              slot != null ? { default: () => slot } : void 0
            );
            return this.noticeVNode;
          }
        });
        if (this.app) {
          copyAppContext(this.app, vueInstance);
        } else {
          vueInstance.config.globalProperties.$buefy = {};
        }
        return vueInstance.mount(container);
      }
    }
    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Notification);
        registerComponentProgrammatic(Vue, "notification", new NotificationProgrammatic(Vue));
      }
    };

    exports.BNotification = Notification;
    exports.NotificationProgrammatic = NotificationProgrammatic;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
