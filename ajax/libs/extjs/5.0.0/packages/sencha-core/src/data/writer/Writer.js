/**
 * Base Writer class used by most subclasses of {@link Ext.data.proxy.Server}. This class
 * is responsible for taking a set of {@link Ext.data.operation.Operation} objects and a
 * {@link Ext.data.Request} object and modifying that request based on the Operations.
 *
 * For example a Ext.data.writer.Json would format the Operations and their
 * {@link Ext.data.Model} instances based on the config options passed to the JsonWriter's
 * constructor.
 *
 * Writers are not needed for any kind of local storage - whether via a
 * {@link Ext.data.proxy.WebStorage Web Storage proxy} (see
 * {@link Ext.data.proxy.LocalStorage localStorage} and
 * {@link Ext.data.proxy.SessionStorage sessionStorage})
 * or just in memory via a {@link Ext.data.proxy.Memory MemoryProxy}.
 * 
 * # Dates
 *
 * Before sending dates to the server, they can be formatted using an {@link Ext.Date}
 * format. These formats can be specified both on the field and the writer itself. In terms
 * of precedence, from highest to lowest:
 * 
 * - {@link #dateFormat Writer.dateFormat} The writer `dateFormat` will always have the
 *   highest precedence.
 * - {@link Ext.data.field.Date#dateWriteFormat} The `dateWriteFormat` given to the field
 *   instance. This is handled by {@link Ext.data.field.Date#method-serialize}.
 * - {@link Ext.data.field.Date#dateFormat Field.dateFormat} This is handled by the field's
 *   `serialize` method.
 * - {@link Ext.data.field.Date#dateReadFormat Field.dateReadFormat} Also handled by the
 *   field's `serialize` method.
 */
Ext.define('Ext.data.writer.Writer', {
    mixins: [
        'Ext.mixin.Factoryable'
    ],

    alias: 'writer.base',
    factoryConfig: {
        defaultType: null
    },

    alternateClassName: [
        'Ext.data.DataWriter',
        'Ext.data.Writer'
    ],

    config: {
        /**
         * @cfg {String} clientIdProperty
         * When specified this property causes the `{@link Ext.data.Model#idProperty}` of
         * newly created records to be sent to the server as this name instead of the
         * value of the `idProperty`.
         *
         * For example, by default, the following code:
         *
         *      Ext.define('Person', {
         *          idProperty: 'id',  // this is the default value (for clarity)
         *
         *          fields: [ 'name' ]
         *      });
         *
         *      var person = new Person({
         *          // no id provided, so one is generated
         *          name: 'Clark Kent'
         *      });
         *
         * Will send this to the server:
         *
         *      {
         *          id: 'Person-1',
         *          name: 'Clark Kent'
         *      }
         *
         * This can be an issue if the server expects an integer for the "id" property.
         * You can use `{@link Ext.data.Model#identifier}` to produce identifiers that
         * the server would recognize or use this config to send the client's id in a
         * different property.
         *
         *      Ext.define('Person', {
         *          idProperty: 'id',  // this is the default value (for clarity)
         *
         *          proxy: {
         *              writer: {
         *                  clientIdProperty: 'clientId'
         *              }
         *          },
         *
         *          fields: [ 'name' ]
         *      });
         *
         * Given the above, the server is sent this data now:
         *
         *      {
         *          clientId: 'Person-1',
         *          name: 'Clark Kent'
         *      }
         *
         * While this config provides the behavior of `{@link Ext.data.Model#clientIdProperty}`
         * from previous releases, this property is not as useful as a suitable
         * `{@link Ext.data.Model#identifier}` due to id's appearing in foreign-key fields
         * and in `{@link Ext.data.Model#manyToMany}` associations.
         *
         * See `{@link Ext.data.Model#identifier}` for more on id generation.
         */
        clientIdProperty: null,

        /**
         * @cfg {Object} allDataOptions
         * This object contains the options passed to `{@link Ext.data.Model#getData}` when
         * writing `{@link Ext.data.Model#phantom}` records or when `writeAllFields` is set
         * to `true`.
         *
         * *NOTE:* The `serialize` option cannot be used here.
         */
        allDataOptions: {
            persist: true
        },

        /**
         * @cfg {Object} partialDataOptions
         * This object contains the options passed to `{@link Ext.data.Model#getData}` when
         * writing non `{@link Ext.data.Model#phantom}` records or when `writeAllFields` is
         * set to `false`.
         *
         * *NOTE:* The `serialize` option cannot be used here.
         */
        partialDataOptions: {
            changes: true,
            critical: true
        },

        /**
         * @cfg {Boolean} writeAllFields `true` to write all fields from the record to the
         * server. If set to `false` it will only send the fields that were modified. Note
         * that any fields that have `{@link Ext.data.field.Field#persist}` set to `false`
         * will still be ignored while those with `{@link Ext.data.field.Field#critical}`
         * set to `true` will be included.
         *
         * The exact set of fields written is determined by `allDataOptions` (when `true`)
         * or `partialDataOptions` (when `false`). This option is ignored and treated as
         * `true` when writing `{@link Ext.data.Model#phantom}` records.
         *
         * It is seldom a good idea to use this config. Rather use `allDataOptions` or
         * `partialDataOptions` to control what fields are sent for records based on their
         * `{@link Ext.data.Model#phantom}` state.
         *
         * In the previous release, this was default `true`.
         */
        writeAllFields: false,
    
        /**
         * @cfg {String} dateFormat
         * This is used for each field of type date in the model to format the value before
         * it is sent to the server.
         */
        dateFormat: null,
    
        /**
         * @cfg {String} nameProperty
         * This property is used to read the key for each value that will be sent to the
         * server.
         *
         * For example:
         *
         *     Ext.define('Person', {
         *         extend: 'Ext.data.Model',
         *         fields: [{
         *             name: 'first',
         *             mapping: 'firstName'
         *         }, {
         *             name: 'last',
         *             mapping: 'lastName'
         *         }, {
         *             name: 'age'
         *         }]
         *     });
         *
         *     new Ext.data.writer.Writer({
         *         nameProperty: 'mapping'
         *     });
         *
         *     // This will be sent to the server
         *     {
         *         firstName: 'first name value',
         *         lastName: 'last name value',
         *         age: 1
         *     }
         *
         * If the value is not present, the field name will always be used.
         */
        nameProperty: 'name',
    
        /**
         * @cfg {Boolean} [writeRecordId]
         * By default, each record's id is always included in the output for non-phantom
         * records since in most cases the id will be required on the server to process
         * the record action. This is helpful since the id will normally not be modified,
         * and so would not be sent to the server unless {@link #writeAllFields} was
         * explicitly enabled.
         * 
         * However, there are cases where it is not desirable for the record id to be passed
         * in the data directly. For example, when using a RESTful API the record id would
         * typically be appended to the url instead.
         */
        writeRecordId: true,
        
        /**
         * @cfg {Function|Object} [transform]
         * If a transform function is set, it will be invoked just before {@link #writeRecords} 
         * executes. It is passed the unserialized data object and the {@link #Ext.data.Request request} 
         * object. The transform function returns a data object, which can be a modified version of the original 
         * data object, or a completely new data object. The transform can be a function, or an object 
         * with a 'fn' key and an optional 'scope' key. Example usage:
         *
         *     Ext.create('Ext.data.Store', {
         *         model: 'User',
         *         proxy: {
         *             type: 'ajax',
         *             url : 'users.json',
         *             writer: {
         *                 type: 'json',
         *                 transform: {
         *                     fn: function(data, request) {
         *                         // do some manipulation of the unserialized data object
         *                         return data;
         *                     },
         *                     scope: this
         *                 }
         *             }
         *         },
         *     });
         *
         */ 
        transform: null
    },

    /**
     * @property {Boolean} isWriter
     * `true` in this class to identify an object as an instantiated Writer, or subclass thereof.
     **/
    isWriter: true,

    /**
     * Creates new Writer.
     * @param {Object} [config] Config object.
     */
    constructor: function(config) {
        this.initConfig(config);
    },
    
    applyTransform: function(transform) {
        if (transform) {
            if (Ext.isFunction(transform)) {
                transform = {fn:transform};
            }
            return transform.fn.bind(transform.scope || this);
        }
        return transform;
    },

    /**
     * Prepares a Proxy's Ext.data.Request object.
     * @param {Ext.data.Request} request The request object.
     * @return {Ext.data.Request} The modified request object.
     */
    write: function(request) {
        var operation = request.getOperation(),
            records = operation.getRecords() || [],
            len = records.length,
            data = [],
            i;

        for (i = 0; i < len; i++) {
            data.push(this.getRecordData(records[i], operation));
        }

        return this.writeRecords(request, data);
    },
    
    /**
     * Write the record data to the request in the appropriate format.
     * @protected
     * @param {Ext.data.Request} request The request.
     * @param {Array} data An array of objects containing data.
     * @return {Ext.data.Request} The request.
     */
    writeRecords: Ext.emptyFn,

    /**
     * Formats the data for each record before sending it to the server. This method should
     * be overridden to format the data in a way that differs from the default.
     *
     * @param {Ext.data.Model} record The record that we are writing to the server.
     * @param {Ext.data.operation.Operation} [operation] An operation object.
     * @return {Object} An object literal of name/value keys to be written to the server.
     * By default this method returns the data property on the record.
     */
    getRecordData: function (record, operation) {
        var me = this,
            nameProperty = me.getNameProperty(),
            mapping = nameProperty !== 'name',
            idField = record.self.idField,
            key = idField.name, // setup for idField first
            value = record.id,
            writeAll = me.getWriteAllFields(),
            ret;

        if (idField.serialize) {
            value = idField.serialize(value);
        }

        if (!writeAll && operation && operation.isDestroyOperation) {
            ret = {};
            ret[nameProperty ? idField[nameProperty] : key] = value;
        } else {
            var dateFormat = me.getDateFormat(),
                phantom = record.phantom,
                options = (phantom || writeAll) ? me.getAllDataOptions()
                                                : me.getPartialDataOptions(),
                clientIdProperty = phantom && me.getClientIdProperty(),
                fieldsMap = record.getFieldsMap(),
                data, field;

            options.serialize = false; // we must take over this here
            data = record.getData(options);

            // If we are mapping we need to pour data into a new object, otherwise we do
            // our work in-place:
            ret = mapping ? {} : data;

            if (clientIdProperty) { // if (phantom and have clientIdProperty)
                ret[clientIdProperty] = value; // must read data and write ret
                delete data[key];  // in case ret === data (must not send "id")
            }
            else if (!me.getWriteRecordId()) {
                delete data[key];
            }

            for (key in data) {
                value = data[key];

                if (!(field = fieldsMap[key])) {
                    // No defined field, so clearly no nameProperty to look up for this field
                    // but if we are mapping we need to copy over the value. Also there is no
                    // serializer to call in this case.
                    if (mapping) {
                        ret[key] = value;
                    }
                } else {
                    // Allow this Writer to take over formatting date values if it has a
                    // dateFormat specified. Only check isDate on fields declared as dates
                    // for efficiency.
                    if (field.isDateField && dateFormat && Ext.isDate(value)) {
                        value = Ext.Date.format(value, dateFormat);
                    } else if (field.serialize) {
                        value = field.serialize(value, record);
                    }

                    if (mapping) {
                        key = field[nameProperty] || key;
                    }

                    ret[key] = value;
                }
            }
        }

        return ret;
    }
});
