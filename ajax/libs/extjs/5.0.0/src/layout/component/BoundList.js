/**
 * Component layout for {@link Ext.view.BoundList}.
 * @private
 */
Ext.define('Ext.layout.component.BoundList', {
    extend: 'Ext.layout.component.Auto',
    alias: 'layout.boundlist',

    type: 'component',

    beginLayout: function(ownerContext) {
        var me = this,
            owner = me.owner,
            toolbar = owner.pagingToolbar;

        me.scrollPos = owner.listWrap.getScroll();
        me.callParent(arguments);

        if (owner.floating) {
            ownerContext.savedXY = owner.getXY();
            // move way offscreen to prevent any constraining
            // only move on the y axis to avoid triggering a horizontal scrollbar in rtl mode
            owner.setXY([0, -9999]);
        }

        if (toolbar) {
            ownerContext.toolbarContext = ownerContext.context.getCmp(toolbar);
        }
        ownerContext.listContext = ownerContext.getEl('listWrap');
    },

    beginLayoutCycle: function(ownerContext){
        var owner = this.owner;

        this.callParent(arguments);
        if (ownerContext.heightModel.auto) {
            // Set the el/listWrap to be autoHeight since they may have been previously sized
            // by another layout process. If the el was at maxHeight first, the listWrap will
            // always size to the maxHeight regardless of the content.
            owner.el.setHeight('auto');
            owner.listWrap.setHeight('auto');
        }
    },

    getLayoutItems: function() {
        var toolbar = this.owner.pagingToolbar;
        return toolbar ? [toolbar] : [];
    },

    isValidParent: function() {
        // this only ever gets called with the toolbar, since it's rendered inside we
        // know the parent is always valid
        return true;
    },

    finishedLayout: function(ownerContext) {
        var me = this,
            xy = ownerContext.savedXY,
            owner = me.owner,
            listWrap = owner.listWrap,
            scrollPos = me.scrollPos;

        me.callParent(arguments);
        if (xy) {
            me.owner.setXY(xy);
        }
        listWrap.setScrollLeft(scrollPos.left);
        listWrap.setScrollTop(scrollPos.top);
    },

    measureContentWidth: function(ownerContext) {
        return this.owner.listWrap.getWidth();
    },

    measureContentHeight: function(ownerContext) {
        return this.owner.listWrap.getHeight();
    },

    publishInnerHeight: function(ownerContext, height) {
        var toolbar = ownerContext.toolbarContext,
            toolbarHeight = 0;

        if (toolbar) {
            toolbarHeight = toolbar.getProp('height');
        }

        if (toolbarHeight === undefined) {
            this.done = false;
        } else {
            ownerContext.listContext.setHeight(height - ownerContext.getFrameInfo().height - toolbarHeight);
        }
    },

    calculateOwnerHeightFromContentHeight: function(ownerContext){
        var height = this.callParent(arguments),
            toolbar = ownerContext.toolbarContext;

        if (toolbar) {
            height += toolbar.getProp('height');
        }
        return height;
    }
});