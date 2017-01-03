Ext.define('Ext.rtl.layout.container.Border', {
    override: 'Ext.layout.container.Border',
    
    initLayout: function(){
        var me = this;
        
        if (me.owner.getInherited().rtl) {
            me.padOnContainerProp = 'right';
            me.padNotOnContainerProp = 'left';  
            me.horzPositionProp = 'right';
        }
        me.callParent(arguments);    
    }
});
