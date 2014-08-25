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
 * This is a static class containing the system-supplied data types
 * which may be given to a {@link Ext.data.Field Field}.
 *
 * The properties in this class are used as type indicators in the
 * {@link Ext.data.Field Field} class, so to test whether a Field is
 * of a certain type, compare the {@link Ext.data.Field#type type}
 * property against properties of this class.
 *
 * Developers may add their own application-specific data types to
 * this class. Definition names must be UPPERCASE. Each type
 * definition must contain three properties:
 *
 *   - `convert` : Function<br>
 *     A function to convert raw data values from a data block into
 *     the data to be stored in the Field. The function is passed the
 *     collowing parameters:
 *
 *       - **v** : Mixed<br>
 *         The data value as read by the Reader, if undefined will use
 *         the configured {@link Ext.data.Field#defaultValue defaultValue}.
 *       - **rec** : Mixed<br>
 *         The data object containing the row as read by the Reader.
 *         Depending on the Reader type, this could be an Array
 *         ({@link Ext.data.reader.Array ArrayReader}), an object
 *         ({@link Ext.data.reader.Json JsonReader}), or an XML element.
 * 
 *   - `sortType` : Function<br>
 *     A function to convert the stored data into comparable form, as
 *     defined by {@link Ext.data.SortTypes}.
 *
 *   - `type` : String<br>
 *     A textual data type name.
 *
 * For example, to create a VELatLong field (See the Microsoft Bing
 * Mapping API) containing the latitude/longitude value of a datapoint
 * on a map from a JsonReader data block
 *
 * which contained the properties `lat` and `long`, you would define a
 * new data type like this:
 *
 *     // Add a new Field data type which stores a VELatLong object in the Record.
 *     Ext.data.Types.VELATLONG = {
 *         convert: function(v, data) {
 *             return new VELatLong(data.lat, data.long);
 *         },
 *         sortType: function(v) {
 *             return v.Latitude;  // When sorting, order by latitude
 *         },
 *         type: 'VELatLong'
 *     };
 *
 * Then, when declaring a Model, use:
 *
 *     var types = Ext.data.Types; // allow shorthand type access
 *     Ext.define('Unit',
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             { name: 'unitName', mapping: 'UnitName' },
 *             { name: 'curSpeed', mapping: 'CurSpeed', type: types.INT },
 *             { name: 'latitude', mapping: 'lat', type: types.FLOAT },
 *             { name: 'longitude', mapping: 'long', type: types.FLOAT },
 *             { name: 'position', type: types.VELATLONG }
 *         ]
 *     });
 *
 */
Ext.define('Ext.data.Types', {
    singleton: true,
    requires: ['Ext.data.SortTypes']
}, function() {
    var st = Ext.data.SortTypes;

    Ext.apply(Ext.data.Types, {
        /**
         * @property {RegExp} stripRe
         * A regular expression for stripping non-numeric characters from a numeric value.
         * This should be overridden for localization.
         */
        stripRe: /[\$,%]/g,

        /**
         * @property {Object} AUTO
         * This data type means that no conversion is applied to the raw data before it is placed into a Record.
         */
        AUTO: {
            sortType: st.none,
            type: 'auto'
        },

        /**
         * @property {Object} STRING
         * This data type means that the raw data is converted into a String before it is placed into a Record.
         */
        STRING: {
            convert: function(v) {
                var defaultValue = this.useNull ? null : '';
                return (v === undefined || v === null) ? defaultValue : String(v);
            },
            sortType: st.asUCString,
            type: 'string'
        },

        /**
         * @property {Object} INT
         * This data type means that the raw data is converted into an integer before it is placed into a Record.
         *
         * The synonym `INTEGER` is equivalent.
         */
        INT: {
            convert: function(v) {
                // Handle values which are already numbers.
                // Value truncation behaviour of parseInt is historic and must be maintained.
                // parseInt(35.9)  and parseInt("35.9") returns 35
                if (typeof v == 'number') {
                    return parseInt(v);
                }
                return v !== undefined && v !== null && v !== '' ?
                    parseInt(String(v).replace(Ext.data.Types.stripRe, ''), 10) : (this.useNull ? null : 0);
            },
            sortType: st.none,
            type: 'int'
        },

        /**
         * @property {Object} FLOAT
         * This data type means that the raw data is converted into a number before it is placed into a Record.
         *
         * The synonym `NUMBER` is equivalent.
         */
        FLOAT: {
            convert: function(v) {
                if (typeof v === 'number') {
                    return v;
                }
                return v !== undefined && v !== null && v !== '' ?
                    parseFloat(String(v).replace(Ext.data.Types.stripRe, ''), 10) : (this.useNull ? null : 0);
            },
            sortType: st.none,
            type: 'float'
        },

        /**
         * @property {Object} BOOL
         * This data type means that the raw data is converted into a boolean before it is placed into
         * a Record. The string "true" and the number 1 are converted to boolean true.
         *
         * The synonym `BOOLEAN` is equivalent.
         */
        BOOL: {
            convert: function(v) {
                if (typeof v === 'boolean') {
                    return v;
                }
                if (this.useNull && (v === undefined || v === null || v === '')) {
                    return null;
                }
                return v === 'true' || v == 1;
            },
            sortType: st.none,
            type: 'bool'
        },

        /**
         * @property {Object} DATE
         * This data type means that the raw data is converted into a Date before it is placed into a Record.
         * The date format is specified in the constructor of the {@link Ext.data.Field} to which this type is
         * being applied.
         */
        DATE: {
            convert: function(v) {
                var df = this.dateReadFormat || this.dateFormat,
                    parsed;

                if (!v) {
                    return null;
                }
                // instanceof check ~10 times faster than Ext.isDate. Values here will not be cross-document objects
                if (v instanceof Date) {
                    return v;
                }
                if (df) {
                    return Ext.Date.parse(v, df);
                }

                parsed = Date.parse(v);
                return parsed ? new Date(parsed) : null;
            },
            sortType: st.asDate,
            type: 'date'
        }
    });

    Ext.apply(Ext.data.Types, {
        /**
         * @property {Object} BOOLEAN
         * This data type means that the raw data is converted into a boolean before it is placed into
         * a Record. The string "true" and the number 1 are converted to boolean `true`.
         *
         * The synonym `BOOL` is equivalent.
         */
        BOOLEAN: this.BOOL,

        /**
         * @property {Object} INTEGER
         * This data type means that the raw data is converted into an integer before it is placed into a Record.
         *
         * The synonym `INT` is equivalent.
         */
        INTEGER: this.INT,

        /**
         * @property {Object} NUMBER
         * This data type means that the raw data is converted into a number before it is placed into a Record.
         *
         * The synonym `FLOAT` is equivalent.
         */
        NUMBER: this.FLOAT
    });
});
