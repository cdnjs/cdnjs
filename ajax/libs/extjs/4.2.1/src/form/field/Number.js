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
 * @docauthor Jason Johnston <jason@sencha.com>
 *
 * A numeric text field that provides automatic keystroke filtering to disallow non-numeric characters,
 * and numeric validation to limit the value to a range of valid numbers. The range of acceptable number
 * values can be controlled by setting the {@link #minValue} and {@link #maxValue} configs, and fractional
 * decimals can be disallowed by setting {@link #allowDecimals} to `false`.
 *
 * By default, the number field is also rendered with a set of up/down spinner buttons and has
 * up/down arrow key and mouse wheel event listeners attached for incrementing/decrementing the value by the
 * {@link #step} value. To hide the spinner buttons set `{@link #hideTrigger hideTrigger}:true`; to disable
 * the arrow key and mouse wheel handlers set `{@link #keyNavEnabled keyNavEnabled}:false` and
 * `{@link #mouseWheelEnabled mouseWheelEnabled}:false`. See the example below.
 *
 * # Example usage
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         title: 'On The Wall',
 *         width: 300,
 *         bodyPadding: 10,
 *         renderTo: Ext.getBody(),
 *         items: [{
 *             xtype: 'numberfield',
 *             anchor: '100%',
 *             name: 'bottles',
 *             fieldLabel: 'Bottles of Beer',
 *             value: 99,
 *             maxValue: 99,
 *             minValue: 0
 *         }],
 *         buttons: [{
 *             text: 'Take one down, pass it around',
 *             handler: function() {
 *                 this.up('form').down('[name=bottles]').spinDown();
 *             }
 *         }]
 *     });
 *
 * # Removing UI Enhancements
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         title: 'Personal Info',
 *         width: 300,
 *         bodyPadding: 10,
 *         renderTo: Ext.getBody(),
 *         items: [{
 *             xtype: 'numberfield',
 *             anchor: '100%',
 *             name: 'age',
 *             fieldLabel: 'Age',
 *             minValue: 0, //prevents negative numbers
 *
 *             // Remove spinner buttons, and arrow key and mouse wheel listeners
 *             hideTrigger: true,
 *             keyNavEnabled: false,
 *             mouseWheelEnabled: false
 *         }]
 *     });
 *
 * # Using Step
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         renderTo: Ext.getBody(),
 *         title: 'Step',
 *         width: 300,
 *         bodyPadding: 10,
 *         items: [{
 *             xtype: 'numberfield',
 *             anchor: '100%',
 *             name: 'evens',
 *             fieldLabel: 'Even Numbers',
 *
 *             // Set step so it skips every other number
 *             step: 2,
 *             value: 0,
 *
 *             // Add change handler to force user-entered numbers to evens
 *             listeners: {
 *                 change: function(field, value) {
 *                     value = parseInt(value, 10);
 *                     field.setValue(value + value % 2);
 *                 }
 *             }
 *         }]
 *     });
 */
Ext.define('Ext.form.field.Number', {
    extend:'Ext.form.field.Spinner',
    alias: 'widget.numberfield',
    alternateClassName: ['Ext.form.NumberField', 'Ext.form.Number'],

    /**
     * @cfg {RegExp} stripCharsRe
     * @private
     */
    /**
     * @cfg {RegExp} maskRe
     * @private
     */
     
    /**
     * @cfg {Boolean} [allowExponential=true]
     * Set to `false` to disallow Exponential number notation
     */
    allowExponential: true,

    /**
     * @cfg {Boolean} [allowDecimals=true]
     * False to disallow decimal values
     */
    allowDecimals : true,

    //<locale>
    /**
     * @cfg {String} decimalSeparator
     * Character(s) to allow as the decimal separator
     */
    decimalSeparator : '.',
    //</locale>
    
    //<locale>
    /**
     * @cfg {Boolean} [submitLocaleSeparator=true]
     * False to ensure that the {@link #getSubmitValue} method strips
     * always uses `.` as the separator, regardless of the {@link #decimalSeparator}
     * configuration.
     */
    submitLocaleSeparator: true,
    //</locale>

    //<locale>
    /**
     * @cfg {Number} decimalPrecision
     * The maximum precision to display after the decimal separator
     */
    decimalPrecision : 2,
    //</locale>

    /**
     * @cfg {Number} minValue
     * The minimum allowed value. Will be used by the field's validation logic,
     * and for {@link Ext.form.field.Spinner#setSpinUpEnabled enabling/disabling the down spinner button}.
     *
     * Defaults to Number.NEGATIVE_INFINITY.
     */
    minValue: Number.NEGATIVE_INFINITY,

    /**
     * @cfg {Number} maxValue
     * The maximum allowed value. Will be used by the field's validation logic, and for
     * {@link Ext.form.field.Spinner#setSpinUpEnabled enabling/disabling the up spinner button}.
     *
     * Defaults to Number.MAX_VALUE.
     */
    maxValue: Number.MAX_VALUE,

    /**
     * @cfg {Number} step
     * Specifies a numeric interval by which the field's value will be incremented or decremented when the user invokes
     * the spinner.
     */
    step: 1,

    //<locale>
    /**
     * @cfg {String} minText
     * Error text to display if the minimum value validation fails.
     */
    minText : 'The minimum value for this field is {0}',
    //</locale>

    //<locale>
    /**
     * @cfg {String} maxText
     * Error text to display if the maximum value validation fails.
     */
    maxText : 'The maximum value for this field is {0}',
    //</locale>

    //<locale>
    /**
     * @cfg {String} nanText
     * Error text to display if the value is not a valid number. For example, this can happen if a valid character like
     * '.' or '-' is left in the field with no number.
     */
    nanText : '{0} is not a valid number',
    //</locale>

    //<locale>
    /**
     * @cfg {String} negativeText
     * Error text to display if the value is negative and {@link #minValue} is set to 0. This is used instead of the
     * {@link #minText} in that circumstance only.
     */
    negativeText : 'The value cannot be negative',
    //</locale>

    /**
     * @cfg {String} baseChars
     * The base set of characters to evaluate as valid numbers.
     */
    baseChars : '0123456789',

    /**
     * @cfg {Boolean} autoStripChars
     * True to automatically strip not allowed characters from the field.
     */
    autoStripChars: false,

    initComponent: function() {
        var me = this;
        me.callParent();

        me.setMinValue(me.minValue);
        me.setMaxValue(me.maxValue);
    },

    /**
     * Runs all of Number's validations and returns an array of any errors. Note that this first runs Text's
     * validations, so the returned array is an amalgamation of all field errors. The additional validations run test
     * that the value is a number, and that it is within the configured min and max values.
     * @param {Object} [value] The value to get errors for (defaults to the current field value)
     * @return {String[]} All validation errors for this field
     */
    getErrors: function(value) {
        var me = this,
            errors = me.callParent(arguments),
            format = Ext.String.format,
            num;

        value = Ext.isDefined(value) ? value : this.processRawValue(this.getRawValue());

        if (value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
             return errors;
        }

        value = String(value).replace(me.decimalSeparator, '.');

        if(isNaN(value)){
            errors.push(format(me.nanText, value));
        }

        num = me.parseValue(value);

        if (me.minValue === 0 && num < 0) {
            errors.push(this.negativeText);
        }
        else if (num < me.minValue) {
            errors.push(format(me.minText, me.minValue));
        }

        if (num > me.maxValue) {
            errors.push(format(me.maxText, me.maxValue));
        }


        return errors;
    },

    rawToValue: function(rawValue) {
        var value = this.fixPrecision(this.parseValue(rawValue));
        if (value === null) {
            value = rawValue || null;
        }
        return  value;
    },

    valueToRaw: function(value) {
        var me = this,
            decimalSeparator = me.decimalSeparator;
        value = me.parseValue(value);
        value = me.fixPrecision(value);
        value = Ext.isNumber(value) ? value : parseFloat(String(value).replace(decimalSeparator, '.'));
        value = isNaN(value) ? '' : String(value).replace('.', decimalSeparator);
        return value;
    },
    
    getSubmitValue: function() {
        var me = this,
            value = me.callParent();
            
        if (!me.submitLocaleSeparator) {
            value = value.replace(me.decimalSeparator, '.');
        }  
        return value;
    },

    onChange: function() {
        this.toggleSpinners();
        this.callParent(arguments);
    },
    
    toggleSpinners: function(){
        var me = this,
            value = me.getValue(),
            valueIsNull = value === null,
            enabled;
        
        // If it's disabled, only allow it to be re-enabled if we are
        // the ones who are disabling it.
        if (me.spinUpEnabled || me.spinUpDisabledByToggle) {
            enabled = valueIsNull || value < me.maxValue;
            me.setSpinUpEnabled(enabled, true);
        }
        
        
        if (me.spinDownEnabled || me.spinDownDisabledByToggle) {
            enabled = valueIsNull || value > me.minValue;
            me.setSpinDownEnabled(enabled, true);
        }
    },

    /**
     * Replaces any existing {@link #minValue} with the new value.
     * @param {Number} value The minimum value
     */
    setMinValue : function(value) {
        var me = this,
            allowed;
        
        me.minValue = Ext.Number.from(value, Number.NEGATIVE_INFINITY);
        me.toggleSpinners();
        
        // Build regexes for masking and stripping based on the configured options
        if (me.disableKeyFilter !== true) {
            allowed = me.baseChars + '';
            
            if (me.allowExponential) {
                allowed += me.decimalSeparator + 'e+-';
            }
            else {
                if (me.allowDecimals) {
                    allowed += me.decimalSeparator;
                }
                if (me.minValue < 0) {
                    allowed += '-';
                }
            }
            
            allowed = Ext.String.escapeRegex(allowed);
            me.maskRe = new RegExp('[' + allowed + ']');
            if (me.autoStripChars) {
                me.stripCharsRe = new RegExp('[^' + allowed + ']', 'gi');
            }
        }
    },

    /**
     * Replaces any existing {@link #maxValue} with the new value.
     * @param {Number} value The maximum value
     */
    setMaxValue: function(value) {
        this.maxValue = Ext.Number.from(value, Number.MAX_VALUE);
        this.toggleSpinners();
    },

    // private
    parseValue : function(value) {
        value = parseFloat(String(value).replace(this.decimalSeparator, '.'));
        return isNaN(value) ? null : value;
    },

    /**
     * @private
     */
    fixPrecision : function(value) {
        var me = this,
            nan = isNaN(value),
            precision = me.decimalPrecision;

        if (nan || !value) {
            return nan ? '' : value;
        } else if (!me.allowDecimals || precision <= 0) {
            precision = 0;
        }

        return parseFloat(Ext.Number.toFixed(parseFloat(value), precision));
    },

    beforeBlur : function() {
        var me = this,
            v = me.parseValue(me.getRawValue());

        if (!Ext.isEmpty(v)) {
            me.setValue(v);
        }
    },
    
    setSpinUpEnabled: function(enabled, /* private */ internal){
        this.callParent(arguments);
        if (!internal) {
            delete this.spinUpDisabledByToggle;
        } else {
            this.spinUpDisabledByToggle = !enabled;
        }
    },

    onSpinUp: function() {
        var me = this;
            
        if (!me.readOnly) {
            me.setSpinValue(Ext.Number.constrain(me.getValue() + me.step, me.minValue, me.maxValue));
        }
    },
    
    setSpinDownEnabled: function(enabled, /* private */ internal){
        this.callParent(arguments);
        if (!internal) {
            delete this.spinDownDisabledByToggle;
        } else {
            this.spinDownDisabledByToggle = !enabled;
        }   
    },

    onSpinDown: function() {
        var me = this;
        
        if (!me.readOnly) {
            me.setSpinValue(Ext.Number.constrain(me.getValue() - me.step, me.minValue, me.maxValue));
        }
    },
    
    setSpinValue: function(value) {
        var me = this,
            len;
            
        if (me.enforceMaxLength) {
            // We need to round the value here, otherwise we could end up with a
            // very long number (think 0.1 + 0.2)
            if (me.fixPrecision(value).toString().length > me.maxLength) {
                return;
            }
        }
        me.setValue(value);
    }
});
