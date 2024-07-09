'use strict';

var BaseComponent = require('primevue/basecomponent');
var TabPanelsStyle = require('primevue/tabpanels/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var TabPanelsStyle__default = /*#__PURE__*/_interopDefaultLegacy(TabPanelsStyle);

var script$1 = {
  name: 'BaseTabPanels',
  "extends": BaseComponent__default["default"],
  props: {},
  style: TabPanelsStyle__default["default"],
  provide: function provide() {
    return {
      $pcTabPanels: this,
      $parentInstance: this
    };
  }
};

var script = {
  name: 'TabPanels',
  "extends": script$1,
  inheritAttrs: false
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root'),
    role: "presentation"
  }, _ctx.ptmi('root')), [vue.renderSlot(_ctx.$slots, "default")], 16);
}

script.render = render;

module.exports = script;
