/**
 * A selection model for {@link Ext.grid.Panel grid panels} which allows selection of a single cell at a time.
 *
 * Implements cell based navigation via keyboard.
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
 *         ],
 *         selType: 'cellmodel'
 *     });
 */
Ext.define('Ext.selection.CellModel', {
    extend: 'Ext.selection.Model',
    alias: 'selection.cellmodel',
    requires: [
        'Ext.grid.CellContext',
        'Ext.util.KeyNav'
    ],

    /**
     * @cfg {"SINGLE"} mode
     * Mode of selection.  Valid values are:
     *
     * - **"SINGLE"** - Only allows selecting one item at a time. This is the default.
     */


    isCellModel: true,

    /**
     * @cfg {Boolean} enableKeyNav
     * Turns on/off keyboard navigation within the grid.
     */
    enableKeyNav: true,

    /**
     * @cfg {Boolean} preventWrap
     * Set this configuration to true to prevent wrapping around of selection as
     * a user navigates to the first or last column.
     */
    preventWrap: false,

    // private property to use when firing a deselect when no old selection exists.
    noSelection: {
        row: -1,
        column: -1
    },

    /**
     * @event deselect
     * Fired after a cell is deselected
     * @param {Ext.selection.CellModel} this
     * @param {Ext.data.Model} record The record of the deselected cell
     * @param {Number} row The row index deselected
     * @param {Number} column The column index deselected
     */

    /**
     * @event select
     * Fired after a cell is selected
     * @param {Ext.selection.CellModel} this
     * @param {Ext.data.Model} record The record of the selected cell
     * @param {Number} row The row index selected
     * @param {Number} column The column index selected
     */

    bindComponent: function(view) {
        var me = this,
            grid = view.ownerCt;
        me.primaryView = view;
        me.views = me.views || [];
        me.views.push(view);
        me.bindStore(view.getStore(), true);

        view.on({
            cellclick: me.onCellClick,
            refresh: me.onViewRefresh,
            scope: me
        });
        if (grid.optimizedColumnMove !== false) {
            grid.on('columnmove', me.onColumnMove, me);
        }

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

        view.el.set({
            tabIndex: -1
        });

        // view.el has tabIndex -1 to allow for
        // keyboard events to be passed to it.
        me.keyNav = new Ext.util.KeyNav({
            target: view.el,
            ignoreInputFields: true,
            up: me.onKeyUp,
            down: me.onKeyDown,
            right: me.onKeyRight,
            left: me.onKeyLeft,
            tab: me.onKeyTab,
            scope: me
        });
    },

    getHeaderCt: function() {
        var selection = this.getCurrentPosition(),
            view = selection ? selection.view : this.primaryView;

        return view.headerCt;
    },

    onKeyUp: function(e) {
        this.doMove('up', e);
    },

    onKeyDown: function(e) {
        this.doMove('down', e);
    },

    onKeyLeft: function(e) {
        this.doMove('left', e);
    },

    onKeyRight: function(e) {
        this.doMove('right', e);
    },

    doMove: function(direction, e){
        this.keyNavigation = true;
        this.move(direction, e);
        this.keyNavigation = false;
    },

    selectWithEvent: function(record, e) {
        this.select(record);
    },

    select: function(pos, keepExisting, suppressEvent) {
        var me = this,
            row,
            oldPos = me.getCurrentPosition(),
            store = me.view.store;

        if (pos || pos === 0) {
            if (pos.isModel) {
                row = store.indexOf(pos);
                if (row !== -1) {
                    pos = {
                        row: row,
                        column: oldPos ? oldPos.column : 0
                    };
                } else {
                    pos = null;
                } 
            } else if (typeof pos === 'number') {
                pos = {
                    row: pos,
                    column: 0
                };
            }
        } 

        if (pos) {
            me.selectByPosition(pos, suppressEvent);   
        } else {
            me.deselect();
        }
    },

    deselect: function(record, suppressEvent){
        this.selectByPosition(null, suppressEvent);    
    },

    move: function(dir, e) {
        var me = this,
            pos = me.getCurrentPosition(),
            newPos;

        if (pos) {
            // Calculate the new row and column position
            newPos = pos.view.walkCells(pos, dir, e, me.preventWrap);
            // If walk was successful, select new Position
            if (newPos) {
                return me.setCurrentPosition(newPos);
            }
        }
        // <debug>
        // Enforce code correctness in unbuilt source.
        return null;
        // </debug>
    },

    /**
     * Returns the current position in the format {row: row, column: column}
     */
    getCurrentPosition: function() {
        // If it's during a select, return nextSelection since we buffer
        // the real selection until after the event fires
        return this.selecting ? this.nextSelection : this.selection;
    },

    /**
     * Sets the current position
     * @param {Object} position The position to set.
     * @param {Boolean} suppressEvent True to suppress selection events
     */
    setCurrentPosition: function(pos, suppressEvent, /* private */ preventCheck) {
        var me = this,
            last = me.selection;

        // onSelectChange uses lastSelection and nextSelection
        me.lastSelection = last;

        // Normalize it into an Ext.grid.CellContext if necessary
        if (pos) {
            pos = pos.isCellContext ? pos : new Ext.grid.CellContext(me.primaryView).setPosition(pos);
        }
        if (!preventCheck && last) {
            // If the position is the same, jump out & don't fire the event
            if (pos && (pos.record === last.record && pos.columnHeader === last.columnHeader && pos.view === last.view)) {
                pos = null;
            } else {
                me.onCellDeselect(me.selection, suppressEvent);
            }
        }

        if (pos) {
            me.nextSelection = pos;
            // set this flag here so we know to use nextSelection
            // if the node is updated during a select
            me.selecting = true;
            me.onCellSelect(me.nextSelection, suppressEvent);
            me.selecting = false;
            // Deselect triggered by new selection will kill the selection property, so restore it here.
            return (me.selection = pos);
        }
        // <debug>
        // Enforce code correctness in unbuilt source.
        return null;
        // </debug>
    },

    isCellSelected: function(view, row, column) {
        var me = this,
            testPos,
            pos = me.getCurrentPosition();

        if (pos && pos.view === view) {
            testPos = new Ext.grid.CellContext(view).setPosition({
                row: row,
                column: column
            });
            return (testPos.record === pos.record) && (testPos.columnHeader === pos.columnHeader);
        }
    },

    // Keep selection model in consistent state upon record deletion.
    onStoreRemove: function(store, records, indexes) {
        var me = this,
            pos = me.getCurrentPosition();

        me.callParent(arguments);
        if (pos && store.getCount() && store.indexOf(pos.record) !== -1) {
            me.setCurrentPosition({
                row: pos.record,
                column: pos.columnHeader
            }, true, true);
        } else {
            me.selection = null;
        }
    },
    
    onStoreClear: function() {
        this.callParent(arguments);
        this.selection = null;
    },
    
    onStoreAdd: function() {
        var me = this,
            pos = me.getCurrentPosition();

        me.callParent(arguments);
        if (pos) {
            me.setCurrentPosition({
                row: pos.record,
                column: pos.columnHeader
            }, true, true);
        } else {
            me.selection = null;
        }
    },

    /**
     * Set the current position based on where the user clicks.
     * @private
     * IMPORTANT* Due to V4.0.0 history, the cellIndex here is the index within ALL columns, including hidden.
     */
    onCellClick: function(view, cell, cellIndex, record, row, recordIndex, e) {
        var newPos;

        // Record index will be -1 if the clicked record is a metadata record and not selectable
        if (recordIndex !== -1) {
            newPos = new Ext.grid.CellContext(view).setPosition({
                view: view,
                row: row,
                // Use getColumnManager() in this context because cellIndex includes hidden columns
                column: view.ownerCt.getColumnManager().getHeaderAtIndex(cellIndex)
            });
            this.setCurrentPosition(newPos);
        }
    },

    // notify the view that the cell has been selected to update the ui
    // appropriately and bring the cell into focus
    onCellSelect: function(position, supressEvent) {
        if (position && position.row !== undefined && position.row > -1) {
            this.doSelect(position.record, /*keepExisting*/false, supressEvent);
        }
    },

    // notify view that the cell has been deselected to update the ui
    // appropriately
    onCellDeselect: function(position, supressEvent) {
        if (position && position.row !== undefined) {
            this.doDeselect(position.record, supressEvent);
        }
    },

    onSelectChange: function(record, isSelected, suppressEvent, commitFn) {
        var me = this,
            pos,
            eventName,
            view;

        if (isSelected) {
            pos = me.nextSelection;
            eventName = 'select';
        } else {
            pos = me.lastSelection || me.noSelection;
            eventName = 'deselect';
        }

        // CellModel may be shared between two sides of a Lockable.
        // The position must include a reference to the view in which the selection is current.
        // Ensure we use the view specifiied by the position.
        view = pos.view || me.primaryView;

        if ((suppressEvent || me.fireEvent('before' + eventName, me, record, pos.row, pos.column)) !== false &&
                commitFn() !== false) {

            if (isSelected) {
                if (!me.preventFocus) {
                    view.focusCell(pos, true);
                }
                view.onCellSelect(pos);
            } else {
                view.onCellDeselect(pos);
                delete me.selection;
            }

            if (!suppressEvent) {
                me.fireEvent(eventName, me, record, pos.row, pos.column);
            }
        }
    },

    // Tab key from the View's KeyNav, *not* from an editor.
    onKeyTab: function(e, t) {
        var me = this,
            pos = me.getCurrentPosition(),
            editingPlugin;

        if (pos) {
            editingPlugin = pos.view.editingPlugin;
            // If we were in editing mode, but just focused on a non-editable cell, behave as if we tabbed off an editable field
            if (editingPlugin && me.wasEditing) {
                me.onEditorTab(editingPlugin, e);
            } else {
                me.move(e.shiftKey ? 'left' : 'right', e);
            }
        }
    },

    onEditorTab: function(editingPlugin, e) {
        var me = this,
            direction = e.shiftKey ? 'left' : 'right',
            pos = me.getCurrentPosition(),
            position  = pos.view.walkCells(pos, direction, e, me.preventWrap);

        // Navigation had somewhere to go.... not hit the buffers.
        if (position) {
            // If we were able to begin editing clear the wasEditing flag. It gets set during navigation off an active edit.
            if (editingPlugin.startEdit(position.record, position.columnHeader)) {
                me.wasEditing = false;
            }
            // If we could not continue editing...
            // bring the cell into view.
            // Set a flag that we should go back into editing mode upon next onKeyTab call
            else {
                me.setCurrentPosition(position);
                me.wasEditing = true;
            }
        }
    },

    refresh: function() {
        var pos = this.getCurrentPosition(),
            selRowIdx;

        // Synchronize the current position's row with the row of the last selected record.
        if (pos && (selRowIdx = this.store.indexOf(this.selected.last())) !== -1) {
            pos.row = selRowIdx;
        }
    },

    /**
     * @private
     * When grid uses {@link Ext.panel.Table#optimizedColumnMove optimizedColumnMove} (the default), this is added as a
     * {@link Ext.panel.Table#columnmove columnmove} handler to correctly maintain the
     * selected column using the same column header.
     * 
     * If optimizedColumnMove === false, (which some grid Features set) then the view is refreshed,
     * so this is not added as a handler because the selected column.
     */
    onColumnMove: function(headerCt, header, fromIdx, toIdx) {
        var grid = headerCt.up('tablepanel');
        if (grid) {
            this.onViewRefresh(grid.view);
        }
    },
    
    onUpdate: function(record) {
        var me = this,
            pos;
            
        if (me.isSelected(record)) {
            pos = me.selecting ? me.nextSelection : me.selection; 
            me.view.onCellSelect(pos);
        }
    },

    onViewRefresh: function(view) {
        var me = this,
            pos = me.getCurrentPosition(),
            newPos,
            headerCt = view.headerCt,
            record, columnHeader;

        // Re-establish selection of the same cell coordinate.
        // DO NOT fire events because the selected 
        if (pos && pos.view === view) {
            record = pos.record;
            columnHeader = pos.columnHeader;

            // After a refresh, recreate the selection using the same record and grid column as before
            if (!columnHeader.isDescendantOf(headerCt)) {
                // column header is not a child of the header container
                // this happens when the grid is reconfigured with new columns
                // make a best effor to select something by matching on id, then text, then dataIndex
                columnHeader = headerCt.queryById(columnHeader.id) || 
                               headerCt.down('[text="' + columnHeader.text + '"]') ||
                               headerCt.down('[dataIndex="' + columnHeader.dataIndex + '"]');
            }

            // If we have a columnHeader (either the column header that already exists in
            // the headerCt, or a suitable match that was found after reconfiguration)
            // AND the record still exists in the store (or a record matching the id of
            // the previously selected record) We are ok to go ahead and set the selection
            if (pos.record) {
                if (columnHeader && (view.store.indexOfId(record.getId()) !== -1)) {
                    newPos = new Ext.grid.CellContext(view).setPosition({
                        row: record,
                        column: columnHeader
                    });
                    me.setCurrentPosition(newPos);
                }
            } else {
                me.selection = null;
            }
        }
    },

    selectByPosition: function(position, suppressEvent) {
        this.setCurrentPosition(position, suppressEvent);
    }
});