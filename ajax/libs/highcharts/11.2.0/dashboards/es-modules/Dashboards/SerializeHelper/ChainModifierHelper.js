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
import ChainModifier from '../../Data/Modifiers/ChainModifier.js';
import Serializable from '../Serializable.js';
/* *
 *
 *  Functions
 *
 * */
/**
 * Converts the given JSON to a class instance.
 *
 * @param {ChainModifierHelper.JSON} json
 * JSON to deserialize as a class instance or object.
 *
 * @return {ChainModifier}
 * Returns the class instance or object, or throws an exception.
 */
function fromJSON(json) {
    const chainOptions = json.options.chain, jsonChain = json.chain, modifiers = [];
    // modifiers
    for (let i = 0, iEnd = jsonChain.length; i < iEnd; ++i) {
        modifiers.push(Serializable.fromJSON(jsonChain[i]));
    }
    // apply chain options later
    delete json.options.chain;
    const chainModifier = new ChainModifier(json.options, ...modifiers);
    chainModifier.options.chain = chainOptions;
    // done
    return chainModifier;
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
    return obj instanceof ChainModifier;
}
/**
 * Converts the given class instance to JSON.
 *
 * @param {ChainModifier} obj
 * Class instance or object to serialize as JSON.
 *
 * @return {ChainModifierHelper.JSON}
 * Returns the JSON of the class instance or object.
 */
function toJSON(obj) {
    const chain = [], options = obj.options;
    // modifiers
    const objChain = obj.chain;
    for (let i = 0, iEnd = objChain.length; i < iEnd; ++i) {
        chain.push(Serializable.toJSON(objChain[i]));
    }
    // done
    return {
        $class: 'Data.ChainModifier',
        chain: [],
        options
    };
}
/* *
 *
 *  Registry
 *
 * */
const ChainModifierHelper = {
    $class: 'Data.ChainModifier',
    fromJSON,
    jsonSupportFor,
    toJSON
};
Serializable.registerHelper(ChainModifierHelper);
/* *
 *
 *  Default Export
 *
 * */
export default ChainModifierHelper;
