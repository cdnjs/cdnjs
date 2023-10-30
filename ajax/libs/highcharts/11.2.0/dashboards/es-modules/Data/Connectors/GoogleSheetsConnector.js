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
import DataConnector from './DataConnector.js';
import GoogleSheetsConverter from '../Converters/GoogleSheetsConverter.js';
import U from '../../Core/Utilities.js';
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
        // If already loaded, clear the current table
        table.deleteColumns();
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
export default GoogleSheetsConnector;
