import BaseComponent from 'primevue/basecomponent';
import SkeletonStyle from 'primevue/skeleton/style';
import { openBlock, createElementBlock, mergeProps } from 'vue';

var script$1 = {
  name: 'BaseSkeleton',
  "extends": BaseComponent,
  props: {
    shape: {
      type: String,
      "default": 'rectangle'
    },
    size: {
      type: String,
      "default": null
    },
    width: {
      type: String,
      "default": '100%'
    },
    height: {
      type: String,
      "default": '1rem'
    },
    borderRadius: {
      type: String,
      "default": null
    },
    animation: {
      type: String,
      "default": 'wave'
    }
  },
  style: SkeletonStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Skeleton',
  "extends": script$1,
  inheritAttrs: false,
  computed: {
    containerStyle: function containerStyle() {
      if (this.size) return {
        width: this.size,
        height: this.size,
        borderRadius: this.borderRadius
      };else return {
        width: this.width,
        height: this.height,
        borderRadius: this.borderRadius
      };
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root'),
    style: [_ctx.sx('root'), $options.containerStyle],
    "aria-hidden": "true"
  }, _ctx.ptmi('root')), null, 16);
}

script.render = render;

export { script as default };
