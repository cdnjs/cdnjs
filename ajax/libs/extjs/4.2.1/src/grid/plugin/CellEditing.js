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
 * The Ext.grid.plugin.CellEditing plugin injects editing at a cell level for a Grid. Only a single
 * cell will be editable at a time. The field that will be used for the editor is defined at the
 * {@link Ext.grid.column.Column#editor editor}. The editor can be a field instance or a field configuration.
 *
 * If an editor is not specified for a particular column then that cell will not be editable and it will
 * be skipped when activated via the mouse or the keyboard.
 *
 * The editor may be shared for each column in the grid, or a different one may be specified for each column.
 * An appropriate field type should be chosen to match the data structure that it will be editing. For example,
 * to edit a date, it would be useful to specify {@link Ext.form.field.Date} as the editor.
 *
 * ## Example
 *
 * A grid with editor for the name and the email columns:
 *
 *     @example
 *     Ext.create('Ext.data.Store', {
 *         storeId:'simpsonsStore',
 *         fields:['name', 'email', 'phone'],
 *         data:{'items':[
 *             {"name":"Lisa", "email":"lisa@simpsons.com", "phone":"555-111-1224"},
 *             {"name":"Bart", "email":"bart@simpsons.com", "phone":"555-222-1234"},
 *             {"name":"Homer", "email":"home@simpsons.com", "phone":"555-222-1244"},
 *             {"name":"Marge", "email":"marge@simpsons.com", "phone":"555-222-1254"}
 *         ]},
 *         proxy: {
 *             type: 'memory',
 *             reader: {
 *                 type: 'json',
 *                 root: 'items'
 *             }
 *         }
 *     });
 *
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Simpsons',
 *         store: Ext.data.StoreManager.lookup('simpsonsStore'),
 *         columns: [
 *             {header: 'Name',  dataIndex: 'name', editor: 'textfield'},
 *             {header: 'Email', dataIndex: 'email', flex:1,
 *                 editor: {
 *                     xtype: 'textfield',
 *                     allowBlank: false
 *                 }
 *             },
 *             {header: 'Phone', dataIndex: 'phone'}
 *         ],
 *         selType: 'cellmodel',
 *         plugins: [
 *             Ext.create('Ext.grid.plugin.CellEditing', {
 *                 clicksToEdit: 1
 *             })
 *         ],
 *         height: 200,
 *         width: 400,
 *         renderTo: Ext.getBody()
 *     });
 *
 * This requires a little explanation. We're passing in `store` and `columns` as normal, but
 * we also specify a {@link Ext.grid.column.Column#field field} on two of our columns. For the
 * Name column we just want a default textfield to edit the value, so we specify 'textfield'.
 * For the Email column we customized the editor slightly by passing allowBlank: false, which
 * will provide inline validation.
 *
 * To support cell editing, we also specified that the grid should use the 'cellmodel'
 * {@link Ext.grid.Panel#selType selType}, and created an instance of the CellEditing plugin,
 * which we configured to activate each editor after a single click.
 *
 */
Ext.define('Ext.grid.plugin.CellEditing', {
    alias: 'plugin.cellediting',
    extend: 'Ext.grid.plugin.Editing',
    requires: ['Ext.grid.CellEditor', 'Ext.util.DelayedTask'],
    lockableScope: 'both',

    /**
     * @event beforeedit
     * Fires before cell editing is triggered. Return false from event handler to stop the editing.
     *
     * @param {Ext.grid.plugin.CellEditing} editor
     * @param {Object} e An edit event with the following properties:
     *
     * - grid - The grid
     * - record - The record being edited
     * - field - The field name being edited
     * - value - The value for the field being edited.
     * - row - The grid table row
     * - column - The grid {@link Ext.grid.column.Column Column} defining the column that is being edited.
     * - rowIdx - The row index that is being edited
     * - colIdx - The column index that is being edited
     * - cancel - Set this to true to cancel the edit or return false from your handler.
     */
    /**
     * @event edit
     * Fires after a cell is edited. Usage example:
     *
     *     grid.on('edit', function(editor, e) {
     *         // commit the changes right after editing finished
     *         e.record.commit();
     *     });
     *
     * @param {Ext.grid.plugin.CellEditing} editor
     * @param {Object} e An edit event with the following properties:
     *
     * - grid - The grid
     * - record - The record that was edited
     * - field - The field name that was edited
     * - value - The value being set
     * - originalValue - The original value for the field, before the edit.
     * - row - The grid table row
     * - column - The grid {@link Ext.grid.column.Column Column} defining the column that was edited.
     * - rowIdx - The row index that was edited
     * - colIdx - The column index that was edited
     */
    /**
     * @event validateedit
     * Fires after a cell is edited, but before the value is set in the record. Return false from event handler to
     * cancel the change.
     *
     * Usage example showing how to remove the red triangle (dirty record indicator) from some records (not all). By
     * observing the grid's validateedit event, it can be cancelled if the edit occurs on a targeted row (for
     * example) and then setting the field's new value in the Record directly:
     *
     *     grid.on('validateedit', function(editor, e) {
     *       var myTargetRow = 6;
     *
     *       if (e.row == myTargetRow) {
     *         e.cancel = true;
     *         e.record.data[e.field] = e.value;
     *       }
     *     });
     *
     * @param {Ext.grid.plugin.CellEditing} editor
     * @param {Object} e An edit event with the following properties:
     *
     * - grid - The grid
     * - record - The record being edited
     * - field - The field name being edited
     * - value - The value being set
     * - originalValue - The original value for the field, before the edit.
     * - row - The grid table row
     * - column - The grid {@link Ext.grid.column.Column Column} defining the column that is being edited.
     * - rowIdx - The row index that is being edited
     * - colIdx - The column index that is being edited
     * - cancel - Set this to true to cancel the edit or return false from your handler.
     */
    /**
     * @event canceledit
     * Fires when the user started editing a cell but then cancelled the edit.
     * @param {Ext.grid.plugin.CellEditing} editor
     * @param {Object} e An edit event with the following properties:
     * 
     * - grid - The grid
     * - record - The record that was edited
     * - field - The field name that was edited
     * - value - The value being set
     * - row - The grid table row
     * - column - The grid {@link Ext.grid.column.Column Column} defining the column that was edited.
     * - rowIdx - The row index that was edited
     * - colIdx - The column index that was edited
     */

    init: function(grid) {
        var me = this,
            lockingPartner = me.lockingPartner;

        me.callParent(arguments);

        // Share editor apparatus with lockingPartner becuse columns may move from side to side
        if (lockingPartner) {
            if (lockingPartner.editors) {
                me.editors = lockingPartner.editors;
            } else {
                me.editors = lockingPartner.editors = new Ext.util.MixedCollection(false, function(editor) {
                    return editor.editorId;
                });
            }
        } else {
            me.editors = new Ext.util.MixedCollection(false, function(editor) {
                return editor.editorId;
            });
        }
    },

    onReconfigure: function(grid, store, columns){
        // Only reconfigure editors if passed a new set of columns
        if (columns) {
            this.editors.clear();
        }
        this.callParent();    
    },

    /**
     * @private
     * AbstractComponent calls destroy on all its plugins at destroy time.
     */
    destroy: function() {
        var me = this;
        if (me.editors) {
            me.editors.each(Ext.destroy, Ext);
            me.editors.clear();
        }
        me.callParent(arguments);
    },

    onBodyScroll: function() {
        var me = this,
            ed = me.getActiveEditor(),
            scroll = me.view.el.getScroll();

        // Scroll happened during editing...
        // If editing is on the other side of a lockable, then ignore it
        if (ed && ed.editing && ed.editingPlugin === me) {
            // Terminate editing only on vertical scroll. Horiz scroll can be caused by tabbing between cells.
            if (scroll.top !== me.scroll.top) {
                if (ed.field) {
                    if (ed.field.triggerBlur) {
                        ed.field.triggerBlur();
                    } else {
                        ed.field.blur();
                    }
                }
            }
            // Horiz scroll just requires that the editor be realigned.
            else {
                ed.realign();
            }
        }
        me.scroll = scroll;
    },

    // @private
    // Template method called from base class's initEvents
    initCancelTriggers: function() {
        var me   = this,
            grid = me.grid,
            view = grid.view;

        me.mon(view, 'bodyscroll', me.onBodyScroll, me);
        me.mon(grid, {
            columnresize: me.cancelEdit,
            columnmove: me.cancelEdit,
            scope: me
        });
    },

    isCellEditable: function(record, columnHeader) {
        var me = this,
            context = me.getEditingContext(record, columnHeader);

        if (me.grid.view.isVisible(true) && context) {
            columnHeader = context.column;
            record = context.record;
            if (columnHeader && me.getEditor(record, columnHeader)) {
                return true;
            }
        }
    },

    /**
     * Starts editing the specified record, using the specified Column definition to define which field is being edited.
     * @param {Ext.data.Model/Number} record The Store data record which backs the row to be edited, or index of the record.
     * @param {Ext.grid.column.Column/Number} columnHeader The Column object defining the column to be edited, or index of the column.
     * @return {Boolean} `true` if editing was started, `false` otherwise.
     */
    startEdit: function(record, columnHeader, /* private */ context) {
        var me = this,
            ed;

        if (!context) {
            me.preventBeforeCheck = true;
            context = me.callParent(arguments);
            delete me.preventBeforeCheck;
            if (context === false) {
                return false;
            }
        }

        // Cancel editing if EditingContext could not be found (possibly because record has been deleted by an intervening listener),
        // or if the grid view is not currently visible
        if (context && me.grid.view.isVisible(true)) {

            record = context.record;
            columnHeader = context.column;

            // Complete the edit now, before getting the editor's target cell DOM element.
            // Completing the edit hides the editor, causes a row update and sets up a delayed focus on the row.
            // Also allows any post-edit events to take effect before continuing
            me.completeEdit();

            // See if the field is editable for the requested record
            if (columnHeader && !columnHeader.getEditor(record)) {
                return false;
            }

            // Switch to new context *after* completing the current edit
            me.context = context;

            context.originalValue = context.value = record.get(columnHeader.dataIndex);
            
            if (me.beforeEdit(context) === false || me.fireEvent('beforeedit', me, context) === false || context.cancel) {
                return false;
            }

            ed = me.getEditor(record, columnHeader);

            // Whether we are going to edit or not, ensure the edit cell is scrolled into view
            me.grid.view.cancelFocus();
            me.view.scrollCellIntoView(me.getCell(record, columnHeader));
            if (ed) {
                me.showEditor(ed, context, context.value);
                return true;
            }
            return false;
        }
    },

    showEditor: function(ed, context, value) {
        var me = this,
            record = context.record,
            columnHeader = context.column,
            sm = me.grid.getSelectionModel(),
            selection = sm.getCurrentPosition(),
            otherView = selection && selection.view;

        // Selection is for another view.
        // This can happen in a lockable grid where there are two grids, each with a separate Editing plugin
        if (otherView && otherView !== me.view) {
            return me.lockingPartner.showEditor(ed, me.lockingPartner.getEditingContext(selection.record, selection.columnHeader), value);
        }

        me.setEditingContext(context);
        me.setActiveEditor(ed);
        me.setActiveRecord(record);
        me.setActiveColumn(columnHeader);

        // Select cell on edit only if it's not the currently selected cell
        if (sm.selectByPosition && (!selection || selection.column !== context.colIdx || selection.row !== context.rowIdx)) {
            sm.selectByPosition({
                row: context.rowIdx,
                column: context.colIdx,
                view: me.view
            });
        }

        ed.startEdit(me.getCell(record, columnHeader), value, context);
        me.editing = true;
        me.scroll = me.view.el.getScroll();
    },

    completeEdit: function() {
        var activeEd = this.getActiveEditor();
        if (activeEd) {
            activeEd.completeEdit();
            this.editing = false;
        }
    },

    // internal getters/setters
    setEditingContext: function(context) {
        this.context = context;
        if (this.lockingPartner) {
            this.lockingPartner.context = context;
        }
    },

    setActiveEditor: function(ed) {
        this.activeEditor = ed;
        if (this.lockingPartner) {
            this.lockingPartner.activeEditor = ed;
        }
    },

    getActiveEditor: function() {
        return this.activeEditor;
    },

    setActiveColumn: function(column) {
        this.activeColumn = column;
        if (this.lockingPartner) {
            this.lockingPartner.activeColumn = column;
        }
    },

    getActiveColumn: function() {
        return this.activeColumn;
    },

    setActiveRecord: function(record) {
        this.activeRecord = record;
        if (this.lockingPartner) {
            this.lockingPartner.activeRecord = record;
        }
    },

    getActiveRecord: function() {
        return this.activeRecord;
    },

    getEditor: function(record, column) {
        var me = this,
            editors = me.editors,
            editorId = column.getItemId(),
            editor = editors.getByKey(editorId),
            // Add to top level grid if we are editing one side of a locking system
            editorOwner = me.grid.ownerLockable || me.grid;

        if (!editor) {
            editor = column.getEditor(record);
            if (!editor) {
                return false;
            }

            // Allow them to specify a CellEditor in the Column
            if (editor instanceof Ext.grid.CellEditor) {
                editor.floating = true;
            }
            // But if it's just a Field, wrap it.
            else {
                editor = new Ext.grid.CellEditor({
                    floating: true,
                    editorId: editorId,
                    field: editor
                });
            }
            // Add the Editor as a floating child of the grid
            editorOwner.add(editor);
            editor.on({
                scope: me,
                specialkey: me.onSpecialKey,
                complete: me.onEditComplete,
                canceledit: me.cancelEdit
            });
            column.on('removed', me.cancelActiveEdit, me);
            editors.add(editor);
        }

        if (column.isTreeColumn) {
            editor.isForTree = column.isTreeColumn;
            editor.addCls(Ext.baseCSSPrefix + 'tree-cell-editor')
        }
        editor.grid = me.grid;
        
        // Keep upward pointer correct for each use - editors are shared between locking sides
        editor.editingPlugin = me;
        return editor;
    },
    
    cancelActiveEdit: function(column){
        var context = this.context
        if (context && context.column === column) {
            this.cancelEdit();
        }   
    },
    
    // inherit docs
    setColumnField: function(column, field) {
        var ed = this.editors.getByKey(column.getItemId());
        Ext.destroy(ed, column.field);
        this.editors.removeAtKey(column.getItemId());
        this.callParent(arguments);
    },

    /**
     * Gets the cell (td) for a particular record and column.
     * @param {Ext.data.Model} record
     * @param {Ext.grid.column.Column} column
     * @private
     */
    getCell: function(record, column) {
        return this.grid.getView().getCell(record, column);
    },

    onSpecialKey: function(ed, field, e) {
        var sm;
 
        if (e.getKey() === e.TAB) {
            e.stopEvent();

            if (ed) {
                // Allow the field to act on tabs before onEditorTab, which ends
                // up calling completeEdit. This is useful for picker type fields.
                ed.onEditorTab(e);
            }

            sm = ed.up('tablepanel').getSelectionModel();
            if (sm.onEditorTab) {
                return sm.onEditorTab(ed.editingPlugin, e);
            }
        }
    },

    onEditComplete : function(ed, value, startValue) {
        var me = this,
            activeColumn = me.getActiveColumn(),
            context = me.context,
            record;

        if (activeColumn) {
            record = context.record;

            me.setActiveEditor(null);
            me.setActiveColumn(null);
            me.setActiveRecord(null);
    
            context.value = value;
            if (!me.validateEdit()) {
                return;
            }

            // Only update the record if the new value is different than the
            // startValue. When the view refreshes its el will gain focus
            if (!record.isEqual(value, startValue)) {
                record.set(activeColumn.dataIndex, value);
            }

            // Restore focus back to the view.
            // Use delay so that if we are completing due to tabbing, we can cancel the focus task
            context.view.focus(false, true);
            me.fireEvent('edit', me, context);
            me.editing = false;
        }
    },

    /**
     * Cancels any active editing.
     */
    cancelEdit: function() {
        var me = this,
            activeEd = me.getActiveEditor();

        me.setActiveEditor(null);
        me.setActiveColumn(null);
        me.setActiveRecord(null);
        if (activeEd) {
            activeEd.cancelEdit();
            me.context.view.focus();
            me.callParent(arguments);
            return;
        }
        // If we aren't editing, return true to allow the event to bubble
        return true;
    },

    /**
     * Starts editing by position (row/column)
     * @param {Object} position A position with keys of row and column.
     */
    startEditByPosition: function(position) {

        // If a raw {row:0, column:0} object passed.
        if (!position.isCellContext) {
            position = new Ext.grid.CellContext(this.view).setPosition(position);
        }

        // Coerce the edit column to the closest visible column
        position.setColumn(this.view.getHeaderCt().getVisibleHeaderClosestToIndex(position.column).getIndex());

        return this.startEdit(position.record, position.columnHeader);
    }
});
