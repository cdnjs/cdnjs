'use strict';

var BaseComponent = require('primevue/basecomponent');
var StepperPanelStyle = require('primevue/stepperpanel/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var StepperPanelStyle__default = /*#__PURE__*/_interopDefaultLegacy(StepperPanelStyle);

var script$1 = {
  name: 'BaseStepperPanel',
  "extends": BaseComponent__default["default"],
  props: {
    header: null
  },
  style: StepperPanelStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'StepperPanel',
  "extends": script$1
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.renderSlot(_ctx.$slots, "default");
}

script.render = render;

module.exports = script;
