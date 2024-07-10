'use strict';

var BadgeStyle = require('primevue/badge/style');
var BaseComponent = require('primevue/basecomponent');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BadgeStyle__default = /*#__PURE__*/_interopDefaultLegacy(BadgeStyle);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var script$1 = {
  name: 'BaseBadge',
  "extends": BaseComponent__default["default"],
  props: {
    value: {
      type: [String, Number],
      "default": null
    },
    severity: {
      type: String,
      "default": null
    },
    size: {
      type: String,
      "default": null
    }
  },
  style: BadgeStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Badge',
  "extends": script$1,
  inheritAttrs: false
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [vue.renderSlot(_ctx.$slots, "default", {}, function () {
    return [vue.createTextVNode(vue.toDisplayString(_ctx.value), 1)];
  })], 16);
}

script.render = render;

module.exports = script;
