/**
 * Filter by a configurable Ext.picker.DatePicker menu
 *
 * Example Usage:
 *
 *     var grid = Ext.create('Ext.grid.Panel', {
 *         ...
 *         columns: [{
 *             // required configs
 *             text: 'Date Added',
 *             dataIndex: 'dateAdded',
 *
 *             filter: {
 *                 type: 'date',
 *      
 *                 // optional configs
 *                 dateFormat: 'm/d/Y',  // default
 *                 beforeText: 'Before', // default
 *                 afterText: 'After',   // default
 *                 onText: 'On',         // default
 *                 pickerOpts: {
 *                     // any DatePicker configs
 *                 },
 *      
 *                 active: true // default is false
 *             }
 *         }],
 *         ...
 *     });
 */
Ext.define('Ext.grid.filters.filter.Date', {
    extend: 'Ext.grid.filters.filter.TriFilter',
    alias: 'grid.filter.date',
    uses: ['Ext.picker.Date', 'Ext.menu.Menu'],

    type: 'date',

    config: {
        /**
         * @cfg {Object} [fields]
         * Configures field items individually. These properties override those defined
         * by `{@link #itemDefaults}`.
         *
         * Example usage:
         *      fields: {
         *          gt: { // override fieldCfg options
         *              width: 200
         *          }
         *      },
         */
        fields: {
            lt: {
                text: 'Before'
            },
            gt: {
                text: 'After'
            },
            eq: {
                text: 'On'
            }
        },

        /**
         * @cfg {Object} pickerOpts
         * Configuration options for the date picker associated with each field.
         */
        pickerDefaults: {
            xtype: 'datepicker',
            border: 0
        }
    },

    itemDefaults: {
        xtype: 'menucheckitem',
        selectOnFocus: true,
        width: 125,
        menu: {
            layout: 'auto',
            plain: true
        }
    },

    /**
     * @cfg {String} dateFormat
     * The date format to return when using getValue.
     * Defaults to 'm/d/Y'.
     */
    dateFormat: 'm/d/Y',

    /**
     * @cfg {Date} maxDate
     * Allowable date as passed to the Ext.DatePicker
     * Defaults to undefined.
     */

    /**
     * @cfg {Date} minDate
     * Allowable date as passed to the Ext.DatePicker
     * Defaults to undefined.
     */

    /**
     * @private
     * Will convert a timestamp to a Date object or vice-versa.
     * @param {Date/Number} value
     * @param {Boolean} [convertToDate]
     * @return {Date/Number}
     */
    convertValue: function (value, convertToDate) {
        if (convertToDate && !Ext.isDate(value)) {
            value = Ext.isDate(value);
        } else if (!convertToDate && Ext.isDate(value)) {
            value = (+value);
        }

        return value;
    },

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    createMenu: function (config) {
        var me = this,
            listeners = {
                scope: me,
                checkchange: me.onCheckChange
            },
            fields, itemDefaults, pickerCfg, i, len,
            key, item, cfg, field;

        this.callParent(arguments);

        itemDefaults = me.getItemDefaults();
        fields = me.getFields();

        pickerCfg = Ext.apply({
            minDate: me.minDate,
            maxDate: me.maxDate,
            format:  me.dateFormat,
            listeners: {
                scope: me,
                select: me.onMenuSelect
            }
        }, me.getPickerDefaults());

        me.fields = {};

        for (i = 0, len = me.menuItems.length; i < len; i++) {
            key = me.menuItems[i];
            if (key !== '-') {
                cfg = {
                    menu: {
                        items: [
                            Ext.apply({
                                itemId: key
                            }, pickerCfg)
                        ]
                    }
                };

                if (itemDefaults) {
                    Ext.merge(cfg, itemDefaults);
                }

                if (fields) {
                    Ext.merge(cfg, fields[key]);
                }

                item = me.menu.add(cfg);
                // Date filter types need the field to be the datepicker in TriFilter.setValue().
                field = me.fields[key] = item.down('datepicker');
                field.filter = me.filter[key];
                field.filterKey = key;

                item.on(listeners);
            }
        }
    },

    /**
     * Gets the menu picker associated with the passed field
     * @param {String} item The field identifier ('lt', 'gt', 'eq')
     * @return {Object} The menu picker
     */
    getPicker: function (item){
        return this.fields[item];
    },

    /**
     * @private
     * Handler method called when there is a keyup event on an input
     * item of this menu.
     */
    /*
    onInputKeyUp : function (field, e) {
        var k = e.getKey();
        if (k == e.RETURN && field.isValid()) {
            e.stopEvent();
            this.menu.hide();
        }
    },
    */

    /**
     * @private
     * Remove the filter from the store but don't update its value or the field UI.
    */
    onCheckChange: function (field, checked) {
        // Only do something if unchecked.  If checked, it doesn't mean anything at this point since the column's store filter won't have
        // any value (i.e., if a user checked this from an unchecked state, the corresponding field won't have a value for its filter).
        var filter = field.down('datepicker').filter,
            v;

        // Only proceed if unchecked AND there's a filter value (i.e., there's something to do!).
        if (!checked && filter.getValue()) {
            // Normally we just want to remove the filter from the store, not also to null out the filter value. But, we want to call setValue()
            // which will take care of unchecking the top-level menu item if it's been determined that Date* doesn't have any filters.
            v = {};
            v[filter.getOperator()] = null;
            this.setValue(v);
        }
    },

    onFilterRemove: function (operator) {
        var v = {};

        v[operator] = null;
        this.setValue(v);
        this.fields[operator].up('menuitem').setChecked(false, /*suppressEvents*/ true);
    },

    /**
     * Handler for when the DatePicker for a field fires the 'select' event
     * @param {Ext.picker.Date} picker
     * @param {Object} date
     */
    onMenuSelect: function (picker, date) {
        var fields = this.fields,
            field = fields[picker.itemId],
            gt = fields.gt,
            lt = fields.lt,
            eq = fields.eq,
            v = {};

        field.up('menuitem').setChecked(true, /*suppressEvents*/ true);

        if (field === eq) {
            lt.up('menuitem').setChecked(false, true);
            gt.up('menuitem').setChecked(false, true);
        } else {
            eq.up('menuitem').setChecked(false, true);
            if (field === gt && (+lt.value < +date)) {
                lt.up('menuitem').setChecked(false, true);
            } else if (field === lt && (+gt.value > +date)) {
                gt.up('menuitem').setChecked(false, true);
            }
        }

        v[field.filterKey] = date;
        this.setValue(v);

        picker.up('menu').hide();
      }
});
