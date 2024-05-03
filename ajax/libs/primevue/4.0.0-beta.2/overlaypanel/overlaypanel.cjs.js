'use strict';

var Popover = require('primevue/popover');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Popover__default = /*#__PURE__*/_interopDefaultLegacy(Popover);

var script = {
  name: 'OverlayPanel',
  "extends": Popover__default["default"],
  mounted: function mounted() {
    console.warn('Deprecated since v4. Use Popover component instead.');
  }
};

module.exports = script;
