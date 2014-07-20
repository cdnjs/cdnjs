/**
 * This example demostrates that ComboBoxes can use any type of Ext.data.Store as a data
 * source. This means your data can be XML, JSON, arrays or any other supported format.
 * It can be loaded using Ajax, JSONP or locally.
 */
Ext.define('KitchenSink.view.form.Comboboxes', {
    extend: 'Ext.form.Panel',
    xtype: 'form-combos',
    controller: 'form-combos',
    
    //<example>
    requires: [
        'KitchenSink.model.State',
        'KitchenSink.store.States',
        'KitchenSink.view.form.ComboboxesController'
    ],
    
    exampleTitle: 'Combo Boxes',
    otherContent: [{
        type: 'Model',
        path: 'app/model/State.js'
    }, {
        type: 'Store',
        path: 'app/store/States.js'
    }],
    //</example>
    
    title: 'Combo Boxes',
    width: 500,
    layout: 'form',
    
    defaultType: 'fieldset',
    defaults: {
        'margin-bottom': '20px',
        defaultType: 'combobox',
        layout: 'anchor'
    },
    
    items: [{
        // A Combo box with remote loading and querying
        items: [{
            xtype: 'component',
            anchor: '100%',
            style: {
                'padding-right': '5px'
            },
            html: [
                '<h3>Remote query mode</h3>',
                '<p>This ComboBox uses <code>queryMode: "remote"</code> ',
                'to perform the query on a remote API which returns states ',
                'that match the typed string.</p>'
            ]
        }, {
            fieldLabel: 'Select State',
            displayField: 'state',
            anchor: '-15',
            labelWidth: 130,
            store: {
                model: 'KitchenSink.model.State',
                proxy: {
                    type: 'ajax',
                    url: 'resources/data/form/states_remote.php',
                    reader: {
                        type: 'array',
                        rootProperty: 'data'
                    }
                },
                autoDestroy: true
            },

            // We're forcing the query to run every time by setting minChars to 0
            // (default is 4)
            minChars: 0,
            queryParam: 'q',
            queryMode: 'remote',
            
            listeners: {
                select: 'onStateSelected'
            }
        }]
    }, {
        // A Combo box with remote loading and local querying
        items: [{
            xtype: 'component',
            anchor: '100%',
            style: {
                'padding-right': '5px'
            },
            html: [
                '<h3>Remote loaded, local query mode</h3>',
                '<p>This ComboBox uses remotely loaded data, to perform querying ',
                'client side.</p>',
                '<p>This is suitable when the dataset is not too big or dynamic ',
                'to be manipulated locally.</p>',
                '<p>This example uses a custom template for the dropdown list ',
                'to illustrate grouping.</p>'
            ]
        }, {
            fieldLabel: 'Select State',
            displayField: 'state',
            anchor: '-15',
            labelWidth: 130,
            store: {
                model: 'KitchenSink.model.State',
                proxy: {
                    type: 'ajax',
                    url: 'resources/data/form/states_remote.js',
                    reader: {
                        type: 'array'
                    }
                },
                autoLoad: true
            },
            
            minChars: 0,
            queryMode: 'local',
            tpl: [
                '<ul class="x-list-plain">',
                    '<tpl for=".">',
                        '<li class="',
                            Ext.baseCSSPrefix, 'grid-group-hd ',
                            Ext.baseCSSPrefix, 'grid-group-title">{abbr}</li>',
                        '<li class="x-boundlist-item">',
                            '{state}, {description}',
                        '</li>',
                    '</tpl>',
                '</ul>'
            ]
        }]
    }, {
        // Simple ComboBox using the data store
        items: [{
            xtype: 'component',
            anchor: '100%',
            style: {
                'padding-right': '5px'
            },
            html: [
                '<h3>Locally loaded data</h3>',
                '<p>This ComboBox uses local data from a JS array:</p>'
            ]
        }, {
            fieldLabel: 'Select a single state',
            displayField: 'state',
            anchor: '-15',
            labelWidth: 130,
            store: {
                type: 'states'
            },
            
            minChars: 0,
            queryMode: 'local',
            typeAhead: true
        }]
    }, {
        // ComboBox with a custom item template
        items: [{
            xtype: 'component',
            anchor: '100%',
            style: {
                'padding-right': '5px'
            },
            html: [
                '<h3>Custom Item Templates</h3>',
                '<p>This ComboBox uses the same data, but also illustrates ',
                'how to use an optional custom template to create custom UI ',
                'renditions for list items by overriding the getInnerTpl method. ',
                'In this case each item shows the state\'s abbreviation, and has ',
                'a QuickTip which displays the state\'s nickname when hovered over.</p>'
            ]
        }, {
            fieldLabel: 'Select a single state',
            displayField: 'state',
            anchor: '-15',
            labelWidth: 130,
            store: {
                type: 'states'
            },
            queryMode: 'local',
            listConfig: {
                itemTpl: [
                    '<div data-qtip="{state}: {description}">{state} ({abbr})</div>'
                ]
            }
        }]
    }, {
        // ComboBox with multiple selection enabled
        items: [{
            xtype: 'component',
            anchor: '100%',
            style: {
                'padding-right': '5px'
            },
            html: [
                '<h3>Multiple Selection</h3>',
                '<p>This ComboBox uses the same data once again, but allows ',
                'selecting multiple values.</p>'
            ]
        }, {
            fieldLabel: 'Select multiple states',
            multiSelect: true,
            displayField: 'state',
            anchor: '-15',
            labelWidth: 130,
            store: {
                type: 'states'
            },
            queryMode: 'local'
        }]
    }]
});
