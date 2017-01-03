Ext.define('Ext.aria.grid.View', {
    override: 'Ext.grid.View',
    
    requires: [
        'Ext.aria.view.Table'
    ],

    // ARIA treats the grid view and the grid header as one entity
    // In ExtJS the two are separate focus elements and will show separate focus frames
    // To avoid this we return the grid as the focus frame for both
    getFocusFrameEl: function() {
        var me = this,
            grid = me.up('tablepanel');
        
        if (grid) {
            return grid.el;
        }
        else {
            return me.getFocusEl();
        }
    },

    // ARIA treats the header and the view as one entity, therefore
    // tab key detected on either one should move focus out of the grid to the next node.
    // We observe this rule only if the header and the view are adjacent
    ariaPreviousNode: function(e) {
        var sibling = this.callParent(arguments);
        
        if (sibling.xtype === 'headercontainer') {
            return sibling.ariaPreviousNode(e);
        }
        else {
            return sibling;
        }
    },

    onRemove: function(ds, records, indexes) {
        var me = this,
            grid;
        
        me.callParent(arguments);
        
        if (me.hasFocus && me.getNodes().length === 0) {
            grid = me.up('tablepanel');
            
            if (grid) {
                //this will transfer the focus to the header if there is a header
                grid.focus();
            }
        }
    }
});
