/**
 * @license
 * Copyright 2015 The Lovefield Project Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Closure Compiler externs for Lovefield.
 * @externs
 */
var lf = {};


/** @enum {number} */
lf.Order = {};
lf.Order.ASC;
lf.Order.DESC;


/** @enum {number} */
lf.Type = {};
lf.Type.ARRAY_BUFFER;
lf.Type.BOOLEAN;
lf.Type.DATE_TIME;
lf.Type.INTEGER;
lf.Type.NUMBER;
lf.Type.OBJECT;
lf.Type.STRING;


/** @enum {number} */
lf.TransactionType = {};
lf.TransactionType.READ_ONLY;
lf.TransactionType.READ_WRITE;


/** @enum {number} */
lf.ConstraintAction = {};
lf.ConstraintAction.RESTRICT;
lf.ConstraintAction.CASCADE;


/** @enum {number} */
lf.ConstraintTiming = {};
lf.ConstraintTiming.IMMEDIATE;
lf.ConstraintTiming.DEFERRABLE;



/** @interface */
lf.Binder = function() {};



/** @interface */
lf.Predicate = function() {};



/** @interface */
lf.Row = function() {};



/** @interface */
lf.TransactionStats = function() {};


/** @return {boolean} */
lf.TransactionStats.prototype.success = function() {};


/** @return {number} */
lf.TransactionStats.prototype.insertedRowCount = function() {};


/** @return {number} */
lf.TransactionStats.prototype.updatedRowCount = function() {};


/** @return {number} */
lf.TransactionStats.prototype.deletedRowCount = function() {};


/** @return {number} */
lf.TransactionStats.prototype.changedTableCount = function() {};



/** @interface */
lf.Transaction = function() {};


/**
 * @param {!lf.query.Builder} query
 * @return {!IThenable<!Array<!Object>>}
 */
lf.Transaction.prototype.attach = function(query) {};


/**
 * @param {!Array<!lf.schema.Table>} scope
 * @return {!IThenable}
 */
lf.Transaction.prototype.begin = function(scope) {};


/** @return {!IThenable} */
lf.Transaction.prototype.commit = function() {};


/**
 * @param {!Array<!lf.query.Builder>} queryBuilders
 * @return {!IThenable<!Array<!Array<!Object>>>}
 */
lf.Transaction.prototype.exec = function(queryBuilders) {};


/** @return {!IThenable} */
lf.Transaction.prototype.rollback = function() {};


/** @return {!lf.TransactionStats} */
lf.Transaction.prototype.stats = function() {};



/** @interface */
lf.Database = function() {};


lf.Database.prototype.close = function() {};


/**
 * @param {number=} opt_type
 * @return {!lf.Transaction}
 */
lf.Database.prototype.createTransaction = function(opt_type) {};


/** @return {!lf.query.Delete} */
lf.Database.prototype.delete = function() {};


/** @return {!lf.schema.Database} */
lf.Database.prototype.getSchema = function() {};


/** @return {!lf.query.Insert} */
lf.Database.prototype.insert = function() {};


/** @return {!lf.query.Insert} */
lf.Database.prototype.insertOrReplace = function() {};


/**
 * @param {!lf.query.Select} query
 * @param {!Function} callback
 */
lf.Database.prototype.observe = function(query, callback) {};


/**
 * @param {...!lf.schema.Column} var_args
 * @return {!lf.query.Select}
 */
lf.Database.prototype.select = function(var_args) {};


/**
 * @param {!lf.query.Select} query
 * @param {!Function} callback
 */
lf.Database.prototype.unobserve = function(query, callback) {};


/**
 * @param {!lf.schema.Table} table
 * @return {!lf.query.Update}
 */
lf.Database.prototype.update = function(table) {};


/** @return {!IThenable<!Object>} */
lf.Database.prototype.export = function() {};


/**
 * @param {!Object} data
 * @return {!IThenable}
 */
lf.Database.prototype.import = function(data) {};


lf.query = {};



/** @interface */
lf.query.Builder = function() {};


/**
 * @param {!Array<*>} values
 * @return {!lf.query.Builder}
 */
lf.query.Builder.prototype.bind = function(values) {};


/** @return {!IThenable<!Array<!Object>>} */
lf.query.Builder.prototype.exec = function() {};


/** @return {string} */
lf.query.Builder.prototype.explain = function() {};


/**
 * @param {boolean=} opt_stripValueInfo
 * @return {string}
 */
lf.query.Builder.prototype.toSql = function(opt_stripValueInfo) {};



/**
 * @interface
 * @extends {lf.query.Builder}
 */
lf.query.Delete = function() {};


/**
 * @param {!lf.schema.Table} table
 * @return {!lf.query.Delete}
 */
lf.query.Delete.prototype.from = function(table) {};


/**
 * @param {!lf.Predicate} predicate
 * @return {!lf.query.Delete}
 */
lf.query.Delete.prototype.where = function(predicate) {};



/**
 * @interface
 * @extends {lf.query.Builder}
 */
lf.query.Insert = function() {};


/**
 * @param {!lf.schema.Table} table
 * @return {!lf.query.Insert}
 */
lf.query.Insert.prototype.into = function(table) {};


/**
 * @param {(!Array<!lf.Row>|!lf.Binder|!Array<!lf.Binder>)} rows
 * @return {!lf.query.Insert}
 */
lf.query.Insert.prototype.values = function(rows) {};



/**
 * @interface
 * @extends {lf.query.Builder}
 */
lf.query.Select = function() {};


/** @return {!lf.query.Select} */
lf.query.Select.prototype.clone = function() {};


/**
 * @param {...!lf.schema.Table} var_args
 * @return {!lf.query.Select}
 */
lf.query.Select.prototype.from = function(var_args) {};


/**
 * @param {...!lf.schema.Column} var_args
 * @return {!lf.query.Select}
 */
lf.query.Select.prototype.groupBy = function(var_args) {};


/**
 * @param {!lf.schema.Table} table
 * @param {!lf.Predicate} predicate
 * @return {!lf.query.Select}
 */
lf.query.Select.prototype.innerJoin = function(table, predicate) {};


/**
 * @param {!lf.schema.Table} table
 * @param {!lf.Predicate} predicate
 * @return {!lf.query.Select}
 */
lf.query.Select.prototype.leftOuterJoin = function(table, predicate) {};


/**
 * @param {!lf.Binder|number} numberOfRows
 * @return {!lf.query.Select}
 */
lf.query.Select.prototype.limit = function(numberOfRows) {};


/**
 * @param {!lf.schema.Column} column
 * @param {number=} opt_order
 * @return {!lf.query.Select}
 */
lf.query.Select.prototype.orderBy = function(column, opt_order) {};


/**
 * @param {!lf.Binder|number} numberOfRows
 * @return {!lf.query.Select}
 */
lf.query.Select.prototype.skip = function(numberOfRows) {};


/**
 * @param {!lf.Predicate} predicate
 * @return {!lf.query.Select}
 */
lf.query.Select.prototype.where = function(predicate) {};



/**
 * @interface
 * @extends {lf.query.Builder}
 */
lf.query.Update = function() {};


/**
 * @param {!lf.schema.Column} column
 * @param {*} value
 * @return {!lf.query.Update}
 */
lf.query.Update.prototype.set = function(column, value) {};


/**
 * @param {!lf.Predicate} predicate
 * @return {!lf.query.Update}
 */
lf.query.Update.prototype.where = function(predicate) {};


lf.raw = {};



/** @interface */
lf.raw.BackStore = function() {};


/** @return {!Object} */
lf.raw.BackStore.prototype.getRawDBInstance;


/** @return {!Object} */
lf.raw.BackStore.prototype.getRawTransaction;


/**
 * @param {string} tableName
 * @return {!IThenable}
 */
lf.raw.BackStore.prototype.dropTable;


/**
 * @param {string} tableName
 * @param {string} columnName
 * @param {string|number|boolean|Date|ArrayBuffer|null} defaultValue
 * @return {!IThenable}
 */
lf.raw.BackStore.prototype.addTableColumn;


/**
 * @param {string} tableName
 * @param {string} columnName
 * @return {!IThenable}
 */
lf.raw.BackStore.prototype.dropTableColumn;


/**
 * @param {string} tableName
 * @param {string} oldColumnName
 * @param {string} newColumnName
 * @return {!IThenable}
 */
lf.raw.BackStore.prototype.renameTableColumn;


/**
 * @param {!Object} payload
 * @return {!lf.Row}
 */
lf.raw.BackStore.prototype.createRow;


/** @return {number} */
lf.raw.BackStore.prototype.getVersion;


/** @return {!IThenable<!Object>} */
lf.raw.BackStore.prototype.dump;


lf.schema = {};


/**
 * @param {string} dbName
 * @param {number} dbVersion
 * @return {!lf.schema.Builder}
 */
lf.schema.create = function(dbName, dbVersion) {};


/** @enum {number} */
lf.schema.DataStoreType = {};
lf.schema.DataStoreType.FIREBASE;
lf.schema.DataStoreType.INDEXED_DB;
lf.schema.DataStoreType.LOCAL_STORAGE;
lf.schema.DataStoreType.MEMORY;
lf.schema.DataStoreType.OBSERVABLE_STORE;
lf.schema.DataStoreType.WEB_SQL;


/**
 * @typedef {{
 *   enableBundledMode: (boolean|undefined)
 * }}
 */
var DatabasePragma;



/** @interface */
lf.schema.Database = function() {};


/** @return {string} */
lf.schema.Database.prototype.name = function() {};


/** @return {!DatabasePragma} */
lf.schema.Database.prototype.pragma = function() {};


/**
 * @param {string} tableName
 * @return {!lf.schema.Table}
 */
lf.schema.Database.prototype.table = function(tableName) {};


/** @return {Array<lf.schema.Table>} */
lf.schema.Database.prototype.tables = function() {};


/** @return {number} */
lf.schema.Database.prototype.version = function() {};



/** @interface */
lf.schema.Column = function() {};


/**
 * @param {string} name
 * @return {!lf.schema.Column}
 */
lf.schema.Column.prototype.as = function(name) {};


/** @return {!lf.Type} */
lf.schema.Column.prototype.getType = function() {};


/** @return {string} */
lf.schema.Column.prototype.getName = function() {};


/** @return {string} */
lf.schema.Column.prototype.getNormalizedName = function() {};


/** @return {boolean} */
lf.schema.Column.prototype.isNullable = function() {};



/** @interface */
lf.schema.Table = function() {};


/**
 * @param {string} name
 * @return {!lf.schema.Table}
 */
lf.schema.Table.prototype.as = function(name) {};


/**
 * @param {!Object} value
 * @return {!lf.Row}
 */
lf.schema.Table.prototype.createRow = function(value) {};


/** @return {string} */
lf.schema.Table.prototype.getName = function() {};


/** @return {!Array<!lf.schema.Column>} */
lf.schema.Table.prototype.getColumns = function() {};


/** @return {!Array<!lf.schema.Index>} */
lf.schema.Table.prototype.getIndices = function() {};


/** @return {!lf.schema.Constraint} */
lf.schema.Table.prototype.getConstraint = function() {};


/** @return {boolean} */
lf.schema.Table.prototype.persistentIndex = function() {};



/** @interface */
lf.schema.Constraint = function() {};


/** @return {?lf.schema.Index} */
lf.schema.Constraint.prototype.getPrimaryKey = function() {};


/** @return {!Array<lf.schema.ForeignKeySpec>} */
lf.schema.Constraint.prototype.getForeignKeys = function() {};



/** @constructor */
lf.schema.ForeignKeySpec = function() {};


/** @type {string} */
lf.schema.ForeignKeySpec.prototype.name;


/** @type {string} */
lf.schema.ForeignKeySpec.prototype.parentTable;


/** @type {string} */
lf.schema.ForeignKeySpec.prototype.parentColumn;


/** @type {string} */
lf.schema.ForeignKeySpec.prototype.childColumn;


/** @type {!lf.ConstraintAction} */
lf.schema.ForeignKeySpec.prototype.action;


/** @type {!lf.ConstraintTiming} */
lf.schema.ForeignKeySpec.prototype.timing;



/** @constructor */
lf.schema.Index = function() {};


/** @type {string} */
lf.schema.Index.prototype.name;


/** @type {boolean} */
lf.schema.Index.prototype.isUnique;


/** @type {!Array} */
lf.schema.Index.prototype.columns;
// TODO(dpapad): Add more properties here.



/** @interface */
lf.schema.Builder = function() {};


/**
 * @param {{
 *   onUpgrade: (function (!lf.raw.BackStore): !IThenable|undefined),
 *   storeType: (number|undefined),
 *   webSqlDbSize: (number|undefined)}=} opt_options
 *   TODO(dpapad): firebase?
 * @return {!IThenable<!lf.Database>}
 */
lf.schema.Builder.prototype.connect = function(opt_options) {};


/**
 * @param {string} tableName
 * @return {!lf.schema.TableBuilder}
 */
lf.schema.Builder.prototype.createTable = function(tableName) {};


/** @return {!lf.schema.Database} */
lf.schema.Builder.prototype.getSchema = function() {};


/**
 * @param {!DatabasePragma} pragma
 * @return {!lf.schema.Builder}
 */
lf.schema.Builder.prototype.setPragma = function(pragma) {};



/** @interface */
lf.schema.TableBuilder = function() {};


/**
 * @param {string} name
 * @param {number} type
 * @return {!lf.schema.TableBuilder}
 */
lf.schema.TableBuilder.prototype.addColumn = function(name, type) {};


/**
 * @param {string} name
 * @param {{
 *   local: string,
 *   ref: string,
 *   action: (lf.ConstraintAction|undefined),
 *   timing: (lf.ConstraintTiming|undefined)
 * }} spec
 * @return {!lf.schema.TableBuilder}
 */
lf.schema.TableBuilder.prototype.addForeignKey = function(name, spec) {};


/**
 * @typedef {{
 *   name: string,
 *   order: !lf.Order,
 *   autoIncrement: boolean
 * }}
 */
var IndexedColumn;


/**
 * @param {string} name
 * @param {!Array<string>|!Array<IndexedColumn>} columns
 * @param {boolean=} opt_unique
 * @param {number=} opt_order
 * @return {!lf.schema.TableBuilder}
 */
lf.schema.TableBuilder.prototype.addIndex = function(
    name, columns, opt_unique, opt_order) {};


/**
 * @param {!Array<string>} columns
 * @return {!lf.schema.TableBuilder}
 */
lf.schema.TableBuilder.prototype.addNullable = function(columns) {};


/**
 * @param {!Array<string>|!Array<IndexedColumn>} columns
 * @param {boolean=} opt_autoInc
 * @return {!lf.schema.TableBuilder}
 */
lf.schema.TableBuilder.prototype.addPrimaryKey = function(
    columns, opt_autoInc) {};


/**
 * @param {string} name
 * @param {!Array<string>} columns
 * @return {!lf.schema.TableBuilder}
 */
lf.schema.TableBuilder.prototype.addUnique = function(name, columns) {};


/** @param {boolean} value */
lf.schema.TableBuilder.prototype.persistentIndex = function(value) {};


/**
 * @typedef {string|number|boolean|Date}
 */
var ValueLiteral;



/** @interface */
lf.schema.PredicateProvider = function() {};


/**
 * @param {!ValueLiteral|!lf.Binder} from
 * @param {!ValueLiteral|!lf.Binder} to
 * @return {!lf.Predicate}
 */
lf.schema.PredicateProvider.prototype.between = function(from, to) {};


/**
 * @param {!ValueLiteral|!lf.Binder|!lf.schema.Column} operand
 * @return {lf.Predicate}
 */
lf.schema.PredicateProvider.prototype.eq = function(operand) {};


/**
 * @param {!ValueLiteral|!lf.Binder|!lf.schema.Column} operand
 * @return {lf.Predicate}
 */
lf.schema.PredicateProvider.prototype.gt = function(operand) {};


/**
 * @param {!ValueLiteral|!lf.Binder|!lf.schema.Column} operand
 * @return {lf.Predicate}
 */
lf.schema.PredicateProvider.prototype.gte = function(operand) {};


/**
 * @param {!Array<!ValueLiteral>|!lf.Binder} values
 * @return {lf.Predicate}
 */
lf.schema.PredicateProvider.prototype.in = function(values) {};


/** @return {!lf.Predicate} */
lf.schema.PredicateProvider.prototype.isNotNull = function() {};


/** @return {!lf.Predicate} */
lf.schema.PredicateProvider.prototype.isNull = function() {};


/**
 * @param {!ValueLiteral|!lf.Binder|!lf.schema.Column} operand
 * @return {!lf.Predicate}
 */
lf.schema.PredicateProvider.prototype.lt = function(operand) {};


/**
 * @param {!ValueLiteral|!lf.Binder|!lf.schema.Column} operand
 * @return {lf.Predicate}
 */
lf.schema.PredicateProvider.prototype.lte = function(operand) {};


/**
 * @param {(!RegExp|!lf.Binder)} regex
 * @return {!lf.Predicate}
 */
lf.schema.PredicateProvider.prototype.match = function(regex) {};


/**
 * @param {!ValueLiteral|!lf.Binder|!lf.schema.Column} operand
 * @return {!lf.Predicate}
 */
lf.schema.PredicateProvider.prototype.neq = function(operand) {};

lf.op = {};


/**
 * @param {...!lf.Predicate} var_args
 * @return {!lf.Predicate}
 */
lf.op.and = function(var_args) {};


/**
 * @param {!lf.Predicate} operand
 * @return {!lf.Predicate}
 */
lf.op.not = function(operand) {};


/**
 * @param {...!lf.Predicate} var_args
 * @return {!lf.Predicate}
 */
lf.op.or = function(var_args) {};


lf.fn = {};


/**
 * @param {!lf.schema.Column} col
 * @return {!lf.schema.Column}
 */
lf.fn.avg = function(col) {};


/**
 * @param {!lf.schema.Column=} opt_col
 * @return {!lf.schema.Column}
 */
lf.fn.count = function(opt_col) {};


/**
 * @param {!lf.schema.Column} col
 * @return {!lf.schema.Column}
 */
lf.fn.distinct = function(col) {};


/**
 * @param {!lf.schema.Column} col
 * @return {!lf.schema.Column}
 */
lf.fn.geomean = function(col) {};


/**
 * @param {!lf.schema.Column} col
 * @return {!lf.schema.Column}
 */
lf.fn.max = function(col) {};


/**
 * @param {!lf.schema.Column} col
 * @return {!lf.schema.Column}
 */
lf.fn.min = function(col) {};


/**
 * @param {!lf.schema.Column} col
 * @return {!lf.schema.Column}
 */
lf.fn.stddev = function(col) {};


/**
 * @param {!lf.schema.Column} col
 * @return {!lf.schema.Column}
 */
lf.fn.sum = function(col) {};
