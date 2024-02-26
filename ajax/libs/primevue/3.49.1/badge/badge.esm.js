import BadgeStyle from 'primevue/badge/style';
import BaseComponent from 'primevue/basecomponent';
import { openBlock, createElementBlock, mergeProps, renderSlot, createTextVNode, toDisplayString } from 'vue';

var script$1 = {
  name: 'BaseBadge',
  "extends": BaseComponent,
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
  style: BadgeStyle,
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
  return openBlock(), createElementBlock("span", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [renderSlot(_ctx.$slots, "default", {}, function () {
    return [createTextVNode(toDisplayString(_ctx.value), 1)];
  })], 16);
}

script.render = render;

export { script as default };
