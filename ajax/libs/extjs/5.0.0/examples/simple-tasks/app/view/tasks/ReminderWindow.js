/**
 * @class SimpleTasks.view.tasks.DefaultTimeWindow
 * @extends Ext.window.Window
 * 
 * A window for displaying alerts when the reminder date for a task has passed
 */
Ext.define('SimpleTasks.view.tasks.ReminderWindow', {
    extend: 'Ext.window.Window',
    xtype: 'reminderWindow',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox'
    ],
    width: 400,
    layout: 'anchor',
    bodyPadding: 5,

    items: [
        {
            xtype: 'box',
            cls: 'tasks-reminder-details',
            tpl: [
                '<div class="tasks-reminder-icon"></div>',
                '<p class="tasks-reminder-title">{title}</p>',
                '<p class="tasks-reminder-due">Due: {due:date("F j, Y")}</p>'
            ]
        },
        {
            xtype: 'combobox',
            name: 'snooze_time',
            fieldLabel: 'Remind me again in',
            labelWidth: 115,
            anchor: '100%',
            labelSeparator: '',
            margin: '10 0 10 20',
            forceSelection: true,
            value: 5,
            store: [
                [5, '5 minutes'],
                [10, '10 minutes'],
                [15, '15 minutes'],
                [30, '30 minutes'],
                [60, '1 hour'],
                [120, '2 hours'],
                [240, '4 hours'],
                [480, '8 hours'],
                [720, '12 hours'],
                [1440, '1 day'],
                [2880, '2 days'],
                [4320, '3 days'],
                [5760, '4 days'],
                [10080, '1 week'],
                [20160, '2 weeks'],
                [30240, '3 weeeks'],
                [40320, '4 weeks']
            ]
        }
    ],
    buttons: [
        {
            text: 'Snooze',
            cls: 'snooze-btn'
        },
        {
            text: 'Dismiss',
            cls: 'dismiss-reminder-btn'
        }
    ],

    /**
     * Associates this reminder with a specific task.
     * @param {SimpleTasks.model.Task} task
     */
    setTask: function(task) {
        this.task = task;
    },
    
    /**
     * Gets the task associated with this reminder
     * @return {Task.model.Task}
     */
    getTask: function() {
        return this.task;
    }

});