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
 * Implements row based navigation via keyboard.
 *
 * Must synchronize across grid sections.
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

    constructor: function() {
        this.addEvents(
            /**
             * @event beforedeselect
             * Fired before a record is deselected. If any listener returns false, the
             * deselection is cancelled.
             * @param {Ext.selection.RowModel} this
             * @param {Ext.data.Model} record The deselected record
             * @param {Number} index The row index deselected
             */
            'beforedeselect',

            /**
             * @event beforeselect
             * Fired before a record is selected. If any listener returns false, the
             * selection is cancelled.
             * @param {Ext.selection.RowModel} this
             * @param {Ext.data.Model} record The selected record
             * @param {Number} index The row index selected
             */
            'beforeselect',

            /**
             * @event deselect
             * Fired after a record is deselected
             * @param {Ext.selection.RowModel} this
             * @param {Ext.data.Model} record The deselected record
             * @param {Number} index The row index deselected
             */
            'deselect',

            /**
             * @event select
             * Fired after a record is selected
             * @param {Ext.selection.RowModel} this
             * @param {Ext.data.Model} record The selected record
             * @param {Number} index The row index selected
             */
            'select'
        );
        this.views = [];
        this.callParent(arguments);
    },

    bindComponent: function(view) {
        var me = this;

        view.on({
            itemmousedown: me.onRowMouseDown,
            itemclick: me.onRowClick,
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
                me.afterKeyNavigate(e, newRecord)
            });
        } else {
            me.afterKeyNavigate(e, view.getRecord(view.all.getCount() - 1))
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
                me.afterKeyNavigate(e, newRecord)
            });
        } else {
            me.afterKeyNavigate(e, view.getRecord(0));
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
                (me.lastKeyEvent || (me.lastKeyEvent = new Ext.EventObjectImpl())).setEvent(e.browserEvent);
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
                (me.lastKeyEvent || (me.lastKeyEvent = new Ext.EventObjectImpl())).setEvent(e.browserEvent);
                view.bufferedRenderer.scrollTo(newIdx, false, me.afterBufferedScrollTo, me);
            } else {
                newRecord = view.walkRecs(e.record, rowsVisible);
                me.afterKeyNavigate(e, newRecord);
            }
        }
    },

    // Select/Deselect based on pressing Spacebar.
    onKeySpace: function(e) {
        var record = this.lastFocused;

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
        var newRecord = this.views[0].walkRecs(e.record, 1);

        if (newRecord) {
            this.afterKeyNavigate(e, newRecord);
        }
    },

    afterBufferedScrollTo: function(newIdx, newRecord) {
        this.afterKeyNavigate(this.lastKeyEvent, newRecord)
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
    onRowMouseDown: function(view, record, item, index, e) {
        var me = this;
        
        // Record index will be -1 if the clicked record is a metadata record and not selectable
        if (index !== -1) {
            if (!me.allowRightMouseSelection(e)) {
                return;
            }

            if (!me.isSelected(record)) {
                me.mousedownAction = true;
                me.processSelection(view, record, item, index, e);
            } else {
                me.mousedownAction = false;
            }
        }
    },
    
    // If the mousedown event is vetoed, we still want to treat it as though we've had
    // a mousedown because we don't want to proceed on click. For example, the click on
    // an action column vetoes the mousedown event so the click isn't processed.
    onVetoUIEvent: function(type, view, cell, rowIndex, cellIndex, e, record){
        if (type == 'mousedown') {
            this.mousedownAction = !this.isSelected(record);
        }
    },

    onRowClick: function(view, record, item, index, e) {
        if (this.mousedownAction) {
            this.mousedownAction = false;
        } else {
            this.processSelection(view, record, item, index, e);
        }
    },
    
    processSelection: function(view, record, item, index, e) {
        this.selectWithEvent(record, e);
    },

    /**
     * Checks whether a selection should proceed based on the ignoreRightMouseSelection
     * option.
     * @private
     * @param {Ext.EventObject} e The event
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
            i = 0;

        if ((suppressEvent || me.fireEvent('before' + eventName, me, record, rowIdx)) !== false &&
                commitFn() !== false) {

            for (; i < viewsLn; i++) {
                if (isSelected) {
                    views[i].onRowSelect(rowIdx, suppressEvent);
                } else {
                    views[i].onRowDeselect(rowIdx, suppressEvent);
                }
            }

            if (!suppressEvent) {
                me.fireEvent(eventName, me, record, rowIdx);
            }
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
            if (rowIdx != -1) {
                for (; i < viewsLn; i++) {
                    views[i].onRowFocus(rowIdx, false, true);
                }
            }
        }

        if (newFocused) {
            rowIdx = views[0].indexOf(newFocused);
            if (rowIdx != -1) {
                for (i = 0; i < viewsLn; i++) {
                    views[i].onRowFocus(rowIdx, true, supressFocus);
                }
            }
        }
        this.callParent(arguments);
    },

    onEditorTab: function(editingPlugin, e) {
        var me = this,
            view = me.views[0],
            record = editingPlugin.getActiveRecord(),
            header = editingPlugin.getActiveColumn(),
            position = view.getPosition(record, header),
            direction = e.shiftKey ? 'left' : 'right';

        // We want to continue looping while:
        // 1) We have a valid position
        // 2) There is no editor at that position
        // 3) There is an editor, but editing has been cancelled (veto event)

        do {
            position  = view.walkCells(position, direction, e, me.preventWrap);
        } while (position && (!position.columnHeader.getEditor(record) || !editingPlugin.startEditByPosition(position)));
    },

    /**
     * Returns position of the first selected cell in the selection in the format {row: row, column: column}
     */
    getCurrentPosition: function() {
        var firstSelection = this.selected.items[0];
        if (firstSelection) {
            return new Ext.grid.CellContext(this.view).setPosition(this.store.indexOf(firstSelection), 0);
        }
    },

    selectByPosition: function(position) {
        this.select(this.store.getAt(position.row));
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

    isRowSelected: function(record, index) {
        return this.isSelected(record);
    }
});