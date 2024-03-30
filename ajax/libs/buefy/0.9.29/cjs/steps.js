'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-8b2e54ad.js');
var Icon = require('./Icon-78961800.js');
var TabbedChildMixin = require('./TabbedChildMixin-907cad32.js');
var config = require('./config-8cfb5a4a.js');
var plugins = require('./plugins-7f41b028.js');
require('./helpers.js');
require('./SlotComponent-4fb48389.js');
require('./InjectedChildMixin-d6bf7f91.js');

var script$1 = {
  name: 'BSteps',
  components: _rollupPluginBabelHelpers._defineProperty({}, Icon.Icon.name, Icon.Icon),
  mixins: [TabbedChildMixin.TabbedMixin('step')],
  props: {
    type: [String, Object],
    iconPack: String,
    iconPrev: {
      type: String,
      default: function _default() {
        return config.config.defaultIconPrev;
      }
    },
    iconNext: {
      type: String,
      default: function _default() {
        return config.config.defaultIconNext;
      }
    },
    hasNavigation: {
      type: Boolean,
      default: true
    },
    labelPosition: {
      type: String,
      validator: function validator(value) {
        return ['bottom', 'right', 'left'].indexOf(value) > -1;
      },
      default: 'bottom'
    },
    rounded: {
      type: Boolean,
      default: true
    },
    mobileMode: {
      type: String,
      validator: function validator(value) {
        return ['minimalist', 'compact'].indexOf(value) > -1;
      },
      default: 'minimalist'
    },
    ariaNextLabel: String,
    ariaPreviousLabel: String
  },
  computed: {
    // Override mixin implementation to always have a value
    activeItem: function activeItem() {
      var _this = this;
      return this.childItems.filter(function (i) {
        return i.value === _this.activeId;
      })[0] || this.items[0];
    },
    wrapperClasses: function wrapperClasses() {
      return [this.size, _rollupPluginBabelHelpers._defineProperty({
        'is-vertical': this.vertical
      }, this.position, this.position && this.vertical)];
    },
    mainClasses: function mainClasses() {
      return [this.type, _rollupPluginBabelHelpers._defineProperty({
        'has-label-right': this.labelPosition === 'right',
        'has-label-left': this.labelPosition === 'left',
        'is-animated': this.animated,
        'is-rounded': this.rounded
      }, "mobile-".concat(this.mobileMode), this.mobileMode !== null)];
    },
    /**
     * Check if previous button is available.
     */
    hasPrev: function hasPrev() {
      return this.prevItemIdx !== null;
    },
    /**
     * Retrieves the next visible item index
     */
    nextItemIdx: function nextItemIdx() {
      var idx = this.activeItem ? this.items.indexOf(this.activeItem) : 0;
      return this.getNextItemIdx(idx);
    },
    /**
     * Retrieves the next visible item
     */
    nextItem: function nextItem() {
      var nextItem = null;
      if (this.nextItemIdx !== null) {
        nextItem = this.items[this.nextItemIdx];
      }
      return nextItem;
    },
    /**
    * Retrieves the next visible item index
    */
    prevItemIdx: function prevItemIdx() {
      if (!this.activeItem) {
        return null;
      }
      var idx = this.items.indexOf(this.activeItem);
      return this.getPrevItemIdx(idx);
    },
    /**
     * Retrieves the previous visible item
     */
    prevItem: function prevItem() {
      if (!this.activeItem) {
        return null;
      }
      var prevItem = null;
      if (this.prevItemIdx !== null) {
        prevItem = this.items[this.prevItemIdx];
      }
      return prevItem;
    },
    /**
     * Check if next button is available.
     */
    hasNext: function hasNext() {
      return this.nextItemIdx !== null;
    },
    navigationProps: function navigationProps() {
      return {
        previous: {
          disabled: !this.hasPrev,
          action: this.prev
        },
        next: {
          disabled: !this.hasNext,
          action: this.next
        }
      };
    }
  },
  methods: {
    /**
     * Return if the step should be clickable or not.
     */
    isItemClickable: function isItemClickable(stepItem) {
      if (stepItem.clickable === undefined) {
        return stepItem.index < this.activeItem.index;
      }
      return stepItem.clickable;
    },
    /**
     * Previous button click listener.
     */
    prev: function prev() {
      if (this.hasPrev) {
        this.activeId = this.prevItem.value;
      }
    },
    /**
     * Previous button click listener.
     */
    next: function next() {
      if (this.hasNext) {
        this.activeId = this.nextItem.value;
      }
    }
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-steps",class:_vm.wrapperClasses},[_c('nav',{staticClass:"steps",class:_vm.mainClasses},[_c('ul',{staticClass:"step-items"},_vm._l((_vm.items),function(childItem){return _c('li',{directives:[{name:"show",rawName:"v-show",value:(childItem.visible),expression:"childItem.visible"}],key:childItem.value,staticClass:"step-item",class:[childItem.type || _vm.type, childItem.headerClass, {
                    'is-active': childItem.isActive,
                    'is-previous': _vm.activeItem.index > childItem.index
            }]},[_c('a',{staticClass:"step-link",class:{'is-clickable': _vm.isItemClickable(childItem)},on:{"click":function($event){_vm.isItemClickable(childItem) && _vm.childClick(childItem);}}},[_c('div',{staticClass:"step-marker"},[(childItem.icon)?_c('b-icon',{attrs:{"icon":childItem.icon,"pack":childItem.iconPack,"size":_vm.size}}):(childItem.step)?_c('span',[_vm._v(_vm._s(childItem.step))]):_vm._e()],1),_c('div',{staticClass:"step-details"},[_c('span',{staticClass:"step-title"},[_vm._v(_vm._s(childItem.label))])])])])}),0)]),_c('section',{staticClass:"step-content",class:{'is-transitioning': _vm.isTransitioning}},[_vm._t("default")],2),_vm._t("navigation",[(_vm.hasNavigation)?_c('nav',{staticClass:"step-navigation"},[_c('a',{staticClass:"pagination-previous",attrs:{"role":"button","disabled":_vm.navigationProps.previous.disabled,"aria-label":_vm.ariaPreviousLabel},on:{"click":function($event){$event.preventDefault();return _vm.navigationProps.previous.action($event)}}},[_c('b-icon',{attrs:{"icon":_vm.iconPrev,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],1),_c('a',{staticClass:"pagination-next",attrs:{"role":"button","disabled":_vm.navigationProps.next.disabled,"aria-label":_vm.ariaNextLabel},on:{"click":function($event){$event.preventDefault();return _vm.navigationProps.next.action($event)}}},[_c('b-icon',{attrs:{"icon":_vm.iconNext,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],1)]):_vm._e()],{"previous":_vm.navigationProps.previous,"next":_vm.navigationProps.next})],2)};
var __vue_staticRenderFns__ = [];

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
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/plugins.normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

  var Steps = __vue_component__$1;

var script = {
  name: 'BStepItem',
  mixins: [TabbedChildMixin.TabbedChildMixin('step')],
  props: {
    step: [String, Number],
    type: [String, Object],
    clickable: {
      type: Boolean,
      default: undefined
    }
  },
  data: function data() {
    return {
      elementClass: 'step-item'
    };
  }
};

/* script */
const __vue_script__ = script;

/* template */

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/plugins.normalizeComponent(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

  var StepItem = __vue_component__;

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Steps);
    plugins.registerComponent(Vue, StepItem);
  }
};
plugins.use(Plugin);

exports.BStepItem = StepItem;
exports.BSteps = Steps;
exports["default"] = Plugin;
