import BaseComponent from 'primevue/basecomponent';
import FloatLabelStyle from 'primevue/floatlabel/style';
import { openBlock, createElementBlock, mergeProps, renderSlot } from 'vue';

var script$1 = {
  name: 'BaseFloatLabel',
  "extends": BaseComponent,
  props: {},
  style: FloatLabelStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'FloatLabel',
  "extends": script$1
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptm('root')), [renderSlot(_ctx.$slots, "default")], 16);
}

script.render = render;

export { script as default };
