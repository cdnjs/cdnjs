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
 * @author Ed Spencer
 *
 * Fields are used to define what a Model is. They aren't instantiated directly - instead, when we create a class that
 * extends {@link Ext.data.Model}, it will automatically create a Field instance for each field configured in a {@link
 * Ext.data.Model Model}. For example, we might set up a model like this:
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             'name', 'email',
 *             {name: 'age', type: 'int'},
 *             {name: 'gender', type: 'string', defaultValue: 'Unknown'}
 *         ]
 *     });
 *
 * Four fields will have been created for the User Model - name, email, age and gender. Note that we specified a couple
 * of different formats here; if we only pass in the string name of the field (as with name and email), the field is set
 * up with the 'auto' type. It's as if we'd done this instead:
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             {name: 'name', type: 'auto'},
 *             {name: 'email', type: 'auto'},
 *             {name: 'age', type: 'int'},
 *             {name: 'gender', type: 'string', defaultValue: 'Unknown'}
 *         ]
 *     });
 *
 * # Types and conversion
 *
 * The {@link #type} is important - it's used to automatically convert data passed to the field into the correct format.
 * In our example above, the name and email fields used the 'auto' type and will just accept anything that is passed
 * into them. The 'age' field had an 'int' type however, so if we passed 25.4 this would be rounded to 25.
 *
 * Sometimes a simple type isn't enough, or we want to perform some processing when we load a Field's data. We can do
 * this using a {@link #convert} function. Here, we're going to create a new field based on another:
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             {
 *                 name: 'firstName',
 *                 convert: function(value, record) {
 *                     var fullName  = record.get('name'),
 *                         splits    = fullName.split(" "),
 *                         firstName = splits[0];
 *
 *                     return firstName;
 *                 }
 *             },
 *             'name', 'email',
 *             {name: 'age', type: 'int'},
 *             {name: 'gender', type: 'string', defaultValue: 'Unknown'}
 *         ]
 *     });
 *
 * Now when we create a new User, the firstName is populated automatically based on the name:
 *
 *     var ed = Ext.create('User', {name: 'Ed Spencer'});
 *
 *     console.log(ed.get('firstName')); //logs 'Ed', based on our convert function
 *     
 * Fields which are configured with a custom ```convert``` function are read *after* all other fields
 * when constructing and reading records, so that if convert functions rely on other, non-converted fields
 * (as in this example), they can be sure of those fields being present.
 *
 * In fact, if we log out all of the data inside ed, we'll see this:
 *
 *     console.log(ed.data);
 *
 *     //outputs this:
 *     {
 *         age: 0,
 *         email: "",
 *         firstName: "Ed",
 *         gender: "Unknown",
 *         name: "Ed Spencer"
 *     }
 *
 * The age field has been given a default of zero because we made it an int type. As an auto field, email has defaulted
 * to an empty string. When we registered the User model we set gender's {@link #defaultValue} to 'Unknown' so we see
 * that now. Let's correct that and satisfy ourselves that the types work as we expect:
 *
 *     ed.set('gender', 'Male');
 *     ed.get('gender'); //returns 'Male'
 *
 *     ed.set('age', 25.4);
 *     ed.get('age'); //returns 25 - we wanted an int, not a float, so no decimal places allowed
 */
Ext.define('Ext.data.Field', {
    requires: ['Ext.data.Types', 'Ext.data.SortTypes'],
    alias: 'data.field',

    isField: true,
    
    constructor : function(config) {
        var me = this,
            types = Ext.data.Types,
            st;
        
        if (Ext.isString(config)) {
            config = {name: config};
        }
        Ext.apply(me, config);

        st = me.sortType;

        if (me.type) {
            if (Ext.isString(me.type)) {
                me.type = types[me.type.toUpperCase()] || types.AUTO;
            }
        } else {
            me.type = types.AUTO;
        }

        // named sortTypes are supported, here we look them up
        if (Ext.isString(st)) {
            me.sortType = Ext.data.SortTypes[st];
        } else if(Ext.isEmpty(st)) {
            me.sortType = me.type.sortType;
        }

        // Reference this type's default converter if we did not recieve one in configuration.
        if (!config.hasOwnProperty('convert')) {
            me.convert = me.type.convert; // this may be undefined (e.g., AUTO)
        } else if (!me.convert && me.type.convert && !config.hasOwnProperty('defaultValue')) {
            // If the converter has been nulled out, and we have not been configured
            // with a field-specific defaultValue, then coerce the inherited defaultValue into our data type.
            me.defaultValue = me.type.convert(me.defaultValue);
        }

        if (config.convert) {
            me.hasCustomConvert = true;
        }
    },
    
    /**
     * @cfg {String} name
     *
     * The name by which the field is referenced within the Model. This is referenced by, for example, the `dataIndex`
     * property in column definition objects passed to {@link Ext.grid.property.HeaderContainer}.
     *
     * Note: In the simplest case, if no properties other than `name` are required, a field definition may consist of
     * just a String for the field name.
     */
    
    /**
     * @cfg {String/Object} type
     *
     * The data type for automatic conversion from received data to the *stored* value if
     * `{@link Ext.data.Field#convert convert}` has not been specified. This may be specified as a string value.
     * Possible values are
     *
     * - auto (Default, implies no conversion)
     * - string
     * - int
     * - float
     * - boolean
     * - date
     *
     * This may also be specified by referencing a member of the {@link Ext.data.Types} class.
     *
     * Developers may create their own application-specific data types by defining new members of the {@link
     * Ext.data.Types} class.
     */

    /**
     * @cfg {Function} [convert]
     *
     * A function which converts the value provided by the Reader into an object that will be stored in the Model.
     * 
     * If configured as `null`, then no conversion will be applied to the raw data property when this Field
     * is read. This will increase performance. but you must ensure that the data is of the correct type and does
     * not *need* converting.
     * 
     * It is passed the following parameters:
     *
     * - **v** : Mixed
     *
     *   The data value as read by the Reader, if undefined will use the configured `{@link Ext.data.Field#defaultValue
     *   defaultValue}`.
     *
     * - **rec** : Ext.data.Model
     *
     *   The data object containing the Model as read so far by the Reader. Note that the Model may not be fully populated
     *   at this point as the fields are read in the order that they are defined in your
     *   {@link Ext.data.Model#cfg-fields fields} array.
     *
     * Example of convert functions:
     *
     *     function fullName(v, record){
     *         return record.data.last + ', ' + record.data.first;
     *     }
     *
     *     function location(v, record){
     *         return !record.data.city ? '' : (record.data.city + ', ' + record.data.state);
     *     }
     *
     *     Ext.define('Dude', {
     *         extend: 'Ext.data.Model',
     *         fields: [
     *             {name: 'fullname',  convert: fullName},
     *             {name: 'firstname', mapping: 'name.first'},
     *             {name: 'lastname',  mapping: 'name.last'},
     *             {name: 'city', defaultValue: 'homeless'},
     *             'state',
     *             {name: 'location',  convert: location}
     *         ]
     *     });
     *
     *     // create the data store
     *     var store = Ext.create('Ext.data.Store', {
     *         reader: {
     *             type: 'json',
     *             model: 'Dude',
     *             idProperty: 'key',
     *             root: 'daRoot',
     *             totalProperty: 'total'
     *         }
     *     });
     *
     *     var myData = [
     *         { key: 1,
     *           name: { first: 'Fat',    last:  'Albert' }
     *           // notice no city, state provided in data object
     *         },
     *         { key: 2,
     *           name: { first: 'Barney', last:  'Rubble' },
     *           city: 'Bedrock', state: 'Stoneridge'
     *         },
     *         { key: 3,
     *           name: { first: 'Cliff',  last:  'Claven' },
     *           city: 'Boston',  state: 'MA'
     *         }
     *     ];
     */

    /**
     * @cfg {Function} [serialize]
     * A function which converts the Model's value for this Field into a form which can be used by whatever {@link Ext.data.writer.Writer Writer}
     * is being used to sync data with the server.
     * 
     * The function should return a string which represents the Field's value.
     *
     * It is passed the following parameters:
     *
     * - **v** : Mixed
     *
     *   The Field's value - the value to be serialized.
     *
     * - **rec** : Ext.data.Model
     *
     *   The record being serialized.
     *
     */

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
     * Used to provide a custom format when serializing dates with a {@link Ext.data.writer.Writer}.
     * If this is not specified, the {@link #dateFormat} will be used. See the {@link Ext.data.writer.Writer} 
     * docs for more information on writing dates. 
     *
     * **Note that to use a {@link Ext.data.JsonWriter JsonWriter} to send Microsoft format "JSON" dates, which are in fact
     * invalid JSON, it is not possible to use the standard date serialization pathway or
     * {@link Ext#USE_NATIVE_JSON native browser JSON production}.**
     *
     * To use a {@link Ext.data.JsonWriter JsonWriter} to write dates in a JSON packet in the form `"\/Date(1357372800000)\/"`
     * configure the field like this:
     *
     *    {
     *        type: 'date',
     *        dateFormat: 'MS',             // To parse incoming dates from server correctly
     *        serialize: Ext.identityFn     // An ExtJS-supplied function which returns the arg unchanged
     *    }
     *
     * Then override ExtJS's JSON date serialize function:
     *
     *    Ext.JSON.encodeDate = function (d) {
     *        return '"' + Ext.Date.format(d, 'MS') + '"';
     *    };
     */
    dateWriteFormat: null,
    
    /**
     * @cfg {Boolean} useNull
     *
     * Use when converting received data into a INT, FLOAT, BOOL or STRING type. If the value cannot be
     * parsed, `null` will be used if useNull is true, otherwise a default value for that type will be used:
     *
     * - for INT and FLOAT - `0`.
     * - for STRING - `""`.
     * - for BOOL - `false`.
     *
     * Note that when parsing of DATE type fails, the value will be `null` regardless of this setting.
     */
    useNull: false,
    
    /**
     * @cfg {Object} [defaultValue=""]
     *
     * The default value used when the creating an instance from a raw data object, and the property referenced by the
     * `{@link Ext.data.Field#mapping mapping}` does not exist in that data object.
     * 
     * May be specified as `undefined` to prevent defaulting in a value.
     */
    defaultValue: "",

    /**
     * @cfg {String/Number} mapping
     *
     * (Optional) A path expression for use by the {@link Ext.data.reader.Reader} implementation that is creating the
     * {@link Ext.data.Model Model} to extract the Field value from the data object. If the path expression is the same
     * as the field name, the mapping may be omitted.
     *
     * The form of the mapping expression depends on the Reader being used.
     *
     * - {@link Ext.data.reader.Json}
     *
     *   The mapping is a string containing the javascript expression to reference the data from an element of the data
     *   item's {@link Ext.data.reader.Json#cfg-root root} Array. Defaults to the field name.
     *
     * - {@link Ext.data.reader.Xml}
     *
     *   The mapping is an {@link Ext.DomQuery} path to the data item relative to the DOM element that represents the
     *   {@link Ext.data.reader.Xml#record record}. Defaults to the field name.
     *
     * - {@link Ext.data.reader.Array}
     *
     *   The mapping is a number indicating the Array index of the field's value. Defaults to the field specification's
     *   Array position.
     *
     * If a more complex value extraction strategy is required, then configure the Field with a {@link #convert}
     * function. This is passed the whole row object, and may interrogate it in whatever way is necessary in order to
     * return the desired data.
     */
    mapping: null,

    /**
     * @cfg {Function/String} sortType
     *
     * A function which converts a Field's value to a comparable value in order to ensure correct sort ordering.
     * Predefined functions are provided in {@link Ext.data.SortTypes}. A custom sort example:
     *
     *     // current sort     after sort we want
     *     // +-+------+          +-+------+
     *     // |1|First |          |1|First |
     *     // |2|Last  |          |3|Second|
     *     // |3|Second|          |2|Last  |
     *     // +-+------+          +-+------+
     *
     *     sortType: function(value) {
     *        switch (value.toLowerCase()) // native toLowerCase():
     *        {
     *           case 'first': return 1;
     *           case 'second': return 2;
     *           default: return 3;
     *        }
     *     }
     *
     * May also be set to a String value, corresponding to one of the named sort types in {@link Ext.data.SortTypes}.
     */
    sortType : null,

    /**
     * @cfg {String} sortDir
     *
     * Initial direction to sort (`"ASC"` or `"DESC"`). Defaults to `"ASC"`.
     */
    sortDir : "ASC",

    /**
     * @cfg {Boolean} allowBlank
     * @private
     *
     * Used for validating a {@link Ext.data.Model model}. Defaults to true. An empty value here will cause
     * {@link Ext.data.Model}.{@link Ext.data.Model#isValid isValid} to evaluate to false.
     */
    allowBlank : true,

    /**
     * @cfg {Boolean} persist
     *
     * False to exclude this field from the {@link Ext.data.Model#modified} fields in a model. This will also exclude
     * the field from being written using a {@link Ext.data.writer.Writer}. This option is useful when model fields are
     * used to keep state on the client but do not need to be persisted to the server. Defaults to true.
     */
    persist: true
});
