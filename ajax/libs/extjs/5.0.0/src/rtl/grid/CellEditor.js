Ext.define('Ext.rtl.grid.CellEditor', {
    override: 'Ext.grid.CellEditor',

    getTreeNodeOffset: function(innerCell) {
        var offset = this.callParent(arguments);

        if (this.editingPlugin.grid.isOppositeRootDirection()) {
            offset = -(innerCell.getWidth() - offset - innerCell.child(this.treeNodeSelector).getWidth());
        }
        return offset;
    }
});