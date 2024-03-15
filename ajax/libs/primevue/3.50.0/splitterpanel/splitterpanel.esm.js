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
  inheritAttrs: false,
  data: function data() {
    return {
      nestedState: null
    };
  },
  computed: {
    isNested: function isNested() {
      var _this = this;
      return this.$slots["default"]().some(function (child) {
        _this.nestedState = child.type.name === 'Splitter' ? true : null;
        return _this.nestedState;
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
  }, _ctx.ptmi('root', $options.getPTOptions)), [renderSlot(_ctx.$slots, "default")], 16);
}

script.render = render;

export { script as default };
