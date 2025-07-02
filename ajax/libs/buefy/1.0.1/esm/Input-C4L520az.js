import { defineComponent, resolveComponent, createElementBlock, openBlock, mergeProps, createBlock, createCommentVNode, Fragment, withDirectives, vModelDynamic, vModelText, normalizeClass, toDisplayString } from 'vue';
import { B as BIcon } from './Icon-DPyGDeRK.js';
import { c as config } from './config-CKuo-p6e.js';
import { C as CompatFallthroughMixin } from './CompatFallthroughMixin-C8LPuwDr.js';
import { F as FormElementMixin } from './FormElementMixin-Dd_wkBN5.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';

var _sfc_main = defineComponent({
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
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock(
    "div",
    mergeProps({
      class: ["control", _ctx.rootClasses]
    }, _ctx.rootAttrs),
    [
      _ctx.lazy ? (openBlock(), createElementBlock(
        Fragment,
        { key: 0 },
        [
          _ctx.type !== "textarea" ? withDirectives((openBlock(), createElementBlock("input", mergeProps({
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
              vModelDynamic,
              _ctx.computedValue,
              void 0,
              { lazy: true }
            ]
          ]) : withDirectives((openBlock(), createElementBlock("textarea", mergeProps({
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
              vModelText,
              _ctx.computedValue,
              void 0,
              { lazy: true }
            ]
          ])
        ],
        64
        /* STABLE_FRAGMENT */
      )) : (openBlock(), createElementBlock(
        Fragment,
        { key: 1 },
        [
          _ctx.type !== "textarea" ? withDirectives((openBlock(), createElementBlock("input", mergeProps({
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
            [vModelDynamic, _ctx.computedValue]
          ]) : withDirectives((openBlock(), createElementBlock("textarea", mergeProps({
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
            [vModelText, _ctx.computedValue]
          ])
        ],
        64
        /* STABLE_FRAGMENT */
      )),
      _ctx.icon ? (openBlock(), createBlock(_component_b_icon, {
        key: 2,
        class: normalizeClass(["is-left", { "is-clickable": _ctx.iconClickable }]),
        icon: _ctx.icon,
        pack: _ctx.iconPack,
        size: _ctx.iconSize,
        onClick: _cache[20] || (_cache[20] = ($event) => _ctx.iconClick("icon-click", $event))
      }, null, 8, ["class", "icon", "pack", "size"])) : createCommentVNode("v-if", true),
      !_ctx.loading && _ctx.hasIconRight && _ctx.rightIcon ? (openBlock(), createBlock(_component_b_icon, {
        key: 3,
        class: normalizeClass(["is-right", { "is-clickable": _ctx.passwordReveal || _ctx.iconRightClickable }]),
        icon: _ctx.rightIcon,
        pack: _ctx.iconPack,
        size: _ctx.iconSize,
        type: _ctx.rightIconType,
        both: "",
        onClick: _ctx.rightIconClick
      }, null, 8, ["class", "icon", "pack", "size", "type", "onClick"])) : createCommentVNode("v-if", true),
      _ctx.maxlength && _ctx.hasCounter && _ctx.type !== "number" ? (openBlock(), createElementBlock(
        "small",
        {
          key: 4,
          class: normalizeClass(["help counter", { "is-invisible": !_ctx.isFocused }])
        },
        toDisplayString(_ctx.valueLength) + " / " + toDisplayString(_ctx.maxlength),
        3
        /* TEXT, CLASS */
      )) : createCommentVNode("v-if", true)
    ],
    16
    /* FULL_PROPS */
  );
}
var BInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { BInput as B };
