'use strict';

var BaseComponent = require('primevue/basecomponent');
var KnobStyle = require('primevue/knob/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var KnobStyle__default = /*#__PURE__*/_interopDefaultLegacy(KnobStyle);

var script$1 = {
  name: 'BaseKnob',
  "extends": BaseComponent__default["default"],
  props: {
    modelValue: {
      type: Number,
      "default": null
    },
    size: {
      type: Number,
      "default": 100
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    readonly: {
      type: Boolean,
      "default": false
    },
    step: {
      type: Number,
      "default": 1
    },
    min: {
      type: Number,
      "default": 0
    },
    max: {
      type: Number,
      "default": 100
    },
    valueColor: {
      type: String,
      "default": 'var(--primary-color, Black)'
    },
    rangeColor: {
      type: String,
      "default": 'var(--surface-border, LightGray)'
    },
    textColor: {
      type: String,
      "default": 'var(--text-color-secondary, Black)'
    },
    strokeWidth: {
      type: Number,
      "default": 14
    },
    showValue: {
      type: Boolean,
      "default": true
    },
    valueTemplate: {
      type: [String, Function],
      "default": '{value}'
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    ariaLabelledby: {
      type: String,
      "default": null
    },
    ariaLabel: {
      type: String,
      "default": null
    }
  },
  style: KnobStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

// Set fix value for SSR.
var Math_PI = 3.14159265358979;
var script = {
  name: 'Knob',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue', 'change'],
  data: function data() {
    return {
      radius: 40,
      midX: 50,
      midY: 50,
      minRadians: 4 * Math_PI / 3,
      maxRadians: -Math_PI / 3
    };
  },
  methods: {
    updateValue: function updateValue(offsetX, offsetY) {
      var dx = offsetX - this.size / 2;
      var dy = this.size / 2 - offsetY;
      var angle = Math.atan2(dy, dx);
      var start = -Math_PI / 2 - Math_PI / 6;
      this.updateModel(angle, start);
    },
    updateModel: function updateModel(angle, start) {
      var mappedValue;
      if (angle > this.maxRadians) mappedValue = this.mapRange(angle, this.minRadians, this.maxRadians, this.min, this.max);else if (angle < start) mappedValue = this.mapRange(angle + 2 * Math_PI, this.minRadians, this.maxRadians, this.min, this.max);else return;
      var newValue = Math.round((mappedValue - this.min) / this.step) * this.step + this.min;
      this.$emit('update:modelValue', newValue);
      this.$emit('change', newValue);
    },
    updateModelValue: function updateModelValue(newValue) {
      if (newValue > this.max) this.$emit('update:modelValue', this.max);else if (newValue < this.min) this.$emit('update:modelValue', this.min);else this.$emit('update:modelValue', newValue);
    },
    mapRange: function mapRange(x, inMin, inMax, outMin, outMax) {
      return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    },
    onClick: function onClick(event) {
      if (!this.disabled && !this.readonly) {
        this.updateValue(event.offsetX, event.offsetY);
      }
    },
    onMouseDown: function onMouseDown(event) {
      if (!this.disabled && !this.readonly) {
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);
        event.preventDefault();
      }
    },
    onMouseUp: function onMouseUp(event) {
      if (!this.disabled && !this.readonly) {
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);
        event.preventDefault();
      }
    },
    onTouchStart: function onTouchStart(event) {
      if (!this.disabled && !this.readonly) {
        window.addEventListener('touchmove', this.onTouchMove);
        window.addEventListener('touchend', this.onTouchEnd);
        event.preventDefault();
      }
    },
    onTouchEnd: function onTouchEnd(event) {
      if (!this.disabled && !this.readonly) {
        window.removeEventListener('touchmove', this.onTouchMove);
        window.removeEventListener('touchend', this.onTouchEnd);
        event.preventDefault();
      }
    },
    onMouseMove: function onMouseMove(event) {
      if (!this.disabled && !this.readonly) {
        this.updateValue(event.offsetX, event.offsetY);
        event.preventDefault();
      }
    },
    onTouchMove: function onTouchMove(event) {
      if (!this.disabled && !this.readonly && event.touches.length == 1) {
        var rect = this.$el.getBoundingClientRect();
        var touch = event.targetTouches.item(0);
        var offsetX = touch.clientX - rect.left;
        var offsetY = touch.clientY - rect.top;
        this.updateValue(offsetX, offsetY);
      }
    },
    onKeyDown: function onKeyDown(event) {
      if (!this.disabled && !this.readonly) {
        switch (event.code) {
          case 'ArrowRight':
          case 'ArrowUp':
            {
              event.preventDefault();
              this.updateModelValue(this.modelValue + this.step);
              break;
            }
          case 'ArrowLeft':
          case 'ArrowDown':
            {
              event.preventDefault();
              this.updateModelValue(this.modelValue - this.step);
              break;
            }
          case 'Home':
            {
              event.preventDefault();
              this.$emit('update:modelValue', this.min);
              break;
            }
          case 'End':
            {
              event.preventDefault();
              this.$emit('update:modelValue', this.max);
              break;
            }
          case 'PageUp':
            {
              event.preventDefault();
              this.updateModelValue(this.modelValue + 10);
              break;
            }
          case 'PageDown':
            {
              event.preventDefault();
              this.updateModelValue(this.modelValue - 10);
              break;
            }
        }
      }
    }
  },
  computed: {
    rangePath: function rangePath() {
      return "M ".concat(this.minX, " ").concat(this.minY, " A ").concat(this.radius, " ").concat(this.radius, " 0 1 1 ").concat(this.maxX, " ").concat(this.maxY);
    },
    valuePath: function valuePath() {
      return "M ".concat(this.zeroX, " ").concat(this.zeroY, " A ").concat(this.radius, " ").concat(this.radius, " 0 ").concat(this.largeArc, " ").concat(this.sweep, " ").concat(this.valueX, " ").concat(this.valueY);
    },
    zeroRadians: function zeroRadians() {
      if (this.min > 0 && this.max > 0) return this.mapRange(this.min, this.min, this.max, this.minRadians, this.maxRadians);else return this.mapRange(0, this.min, this.max, this.minRadians, this.maxRadians);
    },
    valueRadians: function valueRadians() {
      return this.mapRange(this.modelValue, this.min, this.max, this.minRadians, this.maxRadians);
    },
    minX: function minX() {
      return this.midX + Math.cos(this.minRadians) * this.radius;
    },
    minY: function minY() {
      return this.midY - Math.sin(this.minRadians) * this.radius;
    },
    maxX: function maxX() {
      return this.midX + Math.cos(this.maxRadians) * this.radius;
    },
    maxY: function maxY() {
      return this.midY - Math.sin(this.maxRadians) * this.radius;
    },
    zeroX: function zeroX() {
      return this.midX + Math.cos(this.zeroRadians) * this.radius;
    },
    zeroY: function zeroY() {
      return this.midY - Math.sin(this.zeroRadians) * this.radius;
    },
    valueX: function valueX() {
      return this.midX + Math.cos(this.valueRadians) * this.radius;
    },
    valueY: function valueY() {
      return this.midY - Math.sin(this.valueRadians) * this.radius;
    },
    largeArc: function largeArc() {
      return Math.abs(this.zeroRadians - this.valueRadians) < Math_PI ? 0 : 1;
    },
    sweep: function sweep() {
      return this.valueRadians > this.zeroRadians ? 0 : 1;
    },
    valueToDisplay: function valueToDisplay() {
      if (typeof this.valueTemplate === 'string') {
        return this.valueTemplate.replace(/{value}/g, this.modelValue);
      } else {
        return this.valueTemplate(this.modelValue);
      }
    }
  }
};
//Derived and forked from https://github.com/kramer99/vue-knob-control

var _hoisted_1 = ["width", "height", "tabindex", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-labelledby", "aria-label"];
var _hoisted_2 = ["d", "stroke-width", "stroke"];
var _hoisted_3 = ["d", "stroke-width", "stroke"];
var _hoisted_4 = ["fill"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [(vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps({
    viewBox: "0 0 100 100",
    role: "slider",
    width: _ctx.size,
    height: _ctx.size,
    tabindex: _ctx.readonly || _ctx.disabled ? -1 : _ctx.tabindex,
    "aria-valuemin": _ctx.min,
    "aria-valuemax": _ctx.max,
    "aria-valuenow": _ctx.modelValue,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.onClick && $options.onClick.apply($options, arguments);
    }),
    onKeydown: _cache[1] || (_cache[1] = function () {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    }),
    onMousedown: _cache[2] || (_cache[2] = function () {
      return $options.onMouseDown && $options.onMouseDown.apply($options, arguments);
    }),
    onMouseup: _cache[3] || (_cache[3] = function () {
      return $options.onMouseUp && $options.onMouseUp.apply($options, arguments);
    }),
    onTouchstartPassive: _cache[4] || (_cache[4] = function () {
      return $options.onTouchStart && $options.onTouchStart.apply($options, arguments);
    }),
    onTouchend: _cache[5] || (_cache[5] = function () {
      return $options.onTouchEnd && $options.onTouchEnd.apply($options, arguments);
    })
  }, _ctx.ptm('svg')), [vue.createElementVNode("path", vue.mergeProps({
    d: $options.rangePath,
    "stroke-width": _ctx.strokeWidth,
    stroke: _ctx.rangeColor,
    "class": _ctx.cx('range')
  }, _ctx.ptm('range')), null, 16, _hoisted_2), vue.createElementVNode("path", vue.mergeProps({
    d: $options.valuePath,
    "stroke-width": _ctx.strokeWidth,
    stroke: _ctx.valueColor,
    "class": _ctx.cx('value')
  }, _ctx.ptm('value')), null, 16, _hoisted_3), _ctx.showValue ? (vue.openBlock(), vue.createElementBlock("text", vue.mergeProps({
    key: 0,
    x: 50,
    y: 57,
    "text-anchor": "middle",
    fill: _ctx.textColor,
    "class": _ctx.cx('label')
  }, _ctx.ptm('label')), vue.toDisplayString($options.valueToDisplay), 17, _hoisted_4)) : vue.createCommentVNode("", true)], 16, _hoisted_1))], 16);
}

script.render = render;

module.exports = script;
