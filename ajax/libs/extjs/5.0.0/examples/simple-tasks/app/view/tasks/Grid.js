/**
 * @class SimpleTasks.view.tasks.List
 * @extends Ext.grid.Panel
 * The tasks list view.  A grid that displays a list of tasks.
 */
Ext.define('SimpleTasks.view.tasks.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'taskGrid',
    requires: [
        'SimpleTasks.ux.DragDrop',
        'SimpleTasks.ux.StatusColumn',
        'SimpleTasks.ux.ReminderColumn',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.grid.feature.Grouping',
        'Ext.grid.plugin.DragDrop',
        'Ext.ux.TreePicker'
    ],
    store: 'Tasks',

    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            ddGroup: 'task',
            dragText: 'Drag task to change list',
            enableDrop: false
        },
        getRowClass: function(record, rowIndex, rowParams, store){
            var due = record.get('due');
            if(record.get('done')) {
                return 'tasks-completed-task';
            } else if(due && (due < Ext.Date.clearTime(new Date()))) {
                return 'tasks-overdue-task';
            }
        }
    },

    dockedItems: [
        {
            xtype: 'taskForm',
            dock: 'top',
            // the grid's column headers are a docked item with a weight of 100.
            // giving this a weight of 101 causes it to be docked under the column headers
            weight: 101,
            bodyStyle: {
                'background-color': '#E4E5E7'
            }
        }
    ],

    /**
     * @event editclick
     * Fires when an edit icon is clicked
     * @param {Ext.grid.View} view
     * @param {Number} rowIndex
     * @param {Number} colIndex
     * @param {Ext.grid.column.Action} column
     * @param {EventObject} e
     */

    /**
     * @event deleteclick
     * Fires when a delete icon is clicked
     * @param {Ext.grid.View} view
     * @param {Number} rowIndex
     * @param {Number} colIndex
     * @param {Ext.grid.column.Action} column
     * @param {EventObject} e
     */

    /**
     * @event edit
     * Fires when a record is edited using the CellEditing plugin or the statuscolumn
     * @param {SimpleTasks.model.Task} task     The task record that was edited
     */

    /**
     * @event reminderselect
     * Fires when a reminder time is selected from the reminder column's dropdown menu
     * @param {SimpleTasks.model.Task} task    the underlying record of the row that was clicked to show the reminder menu
     * @param {String|Number} value      The value that was selected
     */

    initComponent: function() {
        var me = this,
            cellEditingPlugin = Ext.create('Ext.grid.plugin.CellEditing'),
            groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
                groupHeaderTpl: [
                    '{groupValue:this.renderDueDate}',
                    {
                        renderDueDate: me.renderDueDate
                    }
                ],
                enableGroupingMenu: false
            });

        me.plugins = [cellEditingPlugin];

        me.features = [groupingFeature];

        me.columns = {
            defaults: {
                draggable: false,
                resizable: false,
                hideable: false
            },
            items: [
                {
                    xtype: 'statuscolumn',
                    dataIndex: 'done',
                    cls: 'tasks-icon-column-header tasks-done-column-header',
                    width: 24,
                    align: 'center',
                    menuDisabled: true,
                    sortable: false,
                    listeners: {
                        'checkchange': Ext.bind(me.handleCheckChange, me)
                    }
                },
                {
                    text: 'Title',
                    dataIndex: 'title',
                    flex: 1,
                    emptyCellText: '',
                    editor: {
                        xtype: 'textfield',
                        selectOnFocus: true
                    }
                },
                {
                    text: 'List',
                    dataIndex: 'list_id',
                    width: 200,
                    editor: {
                        xtype: 'treepicker',
                        displayField: 'name',
                        store: Ext.create('SimpleTasks.store.Lists', {storeId: 'Lists-TaskGrid' })
                    },
                    renderer: me.renderList
                },
                {
                    xtype: 'datecolumn',
                    text: 'Due Date',
                    dataIndex: 'due',
                    width: 100,
                    editor: 'datefield',
                    format: 'n/j/Y',
                    emptyCellText: ''
                },
                {
                    xtype: 'remindercolumn',
                    dataIndex: 'reminder',
                    cls: 'tasks-icon-column-header tasks-reminder-column-header',
                    width: 24,
                    tooltip: 'Set Reminder',
                    menuPosition: 'tr-br',
                    menuDisabled: true,
                    sortable: false,
                    emptyCellText: '',
                    listeners: {
                        select: Ext.bind(me.handleReminderSelect, me)
                    }
                },
                {
                    xtype: 'actioncolumn',
                    cls: 'tasks-icon-column-header tasks-edit-column-header',
                    width: 24,
                    icon: 'resources/images/edit_task.png',
                    iconCls: 'x-hidden',
                    tooltip: 'Edit',
                    menuDisabled: true,
                    sortable: false,
                    handler: Ext.bind(me.handleEditClick, me)
                },
                {
                    xtype: 'actioncolumn',
                    cls: 'tasks-icon-column-header tasks-delete-column-header',
                    width: 24,
                    icon: 'resources/images/delete.png',
                    iconCls: 'x-hidden',
                    tooltip: 'Delete',
                    menuDisabled: true,
                    sortable: false,
                    handler: Ext.bind(me.handleDeleteClick, me)
                }
            ]
        };

        me.callParent(arguments);

        cellEditingPlugin.on('edit', me.handleCellEdit, this);

    },

    /**
     * Handles a click on the edit icon
     * @private
     * @param {Ext.grid.View} gridView
     * @param {Number} rowIndex
     * @param {Number} colIndex
     * @param {Ext.grid.column.Action} column
     * @param {EventObject} e
     */
    handleEditClick: function(gridView, rowIndex, colIndex, column, e) {
        // Fire a "deleteclick" event with all the same args as this handler
        this.fireEvent('editclick', gridView, rowIndex, colIndex, column, e);
    },

    /**
     * Handles a click on a delete icon
     * @private
     * @param {Ext.grid.View} gridView
     * @param {Number} rowIndex
     * @param {Number} colIndex
     * @param {Ext.grid.column.Action} column
     * @param {EventObject} e
     */
    handleDeleteClick: function(gridView, rowIndex, colIndex, column, e) {
        // Fire a "deleteclick" event with all the same args as this handler
        this.fireEvent('deleteclick', gridView, rowIndex, colIndex, column, e);
    },

    /**
     * Handles a "checkchange" event on the "done" column
     * @private
     * @param {SimpleTasks.ux.StatusColumn} column
     * @param {Number} rowIndex
     * @param {Boolean} checked
     */
    handleCheckChange: function(column, rowIndex, checked) {
        this.fireEvent('recordedit', this.store.getAt(rowIndex));
    },

    /**
     * Handles a "select" event on the reminder column
     * @private
     * @param {SimpleTasks.model.Task} task    the underlying record of the row that was clicked to show the reminder menu
     * @param {String|Number} value      The value that was selected
     */
    handleReminderSelect: function(task, value) {
        this.fireEvent('reminderselect', task, value);
    },

    /**
     * Handles the CellEditing plugin's "edit" event
     * @private
     * @param {Ext.grid.plugin.CellEditing} editor
     * @param {Object} e                                an edit event object
     */
    handleCellEdit: function(editor, e) {
        this.fireEvent('recordedit', e.record);
    },

    /**
     * Renderer for the list column
     * @private
     * @param {Number} value
     * @param {Object} metaData
     * @param {SimpleTasks.model.Task} task
     * @param {Number} rowIndex
     * @param {Number} colIndex
     * @param {SimpleTasks.store.Tasks} store
     * @param {Ext.grid.View} view
     */
    renderList: function(value, metaData, task, rowIndex, colIndex, store, view) {
        var listsStore = Ext.getStore('Lists'),
            node = value ? listsStore.getNodeById(value) : listsStore.getRoot();

        return node.get('name');
    },

    /**
     * Renderer for the group headers
     * @private
     * @param {Date} date
     */
    renderDueDate: function(date) {
        var today = Ext.Date.clearTime(new Date()),
            todayTime = today.getTime(),
            dueDateTime;

        if(!date) {
            return '(No Date)';
        }
        dueDateTime = Ext.Date.clearTime(date).getTime();
        if(dueDateTime === todayTime) {
            return 'Today';
        }
        if(dueDateTime > todayTime) {
            if(dueDateTime === Ext.Date.add(today, Ext.Date.DAY, 1).getTime()) {
                // due date is current date + 1 day
                return 'Tomorrow';
            }
            if(dueDateTime < Ext.Date.add(today, Ext.Date.DAY, 7).getTime()) {
                // if the due date is less than one week in the future, return the day of the week.
                return Ext.Date.format(date, 'l');
            }
        } else {
            if(dueDateTime === Ext.Date.add(today, Ext.Date.DAY, -1).getTime()) {
                // due date is current date - 1 day.
                return 'Yesterday';
            }
            if(dueDateTime > Ext.Date.add(today, Ext.Date.DAY, -7).getTime()) {
                // if the due date is less than one week past, return 'Last' + the day of the week.
                return 'Last '+ Ext.Date.format(date, 'l');
            }
        }
        return date.getFullYear() === today.getFullYear() ? Ext.Date.format(date, 'D m/d') : Ext.Date.format(date, 'D m/d/Y');
    }

});