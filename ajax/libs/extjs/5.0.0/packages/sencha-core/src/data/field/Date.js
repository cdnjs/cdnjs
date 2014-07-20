/**
 * This class provides Date specific processing for fields.
 *
 * In previous releases this functionality was integral to the `Field` base class.
 */
Ext.define('Ext.data.field.Date', {
    extend: 'Ext.data.field.Field',

    alias: 'data.field.date',

    sortType: 'asDate',

    isDateField: true,

    /**
     * @cfg {String} dateFormat
     *
     * Serves as a default for the {@link #dateReadFormat} and {@link #dateWriteFormat} config options. This
     * will be used in place of those other configurations if not specified.
     * 
     * A format string for the {@link Ext.Date#parse Ext.Date.parse} function, or "timestamp" if the value provided by
     * the Reader is a UNIX timestamp, or "time" if the value provided by the Reader is a javascript millisecond
     * timestamp. See {@link Ext.Date}.
     * 
     * It is quite important to note that while this config is optional, it will default to using the base
     * JavaScript Date object's `parse` function if not specified, rather than {@link Ext.Date#parse Ext.Date.parse}.
     * This can cause unexpected issues, especially when converting between timezones, or when converting dates that
     * do not have a timezone specified. The behavior of the native `Date.parse` is implementation-specific, and
     * depending on the value of the date string, it might return the UTC date or the local date. __For this reason
     * it is strongly recommended that you always specify an explicit date format when parsing dates.__
     */
    dateFormat: null,

    /**
     * @cfg {String} dateReadFormat
     * Used when converting received data into a Date when the {@link #type} is specified as `"date"`.
     * This configuration takes precedence over {@link #dateFormat}.
     * See {@link #dateFormat} for more information.
     */
    dateReadFormat: null,

    /** 
     * @cfg {String} dateWriteFormat
     * Provides a custom format when serializing dates with a {@link Ext.data.writer.Writer}.
     * If this is not specified, the {@link #dateFormat} will be used. If no `dateFormat`
     * is specified, 'timestamp' format is used.
     *
     * See the {@link Ext.data.writer.Writer} docs for more information on writing dates.
     *
     * **Note** It is not possible to use the standard date serialization pathway or {@link Ext#USE_NATIVE_JSON native browser JSON production}
     * to use a {@link Ext.data.JsonWriter JsonWriter} to send Microsoft formated
     * "JSON" dates.
     *
     * To use a {@link Ext.data.JsonWriter JsonWriter} to write dates in a JSON packet in
     * the form `"\/Date(1357372800000)\/"` configure the field like this:
     *
     *    {
     *        type: 'date',
     *        dateFormat: 'MS',     // To parse incoming dates from server correctly
     *        serialize: null       // Avoid formatting or conversion by the Writer
     *    }
     *
     * Then override the `Ext.JSON` date serialize function:
     *
     *    Ext.JSON.encodeDate = function (d) {
     *        return '"' + Ext.Date.format(d, 'MS') + '"';
     *    };
     */
    dateWriteFormat: null,

    compare: function (lhs, rhs) {
        var lhsIsDate = lhs instanceof Date,
            rhsIsDate = rhs instanceof Date,
            result;
            
        if (rhsIsDate && lhsIsDate) {
            result = lhs.getTime() - rhs.getTime();
            if (result === 0) {
                result = 0;
            } else {
                result = result < 0 ? -1 : 1;
            }
        } else if (lhsIsDate === rhsIsDate) {
            result = 0;
        } else {
            result = lhsIsDate ? 1 : -1;
        }
        return result;
    },

    convert: function(v) {
        if (!v) {
            return null;
        }

        // instanceof check ~10 times faster than Ext.isDate. Values here will not be
        // cross-document objects
        if (v instanceof Date) {
            return v;
        }

        var dateFormat = this.dateReadFormat || this.dateFormat,
            parsed;

        if (dateFormat) {
            return Ext.Date.parse(v, dateFormat);
        }

        parsed = Date.parse(v);
        return parsed ? new Date(parsed) : null;
    },

    serialize: function (value) {
        var result = null,
            format;

        if (Ext.isDate(value)) {
            format = this.getDateWriteFormat();
            result = format ? Ext.Date.format(value, format) : value;
        }

        return result;
    },
    
    /**
     * Gets the dateFormat for this field. See {@link #dateFormat}.
     * @return {String} dateFormat
     */
    getDateFormat: function() {
        return this.dateFormat;
    },
    
    /**
     * Gets the dateReadFormat for this field. See {@link #dateReadFormat}.
     * @return {String} dateReadFormat
     */
    getDateReadFormat: function() {
        return this.dateReadFormat;
    },
    
    /**
     * Gets the dateWriteFormat for this field. See {@link #dateWriteFormat}.
     * @return {String} dateWriteFormat
     */
    getDateWriteFormat: function() {
        var me = this;

        if (me.hasOwnProperty('dateWriteFormat')) {
            return me.dateWriteFormat;
        }

        if (me.hasOwnProperty('dateFormat')) {
            return me.dateFormat;
        }

        return me.dateWriteFormat || me.dateFormat || 'timestamp';
    },
    
    getType: function() {
        return 'date';
    }
});
