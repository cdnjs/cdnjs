Ext.define('ExtThemeNeptune.panel.Table', {
    override: 'Ext.panel.Table',

    initComponent: function() {
        var me = this;

        if (!me.hasOwnProperty('bodyBorder') && !me.hideHeaders) {
            me.bodyBorder = true;
        }

        me.callParent();
    }
});