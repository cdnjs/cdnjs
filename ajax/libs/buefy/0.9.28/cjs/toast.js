'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('./config-8cfb5a4a.js');
var NoticeMixin = require('./NoticeMixin-01121bd2.js');
var plugins = require('./plugins-7f41b028.js');
var helpers = require('./helpers.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');

//
var script = {
  name: 'BToast',
  mixins: [NoticeMixin.NoticeMixin],
  data: function data() {
    return {
      newDuration: this.duration || config.config.defaultToastDuration
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
  

  
  const __vue_component__ = /*#__PURE__*/plugins.normalizeComponent(
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
      position: config.config.defaultToastPosition || 'is-top'
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
    var propsData = helpers.merge(defaultParam, params);
    var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || config.VueInstance;
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
    plugins.registerComponentProgrammatic(Vue, 'toast', ToastProgrammatic);
  }
};
plugins.use(Plugin);

exports.BToast = Toast;
exports.ToastProgrammatic = ToastProgrammatic;
exports["default"] = Plugin;
