'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('./config-8cfb5a4a.js');
var NoticeMixin = require('./NoticeMixin-01121bd2.js');
var plugins = require('./plugins-7f41b028.js');
var helpers = require('./helpers.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');

//
var script = {
  name: 'BSnackbar',
  mixins: [NoticeMixin.NoticeMixin],
  props: {
    actionText: {
      type: String,
      default: 'OK'
    },
    onAction: {
      type: Function,
      default: function _default() {}
    },
    cancelText: {
      type: String | null,
      default: null
    }
  },
  data: function data() {
    return {
      newDuration: this.duration || config.config.defaultSnackbarDuration
    };
  },
  methods: {
    /**
    * Click listener.
    * Call action prop before closing (from Mixin).
    */
    action: function action() {
      this.onAction();
      this.close();
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"enter-active-class":_vm.transition.enter,"leave-active-class":_vm.transition.leave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"snackbar",class:[_vm.type,_vm.position],attrs:{"role":_vm.actionText ? 'alertdialog' : 'alert'},on:{"mouseenter":_vm.pause,"mouseleave":_vm.removePause}},[(_vm.$slots.default)?[_vm._t("default")]:[_c('div',{staticClass:"text",domProps:{"innerHTML":_vm._s(_vm.message)}})],(_vm.cancelText)?_c('div',{staticClass:"action is-light is-cancel",on:{"click":_vm.close}},[_c('button',{staticClass:"button"},[_vm._v(_vm._s(_vm.cancelText))])]):_vm._e(),(_vm.actionText)?_c('div',{staticClass:"action",class:_vm.type,on:{"click":_vm.action}},[_c('button',{staticClass:"button"},[_vm._v(_vm._s(_vm.actionText))])]):_vm._e()],2)])};
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

  var Snackbar = __vue_component__;

var localVueInstance;
var SnackbarProgrammatic = {
  open: function open(params) {
    var parent;
    if (typeof params === 'string') {
      params = {
        message: params
      };
    }
    var defaultParam = {
      type: 'is-success',
      position: config.config.defaultSnackbarPosition || 'is-bottom-right',
      queue: true
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
    var SnackbarComponent = vm.extend(Snackbar);
    var component = new SnackbarComponent({
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
    plugins.registerComponentProgrammatic(Vue, 'snackbar', SnackbarProgrammatic);
  }
};
plugins.use(Plugin);

exports.BSnackbar = Snackbar;
exports.SnackbarProgrammatic = SnackbarProgrammatic;
exports["default"] = Plugin;
