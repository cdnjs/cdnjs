Ext.define('Neptune.view.button.Buttons', {
    extend: 'Ext.container.Container',
    xtype: 'buttons',
    id: 'buttons',

    layout: {
        type: 'table',
        columns: 6,
        tdAttrs: { style: 'padding: 15px; text-align: center;' }
    },

    items: [],

    constructor: function() {
        this.createRows();
        this.callParent(arguments);
    },

    createRows: function() {
        var me = this;

        me.createRow({});
        me.createRow({ icon: true });
        me.createRow({ iconAlign: 'right', icon: true });
        me.createRow({ iconAlign: 'top', icon: true });
        me.createRow({ iconAlign: 'bottom', icon: true });
    },

    createRow: function(cfg) {
        this.items.push(
            Ext.apply({ xtype: 'smallButton' }, cfg),
            Ext.apply({ xtype: 'mediumButton' }, cfg),
            Ext.apply({ xtype: 'largeButton' }, cfg),
            Ext.apply({ xtype: 'smallButton', disabled: true }, cfg),
            Ext.apply({ xtype: 'mediumButton', disabled: true }, cfg),
            Ext.apply({ xtype: 'largeButton', disabled: true }, cfg)
        );
    }
});