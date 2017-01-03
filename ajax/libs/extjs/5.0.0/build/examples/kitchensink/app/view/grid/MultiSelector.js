/**
 * This example shows how to use the "multiselector" component to build a selection of
 * records from a larger set. The "multiselector" is basically a Grid component with a
 * popup search form.
 */
Ext.define('KitchenSink.view.grid.MultiSelector', {
    extend: 'Ext.container.Container',

    xtype: 'multi-selector',

    requires: [
        'Ext.view.MultiSelector'
    ],

    width: 400,
    height: 300,
    layout: 'fit',

    items: [{
        xtype: 'multiselector',
        title: 'Selected Employees',

        fieldName: 'name',

        viewConfig: {
            deferEmptyText: false,
            emptyText: 'No employees selected'
        },

        search: {
            field: 'name',

            store: {
                model: 'KitchenSink.model.grid.Employee',
                sorters: 'name',
                proxy: {
                    type: 'ajax',
                    limitParam: null,
                    url: '/KitchenSink/Employees'
                }
            }
        }
    }]
});
