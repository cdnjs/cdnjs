/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * This is the layout style of choice for creating structural layouts in a multi-column format where the width of each
 * column can be specified as a percentage or fixed width, but the height is allowed to vary based on the content. This
 * class is intended to be extended or created via the layout:'column' {@link Ext.container.Container#layout} config,
 * and should generally not need to be created directly via the new keyword.
 *
 * ColumnLayout does not have any direct config options (other than inherited ones), but it does support a specific
 * config property of `columnWidth` that can be included in the config of any panel added to it. The layout will use
 * the columnWidth (if present) or width of each panel during layout to determine how to size each panel. If width or
 * columnWidth is not specified for a given panel, its width will default to the panel's width (or auto).
 *
 * The width property is always evaluated as pixels, and must be a number greater than or equal to 1. The columnWidth
 * property is always evaluated as a percentage, and must be a decimal value greater than 0 and less than 1 (e.g., .25).
 *
 * The basic rules for specifying column widths are pretty simple. The logic makes two passes through the set of
 * contained panels. During the first layout pass, all panels that either have a fixed width or none specified (auto)
 * are skipped, but their widths are subtracted from the overall container width.
 *
 * During the second pass, all panels with columnWidths are assigned pixel widths in proportion to their percentages
 * based on the total **remaining** container width. In other words, percentage width panels are designed to fill
 * the space left over by all the fixed-width and/or auto-width panels. Because of this, while you can specify any
 * number of columns with different percentages, the columnWidths must always add up to 1 (or 100%) when added
 * together, otherwise your layout may not render as expected.
 *
 *     @example
 *     // All columns are percentages -- they must add up to 1
 *     Ext.create('Ext.panel.Panel', {
 *         title: 'Column Layout - Percentage Only',
 *         width: 350,
 *         height: 250,
 *         layout:'column',
 *         items: [{
 *             title: 'Column 1',
 *             columnWidth: 0.25
 *         },{
 *             title: 'Column 2',
 *             columnWidth: 0.55
 *         },{
 *             title: 'Column 3',
 *             columnWidth: 0.20
 *         }],
 *         renderTo: Ext.getBody()
 *     });
 *
 *     // Mix of width and columnWidth -- all columnWidth values must add up
 *     // to 1. The first column will take up exactly 120px, and the last two
 *     // columns will fill the remaining container width.
 *
 *     Ext.create('Ext.Panel', {
 *         title: 'Column Layout - Mixed',
 *         width: 350,
 *         height: 250,
 *         layout:'column',
 *         items: [{
 *             title: 'Column 1',
 *             width: 120
 *         },{
 *             title: 'Column 2',
 *             columnWidth: 0.7
 *         },{
 *             title: 'Column 3',
 *             columnWidth: 0.3
 *         }],
 *         renderTo: Ext.getBody()
 *     });
 */
Ext.define('Ext.layout.container.Column', {

    extend: 'Ext.layout.container.Auto',
    alias: ['layout.column'],
    alternateClassName: 'Ext.layout.ColumnLayout',

    type: 'column',

    itemCls: Ext.baseCSSPrefix + 'column',

    targetCls: Ext.baseCSSPrefix + 'column-layout-ct',

    // Columns with a columnWidth have their width managed.
    columnWidthSizePolicy: {
        readsWidth: 0,
        readsHeight: 1,
        setsWidth: 1,
        setsHeight: 0
    },
    
    createsInnerCt: true,

    manageOverflow: true,
    
    isItemShrinkWrap: function(ownerContext){
        return true;
    },

    getItemSizePolicy: function (item, ownerSizeModel) {
        if (item.columnWidth) {
            if (!ownerSizeModel) {
                ownerSizeModel = this.owner.getSizeModel();
            }

            if (!ownerSizeModel.width.shrinkWrap) {
                return this.columnWidthSizePolicy;
            }
        }
        return this.autoSizePolicy;
    },

    calculateItems: function (ownerContext, containerSize) {
        var me = this,
            targetContext = ownerContext.targetContext,
            items = ownerContext.childItems,
            len = items.length,
            contentWidth = 0,
            gotWidth = containerSize.gotWidth,
            blocked, availableWidth, i, itemContext, itemMarginWidth, itemWidth;

        // No parallel measurement, cannot lay out boxes.
        if (gotWidth === false) { //\\ TODO: Deal with target padding width
            // TODO: only block if we have items with columnWidth
            targetContext.domBlock(me, 'width');
            blocked = true;
        } else if (gotWidth) {
            availableWidth = containerSize.width;
        } else {
            // gotWidth is undefined, which means we must be width shrink wrap.
            // cannot calculate columnWidths if we're shrink wrapping.
            return true;
        }

        // we need the widths of the columns we don't manage to proceed so we block on them
        // if they are not ready...
        for (i = 0; i < len; ++i) {
            itemContext = items[i];

            // this is needed below for non-calculated columns, but is also needed in the
            // next loop for calculated columns... this way we only call getMarginInfo in
            // this loop and use the marginInfo property in the next...
            itemMarginWidth = itemContext.getMarginInfo().width;

            if (!itemContext.widthModel.calculated) {
                itemWidth = itemContext.getProp('width');
                if (typeof itemWidth != 'number') {
                    itemContext.block(me, 'width');
                    blocked = true;
                }

                contentWidth += itemWidth + itemMarginWidth;
            }
        }

        if (!blocked) {
            availableWidth = (availableWidth < contentWidth) ? 0 : availableWidth - contentWidth;

            for (i = 0; i < len; ++i) {
                itemContext = items[i];
                if (itemContext.widthModel.calculated) {
                    itemMarginWidth = itemContext.marginInfo.width; // always set by above loop
                    itemWidth = itemContext.target.columnWidth;
                    itemWidth = Math.floor(itemWidth * availableWidth) - itemMarginWidth;
                    itemWidth = itemContext.setWidth(itemWidth); // constrains to min/maxWidth
                    contentWidth += itemWidth + itemMarginWidth;
                }
            }

            ownerContext.setContentWidth(contentWidth + ownerContext.paddingContext.getPaddingInfo().width);
        }

        // we registered all the values that block this calculation, so abort now if blocked...
        return !blocked;
    },

    setCtSizeIfNeeded: function(ownerContext, containerSize) {
        var me = this,
            padding = ownerContext.paddingContext.getPaddingInfo();

        me.callParent(arguments);

        // IE6/7/quirks lose right padding when using the shrink wrap template, so
        // reduce the size of the outerCt by the amount of right padding.
        if ((Ext.isIEQuirks || Ext.isIE7m) && me.isShrinkWrapTpl && padding.right) {
            ownerContext.outerCtContext.setProp('width',
                containerSize.width + padding.left);
        }
    }

});
