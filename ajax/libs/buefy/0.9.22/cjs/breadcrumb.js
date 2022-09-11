'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_2 = require('./chunk-437dd7a0.js');
var __chunk_5 = require('./chunk-13e039f5.js');

//
var script = {
  name: 'BBreadcrumb',
  props: {
    align: {
      type: String,
      default: function _default() {
        return __chunk_2.config.defaultBreadcrumbAlign;
      }
    },
    separator: {
      type: String,
      default: function _default() {
        return __chunk_2.config.defaultBreadcrumbSeparator;
      }
    },
    size: {
      type: String,
      default: function _default() {
        return __chunk_2.config.defaultBreadcrumbSize;
      }
    }
  },
  computed: {
    breadcrumbClasses: function breadcrumbClasses() {
      return ['breadcrumb', this.align, this.separator, this.size];
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{class:_vm.breadcrumbClasses},[_c('ul',[_vm._t("default")],2)])};
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
  

  
  var Breadcrumb = __chunk_5.__vue_normalize__(
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
  name: 'BBreadcrumbItem',
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: function _default() {
        return __chunk_2.config.defaultBreadcrumbTag;
      }
    },
    active: Boolean
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:{ 'is-active': _vm.active }},[_c(_vm.tag,_vm._g(_vm._b({tag:"component"},'component',_vm.$attrs,false),_vm.$listeners),[_vm._t("default")],2)],1)};
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
  

  
  var BreadcrumbItem = __chunk_5.__vue_normalize__(
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
    __chunk_5.registerComponent(Vue, Breadcrumb);
    __chunk_5.registerComponent(Vue, BreadcrumbItem);
  }
};
__chunk_5.use(Plugin);

exports.BBreadcrumb = Breadcrumb;
exports.BBreadcrumbItem = BreadcrumbItem;
exports.default = Plugin;
