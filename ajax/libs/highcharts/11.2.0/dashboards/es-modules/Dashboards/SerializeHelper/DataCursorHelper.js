/* *
 *
 *  (c) 2009 - 2023 Highsoft AS
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
import DataCursor from '../../Data/DataCursor.js';
import Serializable from '../Serializable.js';
/* *
 *
 *  Functions
 *
 * */
/**
 * Converts the given JSON to a class instance.
 *
 * @param {DataCursorHelper.JSON} json
 * JSON to deserialize as a class instance or object.
 *
 * @return {DataCursor}
 * Returns the class instance or object, or throws an exception.
 */
function fromJSON(json) {
    return new DataCursor(json.stateMap);
}
/**
 * Validates the given class instance for JSON support.
 *
 * @param {Globals.AnyRecord} obj
 * Class instance or object to validate.
 *
 * @return {boolean}
 * Returns true, if the function set can convert the given object, otherwise
 * false.
 */
function jsonSupportFor(obj) {
    return obj instanceof DataCursor;
}
/**
 * Converts the given class instance to JSON.
 *
 * @param {DataTable} obj
 * Class instance or object to serialize as JSON.
 *
 * @return {DataTableHelper.JSON}
 * Returns the JSON of the class instance or object.
 */
function toJSON(obj) {
    const stateMap = obj.stateMap, stateMapJSON = {}, tableIds = Object.keys(obj.stateMap);
    let cursors, cursorsJSON, tableId, state, states;
    for (let i = 0, iEnd = tableIds.length; i < iEnd; ++i) {
        tableId = tableIds[i];
        states = Object.keys(stateMap[tableId]);
        stateMapJSON[tableId] = {};
        for (let j = 0, jEnd = states.length; j < jEnd; ++j) {
            state = states[j];
            cursors = stateMap[tableId][state];
            stateMapJSON[tableId][state] = cursorsJSON = [];
            for (let k = 0, kEnd = cursors.length; k < kEnd; ++k) {
                cursorsJSON.push({ ...cursors[k] });
            }
        }
    }
    return {
        $class: 'Data.DataCursor',
        stateMap: stateMapJSON
    };
}
/* *
 *
 *  Registry
 *
 * */
const DataCursorHelper = {
    $class: 'Data.DataCursor',
    fromJSON,
    jsonSupportFor,
    toJSON
};
Serializable.registerHelper(DataCursorHelper);
/* *
 *
 *  Default Export
 *
 * */
export default DataCursorHelper;
