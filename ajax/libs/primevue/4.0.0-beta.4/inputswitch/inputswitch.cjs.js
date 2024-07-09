'use strict';

var ToggleSwitch = require('primevue/toggleswitch');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ToggleSwitch__default = /*#__PURE__*/_interopDefaultLegacy(ToggleSwitch);

var script = {
  name: 'InputSwitch',
  "extends": ToggleSwitch__default["default"],
  mounted: function mounted() {
    console.warn('Deprecated since v4. Use ToggleSwitch component instead.');
  }
};

module.exports = script;
