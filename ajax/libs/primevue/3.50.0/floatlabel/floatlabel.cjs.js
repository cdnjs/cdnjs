'use strict';

var BaseComponent = require('primevue/basecomponent');
var FloatLabelStyle = require('primevue/floatlabel/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var FloatLabelStyle__default = /*#__PURE__*/_interopDefaultLegacy(FloatLabelStyle);

var script$1 = {
  name: 'BaseFloatLabel',
  "extends": BaseComponent__default["default"],
  props: {},
  style: FloatLabelStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'FloatLabel',
  "extends": script$1,
  inheritAttrs: false
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [vue.renderSlot(_ctx.$slots, "default")], 16);
}

script.render = render;

module.exports = script;
