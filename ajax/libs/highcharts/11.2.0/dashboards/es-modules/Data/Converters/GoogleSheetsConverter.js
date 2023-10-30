/* *
 *
 *  (c) 2009-2023 Highsoft AS
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
'use strict';
import DataConverter from './DataConverter.js';
import U from '../../Core/Utilities.js';
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
export default GoogleSheetsConverter;
