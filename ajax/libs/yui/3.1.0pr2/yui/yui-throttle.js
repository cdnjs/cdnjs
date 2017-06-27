YUI.add('yui-throttle', function(Y) {

/**
 * Provides a throttle/limiter for function calls
 * @module yui
 * @submodule yui-throttle
 */

/**
 * Throttles a call to a method based on the time between calls.
 * @method throttle
 * @for YUI
 * @param fn {function} The function call to throttle.
 * @param ms {int} The number of milliseconds to throttle the method call. Can set
 * globally with Y.config.throttleTime or by call. Passing a -1 will disable the throttle. Defaults to 150
 * @return {function} Returns a wrapped function that calls fn throttled.
 */

/*! Based on work by Simon Willison: http://gist.github.com/292562 */

var throttle = function(fn, ms) {
    ms = (ms) ? ms : (Y.config.throttleTime || 150);

    if (ms === -1) {
        return (function() {
            fn.apply(null, arguments);
        });
    }

    var last = (new Date()).getTime();

    return (function() {
        var now = (new Date()).getTime();
        if (now - last > ms) {
            last = now;
            fn.apply(null, arguments);
        }
    });
};

Y.throttle = throttle;

// We added the redundant definition to later for backwards compatibility.
// I don't think we need to do the same thing here
// Y.Lang.throttle = throttle;



}, '@VERSION@' ,{requires:['yui-base']});
