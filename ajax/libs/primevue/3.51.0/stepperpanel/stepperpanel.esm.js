import BaseComponent from 'primevue/basecomponent';
import StepperPanelStyle from 'primevue/stepperpanel/style';
import { renderSlot } from 'vue';

var script$1 = {
  name: 'BaseStepperPanel',
  "extends": BaseComponent,
  props: {
    header: null
  },
  style: StepperPanelStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'StepperPanel',
  "extends": script$1
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}

script.render = render;

export { script as default };
