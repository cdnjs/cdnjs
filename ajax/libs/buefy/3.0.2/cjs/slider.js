'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var Tooltip = require('./Tooltip-Cgighv0j.js');
var config = require('./config-DR826Ki2.js');
var CompatFallthroughMixin = require('./CompatFallthroughMixin-hhK0Gkhr.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var helpers = require('./helpers.js');
var plugins = require('./plugins-DbyYGVpp.js');

const DISPLAY_FORMATS = ["raw", "percent"];

var _sfc_main$2 = vue.defineComponent({
  name: "BSliderThumb",
  components: {
    BTooltip: Tooltip.Tooltip
  },
  mixins: [CompatFallthroughMixin.CompatFallthroughMixin],
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ""
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    indicator: {
      type: Boolean,
      default: false
    },
    customFormatter: Function,
    format: {
      type: String,
      default: "raw",
      validator: (value) => {
        return DISPLAY_FORMATS.indexOf(value) >= 0;
      }
    },
    locale: {
      type: [String, Array],
      default: () => {
        return config.config.defaultLocale;
      }
    },
    tooltipAlways: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    dragend: () => true,
    dragstart: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "update:modelValue": (_value) => true
  },
  data() {
    return {
      isFocused: false,
      dragging: false,
      startX: 0,
      startPosition: 0,
      newPosition: null,
      oldValue: this.modelValue
    };
  },
  computed: {
    parent() {
      return this.$parent;
    },
    disabled() {
      return this.parent.disabled;
    },
    max() {
      return this.parent.max;
    },
    min() {
      return this.parent.min;
    },
    step() {
      return this.parent.step;
    },
    precision() {
      return this.parent.precision;
    },
    currentPosition() {
      return `${(this.modelValue - this.min) / (this.max - this.min) * 100}%`;
    },
    wrapperStyle() {
      return { left: this.currentPosition };
    },
    formattedValue() {
      if (typeof this.customFormatter !== "undefined") {
        return this.customFormatter(this.modelValue);
      }
      if (this.format === "percent") {
        return new Intl.NumberFormat(
          this.locale,
          {
            style: "percent"
          }
        ).format((this.modelValue - this.min) / (this.max - this.min));
      }
      return new Intl.NumberFormat(this.locale).format(this.modelValue);
    }
  },
  methods: {
    onFocus() {
      this.isFocused = true;
    },
    onBlur() {
      this.isFocused = false;
    },
    onButtonDown(event) {
      if (this.disabled) return;
      event.preventDefault();
      this.onDragStart(event);
      if (typeof window !== "undefined") {
        document.addEventListener("mousemove", this.onDragging);
        document.addEventListener("touchmove", this.onDragging);
        document.addEventListener("mouseup", this.onDragEnd);
        document.addEventListener("touchend", this.onDragEnd);
        document.addEventListener("contextmenu", this.onDragEnd);
      }
    },
    onLeftKeyDown() {
      if (this.disabled || this.modelValue === this.min) return;
      this.newPosition = parseFloat(this.currentPosition) - this.step / (this.max - this.min) * 100;
      this.setPosition(this.newPosition);
      this.parent.emitValue("change");
    },
    onRightKeyDown() {
      if (this.disabled || this.modelValue === this.max) return;
      this.newPosition = parseFloat(this.currentPosition) + this.step / (this.max - this.min) * 100;
      this.setPosition(this.newPosition);
      this.parent.emitValue("change");
    },
    onHomeKeyDown() {
      if (this.disabled || this.modelValue === this.min) return;
      this.newPosition = 0;
      this.setPosition(this.newPosition);
      this.parent.emitValue("change");
    },
    onEndKeyDown() {
      if (this.disabled || this.modelValue === this.max) return;
      this.newPosition = 100;
      this.setPosition(this.newPosition);
      this.parent.emitValue("change");
    },
    onDragStart(event) {
      this.dragging = true;
      this.$emit("dragstart");
      this.startX = event.type === "touchstart" ? event.touches[0].clientX : event.clientX;
      this.startPosition = parseFloat(this.currentPosition);
      this.newPosition = this.startPosition;
    },
    onDragging(event) {
      if (this.dragging) {
        const clientX = event.type === "touchmove" ? event.touches[0].clientX : event.clientX;
        const diff = (clientX - this.startX) / this.parent.sliderSize() * 100;
        this.newPosition = this.startPosition + diff;
        this.setPosition(this.newPosition);
      }
    },
    onDragEnd() {
      this.dragging = false;
      this.$emit("dragend");
      if (this.modelValue !== this.oldValue) {
        this.parent.emitValue("change");
      }
      this.setPosition(this.newPosition);
      if (typeof window !== "undefined") {
        document.removeEventListener("mousemove", this.onDragging);
        document.removeEventListener("touchmove", this.onDragging);
        document.removeEventListener("mouseup", this.onDragEnd);
        document.removeEventListener("touchend", this.onDragEnd);
        document.removeEventListener("contextmenu", this.onDragEnd);
      }
    },
    setPosition(percent) {
      if (percent === null || isNaN(percent)) return;
      if (percent < 0) {
        percent = 0;
      } else if (percent > 100) {
        percent = 100;
      }
      const stepLength = 100 / ((this.max - this.min) / this.step);
      const steps = Math.round(percent / stepLength);
      let value = steps * stepLength / 100 * (this.max - this.min) + this.min;
      value = parseFloat(value.toFixed(this.precision));
      this.$emit("update:modelValue", value);
      if (!this.dragging && value !== this.oldValue) {
        this.oldValue = value;
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener("mousemove", this.onDragging);
    document.removeEventListener("touchmove", this.onDragging);
    document.removeEventListener("mouseup", this.onDragEnd);
    document.removeEventListener("touchend", this.onDragEnd);
    document.removeEventListener("contextmenu", this.onDragEnd);
  }
});

const _hoisted_1$2 = ["tabindex"];
const _hoisted_2 = { key: 0 };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_tooltip = vue.resolveComponent("b-tooltip");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    vue.mergeProps({
      class: ["b-slider-thumb-wrapper", { "is-dragging": _ctx.dragging, "has-indicator": _ctx.indicator }],
      style: _ctx.wrapperStyle
    }, _ctx.rootAttrs),
    [
      vue.createVNode(_component_b_tooltip, {
        label: _ctx.formattedValue,
        type: _ctx.type,
        always: _ctx.dragging || _ctx.isFocused || _ctx.tooltipAlways,
        active: !_ctx.disabled && _ctx.tooltip
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("div", vue.mergeProps({
            class: "b-slider-thumb",
            tabindex: _ctx.disabled ? void 0 : 0
          }, _ctx.fallthroughAttrs, {
            onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.onButtonDown && _ctx.onButtonDown(...args)),
            onTouchstart: _cache[1] || (_cache[1] = (...args) => _ctx.onButtonDown && _ctx.onButtonDown(...args)),
            onFocus: _cache[2] || (_cache[2] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
            onBlur: _cache[3] || (_cache[3] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
            onKeydown: [
              _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers((...args) => _ctx.onLeftKeyDown && _ctx.onLeftKeyDown(...args), ["prevent"]), ["left"])),
              _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers((...args) => _ctx.onRightKeyDown && _ctx.onRightKeyDown(...args), ["prevent"]), ["right"])),
              _cache[6] || (_cache[6] = vue.withKeys(vue.withModifiers((...args) => _ctx.onLeftKeyDown && _ctx.onLeftKeyDown(...args), ["prevent"]), ["down"])),
              _cache[7] || (_cache[7] = vue.withKeys(vue.withModifiers((...args) => _ctx.onRightKeyDown && _ctx.onRightKeyDown(...args), ["prevent"]), ["up"])),
              _cache[8] || (_cache[8] = vue.withKeys(vue.withModifiers((...args) => _ctx.onHomeKeyDown && _ctx.onHomeKeyDown(...args), ["prevent"]), ["home"])),
              _cache[9] || (_cache[9] = vue.withKeys(vue.withModifiers((...args) => _ctx.onEndKeyDown && _ctx.onEndKeyDown(...args), ["prevent"]), ["end"]))
            ]
          }), [
            _ctx.indicator ? (vue.openBlock(), vue.createElementBlock(
              "span",
              _hoisted_2,
              vue.toDisplayString(_ctx.formattedValue),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true)
          ], 16, _hoisted_1$2)
        ]),
        _: 1
        /* STABLE */
      }, 8, ["label", "type", "always", "active"])
    ],
    16
    /* FULL_PROPS */
  );
}
var BSliderThumb = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);

var _sfc_main$1 = vue.defineComponent({
  name: "BSliderTick",
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    parent() {
      return this.$parent;
    },
    position() {
      const pos = (this.value - this.parent.min) / (this.parent.max - this.parent.min) * 100;
      return pos >= 0 && pos <= 100 ? pos : 0;
    },
    hidden() {
      return this.value === this.parent.min || this.value === this.parent.max;
    }
  },
  methods: {
    getTickStyle(position) {
      return { left: position + "%" };
    }
  },
  created() {
    if (!this.parent.$data._isSlider) {
      throw new Error("You should wrap bSliderTick on a bSlider");
    }
  }
});

const _hoisted_1$1 = {
  key: 0,
  class: "b-slider-tick-label"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(["b-slider-tick", { "is-tick-hidden": _ctx.hidden }]),
      style: vue.normalizeStyle(_ctx.getTickStyle(_ctx.position))
    },
    [
      _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_1$1, [
        vue.renderSlot(_ctx.$slots, "default")
      ])) : vue.createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
var SliderTick = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

var _sfc_main = vue.defineComponent({
  name: "BSlider",
  components: {
    BSliderThumb,
    BSliderTick: SliderTick
  },
  props: {
    modelValue: {
      type: [Number, Array],
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    type: {
      type: String,
      default: "is-primary"
    },
    size: String,
    ticks: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    tooltipType: String,
    rounded: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    customFormatter: Function,
    ariaLabel: [String, Array],
    biggerSliderFocus: {
      type: Boolean,
      default: false
    },
    indicator: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: "raw",
      validator: (value) => {
        return DISPLAY_FORMATS.indexOf(value) >= 0;
      }
    },
    locale: {
      type: [String, Array],
      default: () => {
        return config.config.defaultLocale;
      }
    },
    tooltipAlways: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    change: (_value) => true,
    dragend: () => true,
    dragging: (_value) => true,
    dragstart: () => true,
    "update:modelValue": (_value) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      value1: void 0,
      value2: void 0,
      // internal is used to update value1 and value2 with a single shot.
      // internal is also used to stop unnecessary propagation of update.
      internal: {
        value1: void 0,
        value2: void 0
      },
      dragging: false,
      isRange: false,
      isThumbReversed: false,
      isTrackClickDisabled: false,
      _isSlider: true,
      // Used by Thumb and Tick
      timeOutID: void 0
    };
  },
  computed: {
    newTooltipType() {
      return this.tooltipType ? this.tooltipType : this.type;
    },
    tickValues() {
      if (!this.ticks || this.min > this.max || this.step === 0) return [];
      const result = [];
      for (let i = this.min + this.step; i < this.max; i = i + this.step) {
        result.push(i);
      }
      return result;
    },
    minValue() {
      return Math.min(this.value1, this.value2);
    },
    maxValue() {
      return Math.max(this.value1, this.value2);
    },
    barSize() {
      return this.isRange ? `${100 * (this.maxValue - this.minValue) / (this.max - this.min)}%` : `${100 * (this.value1 - this.min) / (this.max - this.min)}%`;
    },
    barStart() {
      return this.isRange ? `${100 * (this.minValue - this.min) / (this.max - this.min)}%` : "0%";
    },
    precision() {
      const precisions = [this.min, this.max, this.step].map((item) => {
        const decimal = ("" + item).split(".")[1];
        return decimal ? decimal.length : 0;
      });
      return Math.max(...precisions);
    },
    barStyle() {
      return {
        width: this.barSize,
        left: this.barStart
      };
    },
    rootClasses() {
      return {
        "is-rounded": this.rounded,
        "is-dragging": this.dragging,
        "is-disabled": this.disabled,
        "slider-focus": this.biggerSliderFocus
      };
    }
  },
  watch: {
    /*
    * When v-model is changed set the new active step.
    */
    modelValue(value) {
      this.setValues(value);
    },
    internal({ value1, value2 }) {
      this.value1 = value1;
      this.value2 = value2;
    },
    value1(newValue) {
      if (this.internal.value1 !== newValue) {
        this.onInternalValueUpdate();
      }
    },
    value2(newValue) {
      if (this.internal.value2 !== newValue) {
        this.onInternalValueUpdate();
      }
    },
    min() {
      this.setValues(this.modelValue);
    },
    max() {
      this.setValues(this.modelValue);
    }
  },
  methods: {
    setValues(newValue) {
      if (this.min > this.max) {
        return;
      }
      if (Array.isArray(newValue)) {
        this.isRange = true;
        const smallValue = typeof newValue[0] !== "number" || isNaN(newValue[0]) ? this.min : helpers.bound(newValue[0], this.min, this.max);
        const largeValue = typeof newValue[1] !== "number" || isNaN(newValue[1]) ? this.max : helpers.bound(newValue[1], this.min, this.max);
        this.internal = {
          value1: this.isThumbReversed ? largeValue : smallValue,
          value2: this.isThumbReversed ? smallValue : largeValue
        };
      } else {
        this.isRange = false;
        this.internal = {
          value1: isNaN(newValue) ? this.min : helpers.bound(newValue, this.min, this.max),
          value2: void 0
        };
      }
    },
    onInternalValueUpdate() {
      if (this.isRange) {
        this.isThumbReversed = this.value1 > this.value2;
      }
      if (!this.lazy || !this.dragging) {
        this.emitValue("update:modelValue");
      }
      if (this.dragging) {
        this.emitValue("dragging");
      }
    },
    sliderSize() {
      return this.$refs.slider.getBoundingClientRect().width;
    },
    onSliderClick(event) {
      if (this.disabled || this.isTrackClickDisabled) return;
      const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;
      const percent = (event.clientX - sliderOffsetLeft) / this.sliderSize() * 100;
      const targetValue = this.min + percent * (this.max - this.min) / 100;
      const diffFirst = Math.abs(targetValue - this.value1);
      if (!this.isRange) {
        if (diffFirst < this.step / 2) return;
        this.$refs.button1.setPosition(percent);
      } else {
        const diffSecond = Math.abs(targetValue - this.value2);
        if (diffFirst <= diffSecond) {
          if (diffFirst < this.step / 2) return;
          this.$refs.button1.setPosition(percent);
        } else {
          if (diffSecond < this.step / 2) return;
          this.$refs.button2.setPosition(percent);
        }
      }
      this.emitValue("change");
    },
    onDragStart() {
      this.dragging = true;
      this.$emit("dragstart");
    },
    onDragEnd() {
      this.isTrackClickDisabled = true;
      this.timeOutID = setTimeout(() => {
        this.isTrackClickDisabled = false;
      }, 0);
      this.dragging = false;
      this.$emit("dragend");
      if (this.lazy) {
        this.emitValue("update:modelValue");
      }
    },
    emitValue(type) {
      const emittedValue = this.isRange ? [this.minValue, this.maxValue] : this.value1;
      switch (type) {
        case "change":
          this.$emit(type, emittedValue);
          break;
        case "dragging":
          this.$emit(type, emittedValue);
          break;
        case "update:modelValue":
          this.$emit(type, emittedValue);
          break;
      }
    }
  },
  created() {
    this.isThumbReversed = false;
    this.isTrackClickDisabled = false;
    this.setValues(this.modelValue);
  },
  beforeUnmount() {
    clearTimeout(this.timeOutID);
  }
});

const _hoisted_1 = {
  class: "b-slider-track",
  ref: "slider"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_slider_tick = vue.resolveComponent("b-slider-tick");
  const _component_b_slider_thumb = vue.resolveComponent("b-slider-thumb");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(["b-slider", [_ctx.size, _ctx.type, _ctx.rootClasses]]),
      onClick: _cache[2] || (_cache[2] = (...args) => _ctx.onSliderClick && _ctx.onSliderClick(...args))
    },
    [
      vue.createElementVNode(
        "div",
        _hoisted_1,
        [
          vue.createElementVNode(
            "div",
            {
              class: "b-slider-fill",
              style: vue.normalizeStyle(_ctx.barStyle)
            },
            null,
            4
            /* STYLE */
          ),
          _ctx.ticks ? (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            vue.renderList(_ctx.tickValues, (val, key) => {
              return vue.openBlock(), vue.createBlock(_component_b_slider_tick, {
                key,
                value: val
              }, null, 8, ["value"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )) : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "default"),
          vue.createVNode(_component_b_slider_thumb, {
            "tooltip-always": _ctx.tooltipAlways,
            modelValue: _ctx.value1,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.value1 = $event),
            type: _ctx.newTooltipType,
            tooltip: _ctx.tooltip,
            "custom-formatter": _ctx.customFormatter,
            indicator: _ctx.indicator,
            format: _ctx.format,
            locale: _ctx.locale,
            ref: "button1",
            role: "slider",
            "aria-valuenow": _ctx.value1,
            "aria-valuemin": _ctx.min,
            "aria-valuemax": _ctx.max,
            "aria-orientation": "horizontal",
            "aria-label": Array.isArray(_ctx.ariaLabel) ? _ctx.ariaLabel[0] : _ctx.ariaLabel,
            "aria-disabled": _ctx.disabled || void 0,
            onDragstart: _ctx.onDragStart,
            onDragend: _ctx.onDragEnd
          }, null, 8, ["tooltip-always", "modelValue", "type", "tooltip", "custom-formatter", "indicator", "format", "locale", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-label", "aria-disabled", "onDragstart", "onDragend"]),
          _ctx.isRange ? (vue.openBlock(), vue.createBlock(_component_b_slider_thumb, {
            key: 1,
            "tooltip-always": _ctx.tooltipAlways,
            modelValue: _ctx.value2,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.value2 = $event),
            type: _ctx.newTooltipType,
            tooltip: _ctx.tooltip,
            "custom-formatter": _ctx.customFormatter,
            indicator: _ctx.indicator,
            format: _ctx.format,
            locale: _ctx.locale,
            ref: "button2",
            role: "slider",
            "aria-valuenow": _ctx.value2,
            "aria-valuemin": _ctx.min,
            "aria-valuemax": _ctx.max,
            "aria-orientation": "horizontal",
            "aria-label": Array.isArray(_ctx.ariaLabel) ? _ctx.ariaLabel[1] : "",
            "aria-disabled": _ctx.disabled || void 0,
            onDragstart: _ctx.onDragStart,
            onDragend: _ctx.onDragEnd
          }, null, 8, ["tooltip-always", "modelValue", "type", "tooltip", "custom-formatter", "indicator", "format", "locale", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-label", "aria-disabled", "onDragstart", "onDragend"])) : vue.createCommentVNode("v-if", true)
        ],
        512
        /* NEED_PATCH */
      )
    ],
    2
    /* CLASS */
  );
}
var Slider = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Slider);
    plugins.registerComponent(Vue, SliderTick);
  }
};

exports.BSlider = Slider;
exports.BSliderTick = SliderTick;
exports.default = Plugin;
