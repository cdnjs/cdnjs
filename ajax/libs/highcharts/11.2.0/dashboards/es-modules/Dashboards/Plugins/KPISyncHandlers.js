/* *
 *
 *  (c) 2009-2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Pawel Lysy
 *
 * */
'use strict';
import U from '../../Core/Utilities.js';
const { defined } = U;
/* *
 *
 *  Constants
 *
 * */
const configs = {
    emitters: {},
    handlers: {
        extremesHandler: function () {
            const { board } = this;
            const handleChangeExtremes = (e) => {
                const cursor = e.cursor;
                if (cursor.type === 'position' &&
                    typeof cursor?.row === 'number' &&
                    defined(cursor.column) &&
                    this.connector &&
                    !defined(this.options.value)) {
                    const value = this.connector.table.modified.getCellAsString(cursor.column, cursor.row);
                    this.setValue(value);
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
                cursor.addListener(table.id, 'xAxis.extremes.max', handleChangeExtremes);
            };
            const unregisterCursorListeners = () => {
                const table = this.connector && this.connector.table;
                const { dataCursor: cursor } = board;
                if (!table) {
                    return;
                }
                cursor.removeListener(table.id, 'xAxis.extremes.max', handleChangeExtremes);
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
    extremes: { handler: configs.handlers.extremesHandler }
};
export default defaults;
