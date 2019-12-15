(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.vl = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var json = typeof JSON !== 'undefined' ? JSON : require('jsonify');

module.exports = function (obj, opts) {
    if (!opts) opts = {};
    if (typeof opts === 'function') opts = { cmp: opts };
    var space = opts.space || '';
    if (typeof space === 'number') space = Array(space+1).join(' ');
    var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;
    var replacer = opts.replacer || function(key, value) { return value; };

    var cmp = opts.cmp && (function (f) {
        return function (node) {
            return function (a, b) {
                var aobj = { key: a, value: node[a] };
                var bobj = { key: b, value: node[b] };
                return f(aobj, bobj);
            };
        };
    })(opts.cmp);

    var seen = [];
    return (function stringify (parent, key, node, level) {
        var indent = space ? ('\n' + new Array(level + 1).join(space)) : '';
        var colonSeparator = space ? ': ' : ':';

        if (node && node.toJSON && typeof node.toJSON === 'function') {
            node = node.toJSON();
        }

        node = replacer.call(parent, key, node);

        if (node === undefined) {
            return;
        }
        if (typeof node !== 'object' || node === null) {
            return json.stringify(node);
        }
        if (isArray(node)) {
            var out = [];
            for (var i = 0; i < node.length; i++) {
                var item = stringify(node, i, node[i], level+1) || json.stringify(null);
                out.push(indent + space + item);
            }
            return '[' + out.join(',') + indent + ']';
        }
        else {
            if (seen.indexOf(node) !== -1) {
                if (cycles) return json.stringify('__cycle__');
                throw new TypeError('Converting circular structure to JSON');
            }
            else seen.push(node);

            var keys = objectKeys(node).sort(cmp && cmp(node));
            var out = [];
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = stringify(node, key, node[key], level+1);

                if(!value) continue;

                var keyValue = json.stringify(key)
                    + colonSeparator
                    + value;
                ;
                out.push(indent + space + keyValue);
            }
            seen.splice(seen.indexOf(node), 1);
            return '{' + out.join(',') + indent + '}';
        }
    })({ '': obj }, '', obj, 0);
};

var isArray = Array.isArray || function (x) {
    return {}.toString.call(x) === '[object Array]';
};

var objectKeys = Object.keys || function (obj) {
    var has = Object.prototype.hasOwnProperty || function () { return true };
    var keys = [];
    for (var key in obj) {
        if (has.call(obj, key)) keys.push(key);
    }
    return keys;
};

},{"jsonify":2}],2:[function(require,module,exports){
exports.parse = require('./lib/parse');
exports.stringify = require('./lib/stringify');

},{"./lib/parse":3,"./lib/stringify":4}],3:[function(require,module,exports){
var at, // The index of the current character
    ch, // The current character
    escapee = {
        '"':  '"',
        '\\': '\\',
        '/':  '/',
        b:    '\b',
        f:    '\f',
        n:    '\n',
        r:    '\r',
        t:    '\t'
    },
    text,

    error = function (m) {
        // Call error when something is wrong.
        throw {
            name:    'SyntaxError',
            message: m,
            at:      at,
            text:    text
        };
    },
    
    next = function (c) {
        // If a c parameter is provided, verify that it matches the current character.
        if (c && c !== ch) {
            error("Expected '" + c + "' instead of '" + ch + "'");
        }
        
        // Get the next character. When there are no more characters,
        // return the empty string.
        
        ch = text.charAt(at);
        at += 1;
        return ch;
    },
    
    number = function () {
        // Parse a number value.
        var number,
            string = '';
        
        if (ch === '-') {
            string = '-';
            next('-');
        }
        while (ch >= '0' && ch <= '9') {
            string += ch;
            next();
        }
        if (ch === '.') {
            string += '.';
            while (next() && ch >= '0' && ch <= '9') {
                string += ch;
            }
        }
        if (ch === 'e' || ch === 'E') {
            string += ch;
            next();
            if (ch === '-' || ch === '+') {
                string += ch;
                next();
            }
            while (ch >= '0' && ch <= '9') {
                string += ch;
                next();
            }
        }
        number = +string;
        if (!isFinite(number)) {
            error("Bad number");
        } else {
            return number;
        }
    },
    
    string = function () {
        // Parse a string value.
        var hex,
            i,
            string = '',
            uffff;
        
        // When parsing for string values, we must look for " and \ characters.
        if (ch === '"') {
            while (next()) {
                if (ch === '"') {
                    next();
                    return string;
                } else if (ch === '\\') {
                    next();
                    if (ch === 'u') {
                        uffff = 0;
                        for (i = 0; i < 4; i += 1) {
                            hex = parseInt(next(), 16);
                            if (!isFinite(hex)) {
                                break;
                            }
                            uffff = uffff * 16 + hex;
                        }
                        string += String.fromCharCode(uffff);
                    } else if (typeof escapee[ch] === 'string') {
                        string += escapee[ch];
                    } else {
                        break;
                    }
                } else {
                    string += ch;
                }
            }
        }
        error("Bad string");
    },

    white = function () {

// Skip whitespace.

        while (ch && ch <= ' ') {
            next();
        }
    },

    word = function () {

// true, false, or null.

        switch (ch) {
        case 't':
            next('t');
            next('r');
            next('u');
            next('e');
            return true;
        case 'f':
            next('f');
            next('a');
            next('l');
            next('s');
            next('e');
            return false;
        case 'n':
            next('n');
            next('u');
            next('l');
            next('l');
            return null;
        }
        error("Unexpected '" + ch + "'");
    },

    value,  // Place holder for the value function.

    array = function () {

// Parse an array value.

        var array = [];

        if (ch === '[') {
            next('[');
            white();
            if (ch === ']') {
                next(']');
                return array;   // empty array
            }
            while (ch) {
                array.push(value());
                white();
                if (ch === ']') {
                    next(']');
                    return array;
                }
                next(',');
                white();
            }
        }
        error("Bad array");
    },

    object = function () {

// Parse an object value.

        var key,
            object = {};

        if (ch === '{') {
            next('{');
            white();
            if (ch === '}') {
                next('}');
                return object;   // empty object
            }
            while (ch) {
                key = string();
                white();
                next(':');
                if (Object.hasOwnProperty.call(object, key)) {
                    error('Duplicate key "' + key + '"');
                }
                object[key] = value();
                white();
                if (ch === '}') {
                    next('}');
                    return object;
                }
                next(',');
                white();
            }
        }
        error("Bad object");
    };

value = function () {

// Parse a JSON value. It could be an object, an array, a string, a number,
// or a word.

    white();
    switch (ch) {
    case '{':
        return object();
    case '[':
        return array();
    case '"':
        return string();
    case '-':
        return number();
    default:
        return ch >= '0' && ch <= '9' ? number() : word();
    }
};

// Return the json_parse function. It will have access to all of the above
// functions and variables.

module.exports = function (source, reviver) {
    var result;
    
    text = source;
    at = 0;
    ch = ' ';
    result = value();
    white();
    if (ch) {
        error("Syntax error");
    }

    // If there is a reviver function, we recursively walk the new structure,
    // passing each name/value pair to the reviver function for possible
    // transformation, starting with a temporary root object that holds the result
    // in an empty key. If there is not a reviver function, we simply return the
    // result.

    return typeof reviver === 'function' ? (function walk(holder, key) {
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
    }({'': result}, '')) : result;
};

},{}],4:[function(require,module,exports){
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
        return typeof c === 'string' ? c :
            '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
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
    
    // If the value has a toJSON method, call it to obtain a replacement value.
    if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
        value = value.toJSON(key);
    }
    
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
            
        case 'object':
            if (!value) return 'null';
            gap += indent;
            partial = [];
            
            // Array.isArray
            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }
                
                // Join all of the elements together, separated with commas, and
                // wrap them in brackets.
                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }
            
            // If the replacer is an array, use it to select the members to be
            // stringified.
            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }
            else {
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

        v = partial.length === 0 ? '{}' : gap ?
            '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
            '{' + partial.join(',') + '}';
        gap = mind;
        return v;
    }
}

module.exports = function (value, replacer, space) {
    var i;
    gap = '';
    indent = '';
    
    // If the space parameter is a number, make an indent string containing that
    // many spaces.
    if (typeof space === 'number') {
        for (i = 0; i < space; i += 1) {
            indent += ' ';
        }
    }
    // If the space parameter is a string, it will be used as the indent string.
    else if (typeof space === 'string') {
        indent = space;
    }

    // If there is a replacer, it must be a function or an array.
    // Otherwise, throw an error.
    rep = replacer;
    if (replacer && typeof replacer !== 'function'
    && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
        throw new Error('JSON.stringify');
    }
    
    // Make a fake root object containing our value under the key of ''.
    // Return the result of stringifying the value.
    return str('', {'': value});
};

},{}],5:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],6:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],7:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],8:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./support/isBuffer":7,"_process":5,"inherits":6}],9:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.vega = global.vega || {})));
}(this, (function (exports) { 'use strict';

/**
 * Parse an event selector string.
 * Returns an array of event stream definitions.
 */
var eventSelector = function(selector, source, marks) {
  DEFAULT_SOURCE = source || VIEW;
  MARKS = marks || DEFAULT_MARKS;
  return parseMerge(selector.trim()).map(parseSelector);
};

var VIEW    = 'view';
var LBRACK  = '[';
var RBRACK  = ']';
var LBRACE  = '{';
var RBRACE  = '}';
var COLON   = ':';
var COMMA   = ',';
var NAME    = '@';
var GT      = '>';
var ILLEGAL = /[[\]{}]/;
var DEFAULT_SOURCE;
var MARKS;
var DEFAULT_MARKS = {
      '*': 1,
      arc: 1,
      area: 1,
      group: 1,
      image: 1,
      line: 1,
      path: 1,
      rect: 1,
      rule: 1,
      shape: 1,
      symbol: 1,
      text: 1,
      trail: 1
    };

function isMarkType(type) {
  return MARKS.hasOwnProperty(type);
}

function find(s, i, endChar, pushChar, popChar) {
  var count = 0,
      n = s.length,
      c;
  for (; i<n; ++i) {
    c = s[i];
    if (!count && c === endChar) return i;
    else if (popChar && popChar.indexOf(c) >= 0) --count;
    else if (pushChar && pushChar.indexOf(c) >= 0) ++count;
  }
  return i;
}

function parseMerge(s) {
  var output = [],
      start = 0,
      n = s.length,
      i = 0;

  while (i < n) {
    i = find(s, i, COMMA, LBRACK + LBRACE, RBRACK + RBRACE);
    output.push(s.substring(start, i).trim());
    start = ++i;
  }

  if (output.length === 0) {
    throw 'Empty event selector: ' + s;
  }
  return output;
}

function parseSelector(s) {
  return s[0] === '['
    ? parseBetween(s)
    : parseStream(s);
}

function parseBetween(s) {
  var n = s.length,
      i = 1,
      b, stream;

  i = find(s, i, RBRACK, LBRACK, RBRACK);
  if (i === n) {
    throw 'Empty between selector: ' + s;
  }

  b = parseMerge(s.substring(1, i));
  if (b.length !== 2) {
    throw 'Between selector must have two elements: ' + s;
  }

  s = s.slice(i + 1).trim();
  if (s[0] !== GT) {
    throw 'Expected \'>\' after between selector: ' + s;
  }

  b = b.map(parseSelector);

  stream = parseSelector(s.slice(1).trim());
  if (stream.between) {
    return {
      between: b,
      stream: stream
    };
  } else {
    stream.between = b;
  }

  return stream;
}

function parseStream(s) {
  var stream = {source: DEFAULT_SOURCE},
      source = [],
      throttle = [0, 0],
      markname = 0,
      start = 0,
      n = s.length,
      i = 0, j,
      filter;

  // extract throttle from end
  if (s[n-1] === RBRACE) {
    i = s.lastIndexOf(LBRACE);
    if (i >= 0) {
      try {
        throttle = parseThrottle(s.substring(i+1, n-1));
      } catch (e) {
        throw 'Invalid throttle specification: ' + s;
      }
      s = s.slice(0, i).trim();
      n = s.length;
    } else throw 'Unmatched right brace: ' + s;
    i = 0;
  }

  if (!n) throw s;

  // set name flag based on first char
  if (s[0] === NAME) markname = ++i;

  // extract first part of multi-part stream selector
  j = find(s, i, COLON);
  if (j < n) {
    source.push(s.substring(start, j).trim());
    start = i = ++j;
  }

  // extract remaining part of stream selector
  i = find(s, i, LBRACK);
  if (i === n) {
    source.push(s.substring(start, n).trim());
  } else {
    source.push(s.substring(start, i).trim());
    filter = [];
    start = ++i;
    if (start === n) throw 'Unmatched left bracket: ' + s;
  }

  // extract filters
  while (i < n) {
    i = find(s, i, RBRACK);
    if (i === n) throw 'Unmatched left bracket: ' + s;
    filter.push(s.substring(start, i).trim());
    if (i < n-1 && s[++i] !== LBRACK) throw 'Expected left bracket: ' + s;
    start = ++i;
  }

  // marshall event stream specification
  if (!(n = source.length) || ILLEGAL.test(source[n-1])) {
    throw 'Invalid event selector: ' + s;
  }

  if (n > 1) {
    stream.type = source[1];
    if (markname) {
      stream.markname = source[0].slice(1);
    } else if (isMarkType(source[0])) {
      stream.marktype = source[0];
    } else {
      stream.source = source[0];
    }
  } else {
    stream.type = source[0];
  }
  if (stream.type.slice(-1) === '!') {
    stream.consume = true;
    stream.type = stream.type.slice(0, -1);
  }
  if (filter != null) stream.filter = filter;
  if (throttle[0]) stream.throttle = throttle[0];
  if (throttle[1]) stream.debounce = throttle[1];

  return stream;
}

function parseThrottle(s) {
  var a = s.split(COMMA);
  if (!s.length || a.length > 2) throw s;
  return a.map(function(_) {
    var x = +_;
    if (x !== x) throw s;
    return x;
  });
}

exports.selector = eventSelector;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],10:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.vega = global.vega || {})));
}(this, (function (exports) { 'use strict';

var accessor = function(fn, fields, name) {
  fn.fields = fields || [];
  fn.fname = name;
  return fn;
};

function accessorName(fn) {
  return fn == null ? null : fn.fname;
}

function accessorFields(fn) {
  return fn == null ? null : fn.fields;
}

var error = function(message) {
  throw Error(message);
};

var splitAccessPath = function(p) {
  var path = [],
      q = null,
      b = 0,
      n = p.length,
      s = '',
      i, j, c;

  p = p + '';

  function push() {
    path.push(s + p.substring(i, j));
    s = '';
    i = j + 1;
  }

  for (i=j=0; j<n; ++j) {
    c = p[j];
    if (c === '\\') {
      s += p.substring(i, j);
      i = ++j;
    } else if (c === q) {
      push();
      q = null;
      b = -1;
    } else if (q) {
      continue;
    } else if (i === b && c === '"') {
      i = j + 1;
      q = c;
    } else if (i === b && c === "'") {
      i = j + 1;
      q = c;
    } else if (c === '.' && !b) {
      if (j > i) {
        push();
      } else {
        i = j + 1;
      }
    } else if (c === '[') {
      if (j > i) push();
      b = i = j + 1;
    } else if (c === ']') {
      if (!b) error('Access path missing open bracket: ' + p);
      if (b > 0) push();
      b = 0;
      i = j + 1;
    }
  }

  if (b) error('Access path missing closing bracket: ' + p);
  if (q) error('Access path missing closing quote: ' + p);

  if (j > i) {
    j++;
    push();
  }

  return path;
};

var isArray = Array.isArray;

var isObject = function(_) {
  return _ === Object(_);
};

var isString = function(_) {
  return typeof _ === 'string';
};

function $(x) {
  return isArray(x) ? '[' + x.map($) + ']'
    : isObject(x) || isString(x) ?
      // Output valid JSON and JS source strings.
      // See http://timelessrepo.com/json-isnt-a-javascript-subset
      JSON.stringify(x).replace('\u2028','\\u2028').replace('\u2029', '\\u2029')
    : x;
}

var field = function(field, name) {
  var path = splitAccessPath(field),
      code = 'return _[' + path.map($).join('][') + '];';

  return accessor(
    Function('_', code),
    [(field = path.length===1 ? path[0] : field)],
    name || field
  );
};

var empty = [];

var id = field('id');

var identity = accessor(function(_) { return _; }, empty, 'identity');

var zero = accessor(function() { return 0; }, empty, 'zero');

var one = accessor(function() { return 1; }, empty, 'one');

var truthy = accessor(function() { return true; }, empty, 'true');

var falsy = accessor(function() { return false; }, empty, 'false');

function log(method, level, input) {
  var args = [level].concat([].slice.call(input));
  console[method].apply(console, args); // eslint-disable-line no-console
}

var None  = 0;
var Error$1 = 1;
var Warn  = 2;
var Info  = 3;
var Debug = 4;

var logger = function(_) {
  var level = _ || None;
  return {
    level: function(_) {
      if (arguments.length) {
        level = +_;
        return this;
      } else {
        return level;
      }
    },
    error: function() {
      if (level >= Error$1) log('error', 'ERROR', arguments);
      return this;
    },
    warn: function() {
      if (level >= Warn) log('warn', 'WARN', arguments);
      return this;
    },
    info: function() {
      if (level >= Info) log('log', 'INFO', arguments);
      return this;
    },
    debug: function() {
      if (level >= Debug) log('log', 'DEBUG', arguments);
      return this;
    }
  }
};

var peek = function(array) {
  return array[array.length - 1];
};

var toNumber = function(_) {
  return _ == null || _ === '' ? null : +_;
};

function exp(sign) {
  return function(x) { return sign * Math.exp(x); };
}

function log$1(sign) {
  return function(x) { return Math.log(sign * x); };
}

function pow(exponent) {
  return function(x) {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
  };
}

function pan(domain, delta, lift, ground) {
  var d0 = lift(domain[0]),
      d1 = lift(peek(domain)),
      dd = (d1 - d0) * delta;

  return [
    ground(d0 - dd),
    ground(d1 - dd)
  ];
}

function panLinear(domain, delta) {
  return pan(domain, delta, toNumber, identity);
}

function panLog(domain, delta) {
  var sign = Math.sign(domain[0]);
  return pan(domain, delta, log$1(sign), exp(sign));
}

function panPow(domain, delta, exponent) {
  return pan(domain, delta, pow(exponent), pow(1/exponent));
}

function zoom(domain, anchor, scale, lift, ground) {
  var d0 = lift(domain[0]),
      d1 = lift(peek(domain)),
      da = anchor != null ? lift(anchor) : (d0 + d1) / 2;

  return [
    ground(da + (d0 - da) * scale),
    ground(da + (d1 - da) * scale)
  ];
}

function zoomLinear(domain, anchor, scale) {
  return zoom(domain, anchor, scale, toNumber, identity);
}

function zoomLog(domain, anchor, scale) {
  var sign = Math.sign(domain[0]);
  return zoom(domain, anchor, scale, log$1(sign), exp(sign));
}

function zoomPow(domain, anchor, scale, exponent) {
  return zoom(domain, anchor, scale, pow(exponent), pow(1/exponent));
}

var array = function(_) {
  return _ != null ? (isArray(_) ? _ : [_]) : [];
};

var isFunction = function(_) {
  return typeof _ === 'function';
};

var compare = function(fields, orders) {
  var idx = [],
      cmp = (fields = array(fields)).map(function(f, i) {
        if (f == null) {
          return null;
        } else {
          idx.push(i);
          return isFunction(f) ? f
            : splitAccessPath(f).map($).join('][');
        }
      }),
      n = idx.length - 1,
      ord = array(orders),
      code = 'var u,v;return ',
      i, j, f, u, v, d, t, lt, gt;

  if (n < 0) return null;

  for (j=0; j<=n; ++j) {
    i = idx[j];
    f = cmp[i];

    if (isFunction(f)) {
      d = 'f' + i;
      u = '(u=this.' + d + '(a))';
      v = '(v=this.' + d + '(b))';
      (t = t || {})[d] = f;
    } else {
      u = '(u=a['+f+'])';
      v = '(v=b['+f+'])';
    }

    d = '((v=v instanceof Date?+v:v),(u=u instanceof Date?+u:u))';

    if (ord[i] !== 'descending') {
      gt = 1;
      lt = -1;
    } else {
      gt = -1;
      lt = 1;
    }

    code += '(' + u+'<'+v+'||u==null)&&v!=null?' + lt
      + ':(u>v||v==null)&&u!=null?' + gt
      + ':'+d+'!==u&&v===v?' + lt
      + ':v!==v&&u===u?' + gt
      + (i < n ? ':' : ':0');
  }

  f = Function('a', 'b', code + ';');
  if (t) f = f.bind(t);

  fields = fields.reduce(function(map, field) {
    if (isFunction(field)) {
      (accessorFields(field) || []).forEach(function(_) { map[_] = 1; });
    } else if (field != null) {
      map[field + ''] = 1;
    }
    return map;
  }, {});

  return accessor(f, Object.keys(fields));
};

var constant = function(_) {
  return isFunction(_) ? _ : function() { return _; };
};

var debounce = function(delay, handler) {
  var tid, evt;

  function callback() {
    handler(evt);
    tid = evt = null;
  }

  return function(e) {
    evt = e;
    if (tid) clearTimeout(tid);
    tid = setTimeout(callback, delay);
  };
};

var extend = function(_) {
  for (var x, k, i=1, len=arguments.length; i<len; ++i) {
    x = arguments[i];
    for (k in x) { _[k] = x[k]; }
  }
  return _;
};

var extentIndex = function(array, f) {
  var i = -1,
      n = array.length,
      a, b, c, u, v;

  if (f == null) {
    while (++i < n) {
      b = array[i];
      if (b != null && b >= b) {
        a = c = b;
        break;
      }
    }
    u = v = i;
    while (++i < n) {
      b = array[i];
      if (b != null) {
        if (a > b) {
          a = b;
          u = i;
        }
        if (c < b) {
          c = b;
          v = i;
        }
      }
    }
  } else {
    while (++i < n) {
      b = f(array[i], i, array);
      if (b != null && b >= b) {
        a = c = b;
        break;
      }
    }
    u = v = i;
    while (++i < n) {
      b = f(array[i], i, array);
      if (b != null) {
        if (a > b) {
          a = b;
          u = i;
        }
        if (c < b) {
          c = b;
          v = i;
        }
      }
    }
  }

  return [u, v];
};

var NULL = {};

var fastmap = function(input) {
  var obj = {},
      map,
      test;

  function has(key) {
    return obj.hasOwnProperty(key) && obj[key] !== NULL;
  }

  map = {
    size: 0,
    empty: 0,
    object: obj,
    has: has,
    get: function(key) {
      return has(key) ? obj[key] : undefined;
    },
    set: function(key, value) {
      if (!has(key)) {
        ++map.size;
        if (obj[key] === NULL) --map.empty;
      }
      obj[key] = value;
      return this;
    },
    delete: function(key) {
      if (has(key)) {
        --map.size;
        ++map.empty;
        obj[key] = NULL;
      }
      return this;
    },
    clear: function() {
      map.size = map.empty = 0;
      map.object = obj = {};
    },
    test: function(_) {
      if (arguments.length) {
        test = _;
        return map;
      } else {
        return test;
      }
    },
    clean: function() {
      var next = {},
          size = 0,
          key, value;
      for (key in obj) {
        value = obj[key];
        if (value !== NULL && (!test || !test(value))) {
          next[key] = value;
          ++size;
        }
      }
      map.size = size;
      map.empty = 0;
      map.object = (obj = next);
    }
  };

  if (input) Object.keys(input).forEach(function(key) {
    map.set(key, input[key]);
  });

  return map;
};

var inherits = function(child, parent) {
  var proto = (child.prototype = Object.create(parent.prototype));
  proto.constructor = child;
  return proto;
};

var isBoolean = function(_) {
  return typeof _ === 'boolean';
};

var isDate = function(_) {
  return Object.prototype.toString.call(_) === '[object Date]';
};

var isNumber = function(_) {
  return typeof _ === 'number';
};

var isRegExp = function(_) {
  return Object.prototype.toString.call(_) === '[object RegExp]';
};

var key = function(fields, flat) {
  if (fields) {
    fields = flat
      ? array(fields).map(function(f) { return f.replace(/\\(.)/g, '$1'); })
      : array(fields);
  }

  var fn = !(fields && fields.length)
    ? function() { return ''; }
    : Function('_', 'return \'\'+' +
        fields.map(function(f) {
          return '_[' + (flat
              ? $(f)
              : splitAccessPath(f).map($).join('][')
            ) + ']';
        }).join('+\'|\'+') + ';');

  return accessor(fn, fields, 'key');
};

var merge = function(compare, array0, array1, output) {
  var n0 = array0.length,
      n1 = array1.length;

  if (!n1) return array0;
  if (!n0) return array1;

  var merged = output || new array0.constructor(n0 + n1),
      i0 = 0, i1 = 0, i = 0;

  for (; i0<n0 && i1<n1; ++i) {
    merged[i] = compare(array0[i0], array1[i1]) > 0
       ? array1[i1++]
       : array0[i0++];
  }

  for (; i0<n0; ++i0, ++i) {
    merged[i] = array0[i0];
  }

  for (; i1<n1; ++i1, ++i) {
    merged[i] = array1[i1];
  }

  return merged;
};

var repeat = function(str, reps) {
  var s = '';
  while (--reps >= 0) s += str;
  return s;
};

var pad = function(str, length, padchar, align) {
  var c = padchar || ' ',
      s = str + '',
      n = length - s.length;

  return n <= 0 ? s
    : align === 'left' ? repeat(c, n) + s
    : align === 'center' ? repeat(c, ~~(n/2)) + s + repeat(c, Math.ceil(n/2))
    : s + repeat(c, n);
};

var toBoolean = function(_) {
  return _ == null || _ === '' ? null : !_ || _ === 'false' || _ === '0' ? false : !!_;
};

function defaultParser(_) {
  return isNumber(_) ? _ : isDate(_) ? _ : Date.parse(_);
}

var toDate = function(_, parser) {
  parser = parser || defaultParser;
  return _ == null || _ === '' ? null : parser(_);
};

var toString = function(_) {
  return _ == null || _ === '' ? null : _ + '';
};

var toSet = function(_) {
  for (var s={}, i=0, n=_.length; i<n; ++i) s[_[i]] = 1;
  return s;
};

var truncate = function(str, length, align, ellipsis) {
  var e = ellipsis != null ? ellipsis : '\u2026',
      s = str + '',
      n = s.length,
      l = Math.max(0, length - e.length);

  return n <= length ? s
    : align === 'left' ? e + s.slice(n - l)
    : align === 'center' ? s.slice(0, Math.ceil(l/2)) + e + s.slice(n - ~~(l/2))
    : s.slice(0, l) + e;
};

var visitArray = function(array, filter, visitor) {
  if (array) {
    var i = 0, n = array.length, t;
    if (filter) {
      for (; i<n; ++i) {
        if (t = filter(array[i])) visitor(t, i, array);
      }
    } else {
      array.forEach(visitor);
    }
  }
};

exports.accessor = accessor;
exports.accessorName = accessorName;
exports.accessorFields = accessorFields;
exports.id = id;
exports.identity = identity;
exports.zero = zero;
exports.one = one;
exports.truthy = truthy;
exports.falsy = falsy;
exports.logger = logger;
exports.None = None;
exports.Error = Error$1;
exports.Warn = Warn;
exports.Info = Info;
exports.Debug = Debug;
exports.panLinear = panLinear;
exports.panLog = panLog;
exports.panPow = panPow;
exports.zoomLinear = zoomLinear;
exports.zoomLog = zoomLog;
exports.zoomPow = zoomPow;
exports.array = array;
exports.compare = compare;
exports.constant = constant;
exports.debounce = debounce;
exports.error = error;
exports.extend = extend;
exports.extentIndex = extentIndex;
exports.fastmap = fastmap;
exports.field = field;
exports.inherits = inherits;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isDate = isDate;
exports.isFunction = isFunction;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isRegExp = isRegExp;
exports.isString = isString;
exports.key = key;
exports.merge = merge;
exports.pad = pad;
exports.peek = peek;
exports.repeat = repeat;
exports.splitAccessPath = splitAccessPath;
exports.stringValue = $;
exports.toBoolean = toBoolean;
exports.toDate = toDate;
exports.toNumber = toNumber;
exports.toString = toString;
exports.toSet = toSet;
exports.truncate = truncate;
exports.visitArray = visitArray;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],11:[function(require,module,exports){
module.exports={
  "name": "vega-lite",
  "author": "Jeffrey Heer, Dominik Moritz, Kanit \"Ham\" Wongsuphasawat",
  "version": "2.0.2",
  "collaborators": [
    "Kanit Wongsuphasawat <kanitw@gmail.com> (http://kanitw.yellowpigz.com)",
    "Dominik Moritz <domoritz@cs.washington.edu> (https://www.domoritz.de)",
    "Jeffrey Heer <jheer@uw.edu> (http://jheer.org)"
  ],
  "homepage": "https://vega.github.io/vega-lite/",
  "description": "Vega-lite provides a higher-level grammar for visual analysis, comparable to ggplot or Tableau, that generates complete Vega specifications.",
  "main": "build/src/index.js",
  "types": "typings/vega-lite.d.ts",
  "bin": {
    "vl2png": "./bin/vl2png",
    "vl2svg": "./bin/vl2svg",
    "vl2vg": "./bin/vl2vg"
  },
  "directories": {
    "test": "test"
  },
  "scripts": {
    "pretsc": "mkdir -p build && rm -rf build/*/** && cp package.json build/",
    "tsc": "tsc",
    "prebuild": "mkdir -p build/site build/test-gallery",
    "build": "npm run build:only",
    "build:only": "npm run tsc && cp package.json build && browserify src/index.ts -p tsify -d -s vl | exorcist build/vega-lite.js.map > build/vega-lite.js",
    "postbuild": "node node_modules/uglify-js/bin/uglifyjs build/vega-lite.js -cm --source-map content=build/vega-lite.js.map,filename=build/vega-lite.min.js.map -o build/vega-lite.min.js && npm run schema",
    "build:examples": "npm run data && npm run build:only && npm run build:examples-only",
    "build:examples-only": "npm run build:example && npm run build:examples-normalized",
    "build:examples-normalized": "rm -f examples/specs/normalized/*.vl.json && scripts/build-normalized-examples",
    "build:example": "TZ=America/Los_Angeles scripts/build-examples.sh",

    "build:toc": "bundle exec jekyll build -q && scripts/generate-toc",
    "build:site": "browserify site/static/main.ts -p [tsify -p site] -d | exorcist build/site/main.js.map > build/site/main.js",
    "build:versions": "scripts/update-version.sh",
    "build:test-gallery": "browserify test-gallery/main.ts -p [tsify -p test-gallery] -d > build/test-gallery/main.js",
    "check:examples": "scripts/check-examples.sh",
    "check:schema": "scripts/check-schema.sh",
    "clean": "rm -rf build && rm -f vega-lite.* & find -E src test site examples -regex '.*\\.(js|js.map|d.ts)' -delete && rm -f examples/compiled/*.png && find site/examples ! -name 'index.md' -type f -exec rm -f {} +",
    "data": "rsync -r node_modules/vega-datasets/data/* data",
    "link": "npm link && npm link vega-lite",

    "deploy": "scripts/deploy.sh",
    "deploy:gh": "scripts/deploy-gh.sh",
    "deploy:schema": "scripts/deploy-schema.sh",

    "prestart": "npm run data && npm run build && scripts/index-examples",
    "start": "nodemon -x 'npm run build:test-gallery' & browser-sync start --server --files 'build/test-gallery/main.js' --index 'test-gallery/index.html'",
    "poststart": "rm examples/all-examples.json",

    "preschema": "npm run prebuild",
    "schema": "ts-json-schema-generator --path tsconfig.json --type TopLevelExtendedSpec > build/vega-lite-schema.json && npm run renameschema && cp build/vega-lite-schema.json _data/",
    "renameschema": "scripts/rename-schema.sh",
    "presite": "npm run prebuild && npm run data && npm run build:site && npm run build:toc && npm run build:versions && scripts/create-example-pages",
    "site": "bundle exec jekyll serve --incremental",

    "lint": "tslint -p .",
    "test": "npm run build:only && npm run test:only && npm run test:runtime && npm run lint",
    "posttest": "npm run schema && npm run data && npm run mocha:examples",
    "test:nocompile": "npm run test:only && npm run test:runtime && npm run lint && npm run mocha:examples",
    "test:only": "nyc --reporter=html --reporter=text-summary npm run mocha:test",
    "test:runtime": "TZ=America/Los_Angeles wdio wdio.conf.js",
    "test:runtime:generate": "rm -Rf test-runtime/resources && VL_GENERATE_TESTS=true npm run test:runtime",
    "test:debug": "npm run tsc && mocha --recursive --debug-brk --inspect build/test",
    "test:debug-examples": "npm run tsc && npm run schema && mocha --recursive --debug-brk --inspect build/examples",
    "mocha:test": "mocha --require source-map-support/register --reporter dot --recursive build/test",
    "mocha:examples": "mocha --require source-map-support/register --reporter dot --recursive build/examples",

    "codecov": "nyc report --reporter=json && codecov -f coverage/*.json",
    "watch:build": "watchify src/index.ts -p tsify -v -d -s vl -o 'exorcist build/vega-lite.js.map > build/vega-lite.js'",
    "watch:tsc": "npm run tsc -- -w",
    "watch:test": "nodemon -x 'npm test'",
    "watch": "nodemon -x 'npm run build && npm run test:nocompile' # already ran schema in build"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/vega/vega-lite.git"
  },
  "license": "BSD-3-Clause",
  "bugs": {
    "url": "https://github.com/vega/vega-lite/issues"
  },
  "devDependencies": {
    "@types/chai": "^4.0.4",
    "@types/d3": "^4.11.0",
    "@types/highlight.js": "^9.1.10",
    "@types/json-stable-stringify": "^1.0.32",
    "@types/mkdirp": "^0.5.1",
    "@types/mocha": "^2.2.43",
    "@types/node": "^8.0.47",
    "@types/webdriverio": "^4.8.6",
    "ajv": "^5.3.0",
    "browser-sync": "^2.18.13",
    "browserify": "^14.5.0",
    "browserify-shim": "^3.8.14",
    "chai": "^4.1.2",
    "cheerio": "^1.0.0-rc.2",
    "chromedriver": "^2.33.2",
    "codecov": "^3.0.0",
    "d3": "^4.11.0",
    "exorcist": "^1.0.0",
    "highlight.js": "^9.12.0",
    "mkdirp": "^0.5.1",
    "mocha": "^4.0.1",
    "nodemon": "^1.12.1",
    "nyc": "^11.2.1",
    "source-map-support": "^0.5.0",
    "svg2png-many": "^0.0.7",
    "ts-json-schema-generator": "^0.16.0",
    "tslint": "5.4.3",
    "ts-node": "^3.3.0",
    "tsify": "^3.0.3",
    "tslint-eslint-rules": "^4.1.1",
    "typescript": "^2.6.1",
    "uglify-js": "^3.1.5",
    "vega": "^3.0.7",
    "vega-datasets": "^1.11.0",
    "vega-embed": "^3.0.0-rc7",
    "vega-tooltip": "^0.4.4",
    "watchify": "^3.9.0",
    "wdio-chromedriver-service": "^0.1.1",
    "wdio-dot-reporter": "0.0.9",
    "wdio-mocha-framework": "^0.5.11",
    "wdio-static-server-service": "^1.0.1",
    "webdriverio": "^4.8.0",
    "yaml-front-matter": "^3.4.0"
  },
  "dependencies": {
    "json-stable-stringify": "^1.0.1",
    "tslib": "^1.8.0",
    "vega-event-selector": "^2.0.0",
    "vega-util": "^1.6.2",
    "yargs": "^10.0.3"
  }
}

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var AGGREGATE_OP_INDEX = {
    values: 1,
    count: 1,
    valid: 1,
    missing: 1,
    distinct: 1,
    sum: 1,
    mean: 1,
    average: 1,
    variance: 1,
    variancep: 1,
    stdev: 1,
    stdevp: 1,
    median: 1,
    q1: 1,
    q3: 1,
    ci0: 1,
    ci1: 1,
    min: 1,
    max: 1,
    argmin: 1,
    argmax: 1,
};
exports.AGGREGATE_OPS = util_1.flagKeys(AGGREGATE_OP_INDEX);
function isAggregateOp(a) {
    return !!AGGREGATE_OP_INDEX[a];
}
exports.isAggregateOp = isAggregateOp;
exports.COUNTING_OPS = ['count', 'valid', 'missing', 'distinct'];
function isCountingAggregateOp(aggregate) {
    return aggregate && util_1.contains(exports.COUNTING_OPS, aggregate);
}
exports.isCountingAggregateOp = isCountingAggregateOp;
/** Additive-based aggregation operations.  These can be applied to stack. */
exports.SUM_OPS = [
    'count',
    'sum',
    'distinct',
    'valid',
    'missing'
];
/**
 * Aggregation operators that always produce values within the range [domainMin, domainMax].
 */
exports.SHARED_DOMAIN_OPS = [
    'mean',
    'average',
    'median',
    'q1',
    'q3',
    'min',
    'max',
];
exports.SHARED_DOMAIN_OP_INDEX = util_1.toSet(exports.SHARED_DOMAIN_OPS);

},{"./util":118}],13:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
/**
 * A dictionary listing whether a certain axis property is applicable for only main axes or only grid axes.
 * (Properties not listed are applicable for both)
 */
exports.AXIS_PROPERTY_TYPE = {
    grid: 'grid',
    labelOverlap: 'main',
    offset: 'main',
    title: 'main'
};
var COMMON_AXIS_PROPERTIES_INDEX = {
    orient: 1,
    domain: 1,
    format: 1,
    grid: 1,
    labelBound: 1,
    labelFlush: 1,
    labelPadding: 1,
    labels: 1,
    labelOverlap: 1,
    maxExtent: 1,
    minExtent: 1,
    offset: 1,
    position: 1,
    tickCount: 1,
    ticks: 1,
    tickSize: 1,
    title: 1,
    titlePadding: 1,
    values: 1,
    zindex: 1,
};
var AXIS_PROPERTIES_INDEX = __assign({}, COMMON_AXIS_PROPERTIES_INDEX, { encoding: 1, labelAngle: 1, titleMaxLength: 1 });
var VG_AXIS_PROPERTIES_INDEX = __assign({ scale: 1 }, COMMON_AXIS_PROPERTIES_INDEX, { gridScale: 1, encode: 1 });
function isAxisProperty(prop) {
    return !!AXIS_PROPERTIES_INDEX[prop];
}
exports.isAxisProperty = isAxisProperty;
exports.VG_AXIS_PROPERTIES = util_1.flagKeys(VG_AXIS_PROPERTIES_INDEX);
// Export for dependent projects
exports.AXIS_PROPERTIES = util_1.flagKeys(AXIS_PROPERTIES_INDEX);

},{"./util":118}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("./channel");
var util_1 = require("./util");
function binToString(bin) {
    if (util_1.isBoolean(bin)) {
        return 'bin';
    }
    return 'bin' + util_1.keys(bin).map(function (p) { return ("_" + p + "_" + bin[p]).replace(',', '_'); }).join('');
}
exports.binToString = binToString;
function autoMaxBins(channel) {
    switch (channel) {
        case channel_1.ROW:
        case channel_1.COLUMN:
        case channel_1.SIZE:
        case channel_1.COLOR:
        case channel_1.OPACITY:
        // Facets and Size shouldn't have too many bins
        // We choose 6 like shape to simplify the rule
        case channel_1.SHAPE:
            return 6; // Vega's "shape" has 6 distinct values
        default:
            return 10;
    }
}
exports.autoMaxBins = autoMaxBins;

},{"./channel":15,"./util":118}],15:[function(require,module,exports){
"use strict";
/*
 * Constants and utilities for encoding channels (Visual variables)
 * such as 'x', 'y', 'color'.
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var Channel;
(function (Channel) {
    // Facet
    Channel.ROW = 'row';
    Channel.COLUMN = 'column';
    // Position
    Channel.X = 'x';
    Channel.Y = 'y';
    Channel.X2 = 'x2';
    Channel.Y2 = 'y2';
    // Mark property with scale
    Channel.COLOR = 'color';
    Channel.SHAPE = 'shape';
    Channel.SIZE = 'size';
    Channel.OPACITY = 'opacity';
    // Non-scale channel
    Channel.TEXT = 'text';
    Channel.ORDER = 'order';
    Channel.DETAIL = 'detail';
    Channel.TOOLTIP = 'tooltip';
})(Channel = exports.Channel || (exports.Channel = {}));
exports.X = Channel.X;
exports.Y = Channel.Y;
exports.X2 = Channel.X2;
exports.Y2 = Channel.Y2;
exports.ROW = Channel.ROW;
exports.COLUMN = Channel.COLUMN;
exports.SHAPE = Channel.SHAPE;
exports.SIZE = Channel.SIZE;
exports.COLOR = Channel.COLOR;
exports.TEXT = Channel.TEXT;
exports.DETAIL = Channel.DETAIL;
exports.ORDER = Channel.ORDER;
exports.OPACITY = Channel.OPACITY;
exports.TOOLTIP = Channel.TOOLTIP;
var UNIT_CHANNEL_INDEX = {
    x: 1,
    y: 1,
    x2: 1,
    y2: 1,
    size: 1,
    shape: 1,
    color: 1,
    order: 1,
    opacity: 1,
    text: 1,
    detail: 1,
    tooltip: 1
};
var FACET_CHANNEL_INDEX = {
    row: 1,
    column: 1
};
var CHANNEL_INDEX = __assign({}, UNIT_CHANNEL_INDEX, FACET_CHANNEL_INDEX);
exports.CHANNELS = util_1.flagKeys(CHANNEL_INDEX);
var _o = CHANNEL_INDEX.order, _d = CHANNEL_INDEX.detail, SINGLE_DEF_CHANNEL_INDEX = __rest(CHANNEL_INDEX, ["order", "detail"]);
/**
 * Channels that cannot have an array of channelDef.
 * model.fieldDef, getFieldDef only work for these channels.
 *
 * (The only two channels that can have an array of channelDefs are "detail" and "order".
 * Since there can be multiple fieldDefs for detail and order, getFieldDef/model.fieldDef
 * are not applicable for them.  Similarly, selection projecttion won't work with "detail" and "order".)
 */
exports.SINGLE_DEF_CHANNELS = util_1.flagKeys(SINGLE_DEF_CHANNEL_INDEX);
function isChannel(str) {
    return !!CHANNEL_INDEX[str];
}
exports.isChannel = isChannel;
// CHANNELS without COLUMN, ROW
exports.UNIT_CHANNELS = util_1.flagKeys(UNIT_CHANNEL_INDEX);
// NONPOSITION_CHANNELS = UNIT_CHANNELS without X, Y, X2, Y2;
var _x = UNIT_CHANNEL_INDEX.x, _y = UNIT_CHANNEL_INDEX.y, 
// x2 and y2 share the same scale as x and y
_x2 = UNIT_CHANNEL_INDEX.x2, _y2 = UNIT_CHANNEL_INDEX.y2, 
// The rest of unit channels then have scale
NONPOSITION_CHANNEL_INDEX = __rest(UNIT_CHANNEL_INDEX, ["x", "y", "x2", "y2"]);
exports.NONPOSITION_CHANNELS = util_1.flagKeys(NONPOSITION_CHANNEL_INDEX);
// POSITION_SCALE_CHANNELS = X and Y;
var POSITION_SCALE_CHANNEL_INDEX = { x: 1, y: 1 };
exports.POSITION_SCALE_CHANNELS = util_1.flagKeys(POSITION_SCALE_CHANNEL_INDEX);
// NON_POSITION_SCALE_CHANNEL = SCALE_CHANNELS without X, Y
var 
// x2 and y2 share the same scale as x and y
// text and tooltip has format instead of scale
_t = NONPOSITION_CHANNEL_INDEX.text, _tt = NONPOSITION_CHANNEL_INDEX.tooltip, 
// detail and order have no scale
_dd = NONPOSITION_CHANNEL_INDEX.detail, _oo = NONPOSITION_CHANNEL_INDEX.order, NONPOSITION_SCALE_CHANNEL_INDEX = __rest(NONPOSITION_CHANNEL_INDEX, ["text", "tooltip", "detail", "order"]);
exports.NONPOSITION_SCALE_CHANNELS = util_1.flagKeys(NONPOSITION_SCALE_CHANNEL_INDEX);
// Declare SCALE_CHANNEL_INDEX
var SCALE_CHANNEL_INDEX = __assign({}, POSITION_SCALE_CHANNEL_INDEX, NONPOSITION_SCALE_CHANNEL_INDEX);
/** List of channels with scales */
exports.SCALE_CHANNELS = util_1.flagKeys(SCALE_CHANNEL_INDEX);
function isScaleChannel(channel) {
    return !!SCALE_CHANNEL_INDEX[channel];
}
exports.isScaleChannel = isScaleChannel;
/**
 * Return whether a channel supports a particular mark type.
 * @param channel  channel name
 * @param mark the mark type
 * @return whether the mark supports the channel
 */
function supportMark(channel, mark) {
    return mark in getSupportedMark(channel);
}
exports.supportMark = supportMark;
/**
 * Return a dictionary showing whether a channel supports mark type.
 * @param channel
 * @return A dictionary mapping mark types to boolean values.
 */
function getSupportedMark(channel) {
    switch (channel) {
        case exports.X:
        case exports.Y:
        case exports.COLOR:
        case exports.DETAIL:
        case exports.TOOLTIP:
        case exports.ORDER: // TODO: revise (order might not support rect, which is not stackable?)
        case exports.OPACITY:
        case exports.ROW:
        case exports.COLUMN:
            return {
                point: true, tick: true, rule: true, circle: true, square: true,
                bar: true, rect: true, line: true, area: true, text: true
            };
        case exports.X2:
        case exports.Y2:
            return {
                rule: true, bar: true, rect: true, area: true
            };
        case exports.SIZE:
            return {
                point: true, tick: true, rule: true, circle: true, square: true,
                bar: true, text: true, line: true
            };
        case exports.SHAPE:
            return { point: true };
        case exports.TEXT:
            return { text: true };
    }
}
exports.getSupportedMark = getSupportedMark;
function rangeType(channel) {
    switch (channel) {
        case exports.X:
        case exports.Y:
        case exports.SIZE:
        case exports.OPACITY:
        // X2 and Y2 use X and Y scales, so they similarly have continuous range.
        case exports.X2:
        case exports.Y2:
            return 'continuous';
        case exports.ROW:
        case exports.COLUMN:
        case exports.SHAPE:
        // TEXT and TOOLTIP have no scale but have discrete output
        case exports.TEXT:
        case exports.TOOLTIP:
            return 'discrete';
        // Color can be either continuous or discrete, depending on scale type.
        case exports.COLOR:
            return 'flexible';
        // No scale, no range type.
        case exports.DETAIL:
        case exports.ORDER:
            return undefined;
    }
    /* istanbul ignore next: should never reach here. */
    throw new Error('getSupportedRole not implemented for ' + channel);
}
exports.rangeType = rangeType;

},{"./util":118}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mainAxisReducer = getAxisReducer('main');
var gridAxisReducer = getAxisReducer('grid');
function getAxisReducer(axisType) {
    return function (axes, axis) {
        if (axis[axisType]) {
            // Need to cast here so it's not longer partial type.
            axes.push(axis[axisType].combine());
        }
        return axes;
    };
}
function assembleAxes(axisComponents) {
    return [].concat(axisComponents.x ? [].concat(axisComponents.x.reduce(mainAxisReducer, []), axisComponents.x.reduce(gridAxisReducer, [])) : [], axisComponents.y ? [].concat(axisComponents.y.reduce(mainAxisReducer, []), axisComponents.y.reduce(gridAxisReducer, [])) : []);
}
exports.assembleAxes = assembleAxes;

},{}],17:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var split_1 = require("../split");
var AxisComponentPart = /** @class */ (function (_super) {
    __extends(AxisComponentPart, _super);
    function AxisComponentPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AxisComponentPart;
}(split_1.Split));
exports.AxisComponentPart = AxisComponentPart;

},{"../split":89}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAxisConfig(property, config, channel, orient, scaleType) {
    if (orient === void 0) { orient = ''; }
    // configTypes to loop, starting from higher precedence
    var configTypes = (scaleType === 'band' ? ['axisBand'] : []).concat([
        channel === 'x' ? 'axisX' : 'axisY',
        'axis' + orient.substr(0, 1).toUpperCase() + orient.substr(1),
        'axis'
    ]);
    for (var _i = 0, configTypes_1 = configTypes; _i < configTypes_1.length; _i++) {
        var configType = configTypes_1[_i];
        if (config[configType] && config[configType][property] !== undefined) {
            return config[configType][property];
        }
    }
    return undefined;
}
exports.getAxisConfig = getAxisConfig;

},{}],19:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var scale_1 = require("../../scale");
var type_1 = require("../../type");
var util_1 = require("../../util");
var common_1 = require("../common");
var config_1 = require("./config");
function labels(model, channel, specifiedLabelsSpec, orient) {
    var fieldDef = model.fieldDef(channel) ||
        (channel === 'x' ? model.fieldDef('x2') :
            channel === 'y' ? model.fieldDef('y2') :
                undefined);
    var axis = model.axis(channel);
    var config = model.config;
    var labelsSpec = {};
    // Text
    if (fielddef_1.isTimeFieldDef(fieldDef)) {
        var isUTCScale = model.getScaleComponent(channel).get('type') === scale_1.ScaleType.UTC;
        labelsSpec.text = {
            signal: common_1.timeFormatExpression('datum.value', fieldDef.timeUnit, axis.format, config.axis.shortTimeLabels, config.timeFormat, isUTCScale)
        };
    }
    // Label Angle
    var angle = config_1.getAxisConfig('labelAngle', model.config, channel, orient, model.getScaleComponent(channel).get('type'));
    if (angle === undefined) {
        angle = labelAngle(axis, channel, fieldDef);
        if (angle) {
            labelsSpec.angle = { value: angle };
        }
    }
    if (angle !== undefined && channel === 'x') {
        var align = labelAlign(angle, orient);
        if (align) {
            labelsSpec.align = { value: align };
        }
        // Auto set baseline if x is rotated by 90, or -90
        if (util_1.contains([90, 270], angle)) {
            labelsSpec.baseline = { value: 'middle' };
        }
    }
    labelsSpec = __assign({}, labelsSpec, specifiedLabelsSpec);
    return util_1.keys(labelsSpec).length === 0 ? undefined : labelsSpec;
}
exports.labels = labels;
function labelAngle(axis, channel, fieldDef) {
    if (axis.labelAngle !== undefined) {
        // Make angle within [0,360)
        return ((axis.labelAngle % 360) + 360) % 360;
    }
    else {
        if (channel === channel_1.X && util_1.contains([type_1.NOMINAL, type_1.ORDINAL], fieldDef.type)) {
            return 270;
        }
    }
    return undefined;
}
exports.labelAngle = labelAngle;
function labelAlign(angle, orient) {
    if (angle > 0) {
        if (angle % 360 > 180) {
            return orient === 'top' ? 'left' : 'right';
        }
        else if (angle % 360 < 180) {
            return orient === 'top' ? 'right' : 'left';
        }
    }
    else if (angle < 0) {
        return labelAlign((angle % 360) + 360 /* convert to positive value*/, orient);
    }
    return undefined;
}
exports.labelAlign = labelAlign;

},{"../../channel":15,"../../fielddef":100,"../../scale":108,"../../type":117,"../../util":118,"../common":24,"./config":18}],20:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var axis_1 = require("../../axis");
var channel_1 = require("../../channel");
var util_1 = require("../../util");
var common_1 = require("../common");
var resolve_1 = require("../resolve");
var split_1 = require("../split");
var component_1 = require("./component");
var config_1 = require("./config");
var encode = require("./encode");
var properties = require("./properties");
var AXIS_PARTS = ['domain', 'grid', 'labels', 'ticks', 'title'];
function parseUnitAxis(model) {
    return channel_1.POSITION_SCALE_CHANNELS.reduce(function (axis, channel) {
        if (model.axis(channel)) {
            var axisComponent = {};
            // TODO: support multiple axis
            var main = parseMainAxis(channel, model);
            if (main && isVisibleAxis(main)) {
                axisComponent.main = main;
            }
            var grid = parseGridAxis(channel, model);
            if (grid && isVisibleAxis(grid)) {
                axisComponent.grid = grid;
            }
            axis[channel] = [axisComponent];
        }
        return axis;
    }, {});
}
exports.parseUnitAxis = parseUnitAxis;
var OPPOSITE_ORIENT = {
    bottom: 'top',
    top: 'bottom',
    left: 'right',
    right: 'left'
};
function parseLayerAxis(model) {
    var _a = model.component, axes = _a.axes, resolve = _a.resolve;
    var axisCount = { top: 0, bottom: 0, right: 0, left: 0 };
    for (var _i = 0, _b = model.children; _i < _b.length; _i++) {
        var child = _b[_i];
        child.parseAxisAndHeader();
        for (var _c = 0, _d = util_1.keys(child.component.axes); _c < _d.length; _c++) {
            var channel = _d[_c];
            resolve.axis[channel] = resolve_1.parseGuideResolve(model.component.resolve, channel);
            if (resolve.axis[channel] === 'shared') {
                // If the resolve says shared (and has not been overridden)
                // We will try to merge and see if there is a conflict
                axes[channel] = mergeAxisComponents(axes[channel], child.component.axes[channel]);
                if (!axes[channel]) {
                    // If merge returns nothing, there is a conflict so we cannot make the axis shared.
                    // Thus, mark axis as independent and remove the axis component.
                    resolve.axis[channel] = 'independent';
                    delete axes[channel];
                }
            }
        }
    }
    // Move axes to layer's axis component and merge shared axes
    for (var _e = 0, _f = ['x', 'y']; _e < _f.length; _e++) {
        var channel = _f[_e];
        for (var _g = 0, _h = model.children; _g < _h.length; _g++) {
            var child = _h[_g];
            if (!child.component.axes[channel]) {
                // skip if the child does not have a particular axis
                continue;
            }
            if (resolve.axis[channel] === 'independent') {
                // If axes are independent, concat the axisComponent array.
                axes[channel] = (axes[channel] || []).concat(child.component.axes[channel]);
                // Automatically adjust orient
                for (var _j = 0, _k = child.component.axes[channel]; _j < _k.length; _j++) {
                    var axisComponent = _k[_j];
                    var _l = axisComponent.main.getWithExplicit('orient'), orient = _l.value, explicit = _l.explicit;
                    if (axisCount[orient] > 0 && !explicit) {
                        // Change axis orient if the number do not match
                        var oppositeOrient = OPPOSITE_ORIENT[orient];
                        if (axisCount[orient] > axisCount[oppositeOrient]) {
                            axisComponent.main.set('orient', oppositeOrient, false);
                        }
                    }
                    axisCount[orient]++;
                    // TODO(https://github.com/vega/vega-lite/issues/2634): automaticaly add extra offset?
                }
            }
            // After merging, make sure to remove axes from child
            delete child.component.axes[channel];
        }
    }
}
exports.parseLayerAxis = parseLayerAxis;
function mergeAxisComponents(mergedAxisCmpts, childAxisCmpts) {
    if (mergedAxisCmpts) {
        if (mergedAxisCmpts.length !== childAxisCmpts.length) {
            return undefined; // Cannot merge axis component with different number of axes.
        }
        var length_1 = mergedAxisCmpts.length;
        for (var i = 0; i < length_1; i++) {
            var mergedMain = mergedAxisCmpts[i].main;
            var childMain = childAxisCmpts[i].main;
            if ((!!mergedMain) !== (!!childMain)) {
                return undefined;
            }
            else if (mergedMain && childMain) {
                var mergedOrient = mergedMain.getWithExplicit('orient');
                var childOrient = childMain.getWithExplicit('orient');
                if (mergedOrient.explicit && childOrient.explicit && mergedOrient.value !== childOrient.value) {
                    // TODO: throw warning if resolve is explicit (We don't have info about explicit/implicit resolve yet.)
                    // Cannot merge due to inconsistent orient
                    return undefined;
                }
                else {
                    mergedAxisCmpts[i].main = mergeAxisComponentPart(mergedMain, childMain);
                }
            }
            var mergedGrid = mergedAxisCmpts[i].grid;
            var childGrid = childAxisCmpts[i].grid;
            if ((!!mergedGrid) !== (!!childGrid)) {
                return undefined;
            }
            else if (mergedGrid && childGrid) {
                mergedAxisCmpts[i].grid = mergeAxisComponentPart(mergedGrid, childGrid);
            }
        }
    }
    else {
        // For first one, return a copy of the child
        return childAxisCmpts.map(function (axisComponent) { return (__assign({}, (axisComponent.main ? { main: axisComponent.main.clone() } : {}), (axisComponent.grid ? { grid: axisComponent.grid.clone() } : {}))); });
    }
    return mergedAxisCmpts;
}
function mergeAxisComponentPart(merged, child) {
    var _loop_1 = function (prop) {
        var mergedValueWithExplicit = split_1.mergeValuesWithExplicit(merged.getWithExplicit(prop), child.getWithExplicit(prop), prop, 'axis', 
        // Tie breaker function
        function (v1, v2) {
            switch (prop) {
                case 'title':
                    return common_1.titleMerger(v1, v2);
                case 'gridScale':
                    return {
                        explicit: v1.explicit,
                        value: v1.value || v2.value
                    };
            }
            return split_1.defaultTieBreaker(v1, v2, prop, 'axis');
        });
        merged.setWithExplicit(prop, mergedValueWithExplicit);
    };
    for (var _i = 0, VG_AXIS_PROPERTIES_1 = axis_1.VG_AXIS_PROPERTIES; _i < VG_AXIS_PROPERTIES_1.length; _i++) {
        var prop = VG_AXIS_PROPERTIES_1[_i];
        _loop_1(prop);
    }
    return merged;
}
function isFalseOrNull(v) {
    return v === false || v === null;
}
/**
 * Return if an axis is visible (shows at least one part of the axis).
 */
function isVisibleAxis(axis) {
    return util_1.some(AXIS_PARTS, function (part) { return hasAxisPart(axis, part); });
}
function hasAxisPart(axis, part) {
    // FIXME(https://github.com/vega/vega-lite/issues/2552) this method can be wrong if users use a Vega theme.
    if (part === 'axis') {
        return true;
    }
    if (part === 'grid' || part === 'title') {
        return !!axis.get(part);
    }
    // Other parts are enabled by default, so they should not be false or null.
    return !isFalseOrNull(axis.get(part));
}
/**
 * Make an inner axis for showing grid for shared axis.
 */
function parseGridAxis(channel, model) {
    // FIXME: support adding ticks for grid axis that are inner axes of faceted plots.
    return parseAxis(channel, model, true);
}
exports.parseGridAxis = parseGridAxis;
function parseMainAxis(channel, model) {
    return parseAxis(channel, model, false);
}
exports.parseMainAxis = parseMainAxis;
function parseAxis(channel, model, isGridAxis) {
    var axis = model.axis(channel);
    var axisComponent = new component_1.AxisComponentPart();
    // 1.2. Add properties
    axis_1.VG_AXIS_PROPERTIES.forEach(function (property) {
        var value = getProperty(property, axis, channel, model, isGridAxis);
        if (value !== undefined) {
            var explicit = 
            // specified axis.values is already respected, but may get transformed.
            property === 'values' ? !!axis.values :
                // both VL axis.encoding and axis.labelAngle affect VG axis.encode
                property === 'encode' ? !!axis.encoding || !!axis.labelAngle :
                    value === axis[property];
            var configValue = config_1.getAxisConfig(property, model.config, channel, axisComponent.get('orient'), model.getScaleComponent(channel).get('type'));
            if (explicit || configValue === undefined ||
                // A lot of rules need to be applied for the grid axis
                // FIXME: this is not perfectly correct, but we need to rewrite axis component to have one axis and separate them later during assembly anyway.
                isGridAxis) {
                // Do not apply implicit rule if there is a config value
                axisComponent.set(property, value, explicit);
            }
        }
    });
    // 2) Add guide encode definition groups
    var axisEncoding = axis.encoding || {};
    var axisEncode = AXIS_PARTS.reduce(function (e, part) {
        if (!hasAxisPart(axisComponent, part)) {
            // No need to create encode for a disabled part.
            return e;
        }
        var value = part === 'labels' ?
            encode.labels(model, channel, axisEncoding.labels || {}, axisComponent.get('orient')) :
            axisEncoding[part] || {};
        if (value !== undefined && util_1.keys(value).length > 0) {
            e[part] = { update: value };
        }
        return e;
    }, {});
    // FIXME: By having encode as one property, we won't have fine grained encode merging.
    if (util_1.keys(axisEncode).length > 0) {
        axisComponent.set('encode', axisEncode, !!axis.encoding || !!axis.labelAngle);
    }
    return axisComponent;
}
function getProperty(property, specifiedAxis, channel, model, isGridAxis) {
    var fieldDef = model.fieldDef(channel);
    if ((isGridAxis && axis_1.AXIS_PROPERTY_TYPE[property] === 'main') ||
        (!isGridAxis && axis_1.AXIS_PROPERTY_TYPE[property] === 'grid')) {
        // Do not apply unapplicable properties
        return undefined;
    }
    switch (property) {
        case 'scale':
            return model.scaleName(channel);
        case 'gridScale':
            return properties.gridScale(model, channel, isGridAxis);
        case 'domain':
            return properties.domain(property, specifiedAxis, isGridAxis, channel);
        case 'format':
            // We don't include temporal field here as we apply format in encode block
            return common_1.numberFormat(fieldDef, specifiedAxis.format, model.config);
        case 'grid': {
            var scaleType = model.getScaleComponent(channel).get('type');
            return common_1.getSpecifiedOrDefaultValue(specifiedAxis.grid, properties.grid(scaleType, fieldDef));
        }
        case 'labels':
            return isGridAxis ? false : specifiedAxis.labels;
        case 'labelFlush':
            return properties.labelFlush(fieldDef, channel, specifiedAxis, isGridAxis);
        case 'labelOverlap': {
            var scaleType = model.getScaleComponent(channel).get('type');
            return properties.labelOverlap(fieldDef, specifiedAxis, channel, scaleType);
        }
        case 'minExtent': {
            return properties.minMaxExtent(specifiedAxis.minExtent, isGridAxis);
        }
        case 'maxExtent': {
            return properties.minMaxExtent(specifiedAxis.maxExtent, isGridAxis);
        }
        case 'orient':
            return common_1.getSpecifiedOrDefaultValue(specifiedAxis.orient, properties.orient(channel));
        case 'tickCount': {
            var scaleType = model.getScaleComponent(channel).get('type');
            var sizeType = channel === 'x' ? 'width' : channel === 'y' ? 'height' : undefined;
            var size = sizeType ? model.getSizeSignalRef(sizeType)
                : undefined;
            return common_1.getSpecifiedOrDefaultValue(specifiedAxis.tickCount, properties.tickCount(channel, fieldDef, scaleType, size));
        }
        case 'ticks':
            return properties.ticks(property, specifiedAxis, isGridAxis, channel);
        case 'title':
            return common_1.getSpecifiedOrDefaultValue(specifiedAxis.title, properties.title(specifiedAxis.titleMaxLength, fieldDef, model.config));
        case 'values':
            return properties.values(specifiedAxis, model, fieldDef);
        case 'zindex':
            return common_1.getSpecifiedOrDefaultValue(specifiedAxis.zindex, properties.zindex(isGridAxis));
    }
    // Otherwise, return specified property.
    return axis_1.isAxisProperty(property) ? specifiedAxis[property] : undefined;
}

},{"../../axis":13,"../../channel":15,"../../util":118,"../common":24,"../resolve":69,"../split":89,"./component":17,"./config":18,"./encode":19,"./properties":21}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bin_1 = require("../../bin");
var channel_1 = require("../../channel");
var datetime_1 = require("../../datetime");
var fielddef_1 = require("../../fielddef");
var log = require("../../log");
var scale_1 = require("../../scale");
var type_1 = require("../../type");
var util_1 = require("../../util");
function domainAndTicks(property, specifiedAxis, isGridAxis, channel) {
    if (isGridAxis) {
        return false;
    }
    return specifiedAxis[property];
}
exports.domainAndTicks = domainAndTicks;
exports.domain = domainAndTicks;
exports.ticks = domainAndTicks;
// TODO: we need to refactor this method after we take care of config refactoring
/**
 * Default rules for whether to show a grid should be shown for a channel.
 * If `grid` is unspecified, the default value is `true` for ordinal scales that are not binned
 */
function grid(scaleType, fieldDef) {
    return !scale_1.hasDiscreteDomain(scaleType) && !fieldDef.bin;
}
exports.grid = grid;
function gridScale(model, channel, isGridAxis) {
    if (isGridAxis) {
        var gridChannel = channel === 'x' ? 'y' : 'x';
        if (model.getScaleComponent(gridChannel)) {
            return model.scaleName(gridChannel);
        }
    }
    return undefined;
}
exports.gridScale = gridScale;
function labelFlush(fieldDef, channel, specifiedAxis, isGridAxis) {
    if (isGridAxis) {
        return undefined;
    }
    if (specifiedAxis.labelFlush !== undefined) {
        return specifiedAxis.labelFlush;
    }
    if (channel === 'x' && util_1.contains(['quantitative', 'temporal'], fieldDef.type)) {
        return true;
    }
    return undefined;
}
exports.labelFlush = labelFlush;
function labelOverlap(fieldDef, specifiedAxis, channel, scaleType) {
    if (specifiedAxis.labelOverlap !== undefined) {
        return specifiedAxis.labelOverlap;
    }
    // do not prevent overlap for nominal data because there is no way to infer what the missing labels are
    if (fieldDef.type !== 'nominal') {
        if (scaleType === 'log') {
            return 'greedy';
        }
        return true;
    }
    return undefined;
}
exports.labelOverlap = labelOverlap;
function minMaxExtent(specifiedExtent, isGridAxis) {
    if (isGridAxis) {
        // Always return 0 to make sure that `config.axis*.minExtent` and `config.axis*.maxExtent`
        // would not affect gridAxis
        return 0;
    }
    else {
        return specifiedExtent;
    }
}
exports.minMaxExtent = minMaxExtent;
function orient(channel) {
    switch (channel) {
        case channel_1.X:
            return 'bottom';
        case channel_1.Y:
            return 'left';
    }
    /* istanbul ignore next: This should never happen. */
    throw new Error(log.message.INVALID_CHANNEL_FOR_AXIS);
}
exports.orient = orient;
function tickCount(channel, fieldDef, scaleType, size) {
    if (!scale_1.hasDiscreteDomain(scaleType) && scaleType !== 'log' && !util_1.contains(['month', 'hours', 'day', 'quarter'], fieldDef.timeUnit)) {
        if (fieldDef.bin) {
            // for binned data, we don't want more ticks than maxbins
            return { signal: "ceil(" + size.signal + "/20)" };
        }
        return { signal: "ceil(" + size.signal + "/40)" };
    }
    return undefined;
}
exports.tickCount = tickCount;
function title(maxLength, fieldDef, config) {
    // if not defined, automatically determine axis title from field def
    var fieldTitle = fielddef_1.title(fieldDef, config);
    return maxLength ? util_1.truncate(fieldTitle, maxLength) : fieldTitle;
}
exports.title = title;
function values(specifiedAxis, model, fieldDef) {
    var vals = specifiedAxis.values;
    if (specifiedAxis.values && datetime_1.isDateTime(vals[0])) {
        return vals.map(function (dt) {
            // normalize = true as end user won't put 0 = January
            return { signal: datetime_1.dateTimeExpr(dt, true) };
        });
    }
    if (!vals && fieldDef.bin && fieldDef.type === type_1.QUANTITATIVE) {
        var signal = model.getName(bin_1.binToString(fieldDef.bin) + "_" + fieldDef.field + "_bins");
        return { signal: "sequence(" + signal + ".start, " + signal + ".stop + " + signal + ".step, " + signal + ".step)" };
    }
    return vals;
}
exports.values = values;
function zindex(isGridAxis) {
    if (isGridAxis) {
        // if grid is true, need to put layer on the back so that grid is behind marks
        return 0;
    }
    return 1; // otherwise return undefined and use Vega's default.
}
exports.zindex = zindex;

},{"../../bin":14,"../../channel":15,"../../datetime":97,"../../fielddef":100,"../../log":105,"../../scale":108,"../../type":117,"../../util":118}],22:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var parse_1 = require("./data/parse");
var assemble_1 = require("./layoutsize/assemble");
var model_1 = require("./model");
var BaseConcatModel = /** @class */ (function (_super) {
    __extends(BaseConcatModel, _super);
    function BaseConcatModel(spec, parent, parentGivenName, config, resolve) {
        return _super.call(this, spec, parent, parentGivenName, config, resolve) || this;
    }
    BaseConcatModel.prototype.parseData = function () {
        this.component.data = parse_1.parseData(this);
        this.children.forEach(function (child) {
            child.parseData();
        });
    };
    BaseConcatModel.prototype.parseSelection = function () {
        var _this = this;
        // Merge selections up the hierarchy so that they may be referenced
        // across unit specs. Persist their definitions within each child
        // to assemble signals which remain within output Vega unit groups.
        this.component.selection = {};
        var _loop_1 = function (child) {
            child.parseSelection();
            util_1.keys(child.component.selection).forEach(function (key) {
                _this.component.selection[key] = child.component.selection[key];
            });
        };
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            _loop_1(child);
        }
    };
    BaseConcatModel.prototype.parseMarkGroup = function () {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.parseMarkGroup();
        }
    };
    BaseConcatModel.prototype.parseAxisAndHeader = function () {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.parseAxisAndHeader();
        }
        // TODO(#2415): support shared axes
    };
    BaseConcatModel.prototype.assembleSelectionTopLevelSignals = function (signals) {
        return this.children.reduce(function (sg, child) { return child.assembleSelectionTopLevelSignals(sg); }, signals);
    };
    BaseConcatModel.prototype.assembleSelectionSignals = function () {
        this.children.forEach(function (child) { return child.assembleSelectionSignals(); });
        return [];
    };
    BaseConcatModel.prototype.assembleLayoutSignals = function () {
        return this.children.reduce(function (signals, child) {
            return signals.concat(child.assembleLayoutSignals());
        }, assemble_1.assembleLayoutSignals(this));
    };
    BaseConcatModel.prototype.assembleSelectionData = function (data) {
        return this.children.reduce(function (db, child) { return child.assembleSelectionData(db); }, []);
    };
    BaseConcatModel.prototype.assembleMarks = function () {
        // only children have marks
        return this.children.map(function (child) {
            var title = child.assembleTitle();
            var style = child.assembleGroupStyle();
            var layoutSizeEncodeEntry = child.assembleLayoutSize();
            return __assign({ type: 'group', name: child.getName('group') }, (title ? { title: title } : {}), (style ? { style: style } : {}), (layoutSizeEncodeEntry ? {
                encode: {
                    update: layoutSizeEncodeEntry
                }
            } : {}), child.assembleGroup());
        });
    };
    return BaseConcatModel;
}(model_1.Model));
exports.BaseConcatModel = BaseConcatModel;

},{"../util":118,"./data/parse":40,"./layoutsize/assemble":47,"./model":66}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("../log");
var spec_1 = require("../spec");
var concat_1 = require("./concat");
var facet_1 = require("./facet");
var layer_1 = require("./layer");
var repeat_1 = require("./repeat");
var unit_1 = require("./unit");
function buildModel(spec, parent, parentGivenName, unitSize, repeater, config, fit) {
    if (spec_1.isFacetSpec(spec)) {
        return new facet_1.FacetModel(spec, parent, parentGivenName, repeater, config);
    }
    if (spec_1.isLayerSpec(spec)) {
        return new layer_1.LayerModel(spec, parent, parentGivenName, unitSize, repeater, config, fit);
    }
    if (spec_1.isUnitSpec(spec)) {
        return new unit_1.UnitModel(spec, parent, parentGivenName, unitSize, repeater, config, fit);
    }
    if (spec_1.isRepeatSpec(spec)) {
        return new repeat_1.RepeatModel(spec, parent, parentGivenName, repeater, config);
    }
    if (spec_1.isConcatSpec(spec)) {
        return new concat_1.ConcatModel(spec, parent, parentGivenName, repeater, config);
    }
    throw new Error(log.message.INVALID_SPEC);
}
exports.buildModel = buildModel;

},{"../log":105,"../spec":111,"./concat":26,"./facet":44,"./layer":45,"./repeat":67,"./unit":90}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../channel");
var fielddef_1 = require("../fielddef");
var scale_1 = require("../scale");
var timeunit_1 = require("../timeunit");
var type_1 = require("../type");
var util_1 = require("../util");
function applyConfig(e, config, // TODO(#1842): consolidate MarkConfig | TextConfig?
    propsList) {
    for (var _i = 0, propsList_1 = propsList; _i < propsList_1.length; _i++) {
        var property = propsList_1[_i];
        var value = config[property];
        if (value !== undefined) {
            e[property] = { value: value };
        }
    }
    return e;
}
exports.applyConfig = applyConfig;
function applyMarkConfig(e, model, propsList) {
    for (var _i = 0, propsList_2 = propsList; _i < propsList_2.length; _i++) {
        var property = propsList_2[_i];
        var value = getMarkConfig(property, model.markDef, model.config);
        if (value !== undefined) {
            e[property] = { value: value };
        }
    }
    return e;
}
exports.applyMarkConfig = applyMarkConfig;
function getStyles(mark) {
    return [].concat(mark.type, mark.style || []);
}
exports.getStyles = getStyles;
/**
 * Return value mark specific config property if exists.
 * Otherwise, return general mark specific config.
 */
function getMarkConfig(prop, mark, config) {
    // By default, read from mark config first!
    var value = config.mark[prop];
    // Then read mark specific config, which has higher precedence
    var markSpecificConfig = config[mark.type];
    if (markSpecificConfig[prop] !== undefined) {
        value = markSpecificConfig[prop];
    }
    var styles = getStyles(mark);
    for (var _i = 0, styles_1 = styles; _i < styles_1.length; _i++) {
        var style = styles_1[_i];
        var styleConfig = config.style[style];
        // MarkConfig extends VgMarkConfig so a prop may not be a valid property for style
        // However here we also check if it is defined, so it is okay to cast here
        var p = prop;
        if (styleConfig && styleConfig[p] !== undefined) {
            value = styleConfig[p];
        }
    }
    return value;
}
exports.getMarkConfig = getMarkConfig;
function formatSignalRef(fieldDef, specifiedFormat, expr, config) {
    var format = numberFormat(fieldDef, specifiedFormat, config);
    if (fieldDef.bin) {
        var startField = fielddef_1.field(fieldDef, { expr: expr });
        var endField = fielddef_1.field(fieldDef, { expr: expr, binSuffix: 'end' });
        return {
            signal: binFormatExpression(startField, endField, format, config)
        };
    }
    else if (fieldDef.type === 'quantitative') {
        return {
            signal: "" + formatExpr(fielddef_1.field(fieldDef, { expr: expr }), format)
        };
    }
    else if (fielddef_1.isTimeFieldDef(fieldDef)) {
        var isUTCScale = fielddef_1.isScaleFieldDef(fieldDef) && fieldDef['scale'] && fieldDef['scale'].type === scale_1.ScaleType.UTC;
        return {
            signal: timeFormatExpression(fielddef_1.field(fieldDef, { expr: expr }), fieldDef.timeUnit, specifiedFormat, config.text.shortTimeLabels, config.timeFormat, isUTCScale)
        };
    }
    else {
        return {
            signal: "''+" + fielddef_1.field(fieldDef, { expr: expr })
        };
    }
}
exports.formatSignalRef = formatSignalRef;
function getSpecifiedOrDefaultValue(specifiedValue, defaultValue) {
    if (specifiedValue !== undefined) {
        return specifiedValue;
    }
    return defaultValue;
}
exports.getSpecifiedOrDefaultValue = getSpecifiedOrDefaultValue;
/**
 * Returns number format for a fieldDef
 *
 * @param format explicitly specified format
 */
function numberFormat(fieldDef, specifiedFormat, config) {
    if (fieldDef.type === type_1.QUANTITATIVE) {
        // add number format for quantitative type only
        // Specified format in axis/legend has higher precedence than fieldDef.format
        if (specifiedFormat) {
            return specifiedFormat;
        }
        // TODO: need to make this work correctly for numeric ordinal / nominal type
        return config.numberFormat;
    }
    return undefined;
}
exports.numberFormat = numberFormat;
function formatExpr(field, format) {
    return "format(" + field + ", \"" + (format || '') + "\")";
}
function numberFormatExpr(field, specifiedFormat, config) {
    return formatExpr(field, specifiedFormat || config.numberFormat);
}
exports.numberFormatExpr = numberFormatExpr;
function binFormatExpression(startField, endField, format, config) {
    return startField + " === null || isNaN(" + startField + ") ? \"null\" : " + numberFormatExpr(startField, format, config) + " + \" - \" + " + numberFormatExpr(endField, format, config);
}
exports.binFormatExpression = binFormatExpression;
/**
 * Returns the time expression used for axis/legend labels or text mark for a temporal field
 */
function timeFormatExpression(field, timeUnit, format, shortTimeLabels, timeFormatConfig, isUTCScale) {
    if (!timeUnit || format) {
        // If there is not time unit, or if user explicitly specify format for axis/legend/text.
        var _format = format || timeFormatConfig; // only use config.timeFormat if there is no timeUnit.
        if (isUTCScale) {
            return "utcFormat(" + field + ", '" + _format + "')";
        }
        else {
            return "timeFormat(" + field + ", '" + _format + "')";
        }
    }
    else {
        return timeunit_1.formatExpression(timeUnit, field, shortTimeLabels, isUTCScale);
    }
}
exports.timeFormatExpression = timeFormatExpression;
/**
 * Return Vega sort parameters (tuple of field and order).
 */
function sortParams(orderDef, fieldRefOption) {
    return (util_1.isArray(orderDef) ? orderDef : [orderDef]).reduce(function (s, orderChannelDef) {
        s.field.push(fielddef_1.field(orderChannelDef, fieldRefOption));
        s.order.push(orderChannelDef.sort || 'ascending');
        return s;
    }, { field: [], order: [] });
}
exports.sortParams = sortParams;
function titleMerger(v1, v2) {
    return {
        explicit: v1.explicit,
        value: v1.value === v2.value ?
            v1.value : // if title is the same just use one of them
            v1.value + ', ' + v2.value // join title with comma if different
    };
}
exports.titleMerger = titleMerger;
/**
 * Checks whether a fieldDef for a particular channel requires a computed bin range.
 */
function binRequiresRange(fieldDef, channel) {
    if (!fieldDef.bin) {
        console.warn('Only use this method with binned field defs');
        return false;
    }
    // We need the range only when the user explicitly forces a binned field to be use discrete scale. In this case, bin range is used in axis and legend labels.
    // We could check whether the axis or legend exists (not disabled) but that seems overkill.
    return channel_1.isScaleChannel(channel) && util_1.contains(['ordinal', 'nominal'], fieldDef.type);
}
exports.binRequiresRange = binRequiresRange;

},{"../channel":15,"../fielddef":100,"../scale":108,"../timeunit":113,"../type":117,"../util":118}],25:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var vlFieldDef = require("../fielddef");
var log = require("../log");
var spec_1 = require("../spec");
var toplevelprops_1 = require("../toplevelprops");
var util_1 = require("../util");
var buildmodel_1 = require("./buildmodel");
var assemble_1 = require("./data/assemble");
var optimize_1 = require("./data/optimize");
/**
 * Module for compiling Vega-lite spec into Vega spec.
 */
function compile(inputSpec, opt) {
    if (opt === void 0) { opt = {}; }
    if (opt.logger) {
        // set the singleton logger to the provided logger
        log.set(opt.logger);
    }
    if (opt.fieldTitle) {
        // set the singleton field title formatter
        vlFieldDef.setTitleFormatter(opt.fieldTitle);
    }
    try {
        // 1. initialize config
        var config = config_1.initConfig(util_1.mergeDeep({}, opt.config, inputSpec.config));
        // 2. Convert input spec into a normalized form
        // (Normalize autosize to be a autosize properties object.)
        // (Decompose all extended unit specs into composition of unit spec.)
        var spec = spec_1.normalize(inputSpec, config);
        // 3. Instantiate the models with default config by doing a top-down traversal.
        // This allows us to pass properties that child models derive from their parents via their constructors.
        var autosize = toplevelprops_1.normalizeAutoSize(inputSpec.autosize, config.autosize, spec_1.isLayerSpec(spec) || spec_1.isUnitSpec(spec));
        var model = buildmodel_1.buildModel(spec, null, '', undefined, undefined, config, autosize.type === 'fit');
        // 4. Parse parts of each model to produce components that can be merged
        // and assembled easily as a part of a model.
        // In this phase, we do a bottom-up traversal over the whole tree to
        // parse for each type of components once (e.g., data, layout, mark, scale).
        // By doing bottom-up traversal, we start parsing components of unit specs and
        // then merge child components of parent composite specs.
        //
        // Please see inside model.parse() for order of different components parsed.
        model.parse();
        // 5. Optimize the datafow.
        optimize_1.optimizeDataflow(model.component.data);
        // 6. Assemble a Vega Spec from the parsed components.
        return assembleTopLevelModel(model, getTopLevelProperties(inputSpec, config, autosize));
    }
    finally {
        // Reset the singleton logger if a logger is provided
        if (opt.logger) {
            log.reset();
        }
        // Reset the singleton field title formatter if provided
        if (opt.fieldTitle) {
            vlFieldDef.resetTitleFormatter();
        }
    }
}
exports.compile = compile;
function getTopLevelProperties(topLevelSpec, config, autosize) {
    return __assign({ autosize: util_1.keys(autosize).length === 1 && autosize.type ? autosize.type : autosize }, toplevelprops_1.extractTopLevelProperties(config), toplevelprops_1.extractTopLevelProperties(topLevelSpec));
}
/*
 * Assemble the top-level model.
 *
 * Note: this couldn't be `model.assemble()` since the top-level model
 * needs some special treatment to generate top-level properties.
 */
function assembleTopLevelModel(model, topLevelProperties) {
    // TODO: change type to become VgSpec
    // Config with Vega-Lite only config removed.
    var vgConfig = model.config ? config_1.stripAndRedirectConfig(model.config) : undefined;
    var title = model.assembleTitle();
    var style = model.assembleGroupStyle();
    var layoutSignals = model.assembleLayoutSignals();
    // move width and height signals with values to top level
    layoutSignals = layoutSignals.filter(function (signal) {
        if ((signal.name === 'width' || signal.name === 'height') && signal.value !== undefined) {
            topLevelProperties[signal.name] = +signal.value;
            return false;
        }
        return true;
    });
    var output = __assign({ $schema: 'https://vega.github.io/schema/vega/v3.0.json' }, (model.description ? { description: model.description } : {}), topLevelProperties, (title ? { title: title } : {}), (style ? { style: style } : {}), { data: [].concat(model.assembleSelectionData([]), 
        // only assemble data in the root
        assemble_1.assembleRootData(model.component.data)) }, model.assembleGroup(layoutSignals.concat(model.assembleSelectionTopLevelSignals([]))), (vgConfig ? { config: vgConfig } : {}));
    return {
        spec: output
        // TODO: add warning / errors here
    };
}

},{"../config":95,"../fielddef":100,"../log":105,"../spec":111,"../toplevelprops":115,"../util":118,"./buildmodel":23,"./data/assemble":28,"./data/optimize":38}],26:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("../log");
var spec_1 = require("../spec");
var baseconcat_1 = require("./baseconcat");
var buildmodel_1 = require("./buildmodel");
var parse_1 = require("./layoutsize/parse");
var ConcatModel = /** @class */ (function (_super) {
    __extends(ConcatModel, _super);
    function ConcatModel(spec, parent, parentGivenName, repeater, config) {
        var _this = _super.call(this, spec, parent, parentGivenName, config, spec.resolve) || this;
        _this.type = 'concat';
        if (spec.resolve && spec.resolve.axis && (spec.resolve.axis.x === 'shared' || spec.resolve.axis.y === 'shared')) {
            log.warn(log.message.CONCAT_CANNOT_SHARE_AXIS);
        }
        _this.isVConcat = spec_1.isVConcatSpec(spec);
        _this.children = (spec_1.isVConcatSpec(spec) ? spec.vconcat : spec.hconcat).map(function (child, i) {
            return buildmodel_1.buildModel(child, _this, _this.getName('concat_' + i), undefined, repeater, config, false);
        });
        return _this;
    }
    ConcatModel.prototype.parseLayoutSize = function () {
        parse_1.parseConcatLayoutSize(this);
    };
    ConcatModel.prototype.parseAxisGroup = function () {
        return null;
    };
    ConcatModel.prototype.assembleLayout = function () {
        // TODO: allow customization
        return __assign({ padding: { row: 10, column: 10 }, offset: 10 }, (this.isVConcat ? { columns: 1 } : {}), { bounds: 'full', 
            // Use align each so it can work with multiple plots with different size
            align: 'each' });
    };
    return ConcatModel;
}(baseconcat_1.BaseConcatModel));
exports.ConcatModel = ConcatModel;

},{"../log":105,"../spec":111,"./baseconcat":22,"./buildmodel":23,"./layoutsize/parse":48}],27:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var log = require("../../log");
var util_1 = require("../../util");
var common_1 = require("../common");
var dataflow_1 = require("./dataflow");
function addDimension(dims, channel, fieldDef) {
    if (fieldDef.bin) {
        dims[fielddef_1.field(fieldDef, {})] = true;
        dims[fielddef_1.field(fieldDef, { binSuffix: 'end' })] = true;
        if (common_1.binRequiresRange(fieldDef, channel)) {
            dims[fielddef_1.field(fieldDef, { binSuffix: 'range' })] = true;
        }
    }
    else {
        dims[fielddef_1.field(fieldDef)] = true;
    }
    return dims;
}
function mergeMeasures(parentMeasures, childMeasures) {
    for (var f in childMeasures) {
        if (childMeasures.hasOwnProperty(f)) {
            // when we merge a measure, we either have to add an aggregation operator or even a new field
            var ops = childMeasures[f];
            for (var op in ops) {
                if (ops.hasOwnProperty(op)) {
                    if (f in parentMeasures) {
                        // add operator to existing measure field
                        parentMeasures[f][op] = ops[op];
                    }
                    else {
                        parentMeasures[f] = { op: ops[op] };
                    }
                }
            }
        }
    }
}
var AggregateNode = /** @class */ (function (_super) {
    __extends(AggregateNode, _super);
    /**
     * @param dimensions string set for dimensions
     * @param measures dictionary mapping field name => dict of aggregation functions and names to use
     */
    function AggregateNode(dimensions, measures) {
        var _this = _super.call(this) || this;
        _this.dimensions = dimensions;
        _this.measures = measures;
        return _this;
    }
    AggregateNode.prototype.clone = function () {
        return new AggregateNode(__assign({}, this.dimensions), util_1.duplicate(this.measures));
    };
    AggregateNode.makeFromEncoding = function (model) {
        var isAggregate = false;
        model.forEachFieldDef(function (fd) {
            if (fd.aggregate) {
                isAggregate = true;
            }
        });
        var meas = {};
        var dims = {};
        if (!isAggregate) {
            // no need to create this node if the model has no aggregation
            return null;
        }
        model.forEachFieldDef(function (fieldDef, channel) {
            if (fieldDef.aggregate) {
                if (fieldDef.aggregate === 'count') {
                    meas['*'] = meas['*'] || {};
                    meas['*']['count'] = fielddef_1.field(fieldDef, { aggregate: 'count' });
                }
                else {
                    meas[fieldDef.field] = meas[fieldDef.field] || {};
                    meas[fieldDef.field][fieldDef.aggregate] = fielddef_1.field(fieldDef);
                    // For scale channel with domain === 'unaggregated', add min/max so we can use their union as unaggregated domain
                    if (channel_1.isScaleChannel(channel) && model.scaleDomain(channel) === 'unaggregated') {
                        meas[fieldDef.field]['min'] = fielddef_1.field(fieldDef, { aggregate: 'min' });
                        meas[fieldDef.field]['max'] = fielddef_1.field(fieldDef, { aggregate: 'max' });
                    }
                }
            }
            else {
                addDimension(dims, channel, fieldDef);
            }
        });
        if ((util_1.keys(dims).length + util_1.keys(meas).length) === 0) {
            return null;
        }
        return new AggregateNode(dims, meas);
    };
    AggregateNode.makeFromTransform = function (t) {
        var dims = {};
        var meas = {};
        for (var _i = 0, _a = t.aggregate; _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.op) {
                if (s.op === 'count') {
                    meas['*'] = meas['*'] || {};
                    meas['*']['count'] = s.as || fielddef_1.field(s);
                }
                else {
                    meas[s.field] = meas[s.field] || {};
                    meas[s.field][s.op] = s.as || fielddef_1.field(s);
                }
            }
        }
        for (var _b = 0, _c = t.groupby; _b < _c.length; _b++) {
            var s = _c[_b];
            dims[s] = true;
        }
        if ((util_1.keys(dims).length + util_1.keys(meas).length) === 0) {
            return null;
        }
        return new AggregateNode(dims, meas);
    };
    AggregateNode.prototype.merge = function (other) {
        if (!util_1.differ(this.dimensions, other.dimensions)) {
            mergeMeasures(this.measures, other.measures);
            other.remove();
        }
        else {
            log.debug('different dimensions, cannot merge');
        }
    };
    AggregateNode.prototype.addDimensions = function (fields) {
        var _this = this;
        fields.forEach(function (f) { return _this.dimensions[f] = true; });
    };
    AggregateNode.prototype.dependentFields = function () {
        var out = {};
        util_1.keys(this.dimensions).forEach(function (f) { return out[f] = true; });
        util_1.keys(this.measures).forEach(function (m) { return out[m] = true; });
        return out;
    };
    AggregateNode.prototype.producedFields = function () {
        var _this = this;
        var out = {};
        util_1.keys(this.measures).forEach(function (field) {
            util_1.keys(_this.measures[field]).forEach(function (op) {
                out[op + "_" + field] = true;
            });
        });
        return out;
    };
    AggregateNode.prototype.assemble = function () {
        var ops = [];
        var fields = [];
        var as = [];
        for (var _i = 0, _a = util_1.keys(this.measures); _i < _a.length; _i++) {
            var field_1 = _a[_i];
            for (var _b = 0, _c = util_1.keys(this.measures[field_1]); _b < _c.length; _b++) {
                var op = _c[_b];
                as.push(this.measures[field_1][op]);
                ops.push(op);
                fields.push(field_1);
            }
        }
        var result = {
            type: 'aggregate',
            groupby: util_1.keys(this.dimensions),
            ops: ops,
            fields: fields,
            as: as
        };
        return result;
    };
    return AggregateNode;
}(dataflow_1.DataFlowNode));
exports.AggregateNode = AggregateNode;

},{"../../channel":15,"../../fielddef":100,"../../log":105,"../../util":118,"../common":24,"./dataflow":31}],28:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("../../data");
var util_1 = require("../../util");
var aggregate_1 = require("./aggregate");
var bin_1 = require("./bin");
var calculate_1 = require("./calculate");
var dataflow_1 = require("./dataflow");
var facet_1 = require("./facet");
var filter_1 = require("./filter");
var filterinvalid_1 = require("./filterinvalid");
var formatparse_1 = require("./formatparse");
var indentifier_1 = require("./indentifier");
var lookup_1 = require("./lookup");
var source_1 = require("./source");
var stack_1 = require("./stack");
var timeunit_1 = require("./timeunit");
/**
 * Print debug information for dataflow tree.
 */
// tslint:disable-next-line
function debug(node) {
    console.log("" + node.constructor.name + (node.debugName ? " (" + node.debugName + ")" : '') + " -> " + (node.children.map(function (c) {
        return "" + c.constructor.name + (c.debugName ? " (" + c.debugName + ")" : '');
    })));
    console.log(node);
    node.children.forEach(debug);
}
function makeWalkTree(data) {
    // to name datasources
    var datasetIndex = 0;
    /**
     * Recursively walk down the tree.
     */
    function walkTree(node, dataSource) {
        if (node instanceof source_1.SourceNode) {
            // If the source is a named data source or a data source with values, we need
            // to put it in a different data source. Otherwise, Vega may override the data.
            if (!data_1.isUrlData(node.data)) {
                data.push(dataSource);
                var newData = {
                    name: null,
                    source: dataSource.name,
                    transform: []
                };
                dataSource = newData;
            }
        }
        if (node instanceof formatparse_1.ParseNode) {
            if (node.parent instanceof source_1.SourceNode && !dataSource.source) {
                // If node's parent is a root source and the data source does not refer to another data source, use normal format parse
                dataSource.format = __assign({}, dataSource.format || {}, { parse: node.assembleFormatParse() });
            }
            else {
                // Otherwise use Vega expression to parse
                dataSource.transform = dataSource.transform.concat(node.assembleTransforms());
            }
        }
        if (node instanceof facet_1.FacetNode) {
            if (!dataSource.name) {
                dataSource.name = "data_" + datasetIndex++;
            }
            if (!dataSource.source || dataSource.transform.length > 0) {
                data.push(dataSource);
                node.data = dataSource.name;
            }
            else {
                node.data = dataSource.source;
            }
            node.assemble().forEach(function (d) { return data.push(d); });
            // break here because the rest of the tree has to be taken care of by the facet.
            return;
        }
        if (node instanceof filter_1.FilterNode ||
            node instanceof calculate_1.CalculateNode ||
            node instanceof aggregate_1.AggregateNode ||
            node instanceof lookup_1.LookupNode ||
            node instanceof indentifier_1.IdentifierNode) {
            dataSource.transform.push(node.assemble());
        }
        if (node instanceof filterinvalid_1.FilterInvalidNode ||
            node instanceof bin_1.BinNode ||
            node instanceof timeunit_1.TimeUnitNode ||
            node instanceof stack_1.StackNode) {
            dataSource.transform = dataSource.transform.concat(node.assemble());
        }
        if (node instanceof aggregate_1.AggregateNode) {
            if (!dataSource.name) {
                dataSource.name = "data_" + datasetIndex++;
            }
        }
        if (node instanceof dataflow_1.OutputNode) {
            if (dataSource.source && dataSource.transform.length === 0) {
                node.setSource(dataSource.source);
            }
            else if (node.parent instanceof dataflow_1.OutputNode) {
                // Note that an output node may be required but we still do not assemble a
                // separate data source for it.
                node.setSource(dataSource.name);
            }
            else {
                if (!dataSource.name) {
                    dataSource.name = "data_" + datasetIndex++;
                }
                // Here we set the name of the datasource we generated. From now on
                // other assemblers can use it.
                node.setSource(dataSource.name);
                // if this node has more than one child, we will add a datasource automatically
                if (node.numChildren() === 1) {
                    data.push(dataSource);
                    var newData = {
                        name: null,
                        source: dataSource.name,
                        transform: []
                    };
                    dataSource = newData;
                }
            }
        }
        switch (node.numChildren()) {
            case 0:
                // done
                if (node instanceof dataflow_1.OutputNode && (!dataSource.source || dataSource.transform.length > 0)) {
                    // do not push empty datasources that are simply references
                    data.push(dataSource);
                }
                break;
            case 1:
                walkTree(node.children[0], dataSource);
                break;
            default:
                if (!dataSource.name) {
                    dataSource.name = "data_" + datasetIndex++;
                }
                var source_2 = dataSource.name;
                if (!dataSource.source || dataSource.transform.length > 0) {
                    data.push(dataSource);
                }
                else {
                    source_2 = dataSource.source;
                }
                node.children.forEach(function (child) {
                    var newData = {
                        name: null,
                        source: source_2,
                        transform: []
                    };
                    walkTree(child, newData);
                });
                break;
        }
    }
    return walkTree;
}
/**
 * Assemble data sources that are derived from faceted data.
 */
function assembleFacetData(root) {
    var data = [];
    var walkTree = makeWalkTree(data);
    root.children.forEach(function (child) { return walkTree(child, {
        source: root.name,
        name: null,
        transform: []
    }); });
    return data;
}
exports.assembleFacetData = assembleFacetData;
/**
 * Create Vega Data array from a given compiled model and append all of them to the given array
 *
 * @param  model
 * @param  data array
 * @return modified data array
 */
function assembleRootData(dataComponent) {
    var roots = util_1.vals(dataComponent.sources);
    var data = [];
    // roots.forEach(debug);
    var walkTree = makeWalkTree(data);
    var sourceIndex = 0;
    roots.forEach(function (root) {
        // assign a name if the source does not have a name yet
        if (!root.hasName()) {
            root.dataName = "source_" + sourceIndex++;
        }
        var newData = root.assemble();
        walkTree(root, newData);
    });
    // remove empty transform arrays for cleaner output
    data.forEach(function (d) {
        if (d.transform.length === 0) {
            delete d.transform;
        }
    });
    // move sources without transforms (the ones that are potentially used in lookups) to the beginning
    data.sort(function (a, b) { return (a.transform || []).length === 0 ? -1 : ((b.transform || []).length === 0 ? 1 : 0); });
    // now fix the from references in lookup transforms
    for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
        var d = data_2[_i];
        for (var _a = 0, _b = d.transform || []; _a < _b.length; _a++) {
            var t = _b[_a];
            if (t.type === 'lookup') {
                t.from = dataComponent.outputNodes[t.from].getSource();
            }
        }
    }
    return data;
}
exports.assembleRootData = assembleRootData;

},{"../../data":96,"../../util":118,"./aggregate":27,"./bin":29,"./calculate":30,"./dataflow":31,"./facet":32,"./filter":33,"./filterinvalid":34,"./formatparse":35,"./indentifier":36,"./lookup":37,"./source":41,"./stack":42,"./timeunit":43}],29:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bin_1 = require("../../bin");
var fielddef_1 = require("../../fielddef");
var util_1 = require("../../util");
var common_1 = require("../common");
var model_1 = require("../model");
var dataflow_1 = require("./dataflow");
function rangeFormula(model, fieldDef, channel, config) {
    if (common_1.binRequiresRange(fieldDef, channel)) {
        // read format from axis or legend, if there is no format then use config.numberFormat
        var guide = model_1.isUnitModel(model) ? (model.axis(channel) || model.legend(channel) || {}) : {};
        var startField = fielddef_1.field(fieldDef, { expr: 'datum', });
        var endField = fielddef_1.field(fieldDef, { expr: 'datum', binSuffix: 'end' });
        return {
            formulaAs: fielddef_1.field(fieldDef, { binSuffix: 'range' }),
            formula: common_1.binFormatExpression(startField, endField, guide.format, config)
        };
    }
    return {};
}
function binKey(bin, field) {
    return bin_1.binToString(bin) + "_" + field;
}
function isModelParams(p) {
    return !!p['model'];
}
function getSignalsFromParams(params, key) {
    if (isModelParams(params)) {
        var model = params.model;
        return {
            signal: model.getName(key + "_bins"),
            extentSignal: model.getName(key + "_extent")
        };
    }
    return params;
}
function isBinTransform(t) {
    return 'as' in t;
}
function createBinComponent(t, params) {
    var as;
    if (isBinTransform(t)) {
        as = [t.as, t.as + "_end"];
    }
    else {
        as = [fielddef_1.field(t, {}), fielddef_1.field(t, { binSuffix: 'end' })];
    }
    var bin = fielddef_1.normalizeBin(t.bin, undefined) || {};
    var key = binKey(bin, t.field);
    var _a = getSignalsFromParams(params, key), signal = _a.signal, extentSignal = _a.extentSignal;
    var binComponent = __assign({ bin: bin, field: t.field, as: as }, signal ? { signal: signal } : {}, extentSignal ? { extentSignal: extentSignal } : {});
    return { key: key, binComponent: binComponent };
}
var BinNode = /** @class */ (function (_super) {
    __extends(BinNode, _super);
    function BinNode(bins) {
        var _this = _super.call(this) || this;
        _this.bins = bins;
        return _this;
    }
    BinNode.prototype.clone = function () {
        return new BinNode(util_1.duplicate(this.bins));
    };
    BinNode.makeBinFromEncoding = function (model) {
        var bins = model.reduceFieldDef(function (binComponentIndex, fieldDef, channel) {
            if (fieldDef.bin) {
                var _a = createBinComponent(fieldDef, { model: model }), key = _a.key, binComponent = _a.binComponent;
                binComponentIndex[key] = __assign({}, binComponent, binComponentIndex[key], rangeFormula(model, fieldDef, channel, model.config));
            }
            return binComponentIndex;
        }, {});
        if (util_1.keys(bins).length === 0) {
            return null;
        }
        return new BinNode(bins);
    };
    /**
     * Creates a bin node from BinTransform.
     * The optional parameter should provide
     */
    BinNode.makeFromTransform = function (t, params) {
        var _a = createBinComponent(t, params), key = _a.key, binComponent = _a.binComponent;
        return new BinNode((_b = {},
            _b[key] = binComponent,
            _b));
        var _b;
    };
    BinNode.prototype.merge = function (other) {
        this.bins = __assign({}, this.bins, other.bins);
        other.remove();
    };
    BinNode.prototype.producedFields = function () {
        var out = {};
        util_1.vals(this.bins).forEach(function (c) {
            c.as.forEach(function (f) { return out[f] = true; });
        });
        return out;
    };
    BinNode.prototype.dependentFields = function () {
        var out = {};
        util_1.vals(this.bins).forEach(function (c) {
            out[c.field] = true;
        });
        return out;
    };
    BinNode.prototype.assemble = function () {
        return util_1.flatten(util_1.vals(this.bins).map(function (bin) {
            var transform = [];
            var binTrans = __assign({ type: 'bin', field: bin.field, as: bin.as, signal: bin.signal }, bin.bin);
            if (!bin.bin.extent && bin.extentSignal) {
                transform.push({
                    type: 'extent',
                    field: bin.field,
                    signal: bin.extentSignal
                });
                binTrans.extent = { signal: bin.extentSignal };
            }
            transform.push(binTrans);
            if (bin.formula) {
                transform.push({
                    type: 'formula',
                    expr: bin.formula,
                    as: bin.formulaAs
                });
            }
            return transform;
        }));
    };
    return BinNode;
}(dataflow_1.DataFlowNode));
exports.BinNode = BinNode;

},{"../../bin":14,"../../fielddef":100,"../../util":118,"../common":24,"../model":66,"./dataflow":31}],30:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../util");
var dataflow_1 = require("./dataflow");
/**
 * We don't know what a calculate node depends on so we should never move it beyond anything that produces fields.
 */
var CalculateNode = /** @class */ (function (_super) {
    __extends(CalculateNode, _super);
    function CalculateNode(transform) {
        var _this = _super.call(this) || this;
        _this.transform = transform;
        return _this;
    }
    CalculateNode.prototype.clone = function () {
        return new CalculateNode(util_1.duplicate(this.transform));
    };
    CalculateNode.prototype.producedFields = function () {
        var out = {};
        out[this.transform.as] = true;
        return out;
    };
    CalculateNode.prototype.assemble = function () {
        return {
            type: 'formula',
            expr: this.transform.calculate,
            as: this.transform.as
        };
    };
    return CalculateNode;
}(dataflow_1.DataFlowNode));
exports.CalculateNode = CalculateNode;

},{"../../util":118,"./dataflow":31}],31:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A node in the dataflow tree.
 */
var DataFlowNode = /** @class */ (function () {
    function DataFlowNode(debugName) {
        this.debugName = debugName;
        this._children = [];
        this._parent = null;
    }
    /**
     * Clone this node with a deep copy but don't clone links to children or parents.
     */
    DataFlowNode.prototype.clone = function () {
        throw new Error('Cannot clone node');
    };
    /**
     * Set of fields that are being created by this node.
     */
    DataFlowNode.prototype.producedFields = function () {
        return {};
    };
    DataFlowNode.prototype.dependentFields = function () {
        return {};
    };
    Object.defineProperty(DataFlowNode.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        /**
         * Set the parent of the node and also add this not to the parent's children.
         */
        set: function (parent) {
            this._parent = parent;
            parent.addChild(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataFlowNode.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    DataFlowNode.prototype.numChildren = function () {
        return this._children.length;
    };
    DataFlowNode.prototype.addChild = function (child) {
        this._children.push(child);
    };
    DataFlowNode.prototype.removeChild = function (oldChild) {
        this._children.splice(this._children.indexOf(oldChild), 1);
    };
    /**
     * Remove node from the dataflow.
     */
    DataFlowNode.prototype.remove = function () {
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.parent = this._parent;
        }
        this._parent.removeChild(this);
    };
    /**
     * Insert another node as a parent of this node.
     */
    DataFlowNode.prototype.insertAsParentOf = function (other) {
        var parent = other.parent;
        parent.removeChild(this);
        this.parent = parent;
        other.parent = this;
    };
    DataFlowNode.prototype.swapWithParent = function () {
        var parent = this._parent;
        var newParent = parent.parent;
        // reconnect the children
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.parent = parent;
        }
        // remove old links
        this._children = []; // equivalent to removing every child link one by one
        parent.removeChild(this);
        parent.parent.removeChild(parent);
        // swap two nodes
        this.parent = newParent;
        parent.parent = this;
    };
    return DataFlowNode;
}());
exports.DataFlowNode = DataFlowNode;
var OutputNode = /** @class */ (function (_super) {
    __extends(OutputNode, _super);
    /**
     * @param source The name of the source. Will change in assemble.
     * @param type The type of the output node.
     * @param refCounts A global ref counter map.
     */
    function OutputNode(source, type, refCounts) {
        var _this = _super.call(this, source) || this;
        _this.type = type;
        _this.refCounts = refCounts;
        _this._source = _this._name = source;
        if (_this.refCounts && !(_this._name in _this.refCounts)) {
            _this.refCounts[_this._name] = 0;
        }
        return _this;
    }
    OutputNode.prototype.clone = function () {
        var cloneObj = new this.constructor;
        cloneObj.debugName = 'clone_' + this.debugName;
        cloneObj._source = this._source;
        cloneObj._name = 'clone_' + this._name;
        cloneObj.type = this.type;
        cloneObj.refCounts = this.refCounts;
        cloneObj.refCounts[cloneObj._name] = 0;
        return cloneObj;
    };
    /**
     * Request the datasource name and increase the ref counter.
     *
     * During the parsing phase, this will return the simple name such as 'main' or 'raw'.
     * It is crucial to request the name from an output node to mark it as a required node.
     * If nobody ever requests the name, this datasource will not be instantiated in the assemble phase.
     *
     * In the assemble phase, this will return the correct name.
     */
    OutputNode.prototype.getSource = function () {
        this.refCounts[this._name]++;
        return this._source;
    };
    OutputNode.prototype.isRequired = function () {
        return !!this.refCounts[this._name];
    };
    OutputNode.prototype.setSource = function (source) {
        this._source = source;
    };
    return OutputNode;
}(DataFlowNode));
exports.OutputNode = OutputNode;

},{}],32:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../../channel");
var log = require("../../log");
var scale_1 = require("../../scale");
var vega_schema_1 = require("../../vega.schema");
var domain_1 = require("../scale/domain");
var dataflow_1 = require("./dataflow");
/**
 * A node that helps us track what fields we are faceting by.
 */
var FacetNode = /** @class */ (function (_super) {
    __extends(FacetNode, _super);
    /**
     * @param model The facet model.
     * @param name The name that this facet source will have.
     * @param data The source data for this facet data.
     */
    function FacetNode(model, name, data) {
        var _this = _super.call(this) || this;
        _this.model = model;
        _this.name = name;
        _this.data = data;
        if (model.facet.column) {
            _this.columnFields = [model.field(channel_1.COLUMN)];
            _this.columnName = model.getName('column_domain');
            if (model.fieldDef(channel_1.COLUMN).bin) {
                _this.columnFields.push(model.field(channel_1.COLUMN, { binSuffix: 'end' }));
            }
        }
        if (model.facet.row) {
            _this.rowFields = [model.field(channel_1.ROW)];
            _this.rowName = model.getName('row_domain');
            if (model.fieldDef(channel_1.ROW).bin) {
                _this.rowFields.push(model.field(channel_1.ROW, { binSuffix: 'end' }));
            }
        }
        _this.childModel = model.child;
        return _this;
    }
    Object.defineProperty(FacetNode.prototype, "fields", {
        get: function () {
            var fields = [];
            if (this.columnFields) {
                fields = fields.concat(this.columnFields);
            }
            if (this.rowFields) {
                fields = fields.concat(this.rowFields);
            }
            return fields;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The name to reference this source is its name.
     */
    FacetNode.prototype.getSource = function () {
        return this.name;
    };
    FacetNode.prototype.getChildIndependentFieldsWithStep = function () {
        var childIndependentFieldsWithStep = {};
        for (var _i = 0, _a = ['x', 'y']; _i < _a.length; _i++) {
            var channel = _a[_i];
            var childScaleComponent = this.childModel.component.scales[channel];
            if (childScaleComponent && !childScaleComponent.merged) {
                var type = childScaleComponent.get('type');
                var range = childScaleComponent.get('range');
                if (scale_1.hasDiscreteDomain(type) && vega_schema_1.isVgRangeStep(range)) {
                    var domain = domain_1.assembleDomain(this.childModel, channel);
                    var field = domain_1.getFieldFromDomain(domain);
                    if (field) {
                        childIndependentFieldsWithStep[channel] = field;
                    }
                    else {
                        log.warn('Unknown field for ${channel}.  Cannot calculate view size.');
                    }
                }
            }
        }
        return childIndependentFieldsWithStep;
    };
    FacetNode.prototype.assembleRowColumnData = function (channel, crossedDataName, childIndependentFieldsWithStep) {
        var aggregateChildField = {};
        var childChannel = channel === 'row' ? 'y' : 'x';
        if (childIndependentFieldsWithStep[childChannel]) {
            if (crossedDataName) {
                aggregateChildField = {
                    // If there is a crossed data, calculate max
                    fields: ["distinct_" + childIndependentFieldsWithStep[childChannel]],
                    ops: ['max'],
                    // Although it is technically a max, just name it distinct so it's easier to refer to it
                    as: ["distinct_" + childIndependentFieldsWithStep[childChannel]]
                };
            }
            else {
                aggregateChildField = {
                    // If there is no crossed data, just calculate distinct
                    fields: [childIndependentFieldsWithStep[childChannel]],
                    ops: ['distinct']
                };
            }
        }
        return {
            name: channel === 'row' ? this.rowName : this.columnName,
            // Use data from the crossed one if it exist
            source: crossedDataName || this.data,
            transform: [__assign({ type: 'aggregate', groupby: channel === 'row' ? this.rowFields : this.columnFields }, aggregateChildField)]
        };
    };
    FacetNode.prototype.assemble = function () {
        var data = [];
        var crossedDataName = null;
        var childIndependentFieldsWithStep = this.getChildIndependentFieldsWithStep();
        if (this.columnName && this.rowName && (childIndependentFieldsWithStep.x || childIndependentFieldsWithStep.y)) {
            // Need to create a cross dataset to correctly calculate cardinality
            crossedDataName = "cross_" + this.columnName + "_" + this.rowName;
            var fields = [].concat(childIndependentFieldsWithStep.x ? [childIndependentFieldsWithStep.x] : [], childIndependentFieldsWithStep.y ? [childIndependentFieldsWithStep.y] : []);
            var ops = fields.map(function () { return 'distinct'; });
            data.push({
                name: crossedDataName,
                source: this.data,
                transform: [{
                        type: 'aggregate',
                        groupby: this.columnFields.concat(this.rowFields),
                        fields: fields,
                        ops: ops
                    }]
            });
        }
        if (this.columnName) {
            data.push(this.assembleRowColumnData('column', crossedDataName, childIndependentFieldsWithStep));
        }
        if (this.rowName) {
            data.push(this.assembleRowColumnData('row', crossedDataName, childIndependentFieldsWithStep));
        }
        return data;
    };
    return FacetNode;
}(dataflow_1.DataFlowNode));
exports.FacetNode = FacetNode;

},{"../../channel":15,"../../log":105,"../../scale":108,"../../vega.schema":120,"../scale/domain":72,"./dataflow":31}],33:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = require("../../filter");
var util_1 = require("../../util");
var dataflow_1 = require("./dataflow");
var FilterNode = /** @class */ (function (_super) {
    __extends(FilterNode, _super);
    function FilterNode(model, filter) {
        var _this = _super.call(this) || this;
        _this.model = model;
        _this.filter = filter;
        _this.expr = filter_1.expression(_this.model, _this.filter, _this);
        return _this;
    }
    FilterNode.prototype.clone = function () {
        return new FilterNode(this.model, util_1.duplicate(this.filter));
    };
    FilterNode.prototype.assemble = function () {
        return {
            type: 'filter',
            expr: this.expr
        };
    };
    return FilterNode;
}(dataflow_1.DataFlowNode));
exports.FilterNode = FilterNode;

},{"../../filter":101,"../../util":118,"./dataflow":31}],34:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var scale_1 = require("../../scale");
var util_1 = require("../../util");
var dataflow_1 = require("./dataflow");
var FilterInvalidNode = /** @class */ (function (_super) {
    __extends(FilterInvalidNode, _super);
    function FilterInvalidNode(fieldDefs) {
        var _this = _super.call(this) || this;
        _this.fieldDefs = fieldDefs;
        return _this;
    }
    FilterInvalidNode.prototype.clone = function () {
        return new FilterInvalidNode(__assign({}, this.fieldDefs));
    };
    FilterInvalidNode.make = function (model) {
        if (model.config.invalidValues !== 'filter') {
            return null;
        }
        var filter = model.reduceFieldDef(function (aggregator, fieldDef, channel) {
            var scaleComponent = channel_1.isScaleChannel(channel) && model.getScaleComponent(channel);
            if (scaleComponent) {
                var scaleType = scaleComponent.get('type');
                // only automatically filter null for continuous domain since discrete domain scales can handle invalid values.
                if (scale_1.hasContinuousDomain(scaleType) && !fieldDef.aggregate) {
                    aggregator[fieldDef.field] = fieldDef;
                }
            }
            return aggregator;
        }, {});
        if (!util_1.keys(filter).length) {
            return null;
        }
        return new FilterInvalidNode(filter);
    };
    Object.defineProperty(FilterInvalidNode.prototype, "filter", {
        get: function () {
            return this.fieldDefs;
        },
        enumerable: true,
        configurable: true
    });
    // create the VgTransforms for each of the filtered fields
    FilterInvalidNode.prototype.assemble = function () {
        var _this = this;
        var filters = util_1.keys(this.filter).reduce(function (vegaFilters, field) {
            var fieldDef = _this.fieldDefs[field];
            var ref = fielddef_1.field(fieldDef, { expr: 'datum' });
            if (fieldDef !== null) {
                vegaFilters.push(ref + " !== null");
                vegaFilters.push("!isNaN(" + ref + ")");
            }
            return vegaFilters;
        }, []);
        return filters.length > 0 ?
            {
                type: 'filter',
                expr: filters.join(' && ')
            } : null;
    };
    return FilterInvalidNode;
}(dataflow_1.DataFlowNode));
exports.FilterInvalidNode = FilterInvalidNode;

},{"../../channel":15,"../../fielddef":100,"../../scale":108,"../../util":118,"./dataflow":31}],35:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aggregate_1 = require("../../aggregate");
var fielddef_1 = require("../../fielddef");
var filter_1 = require("../../filter");
var log = require("../../log");
var logical_1 = require("../../logical");
var transform_1 = require("../../transform");
var util_1 = require("../../util");
var model_1 = require("../model");
var dataflow_1 = require("./dataflow");
function parseExpression(field, parse) {
    var f = "datum" + util_1.accessPath(field);
    if (parse === 'number') {
        return "toNumber(" + f + ")";
    }
    else if (parse === 'boolean') {
        return "toBoolean(" + f + ")";
    }
    else if (parse === 'string') {
        return "toString(" + f + ")";
    }
    else if (parse === 'date') {
        return "toDate(" + f + ")";
    }
    else if (parse.indexOf('date:') === 0) {
        var specifier = parse.slice(5, parse.length);
        return "timeParse(" + f + "," + specifier + ")";
    }
    else if (parse.indexOf('utc:') === 0) {
        var specifier = parse.slice(4, parse.length);
        return "utcParse(" + f + "," + specifier + ")";
    }
    else {
        log.warn(log.message.unrecognizedParse(parse));
        return null;
    }
}
var ParseNode = /** @class */ (function (_super) {
    __extends(ParseNode, _super);
    function ParseNode(parse) {
        var _this = _super.call(this) || this;
        _this._parse = {};
        _this._parse = parse;
        return _this;
    }
    ParseNode.prototype.clone = function () {
        return new ParseNode(util_1.duplicate(this.parse));
    };
    ParseNode.make = function (model) {
        var parse = {};
        var calcFieldMap = {};
        (model.transforms || []).forEach(function (transform) {
            if (transform_1.isCalculate(transform)) {
                calcFieldMap[transform.as] = true;
            }
            else if (transform_1.isFilter(transform)) {
                logical_1.forEachLeave(transform.filter, function (filter) {
                    if (filter_1.isEqualFilter(filter) || filter_1.isRangeFilter(filter) || filter_1.isOneOfFilter(filter)) {
                        if (filter.timeUnit) {
                            parse[filter.field] = 'date';
                        }
                    }
                });
            }
        }, {});
        if (model_1.isUnitModel(model) || model_1.isFacetModel(model)) {
            // Parse encoded fields
            model.forEachFieldDef(function (fieldDef) {
                if (fielddef_1.isTimeFieldDef(fieldDef)) {
                    parse[fieldDef.field] = 'date';
                }
                else if (fielddef_1.isNumberFieldDef(fieldDef)) {
                    if (calcFieldMap[fieldDef.field] || aggregate_1.isCountingAggregateOp(fieldDef.aggregate)) {
                        return;
                    }
                    parse[fieldDef.field] = 'number';
                }
            });
        }
        // Custom parse should override inferred parse
        var data = model.data;
        if (data && data.format && data.format.parse) {
            var p_1 = data.format.parse;
            util_1.keys(p_1).forEach(function (field) {
                parse[field] = p_1[field];
            });
        }
        // We should not parse what has already been parsed in a parent
        var modelParse = model.component.data.ancestorParse;
        util_1.keys(modelParse).forEach(function (field) {
            if (parse[field] !== modelParse[field]) {
                log.warn(log.message.differentParse(field, parse[field], modelParse[field]));
            }
            else {
                delete parse[field];
            }
        });
        if (util_1.keys(parse).length === 0) {
            return null;
        }
        return new ParseNode(parse);
    };
    Object.defineProperty(ParseNode.prototype, "parse", {
        get: function () {
            return this._parse;
        },
        enumerable: true,
        configurable: true
    });
    ParseNode.prototype.merge = function (other) {
        this._parse = __assign({}, this._parse, other.parse);
        other.remove();
    };
    ParseNode.prototype.assembleFormatParse = function () {
        return this._parse;
    };
    // format parse depends and produces all fields in its parse
    ParseNode.prototype.producedFields = function () {
        return util_1.toSet(util_1.keys(this.parse));
    };
    ParseNode.prototype.dependentFields = function () {
        return util_1.toSet(util_1.keys(this.parse));
    };
    ParseNode.prototype.assembleTransforms = function () {
        var _this = this;
        return util_1.keys(this._parse).map(function (field) {
            var expr = parseExpression(field, _this._parse[field]);
            if (!expr) {
                return null;
            }
            var formula = {
                type: 'formula',
                expr: expr,
                as: field
            };
            return formula;
        }).filter(function (t) { return t !== null; });
    };
    return ParseNode;
}(dataflow_1.DataFlowNode));
exports.ParseNode = ParseNode;

},{"../../aggregate":12,"../../fielddef":100,"../../filter":101,"../../log":105,"../../logical":106,"../../transform":116,"../../util":118,"../model":66,"./dataflow":31}],36:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var selection_1 = require("../../selection");
var dataflow_1 = require("./dataflow");
var IdentifierNode = /** @class */ (function (_super) {
    __extends(IdentifierNode, _super);
    function IdentifierNode() {
        return _super.call(this) || this;
    }
    IdentifierNode.prototype.clone = function () {
        return new IdentifierNode();
    };
    IdentifierNode.prototype.producedFields = function () {
        return _a = {}, _a[selection_1.SELECTION_ID] = true, _a;
        var _a;
    };
    IdentifierNode.prototype.assemble = function () {
        return { type: 'identifier', as: selection_1.SELECTION_ID };
    };
    return IdentifierNode;
}(dataflow_1.DataFlowNode));
exports.IdentifierNode = IdentifierNode;

},{"../../selection":109,"./dataflow":31}],37:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vega_util_1 = require("vega-util");
var log = require("../../log");
var dataflow_1 = require("./dataflow");
var source_1 = require("./source");
var LookupNode = /** @class */ (function (_super) {
    __extends(LookupNode, _super);
    function LookupNode(transform, secondary) {
        var _this = _super.call(this) || this;
        _this.transform = transform;
        _this.secondary = secondary;
        return _this;
    }
    LookupNode.make = function (model, transform, counter) {
        var sources = model.component.data.sources;
        var s = new source_1.SourceNode(transform.from.data);
        var fromSource = sources[s.hash()];
        if (!fromSource) {
            sources[s.hash()] = s;
            fromSource = s;
        }
        var fromOutputName = model.getName("lookup_" + counter);
        var fromOutputNode = new dataflow_1.OutputNode(fromOutputName, 'lookup', model.component.data.outputNodeRefCounts);
        fromOutputNode.parent = fromSource;
        model.component.data.outputNodes[fromOutputName] = fromOutputNode;
        return new LookupNode(transform, fromOutputNode.getSource());
    };
    LookupNode.prototype.producedFields = function () {
        return vega_util_1.toSet(this.transform.from.fields || ((this.transform.as instanceof Array) ? this.transform.as : [this.transform.as]));
    };
    LookupNode.prototype.assemble = function () {
        var foreign;
        if (this.transform.from.fields) {
            // lookup a few fields and add create a flat output
            foreign = __assign({ values: this.transform.from.fields }, this.transform.as ? { as: ((this.transform.as instanceof Array) ? this.transform.as : [this.transform.as]) } : {});
        }
        else {
            // lookup full record and nest it
            var asName = this.transform.as;
            if (!vega_util_1.isString(asName)) {
                log.warn(log.message.NO_FIELDS_NEEDS_AS);
                asName = '_lookup';
            }
            foreign = {
                as: [asName]
            };
        }
        return __assign({ type: 'lookup', from: this.secondary, key: this.transform.from.key, fields: [this.transform.lookup] }, foreign, (this.transform.default ? { default: this.transform.default } : {}));
    };
    return LookupNode;
}(dataflow_1.DataFlowNode));
exports.LookupNode = LookupNode;

},{"../../log":105,"./dataflow":31,"./source":41,"vega-util":10}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("../../data");
var util_1 = require("../../util");
var aggregate_1 = require("./aggregate");
var dataflow_1 = require("./dataflow");
var facet_1 = require("./facet");
var filterinvalid_1 = require("./filterinvalid");
var optimizers = require("./optimizers");
var stack_1 = require("./stack");
exports.FACET_SCALE_PREFIX = 'scale_';
/**
 * Clones the subtree and ignores output nodes except for the leafs, which are renamed.
 */
function cloneSubtree(facet) {
    function clone(node) {
        if (!(node instanceof facet_1.FacetNode)) {
            var copy_1 = node.clone();
            if (copy_1 instanceof dataflow_1.OutputNode) {
                var newName = exports.FACET_SCALE_PREFIX + copy_1.getSource();
                copy_1.setSource(newName);
                facet.model.component.data.outputNodes[newName] = copy_1;
            }
            else if (copy_1 instanceof aggregate_1.AggregateNode || copy_1 instanceof stack_1.StackNode) {
                copy_1.addDimensions(facet.fields);
            }
            util_1.flatten(node.children.map(clone)).forEach(function (n) { return n.parent = copy_1; });
            return [copy_1];
        }
        return util_1.flatten(node.children.map(clone));
    }
    return clone;
}
/**
 * Move facet nodes down to the next fork or output node. Also pull the main output with the facet node.
 * After moving down the facet node, make a copy of the subtree and make it a child of the main output.
 */
function moveFacetDown(node) {
    if (node instanceof facet_1.FacetNode) {
        if (node.numChildren() === 1 && !(node.children[0] instanceof dataflow_1.OutputNode)) {
            // move down until we hit a fork or output node
            var child = node.children[0];
            if (child instanceof aggregate_1.AggregateNode || child instanceof stack_1.StackNode) {
                child.addDimensions(node.fields);
            }
            child.swapWithParent();
            moveFacetDown(node);
        }
        else {
            // move main to facet
            moveMainDownToFacet(node.model.component.data.main);
            // replicate the subtree and place it before the facet's main node
            var copy = util_1.flatten(node.children.map(cloneSubtree(node)));
            copy.forEach(function (c) { return c.parent = node.model.component.data.main; });
        }
    }
    else {
        node.children.forEach(moveFacetDown);
    }
}
function moveMainDownToFacet(node) {
    if (node instanceof dataflow_1.OutputNode && node.type === data_1.MAIN) {
        if (node.numChildren() === 1) {
            var child = node.children[0];
            if (!(child instanceof facet_1.FacetNode)) {
                child.swapWithParent();
                moveMainDownToFacet(node);
            }
        }
    }
}
/**
 * Start optimization path from the root. Useful for removing nodes.
 */
function removeUnnecessaryNodes(node) {
    // remove empty null filter nodes
    if (node instanceof filterinvalid_1.FilterInvalidNode && util_1.every(util_1.vals(node.filter), function (f) { return f === null; })) {
        node.remove();
    }
    // remove output nodes that are not required
    if (node instanceof dataflow_1.OutputNode && !node.isRequired()) {
        node.remove();
    }
    node.children.forEach(removeUnnecessaryNodes);
}
/**
 * Return all leaf nodes.
 */
function getLeaves(roots) {
    var leaves = [];
    function append(node) {
        if (node.numChildren() === 0) {
            leaves.push(node);
        }
        else {
            node.children.forEach(append);
        }
    }
    roots.forEach(append);
    return leaves;
}
/**
 * Optimizes the dataflow of the passed in data component.
 */
function optimizeDataflow(dataComponent) {
    var roots = util_1.vals(dataComponent.sources);
    roots.forEach(removeUnnecessaryNodes);
    // remove source nodes that don't have any children because they also don't have output nodes
    roots = roots.filter(function (r) { return r.numChildren() > 0; });
    getLeaves(roots).forEach(optimizers.iterateFromLeaves(optimizers.removeUnusedSubtrees));
    roots = roots.filter(function (r) { return r.numChildren() > 0; });
    getLeaves(roots).forEach(optimizers.iterateFromLeaves(optimizers.moveParseUp));
    getLeaves(roots).forEach(optimizers.removeDuplicateTimeUnits);
    roots.forEach(moveFacetDown);
    util_1.keys(dataComponent.sources).forEach(function (s) {
        if (dataComponent.sources[s].numChildren() === 0) {
            delete dataComponent.sources[s];
        }
    });
}
exports.optimizeDataflow = optimizeDataflow;

},{"../../data":96,"../../util":118,"./aggregate":27,"./dataflow":31,"./facet":32,"./filterinvalid":34,"./optimizers":39,"./stack":42}],39:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../util");
var dataflow_1 = require("./dataflow");
var formatparse_1 = require("./formatparse");
var source_1 = require("./source");
var timeunit_1 = require("./timeunit");
/**
 * Start optimization path at the leaves. Useful for merging up or removing things.
 *
 * If the callback returns true, the recursion continues.
 */
function iterateFromLeaves(f) {
    function optimizeNextFromLeaves(node) {
        if (node instanceof source_1.SourceNode) {
            return;
        }
        var next = node.parent;
        if (f(node)) {
            optimizeNextFromLeaves(next);
        }
    }
    return optimizeNextFromLeaves;
}
exports.iterateFromLeaves = iterateFromLeaves;
/**
 * Move parse nodes up to forks.
 */
function moveParseUp(node) {
    var parent = node.parent;
    // move parse up by merging or swapping
    if (node instanceof formatparse_1.ParseNode) {
        if (parent instanceof source_1.SourceNode) {
            return false;
        }
        if (parent.numChildren() > 1) {
            // don't move parse further up but continue with parent.
            return true;
        }
        if (parent instanceof formatparse_1.ParseNode) {
            parent.merge(node);
        }
        else {
            // don't swap with nodes that produce something that the parse node depends on (e.g. lookup)
            if (util_1.hasIntersection(parent.producedFields(), node.dependentFields())) {
                return true;
            }
            node.swapWithParent();
        }
    }
    return true;
}
exports.moveParseUp = moveParseUp;
/**
 * Repeatedly remove leaf nodes that are not output nodes.
 * The reason is that we don't need subtrees that don't have any output nodes.
 */
function removeUnusedSubtrees(node) {
    if (node instanceof dataflow_1.OutputNode || node.numChildren() > 0) {
        // no need to continue with parent because it is output node or will have children (there was a fork)
        return false;
    }
    else {
        node.remove();
    }
    return true;
}
exports.removeUnusedSubtrees = removeUnusedSubtrees;
/**
 * Removes duplicate time unit nodes (as determined by the name of the
 * output field) that may be generated due to selections projected over
 * time units.
 */
function removeDuplicateTimeUnits(leaf) {
    var fields = {};
    return iterateFromLeaves(function (node) {
        if (node instanceof timeunit_1.TimeUnitNode) {
            var pfields = node.producedFields();
            var dupe = util_1.keys(pfields).every(function (k) { return !!fields[k]; });
            if (dupe) {
                node.remove();
            }
            else {
                fields = __assign({}, fields, pfields);
            }
        }
        return true;
    })(leaf);
}
exports.removeDuplicateTimeUnits = removeDuplicateTimeUnits;

},{"../../util":118,"./dataflow":31,"./formatparse":35,"./source":41,"./timeunit":43}],40:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vega_util_1 = require("vega-util");
var data_1 = require("../../data");
var datetime_1 = require("../../datetime");
var filter_1 = require("../../filter");
var log = require("../../log");
var transform_1 = require("../../transform");
var util_1 = require("../../util");
var model_1 = require("../model");
var selection_1 = require("../selection/selection");
var aggregate_1 = require("./aggregate");
var bin_1 = require("./bin");
var calculate_1 = require("./calculate");
var dataflow_1 = require("./dataflow");
var facet_1 = require("./facet");
var filter_2 = require("./filter");
var filterinvalid_1 = require("./filterinvalid");
var formatparse_1 = require("./formatparse");
var indentifier_1 = require("./indentifier");
var lookup_1 = require("./lookup");
var source_1 = require("./source");
var stack_1 = require("./stack");
var timeunit_1 = require("./timeunit");
function parseRoot(model, sources) {
    if (model.data || !model.parent) {
        // if the model defines a data source or is the root, create a source node
        var source = new source_1.SourceNode(model.data);
        var hash = source.hash();
        if (hash in sources) {
            // use a reference if we already have a source
            return sources[hash];
        }
        else {
            // otherwise add a new one
            sources[hash] = source;
            return source;
        }
    }
    else {
        // If we don't have a source defined (overriding parent's data), use the parent's facet root or main.
        return model.parent.component.data.facetRoot ? model.parent.component.data.facetRoot : model.parent.component.data.main;
    }
}
/**
 * Parses a transforms array into a chain of connected dataflow nodes.
 */
function parseTransformArray(model) {
    var first = null;
    var node;
    var previous;
    var lookupCounter = 0;
    function insert(newNode) {
        if (!first) {
            // A parent may be inserted during node construction
            // (e.g., selection FilterNodes may add a TimeUnitNode).
            first = newNode.parent || newNode;
        }
        else if (newNode.parent) {
            previous.insertAsParentOf(newNode);
        }
        else {
            newNode.parent = previous;
        }
        previous = newNode;
    }
    model.transforms.forEach(function (t) {
        if (transform_1.isCalculate(t)) {
            node = new calculate_1.CalculateNode(t);
        }
        else if (transform_1.isFilter(t)) {
            // Automatically add a parse node for filters with filter objects
            var parse = {};
            var filter = t.filter;
            var val = null;
            // For EqualFilter, just use the equal property.
            // For RangeFilter and OneOfFilter, all array members should have
            // the same type, so we only use the first one.
            if (filter_1.isEqualFilter(filter)) {
                val = filter.equal;
            }
            else if (filter_1.isRangeFilter(filter)) {
                val = filter.range[0];
            }
            else if (filter_1.isOneOfFilter(filter)) {
                val = (filter.oneOf || filter['in'])[0];
            } // else -- for filter expression, we can't infer anything
            if (val) {
                if (datetime_1.isDateTime(val)) {
                    parse[filter['field']] = 'date';
                }
                else if (vega_util_1.isNumber(val)) {
                    parse[filter['field']] = 'number';
                }
                else if (vega_util_1.isString(val)) {
                    parse[filter['field']] = 'string';
                }
            }
            if (util_1.keys(parse).length > 0) {
                var parseNode = new formatparse_1.ParseNode(parse);
                insert(parseNode);
            }
            node = new filter_2.FilterNode(model, t.filter);
        }
        else if (transform_1.isBin(t)) {
            node = bin_1.BinNode.makeFromTransform(t, { model: model });
        }
        else if (transform_1.isTimeUnit(t)) {
            node = timeunit_1.TimeUnitNode.makeFromTransform(t);
        }
        else if (transform_1.isAggregate(t)) {
            node = aggregate_1.AggregateNode.makeFromTransform(t);
            if (selection_1.requiresSelectionId(model)) {
                insert(node);
                node = new indentifier_1.IdentifierNode();
            }
        }
        else if (transform_1.isLookup(t)) {
            node = lookup_1.LookupNode.make(model, t, lookupCounter++);
        }
        else {
            log.warn(log.message.invalidTransformIgnored(t));
            return;
        }
        insert(node);
    });
    var last = node;
    return { first: first, last: last };
}
exports.parseTransformArray = parseTransformArray;
/*
Description of the dataflow (http://asciiflow.com/):
     +--------+
     | Source |
     +---+----+
         |
         v
     Transforms
(Filter, Calculate, ...)
         |
         v
     FormatParse
         |
         v
      Binning
         |
         v
      Timeunit
         |
         v
      +--+--+
      | Raw |
      +-----+
         |
         v
     Aggregate
         |
         v
       Stack
         |
         v
     Path Order
         |
         v
  Invalid Filter
         |
         v
   +----------+
   |   Main   |
   +----------+
         |
         v
     +-------+
     | Facet |----> "column", "column-layout", and "row"
     +-------+
         |
         v
  ...Child data...
*/
function parseData(model) {
    var root = parseRoot(model, model.component.data.sources);
    var outputNodes = model.component.data.outputNodes;
    var outputNodeRefCounts = model.component.data.outputNodeRefCounts;
    // the current head of the tree that we are appending to
    var head = root;
    // Default discrete selections require an identifier transform to
    // uniquely identify data points as the _id field is volatile. Add
    // this transform at the head of our pipeline such that the identifier
    // field is available for all subsequent datasets. Additional identifier
    // transforms will be necessary when new tuples are constructed
    // (e.g., post-aggregation).
    if (selection_1.requiresSelectionId(model) && !model.parent) {
        var ident = new indentifier_1.IdentifierNode();
        ident.parent = head;
        head = ident;
    }
    // HACK: This is equivalent for merging bin extent for union scale.
    // FIXME(https://github.com/vega/vega-lite/issues/2270): Correctly merge extent / bin node for shared bin scale
    var parentIsLayer = model.parent && model_1.isLayerModel(model.parent);
    if (model_1.isUnitModel(model) || model_1.isFacetModel(model)) {
        if (parentIsLayer) {
            var bin = bin_1.BinNode.makeBinFromEncoding(model);
            if (bin) {
                bin.parent = head;
                head = bin;
            }
        }
    }
    if (model.transforms.length > 0) {
        var _a = parseTransformArray(model), first = _a.first, last = _a.last;
        first.parent = head;
        head = last;
    }
    var parse = formatparse_1.ParseNode.make(model);
    if (parse) {
        parse.parent = head;
        head = parse;
    }
    if (model_1.isUnitModel(model) || model_1.isFacetModel(model)) {
        if (!parentIsLayer) {
            var bin = bin_1.BinNode.makeBinFromEncoding(model);
            if (bin) {
                bin.parent = head;
                head = bin;
            }
        }
        var tu = timeunit_1.TimeUnitNode.makeFromEncoding(model);
        if (tu) {
            tu.parent = head;
            head = tu;
        }
    }
    // add an output node pre aggregation
    var rawName = model.getName(data_1.RAW);
    var raw = new dataflow_1.OutputNode(rawName, data_1.RAW, outputNodeRefCounts);
    outputNodes[rawName] = raw;
    raw.parent = head;
    head = raw;
    if (model_1.isUnitModel(model)) {
        var agg = aggregate_1.AggregateNode.makeFromEncoding(model);
        if (agg) {
            agg.parent = head;
            head = agg;
            if (selection_1.requiresSelectionId(model)) {
                var ident = new indentifier_1.IdentifierNode();
                ident.parent = head;
                head = ident;
            }
        }
        var stack = stack_1.StackNode.make(model);
        if (stack) {
            stack.parent = head;
            head = stack;
        }
    }
    if (model_1.isUnitModel(model)) {
        var filter = filterinvalid_1.FilterInvalidNode.make(model);
        if (filter) {
            filter.parent = head;
            head = filter;
        }
    }
    // output node for marks
    var mainName = model.getName(data_1.MAIN);
    var main = new dataflow_1.OutputNode(mainName, data_1.MAIN, outputNodeRefCounts);
    outputNodes[mainName] = main;
    main.parent = head;
    head = main;
    // add facet marker
    var facetRoot = null;
    if (model_1.isFacetModel(model)) {
        var facetName = model.getName('facet');
        facetRoot = new facet_1.FacetNode(model, facetName, main.getSource());
        outputNodes[facetName] = facetRoot;
        facetRoot.parent = head;
        head = facetRoot;
    }
    // add the format parse from this model so that children don't parse the same field again
    var ancestorParse = __assign({}, model.component.data.ancestorParse, (parse ? parse.parse : {}));
    return __assign({}, model.component.data, { outputNodes: outputNodes,
        outputNodeRefCounts: outputNodeRefCounts,
        raw: raw,
        main: main,
        facetRoot: facetRoot,
        ancestorParse: ancestorParse });
}
exports.parseData = parseData;

},{"../../data":96,"../../datetime":97,"../../filter":101,"../../log":105,"../../transform":116,"../../util":118,"../model":66,"../selection/selection":79,"./aggregate":27,"./bin":29,"./calculate":30,"./dataflow":31,"./facet":32,"./filter":33,"./filterinvalid":34,"./formatparse":35,"./indentifier":36,"./lookup":37,"./source":41,"./stack":42,"./timeunit":43,"vega-util":10}],41:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("../../data");
var util_1 = require("../../util");
var dataflow_1 = require("./dataflow");
var SourceNode = /** @class */ (function (_super) {
    __extends(SourceNode, _super);
    function SourceNode(data) {
        var _this = _super.call(this) || this;
        data = data || { name: 'source' };
        if (data_1.isInlineData(data)) {
            _this._data = { values: data.values };
        }
        else if (data_1.isUrlData(data)) {
            _this._data = { url: data.url };
            if (!data.format) {
                data.format = {};
            }
            if (!data.format || !data.format.type) {
                // Extract extension from URL using snippet from
                // http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript
                var defaultExtension = /(?:\.([^.]+))?$/.exec(data.url)[1];
                if (!util_1.contains(['json', 'csv', 'tsv', 'topojson'], defaultExtension)) {
                    defaultExtension = 'json';
                }
                // defaultExtension has type string but we ensure that it is DataFormatType above
                data.format.type = defaultExtension;
            }
        }
        else if (data_1.isNamedData(data)) {
            _this._name = data.name;
            _this._data = {};
        }
        if (!data_1.isNamedData(data) && data.format) {
            var _a = data.format, _b = _a.parse, parse = _b === void 0 ? null : _b, format = __rest(_a, ["parse"]);
            _this._data.format = format;
        }
        return _this;
    }
    Object.defineProperty(SourceNode.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    SourceNode.prototype.hasName = function () {
        return !!this._name;
    };
    Object.defineProperty(SourceNode.prototype, "dataName", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourceNode.prototype, "parent", {
        set: function (parent) {
            throw new Error('Source nodes have to be roots.');
        },
        enumerable: true,
        configurable: true
    });
    SourceNode.prototype.remove = function () {
        throw new Error('Source nodes are roots and cannot be removed.');
    };
    /**
     * Return a unique identifier for this data source.
     */
    SourceNode.prototype.hash = function () {
        if (data_1.isInlineData(this._data)) {
            if (!this._hash) {
                // Hashing can be expensive for large inline datasets.
                this._hash = util_1.hash(this._data);
            }
            return this._hash;
        }
        else if (data_1.isUrlData(this._data)) {
            return util_1.hash([this._data.url, this._data.format]);
        }
        else {
            return this._name;
        }
    };
    SourceNode.prototype.assemble = function () {
        return __assign({ name: this._name }, this._data, { transform: [] });
    };
    return SourceNode;
}(dataflow_1.DataFlowNode));
exports.SourceNode = SourceNode;

},{"../../data":96,"../../util":118,"./dataflow":31}],42:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var vega_util_1 = require("vega-util");
var fielddef_1 = require("../../fielddef");
var util_1 = require("../../util");
var common_1 = require("../common");
var dataflow_1 = require("./dataflow");
function getStackByFields(model) {
    return model.stack.stackBy.reduce(function (fields, by) {
        var fieldDef = by.fieldDef;
        var _field = fielddef_1.field(fieldDef);
        if (_field) {
            fields.push(_field);
        }
        return fields;
    }, []);
}
var StackNode = /** @class */ (function (_super) {
    __extends(StackNode, _super);
    function StackNode(stack) {
        var _this = _super.call(this) || this;
        _this._stack = stack;
        return _this;
    }
    StackNode.prototype.clone = function () {
        return new StackNode(util_1.duplicate(this._stack));
    };
    StackNode.make = function (model) {
        var stackProperties = model.stack;
        if (!stackProperties) {
            return null;
        }
        var dimensionFieldDef;
        if (stackProperties.groupbyChannel) {
            dimensionFieldDef = model.fieldDef(stackProperties.groupbyChannel);
        }
        var stackby = getStackByFields(model);
        var orderDef = model.encoding.order;
        var sort;
        if (orderDef) {
            sort = common_1.sortParams(orderDef);
        }
        else {
            // default = descending by stackFields
            // FIXME is the default here correct for binned fields?
            sort = stackby.reduce(function (s, field) {
                s.field.push(field);
                s.order.push('descending');
                return s;
            }, { field: [], order: [] });
        }
        return new StackNode({
            dimensionFieldDef: dimensionFieldDef,
            field: model.field(stackProperties.fieldChannel),
            facetby: [],
            stackby: stackby,
            sort: sort,
            offset: stackProperties.offset,
            impute: stackProperties.impute,
        });
    };
    Object.defineProperty(StackNode.prototype, "stack", {
        get: function () {
            return this._stack;
        },
        enumerable: true,
        configurable: true
    });
    StackNode.prototype.addDimensions = function (fields) {
        this._stack.facetby = this._stack.facetby.concat(fields);
    };
    StackNode.prototype.dependentFields = function () {
        var out = {};
        out[this._stack.field] = true;
        this.getGroupbyFields().forEach(function (f) { return out[f] = true; });
        this._stack.facetby.forEach(function (f) { return out[f] = true; });
        var field = this._stack.sort.field;
        vega_util_1.isArray(field) ? field.forEach(function (f) { return out[f] = true; }) : out[field] = true;
        return out;
    };
    StackNode.prototype.producedFields = function () {
        var out = {};
        out[this._stack.field + '_start'] = true;
        out[this._stack.field + '_end'] = true;
        return out;
    };
    StackNode.prototype.getGroupbyFields = function () {
        var _a = this._stack, dimensionFieldDef = _a.dimensionFieldDef, impute = _a.impute;
        if (dimensionFieldDef) {
            if (dimensionFieldDef.bin) {
                if (impute) {
                    // For binned group by field with impute, we calculate bin_mid
                    // as we cannot impute two fields simultaneously
                    return [fielddef_1.field(dimensionFieldDef, { binSuffix: 'mid' })];
                }
                return [
                    // For binned group by field without impute, we need both bin (start) and bin_end
                    fielddef_1.field(dimensionFieldDef, {}),
                    fielddef_1.field(dimensionFieldDef, { binSuffix: 'end' })
                ];
            }
            return [fielddef_1.field(dimensionFieldDef)];
        }
        return [];
    };
    StackNode.prototype.assemble = function () {
        var transform = [];
        var _a = this._stack, facetby = _a.facetby, stackField = _a.field, dimensionFieldDef = _a.dimensionFieldDef, impute = _a.impute, offset = _a.offset, sort = _a.sort, stackby = _a.stackby;
        // Impute
        if (impute && dimensionFieldDef) {
            var dimensionField = dimensionFieldDef ? fielddef_1.field(dimensionFieldDef, { binSuffix: 'mid' }) : undefined;
            if (dimensionFieldDef.bin) {
                // As we can only impute one field at a time, we need to calculate
                // mid point for a binned field
                transform.push({
                    type: 'formula',
                    expr: '(' +
                        fielddef_1.field(dimensionFieldDef, { expr: 'datum' }) +
                        '+' +
                        fielddef_1.field(dimensionFieldDef, { expr: 'datum', binSuffix: 'end' }) +
                        ')/2',
                    as: dimensionField
                });
            }
            transform.push({
                type: 'impute',
                field: stackField,
                groupby: stackby,
                key: dimensionField,
                method: 'value',
                value: 0
            });
        }
        // Stack
        transform.push({
            type: 'stack',
            groupby: this.getGroupbyFields().concat(facetby),
            field: stackField,
            sort: sort,
            as: [
                stackField + '_start',
                stackField + '_end'
            ],
            offset: offset
        });
        return transform;
    };
    return StackNode;
}(dataflow_1.DataFlowNode));
exports.StackNode = StackNode;

},{"../../fielddef":100,"../../util":118,"../common":24,"./dataflow":31,"vega-util":10}],43:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fielddef_1 = require("../../fielddef");
var timeunit_1 = require("../../timeunit");
var util_1 = require("../../util");
var dataflow_1 = require("./dataflow");
var TimeUnitNode = /** @class */ (function (_super) {
    __extends(TimeUnitNode, _super);
    function TimeUnitNode(formula) {
        var _this = _super.call(this) || this;
        _this.formula = formula;
        return _this;
    }
    TimeUnitNode.prototype.clone = function () {
        return new TimeUnitNode(util_1.duplicate(this.formula));
    };
    TimeUnitNode.makeFromEncoding = function (model) {
        var formula = model.reduceFieldDef(function (timeUnitComponent, fieldDef) {
            if (fieldDef.timeUnit) {
                var f = fielddef_1.field(fieldDef);
                timeUnitComponent[f] = {
                    as: f,
                    timeUnit: fieldDef.timeUnit,
                    field: fieldDef.field
                };
            }
            return timeUnitComponent;
        }, {});
        if (util_1.keys(formula).length === 0) {
            return null;
        }
        return new TimeUnitNode(formula);
    };
    TimeUnitNode.makeFromTransform = function (t) {
        return new TimeUnitNode((_a = {},
            _a[t.field] = {
                as: t.as,
                timeUnit: t.timeUnit,
                field: t.field
            },
            _a));
        var _a;
    };
    TimeUnitNode.prototype.merge = function (other) {
        this.formula = __assign({}, this.formula, other.formula);
        other.remove();
    };
    TimeUnitNode.prototype.producedFields = function () {
        var out = {};
        util_1.vals(this.formula).forEach(function (f) {
            out[f.as] = true;
        });
        return out;
    };
    TimeUnitNode.prototype.dependentFields = function () {
        var out = {};
        util_1.vals(this.formula).forEach(function (f) {
            out[f.field] = true;
        });
        return out;
    };
    TimeUnitNode.prototype.assemble = function () {
        return util_1.vals(this.formula).map(function (c) {
            return {
                type: 'formula',
                as: c.as,
                expr: timeunit_1.fieldExpr(c.timeUnit, c.field)
            };
        });
    };
    return TimeUnitNode;
}(dataflow_1.DataFlowNode));
exports.TimeUnitNode = TimeUnitNode;

},{"../../fielddef":100,"../../timeunit":113,"../../util":118,"./dataflow":31}],44:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../channel");
var encoding_1 = require("../encoding");
var fielddef_1 = require("../fielddef");
var log = require("../log");
var scale_1 = require("../scale");
var util_1 = require("../util");
var vega_schema_1 = require("../vega.schema");
var buildmodel_1 = require("./buildmodel");
var assemble_1 = require("./data/assemble");
var parse_1 = require("./data/parse");
var header_1 = require("./layout/header");
var parse_2 = require("./layoutsize/parse");
var model_1 = require("./model");
var repeater_1 = require("./repeater");
var resolve_1 = require("./resolve");
var domain_1 = require("./scale/domain");
var FacetModel = /** @class */ (function (_super) {
    __extends(FacetModel, _super);
    function FacetModel(spec, parent, parentGivenName, repeater, config) {
        var _this = _super.call(this, spec, parent, parentGivenName, config, spec.resolve) || this;
        _this.type = 'facet';
        _this.child = buildmodel_1.buildModel(spec.spec, _this, _this.getName('child'), undefined, repeater, config, false);
        _this.children = [_this.child];
        var facet = repeater_1.replaceRepeaterInFacet(spec.facet, repeater);
        _this.facet = _this.initFacet(facet);
        return _this;
    }
    FacetModel.prototype.initFacet = function (facet) {
        // clone to prevent side effect to the original spec
        return encoding_1.reduce(facet, function (normalizedFacet, fieldDef, channel) {
            if (!util_1.contains([channel_1.ROW, channel_1.COLUMN], channel)) {
                // Drop unsupported channel
                log.warn(log.message.incompatibleChannel(channel, 'facet'));
                return normalizedFacet;
            }
            if (fieldDef.field === undefined) {
                log.warn(log.message.emptyFieldDef(fieldDef, channel));
                return normalizedFacet;
            }
            // Convert type to full, lowercase type, or augment the fieldDef with a default type if missing.
            normalizedFacet[channel] = fielddef_1.normalize(fieldDef, channel);
            return normalizedFacet;
        }, {});
    };
    FacetModel.prototype.channelHasField = function (channel) {
        return !!this.facet[channel];
    };
    FacetModel.prototype.fieldDef = function (channel) {
        return this.facet[channel];
    };
    FacetModel.prototype.parseData = function () {
        this.component.data = parse_1.parseData(this);
        this.child.parseData();
    };
    FacetModel.prototype.parseLayoutSize = function () {
        parse_2.parseChildrenLayoutSize(this);
    };
    FacetModel.prototype.parseSelection = function () {
        // As a facet has a single child, the selection components are the same.
        // The child maintains its selections to assemble signals, which remain
        // within its unit.
        this.child.parseSelection();
        this.component.selection = this.child.component.selection;
    };
    FacetModel.prototype.parseMarkGroup = function () {
        this.child.parseMarkGroup();
    };
    FacetModel.prototype.parseAxisAndHeader = function () {
        this.child.parseAxisAndHeader();
        this.parseHeader('column');
        this.parseHeader('row');
        this.mergeChildAxis('x');
        this.mergeChildAxis('y');
    };
    FacetModel.prototype.parseHeader = function (channel) {
        if (this.channelHasField(channel)) {
            var fieldDef = this.facet[channel];
            var header = fieldDef.header || {};
            var title = header.title !== undefined ? header.title : fielddef_1.title(fieldDef, this.config);
            if (this.child.component.layoutHeaders[channel].title) {
                // merge title with child to produce "Title / Subtitle / Sub-subtitle"
                title += ' / ' + this.child.component.layoutHeaders[channel].title;
                this.child.component.layoutHeaders[channel].title = null;
            }
            this.component.layoutHeaders[channel] = {
                title: title,
                facetFieldDef: fieldDef,
                // TODO: support adding label to footer as well
                header: [this.makeHeaderComponent(channel, true)]
            };
        }
    };
    FacetModel.prototype.makeHeaderComponent = function (channel, labels) {
        var sizeType = channel === 'row' ? 'height' : 'width';
        return {
            labels: labels,
            sizeSignal: this.child.component.layoutSize.get(sizeType) ? this.child.getSizeSignalRef(sizeType) : undefined,
            axes: []
        };
    };
    FacetModel.prototype.mergeChildAxis = function (channel) {
        var child = this.child;
        if (child.component.axes[channel]) {
            var _a = this.component, layoutHeaders = _a.layoutHeaders, resolve = _a.resolve;
            resolve.axis[channel] = resolve_1.parseGuideResolve(resolve, channel);
            if (resolve.axis[channel] === 'shared') {
                // For shared axis, move the axes to facet's header or footer
                var headerChannel = channel === 'x' ? 'column' : 'row';
                var layoutHeader = layoutHeaders[headerChannel];
                for (var _i = 0, _b = child.component.axes[channel]; _i < _b.length; _i++) {
                    var axisComponent = _b[_i];
                    var mainAxis = axisComponent.main;
                    var headerType = header_1.getHeaderType(mainAxis.get('orient'));
                    layoutHeader[headerType] = layoutHeader[headerType] ||
                        [this.makeHeaderComponent(headerChannel, false)];
                    // LayoutHeader no longer keep track of property precedence, thus let's combine.
                    layoutHeader[headerType][0].axes.push(mainAxis.combine());
                    delete axisComponent.main;
                }
            }
            else {
                // Otherwise do nothing for independent axes
            }
        }
    };
    FacetModel.prototype.assembleSelectionTopLevelSignals = function (signals) {
        return this.child.assembleSelectionTopLevelSignals(signals);
    };
    FacetModel.prototype.assembleSelectionSignals = function () {
        this.child.assembleSelectionSignals();
        return [];
    };
    FacetModel.prototype.assembleSelectionData = function (data) {
        return this.child.assembleSelectionData(data);
    };
    FacetModel.prototype.getLayoutBandMixins = function (headerType) {
        var bandMixins = {};
        var bandType = headerType === 'header' ? 'headerBand' : 'footerBand';
        for (var _i = 0, _a = ['row', 'column']; _i < _a.length; _i++) {
            var channel = _a[_i];
            var layoutHeaderComponent = this.component.layoutHeaders[channel];
            var headerComponent = layoutHeaderComponent[headerType];
            if (headerComponent && headerComponent[0]) {
                var sizeType = channel === 'row' ? 'height' : 'width';
                if (!this.child.component.layoutSize.get(sizeType)) {
                    // If facet child does not have size signal, then apply headerBand
                    bandMixins[bandType] = bandMixins[bandType] || {};
                    bandMixins[bandType][channel] = 0.5;
                }
            }
        }
        return bandMixins;
    };
    FacetModel.prototype.assembleLayout = function () {
        var columns = this.channelHasField('column') ? this.columnDistinctSignal() : 1;
        // TODO: determine default align based on shared / independent scales
        return __assign({ padding: { row: 10, column: 10 } }, this.getLayoutBandMixins('header'), this.getLayoutBandMixins('footer'), { 
            // TODO: support offset for rowHeader/rowFooter/rowTitle/columnHeader/columnFooter/columnTitle
            offset: 10, columns: columns, bounds: 'full', align: 'all' });
    };
    FacetModel.prototype.assembleLayoutSignals = function () {
        // FIXME(https://github.com/vega/vega-lite/issues/1193): this can be incorrect if we have independent scales.
        return this.child.assembleLayoutSignals();
    };
    FacetModel.prototype.columnDistinctSignal = function () {
        if (this.parent && (this.parent instanceof FacetModel)) {
            // For nested facet, we will add columns to group mark instead
            // See discussion in https://github.com/vega/vega/issues/952
            // and https://github.com/vega/vega-view/releases/tag/v1.2.6
            return undefined;
        }
        else {
            // In facetNode.assemble(), the name is always this.getName('column') + '_layout'.
            var facetLayoutDataName = this.getName('column_domain');
            return { signal: "length(data('" + facetLayoutDataName + "'))" };
        }
    };
    FacetModel.prototype.assembleGroup = function (signals) {
        if (this.parent && (this.parent instanceof FacetModel)) {
            // Provide number of columns for layout.
            // See discussion in https://github.com/vega/vega/issues/952
            // and https://github.com/vega/vega-view/releases/tag/v1.2.6
            return __assign({}, (this.channelHasField('column') ? {
                encode: {
                    update: {
                        // TODO(https://github.com/vega/vega-lite/issues/2759):
                        // Correct the signal for facet of concat of facet_column
                        columns: { field: fielddef_1.field(this.facet.column, { prefix: 'distinct' }) }
                    }
                }
            } : {}), _super.prototype.assembleGroup.call(this, signals));
        }
        return _super.prototype.assembleGroup.call(this, signals);
    };
    /**
     * Aggregate cardinality for calculating size
     */
    FacetModel.prototype.getCardinalityAggregateForChild = function () {
        var fields = [];
        var ops = [];
        if (this.child instanceof FacetModel) {
            if (this.child.channelHasField('column')) {
                fields.push(fielddef_1.field(this.child.facet.column));
                ops.push('distinct');
            }
        }
        else {
            for (var _i = 0, _a = ['x', 'y']; _i < _a.length; _i++) {
                var channel = _a[_i];
                var childScaleComponent = this.child.component.scales[channel];
                if (childScaleComponent && !childScaleComponent.merged) {
                    var type = childScaleComponent.get('type');
                    var range = childScaleComponent.get('range');
                    if (scale_1.hasDiscreteDomain(type) && vega_schema_1.isVgRangeStep(range)) {
                        var domain = domain_1.assembleDomain(this.child, channel);
                        var field_1 = domain_1.getFieldFromDomain(domain);
                        if (field_1) {
                            fields.push(field_1);
                            ops.push('distinct');
                        }
                        else {
                            log.warn('Unknown field for ${channel}.  Cannot calculate view size.');
                        }
                    }
                }
            }
        }
        return fields.length ? { fields: fields, ops: ops } : undefined;
    };
    FacetModel.prototype.assembleMarks = function () {
        var _a = this, child = _a.child, facet = _a.facet;
        var facetRoot = this.component.data.facetRoot;
        var data = assemble_1.assembleFacetData(facetRoot);
        // If we facet by two dimensions, we need to add a cross operator to the aggregation
        // so that we create all groups
        var hasRow = this.channelHasField(channel_1.ROW);
        var hasColumn = this.channelHasField(channel_1.COLUMN);
        var layoutSizeEncodeEntry = child.assembleLayoutSize();
        var aggregateMixins = {};
        if (hasRow && hasColumn) {
            aggregateMixins.aggregate = { cross: true };
        }
        var cardinalityAggregateForChild = this.getCardinalityAggregateForChild();
        if (cardinalityAggregateForChild) {
            aggregateMixins.aggregate = __assign({}, aggregateMixins.aggregate, cardinalityAggregateForChild);
        }
        var title = child.assembleTitle();
        var style = child.assembleGroupStyle();
        var markGroup = __assign({ name: this.getName('cell'), type: 'group' }, (title ? { title: title } : {}), (style ? { style: style } : {}), { from: {
                facet: __assign({ name: facetRoot.name, data: facetRoot.data, groupby: [].concat(hasRow ? [this.field(channel_1.ROW)] : [], hasColumn ? [this.field(channel_1.COLUMN)] : []) }, aggregateMixins)
            }, sort: {
                field: [].concat(hasRow ? [this.field(channel_1.ROW, { expr: 'datum', })] : [], hasColumn ? [this.field(channel_1.COLUMN, { expr: 'datum' })] : []),
                order: [].concat(hasRow ? [(facet.row.sort) || 'ascending'] : [], hasColumn ? [(facet.column.sort) || 'ascending'] : [])
            } }, (data.length > 0 ? { data: data } : {}), (layoutSizeEncodeEntry ? { encode: { update: layoutSizeEncodeEntry } } : {}), child.assembleGroup());
        return [markGroup];
    };
    FacetModel.prototype.getMapping = function () {
        return this.facet;
    };
    return FacetModel;
}(model_1.ModelWithField));
exports.FacetModel = FacetModel;

},{"../channel":15,"../encoding":98,"../fielddef":100,"../log":105,"../scale":108,"../util":118,"../vega.schema":120,"./buildmodel":23,"./data/assemble":28,"./data/parse":40,"./layout/header":46,"./layoutsize/parse":48,"./model":66,"./repeater":68,"./resolve":69,"./scale/domain":72}],45:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("../log");
var spec_1 = require("../spec");
var util_1 = require("../util");
var parse_1 = require("./axis/parse");
var parse_2 = require("./data/parse");
var assemble_1 = require("./layoutsize/assemble");
var parse_3 = require("./layoutsize/parse");
var assemble_2 = require("./legend/assemble");
var model_1 = require("./model");
var selection_1 = require("./selection/selection");
var unit_1 = require("./unit");
var LayerModel = /** @class */ (function (_super) {
    __extends(LayerModel, _super);
    function LayerModel(spec, parent, parentGivenName, parentGivenSize, repeater, config, fit) {
        var _this = _super.call(this, spec, parent, parentGivenName, config, spec.resolve) || this;
        _this.type = 'layer';
        var layoutSize = __assign({}, parentGivenSize, (spec.width ? { width: spec.width } : {}), (spec.height ? { height: spec.height } : {}));
        _this.initSize(layoutSize);
        _this.children = spec.layer.map(function (layer, i) {
            if (spec_1.isLayerSpec(layer)) {
                return new LayerModel(layer, _this, _this.getName('layer_' + i), layoutSize, repeater, config, fit);
            }
            if (spec_1.isUnitSpec(layer)) {
                return new unit_1.UnitModel(layer, _this, _this.getName('layer_' + i), layoutSize, repeater, config, fit);
            }
            throw new Error(log.message.INVALID_SPEC);
        });
        return _this;
    }
    LayerModel.prototype.parseData = function () {
        this.component.data = parse_2.parseData(this);
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.parseData();
        }
    };
    LayerModel.prototype.parseLayoutSize = function () {
        parse_3.parseLayerLayoutSize(this);
    };
    LayerModel.prototype.parseSelection = function () {
        var _this = this;
        // Merge selections up the hierarchy so that they may be referenced
        // across unit specs. Persist their definitions within each child
        // to assemble signals which remain within output Vega unit groups.
        this.component.selection = {};
        var _loop_1 = function (child) {
            child.parseSelection();
            util_1.keys(child.component.selection).forEach(function (key) {
                _this.component.selection[key] = child.component.selection[key];
            });
        };
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            _loop_1(child);
        }
    };
    LayerModel.prototype.parseMarkGroup = function () {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.parseMarkGroup();
        }
    };
    LayerModel.prototype.parseAxisAndHeader = function () {
        parse_1.parseLayerAxis(this);
    };
    LayerModel.prototype.assembleSelectionTopLevelSignals = function (signals) {
        return this.children.reduce(function (sg, child) { return child.assembleSelectionTopLevelSignals(sg); }, signals);
    };
    // TODO: Support same named selections across children.
    LayerModel.prototype.assembleSelectionSignals = function () {
        return this.children.reduce(function (signals, child) {
            return signals.concat(child.assembleSelectionSignals());
        }, []);
    };
    LayerModel.prototype.assembleLayoutSignals = function () {
        return this.children.reduce(function (signals, child) {
            return signals.concat(child.assembleLayoutSignals());
        }, assemble_1.assembleLayoutSignals(this));
    };
    LayerModel.prototype.assembleSelectionData = function (data) {
        return this.children.reduce(function (db, child) { return child.assembleSelectionData(db); }, []);
    };
    LayerModel.prototype.assembleTitle = function () {
        var title = _super.prototype.assembleTitle.call(this);
        if (title) {
            return title;
        }
        // If title does not provide layer, look into children
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            title = child.assembleTitle();
            if (title) {
                return title;
            }
        }
        return undefined;
    };
    LayerModel.prototype.assembleLayout = function () {
        return null;
    };
    LayerModel.prototype.assembleMarks = function () {
        return selection_1.assembleLayerSelectionMarks(this, util_1.flatten(this.children.map(function (child) {
            return child.assembleMarks();
        })));
    };
    LayerModel.prototype.assembleLegends = function () {
        return this.children.reduce(function (legends, child) {
            return legends.concat(child.assembleLegends());
        }, assemble_2.assembleLegends(this));
    };
    return LayerModel;
}(model_1.Model));
exports.LayerModel = LayerModel;

},{"../log":105,"../spec":111,"../util":118,"./axis/parse":20,"./data/parse":40,"./layoutsize/assemble":47,"./layoutsize/parse":48,"./legend/assemble":49,"./model":66,"./selection/selection":79,"./unit":90}],46:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fielddef_1 = require("../../fielddef");
var util_1 = require("../../util");
var common_1 = require("../common");
exports.HEADER_CHANNELS = ['row', 'column'];
exports.HEADER_TYPES = ['header', 'footer'];
function getHeaderType(orient) {
    if (orient === 'top' || orient === 'left') {
        return 'header';
    }
    return 'footer';
}
exports.getHeaderType = getHeaderType;
function getTitleGroup(model, channel) {
    var title = model.component.layoutHeaders[channel].title;
    var textOrient = channel === 'row' ? 'vertical' : undefined;
    var update = __assign({ align: { value: 'center' }, text: { value: title } }, (textOrient === 'vertical' ? { angle: { value: 270 } } : {}));
    return {
        name: model.getName(channel + "_title"),
        role: channel + "-title",
        type: 'group',
        marks: [__assign({ type: 'text', role: channel + "-title-text", style: 'guide-title' }, (util_1.keys(update).length > 0 ? { encode: { update: update } } : {}))]
    };
}
exports.getTitleGroup = getTitleGroup;
function getHeaderGroup(model, channel, headerType, layoutHeader, headerCmpt) {
    if (headerCmpt) {
        var title = null;
        if (layoutHeader.facetFieldDef && headerCmpt.labels) {
            var facetFieldDef = layoutHeader.facetFieldDef;
            var _a = facetFieldDef.header, header = _a === void 0 ? {} : _a;
            var format = header.format, labelAngle = header.labelAngle;
            var update = __assign({}, (labelAngle ? { angle: { value: labelAngle } } :
                // Default align / baseline for row (only apply if there is no custom labelAngle specified)
                channel === 'row' ? {
                    align: { value: 'right' },
                    baseline: { value: 'middle' }
                } :
                    {})
            // TODO(https://github.com/vega/vega-lite/issues/2446): apply label* (e.g, labelAlign, labelBaseline) here
            );
            title = __assign({ text: common_1.formatSignalRef(facetFieldDef, format, 'parent', model.config), offset: 10, orient: channel === 'row' ? 'left' : 'top', style: 'guide-label' }, (util_1.keys(update).length > 0 ? { encode: { update: update } } : {}));
        }
        var axes = headerCmpt.axes;
        var hasAxes = axes && axes.length > 0;
        if (title || hasAxes) {
            var sizeChannel = channel === 'row' ? 'height' : 'width';
            return __assign({ name: model.getName(channel + "_" + headerType), type: 'group', role: channel + "-" + headerType }, (layoutHeader.facetFieldDef ? {
                from: { data: model.getName(channel + '_domain') },
                sort: {
                    field: fielddef_1.field(layoutHeader.facetFieldDef, { expr: 'datum' }),
                    order: (layoutHeader.facetFieldDef.header && layoutHeader.facetFieldDef.sort) || 'ascending'
                }
            } : {}), (title ? { title: title } : {}), (headerCmpt.sizeSignal ? {
                encode: {
                    update: (_b = {},
                        _b[sizeChannel] = headerCmpt.sizeSignal,
                        _b)
                }
            } : {}), (hasAxes ? { axes: axes } : {}));
        }
    }
    return null;
    var _b;
}
exports.getHeaderGroup = getHeaderGroup;

},{"../../fielddef":100,"../../util":118,"../common":24}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scale_1 = require("../../scale");
var vega_schema_1 = require("../../vega.schema");
var model_1 = require("../model");
function assembleLayoutSignals(model) {
    return [].concat(sizeSignals(model, 'width'), sizeSignals(model, 'height'));
}
exports.assembleLayoutSignals = assembleLayoutSignals;
function sizeSignals(model, sizeType) {
    var channel = sizeType === 'width' ? 'x' : 'y';
    var size = model.component.layoutSize.get(sizeType);
    if (!size || size === 'merged') {
        return [];
    }
    // Read size signal name from name map, just in case it is the top-level size signal that got renamed.
    var name = model.getSizeSignalRef(sizeType).signal;
    if (size === 'range-step') {
        var scaleComponent = model.getScaleComponent(channel);
        if (scaleComponent) {
            var type = scaleComponent.get('type');
            var range = scaleComponent.get('range');
            if (scale_1.hasDiscreteDomain(type) && vega_schema_1.isVgRangeStep(range)) {
                var scaleName = model.scaleName(channel);
                if (model_1.isFacetModel(model.parent)) {
                    // If parent is facet and this is an independent scale, return only signal signal
                    // as the width/height will be calculated using the cardinality from
                    // facet's aggregate rather than reading from scale domain
                    var parentResolve = model.parent.component.resolve;
                    if (parentResolve.scale[channel] === 'independent') {
                        return [stepSignal(scaleName, range)];
                    }
                }
                return [
                    stepSignal(scaleName, range),
                    {
                        name: name,
                        update: sizeExpr(scaleName, scaleComponent, "domain('" + scaleName + "').length")
                    }
                ];
            }
        }
        /* istanbul ignore next: Condition should not happen -- only for warning in development. */
        throw new Error('layout size is range step although there is no rangeStep.');
    }
    else {
        return [{
                name: name,
                value: size
            }];
    }
}
exports.sizeSignals = sizeSignals;
function stepSignal(scaleName, range) {
    return {
        name: scaleName + '_step',
        value: range.step,
    };
}
function sizeExpr(scaleName, scaleComponent, cardinality) {
    var type = scaleComponent.get('type');
    var padding = scaleComponent.get('padding');
    var paddingOuter = scaleComponent.get('paddingOuter');
    paddingOuter = paddingOuter !== undefined ? paddingOuter : padding;
    var paddingInner = scaleComponent.get('paddingInner');
    paddingInner = type === 'band' ?
        // only band has real paddingInner
        (paddingInner !== undefined ? paddingInner : padding) :
        // For point, as calculated in https://github.com/vega/vega-scale/blob/master/src/band.js#L128,
        // it's equivalent to have paddingInner = 1 since there is only n-1 steps between n points.
        1;
    return "bandspace(" + cardinality + ", " + paddingInner + ", " + paddingOuter + ") * " + scaleName + "_step";
}
exports.sizeExpr = sizeExpr;

},{"../../scale":108,"../../vega.schema":120,"../model":66}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scale_1 = require("../../scale");
var vega_schema_1 = require("../../vega.schema");
var split_1 = require("../split");
function parseLayerLayoutSize(model) {
    parseChildrenLayoutSize(model);
    var layoutSizeCmpt = model.component.layoutSize;
    layoutSizeCmpt.setWithExplicit('width', parseNonUnitLayoutSizeForChannel(model, 'width'));
    layoutSizeCmpt.setWithExplicit('height', parseNonUnitLayoutSizeForChannel(model, 'height'));
}
exports.parseLayerLayoutSize = parseLayerLayoutSize;
exports.parseRepeatLayoutSize = parseLayerLayoutSize;
function parseConcatLayoutSize(model) {
    parseChildrenLayoutSize(model);
    var layoutSizeCmpt = model.component.layoutSize;
    var sizeTypeToMerge = model.isVConcat ? 'width' : 'height';
    layoutSizeCmpt.setWithExplicit(sizeTypeToMerge, parseNonUnitLayoutSizeForChannel(model, sizeTypeToMerge));
}
exports.parseConcatLayoutSize = parseConcatLayoutSize;
function parseChildrenLayoutSize(model) {
    for (var _i = 0, _a = model.children; _i < _a.length; _i++) {
        var child = _a[_i];
        child.parseLayoutSize();
    }
}
exports.parseChildrenLayoutSize = parseChildrenLayoutSize;
function parseNonUnitLayoutSizeForChannel(model, sizeType) {
    var channel = sizeType === 'width' ? 'x' : 'y';
    var resolve = model.component.resolve;
    var mergedSize;
    // Try to merge layout size
    for (var _i = 0, _a = model.children; _i < _a.length; _i++) {
        var child = _a[_i];
        var childSize = child.component.layoutSize.getWithExplicit(sizeType);
        var scaleResolve = resolve.scale[channel];
        if (scaleResolve === 'independent' && childSize.value === 'range-step') {
            // Do not merge independent scales with range-step as their size depends
            // on the scale domains, which can be different between scales.
            mergedSize = undefined;
            break;
        }
        if (mergedSize) {
            if (scaleResolve === 'independent' && mergedSize.value !== childSize.value) {
                // For independent scale, only merge if all the sizes are the same.
                // If the values are different, abandon the merge!
                mergedSize = undefined;
                break;
            }
            mergedSize = split_1.mergeValuesWithExplicit(mergedSize, childSize, sizeType, '');
        }
        else {
            mergedSize = childSize;
        }
    }
    if (mergedSize) {
        // If merged, rename size and set size of all children.
        for (var _b = 0, _c = model.children; _b < _c.length; _b++) {
            var child = _c[_b];
            model.renameLayoutSize(child.getName(sizeType), model.getName(sizeType));
            child.component.layoutSize.set(sizeType, 'merged', false);
        }
        return mergedSize;
    }
    else {
        // Otherwise, there is no merged size.
        return {
            explicit: false,
            value: undefined
        };
    }
}
function parseUnitLayoutSize(model) {
    var layoutSizeComponent = model.component.layoutSize;
    if (!layoutSizeComponent.explicit.width) {
        var width = defaultUnitSize(model, 'width');
        layoutSizeComponent.set('width', width, false);
    }
    if (!layoutSizeComponent.explicit.height) {
        var height = defaultUnitSize(model, 'height');
        layoutSizeComponent.set('height', height, false);
    }
}
exports.parseUnitLayoutSize = parseUnitLayoutSize;
function defaultUnitSize(model, sizeType) {
    var channel = sizeType === 'width' ? 'x' : 'y';
    var config = model.config;
    var scaleComponent = model.getScaleComponent(channel);
    if (scaleComponent) {
        var scaleType = scaleComponent.get('type');
        var range = scaleComponent.get('range');
        if (scale_1.hasDiscreteDomain(scaleType) && vega_schema_1.isVgRangeStep(range)) {
            // For discrete domain with range.step, use dynamic width/height
            return 'range-step';
        }
        else {
            return config.view[sizeType];
        }
    }
    else {
        // No scale - set default size
        if (sizeType === 'width' && model.mark() === 'text') {
            // width for text mark without x-field is a bit wider than typical range step
            return config.scale.textXRangeStep;
        }
        // Set width/height equal to rangeStep config or if rangeStep is null, use value from default scale config.
        return config.scale.rangeStep || scale_1.defaultScaleConfig.rangeStep;
    }
}

},{"../../scale":108,"../../vega.schema":120,"../split":89}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringify = require("json-stable-stringify");
var util_1 = require("../../util");
var parse_1 = require("./parse");
function assembleLegends(model) {
    var legendComponentIndex = model.component.legends;
    var legendByDomain = {};
    for (var _i = 0, _a = util_1.keys(legendComponentIndex); _i < _a.length; _i++) {
        var channel = _a[_i];
        var scaleComponent = model.getScaleComponent(channel);
        var domainHash = stringify(scaleComponent.domains);
        if (legendByDomain[domainHash]) {
            for (var _b = 0, _c = legendByDomain[domainHash]; _b < _c.length; _b++) {
                var mergedLegendComponent = _c[_b];
                var merged = parse_1.mergeLegendComponent(mergedLegendComponent, legendComponentIndex[channel]);
                if (!merged) {
                    // If cannot merge, need to add this legend separately
                    legendByDomain[domainHash].push(legendComponentIndex[channel]);
                }
            }
        }
        else {
            legendByDomain[domainHash] = [legendComponentIndex[channel].clone()];
        }
    }
    return util_1.flatten(util_1.vals(legendByDomain)).map(function (legendCmpt) { return legendCmpt.combine(); });
}
exports.assembleLegends = assembleLegends;

},{"../../util":118,"./parse":52,"json-stable-stringify":1}],50:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var split_1 = require("../split");
var LegendComponent = /** @class */ (function (_super) {
    __extends(LegendComponent, _super);
    function LegendComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LegendComponent;
}(split_1.Split));
exports.LegendComponent = LegendComponent;

},{"../split":89}],51:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vega_util_1 = require("vega-util");
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var mark_1 = require("../../mark");
var scale_1 = require("../../scale");
var util_1 = require("../../util");
var common_1 = require("../common");
var mixins = require("../mark/mixins");
function symbols(fieldDef, symbolsSpec, model, channel, type) {
    if (type === 'gradient') {
        return undefined;
    }
    var symbols = {};
    var mark = model.mark();
    switch (mark) {
        case mark_1.BAR:
        case mark_1.TICK:
        case mark_1.TEXT:
            symbols.shape = { value: 'square' };
            break;
        case mark_1.CIRCLE:
        case mark_1.SQUARE:
            symbols.shape = { value: mark };
            break;
        case mark_1.POINT:
        case mark_1.LINE:
        case mark_1.AREA:
            // use default circle
            break;
    }
    var filled = model.markDef.filled;
    var config = channel === channel_1.COLOR ?
        /* For color's legend, do not set fill (when filled) or stroke (when unfilled) property from config because the legend's `fill` or `stroke` scale should have precedence */
        util_1.without(mark_1.FILL_STROKE_CONFIG, [filled ? 'fill' : 'stroke', 'strokeDash', 'strokeDashOffset']) :
        /* For other legend, no need to omit. */
        mark_1.FILL_STROKE_CONFIG;
    config = util_1.without(config, ['strokeDash', 'strokeDashOffset']);
    common_1.applyMarkConfig(symbols, model, config);
    if (channel !== channel_1.COLOR) {
        var colorMixins = mixins.color(model);
        // If there are field for fill or stroke, remove them as we already apply channels.
        if (colorMixins.fill && (colorMixins.fill['field'] || colorMixins.fill['value'] === 'transparent')) {
            delete colorMixins.fill;
        }
        if (colorMixins.stroke && (colorMixins.stroke['field'] || colorMixins.stroke['value'] === 'transparent')) {
            delete colorMixins.stroke;
        }
        symbols = __assign({}, symbols, colorMixins);
    }
    if (channel !== channel_1.SHAPE) {
        var shapeDef = model.encoding.shape;
        if (fielddef_1.isValueDef(shapeDef)) {
            symbols.shape = { value: shapeDef.value };
        }
    }
    if (channel !== channel_1.OPACITY) {
        var opacity = getOpacityValue(model.encoding.opacity);
        if (opacity) {
            symbols.opacity = { value: opacity };
        }
    }
    symbols = __assign({}, symbols, symbolsSpec);
    return util_1.keys(symbols).length > 0 ? symbols : undefined;
}
exports.symbols = symbols;
function gradient(fieldDef, gradientSpec, model, channel, type) {
    var gradient = {};
    if (type === 'gradient') {
        var opacity = getOpacityValue(model.encoding.opacity);
        if (opacity) {
            gradient.opacity = { value: opacity };
        }
    }
    gradient = __assign({}, gradient, gradientSpec);
    return util_1.keys(gradient).length > 0 ? gradient : undefined;
}
exports.gradient = gradient;
function labels(fieldDef, labelsSpec, model, channel, type) {
    var legend = model.legend(channel);
    var config = model.config;
    var labels = {};
    if (fielddef_1.isTimeFieldDef(fieldDef)) {
        var isUTCScale = model.getScaleComponent(channel).get('type') === scale_1.ScaleType.UTC;
        labelsSpec = __assign({ text: {
                signal: common_1.timeFormatExpression('datum.value', fieldDef.timeUnit, legend.format, config.legend.shortTimeLabels, config.timeFormat, isUTCScale)
            } }, labelsSpec);
    }
    labels = __assign({}, labels, labelsSpec);
    return util_1.keys(labels).length > 0 ? labels : undefined;
}
exports.labels = labels;
function getOpacityValue(opacityDef) {
    if (fielddef_1.isValueDef(opacityDef)) {
        if (fielddef_1.hasConditionalValueDef(opacityDef)) {
            var values = vega_util_1.isArray(opacityDef.condition) ? opacityDef.condition.map(function (c) { return c.value; }) : [opacityDef.condition.value];
            return Math.max.apply(null, [opacityDef.value].concat(values));
        }
        else {
            return opacityDef.value;
        }
    }
    return undefined;
}

},{"../../channel":15,"../../fielddef":100,"../../mark":107,"../../scale":108,"../../util":118,"../common":24,"../mark/mixins":59,"vega-util":10}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var legend_1 = require("../../legend");
var util_1 = require("../../util");
var common_1 = require("../common");
var model_1 = require("../model");
var resolve_1 = require("../resolve");
var split_1 = require("../split");
var split_2 = require("../split");
var component_1 = require("./component");
var encode = require("./encode");
var properties = require("./properties");
function parseLegend(model) {
    if (model_1.isUnitModel(model)) {
        model.component.legends = parseUnitLegend(model);
    }
    else {
        model.component.legends = parseNonUnitLegend(model);
    }
}
exports.parseLegend = parseLegend;
function parseUnitLegend(model) {
    return [channel_1.COLOR, channel_1.SIZE, channel_1.SHAPE, channel_1.OPACITY].reduce(function (legendComponent, channel) {
        if (model.legend(channel)) {
            legendComponent[channel] = parseLegendForChannel(model, channel);
        }
        return legendComponent;
    }, {});
}
function getLegendDefWithScale(model, channel) {
    // For binned field with continuous scale, use a special scale so we can overrride the mark props and labels
    switch (channel) {
        case channel_1.COLOR:
            var scale = model.scaleName(channel_1.COLOR);
            return model.markDef.filled ? { fill: scale } : { stroke: scale };
        case channel_1.SIZE:
            return { size: model.scaleName(channel_1.SIZE) };
        case channel_1.SHAPE:
            return { shape: model.scaleName(channel_1.SHAPE) };
        case channel_1.OPACITY:
            return { opacity: model.scaleName(channel_1.OPACITY) };
    }
    return null;
}
function parseLegendForChannel(model, channel) {
    var fieldDef = model.fieldDef(channel);
    var legend = model.legend(channel);
    var legendCmpt = new component_1.LegendComponent({}, getLegendDefWithScale(model, channel));
    legend_1.LEGEND_PROPERTIES.forEach(function (property) {
        var value = getProperty(property, legend, channel, model);
        if (value !== undefined) {
            var explicit = property === 'values' ?
                !!legend.values : // specified legend.values is already respected, but may get transformed.
                value === legend[property];
            if (explicit || model.config.legend[property] === undefined) {
                legendCmpt.set(property, value, explicit);
            }
        }
    });
    // 2) Add mark property definition groups
    var legendEncoding = legend.encoding || {};
    var legendEncode = ['labels', 'legend', 'title', 'symbols', 'gradient'].reduce(function (e, part) {
        var value = encode[part] ?
            // TODO: replace legendCmpt with type is sufficient
            encode[part](fieldDef, legendEncoding[part], model, channel, legendCmpt.get('type')) : // apply rule
            legendEncoding[part]; // no rule -- just default values
        if (value !== undefined && util_1.keys(value).length > 0) {
            e[part] = { update: value };
        }
        return e;
    }, {});
    if (util_1.keys(legendEncode).length > 0) {
        legendCmpt.set('encode', legendEncode, !!legend.encoding);
    }
    return legendCmpt;
}
exports.parseLegendForChannel = parseLegendForChannel;
function getProperty(property, specifiedLegend, channel, model) {
    var fieldDef = model.fieldDef(channel);
    switch (property) {
        case 'format':
            // We don't include temporal field here as we apply format in encode block
            return common_1.numberFormat(fieldDef, specifiedLegend.format, model.config);
        case 'title':
            return common_1.getSpecifiedOrDefaultValue(specifiedLegend.title, fielddef_1.title(fieldDef, model.config));
        case 'values':
            return properties.values(specifiedLegend);
        case 'type':
            return common_1.getSpecifiedOrDefaultValue(specifiedLegend.type, properties.type(fieldDef.type, channel, model.getScaleComponent(channel).get('type')));
    }
    // Otherwise, return specified property.
    return specifiedLegend[property];
}
function parseNonUnitLegend(model) {
    var _a = model.component, legends = _a.legends, resolve = _a.resolve;
    var _loop_1 = function (child) {
        parseLegend(child);
        util_1.keys(child.component.legends).forEach(function (channel) {
            resolve.legend[channel] = resolve_1.parseGuideResolve(model.component.resolve, channel);
            if (resolve.legend[channel] === 'shared') {
                // If the resolve says shared (and has not been overridden)
                // We will try to merge and see if there is a conflict
                legends[channel] = mergeLegendComponent(legends[channel], child.component.legends[channel]);
                if (!legends[channel]) {
                    // If merge returns nothing, there is a conflict so we cannot make the legend shared.
                    // Thus, mark legend as independent and remove the legend component.
                    resolve.legend[channel] = 'independent';
                    delete legends[channel];
                }
            }
        });
    };
    for (var _i = 0, _b = model.children; _i < _b.length; _i++) {
        var child = _b[_i];
        _loop_1(child);
    }
    util_1.keys(legends).forEach(function (channel) {
        for (var _i = 0, _a = model.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (!child.component.legends[channel]) {
                // skip if the child does not have a particular legend
                continue;
            }
            if (resolve.legend[channel] === 'shared') {
                // After merging shared legend, make sure to remove legend from child
                delete child.component.legends[channel];
            }
        }
    });
    return legends;
}
function mergeLegendComponent(mergedLegend, childLegend) {
    if (!mergedLegend) {
        return childLegend.clone();
    }
    var mergedOrient = mergedLegend.getWithExplicit('orient');
    var childOrient = childLegend.getWithExplicit('orient');
    if (mergedOrient.explicit && childOrient.explicit && mergedOrient.value !== childOrient.value) {
        // TODO: throw warning if resolve is explicit (We don't have info about explicit/implicit resolve yet.)
        // Cannot merge due to inconsistent orient
        return undefined;
    }
    var typeMerged = false;
    var _loop_2 = function (prop) {
        var mergedValueWithExplicit = split_2.mergeValuesWithExplicit(mergedLegend.getWithExplicit(prop), childLegend.getWithExplicit(prop), prop, 'legend', 
        // Tie breaker function
        function (v1, v2) {
            switch (prop) {
                case 'title':
                    return common_1.titleMerger(v1, v2);
                case 'type':
                    // There are only two types. If we have different types, then prefer symbol over gradient.
                    typeMerged = true;
                    return split_1.makeImplicit('symbol');
            }
            return split_2.defaultTieBreaker(v1, v2, prop, 'legend');
        });
        mergedLegend.setWithExplicit(prop, mergedValueWithExplicit);
    };
    // Otherwise, let's merge
    for (var _i = 0, VG_LEGEND_PROPERTIES_1 = legend_1.VG_LEGEND_PROPERTIES; _i < VG_LEGEND_PROPERTIES_1.length; _i++) {
        var prop = VG_LEGEND_PROPERTIES_1[_i];
        _loop_2(prop);
    }
    if (typeMerged) {
        if (((mergedLegend.implicit || {}).encode || {}).gradient) {
            util_1.deleteNestedProperty(mergedLegend.implicit, ['encode', 'gradient']);
        }
        if (((mergedLegend.explicit || {}).encode || {}).gradient) {
            util_1.deleteNestedProperty(mergedLegend.explicit, ['encode', 'gradient']);
        }
    }
    return mergedLegend;
}
exports.mergeLegendComponent = mergeLegendComponent;

},{"../../channel":15,"../../fielddef":100,"../../legend":104,"../../util":118,"../common":24,"../model":66,"../resolve":69,"../split":89,"./component":50,"./encode":51,"./properties":53}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../../channel");
var datetime_1 = require("../../datetime");
var scale_1 = require("../../scale");
var util_1 = require("../../util");
function values(legend) {
    var vals = legend.values;
    if (vals && datetime_1.isDateTime(vals[0])) {
        return vals.map(function (dt) {
            // normalize = true as end user won't put 0 = January
            return { signal: datetime_1.dateTimeExpr(dt, true) };
        });
    }
    return vals;
}
exports.values = values;
function type(type, channel, scaleType) {
    if (channel === channel_1.COLOR && ((type === 'quantitative' && !scale_1.isBinScale(scaleType)) ||
        (type === 'temporal' && util_1.contains(['time', 'utc'], scaleType)))) {
        return 'gradient';
    }
    return undefined;
}
exports.type = type;

},{"../../channel":15,"../../datetime":97,"../../scale":108,"../../util":118}],54:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mixins = require("./mixins");
exports.area = {
    vgMark: 'area',
    encodeEntry: function (model) {
        return __assign({}, mixins.markDefProperties(model.markDef), mixins.pointPosition('x', model, 'zeroOrMin'), mixins.pointPosition('y', model, 'zeroOrMin'), mixins.pointPosition2(model, 'zeroOrMin'), mixins.color(model), mixins.text(model, 'tooltip'), mixins.nonPosition('opacity', model));
    }
};

},{"./mixins":59}],55:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vega_util_1 = require("vega-util");
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var log = require("../../log");
var scale_1 = require("../../scale");
var vega_schema_1 = require("../../vega.schema");
var mixins = require("./mixins");
var ref = require("./valueref");
exports.bar = {
    vgMark: 'rect',
    encodeEntry: function (model) {
        var stack = model.stack;
        return __assign({}, mixins.markDefProperties(model.markDef, true), x(model, stack), y(model, stack), mixins.color(model), mixins.text(model, 'tooltip'), mixins.nonPosition('opacity', model));
    }
};
function x(model, stack) {
    var config = model.config, width = model.width;
    var orient = model.markDef.orient;
    var sizeDef = model.encoding.size;
    var xDef = model.encoding.x;
    var xScaleName = model.scaleName(channel_1.X);
    var xScale = model.getScaleComponent(channel_1.X);
    // x, x2, and width -- we must specify two of these in all conditions
    if (orient === 'horizontal') {
        return __assign({}, mixins.pointPosition('x', model, 'zeroOrMin'), mixins.pointPosition2(model, 'zeroOrMin'));
    }
    else {
        if (fielddef_1.isFieldDef(xDef)) {
            var xScaleType = xScale.get('type');
            if (xDef.bin && !sizeDef && !scale_1.hasDiscreteDomain(xScaleType)) {
                return mixins.binnedPosition(xDef, 'x', model.scaleName('x'), config.bar.binSpacing, xScale.get('reverse'));
            }
            else {
                if (xScaleType === scale_1.ScaleType.BAND) {
                    return mixins.bandPosition(xDef, 'x', model);
                }
            }
        }
        // sized bin, normal point-ordinal axis, quantitative x-axis, or no x
        return mixins.centeredBandPosition('x', model, __assign({}, ref.mid(width)), defaultSizeRef(xScaleName, xScale, config));
    }
}
function y(model, stack) {
    var config = model.config, encoding = model.encoding, height = model.height;
    var orient = model.markDef.orient;
    var sizeDef = encoding.size;
    var yDef = encoding.y;
    var yScaleName = model.scaleName(channel_1.Y);
    var yScale = model.getScaleComponent(channel_1.Y);
    // y, y2 & height -- we must specify two of these in all conditions
    if (orient === 'vertical') {
        return __assign({}, mixins.pointPosition('y', model, 'zeroOrMin'), mixins.pointPosition2(model, 'zeroOrMin'));
    }
    else {
        if (fielddef_1.isFieldDef(yDef)) {
            var yScaleType = yScale.get('type');
            if (yDef.bin && !sizeDef && !scale_1.hasDiscreteDomain(yScaleType)) {
                return mixins.binnedPosition(yDef, 'y', model.scaleName('y'), config.bar.binSpacing, yScale.get('reverse'));
            }
            else if (yScaleType === scale_1.ScaleType.BAND) {
                return mixins.bandPosition(yDef, 'y', model);
            }
        }
        return mixins.centeredBandPosition('y', model, ref.mid(height), defaultSizeRef(yScaleName, yScale, config));
    }
}
function defaultSizeRef(scaleName, scale, config) {
    if (config.bar.discreteBandSize) {
        return { value: config.bar.discreteBandSize };
    }
    if (scale) {
        var scaleType = scale.get('type');
        if (scaleType === scale_1.ScaleType.POINT) {
            var scaleRange = scale.get('range');
            if (vega_schema_1.isVgRangeStep(scaleRange) && vega_util_1.isNumber(scaleRange.step)) {
                return { value: scaleRange.step - 1 };
            }
            log.warn(log.message.BAR_WITH_POINT_SCALE_AND_RANGESTEP_NULL);
        }
        else if (scaleType === scale_1.ScaleType.BAND) {
            return ref.band(scaleName);
        }
        else {
            return { value: config.bar.continuousBandSize };
        }
    }
    if (config.scale.rangeStep && config.scale.rangeStep !== null) {
        return { value: config.scale.rangeStep - 1 };
    }
    return { value: 20 };
}

},{"../../channel":15,"../../fielddef":100,"../../log":105,"../../scale":108,"../../vega.schema":120,"./mixins":59,"./valueref":65,"vega-util":10}],56:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var encoding_1 = require("../../encoding");
var fielddef_1 = require("../../fielddef");
var log = require("../../log");
var mark_1 = require("../../mark");
var type_1 = require("../../type");
var util_1 = require("../../util");
var common_1 = require("../common");
function normalizeMarkDef(mark, encoding, config) {
    var markDef = mark_1.isMarkDef(mark) ? __assign({}, mark) : { type: mark };
    var specifiedOrient = markDef.orient || common_1.getMarkConfig('orient', markDef, config);
    markDef.orient = orient(markDef.type, encoding, specifiedOrient);
    if (specifiedOrient !== undefined && specifiedOrient !== markDef.orient) {
        log.warn(log.message.orientOverridden(markDef.orient, specifiedOrient));
    }
    var specifiedFilled = markDef.filled;
    if (specifiedFilled === undefined) {
        markDef.filled = filled(markDef, config);
    }
    return markDef;
}
exports.normalizeMarkDef = normalizeMarkDef;
/**
 * Initialize encoding's value with some special default values
 */
function initEncoding(mark, encoding, stacked, config) {
    var opacityConfig = common_1.getMarkConfig('opacity', mark, config);
    if (!encoding.opacity && opacityConfig === undefined) {
        var opacity = defaultOpacity(mark.type, encoding, stacked);
        if (opacity !== undefined) {
            encoding.opacity = { value: opacity };
        }
    }
    return encoding;
}
exports.initEncoding = initEncoding;
function defaultOpacity(mark, encoding, stacked) {
    if (util_1.contains([mark_1.POINT, mark_1.TICK, mark_1.CIRCLE, mark_1.SQUARE], mark)) {
        // point-based marks
        if (!encoding_1.isAggregate(encoding)) {
            return 0.7;
        }
    }
    return undefined;
}
function filled(markDef, config) {
    var filledConfig = common_1.getMarkConfig('filled', markDef, config);
    var mark = markDef.type;
    return filledConfig !== undefined ? filledConfig : mark !== mark_1.POINT && mark !== mark_1.LINE && mark !== mark_1.RULE;
}
function orient(mark, encoding, specifiedOrient) {
    switch (mark) {
        case mark_1.POINT:
        case mark_1.CIRCLE:
        case mark_1.SQUARE:
        case mark_1.TEXT:
        case mark_1.RECT:
            // orient is meaningless for these marks.
            return undefined;
    }
    var yIsRange = encoding.y2;
    var xIsRange = encoding.x2;
    switch (mark) {
        case mark_1.RULE:
        case mark_1.BAR:
        case mark_1.AREA:
            // If there are range for both x and y, y (vertical) has higher precedence.
            if (yIsRange) {
                return 'vertical';
            }
            else if (xIsRange) {
                return 'horizontal';
            }
            else if (mark === mark_1.RULE) {
                if (encoding.x && !encoding.y) {
                    return 'vertical';
                }
                else if (encoding.y && !encoding.x) {
                    return 'horizontal';
                }
            }
        /* tslint:disable */
        case mark_1.LINE: // intentional fall through
        case mark_1.TICK:// Tick is opposite to bar, line, area and never have ranged mark.
            /* tslint:enable */
            var xIsContinuous = fielddef_1.isFieldDef(encoding.x) && fielddef_1.isContinuous(encoding.x);
            var yIsContinuous = fielddef_1.isFieldDef(encoding.y) && fielddef_1.isContinuous(encoding.y);
            if (xIsContinuous && !yIsContinuous) {
                return mark !== 'tick' ? 'horizontal' : 'vertical';
            }
            else if (!xIsContinuous && yIsContinuous) {
                return mark !== 'tick' ? 'vertical' : 'horizontal';
            }
            else if (xIsContinuous && yIsContinuous) {
                var xDef = encoding.x; // we can cast here since they are surely fieldDef
                var yDef = encoding.y;
                var xIsTemporal = xDef.type === type_1.TEMPORAL;
                var yIsTemporal = yDef.type === type_1.TEMPORAL;
                // temporal without timeUnit is considered continuous, but better serves as dimension
                if (xIsTemporal && !yIsTemporal) {
                    return mark !== 'tick' ? 'vertical' : 'horizontal';
                }
                else if (!xIsTemporal && yIsTemporal) {
                    return mark !== 'tick' ? 'horizontal' : 'vertical';
                }
                if (!xDef.aggregate && yDef.aggregate) {
                    return mark !== 'tick' ? 'vertical' : 'horizontal';
                }
                else if (xDef.aggregate && !yDef.aggregate) {
                    return mark !== 'tick' ? 'horizontal' : 'vertical';
                }
                if (specifiedOrient) {
                    // When ambiguous, use user specified one.
                    return specifiedOrient;
                }
                if (!(mark === mark_1.LINE && encoding.order)) {
                    // Except for connected scatterplot, we should log warning for unclear orientation of QxQ plots.
                    log.warn(log.message.unclearOrientContinuous(mark));
                }
                return 'vertical';
            }
            else {
                // For Discrete x Discrete case, return undefined.
                log.warn(log.message.unclearOrientDiscreteOrEmpty(mark));
                return undefined;
            }
    }
    return 'vertical';
}

},{"../../encoding":98,"../../fielddef":100,"../../log":105,"../../mark":107,"../../type":117,"../../util":118,"../common":24}],57:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mixins = require("./mixins");
var ref = require("./valueref");
exports.line = {
    vgMark: 'line',
    encodeEntry: function (model) {
        var width = model.width, height = model.height;
        return __assign({}, mixins.markDefProperties(model.markDef, true), mixins.pointPosition('x', model, ref.mid(width)), mixins.pointPosition('y', model, ref.mid(height)), mixins.color(model), mixins.text(model, 'tooltip'), mixins.nonPosition('opacity', model), mixins.nonPosition('size', model, {
            vgChannel: 'strokeWidth' // VL's line size is strokeWidth
        }));
    }
};

},{"./mixins":59,"./valueref":65}],58:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vega_util_1 = require("vega-util");
var channel_1 = require("../../channel");
var data_1 = require("../../data");
var encoding_1 = require("../../encoding");
var fielddef_1 = require("../../fielddef");
var mark_1 = require("../../mark");
var sort_1 = require("../../sort");
var util_1 = require("../../util");
var common_1 = require("../common");
var area_1 = require("./area");
var bar_1 = require("./bar");
var line_1 = require("./line");
var point_1 = require("./point");
var rect_1 = require("./rect");
var rule_1 = require("./rule");
var text_1 = require("./text");
var tick_1 = require("./tick");
var markCompiler = {
    area: area_1.area,
    bar: bar_1.bar,
    line: line_1.line,
    point: point_1.point,
    text: text_1.text,
    tick: tick_1.tick,
    rect: rect_1.rect,
    rule: rule_1.rule,
    circle: point_1.circle,
    square: point_1.square
};
function parseMarkGroup(model) {
    if (util_1.contains([mark_1.LINE, mark_1.AREA], model.mark())) {
        return parsePathMark(model);
    }
    else {
        return parseNonPathMark(model);
    }
}
exports.parseMarkGroup = parseMarkGroup;
var FACETED_PATH_PREFIX = 'faceted_path_';
function parsePathMark(model) {
    var mark = model.mark();
    // FIXME: replace this with more general case for composition
    var details = detailFields(model);
    var clip = model.markDef.clip !== undefined ? !!model.markDef.clip : scaleClip(model);
    var style = common_1.getStyles(model.markDef);
    var sort = getPathSort(model);
    var pathMarks = [
        __assign({ name: model.getName('marks'), type: markCompiler[mark].vgMark }, (clip ? { clip: true } : {}), (style ? { style: style } : {}), (sort ? { sort: sort } : {}), { 
            // If has subfacet for line/area group, need to use faceted data from below.
            // FIXME: support sorting path order (in connected scatterplot)
            from: { data: (details.length > 0 ? FACETED_PATH_PREFIX : '') + model.requestDataName(data_1.MAIN) }, encode: { update: markCompiler[mark].encodeEntry(model) } })
    ];
    if (details.length > 0) {
        // TODO: for non-stacked plot, map order to zindex. (Maybe rename order for layer to zindex?)
        return [{
                name: model.getName('pathgroup'),
                type: 'group',
                from: {
                    facet: {
                        name: FACETED_PATH_PREFIX + model.requestDataName(data_1.MAIN),
                        data: model.requestDataName(data_1.MAIN),
                        groupby: details,
                    }
                },
                encode: {
                    update: {
                        width: { field: { group: 'width' } },
                        height: { field: { group: 'height' } }
                    }
                },
                marks: pathMarks
            }];
    }
    else {
        return pathMarks;
    }
}
function getPathSort(model) {
    if (model.mark() === 'line' && model.channelHasField('order')) {
        // For only line, sort by the order field if it is specified.
        return common_1.sortParams(model.encoding.order, { expr: 'datum' });
    }
    else {
        // For both line and area, we sort values based on dimension by default
        var dimensionChannel = model.markDef.orient === 'horizontal' ? 'y' : 'x';
        var s = model.sort(dimensionChannel);
        var sortField = sort_1.isSortField(s) ?
            fielddef_1.field({
                // FIXME: this op might not already exist?
                // FIXME: what if dimensionChannel (x or y) contains custom domain?
                aggregate: encoding_1.isAggregate(model.encoding) ? s.op : undefined,
                field: s.field
            }, { expr: 'datum' }) :
            model.field(dimensionChannel, {
                // For stack with imputation, we only have bin_mid
                binSuffix: model.stack && model.stack.impute ? 'mid' : undefined,
                expr: 'datum'
            });
        return sortField ?
            {
                field: sortField,
                order: 'descending'
            } :
            undefined;
    }
}
exports.getPathSort = getPathSort;
function parseNonPathMark(model) {
    var mark = model.mark();
    var style = common_1.getStyles(model.markDef);
    var clip = model.markDef.clip !== undefined ? !!model.markDef.clip : scaleClip(model);
    var marks = []; // TODO: vgMarks
    // TODO: for non-stacked plot, map order to zindex. (Maybe rename order for layer to zindex?)
    marks.push(__assign({ name: model.getName('marks'), type: markCompiler[mark].vgMark }, (clip ? { clip: true } : {}), (style ? { style: style } : {}), { from: { data: model.requestDataName(data_1.MAIN) }, encode: { update: markCompiler[mark].encodeEntry(model) } }));
    return marks;
}
/**
 * Returns list of detail (group-by) fields
 * that the model's spec contains.
 */
function detailFields(model) {
    return channel_1.NONPOSITION_CHANNELS.reduce(function (details, channel) {
        var encoding = model.encoding;
        if (channel === 'order') {
            return details;
        }
        if (channel === 'detail') {
            var channelDef = encoding[channel];
            if (channelDef) {
                (vega_util_1.isArray(channelDef) ? channelDef : [channelDef]).forEach(function (fieldDef) {
                    if (!fieldDef.aggregate) {
                        details.push(fielddef_1.field(fieldDef, {}));
                    }
                });
            }
        }
        else {
            var fieldDef = fielddef_1.getFieldDef(encoding[channel]);
            if (fieldDef && !fieldDef.aggregate) {
                details.push(fielddef_1.field(fieldDef, {}));
            }
        }
        return details;
    }, []);
}
/**
 * If scales are bound to interval selections, we want to automatically clip
 * marks to account for panning/zooming interactions. We identify bound scales
 * by the domainRaw property, which gets added during scale parsing.
 */
function scaleClip(model) {
    var xScale = model.getScaleComponent('x');
    var yScale = model.getScaleComponent('y');
    return (xScale && xScale.get('domainRaw')) ||
        (yScale && yScale.get('domainRaw')) ? true : false;
}

},{"../../channel":15,"../../data":96,"../../encoding":98,"../../fielddef":100,"../../mark":107,"../../sort":110,"../../util":118,"../common":24,"./area":54,"./bar":55,"./line":57,"./point":60,"./rect":61,"./rule":62,"./text":63,"./tick":64,"vega-util":10}],59:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vega_util_1 = require("vega-util");
var fielddef_1 = require("../../fielddef");
var log = require("../../log");
var util = require("../../util");
var vega_schema_1 = require("../../vega.schema");
var common_1 = require("../common");
var selection_1 = require("../selection/selection");
var ref = require("./valueref");
function color(model) {
    var config = model.config;
    var filled = model.markDef.filled;
    var vgChannel = filled ? 'fill' : 'stroke';
    var e = nonPosition('color', model, {
        vgChannel: vgChannel,
        // Mark definition has higher predecence than config;
        // fill/stroke has higher precedence than color.
        defaultValue: model.markDef[vgChannel] ||
            model.markDef.color ||
            common_1.getMarkConfig(vgChannel, model.markDef, config) ||
            common_1.getMarkConfig('color', model.markDef, config)
    });
    // If there is no fill, always fill symbols
    // with transparent fills https://github.com/vega/vega-lite/issues/1316
    if (!e.fill && util.contains(['bar', 'point', 'circle', 'square'], model.mark())) {
        e.fill = { value: 'transparent' };
    }
    return e;
}
exports.color = color;
function markDefProperties(mark, ignoreOrient) {
    return vega_schema_1.VG_MARK_CONFIGS.reduce(function (m, prop) {
        if (mark[prop] && (!ignoreOrient || prop !== 'orient')) {
            m[prop] = { value: mark[prop] };
        }
        return m;
    }, {});
}
exports.markDefProperties = markDefProperties;
function valueIfDefined(prop, value) {
    if (value !== undefined) {
        return _a = {}, _a[prop] = { value: value }, _a;
    }
    return undefined;
    var _a;
}
exports.valueIfDefined = valueIfDefined;
/**
 * Return mixins for non-positional channels with scales.  (Text doesn't have scale.)
 */
function nonPosition(channel, model, opt) {
    // TODO: refactor how we refer to scale as discussed in https://github.com/vega/vega-lite/pull/1613
    if (opt === void 0) { opt = {}; }
    var defaultValue = opt.defaultValue, vgChannel = opt.vgChannel;
    var defaultRef = opt.defaultRef || (defaultValue !== undefined ? { value: defaultValue } : undefined);
    var channelDef = model.encoding[channel];
    return wrapCondition(model, channelDef, vgChannel || channel, function (cDef) {
        return ref.midPoint(channel, cDef, model.scaleName(channel), model.getScaleComponent(channel), null, // No need to provide stack for non-position as it does not affect mid point
        defaultRef);
    });
}
exports.nonPosition = nonPosition;
/**
 * Return a mixin that include a Vega production rule for a Vega-Lite conditional channel definition.
 * or a simple mixin if channel def has no condition.
 */
function wrapCondition(model, channelDef, vgChannel, refFn) {
    var condition = channelDef && channelDef.condition;
    var valueRef = refFn(channelDef);
    if (condition) {
        var conditions = vega_util_1.isArray(condition) ? condition : [condition];
        var vgConditions = conditions.map(function (c) {
            var conditionValueRef = refFn(c);
            return __assign({ test: selection_1.predicate(model, c.selection) }, conditionValueRef);
        });
        return _a = {},
            _a[vgChannel] = vgConditions.concat((valueRef !== undefined ? [valueRef] : [])),
            _a;
    }
    else {
        return valueRef !== undefined ? (_b = {}, _b[vgChannel] = valueRef, _b) : {};
    }
    var _a, _b;
}
function text(model, channel) {
    if (channel === void 0) { channel = 'text'; }
    var channelDef = model.encoding[channel];
    return wrapCondition(model, channelDef, channel, function (cDef) { return ref.text(cDef, model.config); });
}
exports.text = text;
function bandPosition(fieldDef, channel, model) {
    var scaleName = model.scaleName(channel);
    var sizeChannel = channel === 'x' ? 'width' : 'height';
    if (model.encoding.size) {
        var orient = model.markDef.orient;
        if (orient) {
            var centeredBandPositionMixins = (_a = {},
                // Use xc/yc and place the mark at the middle of the band
                // This way we never have to deal with size's condition for x/y position.
                _a[channel + 'c'] = ref.fieldRef(fieldDef, scaleName, {}, { band: 0.5 }),
                _a);
            if (fielddef_1.getFieldDef(model.encoding.size)) {
                log.warn(log.message.cannotUseSizeFieldWithBandSize(channel));
                // TODO: apply size to band and set scale range to some values between 0-1.
                // return {
                //   ...centeredBandPositionMixins,
                //   ...bandSize('size', model, {vgChannel: sizeChannel})
                // };
            }
            else if (fielddef_1.isValueDef(model.encoding.size)) {
                return __assign({}, centeredBandPositionMixins, nonPosition('size', model, { vgChannel: sizeChannel }));
            }
        }
        else {
            log.warn(log.message.cannotApplySizeToNonOrientedMark(model.markDef.type));
        }
    }
    return _b = {},
        _b[channel] = ref.fieldRef(fieldDef, scaleName, { binSuffix: 'range' }),
        _b[sizeChannel] = ref.band(scaleName),
        _b;
    var _a, _b;
}
exports.bandPosition = bandPosition;
function centeredBandPosition(channel, model, defaultPosRef, defaultSizeRef) {
    var centerChannel = channel === 'x' ? 'xc' : 'yc';
    var sizeChannel = channel === 'x' ? 'width' : 'height';
    return __assign({}, pointPosition(channel, model, defaultPosRef, centerChannel), nonPosition('size', model, { defaultRef: defaultSizeRef, vgChannel: sizeChannel }));
}
exports.centeredBandPosition = centeredBandPosition;
function binnedPosition(fieldDef, channel, scaleName, spacing, reverse) {
    if (channel === 'x') {
        return {
            x2: ref.bin(fieldDef, scaleName, 'start', reverse ? 0 : spacing),
            x: ref.bin(fieldDef, scaleName, 'end', reverse ? spacing : 0)
        };
    }
    else {
        return {
            y2: ref.bin(fieldDef, scaleName, 'start', reverse ? spacing : 0),
            y: ref.bin(fieldDef, scaleName, 'end', reverse ? 0 : spacing)
        };
    }
}
exports.binnedPosition = binnedPosition;
/**
 * Return mixins for point (non-band) position channels.
 */
function pointPosition(channel, model, defaultRef, vgChannel) {
    // TODO: refactor how refer to scale as discussed in https://github.com/vega/vega-lite/pull/1613
    var encoding = model.encoding, stack = model.stack;
    var valueRef = ref.stackable(channel, encoding[channel], model.scaleName(channel), model.getScaleComponent(channel), stack, defaultRef);
    return _a = {},
        _a[vgChannel || channel] = valueRef,
        _a;
    var _a;
}
exports.pointPosition = pointPosition;
/**
 * Return mixins for x2, y2.
 * If channel is not specified, return one channel based on orientation.
 */
function pointPosition2(model, defaultRef, channel) {
    var encoding = model.encoding, markDef = model.markDef, stack = model.stack;
    channel = channel || (markDef.orient === 'horizontal' ? 'x2' : 'y2');
    var baseChannel = channel === 'x2' ? 'x' : 'y';
    var valueRef = ref.stackable2(channel, encoding[baseChannel], encoding[channel], model.scaleName(baseChannel), model.getScaleComponent(baseChannel), stack, defaultRef);
    return _a = {}, _a[channel] = valueRef, _a;
    var _a;
}
exports.pointPosition2 = pointPosition2;

},{"../../fielddef":100,"../../log":105,"../../util":118,"../../vega.schema":120,"../common":24,"../selection/selection":79,"./valueref":65,"vega-util":10}],60:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../common");
var mixins = require("./mixins");
var ref = require("./valueref");
function encodeEntry(model, fixedShape) {
    var config = model.config, width = model.width, height = model.height;
    return __assign({}, mixins.markDefProperties(model.markDef, true), mixins.pointPosition('x', model, ref.mid(width)), mixins.pointPosition('y', model, ref.mid(height)), mixins.color(model), mixins.text(model, 'tooltip'), mixins.nonPosition('size', model), shapeMixins(model, config, fixedShape), mixins.nonPosition('opacity', model));
}
function shapeMixins(model, config, fixedShape) {
    if (fixedShape) {
        return { shape: { value: fixedShape } };
    }
    return mixins.nonPosition('shape', model, { defaultValue: common_1.getMarkConfig('shape', model.markDef, config) });
}
exports.shapeMixins = shapeMixins;
exports.point = {
    vgMark: 'symbol',
    encodeEntry: function (model) {
        return encodeEntry(model);
    }
};
exports.circle = {
    vgMark: 'symbol',
    encodeEntry: function (model) {
        return encodeEntry(model, 'circle');
    }
};
exports.square = {
    vgMark: 'symbol',
    encodeEntry: function (model) {
        return encodeEntry(model, 'square');
    }
};

},{"../common":24,"./mixins":59,"./valueref":65}],61:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var log = require("../../log");
var mark_1 = require("../../mark");
var scale_1 = require("../../scale");
var mixins = require("./mixins");
exports.rect = {
    vgMark: 'rect',
    encodeEntry: function (model) {
        return __assign({}, mixins.markDefProperties(model.markDef, true), x(model), y(model), mixins.color(model), mixins.text(model, 'tooltip'), mixins.nonPosition('opacity', model));
    }
};
function x(model) {
    var xDef = model.encoding.x;
    var x2Def = model.encoding.x2;
    var xScale = model.getScaleComponent(channel_1.X);
    var xScaleType = xScale ? xScale.get('type') : undefined;
    if (fielddef_1.isFieldDef(xDef) && xDef.bin && !x2Def) {
        return mixins.binnedPosition(xDef, 'x', model.scaleName('x'), 0, xScale.get('reverse'));
    }
    else if (fielddef_1.isFieldDef(xDef) && xScale && scale_1.hasDiscreteDomain(xScaleType)) {
        /* istanbul ignore else */
        if (xScaleType === scale_1.ScaleType.BAND) {
            return mixins.bandPosition(xDef, 'x', model);
        }
        else {
            // We don't support rect mark with point/ordinal scale
            throw new Error(log.message.scaleTypeNotWorkWithMark(mark_1.RECT, xScaleType));
        }
    }
    else {
        return __assign({}, mixins.pointPosition('x', model, 'zeroOrMax'), mixins.pointPosition2(model, 'zeroOrMin', 'x2'));
    }
}
function y(model) {
    var yDef = model.encoding.y;
    var y2Def = model.encoding.y2;
    var yScale = model.getScaleComponent(channel_1.Y);
    var yScaleType = yScale ? yScale.get('type') : undefined;
    if (fielddef_1.isFieldDef(yDef) && yDef.bin && !y2Def) {
        return mixins.binnedPosition(yDef, 'y', model.scaleName('y'), 0, yScale.get('reverse'));
    }
    else if (fielddef_1.isFieldDef(yDef) && yScale && scale_1.hasDiscreteDomain(yScaleType)) {
        /* istanbul ignore else */
        if (yScaleType === scale_1.ScaleType.BAND) {
            return mixins.bandPosition(yDef, 'y', model);
        }
        else {
            // We don't support rect mark with point/ordinal scale
            throw new Error(log.message.scaleTypeNotWorkWithMark(mark_1.RECT, yScaleType));
        }
    }
    else {
        return __assign({}, mixins.pointPosition('y', model, 'zeroOrMax'), mixins.pointPosition2(model, 'zeroOrMin', 'y2'));
    }
}

},{"../../channel":15,"../../fielddef":100,"../../log":105,"../../mark":107,"../../scale":108,"./mixins":59}],62:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mixins = require("./mixins");
var ref = require("./valueref");
exports.rule = {
    vgMark: 'rule',
    encodeEntry: function (model) {
        var _config = model.config, markDef = model.markDef, width = model.width, height = model.height;
        var orient = markDef.orient;
        if (!model.encoding.x && !model.encoding.y) {
            // if we have neither x or y, show nothing
            return {};
        }
        return __assign({}, mixins.markDefProperties(model.markDef, true), mixins.pointPosition('x', model, orient === 'horizontal' ? 'zeroOrMin' : ref.mid(width)), mixins.pointPosition('y', model, orient === 'vertical' ? 'zeroOrMin' : ref.mid(height)), mixins.pointPosition2(model, 'zeroOrMax'), mixins.color(model), mixins.text(model, 'tooltip'), mixins.nonPosition('opacity', model), mixins.nonPosition('size', model, {
            vgChannel: 'strokeWidth' // VL's rule size is strokeWidth
        }));
    }
};

},{"./mixins":59,"./valueref":65}],63:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../../channel");
var encoding_1 = require("../../encoding");
var fielddef_1 = require("../../fielddef");
var type_1 = require("../../type");
var common_1 = require("../common");
var mixins = require("./mixins");
var ref = require("./valueref");
exports.text = {
    vgMark: 'text',
    encodeEntry: function (model) {
        var config = model.config, encoding = model.encoding, height = model.height;
        var textDef = encoding.text;
        return __assign({}, mixins.markDefProperties(model.markDef, true), mixins.pointPosition('x', model, xDefault(config, textDef)), mixins.pointPosition('y', model, ref.mid(height)), mixins.text(model), mixins.color(model), mixins.text(model, 'tooltip'), mixins.nonPosition('opacity', model), mixins.nonPosition('size', model, {
            vgChannel: 'fontSize' // VL's text size is fontSize
        }), mixins.valueIfDefined('align', align(model.markDef, encoding, config)));
    }
};
function xDefault(config, textDef) {
    if (fielddef_1.isFieldDef(textDef) && textDef.type === type_1.QUANTITATIVE) {
        return { field: { group: 'width' }, offset: -5 };
    }
    // TODO: allow this to fit (Be consistent with ref.midX())
    return { value: config.scale.textXRangeStep / 2 };
}
function align(markDef, encoding, config) {
    var align = markDef.align || common_1.getMarkConfig('align', markDef, config);
    if (align === undefined) {
        return encoding_1.channelHasField(encoding, channel_1.X) ? 'center' : 'right';
    }
    // If there is a config, Vega-parser will process this already.
    return undefined;
}

},{"../../channel":15,"../../encoding":98,"../../fielddef":100,"../../type":117,"../common":24,"./mixins":59,"./valueref":65}],64:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vega_schema_1 = require("../../vega.schema");
var mixins = require("./mixins");
var ref = require("./valueref");
exports.tick = {
    vgMark: 'rect',
    encodeEntry: function (model) {
        var config = model.config, markDef = model.markDef, width = model.width, height = model.height;
        var orient = markDef.orient;
        var vgSizeChannel = orient === 'horizontal' ? 'width' : 'height';
        var vgThicknessChannel = orient === 'horizontal' ? 'height' : 'width';
        return __assign({}, mixins.markDefProperties(model.markDef, true), mixins.pointPosition('x', model, ref.mid(width), 'xc'), mixins.pointPosition('y', model, ref.mid(height), 'yc'), mixins.nonPosition('size', model, {
            defaultValue: defaultSize(model),
            vgChannel: vgSizeChannel
        }), (_a = {}, _a[vgThicknessChannel] = { value: config.tick.thickness }, _a), mixins.color(model), mixins.nonPosition('opacity', model));
        var _a;
    }
};
function defaultSize(model) {
    var config = model.config;
    var orient = model.markDef.orient;
    var scale = model.getScaleComponent(orient === 'horizontal' ? 'x' : 'y');
    if (config.tick.bandSize !== undefined) {
        return config.tick.bandSize;
    }
    else {
        var scaleRange = scale ? scale.get('range') : undefined;
        var rangeStep = scaleRange && vega_schema_1.isVgRangeStep(scaleRange) ?
            scaleRange.step :
            config.scale.rangeStep;
        if (typeof rangeStep !== 'number') {
            // FIXME consolidate this log
            throw new Error('Function does not handle non-numeric rangeStep');
        }
        return rangeStep / 1.5;
    }
}

},{"../../vega.schema":120,"./mixins":59,"./valueref":65}],65:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Utility files for producing Vega ValueRef for marks
 */
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var scale_1 = require("../../scale");
var util_1 = require("../../util");
var common_1 = require("../common");
// TODO: we need to find a way to refactor these so that scaleName is a part of scale
// but that's complicated.  For now, this is a huge step moving forward.
/**
 * @return Vega ValueRef for stackable x or y
 */
function stackable(channel, channelDef, scaleName, scale, stack, defaultRef) {
    if (fielddef_1.isFieldDef(channelDef) && stack && channel === stack.fieldChannel) {
        // x or y use stack_end so that stacked line's point mark use stack_end too.
        return fieldRef(channelDef, scaleName, { suffix: 'end' });
    }
    return midPoint(channel, channelDef, scaleName, scale, stack, defaultRef);
}
exports.stackable = stackable;
/**
 * @return Vega ValueRef for stackable x2 or y2
 */
function stackable2(channel, aFieldDef, a2fieldDef, scaleName, scale, stack, defaultRef) {
    if (fielddef_1.isFieldDef(aFieldDef) && stack &&
        // If fieldChannel is X and channel is X2 (or Y and Y2)
        channel.charAt(0) === stack.fieldChannel.charAt(0)) {
        return fieldRef(aFieldDef, scaleName, { suffix: 'start' });
    }
    return midPoint(channel, a2fieldDef, scaleName, scale, stack, defaultRef);
}
exports.stackable2 = stackable2;
/**
 * Value Ref for binned fields
 */
function bin(fieldDef, scaleName, side, offset) {
    var binSuffix = side === 'start' ? undefined : 'end';
    return fieldRef(fieldDef, scaleName, { binSuffix: binSuffix }, offset ? { offset: offset } : {});
}
exports.bin = bin;
function fieldRef(fieldDef, scaleName, opt, mixins) {
    var ref = {
        scale: scaleName,
        field: fielddef_1.field(fieldDef, opt),
    };
    if (mixins) {
        return __assign({}, ref, mixins);
    }
    return ref;
}
exports.fieldRef = fieldRef;
function band(scaleName, band) {
    if (band === void 0) { band = true; }
    return {
        scale: scaleName,
        band: band
    };
}
exports.band = band;
/**
 * Signal that returns the middle of a bin. Should only be used with x and y.
 */
function binMidSignal(fieldDef, scaleName) {
    return {
        signal: "(" +
            ("scale(\"" + scaleName + "\", " + fielddef_1.field(fieldDef, { expr: 'datum' }) + ")") +
            " + " +
            ("scale(\"" + scaleName + "\", " + fielddef_1.field(fieldDef, { binSuffix: 'end', expr: 'datum' }) + ")") +
            ")/2"
    };
}
/**
 * @returns {VgValueRef} Value Ref for xc / yc or mid point for other channels.
 */
function midPoint(channel, channelDef, scaleName, scale, stack, defaultRef) {
    // TODO: datum support
    if (channelDef) {
        /* istanbul ignore else */
        if (fielddef_1.isFieldDef(channelDef)) {
            if (channelDef.bin) {
                // Use middle only for x an y to place marks in the center between start and end of the bin range.
                // We do not use the mid point for other channels (e.g. size) so that properties of legends and marks match.
                if (util_1.contains(['x', 'y'], channel) && channelDef.type === 'quantitative') {
                    if (stack && stack.impute) {
                        // For stack, we computed bin_mid so we can impute.
                        return fieldRef(channelDef, scaleName, { binSuffix: 'mid' });
                    }
                    // For non-stack, we can just calculate bin mid on the fly using signal.
                    return binMidSignal(channelDef, scaleName);
                }
                return fieldRef(channelDef, scaleName, common_1.binRequiresRange(channelDef, channel) ? { binSuffix: 'range' } : {});
            }
            var scaleType = scale.get('type');
            if (scale_1.hasDiscreteDomain(scaleType)) {
                if (scaleType === 'band') {
                    // For band, to get mid point, need to offset by half of the band
                    return fieldRef(channelDef, scaleName, { binSuffix: 'range' }, { band: 0.5 });
                }
                return fieldRef(channelDef, scaleName, { binSuffix: 'range' });
            }
            else {
                return fieldRef(channelDef, scaleName, {}); // no need for bin suffix
            }
        }
        else if (fielddef_1.isValueDef(channelDef)) {
            return { value: channelDef.value };
        }
        else {
            throw new Error('A channel definition has neither field nor value.'); // FIXME add this to log.message
        }
    }
    if (defaultRef === 'zeroOrMin') {
        /* istanbul ignore else */
        if (channel === channel_1.X || channel === channel_1.X2) {
            return zeroOrMinX(scaleName, scale);
        }
        else if (channel === channel_1.Y || channel === channel_1.Y2) {
            return zeroOrMinY(scaleName, scale);
        }
        else {
            throw new Error("Unsupported channel " + channel + " for base function"); // FIXME add this to log.message
        }
    }
    else if (defaultRef === 'zeroOrMax') {
        /* istanbul ignore else */
        if (channel === channel_1.X || channel === channel_1.X2) {
            return zeroOrMaxX(scaleName, scale);
        }
        else if (channel === channel_1.Y || channel === channel_1.Y2) {
            return zeroOrMaxY(scaleName, scale);
        }
        else {
            throw new Error("Unsupported channel " + channel + " for base function"); // FIXME add this to log.message
        }
    }
    return defaultRef;
}
exports.midPoint = midPoint;
function text(textDef, config) {
    // text
    if (textDef) {
        if (fielddef_1.isFieldDef(textDef)) {
            return common_1.formatSignalRef(textDef, textDef.format, 'datum', config);
        }
        else if (fielddef_1.isValueDef(textDef)) {
            return { value: textDef.value };
        }
    }
    return undefined;
}
exports.text = text;
function mid(sizeRef) {
    return __assign({}, sizeRef, { mult: 0.5 });
}
exports.mid = mid;
function zeroOrMinX(scaleName, scale) {
    if (scaleName) {
        // Log / Time / UTC scale do not support zero
        if (!util_1.contains([scale_1.ScaleType.LOG, scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scale.get('type')) &&
            scale.get('zero') !== false) {
            return {
                scale: scaleName,
                value: 0
            };
        }
    }
    // Put the mark on the x-axis
    return { value: 0 };
}
/**
 * @returns {VgValueRef} base value if scale exists and return max value if scale does not exist
 */
function zeroOrMaxX(scaleName, scale) {
    if (scaleName) {
        // Log / Time / UTC scale do not support zero
        if (!util_1.contains([scale_1.ScaleType.LOG, scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scale.get('type')) &&
            scale.get('zero') !== false) {
            return {
                scale: scaleName,
                value: 0
            };
        }
    }
    return { field: { group: 'width' } };
}
function zeroOrMinY(scaleName, scale) {
    if (scaleName) {
        // Log / Time / UTC scale do not support zero
        if (!util_1.contains([scale_1.ScaleType.LOG, scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scale.get('type')) &&
            scale.get('zero') !== false) {
            return {
                scale: scaleName,
                value: 0
            };
        }
    }
    // Put the mark on the y-axis
    return { field: { group: 'height' } };
}
/**
 * @returns {VgValueRef} base value if scale exists and return max value if scale does not exist
 */
function zeroOrMaxY(scaleName, scale) {
    if (scaleName) {
        // Log / Time / UTC scale do not support zero
        if (!util_1.contains([scale_1.ScaleType.LOG, scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scale.get('type')) &&
            scale.get('zero') !== false) {
            return {
                scale: scaleName,
                value: 0
            };
        }
    }
    // Put the mark on the y-axis
    return { value: 0 };
}

},{"../../channel":15,"../../fielddef":100,"../../scale":108,"../../util":118,"../common":24}],66:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vega_util_1 = require("vega-util");
var channel_1 = require("../channel");
var encoding_1 = require("../encoding");
var fielddef_1 = require("../fielddef");
var log = require("../log");
var scale_1 = require("../scale");
var title_1 = require("../title");
var transform_1 = require("../transform");
var util_1 = require("../util");
var vega_schema_1 = require("../vega.schema");
var assemble_1 = require("./axis/assemble");
var header_1 = require("./layout/header");
var assemble_2 = require("./layoutsize/assemble");
var assemble_3 = require("./legend/assemble");
var parse_1 = require("./legend/parse");
var assemble_4 = require("./scale/assemble");
var domain_1 = require("./scale/domain");
var parse_2 = require("./scale/parse");
var split_1 = require("./split");
var NameMap = /** @class */ (function () {
    function NameMap() {
        this.nameMap = {};
    }
    NameMap.prototype.rename = function (oldName, newName) {
        this.nameMap[oldName] = newName;
    };
    NameMap.prototype.has = function (name) {
        return this.nameMap[name] !== undefined;
    };
    NameMap.prototype.get = function (name) {
        // If the name appears in the _nameMap, we need to read its new name.
        // We have to loop over the dict just in case the new name also gets renamed.
        while (this.nameMap[name] && name !== this.nameMap[name]) {
            name = this.nameMap[name];
        }
        return name;
    };
    return NameMap;
}());
exports.NameMap = NameMap;
/*
  We use type guards instead of `instanceof` as `instanceof` makes
  different parts of the compiler depend on the actual implementation of
  the model classes, which in turn depend on different parts of the compiler.
  Thus, `instanceof` leads to circular dependency problems.

  On the other hand, type guards only make different parts of the compiler
  depend on the type of the model classes, but not the actual implementation.
*/
function isUnitModel(model) {
    return model && model.type === 'unit';
}
exports.isUnitModel = isUnitModel;
function isFacetModel(model) {
    return model && model.type === 'facet';
}
exports.isFacetModel = isFacetModel;
function isRepeatModel(model) {
    return model && model.type === 'repeat';
}
exports.isRepeatModel = isRepeatModel;
function isConcatModel(model) {
    return model && model.type === 'concat';
}
exports.isConcatModel = isConcatModel;
function isLayerModel(model) {
    return model && model.type === 'layer';
}
exports.isLayerModel = isLayerModel;
var Model = /** @class */ (function () {
    function Model(spec, parent, parentGivenName, config, resolve) {
        var _this = this;
        this.children = [];
        /**
         * Corrects the data references in marks after assemble.
         */
        this.correctDataNames = function (mark) {
            // TODO: make this correct
            // for normal data references
            if (mark.from && mark.from.data) {
                mark.from.data = _this.lookupDataSource(mark.from.data);
            }
            // for access to facet data
            if (mark.from && mark.from.facet && mark.from.facet.data) {
                mark.from.facet.data = _this.lookupDataSource(mark.from.facet.data);
            }
            return mark;
        };
        this.parent = parent;
        this.config = config;
        // If name is not provided, always use parent's givenName to avoid name conflicts.
        this.name = spec.name || parentGivenName;
        this.title = vega_util_1.isString(spec.title) ? { text: spec.title } : spec.title;
        // Shared name maps
        this.scaleNameMap = parent ? parent.scaleNameMap : new NameMap();
        this.layoutSizeNameMap = parent ? parent.layoutSizeNameMap : new NameMap();
        this.data = spec.data;
        this.description = spec.description;
        this.transforms = transform_1.normalizeTransform(spec.transform || []);
        this.component = {
            data: {
                sources: parent ? parent.component.data.sources : {},
                outputNodes: parent ? parent.component.data.outputNodes : {},
                outputNodeRefCounts: parent ? parent.component.data.outputNodeRefCounts : {},
                ancestorParse: parent ? __assign({}, parent.component.data.ancestorParse) : {}
            },
            layoutSize: new split_1.Split(),
            layoutHeaders: { row: {}, column: {} },
            mark: null,
            resolve: __assign({ scale: {}, axis: {}, legend: {} }, (resolve || {})),
            selection: null,
            scales: null,
            axes: {},
            legends: {},
        };
    }
    Object.defineProperty(Model.prototype, "width", {
        get: function () {
            return this.getSizeSignalRef('width');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "height", {
        get: function () {
            return this.getSizeSignalRef('height');
        },
        enumerable: true,
        configurable: true
    });
    Model.prototype.initSize = function (size) {
        var width = size.width, height = size.height;
        if (width) {
            this.component.layoutSize.set('width', width, true);
        }
        if (height) {
            this.component.layoutSize.set('height', height, true);
        }
    };
    Model.prototype.parse = function () {
        this.parseScale();
        this.parseLayoutSize(); // depends on scale
        this.renameTopLevelLayoutSize();
        this.parseSelection();
        this.parseData(); // (pathorder) depends on markDef; selection filters depend on parsed selections.
        this.parseAxisAndHeader(); // depends on scale and layout size
        this.parseLegend(); // depends on scale, markDef
        this.parseMarkGroup(); // depends on data name, scale, layout size, axisGroup, and children's scale, axis, legend and mark.
    };
    Model.prototype.parseScale = function () {
        parse_2.parseScale(this);
    };
    /**
     * Rename top-level spec's size to be just width / height, ignoring model name.
     * This essentially merges the top-level spec's width/height signals with the width/height signals
     * to help us reduce redundant signals declaration.
     */
    Model.prototype.renameTopLevelLayoutSize = function () {
        if (this.getName('width') !== 'width') {
            this.renameLayoutSize(this.getName('width'), 'width');
        }
        if (this.getName('height') !== 'height') {
            this.renameLayoutSize(this.getName('height'), 'height');
        }
    };
    Model.prototype.parseLegend = function () {
        parse_1.parseLegend(this);
    };
    Model.prototype.assembleGroupStyle = function () {
        if (this.type === 'unit' || this.type === 'layer') {
            return 'cell';
        }
        return undefined;
    };
    Model.prototype.assembleLayoutSize = function () {
        if (this.type === 'unit' || this.type === 'layer') {
            return {
                width: this.getSizeSignalRef('width'),
                height: this.getSizeSignalRef('height')
            };
        }
        return undefined;
    };
    Model.prototype.assembleHeaderMarks = function () {
        var layoutHeaders = this.component.layoutHeaders;
        var headerMarks = [];
        for (var _i = 0, HEADER_CHANNELS_1 = header_1.HEADER_CHANNELS; _i < HEADER_CHANNELS_1.length; _i++) {
            var channel = HEADER_CHANNELS_1[_i];
            if (layoutHeaders[channel].title) {
                headerMarks.push(header_1.getTitleGroup(this, channel));
            }
        }
        for (var _a = 0, HEADER_CHANNELS_2 = header_1.HEADER_CHANNELS; _a < HEADER_CHANNELS_2.length; _a++) {
            var channel = HEADER_CHANNELS_2[_a];
            var layoutHeader = layoutHeaders[channel];
            for (var _b = 0, HEADER_TYPES_1 = header_1.HEADER_TYPES; _b < HEADER_TYPES_1.length; _b++) {
                var headerType = HEADER_TYPES_1[_b];
                if (layoutHeader[headerType]) {
                    for (var _c = 0, _d = layoutHeader[headerType]; _c < _d.length; _c++) {
                        var header = _d[_c];
                        var headerGroup = header_1.getHeaderGroup(this, channel, headerType, layoutHeader, header);
                        if (headerGroup) {
                            headerMarks.push(headerGroup);
                        }
                    }
                }
            }
        }
        return headerMarks;
    };
    Model.prototype.assembleAxes = function () {
        return assemble_1.assembleAxes(this.component.axes);
    };
    Model.prototype.assembleLegends = function () {
        return assemble_3.assembleLegends(this);
    };
    Model.prototype.assembleTitle = function () {
        var title = __assign({}, title_1.extractTitleConfig(this.config.title).nonMark, this.title);
        if (title.text) {
            if (!util_1.contains(['unit', 'layer'], this.type)) {
                // As described in https://github.com/vega/vega-lite/issues/2875:
                // Due to vega/vega#960 (comment), we only support title's anchor for unit and layered spec for now.
                if (title.anchor && title.anchor !== 'start') {
                    log.warn(log.message.cannotSetTitleAnchor(this.type));
                }
                title.anchor = 'start';
            }
            return util_1.keys(title).length > 0 ? title : undefined;
        }
        return undefined;
    };
    /**
     * Assemble the mark group for this model.  We accept optional `signals` so that we can include concat top-level signals with the top-level model's local signals.
     */
    Model.prototype.assembleGroup = function (signals) {
        if (signals === void 0) { signals = []; }
        var group = {};
        signals = signals.concat(this.assembleSelectionSignals());
        if (signals.length > 0) {
            group.signals = signals;
        }
        var layout = this.assembleLayout();
        if (layout) {
            group.layout = layout;
        }
        group.marks = [].concat(this.assembleHeaderMarks(), this.assembleMarks());
        // Only include scales if this spec is top-level or if parent is facet.
        // (Otherwise, it will be merged with upper-level's scope.)
        var scales = (!this.parent || isFacetModel(this.parent)) ? assemble_4.assembleScales(this) : [];
        if (scales.length > 0) {
            group.scales = scales;
        }
        var axes = this.assembleAxes();
        if (axes.length > 0) {
            group.axes = axes;
        }
        var legends = this.assembleLegends();
        if (legends.length > 0) {
            group.legends = legends;
        }
        return group;
    };
    Model.prototype.hasDescendantWithFieldOnChannel = function (channel) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (isUnitModel(child)) {
                if (child.channelHasField(channel)) {
                    return true;
                }
            }
            else {
                if (child.hasDescendantWithFieldOnChannel(channel)) {
                    return true;
                }
            }
        }
        return false;
    };
    Model.prototype.getName = function (text) {
        return util_1.varName((this.name ? this.name + '_' : '') + text);
    };
    /**
     * Request a data source name for the given data source type and mark that data source as required. This method should be called in parse, so that all used data source can be correctly instantiated in assembleData().
     */
    Model.prototype.requestDataName = function (name) {
        var fullName = this.getName(name);
        // Increase ref count. This is critical because otherwise we won't create a data source.
        // We also increase the ref counts on OutputNode.getSource() calls.
        var refCounts = this.component.data.outputNodeRefCounts;
        refCounts[fullName] = (refCounts[fullName] || 0) + 1;
        return fullName;
    };
    Model.prototype.getSizeSignalRef = function (sizeType) {
        if (isFacetModel(this.parent)) {
            var channel = sizeType === 'width' ? 'x' : 'y';
            var scaleComponent = this.component.scales[channel];
            if (scaleComponent && !scaleComponent.merged) {
                var type = scaleComponent.get('type');
                var range = scaleComponent.get('range');
                if (scale_1.hasDiscreteDomain(type) && vega_schema_1.isVgRangeStep(range)) {
                    var scaleName = scaleComponent.get('name');
                    var domain = domain_1.assembleDomain(this, channel);
                    var fieldName = domain_1.getFieldFromDomain(domain);
                    if (fieldName) {
                        var fieldRef = fielddef_1.field({ aggregate: 'distinct', field: fieldName }, { expr: 'datum' });
                        return {
                            signal: assemble_2.sizeExpr(scaleName, scaleComponent, fieldRef)
                        };
                    }
                    else {
                        log.warn('Unknown field for ${channel}.  Cannot calculate view size.');
                        return null;
                    }
                }
            }
        }
        return {
            signal: this.layoutSizeNameMap.get(this.getName(sizeType))
        };
    };
    /**
     * Lookup the name of the datasource for an output node. You probably want to call this in assemble.
     */
    Model.prototype.lookupDataSource = function (name) {
        var node = this.component.data.outputNodes[name];
        if (!node) {
            // Name not found in map so let's just return what we got.
            // This can happen if we already have the correct name.
            return name;
        }
        return node.getSource();
    };
    Model.prototype.getSizeName = function (oldSizeName) {
        return this.layoutSizeNameMap.get(oldSizeName);
    };
    Model.prototype.renameLayoutSize = function (oldName, newName) {
        this.layoutSizeNameMap.rename(oldName, newName);
    };
    Model.prototype.renameScale = function (oldName, newName) {
        this.scaleNameMap.rename(oldName, newName);
    };
    /**
     * @return scale name for a given channel after the scale has been parsed and named.
     */
    Model.prototype.scaleName = function (originalScaleName, parse) {
        if (parse) {
            // During the parse phase always return a value
            // No need to refer to rename map because a scale can't be renamed
            // before it has the original name.
            return this.getName(originalScaleName);
        }
        // If there is a scale for the channel, it should either
        // be in the scale component or exist in the name map
        if (
        // If there is a scale for the channel, there should be a local scale component for it
        (channel_1.isChannel(originalScaleName) && channel_1.isScaleChannel(originalScaleName) && this.component.scales[originalScaleName]) ||
            // in the scale name map (the the scale get merged by its parent)
            this.scaleNameMap.has(this.getName(originalScaleName))) {
            return this.scaleNameMap.get(this.getName(originalScaleName));
        }
        return undefined;
    };
    /**
     * Traverse a model's hierarchy to get the scale component for a particular channel.
     */
    Model.prototype.getScaleComponent = function (channel) {
        /* istanbul ignore next: This is warning for debugging test */
        if (!this.component.scales) {
            throw new Error('getScaleComponent cannot be called before parseScale().  Make sure you have called parseScale or use parseUnitModelWithScale().');
        }
        var localScaleComponent = this.component.scales[channel];
        if (localScaleComponent && !localScaleComponent.merged) {
            return localScaleComponent;
        }
        return (this.parent ? this.parent.getScaleComponent(channel) : undefined);
    };
    /**
     * Traverse a model's hierarchy to get a particular selection component.
     */
    Model.prototype.getSelectionComponent = function (varName, origName) {
        var sel = this.component.selection[varName];
        if (!sel && this.parent) {
            sel = this.parent.getSelectionComponent(varName, origName);
        }
        if (!sel) {
            throw new Error(log.message.selectionNotFound(origName));
        }
        return sel;
    };
    return Model;
}());
exports.Model = Model;
/** Abstract class for UnitModel and FacetModel.  Both of which can contain fieldDefs as a part of its own specification. */
var ModelWithField = /** @class */ (function (_super) {
    __extends(ModelWithField, _super);
    function ModelWithField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** Get "field" reference for vega */
    ModelWithField.prototype.field = function (channel, opt) {
        if (opt === void 0) { opt = {}; }
        var fieldDef = this.fieldDef(channel);
        if (!fieldDef) {
            return undefined;
        }
        return fielddef_1.field(fieldDef, opt);
    };
    ModelWithField.prototype.reduceFieldDef = function (f, init, t) {
        return encoding_1.reduce(this.getMapping(), function (acc, cd, c) {
            var fieldDef = fielddef_1.getFieldDef(cd);
            if (fieldDef) {
                return f(acc, fieldDef, c);
            }
            return acc;
        }, init, t);
    };
    ModelWithField.prototype.forEachFieldDef = function (f, t) {
        encoding_1.forEach(this.getMapping(), function (cd, c) {
            var fieldDef = fielddef_1.getFieldDef(cd);
            if (fieldDef) {
                f(fieldDef, c);
            }
        }, t);
    };
    return ModelWithField;
}(Model));
exports.ModelWithField = ModelWithField;

},{"../channel":15,"../encoding":98,"../fielddef":100,"../log":105,"../scale":108,"../title":114,"../transform":116,"../util":118,"../vega.schema":120,"./axis/assemble":16,"./layout/header":46,"./layoutsize/assemble":47,"./legend/assemble":49,"./legend/parse":52,"./scale/assemble":70,"./scale/domain":72,"./scale/parse":73,"./split":89,"vega-util":10}],67:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("../log");
var baseconcat_1 = require("./baseconcat");
var buildmodel_1 = require("./buildmodel");
var parse_1 = require("./layoutsize/parse");
var RepeatModel = /** @class */ (function (_super) {
    __extends(RepeatModel, _super);
    function RepeatModel(spec, parent, parentGivenName, repeatValues, config) {
        var _this = _super.call(this, spec, parent, parentGivenName, config, spec.resolve) || this;
        _this.type = 'repeat';
        if (spec.resolve && spec.resolve.axis && (spec.resolve.axis.x === 'shared' || spec.resolve.axis.y === 'shared')) {
            log.warn(log.message.REPEAT_CANNOT_SHARE_AXIS);
        }
        _this.repeat = spec.repeat;
        _this.children = _this._initChildren(spec, _this.repeat, repeatValues, config);
        return _this;
    }
    RepeatModel.prototype._initChildren = function (spec, repeat, repeater, config) {
        var children = [];
        var row = repeat.row || [repeater ? repeater.row : null];
        var column = repeat.column || [repeater ? repeater.column : null];
        // cross product
        for (var _i = 0, row_1 = row; _i < row_1.length; _i++) {
            var rowField = row_1[_i];
            for (var _a = 0, column_1 = column; _a < column_1.length; _a++) {
                var columnField = column_1[_a];
                var name_1 = (rowField ? '_' + rowField : '') + (columnField ? '_' + columnField : '');
                var childRepeat = {
                    row: rowField,
                    column: columnField
                };
                children.push(buildmodel_1.buildModel(spec.spec, this, this.getName('child' + name_1), undefined, childRepeat, config, false));
            }
        }
        return children;
    };
    RepeatModel.prototype.parseLayoutSize = function () {
        parse_1.parseRepeatLayoutSize(this);
    };
    RepeatModel.prototype.assembleLayout = function () {
        // TODO: allow customization
        return {
            padding: { row: 10, column: 10 },
            offset: 10,
            columns: this.repeat && this.repeat.column ? this.repeat.column.length : 1,
            bounds: 'full',
            align: 'all'
        };
    };
    return RepeatModel;
}(baseconcat_1.BaseConcatModel));
exports.RepeatModel = RepeatModel;

},{"../log":105,"./baseconcat":22,"./buildmodel":23,"./layoutsize/parse":48}],68:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fielddef_1 = require("../fielddef");
var log = require("../log");
var sort_1 = require("../sort");
var util_1 = require("../util");
function replaceRepeaterInFacet(facet, repeater) {
    return replaceRepeater(facet, repeater);
}
exports.replaceRepeaterInFacet = replaceRepeaterInFacet;
function replaceRepeaterInEncoding(encoding, repeater) {
    return replaceRepeater(encoding, repeater);
}
exports.replaceRepeaterInEncoding = replaceRepeaterInEncoding;
/**
 * Replaces repeated value and returns if the repeated value is valid.
 */
function replaceRepeat(o, repeater) {
    if (fielddef_1.isRepeatRef(o.field)) {
        if (o.field.repeat in repeater) {
            // any needed to calm down ts compiler
            return __assign({}, o, { field: repeater[o.field.repeat] });
        }
        else {
            log.warn(log.message.noSuchRepeatedValue(o.field.repeat));
            return undefined;
        }
    }
    return o;
}
/**
 * Replace repeater values in a field def with the concrete field name.
 */
function replaceRepeaterInFieldDef(fieldDef, repeater) {
    fieldDef = replaceRepeat(fieldDef, repeater);
    if (fieldDef === undefined) {
        // the field def should be ignored
        return undefined;
    }
    if (fieldDef.sort && sort_1.isSortField(fieldDef.sort)) {
        var sort = replaceRepeat(fieldDef.sort, repeater);
        fieldDef = __assign({}, fieldDef, (sort ? { sort: sort } : {}));
    }
    return fieldDef;
}
function replaceRepeaterInChannelDef(channelDef, repeater) {
    if (fielddef_1.isFieldDef(channelDef)) {
        var fd = replaceRepeaterInFieldDef(channelDef, repeater);
        if (fd) {
            return fd;
        }
        else if (fielddef_1.isConditionalDef(channelDef)) {
            return { condition: channelDef.condition };
        }
    }
    else {
        if (fielddef_1.hasConditionalFieldDef(channelDef)) {
            var fd = replaceRepeaterInFieldDef(channelDef.condition, repeater);
            if (fd) {
                return __assign({}, channelDef, { condition: fd });
            }
            else {
                var condition = channelDef.condition, channelDefWithoutCondition = __rest(channelDef, ["condition"]);
                return channelDefWithoutCondition;
            }
        }
        return channelDef;
    }
    return undefined;
}
function replaceRepeater(mapping, repeater) {
    var out = {};
    for (var channel in mapping) {
        if (mapping.hasOwnProperty(channel)) {
            var channelDef = mapping[channel];
            if (util_1.isArray(channelDef)) {
                // array cannot have condition
                out[channel] = channelDef.map(function (cd) { return replaceRepeaterInChannelDef(cd, repeater); })
                    .filter(function (cd) { return cd; });
            }
            else {
                var cd = replaceRepeaterInChannelDef(channelDef, repeater);
                if (cd) {
                    out[channel] = cd;
                }
            }
        }
    }
    return out;
}

},{"../fielddef":100,"../log":105,"../sort":110,"../util":118}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../channel");
var log = require("../log");
var util_1 = require("../util");
var model_1 = require("./model");
function defaultScaleResolve(channel, model) {
    if (model_1.isLayerModel(model) || model_1.isFacetModel(model)) {
        return 'shared';
    }
    else if (model_1.isConcatModel(model) || model_1.isRepeatModel(model)) {
        return util_1.contains(channel_1.POSITION_SCALE_CHANNELS, channel) ? 'independent' : 'shared';
    }
    /* istanbul ignore next: should never reach here. */
    throw new Error('invalid model type for resolve');
}
exports.defaultScaleResolve = defaultScaleResolve;
function parseGuideResolve(resolve, channel) {
    var channelScaleResolve = resolve.scale[channel];
    var guide = util_1.contains(channel_1.POSITION_SCALE_CHANNELS, channel) ? 'axis' : 'legend';
    if (channelScaleResolve === 'independent') {
        if (resolve[guide][channel] === 'shared') {
            log.warn(log.message.independentScaleMeansIndependentGuide(channel));
        }
        return 'independent';
    }
    return resolve[guide][channel] || 'shared';
}
exports.parseGuideResolve = parseGuideResolve;

},{"../channel":15,"../log":105,"../util":118,"./model":66}],70:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vega_util_1 = require("vega-util");
var util_1 = require("../../util");
var vega_schema_1 = require("../../vega.schema");
var model_1 = require("../model");
var selection_1 = require("../selection/selection");
var domain_1 = require("./domain");
function assembleScales(model) {
    if (model_1.isLayerModel(model) || model_1.isConcatModel(model) || model_1.isRepeatModel(model)) {
        // For concat / layer / repeat, include scales of children too
        return model.children.reduce(function (scales, child) {
            return scales.concat(assembleScales(child));
        }, assembleScalesForModel(model));
    }
    else {
        // For facet, child scales would not be included in the parent's scope.
        // For unit, there is no child.
        return assembleScalesForModel(model);
    }
}
exports.assembleScales = assembleScales;
function assembleScalesForModel(model) {
    return util_1.keys(model.component.scales).reduce(function (scales, channel) {
        var scaleComponent = model.component.scales[channel];
        if (scaleComponent.merged) {
            // Skipped merged scales
            return scales;
        }
        var scale = scaleComponent.combine();
        // need to separate const and non const object destruction
        var domainRaw = scale.domainRaw, range = scale.range;
        var name = scale.name, type = scale.type, _d = scale.domainRaw, _r = scale.range, otherScaleProps = __rest(scale, ["name", "type", "domainRaw", "range"]);
        range = assembleScaleRange(range, name, model, channel);
        // As scale parsing occurs before selection parsing, a temporary signal
        // is used for domainRaw. Here, we detect if this temporary signal
        // is set, and replace it with the correct domainRaw signal.
        // For more information, see isRawSelectionDomain in selection.ts.
        if (domainRaw && selection_1.isRawSelectionDomain(domainRaw)) {
            domainRaw = selection_1.selectionScaleDomain(model, domainRaw);
        }
        scales.push(__assign({ name: name,
            type: type, domain: domain_1.assembleDomain(model, channel) }, (domainRaw ? { domainRaw: domainRaw } : {}), { range: range }, otherScaleProps));
        return scales;
    }, []);
}
exports.assembleScalesForModel = assembleScalesForModel;
function assembleScaleRange(scaleRange, scaleName, model, channel) {
    // add signals to x/y range
    if (channel === 'x' || channel === 'y') {
        if (vega_schema_1.isVgRangeStep(scaleRange)) {
            // For x/y range step, use a signal created in layout assemble instead of a constant range step.
            return {
                step: { signal: scaleName + '_step' }
            };
        }
        else if (vega_util_1.isArray(scaleRange) && scaleRange.length === 2) {
            var r0 = scaleRange[0];
            var r1 = scaleRange[1];
            if (r0 === 0 && vega_schema_1.isVgSignalRef(r1)) {
                // Replace width signal just in case it is renamed.
                return [0, { signal: model.getSizeName(r1.signal) }];
            }
            else if (vega_schema_1.isVgSignalRef(r0) && r1 === 0) {
                // Replace height signal just in case it is renamed.
                return [{ signal: model.getSizeName(r0.signal) }, 0];
            }
        }
    }
    return scaleRange;
}
exports.assembleScaleRange = assembleScaleRange;

},{"../../util":118,"../../vega.schema":120,"../model":66,"../selection/selection":79,"./domain":72,"vega-util":10}],71:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var split_1 = require("../split");
var ScaleComponent = /** @class */ (function (_super) {
    __extends(ScaleComponent, _super);
    function ScaleComponent(name, typeWithExplicit) {
        var _this = _super.call(this, {}, // no initial explicit property
        { name: name } // name as initial implicit property
        ) || this;
        _this.merged = false;
        _this.domains = [];
        _this.setWithExplicit('type', typeWithExplicit);
        return _this;
    }
    return ScaleComponent;
}(split_1.Split));
exports.ScaleComponent = ScaleComponent;

},{"../split":89}],72:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vega_util_1 = require("vega-util");
var aggregate_1 = require("../../aggregate");
var bin_1 = require("../../bin");
var channel_1 = require("../../channel");
var data_1 = require("../../data");
var datetime_1 = require("../../datetime");
var log = require("../../log");
var scale_1 = require("../../scale");
var sort_1 = require("../../sort");
var util = require("../../util");
var vega_schema_1 = require("../../vega.schema");
var vega_schema_2 = require("../../vega.schema");
var common_1 = require("../common");
var optimize_1 = require("../data/optimize");
var model_1 = require("../model");
var selection_1 = require("../selection/selection");
function parseScaleDomain(model) {
    if (model_1.isUnitModel(model)) {
        parseUnitScaleDomain(model);
    }
    else {
        parseNonUnitScaleDomain(model);
    }
}
exports.parseScaleDomain = parseScaleDomain;
function parseUnitScaleDomain(model) {
    var scales = model.specifiedScales;
    var localScaleComponents = model.component.scales;
    util.keys(localScaleComponents).forEach(function (channel) {
        var specifiedScale = scales[channel];
        var specifiedDomain = specifiedScale ? specifiedScale.domain : undefined;
        var domains = parseDomainForChannel(model, channel);
        var localScaleCmpt = localScaleComponents[channel];
        localScaleCmpt.domains = domains;
        if (scale_1.isSelectionDomain(specifiedDomain)) {
            // As scale parsing occurs before selection parsing, we use a temporary
            // signal here and append the scale.domain definition. This is replaced
            // with the correct domainRaw signal during scale assembly.
            // For more information, see isRawSelectionDomain in selection.ts.
            // FIXME: replace this with a special property in the scaleComponent
            localScaleCmpt.set('domainRaw', {
                signal: selection_1.SELECTION_DOMAIN + JSON.stringify(specifiedDomain)
            }, true);
        }
    });
}
function parseNonUnitScaleDomain(model) {
    for (var _i = 0, _a = model.children; _i < _a.length; _i++) {
        var child = _a[_i];
        parseScaleDomain(child);
    }
    var localScaleComponents = model.component.scales;
    util.keys(localScaleComponents).forEach(function (channel) {
        // FIXME: Arvind -- Please revise logic for merging selectionDomain / domainRaw
        var domains;
        for (var _i = 0, _a = model.children; _i < _a.length; _i++) {
            var child = _a[_i];
            var childComponent = child.component.scales[channel];
            if (childComponent) {
                if (domains === undefined) {
                    domains = childComponent.domains;
                }
                else {
                    domains = domains.concat(childComponent.domains);
                }
            }
        }
        if (model_1.isFacetModel(model)) {
            domains.forEach(function (domain) {
                // Replace the scale domain with data output from a cloned subtree after the facet.
                if (vega_schema_1.isDataRefDomain(domain)) {
                    // use data from cloned subtree (which is the same as data but with a prefix added once)
                    domain.data = optimize_1.FACET_SCALE_PREFIX + domain.data.replace(optimize_1.FACET_SCALE_PREFIX, '');
                }
            });
        }
        localScaleComponents[channel].domains = domains;
    });
}
/**
 * Remove unaggregated domain if it is not applicable
 * Add unaggregated domain if domain is not specified and config.scale.useUnaggregatedDomain is true.
 */
function normalizeUnaggregatedDomain(domain, fieldDef, scaleType, scaleConfig) {
    if (domain === 'unaggregated') {
        var _a = canUseUnaggregatedDomain(fieldDef, scaleType), valid = _a.valid, reason = _a.reason;
        if (!valid) {
            log.warn(reason);
            return undefined;
        }
    }
    else if (domain === undefined && scaleConfig.useUnaggregatedDomain) {
        // Apply config if domain is not specified.
        var valid = canUseUnaggregatedDomain(fieldDef, scaleType).valid;
        if (valid) {
            return 'unaggregated';
        }
    }
    return domain;
}
function parseDomainForChannel(model, channel) {
    var scaleType = model.getScaleComponent(channel).get('type');
    var domain = normalizeUnaggregatedDomain(model.scaleDomain(channel), model.fieldDef(channel), scaleType, model.config.scale);
    if (domain !== model.scaleDomain(channel)) {
        model.specifiedScales[channel] = __assign({}, model.specifiedScales[channel], { domain: domain });
    }
    // If channel is either X or Y then union them with X2 & Y2 if they exist
    if (channel === 'x' && model.channelHasField('x2')) {
        if (model.channelHasField('x')) {
            return parseSingleChannelDomain(scaleType, domain, model, 'x').concat(parseSingleChannelDomain(scaleType, domain, model, 'x2'));
        }
        else {
            return parseSingleChannelDomain(scaleType, domain, model, 'x2');
        }
    }
    else if (channel === 'y' && model.channelHasField('y2')) {
        if (model.channelHasField('y')) {
            return parseSingleChannelDomain(scaleType, domain, model, 'y').concat(parseSingleChannelDomain(scaleType, domain, model, 'y2'));
        }
        else {
            return parseSingleChannelDomain(scaleType, domain, model, 'y2');
        }
    }
    return parseSingleChannelDomain(scaleType, domain, model, channel);
}
exports.parseDomainForChannel = parseDomainForChannel;
function parseSingleChannelDomain(scaleType, domain, model, channel) {
    var fieldDef = model.fieldDef(channel);
    if (domain && domain !== 'unaggregated' && !scale_1.isSelectionDomain(domain)) {
        if (fieldDef.bin) {
            log.warn(log.message.conflictedDomain(channel));
        }
        else {
            if (datetime_1.isDateTime(domain[0])) {
                return domain.map(function (dt) {
                    return { signal: "{data: " + datetime_1.dateTimeExpr(dt, true) + "}" };
                });
            }
            return [domain];
        }
    }
    var stack = model.stack;
    if (stack && channel === stack.fieldChannel) {
        if (stack.offset === 'normalize') {
            return [[0, 1]];
        }
        var data = model.requestDataName(data_1.MAIN);
        return [{
                data: data,
                field: model.field(channel, { suffix: 'start' })
            }, {
                data: data,
                field: model.field(channel, { suffix: 'end' })
            }];
    }
    var sort = channel_1.isScaleChannel(channel) ? domainSort(model, channel, scaleType) : undefined;
    if (domain === 'unaggregated') {
        var data = model.requestDataName(data_1.MAIN);
        return [{
                data: data,
                field: model.field(channel, { aggregate: 'min' })
            }, {
                data: data,
                field: model.field(channel, { aggregate: 'max' })
            }];
    }
    else if (fieldDef.bin) {
        if (scale_1.isBinScale(scaleType)) {
            var signal = model.getName(bin_1.binToString(fieldDef.bin) + "_" + fieldDef.field + "_bins");
            return [{ signal: "sequence(" + signal + ".start, " + signal + ".stop + " + signal + ".step, " + signal + ".step)" }];
        }
        if (scale_1.hasDiscreteDomain(scaleType)) {
            // ordinal bin scale takes domain from bin_range, ordered by bin start
            // This is useful for both axis-based scale (x/y) and legend-based scale (other channels).
            return [{
                    // If sort by aggregation of a specified sort field, we need to use RAW table,
                    // so we can aggregate values for the scale independently from the main aggregation.
                    data: util.isBoolean(sort) ? model.requestDataName(data_1.MAIN) : model.requestDataName(data_1.RAW),
                    // Use range if we added it and the scale does not support computing a range as a signal.
                    field: model.field(channel, common_1.binRequiresRange(fieldDef, channel) ? { binSuffix: 'range' } : {}),
                    // we have to use a sort object if sort = true to make the sort correct by bin start
                    sort: sort === true || !sort_1.isSortField(sort) ? {
                        field: model.field(channel, {}),
                        op: 'min' // min or max doesn't matter since we sort by the start of the bin range
                    } : sort
                }];
        }
        else {
            if (channel === 'x' || channel === 'y') {
                // X/Y position have to include start and end for non-ordinal scale
                var data = model.requestDataName(data_1.MAIN);
                return [{
                        data: data,
                        field: model.field(channel, {})
                    }, {
                        data: data,
                        field: model.field(channel, { binSuffix: 'end' })
                    }];
            }
            else {
                // TODO: use bin_mid
                return [{
                        data: model.requestDataName(data_1.MAIN),
                        field: model.field(channel, {})
                    }];
            }
        }
    }
    else if (sort) {
        return [{
                // If sort by aggregation of a specified sort field, we need to use RAW table,
                // so we can aggregate values for the scale independently from the main aggregation.
                data: util.isBoolean(sort) ? model.requestDataName(data_1.MAIN) : model.requestDataName(data_1.RAW),
                field: model.field(channel),
                sort: sort
            }];
    }
    else {
        return [{
                data: model.requestDataName(data_1.MAIN),
                field: model.field(channel)
            }];
    }
}
function domainSort(model, channel, scaleType) {
    if (!scale_1.hasDiscreteDomain(scaleType)) {
        return undefined;
    }
    var sort = model.sort(channel);
    // Sorted based on an aggregate calculation over a specified sort field (only for ordinal scale)
    if (sort_1.isSortField(sort)) {
        return sort;
    }
    if (sort === 'descending') {
        return {
            op: 'min',
            field: model.field(channel),
            order: 'descending'
        };
    }
    if (util.contains(['ascending', undefined /* default =ascending*/], sort)) {
        return true;
    }
    // sort === 'none'
    return undefined;
}
exports.domainSort = domainSort;
/**
 * Determine if a scale can use unaggregated domain.
 * @return {Boolean} Returns true if all of the following conditons applies:
 * 1. `scale.domain` is `unaggregated`
 * 2. Aggregation function is not `count` or `sum`
 * 3. The scale is quantitative or time scale.
 */
function canUseUnaggregatedDomain(fieldDef, scaleType) {
    if (!fieldDef.aggregate) {
        return {
            valid: false,
            reason: log.message.unaggregateDomainHasNoEffectForRawField(fieldDef)
        };
    }
    if (!aggregate_1.SHARED_DOMAIN_OP_INDEX[fieldDef.aggregate]) {
        return {
            valid: false,
            reason: log.message.unaggregateDomainWithNonSharedDomainOp(fieldDef.aggregate)
        };
    }
    if (fieldDef.type === 'quantitative') {
        if (scaleType === 'log') {
            return {
                valid: false,
                reason: log.message.unaggregatedDomainWithLogScale(fieldDef)
            };
        }
    }
    return { valid: true };
}
exports.canUseUnaggregatedDomain = canUseUnaggregatedDomain;
/**
 * Converts an array of domains to a single Vega scale domain.
 */
function mergeDomains(domains) {
    var uniqueDomains = util.unique(domains.map(function (domain) {
        // ignore sort property when computing the unique domains
        if (vega_schema_1.isDataRefDomain(domain)) {
            var _s = domain.sort, domainWithoutSort = __rest(domain, ["sort"]);
            return domainWithoutSort;
        }
        return domain;
    }), util.hash);
    var sorts = util.unique(domains.map(function (d) {
        if (vega_schema_1.isDataRefDomain(d)) {
            var s = d.sort;
            if (s !== undefined && !util.isBoolean(s)) {
                if (s.op === 'count') {
                    // let's make sure that if op is count, we don't use a field
                    delete s.field;
                }
                if (s.order === 'ascending') {
                    // drop order: ascending as it is the default
                    delete s.order;
                }
            }
            return s;
        }
        return undefined;
    }).filter(function (s) { return s !== undefined; }), util.hash);
    if (uniqueDomains.length === 1) {
        var domain = domains[0];
        if (vega_schema_1.isDataRefDomain(domain) && sorts.length > 0) {
            var sort_2 = sorts[0];
            if (sorts.length > 1) {
                log.warn(log.message.MORE_THAN_ONE_SORT);
                sort_2 = true;
            }
            return __assign({}, domain, { sort: sort_2 });
        }
        return domain;
    }
    // only keep simple sort properties that work with unioned domains
    var onlySimpleSorts = sorts.filter(function (s) {
        if (util.isBoolean(s)) {
            return true;
        }
        if (s.op === 'count') {
            return true;
        }
        log.warn(log.message.domainSortDropped(s));
        return false;
    });
    var sort = true;
    if (onlySimpleSorts.length === 1) {
        sort = onlySimpleSorts[0];
    }
    else if (onlySimpleSorts.length > 1) {
        // ignore sort = false if we have another sort property
        var filteredSorts = onlySimpleSorts.filter(function (s) { return s !== false; });
        if (filteredSorts.length > 1) {
            log.warn(log.message.MORE_THAN_ONE_SORT);
            sort = true;
        }
        else {
            sort = filteredSorts[0];
        }
    }
    var allData = util.unique(domains.map(function (d) {
        if (vega_schema_1.isDataRefDomain(d)) {
            return d.data;
        }
        return null;
    }), function (x) { return x; });
    if (allData.length === 1 && allData[0] !== null) {
        // create a union domain of different fields with a single data source
        var domain = {
            data: allData[0],
            fields: uniqueDomains.map(function (d) { return d.field; }),
            sort: sort
        };
        return domain;
    }
    return { fields: uniqueDomains, sort: sort };
}
exports.mergeDomains = mergeDomains;
/**
 * Return a field if a scale single field.
 * Return `undefined` otherwise.
 *
 */
function getFieldFromDomain(domain) {
    if (vega_schema_1.isDataRefDomain(domain) && vega_util_1.isString(domain.field)) {
        return domain.field;
    }
    else if (vega_schema_2.isDataRefUnionedDomain(domain)) {
        var field = void 0;
        for (var _i = 0, _a = domain.fields; _i < _a.length; _i++) {
            var nonUnionDomain = _a[_i];
            if (vega_schema_1.isDataRefDomain(nonUnionDomain) && vega_util_1.isString(nonUnionDomain.field)) {
                if (!field) {
                    field = nonUnionDomain.field;
                }
                else if (field !== nonUnionDomain.field) {
                    log.warn('Detected faceted independent scales that union domain of multiple fields from different data sources.  We will use the first field.  The result view size may be incorrect.');
                    return field;
                }
            }
        }
        log.warn('Detected faceted independent scales that union domain of identical fields from different source detected.  We will assume that this is the same field from a different fork of the same data source.  However, if this is not case, the result view size maybe incorrect.');
        return field;
    }
    else if (vega_schema_2.isFieldRefUnionDomain(domain) && vega_util_1.isString) {
        log.warn('Detected faceted independent scales that union domain of multiple fields from the same data source.  We will use the first field.  The result view size may be incorrect.');
        var field = domain.fields[0];
        return vega_util_1.isString(field) ? field : undefined;
    }
    return undefined;
}
exports.getFieldFromDomain = getFieldFromDomain;
function assembleDomain(model, channel) {
    var scaleComponent = model.component.scales[channel];
    var domains = scaleComponent.domains.map(function (domain) {
        // Correct references to data as the original domain's data was determined
        // in parseScale, which happens before parseData. Thus the original data
        // reference can be incorrect.
        if (vega_schema_1.isDataRefDomain(domain)) {
            domain.data = model.lookupDataSource(domain.data);
        }
        return domain;
    });
    // domains is an array that has to be merged into a single vega domain
    return mergeDomains(domains);
}
exports.assembleDomain = assembleDomain;

},{"../../aggregate":12,"../../bin":14,"../../channel":15,"../../data":96,"../../datetime":97,"../../log":105,"../../scale":108,"../../sort":110,"../../util":118,"../../vega.schema":120,"../common":24,"../data/optimize":38,"../model":66,"../selection/selection":79,"vega-util":10}],73:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var scale_1 = require("../../scale");
var util_1 = require("../../util");
var model_1 = require("../model");
var resolve_1 = require("../resolve");
var split_1 = require("../split");
var component_1 = require("./component");
var domain_1 = require("./domain");
var properties_1 = require("./properties");
var range_1 = require("./range");
var type_1 = require("./type");
function parseScale(model) {
    parseScaleCore(model);
    domain_1.parseScaleDomain(model);
    for (var _i = 0, NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES_1 = scale_1.NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES; _i < NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES_1.length; _i++) {
        var prop = NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES_1[_i];
        properties_1.parseScaleProperty(model, prop);
    }
    // range depends on zero
    range_1.parseScaleRange(model);
}
exports.parseScale = parseScale;
function parseScaleCore(model) {
    if (model_1.isUnitModel(model)) {
        model.component.scales = parseUnitScaleCore(model);
    }
    else {
        model.component.scales = parseNonUnitScaleCore(model);
    }
}
exports.parseScaleCore = parseScaleCore;
/**
 * Parse scales for all channels of a model.
 */
function parseUnitScaleCore(model) {
    var encoding = model.encoding, config = model.config;
    var mark = model.mark();
    return channel_1.SCALE_CHANNELS.reduce(function (scaleComponents, channel) {
        var fieldDef;
        var specifiedScale = {};
        var channelDef = encoding[channel];
        if (fielddef_1.isFieldDef(channelDef)) {
            fieldDef = channelDef;
            specifiedScale = channelDef.scale || {};
        }
        else if (fielddef_1.hasConditionalFieldDef(channelDef)) {
            fieldDef = channelDef.condition;
            specifiedScale = channelDef.condition['scale'] || {}; // We use ['scale'] since we know that channel here has scale for sure
        }
        else if (channel === 'x') {
            fieldDef = fielddef_1.getFieldDef(encoding.x2);
        }
        else if (channel === 'y') {
            fieldDef = fielddef_1.getFieldDef(encoding.y2);
        }
        if (fieldDef) {
            var specifiedScaleType = specifiedScale.type;
            var sType = type_1.scaleType(specifiedScale.type, channel, fieldDef, mark, config.scale);
            scaleComponents[channel] = new component_1.ScaleComponent(model.scaleName(channel + '', true), { value: sType, explicit: specifiedScaleType === sType });
        }
        return scaleComponents;
    }, {});
}
var scaleTypeTieBreaker = split_1.tieBreakByComparing(function (st1, st2) { return (scale_1.scaleTypePrecedence(st1) - scale_1.scaleTypePrecedence(st2)); });
function parseNonUnitScaleCore(model) {
    var scaleComponents = model.component.scales = {};
    var scaleTypeWithExplicitIndex = {};
    var resolve = model.component.resolve;
    var _loop_1 = function (child) {
        parseScaleCore(child);
        // Instead of always merging right away -- check if it is compatible to merge first!
        util_1.keys(child.component.scales).forEach(function (channel) {
            // if resolve is undefined, set default first
            resolve.scale[channel] = resolve.scale[channel] || resolve_1.defaultScaleResolve(channel, model);
            if (resolve.scale[channel] === 'shared') {
                var scaleType_1 = scaleTypeWithExplicitIndex[channel];
                var childScaleType = child.component.scales[channel].getWithExplicit('type');
                if (scaleType_1) {
                    if (scale_1.scaleCompatible(scaleType_1.value, childScaleType.value)) {
                        // merge scale component if type are compatible
                        scaleTypeWithExplicitIndex[channel] = split_1.mergeValuesWithExplicit(scaleType_1, childScaleType, 'type', 'scale', scaleTypeTieBreaker);
                    }
                    else {
                        // Otherwise, update conflicting channel to be independent
                        resolve.scale[channel] = 'independent';
                        // Remove from the index so they don't get merged
                        delete scaleTypeWithExplicitIndex[channel];
                    }
                }
                else {
                    scaleTypeWithExplicitIndex[channel] = childScaleType;
                }
            }
        });
    };
    // Parse each child scale and determine if a particular channel can be merged.
    for (var _i = 0, _a = model.children; _i < _a.length; _i++) {
        var child = _a[_i];
        _loop_1(child);
    }
    // Merge each channel listed in the index
    util_1.keys(scaleTypeWithExplicitIndex).forEach(function (channel) {
        // Create new merged scale component
        var name = model.scaleName(channel, true);
        var typeWithExplicit = scaleTypeWithExplicitIndex[channel];
        scaleComponents[channel] = new component_1.ScaleComponent(name, typeWithExplicit);
        // rename each child and mark them as merged
        for (var _i = 0, _a = model.children; _i < _a.length; _i++) {
            var child = _a[_i];
            var childScale = child.component.scales[channel];
            if (childScale) {
                child.renameScale(childScale.get('name'), name);
                childScale.merged = true;
            }
        }
    });
    return scaleComponents;
}

},{"../../channel":15,"../../fielddef":100,"../../scale":108,"../../util":118,"../model":66,"../resolve":69,"../split":89,"./component":71,"./domain":72,"./properties":74,"./range":75,"./type":76}],74:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../../channel");
var log = require("../../log");
var scale_1 = require("../../scale");
var util_1 = require("../../util");
var util = require("../../util");
var model_1 = require("../model");
var split_1 = require("../split");
var range_1 = require("./range");
function parseScaleProperty(model, property) {
    if (model_1.isUnitModel(model)) {
        parseUnitScaleProperty(model, property);
    }
    else {
        parseNonUnitScaleProperty(model, property);
    }
}
exports.parseScaleProperty = parseScaleProperty;
function parseUnitScaleProperty(model, property) {
    var localScaleComponents = model.component.scales;
    util_1.keys(localScaleComponents).forEach(function (channel) {
        var specifiedScale = model.specifiedScales[channel];
        var localScaleCmpt = localScaleComponents[channel];
        var mergedScaleCmpt = model.getScaleComponent(channel);
        var fieldDef = model.fieldDef(channel);
        var sort = model.sort(channel);
        var config = model.config;
        var specifiedValue = specifiedScale[property];
        var sType = mergedScaleCmpt.get('type');
        var supportedByScaleType = scale_1.scaleTypeSupportProperty(sType, property);
        var channelIncompatability = scale_1.channelScalePropertyIncompatability(channel, property);
        if (specifiedValue !== undefined) {
            // If there is a specified value, check if it is compatible with scale type and channel
            if (!supportedByScaleType) {
                log.warn(log.message.scalePropertyNotWorkWithScaleType(sType, property, channel));
            }
            else if (channelIncompatability) {
                log.warn(channelIncompatability);
            }
        }
        if (supportedByScaleType && channelIncompatability === undefined) {
            if (specifiedValue !== undefined) {
                // copyKeyFromObject ensure type safety
                localScaleCmpt.copyKeyFromObject(property, specifiedScale);
            }
            else {
                var value = getDefaultValue(property, channel, fieldDef, sort, mergedScaleCmpt.get('type'), mergedScaleCmpt.get('padding'), mergedScaleCmpt.get('paddingInner'), specifiedScale.domain, model.markDef, config);
                if (value !== undefined) {
                    localScaleCmpt.set(property, value, false);
                }
            }
        }
    });
}
// Note: This method is used in Voyager.
function getDefaultValue(property, channel, fieldDef, sort, scaleType, scalePadding, scalePaddingInner, specifiedDomain, markDef, config) {
    var scaleConfig = config.scale;
    // If we have default rule-base, determine default value first
    switch (property) {
        case 'nice':
            return nice(scaleType, channel, fieldDef);
        case 'padding':
            return padding(channel, scaleType, scaleConfig, fieldDef, markDef, config.bar);
        case 'paddingInner':
            return paddingInner(scalePadding, channel, scaleConfig);
        case 'paddingOuter':
            return paddingOuter(scalePadding, channel, scaleType, scalePaddingInner, scaleConfig);
        case 'reverse':
            return reverse(scaleType, sort);
        case 'zero':
            return zero(channel, fieldDef, specifiedDomain);
    }
    // Otherwise, use scale config
    return scaleConfig[property];
}
exports.getDefaultValue = getDefaultValue;
function parseNonUnitScaleProperty(model, property) {
    var localScaleComponents = model.component.scales;
    for (var _i = 0, _a = model.children; _i < _a.length; _i++) {
        var child = _a[_i];
        if (property === 'range') {
            range_1.parseScaleRange(child);
        }
        else {
            parseScaleProperty(child, property);
        }
    }
    util_1.keys(localScaleComponents).forEach(function (channel) {
        var valueWithExplicit;
        for (var _i = 0, _a = model.children; _i < _a.length; _i++) {
            var child = _a[_i];
            var childComponent = child.component.scales[channel];
            if (childComponent) {
                var childValueWithExplicit = childComponent.getWithExplicit(property);
                valueWithExplicit = split_1.mergeValuesWithExplicit(valueWithExplicit, childValueWithExplicit, property, 'scale', split_1.tieBreakByComparing(function (v1, v2) {
                    switch (property) {
                        case 'range':
                            // For range step, prefer larger step
                            if (v1.step && v2.step) {
                                return v1.step - v2.step;
                            }
                            return 0;
                    }
                    return 0;
                }));
            }
        }
        localScaleComponents[channel].setWithExplicit(property, valueWithExplicit);
    });
}
exports.parseNonUnitScaleProperty = parseNonUnitScaleProperty;
function nice(scaleType, channel, fieldDef) {
    if (fieldDef.bin || util.contains([scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scaleType)) {
        return undefined;
    }
    return util.contains([channel_1.X, channel_1.Y], channel); // return true for quantitative X/Y unless binned
}
exports.nice = nice;
function padding(channel, scaleType, scaleConfig, fieldDef, markDef, barConfig) {
    if (util.contains([channel_1.X, channel_1.Y], channel)) {
        if (scale_1.isContinuousToContinuous(scaleType)) {
            if (scaleConfig.continuousPadding !== undefined) {
                return scaleConfig.continuousPadding;
            }
            var type = markDef.type, orient = markDef.orient;
            if (type === 'bar' && !fieldDef.bin) {
                if ((orient === 'vertical' && channel === 'x') ||
                    (orient === 'horizontal' && channel === 'y')) {
                    return barConfig.continuousBandSize;
                }
            }
        }
        if (scaleType === scale_1.ScaleType.POINT) {
            return scaleConfig.pointPadding;
        }
    }
    return undefined;
}
exports.padding = padding;
function paddingInner(padding, channel, scaleConfig) {
    if (padding !== undefined) {
        // If user has already manually specified "padding", no need to add default paddingInner.
        return undefined;
    }
    if (util.contains([channel_1.X, channel_1.Y], channel)) {
        // Padding is only set for X and Y by default.
        // Basically it doesn't make sense to add padding for color and size.
        // paddingOuter would only be called if it's a band scale, just return the default for bandScale.
        return scaleConfig.bandPaddingInner;
    }
    return undefined;
}
exports.paddingInner = paddingInner;
function paddingOuter(padding, channel, scaleType, paddingInner, scaleConfig) {
    if (padding !== undefined) {
        // If user has already manually specified "padding", no need to add default paddingOuter.
        return undefined;
    }
    if (util.contains([channel_1.X, channel_1.Y], channel)) {
        // Padding is only set for X and Y by default.
        // Basically it doesn't make sense to add padding for color and size.
        if (scaleType === scale_1.ScaleType.BAND) {
            if (scaleConfig.bandPaddingOuter !== undefined) {
                return scaleConfig.bandPaddingOuter;
            }
            /* By default, paddingOuter is paddingInner / 2. The reason is that
                size (width/height) = step * (cardinality - paddingInner + 2 * paddingOuter).
                and we want the width/height to be integer by default.
                Note that step (by default) and cardinality are integers.) */
            return paddingInner / 2;
        }
    }
    return undefined;
}
exports.paddingOuter = paddingOuter;
function reverse(scaleType, sort) {
    if (scale_1.hasContinuousDomain(scaleType) && sort === 'descending') {
        // For continuous domain scales, Vega does not support domain sort.
        // Thus, we reverse range instead if sort is descending
        return true;
    }
    return undefined;
}
exports.reverse = reverse;
function zero(channel, fieldDef, specifiedScale) {
    // By default, return true only for the following cases:
    // 1) using quantitative field with size
    // While this can be either ratio or interval fields, our assumption is that
    // ratio are more common.
    if (channel === 'size' && fieldDef.type === 'quantitative') {
        return true;
    }
    // 2) non-binned, quantitative x-scale or y-scale if no custom domain is provided.
    // (For binning, we should not include zero by default because binning are calculated without zero.
    // Similar, if users explicitly provide a domain range, we should not augment zero as that will be unexpected.)
    var hasCustomDomain = !!specifiedScale && specifiedScale !== 'unaggregated';
    if (!hasCustomDomain && !fieldDef.bin && util.contains([channel_1.X, channel_1.Y], channel)) {
        return true;
    }
    return false;
}
exports.zero = zero;

},{"../../channel":15,"../../log":105,"../../scale":108,"../../util":118,"../model":66,"../split":89,"./range":75}],75:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vega_util_1 = require("vega-util");
var channel_1 = require("../../channel");
var log = require("../../log");
var scale_1 = require("../../scale");
var scale_2 = require("../../scale");
var util = require("../../util");
var vega_schema_1 = require("../../vega.schema");
var model_1 = require("../model");
var split_1 = require("../split");
var properties_1 = require("./properties");
exports.RANGE_PROPERTIES = ['range', 'rangeStep', 'scheme'];
function parseScaleRange(model) {
    if (model_1.isUnitModel(model)) {
        parseUnitScaleRange(model);
    }
    else {
        properties_1.parseNonUnitScaleProperty(model, 'range');
    }
}
exports.parseScaleRange = parseScaleRange;
function parseUnitScaleRange(model) {
    var localScaleComponents = model.component.scales;
    // use SCALE_CHANNELS instead of scales[channel] to ensure that x, y come first!
    channel_1.SCALE_CHANNELS.forEach(function (channel) {
        var localScaleCmpt = localScaleComponents[channel];
        if (!localScaleCmpt) {
            return;
        }
        var mergedScaleCmpt = model.getScaleComponent(channel);
        var specifiedScale = model.specifiedScales[channel];
        var fieldDef = model.fieldDef(channel);
        // Read if there is a specified width/height
        var sizeType = channel === 'x' ? 'width' : channel === 'y' ? 'height' : undefined;
        var sizeSpecified = sizeType ? !!model.component.layoutSize.get(sizeType) : undefined;
        var scaleType = mergedScaleCmpt.get('type');
        // if autosize is fit, size cannot be data driven
        var rangeStep = util.contains(['point', 'band'], scaleType) || !!specifiedScale.rangeStep;
        if (sizeType && model.fit && !sizeSpecified && rangeStep) {
            log.warn(log.message.CANNOT_FIX_RANGE_STEP_WITH_FIT);
            sizeSpecified = true;
        }
        var xyRangeSteps = getXYRangeStep(model);
        var rangeWithExplicit = parseRangeForChannel(channel, scaleType, fieldDef.type, specifiedScale, model.config, localScaleCmpt.get('zero'), model.mark(), sizeSpecified, model.getName(sizeType), xyRangeSteps);
        localScaleCmpt.setWithExplicit('range', rangeWithExplicit);
    });
}
function getXYRangeStep(model) {
    var xyRangeSteps = [];
    var xScale = model.getScaleComponent('x');
    var xRange = xScale && xScale.get('range');
    if (xRange && vega_schema_1.isVgRangeStep(xRange) && vega_util_1.isNumber(xRange.step)) {
        xyRangeSteps.push(xRange.step);
    }
    var yScale = model.getScaleComponent('y');
    var yRange = yScale && yScale.get('range');
    if (yRange && vega_schema_1.isVgRangeStep(yRange) && vega_util_1.isNumber(yRange.step)) {
        xyRangeSteps.push(yRange.step);
    }
    return xyRangeSteps;
}
/**
 * Return mixins that includes one of the range properties (range, rangeStep, scheme).
 */
function parseRangeForChannel(channel, scaleType, type, specifiedScale, config, zero, mark, sizeSpecified, sizeSignal, xyRangeSteps) {
    var noRangeStep = sizeSpecified || specifiedScale.rangeStep === null;
    // Check if any of the range properties is specified.
    // If so, check if it is compatible and make sure that we only output one of the properties
    for (var _i = 0, RANGE_PROPERTIES_1 = exports.RANGE_PROPERTIES; _i < RANGE_PROPERTIES_1.length; _i++) {
        var property = RANGE_PROPERTIES_1[_i];
        if (specifiedScale[property] !== undefined) {
            var supportedByScaleType = scale_1.scaleTypeSupportProperty(scaleType, property);
            var channelIncompatability = scale_1.channelScalePropertyIncompatability(channel, property);
            if (!supportedByScaleType) {
                log.warn(log.message.scalePropertyNotWorkWithScaleType(scaleType, property, channel));
            }
            else if (channelIncompatability) {
                log.warn(channelIncompatability);
            }
            else {
                switch (property) {
                    case 'range':
                        return split_1.makeExplicit(specifiedScale[property]);
                    case 'scheme':
                        return split_1.makeExplicit(parseScheme(specifiedScale[property]));
                    case 'rangeStep':
                        var rangeStep = specifiedScale[property];
                        if (rangeStep !== null) {
                            if (!sizeSpecified) {
                                return split_1.makeExplicit({ step: rangeStep });
                            }
                            else {
                                // If top-level size is specified, we ignore specified rangeStep.
                                log.warn(log.message.rangeStepDropped(channel));
                            }
                        }
                }
            }
        }
    }
    return split_1.makeImplicit(defaultRange(channel, scaleType, type, config, zero, mark, sizeSignal, xyRangeSteps, noRangeStep));
}
exports.parseRangeForChannel = parseRangeForChannel;
function parseScheme(scheme) {
    if (scale_1.isExtendedScheme(scheme)) {
        var r = { scheme: scheme.name };
        if (scheme.count) {
            r.count = scheme.count;
        }
        if (scheme.extent) {
            r.extent = scheme.extent;
        }
        return r;
    }
    return { scheme: scheme };
}
function defaultRange(channel, scaleType, type, config, zero, mark, sizeSignal, xyRangeSteps, noRangeStep) {
    switch (channel) {
        case channel_1.X:
        case channel_1.Y:
            if (util.contains(['point', 'band'], scaleType) && !noRangeStep) {
                if (channel === channel_1.X && mark === 'text') {
                    if (config.scale.textXRangeStep) {
                        return { step: config.scale.textXRangeStep };
                    }
                }
                else {
                    if (config.scale.rangeStep) {
                        return { step: config.scale.rangeStep };
                    }
                }
            }
            // If range step is null, use zero to width or height.
            // Note that these range signals are temporary
            // as they can be merged and renamed.
            // (We do not have the right size signal here since parseLayoutSize() happens after parseScale().)
            // We will later replace these temporary names with
            // the final name in assembleScaleRange()
            if (channel === channel_1.Y && scale_2.hasContinuousDomain(scaleType)) {
                // For y continuous scale, we have to start from the height as the bottom part has the max value.
                return [{ signal: sizeSignal }, 0];
            }
            else {
                return [0, { signal: sizeSignal }];
            }
        case channel_1.SIZE:
            // TODO: support custom rangeMin, rangeMax
            var rangeMin = sizeRangeMin(mark, zero, config);
            var rangeMax = sizeRangeMax(mark, xyRangeSteps, config);
            return [rangeMin, rangeMax];
        case channel_1.SHAPE:
            return 'symbol';
        case channel_1.COLOR:
            if (scaleType === 'ordinal') {
                // Only nominal data uses ordinal scale by default
                return type === 'nominal' ? 'category' : 'ordinal';
            }
            return mark === 'rect' ? 'heatmap' : 'ramp';
        case channel_1.OPACITY:
            // TODO: support custom rangeMin, rangeMax
            return [config.scale.minOpacity, config.scale.maxOpacity];
    }
    /* istanbul ignore next: should never reach here */
    throw new Error("Scale range undefined for channel " + channel);
}
exports.defaultRange = defaultRange;
function sizeRangeMin(mark, zero, config) {
    if (zero) {
        return 0;
    }
    switch (mark) {
        case 'bar':
        case 'tick':
            return config.scale.minBandSize;
        case 'line':
        case 'rule':
            return config.scale.minStrokeWidth;
        case 'text':
            return config.scale.minFontSize;
        case 'point':
        case 'square':
        case 'circle':
            return config.scale.minSize;
    }
    /* istanbul ignore next: should never reach here */
    // sizeRangeMin not implemented for the mark
    throw new Error(log.message.incompatibleChannel('size', mark));
}
function sizeRangeMax(mark, xyRangeSteps, config) {
    var scaleConfig = config.scale;
    // TODO(#1168): make max size scale based on rangeStep / overall plot size
    switch (mark) {
        case 'bar':
        case 'tick':
            if (config.scale.maxBandSize !== undefined) {
                return config.scale.maxBandSize;
            }
            return minXYRangeStep(xyRangeSteps, config.scale) - 1;
        case 'line':
        case 'rule':
            return config.scale.maxStrokeWidth;
        case 'text':
            return config.scale.maxFontSize;
        case 'point':
        case 'square':
        case 'circle':
            if (config.scale.maxSize) {
                return config.scale.maxSize;
            }
            // FIXME this case totally should be refactored
            var pointStep = minXYRangeStep(xyRangeSteps, scaleConfig);
            return (pointStep - 2) * (pointStep - 2);
    }
    /* istanbul ignore next: should never reach here */
    // sizeRangeMax not implemented for the mark
    throw new Error(log.message.incompatibleChannel('size', mark));
}
/**
 * @returns {number} Range step of x or y or minimum between the two if both are ordinal scale.
 */
function minXYRangeStep(xyRangeSteps, scaleConfig) {
    if (xyRangeSteps.length > 0) {
        return Math.min.apply(null, xyRangeSteps);
    }
    if (scaleConfig.rangeStep) {
        return scaleConfig.rangeStep;
    }
    return 21; // FIXME: re-evaluate the default value here.
}

},{"../../channel":15,"../../log":105,"../../scale":108,"../../util":118,"../../vega.schema":120,"../model":66,"../split":89,"./properties":74,"vega-util":10}],76:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../../channel");
var log = require("../../log");
var scale_1 = require("../../scale");
var scale_2 = require("../../scale");
var type_1 = require("../../type");
var util = require("../../util");
var util_1 = require("../../util");
/**
 * Determine if there is a specified scale type and if it is appropriate,
 * or determine default type if type is unspecified or inappropriate.
 */
// NOTE: CompassQL uses this method.
function scaleType(specifiedType, channel, fieldDef, mark, scaleConfig) {
    var defaultScaleType = defaultType(channel, fieldDef, mark, scaleConfig);
    if (!channel_1.isScaleChannel(channel)) {
        // There is no scale for these channels
        return null;
    }
    if (specifiedType !== undefined) {
        // Check if explicitly specified scale type is supported by the channel
        if (!scale_1.channelSupportScaleType(channel, specifiedType)) {
            log.warn(log.message.scaleTypeNotWorkWithChannel(channel, specifiedType, defaultScaleType));
            return defaultScaleType;
        }
        // Check if explicitly specified scale type is supported by the data type
        if (!fieldDefMatchScaleType(specifiedType, fieldDef)) {
            log.warn(log.message.scaleTypeNotWorkWithFieldDef(specifiedType, defaultScaleType));
            return defaultScaleType;
        }
        return specifiedType;
    }
    return defaultScaleType;
}
exports.scaleType = scaleType;
/**
 * Determine appropriate default scale type.
 */
// NOTE: Voyager uses this method.
function defaultType(channel, fieldDef, mark, scaleConfig) {
    switch (fieldDef.type) {
        case 'nominal':
        case 'ordinal':
            if (channel === 'color' || channel_1.rangeType(channel) === 'discrete') {
                if (channel === 'shape' && fieldDef.type === 'ordinal') {
                    log.warn(log.message.discreteChannelCannotEncode(channel, 'ordinal'));
                }
                return 'ordinal';
            }
            if (util.contains(['x', 'y'], channel)) {
                if (mark === 'rect') {
                    // The rect mark should fit into a band.
                    return 'band';
                }
                if (mark === 'bar') {
                    return 'band';
                }
            }
            // Otherwise, use ordinal point scale so we can easily get center positions of the marks.
            return 'point';
        case 'temporal':
            if (channel === 'color') {
                return 'sequential';
            }
            else if (channel_1.rangeType(channel) === 'discrete') {
                log.warn(log.message.discreteChannelCannotEncode(channel, 'temporal'));
                // TODO: consider using quantize (equivalent to binning) once we have it
                return 'ordinal';
            }
            return 'time';
        case 'quantitative':
            if (channel === 'color') {
                if (fieldDef.bin) {
                    return 'bin-ordinal';
                }
                // Use `sequential` as the default color scale for continuous data
                // since it supports both array range and scheme range.
                return 'sequential';
            }
            else if (channel_1.rangeType(channel) === 'discrete') {
                log.warn(log.message.discreteChannelCannotEncode(channel, 'quantitative'));
                // TODO: consider using quantize (equivalent to binning) once we have it
                return 'ordinal';
            }
            // x and y use a linear scale because selections don't work with bin scales.
            // Binned scales apply discretization but pan/zoom apply transformations to a [min, max] extent domain.
            if (fieldDef.bin && channel !== 'x' && channel !== 'y') {
                return 'bin-linear';
            }
            return 'linear';
    }
    /* istanbul ignore next: should never reach this */
    throw new Error(log.message.invalidFieldType(fieldDef.type));
}
function fieldDefMatchScaleType(specifiedType, fieldDef) {
    var type = fieldDef.type;
    if (util_1.contains([type_1.Type.ORDINAL, type_1.Type.NOMINAL], type)) {
        return specifiedType === undefined || scale_2.hasDiscreteDomain(specifiedType);
    }
    else if (type === type_1.Type.TEMPORAL) {
        return util_1.contains([scale_1.ScaleType.TIME, scale_1.ScaleType.UTC, scale_1.ScaleType.SEQUENTIAL, undefined], specifiedType);
    }
    else if (type === type_1.Type.QUANTITATIVE) {
        if (fieldDef.bin) {
            return util_1.contains([scale_1.ScaleType.BIN_LINEAR, scale_1.ScaleType.BIN_ORDINAL, scale_1.ScaleType.LINEAR], specifiedType);
        }
        return util_1.contains([scale_1.ScaleType.LOG, scale_1.ScaleType.POW, scale_1.ScaleType.SQRT, scale_1.ScaleType.QUANTILE, scale_1.ScaleType.QUANTIZE, scale_1.ScaleType.LINEAR, scale_1.ScaleType.SEQUENTIAL, undefined], specifiedType);
    }
    return true;
}
exports.fieldDefMatchScaleType = fieldDefMatchScaleType;

},{"../../channel":15,"../../log":105,"../../scale":108,"../../type":117,"../../util":118}],77:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../../channel");
var log_1 = require("../../log");
var scale_1 = require("../../scale");
var util_1 = require("../../util");
var selection_1 = require("./selection");
var scales_1 = require("./transforms/scales");
exports.BRUSH = '_brush';
exports.SCALE_TRIGGER = '_scale_trigger';
var interval = {
    predicate: 'vlInterval',
    scaleDomain: 'vlIntervalDomain',
    signals: function (model, selCmpt) {
        var name = selCmpt.name;
        var hasScales = scales_1.default.has(selCmpt);
        var signals = [];
        var intervals = [];
        var tupleTriggers = [];
        var scaleTriggers = [];
        if (selCmpt.translate && !hasScales) {
            var filterExpr_1 = "!event.item || event.item.mark.name !== " + util_1.stringValue(name + exports.BRUSH);
            events(selCmpt, function (_, evt) {
                var filters = evt.between[0].filter || (evt.between[0].filter = []);
                if (filters.indexOf(filterExpr_1) < 0) {
                    filters.push(filterExpr_1);
                }
            });
        }
        selCmpt.project.forEach(function (p) {
            var channel = p.channel;
            if (channel !== channel_1.X && channel !== channel_1.Y) {
                log_1.warn('Interval selections only support x and y encoding channels.');
                return;
            }
            var cs = channelSignals(model, selCmpt, channel);
            var dname = selection_1.channelSignalName(selCmpt, channel, 'data');
            var vname = selection_1.channelSignalName(selCmpt, channel, 'visual');
            var scaleStr = util_1.stringValue(model.scaleName(channel));
            var scaleType = model.getScaleComponent(channel).get('type');
            var toNum = scale_1.hasContinuousDomain(scaleType) ? '+' : '';
            signals.push.apply(signals, cs);
            tupleTriggers.push(dname);
            intervals.push("{encoding: " + util_1.stringValue(channel) + ", " +
                ("field: " + util_1.stringValue(p.field) + ", extent: " + dname + "}"));
            scaleTriggers.push({
                scaleName: model.scaleName(channel),
                expr: "(!isArray(" + dname + ") || " +
                    ("(" + toNum + "invert(" + scaleStr + ", " + vname + ")[0] === " + toNum + dname + "[0] && ") +
                    (toNum + "invert(" + scaleStr + ", " + vname + ")[1] === " + toNum + dname + "[1]))")
            });
        });
        // Proxy scale reactions to ensure that an infinite loop doesn't occur
        // when an interval selection filter touches the scale.
        if (!hasScales) {
            signals.push({
                name: name + exports.SCALE_TRIGGER,
                update: scaleTriggers.map(function (t) { return t.expr; }).join(' && ') +
                    (" ? " + (name + exports.SCALE_TRIGGER) + " : {}")
            });
        }
        // Only add an interval to the store if it has valid data extents. Data extents
        // are set to null if pixel extents are equal to account for intervals over
        // ordinal/nominal domains which, when inverted, will still produce a valid datum.
        return signals.concat({
            name: name + selection_1.TUPLE,
            on: [{
                    events: tupleTriggers.map(function (t) { return ({ signal: t }); }),
                    update: tupleTriggers.join(' && ') +
                        (" ? {unit: " + selection_1.unitName(model) + ", intervals: [" + intervals.join(', ') + "]} : null")
                }]
        });
    },
    modifyExpr: function (model, selCmpt) {
        var tpl = selCmpt.name + selection_1.TUPLE;
        return tpl + ', ' +
            (selCmpt.resolve === 'global' ? 'true' : "{unit: " + selection_1.unitName(model) + "}");
    },
    marks: function (model, selCmpt, marks) {
        var name = selCmpt.name;
        var _a = selection_1.positionalProjections(selCmpt), xi = _a.xi, yi = _a.yi;
        var store = "data(" + util_1.stringValue(selCmpt.name + selection_1.STORE) + ")";
        // Do not add a brush if we're binding to scales.
        if (scales_1.default.has(selCmpt)) {
            return marks;
        }
        var update = {
            x: xi !== null ? { signal: name + "_x[0]" } : { value: 0 },
            y: yi !== null ? { signal: name + "_y[0]" } : { value: 0 },
            x2: xi !== null ? { signal: name + "_x[1]" } : { field: { group: 'width' } },
            y2: yi !== null ? { signal: name + "_y[1]" } : { field: { group: 'height' } }
        };
        // If the selection is resolved to global, only a single interval is in
        // the store. Wrap brush mark's encodings with a production rule to test
        // this based on the `unit` property. Hide the brush mark if it corresponds
        // to a unit different from the one in the store.
        if (selCmpt.resolve === 'global') {
            for (var _i = 0, _b = util_1.keys(update); _i < _b.length; _i++) {
                var key = _b[_i];
                update[key] = [__assign({ test: store + ".length && " + store + "[0].unit === " + selection_1.unitName(model) }, update[key]), { value: 0 }];
            }
        }
        // Two brush marks ensure that fill colors and other aesthetic choices do
        // not interefere with the core marks, but that the brushed region can still
        // be interacted with (e.g., dragging it around).
        var _c = selCmpt.mark, fill = _c.fill, fillOpacity = _c.fillOpacity, stroke = __rest(_c, ["fill", "fillOpacity"]);
        var vgStroke = util_1.keys(stroke).reduce(function (def, k) {
            def[k] = { value: stroke[k] };
            return def;
        }, {});
        return [{
                name: name + exports.BRUSH + '_bg',
                type: 'rect',
                clip: true,
                encode: {
                    enter: {
                        fill: { value: fill },
                        fillOpacity: { value: fillOpacity }
                    },
                    update: update
                }
            }].concat(marks, {
            name: name + exports.BRUSH,
            type: 'rect',
            clip: true,
            encode: {
                enter: __assign({ fill: { value: 'transparent' } }, vgStroke),
                update: update
            }
        });
    }
};
exports.default = interval;
/**
 * Returns the visual and data signals for an interval selection.
 */
function channelSignals(model, selCmpt, channel) {
    var vname = selection_1.channelSignalName(selCmpt, channel, 'visual');
    var dname = selection_1.channelSignalName(selCmpt, channel, 'data');
    var hasScales = scales_1.default.has(selCmpt);
    var scaleName = model.scaleName(channel);
    var scaleStr = util_1.stringValue(scaleName);
    var scale = model.getScaleComponent(channel);
    var scaleType = scale ? scale.get('type') : undefined;
    var size = model.getSizeSignalRef(channel === channel_1.X ? 'width' : 'height').signal;
    var coord = channel + "(unit)";
    var on = events(selCmpt, function (def, evt) {
        return def.concat({ events: evt.between[0], update: "[" + coord + ", " + coord + "]" }, // Brush Start
        { events: evt, update: "[" + vname + "[0], clamp(" + coord + ", 0, " + size + ")]" } // Brush End
        );
    });
    // React to pan/zooms of continuous scales. Non-continuous scales
    // (bin-linear, band, point) cannot be pan/zoomed and any other changes
    // to their domains (e.g., filtering) should clear the brushes.
    on.push({
        events: { signal: selCmpt.name + exports.SCALE_TRIGGER },
        update: scale_1.hasContinuousDomain(scaleType) && !scale_1.isBinScale(scaleType) ?
            "[scale(" + scaleStr + ", " + dname + "[0]), scale(" + scaleStr + ", " + dname + "[1])]" : "[0, 0]"
    });
    return hasScales ? [{ name: dname, on: [] }] : [{
            name: vname, value: [], on: on
        }, {
            name: dname,
            on: [{ events: { signal: vname }, update: vname + "[0] === " + vname + "[1] ? null : invert(" + scaleStr + ", " + vname + ")" }]
        }];
}
function events(selCmpt, cb) {
    return selCmpt.events.reduce(function (on, evt) {
        if (!evt.between) {
            log_1.warn(evt + " is not an ordered event stream for interval selections");
            return on;
        }
        return cb(on, evt);
    }, []);
}

},{"../../channel":15,"../../log":105,"../../scale":108,"../../util":118,"./selection":79,"./transforms/scales":84}],78:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../util");
var selection_1 = require("./selection");
var nearest_1 = require("./transforms/nearest");
var multi = {
    predicate: 'vlMulti',
    scaleDomain: 'vlMultiDomain',
    signals: function (model, selCmpt) {
        var proj = selCmpt.project;
        var datum = nearest_1.default.has(selCmpt) ?
            '(item().isVoronoi ? datum.datum : datum)' : 'datum';
        var bins = [];
        var encodings = proj.map(function (p) { return util_1.stringValue(p.channel); }).filter(function (e) { return e; }).join(', ');
        var fields = proj.map(function (p) { return util_1.stringValue(p.field); }).join(', ');
        var values = proj.map(function (p) {
            var channel = p.channel;
            var fieldDef = model.fieldDef(channel);
            // Binned fields should capture extents, for a range test against the raw field.
            return (fieldDef && fieldDef.bin) ? (bins.push(p.field),
                "[" + datum + util_1.accessPath(model.field(channel, {})) + ", " +
                    ("" + datum + util_1.accessPath(model.field(channel, { binSuffix: 'end' })) + "]")) :
                "" + datum + util_1.accessPath(p.field);
        }).join(', ');
        // Only add a discrete selection to the store if a datum is present _and_
        // the interaction isn't occuring on a group mark. This guards against
        // polluting interactive state with invalid values in faceted displays
        // as the group marks are also data-driven. We force the update to account
        // for constant null states but varying toggles (e.g., shift-click in
        // whitespace followed by a click in whitespace; the store should only
        // be cleared on the second click).
        return [{
                name: selCmpt.name + selection_1.TUPLE,
                value: {},
                on: [{
                        events: selCmpt.events,
                        update: "datum && item().mark.marktype !== 'group' ? " +
                            ("{unit: " + selection_1.unitName(model) + ", encodings: [" + encodings + "], ") +
                            ("fields: [" + fields + "], values: [" + values + "]") +
                            (bins.length ? ', ' + bins.map(function (b) { return util_1.stringValue('bin_' + b) + ": 1"; }).join(', ') : '') +
                            '} : null',
                        force: true
                    }]
            }];
    },
    modifyExpr: function (model, selCmpt) {
        var tpl = selCmpt.name + selection_1.TUPLE;
        return tpl + ', ' +
            (selCmpt.resolve === 'global' ? 'null' : "{unit: " + selection_1.unitName(model) + "}");
    }
};
exports.default = multi;

},{"../../util":118,"./selection":79,"./transforms/nearest":82}],79:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vega_event_selector_1 = require("vega-event-selector");
var channel_1 = require("../../channel");
var log_1 = require("../../log");
var selection_1 = require("../../selection");
var util_1 = require("../../util");
var model_1 = require("../model");
var interval_1 = require("./interval");
var multi_1 = require("./multi");
var single_1 = require("./single");
var transforms_1 = require("./transforms/transforms");
exports.STORE = '_store';
exports.TUPLE = '_tuple';
exports.MODIFY = '_modify';
exports.SELECTION_DOMAIN = '_selection_domain_';
function parseUnitSelection(model, selDefs) {
    var selCmpts = {};
    var selectionConfig = model.config.selection;
    var _loop_1 = function (name_1) {
        if (!selDefs.hasOwnProperty(name_1)) {
            return "continue";
        }
        var selDef = selDefs[name_1];
        var cfg = selectionConfig[selDef.type];
        // Set default values from config if a property hasn't been specified,
        // or if it is true. E.g., "translate": true should use the default
        // event handlers for translate. However, true may be a valid value for
        // a property (e.g., "nearest": true).
        for (var key in cfg) {
            // A selection should contain either `encodings` or `fields`, only use
            // default values for these two values if neither of them is specified.
            if ((key === 'encodings' && selDef.fields) || (key === 'fields' && selDef.encodings)) {
                continue;
            }
            if (key === 'mark') {
                selDef[key] = __assign({}, cfg[key], selDef[key]);
            }
            if (selDef[key] === undefined || selDef[key] === true) {
                selDef[key] = cfg[key] || selDef[key];
            }
        }
        name_1 = util_1.varName(name_1);
        var selCmpt = selCmpts[name_1] = __assign({}, selDef, { name: name_1, events: util_1.isString(selDef.on) ? vega_event_selector_1.selector(selDef.on, 'scope') : selDef.on });
        transforms_1.forEachTransform(selCmpt, function (txCompiler) {
            if (txCompiler.parse) {
                txCompiler.parse(model, selDef, selCmpt);
            }
        });
    };
    for (var name_1 in selDefs) {
        _loop_1(name_1);
    }
    return selCmpts;
}
exports.parseUnitSelection = parseUnitSelection;
function assembleUnitSelectionSignals(model, signals) {
    forEachSelection(model, function (selCmpt, selCompiler) {
        var name = selCmpt.name;
        var modifyExpr = selCompiler.modifyExpr(model, selCmpt);
        signals.push.apply(signals, selCompiler.signals(model, selCmpt));
        transforms_1.forEachTransform(selCmpt, function (txCompiler) {
            if (txCompiler.signals) {
                signals = txCompiler.signals(model, selCmpt, signals);
            }
            if (txCompiler.modifyExpr) {
                modifyExpr = txCompiler.modifyExpr(model, selCmpt, modifyExpr);
            }
        });
        signals.push({
            name: name + exports.MODIFY,
            on: [{
                    events: { signal: name + exports.TUPLE },
                    update: "modify(" + util_1.stringValue(selCmpt.name + exports.STORE) + ", " + modifyExpr + ")"
                }]
        });
    });
    var facetModel = getFacetModel(model);
    if (signals.length && facetModel) {
        var name_2 = util_1.stringValue(facetModel.getName('cell'));
        signals.unshift({
            name: 'facet',
            value: {},
            on: [{
                    events: vega_event_selector_1.selector('mousemove', 'scope'),
                    update: "isTuple(facet) ? facet : group(" + name_2 + ").datum"
                }]
        });
    }
    return signals;
}
exports.assembleUnitSelectionSignals = assembleUnitSelectionSignals;
function assembleTopLevelSignals(model, signals) {
    var needsUnit = false;
    forEachSelection(model, function (selCmpt, selCompiler) {
        if (selCompiler.topLevelSignals) {
            signals = selCompiler.topLevelSignals(model, selCmpt, signals);
        }
        transforms_1.forEachTransform(selCmpt, function (txCompiler) {
            if (txCompiler.topLevelSignals) {
                signals = txCompiler.topLevelSignals(model, selCmpt, signals);
            }
        });
        needsUnit = true;
    });
    if (needsUnit) {
        var hasUnit = signals.filter(function (s) { return s.name === 'unit'; });
        if (!(hasUnit.length)) {
            signals.unshift({
                name: 'unit',
                value: {},
                on: [{ events: 'mousemove', update: 'isTuple(group()) ? group() : unit' }]
            });
        }
    }
    return signals;
}
exports.assembleTopLevelSignals = assembleTopLevelSignals;
function assembleUnitSelectionData(model, data) {
    forEachSelection(model, function (selCmpt) {
        var contains = data.filter(function (d) { return d.name === selCmpt.name + exports.STORE; });
        if (!contains.length) {
            data.push({ name: selCmpt.name + exports.STORE });
        }
    });
    return data;
}
exports.assembleUnitSelectionData = assembleUnitSelectionData;
function assembleUnitSelectionMarks(model, marks) {
    forEachSelection(model, function (selCmpt, selCompiler) {
        marks = selCompiler.marks ? selCompiler.marks(model, selCmpt, marks) : marks;
        transforms_1.forEachTransform(selCmpt, function (txCompiler) {
            if (txCompiler.marks) {
                marks = txCompiler.marks(model, selCmpt, marks);
            }
        });
    });
    return marks;
}
exports.assembleUnitSelectionMarks = assembleUnitSelectionMarks;
function assembleLayerSelectionMarks(model, marks) {
    model.children.forEach(function (child) {
        if (model_1.isUnitModel(child)) {
            marks = assembleUnitSelectionMarks(child, marks);
        }
    });
    return marks;
}
exports.assembleLayerSelectionMarks = assembleLayerSelectionMarks;
function predicate(model, selections, dfnode) {
    var stores = [];
    function expr(name) {
        var vname = util_1.varName(name);
        var selCmpt = model.getSelectionComponent(vname, name);
        var store = util_1.stringValue(vname + exports.STORE);
        if (selCmpt.timeUnit) {
            var child = dfnode || model.component.data.raw;
            var tunode = selCmpt.timeUnit.clone();
            if (child.parent) {
                tunode.insertAsParentOf(child);
            }
            else {
                child.parent = tunode;
            }
        }
        if (selCmpt.empty !== 'none') {
            stores.push(store);
        }
        return compiler(selCmpt.type).predicate + ("(" + store + ", datum") +
            (selCmpt.resolve === 'global' ? ')' : ", " + util_1.stringValue(selCmpt.resolve) + ")");
    }
    var predicateStr = util_1.logicalExpr(selections, expr);
    return (stores.length
        ? '!(' + stores.map(function (s) { return "length(data(" + s + "))"; }).join(' || ') + ') || '
        : '') + ("(" + predicateStr + ")");
}
exports.predicate = predicate;
// Selections are parsed _after_ scales. If a scale domain is set to
// use a selection, the SELECTION_DOMAIN constant is used as the
// domainRaw.signal during scale.parse and then replaced with the necessary
// selection expression function during scale.assemble. To not pollute the
// type signatures to account for this setup, the selection domain definition
// is coerced to a string and appended to SELECTION_DOMAIN.
function isRawSelectionDomain(domainRaw) {
    return domainRaw.signal.indexOf(exports.SELECTION_DOMAIN) >= 0;
}
exports.isRawSelectionDomain = isRawSelectionDomain;
function selectionScaleDomain(model, domainRaw) {
    var selDomain = JSON.parse(domainRaw.signal.replace(exports.SELECTION_DOMAIN, ''));
    var name = util_1.varName(selDomain.selection);
    var selCmpt = model.component.selection && model.component.selection[name];
    if (selCmpt) {
        log_1.warn('Use "bind": "scales" to setup a binding for scales and selections within the same view.');
    }
    else {
        selCmpt = model.getSelectionComponent(name, selDomain.selection);
        if (!selDomain.encoding && !selDomain.field) {
            selDomain.field = selCmpt.project[0].field;
            if (selCmpt.project.length > 1) {
                log_1.warn('A "field" or "encoding" must be specified when using a selection as a scale domain. ' +
                    ("Using \"field\": " + util_1.stringValue(selDomain.field) + "."));
            }
        }
        return {
            signal: compiler(selCmpt.type).scaleDomain +
                ("(" + util_1.stringValue(name + exports.STORE) + ", " + util_1.stringValue(selDomain.encoding || null) + ", ") +
                util_1.stringValue(selDomain.field || null) +
                (selCmpt.resolve === 'global' ? ')' : ", " + util_1.stringValue(selCmpt.resolve) + ")")
        };
    }
    return { signal: 'null' };
}
exports.selectionScaleDomain = selectionScaleDomain;
// Utility functions
function forEachSelection(model, cb) {
    var selections = model.component.selection;
    for (var name_3 in selections) {
        if (selections.hasOwnProperty(name_3)) {
            var sel = selections[name_3];
            cb(sel, compiler(sel.type));
        }
    }
}
function compiler(type) {
    switch (type) {
        case 'single':
            return single_1.default;
        case 'multi':
            return multi_1.default;
        case 'interval':
            return interval_1.default;
    }
    return null;
}
function getFacetModel(model) {
    var parent = model.parent;
    while (parent) {
        if (model_1.isFacetModel(parent)) {
            break;
        }
        parent = parent.parent;
    }
    return parent;
}
function unitName(model) {
    var name = util_1.stringValue(model.name);
    var facet = getFacetModel(model);
    if (facet) {
        name += (facet.facet.row ? " + '_' + facet" + util_1.accessPath(facet.field('row')) : '')
            + (facet.facet.column ? " + '_' + facet" + util_1.accessPath(facet.field('column')) : '');
    }
    return name;
}
exports.unitName = unitName;
function requiresSelectionId(model) {
    var identifier = false;
    forEachSelection(model, function (selCmpt) {
        identifier = identifier || selCmpt.project.some(function (proj) { return proj.field === selection_1.SELECTION_ID; });
    });
    return identifier;
}
exports.requiresSelectionId = requiresSelectionId;
function channelSignalName(selCmpt, channel, range) {
    return util_1.varName(selCmpt.name + '_' + (range === 'visual' ? channel : selCmpt.fields[channel]));
}
exports.channelSignalName = channelSignalName;
function positionalProjections(selCmpt) {
    var x = null;
    var xi = null;
    var y = null;
    var yi = null;
    selCmpt.project.forEach(function (p, i) {
        if (p.channel === channel_1.X) {
            x = p;
            xi = i;
        }
        else if (p.channel === channel_1.Y) {
            y = p;
            yi = i;
        }
    });
    return { x: x, xi: xi, y: y, yi: yi };
}
exports.positionalProjections = positionalProjections;

},{"../../channel":15,"../../log":105,"../../selection":109,"../../util":118,"../model":66,"./interval":77,"./multi":78,"./single":80,"./transforms/transforms":86,"vega-event-selector":9}],80:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../util");
var multi_1 = require("./multi");
var selection_1 = require("./selection");
var single = {
    predicate: 'vlSingle',
    scaleDomain: 'vlSingleDomain',
    signals: multi_1.default.signals,
    topLevelSignals: function (model, selCmpt, signals) {
        var hasSignal = signals.filter(function (s) { return s.name === selCmpt.name; });
        var data = "data(" + util_1.stringValue(selCmpt.name + selection_1.STORE) + ")";
        var values = data + "[0].values";
        return hasSignal.length ? signals : signals.concat({
            name: selCmpt.name,
            update: data + ".length && {" +
                selCmpt.project.map(function (p, i) { return p.field + ": " + values + "[" + i + "]"; }).join(', ') + '}'
        });
    },
    modifyExpr: function (model, selCmpt) {
        var tpl = selCmpt.name + selection_1.TUPLE;
        return tpl + ', ' +
            (selCmpt.resolve === 'global' ? 'true' : "{unit: " + selection_1.unitName(model) + "}");
    }
};
exports.default = single;

},{"../../util":118,"./multi":78,"./selection":79}],81:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../../util");
var selection_1 = require("../selection");
var nearest_1 = require("./nearest");
var inputBindings = {
    has: function (selCmpt) {
        return selCmpt.type === 'single' && selCmpt.resolve === 'global' &&
            selCmpt.bind && selCmpt.bind !== 'scales';
    },
    topLevelSignals: function (model, selCmpt, signals) {
        var name = selCmpt.name;
        var proj = selCmpt.project;
        var bind = selCmpt.bind;
        var datum = nearest_1.default.has(selCmpt) ?
            '(item().isVoronoi ? datum.datum : datum)' : 'datum';
        proj.forEach(function (p) {
            var sgname = util_1.varName(name + "_" + p.field);
            var hasSignal = signals.filter(function (s) { return s.name === sgname; });
            if (!hasSignal.length) {
                signals.unshift({
                    name: sgname,
                    value: '',
                    on: [{
                            events: selCmpt.events,
                            update: "datum && item().mark.marktype !== 'group' ? " + datum + util_1.accessPath(p.field) + " : null"
                        }],
                    bind: bind[p.field] || bind[p.channel] || bind
                });
            }
        });
        return signals;
    },
    signals: function (model, selCmpt, signals) {
        var name = selCmpt.name;
        var proj = selCmpt.project;
        var signal = signals.filter(function (s) { return s.name === name + selection_1.TUPLE; })[0];
        var fields = proj.map(function (p) { return util_1.stringValue(p.field); }).join(', ');
        var values = proj.map(function (p) { return util_1.varName(name + "_" + p.field); });
        signal.update = values.join(' && ') + " ? {fields: [" + fields + "], values: [" + values.join(', ') + "]} : null";
        delete signal.value;
        delete signal.on;
        return signals;
    }
};
exports.default = inputBindings;

},{"../../../util":118,"../selection":79,"./nearest":82}],82:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("../../../log");
var selection_1 = require("../selection");
var VORONOI = 'voronoi';
var nearest = {
    has: function (selCmpt) {
        return selCmpt.type !== 'interval' && selCmpt.nearest;
    },
    marks: function (model, selCmpt, marks) {
        var _a = selection_1.positionalProjections(selCmpt), x = _a.x, y = _a.y;
        var markType = model.mark();
        if (markType === 'line' || markType === 'area') {
            log.warn(log.message.nearestNotSupportForContinuous(markType));
            return marks;
        }
        var cellDef = {
            name: model.getName(VORONOI),
            type: 'path',
            from: { data: model.getName('marks') },
            encode: {
                enter: {
                    fill: { value: 'transparent' },
                    strokeWidth: { value: 0.35 },
                    stroke: { value: 'transparent' },
                    isVoronoi: { value: true }
                }
            },
            transform: [{
                    type: 'voronoi',
                    x: (x || (!x && !y)) ? 'datum.x' : { expr: '0' },
                    y: (y || (!x && !y)) ? 'datum.y' : { expr: '0' },
                    size: [model.getSizeSignalRef('width'), model.getSizeSignalRef('height')]
                }]
        };
        var index = 0;
        var exists = false;
        marks.forEach(function (mark, i) {
            var name = mark.name || '';
            if (name === model.component.mark[0].name) {
                index = i;
            }
            else if (name.indexOf(VORONOI) >= 0) {
                exists = true;
            }
        });
        if (!exists) {
            marks.splice(index + 1, 0, cellDef);
        }
        return marks;
    }
};
exports.default = nearest;

},{"../../../log":105,"../selection":79}],83:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("../../../log");
var util_1 = require("../../../util");
var timeunit_1 = require("../../data/timeunit");
var project = {
    has: function (selDef) {
        var def = selDef;
        return def.fields !== undefined || def.encodings !== undefined;
    },
    parse: function (model, selDef, selCmpt) {
        var channels = {};
        var timeUnits = {};
        // TODO: find a possible channel mapping for these fields.
        (selDef.fields || []).forEach(function (field) { return channels[field] = null; });
        (selDef.encodings || []).forEach(function (channel) {
            var fieldDef = model.fieldDef(channel);
            if (fieldDef) {
                if (fieldDef.timeUnit) {
                    var tuField = model.field(channel);
                    channels[tuField] = channel;
                    // Construct TimeUnitComponents which will be combined into a
                    // TimeUnitNode. This node may need to be inserted into the
                    // dataflow if the selection is used across views that do not
                    // have these time units defined.
                    timeUnits[tuField] = {
                        as: tuField,
                        field: fieldDef.field,
                        timeUnit: fieldDef.timeUnit
                    };
                }
                else {
                    channels[fieldDef.field] = channel;
                }
            }
            else {
                log.warn(log.message.cannotProjectOnChannelWithoutField(channel));
            }
        });
        var projection = selCmpt.project || (selCmpt.project = []);
        for (var field in channels) {
            if (channels.hasOwnProperty(field)) {
                projection.push({ field: field, channel: channels[field] });
            }
        }
        var fields = selCmpt.fields || (selCmpt.fields = {});
        projection.filter(function (p) { return p.channel; }).forEach(function (p) { return fields[p.channel] = p.field; });
        if (util_1.keys(timeUnits).length) {
            selCmpt.timeUnit = new timeunit_1.TimeUnitNode(timeUnits);
        }
    }
};
exports.default = project;

},{"../../../log":105,"../../../util":118,"../../data/timeunit":43}],84:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("../../../log");
var scale_1 = require("../../../scale");
var util_1 = require("../../../util");
var selection_1 = require("../selection");
var scaleBindings = {
    has: function (selCmpt) {
        return selCmpt.type === 'interval' && selCmpt.resolve === 'global' &&
            selCmpt.bind && selCmpt.bind === 'scales';
    },
    parse: function (model, selDef, selCmpt) {
        var bound = selCmpt.scales = [];
        selCmpt.project.forEach(function (p) {
            var channel = p.channel;
            var scale = model.getScaleComponent(channel);
            var scaleType = scale ? scale.get('type') : undefined;
            if (!scale || !scale_1.hasContinuousDomain(scaleType) || scale_1.isBinScale(scaleType)) {
                log.warn(log.message.SCALE_BINDINGS_CONTINUOUS);
                return;
            }
            scale.set('domainRaw', { signal: selection_1.channelSignalName(selCmpt, channel, 'data') }, true);
            bound.push(channel);
        });
    },
    topLevelSignals: function (model, selCmpt, signals) {
        // Top-level signals are only needed when coordinating composed views.
        if (!model.parent) {
            return signals;
        }
        var channels = selCmpt.scales.filter(function (channel) {
            return !(signals.filter(function (s) { return s.name === selection_1.channelSignalName(selCmpt, channel, 'data'); }).length);
        });
        return signals.concat(channels.map(function (channel) {
            return { name: selection_1.channelSignalName(selCmpt, channel, 'data') };
        }));
    },
    signals: function (model, selCmpt, signals) {
        // Nested signals need only push to top-level signals when within composed views.
        if (model.parent) {
            selCmpt.scales.forEach(function (channel) {
                var signal = signals.filter(function (s) { return s.name === selection_1.channelSignalName(selCmpt, channel, 'data'); })[0];
                signal.push = 'outer';
                delete signal.value;
                delete signal.update;
            });
        }
        return signals;
    }
};
exports.default = scaleBindings;
function domain(model, channel) {
    var scale = util_1.stringValue(model.scaleName(channel));
    return "domain(" + scale + ")";
}
exports.domain = domain;

},{"../../../log":105,"../../../scale":108,"../../../util":118,"../selection":79}],85:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var selection_1 = require("../selection");
var TOGGLE = '_toggle';
var toggle = {
    has: function (selCmpt) {
        return selCmpt.type === 'multi' && selCmpt.toggle;
    },
    signals: function (model, selCmpt, signals) {
        return signals.concat({
            name: selCmpt.name + TOGGLE,
            value: false,
            on: [{ events: selCmpt.events, update: selCmpt.toggle }]
        });
    },
    modifyExpr: function (model, selCmpt, expr) {
        var tpl = selCmpt.name + selection_1.TUPLE;
        var signal = selCmpt.name + TOGGLE;
        return signal + " ? null : " + tpl + ", " +
            (selCmpt.resolve === 'global' ?
                signal + " ? null : true, " :
                signal + " ? null : {unit: " + selection_1.unitName(model) + "}, ") +
            (signal + " ? " + tpl + " : null");
    }
};
exports.default = toggle;

},{"../selection":79}],86:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inputs_1 = require("./inputs");
var nearest_1 = require("./nearest");
var project_1 = require("./project");
var scales_1 = require("./scales");
var toggle_1 = require("./toggle");
var translate_1 = require("./translate");
var zoom_1 = require("./zoom");
var compilers = { project: project_1.default, toggle: toggle_1.default, scales: scales_1.default,
    translate: translate_1.default, zoom: zoom_1.default, inputs: inputs_1.default, nearest: nearest_1.default };
function forEachTransform(selCmpt, cb) {
    for (var t in compilers) {
        if (compilers[t].has(selCmpt)) {
            cb(compilers[t]);
        }
    }
}
exports.forEachTransform = forEachTransform;

},{"./inputs":81,"./nearest":82,"./project":83,"./scales":84,"./toggle":85,"./translate":87,"./zoom":88}],87:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vega_event_selector_1 = require("vega-event-selector");
var channel_1 = require("../../../channel");
var interval_1 = require("../interval");
var selection_1 = require("../selection");
var scales_1 = require("./scales");
var ANCHOR = '_translate_anchor';
var DELTA = '_translate_delta';
var translate = {
    has: function (selCmpt) {
        return selCmpt.type === 'interval' && selCmpt.translate;
    },
    signals: function (model, selCmpt, signals) {
        var name = selCmpt.name;
        var hasScales = scales_1.default.has(selCmpt);
        var anchor = name + ANCHOR;
        var _a = selection_1.positionalProjections(selCmpt), x = _a.x, y = _a.y;
        var events = vega_event_selector_1.selector(selCmpt.translate, 'scope');
        if (!hasScales) {
            events = events.map(function (e) { return (e.between[0].markname = name + interval_1.BRUSH, e); });
        }
        signals.push({
            name: anchor,
            value: {},
            on: [{
                    events: events.map(function (e) { return e.between[0]; }),
                    update: '{x: x(unit), y: y(unit)' +
                        (x !== null ? ', extent_x: ' + (hasScales ? scales_1.domain(model, channel_1.X) :
                            "slice(" + selection_1.channelSignalName(selCmpt, 'x', 'visual') + ")") : '') +
                        (y !== null ? ', extent_y: ' + (hasScales ? scales_1.domain(model, channel_1.Y) :
                            "slice(" + selection_1.channelSignalName(selCmpt, 'y', 'visual') + ")") : '') + '}'
                }]
        }, {
            name: name + DELTA,
            value: {},
            on: [{
                    events: events,
                    update: "{x: " + anchor + ".x - x(unit), y: " + anchor + ".y - y(unit)}"
                }]
        });
        if (x !== null) {
            onDelta(model, selCmpt, channel_1.X, 'width', signals);
        }
        if (y !== null) {
            onDelta(model, selCmpt, channel_1.Y, 'height', signals);
        }
        return signals;
    }
};
exports.default = translate;
function onDelta(model, selCmpt, channel, size, signals) {
    var name = selCmpt.name;
    var hasScales = scales_1.default.has(selCmpt);
    var signal = signals.filter(function (s) {
        return s.name === selection_1.channelSignalName(selCmpt, channel, hasScales ? 'data' : 'visual');
    })[0];
    var anchor = name + ANCHOR;
    var delta = name + DELTA;
    var sizeSg = model.getSizeSignalRef(size).signal;
    var scaleCmpt = model.getScaleComponent(channel);
    var scaleType = scaleCmpt.get('type');
    var sign = hasScales && channel === channel_1.X ? '-' : ''; // Invert delta when panning x-scales.
    var extent = anchor + ".extent_" + channel;
    var offset = "" + sign + delta + "." + channel + " / " + (hasScales ? "" + sizeSg : "span(" + extent + ")");
    var panFn = !hasScales ? 'panLinear' :
        scaleType === 'log' ? 'panLog' :
            scaleType === 'pow' ? 'panPow' : 'panLinear';
    var update = panFn + "(" + extent + ", " + offset +
        (hasScales && scaleType === 'pow' ? ", " + (scaleCmpt.get('exponent') || 1) : '') + ')';
    signal.on.push({
        events: { signal: delta },
        update: hasScales ? update : "clampRange(" + update + ", 0, " + sizeSg + ")"
    });
}

},{"../../../channel":15,"../interval":77,"../selection":79,"./scales":84,"vega-event-selector":9}],88:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vega_event_selector_1 = require("vega-event-selector");
var channel_1 = require("../../../channel");
var util_1 = require("../../../util");
var interval_1 = require("../interval");
var selection_1 = require("../selection");
var scales_1 = require("./scales");
var ANCHOR = '_zoom_anchor';
var DELTA = '_zoom_delta';
var zoom = {
    has: function (selCmpt) {
        return selCmpt.type === 'interval' && selCmpt.zoom;
    },
    signals: function (model, selCmpt, signals) {
        var name = selCmpt.name;
        var hasScales = scales_1.default.has(selCmpt);
        var delta = name + DELTA;
        var _a = selection_1.positionalProjections(selCmpt), x = _a.x, y = _a.y;
        var sx = util_1.stringValue(model.scaleName(channel_1.X));
        var sy = util_1.stringValue(model.scaleName(channel_1.Y));
        var events = vega_event_selector_1.selector(selCmpt.zoom, 'scope');
        if (!hasScales) {
            events = events.map(function (e) { return (e.markname = name + interval_1.BRUSH, e); });
        }
        signals.push({
            name: name + ANCHOR,
            on: [{
                    events: events,
                    update: !hasScales ? "{x: x(unit), y: y(unit)}" :
                        '{' + [
                            (sx ? "x: invert(" + sx + ", x(unit))" : ''),
                            (sy ? "y: invert(" + sy + ", y(unit))" : '')
                        ].filter(function (expr) { return !!expr; }).join(', ') + '}'
                }]
        }, {
            name: delta,
            on: [{
                    events: events,
                    force: true,
                    update: 'pow(1.001, event.deltaY * pow(16, event.deltaMode))'
                }]
        });
        if (x !== null) {
            onDelta(model, selCmpt, 'x', 'width', signals);
        }
        if (y !== null) {
            onDelta(model, selCmpt, 'y', 'height', signals);
        }
        return signals;
    }
};
exports.default = zoom;
function onDelta(model, selCmpt, channel, size, signals) {
    var name = selCmpt.name;
    var hasScales = scales_1.default.has(selCmpt);
    var signal = signals.filter(function (s) {
        return s.name === selection_1.channelSignalName(selCmpt, channel, hasScales ? 'data' : 'visual');
    })[0];
    var sizeSg = model.getSizeSignalRef(size).signal;
    var scaleCmpt = model.getScaleComponent(channel);
    var scaleType = scaleCmpt.get('type');
    var base = hasScales ? scales_1.domain(model, channel) : signal.name;
    var delta = name + DELTA;
    var anchor = "" + name + ANCHOR + "." + channel;
    var zoomFn = !hasScales ? 'zoomLinear' :
        scaleType === 'log' ? 'zoomLog' :
            scaleType === 'pow' ? 'zoomPow' : 'zoomLinear';
    var update = zoomFn + "(" + base + ", " + anchor + ", " + delta +
        (hasScales && scaleType === 'pow' ? ", " + (scaleCmpt.get('exponent') || 1) : '') + ')';
    signal.on.push({
        events: { signal: delta },
        update: hasScales ? update : "clampRange(" + update + ", 0, " + sizeSg + ")"
    });
}

},{"../../../channel":15,"../../../util":118,"../interval":77,"../selection":79,"./scales":84,"vega-event-selector":9}],89:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("../log");
var util_1 = require("../util");
/**
 * Generic class for storing properties that are explicitly specified
 * and implicitly determined by the compiler.
 * This is important for scale/axis/legend merging as
 * we want to prioritize properties that users explicitly specified.
 */
var Split = /** @class */ (function () {
    function Split(explicit, implicit) {
        if (explicit === void 0) { explicit = {}; }
        if (implicit === void 0) { implicit = {}; }
        this.explicit = explicit;
        this.implicit = implicit;
    }
    Split.prototype.clone = function () {
        return new Split(util_1.duplicate(this.explicit), util_1.duplicate(this.implicit));
    };
    Split.prototype.combine = function () {
        // FIXME remove "as any".
        // Add "as any" to avoid an error "Spread types may only be created from object types".
        return __assign({}, this.explicit, this.implicit);
    };
    Split.prototype.get = function (key) {
        // Explicit has higher precedence
        return this.explicit[key] !== undefined ? this.explicit[key] : this.implicit[key];
    };
    Split.prototype.getWithExplicit = function (key) {
        // Explicit has higher precedence
        if (this.explicit[key] !== undefined) {
            return { explicit: true, value: this.explicit[key] };
        }
        else if (this.implicit[key] !== undefined) {
            return { explicit: false, value: this.implicit[key] };
        }
        return { explicit: false, value: undefined };
    };
    Split.prototype.setWithExplicit = function (key, value) {
        if (value.value !== undefined) {
            this.set(key, value.value, value.explicit);
        }
    };
    Split.prototype.set = function (key, value, explicit) {
        delete this[explicit ? 'implicit' : 'explicit'][key];
        this[explicit ? 'explicit' : 'implicit'][key] = value;
        return this;
    };
    Split.prototype.copyKeyFromSplit = function (key, s) {
        // Explicit has higher precedence
        if (s.explicit[key] !== undefined) {
            this.set(key, s.explicit[key], true);
        }
        else if (s.implicit[key] !== undefined) {
            this.set(key, s.implicit[key], false);
        }
    };
    Split.prototype.copyKeyFromObject = function (key, s) {
        // Explicit has higher precedence
        if (s[key] !== undefined) {
            this.set(key, s[key], true);
        }
    };
    return Split;
}());
exports.Split = Split;
function makeExplicit(value) {
    return {
        explicit: true,
        value: value
    };
}
exports.makeExplicit = makeExplicit;
function makeImplicit(value) {
    return {
        explicit: false,
        value: value
    };
}
exports.makeImplicit = makeImplicit;
function tieBreakByComparing(compare) {
    return function (v1, v2, property, propertyOf) {
        var diff = compare(v1.value, v2.value);
        if (diff > 0) {
            return v1;
        }
        else if (diff < 0) {
            return v2;
        }
        return defaultTieBreaker(v1, v2, property, propertyOf);
    };
}
exports.tieBreakByComparing = tieBreakByComparing;
function defaultTieBreaker(v1, v2, property, propertyOf) {
    if (v1.explicit && v2.explicit) {
        log.warn(log.message.mergeConflictingProperty(property, propertyOf, v1.value, v2.value));
    }
    // If equal score, prefer v1.
    return v1;
}
exports.defaultTieBreaker = defaultTieBreaker;
function mergeValuesWithExplicit(v1, v2, property, propertyOf, tieBreaker) {
    if (tieBreaker === void 0) { tieBreaker = defaultTieBreaker; }
    if (v1 === undefined || v1.value === undefined) {
        // For first run
        return v2;
    }
    if (v1.explicit && !v2.explicit) {
        return v1;
    }
    else if (v2.explicit && !v1.explicit) {
        return v2;
    }
    else if (v1.value === v2.value) {
        return v1;
    }
    else {
        return tieBreaker(v1, v2, property, propertyOf);
    }
}
exports.mergeValuesWithExplicit = mergeValuesWithExplicit;

},{"../log":105,"../util":118}],90:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("../channel");
var vlEncoding = require("../encoding");
var encoding_1 = require("../encoding");
var fielddef_1 = require("../fielddef");
var mark_1 = require("../mark");
var stack_1 = require("../stack");
var util_1 = require("../util");
var parse_1 = require("./axis/parse");
var parse_2 = require("./data/parse");
var assemble_1 = require("./layoutsize/assemble");
var parse_3 = require("./layoutsize/parse");
var init_1 = require("./mark/init");
var mark_2 = require("./mark/mark");
var model_1 = require("./model");
var repeater_1 = require("./repeater");
var selection_1 = require("./selection/selection");
/**
 * Internal model of Vega-Lite specification for the compiler.
 */
var UnitModel = /** @class */ (function (_super) {
    __extends(UnitModel, _super);
    function UnitModel(spec, parent, parentGivenName, parentGivenSize, repeater, config, fit) {
        if (parentGivenSize === void 0) { parentGivenSize = {}; }
        var _this = _super.call(this, spec, parent, parentGivenName, config, undefined) || this;
        _this.fit = fit;
        _this.type = 'unit';
        _this.specifiedScales = {};
        _this.specifiedAxes = {};
        _this.specifiedLegends = {};
        _this.selection = {};
        _this.children = [];
        _this.initSize(__assign({}, parentGivenSize, (spec.width ? { width: spec.width } : {}), (spec.height ? { height: spec.height } : {})));
        var mark = mark_1.isMarkDef(spec.mark) ? spec.mark.type : spec.mark;
        var encoding = _this.encoding = encoding_1.normalizeEncoding(repeater_1.replaceRepeaterInEncoding(spec.encoding || {}, repeater), mark);
        _this.markDef = init_1.normalizeMarkDef(spec.mark, encoding, config);
        // calculate stack properties
        _this.stack = stack_1.stack(mark, encoding, _this.config.stack);
        _this.specifiedScales = _this.initScales(mark, encoding);
        // FIXME: this one seems out of place!
        _this.encoding = init_1.initEncoding(_this.markDef, encoding, _this.stack, _this.config);
        _this.specifiedAxes = _this.initAxes(encoding);
        _this.specifiedLegends = _this.initLegend(encoding);
        // Selections will be initialized upon parse.
        _this.selection = spec.selection;
        return _this;
    }
    /**
     * Return specified Vega-lite scale domain for a particular channel
     * @param channel
     */
    UnitModel.prototype.scaleDomain = function (channel) {
        var scale = this.specifiedScales[channel];
        return scale ? scale.domain : undefined;
    };
    UnitModel.prototype.sort = function (channel) {
        return (this.getMapping()[channel] || {}).sort;
    };
    UnitModel.prototype.axis = function (channel) {
        return this.specifiedAxes[channel];
    };
    UnitModel.prototype.legend = function (channel) {
        return this.specifiedLegends[channel];
    };
    UnitModel.prototype.initScales = function (mark, encoding) {
        return channel_1.SCALE_CHANNELS.reduce(function (scales, channel) {
            var fieldDef;
            var specifiedScale;
            var channelDef = encoding[channel];
            if (fielddef_1.isFieldDef(channelDef)) {
                fieldDef = channelDef;
                specifiedScale = channelDef.scale;
            }
            else if (fielddef_1.hasConditionalFieldDef(channelDef)) {
                fieldDef = channelDef.condition;
                specifiedScale = channelDef.condition['scale'];
            }
            else if (channel === 'x') {
                fieldDef = fielddef_1.getFieldDef(encoding.x2);
            }
            else if (channel === 'y') {
                fieldDef = fielddef_1.getFieldDef(encoding.y2);
            }
            if (fieldDef) {
                scales[channel] = specifiedScale || {};
            }
            return scales;
        }, {});
    };
    UnitModel.prototype.initAxes = function (encoding) {
        return [channel_1.X, channel_1.Y].reduce(function (_axis, channel) {
            // Position Axis
            // TODO: handle ConditionFieldDef
            var channelDef = encoding[channel];
            if (fielddef_1.isFieldDef(channelDef) ||
                (channel === channel_1.X && fielddef_1.isFieldDef(encoding.x2)) ||
                (channel === channel_1.Y && fielddef_1.isFieldDef(encoding.y2))) {
                var axisSpec = fielddef_1.isFieldDef(channelDef) ? channelDef.axis : null;
                // We no longer support false in the schema, but we keep false here for backward compatability.
                if (axisSpec !== null && axisSpec !== false) {
                    _axis[channel] = __assign({}, axisSpec);
                }
            }
            return _axis;
        }, {});
    };
    UnitModel.prototype.initLegend = function (encoding) {
        return channel_1.NONPOSITION_SCALE_CHANNELS.reduce(function (_legend, channel) {
            var channelDef = encoding[channel];
            if (channelDef) {
                var legend = fielddef_1.isFieldDef(channelDef) ? channelDef.legend :
                    (fielddef_1.hasConditionalFieldDef(channelDef)) ? channelDef.condition['legend'] : null;
                if (legend !== null && legend !== false) {
                    _legend[channel] = __assign({}, legend);
                }
            }
            return _legend;
        }, {});
    };
    UnitModel.prototype.parseData = function () {
        this.component.data = parse_2.parseData(this);
    };
    UnitModel.prototype.parseLayoutSize = function () {
        parse_3.parseUnitLayoutSize(this);
    };
    UnitModel.prototype.parseSelection = function () {
        this.component.selection = selection_1.parseUnitSelection(this, this.selection);
    };
    UnitModel.prototype.parseMarkGroup = function () {
        this.component.mark = mark_2.parseMarkGroup(this);
    };
    UnitModel.prototype.parseAxisAndHeader = function () {
        this.component.axes = parse_1.parseUnitAxis(this);
    };
    UnitModel.prototype.assembleSelectionTopLevelSignals = function (signals) {
        return selection_1.assembleTopLevelSignals(this, signals);
    };
    UnitModel.prototype.assembleSelectionSignals = function () {
        return selection_1.assembleUnitSelectionSignals(this, []);
    };
    UnitModel.prototype.assembleSelectionData = function (data) {
        return selection_1.assembleUnitSelectionData(this, data);
    };
    UnitModel.prototype.assembleLayout = function () {
        return null;
    };
    UnitModel.prototype.assembleLayoutSignals = function () {
        return assemble_1.assembleLayoutSignals(this);
    };
    UnitModel.prototype.assembleMarks = function () {
        var marks = this.component.mark || [];
        // If this unit is part of a layer, selections should augment
        // all in concert rather than each unit individually. This
        // ensures correct interleaving of clipping and brushed marks.
        if (!this.parent || !model_1.isLayerModel(this.parent)) {
            marks = selection_1.assembleUnitSelectionMarks(this, marks);
        }
        return marks.map(this.correctDataNames);
    };
    UnitModel.prototype.assembleLayoutSize = function () {
        return {
            width: this.getSizeSignalRef('width'),
            height: this.getSizeSignalRef('height')
        };
    };
    UnitModel.prototype.getMapping = function () {
        return this.encoding;
    };
    UnitModel.prototype.toSpec = function (excludeConfig, excludeData) {
        var encoding = util_1.duplicate(this.encoding);
        var spec;
        spec = {
            mark: this.markDef,
            encoding: encoding
        };
        if (!excludeConfig) {
            spec.config = util_1.duplicate(this.config);
        }
        if (!excludeData) {
            spec.data = util_1.duplicate(this.data);
        }
        // remove defaults
        return spec;
    };
    UnitModel.prototype.mark = function () {
        return this.markDef.type;
    };
    UnitModel.prototype.channelHasField = function (channel) {
        return vlEncoding.channelHasField(this.encoding, channel);
    };
    UnitModel.prototype.fieldDef = function (channel) {
        var channelDef = this.encoding[channel];
        return fielddef_1.getFieldDef(channelDef);
    };
    return UnitModel;
}(model_1.ModelWithField));
exports.UnitModel = UnitModel;

},{"../channel":15,"../encoding":98,"../fielddef":100,"../mark":107,"../stack":112,"../util":118,"./axis/parse":20,"./data/parse":40,"./layoutsize/assemble":47,"./layoutsize/parse":48,"./mark/init":56,"./mark/mark":58,"./model":66,"./repeater":68,"./selection/selection":79}],91:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vega_util_1 = require("vega-util");
var encoding_1 = require("../encoding");
var encoding_2 = require("./../encoding");
var fielddef_1 = require("./../fielddef");
var log = require("./../log");
var common_1 = require("./common");
exports.BOXPLOT = 'box-plot';
function isBoxPlotDef(mark) {
    return !!mark['type'];
}
exports.isBoxPlotDef = isBoxPlotDef;
exports.BOXPLOT_STYLES = ['boxWhisker', 'box', 'boxMid'];
exports.VL_ONLY_BOXPLOT_CONFIG_PROPERTY_INDEX = {
    box: ['size', 'color'],
    boxWhisker: ['color'],
    boxMid: ['color']
};
var supportedChannels = ['x', 'y', 'color', 'detail', 'opacity', 'size'];
function filterUnsupportedChannels(spec) {
    return __assign({}, spec, { encoding: encoding_1.reduce(spec.encoding, function (newEncoding, fieldDef, channel) {
            if (supportedChannels.indexOf(channel) > -1) {
                newEncoding[channel] = fieldDef;
            }
            else {
                log.warn(log.message.incompatibleChannel(channel, exports.BOXPLOT));
            }
            return newEncoding;
        }, {}) });
}
exports.filterUnsupportedChannels = filterUnsupportedChannels;
function normalizeBoxPlot(spec, config) {
    spec = filterUnsupportedChannels(spec);
    // TODO: use selection
    var mark = spec.mark, encoding = spec.encoding, selection = spec.selection, outerSpec = __rest(spec, ["mark", "encoding", "selection"]);
    var kIQRScalar = undefined;
    if (isBoxPlotDef(mark)) {
        if (mark.extent) {
            if (vega_util_1.isNumber(mark.extent)) {
                kIQRScalar = mark.extent;
            }
        }
    }
    var orient = boxOrient(spec);
    var _a = boxParams(spec, orient, kIQRScalar), transform = _a.transform, continuousAxisChannelDef = _a.continuousAxisChannelDef, continuousAxis = _a.continuousAxis, encodingWithoutContinuousAxis = _a.encodingWithoutContinuousAxis;
    var color = encodingWithoutContinuousAxis.color, size = encodingWithoutContinuousAxis.size, encodingWithoutSizeColorAndContinuousAxis = __rest(encodingWithoutContinuousAxis, ["color", "size"]);
    // Size encoding or the default config.box.size is applied to box and boxMid
    var sizeMixins = size ? { size: size } : common_1.getMarkSpecificConfigMixins(config.box, 'size');
    var continuousAxisScaleAndAxis = {};
    if (continuousAxisChannelDef.scale) {
        continuousAxisScaleAndAxis['scale'] = continuousAxisChannelDef.scale;
    }
    if (continuousAxisChannelDef.axis) {
        continuousAxisScaleAndAxis['axis'] = continuousAxisChannelDef.axis;
    }
    return __assign({}, outerSpec, { transform: transform, layer: [
            {
                mark: {
                    type: 'rule',
                    style: 'boxWhisker'
                },
                encoding: __assign((_b = {}, _b[continuousAxis] = __assign({ field: 'lowerWhisker', type: continuousAxisChannelDef.type }, continuousAxisScaleAndAxis), _b[continuousAxis + '2'] = {
                    field: 'lowerBox',
                    type: continuousAxisChannelDef.type
                }, _b), encodingWithoutSizeColorAndContinuousAxis, common_1.getMarkSpecificConfigMixins(config.boxWhisker, 'color'))
            }, {
                mark: {
                    type: 'rule',
                    style: 'boxWhisker'
                },
                encoding: __assign((_c = {}, _c[continuousAxis] = {
                    field: 'upperBox',
                    type: continuousAxisChannelDef.type
                }, _c[continuousAxis + '2'] = {
                    field: 'upperWhisker',
                    type: continuousAxisChannelDef.type
                }, _c), encodingWithoutSizeColorAndContinuousAxis, common_1.getMarkSpecificConfigMixins(config.boxWhisker, 'color'))
            },
            __assign({}, (selection ? { selection: selection } : {}), { mark: {
                    type: 'bar',
                    style: 'box'
                }, encoding: __assign((_d = {}, _d[continuousAxis] = {
                    field: 'lowerBox',
                    type: continuousAxisChannelDef.type
                }, _d[continuousAxis + '2'] = {
                    field: 'upperBox',
                    type: continuousAxisChannelDef.type
                }, _d), encodingWithoutContinuousAxis, (encodingWithoutContinuousAxis.color ? {} : common_1.getMarkSpecificConfigMixins(config.box, 'color')), sizeMixins) }),
            {
                mark: {
                    type: 'tick',
                    style: 'boxMid'
                },
                encoding: __assign((_e = {}, _e[continuousAxis] = {
                    field: 'midBox',
                    type: continuousAxisChannelDef.type
                }, _e), encodingWithoutSizeColorAndContinuousAxis, common_1.getMarkSpecificConfigMixins(config.boxMid, 'color'), sizeMixins)
            }
        ] });
    var _b, _c, _d, _e;
}
exports.normalizeBoxPlot = normalizeBoxPlot;
function boxOrient(spec) {
    var mark = spec.mark, encoding = spec.encoding, _outerSpec = __rest(spec, ["mark", "encoding"]);
    if (fielddef_1.isFieldDef(encoding.x) && fielddef_1.isContinuous(encoding.x)) {
        // x is continuous
        if (fielddef_1.isFieldDef(encoding.y) && fielddef_1.isContinuous(encoding.y)) {
            // both x and y are continuous
            if (encoding.x.aggregate === undefined && encoding.y.aggregate === exports.BOXPLOT) {
                return 'vertical';
            }
            else if (encoding.y.aggregate === undefined && encoding.x.aggregate === exports.BOXPLOT) {
                return 'horizontal';
            }
            else if (encoding.x.aggregate === exports.BOXPLOT && encoding.y.aggregate === exports.BOXPLOT) {
                throw new Error('Both x and y cannot have aggregate');
            }
            else {
                if (isBoxPlotDef(mark) && mark.orient) {
                    return mark.orient;
                }
                // default orientation = vertical
                return 'vertical';
            }
        }
        // x is continuous but y is not
        return 'horizontal';
    }
    else if (fielddef_1.isFieldDef(encoding.y) && fielddef_1.isContinuous(encoding.y)) {
        // y is continuous but x is not
        return 'vertical';
    }
    else {
        // Neither x nor y is continuous.
        throw new Error('Need a valid continuous axis for boxplots');
    }
}
function boxContinousAxis(spec, orient) {
    var mark = spec.mark, encoding = spec.encoding, _outerSpec = __rest(spec, ["mark", "encoding"]);
    var continuousAxisChannelDef;
    var continuousAxis;
    if (orient === 'vertical') {
        continuousAxis = 'y';
        continuousAxisChannelDef = encoding.y; // Safe to cast because if y is not continous fielddef, the orient would not be vertical.
    }
    else {
        continuousAxis = 'x';
        continuousAxisChannelDef = encoding.x; // Safe to cast because if x is not continous fielddef, the orient would not be horizontal.
    }
    if (continuousAxisChannelDef && continuousAxisChannelDef.aggregate) {
        var aggregate = continuousAxisChannelDef.aggregate, continuousAxisWithoutAggregate = __rest(continuousAxisChannelDef, ["aggregate"]);
        if (aggregate !== exports.BOXPLOT) {
            log.warn("Continuous axis should not have customized aggregation function " + aggregate);
        }
        continuousAxisChannelDef = continuousAxisWithoutAggregate;
    }
    return {
        continuousAxisChannelDef: continuousAxisChannelDef,
        continuousAxis: continuousAxis
    };
}
function boxParams(spec, orient, kIQRScalar) {
    var _a = boxContinousAxis(spec, orient), continuousAxisChannelDef = _a.continuousAxisChannelDef, continuousAxis = _a.continuousAxis;
    var encoding = spec.encoding;
    var isMinMax = kIQRScalar === undefined;
    var aggregate = [
        {
            op: 'q1',
            field: continuousAxisChannelDef.field,
            as: 'lowerBox'
        },
        {
            op: 'q3',
            field: continuousAxisChannelDef.field,
            as: 'upperBox'
        },
        {
            op: 'median',
            field: continuousAxisChannelDef.field,
            as: 'midBox'
        }
    ];
    var postAggregateCalculates = [];
    if (isMinMax) {
        aggregate.push({
            op: 'min',
            field: continuousAxisChannelDef.field,
            as: 'lowerWhisker'
        });
        aggregate.push({
            op: 'max',
            field: continuousAxisChannelDef.field,
            as: 'upperWhisker'
        });
    }
    else {
        postAggregateCalculates = [
            {
                calculate: 'datum.upperBox - datum.lowerBox',
                as: 'IQR'
            },
            {
                calculate: 'datum.lowerBox - datum.IQR * ' + kIQRScalar,
                as: 'lowerWhisker'
            },
            {
                calculate: 'datum.upperBox + datum.IQR * ' + kIQRScalar,
                as: 'upperWhisker'
            }
        ];
    }
    var groupby = [];
    var bins = [];
    var timeUnits = [];
    var encodingWithoutContinuousAxis = {};
    encoding_2.forEach(encoding, function (channelDef, channel) {
        if (channel === continuousAxis) {
            // Skip continuous axis as we already handle it separately
            return;
        }
        if (fielddef_1.isFieldDef(channelDef)) {
            if (channelDef.aggregate && channelDef.aggregate !== exports.BOXPLOT) {
                aggregate.push({
                    op: channelDef.aggregate,
                    field: channelDef.field,
                    as: fielddef_1.field(channelDef)
                });
            }
            else if (channelDef.aggregate === undefined) {
                var transformedField = fielddef_1.field(channelDef);
                // Add bin or timeUnit transform if applicable
                var bin = channelDef.bin;
                if (bin) {
                    var field_1 = channelDef.field;
                    bins.push({ bin: bin, field: field_1, as: transformedField });
                }
                else if (channelDef.timeUnit) {
                    var timeUnit = channelDef.timeUnit, field_2 = channelDef.field;
                    timeUnits.push({ timeUnit: timeUnit, field: field_2, as: transformedField });
                }
                groupby.push(transformedField);
            }
            // now the field should refer to post-transformed field instead
            encodingWithoutContinuousAxis[channel] = {
                field: fielddef_1.field(channelDef),
                type: channelDef.type
            };
        }
        else {
            // For value def, just copy
            encodingWithoutContinuousAxis[channel] = encoding[channel];
        }
    });
    return {
        transform: [].concat(bins, timeUnits, [{ aggregate: aggregate, groupby: groupby }], postAggregateCalculates),
        continuousAxisChannelDef: continuousAxisChannelDef,
        continuousAxis: continuousAxis,
        encodingWithoutContinuousAxis: encodingWithoutContinuousAxis
    };
}

},{"../encoding":98,"./../encoding":98,"./../fielddef":100,"./../log":105,"./common":92,"vega-util":10}],92:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMarkSpecificConfigMixins(markSpecificConfig, channel) {
    var value = markSpecificConfig[channel];
    return value !== undefined ? (_a = {}, _a[channel] = { value: value }, _a) : {};
    var _a;
}
exports.getMarkSpecificConfigMixins = getMarkSpecificConfigMixins;

},{}],93:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORBAR = 'error-bar';
function normalizeErrorBar(spec) {
    // TODO: use selection
    var _m = spec.mark, _sel = spec.selection, encoding = spec.encoding, outerSpec = __rest(spec, ["mark", "selection", "encoding"]);
    var _s = encoding.size, encodingWithoutSize = __rest(encoding, ["size"]);
    var _x2 = encoding.x2, _y2 = encoding.y2, encodingWithoutX2Y2 = __rest(encoding, ["x2", "y2"]);
    var _x = encodingWithoutX2Y2.x, _y = encodingWithoutX2Y2.y, encodingWithoutX_X2_Y_Y2 = __rest(encodingWithoutX2Y2, ["x", "y"]);
    if (!encoding.x2 && !encoding.y2) {
        throw new Error('Neither x2 or y2 provided');
    }
    return __assign({}, outerSpec, { layer: [
            {
                mark: 'rule',
                encoding: encodingWithoutSize
            }, {
                mark: 'tick',
                encoding: encodingWithoutX2Y2
            }, {
                mark: 'tick',
                encoding: encoding.x2 ? __assign({ x: encoding.x2, y: encoding.y }, encodingWithoutX_X2_Y_Y2) : __assign({ x: encoding.x, y: encoding.y2 }, encodingWithoutX_X2_Y_Y2)
            }
        ] });
}
exports.normalizeErrorBar = normalizeErrorBar;

},{}],94:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mark_1 = require("./../mark");
var boxplot_1 = require("./boxplot");
var errorbar_1 = require("./errorbar");
/**
 * Registry index for all composite mark's normalizer
 */
var normalizerRegistry = {};
function add(mark, normalizer) {
    normalizerRegistry[mark] = normalizer;
}
exports.add = add;
function remove(mark) {
    delete normalizerRegistry[mark];
}
exports.remove = remove;
exports.COMPOSITE_MARK_STYLES = boxplot_1.BOXPLOT_STYLES;
exports.VL_ONLY_COMPOSITE_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX = __assign({}, boxplot_1.VL_ONLY_BOXPLOT_CONFIG_PROPERTY_INDEX);
add(boxplot_1.BOXPLOT, boxplot_1.normalizeBoxPlot);
add(errorbar_1.ERRORBAR, errorbar_1.normalizeErrorBar);
/**
 * Transform a unit spec with composite mark into a normal layer spec.
 */
function normalize(
    // This GenericUnitSpec has any as Encoding because unit specs with composite mark can have additional encoding channels.
    spec, config) {
    var mark = mark_1.isMarkDef(spec.mark) ? spec.mark.type : spec.mark;
    var normalizer = normalizerRegistry[mark];
    if (normalizer) {
        return normalizer(spec, config);
    }
    throw new Error("Unregistered composite mark " + mark);
}
exports.normalize = normalize;

},{"./../mark":107,"./boxplot":91,"./errorbar":93}],95:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var compositemark_1 = require("./compositemark");
var index_1 = require("./compositemark/index");
var guide_1 = require("./guide");
var legend_1 = require("./legend");
var mark_1 = require("./mark");
var mark = require("./mark");
var scale_1 = require("./scale");
var selection_1 = require("./selection");
var title_1 = require("./title");
var util_1 = require("./util");
exports.defaultViewConfig = {
    width: 200,
    height: 200
};
exports.defaultConfig = {
    padding: 5,
    timeFormat: '%b %d, %Y',
    countTitle: 'Number of Records',
    invalidValues: 'filter',
    view: exports.defaultViewConfig,
    mark: mark.defaultMarkConfig,
    area: {},
    bar: mark.defaultBarConfig,
    circle: {},
    line: {},
    point: {},
    rect: {},
    rule: { color: 'black' },
    square: {},
    text: { color: 'black' },
    tick: mark.defaultTickConfig,
    box: { size: 14 },
    boxWhisker: {},
    boxMid: { color: 'white' },
    scale: scale_1.defaultScaleConfig,
    axis: {},
    axisX: {},
    axisY: { minExtent: 30 },
    axisLeft: {},
    axisRight: {},
    axisTop: {},
    axisBottom: {},
    axisBand: {},
    legend: legend_1.defaultLegendConfig,
    selection: selection_1.defaultConfig,
    style: {},
    title: {},
};
function initConfig(config) {
    return util_1.mergeDeep(util_1.duplicate(exports.defaultConfig), config);
}
exports.initConfig = initConfig;
var MARK_STYLES = ['view'].concat(mark_1.PRIMITIVE_MARKS, compositemark_1.COMPOSITE_MARK_STYLES);
var VL_ONLY_CONFIG_PROPERTIES = [
    'padding', 'numberFormat', 'timeFormat', 'countTitle',
    'stack', 'scale', 'selection', 'invalidValues',
    'overlay' // FIXME: Redesign and unhide this
];
var VL_ONLY_ALL_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX = __assign({ view: ['width', 'height'] }, mark_1.VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX, index_1.VL_ONLY_COMPOSITE_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX);
function stripAndRedirectConfig(config) {
    config = util_1.duplicate(config);
    for (var _i = 0, VL_ONLY_CONFIG_PROPERTIES_1 = VL_ONLY_CONFIG_PROPERTIES; _i < VL_ONLY_CONFIG_PROPERTIES_1.length; _i++) {
        var prop = VL_ONLY_CONFIG_PROPERTIES_1[_i];
        delete config[prop];
    }
    // Remove Vega-Lite only axis/legend config
    if (config.axis) {
        for (var _a = 0, VL_ONLY_GUIDE_CONFIG_1 = guide_1.VL_ONLY_GUIDE_CONFIG; _a < VL_ONLY_GUIDE_CONFIG_1.length; _a++) {
            var prop = VL_ONLY_GUIDE_CONFIG_1[_a];
            delete config.axis[prop];
        }
    }
    if (config.legend) {
        for (var _b = 0, VL_ONLY_GUIDE_CONFIG_2 = guide_1.VL_ONLY_GUIDE_CONFIG; _b < VL_ONLY_GUIDE_CONFIG_2.length; _b++) {
            var prop = VL_ONLY_GUIDE_CONFIG_2[_b];
            delete config.legend[prop];
        }
    }
    // Remove Vega-Lite only generic mark config
    if (config.mark) {
        for (var _c = 0, VL_ONLY_MARK_CONFIG_PROPERTIES_1 = mark_1.VL_ONLY_MARK_CONFIG_PROPERTIES; _c < VL_ONLY_MARK_CONFIG_PROPERTIES_1.length; _c++) {
            var prop = VL_ONLY_MARK_CONFIG_PROPERTIES_1[_c];
            delete config.mark[prop];
        }
    }
    for (var _d = 0, MARK_STYLES_1 = MARK_STYLES; _d < MARK_STYLES_1.length; _d++) {
        var mark_2 = MARK_STYLES_1[_d];
        // Remove Vega-Lite-only mark config
        for (var _e = 0, VL_ONLY_MARK_CONFIG_PROPERTIES_2 = mark_1.VL_ONLY_MARK_CONFIG_PROPERTIES; _e < VL_ONLY_MARK_CONFIG_PROPERTIES_2.length; _e++) {
            var prop = VL_ONLY_MARK_CONFIG_PROPERTIES_2[_e];
            delete config[mark_2][prop];
        }
        // Remove Vega-Lite only mark-specific config
        var vlOnlyMarkSpecificConfigs = VL_ONLY_ALL_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX[mark_2];
        if (vlOnlyMarkSpecificConfigs) {
            for (var _f = 0, vlOnlyMarkSpecificConfigs_1 = vlOnlyMarkSpecificConfigs; _f < vlOnlyMarkSpecificConfigs_1.length; _f++) {
                var prop = vlOnlyMarkSpecificConfigs_1[_f];
                delete config[mark_2][prop];
            }
        }
        // Redirect mark config to config.style so that mark config only affect its own mark type
        // without affecting other marks that share the same underlying Vega marks.
        // For example, config.rect should not affect bar marks.
        redirectConfig(config, mark_2);
    }
    // Redirect config.title -- so that title config do not
    // affect header labels, which also uses `title` directive to implement.
    redirectConfig(config, 'title', 'group-title');
    // Remove empty config objects
    for (var prop in config) {
        if (util_1.isObject(config[prop]) && util_1.keys(config[prop]).length === 0) {
            delete config[prop];
        }
    }
    return util_1.keys(config).length > 0 ? config : undefined;
}
exports.stripAndRedirectConfig = stripAndRedirectConfig;
function redirectConfig(config, prop, toProp) {
    var propConfig = prop === 'title' ? title_1.extractTitleConfig(config.title).mark : config[prop];
    if (prop === 'view') {
        toProp = 'cell'; // View's default style is "cell"
    }
    var style = __assign({}, propConfig, config.style[prop]);
    // set config.style if it is not an empty object
    if (util_1.keys(style).length > 0) {
        config.style[toProp || prop] = style;
    }
    delete config[prop];
}

},{"./compositemark":94,"./compositemark/index":94,"./guide":102,"./legend":104,"./mark":107,"./scale":108,"./selection":109,"./title":114,"./util":118}],96:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isUrlData(data) {
    return !!data['url'];
}
exports.isUrlData = isUrlData;
function isInlineData(data) {
    return !!data['values'];
}
exports.isInlineData = isInlineData;
function isNamedData(data) {
    return !!data['name'];
}
exports.isNamedData = isNamedData;
exports.MAIN = 'main';
exports.RAW = 'raw';

},{}],97:[function(require,module,exports){
"use strict";
// DateTime definition object
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("./log");
var util_1 = require("./util");
/*
 * A designated year that starts on Sunday.
 */
var SUNDAY_YEAR = 2006;
function isDateTime(o) {
    return !!o && (!!o.year || !!o.quarter || !!o.month || !!o.date || !!o.day ||
        !!o.hours || !!o.minutes || !!o.seconds || !!o.milliseconds);
}
exports.isDateTime = isDateTime;
exports.MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
exports.SHORT_MONTHS = exports.MONTHS.map(function (m) { return m.substr(0, 3); });
exports.DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
exports.SHORT_DAYS = exports.DAYS.map(function (d) { return d.substr(0, 3); });
function normalizeQuarter(q) {
    if (util_1.isNumber(q)) {
        if (q > 4) {
            log.warn(log.message.invalidTimeUnit('quarter', q));
        }
        // We accept 1-based quarter, so need to readjust to 0-based quarter
        return (q - 1) + '';
    }
    else {
        // Invalid quarter
        throw new Error(log.message.invalidTimeUnit('quarter', q));
    }
}
function normalizeMonth(m) {
    if (util_1.isNumber(m)) {
        // We accept 1-based month, so need to readjust to 0-based month
        return (m - 1) + '';
    }
    else {
        var lowerM = m.toLowerCase();
        var monthIndex = exports.MONTHS.indexOf(lowerM);
        if (monthIndex !== -1) {
            return monthIndex + ''; // 0 for january, ...
        }
        var shortM = lowerM.substr(0, 3);
        var shortMonthIndex = exports.SHORT_MONTHS.indexOf(shortM);
        if (shortMonthIndex !== -1) {
            return shortMonthIndex + '';
        }
        // Invalid month
        throw new Error(log.message.invalidTimeUnit('month', m));
    }
}
function normalizeDay(d) {
    if (util_1.isNumber(d)) {
        // mod so that this can be both 0-based where 0 = sunday
        // and 1-based where 7=sunday
        return (d % 7) + '';
    }
    else {
        var lowerD = d.toLowerCase();
        var dayIndex = exports.DAYS.indexOf(lowerD);
        if (dayIndex !== -1) {
            return dayIndex + ''; // 0 for january, ...
        }
        var shortD = lowerD.substr(0, 3);
        var shortDayIndex = exports.SHORT_DAYS.indexOf(shortD);
        if (shortDayIndex !== -1) {
            return shortDayIndex + '';
        }
        // Invalid day
        throw new Error(log.message.invalidTimeUnit('day', d));
    }
}
/**
 * Return Vega Expression for a particular date time.
 * @param d
 * @param normalize whether to normalize quarter, month, day.
 */
function dateTimeExpr(d, normalize) {
    if (normalize === void 0) { normalize = false; }
    var units = [];
    if (normalize && d.day !== undefined) {
        if (util_1.keys(d).length > 1) {
            log.warn(log.message.droppedDay(d));
            d = util_1.duplicate(d);
            delete d.day;
        }
    }
    if (d.year !== undefined) {
        units.push(d.year);
    }
    else if (d.day !== undefined) {
        // Set year to 2006 for working with day since January 1 2006 is a Sunday
        units.push(SUNDAY_YEAR);
    }
    else {
        units.push(0);
    }
    if (d.month !== undefined) {
        var month = normalize ? normalizeMonth(d.month) : d.month;
        units.push(month);
    }
    else if (d.quarter !== undefined) {
        var quarter = normalize ? normalizeQuarter(d.quarter) : d.quarter;
        units.push(quarter + '*3');
    }
    else {
        units.push(0); // months start at zero in JS
    }
    if (d.date !== undefined) {
        units.push(d.date);
    }
    else if (d.day !== undefined) {
        // HACK: Day only works as a standalone unit
        // This is only correct because we always set year to 2006 for day
        var day = normalize ? normalizeDay(d.day) : d.day;
        units.push(day + '+1');
    }
    else {
        units.push(1); // Date starts at 1 in JS
    }
    // Note: can't use TimeUnit enum here as importing it will create
    // circular dependency problem!
    for (var _i = 0, _a = ['hours', 'minutes', 'seconds', 'milliseconds']; _i < _a.length; _i++) {
        var timeUnit = _a[_i];
        if (d[timeUnit] !== undefined) {
            units.push(d[timeUnit]);
        }
        else {
            units.push(0);
        }
    }
    if (d.utc) {
        return "utc(" + units.join(', ') + ")";
    }
    else {
        return "datetime(" + units.join(', ') + ")";
    }
}
exports.dateTimeExpr = dateTimeExpr;

},{"./log":105,"./util":118}],98:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("./channel");
var fielddef_1 = require("./fielddef");
var log = require("./log");
var util_1 = require("./util");
function channelHasField(encoding, channel) {
    var channelDef = encoding && encoding[channel];
    if (channelDef) {
        if (util_1.isArray(channelDef)) {
            return util_1.some(channelDef, function (fieldDef) { return !!fieldDef.field; });
        }
        else {
            return fielddef_1.isFieldDef(channelDef) || fielddef_1.hasConditionalFieldDef(channelDef);
        }
    }
    return false;
}
exports.channelHasField = channelHasField;
function isAggregate(encoding) {
    return util_1.some(channel_1.CHANNELS, function (channel) {
        if (channelHasField(encoding, channel)) {
            var channelDef = encoding[channel];
            if (util_1.isArray(channelDef)) {
                return util_1.some(channelDef, function (fieldDef) { return !!fieldDef.aggregate; });
            }
            else {
                var fieldDef = fielddef_1.getFieldDef(channelDef);
                return fieldDef && !!fieldDef.aggregate;
            }
        }
        return false;
    });
}
exports.isAggregate = isAggregate;
function normalizeEncoding(encoding, mark) {
    return util_1.keys(encoding).reduce(function (normalizedEncoding, channel) {
        if (!channel_1.supportMark(channel, mark)) {
            // Drop unsupported channel
            log.warn(log.message.incompatibleChannel(channel, mark));
            return normalizedEncoding;
        }
        // Drop line's size if the field is aggregated.
        if (channel === 'size' && mark === 'line') {
            var fieldDef = fielddef_1.getFieldDef(encoding[channel]);
            if (fieldDef && fieldDef.aggregate) {
                log.warn(log.message.incompatibleChannel(channel, mark, 'when the field is aggregated.'));
                return normalizedEncoding;
            }
        }
        if (channel === 'detail' || channel === 'order') {
            var channelDef = encoding[channel];
            if (channelDef) {
                // Array of fieldDefs for detail channel (or production rule)
                normalizedEncoding[channel] = (util_1.isArray(channelDef) ? channelDef : [channelDef])
                    .reduce(function (fieldDefs, fieldDef) {
                    if (!fielddef_1.isFieldDef(fieldDef)) {
                        log.warn(log.message.emptyFieldDef(fieldDef, channel));
                    }
                    else {
                        fieldDefs.push(fielddef_1.normalizeFieldDef(fieldDef, channel));
                    }
                    return fieldDefs;
                }, []);
            }
        }
        else {
            // FIXME: remove this casting.  (I don't know why Typescript doesn't infer this correctly here.)
            var channelDef = encoding[channel];
            if (!fielddef_1.isFieldDef(channelDef) && !fielddef_1.isValueDef(channelDef) && !fielddef_1.isConditionalDef(channelDef)) {
                log.warn(log.message.emptyFieldDef(channelDef, channel));
                return normalizedEncoding;
            }
            normalizedEncoding[channel] = fielddef_1.normalize(channelDef, channel);
        }
        return normalizedEncoding;
    }, {});
}
exports.normalizeEncoding = normalizeEncoding;
function isRanged(encoding) {
    return encoding && ((!!encoding.x && !!encoding.x2) || (!!encoding.y && !!encoding.y2));
}
exports.isRanged = isRanged;
function fieldDefs(encoding) {
    var arr = [];
    channel_1.CHANNELS.forEach(function (channel) {
        if (channelHasField(encoding, channel)) {
            var channelDef = encoding[channel];
            (util_1.isArray(channelDef) ? channelDef : [channelDef]).forEach(function (def) {
                if (fielddef_1.isFieldDef(def)) {
                    arr.push(def);
                }
                else if (fielddef_1.hasConditionalFieldDef(def)) {
                    arr.push(def.condition);
                }
            });
        }
    });
    return arr;
}
exports.fieldDefs = fieldDefs;
function forEach(mapping, f, thisArg) {
    if (!mapping) {
        return;
    }
    var _loop_1 = function (channel) {
        if (util_1.isArray(mapping[channel])) {
            mapping[channel].forEach(function (channelDef) {
                f.call(thisArg, channelDef, channel);
            });
        }
        else {
            f.call(thisArg, mapping[channel], channel);
        }
    };
    for (var _i = 0, _a = util_1.keys(mapping); _i < _a.length; _i++) {
        var channel = _a[_i];
        _loop_1(channel);
    }
}
exports.forEach = forEach;
function reduce(mapping, f, init, thisArg) {
    if (!mapping) {
        return init;
    }
    return util_1.keys(mapping).reduce(function (r, channel) {
        var map = mapping[channel];
        if (util_1.isArray(map)) {
            return map.reduce(function (r1, channelDef) {
                return f.call(thisArg, r1, channelDef, channel);
            }, r);
        }
        else {
            return f.call(thisArg, r, map, channel);
        }
    }, init);
}
exports.reduce = reduce;

},{"./channel":15,"./fielddef":100,"./log":105,"./util":118}],99:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],100:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Declaration and utility for variants of a field definition object
var aggregate_1 = require("./aggregate");
var bin_1 = require("./bin");
var channel_1 = require("./channel");
var log = require("./log");
var timeunit_1 = require("./timeunit");
var type_1 = require("./type");
var util_1 = require("./util");
function isRepeatRef(field) {
    return field && !util_1.isString(field) && 'repeat' in field;
}
exports.isRepeatRef = isRepeatRef;
function isConditionalDef(channelDef) {
    return !!channelDef && !!channelDef.condition;
}
exports.isConditionalDef = isConditionalDef;
/**
 * Return if a channelDef is a ConditionalValueDef with ConditionFieldDef
 */
function hasConditionalFieldDef(channelDef) {
    return !!channelDef && !!channelDef.condition && !util_1.isArray(channelDef.condition) && isFieldDef(channelDef.condition);
}
exports.hasConditionalFieldDef = hasConditionalFieldDef;
function hasConditionalValueDef(channelDef) {
    return !!channelDef && !!channelDef.condition && (util_1.isArray(channelDef.condition) || isValueDef(channelDef.condition));
}
exports.hasConditionalValueDef = hasConditionalValueDef;
function isFieldDef(channelDef) {
    return !!channelDef && (!!channelDef['field'] || channelDef['aggregate'] === 'count');
}
exports.isFieldDef = isFieldDef;
function isStringFieldDef(fieldDef) {
    return isFieldDef(fieldDef) && util_1.isString(fieldDef.field);
}
exports.isStringFieldDef = isStringFieldDef;
function isValueDef(channelDef) {
    return channelDef && 'value' in channelDef && channelDef['value'] !== undefined;
}
exports.isValueDef = isValueDef;
function isScaleFieldDef(channelDef) {
    return !!channelDef && (!!channelDef['scale'] || !!channelDef['sort']);
}
exports.isScaleFieldDef = isScaleFieldDef;
function field(fieldDef, opt) {
    if (opt === void 0) { opt = {}; }
    var field = fieldDef.field;
    var prefix = opt.prefix;
    var suffix = opt.suffix;
    if (isCount(fieldDef)) {
        field = 'count_*';
    }
    else {
        var fn = undefined;
        if (!opt.nofn) {
            if (fieldDef.bin) {
                fn = bin_1.binToString(fieldDef.bin);
                suffix = opt.binSuffix || '';
            }
            else if (fieldDef.aggregate) {
                fn = String(opt.aggregate || fieldDef.aggregate);
            }
            else if (fieldDef.timeUnit) {
                fn = String(fieldDef.timeUnit);
            }
        }
        if (fn) {
            field = fn + "_" + field;
        }
    }
    if (suffix) {
        field = field + "_" + suffix;
    }
    if (prefix) {
        field = prefix + "_" + field;
    }
    if (opt.expr) {
        field = "" + opt.expr + util_1.accessPath(field);
    }
    return field;
}
exports.field = field;
function isDiscrete(fieldDef) {
    switch (fieldDef.type) {
        case 'nominal':
        case 'ordinal':
            return true;
        case 'quantitative':
            return !!fieldDef.bin;
        case 'temporal':
            return false;
    }
    throw new Error(log.message.invalidFieldType(fieldDef.type));
}
exports.isDiscrete = isDiscrete;
function isContinuous(fieldDef) {
    return !isDiscrete(fieldDef);
}
exports.isContinuous = isContinuous;
function isCount(fieldDef) {
    return fieldDef.aggregate === 'count';
}
exports.isCount = isCount;
function verbalTitleFormatter(fieldDef, config) {
    var field = fieldDef.field, bin = fieldDef.bin, timeUnit = fieldDef.timeUnit, aggregate = fieldDef.aggregate;
    if (aggregate === 'count') {
        return config.countTitle;
    }
    else if (bin) {
        return field + " (binned)";
    }
    else if (timeUnit) {
        var units = timeunit_1.getTimeUnitParts(timeUnit).join('-');
        return field + " (" + units + ")";
    }
    else if (aggregate) {
        return util_1.titlecase(aggregate) + " of " + field;
    }
    return field;
}
exports.verbalTitleFormatter = verbalTitleFormatter;
function functionalTitleFormatter(fieldDef, config) {
    var fn = fieldDef.aggregate || fieldDef.timeUnit || (fieldDef.bin && 'bin');
    if (fn) {
        return fn.toUpperCase() + '(' + fieldDef.field + ')';
    }
    else {
        return fieldDef.field;
    }
}
exports.functionalTitleFormatter = functionalTitleFormatter;
exports.defaultTitleFormatter = function (fieldDef, config) {
    switch (config.fieldTitle) {
        case 'plain':
            return fieldDef.field;
        case 'functional':
            return functionalTitleFormatter(fieldDef, config);
        default:
            return verbalTitleFormatter(fieldDef, config);
    }
};
var titleFormatter = exports.defaultTitleFormatter;
function setTitleFormatter(formatter) {
    titleFormatter = formatter;
}
exports.setTitleFormatter = setTitleFormatter;
function resetTitleFormatter() {
    setTitleFormatter(exports.defaultTitleFormatter);
}
exports.resetTitleFormatter = resetTitleFormatter;
function title(fieldDef, config) {
    return titleFormatter(fieldDef, config);
}
exports.title = title;
function defaultType(fieldDef, channel) {
    if (fieldDef.timeUnit) {
        return 'temporal';
    }
    if (fieldDef.bin) {
        return 'quantitative';
    }
    switch (channel_1.rangeType(channel)) {
        case 'continuous':
            return 'quantitative';
        case 'discrete':
            return 'nominal';
        case 'flexible':// color
            return 'nominal';
        default:
            return 'quantitative';
    }
}
exports.defaultType = defaultType;
/**
 * Returns the fieldDef -- either from the outer channelDef or from the condition of channelDef.
 * @param channelDef
 */
function getFieldDef(channelDef) {
    if (isFieldDef(channelDef)) {
        return channelDef;
    }
    else if (hasConditionalFieldDef(channelDef)) {
        return channelDef.condition;
    }
    return undefined;
}
exports.getFieldDef = getFieldDef;
/**
 * Convert type to full, lowercase type, or augment the fieldDef with a default type if missing.
 */
function normalize(channelDef, channel) {
    if (util_1.isString(channelDef) || util_1.isNumber(channelDef) || util_1.isBoolean(channelDef)) {
        var primitiveType = util_1.isString(channelDef) ? 'string' :
            util_1.isNumber(channelDef) ? 'number' : 'boolean';
        log.warn(log.message.primitiveChannelDef(channel, primitiveType, channelDef));
        return { value: channelDef };
    }
    // If a fieldDef contains a field, we need type.
    if (isFieldDef(channelDef)) {
        return normalizeFieldDef(channelDef, channel);
    }
    else if (hasConditionalFieldDef(channelDef)) {
        return __assign({}, channelDef, { 
            // Need to cast as normalizeFieldDef normally return FieldDef, but here we know that it is definitely Condition<FieldDef>
            condition: normalizeFieldDef(channelDef.condition, channel) });
    }
    return channelDef;
}
exports.normalize = normalize;
function normalizeFieldDef(fieldDef, channel) {
    // Drop invalid aggregate
    if (fieldDef.aggregate && !aggregate_1.isAggregateOp(fieldDef.aggregate)) {
        var aggregate = fieldDef.aggregate, fieldDefWithoutAggregate = __rest(fieldDef, ["aggregate"]);
        log.warn(log.message.invalidAggregate(fieldDef.aggregate));
        fieldDef = fieldDefWithoutAggregate;
    }
    // Normalize Time Unit
    if (fieldDef.timeUnit) {
        fieldDef = __assign({}, fieldDef, { timeUnit: timeunit_1.normalizeTimeUnit(fieldDef.timeUnit) });
    }
    // Normalize bin
    if (fieldDef.bin) {
        fieldDef = __assign({}, fieldDef, { bin: normalizeBin(fieldDef.bin, channel) });
    }
    // Normalize Type
    if (fieldDef.type) {
        var fullType = type_1.getFullName(fieldDef.type);
        if (fieldDef.type !== fullType) {
            // convert short type to full type
            fieldDef = __assign({}, fieldDef, { type: fullType });
        }
        if (fieldDef.type !== 'quantitative') {
            if (aggregate_1.isCountingAggregateOp(fieldDef.aggregate)) {
                log.warn(log.message.invalidFieldTypeForCountAggregate(fieldDef.type, fieldDef.aggregate));
                fieldDef = __assign({}, fieldDef, { type: 'quantitative' });
            }
        }
    }
    else {
        // If type is empty / invalid, then augment with default type
        var newType = defaultType(fieldDef, channel);
        log.warn(log.message.emptyOrInvalidFieldType(fieldDef.type, channel, newType));
        fieldDef = __assign({}, fieldDef, { type: newType });
    }
    var _a = channelCompatibility(fieldDef, channel), compatible = _a.compatible, warning = _a.warning;
    if (!compatible) {
        log.warn(warning);
    }
    return fieldDef;
}
exports.normalizeFieldDef = normalizeFieldDef;
function normalizeBin(bin, channel) {
    if (util_1.isBoolean(bin)) {
        return { maxbins: bin_1.autoMaxBins(channel) };
    }
    else if (!bin.maxbins && !bin.step) {
        return __assign({}, bin, { maxbins: bin_1.autoMaxBins(channel) });
    }
    else {
        return bin;
    }
}
exports.normalizeBin = normalizeBin;
var COMPATIBLE = { compatible: true };
function channelCompatibility(fieldDef, channel) {
    switch (channel) {
        case 'row':
        case 'column':
            if (isContinuous(fieldDef) && !fieldDef.timeUnit) {
                // TODO:(https://github.com/vega/vega-lite/issues/2011):
                // with timeUnit it's not always strictly continuous
                return {
                    compatible: false,
                    warning: log.message.facetChannelShouldBeDiscrete(channel)
                };
            }
            return COMPATIBLE;
        case 'x':
        case 'y':
        case 'color':
        case 'text':
        case 'detail':
        case 'tooltip':
            return COMPATIBLE;
        case 'opacity':
        case 'size':
        case 'x2':
        case 'y2':
            if (isDiscrete(fieldDef) && !fieldDef.bin) {
                return {
                    compatible: false,
                    warning: "Channel " + channel + " should not be used with discrete field."
                };
            }
            return COMPATIBLE;
        case 'shape':
            if (fieldDef.type !== 'nominal') {
                return {
                    compatible: false,
                    warning: 'Shape channel should be used with nominal data only'
                };
            }
            return COMPATIBLE;
        case 'order':
            if (fieldDef.type === 'nominal') {
                return {
                    compatible: false,
                    warning: "Channel order is inappropriate for nominal field, which has no inherent order."
                };
            }
            return COMPATIBLE;
    }
    throw new Error('channelCompatability not implemented for channel ' + channel);
}
exports.channelCompatibility = channelCompatibility;
function isNumberFieldDef(fieldDef) {
    return fieldDef.type === 'quantitative' || !!fieldDef.bin;
}
exports.isNumberFieldDef = isNumberFieldDef;
function isTimeFieldDef(fieldDef) {
    return fieldDef.type === 'temporal' || !!fieldDef.timeUnit;
}
exports.isTimeFieldDef = isTimeFieldDef;

},{"./aggregate":12,"./bin":14,"./channel":15,"./log":105,"./timeunit":113,"./type":117,"./util":118}],101:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var selection_1 = require("./compile/selection/selection");
var datetime_1 = require("./datetime");
var fielddef_1 = require("./fielddef");
var timeunit_1 = require("./timeunit");
var util_1 = require("./util");
function isSelectionFilter(filter) {
    return filter && filter['selection'];
}
exports.isSelectionFilter = isSelectionFilter;
function isEqualFilter(filter) {
    return filter && !!filter.field && filter.equal !== undefined;
}
exports.isEqualFilter = isEqualFilter;
function isRangeFilter(filter) {
    if (filter && filter.field) {
        if (util_1.isArray(filter.range) && filter.range.length === 2) {
            return true;
        }
    }
    return false;
}
exports.isRangeFilter = isRangeFilter;
function isOneOfFilter(filter) {
    return filter && !!filter.field && (util_1.isArray(filter.oneOf) ||
        util_1.isArray(filter.in) // backward compatibility
    );
}
exports.isOneOfFilter = isOneOfFilter;
function isFieldFilter(filter) {
    return isOneOfFilter(filter) || isEqualFilter(filter) || isRangeFilter(filter);
}
exports.isFieldFilter = isFieldFilter;
/**
 * Converts a filter into an expression.
 */
// model is only used for selection filters.
function expression(model, filterOp, node) {
    return util_1.logicalExpr(filterOp, function (filter) {
        if (util_1.isString(filter)) {
            return filter;
        }
        else if (isSelectionFilter(filter)) {
            return selection_1.predicate(model, filter.selection, node);
        }
        else {
            return fieldFilterExpression(filter);
        }
    });
}
exports.expression = expression;
// This method is used by Voyager.  Do not change its behavior without changing Voyager.
function fieldFilterExpression(filter, useInRange) {
    if (useInRange === void 0) { useInRange = true; }
    var fieldExpr = filter.timeUnit ?
        // For timeUnit, cast into integer with time() so we can use ===, inrange, indexOf to compare values directly.
        // TODO: We calculate timeUnit on the fly here. Consider if we would like to consolidate this with timeUnit pipeline
        // TODO: support utc
        ('time(' + timeunit_1.fieldExpr(filter.timeUnit, filter.field) + ')') :
        fielddef_1.field(filter, { expr: 'datum' });
    if (isEqualFilter(filter)) {
        return fieldExpr + '===' + valueExpr(filter.equal, filter.timeUnit);
    }
    else if (isOneOfFilter(filter)) {
        // "oneOf" was formerly "in" -- so we need to add backward compatibility
        var oneOf = filter.oneOf || filter['in'];
        return 'indexof([' +
            oneOf.map(function (v) { return valueExpr(v, filter.timeUnit); }).join(',') +
            '], ' + fieldExpr + ') !== -1';
    }
    else if (isRangeFilter(filter)) {
        var lower = filter.range[0];
        var upper = filter.range[1];
        if (lower !== null && upper !== null && useInRange) {
            return 'inrange(' + fieldExpr + ', [' +
                valueExpr(lower, filter.timeUnit) + ', ' +
                valueExpr(upper, filter.timeUnit) + '])';
        }
        var exprs = [];
        if (lower !== null) {
            exprs.push(fieldExpr + " >= " + valueExpr(lower, filter.timeUnit));
        }
        if (upper !== null) {
            exprs.push(fieldExpr + " <= " + valueExpr(upper, filter.timeUnit));
        }
        return exprs.length > 0 ? exprs.join(' && ') : 'true';
    }
    /* istanbul ignore next: it should never reach here */
    throw new Error("Invalid field filter: " + JSON.stringify(filter));
}
exports.fieldFilterExpression = fieldFilterExpression;
function valueExpr(v, timeUnit) {
    if (datetime_1.isDateTime(v)) {
        var expr = datetime_1.dateTimeExpr(v, true);
        return 'time(' + expr + ')';
    }
    if (timeunit_1.isLocalSingleTimeUnit(timeUnit)) {
        var datetime = {};
        datetime[timeUnit] = v;
        var expr = datetime_1.dateTimeExpr(datetime, true);
        return 'time(' + expr + ')';
    }
    else if (timeunit_1.isUtcSingleTimeUnit(timeUnit)) {
        return valueExpr(v, timeunit_1.getLocalTimeUnit(timeUnit));
    }
    return JSON.stringify(v);
}
function normalizeFilter(f) {
    if (isFieldFilter(f) && f.timeUnit) {
        return __assign({}, f, { timeUnit: timeunit_1.normalizeTimeUnit(f.timeUnit) });
    }
    return f;
}
exports.normalizeFilter = normalizeFilter;

},{"./compile/selection/selection":79,"./datetime":97,"./fielddef":100,"./timeunit":113,"./util":118}],102:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VL_ONLY_GUIDE_CONFIG = ['shortTimeLabels'];

},{}],103:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.axis = require("./axis");
exports.aggregate = require("./aggregate");
exports.bin = require("./bin");
exports.channel = require("./channel");
exports.compositeMark = require("./compositemark");
var compile_1 = require("./compile/compile");
exports.compile = compile_1.compile;
exports.config = require("./config");
exports.data = require("./data");
exports.datetime = require("./datetime");
exports.encoding = require("./encoding");
exports.facet = require("./facet");
exports.fieldDef = require("./fielddef");
exports.legend = require("./legend");
exports.mark = require("./mark");
exports.scale = require("./scale");
exports.sort = require("./sort");
exports.spec = require("./spec");
exports.stack = require("./stack");
exports.timeUnit = require("./timeunit");
exports.transform = require("./transform");
exports.type = require("./type");
exports.util = require("./util");
exports.validate = require("./validate");
exports.version = require('../package.json').version;

},{"../package.json":11,"./aggregate":12,"./axis":13,"./bin":14,"./channel":15,"./compile/compile":25,"./compositemark":94,"./config":95,"./data":96,"./datetime":97,"./encoding":98,"./facet":99,"./fielddef":100,"./legend":104,"./mark":107,"./scale":108,"./sort":110,"./spec":111,"./stack":112,"./timeunit":113,"./transform":116,"./type":117,"./util":118,"./validate":119}],104:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
exports.defaultLegendConfig = {};
var COMMON_LEGEND_PROPERTY_INDEX = {
    entryPadding: 1,
    format: 1,
    offset: 1,
    orient: 1,
    padding: 1,
    tickCount: 1,
    title: 1,
    type: 1,
    values: 1,
    zindex: 1
};
var VG_LEGEND_PROPERTY_INDEX = __assign({}, COMMON_LEGEND_PROPERTY_INDEX, { 
    // channel scales
    opacity: 1, shape: 1, stroke: 1, fill: 1, size: 1, 
    // encode
    encode: 1 });
exports.LEGEND_PROPERTIES = util_1.flagKeys(COMMON_LEGEND_PROPERTY_INDEX);
exports.VG_LEGEND_PROPERTIES = util_1.flagKeys(VG_LEGEND_PROPERTY_INDEX);

},{"./util":118}],105:[function(require,module,exports){
"use strict";
/**
 * Vega-Lite's singleton logger utility.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var vega_util_1 = require("vega-util");
/**
 * Main (default) Vega Logger instance for Vega-Lite
 */
var main = vega_util_1.logger(vega_util_1.Warn);
var current = main;
/**
 * Logger tool for checking if the code throws correct warning
 */
var LocalLogger = /** @class */ (function () {
    function LocalLogger() {
        this.warns = [];
        this.infos = [];
        this.debugs = [];
    }
    LocalLogger.prototype.level = function () {
        return this;
    };
    LocalLogger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.warns).push.apply(_a, args);
        return this;
        var _a;
    };
    LocalLogger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.infos).push.apply(_a, args);
        return this;
        var _a;
    };
    LocalLogger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.debugs).push.apply(_a, args);
        return this;
        var _a;
    };
    return LocalLogger;
}());
exports.LocalLogger = LocalLogger;
function wrap(f) {
    return function () {
        var logger = current = new LocalLogger();
        f(logger);
        reset();
    };
}
exports.wrap = wrap;
/**
 * Set the singleton logger to be a custom logger
 */
function set(logger) {
    current = logger;
    return current;
}
exports.set = set;
/**
 * Reset the main logger to use the default Vega Logger
 */
function reset() {
    current = main;
    return current;
}
exports.reset = reset;
function warn() {
    var _ = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _[_i] = arguments[_i];
    }
    current.warn.apply(current, arguments);
}
exports.warn = warn;
function info() {
    var _ = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _[_i] = arguments[_i];
    }
    current.info.apply(current, arguments);
}
exports.info = info;
function debug() {
    var _ = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _[_i] = arguments[_i];
    }
    current.debug.apply(current, arguments);
}
exports.debug = debug;
/**
 * Collection of all Vega-Lite Error Messages
 */
var message;
(function (message) {
    message.INVALID_SPEC = 'Invalid spec';
    // FIT
    message.FIT_NON_SINGLE = 'Autosize "fit" only works for single views and layered views.';
    message.CANNOT_FIX_RANGE_STEP_WITH_FIT = 'Cannot use a fixed value of "rangeStep" when "autosize" is "fit".';
    // SELECTION
    function cannotProjectOnChannelWithoutField(channel) {
        return "Cannot project a selection on encoding channel \"" + channel + "\", which has no field.";
    }
    message.cannotProjectOnChannelWithoutField = cannotProjectOnChannelWithoutField;
    function nearestNotSupportForContinuous(mark) {
        return "The \"nearest\" transform is not supported for " + mark + " marks.";
    }
    message.nearestNotSupportForContinuous = nearestNotSupportForContinuous;
    function selectionNotFound(name) {
        return "Cannot find a selection named \"" + name + "\"";
    }
    message.selectionNotFound = selectionNotFound;
    message.SCALE_BINDINGS_CONTINUOUS = 'Scale bindings are currently only supported for scales with unbinned, continuous domains.';
    // REPEAT
    function noSuchRepeatedValue(field) {
        return "Unknown repeated value \"" + field + "\".";
    }
    message.noSuchRepeatedValue = noSuchRepeatedValue;
    // CONCAT
    message.CONCAT_CANNOT_SHARE_AXIS = 'Axes cannot be shared in concatenated views.';
    // REPEAT
    message.REPEAT_CANNOT_SHARE_AXIS = 'Axes cannot be shared in repeated views.';
    // TITLE
    function cannotSetTitleAnchor(type) {
        return "Cannot set title \"anchor\" for a " + type + " spec";
    }
    message.cannotSetTitleAnchor = cannotSetTitleAnchor;
    // DATA
    function unrecognizedParse(p) {
        return "Unrecognized parse \"" + p + "\".";
    }
    message.unrecognizedParse = unrecognizedParse;
    function differentParse(field, local, ancestor) {
        return "An ancestor parsed field \"" + field + "\" as " + ancestor + " but a child wants to parse the field as " + local + ".";
    }
    message.differentParse = differentParse;
    // TRANSFORMS
    function invalidTransformIgnored(transform) {
        return "Ignoring an invalid transform: " + JSON.stringify(transform) + ".";
    }
    message.invalidTransformIgnored = invalidTransformIgnored;
    message.NO_FIELDS_NEEDS_AS = 'If "from.fields" is not specified, "as" has to be a string that specifies the key to be used for the the data from the secondary source.';
    // ENCODING & FACET
    function primitiveChannelDef(channel, type, value) {
        return "Channel " + channel + " is a " + type + ". Converted to {value: " + value + "}.";
    }
    message.primitiveChannelDef = primitiveChannelDef;
    function invalidFieldType(type) {
        return "Invalid field type \"" + type + "\"";
    }
    message.invalidFieldType = invalidFieldType;
    function invalidFieldTypeForCountAggregate(type, aggregate) {
        return "Invalid field type \"" + type + "\" for aggregate: \"" + aggregate + "\", using \"quantitative\" instead.";
    }
    message.invalidFieldTypeForCountAggregate = invalidFieldTypeForCountAggregate;
    function invalidAggregate(aggregate) {
        return "Invalid aggregation operator \"" + aggregate + "\"";
    }
    message.invalidAggregate = invalidAggregate;
    function emptyOrInvalidFieldType(type, channel, newType) {
        return "Invalid field type \"" + type + "\" for channel \"" + channel + "\", using \"" + newType + "\" instead.";
    }
    message.emptyOrInvalidFieldType = emptyOrInvalidFieldType;
    function emptyFieldDef(fieldDef, channel) {
        return "Dropping " + JSON.stringify(fieldDef) + " from channel \"" + channel + "\" since it does not contain data field or value.";
    }
    message.emptyFieldDef = emptyFieldDef;
    function incompatibleChannel(channel, markOrFacet, when) {
        return channel + " dropped as it is incompatible with \"" + markOrFacet + "\"" + (when ? " when " + when : '') + ".";
    }
    message.incompatibleChannel = incompatibleChannel;
    function facetChannelShouldBeDiscrete(channel) {
        return channel + " encoding should be discrete (ordinal / nominal / binned).";
    }
    message.facetChannelShouldBeDiscrete = facetChannelShouldBeDiscrete;
    function discreteChannelCannotEncode(channel, type) {
        return "Using discrete channel \"" + channel + "\" to encode \"" + type + "\" field can be misleading as it does not encode " + (type === 'ordinal' ? 'order' : 'magnitude') + ".";
    }
    message.discreteChannelCannotEncode = discreteChannelCannotEncode;
    // Mark
    message.BAR_WITH_POINT_SCALE_AND_RANGESTEP_NULL = 'Bar mark should not be used with point scale when rangeStep is null. Please use band scale instead.';
    function unclearOrientContinuous(mark) {
        return "Cannot clearly determine orientation for \"" + mark + "\" since both x and y channel encode continous fields. In this case, we use vertical by default";
    }
    message.unclearOrientContinuous = unclearOrientContinuous;
    function unclearOrientDiscreteOrEmpty(mark) {
        return "Cannot clearly determine orientation for \"" + mark + "\" since both x and y channel encode discrete or empty fields.";
    }
    message.unclearOrientDiscreteOrEmpty = unclearOrientDiscreteOrEmpty;
    function orientOverridden(original, actual) {
        return "Specified orient \"" + original + "\" overridden with \"" + actual + "\"";
    }
    message.orientOverridden = orientOverridden;
    // SCALE
    message.CANNOT_UNION_CUSTOM_DOMAIN_WITH_FIELD_DOMAIN = 'custom domain scale cannot be unioned with default field-based domain';
    function cannotUseScalePropertyWithNonColor(prop) {
        return "Cannot use the scale property \"" + prop + "\" with non-color channel.";
    }
    message.cannotUseScalePropertyWithNonColor = cannotUseScalePropertyWithNonColor;
    function unaggregateDomainHasNoEffectForRawField(fieldDef) {
        return "Using unaggregated domain with raw field has no effect (" + JSON.stringify(fieldDef) + ").";
    }
    message.unaggregateDomainHasNoEffectForRawField = unaggregateDomainHasNoEffectForRawField;
    function unaggregateDomainWithNonSharedDomainOp(aggregate) {
        return "Unaggregated domain not applicable for \"" + aggregate + "\" since it produces values outside the origin domain of the source data.";
    }
    message.unaggregateDomainWithNonSharedDomainOp = unaggregateDomainWithNonSharedDomainOp;
    function unaggregatedDomainWithLogScale(fieldDef) {
        return "Unaggregated domain is currently unsupported for log scale (" + JSON.stringify(fieldDef) + ").";
    }
    message.unaggregatedDomainWithLogScale = unaggregatedDomainWithLogScale;
    function cannotUseSizeFieldWithBandSize(positionChannel) {
        return "Using size field when " + positionChannel + "-channel has a band scale is not supported.";
    }
    message.cannotUseSizeFieldWithBandSize = cannotUseSizeFieldWithBandSize;
    function cannotApplySizeToNonOrientedMark(mark) {
        return "Cannot apply size to non-oriented mark \"" + mark + "\".";
    }
    message.cannotApplySizeToNonOrientedMark = cannotApplySizeToNonOrientedMark;
    function rangeStepDropped(channel) {
        return "rangeStep for \"" + channel + "\" is dropped as top-level " + (channel === 'x' ? 'width' : 'height') + " is provided.";
    }
    message.rangeStepDropped = rangeStepDropped;
    function scaleTypeNotWorkWithChannel(channel, scaleType, defaultScaleType) {
        return "Channel \"" + channel + "\" does not work with \"" + scaleType + "\" scale. We are using \"" + defaultScaleType + "\" scale instead.";
    }
    message.scaleTypeNotWorkWithChannel = scaleTypeNotWorkWithChannel;
    function scaleTypeNotWorkWithFieldDef(scaleType, defaultScaleType) {
        return "FieldDef does not work with \"" + scaleType + "\" scale. We are using \"" + defaultScaleType + "\" scale instead.";
    }
    message.scaleTypeNotWorkWithFieldDef = scaleTypeNotWorkWithFieldDef;
    function scalePropertyNotWorkWithScaleType(scaleType, propName, channel) {
        return channel + "-scale's \"" + propName + "\" is dropped as it does not work with " + scaleType + " scale.";
    }
    message.scalePropertyNotWorkWithScaleType = scalePropertyNotWorkWithScaleType;
    function scaleTypeNotWorkWithMark(mark, scaleType) {
        return "Scale type \"" + scaleType + "\" does not work with mark \"" + mark + "\".";
    }
    message.scaleTypeNotWorkWithMark = scaleTypeNotWorkWithMark;
    function mergeConflictingProperty(property, propertyOf, v1, v2) {
        return "Conflicting " + propertyOf + " property \"" + property + "\" (\"" + v1 + "\" and \"" + v2 + "\").  Using \"" + v1 + "\".";
    }
    message.mergeConflictingProperty = mergeConflictingProperty;
    function independentScaleMeansIndependentGuide(channel) {
        return "Setting the scale to be independent for \"" + channel + "\" means we also have to set the guide (axis or legend) to be independent.";
    }
    message.independentScaleMeansIndependentGuide = independentScaleMeansIndependentGuide;
    function conflictedDomain(channel) {
        return "Cannot set " + channel + "-scale's \"domain\" as it is binned. Please use \"bin\"'s \"extent\" instead.";
    }
    message.conflictedDomain = conflictedDomain;
    function domainSortDropped(sort) {
        return "Dropping sort property \"" + JSON.stringify(sort) + "\" as unioned domains only support boolean or op 'count'.";
    }
    message.domainSortDropped = domainSortDropped;
    message.UNABLE_TO_MERGE_DOMAINS = 'Unable to merge domains';
    message.MORE_THAN_ONE_SORT = 'Domains that should be unioned has conflicting sort properties. Sort will be set to true.';
    // AXIS
    message.INVALID_CHANNEL_FOR_AXIS = 'Invalid channel for axis.';
    // STACK
    function cannotStackRangedMark(channel) {
        return "Cannot stack \"" + channel + "\" if there is already \"" + channel + "2\"";
    }
    message.cannotStackRangedMark = cannotStackRangedMark;
    function cannotStackNonLinearScale(scaleType) {
        return "Cannot stack non-linear scale (" + scaleType + ")";
    }
    message.cannotStackNonLinearScale = cannotStackNonLinearScale;
    function stackNonSummativeAggregate(aggregate) {
        return "Stacking is applied even though the aggregate function is non-summative (\"" + aggregate + "\")";
    }
    message.stackNonSummativeAggregate = stackNonSummativeAggregate;
    // TIMEUNIT
    function invalidTimeUnit(unitName, value) {
        return "Invalid " + unitName + ": \"" + value + "\"";
    }
    message.invalidTimeUnit = invalidTimeUnit;
    function dayReplacedWithDate(fullTimeUnit) {
        return "Time unit \"" + fullTimeUnit + "\" is not supported. We are replacing it with " + fullTimeUnit.replace('day', 'date') + ".";
    }
    message.dayReplacedWithDate = dayReplacedWithDate;
    function droppedDay(d) {
        return "Dropping day from datetime " + JSON.stringify(d) + " as day cannot be combined with other units.";
    }
    message.droppedDay = droppedDay;
})(message = exports.message || (exports.message = {}));

},{"vega-util":10}],106:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLogicalOr(op) {
    return !!op.or;
}
exports.isLogicalOr = isLogicalOr;
function isLogicalAnd(op) {
    return !!op.and;
}
exports.isLogicalAnd = isLogicalAnd;
function isLogicalNot(op) {
    return !!op.not;
}
exports.isLogicalNot = isLogicalNot;
function forEachLeave(op, fn) {
    if (isLogicalNot(op)) {
        forEachLeave(op.not, fn);
    }
    else if (isLogicalAnd(op)) {
        for (var _i = 0, _a = op.and; _i < _a.length; _i++) {
            var subop = _a[_i];
            forEachLeave(subop, fn);
        }
    }
    else if (isLogicalOr(op)) {
        for (var _b = 0, _c = op.or; _b < _c.length; _b++) {
            var subop = _c[_b];
            forEachLeave(subop, fn);
        }
    }
    else {
        fn(op);
    }
}
exports.forEachLeave = forEachLeave;
function normalizeLogicalOperand(op, normalizer) {
    if (isLogicalNot(op)) {
        return { not: normalizeLogicalOperand(op.not, normalizer) };
    }
    else if (isLogicalAnd(op)) {
        return { and: op.and.map(function (o) { return normalizeLogicalOperand(o, normalizer); }) };
    }
    else if (isLogicalOr(op)) {
        return { or: op.or.map(function (o) { return normalizeLogicalOperand(o, normalizer); }) };
    }
    else {
        return normalizer(op);
    }
}
exports.normalizeLogicalOperand = normalizeLogicalOperand;

},{}],107:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var Mark;
(function (Mark) {
    Mark.AREA = 'area';
    Mark.BAR = 'bar';
    Mark.LINE = 'line';
    Mark.POINT = 'point';
    Mark.RECT = 'rect';
    Mark.RULE = 'rule';
    Mark.TEXT = 'text';
    Mark.TICK = 'tick';
    Mark.CIRCLE = 'circle';
    Mark.SQUARE = 'square';
})(Mark = exports.Mark || (exports.Mark = {}));
exports.AREA = Mark.AREA;
exports.BAR = Mark.BAR;
exports.LINE = Mark.LINE;
exports.POINT = Mark.POINT;
exports.TEXT = Mark.TEXT;
exports.TICK = Mark.TICK;
exports.RECT = Mark.RECT;
exports.RULE = Mark.RULE;
exports.CIRCLE = Mark.CIRCLE;
exports.SQUARE = Mark.SQUARE;
// Using mapped type to declare index, ensuring we always have all marks when we add more.
var MARK_INDEX = {
    area: 1,
    bar: 1,
    line: 1,
    point: 1,
    text: 1,
    tick: 1,
    rect: 1,
    rule: 1,
    circle: 1,
    square: 1
};
function isMark(m) {
    return !!MARK_INDEX[m];
}
exports.isMark = isMark;
exports.PRIMITIVE_MARKS = util_1.flagKeys(MARK_INDEX);
function isMarkDef(mark) {
    return mark['type'];
}
exports.isMarkDef = isMarkDef;
var PRIMITIVE_MARK_INDEX = util_1.toSet(exports.PRIMITIVE_MARKS);
function isPrimitiveMark(mark) {
    var markType = isMarkDef(mark) ? mark.type : mark;
    return markType in PRIMITIVE_MARK_INDEX;
}
exports.isPrimitiveMark = isPrimitiveMark;
exports.STROKE_CONFIG = ['stroke', 'strokeWidth',
    'strokeDash', 'strokeDashOffset', 'strokeOpacity'];
exports.FILL_CONFIG = ['fill', 'fillOpacity'];
exports.FILL_STROKE_CONFIG = [].concat(exports.STROKE_CONFIG, exports.FILL_CONFIG);
exports.VL_ONLY_MARK_CONFIG_PROPERTIES = ['filled', 'color'];
exports.VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX = {
    bar: ['binSpacing', 'continuousBandSize', 'discreteBandSize'],
    text: ['shortTimeLabels'],
    tick: ['bandSize', 'thickness']
};
exports.defaultMarkConfig = {
    color: '#4c78a8',
};
exports.defaultBarConfig = {
    binSpacing: 1,
    continuousBandSize: 5
};
exports.defaultTickConfig = {
    thickness: 1
};

},{"./util":118}],108:[function(require,module,exports){
"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("./channel");
var log = require("./log");
var util_1 = require("./util");
var ScaleType;
(function (ScaleType) {
    // Continuous - Quantitative
    ScaleType.LINEAR = 'linear';
    ScaleType.BIN_LINEAR = 'bin-linear';
    ScaleType.LOG = 'log';
    ScaleType.POW = 'pow';
    ScaleType.SQRT = 'sqrt';
    // Continuous - Time
    ScaleType.TIME = 'time';
    ScaleType.UTC = 'utc';
    // sequential
    ScaleType.SEQUENTIAL = 'sequential';
    // Quantile, Quantize, threshold
    ScaleType.QUANTILE = 'quantile';
    ScaleType.QUANTIZE = 'quantize';
    ScaleType.THRESHOLD = 'threshold';
    ScaleType.ORDINAL = 'ordinal';
    ScaleType.BIN_ORDINAL = 'bin-ordinal';
    ScaleType.POINT = 'point';
    ScaleType.BAND = 'band';
})(ScaleType = exports.ScaleType || (exports.ScaleType = {}));
/**
 * Index for scale categories -- only scale of the same categories can be merged together.
 * Current implementation is trying to be conservative and avoid merging scale type that might not work together
 */
var SCALE_CATEGORY_INDEX = {
    linear: 'numeric',
    log: 'numeric',
    pow: 'numeric',
    sqrt: 'numeric',
    'bin-linear': 'bin-linear',
    time: 'time',
    utc: 'time',
    sequential: 'sequential',
    ordinal: 'ordinal',
    'bin-ordinal': 'bin-ordinal',
    point: 'ordinal-position',
    band: 'ordinal-position'
};
exports.SCALE_TYPES = util_1.keys(SCALE_CATEGORY_INDEX);
/**
 * Whether the two given scale types can be merged together.
 */
function scaleCompatible(scaleType1, scaleType2) {
    var scaleCategory1 = SCALE_CATEGORY_INDEX[scaleType1];
    var scaleCategory2 = SCALE_CATEGORY_INDEX[scaleType2];
    return scaleCategory1 === scaleCategory2 ||
        (scaleCategory1 === 'ordinal-position' && scaleCategory2 === 'time') ||
        (scaleCategory2 === 'ordinal-position' && scaleCategory1 === 'time');
}
exports.scaleCompatible = scaleCompatible;
/**
 * Index for scale predecence -- high score = higher priority for merging.
 */
var SCALE_PRECEDENCE_INDEX = {
    // numeric
    linear: 0,
    log: 1,
    pow: 1,
    sqrt: 1,
    // time
    time: 0,
    utc: 0,
    // ordinal-position -- these have higher precedence than continuous scales as they support more types of data
    point: 10,
    band: 11,
    // non grouped types
    'bin-linear': 0,
    sequential: 0,
    ordinal: 0,
    'bin-ordinal': 0,
};
/**
 * Return scale categories -- only scale of the same categories can be merged together.
 */
function scaleTypePrecedence(scaleType) {
    return SCALE_PRECEDENCE_INDEX[scaleType];
}
exports.scaleTypePrecedence = scaleTypePrecedence;
exports.CONTINUOUS_TO_CONTINUOUS_SCALES = ['linear', 'bin-linear', 'log', 'pow', 'sqrt', 'time', 'utc'];
var CONTINUOUS_TO_CONTINUOUS_INDEX = util_1.toSet(exports.CONTINUOUS_TO_CONTINUOUS_SCALES);
exports.CONTINUOUS_DOMAIN_SCALES = exports.CONTINUOUS_TO_CONTINUOUS_SCALES.concat(['sequential' /* TODO add 'quantile', 'quantize', 'threshold'*/]);
var CONTINUOUS_DOMAIN_INDEX = util_1.toSet(exports.CONTINUOUS_DOMAIN_SCALES);
exports.DISCRETE_DOMAIN_SCALES = ['ordinal', 'bin-ordinal', 'point', 'band'];
var DISCRETE_DOMAIN_INDEX = util_1.toSet(exports.DISCRETE_DOMAIN_SCALES);
var BIN_SCALES_INDEX = util_1.toSet(['bin-linear', 'bin-ordinal']);
exports.TIME_SCALE_TYPES = ['time', 'utc'];
function hasDiscreteDomain(type) {
    return type in DISCRETE_DOMAIN_INDEX;
}
exports.hasDiscreteDomain = hasDiscreteDomain;
function isBinScale(type) {
    return type in BIN_SCALES_INDEX;
}
exports.isBinScale = isBinScale;
function hasContinuousDomain(type) {
    return type in CONTINUOUS_DOMAIN_INDEX;
}
exports.hasContinuousDomain = hasContinuousDomain;
function isContinuousToContinuous(type) {
    return type in CONTINUOUS_TO_CONTINUOUS_INDEX;
}
exports.isContinuousToContinuous = isContinuousToContinuous;
exports.defaultScaleConfig = {
    textXRangeStep: 90,
    rangeStep: 21,
    pointPadding: 0.5,
    bandPaddingInner: 0.1,
    facetSpacing: 16,
    minBandSize: 2,
    minFontSize: 8,
    maxFontSize: 40,
    minOpacity: 0.3,
    maxOpacity: 0.8,
    // FIXME: revise if these *can* become ratios of rangeStep
    minSize: 9,
    minStrokeWidth: 1,
    maxStrokeWidth: 4
};
function isExtendedScheme(scheme) {
    return scheme && !!scheme['name'];
}
exports.isExtendedScheme = isExtendedScheme;
function isSelectionDomain(domain) {
    return domain && domain['selection'];
}
exports.isSelectionDomain = isSelectionDomain;
var SCALE_PROPERTY_INDEX = {
    type: 1,
    domain: 1,
    range: 1,
    rangeStep: 1,
    scheme: 1,
    // Other properties
    reverse: 1,
    round: 1,
    // quantitative / time
    clamp: 1,
    nice: 1,
    // quantitative
    base: 1,
    exponent: 1,
    interpolate: 1,
    zero: 1,
    // band/point
    padding: 1,
    paddingInner: 1,
    paddingOuter: 1
};
exports.SCALE_PROPERTIES = util_1.flagKeys(SCALE_PROPERTY_INDEX);
var type = SCALE_PROPERTY_INDEX.type, domain = SCALE_PROPERTY_INDEX.domain, range = SCALE_PROPERTY_INDEX.range, rangeStep = SCALE_PROPERTY_INDEX.rangeStep, scheme = SCALE_PROPERTY_INDEX.scheme, NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTY_INDEX = __rest(SCALE_PROPERTY_INDEX, ["type", "domain", "range", "rangeStep", "scheme"]);
exports.NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES = util_1.flagKeys(NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTY_INDEX);
function scaleTypeSupportProperty(scaleType, propName) {
    switch (propName) {
        case 'type':
        case 'domain':
        case 'reverse':
        case 'range':
            return true;
        case 'scheme':
            return util_1.contains(['sequential', 'ordinal', 'bin-ordinal', 'quantile', 'quantize'], scaleType);
        case 'interpolate':
            // FIXME(https://github.com/vega/vega-lite/issues/2902) how about ordinal?
            return util_1.contains(['linear', 'bin-linear', 'pow', 'log', 'sqrt', 'utc', 'time'], scaleType);
        case 'round':
            return isContinuousToContinuous(scaleType) || scaleType === 'band' || scaleType === 'point';
        case 'padding':
            return isContinuousToContinuous(scaleType) || util_1.contains(['point', 'band'], scaleType);
        case 'paddingOuter':
        case 'rangeStep':
            return util_1.contains(['point', 'band'], scaleType);
        case 'paddingInner':
            return scaleType === 'band';
        case 'clamp':
            return isContinuousToContinuous(scaleType) || scaleType === 'sequential';
        case 'nice':
            return isContinuousToContinuous(scaleType) || scaleType === 'sequential' || scaleType === 'quantize';
        case 'exponent':
            return scaleType === 'pow';
        case 'base':
            return scaleType === 'log';
        case 'zero':
            return hasContinuousDomain(scaleType) && !util_1.contains([
                'log',
                'time', 'utc',
                'bin-linear',
                'threshold',
                'quantile' // quantile depends on distribution so zero does not matter
            ], scaleType);
    }
    /* istanbul ignore next: should never reach here*/
    throw new Error("Invalid scale property " + propName + ".");
}
exports.scaleTypeSupportProperty = scaleTypeSupportProperty;
/**
 * Returns undefined if the input channel supports the input scale property name
 */
function channelScalePropertyIncompatability(channel, propName) {
    switch (propName) {
        case 'interpolate':
        case 'scheme':
            if (channel !== 'color') {
                return log.message.cannotUseScalePropertyWithNonColor(channel);
            }
            return undefined;
        case 'type':
        case 'domain':
        case 'range':
        case 'base':
        case 'exponent':
        case 'nice':
        case 'padding':
        case 'paddingInner':
        case 'paddingOuter':
        case 'rangeStep':
        case 'reverse':
        case 'round':
        case 'clamp':
        case 'zero':
            return undefined; // GOOD!
    }
    /* istanbul ignore next: it should never reach here */
    throw new Error("Invalid scale property \"" + propName + "\".");
}
exports.channelScalePropertyIncompatability = channelScalePropertyIncompatability;
function channelSupportScaleType(channel, scaleType) {
    switch (channel) {
        case channel_1.Channel.X:
        case channel_1.Channel.Y:
        case channel_1.Channel.SIZE: // TODO: size and opacity can support ordinal with more modification
        case channel_1.Channel.OPACITY:
            // Although it generally doesn't make sense to use band with size and opacity,
            // it can also work since we use band: 0.5 to get midpoint.
            return isContinuousToContinuous(scaleType) || util_1.contains(['band', 'point'], scaleType);
        case channel_1.Channel.COLOR:
            return scaleType !== 'band'; // band does not make sense with color
        case channel_1.Channel.SHAPE:
            return scaleType === 'ordinal'; // shape = lookup only
    }
    /* istanbul ignore next: it should never reach here */
    return false;
}
exports.channelSupportScaleType = channelSupportScaleType;

},{"./channel":15,"./log":105,"./util":118}],109:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SELECTION_ID = '_vgsid_';
exports.defaultConfig = {
    single: {
        on: 'click',
        fields: [exports.SELECTION_ID],
        resolve: 'global',
        empty: 'all'
    },
    multi: {
        on: 'click',
        fields: [exports.SELECTION_ID],
        toggle: 'event.shiftKey',
        resolve: 'global',
        empty: 'all'
    },
    interval: {
        on: '[mousedown, window:mouseup] > window:mousemove!',
        encodings: ['x', 'y'],
        translate: '[mousedown, window:mouseup] > window:mousemove!',
        zoom: 'wheel!',
        mark: { fill: '#333', fillOpacity: 0.125, stroke: 'white' },
        resolve: 'global'
    }
};

},{}],110:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isSortField(sort) {
    return !!sort && (sort['op'] === 'count' || !!sort['field']) && !!sort['op'];
}
exports.isSortField = isSortField;

},{}],111:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var channel_1 = require("./channel");
var compositeMark = require("./compositemark");
var encoding_1 = require("./encoding");
var vlEncoding = require("./encoding");
var log = require("./log");
var mark_1 = require("./mark");
var stack_1 = require("./stack");
var util_1 = require("./util");
/* Custom type guards */
function isFacetSpec(spec) {
    return spec['facet'] !== undefined;
}
exports.isFacetSpec = isFacetSpec;
function isUnitSpec(spec) {
    return !!spec['mark'];
}
exports.isUnitSpec = isUnitSpec;
function isLayerSpec(spec) {
    return spec['layer'] !== undefined;
}
exports.isLayerSpec = isLayerSpec;
function isRepeatSpec(spec) {
    return spec['repeat'] !== undefined;
}
exports.isRepeatSpec = isRepeatSpec;
function isConcatSpec(spec) {
    return isVConcatSpec(spec) || isHConcatSpec(spec);
}
exports.isConcatSpec = isConcatSpec;
function isVConcatSpec(spec) {
    return spec['vconcat'] !== undefined;
}
exports.isVConcatSpec = isVConcatSpec;
function isHConcatSpec(spec) {
    return spec['hconcat'] !== undefined;
}
exports.isHConcatSpec = isHConcatSpec;
/**
 * Decompose extended unit specs into composition of pure unit specs.
 */
// TODO: consider moving this to another file.  Maybe vl.spec.normalize or vl.normalize
function normalize(spec, config) {
    if (isFacetSpec(spec)) {
        return normalizeFacet(spec, config);
    }
    if (isLayerSpec(spec)) {
        return normalizeLayer(spec, config);
    }
    if (isRepeatSpec(spec)) {
        return normalizeRepeat(spec, config);
    }
    if (isVConcatSpec(spec)) {
        return normalizeVConcat(spec, config);
    }
    if (isHConcatSpec(spec)) {
        return normalizeHConcat(spec, config);
    }
    if (isUnitSpec(spec)) {
        var hasRow = encoding_1.channelHasField(spec.encoding, channel_1.ROW);
        var hasColumn = encoding_1.channelHasField(spec.encoding, channel_1.COLUMN);
        if (hasRow || hasColumn) {
            return normalizeFacetedUnit(spec, config);
        }
        return normalizeNonFacetUnit(spec, config);
    }
    throw new Error(log.message.INVALID_SPEC);
}
exports.normalize = normalize;
function normalizeFacet(spec, config) {
    var subspec = spec.spec, rest = __rest(spec, ["spec"]);
    return __assign({}, rest, { 
        // TODO: remove "any" once we support all facet listed in https://github.com/vega/vega-lite/issues/2760
        spec: normalize(subspec, config) });
}
function normalizeLayer(spec, config) {
    var layer = spec.layer, rest = __rest(spec, ["layer"]);
    return __assign({}, rest, { layer: layer.map(function (subspec) { return isLayerSpec(subspec) ? normalizeLayer(subspec, config) : normalizeNonFacetUnit(subspec, config); }) });
}
function normalizeRepeat(spec, config) {
    var subspec = spec.spec, rest = __rest(spec, ["spec"]);
    return __assign({}, rest, { spec: normalize(subspec, config) });
}
function normalizeVConcat(spec, config) {
    var vconcat = spec.vconcat, rest = __rest(spec, ["vconcat"]);
    return __assign({}, rest, { vconcat: vconcat.map(function (subspec) { return normalize(subspec, config); }) });
}
function normalizeHConcat(spec, config) {
    var hconcat = spec.hconcat, rest = __rest(spec, ["hconcat"]);
    return __assign({}, rest, { hconcat: hconcat.map(function (subspec) { return normalize(subspec, config); }) });
}
function normalizeFacetedUnit(spec, config) {
    // New encoding in the inside spec should not contain row / column
    // as row/column should be moved to facet
    var _a = spec.encoding, row = _a.row, column = _a.column, encoding = __rest(_a, ["row", "column"]);
    // Mark and encoding should be moved into the inner spec
    var mark = spec.mark, width = spec.width, height = spec.height, selection = spec.selection, _ = spec.encoding, outerSpec = __rest(spec, ["mark", "width", "height", "selection", "encoding"]);
    return __assign({}, outerSpec, { facet: __assign({}, (row ? { row: row } : {}), (column ? { column: column } : {})), spec: normalizeNonFacetUnit(__assign({ mark: mark }, (width ? { width: width } : {}), (height ? { height: height } : {}), { encoding: encoding }, (selection ? { selection: selection } : {})), config) });
}
function isNonFacetUnitSpecWithPrimitiveMark(spec) {
    return mark_1.isPrimitiveMark(spec.mark);
}
function normalizeNonFacetUnit(spec, config) {
    if (isNonFacetUnitSpecWithPrimitiveMark(spec)) {
        // TODO: thoroughly test
        if (encoding_1.isRanged(spec.encoding)) {
            return normalizeRangedUnit(spec);
        }
        var overlayConfig = config && config.overlay;
        var overlayWithLine = overlayConfig && spec.mark === mark_1.AREA &&
            util_1.contains(['linepoint', 'line'], overlayConfig.area);
        var overlayWithPoint = overlayConfig && ((overlayConfig.line && spec.mark === mark_1.LINE) ||
            (overlayConfig.area === 'linepoint' && spec.mark === mark_1.AREA));
        // TODO: consider moving this to become another case of compositeMark
        if (overlayWithPoint || overlayWithLine) {
            return normalizeOverlay(spec, overlayWithPoint, overlayWithLine, config);
        }
        return spec; // Nothing to normalize
    }
    else {
        return compositeMark.normalize(spec, config);
    }
}
function normalizeRangedUnit(spec) {
    var hasX = encoding_1.channelHasField(spec.encoding, channel_1.X);
    var hasY = encoding_1.channelHasField(spec.encoding, channel_1.Y);
    var hasX2 = encoding_1.channelHasField(spec.encoding, channel_1.X2);
    var hasY2 = encoding_1.channelHasField(spec.encoding, channel_1.Y2);
    if ((hasX2 && !hasX) || (hasY2 && !hasY)) {
        var normalizedSpec = util_1.duplicate(spec);
        if (hasX2 && !hasX) {
            normalizedSpec.encoding.x = normalizedSpec.encoding.x2;
            delete normalizedSpec.encoding.x2;
        }
        if (hasY2 && !hasY) {
            normalizedSpec.encoding.y = normalizedSpec.encoding.y2;
            delete normalizedSpec.encoding.y2;
        }
        return normalizedSpec;
    }
    return spec;
}
// FIXME(#1804): re-design this
function normalizeOverlay(spec, overlayWithPoint, overlayWithLine, config) {
    var mark = spec.mark, selection = spec.selection, encoding = spec.encoding, outerSpec = __rest(spec, ["mark", "selection", "encoding"]);
    var layer = [{ mark: mark, encoding: encoding }];
    // Need to copy stack config to overlayed layer
    var stackProps = stack_1.stack(mark, encoding, config ? config.stack : undefined);
    var overlayEncoding = encoding;
    if (stackProps) {
        var stackFieldChannel = stackProps.fieldChannel, offset = stackProps.offset;
        overlayEncoding = __assign({}, encoding, (_a = {}, _a[stackFieldChannel] = __assign({}, encoding[stackFieldChannel], (offset ? { stack: offset } : {})), _a));
    }
    if (overlayWithLine) {
        layer.push(__assign({ mark: {
                type: 'line',
                style: 'lineOverlay'
            } }, (selection ? { selection: selection } : {}), { encoding: overlayEncoding }));
    }
    if (overlayWithPoint) {
        layer.push(__assign({ mark: {
                type: 'point',
                filled: true,
                style: 'pointOverlay'
            } }, (selection ? { selection: selection } : {}), { encoding: overlayEncoding }));
    }
    return __assign({}, outerSpec, { layer: layer });
    var _a;
}
// TODO: add vl.spec.validate & move stuff from vl.validate to here
/* Accumulate non-duplicate fieldDefs in a dictionary */
function accumulate(dict, fieldDefs) {
    fieldDefs.forEach(function (fieldDef) {
        // Consider only pure fieldDef properties (ignoring scale, axis, legend)
        var pureFieldDef = ['field', 'type', 'value', 'timeUnit', 'bin', 'aggregate'].reduce(function (f, key) {
            if (fieldDef[key] !== undefined) {
                f[key] = fieldDef[key];
            }
            return f;
        }, {});
        var key = util_1.hash(pureFieldDef);
        dict[key] = dict[key] || fieldDef;
    });
    return dict;
}
/* Recursively get fieldDefs from a spec, returns a dictionary of fieldDefs */
function fieldDefIndex(spec, dict) {
    if (dict === void 0) { dict = {}; }
    // FIXME(https://github.com/vega/vega-lite/issues/2207): Support fieldDefIndex for repeat
    if (isLayerSpec(spec)) {
        spec.layer.forEach(function (layer) {
            if (isUnitSpec(layer)) {
                accumulate(dict, vlEncoding.fieldDefs(layer.encoding));
            }
            else {
                fieldDefIndex(layer, dict);
            }
        });
    }
    else if (isFacetSpec(spec)) {
        accumulate(dict, vlEncoding.fieldDefs(spec.facet));
        fieldDefIndex(spec.spec, dict);
    }
    else if (isRepeatSpec(spec)) {
        fieldDefIndex(spec.spec, dict);
    }
    else if (isConcatSpec(spec)) {
        var childSpec = isVConcatSpec(spec) ? spec.vconcat : spec.hconcat;
        childSpec.forEach(function (child) { return fieldDefIndex(child, dict); });
    }
    else {
        accumulate(dict, vlEncoding.fieldDefs(spec.encoding));
    }
    return dict;
}
/* Returns all non-duplicate fieldDefs in a spec in a flat array */
function fieldDefs(spec) {
    return util_1.vals(fieldDefIndex(spec));
}
exports.fieldDefs = fieldDefs;
function isStacked(spec, config) {
    config = config || spec.config;
    if (mark_1.isPrimitiveMark(spec.mark)) {
        return stack_1.stack(spec.mark, spec.encoding, config ? config.stack : undefined) !== null;
    }
    return false;
}
exports.isStacked = isStacked;

},{"./channel":15,"./compositemark":94,"./encoding":98,"./log":105,"./mark":107,"./stack":112,"./util":118}],112:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aggregate_1 = require("./aggregate");
var channel_1 = require("./channel");
var encoding_1 = require("./encoding");
var fielddef_1 = require("./fielddef");
var log = require("./log");
var mark_1 = require("./mark");
var scale_1 = require("./scale");
var util_1 = require("./util");
var STACK_OFFSET_INDEX = {
    zero: 1,
    center: 1,
    normalize: 1
};
function isStackOffset(stack) {
    return !!STACK_OFFSET_INDEX[stack];
}
exports.isStackOffset = isStackOffset;
exports.STACKABLE_MARKS = [mark_1.BAR, mark_1.AREA, mark_1.RULE, mark_1.POINT, mark_1.CIRCLE, mark_1.SQUARE, mark_1.LINE, mark_1.TEXT, mark_1.TICK];
exports.STACK_BY_DEFAULT_MARKS = [mark_1.BAR, mark_1.AREA];
function potentialStackedChannel(encoding) {
    var xDef = encoding.x;
    var yDef = encoding.y;
    if (fielddef_1.isFieldDef(xDef) && fielddef_1.isFieldDef(yDef)) {
        if (xDef.type === 'quantitative' && yDef.type === 'quantitative') {
            if (xDef.stack) {
                return 'x';
            }
            else if (yDef.stack) {
                return 'y';
            }
            // if there is no explicit stacking, only apply stack if there is only one aggregate for x or y
            if ((!!xDef.aggregate) !== (!!yDef.aggregate)) {
                return xDef.aggregate ? 'x' : 'y';
            }
        }
        else if (xDef.type === 'quantitative') {
            return 'x';
        }
        else if (yDef.type === 'quantitative') {
            return 'y';
        }
    }
    else if (fielddef_1.isFieldDef(xDef) && xDef.type === 'quantitative') {
        return 'x';
    }
    else if (fielddef_1.isFieldDef(yDef) && yDef.type === 'quantitative') {
        return 'y';
    }
    return undefined;
}
// Note: CompassQL uses this method and only pass in required properties of each argument object.
// If required properties change, make sure to update CompassQL.
function stack(m, encoding, stackConfig) {
    var mark = mark_1.isMarkDef(m) ? m.type : m;
    // Should have stackable mark
    if (!util_1.contains(exports.STACKABLE_MARKS, mark)) {
        return null;
    }
    var fieldChannel = potentialStackedChannel(encoding);
    if (!fieldChannel) {
        return null;
    }
    var stackedFieldDef = encoding[fieldChannel];
    var stackedField = fielddef_1.isStringFieldDef(stackedFieldDef) ? fielddef_1.field(stackedFieldDef, {}) : undefined;
    var dimensionChannel = fieldChannel === 'x' ? 'y' : 'x';
    var dimensionDef = encoding[dimensionChannel];
    var dimensionField = fielddef_1.isStringFieldDef(dimensionDef) ? fielddef_1.field(dimensionDef, {}) : undefined;
    // Should have grouping level of detail that is different from the dimension field
    var stackBy = channel_1.NONPOSITION_CHANNELS.reduce(function (sc, channel) {
        if (encoding_1.channelHasField(encoding, channel)) {
            var channelDef = encoding[channel];
            (util_1.isArray(channelDef) ? channelDef : [channelDef]).forEach(function (cDef) {
                var fieldDef = fielddef_1.getFieldDef(cDef);
                if (fieldDef.aggregate) {
                    return;
                }
                // Check whether the channel's field is identical to x/y's field or if the channel is a repeat
                var f = fielddef_1.isStringFieldDef(fieldDef) ? fielddef_1.field(fieldDef, {}) : undefined;
                if (
                // if fielddef is a repeat, just include it in the stack by
                !f ||
                    // otherwise, the field must be different from x and y fields.
                    (f !== dimensionField && f !== stackedField)) {
                    sc.push({ channel: channel, fieldDef: fieldDef });
                }
            });
        }
        return sc;
    }, []);
    if (stackBy.length === 0) {
        return null;
    }
    // Automatically determine offset
    var offset = undefined;
    if (stackedFieldDef.stack !== undefined) {
        offset = stackedFieldDef.stack;
    }
    else if (util_1.contains(exports.STACK_BY_DEFAULT_MARKS, mark)) {
        // Bar and Area with sum ops are automatically stacked by default
        offset = stackConfig === undefined ? 'zero' : stackConfig;
    }
    else {
        offset = stackConfig;
    }
    if (!offset || !isStackOffset(offset)) {
        return null;
    }
    // If stacked, check scale type if it is linear
    if (stackedFieldDef.scale && stackedFieldDef.scale.type && stackedFieldDef.scale.type !== scale_1.ScaleType.LINEAR) {
        log.warn(log.message.cannotStackNonLinearScale(stackedFieldDef.scale.type));
        return null;
    }
    // Check if it is a ranged mark
    if (encoding_1.channelHasField(encoding, fieldChannel === channel_1.X ? channel_1.X2 : channel_1.Y2)) {
        log.warn(log.message.cannotStackRangedMark(fieldChannel));
        return null;
    }
    // Warn if stacking summative aggregate
    if (stackedFieldDef.aggregate && !util_1.contains(aggregate_1.SUM_OPS, stackedFieldDef.aggregate)) {
        log.warn(log.message.stackNonSummativeAggregate(stackedFieldDef.aggregate));
    }
    return {
        groupbyChannel: dimensionDef ? dimensionChannel : undefined,
        fieldChannel: fieldChannel,
        impute: util_1.contains(['area', 'line'], mark),
        stackBy: stackBy,
        offset: offset
    };
}
exports.stack = stack;

},{"./aggregate":12,"./channel":15,"./encoding":98,"./fielddef":100,"./log":105,"./mark":107,"./scale":108,"./util":118}],113:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var datetime_1 = require("./datetime");
var log = require("./log");
var util_1 = require("./util");
var TimeUnit;
(function (TimeUnit) {
    TimeUnit.YEAR = 'year';
    TimeUnit.MONTH = 'month';
    TimeUnit.DAY = 'day';
    TimeUnit.DATE = 'date';
    TimeUnit.HOURS = 'hours';
    TimeUnit.MINUTES = 'minutes';
    TimeUnit.SECONDS = 'seconds';
    TimeUnit.MILLISECONDS = 'milliseconds';
    TimeUnit.YEARMONTH = 'yearmonth';
    TimeUnit.YEARMONTHDATE = 'yearmonthdate';
    TimeUnit.YEARMONTHDATEHOURS = 'yearmonthdatehours';
    TimeUnit.YEARMONTHDATEHOURSMINUTES = 'yearmonthdatehoursminutes';
    TimeUnit.YEARMONTHDATEHOURSMINUTESSECONDS = 'yearmonthdatehoursminutesseconds';
    // MONTHDATE always include 29 February since we use year 0th (which is a leap year);
    TimeUnit.MONTHDATE = 'monthdate';
    TimeUnit.HOURSMINUTES = 'hoursminutes';
    TimeUnit.HOURSMINUTESSECONDS = 'hoursminutesseconds';
    TimeUnit.MINUTESSECONDS = 'minutesseconds';
    TimeUnit.SECONDSMILLISECONDS = 'secondsmilliseconds';
    TimeUnit.QUARTER = 'quarter';
    TimeUnit.YEARQUARTER = 'yearquarter';
    TimeUnit.QUARTERMONTH = 'quartermonth';
    TimeUnit.YEARQUARTERMONTH = 'yearquartermonth';
    TimeUnit.UTCYEAR = 'utcyear';
    TimeUnit.UTCMONTH = 'utcmonth';
    TimeUnit.UTCDAY = 'utcday';
    TimeUnit.UTCDATE = 'utcdate';
    TimeUnit.UTCHOURS = 'utchours';
    TimeUnit.UTCMINUTES = 'utcminutes';
    TimeUnit.UTCSECONDS = 'utcseconds';
    TimeUnit.UTCMILLISECONDS = 'utcmilliseconds';
    TimeUnit.UTCYEARMONTH = 'utcyearmonth';
    TimeUnit.UTCYEARMONTHDATE = 'utcyearmonthdate';
    TimeUnit.UTCYEARMONTHDATEHOURS = 'utcyearmonthdatehours';
    TimeUnit.UTCYEARMONTHDATEHOURSMINUTES = 'utcyearmonthdatehoursminutes';
    TimeUnit.UTCYEARMONTHDATEHOURSMINUTESSECONDS = 'utcyearmonthdatehoursminutesseconds';
    // MONTHDATE always include 29 February since we use year 0th (which is a leap year);
    TimeUnit.UTCMONTHDATE = 'utcmonthdate';
    TimeUnit.UTCHOURSMINUTES = 'utchoursminutes';
    TimeUnit.UTCHOURSMINUTESSECONDS = 'utchoursminutesseconds';
    TimeUnit.UTCMINUTESSECONDS = 'utcminutesseconds';
    TimeUnit.UTCSECONDSMILLISECONDS = 'utcsecondsmilliseconds';
    TimeUnit.UTCQUARTER = 'utcquarter';
    TimeUnit.UTCYEARQUARTER = 'utcyearquarter';
    TimeUnit.UTCQUARTERMONTH = 'utcquartermonth';
    TimeUnit.UTCYEARQUARTERMONTH = 'utcyearquartermonth';
})(TimeUnit = exports.TimeUnit || (exports.TimeUnit = {}));
/** Time Unit that only corresponds to only one part of Date objects. */
var LOCAL_SINGLE_TIMEUNIT_INDEX = {
    year: 1,
    quarter: 1,
    month: 1,
    day: 1,
    date: 1,
    hours: 1,
    minutes: 1,
    seconds: 1,
    milliseconds: 1
};
exports.TIMEUNIT_PARTS = util_1.flagKeys(LOCAL_SINGLE_TIMEUNIT_INDEX);
function isLocalSingleTimeUnit(timeUnit) {
    return !!LOCAL_SINGLE_TIMEUNIT_INDEX[timeUnit];
}
exports.isLocalSingleTimeUnit = isLocalSingleTimeUnit;
var UTC_SINGLE_TIMEUNIT_INDEX = {
    utcyear: 1,
    utcquarter: 1,
    utcmonth: 1,
    utcday: 1,
    utcdate: 1,
    utchours: 1,
    utcminutes: 1,
    utcseconds: 1,
    utcmilliseconds: 1
};
function isUtcSingleTimeUnit(timeUnit) {
    return !!UTC_SINGLE_TIMEUNIT_INDEX[timeUnit];
}
exports.isUtcSingleTimeUnit = isUtcSingleTimeUnit;
var LOCAL_MULTI_TIMEUNIT_INDEX = {
    yearquarter: 1,
    yearquartermonth: 1,
    yearmonth: 1,
    yearmonthdate: 1,
    yearmonthdatehours: 1,
    yearmonthdatehoursminutes: 1,
    yearmonthdatehoursminutesseconds: 1,
    quartermonth: 1,
    monthdate: 1,
    hoursminutes: 1,
    hoursminutesseconds: 1,
    minutesseconds: 1,
    secondsmilliseconds: 1
};
var UTC_MULTI_TIMEUNIT_INDEX = {
    utcyearquarter: 1,
    utcyearquartermonth: 1,
    utcyearmonth: 1,
    utcyearmonthdate: 1,
    utcyearmonthdatehours: 1,
    utcyearmonthdatehoursminutes: 1,
    utcyearmonthdatehoursminutesseconds: 1,
    utcquartermonth: 1,
    utcmonthdate: 1,
    utchoursminutes: 1,
    utchoursminutesseconds: 1,
    utcminutesseconds: 1,
    utcsecondsmilliseconds: 1
};
var UTC_TIMEUNIT_INDEX = __assign({}, UTC_SINGLE_TIMEUNIT_INDEX, UTC_MULTI_TIMEUNIT_INDEX);
function isUTCTimeUnit(t) {
    return !!UTC_TIMEUNIT_INDEX[t];
}
exports.isUTCTimeUnit = isUTCTimeUnit;
function getLocalTimeUnit(t) {
    return t.substr(3);
}
exports.getLocalTimeUnit = getLocalTimeUnit;
var TIMEUNIT_INDEX = __assign({}, LOCAL_SINGLE_TIMEUNIT_INDEX, UTC_SINGLE_TIMEUNIT_INDEX, LOCAL_MULTI_TIMEUNIT_INDEX, UTC_MULTI_TIMEUNIT_INDEX);
exports.TIMEUNITS = util_1.flagKeys(TIMEUNIT_INDEX);
function isTimeUnit(t) {
    return !!TIMEUNIT_INDEX[t];
}
exports.isTimeUnit = isTimeUnit;
var SET_DATE_METHOD = {
    year: 'setFullYear',
    month: 'setMonth',
    date: 'setDate',
    hours: 'setHours',
    minutes: 'setMinutes',
    seconds: 'setSeconds',
    milliseconds: 'setMilliseconds',
    // Day and quarter have their own special cases
    quarter: null,
    day: null,
};
/**
 * Converts a date to only have the measurements relevant to the specified unit
 * i.e. ('yearmonth', '2000-12-04 07:58:14') -> '2000-12-01 00:00:00'
 * Note: the base date is Jan 01 1900 00:00:00
 */
function convert(unit, date) {
    var isUTC = isUTCTimeUnit(unit);
    var result = isUTC ?
        // start with uniform date
        new Date(Date.UTC(0, 0, 1, 0, 0, 0, 0)) :
        new Date(0, 0, 1, 0, 0, 0, 0);
    for (var _i = 0, TIMEUNIT_PARTS_1 = exports.TIMEUNIT_PARTS; _i < TIMEUNIT_PARTS_1.length; _i++) {
        var timeUnitPart = TIMEUNIT_PARTS_1[_i];
        if (containsTimeUnit(unit, timeUnitPart)) {
            switch (timeUnitPart) {
                case TimeUnit.DAY:
                    throw new Error('Cannot convert to TimeUnits containing \'day\'');
                case TimeUnit.QUARTER: {
                    var _a = dateMethods('month', isUTC), getDateMethod_1 = _a.getDateMethod, setDateMethod_1 = _a.setDateMethod;
                    // indicate quarter by setting month to be the first of the quarter i.e. may (4) -> april (3)
                    result[setDateMethod_1]((Math.floor(date[getDateMethod_1]() / 3)) * 3);
                    break;
                }
                default:
                    var _b = dateMethods(timeUnitPart, isUTC), getDateMethod = _b.getDateMethod, setDateMethod = _b.setDateMethod;
                    result[setDateMethod](date[getDateMethod]());
            }
        }
    }
    return result;
}
exports.convert = convert;
function dateMethods(singleUnit, isUtc) {
    var rawSetDateMethod = SET_DATE_METHOD[singleUnit];
    var setDateMethod = isUtc ? 'setUTC' + rawSetDateMethod.substr(3) : rawSetDateMethod;
    var getDateMethod = 'get' + (isUtc ? 'UTC' : '') + rawSetDateMethod.substr(3);
    return { setDateMethod: setDateMethod, getDateMethod: getDateMethod };
}
function getTimeUnitParts(timeUnit) {
    return exports.TIMEUNIT_PARTS.reduce(function (parts, part) {
        if (containsTimeUnit(timeUnit, part)) {
            return parts.concat(part);
        }
        return parts;
    }, []);
}
exports.getTimeUnitParts = getTimeUnitParts;
/** Returns true if fullTimeUnit contains the timeUnit, false otherwise. */
function containsTimeUnit(fullTimeUnit, timeUnit) {
    var index = fullTimeUnit.indexOf(timeUnit);
    return index > -1 &&
        (timeUnit !== TimeUnit.SECONDS ||
            index === 0 ||
            fullTimeUnit.charAt(index - 1) !== 'i' // exclude milliseconds
        );
}
exports.containsTimeUnit = containsTimeUnit;
/**
 * Returns Vega expresssion for a given timeUnit and fieldRef
 */
function fieldExpr(fullTimeUnit, field) {
    var fieldRef = "datum" + util_1.accessPath(field);
    var utc = isUTCTimeUnit(fullTimeUnit) ? 'utc' : '';
    function func(timeUnit) {
        if (timeUnit === TimeUnit.QUARTER) {
            // quarter starting at 0 (0,3,6,9).
            return "(" + utc + "quarter(" + fieldRef + ")-1)";
        }
        else {
            return "" + utc + timeUnit + "(" + fieldRef + ")";
        }
    }
    var d = exports.TIMEUNIT_PARTS.reduce(function (dateExpr, tu) {
        if (containsTimeUnit(fullTimeUnit, tu)) {
            dateExpr[tu] = func(tu);
        }
        return dateExpr;
    }, {});
    return datetime_1.dateTimeExpr(d);
}
exports.fieldExpr = fieldExpr;
/**
 * returns the signal expression used for axis labels for a time unit
 */
function formatExpression(timeUnit, field, shortTimeLabels, isUTCScale) {
    if (!timeUnit) {
        return undefined;
    }
    var dateComponents = [];
    var expression = '';
    var hasYear = containsTimeUnit(timeUnit, TimeUnit.YEAR);
    if (containsTimeUnit(timeUnit, TimeUnit.QUARTER)) {
        // special expression for quarter as prefix
        expression = "'Q' + quarter(" + field + ")";
    }
    if (containsTimeUnit(timeUnit, TimeUnit.MONTH)) {
        // By default use short month name
        dateComponents.push(shortTimeLabels !== false ? '%b' : '%B');
    }
    if (containsTimeUnit(timeUnit, TimeUnit.DAY)) {
        dateComponents.push(shortTimeLabels ? '%a' : '%A');
    }
    else if (containsTimeUnit(timeUnit, TimeUnit.DATE)) {
        dateComponents.push('%d' + (hasYear ? ',' : '')); // add comma if there is year
    }
    if (hasYear) {
        dateComponents.push(shortTimeLabels ? '%y' : '%Y');
    }
    var timeComponents = [];
    if (containsTimeUnit(timeUnit, TimeUnit.HOURS)) {
        timeComponents.push('%H');
    }
    if (containsTimeUnit(timeUnit, TimeUnit.MINUTES)) {
        timeComponents.push('%M');
    }
    if (containsTimeUnit(timeUnit, TimeUnit.SECONDS)) {
        timeComponents.push('%S');
    }
    if (containsTimeUnit(timeUnit, TimeUnit.MILLISECONDS)) {
        timeComponents.push('%L');
    }
    var dateTimeComponents = [];
    if (dateComponents.length > 0) {
        dateTimeComponents.push(dateComponents.join(' '));
    }
    if (timeComponents.length > 0) {
        dateTimeComponents.push(timeComponents.join(':'));
    }
    if (dateTimeComponents.length > 0) {
        if (expression) {
            // Add space between quarter and main time format
            expression += " + ' ' + ";
        }
        // We only use utcFormat for utc scale
        // For utc time units, the data is already converted as a part of timeUnit transform.
        // Thus, utc time units should use timeFormat to avoid shifting the time twice.
        if (isUTCScale) {
            expression += "utcFormat(" + field + ", '" + dateTimeComponents.join(' ') + "')";
        }
        else {
            expression += "timeFormat(" + field + ", '" + dateTimeComponents.join(' ') + "')";
        }
    }
    // If expression is still an empty string, return undefined instead.
    return expression || undefined;
}
exports.formatExpression = formatExpression;
function normalizeTimeUnit(timeUnit) {
    if (timeUnit !== 'day' && timeUnit.indexOf('day') >= 0) {
        log.warn(log.message.dayReplacedWithDate(timeUnit));
        return timeUnit.replace('day', 'date');
    }
    return timeUnit;
}
exports.normalizeTimeUnit = normalizeTimeUnit;

},{"./datetime":97,"./log":105,"./util":118}],114:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function extractTitleConfig(titleConfig) {
    var 
    // These are non-mark title config that need to be hardcoded
    anchor = titleConfig.anchor, offset = titleConfig.offset, orient = titleConfig.orient, 
    // color needs to be redirect to fill
    color = titleConfig.color, 
    // The rest are mark config.
    titleMarkConfig = __rest(titleConfig, ["anchor", "offset", "orient", "color"]);
    var mark = __assign({}, titleMarkConfig, color ? { fill: color } : {});
    var nonMark = __assign({}, anchor ? { anchor: anchor } : {}, offset ? { offset: offset } : {}, orient ? { orient: orient } : {});
    return { mark: mark, nonMark: nonMark };
}
exports.extractTitleConfig = extractTitleConfig;

},{}],115:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var log = require("./log");
function _normalizeAutoSize(autosize) {
    return util_1.isString(autosize) ? { type: autosize } : autosize || {};
}
function normalizeAutoSize(topLevelAutosize, configAutosize, isUnitOrLayer) {
    if (isUnitOrLayer === void 0) { isUnitOrLayer = true; }
    var autosize = __assign({ type: 'pad' }, _normalizeAutoSize(configAutosize), _normalizeAutoSize(topLevelAutosize));
    if (autosize.type === 'fit') {
        if (!isUnitOrLayer) {
            log.warn(log.message.FIT_NON_SINGLE);
            autosize.type = 'pad';
        }
    }
    return autosize;
}
exports.normalizeAutoSize = normalizeAutoSize;
var TOP_LEVEL_PROPERTIES = [
    'background', 'padding'
    // We do not include "autosize" here as it is supported by only unit and layer specs and thus need to be normalized
];
function extractTopLevelProperties(t) {
    return TOP_LEVEL_PROPERTIES.reduce(function (o, p) {
        if (t && t[p] !== undefined) {
            o[p] = t[p];
        }
        return o;
    }, {});
}
exports.extractTopLevelProperties = extractTopLevelProperties;

},{"./log":105,"util":8}],116:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = require("./filter");
var logical_1 = require("./logical");
function isFilter(t) {
    return t['filter'] !== undefined;
}
exports.isFilter = isFilter;
function isLookup(t) {
    return t['lookup'] !== undefined;
}
exports.isLookup = isLookup;
function isCalculate(t) {
    return t['calculate'] !== undefined;
}
exports.isCalculate = isCalculate;
function isBin(t) {
    return !!t['bin'];
}
exports.isBin = isBin;
function isTimeUnit(t) {
    return t['timeUnit'] !== undefined;
}
exports.isTimeUnit = isTimeUnit;
function isAggregate(t) {
    return t['aggregate'] !== undefined;
}
exports.isAggregate = isAggregate;
function normalizeTransform(transform) {
    return transform.map(function (t) {
        if (isFilter(t)) {
            return {
                filter: logical_1.normalizeLogicalOperand(t.filter, filter_1.normalizeFilter)
            };
        }
        return t;
    });
}
exports.normalizeTransform = normalizeTransform;

},{"./filter":101,"./logical":106}],117:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Constants and utilities for data type */
/** Data type based on level of measurement */
var Type;
(function (Type) {
    Type.QUANTITATIVE = 'quantitative';
    Type.ORDINAL = 'ordinal';
    Type.TEMPORAL = 'temporal';
    Type.NOMINAL = 'nominal';
})(Type = exports.Type || (exports.Type = {}));
var TYPE_INDEX = {
    quantitative: 1,
    ordinal: 1,
    temporal: 1,
    nominal: 1
};
function isType(t) {
    return !!TYPE_INDEX[t];
}
exports.isType = isType;
exports.QUANTITATIVE = Type.QUANTITATIVE;
exports.ORDINAL = Type.ORDINAL;
exports.TEMPORAL = Type.TEMPORAL;
exports.NOMINAL = Type.NOMINAL;
/**
 * Get full, lowercase type name for a given type.
 * @param  type
 * @return Full type name.
 */
function getFullName(type) {
    if (type) {
        type = type.toLowerCase();
        switch (type) {
            case 'q':
            case exports.QUANTITATIVE:
                return 'quantitative';
            case 't':
            case exports.TEMPORAL:
                return 'temporal';
            case 'o':
            case exports.ORDINAL:
                return 'ordinal';
            case 'n':
            case exports.NOMINAL:
                return 'nominal';
        }
    }
    // If we get invalid input, return undefined type.
    return undefined;
}
exports.getFullName = getFullName;

},{}],118:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringify = require("json-stable-stringify");
var vega_util_1 = require("vega-util");
var logical_1 = require("./logical");
var vega_util_2 = require("vega-util");
exports.isArray = vega_util_2.isArray;
exports.isObject = vega_util_2.isObject;
exports.isNumber = vega_util_2.isNumber;
exports.isString = vega_util_2.isString;
exports.truncate = vega_util_2.truncate;
exports.toSet = vega_util_2.toSet;
exports.stringValue = vega_util_2.stringValue;
exports.splitAccessPath = vega_util_2.splitAccessPath;
/**
 * Creates an object composed of the picked object properties.
 *
 * Example:  (from lodash)
 *
 * var object = {'a': 1, 'b': '2', 'c': 3};
 * pick(object, ['a', 'c']);
 * // → {'a': 1, 'c': 3}
 *
 */
function pick(obj, props) {
    var copy = {};
    for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
        var prop = props_1[_i];
        if (obj.hasOwnProperty(prop)) {
            copy[prop] = obj[prop];
        }
    }
    return copy;
}
exports.pick = pick;
/**
 * The opposite of _.pick; this method creates an object composed of the own
 * and inherited enumerable string keyed properties of object that are not omitted.
 */
function omit(obj, props) {
    var copy = duplicate(obj);
    for (var _i = 0, props_2 = props; _i < props_2.length; _i++) {
        var prop = props_2[_i];
        delete copy[prop];
    }
    return copy;
}
exports.omit = omit;
function hash(a) {
    if (vega_util_1.isString(a) || vega_util_1.isNumber(a) || isBoolean(a)) {
        return String(a);
    }
    var str = stringify(a);
    // short strings can be used as hash directly, longer strings are hashed to reduce memory usage
    if (str.length < 100) {
        return str;
    }
    // from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
    var h = 0;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        h = ((h << 5) - h) + char;
        h = h & h; // Convert to 32bit integer
    }
    return h;
}
exports.hash = hash;
function contains(array, item) {
    return array.indexOf(item) > -1;
}
exports.contains = contains;
/** Returns the array without the elements in item */
function without(array, excludedItems) {
    return array.filter(function (item) { return !contains(excludedItems, item); });
}
exports.without = without;
function union(array, other) {
    return array.concat(without(other, array));
}
exports.union = union;
/**
 * Returns true if any item returns true.
 */
function some(arr, f) {
    var i = 0;
    for (var k = 0; k < arr.length; k++) {
        if (f(arr[k], k, i++)) {
            return true;
        }
    }
    return false;
}
exports.some = some;
/**
 * Returns true if all items return true.
 */
function every(arr, f) {
    var i = 0;
    for (var k = 0; k < arr.length; k++) {
        if (!f(arr[k], k, i++)) {
            return false;
        }
    }
    return true;
}
exports.every = every;
function flatten(arrays) {
    return [].concat.apply([], arrays);
}
exports.flatten = flatten;
/**
 * recursively merges src into dest
 */
function mergeDeep(dest) {
    var src = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        src[_i - 1] = arguments[_i];
    }
    for (var _a = 0, src_1 = src; _a < src_1.length; _a++) {
        var s = src_1[_a];
        dest = deepMerge_(dest, s);
    }
    return dest;
}
exports.mergeDeep = mergeDeep;
// recursively merges src into dest
function deepMerge_(dest, src) {
    if (typeof src !== 'object' || src === null) {
        return dest;
    }
    for (var p in src) {
        if (!src.hasOwnProperty(p)) {
            continue;
        }
        if (src[p] === undefined) {
            continue;
        }
        if (typeof src[p] !== 'object' || vega_util_1.isArray(src[p]) || src[p] === null) {
            dest[p] = src[p];
        }
        else if (typeof dest[p] !== 'object' || dest[p] === null) {
            dest[p] = mergeDeep(vega_util_1.isArray(src[p].constructor) ? [] : {}, src[p]);
        }
        else {
            mergeDeep(dest[p], src[p]);
        }
    }
    return dest;
}
function unique(values, f) {
    var results = [];
    var u = {};
    var v;
    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
        var val = values_1[_i];
        v = f(val);
        if (v in u) {
            continue;
        }
        u[v] = 1;
        results.push(val);
    }
    return results;
}
exports.unique = unique;
/**
 * Returns true if the two dictionaries disagree. Applies only to defined values.
 */
function differ(dict, other) {
    for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
            if (other[key] && dict[key] && other[key] !== dict[key]) {
                return true;
            }
        }
    }
    return false;
}
exports.differ = differ;
function hasIntersection(a, b) {
    for (var key in a) {
        if (key in b) {
            return true;
        }
    }
    return false;
}
exports.hasIntersection = hasIntersection;
function isNumeric(num) {
    return !isNaN(num);
}
exports.isNumeric = isNumeric;
function differArray(array, other) {
    if (array.length !== other.length) {
        return true;
    }
    array.sort();
    other.sort();
    for (var i = 0; i < array.length; i++) {
        if (other[i] !== array[i]) {
            return true;
        }
    }
    return false;
}
exports.differArray = differArray;
// This is a stricter version of Object.keys but with better types. See https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208
exports.keys = Object.keys;
function vals(x) {
    var _vals = [];
    for (var k in x) {
        if (x.hasOwnProperty(k)) {
            _vals.push(x[k]);
        }
    }
    return _vals;
}
exports.vals = vals;
function flagKeys(f) {
    return exports.keys(f);
}
exports.flagKeys = flagKeys;
function duplicate(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.duplicate = duplicate;
function isBoolean(b) {
    return b === true || b === false;
}
exports.isBoolean = isBoolean;
/**
 * Convert a string into a valid variable name
 */
function varName(s) {
    // Replace non-alphanumeric characters (anything besides a-zA-Z0-9_) with _
    var alphanumericS = s.replace(/\W/g, '_');
    // Add _ if the string has leading numbers.
    return (s.match(/^\d+/) ? '_' : '') + alphanumericS;
}
exports.varName = varName;
function logicalExpr(op, cb) {
    if (logical_1.isLogicalNot(op)) {
        return '!(' + logicalExpr(op.not, cb) + ')';
    }
    else if (logical_1.isLogicalAnd(op)) {
        return '(' + op.and.map(function (and) { return logicalExpr(and, cb); }).join(') && (') + ')';
    }
    else if (logical_1.isLogicalOr(op)) {
        return '(' + op.or.map(function (or) { return logicalExpr(or, cb); }).join(') || (') + ')';
    }
    else {
        return cb(op);
    }
}
exports.logicalExpr = logicalExpr;
/**
 * Delete nested property of an object, and delete the ancestors of the property if they become empty.
 */
function deleteNestedProperty(obj, orderedProps) {
    var isEmpty = true;
    while (orderedProps.length > 0 && isEmpty) {
        var o = obj;
        for (var i = 0; i < orderedProps.length - 1; i++) {
            o = o[orderedProps[i]];
        }
        delete o[orderedProps.pop()];
        if (exports.keys(o).length !== 0) {
            isEmpty = false;
        }
    }
}
exports.deleteNestedProperty = deleteNestedProperty;
function titlecase(s) {
    return s.charAt(0).toUpperCase() + s.substr(1);
}
exports.titlecase = titlecase;
/**
 * Converts a path to an access path.
 */
function accessPath(path) {
    return "[" + vega_util_1.splitAccessPath(path).map(vega_util_1.stringValue).join('][') + "]";
}
exports.accessPath = accessPath;

},{"./logical":106,"json-stable-stringify":1,"vega-util":10}],119:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mark_1 = require("./mark");
var mark_2 = require("./mark");
var util_1 = require("./util");
/**
 * Required Encoding Channels for each mark type
 */
exports.DEFAULT_REQUIRED_CHANNEL_MAP = {
    text: ['text'],
    line: ['x', 'y'],
    area: ['x', 'y']
};
/**
 * Supported Encoding Channel for each mark type
 */
exports.DEFAULT_SUPPORTED_CHANNEL_TYPE = {
    bar: util_1.toSet(['row', 'column', 'x', 'y', 'size', 'color', 'detail']),
    line: util_1.toSet(['row', 'column', 'x', 'y', 'color', 'detail']),
    area: util_1.toSet(['row', 'column', 'x', 'y', 'color', 'detail']),
    tick: util_1.toSet(['row', 'column', 'x', 'y', 'color', 'detail']),
    circle: util_1.toSet(['row', 'column', 'x', 'y', 'color', 'size', 'detail']),
    square: util_1.toSet(['row', 'column', 'x', 'y', 'color', 'size', 'detail']),
    point: util_1.toSet(['row', 'column', 'x', 'y', 'color', 'size', 'detail', 'shape']),
    text: util_1.toSet(['row', 'column', 'size', 'color', 'text']) // TODO(#724) revise
};
// TODO: consider if we should add validate method and
// requires ZSchema in the main vega-lite repo
/**
 * Further check if encoding mapping of a spec is invalid and
 * return error if it is invalid.
 *
 * This checks if
 * (1) all the required encoding channels for the mark type are specified
 * (2) all the specified encoding channels are supported by the mark type
 * @param  {[type]} spec [description]
 * @param  {RequiredChannelMap = DefaultRequiredChannelMap}  requiredChannelMap
 * @param  {SupportedChannelMap = DefaultSupportedChannelMap} supportedChannelMap
 * @return {String} Return one reason why the encoding is invalid,
 *                  or null if the encoding is valid.
 */
function getEncodingMappingError(spec, requiredChannelMap, supportedChannelMap) {
    if (requiredChannelMap === void 0) { requiredChannelMap = exports.DEFAULT_REQUIRED_CHANNEL_MAP; }
    if (supportedChannelMap === void 0) { supportedChannelMap = exports.DEFAULT_SUPPORTED_CHANNEL_TYPE; }
    var mark = mark_1.isMarkDef(spec.mark) ? spec.mark.type : spec.mark;
    var encoding = spec.encoding;
    var requiredChannels = requiredChannelMap[mark];
    var supportedChannels = supportedChannelMap[mark];
    for (var i in requiredChannels) {
        if (!(requiredChannels[i] in encoding)) {
            return 'Missing encoding channel \"' + requiredChannels[i] +
                '\" for mark \"' + mark + '\"';
        }
    }
    for (var channel in encoding) {
        if (!supportedChannels[channel]) {
            return 'Encoding channel \"' + channel +
                '\" is not supported by mark type \"' + mark + '\"';
        }
    }
    if (mark === mark_2.BAR && !encoding.x && !encoding.y) {
        return 'Missing both x and y for bar';
    }
    return null;
}
exports.getEncodingMappingError = getEncodingMappingError;

},{"./mark":107,"./util":118}],120:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
function isVgSignalRef(o) {
    return !!o['signal'];
}
exports.isVgSignalRef = isVgSignalRef;
function isVgRangeStep(range) {
    return !!range['step'];
}
exports.isVgRangeStep = isVgRangeStep;
function isDataRefUnionedDomain(domain) {
    if (!util_1.isArray(domain)) {
        return 'fields' in domain && !('data' in domain);
    }
    return false;
}
exports.isDataRefUnionedDomain = isDataRefUnionedDomain;
function isFieldRefUnionDomain(domain) {
    if (!util_1.isArray(domain)) {
        return 'fields' in domain && 'data' in domain;
    }
    return false;
}
exports.isFieldRefUnionDomain = isFieldRefUnionDomain;
function isDataRefDomain(domain) {
    if (!util_1.isArray(domain)) {
        return 'field' in domain && 'data' in domain;
    }
    return false;
}
exports.isDataRefDomain = isDataRefDomain;
function isSignalRefDomain(domain) {
    if (!util_1.isArray(domain)) {
        return 'signal' in domain;
    }
    return false;
}
exports.isSignalRefDomain = isSignalRefDomain;
var VG_MARK_CONFIG_INDEX = {
    opacity: 1,
    fill: 1,
    fillOpacity: 1,
    stroke: 1,
    strokeWidth: 1,
    strokeOpacity: 1,
    strokeDash: 1,
    strokeDashOffset: 1,
    size: 1,
    shape: 1,
    interpolate: 1,
    tension: 1,
    orient: 1,
    align: 1,
    baseline: 1,
    text: 1,
    limit: 1,
    dx: 1,
    dy: 1,
    radius: 1,
    theta: 1,
    angle: 1,
    font: 1,
    fontSize: 1,
    fontWeight: 1,
    fontStyle: 1
    // commented below are vg channel that do not have mark config.
    // 'x'|'x2'|'xc'|'width'|'y'|'y2'|'yc'|'height'
    // cursor: 1,
    // clip: 1,
    // dir: 1,
    // ellipsis: 1,
    // endAngle: 1,
    // path: 1,
    // innerRadius: 1,
    // outerRadius: 1,
    // startAngle: 1,
    // url: 1,
};
exports.VG_MARK_CONFIGS = util_1.flagKeys(VG_MARK_CONFIG_INDEX);

},{"./util":118}]},{},[103])(103)
});
//# sourceMappingURL=vega-lite.js.map
