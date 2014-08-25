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
 * A {@link Ext.form.FieldContainer field container} which has a specialized layout for arranging
 * {@link Ext.form.field.Radio} controls into columns, and provides convenience {@link Ext.form.field.Field}
 * methods for {@link #getValue getting}, {@link #setValue setting}, and {@link #validate validating} the
 * group of radio buttons as a whole.
 *
 * # Validation
 *
 * Individual radio buttons themselves have no default validation behavior, but
 * sometimes you want to require a user to select one of a group of radios. RadioGroup
 * allows this by setting the config `{@link #allowBlank}:false`; when the user does not check at
 * one of the radio buttons, the entire group will be highlighted as invalid and the
 * {@link #blankText error message} will be displayed according to the {@link #msgTarget} config.
 *
 * # Layout
 *
 * The default layout for RadioGroup makes it easy to arrange the radio buttons into
 * columns; see the {@link #columns} and {@link #vertical} config documentation for details. You may also
 * use a completely different layout by setting the {@link #layout} to one of the other supported layout
 * types; for instance you may wish to use a custom arrangement of hbox and vbox containers. In that case
 * the Radio components at any depth will still be managed by the RadioGroup's validation.
 *
 * # Example usage
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         title: 'RadioGroup Example',
 *         width: 300,
 *         height: 125,
 *         bodyPadding: 10,
 *         renderTo: Ext.getBody(),
 *         items:[{
 *             xtype: 'radiogroup',
 *             fieldLabel: 'Two Columns',
 *             // Arrange radio buttons into two columns, distributed vertically
 *             columns: 2,
 *             vertical: true,
 *             items: [
 *                 { boxLabel: 'Item 1', name: 'rb', inputValue: '1' },
 *                 { boxLabel: 'Item 2', name: 'rb', inputValue: '2', checked: true},
 *                 { boxLabel: 'Item 3', name: 'rb', inputValue: '3' },
 *                 { boxLabel: 'Item 4', name: 'rb', inputValue: '4' },
 *                 { boxLabel: 'Item 5', name: 'rb', inputValue: '5' },
 *                 { boxLabel: 'Item 6', name: 'rb', inputValue: '6' }
 *             ]
 *         }]
 *     });
 *
 */
Ext.define('Ext.form.RadioGroup', {
    extend: 'Ext.form.CheckboxGroup',
    alias: 'widget.radiogroup',

    requires: [
        'Ext.form.field.Radio'
    ],

    /**
     * @cfg {Ext.form.field.Radio[]/Object[]} items
     * An Array of {@link Ext.form.field.Radio Radio}s or Radio config objects to arrange in the group.
     */
    /**
     * @cfg {Boolean} allowBlank
     * True to allow every item in the group to be blank.
     * If allowBlank = false and no items are selected at validation time, {@link #blankText} will
     * be used as the error text.
     */
    allowBlank : true,
    //<locale>
    /**
     * @cfg {String} blankText
     * Error text to display if the {@link #allowBlank} validation fails
     */
    blankText : 'You must select one item in this group',
    //</locale>

    // private
    defaultType : 'radiofield',

    // private
    groupCls : Ext.baseCSSPrefix + 'form-radio-group',

    getBoxes: function(query) {
        return this.query('[isRadio]' + (query||''));
    },
    
    checkChange: function() {
        var value = this.getValue(),
            key = Ext.Object.getKeys(value)[0];
            
        // If the value is an array we skip out here because it's during a change
        // between multiple items, so we never want to fire a change
        if (Ext.isArray(value[key])) {
            return;
        }
        this.callParent(arguments);    
    },

    /**
     * Sets the value of the radio group. The radio with corresponding name and value will be set.
     * This method is simpler than {@link Ext.form.CheckboxGroup#setValue} because only 1 value is allowed
     * for each name.
     * 
     * @param {Object} value The map from names to values to be set.
     * @return {Ext.form.CheckboxGroup} this
     */
    setValue: function(value) {
        var cbValue, first, formId, radios,
            i, len, name;

        if (Ext.isObject(value)) {
            for (name in value) {
                if (value.hasOwnProperty(name)) {
                    cbValue = value[name];
                    first = this.items.first();
                    formId = first ? first.getFormId() : null;
                    radios = Ext.form.RadioManager.getWithValue(name, cbValue, formId).items;
                    len = radios.length;

                    for (i = 0; i < len; ++i) {
                        radios[i].setValue(true);
                    }
                }
            }
        }
        return this;
    }
});
