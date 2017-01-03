/**
 * @class SimpleTasks.view.tasks.DefaultTimeWindow
 * @extends Ext.window.Window
 * 
 * A window for setting the default reminder time
 */
Ext.define('SimpleTasks.view.tasks.DefaultTimeWindow', {
    extend: 'Ext.window.Window',
    xtype: 'defaultTimeWindow',
    title: 'Set Default Reminder Time',
    closeAction: 'hide',
    width: 300,
    layout: 'fit',

    items: [
        {
            xtype: 'form',
            layout: 'anchor',
            border: false,
            frame: true,

            items: [
                {
                    xtype: 'timefield',
                    name: 'default_time',
                    editable: false,
                    labelAlign: 'top',
                    fieldLabel: 'When setting quick reminders, default the time to',
                    anchor: '100%'
                }
            ],
            buttons: [
                {
                    text: 'OK',
                    id: 'save-default-time-btn'
                },
                {
                    text: 'Cancel',
                    id: 'cancel-default-time-edit-btn'
                }
            ]
        }
    ]
});