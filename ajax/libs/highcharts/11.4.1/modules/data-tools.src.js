/**
 * @license Highcharts JS v11.4.1 (2024-04-04)
 *
 * Highcharts
 *
 * (c) 2010-2024 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/data-tools', ['highcharts'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    'use strict';
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                window.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Data/Modifiers/DataModifier.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *  - Gøran Slettemark
         *
         * */
        const { addEvent, fireEvent, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Abstract class to provide an interface for modifying a table.
         *
         * @private
         */
        class DataModifier {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Runs a timed execution of the modifier on the given datatable.
             * Can be configured to run multiple times.
             *
             * @param {DataTable} dataTable
             * The datatable to execute
             *
             * @param {DataModifier.BenchmarkOptions} options
             * Options. Currently supports `iterations` for number of iterations.
             *
             * @return {Array<number>}
             * An array of times in milliseconds
             *
             */
            benchmark(dataTable, options) {
                const results = [];
                const modifier = this;
                const execute = () => {
                    modifier.modifyTable(dataTable);
                    modifier.emit({
                        type: 'afterBenchmarkIteration'
                    });
                };
                const defaultOptions = {
                    iterations: 1
                };
                const { iterations } = merge(defaultOptions, options);
                modifier.on('afterBenchmarkIteration', () => {
                    if (results.length === iterations) {
                        modifier.emit({
                            type: 'afterBenchmark',
                            results
                        });
                        return;
                    }
                    // Run again
                    execute();
                });
                const times = {
                    startTime: 0,
                    endTime: 0
                };
                // Add timers
                modifier.on('modify', () => {
                    times.startTime = window.performance.now();
                });
                modifier.on('afterModify', () => {
                    times.endTime = window.performance.now();
                    results.push(times.endTime - times.startTime);
                });
                // Initial run
                execute();
                return results;
            }
            /**
             * Emits an event on the modifier to all registered callbacks of this event.
             *
             * @param {DataModifier.Event} [e]
             * Event object containing additonal event information.
             */
            emit(e) {
                fireEvent(this, e.type, e);
            }
            /**
             * Returns a modified copy of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Table to modify.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Promise<Highcharts.DataTable>}
             * Table with `modified` property as a reference.
             */
            modify(table, eventDetail) {
                const modifier = this;
                return new Promise((resolve, reject) => {
                    if (table.modified === table) {
                        table.modified = table.clone(false, eventDetail);
                    }
                    try {
                        resolve(modifier.modifyTable(table, eventDetail));
                    }
                    catch (e) {
                        modifier.emit({
                            type: 'error',
                            detail: eventDetail,
                            table
                        });
                        reject(e);
                    }
                });
            }
            /**
             * Applies partial modifications of a cell change to the property `modified`
             * of the given modified table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {string} columnName
             * Column name of changed cell.
             *
             * @param {number|undefined} rowIndex
             * Row index of changed cell.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Changed cell value.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyCell(table, 
            /* eslint-disable @typescript-eslint/no-unused-vars */
            columnName, rowIndex, cellValue, eventDetail
            /* eslint-enable @typescript-eslint/no-unused-vars */
            ) {
                return this.modifyTable(table);
            }
            /**
             * Applies partial modifications of column changes to the property
             * `modified` of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Highcharts.DataTableColumnCollection} columns
             * Changed columns as a collection, where the keys are the column names.
             *
             * @param {number} [rowIndex=0]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyColumns(table, 
            /* eslint-disable @typescript-eslint/no-unused-vars */
            columns, rowIndex, eventDetail
            /* eslint-enable @typescript-eslint/no-unused-vars */
            ) {
                return this.modifyTable(table);
            }
            /**
             * Applies partial modifications of row changes to the property `modified`
             * of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
             * Changed rows.
             *
             * @param {number} [rowIndex]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyRows(table, 
            /* eslint-disable @typescript-eslint/no-unused-vars */
            rows, rowIndex, eventDetail
            /* eslint-enable @typescript-eslint/no-unused-vars */
            ) {
                return this.modifyTable(table);
            }
            /**
             * Registers a callback for a specific modifier event.
             *
             * @param {string} type
             * Event type as a string.
             *
             * @param {DataEventEmitter.Callback} callback
             * Function to register for an modifier callback.
             *
             * @return {Function}
             * Function to unregister callback from the modifier event.
             */
            on(type, callback) {
                return addEvent(this, type, callback);
            }
        }
        /* *
         *
         *  Class Namespace
         *
         * */
        /**
         * Additionally provided types for modifier events and options.
         * @private
         */
        (function (DataModifier) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Constants
             *
             * */
            /**
             * Registry as a record object with modifier names and their class
             * constructor.
             */
            DataModifier.types = {};
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Adds a modifier class to the registry. The modifier class has to provide
             * the `DataModifier.options` property and the `DataModifier.modifyTable`
             * method to modify the table.
             *
             * @private
             *
             * @param {string} key
             * Registry key of the modifier class.
             *
             * @param {DataModifierType} DataModifierClass
             * Modifier class (aka class constructor) to register.
             *
             * @return {boolean}
             * Returns true, if the registration was successful. False is returned, if
             * their is already a modifier registered with this key.
             */
            function registerType(key, DataModifierClass) {
                return (!!key &&
                    !DataModifier.types[key] &&
                    !!(DataModifier.types[key] = DataModifierClass));
            }
            DataModifier.registerType = registerType;
        })(DataModifier || (DataModifier = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return DataModifier;
    });
    _registerModule(_modules, 'Data/DataTable.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *  - Gøran Slettemark
         *
         * */
        const { addEvent, fireEvent, uniqueKey } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Class to manage columns and rows in a table structure. It provides methods
         * to add, remove, and manipulate columns and rows, as well as to retrieve data
         * from specific cells.
         *
         * @class
         * @name Highcharts.DataTable
         *
         * @param {Highcharts.DataTableOptions} [options]
         * Options to initialize the new DataTable instance.
         */
        class DataTable {
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * Tests whether a row contains only `null` values or is equal to
             * DataTable.NULL. If all columns have `null` values, the function returns
             * `true`. Otherwise, it returns `false` to indicate that the row contains
             * at least one non-null value.
             *
             * @function Highcharts.DataTable.isNull
             *
             * @param {Highcharts.DataTableRow|Highcharts.DataTableRowObject} row
             * Row to test.
             *
             * @return {boolean}
             * Returns `true`, if the row contains only null, otherwise `false`.
             *
             * @example
             * if (DataTable.isNull(row)) {
             *   // handle null row
             * }
             */
            static isNull(row) {
                if (row === DataTable.NULL) {
                    return true;
                }
                if (row instanceof Array) {
                    if (!row.length) {
                        return false;
                    }
                    for (let i = 0, iEnd = row.length; i < iEnd; ++i) {
                        if (row[i] !== null) {
                            return false;
                        }
                    }
                }
                else {
                    const columnNames = Object.keys(row);
                    if (!columnNames.length) {
                        return false;
                    }
                    for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                        if (row[columnNames[i]] !== null) {
                            return false;
                        }
                    }
                }
                return true;
            }
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the DataTable class.
             *
             * @param {Highcharts.DataTableOptions} [options]
             * Options to initialize the new DataTable instance.
             */
            constructor(options = {}) {
                /**
                 * Dictionary of all column aliases and their mapped column. If a column
                 * for one of the get-methods matches an column alias, this column will
                 * be replaced with the mapped column by the column alias.
                 *
                 * @name Highcharts.DataTable#aliases
                 * @type {Highcharts.Dictionary<string>}
                 */
                this.aliases = (options.aliases ?
                    JSON.parse(JSON.stringify(options.aliases)) :
                    {});
                /**
                 * Whether the ID was automatic generated or given in the constructor.
                 *
                 * @name Highcharts.DataTable#autoId
                 * @type {boolean}
                 */
                this.autoId = !options.id;
                this.columns = {};
                /**
                 * ID of the table for indentification purposes.
                 *
                 * @name Highcharts.DataTable#id
                 * @type {string}
                 */
                this.id = (options.id || uniqueKey());
                this.modified = this;
                this.rowCount = 0;
                this.versionTag = uniqueKey();
                const columns = options.columns || {}, columnNames = Object.keys(columns), thisColumns = this.columns;
                let rowCount = 0;
                for (let i = 0, iEnd = columnNames.length, column, columnName; i < iEnd; ++i) {
                    columnName = columnNames[i];
                    column = columns[columnName].slice();
                    thisColumns[columnName] = column;
                    rowCount = Math.max(rowCount, column.length);
                }
                for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                    thisColumns[columnNames[i]].length = rowCount;
                }
                this.rowCount = rowCount;
                const aliases = options.aliases || {}, aliasKeys = Object.keys(aliases), thisAliases = this.aliases;
                for (let i = 0, iEnd = aliasKeys.length, alias; i < iEnd; ++i) {
                    alias = aliasKeys[i];
                    thisAliases[alias] = aliases[alias];
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Returns a clone of this table. The cloned table is completely independent
             * of the original, and any changes made to the clone will not affect
             * the original table.
             *
             * @function Highcharts.DataTable#clone
             *
             * @param {boolean} [skipColumns]
             * Whether to clone columns or not.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Clone of this data table.
             *
             * @emits #cloneTable
             * @emits #afterCloneTable
             */
            clone(skipColumns, eventDetail) {
                const table = this, tableOptions = {};
                table.emit({ type: 'cloneTable', detail: eventDetail });
                if (!skipColumns) {
                    tableOptions.aliases = table.aliases;
                    tableOptions.columns = table.columns;
                }
                if (!table.autoId) {
                    tableOptions.id = table.id;
                }
                const tableClone = new DataTable(tableOptions);
                if (!skipColumns) {
                    tableClone.versionTag = table.versionTag;
                }
                table.emit({
                    type: 'afterCloneTable',
                    detail: eventDetail,
                    tableClone
                });
                return tableClone;
            }
            /**
             * Deletes a column alias and returns the original column name. If the alias
             * is not found, the method returns `undefined`. Deleting an alias does not
             * affect the data in the table, only the way columns are accessed.
             *
             * @function Highcharts.DataTable#deleteColumnAlias
             *
             * @param {string} alias
             * The alias to delete.
             *
             * @return {string|undefined}
             * Returns the original column name, if found.
             */
            deleteColumnAlias(alias) {
                const table = this, aliases = table.aliases, deletedAlias = aliases[alias], modifier = table.modifier;
                if (deletedAlias) {
                    delete table.aliases[alias];
                    if (modifier) {
                        modifier.modifyColumns(table, { [deletedAlias]: new Array(table.rowCount) }, 0);
                    }
                }
                return deletedAlias;
            }
            /**
             * Deletes columns from the table.
             *
             * @function Highcharts.DataTable#deleteColumns
             *
             * @param {Array<string>} [columnNames]
             * Names (no alias) of columns to delete. If no array is provided, all
             * columns will be deleted.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTableColumnCollection|undefined}
             * Returns the deleted columns, if found.
             *
             * @emits #deleteColumns
             * @emits #afterDeleteColumns
             */
            deleteColumns(columnNames, eventDetail) {
                const table = this, columns = table.columns, deletedColumns = {}, modifiedColumns = {}, modifier = table.modifier, rowCount = table.rowCount;
                columnNames = (columnNames || Object.keys(columns));
                if (columnNames.length) {
                    table.emit({
                        type: 'deleteColumns',
                        columnNames,
                        detail: eventDetail
                    });
                    for (let i = 0, iEnd = columnNames.length, column, columnName; i < iEnd; ++i) {
                        columnName = columnNames[i];
                        column = columns[columnName];
                        if (column) {
                            deletedColumns[columnName] = column;
                            modifiedColumns[columnName] = new Array(rowCount);
                        }
                        delete columns[columnName];
                    }
                    if (!Object.keys(columns).length) {
                        table.rowCount = 0;
                    }
                    if (modifier) {
                        modifier.modifyColumns(table, modifiedColumns, 0, eventDetail);
                    }
                    table.emit({
                        type: 'afterDeleteColumns',
                        columns: deletedColumns,
                        columnNames,
                        detail: eventDetail
                    });
                    return deletedColumns;
                }
            }
            /**
             * Deletes rows in this table.
             *
             * @function Highcharts.DataTable#deleteRows
             *
             * @param {number} [rowIndex]
             * Index to start delete of rows. If not specified, all rows will be
             * deleted.
             *
             * @param {number} [rowCount=1]
             * Number of rows to delete.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Array<Highcharts.DataTableRow>}
             * Returns the deleted rows, if found.
             *
             * @emits #deleteRows
             * @emits #afterDeleteRows
             */
            deleteRows(rowIndex, rowCount = 1, eventDetail) {
                const table = this, deletedRows = [], modifiedRows = [], modifier = table.modifier;
                table.emit({
                    type: 'deleteRows',
                    detail: eventDetail,
                    rowCount,
                    rowIndex: (rowIndex || 0)
                });
                if (typeof rowIndex === 'undefined') {
                    rowIndex = 0;
                    rowCount = table.rowCount;
                }
                if (rowCount > 0 && rowIndex < table.rowCount) {
                    const columns = table.columns, columnNames = Object.keys(columns);
                    for (let i = 0, iEnd = columnNames.length, column, deletedCells; i < iEnd; ++i) {
                        column = columns[columnNames[i]];
                        deletedCells = column.splice(rowIndex, rowCount);
                        if (!i) {
                            table.rowCount = column.length;
                        }
                        for (let j = 0, jEnd = deletedCells.length; j < jEnd; ++j) {
                            deletedRows[j] = (deletedRows[j] || []);
                            deletedRows[j][i] = deletedCells[j];
                        }
                        modifiedRows.push(new Array(iEnd));
                    }
                }
                if (modifier) {
                    modifier.modifyRows(table, modifiedRows, (rowIndex || 0), eventDetail);
                }
                table.emit({
                    type: 'afterDeleteRows',
                    detail: eventDetail,
                    rowCount,
                    rowIndex: (rowIndex || 0),
                    rows: deletedRows
                });
                return deletedRows;
            }
            /**
             * Emits an event on this table to all registered callbacks of the given
             * event.
             * @private
             *
             * @param {DataTable.Event} e
             * Event object with event information.
             */
            emit(e) {
                const table = this;
                switch (e.type) {
                    case 'afterDeleteColumns':
                    case 'afterDeleteRows':
                    case 'afterSetCell':
                    case 'afterSetColumns':
                    case 'afterSetRows':
                        table.versionTag = uniqueKey();
                        break;
                    default:
                }
                fireEvent(table, e.type, e);
            }
            /**
             * Fetches a single cell value.
             *
             * @function Highcharts.DataTable#getCell
             *
             * @param {string} columnNameOrAlias
             * Column name or alias of the cell to retrieve.
             *
             * @param {number} rowIndex
             * Row index of the cell to retrieve.
             *
             * @return {Highcharts.DataTableCellType|undefined}
             * Returns the cell value or `undefined`.
             */
            getCell(columnNameOrAlias, rowIndex) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                if (column) {
                    return column[rowIndex];
                }
            }
            /**
             * Fetches a cell value for the given row as a boolean.
             *
             * @function Highcharts.DataTable#getCellAsBoolean
             *
             * @param {string} columnNameOrAlias
             * Column name or alias to fetch.
             *
             * @param {number} rowIndex
             * Row index to fetch.
             *
             * @return {boolean}
             * Returns the cell value of the row as a boolean.
             */
            getCellAsBoolean(columnNameOrAlias, rowIndex) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                return !!(column && column[rowIndex]);
            }
            /**
             * Fetches a cell value for the given row as a number.
             *
             * @function Highcharts.DataTable#getCellAsNumber
             *
             * @param {string} columnNameOrAlias
             * Column name or alias to fetch.
             *
             * @param {number} rowIndex
             * Row index to fetch.
             *
             * @param {boolean} [useNaN]
             * Whether to return NaN instead of `null` and `undefined`.
             *
             * @return {number|null}
             * Returns the cell value of the row as a number.
             */
            getCellAsNumber(columnNameOrAlias, rowIndex, useNaN) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                let cellValue = (column && column[rowIndex]);
                switch (typeof cellValue) {
                    case 'boolean':
                        return (cellValue ? 1 : 0);
                    case 'number':
                        return (isNaN(cellValue) && !useNaN ? null : cellValue);
                }
                cellValue = parseFloat(`${cellValue}`);
                return (isNaN(cellValue) && !useNaN ? null : cellValue);
            }
            /**
             * Fetches a cell value for the given row as a string.
             *
             * @function Highcharts.DataTable#getCellAsString
             *
             * @param {string} columnNameOrAlias
             * Column name or alias to fetch.
             *
             * @param {number} rowIndex
             * Row index to fetch.
             *
             * @return {string}
             * Returns the cell value of the row as a string.
             */
            getCellAsString(columnNameOrAlias, rowIndex) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                return `${(column && column[rowIndex])}`;
            }
            /**
             * Fetches the given column by the canonical column name or by an alias.
             * This function is a simplified wrap of {@link getColumns}.
             *
             * @function Highcharts.DataTable#getColumn
             *
             * @param {string} columnNameOrAlias
             * Name or alias of the column to get, alias takes precedence.
             *
             * @param {boolean} [asReference]
             * Whether to return the column as a readonly reference.
             *
             * @return {Highcharts.DataTableColumn|undefined}
             * A copy of the column, or `undefined` if not found.
             */
            getColumn(columnNameOrAlias, asReference) {
                return this.getColumns([columnNameOrAlias], asReference)[columnNameOrAlias];
            }
            /**
             * Fetches the given column by the canonical column name or by an alias, and
             * validates the type of the first few cells. If the first defined cell is
             * of type number, it assumes for performance reasons, that all cells are of
             * type number or `null`. Otherwise it will convert all cells to number
             * type, except `null`.
             *
             * @function Highcharts.DataTable#getColumnAsNumbers
             *
             * @param {string} columnNameOrAlias
             * Name or alias of the column to get, alias takes precedence.
             *
             * @param {boolean} [useNaN]
             * Whether to use NaN instead of `null` and `undefined`.
             *
             * @return {Array<(number|null)>}
             * A copy of the column, or an empty array if not found.
             */
            getColumnAsNumbers(columnNameOrAlias, useNaN) {
                const table = this, columns = table.columns;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = columns[columnNameOrAlias], columnAsNumber = [];
                if (column) {
                    const columnLength = column.length;
                    if (useNaN) {
                        for (let i = 0; i < columnLength; ++i) {
                            columnAsNumber.push(table.getCellAsNumber(columnNameOrAlias, i, true));
                        }
                    }
                    else {
                        for (let i = 0, cellValue; i < columnLength; ++i) {
                            cellValue = column[i];
                            if (typeof cellValue === 'number') {
                                // Assume unmixed data for performance reasons
                                return column.slice();
                            }
                            if (cellValue !== null &&
                                typeof cellValue !== 'undefined') {
                                break;
                            }
                        }
                        for (let i = 0; i < columnLength; ++i) {
                            columnAsNumber.push(table.getCellAsNumber(columnNameOrAlias, i));
                        }
                    }
                }
                return columnAsNumber;
            }
            /**
             * Fetches all column names.
             *
             * @function Highcharts.DataTable#getColumnNames
             *
             * @return {Array<string>}
             * Returns all column names.
             */
            getColumnNames() {
                const table = this, columnNames = Object.keys(table.columns);
                return columnNames;
            }
            /**
             * Retrieves all or the given columns.
             *
             * @function Highcharts.DataTable#getColumns
             *
             * @param {Array<string>} [columnNamesOrAliases]
             * Column names or aliases to retrieve. Aliases taking precedence.
             *
             * @param {boolean} [asReference]
             * Whether to return columns as a readonly reference.
             *
             * @return {Highcharts.DataTableColumnCollection}
             * Collection of columns. If a requested column was not found, it is
             * `undefined`.
             */
            getColumns(columnNamesOrAliases, asReference) {
                const table = this, tableAliasMap = table.aliases, tableColumns = table.columns, columns = {};
                columnNamesOrAliases = (columnNamesOrAliases || Object.keys(tableColumns));
                for (let i = 0, iEnd = columnNamesOrAliases.length, column, columnName; i < iEnd; ++i) {
                    columnName = columnNamesOrAliases[i];
                    column = tableColumns[(tableAliasMap[columnName] || columnName)];
                    if (column) {
                        columns[columnName] = (asReference ? column : column.slice());
                    }
                }
                return columns;
            }
            /**
             * Retrieves the modifier for the table.
             * @private
             *
             * @return {Highcharts.DataModifier|undefined}
             * Returns the modifier or `undefined`.
             */
            getModifier() {
                return this.modifier;
            }
            /**
             * Retrieves the row at a given index. This function is a simplified wrap of
             * {@link getRows}.
             *
             * @function Highcharts.DataTable#getRow
             *
             * @param {number} rowIndex
             * Row index to retrieve. First row has index 0.
             *
             * @param {Array<string>} [columnNamesOrAliases]
             * Column names or aliases in order to retrieve.
             *
             * @return {Highcharts.DataTableRow}
             * Returns the row values, or `undefined` if not found.
             */
            getRow(rowIndex, columnNamesOrAliases) {
                return this.getRows(rowIndex, 1, columnNamesOrAliases)[0];
            }
            /**
             * Returns the number of rows in this table.
             *
             * @function Highcharts.DataTable#getRowCount
             *
             * @return {number}
             * Number of rows in this table.
             */
            getRowCount() {
                // @todo Implement via property getter `.length` browsers supported
                return this.rowCount;
            }
            /**
             * Retrieves the index of the first row matching a specific cell value.
             *
             * @function Highcharts.DataTable#getRowIndexBy
             *
             * @param {string} columnNameOrAlias
             * Column to search in.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Cell value to search for. `NaN` and `undefined` are not supported.
             *
             * @param {number} [rowIndexOffset]
             * Index offset to start searching.
             *
             * @return {number|undefined}
             * Index of the first row matching the cell value.
             */
            getRowIndexBy(columnNameOrAlias, cellValue, rowIndexOffset) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                if (column) {
                    const rowIndex = column.indexOf(cellValue, rowIndexOffset);
                    if (rowIndex !== -1) {
                        return rowIndex;
                    }
                }
            }
            /**
             * Retrieves the row at a given index. This function is a simplified wrap of
             * {@link getRowObjects}.
             *
             * @function Highcharts.DataTable#getRowObject
             *
             * @param {number} rowIndex
             * Row index.
             *
             * @param {Array<string>} [columnNamesOrAliases]
             * Column names or aliases and their order to retrieve.
             *
             * @return {Highcharts.DataTableRowObject}
             * Returns the row values, or `undefined` if not found.
             */
            getRowObject(rowIndex, columnNamesOrAliases) {
                return this.getRowObjects(rowIndex, 1, columnNamesOrAliases)[0];
            }
            /**
             * Fetches all or a number of rows.
             *
             * @function Highcharts.DataTable#getRowObjects
             *
             * @param {number} [rowIndex]
             * Index of the first row to fetch. Defaults to first row at index `0`.
             *
             * @param {number} [rowCount]
             * Number of rows to fetch. Defaults to maximal number of rows.
             *
             * @param {Array<string>} [columnNamesOrAliases]
             * Column names or aliases and their order to retrieve.
             *
             * @return {Highcharts.DataTableRowObject}
             * Returns retrieved rows.
             */
            getRowObjects(rowIndex = 0, rowCount = (this.rowCount - rowIndex), columnNamesOrAliases) {
                const table = this, aliases = table.aliases, columns = table.columns, rows = new Array(rowCount);
                columnNamesOrAliases = (columnNamesOrAliases || Object.keys(columns));
                for (let i = rowIndex, i2 = 0, iEnd = Math.min(table.rowCount, (rowIndex + rowCount)), column, row; i < iEnd; ++i, ++i2) {
                    row = rows[i2] = {};
                    for (const columnName of columnNamesOrAliases) {
                        column = columns[(aliases[columnName] || columnName)];
                        row[columnName] = (column ? column[i] : void 0);
                    }
                }
                return rows;
            }
            /**
             * Fetches all or a number of rows.
             *
             * @function Highcharts.DataTable#getRows
             *
             * @param {number} [rowIndex]
             * Index of the first row to fetch. Defaults to first row at index `0`.
             *
             * @param {number} [rowCount]
             * Number of rows to fetch. Defaults to maximal number of rows.
             *
             * @param {Array<string>} [columnNamesOrAliases]
             * Column names or aliases and their order to retrieve.
             *
             * @return {Highcharts.DataTableRow}
             * Returns retrieved rows.
             */
            getRows(rowIndex = 0, rowCount = (this.rowCount - rowIndex), columnNamesOrAliases) {
                const table = this, aliases = table.aliases, columns = table.columns, rows = new Array(rowCount);
                columnNamesOrAliases = (columnNamesOrAliases || Object.keys(columns));
                for (let i = rowIndex, i2 = 0, iEnd = Math.min(table.rowCount, (rowIndex + rowCount)), column, row; i < iEnd; ++i, ++i2) {
                    row = rows[i2] = [];
                    for (const columnName of columnNamesOrAliases) {
                        column = columns[(aliases[columnName] || columnName)];
                        row.push(column ? column[i] : void 0);
                    }
                }
                return rows;
            }
            /**
             * Returns the unique version tag of the current state of the table.
             *
             * @function Highcharts.DataTable#getVersionTag
             *
             * @return {string}
             * Unique version tag.
             */
            getVersionTag() {
                return this.versionTag;
            }
            /**
             * Checks for given column names or aliases.
             *
             * @function Highcharts.DataTable#hasColumns
             *
             * @param {Array<string>} columnNamesOrAliases
             * Column names of aliases to check.
             *
             * @return {boolean}
             * Returns `true` if all columns have been found, otherwise `false`.
             */
            hasColumns(columnNamesOrAliases) {
                const table = this, aliases = table.aliases, columns = table.columns;
                for (let i = 0, iEnd = columnNamesOrAliases.length, columnName; i < iEnd; ++i) {
                    columnName = columnNamesOrAliases[i];
                    if (!columns[columnName] && !aliases[columnName]) {
                        return false;
                    }
                }
                return true;
            }
            /**
             * Searches for a specific cell value.
             *
             * @function Highcharts.DataTable#hasRowWith
             *
             * @param {string} columnNameOrAlias
             * Column to search in.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Cell value to search for. `NaN` and `undefined` are not supported.
             *
             * @return {boolean}
             * True, if a row has been found, otherwise false.
             */
            hasRowWith(columnNameOrAlias, cellValue) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                if (column) {
                    return (column.indexOf(cellValue) !== -1);
                }
                return false;
            }
            /**
             * Registers a callback for a specific event.
             *
             * @function Highcharts.DataTable#on
             *
             * @param {string} type
             * Event type as a string.
             *
             * @param {Highcharts.EventCallbackFunction<Highcharts.DataTable>} callback
             * Function to register for an event callback.
             *
             * @return {Function}
             * Function to unregister callback from the event.
             */
            on(type, callback) {
                return addEvent(this, type, callback);
            }
            /**
             * Renames a column of cell values.
             *
             * @function Highcharts.DataTable#renameColumn
             *
             * @param {string} columnName
             * Name of the column to be renamed.
             *
             * @param {string} newColumnName
             * New name of the column. An existing column with the same name will be
             * replaced.
             *
             * @return {boolean}
             * Returns `true` if successful, `false` if the column was not found.
             */
            renameColumn(columnName, newColumnName) {
                const table = this, columns = table.columns;
                if (columns[columnName]) {
                    if (columnName !== newColumnName) {
                        const aliases = table.aliases;
                        if (aliases[newColumnName]) {
                            delete aliases[newColumnName];
                        }
                        columns[newColumnName] = columns[columnName];
                        delete columns[columnName];
                    }
                    return true;
                }
                return false;
            }
            /**
             * Sets a cell value based on the row index and column name or alias.  Will
             * insert a new column, if not found.
             *
             * @function Highcharts.DataTable#setCell
             *
             * @param {string} columnNameOrAlias
             * Column name or alias to set.
             *
             * @param {number|undefined} rowIndex
             * Row index to set.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Cell value to set.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits #setCell
             * @emits #afterSetCell
             */
            setCell(columnNameOrAlias, rowIndex, cellValue, eventDetail) {
                const table = this, columns = table.columns, modifier = table.modifier;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                let column = columns[columnNameOrAlias];
                if (column && column[rowIndex] === cellValue) {
                    return;
                }
                table.emit({
                    type: 'setCell',
                    cellValue,
                    columnName: columnNameOrAlias,
                    detail: eventDetail,
                    rowIndex
                });
                if (!column) {
                    column = columns[columnNameOrAlias] = new Array(table.rowCount);
                }
                if (rowIndex >= table.rowCount) {
                    table.rowCount = (rowIndex + 1);
                }
                column[rowIndex] = cellValue;
                if (modifier) {
                    modifier.modifyCell(table, columnNameOrAlias, rowIndex, cellValue);
                }
                table.emit({
                    type: 'afterSetCell',
                    cellValue,
                    columnName: columnNameOrAlias,
                    detail: eventDetail,
                    rowIndex
                });
            }
            /**
             * Sets cell values for a column. Will insert a new column, if not found.
             *
             * @function Highcharts.DataTable#setColumn
             *
             * @param {string} columnNameOrAlias
             * Column name or alias to set.
             *
             * @param {Highcharts.DataTableColumn} [column]
             * Values to set in the column.
             *
             * @param {number} [rowIndex=0]
             * Index of the first row to change. (Default: 0)
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits #setColumns
             * @emits #afterSetColumns
             */
            setColumn(columnNameOrAlias, column = [], rowIndex = 0, eventDetail) {
                this.setColumns({ [columnNameOrAlias]: column }, rowIndex, eventDetail);
            }
            /**
             * Sets cell values for multiple columns. Will insert new columns, if not
             * found.
             *
             * @function Highcharts.DataTable#setColumns
             *
             * @param {Highcharts.DataTableColumnCollection} columns
             * Columns as a collection, where the keys are the column names or aliases.
             *
             * @param {number} [rowIndex]
             * Index of the first row to change. Keep undefined to reset.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits #setColumns
             * @emits #afterSetColumns
             */
            setColumns(columns, rowIndex, eventDetail) {
                const table = this, tableColumns = table.columns, tableModifier = table.modifier, reset = (typeof rowIndex === 'undefined'), columnNames = Object.keys(columns);
                table.emit({
                    type: 'setColumns',
                    columns,
                    columnNames,
                    detail: eventDetail,
                    rowIndex
                });
                for (let i = 0, iEnd = columnNames.length, column, columnName; i < iEnd; ++i) {
                    columnName = columnNames[i];
                    column = columns[columnName];
                    columnName = (table.aliases[columnName] ||
                        columnName);
                    if (reset) {
                        tableColumns[columnName] = column.slice();
                        table.rowCount = column.length;
                    }
                    else {
                        const tableColumn = (tableColumns[columnName] ?
                            tableColumns[columnName] :
                            tableColumns[columnName] = new Array(table.rowCount));
                        for (let i = (rowIndex || 0), iEnd = column.length; i < iEnd; ++i) {
                            tableColumn[i] = column[i];
                        }
                        table.rowCount = Math.max(table.rowCount, tableColumn.length);
                    }
                }
                const tableColumnNames = Object.keys(tableColumns);
                for (let i = 0, iEnd = tableColumnNames.length; i < iEnd; ++i) {
                    tableColumns[tableColumnNames[i]].length = table.rowCount;
                }
                if (tableModifier) {
                    tableModifier.modifyColumns(table, columns, (rowIndex || 0));
                }
                table.emit({
                    type: 'afterSetColumns',
                    columns,
                    columnNames,
                    detail: eventDetail,
                    rowIndex
                });
            }
            /**
             * Sets or unsets the modifier for the table.
             * @private
             *
             * @param {Highcharts.DataModifier} [modifier]
             * Modifier to set, or `undefined` to unset.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Promise<Highcharts.DataTable>}
             * Resolves to this table if successfull, or rejects on failure.
             *
             * @emits #setModifier
             * @emits #afterSetModifier
             */
            setModifier(modifier, eventDetail) {
                const table = this;
                let promise;
                table.emit({
                    type: 'setModifier',
                    detail: eventDetail,
                    modifier,
                    modified: table.modified
                });
                table.modified = table;
                table.modifier = modifier;
                if (modifier) {
                    promise = modifier.modify(table);
                }
                else {
                    promise = Promise.resolve(table);
                }
                return promise
                    .then((table) => {
                    table.emit({
                        type: 'afterSetModifier',
                        detail: eventDetail,
                        modifier,
                        modified: table.modified
                    });
                    return table;
                })['catch']((error) => {
                    table.emit({
                        type: 'setModifierError',
                        error,
                        modifier,
                        modified: table.modified
                    });
                    throw error;
                });
            }
            /**
             * Sets cell values of a row. Will insert a new row, if no index was
             * provided, or if the index is higher than the total number of table rows.
             *
             * Note: This function is just a simplified wrap of
             * {@link Highcharts.DataTable#setRows}.
             *
             * @function Highcharts.DataTable#setRow
             *
             * @param {Highcharts.DataTableRow|Highcharts.DataTableRowObject} row
             * Cell values to set.
             *
             * @param {number} [rowIndex]
             * Index of the row to set. Leave `undefind` to add as a new row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits #setRows
             * @emits #afterSetRows
             */
            setRow(row, rowIndex, eventDetail) {
                this.setRows([row], rowIndex, eventDetail);
            }
            /**
             * Sets cell values for multiple rows. Will insert new rows, if no index was
             * was provided, or if the index is higher than the total number of table
             * rows.
             *
             * @function Highcharts.DataTable#setRows
             *
             * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
             * Row values to set.
             *
             * @param {number} [rowIndex]
             * Index of the first row to set. Leave `undefind` to add as new rows.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits #setRows
             * @emits #afterSetRows
             */
            setRows(rows, rowIndex = this.rowCount, eventDetail) {
                const table = this, aliases = table.aliases, columns = table.columns, columnNames = Object.keys(columns), modifier = table.modifier, rowCount = rows.length;
                table.emit({
                    type: 'setRows',
                    detail: eventDetail,
                    rowCount,
                    rowIndex,
                    rows
                });
                for (let i = 0, i2 = rowIndex, row; i < rowCount; ++i, ++i2) {
                    row = rows[i];
                    if (row === DataTable.NULL) {
                        for (let j = 0, jEnd = columnNames.length; j < jEnd; ++j) {
                            columns[columnNames[j]][i2] = null;
                        }
                    }
                    else if (row instanceof Array) {
                        for (let j = 0, jEnd = columnNames.length; j < jEnd; ++j) {
                            columns[columnNames[j]][i2] = row[j];
                        }
                    }
                    else {
                        const rowColumnNames = Object.keys(row);
                        for (let j = 0, jEnd = rowColumnNames.length, rowColumnName; j < jEnd; ++j) {
                            rowColumnName = rowColumnNames[j];
                            rowColumnName = (aliases[rowColumnName] || rowColumnName);
                            if (!columns[rowColumnName]) {
                                columns[rowColumnName] = new Array(i2 + 1);
                            }
                            columns[rowColumnName][i2] = row[rowColumnName];
                        }
                    }
                }
                const indexRowCount = (rowIndex + rowCount);
                if (indexRowCount > table.rowCount) {
                    table.rowCount = indexRowCount;
                    for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                        columns[columnNames[i]].length = indexRowCount;
                    }
                }
                if (modifier) {
                    modifier.modifyRows(table, rows, rowIndex);
                }
                table.emit({
                    type: 'afterSetRows',
                    detail: eventDetail,
                    rowCount,
                    rowIndex,
                    rows
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Null state for a row record. In some cases, a row in a table may not
         * contain any data or may be invalid. In these cases, a null state can be
         * used to indicate that the row record is empty or invalid.
         *
         * @name Highcharts.DataTable.NULL
         * @type {Highcharts.DataTableRowObject}
         *
         * @see {@link Highcharts.DataTable.isNull} for a null test.
         *
         * @example
         * table.setRows([DataTable.NULL, DataTable.NULL], 10);
         */
        DataTable.NULL = {};
        /**
         * Semantic version string of the DataTable class.
         * @internal
         */
        DataTable.version = '1.0.0';
        /* *
         *
         *  Default Export
         *
         * */

        return DataTable;
    });
    _registerModule(_modules, 'Data/Connectors/DataConnector.js', [_modules['Data/Modifiers/DataModifier.js'], _modules['Data/DataTable.js'], _modules['Core/Utilities.js']], function (DataModifier, DataTable, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *
         * */
        const { addEvent, fireEvent, merge, pick } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Abstract class providing an interface for managing a DataConnector.
         *
         * @private
         */
        class DataConnector {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructor for the connector class.
             *
             * @param {DataConnector.UserOptions} [options]
             * Options to use in the connector.
             */
            constructor(options = {}) {
                this.table = new DataTable(options.dataTable);
                this.metadata = options.metadata || { columns: {} };
            }
            /**
             * Poll timer ID, if active.
             */
            get polling() {
                return !!this.polling;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Method for adding metadata for a single column.
             *
             * @param {string} name
             * The name of the column to be described.
             *
             * @param {DataConnector.MetaColumn} columnMeta
             * The metadata to apply to the column.
             */
            describeColumn(name, columnMeta) {
                const connector = this, columns = connector.metadata.columns;
                columns[name] = merge(columns[name] || {}, columnMeta);
            }
            /**
             * Method for applying columns meta information to the whole DataConnector.
             *
             * @param {Highcharts.Dictionary<DataConnector.MetaColumn>} columns
             * Pairs of column names and MetaColumn objects.
             */
            describeColumns(columns) {
                const connector = this, columnNames = Object.keys(columns);
                let columnName;
                while (typeof (columnName = columnNames.pop()) === 'string') {
                    connector.describeColumn(columnName, columns[columnName]);
                }
            }
            /**
             * Emits an event on the connector to all registered callbacks of this
             * event.
             *
             * @param {DataConnector.Event} [e]
             * Event object containing additional event information.
             */
            emit(e) {
                fireEvent(this, e.type, e);
            }
            /**
             * Returns the order of columns.
             *
             * @param {boolean} [usePresentationState]
             * Whether to use the column order of the presentation state of the table.
             *
             * @return {Array<string>|undefined}
             * Order of columns.
             */
            getColumnOrder(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            usePresentationState) {
                const connector = this, columns = connector.metadata.columns, names = Object.keys(columns || {});
                if (names.length) {
                    return names.sort((a, b) => (pick(columns[a].index, 0) - pick(columns[b].index, 0)));
                }
            }
            /**
             * Retrieves the columns of the dataTable,
             * applies column order from meta.
             *
             * @param {boolean} [usePresentationOrder]
             * Whether to use the column order of the presentation state of the table.
             *
             * @return {Highcharts.DataTableColumnCollection}
             * An object with the properties `columnNames` and `columnValues`
             */
            getSortedColumns(usePresentationOrder) {
                return this.table.getColumns(this.getColumnOrder(usePresentationOrder));
            }
            /**
             * The default load method, which fires the `afterLoad` event
             *
             * @return {Promise<DataConnector>}
             * The loaded connector.
             *
             * @emits DataConnector#afterLoad
             */
            load() {
                fireEvent(this, 'afterLoad', { table: this.table });
                return Promise.resolve(this);
            }
            /**
             * Registers a callback for a specific connector event.
             *
             * @param {string} type
             * Event type as a string.
             *
             * @param {DataEventEmitter.Callback} callback
             * Function to register for the connector callback.
             *
             * @return {Function}
             * Function to unregister callback from the connector event.
             */
            on(type, callback) {
                return addEvent(this, type, callback);
            }
            /**
             * The default save method, which fires the `afterSave` event.
             *
             * @return {Promise<DataConnector>}
             * The saved connector.
             *
             * @emits DataConnector#afterSave
             * @emits DataConnector#saveError
             */
            save() {
                fireEvent(this, 'saveError', { table: this.table });
                return Promise.reject(new Error('Not implemented'));
            }
            /**
             * Sets the index and order of columns.
             *
             * @param {Array<string>} columnNames
             * Order of columns.
             */
            setColumnOrder(columnNames) {
                const connector = this;
                for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                    connector.describeColumn(columnNames[i], { index: i });
                }
            }
            setModifierOptions(modifierOptions) {
                const ModifierClass = (modifierOptions &&
                    DataModifier.types[modifierOptions.type]);
                return this.table
                    .setModifier(ModifierClass ?
                    new ModifierClass(modifierOptions) :
                    void 0)
                    .then(() => this);
            }
            /**
             * Starts polling new data after the specific time span in milliseconds.
             *
             * @param {number} refreshTime
             * Refresh time in milliseconds between polls.
             */
            startPolling(refreshTime = 1000) {
                const connector = this;
                window.clearTimeout(connector._polling);
                connector._polling = window.setTimeout(() => connector
                    .load()['catch']((error) => connector.emit({
                    type: 'loadError',
                    error,
                    table: connector.table
                }))
                    .then(() => {
                    if (connector._polling) {
                        connector.startPolling(refreshTime);
                    }
                }), refreshTime);
            }
            /**
             * Stops polling data.
             */
            stopPolling() {
                const connector = this;
                window.clearTimeout(connector._polling);
                delete connector._polling;
            }
            /**
             * Retrieves metadata from a single column.
             *
             * @param {string} name
             * The identifier for the column that should be described
             *
             * @return {DataConnector.MetaColumn|undefined}
             * Returns a MetaColumn object if found.
             */
            whatIs(name) {
                return this.metadata.columns[name];
            }
        }
        /* *
         *
         *  Class Namespace
         *
         * */
        (function (DataConnector) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Constants
             *
             * */
            /**
             * Registry as a record object with connector names and their class.
             */
            DataConnector.types = {};
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Adds a connector class to the registry. The connector has to provide the
             * `DataConnector.options` property and the `DataConnector.load` method to
             * modify the table.
             *
             * @private
             *
             * @param {string} key
             * Registry key of the connector class.
             *
             * @param {DataConnectorType} DataConnectorClass
             * Connector class (aka class constructor) to register.
             *
             * @return {boolean}
             * Returns true, if the registration was successful. False is returned, if
             * their is already a connector registered with this key.
             */
            function registerType(key, DataConnectorClass) {
                return (!!key &&
                    !DataConnector.types[key] &&
                    !!(DataConnector.types[key] = DataConnectorClass));
            }
            DataConnector.registerType = registerType;
        })(DataConnector || (DataConnector = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return DataConnector;
    });
    _registerModule(_modules, 'Data/Converters/DataConverter.js', [_modules['Data/DataTable.js'], _modules['Core/Utilities.js']], function (DataTable, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *  - Sebastian Bochan
         *  - Gøran Slettemark
         *  - Torstein Hønsi
         *  - Wojciech Chmiel
         *
         * */
        const { addEvent, fireEvent, isNumber, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Base class providing an interface and basic methods for a DataConverter
         *
         * @private
         */
        class DataConverter {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the DataConverter.
             *
             * @param {DataConverter.UserOptions} [options]
             * Options for the DataConverter.
             */
            constructor(options) {
                /* *
                 *
                 *  Properties
                 *
                 * */
                /**
                 * A collection of available date formats.
                 */
                this.dateFormats = {
                    'YYYY/mm/dd': {
                        regex: /^([0-9]{4})([\-\.\/])([0-9]{1,2})\2([0-9]{1,2})$/,
                        parser: function (match) {
                            return (match ?
                                Date.UTC(+match[1], match[3] - 1, +match[4]) :
                                NaN);
                        }
                    },
                    'dd/mm/YYYY': {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{4})$/,
                        parser: function (match) {
                            return (match ?
                                Date.UTC(+match[4], match[3] - 1, +match[1]) :
                                NaN);
                        },
                        alternative: 'mm/dd/YYYY' // Different format with the same regex
                    },
                    'mm/dd/YYYY': {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{4})$/,
                        parser: function (match) {
                            return (match ?
                                Date.UTC(+match[4], match[1] - 1, +match[3]) :
                                NaN);
                        }
                    },
                    'dd/mm/YY': {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{2})$/,
                        parser: function (match) {
                            const d = new Date();
                            if (!match) {
                                return NaN;
                            }
                            let year = +match[4];
                            if (year > (d.getFullYear() - 2000)) {
                                year += 1900;
                            }
                            else {
                                year += 2000;
                            }
                            return Date.UTC(year, match[3] - 1, +match[1]);
                        },
                        alternative: 'mm/dd/YY' // Different format with the same regex
                    },
                    'mm/dd/YY': {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{2})$/,
                        parser: function (match) {
                            return (match ?
                                Date.UTC(+match[4] + 2000, match[1] - 1, +match[3]) :
                                NaN);
                        }
                    }
                };
                const mergedOptions = merge(DataConverter.defaultOptions, options);
                let regExpPoint = mergedOptions.decimalPoint;
                if (regExpPoint === '.' || regExpPoint === ',') {
                    regExpPoint = regExpPoint === '.' ? '\\.' : ',';
                    this.decimalRegExp =
                        new RegExp('^(-?[0-9]+)' + regExpPoint + '([0-9]+)$');
                }
                this.options = mergedOptions;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Converts a value to a boolean.
             *
             * @param {DataConverter.Type} value
             * Value to convert.
             *
             * @return {boolean}
             * Converted value as a boolean.
             */
            asBoolean(value) {
                if (typeof value === 'boolean') {
                    return value;
                }
                if (typeof value === 'string') {
                    return value !== '' && value !== '0' && value !== 'false';
                }
                return !!this.asNumber(value);
            }
            /**
             * Converts a value to a Date.
             *
             * @param {DataConverter.Type} value
             * Value to convert.
             *
             * @return {globalThis.Date}
             * Converted value as a Date.
             */
            asDate(value) {
                let timestamp;
                if (typeof value === 'string') {
                    timestamp = this.parseDate(value);
                }
                else if (typeof value === 'number') {
                    timestamp = value;
                }
                else if (value instanceof Date) {
                    return value;
                }
                else {
                    timestamp = this.parseDate(this.asString(value));
                }
                return new Date(timestamp);
            }
            /**
             * Casts a string value to it's guessed type
             *
             * @param {*} value
             * The value to examine.
             *
             * @return {number|string|Date}
             * The converted value.
             */
            asGuessedType(value) {
                const converter = this, typeMap = {
                    'number': converter.asNumber,
                    'Date': converter.asDate,
                    'string': converter.asString
                };
                return typeMap[converter.guessType(value)].call(converter, value);
            }
            /**
             * Converts a value to a number.
             *
             * @param {DataConverter.Type} value
             * Value to convert.
             *
             * @return {number}
             * Converted value as a number.
             */
            asNumber(value) {
                if (typeof value === 'number') {
                    return value;
                }
                if (typeof value === 'boolean') {
                    return value ? 1 : 0;
                }
                if (typeof value === 'string') {
                    const decimalRegex = this.decimalRegExp;
                    if (value.indexOf(' ') > -1) {
                        value = value.replace(/\s+/g, '');
                    }
                    if (decimalRegex) {
                        if (!decimalRegex.test(value)) {
                            return NaN;
                        }
                        value = value.replace(decimalRegex, '$1.$2');
                    }
                    return parseFloat(value);
                }
                if (value instanceof Date) {
                    return value.getDate();
                }
                if (value) {
                    return value.getRowCount();
                }
                return NaN;
            }
            /**
             * Converts a value to a string.
             *
             * @param {DataConverter.Type} value
             * Value to convert.
             *
             * @return {string}
             * Converted value as a string.
             */
            asString(value) {
                return '' + value;
            }
            /**
             * Tries to guess the date format
             *  - Check if either month candidate exceeds 12
             *  - Check if year is missing (use current year)
             *  - Check if a shortened year format is used (e.g. 1/1/99)
             *  - If no guess can be made, the user must be prompted
             * data is the data to deduce a format based on
             * @private
             *
             * @param {Array<string>} data
             * Data to check the format.
             *
             * @param {number} limit
             * Max data to check the format.
             *
             * @param {boolean} save
             * Whether to save the date format in the converter options.
             */
            deduceDateFormat(data, limit, save) {
                const parser = this, stable = [], max = [];
                let format = 'YYYY/mm/dd', thing, guessedFormat = [], i = 0, madeDeduction = false, 
                /// candidates = {},
                elem, j;
                if (!limit || limit > data.length) {
                    limit = data.length;
                }
                for (; i < limit; i++) {
                    if (typeof data[i] !== 'undefined' &&
                        data[i] && data[i].length) {
                        thing = data[i]
                            .trim()
                            .replace(/[-\.\/]/g, ' ')
                            .split(' ');
                        guessedFormat = [
                            '',
                            '',
                            ''
                        ];
                        for (j = 0; j < thing.length; j++) {
                            if (j < guessedFormat.length) {
                                elem = parseInt(thing[j], 10);
                                if (elem) {
                                    max[j] = (!max[j] || max[j] < elem) ? elem : max[j];
                                    if (typeof stable[j] !== 'undefined') {
                                        if (stable[j] !== elem) {
                                            stable[j] = false;
                                        }
                                    }
                                    else {
                                        stable[j] = elem;
                                    }
                                    if (elem > 31) {
                                        if (elem < 100) {
                                            guessedFormat[j] = 'YY';
                                        }
                                        else {
                                            guessedFormat[j] = 'YYYY';
                                        }
                                        /// madeDeduction = true;
                                    }
                                    else if (elem > 12 &&
                                        elem <= 31) {
                                        guessedFormat[j] = 'dd';
                                        madeDeduction = true;
                                    }
                                    else if (!guessedFormat[j].length) {
                                        guessedFormat[j] = 'mm';
                                    }
                                }
                            }
                        }
                    }
                }
                if (madeDeduction) {
                    // This handles a few edge cases with hard to guess dates
                    for (j = 0; j < stable.length; j++) {
                        if (stable[j] !== false) {
                            if (max[j] > 12 &&
                                guessedFormat[j] !== 'YY' &&
                                guessedFormat[j] !== 'YYYY') {
                                guessedFormat[j] = 'YY';
                            }
                        }
                        else if (max[j] > 12 && guessedFormat[j] === 'mm') {
                            guessedFormat[j] = 'dd';
                        }
                    }
                    // If the middle one is dd, and the last one is dd,
                    // the last should likely be year.
                    if (guessedFormat.length === 3 &&
                        guessedFormat[1] === 'dd' &&
                        guessedFormat[2] === 'dd') {
                        guessedFormat[2] = 'YY';
                    }
                    format = guessedFormat.join('/');
                    // If the caculated format is not valid, we need to present an
                    // error.
                }
                // Save the deduced format in the converter options.
                if (save) {
                    parser.options.dateFormat = format;
                }
                return format;
            }
            /**
             * Emits an event on the DataConverter instance.
             *
             * @param {DataConverter.Event} [e]
             * Event object containing additional event data
             */
            emit(e) {
                fireEvent(this, e.type, e);
            }
            /**
             * Initiates the data exporting. Should emit `exportError` on failure.
             *
             * @param {DataConnector} connector
             * Connector to export from.
             *
             * @param {DataConverter.Options} [options]
             * Options for the export.
             */
            export(
            /* eslint-disable @typescript-eslint/no-unused-vars */
            connector, options
            /* eslint-enable @typescript-eslint/no-unused-vars */
            ) {
                this.emit({
                    type: 'exportError',
                    columns: [],
                    headers: []
                });
                throw new Error('Not implemented');
            }
            /**
             * Getter for the data table.
             *
             * @return {DataTable}
             * Table of parsed data.
             */
            getTable() {
                throw new Error('Not implemented');
            }
            /**
             * Guesses the potential type of a string value for parsing CSV etc.
             *
             * @param {*} value
             * The value to examine.
             *
             * @return {'number'|'string'|'Date'}
             * Type string, either `string`, `Date`, or `number`.
             */
            guessType(value) {
                const converter = this;
                let result = 'string';
                if (typeof value === 'string') {
                    const trimedValue = converter.trim(`${value}`), decimalRegExp = converter.decimalRegExp;
                    let innerTrimedValue = converter.trim(trimedValue, true);
                    if (decimalRegExp) {
                        innerTrimedValue = (decimalRegExp.test(innerTrimedValue) ?
                            innerTrimedValue.replace(decimalRegExp, '$1.$2') :
                            '');
                    }
                    const floatValue = parseFloat(innerTrimedValue);
                    if (+innerTrimedValue === floatValue) {
                        // String is numeric
                        value = floatValue;
                    }
                    else {
                        // Determine if a date string
                        const dateValue = converter.parseDate(value);
                        result = isNumber(dateValue) ? 'Date' : 'string';
                    }
                }
                if (typeof value === 'number') {
                    // Greater than milliseconds in a year assumed timestamp
                    result = value > 365 * 24 * 3600 * 1000 ? 'Date' : 'number';
                }
                return result;
            }
            /**
             * Registers a callback for a specific event.
             *
             * @param {string} type
             * Event type as a string.
             *
             * @param {DataEventEmitter.Callback} callback
             * Function to register for an modifier callback.
             *
             * @return {Function}
             * Function to unregister callback from the modifier event.
             */
            on(type, callback) {
                return addEvent(this, type, callback);
            }
            /**
             * Initiates the data parsing. Should emit `parseError` on failure.
             *
             * @param {DataConverter.UserOptions} options
             * Options of the DataConverter.
             */
            parse(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            options) {
                this.emit({
                    type: 'parseError',
                    columns: [],
                    headers: []
                });
                throw new Error('Not implemented');
            }
            /**
             * Parse a date and return it as a number.
             *
             * @function Highcharts.Data#parseDate
             *
             * @param {string} value
             * Value to parse.
             *
             * @param {string} dateFormatProp
             * Which of the predefined date formats
             * to use to parse date values.
             */
            parseDate(value, dateFormatProp) {
                const converter = this, options = converter.options;
                let dateFormat = dateFormatProp || options.dateFormat, result = NaN, key, format, match;
                if (options.parseDate) {
                    result = options.parseDate(value);
                }
                else {
                    // Auto-detect the date format the first time
                    if (!dateFormat) {
                        for (key in converter.dateFormats) { // eslint-disable-line guard-for-in
                            format = converter.dateFormats[key];
                            match = value.match(format.regex);
                            if (match) {
                                // `converter.options.dateFormat` = dateFormat = key;
                                dateFormat = key;
                                // `converter.options.alternativeFormat` =
                                // format.alternative || '';
                                result = format.parser(match);
                                break;
                            }
                        }
                        // Next time, use the one previously found
                    }
                    else {
                        format = converter.dateFormats[dateFormat];
                        if (!format) {
                            // The selected format is invalid
                            format = converter.dateFormats['YYYY/mm/dd'];
                        }
                        match = value.match(format.regex);
                        if (match) {
                            result = format.parser(match);
                        }
                    }
                    // Fall back to Date.parse
                    if (!match) {
                        match = Date.parse(value);
                        // External tools like Date.js and MooTools extend Date object
                        // and returns a date.
                        if (typeof match === 'object' &&
                            match !== null &&
                            match.getTime) {
                            result = (match.getTime() -
                                match.getTimezoneOffset() *
                                    60000);
                            // Timestamp
                        }
                        else if (isNumber(match)) {
                            result = match - (new Date(match)).getTimezoneOffset() * 60000;
                            if ( // Reset dates without year in Chrome
                            value.indexOf('2001') === -1 &&
                                (new Date(result)).getFullYear() === 2001) {
                                result = NaN;
                            }
                        }
                    }
                }
                return result;
            }
            /**
             * Trim a string from whitespaces.
             *
             * @param {string} str
             * String to trim.
             *
             * @param {boolean} [inside=false]
             * Remove all spaces between numbers.
             *
             * @return {string}
             * Trimed string
             */
            trim(str, inside) {
                if (typeof str === 'string') {
                    str = str.replace(/^\s+|\s+$/g, '');
                    // Clear white space insdie the string, like thousands separators
                    if (inside && /^[0-9\s]+$/.test(str)) {
                        str = str.replace(/\s/g, '');
                    }
                }
                return str;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options
         */
        DataConverter.defaultOptions = {
            dateFormat: '',
            alternativeFormat: '',
            startColumn: 0,
            endColumn: Number.MAX_VALUE,
            startRow: 0,
            endRow: Number.MAX_VALUE,
            firstRowAsNames: true,
            switchRowsAndColumns: false
        };
        /* *
         *
         *  Class Namespace
         *
         * */
        /**
         * Additionally provided types for events and conversion.
         */
        (function (DataConverter) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Converts an array of columns to a table instance. Second dimension of the
             * array are the row cells.
             *
             * @param {Array<DataTable.Column>} [columns]
             * Array to convert.
             *
             * @param {Array<string>} [headers]
             * Column names to use.
             *
             * @return {DataTable}
             * Table instance from the arrays.
             */
            function getTableFromColumns(columns = [], headers = []) {
                const table = new DataTable();
                for (let i = 0, iEnd = Math.max(headers.length, columns.length); i < iEnd; ++i) {
                    table.setColumn(headers[i] || `${i}`, columns[i]);
                }
                return table;
            }
            DataConverter.getTableFromColumns = getTableFromColumns;
        })(DataConverter || (DataConverter = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return DataConverter;
    });
    _registerModule(_modules, 'Data/DataCursor.js', [], function () {
        /* *
         *
         *  (c) 2020-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Class
         *
         * */
        /**
         * This class manages state cursors pointing on {@link Data.DataTable}. It
         * creates a relation between states of the user interface and the table cells,
         * columns, or rows.
         *
         * @class
         * @name Data.DataCursor
         */
        class DataCursor {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(stateMap = {}) {
                this.emittingRegister = [];
                this.listenerMap = {};
                this.stateMap = stateMap;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * This function registers a listener for a specific state and table.
             *
             * @example
             * ```TypeScript
             * dataCursor.addListener(myTable.id, 'hover', (e: DataCursor.Event) => {
             *     if (e.cursor.type === 'position') {
             *         console.log(`Hover over row #${e.cursor.row}.`);
             *     }
             * });
             * ```
             *
             * @function #addListener
             *
             * @param {Data.DataCursor.TableId} tableId
             * The ID of the table to listen to.
             *
             * @param {Data.DataCursor.State} state
             * The state on the table to listen to.
             *
             * @param {Data.DataCursor.Listener} listener
             * The listener to register.
             *
             * @return {Data.DataCursor}
             * Returns the DataCursor instance for a call chain.
             */
            addListener(tableId, state, listener) {
                const listenerMap = this.listenerMap[tableId] = (this.listenerMap[tableId] ||
                    {});
                const listeners = listenerMap[state] = (listenerMap[state] ||
                    []);
                listeners.push(listener);
                return this;
            }
            /**
             * @private
             */
            buildEmittingTag(e) {
                return (e.cursor.type === 'position' ?
                    [
                        e.table.id,
                        e.cursor.column,
                        e.cursor.row,
                        e.cursor.state,
                        e.cursor.type
                    ] :
                    [
                        e.table.id,
                        e.cursor.columns,
                        e.cursor.firstRow,
                        e.cursor.lastRow,
                        e.cursor.state,
                        e.cursor.type
                    ]).join('\0');
            }
            // Implementation
            emitCursor(table, groupOrCursor, cursorOrEvent, eventOrLasting, lasting) {
                const cursor = (typeof groupOrCursor === 'object' ?
                    groupOrCursor :
                    cursorOrEvent), event = (typeof eventOrLasting === 'object' ?
                    eventOrLasting :
                    cursorOrEvent), group = (typeof groupOrCursor === 'string' ?
                    groupOrCursor :
                    void 0), tableId = table.id, state = cursor.state, listeners = (this.listenerMap[tableId] &&
                    this.listenerMap[tableId][state]);
                lasting = (lasting || eventOrLasting === true);
                if (listeners) {
                    const stateMap = this.stateMap[tableId] = (this.stateMap[tableId] ||
                        {});
                    const cursors = stateMap[cursor.state] || [];
                    if (lasting) {
                        if (!cursors.length) {
                            stateMap[cursor.state] = cursors;
                        }
                        if (DataCursor.getIndex(cursor, cursors) === -1) {
                            cursors.push(cursor);
                        }
                    }
                    const e = {
                        cursor,
                        cursors,
                        table
                    };
                    if (event) {
                        e.event = event;
                    }
                    if (group) {
                        e.group = group;
                    }
                    const emittingRegister = this.emittingRegister, emittingTag = this.buildEmittingTag(e);
                    if (emittingRegister.indexOf(emittingTag) >= 0) {
                        // Break call stack loops
                        return this;
                    }
                    try {
                        this.emittingRegister.push(emittingTag);
                        for (let i = 0, iEnd = listeners.length; i < iEnd; ++i) {
                            listeners[i].call(this, e);
                        }
                    }
                    finally {
                        const index = this.emittingRegister.indexOf(emittingTag);
                        if (index >= 0) {
                            this.emittingRegister.splice(index, 1);
                        }
                    }
                }
                return this;
            }
            /**
             * Removes a lasting state cursor.
             *
             * @function #remitCursor
             *
             * @param {string} tableId
             * ID of the related cursor table.
             *
             * @param {Data.DataCursor.Type} cursor
             * Copy or reference of the cursor.
             *
             * @return {Data.DataCursor}
             * Returns the DataCursor instance for a call chain.
             */
            remitCursor(tableId, cursor) {
                const cursors = (this.stateMap[tableId] &&
                    this.stateMap[tableId][cursor.state]);
                if (cursors) {
                    const index = DataCursor.getIndex(cursor, cursors);
                    if (index >= 0) {
                        cursors.splice(index, 1);
                    }
                }
                return this;
            }
            /**
             * This function removes a listener.
             *
             * @function #addListener
             *
             * @param {Data.DataCursor.TableId} tableId
             * The ID of the table the listener is connected to.
             *
             * @param {Data.DataCursor.State} state
             * The state on the table the listener is listening to.
             *
             * @param {Data.DataCursor.Listener} listener
             * The listener to deregister.
             *
             * @return {Data.DataCursor}
             * Returns the DataCursor instance for a call chain.
             */
            removeListener(tableId, state, listener) {
                const listeners = (this.listenerMap[tableId] &&
                    this.listenerMap[tableId][state]);
                if (listeners) {
                    const index = listeners.indexOf(listener);
                    if (index) {
                        listeners.splice(index, 1);
                    }
                }
                return this;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Semantic version string of the DataCursor class.
         * @internal
         */
        DataCursor.version = '1.0.0';
        /* *
         *
         *  Class Namespace
         *
         * */
        /**
         * @class Data.DataCursor
         */
        (function (DataCursor) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Finds the index of an cursor in an array.
             * @private
             */
            function getIndex(needle, cursors) {
                if (needle.type === 'position') {
                    for (let cursor, i = 0, iEnd = cursors.length; i < iEnd; ++i) {
                        cursor = cursors[i];
                        if (cursor.type === 'position' &&
                            cursor.state === needle.state &&
                            cursor.column === needle.column &&
                            cursor.row === needle.row) {
                            return i;
                        }
                    }
                }
                else {
                    const columnNeedle = JSON.stringify(needle.columns);
                    for (let cursor, i = 0, iEnd = cursors.length; i < iEnd; ++i) {
                        cursor = cursors[i];
                        if (cursor.type === 'range' &&
                            cursor.state === needle.state &&
                            cursor.firstRow === needle.firstRow &&
                            cursor.lastRow === needle.lastRow &&
                            JSON.stringify(cursor.columns) === columnNeedle) {
                            return i;
                        }
                    }
                }
                return -1;
            }
            DataCursor.getIndex = getIndex;
            /**
             * Checks whether two cursor share the same properties.
             * @private
             */
            function isEqual(cursorA, cursorB) {
                if (cursorA.type === 'position' && cursorB.type === 'position') {
                    return (cursorA.column === cursorB.column &&
                        cursorA.row === cursorB.row &&
                        cursorA.state === cursorB.state);
                }
                if (cursorA.type === 'range' && cursorB.type === 'range') {
                    return (cursorA.firstRow === cursorB.firstRow &&
                        cursorA.lastRow === cursorB.lastRow &&
                        (JSON.stringify(cursorA.columns) ===
                            JSON.stringify(cursorB.columns)));
                }
                return false;
            }
            DataCursor.isEqual = isEqual;
            /**
             * Checks whether a cursor is in a range.
             * @private
             */
            function isInRange(needle, range) {
                if (range.type === 'position') {
                    range = toRange(range);
                }
                if (needle.type === 'position') {
                    needle = toRange(needle, range);
                }
                const needleColumns = needle.columns;
                const rangeColumns = range.columns;
                return (needle.firstRow >= range.firstRow &&
                    needle.lastRow <= range.lastRow &&
                    (!needleColumns ||
                        !rangeColumns ||
                        needleColumns.every((column) => rangeColumns.indexOf(column) >= 0)));
            }
            DataCursor.isInRange = isInRange;
            /**
             * @private
             */
            function toPositions(cursor) {
                if (cursor.type === 'position') {
                    return [cursor];
                }
                const columns = (cursor.columns || []);
                const positions = [];
                const state = cursor.state;
                for (let row = cursor.firstRow, rowEnd = cursor.lastRow; row < rowEnd; ++row) {
                    if (!columns.length) {
                        positions.push({
                            type: 'position',
                            row,
                            state
                        });
                        continue;
                    }
                    for (let column = 0, columnEnd = columns.length; column < columnEnd; ++column) {
                        positions.push({
                            type: 'position',
                            column: columns[column],
                            row,
                            state
                        });
                    }
                }
                return positions;
            }
            DataCursor.toPositions = toPositions;
            /**
             * @private
             */
            function toRange(cursor, defaultRange) {
                if (cursor.type === 'range') {
                    return cursor;
                }
                const range = {
                    type: 'range',
                    firstRow: (cursor.row ??
                        (defaultRange && defaultRange.firstRow) ??
                        0),
                    lastRow: (cursor.row ??
                        (defaultRange && defaultRange.lastRow) ??
                        Number.MAX_VALUE),
                    state: cursor.state
                };
                if (typeof cursor.column !== 'undefined') {
                    range.columns = [cursor.column];
                }
                return range;
            }
            DataCursor.toRange = toRange;
        })(DataCursor || (DataCursor = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return DataCursor;
    });
    _registerModule(_modules, 'Data/DataPoolDefaults.js', [], function () {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        const DataPoolDefaults = {
            connectors: []
        };
        /* *
         *
         *  Export Defaults
         *
         * */

        return DataPoolDefaults;
    });
    _registerModule(_modules, 'Data/DataPool.js', [_modules['Data/Connectors/DataConnector.js'], _modules['Data/DataPoolDefaults.js'], _modules['Core/Utilities.js']], function (DataConnector, DataPoolDefaults, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Class
         *
         * */
        /**
         * Data pool to load connectors on-demand.
         *
         * @class
         * @name Data.DataPool
         *
         * @param {Data.DataPoolOptions} options
         * Pool options with all connectors.
         */
        class DataPool {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(options = DataPoolDefaults) {
                options.connectors = (options.connectors || []);
                this.connectors = {};
                this.options = options;
                this.waiting = {};
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Emits an event on this data pool to all registered callbacks of the given
             * event.
             * @private
             *
             * @param {DataTable.Event} e
             * Event object with event information.
             */
            emit(e) {
                U.fireEvent(this, e.type, e);
            }
            /**
             * Loads the connector.
             *
             * @function Data.DataPool#getConnector
             *
             * @param {string} connectorId
             * ID of the connector.
             *
             * @return {Promise<Data.DataConnector>}
             * Returns the connector.
             */
            getConnector(connectorId) {
                const connector = this.connectors[connectorId];
                // Already loaded
                if (connector) {
                    return Promise.resolve(connector);
                }
                let waitingList = this.waiting[connectorId];
                // Start loading
                if (!waitingList) {
                    waitingList = this.waiting[connectorId] = [];
                    const connectorOptions = this.getConnectorOptions(connectorId);
                    if (!connectorOptions) {
                        throw new Error(`Connector not found. (${connectorId})`);
                    }
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    this
                        .loadConnector(connectorOptions)
                        .then((connector) => {
                        delete this.waiting[connectorId];
                        for (let i = 0, iEnd = waitingList.length; i < iEnd; ++i) {
                            waitingList[i][0](connector);
                        }
                    })['catch']((error) => {
                        delete this.waiting[connectorId];
                        for (let i = 0, iEnd = waitingList.length; i < iEnd; ++i) {
                            waitingList[i][1](error);
                        }
                    });
                }
                // Add request to waiting list
                return new Promise((resolve, reject) => {
                    waitingList.push([resolve, reject]);
                });
            }
            /**
             * Returns the IDs of all connectors.
             *
             * @private
             *
             * @return {Array<string>}
             * Names of all connectors.
             */
            getConnectorIds() {
                const connectors = this.options.connectors, connectorIds = [];
                for (let i = 0, iEnd = connectors.length; i < iEnd; ++i) {
                    connectorIds.push(connectors[i].id);
                }
                return connectorIds;
            }
            /**
             * Loads the options of the connector.
             *
             * @private
             *
             * @param {string} connectorId
             * ID of the connector.
             *
             * @return {DataPoolConnectorOptions|undefined}
             * Returns the options of the connector, or `undefined` if not found.
             */
            getConnectorOptions(connectorId) {
                const connectors = this.options.connectors;
                for (let i = 0, iEnd = connectors.length; i < iEnd; ++i) {
                    if (connectors[i].id === connectorId) {
                        return connectors[i];
                    }
                }
            }
            /**
             * Loads the connector table.
             *
             * @function Data.DataPool#getConnectorTable
             *
             * @param {string} connectorId
             * ID of the connector.
             *
             * @return {Promise<Data.DataTable>}
             * Returns the connector table.
             */
            getConnectorTable(connectorId) {
                return this
                    .getConnector(connectorId)
                    .then((connector) => connector.table);
            }
            /**
             * Tests whether the connector has never been requested.
             *
             * @param {string} connectorId
             * Name of the connector.
             *
             * @return {boolean}
             * Returns `true`, if the connector has never been requested, otherwise
             * `false`.
             */
            isNewConnector(connectorId) {
                return !this.connectors[connectorId];
            }
            /**
             * Creates and loads the connector.
             *
             * @private
             *
             * @param {Data.DataPoolConnectorOptions} options
             * Options of connector.
             *
             * @return {Promise<Data.DataConnector>}
             * Returns the connector.
             */
            loadConnector(options) {
                return new Promise((resolve, reject) => {
                    this.emit({
                        type: 'load',
                        options
                    });
                    const ConnectorClass = DataConnector.types[options.type];
                    if (!ConnectorClass) {
                        throw new Error(`Connector type not found. (${options.type})`);
                    }
                    const connector = new ConnectorClass(options.options);
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    connector
                        .load()
                        .then((connector) => {
                        this.connectors[options.id] = connector;
                        this.emit({
                            type: 'afterLoad',
                            options
                        });
                        resolve(connector);
                    })['catch'](reject);
                });
            }
            /**
             * Registers a callback for a specific event.
             *
             * @function Highcharts.DataPool#on
             *
             * @param {string} type
             * Event type as a string.
             *
             * @param {Highcharts.EventCallbackFunction<Highcharts.DataPool>} callback
             * Function to register for an event callback.
             *
             * @return {Function}
             * Function to unregister callback from the event.
             */
            on(type, callback) {
                return U.addEvent(this, type, callback);
            }
            /**
             * Sets connector options under the specified `options.id`.
             *
             * @param {Data.DataPoolConnectorOptions} options
             * Connector options to set.
             */
            setConnectorOptions(options) {
                const connectors = this.options.connectors, instances = this.connectors;
                this.emit({
                    type: 'setConnectorOptions',
                    options
                });
                for (let i = 0, iEnd = connectors.length; i < iEnd; ++i) {
                    if (connectors[i].id === options.id) {
                        connectors.splice(i, 1);
                        break;
                    }
                }
                if (instances[options.id]) {
                    instances[options.id].stopPolling();
                    delete instances[options.id];
                }
                connectors.push(options);
                this.emit({
                    type: 'afterSetConnectorOptions',
                    options
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Semantic version string of the DataPool class.
         * @internal
         */
        DataPool.version = '1.0.0';
        /* *
         *
         *  Default Export
         *
         * */

        return DataPool;
    });
    _registerModule(_modules, 'Data/Formula/FormulaParser.js', [], function () {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Constants
         *
         * */
        /**
         * @private
         */
        const booleanRegExp = /^(?:FALSE|TRUE)/;
        /**
         * `.`-separated decimal.
         * @private
         */
        const decimal1RegExp = /^[+-]?\d+(?:\.\d+)?(?:e[+-]\d+)?/;
        /**
         * `,`-separated decimal.
         * @private
         */
        const decimal2RegExp = /^[+-]?\d+(?:,\d+)?(?:e[+-]\d+)?/;
        /**
         * - Group 1: Function name
         * @private
         */
        const functionRegExp = /^([A-Z][A-Z\d\.]*)\(/;
        /**
         * @private
         */
        const operatorRegExp = /^(?:[+\-*\/^<=>]|<=|=>)/;
        /**
         * - Group 1: Start column
         * - Group 2: Start row
         * - Group 3: End column
         * - Group 4: End row
         * @private
         */
        const rangeA1RegExp = /^(\$?[A-Z]+)(\$?\d+)\:(\$?[A-Z]+)(\$?\d+)/;
        /**
         * - Group 1: Start row
         * - Group 2: Start column
         * - Group 3: End row
         * - Group 4: End column
         * @private
         */
        const rangeR1C1RegExp = /^R(\d*|\[\d+\])C(\d*|\[\d+\])\:R(\d*|\[\d+\])C(\d*|\[\d+\])/;
        /**
         * - Group 1: Column
         * - Group 2: Row
         * @private
         */
        const referenceA1RegExp = /^(\$?[A-Z]+)(\$?\d+)(?![\:C])/;
        /**
         * - Group 1: Row
         * - Group 2: Column
         * @private
         */
        const referenceR1C1RegExp = /^R(\d*|\[\d+\])C(\d*|\[\d+\])(?!\:)/;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Extracts the inner string of the most outer parantheses.
         *
         * @private
         *
         * @param {string} text
         * Text string to extract from.
         *
         * @return {string}
         * Extracted parantheses. If not found an exception will be thrown.
         */
        function extractParantheses(text) {
            let parantheseLevel = 0;
            for (let i = 0, iEnd = text.length, char, parantheseStart = 1; i < iEnd; ++i) {
                char = text[i];
                if (char === '(') {
                    if (!parantheseLevel) {
                        parantheseStart = i + 1;
                    }
                    ++parantheseLevel;
                    continue;
                }
                if (char === ')') {
                    --parantheseLevel;
                    if (!parantheseLevel) {
                        return text.substring(parantheseStart, i);
                    }
                }
            }
            if (parantheseLevel > 0) {
                const error = new Error('Incomplete parantheses.');
                error.name = 'FormulaParseError';
                throw error;
            }
            return '';
        }
        /**
         * Extracts the inner string value.
         *
         * @private
         *
         * @param {string} text
         * Text string to extract from.
         *
         * @return {string}
         * Extracted string. If not found an exception will be thrown.
         */
        function extractString(text) {
            let start = -1;
            for (let i = 0, iEnd = text.length, char, escaping = false; i < iEnd; ++i) {
                char = text[i];
                if (char === '\\') {
                    escaping = !escaping;
                    continue;
                }
                if (escaping) {
                    escaping = false;
                    continue;
                }
                if (char === '"') {
                    if (start < 0) {
                        start = i;
                    }
                    else {
                        return text.substring(start + 1, i); // `ì` is excluding
                    }
                }
            }
            const error = new Error('Incomplete string.');
            error.name = 'FormulaParseError';
            throw error;
        }
        /**
         * Parses an argument string. Formula arrays with a single term will be
         * simplified to the term.
         *
         * @private
         *
         * @param {string} text
         * Argument string to parse.
         *
         * @param {boolean} alternativeSeparators
         * Whether to expect `;` as argument separator and `,` as decimal separator.
         *
         * @return {Formula|Function|Range|Reference|Value}
         * The recognized term structure.
         */
        function parseArgument(text, alternativeSeparators) {
            let match;
            // Check for a R1C1:R1C1 range notation
            match = text.match(rangeR1C1RegExp);
            if (match) {
                const beginColumnRelative = (match[2] === '' || match[2][0] === '[');
                const beginRowRelative = (match[1] === '' || match[1][0] === '[');
                const endColumnRelative = (match[4] === '' || match[4][0] === '[');
                const endRowRelative = (match[3] === '' || match[3][0] === '[');
                const range = {
                    type: 'range',
                    beginColumn: (beginColumnRelative ?
                        parseInt(match[2].substring(1, -1) || '0', 10) :
                        parseInt(match[2], 10) - 1),
                    beginRow: (beginRowRelative ?
                        parseInt(match[1].substring(1, -1) || '0', 10) :
                        parseInt(match[1], 10) - 1),
                    endColumn: (endColumnRelative ?
                        parseInt(match[4].substring(1, -1) || '0', 10) :
                        parseInt(match[4], 10) - 1),
                    endRow: (endRowRelative ?
                        parseInt(match[3].substring(1, -1) || '0', 10) :
                        parseInt(match[3], 10) - 1)
                };
                if (beginColumnRelative) {
                    range.beginColumnRelative = true;
                }
                if (beginRowRelative) {
                    range.beginRowRelative = true;
                }
                if (endColumnRelative) {
                    range.endColumnRelative = true;
                }
                if (endRowRelative) {
                    range.endRowRelative = true;
                }
                return range;
            }
            // Check for a A1:A1 range notation
            match = text.match(rangeA1RegExp);
            if (match) {
                const beginColumnRelative = match[1][0] !== '$';
                const beginRowRelative = match[2][0] !== '$';
                const endColumnRelative = match[3][0] !== '$';
                const endRowRelative = match[4][0] !== '$';
                const range = {
                    type: 'range',
                    beginColumn: parseReferenceColumn(beginColumnRelative ?
                        match[1] :
                        match[1].substring(1)) - 1,
                    beginRow: parseInt(beginRowRelative ?
                        match[2] :
                        match[2].substring(1), 10) - 1,
                    endColumn: parseReferenceColumn(endColumnRelative ?
                        match[3] :
                        match[3].substring(1)) - 1,
                    endRow: parseInt(endRowRelative ?
                        match[4] :
                        match[4].substring(1), 10) - 1
                };
                if (beginColumnRelative) {
                    range.beginColumnRelative = true;
                }
                if (beginRowRelative) {
                    range.beginRowRelative = true;
                }
                if (endColumnRelative) {
                    range.endColumnRelative = true;
                }
                if (endRowRelative) {
                    range.endRowRelative = true;
                }
                return range;
            }
            // Fallback to formula processing for other pattern types
            const formula = parseFormula(text, alternativeSeparators);
            return (formula.length === 1 && typeof formula[0] !== 'string' ?
                formula[0] :
                formula);
        }
        /**
         * Parse arguments string inside function parantheses.
         *
         * @private
         *
         * @param {string} text
         * Parantheses string of the function.
         *
         * @param {boolean} alternativeSeparators
         * Whether to expect `;` as argument separator and `,` as decimal separator.
         *
         * @return {Highcharts.FormulaArguments}
         * Parsed arguments array.
         */
        function parseArguments(text, alternativeSeparators) {
            const args = [], argumentsSeparator = (alternativeSeparators ? ';' : ',');
            let parantheseLevel = 0, term = '';
            for (let i = 0, iEnd = text.length, char; i < iEnd; ++i) {
                char = text[i];
                // Check for separator
                if (char === argumentsSeparator &&
                    !parantheseLevel &&
                    term) {
                    args.push(parseArgument(term, alternativeSeparators));
                    term = '';
                    // Check for a quoted string before skip logic
                }
                else if (char === '"' &&
                    !parantheseLevel &&
                    !term) {
                    const string = extractString(text.substring(i));
                    args.push(string);
                    i += string.length + 1; // Only +1 to cover ++i in for-loop
                    // Skip space and check paranthesis nesting
                }
                else if (char !== ' ') {
                    term += char;
                    if (char === '(') {
                        ++parantheseLevel;
                    }
                    else if (char === ')') {
                        --parantheseLevel;
                    }
                }
            }
            // Look for left-overs from last argument
            if (!parantheseLevel && term) {
                args.push(parseArgument(term, alternativeSeparators));
            }
            return args;
        }
        /**
         * Converts a spreadsheet formula string into a formula array. Throws a
         * `FormulaParserError` when the string can not be parsed.
         *
         * @private
         * @function Formula.parseFormula
         *
         * @param {string} text
         * Spreadsheet formula string, without the leading `=`.
         *
         * @param {boolean} alternativeSeparators
         * * `false` to expect `,` between arguments and `.` in decimals.
         * * `true` to expect `;` between arguments and `,` in decimals.
         *
         * @return {Formula.Formula}
         * Formula array representing the string.
         */
        function parseFormula(text, alternativeSeparators) {
            const decimalRegExp = (alternativeSeparators ?
                decimal2RegExp :
                decimal1RegExp), formula = [];
            let match, next = (text[0] === '=' ? text.substring(1) : text).trim();
            while (next) {
                // Check for an R1C1 reference notation
                match = next.match(referenceR1C1RegExp);
                if (match) {
                    const columnRelative = (match[2] === '' || match[2][0] === '[');
                    const rowRelative = (match[1] === '' || match[1][0] === '[');
                    const reference = {
                        type: 'reference',
                        column: (columnRelative ?
                            parseInt(match[2].substring(1, -1) || '0', 10) :
                            parseInt(match[2], 10) - 1),
                        row: (rowRelative ?
                            parseInt(match[1].substring(1, -1) || '0', 10) :
                            parseInt(match[1], 10) - 1)
                    };
                    if (columnRelative) {
                        reference.columnRelative = true;
                    }
                    if (rowRelative) {
                        reference.rowRelative = true;
                    }
                    formula.push(reference);
                    next = next.substring(match[0].length).trim();
                    continue;
                }
                // Check for an A1 reference notation
                match = next.match(referenceA1RegExp);
                if (match) {
                    const columnRelative = match[1][0] !== '$';
                    const rowRelative = match[2][0] !== '$';
                    const reference = {
                        type: 'reference',
                        column: parseReferenceColumn(columnRelative ?
                            match[1] :
                            match[1].substring(1)) - 1,
                        row: parseInt(rowRelative ?
                            match[2] :
                            match[2].substring(1), 10) - 1
                    };
                    if (columnRelative) {
                        reference.columnRelative = true;
                    }
                    if (rowRelative) {
                        reference.rowRelative = true;
                    }
                    formula.push(reference);
                    next = next.substring(match[0].length).trim();
                    continue;
                }
                // Check for a formula operator
                match = next.match(operatorRegExp);
                if (match) {
                    formula.push(match[0]);
                    next = next.substring(match[0].length).trim();
                    continue;
                }
                // Check for a boolean value
                match = next.match(booleanRegExp);
                if (match) {
                    formula.push(match[0] === 'TRUE');
                    next = next.substring(match[0].length).trim();
                    continue;
                }
                // Check for a number value
                match = next.match(decimalRegExp);
                if (match) {
                    formula.push(parseFloat(match[0]));
                    next = next.substring(match[0].length).trim();
                    continue;
                }
                // Check for a quoted string
                if (next[0] === '"') {
                    const string = extractString(next);
                    formula.push(string.substring(1, -1));
                    next = next.substring(string.length + 2).trim();
                    continue;
                }
                // Check for a function
                match = next.match(functionRegExp);
                if (match) {
                    next = next.substring(match[1].length).trim();
                    const parantheses = extractParantheses(next);
                    formula.push({
                        type: 'function',
                        name: match[1],
                        args: parseArguments(parantheses, alternativeSeparators)
                    });
                    next = next.substring(parantheses.length + 2).trim();
                    continue;
                }
                // Check for a formula in parantheses
                if (next[0] === '(') {
                    const paranteses = extractParantheses(next);
                    if (paranteses) {
                        formula
                            .push(parseFormula(paranteses, alternativeSeparators));
                        next = next.substring(paranteses.length + 2).trim();
                        continue;
                    }
                }
                // Something is not right
                const position = text.length - next.length, error = new Error('Unexpected character `' +
                    text.substring(position, position + 1) +
                    '` at position ' + (position + 1) +
                    '. (`...' + text.substring(position - 5, position + 6) + '...`)');
                error.name = 'FormulaParseError';
                throw error;
            }
            return formula;
        }
        /**
         * Converts a reference column `A` of `A1` into a number. Supports endless sizes
         * `ZZZ...`, just limited by integer precision.
         *
         * @private
         *
         * @param {string} text
         * Column string to convert.
         *
         * @return {number}
         * Converted column index.
         */
        function parseReferenceColumn(text) {
            let column = 0;
            for (let i = 0, iEnd = text.length, code, factor = text.length - 1; i < iEnd; ++i) {
                code = text.charCodeAt(i);
                if (code >= 65 && code <= 90) {
                    column += (code - 64) * Math.pow(26, factor);
                }
                --factor;
            }
            return column;
        }
        /* *
         *
         *  Default Export
         *
         * */
        const FormulaParser = {
            parseFormula
        };

        return FormulaParser;
    });
    _registerModule(_modules, 'Data/Formula/FormulaTypes.js', [], function () {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Constants
         *
         * */
        /**
         * Array of all possible operators.
         * @private
         */
        const operators = ['+', '-', '*', '/', '^', '=', '<', '<=', '>', '>='];
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Tests an item for a Formula array.
         *
         * @private
         *
         * @param {Highcharts.FormulaItem} item
         * Item to test.
         *
         * @return {boolean}
         * `true`, if the item is a formula (or argument) array.
         */
        function isFormula(item) {
            return item instanceof Array;
        }
        /**
         * Tests an item for a Function structure.
         *
         * @private
         *
         * @param {Highcharts.FormulaItem} item
         * Item to test.
         *
         * @return {boolean}
         * `true`, if the item is a formula function.
         */
        function isFunction(item) {
            return (typeof item === 'object' &&
                !(item instanceof Array) &&
                item.type === 'function');
        }
        /**
         * Tests an item for an Operator string.
         *
         * @private
         *
         * @param {Highcharts.FormulaItem} item
         * Item to test.
         *
         * @return {boolean}
         * `true`, if the item is an operator string.
         */
        function isOperator(item) {
            return (typeof item === 'string' &&
                operators.indexOf(item) >= 0);
        }
        /**
         * Tests an item for a Range structure.
         *
         * @private
         *
         * @param {Highcharts.FormulaItem} item
         * Item to test.
         *
         * @return {boolean}
         * `true`, if the item is a range.
         */
        function isRange(item) {
            return (typeof item === 'object' &&
                !(item instanceof Array) &&
                item.type === 'range');
        }
        /**
         * Tests an item for a Reference structure.
         *
         * @private
         *
         * @param {Highcharts.FormulaItem} item
         * Item to test.
         *
         * @return {boolean}
         * `true`, if the item is a reference.
         */
        function isReference(item) {
            return (typeof item === 'object' &&
                !(item instanceof Array) &&
                item.type === 'reference');
        }
        /**
         * Tests an item for a Value structure.
         *
         * @private
         *
         * @param {Highcharts.FormulaItem|null|undefined} item
         * Item to test.
         *
         * @return {boolean}
         * `true`, if the item is a value.
         */
        function isValue(item) {
            return (typeof item === 'boolean' ||
                typeof item === 'number' ||
                typeof item === 'string');
        }
        /* *
         *
         *  Default Export
         *
         * */
        const MathFormula = {
            isFormula,
            isFunction,
            isOperator,
            isRange,
            isReference,
            isValue
        };

        return MathFormula;
    });
    _registerModule(_modules, 'Data/Formula/FormulaProcessor.js', [_modules['Data/Formula/FormulaTypes.js']], function (FormulaTypes) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { isFormula, isFunction, isOperator, isRange, isReference, isValue } = FormulaTypes;
        /* *
         *
         *  Constants
         *
         * */
        const asLogicalStringRegExp = / */;
        const MAX_FALSE = Number.MAX_VALUE / 1.000000000001;
        const MAX_STRING = Number.MAX_VALUE / 1.000000000002;
        const MAX_TRUE = Number.MAX_VALUE;
        const operatorPriority = {
            '^': 3,
            '*': 2,
            '/': 2,
            '+': 1,
            '-': 1,
            '=': 0,
            '<': 0,
            '<=': 0,
            '>': 0,
            '>=': 0
        };
        const processorFunctions = {};
        const processorFunctionNameRegExp = /^[A-Z][A-Z\.]*$/;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Converts non-number types to logical numbers.
         *
         * @param {Highcharts.FormulaValue} value
         * Value to convert.
         *
         * @return {number}
         * Logical number value. `NaN` if not convertable.
         */
        function asLogicalNumber(value) {
            switch (typeof value) {
                case 'boolean':
                    return value ? MAX_TRUE : MAX_FALSE;
                case 'string':
                    return MAX_STRING;
                case 'number':
                    return value;
                default:
                    return NaN;
            }
        }
        /**
         * Converts strings to logical strings, while other types get passed through. In
         * logical strings the space character is the lowest value and letters are case
         * insensitive.
         *
         * @param {Highcharts.FormulaValue} value
         * Value to convert.
         *
         * @return {Highcharts.FormulaValue}
         * Logical string value or passed through value.
         */
        function asLogicalString(value) {
            if (typeof value === 'string') {
                return value.toLowerCase().replace(asLogicalStringRegExp, '\0');
            }
            return value;
        }
        /**
         * Converts non-number types to a logic number.
         *
         * @param {Highcharts.FormulaValue} value
         * Value to convert.
         *
         * @return {number}
         * Number value. `NaN` if not convertable.
         */
        function asNumber(value) {
            switch (typeof value) {
                case 'boolean':
                    return value ? 1 : 0;
                case 'string':
                    return parseFloat(value.replace(',', '.'));
                case 'number':
                    return value;
                default:
                    return NaN;
            }
        }
        /**
         * Process a basic operation of two given values.
         *
         * @private
         *
         * @param {Highcharts.FormulaOperator} operator
         * Operator between values.
         *
         * @param {Highcharts.FormulaValue} x
         * First value for operation.
         *
         * @param {Highcharts.FormulaValue} y
         * Second value for operation.
         *
         * @return {Highcharts.FormulaValue}
         * Operation result. `NaN` if operation is not support.
         */
        function basicOperation(operator, x, y) {
            switch (operator) {
                case '=':
                    return asLogicalString(x) === asLogicalString(y);
                case '<':
                    if (typeof x === typeof y) {
                        return asLogicalString(x) < asLogicalString(y);
                    }
                    return asLogicalNumber(x) < asLogicalNumber(y);
                case '<=':
                    if (typeof x === typeof y) {
                        return asLogicalString(x) <= asLogicalString(y);
                    }
                    return asLogicalNumber(x) <= asLogicalNumber(y);
                case '>':
                    if (typeof x === typeof y) {
                        return asLogicalString(x) > asLogicalString(y);
                    }
                    return asLogicalNumber(x) > asLogicalNumber(y);
                case '>=':
                    if (typeof x === typeof y) {
                        return asLogicalString(x) >= asLogicalString(y);
                    }
                    return asLogicalNumber(x) >= asLogicalNumber(y);
            }
            x = asNumber(x);
            y = asNumber(y);
            let result;
            switch (operator) {
                case '+':
                    result = x + y;
                    break;
                case '-':
                    result = x - y;
                    break;
                case '*':
                    result = x * y;
                    break;
                case '/':
                    result = x / y;
                    break;
                case '^':
                    result = Math.pow(x, y);
                    break;
                default:
                    return NaN;
            }
            // Limit decimal to 9 digits
            return (result % 1 ?
                Math.round(result * 1000000000) / 1000000000 :
                result);
        }
        /**
         * Converts an argument to Value and in case of a range to an array of Values.
         *
         * @function Highcharts.Formula.getArgumentValue
         *
         * @param {Highcharts.FormulaRange|Highcharts.FormulaTerm} arg
         * Formula range or term to convert.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {Highcharts.FormulaValue|Array<Highcharts.FormulaValue>}
         * Converted value.
         */
        function getArgumentValue(arg, table) {
            // Add value
            if (isValue(arg)) {
                return arg;
            }
            // Add values of a range
            if (isRange(arg)) {
                return (table && getRangeValues(arg, table) || []);
            }
            // Add values of a function
            if (isFunction(arg)) {
                return processFunction(arg, table);
            }
            // Process functions, operations, references with formula processor
            return processFormula((isFormula(arg) ? arg : [arg]), table);
        }
        /**
         * Converts all arguments to Values and in case of ranges to arrays of Values.
         *
         * @function Highcharts.Formula.getArgumentsValues
         *
         * @param {Highcharts.FormulaArguments} args
         * Formula arguments to convert.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {Array<(Highcharts.FormulaValue|Array<Highcharts.FormulaValue>)>}
         * Converted values.
         */
        function getArgumentsValues(args, table) {
            const values = [];
            for (let i = 0, iEnd = args.length; i < iEnd; ++i) {
                values.push(getArgumentValue(args[i], table));
            }
            return values;
        }
        /**
         * Extracts cell values from a table for a given range.
         *
         * @function Highcharts.Formula.getRangeValues
         *
         * @param {Highcharts.FormulaRange} range
         * Formula range to use.
         *
         * @param {Highcharts.DataTable} table
         * Table to extract from.
         *
         * @return {Array<Highcharts.FormulaValue>}
         * Extracted values.
         */
        function getRangeValues(range, table) {
            const columnNames = table
                .getColumnNames()
                .slice(range.beginColumn, range.endColumn + 1), values = [];
            for (let i = 0, iEnd = columnNames.length, cell; i < iEnd; ++i) {
                const cells = table.getColumn(columnNames[i], true) || [];
                for (let j = range.beginRow, jEnd = range.endRow + 1; j < jEnd; ++j) {
                    cell = cells[j];
                    if (typeof cell === 'string' &&
                        cell[0] === '=' &&
                        table !== table.modified) {
                        // Look in the modified table for formula result
                        cell = table.modified.getCell(columnNames[i], j);
                    }
                    values.push(isValue(cell) ? cell : NaN);
                }
            }
            return values;
        }
        /**
         * Extracts the cell value from a table for a given reference.
         *
         * @private
         *
         * @param {Highcharts.FormulaReference} reference
         * Formula reference to use.
         *
         * @param {Highcharts.DataTable} table
         * Table to extract from.
         *
         * @return {Highcharts.FormulaValue}
         * Extracted value. 'undefined' might also indicate that the cell was not found.
         */
        function getReferenceValue(reference, table) {
            const columnName = table.getColumnNames()[reference.column];
            if (columnName) {
                const cell = table.getCell(columnName, reference.row);
                if (typeof cell === 'string' &&
                    cell[0] === '=' &&
                    table !== table.modified) {
                    // Look in the modified table for formula result
                    const result = table.modified.getCell(columnName, reference.row);
                    return isValue(result) ? result : NaN;
                }
                return isValue(cell) ? cell : NaN;
            }
            return NaN;
        }
        /**
         * Processes a formula array on the given table. If the formula does not contain
         * references or ranges, then no table has to be provided.
         *
         * @private
         * @function Highcharts.processFormula
         *
         * @param {Highcharts.Formula} formula
         * Formula array to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {Highcharts.FormulaValue}
         * Result value of the process. `NaN` indicates an error.
         */
        function processFormula(formula, table) {
            let x;
            for (let i = 0, iEnd = formula.length, item, operator, result, y; i < iEnd; ++i) {
                item = formula[i];
                // Remember operator for operation on next item
                if (isOperator(item)) {
                    operator = item;
                    continue;
                }
                // Next item is a value
                if (isValue(item)) {
                    y = item;
                    // Next item is a formula and needs to get processed first
                }
                else if (isFormula(item)) {
                    y = processFormula(formula, table);
                    // Next item is a function call and needs to get processed first
                }
                else if (isFunction(item)) {
                    result = processFunction(item, table);
                    y = (isValue(result) ? result : NaN); // Arrays are not allowed here
                    // Next item is a reference and needs to get resolved
                }
                else if (isReference(item)) {
                    y = (table && getReferenceValue(item, table));
                }
                // If we have a next value, lets do the operation
                if (typeof y !== 'undefined') {
                    // Next value is our first value
                    if (typeof x === 'undefined') {
                        if (operator) {
                            x = basicOperation(operator, 0, y);
                        }
                        else {
                            x = y;
                        }
                        // Fail fast if no operator available
                    }
                    else if (!operator) {
                        return NaN;
                        // Regular next value
                    }
                    else {
                        const operator2 = formula[i + 1];
                        if (isOperator(operator2) &&
                            operatorPriority[operator2] > operatorPriority[operator]) {
                            y = basicOperation(operator2, y, processFormula(formula.slice(i + 2)));
                            i = iEnd;
                        }
                        x = basicOperation(operator, x, y);
                    }
                    operator = void 0;
                    y = void 0;
                }
            }
            return isValue(x) ? x : NaN;
        }
        /**
         * Process a function on the given table. If the arguments do not contain
         * references or ranges, then no table has to be provided.
         *
         * @private
         *
         * @param {Highcharts.FormulaFunction} formulaFunction
         * Formula function to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @param {Highcharts.FormulaReference} [reference]
         * Table cell reference to use for relative references and ranges.
         *
         * @return {Highcharts.FormulaValue|Array<Highcharts.FormulaValue>}
         * Result value (or values) of the process. `NaN` indicates an error.
         */
        function processFunction(formulaFunction, table, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        reference // @todo
        ) {
            const processor = processorFunctions[formulaFunction.name];
            if (processor) {
                try {
                    return processor(formulaFunction.args, table);
                }
                catch {
                    return NaN;
                }
            }
            const error = new Error(`Function "${formulaFunction.name}" not found.`);
            error.name = 'FormulaProcessError';
            throw error;
        }
        /**
         * Registers a function for the FormulaProcessor.
         *
         * @param {string} name
         * Name of the function in spreadsheets notation with upper case.
         *
         * @param {Highcharts.FormulaFunction} processorFunction
         * ProcessorFunction for the FormulaProcessor. This is an object so that it
         * can take additional parameter for future validation routines.
         *
         * @return {boolean}
         * Return true, if the ProcessorFunction has been registered.
         */
        function registerProcessorFunction(name, processorFunction) {
            return (processorFunctionNameRegExp.test(name) &&
                !processorFunctions[name] &&
                !!(processorFunctions[name] = processorFunction));
        }
        /**
         * Translates relative references and ranges in-place.
         *
         * @param {Highcharts.Formula} formula
         * Formula to translate references and ranges in.
         *
         * @param {number} [columnDelta=0]
         * Column delta to translate to. Negative translate back.
         *
         * @param {number} [rowDelta=0]
         * Row delta to translate to. Negative numbers translate back.
         *
         * @return {Highcharts.Formula}
         * Formula with translated reference and ranges. This formula is equal to the
         * first argument.
         */
        function translateReferences(formula, columnDelta = 0, rowDelta = 0) {
            for (let i = 0, iEnd = formula.length, item; i < iEnd; ++i) {
                item = formula[i];
                if (item instanceof Array) {
                    translateReferences(item, columnDelta, rowDelta);
                }
                else if (isFunction(item)) {
                    translateReferences(item.args, columnDelta, rowDelta);
                }
                else if (isRange(item)) {
                    if (item.beginColumnRelative) {
                        item.beginColumn += columnDelta;
                    }
                    if (item.beginRowRelative) {
                        item.beginRow += rowDelta;
                    }
                    if (item.endColumnRelative) {
                        item.endColumn += columnDelta;
                    }
                    if (item.endRowRelative) {
                        item.endRow += rowDelta;
                    }
                }
                else if (isReference(item)) {
                    if (item.columnRelative) {
                        item.column += columnDelta;
                    }
                    if (item.rowRelative) {
                        item.row += rowDelta;
                    }
                }
            }
            return formula;
        }
        /* *
         *
         *  Default Export
         *
         * */
        const FormulaProcessor = {
            asNumber,
            getArgumentValue,
            getArgumentsValues,
            getRangeValues,
            getReferenceValue,
            processFormula,
            processorFunctions,
            registerProcessorFunction,
            translateReferences
        };

        return FormulaProcessor;
    });
    _registerModule(_modules, 'Data/Formula/Functions/ABS.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { getArgumentValue } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `ABS(value)` implementation. Returns positive numbers.
         *
         * @private
         * @function Formula.processorFunctions.AND
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {Array<number>}
         * Result value of the process.
         */
        function ABS(args, table) {
            const value = getArgumentValue(args[0], table);
            switch (typeof value) {
                case 'number':
                    return Math.abs(value);
                case 'object': {
                    const values = [];
                    for (let i = 0, iEnd = value.length, value2; i < iEnd; ++i) {
                        value2 = value[i];
                        if (typeof value2 !== 'number') {
                            return NaN;
                        }
                        values.push(Math.abs(value2));
                    }
                    return values;
                }
                default:
                    return NaN;
            }
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('ABS', ABS);
        /* *
         *
         *  Default Export
         *
         * */

        return ABS;
    });
    _registerModule(_modules, 'Data/Formula/Functions/AND.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { getArgumentValue } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `AND(...tests)` implementation. Returns `TRUE`, if all test
         * results are not `0` or `FALSE`.
         *
         * @private
         * @function Formula.processorFunctions.AND
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {boolean}
         * Result value of the process.
         */
        function AND(args, table) {
            for (let i = 0, iEnd = args.length, value; i < iEnd; ++i) {
                value = getArgumentValue(args[i], table);
                if (!value ||
                    (typeof value === 'object' &&
                        !AND(value, table))) {
                    return false;
                }
            }
            return true;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('AND', AND);
        /* *
         *
         *  Default Export
         *
         * */

        return AND;
    });
    _registerModule(_modules, 'Data/Formula/Functions/AVERAGE.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { getArgumentsValues } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `AVERAGE(...values)` implementation. Calculates the average
         * of the given values that are numbers.
         *
         * @private
         * @function Formula.processorFunctions.AVERAGE
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {number}
         * Result value of the process.
         */
        function AVERAGE(args, table) {
            const values = getArgumentsValues(args, table);
            let count = 0, result = 0;
            for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
                value = values[i];
                switch (typeof value) {
                    case 'number':
                        if (!isNaN(value)) {
                            ++count;
                            result += value;
                        }
                        break;
                    case 'object':
                        for (let j = 0, jEnd = value.length, value2; j < jEnd; ++j) {
                            value2 = value[j];
                            if (typeof value2 === 'number' &&
                                !isNaN(value2)) {
                                ++count;
                                result += value2;
                            }
                        }
                        break;
                }
            }
            return (count ? (result / count) : 0);
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('AVERAGE', AVERAGE);
        /* *
         *
         *  Default Export
         *
         * */

        return AVERAGE;
    });
    _registerModule(_modules, 'Data/Formula/Functions/AVERAGEA.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { getArgumentValue } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `AVERAGEA(...values)` implementation. Calculates the
         * average of the given values. Strings and FALSE are calculated as 0.
         *
         * @private
         * @function Formula.processorFunctions.AVERAGEA
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {number}
         * Result value of the process.
         */
        function AVERAGEA(args, table) {
            let count = 0, result = 0;
            for (let i = 0, iEnd = args.length, value; i < iEnd; ++i) {
                value = getArgumentValue(args[i], table);
                switch (typeof value) {
                    case 'boolean':
                        ++count;
                        result += (value ? 1 : 0);
                        continue;
                    case 'number':
                        if (!isNaN(value)) {
                            ++count;
                            result += value;
                        }
                        continue;
                    case 'string':
                        ++count;
                        continue;
                    default:
                        for (let j = 0, jEnd = value.length, value2; j < jEnd; ++j) {
                            value2 = value[j];
                            switch (typeof value2) {
                                case 'boolean':
                                    ++count;
                                    result += (value2 ? 1 : 0);
                                    continue;
                                case 'number':
                                    if (!isNaN(value2)) {
                                        ++count;
                                        result += value2;
                                    }
                                    continue;
                                case 'string':
                                    ++count;
                                    continue;
                            }
                        }
                        continue;
                }
            }
            return (count ? (result / count) : 0);
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('AVERAGEA', AVERAGEA);
        /* *
         *
         *  Default Export
         *
         * */

        return AVERAGEA;
    });
    _registerModule(_modules, 'Data/Formula/Functions/COUNT.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `COUNT(...values)` implementation. Returns the count of
         * given values that are numbers.
         *
         * @private
         * @function Formula.processorFunctions.COUNT
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {number}
         * Result value of the process.
         */
        function COUNT(args, table) {
            const values = FormulaProcessor.getArgumentsValues(args, table);
            let count = 0;
            for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
                value = values[i];
                switch (typeof value) {
                    case 'number':
                        if (!isNaN(value)) {
                            ++count;
                        }
                        break;
                    case 'object':
                        count += COUNT(value, table);
                        break;
                }
            }
            return count;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('COUNT', COUNT);
        /* *
         *
         *  Default Export
         *
         * */

        return COUNT;
    });
    _registerModule(_modules, 'Data/Formula/Functions/COUNTA.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `COUNTA(...values)` implementation. Returns the count of
         * given values that are not empty.
         *
         * @private
         * @function Formula.processorFunctions.COUNT
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {number}
         * Result value of the process.
         */
        function COUNTA(args, table) {
            const values = FormulaProcessor.getArgumentsValues(args, table);
            let count = 0;
            for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
                value = values[i];
                switch (typeof value) {
                    case 'number':
                        if (isNaN(value)) {
                            continue;
                        }
                        break;
                    case 'object':
                        count += COUNTA(value, table);
                        continue;
                    case 'string':
                        if (!value) {
                            continue;
                        }
                        break;
                }
                ++count;
            }
            return count;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('COUNTA', COUNTA);
        /* *
         *
         *  Default Export
         *
         * */

        return COUNTA;
    });
    _registerModule(_modules, 'Data/Formula/Functions/IF.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { getArgumentValue } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `IF(test, value1, value2)` implementation. Returns one of
         * the values based on the test result. `value1` will be returned, if the test
         * result is not `0` or `FALSE`.
         *
         * @private
         * @function Formula.processorFunctions.IF
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {Highcharts.FormulaValue|Array<Highcharts.FormulaValue>}
         * Result value of the process.
         */
        function IF(args, table) {
            return (getArgumentValue(args[0], table) ?
                getArgumentValue(args[1], table) :
                getArgumentValue(args[2], table));
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('IF', IF);
        /* *
         *
         *  Default Export
         *
         * */

        return IF;
    });
    _registerModule(_modules, 'Data/Formula/Functions/ISNA.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { getArgumentValue } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `ISNA(value)` implementation. Returns TRUE if value is not
         * a number.
         *
         * @private
         * @function Formula.processorFunctions.ISNA
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {boolean}
         * Result value of the process.
         */
        function ISNA(args, table) {
            const value = getArgumentValue(args[0], table);
            return (typeof value !== 'number' || isNaN(value));
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('ISNA', ISNA);
        /* *
         *
         *  Default Export
         *
         * */

        return ISNA;
    });
    _registerModule(_modules, 'Data/Formula/Functions/MAX.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { getArgumentsValues } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `MAX(...values)` implementation. Calculates the largest
         * of the given values that are numbers.
         *
         * @private
         * @function Formula.processorFunctions.MAX
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {number}
         * Result value of the process.
         */
        function MAX(args, table) {
            const values = getArgumentsValues(args, table);
            let result = Number.NEGATIVE_INFINITY;
            for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
                value = values[i];
                switch (typeof value) {
                    case 'number':
                        if (value > result) {
                            result = value;
                        }
                        break;
                    case 'object':
                        value = MAX(value);
                        if (value > result) {
                            result = value;
                        }
                        break;
                }
            }
            return isFinite(result) ? result : 0;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('MAX', MAX);
        /* *
         *
         *  Default Export
         *
         * */

        return MAX;
    });
    _registerModule(_modules, 'Data/Formula/Functions/MEDIAN.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `MEDIAN(...values)` implementation. Calculates the median
         * average of the given values.
         *
         * @private
         * @function Formula.processorFunctions.MEDIAN
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to process.
         *
         * @return {number}
         * Result value of the process.
         */
        function MEDIAN(args, table) {
            const median = [], values = FormulaProcessor.getArgumentsValues(args, table);
            for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
                value = values[i];
                switch (typeof value) {
                    case 'number':
                        if (!isNaN(value)) {
                            median.push(value);
                        }
                        break;
                    case 'object':
                        for (let j = 0, jEnd = value.length, value2; j < jEnd; ++j) {
                            value2 = value[j];
                            if (typeof value2 === 'number' &&
                                !isNaN(value2)) {
                                median.push(value2);
                            }
                        }
                        break;
                }
            }
            const count = median.length;
            if (!count) {
                return NaN;
            }
            const half = Math.floor(count / 2); // Floor because index starts at 0
            return (count % 2 ?
                median[half] : // Odd
                (median[half - 1] + median[half]) / 2 // Even
            );
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('MEDIAN', MEDIAN);
        /* *
         *
         *  Default Export
         *
         * */

        return MEDIAN;
    });
    _registerModule(_modules, 'Data/Formula/Functions/MIN.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { getArgumentsValues } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `MIN(...values)` implementation. Calculates the lowest
         * of the given values that are numbers.
         *
         * @private
         * @function Formula.processorFunctions.MIN
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {number}
         * Result value of the process.
         */
        function MIN(args, table) {
            const values = getArgumentsValues(args, table);
            let result = Number.POSITIVE_INFINITY;
            for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
                value = values[i];
                switch (typeof value) {
                    case 'number':
                        if (value < result) {
                            result = value;
                        }
                        break;
                    case 'object':
                        value = MIN(value);
                        if (value < result) {
                            result = value;
                        }
                        break;
                }
            }
            return isFinite(result) ? result : 0;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('MIN', MIN);
        /* *
         *
         *  Default Export
         *
         * */

        return MIN;
    });
    _registerModule(_modules, 'Data/Formula/Functions/MOD.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { getArgumentValue } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `MOD(value1, value2)` implementation. Calculates the rest
         * of the division with the given values.
         *
         * @private
         * @function Formula.processorFunctions.MOD
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {number}
         * Result value of the process.
         */
        function MOD(args, table) {
            let value1 = getArgumentValue(args[0], table), value2 = getArgumentValue(args[1], table);
            if (typeof value1 === 'object') {
                value1 = value1[0];
            }
            if (typeof value2 === 'object') {
                value2 = value2[0];
            }
            if (typeof value1 !== 'number' ||
                typeof value2 !== 'number' ||
                value2 === 0) {
                return NaN;
            }
            return value1 % value2;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('MOD', MOD);
        /* *
         *
         *  Default Export
         *
         * */

        return MOD;
    });
    _registerModule(_modules, 'Data/Formula/Functions/MODE.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Creates the mode map of the given arguments.
         *
         * @private
         * @function Formula.processorFunctions.MULT
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to process.
         *
         * @return {number}
         * Result value of the process.
         */
        function getModeMap(args, table) {
            const modeMap = {}, values = FormulaProcessor.getArgumentsValues(args, table);
            for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
                value = values[i];
                switch (typeof value) {
                    case 'number':
                        if (!isNaN(value)) {
                            modeMap[value] = (modeMap[value] || 0) + 1;
                        }
                        break;
                    case 'object':
                        for (let j = 0, jEnd = value.length, value2; j < jEnd; ++j) {
                            value2 = value[j];
                            if (typeof value2 === 'number' &&
                                !isNaN(value2)) {
                                modeMap[value2] = (modeMap[value2] || 0) + 1;
                            }
                        }
                        break;
                }
            }
            return modeMap;
        }
        /**
         * Processor for the `MODE.MULT(...values)` implementation. Calculates the most
         * frequent values of the give values.
         *
         * @private
         * @function Formula.processorFunctions.MULT
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to process.
         *
         * @return {number|Array<number>}
         * Result value of the process.
         */
        function MULT(args, table) {
            const modeMap = getModeMap(args, table), keys = Object.keys(modeMap);
            if (!keys.length) {
                return NaN;
            }
            let modeKeys = [parseFloat(keys[0])], modeCount = modeMap[keys[0]];
            for (let i = 1, iEnd = keys.length, key, count; i < iEnd; ++i) {
                key = keys[i];
                count = modeMap[key];
                if (modeCount < count) {
                    modeKeys = [parseFloat(key)];
                    modeCount = count;
                }
                else if (modeCount === count) {
                    modeKeys.push(parseFloat(key));
                }
            }
            return modeCount > 1 ? modeKeys : NaN;
        }
        /**
         * Processor for the `MODE.SNGL(...values)` implementation. Calculates the
         * lowest most frequent value of the give values.
         *
         * @private
         * @function Formula.processorFunctions['MODE.SNGL']
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to process.
         *
         * @return {number}
         * Result value of the process.
         */
        function SNGL(args, table) {
            const modeMap = getModeMap(args, table), keys = Object.keys(modeMap);
            if (!keys.length) {
                return NaN;
            }
            let modeKey = parseFloat(keys[0]), modeCount = modeMap[keys[0]];
            for (let i = 1, iEnd = keys.length, key, keyValue, count; i < iEnd; ++i) {
                key = keys[i];
                count = modeMap[key];
                if (modeCount < count) {
                    modeKey = parseFloat(key);
                    modeCount = count;
                }
                else if (modeCount === count) {
                    keyValue = parseFloat(key);
                    if (modeKey > keyValue) {
                        modeKey = keyValue;
                        modeCount = count;
                    }
                }
            }
            return modeCount > 1 ? modeKey : NaN;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('MODE', SNGL);
        FormulaProcessor.registerProcessorFunction('MODE.MULT', MULT);
        FormulaProcessor.registerProcessorFunction('MODE.SNGL', SNGL);
        /* *
         *
         *  Default Export
         *
         * */
        const MODE = {
            MULT,
            SNGL
        };

        return MODE;
    });
    _registerModule(_modules, 'Data/Formula/Functions/NOT.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { getArgumentValue } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `NOT(value)` implementation. Returns the opposite test
         * result.
         *
         * @private
         * @function Formula.processorFunctions.NOT
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {boolean|number}
         * Result value of the process.
         */
        function NOT(args, table) {
            let value = getArgumentValue(args[0], table);
            if (typeof value === 'object') {
                value = value[0];
            }
            switch (typeof value) {
                case 'boolean':
                case 'number':
                    return !value;
            }
            return NaN;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('NOT', NOT);
        /* *
         *
         *  Default Export
         *
         * */

        return NOT;
    });
    _registerModule(_modules, 'Data/Formula/Functions/OR.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { getArgumentValue } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `OR(...tests)` implementation. Returns `TRUE`, if one test
         * result is not `0` or `FALSE`.
         *
         * @private
         * @function Formula.processorFunctions.AND
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {boolean}
         * Result value of the process.
         */
        function OR(args, table) {
            for (let i = 0, iEnd = args.length, value; i < iEnd; ++i) {
                value = getArgumentValue(args[i], table);
                if (typeof value === 'object') {
                    if (OR(value, table)) {
                        return true;
                    }
                }
                else if (value) {
                    return true;
                }
            }
            return false;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('OR', OR);
        /* *
         *
         *  Default Export
         *
         * */

        return OR;
    });
    _registerModule(_modules, 'Data/Formula/Functions/PRODUCT.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { getArgumentsValues } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `PRODUCT(...values)` implementation. Calculates the product
         * of the given values.
         *
         * @private
         * @function Formula.processorFunctions.PRODUCT
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {number}
         * Result value of the process.
         */
        function PRODUCT(args, table) {
            const values = getArgumentsValues(args, table);
            let result = 1, calculated = false;
            for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
                value = values[i];
                switch (typeof value) {
                    case 'number':
                        if (!isNaN(value)) {
                            calculated = true;
                            result *= value;
                        }
                        break;
                    case 'object':
                        calculated = true;
                        result *= PRODUCT(value, table);
                        break;
                }
            }
            return (calculated ? result : 0);
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('PRODUCT', PRODUCT);
        /* *
         *
         *  Default Export
         *
         * */

        return PRODUCT;
    });
    _registerModule(_modules, 'Data/Formula/Functions/SUM.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `SUM(...values)` implementation. Calculates the sum of the
         * given values.
         *
         * @private
         * @function Formula.processorFunctions.SUM
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to process.
         *
         * @return {number}
         * Result value of the process.
         */
        function SUM(args, table) {
            const values = FormulaProcessor.getArgumentsValues(args, table);
            let result = 0;
            for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
                value = values[i];
                switch (typeof value) {
                    case 'number':
                        if (!isNaN(value)) {
                            result += value;
                        }
                        break;
                    case 'object':
                        result += SUM(value, table);
                        break;
                }
            }
            return result;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('SUM', SUM); // 🐝
        /* *
         *
         *  Default Export
         *
         * */

        return SUM;
    });
    _registerModule(_modules, 'Data/Formula/Functions/XOR.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { getArgumentValue } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `XOR(...tests)` implementation. Returns `TRUE`, if at least
         * one of the given tests differs in result of other tests.
         *
         * @private
         * @function Formula.processorFunctions.AND
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {boolean|number}
         * Result value of the process.
         */
        function XOR(args, table) {
            for (let i = 0, iEnd = args.length, lastValue, value; i < iEnd; ++i) {
                value = getArgumentValue(args[i], table);
                switch (typeof value) {
                    case 'boolean':
                    case 'number':
                        if (typeof lastValue === 'undefined') {
                            lastValue = !!value;
                        }
                        else if (!!value !== lastValue) {
                            return true;
                        }
                        break;
                    case 'object':
                        for (let j = 0, jEnd = value.length, value2; j < jEnd; ++j) {
                            value2 = value[j];
                            switch (typeof value2) {
                                case 'boolean':
                                case 'number':
                                    if (typeof lastValue === 'undefined') {
                                        lastValue = !!value2;
                                    }
                                    else if (!!value2 !== lastValue) {
                                        return true;
                                    }
                                    break;
                            }
                        }
                        break;
                }
            }
            return false;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('XOR', XOR);
        /* *
         *
         *  Default Export
         *
         * */

        return XOR;
    });
    _registerModule(_modules, 'Data/Formula/Formula.js', [_modules['Data/Formula/FormulaParser.js'], _modules['Data/Formula/FormulaProcessor.js'], _modules['Data/Formula/FormulaTypes.js']], function (FormulaParser, FormulaProcessor, FormulaType) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Imports
         *
         * */
        /* *
         *
         *  Default Export
         *
         * */
        /**
         * Formula engine to make use of spreadsheet formula strings.
         * @internal
         */
        const Formula = {
            ...FormulaParser,
            ...FormulaProcessor,
            ...FormulaType
        };

        return Formula;
    });
    _registerModule(_modules, 'Data/Converters/CSVConverter.js', [_modules['Data/Converters/DataConverter.js'], _modules['Core/Utilities.js']], function (DataConverter, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Christer Vasseng
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Handles parsing and transforming CSV to a table.
         *
         * @private
         */
        class CSVConverter extends DataConverter {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the CSV parser.
             *
             * @param {CSVConverter.UserOptions} [options]
             * Options for the CSV parser.
             */
            constructor(options) {
                const mergedOptions = merge(CSVConverter.defaultOptions, options);
                super(mergedOptions);
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.columns = [];
                this.headers = [];
                this.dataTypes = [];
                this.options = mergedOptions;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Creates a CSV string from the datatable on the connector instance.
             *
             * @param {DataConnector} connector
             * Connector instance to export from.
             *
             * @param {CSVConverter.Options} [options]
             * Options used for the export.
             *
             * @return {string}
             * CSV string from the connector table.
             */
            export(connector, options = this.options) {
                const { useLocalDecimalPoint, lineDelimiter } = options, exportNames = (this.options.firstRowAsNames !== false);
                let { decimalPoint, itemDelimiter } = options;
                if (!decimalPoint) {
                    decimalPoint = (itemDelimiter !== ',' && useLocalDecimalPoint ?
                        (1.1).toLocaleString()[1] :
                        '.');
                }
                if (!itemDelimiter) {
                    itemDelimiter = (decimalPoint === ',' ? ';' : ',');
                }
                const columns = connector.getSortedColumns(options.usePresentationOrder), columnNames = Object.keys(columns), csvRows = [], columnsCount = columnNames.length;
                const rowArray = [];
                // Add the names as the first row if they should be exported
                if (exportNames) {
                    csvRows.push(columnNames.map((columnName) => `"${columnName}"`).join(itemDelimiter));
                }
                for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
                    const columnName = columnNames[columnIndex], column = columns[columnName], columnLength = column.length;
                    const columnMeta = connector.whatIs(columnName);
                    let columnDataType;
                    if (columnMeta) {
                        columnDataType = columnMeta.dataType;
                    }
                    for (let rowIndex = 0; rowIndex < columnLength; rowIndex++) {
                        let cellValue = column[rowIndex];
                        if (!rowArray[rowIndex]) {
                            rowArray[rowIndex] = [];
                        }
                        // Prefer datatype from metadata
                        if (columnDataType === 'string') {
                            cellValue = '"' + cellValue + '"';
                        }
                        else if (typeof cellValue === 'number') {
                            cellValue = String(cellValue).replace('.', decimalPoint);
                        }
                        else if (typeof cellValue === 'string') {
                            cellValue = `"${cellValue}"`;
                        }
                        rowArray[rowIndex][columnIndex] = cellValue;
                        // On the final column, push the row to the CSV
                        if (columnIndex === columnsCount - 1) {
                            // Trim repeated undefined values starting at the end
                            // Currently, we export the first "comma" even if the
                            // second value is undefined
                            let i = columnIndex;
                            while (rowArray[rowIndex].length > 2) {
                                const cellVal = rowArray[rowIndex][i];
                                if (cellVal !== void 0) {
                                    break;
                                }
                                rowArray[rowIndex].pop();
                                i--;
                            }
                            csvRows.push(rowArray[rowIndex].join(itemDelimiter));
                        }
                    }
                }
                return csvRows.join(lineDelimiter);
            }
            /**
             * Initiates parsing of CSV
             *
             * @param {CSVConverter.UserOptions}[options]
             * Options for the parser
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits CSVDataParser#parse
             * @emits CSVDataParser#afterParse
             */
            parse(options, eventDetail) {
                const converter = this, dataTypes = converter.dataTypes, parserOptions = merge(this.options, options), { beforeParse, lineDelimiter, firstRowAsNames, itemDelimiter } = parserOptions;
                let lines, rowIt = 0, { csv, startRow, endRow } = parserOptions, column;
                converter.columns = [];
                converter.emit({
                    type: 'parse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.headers
                });
                if (csv && beforeParse) {
                    csv = beforeParse(csv);
                }
                if (csv) {
                    lines = csv
                        .replace(/\r\n|\r/g, '\n') // Windows | Mac
                        .split(lineDelimiter || '\n');
                    if (!startRow || startRow < 0) {
                        startRow = 0;
                    }
                    if (!endRow || endRow >= lines.length) {
                        endRow = lines.length - 1;
                    }
                    if (!itemDelimiter) {
                        converter.guessedItemDelimiter =
                            converter.guessDelimiter(lines);
                    }
                    // If the first row contain names, add them to the
                    // headers array and skip the row.
                    if (firstRowAsNames) {
                        const headers = lines[0].split(itemDelimiter || converter.guessedItemDelimiter || ',');
                        // Remove ""s from the headers
                        for (let i = 0; i < headers.length; i++) {
                            headers[i] = headers[i].trim().replace(/^["']|["']$/g, '');
                        }
                        converter.headers = headers;
                        startRow++;
                    }
                    let offset = 0;
                    for (rowIt = startRow; rowIt <= endRow; rowIt++) {
                        if (lines[rowIt][0] === '#') {
                            offset++;
                        }
                        else {
                            converter
                                .parseCSVRow(lines[rowIt], rowIt - startRow - offset);
                        }
                    }
                    if (dataTypes.length &&
                        dataTypes[0].length &&
                        dataTypes[0][1] === 'date' && // Format is a string date
                        !converter.options.dateFormat) {
                        converter.deduceDateFormat(converter.columns[0], null, true);
                    }
                    // Guess types.
                    for (let i = 0, iEnd = converter.columns.length; i < iEnd; ++i) {
                        column = converter.columns[i];
                        for (let j = 0, jEnd = column.length; j < jEnd; ++j) {
                            if (column[j] && typeof column[j] === 'string') {
                                let cellValue = converter.asGuessedType(column[j]);
                                if (cellValue instanceof Date) {
                                    cellValue = cellValue.getTime();
                                }
                                converter.columns[i][j] = cellValue;
                            }
                        }
                    }
                }
                converter.emit({
                    type: 'afterParse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.headers
                });
            }
            /**
             * Internal method that parses a single CSV row
             */
            parseCSVRow(columnStr, rowNumber) {
                const converter = this, columns = converter.columns || [], dataTypes = converter.dataTypes, { startColumn, endColumn } = converter.options, itemDelimiter = (converter.options.itemDelimiter ||
                    converter.guessedItemDelimiter);
                let { decimalPoint } = converter.options;
                if (!decimalPoint || decimalPoint === itemDelimiter) {
                    decimalPoint = converter.guessedDecimalPoint || '.';
                }
                let i = 0, c = '', token = '', actualColumn = 0, column = 0;
                const read = (j) => {
                    c = columnStr[j];
                };
                const pushType = (type) => {
                    if (dataTypes.length < column + 1) {
                        dataTypes.push([type]);
                    }
                    if (dataTypes[column][dataTypes[column].length - 1] !== type) {
                        dataTypes[column].push(type);
                    }
                };
                const push = () => {
                    if (startColumn > actualColumn || actualColumn > endColumn) {
                        // Skip this column, but increment the column count (#7272)
                        ++actualColumn;
                        token = '';
                        return;
                    }
                    // Save the type of the token.
                    if (typeof token === 'string') {
                        if (!isNaN(parseFloat(token)) && isFinite(token)) {
                            token = parseFloat(token);
                            pushType('number');
                        }
                        else if (!isNaN(Date.parse(token))) {
                            token = token.replace(/\//g, '-');
                            pushType('date');
                        }
                        else {
                            pushType('string');
                        }
                    }
                    else {
                        pushType('number');
                    }
                    if (columns.length < column + 1) {
                        columns.push([]);
                    }
                    // Try to apply the decimal point, and check if the token then is a
                    // number. If not, reapply the initial value
                    if (typeof token !== 'number' &&
                        converter.guessType(token) !== 'number' &&
                        decimalPoint) {
                        const initialValue = token;
                        token = token.replace(decimalPoint, '.');
                        if (converter.guessType(token) !== 'number') {
                            token = initialValue;
                        }
                    }
                    columns[column][rowNumber] = token;
                    token = '';
                    ++column;
                    ++actualColumn;
                };
                if (!columnStr.trim().length) {
                    return;
                }
                if (columnStr.trim()[0] === '#') {
                    return;
                }
                for (; i < columnStr.length; i++) {
                    read(i);
                    if (c === '#') {
                        // If there are hexvalues remaining (#13283)
                        if (!/^#[0-F]{3,3}|[0-F]{6,6}/i.test(columnStr.substring(i))) {
                            // The rest of the row is a comment
                            push();
                            return;
                        }
                    }
                    // Quoted string
                    if (c === '"') {
                        read(++i);
                        while (i < columnStr.length) {
                            if (c === '"') {
                                break;
                            }
                            token += c;
                            read(++i);
                        }
                    }
                    else if (c === itemDelimiter) {
                        push();
                        // Actual column data
                    }
                    else {
                        token += c;
                    }
                }
                push();
            }
            /**
             * Internal method that guesses the delimiter from the first
             * 13 lines of the CSV
             * @param {Array<string>} lines
             * The CSV, split into lines
             */
            guessDelimiter(lines) {
                let points = 0, commas = 0, guessed;
                const potDelimiters = {
                    ',': 0,
                    ';': 0,
                    '\t': 0
                }, linesCount = lines.length;
                for (let i = 0; i < linesCount; i++) {
                    let inStr = false, c, cn, cl, token = '';
                    // We should be able to detect dateformats within 13 rows
                    if (i > 13) {
                        break;
                    }
                    const columnStr = lines[i];
                    for (let j = 0; j < columnStr.length; j++) {
                        c = columnStr[j];
                        cn = columnStr[j + 1];
                        cl = columnStr[j - 1];
                        if (c === '#') {
                            // Skip the rest of the line - it's a comment
                            break;
                        }
                        if (c === '"') {
                            if (inStr) {
                                if (cl !== '"' && cn !== '"') {
                                    while (cn === ' ' && j < columnStr.length) {
                                        cn = columnStr[++j];
                                    }
                                    // After parsing a string, the next non-blank
                                    // should be a delimiter if the CSV is properly
                                    // formed.
                                    if (typeof potDelimiters[cn] !== 'undefined') {
                                        potDelimiters[cn]++;
                                    }
                                    inStr = false;
                                }
                            }
                            else {
                                inStr = true;
                            }
                        }
                        else if (typeof potDelimiters[c] !== 'undefined') {
                            token = token.trim();
                            if (!isNaN(Date.parse(token))) {
                                potDelimiters[c]++;
                            }
                            else if (isNaN(Number(token)) ||
                                !isFinite(Number(token))) {
                                potDelimiters[c]++;
                            }
                            token = '';
                        }
                        else {
                            token += c;
                        }
                        if (c === ',') {
                            commas++;
                        }
                        if (c === '.') {
                            points++;
                        }
                    }
                }
                // Count the potential delimiters.
                // This could be improved by checking if the number of delimiters
                // equals the number of columns - 1
                if (potDelimiters[';'] > potDelimiters[',']) {
                    guessed = ';';
                }
                else if (potDelimiters[','] > potDelimiters[';']) {
                    guessed = ',';
                }
                else {
                    // No good guess could be made..
                    guessed = ',';
                }
                // Try to deduce the decimal point if it's not explicitly set.
                // If both commas or points is > 0 there is likely an issue
                if (points > commas) {
                    this.guessedDecimalPoint = '.';
                }
                else {
                    this.guessedDecimalPoint = ',';
                }
                return guessed;
            }
            /**
             * Handles converting the parsed data to a table.
             *
             * @return {DataTable}
             * Table from the parsed CSV.
             */
            getTable() {
                return DataConverter.getTableFromColumns(this.columns, this.headers);
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options
         */
        CSVConverter.defaultOptions = {
            ...DataConverter.defaultOptions,
            lineDelimiter: '\n'
        };
        /* *
         *
         *  Default Export
         *
         * */

        return CSVConverter;
    });
    _registerModule(_modules, 'Data/Connectors/CSVConnector.js', [_modules['Data/Converters/CSVConverter.js'], _modules['Data/Connectors/DataConnector.js'], _modules['Core/Utilities.js']], function (CSVConverter, DataConnector, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Christer Vasseng
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Class that handles creating a DataConnector from CSV
         *
         * @private
         */
        class CSVConnector extends DataConnector {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of CSVConnector.
             *
             * @param {CSVConnector.UserOptions} [options]
             * Options for the connector and converter.
             */
            constructor(options) {
                const mergedOptions = merge(CSVConnector.defaultOptions, options);
                super(mergedOptions);
                this.converter = new CSVConverter(mergedOptions);
                this.options = mergedOptions;
                if (mergedOptions.enablePolling) {
                    this.startPolling(Math.max(mergedOptions.dataRefreshRate || 0, 1) * 1000);
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initiates the loading of the CSV source to the connector
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits CSVConnector#load
             * @emits CSVConnector#afterLoad
             */
            load(eventDetail) {
                const connector = this, converter = connector.converter, table = connector.table, { csv, csvURL, dataModifier } = connector.options;
                connector.emit({
                    type: 'load',
                    csv,
                    detail: eventDetail,
                    table
                });
                return Promise
                    .resolve(csvURL ?
                    fetch(csvURL).then((response) => response.text()) :
                    csv || '')
                    .then((csv) => {
                    if (csv) {
                        // If already loaded, clear the current rows
                        table.deleteColumns();
                        converter.parse({ csv });
                        table.setColumns(converter.getTable().getColumns());
                    }
                    return connector
                        .setModifierOptions(dataModifier)
                        .then(() => csv);
                })
                    .then((csv) => {
                    connector.emit({
                        type: 'afterLoad',
                        csv,
                        detail: eventDetail,
                        table
                    });
                    return connector;
                })['catch']((error) => {
                    connector.emit({
                        type: 'loadError',
                        detail: eventDetail,
                        error,
                        table
                    });
                    throw error;
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        CSVConnector.defaultOptions = {
            csv: '',
            csvURL: '',
            enablePolling: false,
            dataRefreshRate: 1,
            firstRowAsNames: true
        };
        DataConnector.registerType('CSV', CSVConnector);
        /* *
         *
         *  Default Export
         *
         * */

        return CSVConnector;
    });
    _registerModule(_modules, 'Data/Converters/JSONConverter.js', [_modules['Data/Converters/DataConverter.js'], _modules['Data/DataTable.js'], _modules['Core/Utilities.js']], function (DataConverter, DataTable, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Pawel Lysy
         *
         * */
        const { error, isArray, merge, objectEach } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Handles parsing and transforming JSON to a table.
         *
         * @private
         */
        class JSONConverter extends DataConverter {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the JSON parser.
             *
             * @param {JSONConverter.UserOptions} [options]
             * Options for the JSON parser.
             */
            constructor(options) {
                const mergedOptions = merge(JSONConverter.defaultOptions, options);
                super(mergedOptions);
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.columns = [];
                this.headers = [];
                this.options = mergedOptions;
                this.table = new DataTable();
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initiates parsing of JSON structure.
             *
             * @param {JSONConverter.UserOptions}[options]
             * Options for the parser
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits JSONConverter#parse
             * @emits JSONConverter#afterParse
             */
            parse(options, eventDetail) {
                const converter = this;
                options = merge(converter.options, options);
                const { beforeParse, orientation, firstRowAsNames, columnNames } = options;
                let data = options.data;
                if (!data) {
                    return;
                }
                converter.columns = [];
                converter.emit({
                    type: 'parse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.headers
                });
                if (beforeParse) {
                    data = beforeParse(data);
                }
                data = data.slice();
                if (orientation === 'columns') {
                    for (let i = 0, iEnd = data.length; i < iEnd; i++) {
                        const item = data[i];
                        if (!(item instanceof Array)) {
                            return;
                        }
                        if (converter.headers instanceof Array) {
                            if (firstRowAsNames) {
                                converter.headers.push(`${item.shift()}`);
                            }
                            else if (columnNames && columnNames instanceof Array) {
                                converter.headers.push(columnNames[i]);
                            }
                            converter.table.setColumn(converter.headers[i] || i.toString(), item);
                        }
                        else {
                            error('JSONConverter: Invalid `columnNames` option.', false);
                        }
                    }
                }
                else if (orientation === 'rows') {
                    if (firstRowAsNames) {
                        converter.headers = data.shift();
                    }
                    else if (columnNames) {
                        converter.headers = columnNames;
                    }
                    for (let rowIndex = 0, iEnd = data.length; rowIndex < iEnd; rowIndex++) {
                        let row = data[rowIndex];
                        if (isArray(row)) {
                            for (let columnIndex = 0, jEnd = row.length; columnIndex < jEnd; columnIndex++) {
                                if (converter.columns.length < columnIndex + 1) {
                                    converter.columns.push([]);
                                }
                                converter.columns[columnIndex].push(row[columnIndex]);
                                if (converter.headers instanceof Array) {
                                    this.table.setColumn(converter.headers[columnIndex] ||
                                        columnIndex.toString(), converter.columns[columnIndex]);
                                }
                                else {
                                    error('JSONConverter: Invalid `columnNames` option.', false);
                                }
                            }
                        }
                        else {
                            const columnNames = converter.headers;
                            if (columnNames && !(columnNames instanceof Array)) {
                                const newRow = {};
                                objectEach(columnNames, (arrayWithPath, name) => {
                                    newRow[name] = arrayWithPath.reduce((acc, key) => acc[key], row);
                                });
                                row = newRow;
                            }
                            this.table.setRows([row], rowIndex);
                        }
                    }
                }
                converter.emit({
                    type: 'afterParse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.headers
                });
            }
            /**
             * Handles converting the parsed data to a table.
             *
             * @return {DataTable}
             * Table from the parsed CSV.
             */
            getTable() {
                return this.table;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options
         */
        JSONConverter.defaultOptions = {
            ...DataConverter.defaultOptions,
            data: [],
            orientation: 'rows'
        };
        /* *
         *
         *  Default Export
         *
         * */

        return JSONConverter;
    });
    _registerModule(_modules, 'Data/Connectors/JSONConnector.js', [_modules['Data/Connectors/DataConnector.js'], _modules['Core/Utilities.js'], _modules['Data/Converters/JSONConverter.js']], function (DataConnector, U, JSONConverter) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Pawel Lysy
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Class that handles creating a DataConnector from JSON structure
         *
         * @private
         */
        class JSONConnector extends DataConnector {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of JSONConnector.
             *
             * @param {JSONConnector.UserOptions} [options]
             * Options for the connector and converter.
             */
            constructor(options) {
                const mergedOptions = merge(JSONConnector.defaultOptions, options);
                super(mergedOptions);
                this.converter = new JSONConverter(mergedOptions);
                this.options = mergedOptions;
                if (mergedOptions.enablePolling) {
                    this.startPolling(Math.max(mergedOptions.dataRefreshRate || 0, 1) * 1000);
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initiates the loading of the JSON source to the connector
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits JSONConnector#load
             * @emits JSONConnector#afterLoad
             */
            load(eventDetail) {
                const connector = this, converter = connector.converter, table = connector.table, { data, dataUrl, dataModifier } = connector.options;
                connector.emit({
                    type: 'load',
                    data,
                    detail: eventDetail,
                    table
                });
                return Promise
                    .resolve(dataUrl ?
                    fetch(dataUrl).then((json) => json.json()) :
                    data || [])
                    .then((data) => {
                    if (data) {
                        // If already loaded, clear the current rows
                        table.deleteColumns();
                        converter.parse({ data });
                        table.setColumns(converter.getTable().getColumns());
                    }
                    return connector.setModifierOptions(dataModifier).then(() => data);
                })
                    .then((data) => {
                    connector.emit({
                        type: 'afterLoad',
                        data,
                        detail: eventDetail,
                        table
                    });
                    return connector;
                })['catch']((error) => {
                    connector.emit({
                        type: 'loadError',
                        detail: eventDetail,
                        error,
                        table
                    });
                    throw error;
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        JSONConnector.defaultOptions = {
            data: [],
            enablePolling: false,
            dataRefreshRate: 0,
            firstRowAsNames: true,
            orientation: 'rows'
        };
        DataConnector.registerType('JSON', JSONConnector);
        /* *
         *
         *  Default Export
         *
         * */

        return JSONConnector;
    });
    _registerModule(_modules, 'Data/Converters/GoogleSheetsConverter.js', [_modules['Data/Converters/DataConverter.js'], _modules['Core/Utilities.js']], function (DataConverter, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Gøran Slettemark
         *  - Wojciech Chmiel
         *  - Sophie Bremer
         *
         * */
        const { merge, uniqueKey } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Handles parsing and transformation of an Google Sheets to a table.
         *
         * @private
         */
        class GoogleSheetsConverter extends DataConverter {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the GoogleSheetsConverter.
             *
             * @param {GoogleSheetsConverter.UserOptions} [options]
             * Options for the GoogleSheetsConverter.
             */
            constructor(options) {
                const mergedOptions = merge(GoogleSheetsConverter.defaultOptions, options);
                super(mergedOptions);
                this.columns = [];
                this.header = [];
                this.options = mergedOptions;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initiates the parsing of the Google Sheet
             *
             * @param {GoogleSheetsConverter.UserOptions}[options]
             * Options for the parser
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits GoogleSheetsParser#parse
             * @emits GoogleSheetsParser#afterParse
             */
            parse(options, eventDetail) {
                const converter = this, parseOptions = merge(converter.options, options), columns = ((parseOptions.json &&
                    parseOptions.json.values) || []).map((column) => column.slice());
                if (columns.length === 0) {
                    return false;
                }
                converter.header = [];
                converter.columns = [];
                converter.emit({
                    type: 'parse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.header
                });
                converter.columns = columns;
                let column;
                for (let i = 0, iEnd = columns.length; i < iEnd; i++) {
                    column = columns[i];
                    converter.header[i] = (parseOptions.firstRowAsNames ?
                        `${column.shift()}` :
                        uniqueKey());
                    for (let j = 0, jEnd = column.length; j < jEnd; ++j) {
                        if (column[j] && typeof column[j] === 'string') {
                            let cellValue = converter.asGuessedType(column[j]);
                            if (cellValue instanceof Date) {
                                cellValue = cellValue.getTime();
                            }
                            converter.columns[i][j] = cellValue;
                        }
                    }
                }
                converter.emit({
                    type: 'afterParse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.header
                });
            }
            /**
             * Handles converting the parsed data to a table.
             *
             * @return {DataTable}
             * Table from the parsed Google Sheet
             */
            getTable() {
                return DataConverter.getTableFromColumns(this.columns, this.header);
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options
         */
        GoogleSheetsConverter.defaultOptions = {
            ...DataConverter.defaultOptions
        };
        /* *
         *
         *  Default Export
         *
         * */

        return GoogleSheetsConverter;
    });
    _registerModule(_modules, 'Data/Connectors/GoogleSheetsConnector.js', [_modules['Data/Connectors/DataConnector.js'], _modules['Data/Converters/GoogleSheetsConverter.js'], _modules['Core/Utilities.js']], function (DataConnector, GoogleSheetsConverter, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Gøran Slettemark
         *  - Wojciech Chmiel
         *  - Sophie Bremer
         *
         * */
        const { merge, pick } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Tests Google's response for error.
         * @private
         */
        function isGoogleError(json) {
            return (typeof json === 'object' && json &&
                typeof json.error === 'object' && json.error &&
                typeof json.error.code === 'number' &&
                typeof json.error.message === 'string' &&
                typeof json.error.status === 'string');
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @todo implement save, requires oauth2
         */
        class GoogleSheetsConnector extends DataConnector {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of GoogleSheetsConnector
             *
             * @param {GoogleSheetsConnector.UserOptions} [options]
             * Options for the connector and converter.
             */
            constructor(options) {
                const mergedOptions = merge(GoogleSheetsConnector.defaultOptions, options);
                super(mergedOptions);
                this.converter = new GoogleSheetsConverter(mergedOptions);
                this.options = mergedOptions;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Loads data from a Google Spreadsheet.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Promise<this>}
             * Same connector instance with modified table.
             */
            load(eventDetail) {
                const connector = this, converter = connector.converter, table = connector.table, { dataModifier, dataRefreshRate, enablePolling, firstRowAsNames, googleAPIKey, googleSpreadsheetKey } = connector.options, url = GoogleSheetsConnector.buildFetchURL(googleAPIKey, googleSpreadsheetKey, connector.options);
                connector.emit({
                    type: 'load',
                    detail: eventDetail,
                    table,
                    url
                });
                return fetch(url)
                    .then((response) => (response.json()))
                    .then((json) => {
                    if (isGoogleError(json)) {
                        throw new Error(json.error.message);
                    }
                    converter.parse({
                        firstRowAsNames,
                        json
                    });
                    // If already loaded, clear the current table
                    table.deleteColumns();
                    table.setColumns(converter.getTable().getColumns());
                    return connector.setModifierOptions(dataModifier);
                })
                    .then(() => {
                    connector.emit({
                        type: 'afterLoad',
                        detail: eventDetail,
                        table,
                        url
                    });
                    // Polling
                    if (enablePolling) {
                        setTimeout(() => connector.load(), Math.max(dataRefreshRate || 0, 1) * 1000);
                    }
                    return connector;
                })['catch']((error) => {
                    connector.emit({
                        type: 'loadError',
                        detail: eventDetail,
                        error,
                        table
                    });
                    throw error;
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        GoogleSheetsConnector.defaultOptions = {
            googleAPIKey: '',
            googleSpreadsheetKey: '',
            worksheet: 1,
            enablePolling: false,
            dataRefreshRate: 2,
            firstRowAsNames: true
        };
        /* *
         *
         *  Class Namespace
         *
         * */
        (function (GoogleSheetsConnector) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Constants
             *
             * */
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Creates GoogleSheets API v4 URL.
             * @private
             */
            function buildFetchURL(apiKey, sheetKey, options = {}) {
                return (`https://sheets.googleapis.com/v4/spreadsheets/${sheetKey}/values/` +
                    (options.onlyColumnNames ?
                        'A1:Z1' :
                        buildQueryRange(options)) +
                    '?alt=json' +
                    (options.onlyColumnNames ?
                        '' :
                        '&dateTimeRenderOption=FORMATTED_STRING' +
                            '&majorDimension=COLUMNS' +
                            '&valueRenderOption=UNFORMATTED_VALUE') +
                    '&prettyPrint=false' +
                    `&key=${apiKey}`);
            }
            GoogleSheetsConnector.buildFetchURL = buildFetchURL;
            /**
             * Creates sheets range.
             * @private
             */
            function buildQueryRange(options = {}) {
                const { endColumn, endRow, googleSpreadsheetRange, startColumn, startRow } = options;
                return googleSpreadsheetRange || ((alphabet[startColumn || 0] || 'A') +
                    (Math.max((startRow || 0), 0) + 1) +
                    ':' +
                    (alphabet[pick(endColumn, 25)] || 'Z') +
                    (endRow ?
                        Math.max(endRow, 0) :
                        'Z'));
            }
            GoogleSheetsConnector.buildQueryRange = buildQueryRange;
        })(GoogleSheetsConnector || (GoogleSheetsConnector = {}));
        DataConnector.registerType('GoogleSheets', GoogleSheetsConnector);
        /* *
         *
         *  Default Export
         *
         * */

        return GoogleSheetsConnector;
    });
    _registerModule(_modules, 'Data/Converters/HTMLTableConverter.js', [_modules['Data/Converters/DataConverter.js'], _modules['Core/Utilities.js']], function (DataConverter, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Gøran Slettemark
         *  - Wojciech Chmiel
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Row equal
         */
        function isRowEqual(row1, row2) {
            let i = row1.length;
            if (row2.length === i) {
                while (--i) {
                    if (row1[i] !== row2[i]) {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
            return true;
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * Handles parsing and transformation of an HTML table to a table.
         *
         * @private
         */
        class HTMLTableConverter extends DataConverter {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the HTMLTableConverter.
             *
             * @param {HTMLTableConverter.UserOptions} [options]
             * Options for the HTMLTableConverter.
             */
            constructor(options) {
                const mergedOptions = merge(HTMLTableConverter.defaultOptions, options);
                super(mergedOptions);
                this.columns = [];
                this.headers = [];
                this.options = mergedOptions;
                if (mergedOptions.tableElement) {
                    this.tableElement = mergedOptions.tableElement;
                    this.tableElementID = mergedOptions.tableElement.id;
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Exports the dataconnector as an HTML string, using the options
             * provided on      *
             * @param {DataConnector} connector
             * Connector instance to export from.
             *
             * @param {HTMLTableConnector.ExportOptions} [options]
             * Options that override default or existing export options.
             *
             * @return {string}
             * HTML from the current dataTable.
             */
            export(connector, options = this.options) {
                const exportNames = (options.firstRowAsNames !== false), useMultiLevelHeaders = options.useMultiLevelHeaders;
                const columns = connector.getSortedColumns(options.usePresentationOrder), columnNames = Object.keys(columns), htmlRows = [], columnsCount = columnNames.length;
                const rowArray = [];
                let tableHead = '';
                // Add the names as the first row if they should be exported
                if (exportNames) {
                    const subcategories = [];
                    // If using multilevel headers, the first value
                    // of each column is a subcategory
                    if (useMultiLevelHeaders) {
                        for (const name of columnNames) {
                            const subhead = (columns[name].shift() || '').toString();
                            subcategories.push(subhead);
                        }
                        tableHead = this.getTableHeaderHTML(columnNames, subcategories, options);
                    }
                    else {
                        tableHead = this.getTableHeaderHTML(void 0, columnNames, options);
                    }
                }
                for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
                    const columnName = columnNames[columnIndex], column = columns[columnName], columnLength = column.length;
                    for (let rowIndex = 0; rowIndex < columnLength; rowIndex++) {
                        let cellValue = column[rowIndex];
                        if (!rowArray[rowIndex]) {
                            rowArray[rowIndex] = [];
                        }
                        // Alternative: Datatype from HTML attribute with
                        // connector.whatIs(columnName)
                        if (!(typeof cellValue === 'string' ||
                            typeof cellValue === 'number' ||
                            typeof cellValue === 'undefined')) {
                            cellValue = (cellValue || '').toString();
                        }
                        rowArray[rowIndex][columnIndex] = this.getCellHTMLFromValue(columnIndex ? 'td' : 'th', null, columnIndex ? '' : 'scope="row"', cellValue);
                        // On the final column, push the row to the array
                        if (columnIndex === columnsCount - 1) {
                            htmlRows.push('<tr>' +
                                rowArray[rowIndex].join('') +
                                '</tr>');
                        }
                    }
                }
                let caption = '';
                // Add table caption
                // Current exportdata falls back to chart title
                // but that should probably be handled elsewhere?
                if (options.tableCaption) {
                    caption = '<caption class="highcharts-table-caption">' +
                        options.tableCaption +
                        '</caption>';
                }
                return ('<table>' +
                    caption +
                    tableHead +
                    '<tbody>' +
                    htmlRows.join('') +
                    '</tbody>' +
                    '</table>');
            }
            /**
             * Get table cell markup from row data.
             */
            getCellHTMLFromValue(tag, classes, attrs, value, decimalPoint) {
                let val = value, className = 'text' + (classes ? ' ' + classes : '');
                // Convert to string if number
                if (typeof val === 'number') {
                    val = val.toString();
                    if (decimalPoint === ',') {
                        val = val.replace('.', decimalPoint);
                    }
                    className = 'number';
                }
                else if (!value) {
                    val = '';
                    className = 'empty';
                }
                return '<' + tag + (attrs ? ' ' + attrs : '') +
                    ' class="' + className + '">' +
                    val + '</' + tag + '>';
            }
            /**
             * Get table header markup from row data.
             */
            getTableHeaderHTML(topheaders = [], subheaders = [], options = this.options) {
                const { useMultiLevelHeaders, useRowspanHeaders } = options;
                let html = '<thead>', i = 0, len = subheaders && subheaders.length, next, cur, curColspan = 0, rowspan;
                // Clean up multiple table headers. Chart.getDataRows() returns two
                // levels of headers when using multilevel, not merged. We need to
                // merge identical headers, remove redundant headers, and keep it
                // all marked up nicely.
                if (useMultiLevelHeaders &&
                    topheaders &&
                    subheaders &&
                    !isRowEqual(topheaders, subheaders)) {
                    html += '<tr>';
                    for (; i < len; ++i) {
                        cur = topheaders[i];
                        next = topheaders[i + 1];
                        if (cur === next) {
                            ++curColspan;
                        }
                        else if (curColspan) {
                            // Ended colspan
                            // Add cur to HTML with colspan.
                            html += this.getCellHTMLFromValue('th', 'highcharts-table-topheading', 'scope="col" ' +
                                'colspan="' + (curColspan + 1) + '"', cur);
                            curColspan = 0;
                        }
                        else {
                            // Cur is standalone. If it is same as sublevel,
                            // remove sublevel and add just toplevel.
                            if (cur === subheaders[i]) {
                                if (useRowspanHeaders) {
                                    rowspan = 2;
                                    delete subheaders[i];
                                }
                                else {
                                    rowspan = 1;
                                    subheaders[i] = '';
                                }
                            }
                            else {
                                rowspan = 1;
                            }
                            html += this.getCellHTMLFromValue('th', 'highcharts-table-topheading', 'scope="col"' +
                                (rowspan > 1 ?
                                    ' valign="top" rowspan="' + rowspan + '"' :
                                    ''), cur);
                        }
                    }
                    html += '</tr>';
                }
                // Add the subheaders (the only headers if not using multilevels)
                if (subheaders) {
                    html += '<tr>';
                    for (i = 0, len = subheaders.length; i < len; ++i) {
                        if (typeof subheaders[i] !== 'undefined') {
                            html += this.getCellHTMLFromValue('th', null, 'scope="col"', subheaders[i]);
                        }
                    }
                    html += '</tr>';
                }
                html += '</thead>';
                return html;
            }
            /**
             * Initiates the parsing of the HTML table
             *
             * @param {HTMLTableConverter.UserOptions}[options]
             * Options for the parser
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits CSVDataParser#parse
             * @emits CSVDataParser#afterParse
             * @emits HTMLTableParser#parseError
             */
            parse(options, eventDetail) {
                const converter = this, columns = [], headers = [], parseOptions = merge(converter.options, options), { endRow, startColumn, endColumn, firstRowAsNames } = parseOptions, tableHTML = parseOptions.tableElement || this.tableElement;
                if (!(tableHTML instanceof HTMLElement)) {
                    converter.emit({
                        type: 'parseError',
                        columns,
                        detail: eventDetail,
                        headers,
                        error: 'Not a valid HTML Table'
                    });
                    return;
                }
                converter.tableElement = tableHTML;
                converter.tableElementID = tableHTML.id;
                this.emit({
                    type: 'parse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.headers
                });
                const rows = tableHTML.getElementsByTagName('tr'), rowsCount = rows.length;
                let rowIndex = 0, item, { startRow } = parseOptions;
                // Insert headers from the first row
                if (firstRowAsNames && rowsCount) {
                    const items = rows[0].children, itemsLength = items.length;
                    for (let i = startColumn; i < itemsLength; i++) {
                        if (i > endColumn) {
                            break;
                        }
                        item = items[i];
                        if (item.tagName === 'TD' ||
                            item.tagName === 'TH') {
                            headers.push(item.innerHTML);
                        }
                    }
                    startRow++;
                }
                while (rowIndex < rowsCount) {
                    if (rowIndex >= startRow && rowIndex <= endRow) {
                        const columnsInRow = rows[rowIndex].children, columnsInRowLength = columnsInRow.length;
                        let columnIndex = 0;
                        while (columnIndex < columnsInRowLength) {
                            const relativeColumnIndex = columnIndex - startColumn, row = columns[relativeColumnIndex];
                            item = columnsInRow[columnIndex];
                            if ((item.tagName === 'TD' ||
                                item.tagName === 'TH') &&
                                (columnIndex >= startColumn &&
                                    columnIndex <= endColumn)) {
                                if (!columns[relativeColumnIndex]) {
                                    columns[relativeColumnIndex] = [];
                                }
                                let cellValue = converter.asGuessedType(item.innerHTML);
                                if (cellValue instanceof Date) {
                                    cellValue = cellValue.getTime();
                                }
                                columns[relativeColumnIndex][rowIndex - startRow] = cellValue;
                                // Loop over all previous indices and make sure
                                // they are nulls, not undefined.
                                let i = 1;
                                while (rowIndex - startRow >= i &&
                                    row[rowIndex - startRow - i] === void 0) {
                                    row[rowIndex - startRow - i] = null;
                                    i++;
                                }
                            }
                            columnIndex++;
                        }
                    }
                    rowIndex++;
                }
                this.columns = columns;
                this.headers = headers;
                this.emit({
                    type: 'afterParse',
                    columns,
                    detail: eventDetail,
                    headers
                });
            }
            /**
             * Handles converting the parsed data to a table.
             *
             * @return {DataTable}
             * Table from the parsed HTML table
             */
            getTable() {
                return DataConverter.getTableFromColumns(this.columns, this.headers);
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options
         */
        HTMLTableConverter.defaultOptions = {
            ...DataConverter.defaultOptions,
            useRowspanHeaders: true,
            useMultiLevelHeaders: true
        };
        /* *
         *
         *  Default Export
         *
         * */

        return HTMLTableConverter;
    });
    _registerModule(_modules, 'Data/Connectors/HTMLTableConnector.js', [_modules['Data/Connectors/DataConnector.js'], _modules['Core/Globals.js'], _modules['Data/Converters/HTMLTableConverter.js'], _modules['Core/Utilities.js']], function (DataConnector, H, HTMLTableConverter, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Gøran Slettemark
         *  - Wojciech Chmiel
         *  - Sophie Bremer
         *
         * */
        const { win } = H;
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Class that handles creating a data connector from an HTML table.
         *
         * @private
         */
        class HTMLTableConnector extends DataConnector {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of HTMLTableConnector.
             *
             * @param {HTMLTableConnector.UserOptions} [options]
             * Options for the connector and converter.
             */
            constructor(options) {
                const mergedOptions = merge(HTMLTableConnector.defaultOptions, options);
                super(mergedOptions);
                this.converter = new HTMLTableConverter(mergedOptions);
                this.options = mergedOptions;
            }
            /**
             * Initiates creating the dataconnector from the HTML table
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits HTMLTableConnector#load
             * @emits HTMLTableConnector#afterLoad
             * @emits HTMLTableConnector#loadError
             */
            load(eventDetail) {
                const connector = this, converter = connector.converter, table = connector.table, { dataModifier, table: tableHTML } = connector.options;
                connector.emit({
                    type: 'load',
                    detail: eventDetail,
                    table,
                    tableElement: connector.tableElement
                });
                let tableElement;
                if (typeof tableHTML === 'string') {
                    connector.tableID = tableHTML;
                    tableElement = win.document.getElementById(tableHTML);
                }
                else {
                    tableElement = tableHTML;
                    connector.tableID = tableElement.id;
                }
                connector.tableElement = tableElement || void 0;
                if (!connector.tableElement) {
                    const error = 'HTML table not provided, or element with ID not found';
                    connector.emit({
                        type: 'loadError',
                        detail: eventDetail,
                        error,
                        table
                    });
                    return Promise.reject(new Error(error));
                }
                converter.parse(merge({ tableElement: connector.tableElement }, connector.options), eventDetail);
                // If already loaded, clear the current rows
                table.deleteColumns();
                table.setColumns(converter.getTable().getColumns());
                return connector
                    .setModifierOptions(dataModifier)
                    .then(() => {
                    connector.emit({
                        type: 'afterLoad',
                        detail: eventDetail,
                        table,
                        tableElement: connector.tableElement
                    });
                    return connector;
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        HTMLTableConnector.defaultOptions = {
            table: ''
        };
        DataConnector.registerType('HTMLTable', HTMLTableConnector);
        /* *
         *
         *  Default Export
         *
         * */

        return HTMLTableConnector;
    });
    _registerModule(_modules, 'Data/Modifiers/ChainModifier.js', [_modules['Data/Modifiers/DataModifier.js'], _modules['Core/Utilities.js']], function (DataModifier, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Modifies a table with the help of modifiers in an ordered chain.
         *
         * @private
         */
        class ChainModifier extends DataModifier {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the modifier chain.
             *
             * @param {Partial<ChainModifier.Options>} [options]
             * Options to configure the modifier chain.
             *
             * @param {...DataModifier} [chain]
             * Ordered chain of modifiers.
             */
            constructor(options, ...chain) {
                super();
                this.chain = chain;
                this.options = merge(ChainModifier.defaultOptions, options);
                const optionsChain = this.options.chain || [];
                for (let i = 0, iEnd = optionsChain.length, modifierOptions, ModifierClass; i < iEnd; ++i) {
                    modifierOptions = optionsChain[i];
                    if (!modifierOptions.type) {
                        continue;
                    }
                    ModifierClass = DataModifier.types[modifierOptions.type];
                    if (ModifierClass) {
                        chain.push(new ModifierClass(modifierOptions));
                    }
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Adds a configured modifier to the end of the modifier chain. Please note,
             * that the modifier can be added multiple times.
             *
             * @param {DataModifier} modifier
             * Configured modifier to add.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             */
            add(modifier, eventDetail) {
                this.emit({
                    type: 'addModifier',
                    detail: eventDetail,
                    modifier
                });
                this.chain.push(modifier);
                this.emit({
                    type: 'addModifier',
                    detail: eventDetail,
                    modifier
                });
            }
            /**
             * Clears all modifiers from the chain.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             */
            clear(eventDetail) {
                this.emit({
                    type: 'clearChain',
                    detail: eventDetail
                });
                this.chain.length = 0;
                this.emit({
                    type: 'afterClearChain',
                    detail: eventDetail
                });
            }
            /**
             * Applies several modifications to the table and returns a modified copy of
             * the given table.
             *
             * @param {Highcharts.DataTable} table
             * Table to modify.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Promise<Highcharts.DataTable>}
             * Table with `modified` property as a reference.
             */
            modify(table, eventDetail) {
                const modifiers = (this.options.reverse ?
                    this.chain.slice().reverse() :
                    this.chain.slice());
                if (table.modified === table) {
                    table.modified = table.clone(false, eventDetail);
                }
                let promiseChain = Promise.resolve(table);
                for (let i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                    const modifier = modifiers[i];
                    promiseChain = promiseChain.then((chainTable) => modifier.modify(chainTable.modified, eventDetail));
                }
                promiseChain = promiseChain.then((chainTable) => {
                    table.modified.deleteColumns();
                    table.modified.setColumns(chainTable.modified.getColumns());
                    return table;
                });
                promiseChain = promiseChain['catch']((error) => {
                    this.emit({
                        type: 'error',
                        detail: eventDetail,
                        table
                    });
                    throw error;
                });
                return promiseChain;
            }
            /**
             * Applies partial modifications of a cell change to the property `modified`
             * of the given modified table.
             *
             * *Note:* The `modified` property of the table gets replaced.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {string} columnName
             * Column name of changed cell.
             *
             * @param {number|undefined} rowIndex
             * Row index of changed cell.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Changed cell value.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyCell(table, columnName, rowIndex, cellValue, eventDetail) {
                const modifiers = (this.options.reverse ?
                    this.chain.reverse() :
                    this.chain);
                if (modifiers.length) {
                    let clone = table.clone();
                    for (let i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                        modifiers[i].modifyCell(clone, columnName, rowIndex, cellValue, eventDetail);
                        clone = clone.modified;
                    }
                    table.modified = clone;
                }
                return table;
            }
            /**
             * Applies partial modifications of column changes to the property
             * `modified` of the given table.
             *
             * *Note:* The `modified` property of the table gets replaced.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Highcharts.DataTableColumnCollection} columns
             * Changed columns as a collection, where the keys are the column names.
             *
             * @param {number} [rowIndex=0]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyColumns(table, columns, rowIndex, eventDetail) {
                const modifiers = (this.options.reverse ?
                    this.chain.reverse() :
                    this.chain.slice());
                if (modifiers.length) {
                    let clone = table.clone();
                    for (let i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                        modifiers[i].modifyColumns(clone, columns, rowIndex, eventDetail);
                        clone = clone.modified;
                    }
                    table.modified = clone;
                }
                return table;
            }
            /**
             * Applies partial modifications of row changes to the property `modified`
             * of the given table.
             *
             * *Note:* The `modified` property of the table gets replaced.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
             * Changed rows.
             *
             * @param {number} [rowIndex]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyRows(table, rows, rowIndex, eventDetail) {
                const modifiers = (this.options.reverse ?
                    this.chain.reverse() :
                    this.chain.slice());
                if (modifiers.length) {
                    let clone = table.clone();
                    for (let i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                        modifiers[i].modifyRows(clone, rows, rowIndex, eventDetail);
                        clone = clone.modified;
                    }
                    table.modified = clone;
                }
                return table;
            }
            /**
             * Applies several modifications to the table.
             *
             * *Note:* The `modified` property of the table gets replaced.
             *
             * @param {DataTable} table
             * Table to modify.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {DataTable}
             * Table as a reference.
             *
             * @emits ChainDataModifier#execute
             * @emits ChainDataModifier#afterExecute
             */
            modifyTable(table, eventDetail) {
                const chain = this;
                chain.emit({
                    type: 'modify',
                    detail: eventDetail,
                    table
                });
                const modifiers = (chain.options.reverse ?
                    chain.chain.reverse() :
                    chain.chain.slice());
                let modified = table.modified;
                for (let i = 0, iEnd = modifiers.length, modifier; i < iEnd; ++i) {
                    modifier = modifiers[i];
                    modified = modifier.modifyTable(modified, eventDetail).modified;
                }
                table.modified = modified;
                chain.emit({
                    type: 'afterModify',
                    detail: eventDetail,
                    table
                });
                return table;
            }
            /**
             * Removes a configured modifier from all positions in the modifier chain.
             *
             * @param {DataModifier} modifier
             * Configured modifier to remove.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             */
            remove(modifier, eventDetail) {
                const modifiers = this.chain;
                this.emit({
                    type: 'removeModifier',
                    detail: eventDetail,
                    modifier
                });
                modifiers.splice(modifiers.indexOf(modifier), 1);
                this.emit({
                    type: 'afterRemoveModifier',
                    detail: eventDetail,
                    modifier
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default option for the ordered modifier chain.
         */
        ChainModifier.defaultOptions = {
            type: 'Chain'
        };
        DataModifier.registerType('Chain', ChainModifier);
        /* *
         *
         *  Default Export
         *
         * */

        return ChainModifier;
    });
    _registerModule(_modules, 'Data/Modifiers/InvertModifier.js', [_modules['Data/Modifiers/DataModifier.js'], _modules['Core/Utilities.js']], function (DataModifier, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Wojciech Chmiel
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Inverts columns and rows in a table.
         *
         * @private
         */
        class InvertModifier extends DataModifier {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the invert modifier.
             *
             * @param {Partial<InvertModifier.Options>} [options]
             * Options to configure the invert modifier.
             */
            constructor(options) {
                super();
                this.options = merge(InvertModifier.defaultOptions, options);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Applies partial modifications of a cell change to the property `modified`
             * of the given modified table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {string} columnName
             * Column name of changed cell.
             *
             * @param {number|undefined} rowIndex
             * Row index of changed cell.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Changed cell value.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyCell(table, columnName, rowIndex, cellValue, eventDetail) {
                const modified = table.modified, modifiedRowIndex = modified.getRowIndexBy('columnNames', columnName);
                if (typeof modifiedRowIndex === 'undefined') {
                    modified.setColumns(this.modifyTable(table.clone()).getColumns(), void 0, eventDetail);
                }
                else {
                    modified.setCell(`${rowIndex}`, modifiedRowIndex, cellValue, eventDetail);
                }
                return table;
            }
            /**
             * Applies partial modifications of column changes to the property
             * `modified` of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Highcharts.DataTableColumnCollection} columns
             * Changed columns as a collection, where the keys are the column names.
             *
             * @param {number} [rowIndex=0]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyColumns(table, columns, rowIndex, eventDetail) {
                const modified = table.modified, modifiedColumnNames = (modified.getColumn('columnNames') || []);
                let columnNames = table.getColumnNames(), reset = (table.getRowCount() !== modifiedColumnNames.length);
                if (!reset) {
                    for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                        if (columnNames[i] !== modifiedColumnNames[i]) {
                            reset = true;
                            break;
                        }
                    }
                }
                if (reset) {
                    return this.modifyTable(table, eventDetail);
                }
                columnNames = Object.keys(columns);
                for (let i = 0, iEnd = columnNames.length, column, columnName, modifiedRowIndex; i < iEnd; ++i) {
                    columnName = columnNames[i];
                    column = columns[columnName];
                    modifiedRowIndex = (modified.getRowIndexBy('columnNames', columnName) ||
                        modified.getRowCount());
                    for (let j = 0, j2 = rowIndex, jEnd = column.length; j < jEnd; ++j, ++j2) {
                        modified.setCell(`${j2}`, modifiedRowIndex, column[j], eventDetail);
                    }
                }
                return table;
            }
            /**
             * Applies partial modifications of row changes to the property `modified`
             * of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
             * Changed rows.
             *
             * @param {number} [rowIndex]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyRows(table, rows, rowIndex, eventDetail) {
                const columnNames = table.getColumnNames(), modified = table.modified, modifiedColumnNames = (modified.getColumn('columnNames') || []);
                let reset = (table.getRowCount() !== modifiedColumnNames.length);
                if (!reset) {
                    for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                        if (columnNames[i] !== modifiedColumnNames[i]) {
                            reset = true;
                            break;
                        }
                    }
                }
                if (reset) {
                    return this.modifyTable(table, eventDetail);
                }
                for (let i = 0, i2 = rowIndex, iEnd = rows.length, row; i < iEnd; ++i, ++i2) {
                    row = rows[i];
                    if (row instanceof Array) {
                        modified.setColumn(`${i2}`, row);
                    }
                    else {
                        for (let j = 0, jEnd = columnNames.length; j < jEnd; ++j) {
                            modified.setCell(`${i2}`, j, row[columnNames[j]], eventDetail);
                        }
                    }
                }
                return table;
            }
            /**
             * Inverts rows and columns in the table.
             *
             * @param {DataTable} table
             * Table to invert.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {DataTable}
             * Table with inverted `modified` property as a reference.
             */
            modifyTable(table, eventDetail) {
                const modifier = this;
                modifier.emit({ type: 'modify', detail: eventDetail, table });
                const modified = table.modified;
                if (table.hasColumns(['columnNames'])) { // Inverted table
                    const columnNames = ((table.deleteColumns(['columnNames']) || {})
                        .columnNames || []).map((column) => `${column}`), columns = {};
                    for (let i = 0, iEnd = table.getRowCount(), row; i < iEnd; ++i) {
                        row = table.getRow(i);
                        if (row) {
                            columns[columnNames[i]] = row;
                        }
                    }
                    modified.deleteColumns();
                    modified.setColumns(columns);
                }
                else { // Regular table
                    const columns = {};
                    for (let i = 0, iEnd = table.getRowCount(), row; i < iEnd; ++i) {
                        row = table.getRow(i);
                        if (row) {
                            columns[`${i}`] = row;
                        }
                    }
                    columns.columnNames = table.getColumnNames();
                    modified.deleteColumns();
                    modified.setColumns(columns);
                }
                modifier.emit({ type: 'afterModify', detail: eventDetail, table });
                return table;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options for the invert modifier.
         */
        InvertModifier.defaultOptions = {
            type: 'Invert'
        };
        DataModifier.registerType('Invert', InvertModifier);
        /* *
         *
         *  Default Export
         *
         * */

        return InvertModifier;
    });
    _registerModule(_modules, 'Data/Modifiers/MathModifier.js', [_modules['Data/Modifiers/DataModifier.js'], _modules['Data/Formula/FormulaParser.js'], _modules['Data/Formula/FormulaProcessor.js']], function (DataModifier, FormulaParser, FormulaProcessor) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Class
         *
         * */
        /**
         * Replaces formula strings in a table with calculated values.
         *
         * @private
         * @class
         * @name Highcharts.DataModifier.types.MathModifier
         * @augments Highcharts.DataModifier
         */
        class MathModifier extends DataModifier {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(options) {
                super();
                this.options = {
                    ...MathModifier.defaultOptions,
                    ...options
                };
            }
            /* *
             *
             *  Functions
             *
             * */
            modifyTable(table, eventDetail) {
                const modifier = this;
                modifier.emit({ type: 'modify', detail: eventDetail, table });
                const alternativeSeparators = modifier.options.alternativeSeparators, formulaColumns = (modifier.options.formulaColumns ||
                    table.getColumnNames()), modified = table.modified;
                for (let i = 0, iEnd = formulaColumns.length, columnName; i < iEnd; ++i) {
                    columnName = formulaColumns[i];
                    if (formulaColumns.indexOf(columnName) >= 0) {
                        modified.setColumn(columnName, modifier.processColumn(table, columnName));
                    }
                }
                const columnFormulas = (modifier.options.columnFormulas || []);
                for (let i = 0, iEnd = columnFormulas.length, columnFormula, formula; i < iEnd; ++i) {
                    columnFormula = columnFormulas[i];
                    formula = FormulaParser.parseFormula(columnFormula.formula, alternativeSeparators);
                    modified.setColumn(columnFormula.column, modifier.processColumnFormula(formula, table, columnFormula.rowStart, columnFormula.rowEnd));
                }
                modifier.emit({ type: 'afterModify', detail: eventDetail, table });
                return table;
            }
            /**
             * Process a column by replacing formula strings with calculated values.
             *
             * @private
             *
             * @param {Highcharts.DataTable} table
             * Table to extract column from and use as reference.
             *
             * @param {string} columnNameOrAlias
             * Name or alias of column to process.
             *
             * @param {number} rowIndex
             * Row index to start the replacing process from.
             *
             * @return {Highcharts.DataTableColumn}
             * Returns the processed table column.
             */
            processColumn(table, columnNameOrAlias, rowIndex = 0) {
                const alternativeSeparators = this.options.alternativeSeparators, column = (table.getColumn(columnNameOrAlias, true) || [])
                    .slice(rowIndex > 0 ? rowIndex : 0);
                for (let i = 0, iEnd = column.length, cacheFormula = [], cacheString = '', cell; i < iEnd; ++i) {
                    cell = column[i];
                    if (typeof cell === 'string' &&
                        cell[0] === '=') {
                        try {
                            // Use cache while formula string is repetitive
                            cacheFormula = (cacheString === cell ?
                                cacheFormula :
                                FormulaParser.parseFormula(cell.substring(1), alternativeSeparators));
                            // Process parsed formula string
                            column[i] =
                                FormulaProcessor.processFormula(cacheFormula, table);
                        }
                        catch {
                            column[i] = NaN;
                        }
                    }
                }
                return column;
            }
            /**
             * Process a column by replacing cell values with calculated values from a
             * given formula.
             *
             * @private
             *
             * @param {Highcharts.Formula} formula
             * Formula to use for processing.
             *
             * @param {Highcharts.DataTable} table
             * Table to extract column from and use as reference.
             *
             * @param {number} rowStart
             * Row index to start the replacing process from.
             *
             * @param {number} rowEnd
             * Row index to end the replacing process.
             *
             * @return {Highcharts.DataTableColumn}
             * Returns the processed table column.
             */
            processColumnFormula(formula, table, rowStart = 0, rowEnd = table.getRowCount()) {
                rowStart = rowStart >= 0 ? rowStart : 0;
                rowEnd = rowEnd >= 0 ? rowEnd : table.getRowCount() + rowEnd;
                const column = [], modified = table.modified;
                for (let i = 0, iEnd = (rowEnd - rowStart); i < iEnd; ++i) {
                    try {
                        column[i] = FormulaProcessor.processFormula(formula, modified);
                    }
                    catch {
                        column[i] = NaN;
                    }
                    finally {
                        formula = FormulaProcessor.translateReferences(formula, 0, 1);
                    }
                }
                return column;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options of MathModifier.
         * @private
         */
        MathModifier.defaultOptions = {
            type: 'Math',
            alternativeSeparators: false
        };
        DataModifier.registerType('Math', MathModifier);
        /* *
         *
         *  Default Export
         *
         * */

        return MathModifier;
    });
    _registerModule(_modules, 'Data/Modifiers/RangeModifier.js', [_modules['Data/Modifiers/DataModifier.js'], _modules['Core/Utilities.js']], function (DataModifier, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Filters out table rows with a specific value range.
         *
         * @private
         */
        class RangeModifier extends DataModifier {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the range modifier.
             *
             * @param {Partial<RangeModifier.Options>} [options]
             * Options to configure the range modifier.
             */
            constructor(options) {
                super();
                this.options = merge(RangeModifier.defaultOptions, options);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Replaces table rows with filtered rows.
             *
             * @param {DataTable} table
             * Table to modify.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {DataTable}
             * Table with `modified` property as a reference.
             */
            modifyTable(table, eventDetail) {
                const modifier = this;
                modifier.emit({ type: 'modify', detail: eventDetail, table });
                const { additive, ranges, strict } = modifier.options;
                if (ranges.length) {
                    const modified = table.modified;
                    let columns = table.getColumns(), rows = [];
                    for (let i = 0, iEnd = ranges.length, range, rangeColumn; i < iEnd; ++i) {
                        range = ranges[i];
                        if (strict &&
                            typeof range.minValue !== typeof range.maxValue) {
                            continue;
                        }
                        if (i > 0 && !additive) {
                            modified.deleteRows();
                            modified.setRows(rows);
                            columns = modified.getColumns();
                            rows = [];
                        }
                        rangeColumn = (columns[range.column] || []);
                        for (let j = 0, jEnd = rangeColumn.length, cell, row; j < jEnd; ++j) {
                            cell = rangeColumn[j];
                            switch (typeof cell) {
                                default:
                                    continue;
                                case 'boolean':
                                case 'number':
                                case 'string':
                                    break;
                            }
                            if (strict &&
                                typeof cell !== typeof range.minValue) {
                                continue;
                            }
                            if (cell >= range.minValue &&
                                cell <= range.maxValue) {
                                row = (additive ?
                                    table.getRow(j) :
                                    modified.getRow(j));
                                if (row) {
                                    rows.push(row);
                                }
                            }
                        }
                    }
                    modified.deleteRows();
                    modified.setRows(rows);
                }
                modifier.emit({ type: 'afterModify', detail: eventDetail, table });
                return table;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options for the range modifier.
         */
        RangeModifier.defaultOptions = {
            type: 'Range',
            ranges: []
        };
        DataModifier.registerType('Range', RangeModifier);
        /* *
         *
         *  Default Export
         *
         * */

        return RangeModifier;
    });
    _registerModule(_modules, 'Data/Modifiers/SortModifier.js', [_modules['Data/Modifiers/DataModifier.js'], _modules['Data/DataTable.js'], _modules['Core/Utilities.js']], function (DataModifier, DataTable, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Sort table rows according to values of a column.
         *
         * @private
         */
        class SortModifier extends DataModifier {
            /* *
             *
             *  Static Functions
             *
             * */
            static ascending(a, b) {
                return ((a || 0) < (b || 0) ? -1 :
                    (a || 0) > (b || 0) ? 1 :
                        0);
            }
            static descending(a, b) {
                return ((b || 0) < (a || 0) ? -1 :
                    (b || 0) > (a || 0) ? 1 :
                        0);
            }
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the range modifier.
             *
             * @param {Partial<RangeDataModifier.Options>} [options]
             * Options to configure the range modifier.
             */
            constructor(options) {
                super();
                this.options = merge(SortModifier.defaultOptions, options);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Returns index and row for sort reference.
             *
             * @private
             *
             * @param {Highcharts.DataTable} table
             * Table with rows to reference.
             *
             * @return {Array<SortModifier.RowReference>}
             * Array of row references.
             */
            getRowReferences(table) {
                const rows = table.getRows(), rowReferences = [];
                for (let i = 0, iEnd = rows.length; i < iEnd; ++i) {
                    rowReferences.push({
                        index: i,
                        row: rows[i]
                    });
                }
                return rowReferences;
            }
            /**
             * Applies partial modifications of a cell change to the property `modified`
             * of the given modified table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {string} columnName
             * Column name of changed cell.
             *
             * @param {number|undefined} rowIndex
             * Row index of changed cell.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Changed cell value.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyCell(table, columnName, rowIndex, cellValue, eventDetail) {
                const modifier = this, { orderByColumn, orderInColumn } = modifier.options;
                if (columnName === orderByColumn) {
                    if (orderInColumn) {
                        table.modified.setCell(columnName, rowIndex, cellValue);
                        table.modified.setColumn(orderInColumn, modifier
                            .modifyTable(new DataTable({
                            columns: table
                                .getColumns([orderByColumn, orderInColumn])
                        }))
                            .modified
                            .getColumn(orderInColumn));
                    }
                    else {
                        modifier.modifyTable(table, eventDetail);
                    }
                }
                return table;
            }
            /**
             * Applies partial modifications of column changes to the property
             * `modified` of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Highcharts.DataTableColumnCollection} columns
             * Changed columns as a collection, where the keys are the column names.
             *
             * @param {number} [rowIndex=0]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyColumns(table, columns, rowIndex, eventDetail) {
                const modifier = this, { orderByColumn, orderInColumn } = modifier.options, columnNames = Object.keys(columns);
                if (columnNames.indexOf(orderByColumn) > -1) {
                    if (orderInColumn &&
                        columns[columnNames[0]].length) {
                        table.modified.setColumns(columns, rowIndex);
                        table.modified.setColumn(orderInColumn, modifier
                            .modifyTable(new DataTable({
                            columns: table
                                .getColumns([orderByColumn, orderInColumn])
                        }))
                            .modified
                            .getColumn(orderInColumn));
                    }
                    else {
                        modifier.modifyTable(table, eventDetail);
                    }
                }
                return table;
            }
            /**
             * Applies partial modifications of row changes to the property `modified`
             * of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
             * Changed rows.
             *
             * @param {number} [rowIndex]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyRows(table, rows, rowIndex, eventDetail) {
                const modifier = this, { orderByColumn, orderInColumn } = modifier.options;
                if (orderInColumn &&
                    rows.length) {
                    table.modified.setRows(rows, rowIndex);
                    table.modified.setColumn(orderInColumn, modifier
                        .modifyTable(new DataTable({
                        columns: table
                            .getColumns([orderByColumn, orderInColumn])
                    }))
                        .modified
                        .getColumn(orderInColumn));
                }
                else {
                    modifier.modifyTable(table, eventDetail);
                }
                return table;
            }
            /**
             * Sorts rows in the table.
             *
             * @param {DataTable} table
             * Table to sort in.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {DataTable}
             * Table with `modified` property as a reference.
             */
            modifyTable(table, eventDetail) {
                const modifier = this;
                modifier.emit({ type: 'modify', detail: eventDetail, table });
                const columnNames = table.getColumnNames(), rowCount = table.getRowCount(), rowReferences = this.getRowReferences(table), { direction, orderByColumn, orderInColumn } = modifier.options, compare = (direction === 'asc' ?
                    SortModifier.ascending :
                    SortModifier.descending), orderByColumnIndex = columnNames.indexOf(orderByColumn), modified = table.modified;
                if (orderByColumnIndex !== -1) {
                    rowReferences.sort((a, b) => compare(a.row[orderByColumnIndex], b.row[orderByColumnIndex]));
                }
                if (orderInColumn) {
                    const column = [];
                    for (let i = 0; i < rowCount; ++i) {
                        column[rowReferences[i].index] = i;
                    }
                    modified.setColumns({ [orderInColumn]: column });
                }
                else {
                    const rows = [];
                    for (let i = 0; i < rowCount; ++i) {
                        rows.push(rowReferences[i].row);
                    }
                    modified.setRows(rows, 0);
                }
                modifier.emit({ type: 'afterModify', detail: eventDetail, table });
                return table;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options to group table rows.
         */
        SortModifier.defaultOptions = {
            type: 'Sort',
            direction: 'desc',
            orderByColumn: 'y'
        };
        DataModifier.registerType('Sort', SortModifier);
        /* *
         *
         *  Default Export
         *
         * */

        return SortModifier;
    });
    _registerModule(_modules, 'masters/modules/data-tools.src.js', [_modules['Core/Globals.js'], _modules['Data/Connectors/DataConnector.js'], _modules['Data/Converters/DataConverter.js'], _modules['Data/DataCursor.js'], _modules['Data/Modifiers/DataModifier.js'], _modules['Data/DataPool.js'], _modules['Data/DataTable.js'], _modules['Data/Formula/Formula.js']], function (Highcharts, DataConnector, DataConverter, DataCursor, DataModifier, DataPool, DataTable, Formula) {

        const G = Highcharts;
        G.DataConnector = G.DataConnector || DataConnector;
        G.DataConverter = G.DataConverter || DataConverter;
        G.DataCursor = G.DataCursor || DataCursor;
        G.DataModifier = G.DataModifier || DataModifier;
        G.DataPool = G.DataPool || DataPool;
        G.DataTable = G.DataTable || DataTable;
        G.Formula = G.Formula || Formula;

        return Highcharts;
    });
}));