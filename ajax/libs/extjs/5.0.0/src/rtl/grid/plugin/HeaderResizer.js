Ext.define('Ext.rtl.grid.plugin.HeaderResizer', {
    override: 'Ext.grid.plugin.HeaderResizer',

    onBeforeStart : function(e) {
        var me = this;

        if (this.headerCt.isOppositeRootDirection()) {
            // cache the activeHd because it will be cleared.
            me.dragHd = me.activeHd;

            if (!!me.dragHd && !me.headerCt.dragging) {

                // Calculate how far off the right marker line the mouse pointer is.
                // This will be the xDelta during the following drag operation.
                me.xDelta = me.dragHd.getX() - me.tracker.getXY()[0];
                this.tracker.constrainTo = this.getConstrainRegion();
                return true;
            } else {
                me.headerCt.dragging = false;
                return false;
            }
        } else {
            return this.callParent(arguments);
        }
    },

    adjustColumnWidth: function(offsetX) {
        if (this.headerCt.isOppositeRootDirection()) {
            offsetX = -offsetX;
        }
        this.callParent([offsetX]);
    },

    adjustConstrainRegion: function(region, t, r, b, l) {
        return this.headerCt.isOppositeRootDirection() ?
            region.adjust(t, -l, b, -r) : this.callParent(arguments);
    },

    calculateDragX: function(gridSection) {
        var gridX = gridSection.getX(),
            mouseX = this.tracker.getXY('point')[0];
        
        if (this.headerCt.isOppositeRootDirection()) {
            return mouseX - gridX + this.xDelta;    
        } else {
            return this.callParent(arguments);
        }   

    },

    getMovingMarker: function(markerOwner){
        if (this.headerCt.isOppositeRootDirection()) {
            return markerOwner.getLhsMarker();
        } else {
            return markerOwner.getRhsMarker();
        }
    },

    setMarkerX: function(marker, x) {
        var headerCt = this.headerCt;
        if (headerCt.getInherited().rtl && !headerCt.isOppositeRootDirection()) {
            marker.rtlSetLocalX(x);
        } else {
            this.callParent(arguments);
        }
    }
});
