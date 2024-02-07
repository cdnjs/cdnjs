import BaseComponent from 'primevue/basecomponent';
import InputIconStyle from 'primevue/inputicon/style';
import { renderSlot } from 'vue';

var script$1 = {
  name: 'BaseInputIcon',
  "extends": BaseComponent,
  style: InputIconStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'InputIcon',
  "extends": script$1
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}

script.render = render;

export { script as default };
