Ext.define('Neptune.view.button.MenuButtons', {
    extend: 'Neptune.view.button.Buttons',
    xtype: 'menuButtons',
    id: 'menuButtons',

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
            Ext.apply({ xtype: 'smallMenuButton' }, cfg),
            Ext.apply({ xtype: 'mediumMenuButton' }, cfg),
            Ext.apply({ xtype: 'largeMenuButton' }, cfg),
            Ext.apply({ xtype: 'smallMenuButton', disabled: true }, cfg),
            Ext.apply({ xtype: 'mediumMenuButton', disabled: true }, cfg),
            Ext.apply({ xtype: 'largeMenuButton', disabled: true }, cfg)
        );
    }
});