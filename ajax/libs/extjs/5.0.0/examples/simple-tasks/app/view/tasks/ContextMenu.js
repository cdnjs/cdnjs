/**
 * @class SimpleTasks.view.tasks.ContextMenu
 * @extends Ext.menu.Menu
 */
Ext.define('SimpleTasks.view.tasks.ContextMenu', {
    extend: 'Ext.menu.Menu',
    xtype: 'tasksContextMenu',
    items: [
        {
            text: 'Edit',
            id: 'edit-task-item'
        },
        '-',
        {
            text: 'Mark Complete',
            iconCls: 'tasks-mark-complete',
            id: 'mark-complete-item'
        },
        {
            text: 'Mark Active',
            iconCls: 'tasks-mark-active',
            id: 'mark-active-item'
        },
        {
            text: 'Delete',
            iconCls: 'tasks-delete-task',
            id: 'delete-task-item'
        }
    ],

    /**
     * Associates this menu with a specific task.
     * @param {SimpleTasks.model.Task} task
     */
    setTask: function(task) {
        this.task = task;
    },
    
    /**
     * Gets the task associated with this menu
     * @return {Task.model.Task}
     */
    getTask: function() {
        return this.task;
    }

});