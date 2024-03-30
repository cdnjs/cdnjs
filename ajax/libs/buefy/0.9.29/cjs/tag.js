'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Tag = require('./Tag-437f65fb.js');
var plugins = require('./plugins-7f41b028.js');

//
//
//
//
//
//

var script = {
  name: 'BTaglist',
  props: {
    attached: Boolean
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tags",class:{ 'has-addons': _vm.attached }},[_vm._t("default")],2)};
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

  var Taglist = __vue_component__;

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Tag.Tag);
    plugins.registerComponent(Vue, Taglist);
  }
};
plugins.use(Plugin);

exports.BTag = Tag.Tag;
exports.BTaglist = Taglist;
exports["default"] = Plugin;
