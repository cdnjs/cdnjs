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
 *  - Gøran Slettemark
 *  - Wojciech Chmiel
 *  - Sophie Bremer
 *
 * */
'use strict';
import DataConnector from './DataConnector.js';
import H from '../../Core/Globals.js';
const { win } = H;
import HTMLTableConverter from '../Converters/HTMLTableConverter.js';
import U from '../../Core/Utilities.js';
const { merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Class that handles creating a data connector from an HTML table.
 *
 * @private
 */
class HTMLTableConnector extends DataConnector {
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of HTMLTableConnector.
     *
     * @param {HTMLTableConnector.UserOptions} [options]
     * Options for the connector and converter.
     */
    constructor(options) {
        const mergedOptions = merge(HTMLTableConnector.defaultOptions, options);
        super(mergedOptions);
        this.converter = new HTMLTableConverter(mergedOptions);
        this.options = mergedOptions;
    }
    /**
     * Initiates creating the dataconnector from the HTML table
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits HTMLTableConnector#load
     * @emits HTMLTableConnector#afterLoad
     * @emits HTMLTableConnector#loadError
     */
    load(eventDetail) {
        const connector = this, converter = connector.converter, table = connector.table, { dataModifier, table: tableHTML } = connector.options;
        connector.emit({
            type: 'load',
            detail: eventDetail,
            tables: { table },
            tableElement: connector.tableElement
        });
        let tableElement;
        if (typeof tableHTML === 'string') {
            connector.tableID = tableHTML;
            tableElement = win.document.getElementById(tableHTML);
        }
        else {
            tableElement = tableHTML;
            connector.tableID = tableElement.id;
        }
        connector.tableElement = tableElement || void 0;
        if (!connector.tableElement) {
            const error = 'HTML table not provided, or element with ID not found';
            connector.emit({
                type: 'loadError',
                detail: eventDetail,
                error,
                tables: { table }
            });
            return Promise.reject(new Error(error));
        }
        converter.parse(merge({ tableElement: connector.tableElement }, connector.options), eventDetail);
        // If already loaded, clear the current rows
        table.deleteColumns();
        table.setColumns(converter.getTable().getColumns());
        return connector
            .setModifierOptions(dataModifier)
            .then(() => {
            connector.emit({
                type: 'afterLoad',
                detail: eventDetail,
                tables: { table },
                tableElement: connector.tableElement
            });
            return connector;
        });
    }
}
/* *
 *
 *  Static Properties
 *
 * */
HTMLTableConnector.defaultOptions = {
    table: ''
};
DataConnector.registerType('HTMLTable', HTMLTableConnector);
/* *
 *
 *  Default Export
 *
 * */
export default HTMLTableConnector;
