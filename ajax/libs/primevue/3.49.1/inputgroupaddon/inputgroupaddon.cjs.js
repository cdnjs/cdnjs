'use strict';

var BaseComponent = require('primevue/basecomponent');
var InputGroupAddonStyle = require('primevue/inputgroupaddon/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var InputGroupAddonStyle__default = /*#__PURE__*/_interopDefaultLegacy(InputGroupAddonStyle);

var script$1 = {
  name: 'BaseInputGroupAddon',
  "extends": BaseComponent__default["default"],
  style: InputGroupAddonStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'InputGroupAddon',
  "extends": script$1,
  inheritAttrs: false
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [vue.renderSlot(_ctx.$slots, "default")], 16);
}

script.render = render;

module.exports = script;
