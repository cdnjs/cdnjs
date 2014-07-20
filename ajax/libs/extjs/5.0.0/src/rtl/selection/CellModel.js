Ext.define('Ext.rtl.selection.CellModel', {
    override: 'Ext.selection.CellModel',
    
    doMove: function(direction, e) {
        if (this.view.getInherited().rtl) {
            if (direction == 'left') {
                direction = 'right';
            } else if (direction == 'right') {
                direction = 'left';
            }
        }
        this.callParent([direction, e]);
    }
});
