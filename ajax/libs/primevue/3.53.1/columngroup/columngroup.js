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
      inheritAttrs: false,
      inject: ['$columnGroups'],
      mounted: function mounted() {
        var _this$$columnGroups;
        (_this$$columnGroups = this.$columnGroups) === null || _this$$columnGroups === void 0 || _this$$columnGroups.add(this.$);
      },
      unmounted: function unmounted() {
        var _this$$columnGroups2;
        (_this$$columnGroups2 = this.$columnGroups) === null || _this$$columnGroups2 === void 0 || _this$$columnGroups2["delete"](this.$);
      },
      render: function render() {
        return null;
      }
    };

    return script;

})(primevue.basecomponent, primevue.columngroup.style);
