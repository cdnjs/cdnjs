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
 * This class provides an abstract grid editing plugin on selected {@link Ext.grid.column.Column columns}.
 * The editable columns are specified by providing an {@link Ext.grid.column.Column#editor editor}
 * in the {@link Ext.grid.column.Column column configuration}.
 *
 * **Note:** This class should not be used directly. See {@link Ext.grid.plugin.CellEditing} and
 * {@link Ext.grid.plugin.RowEditing}.
 */
Ext.define('Ext.grid.plugin.Editing', {
    alias: 'editing.editing',
    extend: 'Ext.AbstractPlugin',

    requires: [
        'Ext.grid.column.Column',
        'Ext.util.KeyNav'
    ],

    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * @cfg {Number} clicksToEdit
     * The number of clicks on a grid required to display the editor.
     * The only accepted values are **1** and **2**.
     */
    clicksToEdit: 2,

    /**
     * @cfg {String} triggerEvent
     * The event which triggers editing. Supercedes the {@link #clicksToEdit} configuration. Maybe one of:
     *
     *  * cellclick
     *  * celldblclick
     *  * cellfocus
     *  * rowfocus
     */
    triggerEvent: undefined,

    relayedEvents: [
        'beforeedit',
        'edit',
        'validateedit',
        'canceledit'
    ],

    // @private
    defaultFieldXType: 'textfield',

    // cell, row, form
    editStyle: '',

    constructor: function(config) {
        var me = this;

        me.addEvents(
            /**
             * @event beforeedit
             * Fires before editing is triggered. Return false from event handler to stop the editing.
             *
             * @param {Ext.grid.plugin.Editing} editor
             * @param {Object} context The editing context with the following properties:
             *  @param {Ext.grid.Panel}         context.grid The owning grid Panel.
             *  @param {Ext.data.Model}         context.record The record being edited.
             *  @param {String}                 context.field The name of the field being edited.
             *  @param {Mixed}                  context.value The field's current value.
             *  @param {HTMLElement}            context.row The grid row element.
             *  @param {Ext.grid.column.Column} context.column The Column being edited.
             *  @param {Number}                 context.rowIdx The index of the row being edited.
             *  @param {Number}                 context.colIdx The index of the column being edited.
             *  @param {Boolean}                context.cancel Set this to `true` to cancel the edit or return false from your handler.
             *  @param {Mixed}                  context.originalValue Alias for value (only when using {@link Ext.grid.plugin.CellEditing CellEditing}).
             */
            'beforeedit',

            /**
             * @event edit
             * Fires after a editing. Usage example:
             *
             *     grid.on('edit', function(editor, e) {
             *         // commit the changes right after editing finished
             *         e.record.commit();
             *     });
             *
             * @param {Ext.grid.plugin.Editing} editor
             * @param {Object} context The editing context with the following properties:
             *  @param {Ext.grid.Panel}         context.grid The owning grid Panel.
             *  @param {Ext.data.Model}         context.record The record being edited.
             *  @param {String}                 context.field The name of the field being edited.
             *  @param {Mixed}                  context.value The field's current value.
             *  @param {HTMLElement}            context.row The grid row element.
             *  @param {Ext.grid.column.Column} context.column The Column being edited.
             *  @param {Number}                 context.rowIdx The index of the row being edited.
             *  @param {Number}                 context.colIdx The index of the column being edited.
             */
            'edit',

            /**
             * @event validateedit
             * Fires after editing, but before the value is set in the record. Return false from event handler to
             * cancel the change.
             *
             * Usage example showing how to remove the red triangle (dirty record indicator) from some records (not all). By
             * observing the grid's validateedit event, it can be cancelled if the edit occurs on a targeted row (for example)
             * and then setting the field's new value in the Record directly:
             *
             *     grid.on('validateedit', function(editor, e) {
             *       var myTargetRow = 6;
             *
             *       if (e.rowIdx == myTargetRow) {
             *         e.cancel = true;
             *         e.record.data[e.field] = e.value;
             *       }
             *     });
             *
             * @param {Ext.grid.plugin.Editing} editor
             * @param {Object} context The editing context with the following properties:
             *  @param {Ext.grid.Panel}         context.grid The owning grid Panel.
             *  @param {Ext.data.Model}         context.record The record being edited.
             *  @param {String}                 context.field The name of the field being edited.
             *  @param {Mixed}                  context.value The field's current value.
             *  @param {HTMLElement}            context.row The grid row element.
             *  @param {Ext.grid.column.Column} context.column The Column being edited.
             *  @param {Number}                 context.rowIdx The index of the row being edited.
             *  @param {Number}                 context.colIdx The index of the column being edited.
             */
            'validateedit',
            /**
             * @event canceledit
             * Fires when the user started editing but then cancelled the edit.
             * @param {Ext.grid.plugin.Editing} editor
             * @param {Object} context The editing context with the following properties:
             *  @param {Ext.grid.Panel}         context.grid The owning grid Panel.
             *  @param {Ext.data.Model}         context.record The record being edited.
             *  @param {String}                 context.field The name of the field being edited.
             *  @param {Mixed}                  context.value The field's current value.
             *  @param {HTMLElement}            context.row The grid row element.
             *  @param {Ext.grid.column.Column} context.column The Column being edited.
             *  @param {Number}                 context.rowIdx The index of the row being edited.
             *  @param {Number}                 context.colIdx The index of the column being edited.
             */
            'canceledit'

        );
        me.callParent(arguments);
        me.mixins.observable.constructor.call(me);
        // TODO: Deprecated, remove in 5.0
        me.on("edit", function(editor, e) {
            me.fireEvent("afteredit", editor, e);
        });
    },

    // @private
    init: function(grid) {
        var me = this;

        me.grid = grid;
        me.view = grid.view;
        me.initEvents();

        // Set up fields at render and reconfigure time
        me.mon(grid, {
            reconfigure: me.onReconfigure,
            scope: me,
            beforerender: {
                fn: me.onReconfigure,
                single: true,
                scope: me
            }
        });

        grid.relayEvents(me, me.relayedEvents);

        // If the editable grid is owned by a lockable, relay up another level.
        if (me.grid.ownerLockable) {
            me.grid.ownerLockable.relayEvents(me, me.relayedEvents);
        }
        // Marks the grid as editable, so that the SelectionModel
        // can make appropriate decisions during navigation
        grid.isEditable = true;
        grid.editingPlugin = grid.view.editingPlugin = me;
    },

    /**
     * Fires after the grid is reconfigured
     * @private
     */
    onReconfigure: function() {
        var grid = this.grid;

        // In a Lockable assembly, the owner's view aggregates all grid columns across both sides.
        // We grab all columns here.
        grid = grid.ownerLockable ? grid.ownerLockable : grid;
        this.initFieldAccessors(grid.getView().getGridColumns());
    },

    /**
     * @private
     * AbstractComponent calls destroy on all its plugins at destroy time.
     */
    destroy: function() {
        var me = this,
            grid = me.grid;

        Ext.destroy(me.keyNav);
        // Clear all listeners from all our events, clear all managed listeners we added to other Observables
        me.clearListeners();

        if (grid) {
            me.removeFieldAccessors(grid.columnManager.getColumns());
            grid.editingPlugin = grid.view.editingPlugin = me.grid = me.view = me.editor = me.keyNav = null;
        }
    },

    // @private
    getEditStyle: function() {
        return this.editStyle;
    },

    // @private
    initFieldAccessors: function(columns) {
        // If we have been passed a group header, process its leaf headers
        if (columns.isGroupHeader) {
            columns = columns.getGridColumns();
        }

        // Ensure we are processing an array
        else if (!Ext.isArray(columns)) {
            columns = [columns];
        }

        var me   = this,
            c,
            cLen = columns.length,
            column;

        for (c = 0; c < cLen; c++) {
            column = columns[c];

            if (!column.getEditor) {
                column.getEditor = function(record, defaultField) {
                    return me.getColumnField(this, defaultField);
                };
            }
            if (!column.hasEditor) {
                column.hasEditor = function() {
                    return me.hasColumnField(this);
                };
            }
            if (!column.setEditor) {
                column.setEditor = function(field) {
                    me.setColumnField(this, field);
                };
            }
        }
    },

    // @private
    removeFieldAccessors: function(columns) {
        // If we have been passed a group header, process its leaf headers
        if (columns.isGroupHeader) {
            columns = columns.getGridColumns();
        }

        // Ensure we are processing an array
        else if (!Ext.isArray(columns)) {
            columns = [columns];
        }

        var c,
            cLen = columns.length,
            column;

        for (c = 0; c < cLen; c++) {
            column = columns[c];

            column.getEditor = column.hasEditor = column.setEditor = null;
        }
    },

    // @private
    // remaps to the public API of Ext.grid.column.Column.getEditor
    getColumnField: function(columnHeader, defaultField) {
        var field = columnHeader.field;
        if (!(field && field.isFormField)) {
            field = columnHeader.field = this.createColumnField(columnHeader, defaultField);
        }
        return field;
    },

    // @private
    // remaps to the public API of Ext.grid.column.Column.hasEditor
    hasColumnField: function(columnHeader) {
        return !!columnHeader.field;
    },

    // @private
    // remaps to the public API of Ext.grid.column.Column.setEditor
    setColumnField: function(columnHeader, field) {
        columnHeader.field = field;
        columnHeader.field = this.createColumnField(columnHeader);
    },

    createColumnField:  function(columnHeader, defaultField) {
        var field = columnHeader.field;

        if (!field && columnHeader.editor) {
            field = columnHeader.editor;
            columnHeader.editor = null;
        }

        if (!field && defaultField) {
            field = defaultField;
        }

        if (field) {
            if (field.isFormField) {
                field.column = columnHeader;
            } else {
                if (Ext.isString(field)) {
                    field = {
                        name: columnHeader.dataIndex,
                        xtype: field,
                        column: columnHeader
                    };
                } else {
                    field = Ext.apply({
                        name: columnHeader.dataIndex,
                        column: columnHeader
                    }, field);
                }
                field = Ext.ComponentManager.create(field, this.defaultFieldXType);
            }
            columnHeader.field = field;
        }
        return field;
    },

    // @private
    initEvents: function() {
        var me = this;
        me.initEditTriggers();
        me.initCancelTriggers();
    },

    // @abstract
    initCancelTriggers: Ext.emptyFn,

    // @private
    initEditTriggers: function() {
        var me = this,
            view = me.view;

        // Listen for the edit trigger event.
        if (me.triggerEvent == 'cellfocus') {
            me.mon(view, 'cellfocus', me.onCellFocus, me);
        } else if (me.triggerEvent == 'rowfocus') {
            me.mon(view, 'rowfocus', me.onRowFocus, me);
        } else {

            // Prevent the View from processing when the SelectionModel focuses.
            // This is because the SelectionModel processes the mousedown event, and
            // focusing causes a scroll which means that the subsequent mouseup might
            // take place at a different document XY position, and will therefore
            // not trigger a click.
            // This Editor must call the View's focusCell method directly when we recieve a request to edit
            if (view.getSelectionModel().isCellModel) {
                view.onCellFocus = Ext.Function.bind(me.beforeViewCellFocus, me);
            }

            // Listen for whichever click event we are configured to use
            me.mon(view, me.triggerEvent || ('cell' + (me.clicksToEdit === 1 ? 'click' : 'dblclick')), me.onCellClick, me);
        }

        // add/remove header event listeners need to be added immediately because
        // columns can be added/removed before render
        me.initAddRemoveHeaderEvents()
        // wait until render to initialize keynav events since they are attached to an element
        view.on('render', me.initKeyNavHeaderEvents, me, {single: true});
    },

    // Override of View's method so that we can pre-empt the View's processing if the view is being triggered by a mousedown
    beforeViewCellFocus: function(position) {
        // Pass call on to view if the navigation is from the keyboard, or we are not going to edit this cell.
        if (this.view.selModel.keyNavigation || !this.editing || !this.isCellEditable || !this.isCellEditable(position.row, position.columnHeader)) {
            this.view.focusCell.apply(this.view, arguments);
        }
    },

    // @private Used if we are triggered by the rowfocus event
    onRowFocus: function(record, row, rowIdx) {
        this.startEdit(row, 0);
    },

    // @private Used if we are triggered by the cellfocus event
    onCellFocus: function(record, cell, position) {
        this.startEdit(position.row, position.column);
    },

    // @private Used if we are triggered by a cellclick event
    onCellClick: function(view, cell, colIdx, record, row, rowIdx, e) {
        // cancel editing if the element that was clicked was a tree expander
        if(!view.expanderSelector || !e.getTarget(view.expanderSelector)) {
            this.startEdit(record, view.ownerCt.columnManager.getHeaderAtIndex(colIdx));
        }
    },

    initAddRemoveHeaderEvents: function(){
        var me = this;
        me.mon(me.grid.headerCt, {
            scope: me,
            add: me.onColumnAdd,
            remove: me.onColumnRemove,
            columnmove: me.onColumnMove
        });
    },

    initKeyNavHeaderEvents: function() {
        var me = this;

        me.keyNav = Ext.create('Ext.util.KeyNav', me.view.el, {
            enter: me.onEnterKey,
            esc: me.onEscKey,
            scope: me
        });
    },

    // @private
    onColumnAdd: function(ct, column) {
        this.initFieldAccessors(column);
    },

    // @private
    onColumnRemove: function(ct, column) {
        this.removeFieldAccessors(column);
    },

    // @private
    // Inject field accessors on move because if the move FROM the main headerCt and INTO a grouped header,
    // the accessors will have been deleted but not added. They are added conditionally.
    onColumnMove: function(headerCt, column, fromIdx, toIdx) {
        this.initFieldAccessors(column);
    },

    // @private
    onEnterKey: function(e) {
        var me = this,
            grid = me.grid,
            selModel = grid.getSelectionModel(),
            record,
            pos,
            columnHeader;

        // Calculate editing start position from SelectionModel if there is a selection
        // Note that the condition below tests the result of an assignment to the "pos" variable.
        if (selModel.getCurrentPosition && (pos = selModel.getCurrentPosition())) {
            record = pos.record;
            columnHeader = pos.columnHeader;
        }
        // RowSelectionModel
        else {
            record = selModel.getLastSelected();
            columnHeader = grid.columnManager.getHeaderAtIndex(0);
        }

        // If there was a selection to provide a starting context...
        if (record && columnHeader) {
            me.startEdit(record, columnHeader);
        }
    },

    // @private
    onEscKey: function(e) {
        return this.cancelEdit();
    },

    /**
     * @private
     * @template
     * Template method called before editing begins.
     * @param {Object} context The current editing context
     * @return {Boolean} Return false to cancel the editing process
     */
    beforeEdit: Ext.emptyFn,

    /**
     * Starts editing the specified record, using the specified Column definition to define which field is being edited.
     * @param {Ext.data.Model/Number} record The Store data record which backs the row to be edited, or index of the record in Store.
     * @param {Ext.grid.column.Column/Number} columnHeader The Column object defining the column to be edited, or index of the column.
     */
    startEdit: function(record, columnHeader) {
        var me = this,
            context,
            layoutView = me.grid.lockable ? me.grid : me.view;

        // The view must have had a layout to show the editor correctly, defer until that time.
        // In case a grid's startup code invokes editing immediately.
        if (!layoutView.componentLayoutCounter) {
            layoutView.on({
                boxready: Ext.Function.bind(me.startEdit, me, [record, columnHeader]),
                single: true
            });
            return false;
        }

        // If grid collapsed, or view not truly visible, don't even calculate a context - we cannot edit
        if (me.grid.collapsed || !me.grid.view.isVisible(true)) {
            return false;
        }

        context = me.getEditingContext(record, columnHeader);
        if (context == null) {
            return false;
        }
        if (!me.preventBeforeCheck) {
            if (me.beforeEdit(context) === false || me.fireEvent('beforeedit', me, context) === false || context.cancel) {
                return false;
            }
        }

        /**
         * @property {Boolean} editing
         * Set to `true` while the editing plugin is active and an Editor is visible.
         */
        me.editing = true;
        return context;
    },

    // TODO: Have this use a new class Ext.grid.CellContext for use here, and in CellSelectionModel
    /**
     * @private
     * Collects all information necessary for any subclasses to perform their editing functions.
     * @param record
     * @param columnHeader
     * @returns {Object/undefined} The editing context based upon the passed record and column
     */
    getEditingContext: function(record, columnHeader) {
        var me = this,
            grid = me.grid,
            view = me.view,
            gridRow = view.getNode(record, true),
            rowIdx, colIdx;

        // An intervening listener may have deleted the Record
        if (!gridRow) {
            return;
        }

        // Coerce the column index to the closest visible column
        columnHeader = grid.columnManager.getVisibleHeaderClosestToIndex(Ext.isNumber(columnHeader) ? columnHeader : columnHeader.getVisibleIndex());

        // No corresponding column. Possible if all columns have been moved to the other side of a lockable grid pair
        if (!columnHeader) {
            return;
        }

        colIdx = columnHeader.getVisibleIndex();

        if (Ext.isNumber(record)) {
            // look up record if numeric row index was passed
            rowIdx = record;
            record = view.getRecord(gridRow);
        } else {
            rowIdx = view.indexOf(gridRow);
        }

        // The record may be removed from the store but the view
        // not yet updated, so check it exists
        if (!record) {
            return;
        }

        return {
            grid   : grid,
            view   : view,
            store  : view.dataSource,
            record : record,
            field  : columnHeader.dataIndex,
            value  : record.get(columnHeader.dataIndex),
            row    : gridRow,
            column : columnHeader,
            rowIdx : rowIdx,
            colIdx : colIdx
        };
    },

    /**
     * Cancels any active edit that is in progress.
     */
    cancelEdit: function() {
        var me = this;

        me.editing = false;
        me.fireEvent('canceledit', me, me.context);
    },

    /**
     * Completes the edit if there is an active edit in progress.
     */
    completeEdit: function() {
        var me = this;

        if (me.editing && me.validateEdit()) {
            me.fireEvent('edit', me, me.context);
        }

        me.context = null;
        me.editing = false;
    },

    // @abstract
    validateEdit: function() {
        var me = this,
            context = me.context;

        return me.fireEvent('validateedit', me, context) !== false && !context.cancel;
    }
});
