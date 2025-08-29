/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Table = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    function getValueByPath(obj, path) {
      return path.split(".").reduce((o, i) => o ? o[i] : null, obj);
    }
    function indexOf(array, obj, fn) {
      if (!array) return -1;
      if (!fn || typeof fn !== "function") return array.indexOf(obj);
      for (let i = 0; i < array.length; i++) {
        if (fn(array[i], obj)) {
          return i;
        }
      }
      return -1;
    }
    function removeElement(el) {
      if (typeof el.remove !== "undefined") {
        el.remove();
      } else if (typeof el.parentNode !== "undefined" && el.parentNode !== null) {
        el.parentNode.removeChild(el);
      }
    }
    function createAbsoluteElement(el) {
      const root = document.createElement("div");
      root.style.position = "absolute";
      root.style.left = "0px";
      root.style.top = "0px";
      root.style.width = "100%";
      const wrapper = document.createElement("div");
      root.appendChild(wrapper);
      wrapper.appendChild(el);
      document.body.appendChild(root);
      return root;
    }
    function escapeRegExpChars(value) {
      if (!value) return value;
      return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    function removeDiacriticsFromString(value) {
      if (!value) return value;
      return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    function multiColumnSort(inputArray, sortingPriority) {
      const array = JSON.parse(JSON.stringify(inputArray));
      const fieldSorter = (fields) => (a, b) => fields.map((o) => {
        const { field, order, customSort } = o;
        if (typeof customSort === "function") {
          return customSort(a, b, order !== "desc");
        } else {
          const aValue = getValueByPath(a, field);
          const bValue = getValueByPath(b, field);
          const ord = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
          return order === "desc" ? -ord : ord;
        }
      }).reduce((p, n) => p || n, 0);
      return array.sort(fieldSorter(sortingPriority));
    }
    function toCssWidth(width) {
      return width === void 0 ? null : isNaN(+width) ? `${width}` : width + "px";
    }
    const isNil = (value) => value === null || value === void 0;
    function isFragment(vnode) {
      return vnode.type === vue.Fragment;
    }
    const translateTouchAsDragEvent = (event, options) => {
      const { type, target } = options;
      let translateX = 0;
      let translateY = 0;
      if (target != null && target !== event.target) {
        const baseRect = event.target.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        translateX = targetRect.left - baseRect.left;
        translateY = targetRect.top - baseRect.top;
      }
      const touch = event.touches[0] || event.changedTouches[0];
      return new DragEvent(type, {
        dataTransfer: new DataTransfer(),
        bubbles: true,
        screenX: touch.screenX,
        screenY: touch.screenY,
        clientX: touch.clientX + translateX,
        clientY: touch.clientY + translateY,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey
      });
    };

    function debounce(func, wait, immediate) {
      let timeout;
      return function(...args) {
        const context = this;
        const later = function() {
          timeout = void 0;
          func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    let config = {
      defaultIconPack: "mdi",
      defaultIconComponent: null,
      defaultIconPrev: "chevron-left",
      defaultIconNext: "chevron-right",
      defaultLocale: void 0,
      defaultInputAutocomplete: "on",
      defaultInputHasCounter: true,
      defaultCompatFallthrough: true,
      defaultUseHtml5Validation: true,
      defaultStatusIcon: true,
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

    var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
    var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
    var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
    var __objRest = (source, exclude) => {
      var target = {};
      for (var prop in source)
        if (__hasOwnProp$1.call(source, prop) && exclude.indexOf(prop) < 0)
          target[prop] = source[prop];
      if (source != null && __getOwnPropSymbols$1)
        for (var prop of __getOwnPropSymbols$1(source)) {
          if (exclude.indexOf(prop) < 0 && __propIsEnum$1.call(source, prop))
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

    var CheckRadioMixin = vue.defineComponent({
      props: {
        modelValue: [String, Number, Boolean, Function, Object, Array],
        nativeValue: [String, Number, Boolean, Function, Object, Array],
        type: String,
        disabled: Boolean,
        required: Boolean,
        name: String,
        size: String
      },
      emits: {
        // eslint-disable-next-line max-len
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        "update:modelValue": (value) => true
      },
      data() {
        return {
          newValue: this.modelValue
        };
      },
      computed: {
        computedValue: {
          get() {
            return this.newValue;
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          set(value) {
            this.newValue = value;
            this.$emit("update:modelValue", value);
          }
        },
        disabledOrUndefined() {
          return this.disabled || void 0;
        },
        requiredOrUndefined() {
          return this.required || void 0;
        }
      },
      watch: {
        /*
        * When v-model change, set internal value.
        */
        modelValue(value) {
          this.newValue = value;
        }
      },
      methods: {
        focus() {
          this.$refs.input.focus();
        }
      }
    });

    var _sfc_main$9 = vue.defineComponent({
      name: "BCheckbox",
      mixins: [CheckRadioMixin],
      props: {
        indeterminate: Boolean,
        ariaLabelledby: String,
        trueValue: {
          type: [String, Number, Boolean, Function, Object, Array],
          default: true
        },
        falseValue: {
          type: [String, Number, Boolean, Function, Object, Array],
          default: false
        },
        autocomplete: {
          type: String,
          default: "on"
        },
        inputId: {
          type: String,
          default: ""
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

    const _hoisted_1$7 = ["disabled"];
    const _hoisted_2$6 = ["id", ".indeterminate", "autocomplete", "disabled", "required", "name", "value", "true-value", "false-value", "aria-labelledby"];
    const _hoisted_3$5 = ["id"];
    function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("label", {
        class: vue.normalizeClass(["b-checkbox checkbox", [_ctx.size, { "is-disabled": _ctx.disabled }]]),
        ref: "label",
        disabled: _ctx.disabledOrUndefined,
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.focus && _ctx.focus(...args)),
        onKeydown: [
          _cache[3] || (_cache[3] = vue.withKeys(vue.withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["enter"])),
          _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["space"]))
        ]
      }, [
        vue.createCommentVNode(" Checkbox needs to listen for a space event instead of a just a\n             click and enter event so that that using the keyboard spacebar will also\n             trigger the checkbox change in the b-table "),
        vue.withDirectives(vue.createElementVNode("input", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
          id: _ctx.inputId,
          ".indeterminate": _ctx.indeterminate,
          type: "checkbox",
          ref: "input",
          onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
          }, ["stop"])),
          autocomplete: _ctx.autocomplete,
          disabled: _ctx.disabledOrUndefined,
          required: _ctx.requiredOrUndefined,
          name: _ctx.name,
          value: _ctx.nativeValue,
          "true-value": _ctx.trueValue,
          "false-value": _ctx.falseValue,
          "aria-labelledby": _ctx.ariaLabelledby
        }, null, 40, _hoisted_2$6), [
          [vue.vModelCheckbox, _ctx.computedValue]
        ]),
        vue.createElementVNode(
          "span",
          {
            class: vue.normalizeClass(["check", _ctx.type])
          },
          null,
          2
          /* CLASS */
        ),
        vue.createElementVNode("span", {
          id: _ctx.ariaLabelledby,
          class: "control-label"
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 8, _hoisted_3$5)
      ], 42, _hoisted_1$7);
    }
    var BCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);

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

    var _sfc_main$8 = vue.defineComponent({
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

    function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
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
    var BIcon = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);

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

    var _sfc_main$7 = vue.defineComponent({
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

    const _hoisted_1$6 = ["type", "autocomplete", "maxlength"];
    const _hoisted_2$5 = ["maxlength"];
    const _hoisted_3$4 = ["type", "autocomplete", "maxlength"];
    const _hoisted_4$4 = ["maxlength"];
    function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
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
              }), null, 16, _hoisted_1$6)), [
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
              }), null, 16, _hoisted_2$5)), [
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
              }), null, 16, _hoisted_3$4)), [
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
              }), null, 16, _hoisted_4$4)), [
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
    var BInput = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);

    const isSSR = typeof window === "undefined";
    const HTMLElement = isSSR ? Object : window.HTMLElement;

    const Loading = vue.defineComponent({
      name: "BLoading",
      props: {
        modelValue: Boolean,
        programmatic: Boolean,
        container: [Object, Function, HTMLElement],
        isFullPage: {
          type: Boolean,
          default: true
        },
        animation: {
          type: String,
          default: "fade"
        },
        canCancel: {
          type: Boolean,
          default: false
        },
        onCancel: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          type: Function,
          default: () => {
          }
        }
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        close: () => true,
        "update:is-full-page": (_flag) => true,
        "update:modelValue": (_flag) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          isActive: this.modelValue || false,
          displayInFullPage: this.isFullPage
        };
      },
      watch: {
        modelValue(value) {
          this.isActive = value;
        },
        isFullPage(value) {
          this.displayInFullPage = value;
        }
      },
      methods: {
        /*
        * Close the Modal if canCancel.
        */
        cancel() {
          if (!this.canCancel || !this.isActive) return;
          this.close();
        },
        /*
        * Emit events, and destroy modal if it's programmatic.
        */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        close(...args) {
          this.onCancel.apply(null, args);
          this.$emit("close");
          this.$emit("update:modelValue", false);
          if (this.programmatic) {
            this.isActive = false;
            setTimeout(() => {
              removeElement(this.$el);
            }, 150);
          }
        },
        /*
        * Keypress event that is bound to the document.
        */
        keyPress({ key }) {
          if (key === "Escape" || key === "Esc") this.cancel();
        }
      },
      created() {
        if (typeof window !== "undefined") {
          document.addEventListener("keyup", this.keyPress);
        }
      },
      mounted() {
        if (this.programmatic) {
          if (!this.container) {
            document.body.appendChild(this.$el);
          } else {
            this.displayInFullPage = false;
            this.$emit("update:is-full-page", false);
            this.container.appendChild(this.$el);
          }
          this.isActive = true;
        }
      },
      beforeUnmount() {
        if (typeof window !== "undefined") {
          document.removeEventListener("keyup", this.keyPress);
        }
      }
    });

    const _hoisted_1$5 = /* @__PURE__ */ vue.createElementVNode(
      "div",
      { class: "loading-icon" },
      null,
      -1
      /* HOISTED */
    );
    function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createBlock(vue.Transition, { name: _ctx.animation }, {
        default: vue.withCtx(() => [
          _ctx.isActive ? vue.withDirectives((vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(["loading-overlay is-active", { "is-full-page": _ctx.displayInFullPage }])
            },
            [
              vue.createElementVNode("div", {
                class: "loading-background",
                onClick: _cache[0] || (_cache[0] = (...args) => _ctx.cancel && _ctx.cancel(...args))
              }),
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                _hoisted_1$5
              ])
            ],
            2
            /* CLASS */
          )), [
            [vue.vShow, _ctx.isActive]
          ]) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name"]);
    }
    var BLoading = /* @__PURE__ */ _export_sfc(Loading, [["render", _sfc_render$6]]);

    var BSlotComponent = vue.defineComponent({
      name: "BSlotComponent",
      props: {
        component: {
          type: Object,
          required: true
        },
        name: {
          type: String,
          default: "default"
        },
        scoped: {
          type: Boolean
        },
        props: {
          type: Object
        },
        tag: {
          type: [String, Object],
          default: "div"
        }
      },
      methods: {
        refresh() {
          this.$forceUpdate();
        }
      },
      render() {
        return vue.h(
          this.tag,
          {},
          this.component.$slots ? this.scoped ? this.component.$slots[this.name](this.props) : this.component.$slots[this.name]() : void 0
        );
      }
    });

    var _sfc_main$6 = vue.defineComponent({
      name: "BSelect",
      components: {
        BIcon
      },
      mixins: [CompatFallthroughMixin, FormElementMixin],
      props: {
        modelValue: {
          type: [
            String,
            Number,
            Boolean,
            Object,
            Array,
            Function,
            Date,
            null
          ],
          default: null
        },
        placeholder: String,
        multiple: Boolean,
        nativeSize: [String, Number]
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        blur: (_event) => true,
        focus: (_event) => true,
        "update:modelValue": (_value) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          selected: this.modelValue,
          _elementRef: "select"
        };
      },
      computed: {
        computedValue: {
          get() {
            return this.selected;
          },
          set(value) {
            this.selected = value;
            this.$emit("update:modelValue", value);
            !this.isValid && this.checkHtml5Validity();
          }
        },
        spanClasses() {
          return [this.size, this.statusType, {
            "is-fullwidth": this.expanded,
            "is-loading": this.loading,
            "is-multiple": this.multiple,
            "is-rounded": this.rounded,
            "is-empty": this.selected === null
          }];
        }
      },
      watch: {
        /*
        * When v-model is changed:
        *   1. Set the selected option.
        *   2. If it's invalid, validate again.
        */
        modelValue(value) {
          this.selected = value;
          !this.isValid && this.checkHtml5Validity();
        }
      }
    });

    const _hoisted_1$4 = ["multiple", "size"];
    const _hoisted_2$4 = {
      key: 0,
      value: null,
      disabled: "",
      hidden: ""
    };
    function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        vue.mergeProps({
          class: ["control", { "is-expanded": _ctx.expanded, "has-icons-left": _ctx.icon }]
        }, _ctx.rootAttrs),
        [
          vue.createElementVNode(
            "span",
            {
              class: vue.normalizeClass(["select", _ctx.spanClasses])
            },
            [
              vue.withDirectives(vue.createElementVNode("select", vue.mergeProps({
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
                ref: "select",
                multiple: _ctx.multiple,
                size: _ctx.nativeSize
              }, _ctx.fallthroughAttrs, {
                onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
                onFocus: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("focus", $event))
              }), [
                _ctx.placeholder ? (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 0 },
                  [
                    _ctx.computedValue == null ? (vue.openBlock(), vue.createElementBlock(
                      "option",
                      _hoisted_2$4,
                      vue.toDisplayString(_ctx.placeholder),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : vue.createCommentVNode("v-if", true),
                vue.renderSlot(_ctx.$slots, "default")
              ], 16, _hoisted_1$4), [
                [vue.vModelSelect, _ctx.computedValue]
              ])
            ],
            2
            /* CLASS */
          ),
          _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 0,
            class: "is-left",
            icon: _ctx.icon,
            pack: _ctx.iconPack,
            size: _ctx.iconSize
          }, null, 8, ["icon", "pack", "size"])) : vue.createCommentVNode("v-if", true)
        ],
        16
        /* FULL_PROPS */
      );
    }
    var BSelect = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5]]);

    var _sfc_main$5 = vue.defineComponent({
      name: "BTableMobileSort",
      components: {
        BSelect,
        BIcon
      },
      props: {
        currentSortColumn: Object,
        sortMultipleData: Array,
        isAsc: Boolean,
        columns: Array,
        placeholder: String,
        iconPack: String,
        sortIcon: {
          type: String,
          default: "arrow-up"
        },
        sortIconSize: {
          type: String,
          default: "is-small"
        },
        sortMultiple: {
          type: Boolean,
          default: false
        }
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        removePriority: (_column) => true,
        sort: (_column, _event) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          sortMultipleSelect: null,
          sortMultipleSelectIndex: -1,
          mobileSort: this.currentSortColumn,
          mobileSortIndex: this.columns ? this.columns.indexOf(this.currentSortColumn) : -1,
          defaultEvent: {
            shiftKey: true,
            altKey: true,
            ctrlKey: true
          },
          ignoreSort: false
        };
      },
      computed: {
        showPlaceholder() {
          return !this.columns || !this.columns.some((column) => column === this.mobileSort);
        },
        sortableColumns() {
          return this.columns && this.columns.filter((column) => column.sortable);
        }
      },
      watch: {
        sortMultipleSelect(column) {
          if (this.ignoreSort) {
            this.ignoreSort = false;
          } else {
            this.$emit("sort", column, this.defaultEvent);
          }
        },
        sortMultipleSelectIndex(index) {
          if (index !== -1) {
            this.sortMultipleSelect = this.columns[index];
          } else {
            this.sortMultipleSelect = null;
          }
        },
        mobileSort(column) {
          if (this.currentSortColumn === column) return;
          this.$emit("sort", column, this.defaultEvent);
        },
        mobileSortIndex(index) {
          if (index !== -1) {
            this.mobileSort = this.columns[index];
          }
        },
        currentSortColumn(column) {
          this.mobileSort = column;
          this.mobileSortIndex = this.columns ? this.columns.indexOf(column) : -1;
        },
        columns(newColumns) {
          if (this.sortMultiple) {
            this.sortMultipleSelectIndex = newColumns.indexOf(
              this.sortMultipleSelect
            );
          } else {
            this.mobileSortIndex = newColumns.indexOf(this.mobileSort);
          }
        }
      },
      methods: {
        removePriority() {
          this.$emit("removePriority", this.sortMultipleSelect);
          this.ignoreSort = true;
          const remainingFields = this.sortMultipleData.filter((data) => data.field !== this.sortMultipleSelect.field).map((data) => data.field);
          this.sortMultipleSelectIndex = this.columns.findIndex((column) => remainingFields.includes(column.field));
        },
        getSortingObjectOfColumn(column) {
          return this.sortMultipleData.filter((i) => i.field === column.field)[0];
        },
        columnIsDesc(column) {
          const sortingObject = column && this.getSortingObjectOfColumn(column);
          if (sortingObject) {
            return !!(sortingObject.order && sortingObject.order === "desc");
          }
          return true;
        },
        getLabel(column) {
          const sortingObject = this.getSortingObjectOfColumn(column);
          if (sortingObject) {
            return column.label + "(" + (this.sortMultipleData.indexOf(sortingObject) + 1) + ")";
          }
          return column.label;
        },
        sort() {
          this.$emit("sort", this.sortMultiple ? this.sortMultipleSelect : this.mobileSort, this.defaultEvent);
        }
      }
    });

    const _hoisted_1$3 = { class: "field table-mobile-sort" };
    const _hoisted_2$3 = { class: "field has-addons" };
    const _hoisted_3$3 = ["value"];
    const _hoisted_4$3 = ["value"];
    const _hoisted_5$2 = { class: "control" };
    function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_select = vue.resolveComponent("b-select");
      const _component_b_icon = vue.resolveComponent("b-icon");
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
        vue.createElementVNode("div", _hoisted_2$3, [
          _ctx.sortMultiple ? (vue.openBlock(), vue.createBlock(_component_b_select, {
            key: 0,
            modelValue: _ctx.sortMultipleSelectIndex,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.sortMultipleSelectIndex = $event),
            expanded: ""
          }, {
            default: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(_ctx.sortableColumns, (column, index) => {
                  return vue.openBlock(), vue.createElementBlock("option", {
                    key: index,
                    value: index
                  }, [
                    vue.createTextVNode(
                      vue.toDisplayString(_ctx.getLabel(column)) + " ",
                      1
                      /* TEXT */
                    ),
                    _ctx.getSortingObjectOfColumn(column) ? (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      { key: 0 },
                      [
                        _ctx.columnIsDesc(column) ? (vue.openBlock(), vue.createElementBlock(
                          vue.Fragment,
                          { key: 0 },
                          [
                            vue.createTextVNode(" ↓ ")
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        )) : (vue.openBlock(), vue.createElementBlock(
                          vue.Fragment,
                          { key: 1 },
                          [
                            vue.createTextVNode(" ↑ ")
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    )) : vue.createCommentVNode("v-if", true)
                  ], 8, _hoisted_3$3);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])) : (vue.openBlock(), vue.createBlock(_component_b_select, {
            key: 1,
            modelValue: _ctx.mobileSortIndex,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.mobileSortIndex = $event),
            expanded: ""
          }, {
            default: vue.withCtx(() => [
              _ctx.placeholder ? vue.withDirectives((vue.openBlock(), vue.createElementBlock(
                "option",
                {
                  key: 0,
                  value: {},
                  selected: "",
                  disabled: "",
                  hidden: ""
                },
                vue.toDisplayString(_ctx.placeholder),
                513
                /* TEXT, NEED_PATCH */
              )), [
                [vue.vShow, _ctx.showPlaceholder]
              ]) : vue.createCommentVNode("v-if", true),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(_ctx.sortableColumns, (column, index) => {
                  return vue.openBlock(), vue.createElementBlock("option", {
                    key: index,
                    value: index
                  }, vue.toDisplayString(column.label), 9, _hoisted_4$3);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])),
          vue.createElementVNode("div", _hoisted_5$2, [
            _ctx.sortMultiple && _ctx.sortMultipleData.length > 0 ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              [
                vue.createElementVNode("button", {
                  class: "button is-primary",
                  onClick: _cache[2] || (_cache[2] = (...args) => _ctx.sort && _ctx.sort(...args))
                }, [
                  vue.createVNode(_component_b_icon, {
                    class: vue.normalizeClass({ "is-desc": _ctx.columnIsDesc(_ctx.sortMultipleSelect) }),
                    icon: _ctx.sortIcon,
                    pack: _ctx.iconPack,
                    size: _ctx.sortIconSize,
                    both: ""
                  }, null, 8, ["class", "icon", "pack", "size"])
                ]),
                vue.createElementVNode("button", {
                  class: "button is-primary",
                  onClick: _cache[3] || (_cache[3] = (...args) => _ctx.removePriority && _ctx.removePriority(...args))
                }, [
                  vue.createVNode(_component_b_icon, {
                    icon: "delete",
                    size: _ctx.sortIconSize,
                    both: ""
                  }, null, 8, ["size"])
                ])
              ],
              64
              /* STABLE_FRAGMENT */
            )) : !_ctx.sortMultiple ? (vue.openBlock(), vue.createElementBlock("button", {
              key: 1,
              class: "button is-primary",
              onClick: _cache[4] || (_cache[4] = (...args) => _ctx.sort && _ctx.sort(...args))
            }, [
              vue.withDirectives(vue.createVNode(_component_b_icon, {
                class: vue.normalizeClass({ "is-desc": !_ctx.isAsc }),
                icon: _ctx.sortIcon,
                pack: _ctx.iconPack,
                size: _ctx.sortIconSize,
                both: ""
              }, null, 8, ["class", "icon", "pack", "size"]), [
                [vue.vShow, _ctx.currentSortColumn === _ctx.mobileSort]
              ])
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ])
      ]);
    }
    var BTableMobileSort = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4]]);

    var _sfc_main$4 = vue.defineComponent({
      name: "BPaginationButton",
      props: {
        page: {
          type: Object,
          required: true
        },
        tag: {
          type: [String, Object],
          default: "a",
          validator: (value) => {
            return typeof value === "object" || config.defaultLinkTags.indexOf(value) >= 0;
          }
        },
        disabled: {
          type: Boolean,
          default: false
        }
      },
      computed: {
        href() {
          if (this.tag === "a") {
            return "#";
          } else {
            return void 0;
          }
        },
        isDisabled() {
          return this.disabled || this.page.disabled;
        },
        disabledOrUndefined() {
          return this.isDisabled || void 0;
        }
      }
    });

    function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), vue.mergeProps({
        role: "button",
        href: _ctx.href,
        disabled: _ctx.disabledOrUndefined,
        class: ["pagination-link", { "is-current": _ctx.page.isCurrent, [_ctx.page.class]: true }]
      }, _ctx.$attrs, {
        onClick: vue.withModifiers(_ctx.page.click, ["prevent"]),
        "aria-label": _ctx.page["aria-label"],
        "aria-current": _ctx.page.isCurrent || void 0
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createTextVNode(
              vue.toDisplayString(_ctx.page.number),
              1
              /* TEXT */
            )
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["href", "disabled", "class", "onClick", "aria-label", "aria-current"]);
    }
    var BPaginationButton = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3]]);

    var _sfc_main$3 = vue.defineComponent({
      name: "BPagination",
      components: {
        BIcon,
        BPaginationButton
      },
      props: {
        total: [Number, String],
        perPage: {
          type: [Number, String],
          default: 20
        },
        modelValue: {
          type: [Number, String],
          default: 1
        },
        rangeBefore: {
          type: [Number, String],
          default: 1
        },
        rangeAfter: {
          type: [Number, String],
          default: 1
        },
        size: String,
        simple: Boolean,
        rounded: Boolean,
        order: String,
        iconPack: String,
        iconPrev: {
          type: String,
          default: () => {
            return config.defaultIconPrev;
          }
        },
        iconNext: {
          type: String,
          default: () => {
            return config.defaultIconNext;
          }
        },
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String,
        pageInput: {
          type: Boolean,
          default: false
        },
        pageInputPosition: String,
        debouncePageInput: [Number, String]
      },
      data() {
        return {
          inputValue: this.modelValue,
          debounceHandlePageInput: void 0
        };
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        change: (_num) => true,
        "update:modelValue": (_num) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      computed: {
        rootClasses() {
          return [
            this.order,
            this.size,
            this.pageInputPosition,
            {
              "is-simple": this.simple,
              "is-rounded": this.rounded,
              "has-input": this.pageInput
            }
          ];
        },
        beforeCurrent() {
          return parseInt(this.rangeBefore + "");
        },
        afterCurrent() {
          return parseInt(this.rangeAfter + "");
        },
        /*
        * Total page size (count).
        */
        pageCount() {
          return Math.ceil(+this.total / +this.perPage);
        },
        /*
        * First item of the page (count).
        */
        firstItem() {
          const firstItem = +this.modelValue * +this.perPage - +this.perPage + 1;
          return firstItem >= 0 ? firstItem : 0;
        },
        /*
        * Check if previous button is available.
        */
        hasPrev() {
          return +this.modelValue > 1;
        },
        /*
         * Check if first page button should be visible.
        */
        hasFirst() {
          return +this.modelValue >= 2 + this.beforeCurrent;
        },
        /*
        * Check if first ellipsis should be visible.
        */
        hasFirstEllipsis() {
          return +this.modelValue >= this.beforeCurrent + 4;
        },
        /*
        * Check if last page button should be visible.
        */
        hasLast() {
          return +this.modelValue <= this.pageCount - (1 + this.afterCurrent);
        },
        /*
        * Check if last ellipsis should be visible.
        */
        hasLastEllipsis() {
          return +this.modelValue < this.pageCount - (2 + this.afterCurrent);
        },
        /*
        * Check if next button is available.
        */
        hasNext() {
          return +this.modelValue < this.pageCount;
        },
        /*
        * Get near pages, 1 before and 1 after the current.
        * Also add the click event to the array.
        */
        pagesInRange() {
          if (this.simple) return;
          let left = Math.max(1, +this.modelValue - this.beforeCurrent);
          if (left - 1 === 2) {
            left--;
          }
          let right = Math.min(+this.modelValue + this.afterCurrent, this.pageCount);
          if (this.pageCount - right === 2) {
            right++;
          }
          const pages = [];
          for (let i = left; i <= right; i++) {
            pages.push(this.getPage(i));
          }
          return pages;
        }
      },
      watch: {
        /*
        * If current page is trying to be greater than page count, set to last.
        */
        pageCount(value) {
          if (this.modelValue > value) this.last();
        },
        modelValue(value) {
          this.inputValue = value;
        },
        debouncePageInput: {
          handler(value) {
            this.debounceHandlePageInput = debounce(
              this.handleOnInputPageChange,
              value
            );
          },
          immediate: true
        }
      },
      methods: {
        /*
        * Previous button click listener.
        */
        prev(event) {
          this.changePage(+this.modelValue - 1, event);
        },
        /*
         * Next button click listener.
        */
        next(event) {
          this.changePage(+this.modelValue + 1, event);
        },
        /*
         * First button click listener.
        */
        first(event) {
          this.changePage(1, event);
        },
        /*
        * Last button click listener.
        */
        last(event) {
          this.changePage(this.pageCount, event);
        },
        changePage(num, event) {
          if (this.modelValue === num || num < 1 || num > this.pageCount) return;
          this.$emit("update:modelValue", num);
          this.$emit("change", num);
          if (event && event.target) {
            this.$nextTick(() => event.target.focus());
          }
        },
        getPage(num, options = {}) {
          return {
            number: num,
            isCurrent: this.modelValue === num,
            click: (event) => this.changePage(num, event),
            input: (event, inputNum) => this.changePage(+inputNum, event),
            disabled: options.disabled || false,
            class: options.class || "",
            "aria-label": options["aria-label"] || this.getAriaPageLabel(num, this.modelValue === num)
          };
        },
        /*
        * Get text for aria-label according to page number.
        */
        getAriaPageLabel(pageNumber, isCurrent) {
          if (this.ariaPageLabel && (!isCurrent || !this.ariaCurrentLabel)) {
            return this.ariaPageLabel + " " + pageNumber + ".";
          } else if (this.ariaPageLabel && isCurrent && this.ariaCurrentLabel) {
            return this.ariaCurrentLabel + ", " + this.ariaPageLabel + " " + pageNumber + ".";
          }
          return null;
        },
        handleOnInputPageChange(event) {
          this.getPage(+this.inputValue).input(event, this.inputValue);
        },
        handleOnInputDebounce(event) {
          if (this.debouncePageInput) {
            this.debounceHandlePageInput(event);
          } else {
            this.handleOnInputPageChange(event);
          }
        },
        handleOnKeyPress(event) {
          const ASCIICode = event.which || event.keyCode;
          if (ASCIICode >= 48 && ASCIICode <= 57) {
            return true;
          } else {
            return event.preventDefault();
          }
        },
        handleAllowableInputPageRange(event) {
          const target = event.target;
          if (+target.value > 0 && +target.value <= this.pageCount) {
            this.handleOnInputValue(event);
          } else {
            this.inputValue = 1;
            this.inputValue = "";
          }
        },
        handleOnInputValue(event) {
          const inputValue = +event.target.value;
          this.inputValue = inputValue;
          if (Number.isInteger(this.inputValue)) {
            this.handleOnInputDebounce(event);
          } else {
            this.inputValue = this.modelValue;
          }
        }
      }
    });

    const _hoisted_1$2 = { class: "control pagination-input" };
    const _hoisted_2$2 = ["value", "size", "maxlength"];
    const _hoisted_3$2 = {
      key: 4,
      class: "info"
    };
    const _hoisted_4$2 = {
      key: 5,
      class: "pagination-list"
    };
    const _hoisted_5$1 = { key: 0 };
    const _hoisted_6$1 = { key: 1 };
    const _hoisted_7$1 = /* @__PURE__ */ vue.createElementVNode(
      "span",
      { class: "pagination-ellipsis" },
      "…",
      -1
      /* HOISTED */
    );
    const _hoisted_8$1 = [
      _hoisted_7$1
    ];
    const _hoisted_9$1 = { key: 2 };
    const _hoisted_10$1 = /* @__PURE__ */ vue.createElementVNode(
      "span",
      { class: "pagination-ellipsis" },
      "…",
      -1
      /* HOISTED */
    );
    const _hoisted_11$1 = [
      _hoisted_10$1
    ];
    const _hoisted_12$1 = { key: 3 };
    function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");
      const _component_BPaginationButton = vue.resolveComponent("BPaginationButton");
      return vue.openBlock(), vue.createElementBlock(
        "nav",
        {
          class: vue.normalizeClass(["pagination", _ctx.rootClasses])
        },
        [
          _ctx.$slots.previous ? vue.renderSlot(_ctx.$slots, "previous", {
            key: 0,
            page: _ctx.getPage(+_ctx.modelValue - 1, {
              disabled: !_ctx.hasPrev,
              class: "pagination-previous",
              "aria-label": _ctx.ariaPreviousLabel
            })
          }, () => [
            vue.createVNode(_component_b_icon, {
              icon: _ctx.iconPrev,
              pack: _ctx.iconPack,
              both: "",
              "aria-hidden": "true"
            }, null, 8, ["icon", "pack"])
          ]) : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
            key: 1,
            class: "pagination-previous",
            disabled: !_ctx.hasPrev,
            page: _ctx.getPage(+_ctx.modelValue - 1),
            "aria-label": _ctx.ariaPreviousLabel
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_b_icon, {
                icon: _ctx.iconPrev,
                pack: _ctx.iconPack,
                both: "",
                "aria-hidden": "true"
              }, null, 8, ["icon", "pack"])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["disabled", "page", "aria-label"])),
          _ctx.$slots.next ? vue.renderSlot(_ctx.$slots, "next", {
            key: 2,
            page: _ctx.getPage(+_ctx.modelValue + 1, {
              disabled: !_ctx.hasNext,
              class: "pagination-next",
              "aria-label": _ctx.ariaNextLabel
            })
          }, () => [
            vue.createVNode(_component_b_icon, {
              icon: _ctx.iconNext,
              pack: _ctx.iconPack,
              both: "",
              "aria-hidden": "true"
            }, null, 8, ["icon", "pack"])
          ]) : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
            key: 3,
            class: "pagination-next",
            disabled: !_ctx.hasNext,
            page: _ctx.getPage(+_ctx.modelValue + 1),
            "aria-label": _ctx.ariaNextLabel
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_b_icon, {
                icon: _ctx.iconNext,
                pack: _ctx.iconPack,
                both: "",
                "aria-hidden": "true"
              }, null, 8, ["icon", "pack"])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["disabled", "page", "aria-label"])),
          vue.createElementVNode("div", _hoisted_1$2, [
            _ctx.pageInput ? (vue.openBlock(), vue.createElementBlock("input", {
              key: 0,
              class: "input",
              value: _ctx.inputValue,
              onInput: _cache[0] || (_cache[0] = (...args) => _ctx.handleAllowableInputPageRange && _ctx.handleAllowableInputPageRange(...args)),
              onKeypress: _cache[1] || (_cache[1] = (...args) => _ctx.handleOnKeyPress && _ctx.handleOnKeyPress(...args)),
              size: _ctx.pageCount.toString().length,
              maxlength: _ctx.pageCount.toString().length
            }, null, 40, _hoisted_2$2)) : vue.createCommentVNode("v-if", true)
          ]),
          _ctx.simple ? (vue.openBlock(), vue.createElementBlock("small", _hoisted_3$2, [
            _ctx.perPage == 1 ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              [
                vue.createTextVNode(
                  vue.toDisplayString(_ctx.firstItem) + " / " + vue.toDisplayString(_ctx.total),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 1 },
              [
                vue.createTextVNode(
                  vue.toDisplayString(_ctx.firstItem) + "-" + vue.toDisplayString(Math.min(+_ctx.modelValue * +_ctx.perPage, +_ctx.total)) + " / " + vue.toDisplayString(_ctx.total),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ])) : (vue.openBlock(), vue.createElementBlock("ul", _hoisted_4$2, [
            vue.createCommentVNode("First"),
            _ctx.hasFirst ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_5$1, [
              _ctx.$slots.default ? vue.renderSlot(_ctx.$slots, "default", {
                key: 0,
                page: _ctx.getPage(1)
              }) : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
                key: 1,
                page: _ctx.getPage(1)
              }, null, 8, ["page"]))
            ])) : vue.createCommentVNode("v-if", true),
            _ctx.hasFirstEllipsis ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_6$1, [..._hoisted_8$1])) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode("Pages"),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(_ctx.pagesInRange, (page) => {
                return vue.openBlock(), vue.createElementBlock("li", {
                  key: page.number
                }, [
                  _ctx.$slots.default ? vue.renderSlot(_ctx.$slots, "default", {
                    key: 0,
                    page
                  }) : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
                    key: 1,
                    page
                  }, null, 8, ["page"]))
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            vue.createCommentVNode("Last"),
            _ctx.hasLastEllipsis ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_9$1, [..._hoisted_11$1])) : vue.createCommentVNode("v-if", true),
            _ctx.hasLast ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_12$1, [
              _ctx.$slots.default ? vue.renderSlot(_ctx.$slots, "default", {
                key: 0,
                page: _ctx.getPage(_ctx.pageCount)
              }) : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
                key: 1,
                page: _ctx.getPage(_ctx.pageCount)
              }, null, 8, ["page"]))
            ])) : vue.createCommentVNode("v-if", true)
          ]))
        ],
        2
        /* CLASS */
      );
    }
    var BPagination = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2]]);

    var _sfc_main$2 = vue.defineComponent({
      name: "BTablePagination",
      components: {
        BPagination
      },
      props: {
        paginated: Boolean,
        total: [Number, String],
        perPage: [Number, String],
        currentPage: [Number, String],
        paginationSimple: Boolean,
        paginationSize: String,
        rounded: Boolean,
        iconPack: String,
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String,
        pageInput: Boolean,
        paginationOrder: String,
        pageInputPosition: String,
        debouncePageInput: [Number, String]
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        "page-change": (_page) => true,
        "update:currentPage": (_page) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          newCurrentPage: this.currentPage
        };
      },
      watch: {
        currentPage(newVal) {
          this.newCurrentPage = newVal;
        }
      },
      methods: {
        /*
        * Paginator change listener.
        */
        pageChanged(page) {
          this.newCurrentPage = page > 0 ? page : 1;
          this.$emit("update:currentPage", this.newCurrentPage);
          this.$emit("page-change", this.newCurrentPage);
        }
      }
    });

    const _hoisted_1$1 = { class: "top level" };
    const _hoisted_2$1 = { class: "level-left" };
    const _hoisted_3$1 = { class: "level-right" };
    const _hoisted_4$1 = {
      key: 0,
      class: "level-item"
    };
    function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_pagination = vue.resolveComponent("b-pagination");
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
        vue.createElementVNode("div", _hoisted_2$1, [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        vue.createElementVNode("div", _hoisted_3$1, [
          _ctx.paginated ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$1, [
            vue.createVNode(_component_b_pagination, {
              "icon-pack": _ctx.iconPack,
              total: _ctx.total,
              "per-page": _ctx.perPage,
              simple: _ctx.paginationSimple,
              size: _ctx.paginationSize,
              "model-value": _ctx.newCurrentPage,
              rounded: _ctx.rounded,
              onChange: _ctx.pageChanged,
              "aria-next-label": _ctx.ariaNextLabel,
              "aria-previous-label": _ctx.ariaPreviousLabel,
              "aria-page-label": _ctx.ariaPageLabel,
              "aria-current-label": _ctx.ariaCurrentLabel,
              "page-input": _ctx.pageInput,
              order: _ctx.paginationOrder,
              "page-input-position": _ctx.pageInputPosition,
              "debounce-page-input": _ctx.debouncePageInput
            }, null, 8, ["icon-pack", "total", "per-page", "simple", "size", "model-value", "rounded", "onChange", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label", "page-input", "order", "page-input-position", "debounce-page-input"])
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ]);
    }
    var BTablePagination = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1]]);

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
    function mockTableColumn(table, column) {
      const defaultProps = {
        label: void 0,
        customKey: void 0,
        field: void 0,
        meta: void 0,
        width: void 0,
        numeric: void 0,
        centered: void 0,
        searchable: void 0,
        sortable: void 0,
        visible: true,
        subheading: void 0,
        customSort: void 0,
        customSearch: void 0,
        sticky: void 0,
        headerSelectable: void 0,
        headerClass: void 0,
        /* eslint-disable @typescript-eslint/no-explicit-any */
        thAttrs: () => ({}),
        tdAttrs: () => ({})
        /* eslint-enable @typescript-eslint/no-explicit-any */
      };
      return __spreadProps(__spreadValues(__spreadValues({}, defaultProps), column), {
        // data
        newKey: column.customKey || column.label,
        _isTableColumn: true,
        // public computed
        get thClasses() {
          const attrs = this.thAttrs(this);
          const classes = [this.headerClass, {
            "is-sortable": this.sortable,
            "is-sticky": this.sticky,
            "is-unselectable": this.isHeaderUnSelectable
          }];
          if (attrs && attrs.class) {
            classes.push(attrs.class);
          }
          return classes;
        },
        get thStyle() {
          const attrs = this.thAttrs(this);
          const style = [this.style];
          if (attrs && attrs.style) {
            style.push(attrs.style);
          }
          return style;
        },
        get thWrapStyle() {
          return this.style;
        },
        get style() {
          var _a;
          return {
            width: (_a = toCssWidth(this.width)) != null ? _a : void 0
            // null → undefined to satisfy StyleValue
          };
        },
        getRootClasses(row) {
          const attrs = this.tdAttrs(row, this);
          const classes = [this.rootClasses];
          if (attrs && attrs.class) {
            classes.push(attrs.class);
          }
          return classes;
        },
        getRootStyle(row) {
          const attrs = this.tdAttrs(row, this);
          const style = [];
          if (attrs && attrs.style) {
            style.push(attrs.style);
          }
          return style;
        },
        $slots: {
          default: (props) => {
            const vnode = vue.h("span", {
              innerHTML: getValueByPath(props.row, column.field)
            });
            return [vnode];
          }
        },
        // private properties
        get rootClasses() {
          return [this.cellClass, {
            "has-text-right": this.numeric && !this.centered,
            "has-text-centered": this.centered,
            "is-sticky": this.sticky
          }];
        },
        get isHeaderUnSelectable() {
          return !this.headerSelectable && !!this.sortable;
        }
      });
    }

    const BLANK_COLUMN = {
      thAttrs: () => ({}),
      tdAttrs: () => ({}),
      getRootClasses: () => [],
      getRootStyle: () => void 0,
      $slots: {}
    };
    var _sfc_main$1 = vue.defineComponent({
      name: "BTable",
      components: {
        BCheckbox,
        BIcon,
        BInput,
        BLoading,
        BSlotComponent,
        BTableMobileSort,
        BTablePagination
      },
      mixins: [CompatFallthroughMixin],
      provide() {
        return {
          $table: this
        };
      },
      props: {
        data: {
          type: Array,
          default: () => []
        },
        columns: {
          type: Array,
          default: () => []
        },
        bordered: Boolean,
        striped: Boolean,
        narrowed: Boolean,
        hoverable: Boolean,
        loading: Boolean,
        detailed: Boolean,
        checkable: Boolean,
        headerCheckable: {
          type: Boolean,
          default: true
        },
        checkboxType: {
          type: String,
          default: "is-primary"
        },
        checkboxPosition: {
          type: String,
          default: "left",
          validator: (value) => {
            return [
              "left",
              "right"
            ].indexOf(value) >= 0;
          }
        },
        stickyCheckbox: {
          type: Boolean,
          default: false
        },
        selected: Object,
        isRowSelectable: {
          type: Function,
          default: () => true
        },
        focusable: Boolean,
        customIsChecked: Function,
        isRowCheckable: {
          type: Function,
          default: () => true
        },
        checkedRows: {
          type: Array,
          default: () => []
        },
        mobileCards: {
          type: Boolean,
          default: true
        },
        defaultSort: [String, Array],
        defaultSortDirection: {
          type: String,
          default: "asc"
        },
        sortIcon: {
          type: String,
          default: "arrow-up"
        },
        sortIconSize: {
          type: String,
          default: "is-small"
        },
        sortMultiple: {
          type: Boolean,
          default: false
        },
        sortMultipleData: {
          type: Array,
          default: () => []
        },
        sortMultipleKey: {
          type: String,
          default: null
        },
        paginated: Boolean,
        currentPage: {
          type: Number,
          default: 1
        },
        perPage: {
          type: [Number, String],
          default: 20
        },
        showDetailIcon: {
          type: Boolean,
          default: true
        },
        detailIcon: {
          type: String,
          default: "chevron-right"
        },
        paginationPosition: {
          type: String,
          default: "bottom",
          validator: (value) => {
            return [
              "bottom",
              "top",
              "both"
            ].indexOf(value) >= 0;
          }
        },
        paginationRounded: Boolean,
        backendSorting: Boolean,
        backendFiltering: Boolean,
        rowClass: {
          type: Function,
          default: () => ""
        },
        openedDetailed: {
          type: Array,
          default: () => []
        },
        hasDetailedVisible: {
          type: Function,
          default: () => true
        },
        detailKey: {
          type: String,
          default: ""
        },
        detailTransition: {
          type: String,
          default: ""
        },
        customDetailRow: {
          type: Boolean,
          default: false
        },
        backendPagination: Boolean,
        total: {
          type: [Number, String],
          default: 0
        },
        iconPack: String,
        mobileSortPlaceholder: String,
        customRowKey: String,
        draggable: {
          type: Boolean,
          default: false
        },
        draggableColumn: {
          type: Boolean,
          default: false
        },
        scrollable: Boolean,
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String,
        stickyHeader: Boolean,
        height: [Number, String],
        filtersEvent: {
          type: String,
          default: ""
        },
        cardLayout: Boolean,
        showHeader: {
          type: Boolean,
          default: true
        },
        debounceSearch: Number,
        caption: String,
        showCaption: {
          type: Boolean,
          default: true
        },
        pageInput: {
          type: Boolean,
          default: false
        },
        paginationOrder: String,
        pageInputPosition: String,
        debouncePageInput: [Number, String]
      },
      emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        cellclick: (_row, _column, _rowIndex, _colIndex) => true,
        check: (_checkedRows, _row) => true,
        "check-all": (_rows) => true,
        click: (_row) => true,
        columndragend: (_event) => true,
        columndragleave: (_event) => true,
        columndragover: (_event) => true,
        columndragstart: (_event) => true,
        columndrop: (_event) => true,
        contextmenu: (_row, _event) => true,
        dblclick: (_row) => true,
        "details-close": (_row) => true,
        "details-open": (_row) => true,
        dragend: (_event) => true,
        dragleave: (_event) => true,
        dragover: (_event) => true,
        dragstart: (_event) => true,
        drop: (_event) => true,
        "filters-change": (_value) => true,
        "page-change": (_page) => true,
        select: (_new, _old) => true,
        sort: (_field, _order, _event) => true,
        "sorting-priority-removed": (_field) => true,
        "update:checkedRows": (_rows) => true,
        "update:currentPage": (_page) => true,
        "update:openedDetailed": (_rows) => true,
        "update:selected": (_row) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      data() {
        return {
          sortMultipleDataLocal: [],
          getValueByPath,
          visibleDetailRows: this.openedDetailed,
          newData: this.data,
          newDataTotal: this.backendPagination ? this.total : this.data.length,
          newCheckedRows: [...this.checkedRows],
          lastCheckedRowIndex: null,
          newCurrentPage: this.currentPage,
          currentSortColumn: {},
          isAsc: true,
          filters: {},
          defaultSlots: [],
          firstTimeSort: true,
          // Used by first time initSort
          isDraggingRow: false,
          isDraggingColumn: false,
          debouncedHandleFiltersChange: void 0,
          // for touch-enabled devices
          _selectedRow: null,
          mayBeTouchDragging: false,
          touchDragoverTarget: null,
          _draggedCellEl: void 0,
          draggedCellContent: ""
        };
      },
      computed: {
        sortMultipleDataComputed() {
          return this.backendSorting ? this.sortMultipleData : this.sortMultipleDataLocal;
        },
        tableClasses() {
          return {
            "is-bordered": this.bordered,
            "is-striped": this.striped,
            "is-narrow": this.narrowed,
            "is-hoverable": (this.hoverable || this.focusable) && this.visibleData.length
          };
        },
        tableWrapperClasses() {
          return {
            "has-mobile-cards": this.mobileCards,
            "has-sticky-header": this.stickyHeader,
            "is-card-list": this.cardLayout,
            "table-container": this.isScrollable
          };
        },
        tableStyle() {
          return {
            height: toCssWidth(this.height)
          };
        },
        touchDraggedCellClasses() {
          return {
            "has-mobile-cards": this.mobileCards
          };
        },
        /*
        * Splitted data based on the pagination.
        */
        visibleData() {
          if (!this.paginated) return this.newData;
          const currentPage = this.newCurrentPage;
          const perPage = +this.perPage;
          if (this.newData.length <= perPage) {
            return this.newData;
          } else {
            const start = (currentPage - 1) * perPage;
            const end = parseInt(start + "", 10) + parseInt(perPage + "", 10);
            return this.newData.slice(start, end);
          }
        },
        visibleColumns() {
          if (!this.newColumns) return this.newColumns;
          return this.newColumns.filter((column) => {
            return column.visible || column.visible === void 0;
          });
        },
        /*
        * Check if all rows in the page are checked.
        */
        isAllChecked() {
          const validVisibleData = this.visibleData.filter(
            (row) => this.isRowCheckable(row)
          );
          if (validVisibleData.length === 0) return false;
          const isAllChecked = validVisibleData.some((currentVisibleRow) => {
            return indexOf(this.newCheckedRows, currentVisibleRow, this.customIsChecked) < 0;
          });
          return !isAllChecked;
        },
        /*
        * Check if all rows in the page are checkable.
        */
        isAllUncheckable() {
          const validVisibleData = this.visibleData.filter(
            (row) => this.isRowCheckable(row)
          );
          return validVisibleData.length === 0;
        },
        /*
        * Check if has any sortable column.
        */
        hasSortablenewColumns() {
          return this.newColumns.some((column) => {
            return column.sortable;
          });
        },
        /*
        * Check if has any searchable column.
        */
        hasSearchablenewColumns() {
          return this.newColumns.some((column) => {
            return column.searchable;
          });
        },
        /*
        * Check if has any column using subheading.
        */
        hasCustomSubheadings() {
          if (this.$slots && this.$slots.subheading) return true;
          return this.newColumns.some((column) => {
            return column.subheading || column.$slots.subheading;
          });
        },
        /*
        * Return total column count based if it's checkable or expanded
        */
        columnCount() {
          let count = this.visibleColumns.length;
          count += this.checkable ? 1 : 0;
          count += this.detailed && this.showDetailIcon ? 1 : 0;
          return count;
        },
        /*
        * return if detailed row tabled
        * will be with chevron column & icon or not
        */
        showDetailRowIcon() {
          return this.detailed && this.showDetailIcon;
        },
        /*
        * return if scrollable table
        */
        isScrollable() {
          if (this.scrollable) return true;
          if (!this.newColumns) return false;
          return this.newColumns.some((column) => {
            return column.sticky;
          });
        },
        newColumns() {
          if (this.columns && this.columns.length) {
            return this.columns.map((column) => {
              return mockTableColumn(this, column);
            });
          }
          return this.defaultSlots;
        },
        canDragRow() {
          return this.draggable && !this.isDraggingColumn;
        },
        canDragColumn() {
          return this.draggableColumn && !this.isDraggingRow;
        }
      },
      watch: {
        /*
        * When data prop change:
        *   1. Update internal value.
        *   2. Filter data if it's not backend-filtered.
        *   3. Sort again if it's not backend-sorted.
        *   4. Set new total if it's not backend-paginated.
        */
        data(value) {
          this.newData = value;
          if (!this.backendFiltering) {
            this.newData = value.filter(
              (row) => this.isRowFiltered(row)
            );
          }
          if (!this.backendSorting) {
            this.sort(this.currentSortColumn, true);
          }
          if (!this.backendPagination) {
            this.newDataTotal = this.newData.length;
          }
        },
        /*
        * When Pagination total change, update internal total
        * only if it's backend-paginated.
        */
        total(newTotal) {
          if (!this.backendPagination) return;
          this.newDataTotal = newTotal;
        },
        currentPage(newVal) {
          this.newCurrentPage = newVal;
        },
        newCurrentPage(newVal) {
          this.$emit("update:currentPage", newVal);
        },
        /*
        * When checkedRows prop change, update internal value without
        * mutating original data.
        */
        checkedRows(rows) {
          this.newCheckedRows = [...rows];
        },
        debounceSearch: {
          handler(value) {
            this.debouncedHandleFiltersChange = debounce(this.handleFiltersChange, value);
          },
          immediate: true
        },
        filters: {
          handler(value) {
            if (this.debounceSearch) {
              this.debouncedHandleFiltersChange(value);
            } else {
              this.handleFiltersChange(value);
            }
          },
          deep: true
        },
        /*
        * When the user wants to control the detailed rows via props.
        * Or wants to open the details of certain row with the router for example.
        */
        openedDetailed(expandedRows) {
          this.visibleDetailRows = expandedRows;
        }
      },
      methods: {
        onFiltersEvent(event) {
          this.$emit(`filters-event-${this.filtersEvent}`, { event, filters: this.filters });
        },
        handleFiltersChange(value) {
          if (this.backendFiltering) {
            this.$emit("filters-change", value);
          } else {
            this.newData = this.data.filter(
              (row) => this.isRowFiltered(row)
            );
            if (!this.backendPagination) {
              this.newDataTotal = this.newData.length;
            }
            if (!this.backendSorting) {
              if (this.sortMultiple && this.sortMultipleDataLocal && this.sortMultipleDataLocal.length > 0) {
                this.doSortMultiColumn();
              } else if (Object.keys(this.currentSortColumn).length > 0) {
                this.doSortSingleColumn(this.currentSortColumn);
              }
            }
          }
        },
        findIndexOfSortData(column) {
          const sortObj = this.sortMultipleDataComputed.filter((i) => i.field === column.field)[0];
          return this.sortMultipleDataComputed.indexOf(sortObj) + 1;
        },
        removeSortingPriority(column) {
          if (this.backendSorting) {
            this.$emit("sorting-priority-removed", column.field);
          } else {
            this.sortMultipleDataLocal = this.sortMultipleDataLocal.filter(
              (priority) => priority.field !== column.field
            );
            if (this.sortMultipleDataLocal.length === 0) {
              this.resetMultiSorting();
            } else {
              this.newData = multiColumnSort(this.newData, this.sortMultipleDataLocal);
            }
          }
        },
        resetMultiSorting() {
          this.sortMultipleDataLocal = [];
          this.currentSortColumn = BLANK_COLUMN;
          this.newData = this.data;
        },
        /*
        * Sort an array by key without mutating original data.
        * Call the user sort function if it was passed.
        */
        sortBy(array, key, fn, isAsc) {
          let sorted = [];
          if (fn && typeof fn === "function") {
            sorted = [...array].sort((a, b) => fn(a, b, isAsc));
          } else {
            sorted = [...array].sort((a, b) => {
              let newA = getValueByPath(a, key);
              let newB = getValueByPath(b, key);
              if (typeof newA === "boolean" && typeof newB === "boolean") {
                return isAsc ? +newA - +newB : +newB - +newA;
              }
              if (!isNil(newB) && isNil(newA)) return isAsc ? 1 : -1;
              if (!isNil(newA) && isNil(newB)) return isAsc ? -1 : 1;
              if (newA === newB) return 0;
              newA = typeof newA === "string" ? newA.toUpperCase() : newA;
              newB = typeof newB === "string" ? newB.toUpperCase() : newB;
              return isAsc ? newA > newB ? 1 : -1 : newA > newB ? -1 : 1;
            });
          }
          return sorted;
        },
        sortMultiColumn(column) {
          this.currentSortColumn = BLANK_COLUMN;
          if (!this.backendSorting) {
            const existingPriority = this.sortMultipleDataLocal.filter((i) => i.field === column.field)[0];
            if (existingPriority) {
              existingPriority.order = existingPriority.order === "desc" ? "asc" : "desc";
            } else {
              this.sortMultipleDataLocal.push({
                field: column.field,
                order: this.isAsc ? "asc" : "desc",
                customSort: column.customSort
              });
            }
            this.doSortMultiColumn();
          }
        },
        doSortMultiColumn() {
          this.newData = multiColumnSort(this.newData, this.sortMultipleDataLocal);
        },
        /*
        * Sort the column.
        * Toggle current direction on column if it's sortable
        * and not just updating the prop.
        */
        sort(column, updatingData = false, event = null) {
          if (!column || !column.sortable) return;
          if (
            // if backend sorting is enabled, just emit the sort press like usual
            // if the correct key combination isnt pressed, sort like usual
            !this.backendSorting && this.sortMultiple && (this.sortMultipleKey && event[this.sortMultipleKey] || !this.sortMultipleKey)
          ) {
            if (updatingData) {
              this.doSortMultiColumn();
            } else {
              this.sortMultiColumn(column);
            }
          } else {
            if (this.sortMultiple) {
              this.sortMultipleDataLocal = [];
            }
            if (!updatingData) {
              this.isAsc = vue.toRaw(column) === vue.toRaw(this.currentSortColumn) ? !this.isAsc : this.defaultSortDirection.toLowerCase() !== "desc";
            }
            if (!this.firstTimeSort) {
              this.$emit("sort", column.field, this.isAsc ? "asc" : "desc", event);
            }
            if (!this.backendSorting) {
              this.doSortSingleColumn(column);
            }
            this.currentSortColumn = column;
          }
        },
        doSortSingleColumn(column) {
          this.newData = this.sortBy(
            this.newData,
            column.field,
            column.customSort,
            this.isAsc
          );
        },
        isRowSelected(row, selected) {
          if (!selected) {
            return false;
          }
          if (this.customRowKey) {
            return row[this.customRowKey] === selected[this.customRowKey];
          }
          return row === selected;
        },
        /*
        * Check if the row is checked (is added to the array).
        */
        isRowChecked(row) {
          return indexOf(this.newCheckedRows, row, this.customIsChecked) >= 0;
        },
        /*
        * Remove a checked row from the array.
        */
        removeCheckedRow(row) {
          const index = indexOf(this.newCheckedRows, row, this.customIsChecked);
          if (index >= 0) {
            this.newCheckedRows.splice(index, 1);
          }
        },
        /*
        * Header checkbox click listener.
        * Add or remove all rows in current page.
        */
        checkAll() {
          const isAllChecked = this.isAllChecked;
          this.visibleData.forEach((currentRow) => {
            if (this.isRowCheckable(currentRow)) {
              this.removeCheckedRow(currentRow);
            }
            if (!isAllChecked) {
              if (this.isRowCheckable(currentRow)) {
                this.newCheckedRows.push(currentRow);
              }
            }
          });
          this.$emit("check", this.newCheckedRows);
          this.$emit("check-all", this.newCheckedRows);
          this.$emit("update:checkedRows", this.newCheckedRows);
        },
        /*
        * Row checkbox click listener.
        */
        checkRow(row, index, event) {
          if (!this.isRowCheckable(row)) return;
          const lastIndex = this.lastCheckedRowIndex;
          this.lastCheckedRowIndex = index;
          if (event.shiftKey && lastIndex !== null && index !== lastIndex) {
            this.shiftCheckRow(row, index, lastIndex);
          } else if (!this.isRowChecked(row)) {
            this.newCheckedRows.push(row);
          } else {
            this.removeCheckedRow(row);
          }
          this.$emit("check", this.newCheckedRows, row);
          this.$emit("update:checkedRows", this.newCheckedRows);
        },
        /*
         * Check row when shift is pressed.
         */
        shiftCheckRow(row, index, lastCheckedRowIndex) {
          const subset = this.visibleData.slice(
            Math.min(index, lastCheckedRowIndex),
            Math.max(index, lastCheckedRowIndex) + 1
          );
          const shouldCheck = !this.isRowChecked(row);
          subset.forEach((item) => {
            this.removeCheckedRow(item);
            if (shouldCheck && this.isRowCheckable(item)) {
              this.newCheckedRows.push(item);
            }
          });
        },
        /*
        * Row click listener.
        * Emit all necessary events.
        */
        selectRow(row) {
          this.$emit("click", row);
          this._selectedRow = row;
          if (this.selected === row) return;
          if (!this.isRowSelectable(row)) return;
          this.$emit("select", row, this.selected);
          this.$emit("update:selected", row);
        },
        /*
        * Toggle to show/hide details slot
        */
        toggleDetails(obj) {
          const found = this.isVisibleDetailRow(obj);
          if (found) {
            this.closeDetailRow(obj);
            this.$emit("details-close", obj);
          } else {
            this.openDetailRow(obj);
            this.$emit("details-open", obj);
          }
          this.$emit("update:openedDetailed", this.visibleDetailRows);
        },
        openDetailRow(obj) {
          const index = this.handleDetailKey(obj);
          this.visibleDetailRows.push(index);
        },
        closeDetailRow(obj) {
          const index = this.handleDetailKey(obj);
          const i = this.visibleDetailRows.indexOf(index);
          if (i >= 0) {
            this.visibleDetailRows.splice(i, 1);
          }
        },
        isVisibleDetailRow(obj) {
          const index = this.handleDetailKey(obj);
          return this.visibleDetailRows.indexOf(index) >= 0;
        },
        isActiveDetailRow(row) {
          return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row);
        },
        isActiveCustomDetailRow(row) {
          return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row);
        },
        isRowFiltered(row) {
          for (const key in this.filters) {
            if (!this.filters[key]) continue;
            const input = this.filters[key];
            const column = this.newColumns.filter((c) => c.field === key)[0];
            if (column && column.customSearch && typeof column.customSearch === "function") {
              if (!column.customSearch(row, input)) return false;
            } else {
              const value = this.getValueByPath(row, key);
              if (value == null) return false;
              if (Number.isInteger(value)) {
                if (value !== Number(input)) return false;
              } else {
                const re = new RegExp(escapeRegExpChars(input + ""), "i");
                if (Array.isArray(value)) {
                  const valid = value.some(
                    (val) => re.test(removeDiacriticsFromString(val)) || re.test(val)
                  );
                  if (!valid) return false;
                } else {
                  if (!re.test(removeDiacriticsFromString(value)) && !re.test(value)) {
                    return false;
                  }
                }
              }
            }
          }
          return true;
        },
        /*
        * When the detailKey is defined we use the object[detailKey] as index.
        * If not, use the object reference by default.
        */
        handleDetailKey(index) {
          const key = this.detailKey;
          return !key.length || !index ? index : index[key];
        },
        checkPredefinedDetailedRows() {
          const defaultExpandedRowsDefined = this.openedDetailed.length > 0;
          if (defaultExpandedRowsDefined && !this.detailKey.length) {
            throw new Error('If you set a predefined opened-detailed, you must provide a unique key using the prop "detail-key"');
          }
        },
        /*
        * Call initSort only first time (For example async data).
        */
        checkSort() {
          if (this.newColumns.length && this.firstTimeSort) {
            this.initSort();
            this.firstTimeSort = false;
          } else if (this.newColumns.length) {
            if (vue.toRaw(this.currentSortColumn) !== BLANK_COLUMN) {
              for (let i = 0; i < this.newColumns.length; i++) {
                if (this.newColumns[i].field === this.currentSortColumn.field) {
                  this.currentSortColumn = this.newColumns[i];
                  break;
                }
              }
            }
          }
        },
        /*
        * Check if footer slot has custom content.
        *
        * Assumes that `$slots.footer` is specified.
        */
        hasCustomFooterSlot() {
          var _a;
          const footer = this.$slots.footer();
          if (footer.length > 1) return true;
          if (isFragment(footer[0])) return true;
          const tag = (_a = footer[0].el) == null ? void 0 : _a.tag;
          if (tag !== "th" && tag !== "td") return false;
          return true;
        },
        /*
        * Check if bottom-left slot exists.
        */
        hasBottomLeftSlot() {
          return typeof this.$slots["bottom-left"] !== "undefined";
        },
        /*
        * Table arrow keys listener, change selection.
        */
        pressedArrow(pos) {
          if (!this.visibleData.length) return;
          let index = this.visibleData.indexOf(this.selected) + pos;
          index = index < 0 ? 0 : index > this.visibleData.length - 1 ? this.visibleData.length - 1 : index;
          const row = this.visibleData[index];
          if (!this.isRowSelectable(row)) {
            let newIndex = null;
            if (pos > 0) {
              for (let i = index; i < this.visibleData.length && newIndex === null; i++) {
                if (this.isRowSelectable(this.visibleData[i])) newIndex = i;
              }
            } else {
              for (let i = index; i >= 0 && newIndex === null; i--) {
                if (this.isRowSelectable(this.visibleData[i])) newIndex = i;
              }
            }
            if (newIndex >= 0) {
              this.selectRow(this.visibleData[newIndex]);
            }
          } else {
            this.selectRow(row);
          }
        },
        /*
        * Focus table element if has selected prop.
        */
        focus() {
          if (!this.focusable) return;
          this.$el.querySelector("table").focus();
        },
        /*
        * Initial sorted column based on the default-sort prop.
        */
        initSort() {
          if (this.sortMultiple && this.sortMultipleData) {
            this.sortMultipleData.forEach((column) => {
              this.sortMultiColumn(column);
            });
          } else {
            if (!this.defaultSort) return;
            let sortField = "";
            let sortDirection = this.defaultSortDirection;
            if (Array.isArray(this.defaultSort)) {
              sortField = this.defaultSort[0];
              if (this.defaultSort[1]) {
                sortDirection = this.defaultSort[1];
              }
            } else {
              sortField = this.defaultSort;
            }
            const sortColumn = this.newColumns.filter(
              (column) => column.field === sortField
            )[0];
            if (sortColumn) {
              this.isAsc = sortDirection.toLowerCase() !== "desc";
              this.sort(sortColumn, true);
            }
          }
        },
        /*
        * Emits drag start event (row)
        */
        handleDragStart(event, row, index) {
          if (!this.canDragRow) return;
          this.isDraggingRow = true;
          this.$emit("dragstart", { event, row, index });
        },
        /*
        * Emits drag leave event (row)
        */
        handleDragEnd(event, row, index) {
          if (!this.canDragRow) return;
          this.isDraggingRow = false;
          this.$emit("dragend", { event, row, index });
        },
        /*
        * Emits drop event (row)
        */
        handleDrop(event, row, index) {
          if (!this.canDragRow) return;
          this.$emit("drop", { event, row, index });
        },
        /*
        * Emits drag over event (row)
        */
        handleDragOver(event, row, index) {
          if (!this.canDragRow) return;
          this.$emit("dragover", { event, row, index });
        },
        /*
        * Emits drag leave event (row)
        */
        handleDragLeave(event, row, index) {
          if (!this.canDragRow) return;
          this.$emit("dragleave", { event, row, index });
        },
        // this method is for "mouseenter", and "mouseleave" events.
        // the original idea of this method was introduced by the PR
        // https://github.com/buefy/buefy/pull/2150
        // to address some performance issues related to these events.
        // I am not sure whether the justification made at the PR is still
        // relevant to Vue 3.
        // btw, this function was made by the PR https://github.com/buefy/buefy/pull/3236
        emitEventForRow(eventName, event, row) {
          const listener = this.$attrs[vue.toHandlerKey(eventName)] || this.$attrs[vue.toHandlerKey(vue.camelize(eventName))];
          return listener != null ? this.$emit(eventName, row, event) : null;
        },
        /*
        * Emits drag start event (column)
        */
        handleColumnDragStart(event, column, index) {
          if (!this.canDragColumn) return;
          this.isDraggingColumn = true;
          this.$emit("columndragstart", { event, column, index });
        },
        /*
        * Emits drag leave event (column)
        */
        handleColumnDragEnd(event, column, index) {
          if (!this.canDragColumn) return;
          this.isDraggingColumn = false;
          this.$emit("columndragend", { event, column, index });
        },
        /*
        * Emits drop event (column)
        */
        handleColumnDrop(event, column, index) {
          if (!this.canDragColumn) return;
          this.$emit("columndrop", { event, column, index });
        },
        /*
        * Emits drag over event (column)
        */
        handleColumnDragOver(event, column, index) {
          if (!this.canDragColumn) return;
          this.$emit("columndragover", { event, column, index });
        },
        /*
        * Emits drag leave event (column)
        */
        handleColumnDragLeave(event, column, index) {
          if (!this.canDragColumn) return;
          this.$emit("columndragleave", { event, column, index });
        },
        /*
        * Starts monitoring drag-by-touch events (row on touch-enabled devices)
        */
        handleTouchStart(event, row) {
          if (!this.canDragRow) return;
          if (this.isDraggingColumn) return;
          if (this._selectedRow !== row) return;
          event.preventDefault();
          this.mayBeTouchDragging = true;
        },
        /*
        * Emits dragover and dragleave events (row on touch-enabled devices)
        *
        * Emits also dragstart if this is the first touchmove after touchstart.
        */
        handleTouchMove(event) {
          if (!this.canDragRow) return;
          if (!this.mayBeTouchDragging) return;
          if (!this.isDraggingRow) {
            const eventTarget = event.target;
            const tr = eventTarget.closest("tr");
            this.draggedCellContent = tr ? `<table class="table"><tr>${tr.innerHTML}</tr></table>` : eventTarget.innerHTML;
            this.$refs.draggedCell.style.width = tr ? `${tr.offsetWidth}px` : `${eventTarget.offsetWidth}px`;
            eventTarget.dispatchEvent(translateTouchAsDragEvent(event, {
              type: "dragstart"
            }));
          }
          const touch = event.touches[0];
          const target = document.elementFromPoint(touch.clientX, touch.clientY);
          if (target != null) {
            if (target !== this.touchDragoverTarget) {
              if (this.touchDragoverTarget != null) {
                this.touchDragoverTarget.dispatchEvent(
                  translateTouchAsDragEvent(event, {
                    type: "dragleave",
                    target: this.touchDragoverTarget
                  })
                );
              }
              this.touchDragoverTarget = target;
              target.dispatchEvent(
                translateTouchAsDragEvent(event, {
                  type: "dragover",
                  target
                })
              );
            }
          } else if (this.touchDragoverTarget != null) {
            this.touchDragoverTarget.dispatchEvent(
              translateTouchAsDragEvent(event, {
                type: "dragleave",
                target: this.touchDragoverTarget
              })
            );
            this.touchDragoverTarget = null;
          }
          this.updateDraggedCell(touch);
        },
        /*
        * Emits drop and dragend events (row on touch-enabled devices)
        */
        handleTouchEnd(event) {
          if (!this.canDragRow) return;
          if (this.isDraggingRow) {
            const touch = event.changedTouches[0];
            const target = document.elementFromPoint(touch.clientX, touch.clientY);
            if (target != null) {
              target.dispatchEvent(translateTouchAsDragEvent(event, {
                type: "drop",
                target
              }));
            }
            event.target.dispatchEvent(translateTouchAsDragEvent(event, {
              type: "dragend"
            }));
            this._selectedRow = null;
          }
          this.mayBeTouchDragging = false;
        },
        /*
        * Starts monitoring drag-by-touch events (column on touch-enabled devices)
        */
        handleColumnTouchStart(event) {
          if (!this.canDragColumn) return;
          if (this.isDraggingRow) return;
          event.preventDefault();
          this.mayBeTouchDragging = true;
        },
        /*
        * Emits dragover and dragleave events (column on touch-enabled devices)
        *
        * Also emits dragstart if this is the first touchmove after touchstart.
        */
        handleColumnTouchMove(event) {
          if (!this.canDragColumn) return;
          if (!this.mayBeTouchDragging) return;
          if (!this.isDraggingColumn) {
            const eventTarget = event.target;
            this.draggedCellContent = eventTarget.innerHTML;
            this.$refs.draggedCell.style.width = `${eventTarget.offsetWidth}px`;
            eventTarget.dispatchEvent(translateTouchAsDragEvent(event, {
              type: "dragstart"
            }));
          }
          const touch = event.touches[0];
          const target = document.elementFromPoint(touch.clientX, touch.clientY);
          if (target != null) {
            if (target !== this.touchDragoverTarget) {
              if (this.touchDragoverTarget != null) {
                this.touchDragoverTarget.dispatchEvent(
                  translateTouchAsDragEvent(event, {
                    type: "dragleave",
                    target: this.touchDragoverTarget
                  })
                );
              }
              this.touchDragoverTarget = target;
              target.dispatchEvent(
                translateTouchAsDragEvent(event, {
                  type: "dragover",
                  target
                })
              );
            }
          } else if (this.touchDragoverTarget != null) {
            this.touchDragoverTarget.dispatchEvent(
              translateTouchAsDragEvent(event, {
                type: "dragleave",
                target: this.touchDragoverTarget
              })
            );
            this.touchDragoverTarget = null;
          }
          this.updateDraggedCell(touch);
        },
        /*
        * Emits drop and dragend events (column on touch-enabled devices)
        */
        handleColumnTouchEnd(event) {
          if (!this.canDragColumn) return;
          if (this.isDraggingColumn) {
            const touch = event.changedTouches[0];
            const target = document.elementFromPoint(touch.clientX, touch.clientY);
            if (target != null) {
              target.dispatchEvent(translateTouchAsDragEvent(event, {
                type: "drop",
                target
              }));
            }
            event.target.dispatchEvent(translateTouchAsDragEvent(event, {
              type: "dragend"
            }));
          }
          this.mayBeTouchDragging = false;
        },
        updateDraggedCell({ clientX, clientY }) {
          const cellRect = this.$refs.draggedCell.getBoundingClientRect();
          const top = clientY + window.scrollY - cellRect.height / 2;
          const left = clientX + window.scrollX - cellRect.width / 2;
          this.$refs.draggedCell.style.top = `calc(${top}px)`;
          this.$refs.draggedCell.style.left = `calc(${left}px)`;
        },
        _registerTableColumn(column) {
          if (column._isTableColumn) {
            this.defaultSlots.push(column);
          }
        },
        _unregisterTableColumn(column) {
          const index = this.defaultSlots.indexOf(column);
          if (index !== -1) {
            this.defaultSlots.splice(index, 1);
          }
        }
      },
      mounted() {
        this.checkPredefinedDetailedRows();
        this.checkSort();
        const prepareDraggedCell = (isDraggable) => {
          if (isDraggable && this.$data._draggedCellEl == null) {
            this.$data._draggedCellEl = createAbsoluteElement(this.$refs.draggedCell);
          }
        };
        this.$watch("draggable", prepareDraggedCell, { immediate: true });
        this.$watch("draggableColumn", prepareDraggedCell, { immediate: true });
      },
      beforeUnmount() {
        if (this.$data._draggedCellEl) {
          removeElement(this.$data._draggedCellEl);
        }
      }
    });

    const _hoisted_1 = ["tabindex"];
    const _hoisted_2 = { key: 1 };
    const _hoisted_3 = {
      key: 0,
      width: "40px"
    };
    const _hoisted_4 = ["onClick", "draggable", "onDragstart", "onDragend", "onDrop", "onDragover", "onDragleave"];
    const _hoisted_5 = {
      key: 0,
      class: "multi-sort-icons"
    };
    const _hoisted_6 = ["onClick"];
    const _hoisted_7 = {
      key: 0,
      class: "is-subheading"
    };
    const _hoisted_8 = {
      key: 0,
      width: "40px"
    };
    const _hoisted_9 = { key: 1 };
    const _hoisted_10 = { key: 2 };
    const _hoisted_11 = { key: 1 };
    const _hoisted_12 = {
      key: 0,
      width: "40px"
    };
    const _hoisted_13 = { key: 1 };
    const _hoisted_14 = { key: 2 };
    const _hoisted_15 = ["onClick", "onDblclick", "onMouseenter", "onMouseleave", "onContextmenu", "draggable", "onDragstart", "onDragend", "onDrop", "onDragover", "onDragleave", "onTouchstart"];
    const _hoisted_16 = {
      key: 0,
      class: "chevron-cell"
    };
    const _hoisted_17 = ["onClick"];
    const _hoisted_18 = {
      key: 0,
      class: "detail"
    };
    const _hoisted_19 = ["colspan"];
    const _hoisted_20 = { class: "detail-container" };
    const _hoisted_21 = {
      key: 0,
      class: "is-empty"
    };
    const _hoisted_22 = ["colspan"];
    const _hoisted_23 = { key: 2 };
    const _hoisted_24 = { class: "table-footer" };
    const _hoisted_25 = ["colspan"];
    const _hoisted_26 = ["innerHTML"];
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_table_mobile_sort = vue.resolveComponent("b-table-mobile-sort");
      const _component_b_table_pagination = vue.resolveComponent("b-table-pagination");
      const _component_b_checkbox = vue.resolveComponent("b-checkbox");
      const _component_b_slot_component = vue.resolveComponent("b-slot-component");
      const _component_b_icon = vue.resolveComponent("b-icon");
      const _component_b_input = vue.resolveComponent("b-input");
      const _component_b_loading = vue.resolveComponent("b-loading");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        vue.mergeProps({ class: "b-table" }, _ctx.rootAttrs),
        [
          vue.renderSlot(_ctx.$slots, "default"),
          _ctx.mobileCards && _ctx.hasSortablenewColumns ? (vue.openBlock(), vue.createBlock(_component_b_table_mobile_sort, {
            key: 0,
            "current-sort-column": _ctx.currentSortColumn,
            "sort-multiple": _ctx.sortMultiple,
            "sort-multiple-data": _ctx.sortMultipleDataComputed,
            "is-asc": _ctx.isAsc,
            columns: _ctx.newColumns,
            placeholder: _ctx.mobileSortPlaceholder,
            "icon-pack": _ctx.iconPack,
            "sort-icon": _ctx.sortIcon,
            "sort-icon-size": _ctx.sortIconSize,
            onSort: _cache[0] || (_cache[0] = (column, event) => _ctx.sort(column, null, event)),
            onRemovePriority: _cache[1] || (_cache[1] = (column) => _ctx.removeSortingPriority(column))
          }, null, 8, ["current-sort-column", "sort-multiple", "sort-multiple-data", "is-asc", "columns", "placeholder", "icon-pack", "sort-icon", "sort-icon-size"])) : vue.createCommentVNode("v-if", true),
          _ctx.paginated && (_ctx.paginationPosition === "top" || _ctx.paginationPosition === "both") ? vue.renderSlot(_ctx.$slots, "pagination", { key: 1 }, () => [
            vue.createVNode(_component_b_table_pagination, vue.mergeProps(_ctx.fallthroughAttrs, {
              "per-page": _ctx.perPage,
              paginated: _ctx.paginated,
              rounded: _ctx.paginationRounded,
              "icon-pack": _ctx.iconPack,
              total: _ctx.newDataTotal,
              "current-page": _ctx.newCurrentPage,
              "onUpdate:currentPage": _cache[2] || (_cache[2] = ($event) => _ctx.newCurrentPage = $event),
              "aria-next-label": _ctx.ariaNextLabel,
              "aria-previous-label": _ctx.ariaPreviousLabel,
              "aria-page-label": _ctx.ariaPageLabel,
              "aria-current-label": _ctx.ariaCurrentLabel,
              onPageChange: _cache[3] || (_cache[3] = (event) => _ctx.$emit("page-change", event)),
              "page-input": _ctx.pageInput,
              "pagination-order": _ctx.paginationOrder,
              "page-input-position": _ctx.pageInputPosition,
              "debounce-page-input": _ctx.debouncePageInput
            }), {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "top-left")
              ]),
              _: 3
              /* FORWARDED */
            }, 16, ["per-page", "paginated", "rounded", "icon-pack", "total", "current-page", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label", "page-input", "pagination-order", "page-input-position", "debounce-page-input"])
          ]) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(["table-wrapper", _ctx.tableWrapperClasses]),
              style: vue.normalizeStyle(_ctx.tableStyle)
            },
            [
              vue.createElementVNode("table", {
                class: vue.normalizeClass(["table", _ctx.tableClasses]),
                tabindex: !_ctx.focusable ? void 0 : 0,
                onKeydown: [
                  _cache[9] || (_cache[9] = vue.withKeys(vue.withModifiers(($event) => _ctx.pressedArrow(-1), ["self", "prevent"]), ["up"])),
                  _cache[10] || (_cache[10] = vue.withKeys(vue.withModifiers(($event) => _ctx.pressedArrow(1), ["self", "prevent"]), ["down"]))
                ]
              }, [
                _ctx.caption ? vue.withDirectives((vue.openBlock(), vue.createElementBlock(
                  "caption",
                  { key: 0 },
                  vue.toDisplayString(_ctx.caption),
                  513
                  /* TEXT, NEED_PATCH */
                )), [
                  [vue.vShow, _ctx.showCaption]
                ]) : vue.createCommentVNode("v-if", true),
                _ctx.newColumns.length && _ctx.showHeader ? (vue.openBlock(), vue.createElementBlock("thead", _hoisted_2, [
                  vue.createElementVNode("tr", null, [
                    _ctx.showDetailRowIcon ? (vue.openBlock(), vue.createElementBlock("th", _hoisted_3)) : vue.createCommentVNode("v-if", true),
                    _ctx.checkable && _ctx.checkboxPosition === "left" ? (vue.openBlock(), vue.createElementBlock(
                      "th",
                      {
                        key: 1,
                        class: vue.normalizeClass(["checkbox-cell", { "is-sticky": _ctx.stickyCheckbox }])
                      },
                      [
                        _ctx.headerCheckable ? vue.renderSlot(_ctx.$slots, "check-all", {
                          key: 0,
                          isAllChecked: _ctx.isAllChecked,
                          isAllUncheckable: _ctx.isAllUncheckable,
                          checkAll: _ctx.checkAll
                        }, () => [
                          vue.createVNode(_component_b_checkbox, {
                            autocomplete: "off",
                            "model-value": _ctx.isAllChecked,
                            type: _ctx.checkboxType,
                            disabled: _ctx.isAllUncheckable,
                            onChange: _ctx.checkAll
                          }, null, 8, ["model-value", "type", "disabled", "onChange"])
                        ]) : vue.createCommentVNode("v-if", true)
                      ],
                      2
                      /* CLASS */
                    )) : vue.createCommentVNode("v-if", true),
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(_ctx.visibleColumns, (column, index) => {
                        return vue.openBlock(), vue.createElementBlock("th", vue.mergeProps({
                          key: column.newKey + ":" + index + "header"
                        }, column.thAttrs(column), {
                          class: [column.thClasses, {
                            "is-current-sort": !_ctx.sortMultiple && _ctx.currentSortColumn === column
                          }],
                          style: column.thStyle,
                          onClick: vue.withModifiers(($event) => _ctx.sort(column, null, $event), ["stop"]),
                          draggable: _ctx.canDragColumn,
                          onDragstart: ($event) => _ctx.handleColumnDragStart($event, column, index),
                          onDragend: ($event) => _ctx.handleColumnDragEnd($event, column, index),
                          onDrop: ($event) => _ctx.handleColumnDrop($event, column, index),
                          onDragover: ($event) => _ctx.handleColumnDragOver($event, column, index),
                          onDragleave: ($event) => _ctx.handleColumnDragLeave($event, column, index),
                          onTouchstart: _cache[4] || (_cache[4] = ($event) => _ctx.handleColumnTouchStart($event)),
                          onTouchmove: _cache[5] || (_cache[5] = ($event) => _ctx.handleColumnTouchMove($event)),
                          onTouchend: _cache[6] || (_cache[6] = ($event) => _ctx.handleColumnTouchEnd($event))
                        }), [
                          vue.createElementVNode(
                            "div",
                            {
                              class: vue.normalizeClass(["th-wrap is-relative", {
                                "is-numeric": column.numeric,
                                "is-centered": column.centered
                              }]),
                              style: vue.normalizeStyle(column.thWrapStyle)
                            },
                            [
                              column.$slots.header ? (vue.openBlock(), vue.createBlock(_component_b_slot_component, {
                                key: 0,
                                component: column,
                                scoped: "",
                                name: "header",
                                tag: "span",
                                props: { column, index }
                              }, null, 8, ["component", "props"])) : (vue.openBlock(), vue.createElementBlock(
                                vue.Fragment,
                                { key: 1 },
                                [
                                  vue.createTextVNode(
                                    vue.toDisplayString(column.label) + " ",
                                    1
                                    /* TEXT */
                                  ),
                                  _ctx.sortMultiple && _ctx.sortMultipleDataComputed && _ctx.sortMultipleDataComputed.length > 0 && _ctx.sortMultipleDataComputed.filter((i) => i.field === column.field).length > 0 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5, [
                                    vue.createVNode(_component_b_icon, {
                                      icon: _ctx.sortIcon,
                                      pack: _ctx.iconPack,
                                      both: "",
                                      size: _ctx.sortIconSize,
                                      class: vue.normalizeClass({
                                        "is-desc": _ctx.sortMultipleDataComputed.filter((i) => i.field === column.field)[0].order === "desc"
                                      })
                                    }, null, 8, ["icon", "pack", "size", "class"]),
                                    vue.createTextVNode(
                                      " " + vue.toDisplayString(_ctx.findIndexOfSortData(column)) + " ",
                                      1
                                      /* TEXT */
                                    ),
                                    vue.createElementVNode("button", {
                                      class: "delete is-small multi-sort-cancel-icon",
                                      type: "button",
                                      onClick: vue.withModifiers(($event) => _ctx.removeSortingPriority(column), ["stop"])
                                    }, null, 8, _hoisted_6)
                                  ])) : (vue.openBlock(), vue.createBlock(_component_b_icon, {
                                    key: 1,
                                    icon: _ctx.sortIcon,
                                    pack: _ctx.iconPack,
                                    both: "",
                                    size: _ctx.sortIconSize,
                                    class: vue.normalizeClass(["sort-icon", {
                                      "is-desc": !_ctx.isAsc,
                                      "is-invisible": _ctx.currentSortColumn !== column
                                    }])
                                  }, null, 8, ["icon", "pack", "size", "class"]))
                                ],
                                64
                                /* STABLE_FRAGMENT */
                              ))
                            ],
                            6
                            /* CLASS, STYLE */
                          )
                        ], 16, _hoisted_4);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    _ctx.checkable && _ctx.checkboxPosition === "right" ? (vue.openBlock(), vue.createElementBlock(
                      "th",
                      {
                        key: 2,
                        class: vue.normalizeClass(["checkbox-cell", { "is-sticky": _ctx.stickyCheckbox }])
                      },
                      [
                        _ctx.headerCheckable ? vue.renderSlot(_ctx.$slots, "check-all", {
                          key: 0,
                          isAllChecked: _ctx.isAllChecked,
                          isAllUncheckable: _ctx.isAllUncheckable,
                          checkAll: _ctx.checkAll
                        }, () => [
                          vue.createVNode(_component_b_checkbox, {
                            autocomplete: "off",
                            "model-value": _ctx.isAllChecked,
                            type: _ctx.checkboxType,
                            disabled: _ctx.isAllUncheckable,
                            onChange: _ctx.checkAll
                          }, null, 8, ["model-value", "type", "disabled", "onChange"])
                        ]) : vue.createCommentVNode("v-if", true)
                      ],
                      2
                      /* CLASS */
                    )) : vue.createCommentVNode("v-if", true)
                  ]),
                  _ctx.hasCustomSubheadings ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_7, [
                    _ctx.showDetailRowIcon ? (vue.openBlock(), vue.createElementBlock("th", _hoisted_8)) : vue.createCommentVNode("v-if", true),
                    _ctx.checkable && _ctx.checkboxPosition === "left" ? (vue.openBlock(), vue.createElementBlock("th", _hoisted_9)) : vue.createCommentVNode("v-if", true),
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(_ctx.visibleColumns, (column, index) => {
                        return vue.openBlock(), vue.createElementBlock(
                          "th",
                          {
                            key: column.newKey + ":" + index + "subheading",
                            style: vue.normalizeStyle(column.style)
                          },
                          [
                            vue.createElementVNode(
                              "div",
                              {
                                class: vue.normalizeClass(["th-wrap", {
                                  "is-numeric": column.numeric,
                                  "is-centered": column.centered
                                }]),
                                style: vue.normalizeStyle(column.thWrapStyle)
                              },
                              [
                                column.$slots.subheading ? (vue.openBlock(), vue.createBlock(_component_b_slot_component, {
                                  key: 0,
                                  component: column,
                                  scoped: "",
                                  name: "subheading",
                                  tag: "span",
                                  props: { column, index }
                                }, null, 8, ["component", "props"])) : (vue.openBlock(), vue.createElementBlock(
                                  vue.Fragment,
                                  { key: 1 },
                                  [
                                    vue.createTextVNode(
                                      vue.toDisplayString(column.subheading),
                                      1
                                      /* TEXT */
                                    )
                                  ],
                                  64
                                  /* STABLE_FRAGMENT */
                                ))
                              ],
                              6
                              /* CLASS, STYLE */
                            )
                          ],
                          4
                          /* STYLE */
                        );
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    _ctx.checkable && _ctx.checkboxPosition === "right" ? (vue.openBlock(), vue.createElementBlock("th", _hoisted_10)) : vue.createCommentVNode("v-if", true)
                  ])) : vue.createCommentVNode("v-if", true),
                  _ctx.hasSearchablenewColumns ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_11, [
                    _ctx.showDetailRowIcon ? (vue.openBlock(), vue.createElementBlock("th", _hoisted_12)) : vue.createCommentVNode("v-if", true),
                    _ctx.checkable && _ctx.checkboxPosition === "left" ? (vue.openBlock(), vue.createElementBlock("th", _hoisted_13)) : vue.createCommentVNode("v-if", true),
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(_ctx.visibleColumns, (column, index) => {
                        return vue.openBlock(), vue.createElementBlock(
                          "th",
                          vue.mergeProps({
                            key: column.newKey + ":" + index + "searchable"
                          }, column.thAttrs(column), {
                            style: column.thStyle,
                            class: { "is-sticky": column.sticky }
                          }),
                          [
                            vue.createElementVNode(
                              "div",
                              {
                                class: "th-wrap",
                                style: vue.normalizeStyle(column.thWrapStyle)
                              },
                              [
                                column.searchable ? (vue.openBlock(), vue.createElementBlock(
                                  vue.Fragment,
                                  { key: 0 },
                                  [
                                    column.$slots.searchable ? (vue.openBlock(), vue.createBlock(_component_b_slot_component, {
                                      key: 0,
                                      component: column,
                                      scoped: true,
                                      name: "searchable",
                                      tag: "span",
                                      props: { column, filters: _ctx.filters }
                                    }, null, 8, ["component", "props"])) : (vue.openBlock(), vue.createBlock(_component_b_input, vue.mergeProps({
                                      key: 1,
                                      [vue.toHandlerKey(_ctx.filtersEvent)]: _ctx.onFiltersEvent
                                    }, {
                                      modelValue: _ctx.filters[column.field],
                                      "onUpdate:modelValue": ($event) => _ctx.filters[column.field] = $event,
                                      type: column.numeric ? "number" : "text"
                                    }), null, 16, ["modelValue", "onUpdate:modelValue", "type"]))
                                  ],
                                  64
                                  /* STABLE_FRAGMENT */
                                )) : vue.createCommentVNode("v-if", true)
                              ],
                              4
                              /* STYLE */
                            )
                          ],
                          16
                          /* FULL_PROPS */
                        );
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    _ctx.checkable && _ctx.checkboxPosition === "right" ? (vue.openBlock(), vue.createElementBlock("th", _hoisted_14)) : vue.createCommentVNode("v-if", true)
                  ])) : vue.createCommentVNode("v-if", true)
                ])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("tbody", null, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(_ctx.visibleData, (row, index) => {
                      return vue.openBlock(), vue.createElementBlock(
                        vue.Fragment,
                        {
                          key: _ctx.customRowKey ? row[_ctx.customRowKey] : index
                        },
                        [
                          vue.createElementVNode("tr", {
                            class: vue.normalizeClass([_ctx.rowClass(row, index), {
                              "is-selected": _ctx.isRowSelected(row, _ctx.selected),
                              "is-checked": _ctx.isRowChecked(row)
                            }]),
                            onClick: ($event) => _ctx.selectRow(row),
                            onDblclick: ($event) => _ctx.$emit("dblclick", row),
                            onMouseenter: ($event) => _ctx.emitEventForRow("mouseenter", $event, row),
                            onMouseleave: ($event) => _ctx.emitEventForRow("mouseleave", $event, row),
                            onContextmenu: ($event) => _ctx.$emit("contextmenu", row, $event),
                            draggable: _ctx.canDragRow,
                            onDragstart: ($event) => _ctx.handleDragStart($event, row, index),
                            onDragend: ($event) => _ctx.handleDragEnd($event, row, index),
                            onDrop: ($event) => _ctx.handleDrop($event, row, index),
                            onDragover: ($event) => _ctx.handleDragOver($event, row, index),
                            onDragleave: ($event) => _ctx.handleDragLeave($event, row, index),
                            onTouchstart: ($event) => _ctx.handleTouchStart($event, row),
                            onTouchmove: _cache[7] || (_cache[7] = ($event) => _ctx.handleTouchMove($event)),
                            onTouchend: _cache[8] || (_cache[8] = ($event) => _ctx.handleTouchEnd($event))
                          }, [
                            _ctx.showDetailRowIcon ? (vue.openBlock(), vue.createElementBlock("td", _hoisted_16, [
                              _ctx.hasDetailedVisible(row) ? (vue.openBlock(), vue.createElementBlock("a", {
                                key: 0,
                                role: "button",
                                onClick: vue.withModifiers(($event) => _ctx.toggleDetails(row), ["stop"])
                              }, [
                                vue.createVNode(_component_b_icon, {
                                  icon: _ctx.detailIcon,
                                  pack: _ctx.iconPack,
                                  both: "",
                                  class: vue.normalizeClass({ "is-expanded": _ctx.isVisibleDetailRow(row) })
                                }, null, 8, ["icon", "pack", "class"])
                              ], 8, _hoisted_17)) : vue.createCommentVNode("v-if", true)
                            ])) : vue.createCommentVNode("v-if", true),
                            _ctx.checkable && _ctx.checkboxPosition === "left" ? (vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                key: 1,
                                class: vue.normalizeClass(["checkbox-cell", { "is-sticky": _ctx.stickyCheckbox }])
                              },
                              [
                                vue.createVNode(_component_b_checkbox, {
                                  autocomplete: "off",
                                  "model-value": _ctx.isRowChecked(row),
                                  type: _ctx.checkboxType,
                                  disabled: !_ctx.isRowCheckable(row),
                                  onClick: vue.withModifiers(($event) => _ctx.checkRow(row, index, $event), ["prevent", "stop"])
                                }, null, 8, ["model-value", "type", "disabled", "onClick"])
                              ],
                              2
                              /* CLASS */
                            )) : vue.createCommentVNode("v-if", true),
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(_ctx.visibleColumns, (column, colindex) => {
                                return vue.openBlock(), vue.createElementBlock(
                                  vue.Fragment,
                                  {
                                    key: column.newKey + ":" + index + ":" + colindex
                                  },
                                  [
                                    column.$slots.default ? (vue.openBlock(), vue.createBlock(_component_b_slot_component, vue.mergeProps({
                                      key: 0,
                                      component: column
                                    }, column.tdAttrs(row, column), {
                                      scoped: "",
                                      name: "default",
                                      tag: "td",
                                      class: column.getRootClasses(row),
                                      style: column.getRootStyle(row),
                                      "data-label": column.label,
                                      props: {
                                        row,
                                        column,
                                        index,
                                        colindex,
                                        toggleDetails: _ctx.toggleDetails,
                                        isActiveDetailRow: _ctx.isActiveDetailRow
                                      },
                                      onClick: ($event) => _ctx.$emit("cellclick", row, column, index, colindex)
                                    }), null, 16, ["component", "class", "style", "data-label", "props", "onClick"])) : vue.createCommentVNode("v-if", true)
                                  ],
                                  64
                                  /* STABLE_FRAGMENT */
                                );
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            )),
                            _ctx.checkable && _ctx.checkboxPosition === "right" ? (vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                key: 2,
                                class: vue.normalizeClass(["checkbox-cell", { "is-sticky": _ctx.stickyCheckbox }])
                              },
                              [
                                vue.createVNode(_component_b_checkbox, {
                                  autocomplete: "off",
                                  "model-value": _ctx.isRowChecked(row),
                                  type: _ctx.checkboxType,
                                  disabled: !_ctx.isRowCheckable(row),
                                  onClick: vue.withModifiers(($event) => _ctx.checkRow(row, index, $event), ["prevent", "stop"])
                                }, null, 8, ["model-value", "type", "disabled", "onClick"])
                              ],
                              2
                              /* CLASS */
                            )) : vue.createCommentVNode("v-if", true)
                          ], 42, _hoisted_15),
                          vue.createVNode(vue.Transition, { name: _ctx.detailTransition }, {
                            default: vue.withCtx(() => [
                              _ctx.isActiveDetailRow(row) ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_18, [
                                vue.createElementVNode("td", { colspan: _ctx.columnCount }, [
                                  vue.createElementVNode("div", _hoisted_20, [
                                    vue.renderSlot(_ctx.$slots, "detail", {
                                      row,
                                      index
                                    })
                                  ])
                                ], 8, _hoisted_19)
                              ])) : vue.createCommentVNode("v-if", true)
                            ]),
                            _: 2
                            /* DYNAMIC */
                          }, 1032, ["name"]),
                          _ctx.isActiveCustomDetailRow(row) ? vue.renderSlot(_ctx.$slots, "detail", {
                            key: 0,
                            row,
                            index
                          }) : vue.createCommentVNode("v-if", true)
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )),
                  !_ctx.visibleData.length ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_21, [
                    vue.createElementVNode("td", { colspan: _ctx.columnCount }, [
                      vue.renderSlot(_ctx.$slots, "empty")
                    ], 8, _hoisted_22)
                  ])) : vue.createCommentVNode("v-if", true)
                ]),
                _ctx.$slots.footer !== void 0 ? (vue.openBlock(), vue.createElementBlock("tfoot", _hoisted_23, [
                  vue.createElementVNode("tr", _hoisted_24, [
                    _ctx.hasCustomFooterSlot() ? vue.renderSlot(_ctx.$slots, "footer", { key: 0 }) : (vue.openBlock(), vue.createElementBlock("th", {
                      key: 1,
                      colspan: _ctx.columnCount
                    }, [
                      vue.renderSlot(_ctx.$slots, "footer")
                    ], 8, _hoisted_25))
                  ])
                ])) : vue.createCommentVNode("v-if", true)
              ], 42, _hoisted_1),
              _ctx.loading ? vue.renderSlot(_ctx.$slots, "loading", { key: 0 }, () => [
                vue.createVNode(_component_b_loading, {
                  "is-full-page": false,
                  "model-value": _ctx.loading
                }, null, 8, ["model-value"])
              ]) : vue.createCommentVNode("v-if", true)
            ],
            6
            /* CLASS, STYLE */
          ),
          _ctx.checkable && _ctx.hasBottomLeftSlot() || _ctx.paginated && (_ctx.paginationPosition === "bottom" || _ctx.paginationPosition === "both") ? vue.renderSlot(_ctx.$slots, "pagination", { key: 2 }, () => [
            vue.createVNode(_component_b_table_pagination, vue.mergeProps(_ctx.fallthroughAttrs, {
              "per-page": _ctx.perPage,
              paginated: _ctx.paginated,
              rounded: _ctx.paginationRounded,
              "icon-pack": _ctx.iconPack,
              total: _ctx.newDataTotal,
              "current-page": _ctx.newCurrentPage,
              "onUpdate:currentPage": _cache[11] || (_cache[11] = ($event) => _ctx.newCurrentPage = $event),
              "aria-next-label": _ctx.ariaNextLabel,
              "aria-previous-label": _ctx.ariaPreviousLabel,
              "aria-page-label": _ctx.ariaPageLabel,
              "aria-current-label": _ctx.ariaCurrentLabel,
              onPageChange: _cache[12] || (_cache[12] = (event) => _ctx.$emit("page-change", event)),
              "page-input": _ctx.pageInput,
              "pagination-order": _ctx.paginationOrder,
              "page-input-position": _ctx.pageInputPosition,
              "debounce-page-input": _ctx.debouncePageInput
            }), {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "bottom-left")
              ]),
              _: 3
              /* FORWARDED */
            }, 16, ["per-page", "paginated", "rounded", "icon-pack", "total", "current-page", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label", "page-input", "pagination-order", "page-input-position", "debounce-page-input"])
          ]) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" eslint-disable vue/no-v-html "),
          vue.withDirectives(vue.createElementVNode("div", {
            ref: "draggedCell",
            class: vue.normalizeClass(["touch-dragged-cell", _ctx.touchDraggedCellClasses]),
            innerHTML: _ctx.draggedCellContent
          }, null, 10, _hoisted_26), [
            [vue.vShow, _ctx.mayBeTouchDragging && (_ctx.isDraggingRow || _ctx.isDraggingColumn)]
          ]),
          vue.createCommentVNode(" eslint-enable vue/no-v-html ")
        ],
        16
        /* FULL_PROPS */
      );
    }
    var Table = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);

    var _sfc_main = vue.defineComponent({
      name: "BTableColumn",
      inject: {
        $table: { name: "$table", default: false }
      },
      props: {
        label: String,
        customKey: [String, Number],
        field: String,
        meta: [String, Number, Boolean, Function, Object, Array],
        width: [Number, String],
        numeric: Boolean,
        centered: Boolean,
        searchable: Boolean,
        sortable: Boolean,
        visible: {
          type: Boolean,
          default: true
        },
        subheading: [String, Number],
        customSort: Function,
        customSearch: Function,
        sticky: Boolean,
        headerSelectable: Boolean,
        headerClass: String,
        cellClass: String,
        thAttrs: {
          type: Function,
          default: () => ({})
        },
        tdAttrs: {
          type: Function,
          default: () => ({})
        }
      },
      data() {
        return {
          newKey: this.customKey || this.label,
          _isTableColumn: true
        };
      },
      computed: {
        thClasses() {
          const attrs = this.thAttrs(this);
          const classes = [this.headerClass, {
            "is-sortable": this.sortable,
            "is-sticky": this.sticky,
            "is-unselectable": this.isHeaderUnSelectable
          }];
          if (attrs && attrs.class) {
            classes.push(attrs.class);
          }
          return classes;
        },
        thStyle() {
          const attrs = this.thAttrs(this);
          const style = [this.style];
          if (attrs && attrs.style) {
            style.push(attrs.style);
          }
          return style;
        },
        thWrapStyle() {
          const width = toCssWidth(this.width);
          if (width != null && !width.trim().endsWith("%")) {
            return { width };
          } else {
            return {};
          }
        },
        rootClasses() {
          return [this.cellClass, {
            "has-text-right": this.numeric && !this.centered,
            "has-text-centered": this.centered,
            "is-sticky": this.sticky
          }];
        },
        style() {
          var _a;
          return {
            width: (_a = toCssWidth(this.width)) != null ? _a : void 0
            // null → undefined to satisfy StyleValue
          };
        },
        hasDefaultSlot() {
          return !!this.$slots.default;
        },
        /*
         * Return if column header is un-selectable
         */
        isHeaderUnSelectable() {
          return !this.headerSelectable && this.sortable;
        }
      },
      methods: {
        getRootClasses(row) {
          const attrs = this.tdAttrs(row, this);
          const classes = [this.rootClasses];
          if (attrs && attrs.class) {
            classes.push(attrs.class);
          }
          return classes;
        },
        getRootStyle(row) {
          const attrs = this.tdAttrs(row, this);
          const style = [];
          if (attrs && attrs.style) {
            style.push(attrs.style);
          }
          return style;
        }
      },
      created() {
        if (!this.$table) {
          throw new Error("You should wrap bTableColumn on a bTable");
        }
        this.$table._registerTableColumn(this);
      },
      beforeUnmount() {
        this.$table._unregisterTableColumn(this);
      },
      render() {
        return null;
      }
    });

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Table);
        registerComponent(Vue, _sfc_main);
      }
    };

    exports.BTable = Table;
    exports.BTableColumn = _sfc_main;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
