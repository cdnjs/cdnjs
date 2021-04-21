import { _ as _defineProperty } from './chunk-1fafdf15.js';
import './helpers.js';
import { c as config } from './chunk-953eb524.js';
import { _ as __vue_normalize__, r as registerComponent, u as use } from './chunk-cca88db8.js';
import { P as ProviderParentMixin, I as InjectedChildMixin } from './chunk-360e7443.js';

var script = {
  name: 'BProgress',
  mixins: [ProviderParentMixin('progress')],
  props: {
    type: {
      type: [String, Object],
      default: 'is-darkgrey'
    },
    size: String,
    value: {
      type: Number,
      default: undefined
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
      default: 'raw',
      validator: function validator(value) {
        return ['raw', 'percent'].indexOf(value) >= 0;
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
      default: function _default() {
        return config.defaultLocale;
      }
    }
  },
  computed: {
    isIndeterminate: function isIndeterminate() {
      return this.value === undefined || this.value === null;
    },
    newType: function newType() {
      return [this.size, this.type, {
        'is-more-than-half': this.value && this.value > this.max / 2
      }];
    },
    newValue: function newValue() {
      return this.calculateValue(this.value);
    },
    isNative: function isNative() {
      return this.$slots.bar === undefined;
    },
    wrapperClasses: function wrapperClasses() {
      return _defineProperty({
        'is-not-native': !this.isNative
      }, this.size, !this.isNative);
    }
  },
  watch: {
    /**
     * When value is changed back to undefined, value of native progress get reset to 0.
     * Need to add and remove the value attribute to have the indeterminate or not.
     */
    isIndeterminate: function isIndeterminate(indeterminate) {
      var _this = this;

      this.$nextTick(function () {
        if (_this.$refs.progress) {
          if (indeterminate) {
            _this.$refs.progress.removeAttribute('value');
          } else {
            _this.$refs.progress.setAttribute('value', _this.value);
          }
        }
      });
    }
  },
  methods: {
    calculateValue: function calculateValue(value) {
      if (value === undefined || value === null || isNaN(value)) {
        return undefined;
      }

      var minimumFractionDigits = this.keepTrailingZeroes ? this.precision : 0;
      var maximumFractionDigits = this.precision;

      if (this.format === 'percent') {
        return new Intl.NumberFormat(this.locale, {
          style: 'percent',
          minimumFractionDigits: minimumFractionDigits,
          maximumFractionDigits: maximumFractionDigits
        }).format(value / this.max);
      }

      return new Intl.NumberFormat(this.locale, {
        minimumFractionDigits: minimumFractionDigits,
        maximumFractionDigits: maximumFractionDigits
      }).format(value);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"progress-wrapper",class:_vm.wrapperClasses},[(_vm.isNative)?_c('progress',{ref:"progress",staticClass:"progress",class:_vm.newType,attrs:{"max":_vm.max},domProps:{"value":_vm.value}},[_vm._v(_vm._s(_vm.newValue))]):_vm._t("bar"),(_vm.isNative && _vm.showValue)?_c('p',{staticClass:"progress-value"},[_vm._t("default",[_vm._v(_vm._s(_vm.newValue))])],2):_vm._e()],2)};
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
  

  
  var Progress = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

//
var script$1 = {
  name: 'BProgressBar',
  mixins: [InjectedChildMixin('progress')],
  props: {
    type: {
      type: [String, Object],
      default: undefined
    },
    value: {
      type: Number,
      default: undefined
    },
    showValue: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    newType: function newType() {
      return [this.parent.size, this.type || this.parent.type];
    },
    newShowValue: function newShowValue() {
      return this.showValue || this.parent.showValue;
    },
    newValue: function newValue() {
      return this.parent.calculateValue(this.value);
    },
    barWidth: function barWidth() {
      return "".concat(this.value * 100 / this.parent.max, "%");
    }
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"progress-bar",class:_vm.newType,style:({width: _vm.barWidth}),attrs:{"role":"progressbar","aria-valuenow":_vm.value,"aria-valuemax":_vm.parent.max,"aria-valuemin":"0"}},[(_vm.newShowValue)?_c('p',{staticClass:"progress-value"},[_vm._t("default",[_vm._v(_vm._s(_vm.newValue))])],2):_vm._e()])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var ProgressBar = __vue_normalize__(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Progress);
    registerComponent(Vue, ProgressBar);
  }
};
use(Plugin);

export default Plugin;
export { Progress as BProgress, ProgressBar as BProgressBar };
