/* *
 *
 *  (c) 2009-2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Karol Kolodziej
 *
 * */
/* eslint-disable require-jsdoc, max-len */
'use strict';
import U from '../../Core/Utilities.js';
const { addEvent } = U;
/* *
 *
 *  Constants
 *
 * */
const configs = {
    emitters: {
        highlightEmitter: [
            'highlightEmitter',
            function () {
                if (this.type === 'DataGrid') {
                    const { dataGrid, board } = this;
                    if (board) {
                        const { dataCursor: cursor } = board;
                        const callbacks = [];
                        if (!dataGrid) {
                            return;
                        }
                        callbacks.push(addEvent(dataGrid.container, 'dataGridHover', (e) => {
                            const table = this.connector && this.connector.table;
                            if (table) {
                                const row = e.row;
                                const cell = row.querySelector(`.highcharts-datagrid-cell[data-original-data="${row.dataset.rowXIndex}"]`);
                                cursor.emitCursor(table, {
                                    type: 'position',
                                    row: parseInt(row.dataset.rowIndex, 10),
                                    column: cell ? cell.dataset.columnName : void 0,
                                    state: 'dataGrid.hoverRow'
                                });
                            }
                        }));
                        callbacks.push(addEvent(dataGrid.container, 'mouseout', () => {
                            const table = this.connector && this.connector.table;
                            if (table) {
                                cursor.emitCursor(table, {
                                    type: 'position',
                                    state: 'dataGrid.hoverOut'
                                });
                            }
                        }));
                        // Return a function that calls the callbacks
                        return function () {
                            callbacks.forEach((callback) => callback());
                        };
                    }
                }
            }
        ]
    },
    handlers: {
        highlightHandler: [
            'highlightHandler',
            void 0,
            function () {
                const { board } = this;
                const handlCursor = (e) => {
                    const cursor = e.cursor;
                    if (cursor.type === 'position') {
                        const { row } = cursor;
                        const { dataGrid } = this;
                        if (row !== void 0 && dataGrid) {
                            const highlightedDataRow = dataGrid.container
                                .querySelector(`.highcharts-datagrid-row[data-row-index="${row}"]`);
                            if (highlightedDataRow) {
                                dataGrid.toggleRowHighlight(highlightedDataRow);
                                dataGrid.hoveredRow = highlightedDataRow;
                            }
                        }
                    }
                };
                const handleCursorOut = () => {
                    const { dataGrid } = this;
                    if (dataGrid) {
                        dataGrid.toggleRowHighlight(void 0);
                    }
                };
                const registerCursorListeners = () => {
                    const { dataCursor: cursor } = board;
                    if (!cursor) {
                        return;
                    }
                    const table = this.connector && this.connector.table;
                    if (!table) {
                        return;
                    }
                    cursor.addListener(table.id, 'point.mouseOver', handlCursor);
                    cursor.addListener(table.id, 'point.mouseOut', handleCursorOut);
                };
                const unregisterCursorListeners = () => {
                    const cursor = board.dataCursor;
                    const table = this.connector && this.connector.table;
                    if (!table) {
                        return;
                    }
                    cursor.addListener(table.id, 'point.mouseOver', handlCursor);
                    cursor.addListener(table.id, 'point.mouseOut', handleCursorOut);
                };
                if (board) {
                    registerCursorListeners();
                    this.on('setConnector', () => unregisterCursorListeners());
                    this.on('afterSetConnector', () => registerCursorListeners());
                }
            }
        ],
        extremesHandler: function () {
            const { board } = this;
            const handleChangeExtremes = (e) => {
                const cursor = e.cursor;
                if (cursor.type === 'position' &&
                    this.dataGrid &&
                    typeof cursor?.row === 'number') {
                    const { row } = cursor;
                    this.dataGrid.scrollToRow(row);
                }
            };
            const registerCursorListeners = () => {
                const { dataCursor: cursor } = board;
                if (!cursor) {
                    return;
                }
                const table = this.connector && this.connector.table;
                if (!table) {
                    return;
                }
                cursor.addListener(table.id, 'xAxis.extremes.min', handleChangeExtremes);
            };
            const unregisterCursorListeners = () => {
                const table = this.connector && this.connector.table;
                const { dataCursor: cursor } = board;
                if (!table) {
                    return;
                }
                cursor.removeListener(table.id, 'xAxis.extremes.min', handleChangeExtremes);
            };
            if (board) {
                registerCursorListeners();
                this.on('setConnector', () => unregisterCursorListeners());
                this.on('afterSetConnector', () => registerCursorListeners());
            }
        },
        visibilityHandler: function () {
            const component = this, { board } = component;
            const handleVisibilityChange = (e) => {
                const cursor = e.cursor, dataGrid = component.dataGrid;
                if (!(dataGrid && cursor.type === 'position' && cursor.column)) {
                    return;
                }
                const columnName = cursor.column;
                dataGrid.update({
                    columns: {
                        [columnName]: {
                            show: cursor.state !== 'series.hide'
                        }
                    }
                });
            };
            const registerCursorListeners = () => {
                const { dataCursor: cursor } = board;
                if (!cursor) {
                    return;
                }
                const table = this.connector && this.connector.table;
                if (!table) {
                    return;
                }
                cursor.addListener(table.id, 'series.show', handleVisibilityChange);
                cursor.addListener(table.id, 'series.hide', handleVisibilityChange);
            };
            const unregisterCursorListeners = () => {
                const table = this.connector && this.connector.table;
                const { dataCursor: cursor } = board;
                if (!table) {
                    return;
                }
                cursor.removeListener(table.id, 'series.show', handleVisibilityChange);
                cursor.removeListener(table.id, 'series.hide', handleVisibilityChange);
            };
            if (board) {
                registerCursorListeners();
                this.on('setConnector', () => unregisterCursorListeners());
                this.on('afterSetConnector', () => registerCursorListeners());
            }
        }
    }
};
const defaults = {
    highlight: { emitter: configs.emitters.highlightEmitter, handler: configs.handlers.highlightHandler },
    extremes: { handler: configs.handlers.extremesHandler },
    visibility: { handler: configs.handlers.visibilityHandler }
};
export default defaults;
