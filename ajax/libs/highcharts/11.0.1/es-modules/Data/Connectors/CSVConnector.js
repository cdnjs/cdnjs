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
 *  - Christer Vasseng
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */
'use strict';
import CSVConverter from '../Converters/CSVConverter.js';
import DataConnector from './DataConnector.js';
import U from '../../Core/Utilities.js';
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
        const connector = this, converter = connector.converter, table = connector.table, { csv, csvURL } = connector.options;
        if (csv) {
            // If already loaded, clear the current rows
            table.deleteRows();
            connector.emit({
                type: 'load',
                csv,
                detail: eventDetail,
                table
            });
            converter.parse({ csv });
            table.setColumns(converter.getTable().getColumns());
            connector.emit({
                type: 'afterLoad',
                csv,
                detail: eventDetail,
                table
            });
        }
        else if (csvURL) {
            // Clear the table
            connector.table.deleteColumns();
            connector.emit({
                type: 'load',
                detail: eventDetail,
                table: connector.table
            });
            return fetch(csvURL || '')
                .then((response) => response.text().then((csv) => {
                connector.converter.parse({ csv });
                // On inital fetch we need to set the columns
                connector.table.setColumns(connector.converter.getTable().getColumns());
                connector.emit({
                    type: 'afterLoad',
                    csv,
                    detail: eventDetail,
                    table: connector.table
                });
            }))['catch']((error) => {
                connector.emit({
                    type: 'loadError',
                    detail: eventDetail,
                    error,
                    table: connector.table
                });
                return Promise.reject(error);
            })
                .then(() => connector);
        }
        else {
            connector.emit({
                type: 'loadError',
                detail: eventDetail,
                error: 'Unable to load: no CSV string or URL was provided',
                table
            });
        }
        return Promise.resolve(connector);
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
    dataRefreshRate: 1
};
DataConnector.registerType('CSV', CSVConnector);
/* *
 *
 *  Default Export
 *
 * */
export default CSVConnector;
