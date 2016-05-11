/**
 * SQL proxy lets you store data in a SQL database.
 * The Sencha Touch SQL proxy outputs model data into an HTML5
 * local database using WebSQL.
 *
 * You can create a Store for the proxy, for example:
 *
 *     Ext.require(["Ext.data.proxy.SQL"]);
 *
 *     Ext.define("User", {
 *        extend: "Ext.data.Model",
 *        config: {
 *           fields: [ "firstName", "lastName" ]
 *        }
 *      });
 *
 *     Ext.create("Ext.data.Store", {
 *        model: "User",
 *        storeId: "Users",
 *        proxy: {
 *           type: "sql"
 *        }
 *     });
 *
 *     Ext.getStore("Users").add({
 *        firstName: "Polly",
 *        lastName: "Hedra"
 *     });
 *
 *     Ext.getStore("Users").sync();
 *
 * To destroy a table use:
 *
 *     Ext.getStore("Users").getProxy().dropTable();
 *
 * To recreate a table use:
 *
 *     Ext.data.Store.sync() or Ext.data.Model.save()
 */
Ext.define('Ext.data.proxy.Sql', {
    alias: 'proxy.sql',
    extend: 'Ext.data.proxy.Client',
    alternateClassName: 'Ext.data.proxy.SQL',
    isSQLProxy: true,
    config: {
        /**
         * @cfg {Object} reader
         * @hide
         */
        reader: null,
        /**
         * @cfg {Object} writer
         * @hide
         */
        writer: null,
        /**
         * @cfg {String} table
         * Optional Table name to use if not provided ModelName will be used
         */
        table: null,
        /**
         * @cfg {String} database
         * Database name to access tables from
         */
        database: 'Sencha'
    },
    _createOptions: {
        silent: true,
        dirty: false
    },
    updateModel: function(model) {
        var me = this,
            modelName, len, i, columns, quoted;
        if (model) {
            me.uniqueIdStrategy = model.identifier.isUnique;
            if (!me.getTable()) {
                modelName = model.entityName;
                me.setTable(modelName.slice(modelName.lastIndexOf('.') + 1));
            }
            me.columns = columns = me.getPersistedModelColumns(model);
            me.quotedColumns = quoted = [];
            for (i = 0 , len = columns.length; i < len; ++i) {
                quoted.push('"' + columns[i] + '"');
            }
        }
        me.callParent([
            model
        ]);
    },
    setException: function(operation, error) {
        operation.setException(error);
    },
    create: function(operation) {
        var me = this,
            records = operation.getRecords(),
            result, error;
        operation.setStarted();
        me.executeTransaction(function(transaction) {
            me.insertRecords(records, transaction, function(resultSet, statementError) {
                result = resultSet;
                error = statementError;
            });
        }, function(transactionError) {
            operation.setException(transactionError);
        }, function() {
            if (error) {
                operation.setException(statementError);
            } else {
                operation.process(result);
            }
        });
    },
    read: function(operation) {
        var me = this,
            model = me.getModel(),
            records = operation.getRecords(),
            record = records ? records[0] : null,
            result, error, id, params;
        if (record && !record.phantom) {
            id = record.getId();
        } else {
            id = operation.getId();
        }
        if (id !== undefined) {
            params = {
                idOnly: true,
                id: id
            };
        } else {
            params = {
                page: operation.getPage(),
                start: operation.getStart(),
                limit: operation.getLimit(),
                sorters: operation.getSorters(),
                filters: operation.getFilters()
            };
        }
        operation.setStarted();
        me.executeTransaction(function(transaction) {
            me.selectRecords(transaction, params, function(resultSet, statementError) {
                result = resultSet;
                error = statementError;
            });
        }, function(transactionError) {
            operation.setException(transactionError);
        }, function() {
            if (error) {
                operation.setException(statementError);
            } else {
                operation.process(result);
            }
        });
    },
    update: function(operation) {
        var me = this,
            records = operation.getRecords(),
            result, error;
        operation.setStarted();
        me.executeTransaction(function(transaction) {
            me.updateRecords(transaction, records, function(resultSet, statementError) {
                result = resultSet;
                error = statementError;
            });
        }, function(transactionError) {
            operation.setException(transactionError);
        }, function() {
            if (error) {
                operation.setException(statementError);
            } else {
                operation.process(result);
            }
        });
    },
    erase: function(operation) {
        var me = this,
            records = operation.getRecords(),
            result, error;
        operation.setStarted();
        me.executeTransaction(function(transaction) {
            me.destroyRecords(transaction, records, function(resultSet, statementError) {
                result = resultSet;
                error = statementError;
            });
        }, function(transactionError) {
            operation.setException(transactionError);
        }, function() {
            if (error) {
                operation.setException(error);
            } else {
                operation.process(result);
            }
        });
    },
    createTable: function(transaction) {
        var me = this;
        if (!transaction) {
            me.executeTransaction(function(transaction) {
                me.createTable(transaction);
            });
            return;
        }
        me.executeStatement(transaction, 'CREATE TABLE IF NOT EXISTS "' + me.getTable() + '" (' + me.getSchemaString() + ')', function() {
            me.tableExists = true;
        });
    },
    insertRecords: function(records, transaction, callback) {
        var me = this,
            columns = me.columns,
            totalRecords = records.length,
            executed = 0,
            uniqueIdStrategy = me.uniqueIdStrategy,
            setOptions = me._createOptions,
            len = records.length,
            i, record, placeholders, sql, data, values, errors, completeIf;
        completeIf = function(transaction) {
            ++executed;
            if (executed === totalRecords) {
                callback.call(me, new Ext.data.ResultSet({
                    success: !errors
                }), errors);
            }
        };
        placeholders = Ext.String.repeat('?', columns.length, ',');
        sql = 'INSERT INTO "' + me.getTable() + '" (' + me.quotedColumns.join(',') + ') VALUES (' + placeholders + ')';
        for (i = 0; i < len; ++i) {
            record = records[i];
            data = me.getRecordData(record);
            values = me.getColumnValues(columns, data);
            // Capture the record in closure scope so we can access it later
            (function(record) {
                me.executeStatement(transaction, sql, values, function(transaction, resultSet) {
                    if (!uniqueIdStrategy) {
                        record.setId(resultSet.insertId, setOptions);
                    }
                    completeIf();
                }, function(transaction, error) {
                    if (!errors) {
                        errors = [];
                    }
                    errors.push(error);
                    completeIf();
                });
            })(record);
        }
    },
    selectRecords: function(transaction, params, callback, scope) {
        var me = this,
            Model = me.getModel(),
            idProperty = Model.idProperty,
            sql = 'SELECT * FROM "' + me.getTable() + '"',
            filterStatement = ' WHERE ',
            sortStatement = ' ORDER BY ',
            values = [],
            sorters, filters, placeholder, i, len, result, filter, sorter, property, operator, value;
        if (params.idOnly) {
            sql += filterStatement + '"' + idProperty + '" = ?';
            values.push(params);
        } else {
            filters = params.filters;
            len = filters && filters.length;
            if (len) {
                for (i = 0; i < len; i++) {
                    filter = filters[i];
                    property = filter.getProperty();
                    value = me.toSqlValue(filter.getValue(), Model.getField(property));
                    operator = filter.getOperator();
                    if (property !== null) {
                        operator = operator || '=';
                        placeholder = '?';
                        if (operator === 'like' || (operator === '=' && filter.getAnyMatch())) {
                            operator = 'LIKE';
                            value = '%' + value + '%';
                        }
                        if (operator === 'in' || operator === 'notin') {
                            if (operator === 'notin') {
                                operator = 'not in';
                            }
                            placeholder = '(' + Ext.String.repeat('?', value.length, ',') + ')';
                            values = values.concat(value);
                        } else {
                            values.push(value);
                        }
                        sql += filterStatement + '"' + property + '" ' + operator + ' ' + placeholder;
                        filterStatement = ' AND ';
                    }
                }
            }
            sorters = params.sorters;
            len = sorters && sorters.length;
            if (len) {
                for (i = 0; i < len; i++) {
                    sorter = sorters[i];
                    property = sorter.getProperty();
                    if (property !== null) {
                        sql += sortStatement + '"' + property + '" ' + sorter.getDirection();
                        sortStatement = ', ';
                    }
                }
            }
            // handle start, limit, sort, filter and group params
            if (params.page !== undefined) {
                sql += ' LIMIT ' + parseInt(params.start, 10) + ', ' + parseInt(params.limit, 10);
            }
        }
        me.executeStatement(transaction, sql, values, function(transaction, resultSet) {
            var rows = resultSet.rows,
                count = rows.length,
                records = [],
                fields = Model.fields,
                fieldsLen = fields.length,
                raw, data, i, len, j, field, name;
            for (i = 0 , len = count; i < len; ++i) {
                raw = rows.item(i);
                data = {};
                for (j = 0; j < fieldsLen; ++j) {
                    field = fields[j];
                    name = field.name;
                    data[name] = me.fromSqlValue(raw[name], field);
                }
                records.push(new Model(data));
            }
            callback.call(me, new Ext.data.ResultSet({
                records: records,
                success: true,
                total: count,
                count: count
            }));
        }, function(transaction, error) {
            callback.call(me, new Ext.data.ResultSet({
                success: false,
                total: 0,
                count: 0
            }), error);
        });
    },
    updateRecords: function(transaction, records, callback) {
        var me = this,
            columns = me.columns,
            quotedColumns = me.quotedColumns,
            totalRecords = records.length,
            executed = 0,
            updates = [],
            setOptions = me._createOptions,
            len, i, record, placeholders, sql, data, values, errors, completeIf;
        completeIf = function(transaction) {
            ++executed;
            if (executed === totalRecords) {
                callback.call(me, new Ext.data.ResultSet({
                    success: !errors
                }), errors);
            }
        };
        for (i = 0 , len = quotedColumns.length; i < len; i++) {
            updates.push(quotedColumns[i] + ' = ?');
        }
        sql = 'UPDATE "' + me.getTable() + '" SET ' + updates.join(', ') + ' WHERE "' + me.getModel().idProperty + '" = ?';
        for (i = 0 , len = records.length; i < len; ++i) {
            record = records[i];
            data = me.getRecordData(record);
            values = me.getColumnValues(columns, data);
            values.push(record.getId());
            // Capture the record in closure scope so we can access it later
            (function(record) {
                me.executeStatement(transaction, sql, values, function(transaction, resultSet) {
                    completeIf();
                }, function(transaction, error) {
                    if (!errors) {
                        errors = [];
                    }
                    errors.push(error);
                    completeIf();
                });
            })(record);
        }
    },
    destroyRecords: function(transaction, records, callback) {
        var me = this,
            table = me.getTable(),
            idProperty = me.getModel().idProperty,
            ids = [],
            values = [],
            destroyedRecords = [],
            len = records.length,
            idStr = '"' + idProperty + '" = ?',
            i, result, record, sql;
        for (i = 0; i < len; i++) {
            ids.push(idStr);
            values.push(records[i].getId());
        }
        sql = 'DELETE FROM "' + me.getTable() + '" WHERE ' + ids.join(' OR ');
        me.executeStatement(transaction, sql, values, function(transaction, resultSet) {
            callback.call(me, new Ext.data.ResultSet({
                success: true
            }));
        }, function(transaction, error) {
            callback.call(me, new Ext.data.ResultSet({
                success: false
            }), error);
        });
    },
    /**
     * Formats the data for each record before sending it to the server. This
     * method should be overridden to format the data in a way that differs from the default.
     * @param {Object} record The record that we are writing to the server.
     * @return {Object} An object literal of name/value keys to be written to the server.
     * By default this method returns the data property on the record.
     */
    getRecordData: function(record) {
        var me = this,
            fields = record.fields,
            idProperty = record.idProperty,
            uniqueIdStrategy = me.uniqueIdStrategy,
            data = {},
            len = fields.length,
            recordData = record.data,
            i, name, value, field;
        for (i = 0; i < len; ++i) {
            field = fields[i];
            if (field.persist !== false) {
                name = field.name;
                if (name === idProperty && !uniqueIdStrategy) {
                    
                    continue;
                }
                data[name] = me.toSqlValue(recordData[name], field);
            }
        }
        return data;
    },
    getColumnValues: function(columns, data) {
        var len = columns.length,
            values = [],
            i, column, value;
        for (i = 0; i < len; i++) {
            column = columns[i];
            value = data[column];
            if (value !== undefined) {
                values.push(value);
            }
        }
        return values;
    },
    getSchemaString: function() {
        var me = this,
            schema = [],
            model = me.getModel(),
            idProperty = model.idProperty,
            fields = model.fields,
            uniqueIdStrategy = me.uniqueIdStrategy,
            len = fields.length,
            i, field, type, name;
        for (i = 0; i < len; i++) {
            field = fields[i];
            type = field.getType();
            name = field.name;
            if (name === idProperty) {
                if (uniqueIdStrategy) {
                    type = me.convertToSqlType(type);
                    schema.unshift('"' + idProperty + '" ' + type);
                } else {
                    schema.unshift('"' + idProperty + '" INTEGER PRIMARY KEY AUTOINCREMENT');
                }
            } else {
                type = me.convertToSqlType(type);
                schema.push('"' + name + '" ' + type);
            }
        }
        return schema.join(', ');
    },
    convertToSqlType: function(type) {
        switch (type.toLowerCase()) {
            case 'string':
            case 'auto':
                return 'TEXT';
            case 'int':
            case 'date':
                return 'INTEGER';
            case 'float':
                return 'REAL';
            case 'bool':
                return 'NUMERIC';
        }
    },
    dropTable: function() {
        var me = this;
        me.executeTransaction(function(transaction) {
            me.executeStatement(transaction, 'DROP TABLE "' + me.getTable() + '"', function() {
                me.tableExists = false;
            });
        }, null, null, false);
    },
    getDatabaseObject: function() {
        return window.openDatabase(this.getDatabase(), '1.0', 'Sencha Database', 5 * 1024 * 1024);
    },
    privates: {
        executeStatement: function(transaction, sql, values, success, failure) {
            var me = this;
            transaction.executeSql(sql, values, success ? function() {
                success.apply(me, arguments);
            } : null, failure ? function() {
                failure.apply(me, arguments);
            } : null);
        },
        executeTransaction: function(runner, failure, success, autoCreateTable) {
            var me = this;
            autoCreateTable = autoCreateTable !== false;
            me.getDatabaseObject().transaction(runner ? function(transaction) {
                if (autoCreateTable && !me.tableExists) {
                    me.createTable(transaction);
                }
                runner.apply(me, arguments);
            } : null, failure ? function() {
                failure.apply(me, arguments);
            } : null, success ? function() {
                success.apply(me, arguments);
            } : null);
        },
        fromSqlValue: function(value, field) {
            if (field.isDateField) {
                value = value ? new Date(value) : null;
            } else if (field.isBooleanField) {
                value = value === 1;
            }
            return value;
        },
        getPersistedModelColumns: function(model) {
            var fields = model.fields,
                uniqueIdStrategy = this.uniqueIdStrategy,
                idProperty = model.idProperty,
                columns = [],
                len = fields.length,
                i, field, name;
            for (i = 0; i < len; ++i) {
                field = fields[i];
                name = field.name;
                if (name === idProperty && !uniqueIdStrategy) {
                    
                    continue;
                }
                if (field.persist !== false) {
                    columns.push(field.name);
                }
            }
            return columns;
        },
        toSqlValue: function(value, field) {
            if (field.isDateField) {
                value = value ? value.getTime() : null;
            } else if (field.isBooleanField) {
                value = value ? 1 : 0;
            }
            return value;
        }
    }
});

/**
 * @private
 */
Ext.define('Ext.device.accelerometer.Abstract', {
    config: {
        /**
         * @cfg {Number} frequency The default frequency to get the current acceleration when using {@link Ext.device.Accelerometer#watchAcceleration}.
         */
        frequency: 10000
    },
    getCurrentAcceleration: function(config) {
        // <debug>
        if (!config.success) {
            Ext.Logger.warn('You need to specify a `success` function for #getCurrentAcceleration');
        }
        // </debug>
        return config;
    },
    watchAcceleration: function(config) {
        var defaultConfig = Ext.device.accelerometer.Abstract.prototype.config;
        config = Ext.applyIf(config, {
            frequency: defaultConfig.frequency
        });
        // <debug>
        if (!config.callback) {
            Ext.Logger.warn('You need to specify a `callback` function for #watchAcceleration');
        }
        // </debug>
        return config;
    },
    clearWatch: Ext.emptyFn
});

/**
 * @private
 */
Ext.define('Ext.device.accelerometer.Cordova', {
    alternateClassName: 'Ext.device.accelerometer.PhoneGap',
    extend: 'Ext.device.accelerometer.Abstract',
    activeWatchID: null,
    getCurrentAcceleration: function(config) {
        config = this.callParent(arguments);
        navigator.accelerometer.getCurrentAcceleration(config.success, config.failure);
        return config;
    },
    watchAcceleration: function(config) {
        config = this.callParent(arguments);
        if (this.activeWatchID) {
            this.clearWatch();
        }
        this.activeWatchID = navigator.accelerometer.watchAcceleration(config.callback, config.failure, config);
        return config;
    },
    clearWatch: function() {
        if (this.activeWatchID) {
            navigator.accelerometer.clearWatch(this.activeWatchID);
            this.activeWatchID = null;
        }
    }
});

/**
 * @private
 */
Ext.define('Ext.device.accelerometer.Simulator', {
    extend: 'Ext.device.accelerometer.Abstract'
});

/**
 * Provides access to the native Accelerometer API when running on a device. There are three implementations of this API:
 *
 * - [PhoneGap](http://docs.phonegap.com/en/2.6.0/cordova_accelerometer_accelerometer.md.html#Accelerometer)
 *
 * This class will automatically select the correct implementation depending on the device your application is running on.
 *
 * ## Examples
 *
 * Getting the current location:
 *
 *     Ext.device.Accelerometer.getCurrentAcceleration({
 *         success: function(acceleration) {
 *                      alert('Acceleration X: ' + acceleration.x + '\n' +
 *                      'Acceleration Y: ' + acceleration.y + '\n' +
 *                      'Acceleration Z: ' + acceleration.z + '\n' +
 *                      'Timestamp: '      + acceleration.timestamp + '\n');
 *          },
 *         failure: function() {
 *             console.log('something went wrong!');
 *         }
 *     });
 *
 * Watching the current acceleration:
 *
 *     Ext.device.Accelerometer.watchAcceleration({
 *         frequency: 500, // Update every 1/2 second
 *         callback: function(acceleration) {
 *                      console.log('Acceleration X: ' + acceleration.x + '\n' +
 *                      'Acceleration Y: ' + acceleration.y + '\n' +
 *                      'Acceleration Z: ' + acceleration.z + '\n' +
 *                      'Timestamp: '      + acceleration.timestamp + '\n');
 *          },
 *         failure: function() {
 *             console.log('something went wrong!');
 *         }
 *     });
 *
 * @mixins Ext.device.accelerometer.Abstract
 */
Ext.define('Ext.device.Accelerometer', {
    singleton: true,
    requires: [
        'Ext.device.accelerometer.Cordova',
        'Ext.device.accelerometer.Simulator'
    ],
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView && browserEnv.Cordova) {
            return Ext.create('Ext.device.accelerometer.Cordova');
        }
        return Ext.create('Ext.device.accelerometer.Simulator');
    }
});

/**
 * @private
 *
 * This object handles communication between the WebView and Sencha's native shell.
 * Currently it has two primary responsibilities:
 *
 * 1. Maintaining unique string ids for callback functions, together with their scope objects
 * 2. Serializing given object data into HTTP GET request parameters
 *
 * As an example, to capture a photo from the device's camera, we use `Ext.device.Camera.capture()` like:
 *
 *     Ext.device.Camera.capture(
 *         function(dataUri){
 *             // Do something with the base64-encoded `dataUri` string
 *         },
 *         function(errorMessage) {
 *
 *         },
 *         callbackScope,
 *         {
 *             quality: 75,
 *             width: 500,
 *             height: 500
 *         }
 *     );
 *
 * Internally, `Ext.device.Communicator.send()` will then be invoked with the following argument:
 *
 *     Ext.device.Communicator.send({
 *         command: 'Camera#capture',
 *         callbacks: {
 *             onSuccess: function() {
 *                 // ...
 *             },
 *             onError: function() {
 *                 // ...
 *             }
 *         },
 *         scope: callbackScope,
 *         quality: 75,
 *         width: 500,
 *         height: 500
 *     });
 *
 * Which will then be transformed into a HTTP GET request, sent to native shell's local
 * HTTP server with the following parameters:
 *
 *     ?quality=75&width=500&height=500&command=Camera%23capture&onSuccess=3&onError=5
 *
 * Notice that `onSuccess` and `onError` have been converted into string ids (`3` and `5`
 * respectively) and maintained by `Ext.device.Communicator`.
 *
 * Whenever the requested operation finishes, `Ext.device.Communicator.invoke()` simply needs
 * to be executed from the native shell with the corresponding ids given before. For example:
 *
 *     Ext.device.Communicator.invoke('3', ['DATA_URI_OF_THE_CAPTURED_IMAGE_HERE']);
 *
 * will invoke the original `onSuccess` callback under the given scope. (`callbackScope`), with
 * the first argument of 'DATA_URI_OF_THE_CAPTURED_IMAGE_HERE'
 *
 * Note that `Ext.device.Communicator` maintains the uniqueness of each function callback and
 * its scope object. If subsequent calls to `Ext.device.Communicator.send()` have the same
 * callback references, the same old ids will simply be reused, which guarantee the best possible
 * performance for a large amount of repetitive calls.
 */
Ext.define('Ext.device.communicator.Default', {
    SERVER_URL: 'http://localhost:3000',
    // Change this to the correct server URL
    callbackDataMap: {},
    callbackIdMap: {},
    idSeed: 0,
    globalScopeId: '0',
    generateId: function() {
        return String(++this.idSeed);
    },
    getId: function(object) {
        var id = object.$callbackId;
        if (!id) {
            object.$callbackId = id = this.generateId();
        }
        return id;
    },
    getCallbackId: function(callback, scope) {
        var idMap = this.callbackIdMap,
            dataMap = this.callbackDataMap,
            id, scopeId, callbackId, data;
        if (!scope) {
            scopeId = this.globalScopeId;
        } else if (scope.isIdentifiable) {
            scopeId = scope.getId();
        } else {
            scopeId = this.getId(scope);
        }
        callbackId = this.getId(callback);
        if (!idMap[scopeId]) {
            idMap[scopeId] = {};
        }
        if (!idMap[scopeId][callbackId]) {
            id = this.generateId();
            data = {
                callback: callback,
                scope: scope
            };
            idMap[scopeId][callbackId] = id;
            dataMap[id] = data;
        }
        return idMap[scopeId][callbackId];
    },
    getCallbackData: function(id) {
        return this.callbackDataMap[id];
    },
    invoke: function(id, args) {
        var data = this.getCallbackData(id);
        data.callback.apply(data.scope, args);
    },
    send: function(args) {
        var callbacks, scope, name, callback;
        if (!args) {
            args = {};
        } else if (args.callbacks) {
            callbacks = args.callbacks;
            scope = args.scope;
            delete args.callbacks;
            delete args.scope;
            for (name in callbacks) {
                if (callbacks.hasOwnProperty(name)) {
                    callback = callbacks[name];
                    if (typeof callback == 'function') {
                        args[name] = this.getCallbackId(callback, scope);
                    }
                }
            }
        }
        args.__source = document.location.href;
        var result = this.doSend(args);
        return (result && result.length > 0) ? JSON.parse(result) : null;
    },
    doSend: function(args) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.SERVER_URL + '?' + Ext.Object.toQueryString(args) + '&_dc=' + new Date().getTime(), false);
        // wrap the request in a try/catch block so we can check if any errors are thrown and attempt to call any
        // failure/callback functions if defined
        try {
            xhr.send(null);
            return xhr.responseText;
        } catch (e) {
            if (args.failure) {
                this.invoke(args.failure);
            } else if (args.callback) {
                this.invoke(args.callback);
            }
        }
    }
});

/**
 * @private
 */
Ext.define('Ext.device.communicator.Android', {
    extend: 'Ext.device.communicator.Default',
    doSend: function(args) {
        return window.Sencha.action(JSON.stringify(args));
    }
});

/**
 * @private
 */
Ext.define('Ext.device.Communicator', {
    requires: [
        'Ext.device.communicator.Default',
        'Ext.device.communicator.Android'
    ],
    singleton: true,
    constructor: function() {
        if (Ext.os.is.Android) {
            return new Ext.device.communicator.Android();
        }
        return new Ext.device.communicator.Default();
    }
});

/**
 * @private
 */
Ext.define('Ext.device.analytics.Abstract', {
    config: {
        accountID: null
    },
    updateAccountID: function(newID) {
        if (newID) {
            window.plugins.googleAnalyticsPlugin.startTrackerWithAccountID(newID);
        }
    },
    /**
	 * Registers yur Google Analytics account.
	 * 
	 * @param {String} accountID Your Google Analytics account ID
	 */
    registerAccount: function(accountID) {
        this.setAccountID(accountID);
    },
    /**
     * Track an event in your application.
     *
     * More information here: http://code.google.com/apis/analytics/docs/tracking/eventTrackerGuide.html
     * 
     * @param {Object} config
     *
     * @param {String} config.category The name you supply for the group of objects you want to track
     * 
     * @param {String} config.action A string that is uniquely paired with each category, and commonly 
     * used to define the type of user interaction for the web object.
     * 
     * @param {String} config.label An optional string to provide additional dimensions to the event data.
     * 
     * @param {String} config.value An integer that you can use to provide numerical data about the user event
     * 
     * @param {Boolean} config.nonInteraction A boolean that when set to true, indicates that the event hit will 
     * not be used in bounce-rate calculation.
     */
    trackEvent: Ext.emptyFn,
    /**
     * Track an pageview in your application.
     *
     * @param {String} config.page The page you want to track (must start with a slash).
     */
    trackPageview: Ext.emptyFn
});

/**
 * @private
 */
Ext.define('Ext.device.analytics.Cordova', {
    extend: 'Ext.device.analytics.Abstract',
    trackEvent: function(config) {
        if (!this.getAccountID()) {
            return;
        }
        window.plugins.googleAnalyticsPlugin.trackEvent(config.category, config.action, config.label, config.value, config.nonInteraction);
    },
    trackPageview: function(page) {
        if (!this.getAccountID()) {
            return;
        }
        window.plugins.googleAnalyticsPlugin.trackPageview(page);
    }
});

/**
 * Allows you to use Google Analytics within your Cordova application.
 *
 * For setup information, please read the [plugin documentation](https://github.com/phonegap/phonegap-facebook-plugin).
 * 
 * @mixins Ext.device.analytics.Abstract
 */
Ext.define('Ext.device.Analytics', {
    alternateClassName: 'Ext.ux.device.Analytics',
    singleton: true,
    requires: [
        'Ext.device.Communicator',
        'Ext.device.analytics.*'
    ],
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView && browserEnv.Cordova) {
            return Ext.create('Ext.device.analytics.Cordova');
        } else {
            return Ext.create('Ext.device.analytics.Abstract');
        }
    }
});

/**
 * @private
 */
Ext.define('Ext.device.browser.Abstract', {
    /**
     * Used to open a new browser window.
     *
     * When used with Cordova, a new InAppBrowser window opens. With Cordova, you also have the ability
     * to listen when the window starts loading, is finished loading, fails to load, and when it is closed.
     * You can also use the {@link #close} method to close the window, if opened.
     * 
     * @param {Object} options
     * The options to use when opening a new browser window.
     *
     * @param {String} options.url
     * The URL to open.
     *
     * @param {Object} options.listeners
     * The listeners you want to add onto the window. Available events are:
     *
     * - `loadstart` - when the window starts loading the URL
     * - `loadstop` - when the window is finished loading the URL
     * - `loaderror` - when the window encounters an error loading the URL
     * - `close` - when the window is closed
     *
     * @param {Boolean} options.showToolbar
     * True to show the toolbar in the browser window.
     *
     * @param {String} options.options
     * A string of options which are used when using Cordova. For a full list of options, visit the 
     * [PhoneGap documention](http://docs.phonegap.com/en/2.6.0/cordova_inappbrowser_inappbrowser.md.html#window.open).
     */
    open: Ext.emptyFn,
    /**
     * Used to close the browser, if one is opened.
     */
    close: Ext.emptyFn
});

/**
 * @private
 */
Ext.define('Ext.device.browser.Cordova', {
    extend: 'Ext.device.browser.Abstract',
    open: function(config) {
        if (!this._window) {
            this._window = Ext.create('Ext.device.browser.Window');
        }
        this._window.open(config);
        return this._window;
    },
    close: function() {
        if (!this._window) {
            return;
        }
        this._window.close();
    }
});

/**
 * @private
 */
Ext.define('Ext.device.browser.Simulator', {
    open: function(config) {
        window.open(config.url, '_blank');
    },
    close: Ext.emptyFn
});

/**
 * @mixins Ext.device.browser.Abstract
 */
Ext.define('Ext.device.Browser', {
    singleton: true,
    requires: [
        'Ext.device.Communicator',
        'Ext.device.browser.Cordova',
        'Ext.device.browser.Simulator'
    ],
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView && browserEnv.Cordova) {
            return Ext.create('Ext.device.browser.Cordova');
        }
        return Ext.create('Ext.device.browser.Simulator');
    }
});

/**
 * @private
 */
Ext.define('Ext.device.camera.Abstract', {
    source: {
        library: 0,
        camera: 1,
        album: 2
    },
    destination: {
        data: 0,
        // Returns base64-encoded string
        file: 1,
        // Returns file's URI
        'native': 2
    },
    encoding: {
        jpeg: 0,
        jpg: 0,
        png: 1
    },
    media: {
        picture: 0,
        video: 1,
        all: 2
    },
    direction: {
        back: 0,
        front: 1
    },
    /**
     * Allows you to capture a photo.
     *
     * @param {Object} options
     * The options to use when taking a photo.
     *
     * @param {Function} options.success
     * The success callback which is called when the photo has been taken.
     *
     * @param {String} options.success.image
     * The image which was just taken, either a base64 encoded string or a URI depending on which
     * option you chose (destination).
     *
     * @param {Function} options.failure
     * The function which is called when something goes wrong.
     *
     * @param {Object} scope
     * The scope in which to call the `success` and `failure` functions, if specified.
     *
     * @param {Number} options.quality
     * The quality of the image which is returned in the callback. This should be a percentage.
     *
     * @param {String} options.source
     * The source of where the image should be taken. Available options are:
     *
     * - **album** - prompts the user to choose an image from an album
     * - **camera** - prompts the user to take a new photo
     * - **library** - prompts the user to choose an image from the library
     *
     * @param {String} destination
     * The destination of the image which is returned. Available options are:
     *
     * - **data** - returns a base64 encoded string
     * - **file** - returns the file's URI
     *
     * @param {String} encoding
     * The encoding of the returned image. Available options are:
     *
     * - **jpg**
     * - **png**
     *
     * @param {Number} width
     * The width of the image to return
     *
     * @param {Number} height
     * The height of the image to return
     */
    capture: Ext.emptyFn,
    getPicture: Ext.emptyFn,
    cleanup: Ext.emptyFn
});

/**
 * @private
 */
Ext.define('Ext.device.camera.Cordova', {
    alternateClassName: 'Ext.device.camera.PhoneGap',
    extend: 'Ext.device.camera.Abstract',
    getPicture: function(onSuccess, onError, options) {
        try {
            navigator.camera.getPicture(onSuccess, onError, options);
        } catch (e) {
            alert(e);
        }
    },
    cleanup: function(onSuccess, onError) {
        try {
            navigator.camera.cleanup(onSuccess, onError);
        } catch (e) {
            alert(e);
        }
    },
    capture: function(args) {
        var onSuccess = args.success,
            onError = args.failure,
            scope = args.scope,
            sources = this.source,
            destinations = this.destination,
            encodings = this.encoding,
            source = args.source,
            destination = args.destination,
            encoding = args.encoding,
            options = {};
        if (scope) {
            onSuccess = Ext.Function.bind(onSuccess, scope);
            onError = Ext.Function.bind(onError, scope);
        }
        if (source !== undefined) {
            options.sourceType = sources.hasOwnProperty(source) ? sources[source] : source;
        }
        if (destination !== undefined) {
            options.destinationType = destinations.hasOwnProperty(destination) ? destinations[destination] : destination;
        }
        if (encoding !== undefined) {
            options.encodingType = encodings.hasOwnProperty(encoding) ? encodings[encoding] : encoding;
        }
        if ('quality' in args) {
            options.quality = args.quality;
        }
        if ('width' in args) {
            options.targetWidth = args.width;
        }
        if ('height' in args) {
            options.targetHeight = args.height;
        }
        this.getPicture(onSuccess, onError, options);
    }
});

/**
 * @private
 */
Ext.define('Ext.device.camera.Simulator', {
    extend: 'Ext.device.camera.Abstract',
    config: {
        samples: [
            {
                success: 'http://www.sencha.com/img/sencha-large.png'
            }
        ]
    },
    constructor: function(config) {
        this.initConfig(config);
    },
    updateSamples: function(samples) {
        this.sampleIndex = 0;
    },
    capture: function(options) {
        var index = this.sampleIndex,
            samples = this.getSamples(),
            samplesCount = samples.length,
            sample = samples[index],
            scope = options.scope,
            success = options.success,
            failure = options.failure;
        if ('success' in sample) {
            if (success) {
                success.call(scope, sample.success);
            }
        } else {
            if (failure) {
                failure.call(scope, sample.failure);
            }
        }
        if (++index > samplesCount - 1) {
            index = 0;
        }
        this.sampleIndex = index;
    }
});

/**
 * This class allows you to use native APIs to take photos using the device camera.
 *
 * When this singleton is instantiated, it will automatically select the correct implementation depending on the
 * current device:
 *
 * - Sencha Packager
 * - Cordova
 * - Simulator
 *
 * Both the Sencha Packager and Cordova implementations will use the native camera functionality to take or select
 * a photo. The Simulator implementation will simply return fake images.
 *
 * ## Example
 *
 * You can use the {@link Ext.device.Camera#capture} function to take a photo:
 *
 *     Ext.device.Camera.capture({
 *         success: function(image) {
 *             imageView.setSrc(image);
 *         },
 *         quality: 75,
 *         width: 200,
 *         height: 200,
 *         destination: 'data'
 *     });
 *
 * See the documentation for {@link Ext.device.Camera#capture} all available configurations.
 *
 * @mixins Ext.device.camera.Abstract
 */
Ext.define('Ext.device.Camera', {
    singleton: true,
    requires: [
        'Ext.device.Communicator',
        'Ext.device.camera.Cordova',
        'Ext.device.camera.Simulator'
    ],
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView) {
            if (browserEnv.Cordova) {
                return Ext.create('Ext.device.camera.Cordova');
            }
        }
        return Ext.create('Ext.device.camera.Simulator');
    }
});

/**
 * @private
 */
Ext.define('Ext.device.capture.Cordova', {
    captureAudio: function(config) {
        // <debug>
        if (!config.success) {
            Ext.Logger.warn('You need to specify a `success` function for #captureAudio');
        }
        // </debug>
        var options = {
                limit: config.limit,
                duration: config.maximumDuration
            };
        navigator.device.capture.captureAudio(config.success, config.failure, options);
    },
    captureVideo: function(config) {
        // <debug>
        if (!config.success) {
            Ext.Logger.warn('You need to specify a `success` function for #captureVideo');
        }
        // </debug>
        var options = {
                limit: config.limit,
                duration: config.maximumDuration
            };
        navigator.device.capture.captureVideo(config.success, config.failure, options);
    }
});

/**
 * @private
 */
Ext.define('Ext.device.capture.Abstract', {
    alternateClassName: 'Ext.device.capture.Simulator',
    /**
     * Start the audio recorder application and return information about captured audio clip file(s).
     *
     *     @example
     *     Ext.device.Capture.captureAudio({
     *         limit: 2, // limit to 2 recordings
     *         maximumDuration: 10, // limit to 10 seconds per recording
     *         success: function(files) {
     *             for (var i = 0; i < files.length; i++) {
     *                 console.log('Captured audio path: ', files[i].fullPath);
     *             };
     *         },
     *         failure: function() {
     *             console.log('Something went wrong!');
     *         }
     *     });
     *
     * @param {Object} config The configuration object to be passed:
     *
     * @param {Number} config.limit The maximum number of recordings allowed (defaults to 1).
     *
     * @param {Number} config.maximumDuration The maximum duration of the capture, in seconds.
     *
     * @param {Number} config.duration The maximum duration of the capture, in seconds.
     *
     * @param {Function} config.success Called if the capture is successful.
     * @param {Array} config.success.files An array of objects containing information about the captured audio.
     *
     * @param {Function} config.failure Called if the capture is unsuccessful.
     */
    captureAudio: Ext.emptyFn,
    /**
     * Start the video recorder application and return information about captured video clip file(s).
     *
     *     @example
     *     Ext.device.Capture.captureVideo({
     *         limit: 2, // limit to 2 recordings
     *         maximumDuration: 10, // limit to 10 seconds per recording
     *         success: function(files) {
     *             for (var i = 0; i < files.length; i++) {
     *                 console.log('Captured video path: ', files[i].fullPath);
     *             };
     *         },
     *         failure: function() {
     *             console.log('Something went wrong!');
     *         }
     *     });
     *
     * @param {Object} config The configuration object to be passed:
     *
     * @param {Number} config.limit The maximum number of recordings allowed (defaults to 1).
     *
     * @param {Number} config.maximumDuration The maximum duration of the capture, in seconds.
     *
     * @param {Number} config.duration The maximum duration of the capture, in seconds.
     *
     * @param {Function} config.success Called if the capture is successful.
     * @param {Array} config.success.files An array of objects containing information about the captured video.
     *
     * @param {Function} config.failure Called if the capture is unsuccessful.
     */
    captureVideo: Ext.emptyFn
});

/**
 * Provides access to the audio and video capture capabilities of the device.
 *
 * @mixins Ext.device.capture.Abstract
 */
Ext.define('Ext.device.Capture', {
    singleton: true,
    requires: [
        'Ext.device.Communicator',
        'Ext.device.capture.Cordova',
        'Ext.device.capture.Simulator'
    ],
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView && browserEnv.Cordova) {
            return Ext.create('Ext.device.capture.Cordova');
        }
        return Ext.create('Ext.device.capture.Simulator');
    }
});

/**
 * @private
 */
Ext.define('Ext.device.compass.Abstract', {
    config: {
        /**
         * @cfg {Number} frequency The default frequency to get the current heading when using {@link Ext.device.Compass#watchHeading}.
         */
        frequency: 100
    },
    getHeadingAvailable: function(config) {
        // <debug>
        if (!config.callback) {
            Ext.Logger.warn('You need to specify a `callback` function for #getHeadingAvailable');
        }
        // </debug>
        return config;
    },
    getCurrentHeading: function(config) {
        // <debug>
        if (!config.success) {
            Ext.Logger.warn('You need to specify a `success` function for #getCurrentHeading');
        }
        // </debug>
        return config;
    },
    watchHeading: function(config) {
        var defaultConfig = Ext.device.compass.Abstract.prototype.config;
        config = Ext.applyIf(config, {
            frequency: defaultConfig.frequency
        });
        // <debug>
        if (!config.callback) {
            Ext.Logger.warn('You need to specify a `callback` function for #watchHeading');
        }
        // </debug>
        return config;
    },
    clearWatch: Ext.emptyFn
});

/**
 * @private
 */
Ext.define('Ext.device.compass.Cordova', {
    alternateClassName: 'Ext.device.compass.PhoneGap',
    extend: 'Ext.device.compass.Abstract',
    activeWatchID: null,
    getHeadingAvailable: function(config) {
        var callback = function(result) {
                if (result.hasOwnProperty("code")) {
                    config.callback.call(config.scope || this, false);
                } else {
                    config.callback.call(config.scope || this, true);
                }
            };
        this.getCurrentHeading({
            success: callback,
            failure: callback
        });
    },
    getCurrentHeading: function(config) {
        config = this.callParent(arguments);
        navigator.compass.getCurrentHeading(config.success, config.failure);
        return config;
    },
    watchHeading: function(config) {
        config = this.callParent(arguments);
        if (this.activeWatchID) {
            this.clearWatch();
        }
        this.activeWatchID = navigator.compass.watchHeading(config.callback, config.failure, config);
        return config;
    },
    clearWatch: function() {
        if (this.activeWatchID) {
            navigator.compass.clearWatch(this.activeWatchID);
            this.activeWatchID = null;
        }
    }
});

/**
 * @private
 */
Ext.define('Ext.device.compass.Simulator', {
    extend: 'Ext.device.compass.Abstract'
});

/**
 * Provides access to the native Compass API when running on a device. There are three implementations of this API:
 *
 * - [PhoneGap](http://docs.phonegap.com/en/2.6.0/cordova_compass_compass.md.html#Compass)
 *
 * This class will automatically select the correct implementation depending on the device your application is running on.
 *
 * ## Examples
 *
 * Getting the current location:
 *
 *     Ext.device.Compass.getCurrentHeading({
 *         success: function(heading) {
 *                      alert('Heading: ' + heading.magneticHeading);
 *          },
 *         failure: function() {
 *             console.log('something went wrong!');
 *         }
 *     });
 *
 * Watching the current compass:
 *
 *     Ext.device.Compass.watchHeading({
 *         frequency: 500, // Update every 1/2 second
 *         callback: function(heading) {
 *                      console.log('Heading: ' + heading.magneticHeading);
 *          },
 *         failure: function() {
 *             console.log('something went wrong!');
 *         }
 *     });
 *
 * @mixins Ext.device.compass.Abstract
 */
Ext.define('Ext.device.Compass', {
    singleton: true,
    requires: [
        'Ext.device.compass.Cordova',
        'Ext.device.compass.Simulator'
    ],
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView && browserEnv.Cordova) {
            return Ext.create('Ext.device.compass.Cordova');
        }
        return Ext.create('Ext.device.compass.Simulator');
    }
});

/**
 * @private
 */
Ext.define('Ext.device.connection.Abstract', {
    extend: 'Ext.Evented',
    mixins: [
        'Ext.mixin.Observable'
    ],
    config: {
        online: false,
        type: null
    },
    /**
     * @event online
     * Fires when the device goes online
     */
    /**
     * @event offline
     * Fires when the device goes offline
     */
    /**
     * @property {String} UNKNOWN
     * Text label for a connection type.
     */
    UNKNOWN: 'Unknown connection',
    /**
     * @property {String} ETHERNET
     * Text label for a connection type.
     */
    ETHERNET: 'Ethernet connection',
    /**
     * @property {String} WIFI
     * Text label for a connection type.
     */
    WIFI: 'WiFi connection',
    /**
     * @property {String} CELL_2G
     * Text label for a connection type.
     */
    CELL_2G: 'Cell 2G connection',
    /**
     * @property {String} CELL_3G
     * Text label for a connection type.
     */
    CELL_3G: 'Cell 3G connection',
    /**
     * @property {String} CELL_4G
     * Text label for a connection type.
     */
    CELL_4G: 'Cell 4G connection',
    /**
     * @property {String} NONE
     * Text label for a connection type.
     */
    NONE: 'No network connection',
    /**
     * True if the device is currently online
     * @return {Boolean} online
     */
    isOnline: function() {
        return this.getOnline();
    }
});
/**
     * @method getType
     * Returns the current connection type.
     * @return {String} type
     */

/**
 * @private
 */
Ext.define('Ext.device.connection.Cordova', {
    alternateClassName: 'Ext.device.connection.PhoneGap',
    extend: 'Ext.device.connection.Abstract',
    constructor: function() {
        var me = this;
        document.addEventListener('online', function() {
            me.fireEvent('online', me);
        });
        document.addEventListener('offline', function() {
            me.fireEvent('offline', me);
        });
    },
    syncOnline: function() {
        var type = navigator.connection.type;
        this._type = type;
        this._online = type != Connection.NONE;
    },
    getOnline: function() {
        this.syncOnline();
        return this._online;
    },
    getType: function() {
        this.syncOnline();
        return this._type;
    }
});

/**
 * @private
 */
Ext.define('Ext.device.connection.Simulator', {
    extend: 'Ext.device.connection.Abstract',
    getOnline: function() {
        this._online = navigator.onLine;
        this._type = Ext.device.Connection.UNKNOWN;
        return this._online;
    }
});

/**
 * This class is used to check if the current device is currently online or not. It has three different implementations:
 *
 * - Sencha Packager
 * - Cordova
 * - Simulator
 *
 * Both the Sencha Packager and Cordova implementations will use the native functionality to determine if the current
 * device is online. The Simulator version will simply use `navigator.onLine`.
 *
 * When this singleton ({@link Ext.device.Connection}) is instantiated, it will automatically decide which version to
 * use based on the current platform.
 *
 * ## Examples
 *
 * Determining if the current device is online:
 *
 *     alert(Ext.device.Connection.isOnline());
 *
 * Checking the type of connection the device has:
 *
 *     alert('Your connection type is: ' + Ext.device.Connection.getType());
 *
 * The available connection types are:
 *
 * - {@link Ext.device.Connection#UNKNOWN UNKNOWN} - Unknown connection
 * - {@link Ext.device.Connection#ETHERNET ETHERNET} - Ethernet connection
 * - {@link Ext.device.Connection#WIFI WIFI} - WiFi connection
 * - {@link Ext.device.Connection#CELL_2G CELL_2G} - Cell 2G connection
 * - {@link Ext.device.Connection#CELL_3G CELL_3G} - Cell 3G connection
 * - {@link Ext.device.Connection#CELL_4G CELL_4G} - Cell 4G connection
 * - {@link Ext.device.Connection#NONE NONE} - No network connection
 *
 * @mixins Ext.device.connection.Abstract
 */
Ext.define('Ext.device.Connection', {
    singleton: true,
    requires: [
        'Ext.device.Communicator',
        'Ext.device.connection.Cordova',
        'Ext.device.connection.Simulator'
    ],
    /**
     * @event onlinechange
     * @inheritdoc Ext.device.connection.Sencha#onlinechange
     */
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView) {
            if (browserEnv.Cordova) {
                return Ext.create('Ext.device.connection.Cordova');
            }
        }
        return Ext.create('Ext.device.connection.Simulator');
    }
});

/**
 * @private
 */
Ext.define('Ext.device.contacts.Abstract', {
    mixins: [
        'Ext.mixin.Observable'
    ],
    config: {
        /**
         * @cfg {Boolean} includeImages
         * True to include images when you get the contacts store. Please beware that this can be very slow.
         */
        includeImages: false
    },
    /**
     * Returns an Array of contact objects.
     * @return {Object[]} An array of contact objects.
     */
    getContacts: function(config) {
        if (!this._store) {
            this._store = [
                {
                    first: 'Peter',
                    last: 'Venkman',
                    emails: {
                        work: 'peter.venkman@gb.com'
                    }
                },
                {
                    first: 'Egon',
                    last: 'Spengler',
                    emails: {
                        work: 'egon.spengler@gb.com'
                    }
                }
            ];
        }
        config.success.call(config.scope || this, this._store);
    },
    /**
     * Returns base64 encoded image thumbnail for a contact specified in config.id
      * **This method is for Sencha Native Packager only**
      *
     * @return {String} base64 string
     */
    getThumbnail: function(config) {
        config.callback.call(config.scope || this, "");
    },
    /**
     * Returns localized, user readable label for a contact field (i.e. "Mobile", "Home")
      * **This method is for Sencha Native Packager only**
      *
     * @return {String} user readable string
     */
    getLocalizedLabel: function(config) {
        config.callback.call(config.scope || this, config.label.toUpperCase(), config.label);
    }
});

/**
 * @private
 */
Ext.define('Ext.device.contacts.Cordova', {
    alternateClassName: 'Ext.device.contacts.PhoneGap',
    extend: 'Ext.device.contacts.Abstract',
    getContacts: function(config) {
        if (!config) {
            Ext.Logger.warn('Ext.device.Contacts#getContacts: You must specify a `config` object.');
            return false;
        }
        if (!config.success) {
            Ext.Logger.warn('Ext.device.Contacts#getContacts: You must specify a `success` method.');
            return false;
        }
        if (!config.fields) {
            config.fields = [
                "*"
            ];
        }
        if (!Ext.isArray(config.fields)) {
            config.fields = [
                config.fields
            ];
        }
        if (Ext.isEmpty(config.multiple)) {
            config.multiple = true;
        }
        navigator.contacts.find(config.fields, config.success, config.failure, config);
    }
});

/**
 * This device API allows you to access a users contacts using a {@link Ext.data.Store}. This allows you to search, filter
 * and sort through all the contacts using its methods.
 *
 * To use this API, all you need to do is require this class (`Ext.device.Contacts`) and then use `Ext.device.Contacts.getContacts()`
 * to retrieve an array of contacts.
 *
 * **Please note that getThumbnail and getLocalizedLabel are *only* for the Sencha Native Packager.**
 * **Both Cordova/PhoneGap and Sencha Native Packager can access the find method though properties of returned contacts will differ.**
 *
 * # Example
 *
 *     Ext.application({
 *         name: 'Sencha',
 *         requires: 'Ext.device.Contacts',
 *
 *         launch: function() {
 *             Ext.Viewport.add({
 *                 xtype: 'list',
 *                 itemTpl: '{First} {Last}',
 *                 store: {
 *                     fields: ['First', 'Last'],
 *                     data: Ext.device.Contacts.getContacts()
 *                 }
 *             });
 *         }
 *     });
 *
 * @mixins Ext.device.contacts.Abstract
 * @mixins Ext.device.contacts.Sencha
 * @mixins Ext.device.contacts.Cordova
 */
Ext.define('Ext.device.Contacts', {
    singleton: true,
    requires: [
        'Ext.device.Communicator',
        'Ext.device.contacts.Cordova'
    ],
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView) {
            if (browserEnv.Cordova) {
                return Ext.create('Ext.device.contacts.Cordova');
            }
        }
        return Ext.create('Ext.device.contacts.Abstract');
    }
});

/**
 * @private
 */
Ext.define('Ext.device.device.Abstract', {
    mixins: [
        'Ext.mixin.Observable'
    ],
    /**
     * @event schemeupdate
     * Event which is fired when your Sencha Native packaged application is opened from another application using a custom URL scheme.
     * 
     * This event will only fire if the application was already open (in other words; `onReady` was already fired). This means you should check
     * if {@link Ext.device.Device#scheme} is set in your Application `launch`/`onReady` method, and perform any needed changes for that URL (if defined).
     * Then listen to this event for future changed.
     *
     * ## Example
     *
     *     Ext.application({
     *         name: 'Sencha',
     *         requires: ['Ext.device.Device'],
     *         launch: function() {
     *             if (Ext.device.Device.scheme) {
     *                 // the application was opened via another application. Do something:
     *                 console.log('Applicaton opened via another application: ' + Ext.device.Device.scheme.url);
     *             }
     *
     *             // Listen for future changes
     *             Ext.device.Device.on('schemeupdate', function(device, scheme) {
     *                 // the application was launched, closed, and then launched another from another application
     *                 // this means onReady wont be called again ('cause the application is already running in the 
     *                 // background) - but this event will be fired
     *                 console.log('Applicated reopened via another application: ' + scheme.url);
     *             }, this);
     *         }
     *     });
     *
     * __Note:__ This currently only works with the Sencha Native Packager. If you attempt to listen to this event when packaged with
     * PhoneGap or simply in the browser, it will never fire.**
     * 
     * @param {Ext.device.Device} this The instance of Ext.device.Device
     * @param {Object/Boolean} scheme The scheme information, if opened via another application
     * @param {String} scheme.url The URL that was opened, if this application was opened via another application. Example: `sencha:`
     * @param {String} scheme.sourceApplication The source application that opened this application. Example: `com.apple.safari`.
     */
    /**
     * @property {String} name
     * Returns the name of the current device. If the current device does not have a name (for example, in a browser), it will
     * default to `not available`.
     *
     *     alert('Device name: ' + Ext.device.Device.name);
     */
    name: 'not available',
    /**
     * @property {String} uuid
     * Returns a unique identifier for the current device. If the current device does not have a unique identifier (for example,
     * in a browser), it will default to `anonymous`.
     *
     *     alert('Device UUID: ' + Ext.device.Device.uuid);
     */
    uuid: 'anonymous',
    /**
     * @property {String} platform
     * The current platform the device is running on.
     *
     *     alert('Device platform: ' + Ext.device.Device.platform);
     */
    platform: Ext.os.name,
    /**
     * @property {Object/Boolean} scheme
     * 
     */
    scheme: false,
    /**
     * Opens a specified URL. The URL can contain a custom URL Scheme for another app or service:
     *
     *     // Safari
     *     Ext.device.Device.openURL('http://sencha.com');
     *
     *     // Telephone
     *     Ext.device.Device.openURL('tel:6501231234');
     *
     *     // SMS with a default number
     *     Ext.device.Device.openURL('sms:+12345678901');
     *
     *     // Email client
     *     Ext.device.Device.openURL('mailto:rob@sencha.com');
     *
     * You can find a full list of available URL schemes here: [http://wiki.akosma.com/IPhone_URL_Schemes](http://wiki.akosma.com/IPhone_URL_Schemes).
     *
     * __Note:__ This currently only works with the Sencha Native Packager. Attempting to use this on PhoneGap, iOS Simulator
     * or the browser will simply result in the current window location changing.**
     *
     * If successful, this will close the application (as another one opens).
     * 
     * @param {String} url The URL to open
     */
    openURL: function(url) {
        window.location = url;
    }
});

/**
 * @private
 */
Ext.define('Ext.device.device.Cordova', {
    alternateClassName: 'Ext.device.device.PhoneGap',
    extend: 'Ext.device.device.Abstract',
    availableListeners: [
        'pause',
        'resume',
        'backbutton',
        'batterycritical',
        'batterylow',
        'batterystatus',
        'menubutton',
        'searchbutton',
        'startcallbutton',
        'endcallbutton',
        'volumeupbutton',
        'volumedownbutton'
    ],
    constructor: function() {
        // We can't get the device details until the device is ready, so lets wait.
        if (Ext.isReady) {
            this.onReady();
        } else {
            Ext.onReady(this.onReady, this, {
                single: true
            });
        }
    },
    /**
     * @property {String} cordova
     * Returns the version of Cordova running on the device.
     *
     *     alert('Device cordova: ' + Ext.device.Device.cordova);
     */
    /**
     * @property {String} version
     * Returns the operating system version.
     *
     *     alert('Device Version: ' + Ext.device.Device.version);
     */
    /**
     * @property {String} model
     * Returns the device's model name.
     *
     *     alert('Device Model: ' + Ext.device.Device.model);
     */
    /**
     * @event pause
     * Fires when the application goes into the background
     */
    /**
     * @event resume
     * Fires when the application goes into the foreground
     */
    /**
     * @event batterycritical
     * This event that fires when a Cordova application detects the percentage of battery 
     * has reached the critical battery threshold.
     */
    /**
     * @event batterylow
     * This event that fires when a Cordova application detects the percentage of battery 
     * has reached the low battery threshold.
     */
    /**
     * @event batterystatus
     * This event that fires when a Cordova application detects the percentage of battery 
     * has changed by at least 1 percent.
     */
    /**
     * @event backbutton
     * This is an event that fires when the user presses the back button.
     */
    /**
     * @event menubutton
     * This is an event that fires when the user presses the menu button.
     */
    /**
     * @event searchbutton
     * This is an event that fires when the user presses the search button.
     */
    /**
     * @event startcallbutton
     * This is an event that fires when the user presses the start call button.
     */
    /**
     * @event endcallbutton
     * This is an event that fires when the user presses the end call button.
     */
    /**
     * @event volumeupbutton
     * This is an event that fires when the user presses the volume up button.
     */
    /**
     * @event volumedownbutton
     * This is an event that fires when the user presses the volume down button.
     */
    onReady: function() {
        var me = this,
            device = window.device;
        me.name = device.name || device.model;
        me.cordova = device.cordova;
        me.platform = device.platform || Ext.os.name;
        me.uuid = device.uuid;
        me.version = device.version;
        me.model = device.model;
    },
    privates: {
        doAddListener: function(name) {
            var me = this;
            if (!me.addedListeners) {
                me.addedListeners = [];
            }
            if (me.availableListeners.indexOf(name) != -1 && me.addedListeners.indexOf(name) == -1) {
                // Add the listeners
                me.addedListeners.push(name);
                document.addEventListener(name, function() {
                    me.fireEvent(name, me);
                });
            }
            Ext.device.Device.mixins.observable.doAddListener.apply(Ext.device.Device.mixins.observable, arguments);
        }
    }
});

/**
 * @private
 */
Ext.define('Ext.device.device.Simulator', {
    extend: 'Ext.device.device.Abstract'
});

/**
 * Provides a cross device way to get information about the device your application is running on. There are 3 different implementations:
 *
 * - Sencha Packager
 * - [Cordova](http://cordova.apache.org/docs/en/2.5.0/cordova_device_device.md.html#Device)
 * - Simulator
 *
 * ## Examples
 *
 * #### Device Information
 *
 * Getting the device information:
 *
 *     Ext.application({
 *         name: 'Sencha',
 *
 *         // Remember that the Ext.device.Device class *must* be required
 *         requires: ['Ext.device.Device'],
 *
 *         launch: function() {
 *             alert([
 *                 'Device name: ' + Ext.device.Device.name,
 *                 'Device platform: ' + Ext.device.Device.platform,
 *                 'Device UUID: ' + Ext.device.Device.uuid
 *             ].join('\n'));
 *         }
 *     });
 *
 * ### Custom Scheme URL
 *
 * Using custom scheme URL to application your application from other applications:
 *
 *     Ext.application({
 *         name: 'Sencha',
 *         requires: ['Ext.device.Device'],
 *         launch: function() {
 *             if (Ext.device.Device.scheme) {
 *                 // the application was opened via another application. Do something:
 *                 alert('Applicaton pened via another application: ' + Ext.device.Device.scheme.url);
 *             }
 *
 *             // Listen for future changes
 *             Ext.device.Device.on('schemeupdate', function(device, scheme) {
 *                 // the application was launched, closed, and then launched another from another application
 *                 // this means onReady wont be called again ('cause the application is already running in the 
 *                 // background) - but this event will be fired
 *                 alert('Applicated reopened via another application: ' + scheme.url);
 *             }, this);
 *         }
 *     });
 *
 * Of course, you must add the custom scheme URL you would like to use when packaging your application.
 * You can do this by setting the `URLScheme` property inside your `package.json` file (Sencha Native Packager configuration file):
 *
 *     {
 *         ...
 *         "URLScheme": "sencha",
 *         ...
 *     }
 *
 * You can change the available URL scheme.
 *
 * You can then test it by packaging and installing the application onto a device/iOS Simulator, opening Safari and typing: `sencha:testing`.
 * The application will launch and it will `alert` the URL you specified.
 *
 * **PLEASE NOTE: This currently only works with the Sencha Native Packager. If you attempt to listen to this event when packaged with
 * PhoneGap or simply in the browser, it will not function.**
 *
 * @mixins Ext.device.device.Abstract
 */
Ext.define('Ext.device.Device', {
    singleton: true,
    requires: [
        'Ext.device.Communicator',
        'Ext.device.device.Cordova',
        'Ext.device.device.Simulator'
    ],
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView) {
            if (browserEnv.Cordova) {
                return Ext.create('Ext.device.device.Cordova');
            }
        }
        return Ext.create('Ext.device.device.Simulator');
    }
});

/**
 * @private
 */
Ext.define('Ext.device.filesystem.Abstract', {
    config: {
        fileSystemType: 1,
        fileSystemSize: 0,
        readerType: "text",
        stringEncoding: "UTF8"
    },
    requestFileSystem: function(config) {
        var defaultConfig = Ext.device.filesystem.Abstract.prototype.config;
        config = Ext.applyIf(config, {
            type: defaultConfig.fileSystemType,
            size: defaultConfig.fileSystemSize,
            success: Ext.emptyFn,
            failure: Ext.emptyFn
        });
        return config;
    }
});

/**
 * @private
 */
Ext.define('Ext.device.filesystem.HTML5', {
    extend: 'Ext.device.filesystem.Abstract',
    /**
     * Requests a {@link Ext.device.filesystem.FileSystem} instance.
     *
     *      var me = this;
     *      var fs = Ext.create("Ext.device.FileSystem", {});
     *      fs.requestFileSystem({
     *          type: window.PERSISTENT,
     *          size: 1024 * 1024,
     *          success: function(fileSystem) {
     *              me.fs = fileSystem;
     *          },
     *          failure: function(err) {
     *              console.log("FileSystem Failure: " + err.code);
     *          }
     *      });
     *
     * @param {Object} config
     * The object which contains the following config options:
     *
     * @param {Number} config.type
     * window.TEMPORARY (0) or window.PERSISTENT (1)
     *
     * @param {Number} config.size
     * Storage space, in Bytes, needed by the application
     *
     * @param {Function} config.success This is required.
     * The callback to be called when the file system has been successfully created.
     *
     * @param {Ext.device.filesystem.FileSystem} config.success.fileSystem
     * The created file system.
     *
     * @param {Function} config.failure This is optional.
     * The callback to be called when an error occurred.
     *
     * @param {Object} config.failure.error
     * The occurred error.
     *
     * @param {Object} config.scope
     * The scope object
     */
    requestFileSystem: function(config) {
        if (!config.success) {
            Ext.Logger.error('Ext.device.filesystem#requestFileSystem: You must specify a `success` callback.');
            return null;
        }
        var me = this;
        var successCallback = function(fs) {
                var fileSystem = Ext.create('Ext.device.filesystem.FileSystem', fs);
                config.success.call(config.scope || me, fileSystem);
            };
        window.requestFileSystem(config.type, config.size, successCallback, config.failure || Ext.emptyFn);
    }
}, function() {
    /**
     * The FileSystem class which is used to represent a file system.
     */
    Ext.define('Ext.device.filesystem.FileSystem', {
        fs: null,
        root: null,
        constructor: function(fs) {
            this.fs = fs;
            this.root = Ext.create('Ext.device.filesystem.DirectoryEntry', '/', this);
        },
        /**
         * Returns a {@link Ext.device.filesystem.DirectoryEntry} instance for the root of the file system.
         *
         * @return {Ext.device.filesystem.DirectoryEntry}
         * The file system root directory.
         */
        getRoot: function() {
            return this.root;
        }
    }, function() {
        /**
         * The Entry class which is used to represent entries in a file system,
         * each of which may be a {@link Ext.device.filesystem.FileEntry} or a {@link Ext.device.filesystem.DirectoryEntry}.
         *
         * This is an abstract class.
         * @abstract
         */
        Ext.define('Ext.device.filesystem.Entry', {
            directory: false,
            path: 0,
            fileSystem: null,
            entry: null,
            constructor: function(directory, path, fileSystem) {
                this.directory = directory;
                this.path = path;
                this.fileSystem = fileSystem;
            },
            /**
             * Returns whether the entry is a file.
             *
             * @return {Boolean}
             * The entry is a file.
             */
            isFile: function() {
                return !this.directory;
            },
            /**
             * Returns whether the entry is a directory.
             *
             * @return {Boolean}
             * The entry is a directory.
             */
            isDirectory: function() {
                return this.directory;
            },
            /**
             * Returns the name of the entry, excluding the path leading to it.
             *
             * @return {String}
             * The entry name.
             */
            getName: function() {
                var components = this.path.split('/');
                for (var i = components.length - 1; i >= 0; --i) {
                    if (components[i].length > 0) {
                        return components[i];
                    }
                }
                return '/';
            },
            /**
             * Returns the full absolute path from the root to the entry.
             *
             * @return {String}
             * The entry full path.
             */
            getFullPath: function() {
                return this.path;
            },
            /**
             * Returns the file system on which the entry resides.
             *
             * @return {Ext.device.filesystem.FileSystem}
             * The entry file system.
             */
            getFileSystem: function() {
                return this.fileSystem;
            },
            getEntry: function() {
                return null;
            },
            /**
             * Moves the entry to a different location on the file system.
             *
             * @param {Object} config
             * The object which contains the following config options:
             *
             * @param {Ext.device.filesystem.DirectoryEntry} config.parent This is required.
             * The directory to which to move the entry.
             *
             * @param {String} config.newName This is optional.
             * The new name of the entry to move. Defaults to the entry's current name if unspecified.
             *
             * @param {Function} config.success This is optional.
             * The callback to be called when the entry has been successfully moved.
             *
             * @param {Ext.device.filesystem.Entry} config.success.entry
             * The entry for the new location.
             *
             * @param {Function} config.failure This is optional.
             * The callback to be called when an error occurred.
             *
             * @param {Object} config.failure.error
             * The occurred error.
             *
             * @param {Object} config.scope
             * The scope object
             */
            moveTo: function(config) {
                if (config.parent == null) {
                    Ext.Logger.error('Ext.device.filesystem.Entry#moveTo: You must specify a new `parent` of the entry.');
                    return null;
                }
                var me = this;
                this.getEntry({
                    options: config.options || {},
                    success: function(sourceEntry) {
                        config.parent.getEntry({
                            options: config.options || {},
                            success: function(destinationEntry) {
                                if (config.copy) {
                                    sourceEntry.copyTo(destinationEntry, config.newName, function(entry) {
                                        config.success.call(config.scope || me, entry.isDirectory ? Ext.create('Ext.device.filesystem.DirectoryEntry', entry.fullPath, me.fileSystem) : Ext.create('Ext.device.filesystem.FileEntry', entry.fullPath, me.fileSystem));
                                    }, config.failure);
                                } else {
                                    sourceEntry.moveTo(destinationEntry, config.newName, function(entry) {
                                        config.success.call(config.scope || me, entry.isDirectory ? Ext.create('Ext.device.filesystem.DirectoryEntry', entry.fullPath, me.fileSystem) : Ext.create('Ext.device.filesystem.FileEntry', entry.fullPath, me.fileSystem));
                                    }, config.failure);
                                }
                            },
                            failure: config.failure
                        });
                    },
                    failure: config.failure
                });
            },
            /**
             * Works the same way as {@link Ext.device.filesystem.Entry#moveTo}, but copies the entry.
             */
            copyTo: function(config) {
                this.moveTo(Ext.apply(config, {
                    copy: true
                }));
            },
            /**
             * Removes the entry from the file system.
             *
             * @param {Object} config
             * The object which contains the following config options:
             *
             * @param {Boolean} config.recursively This is optional
             * Deletes a directory and all of its contents
             *
             * @param {Function} config.success This is optional.
             * The callback to be called when the entry has been successfully removed.
             *
             * @param {Function} config.failure This is optional.
             * The callback to be called when an error occurred.
             *
             * @param {Object} config.failure.error
             * The occurred error.
             *
             * @param {Object} config.scope
             * The scope object
             */
            remove: function(config) {
                this.getEntry({
                    success: function(entry) {
                        if (config.recursively && this.directory) {
                            entry.removeRecursively(config.success, config.failure);
                        } else {
                            entry.remove(config.success, config.failure);
                        }
                    },
                    failure: config.failure
                });
            },
            /**
             * Looks up the parent directory containing the entry.
             *
             * @param {Object} config
             * The object which contains the following config options:
             *
             * @param {Function} config.success This is required.
             * The callback to be called when the parent directory has been successfully selected.
             *
             * @param {Ext.device.filesystem.DirectoryEntry} config.success.entry
             * The parent directory of the entry.
             *
             * @param {Function} config.failure This is optional.
             * The callback to be called when an error occurred.
             *
             * @param {Object} config.failure.error
             * The occurred error.
             *
             * @param {Object} config.scope
             * The scope object
             */
            getParent: function(config) {
                if (!config.success) {
                    Ext.Logger.error('Ext.device.filesystem.Entry#getParent: You must specify a `success` callback.');
                    return null;
                }
                var me = this;
                this.getEntry({
                    options: config.options || {},
                    success: function(entry) {
                        entry.getParent(function(parentEntry) {
                            config.success.call(config.scope || me, parentEntry.isDirectory ? Ext.create('Ext.device.filesystem.DirectoryEntry', parentEntry.fullPath, me.fileSystem) : Ext.create('Ext.device.filesystem.FileEntry', parentEntry.fullPath, me.fileSystem));
                        }, config.failure);
                    },
                    failure: config.failure
                });
            }
        });
        /**
         * The DirectoryEntry class which is used to represent a directory on a file system.
         */
        Ext.define('Ext.device.filesystem.DirectoryEntry', {
            extend: 'Ext.device.filesystem.Entry',
            cachedDirectory: null,
            constructor: function(path, fileSystem) {
                this.callParent([
                    true,
                    path,
                    fileSystem
                ]);
            },
            /**
             * Requests a Directory from the Local File System
             *
             * @param {Object} config
             * 
             * @param {Object} config.options
             * File creation options {create:true, exclusive:false}
             *
             * @param {Boolean} config.options.create
             * Indicates if the directory should be created if it doesn't exist
             *
             * @param {Boolean} config.options.exclusive
             * Used with the create option only indicates whether a creation causes an error if the directory already exists
             *
             * @param {Function} config.success
             * The function called when the Directory is returned successfully
             *
             * @param {Ext.device.filesystem.DirectoryEntry} config.success.directory
             * DirectoryEntry Object
             *
             * @param {Function} config.failure
             * The function called when the Directory request causes an error
             *
             * @param {FileError} config.failure.error
             */
            getEntry: function(config) {
                var me = this;
                var callback = config.success;
                if ((config.options && config.options.create) && this.path) {
                    var folders = this.path.split("/");
                    if (folders[0] == '.' || folders[0] == '') {
                        folders = folders.slice(1);
                    }
                    var recursiveCreation = function(dirEntry) {
                            if (folders.length) {
                                dirEntry.getDirectory(folders.shift(), config.options, recursiveCreation, config.failure);
                            } else {
                                callback(dirEntry);
                            }
                        };
                    recursiveCreation(this.fileSystem.fs.root);
                } else {
                    this.fileSystem.fs.root.getDirectory(this.path, config.options, function(directory) {
                        config.success.call(config.scope || me, directory);
                    }, config.failure);
                }
            },
            /**
             * Lists all the entries in the directory.
             *
             * @param {Object} config
             * The object which contains the following config options:
             *
             * @param {Function} config.success This is required.
             * The callback to be called when the entries has been successfully read.
             *
             * @param {Ext.device.filesystem.Entry[]} config.success.entries
             * The array of entries of the directory.
             *
             * @param {Function} config.failure This is optional.
             * The callback to be called when an error occurred.
             *
             * @param {Object} config.failure.error
             * The occurred error.
             *
             * @param {Object} config.scope
             * The scope object
             */
            readEntries: function(config) {
                if (!config.success) {
                    Ext.Logger.error('Ext.device.filesystem.DirectoryEntry#readEntries: You must specify a `success` callback.');
                    return null;
                }
                var me = this;
                this.getEntry({
                    success: function(dirEntry) {
                        var directoryReader = dirEntry.createReader();
                        directoryReader.readEntries(function(entryInfos) {
                            var entries = [],
                                i = 0,
                                len = entryInfos.length;
                            for (; i < len; i++) {
                                entryInfo = entryInfos[i];
                                entries[i] = entryInfo.isDirectory ? Ext.create('Ext.device.filesystem.DirectoryEntry', entryInfo.fullPath, me.fileSystem) : Ext.create('Ext.device.filesystem.FileEntry', entryInfo.fullPath, me.fileSystem);
                            }
                            config.success.call(config.scope || this, entries);
                        }, function(error) {
                            if (config.failure) {
                                config.failure.call(config.scope || this, error);
                            }
                        });
                    },
                    failure: config.failure
                });
            },
            /**
             * Creates or looks up a file.
             *
             * @param {Object} config
             * The object which contains the following config options:
             *
             * @param {String} config.path This is required.
             * The absolute path or relative path from the entry to the file to create or select.
             *
             * @param {Object} config.options This is optional.
             * The object which contains the following options:
             *
             * @param {Boolean} config.options.create This is optional.
             * Indicates whether to create a file, if path does not exist.
             *
             * @param {Boolean} config.options.exclusive This is optional. Used with 'create', by itself has no effect.
             * Indicates that method should fail, if path already exists.
             *
             * @param {Function} config.success This is optional.
             * The callback to be called when the file has been successfully created or selected.
             *
             * @param {Ext.device.filesystem.Entry} config.success.entry
             * The created or selected file.
             *
             * @param {Function} config.failure This is optional.
             * The callback to be called when an error occurred.
             *
             * @param {Object} config.failure.error
             * The occurred error.
             *
             * @param {Object} config.scope
             * The scope object
             */
            getFile: function(config) {
                if (config.path == null) {
                    Ext.Logger.error('Ext.device.filesystem.DirectoryEntry#getFile: You must specify a `path` of the file.');
                    return null;
                }
                var me = this;
                var fullPath = this.path + config.path;
                var fileEntry = Ext.create('Ext.device.filesystem.FileEntry', fullPath, this.fileSystem);
                fileEntry.getEntry({
                    success: function() {
                        config.success.call(config.scope || me, fileEntry);
                    },
                    options: config.options || {},
                    failure: config.failure
                });
            },
            /**
             * Works the same way as {@link Ext.device.filesystem.DirectoryEntry#getFile},
             * but creates or looks up a directory.
             */
            getDirectory: function(config) {
                if (config.path == null) {
                    Ext.Logger.error('Ext.device.filesystem.DirectoryEntry#getFile: You must specify a `path` of the file.');
                    return null;
                }
                var me = this;
                var fullPath = this.path + config.path;
                var directoryEntry = Ext.create('Ext.device.filesystem.DirectoryEntry', fullPath, this.fileSystem);
                directoryEntry.getEntry({
                    success: function() {
                        config.success.call(config.scope || me, directoryEntry);
                    },
                    options: config.options || {},
                    failure: config.failure
                });
            },
            /**
             * Works the same way as {@link Ext.device.filesystem.Entry#remove},
             * but removes the directory and all of its contents, if any.
             */
            removeRecursively: function(config) {
                this.remove(Ext.apply(config, {
                    recursively: true
                }));
            }
        });
        /**
         * The FileEntry class which is used to represent a file on a file system.
         */
        Ext.define('Ext.device.filesystem.FileEntry', {
            extend: 'Ext.device.filesystem.Entry',
            length: 0,
            offset: 0,
            constructor: function(path, fileSystem) {
                this.callParent([
                    false,
                    path,
                    fileSystem
                ]);
                this.offset = 0;
                this.length = 0;
            },
            /**
             * Requests a File Handle from the Local File System
             *
             * @param {Object} config
             * 
             * @param {String} config.file
             * Filename optionally including path in string format '/tmp/debug.txt' or a File Object
             *
             * @param {Object} config.options
             * File creation options {create:true, exclusive:false}
             *
             * @param {Boolean} config.options.create
             * Indicates if the file should be created if it doesn't exist
             *
             * @param {Boolean} config.options.exclusive
             * Used with the create option only indicates whether a creation causes an error if the file already exists
             *
             * @param {Function} config.success
             * The function called when the filesystem is returned successfully
             *
             * @param {FileSystem} config.success.entry
             *
             * @param {Function} config.failure
             * The function called when the filesystem request causes and error
             *
             * @param {FileError} config.failure.error
             *
             */
            getEntry: function(config) {
                var me = this;
                var originalConfig = Ext.applyIf({}, config);
                if (this.fileSystem) {
                    var failure = function(evt) {
                            if ((config.options && config.options.create) && Ext.isString(this.path)) {
                                var folders = this.path.split("/");
                                if (folders[0] == '.' || folders[0] == '') {
                                    folders = folders.slice(1);
                                }
                                if (folders.length > 1 && !config.recursive === true) {
                                    folders.pop();
                                    var dirEntry = Ext.create('Ext.device.filesystem.DirectoryEntry', folders.join("/"), me.fileSystem);
                                    dirEntry.getEntry({
                                        options: config.options,
                                        success: function() {
                                            originalConfig.recursive = true;
                                            me.getEntry(originalConfig);
                                        },
                                        failure: config.failure
                                    });
                                } else {
                                    if (config.failure) {
                                        config.failure.call(config.scope || me, evt);
                                    }
                                }
                            } else {
                                if (config.failure) {
                                    config.failure.call(config.scope || me, evt);
                                }
                            }
                        };
                    this.fileSystem.fs.root.getFile(this.path, config.options || null, function(fileEntry) {
                        fileEntry.file(function(file) {
                            me.length = file.size;
                            originalConfig.success.call(config.scope || me, fileEntry);
                        }, function(error) {
                            failure.call(config.scope || me, error);
                        });
                    }, function(error) {
                        failure.call(config.scope || me, error);
                    });
                } else {
                    config.failure({
                        code: -1,
                        message: "FileSystem not Initialized"
                    });
                }
            },
            /**
             * Returns the byte offset into the file at which the next read/write will occur.
             *
             * @return {Number}
             * The file offset.
             */
            getOffset: function() {
                return this.offset;
            },
            /**
             * Sets the byte offset into the file at which the next read/write will occur.
             *
             * @param {Object} config
             * The object which contains the following config options:
             *
             * @param {Number} config.offset This is required.
             * The file offset to set. If negative, the offset back from the end of the file.
             *
             * @param {Function} config.success This is optional.
             * The callback to be called when the file offset has been successfully set.
             *
             * @param {Function} config.failure This is optional.
             * The callback to be called when an error occurred.
             *
             * @param {Object} config.failure.error
             * The occurred error.
             *
             * @param {Object} config.scope
             * The scope object
             */
            seek: function(config) {
                if (config.offset == null) {
                    Ext.Logger.error('Ext.device.filesystem.FileEntry#seek: You must specify an `offset` in the file.');
                    return null;
                }
                this.offset = config.offset || 0;
                if (config.success) {
                    config.success.call(config.scope || this);
                }
            },
            /**
             * Reads the data from the file starting at the file offset.
             *
             * @param {Object} config
             * The object which contains the following config options:
             *
             * @param {Number} config.length This is optional.
             * The length of bytes to read from the file. Defaults to the file's current size if unspecified.
             *
             * @param {String} config.encoding
             * Optional encoding type used only for reading as Text
             *
             * @param {String} config.type
             * Type of reading to use options are "text" (default), "dataURL", "binaryString" and "arrayBuffer"
             *
             * @param {Object} config.reader
             * Optional config params to be applied to a File Reader
             *
             * @param {Function} config.reader.onloadstart
             * @param {Function} config.reader.onloadprogress
             * @param {Function} config.reader.onload
             * @param {Function} config.reader.onabort
             * @param {Function} config.reader.onerror
             * @param {Function} config.reader.onloadend
             *
             * @param {Function} config.success This is optional.
             * The callback to be called when the data has been successfully read.
             *
             * @param {Object} config.success.data
             * The read data.
             *
             * @param {Function} config.failure This is optional.
             * The callback to be called when an error occurred.
             *
             * @param {Object} config.failure.error
             * The occurred error.
             *
             * @param {Object} config.scope
             * The scope object
             */
            read: function(config) {
                var me = this;
                this.getEntry({
                    success: function(fileEntry) {
                        fileEntry.file(function(file) {
                            if (Ext.isNumber(config.length)) {
                                if (Ext.isFunction(file.slice)) {
                                    file = file.slice(me.offset, config.length);
                                } else {
                                    if (config.failure) {
                                        config.failure.call(config.scope || me, {
                                            code: -2,
                                            message: "File missing slice functionality"
                                        });
                                    }
                                    return;
                                }
                            }
                            var reader = new FileReader();
                            reader.onloadend = function(evt) {
                                config.success.call(config.scope || me, evt.target.result);
                            };
                            reader.onerror = function(error) {
                                config.failure.call(config.scope || me, error);
                            };
                            if (config.reader) {
                                reader = Ext.applyIf(reader, config.reader);
                            }
                            config.encoding = config.encoding || "UTF8";
                            switch (config.type) {
                                default:
                                case "text":
                                    reader.readAsText(file, config.encoding);
                                    break;
                                case "dataURL":
                                    reader.readAsDataURL(file);
                                    break;
                                case "binaryString":
                                    reader.readAsBinaryString(file);
                                    break;
                                case "arrayBuffer":
                                    reader.readAsArrayBuffer(file);
                                    break;
                            }
                        }, function(error) {
                            config.failure.call(config.scope || me, error);
                        });
                    },
                    failure: function(error) {
                        config.failure.call(config.scope || me, error);
                    }
                });
            },
            /**
             * Writes the data to the file starting at the file offset.
             *
             * @param {Object} config
             * The object which contains the following config options:
             *
             * @param {Object} config.data This is required.
             * The data to write to the file.
             *
             * @param {Boolean} config.append This is optional.
             * Append to the end of the file
             *
             * @param {Object} config.writer
             * Optional config params to be applied to a File Reader
             *
             * @param {Function} config.writer.onwritestart
             * @param {Function} config.writer.onprogress
             * @param {Function} config.writer.onwrite
             * @param {Function} config.writer.onabort
             * @param {Function} config.writer.onerror
             * @param {Function} config.writer.onwriteend
             *
             * @param {Function} config.success This is optional.
             * The callback to be called when the data has been successfully written.
             *
             * @param {Function} config.failure This is optional.
             * The callback to be called when an error occurred.
             *
             * @param {Object} config.failure.error
             * The occurred error.
             *
             * @param {Object} config.scope
             * The scope object
             */
            write: function(config) {
                if (config.data == null) {
                    Ext.Logger.error('Ext.device.filesystem.FileEntry#write: You must specify `data` to write into the file.');
                    return null;
                }
                var me = this;
                this.getEntry({
                    options: config.options || {},
                    success: function(fileEntry) {
                        fileEntry.createWriter(function(writer) {
                            writer.onwriteend = function(evt) {
                                me.length = evt.target.length;
                                config.success.call(config.scope || me, evt.result);
                            };
                            writer.onerror = function(error) {
                                config.failure.call(config.scope || me, error);
                            };
                            if (config.writer) {
                                writer = Ext.applyIf(writer, config.writer);
                            }
                            if (me.offset) {
                                writer.seek(me.offset);
                            } else if (config.append) {
                                writer.seek(me.length);
                            }
                            me.writeData(writer, config.data);
                        }, function(error) {
                            config.failure.call(config.scope || me, error);
                        });
                    },
                    failure: function(error) {
                        config.failure.call(config.scope || me, error);
                    }
                });
            },
            writeData: function(writer, data) {
                writer.write(new Blob([
                    data
                ]));
            },
            /**
             * Truncates or extends the file to the specified size in bytes.
             * If the file is extended, the added bytes are null bytes.
             *
             * @param {Object} config
             * The object which contains the following config options:
             *
             * @param {Number} config.size This is required.
             * The new file size.
             *
             * @param {Function} config.success This is optional.
             * The callback to be called when the file size has been successfully changed.
             *
             * @param {Function} config.failure This is optional.
             * The callback to be called when an error occurred.
             *
             * @param {Object} config.failure.error
             * The occurred error.
             *
             * @param {Object} config.scope
             * The scope object
             */
            truncate: function(config) {
                if (config.size == null) {
                    Ext.Logger.error('Ext.device.filesystem.FileEntry#write: You must specify a `size` of the file.');
                    return null;
                }
                var me = this;
                //noinspection JSValidateTypes
                this.getEntry({
                    success: function(fileEntry) {
                        fileEntry.createWriter(function(writer) {
                            writer.truncate(config.size);
                            config.success.call(config.scope || me, me);
                        }, function(error) {
                            config.failure.call(config.scope || me, error);
                        });
                    },
                    failure: function(error) {
                        config.failure.call(config.scope || me, error);
                    }
                });
            }
        });
    });
});

/**
 * Cordova File APi Abstraction
 *
 * For more documentation see
 * http://docs.phonegap.com/en/2.7.0/cordova_file_file.md.html#File
 */
Ext.define('Ext.device.filesystem.Cordova', {
    alternateClassName: 'Ext.device.filesystem.PhoneGap',
    extend: 'Ext.device.filesystem.HTML5',
    constructor: function() {
        Ext.override(Ext.device.filesystem.Entry, {
            /**
                 *
                 * @param {Object} config
                 *
                 * @param {Object} config.metadata
                 * Metadata to add to the file or directory
                 *
                 * @param {Object} config.options
                 * File creation options {create:true, exclusive:false}
                 *
                 * @param {Boolean} config.options.create
                 * Indicates if the file should be created if it doesn't exist
                 *
                 * @param {Boolean} config.options.exclusive
                 * Used with the create option only indicates whether a creation causes an error if the file already exists
                 *
                 * @param {Function} config.success
                 * The function called when the File's Metadata is written successfully
                 *
                 * @param {Function} config.failure
                 * The function called when the File request causes an error
                 *
                 * @param {FileError} config.failure.error
                 *
                 */
            writeMetadata: function(config) {
                var me = this;
                this.getEntry({
                    options: config.options,
                    success: function(entry) {
                        entry.setMetadata(function() {
                            config.success.call(config.scope || me);
                        }, function(error) {
                            config.failure.call(config.scope || me, error);
                        }, config.metadata);
                    },
                    failure: function(error) {
                        config.failure.call(config.scope || me, error);
                    }
                });
            },
            /**
                 * 
                 * @param {Object} config
                 *
                 * @param {Object} config.options
                 * File creation options {create:true, exclusive:false}
                 *
                 * @param {Boolean} config.options.create
                 * Indicates if the file should be created if it doesn't exist
                 *
                 * @param {Boolean} config.options.exclusive
                 * Used with the create option only indicates whether a creation causes an error if the file already exists
                 *
                 * @param {Function} config.success
                 * The function called when the File's Metadata is written successfully
                 *
                 * @param {Function} config.failure
                 * The function called when the File request causes an error
                 *
                 * @param {FileError} config.failure.error
                 *
                 */
            readMetadata: function(config) {
                var me = this;
                this.getEntry({
                    options: config.options,
                    success: function(entry) {
                        entry.getMetadata(function(metadata) {
                            config.success.call(config.scope || me, metadata);
                        }, function(error) {
                            config.failure.call(config.scope || me, error);
                        });
                    },
                    failure: function(error) {
                        config.failure.call(config.scope || me, error);
                    }
                });
            }
        });
        Ext.override(Ext.device.filesystem.FileEntry, {
            writeData: function(writer, data) {
                writer.write(data.toString());
            },
            /**
             * Send a file to a server
             *
             * @param {Object} config
             * 
             * @param {String} config.url
             * URL of server to receive the file
             *
             * @param {Boolean} config.trustAllHosts
             * (Optional) If true it will accept all security certificates. Defaults to false
             *
             * @param {String} config.fileKey
             * Name of the form element. Defaults to "file"
             *
             * @param {String} config.fileName
             * Name of the file on the server
             *
             * @param {String} config.mimeType
             * mime type of the data being uploaded. defaults to "image/jpeg"
             *
             * @param {Object} config.params
             * (Optional) set of key/value pairs to be passed along with the request
             *
             * @param {Boolean} config.chunkMode
             * Should the data be uploaded in a chunked streaming mode. defaults to true
             *
             * @param {Object} config.headers
             * Map of header name => header values. Multiple values should be specified an array of values
             * var headers={'headerParam':'headerValue'};
             *
             * @param {Function} config.success
             * The function called when the File is uploaded successfully
             *
             * @param {Function} config.success.metadata
             *
             * @param {Function} config.failure
             * The function called when the File upload fails
             *
             * @param {FileError} config.failure.error
             *
             * @return {FileTransfer}
             */
            upload: function(config) {
                var options = new FileUploadOptions();
                options.fileKey = config.fileKey || "file";
                options.fileName = this.path.substr(this.path.lastIndexOf('/') + 1);
                options.mimeType = config.mimeType || "image/jpeg";
                options.params = config.params || {};
                options.headers = config.headers || {};
                options.chunkMode = config.chunkMode || true;
                var fileTransfer = new FileTransfer();
                fileTransfer.upload(this.path, encodeURI(config.url), config.success, config.failure, options, config.trustAllHosts || false);
                return fileTransfer;
            },
            /**
             * Downloads a file from the server saving it into the Local File System
             *
             * @param {Object} config
             *
             * @param {String} config.source
             * URL of file to download
             *
             * @param {Boolean} config.trustAllHosts
             * if true it will accept all security certificates. Defaults to false
             *
             * @param {Object} config.options
             * Header parameters (Auth, etc)
             * 
             *     {
             *         headers: {
             *             "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
             *         }
             *     }
             *
             * @param {Function} config.success
             * The function called when the File is downloaded successfully
             *
             * @param {Function} config.success.entry
             * File Entry object of the downloaded file
             *
             * @param {Function} config.failure
             * The function called when the File download fails
             *
             * @param {FileError} config.failure.error
             *
             * @return {FileTransfer}
             */
            download: function(config) {
                var fileTransfer = new FileTransfer();
                fileTransfer.download(encodeURI(config.source), this.path, config.success, config.failure, config.trustAllHosts || false, config.options || {});
                return fileTransfer;
            }
        });
    }
});

/**
 * @private
 */
Ext.define('Ext.device.filesystem.Chrome', {
    extend: 'Ext.device.filesystem.HTML5',
    /**
     * Requests access to the Local File System
     *
     *      var me = this;
     *      var fs = Ext.create("Ext.device.File", {});
     *      fs.requestFileSystem({
     *          type: window.PERSISTENT,
     *          size: 1024 * 1024,
     *          success: function(fileSystem) {
     *              me.fs = fileSystem;
     *          },
     *          failure: function(err) {
     *              console.log("FileSystem Failure: " + err.code);
     *          }
     *      });
     *
     *
     * @param {Object} config An object which contains the follow options
     * @param {Number} config.type
     * window.TEMPORARY (0) or window.PERSISTENT (1)
     *
     * @param {Number} config.size
     * Storage space, in Bytes, needed by the application
     *
     * @param {Function} config.success
     * The function called when the filesystem is returned successfully
     *
     * @param {FileSystem} config.success.fs
     *
     * @param {Function} config.failure
     * The function called when the filesystem request causes and error
     *
     * @param {FileError} config.failure.error
     *
     */
    requestFileSystem: function(config) {
        var me = this;
        config = Ext.device.filesystem.Abstract.prototype.requestFileSystem(config);
        var successCallback = function(fs) {
                var fileSystem = Ext.create('Ext.device.filesystem.FileSystem', fs);
                config.success.call(config.scope || me, fileSystem);
            };
        if (config.type == window.PERSISTENT) {
            if (navigator.webkitPersistentStorage) {
                navigator.webkitPersistentStorage.requestQuota(config.size, function(grantedBytes) {
                    window.webkitRequestFileSystem(config.type, grantedBytes, successCallback, config.failure);
                });
            } else {
                window.webkitStorageInfo.requestQuota(window.PERSISTENT, config.size, function(grantedBytes) {
                    window.webkitRequestFileSystem(config.type, grantedBytes, successCallback, config.failure);
                });
            }
        } else {
            window.webkitRequestFileSystem(config.type, config.size, successCallback, config.failure);
        }
    }
});

/**
 * @private
 */
Ext.define('Ext.device.filesystem.Simulator', {
    extend: 'Ext.device.filesystem.HTML5'
});

/**
 * Provides an API to navigate file system hierarchies.
 *
 * @mixins Ext.device.filesystem.Sencha
 */
Ext.define('Ext.device.FileSystem', {
    singleton: true,
    requires: [
        'Ext.device.Communicator',
        'Ext.device.filesystem.Cordova',
        'Ext.device.filesystem.Chrome',
        'Ext.device.filesystem.Simulator'
    ],
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView) {
            if (browserEnv.Cordova) {
                return Ext.create('Ext.device.filesystem.Cordova');
            }
        } else if (browserEnv.Chrome) {
            return Ext.create('Ext.device.filesystem.Chrome');
        }
        return Ext.create('Ext.device.filesystem.Simulator');
    }
});

/**
 * @private
 */
Ext.define('Ext.device.geolocation.Abstract', {
    config: {
        /**
         * @cfg {Number} maximumAge
         * This option indicates that the application is willing to accept cached location information whose age
         * is no greater than the specified time in milliseconds. If maximumAge is set to 0, an attempt to retrieve
         * new location information is made immediately.
         */
        maximumAge: 0,
        /**
         * @cfg {Number} frequency The default frequency to get the current position when using {@link Ext.device.Geolocation#watchPosition}.
         */
        frequency: 10000,
        /**
         * @cfg {Boolean} allowHighAccuracy True to allow high accuracy when getting the current position.
         */
        allowHighAccuracy: false,
        /**
         * @cfg {Number} timeout
         * The maximum number of milliseconds allowed to elapse between a location update operation.
         */
        timeout: Infinity
    },
    /**
     * Attempts to get the current position of this device.
     *
     *     Ext.device.Geolocation.getCurrentPosition({
     *         success: function(position) {
     *             console.log(position);
     *         },
     *         failure: function() {
     *             Ext.Msg.alert('Geolocation', 'Something went wrong!');
     *         }
     *     });
     *
     * *Note:* If you want to watch the current position, you could use {@link Ext.device.Geolocation#watchPosition} instead.
     *
     * @param {Object} config An object which contains the following config options:
     *
     * @param {Function} config.success
     * The function to call when the location of the current device has been received.
     *
     * @param {Object} config.success.position
     *
     * @param {Function} config.failure
     * The function that is called when something goes wrong.
     *
     * @param {Object} config.scope
     * The scope of the `success` and `failure` functions.
     *
     * @param {Number} config.maximumAge
     * The maximum age of a cached location. If you do not enter a value for this, the value of {@link #maximumAge}
     * will be used.
     *
     * @param {Number} config.timeout
     * The timeout for this request. If you do not specify a value, it will default to {@link #timeout}.
     *
     * @param {Boolean} config.allowHighAccuracy
     * True to enable allow accuracy detection of the location of the current device. If you do not specify a value, it will
     * default to {@link #allowHighAccuracy}.
     */
    getCurrentPosition: function(config) {
        var defaultConfig = Ext.device.geolocation.Abstract.prototype.config;
        config = Ext.applyIf(config, {
            maximumAge: defaultConfig.maximumAge,
            frequency: defaultConfig.frequency,
            allowHighAccuracy: defaultConfig.allowHighAccuracy,
            timeout: defaultConfig.timeout
        });
        // <debug>
        if (!config.success) {
            Ext.Logger.warn('You need to specify a `success` function for #getCurrentPosition');
        }
        // </debug>
        return config;
    },
    /**
     * Watches for the current position and calls the callback when successful depending on the specified {@link #frequency}.
     *
     *     Ext.device.Geolocation.watchPosition({
     *         callback: function(position) {
     *             console.log(position);
     *         },
     *         failure: function() {
     *             Ext.Msg.alert('Geolocation', 'Something went wrong!');
     *         }
     *     });
     *
     * @param {Object} config An object which contains the following config options:
     *
     * @param {Function} config.callback
     * The function to be called when the position has been updated.
     *
     * @param {Function} config.failure
     * The function that is called when something goes wrong.
     *
     * @param {Object} config.scope
     * The scope of the `success` and `failure` functions.
     *
     * @param {Boolean} config.frequency
     * The frequency in which to call the supplied callback. Defaults to {@link #frequency} if you do not specify a value.
     *
     * @param {Boolean} config.allowHighAccuracy
     * True to enable allow accuracy detection of the location of the current device. If you do not specify a value, it will
     * default to {@link #allowHighAccuracy}.
     */
    watchPosition: function(config) {
        var defaultConfig = Ext.device.geolocation.Abstract.prototype.config;
        config = Ext.applyIf(config, {
            maximumAge: defaultConfig.maximumAge,
            frequency: defaultConfig.frequency,
            allowHighAccuracy: defaultConfig.allowHighAccuracy,
            timeout: defaultConfig.timeout
        });
        // <debug>
        if (!config.callback) {
            Ext.Logger.warn('You need to specify a `callback` function for #watchPosition');
        }
        // </debug>
        return config;
    },
    /**
     * If you are currently watching for the current position, this will stop that task.
     */
    clearWatch: function() {}
});

/**
 * @private
 */
Ext.define('Ext.device.geolocation.Cordova', {
    alternateClassName: 'Ext.device.geolocation.PhoneGap',
    extend: 'Ext.device.geolocation.Abstract',
    activeWatchID: null,
    getCurrentPosition: function(config) {
        config = this.callParent(arguments);
        navigator.geolocation.getCurrentPosition(config.success, config.failure, config);
        return config;
    },
    watchPosition: function(config) {
        config = this.callParent(arguments);
        if (this.activeWatchID) {
            this.clearWatch();
        }
        this.activeWatchID = navigator.geolocation.watchPosition(config.callback, config.failure, config);
        return config;
    },
    clearWatch: function() {
        if (this.activeWatchID) {
            navigator.geolocation.clearWatch(this.activeWatchID);
            this.activeWatchID = null;
        }
    }
});

/**
 * @private
 */
Ext.define('Ext.device.geolocation.Simulator', {
    extend: 'Ext.device.geolocation.Abstract',
    requires: [
        'Ext.util.Geolocation'
    ],
    getCurrentPosition: function(config) {
        config = this.callParent([
            config
        ]);
        Ext.apply(config, {
            autoUpdate: false,
            listeners: {
                scope: this,
                locationupdate: function(geolocation) {
                    if (config.success) {
                        config.success.call(config.scope || this, geolocation.position);
                    }
                },
                locationerror: function() {
                    if (config.failure) {
                        config.failure.call(config.scope || this);
                    }
                }
            }
        });
        this.geolocation = Ext.create('Ext.util.Geolocation', config);
        this.geolocation.updateLocation();
        return config;
    },
    watchPosition: function(config) {
        config = this.callParent([
            config
        ]);
        Ext.apply(config, {
            listeners: {
                scope: this,
                locationupdate: function(geolocation) {
                    if (config.callback) {
                        config.callback.call(config.scope || this, geolocation.position);
                    }
                },
                locationerror: function() {
                    if (config.failure) {
                        config.failure.call(config.scope || this);
                    }
                }
            }
        });
        this.geolocation = Ext.create('Ext.util.Geolocation', config);
        return config;
    },
    clearWatch: function() {
        if (this.geolocation) {
            this.geolocation.destroy();
        }
        this.geolocation = null;
    }
});

/**
 * Provides access to the native Geolocation API when running on a device. There are three implementations of this API:
 *
 * - Sencha Packager
 * - [PhoneGap](http://docs.phonegap.com/en/1.4.1/phonegap_device_device.md.html)
 * - Browser
 *
 * This class will automatically select the correct implementation depending on the device your application is running on.
 *
 * ## Examples
 *
 * Getting the current location:
 *
 *     Ext.device.Geolocation.getCurrentPosition({
 *         success: function(position) {
 *             console.log(position.coords);
 *         },
 *         failure: function() {
 *             console.log('something went wrong!');
 *         }
 *     });
 *
 * Watching the current location:
 *
 *     Ext.device.Geolocation.watchPosition({
 *         frequency: 3000, // Update every 3 seconds
 *         callback: function(position) {
 *             console.log('Position updated!', position.coords);
 *         },
 *         failure: function() {
 *             console.log('something went wrong!');
 *         }
 *     });
 *
 * @mixins Ext.device.geolocation.Abstract
 */
Ext.define('Ext.device.Geolocation', {
    singleton: true,
    requires: [
        'Ext.device.Communicator',
        'Ext.device.geolocation.Cordova',
        'Ext.device.geolocation.Simulator'
    ],
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView) {
            if (browserEnv.Cordova) {
                return Ext.create('Ext.device.geolocation.Cordova');
            }
        }
        return Ext.create('Ext.device.geolocation.Simulator');
    }
});

/**
 * @private
 */
Ext.define('Ext.device.globalization.Abstract', {
    mixins: [
        'Ext.mixin.Observable'
    ],
    config: {
        formatLength: 'full',
        selector: 'date and time',
        dateType: 'wide',
        items: 'months',
        numberType: 'decimal',
        currencyCode: "USD"
    },
    getPreferredLanguage: function(config) {
        // <debug>
        if (!config.success) {
            Ext.Logger.warn('You need to specify a `success` function for #getPreferredLanguage');
        }
        // </debug>
        return config;
    },
    getLocaleName: function(config) {
        // <debug>
        if (!config.success) {
            Ext.Logger.warn('You need to specify a `success` function for #getLocaleName');
        }
        // </debug>
        return config;
    },
    dateToString: function(config) {
        var defaultConfig = Ext.device.globalization.Abstract.prototype.config;
        config = Ext.applyIf(config, {
            date: new Date(),
            formatLength: defaultConfig.formatLength,
            selector: defaultConfig.selector
        });
        // <debug>
        if (!config.success) {
            Ext.Logger.warn('You need to specify a `success` function for #dateToString');
        }
        // </debug>
        return config;
    },
    stringToDate: function(config) {
        var defaultConfig = Ext.device.globalization.Abstract.prototype.config;
        config = Ext.applyIf(config, {
            dateString: Ext.util.Format.date(new Date(), 'm/d/Y'),
            formatLength: defaultConfig.formatLength,
            selector: defaultConfig.selector
        });
        // <debug>
        if (!config.success) {
            Ext.Logger.warn('You need to specify a `success` function for #stringToDate');
        }
        // </debug>
        return config;
    },
    getDatePattern: function(config) {
        var defaultConfig = Ext.device.globalization.Abstract.prototype.config;
        config = Ext.applyIf(config, {
            formatLength: defaultConfig.formatLength,
            selector: defaultConfig.selector
        });
        // <debug>
        if (!config.success) {
            Ext.Logger.warn('You need to specify a `success` function for #getDatePattern');
        }
        // </debug>
        return config;
    },
    getDateNames: function(config) {
        var defaultConfig = Ext.device.globalization.Abstract.prototype.config;
        config = Ext.applyIf(config, {
            type: defaultConfig.dateType,
            items: defaultConfig.items
        });
        // <debug>
        if (!config.success) {
            Ext.Logger.warn('You need to specify a `success` function for #getDateNames');
        }
        // </debug>
        return config;
    },
    isDayLightSavingsTime: function(config) {
        config = Ext.applyIf(config, {
            date: new Date()
        });
        // <debug>
        if (!config.success) {
            Ext.Logger.warn('You need to specify a `success` function for #isDayLightSavingsTime');
        }
        // </debug>
        return config;
    },
    getFirstDayOfWeek: function(config) {
        // <debug>
        if (!config.success) {
            Ext.Logger.warn('You need to specify a `success` function for #getFirstDayOfWeek');
        }
        // </debug>
        return config;
    },
    numberToString: function(config) {
        var defaultConfig = Ext.device.globalization.Abstract.prototype.config;
        config = Ext.applyIf(config, {
            number: defaultConfig.number,
            type: defaultConfig.numberType
        });
        // <debug>
        if (!config.number) {
            Ext.Logger.warn('You need to specify a `number` for #numberToString');
        }
        if (!config.success) {
            Ext.Logger.warn('You need to specify a `success` function for #numberToString');
        }
        // </debug>
        return config;
    },
    stringToNumber: function(config) {
        var defaultConfig = Ext.device.globalization.Abstract.prototype.config;
        config = Ext.applyIf(config, {
            type: defaultConfig.numberType
        });
        // <debug>
        if (!config.number) {
            Ext.Logger.warn('You need to specify a `string` for #stringToNumber');
        }
        if (!config.success) {
            Ext.Logger.warn('You need to specify a `success` function for #stringToNumber');
        }
        // </debug>
        return config;
    },
    getNumberPattern: function(config) {
        var defaultConfig = Ext.device.globalization.Abstract.prototype.config;
        config = Ext.applyIf(config, {
            type: defaultConfig.numberType
        });
        if (!config.success) {
            Ext.Logger.warn('You need to specify a `success` function for #getNumberPattern');
        }
        // </debug>
        return config;
    },
    getCurrencyPattern: function(config) {
        var defaultConfig = Ext.device.globalization.Abstract.prototype.config;
        config = Ext.applyIf(config, {
            currencyCode: defaultConfig.currencyCode
        });
        if (!config.success) {
            Ext.Logger.warn('You need to specify a `success` function for #getCurrency');
        }
        // </debug>
        return config;
    }
});

/**
 * @private
 */
Ext.define('Ext.device.globalization.Cordova', {
    alternateClassName: 'Ext.device.globalization.PhoneGap',
    extend: 'Ext.device.globalization.Abstract',
    getPreferredLanguage: function(config) {
        config = this.callParent(arguments);
        navigator.globalization.getPreferredLanguage(config.success, config.error);
    },
    getLocaleName: function(config) {
        config = this.callParent(arguments);
        navigator.globalization.getLocaleName(config.success, config.error);
    },
    dateToString: function(config) {
        config = this.callParent(arguments);
        navigator.globalization.dateToString(config.date, config.success, config.error, config);
    },
    stringToDate: function(config) {
        config = this.callParent(arguments);
        navigator.globalization.stringToDate(config.dateString, config.success, config.error, config);
    },
    getDatePattern: function(config) {
        config = this.callParent(arguments);
        navigator.globalization.getDatePattern(config.success, config.error, config);
    },
    getDateNames: function(config) {
        config = this.callParent(arguments);
        navigator.globalization.getDateNames(config.success, config.error, config);
    },
    isDayLightSavingsTime: function(config) {
        config = this.callParent(arguments);
        navigator.globalization.isDayLightSavingsTime(config.date, config.success, config.error, config);
    },
    getFirstDayOfWeek: function(config) {
        config = this.callParent(arguments);
        navigator.globalization.getFirstDayOfWeek(config.success, config.error);
    },
    numberToString: function(config) {
        config = this.callParent(arguments);
        navigator.globalization.numberToString(config.number, config.success, config.error, config);
    },
    stringToNumber: function(config) {
        config = this.callParent(arguments);
        navigator.globalization.stringToNumber(config.string, config.success, config.error, config);
    },
    getNumberPattern: function(config) {
        config = this.callParent(arguments);
        navigator.globalization.getNumberPattern(config.success, config.error, config);
    },
    getCurrencyPattern: function(config) {
        config = this.callParent(arguments);
        navigator.globalization.getCurrencyPattern(config.currencyCode, config.success, config.error);
    }
});

/**
 * @private
 */
Ext.define('Ext.device.globalization.Simulator', {
    extend: 'Ext.device.globalization.Abstract'
});

/**
 * Provides access to the native Globalization API
 *
 * - [PhoneGap](http://docs.phonegap.com/en/2.6.0/cordova_globalization_globalization.md.html)
 *
 * Class currently only works with Cordova and does not have a simulated HTML counter part.
 * Please see notes on Cordova Docs for more information.
 *
 * http://docs.phonegap.com/en/2.6.0/cordova_globalization_globalization.md.html
 */
Ext.define('Ext.device.Globalization', {
    singleton: true,
    requires: [
        'Ext.device.globalization.Cordova',
        'Ext.device.globalization.Simulator'
    ],
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView) {
            if (browserEnv.Cordova) {
                return Ext.create('Ext.device.globalization.Cordova');
            }
        }
        return Ext.create('Ext.device.globalization.Simulator');
    }
});

/**
 * @private
 */
Ext.define('Ext.device.media.Abstract', {
    mixins: [
        'Ext.mixin.Observable'
    ],
    config: {
        src: null
    },
    play: Ext.emptyFn,
    pause: Ext.emptyFn,
    stop: Ext.emptyFn,
    release: Ext.emptyFn,
    seekTo: Ext.emptyFn,
    getCurrentPosition: Ext.emptyFn,
    getDuration: Ext.emptyFn,
    startRecord: Ext.emptyFn,
    stopRecord: Ext.emptyFn
});

/**
 * @private
 */
Ext.define('Ext.device.media.Cordova', {
    alternateClassName: 'Ext.device.media.PhoneGap',
    extend: 'Ext.device.media.Abstract',
    config: {
        /**
         * A URI containing the audio content. 
         * @type {String}
         */
        src: null,
        /**
         * @private
         */
        media: null
    },
    updateSrc: function(newSrc, oldSrc) {
        this.setMedia(new Media(newSrc));
    },
    play: function() {
        var media = this.getMedia();
        if (media) {
            media.play();
        }
    },
    pause: function() {
        var media = this.getMedia();
        if (media) {
            media.pause();
        }
    },
    stop: function() {
        var media = this.getMedia();
        if (media) {
            media.stop();
        }
    },
    release: function() {
        var media = this.getMedia();
        if (media) {
            media.release();
        }
    },
    seekTo: function(miliseconds) {
        var media = this.getMedia();
        if (media) {
            media.seekTo(miliseconds);
        }
    },
    getDuration: function() {
        var media = this.getMedia();
        if (media) {
            media.getDuration();
        }
    },
    startRecord: function() {
        var media = this.getMedia();
        if (!media) {
            this.setSrc(null);
        }
        media.startRecord();
    },
    stopRecord: function() {
        var media = this.getMedia();
        if (media) {
            media.stopRecord();
        }
    }
});

/**
 * @mixins Ext.device.media.Abstract
 */
Ext.define('Ext.device.Media', {
    singleton: true,
    requires: [
        'Ext.device.Communicator',
        'Ext.device.media.Cordova'
    ],
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView && browserEnv.Cordova) {
            return Ext.create('Ext.device.media.Cordova');
        }
        return Ext.create('Ext.device.media.Abstract');
    }
});

/**
 * @private
 */
Ext.define('Ext.device.notification.Abstract', {
    /**
     * A simple way to show a notification.
     *
     *     Ext.device.Notification.show({
     *        title: 'Verification',
     *        message: 'Is your email address is: test@sencha.com',
     *        buttons: Ext.MessageBox.OKCANCEL,
     *        callback: function(button) {
     *            if (button == "ok") {
     *                console.log('Verified');
     *            } else {
     *                console.log('Nope.');
     *            }
     *        }
     *     });
     *
     * @param {Object} config An object which contains the following config options:
     *
     * @param {String} config.title The title of the notification
     *
     * @param {String} config.message The message to be displayed on the notification
     *
     * @param {String/String[]} [config.buttons="OK"]
     * The buttons to be displayed on the notification. It can be a string, which is the title of the button, or an array of multiple strings.
     * Please not that you should not use more than 2 buttons, as they may not be displayed correct on all devices.
     *
     * @param {Function} config.callback
     * A callback function which is called when the notification is dismissed by clicking on the configured buttons.
     * @param {String} config.callback.buttonId The id of the button pressed, one of: 'ok', 'yes', 'no', 'cancel'.
     *
     * @param {Object} config.scope The scope of the callback function
     */
    show: function(config) {
        if (!config.message) {
            throw ('[Ext.device.Notification#show] You passed no message');
        }
        if (!config.buttons) {
            config.buttons = [
                "OK",
                "Cancel"
            ];
        }
        if (!Ext.isArray(config.buttons)) {
            config.buttons = [
                config.buttons
            ];
        }
        if (!config.scope) {
            config.scope = this;
        }
        return config;
    },
    alert: function(config) {
        if (!config.message) {
            throw ('[Ext.device.Notification#alert] You passed no message');
        }
        if (!config.scope) {
            config.scope = this;
        }
        return config;
    },
    confirm: function(config) {
        if (!config.message) {
            throw ('[Ext.device.Notification#confirm] You passed no message');
        }
        if (!config.buttons) {
            config.buttons = [
                "OK",
                "Cancel"
            ];
        }
        if (!Ext.isArray(config.buttons)) {
            config.buttons = [
                config.buttons
            ];
        }
        if (!config.scope) {
            config.scope = this;
        }
        return config;
    },
    prompt: function(config) {
        if (!config.message) {
            throw ('[Ext.device.Notification#prompt] You passed no message');
        }
        if (!config.buttons) {
            config.buttons = [
                "OK",
                "Cancel"
            ];
        }
        if (!Ext.isArray(config.buttons)) {
            config.buttons = [
                config.buttons
            ];
        }
        if (!config.scope) {
            config.scope = this;
        }
        return config;
    },
    /**
     * Vibrates the device.
     */
    vibrate: Ext.emptyFn,
    beep: Ext.emptyFn
});

/**
 * @private
 */
Ext.define('Ext.device.notification.Cordova', {
    alternateClassName: 'Ext.device.notification.PhoneGap',
    extend: 'Ext.device.notification.Abstract',
    requires: [
        'Ext.device.Communicator'
    ],
    show: function(config) {
        config = this.callParent(arguments);
        this.confirm(config);
    },
    confirm: function(config) {
        config = this.callParent(arguments);
        var buttons = config.buttons,
            ln = config.buttons.length;
        if (ln && typeof buttons[0] != "string") {
            var newButtons = [],
                i;
            for (i = 0; i < ln; i++) {
                newButtons.push(buttons[i].text);
            }
            buttons = newButtons;
        }
        var callback = function(index) {
                if (config.callback) {
                    config.callback.apply(config.scope, (buttons) ? [
                        buttons[index - 1].toLowerCase()
                    ] : []);
                }
            };
        navigator.notification.confirm(config.message, callback, config.title, buttons);
    },
    alert: function(config) {
        navigator.notification.alert(config.message, config.callback, config.title, config.buttonName);
    },
    prompt: function(config) {
        config = this.callParent(arguments);
        var buttons = config.buttons,
            ln = config.buttons.length;
        if (ln && typeof buttons[0] != "string") {
            var newButtons = [],
                i;
            for (i = 0; i < ln; i++) {
                newButtons.push(buttons[i].text);
            }
            buttons = newButtons;
        }
        var callback = function(result) {
                if (config.callback) {
                    config.callback.call(config.scope, (buttons) ? buttons[result.buttonIndex - 1].toLowerCase() : null, result.input1);
                }
            };
        navigator.notification.prompt(config.message, callback, config.title, buttons);
    },
    vibrate: function(time) {
        navigator.notification.vibrate(time);
    },
    beep: function(times) {
        navigator.notification.vibrate(times);
    }
});

/**
 * @private
 */
Ext.define('Ext.device.notification.Simulator', {
    extend: 'Ext.device.notification.Abstract',
    requires: [
        'Ext.MessageBox',
        'Ext.util.Audio'
    ],
    /**
     * @private
     */
    msg: null,
    show: function() {
        var config = this.callParent(arguments),
            buttons = [],
            ln = config.buttons.length,
            button, i, callback;
        //buttons
        for (i = 0; i < ln; i++) {
            button = config.buttons[i];
            if (Ext.isString(button)) {
                button = {
                    text: config.buttons[i],
                    itemId: config.buttons[i].toLowerCase()
                };
            }
            buttons.push(button);
        }
        this.msg = Ext.create('Ext.MessageBox');
        callback = function(itemId) {
            if (config.callback) {
                config.callback.apply(config.scope, [
                    itemId
                ]);
            }
        };
        this.msg.show({
            title: config.title,
            message: config.message,
            scope: this.msg,
            buttons: buttons,
            fn: callback
        });
    },
    alert: function() {
        var config = this.callParent(arguments);
        if (config.buttonName) {
            config.buttons = [
                config.buttonName
            ];
        }
        this.show(config);
    },
    confirm: function() {
        var config = this.callParent(arguments);
        this.show(config);
    },
    prompt: function() {
        var config = this.callParent(arguments),
            buttons = [],
            ln = config.buttons.length,
            button, i, callback;
        //buttons
        for (i = 0; i < ln; i++) {
            button = config.buttons[i];
            if (Ext.isString(button)) {
                button = {
                    text: config.buttons[i],
                    itemId: config.buttons[i].toLowerCase()
                };
            }
            buttons.push(button);
        }
        this.msg = Ext.create('Ext.MessageBox');
        callback = function(buttonText, value) {
            if (config.callback) {
                config.callback.apply(config.scope, [
                    buttonText,
                    value
                ]);
            }
        };
        this.msg.prompt(config.title, config.message, callback, this.msg, config.multiLine, config.value, config.prompt);
    },
    beep: function(times) {
        if (!Ext.isNumber(times))  {
            times = 1;
        }
        
        var count = 0;
        var callback = function() {
                if (count < times) {
                    Ext.defer(function() {
                        Ext.util.Audio.beep(callback);
                    }, 50);
                }
                count++;
            };
        callback();
    },
    vibrate: function() {
        //nice animation to fake vibration
        var animation = [
                "@-webkit-keyframes vibrate{",
                "    from {",
                "        -webkit-transform: rotate(-2deg);",
                "    }",
                "    to{",
                "        -webkit-transform: rotate(2deg);",
                "    }",
                "}",
                "body {",
                "    -webkit-animation: vibrate 50ms linear 10 alternate;",
                "}"
            ];
        var head = document.getElementsByTagName("head")[0];
        var cssNode = document.createElement('style');
        cssNode.innerHTML = animation.join('\n');
        head.appendChild(cssNode);
        Ext.defer(function() {
            head.removeChild(cssNode);
        }, 400);
    }
});

/**
 * Provides a cross device way to show notifications. There are three different implementations:
 *
 * - Sencha Packager
 * - Cordova
 * - Simulator
 *
 * When this singleton is instantiated, it will automatically use the correct implementation depending on the current device.
 *
 * Both the Sencha Packager and Cordova versions will use the native implementations to display the notification. The
 * Simulator implementation will use {@link Ext.MessageBox} for {@link #show} and a simply animation when you call {@link #vibrate}.
 *
 * ## Examples
 *
 * To show a simple notification:
 *
 *     Ext.device.Notification.show({
 *         title: 'Verification',
 *         message: 'Is your email address: test@sencha.com',
 *         buttons: Ext.MessageBox.OKCANCEL,
 *         callback: function(button) {
 *             if (button === "ok") {
 *                 console.log('Verified');
 *             } else {
 *                 console.log('Nope');
 *             }
 *         }
 *     });
 *
 * To make the device vibrate:
 *
 *     Ext.device.Notification.vibrate();
 *
 * @mixins Ext.device.notification.Abstract
 */
Ext.define('Ext.device.Notification', {
    singleton: true,
    requires: [
        'Ext.device.Communicator',
        'Ext.device.notification.Cordova',
        'Ext.device.notification.Simulator'
    ],
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView) {
            if (browserEnv.Cordova) {
                return Ext.create('Ext.device.notification.Cordova');
            }
        }
        return Ext.create('Ext.device.notification.Simulator');
    }
});

/**
 * @private
 */
Ext.define('Ext.device.orientation.Abstract', {
    mixins: [
        'Ext.mixin.Observable'
    ],
    /**
     * @event orientationchange
     * Fires when the orientation has been changed on this device.
     *
     *     Ext.device.Orientation.on({
     *         scope: this,
     *         orientationchange: function(e) {
     *             console.log('Alpha: ', e.alpha);
     *             console.log('Beta: ', e.beta);
     *             console.log('Gamma: ', e.gamma);
     *         }
     *     });
     *
     * @param {Object} event The event object
     * @param {Object} event.alpha The alpha value of the orientation event
     * @param {Object} event.beta The beta value of the orientation event
     * @param {Object} event.gamma The gamma value of the orientation event
     */
    onDeviceOrientation: function(e) {
        this.doFireEvent('orientationchange', [
            e
        ]);
    }
});

/**
 * Provides the HTML5 implementation for the orientation API.
 * @private
 */
Ext.define('Ext.device.orientation.HTML5', {
    extend: 'Ext.device.orientation.Abstract',
    constructor: function() {
        this.callParent(arguments);
        this.onDeviceOrientation = Ext.Function.bind(this.onDeviceOrientation, this);
        window.addEventListener('deviceorientation', this.onDeviceOrientation, true);
    }
});

/**
 * This class provides you with a cross platform way of listening to when the the orientation changes on the
 * device your application is running on.
 *
 * The {@link Ext.device.Orientation#orientationchange orientationchange} event gets passes the `alpha`, `beta` and
 * `gamma` values. ** These properties only exist when packaging with the Sencha Native Packager. **
 *
 * You can find more information about these values and how to use them on the [W3C device orientation specification](http://dev.w3.org/geo/api/spec-source-orientation.html#deviceorientation).
 *
 * ## Example
 *
 * To listen to the device orientation, you can do the following:
 *
*     Ext.device.Orientation.on({
*         scope: this,
*         orientationchange: function(e) {
*             console.log('Alpha: ', e.alpha);
*             console.log('Beta: ', e.beta);
*             console.log('Gamma: ', e.gamma);
*         }
*     });
 *
 * @mixins Ext.device.orientation.Abstract
 */
Ext.define('Ext.device.Orientation', {
    singleton: true,
    requires: [
        'Ext.device.Communicator',
        'Ext.device.orientation.HTML5'
    ],
    constructor: function() {
        return Ext.create('Ext.device.orientation.HTML5');
    }
});

/**
 * @private
 */
Ext.define('Ext.device.push.Abstract', {
    /**
     * @property
     * Notification type: alert.
     */
    ALERT: 1,
    /**
     * @property
     * Notification type: badge.
     */
    BADGE: 2,
    /**
     * @property
     * Notification type: sound.
     */
    SOUND: 4,
    /**
     * @method getInitialConfig
     * @hide
     */
    /**
     * Registers a push notification.
     *
     *     Ext.device.Push.register({
     *         type: Ext.device.Push.ALERT|Ext.device.Push.BADGE|Ext.device.Push.SOUND,
     *         success: function(token) {
     *             console.log('# Push notification registration successful:');
     *             console.log('    token: ' + token);
     *         },
     *         failure: function(error) {
     *             console.log('# Push notification registration unsuccessful:');
     *             console.log('     error: ' + error);
     *         },
     *         received: function(notifications) {
     *             console.log('# Push notification received:');
     *             console.log('    ' + JSON.stringify(notifications));
     *         }
     *     });
     *
     * @param {Object} config
     * The configuration for to pass when registering this push notification service.
     *
     * @param {Number} config.type
     * The type(s) of notifications to enable. Available options are:
     *
     *   - {@link Ext.device.Push#ALERT}
     *   - {@link Ext.device.Push#BADGE}
     *   - {@link Ext.device.Push#SOUND}
     *
     * **Usage**
     *
     * Enable alerts and badges:
     *
     *     Ext.device.Push.register({
     *         type: Ext.device.Push.ALERT|Ext.device.Push.BADGE
     *         // ...
     *     });
     *
     * Enable alerts, badges and sounds:
     *
     *     Ext.device.Push.register({
     *         type: Ext.device.Push.ALERT|Ext.device.Push.BADGE|Ext.device.Push.SOUND
     *         // ...
     *     });
     *
     * Enable only sounds:
     *
     *     Ext.device.Push.register({
     *         type: Ext.device.Push.SOUND
     *         // ...
     *     });
     *
     * @param {Function} config.success
     * The callback to be called when registration is complete.
     *
     * @param {String} config.success.token
     * A unique token for this push notification service.
     *
     * @param {Function} config.failure
     * The callback to be called when registration fails.
     *
     * @param {String} config.failure.error
     * The error message.
     *
     * @param {Function} config.received
     * The callback to be called when a push notification is received on this device.
     *
     * @param {Object} config.received.notifications
     * The notifications that have been received.
     */
    register: function(config) {
        var me = this;
        if (!config.received) {
            Ext.Logger.error('Failed to pass a received callback. This is required.');
        }
        if (config.type == null) {
            Ext.Logger.error('Failed to pass a type. This is required.');
        }
        return {
            success: function(token) {
                me.onSuccess(token, config.success, config.scope || me);
            },
            failure: function(error) {
                me.onFailure(error, config.failure, config.scope || me);
            },
            received: function(notifications) {
                me.onReceived(notifications, config.received, config.scope || me);
            },
            type: config.type
        };
    },
    onSuccess: function(token, callback, scope) {
        if (callback) {
            callback.call(scope, token);
        }
    },
    onFailure: function(error, callback, scope) {
        if (callback) {
            callback.call(scope, error);
        }
    },
    onReceived: function(notifications, callback, scope) {
        if (callback) {
            callback.call(scope, notifications);
        }
    }
});

/**
 * @private
 * Interfaces with Cordova PushPlugin: https://github.com/phonegap-build/PushPlugin
 */
Ext.define('Ext.device.push.Cordova', {
    extend: 'Ext.device.push.Abstract',
    statics: {
        /**
         * @private
         * A collection of callback methods that can be globally called by the Cordova PushPlugin
         */
        callbacks: {}
    },
    setPushConfig: function(config) {
        var methodName = Ext.id(null, 'callback');
        //Cordova's PushPlugin needs a static method to call when notifications are received
        Ext.device.push.Cordova.callbacks[methodName] = config.callbacks.received;
        return {
            "badge": (config.callbacks.type === Ext.device.Push.BADGE) ? "true" : "false",
            "sound": (config.callbacks.type === Ext.device.Push.SOUND) ? "true" : "false",
            "alert": (config.callbacks.type === Ext.device.Push.ALERT) ? "true" : "false",
            "ecb": 'Ext.device.push.Cordova.callbacks.' + methodName,
            "senderID": config.senderID
        };
    },
    register: function() {
        var config = arguments[0];
        config.callbacks = this.callParent(arguments);
        var pushConfig = this.setPushConfig(config),
            plugin = window.plugins.pushNotification;
        plugin.register(config.callbacks.success, config.callbacks.failure, pushConfig);
    }
});

/**
 * Provides a way to send push notifications to a device.
 *
 * # Example
 *
 *     Ext.device.Push.register({
 *         type: Ext.device.Push.ALERT|Ext.device.Push.BADGE|Ext.device.Push.SOUND,
 *         success: function(token) {
 *             console.log('# Push notification registration successful:');
 *             console.log('    token: ' + token);
 *         },
 *         failure: function(error) {
 *             console.log('# Push notification registration unsuccessful:');
 *             console.log('     error: ' + error);
 *         },
 *         received: function(notifications) {
 *             console.log('# Push notification received:');
 *             console.log('    ' + JSON.stringify(notifications));
 *         }
 *     });
 *
 *
 * ## Sencha Cmd
 *
 * Currently only available on iOS for apps packaged with Sencha Cmd.
 *
 * ## Cordova / PhoneGap
 *
 * For apps packaged with Cordova or PhoneGap, Ext.device.Push currently supports iOS and
 * Android via the [PushPlugin](https://github.com/phonegap-build/PushPlugin).
 *
 * Be sure to include that plugin in your project; Ext.device.Push simply normalizes the
 * interface for using notifications in your application.
 *
 * @mixins Ext.device.push.Abstract
 */
Ext.define('Ext.device.Push', {
    singleton: true,
    requires: [
        'Ext.device.Communicator',
        'Ext.device.push.Cordova'
    ],
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView) {
            if (browserEnv.Cordova) {
                return Ext.create('Ext.device.push.Cordova');
            }
        }
        return Ext.create('Ext.device.push.Abstract');
    }
});

/**
 * @private
 */
Ext.define('Ext.device.splashscreen.Abstract', {
    show: Ext.emptyFn,
    hide: Ext.emptyFn
});

/**
 * @private
 */
Ext.define('Ext.device.splashscreen.Cordova', {
    alternateClassName: 'Ext.device.splashscreen.PhoneGap',
    extend: 'Ext.device.splashscreen.Abstract',
    show: function() {
        navigator.splashscreen.show();
    },
    hide: function() {
        navigator.splashscreen.hide();
    }
});

/**
 * @private
 */
Ext.define('Ext.device.splashscreen.Simulator', {
    extend: 'Ext.device.splashscreen.Abstract'
});

/**
 * Provides access to the native Splashscreen API
 *
 * - [PhoneGap](http://docs.phonegap.com/en/2.6.0/cordova_splashscreen_splashscreen.md.html#Splashscreen)
 *
 * Class currently only works with Cordova and does not have a simulated HTML counter part.
 * Please see notes on Cordova Docs for proper Native project code changes that
 * will need to be made to use this plugin.
 *
 * http://docs.phonegap.com/en/2.6.0/cordova_splashscreen_splashscreen.md.html#Splashscreen
 */
Ext.define('Ext.device.Splashscreen', {
    singleton: true,
    requires: [
        'Ext.device.splashscreen.Cordova',
        'Ext.device.splashscreen.Simulator'
    ],
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView) {
            if (browserEnv.Cordova) {
                return Ext.create('Ext.device.splashscreen.Cordova');
            }
        }
        return Ext.create('Ext.device.splashscreen.Simulator');
    }
});

/**
 * @private
 */
Ext.define('Ext.device.storage.Abstract', {
    config: {
        databaseName: "Sencha",
        databaseVersion: '1.0',
        databaseDisplayName: 'Sencha Database',
        databaseSize: 5 * 1024 * 1024
    },
    openDatabase: function(config) {
        var defaultConfig = Ext.device.storage.Abstract.prototype.config;
        config = Ext.applyIf(config, {
            name: defaultConfig.databaseName,
            version: defaultConfig.databaseVersion,
            displayName: defaultConfig.databaseDisplayName,
            size: defaultConfig.databaseSize
        });
        return config;
    },
    numKeys: Ext.emptyFn,
    getKey: Ext.emptyFn,
    getItem: Ext.emptyFn,
    setItem: Ext.emptyFn,
    removeItem: Ext.emptyFn,
    clear: Ext.emptyFn
});

/**
 * @private
 */
Ext.define("Ext.device.storage.HTML5.SQLStatement", {
    extend: 'Ext.Base',
    sql: null,
    "arguments": null,
    success: Ext.emptyFn,
    failure: Ext.emptyFn,
    constructor: function(config) {
        this.sql = config.sql;
        this.arguments = config.arguments;
        this.success = config.success;
        this.failure = config.failure;
    }
});

/**
 * @private
 */
Ext.define('Ext.device.storage.HTML5.Database', {
    requires: [
        "Ext.device.storage.HTML5.SQLStatement"
    ],
    db: null,
    constructor: function(config) {
        this.db = window.openDatabase(config.name, config.version, config.displayName, config.size);
    },
    getVersion: function() {
        if (this.db) {
            return this.db.version;
        }
        // <debug>
        Ext.Logger.warn('Database has not been opened before calling function #getVersion');
        // </debug>
        return null;
    },
    /**
     * @param {String/String[]/Object/Object[]/SQLStatement/SQLStatement[]} sql SQL Command to run with optional arguments and callbacks
     * @param {Function} success callback for successful transaction
     * @param {Function} failure callback for failed transaction
     */
    transaction: function(sql, success, failure) {
        if (!this.db) {
            // <debug>
            Ext.Logger.warn('Database has not been opened before calling function #transaction');
            // </debug>
            return;
        }
        if (!Ext.isArray(sql)) {
            sql = [
                sql
            ];
        }
        var txFn = function(tx) {
                Ext.each(sql, function(sqlStatement) {
                    if (Ext.isString(sqlStatement)) {
                        tx.executeSql(sqlStatement);
                    } else if (Ext.isObject(sqlStatement)) {
                        tx.executeSql(sqlStatement.sql, sqlStatement.arguments, sqlStatement.success, sqlStatement.failure);
                    }
                });
            };
        this.db.transaction(txFn, failure, success);
    }
});

/**
 * @private
 */
Ext.define('Ext.device.storage.HTML5.HTML5', {
    extend: 'Ext.device.storage.Abstract',
    requires: [
        'Ext.device.storage.HTML5.Database'
    ],
    dbCache: {},
    openDatabase: function(config) {
        config = this.callParent(arguments);
        if (!this.dbCache[config.name] || config.noCache) {
            this.dbCache[config.name] = Ext.create('Ext.device.storage.HTML5.Database', config);
        }
        return this.dbCache[config.name];
    },
    numKeys: function() {
        return window.localStorage.length;
    },
    getKey: function(index) {
        return window.localStorage.key(index);
    },
    getItem: function(key) {
        return window.localStorage.getItem(key);
    },
    setItem: function(key, value) {
        return window.localStorage.setItem(key, value);
    },
    removeItem: function(key) {
        return window.localStorage.removeItem(key);
    },
    clear: function() {
        return window.localStorage.clear();
    }
});

/**
 * @private
 */
Ext.define('Ext.device.storage.Cordova', {
    alternateClassName: 'Ext.device.storage.PhoneGap',
    extend: 'Ext.device.storage.HTML5.HTML5'
});

/**
 * @private
 */
Ext.define('Ext.device.storage.Simulator', {
    extend: 'Ext.device.storage.HTML5.HTML5'
});

/**
 *
 */
Ext.define('Ext.device.Storage', {
    singleton: true,
    requires: [
        'Ext.device.storage.Cordova',
        'Ext.device.storage.Simulator'
    ],
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView) {
            if (browserEnv.Cordova) {
                return Ext.create('Ext.device.storage.Cordova');
            }
        }
        return Ext.create('Ext.device.storage.Simulator');
    }
});

/**
 * @private
 */
Ext.define('Ext.device.twitter.Abstract', {
    /**
	 * Pops up a Twitter compose sheet view with your specified tweet.
	 * 
	 * @param {Object} config An object which contains the following config options:
	 *
	 * @param {String} config.tweet The default tweet text to add to the compose window.
	 * 
	 * @param {String} config.url An optional URL to attatch to the Tweet.
	 * 
	 * @param {String} config.image An optional image URL to attatch to the Tweet.
	 * 
	 * @param {Function} config.success The callback when the Tweet is successfully posted.
	 * 
	 * @param {Function} config.failure The callback when the Tweet is unsuccessfully posted.
	 */
    compose: Ext.emptyFn,
    /**
     * Gets Tweets from Twitter Timeline
	 * 
	 * @param {Object} config An object which contains the following config options:
	 * 
	 * @param {Function} config.success callback
	 * @param {Object[]} config.success.response Tweet objects, see [Twitter Timeline Doc]
	 * 
	 * @param {Function} config.failure callback
     * @param {String} config.failure.error reason for failure
	 *
	 * [Twitter Timeline Doc]: https://dev.twitter.com/docs/api/1/get/statuses/public_timeline
     */
    getPublicTimeline: Ext.emptyFn,
    /**
     * Gets Tweets from Twitter Mentions
	 * 
	 * @param {Object} config An object which contains the following config options:
	 * 
	 * @param {Function} config.success callback
	 * @param {Object[]} config.success.response Tweet objects, see [Twitter Mentions Doc]
	 * 
	 * @param {Function} config.failure callback
     * @param {String} config.failure.error reason for failure
	 *
	 * [Twitter Timeline Doc]: https://dev.twitter.com/docs/api/1/get/statuses/public_timeline
     */
    getMentions: Ext.emptyFn,
    /**
     * Gets a specific Twitter user info
	 * 
	 * @param {Object} config An object which contains the following config options:
	 * 
	 * @param {Function} config.success callback
	 * @param {Object[]} config.success.response The JSON response form twitter
	 * 
	 * @param {Function} config.failure callback
     * @param {String} config.failure.error reason for failure
     */
    getTwitterUsername: Ext.emptyFn,
    /**
     * Gets a specific Twitter user info
	 * 
	 * @param {Object} config An object which contains the following config options:
	 *
	 * @param {String} config.url of [Twitter API Endpoint]
	 *
	 * @param {Object} config.params key-value map, matching [Twitter API Endpoint]
	 *
	 * @param {Object} config.options (optional) other options for the HTTP request
 	 * @param {String} config.options.requestMethod HTTP Request type, ex: "POST"
	 * 
	 * @param {Function} config.success callback
	 * @param {Object[]} config.success.response objects returned from Twitter API (Tweets, Users,...)
	 * 
	 * @param {Function} config.failure callback
     * @param {String} config.failure.error reason for failure
     *
     * [Twitter API Endpoint]: https://dev.twitter.com/docs/api
     */
    getTwitterRequest: Ext.emptyFn
});

/**
 * @private
 */
Ext.define('Ext.device.twitter.Cordova', {
    compose: function(config) {
        window.plugins.twitter.composeTweet(config.success, config.failure, config.tweet, {
            urlAttach: config.url,
            imageAttach: config.image
        });
    },
    getPublicTimeline: function(config) {
        window.plugins.twitter.getPublicTimeline(config.success, config.failure);
    },
    getMentions: function(config) {
        window.plugins.twitter.getMentions(config.success, config.failure);
    },
    getTwitterUsername: function(config) {
        window.plugins.twitter.getTwitterUsername(config.success, config.failure);
    },
    getTwitterRequest: function(config) {
        window.plugins.twitter.getTWRequest(config.url, config.params, config.success, config.failure, config.options);
    }
});

/**
 * Allows you to interact with the Twitter API on iOS devices from within your Cordova application.
 *
 * For setup information, please read the [plugin guide](https://github.com/phonegap/phonegap-plugins/tree/master/iOS/Twitter).
 * 
 * @mixins Ext.device.twitter.Abstract
 */
Ext.define('Ext.device.Twitter', {
    alternateClassName: 'Ext.ux.device.Twitter',
    singleton: true,
    requires: [
        'Ext.device.Communicator',
        'Ext.device.twitter.*'
    ],
    constructor: function() {
        var browserEnv = Ext.browser.is;
        if (browserEnv.WebView && browserEnv.Cordova) {
            return Ext.create('Ext.device.twitter.Cordova');
        } else {
            return Ext.create('Ext.device.twitter.Abstract');
        }
    }
});

/**
 * @private
 */
Ext.define('Ext.device.browser.Window', {
    extend: 'Ext.Evented',
    open: function(config) {
        var me = this;
        this._window = window.open(config.url, config.showToolbar ? '_blank' : '_self', config.options || null);
        // Add events
        this._window.addEventListener('loadstart', function() {
            me.fireEvent('loadstart', me);
        });
        this._window.addEventListener('loadstop', function() {
            me.fireEvent('loadstop', me);
        });
        this._window.addEventListener('loaderror', function() {
            me.fireEvent('loaderror', me);
        });
        this._window.addEventListener('exit', function() {
            me.fireEvent('close', me);
        });
    },
    close: function() {
        if (!this._window) {
            return;
        }
        this._window.close();
    }
});

