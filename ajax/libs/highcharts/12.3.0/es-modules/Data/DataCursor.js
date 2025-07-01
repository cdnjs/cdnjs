/* *
 *
 *  (c) 2020-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */
'use strict';
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
    /**
     * This function emits a state cursor related to a table. It will provide
     * lasting state cursors of the table to listeners.
     *
     * @example
     * ```ts
     * dataCursor.emit(myTable, {
     *     type: 'position',
     *     column: 'city',
     *     row: 4,
     *     state: 'hover',
     * });
     * ```
     *
     * @param {Data.DataTable} table
     * The related table of the cursor.
     *
     * @param {Data.DataCursor.Type} cursor
     * The state cursor to emit.
     *
     * @param {Event} [event]
     * Optional event information from a related source.
     *
     * @param {boolean} [lasting]
     * Whether this state cursor should be kept until it is cleared with
     * {@link DataCursor#remitCursor}.
     *
     * @return {Data.DataCursor}
     * Returns the DataCursor instance for a call chain.
     */
    emitCursor(table, cursor, event, lasting) {
        const tableId = table.id, state = cursor.state, listeners = (this.listenerMap[tableId] &&
            this.listenerMap[tableId][state]);
        if (listeners) {
            const stateMap = this.stateMap[tableId] = (this.stateMap[tableId] ?? {});
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
            if (index >= 0) {
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
export default DataCursor;
