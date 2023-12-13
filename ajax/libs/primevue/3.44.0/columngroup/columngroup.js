this.primevue = this.primevue || {};
this.primevue.columngroup = (function (BaseComponent, ColumnGroupStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var ColumnGroupStyle__default = /*#__PURE__*/_interopDefaultLegacy(ColumnGroupStyle);

    var script$1 = {
      name: 'BaseColumnGroup',
      "extends": BaseComponent__default["default"],
      props: {
        type: {
          type: String,
          "default": null
        }
      },
      style: ColumnGroupStyle__default["default"],
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

    return script;

})(primevue.basecomponent, primevue.columngroup.style);
