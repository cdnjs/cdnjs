/**
 * This example illustrates the use of plugins to alter the default behaviour of Components.
 * The <b>Send To</b> field clones itself until the final one is left blank to allow
 * multiple mail recipients. The layout manager keeps the vertical space allocated correctly.
 */
Ext.define('KitchenSink.view.form.FieldReplicator', {
    extend: 'Ext.form.Panel',
    xtype: 'form-fieldreplicator',

    //<example>
    requires: [
        'Ext.ux.FieldReplicator'
    ],

    exampleTitle: 'Field Replicator',
    //</example>

    title: 'Compose message',
    width: 400,
    frame: true,
    bodyPadding: 5,
    resizable: true,

    fieldDefaults: {
        labelWidth: 70,
        anchor: '100%'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'  // Child items are stretched to full width
    },

    items: [{
        xtype: 'container',
        autoScroll: true,
        maxHeight: 100,
        layout: 'anchor',
        items: [{
            xtype: 'combo',
            store: {
                type: 'array',
                fields: [ 'email' ],
                data: [
                    ['test@example.com'],
                    ['someone@example.com'],
                    ['someone-else@example.com']
                ]
            },
            displayField: 'email',
            plugins: 'fieldreplicator',
            fieldLabel: 'Send To',
            anchor: '0',
            queryMode: 'local',
            selectOnTab: false,
            name: 'to',
            onReplicate: function () {
                this.getStore().clearFilter();
            }
        }]
    }, {
        xtype: 'textfield',
        fieldLabel: 'Subject',
        name: 'subject'
    }, {
        xtype: 'textarea',
        fieldLabel: 'Message text',
        emptyText: 'Message goes here',
        hideLabel: true,
        name: 'msg',
        flex: 1  // Take up all *remaining* vertical space (kicks in when resized)
    }]
});
