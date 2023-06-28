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
import DataPoolDefaults from './DataPoolDefaults.js';
import DataConnector from './Connectors/DataConnector.js';
/* *
 *
 *  Class
 *
 * */
/**
 * Data pool to load connectors on-demand.
 *
 * @private
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
        this.options = options;
        this.connectors = {};
    }
    /* *
     *
     *  Functions
     *
     * */
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
        if (connector) {
            // already loaded
            return Promise.resolve(connector);
        }
        const connectorOptions = this.getConnectorOptions(name);
        if (connectorOptions) {
            return this.loadConnector(connectorOptions);
        }
        throw new Error(`Connector not found. (${name})`);
    }
    /**
     * Loads the options of the connector.
     *
     * @private
     *
     * @param {string} name
     * Name of the connector.
     *
     * @return {DataPoolConnectorOptions|undefined}
     * Returns the options of the connector, or `undefined` if not found.
     */
    getConnectorOptions(name) {
        const connectors = this.options.connectors;
        for (let i = 0, iEnd = connectors.length; i < iEnd; ++i) {
            if (connectors[i].name === name) {
                return connectors[i];
            }
        }
    }
    /**
     * Loads the connector table.
     *
     * @function Data.DataPool#getConnectorTable
     *
     * @param {string} name
     * Name of the connector.
     *
     * @return {Promise<Data.DataTable>}
     * Returns the connector table.
     */
    getConnectorTable(name) {
        return this
            .getConnector(name)
            .then((connector) => connector.table);
    }
    /**
     * Creates and loads the connector.
     *
     * @private
     *
     * @param {Data.DataPoolConnectorOptions} connectorOptions
     * Options of connector.
     *
     * @return {Promise<Data.DataConnector>}
     * Returns the connector.
     */
    loadConnector(connectorOptions) {
        return new Promise((resolve, reject) => {
            const ConnectorClass = DataConnector.types[connectorOptions.type];
            if (!ConnectorClass) {
                throw new Error(`Connector type not found. (${connectorOptions.type})`);
            }
            const connector = new ConnectorClass(connectorOptions.options);
            this.connectors[connectorOptions.name] = connector;
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            connector.load().then(resolve)['catch'](reject);
        });
    }
    /**
     * Sets connector options with a specific name.
     *
     * @param {Data.DataPoolConnectorOptions} connectorOptions
     * Connector options to set.
     */
    setConnectorOptions(connectorOptions) {
        const connectors = this.options.connectors;
        for (let i = 0, iEnd = connectors.length; i < iEnd; ++i) {
            if (connectors[i].name === connectorOptions.name) {
                connectors.splice(i, 1, connectorOptions);
                return;
            }
        }
        connectors.push(connectorOptions);
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default DataPool;
