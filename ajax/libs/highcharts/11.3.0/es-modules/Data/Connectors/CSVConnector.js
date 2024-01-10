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
        const connector = this, converter = connector.converter, table = connector.table, { csv, csvURL, dataModifier } = connector.options;
        connector.emit({
            type: 'load',
            csv,
            detail: eventDetail,
            table
        });
        // If already loaded, clear the current rows
        table.deleteRows();
        return Promise
            .resolve(csvURL ?
            fetch(csvURL).then((response) => response.text()) :
            csv || '')
            .then((csv) => {
            if (csv) {
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
export default CSVConnector;
