/**
 * @class Ext.calendar.form.field.ReminderCombo
 * @extends Ext.form.ComboBox
 * <p>A custom combo used for choosing a reminder setting for an event.</p>
 * <p>This is pretty much a standard combo that is simply pre-configured for the options needed by the
 * calendar components. The default configs are as follows:<pre><code>
    width: 200,
    fieldLabel: 'Reminder',
    queryMode: 'local',
    triggerAction: 'all',
    forceSelection: true,
    displayField: 'desc',
    valueField: 'value'
</code></pre>
 * @constructor
 * @param {Object} config The config object
 */
Ext.define('Ext.calendar.form.field.ReminderCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.reminderfield',

    fieldLabel: 'Reminder',
    queryMode: 'local',
    triggerAction: 'all',
    forceSelection: true,
    displayField: 'desc',
    valueField: 'value',

    // private
    initComponent: function() {
        this.store = this.store || new Ext.data.ArrayStore({
            fields: ['value', 'desc'],
            idIndex: 0,
            data: [
            ['', 'None'],
            ['0', 'At start time'],
            ['5', '5 minutes before start'],
            ['15', '15 minutes before start'],
            ['30', '30 minutes before start'],
            ['60', '1 hour before start'],
            ['90', '1.5 hours before start'],
            ['120', '2 hours before start'],
            ['180', '3 hours before start'],
            ['360', '6 hours before start'],
            ['720', '12 hours before start'],
            ['1440', '1 day before start'],
            ['2880', '2 days before start'],
            ['4320', '3 days before start'],
            ['5760', '4 days before start'],
            ['7200', '5 days before start'],
            ['10080', '1 week before start'],
            ['20160', '2 weeks before start']
            ]
        });

        this.callParent();
    },

    // inherited docs
    initValue: function() {
        if (this.value !== undefined) {
            this.setValue(this.value);
        }
        else {
            this.setValue('');
        }
        this.originalValue = this.getValue();
    }
});
