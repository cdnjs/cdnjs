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
 * A time picker which provides a list of times from which to choose. This is used by the Ext.form.field.Time
 * class to allow browsing and selection of valid times, but could also be used with other components.
 *
 * By default, all times starting at midnight and incrementing every 15 minutes will be presented. This list of
 * available times can be controlled using the {@link #minValue}, {@link #maxValue}, and {@link #increment}
 * configuration properties. The format of the times presented in the list can be customized with the {@link #format}
 * config.
 *
 * To handle when the user selects a time from the list, you can subscribe to the {@link #selectionchange} event.
 *
 *     @example
 *     Ext.create('Ext.picker.Time', {
 *        width: 60,
 *        minValue: Ext.Date.parse('04:30:00 AM', 'h:i:s A'),
 *        maxValue: Ext.Date.parse('08:00:00 AM', 'h:i:s A'),
 *        renderTo: Ext.getBody()
 *     });
 */
Ext.define('Ext.picker.Time', {
    extend: 'Ext.view.BoundList',
    alias: 'widget.timepicker',
    requires: ['Ext.data.Store', 'Ext.Date'],

    /**
     * @cfg {Date} minValue
     * The minimum time to be shown in the list of times. This must be a Date object (only the time fields will be
     * used); no parsing of String values will be done.
     */

    /**
     * @cfg {Date} maxValue
     * The maximum time to be shown in the list of times. This must be a Date object (only the time fields will be
     * used); no parsing of String values will be done.
     */

    /**
     * @cfg {Number} increment
     * The number of minutes between each time value in the list.
     */
    increment: 15,

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

    /**
     * @private
     * The field in the implicitly-generated Model objects that gets displayed in the list. This is
     * an internal field name only and is not useful to change via config.
     */
    displayField: 'disp',

    /**
     * @private
     * Year, month, and day that all times will be normalized into internally.
     */
    initDate: [2008,0,1],

    componentCls: Ext.baseCSSPrefix + 'timepicker',

    /**
     * @cfg
     * @private
     */
    loadMask: false,

    initComponent: function() {
        var me = this,
            dateUtil = Ext.Date,
            clearTime = dateUtil.clearTime,
            initDate = me.initDate;

        // Set up absolute min and max for the entire day
        me.absMin = clearTime(new Date(initDate[0], initDate[1], initDate[2]));
        me.absMax = dateUtil.add(clearTime(new Date(initDate[0], initDate[1], initDate[2])), 'mi', (24 * 60) - 1);

        me.store = me.createStore();

        // Add our min/max range filter, but do not apply it.
        // The owning TimeField will filter it.
        me.store.addFilter(me.rangeFilter = new Ext.util.Filter({
            id: 'time-picker-filter'
        }), false);

        // Updates the range filter's filterFn according to our configured min and max
        me.updateList();

        me.callParent();
    },

    /**
     * Set the {@link #minValue} and update the list of available times. This must be a Date object (only the time
     * fields will be used); no parsing of String values will be done.
     * @param {Date} value
     */
    setMinValue: function(value) {
        this.minValue = value;
        this.updateList();
    },

    /**
     * Set the {@link #maxValue} and update the list of available times. This must be a Date object (only the time
     * fields will be used); no parsing of String values will be done.
     * @param {Date} value
     */
    setMaxValue: function(value) {
        this.maxValue = value;
        this.updateList();
    },

    /**
     * @private
     * Sets the year/month/day of the given Date object to the {@link #initDate}, so that only
     * the time fields are significant. This makes values suitable for time comparison.
     * @param {Date} date
     */
    normalizeDate: function(date) {
        var initDate = this.initDate;
        date.setFullYear(initDate[0], initDate[1], initDate[2]);
        return date;
    },

    /**
     * Update the list of available times in the list to be constrained within the {@link #minValue}
     * and {@link #maxValue}.
     */
    updateList: function() {
        var me = this,
            min = me.normalizeDate(me.minValue || me.absMin),
            max = me.normalizeDate(me.maxValue || me.absMax);

        me.rangeFilter.setFilterFn(function(record) {
            var date = record.get('date');
            return date >= min && date <= max;
        });
        me.store.filter();
    },

    /**
     * @private
     * Creates the internal {@link Ext.data.Store} that contains the available times. The store
     * is loaded with all possible times, and it is later filtered to hide those times outside
     * the minValue/maxValue.
     */
    createStore: function() {
        var me = this,
            utilDate = Ext.Date,
            times = [],
            min = me.absMin,
            max = me.absMax;

        while(min <= max){
            times.push({
                disp: utilDate.dateFormat(min, me.format),
                date: min
            });
            min = utilDate.add(min, 'mi', me.increment);
        }

        return new Ext.data.Store({
            fields: ['disp', 'date'],
            data: times
        });
    },

    focusNode: function (rec) {
        // We don't want the view being focused when interacting with the inputEl (see Ext.form.field.ComboBox:onKeyUp)
        // so this is here to prevent focus of the boundlist view. See EXTJSIV-7319.
        return false;
    }

});
