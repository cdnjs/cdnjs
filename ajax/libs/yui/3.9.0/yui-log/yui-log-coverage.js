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
_yuitest_coverage["build/yui-log/yui-log.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/yui-log/yui-log.js",
    code: []
};
_yuitest_coverage["build/yui-log/yui-log.js"].code=["YUI.add('yui-log', function (Y, NAME) {","","/**"," * Provides console log capability and exposes a custom event for"," * console implementations. This module is a `core` YUI module,"," * <a href=\"../classes/YUI.html#method_log\">it's documentation is located under the YUI class</a>."," *"," * @module yui"," * @submodule yui-log"," */","","var INSTANCE = Y,","    LOGEVENT = 'yui:log',","    UNDEFINED = 'undefined',","    LEVELS = { debug: 1,","               info: 1,","               warn: 1,","               error: 1 };","","/**"," * If the 'debug' config is true, a 'yui:log' event will be"," * dispatched, which the Console widget and anything else"," * can consume.  If the 'useBrowserConsole' config is true, it will"," * write to the browser console if available.  YUI-specific log"," * messages will only be present in the -debug versions of the"," * JS files.  The build system is supposed to remove log statements"," * from the raw and minified versions of the files."," *"," * @method log"," * @for YUI"," * @param  {String}  msg  The message to log."," * @param  {String}  cat  The log category for the message.  Default"," *                        categories are \"info\", \"warn\", \"error\", time\"."," *                        Custom categories can be used as well. (opt)."," * @param  {String}  src  The source of the the message (opt)."," * @param  {boolean} silent If true, the log event won't fire."," * @return {YUI}      YUI instance."," */","INSTANCE.log = function(msg, cat, src, silent) {","    var bail, excl, incl, m, f,","        Y = INSTANCE,","        c = Y.config,","        publisher = (Y.fire) ? Y : YUI.Env.globalEvents;","    // suppress log message if the config is off or the event stack","    // or the event call stack contains a consumer of the yui:log event","    if (c.debug) {","        // apply source filters","        src = src || \"\";","        if (typeof src !== \"undefined\") {","            excl = c.logExclude;","            incl = c.logInclude;","            if (incl && !(src in incl)) {","                bail = 1;","            } else if (incl && (src in incl)) {","                bail = !incl[src];","            } else if (excl && (src in excl)) {","                bail = excl[src];","            }","        }","        if (!bail) {","            if (c.useBrowserConsole) {","                m = (src) ? src + ': ' + msg : msg;","                if (Y.Lang.isFunction(c.logFn)) {","                    c.logFn.call(Y, msg, cat, src);","                } else if (typeof console !== UNDEFINED && console.log) {","                    f = (cat && console[cat] && (cat in LEVELS)) ? cat : 'log';","                    console[f](m);","                } else if (typeof opera !== UNDEFINED) {","                    opera.postError(m);","                }","            }","","            if (publisher && !silent) {","","                if (publisher === Y && (!publisher.getEvent(LOGEVENT))) {","                    publisher.publish(LOGEVENT, {","                        broadcast: 2","                    });","                }","","                publisher.fire(LOGEVENT, {","                    msg: msg,","                    cat: cat,","                    src: src","                });","            }","        }","    }","","    return Y;","};","","/**"," * Write a system message.  This message will be preserved in the"," * minified and raw versions of the YUI files, unlike log statements."," * @method message"," * @for YUI"," * @param  {String}  msg  The message to log."," * @param  {String}  cat  The log category for the message.  Default"," *                        categories are \"info\", \"warn\", \"error\", time\"."," *                        Custom categories can be used as well. (opt)."," * @param  {String}  src  The source of the the message (opt)."," * @param  {boolean} silent If true, the log event won't fire."," * @return {YUI}      YUI instance."," */","INSTANCE.message = function() {","    return INSTANCE.log.apply(INSTANCE, arguments);","};","","","}, '@VERSION@', {\"requires\": [\"yui-base\"]});"];
_yuitest_coverage["build/yui-log/yui-log.js"].lines = {"1":0,"12":0,"39":0,"40":0,"46":0,"48":0,"49":0,"50":0,"51":0,"52":0,"53":0,"54":0,"55":0,"56":0,"57":0,"60":0,"61":0,"62":0,"63":0,"64":0,"65":0,"66":0,"67":0,"68":0,"69":0,"73":0,"75":0,"76":0,"81":0,"90":0,"106":0,"107":0};
_yuitest_coverage["build/yui-log/yui-log.js"].functions = {"log:39":0,"message:106":0,"(anonymous 1):1":0};
_yuitest_coverage["build/yui-log/yui-log.js"].coveredLines = 32;
_yuitest_coverage["build/yui-log/yui-log.js"].coveredFunctions = 3;
_yuitest_coverline("build/yui-log/yui-log.js", 1);
YUI.add('yui-log', function (Y, NAME) {

/**
 * Provides console log capability and exposes a custom event for
 * console implementations. This module is a `core` YUI module,
 * <a href="../classes/YUI.html#method_log">it's documentation is located under the YUI class</a>.
 *
 * @module yui
 * @submodule yui-log
 */

_yuitest_coverfunc("build/yui-log/yui-log.js", "(anonymous 1)", 1);
_yuitest_coverline("build/yui-log/yui-log.js", 12);
var INSTANCE = Y,
    LOGEVENT = 'yui:log',
    UNDEFINED = 'undefined',
    LEVELS = { debug: 1,
               info: 1,
               warn: 1,
               error: 1 };

/**
 * If the 'debug' config is true, a 'yui:log' event will be
 * dispatched, which the Console widget and anything else
 * can consume.  If the 'useBrowserConsole' config is true, it will
 * write to the browser console if available.  YUI-specific log
 * messages will only be present in the -debug versions of the
 * JS files.  The build system is supposed to remove log statements
 * from the raw and minified versions of the files.
 *
 * @method log
 * @for YUI
 * @param  {String}  msg  The message to log.
 * @param  {String}  cat  The log category for the message.  Default
 *                        categories are "info", "warn", "error", time".
 *                        Custom categories can be used as well. (opt).
 * @param  {String}  src  The source of the the message (opt).
 * @param  {boolean} silent If true, the log event won't fire.
 * @return {YUI}      YUI instance.
 */
_yuitest_coverline("build/yui-log/yui-log.js", 39);
INSTANCE.log = function(msg, cat, src, silent) {
    _yuitest_coverfunc("build/yui-log/yui-log.js", "log", 39);
_yuitest_coverline("build/yui-log/yui-log.js", 40);
var bail, excl, incl, m, f,
        Y = INSTANCE,
        c = Y.config,
        publisher = (Y.fire) ? Y : YUI.Env.globalEvents;
    // suppress log message if the config is off or the event stack
    // or the event call stack contains a consumer of the yui:log event
    _yuitest_coverline("build/yui-log/yui-log.js", 46);
if (c.debug) {
        // apply source filters
        _yuitest_coverline("build/yui-log/yui-log.js", 48);
src = src || "";
        _yuitest_coverline("build/yui-log/yui-log.js", 49);
if (typeof src !== "undefined") {
            _yuitest_coverline("build/yui-log/yui-log.js", 50);
excl = c.logExclude;
            _yuitest_coverline("build/yui-log/yui-log.js", 51);
incl = c.logInclude;
            _yuitest_coverline("build/yui-log/yui-log.js", 52);
if (incl && !(src in incl)) {
                _yuitest_coverline("build/yui-log/yui-log.js", 53);
bail = 1;
            } else {_yuitest_coverline("build/yui-log/yui-log.js", 54);
if (incl && (src in incl)) {
                _yuitest_coverline("build/yui-log/yui-log.js", 55);
bail = !incl[src];
            } else {_yuitest_coverline("build/yui-log/yui-log.js", 56);
if (excl && (src in excl)) {
                _yuitest_coverline("build/yui-log/yui-log.js", 57);
bail = excl[src];
            }}}
        }
        _yuitest_coverline("build/yui-log/yui-log.js", 60);
if (!bail) {
            _yuitest_coverline("build/yui-log/yui-log.js", 61);
if (c.useBrowserConsole) {
                _yuitest_coverline("build/yui-log/yui-log.js", 62);
m = (src) ? src + ': ' + msg : msg;
                _yuitest_coverline("build/yui-log/yui-log.js", 63);
if (Y.Lang.isFunction(c.logFn)) {
                    _yuitest_coverline("build/yui-log/yui-log.js", 64);
c.logFn.call(Y, msg, cat, src);
                } else {_yuitest_coverline("build/yui-log/yui-log.js", 65);
if (typeof console !== UNDEFINED && console.log) {
                    _yuitest_coverline("build/yui-log/yui-log.js", 66);
f = (cat && console[cat] && (cat in LEVELS)) ? cat : 'log';
                    _yuitest_coverline("build/yui-log/yui-log.js", 67);
console[f](m);
                } else {_yuitest_coverline("build/yui-log/yui-log.js", 68);
if (typeof opera !== UNDEFINED) {
                    _yuitest_coverline("build/yui-log/yui-log.js", 69);
opera.postError(m);
                }}}
            }

            _yuitest_coverline("build/yui-log/yui-log.js", 73);
if (publisher && !silent) {

                _yuitest_coverline("build/yui-log/yui-log.js", 75);
if (publisher === Y && (!publisher.getEvent(LOGEVENT))) {
                    _yuitest_coverline("build/yui-log/yui-log.js", 76);
publisher.publish(LOGEVENT, {
                        broadcast: 2
                    });
                }

                _yuitest_coverline("build/yui-log/yui-log.js", 81);
publisher.fire(LOGEVENT, {
                    msg: msg,
                    cat: cat,
                    src: src
                });
            }
        }
    }

    _yuitest_coverline("build/yui-log/yui-log.js", 90);
return Y;
};

/**
 * Write a system message.  This message will be preserved in the
 * minified and raw versions of the YUI files, unlike log statements.
 * @method message
 * @for YUI
 * @param  {String}  msg  The message to log.
 * @param  {String}  cat  The log category for the message.  Default
 *                        categories are "info", "warn", "error", time".
 *                        Custom categories can be used as well. (opt).
 * @param  {String}  src  The source of the the message (opt).
 * @param  {boolean} silent If true, the log event won't fire.
 * @return {YUI}      YUI instance.
 */
_yuitest_coverline("build/yui-log/yui-log.js", 106);
INSTANCE.message = function() {
    _yuitest_coverfunc("build/yui-log/yui-log.js", "message", 106);
_yuitest_coverline("build/yui-log/yui-log.js", 107);
return INSTANCE.log.apply(INSTANCE, arguments);
};


}, '@VERSION@', {"requires": ["yui-base"]});
