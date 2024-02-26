import BaseComponent from 'primevue/basecomponent';
import ToolbarStyle from 'primevue/toolbar/style';
import { openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot } from 'vue';

var script$1 = {
  name: 'BaseToolbar',
  "extends": BaseComponent,
  props: {
    ariaLabelledby: {
      type: String,
      "default": null
    }
  },
  style: ToolbarStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Toolbar',
  "extends": script$1,
  inheritAttrs: false
};

var _hoisted_1 = ["aria-labelledby"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root'),
    role: "toolbar",
    "aria-labelledby": _ctx.ariaLabelledby
  }, _ctx.ptmi('root')), [createElementVNode("div", mergeProps({
    "class": _ctx.cx('start')
  }, _ctx.ptm('start')), [renderSlot(_ctx.$slots, "start")], 16), createElementVNode("div", mergeProps({
    "class": _ctx.cx('center')
  }, _ctx.ptm('center')), [renderSlot(_ctx.$slots, "center")], 16), createElementVNode("div", mergeProps({
    "class": _ctx.cx('end')
  }, _ctx.ptm('end')), [renderSlot(_ctx.$slots, "end")], 16)], 16, _hoisted_1);
}

script.render = render;

export { script as default };
