/* *
 *
 *  (c) 2009-2023 Highsoft AS
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
import DataConnector from './Connectors/DataConnector.js';
import DataPoolDefaults from './DataPoolDefaults.js';
import U from '../Core/Utilities.js';
/* *
 *
 *  Class
 *
 * */
/**
 * Data pool to load connectors on-demand.
 *
 * @class
 * @name Data.DataPool
 *
 * @param {Data.DataPoolOptions} options
 * Pool options with all connectors.
 */
class DataPool {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(options = DataPoolDefaults) {
        options.connectors = (options.connectors || []);
        this.connectors = {};
        this.options = options;
        this.waiting = {};
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Emits an event on this data pool to all registered callbacks of the given
     * event.
     * @private
     *
     * @param {DataTable.Event} e
     * Event object with event information.
     */
    emit(e) {
        U.fireEvent(this, e.type, e);
    }
    /**
     * Loads the connector.
     *
     * @function Data.DataPool#getConnector
     *
     * @param {string} name
     * Name of the connector.
     *
     * @return {Promise<Data.DataConnector>}
     * Returns the connector.
     */
    getConnector(name) {
        const connector = this.connectors[name];
        // already loaded
        if (connector) {
            return Promise.resolve(connector);
        }
        let waitingList = this.waiting[name];
        // start loading
        if (!waitingList) {
            waitingList = this.waiting[name] = [];
            const connectorOptions = this.getConnectorOptions(name);
            if (!connectorOptions) {
                throw new Error(`Connector not found. (${name})`);
            }
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this
                .loadConnector(connectorOptions)
                .then((connector) => {
                delete this.waiting[name];
                for (let i = 0, iEnd = waitingList.length; i < iEnd; ++i) {
                    waitingList[i][0](connector);
                }
            })['catch']((error) => {
                delete this.waiting[name];
                for (let i = 0, iEnd = waitingList.length; i < iEnd; ++i) {
                    waitingList[i][1](error);
                }
            });
        }
        // add request to waiting list
        return new Promise((resolve, reject) => {
            waitingList.push([resolve, reject]);
        });
    }
    /**
     * Returns the names of all connectors.
     *
     * @private
     *
     * @return {Array<string>}
     * Names of all connectors.
     */
    getConnectorIds() {
        const connectors = this.options.connectors, connectorIds = [];
        for (let i = 0, iEnd = connectors.length; i < iEnd; ++i) {
            connectorIds.push(connectors[i].id);
        }
        return connectorIds;
    }
    /**
     * Loads the options of the connector.
     *
     * @private
     *
     * @param {string} id
     * Name of the connector.
     *
     * @return {DataPoolConnectorOptions|undefined}
     * Returns the options of the connector, or `undefined` if not found.
     */
    getConnectorOptions(id) {
        const connectors = this.options.connectors;
        for (let i = 0, iEnd = connectors.length; i < iEnd; ++i) {
            if (connectors[i].id === id) {
                return connectors[i];
            }
        }
    }
    /**
     * Loads the connector table.
     *
     * @function Data.DataPool#getConnectorTable
     *
     * @param {string} connectorId
     * Name of the connector.
     *
     * @return {Promise<Data.DataTable>}
     * Returns the connector table.
     */
    getConnectorTable(connectorId) {
        return this
            .getConnector(connectorId)
            .then((connector) => connector.table);
    }
    /**
     * Creates and loads the connector.
     *
     * @private
     *
     * @param {Data.DataPoolConnectorOptions} options
     * Options of connector.
     *
     * @return {Promise<Data.DataConnector>}
     * Returns the connector.
     */
    loadConnector(options) {
        return new Promise((resolve, reject) => {
            this.emit({
                type: 'load',
                options
            });
            const ConnectorClass = DataConnector.types[options.type];
            if (!ConnectorClass) {
                throw new Error(`Connector type not found. (${options.type})`);
            }
            const connector = new ConnectorClass(options.options);
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            connector
                .load()
                .then((connector) => {
                this.connectors[options.id] = connector;
                this.emit({
                    type: 'afterLoad',
                    options
                });
                resolve(connector);
            })['catch'](reject);
        });
    }
    /**
     * Registers a callback for a specific event.
     *
     * @function Highcharts.DataPool#on
     *
     * @param {string} type
     * Event type as a string.
     *
     * @param {Highcharts.EventCallbackFunction<Highcharts.DataPool>} callback
     * Function to register for an event callback.
     *
     * @return {Function}
     * Function to unregister callback from the event.
     */
    on(type, callback) {
        return U.addEvent(this, type, callback);
    }
    /**
     * Sets connector options with a specific name.
     *
     * @param {Data.DataPoolConnectorOptions} options
     * Connector options to set.
     */
    setConnectorOptions(options) {
        const connectors = this.options.connectors;
        this.emit({
            type: 'setConnectorOptions',
            options
        });
        for (let i = 0, iEnd = connectors.length; i < iEnd; ++i) {
            if (connectors[i].id === options.id) {
                connectors.splice(i, 1);
                break;
            }
        }
        connectors.push(options);
        this.emit({
            type: 'afterSetConnectorOptions',
            options
        });
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * Semantic version string of the DataPool class.
 * @internal
 */
DataPool.version = '1.0.0';
/* *
 *
 *  Default Export
 *
 * */
export default DataPool;
