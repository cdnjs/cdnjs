/**
 * This example shows how to use the "tagfield" multi-value selector.
 */
Ext.define('KitchenSink.view.form.Tag', {
    extend: 'Ext.panel.Panel',
    xtype: 'form-tag',

    //<example>
    requires: [
        'Ext.form.field.Tag'
    ],
    
    exampleTitle: 'Tag Field',
    otherContent: [{
        type: 'Store',
        path: 'app/store/States.js'
    },{
        type: 'Model',
        path: 'app/model/State.js'
    }],
    //</example>
    
    title: 'Select State(s)',
    bodyPadding: 5,
    frame: true,
    width: 600,
    layout: 'form',
    viewModel: {},

    items: [{
        xtype: 'displayfield',
        fieldLabel: 'Selected States',
        bind: '{states.value}'
    }, {
        xtype: 'tagfield',
        fieldLabel: 'Select a state',
        store: {
            type: 'states'
        },
        reference: 'states',
        displayField: 'state',
        valueField: 'abbr',
        filterPickList: true,
        queryMode: 'local',
        publishes: 'value'
    }],
    buttons: [{
        text: 'OK'
    }, {
        text: 'Cancel'
    }]
});
