YUI.add('timers', function (Y, NAME) {

/**
 * Provides utilities for timed asynchronous callback execution.
 * Y.soon is a setImmediate/process.nextTick/setTimeout wrapper.
 * @module timers
 * @author Steven Olmsted
 */

var YGLOBAL = Y.config.global,

    /**
     * Y.soon accepts a callback function.  The callback function will be called
     * once in a future turn of the JavaScript event loop.  If the function
     * requires a specific execution context or arguments, wrap it with Y.bind.
     * Y.soon returns an object with a cancel method.  If the cancel method is
     * called before the callback function, the callback function won't be
     * called.
     * @method soon
     * @for YUI
     * @param {Function} callbackFunction
     * @return {Object} An object with a cancel method.  If the cancel method is
     * called before the callback function, the callback function won't be
     * called.
    */
    soon = function (callbackFunction) {
        var canceled;

        soon._asynchronizer(function () {
            // Some asynchronizers may provide their own cancellation
            // methods such as clearImmediate or clearTimeout but some
            // asynchronizers do not.  For simplicity, cancellation is
            // entirely handled here rather than wrapping the other methods.
            // All asynchronizers are expected to always call this anonymous
            // function.
            if (!canceled) {
                callbackFunction();
            }
        });

        return {
            cancel: function () {
                canceled = 1;
            }
        };
    };

/**
 * The asynchronizer is the internal mechanism which will call a function
 * asynchronously.  This property is exposed as a convenient way to define a
 * different asynchronizer implementation without having to rewrite the
 * entire Y.soon interface.
 * @method _asynchronizer
 * @for soon
 * @param {Function} callbackFunction The function to call asynchronously.
 * @protected
 */

/**
 * Since Y.soon is likely to have many differing asynchronizer
 * implementations, this property should be set to identify which
 * implementation is in use.
 * @property _impl
 * @protected
 * @type String
 */

// Check for a native or already polyfilled implementation of setImmediate.
if ('setImmediate' in YGLOBAL) {
    soon._asynchronizer = function (callbackFunction) {
        setImmediate(callbackFunction);
    };
    soon._impl = 'setImmediate';
}

// Check for process and process.nextTick
else if (('process' in YGLOBAL) && ('nextTick' in process)) {
    soon._asynchronizer = process.nextTick;
    soon._impl = 'nextTick';
}

// The most widely supported asynchronizer is setTimeout so we use that as
// the fallback.
else {
    soon._asynchronizer = function (callbackFunction) {
        setTimeout(callbackFunction, 0);
    };
    soon._impl = 'setTimeout';
}

Y.soon = soon;


}, '@VERSION@', {"requires": ["yui-base"]});
