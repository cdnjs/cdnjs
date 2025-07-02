import { defineComponent, resolveComponent, createElementBlock, openBlock, mergeProps, createVNode, Fragment, renderList, normalizeClass, createElementVNode, withModifiers } from 'vue';
import { B as BIcon } from './Icon-DPyGDeRK.js';
import { B as BInput } from './Input-C4L520az.js';
import { C as CompatFallthroughMixin } from './CompatFallthroughMixin-C8LPuwDr.js';
import { F as FormElementMixin } from './FormElementMixin-Dd_wkBN5.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { a as registerComponent } from './plugins-B172kuKE.js';
import './config-CKuo-p6e.js';
import './helpers.js';

const CONTROLS_ALIGNMENTS = ["left", "right", "center"];
var _sfc_main = defineComponent({
  name: "BNumberinput",
  components: {
    BIcon,
    BInput
  },
  mixins: [CompatFallthroughMixin, FormElementMixin],
  inject: {
    field: {
      from: "BField",
      default: false
    }
  },
  props: {
    modelValue: [Number, null],
    min: {
      type: [Number, String]
    },
    max: [Number, String],
    step: [Number, String],
    minStep: [Number, String],
    exponential: [Boolean, Number],
    disabled: Boolean,
    type: {
      type: String,
      default: "is-primary"
    },
    editable: {
      type: Boolean,
      default: true
    },
    controls: {
      type: Boolean,
      default: true
    },
    controlsAlignment: {
      type: String,
      default: "center",
      validator: (value) => {
        return CONTROLS_ALIGNMENTS.indexOf(value) >= 0;
      }
    },
    controlsRounded: {
      type: Boolean,
      default: false
    },
    controlsPosition: String,
    placeholder: [Number, String],
    ariaMinusLabel: String,
    ariaPlusLabel: String,
    longPress: {
      type: Boolean,
      default: true
    },
    // Native options to use in HTML5 validation
    autocomplete: String
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
      newValue: this.modelValue,
      newStep: this.step || 1,
      newMinStep: this.minStep,
      timesPressed: 1,
      _elementRef: "input",
      _$intervalRef: void 0
    };
  },
  computed: {
    computedValue: {
      // getter has to include `string` in the return type so that the
      // setter can accept `string`
      get() {
        return this.newValue;
      },
      set(value) {
        let newValue = Number(value) === 0 ? 0 : Number(value) || null;
        if (value === "" || value === void 0 || value === null) {
          newValue = null;
        }
        this.newValue = newValue;
        if (newValue === null) {
          this.$emit("update:modelValue", newValue);
        } else if (!isNaN(newValue)) {
          this.$emit("update:modelValue", Number(newValue));
        }
        this.$nextTick(() => {
          if (this.$refs.input) {
            this.$refs.input.checkHtml5Validity();
          }
        });
      }
    },
    controlsLeft() {
      if (this.controls && this.controlsAlignment !== "right") {
        return this.controlsAlignment === "left" ? ["minus", "plus"] : ["minus"];
      }
      return [];
    },
    controlsRight() {
      if (this.controls && this.controlsAlignment !== "left") {
        return this.controlsAlignment === "right" ? ["minus", "plus"] : ["plus"];
      }
      return [];
    },
    fieldClasses() {
      return [
        { "has-addons": this.controlsPosition === "compact" },
        { "is-grouped": this.controlsPosition !== "compact" },
        { "is-expanded": this.expanded }
      ];
    },
    buttonClasses() {
      return [this.type, this.size, { "is-rounded": this.controlsRounded }];
    },
    minNumber() {
      return typeof this.min === "string" ? parseFloat(this.min) : this.min;
    },
    maxNumber() {
      return typeof this.max === "string" ? parseFloat(this.max) : this.max;
    },
    stepNumber() {
      if (this.newStep === "any") {
        return 1;
      }
      return typeof this.newStep === "string" ? parseFloat(this.newStep) : this.newStep;
    },
    minStepNumber() {
      if (this.newStep === "any" && typeof this.newMinStep === "undefined") {
        return "any";
      }
      const step = typeof this.newMinStep !== "undefined" ? this.newMinStep : this.newStep;
      return typeof step === "string" ? parseFloat(step) : step;
    },
    disabledMin() {
      return +this.computedValue - this.stepNumber < this.minNumber;
    },
    disabledMax() {
      return +this.computedValue + this.stepNumber > this.maxNumber;
    },
    stepDecimals() {
      const step = this.minStepNumber.toString();
      const index = step.indexOf(".");
      if (index >= 0) {
        return step.substring(index + 1).length;
      }
      return 0;
    },
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  watch: {
    /*
     * When v-model is changed:
     *   1. Set internal value.
     */
    modelValue: {
      immediate: true,
      handler(value) {
        this.newValue = value;
      }
    },
    step(value) {
      this.newStep = value;
    },
    minStep(value) {
      this.newMinStep = value;
    }
  },
  methods: {
    isDisabled(control) {
      return this.disabled || (control === "plus" ? this.disabledMax : this.disabledMin);
    },
    decrement() {
      if (this.computedValue === null || typeof this.computedValue === "undefined") {
        if (this.maxNumber !== null && typeof this.maxNumber !== "undefined") {
          this.computedValue = this.maxNumber;
          return;
        }
        this.computedValue = 0;
      }
      if (typeof this.minNumber === "undefined" || +this.computedValue - this.stepNumber >= this.minNumber) {
        const value = +this.computedValue - this.stepNumber;
        this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
      }
    },
    increment() {
      if (this.computedValue === null || typeof this.computedValue === "undefined" || +this.computedValue < this.minNumber) {
        if (this.minNumber !== null && typeof this.minNumber !== "undefined") {
          this.computedValue = this.minNumber;
          return;
        }
        this.computedValue = 0;
      }
      if (typeof this.maxNumber === "undefined" || +this.computedValue + this.stepNumber <= this.maxNumber) {
        const value = +this.computedValue + this.stepNumber;
        this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
      }
    },
    onControlClick(event, inc) {
      if (event.detail !== 0 || event.type !== "click") return;
      if (inc) this.increment();
      else this.decrement();
    },
    longPressTick(inc) {
      if (inc) this.increment();
      else this.decrement();
      if (!this.longPress) return;
      this._$intervalRef = setTimeout(() => {
        this.longPressTick(inc);
      }, this.exponential ? 250 / (+this.exponential * this.timesPressed++) : 250);
    },
    onStartLongPress(event, inc) {
      if (event.button !== 0 && event.type !== "touchstart") return;
      clearTimeout(this._$intervalRef);
      this.longPressTick(inc);
    },
    onStopLongPress() {
      if (!this._$intervalRef) return;
      this.timesPressed = 1;
      clearTimeout(this._$intervalRef);
      this._$intervalRef = void 0;
    }
  },
  mounted() {
    if (this.field === this.$parent) {
      this.$parent.wrapNumberinput({
        controlsPosition: this.controlsPosition,
        size: this.size
      });
    }
  },
  beforeUnmount() {
    clearTimeout(this._$intervalRef);
  }
});

const _hoisted_1 = ["disabled", "aria-label", "onMousedown", "onTouchstart", "onClick"];
const _hoisted_2 = ["disabled", "aria-label", "onMousedown", "onTouchstart", "onClick"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  const _component_b_input = resolveComponent("b-input");
  return openBlock(), createElementBlock(
    "div",
    mergeProps({
      class: ["b-numberinput field", _ctx.fieldClasses]
    }, _ctx.rootAttrs),
    [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.controlsLeft, (control) => {
          return openBlock(), createElementBlock(
            "p",
            {
              key: control,
              class: normalizeClass(["control", control]),
              onMouseup: _cache[0] || (_cache[0] = (...args) => _ctx.onStopLongPress && _ctx.onStopLongPress(...args)),
              onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.onStopLongPress && _ctx.onStopLongPress(...args)),
              onTouchend: _cache[2] || (_cache[2] = (...args) => _ctx.onStopLongPress && _ctx.onStopLongPress(...args)),
              onTouchcancel: _cache[3] || (_cache[3] = (...args) => _ctx.onStopLongPress && _ctx.onStopLongPress(...args))
            },
            [
              createElementVNode("button", {
                type: "button",
                class: normalizeClass(["button", _ctx.buttonClasses]),
                disabled: _ctx.isDisabled(control) || void 0,
                "aria-label": control === "plus" ? _ctx.ariaPlusLabel : _ctx.ariaMinusLabel,
                onMousedown: ($event) => !_ctx.isDisabled(control) && _ctx.onStartLongPress($event, control === "plus"),
                onTouchstart: withModifiers(($event) => !_ctx.isDisabled(control) && _ctx.onStartLongPress($event, control === "plus"), ["prevent"]),
                onClick: ($event) => !_ctx.isDisabled(control) && _ctx.onControlClick($event, control === "plus")
              }, [
                createVNode(_component_b_icon, {
                  both: "",
                  icon: control,
                  pack: _ctx.iconPack,
                  size: _ctx.iconSize
                }, null, 8, ["icon", "pack", "size"])
              ], 42, _hoisted_1)
            ],
            34
            /* CLASS, NEED_HYDRATION */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      createVNode(_component_b_input, mergeProps({
        type: "number",
        ref: "input",
        modelValue: _ctx.computedValue,
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.computedValue = $event)
      }, _ctx.fallthroughAttrs, {
        step: _ctx.minStepNumber,
        max: _ctx.max,
        min: _ctx.min,
        size: _ctx.size,
        disabled: _ctx.disabledOrUndefined,
        readonly: !_ctx.editable,
        loading: _ctx.loading,
        rounded: _ctx.rounded,
        icon: _ctx.icon,
        "icon-pack": _ctx.iconPack,
        autocomplete: _ctx.autocomplete,
        expanded: _ctx.expanded,
        placeholder: _ctx.placeholder,
        "use-html5-validation": _ctx.useHtml5Validation,
        onFocus: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("focus", $event)),
        onBlur: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("blur", $event))
      }), null, 16, ["modelValue", "step", "max", "min", "size", "disabled", "readonly", "loading", "rounded", "icon", "icon-pack", "autocomplete", "expanded", "placeholder", "use-html5-validation"]),
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.controlsRight, (control) => {
          return openBlock(), createElementBlock(
            "p",
            {
              key: control,
              class: normalizeClass(["control", control]),
              onMouseup: _cache[7] || (_cache[7] = (...args) => _ctx.onStopLongPress && _ctx.onStopLongPress(...args)),
              onMouseleave: _cache[8] || (_cache[8] = (...args) => _ctx.onStopLongPress && _ctx.onStopLongPress(...args)),
              onTouchend: _cache[9] || (_cache[9] = (...args) => _ctx.onStopLongPress && _ctx.onStopLongPress(...args)),
              onTouchcancel: _cache[10] || (_cache[10] = (...args) => _ctx.onStopLongPress && _ctx.onStopLongPress(...args))
            },
            [
              createElementVNode("button", {
                type: "button",
                class: normalizeClass(["button", _ctx.buttonClasses]),
                disabled: _ctx.isDisabled(control) || void 0,
                "aria-label": control === "plus" ? _ctx.ariaPlusLabel : _ctx.ariaMinusLabel,
                onMousedown: ($event) => !_ctx.isDisabled(control) && _ctx.onStartLongPress($event, control === "plus"),
                onTouchstart: withModifiers(($event) => !_ctx.isDisabled(control) && _ctx.onStartLongPress($event, control === "plus"), ["prevent"]),
                onClick: ($event) => !_ctx.isDisabled(control) && _ctx.onControlClick($event, control === "plus")
              }, [
                createVNode(_component_b_icon, {
                  both: "",
                  icon: control,
                  pack: _ctx.iconPack,
                  size: _ctx.iconSize
                }, null, 8, ["icon", "pack", "size"])
              ], 42, _hoisted_2)
            ],
            34
            /* CLASS, NEED_HYDRATION */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ],
    16
    /* FULL_PROPS */
  );
}
var Numberinput = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    registerComponent(Vue, Numberinput);
  }
};

export { Numberinput as BNumberinput, Plugin as default };
