'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-8b2e54ad.js');
var config = require('./config-8cfb5a4a.js');
var TabbedChildMixin = require('./TabbedChildMixin-907cad32.js');
var plugins = require('./plugins-7f41b028.js');
require('./Icon-78961800.js');
require('./helpers.js');
require('./SlotComponent-4fb48389.js');
require('./InjectedChildMixin-d6bf7f91.js');

var script$1 = {
  name: 'BTabs',
  mixins: [TabbedChildMixin.TabbedMixin('tab')],
  props: {
    expanded: {
      type: Boolean,
      default: function _default() {
        return config.config.defaultTabsExpanded;
      }
    },
    type: {
      type: [String, Object],
      default: function _default() {
        return config.config.defaultTabsType;
      }
    },
    animated: {
      type: Boolean,
      default: function _default() {
        return config.config.defaultTabsAnimated;
      }
    },
    multiline: Boolean
  },
  data: function data() {
    return {
      currentFocus: this.value
    };
  },
  computed: {
    mainClasses: function mainClasses() {
      return _rollupPluginBabelHelpers._defineProperty({
        'is-fullwidth': this.expanded,
        'is-vertical': this.vertical,
        'is-multiline': this.multiline
      }, this.position, this.position && this.vertical);
    },
    navClasses: function navClasses() {
      return [this.type, this.size, _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._defineProperty({}, this.position, this.position && !this.vertical), 'is-fullwidth', this.expanded), 'is-toggle', this.type === 'is-toggle-rounded')];
    }
  },
  methods: {
    giveFocusToTab: function giveFocusToTab(tab) {
      if (tab.$el && tab.$el.focus) {
        tab.$el.focus();
      } else if (tab.focus) {
        tab.focus();
      }
    },
    manageTablistKeydown: function manageTablistKeydown(event) {
      // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
      var key = event.key;
      switch (key) {
        case this.vertical ? 'ArrowUp' : 'ArrowLeft':
        case this.vertical ? 'Up' : 'Left':
          {
            var prevIdx = this.getPrevItemIdx(this.currentFocus, true);
            if (prevIdx === null) {
              // We try to give focus back to the last visible element
              prevIdx = this.getPrevItemIdx(this.items.length, true);
            }
            if (prevIdx !== null && this.$refs.tabLink && prevIdx < this.$refs.tabLink.length && !this.items[prevIdx].disabled) {
              this.giveFocusToTab(this.$refs.tabLink[prevIdx]);
            }
            event.preventDefault();
            break;
          }
        case this.vertical ? 'ArrowDown' : 'ArrowRight':
        case this.vertical ? 'Down' : 'Right':
          {
            var nextIdx = this.getNextItemIdx(this.currentFocus, true);
            if (nextIdx === null) {
              // We try to give focus back to the first visible element
              nextIdx = this.getNextItemIdx(-1, true);
            }
            if (nextIdx !== null && this.$refs.tabLink && nextIdx < this.$refs.tabLink.length && !this.items[nextIdx].disabled) {
              this.giveFocusToTab(this.$refs.tabLink[nextIdx]);
            }
            event.preventDefault();
            break;
          }
      }
    },
    manageTabKeydown: function manageTabKeydown(event, childItem) {
      // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
      var key = event.key;
      switch (key) {
        case ' ':
        case 'Space':
        case 'Spacebar':
        case 'Enter':
          {
            this.childClick(childItem);
            event.preventDefault();
            break;
          }
      }
    }
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-tabs",class:_vm.mainClasses},[_c('nav',{staticClass:"tabs",class:_vm.navClasses,on:{"keydown":_vm.manageTablistKeydown}},[_vm._t("start"),_c('ul',{attrs:{"aria-orientation":_vm.vertical ? 'vertical' : 'horizontal',"role":"tablist"}},_vm._l((_vm.items),function(childItem,childIdx){return _c('li',{directives:[{name:"show",rawName:"v-show",value:(childItem.visible),expression:"childItem.visible"}],key:childItem.value,class:[ childItem.headerClass, { 'is-active': childItem.isActive,
                                                   'is-disabled': childItem.disabled }],attrs:{"role":"tab","aria-controls":((childItem.value) + "-content"),"aria-selected":("" + (childItem.isActive))}},[(childItem.$scopedSlots.header)?_c('b-slot-component',{ref:"tabLink",refInFor:true,attrs:{"component":childItem,"name":"header","tag":"a","id":((childItem.value) + "-label"),"tabindex":childItem.isActive ? 0 : -1},on:{"keydown":function($event){return _vm.manageTabKeydown($event, childItem)}},nativeOn:{"focus":function($event){_vm.currentFocus = childIdx;},"click":function($event){return _vm.childClick(childItem)}}}):_c('a',{ref:"tabLink",refInFor:true,attrs:{"id":((childItem.value) + "-label"),"tabindex":childItem.isActive ? 0 : -1},on:{"focus":function($event){_vm.currentFocus = childIdx;},"click":function($event){return _vm.childClick(childItem)},"keydown":function($event){return _vm.manageTabKeydown($event, childItem)}}},[(childItem.icon)?_c('b-icon',{attrs:{"icon":childItem.icon,"pack":childItem.iconPack,"size":_vm.size}}):_vm._e(),_c('span',[_vm._v(_vm._s(childItem.label))])],1)],1)}),0),_vm._t("end")],2),_c('section',{staticClass:"tab-content",class:{'is-transitioning': _vm.isTransitioning}},[_vm._t("default")],2)])};
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

  var Tabs = __vue_component__$1;

var script = {
  name: 'BTabItem',
  mixins: [TabbedChildMixin.TabbedChildMixin('tab')],
  props: {
    disabled: Boolean
  },
  data: function data() {
    return {
      elementClass: 'tab-item',
      elementRole: 'tabpanel'
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

  var TabItem = __vue_component__;

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Tabs);
    plugins.registerComponent(Vue, TabItem);
  }
};
plugins.use(Plugin);

exports.BTabItem = TabItem;
exports.BTabs = Tabs;
exports["default"] = Plugin;
