'use strict';

var BaseComponent = require('primevue/basecomponent');
var SplitterPanelStyle = require('primevue/splitterpanel/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var SplitterPanelStyle__default = /*#__PURE__*/_interopDefaultLegacy(SplitterPanelStyle);

var script$1 = {
  name: 'BaseSplitterPanel',
  "extends": BaseComponent__default["default"],
  props: {
    size: {
      type: Number,
      "default": null
    },
    minSize: {
      type: Number,
      "default": null
    }
  },
  style: SplitterPanelStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'SplitterPanel',
  "extends": script$1,
  computed: {
    isNested: function isNested() {
      return this.$slots["default"]().some(function (child) {
        return child.type.name === 'Splitter';
      });
    },
    getPTOptions: function getPTOptions() {
      return {
        context: {
          nested: this.isNested
        }
      };
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    ref: "container",
    "class": _ctx.cx('root')
  }, _ctx.ptm('root', $options.getPTOptions), {
    "data-pc-name": "splitterpanel"
  }), [vue.renderSlot(_ctx.$slots, "default")], 16);
}

script.render = render;

module.exports = script;
