/**
 * Provides a time input field with a time dropdown and automatic time validation.
 *
 * This field recognizes and uses JavaScript Date objects as its main {@link #value} type (only the time portion of the
 * date is used; the month/day/year are ignored). In addition, it recognizes string values which are parsed according to
 * the {@link #format} and/or {@link #altFormats} configs. These may be reconfigured to use time formats appropriate for
 * the user's locale.
 *
 * The field may be limited to a certain range of times by using the {@link #minValue} and {@link #maxValue} configs,
 * and the interval between time options in the dropdown can be changed with the {@link #increment} config.
 *
 * Example usage:
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         title: 'Time Card',
 *         width: 300,
 *         bodyPadding: 10,
 *         renderTo: Ext.getBody(),
 *         items: [{
 *             xtype: 'timefield',
 *             name: 'in',
 *             fieldLabel: 'Time In',
 *             minValue: '6:00 AM',
 *             maxValue: '8:00 PM',
 *             increment: 30,
 *             anchor: '100%'
 *         }, {
 *             xtype: 'timefield',
 *             name: 'out',
 *             fieldLabel: 'Time Out',
 *             minValue: '6:00 AM',
 *             maxValue: '8:00 PM',
 *             increment: 30,
 *             anchor: '100%'
 *        }]
 *     });
 */
Ext.define('Ext.form.field.Time', {
    extend:'Ext.form.field.ComboBox',
    alias: 'widget.timefield',
    requires: ['Ext.form.field.Date', 'Ext.picker.Time', 'Ext.view.BoundListKeyNav', 'Ext.Date'],
    alternateClassName: ['Ext.form.TimeField', 'Ext.form.Time'],

    /**
     * @cfg {String} [triggerCls='x-form-time-trigger']
     * An additional CSS class used to style the trigger button. The trigger will always get the {@link Ext.form.trigger.Trigger#baseCls}
     * by default and triggerCls will be **appended** if specified.
     */
    triggerCls: Ext.baseCSSPrefix + 'form-time-trigger',

    /**
     * @cfg {Date/String} minValue
     * The minimum allowed time. Can be either a Javascript date object with a valid time value or a string time in a
     * valid format -- see {@link #format} and {@link #altFormats}.
     */

    /**
     * @cfg {Date/String} maxValue
     * The maximum allowed time. Can be either a Javascript date object with a valid time value or a string time in a
     * valid format -- see {@link #format} and {@link #altFormats}.
     */

    //<locale>
    /**
     * @cfg {String} minText
     * The error text to display when the entered time is before {@link #minValue}.
     */
    minText : "The time in this field must be equal to or after {0}",
    //</locale>

    //<locale>
    /**
     * @cfg {String} maxText
     * The error text to display when the entered time is after {@link #maxValue}.
     */
    maxText : "The time in this field must be equal to or before {0}",
    //</locale>

    //<locale>
    /**
     * @cfg {String} invalidText
     * The error text to display when the time in the field is invalid.
     */
    invalidText : "{0} is not a valid time",
    //</locale>

    //<locale>
    /**
     * @cfg {String} [format=undefined]
     * The default time format string which can be overriden for localization support. The format must be valid
     * according to {@link Ext.Date#parse}.
     *
     * Defaults to `'g:i A'`, e.g., `'3:15 PM'`. For 24-hour time format try `'H:i'` instead.
     */
    format : "g:i A",
    //</locale>

    //<locale>
    /**
     * @cfg {String} [submitFormat=undefined]
     * The date format string which will be submitted to the server. The format must be valid according to
     * {@link Ext.Date#parse}.
     *
     * Defaults to {@link #format}.
     */
    //</locale>

    //<locale>
    /**
     * @cfg {String} altFormats
     * Multiple date formats separated by "|" to try when parsing a user input value and it doesn't match the defined
     * format.
     */
    altFormats : "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H|gi a|hi a|giA|hiA|gi A|hi A",
    //</locale>

    /**
     * @cfg {Number} [increment=15]
     * The number of minutes between each time value in the list.
     *
     * Note that this only affects the *list of suggested times.*
     *
     * To enforce that only times on the list are valid, use {@link #snapToIncrement}. That will coerce
     * any typed values to the nearest increment point upon blur.
     */
    increment: 15,

    /**
     * @cfg {Number} pickerMaxHeight
     * The maximum height of the {@link Ext.picker.Time} dropdown.
     */
    pickerMaxHeight: 300,

    /**
     * @cfg {Boolean} selectOnTab
     * Whether the Tab key should select the currently highlighted item.
     */
    selectOnTab: true,

    /**
     * @cfg {Boolean} [snapToIncrement=false]
     * Specify as `true` to enforce that only values on the {@link #increment} boundary are accepted.
     *
     * Typed values will be coerced to the nearest {@link #increment} point on blur.
     */
    snapToIncrement: false,

    /**
     * @private
     * This is the date to use when generating time values in the absence of either minValue
     * or maxValue.  Using the current date causes DST issues on DST boundary dates, so this is an
     * arbitrary "safe" date that can be any date aside from DST boundary dates.
     */
    initDate: '1/1/2008',
    initDateParts: [2008, 0, 1],
    initDateFormat: 'j/n/Y',
    
    ignoreSelection: 0,

    queryMode: 'local',

    displayField: 'disp',

    valueField: 'date',

    initComponent: function() {
        var me = this,
            min = me.minValue,
            max = me.maxValue;
        
        if (min) {
            me.setMinValue(min);
        }
        if (max) {
            me.setMaxValue(max);
        }
        // Forcibly create the picker, since we need the store it creates
        me.store = me.getPicker().store;
        
        me.displayTpl = new Ext.XTemplate(
            '<tpl for=".">' +
                '{[typeof values === "string" ? values : this.formatDate(values["' + me.displayField + '"])]}' +
                '<tpl if="xindex < xcount">' + me.delimiter + '</tpl>' +
            '</tpl>', {
            formatDate: me.formatDate.bind(me)
        });
        me.callParent();
    },

    /**
     * @private
     */
    isEqual: function (v1, v2) {
        var fromArray = Ext.Array.from,
            isEqual = Ext.Date.isEqual,
            i, len;

        v1 = fromArray(v1);
        v2 = fromArray(v2);
        len = v1.length;

        if (len !== v2.length) {
            return false;
        }

        for (i = 0; i < len; i++) {
            if (!isEqual(v2[i], v1[i])) {
                return false;
            }
        }

        return true;
    },

    /**
     * Replaces any existing {@link #minValue} with the new time and refreshes the picker's range.
     * @param {Date/String} value The minimum time that can be selected
     */
    setMinValue: function(value) {
        var me = this,
            picker = me.picker;
        me.setLimit(value, true);
        if (picker) {
            picker.setMinValue(me.minValue);
        }
    },

    /**
     * Replaces any existing {@link #maxValue} with the new time and refreshes the picker's range.
     * @param {Date/String} value The maximum time that can be selected
     */
    setMaxValue: function(value) {
        var me = this,
            picker = me.picker;
        me.setLimit(value, false);
        if (picker) {
            picker.setMaxValue(me.maxValue);
        }
    },

    /**
     * @private
     * Updates either the min or max value. Converts the user's value into a Date object whose
     * year/month/day is set to the {@link #initDate} so that only the time fields are significant.
     */
    setLimit: function(value, isMin) {
        var me = this,
            d, val;
        if (Ext.isString(value)) {
            d = me.parseDate(value);
        }
        else if (Ext.isDate(value)) {
            d = value;
        }
        if (d) {
            val = me.getInitDate();
            val.setHours(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
        }
        // Invalid min/maxValue config should result in a null so that defaulting takes over
        else {
            val = null;
        }
        me[isMin ? 'minValue' : 'maxValue'] = val;
    },
    
    getInitDate: function (hours, minutes, seconds) {
        var parts = this.initDateParts;

        return new Date(parts[0], parts[1], parts[2], hours || 0, minutes || 0, seconds || 0, 0);    
    },

    valueToRaw: function(value) {
        return this.formatDate(this.parseDate(value));
    },

    /**
     * Runs all of Time's validations and returns an array of any errors. Note that this first runs Text's validations,
     * so the returned array is an amalgamation of all field errors. The additional validation checks are testing that
     * the time format is valid, that the chosen time is within the {@link #minValue} and {@link #maxValue} constraints
     * set.
     * @param {Object} [value] The value to get errors for (defaults to the current field value)
     * @return {String[]} All validation errors for this field
     */
    getErrors: function(value) {
        var me = this,
            format = Ext.String.format,
            errors = me.callParent(arguments),
            minValue = me.minValue,
            maxValue = me.maxValue,
            data = me.displayTplData,
            raw = me.getRawValue(),
            i, len, date, item;

        if (data && data.length > 0) {
            for (i = 0, len = data.length; i < len; i++ ){
                item = data[i];
                item = item.date || item.disp;
                date = me.parseDate(item);
                if (!date) {
                    errors.push(format(me.invalidText, item, Ext.Date.unescapeFormat(me.format)));
                    continue;
                }

                if (minValue && date < minValue) {
                    errors.push(format(me.minText, me.formatDate(minValue)));
                }

                if (maxValue && date > maxValue) {
                    errors.push(format(me.maxText, me.formatDate(maxValue)));
                }
            }
        } else if (raw.length && !me.parseDate(raw)) {
            // If we don't have any data & a rawValue, it means an invalid time was entered.
            errors.push(format(me.invalidText, raw, Ext.Date.unescapeFormat(me.format)));
        }

        return errors;
    },

    formatDate: function(items) {
        var formatted = [],
            i, len;

        items = Ext.Array.from(items);

        for (i = 0, len = items.length; i < len; i++) {
            formatted.push(Ext.form.field.Date.prototype.formatDate.call(this, items[i]));
        }

        return formatted.join(this.delimiter);
    },

    /**
     * @private
     * Parses an input value into a valid Date object.
     * @param {String/Date} value
     */
    parseDate: function(value) {
        var me = this,
            val = value,
            altFormats = me.altFormats,
            altFormatsArray = me.altFormatsArray,
            i = 0,
            len;

        if (value && !Ext.isDate(value)) {
            val = me.safeParse(value, me.format);

            if (!val && altFormats) {
                altFormatsArray = altFormatsArray || altFormats.split('|');
                len = altFormatsArray.length;
                for (; i < len && !val; ++i) {
                    val = me.safeParse(value, altFormatsArray[i]);
                }
            }
        }

        // If configured to snap, snap resulting parsed Date to the closest increment.
        if (val && me.snapToIncrement) {
            val = new Date(Ext.Number.snap(val.getTime(), me.increment * 60 * 1000));
        }
        return val;
    },

    safeParse: function(value, format){
        var me = this,
            utilDate = Ext.Date,
            parsedDate,
            result = null;

        if (utilDate.formatContainsDateInfo(format)) {
            // assume we've been given a full date
            result = utilDate.parse(value, format);
        } else {
            // Use our initial safe date
            parsedDate = utilDate.parse(me.initDate + ' ' + value, me.initDateFormat + ' ' + format);
            if (parsedDate) {
                result = parsedDate;
            }
        }
        return result;
    },

    // @private
    getSubmitValue: function() {
        var me = this,
            format = me.submitFormat || me.format,
            value = me.getValue();

        return value ? Ext.Date.format(value, format) : null;
    },

    /**
     * @private
     * Creates the {@link Ext.picker.Time}
     */
    createPicker: function() {
        var me = this,
            picker;

        me.listConfig = Ext.apply({
            xtype: 'timepicker',
            selModel: {
                mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
            },
            cls: undefined,
            minValue: me.minValue,
            maxValue: me.maxValue,
            increment: me.increment,
            format: me.format,
            maxHeight: me.pickerMaxHeight
        }, me.listConfig);
        picker = me.callParent();
        return picker;
    },
    
    onItemClick: function(picker, record){
        // The selection change events won't fire when clicking on the selected element. Detect it here.
        var me = this,
            selected = picker.getSelectionModel().getSelection();

        if (!me.multiSelect && selected.length) {
            if (selected.length > 0) {
                selected = selected[0];
                if (selected && Ext.Date.isEqual(record.get('date'), selected.get('date'))) {
                    me.collapse();
                }
            }
        }
    },

    /**
     * @private 
     * Synchronizes the selection in the picker to match the current value
     */
    syncSelection: function() {
        var me = this,
            picker = me.picker,
            isEqual = Ext.Date.isEqual,
            toSelect = [],
            selModel,
            value, values, i, len, item,
            data, d, dLen, rec;
            
        if (picker) {
            picker.clearHighlight();
            value = me.getValue();
            selModel = picker.getSelectionModel();
            // Update the selection to match
            me.ignoreSelection++;
            if (value === null) {
                selModel.deselectAll();
            } else {
                values = Ext.Array.from(value);
                data = picker.store.data.items;
                dLen = data.length;

                for (i = 0, len = values.length; i < len; i++) {
                    item = values[i];
                    if (Ext.isDate(item)) {
                        // find value, select it
                        for (d = 0; d < dLen; d++) {
                            rec = data[d];

                            if (isEqual(rec.get('date'), item)) {
                               toSelect.push(rec);
                               if (!me.multiSelect) {
                                   break;
                               }
                           }
                        }

                        if (toSelect.length) {
                            selModel.select(toSelect);
                        }
                    }
                }
            }
            me.ignoreSelection--;
        }
    },

    postBlur: function() {
        var me = this,
            val = me.getValue();

        me.callParent(arguments);

        // Only set the raw value if the current value is valid and is not falsy
        if (me.validateValue(val)) {
            me.setValue(val);
        }
    },

    /**
     * Finds the record by searching values in the {@link #valueField}.
     * @param {Object/String} value The value to match the field against.
     * @return {Ext.data.Model} The matched record or false.
     */
    findRecordByValue: function (value) {
        if (typeof value === 'string') {
            value = this.parseDate(value);
        }
        return this.callParent([value]);
    },

    rawToValue: function (item) {
        var me = this,
            items, values, i, len;

        if (me.multiSelect) {
            values = [];
            items = Ext.Array.from(item);

            for (i = 0, len = items.length; i < len; i++) {
                values.push(me.parseDate(items[i]));
            }

            return values;
        }

        return me.parseDate(item);
    },

    setValue: function (v) {
        // Store MUST be created for parent setValue to function.
        this.getPicker();

        if (Ext.isDate(v)) {
            v = this.getInitDate(v.getHours(), v.getMinutes(), v.getSeconds());
        }

        return this.callParent([v]);
    },

    getValue: function () {
        return this.rawToValue(this.callParent(arguments));
    }
});
