import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import { openBlock, createElementBlock, mergeProps, createElementVNode } from 'vue';

var styles = "\n.p-progress-spinner {\n    position: relative;\n    margin: 0 auto;\n    width: 100px;\n    height: 100px;\n    display: inline-block;\n}\n\n.p-progress-spinner::before {\n    content: '';\n    display: block;\n    padding-top: 100%;\n}\n\n.p-progress-spinner-svg {\n    height: 100%;\n    transform-origin: center center;\n    width: 100%;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    margin: auto;\n}\n";
var classes = {
  root: 'p-progress-spinner',
  spinner: 'p-progress-spinner-svg',
  circle: 'p-progress-spinner-circle'
};
var _useStyle = useStyle(styles, {
    name: 'progressspinner',
    manual: true
  }),
  loadStyle = _useStyle.load;
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
  css: {
    classes: classes,
    loadStyle: loadStyle
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'ProgressSpinner',
  "extends": script$1,
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
  }, _ctx.ptm('root'), {
    "data-pc-name": "progressspinner"
  }), [(openBlock(), createElementBlock("svg", mergeProps({
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
