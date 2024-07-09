'use strict';

var InputChips = require('primevue/inputchips');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var InputChips__default = /*#__PURE__*/_interopDefaultLegacy(InputChips);

var script = {
  name: 'Chips',
  "extends": InputChips__default["default"],
  mounted: function mounted() {
    console.warn('Deprecated since v4. Use InputChips component instead.');
  }
};

module.exports = script;
