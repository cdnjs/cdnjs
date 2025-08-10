'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Tag = require('./Tag-BprnwJJ1.js');
var vue = require('vue');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('./Icon-lsDKE2wQ.js');
require('./config-DR826Ki2.js');
require('./helpers.js');

var _sfc_main = vue.defineComponent({
  name: "BTaglist",
  props: {
    attached: Boolean
  }
});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(["tags", { "has-addons": _ctx.attached }])
    },
    [
      vue.renderSlot(_ctx.$slots, "default")
    ],
    2
    /* CLASS */
  );
}
var Taglist = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Tag.BTag);
    plugins.registerComponent(Vue, Taglist);
  }
};

exports.BTag = Tag.BTag;
exports.BTaglist = Taglist;
exports.default = Plugin;
