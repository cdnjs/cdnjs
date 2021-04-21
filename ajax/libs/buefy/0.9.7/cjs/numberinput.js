'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-14c82365.js');
require('./helpers.js');
require('./chunk-1bb51959.js');
var __chunk_3 = require('./chunk-330693d5.js');
var __chunk_4 = require('./chunk-7f8af05c.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_6 = require('./chunk-99088816.js');

var _components;
var script = {
  name: 'BNumberinput',
  components: (_components = {}, __chunk_1._defineProperty(_components, __chunk_4.Icon.name, __chunk_4.Icon), __chunk_1._defineProperty(_components, __chunk_6.Input.name, __chunk_6.Input), _components),
  mixins: [__chunk_3.FormElementMixin],
  inheritAttrs: false,
  props: {
    value: Number,
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
      default: 'is-primary'
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
      default: 'center',
      validator: function validator(value) {
        return ['left', 'right', 'center'].indexOf(value) >= 0;
      }
    },
    controlsRounded: {
      type: Boolean,
      default: false
    },
    controlsPosition: String,
    placeholder: [Number, String],
    ariaMinusLabel: String,
    ariaPlusLabel: String
  },
  data: function data() {
    return {
      newValue: this.value,
      newStep: this.step || 1,
      newMinStep: this.minStep,
      timesPressed: 1,
      _elementRef: 'input'
    };
  },
  computed: {
    computedValue: {
      get: function get() {
        return this.newValue;
      },
      set: function set(value) {
        var newValue = value;

        if (value === '' || value === undefined || value === null) {
          if (this.minNumber !== undefined) {
            newValue = this.minNumber;
          } else {
            newValue = null;
          }
        }

        this.newValue = newValue;

        if (!isNaN(newValue) && newValue !== null && newValue !== '-0') {
          this.$emit('input', Number(newValue));
        }

        !this.isValid && this.$refs.input.checkHtml5Validity();
      }
    },
    controlsLeft: function controlsLeft() {
      if (this.controls && this.controlsAlignment !== 'right') {
        return this.controlsAlignment === 'left' ? ['minus', 'plus'] : ['minus'];
      }

      return [];
    },
    controlsRight: function controlsRight() {
      if (this.controls && this.controlsAlignment !== 'left') {
        return this.controlsAlignment === 'right' ? ['minus', 'plus'] : ['plus'];
      }

      return [];
    },
    fieldClasses: function fieldClasses() {
      return [{
        'has-addons': this.controlsPosition === 'compact'
      }, {
        'is-grouped': this.controlsPosition !== 'compact'
      }, {
        'is-expanded': this.expanded
      }];
    },
    buttonClasses: function buttonClasses() {
      return [this.type, this.size, {
        'is-rounded': this.controlsRounded
      }];
    },
    minNumber: function minNumber() {
      return typeof this.min === 'string' ? parseFloat(this.min) : this.min;
    },
    maxNumber: function maxNumber() {
      return typeof this.max === 'string' ? parseFloat(this.max) : this.max;
    },
    stepNumber: function stepNumber() {
      return typeof this.newStep === 'string' ? parseFloat(this.newStep) : this.newStep;
    },
    minStepNumber: function minStepNumber() {
      var step = typeof this.newMinStep !== 'undefined' ? this.newMinStep : this.newStep;
      return typeof step === 'string' ? parseFloat(step) : step;
    },
    disabledMin: function disabledMin() {
      return this.computedValue - this.stepNumber < this.minNumber;
    },
    disabledMax: function disabledMax() {
      return this.computedValue + this.stepNumber > this.maxNumber;
    },
    stepDecimals: function stepDecimals() {
      var step = this.minStepNumber.toString();
      var index = step.indexOf('.');

      if (index >= 0) {
        return step.substring(index + 1).length;
      }

      return 0;
    }
  },
  watch: {
    /**
     * When v-model is changed:
     *   1. Set internal value.
     */
    value: {
      immediate: true,
      handler: function handler(value) {
        this.newValue = value;
      }
    },
    step: function step(value) {
      this.newStep = value;
    },
    minStep: function minStep(value) {
      this.newMinStep = value;
    }
  },
  methods: {
    isDisabled: function isDisabled(control) {
      return this.disabled || (control === 'plus' ? this.disabledMax : this.disabledMin);
    },
    decrement: function decrement() {
      if (typeof this.minNumber === 'undefined' || this.computedValue - this.stepNumber >= this.minNumber) {
        if (this.computedValue === null || typeof this.computedValue === 'undefined') {
          if (this.maxNumber) {
            this.computedValue = this.maxNumber;
            return;
          }

          this.computedValue = 0;
        }

        var value = this.computedValue - this.stepNumber;
        this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
      }
    },
    increment: function increment() {
      if (typeof this.maxNumber === 'undefined' || this.computedValue + this.stepNumber <= this.maxNumber) {
        if (this.computedValue === null || typeof this.computedValue === 'undefined') {
          if (this.minNumber) {
            this.computedValue = this.minNumber;
            return;
          }

          this.computedValue = 0;
        }

        var value = this.computedValue + this.stepNumber;
        this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
      }
    },
    onControlClick: function onControlClick(event, inc) {
      // IE 11 -> filter click event
      if (event.detail !== 0 || event.type !== 'click') return;
      if (inc) this.increment();else this.decrement();
    },
    longPressTick: function longPressTick(inc) {
      var _this = this;

      if (inc) this.increment();else this.decrement();
      this._$intervalRef = setTimeout(function () {
        _this.longPressTick(inc);
      }, this.exponential ? 250 / (this.exponential * this.timesPressed++) : 250);
    },
    onStartLongPress: function onStartLongPress(event, inc) {
      if (event.button !== 0 && event.type !== 'touchstart') return;
      clearTimeout(this._$intervalRef);
      this.longPressTick(inc);
    },
    onStopLongPress: function onStopLongPress() {
      if (!this._$intervalRef) return;
      this.timesPressed = 1;
      clearTimeout(this._$intervalRef);
      this._$intervalRef = null;
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-numberinput field",class:_vm.fieldClasses},[_vm._l((_vm.controlsLeft),function(control){return _c('p',{key:control,class:['control', control],on:{"mouseup":_vm.onStopLongPress,"mouseleave":_vm.onStopLongPress,"touchend":_vm.onStopLongPress,"touchcancel":_vm.onStopLongPress}},[_c('button',{staticClass:"button",class:_vm.buttonClasses,attrs:{"type":"button","disabled":_vm.isDisabled(control),"aria-label":control === 'plus' ? _vm.ariaPlusLabel : _vm.ariaMinusLabel},on:{"mousedown":function($event){!_vm.isDisabled(control) && _vm.onStartLongPress($event, control === 'plus');},"touchstart":function($event){$event.preventDefault();!_vm.isDisabled(control) && _vm.onStartLongPress($event, control === 'plus');},"click":function($event){!_vm.isDisabled(control) && _vm.onControlClick($event, control === 'plus');}}},[_c('b-icon',{attrs:{"both":"","icon":control,"pack":_vm.iconPack,"size":_vm.iconSize}})],1)])}),_c('b-input',_vm._b({ref:"input",attrs:{"type":"number","step":_vm.minStepNumber,"max":_vm.max,"min":_vm.min,"size":_vm.size,"disabled":_vm.disabled,"readonly":!_vm.editable,"loading":_vm.loading,"rounded":_vm.rounded,"icon":_vm.icon,"icon-pack":_vm.iconPack,"autocomplete":_vm.autocomplete,"expanded":_vm.expanded,"placeholder":_vm.placeholder,"use-html5-validation":_vm.useHtml5Validation},on:{"focus":function($event){return _vm.$emit('focus', $event)},"blur":function($event){return _vm.$emit('blur', $event)}},model:{value:(_vm.computedValue),callback:function ($$v) {_vm.computedValue=$$v;},expression:"computedValue"}},'b-input',_vm.$attrs,false)),_vm._l((_vm.controlsRight),function(control){return _c('p',{key:control,class:['control', control],on:{"mouseup":_vm.onStopLongPress,"mouseleave":_vm.onStopLongPress,"touchend":_vm.onStopLongPress,"touchcancel":_vm.onStopLongPress}},[_c('button',{staticClass:"button",class:_vm.buttonClasses,attrs:{"type":"button","disabled":_vm.isDisabled(control),"aria-label":control === 'plus' ? _vm.ariaPlusLabel : _vm.ariaMinusLabel},on:{"mousedown":function($event){!_vm.isDisabled(control) && _vm.onStartLongPress($event, control === 'plus');},"touchstart":function($event){$event.preventDefault();!_vm.isDisabled(control) && _vm.onStartLongPress($event, control === 'plus');},"click":function($event){!_vm.isDisabled(control) && _vm.onControlClick($event, control === 'plus');}}},[_c('b-icon',{attrs:{"both":"","icon":control,"pack":_vm.iconPack,"size":_vm.iconSize}})],1)])})],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Numberinput = __chunk_5.__vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, Numberinput);
  }
};
__chunk_5.use(Plugin);

exports.BNumberinput = Numberinput;
exports.default = Plugin;
