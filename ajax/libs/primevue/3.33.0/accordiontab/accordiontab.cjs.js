'use strict';

var BaseComponent = require('primevue/basecomponent');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var script$1 = {
  name: 'BaseAccordionTab',
  "extends": BaseComponent__default["default"],
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
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'AccordionTab',
  "extends": script$1
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.renderSlot(_ctx.$slots, "default");
}

script.render = render;

module.exports = script;
