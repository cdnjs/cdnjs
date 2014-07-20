Ext.define('Ext.rtl.grid.feature.Summary', {
    override: 'Ext.grid.feature.Summary',
    
    init: function(){
        this.callParent(arguments);
        if (this.view.getInherited().rtl) {
            this.scrollPadProperty = 'padding-left';
        }
    }
});
