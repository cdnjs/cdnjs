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
/* *
 *
 *  Namespace
 *
 * */
/**
 * Contains the toolset to serialize class instance to JSON and deserialize JSON
 * to class instances.
 * @internal
 * @private
 */
var Serializable;
(function (Serializable) {
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
    /**
     * Registry of serializable classes.
     */
    const classRegistry = {};
    /**
     * Registry of function sets.
     */
    const helperRegistry = {};
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Creates a class instance from the given JSON, if a suitable serializer
     * has been found.
     *
     * @function Serializable.fromJSON
     *
     * @param {Serializable.JSON} json
     * JSON to create a class instance or object from.
     *
     * @return {Globals.AnyRecord}
     * Returns the class instance or object, or throws an exception.
     */
    function fromJSON(json) {
        const $class = json.$class;
        if (typeof $class !== 'string') {
            throw new Error('JSON has no $class property.');
        }
        const classs = classRegistry[$class];
        if (classs) {
            return classs.fromJSON(json);
        }
        const helper = helperRegistry[$class];
        if (helper) {
            return helper.fromJSON(json);
        }
        throw new Error(`'${$class}' unknown.`);
    }
    Serializable.fromJSON = fromJSON;
    /**
     * Registers a class prototype for the given JSON $class.
     *
     * @function Serializable.registerClassPrototype
     *
     * @param {string} $class
     * JSON $class to register for.
     *
     * @param {Serializable} classPrototype
     * Class to register.
     */
    function registerClassPrototype($class, classPrototype) {
        if (classRegistry[$class]) {
            throw new Error('A serializer for \'' + $class + '\' is already registered.');
        }
        classRegistry[$class] = classPrototype;
    }
    Serializable.registerClassPrototype = registerClassPrototype;
    /**
     * Registers helper functions for the given JSON $class.
     *
     * @function Serializable.registerHelper
     *
     * @param {Helper} helperFunctions
     * Helper functions to register.
     */
    function registerHelper(helperFunctions) {
        if (helperRegistry[helperFunctions.$class]) {
            throw new Error('A serializer for \'' + helperFunctions.$class +
                '\' is already registered.');
        }
        helperRegistry[helperFunctions.$class] = helperFunctions;
    }
    Serializable.registerHelper = registerHelper;
    /**
     * Creates JSON from a class instance.
     *
     * @function Serializable.toJSON
     *
     * @param {Globals.AnyRecord} obj
     * Class instance or object to serialize as JSON.
     *
     * @return {Serializable.JSON}
     * JSON of the class instance.
     */
    function toJSON(obj) {
        if (typeof obj.fromJSON === 'function' &&
            typeof obj.toJSON === 'function') {
            return obj.toJSON();
        }
        const classes = Object.keys(helperRegistry), numberOfHelpers = classes.length;
        let $class, serializer;
        for (let i = 0; i < numberOfHelpers; ++i) {
            $class = classes[i];
            serializer = helperRegistry[$class];
            if (serializer.jsonSupportFor(obj)) {
                return serializer.toJSON(obj);
            }
        }
        throw new Error('Object is not supported.');
    }
    Serializable.toJSON = toJSON;
})(Serializable || (Serializable = {}));
/* *
 *
 *  Default Export
 *
 * */
export default Serializable;
