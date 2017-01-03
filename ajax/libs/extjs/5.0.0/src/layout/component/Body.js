/**
 * Component layout for components which maintain an inner body element which must be resized to synchronize with the
 * Component size.
 * @private
 */
Ext.define('Ext.layout.component.Body', {

    /* Begin Definitions */

    alias: ['layout.body'],

    extend: 'Ext.layout.component.Auto',

    /* End Definitions */

    type: 'body',

    beginLayout: function (ownerContext) {
        this.callParent(arguments);

        ownerContext.bodyContext = ownerContext.getEl('body');
    },

    beginLayoutCycle: function(ownerContext, firstCycle){
        var me = this,
            lastWidthModel = me.lastWidthModel,
            lastHeightModel = me.lastHeightModel,
            body = me.owner.body;

        me.callParent(arguments);

        if (lastWidthModel && lastWidthModel.fixed && ownerContext.widthModel.shrinkWrap) {
            body.setWidth(null);
        }

        if (lastHeightModel && lastHeightModel.fixed && ownerContext.heightModel.shrinkWrap) {
            body.setHeight(null);
        }
    },

    // Padding is exciting here because we have 2 el's: owner.el and owner.body. Content
    // size always includes the padding of the targetEl, which should be owner.body. But
    // it is common to have padding on owner.el also (such as a panel header), so we need
    // to do some more padding work if targetContext is not owner.el. The base class has
    // already handled the ownerContext's frameInfo (border+framing) so all that is left
    // is padding.

    calculateOwnerHeightFromContentHeight: function (ownerContext, contentHeight) {
        var height = this.callParent(arguments);

        if (ownerContext.targetContext != ownerContext) {
            height += ownerContext.getPaddingInfo().height;
        }

        return height;
    },

    calculateOwnerWidthFromContentWidth: function (ownerContext, contentWidth) {
        var width = this.callParent(arguments);

        if (ownerContext.targetContext != ownerContext) {
            width += ownerContext.getPaddingInfo().width;
        }

        return width;
    },

    measureContentWidth: function (ownerContext) {
        return ownerContext.bodyContext.setWidth(ownerContext.bodyContext.el.dom.offsetWidth, false);
    },

    measureContentHeight: function (ownerContext) {
        return ownerContext.bodyContext.setHeight(ownerContext.bodyContext.el.dom.offsetHeight, false);
    },

    publishInnerHeight: function (ownerContext, height) {
        var innerHeight = height - ownerContext.getFrameInfo().height,
            targetContext = ownerContext.targetContext;

        if (targetContext != ownerContext) {
            innerHeight -= ownerContext.getPaddingInfo().height;
        }

        // return the value here, it may get used in a subclass
        return ownerContext.bodyContext.setHeight(innerHeight, !ownerContext.heightModel.natural);
    },

    publishInnerWidth: function (ownerContext, width) {
        var innerWidth = width - ownerContext.getFrameInfo().width,
            targetContext = ownerContext.targetContext;

        if (targetContext != ownerContext) {
            innerWidth -= ownerContext.getPaddingInfo().width;
        }

        ownerContext.bodyContext.setWidth(innerWidth, !ownerContext.widthModel.natural);
    }
});
