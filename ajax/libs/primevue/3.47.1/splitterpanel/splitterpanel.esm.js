import BaseComponent from 'primevue/basecomponent';
import SplitterPanelStyle from 'primevue/splitterpanel/style';
import { openBlock, createElementBlock, mergeProps, renderSlot } from 'vue';

var script$1 = {
  name: 'BaseSplitterPanel',
  "extends": BaseComponent,
  props: {
    size: {
      type: Number,
      "default": null
    },
    minSize: {
      type: Number,
      "default": null
    }
  },
  style: SplitterPanelStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'SplitterPanel',
  "extends": script$1,
  computed: {
    isNested: function isNested() {
      return this.$slots["default"]().some(function (child) {
        return child.type.name === 'Splitter';
      });
    },
    getPTOptions: function getPTOptions() {
      return {
        context: {
          nested: this.isNested
        }
      };
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    ref: "container",
    "class": _ctx.cx('root')
  }, _ctx.ptm('root', $options.getPTOptions), {
    "data-pc-name": "splitterpanel"
  }), [renderSlot(_ctx.$slots, "default")], 16);
}

script.render = render;

export { script as default };
