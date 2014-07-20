/**
 * @private
 */

Ext.define('Ext.draw.layout.Component', {

    /* Begin Definitions */

    alias: 'layout.draw',

    extend: 'Ext.layout.component.Auto',

    setHeightInDom: true,

    setWidthInDom: true,

    /* End Definitions */

    type: 'draw',
    
    measureContentWidth : function (ownerContext) {
        var target = ownerContext.target,
            paddingInfo = ownerContext.getPaddingInfo(),
            bbox = this.getBBox(ownerContext);
            
        if (!target.viewBox) {
            if (target.autoSize) {
                return bbox.width + paddingInfo.width;
            } else {
                return bbox.x + bbox.width + paddingInfo.width;
            }
        } else {
            if (ownerContext.heightModel.shrinkWrap) {
                return paddingInfo.width;
            } else {
                return bbox.width / bbox.height * (ownerContext.getProp('contentHeight') - paddingInfo.height) + paddingInfo.width;
            }
        }
    },
    
    measureContentHeight : function (ownerContext) {
        var target = ownerContext.target,
            paddingInfo = ownerContext.getPaddingInfo(),
            bbox = this.getBBox(ownerContext);
            
        if (!ownerContext.target.viewBox) {
            if (target.autoSize) {
                return bbox.height + paddingInfo.height;
            } else {
                return bbox.y + bbox.height + paddingInfo.height;
            }
        } else {
            if (ownerContext.widthModel.shrinkWrap) {
                return paddingInfo.height;
            } else {
                return bbox.height / bbox.width * (ownerContext.getProp('contentWidth') - paddingInfo.width) + paddingInfo.height;
            }
        }
    },
    
    getBBox: function(ownerContext) {
        var bbox = ownerContext.surfaceBBox;
        if (!bbox) {
            bbox = ownerContext.target.surface.items.getBBox();
            // If the surface is empty, we'll get these values, normalize them
            if (bbox.width === -Infinity && bbox.height === -Infinity) {
                bbox.width = bbox.height = bbox.x = bbox.y = 0;
            }
            ownerContext.surfaceBBox = bbox;
        }
        return bbox;
    },

    publishInnerWidth: function (ownerContext, width) {
        ownerContext.setContentWidth(width - ownerContext.getFrameInfo().width, true);
    },
    
    publishInnerHeight: function (ownerContext, height) {
        ownerContext.setContentHeight(height - ownerContext.getFrameInfo().height, true);
    },
    
    finishedLayout: function (ownerContext) {
        // TODO: Is there a better way doing this?
        var props = ownerContext.props,
            paddingInfo = ownerContext.getPaddingInfo();

        // We don't want the cost of getProps, so we just use the props data... this is ok
        // because all the props have been calculated by this time
        this.owner.setSurfaceSize(props.contentWidth - paddingInfo.width, props.contentHeight - paddingInfo.height);
        
        // calls afterComponentLayout, so we want the surface to be sized before that:
        this.callParent(arguments);
    }
});
