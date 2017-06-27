if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/timers/timers.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/timers/timers.js",
    code: []
};
_yuitest_coverage["build/timers/timers.js"].code=["YUI.add('timers', function (Y, NAME) {","","/**"," * Provides utilities for timed asynchronous callback execution."," * Y.soon is a setImmediate/process.nextTick/setTimeout wrapper."," * @module timers"," * @author Steven Olmsted"," */","","var YGLOBAL = Y.config.global,","","    /**","     * Y.soon accepts a callback function.  The callback function will be called","     * once in a future turn of the JavaScript event loop.  If the function","     * requires a specific execution context or arguments, wrap it with Y.bind.","     * Y.soon returns an object with a cancel method.  If the cancel method is","     * called before the callback function, the callback function won't be","     * called.","     * @method soon","     * @for YUI","     * @param {Function} callbackFunction","     * @return {Object} An object with a cancel method.  If the cancel method is","     * called before the callback function, the callback function won't be","     * called.","    */","    soon = function (callbackFunction) {","        var canceled;","","        soon._asynchronizer(function () {","            // Some asynchronizers may provide their own cancellation","            // methods such as clearImmediate or clearTimeout but some","            // asynchronizers do not.  For simplicity, cancellation is","            // entirely handled here rather than wrapping the other methods.","            // All asynchronizers are expected to always call this anonymous","            // function.","            if (!canceled) {","                callbackFunction();","            }","        });","","        return {","            cancel: function () {","                canceled = 1;","            }","        };","    };","","/**"," * The asynchronizer is the internal mechanism which will call a function"," * asynchronously.  This property is exposed as a convenient way to define a"," * different asynchronizer implementation without having to rewrite the"," * entire Y.soon interface."," * @method _asynchronizer"," * @for soon"," * @param {Function} callbackFunction The function to call asynchronously."," * @protected"," */","","/**"," * Since Y.soon is likely to have many differing asynchronizer"," * implementations, this property should be set to identify which"," * implementation is in use."," * @property _impl"," * @protected"," * @type String"," */","","// Check for a native or already polyfilled implementation of setImmediate.","if ('setImmediate' in YGLOBAL) {","    soon._asynchronizer = function (callbackFunction) {","        setImmediate(callbackFunction);","    };","    soon._impl = 'setImmediate';","}","","// Check for process and process.nextTick","else if (('process' in YGLOBAL) && ('nextTick' in process)) {","    soon._asynchronizer = process.nextTick;","    soon._impl = 'nextTick';","}","","// The most widely supported asynchronizer is setTimeout so we use that as","// the fallback.","else {","    soon._asynchronizer = function (callbackFunction) {","        setTimeout(callbackFunction, 0);","    };","    soon._impl = 'setTimeout';","}","","Y.soon = soon;","","","}, '@VERSION@', {\"requires\": [\"yui-base\"]});"];
_yuitest_coverage["build/timers/timers.js"].lines = {"1":0,"10":0,"27":0,"29":0,"36":0,"37":0,"41":0,"43":0,"69":0,"70":0,"71":0,"73":0,"77":0,"78":0,"79":0,"85":0,"86":0,"88":0,"91":0};
_yuitest_coverage["build/timers/timers.js"].functions = {"(anonymous 2):29":0,"cancel:42":0,"soon:26":0,"_asynchronizer:70":0,"_asynchronizer:85":0,"(anonymous 1):1":0};
_yuitest_coverage["build/timers/timers.js"].coveredLines = 19;
_yuitest_coverage["build/timers/timers.js"].coveredFunctions = 6;
_yuitest_coverline("build/timers/timers.js", 1);
YUI.add('timers', function (Y, NAME) {

/**
 * Provides utilities for timed asynchronous callback execution.
 * Y.soon is a setImmediate/process.nextTick/setTimeout wrapper.
 * @module timers
 * @author Steven Olmsted
 */

_yuitest_coverfunc("build/timers/timers.js", "(anonymous 1)", 1);
_yuitest_coverline("build/timers/timers.js", 10);
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
        _yuitest_coverfunc("build/timers/timers.js", "soon", 26);
_yuitest_coverline("build/timers/timers.js", 27);
var canceled;

        _yuitest_coverline("build/timers/timers.js", 29);
soon._asynchronizer(function () {
            // Some asynchronizers may provide their own cancellation
            // methods such as clearImmediate or clearTimeout but some
            // asynchronizers do not.  For simplicity, cancellation is
            // entirely handled here rather than wrapping the other methods.
            // All asynchronizers are expected to always call this anonymous
            // function.
            _yuitest_coverfunc("build/timers/timers.js", "(anonymous 2)", 29);
_yuitest_coverline("build/timers/timers.js", 36);
if (!canceled) {
                _yuitest_coverline("build/timers/timers.js", 37);
callbackFunction();
            }
        });

        _yuitest_coverline("build/timers/timers.js", 41);
return {
            cancel: function () {
                _yuitest_coverfunc("build/timers/timers.js", "cancel", 42);
_yuitest_coverline("build/timers/timers.js", 43);
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
_yuitest_coverline("build/timers/timers.js", 69);
if ('setImmediate' in YGLOBAL) {
    _yuitest_coverline("build/timers/timers.js", 70);
soon._asynchronizer = function (callbackFunction) {
        _yuitest_coverfunc("build/timers/timers.js", "_asynchronizer", 70);
_yuitest_coverline("build/timers/timers.js", 71);
setImmediate(callbackFunction);
    };
    _yuitest_coverline("build/timers/timers.js", 73);
soon._impl = 'setImmediate';
}

// Check for process and process.nextTick
else {_yuitest_coverline("build/timers/timers.js", 77);
if (('process' in YGLOBAL) && ('nextTick' in process)) {
    _yuitest_coverline("build/timers/timers.js", 78);
soon._asynchronizer = process.nextTick;
    _yuitest_coverline("build/timers/timers.js", 79);
soon._impl = 'nextTick';
}

// The most widely supported asynchronizer is setTimeout so we use that as
// the fallback.
else {
    _yuitest_coverline("build/timers/timers.js", 85);
soon._asynchronizer = function (callbackFunction) {
        _yuitest_coverfunc("build/timers/timers.js", "_asynchronizer", 85);
_yuitest_coverline("build/timers/timers.js", 86);
setTimeout(callbackFunction, 0);
    };
    _yuitest_coverline("build/timers/timers.js", 88);
soon._impl = 'setTimeout';
}}

_yuitest_coverline("build/timers/timers.js", 91);
Y.soon = soon;


}, '@VERSION@', {"requires": ["yui-base"]});
