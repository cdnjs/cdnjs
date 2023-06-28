import BaseComponent from 'primevue/basecomponent';
import { openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot } from 'vue';

var script = {
    name: 'Toolbar',
    extends: BaseComponent,
    props: {
        'aria-labelledby': {
            type: String,
            default: null
        }
    }
};

const _hoisted_1 = ["aria-labelledby"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", mergeProps({
    class: "p-toolbar p-component",
    role: "toolbar",
    "aria-labelledby": _ctx.ariaLabelledby
  }, _ctx.ptm('root')), [
    createElementVNode("div", mergeProps({ class: "p-toolbar-group-start p-toolbar-group-left" }, _ctx.ptm('start')), [
      renderSlot(_ctx.$slots, "start")
    ], 16),
    createElementVNode("div", mergeProps({ class: "p-toolbar-group-center" }, _ctx.ptm('center')), [
      renderSlot(_ctx.$slots, "center")
    ], 16),
    createElementVNode("div", mergeProps({ class: "p-toolbar-group-end p-toolbar-group-right" }, _ctx.ptm('end')), [
      renderSlot(_ctx.$slots, "end")
    ], 16)
  ], 16, _hoisted_1))
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

var css_248z = "\n.p-toolbar {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex-wrap: wrap;\n}\n.p-toolbar-group-start,\n.p-toolbar-group-center,\n.p-toolbar-group-end {\n    display: flex;\n    align-items: center;\n}\n.p-toolbar-group-left,\n.p-toolbar-group-right {\n    display: flex;\n    align-items: center;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
