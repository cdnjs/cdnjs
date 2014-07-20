/**
 */
Ext.define('Ext.layout.container.ColumnSplitterTracker', {
    extend: 'Ext.resizer.SplitterTracker',

    performResize: function(e, offset) {
        var me        = this,
            prevCmp   = me.getPrevCmp(),
            nextCmp   = me.getNextCmp(),
            splitter  = me.getSplitter(),
            owner     = splitter.ownerCt,
            delta     = offset[0],
            prevWidth, nextWidth, ratio;

        if (prevCmp && nextCmp) {
            prevCmp.width = prevWidth = me.prevBox.width + delta;
            nextCmp.width = nextWidth = me.nextBox.width - delta;

            ratio = (prevCmp.columnWidth + nextCmp.columnWidth) / (prevWidth + nextWidth);

            prevCmp.columnWidth = prevWidth * ratio;
            nextCmp.columnWidth = nextWidth * ratio;
        }

        splitter.el.dom.style.left = '';
        owner.updateLayout();
    }
});
