/**
 * @class Ext.calendar.form.EventWindow
 * @extends Ext.Window
 * <p>A custom window containing a basic edit form used for quick editing of events.</p>
 * <p>This window also provides custom events specific to the calendar so that other calendar components can be easily
 * notified when an event has been edited via this component.</p>
 * @constructor
 * @param {Object} config The config object
 */
Ext.define('Ext.calendar.form.EventWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.eventeditwindow',
    
    requires: [
        'Ext.form.Panel',
        'Ext.calendar.util.Date',
        'Ext.calendar.data.EventModel',
        'Ext.calendar.data.EventMappings'
    ],

    constructor: function(config) {
        var formPanelCfg = {
            xtype: 'form',
            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 65
            },
            frame: false,
            bodyStyle: 'background:transparent;padding:5px 10px 10px;',
            bodyBorder: false,
            border: false,
            items: [{
                itemId: 'title',
                name: Ext.calendar.data.EventMappings.Title.name,
                fieldLabel: 'Title',
                xtype: 'textfield',
                allowBlank: false,
                emptyText: 'Event Title',
                anchor: '100%'
            },
            {
                xtype: 'daterangefield',
                itemId: 'date-range',
                name: 'dates',
                anchor: '100%',
                fieldLabel: 'When'
            }]
        };
    
        if (config.calendarStore) {
            this.calendarStore = config.calendarStore;
            delete config.calendarStore;
    
            formPanelCfg.items.push({
                xtype: 'calendarpicker',
                itemId: 'calendar',
                name: Ext.calendar.data.EventMappings.CalendarId.name,
                anchor: '100%',
                store: this.calendarStore
            });
        }
    
        this.callParent([Ext.apply({
            titleTextAdd: 'Add Event',
            titleTextEdit: 'Edit Event',
            width: 600,
            autocreate: true,
            border: true,
            closeAction: 'hide',
            modal: false,
            resizable: false,
            buttonAlign: 'left',
            savingMessage: 'Saving changes...',
            deletingMessage: 'Deleting event...',
            layout: 'fit',
    
            defaultFocus: 'title',
            onEsc: function(key, event) {
                        event.target.blur(); // Remove the focus to avoid doing the validity checks when the window is shown again.
                        this.onCancel();
                    },

            fbar: [{
                xtype: 'tbtext',
                text: '<a href="#" id="tblink">Edit Details...</a>'
            },
            '->',
            {
                itemId: 'delete-btn',
                text: 'Delete Event',
                disabled: false,
                handler: this.onDelete,
                scope: this,
                minWidth: 150,
                hideMode: 'offsets'
            },
            {
                text: 'Save',
                disabled: false,
                handler: this.onSave,
                scope: this
            },
            {
                text: 'Cancel',
                disabled: false,
                handler: this.onCancel,
                scope: this
            }],
            items: formPanelCfg
        },
        config)]);
    },

    // private
    newId: 10000,

    /**
     * @event eventadd
     * Fires after a new event is added
     * @param {Ext.calendar.form.EventWindow} this
     * @param {Ext.calendar.EventRecord} rec The new {@link Ext.calendar.EventRecord record} that was added
     */

    /**
     * @event eventupdate
     * Fires after an existing event is updated
     * @param {Ext.calendar.form.EventWindow} this
     * @param {Ext.calendar.EventRecord} rec The new {@link Ext.calendar.EventRecord record} that was updated
     */

    /**
     * @event eventdelete
     * Fires after an event is deleted
     * @param {Ext.calendar.form.EventWindow} this
     * @param {Ext.calendar.EventRecord} rec The new {@link Ext.calendar.EventRecord record} that was deleted
     */

    /**
     * @event eventcancel
     * Fires after an event add/edit operation is canceled by the user and no store update took place
     * @param {Ext.calendar.form.EventWindow} this
     * @param {Ext.calendar.EventRecord} rec The new {@link Ext.calendar.EventRecord record} that was canceled
     */

    /**
     * @event editdetails
     * Fires when the user selects the option in this window to continue editing in the detailed edit form
     * (by default, an instance of {@link Ext.calendar.EventEditForm}. Handling code should hide this window
     * and transfer the current event record to the appropriate instance of the detailed form by showing it
     * and calling {@link Ext.calendar.EventEditForm#loadRecord loadRecord}.
     * @param {Ext.calendar.form.EventWindow} this
     * @param {Ext.calendar.EventRecord} rec The {@link Ext.calendar.EventRecord record} that is currently being edited
     */

    // private
    initComponent: function() {
        this.callParent();

        this.formPanel = this.items.items[0];
    },

    // private
    afterRender: function() {
        this.callParent();

        this.el.addCls('ext-cal-event-win');

        Ext.get('tblink').on('click', this.onEditDetailsClick, this);
        
        this.titleField = this.down('#title');
        this.dateRangeField = this.down('#date-range');
        this.calendarField = this.down('#calendar');
        this.deleteButton = this.down('#delete-btn');
    },
    
    // private
    onEditDetailsClick: function(e){
        e.stopEvent();
        this.updateRecord(this.activeRecord, true);
        this.fireEvent('editdetails', this, this.activeRecord, this.animateTarget);
    },

    /**
     * Shows the window, rendering it first if necessary, or activates it and brings it to front if hidden.
	 * @param {Ext.data.Record/Object} o Either a {@link Ext.data.Record} if showing the form
	 * for an existing event in edit mode, or a plain object containing a StartDate property (and 
	 * optionally an EndDate property) for showing the form in add mode. 
     * @param {String/Element} animateTarget (optional) The target element or id from which the window should
     * animate while opening (defaults to null with no animation)
     * @return {Ext.Window} this
     */
    show: function(o, animateTarget) {
        // Work around the CSS day cell height hack needed for initial render in IE8/strict:
        var me = this,
            anim = (Ext.isIE8 && Ext.isStrict) ? null: animateTarget,
            M = Ext.calendar.data.EventMappings,
            data = {};

        this.callParent([anim, function(){
            me.titleField.focus(true);
        }]);
        
        this.deleteButton[o.data && o.data[M.EventId.name] ? 'show': 'hide']();

        var rec,
        f = this.formPanel.form;

        if (o.data) {
            rec = o;
            this.setTitle(rec.phantom ? this.titleTextAdd : this.titleTextEdit);
            f.loadRecord(rec);
        }
        else {
            this.setTitle(this.titleTextAdd);

            var start = o[M.StartDate.name],
                end = o[M.EndDate.name] || Ext.calendar.util.Date.add(start, {hours: 1});
            
            data[M.StartDate.name] = start;
            data[M.EndDate.name] = end;
            data[M.IsAllDay.name] = !!o[M.IsAllDay.name] || start.getDate() != Ext.calendar.util.Date.add(end, {millis: 1}).getDate();
            rec = new Ext.calendar.data.EventModel(data);

            f.reset();
            f.loadRecord(rec);
        }

        if (this.calendarStore) {
            this.calendarField.setValue(rec.data[M.CalendarId.name]);
        }
        this.dateRangeField.setValue(rec.data);
        this.activeRecord = rec;

        return this;
    },

    // private
    roundTime: function(dt, incr) {
        incr = incr || 15;
        var m = parseInt(dt.getMinutes(), 10);
        return dt.add('mi', incr - (m % incr));
    },

    // private
    onCancel: function() {
        this.cleanup(true);
        this.fireEvent('eventcancel', this);
    },

    // private
    cleanup: function(hide) {
        if (this.activeRecord && this.activeRecord.dirty) {
            this.activeRecord.reject();
        }
        delete this.activeRecord;

        if (hide === true) {
            // Work around the CSS day cell height hack needed for initial render in IE8/strict:
            //var anim = afterDelete || (Ext.isIE8 && Ext.isStrict) ? null : this.animateTarget;
            this.hide();
        }
    },

    // private
    updateRecord: function(record, keepEditing) {
        var fields = record.getFields(),
            values = this.formPanel.getForm().getValues(),
            name,
            M = Ext.calendar.data.EventMappings,
            obj = {};

        Ext.Array.each(fields, function(f) {
            name = f.name;
            if (name in values) {
                obj[name] = values[name];
            }
        });
        
        var dates = this.dateRangeField.getValue();
        obj[M.StartDate.name] = dates[0];
        obj[M.EndDate.name] = dates[1];
        obj[M.IsAllDay.name] = dates[2];

        record.beginEdit();
        record.set(obj);
        
        if (!keepEditing) {
            record.endEdit();
        }

        return this;
    },
    
    // private
    onSave: function(){
        if(!this.formPanel.form.isValid()){
            return;
        }
        if(!this.updateRecord(this.activeRecord)){
            this.onCancel();
            return;
        }
        this.fireEvent(this.activeRecord.phantom ? 'eventadd' : 'eventupdate', this, this.activeRecord, this.animateTarget);

        // Clear phantom and modified states.
        this.activeRecord.commit();
    },
    
    // private
    onDelete: function(){
        this.fireEvent('eventdelete', this, this.activeRecord, this.animateTarget);
    }
});