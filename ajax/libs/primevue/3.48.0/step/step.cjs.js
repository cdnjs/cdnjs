'use strict';

var BaseComponent = require('primevue/basecomponent');
var StepStyle = require('primevue/step/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var StepStyle__default = /*#__PURE__*/_interopDefaultLegacy(StepStyle);

var script$1 = {
  name: 'BaseStep',
  "extends": BaseComponent__default["default"],
  props: {
    header: null,
    headerStyle: null,
    headerClass: null,
    contentStyle: null,
    contentClass: null,
    disabled: Boolean
  },
  style: StepStyle__default["default"]
};

var script = {
  name: 'Step',
  "extends": script$1
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.renderSlot(_ctx.$slots, "default");
}

script.render = render;

module.exports = script;
