/**
 * This is a layout that inherits the anchoring of {@link Ext.layout.container.Anchor} and adds the
 * ability for x/y positioning using the standard x and y component config options.
 *
 * This class is intended to be extended or created via the {@link Ext.container.Container#layout layout}
 * configuration property.  See {@link Ext.container.Container#layout} for additional details.
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         title: 'Absolute Layout',
 *         width: 300,
 *         height: 275,
 *         layout: {
 *             type: 'absolute'
 *             // layout-specific configs go here
 *             //itemCls: 'x-abs-layout-item',
 *         },
 *         url:'save-form.php',
 *         defaultType: 'textfield',
 *         items: [{
 *             x: 10,
 *             y: 10,
 *             xtype:'label',
 *             text: 'Send To:'
 *         },{
 *             x: 80,
 *             y: 10,
 *             name: 'to',
 *             anchor:'90%'  // anchor width by percentage
 *         },{
 *             x: 10,
 *             y: 40,
 *             xtype:'label',
 *             text: 'Subject:'
 *         },{
 *             x: 80,
 *             y: 40,
 *             name: 'subject',
 *             anchor: '90%'  // anchor width by percentage
 *         },{
 *             x:0,
 *             y: 80,
 *             xtype: 'textareafield',
 *             name: 'msg',
 *             anchor: '100% 100%'  // anchor width and height
 *         }],
 *         renderTo: Ext.getBody()
 *     });
 */
Ext.define('Ext.layout.container.Absolute', {

    /* Begin Definitions */

    alias: 'layout.absolute',
    extend: 'Ext.layout.container.Anchor',
    alternateClassName: 'Ext.layout.AbsoluteLayout',

    /* End Definitions */

    targetCls: Ext.baseCSSPrefix + 'abs-layout-ct',
    itemCls: Ext.baseCSSPrefix + 'abs-layout-item',

    /**
     * @cfg {Boolean} ignoreOnContentChange
     * True indicates that changes to one item in this layout do not effect the layout in
     * general. This may need to be set to false if {@link Ext.Component#autoScroll}
     * is enabled for the container.
     */
    ignoreOnContentChange: true,

    type: 'absolute',

    // private
    adjustWidthAnchor: function(value, childContext) {
        var padding = this.targetPadding,
            x = childContext.getStyle('left');

        return value - x + padding.left;
    },

    // private
    adjustHeightAnchor: function(value, childContext) {
        var padding = this.targetPadding,
            y = childContext.getStyle('top');

        return value - y + padding.top;
    },

    isItemLayoutRoot: function (item) {
        return this.ignoreOnContentChange || this.callParent(arguments);
    },

    isItemShrinkWrap: function (item) {
        return true;
    },

    beginLayout: function (ownerContext) {
        var me = this,
            target = me.getTarget();

        me.callParent(arguments);

        // Do not set position: relative; when the absolute layout target is the body
        if (target.dom !== document.body) {
            target.position();
        }

        me.targetPadding = ownerContext.targetContext.getPaddingInfo();
    },

    isItemBoxParent: function (itemContext) {
        return true;
    },

    onContentChange: function () {
        if (this.ignoreOnContentChange) {
            return false;
        }
        return this.callParent(arguments);
    },

    calculateContentSize: function (ownerContext, dimensions) {
        var me = this,
            containerDimensions = (dimensions || 0) |
                   ((ownerContext.widthModel.shrinkWrap ? 1 : 0) |
                    (ownerContext.heightModel.shrinkWrap ? 2 : 0)),
            calcWidth = (containerDimensions & 1) || undefined,
            calcHeight = (containerDimensions & 2) || undefined,
            childItems = ownerContext.childItems,
            length = childItems.length,
            contentHeight = 0,
            contentWidth = 0,
            needed = 0,
            props = ownerContext.props,
            targetPadding, child, childContext, height, i, margins, width;

        if (calcWidth) {
            if (isNaN(props.contentWidth)) {
                ++needed;
            } else {
                calcWidth = undefined;
            }
        }
        if (calcHeight) {
            if (isNaN(props.contentHeight)) {
                ++needed;
            } else {
                calcHeight = undefined;
            }
        }

        if (needed) {
            for (i = 0; i < length; ++i) {
                childContext = childItems[i];
                child = childContext.target;
                height = calcHeight && childContext.getProp('height');
                width = calcWidth && childContext.getProp('width');
                margins = childContext.getMarginInfo();

                height += margins.bottom;
                width  += margins.right;

                contentHeight = Math.max(contentHeight, (child.y || 0) + height);
                contentWidth = Math.max(contentWidth, (child.x || 0) + width);

                if (isNaN(contentHeight) && isNaN(contentWidth)) {
                    me.done = false;
                    return;
                }
            }

            if (calcWidth || calcHeight) {
                targetPadding = ownerContext.targetContext.getPaddingInfo();
            }
            if (calcWidth && !ownerContext.setContentWidth(contentWidth + targetPadding.width)) {
                me.done = false;
            }
            if (calcHeight && !ownerContext.setContentHeight(contentHeight + targetPadding.height)) {
                me.done = false;
            }

            /* add a '/' to turn on this log ('//* enables, '/*' disables)
            if (me.done) {
                var el = ownerContext.targetContext.el.dom;
                Ext.log(this.owner.id, '.contentSize: ', contentWidth, 'x', contentHeight,
                    ' => scrollSize: ', el.scrollWidth, 'x', el.scrollHeight);
            }/**/
        }
    }
});
