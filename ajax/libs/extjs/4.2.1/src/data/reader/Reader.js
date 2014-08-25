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
 * Readers are used to interpret data to be loaded into a {@link Ext.data.Model Model} instance or a {@link
 * Ext.data.Store Store} - often in response to an AJAX request. In general there is usually no need to create
 * a Reader instance directly, since a Reader is almost always used together with a {@link Ext.data.proxy.Proxy Proxy},
 * and is configured using the Proxy's {@link Ext.data.proxy.Proxy#cfg-reader reader} configuration property:
 * 
 *     Ext.create('Ext.data.Store', {
 *         model: 'User',
 *         proxy: {
 *             type: 'ajax',
 *             url : 'users.json',
 *             reader: {
 *                 type: 'json',
 *                 root: 'users'
 *             }
 *         },
 *     });
 *     
 * The above reader is configured to consume a JSON string that looks something like this:
 *  
 *     {
 *         "success": true,
 *         "users": [
 *             { "name": "User 1" },
 *             { "name": "User 2" }
 *         ]
 *     }
 * 
 *
 * # Loading Nested Data
 *
 * Readers have the ability to automatically load deeply-nested data objects based on the {@link Ext.data.association.Association
 * associations} configured on each Model. Below is an example demonstrating the flexibility of these associations in a
 * fictional CRM system which manages a User, their Orders, OrderItems and Products. First we'll define the models:
 *
 *     Ext.define("User", {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             'id', 'name'
 *         ],
 *
 *         hasMany: {model: 'Order', name: 'orders'},
 *
 *         proxy: {
 *             type: 'rest',
 *             url : 'users.json',
 *             reader: {
 *                 type: 'json',
 *                 root: 'users'
 *             }
 *         }
 *     });
 *
 *     Ext.define("Order", {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             'id', 'total'
 *         ],
 *
 *         hasMany  : {model: 'OrderItem', name: 'orderItems', associationKey: 'order_items'},
 *         belongsTo: 'User'
 *     });
 *
 *     Ext.define("OrderItem", {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             'id', 'price', 'quantity', 'order_id', 'product_id'
 *         ],
 *
 *         belongsTo: ['Order', {model: 'Product', associationKey: 'product'}]
 *     });
 *
 *     Ext.define("Product", {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             'id', 'name'
 *         ],
 *
 *         hasMany: 'OrderItem'
 *     });
 *
 * This may be a lot to take in - basically a User has many Orders, each of which is composed of several OrderItems.
 * Finally, each OrderItem has a single Product. This allows us to consume data like this:
 *
 *     {
 *         "users": [
 *             {
 *                 "id": 123,
 *                 "name": "Ed",
 *                 "orders": [
 *                     {
 *                         "id": 50,
 *                         "total": 100,
 *                         "order_items": [
 *                             {
 *                                 "id"      : 20,
 *                                 "price"   : 40,
 *                                 "quantity": 2,
 *                                 "product" : {
 *                                     "id": 1000,
 *                                     "name": "MacBook Pro"
 *                                 }
 *                             },
 *                             {
 *                                 "id"      : 21,
 *                                 "price"   : 20,
 *                                 "quantity": 3,
 *                                 "product" : {
 *                                     "id": 1001,
 *                                     "name": "iPhone"
 *                                 }
 *                             }
 *                         ]
 *                     }
 *                 ]
 *             }
 *         ]
 *     }
 *
 * The JSON response is deeply nested - it returns all Users (in this case just 1 for simplicity's sake), all of the
 * Orders for each User (again just 1 in this case), all of the OrderItems for each Order (2 order items in this case),
 * and finally the Product associated with each OrderItem. Now we can read the data and use it as follows:
 *
 *     var store = Ext.create('Ext.data.Store', {
 *         model: "User"
 *     });
 *
 *     store.load({
 *         callback: function() {
 *             //the user that was loaded
 *             var user = store.first();
 *
 *             console.log("Orders for " + user.get('name') + ":")
 *
 *             //iterate over the Orders for each User
 *             user.orders().each(function(order) {
 *                 console.log("Order ID: " + order.getId() + ", which contains items:");
 *
 *                 //iterate over the OrderItems for each Order
 *                 order.orderItems().each(function(orderItem) {
 *                     //we know that the Product data is already loaded, so we can use the synchronous getProduct
 *                     //usually, we would use the asynchronous version (see {@link Ext.data.association.BelongsTo})
 *                     var product = orderItem.getProduct();
 *
 *                     console.log(orderItem.get('quantity') + ' orders of ' + product.get('name'));
 *                 });
 *             });
 *         }
 *     });
 *
 * Running the code above results in the following:
 *
 *     Orders for Ed:
 *     Order ID: 50, which contains items:
 *     2 orders of MacBook Pro
 *     3 orders of iPhone
 */
Ext.define('Ext.data.reader.Reader', {
    requires: ['Ext.data.ResultSet', 'Ext.XTemplate'],
    alternateClassName: ['Ext.data.Reader', 'Ext.data.DataReader'],

    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * @cfg {String} idProperty
     * Name of the property within a row object that contains a record identifier value. Defaults to the id of the
     * model. If an idProperty is explicitly specified it will take precedence over idProperty defined on the model.
     */

    /**
     * @cfg {String} [totalProperty="total"]
     * Name of the property from which to retrieve the total number of records in the dataset. This is only needed if
     * the whole dataset is not passed in one go, but is being paged from the remote server.
     */
    totalProperty: 'total',

    /**
     * @cfg {String} [successProperty="success"]
     * Name of the property from which to retrieve the `success` attribute, the value of which indicates
     * whether a given request succeeded or failed (typically a boolean or 'true'|'false'). See
     * {@link Ext.data.proxy.Server}.{@link Ext.data.proxy.Server#exception exception} for additional information.
     */
    successProperty: 'success',

    /**
     * @cfg {String} [root]
     * The name of the property which contains the data items corresponding to the Model(s) for which this
     * Reader is configured.  For JSON reader it's a property name (or a dot-separated list of property names
     * if the root is nested).  For XML reader it's a CSS selector.  For Array reader the root is not applicable
     * since the data is assumed to be a single-level array of arrays.
     * 
     * By default the natural root of the data will be used: the root JSON array, the root XML element, or the array.
     *
     * The data packet value for this property should be an empty array to clear the data or show no data.
     */
    root: '',
    
    /**
     * @cfg {String} messageProperty
     * The name of the property which contains a response message. This property is optional.
     */
    
    /**
     * @cfg {Boolean} [implicitIncludes=true]
     * True to automatically parse models nested within other models in a response object. See the
     * Ext.data.reader.Reader intro docs for full explanation.
     */
    implicitIncludes: true,
    
    /**
     * @cfg {Boolean} [readRecordsOnFailure=true]
     * True to extract the records from a data packet even if the {@link #successProperty} returns false.
     */
    readRecordsOnFailure: true,
    
    /**
     * @property {Object} metaData
     * The raw meta data that was most recently read, if any. Meta data can include existing
     * Reader config options like {@link #idProperty}, {@link #totalProperty}, etc. that get
     * automatically applied to the Reader, and those can still be accessed directly from the Reader
     * if needed. However, meta data is also often used to pass other custom data to be processed
     * by application code. For example, it is common when reconfiguring the data model of a grid to
     * also pass a corresponding column model config to be applied to the grid. Any such data will
     * not get applied to the Reader directly (it just gets passed through and is ignored by Ext).
     * This metaData property gives you access to all meta data that was passed, including any such
     * custom data ignored by the reader.
     * 
     * This is a read-only property, and it will get replaced each time a new meta data object is
     * passed to the reader. Note that typically you would handle proxy's
     * {@link Ext.data.proxy.Proxy#metachange metachange} event which passes this exact same meta
     * object to listeners. However this property is available if it's more convenient to access it
     * via the reader directly in certain cases.
     * @readonly
     */
    
    /*
     * @property {Boolean} isReader
     * `true` in this class to identify an object as an instantiated Reader, or subclass thereof.
     */
    isReader: true,

    // Private flag to the generated convertRecordData function to indicate whether to apply Field default
    // values to fields for which no value is present in the raw data.
    // This is set to false by a Server Proxy which is reading the response from a "create" or "update" operation.
    applyDefaults: true,

    lastFieldGeneration: null,
    
    /**
     * Creates new Reader.
     * @param {Object} config (optional) Config object.
     */
    constructor: function(config) {
        var me = this;
        
        me.mixins.observable.constructor.call(me, config);
        me.fieldCount = 0;
        me.model = Ext.ModelManager.getModel(me.model);

        // Extractors can only be calculated if the fields MixedCollection has been set.
        // A Model may only complete its setup (set the prototype properties) after asynchronous loading
        // which would mean that there may be no "fields"
        // If this happens, the load callback will call proxy.setModel which calls reader.setModel which
        // triggers buildExtractors.
        if (me.model && me.model.prototype.fields) {
            me.buildExtractors();
        }

        this.addEvents(
            /**
             * @event
             * Fires when the reader receives improperly encoded data from the server
             * @param {Ext.data.reader.Reader} reader A reference to this reader
             * @param {XMLHttpRequest} response The XMLHttpRequest response object
             * @param {Ext.data.ResultSet} error The error object
             */
            'exception'
        );
    },

    /**
     * Sets a new model for the reader.
     * @private
     * @param {Object} model The model to set.
     * @param {Boolean} setOnProxy True to also set on the Proxy, if one is configured
     */
    setModel: function(model, setOnProxy) {
        var me = this;
        
        me.model = Ext.ModelManager.getModel(model);
        if (model) {
            me.buildExtractors(true);
        }
        
        if (setOnProxy && me.proxy) {
            me.proxy.setModel(me.model, true);
        }
    },

    /**
     * Reads the given response object. This method normalizes the different types of response object that may be passed to it.
     * If it's an XMLHttpRequest object, hand off to the subclass' {@link #getResponseData} method.
     * Else, hand off the reading of records to the {@link #readRecords} method.
     * @param {Object} response The response object. This may be either an XMLHttpRequest object or a plain JS object
     * @return {Ext.data.ResultSet} The parsed or default ResultSet object
     */
    read: function(response) {
        var data;

        if (response) {
            data = response.responseText ? this.getResponseData(response) : this.readRecords(response);
        }

        return data || this.nullResultSet;
    },

    /**
     * Abstracts common functionality used by all Reader subclasses. Each subclass is expected to call this function
     * before running its own logic and returning the Ext.data.ResultSet instance. For most Readers additional
     * processing should not be needed.
     * @param {Object} data The raw data object
     * @return {Ext.data.ResultSet} A ResultSet object
     */
    readRecords: function(data) {
        var me = this,
            success,
            recordCount,
            records,
            root,
            total,
            value,
            message;
        
        /*
         * We check here whether fields collection has changed since the last read.
         * This works around an issue when a Model is used for both a Tree and another
         * source, because the tree decorates the model with extra fields and it causes
         * issues because the readers aren't notified.
         */
        if (me.lastFieldGeneration !== me.model.prototype.fields.generation) {
            me.buildExtractors(true);
        }
        
        /**
         * @property {Object} rawData
         * The raw data object that was last passed to {@link #readRecords}. Stored for further processing if needed.
         */
        me.rawData = data;

        data = me.getData(data);
        
        success = true;
        recordCount = 0;
        records = [];
            
        if (me.successProperty) {
            value = me.getSuccess(data);
            if (value === false || value === 'false') {
                success = false;
            }
        }
        
        if (me.messageProperty) {
            message = me.getMessage(data);
        }

        
        // Only try and extract other data if call was successful
        if (me.readRecordsOnFailure || success) {
            // If we pass an array as the data, we dont use getRoot on the data.
            // Instead the root equals to the data.
            root = Ext.isArray(data) ? data : me.getRoot(data);
            
            if (root) {
                total = root.length;
            }

          if (me.totalProperty) {
                value = parseInt(me.getTotal(data), 10);
                if (!isNaN(value)) {
                    total = value;
                }
            }

           if (root) {
                records = me.extractData(root);
                recordCount = records.length;
            }
        }

        return new Ext.data.ResultSet({
            total  : total || recordCount,
            count  : recordCount,
            records: records,
            success: success,
            message: message
        });
    },

    /**
     * Returns extracted, type-cast rows of data.
     * @param {Object[]/Object} root from server response
     * @return {Array} An array of records containing the extracted data
     * @private
     */
    extractData : function(root) {
        var me = this,
            Model   = me.model,
            length  = root.length,
            records = new Array(length),
            convertedValues, node, record, i;

        if (!root.length && Ext.isObject(root)) {
            root = [root];
            length = 1;
        }

        for (i = 0; i < length; i++) {
            node = root[i];
            if (node.isModel) {
                // If we're given a model instance in the data, just push it on
                // without doing any conversion
                records[i] = node;
            } else {
                // Create a record with an empty data object.
                // Populate that data object by extracting and converting field values from raw data.
                // Must pass the ID to use because we pass no data for the constructor to pluck an ID from
                records[i] = record = new Model(undefined, me.getId(node), node, convertedValues = {});

                // If the server did not include an id in the response data, the Model constructor will mark the record as phantom.
                // We  need to set phantom to false here because records created from a server response using a reader by definition are not phantom records.
                record.phantom = false;

                // Use generated function to extract all fields at once
                me.convertRecordData(convertedValues, node, record);

                if (me.implicitIncludes && record.associations.length) {
                    me.readAssociated(record, node);
                }
            }
        }

        return records;
    },

    /**
     * @private
     * Loads a record's associations from the data object. This prepopulates hasMany and belongsTo associations
     * on the record provided.
     * @param {Ext.data.Model} record The record to load associations for
     * @param {Object} data The data object
     * @return {String} Return value description
     */
    readAssociated: function(record, data) {
        var associations = record.associations.items,
            i            = 0,
            length       = associations.length,
            association, associationData, proxy, reader;
        
        for (; i < length; i++) {
            association     = associations[i];
            associationData = this.getAssociatedDataRoot(data, association.associationKeyFunction || association.associationKey || association.name);
            
            if (associationData) {
                reader = association.getReader();
                if (!reader) {
                    proxy = association.associatedModel.getProxy();
                    // if the associated model has a Reader already, use that, otherwise attempt to create a sensible one
                    if (proxy) {
                        reader = proxy.getReader();
                    } else {
                        reader = new this.constructor({
                            model: association.associatedName
                        });
                    }
                }
                association.read(record, reader, associationData);
            }  
        }
    },
    
    /**
     * @private
     * Used internally by {@link #readAssociated}. Given a data object (which could be json, xml etc) for a specific
     * record, this should return the relevant part of that data for the given association name. If a complex
     * mapping, this will traverse arrays and objects to resolve the data.
     * @param {Object} data The raw data object
     * @param {String} associationName The name of the association to get data for (uses associationKey if present)
     * @return {Object} The root
     */
    getAssociatedDataRoot: function(data, associationName) {
        if (Ext.isFunction(associationName)) {
            return associationName(data);
        }

        return data[associationName];
    },
    
    getFields: function() {
        return this.model.prototype.fields.items;
    },

    /**
     * @private
     * By default this function just returns what is passed to it. It can be overridden in a subclass
     * to return something else. See XmlReader for an example.
     * @param {Object} data The data object
     * @return {Object} The normalized data object
     */
    getData: Ext.identityFn,

    /**
     * @private
     * This will usually need to be implemented in a subclass. Given a generic data object (the type depends on the type
     * of data we are reading), this function should return the object as configured by the Reader's 'root' meta data config.
     * See XmlReader's getRoot implementation for an example. By default the same data object will simply be returned.
     * @param {Object} data The data object
     * @return {Object} The same data object
     */
    getRoot: Ext.identityFn,

    /**
     * Takes a raw response object (as passed to the {@link #read} method) and returns the useful data
     * segment from it. This must be implemented by each subclass.
     * @param {Object} response The response object
     * @return {Ext.data.ResultSet} A ResultSet object
     */
    getResponseData: function(response) {
        //<debug>
        Ext.Error.raise("getResponseData must be implemented in the Ext.data.reader.Reader subclass");
        //</debug>
    },

    /**
     * @private
     * Reconfigures the meta data tied to this Reader
     */
    onMetaChange : function(meta) {
        var me = this,
            fields = meta.fields || me.getFields(),
            newModel,
            clientIdProperty;
        
        // save off the raw meta data
        me.metaData = meta;
        
        // set any reader-specific configs from meta if available
        me.root = meta.root || me.root;
        me.idProperty = meta.idProperty || me.idProperty;
        me.totalProperty = meta.totalProperty || me.totalProperty;
        me.successProperty = meta.successProperty || me.successProperty;
        me.messageProperty = meta.messageProperty || me.messageProperty;
        clientIdProperty = meta.clientIdProperty;

        if (me.model) {
            me.model.setFields(fields, me.idProperty, clientIdProperty);
            me.setModel(me.model, true);
        }
        else {
            newModel = Ext.define("Ext.data.reader.Json-Model" + Ext.id(), {
                extend: 'Ext.data.Model',
                fields: fields,
                clientIdProperty: clientIdProperty
            });
            if (me.idProperty) {
                // We only do this if the reader actually has a custom idProperty set,
                // otherwise let the model use its own default value. It is valid for
                // the reader idProperty to be undefined, in which case it will use the
                // model's idProperty (in getIdProperty()).
                newModel.idProperty = me.idProperty;
            }
            me.setModel(newModel, true);
        }
    },
    
    /**
     * Get the idProperty to use for extracting data
     * @private
     * @return {String} The id property **if any**
     */
    getIdProperty: function() {
        var idField = this.model.prototype.idField,
            idProperty = this.idProperty;

        if (!idProperty && idField  && (idProperty = idField.mapping) == null) {
            idProperty = idField.name;
        }
        return idProperty;
    },

    /**
     * @private
     * This builds optimized functions for retrieving record data and meta data from an object.
     * Subclasses may need to implement their own getRoot function.
     * @param {Boolean} [force=false] True to automatically remove existing extractor functions first
     */
    buildExtractors: function(force) {
        var me          = this,
            idProp      = me.getIdProperty(),
            totalProp   = me.totalProperty,
            successProp = me.successProperty,
            messageProp = me.messageProperty,
            accessor;
            
        if (force === true) {
            delete me.convertRecordData;
        }
        
        if (me.convertRecordData) {
            return;
        }   

        //build the extractors for all the meta data
        if (totalProp) {
            me.getTotal = me.createAccessor(totalProp);
        }

        if (successProp) {
            me.getSuccess = me.createAccessor(successProp);
        }

        if (messageProp) {
            me.getMessage = me.createAccessor(messageProp);
        }

        // Generate a getter for the raw identifying property if any
        if (idProp) {
            accessor = me.createAccessor(idProp);
            me.getId = function(record) {
                var id = accessor.call(me, record);
                return (id === undefined || id === '') ? null : id;
            };
        } else {
            me.getId = function() {
                return null;
            };
        }
        me.convertRecordData = me.buildRecordDataExtractor();
        me.lastFieldGeneration = me.model.prototype.fields.generation;
    },

    recordDataExtractorTemplate : [
        'var me = this\n',
        '    ,fields = me.model.prototype.fields\n',
        '    ,value\n',
        '    ,internalId\n',
        '<tpl for="fields">',
        '    ,__field{#} = fields.map["{name}"]\n',
        '</tpl>', ';\n',

        'return function(dest, source, record) {\n',
        '<tpl for="fields">',
        '{% var fieldAccessExpression =  this.createFieldAccessExpression(values, "__field" + xindex, "source");',
        '   if (fieldAccessExpression) { %}',
        // createFieldAccessExpression must be implemented in subclasses to extract data from the source object in the correct way
        '    value = {[ this.createFieldAccessExpression(values, "__field" + xindex, "source") ]};\n',

        // Code for processing a source property when a custom convert is defined
            '<tpl if="hasCustomConvert">',
        '    dest["{name}"] = value === undefined ? __field{#}.convert(__field{#}.defaultValue, record) : __field{#}.convert(value, record);\n',

        // Code for processing a source property when there is a default value
            '<tpl elseif="defaultValue !== undefined">',
        '    if (value === undefined) {\n',
        '        if (me.applyDefaults) {\n',
                '<tpl if="convert">',
        '            dest["{name}"] = __field{#}.convert(__field{#}.defaultValue, record);\n',
                '<tpl else>',
        '            dest["{name}"] = __field{#}.defaultValue\n',
                '</tpl>',
        '        };\n',
        '    } else {\n',
                '<tpl if="convert">',
        '        dest["{name}"] = __field{#}.convert(value, record);\n',
                '<tpl else>',
        '        dest["{name}"] = value;\n',
                '</tpl>',
        '    };\n',

        // Code for processing a source property value when there is no default value
            '<tpl else>',
        '    if (value !== undefined) {\n',
                '<tpl if="convert">',
        '        dest["{name}"] = __field{#}.convert(value, record);\n',
                '<tpl else>',
        '        dest["{name}"] = value;\n',
                '</tpl>',
        '    }\n',
            '</tpl>',
            
        // For when createFieldExpression yielded nothing.
        // There's no mapping - the field is not intended to be read from server data.
        // This is the case with NodeInterface fields.
        '{% } else { %}',
            '<tpl if="defaultValue !== undefined">',
                '<tpl if="convert">',
        '    dest["{name}"] = __field{#}.convert(__field{#}.defaultValue, record);\n',
                '<tpl else>',
        '    dest["{name}"] = __field{#}.defaultValue\n',
                '</tpl>',
            '</tpl>',
        '{% } %}',
        '</tpl>',

        // set the client id as the internalId of the record.
        // clientId handles the case where a client side record did not previously exist on the server,
        // so the server is passing back a client id that can be used to pair the server side record up with the client record
        '<tpl if="clientIdProp">',
        '    if (record && (internalId = {[ this.createFieldAccessExpression(\{mapping: values.clientIdProp\}, null, "source") ]})) {\n',
        '        record.{["internalId"]} = internalId;\n',
        '    }\n',
        '</tpl>',

        '};'
    ],

    /**
     * @private
     * Return a function which will read a raw row object in the format this Reader accepts, and populates
     * a record's data object with converted data values.
     *
     * The returned function must be passed the following parameters:
     *
     * - dest A record's empty data object into which the new field value properties are injected.
     * - source A raw row data object of whatever type this Reader consumes
     * - record The record which is being populated.
     *
     */
    buildRecordDataExtractor: function() {
        var me = this,
            modelProto = me.model.prototype,
            templateData = {
                clientIdProp: modelProto.clientIdProperty,
                fields: modelProto.fields.items
            };

        me.recordDataExtractorTemplate.createFieldAccessExpression = function() { 
            return me.createFieldAccessExpression.apply(me,arguments);
        };
        
        // Here we are creating a new Function and invoking it immediately in the scope of this Reader
        // It declares several vars capturing the configured context of this Reader, and returns a function
        // which, when passed a record data object, a raw data row in the format this Reader is configured to read,
        // and the record which is being created, will populate the record's data object from the raw row data.
        return Ext.functionFactory(me.recordDataExtractorTemplate.apply(templateData)).call(me);
    },

    destroyReader: function() {
        var me = this;
        delete me.proxy;
        delete me.model;
        delete me.convertRecordData;
        delete me.getId;
        delete me.getTotal;
        delete me.getSuccess;
        delete me.getMessage;
    }
}, function() {
    var proto = this.prototype;
    Ext.apply(proto, {
        // Private. Empty ResultSet to return when response is falsy (null|undefined|empty string)
        nullResultSet: new Ext.data.ResultSet({
            total  : 0,
            count  : 0,
            records: [],
            success: true,
            message: ''
        }),
        recordDataExtractorTemplate: new Ext.XTemplate(proto.recordDataExtractorTemplate)
    });
});
