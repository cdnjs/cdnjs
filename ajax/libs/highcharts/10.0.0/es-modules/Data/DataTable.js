/* *
 *
 *  (c) 2020-2021 Highsoft AS
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
'use strict';
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import DataPromise from './DataPromise.js';
import U from '../Core/Utilities.js';
var addEvent = U.addEvent, fireEvent = U.fireEvent, uniqueKey = U.uniqueKey;
/* *
 *
 *  Class
 *
 * */
/**
 * Class to manage columns and rows in a table structure.
 *
 * @private
 * @class
 * @name Highcharts.DataTable
 *
 * @param {Highcharts.DataTableColumnCollection} [columns]
 * Collection of columns.
 *
 * @param {string} [id]
 * DataTable identifier.
 */
var DataTable = /** @class */ (function () {
    /* *
     *
     *  Constructors
     *
     * */
    /**
     * Constructs an instance of the DataTable class.
     *
     * @param {Highcharts.DataTableColumnCollection} [columns]
     * Collection of columns.
     *
     * @param {string} [id]
     * DataTable identifier.
     */
    function DataTable(columns, id) {
        if (columns === void 0) { columns = {}; }
        /* *
         *
         *  Properties
         *
         * */
        /**
         * Mapping aliases to column names.
         * @private
         */
        this.aliasMap = {};
        /**
         * Whether the ID was automatic generated or given.
         *
         * @name Highcharts.DataTable#autoId
         * @type {boolean}
         */
        this.autoId = !id;
        this.columns = {};
        /**
         * ID of the table.
         *
         * @name Highcharts.DataTable#id
         * @type {string}
         */
        this.id = (id || uniqueKey());
        this.modified = this;
        this.rowCount = 0;
        this.versionTag = uniqueKey();
        var columnNames = Object.keys(columns), thisColumns = this.columns;
        var rowCount = 0;
        for (var i = 0, iEnd = columnNames.length, column = void 0, columnName = void 0; i < iEnd; ++i) {
            columnName = columnNames[i];
            column = columns[columnName].slice();
            thisColumns[columnName] = column;
            rowCount = Math.max(rowCount, column.length);
        }
        for (var i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
            thisColumns[columnNames[i]].length = rowCount;
        }
        this.rowCount = rowCount;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * Tests whether a row contains only null values.
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
     *   // handle null
     * }
     */
    DataTable.isNull = function (row) {
        if (row === DataTable.NULL) {
            return true;
        }
        if (row instanceof Array) {
            if (!row.length) {
                return false;
            }
            for (var i = 0, iEnd = row.length; i < iEnd; ++i) {
                if (row[i] !== null) {
                    return false;
                }
            }
        }
        else {
            var columnNames = Object.keys(row);
            if (!columnNames.length) {
                return false;
            }
            for (var i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                if (row[columnNames[i]] !== null) {
                    return false;
                }
            }
        }
        return true;
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Returns a clone of this data table.
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
    DataTable.prototype.clone = function (skipColumns, eventDetail) {
        var table = this, aliasMap = table.aliasMap, aliases = Object.keys(table.aliasMap);
        table.emit({ type: 'cloneTable', detail: eventDetail });
        var tableClone = new DataTable((skipColumns ? {} : table.columns), (table.autoId ? void 0 : table.id));
        if (!skipColumns) {
            tableClone.versionTag = table.versionTag;
            if (aliases.length) {
                var cloneAliasMap = tableClone.aliasMap;
                for (var i = 0, iEnd = aliases.length, alias = void 0; i < iEnd; ++i) {
                    alias = aliases[i];
                    cloneAliasMap[alias] = aliasMap[alias];
                }
            }
        }
        table.emit({
            type: 'afterCloneTable',
            detail: eventDetail,
            tableClone: tableClone
        });
        return tableClone;
    };
    /**
     * Deletes a column alias and returns the original column name.
     *
     * @function Highcharts.DataTable#deleteColumnAlias
     *
     * @param {string} alias
     * The alias to delete.
     *
     * @return {string|undefined}
     * Returns the original column name, if found.
     */
    DataTable.prototype.deleteColumnAlias = function (alias) {
        var _a;
        var table = this, aliasMap = table.aliasMap, deletedAlias = aliasMap[alias], modifier = table.modifier;
        if (deletedAlias) {
            delete table.aliasMap[alias];
            if (modifier) {
                modifier.modifyColumns(table, (_a = {}, _a[deletedAlias] = new Array(table.rowCount), _a), 0);
            }
        }
        return deletedAlias;
    };
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
    DataTable.prototype.deleteColumns = function (columnNames, eventDetail) {
        var table = this, columns = table.columns, deletedColumns = {}, modifiedColumns = {}, modifier = table.modifier, rowCount = table.rowCount;
        columnNames = (columnNames || Object.keys(columns));
        if (columnNames.length) {
            table.emit({
                type: 'deleteColumns',
                columnNames: columnNames,
                detail: eventDetail
            });
            for (var i = 0, iEnd = columnNames.length, column = void 0, columnName = void 0; i < iEnd; ++i) {
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
                columnNames: columnNames,
                detail: eventDetail
            });
            return deletedColumns;
        }
    };
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
    DataTable.prototype.deleteRows = function (rowIndex, rowCount, eventDetail) {
        if (rowCount === void 0) { rowCount = 1; }
        var table = this, deletedRows = [], modifiedRows = [], modifier = table.modifier;
        table.emit({
            type: 'deleteRows',
            detail: eventDetail,
            rowCount: rowCount,
            rowIndex: (rowIndex || 0)
        });
        if (typeof rowIndex === 'undefined') {
            rowIndex = 0;
            rowCount = table.rowCount;
        }
        if (rowCount > 0 && rowIndex < table.rowCount) {
            var columns = table.columns, columnNames = Object.keys(columns);
            for (var i = 0, iEnd = columnNames.length, column = void 0, deletedCells = void 0; i < iEnd; ++i) {
                column = columns[columnNames[i]];
                deletedCells = column.splice(rowIndex, rowCount);
                if (!i) {
                    table.rowCount = column.length;
                }
                for (var j = 0, jEnd = deletedCells.length; j < jEnd; ++j) {
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
            rowCount: rowCount,
            rowIndex: (rowIndex || 0),
            rows: deletedRows
        });
        return deletedRows;
    };
    /**
     * Emits an event on this table to all registered callbacks of the given
     * event.
     * @private
     *
     * @param {DataTable.Event} e
     * Event object with event information.
     */
    DataTable.prototype.emit = function (e) {
        var frame = this;
        switch (e.type) {
            case 'afterDeleteColumns':
            case 'afterDeleteRows':
            case 'afterSetCell':
            case 'afterSetColumns':
            case 'afterSetRows':
                frame.versionTag = uniqueKey();
                break;
            default:
        }
        fireEvent(frame, e.type, e);
    };
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
    DataTable.prototype.getCell = function (columnNameOrAlias, rowIndex) {
        var table = this;
        columnNameOrAlias = (table.aliasMap[columnNameOrAlias] ||
            columnNameOrAlias);
        var column = table.columns[columnNameOrAlias];
        if (column) {
            return column[rowIndex];
        }
    };
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
    DataTable.prototype.getCellAsBoolean = function (columnNameOrAlias, rowIndex) {
        var table = this;
        columnNameOrAlias = (table.aliasMap[columnNameOrAlias] ||
            columnNameOrAlias);
        var column = table.columns[columnNameOrAlias];
        return !!(column && column[rowIndex]);
    };
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
    DataTable.prototype.getCellAsNumber = function (columnNameOrAlias, rowIndex, useNaN) {
        var table = this;
        columnNameOrAlias = (table.aliasMap[columnNameOrAlias] ||
            columnNameOrAlias);
        var column = table.columns[columnNameOrAlias];
        var cellValue = (column && column[rowIndex]);
        switch (typeof cellValue) {
            case 'boolean':
                return (cellValue ? 1 : 0);
            case 'number':
                return (isNaN(cellValue) && !useNaN ? null : cellValue);
        }
        cellValue = parseFloat("" + cellValue);
        return (isNaN(cellValue) && !useNaN ? null : cellValue);
    };
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
    DataTable.prototype.getCellAsString = function (columnNameOrAlias, rowIndex) {
        var table = this;
        columnNameOrAlias = (table.aliasMap[columnNameOrAlias] ||
            columnNameOrAlias);
        var column = table.columns[columnNameOrAlias];
        return "" + (column && column[rowIndex]);
    };
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
    DataTable.prototype.getColumn = function (columnNameOrAlias, asReference) {
        return this.getColumns([columnNameOrAlias], asReference)[columnNameOrAlias];
    };
    /**
     * Fetches all column aliases.
     *
     * @function Highcharts.DataTable#getColumnAliases
     *
     * @return {Array<string>}
     * Returns all column aliases.
     */
    DataTable.prototype.getColumnAliases = function () {
        var table = this, columnAliases = Object.keys(table.aliasMap);
        return columnAliases;
    };
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
    DataTable.prototype.getColumnAsNumbers = function (columnNameOrAlias, useNaN) {
        var table = this, columns = table.columns;
        columnNameOrAlias = (table.aliasMap[columnNameOrAlias] ||
            columnNameOrAlias);
        var column = columns[columnNameOrAlias], columnAsNumber = [];
        if (column) {
            var columnLength = column.length;
            if (useNaN) {
                for (var i = 0; i < columnLength; ++i) {
                    columnAsNumber.push(table.getCellAsNumber(columnNameOrAlias, i, true));
                }
            }
            else {
                for (var i = 0, cellValue = void 0; i < columnLength; ++i) {
                    cellValue = column[i];
                    if (typeof cellValue === 'number') {
                        // assume unmixed data for performance reasons
                        return column.slice();
                    }
                    if (cellValue !== null &&
                        typeof cellValue !== 'undefined') {
                        break;
                    }
                }
                for (var i = 0; i < columnLength; ++i) {
                    columnAsNumber.push(table.getCellAsNumber(columnNameOrAlias, i));
                }
            }
        }
        return columnAsNumber;
    };
    /**
     * Fetches all column names.
     *
     * @function Highcharts.DataTable#getColumnNames
     *
     * @return {Array<string>}
     * Returns all column names.
     */
    DataTable.prototype.getColumnNames = function () {
        var table = this, columnNames = Object.keys(table.columns);
        return columnNames;
    };
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
    DataTable.prototype.getColumns = function (columnNamesOrAliases, asReference) {
        var table = this, tableAliasMap = table.aliasMap, tableColumns = table.columns, columns = {};
        columnNamesOrAliases = (columnNamesOrAliases || Object.keys(tableColumns));
        for (var i = 0, iEnd = columnNamesOrAliases.length, column = void 0, columnName = void 0; i < iEnd; ++i) {
            columnName = columnNamesOrAliases[i];
            column = tableColumns[(tableAliasMap[columnName] || columnName)];
            if (column) {
                columns[columnName] = (asReference ? column : column.slice());
            }
        }
        return columns;
    };
    /**
     * Retrieves the modifier for the table.
     * @private
     *
     * @return {Highcharts.DataModifier|undefined}
     * Returns the modifier or `undefined`.
     */
    DataTable.prototype.getModifier = function () {
        return this.modifier;
    };
    /**
     * Retrieves the row at a given index. This function is a simplified wrap of
     * {@link getRows}.
     *
     * @function Highcharts.DataTable#getRow
     *
     * @param {number} rowIndex
     * Row index.
     *
     * @param {Array<string>} [columnNamesOrAliases]
     * Column names or aliases in order to retrieve.
     *
     * @return {Highcharts.DataTableRow}
     * Returns the row values, or `undefined` if not found.
     */
    DataTable.prototype.getRow = function (rowIndex, columnNamesOrAliases) {
        return this.getRows(rowIndex, 1, columnNamesOrAliases)[0];
    };
    /**
     * Returns the number of rows in this table.
     *
     * @function Highcharts.DataTable#getRowCount
     *
     * @return {number}
     * Number of rows in this table.
     */
    DataTable.prototype.getRowCount = function () {
        // @todo Implement via property getter `.length` browsers supported
        return this.rowCount;
    };
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
    DataTable.prototype.getRowIndexBy = function (columnNameOrAlias, cellValue, rowIndexOffset) {
        var table = this;
        columnNameOrAlias = (table.aliasMap[columnNameOrAlias] ||
            columnNameOrAlias);
        var column = table.columns[columnNameOrAlias];
        if (column) {
            var rowIndex = column.indexOf(cellValue, rowIndexOffset);
            if (rowIndex !== -1) {
                return rowIndex;
            }
        }
    };
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
    DataTable.prototype.getRowObject = function (rowIndex, columnNamesOrAliases) {
        return this.getRowObjects(rowIndex, 1, columnNamesOrAliases)[0];
    };
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
    DataTable.prototype.getRowObjects = function (rowIndex, rowCount, columnNamesOrAliases) {
        if (rowIndex === void 0) { rowIndex = 0; }
        if (rowCount === void 0) { rowCount = (this.rowCount - rowIndex); }
        var table = this, aliasMap = table.aliasMap, columns = table.columns, rows = new Array(rowCount);
        columnNamesOrAliases = (columnNamesOrAliases || Object.keys(columns));
        var columnNamesLength = columnNamesOrAliases.length;
        for (var i = rowIndex, i2 = 0, iEnd = Math.min(table.rowCount, (rowIndex + rowCount)), row = void 0; i < iEnd; ++i, ++i2) {
            row = rows[i2] = {};
            for (var j = 0, jEnd = columnNamesLength, columnName = void 0; j < jEnd; ++j) {
                columnName = columnNamesOrAliases[j];
                row[columnName] = columns[(aliasMap[columnName] || columnName)][i];
            }
        }
        return rows;
    };
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
    DataTable.prototype.getRows = function (rowIndex, rowCount, columnNamesOrAliases) {
        if (rowIndex === void 0) { rowIndex = 0; }
        if (rowCount === void 0) { rowCount = (this.rowCount - rowIndex); }
        var table = this, aliasMap = table.aliasMap, columns = table.columns, rows = new Array(rowCount);
        columnNamesOrAliases = (columnNamesOrAliases || Object.keys(columns));
        var columnNamesLength = columnNamesOrAliases.length;
        for (var i = rowIndex, i2 = 0, iEnd = Math.min(table.rowCount, (rowIndex + rowCount)), columnName = void 0, row = void 0; i < iEnd; ++i, ++i2) {
            row = rows[i2] = new Array(columnNamesLength);
            for (var j = 0; j < columnNamesLength; ++j) {
                columnName = columnNamesOrAliases[j];
                row[j] = columns[(aliasMap[columnName] || columnName)][i];
            }
        }
        return rows;
    };
    /**
     * Returns the unique version tag of the current state of the table.
     *
     * @function Highcharts.DataTable#getVersionTag
     *
     * @return {string}
     * Unique version tag.
     */
    DataTable.prototype.getVersionTag = function () {
        return this.versionTag;
    };
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
    DataTable.prototype.hasColumns = function (columnNamesOrAliases) {
        var table = this, aliasMap = table.aliasMap, columns = table.columns;
        for (var i = 0, iEnd = columnNamesOrAliases.length, columnName = void 0; i < iEnd; ++i) {
            columnName = columnNamesOrAliases[i];
            if (!columns[columnName] && !aliasMap[columnName]) {
                return false;
            }
        }
        return true;
    };
    /**
     * Searches for a specific cell value.
     *
     * @function Highcharts.DataTable#hasRowWith
     *
     * @param {string} columnNameOrAlias
     * Column to search in.
     *
     * @param {boolean|number|string|Highcharts.DataTable} cellValue
     * Cell value to search for. `NaN` and `undefined` are not supported.
     *
     * @return {boolean}
     * True, if a row has been found, otherwise false.
     */
    DataTable.prototype.hasRowWith = function (columnNameOrAlias, cellValue) {
        var table = this;
        columnNameOrAlias = (table.aliasMap[columnNameOrAlias] ||
            columnNameOrAlias);
        var column = table.columns[columnNameOrAlias];
        if (column) {
            return (column.indexOf(cellValue) !== -1);
        }
        return false;
    };
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
    DataTable.prototype.on = function (type, callback) {
        return addEvent(this, type, callback);
    };
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
    DataTable.prototype.renameColumn = function (columnName, newColumnName) {
        var table = this, columns = table.columns;
        if (columns[columnName]) {
            if (columnName !== newColumnName) {
                var aliasMap = table.aliasMap;
                if (aliasMap[newColumnName]) {
                    delete aliasMap[newColumnName];
                }
                columns[newColumnName] = columns[columnName];
                delete columns[columnName];
            }
            return true;
        }
        return false;
    };
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
    DataTable.prototype.setCell = function (columnNameOrAlias, rowIndex, cellValue, eventDetail) {
        var table = this, columns = table.columns, modifier = table.modifier;
        columnNameOrAlias = (table.aliasMap[columnNameOrAlias] ||
            columnNameOrAlias);
        var column = columns[columnNameOrAlias];
        if (column && column[rowIndex] === cellValue) {
            return;
        }
        table.emit({
            type: 'setCell',
            cellValue: cellValue,
            columnName: columnNameOrAlias,
            detail: eventDetail,
            rowIndex: rowIndex
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
            cellValue: cellValue,
            columnName: columnNameOrAlias,
            detail: eventDetail,
            rowIndex: rowIndex
        });
    };
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
    DataTable.prototype.setColumn = function (columnNameOrAlias, column, rowIndex, eventDetail) {
        var _a;
        if (column === void 0) { column = []; }
        if (rowIndex === void 0) { rowIndex = 0; }
        this.setColumns((_a = {}, _a[columnNameOrAlias] = column, _a), rowIndex, eventDetail);
    };
    /**
     * Defines an alias for a column.
     *
     * @function Highcharts.DataTable#setColumnAlias
     *
     * @param {string} columnAlias
     * Column alias to create.
     *
     * @param {string} columnName
     * Column name to create an alias for.
     *
     * @return {boolean}
     * True if successfully changed, false if reserved.
     */
    DataTable.prototype.setColumnAlias = function (columnAlias, columnName) {
        var aliasMap = this.aliasMap;
        if (!aliasMap[columnAlias]) {
            aliasMap[columnAlias] = columnName;
            return true;
        }
        return false;
    };
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
    DataTable.prototype.setColumns = function (columns, rowIndex, eventDetail) {
        var table = this, tableColumns = table.columns, tableModifier = table.modifier, tableRowCount = table.rowCount, reset = (typeof rowIndex === 'undefined'), columnNames = Object.keys(columns);
        table.emit({
            type: 'setColumns',
            columns: columns,
            columnNames: columnNames,
            detail: eventDetail,
            rowIndex: rowIndex
        });
        for (var i = 0, iEnd = columnNames.length, column = void 0, columnName = void 0; i < iEnd; ++i) {
            columnName = columnNames[i];
            column = columns[columnName];
            columnName = (table.aliasMap[columnName] ||
                columnName);
            if (reset) {
                tableColumns[columnName] = column.slice();
                table.rowCount = column.length;
            }
            else {
                var tableColumn = (tableColumns[columnName] ?
                    tableColumns[columnName] :
                    tableColumns[columnName] = new Array(table.rowCount));
                rowIndex = (rowIndex || 0);
                if (rowIndex > tableRowCount) {
                    tableColumn.length = rowIndex;
                    tableColumn.push.apply(tableColumn, column);
                }
                else {
                    tableColumn.splice.apply(tableColumn, __spreadArrays([rowIndex,
                        (column.length - rowIndex)], column));
                }
                table.rowCount = Math.max(table.rowCount, tableColumn.length);
            }
        }
        var tableColumnNames = Object.keys(tableColumns);
        for (var i = 0, iEnd = tableColumnNames.length; i < iEnd; ++i) {
            tableColumns[tableColumnNames[i]].length = table.rowCount;
        }
        if (tableModifier) {
            tableModifier.modifyColumns(table, columns, (rowIndex || 0));
        }
        table.emit({
            type: 'afterSetColumns',
            columns: columns,
            columnNames: columnNames,
            detail: eventDetail,
            rowIndex: rowIndex
        });
    };
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
    DataTable.prototype.setModifier = function (modifier, eventDetail) {
        var table = this;
        var promise;
        table.emit({
            type: 'setModifier',
            detail: eventDetail,
            modifier: modifier,
            modified: table.modified
        });
        table.modifier = modifier;
        if (modifier) {
            promise = modifier.modify(table);
        }
        else {
            promise = DataPromise
                .resolve(table)
                .then(function (table) {
                table.modified = table;
                return table;
            });
        }
        return promise
            .then(function (table) {
            table.emit({
                type: 'afterSetModifier',
                detail: eventDetail,
                modifier: modifier,
                modified: table.modified
            });
            return table;
        })['catch'](function (error) {
            table.emit({
                type: 'setModifierError',
                error: error,
                modifier: modifier,
                modified: table.modified
            });
            throw error;
        });
    };
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
    DataTable.prototype.setRow = function (row, rowIndex, eventDetail) {
        this.setRows([row], rowIndex, eventDetail);
    };
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
    DataTable.prototype.setRows = function (rows, rowIndex, eventDetail) {
        if (rowIndex === void 0) { rowIndex = this.rowCount; }
        var table = this, aliasMap = table.aliasMap, columns = table.columns, columnNames = Object.keys(columns), modifier = table.modifier, rowCount = rows.length;
        table.emit({
            type: 'setRows',
            detail: eventDetail,
            rowCount: rowCount,
            rowIndex: rowIndex,
            rows: rows
        });
        for (var i = 0, i2 = rowIndex, row = void 0; i < rowCount; ++i, ++i2) {
            row = rows[i];
            if (row === DataTable.NULL) {
                for (var j = 0, jEnd = columnNames.length; j < jEnd; ++j) {
                    columns[columnNames[j]][i2] = null;
                }
            }
            else if (row instanceof Array) {
                for (var j = 0, jEnd = columnNames.length; j < jEnd; ++j) {
                    columns[columnNames[j]][i2] = row[j];
                }
            }
            else {
                var rowColumnNames = Object.keys(row);
                for (var j = 0, jEnd = rowColumnNames.length, rowColumnName = void 0; j < jEnd; ++j) {
                    rowColumnName = rowColumnNames[j];
                    rowColumnName = (aliasMap[rowColumnName] || rowColumnName);
                    if (!columns[rowColumnName]) {
                        columns[rowColumnName] = new Array(i2 + 1);
                    }
                    columns[rowColumnName][i2] = row[rowColumnName];
                }
            }
        }
        var indexRowCount = (rowIndex + rowCount);
        if (indexRowCount > table.rowCount) {
            table.rowCount = indexRowCount;
            for (var i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                columns[columnNames[i]].length = indexRowCount;
            }
        }
        if (modifier) {
            modifier.modifyRows(table, rows, rowIndex);
        }
        table.emit({
            type: 'afterSetRows',
            detail: eventDetail,
            rowCount: rowCount,
            rowIndex: rowIndex,
            rows: rows
        });
    };
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * Null state for a row record.
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
    return DataTable;
}());
/* *
 *
 *  Default Export
 *
 * */
export default DataTable;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Possible value types for a table cell.
 * @private
 * @typedef {boolean|null|number|string|Highcharts.DataTable|undefined} Highcharts.DataTableCellType
 */
/**
 * Array of table cells in vertical expansion.
 * @private
 * @typedef {Array<Highcharts.DataTableCellType>} Highcharts.DataTableColumn
 */
/**
 * Collection of columns, where the key is the column name (or alias) and
 * the value is an array of column values.
 * @private
 * @interface Highcharts.DataTableColumnCollection
 * @readonly
 */ /**
* @name Highcharts.DataTableColumnCollection#[key:string]
* @type {Highcharts.DataTableColumn}
*/
/**
 * Custom information for an event.
 * @private
 * @typedef Highcharts.DataTableEventDetail
 * @type {Record<string,(boolean|number|string|null|undefined)>}
 */
/**
 * Array of table cells in horizontal expansion. Index of the array is the index
 * of the column names.
 * @private
 * @typedef {Array<Highcharts.DataTableCellType>} Highcharts.DataTableRow
 */
/**
 * Record of table cells in horizontal expansion. Keys of the record are the
 * column names (or aliases).
 * @private
 * @typedef {Record<string,Highcharts.DataTableCellType>} Highcharts.DataTableRowObject
 */
(''); // keeps doclets above in transpiled file
