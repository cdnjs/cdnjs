Ext.define('Ext.rtl.resizer.SplitterTracker', {
    override: 'Ext.resizer.SplitterTracker',

    getVertPrevConstrainLeft: function(o) {
        return (!this.splitter.getInherited().rtl !== !Ext.rootInheritedState.rtl) ?
            ((o.prevCmp.maxWidth ? o.prevBox.right - o.prevCmp.maxWidth :
            o.nextBox.x + (o.nextCmp.minWidth || o.defaultMin)) - o.splitWidth) :
            this.callParent(arguments);
    },

    getVertPrevConstrainRight: function(o) {
        return (!this.splitter.getInherited().rtl !== !Ext.rootInheritedState.rtl) ?
            o.prevBox.right - (o.prevCmp.minWidth || o.defaultMin) :
            this.callParent(arguments);
    },


    getVertNextConstrainLeft: function(o) {
        return (!this.splitter.getInherited().rtl !== !Ext.rootInheritedState.rtl) ?
            o.nextBox.x + (o.nextCmp.minWidth || o.defaultMin) :
            this.callParent(arguments);
    },

    getVertNextConstrainRight: function(o) {
        return (!this.splitter.getInherited().rtl !== !Ext.rootInheritedState.rtl) ?
            ((o.nextCmp.maxWidth ? o.nextBox.x + o.nextCmp.maxWidth :
            o.prevBox.right - (o.prevBox.minWidth || o.defaultMin)) + o.splitWidth) :
            this.callParent(arguments);
    },

    getResizeOffset: function() {
        var offset = this.getOffset('dragTarget');
        if (!this.splitter.getInherited().rtl !== !Ext.rootInheritedState.rtl) {
            offset[0] = -offset[0];
        }
        return offset;
    }
});
