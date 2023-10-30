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
import DataConverter from './DataConverter.js';
import DataTable from '../DataTable.js';
import U from '../../Core/Utilities.js';
const { merge, isArray } = U;
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
        this.dataTypes = [];
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
                if (firstRowAsNames) {
                    converter.headers.push(`${item.shift()}`);
                }
                else if (columnNames) {
                    converter.headers.push(columnNames[i]);
                }
                converter.table.setColumn(converter.headers[i] || i.toString(), item);
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
                const row = data[rowIndex];
                if (isArray(row)) {
                    for (let columnIndex = 0, jEnd = row.length; columnIndex < jEnd; columnIndex++) {
                        if (converter.columns.length < columnIndex + 1) {
                            converter.columns.push([]);
                        }
                        converter.columns[columnIndex].push(row[columnIndex]);
                        this.table.setCell(converter.headers[columnIndex] ||
                            rowIndex.toString(), rowIndex, row[columnIndex]);
                    }
                }
                else {
                    this.table.setRows([row], rowIndex);
                }
            }
        }
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
    orientation: 'columns'
};
/* *
 *
 *  Default Export
 *
 * */
export default JSONConverter;
