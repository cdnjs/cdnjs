/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Upload = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    let config = {
      defaultIconPack: "mdi",
      defaultLocale: void 0,
      defaultCompatFallthrough: true,
      defaultUseHtml5Validation: true,
      defaultStatusIcon: true};

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

    var _export_sfc = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key, val] of props) {
        target[key] = val;
      }
      return target;
    };

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

    const isSSR = typeof window === "undefined";
    const File = isSSR ? Object : window.File;

    const Upload$1 = vue.defineComponent({
      name: "BUpload",
      mixins: [CompatFallthroughMixin, FormElementMixin],
      props: {
        modelValue: {
          type: [Object, Function, File, Array]
        },
        multiple: Boolean,
        disabled: Boolean,
        accept: String,
        dragDrop: Boolean,
        type: {
          type: String,
          default: "is-primary"
        },
        native: {
          type: Boolean,
          default: false
        },
        expanded: {
          type: Boolean,
          default: false
        },
        rounded: {
          type: Boolean,
          default: false
        }
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        invalid: () => true,
        "update:modelValue": (newValue) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          newValue: this.modelValue,
          dragDropFocus: false,
          _elementRef: "input"
        };
      },
      computed: {
        disabledOrUndefined() {
          return this.disabled || void 0;
        }
      },
      watch: {
        modelValue(value) {
          this.newValue = value;
          if (!value || Array.isArray(value) && value.length === 0) {
            this.$refs.input.value = "";
          }
          !this.isValid && !this.dragDrop && this.checkHtml5Validity();
        }
      },
      methods: {
        onFileChange(event) {
          var _a, _b;
          if (this.disabled || this.loading) return;
          if (this.dragDrop) this.updateDragDropFocus(false);
          const value = (_b = (_a = event.target.files) != null ? _a : event.dataTransfer.files) != null ? _b : [];
          if (value.length === 0) {
            if (!this.newValue) return;
            if (this.native) this.newValue = null;
          } else if (!this.multiple) {
            if (this.dragDrop && value.length !== 1) return;
            else {
              const file = value[0];
              if (this.checkType(file)) this.newValue = file;
              else if (this.newValue) {
                this.newValue = null;
                this.clearInput();
              } else {
                this.clearInput();
                this.checkHtml5Validity();
                return;
              }
            }
          } else {
            let newValues = false;
            if (this.native || !this.newValue) {
              this.newValue = [];
              newValues = true;
            }
            for (let i = 0; i < value.length; i++) {
              const file = value[i];
              if (this.checkType(file) && Array.isArray(this.newValue)) {
                this.newValue.push(file);
                newValues = true;
              }
            }
            if (!newValues) return;
          }
          this.$emit("update:modelValue", this.newValue);
          !this.dragDrop && this.checkHtml5Validity();
        },
        clearInput() {
          this.$refs.input.value = "";
        },
        updateDragDropFocus(focus) {
          if (!this.disabled && !this.loading) {
            this.dragDropFocus = focus;
          }
        },
        checkType(file) {
          if (!this.accept) return true;
          const types = this.accept.split(",");
          if (types.length === 0) return true;
          let valid = false;
          for (let i = 0; i < types.length && !valid; i++) {
            const type = types[i].trim();
            if (type) {
              if (type.substring(0, 1) === ".") {
                const extension = file.name.toLowerCase().slice(-type.length);
                if (extension === type.toLowerCase()) {
                  valid = true;
                }
              } else {
                if (file.type.match(type)) {
                  valid = true;
                }
              }
            }
          }
          if (!valid) this.$emit("invalid");
          return valid;
        }
      }
    });

    const _hoisted_1 = ["multiple", "accept", "disabled"];
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock(
        "label",
        vue.mergeProps({ class: "upload control" }, _ctx.rootAttrs, {
          class: [{ "is-expanded": _ctx.expanded, "is-rounded": _ctx.rounded }]
        }),
        [
          !_ctx.dragDrop ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 1,
              class: vue.normalizeClass(["upload-draggable", [_ctx.type, {
                "is-loading": _ctx.loading,
                "is-disabled": _ctx.disabled,
                "is-hovered": _ctx.dragDropFocus,
                "is-expanded": _ctx.expanded
              }]]),
              onDragover: _cache[0] || (_cache[0] = vue.withModifiers(($event) => _ctx.updateDragDropFocus(true), ["prevent"])),
              onDragleave: _cache[1] || (_cache[1] = vue.withModifiers(($event) => _ctx.updateDragDropFocus(false), ["prevent"])),
              onDragenter: _cache[2] || (_cache[2] = vue.withModifiers(($event) => _ctx.updateDragDropFocus(true), ["prevent"])),
              onDrop: _cache[3] || (_cache[3] = vue.withModifiers((...args) => _ctx.onFileChange && _ctx.onFileChange(...args), ["prevent"]))
            },
            [
              vue.renderSlot(_ctx.$slots, "default")
            ],
            34
            /* CLASS, NEED_HYDRATION */
          )),
          vue.createElementVNode("input", vue.mergeProps({
            ref: "input",
            type: "file"
          }, _ctx.fallthroughAttrs, {
            multiple: _ctx.multiple,
            accept: _ctx.accept,
            disabled: _ctx.disabledOrUndefined,
            onChange: _cache[4] || (_cache[4] = (...args) => _ctx.onFileChange && _ctx.onFileChange(...args))
          }), null, 16, _hoisted_1)
        ],
        16
        /* FULL_PROPS */
      );
    }
    var Upload = /* @__PURE__ */ _export_sfc(Upload$1, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Upload);
      }
    };

    exports.BUpload = Upload;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
