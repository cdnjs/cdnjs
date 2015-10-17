/*! Raven.js 1.1.1 (a46fb67) | github.com/getsentry/raven-js */

/*
 * Includes TraceKit
 * https://github.com/getsentry/TraceKit
 *
 * Copyright 2013 Matt Robenolt and other contributors
 * Released under the BSD license
 * https://github.com/getsentry/raven-js/blob/master/LICENSE
 *
 */
/*
 TraceKit - Cross brower stack traces - github.com/occ/TraceKit
 MIT license
*/

;(function(window, undefined) {


var TraceKit = {};
var _oldTraceKit = window.TraceKit;

// global reference to slice
var _slice = [].slice;
var UNKNOWN_FUNCTION = '?';


/**
 * _has, a better form of hasOwnProperty
 * Example: _has(MainHostObject, property) === true/false
 *
 * @param {Object} host object to check property
 * @param {string} key to check
 */
function _has(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
}

function _isUndefined(what) {
    return typeof what === 'undefined';
}

/**
 * TraceKit.noConflict: Export TraceKit out to another variable
 * Example: var TK = TraceKit.noConflict()
 */
TraceKit.noConflict = function noConflict() {
    window.TraceKit = _oldTraceKit;
    return TraceKit;
};

/**
 * TraceKit.wrap: Wrap any function in a TraceKit reporter
 * Example: func = TraceKit.wrap(func);
 *
 * @param {Function} func Function to be wrapped
 * @return {Function} The wrapped func
 */
TraceKit.wrap = function traceKitWrapper(func) {
    function wrapped() {
        try {
            return func.apply(this, arguments);
        } catch (e) {
            TraceKit.report(e);
            throw e;
        }
    }
    return wrapped;
};

/**
 * TraceKit.report: cross-browser processing of unhandled exceptions
 *
 * Syntax:
 *   TraceKit.report.subscribe(function(stackInfo) { ... })
 *   TraceKit.report.unsubscribe(function(stackInfo) { ... })
 *   TraceKit.report(exception)
 *   try { ...code... } catch(ex) { TraceKit.report(ex); }
 *
 * Supports:
 *   - Firefox: full stack trace with line numbers, plus column number
 *              on top frame; column number is not guaranteed
 *   - Opera:   full stack trace with line and column numbers
 *   - Chrome:  full stack trace with line and column numbers
 *   - Safari:  line and column number for the top frame only; some frames
 *              may be missing, and column number is not guaranteed
 *   - IE:      line and column number for the top frame only; some frames
 *              may be missing, and column number is not guaranteed
 *
 * In theory, TraceKit should work on all of the following versions:
 *   - IE5.5+ (only 8.0 tested)
 *   - Firefox 0.9+ (only 3.5+ tested)
 *   - Opera 7+ (only 10.50 tested; versions 9 and earlier may require
 *     Exceptions Have Stacktrace to be enabled in opera:config)
 *   - Safari 3+ (only 4+ tested)
 *   - Chrome 1+ (only 5+ tested)
 *   - Konqueror 3.5+ (untested)
 *
 * Requires TraceKit.computeStackTrace.
 *
 * Tries to catch all unhandled exceptions and report them to the
 * subscribed handlers. Please note that TraceKit.report will rethrow the
 * exception. This is REQUIRED in order to get a useful stack trace in IE.
 * If the exception does not reach the top of the browser, you will only
 * get a stack trace from the point where TraceKit.report was called.
 *
 * Handlers receive a stackInfo object as described in the
 * TraceKit.computeStackTrace docs.
 */
TraceKit.report = (function reportModuleWrapper() {
    var handlers = [],
        lastException = null,
        lastExceptionStack = null;

    /**
     * Add a crash handler.
     * @param {Function} handler
     */
    function subscribe(handler) {
        installGlobalHandler();
        handlers.push(handler);
    }

    /**
     * Remove a crash handler.
     * @param {Function} handler
     */
    function unsubscribe(handler) {
        for (var i = handlers.length - 1; i >= 0; --i) {
            if (handlers[i] === handler) {
                handlers.splice(i, 1);
            }
        }
    }

    /**
     * Dispatch stack information to all handlers.
     * @param {Object.<string, *>} stack
     */
    function notifyHandlers(stack, windowError) {
        var exception = null;
        if (windowError && !TraceKit.collectWindowErrors) {
          return;
        }
        for (var i in handlers) {
            if (_has(handlers, i)) {
                try {
                    handlers[i].apply(null, [stack].concat(_slice.call(arguments, 2)));
                } catch (inner) {
                    exception = inner;
                }
            }
        }

        if (exception) {
            throw exception;
        }
    }

    var _oldOnerrorHandler, _onErrorHandlerInstalled;

    /**
     * Ensures all global unhandled exceptions are recorded.
     * Supported by Gecko and IE.
     * @param {string} message Error message.
     * @param {string} url URL of script that generated the exception.
     * @param {(number|string)} lineNo The line number at which the error
     * occurred.
     */
    function traceKitWindowOnError(message, url, lineNo) {
        var stack = null;

        if (lastExceptionStack) {
            TraceKit.computeStackTrace.augmentStackTraceWithInitialElement(lastExceptionStack, url, lineNo, message);
            stack = lastExceptionStack;
            lastExceptionStack = null;
            lastException = null;
        } else {
            var location = {
                'url': url,
                'line': lineNo
            };
            location.func = TraceKit.computeStackTrace.guessFunctionName(location.url, location.line);
            location.context = TraceKit.computeStackTrace.gatherContext(location.url, location.line);
            stack = {
                'mode': 'onerror',
                'message': message,
                'url': document.location.href,
                'stack': [location],
                'useragent': navigator.userAgent
            };
        }

        notifyHandlers(stack, 'from window.onerror');

        if (_oldOnerrorHandler) {
            return _oldOnerrorHandler.apply(this, arguments);
        }

        return false;
    }

    function installGlobalHandler ()
    {
        if (_onErrorHandlerInstalled === true) {
            return;
        }
        _oldOnerrorHandler = window.onerror;
        window.onerror = traceKitWindowOnError;
        _onErrorHandlerInstalled = true;
    }

    /**
     * Reports an unhandled Error to TraceKit.
     * @param {Error} ex
     */
    function report(ex) {
        var args = _slice.call(arguments, 1);
        if (lastExceptionStack) {
            if (lastException === ex) {
                return; // already caught by an inner catch block, ignore
            } else {
                var s = lastExceptionStack;
                lastExceptionStack = null;
                lastException = null;
                notifyHandlers.apply(null, [s, null].concat(args));
            }
        }

        var stack = TraceKit.computeStackTrace(ex);
        lastExceptionStack = stack;
        lastException = ex;

        // If the stack trace is incomplete, wait for 2 seconds for
        // slow slow IE to see if onerror occurs or not before reporting
        // this exception; otherwise, we will end up with an incomplete
        // stack trace
        window.setTimeout(function () {
            if (lastException === ex) {
                lastExceptionStack = null;
                lastException = null;
                notifyHandlers.apply(null, [stack, null].concat(args));
            }
        }, (stack.incomplete ? 2000 : 0));

        throw ex; // re-throw to propagate to the top level (and cause window.onerror)
    }

    report.subscribe = subscribe;
    report.unsubscribe = unsubscribe;
    return report;
}());

/**
 * TraceKit.computeStackTrace: cross-browser stack traces in JavaScript
 *
 * Syntax:
 *   s = TraceKit.computeStackTrace.ofCaller([depth])
 *   s = TraceKit.computeStackTrace(exception) // consider using TraceKit.report instead (see below)
 * Returns:
 *   s.name              - exception name
 *   s.message           - exception message
 *   s.stack[i].url      - JavaScript or HTML file URL
 *   s.stack[i].func     - function name, or empty for anonymous functions (if guessing did not work)
 *   s.stack[i].args     - arguments passed to the function, if known
 *   s.stack[i].line     - line number, if known
 *   s.stack[i].column   - column number, if known
 *   s.stack[i].context  - an array of source code lines; the middle element corresponds to the correct line#
 *   s.mode              - 'stack', 'stacktrace', 'multiline', 'callers', 'onerror', or 'failed' -- method used to collect the stack trace
 *
 * Supports:
 *   - Firefox:  full stack trace with line numbers and unreliable column
 *               number on top frame
 *   - Opera 10: full stack trace with line and column numbers
 *   - Opera 9-: full stack trace with line numbers
 *   - Chrome:   full stack trace with line and column numbers
 *   - Safari:   line and column number for the topmost stacktrace element
 *               only
 *   - IE:       no line numbers whatsoever
 *
 * Tries to guess names of anonymous functions by looking for assignments
 * in the source code. In IE and Safari, we have to guess source file names
 * by searching for function bodies inside all page scripts. This will not
 * work for scripts that are loaded cross-domain.
 * Here be dragons: some function names may be guessed incorrectly, and
 * duplicate functions may be mismatched.
 *
 * TraceKit.computeStackTrace should only be used for tracing purposes.
 * Logging of unhandled exceptions should be done with TraceKit.report,
 * which builds on top of TraceKit.computeStackTrace and provides better
 * IE support by utilizing the window.onerror event to retrieve information
 * about the top of the stack.
 *
 * Note: In IE and Safari, no stack trace is recorded on the Error object,
 * so computeStackTrace instead walks its *own* chain of callers.
 * This means that:
 *  * in Safari, some methods may be missing from the stack trace;
 *  * in IE, the topmost function in the stack trace will always be the
 *    caller of computeStackTrace.
 *
 * This is okay for tracing (because you are likely to be calling
 * computeStackTrace from the function you want to be the topmost element
 * of the stack trace anyway), but not okay for logging unhandled
 * exceptions (because your catch block will likely be far away from the
 * inner function that actually caused the exception).
 *
 * Tracing example:
 *     function trace(message) {
 *         var stackInfo = TraceKit.computeStackTrace.ofCaller();
 *         var data = message + "\n";
 *         for(var i in stackInfo.stack) {
 *             var item = stackInfo.stack[i];
 *             data += (item.func || '[anonymous]') + "() in " + item.url + ":" + (item.line || '0') + "\n";
 *         }
 *         if (window.console)
 *             console.info(data);
 *         else
 *             alert(data);
 *     }
 */
TraceKit.computeStackTrace = (function computeStackTraceWrapper() {
    var debug = false,
        sourceCache = {};

    /**
     * Attempts to retrieve source code via XMLHttpRequest, which is used
     * to look up anonymous function names.
     * @param {string} url URL of source code.
     * @return {string} Source contents.
     */
    function loadSource(url) {
        if (!TraceKit.remoteFetching) { //Only attempt request if remoteFetching is on.
            return '';
        }
        try {
            function getXHR() {
                try {
                    return new window.XMLHttpRequest();
                } catch (e) {
                    // explicitly bubble up the exception if not found
                    return new window.ActiveXObject('Microsoft.XMLHTTP');
                }
            }

            var request = getXHR();
            request.open('GET', url, false);
            request.send('');
            return request.responseText;
        } catch (e) {
            return '';
        }
    }

    /**
     * Retrieves source code from the source code cache.
     * @param {string} url URL of source code.
     * @return {Array.<string>} Source contents.
     */
    function getSource(url) {
        if (!_has(sourceCache, url)) {
            // URL needs to be able to fetched within the acceptable domain.  Otherwise,
            // cross-domain errors will be triggered.
            var source = '';
            if (url.indexOf(document.domain) !== -1) {
                source = loadSource(url);
            }
            sourceCache[url] = source ? source.split('\n') : [];
        }

        return sourceCache[url];
    }

    /**
     * Tries to use an externally loaded copy of source code to determine
     * the name of a function by looking at the name of the variable it was
     * assigned to, if any.
     * @param {string} url URL of source code.
     * @param {(string|number)} lineNo Line number in source code.
     * @return {string} The function name, if discoverable.
     */
    function guessFunctionName(url, lineNo) {
        var reFunctionArgNames = /function ([^(]*)\(([^)]*)\)/,
            reGuessFunction = /['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,
            line = '',
            maxLines = 10,
            source = getSource(url),
            m;

        if (!source.length) {
            return UNKNOWN_FUNCTION;
        }

        // Walk backwards from the first line in the function until we find the line which
        // matches the pattern above, which is the function definition
        for (var i = 0; i < maxLines; ++i) {
            line = source[lineNo - i] + line;

            if (!_isUndefined(line)) {
                if ((m = reGuessFunction.exec(line))) {
                    return m[1];
                } else if ((m = reFunctionArgNames.exec(line))) {
                    return m[1];
                }
            }
        }

        return UNKNOWN_FUNCTION;
    }

    /**
     * Retrieves the surrounding lines from where an exception occurred.
     * @param {string} url URL of source code.
     * @param {(string|number)} line Line number in source code to centre
     * around for context.
     * @return {?Array.<string>} Lines of source code.
     */
    function gatherContext(url, line) {
        var source = getSource(url);

        if (!source.length) {
            return null;
        }

        var context = [],
            // linesBefore & linesAfter are inclusive with the offending line.
            // if linesOfContext is even, there will be one extra line
            //   *before* the offending line.
            linesBefore = Math.floor(TraceKit.linesOfContext / 2),
            // Add one extra line if linesOfContext is odd
            linesAfter = linesBefore + (TraceKit.linesOfContext % 2),
            start = Math.max(0, line - linesBefore - 1),
            end = Math.min(source.length, line + linesAfter - 1);

        line -= 1; // convert to 0-based index

        for (var i = start; i < end; ++i) {
            if (!_isUndefined(source[i])) {
                context.push(source[i]);
            }
        }

        return context.length > 0 ? context : null;
    }

    /**
     * Escapes special characters, except for whitespace, in a string to be
     * used inside a regular expression as a string literal.
     * @param {string} text The string.
     * @return {string} The escaped string literal.
     */
    function escapeRegExp(text) {
        return text.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, '\\$&');
    }

    /**
     * Escapes special characters in a string to be used inside a regular
     * expression as a string literal. Also ensures that HTML entities will
     * be matched the same as their literal friends.
     * @param {string} body The string.
     * @return {string} The escaped string.
     */
    function escapeCodeAsRegExpForMatchingInsideHTML(body) {
        return escapeRegExp(body).replace('<', '(?:<|&lt;)').replace('>', '(?:>|&gt;)').replace('&', '(?:&|&amp;)').replace('"', '(?:"|&quot;)').replace(/\s+/g, '\\s+');
    }

    /**
     * Determines where a code fragment occurs in the source code.
     * @param {RegExp} re The function definition.
     * @param {Array.<string>} urls A list of URLs to search.
     * @return {?Object.<string, (string|number)>} An object containing
     * the url, line, and column number of the defined function.
     */
    function findSourceInUrls(re, urls) {
        var source, m;
        for (var i = 0, j = urls.length; i < j; ++i) {
            // console.log('searching', urls[i]);
            if ((source = getSource(urls[i])).length) {
                source = source.join('\n');
                if ((m = re.exec(source))) {
                    // console.log('Found function in ' + urls[i]);

                    return {
                        'url': urls[i],
                        'line': source.substring(0, m.index).split('\n').length,
                        'column': m.index - source.lastIndexOf('\n', m.index) - 1
                    };
                }
            }
        }

        // console.log('no match');

        return null;
    }

    /**
     * Determines at which column a code fragment occurs on a line of the
     * source code.
     * @param {string} fragment The code fragment.
     * @param {string} url The URL to search.
     * @param {(string|number)} line The line number to examine.
     * @return {?number} The column number.
     */
    function findSourceInLine(fragment, url, line) {
        var source = getSource(url),
            re = new RegExp('\\b' + escapeRegExp(fragment) + '\\b'),
            m;

        line -= 1;

        if (source && source.length > line && (m = re.exec(source[line]))) {
            return m.index;
        }

        return null;
    }

    /**
     * Determines where a function was defined within the source code.
     * @param {(Function|string)} func A function reference or serialized
     * function definition.
     * @return {?Object.<string, (string|number)>} An object containing
     * the url, line, and column number of the defined function.
     */
    function findSourceByFunctionBody(func) {
        var urls = [window.location.href],
            scripts = document.getElementsByTagName('script'),
            body,
            code = '' + func,
            codeRE = /^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,
            eventRE = /^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,
            re,
            parts,
            result;

        for (var i = 0; i < scripts.length; ++i) {
            var script = scripts[i];
            if (script.src) {
                urls.push(script.src);
            }
        }

        if (!(parts = codeRE.exec(code))) {
            re = new RegExp(escapeRegExp(code).replace(/\s+/g, '\\s+'));
        }

        // not sure if this is really necessary, but I don’t have a test
        // corpus large enough to confirm that and it was in the original.
        else {
            var name = parts[1] ? '\\s+' + parts[1] : '',
                args = parts[2].split(',').join('\\s*,\\s*');

            body = escapeRegExp(parts[3]).replace(/;$/, ';?'); // semicolon is inserted if the function ends with a comment.replace(/\s+/g, '\\s+');
            re = new RegExp('function' + name + '\\s*\\(\\s*' + args + '\\s*\\)\\s*{\\s*' + body + '\\s*}');
        }

        // look for a normal function definition
        if ((result = findSourceInUrls(re, urls))) {
            return result;
        }

        // look for an old-school event handler function
        if ((parts = eventRE.exec(code))) {
            var event = parts[1];
            body = escapeCodeAsRegExpForMatchingInsideHTML(parts[2]);

            // look for a function defined in HTML as an onXXX handler
            re = new RegExp('on' + event + '=[\\\'"]\\s*' + body + '\\s*[\\\'"]', 'i');

            if ((result = findSourceInUrls(re, urls[0]))) {
                return result;
            }

            // look for ???
            re = new RegExp(body);

            if ((result = findSourceInUrls(re, urls))) {
                return result;
            }
        }

        return null;
    }

    // Contents of Exception in various browsers.
    //
    // SAFARI:
    // ex.message = Can't find variable: qq
    // ex.line = 59
    // ex.sourceId = 580238192
    // ex.sourceURL = http://...
    // ex.expressionBeginOffset = 96
    // ex.expressionCaretOffset = 98
    // ex.expressionEndOffset = 98
    // ex.name = ReferenceError
    //
    // FIREFOX:
    // ex.message = qq is not defined
    // ex.fileName = http://...
    // ex.lineNumber = 59
    // ex.stack = ...stack trace... (see the example below)
    // ex.name = ReferenceError
    //
    // CHROME:
    // ex.message = qq is not defined
    // ex.name = ReferenceError
    // ex.type = not_defined
    // ex.arguments = ['aa']
    // ex.stack = ...stack trace...
    //
    // INTERNET EXPLORER:
    // ex.message = ...
    // ex.name = ReferenceError
    //
    // OPERA:
    // ex.message = ...message... (see the example below)
    // ex.name = ReferenceError
    // ex.opera#sourceloc = 11  (pretty much useless, duplicates the info in ex.message)
    // ex.stacktrace = n/a; see 'opera:config#UserPrefs|Exceptions Have Stacktrace'

    /**
     * Computes stack trace information from the stack property.
     * Chrome and Gecko use this property.
     * @param {Error} ex
     * @return {?Object.<string, *>} Stack trace information.
     */
    function computeStackTraceFromStackProp(ex) {
        if (!ex.stack) {
            return null;
        }

        var chrome = /^\s*at (?:((?:\[object object\])?\S+) )?\(?((?:file|http|https):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
            gecko = /^\s*(\S*)(?:\((.*?)\))?@((?:file|http|https).*?):(\d+)(?::(\d+))?\s*$/i,
            lines = ex.stack.split('\n'),
            stack = [],
            parts,
            element,
            reference = /^(.*) is undefined$/.exec(ex.message);

        for (var i = 0, j = lines.length; i < j; ++i) {
            if ((parts = gecko.exec(lines[i]))) {
                element = {
                    'url': parts[3],
                    'func': parts[1] || UNKNOWN_FUNCTION,
                    'args': parts[2] ? parts[2].split(',') : '',
                    'line': +parts[4],
                    'column': parts[5] ? +parts[5] : null
                };
            } else if ((parts = chrome.exec(lines[i]))) {
                element = {
                    'url': parts[2],
                    'func': parts[1] || UNKNOWN_FUNCTION,
                    'line': +parts[3],
                    'column': parts[4] ? +parts[4] : null
                };
            } else {
                continue;
            }

            if (!element.func && element.line) {
                element.func = guessFunctionName(element.url, element.line);
            }

            if (element.line) {
                element.context = gatherContext(element.url, element.line);
            }

            stack.push(element);
        }

        if (stack[0] && stack[0].line && !stack[0].column && reference) {
            stack[0].column = findSourceInLine(reference[1], stack[0].url, stack[0].line);
        }

        if (!stack.length) {
            return null;
        }

        return {
            'mode': 'stack',
            'name': ex.name,
            'message': ex.message,
            'url': document.location.href,
            'stack': stack,
            'useragent': navigator.userAgent
        };
    }

    /**
     * Computes stack trace information from the stacktrace property.
     * Opera 10 uses this property.
     * @param {Error} ex
     * @return {?Object.<string, *>} Stack trace information.
     */
    function computeStackTraceFromStacktraceProp(ex) {
        // Access and store the stacktrace property before doing ANYTHING
        // else to it because Opera is not very good at providing it
        // reliably in other circumstances.
        var stacktrace = ex.stacktrace;

        var testRE = / line (\d+), column (\d+) in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\) in (.*):\s*$/i,
            lines = stacktrace.split('\n'),
            stack = [],
            parts;

        for (var i = 0, j = lines.length; i < j; i += 2) {
            if ((parts = testRE.exec(lines[i]))) {
                var element = {
                    'line': +parts[1],
                    'column': +parts[2],
                    'func': parts[3] || parts[4],
                    'args': parts[5] ? parts[5].split(',') : [],
                    'url': parts[6]
                };

                if (!element.func && element.line) {
                    element.func = guessFunctionName(element.url, element.line);
                }
                if (element.line) {
                    try {
                        element.context = gatherContext(element.url, element.line);
                    } catch (exc) {}
                }

                if (!element.context) {
                    element.context = [lines[i + 1]];
                }

                stack.push(element);
            }
        }

        if (!stack.length) {
            return null;
        }

        return {
            'mode': 'stacktrace',
            'name': ex.name,
            'message': ex.message,
            'url': document.location.href,
            'stack': stack,
            'useragent': navigator.userAgent
        };
    }

    /**
     * NOT TESTED.
     * Computes stack trace information from an error message that includes
     * the stack trace.
     * Opera 9 and earlier use this method if the option to show stack
     * traces is turned on in opera:config.
     * @param {Error} ex
     * @return {?Object.<string, *>} Stack information.
     */
    function computeStackTraceFromOperaMultiLineMessage(ex) {
        // Opera includes a stack trace into the exception message. An example is:
        //
        // Statement on line 3: Undefined variable: undefinedFunc
        // Backtrace:
        //   Line 3 of linked script file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.js: In function zzz
        //         undefinedFunc(a);
        //   Line 7 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html: In function yyy
        //           zzz(x, y, z);
        //   Line 3 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html: In function xxx
        //           yyy(a, a, a);
        //   Line 1 of function script
        //     try { xxx('hi'); return false; } catch(ex) { TraceKit.report(ex); }
        //   ...

        var lines = ex.message.split('\n');
        if (lines.length < 4) {
            return null;
        }

        var lineRE1 = /^\s*Line (\d+) of linked script ((?:file|http|https)\S+)(?:: in function (\S+))?\s*$/i,
            lineRE2 = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|http|https)\S+)(?:: in function (\S+))?\s*$/i,
            lineRE3 = /^\s*Line (\d+) of function script\s*$/i,
            stack = [],
            scripts = document.getElementsByTagName('script'),
            inlineScriptBlocks = [],
            parts,
            i,
            len,
            source;

        for (i in scripts) {
            if (_has(scripts, i) && !scripts[i].src) {
                inlineScriptBlocks.push(scripts[i]);
            }
        }

        for (i = 2, len = lines.length; i < len; i += 2) {
            var item = null;
            if ((parts = lineRE1.exec(lines[i]))) {
                item = {
                    'url': parts[2],
                    'func': parts[3],
                    'line': +parts[1]
                };
            } else if ((parts = lineRE2.exec(lines[i]))) {
                item = {
                    'url': parts[3],
                    'func': parts[4]
                };
                var relativeLine = (+parts[1]); // relative to the start of the <SCRIPT> block
                var script = inlineScriptBlocks[parts[2] - 1];
                if (script) {
                    source = getSource(item.url);
                    if (source) {
                        source = source.join('\n');
                        var pos = source.indexOf(script.innerText);
                        if (pos >= 0) {
                            item.line = relativeLine + source.substring(0, pos).split('\n').length;
                        }
                    }
                }
            } else if ((parts = lineRE3.exec(lines[i]))) {
                var url = window.location.href.replace(/#.*$/, ''),
                    line = parts[1];
                var re = new RegExp(escapeCodeAsRegExpForMatchingInsideHTML(lines[i + 1]));
                source = findSourceInUrls(re, [url]);
                item = {
                    'url': url,
                    'line': source ? source.line : line,
                    'func': ''
                };
            }

            if (item) {
                if (!item.func) {
                    item.func = guessFunctionName(item.url, item.line);
                }
                var context = gatherContext(item.url, item.line);
                var midline = (context ? context[Math.floor(context.length / 2)] : null);
                if (context && midline.replace(/^\s*/, '') === lines[i + 1].replace(/^\s*/, '')) {
                    item.context = context;
                } else {
                    // if (context) alert("Context mismatch. Correct midline:\n" + lines[i+1] + "\n\nMidline:\n" + midline + "\n\nContext:\n" + context.join("\n") + "\n\nURL:\n" + item.url);
                    item.context = [lines[i + 1]];
                }
                stack.push(item);
            }
        }
        if (!stack.length) {
            return null; // could not parse multiline exception message as Opera stack trace
        }

        return {
            'mode': 'multiline',
            'name': ex.name,
            'message': lines[0],
            'url': document.location.href,
            'stack': stack,
            'useragent': navigator.userAgent
        };
    }

    /**
     * Adds information about the first frame to incomplete stack traces.
     * Safari and IE require this to get complete data on the first frame.
     * @param {Object.<string, *>} stackInfo Stack trace information from
     * one of the compute* methods.
     * @param {string} url The URL of the script that caused an error.
     * @param {(number|string)} lineNo The line number of the script that
     * caused an error.
     * @param {string=} message The error generated by the browser, which
     * hopefully contains the name of the object that caused the error.
     * @return {boolean} Whether or not the stack information was
     * augmented.
     */
    function augmentStackTraceWithInitialElement(stackInfo, url, lineNo, message) {
        var initial = {
            'url': url,
            'line': lineNo
        };

        if (initial.url && initial.line) {
            stackInfo.incomplete = false;

            if (!initial.func) {
                initial.func = guessFunctionName(initial.url, initial.line);
            }

            if (!initial.context) {
                initial.context = gatherContext(initial.url, initial.line);
            }

            var reference = / '([^']+)' /.exec(message);
            if (reference) {
                initial.column = findSourceInLine(reference[1], initial.url, initial.line);
            }

            if (stackInfo.stack.length > 0) {
                if (stackInfo.stack[0].url === initial.url) {
                    if (stackInfo.stack[0].line === initial.line) {
                        return false; // already in stack trace
                    } else if (!stackInfo.stack[0].line && stackInfo.stack[0].func === initial.func) {
                        stackInfo.stack[0].line = initial.line;
                        stackInfo.stack[0].context = initial.context;
                        return false;
                    }
                }
            }

            stackInfo.stack.unshift(initial);
            stackInfo.partial = true;
            return true;
        } else {
            stackInfo.incomplete = true;
        }

        return false;
    }

    /**
     * Computes stack trace information by walking the arguments.caller
     * chain at the time the exception occurred. This will cause earlier
     * frames to be missed but is the only way to get any stack trace in
     * Safari and IE. The top frame is restored by
     * {@link augmentStackTraceWithInitialElement}.
     * @param {Error} ex
     * @return {?Object.<string, *>} Stack trace information.
     */
    function computeStackTraceByWalkingCallerChain(ex, depth) {
        var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,
            stack = [],
            funcs = {},
            recursion = false,
            parts,
            item,
            source;

        for (var curr = computeStackTraceByWalkingCallerChain.caller; curr && !recursion; curr = curr.caller) {
            if (curr === computeStackTrace || curr === TraceKit.report) {
                // console.log('skipping internal function');
                continue;
            }

            item = {
                'url': null,
                'func': UNKNOWN_FUNCTION,
                'line': null,
                'column': null
            };

            if (curr.name) {
                item.func = curr.name;
            } else if ((parts = functionName.exec(curr.toString()))) {
                item.func = parts[1];
            }

            if ((source = findSourceByFunctionBody(curr))) {
                item.url = source.url;
                item.line = source.line;

                if (item.func === UNKNOWN_FUNCTION) {
                    item.func = guessFunctionName(item.url, item.line);
                }

                var reference = / '([^']+)' /.exec(ex.message || ex.description);
                if (reference) {
                    item.column = findSourceInLine(reference[1], source.url, source.line);
                }
            }

            if (funcs['' + curr]) {
                recursion = true;
            }else{
                funcs['' + curr] = true;
            }

            stack.push(item);
        }

        if (depth) {
            // console.log('depth is ' + depth);
            // console.log('stack is ' + stack.length);
            stack.splice(0, depth);
        }

        var result = {
            'mode': 'callers',
            'name': ex.name,
            'message': ex.message,
            'url': document.location.href,
            'stack': stack,
            'useragent': navigator.userAgent
        };
        augmentStackTraceWithInitialElement(result, ex.sourceURL || ex.fileName, ex.line || ex.lineNumber, ex.message || ex.description);
        return result;
    }

    /**
     * Computes a stack trace for an exception.
     * @param {Error} ex
     * @param {(string|number)=} depth
     */
    function computeStackTrace(ex, depth) {
        var stack = null;
        depth = (depth == null ? 0 : +depth);

        try {
            // This must be tried first because Opera 10 *destroys*
            // its stacktrace property if you try to access the stack
            // property first!!
            stack = computeStackTraceFromStacktraceProp(ex);
            if (stack) {
                return stack;
            }
        } catch (e) {
            if (debug) {
                throw e;
            }
        }

        try {
            stack = computeStackTraceFromStackProp(ex);
            if (stack) {
                return stack;
            }
        } catch (e) {
            if (debug) {
                throw e;
            }
        }

        try {
            stack = computeStackTraceFromOperaMultiLineMessage(ex);
            if (stack) {
                return stack;
            }
        } catch (e) {
            if (debug) {
                throw e;
            }
        }

        try {
            stack = computeStackTraceByWalkingCallerChain(ex, depth + 1);
            if (stack) {
                return stack;
            }
        } catch (e) {
            if (debug) {
                throw e;
            }
        }

        return {
            'mode': 'failed'
        };
    }

    /**
     * Logs a stacktrace starting from the previous call and working down.
     * @param {(number|string)=} depth How many frames deep to trace.
     * @return {Object.<string, *>} Stack trace information.
     */
    function computeStackTraceOfCaller(depth) {
        depth = (depth == null ? 0 : +depth) + 1; // "+ 1" because "ofCaller" should drop one frame
        try {
            throw new Error();
        } catch (ex) {
            return computeStackTrace(ex, depth + 1);
        }

        return null;
    }

    computeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement;
    computeStackTrace.guessFunctionName = guessFunctionName;
    computeStackTrace.gatherContext = gatherContext;
    computeStackTrace.ofCaller = computeStackTraceOfCaller;

    return computeStackTrace;
}());


//Default options:
if (!TraceKit.remoteFetching) {
  TraceKit.remoteFetching = true;
}
if (!TraceKit.collectWindowErrors) {
  TraceKit.collectWindowErrors = true;
}
if (!TraceKit.linesOfContext || TraceKit.linesOfContext < 1) {
  // 3 lines before, the offending line, 3 lines after
  TraceKit.linesOfContext = 7;
}



// Export to global object
window.TraceKit = TraceKit;

}(window));

;(function(window, undefined){

'use strict';

// First, check for JSON support
// If there is no JSON, we no-op the core features of Raven
// since JSON is required to encode the payload
var _Raven = window.Raven,
    hasJSON = !!(window.JSON && window.JSON.stringify),
    lastCapturedException,
    globalServer,
    globalUser,
    globalKey,
    globalProject,
    globalOptions = {
        logger: 'javascript',
        ignoreErrors: [],
        ignoreUrls: [],
        whitelistUrls: [],
        includePaths: [],
        collectWindowErrors: true,
        tags: {},
        extra: {}
    };

var TK = TraceKit.noConflict();

// Disable Tracekit's remote fetching by default
TK.remoteFetching = false;

/*
 * The core Raven singleton
 *
 * @this {Raven}
 */
var Raven = {
    VERSION: '1.1.1',

    // Expose TraceKit to the Raven namespace
    TraceKit: TK,

    /*
     * Allow Raven to be configured as soon as it is loaded
     * It uses a global RavenConfig = {dsn: '...', config: {}}
     *
     * @return undefined
     */
    afterLoad: function() {
        var globalConfig = window.RavenConfig;
        if (globalConfig) {
            this.config(globalConfig.dsn, globalConfig.config).install();
        }
    },

    /*
     * Allow multiple versions of Raven to be installed.
     * Strip Raven from the global context and returns the instance.
     *
     * @return {Raven}
     */
    noConflict: function() {
        window.Raven = _Raven;
        return Raven;
    },

    /*
     * Configure Raven with a DSN and extra options
     *
     * @param {string} dsn The public Sentry DSN
     * @param {object} options Optional set of of global options [optional]
     * @return {Raven}
     */
    config: function(dsn, options) {
        var uri = parseDSN(dsn),
            lastSlash = uri.path.lastIndexOf('/'),
            path = uri.path.substr(1, lastSlash);

        // merge in options
        if (options) {
            each(options, function(key, value){
                globalOptions[key] = value;
            });
        }

        // "Script error." is hard coded into browsers for errors that it can't read.
        // this is the result of a script being pulled in from an external domain and CORS.
        globalOptions.ignoreErrors.push('Script error.');
        globalOptions.ignoreErrors.push('Script error');

        // join regexp rules into one big rule
        globalOptions.ignoreErrors = joinRegExp(globalOptions.ignoreErrors);
        globalOptions.ignoreUrls = globalOptions.ignoreUrls.length ? joinRegExp(globalOptions.ignoreUrls) : false;
        globalOptions.whitelistUrls = globalOptions.whitelistUrls.length ? joinRegExp(globalOptions.whitelistUrls) : false;
        globalOptions.includePaths = joinRegExp(globalOptions.includePaths);

        globalKey = uri.user;
        globalProject = ~~uri.path.substr(lastSlash + 1);

        // assemble the endpoint from the uri pieces
        globalServer = '//' + uri.host +
                      (uri.port ? ':' + uri.port : '') +
                      '/' + path + 'api/' + globalProject + '/store/';

        if (uri.protocol) {
            globalServer = uri.protocol + ':' + globalServer;
        }

        if (globalOptions.fetchContext) {
            TK.remoteFetching = true;
        }

        if (globalOptions.linesOfContext) {
            TK.linesOfContext = globalOptions.linesOfContext;
        }

        TK.collectWindowErrors = !!globalOptions.collectWindowErrors;

        // return for chaining
        return Raven;
    },

    /*
     * Installs a global window.onerror error handler
     * to capture and report uncaught exceptions.
     * At this point, install() is required to be called due
     * to the way TraceKit is set up.
     *
     * @return {Raven}
     */
    install: function() {
        if (!isSetup()) return;

        TK.report.subscribe(handleStackInfo);

        return Raven;
    },

    /*
     * Wrap code within a context so Raven can capture errors
     * reliably across domains that is executed immediately.
     *
     * @param {object} options A specific set of options for this context [optional]
     * @param {function} func The callback to be immediately executed within the context
     * @param {array} args An array of arguments to be called with the callback [optional]
     */
    context: function(options, func, args) {
        if (isFunction(options)) {
            args = func || [];
            func = options;
            options = undefined;
        }

        return Raven.wrap(options, func).apply(this, args);
    },

    /*
     * Wrap code within a context and returns back a new function to be executed
     *
     * @param {object} options A specific set of options for this context [optional]
     * @param {function} func The function to be wrapped in a new context
     * @return {function} The newly wrapped functions with a context
     */
    wrap: function(options, func) {
        // 1 argument has been passed, and it's not a function
        // so just return it
        if (isUndefined(func) && !isFunction(options)) {
            return options;
        }

        // options is optional
        if (isFunction(options)) {
            func = options;
            options = undefined;
        }

        // At this point, we've passed along 2 arguments, and the second one
        // is not a function either, so we'll just return the second argument.
        if (!isFunction(func)) {
            return func;
        }

        // We don't wanna wrap it twice!
        if (func.__raven__) {
            return func;
        }

        function wrapped() {
            var args = [], i = arguments.length;
            // Recursively wrap all of a function's arguments that are
            // functions themselves.
            while(i--) args[i] = Raven.wrap(options, arguments[i]);
            try {
                /*jshint -W040*/
                return func.apply(this, args);
            } catch(e) {
                Raven.captureException(e, options);
                throw e;
            }
        }

        // copy over properties of the old function
        for (var property in func) {
            if (func.hasOwnProperty(property)) {
                wrapped[property] = func[property];
            }
        }

        // Signal that this function has been wrapped already
        // for both debugging and to prevent it to being wrapped twice
        wrapped.__raven__ = true;

        return wrapped;
    },

    /*
     * Uninstalls the global error handler.
     *
     * @return {Raven}
     */
    uninstall: function() {
        TK.report.unsubscribe(handleStackInfo);

        return Raven;
    },

    /*
     * Manually capture an exception and send it over to Sentry
     *
     * @param {error} ex An exception to be logged
     * @param {object} options A specific set of options for this error [optional]
     * @return {Raven}
     */
    captureException: function(ex, options) {
        // If a string is passed through, recall as a message
        if (isString(ex)) return Raven.captureMessage(ex, options);

        // Store the raw exception object for potential debugging and introspection
        lastCapturedException = ex;

        // TraceKit.report will re-raise any exception passed to it,
        // which means you have to wrap it in try/catch. Instead, we
        // can wrap it here and only re-raise if TraceKit.report
        // raises an exception different from the one we asked to
        // report on.
        try {
            TK.report(ex, options);
        } catch(ex1) {
            if(ex !== ex1) {
                throw ex1;
            }
        }

        return Raven;
    },

    /*
     * Manually send a message to Sentry
     *
     * @param {string} msg A plain message to be captured in Sentry
     * @param {object} options A specific set of options for this message [optional]
     * @return {Raven}
     */
    captureMessage: function(msg, options) {
        // Fire away!
        send(
            arrayMerge({
                message: msg
            }, options)
        );

        return Raven;
    },

    /*
     * Set/clear a user to be sent along with the payload.
     *
     * @param {object} user An object representing user data [optional]
     * @return {Raven}
     */
    setUser: function(user) {
       globalUser = user;

       return Raven;
    },

    /*
     * Get the latest raw exception that was captured by Raven.
     *
     * @return {error}
     */
    lastException: function() {
        return lastCapturedException;
    }
};

function triggerEvent(eventType, options) {
    var event, key;

    options = options || {};

    eventType = 'raven' + eventType.substr(0,1).toUpperCase() + eventType.substr(1);

    if (document.createEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(eventType, true, true);
    } else {
        event = document.createEventObject();
        event.eventType = eventType;
    }

    for (key in options) if (options.hasOwnProperty(key)) {
        event[key] = options[key];
    }

    if (document.createEvent) {
        // IE9 if standards
        document.dispatchEvent(event);
    } else {
        // IE8 regardless of Quirks or Standards
        // IE9 if quirks
        try {
            document.fireEvent('on' + event.eventType.toLowerCase(), event);
        } catch(e) {}
    }
}

var dsnKeys = 'source protocol user host port path'.split(' '),
    dsnPattern = /^(?:(\w+):)?\/\/(\w+)@([\w\.-]+)(?::(\d+))?(\/.*)/;

/**** Private functions ****/
function parseDSN(str) {
    var m = dsnPattern.exec(str),
        dsn = {},
        i = 6;

    while (i--) dsn[dsnKeys[i]] = m[i] || '';

    return dsn;
}

function isUndefined(what) {
    return typeof what === 'undefined';
}

function isFunction(what) {
    return typeof what === 'function';
}

function isString(what) {
    return typeof what === 'string';
}

function each(obj, callback) {
    var i, j;

    if (isUndefined(obj.length)) {
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                callback.call(null, i, obj[i]);
            }
        }
    } else {
        j = obj.length;
        if (j) {
            for (i = 0; i < j; i++) {
                callback.call(null, i, obj[i]);
            }
        }
    }
}

var cachedAuth;

function getAuthQueryString() {
    if (cachedAuth) return cachedAuth;

    var qs = [
        'sentry_version=4',
        'sentry_client=raven-js/' + Raven.VERSION
    ];
    if (globalKey) {
        qs.push('sentry_key=' + globalKey);
    }

    cachedAuth = '?' + qs.join('&');
    return cachedAuth;
}

function handleStackInfo(stackInfo, options) {
    var frames = [];

    if (stackInfo.stack && stackInfo.stack.length) {
        each(stackInfo.stack, function(i, stack) {
            var frame = normalizeFrame(stack);
            if (frame) {
                frames.push(frame);
            }
        });
    }

    triggerEvent('handle', {
        stackInfo: stackInfo,
        options: options
    });

    processException(
        stackInfo.name,
        stackInfo.message,
        stackInfo.url,
        stackInfo.lineno,
        frames,
        options
    );
}

function normalizeFrame(frame) {
    if (!frame.url) return;

    // normalize the frames data
    var normalized = {
        filename:   frame.url,
        lineno:     frame.line,
        colno:      frame.column,
        'function': frame.func || '?'
    }, context = extractContextFromFrame(frame), i;

    if (context) {
        var keys = ['pre_context', 'context_line', 'post_context'];
        i = 3;
        while (i--) normalized[keys[i]] = context[i];
    }

    normalized.in_app = !( // determine if an exception came from outside of our app
        // first we check the global includePaths list.
        !globalOptions.includePaths.test(normalized.filename) ||
        // Now we check for fun, if the function name is Raven or TraceKit
        /(Raven|TraceKit)\./.test(normalized['function']) ||
        // finally, we do a last ditch effort and check for raven.min.js
        /raven\.(min\.)js$/.test(normalized.filename)
    );

    return normalized;
}

function extractContextFromFrame(frame) {
    // immediately check if we should even attempt to parse a context
    if (!frame.context || !globalOptions.fetchContext) return;

    var context = frame.context,
        pivot = ~~(context.length / 2),
        i = context.length, isMinified = false;

    while (i--) {
        // We're making a guess to see if the source is minified or not.
        // To do that, we make the assumption if *any* of the lines passed
        // in are greater than 300 characters long, we bail.
        // Sentry will see that there isn't a context
        if (context[i].length > 300) {
            isMinified = true;
            break;
        }
    }

    if (isMinified) {
        // The source is minified and we don't know which column. Fuck it.
        if (isUndefined(frame.column)) return;

        // If the source is minified and has a frame column
        // we take a chunk of the offending line to hopefully shed some light
        return [
            [],  // no pre_context
            context[pivot].substr(frame.column, 50), // grab 50 characters, starting at the offending column
            []   // no post_context
        ];
    }

    return [
        context.slice(0, pivot),    // pre_context
        context[pivot],             // context_line
        context.slice(pivot + 1)    // post_context
    ];
}

function processException(type, message, fileurl, lineno, frames, options) {
    var stacktrace, label, i;

    // Sometimes an exception is getting logged in Sentry as
    // <no message value>
    // This can only mean that the message was falsey since this value
    // is hardcoded into Sentry itself.
    // At this point, if the message is falsey, we bail since it's useless
    if (!message) return;

    if (globalOptions.ignoreErrors.test(message)) return;

    if (frames && frames.length) {
        stacktrace = {frames: frames};
        fileurl = fileurl || frames[0].filename;
    } else if (fileurl) {
        stacktrace = {
            frames: [{
                filename: fileurl,
                lineno: lineno
            }]
        };
    }

    if (globalOptions.ignoreUrls && globalOptions.ignoreUrls.test(fileurl)) return;
    if (globalOptions.whitelistUrls && !globalOptions.whitelistUrls.test(fileurl)) return;

    label = lineno ? message + ' at ' + lineno : message;

    // Fire away!
    send(
        arrayMerge({
            // sentry.interfaces.Exception
            exception: {
                type: type,
                value: message
            },
            // sentry.interfaces.Stacktrace
            stacktrace: stacktrace,
            culprit: fileurl,
            message: label
        }, options)
    );
}

function arrayMerge(arr1, arr2) {
    if (!arr2) {
        return arr1;
    }
    each(arr2, function(key, value){
        arr1[key] = value;
    });
    return arr1;
}

function getHttpData() {
    var http = {
        url: document.location.href,
        headers: {
            'User-Agent': navigator.userAgent
        }
    };

    if (document.referrer) {
        http.headers.Referer = document.referrer;
    }

    return http;
}

function send(data) {
    if (!isSetup()) return;

    data = arrayMerge({
        project: globalProject,
        logger: globalOptions.logger,
        site: globalOptions.site,
        platform: 'javascript',
        // sentry.interfaces.Http
        request: getHttpData()
    }, data);

    // Merge in the tags and extra separately since arrayMerge doesn't handle a deep merge
    data.tags = arrayMerge(globalOptions.tags, data.tags);
    data.extra = arrayMerge(globalOptions.extra, data.extra);

    // If there are no tags/extra, strip the key from the payload alltogther.
    if (!data.tags) delete data.tags;
    if (!data.extra) delete data.extra;

    if (globalUser) {
        // sentry.interfaces.User
        data.user = globalUser;
    }

    if (isFunction(globalOptions.dataCallback)) {
        data = globalOptions.dataCallback(data);
    }

    // Check if the request should be filtered or not
    if (isFunction(globalOptions.shouldSendCallback) && !globalOptions.shouldSendCallback(data)) {
        return;
    }

    makeRequest(data);
}


function makeRequest(data) {
    var img = new Image(),
        src = globalServer + getAuthQueryString() + '&sentry_data=' + encodeURIComponent(JSON.stringify(data));

    img.onload = function success() {
        triggerEvent('success', {
            data: data,
            src: src
        });
    };
    img.onerror = img.onabort = function failure() {
        triggerEvent('failure', {
            data: data,
            src: src
        });
    };
    img.src = src;
}

function isSetup() {
    if (!hasJSON) return false;  // needs JSON support
    if (!globalServer) {
        if (window.console && console.error) {
            console.error("Error: Raven has not been configured.");
        }
        return false;
    }
    return true;
}

function joinRegExp(patterns) {
    // Combine an array of regular expressions and strings into one large regexp
    // Be mad.
    var sources = [], i = patterns.length;
    while (i--) {
        sources[i] = isString(patterns[i]) ?
            // If it's a string, we need to escape it
            // Taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
            patterns[i].replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1") :
            // If it's a regexp already, we want to extract the source
            patterns[i].source;
    }
    return new RegExp(sources.join('|'), 'i');
}

Raven.afterLoad();

// Expose Raven to the world
window.Raven = Raven;

// AMD
if (typeof define === 'function' && define.amd) {
    define('raven', [], function() { return Raven.noConflict(); });
}

})(window);
