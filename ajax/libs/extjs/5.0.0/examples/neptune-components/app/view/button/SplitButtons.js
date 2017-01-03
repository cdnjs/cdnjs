Ext.define('Neptune.view.button.SplitButtons', {
    extend: 'Neptune.view.button.Buttons',
    xtype: 'splitButtons',
    id: 'splitButtons',

    items: [],

    createRows: function() {
        var me = this;

        me.callParent(arguments);
        me.createRow({ arrowAlign: 'bottom' });
        me.createRow({ arrowAlign: 'bottom', icon: true });
        me.createRow({ arrowAlign: 'bottom', iconAlign: 'right', icon: true });
        me.createRow({ arrowAlign: 'bottom', iconAlign: 'top', icon: true });
        me.createRow({ arrowAlign: 'bottom', iconAlign: 'bottom', icon: true });
    },

    createRow: function(cfg) {
        this.items.push(
            Ext.apply({ xtype: 'smallSplitButton' }, cfg),
            Ext.apply({ xtype: 'mediumSplitButton' }, cfg),
            Ext.apply({ xtype: 'largeSplitButton' }, cfg),
            Ext.apply({ xtype: 'smallSplitButton', disabled: true }, cfg),
            Ext.apply({ xtype: 'mediumSplitButton', disabled: true }, cfg),
            Ext.apply({ xtype: 'largeSplitButton', disabled: true }, cfg)
        );
    }
});