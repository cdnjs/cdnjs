import BaseComponent from 'primevue/basecomponent';
import IconFieldStyle from 'primevue/iconfield/style';
import { openBlock, createElementBlock, mergeProps, renderSlot } from 'vue';

var script$1 = {
  name: 'BaseIconField',
  "extends": BaseComponent,
  props: {
    iconPosition: {
      type: String,
      "default": 'right'
    }
  },
  style: IconFieldStyle,
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
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [renderSlot(_ctx.$slots, "default")], 16);
}

script.render = render;

export { script as default };
