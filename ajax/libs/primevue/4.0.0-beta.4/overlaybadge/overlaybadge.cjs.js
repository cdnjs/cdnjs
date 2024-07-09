'use strict';

var Badge = require('primevue/badge');
var OverlayBadgeStyle = require('primevue/overlaybadge/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Badge__default = /*#__PURE__*/_interopDefaultLegacy(Badge);
var OverlayBadgeStyle__default = /*#__PURE__*/_interopDefaultLegacy(OverlayBadgeStyle);

var script$1 = {
  name: 'OverlayBadge',
  "extends": Badge__default["default"],
  style: OverlayBadgeStyle__default["default"],
  provide: function provide() {
    return {
      $pcOverlayBadge: this,
      $parentInstance: this
    };
  }
};

var script = {
  name: 'OverlayBadge',
  "extends": script$1,
  inheritAttrs: false
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Badge = vue.resolveComponent("Badge");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [vue.renderSlot(_ctx.$slots, "default"), vue.createVNode(_component_Badge, vue.mergeProps(_ctx.$props, {
    pt: _ctx.ptm('pcBadge')
  }), null, 16, ["pt"])], 16);
}

script.render = render;

module.exports = script;
