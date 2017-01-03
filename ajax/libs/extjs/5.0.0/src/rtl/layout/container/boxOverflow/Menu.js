Ext.define('Ext.rtl.layout.container.boxOverflow.Menu', {
    override: 'Ext.layout.container.boxOverflow.Menu',

    getSuffixConfig: function(isFromRTL) {
        if (isFromRTL) {
            return this.callParent();
        } else {
            return this.getPrefixConfig(true);
        }
    },

    getPrefixConfig: function(isFromRTL) {
        if (isFromRTL) {
            return this.callParent();
        } else {
            return this.getSuffixConfig(true);
        }
    }
});
