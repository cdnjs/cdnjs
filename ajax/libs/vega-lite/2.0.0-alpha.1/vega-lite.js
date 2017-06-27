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
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.vega = global.vega || {})));
}(this, (function (exports) { 'use strict';

var accessor = function(fn, fields, name) {
  return (
    fn.fields = fields || [],
    fn.fname = name,
    fn
  );
}

function accessorName(fn) {
  return fn == null ? null : fn.fname;
}

function accessorFields(fn) {
  return fn == null ? null : fn.fields;
}

var error = function(message) {
  throw Error(message);
}

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
    if (c === '\\') s += p.substring(i, j), i = ++j;
    else if (c === q) push(), q = null, b = -1;
    else if (q) continue;
    else if (i === b && c === '"') i = j + 1, q = c;
    else if (i === b && c === "'") i = j + 1, q = c;
    else if (c === '.' && !b) (j > i) ? push() : (i = j + 1);
    else if (c === '[') {
      if (j > i) push();
      b = i = j + 1;
    }
    else if (c === ']') {
      if (!b) error('Access path missing open bracket: ' + p);
      if (b > 0) push();
      b = 0;
      i = j + 1;
    }
  }

  if (b) error('Access path missing closing bracket: ' + p);
  if (q) error('Access path missing closing quote: ' + p);
  if (j > i) ++j, push();
  return path;
}

var isArray = Array.isArray;

var isObject = function(_) {
  return _ === Object(_);
}

var isString = function(_) {
  return typeof _ === 'string';
}

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
}

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
var Warn  = 1;
var Info  = 2;
var Debug = 3;

var logger = function(_) {
  var level = _ || None;
  return {
    level: function(_) {
      return arguments.length ? (level = +_, this) : level;
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
}

var array = function(_) {
  return _ != null ? (isArray(_) ? _ : [_]) : [];
}

var compare = function(fields, orders) {
  if (fields == null) return null;
  fields = array(fields);

  var cmp = fields.map(function(f) {
        return splitAccessPath(f).map($).join('][');
      }),
      ord = array(orders),
      n = cmp.length - 1,
      code = 'var u,v;return ', i, f, u, v, d, lt, gt;

  for (i=0; i<=n; ++i) {
    f = cmp[i];
    u = '(u=a['+f+'])';
    v = '(v=b['+f+'])';
    d = '((v=v instanceof Date?+v:v),(u=u instanceof Date?+u:u))';
    lt = ord[i] !== 'descending' ? (gt=1, -1) : (gt=-1, 1);
    code += '(' + u+'<'+v+'||u==null)&&v!=null?' + lt
      + ':(u>v||v==null)&&u!=null?' + gt
      + ':'+d+'!==u&&v===v?' + lt
      + ':v!==v&&u===u?' + gt
      + (i < n ? ':' : ':0');
  }
  return accessor(Function('a', 'b', code + ';'), fields);
}

var isFunction = function(_) {
  return typeof _ === 'function';
}

var constant = function(_) {
  return isFunction(_) ? _ : function() { return _; };
}

var extend = function(_) {
  for (var x, k, i=1, len=arguments.length; i<len; ++i) {
    x = arguments[i];
    for (k in x) { _[k] = x[k]; }
  }
  return _;
}

var extentIndex = function(array, f) {
  var i = -1,
      n = array.length,
      a, b, c, u, v;

  if (f == null) {
    while (++i < n) if ((b = array[i]) != null && b >= b) { a = c = b; break; }
    u = v = i;
    while (++i < n) if ((b = array[i]) != null) {
      if (a > b) a = b, u = i;
      if (c < b) c = b, v = i;
    }
  } else {
    while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = c = b; break; }
    u = v = i;
    while (++i < n) if ((b = f(array[i], i, array)) != null) {
      if (a > b) a = b, u = i;
      if (c < b) c = b, v = i;
    }
  }

  return [u, v];
}

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
      return arguments.length ? (test = _, map) : test;
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
}

var inherits = function(child, parent) {
  var proto = (child.prototype = Object.create(parent.prototype));
  proto.constructor = child;
  return proto;
}

var isNumber = function(_) {
  return typeof _ === 'number';
}

var key = function(fields) {
  fields = fields ? array(fields) : fields;
  var fn = !(fields && fields.length)
    ? function() { return ''; }
    : Function('_', 'return \'\'+' +
        fields.map(function(f) {
          return '_[' + splitAccessPath(f).map($).join('][') + ']';
        }).join('+\'|\'+') + ';');
  return accessor(fn, fields, 'key');
}

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
}

var repeat = function(str, reps) {
  var s = '';
  while (--reps >= 0) s += str;
  return s;
}

var pad = function(str, length, padchar, align) {
  var c = padchar || ' ',
      s = str + '',
      n = length - s.length;

  return n <= 0 ? s
    : align === 'left' ? repeat(c, n) + s
    : align === 'center' ? repeat(c, ~~(n/2)) + s + repeat(c, Math.ceil(n/2))
    : s + repeat(c, n);
}

var peek = function(array) {
  return array[array.length - 1];
}

var toSet = function(_) {
  for (var s={}, i=0, n=_.length; i<n; ++i) s[_[i]] = 1;
  return s;
}

var truncate = function(str, length, align, ellipsis) {
  var e = ellipsis != null ? ellipsis : '\u2026',
      s = str + '',
      n = s.length,
      l = Math.max(0, length - e.length);

  return n <= length ? s
    : align === 'left' ? e + s.slice(n - l)
    : align === 'center' ? s.slice(0, Math.ceil(l/2)) + e + s.slice(n - ~~(l/2))
    : s.slice(0, l) + e;
}

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
}

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
exports.Warn = Warn;
exports.Info = Info;
exports.Debug = Debug;
exports.array = array;
exports.compare = compare;
exports.constant = constant;
exports.error = error;
exports.extend = extend;
exports.extentIndex = extentIndex;
exports.fastmap = fastmap;
exports.field = field;
exports.inherits = inherits;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isString = isString;
exports.key = key;
exports.merge = merge;
exports.pad = pad;
exports.peek = peek;
exports.repeat = repeat;
exports.splitAccessPath = splitAccessPath;
exports.stringValue = $;
exports.toSet = toSet;
exports.truncate = truncate;
exports.visitArray = visitArray;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],6:[function(require,module,exports){
module.exports={
  "name": "vega-lite",
  "author": "Jeffrey Heer, Dominik Moritz, Kanit \"Ham\" Wongsuphasawat",
  "version": "2.0.0-alpha.1",
  "collaborators": [
    "Kanit Wongsuphasawat <kanitw@gmail.com> (http://kanitw.yellowpigz.com)",
    "Dominik Moritz <domoritz@cs.washington.edu> (https://www.domoritz.de)",
    "Jeffrey Heer <jheer@uw.edu> (http://jheer.org)"
  ],
  "homepage": "https://vega.github.io/vega-lite/",
  "description": "Vega-lite provides a higher-level grammar for visual analysis, comparable to ggplot or Tableau, that generates complete Vega specifications.",
  "main": "src/vl.js",
  "types": "src/vl.d.ts",
  "bin": {
    "vl2png": "./bin/vl2png",
    "vl2svg": "./bin/vl2svg",
    "vl2vg": "./bin/vl2vg"
  },
  "directories": {
    "test": "test"
  },
  "scripts": {
    "build": "browserify src/vl.ts -p tsify -d -s vl | exorcist vega-lite.js.map > vega-lite.js ",
    "postbuild": "uglifyjs vega-lite.js -cm --in-source-map vega-lite.js.map --source-map vega-lite.min.js.map > vega-lite.min.js && npm run schema",
    "build:all": "npm run clean && npm run build && npm run test:noschema && npm run build:images",
    "build:images": "npm run data && scripts/generate-images.sh",
    "build:toc": "bundle exec jekyll build --incremental -q && scripts/generate-toc",
    "build:test-gallery": "browserify test-gallery/main.ts -p [tsify -p test-gallery] -d > test-gallery/main.js",
    "clean": "rm -f vega-lite.* & find -E src test site -regex '.*\\.(js|js.map|d.ts)' -delete & rm -rf examples/_diff examples/_original examples/_output examples/images && rm -rf data",
    "data": "rsync -r node_modules/vega-datasets/data/* data",
    "deploy": "scripts/deploy.sh",
    "deploy:gh": "scripts/deploy-gh.sh",
    "deploy:schema": "scripts/deploy-schema.sh",
    "lint": "tslint -c tslint.json 'src/**/*.ts' 'test/**/*.ts' --exclude '**/*.d.ts'",
    "prestart": "npm run data && scripts/index-examples",
    "start": "nodemon -x 'npm run build:test-gallery' & browser-sync start --server --files 'test-gallery/main.js' --index 'test-gallery/index.html'",
    "poststart": "rm examples/all-examples.json",
    "schema": "typescript-json-schema --required true --noExtraProps true src/spec.ts ExtendedSpec > vega-lite-schema.json",
    "presite": "tsc && npm run build && bower install && npm run data && npm run build:toc",
    "site": "bundle exec jekyll serve --incremental",
    "pretest": "tsc && npm run data",
    "test": "nyc --reporter=html --reporter=text-summary mocha",
    "posttest": "npm run lint && npm run test:examples",
    "test:examples": "npm run schema && mocha examples",
    "test:noschema": "npm run pretest && nyc --reporter=html --reporter=text-summary mocha && npm run lint && mocha examples",
    "codecov": "nyc report --reporter=json && codecov -f coverage/*.json",
    "test:debug": "npm run schema && mocha --debug-brk test examples",
    "watch:build": "watchify src/vl.ts -p tsify -v -d -s vl -o 'exorcist vega-lite.js.map > vega-lite.js'",
    "watch:test": "nodemon -x 'npm test'",
    "watch": "nodemon -x 'npm run build && npm run test:noschema' # already run schema in build",
    "x-compile": "./scripts/examples-compile.sh",
    "x-diff": "./scripts/examples-diff.sh"
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
    "@types/chai": "^3.4.34",
    "@types/d3": "^4.4.1",
    "@types/json-stable-stringify": "^1.0.29",
    "@types/mocha": "^2.2.38",
    "@types/node": "^7.0.4",
    "ajv": "5.0.1-beta.1",
    "browser-sync": "~2.18.6",
    "browserify": "~14.0.0",
    "chai": "~3.5.0",
    "cheerio": "~0.22.0",
    "codecov": "~1.0.1",
    "d3": "^4.4.4",
    "exorcist": "~0.4.0",
    "mocha": "~3.2.0",
    "nodemon": "~1.11.0",
    "nyc": "~10.1.2",
    "source-map-support": "~0.4.10",
    "tsify": "~3.0.0",
    "tslint": "~4.4.2",
    "typescript": "^2.1.5",
    "typescript-json-schema": "^0.6.0",
    "uglify-js": "~2.7.5",
    "vega": "3.0.0-beta.19",
    "vega-datasets": "vega/vega-datasets#gh-pages",
    "watchify": "~3.9.0",
    "yaml-front-matter": "~3.4.0"
  },
  "dependencies": {
    "json-stable-stringify": "~1.0.1",
    "vega-util": "~1.1.3",
    "yargs": "~6.6.0"
  }
}

},{}],7:[function(require,module,exports){
"use strict";
var AggregateOp;
(function (AggregateOp) {
    AggregateOp.VALUES = 'values';
    AggregateOp.COUNT = 'count';
    AggregateOp.VALID = 'valid';
    AggregateOp.MISSING = 'missing';
    AggregateOp.DISTINCT = 'distinct';
    AggregateOp.SUM = 'sum';
    AggregateOp.MEAN = 'mean';
    AggregateOp.AVERAGE = 'average';
    AggregateOp.VARIANCE = 'variance';
    AggregateOp.VARIANCEP = 'variancep';
    AggregateOp.STDEV = 'stdev';
    AggregateOp.STDEVP = 'stdevp';
    AggregateOp.MEDIAN = 'median';
    AggregateOp.Q1 = 'q1';
    AggregateOp.Q3 = 'q3';
    AggregateOp.MODESKEW = 'modeskew';
    AggregateOp.MIN = 'min';
    AggregateOp.MAX = 'max';
    AggregateOp.ARGMIN = 'argmin';
    AggregateOp.ARGMAX = 'argmax';
    ;
})(AggregateOp = exports.AggregateOp || (exports.AggregateOp = {}));
exports.AGGREGATE_OPS = [
    AggregateOp.VALUES,
    AggregateOp.COUNT,
    AggregateOp.VALID,
    AggregateOp.MISSING,
    AggregateOp.DISTINCT,
    AggregateOp.SUM,
    AggregateOp.MEAN,
    AggregateOp.AVERAGE,
    AggregateOp.VARIANCE,
    AggregateOp.VARIANCEP,
    AggregateOp.STDEV,
    AggregateOp.STDEVP,
    AggregateOp.MEDIAN,
    AggregateOp.Q1,
    AggregateOp.Q3,
    AggregateOp.MODESKEW,
    AggregateOp.MIN,
    AggregateOp.MAX,
    AggregateOp.ARGMIN,
    AggregateOp.ARGMAX,
];
/** Additive-based aggregation operations.  These can be applied to stack. */
exports.SUM_OPS = [
    AggregateOp.COUNT,
    AggregateOp.SUM,
    AggregateOp.DISTINCT,
    AggregateOp.VALID,
    AggregateOp.MISSING
];
/**
 * Aggregation operators that always produce values within the range [domainMin, domainMax].
 */
exports.SHARED_DOMAIN_OPS = [
    AggregateOp.MEAN,
    AggregateOp.AVERAGE,
    AggregateOp.MEDIAN,
    AggregateOp.Q1,
    AggregateOp.Q3,
    AggregateOp.MIN,
    AggregateOp.MAX,
];

},{}],8:[function(require,module,exports){
"use strict";
var AxisOrient;
(function (AxisOrient) {
    AxisOrient.TOP = 'top';
    AxisOrient.RIGHT = 'right';
    AxisOrient.LEFT = 'left';
    AxisOrient.BOTTOM = 'bottom';
})(AxisOrient = exports.AxisOrient || (exports.AxisOrient = {}));
// TODO: add comment for properties that we rely on Vega's default to produce
// more concise Vega output.
exports.defaultAxisConfig = {
    labelMaxLength: 25,
};
exports.defaultFacetAxisConfig = {
    axisWidth: 0,
    // TODO: remove these
    domain: false,
    grid: false,
    ticks: false
};

},{}],9:[function(require,module,exports){
"use strict";
var channel_1 = require("./channel");
function autoMaxBins(channel) {
    switch (channel) {
        case channel_1.ROW:
        case channel_1.COLUMN:
        case channel_1.SIZE:
        // Facets and Size shouldn't have too many bins
        // We choose 6 like shape to simplify the rule
        case channel_1.SHAPE:
            return 6; // Vega's "shape" has 6 distinct values
        default:
            return 10;
    }
}
exports.autoMaxBins = autoMaxBins;

},{"./channel":10}],10:[function(require,module,exports){
/*
 * Constants and utilities for encoding channels (Visual variables)
 * such as 'x', 'y', 'color'.
 */
"use strict";
var scale_1 = require("./scale");
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
exports.CHANNELS = [exports.X, exports.Y, exports.X2, exports.Y2, exports.ROW, exports.COLUMN, exports.SIZE, exports.SHAPE, exports.COLOR, exports.ORDER, exports.OPACITY, exports.TEXT, exports.DETAIL];
// CHANNELS without COLUMN, ROW
exports.UNIT_CHANNELS = [exports.X, exports.Y, exports.X2, exports.Y2, exports.SIZE, exports.SHAPE, exports.COLOR, exports.ORDER, exports.OPACITY, exports.TEXT, exports.DETAIL];
// UNIT_CHANNELS without X2, Y2, ORDER, DETAIL, TEXT
exports.UNIT_SCALE_CHANNELS = [exports.X, exports.Y, exports.SIZE, exports.SHAPE, exports.COLOR, exports.OPACITY];
// UNIT_SCALE_CHANNELS with ROW, COLUMN
exports.SCALE_CHANNELS = [exports.X, exports.Y, exports.SIZE, exports.SHAPE, exports.COLOR, exports.OPACITY, exports.ROW, exports.COLUMN];
// UNIT_CHANNELS without X, Y, X2, Y2;
exports.NONSPATIAL_CHANNELS = [exports.SIZE, exports.SHAPE, exports.COLOR, exports.ORDER, exports.OPACITY, exports.TEXT, exports.DETAIL];
// UNIT_SCALE_CHANNELS without X, Y;
exports.NONSPATIAL_SCALE_CHANNELS = [exports.SIZE, exports.SHAPE, exports.COLOR, exports.OPACITY];
/** Channels that can serve as groupings for stacked charts. */
exports.STACK_GROUP_CHANNELS = [exports.COLOR, exports.DETAIL, exports.ORDER, exports.OPACITY, exports.SIZE];
;
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
                bar: true, text: true
            };
        case exports.SHAPE:
            return { point: true };
        case exports.TEXT:
            return { text: true };
    }
    return {};
}
exports.getSupportedMark = getSupportedMark;
;
/**
 * Return whether a channel supports dimension / measure role
 * @param  channel
 * @return A dictionary mapping role to boolean values.
 */
function getSupportedRole(channel) {
    switch (channel) {
        case exports.X:
        case exports.Y:
        case exports.COLOR:
        case exports.OPACITY:
        case exports.ORDER:
        case exports.DETAIL:
            return {
                measure: true,
                dimension: true
            };
        case exports.ROW:
        case exports.COLUMN:
        case exports.SHAPE:
            return {
                measure: false,
                dimension: true
            };
        case exports.X2:
        case exports.Y2:
        case exports.SIZE:
        case exports.TEXT:
            return {
                measure: true,
                dimension: false
            };
    }
    throw new Error('Invalid encoding channel ' + channel);
}
exports.getSupportedRole = getSupportedRole;
function hasScale(channel) {
    return !util_1.contains([exports.DETAIL, exports.TEXT, exports.ORDER], channel);
}
exports.hasScale = hasScale;
// Position does not work with ordinal (lookup) scale and sequential (which is only for color)
var POSITION_SCALE_TYPE_INDEX = util_1.toSet(util_1.without(scale_1.SCALE_TYPES, ['ordinal', 'sequential']));
function supportScaleType(channel, scaleType) {
    switch (channel) {
        case 'row':
        case 'column':
            return scaleType === 'band'; // row / column currently supports band only
        case 'x':
        case 'y':
        case 'size': // TODO: size and opacity can support ordinal with more modification
        case 'opacity':
            // Although it generally doesn't make sense to use band with size and opacity,
            // it can also work since we use band: 0.5 to get midpoint.
            return scaleType in POSITION_SCALE_TYPE_INDEX;
        case 'color':
            return scaleType !== 'band'; // band does not make sense with color
        case 'shape':
            return scaleType === 'ordinal'; // shape = lookup only
    }
    /* istanbul ignore next: it should never reach here */
    return false;
}
exports.supportScaleType = supportScaleType;

},{"./scale":65,"./util":72}],11:[function(require,module,exports){
"use strict";
var channel_1 = require("../../channel");
var type_1 = require("../../type");
var util_1 = require("../../util");
var common_1 = require("../common");
// TODO: @yuhanlu -- please change method signature to require only what are really needed
function domain(model, channel, domainPropsSpec, _) {
    var axis = model.axis(channel);
    return util_1.extend(axis.axisColor !== undefined ?
        { stroke: { value: axis.axisColor } } :
        {}, axis.axisWidth !== undefined ?
        { strokeWidth: { value: axis.axisWidth } } :
        {}, domainPropsSpec || {});
}
exports.domain = domain;
// TODO: @yuhanlu -- please change method signature to require only what are really needed
function grid(model, channel, gridPropsSpec, _) {
    var axis = model.axis(channel);
    return util_1.extend(axis.gridColor !== undefined ? { stroke: { value: axis.gridColor } } : {}, axis.gridOpacity !== undefined ? { strokeOpacity: { value: axis.gridOpacity } } : {}, axis.gridWidth !== undefined ? { strokeWidth: { value: axis.gridWidth } } : {}, axis.gridDash !== undefined ? { strokeDashOffset: { value: axis.gridDash } } : {}, gridPropsSpec || {});
}
exports.grid = grid;
// TODO: @yuhanlu -- please change method signature to require only what are really needed
function labels(model, channel, labelsSpec, def) {
    var fieldDef = model.fieldDef(channel);
    var axis = model.axis(channel);
    var config = model.config();
    // Text
    if (util_1.contains([type_1.NOMINAL, type_1.ORDINAL], fieldDef.type) && axis.labelMaxLength) {
        // TODO replace this with Vega's labelMaxLength once it is introduced
        labelsSpec = util_1.extend({
            text: {
                signal: "truncate(datum.value, " + axis.labelMaxLength + ")"
            }
        }, labelsSpec || {});
    }
    else if (fieldDef.type === type_1.TEMPORAL) {
        labelsSpec = util_1.extend({
            text: {
                signal: common_1.timeFormatExpression('datum.value', fieldDef.timeUnit, axis.format, axis.shortTimeLabels, config)
            }
        }, labelsSpec);
    }
    // Label Angle
    if (axis.labelAngle !== undefined) {
        labelsSpec.angle = { value: axis.labelAngle };
    }
    else {
        // auto rotate for X
        if (channel === channel_1.X && (util_1.contains([type_1.NOMINAL, type_1.ORDINAL], fieldDef.type) || !!fieldDef.bin || fieldDef.type === type_1.TEMPORAL)) {
            labelsSpec.angle = { value: 270 };
        }
    }
    if (axis.labelAlign !== undefined) {
        labelsSpec.align = { value: axis.labelAlign };
    }
    else {
        // Auto set align if rotated
        // TODO: consider other value besides 270, 90
        if (labelsSpec.angle) {
            if (labelsSpec.angle.value === 270) {
                labelsSpec.align = {
                    value: def.orient === 'top' ? 'left' :
                        (channel === channel_1.X || channel === channel_1.COLUMN) ? 'right' :
                            'center'
                };
            }
            else if (labelsSpec.angle.value === 90) {
                labelsSpec.align = { value: 'center' };
            }
        }
    }
    if (axis.labelBaseline !== undefined) {
        labelsSpec.baseline = { value: axis.labelBaseline };
    }
    else {
        if (labelsSpec.angle) {
            // Auto set baseline if rotated
            // TODO: consider other value besides 270, 90
            if (labelsSpec.angle.value === 270) {
                labelsSpec.baseline = { value: (channel === channel_1.X || channel === channel_1.COLUMN) ? 'middle' : 'bottom' };
            }
            else if (labelsSpec.angle.value === 90) {
                labelsSpec.baseline = { value: 'bottom' };
            }
        }
    }
    if (axis.tickLabelColor !== undefined) {
        labelsSpec.fill = { value: axis.tickLabelColor };
    }
    if (axis.tickLabelFont !== undefined) {
        labelsSpec.font = { value: axis.tickLabelFont };
    }
    if (axis.tickLabelFontSize !== undefined) {
        labelsSpec.fontSize = { value: axis.tickLabelFontSize };
    }
    return util_1.keys(labelsSpec).length === 0 ? undefined : labelsSpec;
}
exports.labels = labels;
// TODO: @yuhanlu -- please change method signature to require only what are really needed
function ticks(model, channel, ticksPropsSpec, _) {
    var axis = model.axis(channel);
    return util_1.extend(axis.tickColor !== undefined ? { stroke: { value: axis.tickColor } } : {}, axis.tickWidth !== undefined ? { strokeWidth: { value: axis.tickWidth } } : {}, ticksPropsSpec || {});
}
exports.ticks = ticks;
// TODO: @yuhanlu -- please change method signature to require only what are really needed
function title(model, channel, titlePropsSpec, _) {
    var axis = model.axis(channel);
    return util_1.extend(axis.titleColor !== undefined ? { fill: { value: axis.titleColor } } : {}, axis.titleFont !== undefined ? { font: { value: axis.titleFont } } : {}, axis.titleFontSize !== undefined ? { fontSize: { value: axis.titleFontSize } } : {}, axis.titleFontWeight !== undefined ? { fontWeight: { value: axis.titleFontWeight } } : {}, titlePropsSpec || {});
}
exports.title = title;

},{"../../channel":10,"../../type":71,"../../util":72,"../common":14}],12:[function(require,module,exports){
"use strict";
var encode = require("./encode");
var rules = require("./rules");
var util_1 = require("../../util");
var AXIS_PARTS = ['domain', 'grid', 'labels', 'ticks', 'title'];
function parseAxisComponent(model, axisChannels) {
    return axisChannels.reduce(function (axis, channel) {
        var vgAxes = [];
        if (model.axis(channel)) {
            var main = parseMainAxis(channel, model);
            if (main && isVisibleAxis(main)) {
                vgAxes.push(main);
            }
            var grid = parseGridAxis(channel, model);
            if (grid && isVisibleAxis(grid)) {
                vgAxes.push(grid);
            }
            if (vgAxes.length > 0) {
                axis[channel] = vgAxes;
            }
        }
        return axis;
    }, {});
}
exports.parseAxisComponent = parseAxisComponent;
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
    // FIXME this method can be wrong if users use a Vega theme.
    // (Not sure how to correctly handle that yet.).
    if (part === 'grid' || part === 'title') {
        return !!axis[part];
    }
    // Other parts are enabled by default, so they should not be false or null.
    return !isFalseOrNull(axis[part]);
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
    var vgAxis = {
        scale: model.scaleName(channel)
    };
    // 1.2. Add properties
    [
        // a) properties with special rules (so it has axis[property] methods) -- call rule functions
        'domain', 'format', 'labels', 'grid', 'gridScale', 'orient', 'ticks', 'tickSize', 'tickCount', 'title', 'values', 'zindex',
        // b) properties without rules, only produce default values in the schema, or explicit value if specified
        'offset', 'subdivide', 'tickPadding', 'tickSize', 'tickSizeEnd', 'tickSizeMajor', 'tickSizeMinor', 'titleOffset'
    ].forEach(function (property) {
        var value = getSpecifiedOrDefaultValue(property, axis, channel, model, isGridAxis);
        if (value !== undefined) {
            vgAxis[property] = value;
        }
    });
    // 2) Add guide encode definition groups
    var encodeSpec = axis.encode || {};
    AXIS_PARTS.forEach(function (part) {
        if (!hasAxisPart(vgAxis, part)) {
            // No need to create encode for a disabled part.
            return;
        }
        // TODO(@yuhanlu): instead of calling encode[part], break this line based on part type
        // as different require different parameters.
        var value = encode[part](model, channel, encodeSpec.labels || {}, vgAxis);
        if (value !== undefined && util_1.keys(value).length > 0) {
            vgAxis.encode = vgAxis.encode || {};
            vgAxis.encode[part] = { update: value };
        }
    });
    return vgAxis;
}
function getSpecifiedOrDefaultValue(property, specifiedAxis, channel, model, isGridAxis) {
    var fieldDef = model.fieldDef(channel);
    var config = model.config();
    switch (property) {
        case 'domain':
        case 'labels':
        case 'ticks':
            return isGridAxis ? false : specifiedAxis[property];
        case 'format':
            return rules.format(specifiedAxis, channel, fieldDef, config);
        case 'grid':
            return rules.grid(model, channel, isGridAxis); // FIXME: refactor this
        case 'gridScale':
            return rules.gridScale(model, channel, isGridAxis);
        case 'orient':
            return rules.orient(specifiedAxis, channel);
        case 'tickCount':
            return rules.tickCount(specifiedAxis, channel, fieldDef); // TODO: scaleType
        case 'title':
            return rules.title(specifiedAxis, fieldDef, config, isGridAxis);
        case 'values':
            return rules.values(specifiedAxis);
        case 'zindex':
            return rules.zindex(specifiedAxis, isGridAxis);
    }
    // Otherwise, return specified property.
    return specifiedAxis[property];
}

},{"../../util":72,"./encode":11,"./rules":13}],13:[function(require,module,exports){
"use strict";
var log = require("../../log");
var axis_1 = require("../../axis");
var channel_1 = require("../../channel");
var datetime_1 = require("../../datetime");
var fielddef_1 = require("../../fielddef");
var util_1 = require("../../util");
var common_1 = require("../common");
function format(specifiedAxis, channel, fieldDef, config) {
    return common_1.numberFormat(fieldDef, specifiedAxis.format, config, channel);
}
exports.format = format;
// TODO: we need to refactor this method after we take care of config refactoring
/**
 * Default rules for whether to show a grid should be shown for a channel.
 * If `grid` is unspecified, the default value is `true` for ordinal scales that are not binned
 */
function gridShow(model, channel) {
    var grid = model.axis(channel).grid;
    if (grid !== undefined) {
        return grid;
    }
    return !model.hasDiscreteScale(channel) && !model.fieldDef(channel).bin;
}
exports.gridShow = gridShow;
function grid(model, channel, isGridAxis) {
    if (channel === channel_1.ROW || channel === channel_1.COLUMN) {
        // never apply grid for ROW and COLUMN since we manually create rule-group for them
        return undefined;
    }
    if (!isGridAxis) {
        return undefined;
    }
    return gridShow(model, channel);
}
exports.grid = grid;
function gridScale(model, channel, isGridAxis) {
    if (isGridAxis) {
        var gridChannel = channel === 'x' ? 'y' : 'x';
        if (model.scale(gridChannel)) {
            return model.scaleName(gridChannel);
        }
    }
    return undefined;
}
exports.gridScale = gridScale;
function orient(specifiedAxis, channel) {
    var orient = specifiedAxis.orient;
    if (orient) {
        return orient;
    }
    switch (channel) {
        case channel_1.COLUMN:
            // FIXME test and decide
            return axis_1.AxisOrient.TOP;
        case channel_1.X:
            return axis_1.AxisOrient.BOTTOM;
        case channel_1.ROW:
        case channel_1.Y:
            return axis_1.AxisOrient.LEFT;
    }
    /* istanbul ignore next: This should never happen. */
    throw new Error(log.message.INVALID_CHANNEL_FOR_AXIS);
}
exports.orient = orient;
function tickCount(specifiedAxis, channel, fieldDef) {
    var count = specifiedAxis.tickCount;
    if (count !== undefined) {
        return count;
    }
    // FIXME depends on scale type too
    if (channel === channel_1.X && !fieldDef.bin) {
        // Vega's default tickCount often lead to a lot of label occlusion on X without 90 degree rotation
        return 5;
    }
    return undefined;
}
exports.tickCount = tickCount;
function title(specifiedAxis, fieldDef, config, isGridAxis) {
    if (isGridAxis) {
        return undefined;
    }
    if (specifiedAxis.title !== undefined) {
        return specifiedAxis.title;
    }
    // if not defined, automatically determine axis title from field def
    var fieldTitle = fielddef_1.title(fieldDef, config);
    var maxLength = specifiedAxis.titleMaxLength;
    return maxLength ? util_1.truncate(fieldTitle, maxLength) : fieldTitle;
}
exports.title = title;
function values(specifiedAxis) {
    var vals = specifiedAxis.values;
    if (specifiedAxis.values && datetime_1.isDateTime(vals[0])) {
        return vals.map(function (dt) {
            // normalize = true as end user won't put 0 = January
            return datetime_1.timestamp(dt, true);
        });
    }
    return vals;
}
exports.values = values;
function zindex(specifiedAxis, isGridAxis) {
    var z = specifiedAxis.zindex;
    if (z !== undefined) {
        return z;
    }
    if (isGridAxis) {
        // if grid is true, need to put layer on the back so that grid is behind marks
        return 0;
    }
    return 1; // otherwise return undefined and use Vega's default.
}
exports.zindex = zindex;
;

},{"../../axis":8,"../../channel":10,"../../datetime":57,"../../fielddef":60,"../../log":63,"../../util":72,"../common":14}],14:[function(require,module,exports){
"use strict";
var log = require("../log");
var aggregate_1 = require("../aggregate");
var channel_1 = require("../channel");
var fielddef_1 = require("../fielddef");
var type_1 = require("../type");
var util_1 = require("../util");
var facet_1 = require("./facet");
var layer_1 = require("./layer");
var timeunit_1 = require("../timeunit");
var unit_1 = require("./unit");
var spec_1 = require("../spec");
function buildModel(spec, parent, parentGivenName) {
    if (spec_1.isSomeFacetSpec(spec)) {
        return new facet_1.FacetModel(spec, parent, parentGivenName);
    }
    if (spec_1.isLayerSpec(spec)) {
        return new layer_1.LayerModel(spec, parent, parentGivenName);
    }
    if (spec_1.isUnitSpec(spec)) {
        return new unit_1.UnitModel(spec, parent, parentGivenName);
    }
    throw new Error(log.message.INVALID_SPEC);
}
exports.buildModel = buildModel;
function applyConfig(e, config, // TODO(#1842): consolidate MarkConfig | TextConfig?
    propsList) {
    propsList.forEach(function (property) {
        var value = config[property];
        if (value !== undefined) {
            e[property] = { value: value };
        }
    });
    return e;
}
exports.applyConfig = applyConfig;
function applyMarkConfig(e, model, propsList) {
    return applyConfig(e, model.config().mark, propsList);
}
exports.applyMarkConfig = applyMarkConfig;
/**
 * Returns number format for a fieldDef
 *
 * @param format explicitly specified format
 */
function numberFormat(fieldDef, format, config, channel) {
    if (fieldDef.type === type_1.QUANTITATIVE && !fieldDef.bin) {
        // add number format for quantitative type only
        if (format) {
            return format;
        }
        else if (fieldDef.aggregate === aggregate_1.AggregateOp.COUNT && channel === channel_1.TEXT) {
            // FIXME: need a more holistic way to deal with this.
            return 'd';
        }
        // TODO: need to make this work correctly for numeric ordinal / nominal type
        return config.numberFormat;
    }
    return undefined;
}
exports.numberFormat = numberFormat;
/**
 * Returns the time expression used for axis/legend labels or text mark for a temporal field
 */
function timeFormatExpression(field, timeUnit, format, shortTimeLabels, config) {
    if (!timeUnit || format) {
        // If there is not time unit, or if user explicitly specify format for axis/legend/text.
        var _format = format || config.timeFormat; // only use config.timeFormat if there is no timeUnit.
        return "timeFormat(" + field + ", '" + _format + "')";
    }
    else {
        return timeunit_1.formatExpression(timeUnit, field, shortTimeLabels);
    }
}
exports.timeFormatExpression = timeFormatExpression;
/**
 * Return Vega sort parameters (tuple of field and order).
 */
function sortParams(orderDef) {
    return (util_1.isArray(orderDef) ? orderDef : [orderDef]).reduce(function (s, orderChannelDef) {
        s.field.push(fielddef_1.field(orderChannelDef, { binSuffix: 'start' }));
        s.order.push(orderChannelDef.sort || 'ascending');
        return s;
    }, { field: [], order: [] });
}
exports.sortParams = sortParams;

},{"../aggregate":7,"../channel":10,"../fielddef":60,"../log":63,"../spec":67,"../timeunit":69,"../type":71,"../util":72,"./facet":29,"./layer":30,"./unit":54}],15:[function(require,module,exports){
/**
 * Module for compiling Vega-lite spec into Vega spec.
 */
"use strict";
var data_1 = require("../data");
var log = require("../log");
var spec_1 = require("../spec");
var util_1 = require("../util");
var common_1 = require("./common");
function compile(inputSpec, logger) {
    if (logger) {
        // set the singleton logger to the provided logger
        log.set(logger);
    }
    try {
        // 1. Convert input spec into a normal form
        // (Decompose all extended unit specs into composition of unit spec.)
        var spec = spec_1.normalize(inputSpec);
        // 2. Instantiate the model with default properties
        var model = common_1.buildModel(spec, null, '');
        // 3. Parse each part of the model to produce components that will be assembled later
        // We traverse the whole tree to parse once for each type of components
        // (e.g., data, layout, mark, scale).
        // Please see inside model.parse() for order for compilation.
        model.parse();
        // 4. Assemble a Vega Spec from the parsed components in 3.
        return assemble(model);
    }
    finally {
        // Reset the singleton logger if a logger is provided
        if (logger) {
            log.reset();
        }
    }
}
exports.compile = compile;
function assemble(model) {
    // TODO: change type to become VgSpec
    var output = util_1.extend({
        $schema: 'http://vega.github.io/schema/vega/v3.0.json',
    }, topLevelBasicProperties(model), {
        // Map calculated layout width and height to width and height signals.
        signals: [
            {
                name: 'width',
                update: "data('layout')[0].width"
            },
            {
                name: 'height',
                update: "data('layout')[0].height"
            }
        ] // TODO: concat.(model.assembleTopLevelSignals())
    }, {
        data: [].concat(model.assembleData([]), model.assembleLayout([])),
        marks: [assembleRootGroup(model)]
    });
    return {
        spec: output
    };
}
function topLevelBasicProperties(model) {
    var config = model.config();
    return util_1.extend(
    // TODO: Add other top-level basic properties (#1778)
    { padding: model.padding() || config.padding }, { autosize: 'pad' }, config.viewport ? { viewport: config.viewport } : {}, config.background ? { background: config.background } : {});
}
exports.topLevelBasicProperties = topLevelBasicProperties;
function assembleRootGroup(model) {
    var rootGroup = util_1.extend({
        name: model.name('main'),
        type: 'group',
    }, model.description() ? { description: model.description() } : {}, {
        from: { data: model.name(data_1.LAYOUT + '') },
        encode: {
            update: util_1.extend({
                width: { field: model.name('width') },
                height: { field: model.name('height') }
            }, model.assembleParentGroupProperties(model.config().cell))
        }
    });
    return util_1.extend(rootGroup, model.assembleGroup());
}
exports.assembleRootGroup = assembleRootGroup;

},{"../data":56,"../log":63,"../spec":67,"../util":72,"./common":14}],16:[function(require,module,exports){
"use strict";
var log = require("../log");
var channel_1 = require("../channel");
var encoding_1 = require("../encoding");
var fielddef_1 = require("../fielddef");
var mark_1 = require("../mark");
var scale_1 = require("../scale");
var type_1 = require("../type");
var util_1 = require("../util");
/**
 * Augment config.mark with rule-based default values.
 */
function initMarkConfig(mark, encoding, scale, stacked, config) {
    // override mark config with mark specific config
    var markConfig = util_1.extend({}, config.mark, config[mark]);
    if (markConfig.filled === undefined) {
        markConfig.filled = mark !== mark_1.POINT && mark !== mark_1.LINE && mark !== mark_1.RULE;
    }
    if (markConfig.opacity === undefined) {
        var o = opacity(mark, encoding, stacked);
        if (o) {
            markConfig.opacity = o;
        }
    }
    // For orient, users can only specify for ambiguous cases.
    markConfig.orient = orient(mark, encoding, scale, config.mark);
    if (config.mark.orient !== undefined && markConfig.orient !== config.mark.orient) {
        log.warn(log.message.orientOverridden(config.mark.orient, markConfig.orient));
    }
    return markConfig;
}
exports.initMarkConfig = initMarkConfig;
function initTextConfig(encoding, config) {
    var textConfig = util_1.extend({}, config.text);
    if (textConfig.align === undefined) {
        textConfig.align = encoding_1.channelHasField(encoding, channel_1.X) ? 'center' : 'right';
    }
    return textConfig;
}
exports.initTextConfig = initTextConfig;
function opacity(mark, encoding, stacked) {
    if (util_1.contains([mark_1.POINT, mark_1.TICK, mark_1.CIRCLE, mark_1.SQUARE], mark)) {
        // point-based marks
        if (!encoding_1.isAggregate(encoding) || encoding_1.channelHasField(encoding, channel_1.DETAIL)) {
            return 0.7;
        }
    }
    if (mark === mark_1.BAR && !stacked) {
        if (encoding_1.channelHasField(encoding, channel_1.COLOR) || encoding_1.channelHasField(encoding, channel_1.DETAIL) || encoding_1.channelHasField(encoding, channel_1.SIZE)) {
            return 0.7;
        }
    }
    if (mark === mark_1.AREA) {
        return 0.7; // inspired by Tableau
    }
    return undefined;
}
exports.opacity = opacity;
function orient(mark, encoding, scale, markConfig) {
    if (markConfig === void 0) { markConfig = {}; }
    switch (mark) {
        case mark_1.POINT:
        case mark_1.CIRCLE:
        case mark_1.SQUARE:
        case mark_1.TEXT:
        case mark_1.RECT:
            // orient is meaningless for these marks.
            return undefined;
    }
    var yIsRange = encoding.y && encoding.y2;
    var xIsRange = encoding.x && encoding.x2;
    switch (mark) {
        case mark_1.TICK:
            var xScaleType = scale['x'] ? scale['x'].type : null;
            var yScaleType = scale['y'] ? scale['y'].type : null;
            // Tick is opposite to bar, line, area and never have ranged mark.
            if (!scale_1.hasDiscreteDomain(xScaleType) && (!encoding.y ||
                scale_1.hasDiscreteDomain(yScaleType) ||
                (fielddef_1.isFieldDef(encoding.y) && encoding.y.bin))) {
                return 'vertical';
            }
            // y:Q or Ambiguous case, return horizontal
            return 'horizontal';
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
        case mark_1.LINE:
            /* tslint:enable */
            var xIsMeasure = fielddef_1.isMeasure(encoding.x) || fielddef_1.isMeasure(encoding.x2);
            var yIsMeasure = fielddef_1.isMeasure(encoding.y) || fielddef_1.isMeasure(encoding.y2);
            if (xIsMeasure && !yIsMeasure) {
                return 'horizontal';
            }
            else if (!xIsMeasure && yIsMeasure) {
                return 'vertical';
            }
            else if (xIsMeasure && yIsMeasure) {
                var xDef = encoding.x;
                var yDef = encoding.y;
                // temporal without timeUnit is considered continuous, but better serves as dimension
                if (xDef.type === type_1.TEMPORAL) {
                    return 'vertical';
                }
                else if (yDef.type === type_1.TEMPORAL) {
                    return 'horizontal';
                }
                if (markConfig.orient) {
                    // When ambiguous, use user specified one.
                    return markConfig.orient;
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
exports.orient = orient;

},{"../channel":10,"../encoding":58,"../fielddef":60,"../log":63,"../mark":64,"../scale":65,"../type":71,"../util":72}],17:[function(require,module,exports){
"use strict";
var bin_1 = require("../../bin");
var fielddef_1 = require("../../fielddef");
var util_1 = require("../../util");
var scale_1 = require("../../scale");
function numberFormatExpr(expr, format) {
    return "format(" + expr + ", '" + format + "')";
}
function parse(model) {
    return model.reduce(function (binComponent, fieldDef, channel) {
        var bin = model.fieldDef(channel).bin;
        if (bin) {
            var binTrans = util_1.extend({
                type: 'bin',
                field: fieldDef.field,
                as: [fielddef_1.field(fieldDef, { binSuffix: 'start' }), fielddef_1.field(fieldDef, { binSuffix: 'end' })]
            }, 
            // if bin is an object, load parameter here!
            typeof bin === 'boolean' ? {} : bin);
            var transform = [];
            if (!binTrans.extent) {
                var extentSignal = model.name(fieldDef.field + '_extent');
                transform.push({
                    type: 'extent',
                    field: fieldDef.field,
                    signal: extentSignal
                });
                binTrans.extent = { signal: extentSignal };
            }
            if (!binTrans.maxbins && !binTrans.step) {
                // if both maxbins and step are not specified, need to automatically determine bin
                binTrans.maxbins = bin_1.autoMaxBins(channel);
            }
            transform.push(binTrans);
            var hasDiscreteDomainOrHasLegend = scale_1.hasDiscreteDomain(model.scale(channel).type) || model.legend(channel);
            if (hasDiscreteDomainOrHasLegend) {
                // read format from axis or legend, if there is no format then use config.numberFormat
                var format = (model.axis(channel) || model.legend(channel) || {}).format ||
                    model.config().numberFormat;
                var startField = fielddef_1.field(fieldDef, { datum: true, binSuffix: 'start' });
                var endField = fielddef_1.field(fieldDef, { datum: true, binSuffix: 'end' });
                transform.push({
                    type: 'formula',
                    as: fielddef_1.field(fieldDef, { binSuffix: 'range' }),
                    expr: numberFormatExpr(startField, format) + " + ' - ' + " + numberFormatExpr(endField, format)
                });
            }
            // FIXME: current merging logic can produce redundant transforms when a field is binned for color and for non-color
            var key = util_1.hash(bin) + '_' + fieldDef.field + 'oc:' + hasDiscreteDomainOrHasLegend;
            binComponent[key] = transform;
        }
        return binComponent;
    }, {});
}
exports.bin = {
    parseUnit: parse,
    parseFacet: function (model) {
        var binComponent = parse(model);
        var childDataComponent = model.child().component.data;
        // If child doesn't have its own data source, then merge
        if (!childDataComponent.source) {
            // FIXME: current merging logic can produce redundant transforms when a field is binned for color and for non-color
            util_1.extend(binComponent, childDataComponent.bin);
            delete childDataComponent.bin;
        }
        return binComponent;
    },
    parseLayer: function (model) {
        var binComponent = parse(model);
        model.children().forEach(function (child) {
            var childDataComponent = child.component.data;
            // If child doesn't have its own data source, then merge
            if (!childDataComponent.source) {
                util_1.extend(binComponent, childDataComponent.bin);
                delete childDataComponent.bin;
            }
        });
        return binComponent;
    },
    assemble: function (component) {
        return util_1.flatten(util_1.vals(component));
    }
};

},{"../../bin":9,"../../fielddef":60,"../../scale":65,"../../util":72}],18:[function(require,module,exports){
"use strict";
var data_1 = require("../../data");
var source_1 = require("./source");
var formatparse_1 = require("./formatparse");
var nullfilter_1 = require("./nullfilter");
var filter_1 = require("./filter");
var bin_1 = require("./bin");
var formula_1 = require("./formula");
var pathorder_1 = require("./pathorder");
var nonpositivefilter_1 = require("./nonpositivefilter");
var summary_1 = require("./summary");
var stack_1 = require("./stack");
var timeunit_1 = require("./timeunit");
// TODO: split this file into multiple files and remove this linter flag
/* tslint:disable:no-use-before-declare */
function parseUnitData(model) {
    return {
        formatParse: formatparse_1.formatParse.parseUnit(model),
        nullFilter: nullfilter_1.nullFilter.parseUnit(model),
        filter: filter_1.filter.parseUnit(model),
        nonPositiveFilter: nonpositivefilter_1.nonPositiveFilter.parseUnit(model),
        pathOrder: pathorder_1.pathOrder.parseUnit(model),
        source: source_1.source.parseUnit(model),
        bin: bin_1.bin.parseUnit(model),
        calculate: formula_1.formula.parseUnit(model),
        timeUnit: timeunit_1.timeUnit.parseUnit(model),
        summary: summary_1.summary.parseUnit(model),
        stack: stack_1.stack.parseUnit(model)
    };
}
exports.parseUnitData = parseUnitData;
function parseFacetData(model) {
    return {
        formatParse: formatparse_1.formatParse.parseFacet(model),
        nullFilter: nullfilter_1.nullFilter.parseFacet(model),
        filter: filter_1.filter.parseFacet(model),
        nonPositiveFilter: nonpositivefilter_1.nonPositiveFilter.parseFacet(model),
        pathOrder: pathorder_1.pathOrder.parseFacet(model),
        source: source_1.source.parseFacet(model),
        bin: bin_1.bin.parseFacet(model),
        calculate: formula_1.formula.parseFacet(model),
        timeUnit: timeunit_1.timeUnit.parseFacet(model),
        summary: summary_1.summary.parseFacet(model),
        stack: stack_1.stack.parseFacet(model)
    };
}
exports.parseFacetData = parseFacetData;
function parseLayerData(model) {
    return {
        // filter and formatParse could cause us to not be able to merge into parent
        // so let's parse them first
        filter: filter_1.filter.parseLayer(model),
        formatParse: formatparse_1.formatParse.parseLayer(model),
        nullFilter: nullfilter_1.nullFilter.parseLayer(model),
        nonPositiveFilter: nonpositivefilter_1.nonPositiveFilter.parseLayer(model),
        pathOrder: pathorder_1.pathOrder.parseLayer(model),
        // everything after here does not affect whether we can merge child data into parent or not
        source: source_1.source.parseLayer(model),
        bin: bin_1.bin.parseLayer(model),
        calculate: formula_1.formula.parseLayer(model),
        timeUnit: timeunit_1.timeUnit.parseLayer(model),
        summary: summary_1.summary.parseLayer(model),
        stack: stack_1.stack.parseLayer(model)
    };
}
exports.parseLayerData = parseLayerData;
/* tslint:enable:no-use-before-declare */
/**
 * Creates Vega Data array from a given compiled model and append all of them to the given array
 *
 * @param  model
 * @param  data array
 * @return modified data array
 */
function assembleData(model, data) {
    var dataComponent = model.component.data;
    var sourceData = source_1.source.assemble(dataComponent);
    if (sourceData) {
        data.push(sourceData);
    }
    summary_1.summary.assemble(dataComponent.summary || [], model.dataName(data_1.SOURCE)).forEach(function (summaryData) {
        data.push(summaryData);
    });
    // nonPositiveFilter
    var nonPositiveFilterTransform = nonpositivefilter_1.nonPositiveFilter.assemble(dataComponent.nonPositiveFilter);
    if (nonPositiveFilterTransform.length > 0) {
        if (data.length > 0) {
            var dataTable = data[data.length - 1];
            dataTable.transform = (dataTable.transform || []).concat(nonPositiveFilterTransform);
        }
        else {
            throw new Error('Invalid nonPositiveFilter not merged');
        }
    }
    // stack
    var stackData = stack_1.stack.assemble(dataComponent.stack);
    if (stackData) {
        data.push(stackData);
    }
    // Path Order
    var pathOrderCollectTransform = pathorder_1.pathOrder.assemble(dataComponent.pathOrder);
    if (pathOrderCollectTransform) {
        var dataTable = data[data.length - 1];
        if (data.length > 0) {
            dataTable.transform = (dataTable.transform || []).concat([pathOrderCollectTransform]);
        }
        else {
            throw new Error('Invalid path order collect transform not added');
        }
    }
    return data;
}
exports.assembleData = assembleData;

},{"../../data":56,"./bin":17,"./filter":19,"./formatparse":20,"./formula":21,"./nonpositivefilter":22,"./nullfilter":23,"./pathorder":24,"./source":25,"./stack":26,"./summary":27,"./timeunit":28}],19:[function(require,module,exports){
"use strict";
var filter_1 = require("../../filter");
var util_1 = require("../../util");
/**
 * @param v value to be converted into Vega Expression
 * @param timeUnit
 * @return Vega Expression of the value v. This could be one of:
 * - a timestamp value of datetime object
 * - a timestamp value of casted single time unit value
 * - stringified value
 */
function parse(model) {
    var filter = model.filter();
    if (util_1.isArray(filter)) {
        return '(' +
            filter.map(function (f) { return filter_1.expression(f); })
                .filter(function (f) { return f !== undefined; })
                .join(') && (') +
            ')';
    }
    else if (filter) {
        return filter_1.expression(filter);
    }
    return undefined;
}
exports.filter = {
    parseUnit: parse,
    parseFacet: function (model) {
        var filterComponent = parse(model);
        var childDataComponent = model.child().component.data;
        // If child doesn't have its own data source but has filter, then merge
        if (!childDataComponent.source && childDataComponent.filter) {
            // merge by adding &&
            filterComponent =
                (filterComponent ? filterComponent + ' && ' : '') +
                    childDataComponent.filter;
            delete childDataComponent.filter;
        }
        return filterComponent;
    },
    parseLayer: function (model) {
        // Note that this `filter.parseLayer` method is called before `source.parseLayer`
        var filterComponent = parse(model);
        model.children().forEach(function (child) {
            var childDataComponent = child.component.data;
            if (model.compatibleSource(child) && childDataComponent.filter && childDataComponent.filter === filterComponent) {
                // same filter in child so we can just delete it
                delete childDataComponent.filter;
            }
        });
        return filterComponent;
    },
    assemble: function (filterComponent) {
        return filterComponent ? [{
                type: 'filter',
                expr: filterComponent
            }] : [];
    }
};

},{"../../filter":61,"../../util":72}],20:[function(require,module,exports){
"use strict";
var datetime_1 = require("../../datetime");
var data_1 = require("../../data");
var fielddef_1 = require("../../fielddef");
var filter_1 = require("../../filter");
var type_1 = require("../../type");
var util_1 = require("../../util");
function parse(model) {
    var calcFieldMap = (model.calculate() || []).reduce(function (fieldMap, formula) {
        fieldMap[formula.as] = true;
        return fieldMap;
    }, {});
    var parseComponent = {};
    // Parse filter fields
    var filter = model.filter();
    if (!util_1.isArray(filter)) {
        filter = [filter];
    }
    filter.forEach(function (f) {
        var val = null;
        // For EqualFilter, just use the equal property.
        // For RangeFilter and OneOfFilter, all array members should have
        // the same type, so we only use the first one.
        if (filter_1.isEqualFilter(f)) {
            val = f.equal;
        }
        else if (filter_1.isRangeFilter(f)) {
            val = f.range[0];
        }
        else if (filter_1.isOneOfFilter(f)) {
            val = (f.oneOf || f['in'])[0];
        } // else -- for filter expression, we can't infer anything
        if (!!val) {
            if (datetime_1.isDateTime(val)) {
                parseComponent[f['field']] = 'date';
            }
            else if (util_1.isNumber(val)) {
                parseComponent[f['field']] = 'number';
            }
            else if (util_1.isString(val)) {
                parseComponent[f['field']] = 'string';
            }
        }
    });
    // Parse encoded fields
    model.forEach(function (fieldDef) {
        if (fieldDef.type === type_1.TEMPORAL) {
            parseComponent[fieldDef.field] = 'date';
        }
        else if (fieldDef.type === type_1.QUANTITATIVE) {
            if (fielddef_1.isCount(fieldDef) || calcFieldMap[fieldDef.field]) {
                return;
            }
            parseComponent[fieldDef.field] = 'number';
        }
    });
    // Custom parse should override inferred parse
    var data = model.data();
    if (data && data_1.isUrlData(data) && data.format && data.format.parse) {
        var parse_1 = data.format.parse;
        util_1.keys(parse_1).forEach(function (field) {
            parseComponent[field] = parse_1[field];
        });
    }
    return parseComponent;
}
exports.formatParse = {
    parseUnit: parse,
    parseFacet: function (model) {
        var parseComponent = parse(model);
        // If child doesn't have its own data source, but has its own parse, then merge
        var childDataComponent = model.child().component.data;
        if (!childDataComponent.source && childDataComponent.formatParse) {
            util_1.extend(parseComponent, childDataComponent.formatParse);
            delete childDataComponent.formatParse;
        }
        return parseComponent;
    },
    parseLayer: function (model) {
        // note that we run this before source.parseLayer
        var parseComponent = parse(model);
        model.children().forEach(function (child) {
            var childDataComponent = child.component.data;
            if (model.compatibleSource(child) && !util_1.differ(childDataComponent.formatParse, parseComponent)) {
                // merge parse up if the child does not have an incompatible parse
                util_1.extend(parseComponent, childDataComponent.formatParse);
                delete childDataComponent.formatParse;
            }
        });
        return parseComponent;
    },
    // identity function
    assemble: function (x) { return x; }
};

},{"../../data":56,"../../datetime":57,"../../fielddef":60,"../../filter":61,"../../type":71,"../../util":72}],21:[function(require,module,exports){
"use strict";
var util_1 = require("../../util");
function parse(model) {
    return (model.calculate() || []).reduce(function (formulaComponent, formula) {
        formulaComponent[util_1.hash(formula)] = formula;
        return formulaComponent;
    }, {});
}
exports.formula = {
    parseUnit: parse,
    parseFacet: function (model) {
        var formulaComponent = parse(model);
        var childDataComponent = model.child().component.data;
        // If child doesn't have its own data source, then merge
        if (!childDataComponent.source) {
            util_1.extend(formulaComponent, childDataComponent.calculate);
            delete childDataComponent.calculate;
        }
        return formulaComponent;
    },
    parseLayer: function (model) {
        var formulaComponent = parse(model);
        model.children().forEach(function (child) {
            var childDataComponent = child.component.data;
            if (!childDataComponent.source && childDataComponent.calculate) {
                util_1.extend(formulaComponent || {}, childDataComponent.calculate);
                delete childDataComponent.calculate;
            }
        });
        return formulaComponent;
    },
    assemble: function (component) {
        return util_1.vals(component).reduce(function (transform, f) {
            transform.push(util_1.extend({ type: 'formula' }, f));
            return transform;
        }, []);
    }
};

},{"../../util":72}],22:[function(require,module,exports){
"use strict";
var scale_1 = require("../../scale");
var util_1 = require("../../util");
exports.nonPositiveFilter = {
    parseUnit: function (model) {
        return model.channels().reduce(function (nonPositiveComponent, channel) {
            var scale = model.scale(channel);
            if (!model.field(channel) || !scale) {
                // don't set anything
                return nonPositiveComponent;
            }
            nonPositiveComponent[model.field(channel)] = scale.type === scale_1.ScaleType.LOG;
            return nonPositiveComponent;
        }, {});
    },
    parseFacet: function (model) {
        var childDataComponent = model.child().component.data;
        // If child doesn't have its own data source, then consider merging
        if (!childDataComponent.source) {
            // For now, let's assume it always has union scale
            var nonPositiveFilterComponent = childDataComponent.nonPositiveFilter;
            delete childDataComponent.nonPositiveFilter;
            return nonPositiveFilterComponent;
        }
        return {};
    },
    parseLayer: function (model) {
        // note that we run this before source.parseLayer
        var nonPositiveFilterComponent = {};
        model.children().forEach(function (child) {
            var childDataComponent = child.component.data;
            if (model.compatibleSource(child) && !util_1.differ(childDataComponent.nonPositiveFilter, nonPositiveFilterComponent)) {
                util_1.extend(nonPositiveFilterComponent, childDataComponent.nonPositiveFilter);
                delete childDataComponent.nonPositiveFilter;
            }
        });
        return nonPositiveFilterComponent;
    },
    assemble: function (nonPositiveFilterComponent) {
        if (nonPositiveFilterComponent) {
            return util_1.keys(nonPositiveFilterComponent).filter(function (field) {
                // Only filter fields (keys) with value = true
                return nonPositiveFilterComponent[field];
            }).map(function (field) {
                return {
                    type: 'filter',
                    expr: 'datum["' + field + '"] > 0'
                };
            });
        }
        return [];
    }
};

},{"../../scale":65,"../../util":72}],23:[function(require,module,exports){
"use strict";
var type_1 = require("../../type");
var util_1 = require("../../util");
var DEFAULT_NULL_FILTERS = {
    nominal: false,
    ordinal: false,
    quantitative: true,
    temporal: true
};
/** Return Hashset of fields for null filtering (key=field, value = true). */
function parse(model) {
    var filterInvalid = model.filterInvalid();
    return model.reduce(function (aggregator, fieldDef) {
        if (fieldDef.field !== '*') {
            if (filterInvalid ||
                (filterInvalid === undefined && fieldDef.field && DEFAULT_NULL_FILTERS[fieldDef.type])) {
                aggregator[fieldDef.field] = fieldDef;
            }
            else {
                // define this so we know that we don't filter nulls for this field
                // this makes it easier to merge into parents
                aggregator[fieldDef.field] = null;
            }
        }
        return aggregator;
    }, {});
}
exports.nullFilter = {
    parseUnit: parse,
    parseFacet: function (model) {
        var nullFilterComponent = parse(model);
        var childDataComponent = model.child().component.data;
        // If child doesn't have its own data source, then merge
        if (!childDataComponent.source) {
            util_1.extend(nullFilterComponent, childDataComponent.nullFilter);
            delete childDataComponent.nullFilter;
        }
        return nullFilterComponent;
    },
    parseLayer: function (model) {
        // note that we run this before source.parseLayer
        // FIXME: null filters are not properly propagated right now
        var nullFilterComponent = parse(model);
        model.children().forEach(function (child) {
            var childDataComponent = child.component.data;
            if (model.compatibleSource(child) && !util_1.differ(childDataComponent.nullFilter, nullFilterComponent)) {
                util_1.extend(nullFilterComponent, childDataComponent.nullFilter);
                delete childDataComponent.nullFilter;
            }
        });
        return nullFilterComponent;
    },
    assemble: function (component) {
        var filters = util_1.keys(component).reduce(function (_filters, field) {
            var fieldDef = component[field];
            if (fieldDef !== null) {
                _filters.push('datum["' + fieldDef.field + '"] !== null');
                if (util_1.contains([type_1.QUANTITATIVE, type_1.TEMPORAL], fieldDef.type)) {
                    // TODO(https://github.com/vega/vega-lite/issues/1436):
                    // We can be even smarter and add NaN filter for N,O that are numbers
                    // based on the `parse` property once we have it.
                    _filters.push('!isNaN(datum["' + fieldDef.field + '"])');
                }
            }
            return _filters;
        }, []);
        return filters.length > 0 ?
            [{
                    type: 'filter',
                    expr: filters.join(' && ')
                }] : [];
    }
};

},{"../../type":71,"../../util":72}],24:[function(require,module,exports){
"use strict";
var stringify = require("json-stable-stringify");
var encoding_1 = require("../../encoding");
var fielddef_1 = require("../../fielddef");
var sort_1 = require("../../sort");
var util_1 = require("../../util");
var common_1 = require("../common");
exports.pathOrder = {
    parseUnit: function (model) {
        if (util_1.contains(['line', 'area'], model.mark())) {
            if (model.mark() === 'line' && model.channelHasField('order')) {
                // For only line, sort by the order field if it is specified.
                return common_1.sortParams(model.encoding().order);
            }
            else {
                // For both line and area, we sort values based on dimension by default
                var dimensionChannel = model.config().mark.orient === 'horizontal' ? 'y' : 'x';
                var sort = model.sort(dimensionChannel);
                var sortField = sort_1.isSortField(sort) ?
                    fielddef_1.field({
                        // FIXME: this op might not already exist?
                        // FIXME: what if dimensionChannel (x or y) contains custom domain?
                        aggregate: encoding_1.isAggregate(model.encoding()) ? sort.op : undefined,
                        field: sort.field
                    }) :
                    model.field(dimensionChannel, { binSuffix: 'start' });
                return {
                    field: sortField,
                    order: 'descending'
                };
            }
        }
        return null;
    },
    parseFacet: function (model) {
        var childDataComponent = model.child().component.data;
        // If child doesn't have its own data source, then consider merging
        if (!childDataComponent.source) {
            // For now, let's assume it always has union scale
            var pathOrderComponent = childDataComponent.pathOrder;
            delete childDataComponent.pathOrder;
            return pathOrderComponent;
        }
        return null;
    },
    parseLayer: function (model) {
        // note that we run this before source.parseLayer
        var pathOrderComponent = null;
        var stringifiedPathOrder = null;
        for (var _i = 0, _a = model.children(); _i < _a.length; _i++) {
            var child = _a[_i];
            var childDataComponent = child.component.data;
            if (model.compatibleSource(child) && childDataComponent.pathOrder !== null) {
                if (pathOrderComponent === null) {
                    pathOrderComponent = childDataComponent.pathOrder;
                    stringifiedPathOrder = stringify(pathOrderComponent);
                }
                else if (stringifiedPathOrder !== stringify(childDataComponent.pathOrder)) {
                    pathOrderComponent = null;
                    break;
                }
            }
        }
        if (pathOrderComponent !== null) {
            // If we merge pathOrderComponent, remove them from children.
            for (var _b = 0, _c = model.children(); _b < _c.length; _b++) {
                var child = _c[_b];
                delete child.component.data.pathOrder;
            }
        }
        return pathOrderComponent;
    },
    assemble: function (pathOrderComponent) {
        if (pathOrderComponent) {
            return {
                type: 'collect',
                sort: pathOrderComponent
            };
        }
        return null;
    }
};

},{"../../encoding":58,"../../fielddef":60,"../../sort":66,"../../util":72,"../common":14,"json-stable-stringify":1}],25:[function(require,module,exports){
"use strict";
var data_1 = require("../../data");
var util_1 = require("../../util");
var nullfilter_1 = require("./nullfilter");
var filter_1 = require("./filter");
var bin_1 = require("./bin");
var formula_1 = require("./formula");
var timeunit_1 = require("./timeunit");
var source;
(function (source) {
    function parse(model) {
        var data = model.data();
        if (data) {
            // If data is explicitly provided
            var sourceData = { name: model.dataName(data_1.SOURCE) };
            if (data_1.isInlineData(data)) {
                sourceData.values = data.values;
                sourceData.format = { type: 'json' };
            }
            else if (data_1.isUrlData(data)) {
                sourceData.url = data.url;
                // Extract extension from URL using snippet from
                // http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript
                var defaultExtension = /(?:\.([^.]+))?$/.exec(sourceData.url)[1];
                if (!util_1.contains(['json', 'csv', 'tsv', 'topojson'], defaultExtension)) {
                    defaultExtension = 'json';
                }
                var dataFormat = data.format || {};
                // For backward compatibility for former `data.formatType` property
                var formatType = dataFormat.type || data['formatType'];
                sourceData.format =
                    util_1.extend({ type: formatType ? formatType : defaultExtension }, dataFormat.property ? { property: dataFormat.property } : {}, 
                    // Feature and mesh are two mutually exclusive properties
                    dataFormat.feature ?
                        { feature: dataFormat.feature } :
                        dataFormat.mesh ?
                            { mesh: dataFormat.mesh } :
                            {});
            }
            return sourceData;
        }
        else if (!model.parent()) {
            // If data is not explicitly provided but the model is a root,
            // need to produce a source as well
            return { name: model.dataName(data_1.SOURCE) };
        }
        return undefined;
    }
    source.parseUnit = parse;
    function parseFacet(model) {
        var sourceData = parse(model);
        if (!model.child().component.data.source) {
            // If the child does not have its own source, have to rename its source.
            model.child().renameData(model.child().dataName(data_1.SOURCE), model.dataName(data_1.SOURCE));
        }
        return sourceData;
    }
    source.parseFacet = parseFacet;
    function parseLayer(model) {
        var sourceData = parse(model);
        model.children().forEach(function (child) {
            var childData = child.component.data;
            if (model.compatibleSource(child)) {
                // we cannot merge if the child has filters defined even after we tried to move them up
                var canMerge = !childData.filter && !childData.formatParse && !childData.nullFilter;
                if (canMerge) {
                    // rename source because we can just remove it
                    child.renameData(child.dataName(data_1.SOURCE), model.dataName(data_1.SOURCE));
                    delete childData.source;
                }
                else {
                    // child does not have data defined or the same source so just use the parents source
                    childData.source = {
                        name: child.dataName(data_1.SOURCE),
                        source: model.dataName(data_1.SOURCE)
                    };
                }
            }
        });
        return sourceData;
    }
    source.parseLayer = parseLayer;
    function assemble(component) {
        if (component.source) {
            var sourceData = component.source;
            if (component.formatParse) {
                component.source.format = component.source.format || {};
                component.source.format.parse = component.formatParse;
            }
            sourceData.transform = [].concat(formula_1.formula.assemble(component.calculate), nullfilter_1.nullFilter.assemble(component.nullFilter), filter_1.filter.assemble(component.filter), bin_1.bin.assemble(component.bin), timeunit_1.timeUnit.assemble(component.timeUnit));
            return sourceData;
        }
        return null;
    }
    source.assemble = assemble;
})(source = exports.source || (exports.source = {}));

},{"../../data":56,"../../util":72,"./bin":17,"./filter":19,"./formula":21,"./nullfilter":23,"./timeunit":28}],26:[function(require,module,exports){
"use strict";
var common_1 = require("../common");
var data_1 = require("../../data");
var fielddef_1 = require("../../fielddef");
var scale_1 = require("../../scale");
var util_1 = require("../../util");
function getStackByFields(model) {
    var stackProperties = model.stack();
    return stackProperties.stackBy.reduce(function (fields, by) {
        var channel = by.channel;
        var fieldDef = by.fieldDef;
        var scale = model.scale(channel);
        var _field = fielddef_1.field(fieldDef, {
            binSuffix: scale && scale_1.hasDiscreteDomain(scale.type) ? 'range' : 'start'
        });
        if (!!_field) {
            fields.push(_field);
        }
        return fields;
    }, []);
}
/**
 * Stack data compiler
 */
exports.stack = {
    parseUnit: function (model) {
        var stackProperties = model.stack();
        if (!stackProperties) {
            return undefined;
        }
        var groupby = [];
        if (stackProperties.groupbyChannel) {
            var groupbyFieldDef = model.fieldDef(stackProperties.groupbyChannel);
            if (groupbyFieldDef.bin) {
                // For Bin, we need to add both start and end to ensure that both get imputed
                // and included in the stack output (https://github.com/vega/vega-lite/issues/1805).
                groupby.push(model.field(stackProperties.groupbyChannel, { binSuffix: 'start' }));
                groupby.push(model.field(stackProperties.groupbyChannel, { binSuffix: 'end' }));
            }
            else {
                groupby.push(model.field(stackProperties.groupbyChannel));
            }
        }
        var stackby = getStackByFields(model);
        var orderDef = model.encoding().order;
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
        return {
            name: model.dataName(data_1.STACKED),
            source: model.dataName(data_1.SUMMARY),
            groupby: groupby,
            field: model.field(stackProperties.fieldChannel),
            stackby: stackby,
            sort: sort,
            offset: stackProperties.offset,
            impute: util_1.contains(['area', 'line'], model.mark())
        };
    },
    parseLayer: function (_) {
        // FIXME: merge if identical
        // FIXME: Correctly support facet of layer of stack.
        return undefined;
    },
    parseFacet: function (model) {
        var child = model.child();
        var childDataComponent = child.component.data;
        // FIXME: Correctly support facet of layer of stack.
        if (childDataComponent.stack) {
            var stackComponent = childDataComponent.stack;
            var newName = model.dataName(data_1.STACKED);
            child.renameData(stackComponent.name, newName);
            stackComponent.name = newName;
            // Refer to facet's summary instead (always summary because stacked only works with aggregation)
            stackComponent.source = model.dataName(data_1.SUMMARY);
            // Add faceted field to groupby
            stackComponent.groupby = model.reduce(function (groupby, fieldDef) {
                var facetedField = fielddef_1.field(fieldDef, { binSuffix: 'start' });
                if (!util_1.contains(groupby, facetedField)) {
                    groupby.push(facetedField);
                }
                return groupby;
            }, stackComponent.groupby);
            delete childDataComponent.stack;
            return stackComponent;
        }
        return undefined;
    },
    assemble: function (stackComponent) {
        if (!stackComponent) {
            return undefined;
        }
        var transform = [];
        // Impute
        if (stackComponent.impute) {
            transform.push({
                type: 'impute',
                field: stackComponent.field,
                groupby: stackComponent.stackby,
                orderby: stackComponent.groupby,
                method: 'value',
                value: 0
            });
        }
        // Stack
        transform.push({
            type: 'stack',
            groupby: stackComponent.groupby,
            field: stackComponent.field,
            sort: stackComponent.sort,
            as: [
                stackComponent.field + '_start',
                stackComponent.field + '_end'
            ],
            offset: stackComponent.offset
        });
        return {
            name: stackComponent.name,
            source: stackComponent.source,
            transform: transform
        };
    }
};

},{"../../data":56,"../../fielddef":60,"../../scale":65,"../../util":72,"../common":14}],27:[function(require,module,exports){
"use strict";
var aggregate_1 = require("../../aggregate");
var data_1 = require("../../data");
var fielddef_1 = require("../../fielddef");
var util_1 = require("../../util");
var summary;
(function (summary) {
    function addDimension(dims, fieldDef) {
        if (fieldDef.bin) {
            dims[fielddef_1.field(fieldDef, { binSuffix: 'start' })] = true;
            dims[fielddef_1.field(fieldDef, { binSuffix: 'end' })] = true;
            // const scale = model.scale(channel);
            // if (scaleType(scale, fieldDef, channel, model.mark()) === ScaleType.ORDINAL) {
            // also produce bin_range if the binned field use ordinal scale
            dims[fielddef_1.field(fieldDef, { binSuffix: 'range' })] = true;
        }
        else {
            dims[fielddef_1.field(fieldDef)] = true;
        }
        return dims;
    }
    function parseUnit(model) {
        /* string set for dimensions */
        var dims = {};
        /* dictionary mapping field name => dict set of aggregation functions */
        var meas = {};
        model.forEach(function (fieldDef) {
            if (fieldDef.aggregate) {
                if (fieldDef.aggregate === aggregate_1.AggregateOp.COUNT) {
                    meas['*'] = meas['*'] || {};
                    /* tslint:disable:no-string-literal */
                    meas['*']['count'] = true;
                }
                else {
                    meas[fieldDef.field] = meas[fieldDef.field] || {};
                    meas[fieldDef.field][fieldDef.aggregate] = true;
                }
            }
            else {
                addDimension(dims, fieldDef);
            }
        });
        return [{
                name: model.dataName(data_1.SUMMARY),
                dimensions: dims,
                measures: meas
            }];
    }
    summary.parseUnit = parseUnit;
    function parseFacet(model) {
        var childDataComponent = model.child().component.data;
        // FIXME: this could be incorrect for faceted layer charts.
        // If child doesn't have its own data source but has a summary data source, merge
        if (!childDataComponent.source && childDataComponent.summary) {
            var summaryComponents = childDataComponent.summary.map(function (summaryComponent) {
                // add facet fields as dimensions
                summaryComponent.dimensions = model.reduce(addDimension, summaryComponent.dimensions);
                var summaryNameWithoutPrefix = summaryComponent.name.substr(model.child().name('').length);
                model.child().renameData(summaryComponent.name, summaryNameWithoutPrefix);
                summaryComponent.name = summaryNameWithoutPrefix;
                return summaryComponent;
            });
            delete childDataComponent.summary;
            return summaryComponents;
        }
        return [];
    }
    summary.parseFacet = parseFacet;
    function mergeMeasures(parentMeasures, childMeasures) {
        for (var field_1 in childMeasures) {
            if (childMeasures.hasOwnProperty(field_1)) {
                // when we merge a measure, we either have to add an aggregation operator or even a new field
                var ops = childMeasures[field_1];
                for (var op in ops) {
                    if (ops.hasOwnProperty(op)) {
                        if (field_1 in parentMeasures) {
                            // add operator to existing measure field
                            parentMeasures[field_1][op] = true;
                        }
                        else {
                            parentMeasures[field_1] = { op: true };
                        }
                    }
                }
            }
        }
    }
    function parseLayer(model) {
        // Index by the fields we are grouping by
        var summaries = {};
        // Combine summaries for children that don't have a distinct source
        // (either having its own data source, or its own tranformation of the same data source).
        model.children().forEach(function (child) {
            var childDataComponent = child.component.data;
            if (!childDataComponent.source && childDataComponent.summary) {
                // Merge the summaries if we can
                childDataComponent.summary.forEach(function (childSummary) {
                    // The key is a hash based on the dimensions;
                    // we use it to find out whether we have a summary that uses the same group by fields.
                    var key = util_1.hash(childSummary.dimensions);
                    if (key in summaries) {
                        // yes, there is a summary hat we need to merge into
                        // we know that the dimensions are the same so we only need to merge the measures
                        mergeMeasures(summaries[key].measures, childSummary.measures);
                    }
                    else {
                        // give the summary a new name
                        childSummary.name = model.dataName(data_1.SUMMARY) + '_' + util_1.keys(summaries).length;
                        summaries[key] = childSummary;
                    }
                    // remove summary from child
                    child.renameData(child.dataName(data_1.SUMMARY), summaries[key].name);
                    delete childDataComponent.summary;
                });
            }
        });
        return util_1.vals(summaries);
    }
    summary.parseLayer = parseLayer;
    /**
     * Assemble the summary. Needs a rename function because we cannot guarantee that the
     * parent data before the children data.
     */
    function assemble(component, sourceName) {
        return component.reduce(function (summaryData, summaryComponent) {
            var dims = summaryComponent.dimensions;
            var meas = summaryComponent.measures;
            if (util_1.keys(meas).length > 0) {
                var groupby = util_1.keys(dims);
                var transform = util_1.reduce(meas, function (t, fnDictSet, field) {
                    var ops = util_1.keys(fnDictSet);
                    for (var _i = 0, ops_1 = ops; _i < ops_1.length; _i++) {
                        var op = ops_1[_i];
                        t.fields.push(field);
                        t.ops.push(op);
                    }
                    return t;
                }, {
                    type: 'aggregate',
                    groupby: groupby,
                    fields: [],
                    ops: []
                });
                summaryData.push({
                    name: summaryComponent.name,
                    source: sourceName,
                    transform: [transform]
                });
            }
            return summaryData;
        }, []);
    }
    summary.assemble = assemble;
})(summary = exports.summary || (exports.summary = {}));

},{"../../aggregate":7,"../../data":56,"../../fielddef":60,"../../util":72}],28:[function(require,module,exports){
"use strict";
var fielddef_1 = require("../../fielddef");
var timeunit_1 = require("../../timeunit");
var type_1 = require("../../type");
var util_1 = require("../../util");
function parse(model) {
    return model.reduce(function (timeUnitComponent, fieldDef) {
        if (fieldDef.type === type_1.TEMPORAL && fieldDef.timeUnit) {
            var hash = fielddef_1.field(fieldDef);
            timeUnitComponent[hash] = {
                type: 'formula',
                as: fielddef_1.field(fieldDef),
                expr: timeunit_1.fieldExpr(fieldDef.timeUnit, fieldDef.field)
            };
        }
        return timeUnitComponent;
    }, {});
}
exports.timeUnit = {
    parseUnit: parse,
    parseFacet: function (model) {
        var timeUnitComponent = parse(model);
        var childDataComponent = model.child().component.data;
        // If child doesn't have its own data source, then merge
        if (!childDataComponent.source) {
            util_1.extend(timeUnitComponent, childDataComponent.timeUnit);
            delete childDataComponent.timeUnit;
        }
        return timeUnitComponent;
    },
    parseLayer: function (model) {
        var timeUnitComponent = parse(model);
        model.children().forEach(function (child) {
            var childDataComponent = child.component.data;
            if (!childDataComponent.source) {
                util_1.extend(timeUnitComponent, childDataComponent.timeUnit);
                delete childDataComponent.timeUnit;
            }
        });
        return timeUnitComponent;
    },
    assemble: function (component) {
        // just join the values, which are already transforms
        return util_1.vals(component);
    }
};

},{"../../fielddef":60,"../../timeunit":69,"../../type":71,"../../util":72}],29:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var log = require("../log");
var axis_1 = require("../axis");
var channel_1 = require("../channel");
var config_1 = require("../config");
var encoding_1 = require("../encoding");
var fielddef_1 = require("../fielddef");
var util_1 = require("../util");
var parse_1 = require("./axis/parse");
var rules_1 = require("./axis/rules");
var common_1 = require("./common");
var data_1 = require("./data/data");
var layout_1 = require("./layout");
var model_1 = require("./model");
var init_1 = require("./scale/init");
var parse_2 = require("./scale/parse");
/**
 * Prefix for special data sources for driving column's axis group.
 */
exports.COLUMN_AXES_DATA_PREFIX = 'column-';
/**
 * Prefix for special data sources for driving row's axis group.
 */
exports.ROW_AXES_DATA_PREFIX = 'row-';
var FacetModel = (function (_super) {
    __extends(FacetModel, _super);
    function FacetModel(spec, parent, parentGivenName) {
        var _this = _super.call(this, spec, parent, parentGivenName) || this;
        _this._spacing = {};
        // Config must be initialized before child as it gets cascaded to the child
        var config = _this._config = _this._initConfig(spec.config, parent);
        var child = _this._child = common_1.buildModel(spec.spec, _this, _this.name('child'));
        var facet = _this._facet = _this._initFacet(spec.facet);
        _this._scale = _this._initScaleAndSpacing(facet, config);
        _this._axis = _this._initAxis(facet, config, child);
        _this._legend = {};
        return _this;
    }
    FacetModel.prototype._initConfig = function (specConfig, parent) {
        return util_1.mergeDeep(util_1.duplicate(config_1.defaultConfig), parent ? parent.config() : {}, specConfig);
    };
    FacetModel.prototype._initFacet = function (facet) {
        // clone to prevent side effect to the original spec
        facet = util_1.duplicate(facet);
        encoding_1.forEach(facet, function (fieldDef, channel) {
            if (!util_1.contains([channel_1.ROW, channel_1.COLUMN], channel)) {
                // Drop unsupported channel
                log.warn(log.message.incompatibleChannel(channel, 'facet'));
                delete facet[channel];
                return;
            }
            // TODO: array of row / column ?
            if (fieldDef.field === undefined) {
                log.warn(log.message.emptyFieldDef(fieldDef, channel));
                delete facet[channel];
                return;
            }
            // Convert type to full, lowercase type, or augment the fieldDef with a default type if missing.
            fielddef_1.normalize(fieldDef, channel);
            // TODO: move this warning into normalize
            if (!fielddef_1.isDimension(fieldDef)) {
                log.warn(log.message.facetChannelShouldBeDiscrete(channel));
            }
        });
        return facet;
    };
    FacetModel.prototype._initScaleAndSpacing = function (facet, config) {
        var model = this;
        return [channel_1.ROW, channel_1.COLUMN].reduce(function (_scale, channel) {
            if (facet[channel]) {
                _scale[channel] = init_1.default(channel, facet[channel], config, undefined, // Facet doesn't have one single mark
                undefined, // TODO(#1647): support width / height here
                [] // There is no xyRangeSteps here and there is no need to input
                );
                model._spacing[channel] = spacing(facet[channel].scale || {}, model, config);
            }
            return _scale;
        }, {});
    };
    FacetModel.prototype._initAxis = function (facet, config, child) {
        var model = this;
        return [channel_1.ROW, channel_1.COLUMN].reduce(function (_axis, channel) {
            if (facet[channel]) {
                var axisSpec = facet[channel].axis;
                if (axisSpec !== false) {
                    var modelAxis = _axis[channel] = util_1.extend({}, config.facet.axis, axisSpec === true ? {} : axisSpec || {});
                    if (channel === channel_1.ROW) {
                        var yAxis = child.axis(channel_1.Y);
                        if (yAxis && yAxis.orient !== axis_1.AxisOrient.RIGHT && !modelAxis.orient) {
                            modelAxis.orient = axis_1.AxisOrient.RIGHT;
                        }
                        if (model.hasDescendantWithFieldOnChannel(channel_1.X) && !modelAxis.labelAngle) {
                            modelAxis.labelAngle = modelAxis.orient === axis_1.AxisOrient.RIGHT ? 90 : 270;
                        }
                    }
                }
            }
            return _axis;
        }, {});
    };
    FacetModel.prototype.facet = function () {
        return this._facet;
    };
    FacetModel.prototype.channelHasField = function (channel) {
        return !!this._facet[channel];
    };
    FacetModel.prototype.child = function () {
        return this._child;
    };
    FacetModel.prototype.children = function () {
        return [this._child];
    };
    FacetModel.prototype.hasSummary = function () {
        var summary = this.component.data.summary;
        for (var _i = 0, summary_1 = summary; _i < summary_1.length; _i++) {
            var s = summary_1[_i];
            if (util_1.keys(s.measures).length > 0) {
                return true;
            }
        }
        return false;
    };
    FacetModel.prototype.facetedTable = function () {
        // FIXME: revise if the suffix should be 'data'
        return 'faceted-' + this.name('data');
    };
    FacetModel.prototype.dataTable = function () {
        // FIXME: shouldn't we apply data renaming here?
        if (this.component.data.stack) {
            return 'stacked';
        }
        if (this.hasSummary()) {
            return 'summary';
        }
        return 'source';
    };
    FacetModel.prototype.fieldDef = function (channel) {
        return this.facet()[channel];
    };
    FacetModel.prototype.stack = function () {
        return null; // this is only a property for UnitModel
    };
    FacetModel.prototype.parseData = function () {
        this.child().parseData();
        this.component.data = data_1.parseFacetData(this);
    };
    FacetModel.prototype.parseSelectionData = function () {
        // TODO: @arvind can write this
        // We might need to split this into compileSelectionData and compileSelectionSignals?
    };
    FacetModel.prototype.parseLayoutData = function () {
        this.child().parseLayoutData();
        this.component.layout = layout_1.parseFacetLayout(this);
    };
    FacetModel.prototype.parseScale = function () {
        var child = this.child();
        var model = this;
        child.parseScale();
        // TODO: support scales for field reference of parent data (e.g., for SPLOM)
        // First, add scale for row and column.
        var scaleComponent = this.component.scale = parse_2.default(this);
        // Then, move shared/union from its child spec.
        util_1.keys(child.component.scale).forEach(function (channel) {
            // TODO: correctly implement independent scale
            if (true) {
                scaleComponent[channel] = child.component.scale[channel];
                // for each scale, need to rename
                util_1.vals(scaleComponent[channel]).forEach(function (scale) {
                    var scaleNameWithoutPrefix = scale.name.substr(child.name('').length);
                    var newName = model.scaleName(scaleNameWithoutPrefix, true);
                    child.renameScale(scale.name, newName);
                    scale.name = newName;
                });
                // Once put in parent, just remove the child's scale.
                delete child.component.scale[channel];
            }
        });
    };
    FacetModel.prototype.parseMark = function () {
        this.child().parseMark();
        this.component.mark = util_1.extend({
            name: this.name('cell'),
            type: 'group',
            from: util_1.extend({
                facet: {
                    name: this.facetedTable(),
                    data: this.dataTable(),
                    groupby: [].concat(this.channelHasField(channel_1.ROW) ? [this.field(channel_1.ROW)] : [], this.channelHasField(channel_1.COLUMN) ? [this.field(channel_1.COLUMN)] : [])
                }
            }),
            encode: {
                update: getFacetGroupProperties(this)
            }
        }, 
        // FIXME: move this call to assembleMarks()
        // Call child's assembleGroup to add marks, scales, axes, and legends.
        // Note that we can call child's assembleGroup() here because parseMark()
        // is the last method in compile() and thus the child is completely compiled
        // at this point.
        this.child().assembleGroup());
    };
    FacetModel.prototype.parseAxis = function () {
        this.child().parseAxis();
        this.component.axis = parse_1.parseAxisComponent(this, [channel_1.ROW, channel_1.COLUMN]);
    };
    FacetModel.prototype.parseAxisGroup = function () {
        // TODO: with nesting, we might need to consider calling child
        // this.child().parseAxisGroup();
        var xAxisGroup = parseAxisGroups(this, channel_1.X);
        var yAxisGroup = parseAxisGroups(this, channel_1.Y);
        this.component.axisGroup = util_1.extend(xAxisGroup ? { x: xAxisGroup } : {}, yAxisGroup ? { y: yAxisGroup } : {});
    };
    FacetModel.prototype.parseGridGroup = function () {
        // TODO: with nesting, we might need to consider calling child
        // this.child().parseGridGroup();
        var child = this.child();
        this.component.gridGroup = util_1.extend(!child.channelHasField(channel_1.X) && this.channelHasField(channel_1.COLUMN) ? { column: getColumnGridGroups(this) } : {}, !child.channelHasField(channel_1.Y) && this.channelHasField(channel_1.ROW) ? { row: getRowGridGroups(this) } : {});
    };
    FacetModel.prototype.parseLegend = function () {
        this.child().parseLegend();
        // TODO: support legend for independent non-position scale across facets
        // TODO: support legend for field reference of parent data (e.g., for SPLOM)
        // For now, assuming that non-positional scales are always shared across facets
        // Thus, just move all legends from its child
        this.component.legend = this._child.component.legend;
        this._child.component.legend = {};
    };
    FacetModel.prototype.assembleParentGroupProperties = function () {
        return null;
    };
    FacetModel.prototype.assembleData = function (data) {
        // Prefix traversal – parent data might be referred by children data
        data_1.assembleData(this, data);
        this._child.assembleData(data);
        assembleAxesGroupData(this, data);
        return data;
    };
    FacetModel.prototype.assembleLayout = function (layoutData) {
        // Postfix traversal – layout is assembled bottom-up
        this._child.assembleLayout(layoutData);
        return layout_1.assembleLayout(this, layoutData);
    };
    FacetModel.prototype.assembleMarks = function () {
        return [].concat(
        // axisGroup is a mapping to VgMarkGroup
        util_1.vals(this.component.axisGroup), util_1.flatten(util_1.vals(this.component.gridGroup)), this.component.mark);
    };
    FacetModel.prototype.channels = function () {
        return [channel_1.ROW, channel_1.COLUMN];
    };
    FacetModel.prototype.mapping = function () {
        return this.facet();
    };
    FacetModel.prototype.spacing = function (channel) {
        return this._spacing[channel];
    };
    FacetModel.prototype.isFacet = function () {
        return true;
    };
    return FacetModel;
}(model_1.Model));
exports.FacetModel = FacetModel;
function hasSubPlotWithXy(model) {
    return model.hasDescendantWithFieldOnChannel('x') ||
        model.hasDescendantWithFieldOnChannel('y');
}
exports.hasSubPlotWithXy = hasSubPlotWithXy;
function spacing(scale, model, config) {
    if (scale.spacing !== undefined) {
        return scale.spacing;
    }
    if (!hasSubPlotWithXy(model)) {
        // If there is no subplot with x/y, it's a simple table so there should be no spacing.
        return 0;
    }
    return config.scale.facetSpacing;
}
exports.spacing = spacing;
function getFacetGroupProperties(model) {
    var child = model.child();
    var mergedCellConfig = util_1.extend({}, child.config().cell, child.config().facet.cell);
    return util_1.extend({
        x: model.channelHasField(channel_1.COLUMN) ? {
            scale: model.scaleName(channel_1.COLUMN),
            field: model.field(channel_1.COLUMN),
            // offset by the spacing / 2
            offset: model.spacing(channel_1.COLUMN) / 2
        } : { value: model.config().scale.facetSpacing / 2 },
        y: model.channelHasField(channel_1.ROW) ? {
            scale: model.scaleName(channel_1.ROW),
            field: model.field(channel_1.ROW),
            // offset by the spacing / 2
            offset: model.spacing(channel_1.ROW) / 2
        } : { value: model.config().scale.facetSpacing / 2 },
        width: { field: { parent: model.child().sizeName('width') } },
        height: { field: { parent: model.child().sizeName('height') } }
    }, hasSubPlotWithXy(model) ? child.assembleParentGroupProperties(mergedCellConfig) : {});
}
// TODO: move the rest of the file src/compile/facet/*.ts
/**
 * Add data for driving row/column axes when there are both row and column
 * Note that we don't have to deal with these in the parse step at all
 * because these items never get merged with any other items.
 */
function assembleAxesGroupData(model, data) {
    if (model.facet().column) {
        data.push({
            name: exports.COLUMN_AXES_DATA_PREFIX + model.dataTable(),
            source: model.dataTable(),
            transform: [{
                    type: 'aggregate',
                    groupby: [model.field(channel_1.COLUMN)]
                }]
        });
    }
    if (model.facet().row) {
        data.push({
            name: exports.ROW_AXES_DATA_PREFIX + model.dataTable(),
            source: model.dataTable(),
            transform: [{
                    type: 'aggregate',
                    groupby: [model.field(channel_1.ROW)]
                }]
        });
    }
    return data;
}
exports.assembleAxesGroupData = assembleAxesGroupData;
function parseAxisGroups(model, channel) {
    // TODO: add a case where inner spec is not a unit (facet/layer/concat)
    var axisGroup = null;
    var child = model.child();
    if (child.channelHasField(channel)) {
        if (child.axis(channel)) {
            if (true) {
                // add a group for the shared axes
                axisGroup = getSharedAxisGroup(model, channel);
                if (child.axis(channel) && rules_1.gridShow(child, channel)) {
                    // add inner axis (aka axis that shows only grid to )
                    child.component.axis[channel] = [parse_1.parseGridAxis(channel, child)];
                }
                else {
                    // Delete existing child axes
                    delete child.component.axis[channel];
                }
            }
            else {
            }
        }
    }
    return axisGroup;
}
function getSharedAxisGroup(model, channel) {
    var isX = channel === 'x';
    var facetChannel = isX ? 'column' : 'row';
    var hasFacet = !!model.facet()[facetChannel];
    var dataPrefix = isX ? exports.COLUMN_AXES_DATA_PREFIX : exports.ROW_AXES_DATA_PREFIX;
    var axesGroup = {
        name: model.name(channel + '-axes'),
        type: 'group'
    };
    if (hasFacet) {
        // Need to drive this with special data source that has one item for each column/row value.
        // TODO: We might only need to drive this with special data source if there are both row and column
        // However, it might be slightly difficult as we have to merge this with the main group.
        axesGroup.from = { data: dataPrefix + model.dataTable() };
    }
    if (isX) {
        axesGroup.encode = {
            update: {
                width: { field: { parent: model.child().sizeName('width') } },
                height: { field: { group: 'height' } },
                x: hasFacet ? {
                    scale: model.scaleName(channel_1.COLUMN),
                    field: model.field(channel_1.COLUMN),
                    // offset by the spacing
                    offset: model.spacing(channel_1.COLUMN) / 2
                } : {
                    // TODO: support custom spacing here
                    // offset by the spacing
                    value: model.config().scale.facetSpacing / 2
                }
            }
        };
    }
    else {
        axesGroup.encode = {
            update: {
                width: { field: { group: 'width' } },
                height: { field: { parent: model.child().sizeName('height') } },
                y: hasFacet ? {
                    scale: model.scaleName(channel_1.ROW),
                    field: model.field(channel_1.ROW),
                    // offset by the spacing
                    offset: model.spacing(channel_1.ROW) / 2
                } : {
                    // offset by the spacing
                    value: model.config().scale.facetSpacing / 2
                }
            }
        };
    }
    axesGroup.axes = [parse_1.parseMainAxis(channel, model.child())];
    return axesGroup;
}
exports.getSharedAxisGroup = getSharedAxisGroup;
function getRowGridGroups(model) {
    var facetGridConfig = model.config().facet.grid;
    var rowGrid = {
        name: model.name('row-grid'),
        type: 'rule',
        from: {
            data: exports.ROW_AXES_DATA_PREFIX + model.dataTable()
        },
        encode: {
            update: {
                y: {
                    scale: model.scaleName(channel_1.ROW),
                    field: model.field(channel_1.ROW)
                },
                x: { value: 0, offset: -facetGridConfig.offset },
                x2: { field: { group: 'width' }, offset: facetGridConfig.offset },
                stroke: { value: facetGridConfig.color },
                strokeOpacity: { value: facetGridConfig.opacity },
                strokeWidth: { value: 0.5 }
            }
        }
    };
    return [rowGrid, {
            name: model.name('row-grid-end'),
            type: 'rule',
            encode: {
                update: {
                    y: { field: { group: 'height' } },
                    x: { value: 0, offset: -facetGridConfig.offset },
                    x2: { field: { group: 'width' }, offset: facetGridConfig.offset },
                    stroke: { value: facetGridConfig.color },
                    strokeOpacity: { value: facetGridConfig.opacity },
                    strokeWidth: { value: 0.5 }
                }
            }
        }];
}
function getColumnGridGroups(model) {
    var facetGridConfig = model.config().facet.grid;
    var columnGrid = {
        name: model.name('column-grid'),
        type: 'rule',
        from: {
            data: exports.COLUMN_AXES_DATA_PREFIX + model.dataTable()
        },
        encode: {
            update: {
                x: {
                    scale: model.scaleName(channel_1.COLUMN),
                    field: model.field(channel_1.COLUMN)
                },
                y: { value: 0, offset: -facetGridConfig.offset },
                y2: { field: { group: 'height' }, offset: facetGridConfig.offset },
                stroke: { value: facetGridConfig.color },
                strokeOpacity: { value: facetGridConfig.opacity },
                strokeWidth: { value: 0.5 }
            }
        }
    };
    return [columnGrid, {
            name: model.name('column-grid-end'),
            type: 'rule',
            encode: {
                update: {
                    x: { field: { group: 'width' } },
                    y: { value: 0, offset: -facetGridConfig.offset },
                    y2: { field: { group: 'height' }, offset: facetGridConfig.offset },
                    stroke: { value: facetGridConfig.color },
                    strokeOpacity: { value: facetGridConfig.opacity },
                    strokeWidth: { value: 0.5 }
                }
            }
        }];
}

},{"../axis":8,"../channel":10,"../config":55,"../encoding":58,"../fielddef":60,"../log":63,"../util":72,"./axis/parse":12,"./axis/rules":13,"./common":14,"./data/data":18,"./layout":31,"./model":46,"./scale/init":48,"./scale/parse":49}],30:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var config_1 = require("../config");
var mark_1 = require("../mark");
var util_1 = require("../util");
var data_1 = require("../data");
var data_2 = require("./data/data");
var common_1 = require("./common");
var layout_1 = require("./layout");
var model_1 = require("./model");
var domain_1 = require("./scale/domain");
var LayerModel = (function (_super) {
    __extends(LayerModel, _super);
    function LayerModel(spec, parent, parentGivenName) {
        var _this = _super.call(this, spec, parent, parentGivenName) || this;
        _this._width = spec.width;
        _this._height = spec.height;
        _this._config = _this._initConfig(spec.config, parent);
        _this._children = spec.layers.map(function (layer, i) {
            // we know that the model has to be a unit model because we pass in a unit spec
            return common_1.buildModel(layer, _this, _this.name('layer_' + i));
        });
        return _this;
    }
    LayerModel.prototype._initConfig = function (specConfig, parent) {
        return util_1.mergeDeep(util_1.duplicate(config_1.defaultConfig), specConfig, parent ? parent.config() : {});
    };
    Object.defineProperty(LayerModel.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerModel.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    LayerModel.prototype.channelHasField = function (_) {
        // layer does not have any channels
        return false;
    };
    LayerModel.prototype.children = function () {
        return this._children;
    };
    LayerModel.prototype.hasDiscreteScale = function (channel) {
        // since we assume shared scales we can just ask the first child
        return this._children[0].hasDiscreteScale(channel);
    };
    LayerModel.prototype.dataTable = function () {
        // FIXME: don't just use the first child
        return this._children[0].dataTable();
    };
    LayerModel.prototype.fieldDef = function (_) {
        return null; // layer does not have field defs
    };
    LayerModel.prototype.stack = function () {
        return null; // this is only a property for UnitModel
    };
    LayerModel.prototype.parseData = function () {
        this._children.forEach(function (child) {
            child.parseData();
        });
        this.component.data = data_2.parseLayerData(this);
    };
    LayerModel.prototype.parseSelectionData = function () {
        // TODO: @arvind can write this
        // We might need to split this into compileSelectionData and compileSelectionSignals?
    };
    LayerModel.prototype.parseLayoutData = function () {
        // TODO: correctly union ordinal scales rather than just using the layout of the first child
        this._children.forEach(function (child) {
            child.parseLayoutData();
        });
        this.component.layout = layout_1.parseLayerLayout(this);
    };
    LayerModel.prototype.parseScale = function () {
        var model = this;
        var scaleComponent = this.component.scale = {};
        this._children.forEach(function (child) {
            child.parseScale();
            // FIXME(#1602): correctly implement independent scale
            // Also need to check whether the scales are actually compatible, e.g. use the same sort or throw error
            if (true) {
                util_1.keys(child.component.scale).forEach(function (channel) {
                    var childScales = child.component.scale[channel];
                    if (!childScales) {
                        // the child does not have any scales so we have nothing to merge
                        return;
                    }
                    var modelScales = scaleComponent[channel];
                    if (modelScales && modelScales.main) {
                        // Scales are unioned by combining the domain of the main scale.
                        // Other scales that are used for ordinal legends are appended.
                        modelScales.main.domain = domain_1.unionDomains(modelScales.main.domain, childScales.main.domain);
                        modelScales.binLegend = modelScales.binLegend ? modelScales.binLegend : childScales.binLegend;
                        modelScales.binLegendLabel = modelScales.binLegendLabel ? modelScales.binLegendLabel : childScales.binLegendLabel;
                    }
                    else {
                        scaleComponent[channel] = childScales;
                    }
                    // rename child scales to parent scales
                    util_1.vals(childScales).forEach(function (scale) {
                        var scaleNameWithoutPrefix = scale.name.substr(child.name('').length);
                        var newName = model.scaleName(scaleNameWithoutPrefix, true);
                        child.renameScale(scale.name, newName);
                        scale.name = newName;
                    });
                    delete childScales[channel];
                });
            }
        });
    };
    LayerModel.prototype.parseMark = function () {
        this._children.forEach(function (child) {
            child.parseMark();
        });
    };
    LayerModel.prototype.parseAxis = function () {
        var axisComponent = this.component.axis = {};
        this._children.forEach(function (child) {
            child.parseAxis();
            // TODO: correctly implement independent axes
            if (true) {
                util_1.keys(child.component.axis).forEach(function (channel) {
                    // TODO: support multiple axes for shared scale
                    // just use the first axis definition for each channel
                    if (!axisComponent[channel]) {
                        axisComponent[channel] = child.component.axis[channel];
                    }
                });
            }
        });
    };
    LayerModel.prototype.parseAxisGroup = function () {
        return null;
    };
    LayerModel.prototype.parseGridGroup = function () {
        return null;
    };
    LayerModel.prototype.parseLegend = function () {
        var legendComponent = this.component.legend = {};
        this._children.forEach(function (child) {
            child.parseLegend();
            // TODO: correctly implement independent axes
            if (true) {
                util_1.keys(child.component.legend).forEach(function (channel) {
                    // just use the first legend definition for each channel
                    if (!legendComponent[channel]) {
                        legendComponent[channel] = child.component.legend[channel];
                    }
                });
            }
        });
    };
    LayerModel.prototype.assembleParentGroupProperties = function (cellConfig) {
        return common_1.applyConfig({}, cellConfig, mark_1.FILL_STROKE_CONFIG.concat(['clip']));
    };
    LayerModel.prototype.assembleData = function (data) {
        // Prefix traversal – parent data might be referred to by children data
        data_2.assembleData(this, data);
        this._children.forEach(function (child) {
            child.assembleData(data);
        });
        return data;
    };
    LayerModel.prototype.assembleLayout = function (layoutData) {
        // Postfix traversal – layout is assembled bottom-up
        this._children.forEach(function (child) {
            child.assembleLayout(layoutData);
        });
        return layout_1.assembleLayout(this, layoutData);
    };
    LayerModel.prototype.assembleMarks = function () {
        // only children have marks
        return util_1.flatten(this._children.map(function (child) {
            return child.assembleMarks();
        }));
    };
    LayerModel.prototype.channels = function () {
        return [];
    };
    LayerModel.prototype.mapping = function () {
        return null;
    };
    LayerModel.prototype.isLayer = function () {
        return true;
    };
    /**
     * Returns true if the child either has no source defined or uses the same url.
     * This is useful if you want to know whether it is possible to move a filter up.
     *
     * This function can only be called once th child has been parsed.
     */
    LayerModel.prototype.compatibleSource = function (child) {
        var data = this.data();
        var childData = child.component.data;
        var compatible = !childData.source || (data && data_1.isUrlData(data) && data.url === childData.source.url);
        return compatible;
    };
    return LayerModel;
}(model_1.Model));
exports.LayerModel = LayerModel;

},{"../config":55,"../data":56,"../mark":64,"../util":72,"./common":14,"./data/data":18,"./layout":31,"./model":46,"./scale/domain":47}],31:[function(require,module,exports){
"use strict";
var channel_1 = require("../channel");
var data_1 = require("../data");
var scale_1 = require("../scale");
var util_1 = require("../util");
function assembleLayout(model, layoutData) {
    var layoutComponent = model.component.layout;
    if (!layoutComponent.width && !layoutComponent.height) {
        return layoutData; // Do nothing
    }
    if (true) {
        var distinctFields = util_1.keys(util_1.extend(layoutComponent.width.distinct, layoutComponent.height.distinct));
        var formula = layoutComponent.width.formula.concat(layoutComponent.height.formula)
            .map(function (f) { return util_1.extend({ type: 'formula' }, f); });
        return [
            distinctFields.length > 0 ? {
                name: model.dataName(data_1.LAYOUT),
                source: model.dataTable(),
                transform: [{
                        type: 'aggregate',
                        fields: distinctFields,
                        ops: distinctFields.map(function () { return 'distinct'; })
                    }].concat(formula)
            } : {
                name: model.dataName(data_1.LAYOUT),
                values: [{}],
                transform: formula
            }
        ];
    }
    // FIXME: implement
    // otherwise, we need to join width and height (cross)
}
exports.assembleLayout = assembleLayout;
// FIXME: for nesting x and y, we need to declare x,y layout separately before joining later
// For now, let's always assume shared scale
function parseUnitLayout(model) {
    return {
        width: parseUnitSizeLayout(model, channel_1.X),
        height: parseUnitSizeLayout(model, channel_1.Y)
    };
}
exports.parseUnitLayout = parseUnitLayout;
function parseUnitSizeLayout(model, channel) {
    return {
        distinct: getDistinct(model, channel),
        formula: [{
                as: model.channelSizeName(channel),
                expr: unitSizeExpr(model, channel)
            }]
    };
}
function unitSizeExpr(model, channel) {
    var scale = model.scale(channel);
    if (scale) {
        if (scale_1.hasDiscreteDomain(scale.type) && scale.rangeStep) {
            // If the spec has top level size or specified rangeStep = fit, it will be undefined here.
            var cardinality = cardinalityExpr(model, channel);
            var paddingOuter = scale.paddingOuter !== undefined ? scale.paddingOuter : scale.padding;
            var paddingInner = scale.type === 'band' ?
                // only band has real paddingInner
                (scale.paddingInner !== undefined ? scale.paddingInner : scale.padding) :
                // For point, as calculated in https://github.com/vega/vega-scale/blob/master/src/band.js#L128,
                // it's equivalent to have paddingInner = 1 since there is only n-1 steps between n points.
                1;
            var space = cardinality +
                (paddingInner ? " - " + paddingInner : '') +
                (paddingOuter ? " + 2*" + paddingOuter : '');
            // This formula is equivalent to
            // space = count - inner + outer * 2
            // range = rangeStep * (space > 0 ? space : 0)
            // in https://github.com/vega/vega-encode/blob/master/src/Scale.js#L112
            return "max(" + space + ", 0) * " + scale.rangeStep;
        }
    }
    return (channel === channel_1.X ? model.width : model.height) + '';
}
exports.unitSizeExpr = unitSizeExpr;
function parseFacetLayout(model) {
    return {
        width: parseFacetSizeLayout(model, channel_1.COLUMN),
        height: parseFacetSizeLayout(model, channel_1.ROW)
    };
}
exports.parseFacetLayout = parseFacetLayout;
function parseFacetSizeLayout(model, channel) {
    var childLayoutComponent = model.child().component.layout;
    var sizeType = channel === channel_1.ROW ? 'height' : 'width';
    var childSizeComponent = childLayoutComponent[sizeType];
    if (true) {
        // For shared scale, we can simply merge the layout into one data source
        var distinct = util_1.extend(getDistinct(model, channel), childSizeComponent.distinct);
        var formula = childSizeComponent.formula.concat([{
                as: model.channelSizeName(channel),
                expr: facetSizeFormula(model, channel, model.child().channelSizeName(channel))
            }]);
        delete childLayoutComponent[sizeType];
        return {
            distinct: distinct,
            formula: formula
        };
    }
    // FIXME implement independent scale as well
    // TODO: - also consider when children have different data source
}
function facetSizeFormula(model, channel, innerSize) {
    if (model.channelHasField(channel)) {
        return '(datum["' + innerSize + '"] + ' + model.spacing(channel) + ')' + ' * ' + cardinalityExpr(model, channel);
    }
    else {
        return 'datum["' + innerSize + '"] + ' + model.config().scale.facetSpacing; // need to add outer padding for facet
    }
}
function parseLayerLayout(model) {
    return {
        width: parseLayerSizeLayout(model, channel_1.X),
        height: parseLayerSizeLayout(model, channel_1.Y)
    };
}
exports.parseLayerLayout = parseLayerLayout;
function parseLayerSizeLayout(model, channel) {
    if (true) {
        // For shared scale, we can simply merge the layout into one data source
        // TODO: don't just take the layout from the first child
        var childLayoutComponent = model.children()[0].component.layout;
        var sizeType_1 = channel === channel_1.Y ? 'height' : 'width';
        var childSizeComponent = childLayoutComponent[sizeType_1];
        var distinct = childSizeComponent.distinct;
        var formula = [{
                as: model.channelSizeName(channel),
                expr: childSizeComponent.formula[0].expr
            }];
        model.children().forEach(function (child) {
            delete child.component.layout[sizeType_1];
        });
        return {
            distinct: distinct,
            formula: formula
        };
    }
}
function getDistinct(model, channel) {
    if (model.channelHasField(channel) && model.hasDiscreteScale(channel)) {
        var scale = model.scale(channel);
        if (scale_1.hasDiscreteDomain(scale.type) && !(scale.domain instanceof Array)) {
            // if explicit domain is declared, use array length
            var distinctField = model.field(channel);
            var distinct = {};
            distinct[distinctField] = true;
            return distinct;
        }
    }
    return {};
}
function cardinalityExpr(model, channel) {
    var scale = model.scale(channel);
    if (scale.domain instanceof Array) {
        return scale.domain.length + '';
    }
    return model.field(channel, { datum: true, prefix: 'distinct' });
}
exports.cardinalityExpr = cardinalityExpr;

},{"../channel":10,"../data":56,"../scale":65,"../util":72}],32:[function(require,module,exports){
"use strict";
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var mark_1 = require("../../mark");
var scale_1 = require("../../scale");
var type_1 = require("../../type");
var util_1 = require("../../util");
var common_1 = require("../common");
var scale_2 = require("../scale/scale");
function symbols(fieldDef, symbolsSpec, model, channel) {
    var symbols = {};
    var mark = model.mark();
    var legend = model.legend(channel);
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
    var cfg = model.config();
    var filled = cfg.mark.filled;
    var config = channel === channel_1.COLOR ?
        /* For color's legend, do not set fill (when filled) or stroke (when unfilled) property from config because the legend's `fill` or `stroke` scale should have precedence */
        util_1.without(mark_1.FILL_STROKE_CONFIG, [filled ? 'fill' : 'stroke', 'strokeDash', 'strokeDashOffset']) :
        /* For other legend, no need to omit. */
        util_1.without(mark_1.FILL_STROKE_CONFIG, ['strokeDash', 'strokeDashOffset']);
    config = util_1.without(config, ['strokeDash', 'strokeDashOffset']);
    common_1.applyMarkConfig(symbols, model, config);
    if (filled) {
        symbols.strokeWidth = { value: 0 };
    }
    // Avoid override default mapping for opacity channel
    if (channel === channel_1.OPACITY) {
        delete symbols.opacity;
    }
    var value;
    var colorDef = model.encoding().color;
    if (fielddef_1.isValueDef(colorDef)) {
        value = { value: colorDef.value };
    }
    if (value !== undefined) {
        // apply the value
        if (filled) {
            symbols.fill = value;
        }
        else {
            symbols.stroke = value;
        }
    }
    else if (channel !== channel_1.COLOR) {
        // For non-color legend, apply color config if there is no fill / stroke config.
        // (For color, do not override scale specified!)
        symbols[filled ? 'fill' : 'stroke'] = symbols[filled ? 'fill' : 'stroke'] ||
            { value: cfg.mark.color };
    }
    if (legend.symbolColor !== undefined) {
        symbols.fill = { value: legend.symbolColor };
    }
    else if (symbols.fill === undefined) {
        // fall back to mark config colors for legend fill
        if (cfg.mark.fill !== undefined) {
            symbols.fill = { value: cfg.mark.fill };
        }
        else if (cfg.mark.stroke !== undefined) {
            symbols.stroke = { value: cfg.mark.stroke };
        }
    }
    if (channel !== channel_1.SHAPE) {
        if (legend.symbolShape !== undefined) {
            symbols.shape = { value: legend.symbolShape };
        }
        else if (cfg.point.shape !== undefined) {
            symbols.shape = { value: cfg.point.shape };
        }
    }
    if (channel !== channel_1.SIZE) {
        if (legend.symbolSize !== undefined) {
            symbols.size = { value: legend.symbolSize };
        }
    }
    if (fieldDef.bin && scale_1.hasContinuousDomain(model.scale(channel).type)) {
        var def = {
            scale: model.scaleName(channel),
            field: 'value'
        };
        switch (channel) {
            case channel_1.OPACITY:
                symbols.opacity = def;
                break;
            case channel_1.SIZE:
                symbols.size = def;
                break;
            case channel_1.COLOR:
                symbols[filled ? 'fill' : 'stroke'] = def;
                break;
            default:
                throw Error("Legend for channel " + channel + " not implemented");
        }
    }
    if (legend.symbolStrokeWidth !== undefined) {
        symbols.strokeWidth = { value: legend.symbolStrokeWidth };
    }
    symbols = util_1.extend(symbols, symbolsSpec || {});
    return util_1.keys(symbols).length > 0 ? symbols : undefined;
}
exports.symbols = symbols;
function labels(fieldDef, labelsSpec, model, channel) {
    var legend = model.legend(channel);
    var config = model.config();
    var labels = {};
    if (fieldDef.bin && scale_1.hasContinuousDomain(model.scale(channel).type)) {
        // Override label's text to map bin's quantitative value to range
        labelsSpec = util_1.extend({
            text: {
                scale: model.scaleName(channel) + scale_2.BIN_LEGEND_LABEL_SUFFIX,
                field: 'value'
            }
        }, labelsSpec || {});
    }
    else if (fieldDef.type === type_1.TEMPORAL) {
        labelsSpec = util_1.extend({
            text: {
                signal: common_1.timeFormatExpression('datum.value', fieldDef.timeUnit, legend.format, legend.shortTimeLabels, config)
            }
        }, labelsSpec || {});
    }
    if (legend.labelAlign !== undefined) {
        labels.align = { value: legend.labelAlign };
    }
    if (legend.labelColor !== undefined) {
        labels.fill = { value: legend.labelColor };
    }
    if (legend.labelFont !== undefined) {
        labels.font = { value: legend.labelFont };
    }
    if (legend.labelFontSize !== undefined) {
        labels.fontSize = { value: legend.labelFontSize };
    }
    if (legend.labelBaseline !== undefined) {
        labels.baseline = { value: legend.labelBaseline };
    }
    labels = util_1.extend(labels, labelsSpec || {});
    return util_1.keys(labels).length > 0 ? labels : undefined;
}
exports.labels = labels;
function title(_, titleSpec, model, channel) {
    var legend = model.legend(channel);
    var titles = {};
    if (legend.titleColor !== undefined) {
        titles.fill = { value: legend.titleColor };
    }
    if (legend.titleFont !== undefined) {
        titles.font = { value: legend.titleFont };
    }
    if (legend.titleFontSize !== undefined) {
        titles.fontSize = { value: legend.titleFontSize };
    }
    if (legend.titleFontWeight !== undefined) {
        titles.fontWeight = { value: legend.titleFontWeight };
    }
    titles = util_1.extend(titles, titleSpec || {});
    return util_1.keys(titles).length > 0 ? titles : undefined;
}
exports.title = title;

},{"../../channel":10,"../../fielddef":60,"../../mark":64,"../../scale":65,"../../type":71,"../../util":72,"../common":14,"../scale/scale":52}],33:[function(require,module,exports){
"use strict";
var channel_1 = require("../../channel");
var scale_1 = require("../../scale");
var util_1 = require("../../util");
var common_1 = require("../common");
var scale_2 = require("../scale/scale");
var encode = require("./encode");
var rules = require("./rules");
function parseLegendComponent(model) {
    return [channel_1.COLOR, channel_1.SIZE, channel_1.SHAPE, channel_1.OPACITY].reduce(function (legendComponent, channel) {
        if (model.legend(channel)) {
            legendComponent[channel] = parseLegend(model, channel);
        }
        return legendComponent;
    }, {});
}
exports.parseLegendComponent = parseLegendComponent;
function getLegendDefWithScale(model, channel) {
    // For binned field with continuous scale, use a special scale so we can overrride the mark props and labels
    var suffix = model.fieldDef(channel).bin && scale_1.hasContinuousDomain(model.scale(channel).type) ? scale_2.BIN_LEGEND_SUFFIX : '';
    switch (channel) {
        case channel_1.COLOR:
            var scale = model.scaleName(channel_1.COLOR) + suffix;
            return model.config().mark.filled ? { fill: scale } : { stroke: scale };
        case channel_1.SIZE:
            return { size: model.scaleName(channel_1.SIZE) + suffix };
        case channel_1.SHAPE:
            return { shape: model.scaleName(channel_1.SHAPE) + suffix };
        case channel_1.OPACITY:
            return { opacity: model.scaleName(channel_1.OPACITY) + suffix };
    }
    return null;
}
function parseLegend(model, channel) {
    var fieldDef = model.fieldDef(channel);
    var legend = model.legend(channel);
    var config = model.config();
    var def = getLegendDefWithScale(model, channel);
    // 1.1 Add properties with special rules
    def.title = rules.title(legend, fieldDef, config);
    var format = common_1.numberFormat(fieldDef, legend.format, config, channel);
    if (format) {
        def.format = format;
    }
    var vals = rules.values(legend);
    if (vals) {
        def.values = vals;
    }
    var t = rules.type(legend, fieldDef, channel);
    if (t) {
        def.type = t;
    }
    // 1.2 Add properties without rules
    ['offset', 'orient'].forEach(function (property) {
        var value = legend[property];
        if (value !== undefined) {
            def[property] = value;
        }
    });
    // 2) Add mark property definition groups
    var encodeSpec = legend.encode || {};
    ['title', 'symbols', 'legend', 'labels'].forEach(function (part) {
        var value = encode[part] ?
            encode[part](fieldDef, encodeSpec[part], model, channel) :
            encodeSpec[part]; // no rule -- just default values
        if (value !== undefined && util_1.keys(value).length > 0) {
            def.encode = def.encode || {};
            def.encode[part] = { update: value };
        }
    });
    return def;
}
exports.parseLegend = parseLegend;

},{"../../channel":10,"../../scale":65,"../../util":72,"../common":14,"../scale/scale":52,"./encode":32,"./rules":34}],34:[function(require,module,exports){
"use strict";
var channel_1 = require("../../channel");
var datetime_1 = require("../../datetime");
var fielddef_1 = require("../../fielddef");
var type_1 = require("../../type");
var util_1 = require("../../util");
function title(legend, fieldDef, config) {
    if (legend.title !== undefined) {
        return legend.title;
    }
    return fielddef_1.title(fieldDef, config);
}
exports.title = title;
function values(legend) {
    var vals = legend.values;
    if (vals && datetime_1.isDateTime(vals[0])) {
        return vals.map(function (dt) {
            // normalize = true as end user won't put 0 = January
            return datetime_1.timestamp(dt, true);
        });
    }
    return vals;
}
exports.values = values;
function type(legend, fieldDef, channel) {
    if (legend.type) {
        return legend.type;
    }
    if (channel === channel_1.COLOR && !fieldDef.bin && !fieldDef.timeUnit && util_1.contains([type_1.QUANTITATIVE, type_1.TEMPORAL], fieldDef.type)) {
        return 'gradient';
    }
    return undefined;
}
exports.type = type;

},{"../../channel":10,"../../datetime":57,"../../fielddef":60,"../../type":71,"../../util":72}],35:[function(require,module,exports){
"use strict";
var channel_1 = require("../../channel");
var common_1 = require("../common");
var common_2 = require("./common");
var ref = require("./valueref");
exports.area = {
    markType: function () {
        return 'area';
    },
    encodeEntry: function (model) {
        var e = {};
        var config = model.config();
        // We should always have orient as we augment it in config.ts
        var orient = config.mark.orient;
        e.orient = { value: orient };
        var stack = model.stack();
        // TODO: refactor how refer to scale as discussed in https://github.com/vega/vega-lite/pull/1613
        e.x = ref.stackable(channel_1.X, model.encoding().x, model.scaleName(channel_1.X), model.scale(channel_1.X), stack, 'base');
        e.y = ref.stackable(channel_1.Y, model.encoding().y, model.scaleName(channel_1.Y), model.scale(channel_1.Y), stack, 'base');
        // Have only x2 or y2 based on orientation
        if (orient === 'horizontal') {
            e.x2 = ref.stackable2(channel_1.X2, model.encoding().x, model.encoding().x2, model.scaleName(channel_1.X), model.scale(channel_1.X), stack, 'base');
        }
        else {
            e.y2 = ref.stackable2(channel_1.Y2, model.encoding().y, model.encoding().y2, model.scaleName(channel_1.Y), model.scale(channel_1.Y), stack, 'base');
        }
        common_2.applyColorAndOpacity(e, model);
        common_1.applyMarkConfig(e, model, ['interpolate', 'tension']);
        return e;
    }
};

},{"../../channel":10,"../common":14,"./common":37,"./valueref":45}],36:[function(require,module,exports){
"use strict";
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var scale_1 = require("../../scale");
var util_1 = require("../../util");
var log = require("../../log");
var common_1 = require("./common");
var ref = require("./valueref");
exports.bar = {
    markType: function () {
        return 'rect';
    },
    encodeEntry: function (model) {
        var stack = model.stack();
        var e = util_1.extend(x(model, stack), y(model, stack));
        common_1.applyColorAndOpacity(e, model);
        return e;
    }
};
function x(model, stack) {
    var e = {};
    var config = model.config();
    var orient = model.config().mark.orient;
    var sizeDef = model.encoding().size;
    var xDef = model.encoding().x;
    var xScaleName = model.scaleName(channel_1.X);
    var xScale = model.scale(channel_1.X);
    // x, x2, and width -- we must specify two of these in all conditions
    if (orient === 'horizontal') {
        e.x = ref.stackable(channel_1.X, xDef, xScaleName, model.scale(channel_1.X), stack, 'base');
        e.x2 = ref.stackable2(channel_1.X2, xDef, model.encoding().x2, xScaleName, model.scale(channel_1.X), stack, 'base');
        return e;
    }
    else {
        if (fielddef_1.isFieldDef(xDef)) {
            if (xDef.bin && !sizeDef) {
                // TODO: check scale type = linear
                e.x2 = ref.bin(xDef, xScaleName, 'start', config.bar.binSpacing);
                e.x = ref.bin(xDef, xScaleName, 'end');
                return e;
            }
            else if (xScale.type === scale_1.ScaleType.BAND) {
                // TODO: band scale doesn't support size yet
                e.x = ref.fieldRef(xDef, xScaleName, {});
                e.width = ref.band(xScaleName);
                return e;
            }
        }
        // sized bin, normal point-ordinal axis, quantitative x-axis, or no x
        e.xc = ref.midPoint(channel_1.X, xDef, xScaleName, model.scale(channel_1.X), util_1.extend(ref.midX(config), { offset: 1 }) // TODO: config.singleBarOffset
        );
        e.width = ref.midPoint(channel_1.SIZE, model.encoding().size, model.scaleName(channel_1.SIZE), model.scale(channel_1.SIZE), defaultSizeRef(xScaleName, model.scale(channel_1.X), config));
        return e;
    }
}
function y(model, stack) {
    var e = {};
    var config = model.config();
    var orient = model.config().mark.orient;
    var sizeDef = model.encoding().size;
    var yDef = model.encoding().y;
    var yScaleName = model.scaleName(channel_1.Y);
    var yScale = model.scale(channel_1.Y);
    // y, y2 & height -- we must specify two of these in all conditions
    if (orient === 'vertical') {
        e.y = ref.stackable(channel_1.Y, model.encoding().y, yScaleName, model.scale(channel_1.Y), stack, 'base');
        e.y2 = ref.stackable2(channel_1.Y2, model.encoding().y, model.encoding().y2, yScaleName, model.scale(channel_1.Y), stack, 'base');
        return e;
    }
    else {
        if (fielddef_1.isFieldDef(yDef)) {
            if (yDef.bin && !sizeDef) {
                e.y2 = ref.bin(yDef, yScaleName, 'start');
                e.y = ref.bin(yDef, yScaleName, 'end', config.bar.binSpacing);
                return e;
            }
            else if (yScale.type === scale_1.ScaleType.BAND) {
                // TODO: band scale doesn't support size yet
                e.y = ref.fieldRef(yDef, yScaleName, {});
                e.height = ref.band(yScaleName);
                return e;
            }
        }
        e.yc = ref.midPoint(channel_1.Y, yDef, yScaleName, model.scale(channel_1.Y), ref.midY(config));
        e.height = ref.midPoint(channel_1.SIZE, model.encoding().size, model.scaleName(channel_1.SIZE), model.scale(channel_1.SIZE), defaultSizeRef(yScaleName, model.scale(channel_1.Y), config));
        return e;
    }
}
function defaultSizeRef(scaleName, scale, config) {
    if (config.bar.discreteBandSize) {
        return { value: config.bar.discreteBandSize };
    }
    if (scale) {
        if (scale.type === scale_1.ScaleType.POINT) {
            if (scale.rangeStep !== null) {
                return { value: scale.rangeStep - 1 };
            }
            log.warn(log.message.BAR_WITH_POINT_SCALE_AND_RANGESTEP_NULL);
        }
        else if (scale.type === scale_1.ScaleType.BAND) {
            return ref.band(scaleName);
        }
        else {
            return { value: config.bar.continuousBandSize };
        }
    }
    if (config.scale.rangeStep && config.scale.rangeStep !== null) {
        return { value: config.scale.rangeStep - 1 };
    }
    // TODO: this should depends on cell's width / height?
    return { value: 20 };
}

},{"../../channel":10,"../../fielddef":60,"../../log":63,"../../scale":65,"../../util":72,"./common":37,"./valueref":45}],37:[function(require,module,exports){
"use strict";
var mark_1 = require("../../mark");
var util = require("../../util");
var common_1 = require("../common");
var ref = require("./valueref");
function applyColorAndOpacity(e, model) {
    var config = model.config();
    var filled = config.mark.filled;
    // TODO: remove this once we correctly integrate theme
    // Apply fill stroke config first so that color field / value can override
    // fill / stroke
    if (filled) {
        common_1.applyMarkConfig(e, model, mark_1.FILL_CONFIG);
    }
    else {
        common_1.applyMarkConfig(e, model, mark_1.STROKE_CONFIG);
    }
    var colorRef = ref.midPoint('color', model.encoding().color, model.scaleName('color'), model.scale('color'), undefined);
    var opacityRef = ref.midPoint('opacity', model.encoding().opacity, model.scaleName('opacity'), model.scale('opacity'), config.mark.opacity && { value: config.mark.opacity });
    if (colorRef !== undefined) {
        if (filled) {
            e.fill = colorRef;
        }
        else {
            e.stroke = colorRef;
        }
    }
    else {
        // apply color config if there is no fill / stroke config
        e[filled ? 'fill' : 'stroke'] = e[filled ? 'fill' : 'stroke'] ||
            { value: model.config().mark.color };
    }
    // If there is no fill, always fill symbols
    // with transparent fills https://github.com/vega/vega-lite/issues/1316
    if (!e.fill && util.contains(['bar', 'point', 'circle', 'square'], model.mark())) {
        e.fill = { value: 'transparent' };
    }
    if (opacityRef) {
        e.opacity = opacityRef;
    }
}
exports.applyColorAndOpacity = applyColorAndOpacity;

},{"../../mark":64,"../../util":72,"../common":14,"./valueref":45}],38:[function(require,module,exports){
"use strict";
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var common_1 = require("../common");
var common_2 = require("./common");
var ref = require("./valueref");
exports.line = {
    markType: function () {
        return 'line';
    },
    encodeEntry: function (model) {
        var e = {};
        var config = model.config();
        var stack = model.stack();
        // TODO: refactor how refer to scale as discussed in https://github.com/vega/vega-lite/pull/1613
        e.x = ref.stackable(channel_1.X, model.encoding().x, model.scaleName(channel_1.X), model.scale(channel_1.X), stack, 'base');
        e.y = ref.stackable(channel_1.Y, model.encoding().y, model.scaleName(channel_1.Y), model.scale(channel_1.Y), stack, 'base');
        var _size = size(model.encoding().size, config);
        if (_size) {
            e.strokeWidth = _size;
        }
        common_2.applyColorAndOpacity(e, model);
        common_1.applyMarkConfig(e, model, ['interpolate', 'tension']);
        return e;
    }
};
// FIXME: replace this with normal size and throw warning if the size field is not the grouping field instead?
// NOTE: This is different from other size because
// Vega does not support variable line size.
function size(sizeDef, config) {
    if (fielddef_1.isValueDef(sizeDef)) {
        return { value: sizeDef.value };
    }
    // FIXME: We should not need this line since this should be taken care by applyColorAndOpacity
    // but we have to refactor \ first
    return { value: config.mark.strokeWidth };
}

},{"../../channel":10,"../../fielddef":60,"../common":14,"./common":37,"./valueref":45}],39:[function(require,module,exports){
"use strict";
var channel_1 = require("../../channel");
var mark_1 = require("../../mark");
var util_1 = require("../../util");
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
function parseMark(model) {
    if (util_1.contains([mark_1.LINE, mark_1.AREA], model.mark())) {
        return parsePathMark(model);
    }
    else {
        return parseNonPathMark(model);
    }
}
exports.parseMark = parseMark;
// FIXME: maybe this should not be here.  Need re-think and refactor, esp. after having all composition in.
function dataFrom(model) {
    var parent = model.parent();
    if (parent && parent.isFacet()) {
        return parent.facetedTable();
    }
    if (model.stack()) {
        return model.dataName('stacked');
    }
    return model.dataTable();
}
var FACETED_PATH_PREFIX = 'faceted-path-';
function parsePathMark(model) {
    var mark = model.mark();
    // FIXME: replace this with more general case for composition
    var details = detailFields(model);
    var pathMarks = [
        {
            name: model.name('marks'),
            type: markCompiler[mark].markType(),
            // If has subfacet for line/area group, need to use faceted data from below.
            // FIXME: support sorting path order (in connected scatterplot)
            from: { data: (details.length > 0 ? FACETED_PATH_PREFIX : '') + dataFrom(model) },
            encode: { update: markCompiler[mark].encodeEntry(model) }
        }
    ];
    if (details.length > 0) {
        // TODO: for non-stacked plot, map order to zindex. (Maybe rename order for layer to zindex?)
        return [{
                name: model.name('pathgroup'),
                type: 'group',
                from: {
                    facet: {
                        name: FACETED_PATH_PREFIX + dataFrom(model),
                        data: dataFrom(model),
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
function parseNonPathMark(model) {
    var mark = model.mark();
    var marks = []; // TODO: vgMarks
    if (mark === mark_1.TEXT &&
        model.channelHasField(channel_1.COLOR) &&
        model.config().text.applyColorToBackground &&
        !model.channelHasField(channel_1.X) &&
        !model.channelHasField(channel_1.Y)) {
        // add background to 'text' marks if has color
        marks.push({
            name: model.name('background'),
            type: 'rect',
            from: { data: dataFrom(model) },
            encode: { update: text_1.text.background(model) }
        });
    }
    // TODO: for non-stacked plot, map order to zindex. (Maybe rename order for layer to zindex?)
    marks.push({
        name: model.name('marks'),
        type: markCompiler[mark].markType(),
        from: { data: dataFrom(model) },
        encode: { update: markCompiler[mark].encodeEntry(model) }
    });
    return marks;
}
var NONSPATIAL_CHANNELS_EXCEPT_ORDER = util_1.without(channel_1.NONSPATIAL_CHANNELS, ['order']);
/**
 * Returns list of detail (group-by) fields
 * that the model's spec contains.
 */
function detailFields(model) {
    return NONSPATIAL_CHANNELS_EXCEPT_ORDER.reduce(function (details, channel) {
        if (model.channelHasField(channel) && !model.fieldDef(channel).aggregate) {
            details.push(model.field(channel));
        }
        return details;
    }, []);
}

},{"../../channel":10,"../../mark":64,"../../util":72,"./area":35,"./bar":36,"./line":38,"./point":40,"./rect":41,"./rule":42,"./text":43,"./tick":44}],40:[function(require,module,exports){
"use strict";
var channel_1 = require("../../channel");
var common_1 = require("./common");
var ref = require("./valueref");
function encodeEntry(model, fixedShape) {
    var e = {};
    var config = model.config();
    var markSpecificConfig = fixedShape ? config[fixedShape] : config.point;
    var stack = model.stack();
    // TODO: refactor how refer to scale as discussed in https://github.com/vega/vega-lite/pull/1613
    e.x = ref.stackable(channel_1.X, model.encoding().x, model.scaleName(channel_1.X), model.scale(channel_1.X), stack, ref.midX(config));
    e.y = ref.stackable(channel_1.Y, model.encoding().y, model.scaleName(channel_1.Y), model.scale(channel_1.Y), stack, ref.midY(config));
    e.size = ref.midPoint(channel_1.SIZE, model.encoding().size, model.scaleName(channel_1.SIZE), model.scale(channel_1.SIZE), { value: markSpecificConfig.size });
    e.shape = shape(model.encoding().shape, model.scaleName(channel_1.SHAPE), model.scale(channel_1.SHAPE), config.point, fixedShape);
    common_1.applyColorAndOpacity(e, model);
    return e;
}
function shape(shapeDef, scaleName, scale, pointConfig, fixedShape) {
    // shape
    if (fixedShape) {
        return { value: fixedShape };
    }
    return ref.midPoint(channel_1.SHAPE, shapeDef, scaleName, scale, { value: pointConfig.shape });
}
exports.point = {
    markType: function () {
        return 'symbol';
    },
    encodeEntry: function (model) {
        return encodeEntry(model);
    }
};
exports.circle = {
    markType: function () {
        return 'symbol';
    },
    encodeEntry: function (model) {
        return encodeEntry(model, 'circle');
    }
};
exports.square = {
    markType: function () {
        return 'symbol';
    },
    encodeEntry: function (model) {
        return encodeEntry(model, 'square');
    }
};

},{"../../channel":10,"./common":37,"./valueref":45}],41:[function(require,module,exports){
"use strict";
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var scale_1 = require("../../scale");
var mark_1 = require("../../mark");
var util_1 = require("../../util");
var log = require("../../log");
var common_1 = require("./common");
var ref = require("./valueref");
exports.rect = {
    markType: function () {
        return 'rect';
    },
    encodeEntry: function (model) {
        var e = util_1.extend(x(model), y(model));
        common_1.applyColorAndOpacity(e, model);
        return e;
    }
};
function x(model) {
    var e = {};
    var xDef = model.encoding().x;
    var x2Def = model.encoding().x2;
    var xScaleName = model.scaleName(channel_1.X);
    var xScale = model.scale(channel_1.X);
    if (fielddef_1.isFieldDef(xDef) && xDef.bin && !x2Def) {
        e.x2 = ref.bin(xDef, xScaleName, 'start');
        e.x = ref.bin(xDef, xScaleName, 'end');
    }
    else if (xScale && scale_1.hasDiscreteDomain(xScale.type)) {
        /* istanbul ignore else */
        if (xScale.type === scale_1.ScaleType.BAND) {
            e.x = ref.fieldRef(xDef, xScaleName, {});
            e.width = ref.band(xScaleName);
        }
        else {
            // We don't support rect mark with point/ordinal scale
            throw new Error(log.message.scaleTypeNotWorkWithMark(mark_1.RECT, xScale.type));
        }
    }
    else {
        e.x = ref.midPoint(channel_1.X, xDef, xScaleName, xScale, 'baseOrMax');
        e.x2 = ref.midPoint(channel_1.X2, x2Def, xScaleName, xScale, 'base');
    }
    return e;
}
function y(model) {
    var e = {};
    var yDef = model.encoding().y;
    var y2Def = model.encoding().y2;
    var yScaleName = model.scaleName(channel_1.Y);
    var yScale = model.scale(channel_1.Y);
    if (fielddef_1.isFieldDef(yDef) && yDef.bin && !y2Def) {
        e.y2 = ref.bin(yDef, yScaleName, 'start');
        e.y = ref.bin(yDef, yScaleName, 'end');
    }
    else if (yScale && scale_1.hasDiscreteDomain(yScale.type)) {
        /* istanbul ignore else */
        if (yScale.type === scale_1.ScaleType.BAND) {
            e.y = ref.fieldRef(yDef, yScaleName, {});
            e.height = ref.band(yScaleName);
        }
        else {
            // We don't support rect mark with point/ordinal scale
            throw new Error(log.message.scaleTypeNotWorkWithMark(mark_1.RECT, yScale.type));
        }
    }
    else {
        e.y = ref.midPoint(channel_1.Y, yDef, yScaleName, yScale, 'baseOrMax');
        e.y2 = ref.midPoint(channel_1.Y2, y2Def, yScaleName, yScale, 'base');
    }
    return e;
}

},{"../../channel":10,"../../fielddef":60,"../../log":63,"../../mark":64,"../../scale":65,"../../util":72,"./common":37,"./valueref":45}],42:[function(require,module,exports){
"use strict";
var channel_1 = require("../../channel");
var common_1 = require("./common");
var ref = require("./valueref");
exports.rule = {
    markType: function () {
        return 'rule';
    },
    encodeEntry: function (model) {
        var e = {};
        var orient = model.config().mark.orient;
        var config = model.config();
        // TODO: refactor how refer to scale as discussed in https://github.com/vega/vega-lite/pull/1613
        var stack = model.stack();
        e.x = ref.stackable(channel_1.X, model.encoding().x, model.scaleName(channel_1.X), model.scale(channel_1.X), stack, 'base');
        e.y = ref.stackable(channel_1.Y, model.encoding().y, model.scaleName(channel_1.Y), model.scale(channel_1.Y), stack, 'base');
        if (orient === 'vertical') {
            e.y2 = ref.stackable2(channel_1.Y2, model.encoding().y, model.encoding().y2, model.scaleName(channel_1.Y), model.scale(channel_1.Y), stack, 'baseOrMax');
        }
        else {
            e.x2 = ref.stackable2(channel_1.X2, model.encoding().x, model.encoding().x2, model.scaleName(channel_1.X), model.scale(channel_1.X), stack, 'baseOrMax');
        }
        // FIXME: this function would overwrite strokeWidth but shouldn't
        common_1.applyColorAndOpacity(e, model);
        e.strokeWidth = ref.midPoint(channel_1.SIZE, model.encoding().size, model.scaleName(channel_1.SIZE), model.scale(channel_1.SIZE), {
            value: config.rule.strokeWidth
        });
        return e;
    }
};

},{"../../channel":10,"./common":37,"./valueref":45}],43:[function(require,module,exports){
"use strict";
var channel_1 = require("../../channel");
var common_1 = require("../common");
var common_2 = require("./common");
var fielddef_1 = require("../../fielddef");
var type_1 = require("../../type");
var ref = require("./valueref");
exports.text = {
    markType: function () {
        return 'text';
    },
    background: function (model) {
        return {
            x: { value: 0 },
            y: { value: 0 },
            width: { field: { group: 'width' } },
            height: { field: { group: 'height' } },
            fill: {
                scale: model.scaleName(channel_1.COLOR),
                field: model.field(channel_1.COLOR)
            }
        };
    },
    encodeEntry: function (model) {
        var e = {};
        common_1.applyConfig(e, model.config().text, ['angle', 'align', 'baseline', 'dx', 'dy', 'font', 'fontWeight',
            'fontStyle', 'radius', 'theta', 'text']);
        var config = model.config();
        var stack = model.stack();
        var textDef = model.encoding().text;
        // TODO: refactor how refer to scale as discussed in https://github.com/vega/vega-lite/pull/1613
        e.x = ref.stackable(channel_1.X, model.encoding().x, model.scaleName(channel_1.X), model.scale(channel_1.X), stack, xDefault(config, textDef));
        e.y = ref.stackable(channel_1.Y, model.encoding().y, model.scaleName(channel_1.Y), model.scale(channel_1.Y), stack, ref.midY(config));
        e.fontSize = ref.midPoint(channel_1.SIZE, model.encoding().size, model.scaleName(channel_1.SIZE), model.scale(channel_1.SIZE), { value: config.text.fontSize });
        e.text = textRef(textDef, config);
        if (model.config().text.applyColorToBackground &&
            !model.channelHasField(channel_1.X) &&
            !model.channelHasField(channel_1.Y)) {
            e.fill = { value: 'black' }; // TODO: add rules for swapping between black and white
            // opacity
            var opacity = model.config().mark.opacity;
            if (opacity) {
                e.opacity = { value: opacity };
            }
            ;
        }
        else {
            common_2.applyColorAndOpacity(e, model);
        }
        return e;
    }
};
function xDefault(config, textDef) {
    if (fielddef_1.isFieldDef(textDef) && textDef.type === type_1.QUANTITATIVE) {
        return { field: { group: 'width' }, offset: -5 };
    }
    // TODO: allow this to fit (Be consistent with ref.midX())
    return { value: config.scale.textXRangeStep / 2 };
}
function textRef(textDef, config) {
    // text
    if (textDef) {
        if (fielddef_1.isFieldDef(textDef)) {
            if (type_1.QUANTITATIVE === textDef.type) {
                // FIXME: what happens if we have bin?
                var format = common_1.numberFormat(textDef, config.text.format, config, channel_1.TEXT);
                return {
                    signal: "format(" + fielddef_1.field(textDef, { datum: true }) + ", '" + format + "')"
                };
            }
            else if (type_1.TEMPORAL === textDef.type) {
                return {
                    signal: common_1.timeFormatExpression(fielddef_1.field(textDef, { datum: true }), textDef.timeUnit, config.text.format, config.text.shortTimeLabels, config)
                };
            }
            else {
                return { field: textDef.field };
            }
        }
        else if (textDef.value) {
            return { value: textDef.value };
        }
    }
    return { value: config.text.text };
}

},{"../../channel":10,"../../fielddef":60,"../../type":71,"../common":14,"./common":37,"./valueref":45}],44:[function(require,module,exports){
"use strict";
var channel_1 = require("../../channel");
var common_1 = require("./common");
var ref = require("./valueref");
exports.tick = {
    markType: function () {
        return 'rect';
    },
    encodeEntry: function (model) {
        var e = {};
        var config = model.config();
        var stack = model.stack();
        // TODO: refactor how refer to scale as discussed in https://github.com/vega/vega-lite/pull/1613
        e.xc = ref.stackable(channel_1.X, model.encoding().x, model.scaleName(channel_1.X), model.scale(channel_1.X), stack, ref.midX(config));
        e.yc = ref.stackable(channel_1.Y, model.encoding().y, model.scaleName(channel_1.Y), model.scale(channel_1.Y), stack, ref.midY(config));
        if (config.mark.orient === 'horizontal') {
            e.width = size(model.encoding().size, model.scaleName(channel_1.SIZE), model.scale(channel_1.SIZE), config, (model.scale(channel_1.X) || {}).rangeStep);
            e.height = { value: config.tick.thickness };
        }
        else {
            e.width = { value: config.tick.thickness };
            e.height = size(model.encoding().size, model.scaleName(channel_1.SIZE), model.scale(channel_1.SIZE), config, (model.scale(channel_1.Y) || {}).rangeStep);
        }
        common_1.applyColorAndOpacity(e, model);
        return e;
    }
};
function size(fieldDef, scaleName, scale, config, scaleRangeStep) {
    var defaultSize;
    if (config.tick.bandSize !== undefined) {
        defaultSize = config.tick.bandSize;
    }
    else {
        var rangeStep = scaleRangeStep !== undefined ?
            scaleRangeStep :
            config.scale.rangeStep;
        if (typeof rangeStep !== 'number') {
            // FIXME consolidate this log
            throw new Error('Function does not handle non-numeric rangeStep');
        }
        defaultSize = rangeStep / 1.5;
    }
    return ref.midPoint(channel_1.SIZE, fieldDef, scaleName, scale, { value: defaultSize });
}

},{"../../channel":10,"./common":37,"./valueref":45}],45:[function(require,module,exports){
/**
 * Utility files for producing Vega ValueRef for marks
 */
"use strict";
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var scale_1 = require("../../scale");
var util_1 = require("../../util");
// TODO: we need to find a way to refactor these so that scaleName is a part of scale
// but that's complicated.  For now, this is a huge step moving forward.
/**
 * @return Vega ValueRef for stackable x or y
 */
function stackable(channel, channelDef, scaleName, scale, stack, defaultRef) {
    if (channelDef && stack && channel === stack.fieldChannel) {
        // x or y use stack_end so that stacked line's point mark use stack_end too.
        return fieldRef(channelDef, scaleName, { suffix: 'end' });
    }
    return midPoint(channel, channelDef, scaleName, scale, defaultRef);
}
exports.stackable = stackable;
/**
 * @return Vega ValueRef for stackable x2 or y2
 */
function stackable2(channel, aFieldDef, a2fieldDef, scaleName, scale, stack, defaultRef) {
    if (aFieldDef && stack &&
        // If fieldChannel is X and channel is X2 (or Y and Y2)
        channel.charAt(0) === stack.fieldChannel.charAt(0)) {
        return fieldRef(aFieldDef, scaleName, { suffix: 'start' });
    }
    return midPoint(channel, a2fieldDef, scaleName, scale, defaultRef);
}
exports.stackable2 = stackable2;
/**
 * Value Ref for binned fields
 */
function bin(fieldDef, scaleName, side, offset) {
    return fieldRef(fieldDef, scaleName, { binSuffix: side }, offset);
}
exports.bin = bin;
function fieldRef(fieldDef, scaleName, opt, offset) {
    var ref = {
        scale: scaleName,
        field: fielddef_1.field(fieldDef, opt),
    };
    if (offset) {
        ref.offset = offset;
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
function binMidSignal(fieldDef, scaleName) {
    return {
        scale: scaleName,
        signal: '(' + fielddef_1.field(fieldDef, { binSuffix: 'start', datum: true }) + '+' +
            fielddef_1.field(fieldDef, { binSuffix: 'end', datum: true }) + ')/2'
    };
}
exports.binMidSignal = binMidSignal;
/**
 * @returns {VgValueRef} Value Ref for xc / yc or mid point for other channels.
 */
function midPoint(channel, channelDef, scaleName, scale, defaultRef) {
    // TODO: datum support
    if (channelDef) {
        /* istanbul ignore else */
        if (fielddef_1.isFieldDef(channelDef)) {
            if (scale_1.hasDiscreteDomain(scale.type)) {
                if (scale.type === 'band') {
                    // For band, to get mid point, need to offset by half of the band
                    return fieldRef(channelDef, scaleName, { binSuffix: 'range' }, band(scaleName, 0.5));
                }
                return fieldRef(channelDef, scaleName, { binSuffix: 'range' });
            }
            else {
                if (channelDef.bin) {
                    return binMidSignal(channelDef, scaleName);
                }
                else {
                    return fieldRef(channelDef, scaleName, {}); // no need for bin suffix
                }
            }
        }
        else if (channelDef.value) {
            return {
                value: channelDef.value
            };
        }
        else {
            throw new Error('FieldDef without field or value.'); // FIXME add this to log.message
        }
    }
    if (defaultRef === 'base') {
        /* istanbul ignore else */
        if (channel === channel_1.X || channel === channel_1.X2) {
            return baseX(scaleName, scale);
        }
        else if (channel === channel_1.Y || channel === channel_1.Y2) {
            return baseY(scaleName, scale);
        }
        else {
            throw new Error("Unsupported channel " + channel + " for base function"); // FIXME add this to log.message
        }
    }
    else if (defaultRef === 'baseOrMax') {
        /* istanbul ignore else */
        if (channel === channel_1.X || channel === channel_1.X2) {
            return baseOrMaxX(scaleName, scale);
        }
        else if (channel === channel_1.Y || channel === channel_1.Y2) {
            return baseOrMaxY(scaleName, scale);
        }
        else {
            throw new Error("Unsupported channel " + channel + " for base function"); // FIXME add this to log.message
        }
    }
    return defaultRef;
}
exports.midPoint = midPoint;
function midX(config) {
    if (typeof config.scale.rangeStep === 'string') {
        // TODO: For fit-mode, use middle of the width
        throw new Error('midX can not handle string rangeSteps');
    }
    return { value: config.scale.rangeStep / 2 };
}
exports.midX = midX;
function midY(config) {
    if (typeof config.scale.rangeStep === 'string') {
        // TODO: For fit-mode, use middle of the width
        throw new Error('midX can not handle string rangeSteps');
    }
    return { value: config.scale.rangeStep / 2 };
}
exports.midY = midY;
function baseX(scaleName, scale) {
    if (scaleName) {
        // Log / Time / UTC scale do not support zero
        if (!util_1.contains([scale_1.ScaleType.LOG, scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scale.type) &&
            scale.zero !== false) {
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
function baseOrMaxX(scaleName, scale) {
    if (scaleName) {
        // Log / Time / UTC scale do not support zero
        if (!util_1.contains([scale_1.ScaleType.LOG, scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scale.type) &&
            scale.zero !== false) {
            return {
                scale: scaleName,
                value: 0
            };
        }
    }
    return { field: { group: 'width' } };
}
function baseY(scaleName, scale) {
    if (scaleName) {
        // Log / Time / UTC scale do not support zero
        if (!util_1.contains([scale_1.ScaleType.LOG, scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scale.type) &&
            scale.zero !== false) {
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
function baseOrMaxY(scaleName, scale) {
    if (scaleName) {
        // Log / Time / UTC scale do not support zero
        if (!util_1.contains([scale_1.ScaleType.LOG, scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scale.type) &&
            scale.zero !== false) {
            return {
                scale: scaleName,
                value: 0
            };
        }
    }
    // Put the mark on the y-axis
    return { value: 0 };
}

},{"../../channel":10,"../../fielddef":60,"../../scale":65,"../../util":72}],46:[function(require,module,exports){
"use strict";
var log = require("../log");
var channel_1 = require("../channel");
var encoding_1 = require("../encoding");
var fielddef_1 = require("../fielddef");
var scale_1 = require("../scale");
var util_1 = require("../util");
var scale_2 = require("./scale/scale");
var NameMap = (function () {
    function NameMap() {
        this._nameMap = {};
    }
    NameMap.prototype.rename = function (oldName, newName) {
        this._nameMap[oldName] = newName;
    };
    NameMap.prototype.has = function (name) {
        return this._nameMap[name] !== undefined;
    };
    NameMap.prototype.get = function (name) {
        // If the name appears in the _nameMap, we need to read its new name.
        // We have to loop over the dict just in case the new name also gets renamed.
        while (this._nameMap[name]) {
            name = this._nameMap[name];
        }
        return name;
    };
    return NameMap;
}());
var Model = (function () {
    function Model(spec, parent, parentGivenName) {
        this._scale = {};
        this._axis = {};
        this._legend = {};
        this._parent = parent;
        // If name is not provided, always use parent's givenName to avoid name conflicts.
        this._name = spec.name || parentGivenName;
        // Shared name maps
        this._dataNameMap = parent ? parent._dataNameMap : new NameMap();
        this._scaleNameMap = parent ? parent._scaleNameMap : new NameMap();
        this._sizeNameMap = parent ? parent._sizeNameMap : new NameMap();
        this._data = spec.data;
        this._description = spec.description;
        this._padding = spec.padding;
        this._transform = spec.transform;
        if (spec.transform) {
            if (spec.transform.filterInvalid === undefined &&
                spec.transform['filterNull'] !== undefined) {
                spec.transform.filterInvalid = spec.transform['filterNull'];
                log.warn(log.message.DEPRECATED_FILTER_NULL);
            }
        }
        this.component = { data: null, layout: null, mark: null, scale: null, axis: null, axisGroup: null, gridGroup: null, legend: null };
    }
    Model.prototype.parse = function () {
        this.parseData();
        this.parseSelectionData();
        this.parseLayoutData();
        this.parseScale(); // depends on data name
        this.parseAxis(); // depends on scale name
        this.parseLegend(); // depends on scale name
        this.parseAxisGroup(); // depends on child axis
        this.parseGridGroup();
        this.parseMark(); // depends on data name and scale name, axisGroup, gridGroup and children's scale, axis, legend and mark.
    };
    // TODO: for Arvind to write
    // public abstract assembleSelectionSignal(layoutData: VgData[]): VgData[];
    // public abstract assembleSelectionData(layoutData: VgData[]): VgData[];
    Model.prototype.assembleScales = function () {
        // FIXME: write assembleScales() in scale.ts that
        // help assemble scale domains with scale signature as well
        return util_1.flatten(util_1.vals(this.component.scale).map(function (scales) {
            var arr = [scales.main];
            if (scales.binLegend) {
                arr.push(scales.binLegend);
            }
            if (scales.binLegendLabel) {
                arr.push(scales.binLegendLabel);
            }
            return arr;
        }));
    };
    Model.prototype.assembleAxes = function () {
        return [].concat.apply([], util_1.vals(this.component.axis));
    };
    Model.prototype.assembleLegends = function () {
        return util_1.vals(this.component.legend);
    };
    Model.prototype.assembleGroup = function () {
        var group = {};
        // TODO: consider if we want scales to come before marks in the output spec.
        group.marks = this.assembleMarks();
        var scales = this.assembleScales();
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
    Model.prototype.reduce = function (f, init, t) {
        return encoding_1.reduce(this.mapping(), f, init, t);
    };
    Model.prototype.forEach = function (f, t) {
        encoding_1.forEach(this.mapping(), f, t);
    };
    Model.prototype.hasDescendantWithFieldOnChannel = function (channel) {
        for (var _i = 0, _a = this.children(); _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.isUnit()) {
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
    Model.prototype.parent = function () {
        return this._parent;
    };
    Model.prototype.name = function (text, delimiter) {
        if (delimiter === void 0) { delimiter = '_'; }
        return (this._name ? this._name + delimiter : '') + text;
    };
    Model.prototype.description = function () {
        return this._description;
    };
    Model.prototype.padding = function () {
        return this._padding;
    };
    Model.prototype.data = function () {
        return this._data;
    };
    Model.prototype.renameData = function (oldName, newName) {
        this._dataNameMap.rename(oldName, newName);
    };
    /**
     * Return the data source name for the given data source type.
     *
     * For unit spec, this is always simply the spec.name + '-' + dataSourceType.
     * We already use the name map so that marks and scales use the correct data.
     */
    Model.prototype.dataName = function (dataSourceType) {
        return this._dataNameMap.get(this.name(String(dataSourceType)));
    };
    Model.prototype.renameSize = function (oldName, newName) {
        this._sizeNameMap.rename(oldName, newName);
    };
    Model.prototype.channelSizeName = function (channel) {
        return this.sizeName(channel === channel_1.X || channel === channel_1.COLUMN ? 'width' : 'height');
    };
    Model.prototype.sizeName = function (size) {
        return this._sizeNameMap.get(this.name(size, '_'));
    };
    // TRANSFORMS
    Model.prototype.calculate = function () {
        return this._transform ? this._transform.calculate : undefined;
    };
    Model.prototype.filterInvalid = function () {
        var transform = this._transform || {};
        if (transform.filterInvalid === undefined) {
            return this.parent() ? this.parent().filterInvalid() : undefined;
        }
        return transform.filterInvalid;
    };
    Model.prototype.filter = function () {
        return this._transform ? this._transform.filter : undefined;
    };
    /** Get "field" reference for vega */
    Model.prototype.field = function (channel, opt) {
        if (opt === void 0) { opt = {}; }
        var fieldDef = this.fieldDef(channel);
        if (fieldDef.bin) {
            opt = util_1.extend({
                binSuffix: scale_1.hasDiscreteDomain(this.scale(channel).type) ? 'range' : 'start'
            }, opt);
        }
        return fielddef_1.field(fieldDef, opt);
    };
    Model.prototype.scale = function (channel) {
        return this._scale[channel];
    };
    Model.prototype.hasDiscreteScale = function (channel) {
        var scale = this.scale(channel);
        return scale && scale_1.hasDiscreteDomain(scale.type);
    };
    Model.prototype.renameScale = function (oldName, newName) {
        this._scaleNameMap.rename(oldName, newName);
    };
    /**
     * @return scale name for a given channel after the scale has been parsed and named.
     * (DO NOT USE THIS METHOD DURING SCALE PARSING, use model.name() instead)
     */
    Model.prototype.scaleName = function (originalScaleName, parse) {
        var channel = originalScaleName.replace(scale_2.BIN_LEGEND_SUFFIX, '').replace(scale_2.BIN_LEGEND_LABEL_SUFFIX, '');
        if (parse) {
            // During the parse phase always return a value
            // No need to refer to rename map because a scale can't be renamed
            // before it has the original name.
            return this.name(originalScaleName + '');
        }
        // If there is a scale for the channel, it should either
        // be in the _scale mapping or exist in the name map
        if (
        // in the scale map (the scale is not merged by its parent)
        (this._scale && this._scale[channel]) ||
            // in the scale name map (the the scale get merged by its parent)
            this._scaleNameMap.has(this.name(originalScaleName + ''))) {
            return this._scaleNameMap.get(this.name(originalScaleName + ''));
        }
        return undefined;
    };
    Model.prototype.sort = function (channel) {
        return (this.mapping()[channel] || {}).sort;
    };
    Model.prototype.axis = function (channel) {
        return this._axis[channel];
    };
    Model.prototype.legend = function (channel) {
        return this._legend[channel];
    };
    /**
     * Get the spec configuration.
     */
    Model.prototype.config = function () {
        return this._config;
    };
    /**
     * Type checks
     */
    Model.prototype.isUnit = function () {
        return false;
    };
    Model.prototype.isFacet = function () {
        return false;
    };
    Model.prototype.isLayer = function () {
        return false;
    };
    return Model;
}());
exports.Model = Model;

},{"../channel":10,"../encoding":58,"../fielddef":60,"../log":63,"../scale":65,"../util":72,"./scale/scale":52}],47:[function(require,module,exports){
"use strict";
var log = require("../../log");
var aggregate_1 = require("../../aggregate");
var data_1 = require("../../data");
var datetime_1 = require("../../datetime");
var scale_1 = require("../../scale");
var sort_1 = require("../../sort");
var stack_1 = require("../../stack");
var vega_schema_1 = require("../../vega.schema");
var util = require("../../util");
function domain(scale, model, channel) {
    var fieldDef = model.fieldDef(channel);
    if (scale.domain) {
        if (datetime_1.isDateTime(scale.domain[0])) {
            return scale.domain.map(function (dt) {
                return datetime_1.timestamp(dt, true);
            });
        }
        return scale.domain;
    }
    // special case for temporal scale
    if (fieldDef.type === 'temporal') {
        return {
            data: model.dataTable(),
            field: model.field(channel),
            sort: {
                field: model.field(channel),
                op: 'min'
            }
        };
    }
    // For stack, use STACKED data.
    var stack = model.stack();
    if (stack && channel === stack.fieldChannel) {
        if (stack.offset === stack_1.StackOffset.NORMALIZE) {
            return [0, 1];
        }
        return {
            data: model.dataName('stacked'),
            fields: [
                model.field(channel, { suffix: 'start' }),
                model.field(channel, { suffix: 'end' })
            ]
        };
    }
    // FIXME refactor _useRawDomain's signature
    var useRawDomain = _useRawDomain(scale, model, channel);
    var sort = domainSort(model, channel, scale.type);
    if (useRawDomain) {
        return {
            data: data_1.SOURCE,
            field: model.field(channel, {
                // no aggregate rather than nofn as bin and timeUnit is fine
                noAggregate: true
            })
        };
    }
    else if (fieldDef.bin) {
        if (scale_1.hasDiscreteDomain(scale.type)) {
            // ordinal bin scale takes domain from bin_range, ordered by bin_start
            // This is useful for both axis-based scale (x, y, column, and row) and legend-based scale (other channels).
            return {
                data: model.dataTable(),
                field: model.field(channel, { binSuffix: 'range' }),
                sort: {
                    field: model.field(channel, { binSuffix: 'start' }),
                    op: 'min' // min or max doesn't matter since same _range would have the same _start
                }
            };
        }
        else {
            if (channel === 'x' || channel === 'y') {
                // X/Y position have to include start and end for non-ordinal scale
                return {
                    data: model.dataTable(),
                    fields: [
                        model.field(channel, { binSuffix: 'start' }),
                        model.field(channel, { binSuffix: 'end' })
                    ]
                };
            }
            else {
                // TODO: use bin_mid
                return {
                    data: model.dataTable(),
                    field: model.field(channel, { binSuffix: 'start' })
                };
            }
        }
    }
    else if (sort) {
        return {
            // If sort by aggregation of a specified sort field, we need to use SOURCE table,
            // so we can aggregate values for the scale independently from the main aggregation.
            data: util.isBoolean(sort) ? model.dataTable() : data_1.SOURCE,
            field: model.field(channel),
            sort: sort
        };
    }
    else {
        return {
            data: model.dataTable(),
            field: model.field(channel),
        };
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = domain;
function domainSort(model, channel, scaleType) {
    if (!scale_1.hasDiscreteDomain(scaleType)) {
        return undefined;
    }
    var sort = model.sort(channel);
    // Sorted based on an aggregate calculation over a specified sort field (only for ordinal scale)
    if (sort_1.isSortField(sort)) {
        return {
            op: sort.op,
            field: sort.field
        };
    }
    if (util.contains([sort_1.SortOrder.ASCENDING, sort_1.SortOrder.DESCENDING, undefined /* default =ascending*/], sort)) {
        return true;
    }
    // sort === 'none'
    return undefined;
}
exports.domainSort = domainSort;
/**
 * Determine if useRawDomain should be activated for this scale.
 * @return {Boolean} Returns true if all of the following conditons applies:
 * 1. `useRawDomain` is enabled either through scale or config
 * 2. Aggregation function is not `count` or `sum`
 * 3. The scale is quantitative or time scale.
 */
function _useRawDomain(scale, model, channel) {
    var fieldDef = model.fieldDef(channel);
    return scale.useRawDomain &&
        // only applied to aggregate table
        fieldDef.aggregate &&
        // only activated if used with aggregate functions that produces values ranging in the domain of the source data
        aggregate_1.SHARED_DOMAIN_OPS.indexOf(fieldDef.aggregate) >= 0 &&
        (
        // Q always uses quantitative scale except when it's binned.
        // Binned field has similar values in both the source table and the summary table
        // but the summary table has fewer values, therefore binned fields draw
        // domain values from the summary table.
        // Meanwhile, we rely on non-positive filter inside summary data source, thus
        // we can't use raw domain to feed into log scale
        // FIXME(https://github.com/vega/vega-lite/issues/1537):
        // consider allowing useRawDomain for log scale once we reimplement data sources
        (fieldDef.type === 'quantitative' && !fieldDef.bin && scale.type !== scale_1.ScaleType.LOG) ||
            // T uses non-ordinal scale when there's no unit or when the unit is not ordinal.
            (fieldDef.type === 'temporal' && util.contains([scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scale.type)));
}
/**
 * Convert the domain to an array of data refs or an array of values. Also, throw
 * away sorting information since we always sort the domain when we union two domains.
 */
function normalizeDomain(domain) {
    if (util.isArray(domain)) {
        return [domain];
    }
    else if (vega_schema_1.isDataRefDomain(domain)) {
        delete domain.sort;
        return [domain];
    }
    else if (vega_schema_1.isFieldRefUnionDomain(domain)) {
        return domain.fields.map(function (d) {
            return {
                data: domain.data,
                field: d
            };
        });
    }
    else if (vega_schema_1.isDataRefUnionedDomain(domain)) {
        return domain.fields.map(function (d) {
            if (util.isArray(d)) {
                return d;
            }
            return {
                field: d.field,
                data: d.data
            };
        });
    }
    /* istanbul ignore next: This should never happen. */
    throw new Error(log.message.INVAID_DOMAIN);
}
/**
 * Union two data domains. A unioned domain is always sorted.
 */
function unionDomains(domain1, domain2) {
    var normalizedDomain1 = normalizeDomain(domain1);
    var normalizedDomain2 = normalizeDomain(domain2);
    var domains = normalizedDomain1.concat(normalizedDomain2);
    domains = util.unique(domains, util.hash);
    if (domains.length > 1) {
        var allData = domains.map(function (d) {
            if (vega_schema_1.isDataRefDomain(d)) {
                return d.data;
            }
            return null;
        });
        if (util.unique(allData, function (x) { return x; }).length === 1 && allData[0] !== null) {
            return {
                data: allData[0],
                fields: domains.map(function (d) { return d.field; })
            };
        }
        return { fields: domains, sort: true };
    }
    else {
        return domains[0];
    }
}
exports.unionDomains = unionDomains;

},{"../../aggregate":7,"../../data":56,"../../datetime":57,"../../log":63,"../../scale":65,"../../sort":66,"../../stack":68,"../../util":72,"../../vega.schema":74}],48:[function(require,module,exports){
"use strict";
var log = require("../../log");
var scale_1 = require("../../scale");
var range_1 = require("./range");
var rules = require("./rules");
var type_1 = require("./type");
var util = require("../../util");
/**
 * Initialize Vega-Lite Scale's properties
 *
 * Note that we have to apply these rules here because:
 * - many other scale and non-scale properties (including layout, mark) depend on scale type
 * - layout depends on padding
 * - range depends on zero and size (width and height) depends on range
 */
function init(channel, fieldDef, config, mark, topLevelSize, xyRangeSteps) {
    var specifiedScale = (fieldDef || {}).scale || {};
    var scale = {
        type: type_1.default(specifiedScale.type, fieldDef.type, channel, fieldDef.timeUnit, mark, topLevelSize !== undefined, specifiedScale.rangeStep, config.scale)
    };
    // Use specified value if compatible or determine default values for each property
    [
        // general properties
        'domain',
        'round',
        // quantitative / time
        'clamp', 'nice',
        // quantitative
        'exponent', 'zero',
        // ordinal
        'padding', 'paddingInner', 'paddingOuter',
        'useRawDomain'
    ].forEach(function (property) {
        var specifiedValue = specifiedScale[property];
        var supportedByScaleType = scale_1.scaleTypeSupportProperty(scale.type, property);
        var channelIncompatability = scale_1.channelScalePropertyIncompatability(channel, property);
        if (specifiedValue !== undefined) {
            // If there is a specified value, check if it is compatible with scale type and channel
            if (!supportedByScaleType) {
                log.warn(log.message.scalePropertyNotWorkWithScaleType(scale.type, property, channel));
            }
            else if (channelIncompatability) {
                log.warn(channelIncompatability);
            }
            else {
                scale[property] = specifiedValue;
            }
            return;
        }
        else {
            // If there is no property specified, check if we need to determine default value.
            if (supportedByScaleType && channelIncompatability === undefined) {
                var value = getDefaultValue(property, scale, channel, fieldDef, config.scale);
                if (value !== undefined) {
                    scale[property] = value;
                }
            }
        }
    });
    return util.extend(scale, range_1.default(channel, scale.type, fieldDef.type, specifiedScale, config, scale.zero, mark, topLevelSize, xyRangeSteps));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = init;
function getDefaultValue(property, scale, channel, fieldDef, scaleConfig) {
    // If we have default rule-base, determine default value first
    switch (property) {
        case 'nice':
            return rules.nice(scale.type, channel, fieldDef);
        case 'padding':
            return rules.padding(channel, scale.type, scaleConfig);
        case 'paddingInner':
            return rules.paddingInner(scale.padding, channel, scaleConfig);
        case 'paddingOuter':
            return rules.paddingOuter(scale.padding, channel, scale.type, scale.paddingInner, scaleConfig);
        case 'round':
            return rules.round(channel, scaleConfig);
        case 'zero':
            return rules.zero(scale, channel, fieldDef);
    }
    // Otherwise, use scale config
    return scaleConfig[property];
}

},{"../../log":63,"../../scale":65,"../../util":72,"./range":50,"./rules":51,"./type":53}],49:[function(require,module,exports){
"use strict";
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var scale_1 = require("../../scale");
var sort_1 = require("../../sort");
var scale_2 = require("./scale");
var domain_1 = require("./domain");
var range_1 = require("./range");
/**
 * Parse scales for all channels of a model.
 */
function parseScaleComponent(model) {
    // TODO: should model.channels() inlcude X2/Y2?
    return model.channels().reduce(function (scaleComponentsIndex, channel) {
        var scaleComponents = parseScale(model, channel);
        if (scaleComponents) {
            scaleComponentsIndex[channel] = scaleComponents;
        }
        return scaleComponentsIndex;
    }, {});
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseScaleComponent;
/**
 * Parse scales for a single channel of a model.
 */
function parseScale(model, channel) {
    if (model.scale(channel)) {
        var fieldDef = model.fieldDef(channel);
        var scales = {
            main: parseMainScale(model, channel)
        };
        // Add additional scale needed for the labels in the binned legend.
        if (model.legend(channel) && fieldDef.bin && scale_1.hasContinuousDomain(model.scale(channel).type)) {
            scales.binLegend = parseBinLegend(channel, model);
            scales.binLegendLabel = parseBinLegendLabel(channel, model, fieldDef);
        }
        return scales;
    }
    return null;
}
exports.parseScale = parseScale;
// TODO: consider return type of this method
// maybe we should just return domain as we can have the rest of scale (ScaleSignature constant)
/**
 * Return the main scale for each channel.  (Only color can have multiple scales.)
 */
function parseMainScale(model, channel) {
    var scale = model.scale(channel);
    var sort = model.sort(channel);
    var scaleComponent = {
        name: model.scaleName(channel + '', true),
        type: scale.type,
        domain: parseDomain(model, channel),
        range: range_1.parseRange(scale)
    };
    ['round',
        // quantitative / time
        'clamp', 'nice',
        // quantitative
        'exponent', 'zero',
        // ordinal
        'padding', 'paddingInner', 'paddingOuter',
    ].forEach(function (property) {
        scaleComponent[property] = scale[property];
    });
    if (sort && (sort_1.isSortField(sort) ? sort.order : sort) === sort_1.SortOrder.DESCENDING) {
        scaleComponent.reverse = true;
    }
    return scaleComponent;
}
function parseDomain(model, channel) {
    var scale = model.scale(channel);
    // If channel is either X or Y then union them with X2 & Y2 if they exist
    if (channel === channel_1.X && model.channelHasField(channel_1.X2)) {
        if (model.channelHasField(channel_1.X)) {
            return domain_1.unionDomains(domain_1.default(scale, model, channel_1.X), domain_1.default(scale, model, channel_1.X2));
        }
        else {
            return domain_1.default(scale, model, channel_1.X2);
        }
    }
    else if (channel === channel_1.Y && model.channelHasField(channel_1.Y2)) {
        if (model.channelHasField(channel_1.Y)) {
            return domain_1.unionDomains(domain_1.default(scale, model, channel_1.Y), domain_1.default(scale, model, channel_1.Y2));
        }
        else {
            return domain_1.default(scale, model, channel_1.Y2);
        }
    }
    return domain_1.default(scale, model, channel);
}
exports.parseDomain = parseDomain;
/**
 * Return additional scale to drive legend when we use a continuous scale and binning.
 */
function parseBinLegend(channel, model) {
    return {
        name: model.scaleName(channel, true) + scale_2.BIN_LEGEND_SUFFIX,
        type: scale_1.ScaleType.POINT,
        domain: {
            data: model.dataTable(),
            field: model.field(channel),
            sort: true
        },
        range: [0, 1] // doesn't matter because we override it
    };
}
/**
 *  Return an additional scale for bin labels because we need to map bin_start to bin_range in legends
 */
function parseBinLegendLabel(channel, model, fieldDef) {
    return {
        name: model.scaleName(channel, true) + scale_2.BIN_LEGEND_LABEL_SUFFIX,
        type: scale_1.ScaleType.ORDINAL,
        domain: {
            data: model.dataTable(),
            field: model.field(channel),
            sort: true
        },
        range: {
            data: model.dataTable(),
            field: fielddef_1.field(fieldDef, { binSuffix: 'range' }),
            sort: {
                field: model.field(channel, { binSuffix: 'start' }),
                op: 'min' // min or max doesn't matter since same _range would have the same _start
            }
        }
    };
}

},{"../../channel":10,"../../fielddef":60,"../../scale":65,"../../sort":66,"./domain":47,"./range":50,"./scale":52}],50:[function(require,module,exports){
"use strict";
var log = require("../../log");
var channel_1 = require("../../channel");
var scale_1 = require("../../scale");
var util = require("../../util");
function parseRange(scale) {
    if (scale.rangeStep) {
        return { step: scale.rangeStep };
    }
    else if (scale.scheme) {
        var scheme = scale.scheme;
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
        else {
            return { scheme: scheme };
        }
    }
    return scale.range;
}
exports.parseRange = parseRange;
/**
 * Return mixins that includes one of the range properties (range, rangeStep, scheme).
 */
function rangeMixins(channel, scaleType, type, specifiedScale, config, zero, mark, topLevelSize, xyRangeSteps) {
    var specifiedRangeStepIsNull = false;
    // Check if any of the range properties is specified.
    // If so, check if it is compatible and make sure that we only output one of the properties
    for (var _i = 0, _a = ['range', 'rangeStep', 'scheme']; _i < _a.length; _i++) {
        var property = _a[_i];
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
                        return { range: specifiedScale[property] };
                    case 'scheme':
                        return { scheme: specifiedScale[property] };
                    case 'rangeStep':
                        if (topLevelSize === undefined) {
                            var stepSize = specifiedScale[property];
                            if (stepSize !== null) {
                                return { rangeStep: stepSize };
                            }
                            else {
                                specifiedRangeStepIsNull = true;
                            }
                        }
                        else {
                            // If top-level size is specified, we ignore specified rangeStep.
                            log.warn(log.message.rangeStepDropped(channel));
                        }
                }
            }
        }
    }
    switch (channel) {
        // TODO: revise row/column when facetSpec has top-level width/height
        case channel_1.ROW:
            return { range: 'height' };
        case channel_1.COLUMN:
            return { range: 'width' };
        case channel_1.X:
        case channel_1.Y:
            if (topLevelSize === undefined) {
                if (util.contains(['point', 'band'], scaleType) && !specifiedRangeStepIsNull) {
                    if (channel === channel_1.X && mark === 'text') {
                        if (config.scale.textXRangeStep) {
                            return { rangeStep: config.scale.textXRangeStep };
                        }
                    }
                    else {
                        if (config.scale.rangeStep) {
                            return { rangeStep: config.scale.rangeStep };
                        }
                    }
                }
                // If specified range step is null or the range step config is null.
                // Use default topLevelSize rule/config
                topLevelSize = channel === channel_1.X ? config.cell.width : config.cell.height;
            }
            return { range: channel === channel_1.X ? [0, topLevelSize] : [topLevelSize, 0] };
        case channel_1.SIZE:
            // TODO: support custom rangeMin, rangeMax
            var rangeMin = sizeRangeMin(mark, zero, config);
            var rangeMax = sizeRangeMax(mark, xyRangeSteps, config);
            return { range: [rangeMin, rangeMax] };
        case channel_1.SHAPE:
        case channel_1.COLOR:
            return { range: defaultRange(channel, scaleType, type, mark) };
        case channel_1.OPACITY:
            // TODO: support custom rangeMin, rangeMax
            return { range: [config.mark.minOpacity, config.mark.maxOpacity] };
    }
    /* istanbul ignore next: should never reach here */
    throw new Error("Scale range undefined for channel " + channel);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = rangeMixins;
function defaultRange(channel, scaleType, type, mark) {
    switch (channel) {
        case channel_1.SHAPE:
            return 'symbol';
        case channel_1.COLOR:
            if (scaleType === 'ordinal') {
                // Only nominal data uses ordinal scale by default
                return type === 'nominal' ? 'category' : 'ordinal';
            }
            return mark === 'rect' ? 'heatmap' : 'ramp';
    }
}
function sizeRangeMin(mark, zero, config) {
    if (zero) {
        return 0;
    }
    switch (mark) {
        case 'bar':
            return config.bar.minBandSize !== undefined ? config.bar.minBandSize : config.bar.continuousBandSize;
        case 'tick':
            return config.tick.minBandSize;
        case 'rule':
            return config.rule.minStrokeWidth;
        case 'text':
            return config.text.minFontSize;
        case 'point':
            return config.point.minSize;
        case 'square':
            return config.square.minSize;
        case 'circle':
            return config.circle.minSize;
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
            if (config.bar.maxBandSize !== undefined) {
                return config.bar.maxBandSize;
            }
            return minXYRangeStep(xyRangeSteps, config.mark) - 1;
        case 'tick':
            if (config.tick.maxBandSize !== undefined) {
                return config.tick.maxBandSize;
            }
            return minXYRangeStep(xyRangeSteps, config.mark) - 1;
        case 'rule':
            return config.rule.maxStrokeWidth;
        case 'text':
            return config.text.maxFontSize;
        case 'point':
        case 'square':
        case 'circle':
            if (config[mark].maxSize) {
                return config[mark].maxSize;
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

},{"../../channel":10,"../../log":63,"../../scale":65,"../../util":72}],51:[function(require,module,exports){
"use strict";
var channel_1 = require("../../channel");
var scale_1 = require("../../scale");
var timeunit_1 = require("../../timeunit");
var util = require("../../util");
function nice(scaleType, channel, fieldDef) {
    if (util.contains([scale_1.ScaleType.TIME, scale_1.ScaleType.UTC], scaleType)) {
        return timeunit_1.smallestUnit(fieldDef.timeUnit);
    }
    return util.contains([channel_1.X, channel_1.Y], channel); // return true for quantitative X/Y
}
exports.nice = nice;
function padding(channel, scaleType, scaleConfig) {
    if (util.contains([channel_1.X, channel_1.Y], channel)) {
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
function round(channel, scaleConfig) {
    if (util.contains(['x', 'y', 'row', 'column'], channel)) {
        return scaleConfig.round;
    }
    return undefined;
}
exports.round = round;
function zero(specifiedScale, channel, fieldDef) {
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
    if (!specifiedScale.domain && !fieldDef.bin && util.contains([channel_1.X, channel_1.Y], channel)) {
        return true;
    }
    return false;
}
exports.zero = zero;

},{"../../channel":10,"../../scale":65,"../../timeunit":69,"../../util":72}],52:[function(require,module,exports){
"use strict";
/** Scale suffix for scale used to get drive binned legends. */
exports.BIN_LEGEND_SUFFIX = '_bin_legend';
/** Scale suffix for scale for binned field's legend labels, which maps a binned field's quantitative values to range strings. */
exports.BIN_LEGEND_LABEL_SUFFIX = '_bin_legend_label';

},{}],53:[function(require,module,exports){
"use strict";
var log = require("../../log");
var channel_1 = require("../../channel");
var scale_1 = require("../../scale");
var util = require("../../util");
/**
 * Determine if there is a specified scale type and if it is appropriate,
 * or determine default type if type is unspecified or inappropriate.
 */
// NOTE: CompassQL uses this method.
function type(specifiedType, type, channel, timeUnit, mark, hasTopLevelSize, specifiedRangeStep, scaleConfig) {
    if (!channel_1.hasScale(channel)) {
        // There is no scale for these channels
        return null;
    }
    if (specifiedType !== undefined) {
        // Check if explicitly specified scale type is supported by the channel
        if (channel_1.supportScaleType(channel, specifiedType)) {
            return specifiedType;
        }
        else {
            var newScaleType = defaultType(type, channel, timeUnit, mark, hasTopLevelSize, specifiedRangeStep, scaleConfig);
            log.warn(log.message.scaleTypeNotWorkWithChannel(channel, specifiedType, newScaleType));
            return newScaleType;
        }
    }
    return defaultType(type, channel, timeUnit, mark, hasTopLevelSize, specifiedRangeStep, scaleConfig);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = type;
/**
 * Determine appropriate default scale type.
 */
function defaultType(type, channel, timeUnit, mark, hasTopLevelSize, specifiedRangeStep, scaleConfig) {
    if (util.contains(['row', 'column'], channel)) {
        return scale_1.ScaleType.BAND;
    }
    switch (type) {
        case 'nominal':
            if (channel === 'color' || channelRangeType(channel) === 'discrete') {
                return scale_1.ScaleType.ORDINAL;
            }
            return discreteToContinuousType(channel, mark, hasTopLevelSize, specifiedRangeStep, scaleConfig);
        case 'ordinal':
            if (channel === 'color') {
                return scale_1.ScaleType.ORDINAL;
            }
            else if (channelRangeType(channel) === 'discrete') {
                log.warn(log.message.discreteChannelCannotEncode(channel, 'ordinal'));
                return scale_1.ScaleType.ORDINAL;
            }
            return discreteToContinuousType(channel, mark, hasTopLevelSize, specifiedRangeStep, scaleConfig);
        case 'temporal':
            if (channel === 'color') {
                // Always use `sequential` as the default color scale for continuous data
                // since it supports both array range and scheme range.
                return 'sequential';
            }
            else if (channelRangeType(channel) === 'discrete') {
                log.warn(log.message.discreteChannelCannotEncode(channel, 'temporal'));
                // TODO: consider using quantize (equivalent to binning) once we have it
                return scale_1.ScaleType.ORDINAL;
            }
            switch (timeUnit) {
                // These time unit use discrete scale by default
                case 'hours':
                case 'day':
                case 'month':
                case 'quarter':
                    return discreteToContinuousType(channel, mark, hasTopLevelSize, specifiedRangeStep, scaleConfig);
            }
            return scale_1.ScaleType.TIME;
        case 'quantitative':
            if (channel === 'color') {
                // Always use `sequential` as the default color scale for continuous data
                // since it supports both array range and scheme range.
                return 'sequential';
            }
            else if (channelRangeType(channel) === 'discrete') {
                log.warn(log.message.discreteChannelCannotEncode(channel, 'quantitative'));
                // TODO: consider using quantize (equivalent to binning) once we have it
                return scale_1.ScaleType.ORDINAL;
            }
            return scale_1.ScaleType.LINEAR;
    }
    /* istanbul ignore next: should never reach this */
    throw new Error(log.message.invalidFieldType(type));
}
/**
 * Determines default scale type for nominal/ordinal field.
 * @returns BAND or POINT scale based on channel, mark, and rangeStep
 */
function discreteToContinuousType(channel, mark, hasTopLevelSize, specifiedRangeStep, scaleConfig) {
    if (util.contains(['x', 'y'], channel)) {
        if (mark === 'rect') {
            // The rect mark should fit into a band.
            return scale_1.ScaleType.BAND;
        }
        if (mark === 'bar') {
            // For bar, use band only if there is no rangeStep since we need to use band for fit mode.
            // However, for non-fit mode, point scale provides better center position.
            if (haveRangeStep(hasTopLevelSize, specifiedRangeStep, scaleConfig)) {
                return scale_1.ScaleType.POINT;
            }
            return scale_1.ScaleType.BAND;
        }
    }
    // Otherwise, use ordinal point scale so we can easily get center positions of the marks.
    return scale_1.ScaleType.POINT;
}
function haveRangeStep(hasTopLevelSize, specifiedRangeStep, scaleConfig) {
    if (hasTopLevelSize) {
        // if topLevelSize is provided, rangeStep will be dropped.
        return false;
    }
    if (specifiedRangeStep !== undefined) {
        return specifiedRangeStep !== null;
    }
    return !!scaleConfig.rangeStep;
}
function channelRangeType(channel) {
    switch (channel) {
        case 'x':
        case 'y':
        case 'row':
        case 'column':
        case 'size':
        case 'opacity':
            return 'continuous';
        case 'shape':
            return 'discrete';
        // Color can be either continuous or discrete, depending on scale type.
        case 'color':
            return 'flexible';
        // No scale, no range type.
        case 'x2':
        case 'y2':
        case 'detail':
        case 'text':
        case 'order':
            return undefined;
    }
    /* istanbul ignore next: should never reach here. */
    throw new Error('getSupportedRole not implemented for' + channel);
}
exports.channelRangeType = channelRangeType;

},{"../../channel":10,"../../log":63,"../../scale":65,"../../util":72}],54:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var log = require("../log");
var channel_1 = require("../channel");
var config_1 = require("../config");
var data_1 = require("../data");
var vlEncoding = require("../encoding"); // TODO: remove
var fielddef_1 = require("../fielddef");
var mark_1 = require("../mark");
var scale_1 = require("../scale");
var util_1 = require("../util");
var parse_1 = require("./axis/parse");
var common_1 = require("./common");
var config_2 = require("./config");
var data_2 = require("./data/data");
var parse_2 = require("./legend/parse");
var layout_1 = require("./layout");
var model_1 = require("./model");
var mark_2 = require("./mark/mark");
var init_1 = require("./scale/init");
var parse_3 = require("./scale/parse");
var stack_1 = require("../stack");
/**
 * Internal model of Vega-Lite specification for the compiler.
 */
var UnitModel = (function (_super) {
    __extends(UnitModel, _super);
    function UnitModel(spec, parent, parentGivenName) {
        var _this = _super.call(this, spec, parent, parentGivenName) || this;
        // use top-level width / height or parent's top-level width / height
        // FIXME: once facet supports width/height, this is no longer correct!
        var providedWidth = spec.width !== undefined ? spec.width :
            parent ? parent['width'] : undefined; // only exists if parent is layer
        var providedHeight = spec.height !== undefined ? spec.height :
            parent ? parent['height'] : undefined; // only exists if parent is layer
        var mark = _this._mark = spec.mark;
        var encoding = _this._encoding = _this._initEncoding(mark, spec.encoding || {});
        // TODO?: ideally we should use config only inside this constructor
        var config = _this._config = _this._initConfig(spec.config, parent);
        // FIXME move stacked out of config as it's not really a theme.
        // calculate stack properties
        _this._stack = stack_1.stack(mark, encoding, config.mark.stacked);
        _this._scale = _this._initScale(mark, encoding, config, providedWidth, providedHeight);
        // TODO?: refactor these to be a part of the model as they are not really just config
        config.mark = config_2.initMarkConfig(mark, encoding, _this._scale, _this._stack, config);
        if (mark === 'text') {
            config.text = config_2.initTextConfig(encoding, config);
        }
        _this._axis = _this._initAxis(encoding, config);
        _this._legend = _this._initLegend(encoding, config);
        // width / height
        _this._initSize(mark, _this._scale, providedWidth, providedHeight, config.cell, config.scale);
        return _this;
    }
    UnitModel.prototype._initEncoding = function (mark, encoding) {
        // clone to prevent side effect to the original spec
        encoding = util_1.duplicate(encoding);
        Object.keys(encoding).forEach(function (channel) {
            if (!channel_1.supportMark(channel, mark)) {
                // Drop unsupported channel
                log.warn(log.message.incompatibleChannel(channel, mark));
                delete encoding[channel];
                return;
            }
            if (util_1.isArray(encoding[channel])) {
                // Array of fieldDefs for detail channel (or production rule)
                encoding[channel] = encoding[channel].reduce(function (channelDefs, channelDef) {
                    if (!fielddef_1.isFieldDef(channelDef) && !fielddef_1.isValueDef(channelDef)) {
                        log.warn(log.message.emptyFieldDef(channelDef, channel));
                    }
                    else {
                        channelDefs.push(fielddef_1.normalize(channelDef, channel));
                    }
                    return channelDefs;
                }, []);
            }
            else {
                var fieldDef = encoding[channel];
                if (fieldDef.field === undefined && fieldDef.value === undefined) {
                    log.warn(log.message.emptyFieldDef(fieldDef, channel));
                    delete encoding[channel];
                    return;
                }
                fielddef_1.normalize(fieldDef, channel);
            }
        });
        return encoding;
    };
    /**
     * Init config by merging config from parent and, if applicable, from facet config
     */
    UnitModel.prototype._initConfig = function (specConfig, parent) {
        var config = util_1.mergeDeep(util_1.duplicate(config_1.defaultConfig), parent ? parent.config() : {}, specConfig);
        var hasFacetParent = false;
        while (parent !== null) {
            if (parent.isFacet()) {
                hasFacetParent = true;
                break;
            }
            parent = parent.parent();
        }
        if (hasFacetParent) {
            config.cell = util_1.extend({}, config.cell, config.facet.cell);
        }
        return config;
    };
    UnitModel.prototype._initScale = function (mark, encoding, config, topLevelWidth, topLevelHeight) {
        var xyRangeSteps = [];
        return channel_1.UNIT_SCALE_CHANNELS.reduce(function (_scale, channel) {
            if (vlEncoding.channelHasField(encoding, channel) ||
                (channel === channel_1.X && vlEncoding.channelHasField(encoding, channel_1.X2)) ||
                (channel === channel_1.Y && vlEncoding.channelHasField(encoding, channel_1.Y2))) {
                var scale = _scale[channel] = init_1.default(channel, encoding[channel], config, mark, channel === channel_1.X ? topLevelWidth : channel === channel_1.Y ? topLevelHeight : undefined, xyRangeSteps // for determine point / bar size
                );
                if (channel === channel_1.X || channel === channel_1.Y) {
                    if (scale.rangeStep) {
                        xyRangeSteps.push(scale.rangeStep);
                    }
                }
            }
            return _scale;
        }, {});
    };
    // TODO: consolidate this with scale?  Current scale range is in parseScale (later),
    // but not in initScale because scale range depends on size,
    // but size depends on scale type and rangeStep
    UnitModel.prototype._initSize = function (mark, scale, width, height, cellConfig, scaleConfig) {
        if (width !== undefined) {
            this._width = width;
        }
        else if (scale[channel_1.X]) {
            if (!scale_1.hasDiscreteDomain(scale[channel_1.X].type) || !scale[channel_1.X].rangeStep) {
                this._width = cellConfig.width;
            } // else: Do nothing, use dynamic width.
        }
        else {
            if (mark === mark_1.TEXT) {
                // for text table without x/y scale we need wider rangeStep
                this._width = scaleConfig.textXRangeStep;
            }
            else {
                if (typeof scaleConfig.rangeStep === 'string') {
                    throw new Error('_initSize does not handle string rangeSteps');
                }
                this._width = scaleConfig.rangeStep;
            }
        }
        if (height !== undefined) {
            this._height = height;
        }
        else if (scale[channel_1.Y]) {
            if (!scale_1.hasDiscreteDomain(scale[channel_1.Y].type) || !scale[channel_1.Y].rangeStep) {
                this._height = cellConfig.height;
            } // else: Do nothing, use dynamic height .
        }
        else {
            if (typeof scaleConfig.rangeStep === 'string') {
                throw new Error('_initSize does not handle string rangeSteps');
            }
            this._height = scaleConfig.rangeStep;
        }
    };
    UnitModel.prototype._initAxis = function (encoding, config) {
        return [channel_1.X, channel_1.Y].reduce(function (_axis, channel) {
            // Position Axis
            var channelDef = encoding[channel];
            if (fielddef_1.isFieldDef(channelDef) ||
                (channel === channel_1.X && fielddef_1.isFieldDef(encoding.x2)) ||
                (channel === channel_1.Y && fielddef_1.isFieldDef(encoding.y2))) {
                var axisSpec = fielddef_1.isFieldDef(channelDef) ? channelDef.axis : null;
                // We no longer support false in the schema, but we keep false here for backward compatability.
                if (axisSpec !== null && axisSpec !== false) {
                    _axis[channel] = util_1.extend({}, config.axis, axisSpec === true ? {} : axisSpec || {});
                }
            }
            return _axis;
        }, {});
    };
    UnitModel.prototype._initLegend = function (encoding, config) {
        return channel_1.NONSPATIAL_SCALE_CHANNELS.reduce(function (_legend, channel) {
            var channelDef = encoding[channel];
            if (fielddef_1.isFieldDef(channelDef)) {
                var legendSpec = channelDef.legend;
                // We no longer support false in the schema, but we keep false here for backward compatability.
                if (legendSpec !== null && legendSpec !== false) {
                    _legend[channel] = util_1.extend({}, config.legend, legendSpec === true ? {} : legendSpec || {});
                }
            }
            return _legend;
        }, {});
    };
    UnitModel.prototype.children = function () {
        return [];
    };
    Object.defineProperty(UnitModel.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UnitModel.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    UnitModel.prototype.parseData = function () {
        this.component.data = data_2.parseUnitData(this);
    };
    UnitModel.prototype.parseSelectionData = function () {
        // TODO: @arvind can write this
        // We might need to split this into compileSelectionData and compileSelectionSignals?
    };
    UnitModel.prototype.parseLayoutData = function () {
        this.component.layout = layout_1.parseUnitLayout(this);
    };
    UnitModel.prototype.parseScale = function () {
        this.component.scale = parse_3.default(this);
    };
    UnitModel.prototype.parseMark = function () {
        this.component.mark = mark_2.parseMark(this);
    };
    UnitModel.prototype.parseAxis = function () {
        this.component.axis = parse_1.parseAxisComponent(this, [channel_1.X, channel_1.Y]);
    };
    UnitModel.prototype.parseAxisGroup = function () {
        return null;
    };
    UnitModel.prototype.parseGridGroup = function () {
        return null;
    };
    UnitModel.prototype.parseLegend = function () {
        this.component.legend = parse_2.parseLegendComponent(this);
    };
    UnitModel.prototype.assembleData = function (data) {
        return data_2.assembleData(this, data);
    };
    UnitModel.prototype.assembleLayout = function (layoutData) {
        return layout_1.assembleLayout(this, layoutData);
    };
    UnitModel.prototype.assembleMarks = function () {
        return this.component.mark;
    };
    UnitModel.prototype.assembleParentGroupProperties = function (cellConfig) {
        return common_1.applyConfig({}, cellConfig, mark_1.FILL_STROKE_CONFIG.concat(['clip']));
    };
    UnitModel.prototype.channels = function () {
        return channel_1.UNIT_CHANNELS;
    };
    UnitModel.prototype.mapping = function () {
        return this.encoding();
    };
    UnitModel.prototype.stack = function () {
        return this._stack;
    };
    UnitModel.prototype.toSpec = function (excludeConfig, excludeData) {
        var encoding = util_1.duplicate(this._encoding);
        var spec;
        spec = {
            mark: this._mark,
            encoding: encoding
        };
        if (!excludeConfig) {
            spec.config = util_1.duplicate(this._config);
        }
        if (!excludeData) {
            spec.data = util_1.duplicate(this._data);
        }
        // remove defaults
        return spec;
    };
    UnitModel.prototype.mark = function () {
        return this._mark;
    };
    UnitModel.prototype.channelHasField = function (channel) {
        return vlEncoding.channelHasField(this._encoding, channel);
    };
    UnitModel.prototype.encoding = function () {
        return this._encoding;
    };
    UnitModel.prototype.fieldDef = function (channel) {
        // TODO: remove this || {}
        // Currently we have it to prevent null pointer exception.
        return this._encoding[channel] || {};
    };
    /** Get "field" reference for vega */
    UnitModel.prototype.field = function (channel, opt) {
        if (opt === void 0) { opt = {}; }
        var fieldDef = this.fieldDef(channel);
        if (fieldDef.bin) {
            opt = util_1.extend({
                binSuffix: scale_1.hasDiscreteDomain(this.scale(channel).type) ? 'range' : 'start'
            }, opt);
        }
        return fielddef_1.field(fieldDef, opt);
    };
    UnitModel.prototype.dataTable = function () {
        return this.dataName(vlEncoding.isAggregate(this._encoding) ? data_1.SUMMARY : data_1.SOURCE);
    };
    UnitModel.prototype.isUnit = function () {
        return true;
    };
    return UnitModel;
}(model_1.Model));
exports.UnitModel = UnitModel;

},{"../channel":10,"../config":55,"../data":56,"../encoding":58,"../fielddef":60,"../log":63,"../mark":64,"../scale":65,"../stack":68,"../util":72,"./axis/parse":12,"./common":14,"./config":16,"./data/data":18,"./layout":31,"./legend/parse":33,"./mark/mark":39,"./model":46,"./scale/init":48,"./scale/parse":49}],55:[function(require,module,exports){
"use strict";
var axis_1 = require("./axis");
var legend_1 = require("./legend");
var mark = require("./mark");
var scale_1 = require("./scale");
exports.defaultCellConfig = {
    width: 200,
    height: 200
};
exports.defaultFacetCellConfig = {
    stroke: '#ccc',
    strokeWidth: 1
};
var defaultFacetGridConfig = {
    color: '#000000',
    opacity: 0.4,
    offset: 0
};
exports.defaultFacetConfig = {
    axis: axis_1.defaultFacetAxisConfig,
    grid: defaultFacetGridConfig,
    cell: exports.defaultFacetCellConfig
};
// FIXME refactor this
var AreaOverlay;
(function (AreaOverlay) {
    AreaOverlay.LINE = 'line';
    AreaOverlay.LINEPOINT = 'linepoint';
    AreaOverlay.NONE = 'none';
})(AreaOverlay = exports.AreaOverlay || (exports.AreaOverlay = {}));
exports.defaultOverlayConfig = {
    line: false,
    pointStyle: { filled: true },
    lineStyle: {}
};
exports.defaultConfig = {
    padding: 5,
    numberFormat: 's',
    timeFormat: '%b %d, %Y',
    countTitle: 'Number of Records',
    cell: exports.defaultCellConfig,
    mark: mark.defaultMarkConfig,
    area: mark.defaultAreaConfig,
    bar: mark.defaultBarConfig,
    circle: mark.defaultCircleConfig,
    line: mark.defaultLineConfig,
    point: mark.defaultPointConfig,
    rect: mark.defaultRectConfig,
    rule: mark.defaultRuleConfig,
    square: mark.defaultSquareConfig,
    text: mark.defaultTextConfig,
    tick: mark.defaultTickConfig,
    overlay: exports.defaultOverlayConfig,
    scale: scale_1.defaultScaleConfig,
    axis: axis_1.defaultAxisConfig,
    legend: legend_1.defaultLegendConfig,
    facet: exports.defaultFacetConfig,
};

},{"./axis":8,"./legend":62,"./mark":64,"./scale":65}],56:[function(require,module,exports){
/*
 * Constants and utilities for data.
 */
"use strict";
var DataFormatType;
(function (DataFormatType) {
    DataFormatType.JSON = 'json';
    DataFormatType.CSV = 'csv';
    DataFormatType.TSV = 'tsv';
    DataFormatType.TOPOJSON = 'topojson';
})(DataFormatType = exports.DataFormatType || (exports.DataFormatType = {}));
function isUrlData(data) {
    return !!data['url'];
}
exports.isUrlData = isUrlData;
function isInlineData(data) {
    return !!data['values'];
}
exports.isInlineData = isInlineData;
exports.SUMMARY = 'summary';
exports.SOURCE = 'source';
exports.STACKED = 'stacked';
exports.LAYOUT = 'layout';

},{}],57:[function(require,module,exports){
// DateTime definition object
"use strict";
var util_1 = require("./util");
var log = require("./log");
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
function timestamp(d, normalize) {
    var date = new Date(0, 0, 1, 0, 0, 0, 0); // start with uniform date
    // FIXME support UTC
    if (d.day !== undefined) {
        if (util_1.keys(d).length > 1) {
            log.warn(log.message.droppedDay(d));
            d = util_1.duplicate(d);
            delete d.day;
        }
        else {
            // Use a year that has 1/1 as Sunday so we can setDate below
            date.setFullYear(SUNDAY_YEAR);
            var day = normalize ? normalizeDay(d.day) : d.day;
            date.setDate(+day + 1); // +1 since date start at 1 in JS
        }
    }
    if (d.year !== undefined) {
        date.setFullYear(d.year);
    }
    if (d.quarter !== undefined) {
        var quarter = normalize ? normalizeQuarter(d.quarter) : d.quarter;
        date.setMonth(+quarter * 3);
    }
    if (d.month !== undefined) {
        var month = normalize ? normalizeMonth(d.month) : d.month;
        date.setMonth(+month);
    }
    if (d.date !== undefined) {
        date.setDate(d.date);
    }
    if (d.hours !== undefined) {
        date.setHours(d.hours);
    }
    if (d.minutes !== undefined) {
        date.setMinutes(d.minutes);
    }
    if (d.seconds !== undefined) {
        date.setSeconds(d.seconds);
    }
    if (d.milliseconds !== undefined) {
        date.setMilliseconds(d.milliseconds);
    }
    return date.getTime();
}
exports.timestamp = timestamp;
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
    return 'datetime(' + units.join(', ') + ')';
}
exports.dateTimeExpr = dateTimeExpr;

},{"./log":63,"./util":72}],58:[function(require,module,exports){
"use strict";
// utility for encoding mapping
var fielddef_1 = require("./fielddef");
var channel_1 = require("./channel");
var util_1 = require("./util");
function channelHasField(encoding, channel) {
    var channelDef = encoding && encoding[channel];
    if (channelDef) {
        if (util_1.isArray(channelDef)) {
            return util_1.some(channelDef, function (fieldDef) { return !!fieldDef.field; });
        }
        else {
            return fielddef_1.isFieldDef(channelDef);
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
                return fielddef_1.isFieldDef(channelDef) && !!channelDef.aggregate;
            }
        }
        return false;
    });
}
exports.isAggregate = isAggregate;
function isRanged(encoding) {
    return encoding && ((!!encoding.x && !!encoding.x2) || (!!encoding.y && !!encoding.y2));
}
exports.isRanged = isRanged;
function fieldDefs(encoding) {
    var arr = [];
    channel_1.CHANNELS.forEach(function (channel) {
        if (channelHasField(encoding, channel)) {
            var channelDef = encoding[channel];
            (util_1.isArray(channelDef) ? channelDef : [channelDef]).forEach(function (fieldDef) {
                arr.push(fieldDef);
            });
        }
    });
    return arr;
}
exports.fieldDefs = fieldDefs;
;
function forEach(mapping, f, thisArg) {
    if (!mapping) {
        return;
    }
    Object.keys(mapping).forEach(function (c) {
        var channel = c;
        if (util_1.isArray(mapping[channel])) {
            mapping[channel].forEach(function (fieldDef) {
                f.call(thisArg, fieldDef, channel);
            });
        }
        else {
            f.call(thisArg, mapping[channel], channel);
        }
    });
}
exports.forEach = forEach;
function reduce(mapping, f, init, thisArg) {
    if (!mapping) {
        return init;
    }
    return Object.keys(mapping).reduce(function (r, c) {
        var channel = c;
        if (util_1.isArray(mapping[channel])) {
            return mapping[channel].reduce(function (r1, fieldDef) {
                return f.call(thisArg, r1, fieldDef, channel);
            }, r);
        }
        else {
            return f.call(thisArg, r, mapping[channel], channel);
        }
    }, init);
}
exports.reduce = reduce;

},{"./channel":10,"./fielddef":60,"./util":72}],59:[function(require,module,exports){
"use strict";

},{}],60:[function(require,module,exports){
// utility for a field definition object
"use strict";
var aggregate_1 = require("./aggregate");
var channel_1 = require("./channel");
var log = require("./log");
var type_1 = require("./type");
var util_1 = require("./util");
function isFieldDef(channelDef) {
    return channelDef && !!channelDef['field'];
}
exports.isFieldDef = isFieldDef;
function isValueDef(channelDef) {
    return channelDef && 'value' in channelDef && channelDef['value'] !== undefined;
}
exports.isValueDef = isValueDef;
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
                fn = 'bin';
                suffix = opt.binSuffix;
            }
            else if (!opt.noAggregate && fieldDef.aggregate) {
                fn = String(fieldDef.aggregate);
            }
            else if (fieldDef.timeUnit) {
                fn = String(fieldDef.timeUnit);
            }
        }
        if (!!fn) {
            field = fn + "_" + field;
        }
    }
    if (!!suffix) {
        field = field + "_" + suffix;
    }
    if (!!prefix) {
        field = prefix + "_" + field;
    }
    if (opt.datum) {
        field = "datum[\"" + field + "\"]";
    }
    return field;
}
exports.field = field;
function _isFieldDimension(fieldDef) {
    if (util_1.contains([type_1.NOMINAL, type_1.ORDINAL], fieldDef.type)) {
        return true;
    }
    else if (!!fieldDef.bin) {
        return true;
    }
    else if (fieldDef.type === type_1.TEMPORAL) {
        return !!fieldDef.timeUnit;
    }
    return false;
}
function isDimension(fieldDef) {
    return fieldDef && isFieldDef(fieldDef) && _isFieldDimension(fieldDef);
}
exports.isDimension = isDimension;
function isMeasure(fieldDef) {
    return fieldDef && isFieldDef(fieldDef) && !_isFieldDimension(fieldDef);
}
exports.isMeasure = isMeasure;
function count() {
    return { field: '*', aggregate: aggregate_1.AggregateOp.COUNT, type: type_1.QUANTITATIVE };
}
exports.count = count;
function isCount(fieldDef) {
    return fieldDef.aggregate === aggregate_1.AggregateOp.COUNT;
}
exports.isCount = isCount;
function title(fieldDef, config) {
    if (fieldDef.title != null) {
        return fieldDef.title;
    }
    if (isCount(fieldDef)) {
        return config.countTitle;
    }
    var fn = fieldDef.aggregate || fieldDef.timeUnit || (fieldDef.bin && 'bin');
    if (fn) {
        return fn.toString().toUpperCase() + '(' + fieldDef.field + ')';
    }
    else {
        return fieldDef.field;
    }
}
exports.title = title;
function defaultType(fieldDef, channel) {
    if (!!fieldDef.timeUnit) {
        return 'temporal';
    }
    if (!!fieldDef.bin) {
        return 'quantitative';
    }
    var canBeMeasure = channel_1.getSupportedRole(channel).measure;
    return canBeMeasure ? 'quantitative' : 'nominal';
}
exports.defaultType = defaultType;
/**
 * Convert type to full, lowercase type, or augment the fieldDef with a default type if missing.
 */
function normalize(fieldDef, channel) {
    // If a fieldDef contains a field, we need type.
    if (fieldDef.field) {
        // convert short type to full type
        var fullType = type_1.getFullName(fieldDef.type);
        if (fullType) {
            fieldDef.type = fullType;
        }
        else {
            // If type is empty / invalid, then augment with default type
            var newType = defaultType(fieldDef, channel);
            log.warn(log.message.emptyOrInvalidFieldType(fieldDef.type, channel, newType));
            fieldDef.type = newType;
        }
    }
    return fieldDef;
}
exports.normalize = normalize;

},{"./aggregate":7,"./channel":10,"./log":63,"./type":71,"./util":72}],61:[function(require,module,exports){
"use strict";
var datetime_1 = require("./datetime");
var fielddef_1 = require("./fielddef");
var timeunit_1 = require("./timeunit");
var util_1 = require("./util");
function isEqualFilter(filter) {
    return filter && !!filter.field && filter.equal !== undefined;
}
exports.isEqualFilter = isEqualFilter;
function isRangeFilter(filter) {
    if (filter && !!filter.field) {
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
function expression(filter) {
    if (util_1.isString(filter)) {
        return filter;
    }
    else {
        var fieldExpr = filter.timeUnit ?
            // For timeUnit, cast into integer with time() so we can use ===, inrange, indexOf to compare values directly.
            // TODO: We calculate timeUnit on the fly here. Consider if we would like to consolidate this with timeUnit pipeline
            // TODO: support utc
            ('time(' + timeunit_1.fieldExpr(filter.timeUnit, filter.field) + ')') :
            fielddef_1.field(filter, { datum: true });
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
            if (lower !== null && upper !== null) {
                return 'inrange(' + fieldExpr + ', ' +
                    valueExpr(lower, filter.timeUnit) + ', ' +
                    valueExpr(upper, filter.timeUnit) + ')';
            }
            else if (lower !== null) {
                return fieldExpr + ' >= ' + lower;
            }
            else if (upper !== null) {
                return fieldExpr + ' <= ' + upper;
            }
        }
    }
    return undefined;
}
exports.expression = expression;
function valueExpr(v, timeUnit) {
    if (datetime_1.isDateTime(v)) {
        var expr = datetime_1.dateTimeExpr(v, true);
        return 'time(' + expr + ')';
    }
    if (timeunit_1.isSingleTimeUnit(timeUnit)) {
        var datetime = {};
        datetime[timeUnit] = v;
        var expr = datetime_1.dateTimeExpr(datetime, true);
        return 'time(' + expr + ')';
    }
    return JSON.stringify(v);
}

},{"./datetime":57,"./fielddef":60,"./timeunit":69,"./util":72}],62:[function(require,module,exports){
"use strict";
exports.defaultLegendConfig = {
    orient: undefined,
};

},{}],63:[function(require,module,exports){
///<reference path="../typings/vega-util.d.ts" />
"use strict";
/**
 * Vega-Lite's singleton logger utility.
 */
var vega_util_1 = require("vega-util");
var channel_1 = require("./channel");
/**
 * Main (default) Vega Logger instance for Vega-Lite
 */
var main = vega_util_1.logger(vega_util_1.Warn);
var current = main;
/**
 * Logger tool for checking if the code throws correct warning
 */
var LocalLogger = (function () {
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
function runLocalLogger(f) {
    var localLogger = current = new LocalLogger();
    f(localLogger);
    reset();
}
exports.runLocalLogger = runLocalLogger;
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
    // DATA
    message.DEPRECATED_FILTER_NULL = 'filterNull is deprecated. Please use filterInvalid instead.';
    // ENCODING & FACET
    function invalidFieldType(type) {
        return "Invalid field type \"" + type + "\"";
    }
    message.invalidFieldType = invalidFieldType;
    function emptyOrInvalidFieldType(type, channel, newType) {
        return "Invalid field type (" + type + ") for channel " + channel + ", using " + newType + " instead.";
    }
    message.emptyOrInvalidFieldType = emptyOrInvalidFieldType;
    function emptyFieldDef(fieldDef, channel) {
        return "Dropping " + JSON.stringify(fieldDef) + " from channel " + channel + " since it does not contain data field or value.";
    }
    message.emptyFieldDef = emptyFieldDef;
    function incompatibleChannel(channel, markOrFacet) {
        return channel + " dropped as it is incompatible with " + markOrFacet;
    }
    message.incompatibleChannel = incompatibleChannel;
    function facetChannelShouldBeDiscrete(channel) {
        return channel + " encoding should be discrete (ordinal / nominal / binned).";
    }
    message.facetChannelShouldBeDiscrete = facetChannelShouldBeDiscrete;
    function discreteChannelCannotEncode(channel, type) {
        return "Using discrete channel " + channel + " to encode " + type + " field can be misleading as it does not encode " + (type === 'ordinal' ? 'order' : 'magnitude') + ".";
    }
    message.discreteChannelCannotEncode = discreteChannelCannotEncode;
    // Mark
    message.BAR_WITH_POINT_SCALE_AND_RANGESTEP_NULL = 'Bar mark should not be used with point scale when rangeStep is null. Please use band scale instead.';
    function unclearOrientContinuous(mark) {
        return 'Cannot clearly determine orientation for ' + mark + ' since both x and y channel encode continous fields. In this case, we use vertical by default';
    }
    message.unclearOrientContinuous = unclearOrientContinuous;
    function unclearOrientDiscreteOrEmpty(mark) {
        return 'Cannot clearly determine orientation for ' + mark + ' since both x and y channel encode discrete or empty fields.';
    }
    message.unclearOrientDiscreteOrEmpty = unclearOrientDiscreteOrEmpty;
    function orientOverridden(original, actual) {
        return "Specified orient " + original + " overridden with " + actual;
    }
    message.orientOverridden = orientOverridden;
    // SCALE
    message.CANNOT_USE_SCHEME_WITH_NON_COLOR = 'Cannot use scheme with non-color channel.';
    message.CANNOT_USE_RANGE_WITH_POSITION = 'Cannot use custom range with x or y channel.  Please customize width, height, padding, or rangeStep instead.';
    message.CANNOT_USE_PADDING_WITH_FACET = 'Cannot use padding with facet\'s scale.  Please use spacing instead.';
    function cannotUseRangePropertyWithFacet(propName) {
        return "Cannot use custom " + propName + " with row or column channel. Please use width, height, or spacing instead.";
    }
    message.cannotUseRangePropertyWithFacet = cannotUseRangePropertyWithFacet;
    function rangeStepDropped(channel) {
        return "rangeStep for " + channel + " is dropped as top-level " + (channel === channel_1.X ? 'width' : 'height') + " is provided.";
    }
    message.rangeStepDropped = rangeStepDropped;
    function scaleTypeNotWorkWithChannel(channel, scaleType, newScaleType) {
        return "Channel " + channel + " does not work with " + scaleType + " scale. We are using " + newScaleType + " scale instead.";
    }
    message.scaleTypeNotWorkWithChannel = scaleTypeNotWorkWithChannel;
    function scalePropertyNotWorkWithScaleType(scaleType, propName, channel) {
        return channel + "-scale's \"" + propName + "\" is dropped as it does not work with " + scaleType + " scale.";
    }
    message.scalePropertyNotWorkWithScaleType = scalePropertyNotWorkWithScaleType;
    function scaleTypeNotWorkWithMark(mark, scaleType) {
        return "Scale type \"" + scaleType + "\" does not work with mark " + mark + ".";
    }
    message.scaleTypeNotWorkWithMark = scaleTypeNotWorkWithMark;
    message.INVAID_DOMAIN = 'Invalid scale domain';
    // AXIS
    message.INVALID_CHANNEL_FOR_AXIS = 'Invalid channel for axis.';
    // STACK
    function cannotStackRangedMark(channel) {
        return "Cannot stack " + channel + " if there is already " + channel + "2";
    }
    message.cannotStackRangedMark = cannotStackRangedMark;
    function cannotStackNonLinearScale(scaleType) {
        return "Cannot stack non-linear scale (" + scaleType + ")";
    }
    message.cannotStackNonLinearScale = cannotStackNonLinearScale;
    function cannotStackNonSummativeAggregate(aggregate) {
        return "Cannot stack when the aggregate function is non-summative (" + aggregate + ")";
    }
    message.cannotStackNonSummativeAggregate = cannotStackNonSummativeAggregate;
    // TIMEUNIT
    function invalidTimeUnit(unitName, value) {
        return "Invalid " + unitName + ": " + value;
    }
    message.invalidTimeUnit = invalidTimeUnit;
    function dayReplacedWithDate(fullTimeUnit) {
        return "Time unit \"" + fullTimeUnit + "\" is not supported. We are replacing it with " +
            (fullTimeUnit + '').replace('day', 'date') + '.';
    }
    message.dayReplacedWithDate = dayReplacedWithDate;
    function droppedDay(d) {
        return 'Dropping day from datetime ' + JSON.stringify(d) +
            ' as day cannot be combined with other units.';
    }
    message.droppedDay = droppedDay;
})(message = exports.message || (exports.message = {}));

},{"./channel":10,"vega-util":5}],64:[function(require,module,exports){
"use strict";
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
    Mark.ERRORBAR = 'errorBar';
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
exports.ERRORBAR = Mark.ERRORBAR;
exports.PRIMITIVE_MARKS = [exports.AREA, exports.BAR, exports.LINE, exports.POINT, exports.TEXT, exports.TICK, exports.RULE, exports.CIRCLE, exports.SQUARE];
exports.STROKE_CONFIG = ['stroke', 'strokeWidth',
    'strokeDash', 'strokeDashOffset', 'strokeOpacity'];
exports.FILL_CONFIG = ['fill', 'fillOpacity'];
exports.FILL_STROKE_CONFIG = [].concat(exports.STROKE_CONFIG, exports.FILL_CONFIG);
exports.defaultMarkConfig = {
    color: '#4682b4',
    minOpacity: 0.3,
    maxOpacity: 0.8,
    minStrokeWidth: 1,
    maxStrokeWidth: 4
};
exports.defaultAreaConfig = {};
exports.defaultBarConfig = {
    binSpacing: 1,
    continuousBandSize: 2
};
exports.defaultLineConfig = {
    strokeWidth: 2
};
exports.defaultSymbolConfig = {
    size: 30,
    // FIXME: revise if these *can* become ratios of rangeStep
    minSize: 9,
    strokeWidth: 2
};
exports.defaultPointConfig = util_1.extend({}, exports.defaultSymbolConfig, {
    shape: 'circle',
    shapes: ['circle', 'square', 'cross', 'diamond', 'triangle-up', 'triangle-down'],
});
exports.defaultCircleConfig = exports.defaultSymbolConfig;
exports.defaultSquareConfig = exports.defaultSymbolConfig;
exports.defaultRectConfig = {};
exports.defaultRuleConfig = {
    strokeWidth: 1
};
exports.defaultTextConfig = {
    fontSize: 10,
    minFontSize: 8,
    maxFontSize: 40,
    baseline: 'middle',
    text: 'Abc',
    applyColorToBackground: false
};
exports.defaultTickConfig = {
    // if tickSize = 1, it becomes a dot.
    // To be consistent, we just use 3 to be somewhat consistent with point, which use area = 9.
    minBandSize: 3,
    thickness: 1
};
// TODO: ErrorBar Config

},{"./util":72}],65:[function(require,module,exports){
"use strict";
var log = require("./log");
var util_1 = require("./util");
var ScaleType;
(function (ScaleType) {
    // Continuous - Quantitative
    ScaleType.LINEAR = 'linear';
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
    ScaleType.POINT = 'point';
    ScaleType.BAND = 'band';
})(ScaleType = exports.ScaleType || (exports.ScaleType = {}));
exports.SCALE_TYPES = [
    // Continuous - Quantitative
    'linear', 'log', 'pow', 'sqrt',
    // Continuous - Time
    'time', 'utc',
    // Sequential
    'sequential',
    // Discrete
    'ordinal', 'point', 'band',
];
exports.CONTINUOUS_TO_CONTINUOUS_SCALES = ['linear', 'log', 'pow', 'sqrt', 'time', 'utc'];
var CONTINUOUS_TO_CONTINUOUS_INDEX = util_1.toSet(exports.CONTINUOUS_TO_CONTINUOUS_SCALES);
exports.CONTINUOUS_DOMAIN_SCALES = exports.CONTINUOUS_TO_CONTINUOUS_SCALES.concat(['sequential' /* TODO add 'quantile', 'quantize', 'threshold'*/]);
var CONTINUOUS_DOMAIN_INDEX = util_1.toSet(exports.CONTINUOUS_DOMAIN_SCALES);
exports.DISCRETE_DOMAIN_SCALES = ['ordinal', 'point', 'band'];
var DISCRETE_DOMAIN_INDEX = util_1.toSet(exports.DISCRETE_DOMAIN_SCALES);
exports.TIME_SCALE_TYPES = ['time', 'utc'];
function hasDiscreteDomain(type) {
    return type in DISCRETE_DOMAIN_INDEX;
}
exports.hasDiscreteDomain = hasDiscreteDomain;
function hasContinuousDomain(type) {
    return type in CONTINUOUS_DOMAIN_INDEX;
}
exports.hasContinuousDomain = hasContinuousDomain;
function isContinuousToContinuous(type) {
    return type in CONTINUOUS_TO_CONTINUOUS_INDEX;
}
exports.isContinuousToContinuous = isContinuousToContinuous;
var NiceTime;
(function (NiceTime) {
    NiceTime.SECOND = 'second';
    NiceTime.MINUTE = 'minute';
    NiceTime.HOUR = 'hour';
    NiceTime.DAY = 'day';
    NiceTime.WEEK = 'week';
    NiceTime.MONTH = 'month';
    NiceTime.YEAR = 'year';
})(NiceTime = exports.NiceTime || (exports.NiceTime = {}));
exports.defaultScaleConfig = {
    round: true,
    textXRangeStep: 90,
    rangeStep: 21,
    pointPadding: 0.5,
    bandPaddingInner: 0.1,
    facetSpacing: 16,
    useRawDomain: false,
};
function isExtendedScheme(scheme) {
    return scheme && !!scheme['name'];
}
exports.isExtendedScheme = isExtendedScheme;
exports.SCALE_PROPERTIES = [
    'type', 'domain', 'range', 'round', 'rangeStep', 'scheme', 'padding', 'clamp', 'nice',
    'exponent', 'zero',
    // TODO: add interpolate here
    // FIXME: determine if 'useRawDomain' should really be included here
    'useRawDomain'
];
function scaleTypeSupportProperty(scaleType, propName) {
    switch (propName) {
        case 'type':
        case 'domain':
        case 'range':
        case 'scheme':
            return true;
        case 'round':
            return isContinuousToContinuous(scaleType) || scaleType === 'band' || scaleType === 'point';
        case 'rangeStep':
        case 'padding':
        case 'paddingOuter':
            return util_1.contains(['point', 'band'], scaleType);
        case 'paddingInner':
            return scaleType === 'band';
        case 'clamp':
            return isContinuousToContinuous(scaleType) || scaleType === 'sequential';
        case 'nice':
            return isContinuousToContinuous(scaleType) || scaleType === 'sequential' || scaleType === 'quantize';
        case 'exponent':
            return scaleType === 'pow' || scaleType === 'log';
        case 'zero':
            // TODO: what about quantize, threshold?
            return !hasDiscreteDomain(scaleType) && !util_1.contains(['log', 'time', 'utc'], scaleType);
        case 'useRawDomain':
            // TODO: 'quantize', 'quantile', 'threshold'
            return isContinuousToContinuous(scaleType) || util_1.contains(['quantize', 'quantile', 'threshold'], scaleType);
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
        case 'range':
            // User should not customize range for position and facet channel directly.
            if (channel === 'x' || channel === 'y') {
                return log.message.CANNOT_USE_RANGE_WITH_POSITION;
            }
            if (channel === 'row' || channel === 'column') {
                return log.message.cannotUseRangePropertyWithFacet('range');
            }
            return undefined; // GOOD!
        // band / point
        case 'rangeStep':
            if (channel === 'row' || channel === 'column') {
                return log.message.cannotUseRangePropertyWithFacet('rangeStep');
            }
            return undefined; // GOOD!
        case 'padding':
        case 'paddingInner':
        case 'paddingOuter':
            if (channel === 'row' || channel === 'column') {
                /*
                 * We do not use d3 scale's padding for row/column because padding there
                 * is a ratio ([0, 1]) and it causes the padding to be decimals.
                 * Therefore, we manually calculate "spacing" in the layout by ourselves.
                 */
                return log.message.CANNOT_USE_PADDING_WITH_FACET;
            }
            return undefined; // GOOD!
        case 'scheme':
            if (channel !== 'color') {
                return log.message.CANNOT_USE_SCHEME_WITH_NON_COLOR;
            }
            return undefined;
        case 'type':
        case 'domain':
        case 'round':
        case 'clamp':
        case 'exponent':
        case 'nice':
        case 'zero':
        case 'useRawDomain':
            // These channel do not have strict requirement
            return undefined; // GOOD!
    }
    /* istanbul ignore next: it should never reach here */
    throw new Error('Invalid scale property "${propName}".');
}
exports.channelScalePropertyIncompatability = channelScalePropertyIncompatability;

},{"./log":63,"./util":72}],66:[function(require,module,exports){
"use strict";
var SortOrder;
(function (SortOrder) {
    SortOrder.ASCENDING = 'ascending';
    SortOrder.DESCENDING = 'descending';
})(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
function isSortField(sort) {
    return !!sort && !!sort['field'] && !!sort['op'];
}
exports.isSortField = isSortField;

},{}],67:[function(require,module,exports){
/* Package of defining Vega-lite Specification's json schema at its utility functions */
"use strict";
var config_1 = require("./config");
var encoding_1 = require("./encoding");
var mark_1 = require("./mark");
var stack_1 = require("./stack");
var channel_1 = require("./channel");
var vlEncoding = require("./encoding");
var util_1 = require("./util");
/* Custom type guards */
function isSomeFacetSpec(spec) {
    return spec['facet'] !== undefined;
}
exports.isSomeFacetSpec = isSomeFacetSpec;
function isExtendedUnitSpec(spec) {
    if (isSomeUnitSpec(spec)) {
        var hasRow = encoding_1.channelHasField(spec.encoding, channel_1.ROW);
        var hasColumn = encoding_1.channelHasField(spec.encoding, channel_1.COLUMN);
        return hasRow || hasColumn;
    }
    return false;
}
exports.isExtendedUnitSpec = isExtendedUnitSpec;
function isUnitSpec(spec) {
    if (isSomeUnitSpec(spec)) {
        return !isExtendedUnitSpec(spec);
    }
    return false;
}
exports.isUnitSpec = isUnitSpec;
function isSomeUnitSpec(spec) {
    return spec['mark'] !== undefined;
}
exports.isSomeUnitSpec = isSomeUnitSpec;
function isLayerSpec(spec) {
    return spec['layers'] !== undefined;
}
exports.isLayerSpec = isLayerSpec;
/**
 * Decompose extended unit specs into composition of pure unit specs.
 */
// TODO: consider moving this to another file.  Maybe vl.spec.normalize or vl.normalize
function normalize(spec) {
    if (isExtendedUnitSpec(spec)) {
        return normalizeExtendedUnitSpec(spec);
    }
    if (isUnitSpec(spec)) {
        return normalizeUnitSpec(spec);
    }
    return spec;
}
exports.normalize = normalize;
function normalizeExtendedUnitSpec(spec) {
    var hasRow = encoding_1.channelHasField(spec.encoding, channel_1.ROW);
    var hasColumn = encoding_1.channelHasField(spec.encoding, channel_1.COLUMN);
    // TODO: @arvind please  add interaction syntax here
    var encoding = util_1.duplicate(spec.encoding);
    delete encoding.column;
    delete encoding.row;
    return util_1.extend(spec.name ? { name: spec.name } : {}, spec.description ? { description: spec.description } : {}, { data: spec.data }, spec.transform ? { transform: spec.transform } : {}, {
        facet: util_1.extend(hasRow ? { row: spec.encoding.row } : {}, hasColumn ? { column: spec.encoding.column } : {}),
        spec: normalizeUnitSpec(util_1.extend(spec.width ? { width: spec.width } : {}, spec.height ? { height: spec.height } : {}, {
            mark: spec.mark,
            encoding: encoding
        }, spec.config ? { config: spec.config } : {}))
    }, spec.config ? { config: spec.config } : {});
}
exports.normalizeExtendedUnitSpec = normalizeExtendedUnitSpec;
function normalizeUnitSpec(spec) {
    var config = spec.config;
    var overlayConfig = config && config.overlay;
    var overlayWithLine = overlayConfig && spec.mark === mark_1.AREA &&
        util_1.contains([config_1.AreaOverlay.LINEPOINT, config_1.AreaOverlay.LINE], overlayConfig.area);
    var overlayWithPoint = overlayConfig && ((overlayConfig.line && spec.mark === mark_1.LINE) ||
        (overlayConfig.area === config_1.AreaOverlay.LINEPOINT && spec.mark === mark_1.AREA));
    // TODO: thoroughly test
    if (spec.mark === mark_1.ERRORBAR) {
        return normalizeErrorBarUnitSpec(spec);
    }
    // TODO: thoroughly test
    if (encoding_1.isRanged(spec.encoding)) {
        return normalizeRangedUnitSpec(spec);
    }
    if (overlayWithPoint || overlayWithLine) {
        return normalizeOverlay(spec, overlayWithPoint, overlayWithLine);
    }
    return spec;
}
exports.normalizeUnitSpec = normalizeUnitSpec;
function normalizeRangedUnitSpec(spec) {
    if (spec.encoding) {
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
    }
    return spec;
}
exports.normalizeRangedUnitSpec = normalizeRangedUnitSpec;
function normalizeErrorBarUnitSpec(spec) {
    // FIXME correctly deal with color and opacity
    var layerSpec = util_1.extend(spec.name ? { name: spec.name } : {}, spec.description ? { description: spec.description } : {}, spec.data ? { data: spec.data } : {}, spec.transform ? { transform: spec.transform } : {}, spec.config ? { config: spec.config } : {}, { layers: [] });
    if (!spec.encoding) {
        return layerSpec;
    }
    if (spec.mark === mark_1.ERRORBAR) {
        var ruleSpec = {
            mark: mark_1.RULE,
            encoding: util_1.extend(spec.encoding.x ? { x: util_1.duplicate(spec.encoding.x) } : {}, spec.encoding.y ? { y: util_1.duplicate(spec.encoding.y) } : {}, spec.encoding.x2 ? { x2: util_1.duplicate(spec.encoding.x2) } : {}, spec.encoding.y2 ? { y2: util_1.duplicate(spec.encoding.y2) } : {}, {})
        };
        var lowerTickSpec = {
            mark: mark_1.TICK,
            encoding: util_1.extend(spec.encoding.x ? { x: util_1.duplicate(spec.encoding.x) } : {}, spec.encoding.y ? { y: util_1.duplicate(spec.encoding.y) } : {}, spec.encoding.size ? { size: util_1.duplicate(spec.encoding.size) } : {}, {})
        };
        var upperTickSpec = {
            mark: mark_1.TICK,
            encoding: util_1.extend({
                x: spec.encoding.x2 ? util_1.duplicate(spec.encoding.x2) : util_1.duplicate(spec.encoding.x),
                y: spec.encoding.y2 ? util_1.duplicate(spec.encoding.y2) : util_1.duplicate(spec.encoding.y)
            }, spec.encoding.size ? { size: util_1.duplicate(spec.encoding.size) } : {})
        };
        layerSpec.layers.push(normalizeUnitSpec(ruleSpec));
        layerSpec.layers.push(normalizeUnitSpec(lowerTickSpec));
        layerSpec.layers.push(normalizeUnitSpec(upperTickSpec));
    }
    return layerSpec;
}
exports.normalizeErrorBarUnitSpec = normalizeErrorBarUnitSpec;
function normalizeOverlay(spec, overlayWithPoint, overlayWithLine) {
    var outerProps = ['name', 'description', 'data', 'transform'];
    var baseSpec = util_1.omit(spec, outerProps.concat('config'));
    var baseConfig = util_1.duplicate(spec.config);
    delete baseConfig.overlay;
    // TODO: remove shape, size
    // Need to copy stack config to overlayed layer
    var stacked = stack_1.stack(spec.mark, spec.encoding, spec.config && spec.config.mark ? spec.config.mark.stacked : undefined);
    var layerSpec = util_1.extend(util_1.pick(spec, outerProps), { layers: [baseSpec] }, util_1.keys(baseConfig).length > 0 ? { config: baseConfig } : {});
    if (overlayWithLine) {
        // TODO: add name with suffix
        var lineSpec = util_1.duplicate(baseSpec);
        lineSpec.mark = mark_1.LINE;
        // TODO: remove shape, size
        var markConfig = util_1.extend({}, config_1.defaultOverlayConfig.lineStyle, spec.config.overlay.lineStyle, stacked ? { stacked: stacked.offset } : null);
        if (util_1.keys(markConfig).length > 0) {
            lineSpec.config = { mark: markConfig };
        }
        layerSpec.layers.push(lineSpec);
    }
    if (overlayWithPoint) {
        // TODO: add name with suffix
        var pointSpec = util_1.duplicate(baseSpec);
        pointSpec.mark = mark_1.POINT;
        var markConfig = util_1.extend({}, config_1.defaultOverlayConfig.pointStyle, spec.config.overlay.pointStyle, stacked ? { stacked: stacked.offset } : null);
        if (util_1.keys(markConfig).length > 0) {
            pointSpec.config = { mark: markConfig };
        }
        layerSpec.layers.push(pointSpec);
    }
    return layerSpec;
}
exports.normalizeOverlay = normalizeOverlay;
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
    // TODO: Support repeat and concat
    if (isLayerSpec(spec)) {
        spec.layers.forEach(function (layer) {
            accumulate(dict, vlEncoding.fieldDefs(layer.encoding));
        });
    }
    else if (isSomeFacetSpec(spec)) {
        accumulate(dict, vlEncoding.fieldDefs(spec.facet));
        fieldDefIndex(spec.spec, dict);
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
;
function isStacked(spec) {
    return stack_1.stack(spec.mark, spec.encoding, (spec.config && spec.config.mark) ? spec.config.mark.stacked : undefined) !== null;
}
exports.isStacked = isStacked;

},{"./channel":10,"./config":55,"./encoding":58,"./mark":64,"./stack":68,"./util":72}],68:[function(require,module,exports){
"use strict";
var log = require("./log");
var aggregate_1 = require("./aggregate");
var channel_1 = require("./channel");
var encoding_1 = require("./encoding");
var fielddef_1 = require("./fielddef");
var mark_1 = require("./mark");
var scale_1 = require("./scale");
var util_1 = require("./util");
var StackOffset;
(function (StackOffset) {
    StackOffset.ZERO = 'zero';
    StackOffset.CENTER = 'center';
    StackOffset.NORMALIZE = 'normalize';
    StackOffset.NONE = 'none';
})(StackOffset = exports.StackOffset || (exports.StackOffset = {}));
exports.STACKABLE_MARKS = [mark_1.BAR, mark_1.AREA, mark_1.RULE, mark_1.POINT, mark_1.CIRCLE, mark_1.SQUARE, mark_1.LINE, mark_1.TEXT, mark_1.TICK];
exports.STACK_BY_DEFAULT_MARKS = [mark_1.BAR, mark_1.AREA];
function stack(mark, encoding, stacked) {
    // Should not have stack explicitly disabled
    if (util_1.contains([StackOffset.NONE, null, false], stacked)) {
        return null;
    }
    // Should have stackable mark
    if (!util_1.contains(exports.STACKABLE_MARKS, mark)) {
        return null;
    }
    // Should be aggregate plot
    if (!encoding_1.isAggregate(encoding)) {
        return null;
    }
    // Should have grouping level of detail
    var stackBy = channel_1.STACK_GROUP_CHANNELS.reduce(function (sc, channel) {
        if (encoding_1.channelHasField(encoding, channel)) {
            var channelDef = encoding[channel];
            (util_1.isArray(channelDef) ? channelDef : [channelDef]).forEach(function (fieldDef) {
                if (fielddef_1.isFieldDef(fieldDef) && !fieldDef.aggregate) {
                    sc.push({
                        channel: channel,
                        fieldDef: fieldDef
                    });
                }
            });
        }
        return sc;
    }, []);
    if (stackBy.length === 0) {
        return null;
    }
    // Has only one aggregate axis
    var hasXField = fielddef_1.isFieldDef(encoding.x);
    var hasYField = fielddef_1.isFieldDef(encoding.y);
    var xIsAggregate = fielddef_1.isFieldDef(encoding.x) && !!encoding.x.aggregate;
    var yIsAggregate = fielddef_1.isFieldDef(encoding.y) && !!encoding.y.aggregate;
    if (xIsAggregate !== yIsAggregate) {
        var fieldChannel = xIsAggregate ? channel_1.X : channel_1.Y;
        var fieldDef = encoding[fieldChannel];
        var fieldChannelAggregate = fieldDef.aggregate;
        var fieldChannelScale = fieldDef.scale;
        if (util_1.contains(exports.STACK_BY_DEFAULT_MARKS, mark)) {
            // Bar and Area with sum ops are automatically stacked by default
            stacked = stacked === undefined ? StackOffset.ZERO : stacked;
        }
        if (!stacked) {
            return null;
        }
        // If stacked, check if it qualifies for stacking (and log warning if not qualified.)
        if (fieldChannelScale && fieldChannelScale.type && fieldChannelScale.type !== scale_1.ScaleType.LINEAR) {
            log.warn(log.message.cannotStackNonLinearScale(fieldChannelScale.type));
            return null;
        }
        if (encoding_1.channelHasField(encoding, fieldChannel === channel_1.X ? channel_1.X2 : channel_1.Y2)) {
            log.warn(log.message.cannotStackRangedMark(fieldChannel));
            return null;
        }
        if (!util_1.contains(aggregate_1.SUM_OPS, fieldChannelAggregate)) {
            log.warn(log.message.cannotStackNonSummativeAggregate(fieldChannelAggregate));
            return null;
        }
        return {
            groupbyChannel: xIsAggregate ? (hasYField ? channel_1.Y : null) : (hasXField ? channel_1.X : null),
            fieldChannel: fieldChannel,
            stackBy: stackBy,
            offset: stacked
        };
    }
    return null;
}
exports.stack = stack;

},{"./aggregate":7,"./channel":10,"./encoding":58,"./fielddef":60,"./log":63,"./mark":64,"./scale":65,"./util":72}],69:[function(require,module,exports){
"use strict";
var datetime_1 = require("./datetime");
var util_1 = require("./util");
var log = require("./log");
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
})(TimeUnit = exports.TimeUnit || (exports.TimeUnit = {}));
/** Time Unit that only corresponds to only one part of Date objects. */
exports.SINGLE_TIMEUNITS = [
    TimeUnit.YEAR,
    TimeUnit.QUARTER,
    TimeUnit.MONTH,
    TimeUnit.DAY,
    TimeUnit.DATE,
    TimeUnit.HOURS,
    TimeUnit.MINUTES,
    TimeUnit.SECONDS,
    TimeUnit.MILLISECONDS,
];
var SINGLE_TIMEUNIT_INDEX = exports.SINGLE_TIMEUNITS.reduce(function (d, timeUnit) {
    d[timeUnit] = true;
    return d;
}, {});
function isSingleTimeUnit(timeUnit) {
    return !!SINGLE_TIMEUNIT_INDEX[timeUnit];
}
exports.isSingleTimeUnit = isSingleTimeUnit;
/**
 * Converts a date to only have the measurements relevant to the specified unit
 * i.e. ('yearmonth', '2000-12-04 07:58:14') -> '2000-12-01 00:00:00'
 * Note: the base date is Jan 01 1900 00:00:00
 */
function convert(unit, date) {
    var result = new Date(0, 0, 1, 0, 0, 0, 0); // start with uniform date
    exports.SINGLE_TIMEUNITS.forEach(function (singleUnit) {
        if (containsTimeUnit(unit, singleUnit)) {
            switch (singleUnit) {
                case TimeUnit.DAY:
                    throw new Error('Cannot convert to TimeUnits containing \'day\'');
                case TimeUnit.YEAR:
                    result.setFullYear(date.getFullYear());
                    break;
                case TimeUnit.QUARTER:
                    // indicate quarter by setting month to be the first of the quarter i.e. may (4) -> april (3)
                    result.setMonth((Math.floor(date.getMonth() / 3)) * 3);
                    break;
                case TimeUnit.MONTH:
                    result.setMonth(date.getMonth());
                    break;
                case TimeUnit.DATE:
                    result.setDate(date.getDate());
                    break;
                case TimeUnit.HOURS:
                    result.setHours(date.getHours());
                    break;
                case TimeUnit.MINUTES:
                    result.setMinutes(date.getMinutes());
                    break;
                case TimeUnit.SECONDS:
                    result.setSeconds(date.getSeconds());
                    break;
                case TimeUnit.MILLISECONDS:
                    result.setMilliseconds(date.getMilliseconds());
                    break;
            }
        }
    });
    return result;
}
exports.convert = convert;
exports.MULTI_TIMEUNITS = [
    TimeUnit.YEARQUARTER,
    TimeUnit.YEARQUARTERMONTH,
    TimeUnit.YEARMONTH,
    TimeUnit.YEARMONTHDATE,
    TimeUnit.YEARMONTHDATEHOURS,
    TimeUnit.YEARMONTHDATEHOURSMINUTES,
    TimeUnit.YEARMONTHDATEHOURSMINUTESSECONDS,
    TimeUnit.QUARTERMONTH,
    TimeUnit.HOURSMINUTES,
    TimeUnit.HOURSMINUTESSECONDS,
    TimeUnit.MINUTESSECONDS,
    TimeUnit.SECONDSMILLISECONDS,
];
var MULTI_TIMEUNIT_INDEX = exports.MULTI_TIMEUNITS.reduce(function (d, timeUnit) {
    d[timeUnit] = true;
    return d;
}, {});
function isMultiTimeUnit(timeUnit) {
    return !!MULTI_TIMEUNIT_INDEX[timeUnit];
}
exports.isMultiTimeUnit = isMultiTimeUnit;
exports.TIMEUNITS = [
    TimeUnit.YEAR,
    TimeUnit.QUARTER,
    TimeUnit.MONTH,
    TimeUnit.DAY,
    TimeUnit.DATE,
    TimeUnit.HOURS,
    TimeUnit.MINUTES,
    TimeUnit.SECONDS,
    TimeUnit.MILLISECONDS,
    TimeUnit.YEARQUARTER,
    TimeUnit.YEARQUARTERMONTH,
    TimeUnit.YEARMONTH,
    TimeUnit.YEARMONTHDATE,
    TimeUnit.YEARMONTHDATEHOURS,
    TimeUnit.YEARMONTHDATEHOURSMINUTES,
    TimeUnit.YEARMONTHDATEHOURSMINUTESSECONDS,
    TimeUnit.QUARTERMONTH,
    TimeUnit.HOURSMINUTES,
    TimeUnit.HOURSMINUTESSECONDS,
    TimeUnit.MINUTESSECONDS,
    TimeUnit.SECONDSMILLISECONDS
];
/** Returns true if fullTimeUnit contains the timeUnit, false otherwise. */
function containsTimeUnit(fullTimeUnit, timeUnit) {
    var fullTimeUnitStr = fullTimeUnit.toString();
    var timeUnitStr = timeUnit.toString();
    var index = fullTimeUnitStr.indexOf(timeUnitStr);
    return index > -1 &&
        (timeUnit !== TimeUnit.SECONDS ||
            index === 0 ||
            fullTimeUnitStr.charAt(index - 1) !== 'i' // exclude milliseconds
        );
}
exports.containsTimeUnit = containsTimeUnit;
/**
 * Returns Vega expresssion for a given timeUnit and fieldRef
 */
function fieldExpr(fullTimeUnit, field) {
    var fieldRef = "datum[\"" + field + "\"]";
    function func(timeUnit) {
        if (timeUnit === TimeUnit.QUARTER) {
            // quarter starting at 0 (0,3,6,9).
            return "(quarter(" + fieldRef + ")-1)";
        }
        else {
            return timeUnit + "(" + fieldRef + ")";
        }
    }
    var d = exports.SINGLE_TIMEUNITS.reduce(function (_d, tu) {
        if (containsTimeUnit(fullTimeUnit, tu)) {
            _d[tu] = func(tu);
        }
        return _d;
    }, {});
    if (d.day && util_1.keys(d).length > 1) {
        log.warn(log.message.dayReplacedWithDate(fullTimeUnit));
        delete d.day;
        d.date = func(TimeUnit.DATE);
    }
    return datetime_1.dateTimeExpr(d);
}
exports.fieldExpr = fieldExpr;
/** returns the smallest nice unit for scale.nice */
function smallestUnit(timeUnit) {
    if (!timeUnit) {
        return undefined;
    }
    if (containsTimeUnit(timeUnit, TimeUnit.SECONDS)) {
        return 'second';
    }
    if (containsTimeUnit(timeUnit, TimeUnit.MINUTES)) {
        return 'minute';
    }
    if (containsTimeUnit(timeUnit, TimeUnit.HOURS)) {
        return 'hour';
    }
    if (containsTimeUnit(timeUnit, TimeUnit.DAY) ||
        containsTimeUnit(timeUnit, TimeUnit.DATE)) {
        return 'day';
    }
    if (containsTimeUnit(timeUnit, TimeUnit.MONTH)) {
        return 'month';
    }
    if (containsTimeUnit(timeUnit, TimeUnit.YEAR)) {
        return 'year';
    }
    return undefined;
}
exports.smallestUnit = smallestUnit;
/** returns the signal expression used for axis labels for a time unit */
function formatExpression(timeUnit, field, shortTimeLabels) {
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
        expression += "timeFormat(" + field + ", '" + dateTimeComponents.join(' ') + "')";
    }
    // If expression is still an empty string, return undefined instead.
    return expression || undefined;
}
exports.formatExpression = formatExpression;

},{"./datetime":57,"./log":63,"./util":72}],70:[function(require,module,exports){
"use strict";

},{}],71:[function(require,module,exports){
/** Constants and utilities for data type */
/** Data type based on level of measurement */
"use strict";
var Type;
(function (Type) {
    Type.QUANTITATIVE = 'quantitative';
    Type.ORDINAL = 'ordinal';
    Type.TEMPORAL = 'temporal';
    Type.NOMINAL = 'nominal';
})(Type = exports.Type || (exports.Type = {}));
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

},{}],72:[function(require,module,exports){
"use strict";
var stringify = require("json-stable-stringify");
var vega_util_1 = require("vega-util");
exports.extend = vega_util_1.extend;
exports.isArray = vega_util_1.isArray;
exports.isObject = vega_util_1.isObject;
exports.isNumber = vega_util_1.isNumber;
exports.isString = vega_util_1.isString;
exports.truncate = vega_util_1.truncate;
exports.toSet = vega_util_1.toSet;
var vega_util_2 = require("vega-util");
/**
 * Creates an object composed of the picked object properties.
 *
 * Example:  (from lodash)
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 * pick(object, ['a', 'c']);
 * // → { 'a': 1, 'c': 3 }
 *
 */
function pick(obj, props) {
    var copy = {};
    props.forEach(function (prop) {
        if (obj.hasOwnProperty(prop)) {
            copy[prop] = obj[prop];
        }
    });
    return copy;
}
exports.pick = pick;
/**
 * The opposite of _.pick; this method creates an object composed of the own
 * and inherited enumerable string keyed properties of object that are not omitted.
 */
function omit(obj, props) {
    var copy = duplicate(obj);
    props.forEach(function (prop) {
        delete copy[prop];
    });
    return copy;
}
exports.omit = omit;
function hash(a) {
    if (vega_util_2.isString(a) || vega_util_2.isNumber(a) || isBoolean(a)) {
        return String(a);
    }
    return stringify(a);
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
function reduce(obj, f, init, thisArg) {
    if (obj.reduce) {
        return obj.reduce.call(thisArg, f, init);
    }
    else {
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                init = f.call(thisArg, init, obj[k], k, obj);
            }
        }
        return init;
    }
}
exports.reduce = reduce;
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
;
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
        if (typeof src[p] !== 'object' || src[p] === null) {
            dest[p] = src[p];
        }
        else if (typeof dest[p] !== 'object' || dest[p] === null) {
            dest[p] = mergeDeep(src[p].constructor === Array ? [] : {}, src[p]);
        }
        else {
            mergeDeep(dest[p], src[p]);
        }
    }
    return dest;
}
function unique(values, f) {
    var results = [];
    var u = {}, v;
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
;
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
;
function duplicate(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.duplicate = duplicate;
;
function isBoolean(b) {
    return b === true || b === false;
}
exports.isBoolean = isBoolean;

},{"json-stable-stringify":1,"vega-util":5}],73:[function(require,module,exports){
"use strict";
// TODO: move to vl.spec.validator?
var util_1 = require("./util");
var mark_1 = require("./mark");
/**
 * Required Encoding Channels for each mark type
 * @type {Object}
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
 * @param  {RequiredChannelMap  = DefaultRequiredChannelMap}  requiredChannelMap
 * @param  {SupportedChannelMap = DefaultSupportedChannelMap} supportedChannelMap
 * @return {String} Return one reason why the encoding is invalid,
 *                  or null if the encoding is valid.
 */
function getEncodingMappingError(spec, requiredChannelMap, supportedChannelMap) {
    if (requiredChannelMap === void 0) { requiredChannelMap = exports.DEFAULT_REQUIRED_CHANNEL_MAP; }
    if (supportedChannelMap === void 0) { supportedChannelMap = exports.DEFAULT_SUPPORTED_CHANNEL_TYPE; }
    var mark = spec.mark;
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
    if (mark === mark_1.BAR && !encoding.x && !encoding.y) {
        return 'Missing both x and y for bar';
    }
    return null;
}
exports.getEncodingMappingError = getEncodingMappingError;

},{"./mark":64,"./util":72}],74:[function(require,module,exports){
"use strict";
var util_1 = require("./util");
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
        return !('fields' in domain);
    }
    return false;
}
exports.isDataRefDomain = isDataRefDomain;

},{"./util":72}],75:[function(require,module,exports){
"use strict";
exports.axis = require("./axis");
exports.aggregate = require("./aggregate");
exports.bin = require("./bin");
exports.channel = require("./channel");
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

},{"../package.json":6,"./aggregate":7,"./axis":8,"./bin":9,"./channel":10,"./compile/compile":15,"./config":55,"./data":56,"./datetime":57,"./encoding":58,"./facet":59,"./fielddef":60,"./legend":62,"./mark":64,"./scale":65,"./sort":66,"./spec":67,"./stack":68,"./timeunit":69,"./transform":70,"./type":71,"./util":72,"./validate":73}]},{},[75])(75)
});
//# sourceMappingURL=vega-lite.js.map
