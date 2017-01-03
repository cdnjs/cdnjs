Ext.define('Ext.aria.tab.Tab', {
    override: 'Ext.tab.Tab',
    
    //<locale>
    closeText: 'closable',
    //</locale>
    
    initKeyNav: function() {
        var me = this;
        
        me.keyNav = new Ext.util.KeyNav(me.el, {
            enter: me.onEnterKey,
            space: me.onEnterKey,
            del: me.onDeleteKey,
            scope: me
        });
    },

    ariaGetAfterRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent(arguments);

        attrs['aria-selected'] = !!me.active;

        if (me.card && me.card.getEl()) {
            attrs['aria-controls'] = me.card.getEl().id;
        }
        
        return attrs;
    }
});
