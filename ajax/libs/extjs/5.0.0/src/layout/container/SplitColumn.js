/**
 * This layout extends `Ext.layout.container.Column` and adds splitters between adjacent
 * columns allowing the user to resize them.
 * @private
 */
Ext.define('Ext.layout.container.SplitColumn', {
    extend: 'Ext.layout.container.Column',
    alias: 'layout.split-column',

    requires: [
        'Ext.layout.container.ColumnSplitter'
    ],

    type: 'split-column',

    firstColumnCls: Ext.baseCSSPrefix + 'split-column-first',

    lastColumnCls: Ext.baseCSSPrefix + 'split-column-last',

    /*
     * The geometry of a Column layout with splitters between respective items:
     *
     *             0        1      2       3        4
     *      +-----------------------------------------------+
     *      | +-----------+ || +---------+ || +-----------+ | \
     *      | |           | || |         | || |           | |  \
     *      | |           | || |         | || |           | |   \
     *      | |           | || |         | || |           | |    \
     *      | +-----------+ || |         | || |           | |   row[0]
     *      |               || |         | || |           | |    /
     *      |               || |         | || |           | |   /
     *      |               || |         | || +-----------+ |  /
     *      |               || |         | ||               | /
     *      |               || +---------+ ||               |
     *      | +-------------------+ || +------------------+ | \
     *      | |                   | || |                  | |  \
     *      | |                   | || |                  | |   \
     *      | |                   | || |                  | |  row[1]
     *      | |                   | || |                  | |   /
     *      | |                   | || +------------------+ |  /
     *      | +-------------------+ ||                      | /
     *      +-----------------------------------------------+
     *                  6           7            8
     *
     * The splitter between 4 and 6 will be hidden but still present in the items. It is
     * considered part of row[0].
     */

    getSplitterConfig: function () {
        return {
           xtype: 'columnsplitter'
        };
    },

    beginLayout: function (ownerContext) {
        this.callParent([ownerContext]);

        // We need to reset the heights of the splitters so that they don't influence the
        // layout (mostly overflow management).
        var childItems = ownerContext.childItems,
            rows = (ownerContext.rows = []),
            length = childItems.length,
            totalWidth = 2,
            child, i, prev, row, splitter, target, width;

        for (i = 0; i < length; ++i) {
            target = (child = childItems[i]).target;
            splitter = target.isSplitter;
            width = splitter ? 0 : target.columnWidth;

            if (totalWidth + width > 1) {
                if (prev) {
                    // We have wrapped and we have a previous item which is a splitter by
                    // definition. We have previously seen that splitter and setHeight(1)
                    // on it. We now setHeight(0) to effectively hide it.
                    prev.el.setHeight(0);
                    prev.orphan = 1;
                }
                totalWidth = 0;
                rows.push(row = {
                    index: rows.length,
                    items: [],
                    maxHeight: 0
                });
            }

            totalWidth += width;
            row.items.push(child);
            child.row = row;

            if (splitter) {
                child.el.setHeight(1);
            }

            prev = child;
        }
    },

    beforeLayoutCycle: function (ownerContext) {
        var me = this,
            items = me.owner.items;

        // We need to do this in beforeLayoutCycle because this changes the child items
        // and hence needs to be considered before recursing.
        if (me.splitterGen !== items.generation) {
            me.syncSplitters();
            me.syncFirstLast();

            // The syncSplitters call will change items.generation so do this last.
            me.splitterGen = items.generation;
        }

        me.callParent(arguments);
    },

    finishedLayout: function (ownerContext) {
        var items = ownerContext.childItems,
            len = items.length,
            box, child, i, target, row;

        this.callParent([ownerContext]);

        for (i = 0; i < len; i += 2) {
            target = (child = items[i]).target;
            box = target.lastBox;
            row = child.row;
            row.maxHeight = Math.max(row.maxHeight, box.height);

            // Put this on the component so that it gets saved (we use this to fix up
            // columnWidth on restore)
            //target.width = box.width;
        }

        for (i = 1; i < len; i += 2) {
            target = (child = items[i]).target;
            if (!child.orphan) {
                target.el.setHeight(child.row.maxHeight);
            }
        }
    },

    /**
     * This method synchronizes the splitters so that we have exactly one between each
     * column.
     * @private
     */
    syncSplitters: function () {
        var me = this,
            owner = me.owner,
            items = owner.items.items,
            index = items.length,
            ok = true,
            shouldBeSplitter = false,
            item, splitter;

        // Walk backwards over the items so that an insertion index is stable.
        while (index-- > 0) {
            item = items[index];

            if (shouldBeSplitter) {
                if (item.isSplitter) {
                    shouldBeSplitter = false;
                } else {
                    // An item is adjacent to an item, so inject a splitter beyond
                    // the current item to separate the columns. Keep shouldBeSplitter
                    // at true since we just encountered an item.
                    if (ok) {
                        ok = false;
                        owner.suspendLayouts();
                    }
                    splitter = owner.add(index+1, me.getSplitterConfig());
                }
            } else {
                if (item.isSplitter) {
                    // A splitter is adjacent to a splitter so we remove this one. We
                    // leave shouldBeSplitter at false because the next thing we see
                    // should still not be a splitter.
                    if (ok) {
                        ok = false;
                        owner.suspendLayouts();
                    }
                    owner.remove(item);
                } else {
                    shouldBeSplitter = true;
                }
            }
        }

        // It is possible to exit the above with a splitter as the first item, but
        // this is invalid so remove any such splitters.
        while (items.length && (item = items[0]).isSplitter) {
            if (ok) {
                ok = false;
                owner.suspendLayouts();
            }
            owner.remove(item);
        }

        if (!ok) {
            owner.resumeLayouts();
        }
    },

    syncFirstLast: function () {
        var me = this,
            items = me.owner.items.items,
            firstCls = me.firstColumnCls,
            lastCls = me.lastColumnCls,
            len = items.length,
            firstAndLast = [firstCls, lastCls],
            i, item, last;

        for (i = 0; i < len; i += 2) { // skip splitters
            item = items[i];
            last = (i === len-1);

            if (!i) { // if (first)
                if (last) {
                    item.addCls(firstAndLast);
                } else {
                    item.addCls(firstCls);
                    item.removeCls(lastCls);
                }
            } else if (last) {
                item.addCls(lastCls);
                item.removeCls(firstCls);
            } else {
                item.removeCls(firstAndLast);
            }
        }
    }
});
