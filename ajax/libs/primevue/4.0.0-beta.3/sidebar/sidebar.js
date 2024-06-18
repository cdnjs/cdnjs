this.primevue = this.primevue || {};
this.primevue.sidebar = (function (Drawer) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Drawer__default = /*#__PURE__*/_interopDefaultLegacy(Drawer);

    var script = {
      name: 'Sidebar',
      "extends": Drawer__default["default"],
      mounted: function mounted() {
        console.warn('Deprecated since v4. Use Drawer component instead.');
      }
    };

    return script;

})(primevue.drawer);
