Ext.define('Ext.rtl.grid.plugin.RowEditing', {
    override: 'Ext.grid.plugin.RowEditing',
    
    initEditorConfig: function(){
        var cfg = this.callParent();
        cfg.rtl = this.grid.getInherited().rtl;
        return cfg;
    }
});
