/**
 * @class SimpleTasks.view.Toolbar
 * @extends Ext.toolbar.Toolbar
 */
Ext.define('SimpleTasks.view.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'tasksToolbar',
    items: [
        {
            text: 'New',
            iconCls: 'tasks-new',
            menu: {
                items: [
                    {
                        text: 'New Task',
                        iconCls: 'tasks-new'
                    },
                    {
                        text: 'New List',
                        iconCls: 'tasks-new-list'
                    },
                    {
                        text: 'New Folder',
                        iconCls: 'tasks-new-folder'
                    }
                ]
            }
        },
        {
            iconCls: 'tasks-delete-task',
            id: 'delete-task-btn',
            disabled: true,
            tooltip: 'Delete Task'
        },
        {
            iconCls: 'tasks-mark-complete',
            id: 'mark-complete-btn',
            disabled: true,
            tooltip: 'Mark Complete'
        },
        {
            iconCls: 'tasks-mark-active',
            id: 'mark-active-btn',
            disabled: true,
            tooltip: 'Mark Active'
        },
        '->',
        {
            iconCls: 'tasks-show-all',
            id: 'show-all-btn',
            tooltip: 'All Tasks',
            toggleGroup: 'status'
        },
        {
            iconCls: 'tasks-show-active',
            id: 'show-active-btn',
            tooltip: 'Active Tasks',
            toggleGroup: 'status'
        },
        {
            iconCls: 'tasks-show-complete',
            id: 'show-complete-btn',
            tooltip: 'Completed Tasks',
            toggleGroup: 'status'
        }

    ]
});


