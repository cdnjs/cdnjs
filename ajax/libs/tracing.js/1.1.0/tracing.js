/*! Tracing.js v1.1.0. | (c) 2013 Francisco Soto <ebobby@ebobby.org> | See COPYING file for more info. */

var Tracing = (function() {
    /////////////////////////////////////////////////////////////////////////////////////////////
    //// Global state
    /////////////////////////////////////////////////////////////////////////////////////////////

    var Traces = {},
        globalObject = Function('return this')(),
        traceDepth = 0;

    // Do nothing function.
    function noop () {};

    /////////////////////////////////////////////////////////////////////////////////////////////
    //// Predicates
    /////////////////////////////////////////////////////////////////////////////////////////////

    function isFunc (obj) {
        return typeof(obj) === 'function';
    }

    function isEmpty (obj) {
        return obj === undefined || obj === null;
    }

    function isTraced (fnName) {
        return !isEmpty(Traces[fnName]);
    }

    function isString (obj) {
        return typeof(obj) === 'string';
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    //// Helpers
    /////////////////////////////////////////////////////////////////////////////////////////////

    // Converts an arguments object into an array.
    function arguments2array (args) {
        return Array.prototype.slice.call(args);
    }

    // Iterate through the object properties calling the given function.
    function withProperties (obj, fn) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn(key, obj[key]);
            }
        }
        return obj;
    }

    // Copies the owned properties from src to dst. Returns dst.
    function copyOwnProperties (src, dst) {
        withProperties(src, function(key, val) {
            dst[key] = val;
        });
        return dst;
    }

    // Traverses the object defined by the string target, if val is passed
    // we set last object value to this value, the value of the object is returned.
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

    // Default before callback. Prints the function name and the arguments passed to it.
    function traceBefore (fnName, parameters, depth) {
        parameters = parameters.map(JSON.stringify);
        console.log(">" + (new Array(depth + 1)).join("  ") + // indentation
                     fnName +
                     " called with arguments: (" +
                     parameters.join(", ") + ")");            // parameters
    }

    // Default after callback. Prints the function name and its return value.
    function traceAfter (fnName, returnVal, depth) {
        console.log(">" + (new Array(depth + 1)).join("  ") + // indentation
                    fnName + " returned: " + JSON.stringify(returnVal)); // return value
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    //// Tracing fun
    /////////////////////////////////////////////////////////////////////////////////////////////

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

    // Removes a function trace.
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
        env.prototype = tracingFunc.prototype;

        // Unset the trace.
        objectTraverser(fnName, env.original);

        // Remove the function from our internal data structure.
        delete Traces[fnName];
    }

    // Verify we are tracing this function and return a valid function to set.
    function preprocess (fnName, fn) {
        if (!isString(fnName)) {
            throw "The function name should be a string.";
        }

        if (!isTraced(fnName)) {
            setTrace(fnName);
        }

        return isFunc(fn) ? fn : noop;
    }

    function setBefore (fnName, fn) {
        var before = preprocess(fnName, fn);
        Traces[fnName].before = before;
    }

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
