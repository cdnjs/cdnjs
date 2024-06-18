import AccordionTabStyle from 'primevue/accordiontab/style';
import BaseComponent from 'primevue/basecomponent';
import { renderSlot } from 'vue';

var script$1 = {
  name: 'BaseAccordionTab',
  "extends": BaseComponent,
  props: {
    header: null,
    headerStyle: null,
    headerClass: null,
    headerProps: null,
    headerActionProps: null,
    contentStyle: null,
    contentClass: null,
    contentProps: null,
    disabled: Boolean
  },
  style: AccordionTabStyle,
  provide: function provide() {
    return {
      $pcAccordionTab: this,
      $parentInstance: this
    };
  }
};

var script = {
  name: 'AccordionTab',
  "extends": script$1,
  inheritAttrs: false,
  mounted: function mounted() {
    console.warn('Deprecated since v4. Use the new structure of Accordion instead.');
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}

script.render = render;

export { script as default };
