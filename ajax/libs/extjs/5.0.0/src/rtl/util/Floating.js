Ext.define('Ext.rtl.util.Floating', {
    override: 'Ext.util.Floating',
    
    constructor: function() {
        this.callParent(arguments);

        if (this.isLocalRtl()) {
            // set the rtl property on the Ext.Layer instance so it will use the correct
            // coordinate system when syncing shadow/shim
            this.el.setRtl(true);
        }
    }

});