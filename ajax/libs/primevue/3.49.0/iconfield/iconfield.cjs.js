'use strict';

var BaseComponent = require('primevue/basecomponent');
var IconFieldStyle = require('primevue/iconfield/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var IconFieldStyle__default = /*#__PURE__*/_interopDefaultLegacy(IconFieldStyle);

var script$1 = {
  name: 'BaseIconField',
  "extends": BaseComponent__default["default"],
  props: {
    iconPosition: {
      type: String,
      "default": 'right'
    }
  },
  style: IconFieldStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'IconField',
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
