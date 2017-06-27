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

