/* *
 *
 *  (c) 2009-2025 Highsoft AS
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
const { merge, defined } = U;
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
     *
     * @param {Array<DataTableOptions>} [dataTables]
     * Multiple connector data tables options.
     *
     */
    constructor(options, dataTables) {
        const mergedOptions = merge(CSVConnector.defaultOptions, options);
        super(mergedOptions, dataTables);
        this.options = defined(dataTables) ?
            merge(mergedOptions, { dataTables }) : mergedOptions;
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
        const connector = this, tables = connector.dataTables, { csv, csvURL, dataModifier, dataTables } = connector.options;
        connector.emit({
            type: 'load',
            csv,
            detail: eventDetail,
            tables
        });
        return Promise
            .resolve(csvURL ?
            fetch(csvURL, {
                signal: connector?.pollingController?.signal
            }).then((response) => response.text()) :
            csv || '')
            .then((csv) => {
            if (csv) {
                this.initConverters(csv, (key) => {
                    const options = this.options;
                    const tableOptions = dataTables?.find((dataTable) => dataTable.key === key);
                    // Takes over the connector default options.
                    const mergedTableOptions = {
                        dataTableKey: key,
                        firstRowAsNames: tableOptions?.firstRowAsNames ??
                            options.firstRowAsNames,
                        beforeParse: tableOptions?.beforeParse ??
                            options.beforeParse
                    };
                    return new CSVConverter(merge(this.options, mergedTableOptions));
                }, (converter, data) => {
                    converter.parse({ csv: data });
                });
            }
            return connector
                .setModifierOptions(dataModifier, dataTables)
                .then(() => csv);
        })
            .then((csv) => {
            connector.emit({
                type: 'afterLoad',
                csv,
                detail: eventDetail,
                tables
            });
            return connector;
        })['catch']((error) => {
            connector.emit({
                type: 'loadError',
                detail: eventDetail,
                error,
                tables
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
