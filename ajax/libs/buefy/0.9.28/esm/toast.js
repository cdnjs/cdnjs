import { c as config, V as VueInstance } from './config-e7d4b9c2.js';
import { N as NoticeMixin } from './NoticeMixin-bd6f61d9.js';
import { n as normalizeComponent, u as use, r as registerComponentProgrammatic } from './plugins-218aea86.js';
import { merge } from './helpers.js';
import './_rollupPluginBabelHelpers-df313029.js';

//
var script = {
  name: 'BToast',
  mixins: [NoticeMixin],
  data: function data() {
    return {
      newDuration: this.duration || config.defaultToastDuration
    };
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"enter-active-class":_vm.transition.enter,"leave-active-class":_vm.transition.leave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"toast",class:[_vm.type, _vm.position],attrs:{"aria-hidden":!_vm.isActive,"role":"alert"},on:{"mouseenter":_vm.pause,"mouseleave":_vm.removePause}},[(_vm.$slots.default)?[_vm._t("default")]:[_c('div',{domProps:{"innerHTML":_vm._s(_vm.message)}})]],2)])};
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
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
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

  var Toast = __vue_component__;

var localVueInstance;
var ToastProgrammatic = {
  open: function open(params) {
    var parent;
    if (typeof params === 'string') {
      params = {
        message: params
      };
    }
    var defaultParam = {
      position: config.defaultToastPosition || 'is-top'
    };
    if (params.parent) {
      parent = params.parent;
      delete params.parent;
    }
    var slot;
    if (Array.isArray(params.message)) {
      slot = params.message;
      delete params.message;
    }
    var propsData = merge(defaultParam, params);
    var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance;
    var ToastComponent = vm.extend(Toast);
    var component = new ToastComponent({
      parent: parent,
      el: document.createElement('div'),
      propsData: propsData
    });
    if (slot) {
      component.$slots.default = slot;
      component.$forceUpdate();
    }
    return component;
  }
};
var Plugin = {
  install: function install(Vue) {
    localVueInstance = Vue;
    registerComponentProgrammatic(Vue, 'toast', ToastProgrammatic);
  }
};
use(Plugin);

export { Toast as BToast, ToastProgrammatic, Plugin as default };
