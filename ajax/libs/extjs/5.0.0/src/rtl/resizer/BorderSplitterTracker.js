Ext.define('Ext.rtl.resizer.BorderSplitterTracker', {
    override: 'Ext.resizer.BorderSplitterTracker',

    rtlDirections: {
        top: 'top',
        right: 'left',
        bottom: 'bottom',
        left: 'right'
    },

    getCollapseDirection: function() {
        var direction = this.splitter.getCollapseDirection();
        if (!this.splitter.getInherited().rtl !== !Ext.rootInheritedState.rtl) {
            direction = this.rtlDirections[direction];
        }
        return direction;
    }
});
