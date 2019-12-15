/*! Tracing.js v1.1.3. | (c) 2013 Francisco Soto <ebobby@ebobby.org> | See COPYING file for more info. */

var Tracing = (function() {
    /////////////////////////////////////////////////////////////////////////////////////////////
    //// Global state
    /////////////////////////////////////////////////////////////////////////////////////////////

    var Traces = {},
        globalObject = Function('return this')(),
        traceDepth = 0;

    /**
     * Do nothing function.
     */
    function noop () {};

    /////////////////////////////////////////////////////////////////////////////////////////////
    //// Predicates
    /////////////////////////////////////////////////////////////////////////////////////////////

    function isFunc (obj) {
        return typeof(obj) === 'function';
    }

    function isTraced (fnName) {
        return (Traces[fnName] != null && Traces[fnName] != undefined);
    }

    function isString (obj) {
        return typeof(obj) === 'string';
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    //// Helpers
    /////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Stringify function to be used as a replacer function for JSON.stringify.
     * The output of this function is to be used for object display only, it cannot be parsed back into an object.
     *
     * @param {String}   key   key of the value in the object.
     * @param {Object}   value the value of the key
     * @return {Object}  stringified version of the value.
     */
    function stringify (key, value) {
        var type = typeof(value);

        if (value !== value) {
            return "NaN";
        }

        switch (type) {
        case "number":
        case "string":
        case "boolean":
        case "undefined":
            return value;
        }

        if ( value == null){
            return value;
        }

        if (typeof(value) == "function") {
            return value.toString();
        }

        return value;
    }

    /**
     * Pretty print the given object.
     *
     * @param {Object} obj the value to pretty print.
     * @return {String} a string representation of the given object.
     */
    function prettyPrint (obj) {
        return JSON.stringify(obj, stringify);
    }

    /**
     * Converts an arguments object into an array.
     *
     * @param {Arguments} args arguments object
     * @return {Array} converted array
     */
    function arguments2array (args) {
        return Array.prototype.slice.call(args);
    }

    /**
     * Iterates through the own object properties calling the given function.
     *
     * @param {Object} obj the object we are iterating
     * @param {Function} fn the function to call
     * @return {Object} the object with the properties iterated through. (not a copy)
     */
    function withProperties (obj, fn) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn(key, obj[key]);
            }
        }
        return obj;
    }

    /**
     * Makes a copy of the given object. Only owned properties.
     *
     * @param {Object} src source object
     * @param {Object} dst destination object.
     * @return {Object} same object as dst.
     */
    function copyOwnProperties (src, dst) {
        withProperties(src, function(key, val) {
            dst[key] = val;
        });
        return dst;
    }

    /**
     * Traverses the object defined by the string target, if val is passed
     * we set last object value to this value, the value of the object is returned.
     *
     * @param {String} target the fully qualified name of the object. Ej: "window.document".
     * @param {Object} val (optional) if passed, the object will be set to this value.
     * @return {Object} the value of the object.
     */
    function objectTraverser (target, val) {
        var elements = target.split("."),
            curElement = globalObject;

        for (var i = 0; i < elements.length; i++) {
            if (!(elements[i] in curElement)) {
                throw "Property " + elements.slice(0, i+1).join('.') +  " not found!";
            }

            // If we are setting the value...
            if (arguments.length > 1 && i == (elements.length - 1)) {
                curElement[elements[i]] = val;
            }

            curElement = curElement[elements[i]];
        }

        return curElement;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    //// Default tracing functions
    /////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Prints the function name and the arguments passed to it with proper depth indentation.
     *
     * @param {String} fnName function name.
     * @param {Array}  parameters function parameters.
     * @param {Number} depth the depth of the traced calls.
     */
    function traceBefore (fnName, parameters, depth) {
        parameters = parameters.map(prettyPrint);
        console.log(">" + (new Array(depth + 1)).join("  ") + // indentation
                     fnName +
                     " called with arguments: (" +
                     parameters.join(", ") + ")");            // parameters
    }

    /**
     * Prints the function name and the value returned by it with proper depth indentation.
     * @param {String} fnName function name.
     * @param {Object} returnVal returned value.
     * @param {Number} depth the depth of the traced calls.
     */
    function traceAfter (fnName, returnVal, depth) {
        console.log(">" + (new Array(depth + 1)).join("  ") +         // indentation
                    fnName + " returned: " + prettyPrint(returnVal)); // return value
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    //// Tracing fun
    /////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Sets a trace on the fully qualified function name.
     *
     * @param {String} fnName fully qualified function name. Ej: "Array.prototype.slice".
     */
    function setTrace (fnName) {
        var target = objectTraverser(fnName);

        if (!isFunc(target)) {
            throw "Not a valid function to trace!";
        }

        if (isTraced(fnName)) {
            throw "This function is already being traced!";
        }

        Traces[fnName] = { original: target, before: noop, after: noop };

        var trace = function () {
            var retval,
                env = Traces[fnName];

            traceDepth++;

            env.before.call(this, fnName, arguments2array(arguments), traceDepth);
            retval = env.original.apply(this, arguments);
            env.after.call(this, fnName, retval, traceDepth);

            traceDepth--;

            return retval;
        };

        // Sometimes functions have stuff attached to them, like jQuery's $.
        copyOwnProperties(target, trace);

        // Sometimes we want to trace constructors, gotta keep their prototype.
        trace.prototype = target.prototype;

        // Change the function to our own.
        objectTraverser(fnName, trace);
    }

    /**
     * Removes a trace on the fully qualified function name.
     *
     * @param {String} fnName fully qualified function name. Ej: "Array.prototype.slice".
     */
    function unsetTrace (fnName) {
        if (!isString(fnName)) {
            throw "The function name should be a string.";
        }

        if (!isTraced(fnName)) {
            throw "This function is not being traced!";
        }

        var tracingFunc = objectTraverser(fnName),
            env = Traces[fnName];

        // If code added properties to the tracing function believing it was the original we need to keep them.
        copyOwnProperties(tracingFunc, env.original);

        // If code modified the prototype we better keep that as well.
        env.original.prototype = tracingFunc.prototype;

        // Unset the trace.
        objectTraverser(fnName, env.original);

        // Remove the function from our internal data structure.
        delete Traces[fnName];
    }

    /**
     * Sets a trace on the fully qualified function name, also verifies the passed function,
     * if invalid or not set it returns an empty function.
     *
     * @param {String} fnName fully qualified function name.
     * @param {Function} fn (optional) function, it is simply returned if set, if not noop is returned.
     * @return {Function} fn if set, empty function otherwise.
     */
    function preprocess (fnName, fn) {
        if (!isString(fnName)) {
            throw "The function name should be a string.";
        }

        if (!isTraced(fnName)) {
            setTrace(fnName);
        }

        return isFunc(fn) ? fn : noop;
    }

    /**
     * Hooks a before event on the given function.
     *
     * @param {String} fnName fully qualified function to set this event to.
     * @param (Function) fn function to call *before* fnName is called.
     */
    function setBefore (fnName, fn) {
        var before = preprocess(fnName, fn);
        Traces[fnName].before = before;
    }

    /**
     * Hooks an after event on the given function.
     *
     * @param {String} fnName fully qualified function to set this event to.
     * @param (Function) fn function to call *after* fnName is called.
     */
    function setAfter (fnName, fn) {
        var after = preprocess(fnName, fn);
        Traces[fnName].after = after;
    }

    // Tracing.js interface
    var tracingjs = {
        trace: function (fnName) {
            for (var i = 0; i < arguments.length; i++) {
                setBefore(arguments[i], traceBefore);
                setAfter(arguments[i], traceAfter);
            }
        },

        before: function (fnName, fn) {
            setBefore(fnName, fn);
        },

        after: function (fnName, fn) {
            setAfter(fnName, fn);
        },

        untrace: function (fnName) {
            if (arguments.length > 0) {
                for (var i = 0; i < arguments.length; i++) {
                    unsetTrace(arguments[i]);
                }
            }
            else {
                // If no function name given, remove all traces.
                withProperties(Traces, unsetTrace);
            }
        }
    };

    // Wrap Tracing.js functions with another function that allows it to return itself.
    return (function wrap () {
        var self = this;

        return withProperties(self, function (key, val) {
            if (isFunc(val)) {
                self[key] = function () {
                    // We are disregarding the original function return value, but that's ok here.
                    val.apply(self, arguments2array(arguments));

                    return self;
                };
            }
        } );
    }).call(tracingjs);
}());
