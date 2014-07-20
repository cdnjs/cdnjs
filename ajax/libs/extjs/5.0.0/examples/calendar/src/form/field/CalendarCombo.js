/**
 * @class Ext.calendar.form.field.CalendarCombo
 * @extends Ext.form.ComboBox
 * <p>A custom combo used for choosing from the list of available calendars to assign an event to.</p>
 * <p>This is pretty much a standard combo that is simply pre-configured for the options needed by the
 * calendar components. The default configs are as follows:<pre><code>
    fieldLabel: 'Calendar',
    triggerAction: 'all',
    queryMode: 'local',
    forceSelection: true,
    selectOnFocus: true,
    width: 200
</code></pre>
 * @constructor
 * @param {Object} config The config object
 */
Ext.define('Ext.calendar.form.field.CalendarCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.calendarpicker',
    requires: [
        'Ext.calendar.data.CalendarMappings'
    ],

    fieldLabel: 'Calendar',
    triggerAction: 'all',
    queryMode: 'local',
    forceSelection: true,
    selectOnFocus: true,
    
    // private
    defaultCls: 'ext-color-default',

    // private
    initComponent: function(){
        this.valueField = Ext.calendar.data.CalendarMappings.CalendarId.name;
        this.displayField = Ext.calendar.data.CalendarMappings.Title.name;
    
        this.listConfig = Ext.apply(this.listConfig || {}, {
            getInnerTpl: this.getListItemTpl
        });
        
        this.callParent(arguments);
    },
    
    // private
    getListItemTpl: function(displayField) {
        return '<div class="x-combo-list-item ext-color-{' + Ext.calendar.data.CalendarMappings.CalendarId.name +
                '}"><div class="ext-cal-picker-icon">&#160;</div>{' + displayField + '}</div>';
    },
    
    // private
    afterRender: function(){
        this.callParent(arguments);
        
        this.wrap = this.el.down('.x-form-text-wrap');
        this.wrap.addCls('ext-calendar-picker');
        
        this.icon = Ext.core.DomHelper.append(this.wrap, {
            tag: 'div', cls: 'ext-cal-picker-icon ext-cal-picker-mainicon'
        });
    },
    
    /* @private
     * Value can be a data value or record, or an array of values or records.
     */
    getStyleClass: function(value){
        var val = value;
        
        if (!Ext.isEmpty(val)) {
            if (Ext.isArray(val)) {
                val = val[0];
            }
            return 'ext-color-' + (val.data ? val.data[Ext.calendar.data.CalendarMappings.CalendarId.name] : val); 
        }
        return '';
    },
    
    // inherited docs
    setValue: function(value) {
        if (!value && this.store.getCount() > 0) {
            // ensure that a valid value is always set if possible
            value = this.store.getAt(0).data[Ext.calendar.data.CalendarMappings.CalendarId.name];
        }
        
        if (this.wrap && value) {
            var currentClass = this.getStyleClass(this.getValue()),
                newClass = this.getStyleClass(value);
            
            this.wrap.replaceCls(currentClass, newClass);
        }
        
        this.callParent(arguments);
    }
});