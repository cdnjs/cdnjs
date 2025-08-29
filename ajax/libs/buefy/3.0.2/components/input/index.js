/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Input = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    let config = {
      defaultIconPack: "mdi",
      defaultIconComponent: null,
      defaultLocale: void 0,
      defaultInputAutocomplete: "on",
      defaultInputHasCounter: true,
      defaultCompatFallthrough: true,
      defaultUseHtml5Validation: true,
      defaultStatusIcon: true};

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

    var __getOwnPropSymbols = Object.getOwnPropertySymbols;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __propIsEnum = Object.prototype.propertyIsEnumerable;
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
    var CompatFallthroughMixin = vue.defineComponent({
      inheritAttrs: false,
      props: {
        compatFallthrough: {
          type: Boolean,
          default: () => config.defaultCompatFallthrough
        }
      },
      computed: {
        rootAttrs() {
          return this.compatFallthrough ? {
            class: this.$attrs.class,
            style: this.$attrs.style,
            id: this.$attrs.id
          } : {};
        },
        fallthroughAttrs() {
          if (this.compatFallthrough) {
            const _a = this.$attrs, { style: _1, class: _2, id: _3 } = _a, rest = __objRest(_a, ["style", "class", "id"]);
            return rest;
          } else {
            return this.$attrs;
          }
        }
      }
    });

    const FormElementMixin = vue.defineComponent({
      props: {
        size: String,
        expanded: Boolean,
        loading: Boolean,
        rounded: Boolean,
        icon: String,
        iconPack: String,
        maxlength: [Number, String],
        useHtml5Validation: {
          type: Boolean,
          default: () => config.defaultUseHtml5Validation
        },
        validationMessage: String,
        locale: {
          type: [String, Array],
          default: () => {
            return config.defaultLocale;
          }
        },
        statusIcon: {
          type: Boolean,
          default: () => {
            return config.defaultStatusIcon;
          }
        }
      },
      emits: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        blur: (event) => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        focus: (event) => true
      },
      data() {
        return {
          isValid: true,
          isFocused: false,
          newIconPack: this.iconPack || config.defaultIconPack,
          // host component must override this
          _elementRef: ""
        };
      },
      computed: {
        /*
         * Find parent Field, max 3 levels deep.
         */
        parentField() {
          let parent = this.$parent;
          for (let i = 0; i < 3; i++) {
            if (parent && !parent.$data._isField) {
              parent = parent.$parent;
            }
          }
          return parent;
        },
        /*
         * Get the type prop from parent if it's a Field.
         */
        statusType() {
          const { newType } = this.parentField || {};
          if (!newType) return;
          if (typeof newType === "string") {
            return newType;
          } else {
            for (const key in newType) {
              if (newType[key]) {
                return key;
              }
            }
          }
          return void 0;
        },
        /*
         * Get the message prop from parent if it's a Field.
         */
        statusMessage() {
          if (!this.parentField) return;
          return this.parentField.newMessage || this.parentField.$slots.message;
        },
        /*
         * Fix icon size for inputs, large was too big
         */
        iconSize() {
          switch (this.size) {
            case "is-small":
              return this.size;
            case "is-medium":
              return;
            case "is-large":
              return this.newIconPack === "mdi" ? "is-medium" : "";
          }
          return void 0;
        }
      },
      methods: {
        /*
         * Focus method that work dynamically depending on the component.
         */
        focus() {
          const el = this.getElement();
          if (el === void 0) return;
          this.$nextTick(() => {
            if (el) el.focus();
          });
        },
        onBlur($event) {
          this.isFocused = false;
          this.$emit("blur", $event);
          this.checkHtml5Validity();
        },
        onFocus($event) {
          this.isFocused = true;
          this.$emit("focus", $event);
        },
        getElement() {
          let el = this.$refs[this.$data._elementRef];
          while (el != null && typeof el === "object" && "$refs" in el) {
            const form = el;
            el = form.$refs[form.$data._elementRef];
          }
          return el;
        },
        setInvalid() {
          const type = "is-danger";
          const message = this.validationMessage || this.getElement().validationMessage;
          this.setValidity(type, message);
        },
        setValidity(type, message) {
          this.$nextTick(() => {
            if (this.parentField) {
              if (!this.parentField.type) {
                this.parentField.newType = type;
              }
              if (!this.parentField.message) {
                this.parentField.newMessage = message;
              }
            }
          });
        },
        /*
         * Check HTML5 validation, set isValid property.
         * If validation fail, send 'is-danger' type,
         * and error message to parent if it's a Field.
         */
        checkHtml5Validity() {
          if (!this.useHtml5Validation) {
            return false;
          }
          const el = this.getElement();
          if (el == null) {
            return false;
          }
          if (!el.checkValidity()) {
            this.setInvalid();
            this.isValid = false;
          } else {
            this.setValidity(null, null);
            this.isValid = true;
          }
          return this.isValid;
        }
      }
    });

    var _sfc_main = vue.defineComponent({
      name: "BInput",
      components: { BIcon },
      mixins: [CompatFallthroughMixin, FormElementMixin],
      props: {
        modelValue: {
          type: [Number, String]
        },
        type: {
          type: String,
          default: "text"
        },
        lazy: {
          type: Boolean,
          default: false
        },
        passwordReveal: Boolean,
        iconClickable: Boolean,
        hasCounter: {
          type: Boolean,
          default: () => config.defaultInputHasCounter
        },
        customClass: {
          type: String,
          default: ""
        },
        iconRight: String,
        iconRightClickable: Boolean,
        iconRightType: String,
        // Native options to use in HTML5 validation
        autocomplete: String
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        "icon-click": (event) => true,
        "icon-right-click": (event) => true,
        "update:modelValue": (value) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          newValue: this.modelValue,
          newType: this.type,
          newAutocomplete: this.autocomplete || config.defaultInputAutocomplete,
          isPasswordVisible: false,
          _elementRef: this.type === "textarea" ? "textarea" : "input"
        };
      },
      computed: {
        computedValue: {
          get() {
            return this.newValue;
          },
          set(value) {
            this.newValue = value;
            this.$emit("update:modelValue", value);
          }
        },
        rootClasses() {
          return [
            this.iconPosition,
            this.size,
            {
              "is-expanded": this.expanded,
              "is-loading": this.loading,
              "is-clearfix": !this.hasMessage
            }
          ];
        },
        inputClasses() {
          return [
            this.statusType,
            this.size,
            { "is-rounded": this.rounded }
          ];
        },
        hasIconRight() {
          return this.passwordReveal || this.loading || this.statusIcon && this.statusTypeIcon || this.iconRight;
        },
        rightIcon() {
          if (this.passwordReveal) {
            return this.passwordVisibleIcon;
          } else if (this.iconRight) {
            return this.iconRight;
          }
          return this.statusTypeIcon;
        },
        rightIconType() {
          if (this.passwordReveal) {
            return "is-primary";
          } else if (this.iconRight) {
            return this.iconRightType || void 0;
          }
          return this.statusType;
        },
        /*
        * Position of the icon or if it's both sides.
        */
        iconPosition() {
          let iconClasses = "";
          if (this.icon) {
            iconClasses += "has-icons-left ";
          }
          if (this.hasIconRight) {
            iconClasses += "has-icons-right";
          }
          return iconClasses;
        },
        /*
        * Icon name (MDI) based on the type.
        */
        statusTypeIcon() {
          switch (this.statusType) {
            case "is-success":
              return "check";
            case "is-danger":
              return "alert-circle";
            case "is-info":
              return "information";
            case "is-warning":
              return "alert";
            default:
              return void 0;
          }
        },
        /*
        * Check if have any message prop from parent if it's a Field.
        */
        hasMessage() {
          return !!this.statusMessage;
        },
        /*
        * Current password-reveal icon name.
        */
        passwordVisibleIcon() {
          return !this.isPasswordVisible ? "eye" : "eye-off";
        },
        /*
        * Get value length
        */
        valueLength() {
          if (typeof this.computedValue === "string") {
            return Array.from(this.computedValue).length;
          } else if (typeof this.computedValue === "number") {
            return this.computedValue.toString().length;
          }
          return 0;
        }
      },
      watch: {
        /*
        * When v-model is changed:
        *   1. Set internal value.
        *   2. Validate it if the value came from outside;
        *      i.e., not equal to computedValue
        */
        modelValue(value) {
          const fromOutside = this.computedValue != value;
          this.newValue = value;
          if (fromOutside) {
            this.$nextTick(() => {
              !this.isValid && this.checkHtml5Validity();
            });
          }
        },
        type(type) {
          this.newType = type;
        }
      },
      methods: {
        /*
        * Toggle the visibility of a password-reveal input
        * by changing the type and focus the input right away.
        */
        togglePasswordVisibility() {
          this.isPasswordVisible = !this.isPasswordVisible;
          this.newType = this.isPasswordVisible ? "text" : "password";
          this.$nextTick(() => {
            this.focus();
          });
        },
        iconClick(emit, event) {
          this.$emit(emit, event);
          this.$nextTick(() => {
            this.focus();
          });
        },
        rightIconClick(event) {
          if (this.passwordReveal) {
            this.togglePasswordVisibility();
          } else if (this.iconRightClickable) {
            this.iconClick("icon-right-click", event);
          }
        },
        onInput() {
          if (!this.lazy) {
            this.revalidate();
          }
        },
        onChange() {
          if (this.lazy) {
            this.revalidate();
          }
        },
        revalidate() {
          !this.isValid && this.checkHtml5Validity();
        }
      }
    });

    const _hoisted_1 = ["type", "autocomplete", "maxlength"];
    const _hoisted_2 = ["maxlength"];
    const _hoisted_3 = ["type", "autocomplete", "maxlength"];
    const _hoisted_4 = ["maxlength"];
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        vue.mergeProps({
          class: ["control", _ctx.rootClasses]
        }, _ctx.rootAttrs),
        [
          _ctx.lazy ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [
              _ctx.type !== "textarea" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
                key: 0,
                ref: "input",
                class: ["input", [_ctx.inputClasses, _ctx.customClass]],
                type: _ctx.newType,
                autocomplete: _ctx.newAutocomplete,
                maxlength: _ctx.maxlength,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event)
              }, _ctx.fallthroughAttrs, {
                onInput: _cache[1] || (_cache[1] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
                onChange: _cache[2] || (_cache[2] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
                onBlur: _cache[3] || (_cache[3] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
                onFocus: _cache[4] || (_cache[4] = (...args) => _ctx.onFocus && _ctx.onFocus(...args))
              }), null, 16, _hoisted_1)), [
                [
                  vue.vModelDynamic,
                  _ctx.computedValue,
                  void 0,
                  { lazy: true }
                ]
              ]) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", vue.mergeProps({
                key: 1,
                ref: "textarea",
                class: ["textarea", [_ctx.inputClasses, _ctx.customClass]],
                maxlength: _ctx.maxlength,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.computedValue = $event)
              }, _ctx.fallthroughAttrs, {
                onInput: _cache[6] || (_cache[6] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
                onChange: _cache[7] || (_cache[7] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
                onBlur: _cache[8] || (_cache[8] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
                onFocus: _cache[9] || (_cache[9] = (...args) => _ctx.onFocus && _ctx.onFocus(...args))
              }), null, 16, _hoisted_2)), [
                [
                  vue.vModelText,
                  _ctx.computedValue,
                  void 0,
                  { lazy: true }
                ]
              ])
            ],
            64
            /* STABLE_FRAGMENT */
          )) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              _ctx.type !== "textarea" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
                key: 0,
                ref: "input",
                class: ["input", [_ctx.inputClasses, _ctx.customClass]],
                type: _ctx.newType,
                autocomplete: _ctx.newAutocomplete,
                maxlength: _ctx.maxlength,
                "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.computedValue = $event)
              }, _ctx.fallthroughAttrs, {
                onInput: _cache[11] || (_cache[11] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
                onChange: _cache[12] || (_cache[12] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
                onBlur: _cache[13] || (_cache[13] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
                onFocus: _cache[14] || (_cache[14] = (...args) => _ctx.onFocus && _ctx.onFocus(...args))
              }), null, 16, _hoisted_3)), [
                [vue.vModelDynamic, _ctx.computedValue]
              ]) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", vue.mergeProps({
                key: 1,
                ref: "textarea",
                class: ["textarea", [_ctx.inputClasses, _ctx.customClass]],
                maxlength: _ctx.maxlength,
                "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => _ctx.computedValue = $event)
              }, _ctx.fallthroughAttrs, {
                onInput: _cache[16] || (_cache[16] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
                onChange: _cache[17] || (_cache[17] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
                onBlur: _cache[18] || (_cache[18] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
                onFocus: _cache[19] || (_cache[19] = (...args) => _ctx.onFocus && _ctx.onFocus(...args))
              }), null, 16, _hoisted_4)), [
                [vue.vModelText, _ctx.computedValue]
              ])
            ],
            64
            /* STABLE_FRAGMENT */
          )),
          _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 2,
            class: vue.normalizeClass(["is-left", { "is-clickable": _ctx.iconClickable }]),
            icon: _ctx.icon,
            pack: _ctx.iconPack,
            size: _ctx.iconSize,
            onClick: _cache[20] || (_cache[20] = ($event) => _ctx.iconClick("icon-click", $event))
          }, null, 8, ["class", "icon", "pack", "size"])) : vue.createCommentVNode("v-if", true),
          !_ctx.loading && _ctx.hasIconRight && _ctx.rightIcon ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 3,
            class: vue.normalizeClass(["is-right", { "is-clickable": _ctx.passwordReveal || _ctx.iconRightClickable }]),
            icon: _ctx.rightIcon,
            pack: _ctx.iconPack,
            size: _ctx.iconSize,
            type: _ctx.rightIconType,
            both: "",
            onClick: _ctx.rightIconClick
          }, null, 8, ["class", "icon", "pack", "size", "type", "onClick"])) : vue.createCommentVNode("v-if", true),
          _ctx.maxlength && _ctx.hasCounter && _ctx.type !== "number" ? (vue.openBlock(), vue.createElementBlock(
            "small",
            {
              key: 4,
              class: vue.normalizeClass(["help counter", { "is-invisible": !_ctx.isFocused }])
            },
            vue.toDisplayString(_ctx.valueLength) + " / " + vue.toDisplayString(_ctx.maxlength),
            3
            /* TEXT, CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        16
        /* FULL_PROPS */
      );
    }
    var Input = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Input);
      }
    };

    exports.BInput = Input;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
