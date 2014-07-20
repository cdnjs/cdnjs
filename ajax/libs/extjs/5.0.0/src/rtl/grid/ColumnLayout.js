Ext.define('Ext.rtl.grid.ColumnLayout', {
    override: 'Ext.grid.ColumnLayout',

    beginLayout: function(ownerContext) {
        var me = this,
            owner = me.owner,
            view = me.grid.view;

        me.callParent(arguments);

        if (!owner.isColumn && view.scrollFlags.y && view.getInherited().rtl) {

            // Chrome has an RTL bug where overflow only caused by the imposition of the vertical scrollbar does NOT
            // cause extra left/right scrolling. If that bug is present, this extra space is not needed in RTL.
            // https://code.google.com/p/chromium/issues/detail?id=179332
            // TODO: Remove the Ext.supports.rtlVertScrollbarOnRight test and the test for it below when all supported Chrome versions are fixed.
            //
            // Chrome has another bug, the xOriginBug: http://code.google.com/p/chromium/issues/detail?id=174656
            // This means that the table element has to be positioned right:-15px in RTL mode
            // This triggers the right padding to be added in calculateParallel below which extends the contentWidth.
            // We compensate for this here by reducing the width by the same amount.
            //
            // This extra space is also not needed if the scrollbar is on the right. In this case, the extra space
            // comes from padding added to the ColumnLayout in the calculateParallel implementation below.
            //
            // So when these conditions are present and the grid is in RTL mode, the scrollbarAdjustment value for this layout is zero.
            if (view.bufferedRenderer && Ext.supports.xOriginBug) {
                me.scrollbarAdjustment = -me.scrollbarWidth;
            } else if (Ext.supports.rtlVertScrollbarOverflowBug || Ext.supports.rtlVertScrollbarOnRight) {
                me.scrollbarAdjustment = 0;
            }
        }
    },

    calculateParallel: function(ownerContext, names, plan) {
        var me = this,
            owner = me.owner,
            view = me.grid.view,
            // Only adjust the layout padding if this ColumnLayout is for a a top lever HeaderContainer.
            rtlVertScrollbarOnRight = !owner.isColumn && Ext.supports.rtlVertScrollbarOnRight && owner.ownerCt.view.getInherited().rtl;

        // https://sencha.jira.com/browse/EXTJSIV-11245
        // Safari keeps scrollbar on the right even in RTL mode, so any element
        // which must stay in horizontal sync (like the HeaderContainer) needs the first item to have some "before" margin.
        // The layout system caches the margin because it is assumed to be static, so we have to clear this cache.
        if (rtlVertScrollbarOnRight || (view.bufferedRenderer && Ext.supports.xOriginBug)) {
            me.padding.right = me.scrollbarWidth;
        }

        return me.callParent(arguments);
    }
});
