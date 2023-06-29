'use strict';

var BaseComponent = require('primevue/basecomponent');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var script = {
    name: 'Toolbar',
    extends: BaseComponent__default["default"],
    props: {
        'aria-labelledby': {
            type: String,
            default: null
        }
    }
};

const _hoisted_1 = ["aria-labelledby"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    class: "p-toolbar p-component",
    role: "toolbar",
    "aria-labelledby": _ctx.ariaLabelledby
  }, _ctx.ptm('root')), [
    vue.createElementVNode("div", vue.mergeProps({ class: "p-toolbar-group-start p-toolbar-group-left" }, _ctx.ptm('start')), [
      vue.renderSlot(_ctx.$slots, "start")
    ], 16),
    vue.createElementVNode("div", vue.mergeProps({ class: "p-toolbar-group-center" }, _ctx.ptm('center')), [
      vue.renderSlot(_ctx.$slots, "center")
    ], 16),
    vue.createElementVNode("div", vue.mergeProps({ class: "p-toolbar-group-end p-toolbar-group-right" }, _ctx.ptm('end')), [
      vue.renderSlot(_ctx.$slots, "end")
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

module.exports = script;
