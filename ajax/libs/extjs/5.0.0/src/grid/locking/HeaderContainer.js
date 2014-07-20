/**
 * Private class which acts as a HeaderContainer for the Lockable which aggregates all columns
 * from both sides of the Lockable. It is never rendered, it's just used to interrogate the
 * column collection.
 * @private
 */
Ext.define('Ext.grid.locking.HeaderContainer', {
    extend: 'Ext.grid.header.Container',
    requires: [
        'Ext.grid.ColumnManager'
    ],

    headerCtRelayEvents: [
        "blur",
        "focus",
        "move",
        "resize",
        "destroy",
        "beforedestroy",
        "boxready",
        "afterrender",
        "render",
        "beforerender",
        "removed",
        "hide",
        "beforehide",
        "show",
        "beforeshow",
        "enable",
        "disable",
        "added",
        "deactivate",
        "beforedeactivate",
        "activate",
        "beforeactivate",
        "remove",
        "add",
        "beforeremove",
        "beforeadd",
        "afterlayout",
        "menucreate",
        "sortchange",
        "columnschanged",
        "columnshow",
        "columnhide",
        "columnmove",
        "headertriggerclick",
        "headercontextmenu",
        "headerclick",
        "columnresize",
        "statesave",
        "beforestatesave",
        "staterestore",
        "beforestaterestore"
    ],

    constructor: function(lockable) {
        var me = this,
            lockedGrid = lockable.lockedGrid,
            normalGrid = lockable.normalGrid;

        me.lockable = lockable;
        me.callParent();

        // Create the unified column manager for the lockable grid assembly
        lockedGrid.visibleColumnManager.rootColumns =
            normalGrid.visibleColumnManager.rootColumns =
            lockable.visibleColumnManager =
            me.visibleColumnManager = new Ext.grid.ColumnManager(true, lockedGrid.headerCt, normalGrid.headerCt);
            
        lockedGrid.columnManager.rootColumns =
            normalGrid.columnManager.rootColumns =
            lockable.columnManager =
            me.columnManager = new Ext.grid.ColumnManager(false, lockedGrid.headerCt, normalGrid.headerCt);

        // Relay *all* events from the two HeaderContainers
        me.relayEvents(lockedGrid.headerCt, me.headerCtRelayEvents);
        me.relayEvents(normalGrid.headerCt, me.headerCtRelayEvents);
    },

    getRefItems: function() {
        return this.lockable.lockedGrid.headerCt.getRefItems().concat(this.lockable.normalGrid.headerCt.getRefItems());
    },

    // This is the function which all other column access methods are based upon
    // Return the full column set for the whole Lockable assembly
    getGridColumns: function() {
        return this.lockable.lockedGrid.headerCt.getGridColumns().concat(this.lockable.normalGrid.headerCt.getGridColumns());
    },

    // Lockable uses its headerCt to gather column state
    getColumnsState: function () {
        var me = this,
            locked = me.lockable.lockedGrid.headerCt.getColumnsState(),
            normal = me.lockable.normalGrid.headerCt.getColumnsState();

        return locked.concat(normal);
    },

    // Lockable uses its headerCt to apply column state
    applyColumnsState: function (columns) {
        var me             = this,
            lockedGrid     = me.lockable.lockedGrid,
            lockedHeaderCt = lockedGrid.headerCt,
            normalHeaderCt = me.lockable.normalGrid.headerCt,
            lockedCols     = Ext.Array.toValueMap(lockedHeaderCt.items.items, 'headerId'),
            normalCols     = Ext.Array.toValueMap(normalHeaderCt.items.items, 'headerId'),
            locked         = [],
            normal         = [],
            lockedWidth    = 1,
            length         = columns.length,
            i, existing,
            lockedDefault,
            col;

        for (i = 0; i < length; i++) {
            col = columns[i];

            lockedDefault = lockedCols[col.id];
            existing = lockedDefault || normalCols[col.id];

            if (existing) {
                if (existing.applyColumnState) {
                    existing.applyColumnState(col);
                }
                if (existing.locked === undefined) {
                    existing.locked = !!lockedDefault;
                }
                if (existing.locked) {
                    locked.push(existing);
                    if (!existing.hidden && typeof existing.width == 'number') {
                        lockedWidth += existing.width;
                    }
                } else {
                    normal.push(existing);
                }
            }
        }

        // state and config must have the same columns (compare counts for now):
        if (locked.length + normal.length == lockedHeaderCt.items.getCount() + normalHeaderCt.items.getCount()) {
            lockedHeaderCt.removeAll(false);
            normalHeaderCt.removeAll(false);

            lockedHeaderCt.add(locked);
            normalHeaderCt.add(normal);

            lockedGrid.setWidth(lockedWidth);
        }
    }
});