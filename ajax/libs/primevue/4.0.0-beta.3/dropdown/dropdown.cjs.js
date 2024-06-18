'use strict';

var Select = require('primevue/select');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Select__default = /*#__PURE__*/_interopDefaultLegacy(Select);

var script = {
  name: 'Dropdown',
  "extends": Select__default["default"],
  mounted: function mounted() {
    console.warn('Deprecated since v4. Use Select component instead.');
  }
};

module.exports = script;
