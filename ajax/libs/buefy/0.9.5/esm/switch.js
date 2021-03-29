import { c as config } from './chunk-953eb524.js';
import { _ as __vue_normalize__, r as registerComponent, u as use } from './chunk-cca88db8.js';

//
var script = {
  name: 'BSwitch',
  props: {
    value: [String, Number, Boolean, Function, Object, Array, Date],
    nativeValue: [String, Number, Boolean, Function, Object, Array, Date],
    disabled: Boolean,
    type: String,
    passiveType: String,
    name: String,
    required: Boolean,
    size: String,
    trueValue: {
      type: [String, Number, Boolean, Function, Object, Array, Date],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean, Function, Object, Array, Date],
      default: false
    },
    rounded: {
      type: Boolean,
      default: function _default() {
        return config.defaultSwitchRounded;
      }
    },
    outlined: {
      type: Boolean,
      default: false
    },
    leftLabel: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      newValue: this.value,
      isMouseDown: false
    };
  },
  computed: {
    computedValue: {
      get: function get() {
        return this.newValue;
      },
      set: function set(value) {
        this.newValue = value;
        this.$emit('input', value);
      }
    },
    newClass: function newClass() {
      return [this.size, {
        'is-disabled': this.disabled,
        'is-rounded': this.rounded,
        'is-outlined': this.outlined,
        'has-left-label': this.leftLabel
      }];
    },
    checkClasses: function checkClasses() {
      return [{
        'is-elastic': this.isMouseDown && !this.disabled
      }, this.passiveType && "".concat(this.passiveType, "-passive"), this.type];
    }
  },
  watch: {
    /**
    * When v-model change, set internal value.
    */
    value: function value(_value) {
      this.newValue = _value;
    }
  },
  methods: {
    focus: function focus() {
      // MacOS FireFox and Safari do not focus when clicked
      this.$refs.input.focus();
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{ref:"label",staticClass:"switch",class:_vm.newClass,attrs:{"disabled":_vm.disabled},on:{"click":_vm.focus,"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()},"mousedown":function($event){_vm.isMouseDown = true;},"mouseup":function($event){_vm.isMouseDown = false;},"mouseout":function($event){_vm.isMouseDown = false;},"blur":function($event){_vm.isMouseDown = false;}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",attrs:{"type":"checkbox","disabled":_vm.disabled,"name":_vm.name,"required":_vm.required,"true-value":_vm.trueValue,"false-value":_vm.falseValue},domProps:{"value":_vm.nativeValue,"checked":Array.isArray(_vm.computedValue)?_vm._i(_vm.computedValue,_vm.nativeValue)>-1:_vm._q(_vm.computedValue,_vm.trueValue)},on:{"click":function($event){$event.stopPropagation();},"change":function($event){var $$a=_vm.computedValue,$$el=$event.target,$$c=$$el.checked?(_vm.trueValue):(_vm.falseValue);if(Array.isArray($$a)){var $$v=_vm.nativeValue,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.computedValue=$$a.concat([$$v]));}else{$$i>-1&&(_vm.computedValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.computedValue=$$c;}}}}),_c('span',{staticClass:"check",class:_vm.checkClasses}),_c('span',{staticClass:"control-label"},[_vm._t("default")],2)])};
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
  

  
  var Switch = __vue_normalize__(
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
    registerComponent(Vue, Switch);
  }
};
use(Plugin);

export default Plugin;
export { Switch as BSwitch };
