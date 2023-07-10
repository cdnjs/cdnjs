'use strict';

var BaseComponent = require('primevue/basecomponent');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var script$1 = {
  name: 'BaseColumnGroup',
  "extends": BaseComponent__default["default"],
  props: {
    type: {
      type: String,
      "default": null
    }
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'ColumnGroup',
  "extends": script$1,
  render: function render() {
    return null;
  }
};

module.exports = script;
