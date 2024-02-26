this.primevue = this.primevue || {};
this.primevue.column = (function (BaseComponent, ColumnStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var ColumnStyle__default = /*#__PURE__*/_interopDefaultLegacy(ColumnStyle);

    var script$1 = {
      name: 'BaseColumn',
      "extends": BaseComponent__default["default"],
      props: {
        columnKey: {
          type: null,
          "default": null
        },
        field: {
          type: [String, Function],
          "default": null
        },
        sortField: {
          type: [String, Function],
          "default": null
        },
        filterField: {
          type: [String, Function],
          "default": null
        },
        dataType: {
          type: String,
          "default": 'text'
        },
        sortable: {
          type: Boolean,
          "default": false
        },
        header: {
          type: null,
          "default": null
        },
        footer: {
          type: null,
          "default": null
        },
        style: {
          type: null,
          "default": null
        },
        "class": {
          type: String,
          "default": null
        },
        headerStyle: {
          type: null,
          "default": null
        },
        headerClass: {
          type: String,
          "default": null
        },
        bodyStyle: {
          type: null,
          "default": null
        },
        bodyClass: {
          type: String,
          "default": null
        },
        footerStyle: {
          type: null,
          "default": null
        },
        footerClass: {
          type: String,
          "default": null
        },
        showFilterMenu: {
          type: Boolean,
          "default": true
        },
        showFilterOperator: {
          type: Boolean,
          "default": true
        },
        showClearButton: {
          type: Boolean,
          "default": true
        },
        showApplyButton: {
          type: Boolean,
          "default": true
        },
        showFilterMatchModes: {
          type: Boolean,
          "default": true
        },
        showAddButton: {
          type: Boolean,
          "default": true
        },
        filterMatchModeOptions: {
          type: Array,
          "default": null
        },
        maxConstraints: {
          type: Number,
          "default": 2
        },
        excludeGlobalFilter: {
          type: Boolean,
          "default": false
        },
        filterHeaderClass: {
          type: String,
          "default": null
        },
        filterHeaderStyle: {
          type: null,
          "default": null
        },
        filterMenuClass: {
          type: String,
          "default": null
        },
        filterMenuStyle: {
          type: null,
          "default": null
        },
        selectionMode: {
          type: String,
          "default": null
        },
        expander: {
          type: Boolean,
          "default": false
        },
        colspan: {
          type: Number,
          "default": null
        },
        rowspan: {
          type: Number,
          "default": null
        },
        rowReorder: {
          type: Boolean,
          "default": false
        },
        rowReorderIcon: {
          type: String,
          "default": undefined
        },
        reorderableColumn: {
          type: Boolean,
          "default": true
        },
        rowEditor: {
          type: Boolean,
          "default": false
        },
        frozen: {
          type: Boolean,
          "default": false
        },
        alignFrozen: {
          type: String,
          "default": 'left'
        },
        exportable: {
          type: Boolean,
          "default": true
        },
        exportHeader: {
          type: String,
          "default": null
        },
        exportFooter: {
          type: String,
          "default": null
        },
        filterMatchMode: {
          type: String,
          "default": null
        },
        hidden: {
          type: Boolean,
          "default": false
        }
      },
      style: ColumnStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'Column',
      "extends": script$1,
      inheritAttrs: false,
      inject: ['$columns'],
      mounted: function mounted() {
        var _this$$columns;
        (_this$$columns = this.$columns) === null || _this$$columns === void 0 || _this$$columns.add(this.$);
      },
      unmounted: function unmounted() {
        var _this$$columns2;
        (_this$$columns2 = this.$columns) === null || _this$$columns2 === void 0 || _this$$columns2["delete"](this.$);
      },
      render: function render() {
        return null;
      }
    };

    return script;

})(primevue.basecomponent, primevue.column.style);
