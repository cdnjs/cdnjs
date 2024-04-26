import BaseComponent from 'primevue/basecomponent';
import ProgressSpinnerStyle from 'primevue/progressspinner/style';
import { openBlock, createElementBlock, mergeProps, createElementVNode } from 'vue';

var script$1 = {
  name: 'BaseProgressSpinner',
  "extends": BaseComponent,
  props: {
    strokeWidth: {
      type: String,
      "default": '2'
    },
    fill: {
      type: String,
      "default": 'none'
    },
    animationDuration: {
      type: String,
      "default": '2s'
    }
  },
  style: ProgressSpinnerStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'ProgressSpinner',
  "extends": script$1,
  inheritAttrs: false,
  computed: {
    svgStyle: function svgStyle() {
      return {
        'animation-duration': this.animationDuration
      };
    }
  }
};

var _hoisted_1 = ["fill", "stroke-width"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root'),
    role: "progressbar"
  }, _ctx.ptmi('root')), [(openBlock(), createElementBlock("svg", mergeProps({
    "class": _ctx.cx('spinner'),
    viewBox: "25 25 50 50",
    style: $options.svgStyle
  }, _ctx.ptm('spinner')), [createElementVNode("circle", mergeProps({
    "class": _ctx.cx('circle'),
    cx: "50",
    cy: "50",
    r: "20",
    fill: _ctx.fill,
    "stroke-width": _ctx.strokeWidth,
    strokeMiterlimit: "10"
  }, _ctx.ptm('circle')), null, 16, _hoisted_1)], 16))], 16);
}

script.render = render;

export { script as default };
