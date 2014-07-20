/**
 * This example shows using multiple sorters on a Store attached to a DataView.
 *
 * We're also using the reorderable toolbar plugin to make it easy to reorder the sorters
 * with drag and drop. To change the sort order, just drag and drop the "Type" or "Name"
 * field.
 */
Ext.define('KitchenSink.view.dataview.MultiSort', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.toolbar.TextItem',
        'Ext.view.View',
        'Ext.ux.DataView.Animated'
    ],

    xtype: 'dataview-multisort',
    title: 'Multisort DataView',
    width: 540,
    layout: 'fit',
    //<example>
    otherContent: [{
        type: 'Button View',
        path: 'app/view/dataview/MultiSortButton.js'
    },{
        type: 'Data',
        path: 'resources/data/sencha-touch-examples.json'
    }],
    themes: {
        classic: {
            height: 580
        },
        neptune: {
            height: 620
        }
    },
    //</example>

    initComponent: function() {
        this.height = this.themeInfo.height;
        this.tbar = {
            plugins: {
                xclass: 'Ext.ux.BoxReorderer',
                listeners: {
                    scope: this,
                    drop: this.updateStoreSorters
                }
            },
            defaults: {
                listeners: {
                    scope: this,
                    changeDirection: this.updateStoreSorters
                }
            },
            items: [{
                xtype: 'tbtext',
                text: 'Sort on these fields:',
                reorderable: false
            }, {
                xtype: 'dataview-multisort-sortbutton',
                text : 'Type',
                dataIndex: 'type'
            }, {
                xtype: 'dataview-multisort-sortbutton',
                text : 'Name',
                dataIndex: 'name'
            }]
        };

        this.items = {
            xtype: 'dataview',
            tpl: [
                '<tpl for=".">',
                    '<div class="dataview-multisort-item">',
                        '<img src="resources/images/touch-icons/{thumb}" />',
                        '<h3>{name}</h3>',
                    '</div>',
                '</tpl>'
            ],
            plugins: {
                xclass: 'Ext.ux.DataView.Animated'
            },
            itemSelector: 'div.dataview-multisort-item',
            store: Ext.create('Ext.data.Store', {
                autoLoad: true,
                sortOnLoad: true,
                fields: ['name', 'thumb', 'url', 'type'],
                proxy: {
                    type: 'ajax',
                    url : 'resources/data/sencha-touch-examples.json',
                    reader: {
                        type: 'json',
                        rootProperty: ''
                    }
                }
            })
        };

        this.callParent(arguments);
        this.updateStoreSorters();
    },

    /**
     * Returns the array of Ext.util.Sorters defined by the current toolbar button order
     * @return {Array} The sorters
     */
    getSorters: function() {
        var buttons = this.query('toolbar dataview-multisort-sortbutton'),
            sorters = [];
        Ext.Array.each(buttons, function(button) {
            sorters.push({
                property : button.getDataIndex(),
                direction: button.getDirection()
            });
        });

        return sorters;
    },

    /**
     * @private
     * Updates the DataView's Store's sorters based on the current Toolbar button configuration
     */
    updateStoreSorters: function() {
        var sorters = this.getSorters(),
            view = this.down('dataview');

        view.store.sort(sorters);
    }
});
