'use strict';

var BaseComponent = require('primevue/basecomponent');
var usestyle = require('primevue/usestyle');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var styles = "\n.p-toolbar {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex-wrap: wrap;\n}\n\n.p-toolbar-group-start,\n.p-toolbar-group-center,\n.p-toolbar-group-end {\n    display: flex;\n    align-items: center;\n}\n\n.p-toolbar-group-left,\n.p-toolbar-group-right {\n    display: flex;\n    align-items: center;\n}\n";
var classes = {
  root: 'p-toolbar p-component',
  start: 'p-toolbar-group-start p-toolbar-group-left',
  center: 'p-toolbar-group-center',
  end: 'p-toolbar-group-end p-toolbar-group-right'
};
var _useStyle = usestyle.useStyle(styles, {
    name: 'toolbar',
    manual: true
  }),
  loadStyle = _useStyle.load;
  _useStyle.unload;
var script$1 = {
  name: 'BaseToolbar',
  "extends": BaseComponent__default["default"],
  props: {
    'aria-labelledby': {
      type: String,
      "default": null
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
  name: 'Toolbar',
  "extends": script$1
};

var _hoisted_1 = ["aria-labelledby"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root'),
    role: "toolbar",
    "aria-labelledby": _ctx.ariaLabelledby
  }, _ctx.ptm('root'), {
    "data-pc-name": "toolbar"
  }), [vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('start'),
    "data-pc-section": "start"
  }, _ctx.ptm('start')), [vue.renderSlot(_ctx.$slots, "start")], 16), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('center'),
    "data-pc-section": "center"
  }, _ctx.ptm('center')), [vue.renderSlot(_ctx.$slots, "center")], 16), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('end'),
    "data-pc-section": "end"
  }, _ctx.ptm('end')), [vue.renderSlot(_ctx.$slots, "end")], 16)], 16, _hoisted_1);
}

script.render = render;

module.exports = script;
