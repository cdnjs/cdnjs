/* rollbar.js for use with AMD loaders */
define(function(require, exports, module) {
/*
    json2.js
    2013-05-26

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

var setupCustomJSON = function(JSON) {
    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function () {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}



function _isUndefined(what) {
    return typeof what === 'undefined';
}

var UNKNOWN_FUNCTION = '?';
function computeStackTraceWrapper(options) {
    var debug = false,
        sourceCache = {};

    var remoteFetching = options.remoteFetching;
    var linesOfContext = options.linesOfContext;
    var tracekitReport = options.tracekitReport;

    /**
     * Attempts to retrieve source code via XMLHttpRequest, which is used
     * to look up anonymous function names.
     * @param {string} url URL of source code.
     * @return {string} Source contents.
     */
    function loadSource(url) {
        if (!remoteFetching) { //Only attempt request if remoteFetching is on.
            return '';
        }
        try {
            var getXHR = function() {
                try {
                    return new window.XMLHttpRequest();
                } catch (e) {
                    // explicitly bubble up the exception if not found
                    return new window.ActiveXObject('Microsoft.XMLHTTP');
                }
            };

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
        if (!sourceCache.hasOwnProperty(url)) {
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
            linesBefore = Math.floor(linesOfContext / 2),
            // Add one extra line if linesOfContext is odd
            linesAfter = linesBefore + (linesOfContext % 2),
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

        var chrome = /^\s*at (?:((?:\[object object\])?\S+(?: \[as \S+\])?) )?\(?((?:file|http|https):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
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
            if (scripts.hasOwnProperty(i) && !scripts[i].src) {
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
            if (curr === computeStackTrace || curr === tracekitReport) {
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
    }

    computeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement;
    computeStackTrace.guessFunctionName = guessFunctionName;
    computeStackTrace.gatherContext = gatherContext;
    computeStackTrace.ofCaller = computeStackTraceOfCaller;

    return computeStackTrace;
}

var Util = {
  // modified from https://github.com/jquery/jquery/blob/master/src/core.js#L127
  merge: function() {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = true;

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && typeof target !== 'function') {
      target = {};
    }

    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) !== null) {
        // Extend the base object
        for (name in options) {
          // IE8 will iterate over properties of objects like "indexOf"
          if (!options.hasOwnProperty(name)) {
            continue;
          }

          src = target[name];
          copy = options[name];

          // Prevent never-ending loop
          if (target === copy) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (copy.constructor == Object || (copyIsArray = (copy.constructor == Array)))) {
            if (copyIsArray) {
              copyIsArray = false;
              // Overwrite the source with a copy of the array to merge in
              clone = [];
            } else {
              clone = src && src.constructor == Object ? src : {};
            }

            // Never move original objects, clone them
            target[name] = Util.merge(clone, copy);

          // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  },

  copy: function(obj) {
    var dest;
    if (typeof obj === 'object') {
      if (obj.constructor == Object) {
        dest = {};
      } else if (obj.constructor == Array) {
        dest = [];
      }
    }

    Util.merge(dest, obj);
    return dest;
  },

  parseUriOptions: {
    strictMode: false,
    key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
    q:   {
      name:   "queryKey",
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  },

  parseUri: function(str) {
    if (!str || (typeof str !== 'string' && !(str instanceof String))) {
      throw new Error('Util.parseUri() received invalid input');
    }

    var o = Util.parseUriOptions;
    var m = o.parser[o.strictMode ? "strict" : "loose"].exec(str);
    var uri = {};
    var i = 14;

    while (i--) {
      uri[o.key[i]] = m[i] || "";
    }

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
      if ($1) {
        uri[o.q.name][$1] = $2;
      }
    });

    return uri;
  },

  sanitizeUrl: function(url) {
    if (!url || (typeof url !== 'string' && !(url instanceof String))) {
      throw new Error('Util.sanitizeUrl() received invalid input');
    }

    var baseUrlParts = Util.parseUri(url);
    // remove a trailing # if there is no anchor
    if (baseUrlParts.anchor === '') {
      baseUrlParts.source = baseUrlParts.source.replace('#', '');
    }

    url = baseUrlParts.source.replace('?' + baseUrlParts.query, '');
    return url;
  },

  traverse: function(obj, func) {
    var k;
    var v;
    var i;
    var isObj = typeof obj === 'object';
    var keys = [];

    if (isObj) {
      if (obj.constructor === Object) {
        for (k in obj) {
          if (obj.hasOwnProperty(k)) {
            keys.push(k);
          }
        }
      } else if (obj.constructor === Array) {
        for (i = 0; i < obj.length; ++i) {
          keys.push(i);
        }
      }
    }

    for (i = 0; i < keys.length; ++i) {
      k = keys[i];
      v = obj[k];
      isObj = typeof v === 'object';
      if (isObj) {
        if (v === null) {
          obj[k] = func(k, v);
        } else if (v.constructor === Object) {
          obj[k] = Util.traverse(v, func);
        } else if (v.constructor === Array) {
          obj[k] = Util.traverse(v, func);
        } else {
          obj[k] = func(k, v);
        }
      } else {
        obj[k] = func(k, v);
      }
    }

    return obj;

  },

  redact: function(val) {
    val = String(val);
    return new Array(val.length + 1).join('*');
  },

  // from http://stackoverflow.com/a/8809472/1138191
  uuid4: function() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
  }
};

var RollbarJSON = {};
setupCustomJSON(RollbarJSON);

var XHR = {
  XMLHttpFactories: [
      function () {return new XMLHttpRequest();},
      function () {return new ActiveXObject("Msxml2.XMLHTTP");},
      function () {return new ActiveXObject("Msxml3.XMLHTTP");},
      function () {return new ActiveXObject("Microsoft.XMLHTTP");}
  ],
  createXMLHTTPObject: function() {
    var xmlhttp = false;
    var factories = XHR.XMLHttpFactories;
    var i;
    var numFactories = factories.length;
    for (i = 0; i < numFactories; i++) {
      try {
        xmlhttp = factories[i]();
        break;
      } catch (e) {
        // pass
      }
    }
    return xmlhttp;
  },
  post: function(url, accessToken, payload, callback) {
    if (typeof payload !== 'object') {
      throw new Error('Expected an object to POST');
    }
    payload = RollbarJSON.stringify(payload);
    callback = callback || function() {};
    var request = XHR.createXMLHTTPObject();
    if (request) {
      try {
        try {
          var onreadystatechange = function(args) {
            try {
              if (onreadystatechange && request.readyState === 4) {
                onreadystatechange = undefined;

                // TODO(cory): have the notifier log an internal error on non-200 response codes
                if (request.status === 200) {
                  callback(null, RollbarJSON.parse(request.responseText));
                } else if (typeof(request.status) === "number" &&
                            request.status >= 400  && request.status < 600) {
                  // return valid http status codes
                  callback(new Error(request.status.toString()));
                } else {
                  // IE will return a status 12000+ on some sort of connection failure,
                  // so we return a blank error
                  // http://msdn.microsoft.com/en-us/library/aa383770%28VS.85%29.aspx
                  callback(new Error());
                }
              }
            } catch (ex) {
              //jquery source mentions firefox may error out while accessing the
              //request members if there is a network error
              //https://github.com/jquery/jquery/blob/a938d7b1282fc0e5c52502c225ae8f0cef219f0a/src/ajax/xhr.js#L111
              var exc;
              if (typeof ex === 'object' && ex.stack) {
                exc = ex;
              } else {
                exc = new Error(ex);
              }
              callback(exc);
            }
          };

          request.open('POST', url, true);
          if (request.setRequestHeader) {
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('X-Rollbar-Access-Token', accessToken);
          }
          request.onreadystatechange = onreadystatechange;
          request.send(payload);
        } catch (e1) {
          // Sending using the normal xmlhttprequest object didn't work, try XDomainRequest
          if (typeof XDomainRequest !== "undefined") {
            var ontimeout = function(args) {
              callback(new Error());
            };

            var onerror = function(args) {
              callback(new Error());
            };

            var onload = function(args) {
              callback(null, RollbarJSON.parse(request.responseText));
            };

            request = new XDomainRequest();
            request.onprogress = function() {};
            request.ontimeout = ontimeout;
            request.onerror = onerror;
            request.onload = onload;
            request.open('POST', url, true);
            request.send(payload);
          }
        }
      } catch (e2) {
        callback(e2);
      }
    }
  }
};


// Updated by the build process to match package.json
Notifier.NOTIFIER_VERSION = '1.2.1';
Notifier.DEFAULT_ENDPOINT = 'api.rollbar.com/api/1/';
Notifier.DEFAULT_SCRUB_FIELDS = ["pw","pass","passwd","password","secret","confirm_password","confirmPassword","password_confirmation","passwordConfirmation","access_token","accessToken","secret_key","secretKey","secretToken"];
Notifier.DEFAULT_LOG_LEVEL = 'debug';
Notifier.DEFAULT_REPORT_LEVEL = 'debug';
Notifier.DEFAULT_UNCAUGHT_ERROR_LEVEL = 'warning';
Notifier.DEFAULT_ITEMS_PER_MIN = 60;
Notifier.DEFAULT_MAX_ITEMS = 0;

Notifier.LEVELS = {
  debug: 0,
  info: 1,
  warning: 2,
  error: 3,
  critical: 4
};

// This is the global queue where all notifiers will put their
// payloads to be sent to Rollbar.
window._rollbarPayloadQueue = [];

// This contains global options for all Rollbar notifiers.
window._globalRollbarOptions = {
  startTime: (new Date()).getTime(),
  maxItems: Notifier.DEFAULT_MAX_ITEMS,
  itemsPerMinute: Notifier.DEFAULT_ITEMS_PER_MIN
};

var TK = computeStackTraceWrapper({remoteFetching: false, linesOfContext: 3});
var _topLevelNotifier;

function Notifier(parentNotifier) {
  // Save the first notifier so we can use it to send system messages like
  // when the rate limit is reached.
  _topLevelNotifier = _topLevelNotifier || this;

  var protocol = window.location.protocol;
  if (protocol.indexOf('http') !== 0) {
    protocol = 'https:';
  }
  var endpoint = protocol + '//' + Notifier.DEFAULT_ENDPOINT;
  this.options = {
    enabled: true,
    endpoint: endpoint,
    environment: 'production',
    scrubFields: Util.copy(Notifier.DEFAULT_SCRUB_FIELDS),
    checkIgnore: null,
    logLevel: Notifier.DEFAULT_LOG_LEVEL,
    reportLevel: Notifier.DEFAULT_REPORT_LEVEL,
    uncaughtErrorLevel: Notifier.DEFAULT_UNCAUGHT_ERROR_LEVEL,
    payload: {}
  };

  this.lastError = null;
  this.plugins = {};
  this.parentNotifier = parentNotifier;
  this.logger = function() {
    if (window.console && typeof window.console.log === 'function') {
      var args = ['Rollbar:'].concat(Array.prototype.slice.call(arguments, 0));
      window.console.log(args);
    }
  };

  if (parentNotifier) {
    // If the parent notifier has the shimId
    // property it means that it's a Rollbar shim.
    if (parentNotifier.hasOwnProperty('shimId')) {
      // After we set this, the shim is just a proxy to this
      // Notifier instance.
      parentNotifier.notifier = this;
    } else {
      this.logger = parentNotifier.logger;
      this.configure(parentNotifier.options);
    }
  }
}


Notifier._generateLogFn = function(level) {
  return _wrapNotifierFn(function _logFn() {
    var args = this._getLogArgs(arguments);

    return this._log(level || args.level || this.options.logLevel || Notifier.DEFAULT_LOG_LEVEL,
        args.message, args.err, args.custom, args.callback);
  });
};


/*
 * Returns an Object with keys:
 * {
 *  message: String,
 *  err: Error,
 *  custom: Object
 * }
 */
Notifier.prototype._getLogArgs = function(args) {
  var level = this.options.logLevel || Notifier.DEFAULT_LOG_LEVEL;
  var ts;
  var message;
  var err;
  var custom;
  var callback;

  var argT;
  var arg;
  for (var i = 0; i < args.length; ++i) {
    arg = args[i];
    argT = typeof arg;
    if (argT === 'string') {
      message = arg;
    } else if (argT === 'function') {
      callback = _wrapNotifierFn(arg, this);  // wrap the callback in a try/catch block
    } else if (arg && argT === 'object') {
      if (arg.constructor.name === 'Date') {
        ts = arg;
      } else if (arg instanceof Error ||
          arg.prototype === Error.prototype ||
          arg.hasOwnProperty('stack') ||
          (typeof DOMException !== "undefined" && arg instanceof DOMException)) {
        err = arg;
      } else {
        custom = arg;
      }
    }
  }

  // TODO(cory): somehow pass in timestamp too...

  return {
    level: level,
    message: message,
    err: err,
    custom: custom,
    callback: callback
  };
};


Notifier.prototype._route = function(path) {
  var endpoint = this.options.endpoint;

  var endpointTrailingSlash = /\/$/.test(endpoint);
  var pathBeginningSlash = /^\//.test(path);

  if (endpointTrailingSlash && pathBeginningSlash) {
    path = path.substring(1);
  } else if (!endpointTrailingSlash && !pathBeginningSlash) {
    path = '/' + path;
  }

  return endpoint + path;
};


/*
 * Given a queue containing each call to the shim, call the
 * corresponding method on this instance.
 *
 * shim queue contains:
 *
 * {shim: Rollbar, method: 'info', args: ['hello world', exc], ts: Date}
 */
Notifier.prototype._processShimQueue = function(shimQueue) {
  // implement me
  var shim;
  var obj;
  var tmp;
  var method;
  var args;
  var shimToNotifier = {};
  var parentShim;
  var parentNotifier;
  var notifier;

  // For each of the messages in the shimQueue we need to:
  // 1. get/create the notifier for that shim
  // 2. apply the message to the notifier
  while ((obj = shimQueue.shift())) {
    shim = obj.shim;
    method = obj.method;
    args = obj.args;
    parentShim = shim.parentShim;

    // Get the current notifier based on the shimId
    notifier = shimToNotifier[shim.shimId];
    if (!notifier) {

      // If there is no notifier associated with the shimId
      // Check to see if there's a parent shim
      if (parentShim) {

        // If there is a parent shim, get the parent notifier
        // and create a new notifier for the current shim.
        parentNotifier = shimToNotifier[parentShim.shimId];

        // Create a new Notifier which will process all of the shim's
        // messages
        notifier = new Notifier(parentNotifier);
      } else {
        // If there is no parent, assume the shim is the top
        // level shim and thus, should use this as the notifier.
        notifier = this;
      }

      // Save off the shimId->notifier mapping
      shimToNotifier[shim.shimId] = notifier;
    }

    if (notifier[method] && typeof notifier[method] === 'function') {
      notifier[method].apply(notifier, args);
    }
  }
};


/*
 * Builds and returns an Object that will be enqueued onto the
 * window._rollbarPayloadQueue array to be sent to Rollbar.
 */
Notifier.prototype._buildPayload = function(ts, level, message, stackInfo, custom) {
  var accessToken = this.options.accessToken;

  // NOTE(cory): DEPRECATED
  // Pass in {payload: {environment: 'production'}} instead of just {environment: 'production'}
  var environment = this.options.environment;

  var notifierOptions = Util.copy(this.options.payload);
  var uuid = Util.uuid4();

  if (Notifier.LEVELS[level] === undefined) {
    throw new Error('Invalid level');
  }

  if (!message && !stackInfo && !custom) {
    throw new Error('No message, stack info or custom data');
  }

  var payloadData = {
    environment: environment,
    endpoint: this.options.endpoint,
    uuid: uuid,
    level: level,
    platform: 'browser',
    framework: 'browser-js',
    language: 'javascript',
    body: this._buildBody(message, stackInfo, custom),
    request: {
      url: window.location.href,
      query_string: window.location.search,
      user_ip: "$remote_ip"
    },
    client: {
      runtime_ms: ts.getTime() - window._globalRollbarOptions.startTime,
      timestamp: Math.round(ts.getTime() / 1000),
      javascript: {
        browser: window.navigator.userAgent,
        language: window.navigator.language,
        cookie_enabled: window.navigator.cookieEnabled,
        screen: {
          width: window.screen.width,
          height: window.screen.height
        },
        plugins: this._getBrowserPlugins()
      }
    },
    server: {},
    notifier: {
      name: 'rollbar-browser-js',
      version: Notifier.NOTIFIER_VERSION
    }
  };

  if (notifierOptions.body) {
    delete notifierOptions.body;
  }

  // Overwrite the options from configure() with the payload
  // data.
  var payload = {
    access_token: accessToken,
    data: Util.merge(payloadData, notifierOptions)
  };

  // Only scrub the data section since we never want to scrub "access_token"
  // even if it's in the scrub fields
  this._scrub(payload.data);

  return payload;
};


Notifier.prototype._buildBody = function(message, stackInfo, custom) {
  var body;
  if (stackInfo && stackInfo.mode !== 'failed') {
    body = this._buildPayloadBodyTrace(message, stackInfo, custom);
  } else {
    body = this._buildPayloadBodyMessage(message, custom);
  }
  return body;
};


Notifier.prototype._buildPayloadBodyMessage = function(message, custom) {
  if (!message) {
    if (custom) {
      message = RollbarJSON.stringify(custom);
    } else {
      message = '';
    }
  }
  var result = {
    body: message
  };

  if (custom) {
    result.extra = Util.copy(custom);
  }

  return {
    message: result
  };
};


Notifier.prototype._buildPayloadBodyTrace = function(description, stackInfo, custom) {
  var guess = _guessErrorClass(stackInfo.message);
  var className = stackInfo.name || guess[0];
  var message = guess[1];
  var trace = {
    exception: {
      'class': className,
      message: message
    }
  };

  if (description) {
    trace.exception.description = description || 'uncaught exception';
  }

  // Transform a TraceKit stackInfo object into a Rollbar trace
  if (stackInfo.stack) {
    var stackFrame;
    var frame;
    var code;
    var pre;
    var post;
    var contextLength;
    var i, j, mid;

    trace.frames = [];
    for (i = 0; i < stackInfo.stack.length; ++i) {
      stackFrame = stackInfo.stack[i];
      frame = {
        filename: stackFrame.url ? Util.sanitizeUrl(stackFrame.url) : '(unknown)',
        lineno: stackFrame.line || null,
        method: (!stackFrame.func || stackFrame.func === '?') ? '[anonymous]' : stackFrame.func,
        colno: stackFrame.column
      };

      code = pre = post = null;
      contextLength = stackFrame.context ? stackFrame.context.length : 0;
      if (contextLength) {
        mid = Math.floor(contextLength / 2);
        pre = stackFrame.context.slice(0, mid);
        code = stackFrame.context[mid];
        post = stackFrame.context.slice(mid);
      }

      if (code) {
        frame.code = code;
      }

      if (pre || post) {
        frame.context = {};
        if (pre && pre.length) {
          frame.context.pre = pre;
        }
        if (post && post.length) {
          frame.context.post = post;
        }
      }

      if (stackFrame.args) {
        frame.args = stackFrame.args;
      }

      trace.frames.push(frame);
    }
    if (custom) {
      trace.extra = Util.copy(custom);
    }
    return {trace: trace};
  } else {
    // no frames - not useful as a trace. just report as a message.
    return this._buildPayloadBodyMessage(className + ': ' + message, custom);
  }
};


Notifier.prototype._getBrowserPlugins = function() {
  if (!this._browserPlugins) {
    var navPlugins = (window.navigator.plugins || []);
    var cur;
    var numPlugins = navPlugins.length;
    var plugins = [];
    var i;
    for (i = 0; i < numPlugins; ++i) {
      cur = navPlugins[i];
      plugins.push({name: cur.name, description: cur.description});
    }
    this._browserPlugins = plugins;
  }
  return this._browserPlugins;
};


/*
 * Does an in-place modification of obj such that:
 * 1. All keys that match the notifier's options.scrubFields
 *    list will be normalized into all '*'
 * 2. Any query string params that match the same criteria will have
 *    their values normalized as well.
 */
Notifier.prototype._scrub = function(obj) {
  function redactQueryParam(match, paramPart, dummy1,
      dummy2, dummy3, valPart, offset, string) {
    return paramPart + Util.redact(valPart);
  }

  function paramScrubber(v) {
    var i;
    if (typeof(v) === 'string') {
      for (i = 0; i < queryRes.length; ++i) {
        v = v.replace(queryRes[i], redactQueryParam);
      }
    }
    return v;
  }

  function valScrubber(k, v) {
    var i;
    for (i = 0; i < paramRes.length; ++i) {
      if (paramRes[i].test(k)) {
        v = Util.redact(v);
        break;
      }
    }
    return v;
  }

  function scrubber(k, v) {
    var tmpV = valScrubber(k, v);
    if (tmpV === v) {
      return paramScrubber(tmpV);
    } else {
      return tmpV;
    }
  }

  var scrubFields = this.options.scrubFields;
  var paramRes = this._getScrubFieldRegexs(scrubFields);
  var queryRes = this._getScrubQueryParamRegexs(scrubFields);

  Util.traverse(obj, scrubber);
  return obj;
};


Notifier.prototype._getScrubFieldRegexs = function(scrubFields) {
  var ret = [];
  var pat;
  for (var i = 0; i < scrubFields.length; ++i) {
    pat = '\\[?(%5[bB])?' + scrubFields[i] + '\\[?(%5[bB])?\\]?(%5[dD])?';
    ret.push(new RegExp(pat, 'i'));
  }
  return ret;
};


Notifier.prototype._getScrubQueryParamRegexs = function(scrubFields) {
  var ret = [];
  var pat;
  for (var i = 0; i < scrubFields.length; ++i) {
    pat = '\\[?(%5[bB])?' + scrubFields[i] + '\\[?(%5[bB])?\\]?(%5[dD])?';
    ret.push(new RegExp('(' + pat + '=)([^&\\n]+)', 'igm'));
  }
  return ret;
};

Notifier.prototype._urlIsWhitelisted = function(payload){
  var whitelist, trace, frame, filename, frameLength, url, listLength, urlRegex;
  var i, j;

  try {
    whitelist = this.options.hostWhiteList;
    trace = payload.data.body.trace;

    if (!whitelist || whitelist.length === 0) { return true; }
    if (!trace) { return true; }

    listLength = whitelist.length;
    frameLength = trace.frames.length;
    for (i = 0; i < frameLength; i++) {
      frame = trace.frames[i];
      filename = frame.filename;
      if (typeof filename !== "string") { return true; }
      for (j = 0; j < listLength; j++) {
        url = whitelist[j];
        urlRegex = new RegExp(url);

        if (urlRegex.test(filename)){
          return true;
        }
      }
    }
  } catch (e) {
    this.configure({hostWhiteList: null});
    this.error("Error while reading your configuration's hostWhiteList option. Removing custom hostWhiteList.", e);
    return true;
  }

  return false;
};

Notifier.prototype._messageIsIgnored = function(payload){
  var exceptionMessage, i, ignoredMessages, len, messageIsIgnored, rIgnoredMessage, trace;
  try {
    messageIsIgnored = false;
    ignoredMessages = this.options.ignoredMessages;
    trace = payload.data.body.trace;

    if(!ignoredMessages || ignoredMessages.length === 0) { return false; }
    if(!trace) { return false; }
    exceptionMessage = trace.exception.message;

    len = ignoredMessages.length;
    for(i=0; i < len; i++) {
      rIgnoredMessage = new RegExp(ignoredMessages[i], "gi");
      messageIsIgnored = rIgnoredMessage.test(exceptionMessage);

      if(messageIsIgnored){
        break;
      }
    }
  }
  catch(e) {
    this.configure({ignoredMessages: null});
    this.error("Error while reading your configuration's ignoredMessages option. Removing custom ignoredMessages.");
  }

  return messageIsIgnored;
};

Notifier.prototype._enqueuePayload = function(payload, isUncaught, callerArgs, callback) {

  var payloadToSend = {
    callback: callback,
    accessToken: this.options.accessToken,
    endpointUrl: this._route('item/'),
    payload: payload
  };

  var ignoredCallback = function() {
    if (callback) {
      // If the item was ignored call the callback anyway
      var msg = 'This item was not sent to Rollbar because it was ignored. ' +
                'This can happen if a custom checkIgnore() function was used ' +
                'or if the item\'s level was less than the notifier\' reportLevel. ' +
                'See https://rollbar.com/docs/notifier/rollbar.js/configuration for more details.';

      callback(null, {err: 0, result: {id: null, uuid: null, message: msg}});
    }
  };

  // Internal checkIgnore will check the level against the minimum
  // report level from this.options
  if (this._internalCheckIgnore(isUncaught, callerArgs, payload)) {
    ignoredCallback();
    return;
  }

  // Users can set their own ignore criteria using this.options.checkIgnore()
  try {
    if (this.options.checkIgnore &&
        typeof this.options.checkIgnore === 'function' &&
        this.options.checkIgnore(isUncaught, callerArgs, payload)) {
      ignoredCallback();
      return;
    }
  } catch (e) {
    // Disable the custom checkIgnore and report errors in the checkIgnore function
    this.configure({checkIgnore: null});
    this.error('Error while calling custom checkIgnore() function. Removing custom checkIgnore().', e);
  }

  if (!this._urlIsWhitelisted(payload)) {
    return;
  }

  if (this._messageIsIgnored(payload)) {
    return;
  }

  if (this.options.verbose) {
    if (payload.data && payload.data.body && payload.data.body.trace) {
      var trace = payload.data.body.trace;
      var exceptionMessage = trace.exception.message;
      this.logger(exceptionMessage);
    }

    // FIXME: Some browsers do not output objects as json to the console, and
    // instead write [object Object], so let's write the message first to ensure that is logged.
    this.logger('Sending payload -', payloadToSend);
  }

  if (typeof this.options.logFunction === "function") {
    this.options.logFunction(payloadToSend);
  }

  try {
    if (typeof this.options.transform === 'function') {
      this.options.transform(payload);
    }
  } catch (e) {
    this.configure({transform: null});
    this.error('Error while calling custom transform() function. Removing custom transform().', e);
  }

  if (!!this.options.enabled) {
    window._rollbarPayloadQueue.push(payloadToSend);
  }
};


Notifier.prototype._internalCheckIgnore = function(isUncaught, callerArgs, payload) {
  var level = callerArgs[0];
  var levelVal = Notifier.LEVELS[level] || 0;
  var reportLevel = Notifier.LEVELS[this.options.reportLevel] || 0;

  if (levelVal < reportLevel) {
    return true;
  }

  var plugins = this.options ? this.options.plugins : {};
  if (plugins && plugins.jquery && plugins.jquery.ignoreAjaxErrors &&
        payload.body.message) {
    return payload.body.messagejquery_ajax_error;
  }

  return false;
};


/*
 * Logs stuff to Rollbar using the default
 * logging level.
 *
 * Can be called with the following, (order doesn't matter but type does):
 * - message: String
 * - err: Error object, must have a .stack property or it will be
 *   treated as custom data
 * - custom: Object containing custom data to be sent along with
 *   the item
 * - callback: Function to call once the item is reported to Rollbar
 * - isUncaught: True if this error originated from an uncaught exception handler
 * - ignoreRateLimit: True if this item should be allowed despite rate limit checks
 */
Notifier.prototype._log = function(level, message, err, custom, callback, isUncaught, ignoreRateLimit) {
  var stackInfo = null;
  if (err) {
    // If we've already calculated the stack trace for the error, use it.
    // This can happen for wrapped errors that don't have a "stack" property.
    stackInfo = err._tkStackTrace ? err._tkStackTrace : TK(err);

    // Don't report the same error more than once
    if (err === this.lastError) {
      return;
    }

    this.lastError = err;
  }

  var payload = this._buildPayload(new Date(), level, message, stackInfo, custom);
  if (ignoreRateLimit) {
    payload.ignoreRateLimit = true;
  }
  this._enqueuePayload(payload, isUncaught ? true : false, [level, message, err, custom], callback);
};

Notifier.prototype.log = Notifier._generateLogFn();
Notifier.prototype.debug = Notifier._generateLogFn('debug');
Notifier.prototype.info = Notifier._generateLogFn('info');
Notifier.prototype.warn = Notifier._generateLogFn('warning'); // for console.warn() compatibility
Notifier.prototype.warning = Notifier._generateLogFn('warning');
Notifier.prototype.error = Notifier._generateLogFn('error');
Notifier.prototype.critical = Notifier._generateLogFn('critical');

// Adapted from tracekit.js
Notifier.prototype.uncaughtError = _wrapNotifierFn(function(message, url, lineNo, colNo, err, context) {
  context = context || null;
  if (err && err.stack) {
    this._log(this.options.uncaughtErrorLevel, message, err, context, null, true);
    return;
  }

  // NOTE(cory): sometimes users will trigger an "error" event
  // on the window object directly which will result in errMsg
  // being an Object instead of a string.
  //
  if (url && url.stack) {
    this._log(this.options.uncaughtErrorLevel, message, url, context, null, true);
    return;
  }

  var location = {
    'url': url || '',
    'line': lineNo
  };
  location.func = TK.guessFunctionName(location.url, location.line);
  location.context = TK.gatherContext(location.url, location.line);
  var stack = {
    'mode': 'onerror',
    'message': message || 'uncaught exception',
    'url': document.location.href,
    'stack': [location],
    'useragent': navigator.userAgent
  };
  if (err) {
    stack = err._tkStackTrace || TK(err);
  }

  var payload = this._buildPayload(new Date(), this.options.uncaughtErrorLevel, message, stack);
  this._enqueuePayload(payload, true, [this.options.uncaughtErrorLevel, message, url, lineNo, colNo, err]);
});


Notifier.prototype.global = _wrapNotifierFn(function(options) {
  options = options || {};
  Util.merge(window._globalRollbarOptions, options);
  if (options.maxItems !== undefined) {
    rateLimitCounter = 0;
  }

  if (options.itemsPerMinute !== undefined) {
    rateLimitPerMinCounter = 0;
  }
});


Notifier.prototype.configure = _wrapNotifierFn(function(options) {
  // TODO(cory): only allow non-payload keys that we understand

  // Make a copy of the options object for this notifier
  Util.merge(this.options, options);
});

/*
 * Create a new Notifier instance which has the same options
 * as the current notifier + options to override them.
 */
Notifier.prototype.scope = _wrapNotifierFn(function(payloadOptions) {
  var scopedNotifier = new Notifier(this);
  Util.merge(scopedNotifier.options.payload, payloadOptions);
  return scopedNotifier;
});

Notifier.prototype.wrap = function(f, context) {
  var _this = this;
  var ctxFn;
  if (typeof context === 'function') {
    ctxFn = context;
  } else {
    ctxFn = function() { return context || {}; };
  }

  if (typeof f !== 'function') {
    return f;
  }

  // If the given function is already a wrapped function, just
  // return it instead of wrapping twice
  if (f._isWrap) {
    return f;
  }

  if (!f._wrapped) {
    f._wrapped = function () {
      try {
        return f.apply(this, arguments);
      } catch(e) {
        if (!e.stack) {
          e._tkStackTrace = TK(e);
        }
        e._rollbarContext = ctxFn() || {};
        e._rollbarContext._wrappedSource = f.toString();

        window._rollbarWrappedError = e;
        throw e;
      }
    };

    f._wrapped._isWrap = true;

    for (var prop in f) {
      if (f.hasOwnProperty(prop)) {
        f._wrapped[prop] = f[prop];
      }
    }
  }

  return f._wrapped;
};

/***** Misc *****/

function _wrapNotifierFn(fn, ctx) {
  return function() {
    var self = ctx || this;
    try {
      return fn.apply(self, arguments);
    } catch (e) {
      if (self) {
        self.logger(e);
      }
    }
  };
}


var ERR_CLASS_REGEXP = new RegExp('^(([a-zA-Z0-9-_$ ]*): *)?(Uncaught )?([a-zA-Z0-9-_$ ]*): ');
function _guessErrorClass(errMsg) {
  if (!errMsg) {
    return ["Unknown error. There was no error message to display.", ""];
  }
  var errClassMatch = errMsg.match(ERR_CLASS_REGEXP);
  var errClass = '(unknown)';

  if (errClassMatch) {
    errClass = errClassMatch[errClassMatch.length - 1];
    errMsg = errMsg.replace((errClassMatch[errClassMatch.length - 2] || '') + errClass + ':', '');
    errMsg = errMsg.replace(/(^[\s]+|[\s]+$)/g, '');
  }
  return [errClass, errMsg];
}

/***** Payload processor *****/

var payloadProcessorTimeout;
Notifier.processPayloads = function(immediate) {
  if (!payloadProcessorTimeout || immediate) {
    _payloadProcessorTimer(immediate);
  }
};


function _payloadProcessorTimer(immediate) {
  var payloadObj;
  while ((payloadObj = window._rollbarPayloadQueue.shift())) {
    _processPayload(payloadObj.endpointUrl, payloadObj.accessToken, payloadObj.payload, payloadObj.callback);
  }
  if (!immediate) {
    payloadProcessorTimeout = setTimeout(_payloadProcessorTimer, 1000);
  }
}


var rateLimitStartTime = new Date().getTime();
var rateLimitCounter = 0;
var rateLimitPerMinCounter = 0;
function _processPayload(url, accessToken, payload, callback) {
  callback = callback || function cb() {};
  var now = new Date().getTime();
  if (now - rateLimitStartTime >= 60000) {
    rateLimitStartTime = now;
    rateLimitPerMinCounter = 0;
  }

  // Check to see if we have a rate limit set or if
  // the rate limit has been met/exceeded.
  var globalRateLimit = window._globalRollbarOptions.maxItems;
  var globalRateLimitPerMin = window._globalRollbarOptions.itemsPerMinute;
  var checkOverRateLimit = function() { return !payload.ignoreRateLimit && globalRateLimit >= 1 && rateLimitCounter >= globalRateLimit; };
  var checkOverRateLimitPerMin = function() { return !payload.ignoreRateLimit && globalRateLimitPerMin >= 1 && rateLimitPerMinCounter >= globalRateLimitPerMin; };

  if (checkOverRateLimit()) {
    callback(new Error(globalRateLimit + ' max items reached'));
    return;
  } else if (checkOverRateLimitPerMin()) {
    callback(new Error(globalRateLimitPerMin + ' items per minute reached'));
    return;
  } else {
    rateLimitCounter++;
    rateLimitPerMinCounter++;

    // Check to see if we have just reached the rate limit. If so, notify the customer.
    if (checkOverRateLimit()) {
      _topLevelNotifier._log(_topLevelNotifier.options.uncaughtErrorLevel, //level
          'maxItems has been hit. Ignoring errors for the remainder of the current page load.', // message
          null, // err
          {maxItems: globalRateLimit}, // custom
          null,  // callback
          false, // isUncaught
          true); // ignoreRateLimit
    }
    // remove this key since it's only used for internal notifier logic
    if (payload.ignoreRateLimit) {
      delete payload.ignoreRateLimit;
    }
  }

  // There's either no rate limit or we haven't met it yet so
  // go ahead and send it.
  XHR.post(url, accessToken, payload, function xhrCallback(err, resp) {
    if (err) {
      return callback(err);
    }

    // TODO(cory): parse resp as JSON
    return callback(null, resp);
  });
}

// Stub out the wrapped error which is set 
window._rollbarWrappedError = null;

// Global window.onerror handler
function _rollbarWindowOnError(client, old, args) {
  if (!args[4] && window._rollbarWrappedError) {
    args[4] = window._rollbarWrappedError;
    window._rollbarWrappedError = null;
  }

  client.uncaughtError.apply(client, args);
  if (old) {
    old.apply(window, args);
  }
}

function _extendListenerPrototype(client, prototype) {
  if (prototype.hasOwnProperty && prototype.hasOwnProperty('addEventListener')) {
    var oldAddEventListener = prototype.addEventListener;
    prototype.addEventListener = function(event, callback, bubble) {
      oldAddEventListener.call(this, event, client.wrap(callback), bubble);
    };

    var oldRemoveEventListener = prototype.removeEventListener;
    prototype.removeEventListener = function(event, callback, bubble) {
      oldRemoveEventListener.call(this, event, callback && callback._wrapped || callback, bubble);
    };
  }
}

// Add an init() method to do the same things that the shim would do
var wrapper = {};
wrapper.init = function(config) {
  var notifier = new Notifier();
  notifier.configure(config); 

  if (config.captureUncaught) {
    // Set the global onerror handler
    var old = window.onerror;

    window.onerror = function() {
      var args = Array.prototype.slice.call(arguments, 0);
      _rollbarWindowOnError(notifier, old, args);
    };

    // Adapted from https://github.com/bugsnag/bugsnag-js
    var globals = ['EventTarget', 'Window', 'Node', 'ApplicationCache', 'AudioTrackList', 'ChannelMergerNode', 'CryptoOperation', 'EventSource',
     'FileReader', 'HTMLUnknownElement', 'IDBDatabase', 'IDBRequest', 'IDBTransaction', 'KeyOperation', 'MediaController',
     'MessagePort', 'ModalWindow', 'Notification', 'SVGElementInstance', 'Screen', 'TextTrack', 'TextTrackCue',
     'TextTrackList', 'WebSocket', 'WebSocketWorker', 'Worker', 'XMLHttpRequest', 'XMLHttpRequestEventTarget',
     'XMLHttpRequestUpload'];

    var i;
    var global;
    for (i = 0; i < globals.length; ++i) {
      global = globals[i];

      if (window[global] && window[global].prototype) {
        _extendListenerPrototype(notifier, window[global].prototype);
      }
    }
  }

  // Finally, start processing payloads using the global notifier
  Notifier.processPayloads();
  return notifier;
};
module.exports = wrapper;
});