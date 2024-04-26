import BaseComponent from 'primevue/basecomponent';
import DividerStyle from 'primevue/divider/style';
import { openBlock, createElementBlock, mergeProps, renderSlot, createCommentVNode } from 'vue';

var script$1 = {
  name: 'BaseDivider',
  "extends": BaseComponent,
  props: {
    align: {
      type: String,
      "default": null
    },
    layout: {
      type: String,
      "default": 'horizontal'
    },
    type: {
      type: String,
      "default": 'solid'
    }
  },
  style: DividerStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Divider',
  "extends": script$1,
  inheritAttrs: false
};

var _hoisted_1 = ["aria-orientation"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root'),
    style: _ctx.sx('root'),
    role: "separator",
    "aria-orientation": _ctx.layout
  }, _ctx.ptmi('root')), [_ctx.$slots["default"] ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('content')
  }, _ctx.ptm('content')), [renderSlot(_ctx.$slots, "default")], 16)) : createCommentVNode("", true)], 16, _hoisted_1);
}

script.render = render;

export { script as default };
