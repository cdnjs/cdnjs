import BaseComponent from 'primevue/basecomponent';
import { openBlock, createElementBlock, mergeProps, createElementVNode } from 'vue';

var script = {
    name: 'ProgressSpinner',
    extends: BaseComponent,
    props: {
        strokeWidth: {
            type: String,
            default: '2'
        },
        fill: {
            type: String,
            default: 'none'
        },
        animationDuration: {
            type: String,
            default: '2s'
        }
    },
    computed: {
        svgStyle() {
            return {
                'animation-duration': this.animationDuration
            };
        }
    }
};

const _hoisted_1 = ["fill", "stroke-width"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", mergeProps({
    class: "p-progress-spinner",
    role: "progressbar"
  }, _ctx.ptm('root')), [
    (openBlock(), createElementBlock("svg", mergeProps({
      class: "p-progress-spinner-svg",
      viewBox: "25 25 50 50",
      style: $options.svgStyle
    }, _ctx.ptm('spinner')), [
      createElementVNode("circle", mergeProps({
        class: "p-progress-spinner-circle",
        cx: "50",
        cy: "50",
        r: "20",
        fill: $props.fill,
        "stroke-width": $props.strokeWidth,
        strokeMiterlimit: "10"
      }, _ctx.ptm('circle')), null, 16, _hoisted_1)
    ], 16))
  ], 16))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.p-progress-spinner {\n    position: relative;\n    margin: 0 auto;\n    width: 100px;\n    height: 100px;\n    display: inline-block;\n}\n.p-progress-spinner::before {\n    content: '';\n    display: block;\n    padding-top: 100%;\n}\n.p-progress-spinner-svg {\n    height: 100%;\n    transform-origin: center center;\n    width: 100%;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    margin: auto;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
