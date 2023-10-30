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
import DataConnector from './DataConnector.js';
import U from '../../Core/Utilities.js';
import JSONConverter from '../Converters/JSONConverter.js';
const { merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Class that handles creating a DataConnector from JSON structure
 *
 * @private
 */
class JSONConnector extends DataConnector {
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of JSONConnector.
     *
     * @param {JSONConnector.UserOptions} [options]
     * Options for the connector and converter.
     */
    constructor(options) {
        const mergedOptions = merge(JSONConnector.defaultOptions, options);
        super(mergedOptions);
        this.converter = new JSONConverter(mergedOptions);
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
     * Initiates the loading of the JSON source to the connector
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits JSONConnector#load
     * @emits JSONConnector#afterLoad
     */
    load(eventDetail) {
        const connector = this, converter = connector.converter, table = connector.table, { data, dataUrl, dataModifier } = connector.options;
        connector.emit({
            type: 'load',
            data,
            detail: eventDetail,
            table
        });
        // If already loaded, clear the current rows
        table.deleteRows();
        return Promise
            .resolve(dataUrl ?
            fetch(dataUrl).then((json) => json.json()) :
            data || [])
            .then((data) => {
            if (data) {
                converter.parse({ data });
                table.setColumns(converter.getTable().getColumns());
            }
            return connector
                .setModifierOptions(dataModifier)
                .then(() => data);
        })
            .then((data) => {
            connector.emit({
                type: 'afterLoad',
                data,
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
JSONConnector.defaultOptions = {
    data: [],
    enablePolling: false,
    dataRefreshRate: 0,
    firstRowAsNames: true,
    orientation: 'rows'
};
DataConnector.registerType('JSON', JSONConnector);
/* *
 *
 *  Default Export
 *
 * */
export default JSONConnector;
