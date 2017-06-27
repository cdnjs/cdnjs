/*!
 * condition v1.0.0
 * Copyright (c) 2013 Nathaniel Higgins; Licensed MIT
 * Built on 2013-06-26 
 */
(function() {

    /**
     * Polyfill for setImmediate
     * @param  {Function} callback Callback to call
     */
    var tick = (typeof setImmediate !== 'undefined' && function(callback) {
        return setImmediate(callback);
    }) || function(callback) {
        return setTimeout(callback, 0);
    };

    /**
     * Weak polyfill for Object.prototype.hasOwnProperty
     * @param  {object} obj  Object to test property
     * @param  {string} prop Property name to test
     * @return {bool}        Does the object have it's own property
     *
     * @todo Make this work in browsers that don't even have window.hasOwnProperty
     * @todo Default to Object.prototype.hasOwnProperty
     */
    var has = function(obj, prop) {
        if (typeof window !== 'undefined' && window.hasOwnProperty) {
            return window.hasOwnProperty(obj, prop);
        }

        return obj.hasOwnProperty(prop);
    };

    /**
     * Extract arguments array from function.
     * @param  {Function} func Function to extract arguments from
     * @return {array}         Arguments array
     */
    var args = function(func) {
        // Get the "string" version of the function
        var string = func.toString();

        var args = string
            .replace(/\s/g, '') // Remove all whitespace, we don't need that to get the arguments
            .split('function')[1] // Get the bit after the function decleration
            .split(')')[0] // Get the bit before the end of the arguments list
            .split('(') // Get the bit after the start of the arguments list
            .slice(1)[0] // Get the actual args
            .split(','); // Split the args into an array

        // The result of args will be an array with one blank item
        // if there are no arguments. Instead, we want a blank array
        if (args.length === 1 && args[0] === '') args = [];

        return args;
    };

    /**
     * All condition functions go through this function
     * @param  {object}   config    Config for the type of condition
     * @param  {Function} condition The conditin object to call
     * @param  {Function} callback  The callback to call
     */
    var condition = function(config, condition, callback) {

        // Save properties so we can call this function exactly as it was called later on.
        var _arguments = arguments;
        var _this = this;
        var _callee = arguments.callee;
        
        /**
         * The function called when the condition has finished running
         * Needs to be in a seperate function so we can support
         * async coniditions
         * 
         * @param  {any} result Result of the condition function.
         */
        var done = function(result) {

            // We only want to call the callback if the condition result evalulates as true
            if (result) {

                callback(result);

                // If we're doing the "wait" type of condition, we can safely end here
                if (config.type === 'wait') {
                    return;
                }
            }

            // The condition didn't evaluate to true, or we're doing
            // the when type of condition. Restart the loop, on the next tick
            tick(function() {
                return _callee.apply(_this, _arguments);
            });
        };

        // Get result of the condition function, we need that for the callback function
        // We only pass the done function if async is enabled
        var result = condition(config.async && done);

        // If async isn't enabled, or the condition didn't ask for the done function,
        // just call the done function automatically
        if (!config.async || args(condition).length === 0) {
            done(result);
        }
    };

    // Time to build the condition object with the different types
    
    var Condition = {};

    // JSHint complains about making functions within loops,
    // get around that.
    var generate_condition = function(type) {
        return function() {
            Array.prototype.unshift.call(arguments, {
                type: type,
                async: true
            });

            return condition.apply(this, arguments);
        };
    };

    // The types of condition objects we have
    var types = ['wait', 'when'];

    // Assign all the types to the condition object
    for (var k in types) {
        if (has(types, k)) {
            Condition[types[k]] = generate_condition(types[k]);
        }
    }

    // Assign our special helpers to the condition object too.
    Condition.condition = condition;
    Condition.tick = tick;
    Condition.has = has;
    Condition.args = args;

    // This is the bit where we assign our Condition object in different ways
    if (typeof module !== 'undefined' && 'exports' in module) {
        // Node
        module.exports = Condition;
    } else if (typeof define !== 'undefined') {
        // CommonJS
        define(function(require, exports, module) {
            module.exports = Condition;
        });
    } else if (typeof window !== 'undefined') {
        // Browser
        window.condition = Condition;
    }
})();