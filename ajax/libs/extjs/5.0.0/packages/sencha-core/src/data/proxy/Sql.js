/**
 * SQL proxy lets you store data in a SQL database.
 * The Sencha Touch SQL proxy outputs model data into an HTML5
 * local database using WebSQL.
 *
 * You can create a Store for the proxy, for example:
 *
 *    Ext.require(["Ext.data.proxy.SQL"]);
 *
 *    Ext.define("User", {
 *       extend: "Ext.data.Model",
 *       config: {
 *          fields: [ "firstName", "lastName" ]
 *       }
 *     });
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
 *    Ext.getStore("Users").getModel().getProxy().dropTable();
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
        database: 'Sencha',

        columns: '',

        uniqueIdStrategy: false,

        tableExists: false,

        defaultDateFormat: 'Y-m-d H:i:s.u'
    },

    updateModel: function(model) {
        if (model) {
            var modelName = model.modelName,
                defaultDateFormat = this.getDefaultDateFormat(),
                table = modelName.slice(modelName.lastIndexOf('.') + 1);

            model.getFields().each(function (field) {
                if (field.isDateField && !field.getDateFormat()) {
                    field.dateFormat = defaultDateFormat;
                }
            });

            this.setUniqueIdStrategy(model.getIdentifier().isUnique);
            if (!this.getTable()) {
                this.setTable(table);
            }
            this.setColumns(this.getPersistedModelColumns(model));
        }

        this.callParent(arguments);
    },

    setException: function(operation, error) {
        operation.setException(error);
    },

    create: function (operation, callback, scope) {
        var me = this,
            db = me.getDatabaseObject(),
            records = operation.getRecords(),
            tableExists = me.getTableExists();

        operation.setStarted();

        db.transaction(function(transaction) {
                if (!tableExists) {
                    me.createTable(transaction);
                }

                me.insertRecords(records, transaction, function(resultSet, error) {
                    if (operation.process(operation.getAction(), resultSet) === false) {
                        me.fireEvent('exception', me, operation);
                    }

                    if (error) {
                        operation.setException(error);
                    }
                }, me);
            },
            function(transaction, error) {
                me.setException(operation, error);
                if (typeof callback == 'function') {
                    callback.call(scope || me, operation);
                }
            },
            function(transaction) {
                if (typeof callback == 'function') {
                    callback.call(scope || me, operation);
                }
            }
        );
    },

    read: function(operation, callback, scope) {
        var me = this,
            db = me.getDatabaseObject(),
            model = me.getModel(),
            idProperty = model.getIdProperty(),
            tableExists = me.getTableExists(),
            params = operation.getParams() || {},
            id = params[idProperty],
            sorters = operation.getSorters(),
            filters = operation.getFilters(),
            page = operation.getPage(),
            start = operation.getStart(),
            limit = operation.getLimit(),
            filtered, i, ln;

        params = Ext.apply(params, {
            page: page,
            start: start,
            limit: limit,
            sorters: sorters,
            filters: filters
        });

        operation.setStarted();

        db.transaction(function(transaction) {
                if (!tableExists) {
                    me.createTable(transaction);
                }

                me.selectRecords(transaction, id !== undefined ? id : params, function (resultSet, error) {
                    if (operation.process(operation.getAction(), resultSet) === false) {
                        me.fireEvent('exception', me, operation);
                    }

                    if (error) {
                        operation.setException(error);
                    }

                    if (filters && filters.length) {
                        filtered = Ext.create('Ext.util.Collection', function(record) {
                            return record.getId();
                        });
                        filtered.setFilterRoot('data');
                        for (i = 0, ln = filters.length; i < ln; i++) {
                            if (filters[i].getProperty() === null) {
                                filtered.addFilter(filters[i]);
                            }
                        }
                        filtered.addAll(operation.getRecords());

                        operation.setRecords(filtered.items.slice());
                        resultSet.setRecords(operation.getRecords());
                        resultSet.setCount(filtered.items.length);
                        resultSet.setTotal(filtered.items.length);
                    }
                });
            },
            function(transaction, error) {
                me.setException(operation, error);
                if (typeof callback == 'function') {
                    callback.call(scope || me, operation);
                }
            },
            function(transaction) {
                if (typeof callback == 'function') {
                    callback.call(scope || me, operation);
                }
            }
        );
    },

    update: function(operation, callback, scope) {
        var me = this,
            records = operation.getRecords(),
            db = me.getDatabaseObject(),
            tableExists = me.getTableExists();

        operation.setStarted();

        db.transaction(function (transaction) {
                if (!tableExists) {
                    me.createTable(transaction);
                }

                me.updateRecords(transaction, records, function(resultSet, errors) {
                    if (operation.process(operation.getAction(), resultSet) === false) {
                        me.fireEvent('exception', me, operation);
                    }

                    if (errors) {
                       operation.setException(errors);
                    }
                });
            },
            function(transaction, error) {
                me.setException(operation, error);
                if (typeof callback == 'function') {
                    callback.call(scope || me, operation);
                }
            },
            function(transaction) {
                if (typeof callback == 'function') {
                    callback.call(scope || me, operation);
                }
            }
        );
    },

    erase: function(operation, callback, scope) {
        var me = this,
            records = operation.getRecords(),
            db = me.getDatabaseObject(),
            tableExists = me.getTableExists();

        operation.setStarted();

        db.transaction(function(transaction) {
                if (!tableExists) {
                    me.createTable(transaction);
                }

                me.destroyRecords(transaction, records, function(resultSet, error) {
                    if (operation.process(operation.getAction(), resultSet) === false) {
                        me.fireEvent('exception', me, operation);
                    }

                    if (error) {
                       operation.setException(error);
                    }
                });
            },
            function(transaction, error) {
                me.setException(operation, error);
                if (typeof callback == 'function') {
                    callback.call(scope || me, operation);
                }
            },
            function(transaction) {
                if (typeof callback == 'function') {
                    callback.call(scope || me, operation);
                }
            }
        );
    },

    createTable: function (transaction) {
        transaction.executeSql('CREATE TABLE IF NOT EXISTS ' + this.getTable() + ' (' + this.getSchemaString() + ')');
        this.setTableExists(true);
    },

    insertRecords: function(records, transaction, callback, scope) {
        var me = this,
            table = me.getTable(),
            columns = me.getColumns(),
            totalRecords = records.length,
            executed = 0,
            tmp = [],
            insertedRecords = [],
            errors = [],
            uniqueIdStrategy = me.getUniqueIdStrategy(),
            i, ln, placeholders, result;

        result = new Ext.data.ResultSet({
            records: insertedRecords,
            success: true
        });

        for (i = 0, ln = columns.length; i < ln; i++) {
            tmp.push('?');
        }
        placeholders = tmp.join(', ');

        Ext.each(records, function (record) {
            var id = record.getId(),
                data = me.getRecordData(record),
                values = me.getColumnValues(columns, data);

            transaction.executeSql(
                'INSERT INTO ' + table + ' (' + columns.join(', ') + ') VALUES (' + placeholders + ')', values,
                function (transaction, resultSet) {
                    executed++;
                    insertedRecords.push({
                        clientId: id,
                        id: uniqueIdStrategy ? id : resultSet.insertId,
                        data: data,
                        node: data
                    });

                    if (executed === totalRecords && typeof callback == 'function') {
                        callback.call(scope || me, result, errors.length > 0 ? errors : null);
                    }
                },
                function (transaction, error) {
                    executed++;
                    errors.push({
                        clientId: id,
                        error: error
                    });

                    if (executed === totalRecords && typeof callback == 'function') {
                        callback.call(scope || me, result, errors);
                    }
                }
            );
        });
    },

    selectRecords: function(transaction, params, callback, scope) {
        var me = this,
            table = me.getTable(),
            idProperty = me.getModel().getIdProperty(),
            sql = 'SELECT * FROM ' + table,
            records = [],
            filterStatement = ' WHERE ',
            sortStatement = ' ORDER BY ',
            i, ln, data, result, count, rows, filter, sorter, property, value;

        result = new Ext.data.ResultSet({
            records: records,
            success: true
        });

        if (!Ext.isObject(params)) {
            sql += filterStatement + idProperty + ' = ' + params;
        } else {
            ln = params.filters && params.filters.length;
            if (ln) {
                for (i = 0; i < ln; i++) {
                    filter = params.filters[i];
                    property = filter.getProperty();
                    value = filter.getValue();
                    if (property !== null) {
                        sql += filterStatement + property + ' ' + (filter.getAnyMatch() ? ('LIKE \'%' + value + '%\'') : ('= \'' + value + '\''));
                        filterStatement = ' AND ';
                    }
                }
            }

            ln = params.sorters && params.sorters.length;
            if (ln) {
                for (i = 0; i < ln; i++) {
                    sorter = params.sorters[i];
                    property = sorter.getProperty();
                    if (property !== null) {
                        sql += sortStatement + property + ' ' + sorter.getDirection();
                        sortStatement = ', ';
                    }
                }
            }

            // handle start, limit, sort, filter and group params
            if (params.page !== undefined) {
                sql += ' LIMIT ' + parseInt(params.start, 10) + ', ' + parseInt(params.limit, 10);
            }
        }
        transaction.executeSql(sql, null,
            function(transaction, resultSet) {
                rows = resultSet.rows;
                count = rows.length;

                for (i = 0, ln = count; i < ln; i++) {
                    data = rows.item(i);
                    records.push({
                        clientId: null,
                        id: data[idProperty],
                        data: data,
                        node: data
                    });
                }

                result.setSuccess(true);
                result.setTotal(count);
                result.setCount(count);

                if (typeof callback == 'function') {
                    callback.call(scope || me, result);
                }
            },
            function(transaction, error) {
                result.setSuccess(false);
                result.setTotal(0);
                result.setCount(0);

                if (typeof callback == 'function') {
                    callback.call(scope || me, result, error);
                }
            }
        );
    },

    updateRecords: function (transaction, records, callback, scope) {
        var me = this,
            table = me.getTable(),
            columns = me.getColumns(),
            totalRecords = records.length,
            idProperty = me.getModel().getIdProperty(),
            executed = 0,
            updatedRecords = [],
            errors = [],
            i, ln, result;

        result = new Ext.data.ResultSet({
            records: updatedRecords,
            success: true
        });

        Ext.each(records, function (record) {
            var id = record.getId(),
                data = me.getRecordData(record),
                values = me.getColumnValues(columns, data),
                updates = [];

            for (i = 0, ln = columns.length; i < ln; i++) {
                updates.push(columns[i] + ' = ?');
            }

            transaction.executeSql(
                'UPDATE ' + table + ' SET ' + updates.join(', ') + ' WHERE ' + idProperty + ' = ?', values.concat(id),
                function (transaction, resultSet) {
                    executed++;
                    updatedRecords.push({
                        clientId: id,
                        id: id,
                        data: data,
                        node: data
                    });

                    if (executed === totalRecords && typeof callback == 'function') {
                        callback.call(scope || me, result, errors.length > 0 ? errors : null);
                    }
                },
                function (transaction, error) {
                    executed++;
                    errors.push({
                        clientId: id,
                        error: error
                    });

                    if (executed === totalRecords && typeof callback == 'function') {
                        callback.call(scope || me, result, errors);
                    }
                }
            );
        });
    },

    destroyRecords: function (transaction, records, callback, scope) {
        var me = this,
            table = me.getTable(),
            idProperty = me.getModel().getIdProperty(),
            ids = [],
            values = [],
            destroyedRecords = [],
            i, ln, result, record;

        for (i = 0, ln = records.length; i < ln; i++) {
            ids.push(idProperty + ' = ?');
            values.push(records[i].getId());
        }

        result = new Ext.data.ResultSet({
            records: destroyedRecords,
            success: true
        });

        transaction.executeSql(
            'DELETE FROM ' + table + ' WHERE ' + ids.join(' OR '), values,
            function (transaction, resultSet) {
                for (i = 0, ln = records.length; i < ln; i++) {
                    record = records[i];
                    destroyedRecords.push({
                        id: record.getId()
                    });
                }

                if (typeof callback == 'function') {
                    callback.call(scope || me, result);
                }
            },
            function (transaction, error) {
                if (typeof callback == 'function') {
                    callback.call(scope || me, result, error);
                }
            }
        );
    },

    /**
     * Formats the data for each record before sending it to the server. This
     * method should be overridden to format the data in a way that differs from the default.
     * @param {Object} record The record that we are writing to the server.
     * @return {Object} An object literal of name/value keys to be written to the server.
     * By default this method returns the data property on the record.
     */
    getRecordData: function (record) {
        var me = this,
            fields = record.getFields(),
            idProperty = record.getIdProperty(),
            uniqueIdStrategy = me.getUniqueIdStrategy(),
            data = {},
            name, value;

        fields.each(function (field) {
            if (field.persist) {
                name = field.name;
                if (name === idProperty && !uniqueIdStrategy) {
                    return;
                }
                value = record.get(name);
                if (field.isDateField) {
                    value = me.writeDate(field, value);
                }
                data[name] = value;
            }
        }, me);

        return data;
    },

    getColumnValues: function(columns, data) {
        var ln = columns.length,
            values = [],
            i, column, value;

        for (i = 0; i < ln; i++) {
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
            idProperty = model.getIdProperty(),
            fields = model.getFields().items,
            uniqueIdStrategy = me.getUniqueIdStrategy(),
            ln = fields.length,
            i, field, type, name;

        for (i = 0; i < ln; i++) {
            field = fields[i];
            type = field.getType();
            name = field.name;

            if (name === idProperty) {
                if (uniqueIdStrategy) {
                    type = me.convertToSqlType(type);
                    schema.unshift(idProperty + ' ' + type);
                } else {
                    schema.unshift(idProperty + ' INTEGER PRIMARY KEY AUTOINCREMENT');
                }
            } else {
                type = me.convertToSqlType(type);
                schema.push(name + ' ' + type);
            }
        }

        return schema.join(', ');
    },

    getPersistedModelColumns: function(model) {
        var fields = model.getFields().items,
            uniqueIdStrategy = this.getUniqueIdStrategy(),
            idProperty = model.getIdProperty(),
            columns = [],
            ln = fields.length,
            i, field, name;

        for (i = 0; i < ln; i++) {
            field = fields[i];
            name = field.name;

            if (name === idProperty && !uniqueIdStrategy) {
                continue;
            }

            if (field.persist) {
                columns.push(field.name);
            }
        }
        return columns;
    },

    convertToSqlType: function(type) {
        switch (type.toLowerCase()) {
            case 'date':
            case 'string':
            case 'auto':
                return 'TEXT';
            case 'int':
                return 'INTEGER';
            case 'float':
                return 'REAL';
            case 'bool':
                return 'NUMERIC';
        }
    },

    writeDate: function (field, date) {
        if (Ext.isEmpty(date)) {
            return null;
        }

        var dateFormat = field.getDateFormat() || this.getDefaultDateFormat();
        switch (dateFormat) {
            case 'timestamp':
                return date.getTime() / 1000;
            case 'time':
                return date.getTime();
            default:
                return Ext.Date.format(date, dateFormat);
        }
    },

    dropTable: function(config) {
        var me = this,
            table = me.getTable(),
            callback = config ? config.callback : null,
            scope = config ? config.scope || me : null,
            db = me.getDatabaseObject();

        db.transaction(function(transaction) {
                transaction.executeSql('DROP TABLE ' + table);
            },
            function(transaction, error) {
                if (typeof callback == 'function') {
                    callback.call(scope || me, false, table, error);
                }
            },
            function(transaction) {
                if (typeof callback == 'function') {
                    callback.call(scope || me, true, table);
                }
            }
        );

        me.setTableExists(false);
    },

    getDatabaseObject: function() {
        return openDatabase(this.getDatabase(), '1.0', 'Sencha Database', 5 * 1024 * 1024);
    }
});
