import BaseComponent from 'primevue/basecomponent';
import StepStyle from 'primevue/step/style';
import { renderSlot } from 'vue';

var script$1 = {
  name: 'BaseStep',
  "extends": BaseComponent,
  props: {
    header: null,
    headerStyle: null,
    headerClass: null,
    contentStyle: null,
    contentClass: null,
    disabled: Boolean
  },
  style: StepStyle
};

var script = {
  name: 'Step',
  "extends": script$1
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}

script.render = render;

export { script as default };
