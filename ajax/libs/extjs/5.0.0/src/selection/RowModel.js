/**
 * A selection model for {@link Ext.grid.Panel grid panels} which allows selection grid rows..
 *
 * Implements row based navigation via keyboard.
 *
 *     @example
 *     var store = Ext.create('Ext.data.Store', {
 *         fields  : ['name', 'email', 'phone'],
 *         data    : {
 *             items : [
 *                 { name : 'Lisa',  email : 'lisa@simpsons.com',  phone : '555-111-1224' },
 *                 { name : 'Bart',  email : 'bart@simpsons.com',  phone : '555-222-1234' },
 *                 { name : 'Homer', email : 'homer@simpsons.com', phone : '555-222-1244' },
 *                 { name : 'Marge', email : 'marge@simpsons.com', phone : '555-222-1254' }
 *             ]
 *         },
 *         proxy   : {
 *             type   : 'memory',
 *             reader : {
 *                 type : 'json',
 *                 root : 'items'
 *             }
 *         }
 *     });
 *     Ext.create('Ext.grid.Panel', {
 *         title    : 'Simpsons',
 *         store    : store,
 *         width    : 400,
 *         renderTo : Ext.getBody(),
 *         columns  : [
 *             { text : 'Name',  dataIndex : 'name'  },
 *             { text : 'Email', dataIndex : 'email', flex : 1 },
 *             { text : 'Phone', dataIndex : 'phone' }
 *         ]
 *     });
 */
Ext.define('Ext.selection.RowModel', {
    extend: 'Ext.selection.Model',
    alias: 'selection.rowmodel',
    requires: ['Ext.util.KeyNav'],

    /**
     * @private
     * Number of pixels to scroll to the left/right when pressing
     * left/right keys.
     */
    deltaScroll: 5,

    /**
     * @cfg {Boolean} enableKeyNav
     *
     * Turns on/off keyboard navigation within the grid.
     */
    enableKeyNav: true,

    /**
     * @cfg {Boolean} [ignoreRightMouseSelection=false]
     * True to ignore selections that are made when using the right mouse button if there are
     * records that are already selected. If no records are selected, selection will continue
     * as normal
     */
    ignoreRightMouseSelection: false,

    /**
     * @event beforedeselect
     * Fired before a record is deselected. If any listener returns false, the
     * deselection is cancelled.
     * @param {Ext.selection.RowModel} this
     * @param {Ext.data.Model} record The deselected record
     * @param {Number} index The row index deselected
     */

    /**
     * @event beforeselect
     * Fired before a record is selected. If any listener returns false, the
     * selection is cancelled.
     * @param {Ext.selection.RowModel} this
     * @param {Ext.data.Model} record The selected record
     * @param {Number} index The row index selected
     */

    /**
     * @event deselect
     * Fired after a record is deselected
     * @param {Ext.selection.RowModel} this
     * @param {Ext.data.Model} record The deselected record
     * @param {Number} index The row index deselected
     */

    /**
     * @event select
     * Fired after a record is selected
     * @param {Ext.selection.RowModel} this
     * @param {Ext.data.Model} record The selected record
     * @param {Number} index The row index selected
     */

    isRowModel: true,

    constructor: function() {
        this.views = [];
        this.callParent(arguments);
    },

    bindComponent: function(view) {
        var me = this;

        view.on({
            // Because we used to select on mousedown, contextmenu (right click) used to also select.
            // Now we use click, for backward compatibility, we need to select on contextmenu too.
            // Apps may assume that contextmenu selects: https://sencha.jira.com/browse/EXTJSIV-11297
            rowcontextmenu: me.onRowClick,
            rowclick: me.onRowClick,
            scope: me
        });

        if (me.enableKeyNav) {
            me.initKeyNav(view);
        }
    },

    initKeyNav: function(view) {
        var me = this;

        if (!view.rendered) {
            view.on('render', Ext.Function.bind(me.initKeyNav, me, [view], 0), me, {single: true});
            return;
        }

        // view.el has tabIndex -1 to allow for
        // keyboard events to be passed to it.
        view.el.set({
            tabIndex: -1
        });

        // Drive the KeyNav off the View's itemkeydown event so that beforeitemkeydown listeners may veto
        me.keyNav = new Ext.util.KeyNav({
            target: view,
            ignoreInputFields: true,
            eventName: 'itemkeydown',
            processEvent: function(view, record, node, index, event) {
                event.record = record;
                event.recordIndex = index;
                return event;
            },
            up: me.onKeyUp,
            down: me.onKeyDown,
            right: me.onKeyRight,
            left: me.onKeyLeft,
            pageDown: me.onKeyPageDown,
            pageUp: me.onKeyPageUp,
            home: me.onKeyHome,
            end: me.onKeyEnd,
            space: me.onKeySpace,
            enter: me.onKeyEnter,
            A: {
                ctrl: true,
                handler: me.selectAll
            },
            scope: me
        });
    },

    onUpdate: function(record) {
        var me = this,
            view = me.view,
            index;

        if (view && me.isSelected(record)) {
            index = view.indexOf(record);
            view.onRowSelect(index);
            if (record === me.lastFocused) {
                view.onRowFocus(index, true);
            }
        }
    },

    // Returns the number of rows currently visible on the screen or
    // false if there were no rows. This assumes that all rows are
    // of the same height and the first view is accurate.
    getRowsVisible: function() {
        var rowsVisible = false,
            view = this.views[0],
            firstRow = view.all.first(),
            rowHeight, gridViewHeight;

        if (firstRow) {
            rowHeight = firstRow.getHeight();
            gridViewHeight = view.el.getHeight();
            rowsVisible = Math.floor(gridViewHeight / rowHeight);
        }

        return rowsVisible;
    },

    // go to last visible record in grid.
    onKeyEnd: function(e) {
        var me = this,
            view = me.views[0];

        if (view.bufferedRenderer) {
            // If rendering is buffered, we cannot just increment the row - the row may not be there
            // We have to ask the BufferedRenderer to navigate to the target.
            // And that may involve asynchronous I/O, so must postprocess in a callback.
            view.bufferedRenderer.scrollTo(me.store.getCount() - 1, false, function(newIdx, newRecord) {
                me.afterKeyNavigate(e, newRecord);
            });
        } else {
            // Walk forwards to the end record
            me.afterKeyNavigate(e, view.walkRecs(e.record, view.dataSource.getCount() - 1 - view.dataSource.indexOf(e.record)));
        }
    },

    // go to first visible record in grid.
    onKeyHome: function(e) {
        var me = this,
            view = me.views[0];

        if (view.bufferedRenderer) {
            // If rendering is buffered, we cannot just increment the row - the row may not be there
            // We have to ask the BufferedRenderer to navigate to the target.
            // And that may involve asynchronous I/O, so must postprocess in a callback.
            view.bufferedRenderer.scrollTo(0, false, function(newIdx, newRecord) {
                me.afterKeyNavigate(e, newRecord);
            });
        } else {
            // Walk forwards to the first record
            me.afterKeyNavigate(e, view.walkRecs(e.record, -view.dataSource.indexOf(e.record)));
        }
    },

    // Go one page up from the lastFocused record in the grid.
    onKeyPageUp: function(e) {
        var me = this,
            view = me.views[0],
            rowsVisible = me.getRowsVisible(),
            newIdx,
            newRecord;

        if (rowsVisible) {
            // If rendering is buffered, we cannot just increment the row - the row may not be there
            // We have to ask the BufferedRenderer to navigate to the target.
            // And that may involve asynchronous I/O, so must postprocess in a callback.
            if (view.bufferedRenderer) {
                newIdx = Math.max(e.recordIndex - rowsVisible, 0);
                me.lastKeyEvent = e;
                view.bufferedRenderer.scrollTo(newIdx, false, me.afterBufferedScrollTo, me);
            } else {
                newRecord = view.walkRecs(e.record, -rowsVisible);
                me.afterKeyNavigate(e, newRecord);
            }
        }
    },

    // Go one page down from the lastFocused record in the grid.
    onKeyPageDown: function(e) {
        var me = this,
            view = me.views[0],
            rowsVisible = me.getRowsVisible(),
            newIdx,
            newRecord;

        if (rowsVisible) {
            // If rendering is buffered, we cannot just increment the row - the row may not be there
            // We have to ask the BufferedRenderer to navigate to the target.
            // And that may involve asynchronous I/O, so must postprocess in a callback.
            if (view.bufferedRenderer) {
                newIdx = Math.min(e.recordIndex + rowsVisible, me.store.getCount() - 1);
                me.lastKeyEvent = e;
                view.bufferedRenderer.scrollTo(newIdx, false, me.afterBufferedScrollTo, me);
            } else {
                newRecord = view.walkRecs(e.record, rowsVisible);
                me.afterKeyNavigate(e, newRecord);
            }
        }
    },

    // Select/Deselect based on pressing Spacebar.
    onKeySpace: function(e) {
        // KeyNav's processEvent stamps the record in.
        var record = e.record || this.lastFocused;

        if (record) {
            this.afterKeyNavigate(e, record);
        }
    },

    onKeyEnter: Ext.emptyFn,

    // Navigate one record up. This could be a selection or
    // could be simply focusing a record for discontiguous
    // selection. Provides bounds checking.
    onKeyUp: function(e) {
        var newRecord = this.views[0].walkRecs(e.record, -1);

        if (newRecord) {
            this.afterKeyNavigate(e, newRecord);
        }
    },

    // Navigate one record down. This could be a selection or
    // could be simply focusing a record for discontiguous
    // selection. Provides bounds checking.
    onKeyDown: function(e) {
        // If we are in the middle of an animated node expand, jump to next sibling.
        // The first child record is in a temp animation DIV and will be removed, so will blur.
        var newRecord = e.record.isExpandingOrCollapsing ? null : this.views[0].walkRecs(e.record, 1);

        if (newRecord) {
            this.afterKeyNavigate(e, newRecord);
        }
    },

    afterBufferedScrollTo: function(newIdx, newRecord) {
        this.afterKeyNavigate(this.lastKeyEvent, newRecord);
    },

    scrollByDeltaX: function(delta) {
        var view    = this.views[0],
            section = view.up(),
            hScroll = section.horizontalScroller;

        if (hScroll) {
            hScroll.scrollByDeltaX(delta);
        }
    },

    onKeyLeft: function(e) {
        this.scrollByDeltaX(-this.deltaScroll);
    },

    onKeyRight: function(e) {
        this.scrollByDeltaX(this.deltaScroll);
    },

    // Select the record with the event included so that
    // we can take into account ctrlKey, shiftKey, etc
    onRowClick: function(view, record, row, index, e) {
        var me = this;

        // Record index will be -1 if the clicked record is a metadata record and not selectable
        if (index !== -1) {
            if (!me.allowRightMouseSelection(e)) {
                return;
            }

            // Don't process if it's a right-click over a previously selected record.
            if (!(e.type === 'contextmenu' && this.isSelected(record))) {
                me.processSelection(view, record, row, index, e);
            }
        }
    },

    // May be overridden by a subclass to process a click in different ways
    processSelection: function(view, record, item, index, e) {
        this.selectWithEvent(record, e);
    },

    /**
     * Checks whether a selection should proceed based on the ignoreRightMouseSelection
     * option.
     * @private
     * @param {Ext.event.Event} e The event
     * @return {Boolean} False if the selection should not proceed
     */
    allowRightMouseSelection: function(e) {
        var disallow = this.ignoreRightMouseSelection && e.button !== 0;
        if (disallow) {
            disallow = this.hasSelection();
        }
        return !disallow;
    },

    // Allow the GridView to update the UI by
    // adding/removing a CSS class from the row.
    onSelectChange: function(record, isSelected, suppressEvent, commitFn) {
        var me      = this,
            views   = me.views,
            viewsLn = views.length,
            rowIdx  = views[0].indexOf(record),
            eventName = isSelected ? 'select' : 'deselect',
            i, view;

        if ((suppressEvent || me.fireEvent('before' + eventName, me, record, rowIdx)) !== false &&
                commitFn() !== false) {

            for (i = 0; i < viewsLn; i++) {
                view = views[i];
                if (isSelected) {
                    view.onRowSelect(rowIdx, suppressEvent);
                } else {
                    view.onRowDeselect(rowIdx, suppressEvent);
                }

                me.publishSelection(isSelected ? record : null);
            }

            if (!suppressEvent) {
                me.fireEvent(eventName, me, record, rowIdx);
            }
        }
    },

    publishSelection: function(record) {
        var me = this,
            single = me.selectionMode === "SINGLE",
            grid = me.views[0].ownerGrid,
            publishes;

        if (me.setupPublish || (single && grid.reference)) {
            if (!me.setupPublish) {
                me.setupPublish = true;
                publishes = grid.getPublishes() || {};
                publishes.selection = 1;
                grid.setPublishes(publishes);
            }
            me.lastPublish = record;
            grid.publishState('selection', record);
        }
    },

    onPrune: function(rec) {
        var me = this;
        if (me.lastPublish === rec) {
            me.publishSelection(null);
        }
    },

    // Provide indication of what row was last focused via
    // the gridview.
    onLastFocusChanged: function(oldFocused, newFocused, supressFocus) {
        var views   = this.views,
            viewsLn = views.length,
            rowIdx,
            i = 0;

        if (oldFocused) {
            rowIdx = views[0].indexOf(oldFocused);
            if (rowIdx !== -1) {
                for (; i < viewsLn; i++) {
                    views[i].onRowFocus(rowIdx, false, true);
                }
            }
        }

        if (newFocused) {
            rowIdx = views[0].indexOf(newFocused);
            if (rowIdx !== -1) {
                for (i = 0; i < viewsLn; i++) {
                    views[i].onRowFocus(rowIdx, true, supressFocus);
                }
            }
        }
        this.callParent(arguments);
    },

    onEditorTab: function(editingPlugin, e) {
        var me = this,
            view = editingPlugin.context.view,
            record = editingPlugin.getActiveRecord(),
            header = editingPlugin.getActiveColumn(),
            position = view.getPosition(record, header),
            direction = e.shiftKey ? 'left' : 'right',
            lastPos;

        // We want to continue looping while:
        // 1) We have a valid position
        // 2) There is no editor at that position
        // 3) There is an editor, but editing has been cancelled (veto event)

        do {
            lastPos = position;
            position  = view.walkCells(position, direction, e, me.preventWrap);
            if (lastPos && lastPos.isEqual(position)) {
                // If we end up with the same result twice, it means that we weren't able to progress
                // via walkCells, for example if the remaining records are non-record rows, so gracefully
                // fall out here.
                return;
            }
        } while (position && (!position.columnHeader.getEditor(record) || !editingPlugin.startEditByPosition(position)));
    },

    /**
     * Returns position of the first selected cell in the selection in the format {row: row, column: column}
     */
    getCurrentPosition: function() {
        var firstSelection = this.selected.getAt(0);
        if (firstSelection) {
            return new Ext.grid.CellContext(this.view).setPosition(this.store.indexOf(firstSelection), 0);
        }
    },

    selectByPosition: function (position, keepExisting) {
        var context = new Ext.grid.CellContext(this.view);
            
        context.setPosition(position.row, position.column);
        this.select(context.record, keepExisting);
    },

    /**
     * Selects the record immediately following the currently selected record.
     * @param {Boolean} [keepExisting] True to retain existing selections
     * @param {Boolean} [suppressEvent] Set to false to not fire a select event
     * @return {Boolean} `true` if there is a next record, else `false`
     */
    selectNext: function(keepExisting, suppressEvent) {
        var me = this,
            store = me.store,
            selection = me.getSelection(),
            record = selection[selection.length - 1],
            index = me.views[0].indexOf(record) + 1,
            success;

        if (index === store.getCount() || index === 0) {
            success = false;
        } else {
            me.doSelect(index, keepExisting, suppressEvent);
            success = true;
        }
        return success;
    },

    /**
     * Selects the record that precedes the currently selected record.
     * @param {Boolean} [keepExisting] True to retain existing selections
     * @param {Boolean} [suppressEvent] Set to false to not fire a select event
     * @return {Boolean} `true` if there is a previous record, else `false`
     */
    selectPrevious: function(keepExisting, suppressEvent) {
        var me = this,
            selection = me.getSelection(),
            record = selection[0],
            index = me.views[0].indexOf(record) - 1,
            success;

        if (index < 0) {
            success = false;
        } else {
            me.doSelect(index, keepExisting, suppressEvent);
            success = true;
        }
        return success;
    },

    isRowSelected: function(record) {
        return this.isSelected(record);
    },

    isCellSelected: function(view, record, columnHeader) {
        return this.isSelected(record);
    } 
});
