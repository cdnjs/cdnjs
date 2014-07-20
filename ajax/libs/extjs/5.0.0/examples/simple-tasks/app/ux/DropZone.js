/**
 * @class SimpleTasks.ux.DropZone
 * @extends Ext.tree.ViewDropZone
 * @private
 */
Ext.define('SimpleTasks.ux.DropZone', {
    extend: 'Ext.tree.ViewDropZone',

    handleNodeDrop : function(data, overRecord, position) {
        var droppedRecord = data.records[0];

        if(droppedRecord instanceof SimpleTasks.model.Task) {
            this.cancelExpand();
            this.fireViewEvent('taskdrop', droppedRecord, overRecord);
        } else if(droppedRecord instanceof SimpleTasks.model.List) {
            this.callParent(arguments);
            this.fireViewEvent('listdrop', droppedRecord, overRecord, position);
        }
    },

    onNodeOver: function(node, dragZone, e, data) {
        var me = this,
            view = me.view,
            overRecord = view.getRecord(node),
            position = me.getPosition(e, node),
            targetNode = view.getRecord(node);

        // if we're dragging to reorder rows within the List Tree, then call superclass onNodeOver.
        // This allows the superclass to show the visual position indicator.
        // Otherwise if we're dragging a Task from the Task Grid, do not show the indicator, since we want
        // to give the appearance of the dragged record being dropped ON a node, not in between nodes.
        if(data.records[0] instanceof SimpleTasks.model.List) {
            return me.callParent(arguments);
        }

        // auto node expand check
        this.cancelExpand();
        if (position == 'append' && !this.expandProcId && !Ext.Array.contains(data.records, targetNode) && !targetNode.isLeaf() && !targetNode.isExpanded()) {
            this.queueExpand(targetNode);
        }
 
        me.overRecord = overRecord;
        me.valid = true;
        return me.dropAllowed;
    }

});