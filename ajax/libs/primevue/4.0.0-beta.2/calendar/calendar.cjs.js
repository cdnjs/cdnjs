'use strict';

var DatePicker = require('primevue/datepicker');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var DatePicker__default = /*#__PURE__*/_interopDefaultLegacy(DatePicker);

var script = {
  name: 'Calendar',
  "extends": DatePicker__default["default"],
  mounted: function mounted() {
    console.warn('Deprecated since v4. Use DatePicker component instead.');
  }
};

module.exports = script;
