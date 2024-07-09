import BaseComponent from 'primevue/basecomponent';
import TabPanelsStyle from 'primevue/tabpanels/style';
import { openBlock, createElementBlock, mergeProps, renderSlot } from 'vue';

var script$1 = {
  name: 'BaseTabPanels',
  "extends": BaseComponent,
  props: {},
  style: TabPanelsStyle,
  provide: function provide() {
    return {
      $pcTabPanels: this,
      $parentInstance: this
    };
  }
};

var script = {
  name: 'TabPanels',
  "extends": script$1,
  inheritAttrs: false
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root'),
    role: "presentation"
  }, _ctx.ptmi('root')), [renderSlot(_ctx.$slots, "default")], 16);
}

script.render = render;

export { script as default };
