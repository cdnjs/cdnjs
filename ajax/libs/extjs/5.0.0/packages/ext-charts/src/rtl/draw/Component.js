Ext.define('Ext.rtl.draw.Component', {
    override: 'Ext.draw.Component',
    
    initSurfaceCfg: function(cfg) {
        if (this.getInherited().rtl) {
            cfg.isRtl = true;
        }
    }    
});
